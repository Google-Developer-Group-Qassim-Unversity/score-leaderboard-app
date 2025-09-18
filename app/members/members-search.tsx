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
      {/* Search */}
      <div className="relative max-w-md mb-6">
        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
        <Input
          type="text"
          placeholder="Search members..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 bg-white/90 backdrop-blur-sm border-0 shadow-lg"
        />
      </div>

      {/* Stats Section */}
      <div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardContent className="pt-6 text-center">
            <div className="text-2xl font-bold text-blue-600">{membersCount}</div>
            <p className="text-sm text-gray-500">Total Members</p>
          </CardContent>
        </Card>
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardContent className="pt-6 text-center">
            <div className="text-2xl font-bold text-green-600">
              {allMembers.length > 0
                ? Math.round(allMembers.reduce((sum, m) => sum + m.totalPoints, 0) / allMembers.length)
                : 0}
            </div>
            <p className="text-sm text-gray-500">Average Points</p>
          </CardContent>
        </Card>
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardContent className="pt-6 text-center">
            <div className="text-2xl font-bold text-purple-600">
              {allMembers.length > 0 ? Math.max(...allMembers.map((m) => m.totalPoints)) : 0}
            </div>
            <p className="text-sm text-gray-500">Highest Score</p>
          </CardContent>
        </Card>
      </div>

      {/* Results count */}
      {searchTerm && (
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          {filteredMembers.length} of {membersCount} members found
        </p>
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