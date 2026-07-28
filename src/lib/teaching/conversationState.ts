/**
 * Conversation State Machine — Phases C–G (2026-07-14 teaching-quality).
 *
 * Moves per-turn teaching decisions OUT of prompt prose and INTO
 * deterministic runtime logic. The server decides the teaching phase,
 * the next move (teach / show / ask), the question-stage ceiling, the
 * response length budget, and whether a visual leads — the LLM only
 * teaches inside those decisions. Pure module: no DB, no I/O; state
 * rides the existing contextSnapshot persist (the P1 pattern).
 *
 * Phase ladder (decision-engine/07's session shape, concept-scoped):
 *
 *   OBSERVE → DEMONSTRATE → GUIDE → CHECK → PRACTICE → TRANSFER
 *
 * Advancement is evidence-gated (never time- or turn-gated):
 *   OBSERVE→DEMONSTRATE   learner recognised something (correct signal)
 *   DEMONSTRATE→GUIDE     the teacher has actually demonstrated
 *   GUIDE→CHECK           a supported step succeeded
 *   CHECK→PRACTICE        basic understanding shown (correct at CHECK)
 *   PRACTICE→TRANSFER     application success, twice
 * Failure moves DOWN one phase (re-show, don't re-ask) — mirroring the
 * Recovery Engine's exit-one-step-below-entry law.
 */

import {
  questionLegality,
  phaseAfterConcludedDiagnostic,
  foldAskSuppression,
  buildDirectiveAcknowledgementLine,
  type LegalityContext,
  type LegalityReason,
} from './questionLegality'
import { buildCapabilityRepairLine } from './capabilityModel'

export type TeachingPhase =
  | 'OBSERVE' | 'DEMONSTRATE' | 'GUIDE' | 'CHECK' | 'PRACTICE' | 'TRANSFER'

export const PHASE_ORDER: TeachingPhase[] = [
  'OBSERVE', 'DEMONSTRATE', 'GUIDE', 'CHECK', 'PRACTICE', 'TRANSFER',
]

/** Highest Question Stage (base prompt's QUESTION STAGE POLICY, 1–7)
 * permitted in each phase — the structural ban on OBSERVE→calculation
 * jumps. Stage 6 (calculation) is unreachable before PRACTICE. */
export const PHASE_MAX_QUESTION_STAGE: Record<TeachingPhase, number> = {
  OBSERVE: 2,       // observation / recognition only
  DEMONSTRATE: 2,
  GUIDE: 4,         // up to simple reasoning
  CHECK: 4,
  PRACTICE: 6,      // calculation now legal
  TRANSFER: 7,
}

export interface ConversationState {
  phase: TeachingPhase
  conceptId: string | null
  questionsAskedSinceTeach: number
  teachSegmentsSinceQuestion: number
  consecutiveFailures: number
  demonstrated: boolean
  correctAtCheck: number
  correctAtPractice: number
  remediationCount: number
  diagramRequests: number
  exampleRequests: number
  misconceptionDetectedThisLesson: boolean
  consecutivePriorKnowledgeProbes: number
  /** Never resets — permanent high-water mark. Catches abbreviated probes
   *  ("GPS?", "Maps?") that CPK misses when LLM evades the formal pattern. */
  totalKnowledgeProbes: number
  /** Hard Rule 1: counts consecutive turns where the student fired a
   *  dont_know or dont_understand recovery. When >= 2, discovery is over —
   *  decideNextMove forces 'show' regardless of phase. Resets on any non-
   *  failure turn. */
  consecutiveDontKnows: number
  /** Tracks how many times the OBSERVE phase ended in failure (recovery or
   *  signal=false). When >= 2, decideNextMove forces 'show' so the phase
   *  advances to DEMONSTRATE instead of repeating the observation loop. */
  observeFailures: number
  /** QL-1 (questionLegality.ts): has ANYTHING been taught this session for
   *  this concept — anchor, demonstration, or explanation? Distinct from
   *  `demonstrated`, which deliberately ignores OBSERVE-phase gives; a
   *  question needs a source even when that source was only the anchor. */
  taughtThisSession: boolean
  /** QL-3: turns of ASK suppression remaining after an explicit learner
   *  directive ("explain it rather than keep asking"). Decays one per turn. */
  askSuppressedTurns: number
  strategiesUsed: number[]
  analogiesUsed: string[]
  demonstrationsShown: string[]
  misconceptionsSeen: string[]
  prerequisiteAttempts: string[]
  explanationCount: number
  learnerConfidence: 'high' | 'medium' | 'low' | 'unknown'
  frustrationLevel: number
  /** A.6: turns spent in the current phase without advancing. Resets to 0
   *  on any phase transition. Used to detect stale teaching loops. */
  turnsInCurrentPhase: number
}

