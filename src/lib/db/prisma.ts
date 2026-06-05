import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
    datasources: {
      db: {
        url: process.env.DATABASE_URL,
      },
    },
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
