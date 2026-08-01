/**
 * Policy-store infrastructure — the runtime reader for `BrainConfig`.
 *
 * WHY THIS EXISTS. Phase 3 §19.3: "Every numeric threshold in §9 — dwell
 * counts, hysteresis gaps, reversal windows, rate limits — is a BrainConfig
 * value", and constants "must not ship hardcoded" at their call sites, or the
 * tuning loop is impossible. The `BrainConfig` table has existed since ADR 10
 * Phase 1 and has had NO runtime reader, so every consumer has had no choice
 * but to hardcode. This module is that reader and nothing more.
 *
 * THE AUTHORITY ORDER, which this module implements rather than invents
 * (§19.3, corrected v3.1.0):
 *
 *   RS §18 is "the only normative source for constants" and already ships the
 *   values. ADR 10's `BrainConfig` store is "the *persistence* proposal, not
 *   the normative source".
 *
 * So: the RS §18 default is the value; a `BrainConfig` row OVERRIDES it for
 * tuning and experimentation. The defaults below are a transcription of RS
 * §18's table, not a second authority — adding a constant means adding it to
 * RS §18 first and transcribing it here, never the reverse.
 *
 * WHAT THIS MODULE IS NOT. It authors no Phase 3 governor constants: those are
 * WP-8's own work and are absent here deliberately. It applies nothing, decides
 * nothing, and adapts nothing. It has no caller yet, so behaviour is unchanged.
 *
 * READ-ONLY, and the schema says so: "Read-only at runtime — no teaching-path
 * code may write to this table." There is no writer in this file and none
 * should be added; rows are authored out-of-band with `changedBy`/`reason`
 * populated for auditability.
 */

// ── RS §18 — normative shipped defaults (transcription) ─────────────────────
// Keys and values are copied verbatim from EOS_V2_RUNTIME_SPECIFICATION.md
// §18. Where §18 states a value per register, the key is expanded per register
// so a lookup is a single flat name.
export const RS18_DEFAULTS = {
  'conv.maxConsecutiveQuestions': 2,
  'conv.questionsPerTurn.ask': 1,
  'budgets.paragraphs.beginner': 4,
  'budgets.paragraphs.beginner.strained': 2,
  'budgets.paragraphs.intermediate': 7,
  'budgets.paragraphs.intermediate.strained': 4,
  // §18 ships `null` for the expert ceiling — "no paragraph cap", which is a
  // real value and NOT a missing one. Preserved as null rather than dropped.
  'budgets.paragraphs.expert': null,
  'budgets.paragraphs.expert.strained': 6,
  'budgets.maxNewTerms.beginner': 1,
  'budgets.maxNewTerms.other': 2,
  'budgets.maxNewElements.beginner': 2,
  'budgets.maxNewElements.intermediate': 3,
  'budgets.maxNewElements.expert': 4,
  'session.gapMinutes': 30,
  'session.affectBudget.cap': 2,
  'session.affectBudget.lessonOne': 1,
  'session.maxOpeningReviews': 3,
  'recovery.behavioralTrigger': 2,
  'recovery.silenceMs': 90000,
  'fluency.latencyFactor': 1.25,
  'fluency.count': 3,
  'cap.automaticCount': 3,
  'cap.contradictionWindow': 5,
  'cap.staleDays': 45,
  'assess.sessionItemCap': 5,
  'mastery.minGapDays': 7,
  'mastery.minTransferDistance': 1,
  'review.dueThreshold': 0.7,
  'review.maxSessionFraction': 0.4,
  'sched.stuckCooldownSessions': 1,
  'stage.capTurns': 3,
  'autonomy.verifyWithinDays': 7,
  'conf.calibrationWindow': 5,
  'motiv.windowSessions': 6,
  'render.historyTurns': 6,
  'render.maxControlTokens': 500,
  'driver.violationSlo': 0.05,
  'store.snapshotEveryNEvents': 200,
} as const

export type BrainConfigKey = keyof typeof RS18_DEFAULTS

/** One effective row. `value` is Json in the schema, so callers narrow it. */
export interface BrainConfigRow {
  name: string
  value: unknown
  version: number
  effectiveFrom: Date
  effectiveTo: Date | null
}

/**
 * The store seam. Injectable for the same reason the spine writer's is: the
 * resolution rules are the interesting part and must be testable without a
 * database.
 */
