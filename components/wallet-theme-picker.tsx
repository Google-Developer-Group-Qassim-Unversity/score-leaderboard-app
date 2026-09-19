'use client'

import * as React from 'react'
import { useUser, useAuth } from '@clerk/nextjs'
import { toast } from 'sonner'
import { Check, Loader2, Palette } from 'lucide-react'
import { WALLET_THEMES, DEFAULT_THEME_ID } from '@/lib/wallet-themes'
import { useTranslation } from 'react-i18next'
import '@/lib/i18n-client'

// The gold admin card is assigned server-side from the member's real role -
// it was never a user choice and isn't offered here.
const PICKABLE_THEMES = Object.values(WALLET_THEMES).filter((t) => !t.isAdmin)

export function WalletThemePicker() {
  const { user, isLoaded } = useUser()
  const { getToken } = useAuth()
  const { t } = useTranslation()

  const [themeId, setThemeId] = React.useState<string | null>(null)
  const [isLoading, setIsLoading] = React.useState(true)
  const [savingId, setSavingId] = React.useState<string | null>(null)

  React.useEffect(() => {
    if (!isLoaded || !user) return

    const load = async () => {
      try {
        const token = await getToken()
        const res = await fetch('/api/wallet/me', {
          headers: { ...(token ? { Authorization: `Bearer ${token}` } : {}) },
        })
        if (!res.ok) return

        const data = await res.json()
        const prof = data.profile || {}
        if (prof.theme_id) {
          setThemeId(prof.theme_id)
        } else {
          const gender = (user.publicMetadata as Record<string, unknown>)?.gender
          setThemeId(gender === 'Female' ? 'gdg-red' : DEFAULT_THEME_ID)
        }
      } catch (err) {
        console.error('Failed to load card theme:', err)
      } finally {
        setIsLoading(false)
      }
    }

    load()
  }, [isLoaded, user, getToken])

  const handleSelect = async (id: string) => {
    if (id === themeId || savingId) return
    const previous = themeId
    setThemeId(id)
    setSavingId(id)

    try {
      const token = await getToken()
      const res = await fetch('/api/wallet/me', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ theme_id: id }),
      })

      if (!res.ok) {
        const err = await res.json().catch(() => ({}))
        throw new Error(err.detail || t('walletTheme.error'))
      }

      toast.success(t('walletTheme.success'))
    } catch (err: any) {
      setThemeId(previous)
      toast.error(err.message || t('walletTheme.error'))
    } finally {
      setSavingId(null)
    }
  }

  if (!isLoaded || isLoading) {
    return (
      <div className="flex items-center justify-center p-6">
        <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
      </div>
    )
  }

  return (
    <div className="space-y-3 p-4" dir="rtl">
      <label className="text-sm font-medium flex items-center gap-1.5">
        <Palette className="h-4 w-4 text-muted-foreground" />
        {t('walletTheme.label')}
      </label>
      <div className="grid grid-cols-2 gap-2.5">
        {PICKABLE_THEMES.map((theme) => {
          const isSelected = themeId === theme.id
          const isSaving = savingId === theme.id
          return (
            <button
              key={theme.id}
              type="button"
              onClick={() => handleSelect(theme.id)}
              disabled={!!savingId}
              className={`p-3 rounded-2xl border text-right transition-all flex items-center gap-2.5 ${
                isSelected
                  ? 'border-primary bg-primary/10 ring-2 ring-primary/20'
                  : 'border-border hover:bg-accent bg-card'
              }`}
            >
              <div
                className="w-6 h-6 rounded-full border shadow-xs flex items-center justify-center shrink-0"
                style={{ backgroundColor: theme.swatchHex }}
              >
                {isSaving ? (
                  <Loader2 className="w-3 h-3 text-white animate-spin" />
                ) : (
                  isSelected && <Check className="w-3 h-3 text-white stroke-[3]" />
                )}
              </div>
              <span className="text-xs font-semibold text-foreground">{theme.nameAr}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
