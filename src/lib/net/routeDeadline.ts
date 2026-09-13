/**
 * ONE WALL CLOCK FOR THE WHOLE REQUEST — PCD-002's second contributor.
 *
 * ── WHAT THE PROVIDER FIX LEFT OPEN ────────────────────────────────────────
 * `AI_CHAIN_DEADLINE_MS` (failoverRouter.ts, commit 6326c91) bounds the
 * PROVIDER CHAIN at 45s and is correct. It is not, by itself, a bound on the
 * REQUEST, for two measured reasons:
 *
 *   1. The chain's clock starts when `complete()` is called, not when the
 *      request arrives. Any time already spent — session load, profile,
 *      history, asset assembly — is invisible to it. 20s of DB work before the
 *      provider plus a 45s chain is 65s against a `maxDuration` of 60, so the
 *      PLATFORM kills the invocation and the learner gets the raw 504 this
 *      defect recorded. The chain never overran its own budget; the request
 *      overran the function's.
 *   2. `/api/learn/chat` wraps NONE of its ~27 direct Prisma calls (and every
 *      transitive one) in a timeout, and six of them sit inside `withRetry`
 *      with a 3-attempt / 1s-2s-backoff policy. During a database stall a
 *      single unbounded call hangs to the platform limit, and a retried one
 *      MULTIPLIES that hang. Same 504, different road.
 *
 * ── THE INVARIANT THIS MODULE EXISTS TO STATE ──────────────────────────────
 * Every bounded operation in the request gets `min(its own cap, what is LEFT
 * of the request's budget)` — never its own cap alone. A timeout that does not
 * consult the request clock is not a bound on the request: three operations
 * each correctly capped at 8s still spend 24s, and a retry after a timeout
 * starts a fresh cap the request cannot afford. That is the specific trap the
 * per-operation pattern in `/api/sessions` does not close (its `dbCall` is
 * `withRetry(withTimeout(10s), 2, 800)` — a 20.8s worst case with no reference
 * to any request-level clock), which is why this is NOT a copy of it.
 *
 * ── AND WHY A PER-OPERATION BOUND IS STILL NOT ENOUGH ──────────────────────
 * Bounding what you remembered to bound leaves everything you did not. The
 * route therefore ALSO races its whole handler against this same clock, so an
 * unbounded operation — present, transitive, or added later — produces an
 * honest 503 from this application instead of a platform 504. The per-operation
 * budgets below are what make that outcome RARE and diagnosable; the race is
 * what makes the guarantee TOTAL.
 *
 * Pure: no imports, no I/O, no clock of its own beyond an injectable `now`.
 */

/**
 * The request's own budget, against `vercel.json`'s `maxDuration: 60` for this
 * route. The 5s that is deliberately NOT claimed covers what the handler does
 * not control: cold start before the first line runs, request body transfer,
 * response serialisation, and the platform's own accounting. A budget equal to
 * `maxDuration` would be no budget at all — the race would fire at the same
 * instant the platform kills the process.
 *
 * 55s IS DERIVED, NOT PICKED. It is exactly `AI_CHAIN_DEADLINE_MS` (45s) plus
 * `POST_PROVIDER_RESERVE_MS` (10s), and that identity is the point: on a
 * healthy request arriving promptly, `providerBudgetMs` returns the chain's
 * FULL 45s, so the fix in 6326c91 is preserved byte-for-byte and this layer is
 * inert. It only bites once earlier work has already spent part of the clock —
 * which is the case that produced the 504. A first draft used 52s and was
 * caught by this module's own test handing the chain 42s on a perfectly healthy
 * turn: a silent tightening of a fix this change is explicitly not allowed to
 * weaken, and a real regression had the number shipped.
 */
export const CHAT_ROUTE_BUDGET_MS = Number(process.env.CHAT_ROUTE_BUDGET_MS ?? 55_000)

/**
 * Time held back from the PROVIDER so the turn can still be persisted and
 * answered. The route's two most important writes — the snapshot delta and the
 * assistant message — are awaited deliberately (a serverless instance freezes
 * the moment the response is returned, so a dropped write loses the turn's
 * entire learning state). They must be affordable after the model replies, and
 * the only way to guarantee that is to refuse to sell that time to the chain.
 */
export const POST_PROVIDER_RESERVE_MS = Number(process.env.CHAT_POST_PROVIDER_RESERVE_MS ?? 10_000)

/** Per-DB-operation cap, before the request clock narrows it further. */
export const CHAT_DB_OP_TIMEOUT_MS = Number(process.env.CHAT_DB_OP_TIMEOUT_MS ?? 8_000)

/** Below this, an attempt cannot do useful work and is not worth starting. */
export const MIN_DB_ATTEMPT_MS = 250

/** Raised when the request's own budget is exhausted. Never a DB error, never
 *  a provider error — a distinct third thing, so telemetry can say which. */
export class RouteDeadlineError extends Error {
  readonly elapsedMs: number
  readonly budgetMs: number
  constructor(elapsedMs: number, budgetMs: number) {
    super(`route deadline exceeded after ${elapsedMs}ms of ${budgetMs}ms`)
    this.name = 'RouteDeadlineError'
    this.elapsedMs = elapsedMs
    this.budgetMs = budgetMs
  }
}

export interface RouteDeadline {
  readonly budgetMs: number
  elapsedMs(): number
  /** May go negative — callers clamp. Negative is information, not an error. */
  remainingMs(): number
  expired(): boolean
}

export function createRouteDeadline(
  budgetMs: number = CHAT_ROUTE_BUDGET_MS,
  now: () => number = Date.now,
): RouteDeadline {
  const start = now()
  const elapsedMs = () => now() - start
  const remainingMs = () => budgetMs - elapsedMs()
  return { budgetMs, elapsedMs, remainingMs, expired: () => remainingMs() <= 0 }
}

/**
 * What the provider chain may spend. `min(chain cap, remaining - reserve)`.
 *
 * Returns 0 when the reserve alone is already unaffordable — the caller must
 * then NOT call the provider, because doing so would spend time the turn needs
 * to persist itself. A degraded reply that is saved beats a real reply that is
 * killed mid-write.
 */
export function providerBudgetMs(
  remainingMs: number,
  chainDeadlineMs: number,
  reserveMs: number = POST_PROVIDER_RESERVE_MS,
): number {
  const affordable = remainingMs - reserveMs
  if (affordable <= 0) return 0
  return Math.min(chainDeadlineMs, affordable)
}

/**
 * What ONE database operation may spend: `min(per-op cap, remaining)`, floored
 * at 0 so an exhausted request refuses rather than starting work it cannot
 * finish. `MIN_DB_ATTEMPT_MS` is the caller's affordability test, not this
 * function's — a caller may legitimately choose to run a last, very short
 * attempt.
 */
export function dbBudgetMs(
  remainingMs: number,
  perOpMs: number = CHAT_DB_OP_TIMEOUT_MS,
): number {
  return Math.max(0, Math.min(perOpMs, remainingMs))
}

/**
 * May a FURTHER attempt be started after one has already failed?
 *
 * This is the question a per-operation timeout cannot answer and the reason
 * retries are the sharper half of this defect: the first attempt's timeout
 * fired correctly, and then the retry starts a brand-new full budget the
 * request can no longer afford. A retry is allowed only when the backoff AND a
 * minimally useful attempt both still fit in what is left.
 */
export function canAffordDbRetry(
  remainingMs: number,
  backoffMs: number,
  minAttemptMs: number = MIN_DB_ATTEMPT_MS,
): boolean {
  return remainingMs > backoffMs + minAttemptMs
}
