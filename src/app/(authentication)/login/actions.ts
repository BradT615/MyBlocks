'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

export async function login(formData: FormData) {
  const supabase = await createClient()
  
  // Get form data
  const email = formData.get('email') as string
  
  // Validate input
  if (!email) {
    return { error: 'Email is required' }
  }

  // Sign in with OTP using Supabase
  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      shouldCreateUser: false, // Prevent automatically creating new users
    }
  })

  if (error) {
    return { error: error.message }
  }

  return { success: 'Check your email for the verification code', email }
}

export async function signup(formData: FormData) {
  const supabase = await createClient()
  
  const email = formData.get('email') as string
  
  // Validate input
  if (!email) {
    return { error: 'Email is required' }
  }

  // Extract display name from email
  const displayName = email.split('@')[0]
    .replace(/[._-]/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase())
    .trim()
  
  // Sign up with OTP using Supabase
  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      data: {
        full_name: displayName,
      },
    },
  })

  if (error) {
    return { error: error.message }
  }

  return { success: 'Check your email for the verification code', email }
}

export async function verifyOtp(formData: FormData) {
  const supabase = await createClient()
  
  // Get form data
  const email = formData.get('email') as string
  const token = formData.get('token') as string
  
  // Validate inputs
  if (!email || !token) {
    return { error: 'Email and verification code are required' }
  }

  // Verify OTP token with Supabase
  const { error } = await supabase.auth.verifyOtp({
    email,
    token,
    type: 'email'
  })

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/', 'layout')
  
  return { success: true }
}

export async function resendVerificationCode(email: string) {
  const supabase = await createClient()
  
  // Validate inputs
  if (!email) {
    return { error: 'Email is required' }
  }

  // Request OTP resend by initiating a new OTP sign-in
  const { error } = await supabase.auth.signInWithOtp({
    email
  })

  if (error) {
    return { error: error.message }
  }

  return { success: 'A new verification code has been sent to your email' }
}

export async function signInWithGithub() {
  const supabase = await createClient()
  
  // Sign in with GitHub OAuth
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'github',
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`
    }
  })
  
  if (error) {
    return { error: error.message }
  }
  
  if (data.url) {
    redirect(data.url)
  }
  
  return { error: 'Failed to initialize GitHub login' }
}

export async function signInWithGoogle() {
  const supabase = await createClient()
  
  // Sign in with Google OAuth
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
      queryParams: {
        access_type: 'offline',
        prompt: 'consent',
      }
    }
  })
  
  if (error) {
    return { error: error.message }
  }
  
  if (data.url) {
    redirect(data.url)
  }
  
  return { error: 'Failed to initialize Google login' }
}

export async function signInWithFigma() {
  const supabase = await createClient()
  
  // Sign in with Figma OAuth
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'figma',
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`
    }
  })
  
  if (error) {
    return { error: error.message }
  }
  
  if (data.url) {
    redirect(data.url)
  }
  
  return { error: 'Failed to initialize Figma login' }
}