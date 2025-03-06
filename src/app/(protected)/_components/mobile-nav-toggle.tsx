"use client"

import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useEffect } from "react"

interface MobileNavToggleProps {
  onToggle: (isOpen: boolean) => void
  isOpen: boolean
}

export function MobileNavToggle({ onToggle, isOpen }: MobileNavToggleProps) {
  const toggleSidebar = () => {
    onToggle(!isOpen)
  }

  // Close sidebar when window is resized to desktop size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024 && isOpen) {
        onToggle(false)
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [isOpen, onToggle])

  return (
    <Button
      variant="ghost"
      size="icon"
      className="lg:hidden"
      onClick={toggleSidebar}
      aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
    >
      {isOpen ? (
        <X className="h-5 w-5" />
      ) : (
        <Menu className="h-5 w-5" />
      )}
    </Button>
  )
}