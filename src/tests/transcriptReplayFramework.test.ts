/**
 * Transcript Replay Framework — STEP 3.
 *
 * ── WHY THIS FILE EXISTS SEPARATELY FROM transcriptReplay.test.ts ──────────
 *
 * `src/tests/transcriptReplay.test.ts` already replays three REAL transcripts
 * (A: visualization bypass, B: confusion-detection repetition, C: wrong visual
 * selection) by chaining the same pure functions the runtime uses. That file
 * is the precedent and it stays the home for any transcript whose text we
 * actually have.
 *
 * This file adds the missing half: a REUSABLE HARNESS plus the invariant
 * battery the mission specifies, so that adding a transcript becomes "paste
 * the turns, name the concept" rather than "hand-write twenty assertions".
 *
 * ── THE FOUR NAMED TRANSCRIPTS ARE NOT IN THIS REPOSITORY ─────────────────
 *
 * The mission names four: Physics Quantum Numbers, Chemistry Quantum Numbers,
 * Molecular Orbital Theory, Conservative Forces. Searched: they appear only as
 * KG concept ids, blueprint filenames and brain package files. The
 * conversations themselves — what the learner typed, what the tutor replied,
 * turn by turn — are nowhere in the repo.
 *
 * Per the mission's own Step 3 instruction ("DO NOT fabricate conversations"),
 * they are registered below as PENDING with their required artifact shape and
 * their concept ids, and skipped. A fabricated transcript would pass this
 * battery while proving nothing about the real failures — the purest form of
 * the assumption-driven work Rule #1 forbids.
 *
 * TO ACTIVATE ONE: fill in `turns` and delete `pending: true`. Nothing else.
 *
 * ── WHAT THE BATTERY PROVES ───────────────────────────────────────────────
 *
 * Every invariant below is checked against the SAME pure functions the route
 * calls, in the same order, so a pass means those exact turn sequences cannot
 * reproduce the failure. The battery is also exercised NOW, against a
 * synthetic control sequence that is explicitly labelled as a control and is
 * NOT presented as any real transcript — it proves the harness itself works.
 */
import { describe, it, expect } from 'vitest'
import {
  initialConversationState, advanceConversationState, decideNextMoveDetailed,
  repliesWithQuestion, isPriorKnowledgeProbe, isLowSignalAcknowledgement,
  type ConversationState, type TeachingPhase,
} from '@/lib/teaching/conversationState'
import { detectFailureState, isDontKnowSignal, buildRecoveryBlock } from '@/lib/teaching/recoveryGuard'
import { masteryVerified, detectLearnerRequest } from '@/lib/teaching/masteryGate'
import {
  buildTurnRecord, appendTurn, initialTurnHistory,
  detectExactDuplicate, detectNearDuplicate, detectPhaseOscillation,
  normalizeForComparison, DEFAULT_SIMILARITY_THRESHOLD,
} from '@/lib/kernel/verifier/history'
import {
  foldProgressionMetrics, initialProgressionMetrics, needsSignalRepair,
  type ProgressionMetrics,
} from '@/lib/teaching/progressionIntegrity'

// ── Harness types ─────────────────────────────────────────────────────────

export interface ReplayTurn {
  /** Verbatim learner message. */
  learner: string
  /** Verbatim tutor reply, SIGNAL tag stripped. */
  tutor: string
  /** Did the tutor's reply carry a SIGNAL tag, and what did it say?
   *  `undefined` = the model emitted none (the RC-D case). */
  signalCorrect?: boolean
}

export interface ReplayTranscript {
  name: string
  conceptId: string
  /** True while the real conversation text is unavailable. Skipped, never faked. */
  pending?: boolean
  /** What we need in order to activate it. */
  requiredArtifact?: string
  turns: ReplayTurn[]
}

