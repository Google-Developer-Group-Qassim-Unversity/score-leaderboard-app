"use client"

import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { Loader2, XCircle } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { buttonVariants } from "@/components/ui/button"
import { useCancelSignup } from "@/hooks/mutations/use-cancel-signup"
import { cn } from "@/lib/utils"
import { ApiError } from "@/lib/api/errors"
import type { ApiOpenEventItem } from "@/lib/api/types"
import { useTranslation } from "react-i18next"
import "@/lib/i18n-client"

/**
 * Total length of the three-dots wave, in ms (keep it <= 200).
 * The bottom dot grows, then the middle one grows while the bottom shrinks,
 * then the top one. On touch devices the menu opens once it finishes.
 */
export const DOTS_ANIMATION_MS = 200

interface EventRegistrationMenuProps {
  event: ApiOpenEventItem
}

export function EventRegistrationMenu({ event }: EventRegistrationMenuProps) {
  const { t } = useTranslation()
  const router = useRouter()
  const cancelMutation = useCancelSignup()

  const [menuOpen, setMenuOpen] = useState(false)
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [playing, setPlaying] = useState(false)
  const openTimer = useRef<ReturnType<typeof setTimeout>>(undefined)

  useEffect(() => () => clearTimeout(openTimer.current), [])

  // Mouse opens immediately (the wave already played on hover). Touch/pen plays
  // the wave first and opens the menu when it ends.
  const handlePointerDown = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (e.pointerType === "mouse") return
    e.preventDefault() // skip Radix's immediate toggle
    if (menuOpen) {
      setMenuOpen(false)
      return
    }
    clearTimeout(openTimer.current)
    setPlaying(true)
    openTimer.current = setTimeout(() => {
      setPlaying(false)
      setMenuOpen(true)
    }, DOTS_ANIMATION_MS)
  }

  const cancelErrorMessage = (err: unknown) =>
    err instanceof ApiError && err.code === "registration_closed"
      ? t("eventSignup.registrationClosed")
      : t("eventSignup.cancelFailed")

  const handleCancel = async () => {
    try {
      await cancelMutation.mutateAsync(event.form_id)
      setConfirmOpen(false)
      toast.success(`${t("eventSignup.cancelSuccessToast")} ${event.name}`)
      router.refresh()
    } catch (err) {
      toast.error(cancelErrorMessage(err))
    }
  }

  return (
    <>
      {/* modal={false} so the dialog opened from the menu doesn't leave the body locked */}
      <DropdownMenu open={menuOpen} onOpenChange={setMenuOpen} modal={false}>
        <DropdownMenuTrigger
          aria-label={t("eventSignup.moreOptions")}
          onPointerDown={handlePointerDown}
          data-playing={playing || undefined}
          style={{ "--dots-duration": `${DOTS_ANIMATION_MS}ms` } as React.CSSProperties}
          className={cn(
            buttonVariants({ variant: "ghost", size: "icon" }),
            "dots-wave cursor-pointer flex-col gap-[3px]"
          )}
        >
          <span className="size-1 rounded-full bg-current" />
          <span className="size-1 rounded-full bg-current" />
          <span className="size-1 rounded-full bg-current" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem variant="destructive" onSelect={() => setConfirmOpen(true)}>
            <XCircle />
            {t("eventSignup.cancelRegistration")}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t("eventSignup.cancelConfirmTitle")}</AlertDialogTitle>
            <AlertDialogDescription>
              {t("eventSignup.cancelConfirmDescription")} {event.name}
            </AlertDialogDescription>
          </AlertDialogHeader>
          {cancelMutation.error && (
            <div className="text-sm text-red-500 bg-red-50 dark:bg-red-950 p-3 rounded-md">
              {cancelErrorMessage(cancelMutation.error)}
            </div>
          )}
          <AlertDialogFooter className="gap-2">
            <AlertDialogCancel disabled={cancelMutation.isPending}>
              {t("eventSignup.keepRegistration")}
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={(e) => {
                e.preventDefault() // keep the dialog open until the request finishes
                handleCancel()
              }}
              disabled={cancelMutation.isPending}
              className={buttonVariants({ variant: "destructive" })}
            >
              {cancelMutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {t("eventSignup.cancelling")}
                </>
              ) : (
                t("eventSignup.confirmCancel")
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
