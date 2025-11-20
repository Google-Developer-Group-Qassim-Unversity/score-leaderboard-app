'use client'

import { useState } from 'react'
import { useSignUp } from '@clerk/nextjs'
import { useRouter, useSearchParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { AlertCircle, Loader2 } from 'lucide-react'

const signUpSchema = z.object({
  emailAddress: z
    .string()
    .min(1, 'Email is required')
    .email('Invalid email address')
    .refine(
      (email) => email.endsWith('@qu.edu.sa'),
      { message: 'Must be a valid @qu.edu.sa email address' }
    ),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters'),
  confirmPassword: z
    .string()
    .min(1, 'Please confirm your password'),
  code: z
    .string()
    .optional()
    .refine((val) => !val || val.length === 0 || (val.length === 6 && /^\d+$/.test(val)), {
      message: 'Code must be exactly 6 digits',
    }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
})

type SignUpFormValues = z.infer<typeof signUpSchema>

export default function SignUpPage() {
  const { isLoaded, signUp, setActive } = useSignUp()
  const [pendingVerification, setPendingVerification] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()

  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      emailAddress: '',
      password: '',
      confirmPassword: '',
      code: '',
    },
  })

  // Handle submission of the sign-up form
  const handleSignUp = async (data: SignUpFormValues) => {
    if (!isLoaded) return

    setError('')
    setLoading(true)

    try {
      // Start the sign-up process using the email and password provided
      await signUp.create({
        emailAddress: data.emailAddress,
        password: data.password,
      })

      // Send the user an email with the verification code
      await signUp.prepareEmailAddressVerification({
        strategy: 'email_code',
      })

      // Set 'pendingVerification' true to display verification form
      setPendingVerification(true)
    } catch (err: any) {
      // See https://clerk.com/docs/guides/development/custom-flows/error-handling
      console.error('Sign-up error:', JSON.stringify(err, null, 2))
      setError(err.errors?.[0]?.message || 'An error occurred during sign-up')
    } finally {
      setLoading(false)
    }
  }

  // Handle submission of the verification form
  const handleVerify = async (data: SignUpFormValues) => {
    if (!isLoaded) return

    setError('')
    setLoading(true)

    try {
      if (!data.code || data.code.length !== 6) {
        setError('Please enter a valid 6-digit verification code')
        setLoading(false)
        return
      }

      // Use the code the user provided to attempt verification
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code: data.code,
      })

      // If verification was completed, set the session to active and redirect
      if (signUpAttempt.status === 'complete') {
        await setActive({
          session: signUpAttempt.createdSessionId,
          navigate: async ({ session }) => {
            if (session?.currentTask) {
              // Check for session tasks and navigate to custom UI to help users resolve them
              // See https://clerk.com/docs/guides/development/custom-flows/overview#session-tasks
              console.log('Session task detected:', session.currentTask)
              router.push('/sign-up/tasks')
              return
            }

            // Preserve redirect URL through onboarding
            const redirectUrl = searchParams.get('redirect_url')
            if (redirectUrl) {
              router.push(`/onboarding?redirect_url=${encodeURIComponent(redirectUrl)}`)
            } else {
              router.push('/onboarding')
            }
          },
        })
      } else {
        // If the status is not complete, check why. User may need to complete further steps.
        console.error('Sign-up attempt not complete:', signUpAttempt)
        console.error('Sign-up attempt status:', signUpAttempt.status)
        setError('Unable to complete sign up. Please try again.')
      }
    } catch (err: any) {
      // See https://clerk.com/docs/guides/development/custom-flows/error-handling
      console.error('Verification error:', JSON.stringify(err, null, 2))
      setError(err.errors?.[0]?.message || 'An error occurred during verification')
    } finally {
      setLoading(false)
    }
  }

  const onSubmit = async (data: SignUpFormValues) => {
    if (!pendingVerification) {
      await handleSignUp(data)
    } else {
      await handleVerify(data)
    }
  }

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Create Account
          </CardTitle>
          <CardDescription className="text-center">
            Sign up with your QU email address
          </CardDescription>
        </CardHeader>

        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4" autoComplete="on">
              <FormField
                control={form.control}
                name="emailAddress"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="your.name@qu.edu.sa"
                        autoComplete="email"
                        disabled={loading || pendingVerification}
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Must be a valid @qu.edu.sa email address
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Enter password"
                        autoComplete="new-password"
                        disabled={loading || pendingVerification}
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      At least 8 characters
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Confirm password"
                        autoComplete="new-password"
                        disabled={loading || pendingVerification}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Clerk CAPTCHA - Only shows when suspicious activity is detected */}
              {!pendingVerification && <div id="clerk-captcha" />}

              {pendingVerification && (
                <FormField
                  control={form.control}
                  name="code"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Verification Code</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Enter 6-digit code"
                          autoComplete="one-time-code"
                          maxLength={6}
                          disabled={loading}
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Check your email for the verification code
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {pendingVerification ? 'Verifying...' : 'Creating Account...'}
                  </>
                ) : (
                  pendingVerification ? 'Verify Email' : 'Sign Up'
                )}
              </Button>
            </form>
          </Form>
        </CardContent>

        <CardFooter className="flex flex-col space-y-2">
          <div className="text-sm text-center text-muted-foreground">
            Already have an account?{' '}
            <Link 
              href={searchParams.get('redirect_url') 
                ? `/sign-in?redirect_url=${encodeURIComponent(searchParams.get('redirect_url')!)}` 
                : '/sign-in'
              } 
              className="text-primary hover:underline"
            >
              Sign In
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
