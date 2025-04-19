import { notFound } from "next/navigation"
import { createClient } from "@/utils/supabase/server"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import Image from "next/image"
import {
  ArrowLeft,
  Download,
  Eye,
  Github,
  Code as CodeIcon,
  User,
  Package,
  Copy,
  ExternalLink,
  ArrowDownToLine,
  Star,
  ChevronRight,
  FileCode,
  Hash,
  Layers,
  Settings2
} from "lucide-react"
import { CodeActions } from "./_components/code-actions"
import { ComponentRenderer } from "./_components/component-renderer"
import { ThemeToggleWithState } from "./_components/theme-toggle-with-state"
import { cn } from "@/lib/utils"


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
  params: Promise<{ id: string }>;
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
    <div className="flex h-[calc(100vh-5rem)] flex-col overflow-hidden bg-background">
      {/* Status bar / breadcrumbs */}
      <div className="flex h-12 items-center justify-between border-b bg-muted/30 px-4">
        <div className="flex items-center gap-2">
          <Link 
            href="/components" 
            className="flex items-center text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="mr-1 h-3.5 w-3.5" /> 
            components
          </Link>
          <ChevronRight className="h-3 w-3 text-muted-foreground" />
          <span className="text-xs font-medium">{component.name}</span>
        </div>
        
        <div className="flex items-center gap-1.5">
          <ThemeToggleWithState />
          
          <Button size="sm" variant="ghost" className="h-7 w-7 p-0" title="Star Component">
            <Star className="h-3.5 w-3.5" />
          </Button>
          
          <Button size="sm" variant="ghost" className="h-7 w-7 p-0" title="Download">
            <ArrowDownToLine className="h-3.5 w-3.5" />
          </Button>
          
          <Button size="sm" variant="ghost" className="h-7 w-7 p-0" title="Copy Code">
            <Copy className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>
      
      {/* Main work area - split view */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left sidebar: navigation and info */}
        <div className="w-64 border-r flex flex-col bg-muted/10">
          {/* Component Info */}
          <div className="p-4 border-b">
            <h1 className="text-xl font-semibold mb-1">{component.name}</h1>
            <p className="text-xs text-muted-foreground line-clamp-3">
              {component.description || "No description provided"}
            </p>
          </div>
          
          {/* Navigation Tabs */}
          <Tabs defaultValue="files" className="flex-1 flex flex-col">
            <div className="border-b bg-muted/20">
              <TabsList className="w-full justify-start rounded-none border-b bg-transparent p-0 h-10">
                <TabsTrigger 
                  value="files" 
                  className="rounded-none border-b-2 border-b-transparent px-4 py-2.5 data-[state=active]:border-b-primary data-[state=active]:bg-transparent h-10"
                >
                  Files
                </TabsTrigger>
                <TabsTrigger 
                  value="info" 
                  className="rounded-none border-b-2 border-b-transparent px-4 py-2.5 data-[state=active]:border-b-primary data-[state=active]:bg-transparent h-10"
                >
                  Info
                </TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="files" className="flex-1 p-0 m-0">
              <ScrollArea className="h-full p-2">
                <div className="space-y-0.5">
                  <div className="text-xs font-medium text-muted-foreground py-1.5 px-3">PROJECT</div>
                  {/* Main file */}
                  <div className="rounded-md hover:bg-accent/50 cursor-pointer">
                    <div className="flex items-center gap-2 py-1.5 px-3">
                      <FileCode className="h-3.5 w-3.5 text-blue-400" />
                      <span className="text-sm">{component.name}.{component.language}</span>
                    </div>
                  </div>
                  
                  {/* Additional files */}
                  {additionalFiles.map((file: any) => (
                    <div key={file.id} className="rounded-md hover:bg-accent/50 cursor-pointer">
                      <div className="flex items-center gap-2 py-1.5 px-3">
                        <FileCode className="h-3.5 w-3.5 text-orange-400" />
                        <span className="text-sm">{file.filename}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>
            
            <TabsContent value="info" className="flex-1 p-0 m-0">
              <ScrollArea className="h-full">
                <div className="p-4 space-y-5">
                  {/* Creator info */}
                  <div>
                    <h3 className="text-xs font-medium text-muted-foreground mb-2">CREATOR</h3>
                    <div className="flex items-center gap-2">
                      <div className="h-7 w-7 rounded-full bg-muted flex items-center justify-center overflow-hidden">
                        {creatorAvatar ? (
                          <Image 
                            src={creatorAvatar} 
                            alt={creatorName} 
                            width={28} 
                            height={28} 
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <User className="h-4 w-4 text-muted-foreground" />
                        )}
                      </div>
                      <span className="text-sm">{creatorName}</span>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  {/* Details */}
                  <div>
                    <h3 className="text-xs font-medium text-muted-foreground mb-2">DETAILS</h3>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="flex flex-col">
                        <span className="text-muted-foreground">Language</span>
                        <span className="font-medium capitalize">{component.language}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-muted-foreground">Framework</span>
                        <span className="font-medium capitalize">{component.framework}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-muted-foreground">Render Mode</span>
                        <span className="font-medium capitalize">{component.render_mode}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-muted-foreground">Visibility</span>
                        <span className="font-medium">{component.is_public ? "Public" : "Private"}</span>
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  {/* Tags */}
                  {component.tags && component.tags.length > 0 && (
                    <div>
                      <h3 className="text-xs font-medium text-muted-foreground mb-2">TAGS</h3>
                      <div className="flex flex-wrap gap-1.5">
                        {component.tags.map((tag: string) => (
                          <Badge 
                            key={tag} 
                            variant="secondary"
                            className="text-xs px-1.5 py-0 h-5"
                          >
                            <Hash className="h-3 w-3 mr-1" />
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* Utilities */}
                  {utilities.length > 0 && (
                    <>
                      <Separator />
                      <div>
                        <h3 className="text-xs font-medium text-muted-foreground mb-2">UTILITIES</h3>
                        <div className="flex flex-wrap gap-1.5">
                          {utilities.map((utility: string) => (
                            <Badge 
                              key={utility} 
                              variant="outline"
                              className="text-xs px-1.5 py-0 h-5 bg-primary/5"
                            >
                              <Layers className="h-3 w-3 mr-1" />
                              {utility}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </>
                  )}
                  
                  {/* Dependencies */}
                  {component.dependencies && component.dependencies.length > 0 && (
                    <>
                      <Separator />
                      <div>
                        <h3 className="text-xs font-medium text-muted-foreground mb-2">DEPENDENCIES</h3>
                        <div className="flex flex-wrap gap-1.5">
                          {component.dependencies.map((dep: any) => (
                            <Badge 
                              key={dep.id} 
                              variant="outline"
                              className={cn(
                                "text-xs px-1.5 py-0 h-5",
                                dep.is_dev_dependency ? "bg-amber-500/10" : "bg-blue-500/10"
                              )}
                            >
                              <Package className="h-3 w-3 mr-1" />
                              {dep.package_name}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </ScrollArea>
            </TabsContent>
          </Tabs>
          
          {/* External links */}
          <div className="border-t p-2">
            <div className="grid grid-cols-2 gap-1">
              <Button size="sm" variant="ghost" className="h-8 justify-start text-xs gap-1 px-2">
                <Github className="h-3.5 w-3.5" />
                Fork
              </Button>
              <Button size="sm" variant="ghost" className="h-8 justify-start text-xs gap-1 px-2">
                <Download className="h-3.5 w-3.5" />
                Download
              </Button>
              <Button size="sm" variant="ghost" className="h-8 justify-start text-xs gap-1 px-2">
                <Eye className="h-3.5 w-3.5" />
                Preview
              </Button>
              <Button size="sm" variant="ghost" className="h-8 justify-start text-xs gap-1 px-2">
                <Settings2 className="h-3.5 w-3.5" />
                Settings
              </Button>
            </div>
          </div>
        </div>
        
        {/* Main editor area - code and preview split */}
        <div className="flex-1 flex flex-col">
          <Tabs defaultValue="split" className="flex-1 flex flex-col">
            <div className="border-b bg-muted/20">
              <TabsList className="justify-start rounded-none border-b bg-transparent p-0 h-10">
                <TabsTrigger 
                  value="split" 
                  className="rounded-none border-b-2 border-b-transparent px-4 py-2.5 data-[state=active]:border-b-primary data-[state=active]:bg-transparent h-10"
                >
                  Split
                </TabsTrigger>
                <TabsTrigger 
                  value="editor" 
                  className="rounded-none border-b-2 border-b-transparent px-4 py-2.5 data-[state=active]:border-b-primary data-[state=active]:bg-transparent h-10"
                >
                  Code
                </TabsTrigger>
                <TabsTrigger 
                  value="preview" 
                  className="rounded-none border-b-2 border-b-transparent px-4 py-2.5 data-[state=active]:border-b-primary data-[state=active]:bg-transparent h-10"
                >
                  Preview
                </TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="split" className="flex-1 p-0 m-0">
              <div className="flex h-full">
                {/* Code editor */}
                <div className="w-1/2 border-r flex flex-col">
                  <Tabs defaultValue="main" className="flex-1 flex flex-col">
                    <div className="border-b bg-muted/20">
                      <TabsList className="h-8 rounded-none border-b-0 bg-transparent p-0 px-3">
                        <TabsTrigger 
                          value="main" 
                          className="h-8 rounded-none data-[state=active]:bg-muted data-[state=active]:shadow-none rounded-t-md px-3 py-1.5 text-xs"
                        >
                          {component.name}.{component.language}
                        </TabsTrigger>
                        {additionalFiles.map((file: any) => (
                          <TabsTrigger 
                            key={file.id} 
                            value={file.id}
                            className="h-8 rounded-none data-[state=active]:bg-muted data-[state=active]:shadow-none rounded-t-md px-3 py-1.5 text-xs"
                          >
                            {file.filename}
                          </TabsTrigger>
                        ))}
                      </TabsList>
                    </div>
                    
                    <TabsContent value="main" className="flex-1 p-0 m-0 overflow-hidden">
                      <ScrollArea className="h-full">
                        <div className="bg-muted flex min-h-full">
                          <div className="py-4 pr-4 pl-2 text-right border-r border-border/50 select-none">
                            {Array.from({ length: component.code.split('\n').length }).map((_, i) => (
                              <div key={i} className="text-xs text-muted-foreground">{i + 1}</div>
                            ))}
                          </div>
                          <pre className="flex-1 p-4 font-mono text-xs overflow-auto">
                            <code className="language-tsx">{component.code}</code>
                          </pre>
                        </div>
                      </ScrollArea>
                    </TabsContent>
                    
                    {additionalFiles.map((file: any) => (
                      <TabsContent key={file.id} value={file.id} className="flex-1 p-0 m-0 overflow-hidden">
                        <ScrollArea className="h-full">
                          <div className="bg-muted flex min-h-full">
                            <div className="py-4 pr-4 pl-2 text-right border-r border-border/50 select-none">
                              {Array.from({ length: file.code.split('\n').length }).map((_, i) => (
                                <div key={i} className="text-xs text-muted-foreground">{i + 1}</div>
                              ))}
                            </div>
                            <pre className="flex-1 p-4 font-mono text-xs overflow-auto">
                              <code className={`language-${file.language || 'js'}`}>{file.code}</code>
                            </pre>
                          </div>
                        </ScrollArea>
                      </TabsContent>
                    ))}
                  </Tabs>
                </div>
                
                {/* Preview */}
                <div className="w-1/2 flex flex-col overflow-hidden">
                  <div className="h-8 border-b bg-muted/20 flex items-center px-3">
                    <div className="text-xs font-medium text-muted-foreground">Preview</div>
                  </div>
                  <div className="flex-1 overflow-hidden p-4 bg-background">
                    <ComponentRenderer 
                      code={component.code} 
                      language={component.language}
                      additionalFiles={additionalFiles.map((file: any) => ({
                        filename: file.filename,
                        code: file.code,
                        language: file.language || 'js'
                      }))}
                      showEditor={false} 
                    />
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="editor" className="flex-1 p-0 m-0">
              <Tabs defaultValue="main" className="flex-1 flex flex-col">
                <div className="border-b bg-muted/20">
                  <TabsList className="h-8 rounded-none border-b-0 bg-transparent p-0 px-3">
                    <TabsTrigger 
                      value="main" 
                      className="h-8 rounded-none data-[state=active]:bg-muted data-[state=active]:shadow-none rounded-t-md px-3 py-1.5 text-xs"
                    >
                      {component.name}.{component.language}
                    </TabsTrigger>
                    {additionalFiles.map((file: any) => (
                      <TabsTrigger 
                        key={file.id} 
                        value={file.id}
                        className="h-8 rounded-none data-[state=active]:bg-muted data-[state=active]:shadow-none rounded-t-md px-3 py-1.5 text-xs"
                      >
                        {file.filename}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </div>
                
                <TabsContent value="main" className="flex-1 p-0 m-0 overflow-hidden">
                  <ScrollArea className="h-full">
                    <div className="bg-muted flex min-h-full">
                      <div className="py-4 pr-4 pl-2 text-right border-r border-border/50 select-none">
                        {Array.from({ length: component.code.split('\n').length }).map((_, i) => (
                          <div key={i} className="text-xs text-muted-foreground">{i + 1}</div>
                        ))}
                      </div>
                      <pre className="flex-1 p-4 font-mono text-xs overflow-auto">
                        <code className="language-tsx">{component.code}</code>
                      </pre>
                    </div>
                  </ScrollArea>
                </TabsContent>
                
                {additionalFiles.map((file: any) => (
                  <TabsContent key={file.id} value={file.id} className="flex-1 p-0 m-0 overflow-hidden">
                    <ScrollArea className="h-full">
                      <div className="bg-muted flex min-h-full">
                        <div className="py-4 pr-4 pl-2 text-right border-r border-border/50 select-none">
                          {Array.from({ length: file.code.split('\n').length }).map((_, i) => (
                            <div key={i} className="text-xs text-muted-foreground">{i + 1}</div>
                          ))}
                        </div>
                        <pre className="flex-1 p-4 font-mono text-xs overflow-auto">
                          <code className={`language-${file.language || 'js'}`}>{file.code}</code>
                        </pre>
                      </div>
                    </ScrollArea>
                  </TabsContent>
                ))}
              </Tabs>
            </TabsContent>
            
            <TabsContent value="preview" className="flex-1 p-0 m-0">
              <div className="h-8 border-b bg-muted/20 flex items-center px-3">
                <div className="text-xs font-medium text-muted-foreground">Preview</div>
              </div>
              <div className="flex-1 overflow-auto p-6 bg-background">
                <ComponentRenderer 
                  code={component.code} 
                  language={component.language}
                  additionalFiles={additionalFiles.map((file: any) => ({
                    filename: file.filename,
                    code: file.code,
                    language: file.language || 'js'
                  }))}
                  showEditor={false} 
                />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      
      {/* Status bar */}
      <div className="flex h-8 items-center justify-between border-t bg-muted/30 px-4 text-xs text-muted-foreground">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <span className="font-medium capitalize">{component.language}</span>
          </div>
          <div>Last updated: {new Date(component.updated_at).toLocaleString()}</div>
        </div>
        <div className="flex items-center gap-3">
          <Link href={`/components/${id}/edit`} className="text-xs hover:text-foreground transition-colors">
            Edit Component
          </Link>
          <Link href={`/components/${id}/download`} className="text-xs hover:text-foreground transition-colors">
            Download
          </Link>
        </div>
      </div>
    </div>
  )
}