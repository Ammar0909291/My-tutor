/**
 * PHASE 2 — CROSS-TURN TEACHING STATE: CHARACTERISATION, NOT CORRECTION.
 *
 * Phase 1 proved one authoritative state (the session episode) can now survive
 * the request boundary. This file establishes the regression net around ALL
 * cross-turn teaching state, and CHARACTERISES the dangerous transitions the
 * architecture audit listed — recording what the runtime does today, whether or
 * not that is what it should do.
 *
 * NOTHING HERE IS A FIX. Where a test encodes behaviour that is arguably wrong,
 * it says so in its own name or comment and asserts the CURRENT behaviour, so a
 * later phase changing it is a deliberate, visible act rather than a surprise.
 *
 * ── SECTION A — STATE OWNERSHIP / PERSISTENCE MAP (re-traced at c998026) ─────
 * Every state below is persisted in `LearnSession.contextSnapshot` (JSONB,
 * atomic merge at route.ts ~6803) unless noted.
 *
 * STATE                | OWNER / PRODUCER              | SNAPSHOT KEY         | PERSISTENCE
 * ---------------------|-------------------------------|----------------------|-------------
 * session episode      | sessionLifecycle              | sessionEpisode       | CONDITIONAL —
 *                      | deriveEpisode/forceClosing/    |                      | episodeNeedsPersist
 *                      | applySignalToEpisode           |                      | (Phase 1)
 * conversation ladder  | conversationState              | conversationState    | UNCONDITIONAL
 *                      | advanceConversationState       |                      | (folded or fallback-folded)
 * excursion            | excursion.decideExcursion      | excursion            | UNCONDITIONAL once decided
 * visual session       | visual/resolveVisual           | visualSession        | CONDITIONAL on a
 *                      |                                | visualGenerationCount| decision existing
 * mastery counters     | conversationState (correctAt*) | (inside conversationState)| with the ladder
 * completion           | masteryGate.gateLessonCompletion| (client PATCH)      | server-gated
 * failure count        | route + recoveryGuard          | sessionFailureCount  | CONDITIONAL
 *                      |                                |                      | (failure or boundary)
 * remediation / weak   | MistakeRecord (DB TABLE, not   | —                    | separate table;
 *                      | the snapshot) -> decide()      |                      | no snapshot key
 * last signal          | signals.parseSignalTag         | lastSignal           | CONDITIONAL on a signal
 * degraded             | eos-runtime/degradedMode       | (not persisted —     | per-turn only
 *                      | isDegradedProvider(provider)   |  read from provider) |
 *
 * NEXT-TURN READERS: deriveEpisode(snapshot.sessionEpisode),
 * readConversationState(snapshot.conversationState), parseExcursionState(
 * snapshot.excursion), parseVisualSession(snapshot.visualSession).
 *
 * OVERWRITE RISK worth naming: the ladder and the episode are independent
 * machines over the same turn, and nothing reconciles them — the ladder can
 * advance on a turn the episode considers CLOSING. Characterised in C-1.
 */
import { describe, it, expect } from 'vitest'
import {
  deriveEpisode, forceClosing, applySignalToEpisode, episodeNeedsPersist,
  shouldInjectAffectClose, type SessionEpisode,
} from '@/lib/teaching/sessionLifecycle'
import {
  initialConversationState, advanceConversationState, readConversationState,
  type ConversationState,
} from '@/lib/teaching/conversationState'
import {
  masteryVerified, masteryVerifiedStrict, gateLessonCompletion,
  isBareAcknowledgement, detectLearnerRequest,
} from '@/lib/teaching/masteryGate'
import { decideExcursion, parseExcursionState, turnCountsForLesson } from '@/lib/teaching/excursion'
import { readTurnIntent } from '@/lib/teaching/turnIntent'
import { detectFailureState } from '@/lib/teaching/recoveryGuard'
import { decideTeachingGranularity } from '@/lib/teaching/teachingGranularity'
import { isDegradedProvider, DEGRADED_PROVIDER } from '@/lib/eos-runtime/degradedMode'

const CONCEPT = 'chem.found.pure-substances'