export function initialConversationState(conceptId: string | null): ConversationState {
  return {
    phase: 'OBSERVE',
    conceptId,
    questionsAskedSinceTeach: 0,
    teachSegmentsSinceQuestion: 0,
    consecutiveFailures: 0,
    demonstrated: false,
    correctAtCheck: 0,
    correctAtPractice: 0,
    remediationCount: 0,
    diagramRequests: 0,
    exampleRequests: 0,
    misconceptionDetectedThisLesson: false,
    consecutivePriorKnowledgeProbes: 0,
    totalKnowledgeProbes: 0,
    consecutiveDontKnows: 0,
    observeFailures: 0,
    taughtThisSession: false,
    askSuppressedTurns: 0,
    strategiesUsed: [],
    analogiesUsed: [],
    demonstrationsShown: [],
    misconceptionsSeen: [],
    prerequisiteAttempts: [],
    explanationCount: 0,
    learnerConfidence: 'unknown',
    frustrationLevel: 0,
    turnsInCurrentPhase: 0,
  }
}

/** Read a persisted state back off contextSnapshot, resetting when the
 * concept changed or the shape is unrecognisable. Total: never throws. */
export function readConversationState(
  raw: unknown,
  currentConceptId: string | null,
): ConversationState {
  if (raw && typeof raw === 'object' && PHASE_ORDER.includes((raw as ConversationState).phase)) {
    const s = raw as ConversationState
    if (s.conceptId === currentConceptId) {
      return {
        ...initialConversationState(currentConceptId),
        ...s,
      }
    }
  }
  return initialConversationState(currentConceptId)
}

// ── Post-AI evidence fold ─────────────────────────────────────────────────────

export interface TurnEvidence {
  askedQuestion: boolean
  signalCorrect: boolean | null
  recoveryFired: boolean
  learnerRequest?: 'diagram' | 'real_life_example' | 'explain_differently' | null
  misconceptionDetected?: boolean
  isPriorKnowledgeProbe?: boolean
  strategyUsed?: number
  analogyLabel?: string
  demonstrationLabel?: string
  misconceptionId?: string
  prerequisiteAttempted?: string
  signalConfidence?: 'high' | 'medium' | 'low'
  /** Hard Rule 1: true when the student fired a dont_know or dont_understand
   *  recovery this turn — drives consecutiveDontKnows counter. */
  dontKnowSignal?: boolean
  /** QL-3: the learner explicitly asked to be taught rather than questioned
   *  ("stop asking", "just explain it", "explain rather than keep asking").
   *  Sourced from recoveryGuard's `too_many_questions` failure state, which
   *  is the detector for exactly this family of utterances. */
  learnerIssuedDirective?: boolean
}

/**
 * P0-4 (semantic loop detection): structural classifier for the prior-
 * knowledge-elicitation question family — "Have you seen/heard/come
 * across X?", "Can you think of X?", "What comes to mind when...?",
 * "Do you know/recall X?". These share one underlying INTENT (checking
 * what the learner already has, before teaching) regardless of exact
 * wording — the same "understand by structure, not exact phrase" pattern
 * QUESTION_OPENERS/STRONG_PATTERNS already use elsewhere in this codebase.
 * Sibling to repliesWithQuestion(): both read the ASSISTANT's own text.
 */
// Expanded to catch common variants the LLM uses that the narrow version
// missed ("have you ever used", "have you ever tried", "have you ever noticed",
// "are you familiar with") — the live transcript had ~8 undetected probes.
const PRIOR_KNOWLEDGE_PROBE_RE =
  /\b(have you (seen|heard(\s+of)?|come across|encountered|used|tried|noticed|worked\s+with|thought\s+about)|can you think of|what comes to mind|do you (know|recall|remember)|are you familiar with)\b/i

export function isPriorKnowledgeProbe(assistantText: string): boolean {
  const withoutCode = assistantText.replace(/```[\s\S]*?```/g, '')
  return PRIOR_KNOWLEDGE_PROBE_RE.test(withoutCode)
}

function phaseIndex(p: TeachingPhase): number { return PHASE_ORDER.indexOf(p) }

function phaseDown(p: TeachingPhase, demonstrated: boolean): TeachingPhase {
  // Failure returns to re-showing, never below what makes sense: once the
  // teacher has demonstrated, the floor is DEMONSTRATE (re-show the thing);
  // before that, OBSERVE.
  const floor = demonstrated ? 1 : 0
  return PHASE_ORDER[Math.max(phaseIndex(p) - 1, floor)]
}

/** Detect whether an assistant reply asks the learner anything — the
 * deterministic input for the Phase E counters. Question marks inside
 * code fences are ignored. */
export function repliesWithQuestion(assistantText: string): boolean {
  const withoutCode = assistantText.replace(/```[\s\S]*?```/g, '')
  return withoutCode.includes('?')
}

