// src/components/ModernLandingPage.tsx
"use client"

import React, { useState } from "react"
import { motion } from "motion/react"
import { cn } from "@/lib/utils"
import Image from "next/image";
import Link from "next/link"
import { 
  Github, 
  Menu, 
  X, 
  Code, 
  Layers, 
  Lock, 
  Eye, 
  LucideGithub 
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { MyBlocksLogo } from "@/components/MyBlocksLogo"

import { LucideIcon } from "lucide-react";
import { ReactNode } from "react";

// GlassCard component with TypeScript types
interface GlassCardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

const GlassCard = ({ children, className, delay = 0 }: GlassCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ 
      duration: 0.7, 
      ease: [0.22, 1, 0.36, 1],
      delay 
    }}
    className={cn(
      "backdrop-blur-md border border-white/10",
      "bg-white/5 dark:bg-black/10",
      "shadow-xl rounded-2xl overflow-hidden",
      className
    )}
  >
    {children}
  </motion.div>
);

// Section Header animation with TypeScript types
interface AnimatedHeaderProps {
  children: ReactNode;
  delay?: number;
}

const AnimatedHeader = ({ children, delay = 0 }: AnimatedHeaderProps) => (
  <motion.h2
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ 
      duration: 0.7, 
      ease: [0.22, 1, 0.36, 1],
      delay 
    }}
    className="text-3xl md:text-4xl font-bold text-foreground mb-6"
  >
    {children}
  </motion.h2>
);

// Feature Card with TypeScript types
interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  index: number;
}

const FeatureCard = ({ icon: Icon, title, description, index }: FeatureCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ 
      duration: 0.5, 
      ease: [0.22, 1, 0.36, 1],
      delay: 0.1 * index 
    }}
    className="bg-white/5 dark:bg-black/10 backdrop-blur-md p-6 md:p-8 rounded-2xl border border-white/10 shadow-lg"
  >
    <div className="w-12 h-12 bg-gradient-to-tr from-gray-800 to-gray-600 dark:from-gray-300 dark:to-gray-500 rounded-full flex items-center justify-center mb-4 text-white dark:text-gray-900">
      <Icon size={24} />
    </div>
    <h3 className="text-xl font-semibold mb-3 text-foreground">{title}</h3>
    <p className="text-muted-foreground">{description}</p>
  </motion.div>
);

// Code mock animation
const CodeMock = () => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
    className="bg-black/80 border border-gray-800 rounded-xl overflow-hidden shadow-2xl"
  >
    <div className="border-b border-gray-800 flex items-center p-4">
      <div className="flex space-x-2">
        <div className="w-3 h-3 rounded-full bg-red-500"></div>
        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
        <div className="w-3 h-3 rounded-full bg-green-500"></div>
      </div>
      <div className="mx-auto text-xs text-gray-400">ButtonComponent.jsx</div>
    </div>
    <div className="p-6 font-mono text-sm text-gray-300">
      <div className="text-blue-400">import <span className="text-white">React</span> from <span className="text-green-400">&apos;react&apos;</span>;</div>
      <div className="mt-2 text-blue-400">const <span className="text-yellow-400">Button</span> = (<span className="text-orange-400">props</span>) =&gt; {'{'}</div>
      <div className="ml-4 text-blue-400">return (</div>
      <div className="ml-8 text-purple-400">&lt;button</div>
      <div className="ml-12 text-green-400">className<span className="text-white">=</span><span className="text-green-400">&quot;px-4 py-2 rounded-md bg-primary text-white&quot;</span></div>
      <div className="ml-12 text-green-400">onClick<span className="text-white">=</span><span className="text-orange-400">{'{props.onClick}'}</span></div>
      <div className="ml-8 text-purple-400">&gt;</div>
      <div className="ml-12 text-orange-400">{'{props.children}'}</div>
      <div className="ml-8 text-purple-400">&lt;/button&gt;</div>
      <div className="ml-4 text-blue-400">)</div>
      <div className="text-blue-400">{'}'}</div>
      <div className="mt-2 text-blue-400">export default <span className="text-yellow-400">Button</span>;</div>
    </div>
  </motion.div>
)

