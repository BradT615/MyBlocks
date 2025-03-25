"use client"

import React, { useState, useEffect } from 'react'
import { Loader2 } from 'lucide-react'
import { SandpackRenderer } from './sandpack-renderer'

type SupportedLanguage = 'tsx' | 'jsx' | 'js' | 'ts' | 'html' | 'css' | 'scss' | 'less';

interface ComponentFile {
  code: string;
  filename: string;
  language: SupportedLanguage;
  hidden?: boolean;
  active?: boolean;
}

interface ComponentRendererProps {
  code: string;
  language?: SupportedLanguage;
  showEditor?: boolean;
  additionalFiles?: Record<string, string> | ComponentFile[];
  dependencies?: Record<string, string>;
  framework?: 'react' | 'vanilla' | 'vue';
  activePath?: string;
  autorun?: boolean;
}

export function ComponentRenderer({
  code,
  language = 'tsx',
  showEditor = false,
  additionalFiles = {},
  dependencies = {},
  framework = 'react',
  activePath,
  autorun = true
}: ComponentRendererProps) {
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="flex items-center justify-center h-64 bg-muted/40">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  return (
    <div className="w-full">
      {process.env.NODE_ENV === 'development' && (
        <div className="mb-4 p-2 bg-yellow-100 dark:bg-yellow-900/30 border border-yellow-300 dark:border-yellow-900/50 rounded text-xs">
          <details>
            <summary className="cursor-pointer">Debug Info</summary>
            <div className="mt-2 space-y-1">
              <div><strong>Language:</strong> {language}</div>
              <div><strong>Editor mode:</strong> {showEditor ? 'On' : 'Off'}</div>
              <div><strong>Framework:</strong> {framework}</div>
              <div><strong>Additional Files:</strong> {Array.isArray(additionalFiles) 
                ? additionalFiles.map(f => f.filename).join(', ')
                : Object.keys(additionalFiles).join(', ')
              }</div>
            </div>
          </details>
        </div>
      )}
      
      {/* Use Sandpack to render the component */}
      <div className={`${showEditor ? 'min-h-[450px]' : 'min-h-[200px]'}`}>
        <SandpackRenderer
          code={code}
          language={language}
          showEditor={showEditor}
          additionalFiles={additionalFiles}
          dependencies={dependencies}
          framework={framework}
          activePath={activePath}
          autorun={autorun}
        />
      </div>
    </div>
  )
}