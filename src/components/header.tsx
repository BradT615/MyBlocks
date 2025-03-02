"use client"

import Link from "next/link"
import { Menu } from "lucide-react"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { MyBlocksLogo } from "@/components/MyBlocksLogo"
import { cn } from "@/lib/utils"
import { createClient } from "@/utils/supabase/client"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const supabase = createClient()
    
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
    }

    checkUser()

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null)
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/70 backdrop-blur">
      <div className="w-full px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-center relative">
        {/* Logo */}
        <div className="absolute left-4 sm:left-6 lg:left-8 flex items-center gap-2">
          <Link href="/" className="group flex items-center gap-2 transition-all duration-300 hover:opacity-90">
            <MyBlocksLogo width={32} height={32} variant="filled" />
            <span className="text-xl font-bold">MyBlocks</span>
          </Link>
        </div>
        
        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link 
            href="#features" 
            className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors"
          >
            Features
          </Link>
          <Link 
            href="#benefits" 
            className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors"
          >
            Benefits
          </Link>
          <Link 
            href="#pricing" 
            className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors"
          >
            Pricing
          </Link>
        </nav>
        
        {/* Right-side actions */}
        <div className="absolute right-4 sm:right-6 lg:right-8 hidden md:flex items-center gap-4">
          <ThemeToggle />
          {user ? (
            <Button 
              asChild
              className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-md shadow-sm hover:shadow-md transition-all"
            >
              <Link href="/dashboard">
                Dashboard
              </Link>
            </Button>
          ) : (
            <>
              <Button 
                variant="ghost"
                asChild
                className="rounded-md transition-all"
              >
                <Link href="/login">
                  Sign In
                </Link>
              </Button>
              <Button 
                asChild
                className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-md shadow-sm hover:shadow-md transition-all"
              >
                <Link href="/register">
                  Sign Up
                </Link>
              </Button>
            </>
          )}
        </div>
        
        {/* Mobile navigation toggle */}
        <div className="absolute right-4 sm:right-6 lg:right-8 flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-foreground/70 hover:text-foreground hover:bg-accent/50 rounded-full"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
      
      {/* Mobile navigation menu */}
      {isMenuOpen && (
        <div className={cn(
          "container py-4 md:hidden",
          "border-t border-border/20 bg-background/95 backdrop-blur"
        )}>
          <nav className="flex flex-col space-y-4">
            <Link 
              href="#features" 
              className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors" 
              onClick={() => setIsMenuOpen(false)}
            >
              Features
            </Link>
            <Link 
              href="#benefits" 
              className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors" 
              onClick={() => setIsMenuOpen(false)}
            >
              Benefits
            </Link>
            <Link 
              href="#pricing" 
              className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors" 
              onClick={() => setIsMenuOpen(false)}
            >
              Pricing
            </Link>
            <div className="flex flex-col space-y-2 pt-2">
              {user ? (
                <Button 
                  asChild
                  className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-md shadow-sm hover:shadow-md transition-all"
                >
                  <Link href="/dashboard">
                    Dashboard
                  </Link>
                </Button>
              ) : (
                <>
                  <Button 
                    asChild
                    className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-md shadow-sm hover:shadow-md transition-all"
                  >
                    <Link href="/login">
                      Sign In
                    </Link>
                  </Button>
                  <Button 
                    variant="outline" 
                    asChild
                    className="border-border bg-background hover:bg-accent/50 hover:text-accent-foreground/90 rounded-md shadow-sm hover:shadow-md transition-all"
                  >
                    <Link href="/register">
                      Sign Up
                    </Link>
                  </Button>
                </>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}