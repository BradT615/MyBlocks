import * as React from "react"
import { cn } from "@/lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  clearPlaceholderOnFocus?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, clearPlaceholderOnFocus = true, ...props }, ref) => {
    const [placeholder, setPlaceholder] = React.useState(props.placeholder || "");
    
    const handleFocus = React.useCallback(
      (e: React.FocusEvent<HTMLInputElement>) => {
        if (clearPlaceholderOnFocus) {
          setPlaceholder(e.target.placeholder);
          e.target.placeholder = "";
        }
        props.onFocus?.(e);
      },
      [clearPlaceholderOnFocus, props.onFocus]
    );

    const handleBlur = React.useCallback(
      (e: React.FocusEvent<HTMLInputElement>) => {
        if (clearPlaceholderOnFocus) {
          e.target.placeholder = placeholder;
        }
        props.onBlur?.(e);
      },
      [clearPlaceholderOnFocus, placeholder, props.onBlur]
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
        {...props}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }