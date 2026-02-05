"use client"

import { UserButton, useUser } from "@clerk/nextjs"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { LogIn, UserPlus } from "lucide-react"
import { useTranslation } from 'react-i18next'
import '@/lib/i18n-client'
import { getFullCurrentUrl } from '@/lib/utils'

export function AuthButton() {
  const { isLoaded, isSignedIn } = useUser()
  const { t, i18n } = useTranslation()
  const isRTL = i18n.language === 'ar'

  // Loading state
  if (!isLoaded) {
    return (
      <div className="flex gap-2">
        <Skeleton className="h-9 w-20 sm:w-24" />
        <Skeleton className="h-9 w-20 sm:w-24" />
      </div>
    )
  }

  // Signed in state - show user button
  if (isSignedIn) {
    return (
      <UserButton 
        appearance={{
          elements: {
            avatarBox: "h-8 w-8",
            userButtonPopoverCard: isRTL ? "rtl" : "",
          },
        }}
      />
    )
  }

  // Not signed in - show sign up and log in buttons
  const authUrl = process.env.NEXT_PUBLIC_AUTH_URL
  const currentUrl = getFullCurrentUrl()
  const redirectParam = currentUrl ? `?redirect_url=${encodeURIComponent(currentUrl)}` : ''
  
  const signInUrl = `${authUrl}/sign-in${redirectParam}`
  const signUpUrl = `${authUrl}/sign-up${redirectParam}`

  return (
    <div className="flex gap-2">
      <Button
        variant="outline"
        size="sm"
        asChild
        className="gap-2"
      >
        <a href={signInUrl} aria-label={t('auth.loginAria')}>
          <LogIn className="h-4 w-4" />
          <span className="hidden sm:inline">{t('auth.login')}</span>
        </a>
      </Button>
      <Button
        variant="default"
        size="sm"
        asChild
        className="gap-2"
      >
        <a href={signUpUrl} aria-label={t('auth.signupAria')}>
          <UserPlus className="h-4 w-4" />
          <span className="hidden sm:inline">{t('auth.signup')}</span>
        </a>
      </Button>
    </div>
  )
}
