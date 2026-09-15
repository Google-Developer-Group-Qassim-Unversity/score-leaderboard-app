"use client"

import { useQuery } from "@tanstack/react-query"
import type { PublicClubStructure } from "@/lib/api/types"
import { config } from "@/lib/config"

export function useClubStructure(initialData?: PublicClubStructure) {
  return useQuery<PublicClubStructure>({
    queryKey: ["public-club-structure"],
    initialData,
    queryFn: async ({ signal }) => {
      const response = await fetch(`${config.backendApiUrl}/club-structure/public`, {
        cache: "no-store",
        signal,
      })
      if (!response.ok) throw new Error("Club structure unavailable")
      return response.json()
    },
    staleTime: 0,
    refetchInterval: 15_000,
    refetchIntervalInBackground: false,
    refetchOnWindowFocus: "always",
    refetchOnReconnect: "always",
  })
}
