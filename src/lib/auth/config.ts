import bcrypt from 'bcryptjs'
import type { NextAuthConfig } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import Google from 'next-auth/providers/google'
import { z } from 'zod'
import { prisma } from '@/lib/db/prisma'
import { maybeBootstrapAdmin } from '@/lib/auth/admin'

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
        const { email, password } = parsed.data
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
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id
        // Auto-promote ADMIN_EMAILS users to ADMIN role on their first sign-in
        if (user.id && user.email) {
          await maybeBootstrapAdmin(user.id, user.email).catch(() => {})
        }
        return token
      }
      // Re-validate token.sub on every use: if the DB was reset or the user row
      // was re-created under a new id, heal the token so all routes get the real id.
      // Wrapped in try-catch: a DB error (cold-start, network blip) must never
      // break auth — we fall back to returning the token unchanged.
      try {
        if (token.sub && token.email) {
          const byId = await prisma.user.findUnique({ where: { id: token.sub }, select: { id: true } })
          if (!byId) {
            const byEmail = await prisma.user.findUnique({ where: { email: String(token.email) }, select: { id: true } })
            if (byEmail) token.sub = byEmail.id
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
