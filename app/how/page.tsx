import React from 'react';
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const PointsSystemPage = () => {
  return (
    <div className="min-h-screen bg-white text-slate-800" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Button */}
        <Link href="/" className="inline-block mb-6">
          <Button variant="outline" size="sm" className="border-slate-300 text-slate-700">
            <ArrowLeft className="h-4 w-4 ml-2" />
            العودة للصفحة الرئيسية
          </Button>
        </Link>

        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center flex-col gap-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path>
              </svg>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900">
              نظام التقييم والمتابعة للنقاط
            </h1>
          </div>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            لمجموعة قوقل للطلبة المطورين
          </p>
        </div>
        {/* General Idea Section */}
        <section className="mb-12">
          <div className="bg-gradient-to-br from-blue-50 to-slate-50 rounded-2xl p-8 border border-blue-100">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                <svg className="w-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-slate-900">
                الفكرة العامة
              </h2>
            </div>
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
              {/* Points System Introduction */}
              <div className="mb-8 space-y-6">
                <div className="text-right">
                  <p className="text-slate-600 text-base leading-relaxed">
                    نقاط قوقل تعكس مساهمات الأعضاء والأقسام، حيث يتم تقدير كل جهد وإنجاز بشكل واضح وملموس. مشاركتك معنا تصنع الفرق، وكل عضو له دور فريد وبصمة خاصة.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-4 mt-6">
                  {/* Monthly Recognition */}
                  <div className="bg-gradient-to-br from-indigo-50 to-white rounded-lg p-6 border-2 border-indigo-200">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-lg flex items-center justify-center">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <h3 className="text-lg font-bold text-indigo-900">شهريا</h3>
                    </div>
                    <div className="space-y-2 text-slate-700">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                        <p className="text-sm">ثلاث اعضاء الشهر المميزين </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                        <p className="text-sm"> قسم الشهر المبدع</p>
                      </div>
                    </div>
                  </div>

                  {/* Term Recognition */}
                  <div className="bg-gradient-to-br from-amber-50 to-white rounded-lg p-6 border-2 border-amber-200">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-amber-600 rounded-lg flex items-center justify-center">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                        </svg>
                      </div>
                      <h3 className="text-lg font-bold text-amber-900">نهاية الفصل</h3>
                    </div>
                    <div className="space-y-2 text-slate-700">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                        <p className="text-sm">تكريم أفضل 5 أعضاء (قابلة للزيادة إلى 10 حسب مستوى التفاعل)</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                        <p className="text-sm">تكريم القسم التخصصي المتميز</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                        <p className="text-sm">تكريم القسم الإداري المتميز</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="h-px bg-slate-200 my-6"></div>

              <ul className="space-y-4 text-slate-700">
                <li className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mt-0.5">
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <span className="leading-relaxed">كل نشاط له نقاط أساسية + مضاعفات (حسب الحضور والجودة والتزام الوقت… إلخ).</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mt-0.5">
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <span className="leading-relaxed">فيه نقاط للأقسام (نقاط قسم) وفيه نقاط للأعضاء (نقاط عضو).</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Members Points Section */}
        <section className="mb-12">
          <div className="bg-gradient-to-br from-green-50 to-slate-50 rounded-2xl p-8 border border-green-100">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-slate-900">
                نقاط الأعضاء (حضور/مشاركة/تنظيم)
              </h2>
            </div>
            <div className="overflow-x-auto bg-white rounded-lg shadow-sm border border-slate-200">
              <table className="min-w-full text-right">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-3 text-sm font-semibold text-slate-700">الفعل</th>
                  <th className="px-6 py-3 text-center text-sm font-semibold text-slate-700">نقاط العضو</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                <tr className="hover:bg-green-50 transition-colors"><td className="px-6 py-3 font-medium text-slate-700">حضور دورة حضورية</td><td className="px-6 py-3 text-center"><span className="inline-flex items-center justify-center px-3 py-1 bg-green-100 text-green-800 font-bold text-sm rounded-md">6</span></td></tr>
                <tr className="hover:bg-green-50 transition-colors"><td className="px-6 py-3 font-medium text-slate-700">حضور دورة أونلاين</td><td className="px-6 py-3 text-center"><span className="inline-flex items-center justify-center px-3 py-1 bg-green-100 text-green-800 font-bold text-sm rounded-md">4</span></td></tr>
                <tr className="hover:bg-green-50 transition-colors"><td className="px-6 py-3 font-medium text-slate-700">حضور معسكر (لكل يوم)</td><td className="px-6 py-3 text-center"><span className="inline-flex items-center justify-center px-3 py-1 bg-green-100 text-green-800 font-bold text-sm rounded-md">10</span></td></tr>
                <tr className="hover:bg-green-50 transition-colors"><td className="px-6 py-3 font-medium text-slate-700">حضور لقاء تقني/جلسة</td><td className="px-6 py-3 text-center"><span className="inline-flex items-center justify-center px-3 py-1 bg-green-100 text-green-800 font-bold text-sm rounded-md">3</span></td></tr>
                <tr className="hover:bg-green-50 transition-colors"><td className="px-6 py-3 font-medium text-slate-700">المشاركة في مسابقة خارجية</td><td className="px-6 py-3 text-center"><span className="inline-flex items-center justify-center px-3 py-1 bg-green-100 text-green-800 font-bold text-sm rounded-md">6</span></td></tr>
                <tr className="hover:bg-green-50 transition-colors"><td className="px-6 py-3 font-medium text-slate-700">التأهل/المراكز المتقدمة في مسابقة</td><td className="px-6 py-3 text-center"><span className="inline-flex items-center justify-center px-3 py-1 bg-green-100 text-green-800 font-bold text-sm rounded-md">12</span></td></tr>
                <tr className="hover:bg-green-50 transition-colors"><td className="px-6 py-3 font-medium text-slate-700">الفوز/المركز الأول خارجياً</td><td className="px-6 py-3 text-center"><span className="inline-flex items-center justify-center px-3 py-1 bg-green-100 text-green-800 font-bold text-sm rounded-md">18</span></td></tr>
                <tr className="hover:bg-green-50 transition-colors"><td className="px-6 py-3 font-medium text-slate-700">تقديم جلسة قصيرة (≤ 20 دقيقة)</td><td className="px-6 py-3 text-center"><span className="inline-flex items-center justify-center px-3 py-1 bg-green-100 text-green-800 font-bold text-sm rounded-md">8</span></td></tr>
                <tr className="hover:bg-green-50 transition-colors"><td className="px-6 py-3 font-medium text-slate-700">تقديم دورة كاملة</td><td className="px-6 py-3 text-center"><span className="inline-flex items-center justify-center px-3 py-1 bg-green-100 text-green-800 font-bold text-sm rounded-md">20</span></td></tr>
                <tr className="hover:bg-green-50 transition-colors"><td className="px-6 py-3 font-medium text-slate-700">تنظيم/تطوع في حدث (شِفت)</td><td className="px-6 py-3 text-center"><span className="inline-flex items-center justify-center px-3 py-1 bg-green-100 text-green-800 font-bold text-sm rounded-md">5/شفت</span></td></tr>
                <tr className="hover:bg-green-50 transition-colors"><td className="px-6 py-3 font-medium text-slate-700">المساهمة في تصميم معتمد</td><td className="px-6 py-3 text-center"><span className="inline-flex items-center justify-center px-3 py-1 bg-green-100 text-green-800 font-bold text-sm rounded-md">6</span></td></tr>
                <tr className="hover:bg-green-50 transition-colors"><td className="px-6 py-3 font-medium text-slate-700">كتابة مقال/فيديو تعليمي معتمد</td><td className="px-6 py-3 text-center"><span className="inline-flex items-center justify-center px-3 py-1 bg-green-100 text-green-800 font-bold text-sm rounded-md">10</span></td></tr>
                <tr className="hover:bg-green-50 transition-colors"><td className="px-6 py-3 font-medium text-slate-700">المشاركة في مشروع عملي مُعلن</td><td className="px-6 py-3 text-center"><span className="inline-flex items-center justify-center px-3 py-1 bg-green-100 text-green-800 font-bold text-sm rounded-md">10</span></td></tr>
              </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Department Activities Section */}
        <section className="mb-12">
          <div className="bg-gradient-to-br from-yellow-50 to-slate-50 rounded-2xl p-8 border border-yellow-100">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-yellow-500 to-amber-600 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-slate-900">
                أنواع الأنشطة والنقاط الأساسية (للقسم)
              </h2>
            </div>
            <div className="overflow-x-auto bg-white rounded-lg shadow-sm border border-slate-200">
              <table className="min-w-full text-right">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-3 text-sm font-semibold text-slate-700">النوع</th>
                  <th className="px-6 py-3 text-sm font-semibold text-slate-700">التعريف المختصر</th>
                  <th className="px-6 py-3 text-center text-sm font-semibold text-slate-700">النقاط الأساسية</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                <tr className="hover:bg-yellow-50 transition-colors"><td className="px-6 py-3 whitespace-nowrap font-medium text-slate-700">دورة حضورية (≥ 2 ساعات)</td><td className="px-6 py-3 text-slate-600 text-sm">تدريب وجاهي داخل الكلية/الجامعة</td><td className="px-6 py-3 text-center"><span className="inline-flex items-center justify-center px-3 py-1 bg-yellow-100 text-yellow-800 font-bold text-sm rounded-md">15</span></td></tr>
                <tr className="hover:bg-yellow-50 transition-colors"><td className="px-6 py-3 whitespace-nowrap font-medium text-slate-700">دورة أونلاين (≥ 1.5 ساعة)</td><td className="px-6 py-3 text-slate-600 text-sm">تدريب عن بُعد</td><td className="px-6 py-3 text-center"><span className="inline-flex items-center justify-center px-3 py-1 bg-yellow-100 text-yellow-800 font-bold text-sm rounded-md">9</span></td></tr>
                <tr className="hover:bg-yellow-50 transition-colors"><td className="px-6 py-3 whitespace-nowrap font-medium text-slate-700">معسكر تدريبي</td><td className="px-6 py-3 text-slate-600 text-sm">لكل يوم فعلي تدريبي (6 ساعات فأكثر)</td><td className="px-6 py-3 text-center"><span className="inline-flex items-center justify-center px-3 py-1 bg-yellow-100 text-yellow-800 font-bold text-sm rounded-md">20/يوم</span></td></tr>
                <tr className="hover:bg-yellow-50 transition-colors"><td className="px-6 py-3 whitespace-nowrap font-medium text-slate-700">لقاء تقني/جلسة شهرية</td><td className="px-6 py-3 text-slate-600 text-sm">جلسة تبادل معرفة/نقاش</td><td className="px-6 py-3 text-center"><span className="inline-flex items-center justify-center px-3 py-1 bg-yellow-100 text-yellow-800 font-bold text-sm rounded-md">6</span></td></tr>
                <tr className="hover:bg-yellow-50 transition-colors"><td className="px-6 py-3 whitespace-nowrap font-medium text-slate-700">مسابقة داخلية (تنظيم)</td><td className="px-6 py-3 text-slate-600 text-sm">مسابقة ينظمها القسم</td><td className="px-6 py-3 text-center"><span className="inline-flex items-center justify-center px-3 py-1 bg-yellow-100 text-yellow-800 font-bold text-sm rounded-md">12</span></td></tr>
                <tr className="hover:bg-yellow-50 transition-colors"><td className="px-6 py-3 whitespace-nowrap font-medium text-slate-700">مشاركة بمسابقة خارجية</td><td className="px-6 py-3 text-slate-600 text-sm">يُحتسب للقسم مرة واحدة لكل فريق ممثل</td><td className="px-6 py-3 text-center"><span className="inline-flex items-center justify-center px-3 py-1 bg-yellow-100 text-yellow-800 font-bold text-sm rounded-md">10</span></td></tr>
                <tr className="hover:bg-yellow-50 transition-colors"><td className="px-6 py-3 whitespace-nowrap font-medium text-slate-700">مشروع عملي/منتج</td><td className="px-6 py-3 text-slate-600 text-sm">تسليم مشروع مع مستودع عام + عرض</td><td className="px-6 py-3 text-center"><span className="inline-flex items-center justify-center px-3 py-1 bg-yellow-100 text-yellow-800 font-bold text-sm rounded-md">20</span></td></tr>
                <tr className="hover:bg-yellow-50 transition-colors"><td className="px-6 py-3 whitespace-nowrap font-medium text-slate-700">فعالية تعريفية/جناح</td><td className="px-6 py-3 text-slate-600 text-sm">ركن/تعريف بالنادي داخل الجامعة</td><td className="px-6 py-3 text-center"><span className="inline-flex items-center justify-center px-3 py-1 bg-yellow-100 text-yellow-800 font-bold text-sm rounded-md">8</span></td></tr>
                <tr className="hover:bg-yellow-50 transition-colors"><td className="px-6 py-3 whitespace-nowrap font-medium text-slate-700">شراكة/رعاية</td><td className="px-6 py-3 text-slate-600 text-sm">اتفاق يدعم نشاط/جوائز/مكان</td><td className="px-6 py-3 text-center"><span className="inline-flex items-center justify-center px-3 py-1 bg-yellow-100 text-yellow-800 font-bold text-sm rounded-md">15-30</span></td></tr>
                <tr className="hover:bg-yellow-50 transition-colors"><td className="px-6 py-3 whitespace-nowrap font-medium text-slate-700">محتوى تعليمي منشور</td><td className="px-6 py-3 text-slate-600 text-sm">مقال/فيديو تحت هوية النادي</td><td className="px-6 py-3 text-center"><span className="inline-flex items-center justify-center px-3 py-1 bg-yellow-100 text-yellow-800 font-bold text-sm rounded-md">10</span></td></tr>
              </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default PointsSystemPage;