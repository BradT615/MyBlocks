"use client"

import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"
import React, { useState, useEffect } from "react"

interface MyBlocksLogoProps {
  className?: string
  width?: number
  height?: number
  variant?: "default" | "outline" | "filled"
}

export function MyBlocksLogo({ 
  className, 
  width = 40, 
  height = 40,
  variant = "default"
}: MyBlocksLogoProps) {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  
  // Ensure component only renders on client
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    // Return a placeholder or null during server-side rendering
    return null
  }
  
  let blockFill = "transparent"
  let strokeColor = "transparent"
  
  if (variant === "filled") {
    blockFill = resolvedTheme === "dark" ? "rgba(255, 255, 255, 0.8)" : "rgba(0, 0, 0, 0.8)"
  } else if (variant === "outline") {
    strokeColor = resolvedTheme === "dark" ? "rgba(255, 255, 255, 0.5)" : "rgba(0, 0, 0, 0.5)"
  }

  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={width} 
      height={height} 
      className={cn(className)}
    >
      {/* Border */}
      {(variant === "outline" || variant === "filled") && (
        <rect 
          x="260" 
          y="52" 
          width="1640" 
          height="1680" 
          fill="none" 
          stroke={strokeColor}
          strokeWidth="10"
        />
      )}
      
      {/* Front Block */}
      <path 
        d="M5 0
        L0 5 
        L0 21 
        L5 16
        L5 5
        L16 5 
        L21 0 
        L5 0"
        fill={blockFill} 
      />
      
      {/* Back Block */}
      <path 
        d="M19 24 
        L24 19
        L24 3 
        L19 8
        L19 19 
        L8 19 
        L3 24 
        L19 24"
        fill={blockFill}
      />
    </svg>
  )
}