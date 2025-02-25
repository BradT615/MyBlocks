// src/components/testimonial-card.tsx
import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"

interface TestimonialCardProps {
  quote: string
  author: string
  role: string
  avatarUrl?: string
}

export function TestimonialCard({ quote, author, role, avatarUrl }: TestimonialCardProps) {
  return (
    <Card className="border-none shadow-md transition-all duration-200 hover:shadow-lg">
      <CardContent className="pt-6">
        <div className="mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
            className="h-8 w-8 text-primary/40"
          >
            <path
              fill="currentColor"
              d="M9.73 14.5V10a5 5 0 0 0-5-5H3.5v2H4.73a3 3 0 0 1 3 3v.5H3.5v4h6.23ZM20.5 9.5V5a5 5 0 0 0-5-5h-1.23v2h1.23a3 3 0 0 1 3 3v.5h-4.23v4h6.23v4h-6.23v2h6.23a2 2 0 0 0 2-2v-8Z"
            />
          </svg>
        </div>
        <p className="text-md mb-6">{quote}</p>
      </CardContent>
      <CardFooter className="flex items-center space-x-4 border-t px-6 py-5">
        {avatarUrl ? (
          <Image
            src={avatarUrl}
            alt={author}
            width={40}
            height={40}
            className="rounded-full"
          />
        ) : (
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold">
            {author.charAt(0)}
          </div>
        )}
        <div>
          <p className="font-medium">{author}</p>
          <p className="text-sm text-muted-foreground">{role}</p>
        </div>
      </CardFooter>
    </Card>
  )
}