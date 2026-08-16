export interface WalletTheme {
  id: string
  name: string
  nameAr: string
  bgHex: string
  gradient: string
  textColor: string
  labelColor: string
  accentColor: string
  badgeBg: string
  badgeText: string
  swatchHex: string
}

export const WALLET_THEMES: Record<string, WalletTheme> = {
  'dark-obsidian': {
    id: 'dark-obsidian',
    name: 'Obsidian Iron',
    nameAr: 'أسود حديدي',
    bgHex: '#17130f',
    gradient: 'linear-gradient(180deg, #1f1b16 0%, #17130f 100%)',
    textColor: '#f0e9de',
    labelColor: '#8e867d',
    accentColor: '#d9c7ae',
    badgeBg: 'rgba(255, 255, 255, 0.08)',
    badgeText: '#f0e9de',
    swatchHex: '#17130f',
  },
  'google-blue': {
    id: 'google-blue',
    name: 'GDG Navy Blue',
    nameAr: 'أزرق نيلي',
    bgHex: '#102a45',
    gradient: 'linear-gradient(180deg, #173b61 0%, #0d2137 100%)',
    textColor: '#ffffff',
    labelColor: '#8da8c7',
    accentColor: '#4285F4',
    badgeBg: 'rgba(66, 133, 244, 0.18)',
    badgeText: '#93c5fd',
    swatchHex: '#173b61',
  },
  'emerald-pine': {
    id: 'emerald-pine',
    name: 'Tech Emerald',
    nameAr: 'أخضر زمردي',
    bgHex: '#0b3024',
    gradient: 'linear-gradient(180deg, #0e3d2e 0%, #08241b 100%)',
    textColor: '#f0fdf4',
    labelColor: '#80b89f',
    accentColor: '#34d399',
    badgeBg: 'rgba(52, 211, 153, 0.15)',
    badgeText: '#a7f3d0',
    swatchHex: '#0e3d2e',
  },
  'burnt-ember': {
    id: 'burnt-ember',
    name: 'Crimson Ember',
    nameAr: 'أحمر محروق',
    bgHex: '#42140a',
    gradient: 'linear-gradient(180deg, #5c1c0e 0%, #381007 100%)',
    textColor: '#fff1ee',
    labelColor: '#d6978a',
    accentColor: '#f87171',
    badgeBg: 'rgba(239, 68, 68, 0.15)',
    badgeText: '#fca5a5',
    swatchHex: '#5c1c0e',
  },
  'executive-gold': {
    id: 'executive-gold',
    name: 'Executive Amber',
    nameAr: 'ذهبي ملكي',
    bgHex: '#2b1b07',
    gradient: 'linear-gradient(180deg, #3d270a 0%, #241605 100%)',
    textColor: '#fef3c7',
    labelColor: '#caa774',
    accentColor: '#fbbf24',
    badgeBg: 'rgba(251, 191, 36, 0.18)',
    badgeText: '#fde68a',
    swatchHex: '#3d270a',
  },
  'violet-plum': {
    id: 'violet-plum',
    name: 'Royal Violet',
    nameAr: 'أرجواني تقني',
    bgHex: '#261238',
    gradient: 'linear-gradient(180deg, #381b52 0%, #1f0e2e 100%)',
    textColor: '#faf5ff',
    labelColor: '#bfa3d8',
    accentColor: '#c084fc',
    badgeBg: 'rgba(192, 132, 252, 0.18)',
    badgeText: '#e9d5ff',
    swatchHex: '#381b52',
  },
}

export const DEFAULT_THEME_ID = 'dark-obsidian'

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
