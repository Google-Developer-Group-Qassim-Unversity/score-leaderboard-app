'use client'

import { useAuth, useUser, useSession, useClerk, useOrganization } from '@clerk/nextjs'
import { notFound } from 'next/navigation'
import { useEffect, useState } from 'react'

interface UserPublicMetadata {
  fullArabicName?: string
  saudiPhone?: string
  gender?: string
  personalEmail?: string
  uiId?: string
}

export default function SessionDebugPage() {
  const [isDebugEnabled, setIsDebugEnabled] = useState<boolean | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [decodedToken, setDecodedToken] = useState<any>(null)
  const [copied, setCopied] = useState(false)
  const { getToken } = useAuth()
  const auth = useAuth()
  const { user, isLoaded: userLoaded, isSignedIn } = useUser()
  const { session, isLoaded: sessionLoaded } = useSession()
  const clerk = useClerk()
  const organization = useOrganization()

  useEffect(() => {
    // Check if debug mode is enabled
    fetch('/api/check-debug')
      .then(res => res.json())
      .then(data => setIsDebugEnabled(data.enabled))
      .catch(() => setIsDebugEnabled(false))
  }, [])

  useEffect(() => {
    // Fetch the token
    const fetchToken = async () => {
      try {
        const fetchedToken = await getToken()
        setToken(fetchedToken)
        
        // Decode JWT
        if (fetchedToken) {
          const parts = fetchedToken.split('.')
          if (parts.length === 3) {
            const payload = JSON.parse(atob(parts[1]))
            setDecodedToken(payload)
          }
        }
      } catch (error) {
        console.error('Error fetching token:', error)
      }
    }

    if (auth.isLoaded && auth.isSignedIn) {
      fetchToken()
    }
  }, [getToken, auth.isLoaded, auth.isSignedIn])

  const handleCopyToken = async () => {
    if (token) {
      try {
        await navigator.clipboard.writeText(token)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      } catch (error) {
        console.error('Failed to copy token:', error)
      }
    }
  }

  // Show loading or redirect to 404
  if (isDebugEnabled === null) {
    return null // Loading
  }

  if (!isDebugEnabled) {
    notFound()
  }

  const publicMetadata = user?.publicMetadata as UserPublicMetadata | undefined

  return (
    <div style={{ padding: '2rem', fontFamily: 'monospace' }}>
      <h1>🔍 Clerk Session Debug Page</h1>
      <p>All Clerk authentication information is displayed below.</p>
      <div style={{ marginTop: '2rem', padding: '1rem', background: '#f5f5f5', borderRadius: '4px' }}>
        <h2>Quick Info:</h2>
        <ul>
          <li><strong>Signed In:</strong> {isSignedIn ? '✅ Yes' : '❌ No'}</li>
          <li><strong>User ID:</strong> {auth.userId || 'N/A'}</li>
          <li><strong>Session ID:</strong> {auth.sessionId || 'N/A'}</li>
          <li><strong>Email:</strong> {user?.primaryEmailAddress?.emailAddress || 'N/A'}</li>
          <li><strong>Username:</strong> {user?.username || 'N/A'}</li>
          <li><strong>Full Name:</strong> {user?.fullName || 'N/A'}</li>
        </ul>
      </div>
      
      <div style={{ marginTop: '2rem', padding: '1rem', background: '#e8f4f8', borderRadius: '4px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ margin: 0 }}>Session Token (JWT):</h2>
          <button
            onClick={handleCopyToken}
            disabled={!token}
            style={{
              padding: '0.5rem 1rem',
              borderRadius: '4px',
              border: 'none',
              background: copied ? '#10b981' : '#3b82f6',
              color: 'white',
              fontWeight: 'bold',
              cursor: token ? 'pointer' : 'not-allowed',
              fontSize: '0.875rem',
              transition: 'background 0.2s',
            }}
          >
            {copied ? '✓ Copied!' : '📋 Copy Token'}
          </button>
        </div>
        <div style={{ marginTop: '0.5rem' }}>
          <strong>Token Length:</strong> {token?.length || 'N/A'} characters
        </div>
        <details style={{ marginTop: '1rem' }}>
          <summary style={{ cursor: 'pointer', fontWeight: 'bold' }}>View Full Token</summary>
          <pre style={{ marginTop: '0.5rem', padding: '0.5rem', background: '#fff', borderRadius: '4px', overflow: 'auto', wordBreak: 'break-all', whiteSpace: 'pre-wrap' }}>
            {token || 'No token available'}
          </pre>
        </details>
        <details style={{ marginTop: '1rem' }}>
          <summary style={{ cursor: 'pointer', fontWeight: 'bold' }}>View Decoded JWT Payload</summary>
          <pre style={{ marginTop: '0.5rem', padding: '0.5rem', background: '#fff', borderRadius: '4px', overflow: 'auto' }}>
            {decodedToken ? JSON.stringify(decodedToken, null, 2) : 'No decoded token available'}
          </pre>
        </details>
      </div>

      <div style={{ marginTop: '2rem', padding: '1rem', background: '#e8f4f8', borderRadius: '4px' }}>
        <h2>Public Metadata:</h2>
        <ul>
          <li><strong>UI ID:</strong> {publicMetadata?.uiId || 'N/A'}</li>
          <li><strong>Full Arabic Name:</strong> {publicMetadata?.fullArabicName || 'N/A'}</li>
          <li><strong>Saudi Phone:</strong> {publicMetadata?.saudiPhone || 'N/A'}</li>
          <li><strong>Gender:</strong> {publicMetadata?.gender || 'N/A'}</li>
          <li><strong>Personal Email:</strong> {publicMetadata?.personalEmail || 'N/A'}</li>
        </ul>
        <details style={{ marginTop: '1rem' }}>
          <summary style={{ cursor: 'pointer', fontWeight: 'bold' }}>View Raw Metadata JSON</summary>
          <pre style={{ marginTop: '0.5rem', padding: '0.5rem', background: '#fff', borderRadius: '4px', overflow: 'auto' }}>
            {JSON.stringify(user?.publicMetadata, null, 2)}
          </pre>
        </details>
      </div>

      <div style={{ marginTop: '1rem', padding: '1rem', background: '#fff3cd', borderRadius: '4px' }}>
        <p><strong>⚠️ Development Only:</strong> This page exposes sensitive authentication data. Remove or protect before production!</p>
      </div>
    </div>
  )
}
