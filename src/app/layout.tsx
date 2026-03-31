import type { Metadata } from "next";
import localFont from "next/font/local";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { AuroraBackground } from "@/components/layout/AuroraBackground";
import { Footer } from "@/components/layout/Footer";

const clashDisplay = localFont({
  src: [
    {
      path: "../../public/fonts/ClashDisplay-Variable.woff2",
      weight: "200 700",
      style: "normal",
    },
  ],
  variable: "--font-clash",
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ISLA — Ibiza's Premier Nightlife Experience",
  description:
    "The definitive way to experience Ibiza nightlife. Every club. Every night. One place. Official tickets for Pacha, Amnesia, Hï Ibiza, Ushuaïa, DC-10, and UNVRS.",
  keywords: [
    "Ibiza tickets",
    "Ibiza clubs",
    "Ibiza nightlife",
    "Pacha Ibiza",
    "Amnesia Ibiza",
    "Hi Ibiza",
    "Ushuaia Ibiza",
    "DC-10",
    "UNVRS",
    "Tomorrowland Ibiza",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${clashDisplay.variable} ${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-bg-deep text-text-primary">
        <AuroraBackground />
        <div className="grain-overlay" />
        <Navbar />
        <main className="relative z-10 flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
