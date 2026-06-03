import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    return NextResponse.json({
      session: session,
      hasSecret: !!process.env.NEXTAUTH_SECRET,
      secretLength: process.env.NEXTAUTH_SECRET?.length,
      nodeEnv: process.env.NODE_ENV
    })
  } catch (error: any) {
    return NextResponse.json({ error: error.message })
  }
}
