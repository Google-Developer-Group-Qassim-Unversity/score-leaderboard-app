import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

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

// Routes exempt from the onboarding-completion gate below: the auth pages
// must stay reachable for signed-out users, and /onboarding itself must be
// exempt too, otherwise an authenticated-but-not-onboarded user visiting it
// would be redirected right back to itself in an infinite loop.
const isAuthRoute = createRouteMatcher([
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/forgot-password(.*)',
  '/onboarding(.*)',
])

export default clerkMiddleware(async (auth, req) => {
  const { userId, sessionClaims } = await auth()

  if (isAuthRoute(req)) {
    return NextResponse.next()
  }

  // Check if user is authenticated and has not completed onboarding
  if (userId && !sessionClaims?.metadata?.onboardingComplete) {
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
