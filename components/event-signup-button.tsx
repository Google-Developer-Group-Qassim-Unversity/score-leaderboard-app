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
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { AuthRequiredDialog } from "@/components/auth-required-dialog"
import { Loader2, CheckCircle2 } from "lucide-react"
import type { ApiOpenEventItem } from "@/lib/api-types"

interface EventSignupButtonProps {
  event: ApiOpenEventItem
  className?: string
}

const API_BASE_URL = process.env.NEXT_PUBLIC_DEV_HOST || process.env.NEXT_PUBLIC_HOST || "http://178.128.205.239:8000"

export function EventSignupButton({ event, className }: EventSignupButtonProps) {
  const { isSignedIn, isLoaded } = useUser()
  const { getToken } = useAuth()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [showAuthDialog, setShowAuthDialog] = useState(false)
  const [hasSubmitted, setHasSubmitted] = useState(false)
  const [isCheckingStatus, setIsCheckingStatus] = useState(false)

  useEffect(() => {
    async function checkStatus() {
      if (isSignedIn && isLoaded) {
        setIsCheckingStatus(true)
        try {
          const token = await getToken()
          if (token) {
            const submitted = await checkSubmissionStatus(event.form_id, token)
            setHasSubmitted(submitted)
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
    } else {
      setIsOpen(true)
    }
  }

  const handleSignup = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const token = await getToken()
      
      const response = await fetch(`${API_BASE_URL}/submissions/${event.form_id}`, {
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
      setHasSubmitted(true)
      setIsOpen(false)

      // Handle based on form type
      if (event.form_type === "google" && event.google_responders_url) {
        // Redirect to Google Form - no toast since they still need to fill it
        router.push(`/events/${event.id}/form?formUrl=${encodeURIComponent(event.google_responders_url)}`)
      } else {
        // Show success toast for non-google forms
        toast.success(`Successfully signed up for ${event.name}!`)
        // Refresh the page to update any other UI
        router.refresh()
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setIsLoading(false)
    }
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
          disabled={!isLoaded || isCheckingStatus || hasSubmitted}
          variant={hasSubmitted ? "default" : "default"}
          style={hasSubmitted ? {
            backgroundColor: 'rgb(34, 197, 94)',
            color: 'white',
          } : undefined}
        >
          {hasSubmitted && <CheckCircle2 className="mr-2 h-4 w-4" />}
          {hasSubmitted ? "Signed Up" : "Sign Up"}
        </Button>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Sign Up</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to sign up for this event: {event.name}?
              {event.form_type === "google" && (
                <span className="block mt-2 text-amber-600 dark:text-amber-400">
                  Note: You will be redirected to fill out a Google Form after confirmation.
                </span>
              )}
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
