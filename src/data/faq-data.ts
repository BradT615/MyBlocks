interface FAQItem {
  question: string;
  answer: string;
}

export const faqData: FAQItem[] = [
  {
    question: "Can I use MyBlocks for free?",
    answer: "Yes, we offer a generous free tier that allows you to store up to 50 components with basic features like component browsing, searching, and basic previews. It's perfect for solo developers or those just getting started with component management."
  },
  {
    question: "How does MyBlocks help design and development teams collaborate?",
    answer: "MyBlocks creates a shared visual language between designers and developers by providing a centralized hub where teams can browse components in a visual gallery, preview them in both light and dark modes, and access the underlying code. This bridges the gap between design mockups and implementation."
  },
  {
    question: "What frameworks and languages are supported?",
    answer: "MyBlocks supports components built with React and Next.js, with TypeScript integration. Our platform uses Tailwind CSS and Shadcn/UI components built on Radix UI primitives, making it ideal for projects using similar technology stacks."
  },
  {
    question: "Can I organize my components with tags and categories?",
    answer: "Absolutely! MyBlocks features a robust tagging system that allows you to categorize components for easy discovery. You can filter and search components by tags to quickly find what you need, improving workflow efficiency for your team."
  },
  {
    question: "Is my code secure on the platform?",
    answer: "Yes, we prioritize security. We use Supabase for authentication and database management, ensuring that private components are only visible to you and team members you explicitly grant access to. You have full control over which components are public or private."
  },
  {
    question: "What features are planned for future releases?",
    answer: "After our MVP, we plan to implement version history, multi-file components, interactive prop editing, collections for better organization, responsive testing tools, and enhanced collaboration features. We're constantly improving based on user feedback."
  }
];