export {}

declare global {
  interface CustomJwtSessionClaims {
    metadata: {
      onboardingComplete?: boolean
      uiId?: string
      fullArabicName?: string
      saudiPhone?: string
      gender?: 'male' | 'female'
      personalEmail?: string
    }
  }
}
