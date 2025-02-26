// src/data/pricing-plans.ts

export interface PricingPlan {
    name: string;
    description: string;
    price: string;
    features: string[];
    buttonText: string;
  }
  
  export const pricingPlans: PricingPlan[] = [
    {
      name: "Personal",
      description: "Perfect for solo professionals seeking to stay organized.",
      price: "$15",
      features: [
        "Unlimited file tracking",
        "Basic sharing options",
        "Community support",
        "1 GB cloud storage",
        "Analytics dashboard",
      ],
      buttonText: "Get started",
    },
    {
      name: "Pro",
      description: "Designed for growing teams with advanced collaboration needs.",
      price: "$150",
      features: [
        "Everything in Personal",
        "Unlimited storage",
        "Team collaboration",
        "Custom branding",
        "Advanced analytics",
        "Priority support",
      ],
      buttonText: "Start Trial",
    },
    {
      name: "Enterprise",
      description: "For large organizations requiring custom solutions.",
      price: "Custom",
      features: [
        "Everything in Pro",
        "SSO integration",
        "API access",
        "Dedicated account manager",
        "Custom integrations",
        "Enterprise SLA",
      ],
      buttonText: "Contact Sales",
    },
  ];