"use client"

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { LogIn, UserPlus } from "lucide-react"
import { useTranslation } from 'react-i18next'
import '@/lib/i18n-client'

interface AuthRequiredDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title?: string
  description?: string
}

export function AuthRequiredDialog({
  open,
  onOpenChange,
  title,
  description,
}: AuthRequiredDialogProps) {
  const { t } = useTranslation()
  const authUrl = process.env.NEXT_PUBLIC_AUTH_URL
  const appUrl = process.env.NEXT_PUBLIC_APP_URL
  const redirectParam = appUrl ? `?redirect_url=${encodeURIComponent(appUrl)}` : ''
  
  const signInUrl = `${authUrl}/sign-in${redirectParam}`
  const signUpUrl = `${authUrl}/sign-up${redirectParam}`

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title || t('authDialog.defaultTitle')}</AlertDialogTitle>
          <AlertDialogDescription>{description || t('authDialog.defaultDescription')}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="gap-2">
          <AlertDialogCancel>{t('auth.cancel')}</AlertDialogCancel>
          <Button asChild variant="outline" className="gap-2">
            <a href={signInUrl}>
              <LogIn className="h-4 w-4" />
              {t('auth.signIn')}
            </a>
          </Button>
          <Button asChild className="gap-2">
            <a href={signUpUrl}>
              <UserPlus className="h-4 w-4" />
              {t('auth.signup')}
            </a>
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
