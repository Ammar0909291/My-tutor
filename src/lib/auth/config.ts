import bcrypt from 'bcryptjs'
import type { NextAuthConfig } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import Google from 'next-auth/providers/google'
import { z } from 'zod'
import { prisma } from '@/lib/db/prisma'
import { maybeBootstrapAdmin } from '@/lib/auth/admin'
import { canonicalEmail } from '@/lib/auth/email'
import { isSignInAllowed, resolveJwtSub } from '@/lib/auth/banGuard'
import { withTimeout } from '@/lib/net/timeout'

// P0: every Prisma call below is on the request path of auth() — the single
// function called at the top of ~68 pages/API routes app-wide (login itself,
// plus every jwt() re-validation on every subsequent authenticated request).
// A Prisma call can hang without throwing (pool exhaustion, a stalled Neon
// connection) instead of failing fast, and none of these call sites had a
// bound on them — so a hang here doesn't just break the one page that hit
// it, it blocks auth() itself for every caller, upstream of the per-route
// withTimeout guards added elsewhere (dashboard/page.tsx, subjects/library,
// etc.), which only bound the query that runs AFTER auth() resolves. This is
// the root cause behind "Signing in…" never resolving, dashboard/curriculum/
// chat hanging, and refresh intermittently breaking — not five separate
// bugs, one unguarded chokepoint all of them pass through. Existing
// try/catch blocks already handle a *rejected* promise (DB error → fail
// open / heal); withTimeout makes a *hung* promise reject too, so those same
// catch blocks now also cover the hang case instead of nothing covering it.
const AUTH_DB_TIMEOUT_MS = 8000

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
        // used below are requested. withTimeout bounds it so a hung
        // connection surfaces as a normal CredentialsSignin error (NextAuth's
        // standard "authorize() threw" handling, already rendered by the
        // login page) instead of leaving the client's "Signing in…" state
        // waiting indefinitely on a promise that never settles.
        const user = await withTimeout(prisma.user.findUnique({
          where: { email },
          select: { id: true, email: true, name: true, image: true, passwordHash: true, isDeleted: true },
        }), AUTH_DB_TIMEOUT_MS, 'auth-authorize-lookup')
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
        const dbUser = await withTimeout(prisma.user.findUnique({
          where: { email },
          select: { id: true, isDeleted: true },
        }), AUTH_DB_TIMEOUT_MS, 'auth-signIn-lookup')
        // If the user row doesn't exist yet (first OAuth sign-in), allow through —
        // the jwt callback creates the DB row. If it exists and is deleted, block.
        if (!isSignInAllowed(dbUser)) return false
      } catch {
        // DB unreachable OR timed out — fail open so auth isn't broken by
        // transient DB errors (withTimeout turns a hang into a rejection,
        // which this same catch now also covers).
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
            await withTimeout(prisma.user.upsert({
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
            }), AUTH_DB_TIMEOUT_MS, 'auth-oauth-upsert')
            // Re-read the actual DB id — may differ when email already existed
            // (credentials account predates the Google sign-in).
            const dbUser = await withTimeout(prisma.user.findUnique({
              where: { email },
              select: { id: true },
            }), AUTH_DB_TIMEOUT_MS, 'auth-oauth-reread')
            if (dbUser) token.sub = dbUser.id
            // Populate the accounts table so the DB accurately reflects which
            // OAuth provider authenticated the user (no PrismaAdapter required).
            // withTimeout, not just .catch(): a hang here (not a rejection)
            // previously bypassed the .catch() entirely and blocked the
            // whole Google sign-in — the .catch() only ever handled a thrown
            // error, never a stuck connection.
            if (token.sub) {
              await withTimeout(prisma.account.upsert({
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
              }), AUTH_DB_TIMEOUT_MS, 'auth-oauth-account-upsert').catch((err) => console.error('[jwt/oauth] account upsert failed:', err))
            }
          } catch (err) {
            // Upsert failed or timed out — keep token.sub as Google sub; the
            // re-validation byEmail fallback will attempt recovery on the
            // next request.
            console.error('[jwt/oauth] user upsert failed:', err)
          }
        } else {
          token.sub = user.id
        }

        // Auto-promote ADMIN_EMAILS users to ADMIN role on their first sign-in.
        // Use token.sub (real DB id) not user.id (may be Google sub for OAuth).
        // withTimeout wraps the whole call, not just .catch(): same hang-vs-
        // reject gap as above — a stuck query here would otherwise block
        // sign-in completion even though errors were already caught.
        if (token.sub && user.email) {
          await withTimeout(maybeBootstrapAdmin(token.sub as string, user.email), AUTH_DB_TIMEOUT_MS, 'auth-admin-bootstrap').catch(() => {})
        }
        return token
      }
      // Re-validate token on every subsequent use. This is the single
      // highest-traffic branch in the whole auth config: it runs inside
      // every auth() call, and auth() is called at the top of ~68
      // pages/API routes app-wide (dashboard, curriculum, chat, lesson
      // nav, refresh — effectively everything). Previously unguarded, so a
      // hung (not merely erroring) Neon connection here didn't just break
      // this one query, it hung auth() itself for every single caller,
      // upstream of any per-route timeout guard added elsewhere.
      // Wrapped in try-catch: DB errors must never break auth — fall back to
      // returning the token unchanged so a Redis/Neon cold-start doesn't log
      // everyone out. withTimeout ensures a hang reaches this same catch
      // instead of blocking indefinitely.
      try {
        if (token.sub && token.email) {
          const byId = await withTimeout(prisma.user.findUnique({
            where: { id: token.sub },
            select: { id: true, isDeleted: true },
          }), AUTH_DB_TIMEOUT_MS, 'auth-revalidate-byId')
          // User row gone — try to heal by email (DB reset scenario). Only
          // fetched when byId is missing, matching the original lazy lookup.
          const byEmail = byId ? null : await withTimeout(prisma.user.findUnique({
            where: { email: canonicalEmail(String(token.email)) },
            select: { id: true, isDeleted: true },
          }), AUTH_DB_TIMEOUT_MS, 'auth-revalidate-byEmail')
          // MED-8: resolveJwtSub returns undefined to invalidate the token
          // immediately (deleted/not-found user) instead of waiting for JWT
          // expiry; otherwise it heals to byEmail.id or keeps the current sub.
          token.sub = resolveJwtSub(byId, byEmail, token.sub)
        }
      } catch {
        // DB unreachable or timed out — return token as-is; routes will handle any missing user
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
