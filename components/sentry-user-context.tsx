'use client'

import { useEffect } from 'react'
import { useAuth, useUser } from '@clerk/nextjs'
import * as Sentry from '@sentry/nextjs'

/**
 * Tells Sentry who an event belongs to.
 *
 * Without it every issue reads "Users Impacted: 0", which is not a measure of
 * harm but of ignorance - it is why 18 students whose check-in failed could not
 * be identified afterwards, and their attendance could not be restored.
 *
 * `uni_id` is deliberately included: it is the id organizers and the admin app
 * actually work in, so an issue can be acted on without a second lookup.
 */
export function SentryUserContext() {
  const { isLoaded, isSignedIn, userId } = useAuth()
  const { user } = useUser()

  useEffect(() => {
    if (!isLoaded) return

    if (!isSignedIn || !userId) {
      Sentry.setUser(null)
      return
    }

    const metadata = user?.publicMetadata as { uni_id?: string } | undefined
    Sentry.setUser({
      id: userId,
      ...(metadata?.uni_id ? { username: String(metadata.uni_id) } : {}),
    })
  }, [isLoaded, isSignedIn, userId, user])

  return null
}
