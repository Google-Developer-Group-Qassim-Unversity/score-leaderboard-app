'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Loader2, CheckCircle2, XCircle, AlertTriangle } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Alert, AlertDescription } from '@/components/ui/alert'
import type { ApiEventForm } from '@/lib/api-types'
import { submitEventForm } from '@/app/event/_actions'

interface EventSignupDialogProps {
  eventId: number
  eventName: string
  form: ApiEventForm | null
  formLoadError?: boolean
  children: React.ReactNode
}

type FormValues = {
  [key: string]: string
}

export function EventSignupDialog({ eventId, eventName, form, formLoadError = false, children }: EventSignupDialogProps) {
  const [open, setOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const hasQuestions = form && form.questions && form.questions.length > 0

  // Initialize form with dynamic fields based on questions
  const hookForm = useForm<FormValues>({
    defaultValues: hasQuestions
      ? form.questions.reduce((acc, question) => {
          acc[`question_${question.id}`] = ''
          return acc
        }, {} as FormValues)
      : {},
  })

  const onSubmit = async (data: FormValues) => {
    if (!form) return

    setIsSubmitting(true)
    setSubmitStatus('idle')
    setErrorMessage('')

    try {
      // Convert form data to responses format
      const responses = hasQuestions
        ? form.questions.map((question) => ({
            questionId: question.id,
            value: data[`question_${question.id}`],
          }))
        : []

      const result = await submitEventForm({
        formId: form.formId,
        responses,
      })

      if (result.error) {
        setSubmitStatus('error')
        setErrorMessage(result.error)
      } else {
        setSubmitStatus('success')
        hookForm.reset()
        // Close dialog after 2 seconds on success
        setTimeout(() => {
          setOpen(false)
          setSubmitStatus('idle')
        }, 2000)
      }
    } catch (error) {
      setSubmitStatus('error')
      setErrorMessage('An unexpected error occurred. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleConfirmSignup = async () => {
    if (!hasQuestions) {
      // If no questions, just submit directly
      await onSubmit({})
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Sign Up for Event</DialogTitle>
          <DialogDescription>
            {formLoadError
              ? 'Unable to load registration form'
              : hasQuestions
              ? 'Please answer the following questions to complete your registration.'
              : `Confirm your registration for "${eventName}".`}
          </DialogDescription>
        </DialogHeader>

        {/* Form Load Error State */}
        {formLoadError ? (
          <div className="py-8 flex flex-col items-center justify-center space-y-4">
            <div className="rounded-full bg-red-100 p-3">
              <XCircle className="h-12 w-12 text-red-600" />
            </div>
            <div className="text-center space-y-2">
              <h3 className="text-lg font-semibold text-red-900">Unable to Load Form</h3>
              <p className="text-sm text-red-700">
                We couldn't load the registration form. This could be due to a network issue or the
                server being unavailable.
              </p>
              <p className="text-sm text-muted-foreground">
                Please try again later or contact support if the problem persists.
              </p>
            </div>
            <Button onClick={() => setOpen(false)} variant="outline" className="mt-4">
              Close
            </Button>
          </div>
        ) : submitStatus === 'success' ? (
          /* Success State */
          <div className="py-8 flex flex-col items-center justify-center space-y-4">
            <div className="rounded-full bg-green-100 p-3">
              <CheckCircle2 className="h-12 w-12 text-green-600" />
            </div>
            <div className="text-center">
              <h3 className="text-lg font-semibold text-green-900">Registration Successful!</h3>
              <p className="text-sm text-green-700 mt-2">
                You have successfully signed up for this event.
              </p>
            </div>
          </div>
        ) : (
          <>
            {submitStatus === 'error' && (
              <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>{errorMessage}</AlertDescription>
              </Alert>
            )}

            {/* Loading State */}
            {!form ? (
              <div className="py-8 flex flex-col items-center justify-center space-y-4">
                <Loader2 className="h-12 w-12 animate-spin text-muted-foreground" />
                <p className="text-muted-foreground">Loading registration form...</p>
              </div>
            ) : hasQuestions ? (
              /* Form with Questions */
              <Form {...hookForm}>
                <form onSubmit={hookForm.handleSubmit(onSubmit)} className="space-y-6">
                  {form.questions.map((question, index) => (
                    <FormField
                      key={question.id}
                      control={hookForm.control}
                      name={`question_${question.id}`}
                      rules={{ required: 'This field is required' }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base">
                            {index + 1}. {question.value}
                            <span className="text-red-500 ml-1">*</span>
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Your answer"
                              {...field}
                              disabled={isSubmitting}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  ))}

                  <div className="flex justify-end gap-3 pt-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setOpen(false)}
                      disabled={isSubmitting}
                    >
                      Cancel
                    </Button>
                    <Button type="submit" disabled={isSubmitting}>
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        'Submit'
                      )}
                    </Button>
                  </div>
                </form>
              </Form>
            ) : (
              /* Confirmation Only (No Questions) */
              <div className="space-y-6">
                <p className="text-center text-muted-foreground">
                  You are about to sign up for <strong>{eventName}</strong>. Click confirm to
                  complete your registration.
                </p>
                <div className="flex justify-end gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setOpen(false)}
                    disabled={isSubmitting}
                  >
                    Cancel
                  </Button>
                  <Button onClick={handleConfirmSignup} disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Confirming...
                      </>
                    ) : (
                      'Confirm'
                    )}
                  </Button>
                </div>
              </div>
            )}
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
