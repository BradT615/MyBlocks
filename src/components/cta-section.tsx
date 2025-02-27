// src/components/cta-section.tsx
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function CTASection() {
  return (
    <section className="py-16">
      <div className="container">
        <div className={cn(
          "flex flex-col items-center text-center",
          "bg-primary/5 dark:bg-[radial-gradient(85%_75%_at_50%_50%,#1A1A1A_0%,#080808_100%)]",
          "border border-primary/10 dark:border-primary/5",
          "rounded-xl p-10 md:p-16 shadow-lg"
        )}>
          <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
            Ready to organize your UI components?
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-muted-foreground">
            Join thousands of developers who use MyBlocks to boost their productivity.
          </p>
          <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
            <Button 
              asChild 
              size="lg" 
              className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-md shadow-sm hover:shadow-md transition-all"
            >
              <Link href="/register">Get Started for Free</Link>
            </Button>
            <Button 
              asChild 
              variant="outline" 
              size="lg"
              className="border-border bg-background hover:bg-accent/50 hover:text-accent-foreground/90 rounded-md shadow-sm hover:shadow-md transition-all"
            >
              <Link href="/demo">See a Demo</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}