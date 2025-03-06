// src/components/component-upload-modal.tsx
"use client"

import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image" // Import Next.js Image component
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Checkbox } from "@/components/ui/checkbox"
import { 
  AlertCircle, 
  Upload, 
  X, 
  Plus, 
  FileCode,
  Trash2
} from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { createComponent } from "@/app/(protected)/components/actions"
import { cn } from "@/lib/utils"

interface ComponentUploadModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

interface ComponentFile {
  id: string
  language: string
  code: string
  filename: string
}

// Available languages for the dropdown
const LANGUAGES = [
  { value: "tsx", label: "TypeScript JSX (TSX)" },
  { value: "jsx", label: "JavaScript JSX (JSX)" },
  { value: "js", label: "JavaScript" },
  { value: "ts", label: "TypeScript" },
  { value: "html", label: "HTML" },
  { value: "css", label: "CSS" },
  { value: "scss", label: "SCSS" },
  { value: "less", label: "LESS" }
]

// Utility libraries
const UTILITY_LIBRARIES = [
  { id: "tailwind", label: "Tailwind CSS" },
  { id: "bootstrap", label: "Bootstrap" },
  { id: "materialui", label: "Material UI" },
  { id: "chakraui", label: "Chakra UI" },
  { id: "shadcn", label: "Shadcn UI" }
]

