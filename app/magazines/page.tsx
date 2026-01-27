"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { getAllMagazines } from "@/lib/magazines"
import { BookOpen, ArrowLeft } from "lucide-react"
import { MagazineCard } from "@/components/magazine-card"
import { useTranslation } from 'react-i18next'
import '@/lib/i18n-client'

export default function MagazinesPage() {
  const { t, i18n } = useTranslation()
  const magazines = getAllMagazines()
  const rtl = i18n.language === 'ar'

  return (
    <div className={`min-h-screen bg-white text-slate-800 ${rtl ? 'rtl' : 'ltr'}`}>
      {/* Content */}
      <div className="">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-12">
     
            
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
              {magazines.map((magazine) => (
                <MagazineCard key={magazine.id} magazine={magazine} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
