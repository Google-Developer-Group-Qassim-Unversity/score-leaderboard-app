"use client"

import { useState } from "react"
import { useTranslation } from "react-i18next"
import "../../lib/i18n-client"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import {
  CalendarDays,
  ClipboardList,
  Users,
  Trophy,
  TrendingUp,
  Bot,
  Shield,
  Lightbulb,
  Gamepad2,
  BarChart3,
  Activity,
} from "lucide-react"
import type { Language } from "@/lib/translations"

// ============================================================
// HARDCODED DATA (real events = events with composite/department actions)
// ============================================================

const OVERVIEW = {
  totalRealEvents: 147,
  totalEvents: 240,
  totalAttendanceForRealEvents: 5256,
  totalUniqueMembers: 3095,
  avgPerEvent: 35.8,
}

// Action name categories with friendly labels
interface ActionBreakdown {
  name: string
  nameAr: string
  count: number
}

const ACTION_BREAKDOWN: ActionBreakdown[] = [
  { name: "Online Course", nameAr: "دورة أونلاين", count: 25 },
  { name: "Educational Content", nameAr: "محتوى تعليمي", count: 23 },
  { name: "Tech Meetup / Monthly Session", nameAr: "لقاء / جلسة شهرية", count: 22 },
  { name: "Bootcamp (On-site)", nameAr: "معسكر حضورياً", count: 16 },
  { name: "On-site Course", nameAr: "دورة حضورية", count: 16 },
  { name: "Telegram Competition", nameAr: "مسابقة تيليجرام", count: 15 },
  { name: "Internal Competition", nameAr: "مسابقة داخلية", count: 10 },
  { name: "Online Bootcamp", nameAr: "معسكر أونلاين", count: 6 },
  { name: "Twitter Space", nameAr: "مساحة تويتر", count: 5 },
  { name: "External Competition", nameAr: "مسابقة خارجية", count: 2 },
  { name: "Introductory Event / Booth", nameAr: "فعالية تعريفية", count: 2 },
  { name: "Host a Tournament", nameAr: "تنظيم بطولة", count: 2 },
  { name: "Massive Event (300+)", nameAr: "حدث ضخم", count: 1 },
  { name: "Published Project", nameAr: "نشر مشروع", count: 1 },
]

const SEMESTERS: Record<string, {
  realEvents: number
  totalEvents: number
  attendance: number
  uniqueMembers: number
  avgPerEvent: number
}> = {
  "471": {
    realEvents: 64,
    totalEvents: 121,
    attendance: 3291,
    uniqueMembers: 1109,
    avgPerEvent: 51.4,
  },
  "472": {
    realEvents: 83,
    totalEvents: 119,
    attendance: 1965,
    uniqueMembers: 735,
    avgPerEvent: 23.7,
  },
}

interface DeptData {
  id: number
  name: string
  nameAr: string
  icon: React.ElementType
  color: string
  semesters: Record<string, {
    realEvents: number
    totalEvents: number
    attendance: number
    actions: { name: string; nameAr: string; count: number }[]
  }>
}

