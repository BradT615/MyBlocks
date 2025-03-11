"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Copy, Check } from "lucide-react"

interface CodeActionsProps {
  code: string
  isSmall?: boolean
}

export function CodeActions({ code, isSmall = false }: CodeActionsProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Button 
      size={isSmall ? "sm" : "default"}
      variant={isSmall ? "ghost" : "default"}
      className={isSmall ? "h-8 gap-1" : "gap-1"}
      onClick={handleCopy}
    >
      {copied ? (
        <>
          <Check className="h-4 w-4" />
          <span>Copied!</span>
        </>
      ) : (
        <>
          <Copy className="h-4 w-4" />
          <span>{isSmall ? "Copy" : "Copy Code"}</span>
        </>
      )}
    </Button>
  )
}