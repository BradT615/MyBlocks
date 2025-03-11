// src/middleware.ts
import { type NextRequest, NextResponse } from 'next/server'
import { updateSession } from '@/utils/supabase/middleware'

export async function middleware(request: NextRequest) {
  // Add a check to exclude API routes from authentication
  if (request.nextUrl.pathname.startsWith('/api/')) {
    // Skip authentication for API routes
    return NextResponse.next()
  }
  
  // All other routes go through the authentication check
  return await updateSession(request)
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|favicon-light.ico|favicon-dark.ico|manifest.webmanifest|api/|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}