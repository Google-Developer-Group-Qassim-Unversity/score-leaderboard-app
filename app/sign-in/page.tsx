'use client'

import * as React from 'react'
import { Suspense } from 'react'
import { useSignIn } from "@clerk/nextjs/legacy"
import { useRouter, useSearchParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { PasswordInput } from '@/components/ui/password-input'
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
import { AlertCircle, Loader2 } from 'lucide-react'
import Link from 'next/link'
import { getValidatedRedirectParam, withRedirectParam } from '@/lib/redirect-config'
import { VerificationCard } from '@/components/verification-card'
import { useTranslation } from 'react-i18next'
import '@/lib/i18n-client'
import { GoogleIcon } from '@/components/icons/google-icon'

const createSignInSchema = (t: (key: string) => string) => z.object({
  universityId: z.string()
    .min(9, t('validation.universityId.mustBe9Digits'))
    .max(9, t('validation.universityId.mustBe9Digits'))
    .regex(/^\d{9}$/, t('validation.universityId.exactly9Digits')),
  password: z.string().min(1, t('validation.password.required')),
})

type SignInFormValues = {
  universityId: string
  password: string
}

export default function SignInPage() {
  return (
    <Suspense fallback={null}>
      <SignInContent />
    </Suspense>
  )
}

function SignInContent() {
  const { t } = useTranslation()
  const { isLoaded, signIn, setActive } = useSignIn()
  const [error, setError] = React.useState('')
  const [loading, setLoading] = React.useState(false)
  const [googleLoading, setGoogleLoading] = React.useState(false)
  const [needsSecondFactor, setNeedsSecondFactor] = React.useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirectParam = getValidatedRedirectParam(searchParams)

  const signInSchema = React.useMemo(() => createSignInSchema(t), [t])

  const form = useForm<SignInFormValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      universityId: '',
      password: '',
    },
  })

  const handleComplete = async (sessionId: string) => {
    if (!setActive) {
      return;
    }

    try {
      await setActive({ session: sessionId })
      // Middleware already keeps a fully-authenticated visitor off this page
      // on the next request; navigate there directly rather than waiting on
      // a separate effect to notice isSignedIn flipped.
      if (redirectParam) {
        window.location.href = redirectParam
      } else {
        router.push('/')
      }
    } catch (err) {
      console.error("Error setting active session:", err);
      window.location.reload();
    }
  }

  const onSubmit = async (data: SignInFormValues) => {
    setError('')
    if (!isLoaded) return
    setLoading(true)

    const emailAddress = `${data.universityId}@qu.edu.sa`

    try {
      const result = await signIn.create({
        identifier: emailAddress,
        password: data.password,
      })

      if (result.status === 'complete') {
        if (!result.createdSessionId) {
            console.error("Session complete but no ID returned")
            setError(t('auth.signIn.error.sessionError'))
            return
        }
        await handleComplete(result.createdSessionId)
      } else if (
        result.status === 'needs_second_factor' ||
        // Clerk's newer "Device Trust" feature returns this status for new-device
        // sign-ins; it's not yet in the installed @clerk SDK's type definitions.
        (result.status as string) === 'needs_client_trust'
      ) {
        const emailAddressId = result.supportedSecondFactors?.find(
          (factor) => factor.strategy === 'email_code'
        )?.emailAddressId

        if (!emailAddressId) {
          setError(t('auth.signIn.error.verificationCode'))
          return
        }

        await signIn.prepareSecondFactor({
          strategy: 'email_code',
          emailAddressId: emailAddressId,
        })
        setNeedsSecondFactor(true)
      } else {
        setError(t('auth.signIn.error.signInFailed'))
      }
    } catch (err: any) {
      console.error('Sign-in error:', err)
      if (err.errors?.[0]?.code === 'form_password_incorrect' ||
          err.errors?.[0]?.code === 'form_identifier_not_found') {
        setError(t('auth.signIn.error.invalidCredentials'))
      } else {
        setError(err.errors?.[0]?.longMessage || t('auth.signIn.error.unexpected'))
      }
    } finally {
      setLoading(false)
    }
  }

  // Handle successful verification (2FA)
  const handleVerificationSuccess = async (sessionId: string) => {
    await handleComplete(sessionId)
  }

  const handleGoogleSignIn = async () => {
    if (!isLoaded) return
    setError('')
    setGoogleLoading(true)
    try {
      await signIn.authenticateWithRedirect({
        strategy: 'oauth_google',
        redirectUrl: withRedirectParam('/sign-in/sso-callback', redirectParam),
        redirectUrlComplete: withRedirectParam('/onboarding', redirectParam),
      })
    } catch (err) {
      console.error('Google sign-in error:', err)
      setError(t('auth.signIn.error.googleUnexpected'))
      setGoogleLoading(false)
    }
  }

  // Show verification view for second factor
  if (needsSecondFactor) {
    return (
      <VerificationCard
        type="sign-in"
        onSuccess={handleVerificationSuccess}
        onBack={() => setNeedsSecondFactor(false)}
      />
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md border-t-4 border-t-blue-600">
        <CardHeader>
          <div className="flex justify-center mb-4">
            <img
              src="/GDG.svg"
              alt="GDG Logo"
              width={100}
              height={100}
            />
          </div>
          <div className="flex justify-center mb-2">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
              {t('auth.signIn.badge')}
            </span>
          </div>
          <CardTitle className="text-2xl font-bold text-center">{t('auth.signIn.title')}</CardTitle>
          <CardDescription className="text-center">
            {t('auth.signIn.description')}
          </CardDescription>
        </CardHeader>

        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <Button
            type="button"
            variant="outline"
            className="w-full mb-4"
            disabled={loading || googleLoading || !isLoaded}
            onClick={handleGoogleSignIn}
          >
            {googleLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <GoogleIcon className="mr-2 h-4 w-4" />
            )}
            {t('auth.signIn.continueWithGoogle')}
          </Button>

          <div className="relative mb-4">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                {t('auth.signIn.orContinueWith')}
              </span>
            </div>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4" autoComplete="on">
              <FormField
                control={form.control}
                name="universityId"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel>{t('auth.signIn.universityId')}</FormLabel>
                    <FormControl>
                      <div className={`flex items-center rounded-md border ${fieldState.error ? 'border-destructive' : 'border-input'} focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2`}>
                        <Input
                          type="text"
                          inputMode="numeric"
                          placeholder={t('auth.signIn.universityIdPlaceholder')}
                          autoComplete="username"
                          maxLength={9}
                          className="border-0 rounded-r-none focus-visible:ring-0 focus-visible:ring-offset-0"
                          {...field}
                          disabled={loading || googleLoading || !isLoaded}
                        />
                        <span className="inline-flex items-center px-3 h-10 bg-background text-muted-foreground text-sm border-l border-input rounded-r-md">
                          {t('auth.signIn.emailSuffix')}
                        </span>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('auth.signIn.password')}</FormLabel>
                    <FormControl>
                      <PasswordInput
                        placeholder={t('auth.signIn.passwordPlaceholder')}
                        autoComplete="current-password"
                        {...field}
                        disabled={loading || googleLoading || !isLoaded}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={loading || googleLoading || !isLoaded}>
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {t('auth.signIn.signingIn')}
                  </>
                ) : (
                  t('auth.signIn.submit')
                )}
              </Button>
            </form>
          </Form>
        </CardContent>

        <CardFooter className="flex flex-col space-y-2">
          <div className="text-sm text-center text-muted-foreground">
            {t('auth.signIn.footer.text')}{' '}
            <Link
              href={withRedirectParam('/sign-up', redirectParam)}
              className="text-primary hover:underline"
            >
              {t('auth.signIn.footer.link')}
            </Link>
          </div>
          <div className="text-sm text-center">
            <Link
              href="/forgot-password"
              className="text-primary hover:underline"
            >
              {t('auth.signIn.forgotPassword')}
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
