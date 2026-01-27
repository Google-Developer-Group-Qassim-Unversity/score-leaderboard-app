"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, Crown, Shield, Cog, Palette, Bot, Calendar, Megaphone, Lightbulb, Trophy, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useTranslation } from 'react-i18next'
import '@/lib/i18n-client'

export default function ClubStructurePage() {
  const { i18n } = useTranslation()
  const rtl = i18n.language === 'ar'
  const clubData = {
    president: {
      title: "رؤساء النادي",
      members: [
        "عزام خالد الخضيري",
        "جود سعود الفرم"
      ]
    },
    vicePresident: {
      title: "نائب الرئيس",
      members: ["أحمد الحربي"]
    },
    departmentsSpecialized: [
      {
        title: "الروبوتات",
        color: "yellow",
        icon: Bot,
        head: "شذى خالد الحربي",
        members: [
          "رهف علي الحربي",
          "ريما صالح الاحمد",
          "ابتهال مهدي العمري",
          "مزنة صافي الدين عبدالقادر",
          "رغد عبدالله العبيد"
        ]
      },
      {
        title: "الذكاء الاصطناعي وتحليل البيانات",
        color: "red",
        icon: Lightbulb,
        head: "نوره إبراهيم النفيسة",
        members: [
          "هديل مزعل الرشيدي",
          "ميلاف عبدالله العبيدان",
          "لين عادل العقيل",
          "وتين عبدالمحسن السيف",
          "نادر علي الحربي"
        ]
      },
      {
        title: "ريادة الأعمال",
        color: "blue",
        icon: Trophy,
        head: "غادة الفايز",
        members: [
          "غادة حمد العمران",
          "تالا صالح المزيني",
          "عهد المطيري"
        ]
      },
      {
        title: "الأمن السيبراني",
        color: "green",
        icon: Shield,
        head: "حاتم محمد الحسيني",
        members: [
          "رغد صالح الحسين",
          "عاصم أحمد العقيل",
          "دانه عبدالعزيز الغريب",
          "أثير سالم الحربي",
          "جود ممدوح العنزي"
        ]
      }
    ],
    departmentsAdministrative: [
      {
        title: "التطوير",
        color: "blue",
        icon: Cog,
        head: "عبدالاله عبدالعزيز البراك",
        members: [
          "إبراهيم سليمان السكيتي",
          "علي حسين الصابر",
        ]
      },
      {
        title: "التصميم",
        color: "green",
        icon: Palette,
        head: "أمل عبدالله الرحيمي",
        members: [
          "لمار ماجد الفوزان",
          "جنى إبراهيم الضبيبان",
          "أسماء حامد الطريفي",
          "أثير عبدالله غزواني"
        ]
      },
      {
        title: "إدارة البرامج والفعاليات",
        color: "orange",
        icon: Calendar,
        head: "غادة مجاهد المطيري",
        members: [
          "وتين سليمان السكيتي",
          "جواهر صالح الحربي",
          "ثناء عبدالعزيز الدخيل",
          "يارا عبدالكريم الصايغ"
        ]
      },
      {
        title: "التنظيم والاجتماعات",
        color: "red",
        icon: Users,
        head_male: "عبدالملك غازي المطيري",
        head_female: "ياسمين حمود التويجري",
        members_male: [
          "أحمد فيصل الحجيلان",
        ],
        members_female: [
          "خولة سعود البشري",
          "أميرة عيد المطيري"
        ]
      },
      {
        title: "التقارير والإعلام",
        color: "blue",
        icon: Megaphone,
        head: "كادي عبدالله السبيعي",
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
              هيكلة المجموعة
            </h1>
          </div>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            تعرف على الهيكل التنظيمي لنادي مطوري قوقل والأقسام المختلفة
          </p>
        </div>

        {/* Club Structure */}
        <div className="space-y-12 mt-12">

          {/* Leadership Section */}
          <div className="bg-white rounded-lg p-8 border border-slate-200">
            <div className="text-center mb-8">
              <h2 className={`text-2xl font-bold text-slate-900 inline-flex items-center gap-3 ${!rtl ? 'flex-row-reverse' : ''}`}>
                <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                  <Crown className="h-5 w-5 text-white" />
                </div>
                القيادة
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {/* Presidents Section */}
              <Card className="bg-white border border-slate-200 rounded-lg shadow-sm">
                <CardHeader className="pb-4">
                  <CardTitle className={`text-slate-900 flex items-center gap-3 justify-center text-lg font-bold ${!rtl ? 'flex-row-reverse' : ''}`}>
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
                  <CardTitle className={`text-slate-900 flex items-center gap-3 justify-center text-lg font-bold ${!rtl ? 'flex-row-reverse' : ''}`}>
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
          <div className="bg-white rounded-lg p-8 border border-slate-200">
            {/* Section Title */}
            <div className="mb-8 text-center">
              <h2 className={`text-2xl font-bold text-slate-900 inline-flex items-center gap-3 ${!rtl ? 'flex-row-reverse' : ''}`}>
                <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center">
                  <Lightbulb className="h-5 w-5 text-white" />
                </div>
                الاقسام التخصصية
              </h2>
              <p className="text-slate-600 mt-2">أقسام متخصصة في مجالات التقنية والابتكار</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {clubData.departmentsSpecialized.map((dept, index) => (
                <Card key={index} className="bg-white border border-slate-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  <CardHeader className="pb-4">
                    <CardTitle className={`text-slate-900 flex items-center gap-3 text-lg font-bold ${!rtl ? 'flex-row-reverse' : ''}`}>
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        dept.color === 'green' ? 'bg-green-500' :
                        dept.color === 'blue' ? 'bg-blue-500' :
                        dept.color === 'yellow' ? 'bg-yellow-500' :
                        dept.color === 'orange' ? 'bg-orange-500' :
                        'bg-red-500'
                      }`}>
                        <dept.icon className="h-5 w-5 text-white" />
                      </div>
                      {dept.title}
                    </CardTitle>
                    <div className="rounded-lg px-4 py-3 mt-3 border bg-slate-50 border-slate-200">
                      <p className="text-slate-600 font-medium text-sm text-center">رئيس القسم:</p>
                      <p className="text-slate-900 font-semibold text-base mt-1 text-center">{dept.head}</p>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-2 pb-6">
                    <p className="text-slate-700 font-semibold text-sm mb-3 flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      أعضاء القسم:
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
          <div className="bg-white rounded-lg p-8 border border-slate-200">
            {/* Section Title */}
            <div className="mb-8 text-center">
              <h2 className={`text-2xl font-bold text-slate-900 inline-flex items-center gap-3 ${!rtl ? 'flex-row-reverse' : ''}`}>
                <div className="w-10 h-10 bg-emerald-500 rounded-lg flex items-center justify-center">
                  <Cog className="h-5 w-5 text-white" />
                </div>
                الاقسام الإدارية
              </h2>
              <p className="text-slate-600 mt-2">أقسام إدارية لتنظيم وتطوير أعمال النادي</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {clubData.departmentsAdministrative.map((dept, index) => {
                // Check if department has two heads (male and female)
                const hasTwoHeads = 'head_male' in dept && 'head_female' in dept;
                
                return (
                  <Card key={index} className="bg-white border border-slate-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                    <CardHeader className="pb-4">
                      <CardTitle className={`text-slate-900 flex items-center gap-3 text-lg font-bold ${!rtl ? 'flex-row-reverse' : ''}`}>
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          dept.color === 'green' ? 'bg-green-500' :
                          dept.color === 'blue' ? 'bg-blue-500' :
                          dept.color === 'yellow' ? 'bg-yellow-500' :
                          dept.color === 'orange' ? 'bg-orange-500' :
                          'bg-red-500'
                        }`}>
                          <dept.icon className="h-5 w-5 text-white" />
                        </div>
                        {dept.title}
                      </CardTitle>
                      {hasTwoHeads ? (
                        // Render two heads in the same card
                        <div className="space-y-2 mt-3">
                          <div className="rounded-lg px-4 py-3 border bg-slate-50 border-slate-200">
                            <p className="text-slate-600 font-medium text-sm text-center">رئيس القسم (طلاب)</p>
                            <p className="text-slate-900 font-semibold text-base mt-1 text-center">{dept.head_male}</p>
                          </div>
                          <div className="rounded-lg px-4 py-3 border bg-slate-50 border-slate-200">
                            <p className="text-slate-600 font-medium text-sm text-center">رئيس القسم (طالبات)</p>
                            <p className="text-slate-900 font-semibold text-base mt-1 text-center">{dept.head_female}</p>
                          </div>
                        </div>
                      ) : (
                        // Render single head
                        <div className="rounded-lg px-4 py-3 mt-3 border bg-slate-50 border-slate-200">
                          <p className="text-slate-600 font-medium text-sm text-center">رئيس القسم:</p>
                          <p className="text-slate-900 font-semibold text-base mt-1 text-center">{dept.head}</p>
                        </div>
                      )}
                    </CardHeader>
                    <CardContent className="space-y-2 pb-6">
                      <p className="text-slate-700 font-semibold text-sm mb-3 flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        أعضاء القسم:
                      </p>
                      {hasTwoHeads ? (
                        // Render all members in a flat list
                        <>
                          {dept.members_male && dept.members_male.map((member, memberIndex) => (
                            <div key={`male-${memberIndex}`} className="bg-slate-50 rounded-lg px-4 py-2 border border-slate-200">
                              <div className="text-slate-700 font-medium text-sm text-center">
                                {member}
                              </div>
                            </div>
                          ))}
                          {dept.members_female && dept.members_female.map((member, memberIndex) => (
                            <div key={`female-${memberIndex}`} className="bg-slate-50 rounded-lg px-4 py-2 border border-slate-200">
                              <div className="text-slate-700 font-medium text-sm text-center">
                                {member}
                              </div>
                            </div>
                          ))}
                        </>
                      ) : (
                        // Render regular members list
                        dept.members.map((member, memberIndex) => (
                          <div key={memberIndex} className="bg-slate-50 rounded-lg px-4 py-2 border border-slate-200">
                            <div className="text-slate-700 font-medium text-sm text-center">
                              {member}
                            </div>
                          </div>
                        ))
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}