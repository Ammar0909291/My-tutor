// TEMPORARY DEBUG ENDPOINT — remove before production
// NOTE: this app uses next-auth v5 (beta.31). getServerSession/authOptions
// do not exist in v5 — calling them throws ReferenceError at runtime.
// auth() is the v5 equivalent of getServerSession.
import { auth } from '@/lib/auth'
import { NextResponse } from 'next/server'

export async function GET() {
  const session = await auth()
  return NextResponse.json({
    session,
    sessionUserKeys: session?.user ? Object.keys(session.user) : null,
    userId: (session?.user as { id?: string } | undefined)?.id ?? null,
    userEmail: session?.user?.email ?? null,
    hasNextauthSecret: !!process.env.NEXTAUTH_SECRET,
    hasAuthSecret: !!process.env.AUTH_SECRET,
    nextauthSecretLength: process.env.NEXTAUTH_SECRET?.length ?? 0,
    authSecretLength: process.env.AUTH_SECRET?.length ?? 0,
    nodeEnv: process.env.NODE_ENV,
  })
}
