"use client"

import { createContext, useContext, useState, useEffect } from 'react'
import React from 'react'

interface SidebarContextType {
  isOpen: boolean;
  toggle: () => void;
}

// Create a context for the sidebar state
const SidebarContext = createContext<SidebarContextType>({
  isOpen: false,
  toggle: () => {},
})

export function MobileSidebarProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)

  // Handle document body scrolling when sidebar is open on mobile
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  // Add/remove a class to control sidebar visibility on mobile
  useEffect(() => {
    const sidebar = document.querySelector('.mobile-sidebar')
    if (sidebar) {
      if (isOpen) {
        sidebar.classList.remove('-translate-x-full')
      } else {
        sidebar.classList.add('-translate-x-full')
      }
    }
  }, [isOpen])

  // Add overlay when sidebar is open
  useEffect(() => {
    if (isOpen) {
      const overlay = document.createElement('div')
      overlay.className = 'fixed inset-0 bg-background/80 backdrop-blur-sm z-30 lg:hidden sidebar-overlay'
      overlay.addEventListener('click', () => setIsOpen(false))
      document.body.appendChild(overlay)
      
      return () => {
        if (document.body.contains(overlay)) {
          document.body.removeChild(overlay)
        }
      }
    }
  }, [isOpen])

  return (
    <SidebarContext.Provider value={{ isOpen, toggle: () => setIsOpen(!isOpen) }}>
      {children}
    </SidebarContext.Provider>
  )
}

// Hook to use the sidebar context
export function useSidebar() {
  return useContext(SidebarContext)
}