import React from 'react';

const PointsSystemPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 text-slate-800 relative overflow-x-hidden" dir="rtl">
      {/* Background Decoration */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-yellow-200 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-40 left-1/3 w-72 h-72 bg-green-200 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-2000"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10">
      {/* Header */}
      <header className="bg-white shadow-lg sticky top-0 z-10 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-6">
              {/* Enhanced Google Developer Groups Logo Pattern */}
              <div className="flex gap-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="relative w-12 h-12 md:w-14 md:h-14 transform hover:scale-110 transition-transform duration-300">
                    <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-gradient-to-br from-red-400 to-red-600 rounded-tl-full shadow-md"></div>
                    <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-bl from-yellow-300 to-yellow-500 rounded-tr-full shadow-md"></div>
                    <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-green-400 to-green-600 rounded-bl-full shadow-md"></div>
                    <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gradient-to-tl from-blue-400 to-blue-600 rounded-br-full shadow-md"></div>
                    <div className="absolute inset-2 bg-white rounded-full opacity-20"></div>
                  </div>
                ))}
              </div>
              <div className="text-right">
                <h1 className="text-3xl md:text-5xl font-extrabold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent leading-tight">
                  نظام التقييم والمتابعة للنقاط
                </h1>
                <p className="text-slate-600 mt-2 text-base md:text-lg font-medium">
                  للنادي الطلابي ممثلة بمجموعة قوقل للطلبة المطورين
                </p>
                <div className="flex items-center gap-2 mt-2 justify-end">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse delay-100"></div>
                  <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse delay-200"></div>
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse delay-300"></div>
                </div>
              </div>
            </div>
            <div className="text-center md:text-right">
              <p className="text-sm text-slate-500 font-medium">
                Google Developer Student Clubs
              </p>
              <p className="text-xs text-slate-400 mt-1">
                Qassim University
              </p>
              <div className="mt-2 px-3 py-1 bg-gradient-to-r from-blue-100 to-green-100 rounded-full">
                <span className="text-xs font-semibold text-slate-700">نظام النقاط 2025</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-12">
        {/* General Idea Section */}
        <section className="mb-16">
          <div className="flex items-center gap-4 mb-8">
            <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-blue-500/30 transform hover:scale-105 transition-transform duration-200">
              1
            </div>
            <div className="flex items-center gap-3">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
              </svg>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
                الفكرة العامة
              </h2>
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-slate-200 hover:shadow-xl transition-shadow duration-300">
            <div className="p-8 bg-gradient-to-br from-blue-50/50 to-white">
              <ul className="space-y-6 text-slate-700 text-lg">
                <li className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mt-1 shadow-md hover:shadow-lg transition-shadow duration-200">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <span className="leading-relaxed">كل نشاط له نقاط أساسية + مضاعفات (حسب الحضور والجودة والتزام الوقت… إلخ).</span>
                </li>
                <li className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mt-1 shadow-md hover:shadow-lg transition-shadow duration-200">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <span className="leading-relaxed">فيه نقاط للأقسام (نقاط قسم) وفيه نقاط للأعضاء (نقاط عضو).</span>
                </li>
                <li className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mt-1 shadow-md hover:shadow-lg transition-shadow duration-200">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <span className="leading-relaxed">قسم التقارير هو المسؤول عن التحقق، التسجيل، والحسبة، ونشر لوحات النتائج بشكل دوري.</span>
                </li>
              </ul>
              
             
            </div>
          </div>
        </section>

        {/* Section Divider */}
        <div className="flex items-center justify-center mb-16">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent"></div>
          <div className="px-6">
            <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-yellow-500 rounded-full shadow-md"></div>
          </div>
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent"></div>
        </div>

        {/* Department Activities Section */}
        <section className="mb-16">
          <div className="flex items-center gap-4 mb-8">
            <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-yellow-500/30 transform hover:scale-105 transition-transform duration-200">
              2
            </div>
            <div className="flex items-center gap-3">
              <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
              </svg>
              <h2 className="text-2xl md:text-3xl font-bold text-yellow-600">
                أنواع الأنشطة والنقاط الأساسية (للقسم)
              </h2>
            </div>
          </div>
          <div className="overflow-x-auto bg-white rounded-2xl shadow-lg border border-slate-200 hover:shadow-xl transition-shadow duration-300">
            <div className="bg-gradient-to-r from-yellow-50/50 to-white p-1">
              <table className="min-w-full text-right">
              <thead className="bg-gradient-to-r from-slate-100 to-slate-200">
                <tr>
                  <th className="px-6 py-4 text-sm font-semibold text-slate-700 uppercase tracking-wider">النوع</th>
                  <th className="px-6 py-4 text-sm font-semibold text-slate-700 uppercase tracking-wider">التعريف المختصر</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-slate-700 uppercase tracking-wider">النقاط الأساسية</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                <tr className="hover:bg-yellow-50 transition-colors duration-200"><td className="px-6 py-4 whitespace-nowrap font-medium">دورة حضورية (≥ 2 ساعات)</td><td className="px-6 py-4 text-slate-600">تدريب وجاهي داخل الكلية/الجامعة</td><td className="px-6 py-4 text-center"><span className="inline-flex items-center justify-center w-12 h-8 bg-gradient-to-r from-yellow-100 to-yellow-200 text-yellow-800 font-bold text-lg rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">15</span></td></tr>
                <tr className="hover:bg-yellow-50 transition-colors duration-200"><td className="px-6 py-4 whitespace-nowrap font-medium">دورة أونلاين (≥ 1.5 ساعة)</td><td className="px-6 py-4 text-slate-600">تدريب عن بُعد</td><td className="px-6 py-4 text-center"><span className="inline-flex items-center justify-center w-12 h-8 bg-gradient-to-r from-yellow-100 to-yellow-200 text-yellow-800 font-bold text-lg rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">9</span></td></tr>
                <tr className="hover:bg-yellow-50 transition-colors duration-200"><td className="px-6 py-4 whitespace-nowrap font-medium">معسكر تدريبي</td><td className="px-6 py-4 text-slate-600">لكل يوم فعلي تدريبي (6 ساعات فأكثر)</td><td className="px-6 py-4 text-center"><span className="inline-flex items-center justify-center w-16 h-8 bg-gradient-to-r from-yellow-100 to-yellow-200 text-yellow-800 font-bold text-lg rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">20/يوم</span></td></tr>
                <tr className="hover:bg-yellow-50 transition-colors duration-200"><td className="px-6 py-4 whitespace-nowrap font-medium">لقاء تقني/جلسة شهرية</td><td className="px-6 py-4 text-slate-600">جلسة تبادل معرفة/نقاش</td><td className="px-6 py-4 text-center"><span className="inline-flex items-center justify-center w-12 h-8 bg-gradient-to-r from-yellow-100 to-yellow-200 text-yellow-800 font-bold text-lg rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">6</span></td></tr>
                <tr className="hover:bg-yellow-50 transition-colors duration-200"><td className="px-6 py-4 whitespace-nowrap font-medium">مسابقة داخلية (تنظيم)</td><td className="px-6 py-4 text-slate-600">مسابقة ينظمها القسم</td><td className="px-6 py-4 text-center"><span className="inline-flex items-center justify-center w-12 h-8 bg-gradient-to-r from-yellow-100 to-yellow-200 text-yellow-800 font-bold text-lg rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">12</span></td></tr>
                <tr className="hover:bg-yellow-50 transition-colors duration-200"><td className="px-6 py-4 whitespace-nowrap font-medium">مشاركة بمسابقة خارجية</td><td className="px-6 py-4 text-slate-600">يُحتسب للقسم مرة واحدة لكل فريق ممثل</td><td className="px-6 py-4 text-center"><span className="inline-flex items-center justify-center w-12 h-8 bg-gradient-to-r from-yellow-100 to-yellow-200 text-yellow-800 font-bold text-lg rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">10</span></td></tr>
                <tr className="hover:bg-yellow-50 transition-colors duration-200"><td className="px-6 py-4 whitespace-nowrap font-medium">مشروع عملي/منتج</td><td className="px-6 py-4 text-slate-600">تسليم مشروع مع مستودع عام + عرض</td><td className="px-6 py-4 text-center"><span className="inline-flex items-center justify-center w-12 h-8 bg-gradient-to-r from-yellow-100 to-yellow-200 text-yellow-800 font-bold text-lg rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">20</span></td></tr>
                <tr className="hover:bg-yellow-50 transition-colors duration-200"><td className="px-6 py-4 whitespace-nowrap font-medium">فعالية تعريفية/جناح</td><td className="px-6 py-4 text-slate-600">ركن/تعريف بالنادي داخل الجامعة</td><td className="px-6 py-4 text-center"><span className="inline-flex items-center justify-center w-12 h-8 bg-gradient-to-r from-yellow-100 to-yellow-200 text-yellow-800 font-bold text-lg rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">8</span></td></tr>
                <tr className="hover:bg-yellow-50 transition-colors duration-200"><td className="px-6 py-4 whitespace-nowrap font-medium">شراكة/رعاية</td><td className="px-6 py-4 text-slate-600">اتفاق يدعم نشاط/جوائز/مكان</td><td className="px-6 py-4 text-center"><span className="inline-flex items-center justify-center w-16 h-8 bg-gradient-to-r from-yellow-100 to-yellow-200 text-yellow-800 font-bold text-lg rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">15-30</span></td></tr>
                <tr className="hover:bg-yellow-50 transition-colors duration-200"><td className="px-6 py-4 whitespace-nowrap font-medium">محتوى تعليمي منشور</td><td className="px-6 py-4 text-slate-600">مقال/فيديو تحت هوية النادي</td><td className="px-6 py-4 text-center"><span className="inline-flex items-center justify-center w-12 h-8 bg-gradient-to-r from-yellow-100 to-yellow-200 text-yellow-800 font-bold text-lg rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">10</span></td></tr>
              </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Section Divider */}
        <div className="flex items-center justify-center mb-16">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent"></div>
          <div className="px-6">
            <div className="w-3 h-3 bg-gradient-to-r from-yellow-500 to-green-500 rounded-full shadow-md"></div>
          </div>
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent"></div>
        </div>

        {/* Members Points Section */}
        <section className="mb-16">
          <div className="flex items-center gap-4 mb-8">
            <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-green-600 to-green-700 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-green-500/30 transform hover:scale-105 transition-transform duration-200">
              3
            </div>
            <div className="flex items-center gap-3">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
              </svg>
              <h2 className="text-2xl md:text-3xl font-bold text-green-700">
                نقاط الأعضاء (حضور/مشاركة/تنظيم)
              </h2>
            </div>
          </div>
          <div className="overflow-x-auto bg-white rounded-2xl shadow-lg border border-slate-200 hover:shadow-xl transition-shadow duration-300">
            <div className="bg-gradient-to-r from-green-50/50 to-white p-1">
              <table className="min-w-full text-right">
              <thead className="bg-gradient-to-r from-slate-100 to-slate-200">
                <tr>
                  <th className="px-6 py-4 text-sm font-semibold text-slate-700 uppercase tracking-wider">الفعل</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-slate-700 uppercase tracking-wider">نقاط العضو</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                <tr className="hover:bg-green-50 transition-colors duration-200"><td className="px-6 py-4 font-medium">حضور دورة حضورية</td><td className="px-6 py-4 text-center"><span className="inline-flex items-center justify-center w-12 h-8 bg-gradient-to-r from-green-100 to-green-200 text-green-800 font-bold text-lg rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">6</span></td></tr>
                <tr className="hover:bg-green-50 transition-colors duration-200"><td className="px-6 py-4 font-medium">حضور دورة أونلاين</td><td className="px-6 py-4 text-center"><span className="inline-flex items-center justify-center w-12 h-8 bg-gradient-to-r from-green-100 to-green-200 text-green-800 font-bold text-lg rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">4</span></td></tr>
                <tr className="hover:bg-green-50 transition-colors duration-200"><td className="px-6 py-4 font-medium">حضور معسكر (لكل يوم)</td><td className="px-6 py-4 text-center"><span className="inline-flex items-center justify-center w-12 h-8 bg-gradient-to-r from-green-100 to-green-200 text-green-800 font-bold text-lg rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">10</span></td></tr>
                <tr className="hover:bg-green-50 transition-colors duration-200"><td className="px-6 py-4 font-medium">حضور لقاء تقني/جلسة</td><td className="px-6 py-4 text-center"><span className="inline-flex items-center justify-center w-12 h-8 bg-gradient-to-r from-green-100 to-green-200 text-green-800 font-bold text-lg rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">3</span></td></tr>
                <tr className="hover:bg-green-50 transition-colors duration-200"><td className="px-6 py-4 font-medium">المشاركة في مسابقة خارجية</td><td className="px-6 py-4 text-center"><span className="inline-flex items-center justify-center w-12 h-8 bg-gradient-to-r from-green-100 to-green-200 text-green-800 font-bold text-lg rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">6</span></td></tr>
                <tr className="hover:bg-green-50 transition-colors duration-200"><td className="px-6 py-4 font-medium">التأهل/المراكز المتقدمة في مسابقة</td><td className="px-6 py-4 text-center"><span className="inline-flex items-center justify-center w-12 h-8 bg-gradient-to-r from-green-100 to-green-200 text-green-800 font-bold text-lg rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">12</span></td></tr>
                <tr className="hover:bg-green-50 transition-colors duration-200"><td className="px-6 py-4 font-medium">الفوز/المركز الأول خارجياً</td><td className="px-6 py-4 text-center"><span className="inline-flex items-center justify-center w-12 h-8 bg-gradient-to-r from-green-100 to-green-200 text-green-800 font-bold text-lg rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">18</span></td></tr>
                <tr className="hover:bg-green-50 transition-colors duration-200"><td className="px-6 py-4 font-medium">تقديم جلسة قصيرة (≤ 20 دقيقة)</td><td className="px-6 py-4 text-center"><span className="inline-flex items-center justify-center w-12 h-8 bg-gradient-to-r from-green-100 to-green-200 text-green-800 font-bold text-lg rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">8</span></td></tr>
                <tr className="hover:bg-green-50 transition-colors duration-200"><td className="px-6 py-4 font-medium">تقديم دورة كاملة</td><td className="px-6 py-4 text-center"><span className="inline-flex items-center justify-center w-12 h-8 bg-gradient-to-r from-green-100 to-green-200 text-green-800 font-bold text-lg rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">20</span></td></tr>
                <tr className="hover:bg-green-50 transition-colors duration-200"><td className="px-6 py-4 font-medium">تنظيم/تطوع في حدث (شِفت)</td><td className="px-6 py-4 text-center"><span className="inline-flex items-center justify-center w-16 h-8 bg-gradient-to-r from-green-100 to-green-200 text-green-800 font-bold text-sm rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">5/شفت</span></td></tr>
                <tr className="hover:bg-green-50 transition-colors duration-200"><td className="px-6 py-4 font-medium">المساهمة في تصميم معتمد</td><td className="px-6 py-4 text-center"><span className="inline-flex items-center justify-center w-12 h-8 bg-gradient-to-r from-green-100 to-green-200 text-green-800 font-bold text-lg rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">6</span></td></tr>
                <tr className="hover:bg-green-50 transition-colors duration-200"><td className="px-6 py-4 font-medium">كتابة مقال/فيديو تعليمي معتمد</td><td className="px-6 py-4 text-center"><span className="inline-flex items-center justify-center w-12 h-8 bg-gradient-to-r from-green-100 to-green-200 text-green-800 font-bold text-lg rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">10</span></td></tr>
                <tr className="hover:bg-green-50 transition-colors duration-200"><td className="px-6 py-4 font-medium">المشاركة في مشروع عملي مُعلن</td><td className="px-6 py-4 text-center"><span className="inline-flex items-center justify-center w-12 h-8 bg-gradient-to-r from-green-100 to-green-200 text-green-800 font-bold text-lg rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">10</span></td></tr>
              </tbody>
              </table>
            </div>
          </div>
        </section>

      </main>

      {/* Enhanced Footer */}
      <footer className="relative mt-20">
        {/* Decorative Wave */}
        <div className="absolute inset-x-0 top-0">
          <svg className="w-full h-16 text-slate-100" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" fill="currentColor"></path>
            <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" fill="currentColor"></path>
            <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" fill="currentColor"></path>
          </svg>
        </div>
        
        {/* Footer Content */}
        <div className="bg-gradient-to-br from-slate-100 to-slate-200 pt-16 pb-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="flex justify-center items-center gap-4 mb-6">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center shadow-lg">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                  </svg>
                </div>
                
                <h3 className="text-xl font-bold bg-gradient-to-r from-slate-700 to-slate-500 bg-clip-text text-transparent">
                  By Google Devs, For You
                </h3>
              </div>
              
              <p className="text-slate-600 mb-4 max-w-2xl mx-auto">
                تعزيز مهارات الطلاب في التكنولوجيا والبرمجة من خلال الأنشطة والفعاليات التفاعلية
              </p>
              
              <div className="flex justify-center items-center gap-6 mb-6">
                
                <div className="flex items-center gap-2 text-slate-500">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
                  </svg>
                  <span className="text-sm">نظام النقاط 2025</span>
                </div>
              </div>
              
              <div className="h-1 bg-gradient-to-r from-red-500 via-yellow-400 via-blue-500 to-green-500 rounded-full max-w-md mx-auto mb-4"></div>
              
              <p className="text-xs text-slate-400">
                © 2025 Google Developer Student Clubs - Qassim.
              </p>
            </div>
          </div>
        </div>
      </footer>
      </div>
    </div>
  );
};

export default PointsSystemPage;
