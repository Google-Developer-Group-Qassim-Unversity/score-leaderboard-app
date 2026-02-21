'use client';

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, MoveRight } from "lucide-react"
import { MagazineCard } from "@/components/magazine-card"
import { HomeSectionHeader } from "@/components/home-sections/home-section-header"
import { getLatestMagazines } from "@/lib/magazines"
import { useTranslation } from 'react-i18next'
import '@/lib/i18n-client'

export function MagazinesSection() {
  const { t } = useTranslation();
  const magazines = getLatestMagazines(3);

  return (
    <section className="container mx-auto px-4 py-12">
      <HomeSectionHeader
        icon={BookOpen}
        title={t('magazines.section.title')}
        subtitle={t('magazines.section.subtitle')}
      />

      <Card className="bg-white rounded-2xl shadow-lg border border-slate-200 hover:shadow-xl transition-shadow duration-300 overflow-hidden w-full max-w-full min-w-0">
        <div className="p-1">
          <CardHeader className="pb-6">
            <div className="flex items-center justify-between gap-3 mb-2">
              <CardTitle className="text-xl font-bold text-slate-900 flex items-center gap-3">
                <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center shadow-md shrink-0">
                  <BookOpen className="h-4 w-4 text-white" />
                </div>
                <span className="wrap-break-word leading-tight">{t('magazines.section.title')}</span>
              </CardTitle>
              <Link href="/magazines">
                <Button variant="outline" size="default" className="bg-white/80 hover:bg-white border-slate-300 text-slate-700 font-medium shadow-sm hover:shadow-md transition-shadow duration-200 text-xs sm:text-sm px-2 sm:px-3 shrink-0 cursor-pointer">
                  {t('magazines.section.viewAll')}
                  <MoveRight className="h-3 w-3 sm:h-4 sm:w-4 ms-1.5 rtl:rotate-180" />
                </Button>
              </Link>
            </div>
          </CardHeader>

          <CardContent className="relative px-3 sm:px-6">
            {/* Magazines Horizontal Scroll */}
            {magazines.length > 0 ? (
              <div className="w-full max-w-full min-w-0 overflow-hidden">
                <div 
                  className="flex gap-6 overflow-x-auto overflow-y-hidden pb-4 snap-x snap-mandatory scrollbar-hide"
                  style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                  {magazines.map((magazine) => (
                    <div 
                      key={magazine.id} 
                      className="min-w-[280px] w-[280px] shrink-0 snap-center"
                    >
                      <MagazineCard magazine={magazine} />
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-slate-500">{t('magazines.section.empty')}</p>
              </div>
            )}
          </CardContent>
        </div>
      </Card>
    </section>
  )
}
