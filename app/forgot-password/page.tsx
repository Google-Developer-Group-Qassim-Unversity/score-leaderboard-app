'use client'

import * as React from 'react'
import { Suspense } from 'react'
import { useSignIn } from '@clerk/nextjs'
import { isClerkAPIResponseError } from '@clerk/nextjs/errors'
import { REGEXP_ONLY_DIGITS } from 'input-otp'
import { useSearchParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { PasswordInput } from '@/components/ui/password-input'
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from '@/components/ui/input-otp'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { AlertCircle, Loader2, RefreshCw, ExternalLink } from 'lucide-react'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'
import '@/lib/i18n-client'
import { getValidatedRedirectParam, withRedirectParam } from '@/lib/redirect-config'
import { asUniversityEmail } from '@/lib/auth-identifier'

const RESEND_COOLDOWN_SECONDS = 60

const createIdentifierSchema = (t: (key: string) => string) => z.object({
  identifier: z.string().refine(value => asUniversityEmail(value) !== null, t('validation.universityId.exactly9Digits')),
})

// Step 3: New password schema factory
const createNewPasswordSchema = (t: any) => z.object({
  password: z.string()
    .min(8, t('validation.password.minLength')),
})

type IdentifierFormValues = z.infer<ReturnType<typeof createIdentifierSchema>>
type NewPasswordFormValues = z.infer<ReturnType<typeof createNewPasswordSchema>>

type Step = 'identifier' | 'verification' | 'new-password'

export default function ForgotPasswordPage() {
  return (
    <Suspense fallback={null}>
      <ForgotPasswordContent />
    </Suspense>
  )
}

function ForgotPasswordContent() {
  const { t } = useTranslation()
  const { signIn } = useSignIn()
  const searchParams = useSearchParams()
  const redirectParam = getValidatedRedirectParam(searchParams)

  const [step, setStep] = React.useState<Step>('identifier')
  const [email, setEmail] = React.useState('')
  const [error, setError] = React.useState('')
  const [loading, setLoading] = React.useState(false)

  // Verification code state
  const [verificationCode, setVerificationCode] = React.useState('')
  const [codeError, setCodeError] = React.useState(false)
  const [resendCooldown, setResendCooldown] = React.useState(0)
  const [resending, setResending] = React.useState(false)

  // Create schemas with current translation function
  const identifierSchema = React.useMemo(() => createIdentifierSchema(t), [t])
  const newPasswordSchema = React.useMemo(() => createNewPasswordSchema(t), [t])

  // Forms
  const identifierForm = useForm<IdentifierFormValues>({
    resolver: zodResolver(identifierSchema),
    defaultValues: {
      identifier: '',
    },
  })

  const newPasswordForm = useForm<NewPasswordFormValues>({
    resolver: zodResolver(newPasswordSchema),
    defaultValues: {
      password: '',
    },
  })

  // Countdown timer for resend button
  React.useEffect(() => {
    if (resendCooldown <= 0) return

    const timer = setInterval(() => {
      setResendCooldown((prev) => prev - 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [resendCooldown])

  const canResend = resendCooldown <= 0

  // Step 1: Send password reset code
  const onSubmitIdentifier = async (data: IdentifierFormValues) => {
    setError('')
    const emailAddress = asUniversityEmail(data.identifier)
    if (!emailAddress) {
      setError(t('validation.universityId.exactly9Digits'))
      return
    }
    setLoading(true)
    setEmail(emailAddress)

    try {
      const { error: createError } = await signIn.create({ identifier: emailAddress })
      if (createError) throw createError
      const { error: sendError } = await signIn.resetPasswordEmailCode.sendCode()
      if (sendError) throw sendError

      setResendCooldown(RESEND_COOLDOWN_SECONDS)
      setStep('verification')
    } catch (err: any) {
      console.error('Reset password error:', err)
      if (isClerkAPIResponseError(err) && err.errors[0]?.code === 'form_identifier_not_found') {
        setError(t('auth.forgotPassword.step1.error.noAccount'))
      } else {
        setError(isClerkAPIResponseError(err) ? err.errors[0]?.longMessage || t('auth.forgotPassword.step1.error.unexpected') : t('auth.forgotPassword.step1.error.unexpected'))
      }
    } finally {
      setLoading(false)
    }
  }

  // Resend verification code
  const handleResendCode = async () => {
    if (!canResend || resending) return

    setResending(true)
    setError('')

    try {
      const { error: sendError } = await signIn.resetPasswordEmailCode.sendCode()
      if (sendError) throw sendError
      setResendCooldown(RESEND_COOLDOWN_SECONDS)
    } catch (err: any) {
      console.error('Resend error:', err)
      setError(isClerkAPIResponseError(err) ? err.errors[0]?.message || t('auth.forgotPassword.step2.error.resendFailed') : t('auth.forgotPassword.step2.error.resendFailed'))
    } finally {
      setResending(false)
    }
  }

  // Step 2: Verify code and move to password step
  const onSubmitVerification = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (verificationCode.length !== 6) {
      setError(t('validation.verificationCode.invalid'))
      return
    }

    setLoading(true)
    try {
      const { error: verifyError } = await signIn.resetPasswordEmailCode.verifyCode({ code: verificationCode })
      if (verifyError) throw verifyError
      if (signIn.status === 'needs_new_password') setStep('new-password')
      else setError(t('auth.forgotPassword.step3.error.resetFailed'))
    } catch (err) {
      setCodeError(true)
      setError(isClerkAPIResponseError(err) ? err.errors[0]?.longMessage || t('auth.forgotPassword.step2.error.unexpected') : t('auth.forgotPassword.step2.error.unexpected'))
    } finally {
      setLoading(false)
    }
  }

  // Step 3: Reset password with code
  const onSubmitNewPassword = async (data: NewPasswordFormValues) => {
    setError('')
    setLoading(true)

    try {
      const { error: submitError } = await signIn.resetPasswordEmailCode.submitPassword({ password: data.password })
      if (submitError) throw submitError

      if (signIn.status === 'needs_second_factor') {
        setError(t('auth.forgotPassword.step2.error.2faRequired'))
      } else if (signIn.status === 'complete') {
        const { error: finishError } = await signIn.finalize({
          navigate: ({ session, decorateUrl }) => {
            if (session?.currentTask) return
            window.location.assign(decorateUrl(redirectParam || '/'))
          },
        })
        if (finishError) throw finishError
      } else {
        console.log('Unexpected password reset status:', signIn.status)
        setError(t('auth.forgotPassword.step3.error.resetFailed'))
      }
    } catch (err: any) {
      console.error('Password reset error:', JSON.stringify(err, null, 2))
      setError(isClerkAPIResponseError(err) ? err.errors[0]?.longMessage || t('auth.forgotPassword.step3.error.unexpected') : t('auth.forgotPassword.step3.error.unexpected'))
    } finally {
      setLoading(false)
    }
  }

  // Handle back navigation
  const handleBack = () => {
    setError('')
    if (step !== 'identifier') {
      signIn.reset()
      setVerificationCode('')
      setResendCooldown(0)
      setStep('identifier')
    }
  }

  // Step 1: University ID
  if (step === 'identifier') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 relative">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">{t('auth.forgotPassword.step1.title')}</CardTitle>
            <CardDescription className="text-center">
              {t('auth.forgotPassword.step1.description')}
            </CardDescription>
          </CardHeader>

          <CardContent>
            {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <Form {...identifierForm}>
              <form onSubmit={identifierForm.handleSubmit(onSubmitIdentifier)} className="space-y-4">
                <FormField
                  control={identifierForm.control}
                  name="identifier"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel className="block leading-6">{t('auth.forgotPassword.step1.universityId')}</FormLabel>
                      <div dir="ltr" className="flex h-11 items-center overflow-hidden rounded-md border border-input bg-background shadow-xs focus-within:border-ring focus-within:ring-[3px] focus-within:ring-ring/50">
                        <FormControl>
                          <Input type="text" inputMode="numeric" pattern="[0-9]*" maxLength={9} dir="ltr" className="h-full min-w-0 flex-1 rounded-none border-0 text-left tracking-wide shadow-none focus-visible:ring-0" placeholder={t('auth.signIn.universityIdPlaceholder')} autoComplete="username" {...field} onChange={event => {
                            if (/^\d{0,9}$/.test(event.target.value)) field.onChange(event.target.value)
                          }} disabled={loading} />
                        </FormControl>
                        <span className="flex h-full shrink-0 items-center border-s border-input px-3 text-sm text-muted-foreground">@qu.edu.sa</span>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      {t('auth.forgotPassword.step1.sending')}
                    </>
                  ) : (
                    t('auth.forgotPassword.step1.submit')
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>

          <CardFooter className="flex flex-col space-y-2">
            <div className="text-sm text-center text-muted-foreground">
              {t('auth.forgotPassword.step1.footer.text')}{' '}
              <Link href={withRedirectParam('/sign-in', redirectParam)} className="text-primary hover:underline">
                {t('auth.forgotPassword.step1.footer.link')}
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    )
  }

  // Step 2: Verification Code
  if (step === 'verification') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 relative">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">{t('auth.forgotPassword.step2.title')}</CardTitle>
            <CardDescription className="text-center">
              {t('auth.forgotPassword.step2.description', { email })}
            </CardDescription>
          </CardHeader>

          <CardContent>
            {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={onSubmitVerification} className="space-y-8">
              <div className="space-y-4">
                <Label htmlFor="verificationCode" className="block leading-6">{t('auth.forgotPassword.step2.verificationCode')}</Label>
                <InputOTP
                  id="verificationCode"
                  aria-label={t('auth.forgotPassword.step2.verificationCode')}
                  maxLength={6}
                  pattern={REGEXP_ONLY_DIGITS}
                  autoComplete="one-time-code"
                  value={verificationCode}
                  onChange={value => {
                    setVerificationCode(value)
                    setCodeError(false)
                  }}
                  disabled={loading}
                  dir="ltr"
                  containerClassName="justify-center"
                >
                  <InputOTPGroup>
                    <InputOTPSlot index={0} className={codeError ? 'border-destructive' : ''} />
                    <InputOTPSlot index={1} className={codeError ? 'border-destructive' : ''} />
                    <InputOTPSlot index={2} className={codeError ? 'border-destructive' : ''} />
                  </InputOTPGroup>
                  <InputOTPSeparator />
                  <InputOTPGroup>
                    <InputOTPSlot index={3} className={codeError ? 'border-destructive' : ''} />
                    <InputOTPSlot index={4} className={codeError ? 'border-destructive' : ''} />
                    <InputOTPSlot index={5} className={codeError ? 'border-destructive' : ''} />
                  </InputOTPGroup>
                </InputOTP>
                <div className="flex justify-center pt-1">
                  {canResend ? (
                    <Button
                      type="button"
                      variant="link"
                      size="sm"
                      onClick={handleResendCode}
                      disabled={resending}
                      className="text-sm h-auto p-0"
                    >
                      {resending ? (
                        <>
                          <Loader2 className="mr-1.5 h-3 w-3 animate-spin" />
                          {t('auth.forgotPassword.step2.resending')}
                        </>
                      ) : (
                        <>
                          <RefreshCw className="mr-1.5 h-3 w-3" />
                          {t('auth.forgotPassword.step2.resend')}
                        </>
                      )}
                    </Button>
                  ) : (
                    <span className="text-sm text-muted-foreground">
                      {t('auth.forgotPassword.step2.resendCountdown', { countdown: resendCooldown })}
                    </span>
                  )}
                </div>
                <div className="flex justify-center pt-2">
                  <a
                    href="https://outlook.office.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    <span>{t('auth.forgotPassword.step2.goToOutlook')}</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </div>

              <div className="flex flex-col gap-2 mt-4">
                <Button
                  type="submit"
                  className="w-full"
                  disabled={loading || verificationCode.length !== 6}
                >
                  {t('auth.forgotPassword.step2.continue')}
                </Button>

                <Button
                  type="button"
                  variant="ghost"
                  className="w-full"
                  onClick={handleBack}
                  disabled={loading}
                >
                  {t('auth.forgotPassword.step2.back')}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Step 3: New Password
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 relative">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">{t('auth.forgotPassword.step3.title')}</CardTitle>
          <CardDescription className="text-center">
            {t('auth.forgotPassword.step3.description')}
          </CardDescription>
        </CardHeader>

        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <Form {...newPasswordForm}>
            <form onSubmit={newPasswordForm.handleSubmit(onSubmitNewPassword)} className="space-y-4">
              <FormField
                control={newPasswordForm.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('auth.forgotPassword.step3.newPassword')}</FormLabel>
                    <FormControl>
                      <PasswordInput
                        placeholder={t('auth.forgotPassword.step3.placeholder')}
                        autoComplete="new-password"
                        {...field}
                        disabled={loading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex flex-col gap-2">
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      {t('auth.forgotPassword.step3.resetting')}
                    </>
                  ) : (
                    t('auth.forgotPassword.step3.submit')
                  )}
                </Button>

                <Button
                  type="button"
                  variant="ghost"
                  className="w-full"
                  onClick={handleBack}
                  disabled={loading}
                >
                  {t('auth.forgotPassword.step3.back')}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
