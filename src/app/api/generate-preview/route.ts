// src/app/api/generate-preview/route.ts
import { NextRequest, NextResponse } from 'next/server';
import chromium from '@sparticuz/chromium-min';
import puppeteer from 'puppeteer-core';

// Configuration to enable Puppeteer to run in a serverless environment
let exePath: string | undefined;
// Use the environment variable path if provided
if (process.env.PUPPETEER_EXECUTABLE_PATH) {
  exePath = process.env.PUPPETEER_EXECUTABLE_PATH;
} 
// Otherwise use the chromium package's path
else if (chromium.executablePath) {
  // chromium.executablePath can be either a string or a function
  if (typeof chromium.executablePath === 'string') {
    exePath = await chromium.executablePath();
  }
  // We'll handle the function case during browser launch
}

export async function POST(request: NextRequest) {
  console.log('API Route: /api/generate-preview called');
  try {
    // Log request details
    console.log('Request method:', request.method);
    console.log('Request headers:', Object.fromEntries(request.headers.entries()));
    
    const body = await request.json();
    console.log('Request body received');
    const { componentCode, language, theme = 'light' } = body;
    
    if (!componentCode || !language) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Launch a new browser instance
    const launchOptions: any = {
      args: chromium.args,
      headless: true,
    };
    
    // Handle executable path
    if (exePath) {
      // If we already have a string path, use it
      launchOptions.executablePath = exePath;
    } else if (chromium.executablePath && typeof chromium.executablePath === 'function') {
      // If executablePath is a function, we need to await it
      try {
        launchOptions.executablePath = await chromium.executablePath();
      } catch (err) {
        console.error('Failed to get executablePath:', err);
        // Continue without setting executablePath - Puppeteer will try to find Chrome
      }
    }
    
    const browser = await puppeteer.launch(launchOptions);
    
    const page = await browser.newPage();
    await page.setViewport({ width: 800, height: 600 });
    
    // Create HTML with the component
    const html = generateHTMLWithComponent(componentCode, language, theme);
    await page.setContent(html);
    
    // Wait for any resources to load and component to render
    // Using setTimeout instead of waitForTimeout for compatibility
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Take screenshot
    const screenshot = await page.screenshot({ 
      type: 'png',
      omitBackground: theme === 'transparent'
    });
    
    await browser.close();

    // Convert buffer to base64
    const base64Image = Buffer.from(screenshot).toString('base64');
    
    console.log('Screenshot generated successfully', { 
      imageSize: base64Image.length,
      previewLength: base64Image.substring(0, 20) + '...' 
    });
    
    return NextResponse.json({ 
      success: true, 
      image: base64Image 
    });
  } catch (error) {
    console.error('Error generating component preview:', error);
    // Provide more detailed error info
    const errorMessage = error instanceof Error 
      ? `${error.name}: ${error.message}` 
      : 'Unknown error';
    
    console.error('Error details:', errorMessage);
    
    return NextResponse.json(
      { 
        success: false, 
        message: 'Failed to generate preview',
        error: errorMessage
      },
      { status: 500 }
    );
  }
}

function generateHTMLWithComponent(code: string, language: string, theme: string) {
  // For React components
  if (language === 'tsx' || language === 'jsx') {
    // Try to extract component name, or use a default
    const mainComponentName = getMainComponentName(code) || 'App';
    
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body {
            margin: 0;
            background: ${theme === 'dark' ? '#1a1a1a' : '#ffffff'};
            color: ${theme === 'dark' ? '#ffffff' : '#000000'};
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
            padding: 2rem;
          }
          #root {
            display: flex;
            justify-content: center;
          }
        </style>
        <script src="https://unpkg.com/react@17/umd/react.production.min.js"></script>
        <script src="https://unpkg.com/react-dom@17/umd/react-dom.production.min.js"></script>
        <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
        
        <!-- Include shadcn-ui styles since the app uses it -->
        <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
      </head>
      <body>
        <div id="root"></div>
        <script type="text/babel">
          ${code}
          
          // Try to render the component
          try {
            ReactDOM.render(
              React.createElement(${mainComponentName}), 
              document.getElementById('root')
            );
          } catch (error) {
            console.error("Error rendering component:", error);
            document.getElementById('root').innerHTML = \`
              <div style="color: red; border: 1px solid red; padding: 20px; border-radius: 4px;">
                <h3>Error Rendering Component</h3>
                <p>\${error.message}</p>
              </div>
            \`;
          }
        </script>
      </body>
      </html>
    `;
  }
  
  // For HTML components
  if (language === 'html') {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body {
            margin: 0;
            background: ${theme === 'dark' ? '#1a1a1a' : '#ffffff'};
            color: ${theme === 'dark' ? '#ffffff' : '#000000'};
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
            padding: 2rem;
          }
        </style>
        <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
      </head>
      <body>
        ${code}
      </body>
      </html>
    `;
  }
  
  // For CSS components, wrap in a basic HTML structure
  if (language === 'css') {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body {
            margin: 0;
            background: ${theme === 'dark' ? '#1a1a1a' : '#ffffff'};
            color: ${theme === 'dark' ? '#ffffff' : '#000000'};
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
            padding: 2rem;
          }
          
          /* Component CSS */
          ${code}
        </style>
      </head>
      <body>
        <div class="component-preview">
          <div class="demo-element">Component Preview</div>
        </div>
      </body>
      </html>
    `;
  }
  
  // Default fallback for other languages
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <style>
        body {
          margin: 0;
          background: ${theme === 'dark' ? '#1a1a1a' : '#ffffff'};
          color: ${theme === 'dark' ? '#ffffff' : '#000000'};
          font-family: monospace;
          padding: 2rem;
        }
        pre {
          white-space: pre-wrap;
          word-wrap: break-word;
        }
      </style>
    </head>
    <body>
      <pre>${code.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</pre>
    </body>
    </html>
  `;
}

// Helper to extract main component name from JSX/TSX
function getMainComponentName(code: string) {
  // Try to find export default statements
  const exportDefaultMatch = code.match(/export\s+default\s+(\w+)/);
  if (exportDefaultMatch && exportDefaultMatch[1]) {
    return exportDefaultMatch[1];
  }
  
  // Try to find function component declarations
  const functionComponentMatch = code.match(/function\s+(\w+)/);
  if (functionComponentMatch && functionComponentMatch[1]) {
    return functionComponentMatch[1];
  }
  
  // Try to find const component declarations
  const constComponentMatch = code.match(/const\s+(\w+)\s*=\s*\(/);
  if (constComponentMatch && constComponentMatch[1]) {
    return constComponentMatch[1];
  }
  
  return null;
}