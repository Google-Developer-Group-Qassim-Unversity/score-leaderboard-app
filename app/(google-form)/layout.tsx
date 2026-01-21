import type React from "react"

export default function GoogleFormLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <main className="h-[calc(100vh-64px)]">
      {children}
    </main>
  )
}
