"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Sun, Moon } from "lucide-react"
import { cn } from "@/lib/utils"

interface ThemeToggleWithStateProps {
  onChange?: (theme: "light" | "dark") => void
  defaultTheme?: "light" | "dark"
  className?: string
}

export function ThemeToggleWithState({ 
  onChange, 
  defaultTheme = "light",
  className
}: ThemeToggleWithStateProps) {
  const [theme, setTheme] = useState<"light" | "dark">(defaultTheme)

  const toggleTheme = (newTheme: "light" | "dark") => {
    setTheme(newTheme)
    if (onChange) {
      onChange(newTheme)
    }
  }

  return (
    <div className={cn("flex gap-2", className)}>
      <Button 
        size="sm" 
        variant={theme === "light" ? "secondary" : "ghost"} 
        className="h-8 w-8 p-0" 
        title="Light mode"
        onClick={() => toggleTheme("light")}
      >
        <Sun className="h-4 w-4" />
      </Button>
      <Button 
        size="sm" 
        variant={theme === "dark" ? "secondary" : "ghost"} 
        className="h-8 w-8 p-0" 
        title="Dark mode"
        onClick={() => toggleTheme("dark")}
      >
        <Moon className="h-4 w-4" />
      </Button>
    </div>
  )
}