// src/components/cta-section.tsx
import Link from "next/link"
import { Button } from "@/components/ui/button"

export function CTASection() {
  return (
    <section className="bg-primary py-16 text-primary-foreground">
      <div className="container">
        <div className="flex flex-col items-center text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
            Ready to organize your UI components?
          </h2>
          <p className="mx-auto mb-8 max-w-2xl">
            Join thousands of developers who use MyBlocks to boost their productivity.
          </p>
          <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
            <Button asChild size="lg" variant="outline" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90">
              <Link href="/register">Get Started for Free</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/demo">See a Demo</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}