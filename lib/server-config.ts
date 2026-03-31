import 'server-only'

function assertEnv<T extends string>(key: string, value: T | undefined): T {
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`)
  }
  return value
}

export const serverConfig = {
  clerkSecretKey: assertEnv('CLERK_SECRET_KEY', process.env.CLERK_SECRET_KEY),
} as const