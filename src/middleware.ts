// CRIT-1 FIX: use the Edge-safe auth instance here, not '@/lib/auth' (which
// pulls in Prisma-backed callbacks that hang when executed in the Edge
// runtime middleware always runs in). See src/lib/auth/edge-config.ts.
import { auth } from '@/lib/auth/edge'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { slidingWindow, classifyApiPath, clientIp, RL_TIERS } from '@/lib/rateLimitEdge'

const PROTECTED = ['/dashboard', '/onboarding', '/learn', '/profile', '/settings', '/coach', '/quiz', '/flashcards', '/progress']
const ADMIN_PATHS = ['/admin']
const AUTH_ONLY = ['/auth/login', '/auth/signup', '/auth/forgot-password']

export default auth(function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  // ─── DEF-EJ-10: API-wide per-IP rate limiting (Edge, in-memory) ────────────
  // First defensive layer for every /api route. Sensitive Node routes layer a
  // Redis-backed per-user/IP limiter on top (see lib/rateLimit.ts).
  if (pathname.startsWith('/api/')) {
    const tier = classifyApiPath(pathname)
    if (tier) {
      const { limit, windowMs } = RL_TIERS[tier]
      const ip = clientIp(req.headers)
      const result = slidingWindow(`mw:${tier}:${ip}`, limit, windowMs)
      if (!result.success) {
        return NextResponse.json(
          { error: 'Too many requests. Please slow down and try again shortly.' },
          {
            status: 429,
            headers: {
              'Retry-After': String(result.retryAfterSec),
              'X-RateLimit-Limit': String(result.limit),
              'X-RateLimit-Remaining': '0',
            },
          },
        )
      }
    }
    return NextResponse.next()
  }

  // ─── Page-route auth protection ────────────────────────────────────────────
  const session = (req as unknown as { auth?: { user?: unknown } }).auth

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

  // /dashboard/v2 was the staging route for the redesigned dashboard, now
  // promoted to /dashboard — redirect old links/bookmarks.
  if (pathname === '/dashboard/v2' || pathname.startsWith('/dashboard/v2/')) {
    return NextResponse.redirect(new URL('/dashboard', req.url))
  }

  return NextResponse.next()
})

export const config = {
  // Include /api so the rate limiter runs on it; still skip Next internals/assets.
  matcher: ['/((?!_next/static|_next/image|favicon.ico|icons|manifest.json|sw.js).*)'],
}