/** Fold one completed turn's evidence into the state machine. Pure. */
export function advanceConversationState(
  prev: ConversationState,
  evidence: TurnEvidence,
): ConversationState {
  const next: ConversationState = { ...prev }

  // Stance Enforcement (Claude Recommendation #6): monotonic within the
  // concept's lifetime, same reset-on-concept-change rule as every other
  // counter here — never cleared by a later turn without a misconception
  // signal (a misconception is "addressed", not "erased", per
  // studentIntelligence.ts's activity model).
  if (evidence.misconceptionDetected) next.misconceptionDetectedThisLesson = true

  // Phase E counters — driven by what the assistant actually did.
  if (evidence.askedQuestion) {
    next.questionsAskedSinceTeach = prev.questionsAskedSinceTeach + 1
    next.teachSegmentsSinceQuestion = 0
  } else {
    next.teachSegmentsSinceQuestion = prev.teachSegmentsSinceQuestion + 1
    next.questionsAskedSinceTeach = 0
    // A no-question turn in DEMONSTRATE (or later) means the teacher showed
    // something — the evidence gate DEMONSTRATE→GUIDE needs.
    if (prev.phase !== 'OBSERVE') next.demonstrated = true
    // QL-1: any give — including the OBSERVE-phase anchor, which `demonstrated`
    // deliberately excludes — creates a source the learner can answer from.
    next.taughtThisSession = true
  }

  // QL-3: fold the learner-directive suppression counter before any early
  // return below, so a directive issued on a remediation turn still sticks.
  next.askSuppressedTurns = foldAskSuppression(
    prev.askSuppressedTurns,
    evidence.learnerIssuedDirective === true,
  )

  // P0-4: consecutive prior-knowledge-probe counter — folded unconditionally
  // like the Phase E counters above, independent of which branch follows.
  // totalKnowledgeProbes is monotonically increasing — never reset — so
  // abbreviated probes ("GPS?", "Maps?") that fall outside PRIOR_KNOWLEDGE_PROBE_RE
  // cannot erase the high-water mark the formal probes built up.
  next.consecutivePriorKnowledgeProbes = evidence.isPriorKnowledgeProbe
    ? prev.consecutivePriorKnowledgeProbes + 1
    : 0
  next.totalKnowledgeProbes = (prev.totalKnowledgeProbes ?? 0) + (evidence.isPriorKnowledgeProbe ? 1 : 0)

  // Hard Rule 1: track consecutive student "I don't know / didn't understand"
  // signals so decideNextMove can end discovery after 2. Loop 4 fix: only
  // reset on a genuine correct answer — a bare acknowledgement ("ok", "hmm")
  // between two confusion signals must NOT break the chain.
  if (evidence.dontKnowSignal) {
    next.consecutiveDontKnows = (prev.consecutiveDontKnows ?? 0) + 1
  } else if (evidence.signalCorrect === true) {
    next.consecutiveDontKnows = 0
  }
  // else: neutral turn (acknowledgement / no signal) — preserve the count

  // Bug 5/6/11 — student-state counters for explicit action requests.
  if (evidence.learnerRequest === 'diagram') next.diagramRequests = prev.diagramRequests + 1
  if (evidence.learnerRequest === 'real_life_example') next.exampleRequests = prev.exampleRequests + 1

  // Tracking fields from TurnEvidence — fold into ConversationState arrays.
  if (evidence.strategyUsed !== undefined && evidence.strategyUsed >= 0) {
    if (!next.strategiesUsed.includes(evidence.strategyUsed)) {
      next.strategiesUsed = [...prev.strategiesUsed, evidence.strategyUsed]
    }
  }
  if (evidence.analogyLabel) {
    next.analogiesUsed = [...prev.analogiesUsed, evidence.analogyLabel]
  }
  if (evidence.demonstrationLabel) {
    next.demonstrationsShown = [...prev.demonstrationsShown, evidence.demonstrationLabel]
  }
  if (evidence.misconceptionId) {
    if (!prev.misconceptionsSeen.includes(evidence.misconceptionId)) {
      next.misconceptionsSeen = [...prev.misconceptionsSeen, evidence.misconceptionId]
    }
  }
  if (evidence.prerequisiteAttempted) {
    next.prerequisiteAttempts = [...prev.prerequisiteAttempts, evidence.prerequisiteAttempted]
  }
  if (evidence.signalConfidence) {
    next.learnerConfidence = evidence.signalConfidence
  }

  // Bug 7 — "explain differently" / "I don't understand" is remediation:
  // confidence drops (consecutiveFailures++), remediation is counted, and
  // the phase re-shows (down one, floor DEMONSTRATE) instead of advancing.
  // A stray SIGNAL on such a turn can never advance the ladder.
  if (evidence.learnerRequest === 'explain_differently') {
    next.remediationCount = prev.remediationCount + 1
    next.explanationCount = prev.explanationCount + 1
    next.consecutiveFailures = prev.consecutiveFailures + 1
    next.frustrationLevel = Math.min(5, Math.round(
      (prev.consecutiveFailures + 1) + (prev.remediationCount + 1) * 0.5
    ))
    next.phase = phaseDown(prev.phase, next.demonstrated)
    return next
  }

  const failed = evidence.recoveryFired || evidence.signalCorrect === false
  const succeeded = evidence.signalCorrect === true && !evidence.recoveryFired

  if (failed) {
    next.consecutiveFailures = prev.consecutiveFailures + 1
    // Track OBSERVE-phase failures so decideNextMove can force 'show' after 2
    // consecutive failures without waiting for totalKnowledgeProbes (which
    // only counts formal "have you seen/know" patterns, not every probe type).
    if (prev.phase === 'OBSERVE') {
      next.observeFailures = (prev.observeFailures ?? 0) + 1
    }
    next.phase = phaseDown(prev.phase, next.demonstrated)
    // QL-2: a concluded diagnostic must MOVE the machine, not merely change
    // this turn's move. Forcing 'show' while the phase stays at OBSERVE is
    // what produced the observed loop — the tutor showed once, re-entered
    // OBSERVE, and the observation question came back. The diagnostic's own
    // result ("nothing here yet") is the evidence DEMONSTRATE needs.
    next.phase = phaseAfterConcludedDiagnostic(next.phase, next.consecutiveDontKnows)
    // Success evidence at CHECK/PRACTICE is voided by a later failure at
    // the same rung only in part — keep it (high-water mark), the phase
    // drop alone forces re-earning the transition.
    return next
  }

  if (succeeded) {
    next.consecutiveFailures = 0
    switch (prev.phase) {
      case 'OBSERVE':
        next.phase = 'DEMONSTRATE'
        break
      case 'DEMONSTRATE':
        if (next.demonstrated) next.phase = 'GUIDE'
        break
      case 'GUIDE':
        if (next.demonstrated) next.phase = 'CHECK'
        break
      case 'CHECK':
        next.correctAtCheck = prev.correctAtCheck + 1
        if (next.correctAtCheck >= 1) next.phase = 'PRACTICE'
        break
      case 'PRACTICE':
        next.correctAtPractice = prev.correctAtPractice + 1
        if (next.correctAtPractice >= 2) next.phase = 'TRANSFER'
        break
      case 'TRANSFER':
        break
    }
  }

  // A.6: track turns in the current phase — reset on transition.
  next.turnsInCurrentPhase = next.phase === prev.phase
    ? (prev.turnsInCurrentPhase ?? 0) + 1
    : 0

  return next
}

