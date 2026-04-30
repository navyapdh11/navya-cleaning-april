// src/app/layout.tsx
import { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { LocationBanner } from "@/components/LocationBanner";
import { Navbar } from "@/components/Navbar";
import { LeadCapture } from "@/components/marketing/LeadCapture";
import { Footer } from "@/components/Footer";
import { AdBanner } from "@/components/AdBanner";
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
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_AU",
    siteName: "NAVYA MYTHOS",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://navya-cleaning-april.onrender.com",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "NAVYA MYTHOS — Enterprise Sanitization",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NAVYA MYTHOS | Enterprise Sanitization",
    description: "2026 Enterprise-grade hygiene powered by autonomous systems, self-learning optimization, and AEO-ready compliance data.",
    images: ["/og-image.png"],
  },
};

async function getGtmId(): Promise<string> {
  try {
    const res = await fetch('http://localhost:3000/api/mythos', {
      method: 'POST',
      body: JSON.stringify({ action: 'get_config' }),
      cache: 'force-cache',
    });
    if (res.ok) {
      const data = await res.json();
      if (data?.gtmId) return data.gtmId;
    }
  } catch {
    // fall through
  }
  return process.env.NEXT_PUBLIC_GTM_ID || "GTM-XXXXXXX";
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gtmId = await getGtmId();
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`} suppressHydrationWarning>
      <body>
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-indigo-600 focus:text-white focus:rounded-lg focus:shadow-lg focus:outline-none">
          Skip to main content
        </a>
        <GoogleTagManager gtmId={gtmId} />
        <LocationBanner />
        <Navbar />
        <AdBanner />
        {children}
        <Footer />
        <LeadCapture />
        <Analytics />
      </body>
    </html>
  );
}
