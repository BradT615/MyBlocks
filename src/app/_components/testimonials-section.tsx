"use client"

import React from "react"
import { motion } from "motion/react"
import Image from "next/image"
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

export function TestimonialsSection() {
  return (
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
                      width={40}
                      height={40}
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
  )
}