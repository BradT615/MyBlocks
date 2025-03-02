'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

export async function login(formData: FormData) {
  const supabase = await createClient()
  
  // Get form data
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  
  // Validate inputs
  if (!email || !password) {
    return { error: 'Email and password are required' }
  }

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/', 'layout')
  redirect('/dashboard')
}

export async function signup(formData: FormData) {
  const supabase = await createClient()
  
  // Get form data
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const fullName = formData.get('fullName') as string
  
  // Validate inputs
  if (!email || !password) {
    return { error: 'Email and password are required' }
  }

  // Simple password strength validation
  if (password.length < 8) {
    return { error: 'Password must be at least 8 characters long' }
  }

  // Sign up with OTP using Supabase
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName || email.split('@')[0],
      },
      // No emailRedirectTo - we'll handle verification with OTP
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
    type: 'signup'
  })

  if (error) {
    return { error: error.message }
  }

  // After successful verification, automatically log the user in
  revalidatePath('/', 'layout')
  
  // Return success - we'll handle redirect client-side
  return { success: true }
}

export async function resendVerificationCode(email: string) {
  const supabase = await createClient()
  
  // Validate inputs
  if (!email) {
    return { error: 'Email is required' }
  }

  // Request OTP resend
  const { error } = await supabase.auth.resend({
    type: 'signup',
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
    // Redirect is handled by the browser automatically
    return { url: data.url }
  }
  
  return { error: 'Failed to initialize GitHub login' }
}