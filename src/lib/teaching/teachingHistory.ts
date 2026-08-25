/**
 * Teaching History — per-concept strategy/explanation/misconception ledger.
 *
 * Tracks which teaching strategies, analogies, demonstrations, and
 * misconceptions have been encountered for the CURRENT concept within a
 * lesson session. Persisted in contextSnapshot.teachingHistory (JSONB on
 * LearnSession). Resets when the active concept changes — same lifecycle
 * as ConversationState.
 *
 * Pure module: no DB, no I/O.
 */

export const STRATEGY_CONCISE = 0
export const STRATEGY_SIMPLER_WORDING = 1
export const STRATEGY_ANALOGY = 2
export const STRATEGY_VISUAL = 3
export const STRATEGY_PHYSICAL = 4
export const STRATEGY_GUIDED_DISCOVERY = 5
export const STRATEGY_PREREQ_REMEDIATION = 6

const STRATEGY_COUNT = 7
const EXPLANATION_LIMIT = 2

export interface TeachingHistory {
  conceptId: string | null
  strategiesUsed: number[]
  analogiesUsed: string[]
  demonstrationsShown: string[]
  misconceptionsSeen: string[]
  prerequisiteAttempts: string[]
  explanationCount: number
  confidence: 'high' | 'medium' | 'low' | 'unknown'
  frustration: number
  mastery: 'none' | 'emerging' | 'developing' | 'verified'
  // ── P7 additions ──────────────────────────────────────────────────────────
  // Extensions to THIS owner rather than a new memory store: every field below
  // is concept-scoped teaching evidence, which is exactly what TeachingHistory
  // already owns and already resets on a concept change.
  /** Ordered confidence readings this concept, oldest first. `confidence`
   *  above remains the current value; this is the TREND the adaptation engine
   *  needs (high -> low -> recovered reads differently from steady low). */
  confidenceTrail: ConfidenceReading[]
  /** Visual/diagram identifiers already rendered, so the same one is not
   *  replayed unless the learner explicitly asks. */
  visualsShown: string[]
  /** Fingerprints of assessment questions already ASKED, so an identical MCQ
   *  is never asked twice. Fingerprints (not text) because the same question
   *  reworded is still the same question. */
  mcqAsked: string[]
  /** Misconception lifecycle: detected -> addressed -> corrected -> verified.
   *  Keyed by misconception id. `misconceptionsSeen` above stays the flat
   *  "what has appeared" list it already was; this adds the state machine. */
  misconceptionStatus: Record<string, MisconceptionStage>
  /**
   * AssetIdentity ids of Explanation Memory assets already SERVED to the
   * learner for this concept — the same "do not replay it" guard
   * `visualsShown` and `mcqAsked` already provide for the other two authored
   * channels, which Explanation Memory was missing.
   *
   * Production 2026-08-02T13:53–13:54Z: with memory serving finally reachable,
   * D1-MEMORY-HIT fired on three consecutive turns and served the SAME
   * 787-character sig-figs asset verbatim each time, in reply to "Got it".
   * Nothing recorded that the learner had already read it, so re-serving
   * looked correct to every layer involved.
   */
  explanationsServed: string[]
}

export type ConfidenceReading = 'high' | 'medium' | 'low'

export const MISCONCEPTION_STAGES = ['detected', 'addressed', 'corrected', 'verified'] as const
export type MisconceptionStage = (typeof MISCONCEPTION_STAGES)[number]

export function initialTeachingHistory(conceptId: string | null): TeachingHistory {
  return {
    conceptId,
    strategiesUsed: [],
    analogiesUsed: [],
    demonstrationsShown: [],
    misconceptionsSeen: [],
    prerequisiteAttempts: [],
    explanationCount: 0,
    confidence: 'unknown',
    frustration: 0,
    mastery: 'none',
    confidenceTrail: [],
    visualsShown: [],
    mcqAsked: [],
    misconceptionStatus: {},
    explanationsServed: [],
  }
}

export function readTeachingHistory(
  raw: unknown,
  currentConceptId: string | null,
): TeachingHistory {
  if (raw && typeof raw === 'object' && Array.isArray((raw as TeachingHistory).strategiesUsed)) {
    const s = raw as TeachingHistory
    if (s.conceptId === currentConceptId) {
      return {
        ...initialTeachingHistory(currentConceptId),
        ...s,
      }
    }
  }
  return initialTeachingHistory(currentConceptId)
}

