// src/app/(protected)/_components/component-upload/file-entry.tsx
import { FileCode, Trash2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"

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

interface FileEntryProps {
  file: {
    id: string
    language: string
    code: string
    filename: string
  }
  showRemoveButton: boolean
  onRemove: (id: string) => void
  onFileNameChange: (id: string, filename: string) => void
  onFileLanguageChange: (id: string, language: string) => void
  onFileCodeChange: (id: string, code: string) => void
}

export function FileEntry({
  file,
  showRemoveButton,
  onRemove,
  onFileNameChange,
  onFileLanguageChange,
  onFileCodeChange
}: FileEntryProps) {
  return (
    <div className="border border-border/50 rounded-lg p-4 relative">
      {showRemoveButton && (
        <div className="absolute top-3 right-3 flex items-center gap-2">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => onRemove(file.id)}
            title="Remove file"
            className="h-7 w-7 text-muted-foreground hover:text-destructive"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className="space-y-2">
          <Label htmlFor={`filename-${file.id}`}>Filename <span className="text-red-500">*</span></Label>
          <div className="flex items-center gap-2">
            <FileCode className="h-4 w-4 text-muted-foreground" />
            <Input 
              id={`filename-${file.id}`}
              value={file.filename}
              onChange={(e) => onFileNameChange(file.id, e.target.value)}
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
            onValueChange={(value) => onFileLanguageChange(file.id, value)}
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
          onChange={(e) => onFileCodeChange(file.id, e.target.value)}
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
  )
}