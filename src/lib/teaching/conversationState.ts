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
import { qualifiesForBudgetExtension } from './conceptBudget'
import { buildCapabilityRepairLine } from './capabilityModel'
import { buildGranularityDirective } from './teachingGranularity'

export type TeachingPhase =
  | 'OBSERVE' | 'DEMONSTRATE' | 'GUIDE' | 'CHECK' | 'PRACTICE' | 'TRANSFER'

export const PHASE_ORDER: TeachingPhase[] = [
  'OBSERVE', 'DEMONSTRATE', 'GUIDE', 'CHECK', 'PRACTICE', 'TRANSFER',
]

/**
 * The ladder splits in two, and the split is the reason acknowledgements are
 * safe to act on.
 *
 * DELIVERY phases (OBSERVE, DEMONSTRATE, GUIDE) describe what the teacher has
 * put in front of the learner. Moving through them costs nothing pedagogically
 * — the learner has not been asked to prove anything yet.
 *
 * MASTERY GATES (CHECK, PRACTICE, TRANSFER) advance on correctAtCheck /
 * correctAtPractice, which only a real answer increments. This is where the
 * anti-hollow-advancement law lives, and an acknowledgement must never move it.
 *
 * Single source of truth for both the acknowledgement transition in
 * advanceConversationState() and the LOW-SIGNAL line in buildTurnDirective(),
 * so the state machine and the prompt can never disagree about which phases an
 * acknowledgement may move.
 */
export function isDeliveryPhase(phase: TeachingPhase): boolean {
  return phase === 'OBSERVE' || phase === 'DEMONSTRATE' || phase === 'GUIDE'
}

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

/** The lowest stage that is a real check rather than a warm-up. Stage 1
 *  (observation) is an opener, not a follow-up to a correct answer. */
const MIN_FOLLOWUP_STAGE = 1

/**
 * WHICH question stage to ask this turn — the follow-up selector.
 *
 * PRODUCTION GAP THIS CLOSES. The QUESTION STAGE POLICY (base prompt) already
 * defines the follow-up vocabulary as a 1-7 ladder: 1 Observation,
 * 2 Recognition, 3 Identification, 4 Simple reasoning, 5 Application,
 * 6 Calculation, 7 Transfer. PHASE_MAX_QUESTION_STAGE already publishes a
 * CEILING per phase. But nothing ever SELECTED a stage — the directive stated
 * only "never ask above N", so every follow-up was the model's free choice and
 * it settled on the same one ("How did you figure that out?", a Stage 4
 * reasoning probe) turn after turn.
 *
 * The ladder is therefore the canonical owner of follow-up form; it was
 * publishing half its answer. This selects from the SAME learner state the
 * ladder already maintains, and applies the policy's OWN two rules rather than
 * inventing pedagogy:
 *
 *   "if the student cannot answer, drop one stage lower" -> struggle demotes
 *   "never skip more than one stage upward"              -> success promotes by 1
 *
 * Demonstrated success on THIS concept raises the stage; current struggle
 * lowers it; the phase ceiling always wins. A learner answering correctly
 * therefore climbs recognition -> identification -> reasoning -> application ->
 * transfer instead of being asked to explain their reasoning forever, and the
 * variety is a consequence of the ladder moving, not of a template list.
 *
 * No new state, no second teaching system: inputs are ConversationState's own
 * counters and the existing ceiling table.
 *
 * Pure and total. Returns null when this turn asks nothing.
 */
export function selectQuestionStage(
  state: ConversationState,
  nextMove: NextMove,
): number | null {
  if (nextMove !== 'ask') return null
  const ceiling = PHASE_MAX_QUESTION_STAGE[state.phase] ?? 2
  const correct = (state.correctAtCheck ?? 0) + (state.correctAtPractice ?? 0)
  const failures = state.consecutiveFailures ?? 0
  // Base: the floor of what this phase treats as a real check.
  const base = Math.max(MIN_FOLLOWUP_STAGE, Math.min(2, ceiling))
  // Success climbs one stage per demonstrated correct answer; struggle drops.
  const raw = base + Math.max(0, correct) - Math.max(0, failures)
  return Math.max(MIN_FOLLOWUP_STAGE, Math.min(ceiling, raw))
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
  /** P6: total teaching turns spent on THIS concept, across all phases.
   *  Distinct from turnsInCurrentPhase, which resets on every transition and
   *  therefore cannot see a learner cycling explain/question/explain across
   *  phases — the exact loop the concept budget exists to bound. Reset on a
   *  concept change by readConversationState, like every other counter here. */
  turnsOnConcept: number
  /** Set once, by advanceConversationState, when the learner reaches the base
   *  turn budget while demonstrably converting (conceptBudget:
   *  qualifiesForBudgetExtension). Buys turns only — never mastery. Persisted
   *  in contextSnapshot.conversationState; readConversationState spreads the
   *  stored object over initialConversationState, so pre-existing snapshots
   *  simply default to false. No migration. */
  budgetExtensionGranted: boolean
  /** QL-5 (questionLegality.ts, Runtime Redesign Mission Part 7, closes
   *  gap G2): has a reflection/check-style question already been asked
   *  during the CURRENT entry into CHECK phase? CHECK is legacy's
   *  conflation of the canonical ladder's REFLECT+ASSESS states (see
   *  kernel/tsm/phases.ts's canonicalToLegacy mapping) — until that split
   *  is live (S5), this flag enforces the mission's "reflection questions
   *  max 1" invariant against the one CHECK entry a failure can force the
   *  machine to repeat. Resets to false on every fresh entry into CHECK
   *  from a different phase; set true the first time a question is asked
   *  while phase===CHECK. */
  reflectionAskedThisEntry: boolean
  /** Verified-evidence counters: increment only when the SIGNAL passed
   *  independent verification (signalVerification.ts). The unverified
   *  counters (correctAtCheck/correctAtPractice) still drive the teaching
   *  phase ladder; these drive strict mastery (completion authority). */
  verifiedCorrectAtCheck: number
  verifiedCorrectAtPractice: number
  /** Accumulates signal-verification flags across the session. A high
   *  count reduces trust in the SIGNAL and is visible in telemetry. */
  signalContradictions: number
  /** Counts turns where the server-decided move disagrees with what the
   *  LLM actually rendered (e.g., decided 'ask' but no question appeared). */
  parityViolations: number
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
    turnsOnConcept: 0,
    budgetExtensionGranted: false,
    reflectionAskedThisEntry: false,
    verifiedCorrectAtCheck: 0,
    verifiedCorrectAtPractice: 0,
    signalContradictions: 0,
    parityViolations: 0,
  }
}

/** Read a persisted state back off contextSnapshot, resetting when the
 * concept changed or the shape is unrecognisable. Total: never throws. */
