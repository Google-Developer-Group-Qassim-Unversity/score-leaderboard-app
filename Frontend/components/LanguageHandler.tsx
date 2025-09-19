'use client'

import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

export default function LanguageHandler() {
  const { i18n } = useTranslation()

  useEffect(() => {
    const updateLanguageStyles = () => {
      const html = document.documentElement
      const body = document.body
      
      if (i18n.language === 'ar') {
        // Arabic language settings
        html.setAttribute('dir', 'rtl')
        html.setAttribute('lang', 'ar')
        body.classList.add('font-arabic', 'arabic-font')
        body.classList.remove('font-sans')
        
        // Add Arabic font styles via CSS properties
        body.style.setProperty('font-family', 'Tajawal, -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif')
        body.style.setProperty('font-feature-settings', '"liga" 1, "kern" 1')
        body.style.setProperty('text-rendering', 'optimizeLegibility')
        body.style.setProperty('-webkit-font-smoothing', 'antialiased')
        body.style.setProperty('-moz-osx-font-smoothing', 'grayscale')
      } else {
        // English language settings
        html.setAttribute('dir', 'ltr')
        html.setAttribute('lang', 'en')
        body.classList.add('font-sans')
        body.classList.remove('font-arabic', 'arabic-font')
        
        // Reset to default font
        body.style.removeProperty('font-family')
        body.style.removeProperty('font-feature-settings')
        body.style.removeProperty('text-rendering')
        body.style.removeProperty('-webkit-font-smoothing')
        body.style.removeProperty('-moz-osx-font-smoothing')
      }
    }

    // Update on language change
    updateLanguageStyles()
    
    // Listen for language changes
    i18n.on('languageChanged', updateLanguageStyles)
    
    return () => {
      i18n.off('languageChanged', updateLanguageStyles)
    }
  }, [i18n])

  return null
}