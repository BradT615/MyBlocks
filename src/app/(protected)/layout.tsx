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

  return (
    <div className="flex min-h-screen relative">
      {/* Client component for all sidebar functionality */}
      <SidebarClient />

      {/* Main Content with Fixed Header */}
      <div className="flex-1 flex flex-col lg:ml-64 transition-all duration-300">
        <header className="fixed top-0 right-0 left-0 lg:left-64 h-16 border-b border-border/50 px-4 lg:px-6 flex items-center justify-between bg-background/80 backdrop-blur-sm z-30">
          <div className="lg:hidden flex items-center">
            {/* The toggle button is now inserted by SidebarClient */}
            <Link 
              href="/dashboard" 
              className="ml-8 flex items-center gap-2"
            >
              <MyBlocksLogo width={24} height={24} variant="filled" />
              <span className="font-bold">MyBlocks</span>
            </Link>
          </div>
          <div className="ml-auto">
            <UserAccountNav user={user} />
          </div>
        </header>
        <main className="flex-1 overflow-auto p-4 lg:p-6 mt-16">
          {children}
        </main>
      </div>
    </div>
  )
}