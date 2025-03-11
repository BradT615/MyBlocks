import { notFound } from "next/navigation"
import { createClient } from "@/utils/supabase/server"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from "next/image"
import Link from "next/link"
import {
  ArrowLeft,
  Copy,
  Download,
  Eye,
  Github,
  Code as CodeIcon,
  Moon,
  Sun
} from "lucide-react"
import { CodeActions } from "./_components/code-actions"
import { ThemeToggle } from "./_components/theme-toggle"

// Function to get component by ID
async function getComponentById(id: string) {
  const supabase = await createClient()
  
  // Get the current user
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    return null
  }
  
  // Fetch the component with the given ID
  const { data: component, error } = await supabase
    .from("components")
    .select(`
      *,
      component_files(*)
    `)
    .eq("id", id)
    .single()
  
  if (error || !component) {
    console.error("Error fetching component:", error)
    return null
  }
  
  // Check if the user has access to this component
  // Users can access components if they are the owner or if the component is public
  if (component.owner_id !== user.id && !component.is_public) {
    // User doesn't have access to this component
    return null
  }
  
  // Fetch tags for this component
  const { data: componentTags } = await supabase
    .from("component_tags")
    .select(`
      tag_id,
      tags(name)
    `)
    .eq("component_id", id)
  
  // Extract tag names safely
  const tags = componentTags?.map(item => {
    // Check if tags exists and has a name property
    if (item.tags && typeof item.tags === 'object' && 'name' in item.tags) {
      return item.tags.name;
    }
    return null;
  }).filter(Boolean) || []
  
  // Return the component with additional files and tags
  return {
    ...component,
    tags
  }
}

export default async function ComponentDetailPage({
  params
}: {
  params: { id: string }
}) {
  // Make sure to await params.id properly
  const { id } = params
  const component = await getComponentById(id)
  
  if (!component) {
    notFound()
  }
  
  // Extract utilities if any
  const utilities = component.utilities ? component.utilities.split(',') : []
  
  // Parse additional files from the component_files array
  const additionalFiles = component.component_files || []
  
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
          
          {/* Component preview */}
          <div className="border rounded-lg overflow-hidden">
            <div className="p-4 border-b bg-muted/40 flex items-center justify-between">
              <h3 className="font-medium flex items-center gap-2">
                <Eye className="h-4 w-4 text-primary" />
                Preview
              </h3>
              
              {/* Theme toggle extracted to client component */}
              <ThemeToggle />
            </div>
            <div className="aspect-video relative bg-background flex items-center justify-center">
              {component.preview_image_url ? (
                <Image 
                  src={component.preview_image_url} 
                  alt={component.name} 
                  fill 
                  className="object-contain"
                />
              ) : (
                <div className="text-muted-foreground text-center p-12">
                  <CodeIcon className="h-12 w-12 mx-auto mb-4 opacity-20" />
                  <p>Preview not available</p>
                </div>
              )}
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
              {additionalFiles.map((file: any) => (
                <div key={file.id} className="border rounded-lg overflow-hidden">
                  <div className="p-4 border-b bg-muted/40 flex items-center justify-between">
                    <div className="font-medium flex items-center gap-2">
                      <CodeIcon className="h-4 w-4 text-primary" />
                      <span>{file.filename}</span>
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
        </Tabs>
      </div>
    </div>
  )
}