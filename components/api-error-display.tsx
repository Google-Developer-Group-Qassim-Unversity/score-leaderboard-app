'use client'

import type { ApiError, NetworkError } from '@/lib/api/errors'

interface ApiErrorDisplayProps {
  error: Error | null
  onRetry?: () => void
  className?: string
}

export function ApiErrorDisplay({ error, onRetry, className = '' }: ApiErrorDisplayProps) {
  if (!error) return null

  const isNetworkError = error.name === 'NetworkError'
  const isApiError = error.name === 'ApiError'
  const apiError = isApiError ? (error as ApiError) : null
  const isNotFound = apiError?.status === 404
  const isUnauthorized = apiError?.status === 401

  const getTitle = () => {
    if (isNetworkError) return 'Connection Error'
    if (isNotFound) return 'Not Found'
    if (isUnauthorized) return 'Unauthorized'
    return 'Error'
  }

  const getMessage = () => {
    if (isNetworkError) return 'Please check your internet connection and try again.'
    if (isNotFound) return 'The requested resource could not be found.'
    if (isUnauthorized) return 'You need to be signed in to view this content.'
    return error.message || 'An unexpected error occurred.'
  }

  return (
    <div className={`flex flex-col items-center justify-center p-8 text-center ${className}`}>
      <h3 className="text-lg font-semibold text-destructive mb-2">{getTitle()}</h3>
      <p className="text-muted-foreground mb-4">{getMessage()}</p>
      {onRetry && !isNotFound && (
        <button
          onClick={onRetry}
          className="px-4 py-2 text-sm bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
        >
          Try again
        </button>
      )}
    </div>
  )
}
