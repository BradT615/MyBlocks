// src/app/(protected)/_components/component-upload/file-list.tsx
import { Plus } from 'lucide-react'
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { FileEntry } from './file-entry'

interface FileListProps {
  files: {
    id: string
    language: string
    code: string
    filename: string
  }[]
  onAddFile: () => void
  onRemoveFile: (id: string) => void
  onFileNameChange?: (id: string, filename: string) => void
  onFileLanguageChange?: (id: string, language: string) => void
  onFileCodeChange?: (id: string, code: string) => void
}

export function FileList({
  files,
  onAddFile,
  onRemoveFile,
  onFileNameChange = () => {},
  onFileLanguageChange = () => {},
  onFileCodeChange = () => {}
}: FileListProps) {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Label>Component Files <span className="text-red-500">*</span></Label>
        <Button 
          type="button" 
          variant="outline" 
          size="sm" 
          onClick={onAddFile}
          className="flex items-center gap-1"
        >
          <Plus className="h-3.5 w-3.5" />
          <span>Add File</span>
        </Button>
      </div>
      
      <div className="space-y-6">
        {files.map((file) => (
          <FileEntry
            key={file.id}
            file={file}
            showRemoveButton={files.length > 1}
            onRemove={onRemoveFile}
            onFileNameChange={onFileNameChange}
            onFileLanguageChange={onFileLanguageChange}
            onFileCodeChange={onFileCodeChange}
          />
        ))}
      </div>
    </div>
  )
}