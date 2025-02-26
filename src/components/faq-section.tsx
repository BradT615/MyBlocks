// src/components/faq-section.tsx
import { faqData } from "@/data/faq-data"

export function FAQSection() {
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
          <div className="space-y-6">
            {faqData.map((item) => (
              <div key={item.question} className="rounded-lg border p-6">
                <h3 className="mb-3 text-lg font-medium">{item.question}</h3>
                <p className="text-muted-foreground">
                  {item.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}