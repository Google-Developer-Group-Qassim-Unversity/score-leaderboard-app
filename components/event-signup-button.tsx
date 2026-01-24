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

interface EventSignupButtonProps {
  event: ApiOpenEventItem
  className?: string
}

const API_BASE_URL = process.env.NEXT_PUBLIC_DEV_HOST || process.env.NEXT_PUBLIC_HOST || "http://178.128.205.239:8000"

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
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [showAuthDialog, setShowAuthDialog] = useState(false)
  const [submissionStatus, setSubmissionStatus] = useState<SubmissionStatus>(false)
  const [isCheckingStatus, setIsCheckingStatus] = useState(false)

  useEffect(() => {
    async function checkStatus() {
      if (isSignedIn && isLoaded) {
        setIsCheckingStatus(true)
        try {
          const token = await getToken()
          if (token) {
            const response = await checkSubmissionStatus(event.form_id, token)
            
            // If partial, check if enough time has passed to show the partial state
            if (response.submission_status === 'partial' && response.submission_timestamp) {
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
              setSubmissionStatus(response.submission_status)
            }
          }
        } catch (err) {
          console.error("Failed to check submission status:", err)
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
        // Set to partial and redirect to Google Form - no toast since they still need to fill it
        setSubmissionStatus('partial')
        router.push(`/events/${event.id}/form?formUrl=${encodeURIComponent(event.google_responders_url)}`)
      } else {
        // Completed signup for non-google forms
        setSubmissionStatus(true)
        toast.success(`Successfully signed up for ${event.name}!`)
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
  const isDisabled = !isLoaded || isCheckingStatus || isCompleted

  const getButtonContent = () => {
    if (isCompleted) {
      return (
        <>
          <CheckCircle2 className="mr-2 h-4 w-4" />
          Signed Up
        </>
      )
    }
    if (isPartial) {
      return (
        <>
          <FileText className="mr-2 h-4 w-4" />
          Fill Google Form
        </>
      )
    }
    return "Sign Up"
  }

  const getButtonStyle = () => {
    if (isCompleted) {
      return {
        backgroundColor: 'rgb(34, 197, 94)',
        color: 'white',
      }
    }
    if (isPartial) {
      return {
        backgroundColor: 'rgb(251, 191, 36)',
        color: 'rgb(0, 0, 0)',
      }
    }
    return undefined
  }

  return (
    <>
      <AuthRequiredDialog
        open={showAuthDialog}
        onOpenChange={setShowAuthDialog}
        title="Sign In Required"
        description="You need to sign in or create an account to sign up for this event."
      />
      
      <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
        <Button 
          className={className} 
          onClick={handleButtonClick}
          disabled={isDisabled}
          style={getButtonStyle()}
        >
          {getButtonContent()}
        </Button>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Sign Up</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to sign up for this event: {event.name}?
            </AlertDialogDescription>
          </AlertDialogHeader>
          {error && (
            <div className="text-sm text-red-500 bg-red-50 dark:bg-red-950 p-3 rounded-md">
              {error}
            </div>
          )}
          <AlertDialogFooter className="gap-2">
            <AlertDialogCancel disabled={isLoading}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleSignup} disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing up...
                </>
              ) : event.form_type === "google" ? (
                <>
                  <FileText className="mr-2 h-4 w-4" />
                  Confirm Sign Up and Fill Form
                </>
              ) : (
                "Confirm Sign Up"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
