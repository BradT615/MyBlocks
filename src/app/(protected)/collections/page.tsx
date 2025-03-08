"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { DashboardHeader } from '@/app/(protected)/_components/dashboard-header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter, 
  DialogDescription 
} from '@/components/ui/dialog';
import { 
  PlusCircle, 
  FolderOpen, 
  MoreHorizontal, 
  File,
  Search
} from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function EnhancedCollectionsPage() {
  const router = useRouter();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Mock data for collections
  const collections = [
    {
      id: 'collection-1',
      name: 'UI Elements',
      description: 'Basic UI elements for consistent design',
      componentsCount: 12,
      updatedAt: '2 days ago',
      coverImage: '/api/placeholder/320/200'
    },
    {
      id: 'collection-2',
      name: 'Layouts',
      description: 'Page layouts and structural components',
      componentsCount: 8,
      updatedAt: '1 week ago',
      coverImage: '/api/placeholder/320/200'
    },
    {
      id: 'collection-3',
      name: 'Forms',
      description: 'Form components and validation',
      componentsCount: 15,
      updatedAt: '3 days ago',
      coverImage: '/api/placeholder/320/200'
    },
    {
      id: 'collection-4',
      name: 'Navigation',
      description: 'Navigation components and patterns',
      componentsCount: 6,
      updatedAt: '2 weeks ago',
      coverImage: '/api/placeholder/320/200'
    },
  ];

  // Filter collections based on search
  const filteredCollections = collections.filter(collection =>
    collection.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    collection.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleOpenCollection = (id: string) => {
    router.push(`/collections/${id}`);
  };

  return (
    <>
      <DashboardHeader 
        heading="Collections" 
        text="Organize your components into collections"
      >
        <Button 
          className="flex items-center gap-1"
          onClick={() => setIsCreateModalOpen(true)}
        >
          <PlusCircle className="h-4 w-4" />
          <span>New Collection</span>
        </Button>
      </DashboardHeader>
      
      <div className="flex mt-6 mb-8">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-2.5 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search collections..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      
      {filteredCollections.length === 0 ? (
        <div className="rounded-xl border bg-card shadow-sm p-8 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-4">
            <FolderOpen className="h-6 w-6 text-primary/80" />
          </div>
          <h3 className="text-lg font-semibold mb-2">No collections found</h3>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            {searchQuery 
              ? "Try adjusting your search to find what you're looking for." 
              : "Collections help you organize your components by project, category, or any other grouping."}
          </p>
          <Button 
            className="flex items-center gap-1"
            onClick={() => setIsCreateModalOpen(true)}
          >
            <PlusCircle className="h-4 w-4" />
            <span>Create First Collection</span>
          </Button>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredCollections.map((collection) => (
            <Card 
              key={collection.id}
              className="overflow-hidden cursor-pointer transition-all hover:shadow-md hover:border-primary/20"
              onClick={() => handleOpenCollection(collection.id)}
            >
              <div className="aspect-video relative bg-muted/50">
                <div className="h-20 w-20 relative rounded-full overflow-hidden">
                  <Image 
                    src={collection.coverImage} 
                    alt={collection.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="absolute top-2 right-2">
                  <Button variant="ghost" size="icon" className="h-8 w-8 bg-background/80 backdrop-blur-sm" onClick={(e) => {
                    e.stopPropagation();
                    // Handle options menu
                  }}>
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">{collection.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">{collection.description}</p>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <File className="h-4 w-4" />
                    <span>{collection.componentsCount} components</span>
                  </div>
                  <span>Updated {collection.updatedAt}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
      
      {/* Create Collection Modal */}
      <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Create New Collection</DialogTitle>
            <DialogDescription>
              Create a new collection to organize your components.
            </DialogDescription>
          </DialogHeader>
          
          <form className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Collection Name</Label>
              <Input id="name" placeholder="e.g., UI Elements, Navigation, Forms" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea 
                id="description" 
                placeholder="Describe the purpose of this collection" 
                className="min-h-24"
              />
            </div>
            
            <div className="space-y-2">
              <Label>Cover Image (optional)</Label>
              <div className="flex justify-center border-2 border-dashed rounded-lg p-6 cursor-pointer hover:bg-muted/50 transition-colors">
                <div className="text-center">
                  <FolderOpen className="h-10 w-10 text-muted-foreground mb-2 mx-auto" />
                  <p className="text-sm text-muted-foreground">
                    Drag and drop an image, or click to browse
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    PNG, JPG or WebP up to 2MB
                  </p>
                </div>
              </div>
            </div>
          </form>
          
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsCreateModalOpen(false)}
            >
              Cancel
            </Button>
            <Button 
              type="submit"
              onClick={() => {
                // Handle collection creation
                setIsCreateModalOpen(false);
              }}
            >
              Create Collection
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}