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
      <div>
        {children}
      </div>
    </>
  )
}
