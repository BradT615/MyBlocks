"use client"

import { useRouter } from 'next/navigation'
import { AlertCircle, CheckCircle, Code, Info, Palette, Loader2, HelpCircle } from 'lucide-react'
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
import { TagSelector } from './tag-selector'
import { TabbedFileList } from './tabbed-file-list'
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "motion/react"

// Shared animation properties for consistent feel across components
const SPRING_TRANSITION = {
  type: "spring",
  stiffness: 500,
  damping: 30,
  mass: 0.5
}

interface ComponentUploadModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  initialFiles?: File[]
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
    formValid,
    isLoading,
    isSubmitting,
    error,
    success,
    setIsPublic,
    handleComponentNameChange,
    handleDescriptionChange,
    handleFileCodeChange,
    handleFileLanguageChange,
    handleFileNameChange,
    addNewFile,
    removeFile,
    toggleUtility,
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
      <DialogContent className="sm:max-w-3xl p-0 max-h-[90vh] overflow-hidden">
        {/* Inner scrollable container with padding to prevent scrollbar from overlapping rounded corners */}
        <div className="overflow-y-auto max-h-[90vh] p-6 pr-[calc(1.5rem-8px)]" style={{ scrollbarGutter: 'stable' }}>
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={SPRING_TRANSITION}
        >
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Code className="h-5 w-5 text-primary" />
              Add New Component
            </DialogTitle>
            <DialogDescription>
              Create and upload a new UI component to your library
            </DialogDescription>
          </DialogHeader>
        </motion.div>
        
        <Tabs 
          defaultValue="basic" 
          className="mt-4"
          value={activeTab}
          onValueChange={setActiveTab}
        >
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
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
          </motion.div>
          
          <form action={handleSubmit}>
            {/* Create a fixed height container to prevent layout shift */}
            <div className="relative min-h-[600px]">
              <AnimatePresence mode="wait" initial={false}>
                {activeTab === "basic" && (
                  <motion.div
                    key="basic-tab"
                    className="absolute inset-0"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <TabsContent value="basic" className="space-y-6 mt-0 h-full">
                      <div className="flex flex-col h-full justify-between">
                        <div className="space-y-4">
                          {/* Basic form fields (name & description) */}
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{...SPRING_TRANSITION, delay: 0.1}}
                          >
                            <BasicFormSections 
                              componentName={componentName}
                              description={description}
                              onNameChange={handleComponentNameChange}
                              onDescriptionChange={handleDescriptionChange}
                            />
                          </motion.div>
                          
                          {/* Tags input using the new selector */}
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{...SPRING_TRANSITION, delay: 0.2}}
                          >
                            <TagSelector
                              selectedTags={tags}
                              onTagsChange={setTags}
                            />
                          </motion.div>
                        </div>
                        
                        <motion.div 
                          className="flex justify-between pt-8 mt-auto pb-3"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.3 }}
                        >
                          <div className="flex items-center space-x-2">
                            <Switch 
                              id="isPublic" 
                              name="isPublic"
                              checked={isPublic}
                              onCheckedChange={setIsPublic}
                            />
                            <Label htmlFor="isPublic" className="cursor-pointer">Make this component public</Label>
                          </div>
                          
                          <motion.div
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <Button 
                              type="button" 
                              onClick={() => setActiveTab("code")}
                              disabled={!componentName}
                            >
                              Continue
                            </Button>
                          </motion.div>
                        </motion.div>
                      </div>
                    </TabsContent>
                  </motion.div>
                )}
                
                {activeTab === "code" && (
                  <motion.div
                    key="code-tab"
                    className="absolute inset-0"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, }}
                    transition={{ duration: 0.2 }}
                  >
                    <TabsContent value="code" className="space-y-6 mt-0 h-full">
                      <div className="flex flex-col h-full justify-between">
                        <div className="space-y-4">
                          {/* New tabbed file list */}
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{...SPRING_TRANSITION, delay: 0.1}}
                          >
                            <TabbedFileList 
                              files={files}
                              onAddFile={addNewFile}
                              onRemoveFile={removeFile}
                              onFileNameChange={handleFileNameChange}
                              onFileLanguageChange={handleFileLanguageChange}
                              onFileCodeChange={handleFileCodeChange}
                            />
                          </motion.div>
                          
                          {/* Utilities Section with Explanation */}
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{...SPRING_TRANSITION, delay: 0.2}}
                          >
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
                          </motion.div>
                          
                          <motion.div 
                            className="rounded-lg bg-muted/50 border border-muted p-4"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{...SPRING_TRANSITION, delay: 0.3}}
                          >
                            <div className="flex items-start gap-3">
                              <Info className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                              <div className="text-sm text-muted-foreground">
                                <p className="mb-1">Upload your component code here. You can add multiple files if needed.</p>
                                <p>For React components, make sure to include all necessary imports and exports.</p>
                              </div>
                            </div>
                          </motion.div>
                        </div>
                        
                        <motion.div 
                          className="flex justify-between pt-8 mt-auto pb-3"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.4 }}
                        >
                          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                            <Button 
                              type="button" 
                              variant="outline"
                              onClick={() => setActiveTab("basic")}
                            >
                              Back
                            </Button>
                          </motion.div>
                          
                          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                            <Button 
                              type="button" 
                              onClick={() => setActiveTab("preview")}
                              disabled={!formValid}
                            >
                              Continue
                            </Button>
                          </motion.div>
                        </motion.div>
                      </div>
                    </TabsContent>
                  </motion.div>
                )}
                
                {activeTab === "preview" && (
                  <motion.div
                    key="preview-tab"
                    className="absolute inset-0"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <TabsContent value="preview" className="space-y-6 mt-0 h-full">
                      <div className="flex flex-col h-full justify-between">
                        <div className="space-y-4">
                          {/* Component preview card */}
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{...SPRING_TRANSITION, delay: 0.1}}
                            className="border rounded-lg overflow-hidden"
                          >
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
                          </motion.div>
                          
                          {/* Summary section */}
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{...SPRING_TRANSITION, delay: 0.3}}
                            className="border rounded-lg overflow-hidden"
                          >
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
                                <ul className="text-sm text-muted-foreground space-y-1 mb-4">
                                  {files.map((file, index) => (
                                    <motion.li 
                                      key={file.id} 
                                      className="flex items-center gap-1"
                                      initial={{ opacity: 0, x: -5 }}
                                      animate={{ opacity: 1, x: 0 }}
                                      transition={{ delay: 0.1 + index * 0.05 }}
                                    >
                                      <Code className="h-3.5 w-3.5" />
                                      {file.filename}
                                    </motion.li>
                                  ))}
                                </ul>
                              </div>
                              
                              {tags.length > 0 && (
                                <div>
                                  <h4 className="text-sm font-medium mb-1">Tags</h4>
                                  <div className="flex flex-wrap gap-1">
                                    {tags.map((tag, index) => (
                                      <motion.span 
                                        key={tag} 
                                        className="bg-muted/60 text-xs px-2 py-0.5 rounded-md"
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: 0.1 + index * 0.03 }}
                                      >
                                        {tag}
                                      </motion.span>
                                    ))}
                                  </div>
                                </div>
                              )}
                              
                              {selectedUtilities.length > 0 && (
                                <div>
                                  <h4 className="text-sm font-medium mb-1">Utility Libraries</h4>
                                  <div className="flex flex-wrap gap-1">
                                    {selectedUtilities.map((util, index) => (
                                      <motion.span 
                                        key={util} 
                                        className="bg-primary/10 text-xs px-2 py-0.5 rounded-md"
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: 0.2 + index * 0.03 }}
                                      >
                                        {util}
                                      </motion.span>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          </motion.div>
                          
                          {/* Status messages section with fixed height to prevent layout shift */}
                          <div className="h-16 relative">
                            {/* Success message */}
                            <AnimatePresence>
                              {success && (
                                <motion.div
                                  key="success-message"
                                  className="absolute inset-0 rounded-lg bg-green-500/5 border border-green-500/20 p-3 text-sm text-green-500"
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  exit={{ opacity: 0 }}
                                  transition={{ duration: 0.2 }}
                                >
                                  <div className="flex items-center gap-2">
                                    <CheckCircle className="h-4 w-4 flex-shrink-0" />
                                    <span>Component successfully created! Redirecting...</span>
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                            
                            {/* Error message */}
                            <AnimatePresence>
                              {error && (
                                <motion.div
                                  key="error-message"
                                  className="absolute inset-0 rounded-lg bg-red-500/5 border border-red-500/20 p-3 text-sm text-red-500"
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  exit={{ opacity: 0 }}
                                  transition={{ duration: 0.2 }}
                                >
                                  <div className="flex items-center gap-2">
                                    <AlertCircle className="h-4 w-4 flex-shrink-0" />
                                    <span>{error}</span>
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>

                            {/* Form validation message */}
                            <AnimatePresence>
                              {!formValid && (
                                <motion.div
                                  key="validation-message"
                                  className="absolute inset-0 rounded-lg bg-amber-500/5 border border-amber-500/20 p-3 text-sm text-amber-500"
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  exit={{ opacity: 0 }}
                                  transition={{ duration: 0.2 }}
                                >
                                  <div className="flex items-center gap-2">
                                    <AlertCircle className="h-4 w-4 flex-shrink-0" />
                                    <span>Please fill in all required fields marked with *</span>
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        </div>
                        
                        <motion.div 
                          className="flex justify-between pt-8 mt-auto pb-3"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.4 }}
                        >
                          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                            <Button 
                              type="button" 
                              variant="outline"
                              onClick={() => setActiveTab("code")}
                              disabled={isLoading || isSubmitting}
                            >
                              Back
                            </Button>
                          </motion.div>
                          
                          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
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
                          </motion.div>
                        </motion.div>
                      </div>
                    </TabsContent>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </form>
        </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  )
}