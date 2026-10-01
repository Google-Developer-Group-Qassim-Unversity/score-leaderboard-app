'use client'

import * as React from 'react'
import { Suspense } from 'react'
import { useSignUp } from '@clerk/nextjs'
import { isClerkAPIResponseError } from '@clerk/nextjs/errors'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { getValidatedRedirectParam, withRedirectParam } from '@/lib/redirect-config'
import '@/lib/i18n-client'

export default function ContinuePage() {
  return <Suspense fallback={null}><ContinueContent /></Suspense>
}

function ContinueContent() {
  const { t } = useTranslation()
  const { signUp } = useSignUp()
  const searchParams = useSearchParams()
  const redirectParam = getValidatedRedirectParam(searchParams)
  const [firstName, setFirstName] = React.useState('')
  const [lastName, setLastName] = React.useState('')
  const [username, setUsername] = React.useState('')
  const [legalAccepted, setLegalAccepted] = React.useState(false)
  const [error, setError] = React.useState('')
  const [loading, setLoading] = React.useState(false)

  const complete = async (event: React.FormEvent) => {
    event.preventDefault()
    setError('')
    setLoading(true)
    try {
      const { error: updateError } = await signUp.update({
        ...(signUp.missingFields.includes('first_name') ? { firstName: firstName.trim() } : {}),
        ...(signUp.missingFields.includes('last_name') ? { lastName: lastName.trim() } : {}),
        ...(signUp.missingFields.includes('username') ? { username: username.trim() } : {}),
        ...(signUp.missingFields.includes('legal_accepted') ? { legalAccepted } : {}),
      })
      if (updateError) throw updateError
      if (signUp.status !== 'complete') throw new Error('Missing sign-up requirements')
      const { error: finishError } = await signUp.finalize({
        navigate: ({ session, decorateUrl }) => {
          if (session?.currentTask) return
          window.location.assign(decorateUrl(withRedirectParam('/onboarding', redirectParam)))
        },
      })
      if (finishError) throw finishError
    } catch (reason) {
      setError(isClerkAPIResponseError(reason)
        ? reason.errors[0]?.longMessage || t('auth.entry.error.unexpected')
        : t('auth.entry.error.unexpected'))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>{t('auth.entry.newAccountTitle')}</CardTitle>
          <CardDescription>{t('auth.entry.missingFieldsDescription')}</CardDescription>
        </CardHeader>
        <CardContent>
          {error && <p role="alert" className="mb-4 text-sm text-destructive">{error}</p>}
          {signUp.status === 'missing_requirements' ? (
            <form onSubmit={complete} className="space-y-4">
              {signUp.missingFields.includes('first_name') && <div className="space-y-2"><Label htmlFor="firstName">{t('auth.entry.firstName')}</Label><Input id="firstName" value={firstName} onChange={event => setFirstName(event.target.value)} required /></div>}
              {signUp.missingFields.includes('last_name') && <div className="space-y-2"><Label htmlFor="lastName">{t('auth.entry.lastName')}</Label><Input id="lastName" value={lastName} onChange={event => setLastName(event.target.value)} required /></div>}
              {signUp.missingFields.includes('username') && <div className="space-y-2"><Label htmlFor="username">{t('auth.entry.username')}</Label><Input id="username" value={username} onChange={event => setUsername(event.target.value)} required /></div>}
              {signUp.missingFields.includes('legal_accepted') && <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={legalAccepted} onChange={event => setLegalAccepted(event.target.checked)} required />{t('auth.entry.acceptTerms')}</label>}
              <div id="clerk-captcha" />
              <Button type="submit" disabled={loading} className="w-full">{t('auth.entry.continue')}</Button>
            </form>
          ) : (
            <Link href={withRedirectParam('/sign-in', redirectParam)} className="text-primary underline">{t('auth.entry.startOver')}</Link>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
