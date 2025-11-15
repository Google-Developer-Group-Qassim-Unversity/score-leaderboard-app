import { NextResponse } from 'next/server'

export async function GET() {
  const clerkLog = process.env.CLERK_LOG
  const isDebugEnabled = clerkLog === 'debug'
  
  return NextResponse.json({ enabled: isDebugEnabled })
}
