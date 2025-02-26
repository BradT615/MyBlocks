// src/data/features-data.ts
import { 
    Code, 
    Palette, 
    Search, 
    FileCode, 
    Repeat, 
    Share2,
    LucideIcon
  } from "lucide-react"
  
  interface FeatureItem {
    icon: LucideIcon;
    title: string;
    description: string;
  }
  
  export const featuresData: FeatureItem[] = [
    {
      icon: Code,
      title: "Component Storage",
      description: 
        "Save your favorite UI components with their code snippets in one centralized place.",
    },
    {
      icon: Palette,
      title: "Style Organization",
      description: 
        "Keep your design tokens, color palettes, and styling preferences organized and accessible.",
    },
    {
      icon: Search,
      title: "Quick Search",
      description: 
        "Find exactly what you need with our powerful search and tagging system.",
    },
    {
      icon: FileCode,
      title: "Syntax Highlighting",
      description: 
        "View your code with beautiful syntax highlighting for better readability.",
    },
    {
      icon: Repeat,
      title: "Version History",
      description: 
        "Track changes to your components with complete version history and restore previous versions.",
    },
    {
      icon: Share2,
      title: "Sharing & Collaboration",
      description: 
        "Share components with your team or make them public for the community.",
    },
  ];