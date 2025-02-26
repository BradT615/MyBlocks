// src/data/faq-data.ts

interface FAQItem {
    question: string;
    answer: string;
  }
  
  export const faqData: FAQItem[] = [
    {
      question: "Can I use MyBlocks for free?",
      answer: "Yes, we offer a generous free tier that allows you to store up to 50 components with basic features. It's perfect for solo developers or those just getting started."
    },
    {
      question: "How does team sharing work?",
      answer: "With our Pro and Enterprise plans, you can create teams and selectively share components. You can set different permission levels for viewing, editing, or managing components."
    },
    {
      question: "Can I integrate MyBlocks with my existing tools?",
      answer: "Yes, our Enterprise plan includes API access and custom integrations for popular development tools and workflows. We also offer extensions for VS Code and other editors."
    },
    {
      question: "Is my code secure on your platform?",
      answer: "Absolutely. We implement industry-standard security practices to protect your code. Private components are only visible to you and those you explicitly grant access to."
    }
  ];