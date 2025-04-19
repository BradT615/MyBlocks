// src/app/(protected)/layout.tsx
import React from 'react'
import { UserAccountNav } from '@/app/(protected)/_components/user-account-nav'
import { MyBlocksLogo } from '@/components/MyBlocksLogo'
import { SidebarClient } from '@/app/(protected)/_components/sidebar-client'
import Link from 'next/link'
import { createClient } from "@/utils/supabase/server"
import { redirect } from 'next/navigation'

interface ProtectedLayoutProps {
  children: React.ReactNode
}

export default async function ProtectedLayout({ children }: ProtectedLayoutProps) {
  // Get user data server-side
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  // If no user is found, redirect to login
  if (!user) {
    redirect('/login')
  }
  
  // Get profile data from profiles table
  const { data: profile } = await supabase
    .from('profiles')
    .select('full_name, avatar_url')
    .eq('id', user.id)
    .single()

  // Create a user object with profile data
  const userData = {
    id: user.id,
    email: user.email,
    profile: {
      full_name: profile?.full_name || null,
      avatar_url: profile?.avatar_url || null
    }
  }

  return (
    <div className="flex min-h-screen relative">
      {/* Fixed Header - Separate from sidebar */}
      <header className="fixed top-0 left-0 right-0 h-16 border-b border-border/50 px-4 lg:px-6 flex items-center justify-between bg-background z-30">
        <div className="flex items-center">
          <Link 
            href="/dashboard" 
            className="group flex items-center gap-2 transition-all hover:opacity-90 ml-8 lg:ml-0"
          >
            <MyBlocksLogo width={32} height={32} variant="filled" />
            <span className="text-xl font-bold">MyBlocks</span>
          </Link>
        </div>
        <div className="ml-auto">
          <UserAccountNav user={userData} />
        </div>
      </header>

      {/* Client component for sidebar functionality */}
      <SidebarClient />

      {/* Main Content - starts below the header */}
      <div className="flex-1 flex flex-col lg:ml-64 transition-all duration-400 main-content mt-16">
        <main className="flex-1 overflow-auto p-4 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  )
}