"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { DashboardHeader } from '@/app/(protected)/_components/dashboard-header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { ComponentUploadModal } from '@/app/(protected)/_components/component-upload';
import { 
  PlusCircle, 
  Search, 
  Filter, 
  Grid3X3, 
  List, 
  ArrowUpDown,
  Tag,
  Upload,
  Code,
  Eye,
  Lock,
  Loader2
} from 'lucide-react';
import { createClient } from '@/utils/supabase/client';

// Define types for component data
interface ComponentTag {
  tags?: {
    name: string;
  };
}

interface ComponentProfile {
  full_name?: string;
  avatar_url?: string;
}

interface Component {
  id: string;
  name: string;
  description: string;
  updated_at: string;
  is_public: boolean;
  profile_id: string;
  preview_image_url?: string;
  component_tags?: ComponentTag[];
  profiles?: ComponentProfile;
}

interface TransformedComponent {
  id: string;
  name: string;
  description: string;
  updatedAt: string;
  tags: string[];
  previewImgUrl: string;
  isPublic: boolean;
}

export default function ComponentsGallery() {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [currentTab, setCurrentTab] = useState('all');
  const [sortOrder, setSortOrder] = useState('newest');
  // Add state for real components data
  const [components, setComponents] = useState<TransformedComponent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [allTags, setAllTags] = useState<string[]>([]);

  // Fetch components on mount
  useEffect(() => {
    async function fetchComponents() {
      setIsLoading(true);
      try {
        const supabase = createClient();
        
        // Get current user
        const { data: { user } } = await supabase.auth.getUser();
        
        if (!user) {
          throw new Error('User not authenticated');
        }
        
        // Fetch components that are either public or owned by the user
        const { data: componentsData, error: componentsError } = await supabase
          .from("components")
          .select(`
            *,
            profiles(full_name, avatar_url),
            component_tags(tags(name))
          `)
          .or(`profile_id.eq.${user.id},is_public.eq.true`);
        
        if (componentsError) {
          throw componentsError;
        }
        
        if (!componentsData) {
          setComponents([]);
          return;
        }

        // Transform the data to match the expected format
        const transformedComponents = componentsData.map((component: Component) => {
          // Extract tags from the component_tags relation
          const tags = component.component_tags
            ?.filter((ct) => ct.tags)
            .map((ct) => ct.tags?.name)
            .filter((name): name is string => typeof name === 'string') || [];
          
          return {
            id: component.id,
            name: component.name,
            description: component.description || '',
            updatedAt: formatRelativeTime(component.updated_at),
            tags: tags,
            previewImgUrl: component.preview_image_url || '/api/placeholder/400/300',
            isPublic: component.is_public
          };
        });
        
        // Extract all unique tags for filtering
        const allTagValues = Array.from(new Set(
          transformedComponents.flatMap(component => component.tags)
        ));
        
        setComponents(transformedComponents);
        setAllTags(allTagValues);
        setErrorMessage(null);
      } catch (err) {
        console.error('Error fetching components:', err);
        setErrorMessage('Failed to load components. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchComponents();
  }, []);

  // Helper function to format relative time
  function formatRelativeTime(timestamp: string) {
    if (!timestamp) return 'Unknown time';
    
    const date = new Date(timestamp);
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    
    if (diffInDays === 0) {
      const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
      if (diffInHours === 0) {
        const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
        return `${diffInMinutes} minutes ago`;
      }
      return `${diffInHours} hours ago`;
    }
    if (diffInDays === 1) return 'yesterday';
    if (diffInDays < 7) return `${diffInDays} days ago`;
    if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`;
    if (diffInDays < 365) return `${Math.floor(diffInDays / 30)} months ago`;
    return `${Math.floor(diffInDays / 365)} years ago`;
  }

  // Filter components based on search, selected tags, and current tab
  const filteredComponents = components.filter(component => {
    const matchesSearch = searchQuery === '' || 
      component.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      component.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      component.tags.some((tag: string) => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesTags = selectedTags.length === 0 || 
      selectedTags.every(tag => component.tags.includes(tag));
    
    const matchesTab = 
      (currentTab === 'all') || 
      (currentTab === 'public' && component.isPublic) || 
      (currentTab === 'private' && !component.isPublic);
    
    return matchesSearch && matchesTags && matchesTab;
  });

  // Sort components based on the selected sort order
  const sortedComponents = [...filteredComponents].sort((a, b) => {
    switch (sortOrder) {
      case 'newest':
        return a.updatedAt.includes('minute') ? -1 : (a.updatedAt.includes('hour') ? -1 : 1);
      case 'oldest':
        return a.updatedAt.includes('minute') ? 1 : (a.updatedAt.includes('hour') ? 1 : -1);
      case 'name-asc':
        return a.name.localeCompare(b.name);
      case 'name-desc':
        return b.name.localeCompare(a.name);
      default:
        return 0;
    }
  });

  // Handle tag selection
  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag) 
        : [...prev, tag]
    );
  };

  // Handle opening a component
  const handleOpenComponent = (id: string) => {
    router.push(`/components/${id}`);
  };



  // Empty state component for when no components match filters
  const EmptyState = () => (
    <div className="rounded-xl border bg-card shadow-sm p-8 text-center">
      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 mb-6">
        <Code className="h-10 w-10 text-primary/80" />
      </div>
      <h3 className="text-xl font-semibold mb-3">No components found</h3>
      <p className="text-muted-foreground mb-8 max-w-md mx-auto">
        {searchQuery || selectedTags.length > 0
          ? "Try adjusting your search or filter criteria."
          : "Start building your component library by uploading your first component."}
      </p>
      <Button 
        className="flex items-center gap-2"
        onClick={() => setIsModalOpen(true)}
      >
        <PlusCircle className="h-4 w-4" />
        <span>Add Your First Component</span>
      </Button>
    </div>
  );

  // EmptyLibrary component (shown when there are no components)
  const EmptyLibrary = () => (
    <div className="rounded-xl border p-12 text-center mt-8 bg-muted/10">
      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 mb-6">
        <Upload className="h-10 w-10 text-primary/80" />
      </div>
      <h3 className="text-xl font-semibold mb-3">Your Component Library is Empty</h3>
      <p className="text-muted-foreground mb-8 max-w-md mx-auto">
        Get started by adding your first component
      </p>
      <Button 
        className="flex items-center gap-2"
        onClick={() => setIsModalOpen(true)}
      >
        <PlusCircle className="h-4 w-4" />
        <span>Add Component</span>
      </Button>
    </div>
  );

  // Loading state
  const LoadingState = () => (
    <div className="w-full flex items-center justify-center py-12">
      <div className="flex flex-col items-center">
        <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
        <p className="text-muted-foreground">Loading components...</p>
      </div>
    </div>
  );

  // Add component card (for grid view)
  const AddComponentCard = () => (
    <Card 
      onClick={() => setIsModalOpen(true)}
      className="overflow-hidden cursor-pointer transition-all hover:shadow-md hover:border-primary/20 group flex flex-col justify-center items-center p-8 bg-muted/10"
    >
      <div className="rounded-full bg-primary/10 p-4 mb-4">
        <PlusCircle className="h-8 w-8 text-primary" />
      </div>
      <h3 className="font-medium text-center mb-2">Add New Component</h3>
      <p className="text-xs text-muted-foreground text-center max-w-[200px]">
        Click to add a component to your library
      </p>
    </Card>
  );

  // Add component list item (for list view)
  const AddComponentListItem = () => (
    <div 
      className="rounded-lg border bg-card shadow-sm transition-all hover:shadow-md hover:border-primary/20 cursor-pointer p-4 flex items-center bg-muted/10"
      onClick={() => setIsModalOpen(true)}
    >
      <div className="h-12 w-12 bg-primary/10 rounded-md mr-4 flex items-center justify-center">
        <PlusCircle className="h-6 w-6 text-primary" />
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="font-medium">Add New Component</h3>
        <p className="text-xs text-muted-foreground">Click to add a component to your library</p>
      </div>
    </div>
  );

  // Card component for grid view
  const ComponentCard = ({ component }: { component: TransformedComponent }) => (
    <Card 
      className="overflow-hidden cursor-pointer transition-all hover:shadow-md hover:border-primary/20 group"
      onClick={() => handleOpenComponent(component.id)}
    >
      <div className="aspect-video relative bg-muted/50 overflow-hidden group-hover:bg-muted/70">
        <Image 
          src={component.previewImgUrl} 
          alt={component.name}
          fill
          className="object-cover transition-transform group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-between p-3">
          <Button variant="secondary" size="sm" className="gap-1">
            <Eye className="h-3.5 w-3.5" />
            <span>Preview</span>
          </Button>
          <Button variant="secondary" size="sm" className="gap-1">
            <Code className="h-3.5 w-3.5" />
            <span>Code</span>
          </Button>
        </div>
        {!component.isPublic && (
          <div className="absolute top-2 right-2">
            <span className="text-xs bg-background/90 backdrop-blur-sm px-2 py-1 rounded-full border flex items-center gap-1">
              <Lock className="h-3 w-3" />
              Private
            </span>
          </div>
        )}
      </div>
      <CardContent className="p-4">
        <div>
          <h3 className="font-medium line-clamp-1">{component.name}</h3>
          <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{component.description}</p>
        </div>
        
        <div className="flex mt-3 gap-1 flex-wrap">
          {component.tags.slice(0, 3).map((tag: string) => (
            <span 
              key={tag} 
              className="inline-flex items-center rounded-full border px-2 py-0.5 text-xs"
              onClick={(e) => {
                e.stopPropagation();
                toggleTag(tag);
              }}
            >
              {tag}
            </span>
          ))}
          {component.tags.length > 3 && (
            <span className="text-xs text-muted-foreground">
              +{component.tags.length - 3}
            </span>
          )}
        </div>
        <p className="text-xs text-muted-foreground mt-3">Updated {component.updatedAt}</p>
      </CardContent>
    </Card>
  );

  // List item component for list view
  const ComponentListItem = ({ component }: { component: TransformedComponent }) => (
    <div 
      className="rounded-lg border bg-card shadow-sm transition-all hover:shadow-md hover:border-primary/20 cursor-pointer p-4 flex items-center"
      onClick={() => handleOpenComponent(component.id)}
    >
      <div className="h-12 w-12 bg-muted/50 rounded-md mr-4 overflow-hidden">
        <div className="h-full w-full relative">
          <Image 
            src={component.previewImgUrl} 
            alt={component.name}
            fill
            className="object-cover"
          />
        </div>
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center mb-1">
          <h3 className="font-medium truncate">{component.name}</h3>
          {!component.isPublic && (
            <span className="ml-2 text-xs bg-muted px-1.5 py-0.5 rounded-full flex items-center gap-1">
              <Lock className="h-3 w-3" />
              Private
            </span>
          )}
        </div>
        <p className="text-xs text-muted-foreground truncate">{component.description}</p>
      </div>
      <div className="flex gap-1 flex-wrap justify-end ml-4">
        {component.tags.slice(0, 2).map((tag: string) => (
          <span 
            key={tag} 
            className="inline-flex items-center rounded-full border px-2 py-0.5 text-xs"
            onClick={(e) => {
              e.stopPropagation();
              toggleTag(tag);
            }}
          >
            {tag}
          </span>
        ))}
        {component.tags.length > 2 && (
          <span className="text-xs text-muted-foreground">
            +{component.tags.length - 2}
          </span>
        )}
      </div>
      <p className="text-xs text-muted-foreground ml-4 whitespace-nowrap">
        {component.updatedAt}
      </p>
      <div className="ml-4 flex gap-2">
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={(e) => {
          e.stopPropagation();
          // View code implementation
        }}>
          <Code className="h-4 w-4" />
          <span className="sr-only">View Code</span>
        </Button>
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={(e) => {
          e.stopPropagation();
          // Preview component
        }}>
          <Eye className="h-4 w-4" />
          <span className="sr-only">Preview</span>
        </Button>
      </div>
    </div>
  );

  return (
    <>
      <DashboardHeader 
        heading="Components" 
        text="Browse, manage, and add UI components to your library"
      >
        <Button 
          className="flex items-center gap-1"
          onClick={() => setIsModalOpen(true)}
        >
          <PlusCircle className="h-4 w-4" />
          <span>Add Component</span>
        </Button>
      </DashboardHeader>
      
      <div className="mt-6">
        <Tabs defaultValue="all" className="w-full" onValueChange={setCurrentTab}>
          <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
            <TabsList className="grid grid-cols-3 w-full max-w-md">
              <TabsTrigger value="all">All Components</TabsTrigger>
              <TabsTrigger value="public">Public</TabsTrigger>
              <TabsTrigger value="private">Private</TabsTrigger>
            </TabsList>
            <div className="flex items-center gap-2">
              <Button 
                variant={viewMode === 'grid' ? 'secondary' : 'outline'} 
                size="sm"
                onClick={() => setViewMode('grid')}
                className="h-9 w-9 p-0"
              >
                <Grid3X3 className="h-4 w-4" />
                <span className="sr-only">Grid view</span>
              </Button>
              <Button 
                variant={viewMode === 'list' ? 'secondary' : 'outline'} 
                size="sm"
                onClick={() => setViewMode('list')}
                className="h-9 w-9 p-0"
              >
                <List className="h-4 w-4" />
                <span className="sr-only">List view</span>
              </Button>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search components..."
                className="w-full pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Select defaultValue="newest" onValueChange={setSortOrder}>
                <SelectTrigger className="w-40 flex items-center gap-1">
                  <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="oldest">Oldest First</SelectItem>
                  <SelectItem value="name-asc">Name (A-Z)</SelectItem>
                  <SelectItem value="name-desc">Name (Z-A)</SelectItem>
                </SelectContent>
              </Select>
              {allTags.length > 0 && (
                <Select onValueChange={(value) => toggleTag(value)}>
                  <SelectTrigger className="w-40 flex items-center gap-1">
                    <Filter className="h-4 w-4 text-muted-foreground" />
                    <SelectValue placeholder="Filter by tag" />
                  </SelectTrigger>
                  <SelectContent>
                    {allTags.map(tag => (
                      <SelectItem key={tag} value={tag}>{tag}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            </div>
          </div>

          {selectedTags.length > 0 && (
            <div className="flex gap-2 mb-6 flex-wrap">
              <div className="flex items-center">
                <Tag className="h-4 w-4 mr-1" />
                <span className="text-sm">Filters:</span>
              </div>
              {selectedTags.map(tag => (
                <Button
                  key={tag}
                  variant="secondary"
                  size="sm"
                  className="h-7 text-xs gap-1"
                  onClick={() => toggleTag(tag)}
                >
                  {tag}
                  <span className="rounded-full h-4 w-4 flex items-center justify-center bg-muted text-muted-foreground">×</span>
                </Button>
              ))}
              <Button
                variant="ghost"
                size="sm"
                className="h-7 text-xs"
                onClick={() => setSelectedTags([])}
              >
                Clear all
              </Button>
            </div>
          )}

          <TabsContent value="all" className="mt-0">
            {isLoading ? (
              <LoadingState />
            ) : components.length === 0 ? (
              <EmptyLibrary />
            ) : sortedComponents.length === 0 ? (
              errorMessage ? (
                <div className="rounded-xl border bg-card shadow-sm p-8 text-center">
                  <h3 className="text-xl font-semibold mb-3">Error Loading Components</h3>
                  <p className="text-muted-foreground mb-4">{errorMessage}</p>
                  <Button onClick={() => window.location.reload()}>
                    Try Again
                  </Button>
                </div>
              ) : (
                <EmptyState />
              )
            ) : viewMode === 'grid' ? (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {sortedComponents.map(component => (
                  <ComponentCard key={component.id} component={component} />
                ))}
                <AddComponentCard />
              </div>
            ) : (
              <div className="space-y-2">
                {sortedComponents.map(component => (
                  <ComponentListItem key={component.id} component={component} />
                ))}
                <AddComponentListItem />
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="public">
            {isLoading ? (
              <LoadingState />
            ) : errorMessage ? (
              <div className="rounded-xl border bg-card shadow-sm p-8 text-center">
                <h3 className="text-xl font-semibold mb-3">Error Loading Components</h3>
                <p className="text-muted-foreground mb-4">{errorMessage}</p>
                <Button onClick={() => window.location.reload()}>
                  Try Again
                </Button>
              </div>
            ) : errorMessage ? (
              <div className="rounded-xl border bg-card shadow-sm p-8 text-center">
                <h3 className="text-xl font-semibold mb-3">Error Loading Components</h3>
                <p className="text-muted-foreground mb-4">{errorMessage}</p>
                <Button onClick={() => window.location.reload()}>
                  Try Again
                </Button>
              </div>
            ) : sortedComponents.length === 0 ? (
              <EmptyState />
            ) : viewMode === 'grid' ? (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {sortedComponents.map(component => (
                  <ComponentCard key={component.id} component={component} />
                ))}
                <AddComponentCard />
              </div>
            ) : (
              <div className="space-y-2">
                {sortedComponents.map(component => (
                  <ComponentListItem key={component.id} component={component} />
                ))}
                <AddComponentListItem />
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="private">
            {isLoading ? (
              <LoadingState />
            ) : sortedComponents.length === 0 ? (
              <EmptyState />
            ) : viewMode === 'grid' ? (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {sortedComponents.map(component => (
                  <ComponentCard key={component.id} component={component} />
                ))}
                <AddComponentCard />
              </div>
            ) : (
              <div className="space-y-2">
                {sortedComponents.map(component => (
                  <ComponentListItem key={component.id} component={component} />
                ))}
                <AddComponentListItem />
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
      
      <ComponentUploadModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
      />
    </>
  );
}