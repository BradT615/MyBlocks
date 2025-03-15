"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { Menu, X } from "lucide-react"

interface MobileMenuProps {
  isAuthenticated: boolean
}

export function MobileMenu({ isAuthenticated }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
    // Toggle body scroll when menu is open
    if (!isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  }

  // Close menu on route change or when a link is clicked
  const closeMenu = () => {
    setIsOpen(false)
    document.body.style.overflow = ''
  }

  return (
    <div className="md:hidden flex items-center">
      <ThemeToggle />
      
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={toggleMenu}
        className="text-foreground/70 hover:text-foreground hover:bg-accent/50 rounded-full ml-2"
        aria-label={isOpen ? "Close menu" : "Open menu"}
      >
        {isOpen ? (
          <X className="h-5 w-5" />
        ) : (
          <Menu className="h-5 w-5" />
        )}
      </Button>

      {isOpen && (
        <div className="fixed inset-0 top-16 z-50 bg-background border-t border-border">
          <div className="container py-6">
            <nav className="flex flex-col space-y-6">
              <Link 
                href="#features" 
                className="text-base font-medium text-foreground/80 hover:text-foreground transition-colors" 
                onClick={closeMenu}
              >
                Features
              </Link>
              <Link 
                href="#benefits" 
                className="text-base font-medium text-foreground/80 hover:text-foreground transition-colors" 
                onClick={closeMenu}
              >
                Benefits
              </Link>
              <Link 
                href="#pricing" 
                className="text-base font-medium text-foreground/80 hover:text-foreground transition-colors" 
                onClick={closeMenu}
              >
                Pricing
              </Link>
              <Link 
                href="/community" 
                className="text-base font-medium text-foreground/80 hover:text-foreground transition-colors" 
                onClick={closeMenu}
              >
                Community
              </Link>
              
              <div className="pt-4 border-t">
                {isAuthenticated ? (
                  <Button 
                    asChild
                    size="lg"
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                    onClick={closeMenu}
                  >
                    <Link href="/dashboard">
                      Dashboard
                    </Link>
                  </Button>
                ) : (
                  <div className="flex flex-col space-y-3">
                    <Button 
                      asChild
                      size="lg"
                      className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                      onClick={closeMenu}
                    >
                      <Link href="/register">
                        Sign Up
                      </Link>
                    </Button>
                    <Button 
                      asChild
                      variant="outline"
                      size="lg"
                      className="w-full"
                      onClick={closeMenu}
                    >
                      <Link href="/login">
                        Sign In
                      </Link>
                    </Button>
                  </div>
                )}
              </div>
            </nav>
          </div>
        </div>
      )}
    </div>
  )
}