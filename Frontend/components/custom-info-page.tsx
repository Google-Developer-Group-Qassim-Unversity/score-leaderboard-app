'use client'

import * as React from 'react'
import { useUser } from '@clerk/nextjs'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
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
import { AlertCircle, CheckCircle2, Loader2 } from 'lucide-react'
import { updateProfile, type UpdateProfileFormData } from '@/app/profile/_actions'

// Form validation schema (excluding uiId which cannot be updated)
const profileUpdateSchema = z.object({
  fullArabicName: z
    .string()
    .min(1, 'Full Arabic name is required')
    .regex(/^[\u0600-\u06FF\s]+$/, 'Name must be in Arabic characters only'),
  saudiPhone: z
    .string()
    .length(10, 'Phone number must be exactly 10 digits')
    .regex(/^05\d{8}$/, 'Phone number must start with 05'),
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

type ProfileUpdateFormValues = z.infer<typeof profileUpdateSchema>

export default function CustomInfoPage() {
  const { user, isLoaded } = useUser()
  const [error, setError] = React.useState('')
  const [success, setSuccess] = React.useState(false)
  const [isSubmitting, setIsSubmitting] = React.useState(false)

  const metadata = user?.publicMetadata as any

  const form = useForm<ProfileUpdateFormValues>({
    resolver: zodResolver(profileUpdateSchema),
    defaultValues: {
      fullArabicName: metadata?.fullArabicName || '',
      saudiPhone: metadata?.saudiPhone || '',
      gender: metadata?.gender || undefined,
      personalEmail: metadata?.personalEmail || '',
    },
  })

  // Update form when user data loads
  React.useEffect(() => {
    if (isLoaded && metadata) {
      form.reset({
        fullArabicName: metadata.fullArabicName || '',
        saudiPhone: metadata.saudiPhone || '',
        gender: metadata.gender || undefined,
        personalEmail: metadata.personalEmail || '',
      })
    }
  }, [isLoaded, metadata, form])

  const onSubmit = async (data: ProfileUpdateFormValues) => {
    setError('')
    setSuccess(false)
    setIsSubmitting(true)

    try {
      const result = await updateProfile(data as UpdateProfileFormData)

      if (result.error) {
        setError(result.error)
      } else if (result.success) {
        // Reload user data to get updated metadata
        await user?.reload()
        setSuccess(true)
        // Hide success message after 3 seconds
        setTimeout(() => setSuccess(false), 3000)
      } else {
        setError('Unexpected response from server. Please try again.')
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="p-6 max-w-2xl">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Custom Information</h2>
        <p className="text-sm text-muted-foreground">
          Update your personal information.
        </p>
      </div>

      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {success && (
        <Alert className="mb-6 border-green-500 text-green-700 dark:text-green-400">
          <CheckCircle2 className="h-4 w-4" />
          <AlertDescription>Profile updated successfully!</AlertDescription>
        </Alert>
      )}

      {/* Display non-editable University ID */}
      <div className="mb-6 p-4 bg-muted rounded-lg">
        <label className="text-sm font-medium">University ID</label>
        <p className="text-lg font-mono mt-1">{metadata?.uiId || 'Not set'}</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input
                    placeholder="0512345678"
                    {...field}
                    maxLength={10}
                    disabled={isSubmitting}
                    dir="ltr"
                  />
                </FormControl>
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
                    value={field.value}
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
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving Changes...
              </>
            ) : (
              'Save Changes'
            )}
          </Button>
        </form>
      </Form>
    </div>
  )
}