// ── Phase E: next-move decision (pre-LLM) ─────────────────────────────────────

export type NextMove = 'teach' | 'show' | 'ask'

export interface NextMoveContext {
  /** A recovery utterance fired this turn — recovery script governs. */
  recoveryTurn: boolean
  /** Phase F: worked-example-first is in force (failures ≥ 2 or
   *  FOUNDATION_REBUILD strategy). */
  workedExampleFirst: boolean
  /** Band-2 inputs (questionLegality.ts). Optional: omitted means the
   *  conservative reading — no evidenced prior knowledge — which can only
   *  ever remove ASK, never add it. */
  legality?: LegalityContext
}

export interface NextMoveDecision {
  move: NextMove
  /** Non-null when the Band-2 legality layer removed ASK from the legal set.
   *  Emitted as measurement (foldLegalityMetrics) and surfaced as a rationale
   *  line in the turn directive. */
  blockedReason: LegalityReason | null
  rationale: string | null
}

/**
 * The server's decision on what KIND of turn the next response is.
 * Deterministic replacement for "the LLM decides whether to quiz".
 */
export function decideNextMove(state: ConversationState, ctx: NextMoveContext): NextMove {
  return decideNextMoveDetailed(state, ctx).move
}

/**
 * The decision, with the Band-2 rationale attached. decideNextMove() is a
 * thin wrapper over this so existing callers are unchanged.
 *
 * Order: recovery interrupt → Band 2 legality (subtractive) → the existing
 * heuristic ladder. Legality runs BEFORE the ladder because a heuristic can
 * only choose among legal moves; running it after would let a heuristic
 * re-introduce an illegal one.
 */
export function decideNextMoveDetailed(
  state: ConversationState,
  ctx: NextMoveContext,
): NextMoveDecision {
  // Recovery preempts — the recovery script already forbids questions.
  if (ctx.recoveryTurn) return { move: 'teach', blockedReason: null, rationale: null }

  // ── Band 2 · LEGALITY (subtractive only) ───────────────────────────────
  const verdict = questionLegality(state, ctx.legality)
  if (!verdict.askLegal) {
    // Nothing taught yet ⇒ the give must be a SHOW (the learner needs to see
    // the thing). Otherwise an explanation is what was asked for.
    const move: NextMove = state.taughtThisSession ? 'teach' : 'show'
    return { move, blockedReason: verdict.reason, rationale: verdict.rationale }
  }

  return { move: decideNextMoveHeuristic(state, ctx), blockedReason: null, rationale: null }
}

/** The pre-existing heuristic ladder, unchanged in behaviour. Only reachable
 *  once Band 2 has confirmed ASK is legal. */
