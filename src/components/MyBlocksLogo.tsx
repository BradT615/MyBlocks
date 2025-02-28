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
      viewBox="260 52 1640 1680" 
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
        d="M1712 1545 
          L1900 1357 
          L1900 797 
          L1900 237 
          L1715 422 
          L1530 607 
          L1528 982 
          L1525 1357 
          L1150 1360 
          L775 1362 
          L592 1545 
          L410 1727 
          L967 1730 
          L1525 1732 
          L1712 1545 Z"
        fill={blockFill} 
      />
      
      {/* Back Block */}
      <path 
        d="M448 237 
          L260 425 
          L260 985 
          L260 1545 
          L445 1360 
          L630 1175 
          L632 800 
          L635 425 
          L1010 422 
          L1385 420 
          L1568 237 
          L1750 55 
          L1193 52 
          L635 50 
          L448 237 Z" 
        fill={blockFill}
      />
    </svg>
  )
}