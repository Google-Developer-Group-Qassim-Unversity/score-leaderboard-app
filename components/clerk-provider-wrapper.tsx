'use client';

import { ClerkProvider } from '@clerk/nextjs';
import { arSA } from '@clerk/localizations';
import { useTranslation } from 'react-i18next';
import '@/lib/i18n-client';

const arSAFixed = {
  ...arSA,
  formFieldInputPlaceholder__confirmDeletionUserAccount: 'حذف الحساب',
  userProfile: {
    ...arSA.userProfile,
    deletePage: {
      ...arSA.userProfile?.deletePage,
      actionDescription: 'اكتب "حذف الحساب" بالأسفل للمتابعة.',
      confirm: 'حذف الحساب',
    },
  },
};

export function ClerkProviderWrapper({ children }: { children: React.ReactNode }) {
  const { i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';

  return (
    <ClerkProvider
      localization={isArabic ? arSAFixed : undefined}
      appearance={{
        cssLayerName: 'clerk',
        elements: {
          avatarBox: 'overflow-hidden',
          userButtonAvatarBox: 'overflow-hidden',
          avatarImage: 'h-full w-full object-cover',
          userButtonPopoverCard: isArabic ? '[direction:rtl] [text-align:right]' : '',
        },
      }}
    >
      {children}
    </ClerkProvider>
  );
}
