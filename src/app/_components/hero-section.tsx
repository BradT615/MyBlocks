"use client"

import React from "react"
import { motion } from "motion/react"
import Link from "next/link"
import { Code, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { ReactNode } from "react"

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

export function HeroSection() {
  return (
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
  )
}