/**
 * A2b — DID THE LADDER JUST GET WIPED, AND WHY?
 *
 * `readConversationState` below returns a FRESH state whenever the stored
 * concept differs from the turn's concept. That is correct when the learner
 * genuinely moved to another concept — and catastrophic, silently, when it
 * fires for any other reason: phase drops to OBSERVE, `demonstrated` to false,
 * `correctAtCheck` to 0, `turnsOnConcept` to 0, with nothing in the response,
 * the logs or the transcript to say a restart happened.
 *
 * A1 measured the footprint and could not name the cause. In 15 of the 16 long
 * sessions parked at OBSERVE, `turnsOnConcept` was 0 or 1 after 11-29 learner
 * turns — one had 29 learner turns and `turnsOnConcept` 0. That counter rises
 * on every non-degraded turn, so those turns were reset or degraded, and
 * STORED STATE CANNOT TELL THE TWO APART: the per-turn concept id was never
 * recorded. Ruled out by measurement: the stored conceptId is never null
 * (0 of 252 sessions) and 234 of 363 sessions carry one concept in evidence.
 *
 * This reports the fact so the next day of real traffic answers it. Pure, and
 * deliberately NOT wired into the reset decision — measuring a suspected defect
 * must not change the behaviour being measured. Nothing here alters what
 * `readConversationState` returns.
 */
export interface ConversationStateReadDiagnostics {
  /** True when the ladder was discarded and rebuilt from scratch this turn. */
  reset: boolean
  /** Why — distinguishes a real concept change from a state that was absent
   *  or unreadable, which look identical in the stored snapshot. */
  reason: 'kept' | 'no-stored-state' | 'unreadable-phase' | 'concept-changed'
  /** The concept the stored ladder belonged to; null when there was none. */
  storedConceptId: string | null
  /** The concept this turn resolved to. */
  currentConceptId: string | null
}

export function inspectConversationStateRead(
  raw: unknown,
  currentConceptId: string | null,
): ConversationStateReadDiagnostics {
  if (!raw || typeof raw !== 'object') {
    return { reset: true, reason: 'no-stored-state', storedConceptId: null, currentConceptId }
  }
  const s = raw as ConversationState
  if (!PHASE_ORDER.includes(s.phase)) {
    return {
      reset: true,
      reason: 'unreadable-phase',
      storedConceptId: typeof s.conceptId === 'string' ? s.conceptId : null,
      currentConceptId,
    }
  }
  if (s.conceptId === currentConceptId) {
    return { reset: false, reason: 'kept', storedConceptId: s.conceptId ?? null, currentConceptId }
  }
  return {
    reset: true,
    reason: 'concept-changed',
    storedConceptId: typeof s.conceptId === 'string' ? s.conceptId : null,
    currentConceptId,
  }
}

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
  /** Signal verification status from signalVerification.ts. When 'CLEAN',
   *  the signal counts toward both regular and strict mastery. When
   *  'SUSPICIOUS' or 'CONTRADICTED', it counts toward regular mastery
   *  (phase advancement) but NOT strict mastery (completion authority). */
  signalVerificationStatus?: 'CLEAN' | 'SUSPICIOUS' | 'CONTRADICTED'
  /** True when the server-decided move disagrees with what the LLM rendered
   *  (e.g., decided 'ask' but response had no question). */
  parityViolation?: boolean
  /** RS P-3: this turn's text is a degraded outage template, not model output.
   *  The templates are content-free by construction (templateFallback.ts: "no
   *  fabricated pedagogy"), so the turn delivered NO teaching — `demonstrated`
   *  and `taughtThisSession` must not record that it did. Sourced from
   *  degradedMode.isDegradedProvider(), the single owner of the question. */
  degradedTurn?: boolean
  /** Did this turn actually DELIVER teaching — the server's decided move was
   *  'teach' or 'show'? A tutor normally explains and then ends on a question,
   *  and treating "asked something" as "taught nothing" froze the ladder at
   *  DEMONSTRATE permanently (see the give-detection block below). Asserts what
   *  the TEACHER did, never what the learner learned, so it advances delivery
   *  phases only — the mastery gates still require real correct answers.
   *  Omitted ⇒ behaviour identical to before this field existed. */
  deliveredTeaching?: boolean
  /** The learner's message was a bare acknowledgement — a receipt ("got it")
   *  or a forward request ("go", "continue", "ready"). Sourced from
   *  isLowSignalAcknowledgement(), the same predicate that drives the turn
   *  directive's LOW-SIGNAL line, so detection has exactly one owner.
   *
   *  Before this field existed the acknowledgement decorated the prompt and
   *  was then discarded: it reached no counter and no transition. A delivery
   *  turn (teach/show) asks nothing, so no SIGNAL can be emitted, so
   *  signalCorrect stayed null forever and the ladder had no reachable exit —
   *  the machine re-issued the same phase directive on every acknowledgement.
   *  See advanceConversationState()'s acknowledgement branch. */
  acknowledgement?: boolean
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

/** QL-5 support: fold reflectionAskedThisEntry across a phase transition.
 * A fresh entry into CHECK (from any other phase) clears the budget; a
 * question asked WHILE already in CHECK spends it; anything else carries
 * the previous value forward unchanged. Pure — called at every return
 * point in advanceConversationState() below. */
function foldReflectionAskedThisEntry(
  prevPhase: TeachingPhase, nextPhase: TeachingPhase, askedQuestion: boolean, prevFlag: boolean,
): boolean {
  if (nextPhase === 'CHECK' && prevPhase !== 'CHECK') return false
  if (prevPhase === 'CHECK' && askedQuestion) return true
  return prevFlag
}

/**
 * A.6 support: fold turnsInCurrentPhase across a transition. Same shape and
 * the same reason as foldReflectionAskedThisEntry above — the fold is applied
 * at EVERY return point of advanceConversationState, because a value computed
 * at only one of them is not a fold, it is a fold that some turns skip.
 *
 * It previously WAS computed at only one of them: the shared tail, which the
 * remediation and failure branches both return before reaching. Those are
 * precisely the branches that hold the phase still, so the counter that
 * measures "how long have we been stuck" was frozen for the entire duration
 * of being stuck, and the STALE LOOP directive it feeds — the runtime's
 * designated last-resort anti-repetition device, at 4 turns — could not fire
 * in the one situation it exists for. Every failure turn re-emitted a
 * byte-identical directive with the counter reading 0.
 */
