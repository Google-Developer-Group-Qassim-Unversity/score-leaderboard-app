'use client';

import { useEffect } from 'react';
import i18n from '@/lib/i18n-client';
import type { Language } from '@/lib/translations';

const LANG_COOKIE = 'lang';
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365; // 1 year

function getCookieValue(name: string): string | undefined {
  if (typeof document === 'undefined') return undefined;
  const match = document.cookie.match(new RegExp('(?:^|;\\s*)' + name + '=([^;]+)'));
  return match ? decodeURIComponent(match[1]) : undefined;
}

function setLanguageCookie(lang: Language) {
  if (typeof document === 'undefined') return;
  document.cookie = `${LANG_COOKIE}=${encodeURIComponent(lang)};path=/;max-age=${COOKIE_MAX_AGE};SameSite=Lax`;
}

function applyLanguage(lang: Language) {
  if (lang === i18n.language) return;
  i18n.changeLanguage(lang);
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const savedLang = getCookieValue(LANG_COOKIE);
    const targetLang: Language = savedLang === 'en' || savedLang === 'ar' ? savedLang : 'ar';
    applyLanguage(targetLang);
  }, []);

  return <>{children}</>;
}

export function useLanguageCookie() {
  return {
    setLanguage: (lang: Language) => {
      setLanguageCookie(lang);
      applyLanguage(lang);
    },
  };
}
