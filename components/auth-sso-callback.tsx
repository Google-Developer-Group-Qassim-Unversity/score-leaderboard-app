'use client'

import * as React from 'react'
import { useClerk, useSignIn, useSignUp } from '@clerk/nextjs'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'
import { getValidatedRedirectParam, withRedirectParam } from '@/lib/redirect-config'
import '@/lib/i18n-client'

export function AuthSsoCallback() {
  const clerk = useClerk()
  const { signIn } = useSignIn()
  const { signUp } = useSignUp()
  const router = useRouter()
  const searchParams = useSearchParams()
  const { t } = useTranslation()
  const redirectParam = getValidatedRedirectParam(searchParams)
  const hasRun = React.useRef(false)
  const [error, setError] = React.useState(false)

  React.useEffect(() => {
    if (!clerk.loaded || hasRun.current) return
    hasRun.current = true

    const finishSignIn = async () => {
      const { error } = await signIn.finalize({
        navigate: ({ session, decorateUrl }) => {
          if (session?.currentTask) return
          window.location.assign(decorateUrl(withRedirectParam('/onboarding', redirectParam)))
        },
      })
      if (error) throw error
    }
    const finishSignUp = async () => {
      const { error } = await signUp.finalize({
        navigate: ({ session, decorateUrl }) => {
          if (session?.currentTask) return
          window.location.assign(decorateUrl(withRedirectParam('/onboarding', redirectParam)))
        },
      })
      if (error) throw error
    }

    const complete = async () => {
      if (signIn.status === 'complete') return finishSignIn()
      if (signUp.status === 'complete') return finishSignUp()

      if (signUp.isTransferable) {
        const { error } = await signIn.create({ transfer: true })
        if (error) throw error
        if ((signIn.status as string) === 'complete') return finishSignIn()
        router.replace(withRedirectParam('/sign-in', redirectParam))
        return
      }
      if (signIn.isTransferable) {
        const { error } = await signUp.create({ transfer: true })
        if (error) throw error
        if ((signUp.status as string) === 'complete') return finishSignUp()
        if (signUp.status === 'missing_requirements') {
          router.replace(withRedirectParam('/sign-in/continue', redirectParam))
          return
        }
      }
      if (signUp.status === 'missing_requirements') {
        router.replace(withRedirectParam('/sign-in/continue', redirectParam))
        return
      }

      const sessionId = signIn.existingSession?.sessionId || signUp.existingSession?.sessionId
      if (sessionId) {
        await clerk.setActive({
          session: sessionId,
          navigate: ({ session, decorateUrl }) => {
            if (session?.currentTask) return
            window.location.assign(decorateUrl(withRedirectParam('/onboarding', redirectParam)))
          },
        })
        return
      }
      router.replace(withRedirectParam('/sign-in', redirectParam))
    }

    void complete().catch(reason => {
      console.error('Google authentication callback failed:', reason)
      setError(true)
    })
  }, [clerk, signIn, signUp, router, redirectParam])

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div id="clerk-captcha" />
      {error ? <p>{t('auth.entry.error.googleCallback')} <Link href={withRedirectParam('/sign-in', redirectParam)} className="underline">{t('auth.entry.startOver')}</Link></p> : <p>{t('auth.entry.completing')}</p>}
    </div>
  )
}
