import { useQuery } from '@tanstack/react-query'
import { eventsQuery, openEventsQuery } from '@/lib/queries'

export function useEvents(semester?: number | null) {
  return useQuery(eventsQuery(semester))
}

export function useOpenEvents() {
  return useQuery(openEventsQuery())
}
