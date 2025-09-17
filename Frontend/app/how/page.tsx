import React from 'react';

const PointsSystemPage = () => {
  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center gap-4">
            {/* Google Developer Groups Logo Pattern */}
            <div className="flex gap-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="relative w-12 h-12">
                  <div className="absolute top-0 left-0 w-6 h-6 bg-red-500 rounded-tl-full"></div>
                  <div className="absolute top-0 right-0 w-6 h-6 bg-yellow-500 rounded-tr-full"></div>
                  <div className="absolute bottom-0 left-0 w-6 h-6 bg-green-500 rounded-bl-full"></div>
                  <div className="absolute bottom-0 right-0 w-6 h-6 bg-blue-500 rounded-br-full"></div>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-blue-600 rounded-full"></div>
                </div>
              ))}
            </div>
            
            <div className="text-right">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                نظام النقاط
              </h1>
              <p className="text-gray-600 mt-1">
                للنادي الطلابي ممثلة بمجموعة قوقل
              </p>
              <p className="text-sm text-gray-500">
                Google Developer Groups - On Campus Qassim University
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* General Idea Section */}
        <div className="mb-8">
          <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4">
            الفكرة العامة
          </h2>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-center gap-2">
                <span>•</span>
                <span>فيه نقاط للأقسام (نقاط قسم) وفيه نقاط للأعضاء (نقاط عضو).</span>
              </li>
              <li className="flex items-center gap-2">
                <span>•</span>
                <span>الهدف مكافأة الأفراد والجودة.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Members Activities Section */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row items-center justify-between mb-6">
            <h2 className="text-xl md:text-2xl font-bold text-green-700 mb-4 md:mb-0">
              🍀 نقاط الأعضاء (حضور - مشاركة - تنظيم)
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {/* Activities */}
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-800 bg-green-200 px-3 py-2 rounded">
                النوع
              </h3>
              
              <div className="space-y-3">
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <div className="text-gray-700">تقديم جلسة قصيرة (20 دقيقة)</div>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <div className="text-gray-700">تقديم دورة كاملة</div>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <div className="text-gray-700">تنظيم / تطوير و تحديث (هدف)</div>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <div className="text-gray-700">المساعدة في تصميم محتوى</div>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <div className="text-gray-700">كتابة مقال/فيديو تعليمي مفيد</div>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <div className="text-gray-700">المشاركة في مشروع عملي فعال</div>
                </div>
              </div>
            </div>

            {/* Basic Points for Division */}
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-800 bg-yellow-200 px-3 py-2 rounded">
                النقاط الأساسية للقسم
              </h3>
              
              <div className="space-y-3">
                <div className="bg-green-100 border border-green-200 rounded-lg p-4">
                  <div className="font-semibold text-green-800">8 نقاط</div>
                </div>
                <div className="bg-green-100 border border-green-200 rounded-lg p-4">
                  <div className="font-semibold text-green-800">20 نقطة</div>
                </div>
                <div className="bg-green-100 border border-green-200 rounded-lg p-4">
                  <div className="font-semibold text-green-800">لكل شهرين 5 نقاط</div>
                </div>
                <div className="bg-green-100 border border-green-200 rounded-lg p-4">
                  <div className="font-semibold text-green-800">6 نقاط</div>
                </div>
                <div className="bg-green-100 border border-green-200 rounded-lg p-4">
                  <div className="font-semibold text-green-800">10 نقاط</div>
                  <div className="text-sm text-green-700">حد أدنى 2 شهريا للفرد</div>
                </div>
                <div className="bg-green-100 border border-green-200 rounded-lg p-4">
                  <div className="font-semibold text-green-800">10 نقاط</div>
                </div>
              </div>
            </div>



            {/* Activities */}
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-800 bg-green-200 px-3 py-2 rounded">
                النوع
              </h3>
              
              <div className="space-y-3">
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <div className="text-gray-700">تقديم جلسة قصيرة (20 دقيقة)</div>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <div className="text-gray-700">تقديم دورة كاملة</div>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <div className="text-gray-700">تنظيم / تطوير و تحديث (هدف)</div>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <div className="text-gray-700">المساعدة في تصميم محتوى</div>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <div className="text-gray-700">كتابة مقال/فيديو تعليمي مفيد</div>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <div className="text-gray-700">المشاركة في مشروع عملي فعال</div>
                </div>
              </div>
            </div>

            {/* Basic Points for Division */}
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-800 bg-green-200 px-3 py-2 rounded">
                النقاط الأساسية للقسم
              </h3>
              
              <div className="space-y-3">
                <div className="bg-green-100 border border-green-200 rounded-lg p-4">
                  <div className="font-semibold text-green-800">6 نقاط</div>
                </div>
                <div className="bg-green-100 border border-green-200 rounded-lg p-4">
                  <div className="font-semibold text-green-800">4 نقاط</div>

                </div>
                <div className="bg-green-100 border border-green-200 rounded-lg p-4">
                  <div className="font-semibold text-green-800">يوم/10نقاط</div>
                </div>
                <div className="bg-green-100 border border-green-200 rounded-lg p-4">
                  <div className="font-semibold text-green-800">3 نقاط</div>
                </div>
                <div className="bg-green-100 border border-green-200 rounded-lg p-4">
                  <div className="font-semibold text-green-800">6 نقاط</div>
                </div>
                <div className="bg-green-100 border border-green-200 rounded-lg p-4">
                  <div className="font-semibold text-green-800">12 نقطة</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Basic Activities Section */}
        <div className="mb-8">
          <h2 className="text-xl md:text-2xl font-bold text-blue-700 mb-6">
            ✳️ أنواع الأنشطة والنقاط الأساسية للقسم
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-3">
              <h3 className="font-semibold text-gray-800">النقاط الأساسية للقسم</h3>
              <div className="space-y-2">
                <div className="bg-blue-100 border border-blue-200 rounded-lg p-3">
                  <div className="font-semibold text-blue-800">10 نقاط /شهر</div>
                  <div className="text-xs text-blue-600">(حد أدنى 2 شهريا للقسم)</div>
                </div>
                <div className="bg-blue-100 border border-blue-200 rounded-lg p-3">
                  <div className="font-semibold text-blue-800">10 نقاط (المشاركة)</div>
                </div>
                <div className="bg-blue-100 border border-blue-200 rounded-lg p-3">
                  <div className="font-semibold text-blue-800">20 نقطة</div>
                </div>
                <div className="bg-blue-100 border border-blue-200 rounded-lg p-3">
                  <div className="font-semibold text-blue-800">8 نقاط</div>
                </div>
                <div className="bg-blue-100 border border-blue-200 rounded-lg p-3">
                  <div className="font-semibold text-blue-800">30-15 نقطة (حسب الدليل)</div>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="font-semibold text-gray-800">النوع</h3>
              <div className="space-y-2">
                <div className="bg-white border border-gray-200 rounded-lg p-3">
                  <div className="text-sm text-gray-700">محتوى تعليمي مشترك</div>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg p-3">
                  <div className="text-sm text-gray-700">مشاركة بمسابقة خارجية</div>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg p-3">
                  <div className="text-sm text-gray-700">مشروع عملي/محتوى</div>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg p-3">
                  <div className="text-sm text-gray-700">فعالية تعريفية/حفاج</div>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg p-3">
                  <div className="text-sm text-gray-700">مشاركة/خارجية</div>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="font-semibold text-gray-800">النقاط الأساسية للقسم</h3>
              <div className="space-y-2">
                <div className="bg-blue-100 border border-blue-200 rounded-lg p-3">
                  <div className="font-semibold text-blue-800">15 نقطة</div>
                </div>
                <div className="bg-blue-100 border border-blue-200 rounded-lg p-3">
                  <div className="font-semibold text-blue-800">9 نقاط</div>
                </div>
                <div className="bg-blue-100 border border-blue-200 rounded-lg p-3">
                  <div className="font-semibold text-blue-800">20 نقطة/يوم ⚡</div>
                </div>
                <div className="bg-blue-100 border border-blue-200 rounded-lg p-3">
                  <div className="font-semibold text-blue-800">6 نقاط</div>
                </div>
                <div className="bg-blue-100 border border-blue-200 rounded-lg p-3">
                  <div className="font-semibold text-blue-800">12 نقطة</div>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="font-semibold text-gray-800">النوع</h3>
              <div className="space-y-2">
                <div className="bg-white border border-gray-200 rounded-lg p-3">
                  <div className="text-sm text-gray-700">دورة تقوية (2 س 4 ساعات)</div>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg p-3">
                  <div className="text-sm text-gray-700">دورة أونلاين (1 س 5 1 ساعة)</div>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg p-3">
                  <div className="text-sm text-gray-700">هاكسر تدريبي</div>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg p-3">
                  <div className="text-sm text-gray-700">لقاء تقني/جلسة شهرية</div>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg p-3">
                  <div className="text-sm text-gray-700">مسابقة داخلية تنظيم</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Note */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p className="text-yellow-800 flex items-center gap-2">
            <span>📝</span>
            <span className="font-semibold">ملاحظة:</span>
            مشاركة المسابقات الخارجية للقسم ترجع حسب أفضل نتيجة محققة للفريق الممثل (انظر بنود النقر).
          </p>
        </div>
      </div>

      {/* Footer Decoration */}
      <div className="h-4 bg-gradient-to-r from-red-500 via-yellow-500 via-blue-500 via-green-500 to-red-500 opacity-60"></div>
    </div>
  );
};

export default PointsSystemPage;