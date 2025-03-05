"use client"

import { useState, useEffect } from "react"
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
import { createClient } from "@/utils/supabase/client"
import { User } from "@supabase/supabase-js"
import { LayoutDashboard, Settings, Users, LogOut, Home, Sun, Moon, PlusCircle, Monitor } from "lucide-react"
import { useTheme } from "next-themes"

export function UserAccountNav() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const { setTheme } = useTheme()
  
  // Fetch user data on component mount
  useEffect(() => {
    const supabase = createClient()
    
    async function getUser() {
      setLoading(true)
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
      setLoading(false)
    }
    
    getUser()
    
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null)
    })
    
    return () => {
      subscription.unsubscribe()
    }
  }, [])
  
  // Get user initials for avatar fallback
  const getUserInitials = () => {
    if (!user) return "BT"
    
    if (user.user_metadata?.full_name) {
      const names = user.user_metadata.full_name.split(' ')
      if (names.length >= 2) {
        return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase()
      }
      return user.user_metadata.full_name.charAt(0).toUpperCase()
    }
    
    if (user.email) {
      const emailName = user.email.split('@')[0]
      // Try to extract initials from email
      const parts = emailName.split(/[._-]/)
      if (parts.length > 1) {
        return `${parts[0][0]}${parts[1][0]}`.toUpperCase()
      }
      return emailName.charAt(0).toUpperCase()
    }
    
    return "BT"
  }
  
  const handleSignOut = async () => {
    await fetch("/auth/signout", { method: "POST" })
    router.refresh()
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            {user?.user_metadata?.avatar_url ? (
              <AvatarImage src={user.user_metadata.avatar_url} alt="Profile" />
            ) : null}
            <AvatarFallback className="bg-primary/10 text-foreground font-medium">
              {loading ? "BT" : getUserInitials()}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64 p-0 bg-black text-white border-zinc-800">
        {/* User Info */}
        <div className="px-4 py-3">
          <p className="font-medium text-sm">
            {user?.user_metadata?.full_name || "Bradley T."}
          </p>
          <p className="text-xs text-zinc-400 truncate">
            {user?.email || "bradtitus615@gmail.com"}
          </p>
        </div>
        
        <DropdownMenuSeparator className="m-0 bg-zinc-800" />
        
        {/* Navigation Items */}
        <div className="p-1">
          <DropdownMenuItem asChild className="py-2 hover:bg-zinc-800 text-white focus:bg-zinc-800 focus:text-white">
            <Link href="/dashboard" className="cursor-pointer flex items-center">
              <LayoutDashboard className="mr-2 h-4 w-4" />
              Dashboard
            </Link>
          </DropdownMenuItem>
          
          <DropdownMenuItem asChild className="py-2 hover:bg-zinc-800 text-white focus:bg-zinc-800 focus:text-white">
            <Link href="/dashboard/settings" className="cursor-pointer flex items-center">
              <Settings className="mr-2 h-4 w-4" />
              Account Settings
            </Link>
          </DropdownMenuItem>
          
          <DropdownMenuItem className="py-2 cursor-pointer flex items-center hover:bg-zinc-800 text-white focus:bg-zinc-800 focus:text-white">
            <Users className="mr-2 h-4 w-4" />
            Create Team
            <PlusCircle className="ml-auto h-4 w-4" />
          </DropdownMenuItem>
        </div>
        
        <DropdownMenuSeparator className="m-0 bg-zinc-800" />
        
        {/* Theme */}
        <div className="p-1">
          <DropdownMenuItem className="py-2 hover:bg-zinc-800 focus:bg-zinc-800 focus:text-white cursor-default flex items-center justify-between">
            <span className="ml-6">Theme</span>
            <div className="flex items-center space-x-1">
              <button 
                onClick={() => setTheme('light')}
                className="h-6 w-6 rounded flex items-center justify-center hover:bg-zinc-700"
              >
                <Sun className="h-4 w-4" />
              </button>
              <button 
                onClick={() => setTheme('system')}
                className="h-6 w-6 rounded flex items-center justify-center hover:bg-zinc-700"
              >
                <Monitor className="h-4 w-4" />
              </button>
              <button 
                onClick={() => setTheme('dark')}
                className="h-6 w-6 rounded flex items-center justify-center hover:bg-zinc-700"
              >
                <Moon className="h-4 w-4" />
              </button>
            </div>
          </DropdownMenuItem>
        </div>
        
        <DropdownMenuSeparator className="m-0 bg-zinc-800" />
        
        {/* Home and Logout */}
        <div className="p-1">
          <DropdownMenuItem asChild className="py-2 hover:bg-zinc-800 text-white focus:bg-zinc-800 focus:text-white">
            <Link href="/" className="cursor-pointer flex items-center">
              <Home className="mr-2 h-4 w-4" />
              Home Page
            </Link>
          </DropdownMenuItem>
          
          <DropdownMenuItem 
            className="py-2 cursor-pointer flex items-center hover:bg-zinc-800 text-white focus:bg-zinc-800 focus:text-white"
            onSelect={handleSignOut}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Log Out
            <LogOut className="ml-auto h-4 w-4 -rotate-90" />
          </DropdownMenuItem>
        </div>
        
        <DropdownMenuSeparator className="m-0 bg-zinc-800" />
        
        {/* Upgrade Button */}
        <div className="p-2">
          <Button className="w-full rounded-md hover:bg-zinc-800 bg-zinc-900 border border-zinc-700 text-white">
            Upgrade to Pro
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}