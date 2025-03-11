import Link from "next/link"
import { Button } from "@/components/ui/button"
import { FileX } from "lucide-react"

export default function ComponentNotFound() {
  return (
    <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center text-center">
      <div className="bg-primary/10 rounded-full p-6 mb-6">
        <FileX className="h-16 w-16 text-primary/60" />
      </div>
      <h1 className="text-3xl font-bold tracking-tight mb-4">Component Not Found</h1>
      <p className="text-muted-foreground mb-8 max-w-md">
        The component you&apos;re looking for either doesn&apos;t exist or you don&apos;t have permission to view it.
      </p>
      <div className="flex gap-4">
        <Button asChild>
          <Link href="/components">Browse Components</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/dashboard">Go to Dashboard</Link>
        </Button>
      </div>
    </div>
  )
}