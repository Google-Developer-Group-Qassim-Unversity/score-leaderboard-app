export interface Magazine {
  id: string
  title: string
  description: string
  pdfUrl: string
  coverImage: string
  publishDate: string
  pages: number
}

// Static magazine data - add more magazines as needed
export const magazines: Magazine[] = [
  {
    id: "gdg-tech-insights-2025",
    title: "test",
    description: "A comprehensive guide to the latest technology trends and innovations in 2025",
    pdfUrl: "/magazines/test1.pdf",
    coverImage: "/pic.jpg",
    publishDate: "2025-09-01",
    pages: 32
  }
]

// Utility functions for magazine operations
export function getAllMagazines(): Magazine[] {
  return magazines.sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime())
}

export function getMagazineById(id: string): Magazine | undefined {
  return magazines.find(magazine => magazine.id === id)
}

export function getMagazinesByYear(year: number): Magazine[] {
  return magazines.filter(magazine => new Date(magazine.publishDate).getFullYear() === year)
}

export function getLatestMagazines(count: number = 3): Magazine[] {
  return getAllMagazines().slice(0, count)
}

// Format date for display
export function formatMagazineDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}