"use client"

import React from "react"
import { motion } from "motion/react"
import { ReactNode } from "react"

interface AnimatedHeaderProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

export function AnimatedHeader({ children, delay = 0, className = "" }: AnimatedHeaderProps) {
  return (
    <motion.h2
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ 
        duration: 0.7, 
        ease: [0.22, 1, 0.36, 1],
        delay 
      }}
      className={`text-3xl md:text-4xl font-bold text-foreground mb-6 ${className}`}
    >
      {children}
    </motion.h2>
  )
}