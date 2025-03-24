"use client"

import React, { useState, useEffect } from 'react'
import {
  Sandpack,
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackPreview,
} from '@codesandbox/sandpack-react'
import { useTheme } from 'next-themes'
import { sandpackDark } from '@codesandbox/sandpack-themes'

// Define supported languages
type SupportedLanguage = 'tsx' | 'jsx' | 'js' | 'ts' | 'html' | 'css' | 'scss' | 'less';

// Define file extension mapping
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

// Component file interface
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

  // Create a proper entry point that renders the user's component
  const createEntryPoint = (componentPath: string): string => {
    return `import React from 'react';
import ReactDOM from 'react-dom';
import Component from '${componentPath}';

ReactDOM.render(
  <React.StrictMode>
    <Component />
  </React.StrictMode>,
  document.getElementById('root')
);`;
  };

  // Prepare files for Sandpack
  const preparedFiles = React.useMemo(() => {
    const files: Record<string, { code: string, active?: boolean }> = {};
    
    // Set up the main component file
    const mainComponentPath = `/Component${fileExtensionMap[language]}`;
    const indexPath = `/index${language === 'tsx' || language === 'ts' ? '.tsx' : '.jsx'}`;
    
    // Add the component code
    files[mainComponentPath] = { 
      code: code, 
      active: !activePath 
    };
    
    // Create the entry point file
    files[indexPath] = {
      code: createEntryPoint('./Component'),
      active: false
    };
    
    // Add CSS for styling
    files['/styles.css'] = {
      code: `
/* Base styles for preview */
body {
  font-family: sans-serif;
  margin: 0;
  padding: 16px;
}
      `,
      active: false
    };
    
    // Process additional files
    if (Array.isArray(additionalFiles)) {
      additionalFiles.forEach(file => {
        const filePath = file.filename.startsWith('/') ? file.filename : `/${file.filename}`;
        files[filePath] = { 
          code: file.code,
          active: activePath === filePath
        };
      });
    } else {
      Object.entries(additionalFiles).forEach(([path, content]) => {
        const filePath = path.startsWith('/') ? path : `/${path}`;
        files[filePath] = { 
          code: typeof content === 'string' ? content : content.toString(),
          active: activePath === filePath
        };
      });
    }

    return files;
  }, [code, language, additionalFiles, activePath]);

  // Add core dependencies and any user-specified ones
  const mergedDependencies = React.useMemo(() => {
    const defaultDeps: Record<string, string> = {
      "react": "^18.2.0",
      "react-dom": "^18.2.0"
    };
    
    // Add TypeScript for TS files
    if (language === 'tsx' || language === 'ts') {
      defaultDeps["typescript"] = "^4.9.5";
    }
    
    return { ...defaultDeps, ...dependencies };
  }, [dependencies, language]);
  
  // Handle client-side rendering
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="min-h-[200px] bg-muted/40 flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="sandpack-wrapper rounded-md overflow-hidden">
      <Sandpack
        theme={resolvedTheme === 'dark' ? sandpackDark : 'light'}
        template="react"
        files={preparedFiles}
        options={{
          showNavigator: false,
          showTabs: true,
          showLineNumbers: true,
          showInlineErrors: true,
          wrapContent: true,
          editorHeight: showEditor ? 400 : 0,
          visibleFiles: showEditor ? Object.keys(preparedFiles) : [],
          activeFile: activePath || `/Component${fileExtensionMap[language]}`
        }}
        customSetup={{
          dependencies: mergedDependencies,
          entry: '/index.jsx'
        }}
      />

      <style jsx global>{`
        .sp-wrapper {
          border-radius: 0.375rem;
          border: 1px solid var(--border-color, #e2e8f0);
        }
        
        .sp-layout {
          border: none;
        }
        
        .sp-editor {
          min-height: ${showEditor ? '300px' : '0'};
          display: ${showEditor ? 'block' : 'none'};
          margin-top: ${showEditor ? '1rem' : '0'};
        }
        
        .sp-preview {
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