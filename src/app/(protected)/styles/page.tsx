import { DashboardHeader } from '@/app/(protected)/_components/dashboard-header'
import { Button } from '@/components/ui/button'
import { PlusCircle } from 'lucide-react'

export default function StylesPage() {
  return (
    <>
      <DashboardHeader 
        heading="Styles" 
        text="Manage your design system and style tokens"
      >
        <Button className="flex items-center gap-1">
          <PlusCircle className="h-4 w-4" />
          <span>Add Style</span>
        </Button>
      </DashboardHeader>
      
      <div className="mt-8">
        <div className="rounded-xl border bg-card shadow-sm p-8 text-center">
          <h3 className="text-lg font-semibold mb-2">No styles defined</h3>
          <p className="text-muted-foreground mb-6">
            Add color palettes, typography, spacing, and other design tokens to your library
          </p>
          <Button className="flex items-center gap-1">
            <PlusCircle className="h-4 w-4" />
            <span>Add First Style</span>
          </Button>
        </div>
      </div>
    </>
  )
}