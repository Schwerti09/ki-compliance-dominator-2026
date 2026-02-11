import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import CookieConsent from "@/components/shared/CookieConsent";
import { ThemeProvider } from "@/components/shared/ThemeProvider";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"], display: "swap", variable: "--font-inter" });

export const metadata: Metadata = {
  title: {
    default: "KI Compliance Dominator 2026",
    template: "%s | KI Compliance Dominator 2026"
  },
  description:
    "Automatisierte KI-Compliance für EU AI Act & ISO 42001 – inkl. agentischer Workflows, 3D Risiko-Visualisierung, Audit-Trails und Stripe-Abos.",
  openGraph: {
    title: "KI Compliance Dominator 2026",
    description: "Automatisierte KI-Compliance (EU AI Act / ISO 42001) – Demo-SaaS mit Supabase + Stripe.",
    images: ["/og-image.jpg"]
  },
  robots: { index: true, follow: true }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0A1A3A",
  colorScheme: "dark"
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "KI Compliance Dominator 2026",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  offers: { "@type": "Offer", priceCurrency: "EUR", price: "200" }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" className={`${inter.variable} dark`} suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon/icon.svg" type="image/svg+xml" />
        <link rel="manifest" href="/favicon/manifest.json" />
        <meta name="theme-color" content="#0A1A3A" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body className={`${inter.className} gradient-bg min-h-screen flex flex-col`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <div className="fixed inset-0 -z-10">
            <div className="absolute inset-0 grid-pattern opacity-10" />
            <div className="absolute inset-0 noise-texture opacity-40" />
          </div>

          <Header />
          <main className="flex-1">{children}</main>
          <Footer />

          <CookieConsent />
          <Toaster position="bottom-right" />
          <Analytics />
          <SpeedInsights />
        </ThemeProvider>
      </body>
    </html>
  );
}
