"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Trophy, Users, Search } from "lucide-react"
import { LeaderboardCard } from "@/components/leaderboard-card"

interface Member {
  id: string
  name: string
  totalPoints: number
  rank: number
  departmentId: string
}

interface MembersSearchProps {
  members: Member[]
  allMembers: Member[]
  membersCount: number
}

export function MembersSearch({ members: topMembers, allMembers, membersCount }: MembersSearchProps) {
  const [searchTerm, setSearchTerm] = useState("")

  // Filter members based on search term - use full dataset when searching, top 100 when not
  const getFilteredMembers = () => {
    if (!searchTerm) {
      // No search term: show only top 100 members for performance
      return topMembers
    }
    
    // Search term provided: search through all members
    return allMembers.filter(member =>
      member.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }

  const filteredMembers = getFilteredMembers()

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
            <span>
              {filteredMembers.length} of {membersCount} members found
            </span>
          </div>
        </div>
      )}
      {!searchTerm && (
        <div className="text-center mb-6 text-sm text-muted-foreground">
          Showing top 100 members
        </div>
      )}

      {/* Leaderboard */}
      <Card className="bg-white rounded-2xl shadow-lg border border-slate-200 hover:shadow-xl transition-shadow duration-300 overflow-hidden">
        <div className="p-1">
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
                <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 mb-2">No members found matching "{searchTerm}"</p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSearchTerm("")}
                  className="bg-white/80 hover:bg-white"
                >
                  Clear Search
                </Button>
              </div>
            )}

            {filteredMembers.length === 0 && !searchTerm && (
              <div className="text-center py-12">
                <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 mb-2">No members available</p>
              </div>
            )}
          </CardContent>
        </div>
      </Card>
    </>
  )
}