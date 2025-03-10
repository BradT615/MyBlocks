"use client"

import { faqData } from "@/data/faq-data"
import { cn } from "@/lib/utils"
import { useState } from "react"
import { ChevronDown } from "lucide-react"

interface FAQItemProps {
  question: string
  answer: string
  isOpen: boolean
  onClick: () => void
}

function FAQItem({ question, answer, isOpen, onClick }: FAQItemProps) {
  return (
    <div 
      className={cn(
        "rounded-xl overflow-hidden border transition-all duration-300",
        "bg-card shadow-sm hover:shadow-md",
        isOpen ? "border-primary/20" : "border-border"
      )}
    >
      <div 
        className="p-6 flex justify-between items-center cursor-pointer" 
        onClick={onClick}
      >
        <h3 className="text-lg font-medium text-card-foreground/90">
          {question}
        </h3>
        <div className="flex items-center justify-center w-6 h-6">
          <ChevronDown className={cn(
            "h-5 w-5 text-muted-foreground transition-transform duration-300",
            isOpen && "rotate-180"
          )} />
        </div>
      </div>
      <div className={cn(
        "grid transition-all duration-300 ease-in-out px-6",
        isOpen ? "grid-rows-[1fr] opacity-100 pb-6" : "grid-rows-[0fr] opacity-0 pb-0"
      )}>
        <div className="overflow-hidden">
          <p className="text-muted-foreground">
            {answer}
          </p>
        </div>
      </div>
    </div>
  )
}

export function FAQSection() {
  const [openQuestion, setOpenQuestion] = useState<string | null>("Can I use MyBlocks for free?")

  const toggleQuestion = (question: string) => {
    setOpenQuestion(openQuestion === question ? null : question)
  }

  return (
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
          <div className="space-y-4">
            {faqData.map((item) => (
              <FAQItem
                key={item.question}
                question={item.question}
                answer={item.answer}
                isOpen={openQuestion === item.question}
                onClick={() => toggleQuestion(item.question)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}