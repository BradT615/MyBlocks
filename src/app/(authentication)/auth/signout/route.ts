import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'

export async function POST() {
  try {
    const supabase = await createClient()
    
    // Sign out the user
    await supabase.auth.signOut()
    
    // Clear all auth cookies
    // In Next.js 14, cookies() returns a Promise
    const cookieStore = await cookies()
    
    // Get all cookies and filter for Supabase cookies
    const supabaseCookies = cookieStore.getAll()
      .filter(cookie => cookie.name.startsWith('sb-'))
    
    // Delete each Supabase cookie
    for (const cookie of supabaseCookies) {
      cookieStore.delete(cookie.name)
    }
    
    // Return success response
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error during sign out:', error)
    return NextResponse.json({ error: 'Sign out failed' }, { status: 500 })
  }
}