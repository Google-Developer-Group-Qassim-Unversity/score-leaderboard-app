'use client'

import { useEffect, useState } from 'react'
import { getFullCurrentUrl } from '@/lib/utils'

// Reads window.location.href directly in render is a classic SSR/hydration
// trap: the server-rendered (and initial-hydration) pass has no window, so
// it silently produces an empty string, and nothing forces a re-render to
// pick up the real value afterward unless something else happens to trigger
// one. This hook makes that re-render explicit and guaranteed via useEffect.
export function useCurrentUrl(): string {
  const [url, setUrl] = useState('')

  useEffect(() => {
    setUrl(getFullCurrentUrl())
  }, [])

  return url
}
