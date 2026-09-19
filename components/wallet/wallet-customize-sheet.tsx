"use client"

import { useEffect, useState } from "react"
import { useAuth } from "@clerk/nextjs"
import { toast } from "sonner"
import { Check, Loader2, Settings2 } from "lucide-react"
import { WALLET_THEMES, WalletCardData } from "@/lib/wallet-themes"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "@/components/ui/sheet"

interface WalletCustomizeSheetProps {
  isOpen: boolean
  onClose: () => void
  data: WalletCardData
  onSaved: (patch: Partial<WalletCardData>) => void
}

// The gold admin card is assigned server-side from the member's real role -
// it was never a user choice and isn't offered here.
const PICKABLE_THEMES = Object.values(WALLET_THEMES).filter((t) => !t.isAdmin)

export function WalletCustomizeSheet({ isOpen, onClose, data, onSaved }: WalletCustomizeSheetProps) {
  const { getToken } = useAuth()
  const [name, setName] = useState(data.fullName)
  const [themeId, setThemeId] = useState(data.themeId)
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setName(data.fullName)
      setThemeId(data.themeId)
    }
  }, [isOpen, data.fullName, data.themeId])

  const handleSave = async () => {
    setIsSaving(true)
    try {
      const token = await getToken()
      const res = await fetch("/api/wallet/me", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          custom_name: name.trim() || undefined,
          theme_id: themeId,
        }),
      })

      if (!res.ok) {
        const err = await res.json().catch(() => ({}))
        throw new Error(err.detail || "تعذر حفظ التخصيص")
      }

      onSaved({ fullName: name.trim() || data.fullName, themeId })
      toast.success("تم تحديث بطاقتك")
      onClose()
    } catch (err: any) {
      toast.error(err.message || "تعذر حفظ التخصيص، حاول مرة أخرى")
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <SheetContent side="bottom" className="rounded-t-3xl max-w-lg mx-auto" dir="rtl">
        <SheetHeader className="text-right">
          <SheetTitle className="flex items-center gap-2 text-base">
            <Settings2 className="w-4 h-4 text-primary" />
            <span>تخصيص البطاقة</span>
          </SheetTitle>
          <SheetDescription>غيّر الاسم الظاهر على بطاقتك ولونها متى ما تبي</SheetDescription>
        </SheetHeader>

        <div className="px-4 space-y-5">
          <div className="space-y-1.5">
            <Label htmlFor="card-name" className="text-xs font-bold">الاسم على البطاقة</Label>
            <Input
              id="card-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="اكتب اسمك كما تبيه يظهر"
              dir="auto"
              className="h-11 rounded-xl"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-xs font-bold">لون البطاقة</Label>
            <div className="grid grid-cols-2 gap-2.5">
              {PICKABLE_THEMES.map((theme) => {
                const isSelected = themeId === theme.id
                return (
                  <button
                    key={theme.id}
                    type="button"
                    onClick={() => setThemeId(theme.id)}
                    className={`p-3 rounded-2xl border text-right transition-all flex items-center gap-2.5 ${
                      isSelected
                        ? "border-primary bg-primary/10 ring-2 ring-primary/20"
                        : "border-border hover:bg-accent bg-card"
                    }`}
                  >
                    <div
                      className="w-6 h-6 rounded-full border shadow-xs flex items-center justify-center shrink-0"
                      style={{ backgroundColor: theme.swatchHex }}
                    >
                      {isSelected && <Check className="w-3 h-3 text-white stroke-[3]" />}
                    </div>
                    <span className="text-xs font-semibold text-foreground">{theme.nameAr}</span>
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        <SheetFooter>
          <Button
            onClick={handleSave}
            disabled={isSaving || !name.trim()}
            className="w-full h-11 rounded-xl font-bold gap-2"
          >
            {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
            <span>حفظ التغييرات</span>
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