export interface ReplayOutcome {
  finalState: ConversationState
  metrics: ProgressionMetrics
  phases: TeachingPhase[]
  /** Turn indices where the tutor text duplicated a recent turn. */
  duplicateTurnIndices: number[]
  /** Turn indices where the tutor asked a near-identical question. */
  duplicateQuestionIndices: number[]
  /** Turn indices where an A→B→A→B phase oscillation was detected. */
  oscillationIndices: number[]
  /** Turn indices where recovery fired. */
  recoveryIndices: number[]
  /** Turn indices where the runtime would have injected the freeze-breaker. */
  signalRepairIndices: number[]
  /** The failure state detected per turn — null where none fired. Recorded
   *  because WHICH state fired selects the recovery script and the
   *  dont-know-signal membership, so "recovery fired" alone under-specifies
   *  the turn. */
  recoveryKeys: Array<string | null>
  /** The server-decided move per turn. Previously computed and thrown away,
   *  which left the move/legality layer — where the CHECK-absorbing and
   *  directive-conflict defects both lived — unverifiable by this battery
   *  despite the file claiming otherwise. */
  moves: Array<'teach' | 'show' | 'ask'>
  /** Why ASK was removed, per turn (null when it was legal). */
  blockedReasons: Array<string | null>
}

/**
 * Drive one transcript through the real decision/fold functions.
 *
 * Deliberately does NOT call an LLM and does NOT re-derive tutor text: the
 * tutor's words are an INPUT here (that is what makes it a replay rather than
 * a simulation). What is computed is everything the runtime computes ABOUT
 * those turns — classification, legality, the ladder fold, history-based
 * duplicate detection, and progression telemetry.
 */
export function replay(t: ReplayTranscript): ReplayOutcome {
  let state = initialConversationState(t.conceptId)
  let metrics = initialProgressionMetrics()
  let history = initialTurnHistory()

  const phases: TeachingPhase[] = [state.phase]
  const out: ReplayOutcome = {
    finalState: state, metrics, phases,
    duplicateTurnIndices: [], duplicateQuestionIndices: [],
    oscillationIndices: [], recoveryIndices: [], signalRepairIndices: [],
    recoveryKeys: [], moves: [], blockedReasons: [],
  }

  // route.ts reads the learner's immediately preceding message off the session
  // (newest-first, fetched before this turn's insert) and passes it to
  // detectFailureState. A replay that does not thread it through is running a
  // strictly weaker detector than the runtime — see the drift guard below.
  let priorLearnerMessage: string | null = null

  t.turns.forEach((turn, i) => {
    // 1. Would the runtime inject the freeze-breaker before this turn?
    if (needsSignalRepair(metrics)) out.signalRepairIndices.push(i)

    // 2. Classification — the same detectors the route runs, same order, with
    //    the same arguments. The prior message is what enables the
    //    repeated-identical-answer rung, which returns 'frustrated' where the
    //    one-argument form returns 'dont_know'/'confused'/null.
    const recoveryKey = detectFailureState(turn.learner, priorLearnerMessage)
    out.recoveryKeys.push(recoveryKey)
    if (recoveryKey) out.recoveryIndices.push(i)
    const learnerRequest = detectLearnerRequest(turn.learner)

    // 3. Server decision for this turn. CAPTURED, not discarded.
    //
    //    One deliberate difference from route.ts, stated rather than hidden:
    //    `legality` is omitted because a transcript carries no prior-knowledge
    //    or capability evidence. Per questionLegality's contract, omitting it
    //    is the CONSERVATIVE reading — it can only ever remove ASK, never add
    //    it — so a replay can under-report a legal question but can never
    //    invent one the runtime would have blocked.
    const decision = decideNextMoveDetailed(state, {
      recoveryTurn: recoveryKey !== null,
      workedExampleFirst: false,
    })
    out.moves.push(decision.move)
    out.blockedReasons.push(decision.blockedReason)

    // 4. Duplicate / oscillation detection against real turn history.
    const normalized = normalizeForComparison(turn.tutor)
    const tokens = new Set(normalized.split(' ').filter(Boolean))
    const askedQuestion = repliesWithQuestion(turn.tutor)
    if (detectExactDuplicate(normalized, history).isDuplicate) out.duplicateTurnIndices.push(i)
    if (askedQuestion && detectNearDuplicate(tokens, history, DEFAULT_SIMILARITY_THRESHOLD).isNearDuplicate) {
      out.duplicateQuestionIndices.push(i)
    }

    // 5. Fold the ladder with this turn's evidence.
    const before = state
    // isLowSignalAcknowledgement, not isBareAcknowledgement: route.ts uses the
    // former as the SINGLE OWNER of "is this a bare acknowledgement" — for the
    // `acknowledgement` evidence field and for the turn directive's LOW-SIGNAL
    // line alike. The two predicates genuinely disagree (isBareAcknowledgement
    // does not recognise the forward tokens "ready" / "let's go" / "keep
    // going" / "carry on" / "proceed"), so a replay using the other one
    // classifies real learner turns differently from the runtime.
    const bareAck = isLowSignalAcknowledgement(turn.learner)
    const effectiveSignal = bareAck ? null : (turn.signalCorrect ?? null)
    state = advanceConversationState(state, {
      askedQuestion,
      signalCorrect: effectiveSignal,
      recoveryFired: recoveryKey !== null,
      learnerRequest,
      isPriorKnowledgeProbe: isPriorKnowledgeProbe(turn.tutor),
      dontKnowSignal: isDontKnowSignal(recoveryKey),
      learnerIssuedDirective: recoveryKey === 'too_many_questions',
      // The field whose absence froze this harness's ladder. A delivery turn
      // asks nothing, so it emits no SIGNAL, so an acknowledgement is the ONLY
      // evidence such a turn can produce. Without it the replay reproduced the
      // pre-2026-07-30 runtime — OBSERVE forever under an acknowledging
      // learner — while the shipping runtime climbs to CHECK.
      acknowledgement: bareAck,
      // Computable only once the decided move is captured (step 3), which is
      // why it was absent before. Same expression route.ts uses: the server
      // said ASK and the rendered reply carried no question.
      parityViolation: decision.move === 'ask' && !askedQuestion,
    })
    phases.push(state.phase)

    if (detectPhaseOscillation(state.phase, history).isOscillating) out.oscillationIndices.push(i)

    // 6. Telemetry fold, with the same facts the route derives.
    metrics = foldProgressionMetrics(metrics, {
      answerWasExpected: before.questionsAskedSinceTeach > 0,
      learnerReplySubstantive: turn.learner.trim().length > 0 && !bareAck && recoveryKey === null,
      signalPresent: turn.signalCorrect !== undefined,
      phaseBefore: before.phase,
      phaseAfter: state.phase,
      conceptBefore: before.conceptId,
      conceptAfter: state.conceptId,
      evidenceBefore: {
        correctAtCheck: before.correctAtCheck,
        correctAtPractice: before.correctAtPractice,
      },
      recoveryFired: recoveryKey !== null,
      duplicateDetected: out.duplicateTurnIndices.includes(i),
      masteryVerifiedNow: masteryVerified(state),
    })

    history = appendTurn(history, buildTurnRecord(turn.tutor, {
      askedQuestion, recoveryKey, phaseAfter: state.phase,
    }))
    priorLearnerMessage = turn.learner
  })

  out.finalState = state
  out.metrics = metrics
  return out
}

