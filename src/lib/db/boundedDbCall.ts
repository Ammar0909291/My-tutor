/**
 * A DATABASE CALL THAT CANNOT OUTLIVE THE REQUEST — PCD-002.
 *
 * ── WHY THIS IS NOT `/api/sessions`' `dbCall` ──────────────────────────────
 * That one reads `withRetry(() => withTimeout(fn(), 10_000, label), 2, 800)`.
 * It is a real improvement over nothing and it fixed what it was written for,
 * but its worst case is 10 + 0.8 + 10 = 20.8s and it consults no clock above
 * itself. Three such calls spend 62s inside a 60s function while every
 * individual timeout behaves exactly as designed. The bug is not the cap; it is
 * that the cap is absolute where the budget is shared.
 *
 * So the shape here is deliberately different in two places:
 *   · the timeout granted is `min(per-op cap, what is LEFT of the request)`,
 *     which shrinks as the request ages and reaches zero when it is spent;
 *   · a retry must be AFFORDABLE — backoff plus a minimally useful attempt have
 *     to fit in what remains — instead of being owed one by a counter. This is
 *     the sharper half: the first timeout fired correctly, and the retry that
 *     follows it opens a brand-new full budget the request can no longer pay.
 *
 * ── WHAT IT WILL NOT DO ────────────────────────────────────────────────────
 * It does not retry writes unless the caller says the write is safe to repeat.
 * A timeout is not evidence that the statement did not commit — the server may
 * have applied it and the client simply stopped waiting — so retrying an
 * unguarded INSERT risks two rows for one turn. `retries` therefore defaults to
 * 0 and every caller that raises it must name its idempotency in the comment at
 * its call site.
 *
 * It also never converts a failure into a success: an exhausted budget throws,
 * so the caller stops rather than continuing into state mutations with data it
 * does not have.
 */
import { withTimeout, TimeoutError } from '@/lib/net/timeout'
import { isDbConnectionError } from '@/lib/db/withRetry'
import { dbBudgetMs, canAffordDbRetry, MIN_DB_ATTEMPT_MS, type RouteDeadline } from '@/lib/net/routeDeadline'
import { recordBudgetEvent } from '@/lib/teaching/budgetTelemetry'

export interface BoundedDbOptions {
  /** Extra attempts after the first. 0 by default — see the header. Raise it
   *  ONLY for reads, or for writes with a real idempotency key. */
  retries?: number
  backoffMs?: number
  /** Per-operation cap before the request clock narrows it. */
  perOpMs?: number
}

export async function boundedDbCall<T>(
  deadline: RouteDeadline,
  label: string,
  fn: () => Promise<T>,
  opts: BoundedDbOptions = {},
): Promise<T> {
  const { retries = 0, backoffMs = 300, perOpMs } = opts
  let attempt = 0
  for (;;) {
    const granted = dbBudgetMs(deadline.remainingMs(), perOpMs)
    // Refusing beats starting work the request cannot finish: a doomed attempt
    // still holds a pooled connection, and this route runs under a connection
    // limit a busy instance has already exhausted once in production.
    if (granted < MIN_DB_ATTEMPT_MS) {
      recordBudgetEvent({
        outcome: 'route-deadline', label, attempt,
        elapsedMs: deadline.elapsedMs(), budgetMs: deadline.budgetMs, grantedMs: granted,
      })
      throw new TimeoutError(granted, label)
    }
    try {
      return await withTimeout(fn(), granted, label)
    } catch (err) {
      // Three outcomes that need three different repairs, named rather than
      // collapsed — see budgetTelemetry.
      const timedOut = err instanceof TimeoutError
      const unavailable = !timedOut && isDbConnectionError(err)
      if (timedOut || unavailable) {
        recordBudgetEvent({
          outcome: timedOut ? 'db-timeout' : 'db-unavailable', label, attempt,
          elapsedMs: deadline.elapsedMs(), budgetMs: deadline.budgetMs, grantedMs: granted,
        })
      }
      const mayRetry = attempt < retries && (timedOut || unavailable)
      if (!mayRetry) throw err
      // THE LINE THIS MODULE EXISTS FOR. A retry is not owed by the counter;
      // it has to fit in the budget that is actually left.
      if (!canAffordDbRetry(deadline.remainingMs(), backoffMs)) throw err
      await new Promise((r) => setTimeout(r, backoffMs))
      attempt += 1
    }
  }
}
