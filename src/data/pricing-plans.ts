// src/data/pricing-plans.ts

export interface PricingPlan {
  name: string;
  description: string;
  price: string;
  features: string[];
  buttonText: string;
  popularPlan?: boolean;
}

export const pricingPlans: PricingPlan[] = [
  {
    name: "Free",
    description: "For exploring the component library",
    price: "$0",
    features: [
      "Browse public component gallery",
      "Limited component uploads (5 max)",
      "Basic component preview",
      "Copy component code",
      "Basic tagging"
    ],
    buttonText: "Get Started"
  },
  {
    name: "Pro",
    description: "For individual designers & developers",
    price: "$9",
    popularPlan: true,
    features: [
      "Everything in Free tier",
      "Unlimited component uploads",
      "Light/dark mode preview",
      "Save favorite components",
      "Priority in search results",
      "Email support"
    ],
    buttonText: "Start 7-Day Trial"
  },
  {
    name: "Early Adopter",
    description: "For supporters & early feedback",
    price: "$19",
    features: [
      "Everything in Pro tier",
      "Early access to new features",
      "Vote on roadmap priorities",
      "Lifetime discount on future plans",
      "Direct chat support",
      "Custom feature request"
    ],
    buttonText: "Join Early Adopters"
  }
];