"use client"

import { useState, useEffect } from "react"
import { useAuth, useUser } from "@clerk/nextjs"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { checkSubmissionStatus } from "@/lib/api"
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
import type { ApiOpenEventItem, SubmissionStatus } from "@/lib/api-types"
import { useTranslation } from 'react-i18next'
import '@/lib/i18n-client'

interface EventSignupButtonProps {
  event: ApiOpenEventItem
  className?: string
}

const API_BASE_URL = process.env.NEXT_PUBLIC_DEV_HOST || process.env.NEXT_PUBLIC_HOST 

// Delay before showing partial status (2 minutes in ms)
const PARTIAL_DELAY_MS = 1 * 60 * 1000

export function EventSignupButton({ event, className }: EventSignupButtonProps) {
  // Early return if form_type is 'none' - no registration required
  if (event.form_type === 'none') {
    return null
  }

  const { isSignedIn, isLoaded } = useUser()
  const { getToken } = useAuth()
  const router = useRouter()
  const { t } = useTranslation()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [showAuthDialog, setShowAuthDialog] = useState(false)
  const [submissionStatus, setSubmissionStatus] = useState<SubmissionStatus>(false)
  const [isCheckingStatus, setIsCheckingStatus] = useState(false)
  const [statusCheckError, setStatusCheckError] = useState(false)

  useEffect(() => {
    async function checkStatus() {
      if (isSignedIn && isLoaded) {
        setIsCheckingStatus(true)
        setStatusCheckError(false)
        try {
          const token = await getToken()
          if (token) {
            const response = await checkSubmissionStatus(event.form_id, token)
            
            // Check if the API call failed (returns null)
            if (response === null) {
              setStatusCheckError(true)
              setSubmissionStatus(false)
            } else if (response.submission_status === 'partial' && response.submission_timestamp) {
              // If partial, check if enough time has passed to show the partial state
              const submissionTime = new Date(response.submission_timestamp).getTime()
              const now = Date.now()
              const elapsed = now - submissionTime
              
              if (elapsed < PARTIAL_DELAY_MS) {
                // Not enough time passed, don't show partial state yet
                // Just show as not submitted so they don't see the prompt immediately
                setSubmissionStatus(false)
              } else {
                setSubmissionStatus('partial')
              }
            } else {
              // Normal case: false (not signed up) or true (signed up)
              setSubmissionStatus(response.submission_status)
            }
          }
        } catch (err) {
          console.error("Failed to check submission status:", err)
          setStatusCheckError(true)
        } finally {
          setIsCheckingStatus(false)
        }
      }
    }
    checkStatus()
  }, [isSignedIn, isLoaded, event.form_id, getToken])

  const handleButtonClick = () => {
    if (!isSignedIn) {
      setShowAuthDialog(true)
      return
    }
    
    // If partial status, redirect to Google Form directly
    if (submissionStatus === 'partial' && event.google_responders_url) {
      router.push(`/events/${event.id}/form?formUrl=${encodeURIComponent(event.google_responders_url)}`)
      return
    }
    
    // Otherwise show confirmation dialog
    setIsOpen(true)
  }

  const handleSignup = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const token = await getToken()
      
      // Determine submission type based on form type
      const submissionType = event.form_type === 'google' ? 'partial' : 'none' // 'registration' and other types use 'none'
      
      const response = await fetch(`${API_BASE_URL}/submissions/${event.form_id}?submission_type=${submissionType}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.detail || `Failed to sign up: ${response.statusText}`)
      }

      // Success - update state immediately
      setIsOpen(false)

      // Handle based on form type
      if (event.form_type === "google" && event.google_responders_url) {
        // Don't set to partial immediately - let the useEffect handle it after the delay
        // This ensures the 2-minute delay logic is respected
        router.push(`/events/${event.id}/form?formUrl=${encodeURIComponent(event.google_responders_url)}`)
      } else {
        // Completed signup for non-google forms
        setSubmissionStatus(true)
        toast.success(`${t('eventSignup.successToast')} ${event.name}!`)
        router.refresh()
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  // Determine button state and appearance
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
          {error && (
            <div className="text-sm text-red-500 bg-red-50 dark:bg-red-950 p-3 rounded-md">
              {error}
            </div>
          )}
          <AlertDialogFooter className="gap-2">
            <AlertDialogCancel disabled={isLoading}>{t('eventSignup.cancel')}</AlertDialogCancel>
            <AlertDialogAction onClick={handleSignup} disabled={isLoading}>
              {isLoading ? (
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
