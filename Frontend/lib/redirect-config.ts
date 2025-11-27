/**
 * Configuration for allowed redirect domains
 * Used to validate redirect_url parameters to prevent open redirect vulnerabilities
 */

export const ALLOWED_REDIRECT_DOMAINS = [
  // Local development
  'localhost',
  '127.0.0.1',
  
  // Production domains (without protocol)
  'gdg-q.com',
  'event.gdg-q.com',
  'auth.gdg-q.com',
  'g-spark.vercel.app',
  'localhost:3000',
  'localhost:3001'
  
  // Add your local test domains here
  // 'main.test',
  // 'app.main.test',
  
  // Add production domains here when deploying
  // 'yourdomain.com',
  // 'app.yourdomain.com',
]

/**
 * Validates if a redirect URL is from an allowed domain
 * @param redirectUrl - The URL to validate
 * @returns true if the URL is from an allowed domain, false otherwise
 */
export function isAllowedRedirectUrl(redirectUrl: string): boolean {
  try {
    const url = new URL(redirectUrl)
    
    return ALLOWED_REDIRECT_DOMAINS.some(domain => 
      url.hostname === domain || url.hostname.endsWith(`.${domain}`)
    )
  } catch {
    // Invalid URL
    return false
  }
}