const DEPARTMENTS: DeptData[] = [
  {
    id: 6, name: "Robotics", nameAr: "الروبوتات", icon: Bot, color: "blue",
    semesters: {
      "471": { realEvents: 9, totalEvents: 12, attendance: 399, actions: [
        { name: "Bootcamp (On-site)", nameAr: "معسكر حضورياً", count: 3 },
        { name: "Tech Meetup", nameAr: "لقاء / جلسة شهرية", count: 2 },
        { name: "Internal Competition", nameAr: "مسابقة داخلية", count: 1 },
        { name: "On-site Course", nameAr: "دورة حضورية", count: 1 },
        { name: "Online Course", nameAr: "دورة أونلاين", count: 1 },
        { name: "Educational Content", nameAr: "محتوى تعليمي", count: 1 },
      ]},
      "472": { realEvents: 34, totalEvents: 52, attendance: 811, actions: [
        { name: "Online Course", nameAr: "دورة أونلاين", count: 6 },
        { name: "Educational Content", nameAr: "محتوى تعليمي", count: 6 },
        { name: "Telegram Competition", nameAr: "مسابقة تيليجرام", count: 4 },
        { name: "Bootcamp (On-site)", nameAr: "معسكر حضورياً", count: 3 },
        { name: "Twitter Space", nameAr: "مساحة تويتر", count: 3 },
        { name: "Online Bootcamp", nameAr: "معسكر أونلاين", count: 2 },
        { name: "External Competition", nameAr: "مسابقة خارجية", count: 2 },
        { name: "Tech Meetup", nameAr: "لقاء / جلسة شهرية", count: 1 },
        { name: "Internal Competition", nameAr: "مسابقة داخلية", count: 1 },
        { name: "On-site Course", nameAr: "دورة حضورية", count: 1 },
        { name: "Published Project", nameAr: "نشر مشروع", count: 1 },
      ]},
    },
  },
  {
    id: 7, name: "Cybersecurity", nameAr: "الأمن السيبراني", icon: Shield, color: "rose",
    semesters: {
      "471": { realEvents: 14, totalEvents: 18, attendance: 558, actions: [
        { name: "Internal Competition", nameAr: "مسابقة داخلية", count: 3 },
        { name: "On-site Course", nameAr: "دورة حضورية", count: 3 },
        { name: "Bootcamp (On-site)", nameAr: "معسكر حضورياً", count: 2 },
        { name: "Tech Meetup", nameAr: "لقاء / جلسة شهرية", count: 2 },
        { name: "Educational Content", nameAr: "محتوى تعليمي", count: 2 },
        { name: "Online Bootcamp", nameAr: "معسكر أونلاين", count: 1 },
        { name: "Online Course", nameAr: "دورة أونلاين", count: 1 },
      ]},
      "472": { realEvents: 8, totalEvents: 10, attendance: 334, actions: [
        { name: "Online Course", nameAr: "دورة أونلاين", count: 3 },
        { name: "Tech Meetup", nameAr: "لقاء / جلسة شهرية", count: 2 },
        { name: "Educational Content", nameAr: "محتوى تعليمي", count: 2 },
        { name: "Introductory Event / Booth", nameAr: "فعالية تعريفية", count: 1 },
      ]},
    },
  },
  {
    id: 8, name: "AI & Data", nameAr: "الذكاء الاصطناعي", icon: Lightbulb, color: "purple",
    semesters: {
      "471": { realEvents: 25, totalEvents: 31, attendance: 1509, actions: [
        { name: "Bootcamp (On-site)", nameAr: "معسكر حضورياً", count: 5 },
        { name: "On-site Course", nameAr: "دورة حضورية", count: 4 },
        { name: "Online Course", nameAr: "دورة أونلاين", count: 4 },
        { name: "Tech Meetup", nameAr: "لقاء / جلسة شهرية", count: 3 },
        { name: "Educational Content", nameAr: "محتوى تعليمي", count: 3 },
        { name: "Online Bootcamp", nameAr: "معسكر أونلاين", count: 1 },
        { name: "Internal Competition", nameAr: "مسابقة داخلية", count: 1 },
        { name: "Telegram Competition", nameAr: "مسابقة تيليجرام", count: 1 },
      ]},
      "472": { realEvents: 25, totalEvents: 38, attendance: 599, actions: [
        { name: "Educational Content", nameAr: "محتوى تعليمي", count: 5 },
        { name: "Online Course", nameAr: "دورة أونلاين", count: 4 },
        { name: "Telegram Competition", nameAr: "مسابقة تيليجرام", count: 4 },
        { name: "Bootcamp (On-site)", nameAr: "معسكر حضورياً", count: 2 },
        { name: "Online Bootcamp", nameAr: "معسكر أونلاين", count: 2 },
        { name: "Twitter Space", nameAr: "مساحة تويتر", count: 2 },
        { name: "Internal Competition", nameAr: "مسابقة داخلية", count: 2 },
        { name: "Tech Meetup", nameAr: "لقاء / جلسة شهرية", count: 1 },
        { name: "On-site Course", nameAr: "دورة حضورية", count: 1 },
        { name: "External Competition", nameAr: "مسابقة خارجية", count: 1 },
      ]},
    },
  },
  {
    id: 9, name: "Business", nameAr: "ريادة الأعمال", icon: Trophy, color: "amber",
    semesters: {
      "471": { realEvents: 17, totalEvents: 22, attendance: 334, actions: [
        { name: "Telegram Competition", nameAr: "مسابقة تيليجرام", count: 5 },
        { name: "Educational Content", nameAr: "محتوى تعليمي", count: 4 },
        { name: "Tech Meetup", nameAr: "لقاء / جلسة شهرية", count: 3 },
        { name: "Online Course", nameAr: "دورة أونلاين", count: 3 },
        { name: "Internal Competition", nameAr: "مسابقة داخلية", count: 1 },
        { name: "On-site Course", nameAr: "دورة حضورية", count: 1 },
      ]},
      "472": { realEvents: 10, totalEvents: 17, attendance: 200, actions: [
        { name: "Online Course", nameAr: "دورة أونلاين", count: 3 },
        { name: "Tech Meetup", nameAr: "لقاء / جلسة شهرية", count: 2 },
        { name: "On-site Course", nameAr: "دورة حضورية", count: 2 },
        { name: "Bootcamp (On-site)", nameAr: "معسكر حضورياً", count: 1 },
        { name: "Introductory Event / Booth", nameAr: "فعالية تعريفية", count: 1 },
        { name: "Telegram Competition", nameAr: "مسابقة تيليجرام", count: 1 },
      ]},
    },
  },
  {
    id: 10, name: "Esports", nameAr: "الرياضات الإلكترونية", icon: Gamepad2, color: "emerald",
    semesters: {
      "471": { realEvents: 0, totalEvents: 0, attendance: 0, actions: [] },
      "472": { realEvents: 5, totalEvents: 9, attendance: 8, actions: [
        { name: "Host a Tournament", nameAr: "تنظيم بطولة", count: 2 },
        { name: "Massive Event (300+)", nameAr: "حدث ضخم", count: 1 },
        { name: "Tech Meetup", nameAr: "لقاء / جلسة شهرية", count: 1 },
        { name: "Internal Competition", nameAr: "مسابقة داخلية", count: 1 },
      ]},
    },
  },
]

