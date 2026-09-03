import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import { getValidatedRedirectParam } from '@/lib/redirect-config'

declare global {
  interface CustomJwtSessionClaims {
    metadata: {
      onboardingComplete?: boolean
      uni_id?: string
      fullArabicName?: string
      saudiPhone?: string
      gender?: 'male' | 'female'
      personalEmail?: string
      uniLevel?: number
      uniCollege?: string
    }
  }
}

// The sign-in/up funnel: reachable while signed out, but if someone's
// already fully authenticated there's nothing for them to do here - bounce
// them at the server, before any client JS (let alone Clerk's client SDK)
// has to load. This is what keeps these pages from ever needing a client-side
// "isLoaded" loading state for that case.
const isSignInFlow = createRouteMatcher([
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/forgot-password(.*)',
])

// /onboarding is exempt from the onboarding-completion gate below for the
// opposite reason: an authenticated-but-not-onboarded user visiting it must
// NOT be redirected back to itself (infinite loop). Its own layout already
// redirects away the other direction, once onboarding is actually complete.
const isOnboarding = createRouteMatcher(['/onboarding(.*)'])

export default clerkMiddleware(async (auth, req) => {
  const { userId, sessionClaims } = await auth()
  const onboarded = !!sessionClaims?.metadata?.onboardingComplete

  if (isSignInFlow(req)) {
    if (userId && onboarded) {
      // An already-authenticated visitor has nothing to do on this page - bounce
      // them off. If they were sent here by another app (e.g. the admin app's
      // cross-app sign-in handoff) with a validated redirect_url, honor it
      // instead of always landing on this app's own homepage.
      const redirectParam = getValidatedRedirectParam(req.nextUrl.searchParams)
      return NextResponse.redirect(redirectParam ?? new URL('/', req.url))
    }
    return NextResponse.next()
  }

  if (isOnboarding(req)) {
    return NextResponse.next()
  }

  // Check if user is authenticated and has not completed onboarding
  if (userId && !onboarded) {
    return NextResponse.redirect(new URL('/onboarding', req.url))
  }
  return NextResponse.next()
})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}
