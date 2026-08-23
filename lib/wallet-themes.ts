export interface WalletTheme {
  id: string
  name: string
  nameAr: string
  roleTitle: string
  isAdmin: boolean
  gender?: 'male' | 'female' | 'all'
  bgHex: string
  textColor: string
  labelColor: string
  accentColor: string
  ribbonGradient: string
  badgeColor: string
  frameBorder: string
  swatchHex: string
}

export const WALLET_THEMES: Record<string, WalletTheme> = {
  'gdg-blue': {
    id: 'gdg-blue',
    name: 'GDG Member (Blue)',
    nameAr: 'بطاقة العضو (شباب)',
    roleTitle: 'عضو نادي قوقل للطلبة المطورين',
    isAdmin: false,
    gender: 'male',
    bgHex: '#BFF2FF',
    textColor: '#111827',
    labelColor: '#334155',
    accentColor: '#2874F0',
    ribbonGradient: 'linear-gradient(135deg, #1d4ed8 0%, #3b82f6 50%, #60a5fa 100%)',
    badgeColor: '#3b82f6',
    frameBorder: 'rgba(59, 130, 246, 0.45)',
    swatchHex: '#2563eb',
  },
  'gdg-red': {
    id: 'gdg-red',
    name: 'GDG Member (Red)',
    nameAr: 'بطاقة العضوة (بنات)',
    roleTitle: 'عضو نادي قوقل للطلبة المطورين',
    isAdmin: false,
    gender: 'female',
    bgHex: '#FFD9DC',
    textColor: '#111827',
    labelColor: '#4B5563',
    accentColor: '#F0444C',
    ribbonGradient: 'linear-gradient(135deg, #be123c 0%, #e11d48 50%, #fb7185 100%)',
    badgeColor: '#e11d48',
    frameBorder: 'rgba(225, 29, 72, 0.45)',
    swatchHex: '#e11d48',
  },
  'gdg-gold-admin': {
    id: 'gdg-gold-admin',
    name: 'GDG Board & Admin (Black)',
    nameAr: 'بطاقة الإدارة (أسود)',
    roleTitle: 'إداري نادي قوقل للطلبة المطورين',
    isAdmin: true,
    gender: 'all',
    bgHex: '#000000',
    textColor: '#ffffff',
    labelColor: '#d1d5db',
    accentColor: '#34a853',
    ribbonGradient: 'linear-gradient(135deg, #ea4335 0%, #4285f4 45%, #34a853 70%, #fbbc04 100%)',
    badgeColor: '#34a853',
    frameBorder: 'rgba(255, 255, 255, 0.25)',
    swatchHex: '#111111',
  },
}

export const DEFAULT_THEME_ID = 'gdg-blue'

export type UserStatus = 'student' | 'graduate' | ''
export type EducationLevel = 'university' | 'highschool' | ''

export interface ProfileSocialLink {
  id: string
  platform: 'linkedin' | 'github' | 'x' | 'instagram' | 'telegram' | 'website' | 'discord' | 'email'
  url: string
  label?: string
}

export interface ProfileVisibility {
  showPhone?: boolean
  showEmail?: boolean
  showAcademic?: boolean
  showBio?: boolean
}

export interface WalletCardData {
  uuid?: string
  fullName: string
  nameLanguage?: 'ar' | 'en'
  isAdmin?: boolean
  uniId?: string
  countryCode: string
  phone: string
  email: string
  themeId: string
  
  // Educational & Academic details
  userStatus: UserStatus
  educationLevel?: EducationLevel
  institution?: string // University or school name
  major?: string // Major / Field of study (التخصص)
  studyYearOrLevel?: string // e.g. "المستوى 7", "ثاني ثانوي"
  
  // Public Profile / Portfolio Details
  bio?: string
  avatarUrl?: string
  socialLinks?: ProfileSocialLink[]
  visibility?: ProfileVisibility
  
  createdAt?: string
  updatedAt?: string
}
