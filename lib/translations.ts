export type Language = 'en' | 'ar';

export const resources = {
  en: {
    translation: {
      // Hero Section
      "hero.title.performance": "GDG on Campus",
      "hero.title.leaderboard": "",
      "hero.subtitle": "Join our events, track your points, and climb to the top of the leaderboard! 🏆",
      "hero.viewAllMembers": "View All Members",
      "hero.viewDepartments": "View Departments",

      // Stats Cards
      "stats.members.title": "Members",
      "stats.members.description": "Competing participants",
      "stats.members.badge": "Active",
      "stats.departments.title": "Departments",
      "stats.departments.description": "Our Strong Teams",
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
      "leaderboard.subtitle": "Check out the top competitors across members and departments. Updated in real-time!",
      "leaderboard.topMembers": "Top Members",
      "leaderboard.topDepartments": "Top Departments",
      "leaderboard.viewAll": "View All",
      "leaderboard.specializedDepts": "Specialized departments",
      "leaderboard.administrativeDepts": "Administrative departments",
      "leaderboard.points": "Points",
      "leaderboard.viewDetails": "View Details",
      "leaderboard.details": "Details",
      "leaderboard.noMembersData": "No members data available",
      "leaderboard.noSpecializedDeptsData": "No specialized departments data available",
      "leaderboard.noAdministrativeDeptsData": "No administrative departments data available",

      // Semester
      "semester.label": "Semester",
      "semester.all": "All",

      // Footer CTA
      "footer.title": "Ready to Climb the Ranks?",
      "footer.subtitle": "Join events, earn points, and see your name rise on the leaderboard",
      "footer.button": "View Upcoming Events",

      // Events Section
      "events.badge": "Open Events",
      "events.title": "Join Our Events",
      "events.subtitle": "Experience the excitement: Join, earn points, and lead the board!",
      "events.loading": "Loading events...",
      "events.empty": "No events are currently available, but stay tuned — we have plenty on the way! 😉",
      "events.viewAll": "View All Events",

      // Navigation
      "nav.home": "Home",
      "nav.members": "Members",
      "nav.departments": "Departments",
      "nav.events": "Events",
      "nav.magazines": "Magazines",
      "nav.structure": "Structure",
      "nav.howItWorks": "Points System",
      "nav.language": "Language",
      "nav.english": "English",
      "nav.arabic": "Arabic",

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
      "members.viewYourRank": "View Your Rank",

      // Events Page
      "events.heading": "Events",
      "events.subHeading": "Discover upcoming events, sign up for open registrations, and explore past events",
      "events.openEvents": "Open Events",
      "events.pastEvents": "Past Events",
      "events.noOpenEvents": "There are currently no events available for signups. Check back soon!",
      "events.noPastEvents": "Past events will appear here once they are completed.",
      "events.SearchEvents": "Search events...",
      "events.noResults": "No events match your search.",

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
      "magazines.reader.backToMagazines": "Back to Magazines",
      "magazines.reader.title": "Magazine Reader",
      "magazines.reader.loading": "Loading reader...",
      "magazines.reader.notFound": "Magazine not found",

      // Magazines Section (Home)
      "magazines.section.title": "Latest Magazines",
      "magazines.section.subtitle": "Explore our latest publications and stay updated with the community",
      "magazines.section.viewAll": "View All",
      "magazines.section.empty": "No magazines available yet",

      // Club Structure Section
      "clubStructure.title": "Our Club Structure",
      "clubStructure.subtitle": "Meet our leadership team and explore the departments driving our community",
      "clubStructure.leadership": "Club Leadership",
      "clubStructure.presidents": "Club Presidents",
      "clubStructure.vicePresident": "Vice President",
      "clubStructure.departmentsTitle": "Departments",
      "clubStructure.departments": "Departments",
      "clubStructure.specialized": "Specialized",
      "clubStructure.administrative": "Administrative",
      "clubStructure.viewFullStructure": "View Full Structure",

      // Club Structure Page
      "clubStructurePage.title": "Club Structure",
      "clubStructurePage.subtitle": "Learn about the organizational structure of the Google Developers Club and its different departments",
      "clubStructurePage.leadership": "Leadership",
      "clubStructurePage.specializedDepts": "Specialized Departments",
      "clubStructurePage.specializedDesc": "Departments specialized in technology and innovation fields",
      "clubStructurePage.administrativeDepts": "Administrative Departments",
      "clubStructurePage.administrativeDesc": "Administrative departments to organize and develop club activities",
      "clubStructurePage.deptHead": "Department Head:",
      "clubStructurePage.deptHeadMale": "Department Head (Male)",
      "clubStructurePage.deptHeadFemale": "Department Head (Female)",
      "clubStructurePage.deptMembers": "Department Members:",
      "clubStructurePage.presidents": "Club Presidents",
      "clubStructurePage.vicePresident": "Vice President",
      "clubStructurePage.robotics": "Robotics",
      "clubStructurePage.ai": "Artificial Intelligence and Data Analysis",
      "clubStructurePage.entrepreneurship": "Entrepreneurship",
      "clubStructurePage.cybersecurity": "Cybersecurity",
      "clubStructurePage.development": "Development",
      "clubStructurePage.design": "Design",
      "clubStructurePage.programs": "Programs and Events Management",
      "clubStructurePage.organization": "Organization and Meetings",
      "clubStructurePage.media": "Reports and Media",
      "clubStructurePage.esports": "Esports",
      "clubStructurePage.deptLeader": "Leader:",
      "clubStructurePage.deptVice": "Vice:",
      "clubStructurePage.aiShort": "AI & Data",
      "clubStructurePage.programsShort": "Events Management",
      "clubStructurePage.boardDirectors": "Board of Directors",
      "clubStructurePage.innovation": "Innovation Department",

      // Auth
      "auth.login": "Log In",
      "auth.signup": "Sign Up",
      "auth.loginAria": "Sign in to your account",
      "auth.signupAria": "Create a new account",
      "auth.signIn": "Sign In",
      "auth.joinUs": "Join Us",
      "auth.cancel": "Cancel",

      // Auth Required Dialog
      "authDialog.defaultTitle": "Sign In Required",
      "authDialog.defaultDescription": "You need to sign in or create an account to continue.",

      // Event Signup
      "eventSignup.signUp": "Sign Up",
      "eventSignup.signedUp": "Signed Up",
      "eventSignup.fillGoogleForm": "Fill Google Form",
      "eventSignup.somethingWentWrong": "⚠️ Something went wrong",
      "eventSignup.signInRequired": "Sign In Required",
      "eventSignup.signInDescription": "You need to sign in or create an account to sign up for this event.",
      "eventSignup.confirmTitle": "Confirm Sign Up",
      "eventSignup.confirmDescription": "Are you sure you want to sign up for this event:",
      "eventSignup.cancel": "Cancel",
      "eventSignup.signingUp": "Signing up...",
      "eventSignup.confirmAndFillForm": "Confirm Sign Up and Fill Form",
      "eventSignup.confirm": "Confirm Sign Up",
      "eventSignup.successToast": "Successfully signed up for",

      // Event Card
      "eventCard.viewEvent": "View Event",
      "eventCard.viewDetails": "View Details",

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

      // Event Detail Page
      "eventDetail.backToEvents": "Back to Events",
      "eventDetail.status.open": "Open",
      "eventDetail.status.openToJoin": "Open to Join",
      "eventDetail.status.active": "Active",
      "eventDetail.status.closed": "Closed",
      "eventDetail.locationType.online": "Online Event",
      "eventDetail.locationType.onsite": "On-site Event",
      "eventDetail.locationType.none": "No Location",
      "eventDetail.daily": "daily",
      "eventDetail.days": "Days",
      "eventDetail.description": "Description",
      "eventDetail.noDescription": "No description provided for this event.",
      "eventDetail.noImage": "No event image",

      // Member Detail Page
      "memberDetail.backToMembers": "Back to Members",
      "memberDetail.memberProfile": "Member Profile",
      "memberDetail.member": "Member",
      "memberDetail.totalPoints": "Total Points",
      "memberDetail.pointsHistory": "Points History",
      "memberDetail.detailedLog": "Detailed log of all points earned",
      "memberDetail.points": "points",
      "memberDetail.noHistory": "No points history available for this member.",

      // Department Detail Page
      "departmentDetail.backToDepartments": "Back to Departments",
      "departmentDetail.departmentProfile": "Department Profile",
      "departmentDetail.department": "Department",
      "departmentDetail.totalPoints": "Total Points",
      "departmentDetail.pointsHistory": "Points History",
      "departmentDetail.detailedLog": "Detailed log of all points earned by the department",
      "departmentDetail.points": "points",
      "departmentDetail.noHistory": "No points history available for this department.",

      // Footer
      "footer.about.title": "About GDG Qassim",
      "footer.about.description": "Google Developer Groups at Qassim University is a student-led community fostering innovation and technical skills through workshops, events, and collaborative projects.",
      "footer.quickLinks.title": "Quick Links",
      "footer.connect.title": "Connect With Us",
      "footer.developers.title": "Developers",
      "footer.developers.builtWith": "Built with ❤️ by",
      "footer.social.joinUs": "Join Our Community",
      "footer.social.telegram": "Telegram Group",
      "footer.social.discord": "Discord Server",
      "footer.social.twitter": "X",
      "footer.social.hashtag": "Our X Hashtag",
      "footer.social.tiktok": "TikTok",
      "footer.social.email": "Contact Us",
      "footer.social.gdgSite": "Official GDG Site",
      "footer.copyright": "© GDG-Q 2026",

      // Feedback
      "feedback.card.title": "Your Feedback Matters",

      // Not Found Pages
      "notFound.pageTitle": "Page Not Found",
      "notFound.pageDescription": "The page you're looking for doesn't exist or has been moved.",
      "notFound.backHome": "Back to Home",
      
      "notFound.eventTitle": "Event Not Found",
      "notFound.eventDescription": "The event you're looking for doesn't exist or may have been removed.",
      "notFound.backToEvents": "Back to Events",

      // Common
      "version": "2.0"
    }
  },
  // we always use the saudi arabian dialect for arabic words and phrases
  ar: {
    translation: {
      // Hero Section
      "hero.title.performance": "مجموعة قوقل للطلبة المطورين",
      "hero.title.leaderboard": "",
      "hero.subtitle": "سجل بفعاليتنا و تابع نقاطك وكن من المتصدرين 🏆",
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
      "leaderboard.subtitle": "شوف أفضل المنافسين بين الاعضاء والاقسام، التحديث لحظي",
      "leaderboard.topMembers": "أقوى الأعضاء",
      "leaderboard.topDepartments": "أقوى الأقسام",
      "leaderboard.viewAll": "الكل",
      "leaderboard.specializedDepts": "الأقسام التخصصية",
      "leaderboard.administrativeDepts": "الأقسام الإدارية",
      "leaderboard.points": "نقاط",
      "leaderboard.viewDetails": "التفاصيل",
      "leaderboard.details": "التفاصيل",
      "leaderboard.noMembersData": "ما فيه بيانات للأعضاء",
      "leaderboard.noSpecializedDeptsData": "ما فيه بيانات للأقسام التخصصية",
      "leaderboard.noAdministrativeDeptsData": "ما فيه بيانات للأقسام الإدارية",

      // Semester
      "semester.label": "الفصل الدراسي",
      "semester.all": "الكل",

      // Events Section
      "events.badge": "فعاليات مفتوحة",
      "events.title": "شارك في فعالياتنا",
      "events.subtitle": "عيش الحماس، شارك واكسب نقاط وتصدر القائمة!",
      "events.loading": "جاري تحميل الفعاليات...",
      "events.empty": "ما عندنا فعاليات متاحة حاليًا بس خلك قريب ترا فعالياتنا واجد 😉",
      "events.viewAll": "شوف كل الفعاليات",

      // Navigation
      "nav.home": "الرئيسية",
      "nav.members": "الأعضاء",
      "nav.departments": "الأقسام",
      "nav.events": "الفعاليات",
      "nav.magazines": "المجلات",
      "nav.structure": "الهيكلة",
      "nav.howItWorks": "نظام النقاط",
      "nav.language": "اللغة",
      "nav.english": "الإنجليزية",
      "nav.arabic": "العربية",

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
      "members.of": "من",
      "members.found": "عضو",
      "members.noResults": "ما لقينا أعضاء يطابقون",
      "members.clearSearch": "امسح البحث",
      "members.noMembers": "ما فيه أعضاء متاحين",
      "members.viewYourRank": "شوف ترتيبك",

      // Events Page
      "events.heading": "الفعاليات",
      "events.subHeading": "اكتشف الفعاليات القادمة، سجل في الفعاليات المفتوحة، واستكشف الفعاليات السابقة",
      "events.openEvents": "الفعاليات المفتوحة",
      "events.pastEvents": "الفعاليات السابقة",
      "events.noOpenEvents": "ما فيه فعاليات متاحة للتسجيل حالياً. ارجع بعدين!",
      "events.noPastEvents": "الفعاليات السابقة راح تظهر هنا بعد ما تنتهي.",
      "events.SearchEvents": "ابحث عن فعالية...",
      "events.noResults": "ما لقينا الفعالية اللي تبحث عنها",

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
      "magazines.pages_two": "صفحتين",
      "magazines.pages_few": "صفحات",
      "magazines.readPDF": "اقرأ PDF",
      "magazines.reader.backToMagazines": "العودة للمجلات",
      "magazines.reader.title": "قارئ المجلات",
      "magazines.reader.loading": "جاري تحميل القارئ...",
      "magazines.reader.notFound": "المجلة غير موجودة",

      // Magazines Section (Home)
      "magazines.section.title": "آخر المجلات",
      "magazines.section.subtitle": "اطلع على آخر إصداراتنا وخلك متابع مع المجتمع",
      "magazines.section.viewAll": "شوف كل المجلات",
      "magazines.section.empty": "ما فيه مجلات متاحة حالياً",

      // Club Structure Section
      "clubStructure.title": "هيكلة المجموعة",
      "clubStructure.subtitle": "تعرف على فريق القيادة واستكشف الأقسام اللي تقود مجتمعنا",
      "clubStructure.leadership": "القيادة",
      "clubStructure.presidents": "رؤساء النادي",
      "clubStructure.vicePresident": "نائب الرئيس",
      "clubStructure.departmentsTitle": "الأقسام",
      "clubStructure.departments": "قسم",
      "clubStructure.specialized": "تخصصية",
      "clubStructure.administrative": "إدارية",
      "clubStructure.viewFullStructure": "شوف الهيكل الكامل",

      // Club Structure Page
      "clubStructurePage.title": "هيكلة المجموعة",
      "clubStructurePage.subtitle": "تعرف على الهيكل التنظيمي لنادي مطوري قوقل والأقسام المختلفة",
      "clubStructurePage.leadership": "القيادة",
      "clubStructurePage.specializedDepts": "الاقسام التخصصية",
      "clubStructurePage.specializedDesc": "أقسام متخصصة في مجالات التقنية والابتكار",
      "clubStructurePage.administrativeDepts": "الاقسام الإدارية",
      "clubStructurePage.administrativeDesc": "أقسام إدارية لتنظيم وتطوير أعمال النادي",
      "clubStructurePage.deptHead": "رئيس القسم:",
      "clubStructurePage.deptHeadMale": "رئيس القسم (طلاب)",
      "clubStructurePage.deptHeadFemale": "رئيس القسم (طالبات)",
      "clubStructurePage.deptMembers": "أعضاء القسم:",
      "clubStructurePage.presidents": "رؤساء النادي",
      "clubStructurePage.vicePresident": "نائب الرئيس",
      "clubStructurePage.robotics": "الروبوتات",
      "clubStructurePage.ai": "الذكاء الاصطناعي وتحليل البيانات",
      "clubStructurePage.entrepreneurship": "ريادة الأعمال",
      "clubStructurePage.cybersecurity": "الأمن السيبراني",
      "clubStructurePage.development": "التطوير",
      "clubStructurePage.design": "التصميم",
      "clubStructurePage.programs": "إدارة البرامج والفعاليات",
      "clubStructurePage.organization": "التنظيم والاجتماعات",
      "clubStructurePage.media": "التقارير والإعلام",
      "clubStructurePage.esports": "الرياضات الإلكترونية",
      "clubStructurePage.deptLeader": "الليدر:",
      "clubStructurePage.deptVice": "النائب:",
      "clubStructurePage.boardDirectors": "مجلس الإدارة",
      "clubStructurePage.innovation": "قسم الابتكار",
      "clubStructurePage.aiShort": "الذكاء الاصطناعي",
      "clubStructurePage.programsShort": "إدارة الفعاليات",

      // Auth
      "auth.login": "تسجيل الدخول",
      "auth.signup": "إنشاء حساب",
      "auth.loginAria": "سجل دخول لحسابك",
      "auth.signupAria": "أنشئ حساب جديد",
      "auth.signIn": "سجل دخول",
      "auth.joinUs": "انضم إلينا",
      "auth.cancel": "إلغاء",

      // Auth Required Dialog
      "authDialog.defaultTitle": "تسجيل الدخول مطلوب",
      "authDialog.defaultDescription": "لازم تسجل دخول أو تسوي حساب عشان تكمل.",

      // Event Signup
      "eventSignup.signUp": "سجل في الفعالية",
      "eventSignup.signedUp": "مسجل",
      "eventSignup.fillGoogleForm": "عبي نموذج جوجل",
      "eventSignup.somethingWentWrong": "⚠️ حدث خطأ ما",
      "eventSignup.signInRequired": "تسجيل الدخول مطلوب",
      "eventSignup.signInDescription": "لازم تسجل دخول أو تسوي حساب عشان تسجل في هذي الفعالية.",
      "eventSignup.confirmTitle": "تأكيد التسجيل",
      "eventSignup.confirmDescription": "متأكد إنك تبي تسجل في هذي الفعالية:",
      "eventSignup.cancel": "إلغاء",
      "eventSignup.signingUp": "جاري التسجيل...",
      "eventSignup.confirmAndFillForm": "أكد التسجيل وعبي النموذج",
      "eventSignup.confirm": "أكد التسجيل",
      "eventSignup.successToast": "تم تسجيلك بنجاح في",

      // Event Card
      "eventCard.viewEvent": "التفاصيل",
      "eventCard.viewDetails": " التفاصيل",

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

      // Event Detail Page
      "eventDetail.backToEvents": "العودة للفعاليات",
      "eventDetail.status.open": "مفتوح للتسجيل",
      "eventDetail.status.active": "جاري",
      "eventDetail.status.closed": "منتهي",
      "eventDetail.status.openToJoin": "مفتوح للدخول",
      "eventDetail.locationType.online": "فعالية أونلاين",
      "eventDetail.locationType.onsite": "فعالية حضورية",
      "eventDetail.locationType.none": "بدون موقع",
      "eventDetail.daily": "يومياً",
      "eventDetail.days": "أيام",
      "eventDetail.description": "الوصف",
      "eventDetail.noDescription": "ما فيه وصف لهذي الفعالية.",
      "eventDetail.noImage": "ما فيه صورة للفعالية",

      // Member Detail Page
      "memberDetail.backToMembers": "العودة للأعضاء",
      "memberDetail.memberProfile": "ملف العضو",
      "memberDetail.member": "عضو",
      "memberDetail.totalPoints": "إجمالي النقاط",
      "memberDetail.pointsHistory": "سجل النقاط",
      "memberDetail.detailedLog": "سجل تفصيلي لجميع النقاط المكتسبة",
      "memberDetail.points": "نقاط",
      "memberDetail.noHistory": "ما فيه سجل نقاط متاح لهذا العضو.",

      // Department Detail Page
      "departmentDetail.backToDepartments": "العودة للأقسام",
      "departmentDetail.departmentProfile": "ملف القسم",
      "departmentDetail.department": "قسم",
      "departmentDetail.totalPoints": "إجمالي النقاط",
      "departmentDetail.pointsHistory": "سجل النقاط",
      "departmentDetail.detailedLog": "سجل تفصيلي لجميع النقاط المكتسبة للقسم",
      "departmentDetail.points": "نقاط",
      "departmentDetail.noHistory": "ما فيه سجل نقاط متاح لهذا القسم.",

      // Footer
      "footer.about.title": "عن GDG القصيم",
      "footer.about.description": "مجموعة قوقل للطلبة المطورين مجتمع طلابي يسعى لبناء مجتمع تقني مبتكر من خلال ورش العمل والفعاليات والمشاريع الجماعية.",
      "footer.quickLinks.title": "روابط سريعة",
      "footer.connect.title": "تواصل معنا",
      "footer.developers.title": "المطورين",
      "footer.developers.builtWith": "تم بناء الموقع بـ ❤️ من",
      "footer.social.joinUs": "انضم لمجتمعنا",
      "footer.social.telegram": "مجموعة التلقرام",
      "footer.social.discord": "سيرفر الديسكورد",
      "footer.social.twitter": "تطبيق X",
      "footer.social.hashtag": "هاشتاقنا على تويتر",
      "footer.social.tiktok": "تيك توك",
      "footer.social.email": "تواصل معنا",
      "footer.social.gdgSite": "موقع GDG الرسمي",
      "footer.copyright": "© GDG-Q 2026",

      // Feedback
      "feedback.card.title": "رأيك يهمنا",

      // Not Found Pages
      "notFound.pageTitle": "الصفحة غير موجودة",
      "notFound.pageDescription": "الصفحة اللي تدور عليها مو موجودة أو تم نقلها",
      "notFound.backHome": "ارجع للرئيسية",
      
      "notFound.eventTitle": "الفعالية غير موجودة",
      "notFound.eventDescription": "الفعالية اللي تدور عليها مو موجودة أو تم حذفها",
      "notFound.backToEvents": "ارجع للفعاليات",

      // Common
      "version": "2.0"
    }
  }
};
