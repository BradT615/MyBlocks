"use client"

import { useState, useEffect } from 'react'
import { login, signInWithGithub, signInWithGoogle, signInWithFigma } from '@/app/(authentication)/login/actions'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { MyBlocksLogo } from "@/components/MyBlocksLogo"
import { 
  Github, 
  AlertCircle, 
  Loader2
} from "lucide-react"

interface LoginFormProps {
  onEmailSubmit: (email: string) => void;
}

export function LoginForm({ onEmailSubmit }: LoginFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  // Form validation states
  const [email, setEmail] = useState("")
  const [emailError, setEmailError] = useState<string | null>(null)
  
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

  async function handleSubmit(formData: FormData) {
    setIsLoading(true)
    setError(null)

    try {
      const result = await login(formData)
      
      if (result?.error) {
        setError(result.error)
      } else if (result?.success && result?.email) {
        // Call the callback to transition to verification screen
        onEmailSubmit(result.email)
      }
    } catch (error) {
      setError('An unexpected error occurred')
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  async function handleGithubSignIn() {
    setIsLoading(true)
    setError(null)
    
    try {
      const result = await signInWithGithub()
      
      if (result?.error) {
        setError(result.error)
      }
      // The redirect will be handled by the server action
    } catch (error) {
      setError('Failed to initialize GitHub login')
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  async function handleGoogleSignIn() {
    setIsLoading(true)
    setError(null)
    
    try {
      const result = await signInWithGoogle()
      
      if (result?.error) {
        setError(result.error)
      }
      // The redirect will be handled by the server action
    } catch (error) {
      setError('Failed to initialize Google login')
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  async function handleFigmaSignIn() {
    setIsLoading(true)
    setError(null)
    
    try {
      const result = await signInWithFigma()
      
      if (result?.error) {
        setError(result.error)
      }
      // The redirect will be handled by the server action
    } catch (error) {
      setError('Failed to initialize Figma login')
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <div className="mb-8 flex flex-col items-center text-center">
        <MyBlocksLogo width={72} height={72} variant="filled" className="mb-6 text-primary" />
        <h1 className="text-3xl font-bold tracking-tight mb-2">
          Welcome back
        </h1>
        <p className="text-muted-foreground">
          Sign in to your account to continue
        </p>
      </div>

      <div className="w-full">
        <form action={handleSubmit}>
          <div className="flex flex-col">
            <div className="flex justify-between items-center px-1 mb-1">
              <Label htmlFor="email" className="text-sm font-medium">
                Email
              </Label>
              {emailError && (
                <p className="text-xs text-red-500">{emailError}</p>
              )}
            </div>
            <div className="relative mb-4">
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="name@example.com"
                required
                className={emailError ? "border-red-500 pr-10" : "pr-10"}
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
          </div>
          
          {error && (
            <div className="rounded-lg mb-4 min-h-10 bg-red-500/10 border border-red-500/20 p-3 text-sm text-red-500 dark:bg-red-900/20">
              <div className="flex items-center gap-2">
                <AlertCircle className="h-4 w-4 flex-shrink-0" />
                <span>{error}</span>
              </div>
            </div>
          )}
          
          <Button type="submit" className="w-full h-12" disabled={isLoading || !!emailError}>
            {isLoading ? (
              <span className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                Sending verification code...
              </span>
            ) : (
              "Continue with Email"
            )}
          </Button>
        
          <div className="relative py-6">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-border"/>
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-background px-2 text-muted-foreground">
                OR CONTINUE WITH
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <Button
              variant="outline"
              type="button"
              disabled={isLoading}
              className="h-12 gap-2"
              onClick={handleGithubSignIn}
            >
              <Github className="h-4 w-4" />
              GitHub
            </Button>
            
            <Button
              variant="outline"
              type="button"
              disabled={isLoading}
              className="h-12 gap-2"
              onClick={handleGoogleSignIn}
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
              className="h-12 gap-2"
              onClick={handleFigmaSignIn}
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
        </form>
      </div>
    </>
  )
}