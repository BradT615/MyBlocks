"use client"

import Link from "next/link"
import { Menu, X } from "lucide-react"
import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { MyBlocksLogo } from "@/components/MyBlocksLogo"
import { createClient } from "@/utils/supabase/client"
import { User } from "@supabase/supabase-js"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [user, setUser] = useState<User | null>(null)

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
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-background/80 border-b border-white/10">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between">
        <div className="flex items-center">
          <Link 
            href="/" 
            className="group flex items-center gap-2 transition-all hover:opacity-90"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <MyBlocksLogo width={32} height={32} variant="filled" />
            </motion.div>
            <motion.span 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-xl font-bold"
            >
              MyBlocks
            </motion.span>
          </Link>
        </div>

        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Link 
              href="#features" 
              className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors"
            >
              Features
            </Link>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Link 
              href="#benefits" 
              className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors"
            >
              Benefits
            </Link>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Link 
              href="#pricing" 
              className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors"
            >
              Pricing
            </Link>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Link 
              href="/community" 
              className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors"
            >
              Community
            </Link>
          </motion.div>
        </nav>

        {/* Right side actions */}
        <div className="hidden md:flex items-center gap-2">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <ThemeToggle />
          </motion.div>
          
          {user ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <Button 
                asChild
                className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-md shadow-sm hover:shadow-md transition-all"
              >
                <Link href="/dashboard">
                  Dashboard
                </Link>
              </Button>
            </motion.div>
          ) : (
            <>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <Button 
                  variant="ghost"
                  asChild
                  className="rounded-md transition-all"
                >
                  <Link href="/login">
                    Sign In
                  </Link>
                </Button>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.7 }}
              >
                <Button 
                  asChild
                  className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-md shadow-sm hover:shadow-md transition-all"
                >
                  <Link href="/register">
                    Sign Up
                  </Link>
                </Button>
              </motion.div>
            </>
          )}
        </div>
        
        {/* Mobile menu button */}
        <div className="md:hidden flex items-center gap-2">
          <ThemeToggle />
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-foreground/70 hover:text-foreground hover:bg-accent/50 rounded-full"
          >
            {isMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }} 
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden border-t border-white/10 bg-background/95 backdrop-blur-md"
        >
          <div className="container py-4">
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
              <Link 
                href="/community" 
                className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors" 
                onClick={() => setIsMenuOpen(false)}
              >
                Community
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
        </motion.div>
      )}
    </header>
  )
}