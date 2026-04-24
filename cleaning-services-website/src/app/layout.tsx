// src/app/layout.tsx
import { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { LocationBanner } from "@/components/LocationBanner";
import { Navbar } from "@/components/Navbar";
import { LeadCapture } from "@/components/marketing/LeadCapture";
import { GoogleTagManager } from '@next/third-parties/google';
import { Analytics } from '@vercel/analytics/react';

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "CleanPro AU | Professional Cleaning Services Australia",
    template: "%s | CleanPro AU",
  },
  description: "Australia's top-rated professional cleaning services. Domestic, end-of-lease, and commercial cleaning with bond-back guarantees across all states.",
  // ... rest of metadata
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable}`}>
      <head>
        {/* Add GTM here or via script */}
      </head>
      <body>
        <GoogleTagManager gtmId="GTM-XXXXXXX" />
        <LocationBanner />
        <Navbar />
        {children}
        <LeadCapture />
        <Analytics />
      </body>
    </html>
  );
}