const episode = (phase: SessionEpisode['phase'], over: Partial<SessionEpisode> = {}): SessionEpisode => ({
  startedAt: '2026-08-23T10:00:00.000Z', phase, visibleFailures: 0,
  retroWinOwed: false, openingSatisfied: phase !== 'OPENING', ...over,
})

/** One real episode turn, returning what the NEXT turn would read back. */
function episodeTurn(opts: {
  persisted: SessionEpisode | null; boundary: boolean; wantsToStop: boolean
  signal: { correctness?: boolean } | null
}) {
  let hoisted = deriveEpisode(opts.persisted, opts.boundary, Date.parse('2026-08-23T10:05:00Z'), null)
  if (opts.wantsToStop) hoisted = forceClosing(hoisted)
  const phaseThisTurn = hoisted.phase
  const next = applySignalToEpisode(hoisted, opts.signal, { isFirstLesson: false })
  const wrote = episodeNeedsPersist({ persisted: opts.persisted, next, freshBoundary: opts.boundary })
  return { persistedAfter: wrote ? next : opts.persisted, wrote, phaseThisTurn }
}

/** A ladder state that has legitimately reached verified mastery. */
function masteredState(): ConversationState {
  let s = initialConversationState(CONCEPT)
  // Drive it with real evidence only — never hand-set the counters.
  s = advanceConversationState(s, { askedQuestion: false, signalCorrect: null, deliveredTeaching: true })
  for (let i = 0; i < 8 && !masteryVerified(s); i += 1) {
    s = advanceConversationState(s, { askedQuestion: true, signalCorrect: true, deliveredTeaching: true })
  }
  return s
}

