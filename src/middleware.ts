import { auth } from '@/lib/auth'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

const PROTECTED = ['/dashboard', '/onboarding', '/learn', '/profile', '/billing', '/settings', '/coach', '/quiz', '/flashcards', '/progress']
const ADMIN_PATHS = ['/admin']
const AUTH_ONLY = ['/auth/login', '/auth/signup', '/auth/forgot-password']

// Static / public paths that must never be intercepted
const ALWAYS_PASS = ['/_next', '/favicon.ico', '/manifest.json', '/sw.js', '/icons/', '/api/']

export default auth(function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  const session = (req as unknown as { auth?: { user?: unknown } }).auth

  // Never intercept static assets or API routes
  if (ALWAYS_PASS.some((p) => pathname.startsWith(p))) {
    return NextResponse.next()
  }

  const isProtected = PROTECTED.some((p) => pathname === p || pathname.startsWith(p + '/'))
  const isAdminPath = ADMIN_PATHS.some((p) => pathname === p || pathname.startsWith(p + '/'))
  const isAuthOnly = AUTH_ONLY.some((p) => pathname === p || pathname.startsWith(p + '/'))

  if ((isProtected || isAdminPath) && !session) {
    const url = new URL('/auth/login', req.url)
    url.searchParams.set('callbackUrl', pathname)
    return NextResponse.redirect(url)
  }

  if (isAuthOnly && session) {
    return NextResponse.redirect(new URL('/dashboard', req.url))
  }

  return NextResponse.next()
})

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|icons|manifest.json|sw.js).*)'],
}
