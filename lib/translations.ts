export type Language = 'en' | 'ar';

export const resources = {
  en: {
    translation: {
      // Hero Section
      "hero.title.performance": "Performance",
      "hero.title.leaderboard": "Leaderboard",
      "hero.subtitle": "Track, compete, and celebrate achievements across our community. Real-time rankings and comprehensive performance metrics.",
      "hero.viewAllMembers": "View All Members",
      "hero.viewDepartments": "View Departments",
      
      // Stats Cards
      "stats.members.title": "Members",
      "stats.members.description": "Competing participants",
      "stats.members.badge": "Active",
      "stats.departments.title": "Departments", 
      "stats.departments.description": "Active teams",
      "stats.departments.badge": "Teams",
      "stats.points.title": "Points",
      "stats.points.description": "Points earned",
      "stats.points.badge": "Total",
      "stats.events.title": "Events",
      "stats.events.description": "Total events",
      "stats.events.badge": "Active",
      
      // Leaderboard Section
      "leaderboard.badge": "Live Rankings",
      "leaderboard.title": "Current Leaders",
      "leaderboard.subtitle": "Top performers across all categories, updated in real-time",
      "leaderboard.topMembers": "Top Members",
      "leaderboard.topDepartments": "Top Departments",
      "leaderboard.viewAll": "View All",
      "leaderboard.specializedDepts": "Specialized departments",
      "leaderboard.administrativeDepts": "Administrative departments",
      "leaderboard.points": "Points",
      "leaderboard.viewDetails": "View Details",
      "leaderboard.details": "Details",
      
      // Footer CTA
      "footer.title": "Ready to Climb the Ranks?",
      "footer.subtitle": "Join events, earn points, and see your name rise on the leaderboard",
      "footer.button": "View Upcoming Events",
      
      // Events Section
      "events.badge": "Open Events",
      "events.title": "Join Our Events",
      "events.subtitle": "Participate in exciting events and earn points to climb the leaderboard",
      "events.loading": "Loading events...",
      "events.empty": "No open events at the moment",
      "events.viewAll": "View All Events",
      
      // Navigation
      "nav.home": "Home",
      "nav.members": "Members",
      "nav.departments": "Departments",
      "nav.events": "Events",
      "nav.magazines": "Magazines",
      "nav.structure": "Structure",
      "nav.howItWorks": "How It Works",
      
      // Members Page
      "members.backButton": "Back to Dashboard",
      "members.heading": "Members Leaderboard",
      "members.subHeading": "members ranked by total points earned through various activities and achievements",
      "members.findMembers": "Find Members",
      "members.searchPlaceholder": "Search members by name...",
      "members.rankings": "Rankings",
      "members.performance": "Individual member performance rankings",
      "members.showingTop": "Showing top 100 members",
      "members.of": "of",
      "members.found": "members found",
      "members.noResults": "No members found matching",
      "members.clearSearch": "Clear Search",
      "members.noMembers": "No members available",
      
      // Events Page
      "events.heading": "Events",
      "events.subHeading": "Discover upcoming events, sign up for open registrations, and explore past events",
      "events.openEvents": "Open Events",
      "events.pastEvents": "Past Events",
      "events.noOpenEvents": "There are currently no events available for signups. Check back soon!",
      "events.noPastEvents": "Past events will appear here once they are completed.",
      
      // Departments Page
      "departments.backButton": "Back to Dashboard",
      "departments.heading": "Departments Leaderboard",
      "departments.subHeading": "departments ranked by total points earned through team collaboration and achievements",
      "departments.administrative": "Administrative Departments",
      "departments.administrativeDesc": "Support and management teams",
      "departments.specialized": "Specialized Departments",
      "departments.specializedDesc": "Hands-on and technical teams",
      
      // Magazines Page
      "magazines.backButton": "Back to Dashboard",
      "magazines.heading": "GDG Magazines",
      "magazines.noMagazines.title": "No magazines available",
      "magazines.noMagazines.desc": "Check back soon for new magazine releases featuring the latest in technology and development.",
      "magazines.pages": "pages",
      "magazines.readPDF": "Read PDF",
      
      // Magazines Section (Home)
      "magazines.section.title": "Latest Magazines",
      "magazines.section.subtitle": "Explore our latest publications and stay updated with the community",
      "magazines.section.viewAll": "View All",
      "magazines.section.empty": "No magazines available yet",
      
      // Auth
      "auth.login": "Log In",
      "auth.signup": "Sign Up",
      
      // Attendance Page
      "attendance.processing": "Processing...",
      "attendance.markingAttendance": "Marking attendance...",
      "attendance.confirmed": "Attendance Confirmed",
      "attendance.failed": "Attendance Failed",
      "attendance.invalidLink": "Invalid Link",
      "attendance.signInRequired": "Sign In Required",
      "attendance.success": "Your attendance has been marked successfully!",
      "attendance.noToken": "No attendance token provided. Please use the QR code or link provided by the event organizer.",
      "attendance.pleaseSignIn": "Please sign in to mark your attendance.",
      "attendance.notEligible": "You are not eligible to mark attendance for this event.",
      "attendance.expired": "The attendance link has expired or is invalid. Please request a new one from the event organizer.",
      "attendance.serverError": "A server error occurred. Please try again later.",
      "attendance.connectionError": "Failed to connect to the server. Please check your internet connection and try again.",
      "attendance.dialog.title": "Sign In Required",
      "attendance.dialog.description": "You need to sign in or create an account to mark your attendance.",
      
      // Common
      "version": "2.0"
    }
  },
  // we always use the saudi arabian dialect for arabic words and phrases
  ar: {
    translation: {
      // Hero Section
      "hero.title.performance": "والرب يبارك",
      "hero.title.leaderboard": "الجميع",
      "hero.subtitle": "تابع إنجازاتك وتحدى أصدقائك واحتفل بالنجاح مع مجتمعنا السعودي. تصنيفات مباشرة ونتائج لحظية!",
      "hero.viewAllMembers": "شوف كل الأعضاء",
      "hero.viewDepartments": "شوف الأقسام",

      // Stats Cards  
      "stats.members.title": "الأعضاء",
      "stats.members.description": "أبطال التحدي",
      "stats.members.badge": "فعّال",
      "stats.departments.title": "الأقسام",
      "stats.departments.description": "فرقنا القوية",
      "stats.departments.badge": "فريق",
      "stats.points.title": "النقاط",
      "stats.points.description": "نقاطك المكتسبة",
      "stats.points.badge": "الإجمالي",
      "stats.events.title": "الفعاليات",
      "stats.events.description": "إجمالي الفعاليات",
      "stats.events.badge": "فعّال",

      // Leaderboard Section
      "leaderboard.title": "المتصدرين الآن",
      "leaderboard.subtitle": "شوف أفضل المنافسين في كل الفئات، التحديث لحظي",
      "leaderboard.topMembers": "أقوى الأعضاء",
      "leaderboard.topDepartments": "أقوى الأقسام",
      "leaderboard.viewAll": "الكل",
      "leaderboard.specializedDepts": "الأقسام التخصصية",
      "leaderboard.administrativeDepts": "الأقسام الإدارية",
      "leaderboard.points": "نقاط",
      "leaderboard.viewDetails": "التفاصيل",
      "leaderboard.details": "التفاصيل",

      // Events Section
      "events.badge": "فعاليات مفتوحة",
      "events.title": "شارك في فعالياتنا",
      "events.subtitle": "عيش الحماس، شارك واكسب نقاط وتصدر القائمة!",
      "events.loading": "جاري تحميل الفعاليات...",
      "events.empty": "ما عندنا فعاليات متاحة حاليًا بس خلك قريب ترا فعاليتنا واجد 😉",
      "events.viewAll": "شوف كل الفعاليات",

      // Navigation
      "nav.home": "الرئيسية",
      "nav.members": "الأعضاء",
      "nav.departments": "الأقسام",
      "nav.events": "الفعاليات",
      "nav.magazines": "المجلات",
      "nav.structure": "الهيكل",
      "nav.howItWorks": "طريقة العمل",

      // Footer CTA
      "footer.title": "جاهز تتصدر؟",
      "footer.subtitle": "شارك في الفعاليات، اجمع النقاط، وخلك دايم في القمة!",
      "footer.button": "شوف الفعاليات الجاية",
      
      // Members Page
      "members.backButton": "العودة للوحة التحكم",
      "members.heading": "قائمة الأعضاء",
      "members.subHeading": "عضو مرتبين حسب النقاط المكتسبة من خلال الأنشطة والإنجازات المختلفة",
      "members.findMembers": "ابحث عن الأعضاء",
      "members.searchPlaceholder": "ابحث عن الأعضاء بالاسم...",
      "members.rankings": "الترتيب",
      "members.performance": "ترتيب أداء الأعضاء الفردي",
      "members.showingTop": "عرض أفضل 100 عضو",
      "members.of": "من",
      "members.found": "عضو",
      "members.noResults": "ما لقينا أعضاء يطابقون",
      "members.clearSearch": "امسح البحث",
      "members.noMembers": "ما فيه أعضاء متاحين",
      
      // Events Page
      "events.heading": "الفعاليات",
      "events.subHeading": "اكتشف الفعاليات القادمة، سجل في الفعاليات المفتوحة، واستكشف الفعاليات السابقة",
      "events.openEvents": "الفعاليات المفتوحة",
      "events.pastEvents": "الفعاليات السابقة",
      "events.noOpenEvents": "ما فيه فعاليات متاحة للتسجيل حالياً. ارجع بعدين!",
      "events.noPastEvents": "الفعاليات السابقة راح تظهر هنا بعد ما تنتهي.",
      
      // Departments Page
      "departments.backButton": "العودة للوحة التحكم",
      "departments.heading": "قائمة الأقسام",
      "departments.subHeading": "قسم مرتبين حسب النقاط المكتسبة من خلال التعاون والإنجازات الجماعية",
      "departments.administrative": "الأقسام الإدارية",
      "departments.administrativeDesc": "فرق الدعم والإدارة",
      "departments.specialized": "الأقسام التخصصية",
      "departments.specializedDesc": "الفرق العملية والتقنية",
      
      // Magazines Page
      "magazines.backButton": "العودة للوحة التحكم",
      "magazines.heading": "مجلات GDG",
      "magazines.noMagazines.title": "ما فيه مجلات متاحة",
      "magazines.noMagazines.desc": "ارجع بعدين لإصدارات المجلات الجديدة اللي تحتوي على آخر التقنيات والتطوير.",
      "magazines.pages": "صفحة",
      "magazines.readPDF": "اقرأ PDF",
      
      // Magazines Section (Home)
      "magazines.section.title": "آخر المجلات",
      "magazines.section.subtitle": "اطلع على آخر إصداراتنا وخلك متابع مع المجتمع",
      "magazines.section.viewAll": "شوف كل المجلات",
      "magazines.section.empty": "ما فيه مجلات متاحة حالياً",

      // Auth
      "auth.login": "تسجيل الدخول",
      "auth.signup": "إنشاء حساب",

      // Attendance Page
      "attendance.processing": "جاري المعالجة...",
      "attendance.markingAttendance": "جاري تسجيل الحضور...",
      "attendance.confirmed": "تم تأكيد الحضور",
      "attendance.failed": "فشل تسجيل الحضور",
      "attendance.invalidLink": "رابط غير صالح",
      "attendance.signInRequired": "تسجيل الدخول مطلوب",
      "attendance.success": "تم تسجيل حضورك بنجاح!",
      "attendance.noToken": "ما فيه رمز حضور. استخدم رمز QR أو الرابط اللي أعطاك إياه منظم الفعالية.",
      "attendance.pleaseSignIn": "سجل دخول عشان تسجل حضورك.",
      "attendance.notEligible": "ما تقدر تسجل حضورك لهذي الفعالية.",
      "attendance.expired": "رابط الحضور منتهي أو غير صالح. اطلب رابط جديد من منظم الفعالية.",
      "attendance.serverError": "صار خطأ في السيرفر. جرب مرة ثانية بعدين.",
      "attendance.connectionError": "ما قدرنا نتصل بالسيرفر. تأكد من الإنترنت وجرب مرة ثانية.",
      "attendance.dialog.title": "تسجيل الدخول مطلوب",
      "attendance.dialog.description": "لازم تسجل دخول أو تسوي حساب عشان تسجل حضورك.",

      // Common
      "version": "2.0"
    }
  }
};
