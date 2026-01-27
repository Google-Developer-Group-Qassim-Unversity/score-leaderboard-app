"use client"

import { ReactNode } from "react"
import { CountdownTimer } from "./countdown-timer"

interface LeaderboardWrapperProps {
  children: ReactNode
}

export function LeaderboardWrapper({ children }: LeaderboardWrapperProps) {
  return (
    <>
      <CountdownTimer />
      <div className="w-full max-w-full overflow-hidden">
        {children}
      </div>
    </>
  )
}
