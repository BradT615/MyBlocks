// src/app/(protected)/_components/user-account-nav.tsx
"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { LayoutDashboard, Settings, LogOut, Home, Sun, Moon, Monitor, Paintbrush } from "lucide-react"
import { useTheme } from "next-themes"
import { useUser } from '@/context/user-context'

export function UserAccountNav() {
  const router = useRouter()
  const { user, profile, loading } = useUser()
  const { setTheme } = useTheme()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  
  // Get user initials for avatar fallback
  const getUserInitials = () => {
    if (!profile) return "U"
    
    if (profile.full_name) {
      const names = profile.full_name.split(' ')
      if (names.length >= 2) {
        return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase()
      }
      return profile.full_name.charAt(0).toUpperCase()
    }
    
    if (user?.email) {
      const emailName = user.email.split('@')[0]
      // Try to extract initials from email
      const parts = emailName.split(/[._-]/)
      if (parts.length > 1) {
        return `${parts[0][0]}${parts[1][0]}`.toUpperCase()
      }
      return emailName.charAt(0).toUpperCase()
    }
    
    return "U"
  }
  
  const handleSignOut = async () => {
    await fetch("/auth/signout", { method: "POST" })
    router.refresh()
  }
  
  // Handle theme change without closing the dropdown
  const handleThemeChange = (theme: string) => {
    // Prevent event propagation to avoid dropdown closing
    setTheme(theme)
  }

  return (
    <DropdownMenu open={isMenuOpen} onOpenChange={setIsMenuOpen} modal={false}>
      <DropdownMenuTrigger asChild>
        <Button className="relative h-10 w-10 rounded-full">
          <Avatar className="h-10 w-10">
            {profile?.avatar_url ? (
              <AvatarImage src={profile.avatar_url} alt="Profile" />
            ) : null}
            <AvatarFallback className="bg-primary/10 text-foreground font-medium">
              {loading ? "..." : getUserInitials()}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64">
        {/* User Info */}
        <div className="px-4 py-3">
          <p className="font-medium text-sm">
            {profile?.full_name || "MyBlocks User"}
          </p>
          <p className="text-xs text-muted-foreground truncate">
            {user?.email || "user@example.com"}
          </p>
        </div>
        
        <DropdownMenuSeparator />
        
        {/* Navigation Items */}
        <div className="p-1">
          <DropdownMenuItem asChild className="py-2 cursor-pointer hover:bg-accent">
            <Link href="/dashboard" className="flex items-center w-full">
              <LayoutDashboard className="mr-2 h-4 w-4" />
              Dashboard
            </Link>
          </DropdownMenuItem>
          
          <DropdownMenuItem asChild className="py-2 cursor-pointer hover:bg-accent">
            <Link href="/settings" className="flex items-center w-full">
              <Settings className="mr-2 h-4 w-4" />
              Account Settings
            </Link>
          </DropdownMenuItem>
        </div>
        
        <DropdownMenuSeparator />
        
        {/* Theme */}
        <div className="p-1">
          <div className="flex items-center px-2 py-1.5 text-sm">
            <Paintbrush className="mr-2 h-4 w-4" />
            <span>Theme</span>
            <div className="flex items-center space-x-1 ml-auto border border-border/50 rounded-md">
              <button 
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleThemeChange('light');
                }}
                className="h-8 w-8 rounded-l flex items-center justify-center hover:bg-accent"
                aria-label="Light theme"
              >
                <Sun className="h-4 w-4" />
              </button>
              <button 
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleThemeChange('system');
                }}
                className="h-8 w-8 flex items-center justify-center hover:bg-accent"
                aria-label="System theme"
              >
                <Monitor className="h-4 w-4" />
              </button>
              <button 
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleThemeChange('dark');
                }}
                className="h-8 w-8 rounded-r flex items-center justify-center hover:bg-accent"
                aria-label="Dark theme"
              >
                <Moon className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
        
        <DropdownMenuSeparator />
        
        {/* Home and Logout */}
        <div className="p-1">
          <DropdownMenuItem asChild className="py-2 cursor-pointer hover:bg-accent">
            <Link href="/" className="flex items-center w-full">
              <Home className="mr-2 h-4 w-4" />
              Home Page
            </Link>
          </DropdownMenuItem>
          
          <DropdownMenuItem 
            className="py-2 cursor-pointer flex items-center hover:bg-accent"
            onSelect={handleSignOut}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Log Out
          </DropdownMenuItem>
        </div>
        
        <DropdownMenuSeparator />
        
        {/* Upgrade Button */}
        <div className="p-2">
          <Button variant="default" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
            Upgrade to Pro
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}