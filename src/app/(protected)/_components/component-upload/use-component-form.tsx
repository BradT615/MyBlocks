"use client"

import { useState, useRef, useEffect } from "react"
import { createComponent } from "@/app/(protected)/components/actions"

interface ComponentFile {
  id: string
  language: string
  code: string
  filename: string
}

// Define a minimal interface for what we need from router
interface RouterInterface {
  push: (path: string) => void;
  refresh: () => void;
}

export function useComponentForm(
  onOpenChange: (open: boolean) => void, 
  router: RouterInterface,
  initialFiles?: File[]
) {
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [isPublic, setIsPublic] = useState(false)
  const [formValid, setFormValid] = useState(false)
  const [componentName, setComponentName] = useState("")
  const [description, setDescription] = useState("")
  const [selectedUtilities, setSelectedUtilities] = useState<string[]>([])
  const [activeTab, setActiveTab] = useState("basic")
  
  // Tags handling - simplified for the dropdown selector
  const [tags, setTags] = useState<string[]>([])
  
  // Multiple files support
  const [files, setFiles] = useState<ComponentFile[]>([
    { id: crypto.randomUUID(), language: "tsx", code: "", filename: "Component.tsx" }
  ])
  
  // File upload state
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [dragActive, setDragActive] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  // Handle any initial files dropped onto the upload zone
  useEffect(() => {
    if (initialFiles && initialFiles.length > 0) {
      // If we have an image file, set it as the preview
      const imageFile = initialFiles.find(file => 
        file.type.startsWith('image/')
      );
      
      if (imageFile) {
        setSelectedFile(imageFile);
      }
      
      // If we have code files, try to parse them
      const codeFiles = initialFiles.filter(file => 
        file.name.endsWith('.js') || 
        file.name.endsWith('.jsx') || 
        file.name.endsWith('.ts') || 
        file.name.endsWith('.tsx') || 
        file.name.endsWith('.css')
      );
      
      if (codeFiles.length > 0) {
        // Process code files (in a real implementation, you would read the file contents)
        // Here we're just creating placeholders
        const newFiles = codeFiles.map(file => {
          const extension = file.name.split('.').pop() || '';
          return {
            id: crypto.randomUUID(),
            language: extension,
            code: "// Code content would be read from the file",
            filename: file.name
          };
        });
        
        setFiles(newFiles);
      }
    }
  }, [initialFiles]);

  // Validate form whenever relevant inputs change
  useEffect(() => {
    const nameValid = componentName.trim().length > 0
    const filesValid = files.every(file => file.code.trim().length > 0 && file.filename.trim().length > 0)
    
    setFormValid(nameValid && filesValid && files.length > 0)
    
    // Auto-update tabs based on validation
    if (nameValid && activeTab === "basic") {
      // We don't automatically advance, but we enable the next tab
    }
  }, [componentName, files, activeTab])

  const handleComponentNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComponentName(e.target.value)
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
  }
  
  // Handle changes to file name
  const handleFileNameChange = (id: string, filename: string) => {
    setFiles(prevFiles => 
      prevFiles.map(file => 
        file.id === id ? { ...file, filename } : file
      )
    )
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
      
      // Add tags as a JSON string
      formData.set('tags', JSON.stringify(tags))
      
      // Add preview image if selected
      if (selectedFile) {
        formData.set('previewImage', selectedFile)
      }
      
      const result = await createComponent(formData)
      
      if (result?.error) {
        setError(result.error)
        setIsSubmitting(false)
      } else if (result?.success) {
        setSuccess(true)
        // Wait briefly to show success message before redirecting
        setTimeout(() => {
          onOpenChange(false)
          router.push(`/components/${result.id}`)
          router.refresh()
        }, 1500)
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
    setSuccess(false)
    setIsPublic(false)
    setSelectedFile(null)
    setDragActive(false)
    setFormValid(false)
    setIsSubmitting(false)
    setSelectedUtilities([])
    setFiles([
      { id: crypto.randomUUID(), language: "tsx", code: "", filename: "Component.tsx" }
    ])
    setTags([])
    setActiveTab("basic")
    
    // Clear file input
    if (fileInputRef.current) fileInputRef.current.value = ""
  }

  return {
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
    activeTab,
    tags,
    setIsPublic,
    setActiveTab,
    setTags,
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
  }
}