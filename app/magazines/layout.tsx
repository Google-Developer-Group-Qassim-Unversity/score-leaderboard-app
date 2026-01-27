import { Metadata } from "next"

export const metadata: Metadata = {
  title: 'Magazines - GDG Leaderboard',
  description: 'Explore our collection of technology magazines featuring the latest insights, tutorials, and innovations in software development.',
  openGraph: {
    title: 'GDG Magazines',
    description: 'Explore our collection of technology magazines featuring the latest insights, tutorials, and innovations in software development.',
  },
}

export default function MagazinesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}