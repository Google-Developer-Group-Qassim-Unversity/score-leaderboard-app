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
}

interface MembersSearchProps {
  members: Member[]
  membersCount: number
  femaleMembers: Member[]
  maleMembers: Member[]
}

export function MembersSearch({ members: allMembers, membersCount, femaleMembers, maleMembers }: MembersSearchProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeGender, setActiveGender] = useState<"all" | "male" | "female">("all")

  // Filter members based on search term and gender
  const getFilteredMembers = () => {
    let membersToFilter = allMembers
    
    if (activeGender === "male") {
      membersToFilter = maleMembers
    } else if (activeGender === "female") {
      membersToFilter = femaleMembers
    }
    
    if (!searchTerm) return membersToFilter
    
    return membersToFilter.filter(member =>
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

      {/* Gender Filter Tabs */}
      <div className="flex items-center justify-center gap-3 mb-6">
        <button
          onClick={() => setActiveGender("all")}
          className={`px-6 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 ${
            activeGender === "all"
              ? "bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-lg shadow-purple-500/30"
              : "bg-white text-slate-600 hover:bg-slate-50 border-2 border-slate-200"
          }`}
        >
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <span>All Members</span>
          </div>
        </button>
        <button
          onClick={() => setActiveGender("male")}
          className={`px-6 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 ${
            activeGender === "male"
              ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/30"
              : "bg-white text-slate-600 hover:bg-slate-50 border-2 border-slate-200"
          }`}
        >
          <div className="flex items-center gap-2">
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
            </svg>
            <span>Male ({maleMembers.length})</span>
          </div>
        </button>
        <button
          onClick={() => setActiveGender("female")}
          className={`px-6 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 ${
            activeGender === "female"
              ? "bg-gradient-to-r from-pink-500 to-pink-600 text-white shadow-lg shadow-pink-500/30"
              : "bg-white text-slate-600 hover:bg-slate-50 border-2 border-slate-200"
          }`}
        >
          <div className="flex items-center gap-2">
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
            </svg>
            <span>Female ({femaleMembers.length})</span>
          </div>
        </button>
      </div>

      {/* Results count */}
      {searchTerm && (
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium shadow-sm">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
            <span>
              {filteredMembers.length} of {membersCount} members found
              {activeGender !== "all" && ` (${activeGender === "male" ? "Male" : "Female"})`}
            </span>
          </div>
        </div>
      )}
      {!searchTerm && activeGender !== "all" && (
        <div className="text-center mb-6 text-sm text-muted-foreground">
          Showing top 100 {activeGender === "male" ? "male" : "female"} members
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