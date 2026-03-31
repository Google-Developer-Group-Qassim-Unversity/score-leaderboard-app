import { clerkMiddleware } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import { config as envConfig } from '@/lib/config'

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


export default clerkMiddleware(async (auth, req) => {
  const { userId, sessionClaims } = await auth()

  // Check if user is authenticated and has not completed onboarding
  if (userId && !sessionClaims?.metadata?.onboardingComplete) {
    console.log(`User ${userId} is not onboarded, redirecting to onboarding page: ${envConfig.authFrontendUrl}/onboarding`);
    return NextResponse.redirect(new URL('/onboarding', envConfig.authFrontendUrl))
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
