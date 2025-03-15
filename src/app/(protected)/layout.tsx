import React from 'react'
import { SidebarNav } from '@/app/(protected)/_components/sidebar-nav'
import { UserAccountNav } from '@/app/(protected)/_components/user-account-nav'
import { MyBlocksLogo } from '@/components/MyBlocksLogo'
import { SidebarToggle } from '@/app/(protected)/_components/sidebar-toggle'
import { MobileSidebarProvider } from '@/app/(protected)/_components/sidebar-context'
import Link from 'next/link'
import { cn } from '@/lib/utils'
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
      <div>
        <MobileSidebarProvider>
          {/* Sidebar Navigation */}
          <aside 
            className={cn(
              "fixed inset-y-0 left-0 w-64 border-r border-border/50 flex flex-col bg-background z-40",
              "transition-transform duration-300 ease-in-out",
              "lg:translate-x-0 mobile-sidebar" // Always visible on desktop, mobile controlled by CSS class
            )}
          >
            <div className="h-16 border-b border-border/50 px-4 flex items-center justify-between">
              <Link 
                href="/dashboard" 
                className="group flex items-center gap-2 transition-all hover:opacity-90"
              >
                <MyBlocksLogo width={32} height={32} variant="filled" />
                <span className="text-xl font-bold">MyBlocks</span>
              </Link>
              <div className="lg:hidden">
                <SidebarToggle />
              </div>
            </div>
            <div className="flex-1 py-2 overflow-y-auto">
              <SidebarNav />
            </div>
          </aside>
        </MobileSidebarProvider>
      </div>

      {/* Main Content with Fixed Header */}
      <div className="flex-1 flex flex-col lg:ml-64 transition-all duration-300">
        <header className="fixed top-0 right-0 left-0 lg:left-64 h-16 border-b border-border/50 px-4 lg:px-6 flex items-center justify-between bg-background/80 backdrop-blur-sm z-30">
          <div className="lg:hidden flex items-center">
            <SidebarToggle />
            <Link 
              href="/dashboard" 
              className="ml-2 flex items-center gap-2"
            >
              <MyBlocksLogo width={24} height={24} variant="filled" />
              <span className="font-bold">MyBlocks</span>
            </Link>
          </div>
          <div className="ml-auto">
            {/* Pass user data to UserAccountNav */}
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