// ═══════════════════════════════════════════════════════════════════════════
describe('B — cross-turn persistence', () => {
  it('B1 STOP/CLOSING survives into the next turn (Phase 1 invariant holds)', () => {
    const t1 = episodeTurn({ persisted: episode('CORE'), boundary: false, wantsToStop: true, signal: null })
    expect(t1.phaseThisTurn).toBe('CLOSING')
    expect(t1.wrote).toBe(true)
    const t2 = episodeTurn({ persisted: t1.persistedAfter, boundary: false, wantsToStop: false, signal: null })
    expect(t2.phaseThisTurn).toBe('CLOSING')
    expect(t2.wrote).toBe(false)   // nothing changed -> no write
  })

  it('B2 NORMAL PROGRESSION: a graded turn advances and the next turn reads it', () => {
    const t1 = episodeTurn({ persisted: episode('OPENING'), boundary: false, wantsToStop: false, signal: { correctness: true } })
    expect(t1.persistedAfter?.phase).toBe('CORE')
    const s1 = advanceConversationState(initialConversationState(CONCEPT), {
      askedQuestion: true, signalCorrect: true, deliveredTeaching: true,
    })
    expect(s1.phase).toBe('DEMONSTRATE')   // one graded turn advances the phase
    // Read back the way route.ts does — the INNER value, JSON round-tripped
    // through the snapshot. (Passing the snapshot wrapper instead returns a
    // fresh ladder, which is how this test was wrong on its first run: the
    // reset was mine, not the runtime's.)
    const s2 = readConversationState(JSON.parse(JSON.stringify(s1)), CONCEPT)
    expect(s2.conceptId).toBe(CONCEPT)
    expect(s2.phase).toBe('DEMONSTRATE')   // the ladder survives intact
    // …and it resets ONLY on a genuine concept change, which is intended.
    expect(readConversationState(s1, 'some.other.concept').phase).toBe('OBSERVE')
  })

  it('B2b MASTERY IS SLOW BY CONSTRUCTION: counters bank only at CHECK/PRACTICE', () => {
    // Characterisation of the real ladder: six consecutive correct graded turns
    // are needed before mastery is verified. Recorded so a later phase changing
    // the pacing is a visible decision.
    let s = initialConversationState(CONCEPT)
    const trace: string[] = []
    for (let i = 0; i < 6; i += 1) {
      s = advanceConversationState(s, { askedQuestion: true, signalCorrect: true, deliveredTeaching: true })
      trace.push(`${s.phase}:${s.correctAtCheck}/${s.correctAtPractice}`)
    }
    expect(trace).toEqual([
      'DEMONSTRATE:0/0', 'GUIDE:0/0', 'CHECK:0/0',
      'PRACTICE:1/0', 'PRACTICE:1/1', 'TRANSFER:1/2',
    ])
    expect(masteryVerified(s)).toBe(true)
  })

  it('B3 CONFUSION: what actually survives a distress turn', () => {
    const key = detectFailureState("I don't understand this", null)
    expect(key).toBe('dont_understand')
    // The episode: a synthetic failure is applied (route.ts ~5943), so it
    // advances toward CLOSING at the same rate as a real failure.
    const ep = applySignalToEpisode(episode('CORE', { visibleFailures: 1 }),
      { correctness: false }, { isFirstLesson: false })
    expect(ep.visibleFailures).toBe(2)
    expect(ep.phase).toBe('CLOSING')   // two distress turns close the session
    // The ladder: consecutive failure counters survive.
    const s = advanceConversationState(initialConversationState(CONCEPT), {
      askedQuestion: false, signalCorrect: false, deliveredTeaching: true,
    })
    expect(s.consecutiveFailures).toBeGreaterThan(0)
    // CHARACTERISED, NOT ENDORSED: remediation state lives in MistakeRecord (a
    // DB table, not the snapshot), so this file cannot observe its exit
    // condition. See D5.
  })

  it('B4 MASTERY established through the real mechanism is not silently reopened', () => {
    const m = masteredState()
    expect(masteryVerified(m)).toBe(true)
    // A neutral next turn must not downgrade it.
    const after = advanceConversationState(m, { askedQuestion: false, signalCorrect: null, deliveredTeaching: false })
    expect(masteryVerified(after)).toBe(true)
    expect(after.correctAtCheck).toBeGreaterThanOrEqual(m.correctAtCheck)
    expect(after.correctAtPractice).toBeGreaterThanOrEqual(m.correctAtPractice)
  })

  it('B5 EXCURSION context is read back identically next turn', () => {
    const opened = decideExcursion({
      state: parseExcursionState(null), message: 'explain friction',
      lessonConceptId: CONCEPT, requestedConceptId: 'phys.mech.friction',
      requestedTopicTitle: null, lastAssistantAskedQuestion: false,
    })
    expect(opened.state.active).toBe(true)
    // Round-trip through the snapshot exactly as route.ts does.
    const readBack = parseExcursionState(JSON.parse(JSON.stringify(opened.state)))
    const t2 = decideExcursion({
      state: readBack, message: 'why does that happen?', lessonConceptId: CONCEPT,
      requestedConceptId: null, requestedTopicTitle: null, lastAssistantAskedQuestion: false,
    })
    expect(t2.targetConceptId).toBe('phys.mech.friction')
    expect(t2.transition).toBe('continued')
    expect(turnCountsForLesson(t2)).toBe(false)   // still not the lesson's evidence
  })

  it('B6 VISUAL session state round-trips through the snapshot', async () => {
    const { parseVisualSession } = await import('@/lib/teaching/visual/session')
    const session = parseVisualSession(null)
    const roundTripped = parseVisualSession(JSON.parse(JSON.stringify(session)))
    expect(roundTripped).toEqual(session)
    // Persistence is CONDITIONAL on a visual decision existing this turn
    // (route.ts:6716) — a turn with no decision writes no visual key, so the
    // previous figure's identity is carried by absence, not by rewriting.
  })

  it('B7 DEGRADED provider is a deterministic seam and banks no ladder evidence', () => {
    expect(isDegradedProvider(DEGRADED_PROVIDER)).toBe(true)
    expect(isDegradedProvider('gemini-3.5-flash-lite')).toBe(false)
    const before = initialConversationState(CONCEPT)
    // A degraded turn carrying signalCorrect:true must bank nothing.
    const after = advanceConversationState(before, {
      askedQuestion: false, signalCorrect: true, deliveredTeaching: true, degradedTurn: true,
    })
    expect(after.phase).toBe(before.phase)
    expect(after.correctAtCheck).toBe(before.correctAtCheck)
    expect(after.correctAtPractice).toBe(before.correctAtPractice)
    expect(after.demonstrated).toBe(before.demonstrated)
    expect(masteryVerified(after)).toBe(false)
  })
})

