"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Trophy, Users, Eye, Search } from "lucide-react"

interface Member {
  id: string
  name: string
  totalPoints: number
  rank: number
}

interface MembersSearchProps {
  members: Member[]
  membersCount: number
}

export function MembersSearch({ members: allMembers, membersCount }: MembersSearchProps) {
  const [searchTerm, setSearchTerm] = useState("")

  // Filter members based on search term
  const filteredMembers = allMembers.filter(member =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <>
      {/* Enhanced Search */}
      <div className="relative max-w-xl mx-auto mb-8">
        <div className="flex items-center justify-center gap-4 mb-4">
          <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full shadow-lg animate-pulse">
            <Search className="h-6 w-6 text-white" />
          </div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Find Members
          </h2>
        </div>
        
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-slate-400 group-focus-within:text-blue-500 transition-colors duration-200" />
          </div>
          <Input
            type="text"
            placeholder="Search members by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-12 pr-4 py-4 w-full bg-white/95 backdrop-blur-sm border-2 border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 shadow-xl hover:shadow-2xl rounded-2xl text-base placeholder:text-slate-400 transition-all duration-300 font-medium"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-indigo-500/5 rounded-2xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
        </div>
        {searchTerm && (
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
            <button
              onClick={() => setSearchTerm("")}
              className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-all duration-200"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        )}
      </div>

      {/* Results count */}
      {searchTerm && (
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium shadow-sm">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
            <span>{filteredMembers.length} of {membersCount} members found</span>
          </div>
        </div>
      )}

      {/* Leaderboard */}
      <Card className="bg-white rounded-2xl shadow-lg border border-slate-200 hover:shadow-xl transition-shadow duration-300 overflow-hidden">
        <div className="bg-gradient-to-br from-blue-50/50 to-white p-1">
          <CardHeader className="pb-6">
            <CardTitle className="text-xl font-bold text-slate-900 flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-amber-500 to-amber-600 rounded-lg flex items-center justify-center shadow-md">
                <Trophy className="h-4 w-4 text-white" />
              </div>
              Rankings
              {searchTerm && (
                <span className="text-sm font-normal text-gray-500">
                  - "{searchTerm}"
                </span>
              )}
            </CardTitle>
            <CardDescription className="text-slate-600 font-medium mt-1">Individual member performance rankings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {filteredMembers.map((member, index) => {
              // Google-themed podium colors for top 3
              const getPodiumStyles = (rank: number) => {
                switch (rank) {
                  case 1: // Gold - Google Yellow/Amber inspired
                    return {
                      container: "bg-gradient-to-br from-amber-100/90 via-yellow-50 to-amber-200/60 border-2 border-amber-300/70 hover:border-amber-400 shadow-xl shadow-amber-500/20 hover:shadow-amber-500/30",
                      badge: "bg-gradient-to-br from-amber-400 to-amber-500 text-white shadow-lg shadow-amber-500/30",
                      name: "text-amber-900 font-extrabold",
                      points: "text-amber-800 font-black",
                      star: "bg-gradient-to-r from-amber-500 to-yellow-500",
                      icon: "🥇"
                    }
                  case 2: // Silver - Google Blue-Gray inspired  
                    return {
                      container: "bg-gradient-to-br from-blue-100/90 via-slate-100 to-blue-200/60 border-2 border-blue-400/70 hover:border-blue-500 shadow-xl shadow-blue-500/20 hover:shadow-blue-500/30", 
                      badge: "bg-gradient-to-br from-slate-400 to-slate-500 text-white shadow-lg shadow-slate-500/30",
                      name: "text-blue-900 font-bold",
                      points: "text-blue-800 font-bold",
                      star: "bg-gradient-to-r from-slate-400 to-gray-500",
                      icon: "🥈"
                    }
                  case 3: // Copper - Google Red-Orange inspired
                    return {
                      container: "bg-gradient-to-br from-orange-100/90 via-red-50 to-orange-200/60 border-2 border-orange-400/70 hover:border-orange-500 shadow-xl shadow-orange-500/20 hover:shadow-orange-500/30",
                      badge: "bg-gradient-to-br from-orange-600 to-red-600 text-white shadow-lg shadow-orange-500/30", 
                      name: "text-orange-900 font-bold",
                      points: "text-orange-800 font-bold",
                      star: "bg-gradient-to-r from-orange-500 to-red-500",
                      icon: "🥉"
                    }
                  default:
                    return {
                      container: "bg-gradient-to-r from-white to-slate-50/50 border-slate-150 hover:border-slate-200",
                      badge: "bg-gradient-to-br from-slate-100 to-slate-200 border border-slate-300 text-slate-700",
                      name: "text-slate-900",
                      points: "text-slate-900", 
                      star: "bg-gradient-to-r from-amber-400 to-amber-500",
                      icon: "★"
                    }
                }
              }
              
              const podiumStyles = getPodiumStyles(member.rank)
              
              return (
                <div
                  key={member.id}
                  className={`group flex items-center justify-between p-5 rounded-2xl ${podiumStyles.container} hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5`}
                >
                  <div className="flex items-center gap-5">
                    <div className="relative">
                      <Badge
                        variant="secondary"
                        className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${podiumStyles.badge} group-hover:shadow-md transition-shadow duration-300`}
                      >
                        {member.rank}
                      </Badge>
                      {member.rank <= 3 && (
                        <div className={`absolute -top-1 -right-1 w-5 h-5 ${podiumStyles.star} rounded-full flex items-center justify-center shadow-sm`}>
                          <span className="text-xs text-white font-bold">{podiumStyles.icon}</span>
                        </div>
                      )}
                    </div>
                    <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                      <Users className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <p className={`font-bold text-base group-hover:text-slate-800 transition-colors duration-200 ${podiumStyles.name}`}>{member.name}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <p className="text-sm text-slate-500 font-medium">Member</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-4">
                    <div className="text-right">
                      <p className={`font-bold text-xl ${podiumStyles.points}`}>{member.totalPoints}</p>
                      <p className="text-xs text-slate-400 uppercase tracking-wider font-medium">Points Earned</p>
                    </div>
                    <Link href={`/member/${member.id}`} className="flex-shrink-0">
                      <Button variant="outline" size="sm" className="whitespace-nowrap bg-white/80 hover:bg-white border-slate-300 text-slate-700 font-medium shadow-sm hover:shadow-md transition-shadow duration-200">
                        <Eye className="h-4 w-4 mr-1" />
                        <span className="hidden xs:inline">View Details</span>
                        <span className="xs:hidden">Details</span>
                      </Button>
                    </Link>
                  </div>
                </div>
              )
            })}

            {filteredMembers.length === 0 && searchTerm && (
              <div className="text-center py-12">
                <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 mb-2">No members found matching "{searchTerm}"</p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSearchTerm("")}
                >
                  Clear search
                </Button>
              </div>
            )}

            {allMembers.length === 0 && (
              <div className="text-center py-12">
                <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">No members found.</p>
              </div>
            )}
          </CardContent>
        </div>
      </Card>
    </>
  )
}