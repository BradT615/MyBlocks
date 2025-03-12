import { notFound } from "next/navigation"
import { createClient } from "@/utils/supabase/server"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import Image from "next/image"
import {
  ArrowLeft,
  Download,
  Eye,
  Github,
  Code as CodeIcon,
  User,
  Package
} from "lucide-react"
import { CodeActions } from "./_components/code-actions"
import { ComponentRenderer } from "./_components/component-renderer"
import { ThemeToggleWithState } from "./_components/theme-toggle-with-state"


// Function to get component by ID
async function getComponentById(id: string) {
  // Input validation for ID
  if (!id || (typeof id === 'string' && !id.trim())) {
    console.error("Invalid component ID: empty or null");
    return null;
  }

  const supabase = await createClient()
  
  // Get the current user
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    console.error("No authenticated user found");
    return null;
  }
  
  try {
    // Fetch the component with the given ID, specifying the relationship explicitly
    const { data: component, error } = await supabase
      .from("components")
      .select(`
        *,
        component_files!component_files_component_id_fkey(*),
        profiles(full_name, avatar_url)
      `)
      .eq("id", id)
      .single()
    
    if (error || !component) {
      console.error("Error fetching component:", error);
      return null;
    }
    
    // Check if the user has access to this component
    // Users can access components if they are the owner or if the component is public
    if (component.profile_id !== user.id && !component.is_public) {
      console.error("User doesn't have access to this component");
      return null;
    }
    
    // Fetch tags for this component
    const { data: componentTags, error: tagsError } = await supabase
      .from("component_tags")
      .select(`
        tag_id,
        tags(name)
      `)
      .eq("component_id", id)
    
    if (tagsError) {
      console.error("Error fetching component tags:", tagsError);
    }

    // Extract tag names safely - using a type-safe approach
    const tags = componentTags?.map(item => {
      // Check if tags exists and has a name property
      if (item.tags && typeof item.tags === 'object' && 'name' in item.tags) {
        return item.tags.name as string;
      }
      return null;
    }).filter(Boolean as unknown as <T>(x: T | null | undefined) => x is T) || [];
    
    // NEW: Fetch dependencies for this component
    const { data: dependencies, error: dependenciesError } = await supabase
      .from("component_dependencies")
      .select('*')
      .eq("component_id", id)
    
    if (dependenciesError) {
      console.error("Error fetching component dependencies:", dependenciesError);
    }
    
    // Return a limited, sanitized view of the component with dependencies
    return {
      id: component.id,
      name: component.name,
      description: component.description || '',
      code: component.code,
      language: component.language || 'tsx',
      framework: component.framework || 'react',
      render_mode: component.render_mode || 'client',
      is_public: component.is_public,
      updated_at: component.updated_at,
      profile_id: component.profile_id,
      component_files: component.component_files || [],
      entry_file_id: component.entry_file_id,
      utilities: component.utilities || '',
      preview_image_url: component.preview_image_url || '',
      profiles: {
        full_name: component.profiles?.full_name || 'Unknown User',
        avatar_url: component.profiles?.avatar_url || null
      },
      tags,
      dependencies: dependencies || []
    };
  } catch (err) {
    console.error("Unexpected error in getComponentById:", err);
    return null;
  }
}

// Define the params type
type Params = Promise<{ id: string }>;

