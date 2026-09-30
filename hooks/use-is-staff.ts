"use client"

import { useAuth } from "@clerk/nextjs"
import { useQuery } from "@tanstack/react-query"

/** Whether the signed-in person can open the admin app (see app/api/access/me). False while loading. */
export function useIsStaff(): boolean {
  const { isSignedIn } = useAuth()
  const { data } = useQuery({
    queryKey: ["access", "me"],
    queryFn: async () => {
      const res = await fetch("/api/access/me", { cache: "no-store" })
      const body = (await res.json()) as { is_staff?: boolean }
      return body.is_staff === true
    },
    enabled: isSignedIn === true,
    staleTime: 5 * 60 * 1000,
  })
  return data === true
}