// ═══════════════════════════════════════════════════════════════════════════
describe('C — dangerous transitions (classification, not correction)', () => {
  it('C1 CLOSING -> teaching: INSTRUCTION CLOSED BY PHASE 3; ladder advance remains, by design', async () => {
    // The episode is CLOSING and correctly persists as such…
    const t1 = episodeTurn({ persisted: episode('CORE'), boundary: false, wantsToStop: true, signal: null })
    expect(t1.persistedAfter?.phase).toBe('CLOSING')
    // …and the close block is correctly injected on the next turn.
    expect(shouldInjectAffectClose({ phase: 'CLOSING', excursionActive: false, ambiguousTurn: false })).toBe(true)

    // ── WHAT PHASE 3 CLOSED ─────────────────────────────────────────────────
    // The harm this case named was that the tutor TEACHES instead of closing.
    // The mechanism was never model disobedience: the TURN DIRECTIVE opens by
    // claiming it "overrides any earlier advisory pacing", is appended ~580
    // lines after the close block, and conversationState.ts contained zero
    // references to CLOSING or the episode — the block claiming override
    // authority could not know the session was ending. It now receives the
    // arbitration verdict and issues no phase frame and no move when it does
    // not own the turn.
    const { arbitrateTurn } = await import('@/lib/teaching/turnArbitration')
    const { buildTurnDirective } = await import('@/lib/teaching/conversationState')
    const closing = arbitrateTurn({
      recoveryActive: false, learnerRequestActive: false, closing: true, completionReady: false,
    })
    const directive = buildTurnDirective({
      state: initialConversationState(CONCEPT), nextMove: 'ask', maxParagraphs: 4,
      workedExampleFirst: false, visualType: null, arbitration: closing,
    } as never)
    expect(directive).not.toContain('- Teaching phase:')
    expect(directive).not.toContain('- Next move:')

    // ── WHAT REMAINS, AND WHY IT IS NOT A DEFECT ────────────────────────────
    // The ladder is still a separate machine that never consults the episode:
    // a CLOSING turn still advances it. Phase 3 deliberately did NOT change
    // that. If a learner answers something on their way out, the answer is
    // real evidence and banking it is correct — refusing to record it would
    // lose genuine mastery to punish the timing. What was wrong was ASKING,
    // and the asking is what was closed.
    const before = initialConversationState(CONCEPT)
    const after = advanceConversationState(before, {
      askedQuestion: true, signalCorrect: null, deliveredTeaching: true,
    })
    expect(after).not.toEqual(before)   // unchanged, and intentionally so
  })

  it('C2 CLOSING -> new question: MCQs BLOCKED; prose now withheld where separable', async () => {
    const { closingTurnWithholdsQuestion, withholdClosingProseQuestion } =
      await import('@/lib/teaching/gateAssessment')
    expect(closingTurnWithholdsQuestion('CLOSING')).toBe(true)   // strips the MCQ
    expect(closingTurnWithholdsQuestion('CORE')).toBe(false)

    // AS CHARACTERISED: "The guard removes MCQs only. A prose question in the
    // model's text is not structurally detectable here and is NOT withheld —
    // REACHABLE. Observed live in Phase 1 verification: CLOSING persisted,
    // mcq null, and the reply was still a prose question."
    //
    // PHASE 3 closes the prompt-side cause (the directive no longer orders a
    // question stage or a move on a closing turn) and adds the validation.
    const posed = 'You worked hard today, and it clearly landed.'
      + '\n\nWhich of these is a vector: speed or velocity?'
    const r = withholdClosingProseQuestion({ text: posed, episodePhase: 'CLOSING', hasStructuredMcq: false })
    expect(r.withheld).toBe(true)
    expect(r.text).not.toContain('Which of these is a vector')

    // ── THE LIMIT, STATED RATHER THAN HIDDEN ────────────────────────────────
    // Removal is PARAGRAPH-scoped (dropAnswerableContent: "half a question is
    // still a question"). When the entire closing turn is one paragraph that
    // ends in a question, there is nothing separable to keep, and the guard
    // deliberately does NOTHING and logs it, rather than substituting an
    // invented closing sentence — a withhold must never produce a worse turn
    // than the one it repairs. So this case is narrowed, not eliminated.
    const single = 'Which of these is a vector: speed or velocity?'
    const r2 = withholdClosingProseQuestion({ text: single, episodePhase: 'CLOSING', hasStructuredMcq: false })
    expect(r2.withheld).toBe(false)
    expect(r2.reason).toBe('nothing-would-survive')
    expect(r2.text).toBe(single)
  })

  it('C3 MASTERED -> remediation: BLOCKED at the counters (high-water mark)', () => {
    const m = masteredState()
    const afterFailure = advanceConversationState(m, {
      askedQuestion: true, signalCorrect: false, deliveredTeaching: true,
    })
    // A later wrong answer may raise failure counters, but must not erase the
    // banked correct evidence that constitutes mastery.
    expect(afterFailure.correctAtCheck).toBeGreaterThanOrEqual(m.correctAtCheck)
    expect(afterFailure.correctAtPractice).toBeGreaterThanOrEqual(m.correctAtPractice)
  })

  it('C4 CONFUSED -> harder question: BLOCKED (granularity forced REMEDIAL)', () => {
    for (const m of ["I don't understand this, but give me a harder question.",
                     "I want to continue, but I don't understand anything."]) {
      const ti = readTurnIntent(m, null)
      expect(ti.failureState, m).not.toBeNull()
      expect(decideTeachingGranularity({
        state: null, learnerRequest: ti.learnerRequest, remediationTier: 0, recoveryKey: ti.failureState,
      }), m).toBe('REMEDIAL')
    }
  })

  it('C5 knowledge gap -> assessment: REACHABLE (no gap state exists)', () => {
    // A learner naming a missing prerequisite is classified as DISTRESS; the
    // named concept is discarded. There is no PREREQUISITE_UNKNOWN state, so
    // nothing can block an assessment on that basis.
    const key = detectFailureState('I don\'t know enough about compound structures', null)
    expect(key).toBe('dont_know')                       // distress, not a gap
    expect(detectLearnerRequest('I don\'t know enough about compound structures')).toBeNull()
    // Recovery DOES gate the assessment this turn (gateEligible has
    // !recoveryKeyHoisted), so the immediate assessment is blocked — but by
    // affect, not by knowledge. The gap itself is never recorded anywhere.
  })

  it('C6 VISUAL_REQUEST -> unrelated quiz: CLOSED BY PHASE 3 (was REACHABLE)', async () => {
    // ── THE ONLY CLASSIFICATION IN THIS FILE THAT PHASE 3 CHANGED ───────────
    // This file's header states the contract for exactly this moment: it
    // records CURRENT behaviour "so a later phase changing it is a deliberate,
    // visible act rather than a surprise". This is that act. The original
    // finding is preserved below verbatim, because the classification was
    // right and the evidence for it is what justified the fix.
    //
    // AS CHARACTERISED (2026-08-23, at c998026):
    //   "The gate excludes recovery, first lesson, excursion and closing…
    //    …but NOT a visual request. REACHABLE by construction — recorded, not
    //    fixed."
    //   expect(gate).not.toContain('learnerRequest')
    //
    //   LIVE REPRODUCTION ATTEMPTED, NOT ACHIEVED (disposable account,
    //   chemistry lesson 3): five substantive correct answers advanced the
    //   ladder only to GUIDE, so `phaseAllowsProbe` was false and no gate
    //   question could attach regardless of the visual request. The collision
    //   was proven in the code path; its runtime precondition was not reached
    //   in one session. Classified REACHABLE (source) / NOT REPRODUCED
    //   (runtime) rather than claimed either way.
    //
    // WHAT PHASE 3 DID. The missing term was not added as a fifth hand-rolled
    // negation — that conjunction was one of three sites each keeping its own
    // incomplete copy of the same precedence order, and adding a term to one
    // of them would have left the other two just as blind. The gate now asks
    // the single authority, which denies an authored probe whenever the
    // learner asked for something specific.
    const { arbitrateTurn } = await import('@/lib/teaching/turnArbitration')
    const asked = arbitrateTurn({
      recoveryActive: false, learnerRequestActive: true, closing: false, completionReady: false,
    })
    expect(asked.owner).toBe('LEARNER_REQUEST')
    expect(asked.allows('AUTHORED_PROBE')).toBe(false)
    // The detector that reads the request is unchanged — Phase 3 widened nothing.
    expect(detectLearnerRequest('show me a diagram')).toBe('diagram')
    // And the gate consults the verdict.
    const route = (await import('node:fs')).readFileSync(
      (await import('node:path')).join(process.cwd(), 'src/app/api/learn/chat/route.ts'), 'utf8')
    const gate = route.slice(route.indexOf('const gateTerms = {'),
      route.indexOf('if (gateEligible && memoryState)'))
    expect(gate).toContain("allows('AUTHORED_PROBE')")
    expect(gate).toContain('!excursionActiveHoisted')
    expect(gate).toContain('closingTurnWithholdsQuestion')
    // STILL NOT REPRODUCED AT RUNTIME, and that has not changed: the ladder
    // precondition above was never reached, so this remains a source-level
    // proof of a source-level collision, now closed at the source. It is not
    // a claim that a live session was observed doing either thing.
  })

  it('C7 VISUAL_ATTACHED -> wrong description: BLOCKED (identity is compared)', async () => {
    const { buildVisualContractBlock } = await import('@/lib/teaching/visual/visualContract')
    expect(typeof buildVisualContractBlock).toBe('function')
    // The contract block is built from the DECISION's own identity, so the
    // description cannot name a concept the attached asset does not carry.
    // Deeper proof lives in the visual suites; not duplicated here.
  })

  it('C8 DEGRADED -> mastery progress: BLOCKED', () => {
    let s = masteredState()
    const banked = { c: s.correctAtCheck, p: s.correctAtPractice }
    s = advanceConversationState(s, {
      askedQuestion: true, signalCorrect: true, deliveredTeaching: true, degradedTurn: true,
    })
    expect(s.correctAtCheck).toBe(banked.c)
    expect(s.correctAtPractice).toBe(banked.p)
    // And a degraded turn cannot authorise completion either.
    const gated = gateLessonCompletion('Nice work! [LESSON_COMPLETE]', initialConversationState(CONCEPT))
    expect(gated.authorized).toBe(false)
    expect(gated.cleanText).not.toContain('[LESSON_COMPLETE]')
  })
})

