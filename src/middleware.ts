import { type NextRequest } from 'next/server'
import { updateSession } from '@/utils/supabase/middleware'

export async function middleware(request: NextRequest) {
  return await updateSession(request)
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, favicon-light.ico, favicon-dark.ico (favicon files)
     * - manifest.webmanifest (PWA manifest)
     * - images, public directories
     * - any files with extensions (.svg, .jpg, etc)
     */
    '/((?!_next/static|_next/image|favicon.ico|favicon-light.ico|favicon-dark.ico|manifest.webmanifest|images|public|.*\\..*$).*)',
  ],
}