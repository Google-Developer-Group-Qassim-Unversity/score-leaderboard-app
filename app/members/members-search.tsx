"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Trophy, Users, Search, ArrowUp } from "lucide-react"
import { LeaderboardCard } from "@/components/leaderboard-card"
import { useTranslation } from 'react-i18next'
import '@/lib/i18n-client'

interface Member {
  id: string
  name: string
  totalPoints: number
  rank: number
  departmentId: string
  uni_id?: string // Add uni_id to the interface
}

interface MembersSearchProps {
  members: Member[]
  allMembers: Member[]
  membersCount: number
  currentUniId?: string
}

export function MembersSearch({ members: topMembers, allMembers, membersCount, currentUniId }: MembersSearchProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [currentUserInView, setCurrentUserInView] = useState(true)
  const { t, i18n } = useTranslation()
  const rtl = i18n.language === 'ar'

  const currentUser = allMembers.find(m => m.uni_id === currentUniId)
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    if (!currentUniId || searchTerm) {
      setCurrentUserInView(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setCurrentUserInView(entry.isIntersecting)
      },
      { threshold: 0.1 }
    )

    const userRow = document.getElementById(`member-row-${currentUser?.id}`)
    if (userRow) {
      observer.observe(userRow)
    }

    observerRef.current = observer

    return () => {
      if (observer) observer.disconnect()
    }
  }, [currentUniId, searchTerm, currentUser?.id])

  // Tokenized, ranked search — O(n) and precise for Arabic/Latin names
  // by splitting query into words, scores each member by how many tokens match, then sorts by score desc so exact matches always surface first
  const getFilteredMembers = () => {
    if (!searchTerm.trim()) {
      return topMembers
    }

    const tokens = searchTerm
      .trim()
      .toLowerCase()
      .split(/\s+/)
      .filter(Boolean)

    const scored = allMembers.flatMap((member) => {
      const nameLower = member.name.toLowerCase()
      const matchCount = tokens.reduce(
        (acc, token) => acc + (nameLower.includes(token) ? 1 : 0),
        0
      )
      // Require ALL tokens to match — if only some match, it's not a useful result
      return matchCount === tokens.length ? [{ member, matchCount }] : []
    })

    // Sort by number of matched tokens desc (full matches first), then by original rank as a stable tiebreaker.
    scored.sort((a, b) =>
      b.matchCount - a.matchCount || a.member.rank - b.member.rank
    )

    return scored.map((s) => s.member)
  }


  const filteredMembers = getFilteredMembers()

  return (
    <>
      {/* Enhanced Search */}
      <div className="max-w-xl mx-auto mb-8">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="p-2 bg-slate-100 rounded-lg">
            <Search className="h-5 w-5 text-slate-700" />
          </div>
          <h2 className="text-xl font-semibold text-slate-900">
            {t('members.findMembers')}
          </h2>
        </div>

        <div className="relative">
          <div className={`absolute inset-y-0 ${rtl ? 'right-0 pr-4' : 'left-0 pl-4'} flex items-center pointer-events-none`}>
            <Search className="h-5 w-5 text-slate-400" />
          </div>
          <Input
            type="text"
            placeholder={t('members.searchPlaceholder')}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`${rtl ? 'pr-12 pl-4' : 'pl-12 pr-4'} py-3 w-full border-slate-300 rounded-lg`}
          />
          <div className="absolute inset-0 rounded-lg pointer-events-none"></div>
        </div>
        {searchTerm && (
          <button
            onClick={() => setSearchTerm("")}
            className={`absolute ${rtl ? 'left-3' : 'right-3'} top-1/2 transform -translate-y-1/2 p-1.5 text-slate-400 hover:text-slate-600 rounded-full`}
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>



      {/* Results count */}
      {searchTerm && (
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 bg-slate-100 text-slate-700 px-4 py-2 rounded-full text-sm border border-slate-200">
            <span>
              {filteredMembers.length} {t('members.of')} {membersCount} {t('members.found')}
            </span>
          </div>
        </div>
      )}


      {/* Leaderboard */}
      <Card className="bg-white rounded-lg border border-slate-200">
        <div className="p-1">
          <CardHeader className="pb-6">
            <CardTitle className="text-lg font-semibold text-slate-900 flex items-center gap-3">
              <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center">
                <Trophy className="h-4 w-4 text-slate-700" />
              </div>
              {t('members.rankings')}
              {searchTerm && (
                <span className="text-sm font-normal text-slate-500">
                  - "{searchTerm}"
                </span>
              )}
            </CardTitle>
            <CardDescription className="text-slate-600 mt-1">{t('members.performance')}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {filteredMembers.map((member) => (
              <LeaderboardCard
                key={member.id}
                id={member.id}
                name={member.name}
                rank={member.rank}
                points={member.totalPoints}
                type="member"
              />
            ))}

            {filteredMembers.length === 0 && searchTerm && (
              <div className="text-center py-12">
                <Search className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                <p className="text-slate-500 mb-2">{t('members.noResults')} "{searchTerm}"</p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSearchTerm("")}
                >
                  {t('members.clearSearch')}
                </Button>
              </div>
            )}

            {filteredMembers.length === 0 && !searchTerm && (
              <div className="text-center py-12">
                <Users className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                <p className="text-slate-500 mb-2">{t('members.noMembers')}</p>
              </div>
            )}
          </CardContent>
        </div>
      </Card>

      {/* Floating Current User Card */}
      {currentUser && !searchTerm && !currentUserInView && (
        <div className="fixed bottom-6 left-0 right-0 z-50 px-4 animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="container max-w-6xl mx-auto flex justify-center">
            <div className="w-full max-w-4xl shadow-xl hover:shadow-2xl transition-all border-2 border-blue-400 rounded-xl overflow-hidden bg-white">
              <div className="bg-blue-600 text-white text-[10px] font-bold py-0.5 px-3 flex items-center gap-1.5 justify-center">
                <ArrowUp className="h-3 w-3" />
                {t('members.viewYourRank')}
              </div>
              <div className="p-1">
                <LeaderboardCard
                  id={currentUser.id}
                  name={currentUser.name}
                  rank={currentUser.rank}
                  points={currentUser.totalPoints}
                  type="member"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
