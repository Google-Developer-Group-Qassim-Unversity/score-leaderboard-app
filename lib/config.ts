
// Environment varibles exporting and assertions
function assertEnv<T extends string>(key: string, value: T | undefined): T {
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`)
  }
  return value
}

export const config = {
  backendApiUrl: assertEnv('NEXT_PUBLIC_BACKEND_API_URL', process.env.NEXT_PUBLIC_BACKEND_API_URL),
  authFrontendUrl: assertEnv('NEXT_PUBLIC_AUTH_FRONTEND_URL', process.env.NEXT_PUBLIC_AUTH_FRONTEND_URL),
  thisAppUrl: assertEnv('NEXT_PUBLIC_THIS_APP_URL', process.env.NEXT_PUBLIC_THIS_APP_URL),
  imageSource: assertEnv('NEXT_PUBLIC_IMAGE_SOURCE', process.env.NEXT_PUBLIC_IMAGE_SOURCE),
} as const
console.log(`API backend url '${config.backendApiUrl}'`)


// Semester releated constants
export const CURRENT_SEMESTER = 472
export const AVAILABLE_SEMESTERS = [471, 472] as const
export type Semester = typeof AVAILABLE_SEMESTERS[number]

export const EVENTS_SEMESTER_OPTIONS = [
  { value: null, labelKey: "semester.all" },
  { value: 472, labelKey: "472" },
  { value: 471, labelKey: "471" },
] as const
export type EventsSemesterOption = typeof EVENTS_SEMESTER_OPTIONS[number]