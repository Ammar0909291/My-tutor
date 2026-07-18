import bcrypt from 'bcryptjs'
import type { NextAuthConfig } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import Google from 'next-auth/providers/google'
import { z } from 'zod'
import { prisma } from '@/lib/db/prisma'
import { maybeBootstrapAdmin } from '@/lib/auth/admin'
import { canonicalEmail } from '@/lib/auth/email'
import { isSignInAllowed, resolveJwtSub } from '@/lib/auth/banGuard'

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
        const email = canonicalEmail(parsed.data.email)
        const { password } = parsed.data
        // Scoped select (not a bare findUnique): this is the one query in the
        // login path with no surrounding try/catch, so a schema-drift column
        // this route never touches (e.g. a migration not yet deployed to
        // this database) can't take login down — only the columns actually
        // used below are requested.
        const user = await prisma.user.findUnique({
          where: { email },
          select: { id: true, email: true, name: true, image: true, passwordHash: true, isDeleted: true },
        })
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
    async signIn({ user, account }) {
      if (!user?.email) return false
      try {
        const email = canonicalEmail(user.email)
        const dbUser = await prisma.user.findUnique({
          where: { email },
          select: { id: true, isDeleted: true },
        })
        // If the user row doesn't exist yet (first OAuth sign-in), allow through —
        // the jwt callback creates the DB row. If it exists and is deleted, block.
        if (!isSignInAllowed(dbUser)) return false
      } catch {
        // DB unreachable — fail open so auth isn't broken by transient DB errors.
      }
      return true
    },
    async jwt({ token, user, account }) {
      if (user) {
        // GOOGLE-OAUTH-FIX: NextAuth v5 with JWT strategy has no PrismaAdapter,
        // so OAuth sign-ins never create a DB User row automatically. Without a
        // row, the re-validation branch below calls prisma.user.findUnique(sub)
        // → null → resolveJwtSub(null, null, ...) → undefined → token invalidated
        // → user silently logged out immediately after the Google callback.
        //
        // Fix: for any non-credentials provider (Google, etc.), upsert the User
        // row now. Then read back the actual DB id and set token.sub to it —
        // this handles the case where the email already exists (a credentials
        // user linking Google for the first time), ensuring token.sub always
        // matches a real DB id rather than an opaque Google sub string.
        if (account && account.provider !== 'credentials') {
          try {
            const email = canonicalEmail(user.email!)
            await prisma.user.upsert({
              where: { email },
              update: {
                name: user.name ?? undefined,
                image: user.image ?? undefined,
              },
              create: {
                id: user.id,          // Google sub — valid as a DB id for new accounts
                email,
                name: user.name ?? 'Student',
                image: user.image ?? null,
              },
            })
            // Re-read the actual DB id — may differ when email already existed
            // (credentials account predates the Google sign-in).
            const dbUser = await prisma.user.findUnique({
              where: { email },
              select: { id: true },
            })
            if (dbUser) token.sub = dbUser.id
            // Populate the accounts table so the DB accurately reflects which
            // OAuth provider authenticated the user (no PrismaAdapter required).
            if (token.sub) {
              await prisma.account.upsert({
                where: {
                  provider_providerAccountId: {
                    provider: account.provider,
                    providerAccountId: account.providerAccountId,
                  },
                },
                update: {
                  access_token: account.access_token ?? null,
                  id_token: account.id_token ?? null,
                  refresh_token: account.refresh_token ?? null,
                  expires_at: account.expires_at ?? null,
                  token_type: account.token_type ?? null,
                  scope: account.scope ?? null,
                  session_state: typeof account.session_state === 'string' ? account.session_state : null,
                },
                create: {
                  userId: token.sub as string,
                  type: account.type,
                  provider: account.provider,
                  providerAccountId: account.providerAccountId,
                  access_token: account.access_token ?? null,
                  id_token: account.id_token ?? null,
                  refresh_token: account.refresh_token ?? null,
                  expires_at: account.expires_at ?? null,
                  token_type: account.token_type ?? null,
                  scope: account.scope ?? null,
                  session_state: typeof account.session_state === 'string' ? account.session_state : null,
                },
              }).catch((err) => console.error('[jwt/oauth] account upsert failed:', err))
            }
          } catch (err) {
            // Upsert failed — keep token.sub as Google sub; the re-validation
            // byEmail fallback will attempt recovery on the next request.
            console.error('[jwt/oauth] user upsert failed:', err)
          }
        } else {
          token.sub = user.id
        }

        // Auto-promote ADMIN_EMAILS users to ADMIN role on their first sign-in.
        // Use token.sub (real DB id) not user.id (may be Google sub for OAuth).
        if (token.sub && user.email) {
          await maybeBootstrapAdmin(token.sub as string, user.email).catch(() => {})
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
          // User row gone — try to heal by email (DB reset scenario). Only
          // fetched when byId is missing, matching the original lazy lookup.
          const byEmail = byId ? null : await prisma.user.findUnique({
            where: { email: canonicalEmail(String(token.email)) },
            select: { id: true, isDeleted: true },
          })
          // MED-8: resolveJwtSub returns undefined to invalidate the token
          // immediately (deleted/not-found user) instead of waiting for JWT
          // expiry; otherwise it heals to byEmail.id or keeps the current sub.
          token.sub = resolveJwtSub(byId, byEmail, token.sub)
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