export function ComponentUploadModal({ open, onOpenChange }: ComponentUploadModalProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isPublic, setIsPublic] = useState(false)
  const [formValid, setFormValid] = useState(false)
  const [componentName, setComponentName] = useState("")
  const [description, setDescription] = useState("")
  const [selectedUtilities, setSelectedUtilities] = useState<string[]>([])
  
  // Multiple files support
  const [files, setFiles] = useState<ComponentFile[]>([
    { id: crypto.randomUUID(), language: "tsx", code: "", filename: "Component.tsx" }
  ])
  
  // File upload state
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [dragActive, setDragActive] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  // Validate form whenever relevant inputs change
  // Fix for the useEffect dependency warning
  useEffect(() => {
    // Create a function to validate the form inside the effect
    const checkFormValidity = () => {
      const nameValid = componentName.trim().length > 0
      const filesValid = files.every(file => file.code.trim().length > 0 && file.filename.trim().length > 0)
      
      setFormValid(nameValid && filesValid && files.length > 0)
    }
    
    // Call it immediately
    checkFormValidity()
  }, [componentName, files]) // These are all the dependencies used inside the effect

  const validateForm = () => {
    const nameValid = componentName.trim().length > 0
    const filesValid = files.every(file => file.code.trim().length > 0 && file.filename.trim().length > 0)
    
    setFormValid(nameValid && filesValid && files.length > 0)
  }

  const handleComponentNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComponentName(e.target.value)
    validateForm() // Call validateForm after state update
  }
  
  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value)
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setSelectedFile(e.dataTransfer.files[0])
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0])
    }
  }
  
  // Handle changes to file code
  const handleFileCodeChange = (id: string, code: string) => {
    setFiles(prevFiles => 
      prevFiles.map(file => 
        file.id === id ? { ...file, code } : file
      )
    )
    validateForm() // Call validateForm after state update
  }
  
  // Handle changes to file language
  const handleFileLanguageChange = (id: string, language: string) => {
    setFiles(prevFiles => 
      prevFiles.map(file => {
        if (file.id === id) {
          // Update filename extension based on language
          const nameWithoutExt = file.filename.split('.')[0]
          const newFilename = `${nameWithoutExt}.${language}`
          return { ...file, language, filename: newFilename }
        }
        return file
      })
    )
    validateForm() // Call validateForm after state update
  }
  
  // Handle changes to file name
  const handleFileNameChange = (id: string, filename: string) => {
    setFiles(prevFiles => 
      prevFiles.map(file => 
        file.id === id ? { ...file, filename } : file
      )
    )
    validateForm() // Call validateForm after state update
  }
  
  // Add a new file
  const addNewFile = () => {
    const newId = crypto.randomUUID()
    setFiles(prevFiles => [
      ...prevFiles,
      { id: newId, language: "js", code: "", filename: `Component.js` }
    ])
  }
  
  // Remove a file
  const removeFile = (id: string) => {
    setFiles(prevFiles => {
      // Don't remove the last file
      if (prevFiles.length <= 1) {
        return prevFiles
      }
      return prevFiles.filter(file => file.id !== id)
    })
    validateForm() // Call validateForm after state update
  }
  
  // Toggle utility library selection
  const toggleUtility = (utilityId: string) => {
    setSelectedUtilities(prevSelected => {
      if (prevSelected.includes(utilityId)) {
        return prevSelected.filter(id => id !== utilityId)
      } else {
        return [...prevSelected, utilityId]
      }
    })
  }
  
  async function handleSubmit(formData: FormData) {
    if (isSubmitting) return // Prevent double submission
    
    setIsLoading(true)
    setIsSubmitting(true)
    setError(null)
    
    try {
      // Manually construct FormData with our complex data structure
      // Add basic component info
      formData.set('name', componentName)
      formData.set('description', description)
      formData.set('isPublic', isPublic ? 'true' : 'false')
      
      // Add primary language (we'll use the first file's language as primary)
      formData.set('language', files[0].language)
      
      // Add utilities as a JSON string
      formData.set('utilities', JSON.stringify(selectedUtilities))
      
      // Add files as a JSON string
      formData.set('files', JSON.stringify(files))
      
      // Add preview image if selected
      if (selectedFile) {
        formData.set('previewImage', selectedFile)
      }
      
      const result = await createComponent(formData)
      
      if (result?.error) {
        setError(result.error)
        setIsSubmitting(false)
      } else if (result?.success) {
        onOpenChange(false)
        router.push(`/components/${result.id}`)
        router.refresh()
      }
    } catch (error) {
      setError('An unexpected error occurred')
      console.error(error)
      setIsSubmitting(false)
    } finally {
      setIsLoading(false)
    }
  }
  
  const resetForm = () => {
    setComponentName("")
    setDescription("")
    setError(null)
    setIsPublic(false)
    setSelectedFile(null)
    setDragActive(false)
    setFormValid(false)
    setIsSubmitting(false)
    setSelectedUtilities([])
    setFiles([
      { id: crypto.randomUUID(), language: "tsx", code: "", filename: "Component.tsx" }
    ])
    
    // Clear file input
    if (fileInputRef.current) fileInputRef.current.value = ""
  }

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
          <div className="grid grid-cols-1 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name">Component Name <span className="text-red-500">*</span></Label>
              <Input 
                id="name" 
                name="name" 
                value={componentName}
                onChange={handleComponentNameChange}
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
                onChange={handleDescriptionChange}
                placeholder="Describe what this component does and when to use it"
                className="min-h-20"
              />
            </div>
          </div>
          
          {/* Utility libraries section */}
          <div className="space-y-3">
            <Label>Utility Libraries</Label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {UTILITY_LIBRARIES.map(library => (
                <div key={library.id} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`utility-${library.id}`}
                    checked={selectedUtilities.includes(library.id)}
                    onCheckedChange={() => toggleUtility(library.id)}
                  />
                  <Label 
                    htmlFor={`utility-${library.id}`}
                    className="text-sm cursor-pointer"
                  >
                    {library.label}
                  </Label>
                </div>
              ))}
            </div>
          </div>
          
          {/* Code files section */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <Label>Component Files <span className="text-red-500">*</span></Label>
              <Button 
                type="button" 
                variant="outline" 
                size="sm" 
                onClick={addNewFile}
                className="flex items-center gap-1"
              >
                <Plus className="h-3.5 w-3.5" />
                <span>Add File</span>
              </Button>
            </div>
            
            <div className="space-y-6">
              {files.map((file) => (
                <div 
                  key={file.id} 
                  className="border border-border/50 rounded-lg p-4 relative"
                >
                  <div className="absolute top-3 right-3 flex items-center gap-2">
                    {files.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeFile(file.id)}
                        title="Remove file"
                        className="h-7 w-7 text-muted-foreground hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="space-y-2">
                      <Label htmlFor={`filename-${file.id}`}>Filename <span className="text-red-500">*</span></Label>
                      <div className="flex items-center gap-2">
                        <FileCode className="h-4 w-4 text-muted-foreground" />
                        <Input 
                          id={`filename-${file.id}`}
                          value={file.filename}
                          onChange={(e) => handleFileNameChange(file.id, e.target.value)}
                          placeholder="Component.tsx"
                          className="flex-1"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor={`language-${file.id}`}>Language</Label>
                      <Select
                        value={file.language}
                        onValueChange={(value) => handleFileLanguageChange(file.id, value)}
                      >
                        <SelectTrigger id={`language-${file.id}`} className="w-full">
                          <SelectValue placeholder="Select a language" />
                        </SelectTrigger>
                        <SelectContent>
                          {LANGUAGES.map(lang => (
                            <SelectItem key={lang.value} value={lang.value}>
                              {lang.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor={`code-${file.id}`}>Code <span className="text-red-500">*</span></Label>
                    <Textarea 
                      id={`code-${file.id}`}
                      value={file.code}
                      onChange={(e) => handleFileCodeChange(file.id, e.target.value)}
                      placeholder="Paste your code here"
                      className={cn(
                        "min-h-32 font-mono text-sm",
                        file.language === "tsx" || file.language === "jsx" ? "text-blue-500 dark:text-blue-400" : "",
                        file.language === "css" || file.language === "scss" || file.language === "less" ? "text-pink-500 dark:text-pink-400" : ""
                      )}
                      required
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="tags">Tags (comma separated)</Label>
            <Input 
              id="tags" 
              name="tags" 
              placeholder="button, ui, form, input, etc." 
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="previewImage">Preview Image (optional)</Label>
            <div 
              className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors cursor-pointer
                ${dragActive ? "border-primary bg-primary/5" : "border-border/70 hover:bg-muted/30"}
                ${selectedFile ? "bg-primary/5 border-primary/50" : ""}`}
              onClick={() => fileInputRef.current?.click()}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              {selectedFile ? (
                <div className="flex flex-col items-center">
                  <div className="relative w-20 h-20 mb-2">
                    {/* Replace img with Next.js Image component */}
                    <Image 
                      src={URL.createObjectURL(selectedFile)}
                      alt="Preview"
                      fill
                      className="object-contain"
                    />
                    <button
                      type="button"
                      className="absolute -top-2 -right-2 rounded-full bg-muted p-1 text-gray-500 hover:bg-primary/20"
                      onClick={(e) => {
                        e.stopPropagation()
                        setSelectedFile(null)
                        if (fileInputRef.current) {
                          fileInputRef.current.value = ''
                        }
                      }}
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                  <p className="text-sm text-primary-foreground/90">{selectedFile.name}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {(selectedFile.size / 1024).toFixed(1)} KB
                  </p>
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-center">
                    <Upload className="h-6 w-6 text-muted-foreground/80" />
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Drag and drop an image, or click to browse
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    PNG, JPG or WebP up to 2MB
                  </p>
                </>
              )}
              <Input 
                ref={fileInputRef}
                id="previewImage" 
                name="previewImage" 
                type="file" 
                className="hidden" 
                accept="image/*"
                onChange={handleFileChange}
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Switch 
              id="isPublic" 
              name="isPublic"
              checked={isPublic}
              onCheckedChange={setIsPublic}
            />
            <Label htmlFor="isPublic" className="cursor-pointer">Make this component public</Label>
          </div>
          
          {error && (
            <div className="rounded-lg bg-red-500/5 border border-red-500/20 p-3 text-sm text-red-500">
              <div className="flex items-center gap-2">
                <AlertCircle className="h-4 w-4 flex-shrink-0" />
                <span>{error}</span>
              </div>
            </div>
          )}

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