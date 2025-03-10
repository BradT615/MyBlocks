"use client"

import React from "react"
import { motion } from "motion/react"
import Link from "next/link"
import { Code, Paintbrush, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { TextLoop } from "@/components/ui/text-loop"
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
      "bg-white/5 dark:bg-white/5", // Maintain light mode appearance in dark mode
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
    className="bg-[#282c34] dark:bg-[#282c34] border border-gray-800 rounded-xl overflow-hidden shadow-2xl"
  >
    <div className="border-b border-gray-800 flex items-center justify-center p-4 relative">
      <div className="absolute left-4 flex space-x-2">
        <div className="w-3 h-3 rounded-full bg-red-500"></div>
        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
        <div className="w-3 h-3 rounded-full bg-green-500"></div>
      </div>
      <div className="text-xs text-gray-400">PrimaryButton.tsx</div>
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
    <section className="pt-32 md:pt-40 pb-20 md:pb-32 overflow-hidden border">
      <div className="max-w-[70vw] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
          <div className="">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-6">
                <div className="flex flex-wrap">
                  <div className="flex">
                    <span>The Ultimate</span>
                    <div className="min-w-[250px] h-full relative ml-3 inline-flex items-baseline">
                    <TextLoop
                      className="overflow-visible absolute"
                      interval={3}
                      transition={{
                        type: "spring",
                        stiffness: 800,
                        damping: 70,
                        mass: 8
                      }}
                      variants={{
                        initial: {
                          y: 20,
                          rotateX: 80,
                          opacity: 0,
                          filter: "blur(4px)"
                        },
                        animate: {
                          y: 0,
                          rotateX: 0,
                          opacity: 1,
                          filter: "blur(0px)"
                        },
                        exit: {
                          y: -20,
                          rotateX: -80,
                          opacity: 0,
                          filter: "blur(4px)"
                        }
                      }}
                    >
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">Private</span>
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">Collaborative</span>
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">Organized</span>
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">Searchable</span>
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">Centralized</span>
                    </TextLoop>
                  </div>
                  </div>
                </div>
                <span className="block pt-2">UI Component Library</span>
              </h1>
            </motion.div>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
              className="text-lg md:text-xl text-muted-foreground mb-8"
            >
              Your centralized UI component library that connects designers and developers. Store, organize, and share your components in one beautiful, collaborative space.
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
                <Link href="/register">Start Building</Link>
              </Button>
              <Button 
                asChild 
                variant="outline" 
                size="lg"
                className="border-border bg-white/5 dark:bg-black/10 backdrop-blur-sm hover:bg-accent/50 hover:text-accent-foreground/90 rounded-md shadow-lg hover:shadow-xl transition-all"
              >
                <Link href="/demo">View Demo</Link>
              </Button>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="mt-8 flex items-center gap-2 text-muted-foreground"
            >
              <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full bg-blue-400 dark:bg-blue-600 border-2 border-background"></div>
                <div className="w-8 h-8 rounded-full bg-purple-400 dark:bg-purple-600 border-2 border-background"></div>
                <div className="w-8 h-8 rounded-full bg-teal-400 dark:bg-teal-600 border-2 border-background"></div>
              </div>
              <span className="text-sm">Join 1000+ designers & developers</span>
            </motion.div>
          </div>
          
          <div className="relative">
            <GlassCard className="relative z-0">
              <div className="relative p-1">
                <CodeMock />
              </div>
            </GlassCard>
            
            <motion.div
              initial={{ opacity: 0, x: 20, y: -20 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="absolute -top-8 -left-8 p-4 backdrop-blur-lg bg-white/10 dark:bg-black/20 rounded-lg border border-white/10 shadow-lg z-0"
            >
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 flex items-center justify-center rounded-full bg-black/10 dark:bg-white/10">
                  <Users size={16} />
                </div>
                <span className="text-sm font-medium">Team Access</span>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: -20, y: 20 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="absolute -bottom-8 -right-8 p-4 backdrop-blur-lg bg-white/10 dark:bg-black/20 rounded-lg border border-white/10 shadow-lg"
            >
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 flex items-center justify-center rounded-full bg-black/10 dark:bg-white/10">
                  <Paintbrush size={16} />
                </div>
                <span className="text-sm font-medium">Live Preview</span>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6 }}
              className="absolute -right-16 top-1/4 p-4 backdrop-blur-lg bg-white/10 dark:bg-black/20 rounded-lg border border-white/10 shadow-lg"
            >
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 flex items-center justify-center rounded-full bg-black/10 dark:bg-white/10">
                  <Code size={16} />
                </div>
                <span className="text-sm font-medium">Easy Search</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}