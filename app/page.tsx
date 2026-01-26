'use client';

import { useTranslation } from 'react-i18next'
import { HeroSection, StatsSection, EventsSection, LeaderboardSection } from "@/components/home-sections"
import '@/lib/i18n'

export default function Dashboard() {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  return (
    <div className={`min-h-screen bg-white text-slate-900 ${isRTL ? 'rtl' : 'ltr'}`}>
      <div className="relative">
        <HeroSection />
        <StatsSection />
        <LeaderboardSection />
        <EventsSection />
      </div>
    </div>
  )
}
