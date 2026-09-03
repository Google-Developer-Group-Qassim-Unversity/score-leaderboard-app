"use client"

import { UserButton, useUser } from "@clerk/nextjs"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { UserPlus, User, Shield, Globe } from "lucide-react"
import { useTranslation } from 'react-i18next'
import '@/lib/i18n-client'
import { useCurrentUrl } from '@/hooks/use-current-url'
import { withRedirectParam } from '@/lib/redirect-config'

const ADMIN_APP_URL = process.env.NEXT_PUBLIC_ADMIN_APP_URL ?? 'https://admin.gdg-q.com'

export function AuthButton() {
  const { isLoaded, isSignedIn, user } = useUser()
  const { t, i18n } = useTranslation()
  const isRTL = i18n.language === 'ar'
  const currentUrl = useCurrentUrl()
  const isAdmin = !!user?.publicMetadata?.is_super_admin
  const router = useRouter()

  if (!isLoaded) {
    return (
      <Skeleton className="h-8 w-8 rounded-full" />
    )
  }

  if (isSignedIn) {
    const toggleLanguage = () => {
      const newLang = i18n.language === 'en' ? 'ar' : 'en'
      // Same pattern as the nav bar's language switcher (components/navigation.tsx):
      // the cookie drives server-rendered content, so a full reload is required
      // for it to take effect - changeLanguage() alone only updates client components.
      document.cookie = `lang=${newLang}; path=/; max-age=31536000; SameSite=Lax`
      i18n.changeLanguage(newLang)
      router.refresh()
      window.location.reload()
    }

    return (
      <UserButton
        appearance={{
          elements: {
            avatarBox: "h-8 w-8",
            userButtonPopoverCard: isRTL ? "rtl" : "",
          },
        }}
      >
        <UserButton.MenuItems>
          <UserButton.Link
            label={t('nav.profile')}
            labelIcon={<User className="w-4 h-4" />}
            href="/profile"
          />
          {isAdmin && (
            <UserButton.Link
              label={t('nav.admin')}
              labelIcon={<Shield className="w-4 h-4" />}
              href={ADMIN_APP_URL}
            />
          )}
          <UserButton.Action
            label={i18n.language === 'en' ? t('nav.arabic') : t('nav.english')}
            labelIcon={<Globe className="w-4 h-4" />}
            onClick={toggleLanguage}
          />
          <UserButton.Action label="manageAccount" />
          <UserButton.Action label="signOut" />
        </UserButton.MenuItems>
      </UserButton>
    )
  }

  // Not signed in - show sign up and log in buttons
  const signUpUrl = withRedirectParam('/sign-up', currentUrl)

  return (
    <div className="flex gap-2">
      <Button
        variant="default"
        size="sm"
        asChild
        className="gap-2"
      >
        <Link href={signUpUrl} aria-label={t('auth.signupAria')}>
          <UserPlus className="h-4 w-4" />
          <span className="hidden sm:inline">{t('auth.joinUs')}</span>
        </Link>
      </Button>
    </div>
  )
}

export function AuthButtonMobile() {
  const { isLoaded, isSignedIn } = useUser()
  const { t } = useTranslation()
  const currentUrl = useCurrentUrl()

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
  const signUpUrl = withRedirectParam('/sign-up', currentUrl)

  return (
    <div className="flex flex-col gap-2">
      <Button
        variant="default"
        asChild
        className="w-full gap-3 py-3"
      >
        <Link href={signUpUrl} aria-label={t('auth.signupAria')}>
          <UserPlus className="h-5 w-5" />
          <span className="font-semibold text-base">{t('auth.joinUs')}</span>
        </Link>
      </Button>
    </div>
  )
}
