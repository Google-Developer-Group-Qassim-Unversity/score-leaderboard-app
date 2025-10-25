"use client"

import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { getAllMagazines, formatMagazineDate, openMagazinePDF } from "@/lib/magazines"
import { BookOpen, Calendar, FileText, ArrowLeft, ExternalLink } from "lucide-react"

export default function MagazinesPage() {
  const magazines = getAllMagazines()

  const handleReadPDF = (pdfUrl: string) => {
    openMagazinePDF(pdfUrl)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 text-slate-800 relative overflow-x-hidden">
      {/* Scroll Progress Indicator */}
      <div className="fixed top-0 left-0 w-full h-1 bg-slate-200 z-50">
        <div className="h-full bg-gradient-to-r from-purple-500 via-blue-500 to-green-500 transition-all duration-300" style={{width: '0%'}}></div>
      </div>
      
      {/* Background Decoration */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-40 left-1/3 w-72 h-72 bg-green-200 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-2000"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-12">
            <Link href="/" className="inline-block mb-6">
              <Button variant="outline" size="sm" className="bg-white/80 hover:bg-white border-slate-300 text-slate-700 font-medium shadow-sm hover:shadow-md transition-shadow duration-200">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
            
            <div className="text-center">
              <div className="flex items-center justify-center flex-col md:flex-row gap-4 mb-6">
                <div className="relative">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/30 transform hover:scale-105 transition-transform duration-200">
                    <BookOpen className="h-8 w-8 text-white" />
                  </div>
                </div>
                <h1 className="text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent leading-tight">
                  GDG Magazines
                </h1>
              </div>
              
            </div>
          </div>

          {/* Magazines Grid */}
          {magazines.length === 0 ? (
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-12 text-center shadow-lg border border-slate-200">
              <BookOpen className="h-16 w-16 text-slate-400 mx-auto mb-6" />
              <h3 className="text-xl font-semibold text-slate-900 mb-3">
                No magazines available
              </h3>
              <p className="text-slate-600 max-w-md mx-auto">
                Check back soon for new magazine releases featuring the latest in technology and development.
              </p>
            </div>
          ) : (
            <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {magazines.map((magazine, index) => (
                <Card 
                  key={magazine.id} 
                  className="group relative bg-white/90 backdrop-blur-sm border border-slate-200/60 rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-slate-900/10 transition-all duration-500 transform hover:-translate-y-2"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Magazine Cover */}
                  <div className="relative overflow-hidden">
                    <div className="aspect-[3/4] relative bg-gradient-to-br from-slate-100 to-slate-200">
                      <Image
                        src={magazine.coverImage}
                        alt={`${magazine.title} cover`}
                        fill
                        className="object-cover transition-all duration-500 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      />
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
                      
                      {/* Floating Action Button */}
                      <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-x-8 group-hover:translate-x-0">
                        <Button 
                          size="sm" 
                          className="w-10 h-10 p-0 rounded-full bg-white/90 text-slate-900 hover:bg-white shadow-lg"
                          onClick={() => handleReadPDF(magazine.pdfUrl)}
                        >
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      </div>

                      {/* Quick Read Button */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                        <Button 
                          className="bg-white/95 text-slate-900 hover:bg-white shadow-xl backdrop-blur-sm font-semibold px-6"
                          onClick={() => handleReadPDF(magazine.pdfUrl)}
                        >
                          <BookOpen className="h-4 w-4 mr-2" />
                          Read PDF
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Magazine Info */}
                  <CardHeader className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary" className="bg-purple-100 text-purple-700 border-purple-200">
                        <FileText className="h-3 w-3 mr-1" />
                        {magazine.pages} pages
                      </Badge>
                      <Badge variant="outline" className="text-xs border-slate-300">
                        <Calendar className="h-3 w-3 mr-1" />
                        {formatMagazineDate(magazine.publishDate)}
                      </Badge>
                    </div>
                    
                    <div>
                      <CardTitle className="text-lg font-bold text-slate-900 line-clamp-2 group-hover:text-purple-600 transition-colors duration-200 mb-2">
                        {magazine.title}
                      </CardTitle>
                      
                      <CardDescription className="text-slate-600 line-clamp-3 text-sm leading-relaxed">
                        {magazine.description}
                      </CardDescription>
                    </div>
                  </CardHeader>

                  <CardContent className="pt-0 space-y-3">
                    <div className="flex justify-center">
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="w-full border-slate-300 hover:border-purple-400 hover:text-purple-600 transition-colors"
                        onClick={() => handleReadPDF(magazine.pdfUrl)}
                      >
                        <ExternalLink className="h-3 w-3 mr-1" />
                        Read PDF
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}