'use client';

import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Trophy, Users, Building2, TrendingUp, Sparkles, Award, ArrowRight, Activity } from "lucide-react"
import { ClientLeaderboardCards } from "@/components/client-leaderboard-cards"
import { useTranslation } from 'react-i18next'
import { EventCard } from "@/components/event-card"
import { fetchOpenEvents } from "@/lib/api"
import { useEffect, useState } from "react"
import type { ApiOpenEventItem } from "@/lib/api-types"
import '../lib/i18n'

interface DashboardContentProps {
  topMembers: any[]
  practicalDepartments: any[]
  administrativeDepartments: any[]
  membersCount: number
  departmentsCount: number
  totalPoints: number
}

export function DashboardContent({ 
  topMembers, 
  practicalDepartments, 
  administrativeDepartments,
  membersCount,
  departmentsCount, 
  totalPoints 
}: DashboardContentProps) {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const [openEvents, setOpenEvents] = useState<ApiOpenEventItem[]>([]);
  const [isLoadingEvents, setIsLoadingEvents] = useState(true);

  // Fetch open events
  useEffect(() => {
    const loadEvents = async () => {
      try {
        const eventsResponse = await fetchOpenEvents();
        setOpenEvents(eventsResponse.slice(0, 6)); // Show up to 6 events
      } catch (error) {
        console.error('Failed to fetch open events:', error);
      } finally {
        setIsLoadingEvents(false);
      }
    };
    loadEvents();
  }, []);

  return (
    <div className={`min-h-screen bg-white text-slate-900 ${isRTL ? 'rtl' : 'ltr'}`}>
      <div className="relative">
        {/* Hero Section */}
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

        {/* Stats Dashboard */}
        <section className="container mx-auto px-4 py-8">
          <div className="flex flex-row justify-center items-stretch gap-3 sm:gap-4 md:gap-6 w-full">
            {/* Total Members Card */}
            <Card className="bg-white border border-slate-200 rounded-lg flex-1 min-w-0">
              <CardContent className="p-3 sm:p-4 md:p-6 flex flex-col items-center justify-center text-center">
                <div className="flex flex-col items-center justify-center gap-2 mb-2 md:mb-3">
                  <div className="p-2 md:p-3 bg-slate-100 rounded-lg">
                    <Users className="h-5 w-5 md:h-6 md:w-6 text-slate-700" />
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-medium text-slate-500 uppercase">{t('stats.members.title')}</p>
                  <p className="text-2xl md:text-3xl font-bold text-slate-900">
                    {membersCount}
                  </p>
                  <p className="text-xs text-slate-500 hidden sm:block">{t('stats.members.description')}</p>
                </div>
              </CardContent>
            </Card>

            {/* Departments Card */}
            <Card className="bg-white border border-slate-200 rounded-lg flex-1 min-w-0">
              <CardContent className="p-3 sm:p-4 md:p-6 flex flex-col items-center justify-center text-center">
                <div className="flex flex-col items-center justify-center gap-2 mb-2 md:mb-3">
                  <div className="p-2 md:p-3 bg-slate-100 rounded-lg">
                    <Building2 className="h-5 w-5 md:h-6 md:w-6 text-slate-700" />
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-medium text-slate-500 uppercase">{t('stats.departments.title')}</p>
                  <p className="text-2xl md:text-3xl font-bold text-slate-900">
                    {departmentsCount}
                  </p>
                  <p className="text-xs text-slate-500 hidden sm:block">{t('stats.departments.description')}</p>
                </div>
              </CardContent>
            </Card>

            {/* Total Points Card */}
            <Card className="bg-white border border-slate-200 rounded-lg flex-1 min-w-0">
              <CardContent className="p-3 sm:p-4 md:p-6 flex flex-col items-center justify-center text-center">
                <div className="flex flex-col items-center justify-center gap-2 mb-2 md:mb-3">
                  <div className="p-2 md:p-3 bg-slate-100 rounded-lg">
                    <Award className="h-5 w-5 md:h-6 md:w-6 text-slate-700" />
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-medium text-slate-500 uppercase">{t('stats.points.title')}</p>
                  <p className="text-2xl md:text-3xl font-bold text-slate-900">
                    {totalPoints.toLocaleString()}
                  </p>
                  <p className="text-xs text-slate-500 hidden sm:block">{t('stats.points.description')}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Leaderboard Section */}
        <section className="container mx-auto px-4 py-12">
          {/* Section Header */}
          <div className="text-center mb-8 space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-slate-100 rounded-full border border-slate-200">
              <Trophy className="w-4 h-4 text-slate-600" />
              <span className="text-sm font-medium text-slate-700">{t('leaderboard.badge')}</span>
            </div>
            <h2 className="text-2xl md:text-4xl font-bold tracking-tight text-slate-900">
              {t('leaderboard.title')}
            </h2>
            <p className="text-slate-600 text-sm md:text-base max-w-2xl mx-auto">
              {t('leaderboard.subtitle')}
            </p>
          </div>

          {/* Leaderboard Cards */}
          <div className="w-full">
            <ClientLeaderboardCards 
              topMembers={topMembers}
              practicalDepartments={practicalDepartments}
              administrativeDepartments={administrativeDepartments}
            />
          </div>
        </section>

        
      </div>
    </div>
  )
}