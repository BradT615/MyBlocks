"use client"

import React from "react"
import { motion } from "motion/react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export function CTASection() {
  return (
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
  )
}