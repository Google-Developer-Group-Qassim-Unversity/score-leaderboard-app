export interface Magazine {
  id: string
  title: string
  description: string
  pdfUrl: string // External URL to hosted PDF
  coverImage: string
  publishDate: string
  pages: number
}

// Static magazine data - add more magazines as needed
export const magazines: Magazine[] = [
  {
    id: "gdg-volume-1",
    title: "مجلة قوقل لشهر سبتمبر 2025",
    description: "",
    pdfUrl: "https://heyzine.com/flip-book/4717de5304.html", 
    coverImage: "/picV1.jpg",
    publishDate: "2025-10-03",
    pages: 8
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

// Function to open PDF in new tab/window
export function openMagazinePDF(pdfUrl: string): void {
  window.open(pdfUrl, '_blank', 'noopener,noreferrer')
}