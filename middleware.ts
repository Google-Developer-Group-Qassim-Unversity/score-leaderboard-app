import { clerkMiddleware } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

export default clerkMiddleware(async (auth, req) => {
  const { sessionClaims } = await auth()
  
  // Allow access to onboarding page itself
  if (req.nextUrl.pathname === '/onboarding') {
    return NextResponse.next()
  }
  
  // Check if user is authenticated and has not completed onboarding
  const metadata = sessionClaims?.metadata as { onboardingComplete?: boolean } | undefined
  if (sessionClaims?.userId && !metadata?.onboardingComplete) {
    const authUrl = process.env.NEXT_PUBLIC_AUTH_URL || req.nextUrl.origin
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
