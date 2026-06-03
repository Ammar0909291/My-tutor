import { auth } from '@/lib/auth'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    console.log('=== TEST AUTH ===')
    console.log('AUTH_SECRET:', process.env.AUTH_SECRET?.substring(0, 10))
    console.log('NEXTAUTH_SECRET:', process.env.NEXTAUTH_SECRET?.substring(0, 10))

    const session = await auth()
    console.log('SESSION RESULT:', JSON.stringify(session))

    return NextResponse.json({
      session,
      authSecretExists: !!process.env.AUTH_SECRET,
      nextauthSecretExists: !!process.env.NEXTAUTH_SECRET,
    })
  } catch (error: any) {
    console.log('AUTH ERROR:', error.message)
    return NextResponse.json({ error: error.message })
  }
}
