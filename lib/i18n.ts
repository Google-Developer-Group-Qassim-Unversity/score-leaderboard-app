/**
 * Pure translation helpers, safe in both server and client components.
 *
 * Kept separate from server-i18n.ts because that module imports `next/headers`
 * at module scope, which makes it unusable from a client component even though
 * these functions touch nothing request-specific. Pass `lang` down as a prop
 * and these work anywhere.
 */

import { resources, type Language } from './translations'

export function getTranslation(lang: Language, key: string): string {
  const translations = resources[lang]?.translation
  if (!translations) {
    return key
  }

  return (translations as Record<string, string>)[key] ?? key
}

export function getTranslations(lang: Language): Record<string, string> {
  return (resources[lang]?.translation as Record<string, string>) ?? {}
}

export function isRTL(lang: Language): boolean {
  return lang === 'ar'
}

export type { Language } from './translations'
