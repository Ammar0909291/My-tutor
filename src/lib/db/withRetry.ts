import { captureError } from '@/lib/monitoring'

/**
 * IS THIS FAILURE THE DATABASE BEING UNREACHABLE, OR SOMETHING ELSE?
 *
 * ── WHY THIS PREDICATE IS NOW EXPORTED (ENG-D18, 2026-09-12) ────────────────
 * An English real-student audit recorded 6 `session create failed: {"success":
 * false,"error":"Internal server error"}` events across ~175 concepts. Five
 * correlated with `GET /api/health` reporting `db:false` within seconds. The
 * sixth did not — `/api/health` read `{"status":"ok","db":true}` immediately
 * afterwards and the retry succeeded at once.
 *
 * The audit could not say what the sixth one WAS, and neither could anyone
 * reading the logs, because `/api/sessions`'s catch collapses every non-Zod
 * failure into one opaque sentence: the response carries no discriminator and
 * the log line carries only the raw error. "Mostly DB" was the honest limit of
 * what the evidence supported.
 *
 * The predicate that would have answered it already existed — right below,
 * inline in `withRetry`, where it decides what is worth retrying. It is lifted
 * out UNCHANGED (same codes, same message fragments, same order) so a caller
 * can classify a failure it has already caught, without a second, drifting
 * copy of the list. `withRetry` now calls it, so there remains exactly one
 * definition of "the database is unreachable" in this file.
 *
 * This is observability, not behaviour: nothing retries differently, nothing
 * is swallowed, and no error is reclassified into a success.
 */
export function isDbConnectionError(error: unknown): boolean {
  const e = error as { code?: unknown; message?: unknown } | null
  if (!e || typeof e !== 'object') return false
  const code = typeof e.code === 'string' ? e.code : ''
  const message = typeof e.message === 'string' ? e.message : ''
  return (
    code === 'P1001' ||
    code === 'P1002' ||
    code === 'P1008' ||
    code === 'P1017' ||
    code === 'P2024' ||
    message.includes("Can't reach database") ||
    message.includes('Connection reset') ||
    message.includes('terminating connection') ||
    message.includes('connection terminated') ||
    message.includes('connection closed') ||
    message.toLowerCase().includes('socket timeout') ||
    message.includes('fetching a new connection from the connection pool')
  )
}

export async function withRetry<T>(
  operation: () => Promise<T>,
  retries = 3,
  delay = 1000,
): Promise<T> {
  for (let i = 0; i < retries; i++) {
    try {
      return await operation()
    } catch (error: any) {
      // One definition, shared with callers that need to classify a failure
      // they have already caught — see `isDbConnectionError` above. The list
      // it holds is this one, lifted verbatim.
      const isConnectionError = isDbConnectionError(error)

      if (isConnectionError && i < retries - 1) {
        console.log(`DB connection failed, retry ${i + 1}/${retries}...`)
        await new Promise((resolve) => setTimeout(resolve, delay * (i + 1)))
        continue
      }
      // Connection errors that survive all retries are the signal that the
      // database itself is in trouble — report before propagating.
      if (isConnectionError) {
        captureError(error, { route: 'db/withRetry', tags: { kind: 'db-connection' }, extra: { retries } })
      }
      throw error
    }
  }
  throw new Error('Max retries exceeded')
}