/** Pick the lowest-indexed strategy not yet attempted. Returns -1 when all
 * seven have been used — the caller should treat this as "prerequisite
 * remediation is the only move left." */
export function selectNextStrategy(history: TeachingHistory): number {
  const used = new Set(history.strategiesUsed)
  for (let i = 0; i < STRATEGY_COUNT; i++) {
    if (!used.has(i)) return i
  }
  return -1
}

export function updateTeachingHistory(
  prev: TeachingHistory,
  update: Partial<Pick<TeachingHistory,
    | 'strategiesUsed'
    | 'analogiesUsed'
    | 'demonstrationsShown'
    | 'misconceptionsSeen'
    | 'prerequisiteAttempts'
    | 'explanationCount'
    | 'confidence'
    | 'frustration'
    | 'mastery'
  >>,
): TeachingHistory {
  return { ...prev, ...update }
}

export function hasExceededExplanationLimit(history: TeachingHistory): boolean {
  return history.explanationCount >= EXPLANATION_LIMIT
}

/** Maps failure/remediation counts to a 0-5 frustration scale.
 * Each consecutive failure adds 1; each remediation adds 0.5 (remediation
 * signals confusion but also effort, so it weighs less than outright failure). */
export function computeFrustration(consecutiveFailures: number, remediationCount: number): number {
  const raw = consecutiveFailures + remediationCount * 0.5
  return Math.min(5, Math.round(raw))
}

export function computeMastery(
  correctAtCheck: number,
  correctAtPractice: number,
): TeachingHistory['mastery'] {
  if (correctAtPractice >= 2) return 'verified'
  if (correctAtCheck >= 1) return 'developing'
  if (correctAtCheck > 0 || correctAtPractice > 0) return 'emerging'
  return 'none'
}

// ── P7: teaching memory readers ──────────────────────────────────────────────
//
// The gap P7 closes: TeachingHistory already RECORDED what had been used, and
// selectNextStrategy() already rotated strategies from it — but none of it ever
// reached the prompt. The model was therefore free to reuse an analogy or
// replay a visual it had already used, because nothing told it what it had
// done. These readers turn the recorded evidence into the answers the tutor
// needs, and buildTeachingMemoryBlock renders them as a contract.
//
// Everything here is a pure read over the EXISTING owner. No new store.

/** Normalise a label/question so trivial rewordings collide. Mirrors the P3
 *  repetition-ledger rule so "already asked" means the same thing everywhere. */
const MEMORY_FILLER = new Set([
  'a', 'an', 'the', 'of', 'is', 'are', 'was', 'were', 'be',
  'do', 'does', 'did', 'to', 'in', 'on', 'at', 'for', 'with', 'about',
  'and', 'or', 'it', 'its', 'you', 'your', 'we', 'our', 'i', 'my',
])

export function memoryFingerprint(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, ' ')
    .split(/\s+/)
    .filter((w) => w.length > 0 && !MEMORY_FILLER.has(w))
    .sort()
    .join(' ')
}

export function hasUsedAnalogy(h: TeachingHistory, label: string): boolean {
  const fp = memoryFingerprint(label)
  return h.analogiesUsed.some((a) => memoryFingerprint(a) === fp)
}

export function hasShownVisual(h: TeachingHistory, id: string): boolean {
  return h.visualsShown.includes(id)
}

export function hasAskedMcq(h: TeachingHistory, question: string): boolean {
  return h.mcqAsked.includes(memoryFingerprint(question))
}

/** Has this authored explanation asset already been served for this concept? */
export function hasServedExplanation(h: TeachingHistory, assetId: string): boolean {
  return h.explanationsServed.includes(assetId)
}

export function hasUsedStrategy(h: TeachingHistory, strategy: number): boolean {
  return h.strategiesUsed.includes(strategy)
}

/** Record a visual as shown. Idempotent. */
export function recordVisualShown(h: TeachingHistory, id: string): TeachingHistory {
  if (!id || h.visualsShown.includes(id)) return h
  return { ...h, visualsShown: [...h.visualsShown, id] }
}