export interface BrainConfigStore {
  /** Rows for these names. Filtering by effective window is this module's job,
   *  not the store's, so the rule lives in one place. */
  findByNames(names: readonly string[]): Promise<BrainConfigRow[]>
}

/** Whether a row is in force at `now`. `effectiveTo === null` means open-ended. */
export function isEffective(row: BrainConfigRow, now: Date): boolean {
  if (row.effectiveFrom.getTime() > now.getTime()) return false
  if (row.effectiveTo !== null && row.effectiveTo.getTime() <= now.getTime()) return false
  return true
}

/**
 * Pick the row that wins for one name: effective now, then highest `version`,
 * then latest `effectiveFrom`. Deterministic — two overlapping rows never
 * resolve by luck.
 */
export function resolveRow(rows: readonly BrainConfigRow[], now: Date): BrainConfigRow | null {
  const live = rows.filter((r) => isEffective(r, now))
  if (live.length === 0) return null
  return live.reduce((best, r) => {
    if (r.version !== best.version) return r.version > best.version ? r : best
    return r.effectiveFrom.getTime() > best.effectiveFrom.getTime() ? r : best
  })
}

export type ConfigSource = 'store' | 'rs18-default'

export interface ResolvedConfig<K extends BrainConfigKey> {
  key: K
  value: unknown
  source: ConfigSource
  /** Populated when a store row was malformed and the default was used
   *  instead — a silent fallback is indistinguishable from a healthy read. */
  degradedReason?: string
}

/**
 * Resolve a set of keys. Never throws: a store failure degrades every key to
 * its RS §18 default and records why. A constant that cannot be read must not
 * be able to fail a turn.
 *
 * Type discipline: a store row whose Json payload is not the same primitive
 * type as the RS §18 default is REJECTED, not coerced. A string "2" where the
 * spec ships the number 2 is a mis-authored row, and silently coercing it
 * would let a typo change teaching behaviour.
 */
export async function resolveConfigs<K extends BrainConfigKey>(
  store: BrainConfigStore,
  keys: readonly K[],
  now: Date = new Date(),
): Promise<Map<K, ResolvedConfig<K>>> {
  const out = new Map<K, ResolvedConfig<K>>()
  let rows: BrainConfigRow[] = []
  let storeError: string | null = null

  try {
    rows = await store.findByNames(keys as readonly string[])
  } catch (err) {
    storeError = err instanceof Error ? err.message : 'unknown store error'
  }

  for (const key of keys) {
    const fallback = RS18_DEFAULTS[key] as unknown
    if (storeError !== null) {
      out.set(key, { key, value: fallback, source: 'rs18-default', degradedReason: `store unavailable: ${storeError}` })
      continue
    }
    const row = resolveRow(rows.filter((r) => r.name === key), now)
    if (row === null) {
      out.set(key, { key, value: fallback, source: 'rs18-default' })
      continue
    }
    if (fallback !== null && typeof row.value !== typeof fallback) {
      out.set(key, {
        key, value: fallback, source: 'rs18-default',
        degradedReason: `row type ${typeof row.value} does not match RS §18 type ${typeof fallback}; row rejected, not coerced`,
      })
      continue
    }
    out.set(key, { key, value: row.value, source: 'store' })
  }
  return out
}

/** Single-key convenience over resolveConfigs. Same rules, same guarantees. */
export async function resolveConfig<K extends BrainConfigKey>(
  store: BrainConfigStore,
  key: K,
  now: Date = new Date(),
): Promise<ResolvedConfig<K>> {
  const map = await resolveConfigs(store, [key], now)
  return map.get(key) as ResolvedConfig<K>
}

/**
 * The Prisma-backed store. Read-only by construction: `findMany` is the only
 * operation, matching the schema's "no teaching-path code may write to this
 * table".
 */
export function prismaBrainConfigStore(db: {
  brainConfig: { findMany(args: unknown): Promise<Array<{ name: string; value: unknown; version: number; effectiveFrom: Date; effectiveTo: Date | null }>> }
}): BrainConfigStore {
  return {
    async findByNames(names) {
      const rows = await db.brainConfig.findMany({
        where: { name: { in: [...names] } },
        select: { name: true, value: true, version: true, effectiveFrom: true, effectiveTo: true },
      })
      return rows
    },
  }
}
