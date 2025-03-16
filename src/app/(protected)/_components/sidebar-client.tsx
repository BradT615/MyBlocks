// src/app/(protected)/_components/sidebar-client.tsx
"use client"

import { useState, useEffect } from 'react'
import { SidebarNav } from './sidebar-nav'
import { MyBlocksLogo } from '@/components/MyBlocksLogo'
import Link from 'next/link'
import { cn } from '@/lib/utils'

export function SidebarClient() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

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
      
      {/* Sidebar Navigation */}
      <aside 
        className={cn(
          "fixed inset-y-0 left-0 w-64 border-r border-border/50 flex flex-col bg-background z-40",
          "transition-transform duration-300 ease-in-out",
          "lg:translate-x-0", // Always visible on desktop
          isSidebarOpen ? "translate-x-0" : "-translate-x-full" // Conditional on mobile
        )}
      >
        <div className="h-16 border-b border-border/50 px-4 flex items-center justify-between">
          <Link 
            href="/dashboard" 
            className="group flex items-center gap-2 transition-all hover:opacity-90"
          >
            <MyBlocksLogo width={32} height={32} variant="filled" />
            <span className="text-xl font-bold">MyBlocks</span>
          </Link>
          <div className="lg:hidden">
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
        </div>
        <div className="flex-1 py-2 overflow-y-auto">
          <SidebarNav />
        </div>
      </aside>
    </>
  )
}