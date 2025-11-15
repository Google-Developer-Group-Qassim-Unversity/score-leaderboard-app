"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date()
      let targetYear = now.getFullYear()
      let targetDate = new Date(targetYear, 11, 2, 0, 0, 0)

      if (now > targetDate) {
        targetYear += 1
        targetDate = new Date(targetYear, 11, 2, 0, 0, 0)
      }

      const difference = targetDate.getTime() - now.getTime()

      if (difference > 0) {
        return {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        }
      }
      return { days: 0, hours: 0, minutes: 0, seconds: 0 }
    }

    setTimeLeft(calculateTimeLeft())

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="mb-8 text-center">
      <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8 max-w-2xl mx-auto">
        <p className="text-2xl font-bold text-slate-800 mb-6" style={{ direction: 'rtl' }}>
          العد التنازلي بدأ ⏳
        </p>
        <p className="text-2xl font-bold text-slate-800 mb-6" style={{ direction: 'rtl' }}>
          تحديث النقاط متوقف مؤقتًا… ترقبوا الحدث الكبير!
        </p>
        
        <div className="flex justify-center gap-4 mb-6" dir="ltr">
          <div className="bg-white rounded-xl shadow-md p-4 min-w-[80px]">
            <div className="text-3xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
              {timeLeft.days}
            </div>
            <div className="text-xs text-slate-600 font-semibold mt-1">DAYS</div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-4 min-w-[80px]">
            <div className="text-3xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
              {timeLeft.hours}
            </div>
            <div className="text-xs text-slate-600 font-semibold mt-1">HOURS</div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-4 min-w-[80px]">
            <div className="text-3xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
              {timeLeft.minutes}
            </div>
            <div className="text-xs text-slate-600 font-semibold mt-1">MINUTES</div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-4 min-w-[80px]">
            <div className="text-3xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
              {timeLeft.seconds}
            </div>
            <div className="text-xs text-slate-600 font-semibold mt-1">SECONDS</div>
          </div>
        </div>

        <p className="text-xl font-bold text-slate-700 mb-6" style={{ direction: 'rtl' }}>
          انتظرونا
        </p>
      </div>
    </div>
  )
}
