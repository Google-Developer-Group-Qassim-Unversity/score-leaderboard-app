'use client';

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { BookOpen, ArrowRight } from "lucide-react"
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
      {/* Section Header */}
      <HomeSectionHeader
        icon={BookOpen}
        title={t('magazines.section.title')}
        subtitle={t('magazines.section.subtitle')}
      />

      {/* Magazines Horizontal Scroll */}
      {magazines.length > 0 ? (
        <div className="mx-auto max-w-5xl">
          <div 
            className="flex gap-6 overflow-x-auto overflow-y-hidden pb-4 px-1 snap-x snap-mandatory scrollbar-hide"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {magazines.map((magazine) => (
              <div 
                key={magazine.id} 
                className="min-w-[280px] w-[280px] flex-shrink-0 snap-center"
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

      {/* View All Button */}
      {magazines.length > 0 && (
        <div className="text-center mt-8">
          <Link href="/magazines" passHref legacyBehavior>
            <Button asChild variant="outline" className="border-slate-300 hover:bg-slate-50 cursor-pointer">
              <a>
                {t('magazines.section.viewAll')}
                <ArrowRight className="w-4 h-4 ms-2 rtl:rotate-180" />
              </a>
            </Button>
          </Link>
        </div>
      )}
    </section>
  )
}
