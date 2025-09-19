'use client';

import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import '../lib/i18n'; // Initialize i18n

export default function I18nProvider({ children }: { children: React.ReactNode }) {
  const [isReady, setIsReady] = useState(false);
  const { i18n } = useTranslation();

  useEffect(() => {
    const initializeLanguage = async () => {
      // Get stored language or default to Arabic
      const storedLang = localStorage.getItem('i18nextLng') || 'ar';
      
      // Set the language immediately if it's different from current
      if (i18n.language !== storedLang) {
        await i18n.changeLanguage(storedLang);
      }
      
      // Set RTL direction for Arabic
      const setDirection = (lng: string) => {
        document.documentElement.dir = lng === 'ar' ? 'rtl' : 'ltr';
        document.documentElement.lang = lng;
      };

      setDirection(i18n.language);
      
      // Listen for language changes
      const handleLanguageChange = (lng: string) => {
        setDirection(lng);
      };

      i18n.on('languageChanged', handleLanguageChange);
      
      // Mark as ready after language is set
      setIsReady(true);
      
      return () => {
        i18n.off('languageChanged', handleLanguageChange);
      };
    };

    initializeLanguage();
  }, [i18n]);

  // Show a minimal loader during initialization
  if (!isReady) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 border-3 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}