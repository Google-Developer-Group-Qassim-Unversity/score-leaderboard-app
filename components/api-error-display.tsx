'use client'

import type { ApiError, NetworkError } from '@/lib/api/errors'
import { useTranslation } from 'react-i18next'
import '@/lib/i18n-client'

interface ApiErrorDisplayProps {
  error: Error | null
  onRetry?: () => void
  className?: string
}

export function ApiErrorDisplay({ error, onRetry, className = '' }: ApiErrorDisplayProps) {
  const { t } = useTranslation()

  if (!error) return null

  const isNetworkError = error.name === 'NetworkError'
  const isApiError = error.name === 'ApiError'
  const apiError = isApiError ? (error as ApiError) : null
  const isNotFound = apiError?.status === 404
  const isUnauthorized = apiError?.status === 401

  const getTitle = () => {
    if (isNetworkError) return t('error.connection')
    if (isNotFound) return t('error.notFound')
    if (isUnauthorized) return t('error.unauthorized')
    return t('error.error')
  }

  const getMessage = () => {
    if (isNetworkError) return t('error.connectionMessage')
    if (isNotFound) return t('error.notFoundMessage')
    if (isUnauthorized) return t('error.unauthorizedMessage')
    return error.message || t('error.unexpectedMessage')
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
          {t('error.tryAgain')}
        </button>
      )}
    </div>
  )
}
