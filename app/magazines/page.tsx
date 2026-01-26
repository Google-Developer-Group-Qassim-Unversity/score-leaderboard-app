"use client"

import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { getAllMagazines, formatMagazineDate, openMagazinePDF } from "@/lib/magazines"
import { BookOpen, Calendar, FileText, ArrowLeft, ExternalLink } from "lucide-react"
import { useTranslation } from 'react-i18next'
import '@/lib/i18n-client'

export default function MagazinesPage() {
  const { t, i18n } = useTranslation()
  const magazines = getAllMagazines()
  const rtl = i18n.language === 'ar'

  const handleReadPDF = (pdfUrl: string) => {
    openMagazinePDF(pdfUrl)
  }

  return (
    <div className={`min-h-screen bg-white text-slate-800 ${rtl ? 'rtl' : 'ltr'}`}>
      {/* Content */}
      <div className="">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-12">
            <Link href="/" className="inline-block mb-6">
              <Button variant="outline" size="sm" className="border-slate-300 text-slate-700">
                <ArrowLeft className={`h-4 w-4 ${rtl ? 'ml-2' : 'mr-2'}`} />
                {t('magazines.backButton')}
              </Button>
            </Link>
            
            <div className="text-center">
              <div className="flex items-center justify-center flex-col md:flex-row gap-4 mb-6">
                <div className="relative">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-600 rounded-lg flex items-center justify-center">
                    <BookOpen className="h-8 w-8 text-white" />
                  </div>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-slate-900 leading-tight">
                  {t('magazines.heading')}
                </h1>
              </div>
              
            </div>
          </div>

          {/* Magazines Grid */}
          {magazines.length === 0 ? (
            <div className="bg-white rounded-lg p-12 text-center border border-slate-200">
              <BookOpen className="h-16 w-16 text-slate-400 mx-auto mb-6" />
              <h3 className="text-xl font-semibold text-slate-900 mb-3">
                {t('magazines.noMagazines.title')}
              </h3>
              <p className="text-slate-600 max-w-md mx-auto">
                {t('magazines.noMagazines.desc')}
              </p>
            </div>
          ) : (
            <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {magazines.map((magazine, index) => (
                <Card 
                  key={magazine.id} 
                  className="group bg-white border border-slate-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300"
                >
                  {/* Magazine Cover */}
                  <div className="relative overflow-hidden">
                    <div className="aspect-[3/4] relative bg-slate-100">
                      <Image
                        src={magazine.coverImage}
                        alt={`${magazine.title} cover`}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      />
                      {/* Overlay on hover */}
                      <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      
                      {/* Quick Read Button */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <Button 
                          className="bg-white text-slate-900 hover:bg-slate-100 font-semibold px-6"
                          onClick={() => handleReadPDF(magazine.pdfUrl)}
                        >
                          <BookOpen className={`h-4 w-4 ${rtl ? 'ml-2' : 'mr-2'}`} />
                          {t('magazines.readPDF')}
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Magazine Info */}
                  <CardHeader className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary" className="bg-slate-100 text-slate-700">
                        <FileText className={`h-3 w-3 ${rtl ? 'ml-1' : 'mr-1'}`} />
                        {magazine.pages} {t('magazines.pages')}
                      </Badge>
                      <Badge variant="outline" className="text-xs border-slate-300">
                        <Calendar className={`h-3 w-3 ${rtl ? 'ml-1' : 'mr-1'}`} />
                        {formatMagazineDate(magazine.publishDate, i18n.language as 'en' | 'ar')}
                      </Badge>
                    </div>
                    
                    <div>
                      <CardTitle className="text-lg font-semibold text-slate-900 line-clamp-2 mb-2">
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
                        className="w-full border-slate-300"
                        onClick={() => handleReadPDF(magazine.pdfUrl)}
                      >
                        <ExternalLink className={`h-3 w-3 ${rtl ? 'ml-1' : 'mr-1'}`} />
                        {t('magazines.readPDF')}
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