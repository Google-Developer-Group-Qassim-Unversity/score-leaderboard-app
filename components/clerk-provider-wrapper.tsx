'use client';

import { ClerkProvider } from '@clerk/nextjs';
import { arSA } from '@clerk/localizations';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import '@/lib/i18n-client';

export function ClerkProviderWrapper({ children }: { children: React.ReactNode }) {
  const { i18n } = useTranslation();
  const [localization, setLocalization] = useState(i18n.language === 'ar' ? arSA : undefined);

  useEffect(() => {
    // Update Clerk localization when language changes
    setLocalization(i18n.language === 'ar' ? arSA : undefined);
  }, [i18n.language]);

  return (
    <ClerkProvider localization={localization}>
      {children}
    </ClerkProvider>
  );
}
