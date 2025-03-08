// src/app/(protected)/_components/component-upload/component-upload-modal.tsx
"use client"

import { useRouter } from 'next/navigation'
import { AlertCircle } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label" // Add this import
import { Switch } from "@/components/ui/switch" // Add this import

import { useComponentForm } from './use-component-form'
import { BasicFormSections } from './form-sections'
import { UtilitiesSelector } from './utilities-selector'
import { FileList } from './file-list'
import { ImageUpload } from './image-upload'

interface ComponentUploadModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ComponentUploadModal({ open, onOpenChange }: ComponentUploadModalProps) {
  const router = useRouter()
  const {
    componentName,
    description,
    isPublic,
    files,
    selectedUtilities,
    selectedFile,
    fileInputRef,
    formValid,
    isLoading,
    isSubmitting,
    error,
    dragActive,
    setIsPublic,
    handleComponentNameChange,
    handleDescriptionChange,
    handleFileCodeChange,
    handleFileLanguageChange,
    handleFileNameChange,
    addNewFile,
    removeFile,
    toggleUtility,
    handleFileChange,
    handleDrag,
    handleDrop,
    handleSubmit,
    resetForm
  } = useComponentForm(onOpenChange, router)

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      resetForm()
    }
    onOpenChange(open)
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Component</DialogTitle>
          <DialogDescription>
            Create and upload a new UI component to your library
          </DialogDescription>
        </DialogHeader>
        
        <form action={handleSubmit} className="space-y-6 mt-4">
          {/* Basic form fields (name & description) */}
          <BasicFormSections 
            componentName={componentName}
            description={description}
            onNameChange={handleComponentNameChange}
            onDescriptionChange={handleDescriptionChange}
          />
          
          {/* Utility libraries section */}
          <UtilitiesSelector
            selectedUtilities={selectedUtilities}
            onToggleUtility={toggleUtility}
          />
          
          {/* File list section */}
          <FileList 
            files={files}
            onAddFile={addNewFile}
            onRemoveFile={removeFile}
            onFileNameChange={handleFileNameChange}
            onFileLanguageChange={handleFileLanguageChange}
            onFileCodeChange={handleFileCodeChange}
          />
          
          {/* Image upload section */}
          <ImageUpload
            selectedFile={selectedFile}
            fileInputRef={fileInputRef as React.RefObject<HTMLInputElement>}
            dragActive={dragActive}
            onFileChange={handleFileChange}
            onDrag={handleDrag}
            onDrop={handleDrop}
          />
          
          {/* Public switch */}
          <div className="flex items-center space-x-2">
            <Switch 
              id="isPublic" 
              name="isPublic"
              checked={isPublic}
              onCheckedChange={setIsPublic}
            />
            <Label htmlFor="isPublic" className="cursor-pointer">Make this component public</Label>
          </div>
          
          {/* Error message */}
          {error && (
            <div className="rounded-lg bg-red-500/5 border border-red-500/20 p-3 text-sm text-red-500">
              <div className="flex items-center gap-2">
                <AlertCircle className="h-4 w-4 flex-shrink-0" />
                <span>{error}</span>
              </div>
            </div>
          )}

          {/* Form validation message */}
          {!formValid && (
            <div className="rounded-lg bg-amber-500/5 border border-amber-500/20 p-3 text-sm text-amber-500">
              <div className="flex items-center gap-2">
                <AlertCircle className="h-4 w-4 flex-shrink-0" />
                <span>Please fill in all required fields marked with *</span>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button 
              type="button" 
              variant="outline"
              onClick={() => handleOpenChange(false)}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={isLoading || isSubmitting || !formValid}
              className={`bg-primary hover:bg-primary/90 ${(!formValid || isLoading) ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {isLoading ? 'Saving...' : 'Save Component'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}