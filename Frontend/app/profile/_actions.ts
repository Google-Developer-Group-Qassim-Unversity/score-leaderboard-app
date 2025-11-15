'use server'

import { auth, clerkClient } from '@clerk/nextjs/server'

export interface UpdateProfileFormData {
  fullArabicName: string
  saudiPhone: string
  gender: 'male' | 'female'
  personalEmail: string
}

export const updateProfile = async (formData: UpdateProfileFormData) => {
  const { isAuthenticated, userId } = await auth()

  if (!isAuthenticated || !userId) {
    return { error: 'Not authenticated' }
  }

  const client = await clerkClient()
  try {
    // Get current metadata to preserve uiId
    const user = await client.users.getUser(userId)
    const currentMetadata = user.publicMetadata as any

    const res = await client.users.updateUser(userId, {
      publicMetadata: {
        ...currentMetadata,
        // Preserve uiId and onboardingComplete
        uiId: currentMetadata.uiId,
        onboardingComplete: currentMetadata.onboardingComplete,
        // Update these fields
        fullArabicName: formData.fullArabicName,
        saudiPhone: formData.saudiPhone,
        gender: formData.gender,
        personalEmail: formData.personalEmail,
      },
    })
    return { success: true, metadata: res.publicMetadata }
  } catch (err) {
    console.error('Error updating profile:', err)
    return { error: 'There was an error updating your profile. Please try again.' }
  }
}
