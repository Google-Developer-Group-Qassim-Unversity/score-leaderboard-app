import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { resources } from './translations';

// Initialize i18n with react-i18next for client-side use
i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'ar', // default language (Arabic)
    fallbackLng: 'en',
    debug: false,
    interpolation: {
      escapeValue: false, // react already does escaping
    },
    react: {
      useSuspense: false, // Disable suspense to avoid rendering issues
    }
  });

export default i18n;
