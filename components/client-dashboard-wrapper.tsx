'use client';

import { useEffect } from 'react';
import { I18nextProvider, useTranslation } from 'react-i18next';
import i18n from '../lib/i18n-client';

interface ClientDashboardWrapperProps {
  children: React.ReactNode;
}

function I18nHandler({ children }: { children: React.ReactNode }) {
  const { i18n: i18nInstance } = useTranslation();
  
  useEffect(() => {
    // Set HTML direction based on language
    document.documentElement.dir = i18nInstance.language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = i18nInstance.language;
  }, [i18nInstance.language]);

  return <>{children}</>;
}

export function ClientDashboardWrapper({ children }: ClientDashboardWrapperProps) {
  return (
    <I18nextProvider i18n={i18n}>
      <I18nHandler>
        {children}
      </I18nHandler>
    </I18nextProvider>
  );
}