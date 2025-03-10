"use client"

import { useState, useEffect, useRef, useCallback, useMemo, memo } from "react"
import { PlusCircle, X, Search } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"
// Import Button from UI components instead of defining it in the same file
import { Button } from "@/components/ui/button"

// Move to a separate constants file for better organization
const DEFAULT_TAGS = [
  "button", "form", "card", "layout", "navigation", "input", "ui", "responsive", 
  "dropdown", "modal", "header", "footer", "dashboard", "sidebar", "menu", 
  "tab", "accordion", "dialog", "typography", "tooltip", "list", "grid",
  "animation", "notification", "slider", "loader", "avatar", "chart", "table"
]

// Animation properties defined outside component to prevent recreation
const TRANSITION_PROPS = {
  type: "spring",
  stiffness: 500,
  damping: 30,
  mass: 0.5,
  layout: false
}

interface TagSelectorProps {
  selectedTags: string[];
  onTagsChange: (tags: string[]) => void;
}

const TagSelector = memo(({ selectedTags, onTagsChange }: TagSelectorProps) => {
  const [searchQuery, setSearchQuery] = useState("")
  const [customTagInput, setCustomTagInput] = useState("")
  const [showCustomInput, setShowCustomInput] = useState(false)
  const tagContainerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  
  // Memoize handlers with useCallback to prevent unnecessary re-renders
  const toggleTag = useCallback((tag: string) => {
    if (selectedTags.includes(tag)) {
      onTagsChange(selectedTags.filter(t => t !== tag))
    } else {
      onTagsChange([...selectedTags, tag])
    }
  }, [selectedTags, onTagsChange])

  const addCustomTag = useCallback(() => {
    const trimmedInput = customTagInput.trim().toLowerCase()
    if (trimmedInput && !selectedTags.includes(trimmedInput)) {
      onTagsChange([...selectedTags, trimmedInput])
      setCustomTagInput("")
      setShowCustomInput(false)
    }
  }, [customTagInput, selectedTags, onTagsChange])

  const handleKeyPress = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && customTagInput.trim()) {
      e.preventDefault()
      addCustomTag()
    } else if (e.key === "Escape") {
      setShowCustomInput(false)
      setCustomTagInput("")
    }
  }, [addCustomTag, customTagInput])

  const handleAddCustomClick = useCallback(() => {
    setShowCustomInput(true)
  }, [])

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }, [])

  const handleCustomInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomTagInput(e.target.value)
  }, [])

  const handleCustomInputBlur = useCallback(() => {
    if (!customTagInput.trim()) {
      setShowCustomInput(false)
    }
  }, [customTagInput])

  // Memoize filtered tags to prevent recalculation on every render
  const filteredTags = useMemo(() => 
    DEFAULT_TAGS.filter(tag => 
      !selectedTags.includes(tag) && 
      tag.toLowerCase().includes(searchQuery.toLowerCase())
    ),
  [selectedTags, searchQuery])

  // Focus the input when custom tag input is shown with proper cleanup
  useEffect(() => {
    if (showCustomInput && inputRef.current) {
      inputRef.current.focus()
    }
    
    // Cleanup function for useEffect
    return () => {
      // Any cleanup needed
    }
  }, [showCustomInput])

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <Label htmlFor="tag-search" className="text-sm font-medium">Component Tags</Label>
        <div className="relative w-1/3">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            id="tag-search"
            type="text"
            placeholder="Search tags..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="pl-9 h-8 text-sm"
          />
        </div>
      </div>

      <div 
        ref={tagContainerRef}
        className="flex flex-wrap gap-2 max-h-[180px] overflow-y-auto rounded-md border border-input bg-background p-2"
      >
        {/* Selected Tags */}
        {selectedTags.map((tag) => (
          <motion.div
            key={tag}
            layoutId={`tag-${tag}`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{...TRANSITION_PROPS, layout: { duration: 0.15 }}}
            className={cn(
              "inline-flex items-center px-3 py-1 rounded-full text-sm font-medium",
              "select-none cursor-pointer whitespace-nowrap overflow-hidden",
              "bg-primary/10 text-primary ring-1 ring-primary/20 hover:bg-primary/15"
            )}
            onClick={() => toggleTag(tag)}
          >
            <span>{tag}</span>
            <X className="h-3 w-3 ml-1.5 opacity-70" />
          </motion.div>
        ))}

        {/* Custom Tag Input */}
        <AnimatePresence>
          {showCustomInput && (
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: "auto", opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="flex items-center"
            >
              <Input
                id="custom-tag-input"
                ref={inputRef}
                value={customTagInput}
                onChange={handleCustomInputChange}
                onKeyDown={handleKeyPress}
                onBlur={handleCustomInputBlur}
                className="h-8 min-w-[150px] text-sm"
                placeholder="Add custom tag..."
              />
              <Button 
                type="button"
                size="sm"
                variant="ghost"
                onClick={addCustomTag}
                className="ml-1 h-8 w-8 p-0"
                disabled={!customTagInput.trim()}
              >
                <PlusCircle className="h-4 w-4" />
                <span className="sr-only">Add tag</span>
              </Button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Add Custom Tag Button */}
        {!showCustomInput && (
          <motion.button
            type="button"
            onClick={handleAddCustomClick}
            layout
            className={cn(
              "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm",
              "bg-muted/50 text-muted-foreground hover:bg-muted",
              "ring-1 ring-muted/50 cursor-pointer select-none"
            )}
          >
            <PlusCircle className="h-3.5 w-3.5" />
            <span>Custom</span>
          </motion.button>
        )}
      </div>

      {/* Available Tags */}
      <div className="mt-2">
        <Label className="text-xs text-muted-foreground mb-2 inline-block">
          Available Tags
        </Label>
        <motion.div 
          className="flex flex-wrap gap-2"
          layoutScroll
        >
          {filteredTags.length > 0 ? (
            filteredTags.map((tag) => (
              <motion.button
                key={tag}
                onClick={() => toggleTag(tag)}
                layoutId={`tag-${tag}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{...TRANSITION_PROPS, layout: { duration: 0.15 }}}
                className={cn(
                  "inline-flex items-center px-3 py-1 rounded-full text-sm",
                  "bg-secondary/50 text-secondary-foreground hover:bg-secondary/80",
                  "ring-1 ring-secondary/30 cursor-pointer select-none"
                )}
              >
                {tag}
              </motion.button>
            ))
          ) : (
            <div className="h-8 flex items-center">
              <span className="text-sm text-muted-foreground">
                {searchQuery 
                  ? "No matching tags found. Use the Custom button to create a new tag." 
                  : "All available tags have been selected."}
              </span>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
})

// Add display name for better debugging
TagSelector.displayName = "TagSelector"

export { TagSelector }