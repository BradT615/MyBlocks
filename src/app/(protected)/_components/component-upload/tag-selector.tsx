"use client"

import { useState } from "react"
import { Check, ChevronsUpDown, PlusCircle, Tag, X } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from "@/components/ui/command"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

// Pre-defined tag options that are commonly used
const defaultTags = [
  { value: "button", label: "Button" },
  { value: "form", label: "Form" },
  { value: "card", label: "Card" },
  { value: "layout", label: "Layout" },
  { value: "navigation", label: "Navigation" },
  { value: "input", label: "Input" },
  { value: "ui", label: "UI" },
  { value: "responsive", label: "Responsive" },
  { value: "dropdown", label: "Dropdown" },
  { value: "modal", label: "Modal" },
  { value: "header", label: "Header" },
  { value: "footer", label: "Footer" },
  { value: "dashboard", label: "Dashboard" },
  { value: "sidebar", label: "Sidebar" },
  { value: "menu", label: "Menu" },
  { value: "tab", label: "Tab" },
  { value: "accordion", label: "Accordion" },
  { value: "dialog", label: "Dialog" },
  { value: "typography", label: "Typography" },
  { value: "tooltip", label: "Tooltip" },
]

interface TagSelectorProps {
  selectedTags: string[];
  onTagsChange: (tags: string[]) => void;
}

export function TagSelector({ selectedTags, onTagsChange }: TagSelectorProps) {
  const [open, setOpen] = useState(false)
  const [inputValue, setInputValue] = useState("")

  const handleAddCustomTag = () => {
    if (inputValue && !selectedTags.includes(inputValue.toLowerCase())) {
      const newTag = inputValue.toLowerCase().trim()
      if (newTag && !/^\s*$/.test(newTag)) {
        onTagsChange([...selectedTags, newTag])
      }
    }
    setInputValue("")
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" && inputValue) {
      e.preventDefault()
      handleAddCustomTag()
    }
  }

  const handleSelect = (value: string) => {
    if (selectedTags.includes(value)) {
      onTagsChange(selectedTags.filter(tag => tag !== value))
    } else {
      onTagsChange([...selectedTags, value])
    }
  }

  const handleRemoveTag = (tag: string) => {
    onTagsChange(selectedTags.filter(t => t !== tag))
  }

  return (
    <div className="space-y-2">
      <Label>Component Tags</Label>
      <div className="flex flex-wrap gap-2 mb-2">
        {selectedTags.map((tag) => (
          <Badge
            key={tag}
            variant="secondary"
            className="flex items-center gap-1 px-2 py-1"
          >
            <Tag className="h-3 w-3" />
            {tag}
            <Button
              variant="ghost"
              size="sm"
              className="h-4 w-4 p-0 hover:bg-transparent"
              onClick={() => handleRemoveTag(tag)}
            >
              <X className="h-3 w-3" />
              <span className="sr-only">Remove tag</span>
            </Button>
          </Badge>
        ))}
      </div>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between bg-background hover:bg-accent/50"
          >
            <span className="text-muted-foreground">
              {selectedTags.length > 0 
                ? `${selectedTags.length} tag${selectedTags.length > 1 ? 's' : ''} selected` 
                : "Select or add tags..."}
            </span>
            <ChevronsUpDown className="h-4 w-4 opacity-50 shrink-0" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0" align="start">
          <Command onKeyDown={handleKeyDown}>
            <CommandInput 
              placeholder="Search or add a custom tag..." 
              value={inputValue}
              onValueChange={setInputValue}
            />
            {inputValue && !defaultTags.some(tag => tag.value === inputValue.toLowerCase()) && (
              <CommandList>
                <CommandGroup heading="Add Custom Tag">
                  <CommandItem
                    value={inputValue}
                    onSelect={() => {
                      handleAddCustomTag()
                      setOpen(false)
                    }}
                    className="flex items-center gap-2 text-muted-foreground"
                  >
                    <PlusCircle className="h-4 w-4" />
                    <span>Add &quot;{inputValue}&quot;</span>
                  </CommandItem>
                </CommandGroup>
                <CommandSeparator />
              </CommandList>
            )}
            <CommandList>
              <CommandEmpty>No tags found.</CommandEmpty>
              <CommandGroup heading="Popular Tags">
                {defaultTags.map((tag) => (
                  <CommandItem
                    key={tag.value}
                    value={tag.value}
                    onSelect={() => handleSelect(tag.value)}
                    className="flex items-center gap-2"
                  >
                    <div className="flex h-4 w-4 items-center justify-center">
                      {selectedTags.includes(tag.value) && <Check className="h-3 w-3" />}
                    </div>
                    <span>{tag.label}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <p className="text-xs text-muted-foreground">
        Select from common tags or type to create your own
      </p>
    </div>
  );
}