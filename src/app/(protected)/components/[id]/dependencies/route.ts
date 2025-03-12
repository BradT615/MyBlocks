// src/app/api/components/[id]/dependencies/route.ts
import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'

// GET: Fetch all dependencies for a component
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
  
  // Fetch dependencies
  const { data, error } = await supabase
    .from('component_dependencies')
    .select('*')
    .eq('component_id', params.id)
  
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
  
  return NextResponse.json({ dependencies: data })
}

// POST: Add a new dependency to a component
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
  
  // Only component owner can add dependencies
  if (component.profile_id !== user.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  
  // Parse request body
  const body = await request.json()
  const { package_name, package_version, is_dev_dependency = false } = body
  
  // Validate required fields
  if (!package_name || !package_version) {
    return NextResponse.json({ 
      error: 'Package name and version are required' 
    }, { status: 400 })
  }
  
  // Check if dependency already exists
  const { data: existingDep } = await supabase
    .from('component_dependencies')
    .select('id')
    .eq('component_id', params.id)
    .eq('package_name', package_name)
    .maybeSingle()
    
  if (existingDep) {
    return NextResponse.json({ 
      error: 'This dependency already exists for this component' 
    }, { status: 409 })
  }
  
  // Add the dependency
  const { data, error } = await supabase
    .from('component_dependencies')
    .insert({
      component_id: params.id,
      package_name,
      package_version,
      is_dev_dependency,
      added_by: user.id
    })
    .select()
  
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
  
  return NextResponse.json({ dependency: data[0] }, { status: 201 })
}

// PATCH: Update an existing dependency
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
  
  // Only component owner can update dependencies
  if (component.profile_id !== user.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  
  // Parse request body
  const body = await request.json()
  const { dependency_id, package_version, is_dev_dependency } = body
  
  if (!dependency_id) {
    return NextResponse.json({ error: 'Dependency ID is required' }, { status: 400 })
  }
  
  // Make sure the dependency belongs to this component
  const { data: existingDep } = await supabase
    .from('component_dependencies')
    .select('id')
    .eq('id', dependency_id)
    .eq('component_id', params.id)
    .single()
    
  if (!existingDep) {
    return NextResponse.json({ error: 'Dependency not found' }, { status: 404 })
  }
  
  // Update fields that were provided
  const updates: Record<string, string | boolean | Date> = {}
  if (package_version !== undefined) updates.package_version = package_version
  if (is_dev_dependency !== undefined) updates.is_dev_dependency = is_dev_dependency
  updates.updated_at = new Date().toISOString()
  
  const { data, error } = await supabase
    .from('component_dependencies')
    .update(updates)
    .eq('id', dependency_id)
    .eq('component_id', params.id)
    .select()
  
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
  
  return NextResponse.json({ dependency: data[0] })
}

// DELETE: Remove a dependency
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const url = new URL(request.url)
  const dependencyId = url.searchParams.get('dependency_id')
  
  if (!dependencyId) {
    return NextResponse.json({ error: 'Dependency ID is required' }, { status: 400 })
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
  
  // Only component owner can delete dependencies
  if (component.profile_id !== user.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  
  // Delete the dependency
  const { error } = await supabase
    .from('component_dependencies')
    .delete()
    .eq('id', dependencyId)
    .eq('component_id', params.id)
  
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
  
  return NextResponse.json({ success: true })
}