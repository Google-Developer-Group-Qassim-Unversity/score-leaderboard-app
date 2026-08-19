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
    bgHex: '#ffffff',
    textColor: '#0f172a',
    labelColor: '#64748b',
    accentColor: '#2563eb',
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
    bgHex: '#ffffff',
    textColor: '#0f172a',
    labelColor: '#64748b',
    accentColor: '#e11d48',
    ribbonGradient: 'linear-gradient(135deg, #be123c 0%, #e11d48 50%, #fb7185 100%)',
    badgeColor: '#e11d48',
    frameBorder: 'rgba(225, 29, 72, 0.45)',
    swatchHex: '#e11d48',
  },
  'gdg-gold-admin': {
    id: 'gdg-gold-admin',
    name: 'GDG Board & Admin (Gold)',
    nameAr: 'بطاقة الإدارة (ذهبي)',
    roleTitle: 'إداري نادي قوقل للطلبة المطورين',
    isAdmin: true,
    gender: 'all',
    bgHex: '#ffffff',
    textColor: '#0f172a',
    labelColor: '#64748b',
    accentColor: '#d97706',
    ribbonGradient: 'linear-gradient(135deg, #b45309 0%, #d97706 50%, #f59e0b 100%)',
    badgeColor: '#f59e0b',
    frameBorder: 'rgba(217, 119, 6, 0.5)',
    swatchHex: '#f59e0b',
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
