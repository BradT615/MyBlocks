// src/app/(protected)/components/page.tsx
"use client"

import { useState } from 'react'
import { DashboardHeader } from '@/app/(protected)/_components/dashboard-header'
import { Button } from '@/components/ui/button'
import { PlusCircle } from 'lucide-react'
import { ComponentUploadModal } from '@/app/(protected)/_components/component-upload'

export default function ComponentsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  
  return (
    <>
      <DashboardHeader 
        heading="Components" 
        text="Manage your UI components library"
      >
        <Button 
          className="flex items-center gap-1"
          onClick={() => setIsModalOpen(true)}
        >
          <PlusCircle className="h-4 w-4" />
          <span>Add Component</span>
        </Button>
      </DashboardHeader>
      
      <div className="mt-8">
        <div className="rounded-xl border bg-card shadow-sm p-8 text-center">
          <h3 className="text-lg font-semibold mb-2">No components yet</h3>
          <p className="text-muted-foreground mb-6">
            Create your first component to get started with your component library
          </p>
          <Button 
            className="flex items-center gap-1"
            onClick={() => setIsModalOpen(true)}
          >
            <PlusCircle className="h-4 w-4" />
            <span>Add First Component</span>
          </Button>
        </div>
      </div>
      
      <ComponentUploadModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
      />
    </>
  )
}