// src/app/(protected)/components/actions.ts
'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/utils/supabase/server'

interface ComponentFile {
  id: string
  language: string
  code: string
  filename: string
}

export async function createComponent(formData: FormData) {
  const supabase = await createClient()
  
  // Get the current user
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    return { error: 'You must be logged in to create components' }
  }
  
  // Extract form data
  const name = formData.get('name') as string
  const description = formData.get('description') as string
  const language = formData.get('language') as string
  const filesJson = formData.get('files') as string
  const utilitiesJson = formData.get('utilities') as string
  const tagsString = formData.get('tags') as string
  const isPublic = formData.get('isPublic') === 'true'
  const previewImage = formData.get('previewImage') as File
  
  // Parse JSON data
  let files: ComponentFile[] = []
  let utilities: string[] = []
  
  try {
    files = JSON.parse(filesJson)
    utilities = JSON.parse(utilitiesJson)
  } catch (error) {
    console.error('Error parsing JSON data:', error)
    return { error: 'Invalid component data format' }
  }
  
  // Validate required fields
  if (!name || files.length === 0) {
    return { error: 'Component name and at least one file are required' }
  }
  
  // Check for existing component with same name by this user
  const { data: existingComponent } = await supabase
    .from('components')
    .select('id')
    .eq('name', name)
    .eq('owner_id', user.id)
    .maybeSingle()
  
  if (existingComponent) {
    return { 
      error: 'You already have a component with this name. Please use a different name.' 
    }
  }
  
  // Prepare the component data - we'll use the first file's language as the primary language
  const componentData: {
    name: string;
    description: string;
    code: string;
    language: string;
    is_public: boolean;
    owner_id: string;
    utilities: string | null;
    preview_image_url?: string | null;
  } = {
    name,
    description,
    code: files[0].code, // Store the primary file code in the main code field
    language,
    is_public: isPublic,
    owner_id: user.id,
    utilities: utilities.length > 0 ? utilities.join(',') : null
  }
  
  // Handle image upload if provided
  let preview_image_url = null
  if (previewImage && previewImage.size > 0) {
    // Check file size (2MB limit)
    if (previewImage.size > 2 * 1024 * 1024) {
      return { error: 'Image file size should be less than 2MB' }
    }
    
    // Upload to Supabase Storage
    const fileName = `${user.id}/${Date.now()}-${previewImage.name}`
    const { data: uploadData, error: uploadError } = await supabase
      .storage
      .from('component-previews')
      .upload(fileName, previewImage, {
        cacheControl: '3600',
        upsert: false
      })
    
    if (uploadError) {
      console.error('Error uploading image:', uploadError)
      return { error: 'Failed to upload preview image' }
    }
    
    // Get public URL for the uploaded image
    const { data: { publicUrl } } = supabase
      .storage
      .from('component-previews')
      .getPublicUrl(uploadData.path)
    
    preview_image_url = publicUrl
  }
  
  // Add preview image URL if available
  if (preview_image_url) {
    componentData.preview_image_url = preview_image_url
  }
  
  // Start a transaction to ensure atomic operations
  const { data: component, error: componentError } = await supabase
    .from('components')
    .insert(componentData)
    .select('id')
    .single()
  
  if (componentError) {
    console.error('Error creating component:', componentError)
    return { error: 'Failed to create component' }
  }
  
  // Handle additional files (if more than one)
  if (files.length > 1) {
    const componentFilesData = files.slice(1).map(file => ({
      component_id: component.id,
      filename: file.filename,
      code: file.code,
      language: file.language
    }))
    
    // Create a component_files table in your database if you haven't already
    const { error: filesError } = await supabase
      .from('component_files')
      .insert(componentFilesData)
    
    if (filesError) {
      console.error('Error adding component files:', filesError)
      return { error: 'Component created but failed to add additional files' }
    }
  }
  
  // Handle tags if provided
  if (tagsString && tagsString.trim() !== '') {
    const tagNames = tagsString
      .split(',')
      .map(tag => tag.trim())
      .filter(tag => tag !== '')
    
    // Process each tag
    for (const tagName of tagNames) {
      // Check if tag already exists
      const { data: existingTag } = await supabase
        .from('tags')
        .select('id')
        .eq('name', tagName)
        .single()
      
      let tagId
      
      if (existingTag) {
        tagId = existingTag.id
      } else {
        // Create new tag
        const { data: newTag, error: tagError } = await supabase
          .from('tags')
          .insert({ name: tagName })
          .select('id')
          .single()
        
        if (tagError) {
          console.error('Error creating tag:', tagError)
          continue // Skip this tag if there's an error
        }
        
        tagId = newTag.id
      }
      
      // Create component-tag relationship
      await supabase
        .from('component_tags')
        .insert({
          component_id: component.id,
          tag_id: tagId
        })
    }
  }
  
  // Revalidate paths to update UI
  revalidatePath('/components')
  revalidatePath(`/components/${component.id}`)
  revalidatePath('/dashboard')
  
  return { 
    success: true, 
    id: component.id 
  }
}