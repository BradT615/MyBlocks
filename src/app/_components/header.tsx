import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { MyBlocksLogo } from "@/components/MyBlocksLogo"
import { createClient } from "@/utils/supabase/server"
import { MobileMenu } from './mobile-menu'

export async function Header() {
  // Get user data server-side
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-background/80 border-b border-border">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between">
        <div className="flex items-center">
          <Link 
            href="/" 
            className="group flex items-center gap-2 transition-all hover:opacity-90"
          >
            <MyBlocksLogo width={32} height={32} variant="filled" />
            <span className="text-xl font-bold">MyBlocks</span>
          </Link>
        </div>

        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center gap-8">
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
          <Link 
            href="/community" 
            className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors"
          >
            Community
          </Link>
        </nav>

        {/* Right side actions */}
        <div className="hidden md:flex items-center gap-2">
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
        
        {/* Mobile menu */}
        <MobileMenu isAuthenticated={!!user} />
      </div>
    </header>
  )
}