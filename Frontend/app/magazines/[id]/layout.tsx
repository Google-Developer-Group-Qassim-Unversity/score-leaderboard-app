import { getMagazineById } from "@/lib/magazines"
import { Metadata } from "next"

interface MagazineLayoutProps {
  children: React.ReactNode
  params: {
    id: string
  }
}

// Generate metadata for the magazine page
export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const magazine = getMagazineById(params.id)
  
  if (!magazine) {
    return {
      title: 'Magazine Not Found - GDG Magazines',
      description: 'The requested magazine could not be found.',
    }
  }

  return {
    title: `${magazine.title} - GDG Magazines`,
    description: magazine.description,
    openGraph: {
      title: magazine.title,
      description: magazine.description,
      images: [magazine.coverImage],
    },
    twitter: {
      card: 'summary_large_image',
      title: magazine.title,
      description: magazine.description,
      images: [magazine.coverImage],
    },
  }
}

export default function MagazineLayout({ children }: MagazineLayoutProps) {
  return <>{children}</>
}