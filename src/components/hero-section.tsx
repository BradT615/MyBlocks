// src/components/hero-section.tsx
import Link from "next/link"
import { CodeXml } from "lucide-react"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section className="hero-gradient py-20 md:py-32">
      <div className="container">
        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
          <div>
            <h1 className="mb-6 text-4xl font-extrabold tracking-tight md:text-5xl lg:text-6xl">
              Store and retrieve your <span className="gradient-text">favorite UI&nbsp;components</span>
            </h1>
            <p className="mb-8 max-w-md text-lg text-muted-foreground">
              MyBlocks helps developers organize, store, and retrieve their code snippets and 
              UI components in one centralized place.
            </p>
            <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
              <Button asChild size="lg">
                <Link href="/register">Get Started</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/demo">View Demo</Link>
              </Button>
            </div>
          </div>
          <div className="flex justify-center">
            <div className="relative h-80 w-full max-w-lg overflow-hidden rounded-lg border shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-br from-gray-500/10 to-gray-400/10 backdrop-blur-sm">
                <div className="p-8">
                  <div className="flex items-center mb-6">
                    <CodeXml className="h-8 w-8 text-primary" />
                    <div className="ml-4">
                      <div className="h-4 w-32 rounded bg-primary/20"></div>
                      <div className="mt-2 h-3 w-24 rounded bg-primary/10"></div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="h-12 rounded bg-primary/5 flex items-center px-4">
                      <div className="h-6 w-6 rounded-full bg-primary/10"></div>
                      <div className="ml-3 h-4 w-40 rounded bg-primary/20"></div>
                    </div>
                    <div className="h-12 rounded bg-primary/10 flex items-center px-4">
                      <div className="h-6 w-6 rounded-full bg-primary/15"></div>
                      <div className="ml-3 h-4 w-36 rounded bg-primary/20"></div>
                    </div>
                    <div className="h-12 rounded bg-primary/5 flex items-center px-4">
                      <div className="h-6 w-6 rounded-full bg-primary/10"></div>
                      <div className="ml-3 h-4 w-32 rounded bg-primary/20"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}