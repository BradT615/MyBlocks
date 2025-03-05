import React from 'react'
import { SidebarNav } from '@/app/(protected)/_components/sidebar-nav'
import { UserAccountNav } from '@/app/(protected)/_components/user-account-nav'
import { MyBlocksLogo } from '@/components/MyBlocksLogo'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

interface ProtectedLayoutProps {
  children: React.ReactNode
}

export default async function ProtectedLayout({ children }: ProtectedLayoutProps) {
  const supabase = await createClient()
  
  // Check if the user is logged in
  const { data: { user }, error } = await supabase.auth.getUser()
  
  if (error || !user) {
    // If not logged in, redirect to login page
    redirect('/login')
  }

  return (
    <div className="flex min-h-screen">
      {/* Sidebar Navigation */}
      <aside className="w-64 border-r border-border/50 flex flex-col bg-background">
        <div className="h-16 border-b border-border/50 px-4 flex items-center">
          <Link 
            href="/dashboard" 
            className="group flex items-center gap-2 transition-all duration-300 hover:opacity-90"
          >
            <MyBlocksLogo width={32} height={32} variant="filled" />
            <span className="text-xl font-bold">MyBlocks</span>
          </Link>
        </div>
        <div className="flex-1 py-2">
          <SidebarNav />
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <header className="h-16 border-b border-border/50 px-6 flex items-center justify-end">
          <UserAccountNav />
        </header>
        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>
      </div>
    </div>
  )
}