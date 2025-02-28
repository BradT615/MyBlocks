"use client"

import { useState, useEffect } from 'react'
import { signup } from '@/app/login/actions'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Github, Eye, EyeOff, AlertCircle, Loader2 } from "lucide-react"

export function RegisterForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [showPassword, setShowPassword] = useState(false)
  
  // Form validation states
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [emailError, setEmailError] = useState<string | null>(null)
  const [password, setPassword] = useState("")
  const [passwordError, setPasswordError] = useState<string | null>(null)
  
  // Validate email on change
  useEffect(() => {
    if (email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(email)) {
        setEmailError('Please enter a valid email address')
      } else {
        setEmailError(null)
      }
    } else {
      setEmailError(null)
    }
  }, [email])
  
  // Validate password on change
  useEffect(() => {
    if (password) {
      if (password.length < 6) {
        setPasswordError('Password must be at least 6 characters long')
      } else {
        setPasswordError(null)
      }
    } else {
      setPasswordError(null)
    }
  }, [password])

  async function handleSubmit(formData: FormData) {
    setIsLoading(true)
    setError(null)
    setSuccess(null)

    try {
      const result = await signup(formData)
      
      if (result?.error) {
        setError(result.error)
      } else if (result?.success) {
        setSuccess(result.success)
      }
    } catch (error) {
      setError('An unexpected error occurred')
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full">
      <form action={handleSubmit} className="space-y-5">
        {/* Full Name field */}
        <div className="flex flex-col space-y-2">
          <Label htmlFor="fullName" className="text-sm font-medium px-1">
            Full Name
          </Label>
          <Input
            id="fullName"
            name="fullName"
            placeholder="John Doe"
            disabled={isLoading}
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            autoComplete="name"
          />
        </div>
        
        {/* Email field */}
        <div className="flex flex-col space-y-2">
          <Label htmlFor="email" className="text-sm font-medium px-1">
            Email
          </Label>
          <div className="relative">
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="name@example.com"
              required
              className={emailError ? "border-red-500 pr-10" : ""}
              disabled={isLoading}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="username email"
            />
            {emailError && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-red-500">
                <AlertCircle className="h-4 w-4" />
              </div>
            )}
          </div>
          {emailError && (
            <p className="text-xs text-red-500 px-1">{emailError}</p>
          )}
        </div>
        
        {/* Password field */}
        <div className="flex flex-col space-y-2">
          <Label htmlFor="password" className="text-sm font-medium px-1">
            Password
          </Label>
          <div className="relative">
            <Input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              required
              className={passwordError ? "border-red-500 pr-10" : "pr-10"}
              disabled={isLoading}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              tabIndex={-1}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>
          {passwordError && (
            <p className="text-xs text-red-500 px-1">{passwordError}</p>
          )}
          {!passwordError && password.length === 0 && (
            <p className="text-xs text-muted-foreground px-1">
              Password must be at least 6 characters long
            </p>
          )}
        </div>
        
        {error && (
          <div className="rounded-lg bg-red-500/5 border border-red-500/20 p-3 text-sm text-red-500 dark:bg-red-900/10">
            <div className="flex items-center gap-2">
              <AlertCircle className="h-4 w-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          </div>
        )}
        
        {success && (
          <div className="rounded-lg bg-green-500/5 border border-green-500/20 p-3 text-sm text-green-500 dark:bg-green-900/10">
            {success}
          </div>
        )}
        
        <Button 
          type="submit" 
          className="w-full h-12 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 
                   transition-all focus-visible:ring-2 focus-visible:ring-primary"
          disabled={isLoading || !!emailError || !!passwordError}
        >
          {isLoading ? (
            <span className="flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              Creating account...
            </span>
          ) : (
            "Create Account"
          )}
        </Button>
      </form>
      
      <div className="mt-6">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-border/50" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background/70 backdrop-blur-sm px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-2">
          <Button
            variant="outline"
            type="button"
            disabled={isLoading}
            className="h-12 rounded-lg border-border/50 bg-background/70 backdrop-blur-sm hover:bg-accent/50
                     flex items-center justify-center gap-2 font-medium transition-all"
          >
            <Github className="h-4 w-4" />
            GitHub
          </Button>
          
          <Button
            variant="outline"
            type="button"
            disabled={isLoading}
            className="h-12 rounded-lg border-border/50 bg-background/70 backdrop-blur-sm hover:bg-accent/50
                     flex items-center justify-center gap-2 font-medium transition-all"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" style={{ color: "#4285F4" }}>
              <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            Google
          </Button>
          
          <Button
            variant="outline"
            type="button"
            disabled={isLoading}
            className="h-12 rounded-lg border-border/50 bg-background/70 backdrop-blur-sm hover:bg-accent/50
                     flex items-center justify-center gap-2 font-medium transition-all"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" style={{ color: "#0ACF83" }}>
              <path fill="currentColor" d="M8 24c2.2 0 4-1.8 4-4v-4H8c-2.2 0-4 1.8-4 4s1.8 4 4 4z" />
              <path fill="#A259FF" d="M4 12c0-2.2 1.8-4 4-4h4v8H8c-2.2 0-4-1.8-4-4z" />
              <path fill="#F24E1E" d="M4 4c0-2.2 1.8-4 4-4h4v8H8c-2.2 0-4-1.8-4-4z" />
              <path fill="#FF7262" d="M16 0h-4v8h4c2.2 0 4-1.8 4-4s-1.8-4-4-4z" />
              <path fill="#1ABCFE" d="M20 12c0 2.2-1.8 4-4 4h-4v-8h4c2.2 0 4 1.8 4 4z" />
            </svg>
            Figma
          </Button>
        </div>
      </div>
    </div>
  )
}