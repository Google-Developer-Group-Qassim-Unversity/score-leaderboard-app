import type React from "react"
import type { Metadata, Viewport } from "next"
import "./globals.css"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/sonner"
import Script from "next/script"
import { ClientDashboardWrapper } from "@/components/client-dashboard-wrapper"
import { ClerkProviderWrapper } from "@/components/clerk-provider-wrapper"
import { QueryProvider } from "@/components/providers/query-provider"
import { getLanguageFromCookies, isRTL } from "@/lib/server-i18n"
import { config } from "@/lib/config"

const siteDescription =
  "GDG Qassim is a student-led community fostering innovation and technical skills through workshops, events, and collaborative projects. Track your points and climb the leaderboard."

export const metadata: Metadata = {
  metadataBase: new URL(config.thisAppUrl),
  title: {
    default: "GDG Qassim",
    template: "%s - GDG Qassim",
  },
  description: siteDescription,
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/favicon.ico",
  },
  manifest: "/site.webmanifest",
  openGraph: {
    type: "website",
    siteName: "GDG Qassim",
    title: "GDG Qassim",
    description: siteDescription,
    images: ["/gdg.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "GDG Qassim",
    description: siteDescription,
    images: ["/gdg.png"],
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "#252525" },
  ],
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const lang = await getLanguageFromCookies();
  const rtl = isRTL(lang);

  return (
    <ClerkProviderWrapper>
      <html lang={lang} dir={rtl ? 'rtl' : 'ltr'} suppressHydrationWarning>
        <head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link
            href="https://fonts.googleapis.com/css2?family=Tajawal:wght@200;300;400;500;700;800;900&display=swap"
            rel="stylesheet"
          />
          <Script
            src="https://www.googletagmanager.com/gtag/js?id=G-Z62ENW3LFQ"
            strategy="afterInteractive"
          />
          <Script id="gtag-init" strategy="afterInteractive">
            {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-Z62ENW3LFQ');
          `}
          </Script>
          <Script
            defer
            data-domain="gdg-q.com"
            src="https://analytics.dragpath.ai/js/script.file-downloads.hash.outbound-links.pageview-props.tagged-events.js"
            strategy="afterInteractive"
          />
          <Script id="plausible-init" strategy="afterInteractive">
            {`window.plausible = window.plausible || function() { (window.plausible.q = window.plausible.q || []).push(arguments) }`}
          </Script>
        </head>
        <body className="font-sans antialiased">
          <QueryProvider>
            <ClientDashboardWrapper>
                <Navigation />
                {children}
                <Footer />
                <Toaster />
            </ClientDashboardWrapper>
          </QueryProvider>
        </body>
      </html>
    </ClerkProviderWrapper>
  )
}
