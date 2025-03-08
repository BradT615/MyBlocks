"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { DashboardHeader } from '@/app/(protected)/_components/dashboard-header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ComponentUploadModal } from '@/app/(protected)/_components/component-upload';
import { 
  PlusCircle, 
  Search, 
  Filter, 
  Grid3X3, 
  List, 
  ArrowUpDown,
  Tag
} from 'lucide-react';

export default function ComponentsGallery() {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
  // This would typically come from API/database
  const components = [
    { 
      id: 'button-1', 
      name: 'Primary Button', 
      description: 'A customizable primary button component with variants',
      updatedAt: '2 days ago', 
      tags: ['ui', 'button', 'interactive'],
      previewImgUrl: '/api/placeholder/400/300',
      isPublic: true
    },
    { 
      id: 'dropdown-1', 
      name: 'Dropdown Menu', 
      description: 'Accessible dropdown menu with keyboard navigation',
      updatedAt: '5 days ago', 
      tags: ['ui', 'menu', 'navigation'],
      previewImgUrl: '/api/placeholder/400/300',
      isPublic: true
    },
    { 
      id: 'card-1', 
      name: 'Gradient Card', 
      description: 'Card component with customizable gradient background',
      updatedAt: '1 week ago', 
      tags: ['ui', 'card', 'layout'],
      previewImgUrl: '/api/placeholder/400/300',
      isPublic: false
    },
    { 
      id: 'navbar-1', 
      name: 'Responsive Navbar', 
      description: 'Fully responsive navigation bar with mobile menu',
      updatedAt: '2 weeks ago', 
      tags: ['layout', 'navigation', 'responsive'],
      previewImgUrl: '/api/placeholder/400/300',
      isPublic: true
    },
    { 
      id: 'form-1', 
      name: 'Sign Up Form', 
      description: 'Validated sign up form with error handling',
      updatedAt: '3 weeks ago', 
      tags: ['ui', 'form', 'validation'],
      previewImgUrl: '/api/placeholder/400/300',
      isPublic: false
    },
    { 
      id: 'modal-1', 
      name: 'Modal Dialog', 
      description: 'Accessible modal dialog with focus trapping',
      updatedAt: '1 month ago', 
      tags: ['ui', 'modal', 'accessibility'],
      previewImgUrl: '/api/placeholder/400/300',
      isPublic: true
    },
  ];

  // All unique tags from components
  const allTags = Array.from(new Set(
    components.flatMap(component => component.tags)
  ));

  // Filter components based on search and selected tags
  const filteredComponents = components.filter(component => {
    const matchesSearch = searchQuery === '' || 
      component.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      component.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesTags = selectedTags.length === 0 || 
      selectedTags.every(tag => component.tags.includes(tag));
    
    return matchesSearch && matchesTags;
  });

  // Handle tag selection
  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag) 
        : [...prev, tag]
    );
  };

  const handleOpenComponent = (id: string) => {
    router.push(`/components/${id}`);
  };

  return (
    <>
      <DashboardHeader 
        heading="Components" 
        text="Browse and manage your UI components"
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
        <Tabs defaultValue="all" className="w-full">
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
              <Select defaultValue="newest">
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
              <Select>
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
            {filteredComponents.length === 0 ? (
              <div className="rounded-xl border bg-card shadow-sm p-8 text-center">
                <h3 className="text-lg font-semibold mb-2">No components found</h3>
                <p className="text-muted-foreground mb-6">
                  Try adjusting your search or filter criteria
                </p>
              </div>
            ) : viewMode === 'grid' ? (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {filteredComponents.map(component => (
                  <Card 
                    key={component.id}
                    className="overflow-hidden cursor-pointer transition-all hover:shadow-md hover:border-primary/20"
                    onClick={() => handleOpenComponent(component.id)}
                  >
                    <div className="aspect-video relative bg-muted/50">
                      <div className="w-full h-full relative">
                        <Image 
                          src={component.previewImgUrl} 
                          alt={component.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      {!component.isPublic && (
                        <div className="absolute top-2 right-2">
                          <span className="text-xs bg-background/90 backdrop-blur-sm px-2 py-1 rounded-full border">
                            Private
                          </span>
                        </div>
                      )}
                    </div>
                    <CardContent className="p-4">
                      <div>
                        <h3 className="font-medium">{component.name}</h3>
                        <p className="text-xs text-muted-foreground mt-1">{component.description}</p>
                      </div>
                      
                      <div className="flex mt-2 gap-1 flex-wrap">
                        {component.tags.map(tag => (
                          <span 
                            key={tag} 
                            className="inline-flex items-center rounded-full border px-2 py-0.5 text-xs"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">Updated {component.updatedAt}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="space-y-2">
                {filteredComponents.map(component => (
                  <div 
                    key={component.id}
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
                          <span className="ml-2 text-xs bg-muted px-1.5 py-0.5 rounded-full">
                            Private
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground truncate">{component.description}</p>
                    </div>
                    <div className="flex gap-1 flex-wrap justify-end ml-4">
                      {component.tags.slice(0, 2).map(tag => (
                        <span 
                          key={tag} 
                          className="inline-flex items-center rounded-full border px-2 py-0.5 text-xs"
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
                  </div>
                ))}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="public">
            {/* Similar content as 'all' but filtered for public components */}
          </TabsContent>
          
          <TabsContent value="private">
            {/* Similar content as 'all' but filtered for private components */}
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