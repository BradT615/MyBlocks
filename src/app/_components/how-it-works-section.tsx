"use client"

import React from "react"
import { motion } from "motion/react"
import { ReactNode } from "react"

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

export function HowItWorksSection() {
  return (
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
  )
}