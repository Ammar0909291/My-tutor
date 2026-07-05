import type { NextAuthConfig } from 'next-auth'

// Edge-safe auth config, used ONLY by middleware.ts.
//
// Root cause: src/middleware.ts wraps every matched route in NextAuth's
// auth() wrapper, which evaluates the session (running the jwt/session
// callbacks) before the inner middleware function ever runs. Next.js
// middleware always executes in the Edge runtime. The full config
// (./config.ts) uses bcryptjs and the Google/Credentials providers, none
// of which are Edge-compatible, and pulls in the Prisma client (via
// prisma.user.findUnique in the Credentials authorize callback) — Prisma's
// query engine does not run in the Edge runtime at all.
//
// This config intentionally has NO providers and NO DB-backed callbacks —
// it only decodes/verifies the signed JWT cookie to answer "is there a
// session", which is all middleware.ts actually needs (it redirects based
// on session presence/absence only, never on role or profile data).
// Authoritative, DB-validated checks remain exactly as before in
// ./config.ts, which runs in the Node.js runtime via every page/Server
// Component/API route's own auth() call — so no behavioral regression.
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
