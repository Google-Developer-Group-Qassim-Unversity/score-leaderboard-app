import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "How It Works",
  description: "Learn how the GDG on Campus points system works and how to climb the leaderboard.",
  alternates: {
    canonical: "/how",
  },
}

export default function HowLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <>{children}</>
}
