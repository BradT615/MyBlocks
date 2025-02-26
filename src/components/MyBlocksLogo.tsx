// src/components/MyBlocksLogo.tsx
"use client"

import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"

interface MyBlocksLogoProps {
  className?: string
  width?: number
  height?: number
  variant?: "default" | "outline" | "filled"
  animated?: boolean
}

export function MyBlocksLogo({ 
  className, 
  width = 40, 
  height = 40,
  variant = "outline",
  animated = false
}: MyBlocksLogoProps) {
  const { resolvedTheme } = useTheme()
  
  // Theme-based colors
  const strokeColor = resolvedTheme === "dark" ? "#FFFFFF" : "#000000"
  
  // Handle different variants
  let fillColor = "transparent"
  let frontBlockFill = "transparent"
  let backBlockFill = "transparent"
  
  if (variant === "filled") {
    frontBlockFill = resolvedTheme === "dark" ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)"
    backBlockFill = resolvedTheme === "dark" ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.05)"
  }

  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="210 0 1740 1882" 
      width={width} 
      height={height} 
      className={cn(
        animated && "transition-transform duration-300 group-hover:scale-110",
        className
      )}
    >
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
        fill={frontBlockFill} 
        stroke={strokeColor} 
        strokeWidth="5"
        className={animated ? "transition-all duration-500 ease-in-out" : ""}
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
        fill={backBlockFill} 
        stroke={strokeColor} 
        strokeWidth="5"
        className={animated ? "transition-all duration-500 ease-in-out" : ""}
      />
    </svg>
  )
}