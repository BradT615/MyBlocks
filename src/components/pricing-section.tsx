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
        "rounded-xl flex flex-col overflow-hidden relative", // Added relative positioning
        "border-1 border-border dark:border-[rgba(255,255,255,0.1)]",
        "bg-card", // Removed the gradient from here
        "transition-all duration-300 ease-in-out cursor-pointer",
        "shadow-md hover:shadow-xl",
        active ? 
          "ring-1 ring-[rgba(255,255,255,0.2)] transform scale-[1.03] shadow-xl hover:scale-[1.03]" : 
          "hover:scale-[1.02]"
      )}
      onClick={onSelect}
      style={{
        // Using a simplified gradient with just two color stops to prevent banding
        backgroundImage: `radial-gradient(100% 75% at 12.9% -19.7%, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.03) 100%)`,
      }}
    >
      
      <div className="p-6">
        <div className="mb-4">
          <h3 className="text-xl font-medium text-foreground">{name}</h3>
          <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        </div>
        
        <div className="mb-6">
          <div className="flex items-baseline">
            <span className="text-2xl font-medium text-foreground/90">{price}</span>
            {price !== "Custom" && <span className="ml-1 text-sm text-foreground/70">/year</span>}
          </div>
        </div>
        
        <a 
          href="/register" 
          className={cn(
            "block w-full py-2 px-4 text-center rounded-lg text-sm font-medium transition-all duration-100",
            "border border-gray-200 dark:border-transparent",
            active 
              ? "bg-primary text-primary-foreground hover:bg-primary/90 border-primary" 
              : "bg-white/15 hover:bg-white/20 text-foreground hover:shadow-md dark:bg-white/15 bg-gray-50"
          )}
        >
          {buttonText}
        </a>
      </div>
      
      <div className="h-px w-10/12 mx-auto bg-[rgba(229,229,229,0.1)]"></div>
      
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
                  active ? "text-primary" : "text-foreground/70"
                )}
              >
                <g>
                  <path d="M229.66,77.66l-128,128a8,8,0,0,1-11.32,0l-56-56a8,8,0,0,1,11.32-11.32L96,188.69,218.34,66.34a8,8,0,0,1,11.32,11.32Z" fill="currentColor"></path>
                </g>
              </svg>
              <span className={cn(
                "text-sm", 
                active ? "text-foreground" : "text-foreground/70"
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
    <section id="pricing" className="py-20 bg-muted/50">
      <div className="container">
        <div className="text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
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