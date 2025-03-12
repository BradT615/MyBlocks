'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/utils/supabase/server'

// Update user's email - with OTP verification
export async function updateProfileEmail(email: string, sendOtpOnly = false, otp?: string) {
  try {
    const supabase = await createClient()
    
    // Get current user
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

    // Step 1: If we're just sending the OTP
    if (sendOtpOnly) {
      // Request OTP by initiating email change with signInWithOtp
      const { error: otpError } = await supabase.auth.updateUser({
        email,
      })

      if (otpError) {
        console.error('Error sending OTP for email update:', otpError)
        return { error: otpError.message }
      }

      return { success: true, message: 'Verification code sent' }
    }
    
    // Step 2: If we have the OTP, verify and complete the update
    if (!sendOtpOnly && otp) {
      // Verify OTP
      const { error: verifyError } = await supabase.auth.verifyOtp({
        email,
        token: otp,
        type: 'email'
      })

      if (verifyError) {
        console.error('Error verifying OTP for email update:', verifyError)
        return { error: verifyError.message || 'Invalid verification code' }
      }

      // After successful verification, update user's email
      const { error: updateError } = await supabase.auth.updateUser({
        email: email,
      })
      
      if (updateError) {
        console.error('Error updating email:', updateError)
        return { error: updateError.message }
      }
      
      // Revalidate settings page
      revalidatePath('/settings')
      
      return { success: true }
    }

    // Neither sending OTP nor verifying - invalid state
    return { error: 'Invalid request state' }
  } catch (error) {
    console.error('Unexpected error updating email:', error)
    return { error: 'An unexpected error occurred' }
  }
}

// Update user's display name
export async function updateProfileName(fullName: string) {
  try {
    const supabase = await createClient()
    
    // Get current user
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
    // Based on the README, profiles table is synced with auth.users via triggers
    // But let's update it directly as well to ensure consistency
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
    
    // Get current user
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
    
    // Upload avatar to Supabase Storage
    const fileName = `${user.id}-${Date.now()}.${avatarFile.name.split('.').pop()}`
    const { data: uploadData, error: uploadError } = await supabase
      .storage
      .from('avatars')
      .upload(fileName, avatarFile, {
        cacheControl: '3600',
        upsert: false
      })
    
    if (uploadError) {
      console.error('Error uploading avatar:', uploadError)
      return { error: uploadError.message }
    }
    
    // Get public URL for the uploaded avatar
    const { data: { publicUrl } } = supabase
      .storage
      .from('avatars')
      .getPublicUrl(uploadData.path)
    
    // Update user metadata with new avatar URL
    const { error: updateError } = await supabase.auth.updateUser({
      data: { avatar_url: publicUrl }
    })
    
    if (updateError) {
      console.error('Error updating user with avatar URL:', updateError)
      return { error: updateError.message }
    }
    
    // Update profile in database too
    const { error: profileError } = await supabase
      .from('profiles')
      .update({ avatar_url: publicUrl })
      .eq('id', user.id)
    
    if (profileError) {
      console.error('Error updating profile with avatar URL:', profileError)
      // Not returning error here as the auth update succeeded
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
    
    // Get current user
    const { data: { user }, error: userError } = await supabase.auth.getUser()
    
    if (userError || !user) {
      return { error: 'You must be logged in to update your profile' }
    }
    
    // Get current avatar URL from user data
    const avatarUrl = user.user_metadata?.avatar_url as string | undefined
    
    if (!avatarUrl) {
      return { error: 'No avatar to remove' }
    }
    
    // Extract filename from URL
    const urlParts = avatarUrl.split('/')
    const fileName = urlParts[urlParts.length - 1]
    
    // Delete file from storage if it's in our storage bucket
    // This is a best-effort operation - we'll update the profile even if this fails
    if (avatarUrl.includes('avatars')) {
      try {
        await supabase
          .storage
          .from('avatars')
          .remove([fileName])
      } catch (err) {
        console.error('Error removing avatar file from storage:', err)
        // Continue with profile update even if file deletion fails
      }
    }
    
    // Update user metadata to remove avatar URL
    const { error: updateError } = await supabase.auth.updateUser({
      data: { avatar_url: null }
    })
    
    if (updateError) {
      console.error('Error updating user to remove avatar:', updateError)
      return { error: updateError.message }
    }
    
    // Update profile in database too
    const { error: profileError } = await supabase
      .from('profiles')
      .update({ avatar_url: null })
      .eq('id', user.id)
    
    if (profileError) {
      console.error('Error updating profile to remove avatar:', profileError)
      // Not returning error here as the auth update succeeded
    }
    
    // Revalidate settings page
    revalidatePath('/settings')
    
    return { success: true }
  } catch (error) {
    console.error('Unexpected error removing avatar:', error)
    return { error: 'An unexpected error occurred' }
  }
}