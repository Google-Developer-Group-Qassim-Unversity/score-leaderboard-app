'use server'

import { auth, clerkClient } from '@clerk/nextjs/server'

export interface OnboardingFormData {
  uni_id: string
  fullArabicName: string
  saudiPhone: string
  gender: 'male' | 'female'
  personalEmail: string
}

export const completeOnboarding = async (formData: OnboardingFormData) => {
  const { isAuthenticated, userId } = await auth()

  if (!isAuthenticated || !userId) {
    return { error: 'Not authenticated' }
  }

  const client = await clerkClient()
  try {
    const res = await client.users.updateUser(userId, {
      publicMetadata: {
        onboardingComplete: true,
        uni_id: formData.uni_id,
        fullArabicName: formData.fullArabicName,
        saudiPhone: formData.saudiPhone,
        gender: formData.gender,
        personalEmail: formData.personalEmail,
      },
    })
    return { success: true, metadata: res.publicMetadata }
  } catch (err) {
    return { error: 'There was an error updating the user metadata.' }
  }
}
