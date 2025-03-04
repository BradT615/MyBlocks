"use client"

import { useState } from 'react'
import Link from "next/link"
import { LoginForm } from '@/app/(authentication)/_components/login-form'
import { OTPVerificationForm } from '@/app/(authentication)/_components/login-otp-form'

export function LoginClientPage() {
  const [verifyEmail, setVerifyEmail] = useState<string | null>(null)

  const handleEmailSubmit = (email: string) => {
    setVerifyEmail(email)
  }

  const handleBackToLogin = () => {
    setVerifyEmail(null)
  }

  // Show either login form or OTP verification based on state
  return (
    <>
      {verifyEmail ? (
        <OTPVerificationForm 
          email={verifyEmail}
          onBack={handleBackToLogin}
        />
      ) : (
        <>
          <LoginForm 
            onEmailSubmit={handleEmailSubmit}
          />
          
          <p className="mt-6 text-center text-sm text-muted-foreground">
            <Link
              href="/register"
              className="hover:text-primary underline underline-offset-4 transition-colors"
            >
              Don&apos;t have an account? Sign Up
            </Link>
          </p>
        </>
      )}
    </>
  )
}