const TOP_MEMBERS_ALL = [
  { name: "جوري صالح الفضل", attendance: 61 },
  { name: "Mira Fahad Alfuraih", attendance: 43 },
  { name: "رند صالح الثنيان", attendance: 43 },
  { name: "أروى فهد علي المرزوق", attendance: 43 },
  { name: "حنين هيثم القصير", attendance: 42 },
]

const TOP_MEMBERS_472 = [
  { name: "وجدان فالح حمود الحربي", attendance: 21 },
  { name: "يزيد بن حمود لطف", attendance: 20 },
  { name: "رغد تراحيب بعاج الروقي", attendance: 18 },
  { name: "حنين هيثم القصير", attendance: 18 },
  { name: "ريماس حمود المطير", attendance: 17 },
]

// ============================================================
// HELPER COMPONENTS
// ============================================================

function StatCard({
  icon: Icon,
  label,
  value,
  gradient = "from-blue-500 to-indigo-600",
}: {
  icon: React.ElementType
  label: string
  value: number
  gradient?: string
}) {
  return (
    <Card className="bg-white border border-slate-200 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
      <CardContent className="p-4 sm:p-6 flex flex-col items-center justify-center text-center">
        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow-lg mb-3`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
        <p className="text-3xl sm:text-4xl font-black text-slate-900">{value.toLocaleString()}</p>
        <p className="text-sm font-semibold text-slate-700 mt-1">{label}</p>
      </CardContent>
    </Card>
  )
}

function SectionHeader({ icon: Icon, title, subtitle, gradient = "from-blue-600 to-purple-600" }: { icon: React.ElementType; title: string; subtitle?: string; gradient?: string }) {
  return (
    <div className="text-center mb-8 space-y-3">
      <div className={`inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br ${gradient} rounded-2xl shadow-lg`}>
        <Icon className="w-7 h-7 text-white" />
      </div>
      <h2 className="text-2xl md:text-4xl font-black tracking-tight text-slate-900">{title}</h2>
      {subtitle && <p className="text-slate-600 text-sm md:text-base max-w-2xl mx-auto">{subtitle}</p>}
    </div>
  )
}

function ActionBar({ item, maxCount, isAr }: { item: ActionBreakdown; maxCount: number; isAr: boolean }) {
  const percentage = maxCount > 0 ? (item.count / maxCount) * 100 : 0
  const label = isAr ? item.nameAr : item.name
  return (
    <div className="flex items-center gap-2 sm:gap-3 group">
      <div className="w-32 sm:w-44 text-xs sm:text-sm text-slate-700 font-medium shrink-0" dir={isAr ? "rtl" : "ltr"}>
        {label}
      </div>
      <div className="flex-1 flex items-center gap-2">
        <div className="flex-1 bg-slate-100 rounded-full h-7 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full transition-all duration-500"
            style={{ width: `${Math.max(percentage, 4)}%` }}
          />
        </div>
        <span className="text-sm font-bold text-slate-700 w-7 text-right shrink-0">{item.count}</span>
      </div>
    </div>
  )
}

// Color utility
const colorMap: Record<string, string> = {
  blue: "from-blue-500 to-blue-600",
  rose: "from-rose-500 to-rose-600",
  purple: "from-purple-500 to-purple-600",
  amber: "from-amber-500 to-amber-600",
  emerald: "from-emerald-500 to-emerald-600",
}

const borderColorMap: Record<string, string> = {
  blue: "border-blue-200",
  rose: "border-rose-200",
  purple: "border-purple-200",
  amber: "border-amber-200",
  emerald: "border-emerald-200",
}

const actionColorMap: Record<string, string> = {
  "Online Course": "from-blue-400 to-blue-500",
  "Tech Meetup / Monthly Session": "from-violet-400 to-violet-500",
  "Tech Meetup": "from-violet-400 to-violet-500",
  "Bootcamp (On-site)": "from-emerald-400 to-emerald-500",
  "On-site Course": "from-teal-400 to-teal-500",
  "Online Bootcamp": "from-cyan-400 to-cyan-500",
  "Internal Competition": "from-orange-400 to-orange-500",
  "Twitter Space": "from-purple-400 to-purple-500",
  "Telegram Competition": "from-yellow-400 to-yellow-500",
  "Massive Event (300+)": "from-red-400 to-red-500",
  "Educational Content": "from-indigo-400 to-indigo-500",
  "External Competition": "from-pink-400 to-pink-500",
  "Introductory Event / Booth": "from-amber-400 to-amber-500",
  "Host a Tournament": "from-lime-400 to-lime-500",
  "Published Project": "from-sky-400 to-sky-500",
}

function DeptActionTag({ name, nameAr, count, isAr }: { name: string; nameAr: string; count: number; isAr: boolean }) {
  const gradient = actionColorMap[name] || "from-slate-400 to-slate-500"
  return (
    <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs text-white bg-gradient-to-r ${gradient} shadow-sm`}>
      <span>{isAr ? nameAr : name}</span>
      <span className="font-bold">×{count}</span>
    </div>
  )
}

