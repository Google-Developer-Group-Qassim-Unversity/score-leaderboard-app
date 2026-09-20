"use client"

import { useSearchParams, useParams } from "next/navigation"
import { useEffect, useState, Suspense } from "react"
import { useAuth } from "@clerk/nextjs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, CheckCircle2, XCircle, AlertTriangle, Clock } from "lucide-react"
import { AuthRequiredDialog } from "@/components/auth-required-dialog"
import { useMarkAttendance } from "@/hooks/mutations/use-mark-attendance"
import { ApiError } from "@/lib/api/errors"
import { useTranslation } from 'react-i18next'
import '@/lib/i18n-client'

type AttendanceStatus = "loading" | "success" | "error" | "missing-token" | "broken-token" | "auth-required" | "idle"

interface AttendanceResult {
  status: AttendanceStatus
  message: string
}

/** A JWT is three dot-separated segments. Attendance links are long enough that
 *  sharing them by hand truncates them, and a truncated token is unreadable -
 *  catch it here so the student is told the link is incomplete, rather than
 *  being shown a decoder error from the backend. */
function isWellFormedToken(token: string): boolean {
  const parts = token.split(".")
  return parts.length === 3 && parts.every((part) => part.length > 0)
}

/** Backend error codes -> translation keys. The backend's `detail` is English
 *  and written for logs, so it is never rendered. */
const ERROR_MESSAGE_KEYS: Record<string, string> = {
  token_malformed: "attendance.brokenLink",
  token_absent: "attendance.noToken",
  token_expired: "attendance.expired",
  token_not_yet_valid: "attendance.notYetValid",
  token_event_mismatch: "attendance.wrongEvent",
  token_bad_signature: "attendance.tokenProblem",
  token_bad_algorithm: "attendance.tokenProblem",
  token_missing_claim: "attendance.tokenProblem",
  token_invalid: "attendance.tokenProblem",
}

function AttendanceContent() {
  const { t, i18n } = useTranslation()
  const rtl = i18n.language === 'ar'
  const searchParams = useSearchParams()
  const params = useParams()
  const { isSignedIn, isLoaded } = useAuth()
  const [showAuthDialog, setShowAuthDialog] = useState(false)
  const [hasSubmitted, setHasSubmitted] = useState(false)

  const token = searchParams.get("token")
  const eventId = Number(params.id)

  const markAttendance = useMarkAttendance()

  const getResultFromMutation = (): AttendanceResult => {
    if (!token) {
      return { status: "missing-token", message: t('attendance.noToken') }
    }

    if (!isWellFormedToken(token)) {
      return { status: "broken-token", message: t('attendance.brokenLink') }
    }

    if (!isLoaded) {
      return { status: "loading", message: t('attendance.markingAttendance') }
    }

    if (!isSignedIn) {
      return { status: "auth-required", message: t('attendance.pleaseSignIn') }
    }

    if (markAttendance.isPending) {
      return { status: "loading", message: t('attendance.markingAttendance') }
    }

    if (markAttendance.isSuccess) {
      return { status: "success", message: t('attendance.success') }
    }

    if (markAttendance.isError) {
      const error = markAttendance.error
      let message = t('attendance.connectionError')
      
      if (error instanceof ApiError) {
        const messageKey = error.code ? ERROR_MESSAGE_KEYS[error.code] : undefined
        if (messageKey) {
          message = t(messageKey)
        } else if (error.status === 400) {
          message = t('attendance.notEligible')
        } else if (error.status === 404) {
          message = t('attendance.expired')
        } else if (error.status === 500) {
          message = t('attendance.serverError')
        } else {
          message = t('attendance.connectionError')
        }
      } else if (error instanceof Error) {
        message = t('attendance.connectionError')
      }

      return { status: "error", message }
    }

    return { status: "idle", message: "" }
  }

  useEffect(() => {
    if (!token) return
    if (!isWellFormedToken(token)) return
    if (!isLoaded) return
    if (!isSignedIn) {
      setShowAuthDialog(true)
      return
    }
    if (hasSubmitted) return

    setHasSubmitted(true)
    markAttendance.mutate({ eventId, attendanceToken: token })
  }, [token, eventId, isSignedIn, isLoaded, hasSubmitted, markAttendance.mutate])

  const result = getResultFromMutation()

  const getIcon = () => {
    switch (result.status) {
      case "loading":
        return <Loader2 className="h-16 w-16 animate-spin text-primary" />
      case "success":
        return <CheckCircle2 className="h-16 w-16 text-green-500" />
      case "error":
        return <XCircle className="h-16 w-16 text-red-500" />
      case "missing-token":
      case "broken-token":
        return <AlertTriangle className="h-16 w-16 text-amber-500" />
      case "auth-required":
        return <Clock className="h-16 w-16 text-blue-500" />
      default:
        return null
    }
  }

  const getTitle = () => {
    switch (result.status) {
      case "loading":
        return t('attendance.processing')
      case "success":
        return t('attendance.confirmed')
      case "error":
        return t('attendance.failed')
      case "missing-token":
        return t('attendance.invalidLink')
      case "broken-token":
        return t('attendance.brokenLinkTitle')
      case "auth-required":
        return t('attendance.signInRequired')
      default:
        return ""
    }
  }

  const getCardStyle = () => {
    switch (result.status) {
      case "success":
        return "border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950"
      case "error":
        return "border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950"
      case "missing-token":
      case "broken-token":
        return "border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-950"
      case "auth-required":
        return "border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950"
      default:
        return ""
    }
  }

  return (
    <>
      <AuthRequiredDialog
        open={showAuthDialog}
        onOpenChange={setShowAuthDialog}
        title={t('attendance.dialog.title')}
        description={t('attendance.dialog.description')}
      />
      
      <div dir={rtl ? 'rtl' : 'ltr'} className="container mx-auto px-4 py-8 max-w-md">
        <Card className={`text-center ${getCardStyle()}`}>
          <CardHeader className="pb-2">
            <div className="flex justify-center mb-4">
              {getIcon()}
            </div>
            <CardTitle className="text-2xl">{getTitle()}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground" dir="auto">
              {result.message}
            </p>
          </CardContent>
        </Card>
      </div>
    </>
  )
}

function SuspenseFallback() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-md">
      <Card className="text-center">
        <CardHeader className="pb-2">
          <div className="flex justify-center mb-4">
            <Loader2 className="h-16 w-16 animate-spin text-primary" />
          </div>
          <CardTitle className="text-2xl">Processing...</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Marking attendance...</p>
        </CardContent>
      </Card>
    </div>
  )
}

export default function AttendancePage() {
  return (
    <Suspense fallback={<SuspenseFallback />}>
      <AttendanceContent />
    </Suspense>
  )
}