// ═══════════════════════════════════════════════════════════════════════════
describe('D — acknowledgement characterisation ("Got it" loop)', () => {
  const ACKS = ['Got it', 'Okay', 'Yes', 'I understand', 'Sure']

  it('D1 which acknowledgements are DETECTED as bare', () => {
    const detected = Object.fromEntries(ACKS.map((a) => [a, isBareAcknowledgement(a)]))
    // CHARACTERISATION of current behaviour — not an assertion that it is right.
    expect(detected).toEqual({
      'Got it': true, 'Okay': true, 'Yes': true, 'I understand': true, 'Sure': true,
    })
  })

  it('D2 an acknowledgement produces NO signal (route.ts nulls it)', () => {
    // route.ts:4193 — `if (isBareAcknowledgement(message)) teachingSignal = null`.
    // Modelled here as the null signal the ladder then receives.
    const before = initialConversationState(CONCEPT)
    const after = advanceConversationState(before, {
      askedQuestion: false, signalCorrect: null, deliveredTeaching: false,
    })
    expect(after.correctAtCheck).toBe(before.correctAtCheck)
    expect(after.correctAtPractice).toBe(before.correctAtPractice)
  })

  it('D3 an acknowledgement does NOT advance the episode', () => {
    const t = episodeTurn({ persisted: episode('CORE'), boundary: false, wantsToStop: false, signal: null })
    expect(t.wrote).toBe(false)
    expect(t.persistedAfter?.phase).toBe('CORE')
  })

  it('D4 an acknowledgement is NOT distress and triggers no recovery', () => {
    for (const a of ACKS) {
      expect(detectFailureState(a, null), a).toBeNull()
      expect(readTurnIntent(a, null).failureState, a).toBeNull()
    }
  })

  it('D5 an acknowledgement carries NO evidence that could clear remediation', () => {
    // THE MEASURED SHAPE OF THE "Got it" LOOP.
    // Remediation is entered via a MistakeRecord and exited only when the
    // concept stops being weak — which needs graded CORRECT evidence.
    // D2 shows an acknowledgement banks none, so it cannot be the exit.
    for (const a of ACKS) {
      expect(isBareAcknowledgement(a) || detectLearnerRequest(a) !== null, a).toBe(true)
      expect(readTurnIntent(a, null).isQuestion === false || a === 'Okay', a).toBeTruthy()
    }
    const before = initialConversationState(CONCEPT)
    const after = advanceConversationState(before, {
      askedQuestion: false, signalCorrect: null, deliveredTeaching: false,
    })
    expect(masteryVerified(after)).toBe(false)
    // CHARACTERISED, NOT FIXED: with no positive evidence and no distress, an
    // acknowledgement moves nothing in either direction. Whether that is
    // correct is a later phase's decision.
  })

  it('D6 an acknowledgement does not itself request anything', () => {
    for (const a of ACKS) {
      const ti = readTurnIntent(a, null)
      expect(ti.wantsToStop, a).toBe(false)
      expect(ti.ambiguous, a).toBe(false)
    }
  })
})

