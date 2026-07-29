/**
 * K5 — Turn History (S1, Runtime Redesign Mission Part 4/10).
 *
 * The single structural gap identified by the root-cause analysis: every
 * existing guard (questionLegality, recoveryGuard, stanceEnforcement, the
 * 16 verifier rules) is a pure function of the CURRENT turn. None of them
 * can see a prior assistant turn, so none of them can detect a repeated
 * prompt, a repeated recovery script, or a phase that oscillates A→B→A→B.
 * That is the direct mechanism behind the "infinite loop" / "repeated
 * prompt" / "repeated recovery" failure class in the source transcripts.
 *
 * This module is the ONLY new structural piece the redesign authorizes
 * (see the design report's OWNERSHIP DECISION table). It is a small,
 * pure ring buffer plus similarity functions — no new state machine, no
 * new decision authority. It answers exactly one question: "have we said
 * this before, or are we going in circles?" The verifier rules in
 * rules.ts consume it; nothing else needs to.
 *
 * Persistence: the ring buffer rides the existing contextSnapshot JSONB
 * persist in route.ts, exactly like every other counter in this codebase
 * (sessionFailureCount, teachingHistory, capabilities, ...). No schema
 * migration, no new store.
 */

/** One remembered assistant turn. Kept minimal — only what similarity
 *  detection and phase-oscillation detection need, never the full text
 *  history the route already persists via Message rows. */
export interface TurnRecord {
  /** Normalized text (lowercased, whitespace-collapsed, punctuation-light)
   *  — comparisons run on this, never on raw text, so trailing punctuation
   *  or a re-cased word never defeats an exact-match check. */
  normalizedText: string
  /** Token set for Jaccard similarity — precomputed so repeated comparisons
   *  across the ring don't re-tokenize the same string. */
  tokens: Set<string>
  /** Was this turn a question (repliesWithQuestion at the time)? Used by
   *  the duplicate-question detector so a two-sentence TEACH turn is never
   *  compared against a one-line ASK turn. */
  askedQuestion: boolean
  /** The recovery key active on this turn, if any (null for ordinary
   *  turns). Used by the recovery-escalation-must-differ detector. */
  recoveryKey: string | null
  /** The concept-ladder phase AFTER this turn (legacy 6-phase name, the
   *  vocabulary conversationState.ts already emits). Used by the
   *  oscillation detector. */
  phaseAfter: string | null
}

/** Ring buffer size. 6 is enough to catch an A→B→A→B cycle (needs 4) with
 *  one turn of margin, and small enough that persisting it in
 *  contextSnapshot costs nothing measurable. */
export const TURN_HISTORY_MAX = 6

export interface TurnHistory {
  turns: TurnRecord[]
}

export function initialTurnHistory(): TurnHistory {
  return { turns: [] }
}

/** Total: accepts whatever shape was in a JSONB blob and returns a valid
 *  TurnHistory, never throwing — matches this codebase's readX() convention
 *  (conversationState.readConversationState, teachingHistory.readTeachingHistory). */
export function readTurnHistory(raw: unknown): TurnHistory {
  if (!raw || typeof raw !== 'object') return initialTurnHistory()
  const turnsRaw = (raw as { turns?: unknown }).turns
  if (!Array.isArray(turnsRaw)) return initialTurnHistory()
  const turns: TurnRecord[] = []
  for (const t of turnsRaw) {
    if (!t || typeof t !== 'object') continue
    const normalizedText = typeof (t as any).normalizedText === 'string' ? (t as any).normalizedText : null
    if (normalizedText === null) continue
    const tokenArr = Array.isArray((t as any).tokens) ? (t as any).tokens as string[] : normalizeToTokens(normalizedText)
    turns.push({
      normalizedText,
      tokens: new Set(tokenArr),
      askedQuestion: (t as any).askedQuestion === true,
      recoveryKey: typeof (t as any).recoveryKey === 'string' ? (t as any).recoveryKey : null,
      phaseAfter: typeof (t as any).phaseAfter === 'string' ? (t as any).phaseAfter : null,
    })
  }
  return { turns: turns.slice(-TURN_HISTORY_MAX) }
}

