'use client'

import { ArrowUp } from "lucide-react"
import { LeaderboardCard } from "./leaderboard-card"
import { useTranslation } from 'react-i18next'
import { cn } from "@/lib/utils"
import '@/lib/i18n-client'

interface UserRankCardProps {
    user: {
        id: string
        name: string
        rank: number
        totalPoints: number
    }
    isVisible: boolean
    searchTerm: string
}

export function UserRankCard({ user, isVisible, searchTerm }: UserRankCardProps) {
    const { t } = useTranslation()

    // Transitions: 
    // Slide down and fade out when visible in the main list or when searching
    // We use a longer duration and a cubic-bezier for a "premium" feel
    const shouldHide = !!searchTerm || isVisible

    return (
        <div
            className={cn(
                "fixed bottom-10 inset-x-0 z-[100] px-4 transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] will-change-[transform,opacity]",
                shouldHide
                    ? "opacity-0 translate-y-16 pointer-events-none"
                    : "opacity-100 translate-y-0"
            )}
        >
            <div className="max-w-6xl mx-auto w-full">
                {/* 
                  To match the width of regular cards exactly:
                  Regular card = Container px-4 (16px) + Card + CardContent p-6 (24px)
                  UserRankCard = Fixed outer px-4 (16px) + Inner px-6 (24px)
                */}
                <div className="px-6">
                    <div className="w-full shadow-[0_20px_50px_rgba(0,0,0,0.15)] rounded-xl overflow-hidden bg-white border border-slate-100">
                        <LeaderboardCard
                            id={user.id}
                            name={user.name}
                            rank={user.rank}
                            points={user.totalPoints}
                            type="member"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
