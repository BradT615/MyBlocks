'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { MyBlocksLogo } from '@/components/MyBlocksLogo'

export default function ErrorPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center text-center">
      <MyBlocksLogo width={80} height={80} variant="filled" />
      
      <h1 className="mt-6 text-3xl font-bold">Something went wrong</h1>
      
      <p className="mt-4 max-w-md text-muted-foreground">
        We encountered an error processing your request. This could be due to an invalid or expired link, or a server issue.
      </p>
      
      <div className="mt-8 flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
        <Button asChild>
          <Link href="/">Go back home</Link>
        </Button>
        
        <Button variant="outline" asChild>
          <Link href="/login">Try signing in</Link>
        </Button>
      </div>
    </div>
  )
}