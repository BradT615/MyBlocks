"use client";

import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusCircle, Eye, Code, Lock } from 'lucide-react';
import { TransformedComponent } from '../page';

interface ComponentsGridProps {
  components: TransformedComponent[];
  onOpenComponent: (id: string) => void;
  onToggleTag: (tag: string) => void;
  onAddComponent: () => void;
}

export function ComponentsGrid({ 
  components, 
  onOpenComponent, 
  onToggleTag, 
  onAddComponent 
}: ComponentsGridProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {components.map(component => (
        <ComponentCard 
          key={component.id} 
          component={component} 
          onOpenComponent={onOpenComponent}
          onToggleTag={onToggleTag}
        />
      ))}
      <AddComponentCard onAddComponent={onAddComponent} />
    </div>
  );
}

interface ComponentCardProps {
  component: TransformedComponent;
  onOpenComponent: (id: string) => void;
  onToggleTag: (tag: string) => void;
}

function ComponentCard({ component, onOpenComponent, onToggleTag }: ComponentCardProps) {
  return (
    <Card 
      className="overflow-hidden cursor-pointer transition-all hover:shadow-md hover:border-primary/20 group"
      onClick={() => onOpenComponent(component.id)}
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
                onToggleTag(tag);
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
}

interface AddComponentCardProps {
  onAddComponent: () => void;
}

function AddComponentCard({ onAddComponent }: AddComponentCardProps) {
  return (
    <Card 
      onClick={onAddComponent}
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
}