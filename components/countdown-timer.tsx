"use client"

import Image from "next/image"
import { useTranslation } from 'react-i18next'
import '@/lib/i18n-client'

const GRADUATION_URL = "https://graduation.gdg-q.com/"

export function CountdownTimer() {
  const { t, i18n } = useTranslation()
  const isArabic = i18n.language === 'ar'

  return (
    <div className="mb-8 px-4 py-8 sm:py-12">
      <div className="relative mx-auto max-w-2xl overflow-hidden rounded-3xl bg-[#12326f] p-6 text-white shadow-2xl sm:p-10" style={{ boxShadow: '0 25px 80px -12px rgba(0,151,167,0.35), 0 18px 50px -8px rgba(66,133,244,0.3), 0 8px 24px -4px rgba(13,43,107,0.4), inset 0 1px 0 rgba(255,255,255,0.12)' }}>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#4285f4]/20 via-transparent to-[#0097a7]/25" />
        <Image
          src="/supergraphic.png"
          alt=""
          fill
          aria-hidden
          className="pointer-events-none object-cover object-left-bottom opacity-35 mix-blend-screen"
          sizes="(max-width: 640px) 100vw, 672px"
        />

        <div className="relative z-10 flex min-h-64 flex-col items-center justify-between gap-8 text-center">
          <div className="space-y-3">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-lg font-bold text-white backdrop-blur-sm">
              ⏳
            </span>
            <p className="font-heading text-2xl font-black leading-tight sm:text-3xl" dir="rtl">
              {isArabic ? (
                <>تحديث النقاط متوقف مؤقتًا…</>
              ) : (
                <>Points update is temporarily paused...</>
              )}
            </p>
            <p className="font-heading text-2xl font-black leading-tight sm:text-3xl" dir="rtl">
              {isArabic ? (
                <>
                  ترقبوا{' '}
                  <a
                    href={GRADUATION_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline decoration-[#8edce6] decoration-2 underline-offset-4 transition-colors hover:text-[#8edce6]"
                  >
                    الحدث الكبير
                  </a>
                  !
                </>
              ) : (
                <>
                  Stay tuned for{' '}
                  <a
                    href={GRADUATION_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline decoration-[#8edce6] decoration-2 underline-offset-4 transition-colors hover:text-[#8edce6]"
                  >
                    the big event
                  </a>
                  !
                </>
              )}
            </p>
          </div>

          <div className="grid w-full grid-cols-4 gap-3" dir="ltr">
            {[
              { value: '??', label: t('countdown.days') },
              { value: '??', label: t('countdown.hours') },
              { value: '??', label: t('countdown.minutes') },
              { value: '??', label: t('countdown.seconds') },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border border-white/15 bg-white/10 p-3 text-center backdrop-blur sm:p-4"
              >
                <div className="font-heading text-2xl font-black tabular-nums sm:text-4xl">
                  {item.value}
                </div>
                <div className="mt-1 text-[10px] font-bold text-white/72 sm:text-xs">
                  {item.label}
                </div>
              </div>
            ))}
          </div>

          <p className="font-heading text-base font-bold sm:text-lg" dir="rtl">
            {t('countdown.stayTuned')}
          </p>
        </div>
      </div>
    </div>
  )
}