import { PrismaClient } from '@prisma/client'
import { withPoolParams } from './poolConfig'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// P0 (production pool exhaustion, 2026-07-22): explicit pool sizing — see
// poolConfig.ts for the full production-log evidence. Without this, Prisma
// defaults to connection_limit=5 / pool_timeout=10 on Vercel, which a
// single busy function instance exhausts, taking down /learn and /dashboard
// with "Timed out fetching a new connection from the connection pool".
const pooledUrl = withPoolParams(process.env.DATABASE_URL)

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    ...(pooledUrl ? { datasources: { db: { url: pooledUrl } } } : {}),
    log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

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
  'P2024', // Timed out fetching a new connection from the connection pool
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
    msg.includes('connection reset') ||
    msg.includes('socket timeout') ||
    msg.includes('fetching a new connection from the connection pool')
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
