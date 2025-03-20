"use client"

import React, { useState } from 'react'
import { ComponentRenderer } from './component-renderer'
import { Button } from '@/components/ui/button'

// Example of how to use the ComponentRenderer with multi-file setup
export default function SandpackExample() {
  const [showEditor, setShowEditor] = useState(false)
  
  // Example of a multi-file component
  const mainComponentCode = `
import { useState } from 'react';
import { Button } from './Button';
import './styles.css';

export default function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <div className="counter-container">
      <h2>Counter Example</h2>
      <p>Current count: <span className="counter-value">{count}</span></p>
      <div className="button-group">
        <Button onClick={() => setCount(count - 1)}>Decrement</Button>
        <Button onClick={() => setCount(count + 1)}>Increment</Button>
      </div>
    </div>
  );
}
`

  // Additional files
  const buttonComponent = `
import React from 'react';

export function Button({ children, onClick }) {
  return (
    <button 
      className="custom-button"
      onClick={onClick}
    >
      {children}
    </button>
  );
}
`

  const styles = `
.counter-container {
  padding: 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
  font-family: sans-serif;
}

.counter-value {
  font-weight: bold;
  color: #3182ce;
}

.button-group {
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
}

.custom-button {
  background-color: #4299e1;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.2s;
}

.custom-button:hover {
  background-color: #3182ce;
}
`

  // Setup the files for Sandpack
  const additionalFiles = [
    {
      filename: 'Button.jsx',
      code: buttonComponent,
      language: 'jsx' as const
    },
    {
      filename: 'styles.css',
      code: styles,
      language: 'css' as const
    }
  ]

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Multi-file Component Example</h2>
        <Button 
          variant="outline"
          onClick={() => setShowEditor(!showEditor)}
        >
          {showEditor ? 'Hide Editor' : 'Show Editor'}
        </Button>
      </div>
      
      <ComponentRenderer
        code={mainComponentCode}
        language="jsx"
        showEditor={showEditor}
        additionalFiles={additionalFiles}
        dependencies={{
          "react": "^18.0.0",
          "react-dom": "^18.0.0"
        }}
      />
    </div>
  )
}