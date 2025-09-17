import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Trophy, Users, ArrowLeft, Eye } from "lucide-react"
import { fetchMembers, fetchMembersCount, transformApiMember } from "@/lib/api"
import { MembersSearch } from "./members-search"

export default async function MembersLeaderboard() {
  const [apiMembers, membersCount] = await Promise.all([fetchMembers(), fetchMembersCount()])

  // Transform and sort API data
  const members = apiMembers
    .sort((a, b) => b.points - a.points)
    .map((member, index) => transformApiMember(member, index + 1))

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link href="/" className="inline-block mb-4">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
          <div className="flex items-center gap-3">
            <Users className="h-8 w-8 text-blue-600" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Members Leaderboard</h1>
              <p className="text-gray-600 dark:text-gray-300">{membersCount} members ranked by total points</p>
            </div>
          </div>
        </div>

        {/* Search Component */}
        <MembersSearch members={members} membersCount={membersCount} />

        {/* Stats Footer */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="pt-6 text-center">
              <div className="text-2xl font-bold text-blue-600">{membersCount}</div>
              <p className="text-sm text-gray-500">Total Members</p>
            </CardContent>
          </Card>
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="pt-6 text-center">
              <div className="text-2xl font-bold text-green-600">
                {members.length > 0
                  ? Math.round(members.reduce((sum, m) => sum + m.totalPoints, 0) / members.length)
                  : 0}
              </div>
              <p className="text-sm text-gray-500">Average Points</p>
            </CardContent>
          </Card>
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="pt-6 text-center">
              <div className="text-2xl font-bold text-purple-600">
                {members.length > 0 ? Math.max(...members.map((m) => m.totalPoints)) : 0}
              </div>
              <p className="text-sm text-gray-500">Highest Score</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}