import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'

export async function POST() {
  const supabase = await createClient()
  
  // Sign out the user
  await supabase.auth.signOut()
  
  // Redirect to the home page
  return NextResponse.redirect(new URL('/', process.env.NEXT_PUBLIC_SITE_URL!), {
    status: 302,
  })
}