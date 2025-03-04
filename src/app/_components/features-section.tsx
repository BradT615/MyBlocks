// src/components/features-section.tsx
import { LucideIcon } from "lucide-react"
import { featuresData } from "@/data/features-data"
import { cn } from "@/lib/utils"

// FeatureCard component (internal to this file)
interface FeatureCardProps {
  icon: LucideIcon
  title: string
  description: string
}

function FeatureCard({ 
  icon: Icon, 
  title, 
  description
}: FeatureCardProps) {
  return (
    <div
      className={cn(
        "rounded-xl flex flex-col overflow-hidden relative h-full",
        "border transition-all duration-300 ease-in-out",
        "bg-card shadow-md hover:shadow-xl p-6",
        "border-border hover:scale-[1.01] hover:border-border/80",
      )}
    >
      <div className="flex flex-col items-start mb-4">
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
          <Icon className="h-6 w-6 text-primary/70" />
        </div>
        <h3 className="text-xl font-semibold text-card-foreground/90">{title}</h3>
      </div>
      <p className="text-sm text-muted-foreground">
        {description}
      </p>
    </div>
  )
}

export function FeaturesSection() {
  return (
    <section id="features" className="py-20">
      <div className="container">
        <div className="text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
            Features
          </h2>
          <p className="mx-auto mb-16 max-w-2xl text-muted-foreground">
            Everything you need to organize, access, and share your UI components.
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {featuresData.map((feature) => (
            <FeatureCard
              key={feature.title}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  )
}