export default async function ComponentDetailPage({
  params
}: {
  params: Params;
}) {
  // Await the params before using its properties
  const resolvedParams = await params;
  const id = resolvedParams.id;
  
  const component = await getComponentById(id);
  
  if (!component) {
    notFound();
  }
  
  // Extract utilities if any
  const utilities = component.utilities ? component.utilities.split(',') : [];
  
  // Parse additional files from the component_files array
  const additionalFiles = component.component_files || [];
  
  // Creator info from profiles
  const creatorName = component.profiles?.full_name || 'Unknown User';
  const creatorAvatar = component.profiles?.avatar_url;
  
  return (
    <div className="container max-w-7xl mx-auto py-6">
      {/* Breadcrumb navigation */}
      <div className="mb-8">
        <Link 
          href="/components" 
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> 
          Back to Components
        </Link>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left column: Preview and info */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex justify-between">
            <h1 className="text-3xl font-bold tracking-tight">{component.name}</h1>
            
            <div className="flex items-center gap-2">
              <Button size="sm" variant="outline" className="gap-1" asChild>
                <Link href={`/components/${id}/preview`}>
                  <Eye className="h-4 w-4" />
                  <span className="hidden sm:inline">Preview</span>
                </Link>
              </Button>
              <Button size="sm" variant="outline" className="gap-1" asChild>
                <Link href={`/components/${id}/download`}>
                  <Download className="h-4 w-4" />
                  <span className="hidden sm:inline">Download</span>
                </Link>
              </Button>
              
              {/* Copy button is extracted to client component */}
              <CodeActions code={component.code} />
            </div>
          </div>
          
          {/* Component preview with live render */}
          <div className="border rounded-lg overflow-hidden">
            <div className="p-4 border-b bg-muted/40 flex items-center justify-between">
              <h3 className="font-medium flex items-center gap-2">
                <Eye className="h-4 w-4 text-primary" />
                Preview
              </h3>
              
              {/* Theme toggle with state management */}
              <ThemeToggleWithState />
            </div>
            <div className="bg-background">
              {/* Use the ComponentRenderer for dynamic preview */}
              <ComponentRenderer code={component.code} language={component.language} />
            </div>
          </div>
          
          {/* Component description */}
          {component.description && (
            <div className="border rounded-lg p-6">
              <h3 className="font-medium mb-3">Description</h3>
              <p className="text-muted-foreground">{component.description}</p>
            </div>
          )}
        </div>
        
        {/* Right column: Code and metadata */}
        <div className="space-y-6">
          {/* Component metadata */}
          <div className="border rounded-lg p-6">
            <h3 className="font-medium mb-4">Component Information</h3>
            
            <div className="space-y-4">
              {/* Creator info */}
              <div>
                <div className="text-sm text-muted-foreground mb-1">Creator</div>
                <div className="flex items-center gap-2">
                  <div className="h-6 w-6 rounded-full bg-muted flex items-center justify-center overflow-hidden">
                    {creatorAvatar ? (
                      <Image 
                        src={creatorAvatar} 
                        alt={creatorName} 
                        width={24} 
                        height={24} 
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <User className="h-4 w-4 text-muted-foreground" />
                    )}
                  </div>
                  <span className="text-sm">{creatorName}</span>
                </div>
              </div>
            
              {/* Visibility info */}
              <div>
                <div className="text-sm text-muted-foreground mb-1">Visibility</div>
                <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                  component.is_public 
                    ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400" 
                    : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                }`}>
                  {component.is_public ? "Public" : "Private"}
                </span>
              </div>
              
              {/* Language/framework */}
              <div>
                <div className="text-sm text-muted-foreground mb-1">Language</div>
                <span className="text-sm">{component.language}</span>
              </div>
              
              {/* Framework info */}
              <div>
                <div className="text-sm text-muted-foreground mb-1">Framework</div>
                <span className="text-sm capitalize">{component.framework}</span>
              </div>
              
              {/* Render mode */}
              <div>
                <div className="text-sm text-muted-foreground mb-1">Render Mode</div>
                <span className="text-sm capitalize">{component.render_mode}</span>
              </div>
              
              {/* Tags */}
              {component.tags && component.tags.length > 0 && (
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Tags</div>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {component.tags.map((tag: string) => (
                      <span 
                        key={tag} 
                        className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Dependencies */}
              {component.dependencies && component.dependencies.length > 0 && (
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Dependencies</div>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {component.dependencies.map((dep: {
                      id: string;
                      package_name: string;
                      package_version: string;
                      is_dev_dependency?: boolean;
                    }) => (
                      <span 
                        key={dep.id} 
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs gap-1 ${
                          dep.is_dev_dependency 
                            ? "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400" 
                            : "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
                        }`}
                        title={dep.is_dev_dependency ? 'Dev Dependency' : 'Dependency'}
                      >
                        <Package className="h-3 w-3" />
                        {dep.package_name}@{dep.package_version}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Utilities */}
              {utilities.length > 0 && (
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Utility Libraries</div>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {utilities.map((utility: string) => (
                      <span 
                        key={utility} 
                        className="bg-primary/10 rounded-full px-2.5 py-0.5 text-xs"
                      >
                        {utility}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Fork on GitHub link (if applicable) */}
          <Button className="w-full gap-2" variant="outline" asChild>
            <Link href="https://github.com">
              <Github className="h-4 w-4" />
              <span>Fork on GitHub</span>
            </Link>
          </Button>
        </div>
      </div>

      {/* Code tabs section */}
      <div className="mt-12">
        <Tabs defaultValue="component">
          <TabsList>
            <TabsTrigger value="component">Component Code</TabsTrigger>
            {additionalFiles.length > 0 && (
              <TabsTrigger value="additional">Additional Files</TabsTrigger>
            )}
            <TabsTrigger value="edit">Edit & Test</TabsTrigger>
          </TabsList>
          
          <TabsContent value="component" className="mt-6">
            <div className="border rounded-lg overflow-hidden">
              <div className="p-4 border-b bg-muted/40 flex items-center justify-between">
                <div className="font-medium flex items-center gap-2">
                  <CodeIcon className="h-4 w-4 text-primary" />
                  <span>{component.name}</span>
                </div>
                
                {/* Copy button (client component) */}
                <CodeActions code={component.code} isSmall />
              </div>
              <div className="bg-[#282c34] p-6 overflow-auto">
                <pre className="text-[#abb2bf] font-mono text-sm whitespace-pre">
                  {component.code}
                </pre>
              </div>
            </div>
          </TabsContent>
          
          {additionalFiles.length > 0 && (
            <TabsContent value="additional" className="mt-6 space-y-6">
              {additionalFiles.map((file: {
                id: string;
                filename: string;
                code: string;
                language?: string;
                is_entry_file?: boolean;
              }) => (
                <div key={file.id} className="border rounded-lg overflow-hidden">
                  <div className="p-4 border-b bg-muted/40 flex items-center justify-between">
                    <div className="font-medium flex items-center gap-2">
                      <CodeIcon className="h-4 w-4 text-primary" />
                      <span className="flex items-center">
                        {file.filename}
                        {file.is_entry_file && (
                          <span className="ml-2 text-xs bg-primary/10 text-primary px-1.5 py-0.5 rounded">
                            Entry File
                          </span>
                        )}
                      </span>
                    </div>
                    
                    {/* Copy button (client component) */}
                    <CodeActions code={file.code} isSmall />
                  </div>
                  <div className="bg-[#282c34] p-6 overflow-auto">
                    <pre className="text-[#abb2bf] font-mono text-sm whitespace-pre">
                      {file.code}
                    </pre>
                  </div>
                </div>
              ))}
            </TabsContent>
          )}
          
          {/* Interactive edit tab */}
          <TabsContent value="edit" className="mt-6">
            <div className="border rounded-lg overflow-hidden">
              <div className="p-4 border-b bg-muted/40">
                <h3 className="font-medium flex items-center gap-2">
                  <CodeIcon className="h-4 w-4 text-primary" />
                  <span>Interactive Editor</span>
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Edit the component code and see changes in real-time
                </p>
              </div>
              <div className="bg-background">
                {/* Interactive editor with live preview */}
                <ComponentRenderer 
                  code={component.code} 
                  language={component.language} 
                  showEditor={true}
                />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}