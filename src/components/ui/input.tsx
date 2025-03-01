import * as React from "react"
import { cn } from "@/lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  clearPlaceholderOnFocus?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, clearPlaceholderOnFocus = true, onFocus, onBlur, placeholder, ...props }, ref) => {
    const [storedPlaceholder, setStoredPlaceholder] = React.useState(placeholder || "");
    
    const handleFocus = React.useCallback(
      (e: React.FocusEvent<HTMLInputElement>) => {
        if (clearPlaceholderOnFocus) {
          setStoredPlaceholder(e.target.placeholder);
          e.target.placeholder = "";
        }
        onFocus?.(e);
      },
      [clearPlaceholderOnFocus, onFocus]
    );

    const handleBlur = React.useCallback(
      (e: React.FocusEvent<HTMLInputElement>) => {
        if (clearPlaceholderOnFocus) {
          e.target.placeholder = storedPlaceholder;
        }
        onBlur?.(e);
      },
      [clearPlaceholderOnFocus, storedPlaceholder, onBlur]
    );

    return (
      <input
        type={type}
        className={cn(
          "flex h-12 w-full rounded-lg border border-border/50 bg-background/70 px-3 py-2 text-sm",
          "backdrop-blur-sm transition-all duration-150",
          "file:border-0 file:bg-transparent file:text-sm file:font-medium",
          "placeholder:text-muted-foreground",
          "focus-visible:outline-none focus-visible:border-primary/60 focus-visible:border-2",
          "disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        placeholder={placeholder}
        {...props}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }