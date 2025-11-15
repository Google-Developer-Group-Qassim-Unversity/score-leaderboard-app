import type React from "react"
import type { Metadata } from "next"
import { ClerkProvider } from "@clerk/nextjs"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { Navigation } from "@/components/navigation"
import { Suspense } from "react"
import Script from 'next/script';
export const metadata: Metadata = {
  title: "GDG",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <link rel="icon" href="/favicon.png" type="image/png"/>
          <link rel="manifest" href="/manifest.json" />
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
        <body className="font-sans">
          <Suspense fallback={<div>Loading...</div>}>
            <Navigation />
            {children}
          </Suspense>
          <Analytics />
        </body>
      </html>
    </ClerkProvider>
  )
}
