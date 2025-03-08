// src/app/(protected)/_components/component-upload/image-upload.tsx
import Image from "next/image"
import { Upload, X } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

interface ImageUploadProps {
  selectedFile: File | null
  fileInputRef: React.RefObject<HTMLInputElement>
  dragActive: boolean
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onDrag: (e: React.DragEvent) => void
  onDrop: (e: React.DragEvent) => void
}

export function ImageUpload({
  selectedFile,
  fileInputRef,
  dragActive,
  onFileChange,
  onDrag,
  onDrop
}: ImageUploadProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="previewImage">Preview Image (optional)</Label>
      <div 
        className={cn(
          "border-2 border-dashed rounded-lg p-6 text-center transition-colors cursor-pointer",
          dragActive ? "border-primary bg-primary/5" : "border-border/70 hover:bg-muted/30",
          selectedFile ? "bg-primary/5 border-primary/50" : ""
        )}
        onClick={() => fileInputRef.current?.click()}
        onDragEnter={onDrag}
        onDragLeave={onDrag}
        onDragOver={onDrag}
        onDrop={onDrop}
      >
        {selectedFile ? (
          <div className="flex flex-col items-center">
            <div className="relative w-20 h-20 mb-2">
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
                  // Updated to check for null safely
                  if (fileInputRef.current) {
                    fileInputRef.current.value = '';
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
          onChange={onFileChange}
        />
      </div>
    </div>
  )
}