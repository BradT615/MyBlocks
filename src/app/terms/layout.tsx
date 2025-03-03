// src/app/terms/layout.tsx
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | MyBlocks",
  description: "Terms of Service for MyBlocks",
};

export default function TermsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}