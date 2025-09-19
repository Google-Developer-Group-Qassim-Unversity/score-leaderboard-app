import type React from "react"
import type { Metadata } from "next"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { Navigation } from "@/components/navigation"
import { Suspense } from "react"
import I18nProvider from "@/components/I18nProvider"
import LanguageHandler from "@/components/LanguageHandler"

export const metadata: Metadata = {
  title: "Leaderboard",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.png" type="image/png"/>
      </head>
      <body className="font-sans">
        <I18nProvider>
          <LanguageHandler />
          <Suspense fallback={<div>Loading...</div>}>
            <Navigation />
            {children}
          </Suspense>
        </I18nProvider>
        <Analytics />
      </body>
    </html>
  )
}
