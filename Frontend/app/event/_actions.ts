'use server'

import { auth } from '@clerk/nextjs/server'
import type { FormSubmissionRequest, FormSubmissionResponse } from '@/lib/api-types'

const API_DOTNET_BASE_URL = process.env.NEXT_PUBLIC_DEV_DOTNET_HOST || process.env.NEXT_PUBLIC_DOTNET_HOST

export interface SubmitEventFormData {
  formId: number
  responses: {
    questionId: number
    value: string
  }[]
}

export const submitEventForm = async (formData: SubmitEventFormData) => {
  try {
    const { getToken, userId } = await auth()

    if (!userId) {
      return { error: 'Not authenticated' }
    }

    // Get the auth token
    const token = await getToken()
    if (!token) {
      return { error: 'Unable to get authentication token' }
    }

    // Get user metadata to retrieve uiId
    const { sessionClaims } = await auth()
    const publicMetadata = sessionClaims?.publicMetadata as any
    const uiId = publicMetadata?.uiId

    if (!uiId) {
      return { error: 'University ID not found. Please complete your profile first.' }
    }

    if (!API_DOTNET_BASE_URL) {
      return { error: 'API configuration error. Please contact support.' }
    }

    // Prepare the submission request
    const requestBody: FormSubmissionRequest = {
      formId: formData.formId,
      memberUniId: uiId,
      responses: formData.responses,
    }

    console.log('📤 Submitting form:', requestBody)

    // Submit the form
    const response = await fetch(`${API_DOTNET_BASE_URL}/forms/submissions/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(requestBody),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('❌ Form submission failed:', response.status, errorText)
      
      if (response.status === 401) {
        return { error: 'Unauthorized. Please sign in again.' }
      } else if (response.status === 400) {
        return { error: 'Invalid form data. Please check your responses.' }
      } else if (response.status === 409) {
        return { error: 'You have already submitted this form.' }
      }
      
      return { error: 'Failed to submit form. Please try again.' }
    }

    const data: FormSubmissionResponse = await response.json()
    console.log('✅ Form submitted successfully:', data)

    return { success: true, data }
  } catch (err) {
    console.error('❌ Error submitting form:', err)
    return { error: 'An unexpected error occurred. Please try again.' }
  }
}
