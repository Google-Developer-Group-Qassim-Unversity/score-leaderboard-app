import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CalendarX } from "lucide-react"
import { getLanguageFromCookies, getTranslation } from "@/lib/server-i18n"
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty"

export default async function EventNotFound() {
  const lang = await getLanguageFromCookies()
  const t = (key: string) => getTranslation(lang, key)

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <Empty className="max-w-md mx-auto border-2">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <CalendarX />
          </EmptyMedia>
          <EmptyTitle>{t("notFound.eventTitle")}</EmptyTitle>
          <EmptyDescription>
            {t("notFound.eventDescription")}
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Link href="/events">
            <Button className="w-full">
              {t("notFound.backToEvents")}
            </Button>
          </Link>
        </EmptyContent>
      </Empty>
    </div>
  )
}