/** The mission's invariant battery. Applied to every activated transcript. */
export function assertNoStallClass(o: ReplayOutcome): void {
  // ✓ no repeated prompts / no duplicate explanations
  expect(o.duplicateTurnIndices).toEqual([])
  // ✓ no repeated identical questions / no duplicate assessments
  expect(o.duplicateQuestionIndices).toEqual([])
  // ✓ no state oscillation
  expect(o.oscillationIndices).toEqual([])
  // ✓ no silent stall: some phase movement occurred
  expect(o.metrics.longestStall).toBeLessThan(o.metrics.turns)
  // ✓ no mastery evidence was ever discarded by a concept flap (RC-A)
  expect(o.metrics.masteryEvidenceDiscarded).toBe(0)
  // ✓ recovery terminates — never every turn from some point onward
  const turns = o.metrics.turns
  expect(o.recoveryIndices.length).toBeLessThan(turns)
}

// ── The four named transcripts — PENDING, awaiting real artifacts ─────────

const REQUIRED_ARTIFACT =
  'Verbatim turn list (learner message + tutor reply, in order). Optional but ' +
  'valuable: whether each tutor reply carried a SIGNAL tag. Paste into `turns` ' +
  'and remove `pending: true`.'

export const PENDING_TRANSCRIPTS: ReplayTranscript[] = [
  { name: 'Physics Quantum Numbers',   conceptId: 'phys.qm.quantum-numbers', pending: true, requiredArtifact: REQUIRED_ARTIFACT, turns: [] },
  { name: 'Chemistry Quantum Numbers', conceptId: 'chem.atomic.quantum-numbers', pending: true, requiredArtifact: REQUIRED_ARTIFACT, turns: [] },
  { name: 'Molecular Orbital Theory',  conceptId: 'chem.bond.molecular-orbital-theory', pending: true, requiredArtifact: REQUIRED_ARTIFACT, turns: [] },
  { name: 'Conservative Forces',       conceptId: 'phys.mech.conservative-forces', pending: true, requiredArtifact: REQUIRED_ARTIFACT, turns: [] },
]

