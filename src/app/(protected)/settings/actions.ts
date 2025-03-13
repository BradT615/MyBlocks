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
    
    // Update user metadata with new name
    const { error: updateError } = await supabase.auth.updateUser({
      data: { full_name: fullName }
    })
    
    if (updateError) {
      console.error('Error updating name:', updateError)
      return { error: updateError.message }
    }
    
    // Update profile in database too for consistency
    const { error: profileError } = await supabase
      .from('profiles')
      .update({ full_name: fullName })
      .eq('id', user.id)
    
    if (profileError) {
      console.error('Error updating profile:', profileError)
      // Not returning error here as the auth update succeeded
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
    
    // Check if user already has an avatar and get its path
    const oldAvatarPath = user.user_metadata?.avatar_path as string | undefined
    
    // Generate a random filename without user ID to protect privacy
    const fileExt = avatarFile.name.split('.').pop()
    const randomId = Math.random().toString(36).substring(2)
    const timestamp = Date.now()
    const fileName = `avatar-${randomId}-${timestamp}.${fileExt}`
    
    // Upload avatar to Supabase Storage (avatars bucket should be set as public)
    const { data: uploadData, error: uploadError } = await supabase
      .storage
      .from('avatars')
      .upload(fileName, avatarFile, {
        cacheControl: '3600',
        upsert: true // Use upsert in case user is updating an existing avatar with same name
      })
    
    if (uploadError) {
      console.error('Error uploading avatar:', uploadError)
      return { error: uploadError.message }
    }
    
    // Store the file path in user metadata
    const avatarPath = uploadData.path
    
    // Get public URL directly since bucket is public
    const { data: publicUrlData } = supabase
      .storage
      .from('avatars')
      .getPublicUrl(avatarPath)
    
    const publicUrl = publicUrlData?.publicUrl
    
    if (!publicUrl) {
      return { error: 'Failed to generate public URL for avatar' }
    }
    
    // Update user metadata with avatar info
    const { error: updateError } = await supabase.auth.updateUser({
      data: { 
        avatar_path: avatarPath,  // Keep this in metadata for reference
        avatar_url: publicUrl     // Store the public URL
      }
    })
    
    if (updateError) {
      console.error('Error updating user with avatar info:', updateError)
      return { error: updateError.message }
    }
    
    // Update profile in database with public URL
    const { error: profileError } = await supabase
      .from('profiles')
      .update({ 
        avatar_url: publicUrl
      })
      .eq('id', user.id)
    
    if (profileError) {
      console.error('Error updating profile with avatar URL:', profileError)
      return { error: `Failed to update profile: ${profileError.message}` }
    }
    
    // Delete the old avatar file if it exists
    if (oldAvatarPath && oldAvatarPath !== avatarPath) {
      // Attempt to delete the old file, but don't stop the process if deletion fails
      const { error: deleteError } = await supabase
        .storage
        .from('avatars')
        .remove([oldAvatarPath])
      
      if (deleteError) {
        // Log the error but continue with the update
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
    
    // Get current avatar path from user data
    const avatarPath = user.user_metadata?.avatar_path as string | undefined
    
    if (!avatarPath) {
      return { error: 'No avatar to remove' }
    }
    
    // Delete file from storage
    // Only the file owner should be able to delete their avatar
    // This is enforced through Supabase Storage RLS policies
    const { error: removeError } = await supabase
      .storage
      .from('avatars')
      .remove([avatarPath])
    
    if (removeError) {
      console.error('Error removing avatar file from storage:', removeError)
      // Continue with profile update even if file deletion fails
    }
    
    // Update user metadata to remove avatar info
    const { error: updateError } = await supabase.auth.updateUser({
      data: { 
        avatar_path: null,
        avatar_url: null
      }
    })
    
    if (updateError) {
      console.error('Error updating user to remove avatar:', updateError)
      return { error: updateError.message }
    }
    
    // Update profile in database to remove avatar_url
    const { error: profileError } = await supabase
      .from('profiles')
      .update({ 
        avatar_url: null
      })
      .eq('id', user.id)
    
    if (profileError) {
      console.error('Error updating profile to remove avatar:', profileError)
      return { error: `Failed to update profile: ${profileError.message}` }
    }
    
    // Revalidate settings page
    revalidatePath('/settings')
    
    return { success: true }
  } catch (error) {
    console.error('Unexpected error removing avatar:', error)
    return { error: 'An unexpected error occurred' }
  }
}