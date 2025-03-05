import { DashboardHeader } from '@/app/(protected)/_components/dashboard-header'
import { Button } from '@/components/ui/button'
import { PlusCircle } from 'lucide-react'

export default function CollectionsPage() {
  return (
    <>
      <DashboardHeader 
        heading="Collections" 
        text="Organize your components into collections"
      >
        <Button className="flex items-center gap-1">
          <PlusCircle className="h-4 w-4" />
          <span>New Collection</span>
        </Button>
      </DashboardHeader>
      
      <div className="mt-8">
        <div className="rounded-xl border bg-card shadow-sm p-8 text-center">
          <h3 className="text-lg font-semibold mb-2">No collections yet</h3>
          <p className="text-muted-foreground mb-6">
            Collections help you organize your components by project, category, or any other grouping
          </p>
          <Button className="flex items-center gap-1">
            <PlusCircle className="h-4 w-4" />
            <span>Create First Collection</span>
          </Button>
        </div>
      </div>
    </>
  )
}