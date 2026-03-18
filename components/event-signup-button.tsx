"use client"

import { useState } from "react"
import { useUser } from "@clerk/nextjs"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useSubmissionStatus } from "@/hooks/queries/use-submission-status"
import { useEventSignup } from "@/hooks/mutations/use-event-signup"
import { toast } from "sonner"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { AuthRequiredDialog } from "@/components/auth-required-dialog"
import { Loader2, CheckCircle2, FileText } from "lucide-react"
import type { ApiOpenEventItem } from "@/lib/api/types"
import { useTranslation } from 'react-i18next'
import '@/lib/i18n-client'

interface EventSignupButtonProps {
  event: ApiOpenEventItem
  className?: string
}

const PARTIAL_DELAY_MS = 1 * 60 * 1000

export function EventSignupButton({ event, className }: EventSignupButtonProps) {
  if (event.form_type === 'none') {
    return null
  }

  const { isSignedIn, isLoaded } = useUser()
  const router = useRouter()
  const { t } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)
  const [showAuthDialog, setShowAuthDialog] = useState(false)

  const { 
    data: submissionData, 
    isLoading: isCheckingStatus,
    error: statusError,
  } = useSubmissionStatus(event.form_id)

  const signupMutation = useEventSignup()

  const getSubmissionStatus = () => {
    if (!submissionData) return false
    if (submissionData.submission_status === 'partial' && submissionData.submission_timestamp) {
      const submissionTime = new Date(submissionData.submission_timestamp).getTime()
      const elapsed = Date.now() - submissionTime
      if (elapsed < PARTIAL_DELAY_MS) {
        return false
      }
      return 'partial'
    }
    return submissionData.submission_status
  }

  const submissionStatus = getSubmissionStatus()
  const statusCheckError = !!statusError

  const handleButtonClick = () => {
    if (!isSignedIn) {
      setShowAuthDialog(true)
      return
    }
    
    if (submissionStatus === 'partial' && event.google_responders_url) {
      router.push(`/events/${event.id}/form?formUrl=${encodeURIComponent(event.google_responders_url)}`)
      return
    }
    
    setIsOpen(true)
  }

  const handleSignup = async () => {
    const submissionType = event.form_type === 'google' ? 'partial' : 'none'
    
    try {
      await signupMutation.mutateAsync({ 
        formId: event.form_id, 
        submissionType 
      })
      
      setIsOpen(false)

      if (event.form_type === "google" && event.google_responders_url) {
        router.push(`/events/${event.id}/form?formUrl=${encodeURIComponent(event.google_responders_url)}`)
      } else {
        toast.success(`${t('eventSignup.successToast')} ${event.name}!`)
        router.refresh()
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "An error occurred")
    }
  }

  const isCompleted = submissionStatus === true
  const isPartial = submissionStatus === 'partial'
  const isDisabled = !isLoaded || isCheckingStatus || isCompleted || statusCheckError

  const getButtonContent = () => {
    if (statusCheckError) {
      return t('eventSignup.somethingWentWrong')
    }
    if (isCompleted) {
      return (
        <>
          <CheckCircle2 className="mr-2 h-4 w-4" />
          {t('eventSignup.signedUp')}
        </>
      )
    }
    if (isPartial) {
      return (
        <>
          <FileText className="mr-2 h-4 w-4" />
          {t('eventSignup.fillGoogleForm')}
        </>
      )
    }
    return t('eventSignup.signUp')
  }

  const getButtonClassName = () => {
    if (statusCheckError) {
      return "bg-orange-500 text-white cursor-not-allowed hover:bg-red-500"
    }
    if (isCompleted) {
      return "bg-green-500 text-white hover:bg-green-500"
    }
    if (isPartial) {
      return "bg-amber-400 text-black hover:bg-amber-400"
    }
    return ""
  }

  return (
    <>
      <AuthRequiredDialog
        open={showAuthDialog}
        onOpenChange={setShowAuthDialog}
        title={t('eventSignup.signInRequired')}
        description={t('eventSignup.signInDescription')}
      />
      
      <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
        <Button 
          className={`${className} ${getButtonClassName()}`} 
          onClick={handleButtonClick}
          disabled={isDisabled}
        >
          {getButtonContent()}
        </Button>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t('eventSignup.confirmTitle')}</AlertDialogTitle>
            <AlertDialogDescription>
              {t('eventSignup.confirmDescription')} {event.name}?
            </AlertDialogDescription>
          </AlertDialogHeader>
          {signupMutation.error && (
            <div className="text-sm text-red-500 bg-red-50 dark:bg-red-950 p-3 rounded-md">
              {signupMutation.error instanceof Error ? signupMutation.error.message : "An error occurred"}
            </div>
          )}
          <AlertDialogFooter className="gap-2">
            <AlertDialogCancel disabled={signupMutation.isPending}>{t('eventSignup.cancel')}</AlertDialogCancel>
            <AlertDialogAction onClick={handleSignup} disabled={signupMutation.isPending}>
              {signupMutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {t('eventSignup.signingUp')}
                </>
              ) : event.form_type === "google" ? (
                <>
                  <FileText className="mr-2 h-4 w-4" />
                  {t('eventSignup.confirmAndFillForm')}
                </>
              ) : (
                t('eventSignup.confirm')
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
