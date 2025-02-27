"use client"

import { useState } from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { pricingPlans } from "@/data/pricing-plans"

// PricingCard component (internal to this file)
interface PricingCardProps {
  name: string
  description: string
  price: string
  features: string[]
  active?: boolean
  buttonText?: string
  onSelect?: () => void
}

function PricingCard({
  name,
  description,
  price,
  features,
  active = false,
  buttonText = "Get Started",
  onSelect,
}: PricingCardProps) {
  return (
    <div 
      className={cn(
        "rounded-xl flex flex-col overflow-hidden relative",
        "border transition-all duration-300 ease-in-out cursor-pointer",
        "bg-card shadow-md hover:shadow-xl",
        active 
          ? "border-primary/20 dark:border-primary/20 transform scale-[1.03] shadow-xl ring-1 ring-primary/20 dark:bg-[radial-gradient(85%_75%_at_50%_-10%,#212121_0%,#080808_100%)]" 
          : "border-border hover:scale-[1.01] hover:border-border/80",
      )}
      onClick={onSelect}
    >
          
      <div className="p-6">
        <div className="mb-4">
          <h3 className="text-xl font-medium text-card-foreground">{name}</h3>
          <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        </div>
        
        <div className="mb-6">
          <div className="flex items-baseline">
            <span className="text-2xl font-medium text-card-foreground">{price}</span>
            {price !== "Custom" && <span className="ml-1 text-sm text-muted-foreground">/month</span>}
          </div>
        </div>
        
        <a 
          href="/register" 
          className={cn(
            "block w-full py-2 px-6 text-center rounded-lg text-sm font-medium transition-all duration-100",
            active 
              ? "bg-primary text-primary-foreground hover:bg-primary/80 border border-primary" 
              : "bg-secondary text-secondary-foreground hover:bg-secondary/80 border border-secondary"
          )}
        >
          {buttonText}
        </a>
      </div>
      
      <div className="h-px w-10/12 mx-auto bg-border"></div>
      
      <div className="p-6">
        <ul className="space-y-4">
          {features.map((feature) => (
            <li key={feature} className="flex items-center">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 256 256" 
                focusable="false" 
                className={cn(
                  "w-5 h-5 mr-3 flex-shrink-0 transition-colors duration-300",
                  active ? "text-primary" : "text-accent-foreground/70"
                )}
              >
                <g>
                  <path d="M229.66,77.66l-128,128a8,8,0,0,1-11.32,0l-56-56a8,8,0,0,1,11.32-11.32L96,188.69,218.34,66.34a8,8,0,0,1,11.32,11.32Z" fill="currentColor"></path>
                </g>
              </svg>
              <span className={cn(
                "text-sm", 
                active ? "text-card-foreground" : "text-card-foreground/70"
              )}>
                {feature}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

// Main PricingSection component (exported)
export function PricingSection() {
  const [selectedPlan, setSelectedPlan] = useState<string>("Pro")

  return (
    <section id="pricing" className="py-20 bg-background">
      <div className="container">
        <div className="text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl text-foreground">
            Pricing Plans
          </h2>
          <p className="mx-auto mb-16 max-w-2xl text-muted-foreground">
            Choose the plan that fits your needs, from solo developers to large teams.
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          {pricingPlans.map((plan) => (
            <PricingCard
              key={plan.name}
              name={plan.name}
              description={plan.description}
              price={plan.price}
              features={plan.features}
              active={selectedPlan === plan.name}
              buttonText={plan.buttonText}
              onSelect={() => setSelectedPlan(plan.name)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}