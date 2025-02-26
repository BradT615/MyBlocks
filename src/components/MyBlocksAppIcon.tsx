// src/components/MyBlocksAppIcon.tsx
import { MyBlocksLogo } from "./MyBlocksLogo"
import { cn } from "@/lib/utils"

interface MyBlocksAppIconProps {
  className?: string
  size?: number
  variant?: "default" | "outline" | "filled"
}

export function MyBlocksAppIcon({ 
  className, 
  size = 32,
  variant = "filled"
}: MyBlocksAppIconProps) {
  return (
    <div 
      className={cn(
        "relative grid place-items-center rounded-xl overflow-hidden",
        "bg-gradient-to-br from-background to-muted",
        "border border-border dark:border-border/50",
        "shadow-sm",
        className
      )}
      style={{ width: size, height: size }}
    >
      <MyBlocksLogo 
        width={size * 0.7} 
        height={size * 0.7} 
        variant={variant} 
      />
    </div>
  )
}