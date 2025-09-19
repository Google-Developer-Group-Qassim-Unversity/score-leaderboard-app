"use client"

import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Trophy, Users, ArrowLeft, Eye, Search } from "lucide-react"
import { fetchMembers, fetchMembersCount, transformApiMember } from "@/lib/api"
import { MembersSearch } from "./members-search"

export default function MembersLeaderboard() {
  const { t } = useTranslation()
  const [members, setMembers] = useState<any[]>([])
  const [membersCount, setMembersCount] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)

  // Safe text function for hydration - use language-appropriate fallbacks
  const getText = (key: string, fallback: string) => {
    if (!isLoaded) {
      // Get stored language to show appropriate fallback
      const storedLang = typeof window !== 'undefined' ? localStorage.getItem('i18nextLng') || 'ar' : 'ar';
      
      if (storedLang === 'en') {
        // English fallbacks
        const englishDefaults: Record<string, string> = {
          'members.title': 'Members Leaderboard',
          'members.subtitle': 'Members ranked by total points earned through individual achievements and contributions',
          'members.totalMembers': 'Total Members',
          'members.pointsEarned': 'Points Earned',
          'members.searchPlaceholder': 'Search for members...',
          'members.noMembersFound': 'No members found',
          'members.rankings': 'Member Rankings',
          'members.rankingsSubtitle': 'Individual performance rankings across all members',
          'members.member': 'Member',
          'members.viewDetails': 'View Details'
        }
        return englishDefaults[key] || fallback;
      } else {
        // Arabic fallbacks - match exactly with translation file
        const arabicDefaults: Record<string, string> = {
          'members.title': 'متصدري الأعضاء',
          'members.subtitle': 'عضو مرتب حسب إجمالي النقاط المكتسبة من خلال الإنجازات والمساهمات الفردية',
          'members.totalMembers': 'إجمالي الأعضاء',
          'members.pointsEarned': 'النقاط المكتسبة',
          'members.searchPlaceholder': 'البحث عن أعضاء...',
          'members.noMembersFound': 'لم يتم العثور على أعضاء',
          'members.rankings': 'تصنيفات الأعضاء',
          'members.rankingsSubtitle': 'تصنيفات الأداء الفردي عبر جميع الأعضاء',
          'members.member': 'عضو',
          'members.viewDetails': 'عرض التفاصيل'
        }
        return arabicDefaults[key] || fallback;
      }
    }
    return t(key) || fallback
  }

  useEffect(() => {
    const loadData = async () => {
      try {
        const [apiMembers, count] = await Promise.all([fetchMembers(), fetchMembersCount()])
        
        // Transform and sort API data
        const transformedMembers = apiMembers
          .sort((a, b) => b.points - a.points)
          .map((member, index) => transformApiMember(member, index + 1))

        setMembers(transformedMembers)
        setMembersCount(count)
      } catch (error) {
        console.error('Failed to load members data:', error)
      } finally {
        setIsLoaded(true)
      }
    }

    loadData()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 text-slate-800 relative overflow-x-hidden">
      {/* Scroll Progress Indicator */}
      <div className="fixed top-0 left-0 w-full h-1 bg-slate-200 z-50">
        <div className="h-full bg-gradient-to-r from-blue-500 via-green-500 to-amber-500 transition-all duration-300" style={{width: '0%'}}></div>
      </div>
      
      {/* Background Decoration */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-40 left-1/3 w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-2000"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10">
        <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-12">
          <Link href="/" className="inline-block mb-6">
            <Button variant="outline" size="sm" className="bg-white/80 hover:bg-white border-slate-300 text-slate-700 font-medium shadow-sm hover:shadow-md transition-shadow duration-200">
              <ArrowLeft className="h-4 w-4 mr-2" />
              {getText('members.backToDashboard', 'Back to Dashboard')}
            </Button>
          </Link>
          
          <div className="text-center">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/30 transform hover:scale-105 transition-transform duration-200">
                  <Users className="h-8 w-8 text-white" />
                </div>
              </div>
              <h1 className="text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent leading-tight arabic-title">
                {getText('members.title', 'Members Leaderboard')}
              </h1>
              
            </div>
            <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto font-medium arabic-content">
              {getText('members.subtitle', `${membersCount} members ranked by total points earned through various activities and achievements`)}
            </p>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="mb-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-slate-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center group">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <div className="w-6 h-6 bg-gradient-to-br from-amber-500 to-amber-600 rounded-lg flex items-center justify-center">
                    <Trophy className="w-3 h-3 text-white" />
                  </div>
                  <div className="text-2xl font-bold bg-gradient-to-r from-amber-600 to-amber-700 bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-200">{members[0]?.totalPoints || 0}</div>
                </div>
                <p className="text-xs text-slate-500 uppercase tracking-wider font-medium">{getText('members.topScore', 'Top Score')}</p>
              </div>
              <div className="text-center group">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                    <Users className="w-3 h-3 text-white" />
                  </div>
                  <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-200">{membersCount}</div>
                </div>
                <p className="text-xs text-slate-500 uppercase tracking-wider font-medium">{getText('members.totalMembers', 'Total Members')}</p>
              </div>
              <div className="text-center group">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <div className="w-6 h-6 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 11H7v4h2v-4zm4 0h-2v4h2v-4zm4 0h-2v4h2v-4zm2-7h-3V2h-2v2H8V2H6v2H3c-1.11 0-1.99.89-1.99 2L1 18c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.11-.9-2-2-2zm0 16H3V8h16v10z"/>
                    </svg>
                  </div>
                  <div className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-purple-700 bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-200">{Math.round(members.reduce((sum, m) => sum + m.totalPoints, 0) / members.length) || 0}</div>
                </div>
                <p className="text-xs text-slate-500 uppercase tracking-wider font-medium">{getText('members.avgScore', 'Avg Score')}</p>
              </div>
            </div>
            
          </div>
        </div>

        {/* Section Divider */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent"></div>
          <div className="px-6">
            <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full shadow-md"></div>
          </div>
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent"></div>
        </div>

        {/* Search Component */}
        <MembersSearch members={members} membersCount={membersCount} />
        </div>
      </div>
    </div>
  )
}