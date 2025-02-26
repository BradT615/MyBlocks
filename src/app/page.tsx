// src/app/page.tsx
import Link from "next/link"
import { 
  Code, 
  CodeXml, 
  FileCode, 
  LucideIcon, 
  Palette, 
  Repeat, 
  Search, 
  Share2
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { FeatureCard } from "@/components/feature-card"
import { TestimonialCard } from "@/components/testimonial-card"
import { PricingSection } from "@/components/pricing-section"

// Feature data
const features: { icon: LucideIcon; title: string; description: string }[] = [
  {
    icon: Code,
    title: "Component Storage",
    description: 
      "Save your favorite UI components with their code snippets in one centralized place.",
  },
  {
    icon: Palette,
    title: "Style Organization",
    description: 
      "Keep your design tokens, color palettes, and styling preferences organized and accessible.",
  },
  {
    icon: Search,
    title: "Quick Search",
    description: 
      "Find exactly what you need with our powerful search and tagging system.",
  },
  {
    icon: FileCode,
    title: "Syntax Highlighting",
    description: 
      "View your code with beautiful syntax highlighting for better readability.",
  },
  {
    icon: Repeat,
    title: "Version History",
    description: 
      "Track changes to your components with complete version history and restore previous versions.",
  },
  {
    icon: Share2,
    title: "Sharing & Collaboration",
    description: 
      "Share components with your team or make them public for the community.",
  },
];

// Testimonial data
const testimonials = [
  {
    quote: "MyBlocks has completely changed how I organize my UI components. I can quickly find and reuse code that I&apos;ve written before, saving me countless hours.",
    author: "Sarah Johnson",
    role: "Frontend Developer",
  },
  {
    quote: "As a designer who codes, keeping track of my components was always a challenge. MyBlocks bridges the gap perfectly, letting me store both design tokens and implementation.",
    author: "Marcus Chen",
    role: "UI/UX Designer",
  },
  {
    quote: "Our team&apos;s productivity increased by 40% after we started using MyBlocks. The ability to share and collaborate on components is game-changing.",
    author: "Jessica Williams",
    role: "Engineering Manager",
  },
];

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <Header />

      {/* Hero Section */}
      <section className="hero-gradient py-20 md:py-32">
        <div className="container">
          <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
            <div>
              <h1 className="mb-6 text-4xl font-extrabold tracking-tight md:text-5xl lg:text-6xl">
                Store and retrieve your <span className="gradient-text">favorite UI&nbsp;components</span>
              </h1>
              <p className="mb-8 max-w-md text-lg text-muted-foreground">
                MyBlocks helps developers organize, store, and retrieve their code snippets and 
                UI components in one centralized place.
              </p>
              <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
                <Button asChild size="lg">
                  <Link href="/register">Get Started</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/demo">View Demo</Link>
                </Button>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="relative h-80 w-full max-w-lg overflow-hidden rounded-lg border shadow-xl">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-500/10 to-gray-400/10 backdrop-blur-sm">
                  <div className="p-8">
                    <div className="flex items-center mb-6">
                      <CodeXml className="h-8 w-8 text-primary" />
                      <div className="ml-4">
                        <div className="h-4 w-32 rounded bg-primary/20"></div>
                        <div className="mt-2 h-3 w-24 rounded bg-primary/10"></div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="h-12 rounded bg-primary/5 flex items-center px-4">
                        <div className="h-6 w-6 rounded-full bg-primary/10"></div>
                        <div className="ml-3 h-4 w-40 rounded bg-primary/20"></div>
                      </div>
                      <div className="h-12 rounded bg-primary/10 flex items-center px-4">
                        <div className="h-6 w-6 rounded-full bg-primary/15"></div>
                        <div className="ml-3 h-4 w-36 rounded bg-primary/20"></div>
                      </div>
                      <div className="h-12 rounded bg-primary/5 flex items-center px-4">
                        <div className="h-6 w-6 rounded-full bg-primary/10"></div>
                        <div className="ml-3 h-4 w-32 rounded bg-primary/20"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
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
            {features.map((feature) => (
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

      {/* How It Works Section */}
      <section id="benefits" className="py-20 bg-muted/50">
        <div className="container">
          <div className="text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
              How It Works
            </h2>
            <p className="mx-auto mb-16 max-w-2xl text-muted-foreground">
              A simple workflow to boost your productivity.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
            <div className="flex flex-col items-center text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-6">
                <Code className="h-8 w-8 text-primary" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">1. Create & Store</h3>
              <p className="text-muted-foreground">
                Save your UI components, code snippets, and styles with detailed descriptions and tags.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-6">
                <Search className="h-8 w-8 text-primary" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">2. Search & Find</h3>
              <p className="text-muted-foreground">
                Quickly locate what you need using our powerful search, filters, and organization tools.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-6">
                <Share2 className="h-8 w-8 text-primary" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">3. Reuse & Share</h3>
              <p className="text-muted-foreground">
                Easily reuse components in your projects or share them with your team members.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20">
        <div className="container">
          <div className="text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
              What Developers Say
            </h2>
            <p className="mx-auto mb-16 max-w-2xl text-muted-foreground">
              Join thousands of developers who use MyBlocks daily for their workflow.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {testimonials.map((testimonial) => (
              <TestimonialCard
                key={testimonial.author}
                quote={testimonial.quote}
                author={testimonial.author}
                role={testimonial.role}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section - Now a separate component */}
      <PricingSection />

      {/* FAQ Section */}
      <section id="faq" className="py-20">
        <div className="container">
          <div className="text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
              Frequently Asked Questions
            </h2>
            <p className="mx-auto mb-16 max-w-2xl text-muted-foreground">
              Have questions? We have answers.
            </p>
          </div>
          <div className="mx-auto max-w-3xl">
            <div className="space-y-6">
              <div className="rounded-lg border p-6">
                <h3 className="mb-3 text-lg font-medium">Can I use MyBlocks for free?</h3>
                <p className="text-muted-foreground">
                  Yes, we offer a generous free tier that allows you to store up to 50 components with basic features. It&apos;s perfect for solo developers or those just getting started.
                </p>
              </div>
              <div className="rounded-lg border p-6">
                <h3 className="mb-3 text-lg font-medium">How does team sharing work?</h3>
                <p className="text-muted-foreground">
                  With our Pro and Enterprise plans, you can create teams and selectively share components. You can set different permission levels for viewing, editing, or managing components.
                </p>
              </div>
              <div className="rounded-lg border p-6">
                <h3 className="mb-3 text-lg font-medium">Can I integrate MyBlocks with my existing tools?</h3>
                <p className="text-muted-foreground">
                  Yes, our Enterprise plan includes API access and custom integrations for popular development tools and workflows. We also offer extensions for VS Code and other editors.
                </p>
              </div>
              <div className="rounded-lg border p-6">
                <h3 className="mb-3 text-lg font-medium">Is my code secure on your platform?</h3>
                <p className="text-muted-foreground">
                  Absolutely. We implement industry-standard security practices to protect your code. Private components are only visible to you and those you explicitly grant access to.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary py-16 text-primary-foreground">
        <div className="container">
          <div className="flex flex-col items-center text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
              Ready to organize your UI components?
            </h2>
            <p className="mx-auto mb-8 max-w-2xl">
              Join thousands of developers who use MyBlocks to boost their productivity.
            </p>
            <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
              <Button asChild size="lg" variant="outline" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90">
                <Link href="/register">Get Started for Free</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/demo">See a Demo</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}