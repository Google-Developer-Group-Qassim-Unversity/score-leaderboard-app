"use client"

import { useEffect, useState } from "react"
import { useUser, useAuth } from "@clerk/nextjs"
import { WalletCardData, DEFAULT_THEME_ID } from "@/lib/wallet-themes"

interface UseWalletCardResult {
  isLoaded: boolean
  isSignedIn: boolean | undefined
  isRegistered: boolean
  isLoadingCard: boolean
  cardData: WalletCardData | null
  setCardData: React.Dispatch<React.SetStateAction<WalletCardData | null>>
  getToken: ReturnType<typeof useAuth>["getToken"]
}

// Shared between the /wallet page and the home page marketing section, so a
// signed-in, registered member sees their own card in both places instead of
// a generic preview.
export function useWalletCard(): UseWalletCardResult {
  const { isSignedIn, isLoaded, user } = useUser()
  const { getToken } = useAuth()
  const [cardData, setCardData] = useState<WalletCardData | null>(null)
  const [isRegistered, setIsRegistered] = useState(true)
  const [isLoadingCard, setIsLoadingCard] = useState(true)

  useEffect(() => {
    if (!isLoaded) return

    if (!isSignedIn) {
      setIsLoadingCard(false)
      return
    }

    const loadProfile = async () => {
      try {
        const token = await getToken()
        const res = await fetch("/api/wallet/me", {
          headers: {
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
        })

        if (!res.ok) {
          setIsLoadingCard(false)
          return
        }

        const data = await res.json()
        const prof = data.profile || {}

        if (!prof.uuid) {
          // Signed in, but no member row yet (shouldn't normally happen -
          // middleware routes anyone unfinished to /onboarding first).
          setIsRegistered(false)
          setIsLoadingCard(false)
          return
        }

        setCardData({
          uuid: prof.uuid,
          fullName: prof.custom_name || data.name || user?.fullName || "",
          nameLanguage: "ar",
          isAdmin: Boolean(data.is_admin),
          uniId: data.uni_id,
          countryCode: "+966",
          email: data.email || user?.primaryEmailAddress?.emailAddress || "",
          phone: data.phone_number || "",
          themeId: prof.theme_id || DEFAULT_THEME_ID,
          userStatus: prof.user_status || "student",
          educationLevel: prof.education_level || "university",
          institution: prof.institution || "",
          major: prof.major || "",
          studyYearOrLevel: prof.study_year_or_level || "",
          bio: prof.bio || "",
          socialLinks: prof.social_links || [],
          visibility: prof.visibility,
        })
      } catch (err) {
        console.error("Failed to load wallet card:", err)
      } finally {
        setIsLoadingCard(false)
      }
    }

    loadProfile()
  }, [isLoaded, isSignedIn, getToken, user])

  return { isLoaded, isSignedIn, isRegistered, isLoadingCard, cardData, setCardData, getToken }
}
