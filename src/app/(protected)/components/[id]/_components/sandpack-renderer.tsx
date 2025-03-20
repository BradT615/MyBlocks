"use client"

import React, { useState, useEffect } from 'react'
import {
  Sandpack,
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackPreview,
  SandpackConsole,
  SandpackTheme
} from '@codesandbox/sandpack-react'
import { useTheme } from 'next-themes'
import { sandpackDark } from '@codesandbox/sandpack-themes'

// Define supported languages
type SupportedLanguage = 'tsx' | 'jsx' | 'js' | 'ts' | 'html' | 'css' | 'scss' | 'less';

// Define custom file extension mapping
const fileExtensionMap: Record<SupportedLanguage, string> = {
  tsx: '.tsx',
  jsx: '.jsx',
  js: '.js',
  ts: '.ts',
  html: '.html',
  css: '.css',
  scss: '.scss',
  less: '.less'
};

// Define a structured file type for better organization
interface ComponentFile {
  code: string;
  filename: string;
  language: SupportedLanguage;
  hidden?: boolean;
  active?: boolean;
}

interface SandpackRendererProps {
  code: string;
  language?: SupportedLanguage;
  showEditor?: boolean;
  additionalFiles?: Record<string, string> | ComponentFile[];
  dependencies?: Record<string, string>;
  framework?: 'react' | 'vanilla' | 'vue';
  activePath?: string;
  autorun?: boolean;
}

export function SandpackRenderer({
  code,
  language = 'tsx',
  showEditor = false,
  additionalFiles = {},
  dependencies = {},
  framework = 'react',
  activePath,
  autorun = true
}: SandpackRendererProps) {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Create custom theme based on app's theme
  const customTheme: SandpackTheme = {
    ...(resolvedTheme === 'dark' ? sandpackDark : {}),
    colors: {
      ...(resolvedTheme === 'dark' ? sandpackDark.colors : {}),
      surface1: resolvedTheme === 'dark' ? '#1e1e2f' : '#ffffff',
      surface2: resolvedTheme === 'dark' ? '#252538' : '#f5f5f5',
      surface3: resolvedTheme === 'dark' ? '#2a2a3c' : '#eeeeee',
    }
  };

  // Prepare files in the format Sandpack expects
  const preparedFiles = React.useMemo(() => {
    // Initialize with the main component file
    const files: Record<string, { code: string, active?: boolean }> = {};
    
    // Process code parameter into App file 
    // The main code provided will be in App.js/tsx/etc.
    const mainFilePath = `/App${fileExtensionMap[language]}`;
    files[mainFilePath] = { code, active: true };
    
    // Process additionalFiles based on format
    if (Array.isArray(additionalFiles)) {
      // Handle array format (ComponentFile[])
      additionalFiles.forEach(file => {
        const filePath = file.filename.startsWith('/') ? file.filename : `/${file.filename}`;
        files[filePath] = { 
          code: file.code,
          active: file.active
        };
      });
    } else {
      // Handle object format (Record<string, string>)
      Object.entries(additionalFiles).forEach(([path, content]) => {
        const filePath = path.startsWith('/') ? path : `/${path}`;
        files[filePath] = { 
          code: typeof content === 'string' ? content : content.toString()
        };
      });
    }

    return files;
  }, [code, language, additionalFiles]);

  // Prepare dependencies
  const mergedDependencies = React.useMemo(() => {
    const defaultDeps: Record<string, string> = {
      "react": "^18.0.0",
      "react-dom": "^18.0.0"
    };
    
    // Add typescript for TypeScript files
    if (language === 'tsx' || language === 'ts') {
      defaultDeps["typescript"] = "^4.6.3";
    }
    
    return { ...defaultDeps, ...dependencies };
  }, [dependencies, language]);

  // Handle client-side rendering to prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="min-h-[200px] bg-muted/40 flex items-center justify-center">Loading...</div>;
  }

  // We'll use the main Sandpack component for simplicity and reliability
  return (
    <div className="sandpack-wrapper rounded-md overflow-hidden">
      <Sandpack
        theme={customTheme}
        template="react"
        files={preparedFiles}
        options={{
          showNavigator: false,
          showTabs: true,
          showLineNumbers: true,
          showInlineErrors: true,
          wrapContent: true,
          editorHeight: showEditor ? 400 : 0,
          classes: {
            'sp-wrapper': 'custom-wrapper',
            'sp-layout': 'custom-layout',
            'sp-editor': 'custom-editor',
            'sp-preview': 'custom-preview'
          }
        }}
        customSetup={{
          dependencies: mergedDependencies
        }}
      />

      <style jsx global>{`
        .custom-wrapper {
          border-radius: 0.375rem;
          border: 1px solid var(--border-color, #e2e8f0);
        }
        
        .custom-layout {
          border: none;
        }
        
        .custom-editor {
          min-height: ${showEditor ? '300px' : '0'};
          display: ${showEditor ? 'block' : 'none'};
          margin-top: ${showEditor ? '1rem' : '0'};
        }
        
        .custom-preview {
          min-height: 200px;
          background: ${resolvedTheme === 'dark' ? '#1e1e2f' : '#ffffff'};
        }
        
        .sp-tabs {
          background: ${resolvedTheme === 'dark' ? '#252538' : '#f5f5f5'};
        }
      `}</style>
    </div>
  );
}