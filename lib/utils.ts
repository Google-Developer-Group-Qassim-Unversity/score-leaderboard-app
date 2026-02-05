import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Get the full current URL including path and query parameters.
 * This is used to construct auth redirect URLs that preserve user context.
 * Returns empty string on server-side (SSR), full URL on client-side.
 */
export function getFullCurrentUrl(): string {
  if (typeof window === 'undefined') {
    return ''
  }
  return window.location.href
}
