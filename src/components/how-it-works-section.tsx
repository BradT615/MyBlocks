// src/components/how-it-works-section.tsx
import { howItWorksData } from "@/data/how-it-works-data"
import { cn } from "@/lib/utils"

export function HowItWorksSection() {
  return (
    <section id="benefits" className="py-20 bg-muted/50">
      <div className="container">
        <div className="text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
            How It Works
          </h2>
          <p className="mx-auto mb-16 max-w-2xl text-muted-foreground">
            A simple workflow to boost your productivity.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {howItWorksData.map((step) => (
            <div 
              key={step.title} 
              className={cn(
                "rounded-xl flex flex-col items-center text-center p-8",
                "border border-border transition-all duration-300 ease-in-out",
                "bg-card shadow-md hover:shadow-xl hover:scale-[1.01]"
              )}
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-6">
                <step.icon className="h-8 w-8 text-primary/70" />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-card-foreground/90">
                {step.title}
              </h3>
              <p className="text-muted-foreground">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}