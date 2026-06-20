import { ReactNode } from "react"

interface LeaderboardWrapperProps {
  children: ReactNode
}

export function LeaderboardWrapper({ children }: LeaderboardWrapperProps) {
  return (
    <div className="w-full max-w-full overflow-hidden">
      {children}
    </div>
  )
}