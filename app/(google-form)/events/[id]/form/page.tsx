"use client"

import { useSearchParams } from "next/navigation"
import { useUser } from "@clerk/nextjs"
import { Suspense } from "react"
import { Loader2 } from "lucide-react"

function GoogleFormContent() {
  const searchParams = useSearchParams()
  const { user, isLoaded } = useUser()
  const formUrl = searchParams.get("formUrl")
  
  const UNI_ID_ENTRY_ID = "1527503581"
  const NAME_ENTRY_ID = "990838002"
  const PERSONAL_EMAIL_ENTRY_ID = "310677703"
  const GENDER_ENTRY_ID = "852465832"

  if (!formUrl) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-slate-600">No form URL provided</p>
      </div>
    )
  }

  if (!isLoaded || !user) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="h-8 w-8 animate-spin text-slate-400" />
      </div>
    )
  }

  // Get user data from Clerk
  const metadata = user.publicMetadata

  const userName = (metadata.fullArabicName as string) || ""
  const userEmail = (metadata.personalEmail as string) || ""
  const uniId = (metadata.uni_id as string) || ""
  const gender = (metadata.gender as string) || ""

  // Map English gender to Arabic
  const genderMap: Record<string, string> = {
    "Male": "طلاب",
    "Female": "طالبات"
  }
  const arabicGender = gender ? genderMap[gender] || "" : ""

  console.log(`User Data for Form Prefill: ${userName}, ${userEmail}, ${uniId}`)
  
  // Build query parameters for form pre-filling
  const url = new URL(formUrl)
  if (uniId) url.searchParams.append(`entry.${UNI_ID_ENTRY_ID}`, uniId)
  if (userName) url.searchParams.append(`entry.${NAME_ENTRY_ID}`, userName)
  if (userEmail) url.searchParams.append(`entry.${PERSONAL_EMAIL_ENTRY_ID}`, userEmail)
  if (arabicGender) url.searchParams.append(`entry.${GENDER_ENTRY_ID}`, arabicGender)
  
  const googleFormUrl = url.toString()

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
