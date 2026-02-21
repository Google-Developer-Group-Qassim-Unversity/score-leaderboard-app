"use client"

import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { formatMagazineDate, openMagazinePDF, type Magazine } from "@/lib/magazines"
import { BookOpen, Calendar, FileText, ExternalLink } from "lucide-react"
import { useTranslation } from 'react-i18next'
import '@/lib/i18n-client'

import { useRouter } from "next/navigation"

interface MagazineCardProps {
  magazine: Magazine
}

export function MagazineCard({ magazine }: MagazineCardProps) {
  const router = useRouter()
  const { t, i18n } = useTranslation()
  const rtl = i18n.language === 'ar'

  const handleReadPDF = () => {
    router.push(`/magazines/${magazine.id}`)
  }


  return (
    <Card
      className="group bg-white border border-slate-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 h-full flex flex-col"
    >
      {/* Magazine Cover */}
      <div className="relative overflow-hidden">
        <div className="relative bg-slate-100">
          <Image
            src={magazine.coverImage}
            alt={`${magazine.title} cover`}
            width={2550}
            height={3300}
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          />
          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Quick Read Button */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Button
              className="bg-white text-slate-900 hover:bg-slate-100 font-semibold px-6 cursor-pointer"
              onClick={handleReadPDF}
            >
              <BookOpen className={`h-4 w-4 ${rtl ? 'ml-2' : 'mr-2'}`} />
              {t('magazines.readPDF')}
            </Button>
          </div>
        </div>
      </div>

      {/* Magazine Info */}
      <CardHeader className="space-y-4 flex-1">
        <div className="flex items-center justify-between">
          <Badge variant="secondary" className="bg-slate-100 text-slate-700">
            <FileText className={`h-3 w-3 ${rtl ? 'ml-1' : 'mr-1'}`} />
            {magazine.pages} {t('magazines.pages')}
          </Badge>
          <Badge variant="outline" className="text-xs border-slate-300">
            <Calendar className={`h-3 w-3 ${rtl ? 'ml-1' : 'mr-1'}`} />
            {magazine.publishDate}
          </Badge>
        </div>

        <div>
          <CardTitle className="text-lg font-semibold text-slate-900 line-clamp-2 mb-2">
            {magazine.title}
          </CardTitle>

          {magazine.description && (
            <CardDescription className="text-slate-600 line-clamp-3 text-sm leading-relaxed">
              {magazine.description}
            </CardDescription>
          )}
        </div>
      </CardHeader>

      <CardContent className="pt-0 space-y-3">
        <div className="flex justify-center">
          <Button
            variant="outline"
            size="sm"
            className="w-full border-slate-300 cursor-pointer"
            onClick={handleReadPDF}
          >
            <ExternalLink className={`h-3 w-3 ${rtl ? 'ml-1' : 'mr-1'}`} />
            {t('magazines.readPDF')}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
