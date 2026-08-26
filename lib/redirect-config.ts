/**
 * Config for the `redirect_url` handoff used when another app (e.g. the
 * admin app) sends a signed-out user here to sign in and expects them back
 * afterward. Validated against an allowlist to prevent open-redirect abuse.
 */

export const ALLOWED_REDIRECT_DOMAINS = [
  // Local development
  'localhost',
  'gdg-q.com',

  // Production domains (without protocol)
  'event.gdg-q.com',

  // Self-hosting staging domains (oracle2 VPS)
  'gdg-q.albrrak773.com',
]

export function isAllowedRedirectUrl(redirectUrl: string): boolean {
  try {
    const url = new URL(redirectUrl)

    return ALLOWED_REDIRECT_DOMAINS.some(domain =>
      url.hostname === domain || url.hostname.endsWith(`.${domain}`)
    )
  } catch {
    return false
  }
}

/** Appends a validated `redirect_url` param onto an internal path, for carrying it across an auth-flow navigation (e.g. sign-up -> onboarding). */
export function withRedirectParam(path: string, redirectUrl: string | null | undefined): string {
  if (!redirectUrl || !isAllowedRedirectUrl(redirectUrl)) return path
  const separator = path.includes('?') ? '&' : '?'
  return `${path}${separator}redirect_url=${encodeURIComponent(redirectUrl)}`
}

/** Reads and validates `redirect_url` from a page's search params. */
export function getValidatedRedirectParam(searchParams: URLSearchParams): string | null {
  const url = searchParams.get('redirect_url')
  if (!url || !isAllowedRedirectUrl(url)) return null
  return url
}
