'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/utils/supabase/server'

// Update user's email with OTP verification
export async function updateProfileEmail(email: string, otp?: string) {
  try {
    const supabase = await createClient()
    
    // Get current user with getUser() for security
    const { data: { user }, error: userError } = await supabase.auth.getUser()
    
    if (userError || !user) {
      return { error: 'You must be logged in to update your profile' }
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return { error: 'Please enter a valid email address' }
    }
    
    // Check if email is different
    if (user.email === email) {
      return { error: 'The email address is the same as your current one' }
    }

    // If OTP is provided, we're verifying the change
    if (otp) {
      // Verify OTP
      const { error: verifyError } = await supabase.auth.verifyOtp({
        email,
        token: otp,
        type: 'email_change'
      })

      if (verifyError) {
        console.error('Error verifying OTP for email update:', verifyError)
        return { error: verifyError.message || 'Invalid verification code' }
      }

      // Revalidate settings page
      revalidatePath('/settings')
      
      return { success: true }
    } else {
      // No OTP, so we're initiating the email change
      // Supabase will send confirmation links to both the current and new email
      const { error: updateError } = await supabase.auth.updateUser({
        email: email
      })
      
      if (updateError) {
        console.error('Error updating email:', updateError)
        return { error: updateError.message }
      }
      
      return { success: true, message: 'Verification email sent' }
    }
  } catch (error) {
    console.error('Unexpected error updating email:', error)
    return { error: 'An unexpected error occurred' }
  }
}

// Resend email verification for email change
export async function resendEmailVerification(email: string) {
  try {
    const supabase = await createClient()
    
    // Get current user with getUser() for security
    const { data: { user }, error: userError } = await supabase.auth.getUser()
    
    if (userError || !user) {
      return { error: 'You must be logged in to update your profile' }
    }
    
    // Validate email
    if (!email || typeof email !== 'string') {
      return { error: 'Please provide a valid email address' }
    }

    // Initiate the email update process again, which will send a new OTP
    const { error: updateError } = await supabase.auth.updateUser({
      email: email
    })
    
    if (updateError) {
      console.error('Error sending email verification:', updateError)
      return { error: updateError.message }
    }
    
    return { success: true, message: 'Verification email resent' }
  } catch (error) {
    console.error('Unexpected error resending verification:', error)
    return { error: 'An unexpected error occurred' }
  }
}

// Update user's display name
export async function updateProfileName(fullName: string) {
  try {
    const supabase = await createClient()
    
    // Get current user with getUser() for security
    const { data: { user }, error: userError } = await supabase.auth.getUser()
    
    if (userError || !user) {
      return { error: 'You must be logged in to update your profile' }
    }
    
    // Update profiles table directly (Split Storage Strategy)
    const { error: profileUpdateError } = await supabase
      .from('profiles')
      .update({ full_name: fullName, updated_at: new Date().toISOString() })
      .eq('id', user.id)
    
    if (profileUpdateError) {
      console.error('Error updating profile name:', profileUpdateError)
      return { error: profileUpdateError.message }
    }
    
    // Revalidate settings page
    revalidatePath('/settings')
    
    return { success: true }
  } catch (error) {
    console.error('Unexpected error updating name:', error)
    return { error: 'An unexpected error occurred' }
  }
}

// Update user's avatar
export async function updateProfileAvatar(formData: FormData) {
  try {
    const supabase = await createClient()
    
    // Get current user with getUser() for security
    const { data: { user }, error: userError } = await supabase.auth.getUser()
    
    if (userError || !user) {
      return { error: 'You must be logged in to update your profile' }
    }
    
    // Get file from form data
    const avatarFile = formData.get('avatar') as File
    
    if (!avatarFile) {
      return { error: 'No avatar file provided' }
    }
    
    // Check file size (2MB limit)
    if (avatarFile.size > 2 * 1024 * 1024) {
      return { error: 'Avatar image must be less than 2MB' }
    }
    
    // Get the current profile to check for existing avatar
    const { data: profile } = await supabase
      .from('profiles')
      .select('avatar_path')
      .eq('id', user.id)
      .single()
    
    const oldAvatarPath = profile?.avatar_path
    
    // Generate a random filename without user ID to protect privacy
    const fileExt = avatarFile.name.split('.').pop()
    const randomId = Math.random().toString(36).substring(2)
    const timestamp = Date.now()
    const fileName = `avatar-${randomId}-${timestamp}.${fileExt}`
    
    // Upload avatar to Supabase Storage
    const { data: uploadData, error: uploadError } = await supabase
      .storage
      .from('avatars')
      .upload(fileName, avatarFile, {
        cacheControl: '3600',
        upsert: true
      })
    
    if (uploadError) {
      console.error('Error uploading avatar:', uploadError)
      return { error: uploadError.message }
    }
    
    // Store the file path
    const avatarPath = uploadData.path
    
    // Get public URL 
    const { data: publicUrlData } = supabase
      .storage
      .from('avatars')
      .getPublicUrl(avatarPath)
    
    const publicUrl = publicUrlData?.publicUrl
    
    if (!publicUrl) {
      return { error: 'Failed to generate public URL for avatar' }
    }
    
    // Update profiles table directly (Split Storage Strategy)
    const { error: profileUpdateError } = await supabase
      .from('profiles')
      .update({ 
        avatar_path: avatarPath,
        avatar_url: publicUrl,
        updated_at: new Date().toISOString()
      })
      .eq('id', user.id)
    
    if (profileUpdateError) {
      console.error('Error updating profile with avatar:', profileUpdateError)
      return { error: profileUpdateError.message }
    }
    
    // Delete the old avatar file if it exists
    if (oldAvatarPath && oldAvatarPath !== avatarPath) {
      const { error: deleteError } = await supabase
        .storage
        .from('avatars')
        .remove([oldAvatarPath])
      
      if (deleteError) {
        console.error('Error deleting old avatar:', deleteError)
      }
    }
    
    // Revalidate settings page
    revalidatePath('/settings')
    
    return { 
      success: true,
      avatarUrl: publicUrl
    }
  } catch (error) {
    console.error('Unexpected error updating avatar:', error)
    return { error: 'An unexpected error occurred' }
  }
}

// Remove user's avatar
export async function removeProfileAvatar() {
  try {
    const supabase = await createClient()
    
    // Get current user with getUser() for security
    const { data: { user }, error: userError } = await supabase.auth.getUser()
    
    if (userError || !user) {
      return { error: 'You must be logged in to update your profile' }
    }
    
    // Get current avatar path from profiles
    const { data: profile } = await supabase
      .from('profiles')
      .select('avatar_path')
      .eq('id', user.id)
      .single()
    
    const avatarPath = profile?.avatar_path
    
    if (!avatarPath) {
      return { error: 'No avatar to remove' }
    }
    
    // Delete file from storage
    const { error: removeError } = await supabase
      .storage
      .from('avatars')
      .remove([avatarPath])
    
    if (removeError) {
      console.error('Error removing avatar file from storage:', removeError)
    }
    
    // Update profiles table directly (Split Storage Strategy)
    const { error: profileUpdateError } = await supabase
      .from('profiles')
      .update({ 
        avatar_path: null,
        avatar_url: null,
        updated_at: new Date().toISOString()
      })
      .eq('id', user.id)
    
    if (profileUpdateError) {
      console.error('Error updating profile to remove avatar:', profileUpdateError)
      return { error: profileUpdateError.message }
    }
    
    // Revalidate settings page
    revalidatePath('/settings')
    
    return { success: true }
  } catch (error) {
    console.error('Unexpected error removing avatar:', error)
    return { error: 'An unexpected error occurred' }
  }
}