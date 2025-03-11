"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Sun, Moon } from "lucide-react"

export function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("light")

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light")
    // In a real implementation, this would also apply the theme to the preview
  }

  return (
    <div className="flex gap-2">
      <Button 
        size="sm" 
        variant={theme === "light" ? "secondary" : "ghost"} 
        className="h-8 w-8 p-0" 
        title="Light mode"
        onClick={() => setTheme("light")}
      >
        <Sun className="h-4 w-4" />
      </Button>
      <Button 
        size="sm" 
        variant={theme === "dark" ? "secondary" : "ghost"} 
        className="h-8 w-8 p-0" 
        title="Dark mode"
        onClick={() => setTheme("dark")}
      >
        <Moon className="h-4 w-4" />
      </Button>
    </div>
  )
}