function decideNextMoveHeuristic(state: ConversationState, ctx: NextMoveContext): NextMove {
  // Hard Rule 1: the student has said "I don't know / didn't understand"
  // twice in a row — Discovery is definitively over, teaching must begin.
  if ((state.consecutiveDontKnows ?? 0) >= 2) return 'show'
  // Permanent gate: after 2 total prior-knowledge probes the inquiry phase
  // is definitively over. Unlike CPK, this counter never resets, so
  // abbreviated probes that fall outside PRIOR_KNOWLEDGE_PROBE_RE cannot
  // reset the gate once 2 formal probes have been seen. A human tutor stops
  // asking "have you seen X?" after the student has said "no" twice.
  if ((state.totalKnowledgeProbes ?? 0) >= 2) return 'show'
  // P0-4: semantic loop break — the same underlying question, reworded,
  // twice in a row. More specific than the generic question budget below
  // (which only counts, never recognizes repeated INTENT), so it is
  // checked first and can fire even where the generic count alone would not.
  if (state.consecutivePriorKnowledgeProbes >= 2) return 'show'
  // Observe-failure gate: when the student has failed the OBSERVE observation
  // question twice, stop repeating it — advance to DEMONSTRATE.
  if ((state.observeFailures ?? 0) >= 2) return 'show'
  // Hard question budget: two asks without a give → give.
  if (state.questionsAskedSinceTeach >= 2) {
    return state.consecutiveFailures >= 1 ? 'show' : 'teach'
  }
  // Repeated struggle → demonstrate, don't interrogate (Phase F).
  if (state.consecutiveFailures >= 2) return 'show'
  // Worked-example-first: until something has been demonstrated, show.
  if (ctx.workedExampleFirst && !state.demonstrated) return 'show'

  switch (state.phase) {
    case 'OBSERVE':     return 'ask'          // one observation question
    case 'DEMONSTRATE': return 'show'
    case 'GUIDE':       return state.teachSegmentsSinceQuestion >= 2 ? 'ask' : 'teach'
    case 'CHECK':       return 'ask'
    case 'PRACTICE':    return 'ask'
    case 'TRANSFER':    return 'ask'
  }
}

// ── Phase D: response length budget ───────────────────────────────────────────

export type Register = 'beginner' | 'intermediate' | 'expert'

/**
 * Server-decided response budget. Struggle makes responses SHORTER,
 * never longer — a flooded mind gets less text, not more
 * (foundations/04 P5). null = unlimited.
 */
export function responseBudget(register: Register, consecutiveFailures: number): number | null {
  const struggling = consecutiveFailures >= 2
  if (register === 'beginner') return struggling ? 2 : 4
  if (register === 'intermediate') return struggling ? 4 : 7
  return struggling ? 6 : null
}

// ── Learner autonomy detection (moved out of route.ts for testability) ────────

/**
 * ISS-09 — the ru/hi pattern sets sit alongside the English ones rather than
 * behind a language parameter: Cyrillic and Devanagari cannot collide with
 * Latin patterns or each other, so the script discriminates and every call
 * site is unchanged. Romanized Hindi is anchored to multi-word phrases with
 * no English reading, the same discipline recoveryGuard uses.
 */
const AUTONOMY_RE =
  /\b(next\s+topic|next\s+lesson|move\s+on|skip\s+this|let'?s?\s+continue|let'?s?\s+move\s+on|can\s+we\s+move\s+on|ready\s+to\s+move\s+on)\b/i
const AUTONOMY_RU_RE =
  /(след(ующая|ующую)\s+тема|след(ующий|ующую)\s+урок|дальше|двигаемся\s+дальше|идём\s+дальше|идем\s+дальше|пропустить\s+это|продолжим)/iu
const AUTONOMY_HI_RE =
  /(अगला\s+(विषय|पाठ)|आगे\s+बढ़(ें|ो|ते)|छोड़\s+(दो|दें)|जारी\s+रख)|\b(agla\s+topic|aage\s+badh(o|ein|te)|chhod\s+do)\b/iu

/** Negators for the ru/hi sets — same asymmetry as English: a request to
 *  STAY must never advance the learner past unfinished work. */
// JavaScript's \b is ASCII-only, so `\bне\b` can never match Cyrillic —
// Unicode-aware boundaries are required or the guard is silently dead code.
const AUTONOMY_RU_NEGATOR_RE =
  /(?<!\p{L})(не|нет|стоп|подожди|погоди|пока|прежде)(?!\p{L})/iu
const AUTONOMY_HI_NEGATOR_RE =
  /(नहीं|मत|रुक|पहले)|(?<!\p{L})(nahi+|mat|ruk(o|iye))(?!\p{L})/iu

/**
 * ISS-08 — the negation guard.
 *
 * The bare pattern fires on "I don't want to move on", "not ready to move
 * on", "can we NOT move on yet" — every one of them a request to STAY, read
 * as a request to leave. The cost is asymmetric and severe: a false positive
 * appends [LESSON_COMPLETE] and advances the learner past a concept they
 * just said they were not done with, which is the hollow-advancement failure
 * the mastery gate exists to prevent. A false negative merely means the
 * learner asks again.
 *
 * So the guard is deliberately blunt: a negator ANYWHERE before the matched
 * phrase suppresses the request. "Move on" is a short, fixed idiom — there is
 * no construction where "I don't want to ... move on" means "advance me".
 */
