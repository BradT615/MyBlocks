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
    description: "For designers exploring component libraries",
    price: "$0",
    features: [
      "Browse public component gallery",
      "Limited component uploads (5 max)",
      "Basic preview functionality",
      "Light mode theme only",
      "View component code (read-only)",
      "Community forum support"
    ],
    buttonText: "Get Started"
  },
  {
    name: "Pro",
    description: "For individual designers & developers",
    price: "$15",
    popularPlan: true,
    features: [
      "Everything in Free tier",
      "Unlimited personal component uploads",
      "Responsive previews (all viewport sizes)",
      "Light/dark mode toggles",
      "Component versioning (last 10 versions)",
      "Export to multiple frameworks",
      "Props customization interface",
      "Personal collections",
      "Email support"
    ],
    buttonText: "Start 14-Day Trial"
  },
  {
    name: "Team",
    description: "For design & development teams",
    price: "$39",
    features: [
      "Everything in Pro tier",
      "Team workspace (up to 10 members)",
      "Role-based access controls",
      "Unlimited component versioning",
      "Custom collections and organization",
      "Component usage analytics",
      "Custom theming options",
      "Design specifications export",
      "Collaborative feedback tools",
      "Priority support"
    ],
    buttonText: "Start 14-Day Trial"
  }
];