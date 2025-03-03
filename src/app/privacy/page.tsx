// src/app/privacy/page.tsx
import Link from "next/link"
import { Metadata } from "next"
import { ArrowLeft } from "lucide-react"
import { MyBlocksLogo } from "@/components/MyBlocksLogo"

export const metadata: Metadata = {
  title: "Privacy Policy | MyBlocks",
  description: "Privacy Policy for MyBlocks",
}

export default function PrivacyPolicyPage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur">
        <div className="container flex h-16 items-center justify-between py-4">
          <Link 
            href="/" 
            className="group flex items-center gap-2 transition-all hover:opacity-90"
          >
            <span className="flex items-center gap-2">
              <MyBlocksLogo width={32} height={32} variant="filled" />
              <span className="text-xl font-bold">MyBlocks</span>
            </span>
          </Link>
          <Link
            href="/"
            className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Home</span>
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 py-12">
        <div className="container max-w-3xl">
          <div className="mb-10">
            <h1 className="text-3xl font-bold tracking-tight mb-2">Privacy Policy</h1>
            <p className="text-muted-foreground">Last updated: March 2, 2025</p>
          </div>
          
          <div className="space-y-8">
            <section>
              <p className="text-muted-foreground">
                At MyBlocks, we take your privacy seriously. This Privacy Policy explains how we collect,
                use, disclose, and safeguard your information when you visit our website and use our service.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">Information We Collect</h2>
              <p className="mb-3 text-muted-foreground">We collect information that you provide directly to us when you:</p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-1 mb-4">
                <li>Create an account</li>
                <li>Use our services</li>
                <li>Contact customer support</li>
                <li>Participate in surveys or promotions</li>
              </ul>

              <p className="mb-3 text-muted-foreground">The types of information we may collect include:</p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-1">
                <li>Contact information (such as name and email address)</li>
                <li>Account credentials</li>
                <li>Profile information</li>
                <li>User content (such as components, code snippets, and comments)</li>
                <li>Payment information (processed by our payment provider)</li>
                <li>Usage data and analytics</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">How We Use Your Information</h2>
              <p className="mb-3 text-muted-foreground">We use the information we collect to:</p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-1">
                <li>Provide, maintain, and improve our services</li>
                <li>Process transactions</li>
                <li>Send you technical notices, updates, security alerts, and administrative messages</li>
                <li>Respond to your comments, questions, and customer service requests</li>
                <li>Communicate with you about products, services, offers, and events</li>
                <li>Monitor and analyze trends, usage, and activities in connection with our service</li>
                <li>Detect, investigate, and prevent fraudulent transactions and other illegal activities</li>
                <li>Personalize your experience</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">Third-Party Authentication</h2>
              <p className="mb-3 text-muted-foreground">
                MyBlocks offers authentication through third-party services including Google, GitHub, and Figma. 
                When you choose to authenticate using these services, we may receive certain profile and account 
                information about you from the provider. This information may include your name, email address, 
                and profile picture.
              </p>
              <p className="text-muted-foreground">
                We use this information solely for the purpose of creating and managing your MyBlocks account. 
                We do not share your login information with other users or with any other third parties except 
                as necessary to provide our services or as required by law.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">Data Sharing and Disclosure</h2>
              <p className="mb-3 text-muted-foreground">We may share your personal information in the following situations:</p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li><span className="font-medium">With Service Providers:</span> We may share your information with third-party vendors, consultants, and other service providers who need access to such information to carry out work on our behalf.</li>
                <li><span className="font-medium">For Legal Reasons:</span> We may disclose your information if we believe it is necessary to comply with a legal obligation, protect and defend our rights or property, or protect the safety of our users or the public.</li>
                <li><span className="font-medium">Business Transfers:</span> If we are involved in a merger, acquisition, or sale of all or a portion of our assets, your information may be transferred as part of that transaction.</li>
                <li><span className="font-medium">With Your Consent:</span> We may share your information with third parties when we have your consent to do so.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">Data Security</h2>
              <p className="text-muted-foreground">
                We implement appropriate technical and organizational measures to protect the security of your personal information.
                However, please be aware that no method of transmission over the Internet or method of electronic storage is 
                100% secure.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">Your Rights</h2>
              <p className="mb-3 text-muted-foreground">Depending on your location, you may have certain rights regarding your personal information, including:</p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-1">
                <li>The right to access your personal information</li>
                <li>The right to correct inaccurate information</li>
                <li>The right to delete your information</li>
                <li>The right to restrict or object to processing</li>
                <li>The right to data portability</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">Children&apos;s Privacy</h2>
              <p className="text-muted-foreground">
                Our service is not intended for individuals under the age of 16. We do not knowingly collect personal information 
                from children under 16. If we learn we have collected personal information from a child under 16, we will delete 
                this information.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">Changes to This Privacy Policy</h2>
              <p className="text-muted-foreground">
                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new 
                Privacy Policy on this page and updating the &quot;Last updated&quot; date at the top.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">Contact Us</h2>
              <p className="mb-2 text-muted-foreground">
                If you have any questions about this Privacy Policy, please contact us at:
              </p>
              <p className="font-medium">support@myblocks.dev</p>
            </section>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t bg-background">
        <div className="container py-6 flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} MyBlocks. All rights reserved.
          </p>
          <div className="flex space-x-4">
            <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Terms of Service
            </Link>
            <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Privacy Policy
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}