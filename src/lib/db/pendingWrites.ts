/**
 * REQUEST-SCOPED PENDING WRITES — no database write outlives its response.
 *
 * MEASURED 2026-10-02 (production `pg_stat_activity`). Eight connections sat
 * "idle in transaction" for up to 658 s, their last statements a
 * `spine_events` INSERT, an `explanation_assets` INSERT and plain BEGINs —
 * the writes the chat route started without awaiting. A serverless instance
 * is frozen the moment its response returns, so a write still in flight
 * leaves its transaction open, holding row locks. Two learners' turns then
 * failed (`chat-assistant-message timed out after 8000ms`, a 500; then
 * `chat-session-load`, a 503).
 *
 * Inside `withPendingWrites`, `trackWrite(p)` records a write the caller does
 * not await, and `settlePendingWrites(capMs)` waits for every recorded write
 * before the response goes out — bounded, so a slow database adds at most
 * `capMs` to one reply instead of freezing a transaction. Outside a scope
 * `trackWrite` is a no-op that returns its promise, so callers in other
 * routes and in tests behave exactly as before.
 *
 * Recorded promises are made total here: a rejected write is the writer's own
 * concern (each one already logs or swallows), never the response's.
 */
import { AsyncLocalStorage } from 'node:async_hooks'

const scope = new AsyncLocalStorage<Set<Promise<void>>>()

export function withPendingWrites<T>(fn: () => Promise<T>): Promise<T> {
  return scope.getStore() ? fn() : scope.run(new Set(), fn)
}

export function trackWrite<T>(p: Promise<T>): Promise<T> {
  const pending = scope.getStore()
  if (pending) {
    const settled: Promise<void> = p.then(() => {}, () => {}).finally(() => pending.delete(settled))
    pending.add(settled)
  }
  return p
}

export interface SettleResult {
  /** Writes recorded when settling began, plus any recorded while it ran. */
  waitedFor: number
  /** Writes still running when the cap was reached (0 when all finished). */
  stillPending: number
  waitedMs: number
}

/** Waits for every recorded write, including ones recorded while waiting, up to `capMs`. Never throws. */
export async function settlePendingWrites(capMs: number): Promise<SettleResult> {
  const pending = scope.getStore()
  const startedAt = Date.now()
  if (!pending || pending.size === 0) return { waitedFor: 0, stillPending: 0, waitedMs: 0 }
  const seen = new Set<Promise<void>>()
  let timer: ReturnType<typeof setTimeout> | undefined
  const cap = new Promise<'cap'>((resolve) => { timer = setTimeout(() => resolve('cap'), capMs) })
  try {
    while (pending.size > 0) {
      const batch = [...pending]
      for (const p of batch) seen.add(p)
      if ((await Promise.race([Promise.all(batch), cap])) === 'cap') break
    }
  } finally {
    if (timer) clearTimeout(timer)
  }
  return { waitedFor: seen.size, stillPending: pending.size, waitedMs: Date.now() - startedAt }
}