const AUTONOMY_NEGATOR_RE =
  /\b(?:not|never|no|stop|wait|hold\s+on|before|until|unless|rather)\b|\b(?:do|does|did|wo|can|is|are|was|were|should|would|could)n'?t\b|\bcannot\b/i

/**
 * ISS-08 — the anchoring guard.
 *
 * A learner quoting or asking ABOUT the phrase is not issuing it: "what does
 * 'move on' mean here?", "the book says to move on after each section".
 * Quoted spans and interrogatives about the phrase are excluded. Anchoring
 * follows recoveryGuard's own precedent, where mild patterns only count when
 * the short message IS the utterance rather than mentions it.
 */
const AUTONOMY_MENTION_RE = /["“'‘][^"”'’]*\b(?:move\s+on|next\s+topic|next\s+lesson|skip\s+this)\b[^"”'’]*["”'’]|\bwhat\s+(?:does|do\s+you\s+mean\s+by)\b/i

/**
 * A.2: Detect explicit navigation commands — the learner wants to go
 * somewhere specific rather than just "next." Returns the intent string
 * or null. This is NOT an autonomy request (advance to next concept); it
 * is a navigation request (go to a specific concept or revisit one).
 *
 * The system prompt should acknowledge the intent rather than treating
 * it as off-topic, even though the server cannot change the concept
 * mid-turn — the concept resolution happens before the LLM call.
 */
const NAVIGATION_RE =
  /\b(?:go\s+back\s+to|take\s+me\s+(?:back\s+)?to|teach\s+me\s+about|switch\s+to|change\s+(?:topic\s+)?to|i\s+want\s+to\s+learn\s+about|can\s+(?:we|you)\s+(?:do|cover|go\s+over))\b/i

export function detectNavigationRequest(message: string): boolean {
  return NAVIGATION_RE.test(message)
}

export function buildNavigationAcknowledgementBlock(): string {
  return (
    '\n\nNAVIGATION REQUEST — the student asked to switch to a different topic. ' +
    'Acknowledge their request warmly in one sentence ("Great choice — we\'ll ' +
    'get to that!"). Then: if the current lesson is not yet mastered, briefly ' +
    'note what\'s left and offer to finish or skip. If mastery is verified, ' +
    'wrap up with [LESSON_COMPLETE] so the system can navigate. ' +
    'Never ignore the request or pretend it was not made.'
  )
}

/** The learner explicitly asked to advance — server-detected, honored.
 *  Guarded per ISS-08: negated and merely-mentioned forms do not count. */
export function detectAutonomyRequest(message: string): boolean {
  for (const [re, negator] of [
    [AUTONOMY_RE, AUTONOMY_NEGATOR_RE],
    [AUTONOMY_RU_RE, AUTONOMY_RU_NEGATOR_RE],
    [AUTONOMY_HI_RE, AUTONOMY_HI_NEGATOR_RE],
  ] as const) {
    const m = re.exec(message)
    if (!m) continue
    if (AUTONOMY_MENTION_RE.test(message)) return false
    // Negation is scoped to the text BEFORE the match: "move on, I'm not
    // confused" is still a request to advance, and a whole-message scan would
    // suppress it.
    if (!negator.test(message.slice(0, m.index))) return true
  }
  return false
}

/** ONLY injected when masteryVerified(state) is already true (see
 * masteryGate.ts) — an autonomy request before mastery gets
 * buildMasteryGateBlock() instead, never this. */
export function buildAutonomyBlock(): string {
  return (
    '\n\nLEARNER AUTONOMY — the student has explicitly asked to move on. ' +
    'Honor this immediately: do not press them to confirm understanding again. ' +
    'Briefly acknowledge what was covered and what they should review later, ' +
    'then append [LESSON_COMPLETE] at the very end of your response so the ' +
    'session advances to the next concept.'
  )
}

// ── A.4: student-intent detection ────────────────────────────────────────────
// When the learner asks a genuine question ("why does X?", "what if Y?",
// "how do I Z?"), relay it into the directive so the LLM addresses it
// directly instead of falling back to its phase template.

const QUESTION_RE =
  /\b(?:why\b|how\b|what\s+(?:if|is|does|happens|about|do)\b|when\b|where\b|can\s+(?:you|we)\b|could\s+(?:you|we)\b|is\s+(?:it|that|this)\b|does\s+(?:it|that|this)\b)/i

export function detectLearnerQuestion(message: string): boolean {
  if (message.length < 8) return false
  return QUESTION_RE.test(message) && message.includes('?')
}

// ── The turn directive (the ONLY prompt surface of this module) ───────────────

export interface TurnDirectiveParams {
  state: ConversationState
  nextMove: NextMove
  maxParagraphs: number | null
  /** Phase F flag, for the SHOW wording. */
  workedExampleFirst: boolean
  /** Phase G: server-decided visual for this turn (detectVisual output),
   *  or null when text teaches faster. */
  visualType: string | null
  /** When true, the OBSERVE phase frame is replaced with one that does not
   *  say "no teaching payload" — the First Lesson Protocol's opening move
   *  IS a teaching payload (creating the need). */
  firstLessonActive?: boolean
  /** Band-2 rationale from decideNextMoveDetailed, when ASK was removed.
   *  Naming the reason materially raises compliance over a bare "do not ask". */
  legalityRationale?: string | null
  /** QL-3: the learner issued the directive on THIS turn — trigger the
   *  one-clause self-correction. Only on arrival; a repeated apology is
   *  worse than none. */
  directiveJustIssued?: boolean
  /** Capability Model: blocking capability ids when the learner is stuck on an
   *  OPERATION rather than on the concept. null = not a capability gap. */
  capabilityRepair?: readonly string[] | null
  /** A.4: true when the learner's message contains a genuine question the
   *  LLM must address before following the phase template. */
  learnerAskedQuestion?: boolean
  /** A.7: true when this concept was previously completed/mastered by the
   *  learner — skip re-teaching from scratch, treat as review/refresh. */
  conceptPreviouslyMastered?: boolean
  /** A.10: the phase just advanced this turn (the previous turn's signal
   *  moved the ladder). Triggers a brief recap before the new phase. */
  phaseJustAdvanced?: boolean
}

const PHASE_FRAME: Record<TeachingPhase, string> = {
  OBSERVE:     'OBSERVE — show ONE concrete anchor (a drawn arrow, a scenario, a physical object) then ask what the learner NOTICES about it. This is NOT prior-knowledge probing — never ask "have you seen / heard / used / tried / know" whether they have encountered the concept before. Show first. Then ask what they observe.',
  DEMONSTRATE: 'DEMONSTRATE — show the idea working (worked example, demonstration, concrete walkthrough). Explain after showing, never instead of showing.',
  GUIDE:       'GUIDE — do it WITH the learner: supported steps, you carry most of the weight, fade support gradually.',
  CHECK:       'CHECK — verify the basic idea landed with ONE small check at or below the stage ceiling. React to the answer contentfully.',
  PRACTICE:    'PRACTICE — the learner works; you watch and react. One problem at a time. Calculation questions are now allowed.',
  TRANSFER:    'TRANSFER — apply the idea in a genuinely new context. Stretch, but stay warm.',
}

const MOVE_LINE: Record<NextMove, string> = {
  teach: 'TEACH — explain or advance the idea. Ask NO questions this turn; end with an invitation, not a question mark.',
  show:  'SHOW — open with a CONCRETE DEMONSTRATION of the concept BEFORE anything else. Ask NO questions this turn. DO NOT ask "have you seen / heard / used / know" — the student cannot answer those; show them the concept directly as if they know nothing.',
  ask:   'ASK — exactly ONE question, at or below the stage ceiling. Nothing else question-shaped in the response.',
}

/**
 * The compact, server-decided directive injected once per Library turn.
 * This REPLACES per-turn LLM judgement (whether to quiz, how long to
 * write, whether a visual leads) — it does not add another advisory
 * opinion on top of it.
 */
export function buildTurnDirective(p: TurnDirectiveParams): string {
  const lines: string[] = ['\n\nTURN DIRECTIVE (server-decided — follow exactly; overrides any earlier advisory pacing):']
  const phaseFrame = (p.firstLessonActive && p.state.phase === 'OBSERVE')
    ? 'OBSERVE — follow the FIRST LESSON PROTOCOL opening approach: use the concrete hook the subject rule specifies to create the NEED. Then ask exactly ONE Stage 1–2 observation question.'
    : PHASE_FRAME[p.state.phase]
  lines.push(`- Teaching phase: ${phaseFrame}`)
  lines.push(`- Next move: ${MOVE_LINE[p.nextMove]}`)
  lines.push(`- Question stage ceiling: Stage ${PHASE_MAX_QUESTION_STAGE[p.state.phase]} (see QUESTION STAGE POLICY). Never ask above it this turn.`)
  // Band 2 — stated before every other constraint below it, because it is the
  // only one the model must not trade off against anything else.
  if (p.legalityRationale) {
    lines.push(`- QUESTIONS ARE NOT LEGAL THIS TURN. ${p.legalityRationale}`)
  }
  if (p.directiveJustIssued) {
    lines.push(buildDirectiveAcknowledgementLine())
  }
  if (p.capabilityRepair && p.capabilityRepair.length > 0) {
    lines.push(buildCapabilityRepairLine(p.capabilityRepair as never))
  }
  if (p.maxParagraphs !== null) {
    lines.push(`- Length budget: at most ${p.maxParagraphs} short paragraphs. If the learner is struggling, shorter is better — never longer.`)
  }
  if (p.nextMove === 'show' && p.workedExampleFirst) {
    lines.push('- Demonstrate first: this learner needs to SEE it work before being asked anything (worked-example-first is in force).')
  }
  // P0-4: name the specific reason when the semantic loop break is what
  // forced this SHOW — a clearer signal than the generic worked-example-
  // first wording above, since the LLM's OWN prior wording is the problem.
  if (p.nextMove === 'show' && p.state.consecutivePriorKnowledgeProbes >= 2) {
    lines.push('- Semantic loop detected: your last two turns asked the SAME underlying question in different words (e.g. "have you seen X" then "can you think of X") without landing. Do NOT ask a third rephrased version of it. Switch to a direct demonstration, worked example, or visualization instead — show them, don\'t ask again.')
  }
  if (p.visualType) {
    lines.push(`- Visual-first: a ${p.visualType.replace(/_/g, ' ')} teaches this faster than prose — lead with it (emit the VISUAL tag) and keep the text around it minimal.`)
  }
  // Loop 5: when questions have already been answered at this phase, tell
  // the LLM explicitly — prevents re-asking resolved questions.
  const answered = p.state.correctAtCheck + p.state.correctAtPractice
  if (answered > 0 && p.nextMove === 'ask') {
    lines.push(`- The student has already answered ${answered} question(s) correctly this lesson. Ask a DIFFERENT question — never re-ask one they already got right.`)
  }
  // Loop 6: analogy world ceiling — max 2 distinct analogy worlds per
  // concept. After DEMONSTRATE, cap new analogy introductions.
  if (p.state.demonstrated && p.state.explanationCount >= 2) {
    lines.push('- ANALOGY CEILING: at most 2 analogy worlds per concept. If you already used analogies, reuse the SAME world — do not introduce a new metaphor.')
  }
  // A.4: when the learner asked a genuine question, the LLM must address
  // it directly BEFORE following the phase template — intent > template.
  if (p.learnerAskedQuestion) {
    lines.push('- STUDENT QUESTION DETECTED: the student asked a genuine question. Address their specific question FIRST, directly and concisely. Then continue with the teaching phase above. Never ignore a student question to follow a template.')
  }
  // A.10: brief concept recap on phase advancement — grounds the student
  // before moving to the next teaching mode.
  if (p.phaseJustAdvanced && p.state.phase !== 'OBSERVE') {
    const recapPhases: Record<string, string> = {
      DEMONSTRATE: 'You noticed something — now show how it works.',
      GUIDE: 'The demonstration landed — now work through it together.',
      CHECK: 'Guided practice went well — now verify with a check question.',
      PRACTICE: 'Basic understanding confirmed — now apply independently.',
      TRANSFER: 'Practice is solid — now stretch to a new context.',
    }
    const cue = recapPhases[p.state.phase]
    if (cue) lines.push(`- PHASE TRANSITION: ${cue} Start with a one-sentence recap of the key idea before proceeding.`)
  }
  // A.8: resume planned lesson after examples — when the student previously
  // requested an example/diagram (counters > 0) and this turn is NOT another
  // request, explicitly tell the LLM to return to the teaching flow.
  if ((p.state.exampleRequests > 0 || p.state.diagramRequests > 0) && !p.learnerAskedQuestion) {
    lines.push('- RESUME LESSON: the previous example/diagram was a detour. Return to the planned teaching flow for this phase — do not start a new tangent or repeat the example.')
  }
  // A.7: never reteach mastered concepts from scratch.
  if (p.conceptPreviouslyMastered && p.state.phase === 'OBSERVE') {
    lines.push('- REVIEW MODE: this student has already mastered this concept. Do NOT re-teach from the beginning. Instead, give a concise refresher or go straight to a challenging application/transfer question. Skip observation and basic demonstration.')
  }
  // A.6: stale-loop breaker — when the same phase has persisted for 4+
  // turns without advancement, force the LLM to try a different approach.
  if ((p.state.turnsInCurrentPhase ?? 0) >= 4) {
    lines.push(`- STALE LOOP (${p.state.turnsInCurrentPhase} turns in ${p.state.phase}): your previous approach is not landing. Try a COMPLETELY DIFFERENT angle — a new analogy, a concrete physical demo, a worked example from a different domain, or a simpler sub-problem. Do NOT rephrase the same explanation.`)
  }
  return lines.join('\n')
}

// ── Phase G: server-side visual decision ─────────────────────────────────────

/**
 * Should a visual LEAD this turn? Decided in runtime from the phase and
 * the already-detected available visual (detectVisual's keyword matcher)
 * — never left to the LLM to invent. Visuals lead when the job is
 * anchoring/showing; during CHECK/PRACTICE/TRANSFER the learner produces,
 * so an unrequested visual is noise.
 */
export function decideVisualFirst(
  availableVisualType: string | null,
  state: ConversationState,
  nextMove: NextMove,
): string | null {
  if (!availableVisualType) return null
  if (nextMove === 'ask') return null
  if (state.phase === 'OBSERVE' || state.phase === 'DEMONSTRATE' || state.phase === 'GUIDE') {
    return availableVisualType
  }
  return null
}
