/**
 * Placement Verification — Migration Blueprint Phase 3, implementing the
 * authored placement protocol's first-session verification:
 *
 *  - assessment/02 §2   three-bracket verification (one probe BELOW the
 *                       entry point, one AT it, one ABOVE it; success-first
 *                       opening — the below-probe goes first as the
 *                       nerve-settler)
 *  - placement/01 §2    the two placement errors are asymmetric: when
 *                       uncertain, place LOWER. Hence: downward adjustment
 *                       is automatic; upward adjustment is NEVER automatic
 *                       (it requires the compaction protocol's gate-grade
 *                       evidence, decision-engine/07 §3 — not one probe).
 *  - placement/02 §4    never reveal the discrepancy: the learner never
 *                       hears "you said intermediate but..." — adjustment
 *                       is silent; probes are framed as conversation.
 *  - assessment/02 §6   affect budget: probes stop early on two failures
 *                       (the remaining bracket is treated as failed —
 *                       conservative, consistent with place-lower).
 *
 * Scope (deliberate): Library-mode KG subjects, self-reported level
 * intermediate/advanced, no completed lessons yet. Beginners are excluded
 * because their entry point is lesson 1 — there is nothing below it to
 * verify, and the dangerous placement error (too high) cannot occur at
 * the floor (placement/01 §2).
 */
import type { CurriculumLevel } from '@/lib/curriculum/levels'

export interface PlacementProbeResult {
  probe: 'below' | 'at' | 'above'
  correctness: boolean
  confidence?: 'high' | 'medium' | 'low'
}

export interface PlacementVerificationState {
  /** true once the protocol has concluded for this learner+subject */
  verified: boolean
  results: PlacementProbeResult[]
  /** set when the protocol concluded */
  outcome?: 'confirmed' | 'adjusted_down'
}

export const PROBE_ORDER: Array<'below' | 'at' | 'above'> = ['below', 'at', 'above']

export function emptyPlacementState(): PlacementVerificationState {
  return { verified: false, results: [] }
}

/** Which bracket probe should run next, or null if the protocol is done. */
export function nextProbe(state: PlacementVerificationState): 'below' | 'at' | 'above' | null {
  if (state.verified) return null
  // Affect budget (assessment/02 §6): two failures end probing early.
  const failures = state.results.filter((r) => !r.correctness).length
  if (failures >= 2) return null
  const done = new Set(state.results.map((r) => r.probe))
  for (const p of PROBE_ORDER) if (!done.has(p)) return p
  return null
}

/**
 * Fold one probe result in and decide whether the protocol concludes.
 * Pure — no I/O; the caller persists the returned state and applies any
 * adjustment.
 */
export function recordProbeResult(
  state: PlacementVerificationState,
  result: PlacementProbeResult,
): PlacementVerificationState {
  const results = [...state.results.filter((r) => r.probe !== result.probe), result]
  const next: PlacementVerificationState = { verified: false, results }
  const failures = results.filter((r) => !r.correctness).length
  const answered = new Set(results.map((r) => r.probe))
  const complete = PROBE_ORDER.every((p) => answered.has(p)) || failures >= 2
  if (!complete) return next

  next.verified = true
  // placement/01 §2 asymmetry — the decision rule, stated once:
  //   ADJUST DOWN if the foundation probe (below) failed, or if the affect
  //   budget stopped probing early (≥2 failures among the answered probes —
  //   by construction that always includes 'below' or 'at' failing, and
  //   "when in doubt, place lower" resolves the doubt downward).
  //   Otherwise the entry point STANDS: a single miss at 'at' with a solid
  //   foundation means the frontier is at the entry point's edge (normal —
  //   teaching self-corrects, assessment/02 §1 ±1–2 concept tolerance),
  //   and an 'above' failure is the EXPECTED, confirming result.
  //   An 'above' success alone never moves placement up — upward movement
  //   requires the compaction protocol's gate-grade evidence
  //   (decision-engine/07 §3), never one lucky item.
  const belowFailed = results.some((r) => r.probe === 'below' && !r.correctness)
  const stoppedEarly = !PROBE_ORDER.every((p) => answered.has(p))
  next.outcome = belowFailed || stoppedEarly ? 'adjusted_down' : 'confirmed'
  return next
}

/** One level down, per the canonical 3-tier ladder (curriculum/levels.ts). */
export function levelBelow(level: CurriculumLevel): CurriculumLevel {
  if (level === 'advanced') return 'intermediate'
  return 'beginner'
}

/**
 * Awaiting-answer block: the previous turn asked a calibration question
 * and the learner's newest message is (probably) the answer. The LLM's
 * only calibration duty this turn is tagging that answer — never asking a
 * second calibration question on top of it (conversation-engine/06 §1's
 * question ceiling applies to calibration doubly).
 */
export function buildPlacementAwaitBlock(pending: 'below' | 'at' | 'above'): string {
  return (
    '\n\nPLACEMENT CALIBRATION (invisible to the student): your previous turn ' +
    'wove in a calibration question. If the student\'s LAST message answers ' +
    `it (even partially), your SIGNAL tag MUST include probe="${pending}" with ` +
    'your honest correctness/confidence read of that answer. Do NOT ask ' +
    'another calibration question this turn. If their message did not answer ' +
    'it (they changed topic or asked something), just teach normally — no ' +
    'probe attribute, and re-weave the question naturally only if a good ' +
    'opening appears.'
  )
}

/**
 * System-prompt block asking the LLM to run the next bracket probe —
 * conversationally, never test-framed (placement/02 §4), one probe per
 * turn, reported back via the SIGNAL tag's probe attribute.
 */
export function buildPlacementProbeBlock(
  probe: 'below' | 'at' | 'above',
  subjectName: string,
  entryLessonTitle: string,
): string {
  const target =
    probe === 'below'
      ? `one step EASIER than "${entryLessonTitle}" — a prerequisite the learner should find comfortable (this is the nerve-settler: near-certain success)`
      : probe === 'at'
        ? `directly at the level of "${entryLessonTitle}"`
        : `one step HARDER than "${entryLessonTitle}"`
  return (
    '\n\nPLACEMENT CALIBRATION (invisible to the student — never name it, never ' +
    'call it a test, never mention levels or placement): before continuing the ' +
    `lesson, weave ONE short, friendly ${subjectName} question into the ` +
    `conversation, pitched ${target}. It must be a PRODUCTION question (the ` +
    'learner produces an answer), answerable in under 30 seconds, framed as ' +
    'natural curiosity ("quick one — ..."). Ask it and stop — do not stack a ' +
    'second question. When the learner answers it on their next message, your ' +
    `SIGNAL tag for that turn must include probe="${probe}". React to their ` +
    'answer warmly regardless of correctness; never announce right/wrong ' +
    'scoring language during calibration.'
  )
}
