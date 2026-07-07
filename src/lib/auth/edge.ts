import NextAuth from 'next-auth'
import { edgeAuthConfig } from './edge-config'

// CRIT-1 FIX — a separate, Edge-safe NextAuth instance for middleware.ts
// only. Do not import this `auth` outside of middleware.ts: it cannot run
// the DB-backed checks in ./config.ts. All other code (pages, Server
// Components, API routes, server actions) must keep importing `auth` from
// '@/lib/auth' or '@/auth' (the full, Node-runtime config).
export const { auth } = NextAuth(edgeAuthConfig)
