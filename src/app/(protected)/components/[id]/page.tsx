"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  ArrowLeft, 
  Code,
  Copy, 
  Check, 
  Share2, 
  Pencil, 
  Star, 
  Download, 
  Sun, 
  Moon,
  Tag
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';

export default function ComponentDetail({ params }: { params: { id: string } }) {
  const [copySuccess, setCopySuccess] = useState(false);
  const [favorited, setFavorited] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  
  // This would typically come from API/database based on the ID
  const component = {
    id: params.id,
    name: 'Primary Button Component',
    description: 'A customizable button component with multiple variants and states. Includes hover and focus styles, with support for icons and loading states.',
    createdAt: 'Mar 2, 2025',
    updatedAt: '2 days ago',
    author: {
      name: 'Alex Johnson',
      avatar: '/api/placeholder/40/40'
    },
    tags: ['ui', 'button', 'interactive'],
    isPublic: true,
    previewImgUrl: '/api/placeholder/800/400',
    files: [
      {
        id: 'file-1',
        name: 'Button.tsx',
        language: 'tsx',
        code: `import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "underline-offset-4 hover:underline text-primary",
      },
      size: {
        default: "h-10 py-2 px-4",
        sm: "h-9 px-3 rounded-md",
        lg: "h-11 px-8 rounded-md",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, isLoading, children, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={isLoading || props.disabled}
        {...props}
      >
        {isLoading ? (
          <>
            <svg
              className="mr-2 h-4 w-4 animate-spin"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Loading...
          </>
        ) : (
          children
        )}
      </button>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };`
      },
      {
        id: 'file-2',
        name: 'useButton.ts',
        language: 'typescript',
        code: `import { useState, useCallback } from 'react';

export interface UseButtonProps {
  onClick?: () => Promise<void> | void;
  disabled?: boolean;
}

export function useButton({ onClick, disabled = false }: UseButtonProps = {}) {
  const [isLoading, setIsLoading] = useState(false);
  
  const handleClick = useCallback(async () => {
    if (disabled || isLoading || !onClick) return;
    
    try {
      setIsLoading(true);
      await onClick();
    } finally {
      setIsLoading(false);
    }
  }, [onClick, disabled, isLoading]);
  
  return {
    isLoading,
    buttonProps: {
      onClick: handleClick,
      disabled: disabled || isLoading,
      isLoading,
    },
  };
}`
      }
    ]
  };

  // Handle code copying
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopySuccess(true);
    
    setTimeout(() => {
      setCopySuccess(false);
    }, 2000);
  };

  // Toggle theme
  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  // Toggle favorite
  const toggleFavorite = () => {
    setFavorited(prev => !prev);
  };

  return (
    <div className="pb-8">
      {/* Back button and header */}
      <div className="flex flex-col gap-6 mb-6">
        <Link 
          href="/components"
          className="flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          <span>Back to components</span>
        </Link>
        
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight mb-1">
              {component.name}
            </h1>
            <p className="text-muted-foreground">
              {component.description}
            </p>
          </div>
          <div className="flex gap-2 ml-4">
            <Button 
              variant="outline" 
              size="sm"
              className={favorited ? "text-amber-500" : ""}
              onClick={toggleFavorite}
            >
              <Star className="h-4 w-4 mr-1" fill={favorited ? "currentColor" : "none"} />
              {favorited ? "Favorited" : "Favorite"}
            </Button>
            <Button variant="outline" size="sm">
              <Pencil className="h-4 w-4 mr-1" />
              Edit
            </Button>
          </div>
        </div>
        
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <div className="h-5 w-5 relative rounded-full overflow-hidden">
              <Image 
                src={component.author.avatar} 
                alt={component.author.name} 
                fill
                className="object-cover"
              />
            </div>
            <span>{component.author.name}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span>Created {component.createdAt}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span>Updated {component.updatedAt}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className={`w-2 h-2 rounded-full ${component.isPublic ? 'bg-green-500' : 'bg-amber-500'}`}></div>
            <span>{component.isPublic ? 'Public' : 'Private'}</span>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <span className="text-sm flex items-center text-muted-foreground mr-1">
            <Tag className="h-3.5 w-3.5 mr-1" />
            Tags:
          </span>
          {component.tags.map(tag => (
            <span 
              key={tag} 
              className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
      
      {/* Component View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7">
          <div className="space-y-6">
            {/* Preview */}
            <Card className="rounded-lg border overflow-hidden">
              <div className="flex items-center justify-between border-b px-4 py-2">
                <h3 className="text-sm font-medium">Preview</h3>
                <div className="flex items-center">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-8 w-8 p-0"
                    onClick={toggleTheme}
                  >
                    {theme === 'light' ? (
                      <Sun className="h-4 w-4" />
                    ) : (
                      <Moon className="h-4 w-4" />
                    )}
                    <span className="sr-only">Toggle theme</span>
                  </Button>
                </div>
              </div>
              <CardContent className={`p-6 grid place-items-center min-h-60 ${theme === 'dark' ? 'bg-slate-900 text-white' : 'bg-white text-black'}`}>
                <div className="grid gap-4">
                  <div className="flex items-center justify-center gap-4">
                    <button className={`px-4 py-2 rounded-md ${theme === 'dark' ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white'} font-medium`}>
                      Primary Button
                    </button>
                    <button className={`px-4 py-2 rounded-md ${theme === 'dark' ? 'bg-slate-800 text-white border border-slate-700' : 'bg-gray-100 text-gray-800 border border-gray-200'} font-medium`}>
                      Secondary Button
                    </button>
                  </div>
                  <div className="flex items-center justify-center gap-4">
                    <button className={`px-3 py-1.5 rounded-md ${theme === 'dark' ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white'} text-sm font-medium`}>
                      Small Button
                    </button>
                    <button className={`px-6 py-2.5 rounded-md ${theme === 'dark' ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white'} font-medium`}>
                      Large Button
                    </button>
                  </div>
                  <div className="flex items-center justify-center">
                    <button className={`px-4 py-2 rounded-md ${theme === 'dark' ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white'} font-medium flex items-center gap-2`} disabled>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Loading...
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Files/Code */}
            <Tabs defaultValue={component.files[0].id} className="w-full">
              <div className="flex items-center justify-between mb-2">
                <TabsList className="w-full justify-start h-9 overflow-x-auto hide-scrollbar">
                  {component.files.map(file => (
                    <TabsTrigger 
                      key={file.id} 
                      value={file.id}
                      className="text-xs px-3"
                    >
                      {file.name}
                    </TabsTrigger>
                  ))}
                </TabsList>
                <div className="flex items-center ml-2">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-8 w-8 p-0"
                    onClick={() => copyToClipboard(component.files[0].code)}
                  >
                    {copySuccess ? (
                      <Check className="h-4 w-4 text-green-500" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                    <span className="sr-only">Copy code</span>
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-8 w-8 p-0"
                  >
                    <Download className="h-4 w-4" />
                    <span className="sr-only">Download</span>
                  </Button>
                </div>
              </div>
              
              {component.files.map(file => (
                <TabsContent key={file.id} value={file.id} className="mt-0">
                  <Card className="rounded-lg border overflow-hidden">
                    <div className="bg-slate-950 p-4 overflow-x-auto">
                      <pre className="text-sm text-white">
                        <code>{file.code}</code>
                      </pre>
                    </div>
                  </Card>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </div>
        
        <div className="lg:col-span-5">
          <div className="space-y-6">
            {/* Usage Information */}
            <Card className="rounded-lg border">
              <div className="flex items-center justify-between border-b px-4 py-2">
                <h3 className="text-sm font-medium">Usage</h3>
              </div>
              <CardContent className="p-4">
                <Tabs defaultValue="react">
                  <TabsList className="mb-4">
                    <TabsTrigger value="react" className="text-xs">React</TabsTrigger>
                    <TabsTrigger value="next" className="text-xs">Next.js</TabsTrigger>
                  </TabsList>
                  <TabsContent value="react" className="mt-0">
                    <div className="bg-slate-950 p-3 rounded-md overflow-x-auto">
                      <pre className="text-sm text-white">
                        <code>{`import { Button } from '@/components/ui/button';

export default function MyComponent() {
  return (
    <Button>Click Me</Button>
  );
}`}</code>
                      </pre>
                    </div>
                  </TabsContent>
                  <TabsContent value="next" className="mt-0">
                    <div className="bg-slate-950 p-3 rounded-md overflow-x-auto">
                      <pre className="text-sm text-white">
                        <code>{`'use client';

import { Button } from '@/components/ui/button';

export default function MyPage() {
  return (
    <div>
      <Button>Click Me</Button>
    </div>
  );
}`}</code>
                      </pre>
                    </div>
                  </TabsContent>
                </Tabs>
                
                <div className="mt-4 space-y-3">
                  <h4 className="text-sm font-medium">Props</h4>
                  <div className="text-sm">
                    <code className="px-1.5 py-0.5 rounded bg-muted text-xs">variant</code>
                    <span className="text-xs ml-2 text-muted-foreground">
                      default | destructive | outline | secondary | ghost | link
                    </span>
                  </div>
                  <div className="text-sm">
                    <code className="px-1.5 py-0.5 rounded bg-muted text-xs">size</code>
                    <span className="text-xs ml-2 text-muted-foreground">
                      default | sm | lg | icon
                    </span>
                  </div>
                  <div className="text-sm">
                    <code className="px-1.5 py-0.5 rounded bg-muted text-xs">isLoading</code>
                    <span className="text-xs ml-2 text-muted-foreground">
                      boolean
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Dependencies */}
            <Card className="rounded-lg border">
              <div className="flex items-center justify-between border-b px-4 py-2">
                <h3 className="text-sm font-medium">Dependencies</h3>
              </div>
              <CardContent className="p-4">
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center justify-between">
                    <code className="text-xs">class-variance-authority</code>
                    <span className="text-xs text-muted-foreground">^0.7.0</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <code className="text-xs">clsx</code>
                    <span className="text-xs text-muted-foreground">^2.0.0</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <code className="text-xs">tailwind-merge</code>
                    <span className="text-xs text-muted-foreground">^1.14.0</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            {/* Related Components */}
            <Card className="rounded-lg border">
              <div className="flex items-center justify-between border-b px-4 py-2">
                <h3 className="text-sm font-medium">Related Components</h3>
              </div>
              <CardContent className="p-4">
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <Code className="h-4 w-4 text-muted-foreground" />
                    <Link href="/components/form" className="text-sm text-primary hover:underline">
                      Form Component
                    </Link>
                  </li>
                  <li className="flex items-center gap-2">
                    <Code className="h-4 w-4 text-muted-foreground" />
                    <Link href="/components/input" className="text-sm text-primary hover:underline">
                      Input Component
                    </Link>
                  </li>
                  <li className="flex items-center gap-2">
                    <Code className="h-4 w-4 text-muted-foreground" />
                    <Link href="/components/dropdown" className="text-sm text-primary hover:underline">
                      Dropdown Component
                    </Link>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            {/* Share */}
            <Card className="rounded-lg border">
              <div className="flex items-center justify-between border-b px-4 py-2">
                <h3 className="text-sm font-medium">Share</h3>
              </div>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Share2 className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Share this component</span>
                  </div>
                  <Button size="sm" variant="outline">
                    Copy Link
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}