/** JSONB cannot carry a Set — serialize tokens back to a plain array. */
export function serializeTurnHistory(history: TurnHistory): { turns: Array<Omit<TurnRecord, 'tokens'> & { tokens: string[] }> } {
  return {
    turns: history.turns.map((t) => ({ ...t, tokens: [...t.tokens] })),
  }
}

/** Normalize text for comparison: lowercase, collapse whitespace, strip
 *  most punctuation. Deliberately simple — this is a repetition detector,
 *  not an NLP pipeline; over-engineering it risks false negatives on the
 *  exact class of near-identical LLM output it exists to catch. */
export function normalizeForComparison(text: string): string {
  return text
    .toLowerCase()
    .replace(/```[\s\S]*?```/g, ' ') // code fences excluded, matching every other rule in this file's siblings
    .replace(/[.,!?;:'"()\[\]<>]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function normalizeToTokens(normalizedText: string): string[] {
  return normalizedText.split(' ').filter((w) => w.length > 0)
}

/** Jaccard similarity of two token sets. 1.0 = identical vocabulary,
 *  0.0 = disjoint. Order-insensitive by design — a reworded-but-identical
 *  sentence must still be caught. */
export function jaccardSimilarity(a: Set<string>, b: Set<string>): number {
  if (a.size === 0 && b.size === 0) return 1
  if (a.size === 0 || b.size === 0) return 0
  let intersection = 0
  for (const tok of a) if (b.has(tok)) intersection++
  const union = a.size + b.size - intersection
  return union === 0 ? 0 : intersection / union
}

/** Build a TurnRecord for the turn about to be appended. Pure. */
export function buildTurnRecord(text: string, opts: {
  askedQuestion: boolean
  recoveryKey: string | null
  phaseAfter: string | null
}): TurnRecord {
  const normalizedText = normalizeForComparison(text)
  return {
    normalizedText,
    tokens: new Set(normalizeToTokens(normalizedText)),
    askedQuestion: opts.askedQuestion,
    recoveryKey: opts.recoveryKey,
    phaseAfter: opts.phaseAfter,
  }
}

/** Fold in this turn's record, keeping only the last TURN_HISTORY_MAX. */
export function appendTurn(history: TurnHistory, record: TurnRecord): TurnHistory {
  return { turns: [...history.turns, record].slice(-TURN_HISTORY_MAX) }
}

// ── Detectors — each pure, each answers one question against the ring ──────

export interface ExactDuplicateResult {
  isDuplicate: boolean
  /** Index into history.turns (0 = oldest kept) that matched, if any. */
  matchedIndex: number | null
}

/** I-5 — is this draft byte-identical (after normalization) to any of the
 *  last TURN_HISTORY_MAX assistant turns? Catches the literal "same tutor
 *  response twice" failure (Part 3), not merely back-to-back — a loop can
 *  return to an earlier line after a few turns elsewhere. */
export function detectExactDuplicate(candidateNormalizedText: string, history: TurnHistory): ExactDuplicateResult {
  if (candidateNormalizedText.length === 0) return { isDuplicate: false, matchedIndex: null }
  const idx = history.turns.findIndex((t) => t.normalizedText === candidateNormalizedText)
  return { isDuplicate: idx !== -1, matchedIndex: idx === -1 ? null : idx }
}

export interface NearDuplicateResult {
  isNearDuplicate: boolean
  maxSimilarity: number
  matchedIndex: number | null
}

/** I-6 — near-duplicate check against the IMMEDIATELY PREVIOUS assistant
 *  turn only (not the whole ring): a rephrased-but-substantively-identical
 *  reply to consecutive turns is the sharpest signal of the model "stalling
 *  on itself." Comparing against the whole ring would also catch a
 *  legitimate spaced-repetition callback ("as we said about fractions
 *  earlier..."), which is desired teaching behavior, not a defect. */
export function detectNearDuplicate(
  candidateTokens: Set<string>, history: TurnHistory, threshold: number,
): NearDuplicateResult {
  if (history.turns.length === 0) return { isNearDuplicate: false, maxSimilarity: 0, matchedIndex: null }
  const last = history.turns[history.turns.length - 1]
  const sim = jaccardSimilarity(candidateTokens, last.tokens)
  return { isNearDuplicate: sim >= threshold, maxSimilarity: sim, matchedIndex: sim >= threshold ? history.turns.length - 1 : null }
}

/** I-7 — is this turn a near-duplicate QUESTION of any question asked in
 *  the last TURN_HISTORY_MAX turns? Scoped to askedQuestion=true turns on
 *  both sides so a TEACH turn is never compared against an ASK turn. */
export function detectDuplicateQuestion(
  candidateTokens: Set<string>, candidateAskedQuestion: boolean, history: TurnHistory, threshold: number,
): NearDuplicateResult {
  if (!candidateAskedQuestion) return { isNearDuplicate: false, maxSimilarity: 0, matchedIndex: null }
  let best = 0
  let bestIdx: number | null = null
  history.turns.forEach((t, idx) => {
    if (!t.askedQuestion) return
    const sim = jaccardSimilarity(candidateTokens, t.tokens)
    if (sim > best) { best = sim; bestIdx = idx }
  })
  return { isNearDuplicate: best >= threshold, maxSimilarity: best, matchedIndex: bestIdx }
}

/** I-8 — recovery must escalate, never repeat identical (Part 3). Compares
 *  this recovery turn only against the MOST RECENT prior turn that also
 *  fired the SAME recovery key — a later, harder rung addressing the same
 *  failure state must not read like the previous rung's script verbatim. */
export function detectRepeatedRecoveryScript(
  candidateTokens: Set<string>, candidateRecoveryKey: string | null, history: TurnHistory, threshold: number,
): NearDuplicateResult {
  if (!candidateRecoveryKey) return { isNearDuplicate: false, maxSimilarity: 0, matchedIndex: null }
  for (let i = history.turns.length - 1; i >= 0; i--) {
    const t = history.turns[i]
    if (t.recoveryKey === candidateRecoveryKey) {
      const sim = jaccardSimilarity(candidateTokens, t.tokens)
      return { isNearDuplicate: sim >= threshold, maxSimilarity: sim, matchedIndex: sim >= threshold ? i : null }
    }
  }
  return { isNearDuplicate: false, maxSimilarity: 0, matchedIndex: null }
}

export interface OscillationResult {
  isOscillating: boolean
  /** The two phases involved in the detected A→B→A→B cycle, if any. */
  cycle: [string, string] | null
}

/** I-9 — state oscillation: the phase sequence (last turns + the phase this
 *  candidate turn would produce) contains an A→B→A→B cycle. Needs at least
 *  4 phase points (3 history + 1 candidate) to detect one full repeat. */
export function detectPhaseOscillation(candidatePhaseAfter: string | null, history: TurnHistory): OscillationResult {
  const sequence = [...history.turns.map((t) => t.phaseAfter), candidatePhaseAfter].filter(
    (p): p is string => p !== null,
  )
  if (sequence.length < 4) return { isOscillating: false, cycle: null }
  const n = sequence.length
  const a = sequence[n - 4]
  const b = sequence[n - 3]
  const c = sequence[n - 2]
  const d = sequence[n - 1]
  if (a !== b && a === c && b === d) {
    return { isOscillating: true, cycle: [a, b] }
  }
  return { isOscillating: false, cycle: null }
}

/** Default similarity threshold for I-6/I-7/I-8. Deliberately conservative
 *  (high bar for "near-duplicate") because these rules ship at LOG severity
 *  first (per the design report's S1→S7 rollout) — a threshold that is too
 *  loose would flood the log with false positives before real-traffic
 *  calibration has happened. Tune only after reviewing logged data, never
 *  by guessing a stricter number. */
export const DEFAULT_SIMILARITY_THRESHOLD = 0.85
