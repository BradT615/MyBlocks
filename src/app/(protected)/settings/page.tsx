import { redirect } from 'next/navigation'
import { createClient } from "@/utils/supabase/server"
import { SettingsClient } from './_components/settings-client'
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Settings | MyBlocks",
  description: "Manage your account settings",
}

// Get user profile data from Supabase
async function getUserProfile() {
  const supabase = await createClient()
  
  // Get current authenticated user
  const { data: { user }, error: userError } = await supabase.auth.getUser()
  
  if (userError || !user) {
    return null
  }
  
  // Get user profile data
  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()
  
  if (profileError || !profile) {
    // User is authenticated but profile not found - this shouldn't happen
    // due to trigger function that creates profile on signup,
    // but let's handle it gracefully
    console.error('Profile not found for authenticated user:', profileError)
    return {
      id: user.id,
      email: user.email || '',
      fullName: user.user_metadata?.full_name || '',
      avatarUrl: user.user_metadata?.avatar_url || null
    }
  }
  
  return {
    id: user.id,
    email: user.email || '',
    fullName: profile.full_name || '',
    avatarUrl: profile.avatar_url || null
  }
}

export default async function SettingsPage() {
  const profile = await getUserProfile()
  
  // If no profile or user, redirect to login
  if (!profile) {
    redirect('/login')
  }
  
  return <SettingsClient profile={profile} />
}