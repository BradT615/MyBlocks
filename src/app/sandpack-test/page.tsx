"use client"

import { ComponentRenderer } from '@/app/(protected)/components/[id]/_components/component-renderer'
import { Button } from '@/components/ui/button'
import { useState } from 'react'

export default function SandpackTestPage() {
  const [showEditor, setShowEditor] = useState(false)
  
  const mainComponent = `
import React, { useState } from 'react';
import { Button } from "/Button";
import "/styles.css";

export default function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <div className="counter-container">
      <h2>Counter Example</h2>
      <p>Current count: <span className="count-value">{count}</span></p>
      <div className="button-group">
        <Button onClick={() => setCount(count - 1)}>Decrement</Button>
        <Button onClick={() => setCount(count + 1)}>Increment</Button>
      </div>
    </div>
  );
}
`

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
  max-width: 400px;
  margin: 0 auto;
}

.count-value {
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

  // Configuration for the test renderer
  const files = [
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
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">Sandpack Integration Test</h1>
      
      <div className="flex justify-end mb-4">
        <Button 
          variant="outline" 
          onClick={() => setShowEditor(!showEditor)}
        >
          {showEditor ? 'Hide Editor' : 'Show Editor'}
        </Button>
      </div>
      
      <div className="border rounded-md p-4 bg-card">
        <ComponentRenderer
          code={mainComponent}
          language="jsx"
          showEditor={showEditor}
          additionalFiles={files}
          dependencies={{
            "react": "^18.0.0",
            "react-dom": "^18.0.0"
          }}
        />
      </div>
    </div>
  )
}