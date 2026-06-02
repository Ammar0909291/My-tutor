import { auth } from '@/lib/auth'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

const PROTECTED = ['/dashboard', '/onboarding', '/learn', '/profile', '/billing']
const AUTH_ONLY = ['/auth/login', '/auth/signup', '/auth/forgot-password']

export default auth(function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  const session = (req as unknown as { auth?: { user?: unknown } }).auth

  const isProtected = PROTECTED.some((p) => pathname.startsWith(p))
  const isAuthOnly = AUTH_ONLY.some((p) => pathname.startsWith(p))

  if (isProtected && !session) {
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
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|public).*)'],
}
