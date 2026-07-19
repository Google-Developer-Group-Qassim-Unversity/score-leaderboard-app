import { cache } from 'react'
import { fetchSemesters } from './api/api'
import type { ApiSemestersResponse } from './api/types'

const FALLBACK_SEMESTERS: ApiSemestersResponse = { current_semester: 475, semesters: [475, 472, 471] }

export const getSemesters = cache(async (): Promise<ApiSemestersResponse> => {
  try {
    return await fetchSemesters()
  } catch (error) {
    console.error('Failed to fetch semesters config, using fallback:', error)
    return FALLBACK_SEMESTERS
  }
})
