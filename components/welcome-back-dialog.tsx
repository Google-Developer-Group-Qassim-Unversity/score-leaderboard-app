'use client'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { useTranslation } from 'react-i18next'
import '@/lib/i18n-client'

interface WelcomeBackDialogProps {
  open: boolean
  points: number | null
  onContinue: () => void
}

export function WelcomeBackDialog({ open, points, onContinue }: WelcomeBackDialogProps) {
  const { t, i18n } = useTranslation()
  const isRTL = i18n.language === 'ar'

  return (
    <Dialog open={open} onOpenChange={(next) => !next && onContinue()}>
      <DialogContent dir={isRTL ? 'rtl' : 'ltr'}>
        <DialogHeader>
          <DialogTitle>{t('welcomeBack.title')}</DialogTitle>
          <DialogDescription>
            {points !== null
              ? t('welcomeBack.descriptionWithPoints', { points })
              : t('welcomeBack.descriptionNoPoints')}
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button type="button" onClick={onContinue} className="w-full">
            {t('welcomeBack.continue')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
