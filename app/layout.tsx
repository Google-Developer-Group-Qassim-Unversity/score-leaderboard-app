import type React from "react"
import type { Metadata, Viewport } from "next"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/sonner"
import Script from "next/script"
import { ClientDashboardWrapper } from "@/components/client-dashboard-wrapper"
import { ClerkProviderWrapper } from "@/components/clerk-provider-wrapper"
import { getLanguageFromCookies, isRTL } from "@/lib/server-i18n"

export const metadata: Metadata = {
  title: {
    default: "GDG",
    template: "%s - GDG",
  },
  description: "",
  icons: {
    icon: "/favicon.ico",
  },
  manifest: "/site.webmanifest",
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
            href="https://fonts.googleapis.com/css2?family=Noto+Sans+Arabic:wght@100;200;300;400;500;600;700;800;900&display=swap"
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
        </head>
        <body className="font-sans antialiased">
          <ClientDashboardWrapper>
              <Navigation />
              {children}
              <Footer />
              <Analytics />
              <Toaster />
          </ClientDashboardWrapper>
        </body>
      </html>
    </ClerkProviderWrapper>
  )
}
