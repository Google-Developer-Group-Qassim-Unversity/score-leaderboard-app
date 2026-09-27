'use client';

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Wallet, QrCode, Smartphone, MoveRight } from "lucide-react"
import { WalletCard } from "@/components/wallet/wallet-card"
import { PLACEHOLDER_WALLET_CARD } from "@/lib/wallet-themes"
import { useWalletCard } from "@/hooks/use-wallet-card"
import { useTranslation } from 'react-i18next'
import '@/lib/i18n-client'

const features = [
  { icon: Wallet, key: 'wallet.section.feature.card' },
  { icon: QrCode, key: 'wallet.section.feature.checkin' },
  { icon: Smartphone, key: 'wallet.section.feature.walletApp' },
] as const

export function WalletSection() {
  const { t } = useTranslation();
  const { cardData } = useWalletCard();
  const previewCard = cardData ?? PLACEHOLDER_WALLET_CARD

  return (
    <section className="container mx-auto px-4 py-12">
      <Card className="bg-linear-to-br from-blue-50 via-white to-white rounded-2xl shadow-lg border border-blue-100 overflow-hidden">
        <CardContent className="p-6 sm:p-10 flex flex-col md:flex-row items-center gap-8 md:gap-12">
          <div className="flex-1 space-y-5 text-center md:text-start">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center shadow-md shrink-0">
                <Wallet className="h-5 w-5 text-white" />
              </div>
              <Badge className="bg-amber-100 text-amber-800 border-amber-200 font-bold">
                {t('wallet.section.badge')}
              </Badge>
            </div>

            <h2 className="text-2xl md:text-4xl font-bold tracking-tight text-slate-900">
              {t('wallet.section.title')}
            </h2>
            <p className="text-slate-600 text-sm md:text-base max-w-lg mx-auto md:mx-0">
              {t('wallet.section.subtitle')}
            </p>

            <ul className="space-y-2 text-sm text-slate-700 max-w-md mx-auto md:mx-0">
              {features.map(({ icon: Icon, key }) => (
                <li key={key} className="flex items-center gap-2 justify-center md:justify-start">
                  <Icon className="h-4 w-4 text-blue-500 shrink-0" />
                  <span>{t(key)}</span>
                </li>
              ))}
            </ul>

            <div className="pt-2">
              <Link href="/wallet">
                <Button size="lg" className="rounded-xl font-bold shadow-md gap-2 cursor-pointer">
                  {t(cardData ? 'wallet.section.cta.view' : 'wallet.section.cta')}
                  <MoveRight className="h-4 w-4 ms-1.5 rtl:rotate-180" />
                </Button>
              </Link>
            </div>
          </div>

          <div className="shrink-0">
            <div className="w-[160px] sm:w-[200px] rotate-3 hover:rotate-0 transition-transform duration-300">
              <WalletCard data={previewCard} />
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  )
}
