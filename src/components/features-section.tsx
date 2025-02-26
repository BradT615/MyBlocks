// src/components/features-section.tsx
import { LucideIcon } from "lucide-react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { featuresData } from "@/data/features-data"

// FeatureCard component (internal to this file)
interface FeatureCardProps {
  icon: LucideIcon
  title: string
  description: string
}

function FeatureCard({ icon: Icon, title, description }: FeatureCardProps) {
  return (
    <Card className="border-none shadow-md transition-all duration-200 hover:shadow-lg">
      <CardHeader>
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
          <Icon className="h-6 w-6 text-primary" />
        </div>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-md">{description}</CardDescription>
      </CardContent>
    </Card>
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