export default function ModernLandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-gray-50 dark:from-background dark:to-gray-950">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-background/80 border-b border-white/10">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link 
              href="/" 
              className="group flex items-center gap-2 transition-all hover:opacity-90"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <MyBlocksLogo width={32} height={32} variant="filled" />
              </motion.div>
              <motion.span 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-xl font-bold"
              >
                MyBlocks
              </motion.span>
            </Link>
          </div>

          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Link 
                href="#features" 
                className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors"
              >
                Features
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Link 
                href="#workflow" 
                className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors"
              >
                How It Works
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Link 
                href="#pricing" 
                className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors"
              >
                Pricing
              </Link>
            </motion.div>
          </nav>

          {/* Right side actions */}
          <div className="hidden md:flex items-center gap-2">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <Button 
                variant="ghost"
                asChild
                className="rounded-md transition-all"
              >
                <Link href="/login">
                  Sign In
                </Link>
              </Button>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <Button 
                asChild
                className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-md shadow-sm hover:shadow-md transition-all"
              >
                <Link href="/register">
                  Sign Up
                </Link>
              </Button>
            </motion.div>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-foreground/70 hover:text-foreground hover:bg-accent/50 rounded-full"
            >
              {isMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
        
        {/* Mobile menu */}
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }} 
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-white/10 bg-background/95 backdrop-blur-md"
          >
            <div className="container py-4">
              <nav className="flex flex-col space-y-4">
                <Link 
                  href="#features" 
                  className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors" 
                  onClick={() => setIsMenuOpen(false)}
                >
                  Features
                </Link>
                <Link 
                  href="#workflow" 
                  className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors" 
                  onClick={() => setIsMenuOpen(false)}
                >
                  How It Works
                </Link>
                <Link 
                  href="#pricing" 
                  className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors" 
                  onClick={() => setIsMenuOpen(false)}
                >
                  Pricing
                </Link>
                <div className="flex flex-col space-y-2 pt-2">
                  <Button 
                    asChild
                    className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-md shadow-sm hover:shadow-md transition-all"
                  >
                    <Link href="/login">
                      Sign In
                    </Link>
                  </Button>
                  <Button 
                    variant="outline" 
                    asChild
                    className="border-border bg-background hover:bg-accent/50 hover:text-accent-foreground/90 rounded-md shadow-sm hover:shadow-md transition-all"
                  >
                    <Link href="/register">
                      Sign Up
                    </Link>
                  </Button>
                </div>
              </nav>
            </div>
          </motion.div>
        )}
      </header>

      {/* Hero Section */}
      <section className="pt-32 md:pt-40 pb-20 md:pb-32 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
            <div className="max-w-xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              >
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-6">
                  Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-700 to-gray-500 dark:from-gray-300 dark:to-gray-500">Personal Private</span> Component Library
                </h1>
              </motion.div>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
                className="text-lg md:text-xl text-muted-foreground mb-8"
              >
                Organize, store, and retrieve your UI components in one secure place. Build faster with your own curated library.
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Button 
                  asChild 
                  size="lg" 
                  className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-md shadow-lg hover:shadow-xl transition-all"
                >
                  <Link href="/register">Get Started</Link>
                </Button>
                <Button 
                  asChild 
                  variant="outline" 
                  size="lg"
                  className="border-border bg-white/5 dark:bg-black/10 backdrop-blur-sm hover:bg-accent/50 hover:text-accent-foreground/90 rounded-md shadow-lg hover:shadow-xl transition-all"
                >
                  <Link href="/demo">See Demo</Link>
                </Button>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="mt-8 flex items-center gap-2 text-muted-foreground"
              >
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-700 border-2 border-background"></div>
                  <div className="w-8 h-8 rounded-full bg-gray-400 dark:bg-gray-600 border-2 border-background"></div>
                  <div className="w-8 h-8 rounded-full bg-gray-500 dark:bg-gray-500 border-2 border-background"></div>
                </div>
                <span className="text-sm">Joined by 1000+ developers</span>
              </motion.div>
            </div>
            
            <div className="relative">
              <div className="absolute -z-10 w-full h-full blur-3xl opacity-20 dark:opacity-10 bg-gradient-to-br from-gray-300 via-gray-200 to-gray-400 dark:from-gray-700 dark:via-gray-600 dark:to-gray-800 rounded-full transform translate-x-1/4 translate-y-1/4"></div>
              
              <GlassCard className="relative z-0">
                <div className="relative p-1">
                  <CodeMock />
                </div>
              </GlassCard>
              
              <motion.div
                initial={{ opacity: 0, x: 20, y: -20 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 0.7, delay: 0.4 }}
                className="absolute -top-8 -left-8 p-4 backdrop-blur-md bg-white/10 dark:bg-black/20 rounded-lg border border-white/10 shadow-lg"
              >
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 flex items-center justify-center rounded-full bg-black/10 dark:bg-white/10">
                    <Lock size={16} className="text-foreground" />
                  </div>
                  <span className="text-sm font-medium">Private Storage</span>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: -20, y: 20 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 0.7, delay: 0.5 }}
                className="absolute -bottom-8 -right-8 p-4 backdrop-blur-md bg-white/10 dark:bg-black/20 rounded-lg border border-white/10 shadow-lg"
              >
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 flex items-center justify-center rounded-full bg-black/10 dark:bg-white/10">
                    <Code size={16} className="text-foreground" />
                  </div>
                  <span className="text-sm font-medium">Syntax Highlighting</span>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50 dark:bg-gray-950/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <AnimatedHeader>Platform Features</AnimatedHeader>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
              className="text-lg text-muted-foreground"
            >
              Everything you need to organize, access, and share your UI components
            </motion.p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <FeatureCard
              icon={Lock}
              title="Private Storage"
              description="Store your UI components securely with private access controls that only you can see."
              index={0}
            />
            <FeatureCard
              icon={Code}
              title="Code Formatting"
              description="Beautiful syntax highlighting for all your code snippets with support for multiple languages."
              index={1}
            />
            <FeatureCard
              icon={Layers}
              title="Organization"
              description="Organize components with tags, collections, and powerful search functionality."
              index={2}
            />
            <FeatureCard
              icon={Eye}
              title="Preview Mode"
              description="See how your components render in both light and dark themes before using them."
              index={3}
            />
            <FeatureCard
              icon={Github}
              title="Version Control"
              description="Track changes to your components with complete version history and restore capability."
              index={4}
            />
            <FeatureCard
              icon={LucideGithub}
              title="Community Access"
              description="Optionally share components publicly and browse components shared by the community."
              index={5}
            />
          </div>
        </div>
      </section>

      {/* Workflow Section */}
      <section id="workflow" className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <AnimatedHeader>How It Works</AnimatedHeader>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
              className="text-lg text-muted-foreground"
            >
              A simple workflow to boost your productivity
            </motion.p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            {[
              {
                step: "01",
                title: "Create & Store",
                description: "Save UI components with detailed descriptions and tags."
              },
              {
                step: "02",
                title: "Search & Find",
                description: "Quickly locate what you need using our powerful search."
              },
              {
                step: "03",
                title: "Reuse & Share",
                description: "Easily reuse components or share them with your team."
              }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 * i }}
                className="relative"
              >
                <div className="absolute -z-10 w-24 h-24 -top-6 -left-6 blur-3xl opacity-20 bg-gradient-to-br from-gray-300 to-gray-500 dark:from-gray-700 dark:to-gray-500 rounded-full"></div>
                <div className="backdrop-blur-md bg-white/5 dark:bg-black/10 border border-white/10 rounded-2xl p-8 h-full">
                  <div className="text-3xl md:text-4xl font-bold text-gray-300 dark:text-gray-700 mb-4">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-semibold mb-4">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-background dark:from-gray-950/50 dark:to-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <AnimatedHeader>What Developers Say</AnimatedHeader>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
              className="text-lg text-muted-foreground"
            >
              Join our growing community of satisfied developers
            </motion.p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                quote: "MyBlocks has completely transformed how I organize my components. I can find what I need in seconds now.",
                author: "Sarah Johnson",
                title: "Frontend Developer",
                image: "/api/placeholder/64/64"
              },
              {
                quote: "The ability to have my own private component library that I can access anywhere has been a game changer for my workflow.",
                author: "Michael Chen",
                title: "UI/UX Designer",
                image: "/api/placeholder/64/64"
              },
              {
                quote: "Our team uses MyBlocks to maintain consistency across projects. The sharing features make collaboration so much easier.",
                author: "David Rodriguez",
                title: "Lead Developer",
                image: "/api/placeholder/64/64"
              }
            ].map((testimonial, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 * i }}
                className="relative"
              >
                <div className="backdrop-blur-md bg-white/5 dark:bg-black/10 border border-white/10 rounded-2xl p-6 h-full">
                  <div className="mb-6">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg key={star} className="inline-block w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                      </svg>
                    ))}
                  </div>
                  <blockquote className="text-foreground italic mb-6">&quot;{testimonial.quote}&quot;</blockquote>
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-gray-300 dark:bg-gray-700 mr-3 overflow-hidden">
                        <Image 
                            src={testimonial.image}
                            alt={testimonial.author}
                            fill
                            className="object-cover"
                            />
                    </div>
                    <div>
                      <div className="font-medium">{testimonial.author}</div>
                      <div className="text-sm text-muted-foreground">{testimonial.title}</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section id="faq" className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <AnimatedHeader>Frequently Asked Questions</AnimatedHeader>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
              className="text-lg text-muted-foreground"
            >
              Have questions? Find answers below
            </motion.p>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <div className="space-y-4">
              {[
                {
                  question: "How secure is my private component library?",
                  answer: "Your private components are secured with enterprise-grade encryption and are only accessible to you or team members you explicitly grant access to. We implement robust authentication and authorization controls to ensure your intellectual property remains protected."
                },
                {
                  question: "Can I use MyBlocks with my existing design system?",
                  answer: "Absolutely! MyBlocks is designed to integrate seamlessly with your existing design system. You can import your components, organize them according to your system's structure, and apply your brand's styles. It works as a complementary tool to enhance your design system workflow."
                },
                {
                  question: "Is there a limit to how many components I can store?",
                  answer: "Free accounts can store up to 50 components. For unlimited component storage, you can upgrade to our Pro or Team plans, which remove all storage restrictions and add additional features like versioning and collaboration tools."
                },
                {
                  question: "What file formats and frameworks are supported?",
                  answer: "MyBlocks supports all major frontend frameworks including React, Vue, Angular, Svelte, and vanilla HTML/CSS/JS. You can store components in various formats including JSX, TSX, Vue files, and more. Code snippets are syntax highlighted for better readability."
                },
                {
                  question: "Can I collaborate with my team?",
                  answer: "Yes! Our Team plan is specifically designed for collaboration. You can share components with team members, set permissions, create shared collections, and maintain a consistent component library across your entire organization."
                }
              ].map((faq, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.05 * i }}
                  className="backdrop-blur-md bg-white/5 dark:bg-black/10 border border-white/10 rounded-xl overflow-hidden"
                >
                  <details className="group">
                  <summary className="flex items-center justify-between p-6 cursor-pointer">
                      <h3 className="text-lg font-medium">{faq.question}</h3>
                      <div className="w-6 h-6 flex items-center justify-center transition-transform group-open:rotate-180">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </summary>
                    <div className="px-6 pb-6 pt-0">
                      <p className="text-muted-foreground">{faq.answer}</p>
                    </div>
                  </details>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-gray-50 dark:bg-gray-950/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <AnimatedHeader>Simple Pricing</AnimatedHeader>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
              className="text-lg text-muted-foreground"
            >
              Choose the plan that fits your needs
            </motion.p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Free",
                price: "$0",
                description: "For exploring the platform",
                features: [
                  "Store up to 50 components",
                  "Basic search functionality",
                  "Public component gallery access",
                  "Light/dark mode preview"
                ],
                buttonText: "Get Started",
                popular: false
              },
              {
                name: "Pro",
                price: "$9",
                period: "/month",
                description: "For individual developers",
                features: [
                  "Unlimited components",
                  "Advanced search & filtering",
                  "Component versioning",
                  "Create collections",
                  "Component sharing",
                  "Priority support"
                ],
                buttonText: "Try 7-Day Free Trial",
                popular: true
              },
              {
                name: "Team",
                price: "$29",
                period: "/month",
                description: "For design & development teams",
                features: [
                  "Everything in Pro",
                  "Team collaboration",
                  "Role-based permissions",
                  "Private team components",
                  "Component approval workflow",
                  "Design system integration",
                  "Dedicated support"
                ],
                buttonText: "Contact Sales",
                popular: false
              }
            ].map((plan, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.7, 
                  ease: [0.22, 1, 0.36, 1], 
                  delay: 0.1 * i 
                }}
                className={cn(
                  "backdrop-blur-md border rounded-2xl overflow-hidden h-full flex flex-col",
                  plan.popular 
                    ? "border-primary/20 dark:border-primary/30 shadow-xl scale-105 z-10 bg-white/10 dark:bg-white/5" 
                    : "border-white/10 shadow-lg bg-white/5 dark:bg-black/10"
                )}
              >
                {plan.popular && (
                  <div className="bg-primary/10 text-primary text-xs font-semibold py-1 text-center">
                    MOST POPULAR
                  </div>
                )}
                
                <div className="p-6 md:p-8 flex-1">
                  <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
                  <p className="text-muted-foreground text-sm mb-6">{plan.description}</p>
                  
                  <div className="mb-6">
                    <span className="text-3xl font-bold">{plan.price}</span>
                    {plan.period && <span className="text-muted-foreground">{plan.period}</span>}
                  </div>
                  
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm">
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          viewBox="0 0 20 20" 
                          fill="currentColor" 
                          className="w-5 h-5 text-primary flex-shrink-0 mt-0.5"
                        >
                          <path 
                            fillRule="evenodd" 
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" 
                            clipRule="evenodd" 
                          />
                        </svg>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="p-6 md:p-8 pt-0">
                  <Button 
                    asChild
                    className={cn(
                      "w-full",
                      plan.popular 
                        ? "bg-primary text-primary-foreground hover:bg-primary/90" 
                        : "bg-white/10 dark:bg-black/20 hover:bg-white/20 dark:hover:bg-black/30 text-foreground"
                    )}
                  >
                    <Link href={i === 0 ? "/register" : "/contact"}>
                      {plan.buttonText}
                    </Link>
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative overflow-hidden"
          >
            <div className="absolute -z-10 w-full h-full blur-3xl opacity-20 bg-gradient-to-br from-gray-300 via-gray-400 to-gray-500 dark:from-gray-700 dark:via-gray-600 dark:to-gray-500 rounded-3xl"></div>
            
            <div className="backdrop-blur-md bg-white/5 dark:bg-black/10 border border-white/10 rounded-3xl p-8 md:p-12 lg:p-16">
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to organize your UI components?</h2>
                <p className="text-lg text-muted-foreground mb-8">
                  Join thousands of developers who use MyBlocks to boost their productivity.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <Button 
                    asChild 
                    size="lg" 
                    className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-md shadow-lg hover:shadow-xl transition-all"
                  >
                    <Link href="/register">Get Started for Free</Link>
                  </Button>
                  <Button 
                    asChild 
                    variant="outline" 
                    size="lg"
                    className="border-border bg-white/5 dark:bg-black/10 backdrop-blur-sm hover:bg-accent/50 hover:text-accent-foreground/90 rounded-md shadow-lg hover:shadow-xl transition-all"
                  >
                    <Link href="/demo">See a Demo</Link>
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="border-t border-white/10 bg-background py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <Link 
                href="/" 
                className="flex items-center gap-2 mb-4"
              >
                <MyBlocksLogo width={24} height={24} variant="filled" />
                <span className="font-bold">MyBlocks</span>
              </Link>
              <p className="text-sm text-muted-foreground">
                Your Personal Private Component Library for storing, organizing, and retrieving UI components.
              </p>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="#features" className="hover:text-foreground transition-colors">Features</Link></li>
                <li><Link href="#workflow" className="hover:text-foreground transition-colors">How It Works</Link></li>
                <li><Link href="#pricing" className="hover:text-foreground transition-colors">Pricing</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/about" className="hover:text-foreground transition-colors">About</Link></li>
                <li><Link href="/blog" className="hover:text-foreground transition-colors">Blog</Link></li>
                <li><Link href="/contact" className="hover:text-foreground transition-colors">Contact</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/privacy" className="hover:text-foreground transition-colors">Privacy</Link></li>
                <li><Link href="/terms" className="hover:text-foreground transition-colors">Terms</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="mt-12 border-t border-white/10 pt-6 flex flex-col sm:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground mb-4 sm:mb-0">
              © {new Date().getFullYear()} MyBlocks. All rights reserved.
            </p>
            
            <div className="flex items-center gap-4">
              <Link 
                href="https://twitter.com" 
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Twitter"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                </svg>
              </Link>
              <Link 
                href="https://github.com" 
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="GitHub"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                </svg>
              </Link>
              <Link 
                href="https://linkedin.com" 
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="LinkedIn"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}