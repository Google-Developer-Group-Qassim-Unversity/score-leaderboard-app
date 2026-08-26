
// Environment varibles exporting and assertions
function assertEnv<T extends string>(key: string, value: T | undefined): T {
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`)
  }
  return value
}

export const config = {
  backendApiUrl: assertEnv('NEXT_PUBLIC_BACKEND_API_URL', process.env.NEXT_PUBLIC_BACKEND_API_URL),
  thisAppUrl: assertEnv('NEXT_PUBLIC_THIS_APP_URL', process.env.NEXT_PUBLIC_THIS_APP_URL),
} as const
console.log(`API backend url '${config.backendApiUrl}'`)