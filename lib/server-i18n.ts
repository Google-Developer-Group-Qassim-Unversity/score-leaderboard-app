import { cookies } from 'next/headers';
import i18n from 'i18next';
import { resources, type Language } from './translations';

// Initialize i18next for server-side use (no react-i18next)
const serverI18n = i18n.createInstance();
serverI18n.init({
  resources,
  lng: 'ar', // default language (Arabic)
  fallbackLng: 'en',
  debug: false,
  interpolation: {
    escapeValue: false,
  },
});

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

/**
 * Get a specific translation by key for a given language
 */
export function getTranslation(lang: Language, key: string): string {
  const translations = resources[lang]?.translation;
  if (!translations) {
    return key;
  }
  
  return (translations as Record<string, string>)[key] ?? key;
}

/**
 * Get all translations for a given language
 */
export function getTranslations(lang: Language): Record<string, string> {
  return (resources[lang]?.translation as Record<string, string>) ?? {};
}

/**
 * Check if language is RTL
 */
export function isRTL(lang: Language): boolean {
  return lang === 'ar';
}

// Re-export Language type for convenience
export type { Language } from './translations';
