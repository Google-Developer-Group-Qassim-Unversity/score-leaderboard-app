'use client';

import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Globe } from 'lucide-react';

export function LanguageSwitcher() {
  const { i18n } = useTranslation();
  
  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'ar' : 'en';
    i18n.changeLanguage(newLang);
    
    // Update HTML direction for Arabic
    document.documentElement.dir = newLang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = newLang;
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