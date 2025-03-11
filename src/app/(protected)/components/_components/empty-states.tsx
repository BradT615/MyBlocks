"use client";

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusCircle, Code, Loader2 } from 'lucide-react';

interface EmptyStateProps {
  onAddComponent: () => void;
}

// Component for when no components exist at all
function EmptyLibrary({ onAddComponent }: EmptyStateProps) {
  return (
    <Card 
      onClick={onAddComponent}
      className="overflow-hidden cursor-pointer transition-all hover:shadow-md hover:border-primary/20 group flex flex-col justify-center items-center p-12 bg-muted/10 mt-8"
    >
      <div className="rounded-full bg-primary/10 p-4 mb-6">
        <PlusCircle className="h-10 w-10 text-primary/80" />
      </div>
      <h3 className="text-xl font-semibold mb-3">Your Component Library is Empty</h3>
      <p className="text-muted-foreground text-center max-w-md mb-6">
        Click anywhere on this card to add your first component
      </p>
    </Card>
  );
}

// Component for when search/filter returns no results
function NoResults({ onAddComponent }: EmptyStateProps) {
  return (
    <div className="rounded-xl border bg-card shadow-sm p-8 text-center">
      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 mb-6">
        <Code className="h-10 w-10 text-primary/80" />
      </div>
      <h3 className="text-xl font-semibold mb-3">No components found</h3>
      <p className="text-muted-foreground mb-8 max-w-md mx-auto">
        Try adjusting your search or filter criteria.
      </p>
      <Button 
        className="flex items-center gap-2"
        onClick={onAddComponent}
      >
        <PlusCircle className="h-4 w-4" />
        <span>Add Component</span>
      </Button>
    </div>
  );
}

// Component for loading state
function LoadingState() {
  return (
    <div className="w-full flex items-center justify-center py-12">
      <div className="flex flex-col items-center">
        <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
        <p className="text-muted-foreground">Loading components...</p>
      </div>
    </div>
  );
}

// Component for error state
function ErrorState({ message, onRetry }: { message: string, onRetry: () => void }) {
  return (
    <div className="rounded-xl border bg-card shadow-sm p-8 text-center">
      <h3 className="text-xl font-semibold mb-3">Error Loading Components</h3>
      <p className="text-muted-foreground mb-4">{message}</p>
      <Button onClick={onRetry}>
        Try Again
      </Button>
    </div>
  );
}

// Export all empty states as a namespace
export const EmptyStates = {
  EmptyLibrary,
  NoResults,
  LoadingState,
  ErrorState
};