// src/app/(protected)/components/page.tsx
import { createClient } from "@/utils/supabase/server"
import { Metadata } from "next"
import { ComponentsClient } from "./_components/components-client"

export const metadata: Metadata = {
  title: "Components | MyBlocks",
  description: "Browse, manage, and add UI components to your library",
}

// Define the types that we'll use across components
export interface ComponentTag {
  tags?: {
    name: string;
  };
}

export interface ComponentProfile {
  full_name?: string;
  avatar_url?: string;
}

export interface Component {
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

export interface TransformedComponent {
  id: string;
  name: string;
  description: string;
  updatedAt: string;
  tags: string[];
  previewImgUrl: string;
  isPublic: boolean;
}

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

export default async function ComponentsPage() {
  const supabase = await createClient();
  
  // Get current user
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    // Handle the case when user is not authenticated
    // This shouldn't happen due to middleware, but good to have a fallback
    return (
      <div className="p-8 text-center">
        <p>Please log in to view your components</p>
      </div>
    );
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
  
  // Handle errors
  if (componentsError) {
    console.error('Error fetching components:', componentsError);
    return (
      <div className="p-8 text-center">
        <p>Failed to load components. Please try again later.</p>
      </div>
    );
  }
  
  // Transform the data for the client component
  const transformedComponents: TransformedComponent[] = componentsData ? componentsData.map((component: Component) => {
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
      previewImgUrl: component.preview_image_url || '/image-unavailable.svg',
      isPublic: component.is_public
    };
  }) : [];
  
  // Extract all unique tags for filtering
  const allTags = Array.from(new Set(
    transformedComponents.flatMap(component => component.tags)
  ));
  
  return (
    <ComponentsClient 
      initialComponents={transformedComponents} 
      allTags={allTags}
    />
  );
}