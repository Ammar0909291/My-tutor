/**
 * BUDGET_EVENT — how the request's wall clock was spent, and which of the four
 * ways it can run out actually happened.
 *
 * ── WHY A FIFTH LINE RATHER THAN A FIELD ON TURN_EVENT ─────────────────────
 * `TURN_EVENT` describes a turn that REACHED the end of the route. Every
 * outcome this line exists to report is one where it did not: the handler was
 * abandoned mid-flight, or a DB call was refused, or the provider was never
 * called. There is nothing to fold a field into. PCD-002's whole difficulty was
 * that the failure recorded NOTHING — a raw platform 504 leaves no exception,
 * no log line and no row — so the one thing this must guarantee is that each
 * distinct exhaustion is nameable afterwards without reading source.
 *
 * The four are genuinely different repairs and must never collapse into
 * "timeout":
 *   provider-deadline  the model chain ran out of ITS budget (already fixed,
 *                      6326c91) — a provider problem
 *   db-timeout         one query exceeded its slice of the request budget —
 *                      a query/index/pool problem
 *   db-unavailable     the database refused or dropped the connection —
 *                      infrastructure, and the PCD-043 family
 *   route-deadline     the request as a whole ran out — something UNBOUNDED
 *                      stalled, and this line is the only evidence it existed
 *
 * Same convention as `TURN_EVENT`/`EXCURSION_EVENT`/`BRAIN_EVENT`: one compact
 * JSON line on the platform log, NEVER a database write (this project runs
 * under a 5 GB egress quota after a 50.8 GB incident — observability must never
 * be the thing that breaks it). No learner text and no model text: every field
 * is an enum, a count or a label the code itself chose.
 */

export const BUDGET_EVENT_PREFIX = '[learn/chat] BUDGET_EVENT='

export type BudgetOutcome =
  | 'ok'
  | 'provider-deadline'
  | 'db-timeout'
  | 'db-unavailable'
  | 'route-deadline'

export interface BudgetEvent {
  version: 1
  outcome: BudgetOutcome
  /** Request wall-clock spent when this was recorded. */
  elapsedMs: number
  /** The request's total budget, so a reader can see how close it came. */
  budgetMs?: number
  /** Which operation — a code-chosen label such as 'chat-session-load'. Never
   *  a query, never learner data. */
  label?: string
  /** The slice that operation was actually granted, after the request clock
   *  narrowed its own cap. The number that explains a surprising timeout. */
  grantedMs?: number
  /** Attempt index, so a retry that ran and a retry that was refused on
   *  affordability are distinguishable. */
  attempt?: number
}

export function recordBudgetEvent(e: Omit<BudgetEvent, 'version'>): void {
  try {
    console.log(BUDGET_EVENT_PREFIX + JSON.stringify({ version: 1, ...e }))
  } catch { /* telemetry never breaks a turn */ }
}
