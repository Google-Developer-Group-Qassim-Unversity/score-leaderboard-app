'use client';

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageSquare, ExternalLink } from "lucide-react"
import { HomeSectionHeader } from "@/components/home-sections/home-section-header"
import { useTranslation } from 'react-i18next'
import '@/lib/i18n-client'

export function FeedbackSection() {
  const { t } = useTranslation();

  return (
    <section className="container mx-auto px-4 py-12">
      <HomeSectionHeader
        icon={MessageSquare}
        title={t('feedback.section.title')}
        subtitle={t('feedback.section.subtitle')}
      />

      <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl shadow-lg border border-blue-200 hover:shadow-xl transition-all duration-300 overflow-hidden">
        <CardContent className="p-8 md:p-12">
          <div className="flex flex-col items-center text-center space-y-6">
            <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center shadow-lg">
              <MessageSquare className="h-8 w-8 text-white" />
            </div>
            
            <div className="space-y-3">
              <h3 className="text-2xl md:text-3xl font-bold text-slate-900">
                {t('feedback.card.title')}
              </h3>
              <p className="text-base md:text-lg text-slate-600 max-w-2xl mx-auto">
                {t('feedback.card.description')}
              </p>
            </div>

            <Link 
              href="https://forms.google.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full max-w-md"
            >
              <Button 
                size="lg" 
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-md hover:shadow-lg transition-all duration-200 text-base py-6"
              >
                {t('feedback.card.button')}
                <ExternalLink className="h-4 w-4 ms-2 rtl:rotate-180" />
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </section>
  )
}
