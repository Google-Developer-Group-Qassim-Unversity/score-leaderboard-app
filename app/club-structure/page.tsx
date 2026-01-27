"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, Crown, Shield, Cog, Palette, Bot, Calendar, Megaphone, Lightbulb, Trophy, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useTranslation } from 'react-i18next'
import { useEffect, useState } from 'react'
import '@/lib/i18n-client'

export default function ClubStructurePage() {
  const { t, i18n } = useTranslation()
  const rtl = i18n.language === 'ar'
  const [highlightedCard, setHighlightedCard] = useState<string | null>(null)

  useEffect(() => {
    // Check if there's a hash in the URL
    if (window.location.hash) {
      const hash = window.location.hash.substring(1) // Remove the #
      
      // Small delay to ensure the page has loaded
      setTimeout(() => {
        const element = document.getElementById(hash)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' })
          setHighlightedCard(hash)
          
          // Remove highlight after animation
          setTimeout(() => {
            setHighlightedCard(null)
          }, 600)
        }
      }, 100)
    }
  }, [])
  const clubData = {
    president: {
      title: t('clubStructurePage.presidents'),
      members: [
        "عزام خالد الخضيري",
        "جود سعود الفرم"
      ]
    },
    vicePresident: {
      title: t('clubStructurePage.vicePresident'),
      members: ["أحمد الحربي"]
    },
    departmentsSpecialized: [
      {
        title: t('clubStructurePage.ai'),
        color: "red",
        icon: Lightbulb,
        leader: "نادر علي الحربي",
        vice: "لين عادل العقيل",
        members: [
          "يزن طلال البيضاني",
          "جود عبدالرحمن الحربي",
          "كادي عبدالعزيز العنزي",
          "ديما عبدالله الفريدي"
        ]
      },
      {
        title: t('clubStructurePage.cybersecurity'),
        color: "green",
        icon: Shield,
        leader: "اثير سالم الحربي",
        vice: "عاصم العقيل",
        members: [
          "وتين سليمان السكيتي",
          "جود العنزي",
          "دانه الغريب",
          "احمد صلاح الدين"
        ]
      },
      {
        title: t('clubStructurePage.robotics'),
        color: "yellow",
        icon: Bot,
        leader: "رغد عبدالله العبيد",
        vice: "كيان صالح القفاري",
        members: [
          "رهف علي الحربي",
          "شاهر محمد الحربي",
          "منار عبد العزيز النقيدان",
          "مها عادل المطرفي"
        ]
      },
      {
        title: t('clubStructurePage.entrepreneurship'),
        color: "blue",
        icon: Trophy,
        leader: "ساره مبارك الرشيدي",
        vice: "جنا علي عبدالعزيز الجبعان",
        members: [
          "نسيبة عبدالله الرياعي",
          "فجر الصويان",
          "رغداء صالح الشبل",
          "اينال عبدالعزيز الفهيد"
        ]
      },
      {
        title: t('clubStructurePage.esports'),
        color: "purple",
        icon: Trophy,
        leader: "محمد الزهراني",
        vice: "بشار الحربي",
        members: [
          "يوسف الزهراني",
          "غلا محمد الربيش",
          "شمس عبدالله اللحيدان",
          "عبدالرحمن خالد أسعد",
          "خوله عبدالله السهلي"
        ]
      }
    ],
    departmentsAdministrative: [
      {
        title: t('clubStructurePage.development'),
        color: "blue",
        icon: Cog,
        leader: "عبدالاله عبدالعزيز البراك",
        vice: "إبراهيم سليمان السكيتي",
        members: [
          "علي حسين الصابر"
        ]
      },
      {
        title: t('clubStructurePage.programs'),
        color: "orange",
        icon: Calendar,
        leader: "أروى فهد المرزوق",
        vice: "ريم الرشودي",
        members: [
          "لميس الراشد",
          "بانا التويجري",
          "يارا الصايغ"
        ]
      },
      {
        title: t('clubStructurePage.organization'),
        color: "red",
        icon: Users,
        leader: "ياسمين التويجري",
        vice: "عبدالملك المطيري",
        members: [
          "أحمد الحجيلان",
          "أميرة المطيري",
          "خولة البشري",
          "زياد العنزي"
        ]
      },
      {
        title: t('clubStructurePage.design'),
        color: "green",
        icon: Palette,
        leader: "أمل عبدالله الرحيمي",
        vice: "لينة حماد المهيلب",
        members: [
          "أسماء حامد المطيري",
          "ديالى محمد العمرو",
          "بتول صالح الخليفة",
          "أمل يوسف الدخيّل"
        ]
      },
      {
        title: t('clubStructurePage.media'),
        color: "blue",
        icon: Megaphone,
        leader: "كادي عبدالله السبيعي",
        vice: "",
        members: [
          "جود عبدالرحمن الحربي",
          "أسامة محمد الحضيف",
          "سلمان محمد عكروت",
          "سارة رميح الرميح",
          "شذى خالد الثبيتي",
          "كادي عبدالعزيز العنزي"
        ]
      }
    ]
  }

  return (
    <div className={`min-h-screen bg-white text-slate-800 ${rtl ? 'rtl' : 'ltr'}`}>
      <div className="container max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center flex-col md:flex-row gap-4 mb-6">
            <div className="w-16 h-16 bg-blue-500 rounded-lg flex items-center justify-center">
              <Users className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900">
              {t('clubStructurePage.title')}
            </h1>
          </div>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            {t('clubStructurePage.subtitle')}
          </p>
        </div>

        {/* Club Structure */}
        <div className="space-y-12 mt-12">

          {/* Leadership Section */}
          <div className="bg-white rounded-lg p-8 border border-slate-200">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-slate-900 inline-flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                  <Crown className="h-5 w-5 text-white" />
                </div>
                {t('clubStructurePage.leadership')}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {/* Presidents Section */}
              <Card className="bg-white border border-slate-200 rounded-lg shadow-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="text-slate-900 flex items-center gap-3 justify-center text-lg font-bold">
                    <Crown className="h-5 w-5 text-blue-600" />
                    {clubData.president.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 pb-6">
                  {clubData.president.members.map((member, index) => (
                    <div key={index} className="bg-slate-50 rounded-lg px-6 py-3 border border-slate-200">
                      <p className="text-slate-900 font-semibold text-base text-center">{member}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Vice President */}
              <Card className="bg-white border border-slate-200 rounded-lg shadow-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="text-slate-900 flex items-center gap-3 justify-center text-lg font-bold">
                    <Shield className="h-5 w-5 text-green-600" />
                    {clubData.vicePresident.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pb-6">
                  <div className="bg-slate-50 rounded-lg px-6 py-3 border border-slate-200 text-center">
                    <p className="text-slate-900 font-semibold text-base text-center">{clubData.vicePresident.members[0]}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Specialized Departments Section */}
          <div id="specialized-departments" className="bg-white rounded-lg p-8 border border-slate-200">
            {/* Section Title */}
            <div className="mb-8 text-center">
              <h2 className="text-2xl font-bold text-slate-900 inline-flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center">
                  <Lightbulb className="h-5 w-5 text-white" />
                </div>
                {t('clubStructurePage.specializedDepts')}
              </h2>
              <p className="text-slate-600 mt-2">{t('clubStructurePage.specializedDesc')}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {clubData.departmentsSpecialized.map((dept, index) => (
                <Card 
                  key={index} 
                  id={`dept-${index}`} 
                  className="bg-white border border-slate-200 rounded-lg shadow-sm hover:shadow-md transition-shadow scroll-mt-20"
                >
                  <CardHeader className="pb-4">
                    <CardTitle className="text-slate-900 flex items-center gap-3 text-lg font-bold">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        highlightedCard === `dept-${index}` ? 'animate-[scale_0.6s_ease-in-out]' : ''
                      } ${
                        dept.color === 'green' ? 'bg-green-500' :
                        dept.color === 'blue' ? 'bg-blue-500' :
                        dept.color === 'yellow' ? 'bg-yellow-500' :
                        dept.color === 'orange' ? 'bg-orange-500' :
                        dept.color === 'purple' ? 'bg-purple-500' :
                        'bg-red-500'
                      }`}>
                        <dept.icon className="h-5 w-5 text-white" />
                      </div>
                      {dept.title}
                    </CardTitle>
                    <div className="space-y-2 mt-3">
                      <div className="rounded-lg px-4 py-3 border bg-slate-50 border-slate-200">
                        <p className="text-slate-600 font-medium text-sm text-center">{t('clubStructurePage.deptLeader')}</p>
                        <p className="text-slate-900 font-semibold text-base mt-1 text-center">{dept.leader}</p>
                      </div>
                      <div className="rounded-lg px-4 py-3 border bg-slate-50 border-slate-200">
                        <p className="text-slate-600 font-medium text-sm text-center">{t('clubStructurePage.deptVice')}</p>
                        <p className="text-slate-900 font-semibold text-base mt-1 text-center">{dept.vice}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-2 pb-6">
                    <p className="text-slate-700 font-semibold text-sm mb-3 flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      {t('clubStructurePage.deptMembers')}
                    </p>
                    {dept.members.map((member, memberIndex) => (
                      <div key={memberIndex} className="bg-slate-50 rounded-lg px-4 py-2 border border-slate-200">
                        <div className="text-slate-700 font-medium text-sm text-center">
                          {member}
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Administrative Departments Section */}
          <div id="administrative-departments" className="bg-white rounded-lg p-8 border border-slate-200">
            {/* Section Title */}
            <div className="mb-8 text-center">
              <h2 className="text-2xl font-bold text-slate-900 inline-flex items-center gap-3">
                <div className="w-10 h-10 bg-emerald-500 rounded-lg flex items-center justify-center">
                  <Cog className="h-5 w-5 text-white" />
                </div>
                {t('clubStructurePage.administrativeDepts')}
              </h2>
              <p className="text-slate-600 mt-2">{t('clubStructurePage.administrativeDesc')}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {clubData.departmentsAdministrative.map((dept, index) => (
                <Card 
                  key={index} 
                  id={`admin-dept-${index}`} 
                  className="bg-white border border-slate-200 rounded-lg shadow-sm hover:shadow-md transition-shadow scroll-mt-20"
                >
                  <CardHeader className="pb-4">
                    <CardTitle className="text-slate-900 flex items-center gap-3 text-lg font-bold">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        highlightedCard === `admin-dept-${index}` ? 'animate-[scale_0.6s_ease-in-out]' : ''
                      } ${
                        dept.color === 'green' ? 'bg-green-500' :
                        dept.color === 'blue' ? 'bg-blue-500' :
                        dept.color === 'yellow' ? 'bg-yellow-500' :
                        dept.color === 'orange' ? 'bg-orange-500' :
                        dept.color === 'purple' ? 'bg-purple-500' :
                        'bg-red-500'
                      }`}>
                        <dept.icon className="h-5 w-5 text-white" />
                      </div>
                      {dept.title}
                    </CardTitle>
                    <div className="space-y-2 mt-3">
                      <div className="rounded-lg px-4 py-3 border bg-slate-50 border-slate-200">
                        <p className="text-slate-600 font-medium text-sm text-center">{t('clubStructurePage.deptLeader')}</p>
                        <p className="text-slate-900 font-semibold text-base mt-1 text-center">{dept.leader}</p>
                      </div>
                      <div className="rounded-lg px-4 py-3 border bg-slate-50 border-slate-200">
                        <p className="text-slate-600 font-medium text-sm text-center">{t('clubStructurePage.deptVice')}</p>
                        <p className="text-slate-900 font-semibold text-base mt-1 text-center">{dept.vice}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-2 pb-6">
                    <p className="text-slate-700 font-semibold text-sm mb-3 flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      {t('clubStructurePage.deptMembers')}
                    </p>
                    {dept.members.map((member, memberIndex) => (
                      <div key={memberIndex} className="bg-slate-50 rounded-lg px-4 py-2 border border-slate-200">
                        <div className="text-slate-700 font-medium text-sm text-center">
                          {member}
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}