'use client'

import * as React from 'react'
import { Suspense } from 'react'
import { useUser, useAuth } from '@clerk/nextjs'
import { useRouter, useSearchParams } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { AlertCircle, UserPlus } from 'lucide-react'
import { updateUserMetadata, addVerifiedPersonalEmail } from './_actions'
import { getValidatedRedirectParam } from '@/lib/redirect-config'
import { UserAccountCard } from '@/components/user-account-card'
import { createMember, getMemberPoints } from '@/lib/api/onboarding'
import { useTranslation } from 'react-i18next'
import '@/lib/i18n-client'
import { OnboardingForm, type OnboardingFormValues } from '@/components/onboarding-form'
import { WelcomeBackDialog } from '@/components/welcome-back-dialog'

export default function OnboardingPage() {
  return (
    <Suspense fallback={null}>
      <OnboardingContent />
    </Suspense>
  )
}

function OnboardingContent() {
  const { user } = useUser()
  const { getToken } = useAuth()
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirectParam = getValidatedRedirectParam(searchParams)
  const [error, setError] = React.useState('')
  const [welcomeBackPoints, setWelcomeBackPoints] = React.useState<number | null>(null)
  const [showWelcomeBack, setShowWelcomeBack] = React.useState(false)
  const { t } = useTranslation()

  // Extract uni_id from the QU-issued email (e.g. 442106350@qu.edu.sa).
  // Only applies to uni_id/password signups - a Google account's email
  // (e.g. name@gmail.com) must never be mistaken for a uni_id.
  const extractUniIdFromEmail = (email: string | undefined): string => {
    if (!email) return ''
    const match = email.match(/^(\d{9})@qu\.edu\.sa$/i)
    return match ? match[1] : ''
  }

  const uniId = extractUniIdFromEmail(user?.primaryEmailAddress?.emailAddress)

  // For Google sign-ups (no uni_id), the Google account's email IS a real personal
  // email already - use it directly instead of asking the member to type one.
  const googleEmail = !uniId ? user?.primaryEmailAddress?.emailAddress || '' : ''

  const goToFinalDestination = () => {
    if (redirectParam) {
      window.location.href = redirectParam
    } else {
      router.push('/')
    }
  }

  // Seeds the MemberProfiles-backed half of the wallet card (academic status
  // + a gender-based default card color) via the same /wallet/me endpoint the
  // card preview and pass generation already read from. Best-effort: the
  // member row already exists by the time this runs, but a transient failure
  // here should never block onboarding - it just leaves the card on defaults
  // until the member visits /profile.
  const saveInitialCardProfile = async (data: OnboardingFormValues) => {
    try {
      const token = await getToken()
      await fetch('/api/wallet/me', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          user_status: data.memberStatus === 'graduate' ? 'graduate' : 'student',
          education_level: data.memberStatus === 'high_school' ? 'highschool' : 'university',
          institution: data.memberStatus === 'high_school' ? data.highSchoolName : data.uniCollege,
          theme_id: data.gender === 'Female' ? 'gdg-red' : 'gdg-blue',
        }),
      })
    } catch (err) {
      console.warn('[onboarding] failed to seed wallet card profile:', err)
    }
  }

  // Creates a fresh member row in the backend, THEN marks onboarding complete
  // and navigates on. Onboarding is only marked complete once the backend
  // record actually exists - otherwise a user could get stuck with a
  // fully-onboarded Clerk account but no backend member row and no way back
  // into this form to fix it (e.g. their personal email collided with another
  // account's email - see the 409 branch below).
  //
  // If the backend auto-linked an existing (admin-created) record by email, show
  // a "welcome back" dialog with their existing points before moving on.
  const finishAsNewMember = async (data: OnboardingFormValues) => {
    const result = await createMember()

    if (!result.ok) {
      if (result.status === 409) {
        setError(t('onboarding.submitError.emailInUse'))
      } else {
        console.warn(`[onboarding] member creation failed, status: ${result.status}`)
        setError(t('onboarding.submitError.generic'))
      }
      return
    }

    // Best-effort: seed the wallet-card side of the profile (academic status
    // and a gender-based default card color) now that the member row exists.
    // Never blocks onboarding - the member can still adjust the color later
    // from /profile, and a failed request here just leaves the card falling
    // back to its defaults.
    void saveInitialCardProfile(data)

    // Best-effort: link the typed personal email to this Clerk account as a
    // verified secondary email so a future Google sign-up under that email
    // auto-links instead of creating a duplicate account. Never blocks
    // onboarding - addVerifiedPersonalEmail swallows its own errors and is a
    // no-op for Google sign-ups (googleEmail already proves their ownership).
    if (!googleEmail) {
      await addVerifiedPersonalEmail(data.personalEmail)
    }

    // Now that the backend member row exists, mark onboarding complete.
    // updateUserMetadata replaces publicMetadata wholesale, so re-send the
    // form data alongside the flag rather than just { onboardingComplete: true }.
    const completeResult = await updateUserMetadata({ ...data, onboardingComplete: true })
    if (completeResult.error) {
      setError(completeResult.error)
      return
    }

    if (result.data.already_exists) {
      const points = await getMemberPoints(result.data.member.id)
      setWelcomeBackPoints(points?.member.total_points ?? null)
      setShowWelcomeBack(true)
      return
    }

    // updateUserMetadata sets onboardingComplete via the backend Clerk API, which
    // does not update the current session's JWT. Middleware gates protected
    // routes on sessionClaims.metadata.onboardingComplete read from that JWT,
    // so without forcing a refresh here it still sees the stale (false) value.
    await getToken({ skipCache: true })

    goToFinalDestination()
  }

  const handleWelcomeBackContinue = async () => {
    setShowWelcomeBack(false)
    await getToken({ skipCache: true })
    goToFinalDestination()
  }

  const handleSubmit = async (data: OnboardingFormValues) => {
    setError('')

    try {
      // Step 1: Save the form data to Clerk metadata. onboardingComplete stays
      // false here - it's only flipped to true after the backend member row
      // is confirmed to exist, in finishAsNewMember.
      const result = await updateUserMetadata({ ...data, onboardingComplete: false })

      if (result.error) {
        setError(result.error)
        return
      }

      if (result.success) {
        await user?.reload() // around 300ms delay to ensure metadata is updated

        // Step 2: Create member in backend DB. If an admin-created record already
        // exists with this Clerk-verified email, the backend folds it in automatically.
        await finishAsNewMember(data)
      } else {
        setError('Unexpected response from server. Please try again.')
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-2xl border-border/80 shadow-xs">
        <CardHeader>
          {/* Clerk User Button for account management */}
          <UserAccountCard />

          <div className="flex items-center gap-3 pt-1">
            <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
              <UserPlus className="w-5 h-5" />
            </div>
            <div>
              <CardTitle className="text-2xl font-bold">{t('onboarding.title')}</CardTitle>
              <CardDescription>
                {t('onboarding.description')}
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <OnboardingForm uniId={uniId} lockedPersonalEmail={googleEmail} onSubmit={handleSubmit} />
        </CardContent>
      </Card>

      <WelcomeBackDialog
        open={showWelcomeBack}
        points={welcomeBackPoints}
        onContinue={handleWelcomeBackContinue}
      />
    </div>
  )
}
