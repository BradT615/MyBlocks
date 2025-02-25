// src/components/pricing-card.tsx
import { Check } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface PricingCardProps {
  name: string
  description: string
  price: string
  features: string[]
  popular?: boolean
  buttonText?: string
  buttonVariant?: "default" | "outline"
}

export function PricingCard({
  name,
  description,
  price,
  features,
  popular = false,
  buttonText = "Get Started",
  buttonVariant = "default",
}: PricingCardProps) {
  return (
    <Card className={cn(
      "flex flex-col border-2",
      popular 
        ? "border-primary shadow-lg scale-105 relative" 
        : "border-border"
    )}>
      {popular && (
        <div className="absolute -top-5 left-0 right-0 mx-auto w-32 rounded-full bg-primary px-3 py-1 text-center text-sm font-medium text-primary-foreground">
          Most Popular
        </div>
      )}
      
      <CardHeader>
        <CardTitle className="text-xl">{name}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        <div className="mb-6">
          <span className="text-4xl font-bold">{price}</span>
          {price !== "Custom" && <span className="text-sm text-muted-foreground">/month</span>}
        </div>
        <ul className="space-y-3">
          {features.map((feature) => (
            <li key={feature} className="flex items-center">
              <Check className="mr-2 h-4 w-4 text-primary" />
              <span className="text-sm">{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button 
          asChild 
          variant={buttonVariant} 
          className={cn("w-full", popular ? "" : "")}
        >
          <Link href="/register">{buttonText}</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}