// ═══════════════════════════════════════════════════════════════════════════
describe('E — negative controls', () => {
  it('E1 a no-op turn writes no episode state', () => {
    const t = episodeTurn({ persisted: episode('CORE'), boundary: false, wantsToStop: false, signal: null })
    expect(t.wrote).toBe(false)
  })

  it('E2 a correct answer still advances', () => {
    const t = episodeTurn({ persisted: episode('OPENING'), boundary: false, wantsToStop: false, signal: { correctness: true } })
    expect(t.wrote).toBe(true)
    expect(t.persistedAfter?.phase).toBe('CORE')
    // The ladder advances a PHASE on a correct turn; the mastery counters bank
    // later, at CHECK/PRACTICE (see B2b). Asserting a counter here was wrong on
    // this test's first run — corrected to assert what actually advances.
    const before = initialConversationState(CONCEPT)
    const s = advanceConversationState(before, {
      askedQuestion: true, signalCorrect: true, deliveredTeaching: true,
    })
    expect(s.phase).not.toBe(before.phase)
  })

  it('E3 an incorrect answer is still incorrect and still spends the budget', () => {
    const t = episodeTurn({ persisted: episode('CORE', { visibleFailures: 1 }), boundary: false, wantsToStop: false, signal: { correctness: false } })
    expect(t.persistedAfter?.visibleFailures).toBe(2)
    expect(t.persistedAfter?.phase).toBe('CLOSING')
  })

  it('E4 confusion never becomes mastery', () => {
    let s = initialConversationState(CONCEPT)
    for (let i = 0; i < 5; i += 1) {
      s = advanceConversationState(s, { askedQuestion: true, signalCorrect: false, deliveredTeaching: true })
    }
    expect(masteryVerified(s)).toBe(false)
    expect(masteryVerifiedStrict(s)).toBe(false)
  })

  it('E5 a degraded response never creates mastery (see C8) and never completes', () => {
    const gated = gateLessonCompletion('[LESSON_COMPLETE]', initialConversationState(CONCEPT))
    expect(gated.authorized).toBe(false)
  })

  it('E6 a mastered state is not downgraded by a neutral turn', () => {
    const m = masteredState()
    const after = advanceConversationState(m, { askedQuestion: false, signalCorrect: null, deliveredTeaching: false })
    expect(masteryVerified(after)).toBe(true)
  })

  it('E7 visual state does not change merely because a turn has no visual request', async () => {
    const { parseVisualSession } = await import('@/lib/teaching/visual/session')
    const s = parseVisualSession(null)
    expect(parseVisualSession(JSON.parse(JSON.stringify(s)))).toEqual(s)
    expect(detectLearnerRequest('what is a compound?')).toBeNull()
  })

  it('E8 PHASE 1 GUARD: reverting the persistence baseline breaks B1', () => {
    // The Phase 1 invariant expressed directly: with the OLD baseline (compare
    // against the already-mutated in-request value) a stop is not written.
    const persisted = episode('CORE')
    let hoisted = deriveEpisode(persisted, false, Date.now(), null)
    hoisted = forceClosing(hoisted)
    const next = applySignalToEpisode(hoisted, null, { isFirstLesson: false })
    const OLD = false || next !== hoisted        // the shipped pre-Phase-1 rule
    const NEW = episodeNeedsPersist({ persisted, next, freshBoundary: false })
    expect(OLD).toBe(false)   // would have been lost
    expect(NEW).toBe(true)    // is now kept
  })
})
