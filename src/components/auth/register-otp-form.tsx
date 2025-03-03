"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { verifyOtp, resendVerificationCode } from '@/app/login/actions'
import { Button } from "@/components/ui/button"
import { OTPInput } from "@/components/ui/input-otp"
import { MyBlocksLogo } from "@/components/MyBlocksLogo"
import { 
  AlertCircle, 
  Loader2, 
  CheckCircle2,
  ArrowLeft, 
  RefreshCw, 
  Mail 
} from "lucide-react"

interface RegisterOTPFormProps {
  email: string;
  onBack: () => void;
}

export function RegisterOTPVerificationForm({ email, onBack }: RegisterOTPFormProps) {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [otpValue, setOtpValue] = useState("")
  const [otpSuccess, setOtpSuccess] = useState(false)
  const [isVerifying, setIsVerifying] = useState(false)
  const [isResending, setIsResending] = useState(false)
  const [countdown, setCountdown] = useState(60)
  const [canResend, setCanResend] = useState(false)

  // Countdown timer for resend button
  useEffect(() => {
    if (countdown <= 0) {
      setCanResend(true)
      return
    }
    
    const timer = setTimeout(() => {
      setCountdown(countdown - 1)
    }, 1000)
    
    return () => clearTimeout(timer)
  }, [countdown])

  // Handle OTP verification
  async function handleVerifyOtp() {
    if (otpValue.length !== 6) return
    
    setIsVerifying(true)
    setError(null)
    
    try {
      // Create form data for the server action
      const formData = new FormData()
      formData.append('email', email)
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
    if (!canResend) return
    
    setIsResending(true)
    setError(null)
    
    try {
      const result = await resendVerificationCode(email)
      
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

  // Render success state after OTP verification
  if (otpSuccess) {
    return (
      <>
        {/* Success header */}
        <div className="mb-8 flex flex-col items-center text-center">
          <MyBlocksLogo width={72} height={72} variant="filled" className="mb-6 text-primary" />
          <h1 className="text-3xl font-bold tracking-tight">
            Verification Complete
          </h1>
        </div>
        
        <div className="text-center flex flex-col items-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/20 mb-6">
            <CheckCircle2 className="h-10 w-10 text-green-600 dark:text-green-400" />
          </div>
          <p className="text-muted-foreground mb-6">
            Your account has been successfully verified! Redirecting you to your dashboard...
          </p>
          <div className="animate-pulse">
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <div className="w-full">
        <div className="space-y-6">
          {/* Back button */}
          <button 
            type="button" 
            onClick={onBack}
            className="flex items-center text-sm text-muted-foreground hover:text-foreground mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            <span>Back to Sign up</span>
          </button>

          <div className="text-center mb-6">
            <div className="mb-4 flex justify-center">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Mail className="h-6 w-6 text-primary" />
              </div>
            </div>
            <h3 className="text-xl font-bold mb-2">Check your email</h3>
            <p className="text-sm text-muted-foreground">
              We&apos;ve sent a 6-digit code to <strong>{email}</strong>
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              Enter the code below to verify your account
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
    </>
  )
}