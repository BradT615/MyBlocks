// src/app/(protected)/layout.tsx
"use client"

import React, { useState, useEffect } from 'react'
import { SidebarNav } from '@/app/(protected)/_components/sidebar-nav'
import { UserAccountNav } from '@/app/(protected)/_components/user-account-nav'
import { MyBlocksLogo } from '@/components/MyBlocksLogo'
import { MobileNavToggle } from '@/app/(protected)/_components/mobile-nav-toggle'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { UserProvider } from '@/context/user-context'

interface ProtectedLayoutProps {
  children: React.ReactNode
}

export default function ProtectedLayout({ children }: ProtectedLayoutProps) {
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
    <UserProvider>
      <div className="flex min-h-screen relative">
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
              <MobileNavToggle 
                isOpen={isSidebarOpen} 
                onToggle={setIsSidebarOpen} 
              />
            </div>
          </div>
          <div className="flex-1 py-2 overflow-y-auto">
            <SidebarNav />
          </div>
        </aside>

        {/* Main Content with Fixed Header */}
        <div 
          className={cn(
            "flex-1 flex flex-col",
            "lg:ml-64 transition-all duration-300" // Only apply margin on desktop
          )}
        >
          <header className="fixed top-0 right-0 left-0 lg:left-64 h-16 border-b border-border/50 px-4 lg:px-6 flex items-center justify-between bg-background/80 backdrop-blur-sm z-30">
            <div className="lg:hidden flex items-center">
              <MobileNavToggle 
                isOpen={isSidebarOpen} 
                onToggle={setIsSidebarOpen} 
              />
              <Link 
                href="/dashboard" 
                className="ml-2 flex items-center gap-2"
              >
                <MyBlocksLogo width={24} height={24} variant="filled" />
                <span className="font-bold">MyBlocks</span>
              </Link>
            </div>
            <div className="ml-auto">
              <UserAccountNav />
            </div>
          </header>
          <main className="flex-1 overflow-auto p-4 lg:p-6 mt-16">
            {children}
          </main>
        </div>
      </div>
    </UserProvider>
  )
}