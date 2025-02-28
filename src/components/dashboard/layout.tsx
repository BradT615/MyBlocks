import React from 'react'
import { DashboardNav } from '@/components/dashboard/nav'
import { UserAccountNav } from '@/components/dashboard/user-account-nav'
import { MyBlocksLogo } from '@/components/MyBlocksLogo'
import Link from 'next/link'

interface DashboardLayoutProps {
  children: React.ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <Link 
            href="/dashboard" 
            className="group flex items-center gap-2 transition-all duration-300 hover:opacity-90"
          >
            <MyBlocksLogo width={32} height={32} variant="filled" />
            <span className="text-xl font-bold">MyBlocks</span>
          </Link>
          <UserAccountNav />
        </div>
      </header>
      <div className="container grid flex-1 gap-12 md:grid-cols-[200px_1fr]">
        <aside className="hidden w-[200px] flex-col md:flex">
          <DashboardNav />
        </aside>
        <main className="flex w-full flex-1 flex-col overflow-hidden">
          {children}
        </main>
      </div>
    </div>
  )
}