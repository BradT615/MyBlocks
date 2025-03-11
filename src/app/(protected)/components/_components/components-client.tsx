"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { DashboardHeader } from '@/app/(protected)/_components/dashboard-header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
  Tag
} from 'lucide-react';
import { ComponentsGrid } from './components-grid';
import { ComponentsList } from './components-list';
import { EmptyStates } from './empty-states';
import { TransformedComponent } from '../page';

interface ComponentsClientProps {
  initialComponents: TransformedComponent[];
  allTags: string[];
}

export function ComponentsClient({ initialComponents, allTags }: ComponentsClientProps) {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [currentTab, setCurrentTab] = useState('all');
  const [sortOrder, setSortOrder] = useState('newest');

  // Filter components based on search, selected tags, and current tab
  const filteredComponents = initialComponents.filter(component => {
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
            {initialComponents.length === 0 ? (
              <EmptyStates.EmptyLibrary onAddComponent={() => setIsModalOpen(true)} />
            ) : sortedComponents.length === 0 ? (
              <EmptyStates.NoResults onAddComponent={() => setIsModalOpen(true)} />
            ) : viewMode === 'grid' ? (
              <ComponentsGrid 
                components={sortedComponents} 
                onOpenComponent={handleOpenComponent} 
                onToggleTag={toggleTag}
                onAddComponent={() => setIsModalOpen(true)} 
              />
            ) : (
              <ComponentsList 
                components={sortedComponents} 
                onOpenComponent={handleOpenComponent} 
                onToggleTag={toggleTag}
                onAddComponent={() => setIsModalOpen(true)} 
              />
            )}
          </TabsContent>
          
          <TabsContent value="public">
            {sortedComponents.length === 0 ? (
              <EmptyStates.NoResults onAddComponent={() => setIsModalOpen(true)} />
            ) : viewMode === 'grid' ? (
              <ComponentsGrid 
                components={sortedComponents} 
                onOpenComponent={handleOpenComponent} 
                onToggleTag={toggleTag}
                onAddComponent={() => setIsModalOpen(true)} 
              />
            ) : (
              <ComponentsList 
                components={sortedComponents} 
                onOpenComponent={handleOpenComponent} 
                onToggleTag={toggleTag}
                onAddComponent={() => setIsModalOpen(true)} 
              />
            )}
          </TabsContent>
          
          <TabsContent value="private">
            {sortedComponents.length === 0 ? (
              <EmptyStates.NoResults onAddComponent={() => setIsModalOpen(true)} />
            ) : viewMode === 'grid' ? (
              <ComponentsGrid 
                components={sortedComponents} 
                onOpenComponent={handleOpenComponent} 
                onToggleTag={toggleTag}
                onAddComponent={() => setIsModalOpen(true)} 
              />
            ) : (
              <ComponentsList 
                components={sortedComponents} 
                onOpenComponent={handleOpenComponent} 
                onToggleTag={toggleTag}
                onAddComponent={() => setIsModalOpen(true)} 
              />
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