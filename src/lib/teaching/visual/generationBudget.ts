/**
 * GENERATION BUDGETS — the bound that replaced the allowlist.
 *
 * ── WHY A QUANTITY, NOT A LIST ──────────────────────────────────────────────
 * The allowlist's real job was never "these concepts are correct". It was
 * "however wrong this goes, it goes wrong for at most these ids". That is a
 * blast-radius bound, and an enumeration is a bound that stops scaling the
 * moment the thing it bounds is measured in thousands.
 *
 * A count scales. Two caps, answering the two different failures:
 *
 *   PER SESSION   one learner cannot turn a lesson into a generation loop —
 *                 a topic-hopping conversation is the natural shape of this
 *                 failure, and it costs latency in the learner's own turns.
 *   PER DAY       the platform cannot empty a quota or a wallet overnight
 *                 because something upstream started asking for figures far
 *                 more often than a human would.
 *
 * ── EXCEEDING A BUDGET IS NOT AN ERROR ──────────────────────────────────────
 * It yields NO FIGURE and the lesson continues in text, which this engine
 * already treats as an ordinary successful outcome. Nothing is queued, retried
 * or degraded into a worse figure.
 *
 * ── COUNTING IS SHARED, NOT PER-INSTANCE ────────────────────────────────────
 * The daily count comes from the outcome table, which every instance writes to,
 * because an in-memory counter on serverless bounds one lambda rather than the
 * platform — which is to say it bounds nothing. Reading it is one indexed
 * count; the reader is injected so this module stays free of the database.
 *
 * A COUNTER THAT CANNOT BE READ MUST NOT OPEN THE GATE. An unreachable store
 * yields "over budget", not "unlimited": the failure of a safety bound has to
 * be the safe direction, and the cost is that figures stop while the database
 * is down, which is the correct trade.
 */

export interface GenerationBudgets {
  /** Generations permitted within one learner's session. */
  perSession: number
  /** Generations permitted platform-wide in a rolling 24 hours. */
  perDay: number
}

export const DEFAULT_BUDGETS: GenerationBudgets = {
  // Enough for a genuinely exploratory lesson that keeps changing topic, and
  // far short of a loop. Measured against the real cohorts: a figure costs one
  // generation plus one judge call, so this is at most ~12 provider calls in
  // the worst session anyone has produced.
  perSession: 6,
  // A deliberate first ceiling rather than a computed one. Every topic is paid
  // for ONCE — the cache and the stored verdict mean a repeat costs nothing —
  // so this is a bound on how many NEW topics a day can introduce, and 500 new
  // topics in a day is far beyond any observed pattern while still being a
  // number that cannot ruin a month.
  perDay: 500,
}

export type BudgetVerdict =
  | { ok: true }
  | { ok: false; reason: 'session-budget-exhausted' | 'daily-budget-exhausted' | 'budget-unreadable' }

export interface BudgetCounts {
  /** Generations already made in this session; omit when there is no session. */
  session?: number
  /** Generations already made platform-wide today. */
  day: number
}

/** Pure decision, so the rule is testable without a clock or a database. */
export function checkBudgets(
  counts: BudgetCounts,
  budgets: GenerationBudgets = DEFAULT_BUDGETS,
): BudgetVerdict {
  if (counts.session !== undefined && counts.session >= budgets.perSession) {
    return { ok: false, reason: 'session-budget-exhausted' }
  }
  if (counts.day >= budgets.perDay) return { ok: false, reason: 'daily-budget-exhausted' }
  return { ok: true }
}

export interface BudgetReader {
  /** Generations recorded in the last 24 hours, platform-wide. */
  countToday(): Promise<number>
}

/**
 * The runtime check. With no reader supplied the budget cannot be verified, and
 * an unverifiable budget is treated as exhausted — see the header. Callers that
 * genuinely have no budget to enforce (the offline vetting pass, tests) pass
 * their own counts instead of relying on this.
 */
export async function checkBudgetsLive(
  sessionCount: number | undefined,
  reader: BudgetReader | undefined,
  budgets: GenerationBudgets = DEFAULT_BUDGETS,
): Promise<BudgetVerdict> {
  if (!reader) return { ok: false, reason: 'budget-unreadable' }
  let day: number
  try {
    day = await reader.countToday()
  } catch {
    return { ok: false, reason: 'budget-unreadable' }
  }
  return checkBudgets({ session: sessionCount, day }, budgets)
}
