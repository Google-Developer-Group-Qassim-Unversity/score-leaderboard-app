"use client"

import { useTranslation } from 'react-i18next';
import '@/lib/i18n-client';

export function CountdownTimer() {
  const { t } = useTranslation();

  return (
    <div className="mb-8 text-center px-4">
      <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-4 sm:p-8 max-w-2xl mx-auto">
        <p className="text-xl sm:text-2xl font-bold text-slate-800 mb-4 sm:mb-6" style={{ direction: 'rtl' }}>
          {t('countdown.comingSoon')}
        </p>
        <p className="text-lg sm:text-2xl font-bold text-slate-800 mb-4 sm:mb-6 leading-relaxed" style={{ direction: 'rtl' }}>
          {t('countdown.subtitle')}
        </p>
        
        <div className="flex justify-center gap-2 sm:gap-4 mb-4 sm:mb-6" dir="ltr">
          <div className="bg-white rounded-lg sm:rounded-xl shadow-md p-2 sm:p-4 min-w-[60px] sm:min-w-[80px] flex-1 max-w-[80px] sm:max-w-none">
            <div className="text-xl sm:text-3xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
              ?
            </div>
            <div className="text-xs font-semibold mt-1 text-slate-600">{t('countdown.days')}</div>
          </div>
          <div className="bg-white rounded-lg sm:rounded-xl shadow-md p-2 sm:p-4 min-w-[60px] sm:min-w-[80px] flex-1 max-w-[80px] sm:max-w-none">
            <div className="text-xl sm:text-3xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
              ?
            </div>
            <div className="text-xs font-semibold mt-1 text-slate-600">{t('countdown.hours')}</div>
          </div>
          <div className="bg-white rounded-lg sm:rounded-xl shadow-md p-2 sm:p-4 min-w-[60px] sm:min-w-[80px] flex-1 max-w-[80px] sm:max-w-none">
            <div className="text-xl sm:text-3xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
              ?
            </div>
            <div className="text-xs font-semibold mt-1 text-slate-600">{t('countdown.minutes')}</div>
          </div>
          <div className="bg-white rounded-lg sm:rounded-xl shadow-md p-2 sm:p-4 min-w-[60px] sm:min-w-[80px] flex-1 max-w-[80px] sm:max-w-none">
            <div className="text-xl sm:text-3xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
              ?
            </div>
            <div className="text-xs font-semibold mt-1 text-slate-600">{t('countdown.seconds')}</div>
          </div>
        </div>

        <p className="text-lg sm:text-xl font-bold text-slate-700 mb-4 sm:mb-6" style={{ direction: 'rtl' }}>
          {t('countdown.stayTuned')}
        </p>
      </div>
    </div>
  )
}