// ============================================================
// MAIN COMPONENT
// ============================================================

interface StatsPageContentProps {
  lang: Language
}

export function StatsPageContent({ lang }: StatsPageContentProps) {
  const { t } = useTranslation()
  const isAr = lang === "ar"
  const [deptSemester, setDeptSemester] = useState<"471" | "472">("472")

  return (
    <div className="max-w-7xl mx-auto">
      {/* ===== HERO SECTION ===== */}
      <section className="relative px-4 pt-16 sm:pt-24 pb-12 text-center overflow-visible">
        <div className="absolute inset-0 -top-24 overflow-hidden pointer-events-none" style={{ maskImage: "linear-gradient(to bottom, black 60%, transparent 100%)", WebkitMaskImage: "linear-gradient(to bottom, black 60%, transparent 100%)" }}>
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-400/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob" />
          <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-purple-400/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000" />
          <div className="absolute bottom-0 left-1/2 w-[500px] h-[500px] bg-indigo-400/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000" />
        </div>

        <div className="relative z-10">
          <div className="flex flex-col items-center gap-4 mb-6">
            <div className="relative">
              <Image src="/gdg.png" alt="GDG Logo" width={80} height={80} className="rounded-2xl shadow-lg" unoptimized />
              <div className="absolute -top-2 -right-2 bg-gradient-to-r from-amber-400 to-orange-500 text-white text-xs font-bold px-2 py-0.5 rounded-full shadow-md">
                ✦
              </div>
            </div>
          </div>

          <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-4">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
              {t("stats.title")}
            </span>
          </h1>
          <p className="text-slate-600 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            {t("stats.subtitle")}
          </p>
        </div>
      </section>

      {/* ===== BIG NUMBERS ===== */}
      <section className="container mx-auto px-4 pb-12">
        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-6">
          <StatCard
            icon={CalendarDays}
            label={t("stats.overview.totalEvents")}
            value={OVERVIEW.totalRealEvents}
            gradient="from-blue-500 to-indigo-600"
          />
          <StatCard
            icon={ClipboardList}
            label={t("stats.overview.attendanceEntries")}
            value={OVERVIEW.totalAttendanceForRealEvents}
            gradient="from-purple-500 to-indigo-600"
          />
          <StatCard
            icon={Users}
            label={t("stats.overview.totalMembers")}
            value={OVERVIEW.totalUniqueMembers}
            gradient="from-emerald-500 to-teal-600"
          />
          <StatCard
            icon={Activity}
            label={isAr ? "متوسط الحضور لكل فعالية" : "Avg Attendance / Event"}
            value={OVERVIEW.avgPerEvent}
            gradient="from-amber-500 to-orange-600"
          />
        </div>
      </section>

      {/* ===== EVENTS BY ACTION TYPE ===== */}
      <section className="container mx-auto px-4 pb-12">
        <SectionHeader icon={BarChart3} title={t("stats.types.title")} />

        <Card className="bg-white border border-slate-200 rounded-2xl shadow-lg max-w-2xl mx-auto">
          <CardContent className="p-4 sm:p-6">
            <h3 className="text-lg font-bold text-slate-900 mb-5 flex items-center gap-2">
              <Activity className="h-5 w-5 text-blue-500" />
              {t("stats.all")}
            </h3>
            <div className="space-y-2.5">
              {ACTION_BREAKDOWN.map(item => (
                <ActionBar key={item.name} item={item} maxCount={ACTION_BREAKDOWN[0].count} isAr={isAr} />
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      {/* ===== SEMESTER COMPARISON ===== */}
      <section className="container mx-auto px-4 pb-12">
        <SectionHeader icon={TrendingUp} title={t("stats.semester.comparison")} gradient="from-emerald-500 to-teal-600" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-6">
          {/* Semester 471 */}
          <Card className="relative overflow-hidden rounded-2xl shadow-lg">
            <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 via-transparent to-transparent pointer-events-none" />
            <CardContent className="relative p-5 sm:p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow">
                  <CalendarDays className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">{t("stats.sem471")}</h3>
                  <p className="text-xs text-slate-500">Aug 2025 – Jan 2026</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-2xl font-black text-slate-900">{SEMESTERS["471"].realEvents}</p>
                  <p className="text-xs text-slate-500">{t("stats.semester.events")}</p>
                </div>
                <div>
                  <p className="text-2xl font-black text-slate-900">{SEMESTERS["471"].attendance.toLocaleString()}</p>
                  <p className="text-xs text-slate-500">{t("stats.semester.attendance")}</p>
                </div>
                <div>
                  <p className="text-2xl font-black text-slate-900">{SEMESTERS["471"].uniqueMembers.toLocaleString()}</p>
                  <p className="text-xs text-slate-500">{t("stats.semester.members")}</p>
                </div>
                <div>
                  <p className="text-2xl font-black text-slate-900">{SEMESTERS["471"].avgPerEvent}</p>
                  <p className="text-xs text-slate-500">{t("stats.attendanceLabel")}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Semester 472 */}
          <Card className="relative overflow-hidden rounded-2xl shadow-lg">
            <div className="absolute inset-0 bg-gradient-to-b from-purple-500/10 via-transparent to-transparent pointer-events-none" />
            <CardContent className="relative p-5 sm:p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center shadow">
                  <CalendarDays className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">{t("stats.sem472")}</h3>
                  <p className="text-xs text-slate-500">Jan 2026 – May 2026</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-2xl font-black text-slate-900">{SEMESTERS["472"].realEvents}</p>
                  <p className="text-xs text-slate-500">{t("stats.semester.events")}</p>
                </div>
                <div>
                  <p className="text-2xl font-black text-slate-900">{SEMESTERS["472"].attendance.toLocaleString()}</p>
                  <p className="text-xs text-slate-500">{t("stats.semester.attendance")}</p>
                </div>
                <div>
                  <p className="text-2xl font-black text-slate-900">{SEMESTERS["472"].uniqueMembers.toLocaleString()}</p>
                  <p className="text-xs text-slate-500">{t("stats.semester.members")}</p>
                </div>
                <div>
                  <p className="text-2xl font-black text-slate-900">{SEMESTERS["472"].avgPerEvent}</p>
                  <p className="text-xs text-slate-500">{t("stats.attendanceLabel")}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* ===== DEPARTMENT PERFORMANCE ===== */}
      <section className="container mx-auto px-4 pb-12">
        <SectionHeader icon={BarChart3} title={t("stats.department.title")} gradient="from-amber-500 to-orange-600" />

        <div className="flex justify-center mb-6">
          <div className="inline-flex bg-slate-100 rounded-xl p-1 gap-1">
            {(["472", "471"] as const).map(sem => (
              <button
                key={sem}
                onClick={() => setDeptSemester(sem)}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 cursor-pointer ${
                  deptSemester === sem
                    ? "bg-white shadow-md text-slate-900"
                    : "text-slate-500 hover:text-slate-700"
                }`}
              >
                {t(`stats.sem${sem}`)}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {DEPARTMENTS.map(dept => {
            const data = dept.semesters[deptSemester]
            const Icon = dept.icon
            if (!data || data.realEvents === 0) return (
              <Card key={dept.id} className="relative overflow-hidden rounded-2xl shadow-lg opacity-50">
                <CardContent className="relative p-5">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${colorMap[dept.color] || "from-slate-400 to-slate-500"} flex items-center justify-center shadow`}>
                      <Icon className="h-5 w-5 text-white" />
                    </div>
                    <h3 className="text-base font-bold text-slate-900">{isAr ? dept.nameAr : dept.name}</h3>
                  </div>
                  <p className="text-sm text-slate-400 text-center py-6">{isAr ? "لا توجد فعاليات في هذا الفصل" : "No events this semester"}</p>
                </CardContent>
              </Card>
            )
            return (
              <Card key={dept.id} className={`relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 ${borderColorMap[dept.color] || "border-slate-200"}`}>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-transparent pointer-events-none" style={{ "--dept-color": dept.color } as React.CSSProperties} />
                <CardContent className="relative p-5">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${colorMap[dept.color] || "from-slate-400 to-slate-500"} flex items-center justify-center shadow`}>
                      <Icon className="h-5 w-5 text-white" />
                    </div>
                    <h3 className="text-base font-bold text-slate-900">
                      {isAr ? dept.nameAr : dept.name}
                    </h3>
                  </div>
                  <div className="grid grid-cols-2 gap-3 mb-3">
                    <div>
                      <p className="text-xl font-black text-slate-900">{data.realEvents}</p>
                      <p className="text-xs text-slate-500">{t("stats.department.actualEvents")}</p>
                    </div>
                    <div>
                      <p className="text-xl font-black text-slate-900">{data.attendance.toLocaleString()}</p>
                      <p className="text-xs text-slate-500">{t("stats.department.attendance")}</p>
                    </div>
                  </div>
                  {data.actions.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-3 border-t border-slate-100">
                      {data.actions.map(a => (
                        <DeptActionTag key={a.name} name={a.name} nameAr={a.nameAr} count={a.count} isAr={isAr} />
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            )
          })}
        </div>
      </section>

      {/* ===== TOP MEMBERS ===== */}
      <section className="container mx-auto px-4 pb-16">
        <SectionHeader icon={Trophy} title={t("stats.highlights.topMembers")} gradient="from-amber-500 to-yellow-500" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {/* All Time Top Members */}
          <Card className="relative overflow-hidden rounded-2xl shadow-lg">
            <div className="absolute inset-0 bg-gradient-to-b from-amber-500/10 via-transparent to-transparent pointer-events-none" />
            <CardContent className="relative p-5 sm:p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-yellow-500 flex items-center justify-center shadow">
                  <Trophy className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">2025–2026</h3>
                  <p className="text-xs text-slate-500">{isAr ? "جميع الفصول" : "All semesters"}</p>
                </div>
              </div>
              <div className="space-y-3">
                {TOP_MEMBERS_ALL.map((member, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${
                      i === 0 ? "bg-gradient-to-br from-yellow-400 to-amber-500 text-white" :
                      i === 1 ? "bg-gradient-to-br from-slate-300 to-slate-400 text-white" :
                      i === 2 ? "bg-gradient-to-br from-amber-600 to-amber-700 text-white" :
                      "bg-slate-100 text-slate-600"
                    }`}>
                      {i + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-slate-900 truncate">{member.name}</p>
                    </div>
                    <div className="text-sm font-bold text-slate-700 shrink-0">
                      {member.attendance} <span className="text-xs font-normal text-slate-500">{t("stats.highlights.attendance")}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Semester 472 Top Members */}
          <Card className="relative overflow-hidden rounded-2xl shadow-lg">
            <div className="absolute inset-0 bg-gradient-to-b from-purple-500/10 via-transparent to-transparent pointer-events-none" />
            <CardContent className="relative p-5 sm:p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center shadow">
                  <Trophy className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">{t("stats.sem472")}</h3>
                </div>
              </div>
              <div className="space-y-3">
                {TOP_MEMBERS_472.map((member, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${
                      i === 0 ? "bg-gradient-to-br from-yellow-400 to-amber-500 text-white" :
                      i === 1 ? "bg-gradient-to-br from-slate-300 to-slate-400 text-white" :
                      i === 2 ? "bg-gradient-to-br from-amber-600 to-amber-700 text-white" :
                      "bg-slate-100 text-slate-600"
                    }`}>
                      {i + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-slate-900 truncate">{member.name}</p>
                    </div>
                    <div className="text-sm font-bold text-slate-700 shrink-0">
                      {member.attendance} <span className="text-xs font-normal text-slate-500">{t("stats.highlights.attendance")}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}