"use client"

import React, { useState, useEffect, useMemo, useCallback } from 'react'
import { Loader2 } from 'lucide-react'
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live'
import { themes } from 'prism-react-renderer'
import { useTheme } from 'next-themes'
import { cn } from '@/lib/utils'

type SupportedLanguage = 'tsx' | 'jsx' | 'js' | 'ts' | 'html' | 'css' | 'scss' | 'less';

interface ComponentRendererProps {
  code: string;
  language?: SupportedLanguage;
  showEditor?: boolean;
  scope?: Record<string, unknown>; // Using unknown instead of any
}

export function ComponentRenderer({
  code,
  language = 'tsx',
  showEditor = false,
  scope = {}
}: ComponentRendererProps) {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Memoize default scope to prevent unnecessary re-renders
  const defaultScope = useMemo(() => ({
    React,
    cn,
    ...React,
    ...scope
  }), [scope])

  // Memoize theme to prevent unnecessary re-renders
  const currentTheme = useMemo(() => 
    resolvedTheme === 'dark' ? themes.nightOwl : themes.vsLight
  , [resolvedTheme])

  // Memoized code cleaning function
  const cleanCode = useCallback((inputCode: string): string => {
    try {
      // Remove import statements
      let cleaned = inputCode
        .replace(/import\s+.*from\s+['"].*['"]\s*;?/g, '')
        .replace(/export\s+(interface|default\s+function|function|const|class|type)\s*/g, '')
        .trim()

      // Remove function declarations and return statement
      cleaned = cleaned.replace(/function\s*\w*\s*\([^)]*\)\s*{/, '')
        .replace(/return\s*\(/, '')
        .replace(/\)\s*;?\s*}/, '')
        .trim()

      // Remove React.forwardRef wrapper
      const forwardRefMatch = cleaned.match(/React\.forwardRef\((\([^)]*\))\s*=>/)
      if (forwardRefMatch) {
        cleaned = forwardRefMatch[1]
      }

      return cleaned
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : String(err)
      console.error('Code cleaning error:', errorMessage)
      setError(`Preprocessing error: ${errorMessage}`)
      return '<div>Error processing component</div>'
    }
  }, [])

  // Memoize the cleaned code
  const memoizedCode = useMemo(() => cleanCode(code), [code, cleanCode])

  // Error boundary effect
  useEffect(() => {
    setMounted(true)
  }, [])

  // Error handling callback
  const handleError = useCallback((err: Error) => {
    console.error('Component rendering error:', err)
    setError(err.message)
  }, [])

  // Prevent rendering if not mounted
  if (!mounted) {
    return (
      <div className="flex items-center justify-center h-64 bg-muted/40">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  return (
    <div className="w-full">
      <LiveProvider
        code={memoizedCode}
        scope={defaultScope}
        theme={currentTheme}
        language={language as SupportedLanguage}
      >
        <div className="relative">
          {/* Error Handling */}
          {error && (
            <div className="p-4 border rounded-md bg-destructive/10 text-destructive mb-4">
              <p className="text-sm font-mono">Error: {error}</p>
            </div>
          )}
          
          {/* Component Preview */}
          <div className="rounded-md border bg-background p-6 min-h-[200px] flex items-center justify-center">
            <LivePreview />
          </div>
          
          {/* Live Error Display */}
          <LiveError 
            className="p-4 border rounded-md bg-destructive/10 text-destructive mt-4 font-mono text-sm"
            onError={handleError}
          />
          
          {/* Optional Live Editor */}
          {showEditor && (
            <div className="mt-4 border rounded-md overflow-hidden bg-muted">
              <LiveEditor 
                className="font-mono text-sm p-4"
              />
            </div>
          )}
        </div>
      </LiveProvider>
    </div>
  )
}