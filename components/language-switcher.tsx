'use client';

import { useTranslation } from 'react-i18next';
import '@/lib/i18n-client';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Globe } from 'lucide-react';
import { useLanguageCookie } from '@/components/language-provider';
import type { Language } from '@/lib/translations';

export function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const { setLanguage } = useLanguageCookie();
  
  const toggleLanguage = () => {
    const newLang: Language = i18n.language === 'en' ? 'ar' : 'en';
    setLanguage(newLang);
  };

  return (
    <div className={`fixed top-20 z-50 ${i18n.language === 'ar' ? 'right-4' : 'left-4'}`}>
      <Button
        onClick={toggleLanguage}
        variant="outline"
        size="sm"
        className="bg-white border-2 border-blue-500 text-blue-600 hover:bg-blue-50 hover:text-blue-700 shadow-xl hover:shadow-2xl transition-all duration-300 font-semibold"
      >
        <Globe className="w-4 h-4 mr-2" />
        <span className="font-medium">
          {i18n.language === 'en' ? 'العربية' : 'English'}
        </span>
      </Button>
    </div>
  );
}