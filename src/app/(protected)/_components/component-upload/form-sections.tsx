// src/app/(protected)/_components/component-upload/form-sections.tsx
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface BasicFormSectionsProps {
  componentName: string
  description: string
  onNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onDescriptionChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
}

export function BasicFormSections({
  componentName,
  description,
  onNameChange,
  onDescriptionChange
}: BasicFormSectionsProps) {
  return (
    <div className="grid grid-cols-1 gap-6">
      <div className="space-y-2">
        <Label htmlFor="name">Component Name <span className="text-red-500">*</span></Label>
        <Input 
          id="name" 
          name="name" 
          value={componentName}
          onChange={onNameChange}
          placeholder="e.g., Button, Card, Navbar" 
          required 
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea 
          id="description" 
          name="description" 
          value={description}
          onChange={onDescriptionChange}
          placeholder="Describe what this component does and when to use it"
          className="min-h-20"
        />
      </div>
    </div>
  )
}