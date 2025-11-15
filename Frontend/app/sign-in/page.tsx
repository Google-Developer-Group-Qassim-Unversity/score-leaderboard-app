'use client'

import * as React from 'react'
import { useSignIn } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { AlertCircle, Loader2 } from 'lucide-react'
import Link from 'next/link'

// Sign-in form validation schema
const signInSchema = z.object({
  emailAddress: z
    .string()
    .email('Invalid email address'),
  password: z
    .string()
    .min(1, 'Password is required'),
})

type SignInFormValues = z.infer<typeof signInSchema>

export default function SignInPage() {
  const { isLoaded, signIn, setActive } = useSignIn()
  const [error, setError] = React.useState('')
  const [loading, setLoading] = React.useState(false)
  const router = useRouter()

  const form = useForm<SignInFormValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      emailAddress: '',
      password: '',
    },
  })

  const onSubmit = async (data: SignInFormValues) => {
    setError('')

    if (!isLoaded) return

    setLoading(true)

    try {
      // Start the sign-in process
      const result = await signIn.create({
        identifier: data.emailAddress,
        password: data.password,
      })

      if (result.status === 'complete') {
        // Set the active session
        await setActive({ session: result.createdSessionId })
        // Redirect to home page
        router.push('/')
      } else {
        setError('Unable to complete sign in. Please try again.')
      }
    } catch (err: any) {
      setError(err.errors?.[0]?.message || 'Invalid email or password')
    } finally {
      setLoading(false)
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
          <CardTitle className="text-2xl font-bold text-center">Welcome Back</CardTitle>
          <CardDescription className="text-center">
            Sign in to your GDG account
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
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                        {...field}
                        disabled={loading}
                      />
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
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Enter password"
                        {...field}
                        disabled={loading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing In...
                  </>
                ) : (
                  'Sign In'
                )}
              </Button>
            </form>
          </Form>
        </CardContent>

        <CardFooter className="flex flex-col space-y-2">
          <div className="text-sm text-center text-muted-foreground">
            Don't have an account?{' '}
            <Link href="/sign-up" className="text-primary hover:underline">
              Sign Up
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
