// src/app/layout.tsx
import { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { LocationBanner } from "@/components/LocationBanner";
import { Navbar } from "@/components/Navbar";
import { LeadCapture } from "@/components/marketing/LeadCapture";
import { GoogleTagManager } from '@next/third-parties/google';
import { Analytics } from '@vercel/analytics/react';

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: {
    default: "NAVYA MYTHOS | Enterprise Sanitization",
    template: "%s | NAVYA MYTHOS",
  },
  description: "2026 Enterprise-grade hygiene powered by autonomous systems, self-learning optimization, and AEO-ready compliance data.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://navya-cleaning-april.onrender.com"),
  openGraph: {
    type: "website",
    locale: "en_AU",
    siteName: "NAVYA MYTHOS",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`} suppressHydrationWarning>
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
