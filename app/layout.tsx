import type React from "react"
import type { Metadata, Viewport } from "next"
import { Analytics } from "@vercel/analytics/next"
import { Tajawal } from "next/font/google"
import "./globals.css"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/sonner"
import Script from "next/script"
import { ClientDashboardWrapper } from "@/components/client-dashboard-wrapper"
import { ClerkProviderWrapper } from "@/components/clerk-provider-wrapper"
import { QueryProvider } from "@/components/providers/query-provider"
import { LanguageProvider } from "@/components/language-provider"

const tajawal = Tajawal({
  subsets: ["arabic"],
  weight: ["200", "300", "400", "500", "700", "800", "900"],
  variable: "--font-arabic",
  display: "swap",
})

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProviderWrapper>
      <html lang="ar" dir="rtl" suppressHydrationWarning className={tajawal.variable}>
        <head>
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
          <QueryProvider>
            <ClientDashboardWrapper>
              <LanguageProvider>
                <Navigation />
                {children}
                <Footer />
                <Analytics />
                <Toaster />
              </LanguageProvider>
            </ClientDashboardWrapper>
          </QueryProvider>
        </body>
      </html>
    </ClerkProviderWrapper>
  )
}
