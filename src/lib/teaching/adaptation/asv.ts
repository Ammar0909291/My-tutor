/**
 * WP-8 / AH-1 — the typed Adaptation State Vector.
 *
 * AH-1: "`C-32`'s four unstructured outputs (difficulty target, hint policy,
 * scaffolding level, withholding decisions) are replaced by one typed
 * Adaptation State Vector. `C-32` retains the loop, the band and the veto; it
 * gains an instrument and transfers the adjustment decision."
 *
 * SIX DIALS, transcribed from Phase 3 §9's table — not invented here:
 *   D1 SCAFFOLD      0–4 (0 = full worked, 4 = solo) — EOS v2's scale verbatim
 *   D2 HINT          authored ladder rung H0…Hn (ladder and n are CEKR/EBC's)
 *   D3 DIFFICULTY    offset in item-difficulty steps from the learner's frontier
 *   D4 PACE          new-element rate · turn density · wait-time multiplier
 *   D5 LOAD          element budget per turn + decomposition level
 *   D6 INTERLEAVING  blocked … interleaved (ordered)
 *
 * PRODUCED BY DECLARATION, NOT DERIVATION — the same rule P1-1 established for
 * the AttemptVector, and for the same reason: these are choices, and a third
 * party reconstructing them from the rendered turn would be guessing. The
 * composer declares what it set; anything it does not declare stays absent.
 *
 * HONESTY CLASS: PROXY. Self-report about one's own settings is authoritative
 * on what was intended and no evidence about what was achieved.
 *
 * NO NEW DECISION AUTHORITY. Nothing here decides a dial. Nothing here applies
 * one. The vector records settings that were already chosen, and every stage
 * that reads it (shadowStages.ts) is shadow-only.
 */
import type { AdaptationStateVectorV2 } from '@/lib/evidence-spine/types'

export const ASV_HONESTY_CLASS = 'PROXY' as const

/** Phase 3 §9's dial identifiers. */
export const DIALS = ['D1', 'D2', 'D3', 'D4', 'D5', 'D6'] as const
export type DialId = (typeof DIALS)[number]

/**
 * The full six-dial vector. Extends WP-3's on-the-wire
 * `AdaptationStateVectorV2` rather than replacing it, so the existing spine
 * payload field carries it unchanged — no second shape, no migration.
 *
 * Every field optional: an undeclared dial is "not set", never a default.
 * §21.2's rule — "never fabricate a state read; an absent signal produces no
 * pressure, never an estimated one."
 */
export interface AdaptationStateVector extends AdaptationStateVectorV2 {
  /** D1 — RS §18 `scaffoldDial`, GUIDED only. Inherited from the wire type. */
  // scaffoldDial?: 0 | 1 | 2 | 3 | 4
  /** D2 — authored ladder rung, e.g. "H0", "H2". Never invented: a rung only
   *  exists if an authored ladder defines it. */
  hintRung?: string
  /** D3 — signed offset from the learner's frontier, in difficulty steps. */
  difficultyOffset?: number
  /** D4 — pace, three sub-settings; any subset may be declared. */
  pace?: { newElementRate?: number; turnDensity?: number; waitTimeMultiplier?: number }
  /** D5 — load. `elementBudget` is a count; `decomposition` is ordered. */
  load?: { elementBudget?: number; decomposition?: 'whole' | 'decomposed' | 'atomic-step' }
  /** D6 — ordered. */
  interleaving?: 'blocked' | 'interleaved'
}

const DECOMPOSITION = ['whole', 'decomposed', 'atomic-step'] as const
const INTERLEAVING = ['blocked', 'interleaved'] as const

function num(raw: string | undefined): number | undefined {
  if (raw === undefined) return undefined
  const n = Number(raw.trim())
  return Number.isFinite(n) ? n : undefined
}

