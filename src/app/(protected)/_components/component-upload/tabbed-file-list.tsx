"use client"

import { useState } from "react"
import { Plus, FileCode, X } from 'lucide-react'
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
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

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

interface ComponentFile {
  id: string
  language: string
  code: string
  filename: string
}

interface TabbedFileListProps {
  files: ComponentFile[];
  onAddFile: () => void;
  onRemoveFile: (id: string) => void;
  onFileNameChange: (id: string, filename: string) => void;
  onFileLanguageChange: (id: string, language: string) => void;
  onFileCodeChange: (id: string, code: string) => void;
}

export function TabbedFileList({
  files,
  onAddFile,
  onRemoveFile,
  onFileNameChange,
  onFileLanguageChange,
  onFileCodeChange
}: TabbedFileListProps) {
  const [activeFileId, setActiveFileId] = useState<string>(files[0]?.id || "")

  // When files change (add/remove), update the active file if needed
  if (files.length > 0 && !files.some(file => file.id === activeFileId)) {
    setActiveFileId(files[0].id)
  }

  const activeFile = files.find(file => file.id === activeFileId)

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Label>Component Files <span className="text-red-500">*</span></Label>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
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
            </TooltipTrigger>
            <TooltipContent>
              <p>Add another component file (e.g. CSS, utils)</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      {/* Chrome-like tabs */}
      <div className="flex flex-col">
        <div className="flex border-b overflow-x-auto no-scrollbar">
          {files.map((file) => (
            <div 
              key={file.id}
              className={cn(
                "flex items-center gap-1.5 px-3 py-2 border-r relative cursor-pointer group",
                "text-sm transition-colors hover:bg-muted/50 hover:text-foreground",
                file.id === activeFileId 
                  ? "bg-muted/70 text-foreground font-medium border-b-2 border-b-primary -mb-[1px]" 
                  : "text-muted-foreground"
              )}
              onClick={() => setActiveFileId(file.id)}
            >
              <FileCode className="h-3.5 w-3.5" />
              <span className="truncate max-w-[120px]">{file.filename}</span>
              {files.length > 1 && (
                <button
                  type="button"
                  className={cn(
                    "rounded-full p-0.5 hover:bg-muted",
                    "text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity",
                    file.id === activeFileId ? "opacity-100" : ""
                  )}
                  onClick={(e) => {
                    e.stopPropagation()
                    onRemoveFile(file.id)
                  }}
                >
                  <X className="h-3 w-3" />
                  <span className="sr-only">Close tab</span>
                </button>
              )}
            </div>
          ))}
          <div 
            className="px-2 py-2 border-r text-muted-foreground cursor-pointer hover:bg-muted/50"
            onClick={onAddFile}
          >
            <Plus className="h-4 w-4" />
          </div>
          <div className="flex-1 border-b"></div>
        </div>

        {/* Active file content */}
        {activeFile && (
          <div className="border border-t-0 rounded-b-md p-4 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor={`filename-${activeFile.id}`}>Filename <span className="text-red-500">*</span></Label>
                <div className="flex items-center gap-2">
                  <FileCode className="h-4 w-4 text-muted-foreground" />
                  <Input 
                    id={`filename-${activeFile.id}`}
                    value={activeFile.filename}
                    onChange={(e) => onFileNameChange(activeFile.id, e.target.value)}
                    placeholder="Component.tsx"
                    className="flex-1"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor={`language-${activeFile.id}`}>Language</Label>
                <Select
                  value={activeFile.language}
                  onValueChange={(value) => onFileLanguageChange(activeFile.id, value)}
                >
                  <SelectTrigger id={`language-${activeFile.id}`} className="w-full">
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
              <Label htmlFor={`code-${activeFile.id}`}>Code <span className="text-red-500">*</span></Label>
              <Textarea 
                id={`code-${activeFile.id}`}
                value={activeFile.code}
                onChange={(e) => onFileCodeChange(activeFile.id, e.target.value)}
                placeholder="Paste your code here"
                className={cn(
                  "min-h-[300px] font-mono text-sm",
                  activeFile.language === "tsx" || activeFile.language === "jsx" ? "text-blue-500 dark:text-blue-400" : "",
                  activeFile.language === "css" || activeFile.language === "scss" || activeFile.language === "less" ? "text-pink-500 dark:text-pink-400" : ""
                )}
                required
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}