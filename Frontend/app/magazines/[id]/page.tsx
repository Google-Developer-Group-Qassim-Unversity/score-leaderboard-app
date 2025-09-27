"use client"

import { notFound } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { PDFFlipbook } from "@/components/pdf-flipbook"
import { getMagazineById, formatMagazineDate } from "@/lib/magazines"
import { ArrowLeft, Calendar, FileText, Share2 } from "lucide-react"

interface MagazinePageProps {
  params: {
    id: string
  }
}

export default function MagazinePage({ params }: MagazinePageProps) {
  const magazine = getMagazineById(params.id)
  
  if (!magazine) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
      <div className="w-full px-0 md:px-4 py-0 md:py-4">
        {/* Navigation Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-1 md:mb-4 px-2 md:px-0">
          <div className="flex items-center gap-4">
            <Link href="/magazines">
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Magazines
              </Button>
            </Link>
            
            <div className="hidden md:block">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                {magazine.title}
              </h1>
              <div className="flex items-center gap-4 mt-1">
                <Badge variant="secondary" className="text-xs">
                  <FileText className="h-3 w-3 mr-1" />
                  {magazine.pages} pages
                </Badge>
                <Badge variant="outline" className="text-xs">
                  <Calendar className="h-3 w-3 mr-1" />
                  {formatMagazineDate(magazine.publishDate)}
                </Badge>
              </div>
            </div>
          </div>

          <a 
            href={magazine.pdfUrl} 
            download={`${magazine.title}.pdf`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="outline" size="sm" className="w-full">
              <FileText className="h-4 w-4" />
              <span className="ml-2">Download PDF</span>
            </Button>
          </a>
        </div>



        {/* PDF Flipbook - Full Screen */}
        <div className="w-full h-[calc(100vh-3rem)] md:h-[calc(100vh-6rem)] bg-white/95 backdrop-blur-sm border-0 md:border border-gray-200 dark:bg-gray-800/95 dark:border-gray-700 md:rounded-lg overflow-hidden shadow-2xl">
          <PDFFlipbook 
            pdfUrl={magazine.pdfUrl}
            title={magazine.title}
            showCloseButton={true}
          />
        </div>
      </div>
    </div>
  )
}