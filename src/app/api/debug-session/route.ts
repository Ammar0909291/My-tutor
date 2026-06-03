// For NextAuth v5:
import { auth } from '@/auth'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const session = await auth()
    return NextResponse.json({
      session: session,
      hasSecret: !!process.env.NEXTAUTH_SECRET,
      hasAuthSecret: !!process.env.AUTH_SECRET,
      secretLength: process.env.NEXTAUTH_SECRET?.length,
      nodeEnv: process.env.NODE_ENV
    })
  } catch (error: any) {
    return NextResponse.json({ error: error.message })
  }
}
