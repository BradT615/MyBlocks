// src/components/footer.tsx
import Link from "next/link"
import { MyBlocksLogo } from "@/components/MyBlocksLogo"

interface FooterLinkProps {
  href: string
  children: React.ReactNode
}

function FooterLink({ href, children }: FooterLinkProps) {
  return (
    <Link 
      href={href} 
      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
    >
      {children}
    </Link>
  )
}

export function Footer() {
  return (
    <footer className="border-t border-border/50 bg-background">
      <div className="container py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:grid-cols-4 max-sm:text-center">
          <div>
            <Link href="/" className="group flex items-center gap-2 transition-all duration-300 hover:opacity-90">
              <MyBlocksLogo width={24} height={24} variant="filled" />
              <span className="text-lg font-bold">MyBlocks</span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground text-start">
              Store, organize, and retrieve your favorite UI components and styles with ease.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold mb-4">Product</h3>
            <ul className="space-y-2">
              <li><FooterLink href="#features">Features</FooterLink></li>
              <li><FooterLink href="#benefits">Benefits</FooterLink></li>
              <li><FooterLink href="#pricing">Pricing</FooterLink></li>
              <li><FooterLink href="#faq">FAQ</FooterLink></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li><FooterLink href="/about">About</FooterLink></li>
              <li><FooterLink href="/blog">Blog</FooterLink></li>
              <li><FooterLink href="/careers">Careers</FooterLink></li>
              <li><FooterLink href="/contact">Contact</FooterLink></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><FooterLink href="/privacy">Privacy</FooterLink></li>
              <li><FooterLink href="/terms">Terms</FooterLink></li>
              <li><FooterLink href="/cookies">Cookies</FooterLink></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-border/50 pt-6">
          <p className="text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} MyBlocks. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}