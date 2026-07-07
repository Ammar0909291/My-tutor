import type { NextAuthConfig } from 'next-auth'

// CRIT-1 FIX — Edge-safe auth config, used ONLY by middleware.ts.
//
// Root cause of CRIT-1: src/middleware.ts wraps almost every route in
// NextAuth's auth() wrapper, which evaluates the session (running the jwt/
// session callbacks) before the inner middleware function ever runs.
// Next.js middleware always executes in the Edge runtime, and the full
// config's jwt callback (./config.ts) calls prisma.user.findUnique(...).
// Prisma's query engine is not supported in the Edge runtime; instead of
// failing fast, the call hung indefinitely there, stalling every
// authenticated request app-wide once a session cookie was present.
//
// This config intentionally has NO providers and NO DB-backed callbacks —
// it only decodes/verifies the signed JWT cookie to answer "is there a
// session", which is all middleware.ts actually needs (it redirects based
// on session presence/absence, never on role or ban status). Authoritative,
// DB-validated checks (soft-delete/ban enforcement, ADMIN_EMAILS bootstrap,
// stale-token healing) remain exactly as before in ./config.ts, which runs
// in the Node.js runtime via every page/Server Component/API route's own
// auth() call (e.g. src/app/dashboard/page.tsx calls auth() + Prisma
// directly) — so no behavioral regression: those checks still happen on
// every authenticated request, just not redundantly inside Edge middleware.
export const edgeAuthConfig: NextAuthConfig = {
  session: { strategy: 'jwt' },
  trustHost: true,
  secret: process.env.AUTH_SECRET,
  pages: {
    signIn: '/auth/login',
    error: '/auth/login',
  },
  providers: [],
  callbacks: {
    session({ session, token }) {
      return {
        ...session,
        user: { ...session.user, id: token.sub as string },
      }
    },
  },
}
