"use client"

import React from "react"
import { motion } from "motion/react"
import { 
  Code, 
  Layers, 
  Lock, 
  Eye, 
  Github,
  LucideGithub 
} from "lucide-react"
import { LucideIcon } from "lucide-react"
import { AnimatedHeader } from "./animated-header"

// Feature Card with TypeScript types
interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  index: number;
}

const FeatureCard = ({ icon: Icon, title, description, index }: FeatureCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ 
      duration: 0.5, 
      ease: [0.22, 1, 0.36, 1],
      delay: 0.1 * index 
    }}
    className="bg-white/5 dark:bg-black/10 backdrop-blur-md p-6 md:p-8 rounded-2xl border border-white/10 shadow-lg"
  >
    <div className="w-12 h-12 bg-gradient-to-tr from-gray-800 to-gray-600 dark:from-gray-300 dark:to-gray-500 rounded-full flex items-center justify-center mb-4 text-white dark:text-gray-900">
      <Icon size={24} />
    </div>
    <h3 className="text-xl font-semibold mb-3 text-foreground">{title}</h3>
    <p className="text-muted-foreground">{description}</p>
  </motion.div>
);

export function FeaturesSection() {
  return (
    <section id="features" className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <AnimatedHeader>Platform Features</AnimatedHeader>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="text-lg text-muted-foreground"
          >
            Everything you need to organize, access, and share your UI components
          </motion.p>
        </div>
        
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <FeatureCard
            icon={Lock}
            title="Private Storage"
            description="Store your UI components securely with private access controls that only you can see."
            index={0}
          />
          <FeatureCard
            icon={Code}
            title="Code Formatting"
            description="Beautiful syntax highlighting for all your code snippets with support for multiple languages."
            index={1}
          />
          <FeatureCard
            icon={Layers}
            title="Organization"
            description="Organize components with tags, collections, and powerful search functionality."
            index={2}
          />
          <FeatureCard
            icon={Eye}
            title="Preview Mode"
            description="See how your components render in both light and dark themes before using them."
            index={3}
          />
          <FeatureCard
            icon={Github}
            title="Version Control"
            description="Track changes to your components with complete version history and restore capability."
            index={4}
          />
          <FeatureCard
            icon={LucideGithub}
            title="Community Access"
            description="Optionally share components publicly and browse components shared by the community."
            index={5}
          />
        </div>
      </div>
    </section>
  )
}