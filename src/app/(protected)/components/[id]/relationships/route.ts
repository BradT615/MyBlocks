// src/app/(protected)/components/[id]/relationships/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'
import { SupabaseClient } from '@supabase/supabase-js'

// Helper function to check for circular dependencies
async function checkForCircularDependencies(
  supabase: SupabaseClient,
  componentId: string,
  sourceFileId: string,
  targetFileId: string
): Promise<boolean> {
  // If source and target are the same, that's a circular dependency
  if (sourceFileId === targetFileId) {
    return true;
  }
  
  // Get all existing relationships for this component
  const { data: relationships } = await supabase
    .from('file_relationships')
    .select('source_file_id, target_file_id')
    .eq('component_id', componentId);
  
  if (!relationships || relationships.length === 0) {
    return false; // No existing relationships, so no circular dependency
  }
  
  // Build a dependency graph
  const graph: Record<string, string[]> = {};
  relationships.forEach((rel: { source_file_id: string; target_file_id: string }) => {
    if (!graph[rel.source_file_id]) {
      graph[rel.source_file_id] = [];
    }
    graph[rel.source_file_id].push(rel.target_file_id);
  });
  
  // Add the potential new relationship to check
  if (!graph[sourceFileId]) {
    graph[sourceFileId] = [];
  }
  graph[sourceFileId].push(targetFileId);
  
  // Depth-first search to detect cycles
  const visited = new Set<string>();
  const recursionStack = new Set<string>();
  
  function hasCycle(nodeId: string): boolean {
    if (!graph[nodeId]) return false;
    
    visited.add(nodeId);
    recursionStack.add(nodeId);
    
    for (const neighbor of graph[nodeId]) {
      if (!visited.has(neighbor)) {
        if (hasCycle(neighbor)) {
          return true;
        }
      } else if (recursionStack.has(neighbor)) {
        return true; // Found a cycle
      }
    }
    
    recursionStack.delete(nodeId); // Remove from recursion stack
    return false;
  }
  
  // Check if the new relationship creates a cycle
  return hasCycle(sourceFileId);
}

// GET: Fetch all file relationships for a component
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  
  // Get component to check access permissions
  const { data: component } = await supabase
    .from('components')
    .select('profile_id, is_public')
    .eq('id', id)
    .single()
    
  if (!component) {
    return NextResponse.json({ error: 'Component not found' }, { status: 404 })
  }
  
  // Check if user has access
  if (component.profile_id !== user.id && !component.is_public) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  
  // Fetch file relationships
  const { data, error } = await supabase
    .from('file_relationships')
    .select(`
      id,
      source_file_id,
      target_file_id,
      import_path,
      relationship_type,
      component_files!source_file_rel(id, filename),
      component_files!target_file_rel(id, filename)
    `)
    .eq('component_id', id)
  
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
  
  return NextResponse.json({ relationships: data })
}

// POST: Create a new file relationship
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  
  // Check component ownership
  const { data: component } = await supabase
    .from('components')
    .select('profile_id')
    .eq('id', id)
    .single()
    
  if (!component) {
    return NextResponse.json({ error: 'Component not found' }, { status: 404 })
  }
  
  // Only component owner can add relationships
  if (component.profile_id !== user.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  
  // Parse request body
  const body = await request.json()
  const { 
    source_file_id, 
    target_file_id, 
    import_path, 
    relationship_type = 'IMPORT' 
  } = body
  
  // Validate input
  if (!source_file_id || !target_file_id) {
    return NextResponse.json({ 
      error: 'Source and target file IDs are required' 
    }, { status: 400 })
  }
  
  // Verify that both files belong to this component
  const { data: sourceFile } = await supabase
    .from('component_files')
    .select('id')
    .eq('id', source_file_id)
    .eq('component_id', id)
    .single()
    
  if (!sourceFile) {
    return NextResponse.json({ 
      error: 'Source file not found or does not belong to this component' 
    }, { status: 404 })
  }
  
  const { data: targetFile } = await supabase
    .from('component_files')
    .select('id')
    .eq('id', target_file_id)
    .eq('component_id', id)
    .single()
    
  if (!targetFile) {
    return NextResponse.json({ 
      error: 'Target file not found or does not belong to this component' 
    }, { status: 404 })
  }
  
  // Check for circular dependencies
  const hasCircular = await checkForCircularDependencies(
    supabase, 
    id, 
    source_file_id, 
    target_file_id
  )
  
  if (hasCircular) {
    return NextResponse.json({ 
      error: 'This would create a circular dependency' 
    }, { status: 400 })
  }
  
  // Check if relationship already exists
  const { data: existingRel } = await supabase
    .from('file_relationships')
    .select('id')
    .eq('component_id', id)
    .eq('source_file_id', source_file_id)
    .eq('target_file_id', target_file_id)
    .maybeSingle()
    
  if (existingRel) {
    return NextResponse.json({ 
      error: 'This relationship already exists' 
    }, { status: 409 })
  }
  
  // Create the relationship
  const { data, error } = await supabase
    .from('file_relationships')
    .insert({
      component_id: id,
      source_file_id,
      target_file_id,
      import_path,
      relationship_type,
      created_at: new Date().toISOString()
    })
    .select()
  
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
  
  return NextResponse.json({ relationship: data[0] }, { status: 201 })
}

// PUT: Update an existing file relationship
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  
  // Check component ownership
  const { data: component } = await supabase
    .from('components')
    .select('profile_id')
    .eq('id', id)
    .single()
    
  if (!component) {
    return NextResponse.json({ error: 'Component not found' }, { status: 404 })
  }
  
  // Only component owner can update relationships
  if (component.profile_id !== user.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  
  // Parse request body
  const body = await request.json()
  const { 
    relationship_id, 
    import_path, 
    relationship_type 
  } = body
  
  if (!relationship_id) {
    return NextResponse.json({ error: 'Relationship ID is required' }, { status: 400 })
  }
  
  // Make sure the relationship belongs to this component
  const { data: existingRel } = await supabase
    .from('file_relationships')
    .select('id')
    .eq('id', relationship_id)
    .eq('component_id', id)
    .single()
    
  if (!existingRel) {
    return NextResponse.json({ error: 'Relationship not found' }, { status: 404 })
  }
  
  // Update fields that were provided
  const updates: Record<string, string | Date> = {}
  if (import_path !== undefined) updates.import_path = import_path
  if (relationship_type !== undefined) updates.relationship_type = relationship_type
  updates.updated_at = new Date().toISOString()
  
  const { data, error } = await supabase
    .from('file_relationships')
    .update(updates)
    .eq('id', relationship_id)
    .eq('component_id', id)
    .select()
  
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
  
  return NextResponse.json({ relationship: data[0] })
}

// DELETE: Remove a file relationship
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const url = request.nextUrl
  const relationshipId = url.searchParams.get('relationship_id')
  
  if (!relationshipId) {
    return NextResponse.json({ error: 'Relationship ID is required' }, { status: 400 })
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
    .eq('id', id)
    .single()
    
  if (!component) {
    return NextResponse.json({ error: 'Component not found' }, { status: 404 })
  }
  
  // Only component owner can delete relationships
  if (component.profile_id !== user.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  
  // Delete the relationship
  const { error } = await supabase
    .from('file_relationships')
    .delete()
    .eq('id', relationshipId)
    .eq('component_id', id)
  
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
  
  return NextResponse.json({ success: true })
}