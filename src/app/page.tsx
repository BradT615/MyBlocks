// src/app/page.tsx
import { Header } from "./_components/header"
import { Footer } from "./_components/footer"
import { HeroSection } from "./_components/hero-section"
import { FeaturesSection } from "./_components/features-section"
import { HowItWorksSection } from "./_components/how-it-works-section"
import { TestimonialsSection } from "./_components/testimonials-section"
import { PricingSection } from "./_components/pricing-section"
import { FAQSection } from "./_components/faq-section"
import { CTASection } from "./_components/cta-section"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <Header />
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <FAQSection />
      <PricingSection />
      <CTASection />
      <Footer />
    </main>
  )
}