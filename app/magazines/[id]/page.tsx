import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getMagazineById } from "@/lib/magazines"
import { getLanguageFromCookies, getTranslation, isRTL } from "@/lib/server-i18n"

interface MagazineReaderPageProps {
    params: {
        id: string
    }
}

export default async function MagazineReaderPage({ params }: MagazineReaderPageProps) {
    const { id } = params
    const magazine = getMagazineById(id)

    if (!magazine) {
        notFound()
    }

    const lang = await getLanguageFromCookies()
    const rtl = isRTL(lang)
    const t = (key: string) => getTranslation(lang, key)

    return (
        <div className="relative flex flex-col h-screen bg-slate-900 overflow-hidden">
            {/* Heyzine Embed */}
            <main className="flex-1 relative bg-slate-900 overflow-hidden">

                {/* Loading Indicator behind iframe */}
                <div className="absolute inset-0 flex items-center justify-center -z-10">
                    <div className="flex flex-col items-center gap-3">
                        <Loader2 className="h-8 w-8 text-slate-400 animate-spin" />
                        <p className="text-slate-500 text-sm font-medium">{t('magazines.reader.loading')}</p>
                    </div>
                </div>

                <iframe
                    src={magazine.pdfUrl}
                    className="w-full h-full border-none"
                    title={magazine.title}
                    allowFullScreen
                    allow="clipboard-write"
                    loading="eager"
                />
            </main>
        </div>
    )
}

