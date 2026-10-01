'use client'

import { Suspense } from 'react'
import { AuthSsoCallback } from '@/components/auth-sso-callback'

export default function SsoCallbackPage() {
  return <Suspense fallback={null}><AuthSsoCallback /></Suspense>
}
