'use client'

import { Suspense } from 'react'
import { AuthenticateWithRedirectCallback } from '@clerk/nextjs'
import { useSearchParams } from 'next/navigation'
import { getValidatedRedirectParam, withRedirectParam } from '@/lib/redirect-config'

export default function SSOCallbackPage() {
  return (
    <Suspense fallback={null}>
      <SSOCallbackContent />
    </Suspense>
  )
}

function SSOCallbackContent() {
  const searchParams = useSearchParams()
  const redirectParam = getValidatedRedirectParam(searchParams)

  return (
    <AuthenticateWithRedirectCallback
      // A first-time Google user clicking "Continue with Google" on the
      // sign-in page gets silently transferred by Clerk into a sign-up
      // attempt (no existing account to sign in to). Without a sign-up
      // fallback here, that transfer has nowhere to complete and the
      // callback fails - exactly when there's only one Google account and
      // no account-picker interaction to "save" it with extra round trips.
      signInFallbackRedirectUrl={withRedirectParam('/onboarding', redirectParam)}
      signUpFallbackRedirectUrl={withRedirectParam('/onboarding', redirectParam)}
      continueSignUpUrl={withRedirectParam('/sign-up', redirectParam)}
    />
  )
}
