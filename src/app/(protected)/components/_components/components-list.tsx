"use client";

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { PlusCircle, Eye, Code, Lock } from 'lucide-react';
import { TransformedComponent } from '../page';

interface ComponentsListProps {
  components: TransformedComponent[];
  onOpenComponent: (id: string) => void;
  onToggleTag: (tag: string) => void;
  onAddComponent: () => void;
}

export function ComponentsList({ 
  components, 
  onOpenComponent, 
  onToggleTag, 
  onAddComponent 
}: ComponentsListProps) {
  return (
    <div className="space-y-2">
      {components.map(component => (
        <ComponentListItem 
          key={component.id} 
          component={component} 
          onOpenComponent={onOpenComponent}
          onToggleTag={onToggleTag}
        />
      ))}
      <AddComponentListItem onAddComponent={onAddComponent} />
    </div>
  );
}

interface ComponentListItemProps {
  component: TransformedComponent;
  onOpenComponent: (id: string) => void;
  onToggleTag: (tag: string) => void;
}

function ComponentListItem({ component, onOpenComponent, onToggleTag }: ComponentListItemProps) {
  return (
    <div 
      className="rounded-lg border bg-card shadow-sm transition-all hover:shadow-md hover:border-primary/20 cursor-pointer p-4 flex items-center"
      onClick={() => onOpenComponent(component.id)}
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
              onToggleTag(tag);
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
}

interface AddComponentListItemProps {
  onAddComponent: () => void;
}

function AddComponentListItem({ onAddComponent }: AddComponentListItemProps) {
  return (
    <div 
      className="rounded-lg border bg-card shadow-sm transition-all hover:shadow-md hover:border-primary/20 cursor-pointer p-4 flex items-center"
      onClick={onAddComponent}
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
}