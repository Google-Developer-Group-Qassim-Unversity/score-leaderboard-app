import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Club Structure",
  description: "Meet the leadership and organizational structure of GDG on Campus at Qassim University.",
  alternates: {
    canonical: "/club-structure",
  },
}

export default function ClubStructureLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <>{children}</>
}
