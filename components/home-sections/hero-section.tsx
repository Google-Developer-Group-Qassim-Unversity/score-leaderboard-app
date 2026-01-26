'use client';

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Users, Building2 } from "lucide-react"
import { useTranslation } from 'react-i18next'
import '@/lib/i18n'

export function HeroSection() {
  const { t } = useTranslation();

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

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
          <Link href="/members" passHref legacyBehavior>
            <Button asChild size="lg" className="bg-slate-900 hover:bg-slate-800 text-white w-full sm:w-auto cursor-pointer">
              <a>
                <Users className="w-4 h-4 mr-2" />
                {t('hero.viewAllMembers')}
              </a>
            </Button>
          </Link>
          <Link href="/departments" passHref legacyBehavior>
            <Button asChild size="lg" variant="outline" className="border-slate-300 hover:bg-slate-50 w-full sm:w-auto cursor-pointer">
              <a>
                <Building2 className="w-4 h-4 mr-2" />
                {t('hero.viewDepartments')}
              </a>
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
