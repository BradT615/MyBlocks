"use client"

import { useState, useEffect } from 'react'
import { signup, verifyOtp, resendVerificationCode } from '@/app/login/actions'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { OTPInput } from "@/components/ui/input-otp"
import { isStrongPassword } from "@/utils/validation"
import { 
  Github, 
  Eye, 
  EyeOff, 
  AlertCircle, 
  Loader2, 
  CheckCircle2, 
  ArrowLeft, 
  RefreshCw, 
  Mail 
} from "lucide-react"
import { useRouter } from 'next/navigation'

export function RegisterForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [verifyEmail, setVerifyEmail] = useState<string | null>(null)
  const [showPassword, setShowPassword] = useState(false)
  const [otpValue, setOtpValue] = useState("")
  const [otpSuccess, setOtpSuccess] = useState(false)
  const [isVerifying, setIsVerifying] = useState(false)
  const [isResending, setIsResending] = useState(false)
  const [countdown, setCountdown] = useState(60)
  const [canResend, setCanResend] = useState(false)
  
  // Form validation states
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
      if (!isStrongPassword(password)) {
        setPasswordError('Password must be at least 8 characters long')
      } else {
        setPasswordError(null)
      }
    } else {
      setPasswordError(null)
    }
  }, [password])

  // Countdown timer for resend button
  useEffect(() => {
    if (!verifyEmail) return
    
    if (countdown <= 0) {
      setCanResend(true)
      return
    }
    
    const timer = setTimeout(() => {
      setCountdown(countdown - 1)
    }, 1000)
    
    return () => clearTimeout(timer)
  }, [countdown, verifyEmail])

  // Handle registration form submission
  async function handleSubmit(formData: FormData) {
    setIsLoading(true)
    setError(null)

    try {
      // Extract display name from email and add it to the form data
      const emailValue = formData.get('email') as string
      const displayName = emailValue.split('@')[0]
        .replace(/[._-]/g, ' ') // Replace dots, underscores, and hyphens with spaces
        .replace(/\b\w/g, (char) => char.toUpperCase()) // Capitalize first letter of each word
        .trim()
      
      // Create a new FormData with the extracted display name
      const processedFormData = new FormData()
      processedFormData.append('fullName', displayName)
      processedFormData.append('email', emailValue)
      processedFormData.append('password', formData.get('password') as string)
      
      const result = await signup(processedFormData)
      
      if (result?.error) {
        setError(result.error)
      } else if (result?.success && result?.email) {
        // Set the email to transition to verification screen
        setVerifyEmail(emailValue)
      }
    } catch (error) {
      setError('An unexpected error occurred')
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  // Handle OTP verification
  async function handleVerifyOtp() {
    if (otpValue.length !== 6 || !verifyEmail) return
    
    setIsVerifying(true)
    setError(null)
    
    try {
      // Create form data for the server action
      const formData = new FormData()
      formData.append('email', verifyEmail)
      formData.append('token', otpValue)
      
      const result = await verifyOtp(formData)
      
      if (result?.error) {
        setError(result.error)
      } else if (result?.success) {
        setOtpSuccess(true)
        
        // Redirect to dashboard after a brief delay
        setTimeout(() => {
          router.push('/dashboard')
        }, 1500)
      }
    } catch (error) {
      setError('Failed to verify code')
      console.error(error)
    } finally {
      setIsVerifying(false)
    }
  }

  // Handle resend verification code
  async function handleResendCode() {
    if (!canResend || !verifyEmail) return
    
    setIsResending(true)
    setError(null)
    
    try {
      const result = await resendVerificationCode(verifyEmail)
      
      if (result?.error) {
        setError(result.error)
      } else {
        // Reset countdown
        setCountdown(60)
        setCanResend(false)
        // Clear OTP input
        setOtpValue("")
      }
    } catch (error) {
      setError('Failed to resend verification code')
      console.error(error)
    } finally {
      setIsResending(false)
    }
  }

  // Handle going back to signup form from verification
  const handleBackToForm = () => {
    setVerifyEmail(null)
  }

  // Render success state after OTP verification
  if (otpSuccess) {
    return (
      <div className="text-center flex flex-col items-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/20 mb-6">
          <CheckCircle2 className="h-10 w-10 text-green-600 dark:text-green-400" />
        </div>
        <h2 className="text-2xl font-bold mb-2">Verification Complete</h2>
        <p className="text-muted-foreground mb-6">
          Your account has been successfully verified! Redirecting you to your dashboard...
        </p>
        <div className="animate-pulse">
          <Loader2 className="h-6 w-6 animate-spin text-primary" />
        </div>
      </div>
    )
  }

  // Render OTP verification form
  if (verifyEmail) {
    return (
      <div className="w-full">
        <div className="space-y-6">
          {/* Back button */}
          <button 
            type="button" 
            onClick={handleBackToForm}
            className="flex items-center text-sm text-muted-foreground hover:text-foreground mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            <span>Back to signup</span>
          </button>

          <div className="text-center mb-6">
            <div className="mb-4 flex justify-center">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Mail className="h-6 w-6 text-primary" />
              </div>
            </div>
            <h3 className="text-xl font-bold mb-2">Verify your email</h3>
            <p className="text-sm text-muted-foreground">
              We've sent a 6-digit code to <strong>{verifyEmail}</strong>
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              Enter the code below to verify your email address
            </p>
          </div>
          
          {/* OTP Input */}
          <div className="flex justify-center">
            <OTPInput
              value={otpValue}
              onChange={setOtpValue}
              disabled={isVerifying}
              length={6}
            />
          </div>
          
          {/* Error message */}
          {error && (
            <div className="rounded-lg bg-red-500/5 border border-red-500/20 p-3 text-sm text-red-500 dark:bg-red-900/10">
              <div className="flex items-center gap-2">
                <AlertCircle className="h-4 w-4 flex-shrink-0" />
                <span>{error}</span>
              </div>
            </div>
          )}
          
          {/* Verify button */}
          <Button 
            onClick={handleVerifyOtp}
            className="w-full h-12"
            disabled={isVerifying || otpValue.length !== 6}
          >
            {isVerifying ? (
              <span className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                Verifying...
              </span>
            ) : (
              "Verify Account"
            )}
          </Button>
          
          {/* Resend code option */}
          <div className="text-center pt-2">
            <button 
              type="button"
              onClick={handleResendCode}
              disabled={!canResend || isResending}
              className={`text-sm flex items-center justify-center mx-auto gap-1
                ${canResend 
                  ? 'text-primary hover:underline cursor-pointer' 
                  : 'text-muted-foreground cursor-not-allowed'}`}
            >
              {isResending ? (
                <>
                  <Loader2 className="h-3 w-3 animate-spin" />
                  <span>Sending new code...</span>
                </>
              ) : canResend ? (
                <>
                  <RefreshCw className="h-3 w-3" />
                  <span>Resend verification code</span>
                </>
              ) : (
                <span>Resend code in {countdown}s</span>
              )}
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Render registration form
  return (
    <div className="w-full">
      <form action={handleSubmit} className="space-y-5">
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
              Password must be at least 8 characters long
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

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
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
      </form>
    </div>
  )
}