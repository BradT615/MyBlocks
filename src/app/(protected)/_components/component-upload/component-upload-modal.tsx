"use client"

import { useRouter } from 'next/navigation'
import { AlertCircle, Upload, CheckCircle, Code, Info, Palette, Loader2, HelpCircle } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger 
} from "@/components/ui/accordion"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { useComponentForm } from './use-component-form'
import { BasicFormSections } from './form-sections'
import { UtilitiesSelector } from './utilities-selector'
import { ImageUpload } from './image-upload'
import { TagSelector } from './tag-selector'
import { TabbedFileList } from './tabbed-file-list'
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

interface ComponentUploadModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  initialFiles?: File[] // Optional files that might be dropped onto the upload zone
}

export function ComponentUploadModal({ 
  open, 
  onOpenChange,
  initialFiles
}: ComponentUploadModalProps) {
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
    success,
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
    resetForm,
    tags,
    setTags,
    setActiveTab,
    activeTab
  } = useComponentForm(onOpenChange, router, initialFiles)

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
          <DialogTitle className="flex items-center gap-2">
            <Code className="h-5 w-5 text-primary" />
            Add New Component
          </DialogTitle>
          <DialogDescription>
            Create and upload a new UI component to your library
          </DialogDescription>
        </DialogHeader>
        
        <Tabs 
          defaultValue="basic" 
          className="mt-4"
          value={activeTab}
          onValueChange={setActiveTab}
        >
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="basic" disabled={isSubmitting}>
              Basic Info
            </TabsTrigger>
            <TabsTrigger 
              value="code" 
              disabled={!componentName || isSubmitting}
              className={!componentName ? "cursor-not-allowed" : ""}
            >
              Component Code
            </TabsTrigger>
            <TabsTrigger 
              value="preview" 
              disabled={!formValid || isSubmitting}
              className={!formValid ? "cursor-not-allowed" : ""}
            >
              Preview & Finish
            </TabsTrigger>
          </TabsList>
          
          <form action={handleSubmit}>
            <TabsContent value="basic" className="space-y-6">
              <div className="space-y-4">
                {/* Basic form fields (name & description) */}
                <BasicFormSections 
                  componentName={componentName}
                  description={description}
                  onNameChange={handleComponentNameChange}
                  onDescriptionChange={handleDescriptionChange}
                />
                
                {/* Tags input using the new selector */}
                <TagSelector
                  selectedTags={tags}
                  onTagsChange={setTags}
                />
                
                <div className="flex justify-between pt-4">
                  <div className="flex items-center space-x-2">
                    <Switch 
                      id="isPublic" 
                      name="isPublic"
                      checked={isPublic}
                      onCheckedChange={setIsPublic}
                    />
                    <Label htmlFor="isPublic" className="cursor-pointer">Make this component public</Label>
                  </div>
                  
                  <Button 
                    type="button" 
                    onClick={() => setActiveTab("code")}
                    disabled={!componentName}
                  >
                    Continue
                  </Button>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="code" className="space-y-6">
              <div className="space-y-4">
                {/* New tabbed file list */}
                <TabbedFileList 
                  files={files}
                  onAddFile={addNewFile}
                  onRemoveFile={removeFile}
                  onFileNameChange={handleFileNameChange}
                  onFileLanguageChange={handleFileLanguageChange}
                  onFileCodeChange={handleFileCodeChange}
                />
                
                {/* Utilities Section with Explanation */}
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="utilities" className="border rounded-lg">
                    <AccordionTrigger className="px-4 py-3 hover:no-underline hover:bg-muted/30">
                      <div className="flex items-center gap-2">
                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10">
                          <Palette className="h-3.5 w-3.5 text-primary" />
                        </div>
                        <span className="font-medium">Utility Libraries</span>
                        
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <div>
                                <HelpCircle className="h-4 w-4 text-muted-foreground ml-2" />
                              </div>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="max-w-xs text-xs">
                                Select frameworks or libraries used by this component. 
                                This helps with compatibility and discoverability.
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-4 pb-4">
                      <div className="mb-3 text-sm text-muted-foreground">
                        <p>Selecting utility libraries helps other users understand compatibility requirements and makes your component more discoverable in search.</p>
                      </div>
                      <UtilitiesSelector
                        selectedUtilities={selectedUtilities}
                        onToggleUtility={toggleUtility}
                      />
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
                
                <div className="rounded-lg bg-muted/50 border border-muted p-4">
                  <div className="flex items-start gap-3">
                    <Info className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                    <div className="text-sm text-muted-foreground">
                      <p className="mb-1">Upload your component code here. You can add multiple files if needed.</p>
                      <p>For React components, make sure to include all necessary imports and exports.</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-between pt-4">
                  <Button 
                    type="button" 
                    variant="outline"
                    onClick={() => setActiveTab("basic")}
                  >
                    Back
                  </Button>
                  
                  <Button 
                    type="button" 
                    onClick={() => setActiveTab("preview")}
                    disabled={!formValid}
                  >
                    Continue
                  </Button>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="preview" className="space-y-6">
              <div className="space-y-4">
                {/* Component preview card */}
                <div className="border rounded-lg overflow-hidden">
                  <div className="bg-muted/40 p-4 border-b flex items-center justify-between">
                    <div className="font-medium flex items-center gap-2">
                      <Palette className="h-4 w-4 text-primary" />
                      Component Preview
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="h-8 text-xs px-2">
                        Light
                      </Button>
                      <Button size="sm" variant="outline" className="h-8 text-xs px-2">
                        Dark
                      </Button>
                    </div>
                  </div>
                  <div className="p-8 flex items-center justify-center min-h-[200px] bg-background/50">
                    <div className="text-center text-muted-foreground">
                      <p>Preview feature coming soon!</p>
                      <p className="text-sm">You&apos;ll be able to see how your component renders here.</p>
                    </div>
                  </div>
                </div>
                
                {/* Image upload section */}
                <div className="border rounded-lg overflow-hidden">
                  <div className="bg-muted/40 p-4 border-b">
                    <h3 className="font-medium flex items-center gap-2">
                      <Upload className="h-4 w-4 text-primary" />
                      Preview Image (Optional)
                    </h3>
                  </div>
                  <div className="p-4">
                    <ImageUpload
                      selectedFile={selectedFile}
                      fileInputRef={fileInputRef as React.RefObject<HTMLInputElement>}
                      dragActive={dragActive}
                      onFileChange={handleFileChange}
                      onDrag={handleDrag}
                      onDrop={handleDrop}
                    />
                  </div>
                </div>
                
                {/* Summary section */}
                <div className="border rounded-lg overflow-hidden">
                  <div className="bg-muted/40 p-4 border-b">
                    <h3 className="font-medium">Component Summary</h3>
                  </div>
                  <div className="p-4 space-y-3">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h4 className="text-sm font-medium mb-1">Name</h4>
                        <p className="text-sm text-muted-foreground">{componentName}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium mb-1">Visibility</h4>
                        <div className="flex items-center gap-2">
                          <Switch 
                            id="isPublic" 
                            name="isPublic"
                            checked={isPublic}
                            onCheckedChange={setIsPublic}
                          />
                          <Label htmlFor="isPublic" className="cursor-pointer text-sm">
                            {isPublic ? "Public component" : "Private component"}
                          </Label>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium mb-1">Files</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        {files.map(file => (
                          <li key={file.id} className="flex items-center gap-1">
                            <Code className="h-3.5 w-3.5" />
                            {file.filename}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    {tags.length > 0 && (
                      <div>
                        <h4 className="text-sm font-medium mb-1">Tags</h4>
                        <div className="flex flex-wrap gap-1">
                          {tags.map(tag => (
                            <span 
                              key={tag} 
                              className="bg-muted/60 text-xs px-2 py-0.5 rounded-md"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {selectedUtilities.length > 0 && (
                      <div>
                        <h4 className="text-sm font-medium mb-1">Utility Libraries</h4>
                        <div className="flex flex-wrap gap-1">
                          {selectedUtilities.map(util => (
                            <span 
                              key={util} 
                              className="bg-primary/10 text-xs px-2 py-0.5 rounded-md"
                            >
                              {util}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Success message */}
                {success && (
                  <div className="rounded-lg bg-green-500/5 border border-green-500/20 p-3 text-sm text-green-500">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 flex-shrink-0" />
                      <span>Component successfully created! Redirecting...</span>
                    </div>
                  </div>
                )}
                
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
                
                <div className="flex justify-between pt-4">
                  <Button 
                    type="button" 
                    variant="outline"
                    onClick={() => setActiveTab("code")}
                    disabled={isLoading || isSubmitting}
                  >
                    Back
                  </Button>
                  
                  <Button 
                    type="submit" 
                    disabled={isLoading || isSubmitting || !formValid}
                    className={cn(
                      "bg-primary hover:bg-primary/90",
                      (!formValid || isLoading) ? "opacity-50 cursor-not-allowed" : ""
                    )}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Saving...
                      </span>
                    ) : isLoading ? (
                      "Processing..."
                    ) : (
                      "Save Component"
                    )}
                  </Button>
                </div>
              </div>
            </TabsContent>
          </form>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}