// src/app/page.tsx
import { Header } from "@/app/_components/header"
import { Footer } from "@/app/_components/footer"
import { HeroSection } from "@/app/_components/hero-section"
import { FeaturesSection } from "@/app/_components/features-section"
import { HowItWorksSection } from "@/app/_components/how-it-works-section"
import { PricingSection } from "@/app/_components/pricing-section"
import { FAQSection } from "@/app/_components/faq-section"
import { CTASection } from "@/app/_components/cta-section"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <Header />
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <PricingSection />
      <FAQSection />
      <CTASection />
      <Footer />
    </main>
  )
}