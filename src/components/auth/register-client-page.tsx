"use client"

import { useState } from 'react'
import Link from "next/link"
import { RegisterForm } from '@/components/auth/register-form'
import { RegisterOTPVerificationForm } from '@/components/auth/register-otp-form'

export function RegisterClientPage() {
  const [verifyEmail, setVerifyEmail] = useState<string | null>(null)

  const handleEmailSubmit = (email: string) => {
    setVerifyEmail(email)
  }

  const handleBackToRegister = () => {
    setVerifyEmail(null)
  }

  // Show either registration form or OTP verification based on state
  return (
    <>
      {verifyEmail ? (
        <RegisterOTPVerificationForm 
          email={verifyEmail}
          onBack={handleBackToRegister}
        />
      ) : (
        <>
          <RegisterForm 
            onEmailSubmit={handleEmailSubmit}
          />
          
          <p className="mt-6 text-center text-sm text-muted-foreground">
            <Link
              href="/login"
              className="hover:text-primary underline underline-offset-4 transition-colors"
            >
              Already have an account? Sign In
            </Link>
          </p>
        </>
      )}
    </>
  )
}