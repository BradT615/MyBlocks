'use client'

import Link from "next/link"
import { ArrowLeft, ChevronDown } from "lucide-react"
import { MyBlocksLogo } from "@/components/MyBlocksLogo"
import { cn } from "@/lib/utils"
import { useState } from "react"

// We can't export metadata from a client component, so we'll define it in a separate layout.tsx file if needed

export default function TermsOfServicePage() {
  const [openTerm, setOpenTerm] = useState<string | null>("1. Accounts")

  const toggleTerm = (term: string) => {
    setOpenTerm(openTerm === term ? null : term)
  }

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
            <h1 className="text-3xl font-bold tracking-tight mb-2">Terms of Service</h1>
            <p className="text-muted-foreground">Last updated: March 2, 2025</p>
          </div>
          
          <div className="space-y-6">
            <section className="mb-6">
              <p className="text-muted-foreground">
                Please read these Terms of Service (&quot;Terms&quot;) carefully before using the MyBlocks website and service
                operated by MyBlocks, Inc.
              </p>

              <p className="text-muted-foreground mt-4">
                By accessing or using the Service, you agree to be bound by these Terms. If you disagree with any part 
                of the terms, then you may not access the Service.
              </p>
            </section>

            {/* FAQ-style expandable sections */}
            <div className="space-y-4">
              {/* Section 1 */}
              <div 
                className={cn(
                  "rounded-xl overflow-hidden border transition-all duration-300",
                  "bg-card shadow-sm hover:shadow-md cursor-pointer",
                  openTerm === "1. Accounts" ? "border-primary/20" : "border-border"
                )}
                onClick={() => toggleTerm("1. Accounts")}
              >
                <div className="p-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium text-card-foreground/90">
                      1. Accounts
                    </h3>
                    <div className="flex items-center justify-center w-6 h-6">
                      <ChevronDown className={cn(
                        "h-5 w-5 text-muted-foreground transition-transform duration-300",
                        openTerm === "1. Accounts" && "rotate-180"
                      )} />
                    </div>
                  </div>
                  <div className={cn(
                    "grid transition-all duration-300 ease-in-out",
                    openTerm === "1. Accounts" ? "grid-rows-[1fr] opacity-100 mt-4" : "grid-rows-[0fr] opacity-0"
                  )}>
                    <div className="overflow-hidden text-muted-foreground space-y-4">
                      <p>
                        When you create an account with us, you must provide information that is accurate, complete, and current 
                        at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination 
                        of your account on our Service.
                      </p>
                      <p>
                        You are responsible for safeguarding the password that you use to access the Service and for any activities 
                        or actions under your password, whether your password is with our Service or a third-party service.
                      </p>
                      <p>
                        You agree not to disclose your password to any third party. You must notify us immediately upon becoming 
                        aware of any breach of security or unauthorized use of your account.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 2 */}
              <div 
                className={cn(
                  "rounded-xl overflow-hidden border transition-all duration-300",
                  "bg-card shadow-sm hover:shadow-md cursor-pointer",
                  openTerm === "2. Third-Party Authentication" ? "border-primary/20" : "border-border"
                )}
                onClick={() => toggleTerm("2. Third-Party Authentication")}
              >
                <div className="p-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium text-card-foreground/90">
                      2. Third-Party Authentication
                    </h3>
                    <div className="flex items-center justify-center w-6 h-6">
                      <ChevronDown className={cn(
                        "h-5 w-5 text-muted-foreground transition-transform duration-300",
                        openTerm === "2. Third-Party Authentication" && "rotate-180"
                      )} />
                    </div>
                  </div>
                  <div className={cn(
                    "grid transition-all duration-300 ease-in-out",
                    openTerm === "2. Third-Party Authentication" ? "grid-rows-[1fr] opacity-100 mt-4" : "grid-rows-[0fr] opacity-0"
                  )}>
                    <div className="overflow-hidden text-muted-foreground space-y-4">
                      <p>
                        MyBlocks offers authentication options through third-party services including Google, GitHub, and Figma. 
                        By using these authentication options, you agree to comply with their respective terms of service and 
                        privacy policies, in addition to our Terms.
                      </p>
                      <p>
                        We are not responsible for any issues that may arise from your use of these third-party authentication 
                        services, including but not limited to service outages, account security breaches, or changes to their 
                        services.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 3 */}
              <div 
                className={cn(
                  "rounded-xl overflow-hidden border transition-all duration-300",
                  "bg-card shadow-sm hover:shadow-md cursor-pointer",
                  openTerm === "3. Content and Intellectual Property" ? "border-primary/20" : "border-border"
                )}
                onClick={() => toggleTerm("3. Content and Intellectual Property")}
              >
                <div className="p-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium text-card-foreground/90">
                      3. Content and Intellectual Property
                    </h3>
                    <div className="flex items-center justify-center w-6 h-6">
                      <ChevronDown className={cn(
                        "h-5 w-5 text-muted-foreground transition-transform duration-300",
                        openTerm === "3. Content and Intellectual Property" && "rotate-180"
                      )} />
                    </div>
                  </div>
                  <div className={cn(
                    "grid transition-all duration-300 ease-in-out",
                    openTerm === "3. Content and Intellectual Property" ? "grid-rows-[1fr] opacity-100 mt-4" : "grid-rows-[0fr] opacity-0"
                  )}>
                    <div className="overflow-hidden text-muted-foreground space-y-4">
                      <h4 className="font-medium text-foreground">Your Content</h4>
                      <p>
                        Our Service allows you to post, link, store, share and otherwise make available certain information, 
                        code, text, graphics, or other material (&quot;Content&quot;). You retain all rights to your Content and are 
                        responsible for the Content you post to the Service.
                      </p>
                      <p>
                        By posting Content to the Service, you grant us the right to use, modify, publicly perform, publicly 
                        display, reproduce, and distribute such Content on and through the Service. You agree that this license 
                        includes the right for us to make your Content available to other users of the Service, who may also use 
                        your Content subject to these Terms.
                      </p>
                      <h4 className="font-medium text-foreground mt-4">MyBlocks Content</h4>
                      <p>
                        The Service and its original content (excluding Content provided by users), features, and functionality 
                        are and will remain the exclusive property of MyBlocks, Inc. and its licensors. The Service is protected 
                        by copyright, trademark, and other laws of both the United States and foreign countries.
                      </p>
                      <p>
                        Our trademarks and trade dress may not be used in connection with any product or service without the prior 
                        written consent of MyBlocks, Inc.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 4 */}
              <div 
                className={cn(
                  "rounded-xl overflow-hidden border transition-all duration-300",
                  "bg-card shadow-sm hover:shadow-md cursor-pointer",
                  openTerm === "4. Prohibited Uses" ? "border-primary/20" : "border-border"
                )}
                onClick={() => toggleTerm("4. Prohibited Uses")}
              >
                <div className="p-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium text-card-foreground/90">
                      4. Prohibited Uses
                    </h3>
                    <div className="flex items-center justify-center w-6 h-6">
                      <ChevronDown className={cn(
                        "h-5 w-5 text-muted-foreground transition-transform duration-300",
                        openTerm === "4. Prohibited Uses" && "rotate-180"
                      )} />
                    </div>
                  </div>
                  <div className={cn(
                    "grid transition-all duration-300 ease-in-out",
                    openTerm === "4. Prohibited Uses" ? "grid-rows-[1fr] opacity-100 mt-4" : "grid-rows-[0fr] opacity-0"
                  )}>
                    <div className="overflow-hidden text-muted-foreground">
                      <p className="mb-2">You agree not to use the Service:</p>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>In any way that violates any applicable national or international law or regulation.</li>
                        <li>To transmit, or procure the sending of, any advertising or promotional material, including any &quot;junk mail,&quot; &quot;chain letter,&quot; &quot;spam,&quot; or any other similar solicitation.</li>
                        <li>To impersonate or attempt to impersonate MyBlocks, a MyBlocks employee, another user, or any other person or entity.</li>
                        <li>In any way that infringes upon the rights of others, or in any way is illegal, threatening, fraudulent, or harmful.</li>
                        <li>To engage in any other conduct that restricts or inhibits anyone&apos;s use or enjoyment of the Service, or which may harm MyBlocks or users of the Service or expose them to liability.</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 5 */}
              <div 
                className={cn(
                  "rounded-xl overflow-hidden border transition-all duration-300",
                  "bg-card shadow-sm hover:shadow-md cursor-pointer",
                  openTerm === "5. Termination" ? "border-primary/20" : "border-border"
                )}
                onClick={() => toggleTerm("5. Termination")}
              >
                <div className="p-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium text-card-foreground/90">
                      5. Termination
                    </h3>
                    <div className="flex items-center justify-center w-6 h-6">
                      <ChevronDown className={cn(
                        "h-5 w-5 text-muted-foreground transition-transform duration-300",
                        openTerm === "5. Termination" && "rotate-180"
                      )} />
                    </div>
                  </div>
                  <div className={cn(
                    "grid transition-all duration-300 ease-in-out",
                    openTerm === "5. Termination" ? "grid-rows-[1fr] opacity-100 mt-4" : "grid-rows-[0fr] opacity-0"
                  )}>
                    <div className="overflow-hidden text-muted-foreground space-y-4">
                      <p>
                        We may terminate or suspend your account immediately, without prior notice or liability, for any reason 
                        whatsoever, including without limitation if you breach the Terms.
                      </p>
                      <p>
                        Upon termination, your right to use the Service will immediately cease. If you wish to terminate your 
                        account, you may simply discontinue using the Service or delete your account through the account settings.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 6 */}
              <div 
                className={cn(
                  "rounded-xl overflow-hidden border transition-all duration-300",
                  "bg-card shadow-sm hover:shadow-md cursor-pointer",
                  openTerm === "6. Limitation of Liability" ? "border-primary/20" : "border-border"
                )}
                onClick={() => toggleTerm("6. Limitation of Liability")}
              >
                <div className="p-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium text-card-foreground/90">
                      6. Limitation of Liability
                    </h3>
                    <div className="flex items-center justify-center w-6 h-6">
                      <ChevronDown className={cn(
                        "h-5 w-5 text-muted-foreground transition-transform duration-300",
                        openTerm === "6. Limitation of Liability" && "rotate-180"
                      )} />
                    </div>
                  </div>
                  <div className={cn(
                    "grid transition-all duration-300 ease-in-out",
                    openTerm === "6. Limitation of Liability" ? "grid-rows-[1fr] opacity-100 mt-4" : "grid-rows-[0fr] opacity-0"
                  )}>
                    <div className="overflow-hidden text-muted-foreground">
                      <p className="mb-2">
                        In no event shall MyBlocks, Inc., nor its directors, employees, partners, agents, suppliers, or affiliates, 
                        be liable for any indirect, incidental, special, consequential or punitive damages, including without 
                        limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from:
                      </p>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>Your access to or use of or inability to access or use the Service;</li>
                        <li>Any conduct or content of any third party on the Service;</li>
                        <li>Any content obtained from the Service; and</li>
                        <li>Unauthorized access, use, or alteration of your transmissions or content.</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 7 */}
              <div 
                className={cn(
                  "rounded-xl overflow-hidden border transition-all duration-300",
                  "bg-card shadow-sm hover:shadow-md cursor-pointer",
                  openTerm === "7. Contact Us" ? "border-primary/20" : "border-border"
                )}
                onClick={() => toggleTerm("7. Contact Us")}
              >
                <div className="p-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium text-card-foreground/90">
                      7. Contact Us
                    </h3>
                    <div className="flex items-center justify-center w-6 h-6">
                      <ChevronDown className={cn(
                        "h-5 w-5 text-muted-foreground transition-transform duration-300",
                        openTerm === "7. Contact Us" && "rotate-180"
                      )} />
                    </div>
                  </div>
                  <div className={cn(
                    "grid transition-all duration-300 ease-in-out",
                    openTerm === "7. Contact Us" ? "grid-rows-[1fr] opacity-100 mt-4" : "grid-rows-[0fr] opacity-0"
                  )}>
                    <div className="overflow-hidden text-muted-foreground">
                      <p className="mb-2">
                        If you have any questions about these Terms, please contact us at:
                      </p>
                      <p className="font-medium text-foreground">support@myblocks.dev</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
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