function foldTurnsInCurrentPhase(
  prevPhase: TeachingPhase, nextPhase: TeachingPhase, prevCount: number,
): number {
  return nextPhase === prevPhase ? (prevCount ?? 0) + 1 : 0
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
/**
 * Grant the one-time turn extension, if this turn's folded state earns it.
 *
 * Applied at EVERY exit of advanceConversationState — including the remediation
 * and failure branches, which return early. Evaluating it here rather than at
 * the turnsOnConcept increment is deliberate: `consecutiveFailures` is set
 * later in the failure branch, so an earlier check would read a stale zero and
 * could grant an extension on the very turn the learner failed.
 *
 * The rule itself lives in conceptBudget.qualifiesForBudgetExtension — one
 * definition, shared with the budget evaluation that consumes the flag.
 */
function withBudgetExtension(next: ConversationState): ConversationState {
  if (qualifiesForBudgetExtension(next)) {
    return { ...next, budgetExtensionGranted: true }
  }
  return next
}

export function advanceConversationState(
  prev: ConversationState,
  evidence: TurnEvidence,
): ConversationState {
  const next: ConversationState = { ...prev }

  // P6: every turn spent on this concept counts toward its teaching budget,
  // regardless of which phase it happened in or how it went. A degraded turn
  // taught nothing, so it must not consume budget either (same reasoning as
  // the P4 stage guard).
  if (!evidence.degradedTurn) next.turnsOnConcept = (prev.turnsOnConcept ?? 0) + 1

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
  }

  // ── WHAT COUNTS AS A GIVE ───────────────────────────────────────────────
  //
  // This used to live inside the `else` above, i.e. "a turn that asked nothing
  // is a give". That equated ASKING with NOT TEACHING, and good tutoring does
  // both in one breath: explain, then end on a question. Every production turn
  // measured in the corpus audit did exactly that — so `demonstrated` was never
  // set, and because DEMONSTRATE→GUIDE is gated on it, the ladder froze at
  // DEMONSTRATE permanently. Reproduced offline with no provider and no DB:
  //
  //   10 correct answers, every turn asking a question
  //     → phase DEMONSTRATE, check 0, practice 0, demonstrated false
  //   the same 10 with ONE silent teach turn inserted
  //     → phase TRANSFER, check 1, practice 2, demonstrated true
  //
  // With the ladder stuck below CHECK, `correctAtCheck` and `correctAtPractice`
  // can never increment, `masteryVerifiedStrict` can never be true, and NO
  // LESSON IS COMPLETABLE. A previous fix (see the reachability law below)
  // already found DEMONSTRATE absorbing and hoisted the transition out of the
  // `succeeded` branch — but left it gated on this flag, so the freeze
  // survived in a different form.
  //
  // THIS DOES NOT WEAKEN THE MASTERY BAR. `demonstrated` asserts that the
  // TEACHER delivered, never that the learner learned. The learner gates are
  // `correctAtCheck` / `correctAtPractice`, which still move only on real
  // correct answers — the same boundary the acknowledgement path below already
  // draws: delivery phases advance on delivery, mastery gates on evidence.
  //
  // `deliveredTeaching` is the server's own decided move for the turn, so this
  // reads the engine's intent rather than guessing from prose. When the caller
  // does not supply it, behaviour is byte-identical to before.
  //
  // The degraded-outage guard is unchanged and still governs both flags: an
  // outage template is content-free by construction, so it must not satisfy
  // the DEMONSTRATE→GUIDE gate and must not tell QL-1 a source exists to
  // answer from — the precise condition QL-1 exists to forbid.
  const deliveredAGive =
    !evidence.degradedTurn && (!evidence.askedQuestion || evidence.deliveredTeaching === true)
  if (deliveredAGive) {
    // A give in DEMONSTRATE (or later) means the teacher showed something —
    // the evidence gate DEMONSTRATE→GUIDE needs.
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
    next.reflectionAskedThisEntry = foldReflectionAskedThisEntry(
      prev.phase, next.phase, evidence.askedQuestion, prev.reflectionAskedThisEntry ?? false,
    )
    next.turnsInCurrentPhase = foldTurnsInCurrentPhase(
      prev.phase, next.phase, prev.turnsInCurrentPhase ?? 0,
    )
    return withBudgetExtension(next)
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
    //
    // Both counters record the SAME fact — an OBSERVE probe was run and
    // produced nothing — arriving by two different channels: a `dont_know`
    // recovery utterance (consecutiveDontKnows) or a wrong/absent answer
    // (observeFailures). Only the first was wired here, so the second road
    // out of OBSERVE existed in decideNextMove (which can force 'show') and
    // nowhere in the fold (which is the only layer that can move a phase).
    // A move-layer escape cannot advance a ladder: the learner who answers
    // wrong twice was pinned in OBSERVE permanently, because phaseDown's
    // floor is OBSERVE until `demonstrated`, and `demonstrated` is only set
    // by a no-question turn OUTSIDE OBSERVE — a condition OBSERVE forbids.
    // OBSERVE was therefore absorbing, and since prompt assembly is a pure
    // function of the state, every subsequent turn produced a byte-identical
    // directive. Reading both channels here closes that fixed point using the
    // transition the module already owns. max(), not sum(): a dont_know at
    // OBSERVE increments both, and must still count as one failed probe.
    next.phase = phaseAfterConcludedDiagnostic(
      next.phase,
      Math.max(next.consecutiveDontKnows, next.observeFailures),
    )
    // Success evidence at CHECK/PRACTICE is voided by a later failure at
    // the same rung only in part — keep it (high-water mark), the phase
    // drop alone forces re-earning the transition.
    next.reflectionAskedThisEntry = foldReflectionAskedThisEntry(
      prev.phase, next.phase, evidence.askedQuestion, prev.reflectionAskedThisEntry ?? false,
    )
    next.turnsInCurrentPhase = foldTurnsInCurrentPhase(
      prev.phase, next.phase, prev.turnsInCurrentPhase ?? 0,
    )
    return withBudgetExtension(next)
  }

  // ── The reachability law ────────────────────────────────────────────────
  //
  // DEMONSTRATE→GUIDE is gated on `demonstrated` — "the teacher has actually
  // demonstrated", per this module's own contract at the top of the file. It
  // is NOT gated on a learner signal, and it must not be, because DEMONSTRATE
  // is the one phase that structurally cannot produce one:
  //
  //   phase DEMONSTRATE ⇒ decideNextMoveHeuristic returns 'show'
  //   move 'show'       ⇒ the turn asks nothing (MOVE_LINE: "Ask NO questions")
  //   nothing asked     ⇒ the model emits no SIGNAL
  //   no SIGNAL         ⇒ signalCorrect is null ⇒ `succeeded` is false
  //
  // So while this transition lived inside the `succeeded` branch its guard
  // could never be evaluated, and DEMONSTRATE was an absorbing state for
  // EVERY learner — including one answering perfectly. Since buildTurnDirective
  // is a pure function of this state, the tutor then re-emitted a
  // byte-identical directive on every subsequent turn: the reported bug.
  //
  // The general rule, of which this is the only instance: a phase whose
  // decided move can never ask a question must not have a signal-gated exit.
  // OBSERVE ('ask'), GUIDE (alternates teach/ask), CHECK, PRACTICE and
  // TRANSFER ('ask') can all reach their gates; DEMONSTRATE alone could not.
  //
  // Hoisted here so ONE site owns the transition for all three evidence kinds
  // (a correct signal, a bare acknowledgement, or a neutral reply) — they all
  // mean the same thing at this rung, and three copies of one rule is how the
  // guard drifted out of reach in the first place. The failure and
  // remediation paths return above this line, so a struggling learner is
  // still never carried forward.
  if (prev.phase === 'DEMONSTRATE' && next.demonstrated) {
    next.phase = 'GUIDE'
  }

  if (succeeded) {
    next.consecutiveFailures = 0
    // PHASE 4 — THE REMEDIATION EXIT.
    //
    // `remediationCount` had ONE writer (`prev.remediationCount + 1`, on an
    // explain-differently turn) and NO reset anywhere. grep gave four
    // references in this file: the declaration, the initialiser, that
    // increment, and a read. So it was a monotonic TALLY being read as if it
    // were a STATE, and remediation was never exited at all — not "exited only
    // by graded correct evidence", never.
    //
    // MEASURED before this line existed: after two explain-differently turns
    // the learner answered correctly three times and climbed OBSERVE -> GUIDE
    // -> CHECK -> PRACTICE, while `remediationTier` still told the prompt
    // "Strategies already attempted: 2. Do NOT reuse any previous approach."
    // — forever, or until a concept change reset the whole ladder.
    //
    // The exit is the evidence that ALREADY clears `consecutiveFailures` on
    // the line above: a graded CORRECT answer. Nothing is fabricated and no
    // new evidence class is invented — the learner demonstrably answered. In
    // particular a bare "Got it" does NOT clear it: an acknowledgement is not
    // evidence, masteryGate already refuses it, and that stays true here.
    next.remediationCount = 0
    const verified = evidence.signalVerificationStatus === 'CLEAN' || evidence.signalVerificationStatus === undefined
    switch (prev.phase) {
      case 'OBSERVE':
        next.phase = 'DEMONSTRATE'
        break
      case 'DEMONSTRATE':
        // Owned by the reachability law above.
        break
      case 'GUIDE':
        if (next.demonstrated) next.phase = 'CHECK'
        break
      case 'CHECK':
        next.correctAtCheck = prev.correctAtCheck + 1
        if (verified) next.verifiedCorrectAtCheck = (prev.verifiedCorrectAtCheck ?? 0) + 1
        if (next.correctAtCheck >= 1) next.phase = 'PRACTICE'
        break
      case 'PRACTICE':
        next.correctAtPractice = prev.correctAtPractice + 1
        if (verified) next.verifiedCorrectAtPractice = (prev.verifiedCorrectAtPractice ?? 0) + 1
        if (next.correctAtPractice >= 2) next.phase = 'TRANSFER'
        break
      case 'TRANSFER':
        break
    }
  } else if (evidence.acknowledgement) {
    // The learner acknowledged ("got it") or asked to proceed ("go",
    // "continue", "ready"). This is the ONLY input a learner can give after a
    // delivery turn, because a delivery turn asks nothing and therefore emits
    // no SIGNAL — without a transition here the ladder is a fixed point and
    // the tutor regenerates the same phase directive forever.
    //
    // It advances the DELIVERY phases only. OBSERVE / DEMONSTRATE / GUIDE are
    // about what the teacher has put in front of the learner, so a receipt is
    // sufficient evidence to move to the next delivery step. CHECK, PRACTICE
    // and TRANSFER are mastery gates — they advance on correctAtCheck /
    // correctAtPractice, which only a real answer can increment. An
    // acknowledgement never moves those, so "Got it" can still never buy
    // mastery. That boundary is the whole point: the hollow-advancement
    // protection lives at the gates, and holding the delivery phases hostage
    // to it never protected anything — it only stalled the lesson.
    //
    // `demonstrated` gates the same two transitions it gates on the succeeded
    // path above, so an acknowledgement cannot skip a demonstration that
    // never happened. Deliberately NOT gated on whether this turn asked a
    // question: a learner who answers an OBSERVE probe with "ok" is declining
    // to engage with it, and moving to DEMONSTRATE (show them) is the correct
    // response — the same escalation observeFailures and totalKnowledgeProbes
    // already make.
    switch (prev.phase) {
      case 'OBSERVE':
        next.phase = 'DEMONSTRATE'
        break
      case 'DEMONSTRATE':
        // Owned by the reachability law above.
        break
      case 'GUIDE':
        if (next.demonstrated) next.phase = 'CHECK'
        break
      case 'CHECK':
      case 'PRACTICE':
      case 'TRANSFER':
        // Mastery gates — an acknowledgement is not evidence of mastery.
        break
    }
  }

  // A.6: track turns in the current phase — reset on transition.
  next.turnsInCurrentPhase = foldTurnsInCurrentPhase(
    prev.phase, next.phase, prev.turnsInCurrentPhase ?? 0,
  )

  next.reflectionAskedThisEntry = foldReflectionAskedThisEntry(
    prev.phase, next.phase, evidence.askedQuestion, prev.reflectionAskedThisEntry ?? false,
  )

  // Signal verification telemetry: fold contradiction and parity counters.
  if (evidence.signalVerificationStatus === 'CONTRADICTED') {
    next.signalContradictions = (prev.signalContradictions ?? 0) + 1
  }
  if (evidence.parityViolation) {
    next.parityViolations = (prev.parityViolations ?? 0) + 1
  }

  // P4 — the lesson stage may only change after a SUCCESSFUL AI response.
  //
  // A degraded turn is an outage template, not teaching: the learner received
  // no explanation, no example and no question. The existing guard above
  // already stops it from claiming `demonstrated`/`taughtThisSession`, but the
  // phase itself could still move — the DEMONSTRATE→GUIDE reachability rule
  // fires on an already-true `demonstrated` inherited from a previous turn,
  // and the delivery-phase acknowledgement transition treats a content-free
  // turn as a give. Either way the learner is advanced through the lesson for
  // a turn in which nothing was taught, which is the exact "assume the
  // explanation happened" failure P4 forbids.
  //
  // Pinning the stage here (rather than at each transition site) keeps ONE
  // owner of the rule — the same reasoning that hoisted the reachability law
  // to a single site above, after three copies of it drifted apart.
  // Learner-describing counters are deliberately still folded: the student's
  // message was real even when our reply failed.
  if (evidence.degradedTurn) {
    next.phase = prev.phase
    next.turnsInCurrentPhase = prev.turnsInCurrentPhase
    // F7 — PROVIDER FAILURE IS NOT DEMONSTRATED MASTERY.
    //
    // Pinning the phase was not enough. The mastery counters are incremented
    // in the `succeeded` branch above, which this guard did not reach, so a
    // degraded turn carrying `signalCorrect: true` still banked mastery
    // evidence. Measured before this line existed, at phase CHECK:
    //
    //     phase CHECK (pinned)  correctAtCheck 1  verifiedCorrectAtCheck 1
    //
    // and the same one step later for correctAtPractice. The mastery bar is
    // correctAtCheck >= 1 plus correctAtPractice >= 2, so an outage could be
    // spent as two thirds of a learner's practice requirement.
    //
    // It was unreachable in production only because the outage template
    // contains no `<!--SIGNAL-->` tag, so correctness parsed as null. That is
    // a property of some template text, not an invariant — any future
    // fallback that echoed a signal, or any caller that inferred correctness
    // some other way, would silently start crediting outages. The counters
    // are pinned here, at the one site that already owns "a degraded turn
    // changes no teaching state", so the guarantee is structural.
    //
    // Learner-describing counters stay folded, exactly as the phase rule
    // above intends: the student's message was real even when our reply
    // failed. Only the record of what THEY demonstrated is protected.
    next.correctAtCheck = prev.correctAtCheck
    next.correctAtPractice = prev.correctAtPractice
    next.verifiedCorrectAtCheck = prev.verifiedCorrectAtCheck
    next.verifiedCorrectAtPractice = prev.verifiedCorrectAtPractice
  }

  return withBudgetExtension(next)
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

/**
 * Has the remedial give this turn's struggle gates would order already been
 * delivered?
 *
 * Every gate below ("they said I-don't-know twice", "we have probed twice",
 * "they have failed twice") is a REMEDIAL INTERVENTION: stop interrogating,
 * give them something. An intervention is spent once it has been delivered.
 *
 * Unscoped, each of those gates was permanent, and permanence turned every one
 * of them into a trap with the same shape:
 *
 *   gate fires ⇒ move is 'show' ⇒ a SHOW turn asks nothing ⇒ no SIGNAL ⇒
 *   `succeeded` never becomes true ⇒ the counter that the gate reads is only
 *   ever reset by success ⇒ the gate fires again, forever.
 *
 * The move engine could therefore pin itself to a non-asking move for the
 * remaining life of the concept, which starves every phase above GUIDE of the
 * graded answer it advances on — and, because buildTurnDirective is a pure
 * function of this state, re-emits a byte-identical directive every turn.
 *
 * `teachSegmentsSinceQuestion` already records exactly the needed fact: it
 * counts consecutive no-question turns and is zeroed the moment a question is
 * asked. So a nonzero value means "we have given since we last asked" — the
 * intervention landed — and the machine may return to the phase ladder. If the
 * learner then fails the next question, the counter zeroes and the gate fires
 * again: a re-show/re-check rhythm, not a mode the lesson cannot leave.
 *
 * No new state, and no gate's intent is weakened — only its permanence.
 */
function remedialGiveDelivered(state: ConversationState): boolean {
  return (state.teachSegmentsSinceQuestion ?? 0) > 0
}

/** The pre-existing heuristic ladder, unchanged in behaviour. Only reachable
 *  once Band 2 has confirmed ASK is legal. */
function decideNextMoveHeuristic(state: ConversationState, ctx: NextMoveContext): NextMove {
  // The struggle/probe gates below are one-shot interventions (see
  // remedialGiveDelivered). Once the give has landed, the phase ladder resumes.
  const remedialPending = !remedialGiveDelivered(state)
  // Hard Rule 1: the student has said "I don't know / didn't understand"
  // twice in a row — Discovery is definitively over, teaching must begin.
  if (remedialPending && (state.consecutiveDontKnows ?? 0) >= 2) return 'show'
  // Permanent gate: after 2 total prior-knowledge probes the inquiry phase
  // is definitively over. Unlike CPK, this counter never resets, so
  // abbreviated probes that fall outside PRIOR_KNOWLEDGE_PROBE_RE cannot
  // reset the gate once 2 formal probes have been seen. A human tutor stops
  // asking "have you seen X?" after the student has said "no" twice.
  if (remedialPending && (state.totalKnowledgeProbes ?? 0) >= 2) return 'show'
  // P0-4: semantic loop break — the same underlying question, reworded,
  // twice in a row. More specific than the generic question budget below
  // (which only counts, never recognizes repeated INTENT), so it is
  // checked first and can fire even where the generic count alone would not.
  if (remedialPending && state.consecutivePriorKnowledgeProbes >= 2) return 'show'
  // Observe-failure gate: when the student has failed the OBSERVE observation
  // question twice, stop repeating it — advance to DEMONSTRATE.
  //
  // Scoped to OBSERVE, because that is the whole of its stated purpose (see
  // the field's own doc comment: "so the phase advances to DEMONSTRATE
  // instead of repeating the observation loop"). The counter never resets —
  // correctly, it is a high-water mark of what happened during the diagnostic
  // — so an unscoped read kept forcing SHOW for the entire remaining lifetime
  // of the concept. That starves the ladder of the one input it advances on:
  // every phase above GUIDE moves on a graded answer, a graded answer needs a
  // question, and this gate forbade questions forever. The escape then held
  // the machine at DEMONSTRATE exactly as it had previously held it at
  // OBSERVE. Once the phase HAS left OBSERVE the escape has already been
  // taken, and continuing to suppress ASK enforces a condition that no longer
  // exists. Later phases have their own failure handling (drop one, floor
  // DEMONSTRATE) — the same boundary phaseAfterConcludedDiagnostic draws.
  if (remedialPending && state.phase === 'OBSERVE' && (state.observeFailures ?? 0) >= 2) return 'show'
  // Hard question budget: two asks without a give → give.
  if (state.questionsAskedSinceTeach >= 2) {
    return state.consecutiveFailures >= 1 ? 'show' : 'teach'
  }
  // Repeated struggle → demonstrate, don't interrogate (Phase F).
  if (remedialPending && state.consecutiveFailures >= 2) return 'show'
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
 * Server-decided response budget. null = unlimited.
 *
 * TWO evidence terms, and the second one was missing (production audit
 * 2026-08-03).
 *
 * STRUGGLE makes responses SHORTER, never longer — a flooded mind gets less
 * text, not more (foundations/04 P5). That half always worked.
 *
 * MASTERY must shorten them too, and did not. `register` is a pure function of
 * the learner's PROFILE (resolveContentRegister reads grade / currentLevel /
 * targetLevel — all static onboarding values, never re-derived), and
 * `consecutiveFailures` only ever registers struggle. So no amount of
 * demonstrated success could move this budget: a learner who self-reported
 * beginner kept a 4-paragraph budget after twenty correct answers, and an
 * expert who was never struggling had NO budget at all. That is the reported
 * "even after many consecutive correct answers the tutor still behaves like
 * the student is a beginner", and the textbook-length responses with it.
 *
 * `demonstratedCorrect` is the learner's verified success on the CURRENT
 * concept — ConversationState's own correctAtCheck + correctAtPractice, the
 * counters the ladder already maintains. No new state, no second mastery
 * model, and it resets with the concept exactly as the ladder does.
 *
 * The >= 2 threshold is the one this runtime already uses everywhere for
 * "repeated evidence" (struggle here, worked-example-first, FOUNDATION_REBUILD,
 * remediation gating) — deliberately the same number, not a new one.
 *
 * Struggle still wins when both apply: a learner who has answered correctly
 * twice and then failed twice is struggling NOW.
 */
export function responseBudget(
  register: Register,
  consecutiveFailures: number,
  demonstratedCorrect = 0,
): number | null {
  const struggling = consecutiveFailures >= 2
  const fluent = !struggling && demonstratedCorrect >= 2
  if (register === 'beginner') return struggling ? 2 : fluent ? 2 : 4
  if (register === 'intermediate') return struggling ? 4 : fluent ? 4 : 7
  return struggling ? 6 : fluent ? 6 : null
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

/**
 * Bug 2 — low-signal acknowledgement detector.
 *
 * "Got it" / "okay" / "I see" are social courtesy turns, not evidence that
 * the learner understood. Advancing the phase on these signals is the same
 * hollow-advancement failure the mastery gate prevents at the lesson level.
 *
 * Detection criteria: the message is short (≤ 10 words) AND consists almost
 * entirely of one or more bare acknowledgement tokens, with no substantive
 * content (no question, no technical term, no number). We intentionally keep
 * the token set tight to avoid false positives on short but real answers.
 */
// Two families share one structural definition: a short turn carrying no
// answer content.
//   · RECEIPT      — "got it", "I see", "makes sense": the learner heard it.
//   · FORWARD      — "go", "continue", "next", "ready", "let's go": the
//                    learner is asking to proceed.
// Both are the same thing to the state machine: the learner consumed the
// delivery and is not answering a question. They differ only in politeness,
// so they are detected by one predicate rather than two parallel ones.
// FORWARD tokens were absent before 2026-07-30, which left "go" / "continue"
// / "next" / "ready" invisible to every detector in this file — no autonomy
// match (AUTONOMY_RE needs "next topic" / "ready to move on"), no navigation
// match, no recovery match, no acknowledgement match.
const LOW_SIGNAL_TOKENS_RE =
  /^[\s,!.]*(?:(?:got it|i see|okay|ok|alright|sure|right|yep|yup|yeah|i understand|understood|makes sense|i get it|i got it|sounds good|sounds right|fine|hmm|uh huh|uh-huh|mhm|m-hm|cool|great|perfect|nice|good|yes|no problem|fair enough|noted|of course|definitely|go|go on|go ahead|continue|next|ready|i'?m ready|let'?s go|let'?s continue|keep going|carry on|proceed)[,!.\s]*)+([\?].*)?$/i

export function isLowSignalAcknowledgement(message: string): boolean {
  const trimmed = message.trim()
  if (!trimmed) return false
  // More than 10 words: the learner added real content — not a bare ack.
  if (trimmed.split(/\s+/).length > 10) return false
  // A question mark means they asked something substantive.
  if (trimmed.includes('?')) return false
  return LOW_SIGNAL_TOKENS_RE.test(trimmed)
}

/**
 * Bug 4 — filler turn detector (applied to the LLM's OWN output).
 *
 * A filler turn contains zero teaching payload: no explanation, no question,
 * no concrete example, no number, no formula. It is pure transitional prose
 * ("Let's take one small step together. We can continue whenever you're ready.")
 * The post-processing layer replaces such turns with a minimum viable teaching
 * move (one concrete check question) rather than letting a content-free turn
 * count as a real teaching turn.
 *
 * Detection: short (≤ 30 words) + no `?` + no digit/formula + contains one or
 * more known filler phrases. Deliberate false-positive caution: requires both
 * the length/no-question criteria AND an explicit filler phrase — a very short
 * but concrete statement ("An orbital is a region where electrons can be found.")
 * will not fire because it contains no filler phrase.
 */
const FILLER_PHRASE_RE =
  /\b(?:whenever you'?re ready|when(?:ever)? you'?re ready|take your time|in your own time|we can continue|let'?s take (?:a|one) (?:small )?step|feel free to|we'?ll continue|take a moment|no rush|we can go|let'?s move forward whenever|at your own pace)\b/i

export function detectFillerTurn(text: string): boolean {
  const wordCount = text.trim().split(/\s+/).length
  if (wordCount > 30) return false
  if (text.includes('?')) return false
  // Must have at least one digit or uppercase letter sequence (formula/symbol)
  // for a turn NOT to be a filler — inverted: if it has neither, the turn is
  // more likely content-free, but we still require the phrase check.
  if (!FILLER_PHRASE_RE.test(text)) return false
  return true
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

// ── B.13-17: Natural Acknowledgement Engine ─────────────────────────────────
// Context-aware acknowledgement instruction that replaces generic "Great!"
// with acknowledgements matched to what actually happened.

export type AcknowledgementContext =
  | 'correct_answer'
  | 'understanding'
  | 'progress'
  | 'confidence_building'
  | 'correction'
  | 'confusion'
  | 'recovery'
  | 'navigation'
  | 'neutral'

export function classifyAcknowledgementContext(
  state: ConversationState,
  signalCorrect: boolean | null,
  recoveryFired: boolean,
  navigationRequest: boolean,
): AcknowledgementContext {
  if (recoveryFired) return 'recovery'
  if (navigationRequest) return 'navigation'
  if (state.consecutiveFailures >= 2) return 'confusion'
  if (signalCorrect === false) return 'correction'
  if (signalCorrect === true) {
    if (state.learnerConfidence === 'low') return 'confidence_building'
    if (state.correctAtCheck + state.correctAtPractice >= 3) return 'progress'
    if (state.phase === 'TRANSFER') return 'understanding'
    return 'correct_answer'
  }
  return 'neutral'
}

const ACKNOWLEDGEMENT_INSTRUCTIONS: Record<AcknowledgementContext, string> = {
  correct_answer: 'Acknowledge the correct answer concisely and specifically — name what they got right, not just "Great!" (e.g. "That\'s correct — the force really does point inward").',
  understanding: 'Acknowledge the depth of their understanding — note the connection they made, not just correctness (e.g. "I can see how you\'re connecting these ideas").',
  progress: 'Acknowledge their progress arc — reference how far they\'ve come this lesson (e.g. "You\'ve built up a solid understanding — let\'s see if you can apply it").',
  confidence_building: 'This student\'s confidence is low — acknowledge gently and build them up (e.g. "That\'s exactly right — you know more than you think").',
  correction: 'Acknowledge the mistake without judgment — normalize it and redirect (e.g. "That\'s a really common place to get tripped up — let me show you why").',
  confusion: 'The student has struggled multiple times — validate their effort, not the confusion (e.g. "This is genuinely tricky — let me try a completely different angle").',
  recovery: 'The student expressed frustration or is stuck — acknowledge their feeling first, then pivot to support (e.g. "I hear you — let\'s take a step back and try something different").',
  navigation: 'The student asked to change topic — acknowledge the request warmly (e.g. "Great choice — we\'ll get to that!").',
  neutral: 'No special acknowledgement needed — proceed directly to teaching content without a filler opener.',
}

export function buildAcknowledgementInstruction(ctx: AcknowledgementContext): string {
  if (ctx === 'neutral') return ''
  return `\n- ACKNOWLEDGEMENT: ${ACKNOWLEDGEMENT_INSTRUCTIONS[ctx]} Never open with generic filler ("Great!", "Okay!", "Nice!", "Exactly!"). Acknowledge HOW they are learning, not just THAT they answered.`
}

// ── The turn directive (the ONLY prompt surface of this module) ───────────────

export interface TurnDirectiveParams {
  state: ConversationState
  nextMove: NextMove
  maxParagraphs: number | null
  /** How complete this turn's explanation must be (teachingGranularity.ts).
   *  Optional so every existing caller compiles and behaves exactly as before
   *  when omitted. */
  granularity?: import('@/lib/teaching/teachingGranularity').TeachingLevel | null
  /** How many NEW concepts/terms this turn may introduce.
   *
   *  The route has always COMPUTED this (contentRegister === 'beginner' ? 1 : 2)
   *  but only ever handed it to the flag-gated verifier context and to the
   *  parity comparison — it never reached the served prompt, so nothing bounded
   *  how much new material one turn could open. That is how a single Molarity
   *  turn also introduced Molality, Mole Fraction, ppm, ppb and Dilution.
   *  Omitted/null keeps the previous wording exactly. */
  maxNewTerms?: number | null
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
  /** Bug 1: the lesson concept title, used to anchor the OBSERVE phase frame
   *  to the concept actually being taught — prevents off-topic opening hooks. */
  lessonTitle?: string | null
  /** Bug 2: true when the learner's incoming message was a bare social
   *  acknowledgement ("got it", "okay", "I see") with no verifiable content.
   *  Injects a mandatory check-question directive so the phase cannot advance
   *  on a signal that carries no evidence of understanding. */
  lowSignalAcknowledgement?: boolean
  /** A.4: true when the learner's message contains a genuine question the
   *  LLM must address before following the phase template. */
  learnerAskedQuestion?: boolean
  /** A.7: true when this concept was previously completed/mastered by the
   *  learner — skip re-teaching from scratch, treat as review/refresh. */
  conceptPreviouslyMastered?: boolean
  /** A.10: the phase just advanced this turn (the previous turn's signal
   *  moved the ladder). Triggers a brief recap before the new phase. */
  phaseJustAdvanced?: boolean
  /** B.13-17: context-aware acknowledgement instruction. */
  acknowledgementContext?: AcknowledgementContext
  /**
   * PHASE 3 — who owns this turn (turnArbitration.ts).
   *
   * THE GAP THIS CLOSES, exactly. Before Phase 3,
   * `grep -c "CLOSING\|episode" conversationState.ts` returned 0: this block
   * opens by claiming it "overrides any earlier advisory pacing", is appended
   * ~580 lines AFTER the session-close block, and was structurally incapable
   * of knowing the session was closing. The model obeyed the last and loudest
   * instruction, which is exactly what it was told to do. That is Phase 2's
   * C1 (CLOSING -> teaching) and C2 (CLOSING -> new question).
   *
   * When omitted, behaviour is byte-for-byte what it was before Phase 3 — so
   * every existing caller and test is unaffected, and the route is the only
   * thing that turns arbitration on.
   */
  arbitration?: import('./turnArbitration').TurnArbitration | null
}

const PHASE_FRAME: Record<TeachingPhase, string> = {
  OBSERVE:     'OBSERVE — show ONE concrete anchor (a drawn arrow, a scenario, a physical object) then ask what the learner NOTICES about it. This is NOT prior-knowledge probing — never ask "have you seen / heard / used / tried / know" whether they have encountered the concept before. Show first. Then ask what they observe.',
  DEMONSTRATE: 'DEMONSTRATE — show the idea working: (1) concrete situation first, (2) walk through step by step, (3) name the principle only AFTER they see it work. Explain after showing, never instead of showing. Connect every step to what the learner already noticed in OBSERVE.',
  GUIDE:       'GUIDE — do it WITH the learner: supported steps, you carry most of the weight, fade support gradually. Name aloud what you are doing at each step ("First I check… then I…") so the learner absorbs the strategy, not just the answer.',
  CHECK:       'CHECK — verify the basic idea landed with ONE small check at or below the stage ceiling. React to the answer contentfully. After a correct answer, ask "How did you figure that out?" or "What told you that was right?" — one metacognitive prompt per CHECK.',
  PRACTICE:    'PRACTICE — the learner works; you watch and react. One problem at a time. Calculation questions are now allowed. After grading, briefly name the strategy that worked ("You used X to get Y") so the learner can reuse it deliberately.',
  TRANSFER:    'TRANSFER — apply the idea in a genuinely new context. Stretch, but stay warm. Ask the learner to predict before computing ("Before we solve it — what do you expect will happen and why?").',
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
  // PHASE 3 — ARBITRATION BY ABSENCE.
  //
  // Two of this block's lines are Axis-1 (they say what the tutor DOES):
  // the teaching phase frame and the next move. Everything else it emits —
  // length budget, new-term ceiling, register, acknowledgement handling,
  // visual pairing — is Axis 3/4 and conflicts with nothing, so it survives
  // whoever owns the turn. Suppressing the whole block to settle an Axis-1
  // conflict would throw away the second kind with the first, and a closing
  // or recovery turn would silently lose its length and register bounds.
  //
  // The header's authority claim goes with them: a block that does not own
  // the turn must not tell the model it overrides the block that does.
  const ownsPhase = p.arbitration ? p.arbitration.allows('PHASE_FRAME') : true
  const ownsMove = p.arbitration ? p.arbitration.allows('NEXT_MOVE') : true
  const allowsQuestion = p.arbitration ? p.arbitration.allows('NEW_QUESTION') : true
  const lines: string[] = [
    (ownsPhase || ownsMove)
      ? '\n\nTURN DIRECTIVE (server-decided — follow exactly; overrides any earlier advisory pacing):'
      : `\n\nTURN DIRECTIVE (constraints only — the ${p.arbitration!.owner} block above owns this turn's action; follow it, and apply the limits below to however it is written):`,
  ]
  let phaseFrame: string
  if (p.firstLessonActive && p.state.phase === 'OBSERVE') {
    phaseFrame = 'OBSERVE — follow the FIRST LESSON PROTOCOL opening approach: use the concrete hook the subject rule specifies to create the NEED. Then ask exactly ONE Stage 1–2 observation question.'
  } else if (p.state.phase === 'OBSERVE' && p.lessonTitle) {
    // Bug 1: anchor the OBSERVE hook to the concept being taught so the opening
    // example cannot drift to a different concept (e.g. NaCl for an MO Theory lesson).
    phaseFrame = `${PHASE_FRAME.OBSERVE} The anchor MUST be drawn from "${p.lessonTitle}" itself — never open with an example from a different concept.`
  } else {
    phaseFrame = PHASE_FRAME[p.state.phase]
  }
  if (ownsPhase) lines.push(`- Teaching phase: ${phaseFrame}`)
  if (ownsMove) lines.push(`- Next move: ${MOVE_LINE[p.nextMove]}`)

  // Bug 2: bare acknowledgements are not evidence of understanding. Require a
  // concrete check question before allowing the phase to advance.
  // The instruction depends on which half of the ladder we are on, because the
  // server's own response to an acknowledgement differs by half (see
  // isDeliveryPhase and advanceConversationState's acknowledgement branch).
  // Issuing the mastery-gate wording during a delivery phase is what produced
  // the observed loop: the phase frame said "show the idea working" while this
  // line said "do not explain further", and a model given two opposite orders
  // resolves them with a content-free holding message — which the learner
  // acknowledges again, forever.
  // PHASE 3: every branch below orders either a QUESTION or the NEXT TEACHING
  // STEP, so the whole clause is Axis-1. When another authority owns the turn's
  // action — a recovery script, a session close — that authority is what says
  // how the acknowledgement is met, and this block must not answer over it.
  // (Suppressing only the ask-branch would leave the else-branch ordering "give
  // them the next piece of teaching" into a close, which is defect D1 again at
  // a smaller scale.)
  if (p.lowSignalAcknowledgement && ownsPhase) {
    if (isDeliveryPhase(p.state.phase)) {
      lines.push('- LEARNER ASKED TO PROCEED: they sent a bare acknowledgement or a request to continue ("Got it", "go", "continue", "ready"). They are telling you they are done with the last step, not that they have proven understanding. Deliver the NEXT step of the lesson now — new content, a demonstration, or a worked step, per the teaching phase above. Do NOT restate, re-summarise, or reword your previous message, and do NOT send another holding line ("let\'s take one small step", "whenever you\'re ready"): they already said they are ready.')
    } else if (p.nextMove === 'ask' && allowsQuestion) {
      lines.push('- LOW-SIGNAL RESPONSE DETECTED: the learner sent a bare social acknowledgement ("Got it", "okay", "I see", etc.). This is NOT evidence of understanding. You MUST ask ONE concrete check question to verify comprehension before doing anything else — do not advance, do not explain further, ask now.')
    } else {
      // Same acknowledgement, same mastery gate — but the server has already
      // decided this turn is a GIVE, so ordering a question here would
      // contradict the move line ("Ask NO questions this turn") and, when a
      // legality block is what removed ASK, the Band-2 line as well.
      //
      // That contradiction is the delivery-half bug at a different rung. The
      // fix above resolved it for OBSERVE/DEMONSTRATE/GUIDE only; at the
      // mastery gates the same two opposite orders survived, and a model given
      // opposite orders resolves them with a content-free holding message —
      // which the learner acknowledges again, forever.
      //
      // The gate is NOT weakened by softening this wording: an acknowledgement
      // is refused mastery credit by advanceConversationState's acknowledgement
      // branch (CHECK/PRACTICE/TRANSFER break without advancing), not by this
      // sentence. Prompt text cannot move the ladder; only evidence can.
      lines.push('- LOW-SIGNAL RESPONSE DETECTED: the learner sent a bare social acknowledgement ("Got it", "okay", "I see", etc.). This is NOT evidence of understanding and it earns no progress at this stage. Questions are not available to you this turn, so do NOT ask one: give them the next piece of teaching instead — react to where they actually are, add something new, or work a step. Do NOT restate or reword your previous message, and do NOT send a holding line ("let\'s take one small step", "whenever you\'re ready").')
    }
  }

  // Bug 3: prevent sequential sub-example jumping before mastery. Stay on the
  // current example until at least one correct signal has been confirmed.
  if ((p.state.phase === 'OBSERVE' || p.state.phase === 'DEMONSTRATE' || p.state.phase === 'GUIDE') && p.state.correctAtCheck === 0) {
    lines.push('- STAY ON CURRENT EXAMPLE: do not introduce a second example, molecule, compound, or entity until the learner answers at least one question about the current one correctly. One confirmed correct signal per sub-example before moving on.')
  }
  lines.push(`- Question stage ceiling: Stage ${PHASE_MAX_QUESTION_STAGE[p.state.phase]} (see QUESTION STAGE POLICY). Never ask above it this turn.`)
  // The ladder now publishes a SELECTION, not only a ceiling — see
  // selectQuestionStage(). Without this the follow-up form was the model's free
  // choice every turn, and it repeated one Stage-4 reasoning probe.
  {
    const stage = allowsQuestion ? selectQuestionStage(p.state, p.nextMove) : null
    if (stage !== null) {
      lines.push(`- Question stage THIS TURN: Stage ${stage}. Ask at this stage, not below it — the ceiling above is the limit, this is the target.`)
    }
  }
  // Bounded release of new material. The budget is per TURN, not per lesson.
  if (typeof p.maxNewTerms === 'number') {
    lines.push(
      `- New-concept budget: at most ${p.maxNewTerms} new concept${p.maxNewTerms === 1 ? '' : 's'}/term${p.maxNewTerms === 1 ? '' : 's'} this turn. ` +
      'Teach it fully rather than listing several. Anything further belongs to a later turn or a later lesson — ' +
      'if the learner asks about one, name it in a clause and move on, do not open it.',
    )
  }
  // B.13-17: context-aware acknowledgement replaces generic openers.
  if (p.acknowledgementContext) {
    const ackLine = buildAcknowledgementInstruction(p.acknowledgementContext)
    if (ackLine) lines.push(ackLine.trim())
  }
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
  // Stated immediately AFTER the length ceiling, deliberately: the ceiling is
  // the only other length instruction in this directive and it points one way.
  // Production showed seven consecutive one-sentence turns because nothing
  // expressed a floor. See teachingGranularity.ts for the evidence.
  if (p.granularity) {
    lines.push(buildGranularityDirective(p.granularity))
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
  // Metacognitive scaffolding — phase-appropriate self-monitoring prompts.
  // CHECK/PRACTICE/TRANSFER are the phases where the learner is doing work
  // that benefits from naming their own strategy. GUIDE gets a lighter
  // version (think-aloud modeling). OBSERVE/DEMONSTRATE are teacher-led and
  // don't interrupt with metacognitive prompts.
  if (p.state.phase === 'GUIDE' && p.nextMove === 'teach') {
    lines.push('- THINK-ALOUD: narrate your reasoning as you work alongside the learner ("I\'m checking whether… because…"). Model the inner monologue so they absorb the strategy, not just the steps.')
  }
  if (p.state.phase === 'PRACTICE' && p.nextMove === 'ask' && p.state.correctAtPractice >= 1) {
    lines.push('- STRATEGY NAMING: the learner has solved at least one practice problem. After grading this one, ask one brief metacognitive question: "What strategy did you use?" or "How would you explain your approach to a friend?" — builds transfer readiness.')
  }
  // Gated on the decided move for the same reason STRATEGY NAMING above is:
  // this line ORDERS a question ("ask them to predict"), so on a give turn it
  // contradicts the move line's "Ask NO questions this turn". TRANSFER decides
  // a non-ask move in roughly half its reachable states (question budget,
  // struggle gates, or a legality block), so the contradiction was not a corner
  // case. Prediction is still ordered on every TRANSFER turn that asks.
  if (p.state.phase === 'TRANSFER' && p.nextMove === 'ask') {
    lines.push('- PREDICT-THEN-CHECK: before the learner computes, ask them to predict the result and say WHY ("What do you expect, and what makes you think so?"). Prediction forces the learner to activate their mental model, not just execute a procedure.')
  }
  // E.33: maintain lesson continuity — after any side question, example
  // request, or tangent, the LLM must return to the lesson's main thread
  // rather than drifting or starting a new topic. Standing rule.
  lines.push('- CONTINUITY: every response must connect back to the concept being taught. After answering a side question or showing an example, explicitly link it back to the main lesson objective before proceeding.')
  // E.35: smooth transitions — when moving between sub-topics or phases,
  // bridge the gap rather than jumping abruptly. Standing rule.
  lines.push('- TRANSITIONS: when shifting focus (new sub-topic, new angle, new phase), use a brief bridging sentence that connects where you were to where you are going. Never start a new section without linking it to the previous one.')
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
