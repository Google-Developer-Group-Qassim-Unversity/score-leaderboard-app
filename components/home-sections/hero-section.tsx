import Image from "next/image"
import { getTranslation } from "@/lib/server-i18n"
import type { Language } from "@/lib/translations"

interface HeroSectionProps {
  lang: Language
}

export function HeroSection({ lang }: HeroSectionProps) {
  const t = (key: string) => getTranslation(lang, key);

  return (

    <section className="container mx-auto px-4 pt-12 md:pt-20 pb-8 md:pb-12">
      
      <div className="text-center space-y-6 max-w-4xl mx-auto">
        {/* Logo with Version Badge */}
        <div className="flex flex-col items-center gap-4 mb-6">
          <div className="relative">
            <Image
              src="/gdg.png"
              alt="GDG Logo"
              width={80}
              height={80}
              className="w-16 h-16 md:w-20 md:h-20 object-contain"
            />
            {/* Simple Version 2.0 Badge */}
            <div className="absolute -top-1 -right-1">
              <span className="flex items-center justify-center w-7 h-7 rounded-full bg-slate-100 border border-slate-300 text-slate-700 font-semibold text-xs">
                2.0
              </span>
            </div>
          </div>
        </div>

        {/* Main Heading */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900">
          {t('hero.title.performance')}
          <br />
          {t('hero.title.leaderboard')}
        </h1>

        {/* Subheading */}
        <p className="text-base md:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
          {t('hero.subtitle')}
        </p>
      </div>
    </section>
  )
}
