import { Metadata } from "next"
import Link from "next/link"
import { redirect } from "next/navigation"
import { createClient } from "@/utils/supabase/server"
import { MyBlocksLogo } from "@/components/MyBlocksLogo"
import { ArrowLeft } from "lucide-react"
import { RegisterClientPage } from "@/components/auth/register-client-page"

export const metadata: Metadata = {
  title: "Create an Account | MyBlocks",
  description: "Create a new MyBlocks account",
}

export default async function RegisterPage() {
  const supabase = await createClient()
  
  // Check if user is already logged in
  const { data: { user } } = await supabase.auth.getUser()
  
  // If already logged in, redirect to dashboard
  if (user) {
    redirect('/dashboard')
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-between">
      {/* Responsive Header */}
      <header className="fixed top-0 left-0 right-0 p-6 z-20">
        <div className="max-w-7xl">
          <Link
            href="/"
            className="group flex items-center gap-2 transition-all hover:opacity-80"
          >
            <span className="hidden md:inline-flex items-center gap-2">
              <MyBlocksLogo width={36} height={36} variant="filled" className="text-primary" />
              <span className="text-xl font-bold">
                MyBlocks
              </span>
            </span>
            <span className="md:hidden flex items-center gap-1.5 text-muted-foreground hover:text-foreground">
              <ArrowLeft className="h-5 w-5" />
              <span className="text-sm font-medium">Back</span>
            </span>
          </Link>
        </div>
      </header>

      <div className="h-12 w-full"></div>
      
      <div className="relative w-full max-w-md px-4 pb-8 sm:py-12 sm:px-8">
        <RegisterClientPage />
      </div>
      
      <footer className="h-12 flex w-full items-center justify-center text-center text-sm text-muted-foreground">
        &copy; {new Date().getFullYear()} MyBlocks. All rights reserved.
      </footer>
    </div>
  )
}