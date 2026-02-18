"use client"

import React from 'react';
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Award, Users, Building2, Calendar, Star, Check } from "lucide-react";
import { useTranslation } from 'react-i18next';
import '@/lib/i18n-client';

export default function PointsSystemPage() {
  const { i18n } = useTranslation();
  const rtl = i18n.language === 'ar';

  const memberPoints = [
    { action: "حضور دورة حضورية", points: "6" },
    { action: "حضور دورة أونلاين", points: "4" },
    { action: "حضور معسكر (لكل يوم)", points: "10" },
    { action: "حضور معسكر أونلاين (لكل يوم)", points: "6" },
    { action: "حضور حدث ضخم (300+ حضور)", points: "15" },
    { action: "حضور لقاء تقني/جلسة", points: "3" },
    { action: "المشاركة في مسابقة خارجية", points: "6" },
    { action: "التأهل/المراكز المتقدمة في مسابقة", points: "12" },
    { action: "الفوز/المركز الأول خارجياً", points: "18" },
    { action: "تقديم جلسة قصيرة (≤ 20 دقيقة)", points: "8" },
    { action: "تقديم دورة كاملة", points: "20" },
    { action: "تنظيم/تطوع في حدث (شِفت)", points: "5/شفت" },
    { action: "المساهمة في تصميم معتمد", points: "6" },
    { action: "كتابة مقال/فيديو تعليمي معتمد", points: "10" },
    { action: "المشاركة في مشروع عملي مُعلن", points: "10" },
  ];

  const departmentPoints = [
    { type: "دورة حضورية", description: "تنظيم دورة حضورية", points: "15" },
    { type: "دورة أونلاين", description: "تنظيم دورة عن بُعد", points: "9" },
    { type: "معسكر تدريبي", description: "معسكر حضوري (لكل يوم)", points: "20/يوم" },
    { type: "معسكر أونلاين", description: "معسكر تدريبي عن بُعد (لكل يوم)", points: "13/يوم" },
    { type: "حدث ضخم (300+ حضور)", description: "فعالية كبيرة بحضور 300 شخص أو أكثر", points: "50+" },
    { type: "مساحة تويتر", description: "استضافة مساحة صوتية على تويتر", points: "7" },
    { type: "لقاء تقني/جلسة شهرية", description: "جلسة تبادل معرفة/نقاش", points: "6" },
    { type: "مسابقة داخلية (تنظيم)", description: "مسابقة ينظمها القسم", points: "12" },
    { type: "مشاركة بمسابقة خارجية", description: "يُحتسب للقسم مرة واحدة لكل فريق ممثل", points: "10" },
    { type: "مشروع عملي/منتج", description: "تسليم مشروع مع مستودع عام + عرض", points: "20" },
    { type: "فعالية تعريفية/جناح", description: "ركن/تعريف بالنادي داخل الجامعة", points: "8" },
    { type: "شراكة/رعاية", description: "اتفاق يدعم نشاط/جوائز/مكان", points: "15-30" },
    { type: "محتوى تعليمي منشور", description: "مقال/فيديو تحت هوية النادي", points: "10" },
  ];

  return (
    <div dir={rtl ? 'rtl' : 'ltr'} className={`min-h-screen bg-white text-slate-800 ${rtl ? 'rtl' : 'ltr'}`}>
      <div className="container max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="flex items-center justify-center flex-col md:flex-row gap-3 sm:gap-4 mb-4 sm:mb-6">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-blue-500 rounded-lg flex items-center justify-center">
              <Award className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900">
              نظام التقييم والمتابعة للنقاط
            </h1>
          </div>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            لمجموعة قوقل للطلبة المطورين
          </p>
        </div>

        {/* General Idea Section */}
        <div className="bg-white rounded-lg p-4 sm:p-8 border border-slate-200 mb-6 sm:mb-8">
          <div className="text-center mb-6 sm:mb-8">
            <h2 className={`text-xl sm:text-2xl font-bold text-slate-900 inline-flex items-center gap-2 sm:gap-3 ${!rtl ? 'flex-row-reverse' : ''}`}>
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                <Star className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
              </div>
              الفكرة العامة
            </h2>
          </div>

          <p className="text-slate-600 text-base leading-relaxed text-center mb-8 max-w-3xl mx-auto">
            نقاط قوقل تعكس مساهمات الأعضاء والأقسام، حيث يتم تقدير كل جهد وإنجاز بشكل واضح وملموس. مشاركتك معنا تصنع الفرق، وكل عضو له دور فريد وبصمة خاصة.
          </p>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-8">
            {/* Monthly Recognition */}
            <Card className="bg-white border border-slate-200 shadow-sm">
              <CardHeader className="pb-4">
                <CardTitle className={`text-slate-900 flex items-center gap-3 text-lg font-bold justify-center ${!rtl ? 'flex-row-reverse' : ''}`}>
                  <span className="flex items-center gap-2 justify-center w-full">
                    <Calendar className="h-5 w-5 text-blue-600" />
                    <span className="text-center">شهرياً</span>
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="bg-slate-50 rounded-lg px-4 py-3 border border-slate-200">
                  <p className="text-slate-700 text-sm text-center">ثلاث أعضاء الشهر المميزين</p>
                </div>
                <div className="bg-slate-50 rounded-lg px-4 py-3 border border-slate-200">
                  <p className="text-slate-700 text-sm text-center">قسم الشهر المبدع</p>
                </div>
              </CardContent>
            </Card>

            {/* Term Recognition */}
            <Card className="bg-white border border-slate-200 shadow-sm">
              <CardHeader className="pb-4">
                <CardTitle className={`text-slate-900 flex items-center gap-3 text-lg font-bold justify-center ${!rtl ? 'flex-row-reverse' : ''}`}>
                  <span className="flex items-center gap-2 justify-center w-full">
                    <Star className="h-5 w-5 text-yellow-600" />
                    <span className="text-center">نهاية الفصل</span>
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="bg-slate-50 rounded-lg px-4 py-3 border border-slate-200">
                  <p className="text-slate-700 text-sm text-center">تكريم أفضل 5 أعضاء (قابلة للزيادة إلى 10)</p>
                </div>
                <div className="bg-slate-50 rounded-lg px-4 py-3 border border-slate-200">
                  <p className="text-slate-700 text-sm text-center">تكريم القسم التخصصي المتميز</p>
                </div>
                <div className="bg-slate-50 rounded-lg px-4 py-3 border border-slate-200">
                  <p className="text-slate-700 text-sm text-center">تكريم القسم الإداري المتميز</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="max-w-3xl mx-auto space-y-3">
            <div className="flex items-center gap-3 bg-slate-50 rounded-lg px-4 py-3 border border-slate-200">
              <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                <Check className="h-3 w-3 text-white" />
              </div>
              <span className="text-slate-700 text-sm">كل نشاط له نقاط أساسية + مضاعفات (حسب الحضور والجودة والتزام الوقت… إلخ).</span>
            </div>
            <div className="flex items-center gap-3 bg-slate-50 rounded-lg px-4 py-3 border border-slate-200">
              <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                <Check className="h-3 w-3 text-white" />
              </div>
              <span className="text-slate-700 text-sm">فيه نقاط للأقسام (نقاط قسم) وفيه نقاط للأعضاء (نقاط عضو).</span>
            </div>
          </div>
        </div>

        {/* Members Points Section */}
        <div className="bg-white rounded-lg p-4 sm:p-8 border border-slate-200 mb-6 sm:mb-8">
          <div className="text-center mb-6 sm:mb-8">
            <h2 className={`text-xl sm:text-2xl font-bold text-slate-900 inline-flex items-center gap-2 sm:gap-3 ${!rtl ? 'flex-row-reverse' : ''}`}>
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-green-500 rounded-lg flex items-center justify-center">
                <Users className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
              </div>
              نقاط الأعضاء
            </h2>
            <p className="text-slate-600 mt-2 text-sm sm:text-base">حضور / مشاركة / تنظيم</p>
          </div>

          {/* Mobile: Card layout */}
          <div className="sm:hidden space-y-3">
            {memberPoints.map((item, index) => (
              <div key={index} className="bg-slate-50 rounded-lg p-4 border border-slate-200 flex items-center justify-between gap-3">
                <span className="text-slate-700 text-sm flex-1">{item.action}</span>
                <span className="inline-flex items-center justify-center px-3 py-1 bg-green-100 text-green-800 font-bold text-sm rounded-lg min-w-[50px]">
                  {item.points}
                </span>
              </div>
            ))}
          </div>

          {/* Desktop: Table layout */}
          <div className="hidden sm:block overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="px-6 py-4 text-sm font-semibold text-slate-700 text-right">الفعل</th>
                  <th className="px-6 py-4 text-sm font-semibold text-slate-700 text-center">النقاط</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {memberPoints.map((item, index) => (
                  <tr key={index} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 text-slate-700 text-sm">{item.action}</td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex items-center justify-center px-3 py-1 bg-green-100 text-green-800 font-bold text-sm rounded-lg min-w-[60px]">
                        {item.points}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Department Activities Section */}
        <div className="bg-white rounded-lg p-4 sm:p-8 border border-slate-200">
          <div className="text-center mb-6 sm:mb-8">
            <h2 className={`text-xl sm:text-2xl font-bold text-slate-900 inline-flex items-center gap-2 sm:gap-3 ${!rtl ? 'flex-row-reverse' : ''}`}>
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-yellow-500 rounded-lg flex items-center justify-center">
                <Building2 className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
              </div>
              نقاط الأقسام
            </h2>
            <p className="text-slate-600 mt-2 text-sm sm:text-base">أنواع الأنشطة والنقاط الأساسية</p>
          </div>

          {/* Mobile: Card layout */}
          <div className="sm:hidden space-y-3">
            {departmentPoints.map((item, index) => (
              <div key={index} className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <span className="text-slate-900 text-sm font-medium flex-1">{item.type}</span>
                  <span className="inline-flex items-center justify-center px-3 py-1 bg-yellow-100 text-yellow-800 font-bold text-sm rounded-lg min-w-[50px]">
                    {item.points}
                  </span>
                </div>
                <p className="text-slate-500 text-xs">{item.description}</p>
              </div>
            ))}
          </div>

          {/* Desktop: Table layout */}
          <div className="hidden sm:block overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="px-6 py-4 text-sm font-semibold text-slate-700 text-right">النوع</th>
                  <th className="px-6 py-4 text-sm font-semibold text-slate-700 text-right">التعريف</th>
                  <th className="px-6 py-4 text-sm font-semibold text-slate-700 text-center">النقاط</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {departmentPoints.map((item, index) => (
                  <tr key={index} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 text-slate-700 text-sm font-medium whitespace-nowrap">{item.type}</td>
                    <td className="px-6 py-4 text-slate-500 text-sm">{item.description}</td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex items-center justify-center px-3 py-1 bg-yellow-100 text-yellow-800 font-bold text-sm rounded-lg min-w-[60px]">
                        {item.points}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}