import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MyBlocks - Store and Retrieve Your UI Components",
  description: "A SaaS platform for developers to store and retrieve their favorite UI components and styles",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
          {/* Light mode favicon */}
          <link rel="icon" href="/favicon-light.ico" sizes="48x48" />

          {/* Dark mode favicon */}
          <link
            rel="icon"
            href="/favicon-dark.ico"
            sizes="48x48"
            media="(prefers-color-scheme: dark)"
          />

          {/* Web App Manifest */}
          <link rel="manifest" href="/manifest.json" />
        </head>
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
