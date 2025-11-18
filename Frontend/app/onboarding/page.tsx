'use client'

import * as React from 'react'
import { useUser } from '@clerk/nextjs'
import { useRouter, useSearchParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
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
import { completeOnboarding, type OnboardingFormData } from './_actions'
import { isAllowedRedirectUrl } from '@/lib/redirect-config'

// Form validation schema
const onboardingSchema = z.object({
  uni_id: z
    .string()
    .length(9, 'UI ID must be exactly 9 digits')
    .regex(/^\d{9}$/, 'UI ID must contain only numbers')
    .refine(
      (val) => {
        const thirdDigit = val.charAt(2)
        return thirdDigit === '1' || thirdDigit === '2' || thirdDigit === '3'
      },
      { message: 'The 3rd digit must be 1, 2, or 3' }
    ),
  fullArabicName: z
    .string()
    .min(1, 'Full Arabic name is required')
    .regex(/^[\u0600-\u06FF\s]+$/, 'Name must be in Arabic characters only'),
  saudiPhone: z
    .string()
    .length(10, 'Phone number must be exactly 10 digits')
    .regex(/^05\d{8}$/, 'Phone number must start with 05 followed by 8 digits'),
  gender: z.enum(['male', 'female'], {
    required_error: 'Please select a gender',
  }),
  personalEmail: z
    .string()
    .email('Invalid email address')
    .refine(
      (email) => {
        const domain = email.split('@')[1]
        return domain !== 'qu.edu.sa'
      },
      { message: 'Personal email cannot be a @qu.edu.sa address' }
    ),
})

type OnboardingFormValues = z.infer<typeof onboardingSchema>

export default function OnboardingPage() {
  const { user } = useUser()
  const router = useRouter()
  const searchParams = useSearchParams()
  const [error, setError] = React.useState('')
  const [isSubmitting, setIsSubmitting] = React.useState(false)

  const form = useForm<OnboardingFormValues>({
    resolver: zodResolver(onboardingSchema),
    defaultValues: {
      uni_id: '',
      fullArabicName: '',
      saudiPhone: '',
      gender: undefined,
      personalEmail: '',
    },
  })

  const onSubmit = async (data: OnboardingFormValues) => {
    setError('')
    setIsSubmitting(true)

    try {
      const result = await completeOnboarding(data as OnboardingFormData)

      if (result.error) {
        setError(result.error)
      } else if (result.success) {
        // Reload user data to get updated metadata
        await user?.reload()
        
        // Check for redirect URL from another app
        const redirectUrl = searchParams.get('redirect_url')
        if (redirectUrl && isAllowedRedirectUrl(redirectUrl)) {
          window.location.href = redirectUrl
          return
        }
        
        // Default redirect to home page
        router.push('/')
      } else {
        setError('Unexpected response from server. Please try again.')
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Complete Your Profile</CardTitle>
          <CardDescription>
            Please provide the following information to complete your registration
          </CardDescription>
        </CardHeader>

        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* UI ID Field */}
              <FormField
                control={form.control}
                name="uni_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>University ID</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="412345678"
                        {...field}
                        maxLength={9}
                        disabled={isSubmitting}
                        dir="ltr"
                      />
                    </FormControl>
                    <FormDescription>
                      9-digit student ID (3rd digit must be 1, 2, or 3)
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Full Arabic Name */}
              <FormField
                control={form.control}
                name="fullArabicName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>الاسم الرباعي (Full Arabic Name)</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="أحمد محمد علي السعيد"
                        {...field}
                        disabled={isSubmitting}
                        dir="rtl"
                      />
                    </FormControl>
                    <FormDescription>
                      Enter your full name in Arabic
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Saudi Phone Number */}
              <FormField
                control={form.control}
                name="saudiPhone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Saudi Phone Number</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="0512345678"
                        {...field}
                        maxLength={10}
                        disabled={isSubmitting}
                        dir="ltr"
                      />
                    </FormControl>
                    <FormDescription>
                      Must start with 05 (e.g., 0512345678)
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Gender */}
              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Gender</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-1"
                        disabled={isSubmitting}
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="male" />
                          </FormControl>
                          <FormLabel className="font-normal cursor-pointer">
                            Male
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="female" />
                          </FormControl>
                          <FormLabel className="font-normal cursor-pointer">
                            Female
                          </FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Personal Email */}
              <FormField
                control={form.control}
                name="personalEmail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Personal Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="your.email@gmail.com"
                        {...field}
                        disabled={isSubmitting}
                        dir="ltr"
                      />
                    </FormControl>
                    <FormDescription>
                      Your personal email (not @qu.edu.sa)
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Completing Registration...
                  </>
                ) : (
                  'Complete Registration'
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
