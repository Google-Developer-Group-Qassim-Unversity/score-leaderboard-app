'use client'

import { UserProfile, useUser, useClerk } from '@clerk/nextjs'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { LogOut, ArrowLeft, ArrowRight } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useTranslation } from 'react-i18next'
import '@/lib/i18n-client'

export default function UserProfilePage() {
  const { t, i18n } = useTranslation()
  const isRTL = i18n.language === 'ar'
  const { user, isLoaded } = useUser()
  const { signOut } = useClerk()
  const router = useRouter()

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  // Get the full Arabic name from metadata
  const fullArabicName = user?.publicMetadata?.fullArabicName as string | undefined

  const handleSignOut = async () => {
    await signOut()
    router.push('/sign-in')
  }

  const SignOutIcon = () => (
    <LogOut className="w-4 h-4" />
  )

  const SignOutPage = () => {
    return (
      <div className="flex flex-col items-center justify-center py-12 px-6 space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold text-slate-900">{t('userProfile.signOutTitle')}</h2>
          <p className="text-slate-600 max-w-md">
            {t('userProfile.signOutDescription')}
          </p>
        </div>
        <Button
          onClick={handleSignOut}
          variant="outline"
          size="lg"
          className="w-full max-w-xs"
        >
          <LogOut className="mr-2 h-5 w-5" />
          {t('userProfile.signOutButton')}
        </Button>
      </div>
    )
  }

  const displayName = fullArabicName || t('userCard.defaultName')
  const initial = (fullArabicName || user?.primaryEmailAddress?.emailAddress || '?').trim().charAt(0).toUpperCase()
  const GoArrow = isRTL ? ArrowLeft : ArrowRight

  return (
    <div className="min-h-screen bg-muted/30 flex items-center justify-center py-12 px-4 relative">
      <div className="w-full max-w-3xl space-y-6">
        {/* Header */}
        <Card className="border-border/60">
          <CardContent className="flex flex-col sm:flex-row items-center gap-5 py-2">
            {user?.imageUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={user.imageUrl}
                alt={displayName}
                className="h-16 w-16 rounded-full object-cover ring-1 ring-border shrink-0"
              />
            ) : (
              <div className="h-16 w-16 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xl font-semibold shrink-0">
                {initial}
              </div>
            )}

            <div className="flex-1 min-w-0 text-center sm:text-start">
              <h1 className="text-xl font-semibold truncate">
                {fullArabicName ? t('userProfile.titleWithName', { name: fullArabicName }) : t('userProfile.title')}
              </h1>
              <p className="text-sm text-muted-foreground mt-0.5">{t('userProfile.description')}</p>
            </div>

            <Button asChild size="lg" className="shrink-0 w-full sm:w-auto">
              <a href="/">
                {t('nav.home')}
                <GoArrow className="h-4 w-4" />
              </a>
            </Button>
          </CardContent>
        </Card>

        {/* User Profile Component */}
        <div className="w-full flex justify-center">
          <UserProfile
            appearance={{
              elements: {
                rootBox: "w-full",
                card: "shadow-sm rounded-2xl border border-border/60",
              }
            }}
          >
            <UserProfile.Page
              label={t('userProfile.signOutTab')}
              labelIcon={<SignOutIcon />}
              url="sign-out"
            >
              <SignOutPage />
            </UserProfile.Page>
          </UserProfile>
        </div>
      </div>
    </div>
  )
}
