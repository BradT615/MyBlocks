// src/components/header.tsx
"use client"

import Link from "next/link"
import { Menu } from "lucide-react"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { MyBlocksLogo } from "@/components/MyBlocksLogo"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="group flex items-center gap-2 transition-all duration-300 hover:opacity-90">
            <MyBlocksLogo width={32} height={32} animated variant="filled" />
            <span className="text-xl font-bold">MyBlocks</span>
          </Link>
        </div>
        
        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link href="#features" className="text-sm font-medium hover:underline underline-offset-4">
            Features
          </Link>
          <Link href="#benefits" className="text-sm font-medium hover:underline underline-offset-4">
            Benefits
          </Link>
          <Link href="#pricing" className="text-sm font-medium hover:underline underline-offset-4">
            Pricing
          </Link>
          <ThemeToggle />
          <Button asChild>
            <Link href="/login">
              Sign In
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/register">
              Sign Up
            </Link>
          </Button>
        </nav>
        
        {/* Mobile navigation toggle */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
      
      {/* Mobile navigation menu */}
      {isMenuOpen && (
        <div className="container py-4 md:hidden">
          <nav className="flex flex-col space-y-4">
            <Link 
              href="#features" 
              className="text-sm font-medium" 
              onClick={() => setIsMenuOpen(false)}
            >
              Features
            </Link>
            <Link 
              href="#benefits" 
              className="text-sm font-medium" 
              onClick={() => setIsMenuOpen(false)}
            >
              Benefits
            </Link>
            <Link 
              href="#pricing" 
              className="text-sm font-medium" 
              onClick={() => setIsMenuOpen(false)}
            >
              Pricing
            </Link>
            <div className="flex flex-col space-y-2 pt-2">
              <Button asChild>
                <Link href="/login">
                  Sign In
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/register">
                  Sign Up
                </Link>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}