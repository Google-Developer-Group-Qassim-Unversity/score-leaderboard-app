"use client"

import { UserButton, useUser } from "@clerk/nextjs"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { LogIn, UserPlus, User } from "lucide-react"
import { useTranslation } from 'react-i18next'
import '@/lib/i18n-client'
import { getFullCurrentUrl } from '@/lib/utils'
import { ProfileForm } from '@/components/profile-form'

export function AuthButton() {
  const { isLoaded, isSignedIn } = useUser()
  const { t, i18n } = useTranslation()
  const isRTL = i18n.language === 'ar'

  // Loading state
  if (!isLoaded) {
    return (
      <Skeleton className="h-8 w-8 rounded-full" />
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
      >
        <UserButton.UserProfilePage
          label="GDG-Profile"
          url="profile"
          labelIcon={<User className="w-4 h-4" />}
        >
          <ProfileForm />
        </UserButton.UserProfilePage>
      </UserButton>
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
        variant="default"
        size="sm"
        asChild
        className="gap-2"
      >
        <a href={signUpUrl} aria-label={t('auth.signupAria')}>
          <UserPlus className="h-4 w-4" />
          <span className="hidden sm:inline">{t('auth.joinUs')}</span>
        </a>
      </Button>
    </div>
  )
}

export function AuthButtonMobile() {
  const { isLoaded, isSignedIn } = useUser()
  const { t } = useTranslation()

  // Loading state
  if (!isLoaded) {
    return (
      <Skeleton className="h-10 w-full rounded-md" />
    )
  }

  // Don't show anything if signed in
  if (isSignedIn) {
    return null
  }

  // Not signed in - show sign up and log in buttons stacked
  const authUrl = process.env.NEXT_PUBLIC_AUTH_URL
  const currentUrl = getFullCurrentUrl()
  const redirectParam = currentUrl ? `?redirect_url=${encodeURIComponent(currentUrl)}` : ''

  const signInUrl = `${authUrl}/sign-in${redirectParam}`
  const signUpUrl = `${authUrl}/sign-up${redirectParam}`

  return (
    <div className="flex flex-col gap-2">
      <Button
        variant="default"
        asChild
        className="w-full gap-3 py-3"
      >
        <a href={signUpUrl} aria-label={t('auth.signupAria')}>
          <UserPlus className="h-5 w-5" />
          <span className="font-semibold text-base">{t('auth.joinUs')}</span>
        </a>
      </Button>
    </div>
  )
}
