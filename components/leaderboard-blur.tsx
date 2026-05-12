"use client"

import { createContext, useContext, useState, ReactNode } from "react"
import { Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTranslation } from 'react-i18next'
import '@/lib/i18n-client'

interface BlurContextType {
  showMembers: boolean
  showDepartments: boolean
  toggleMembers: () => void
  toggleDepartments: () => void
}

const BlurContext = createContext<BlurContextType>({
  showMembers: false,
  showDepartments: false,
  toggleMembers: () => {},
  toggleDepartments: () => {},
})

export function BlurProvider({ children }: { children: ReactNode }) {
  const [showMembers, setShowMembers] = useState(false)
  const [showDepartments, setShowDepartments] = useState(false)

  return (
    <BlurContext.Provider value={{
      showMembers,
      showDepartments,
      toggleMembers: () => setShowMembers(prev => !prev),
      toggleDepartments: () => setShowDepartments(prev => !prev),
    }}>
      {children}
    </BlurContext.Provider>
  )
}

function useBlur() {
  return useContext(BlurContext)
}

interface BlurToggleButtonProps {
  target: 'members' | 'departments'
}

export function BlurToggleButton({ target }: BlurToggleButtonProps) {
  const { showMembers, showDepartments, toggleMembers, toggleDepartments } = useBlur()
  const isRevealed = target === 'members' ? showMembers : showDepartments
  const toggle = target === 'members' ? toggleMembers : toggleDepartments
  const { t } = useTranslation()

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={toggle}
      className="bg-white/80 hover:bg-white border-slate-300 text-slate-700 font-medium shadow-sm hover:shadow-md transition-all duration-200 flex items-center gap-2 text-xs sm:text-sm px-2 sm:px-3 cursor-pointer"
    >
      {isRevealed ? <EyeOff className="h-3 w-3 sm:h-4 sm:w-4" /> : <Eye className="h-3 w-3 sm:h-4 sm:w-4" />}
      <span className="hidden sm:inline">{isRevealed ? t('leaderboard.hideDetails') : t('leaderboard.showDetails')}</span>
      <span className="sm:hidden">{isRevealed ? t('leaderboard.hide') : t('leaderboard.show')}</span>
    </Button>
  )
}

interface BlurOverlayProps {
  target: 'members' | 'departments'
  children: ReactNode
}

export function BlurOverlay({ target, children }: BlurOverlayProps) {
  const { showMembers, showDepartments } = useBlur()
  const isRevealed = target === 'members' ? showMembers : showDepartments

  return (
    <>
      <div className={`transition-all duration-500 ${!isRevealed ? 'blur-md pointer-events-none' : ''}`}>
        {children}
      </div>
      {!isRevealed && (
        <div className="absolute inset-0 bg-transparent z-10"></div>
      )}
    </>
  )
}