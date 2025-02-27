import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import { DashboardLayout } from '@/components/dashboard/layout'
import { DashboardHeader } from '@/components/dashboard/header'

export default async function DashboardPage() {
  const supabase = await createClient()
  
  // Check if the user is logged in
  const { data: { user }, error } = await supabase.auth.getUser()
  
  if (error || !user) {
    // If not logged in, redirect to login page
    redirect('/login')
  }
  
  return (
    <DashboardLayout>
      <DashboardHeader heading="Dashboard" text="Welcome to your MyBlocks dashboard" />
      
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
          <div className="rounded-xl border bg-card p-6 shadow-sm">
            <div className="flex flex-row items-center justify-between space-y-0 pb-2">
              <h3 className="tracking-tight text-sm font-medium">Your Components</h3>
            </div>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground">
              You haven't created any components yet
            </p>
          </div>
          
          <div className="rounded-xl border bg-card p-6 shadow-sm">
            <div className="flex flex-row items-center justify-between space-y-0 pb-2">
              <h3 className="tracking-tight text-sm font-medium">Collections</h3>
            </div>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground">
              Start organizing your components into collections
            </p>
          </div>
          
          <div className="rounded-xl border bg-card p-6 shadow-sm">
            <div className="flex flex-row items-center justify-between space-y-0 pb-2">
              <h3 className="tracking-tight text-sm font-medium">Recent Activity</h3>
            </div>
            <div className="text-sm text-muted-foreground">
              No recent activity
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}