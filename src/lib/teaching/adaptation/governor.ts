/**
 * WP-8 — Phase 3's governor constants, authored into the existing policy store.
 *
 * §25.3 requires that "the policy store holds the governor's constants (§19.3);
 * constants must not ship hardcoded, or §20's tuning loop is impossible."
 *
 * §19.3 also fixes the authority, and this module obeys it rather than
 * shortcutting it: "`RS §18` is the only normative source for constants … New
 * governor constants are therefore ADDITIONS TO RS §18, proposed against that
 * document; ADR 10's `BrainConfig` store is the persistence proposal, not the
 * normative source."
 *
 * Consequence, and the reason these keys are NOT added to `RS18_DEFAULTS`:
 * doing so would assert they are in RS §18, which they are not. They are
 * PROPOSALS against RS §18, and they are labelled as such. `RS18_DEFAULTS`
 * stays a faithful transcription of a document nobody has amended.
 *
 * §19.3 also says Phase 3 "deliberately publishes NO numbers", for two stated
 * reasons: they must be calibrated against Tier C outcomes, and numbers in an
 * architecture document acquire a false authority. So every constant below is
 * declared with NO default value. An unset constant reads as NOT_SET, never as
 * a guess — which is what makes the stages in shadowStages.ts degrade to
 * NOT_EVALUABLE rather than run on invented numbers.
 *
 * Reads go through the WP-8 prerequisite reader's own resolution rules
 * (`resolveRow`, `isEffective`), reused rather than reimplemented, so the
 * effective-window and version-precedence logic lives in exactly one place.
 */
import {
  resolveRow, type BrainConfigRow, type BrainConfigStore,
} from '@/lib/config/brainConfig'

/**
 * The governor constant names Phase 3 §9's dials need. Names only — no values.
 * Each is a proposal against RS §18 until that document is amended.
 */
export const GOVERNOR_CONSTANT_KEYS = [
  // Hysteresis and dwell — §9's "dwell counts, hysteresis gaps, reversal windows".
  'governor.dwellTurns.min',
  'governor.hysteresisGap',
  'governor.reversalWindowTurns',
  'governor.rateLimit.dialMovesPerSession',
  // D4 PACE / D5 LOAD — the two dials S3 covers.
  'governor.d4.newElementRate.max',
  'governor.d4.turnDensity.max',
  'governor.d4.waitTimeMultiplier.max',
  'governor.d5.elementBudget.max',
  // S7's productive band.
  'governor.productiveBand.successRate.min',
  'governor.productiveBand.successRate.max',
] as const
export type GovernorConstantKey = (typeof GOVERNOR_CONSTANT_KEYS)[number]

export type ConstantAvailability = 'SET' | 'NOT_SET'

export interface GovernorConstant {
  key: GovernorConstantKey
  availability: ConstantAvailability
  /** Present only when availability === 'SET'. */
  value?: number
  detail: string
}

const NOT_SET_DETAIL =
  'No BrainConfig row. Phase 3 §19.3 publishes no numbers deliberately — they must be ' +
  'calibrated against Tier C outcomes — so there is no default to fall back to. NOT_SET, never guessed.'

/**
 * Resolve every governor constant. Never throws; a store failure marks every
 * key NOT_SET with the reason, because a silent fallback is indistinguishable
 * from a healthy read.
 *
 * A row whose value is not a finite number is REJECTED, not coerced — the same
 * discipline the BrainConfig reader applies against RS §18's types.
 */
export async function resolveGovernorConstants(
  store: BrainConfigStore,
  now: Date = new Date(),
): Promise<Map<GovernorConstantKey, GovernorConstant>> {
  const out = new Map<GovernorConstantKey, GovernorConstant>()
  let rows: BrainConfigRow[] = []
  let storeError: string | null = null

  try {
    rows = await store.findByNames(GOVERNOR_CONSTANT_KEYS as readonly string[])
  } catch (err) {
    storeError = err instanceof Error ? err.message : 'unknown store error'
  }

  for (const key of GOVERNOR_CONSTANT_KEYS) {
    if (storeError !== null) {
      out.set(key, { key, availability: 'NOT_SET', detail: `store unavailable: ${storeError}` })
      continue
    }
    const row = resolveRow(rows.filter((r) => r.name === key), now)
    if (row === null) {
      out.set(key, { key, availability: 'NOT_SET', detail: NOT_SET_DETAIL })
      continue
    }
    if (typeof row.value !== 'number' || !Number.isFinite(row.value)) {
      out.set(key, {
        key, availability: 'NOT_SET',
        detail: `row value is ${typeof row.value}, not a finite number; rejected rather than coerced`,
      })
      continue
    }
    out.set(key, { key, availability: 'SET', value: row.value, detail: 'From BrainConfig.' })
  }
  return out
}

/** True only when every named key resolved SET. A stage whose constants are
 *  incomplete must not run on the subset. */
export function allSet(
  constants: ReadonlyMap<GovernorConstantKey, GovernorConstant>,
  keys: readonly GovernorConstantKey[],
): boolean {
  return keys.every((k) => constants.get(k)?.availability === 'SET')
}

// Re-exported so callers need not reach past this module for the seam.
export type { BrainConfigStore, BrainConfigRow }
export { isEffective } from '@/lib/config/brainConfig'
