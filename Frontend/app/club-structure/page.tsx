"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, Crown, Shield, Cog, Palette, Bot, Calendar, Megaphone, Lightbulb, Trophy } from "lucide-react"

export default function ClubStructurePage() {
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
    departments: [
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
      },
      {
        title: "التقنية",
        color: "blue",
        icon: Cog,
        head: "عبدالاله عبدالعزيز البراك",
        members: [
          "إبراهيم سليمان السكيتي",
          "علي حسين الصابر",
          "ريما عبدالرحمن اللهيميد"
        ]
      },
      {
        title: "الروبوتات",
        color: "yellow",
        icon: Bot,
        head: "شذى خالد الحربي",
        members: [
          "رهف علي الحربي",
          "ريما صالح الحربي",
          "ابتهال مهدي العمري",
          "مزنة صافي الدين عبدالقادر",
          "رغد عيدالله العبيد"
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
        head: "صفية جلال ريحان",
        members: [
          "غادة محمد الفايز",
          "غادة حمد العمران",
          "تالا صالح المزيني"
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
          "أسماء حامد الطريفي"
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
        head: "أحمد فيصل الحجيلان",
        members: [
          "ياسمين حمود التويجري",
          "عبدالله غازي المطيري",
          "خولة سعود البشري",
          "أميرة عيد المطيري"
        ]
      },
      //
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
    <>
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
      
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/40 to-red-50/30 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/8 rounded-full mix-blend-multiply filter blur-xl animate-bounce"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-red-500/8 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-yellow-500/8 rounded-full mix-blend-multiply filter blur-xl animate-spin"></div>
        <div className="absolute top-20 left-20 w-60 h-60 bg-green-500/8 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
      </div>

      {/* Header */}
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800">
        {/* Google-style geometric patterns */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_50%,rgba(66,133,244,0.3),transparent_50%)]"></div>
          <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_80%_20%,rgba(52,168,83,0.2),transparent_50%)]"></div>
          <div className="absolute bottom-0 left-0 w-full h-full bg-[radial-gradient(circle_at_40%_90%,rgba(251,188,4,0.2),transparent_50%)]"></div>
          <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_60%_80%,rgba(234,67,53,0.2),transparent_50%)]"></div>
        </div>
        
        {/* Subtle geometric shapes */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-1/4 w-20 h-20 border-2 border-white rotate-45 rounded-lg"></div>
          <div className="absolute top-3/4 right-1/4 w-16 h-16 border-2 border-white rounded-full"></div>
          <div className="absolute top-1/2 right-1/3 w-12 h-12 bg-white rounded-lg transform rotate-12"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center space-y-8">
            <div className="inline-flex items-center gap-3 bg-white/15 backdrop-blur-sm rounded-full px-8 py-4 border border-white/25 shadow-xl hover:bg-white/20 transition-all duration-300 hover:scale-105">
              <Users className="h-6 w-6 text-white animate-pulse" />
              <span className="text-white text-base font-semibold">Organization Structure</span>
            </div>
            
            <div className="space-y-6">
              <h1 className="text-5xl md:text-7xl font-black bg-gradient-to-r from-white via-blue-100 to-green-100 bg-clip-text text-transparent leading-tight tracking-tight">
                هيكلة المجموعة
              </h1>
              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-xl hover:shadow-2xl hover:scale-110 transition-all duration-500 group border-4 border-white/20">
                  <svg viewBox="0 0 24 24" className="w-8 h-8 text-blue-600 group-hover:rotate-12 transition-transform duration-300">
                    <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                </div>
                <span className="text-2xl font-bold text-white drop-shadow-lg">Google Developer Groups</span>
              </div>
              
            </div>
            
            <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto font-medium leading-relaxed drop-shadow-sm">
              تعرف على الهيكل التنظيمي لنادي مطوري قوقل والأقسام المختلفة
            </p>
          </div>
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Google-themed background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Google color patterns */}
          <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-blue-500/5 to-blue-600/10 rounded-full blur-xl"></div>
          <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-br from-red-500/5 to-red-600/10 rounded-full blur-lg"></div>
          <div className="absolute bottom-40 left-20 w-28 h-28 bg-gradient-to-br from-yellow-500/5 to-amber-500/10 rounded-full blur-xl"></div>
          <div className="absolute bottom-20 right-10 w-20 h-20 bg-gradient-to-br from-green-500/5 to-green-600/10 rounded-full blur-lg"></div>
          
          {/* Floating Google-themed emojis and icons */}
          <div className="absolute top-24 left-20 text-4xl animate-bounce opacity-20 hover:opacity-60 transition-opacity duration-300">🤖</div>
          <div className="absolute top-1/3 right-32 text-3xl animate-pulse opacity-25 hover:opacity-70 transition-opacity duration-300">💡</div>
          <div className="absolute bottom-1/4 left-16 text-5xl animate-float opacity-15 hover:opacity-50 transition-opacity duration-300">⚡</div>
          <div className="absolute top-40 right-1/4 text-3xl opacity-20 hover:opacity-60 transition-opacity duration-300" style={{animation: 'float 6s ease-in-out infinite'}}>🔧</div>
          <div className="absolute bottom-1/3 right-20 text-4xl animate-pulse opacity-18 hover:opacity-55 transition-opacity duration-300">🎨</div>
          <div className="absolute top-1/2 left-32 text-3xl opacity-22 hover:opacity-65 transition-opacity duration-300" style={{animation: 'float 8s ease-in-out infinite reverse'}}>🚀</div>
          <div className="absolute bottom-20 left-1/3 text-3xl animate-bounce opacity-16 hover:opacity-45 transition-opacity duration-300">🌟</div>
          <div className="absolute top-60 right-1/3 text-4xl opacity-20 hover:opacity-60 transition-opacity duration-300" style={{animation: 'float 7s ease-in-out infinite'}}>💻</div>
          
          {/* Floating Google Logo SVG elements */}
          <div className="absolute top-32 left-1/2 opacity-8 hover:opacity-30 transition-opacity duration-300" style={{animation: 'float 10s ease-in-out infinite'}}>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" opacity="0.4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" opacity="0.4"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" opacity="0.4"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" opacity="0.4"/>
            </svg>
          </div>
          
          <div className="absolute bottom-32 right-1/2 opacity-10 hover:opacity-35 transition-opacity duration-300" style={{animation: 'float 12s ease-in-out infinite reverse'}}>
            <svg width="35" height="35" viewBox="0 0 24 24" fill="none">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" opacity="0.5"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" opacity="0.5"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" opacity="0.5"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" opacity="0.5"/>
            </svg>
          </div>
          
          {/* Geometric Google-style shapes with enhanced animations */}
          <div className="absolute top-32 left-1/4 w-16 h-16 border-2 border-blue-500/15 rotate-45 rounded-lg hover:border-blue-500/40 transition-colors duration-300" style={{animation: 'float 9s ease-in-out infinite'}}></div>
          <div className="absolute top-1/2 right-1/4 w-12 h-12 border-2 border-red-500/15 rounded-full hover:border-red-500/40 transition-colors duration-300" style={{animation: 'pulse 4s ease-in-out infinite'}}></div>
          <div className="absolute bottom-1/3 left-1/3 w-14 h-14 border-2 border-yellow-500/15 rotate-12 rounded-lg hover:border-yellow-500/40 transition-colors duration-300" style={{animation: 'float 11s ease-in-out infinite reverse'}}></div>
          <div className="absolute top-2/3 right-1/3 w-10 h-10 border-2 border-green-500/15 rounded-full hover:border-green-500/40 transition-colors duration-300" style={{animation: 'bounce 3s ease-in-out infinite'}}></div>
          
          {/* Interactive floating code symbols */}
          <div className="absolute top-28 right-40 text-2xl opacity-12 hover:opacity-40 transition-all duration-300 hover:scale-125" style={{animation: 'float 14s ease-in-out infinite'}}>&lt;/&gt;</div>
          <div className="absolute bottom-28 left-40 text-3xl opacity-15 hover:opacity-45 transition-all duration-300 hover:scale-110" style={{animation: 'float 13s ease-in-out infinite reverse'}}>{ }</div>
          <div className="absolute top-1/2 right-16 text-2xl opacity-18 hover:opacity-50 transition-all duration-300 hover:scale-120" style={{animation: 'pulse 5s ease-in-out infinite'}}>( )</div>
          
          {/* Subtle grid pattern */}
          <div className="absolute inset-0 opacity-[0.02]" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(66,133,244,0.3) 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}></div>
          
          {/* Flowing Google-colored gradients */}
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-50/30 via-transparent to-transparent"></div>
          <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-red-50/20 via-transparent to-transparent"></div>
          <div className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-tr from-yellow-50/20 via-transparent to-transparent"></div>
          <div className="absolute bottom-0 right-0 w-full h-full bg-gradient-to-tl from-green-50/20 via-transparent to-transparent"></div>
        </div>

        {/* Club Structure */}
        <div className="space-y-16 relative z-10">
          
          {/* Presidents Section */}
          <div className="text-center group relative">
            {/* Decorative background for this section */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-50/20 via-purple-50/20 to-indigo-50/20 rounded-3xl blur-3xl transform -rotate-1 scale-110 opacity-60"></div>
            
            <Card className="inline-block bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-700 border-0 shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-3 hover:rotate-1 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute top-4 right-4 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
              <div className="absolute -bottom-2 -left-2 w-20 h-20 bg-yellow-400/20 rounded-full blur-lg"></div>
              <CardHeader className="pb-6 relative z-10">
                <CardTitle className="text-white flex items-center gap-4 justify-center text-2xl font-bold">
                  <Crown className="h-8 w-8 text-yellow-300" />
                  {clubData.president.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 relative z-10 pb-8">
                {clubData.president.members.map((member, index) => (
                  <div key={index} className="bg-white/20 backdrop-blur-sm rounded-xl px-6 py-4 hover:bg-white/30 transition-all duration-300 transform hover:scale-105 border border-white/10">
                    <p className="text-white font-bold text-lg">{member}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Vice President */}
          <div className="text-center group flex justify-center relative">
            {/* Decorative background for this section */}
            <div className="absolute inset-0 bg-gradient-to-r from-green-50/20 via-emerald-50/20 to-teal-50/20 rounded-3xl blur-3xl transform rotate-1 scale-110 opacity-60"></div>
            
            <Card className="inline-block bg-gradient-to-br from-green-600 via-green-700 to-emerald-700 border-0 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 hover:-rotate-1 relative overflow-hidden min-w-[320px]">
              <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-emerald-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute bottom-4 left-4 w-20 h-20 bg-white/10 rounded-full blur-lg"></div>
              <div className="absolute top-2 right-2 w-16 h-16 bg-blue-400/20 rounded-full blur-md"></div>
              <CardHeader className="pb-6 relative z-10">
                <CardTitle className="text-white flex items-center gap-4 justify-center text-xl font-bold">
                  <Shield className="h-7 w-7 text-blue-300" />
                  {clubData.vicePresident.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="relative z-10 pb-8 flex justify-center">
                <div className="bg-white/20 backdrop-blur-sm rounded-xl px-6 py-4 hover:bg-white/30 transition-all duration-300 transform hover:scale-105 border border-white/10 w-full max-w-xs text-center">
                  <p className="text-white font-bold text-lg">{clubData.vicePresident.members[0]}</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Departments Grid */}
          <div className="relative">
            {/* Background decoration for departments grid */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-50/50 via-blue-50/30 to-red-50/30 rounded-3xl blur-2xl opacity-40"></div>
            <div className="absolute top-10 left-10 w-40 h-40 bg-gradient-to-br from-blue-500/8 to-purple-500/8 rounded-full blur-2xl"></div>
            <div className="absolute bottom-10 right-10 w-32 h-32 bg-gradient-to-br from-red-500/8 to-pink-500/8 rounded-full blur-2xl"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 relative z-10">
            {clubData.departments.map((dept, index) => (
              <Card key={index} className={`
                group overflow-hidden border-0 shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-3 hover:scale-105 relative
                ${dept.color === 'green' ? 'bg-gradient-to-br from-green-500 via-green-600 to-emerald-700' :
                  dept.color === 'blue' ? 'bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700' :
                  dept.color === 'yellow' ? 'bg-gradient-to-br from-yellow-500 via-amber-500 to-orange-600' :
                  dept.color === 'orange' ? 'bg-gradient-to-br from-orange-500 via-red-500 to-red-600' :
                  'bg-gradient-to-br from-red-500 via-red-600 to-pink-600'}
                hover:rotate-2 rounded-3xl
              `}>
                {/* Enhanced floating orbs with Google colors */}
                <div className="absolute top-6 right-6 w-16 h-16 bg-white/15 rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute bottom-6 left-6 w-12 h-12 bg-yellow-300/20 rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                <div className="absolute top-1/2 left-1/2 w-8 h-8 bg-blue-300/15 rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
                
                <CardHeader className="pb-6 relative z-10 pt-8">
                  <CardTitle className="text-white flex items-center gap-4 text-xl font-bold group-hover:scale-105 transition-transform duration-300">
                    <dept.icon className="h-7 w-7 bg-white/20 p-1 rounded-lg" />
                    {dept.title}
                  </CardTitle>
                  <div className="bg-white/25 backdrop-blur-sm rounded-2xl px-4 py-3 mt-4 hover:bg-white/35 transition-all duration-300 transform hover:scale-105 border border-white/20 shadow-lg">
                    <p className="text-white/90 font-semibold text-sm">رئيس القسم:</p>
                    <p className="text-white font-bold text-lg mt-1">{dept.head}</p>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3 relative z-10 pb-8">
                  <p className="text-white/95 font-bold text-base mb-4 flex items-center gap-3 bg-white/15 rounded-xl px-4 py-2">
                    <Users className="h-5 w-5" />
                    أعضاء القسم:
                  </p>
                  {dept.members.map((member, memberIndex) => (
                    <div key={memberIndex} className="bg-white/20 backdrop-blur-sm rounded-2xl px-4 py-3 hover:bg-white/30 transition-all duration-300 transform hover:scale-105 hover:translate-x-2 border border-white/10 shadow-md">
                      <div className="text-white font-semibold text-base flex items-center gap-3">
                        <div className="w-3 h-3 bg-white rounded-full shadow-sm"></div>
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
    </>
  )
}