// src/components/theme-toggle.tsx
"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

export function ThemeToggle() {
  const { setTheme, theme } = useTheme()

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          size="icon" 
          className={cn(
            "rounded-md w-10 h-10 border border-border bg-background",
            "hover:bg-accent/50 hover:text-accent-foreground/90",
            "shadow-sm hover:shadow transition-all",
          )}
        >
          <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end"
        className="bg-popover border border-border rounded-lg shadow-md"
      >
        <DropdownMenuItem 
          onClick={() => setTheme("light")}
          className={cn(
            "flex cursor-pointer items-center rounded-md px-2 py-2 text-sm",
            "transition-colors focus:bg-accent focus:text-accent-foreground",
            theme === "light" ? "bg-accent/50 text-foreground" : "text-foreground/70 hover:text-foreground"
          )}
        >
          <Sun className="mr-2 h-4 w-4" />
          Light
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setTheme("dark")}
          className={cn(
            "flex cursor-pointer items-center rounded-md px-2 py-2 text-sm",
            "transition-colors focus:bg-accent focus:text-accent-foreground",
            theme === "dark" ? "bg-accent/50 text-foreground" : "text-foreground/70 hover:text-foreground"
          )}
        >
          <Moon className="mr-2 h-4 w-4" />
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setTheme("system")}
          className={cn(
            "flex cursor-pointer items-center rounded-md px-2 py-2 text-sm",
            "transition-colors focus:bg-accent focus:text-accent-foreground",
            theme === "system" ? "bg-accent/50 text-foreground" : "text-foreground/70 hover:text-foreground"
          )}
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className="mr-2 h-4 w-4"
          >
            <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
            <line x1="8" y1="21" x2="16" y2="21" />
            <line x1="12" y1="17" x2="12" y2="21" />
          </svg>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}