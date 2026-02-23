'use server'

import { auth, clerkClient } from '@clerk/nextjs/server'

export async function updateClerkMetadata(newMetadata: Record<string, unknown>) {
  const { isAuthenticated, userId } = await auth()

  if (!isAuthenticated || !userId) {
    return { error: 'Not authenticated' }
  }

  const client = await clerkClient()
  
  try {
    const currentUser = await client.users.getUser(userId)
    const existingMetadata = currentUser.publicMetadata || {}
    
    const mergedMetadata = {
      ...existingMetadata,
      ...newMetadata,
    }

    await client.users.updateUser(userId, {
      publicMetadata: mergedMetadata,
    })

    if (process.env.NODE_ENV === 'development') {
      console.log('✅ Successfully updated user public metadata:', mergedMetadata)
    }

    return { success: true }
  } catch (err) {
    console.error('Error updating user metadata:', err)
    return { error: 'There was an error updating your data, please try again later' }
  }
}

export async function getMemberIdFromPrivateMetadata() {
  const { isAuthenticated, userId } = await auth()

  if (!isAuthenticated || !userId) {
    return null
  }

  const client = await clerkClient()
  const user = await client.users.getUser(userId)
  
  return user.privateMetadata?.memberId as number | undefined
}
