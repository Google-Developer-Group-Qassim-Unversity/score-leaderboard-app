import { cookies } from 'next/headers';
import type { Language } from './translations';

/**
 * Get the current language from cookies (server-side)
 * Default language is 'ar' (Arabic)
 */
export async function getLanguageFromCookies(): Promise<Language> {
  const cookieStore = await cookies();
  const langCookie = cookieStore.get('lang');
  const lang = langCookie?.value;

  if (lang === 'en' || lang === 'ar') {
    return lang;
  }

  return 'ar'; // Default to Arabic
}

// The pure helpers live in lib/i18n so client components can use them too.
// Re-exported here so existing server-side imports keep working.
export { getTranslation, getTranslations, isRTL } from './i18n';
export type { Language } from './translations';
