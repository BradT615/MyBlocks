// src/data/how-it-works-data.ts
import { Code, Search, Share2, LucideIcon } from "lucide-react"

interface WorkflowStep {
  icon: LucideIcon;
  title: string;
  description: string;
}

export const howItWorksData: WorkflowStep[] = [
  {
    icon: Code,
    title: "1. Create & Store",
    description: "Save your UI components, code snippets, and styles with detailed descriptions and tags."
  },
  {
    icon: Search,
    title: "2. Search & Find",
    description: "Quickly locate what you need using our powerful search, filters, and organization tools."
  },
  {
    icon: Share2,
    title: "3. Reuse & Share",
    description: "Easily reuse components in your projects or share them with your team members."
  }
];