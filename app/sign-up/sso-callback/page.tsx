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
      // A returning user clicking "Continue with Google" on the sign-up
      // page gets silently transferred by Clerk into a sign-in attempt
      // (an account already exists for that email). Without a sign-in
      // fallback here, that transfer has nowhere to complete.
      signInFallbackRedirectUrl={withRedirectParam('/onboarding', redirectParam)}
      signUpFallbackRedirectUrl={withRedirectParam('/onboarding', redirectParam)}
      continueSignUpUrl={withRedirectParam('/sign-up', redirectParam)}
    />
  )
}
