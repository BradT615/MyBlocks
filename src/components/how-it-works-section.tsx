// src/components/how-it-works-section.tsx
import { howItWorksData } from "@/data/how-it-works-data"

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
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
          {howItWorksData.map((step) => (
            <div key={step.title} className="flex flex-col items-center text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-6">
                <step.icon className="h-8 w-8 text-primary" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">{step.title}</h3>
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