describe('STEP 3 — transcript replay registry', () => {
  it('registers all four named transcripts so none is silently forgotten', () => {
    expect(PENDING_TRANSCRIPTS.map((t) => t.name)).toEqual([
      'Physics Quantum Numbers',
      'Chemistry Quantum Numbers',
      'Molecular Orbital Theory',
      'Conservative Forces',
    ])
  })

  it('every pending transcript states exactly what artifact it needs', () => {
    for (const t of PENDING_TRANSCRIPTS) {
      if (!t.pending) continue
      expect(t.requiredArtifact).toBeTruthy()
      expect(t.turns).toEqual([]) // nothing fabricated
    }
  })

  for (const t of PENDING_TRANSCRIPTS) {
    const runner = t.pending ? it.skip : it
    runner(`${t.name} — passes the no-stall invariant battery`, () => {
      assertNoStallClass(replay(t))
    })
  }
})

// ── Harness self-test (CONTROL sequence — not a real transcript) ──────────

describe('STEP 3 — harness self-test on a labelled control sequence', () => {
  /** NOT a transcript. A minimal synthetic sequence whose only purpose is to
   *  prove the harness computes what it claims. Explicitly not attributed to
   *  any real conversation. */
  const CONTROL: ReplayTranscript = {
    name: 'CONTROL (synthetic, not a transcript)',
    conceptId: 'phys.mech.newtons-first-law',
    turns: [
      { learner: 'ok',                          tutor: 'Watch what happens when I stop pushing the block.' },
      { learner: 'it keeps sliding',            tutor: 'Right. Now here is a second case, on ice.', signalCorrect: true },
      { learner: 'it slides further',           tutor: 'Exactly — less friction, further slide.', signalCorrect: true },
      { learner: 'because friction is smaller', tutor: 'Good. Your turn: what happens with no friction at all?', signalCorrect: true },
      { learner: 'it never stops',              tutor: 'That is the law. You have it.', signalCorrect: true },
    ],
  }

  const outcome = replay(CONTROL)

  it('advances the ladder rather than holding', () => {
    expect(outcome.finalState.phase).not.toBe('OBSERVE')
    expect(outcome.metrics.turns).toBe(5)
  })

  it('detects no duplicates or oscillation in a healthy sequence', () => {
    expect(outcome.duplicateTurnIndices).toEqual([])
    expect(outcome.duplicateQuestionIndices).toEqual([])
    expect(outcome.oscillationIndices).toEqual([])
  })

  it('passes the invariant battery (proves the battery is satisfiable)', () => {
    assertNoStallClass(outcome)
  })

  it('detects a duplicated tutor turn when one is present', () => {
    const dup: ReplayTranscript = {
      name: 'CONTROL-dup', conceptId: 'c',
      turns: [
        { learner: 'hi',   tutor: 'Here is the idea, stated plainly and clearly.' },
        { learner: 'ok',   tutor: 'Here is the idea, stated plainly and clearly.' },
      ],
    }
    expect(replay(dup).duplicateTurnIndices).toEqual([1])
  })

  it('flags the freeze-breaker turn when a signal is dropped on an answered question', () => {
    const dropped: ReplayTranscript = {
      name: 'CONTROL-dropped', conceptId: 'c',
      turns: [
        // tutor asks; learner answers substantively; NO signalCorrect → dropped
        { learner: 'ready',                     tutor: 'What do you notice about the block?' },
        { learner: 'it slows down over time',   tutor: 'Interesting.' },
        { learner: 'because of friction',       tutor: 'Say more.' },
      ],
    }
    const o = replay(dropped)
    expect(o.metrics.missingSignalOnAnsweredTurn).toBeGreaterThan(0)
    // The runtime would repair rather than wait for a second dropped turn.
    expect(o.signalRepairIndices.length).toBeGreaterThan(0)
  })
})
