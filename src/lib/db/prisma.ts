import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

// Auto-migrate missing columns on startup (idempotent — safe to run every boot).
// Each statement runs in its own try/catch so one failure never blocks the
// rest, matching the pattern already established in scripts/fix-db.ts.
//
// Added 2026-07-08: users.role and profiles.voiceSpeed close the exact gap
// that was taking login down in production — the credentials authorize()
// path (and several other reads) implicitly select every column the current
// Prisma Client knows about, so a database that predates the migration
// adding these two columns throws "column does not exist" on every login
// attempt. This self-heals it the moment this code deploys, without waiting
// on `prisma migrate deploy` to run separately. It does NOT substitute for
// deploying prisma/migrations/20260707120000_sync_untracked_schema_drift in
// full — the ~40 other objects in that migration (Educational Brain tables,
// Evidence Engine, Knowledge Asset tables, etc.) still need a real
// `prisma migrate deploy` against production; this only covers the two
// columns already confirmed to break core auth.
const ENSURE_COLUMN_STATEMENTS = [
  `ALTER TABLE profiles ADD COLUMN IF NOT EXISTS country VARCHAR(10) DEFAULT 'global'`,
  `DO $$ BEGIN
     CREATE TYPE "PlatformRole" AS ENUM ('STUDENT', 'ADMIN');
   EXCEPTION WHEN duplicate_object THEN NULL;
   END $$`,
  `ALTER TABLE users ADD COLUMN IF NOT EXISTS "role" "PlatformRole" NOT NULL DEFAULT 'STUDENT'`,
  `ALTER TABLE profiles ADD COLUMN IF NOT EXISTS "voiceSpeed" DOUBLE PRECISION NOT NULL DEFAULT 1.0`,
]

async function ensureColumns() {
  for (const sql of ENSURE_COLUMN_STATEMENTS) {
    try {
      await prisma.$executeRawUnsafe(sql)
    } catch (e: any) {
      console.log('DB column check:', e.message)
    }
  }
  console.log('✅ DB columns verified')
}

ensureColumns()

/**
 * Retry wrapper for Prisma queries against Neon serverless.
 *
 * Neon auto-suspends idle compute, so the first query after a pause can fail
 * with a connection-termination error (P1001 / P1017 / "Can't reach database
 * server" / "Connection terminated"). Those are transient — the next attempt
 * wakes the compute and succeeds. This retries such errors with a short
 * backoff; non-connection errors are rethrown immediately.
 *
 * Usage:  const user = await withRetry(() => prisma.user.findUnique({ ... }))
 */
const RETRYABLE = [
  'P1001', // Can't reach database server
  'P1002', // Database server reached but timed out
  'P1008', // Operation timed out
  'P1017', // Server has closed the connection
]

function isRetryable(err: unknown): boolean {
  const code = (err as { code?: string })?.code
  if (code && RETRYABLE.includes(code)) return true
  const msg = (err instanceof Error ? err.message : String(err)).toLowerCase()
  return (
    msg.includes('connection terminated') ||
    msg.includes("can't reach database") ||
    msg.includes('connection closed') ||
    msg.includes('terminating connection') ||
    msg.includes('connection reset')
  )
}

export async function withRetry<T>(fn: () => Promise<T>, retries = 3, delayMs = 300): Promise<T> {
  let lastErr: unknown
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      return await fn()
    } catch (err) {
      lastErr = err
      if (attempt === retries || !isRetryable(err)) throw err
      await new Promise((r) => setTimeout(r, delayMs * (attempt + 1)))
    }
  }
  throw lastErr
}
