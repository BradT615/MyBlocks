import { redirect } from 'next/navigation'
import { createClient } from "@/utils/supabase/server"
import { SettingsClient } from './_components/settings-client'
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Settings | MyBlocks",
  description: "Manage your account settings",
}

// Get user profile data from Supabase with auth.users as primary source
async function getUserProfile() {
  const supabase = await createClient()
  
  // Get current authenticated user using getUser() for security
  const { data: { user }, error: userError } = await supabase.auth.getUser()
  
  if (userError || !user) {
    return null
  }
  
  // Get user profile data as a fallback
  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()
  
  // Prioritize auth.users data over profiles table
  // This ensures consistency with what's shown in the user account navigation
  return {
    id: user.id,
    email: user.email || '',
    // Use auth.users metadata as primary source
    full_name: profile?.full_name || null,
    avatar_url: profile?.avatar_url || null,
    avatar_path: profile?.avatar_path || null
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