"use client"

import * as React from 'react'
import { useAuth } from '@clerk/nextjs'
import { toast } from 'sonner'
import { Download, ChevronDown, Loader2 } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { config } from '@/lib/config'
import { useTranslation } from 'react-i18next'
import '@/lib/i18n-client'

interface CertificateDownloadButtonProps {
  eventId: number
  disabled?: boolean
}

async function downloadCertificate(
  token: string | null,
  eventId: number,
  lang: string,
  format: string,
) {
  const url = `${config.backendApiUrl}/emails/download-certificate/${eventId}?lang=${lang}&format=${format}`

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  })

  if (!response.ok) {
    throw new Error(`Download failed: ${response.status}`)
  }

  const blob = await response.blob()
  const contentDisposition = response.headers.get('Content-Disposition')
  let filename = `certificate-${eventId}.${format}`
  if (contentDisposition) {
    const match = contentDisposition.match(/filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/)
    if (match?.[1]) {
      filename = match[1].replace(/['"]/g, '')
    }
  }

  const blobUrl = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = blobUrl
  a.download = filename
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(blobUrl)
}

export function CertificateDownloadButton({ eventId, disabled }: CertificateDownloadButtonProps) {
  const { getToken } = useAuth()
  const { t } = useTranslation()
  const [isDownloading, setIsDownloading] = React.useState(false)
  const [popoverOpen, setPopoverOpen] = React.useState(false)
  const [lang, setLang] = React.useState('ar')
  const [format, setFormat] = React.useState('pdf')

  const handleQuickDownload = async () => {
    setIsDownloading(true)
    try {
      const token = await getToken()
      await downloadCertificate(token, eventId, 'ar', 'pdf')
      toast.success(t('profile.downloadSuccess'))
    } catch {
      toast.error(t('profile.downloadError'))
    } finally {
      setIsDownloading(false)
    }
  }

  const handleCustomDownload = async () => {
    setIsDownloading(true)
    try {
      const token = await getToken()
      await downloadCertificate(token, eventId, lang, format)
      toast.success(t('profile.downloadSuccess'))
      setPopoverOpen(false)
    } catch {
      toast.error(t('profile.downloadError'))
    } finally {
      setIsDownloading(false)
    }
  }

  const isDisabled = disabled || isDownloading

  const button = (
    <div className="inline-flex rounded-md bg-primary text-primary-foreground shadow-xs">
      <button
        type="button"
        onClick={handleQuickDownload}
        disabled={isDisabled}
        className="inline-flex items-center gap-1.5 px-3 h-8 text-xs font-medium rounded-s-md hover:bg-primary/90 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {isDownloading ? (
          <Loader2 className="h-3.5 w-3.5 animate-spin" />
        ) : (
          <Download className="h-3.5 w-3.5" />
        )}
        {t('profile.downloadCertificate')}
      </button>
      <div className="w-px bg-primary-foreground/20 self-stretch my-1.5" />
      <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
        <PopoverTrigger
          disabled={isDisabled}
          className="inline-flex items-center justify-center px-2 h-8 rounded-e-md hover:bg-primary/90 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronDown className="h-3.5 w-3.5" />
        </PopoverTrigger>
        <PopoverContent className="w-52 p-3" align="end" side="bottom">
          <div className="space-y-2.5">
            <p className="text-xs font-medium">{t('profile.customize')}</p>

            <div className="space-y-1">
              <label className="text-[11px] text-muted-foreground">{t('profile.language')}</label>
              <Select value={lang} onValueChange={setLang}>
                <SelectTrigger className="w-full h-8 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ar">{t('profile.langArabic')}</SelectItem>
                  <SelectItem value="en">{t('profile.langEnglish')}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1">
              <label className="text-[11px] text-muted-foreground">{t('profile.format')}</label>
              <Select value={format} onValueChange={setFormat}>
                <SelectTrigger className="w-full h-8 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pdf">{t('profile.formatPdf')}</SelectItem>
                  <SelectItem value="png">{t('profile.formatPng')}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <button
              type="button"
              onClick={handleCustomDownload}
              disabled={isDisabled}
              className="w-full inline-flex items-center justify-center gap-1.5 h-8 text-xs font-medium rounded-md bg-primary text-primary-foreground hover:bg-primary/90 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isDownloading ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
              ) : (
                <Download className="h-3.5 w-3.5" />
              )}
              {t('profile.download')}
            </button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )

  if (disabled) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <span className="inline-flex" tabIndex={0}>
              {button}
            </span>
          </TooltipTrigger>
          <TooltipContent>
            {t('profile.certificateDisabledTooltip')}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )
  }

  return button
}
