import bcrypt from 'bcryptjs'
import type { NextAuthConfig } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import Google from 'next-auth/providers/google'
import { z } from 'zod'
import { prisma } from '@/lib/db/prisma'
import { maybeBootstrapAdmin } from '@/lib/auth/admin'

// Node.js-runtime-only config (Prisma + bcrypt). Used by the NextAuth route
// handler and every page/Server Component/API route's auth() call — never
// import this in middleware.ts or any other Edge-runtime context. See
// src/lib/auth/edge-config.ts for the Edge-safe config used by middleware.

const credentialsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})

export const authConfig: NextAuthConfig = {
  session: { strategy: 'jwt' },
  trustHost: true,
  secret: process.env.AUTH_SECRET,
  pages: {
    signIn: '/auth/login',
    error: '/auth/login',
  },
  providers: [
    ...(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET
      ? [Google({ clientId: process.env.GOOGLE_CLIENT_ID, clientSecret: process.env.GOOGLE_CLIENT_SECRET })]
      : []),
    Credentials({
      async authorize(credentials) {
        const parsed = credentialsSchema.safeParse(credentials)
        if (!parsed.success) return null
        // HIGH-2: normalize email before lookup so casing differences don't create duplicate identities.
        const email = parsed.data.email.trim().toLowerCase()
        const { password } = parsed.data
        const user = await prisma.user.findUnique({ where: { email } })
        if (!user?.passwordHash) return null
        if (user.isDeleted) return null  // soft-deleted accounts cannot log in
        const valid = await bcrypt.compare(password, user.passwordHash)
        if (!valid) return null
        return { id: user.id, email: user.email, name: user.name, image: user.image }
      },
    }),
  ],
  callbacks: {
    // HIGH-1: deny authentication for soft-deleted users across ALL providers
    // (Credentials already returns null above; this covers Google OAuth and any
    //  future providers before NextAuth issues a session token).
    async signIn({ user }) {
      if (!user?.email) return false
      try {
        const canonicalEmail = user.email.trim().toLowerCase()
        const dbUser = await prisma.user.findUnique({
          where: { email: canonicalEmail },
          select: { isDeleted: true },
        })
        // If the user row doesn't exist yet (first OAuth sign-in), allow through —
        // NextAuth will create it. If it exists and is deleted, block.
        if (dbUser?.isDeleted) return false
      } catch {
        // DB unreachable — fail open so auth isn't broken by transient DB errors.
      }
      return true
    },
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id
        // Auto-promote ADMIN_EMAILS users to ADMIN role on their first sign-in
        if (user.id && user.email) {
          await maybeBootstrapAdmin(user.id, user.email).catch(() => {})
        }
        return token
      }
      // Re-validate token on every subsequent use.
      // Wrapped in try-catch: DB errors must never break auth — fall back to
      // returning the token unchanged so a Redis/Neon cold-start doesn't log
      // everyone out.
      try {
        if (token.sub && token.email) {
          const byId = await prisma.user.findUnique({
            where: { id: token.sub },
            select: { id: true, isDeleted: true },
          })
          if (!byId) {
            // User row gone — try to heal by email (DB reset scenario)
            const canonicalEmail = String(token.email).trim().toLowerCase()
            const byEmail = await prisma.user.findUnique({
              where: { email: canonicalEmail },
              select: { id: true, isDeleted: true },
            })
            if (byEmail && !byEmail.isDeleted) {
              token.sub = byEmail.id
            } else {
              // User deleted or not found — invalidate token immediately (MED-8)
              token.sub = undefined
            }
          } else if (byId.isDeleted) {
            // MED-8: admin banned this user — nullify sub so all route auth checks
            // see no user id and return 401 without waiting for JWT expiry.
            token.sub = undefined
          }
        }
      } catch {
        // DB unreachable — return token as-is; routes will handle any missing user
      }
      return token
    },
    session({ session, token }) {
      return {
        ...session,
        user: { ...session.user, id: token.sub as string },
      }
    },
  },
}
