"use client"

import { ReactNode } from "react"
import { CountdownTimer } from "./countdown-timer"
import { BlurProvider } from "./leaderboard-blur"

interface LeaderboardWrapperProps {
  children: ReactNode
}

export function LeaderboardWrapper({ children }: LeaderboardWrapperProps) {
  return (
    <BlurProvider>
      <CountdownTimer />
      <div className="w-full max-w-full overflow-hidden">
        {children}
      </div>
    </BlurProvider>
  )
}