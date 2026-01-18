"use client"

import { useSearchParams } from "next/navigation"
import { Suspense } from "react"
import { Loader2 } from "lucide-react"

function GoogleFormContent() {
  const searchParams = useSearchParams()
  const formUrl = searchParams.get("formUrl")

  if (!formUrl) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-slate-600">No form URL provided</p>
      </div>
    )
  }

  const googleFormUrl = formUrl

  return (
    <div className="w-full h-full">
      <iframe
        src={googleFormUrl}
        width="100%"
        height="100%"
        title="Google Form"
        className="border-0"
      >
        Loading…
      </iframe>
    </div>
  )
}

export default function GoogleFormPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-full">
          <Loader2 className="h-8 w-8 animate-spin text-slate-400" />
        </div>
      }
    >
      <GoogleFormContent />
    </Suspense>
  )
}
