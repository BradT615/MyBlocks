"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"

interface OTPInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  length?: number
  value?: string
  onChange?: (value: string) => void
}

// Create a named inner component that clearly separates the hooks
function OTPInputInner(
  props: OTPInputProps & { innerRef: React.ForwardedRef<HTMLInputElement> }
) {
  const { className, length = 6, value = "", onChange, innerRef, ...restProps } = props
  
  // All hooks are called at the top level, never in loops or conditions
  const [activeIndex, setActiveIndex] = React.useState(0)
  const inputRefs = React.useRef<(HTMLInputElement | null)[]>([])

  // Convert string value to array of characters
  const valueArray = React.useMemo(() => {
    const chars = value.split("").slice(0, length)
    // Fill with empty strings if needed
    while (chars.length < length) {
      chars.push("")
    }
    return chars
  }, [value, length])

  // Handle input change
  const handleChange = React.useCallback((index: number, newValue: string) => {
    const newValueArray = [...valueArray]
    
    // Only take the last character if more than one is pasted
    newValueArray[index] = newValue.slice(-1)
    
    // Combine array into string and call onChange
    const newStringValue = newValueArray.join("")
    onChange?.(newStringValue)
    
    // Auto-advance to next field if we entered a value
    if (newValue && index < length - 1) {
      inputRefs.current[index + 1]?.focus()
      setActiveIndex(index + 1)
    }
  }, [valueArray, onChange, length])

  // Handle key events for navigation
  const handleKeyDown = React.useCallback((index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !valueArray[index] && index > 0) {
      // Move to previous input on backspace if current is empty
      inputRefs.current[index - 1]?.focus()
      setActiveIndex(index - 1)
    } else if (e.key === "ArrowLeft" && index > 0) {
      // Move to previous input on left arrow
      inputRefs.current[index - 1]?.focus()
      setActiveIndex(index - 1)
    } else if (e.key === "ArrowRight" && index < length - 1) {
      // Move to next input on right arrow
      inputRefs.current[index + 1]?.focus()
      setActiveIndex(index + 1)
    }
  }, [valueArray, length])

  // Handle paste event
  const handlePaste = React.useCallback((e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData("text").trim()
    
    // Check if pasted content is numeric
    if (!/^\d+$/.test(pastedData)) return
    
    // Create a new array with pasted data
    const newValueArray = [...valueArray]
    const pastedChars = pastedData.split("").slice(0, length)
    
    pastedChars.forEach((char, idx) => {
      if (idx < length) newValueArray[idx] = char
    })
    
    // Call onChange with new value
    onChange?.(newValueArray.join(""))
    
    // Focus the next empty field or the last field
    const nextEmptyIndex = newValueArray.findIndex(val => !val)
    const focusIndex = nextEmptyIndex === -1 ? length - 1 : nextEmptyIndex
    inputRefs.current[focusIndex]?.focus()
    setActiveIndex(focusIndex)
  }, [valueArray, onChange, length])

  // Focus first input on mount
  React.useEffect(() => {
    if (inputRefs.current[0] && !value) {
      inputRefs.current[0].focus()
    }
  }, [value])

  // Create the input fields
  const inputFields = React.useMemo(() => {
    return Array.from({ length }).map((_, index) => (
      <Input
        key={index}
        ref={(el) => {
          inputRefs.current[index] = el
          if (index === 0) {
            if (typeof innerRef === "function") {
              innerRef(el)
            } else if (innerRef) {
              innerRef.current = el
            }
          }
        }}
        type="text"
        inputMode="numeric"
        pattern="[0-9]*"
        maxLength={1}
        value={valueArray[index]}
        onChange={(e) => handleChange(index, e.target.value)}
        onKeyDown={(e) => handleKeyDown(index, e)}
        className={cn(
          "w-12 h-12 text-center text-lg",
          activeIndex === index ? "border-primary" : ""
        )}
        {...restProps}
      />
    ))
  }, [valueArray, handleChange, handleKeyDown, innerRef, activeIndex, restProps, length])

  return (
    <div
      className={cn(
        "flex items-center gap-2",
        className
      )}
      onPaste={handlePaste}
    >
      {inputFields}
    </div>
  )
}

// The main component that uses forwardRef
const OTPInput = React.forwardRef<HTMLInputElement, OTPInputProps>(
  function OTPInputWithRef(props, ref) {
    // Simply pass all props and ref to the inner component
    return <OTPInputInner {...props} innerRef={ref} />;
  }
)

OTPInput.displayName = "OTPInput"

export { OTPInput }