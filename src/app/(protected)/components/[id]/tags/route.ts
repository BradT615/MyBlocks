// src/app/api/components/[id]/tags/route.ts
import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'

// Define interfaces for better type safety
interface Tag {
  id: string;
  name: string;
  color?: string;
}

interface ComponentTag {
  id: string;
  tag_id: string;
  tags: Tag | Tag[] | null;
}

// GET: Fetch all tags for a component
export async function GET(request: Request, { params }: { params: { id: string } }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  
  // Get component to check access permissions
  const { data: component } = await supabase
    .from('components')
    .select('profile_id, is_public')
    .eq('id', params.id)
    .single()
    
  if (!component) {
    return NextResponse.json({ error: 'Component not found' }, { status: 404 })
  }
  
  // Check if user has access
  if (component.profile_id !== user.id && !component.is_public) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  
  // Fetch component tags with tag details using a more explicit query
  const { data, error } = await supabase
    .from('component_tags')
    .select(`
      id, 
      tag_id,
      tags:tag_id (
        id, 
        name, 
        color
      )
    `)
    .eq('component_id', params.id)
  
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
  
  // Transform to a more usable format with proper type handling
  const componentTags = data as ComponentTag[];
  const formattedTags = componentTags.map(item => {
    if (item.tags) {
      // Handle both array and object responses from Supabase
      const tagData = Array.isArray(item.tags) ? item.tags[0] : item.tags;
      
      if (tagData) {
        return {
          component_tag_id: item.id,
          id: tagData.id,
          name: tagData.name,
          color: tagData.color || null
        };
      }
    }
    return null;
  }).filter(Boolean);
  
  return NextResponse.json({ tags: formattedTags })
}