/** Record an authored explanation asset as served. Idempotent. */
export function recordExplanationServed(h: TeachingHistory, assetId: string): TeachingHistory {
  if (!assetId || h.explanationsServed.includes(assetId)) return h
  return { ...h, explanationsServed: [...h.explanationsServed, assetId] }
}

/** Record an assessment question as asked. Idempotent on fingerprint. */
export function recordMcqAsked(h: TeachingHistory, question: string): TeachingHistory {
  const fp = memoryFingerprint(question)
  if (!fp || h.mcqAsked.includes(fp)) return h
  return { ...h, mcqAsked: [...h.mcqAsked, fp] }
}

/** Append a confidence reading to the trail and update the current value. */
export function recordConfidence(h: TeachingHistory, reading: ConfidenceReading): TeachingHistory {
  return { ...h, confidence: reading, confidenceTrail: [...h.confidenceTrail, reading] }
}

/**
 * Advance a misconception through its lifecycle. Monotonic: a misconception
 * never moves backwards, because "corrected" is evidence that happened and a
 * later stumble does not un-happen it (the same asymmetry TopicProgress uses
 * for mastery). Unknown ids start at 'detected'.
 */
export function advanceMisconception(
  h: TeachingHistory, id: string, stage: MisconceptionStage,
): TeachingHistory {
  if (!id) return h
  const current = h.misconceptionStatus[id]
  const currentIdx = current ? MISCONCEPTION_STAGES.indexOf(current) : -1
  const nextIdx = MISCONCEPTION_STAGES.indexOf(stage)
  if (nextIdx <= currentIdx) return h
  return {
    ...h,
    misconceptionsSeen: h.misconceptionsSeen.includes(id)
      ? h.misconceptionsSeen
      : [...h.misconceptionsSeen, id],
    misconceptionStatus: { ...h.misconceptionStatus, [id]: stage },
  }
}

/** True once a misconception reached corrected/verified — it must not be
 *  re-taught inside the same lesson. */
export function isMisconceptionResolved(h: TeachingHistory, id: string): boolean {
  const stage = h.misconceptionStatus[id]
  return stage === 'corrected' || stage === 'verified'
}

export type ConfidenceTrend =
  | 'unknown' | 'steady' | 'rising' | 'falling' | 'recovered' | 'volatile'

/**
 * The SHAPE of confidence over the concept, not just its current value.
 * 'recovered' is called out separately because a learner who dropped and came
 * back needs consolidation, while a steadily-high learner needs stretching —
 * the current-value-only reading cannot tell those apart.
 */
export function confidenceTrend(trail: ConfidenceReading[]): ConfidenceTrend {
  if (trail.length === 0) return 'unknown'
  if (trail.length === 1) return 'steady'
  const rank = (c: ConfidenceReading) => (c === 'low' ? 0 : c === 'medium' ? 1 : 2)
  const values = trail.map(rank)
  const first = values[0]
  const last = values[values.length - 1]
  const min = Math.min(...values)
  // Dropped below where it started (or below its own end) and came back up.
  if (min < first && min < last) return 'recovered'
  if (last > first) return 'rising'
  if (last < first) return 'falling'
  // Same endpoints: steady unless it moved around in between.
  return values.some((v) => v !== first) ? 'volatile' : 'steady'
}

const TREND_GUIDANCE: Record<ConfidenceTrend, string> = {
  unknown: '',
  steady: '',
  rising: 'Their confidence is rising — you can increase difficulty.',
  falling: 'Their confidence is falling — slow down, and engineer a win before anything harder.',
  recovered: 'Their confidence dipped and recovered — consolidate at this level before advancing; do not immediately raise difficulty.',
  volatile: 'Their confidence is unstable — favour short, certain steps over big leaps.',
}

const STRATEGY_LABELS: Record<number, string> = {
  [STRATEGY_CONCISE]: 'a concise restatement',
  [STRATEGY_SIMPLER_WORDING]: 'simpler wording',
  [STRATEGY_ANALOGY]: 'an analogy',
  [STRATEGY_VISUAL]: 'a visual',
  [STRATEGY_PHYSICAL]: 'a physical/hands-on demonstration',
  [STRATEGY_GUIDED_DISCOVERY]: 'guided discovery',
  [STRATEGY_PREREQ_REMEDIATION]: 'prerequisite remediation',
}

