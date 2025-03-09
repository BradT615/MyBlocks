"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  ArrowLeft, 
  PlusCircle, 
  Search, 
  Pencil, 
  MoreHorizontal, 
  Filter,
  Grid3X3,
  List,
  Trash2,
  File
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter, 
  DialogDescription,
  DialogTrigger
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useRouter } from 'next/navigation';

export default function CollectionDetail({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddComponentModalOpen, setIsAddComponentModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
  // Mock data for the collection
  const collection = {
    id: params.id,
    name: 'UI Elements',
    description: 'Basic UI elements for consistent design across the application. Includes buttons, inputs, and other common components.',
    componentsCount: 12,
    createdAt: 'Feb 28, 2025',
    updatedAt: '2 days ago',
    coverImage: '/api/placeholder/1200/300',
    author: {
      name: 'Alex Johnson',
      avatar: '/api/placeholder/40/40'
    }
  };
  
  // Mock data for components in this collection
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
      id: 'input-1', 
      name: 'Form Input', 
      description: 'Input component with validation states',
      updatedAt: '1 week ago', 
      tags: ['ui', 'form', 'input'],
      previewImgUrl: '/api/placeholder/400/300',
      isPublic: true
    },
    { 
      id: 'checkbox-1', 
      name: 'Checkbox', 
      description: 'Accessible checkbox component with custom styling',
      updatedAt: '2 weeks ago', 
      tags: ['ui', 'form', 'input'],
      previewImgUrl: '/api/placeholder/400/300',
      isPublic: true
    },
    { 
      id: 'toggle-1', 
      name: 'Toggle Switch', 
      description: 'Toggle switch component for boolean settings',
      updatedAt: '2 weeks ago', 
      tags: ['ui', 'form', 'input'],
      previewImgUrl: '/api/placeholder/400/300',
      isPublic: true
    },
  ];

  // Mock data for all components (that could be added to this collection)
  const allComponents = [
    ...components,
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

  // Filter components based on search
  const filteredComponents = components.filter(component =>
    component.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    component.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    component.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleOpenComponent = (id: string) => {
    router.push(`/components/${id}`);
  };

  return (
    <div className="pb-8">
      {/* Back button and header */}
      <div className="flex flex-col gap-6 mb-8">
        <Link 
          href="/collections"
          className="flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          <span>Back to collections</span>
        </Link>
        
        <div className="relative rounded-xl border bg-card shadow-sm overflow-hidden">
          <div className="h-48 w-full overflow-hidden bg-muted/50 relative">
            <Image 
              src={collection.coverImage} 
              alt={collection.name}
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="absolute top-4 right-4 flex gap-2">
            <Button 
              className="bg-background/80 backdrop-blur-sm hover:bg-background/90"
              size="sm"
              onClick={() => setIsEditModalOpen(true)}
            >
              <Pencil className="h-4 w-4 mr-1" />
              Edit Collection
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="h-8 w-8 bg-background/80 backdrop-blur-sm hover:bg-background/90"
                >
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  Download Collection
                </DropdownMenuItem>
                <DropdownMenuItem>
                  Duplicate Collection
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive">
                  Delete Collection
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="p-6">
            <h1 className="text-2xl font-bold tracking-tight mb-2">
              {collection.name}
            </h1>
            <p className="text-muted-foreground mb-4">
              {collection.description}
            </p>
            
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <div className="h-5 w-5 relative rounded-full overflow-hidden">
                  <Image 
                    src={collection.author.avatar} 
                    alt={collection.author.name} 
                    fill
                    className="object-cover"
                  />
                </div>
                <span>{collection.author.name}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span>Created {collection.createdAt}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span>Updated {collection.updatedAt}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <File className="h-4 w-4" />
                <span>{collection.componentsCount} components</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Components section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Components</h2>
          <Dialog open={isAddComponentModalOpen} onOpenChange={setIsAddComponentModalOpen}>
            <DialogTrigger asChild>
              <Button 
                className="flex items-center gap-1"
              >
                <PlusCircle className="h-4 w-4" />
                <span>Add Component</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Add Components to Collection</DialogTitle>
                <DialogDescription>
                  Select components to add to the &quot;{collection.name}&quot; collection.
                </DialogDescription>
              </DialogHeader>
              
              <div className="py-4">
                <div className="relative mb-4">
                  <Search className="absolute left-2.5 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search components..."
                    className="pl-9"
                  />
                </div>
                
                <div className="grid gap-4 grid-cols-2">
                  {allComponents.map((component) => {
                    const isInCollection = components.some(c => c.id === component.id);
                    
                    return (
                      <div 
                        key={component.id}
                        className={`relative rounded-lg border p-4 ${isInCollection ? 'bg-primary/5 border-primary/30' : 'bg-card'}`}
                      >
                        <div className="absolute top-3 right-3">
                          <input 
                            type="checkbox" 
                            checked={isInCollection}
                            className="h-4 w-4 rounded border-gray-300"
                            onChange={() => {}}
                          />
                        </div>
                        <div className="flex gap-3">
                          <div className="h-12 w-12 bg-muted/50 rounded-md overflow-hidden flex-shrink-0 relative">
                            <Image 
                              src={component.previewImgUrl} 
                              alt={component.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <h3 className="font-medium text-sm">{component.name}</h3>
                            <p className="text-xs text-muted-foreground truncate">{component.description}</p>
                            <div className="flex gap-1 mt-1 flex-wrap">
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
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              
              <DialogFooter>
                <Button 
                  variant="outline" 
                  onClick={() => setIsAddComponentModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">
                  Add Selected Components
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-2.5 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search components..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Select defaultValue="newest">
              <SelectTrigger className="w-40">
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
        </div>
        
        {filteredComponents.length === 0 ? (
          <div className="rounded-xl border bg-card shadow-sm p-8 text-center">
            <h3 className="text-lg font-semibold mb-2">No components found</h3>
            <p className="text-muted-foreground mb-6">
              {searchQuery ? "Try adjusting your search or filter criteria." : "This collection doesn't have any components yet."}
            </p>
            <Button 
              className="flex items-center gap-1"
              onClick={() => setIsAddComponentModalOpen(true)}
            >
              <PlusCircle className="h-4 w-4" />
              <span>Add Components</span>
            </Button>
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
                  <Image 
                    src={component.previewImgUrl} 
                    alt={component.name}
                    fill
                    className="object-cover"
                  />
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
                <div className="h-12 w-12 bg-muted/50 rounded-md mr-4 overflow-hidden relative">
                  <Image 
                    src={component.previewImgUrl} 
                    alt={component.name}
                    fill
                    className="object-cover"
                  />
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
      </div>
      
      {/* Edit Collection Dialog */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Collection</DialogTitle>
            <DialogDescription>
              Update the details of your collection.
            </DialogDescription>
          </DialogHeader>
          
          <form className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Collection Name</Label>
              <Input id="name" defaultValue={collection.name} />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea 
                id="description" 
                defaultValue={collection.description}
                className="min-h-24"
              />
            </div>
            
            <div className="space-y-2">
              <Label>Cover Image</Label>
              <div className="flex justify-center border-2 border-dashed rounded-lg p-6 cursor-pointer hover:bg-muted/50 transition-colors relative">
                <div className="relative w-full h-40">
                  <Image 
                    src={collection.coverImage} 
                    alt={collection.name}
                    fill
                    className="object-cover rounded-md"
                  />
                </div>
                <div className="absolute inset-0 bg-black/30 opacity-0 hover:opacity-100 flex items-center justify-center transition-opacity rounded-lg">
                  <p className="text-white font-medium">
                    Click to change image
                  </p>
                </div>
              </div>
            </div>
          </form>
          
          <DialogFooter className="flex justify-between">
            <Button 
              variant="outline" 
              className="text-destructive border-destructive hover:bg-destructive/10"
            >
              <Trash2 className="h-4 w-4 mr-1" />
              Delete Collection
            </Button>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                onClick={() => setIsEditModalOpen(false)}
              >
                Cancel
              </Button>
              <Button 
                type="submit"
                onClick={() => {
                  // Handle collection update
                  setIsEditModalOpen(false);
                }}
              >
                Save Changes
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}