/**
 * Read the ASV attributes off an already-extracted attribute string.
 *
 * Deliberately attribute-level rather than tag-level: WP-8 adds NO new tag and
 * NO second capture path. The ASV rides the SAME `<!--ATTEMPT …-->` declaration
 * P1-1 already parses and strips, so the prompt gains attributes, not another
 * tag, and the turn still carries exactly one declaration channel.
 */
export function readAsvAttributes(attrs: string): AdaptationStateVector | null {
  const read = (key: string): string | undefined =>
    attrs.match(new RegExp(`${key}\\s*=\\s*"([^"]*)"`, 'i'))?.[1]

  const v: AdaptationStateVector = {}

  const scaffold = num(read('scaffold'))
  if (scaffold !== undefined && Number.isInteger(scaffold) && scaffold >= 0 && scaffold <= 4) {
    v.scaffoldDial = scaffold as 0 | 1 | 2 | 3 | 4
  }
  // D2: accepted only in the authored H<n> form. A free-text rung would be a
  // rung nobody authored, which S5 must treat as absent rather than as a grant.
  const rung = read('hint')?.trim()
  if (rung && /^H\d+$/i.test(rung)) v.hintRung = rung.toUpperCase()

  const offset = num(read('difficulty'))
  if (offset !== undefined && Number.isInteger(offset)) v.difficultyOffset = offset

  const pace: NonNullable<AdaptationStateVector['pace']> = {}
  const rate = num(read('paceRate')); if (rate !== undefined) pace.newElementRate = rate
  const density = num(read('paceDensity')); if (density !== undefined) pace.turnDensity = density
  const wait = num(read('paceWait')); if (wait !== undefined) pace.waitTimeMultiplier = wait
  if (Object.keys(pace).length > 0) v.pace = pace

  const load: NonNullable<AdaptationStateVector['load']> = {}
  const budget = num(read('loadBudget')); if (budget !== undefined) load.elementBudget = budget
  const decomp = read('loadDecomposition')?.trim().toLowerCase()
  if (decomp && (DECOMPOSITION as readonly string[]).includes(decomp)) {
    load.decomposition = decomp as NonNullable<AdaptationStateVector['load']>['decomposition']
  }
  if (Object.keys(load).length > 0) v.load = load

  const inter = read('interleaving')?.trim().toLowerCase()
  if (inter && (INTERLEAVING as readonly string[]).includes(inter)) {
    v.interleaving = inter as AdaptationStateVector['interleaving']
  }

  return Object.keys(v).length > 0 ? v : null
}

/** Which dials a vector actually carries. An undeclared dial is absent, and
 *  callers must be able to tell that apart from a dial set to a low value. */
export function declaredDials(v: AdaptationStateVector | null): DialId[] {
  if (v === null) return []
  const out: DialId[] = []
  if (v.scaffoldDial !== undefined) out.push('D1')
  if (v.hintRung !== undefined) out.push('D2')
  if (v.difficultyOffset !== undefined) out.push('D3')
  if (v.pace !== undefined) out.push('D4')
  if (v.load !== undefined) out.push('D5')
  if (v.interleaving !== undefined) out.push('D6')
  return out
}

/**
 * AH-2's standing-state projection: what WOULD be written to
 * `concept_mastery_records.adaptationState` (the WP-4 carrier) for this
 * learner/concept.
 *
 * PURE, and deliberately not a writer. WP-8 is shadow-first, so it computes
 * the standing value and returns it; wiring a database write is the act that
 * would make adaptation real, and that is not this package's to perform. Using
 * the WP-4 column keeps this on the existing carrier with no new table, no new
 * model and no second store.
 *
 * Merge rule: newest declared dial wins; a dial absent from the new vector
 * KEEPS its standing value rather than being cleared. "Not declared this turn"
 * is not "unset" — §21.2's AF3 holds standing values rather than dropping them.
 */
export function projectStandingAsv(
  standing: AdaptationStateVector | null,
  declared: AdaptationStateVector | null,
): AdaptationStateVector | null {
  if (declared === null) return standing
  if (standing === null) return declared
  return { ...standing, ...declared }
}
