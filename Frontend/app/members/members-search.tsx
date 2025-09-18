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
      <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <Trophy className="h-5 w-5 text-amber-500" />
            Rankings
            {searchTerm && (
              <span className="text-sm font-normal text-gray-500">
                - "{searchTerm}"
              </span>
            )}
          </CardTitle>
          <CardDescription>Individual member performance rankings</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {filteredMembers.map((member) => (
              <div
                key={member.id}
                className={`flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 rounded-lg transition-colors hover:bg-gray-50 dark:hover:bg-gray-800 gap-4 ${
                  member.rank <= 3
                    ? "bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/20"
                    : "bg-gray-50/50 dark:bg-gray-800/50"
                }`}
              >
                <div className="flex items-center gap-4">
                  <Badge
                    variant={member.rank === 1 ? "default" : member.rank <= 3 ? "secondary" : "outline"}
                    className="w-10 h-10 rounded-full flex items-center justify-center font-bold flex-shrink-0"
                  >
                    {member.rank}
                  </Badge>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-gray-900 dark:text-white truncate">{member.name}</p>
                    </div>
                    <p className="text-sm text-gray-500">Member</p>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-4">
                  <div className="text-left sm:text-right">
                    <p
                      className={`font-bold text-lg ${
                        member.rank === 1
                          ? "text-amber-600"
                          : member.rank === 2
                            ? "text-gray-600"
                            : member.rank === 3
                              ? "text-amber-700"
                              : "text-blue-600"
                      }`}
                    >
                      {member.totalPoints}
                    </p>
                    <p className="text-xs text-gray-500">points</p>
                  </div>
                  <Link href={`/member/${member.id}`} className="flex-shrink-0">
                    <Button variant="outline" size="sm" className="whitespace-nowrap bg-transparent">
                      <Eye className="h-4 w-4 mr-1" />
                      <span className="hidden xs:inline">View Details</span>
                      <span className="xs:hidden">Details</span>
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>

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
      </Card>
    </>
  )
}