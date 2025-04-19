"use client"

import { useState, useEffect } from 'react'
import { SidebarNav } from './sidebar-nav'
import { cn } from '@/lib/utils'
import { PanelLeftClose, PanelLeft } from 'lucide-react'

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

  // Remove the useEffect for main content margin since we now handle it in the toggle function
  // Update main content margin when collapse state changes
  useEffect(() => {
    // Only run on initial load to set the right margin
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
  }, []); // Empty dependency array means this only runs once
  
  // Update localStorage when collapse state changes
  const toggleCollapsed = () => {
    const newState = !isCollapsed
    setIsCollapsed(newState)
    localStorage.setItem('sidebar-collapsed', String(newState))
    
    // Update main content margin immediately without animation
    const mainContent = document.querySelector('.main-content');
    if (mainContent && window.innerWidth >= 1024) { // lg breakpoint
      if (newState) {
        mainContent.classList.remove('lg:ml-64');
        mainContent.classList.add('lg:ml-16');
      } else {
        mainContent.classList.remove('lg:ml-16');
        mainContent.classList.add('lg:ml-64');
      }
    }
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
          "lg:translate-x-0", // Always visible on desktop
          isSidebarOpen ? "translate-x-0" : "-translate-x-full", // Mobile behavior
          isCollapsed ? "w-16" : "w-64", // Fixed width without transition
          "before:absolute before:inset-0 before:bg-background",
          "before:border-r before:border-border/50", // Border is on the pseudo-element
          "overflow-hidden" // Prevent content from being visible during resize
        )}
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
        <div className="flex flex-col justify-between relative z-10 h-full">
          {/* Navigation items */}
          <div className="flex-1 py-2 overflow-y-auto">
            <SidebarNav isCollapsed={isCollapsed} />
          </div>
          
          {/* Collapse toggle button at the bottom */}
          <div className="px-2 py-3 border-t border-border/50">
            <button
              onClick={toggleCollapsed}
              className="flex items-center rounded-md text-sm font-medium h-10 w-full px-3 text-muted-foreground hover:bg-accent hover:text-accent-foreground relative overflow-hidden"
              aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
              title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              {isCollapsed ? (
                <PanelLeft className="h-5 w-5 flex-shrink-0" style={{ marginLeft: '3px' }} />
              ) : (
                <>
                  <span 
                    className={isCollapsed ? "opacity-0" : "opacity-100"}
                    style={{ transition: "opacity 300ms ease" }}
                  >
                    Collapse
                  </span>
                  <PanelLeftClose className="h-5 w-5 ml-auto flex-shrink-0" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  )
}