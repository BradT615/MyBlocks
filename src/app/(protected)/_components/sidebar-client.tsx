// src/app/(protected)/_components/sidebar-client.tsx
"use client"

import { useState, useEffect } from 'react'
import { SidebarNav } from './sidebar-nav'
import { cn } from '@/lib/utils'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export function SidebarClient() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isCollapsed, setIsCollapsed] = useState(false)

  // Handle document body scrolling when sidebar is open on mobile
  useEffect(() => {
    if (isSidebarOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    
    return () => {
      document.body.style.overflow = ''
    }
  }, [isSidebarOpen])

  // Load collapsed state from localStorage
  useEffect(() => {
    const savedState = localStorage.getItem('sidebar-collapsed')
    if (savedState !== null) {
      setIsCollapsed(savedState === 'true')
    }
  }, [])

  // Update main content margin when collapse state changes
  useEffect(() => {
    // Update a CSS custom property for the main content margin
    const mainContent = document.querySelector('.main-content');
    if (mainContent && window.innerWidth >= 1024) { // lg breakpoint
      if (isCollapsed) {
        mainContent.classList.remove('lg:ml-64');
        mainContent.classList.add('lg:ml-16');
      } else {
        mainContent.classList.remove('lg:ml-16');
        mainContent.classList.add('lg:ml-64');
      }
    }
  }, [isCollapsed]);
  
  // Update localStorage when collapse state changes
  const toggleCollapsed = () => {
    const newState = !isCollapsed
    setIsCollapsed(newState)
    localStorage.setItem('sidebar-collapsed', String(newState))
  }

  return (
    <>
      {/* Mobile toggle button in header */}
      <button 
        onClick={() => setIsSidebarOpen(true)}
        className="fixed top-4 left-2 p-1 rounded-md hover:bg-accent/50 lg:hidden z-40"
        aria-label="Open sidebar"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="4" x2="20" y1="12" y2="12"></line>
          <line x1="4" x2="20" y1="6" y2="6"></line>
          <line x1="4" x2="20" y1="18" y2="18"></line>
        </svg>
      </button>

      {/* Overlay for mobile when sidebar is open */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
      
      {/* Sidebar container with transition styles */}
      <div 
        className={cn(
          "fixed top-16 bottom-0 left-0 z-40",
          "transition-none", // Using custom transition for smoother effect
          "group", // For hover effects
          "before:absolute before:inset-0 before:transition-all before:duration-300 before:bg-background",
          "before:border-r before:border-border/50", // Border is now on the pseudo-element for smoother transition
          "lg:translate-x-0", // Always visible on desktop
          isSidebarOpen ? "translate-x-0" : "-translate-x-full", // Mobile behavior
          isCollapsed ? "lg:w-16" : "w-64", // Viewport-based width
        )}
        style={{
          // Use style for dynamic transition properties
          transition: "width 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
        }}
      >
        {/* Mobile close button */}
        <div className="lg:hidden p-2 border-b border-border/50 flex justify-end relative z-10">
          <button 
            onClick={() => setIsSidebarOpen(false)}
            className="p-2 rounded-md hover:bg-accent/50"
            aria-label="Close sidebar"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6 6 18"></path>
              <path d="m6 6 12 12"></path>
            </svg>
          </button>
        </div>
        
        {/* Sidebar content with overflow handling */}
        <div className="flex-1 py-2 overflow-y-auto relative z-10 h-full">
          <SidebarNav isCollapsed={isCollapsed} />
        </div>
        
        {/* Floating collapse button */}
        <button
          onClick={toggleCollapsed}
          className={cn(
            "absolute top-1/2 -translate-y-1/2 right-0 -mr-5 z-20",
            "flex items-center justify-center",
            "h-10 w-10 rounded-full",
            "transition-colors bg-accent hover:text-accent-foreground",
            "border border-border",
            "text-muted-foreground hover:text-foreground hover:border-border",
            "opacity-0 group-hover:opacity-100 transition-all duration-200",
            "hidden lg:flex",
            "transform scale-90 hover:scale-100"
          )}
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {isCollapsed ? (
            <ChevronRight className="h-5 w-5" />
          ) : (
            <ChevronLeft className="h-5 w-5" />
          )}
        </button>
      </div>
    </>
  )
}