/**
 * The prompt contract: what has already been tried on this concept, so the
 * tutor builds on it instead of restarting. Returns '' when nothing has been
 * recorded yet, so an opening turn pays no prompt cost.
 */
export function buildTeachingMemoryBlock(h: TeachingHistory | null | undefined): string {
  if (!h) return ''
  const lines: string[] = []

  if (h.analogiesUsed.length > 0) {
    lines.push(`- Analogies already used (do NOT reuse): ${h.analogiesUsed.join('; ')}.`)
  }
  if (h.demonstrationsShown.length > 0) {
    lines.push(`- Demonstrations already shown (do NOT repeat): ${h.demonstrationsShown.join('; ')}.`)
  }
  if (h.visualsShown.length > 0) {
    lines.push(
      `- Visuals already shown: ${h.visualsShown.join(', ')}. Do not replay an identical `
      + 'visual unless the learner asks for it again.',
    )
  }
  if (h.mcqAsked.length > 0) {
    lines.push(`- ${h.mcqAsked.length} assessment question(s) already asked on this concept — ask a genuinely NEW one, never a reworded repeat.`)
  }
  const triedStrategies = h.strategiesUsed
    .map((s) => STRATEGY_LABELS[s])
    .filter((label): label is string => Boolean(label))
  if (triedStrategies.length > 0) {
    lines.push(
      `- Explanation approaches already tried without success: ${triedStrategies.join(', ')}. `
      + 'Choose a DIFFERENT approach rather than repeating one of these.',
    )
  }
  if (h.prerequisiteAttempts.length > 0) {
    lines.push(`- Prerequisites already revisited: ${h.prerequisiteAttempts.join(', ')}.`)
  }

  const resolved = Object.entries(h.misconceptionStatus)
    .filter(([, stage]) => stage === 'corrected' || stage === 'verified')
    .map(([id]) => id)
  if (resolved.length > 0) {
    lines.push(
      `- Misconception(s) ALREADY CORRECTED this lesson: ${resolved.join(', ')}. `
      + 'Do not re-teach or re-litigate these — treat them as settled.',
    )
  }
  const open = Object.entries(h.misconceptionStatus)
    .filter(([, stage]) => stage === 'detected' || stage === 'addressed')
    .map(([id]) => id)
  if (open.length > 0) {
    lines.push(`- Misconception(s) still OPEN: ${open.join(', ')}. These still need repair and verification.`)
  }

  const trend = confidenceTrend(h.confidenceTrail)
  if (TREND_GUIDANCE[trend]) lines.push(`- ${TREND_GUIDANCE[trend]}`)

  if (h.explanationCount > 0) {
    lines.push(`- You have explained this concept ${h.explanationCount} time(s) already. Build on that; do not restart from the beginning.`)
  }

  if (lines.length === 0) return ''
  return '\n\nTEACHING MEMORY (what you have ALREADY done on this concept):\n' + lines.join('\n')
}

/**
 * PHASE B — A NEW ATTEMPT STARTS WITH ITS TEACHING UNSPENT.
 *
 * This ledger resets on a CONCEPT change (readTeachingHistory above), which is
 * the right rule for navigation and the wrong one for a restart: restarting
 * lesson A keeps concept A, so the fresh attempt inherits everything the
 * previous one spent —
 *
 *   strategiesUsed      all seven used => selectNextStrategy returns -1, i.e.
 *                       "prerequisite remediation is the only move left", on
 *                       turn one of a lesson the learner asked to redo
 *   explanationsServed  the authored Explanation Memory asset is marked
 *                       already-read, so the fresh attempt never serves it
 *   mcqAsked            every authored probe fingerprint is marked spent, so
 *                       the gate treats the concept's whole probe pool as used
 *   visualsShown        the concept's figure is marked already-rendered
 *
 * Phase 7L cleared the ladder at exactly this boundary for exactly this
 * reason; this is the same fact about a second store that was missed. Same
 * scope, same trigger, no new trigger.
 *
 * A DELTA for writeSnapshotDelta. `readTeachingHistory` maps a non-object to
 * `initialTeachingHistory(conceptId)`, so no reader changes.
 */
export function clearTeachingHistoryForNewAttempt(): Record<string, unknown> {
  return { teachingHistory: null }
}
