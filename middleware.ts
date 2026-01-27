import { clerkMiddleware } from '@clerk/nextjs/server'
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


export default clerkMiddleware(async (auth, req) => {
  const { userId, sessionClaims } = await auth()
  const authUrl = process.env.NEXT_PUBLIC_AUTH_URL

  if (!authUrl) {
    return NextResponse.redirect(new URL('/', req.nextUrl.origin))
  }
  // Check if user is authenticated and has not completed onboarding
  if (userId && !sessionClaims?.metadata?.onboardingComplete) {
    console.log(`User ${userId} is not onboarded, redirecting to onboarding page: ${authUrl}/onboarding`);
    return NextResponse.redirect(new URL('/onboarding', authUrl))
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
