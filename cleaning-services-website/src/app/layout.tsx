import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { LocationBanner } from "@/components/LocationBanner";
import { Navbar } from "@/components/Navbar";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NAVYA MYTHOS | 2026 Enterprise Sanitization",
  description: "Advanced autonomous cleaning services for the 2026 enterprise.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable}`}>
      <body>
        <LocationBanner />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
