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
  /** Phase is per-concept: a concept change resets the machine. */
  conceptId: string | null
  /** Phase E counters (ask/teach budget). */
  questionsAskedSinceTeach: number
  teachSegmentsSinceQuestion: number
  consecutiveFailures: number
  /** Evidence gates. */
  demonstrated: boolean
  correctAtCheck: number
  correctAtPractice: number
  /** Student-state counters (mastery-gate work, Bug 11). All persisted
   * per-concept and restored via readConversationState's spread-over-
   * defaults, so pre-existing snapshots without them stay valid. */
  remediationCount: number
  diagramRequests: number
  exampleRequests: number
  /** Stance Enforcement (Claude Recommendation #6): was a misconception
   * detected on this concept at any point in the current lesson? Monotonic
   * within one concept's lifetime (resets only when the concept changes,
   * same as every other counter here) — feeds stanceEnforcement.ts's
   * "misconception cannot be marked resolved without evidence" check. */
  misconceptionDetectedThisLesson: boolean
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
  /** The assistant's (clean) reply contained at least one question. */
  askedQuestion: boolean
  /** Parsed SIGNAL correctness for the learner's answer; null = no signal. */
  signalCorrect: boolean | null
  /** A recovery utterance fired this turn (failure by statement). */
  recoveryFired: boolean
  /** Deterministic learner request detected this turn (masteryGate.ts):
   * 'explain_differently' counts as remediation (confidence down, phase
   * re-shows); 'diagram'/'real_life_example' update the student-state
   * counters. Optional so pre-existing call sites stay valid. */
  learnerRequest?: 'diagram' | 'real_life_example' | 'explain_differently' | null
  /** Stance Enforcement (Claude Recommendation #6): did this turn's parsed
   * SIGNAL carry a misconception phrase (teachingSignal?.phrase present)?
   * Optional so pre-existing call sites stay valid; undefined behaves as
   * false (no misconception signal this turn). */
  misconceptionDetected?: boolean
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
  }

  // Bug 5/6/11 — student-state counters for explicit action requests.
  if (evidence.learnerRequest === 'diagram') next.diagramRequests = prev.diagramRequests + 1
  if (evidence.learnerRequest === 'real_life_example') next.exampleRequests = prev.exampleRequests + 1

  // Bug 7 — "explain differently" / "I don't understand" is remediation:
  // confidence drops (consecutiveFailures++), remediation is counted, and
  // the phase re-shows (down one, floor DEMONSTRATE) instead of advancing.
  // A stray SIGNAL on such a turn can never advance the ladder.
  if (evidence.learnerRequest === 'explain_differently') {
    next.remediationCount = prev.remediationCount + 1
    next.consecutiveFailures = prev.consecutiveFailures + 1
    next.phase = phaseDown(prev.phase, next.demonstrated)
    return next
  }

  const failed = evidence.recoveryFired || evidence.signalCorrect === false
  const succeeded = evidence.signalCorrect === true && !evidence.recoveryFired

  if (failed) {
    next.consecutiveFailures = prev.consecutiveFailures + 1
    next.phase = phaseDown(prev.phase, next.demonstrated)
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
}

/**
 * The server's decision on what KIND of turn the next response is.
 * Deterministic replacement for "the LLM decides whether to quiz".
 */
export function decideNextMove(state: ConversationState, ctx: NextMoveContext): NextMove {
  // Recovery preempts — the recovery script already forbids questions.
  if (ctx.recoveryTurn) return 'teach'
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

const AUTONOMY_RE = /\b(next\s+topic|next\s+lesson|move\s+on|skip\s+this|let'?s?\s+continue|let'?s?\s+move\s+on|can\s+we\s+move\s+on|ready\s+to\s+move\s+on)\b/i

/** The learner explicitly asked to advance — server-detected, honored. */
export function detectAutonomyRequest(message: string): boolean {
  return AUTONOMY_RE.test(message)
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
}

const PHASE_FRAME: Record<TeachingPhase, string> = {
  OBSERVE:     'OBSERVE — anchor attention on something concrete the learner can notice. No teaching payload yet, no vocabulary, nothing to memorise.',
  DEMONSTRATE: 'DEMONSTRATE — show the idea working (worked example, demonstration, concrete walkthrough). Explain after showing, never instead of showing.',
  GUIDE:       'GUIDE — do it WITH the learner: supported steps, you carry most of the weight, fade support gradually.',
  CHECK:       'CHECK — verify the basic idea landed with ONE small check at or below the stage ceiling. React to the answer contentfully.',
  PRACTICE:    'PRACTICE — the learner works; you watch and react. One problem at a time. Calculation questions are now allowed.',
  TRANSFER:    'TRANSFER — apply the idea in a genuinely new context. Stretch, but stay warm.',
}

const MOVE_LINE: Record<NextMove, string> = {
  teach: 'TEACH — explain or advance the idea. Ask NO questions this turn; end with an invitation, not a question mark.',
  show:  'SHOW — open with a short worked example or demonstration BEFORE anything else. Ask NO questions this turn.',
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
  lines.push(`- Teaching phase: ${PHASE_FRAME[p.state.phase]}`)
  lines.push(`- Next move: ${MOVE_LINE[p.nextMove]}`)
  lines.push(`- Question stage ceiling: Stage ${PHASE_MAX_QUESTION_STAGE[p.state.phase]} (see QUESTION STAGE POLICY). Never ask above it this turn.`)
  if (p.maxParagraphs !== null) {
    lines.push(`- Length budget: at most ${p.maxParagraphs} short paragraphs. If the learner is struggling, shorter is better — never longer.`)
  }
  if (p.nextMove === 'show' && p.workedExampleFirst) {
    lines.push('- Demonstrate first: this learner needs to SEE it work before being asked anything (worked-example-first is in force).')
  }
  if (p.visualType) {
    lines.push(`- Visual-first: a ${p.visualType.replace(/_/g, ' ')} teaches this faster than prose — lead with it (emit the VISUAL tag) and keep the text around it minimal.`)
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
