'use client'

import * as React from 'react'
import { Suspense } from 'react'
import { useSignIn, useSignUp } from '@clerk/nextjs'
import { isClerkAPIResponseError } from '@clerk/nextjs/errors'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'
import { REGEXP_ONLY_DIGITS } from 'input-otp'
import { AlertCircle, Loader2, RefreshCw } from 'lucide-react'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp'
import { Label } from '@/components/ui/label'
import { PasswordInput } from '@/components/ui/password-input'
import { GoogleIcon } from '@/components/icons/google-icon'
import { getValidatedRedirectParam, withRedirectParam } from '@/lib/redirect-config'
import { asUniversityEmail } from '@/lib/auth-identifier'
import '@/lib/i18n-client'

type Step = 'identifier' | 'code' | 'new-account' | 'missing-fields' | 'mfa'
const RESEND_COOLDOWN_SECONDS = 30

export default function SignInPage() {
  return <Suspense fallback={null}><SignInContent /></Suspense>
}

function SignInContent() {
  const { t } = useTranslation()
  const { signIn } = useSignIn()
  const { signUp } = useSignUp()
  const searchParams = useSearchParams()
  const redirectParam = getValidatedRedirectParam(searchParams)
  const [step, setStep] = React.useState<Step>('identifier')
  const [universityId, setUniversityId] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [code, setCode] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [firstName, setFirstName] = React.useState('')
  const [lastName, setLastName] = React.useState('')
  const [username, setUsername] = React.useState('')
  const [legalAccepted, setLegalAccepted] = React.useState(false)
  const [error, setError] = React.useState('')
  const [loading, setLoading] = React.useState(false)
  const [googleLoading, setGoogleLoading] = React.useState(false)
  const [cooldown, setCooldown] = React.useState(0)
  const resumedMfa = React.useRef(false)

  React.useEffect(() => {
    if (cooldown <= 0) return
    const timer = window.setTimeout(() => setCooldown(cooldown - 1), 1000)
    return () => window.clearTimeout(timer)
  }, [cooldown])

  React.useEffect(() => {
    if (step !== 'identifier' || resumedMfa.current) return
    if (signIn.status !== 'needs_client_trust' && signIn.status !== 'needs_second_factor') return
    resumedMfa.current = true
    if (!signIn.supportedSecondFactors.some(item => item.strategy === 'email_code')) {
      setError(t('auth.entry.error.unexpected'))
      return
    }
    setEmail(signIn.identifier || '')
    void signIn.mfa.sendEmailCode().then(({ error: mfaError }) => {
      if (mfaError) {
        setError(t('auth.entry.error.sendCode'))
        return
      }
      setCooldown(RESEND_COOLDOWN_SECONDS)
      setStep('mfa')
    })
  }, [signIn, step, t])

  const errorMessage = (reason: unknown, fallback: string) => {
    if (isClerkAPIResponseError(reason)) {
      return reason.errors[0]?.longMessage || reason.errors[0]?.message || fallback
    }
    return fallback
  }

  const finishSignIn = async () => {
    const { error: finishError } = await signIn.finalize({
      navigate: ({ session, decorateUrl }) => {
        if (session?.currentTask) return
        window.location.assign(decorateUrl(redirectParam || '/'))
      },
    })
    if (finishError) setError(errorMessage(finishError, t('auth.entry.error.unexpected')))
  }

  const finishSignUp = async () => {
    const { error: finishError } = await signUp.finalize({
      navigate: ({ session, decorateUrl }) => {
        if (session?.currentTask) return
        window.location.assign(decorateUrl(withRedirectParam('/onboarding', redirectParam)))
      },
    })
    if (finishError) setError(errorMessage(finishError, t('auth.entry.error.unexpected')))
  }

  const sendCode = async (event: React.FormEvent) => {
    event.preventDefault()
    setError('')
    const normalized = asUniversityEmail(universityId)
    if (!normalized) {
      setError(t('validation.universityId.exactly9Digits'))
      return
    }
    setLoading(true)
    try {
      // Verification precedes the decision between sign-in and sign-up.
      const { error: createError } = await signIn.create({ identifier: normalized, signUpIfMissing: true })
      if (createError) throw createError
      const { error: sendError } = await signIn.emailCode.sendCode()
      if (sendError) throw sendError
      setEmail(normalized)
      setCooldown(RESEND_COOLDOWN_SECONDS)
      setStep('code')
    } catch (reason) {
      setError(errorMessage(reason, t('auth.entry.error.sendCode')))
    } finally {
      setLoading(false)
    }
  }

  const resendCode = async () => {
    if (cooldown > 0 || loading) return
    setError('')
    setLoading(true)
    try {
      const { error: sendError } = step === 'mfa'
        ? await signIn.mfa.sendEmailCode()
        : await signIn.emailCode.sendCode()
      if (sendError) throw sendError
      setCooldown(RESEND_COOLDOWN_SECONDS)
    } catch (reason) {
      setError(errorMessage(reason, t('auth.entry.error.sendCode')))
    } finally {
      setLoading(false)
    }
  }

  const verifyCode = async (event: React.FormEvent) => {
    event.preventDefault()
    setError('')
    if (!/^\d{6}$/.test(code)) {
      setError(t('validation.verificationCode.invalid'))
      return
    }
    setLoading(true)
    try {
      const { error: verifyError } = step === 'mfa'
        ? await signIn.mfa.verifyEmailCode({ code })
        : await signIn.emailCode.verifyCode({ code })
      if (verifyError) {
        if (isClerkAPIResponseError(verifyError) && verifyError.errors[0]?.code === 'sign_up_if_missing_transfer') {
          setCode('')
          setStep('new-account')
          return
        }
        throw verifyError
      }
      if (signIn.status === 'complete') {
        await finishSignIn()
      } else if (signIn.status === 'needs_client_trust' || signIn.status === 'needs_second_factor') {
        if (!signIn.supportedSecondFactors.some(item => item.strategy === 'email_code')) {
          setError(t('auth.entry.error.unexpected'))
          return
        }
        const { error: mfaError } = await signIn.mfa.sendEmailCode()
        if (mfaError) throw mfaError
        setCode('')
        setCooldown(RESEND_COOLDOWN_SECONDS)
        setStep('mfa')
      } else {
        setError(t('auth.entry.error.unexpected'))
      }
    } catch (reason) {
      setError(errorMessage(reason, t('auth.entry.error.verifyCode')))
    } finally {
      setLoading(false)
    }
  }

  const createAccount = async (event: React.FormEvent) => {
    event.preventDefault()
    setError('')
    if (password.length < 8) {
      setError(t('validation.password.minLength'))
      return
    }
    setLoading(true)
    try {
      const { error: createError } = await signUp.create({ transfer: true, password })
      if (createError) throw createError
      if (signUp.status === 'complete') await finishSignUp()
      else if (signUp.status === 'missing_requirements') setStep('missing-fields')
      else setError(t('auth.entry.error.unexpected'))
    } catch (reason) {
      setError(errorMessage(reason, t('auth.entry.error.unexpected')))
    } finally {
      setLoading(false)
    }
  }

  const completeMissingFields = async (event: React.FormEvent) => {
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
      if (signUp.status === 'complete') await finishSignUp()
      else setError(t('auth.entry.error.unexpected'))
    } catch (reason) {
      setError(errorMessage(reason, t('auth.entry.error.unexpected')))
    } finally {
      setLoading(false)
    }
  }

  const startGoogle = async () => {
    setError('')
    setGoogleLoading(true)
    try {
      const { error: ssoError } = await signIn.sso({
        strategy: 'oauth_google',
        redirectCallbackUrl: withRedirectParam('/sign-in/sso-callback', redirectParam),
        redirectUrl: withRedirectParam('/onboarding', redirectParam),
      })
      if (ssoError) throw ssoError
    } catch (reason) {
      setError(errorMessage(reason, t('auth.signIn.error.googleUnexpected')))
    } finally {
      setGoogleLoading(false)
    }
  }

  const verifying = step === 'code' || step === 'mfa'
  const busy = loading || googleLoading

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-gray-50 px-4 py-10 dark:bg-gray-900 sm:px-6">
      <Card className="w-full max-w-[440px] gap-7 overflow-hidden border-border/70 py-0 shadow-lg">
        <CardHeader className="gap-3 px-6 pt-8 text-center sm:px-8">
          <div className="mb-1 flex justify-center"><img src="/GDG.svg" alt="GDG Logo" width={76} height={76} /></div>
          <CardTitle className="text-2xl leading-snug font-bold">{t(step === 'new-account' || step === 'missing-fields' ? 'auth.entry.newAccountTitle' : 'auth.entry.title')}</CardTitle>
          <CardDescription className="leading-6">
            {verifying
              ? t(step === 'mfa' ? 'auth.entry.mfaDescription' : 'auth.entry.codeDescription')
              : t(step === 'new-account' ? 'auth.entry.newAccountDescription' : step === 'missing-fields' ? 'auth.entry.missingFieldsDescription' : 'auth.entry.description')}
          </CardDescription>
          {email && (verifying || step === 'new-account') && <p dir="ltr" className="mx-auto max-w-full rounded-md bg-muted px-3 py-1.5 text-sm text-foreground break-all">{email}</p>}
        </CardHeader>
        <CardContent className={step === 'identifier' ? 'px-6 sm:px-8' : 'px-6 pb-8 sm:px-8'}>
          {error && <Alert variant="destructive" className="mb-4"><AlertCircle className="h-4 w-4" /><AlertDescription>{error}</AlertDescription></Alert>}

          {step === 'identifier' && <>
            <Button type="button" variant="outline" className="h-11 w-full" disabled={busy} onClick={startGoogle}>
              {googleLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <GoogleIcon className="h-4 w-4" />}
              {t('auth.signIn.continueWithGoogle')}
            </Button>
            <div className="relative my-6 flex items-center gap-3 text-xs text-muted-foreground"><span className="h-px flex-1 bg-border" /><span>{t('auth.signIn.orContinueWith')}</span><span className="h-px flex-1 bg-border" /></div>
            <form onSubmit={sendCode} className="space-y-6">
              <div className="space-y-3">
                <Label htmlFor="universityId" className="block leading-6">{t('auth.signIn.universityId')}</Label>
                <div dir="ltr" className="flex h-11 items-center overflow-hidden rounded-md border border-input bg-background shadow-xs transition-shadow focus-within:border-ring focus-within:ring-[3px] focus-within:ring-ring/50">
                  <Input
                    id="universityId"
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength={9}
                    autoComplete="username"
                    dir="ltr"
                    className="h-full min-w-0 flex-1 rounded-none border-0 text-left tracking-wide shadow-none focus-visible:ring-0"
                    value={universityId}
                    onChange={event => {
                      if (/^\d{0,9}$/.test(event.target.value)) setUniversityId(event.target.value)
                    }}
                    placeholder={t('auth.signIn.universityIdPlaceholder')}
                    disabled={busy}
                    required
                  />
                  <span className="flex h-full shrink-0 items-center border-s border-input px-3 text-sm text-muted-foreground">@qu.edu.sa</span>
                </div>
              </div>
              <div id="clerk-captcha" />
              <Button type="submit" className="h-11 w-full bg-blue-600 hover:bg-blue-700" disabled={busy}>
                {loading && <Loader2 className="h-4 w-4 animate-spin" />}{t('auth.entry.continue')}
              </Button>
            </form>
          </>}

          {verifying && <form onSubmit={verifyCode} className="space-y-6">
            <div className="space-y-4">
              <Label htmlFor="verificationCode" className="block leading-6">{t('auth.verification.verificationCode')}</Label>
              <InputOTP
                id="verificationCode"
                aria-label={t('auth.verification.verificationCode')}
                maxLength={6}
                pattern={REGEXP_ONLY_DIGITS}
                autoComplete="one-time-code"
                value={code}
                onChange={setCode}
                disabled={loading}
                dir="ltr"
                containerClassName="justify-center"
              >
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            </div>
            <div className="space-y-2">
              <Button type="submit" className="h-11 w-full" disabled={loading || code.length !== 6}>{loading && <Loader2 className="h-4 w-4 animate-spin" />}{t('auth.verification.submit')}</Button>
              <Button type="button" variant="link" className="w-full" onClick={resendCode} disabled={loading || cooldown > 0}>
                <RefreshCw className="h-4 w-4" />{cooldown > 0 ? t('auth.verification.resendCountdown', { countdown: cooldown }) : t('auth.verification.resend')}
              </Button>
            </div>
          </form>}

          {step === 'new-account' && <form onSubmit={createAccount} className="space-y-6">
            <div className="space-y-3"><Label htmlFor="password" className="block leading-6">{t('auth.entry.password')}</Label><PasswordInput id="password" autoComplete="new-password" className="h-11" value={password} onChange={event => setPassword(event.target.value)} disabled={loading} required /></div>
            <div id="clerk-captcha" />
            <Button type="submit" className="h-11 w-full" disabled={loading}>{loading && <Loader2 className="h-4 w-4 animate-spin" />}{t('auth.entry.createAccount')}</Button>
          </form>}

          {step === 'missing-fields' && <form onSubmit={completeMissingFields} className="space-y-6">
            {signUp.missingFields.includes('first_name') && <div className="space-y-3"><Label htmlFor="firstName" className="block leading-6">{t('auth.entry.firstName')}</Label><Input id="firstName" className="h-11" value={firstName} onChange={event => setFirstName(event.target.value)} required /></div>}
            {signUp.missingFields.includes('last_name') && <div className="space-y-3"><Label htmlFor="lastName" className="block leading-6">{t('auth.entry.lastName')}</Label><Input id="lastName" className="h-11" value={lastName} onChange={event => setLastName(event.target.value)} required /></div>}
            {signUp.missingFields.includes('username') && <div className="space-y-3"><Label htmlFor="username" className="block leading-6">{t('auth.entry.username')}</Label><Input id="username" className="h-11" value={username} onChange={event => setUsername(event.target.value)} required /></div>}
            {signUp.missingFields.includes('legal_accepted') && <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={legalAccepted} onChange={event => setLegalAccepted(event.target.checked)} required />{t('auth.entry.acceptTerms')}</label>}
            <div id="clerk-captcha" />
            <Button type="submit" className="h-11 w-full" disabled={loading}>{loading && <Loader2 className="h-4 w-4 animate-spin" />}{t('auth.entry.createAccount')}</Button>
          </form>}
        </CardContent>
        {step === 'identifier' && <CardFooter className="justify-center px-6 pb-8 text-sm sm:px-8"><Link href={withRedirectParam('/forgot-password', redirectParam)} className="text-primary hover:underline">{t('auth.signIn.forgotPassword')}</Link></CardFooter>}
      </Card>
    </div>
  )
}