// POST: Add a tag to a component
export async function POST(request: Request, { params }: { params: { id: string } }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  
  // Check component ownership
  const { data: component } = await supabase
    .from('components')
    .select('profile_id')
    .eq('id', params.id)
    .single()
    
  if (!component) {
    return NextResponse.json({ error: 'Component not found' }, { status: 404 })
  }
  
  // Only component owner can add tags
  if (component.profile_id !== user.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  
  // Parse request body
  const body = await request.json()
  const { tag_name, tag_id } = body
  
  if (!tag_name && !tag_id) {
    return NextResponse.json({ 
      error: 'Either tag_name or tag_id must be provided' 
    }, { status: 400 })
  }
  
  let tagId = tag_id;
  
  // If tag_id is not provided, we need to find or create a tag
  if (!tagId) {
    // Check if tag already exists
    const { data: existingTag } = await supabase
      .from('tags')
      .select('id')
      .eq('name', tag_name)
      .maybeSingle()
      
    if (existingTag) {
      tagId = existingTag.id;
    } else {
      // Create a new tag
      const { data: newTag, error: tagError } = await supabase
        .from('tags')
        .insert({ 
          name: tag_name,
          created_by: user.id
        })
        .select('id')
        .single()
        
      if (tagError) {
        return NextResponse.json({ error: tagError.message }, { status: 500 })
      }
      
      tagId = newTag.id;
    }
  }
  
  // Check if component already has this tag
  const { data: existingComponentTag } = await supabase
    .from('component_tags')
    .select('id')
    .eq('component_id', params.id)
    .eq('tag_id', tagId)
    .maybeSingle()
    
  if (existingComponentTag) {
    return NextResponse.json({ 
      error: 'This component already has this tag' 
    }, { status: 409 })
  }
  
  // Add tag to component
  const { data, error } = await supabase
    .from('component_tags')
    .insert({
      component_id: params.id,
      tag_id: tagId,
      created_at: new Date().toISOString()
    })
    .select(`
      id,
      tags:tag_id (
        id,
        name,
        color
      )
    `)
  
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
  
  // Format the response with proper type handling
  let tagResponse = null;
  if (data && data[0]) {
    const item = data[0] as ComponentTag;
    if (item.tags) {
      const tagData = Array.isArray(item.tags) ? item.tags[0] : item.tags;
      if (tagData) {
        tagResponse = {
          component_tag_id: item.id,
          id: tagData.id,
          name: tagData.name,
          color: tagData.color || null
        };
      }
    }
  }
  
  return NextResponse.json({ tag: tagResponse }, { status: 201 })
}

// DELETE: Remove a tag from a component
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const url = new URL(request.url)
  const tagId = url.searchParams.get('tag_id')
  
  if (!tagId) {
    return NextResponse.json({ error: 'Tag ID is required' }, { status: 400 })
  }
  
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  
  // Check component ownership
  const { data: component } = await supabase
    .from('components')
    .select('profile_id')
    .eq('id', params.id)
    .single()
    
  if (!component) {
    return NextResponse.json({ error: 'Component not found' }, { status: 404 })
  }
  
  // Only component owner can remove tags
  if (component.profile_id !== user.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  
  // Delete the component-tag association
  const { error } = await supabase
    .from('component_tags')
    .delete()
    .eq('component_id', params.id)
    .eq('tag_id', tagId)
  
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
  
  return NextResponse.json({ success: true })
}

// PATCH: Batch update tags for a component
export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  
  // Check component ownership
  const { data: component } = await supabase
    .from('components')
    .select('profile_id')
    .eq('id', params.id)
    .single()
    
  if (!component) {
    return NextResponse.json({ error: 'Component not found' }, { status: 404 })
  }
  
  // Only component owner can update tags
  if (component.profile_id !== user.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  
  // Parse request body
  const body = await request.json()
  const { tags } = body
  
  if (!tags || !Array.isArray(tags)) {
    return NextResponse.json({ 
      error: 'Tags array is required' 
    }, { status: 400 })
  }
  
  // Transaction to handle batch tag update
  try {
    // 1. Get current component tags
    const { data: currentTags } = await supabase
      .from('component_tags')
      .select('id, tag_id')
      .eq('component_id', params.id)
    
    const currentTagIds = currentTags?.map(tag => tag.tag_id) || [];
    const requestedTagIds: string[] = [];
    
    // 2. Process each tag in the request
    for (const tagItem of tags) {
      let tagId = tagItem.id;
      
      // If no ID but name is provided, find or create the tag
      if (!tagId && tagItem.name) {
        // Check if tag exists
        const { data: existingTag } = await supabase
          .from('tags')
          .select('id')
          .eq('name', tagItem.name)
          .maybeSingle()
          
        if (existingTag) {
          tagId = existingTag.id;
        } else {
          // Create new tag
          const { data: newTag, error: tagError } = await supabase
            .from('tags')
            .insert({ 
              name: tagItem.name,
              color: tagItem.color,
              created_by: user.id
            })
            .select('id')
            .single()
            
          if (tagError) throw new Error(tagError.message);
          
          tagId = newTag.id;
        }
      }
      
      if (!tagId) continue;
      
      requestedTagIds.push(tagId);
      
      // Add tag if it doesn't exist
      if (!currentTagIds.includes(tagId)) {
        await supabase
          .from('component_tags')
          .insert({
            component_id: params.id,
            tag_id: tagId,
            created_at: new Date().toISOString()
          })
      }
    }
    
    // 3. Remove tags that were not in the request
    const tagsToRemove = currentTagIds.filter(id => !requestedTagIds.includes(id));
    
    if (tagsToRemove.length > 0) {
      await supabase
        .from('component_tags')
        .delete()
        .eq('component_id', params.id)
        .in('tag_id', tagsToRemove)
    }
    
    // 4. Fetch updated tags
    const { data: updatedTags, error } = await supabase
      .from('component_tags')
      .select(`
        id,
        tags:tag_id (
          id,
          name,
          color
        )
      `)
      .eq('component_id', params.id)
    
    if (error) throw new Error(error.message);
    
    // Format response with proper type handling
    const componentTags = updatedTags as ComponentTag[];
    const formattedTags = componentTags.map(item => {
      if (item.tags) {
        const tagData = Array.isArray(item.tags) ? item.tags[0] : item.tags;
        if (tagData) {
          return {
            component_tag_id: item.id,
            id: tagData.id,
            name: tagData.name,
            color: tagData.color || null
          };
        }
      }
      return null;
    }).filter(Boolean);
    
    return NextResponse.json({ 
      tags: formattedTags, 
      message: 'Tags updated successfully' 
    })
    
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json({ error: errorMessage }, { status: 500 })
  }
}