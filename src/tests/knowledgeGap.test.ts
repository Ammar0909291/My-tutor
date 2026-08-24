/**
 * PHASE 4 — KNOWLEDGE GAP: a named missing concept is not distress.
 *
 * Driven through the REAL modules and the REAL chemistry KG — the resolver,
 * the failure-state detector, the excursion lifecycle and the arbitration
 * ladder are all the shipped ones. Nothing here is a replica, because the
 * defect was never in any single module: it was that nobody asked the resolver
 * a question it could already answer.
 *
 * NEGATIVE CONTROL is in the commit message: reverting the one disjunct in
 * `decideExcursion` fails the detour tests, and reverting the
 * `next.remediationCount = 0` line fails the remediation-exit tests.
 */
import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { classifyKnowledgeGap, type KnowledgeGap } from '@/lib/teaching/knowledgeGap'
import { detectFailureState, isDontKnowSignal } from '@/lib/teaching/recoveryGuard'
import { resolveRequestedConceptId } from '@/lib/teaching/concept/requestedConcept'
import { decideExcursion, NO_EXCURSION, turnCountsForLesson, parseExcursionState } from '@/lib/teaching/excursion'
import { getKGNode } from '@/lib/curriculum/knowledgeGraph'
import { arbitrateTurn, TURN_AUTHORITY_ORDER, type TurnClaims } from '@/lib/teaching/turnArbitration'
import { initialConversationState, advanceConversationState } from '@/lib/teaching/conversationState'
import { gateLessonCompletion, masteryVerifiedStrict } from '@/lib/teaching/masteryGate'
import { shouldInjectAffectClose } from '@/lib/teaching/sessionLifecycle'

const LESSON = 'chem.found.pure-substances'
const GAP = 'chem.found.mole-concept'
const PREREQ = 'chem.found.matter'          // the KG's own listed prerequisite
const prereqs = () => getKGNode(LESSON)?.prerequisites ?? []

/** The whole real pipeline for one learner message, exactly as the route runs it. */
function turn(message: string, lesson: string | null = LESSON) {
  const failureState = detectFailureState(message, null)
  const resolvedConceptId = resolveRequestedConceptId(message, lesson, 'chemistry')
  const gap = classifyKnowledgeGap({
    failureState, resolvedConceptId, lessonConceptId: lesson,
    lessonPrerequisites: lesson ? (getKGNode(lesson)?.prerequisites ?? null) : null,
  })
  const excursion = decideExcursion({
    state: NO_EXCURSION, message, lessonConceptId: lesson,
    requestedConceptId: resolvedConceptId, requestedTopicTitle: null,
    knowledgeGapConceptId: gap?.conceptId ?? null, lastAssistantAskedQuestion: false,
  })
  return { failureState, resolvedConceptId, gap, excursion }
}

const NO_CLAIMS: TurnClaims = {
  knowledgeGapResolved: false, recoveryActive: false,
  learnerRequestActive: false, closing: false, completionReady: false,
}

// ── 1. THE GAP IS FIRST-CLASS, AND DISTINCT FROM DISTRESS ───────────────────

describe('1. a named missing concept is a gap, not distress', () => {
  it('preserves the named concept the runtime used to discard', () => {
    const t = turn("I don't know enough about the mole concept")
    // The old reading kept only this…
    expect(t.failureState).toBe('dont_know')
    // …and this is what it threw away.
    expect(t.gap).not.toBeNull()
    expect(t.gap!.conceptId).toBe(GAP)
    expect(t.gap!.signal).toBe('dont_know')
  })

  it('reads the relationship from the KG, never infers it', () => {
    expect(turn("I don't know enough about the mole concept").gap!.relationship).toBe('related')
    // The KG's OWN listed prerequisite of this lesson.
    expect(prereqs()).toContain(PREREQ)
    expect(turn(`I don't know enough about ${PREREQ}`).gap!.relationship).toBe('prerequisite')
  })

  it('EMOTIONAL DISTRESS IS NEVER A GAP — the partition is recoveryGuard\'s own', () => {
    for (const m of ["I give up", "I'm stupid", "I'm scared", "this is way too hard",
                     "I hate chemistry", "I can't do this"]) {
      const t = turn(m)
      expect(t.failureState, m).not.toBeNull()
      expect(isDontKnowSignal(t.failureState), m).toBe(false)
      expect(t.gap, m).toBeNull()
      expect(t.excursion.transition, m).toBe('none')
    }
  })

  it('a WRONG ANSWER is not a gap — it names nothing', () => {
    const t = turn('a mixture is a pure substance')
    expect(t.gap).toBeNull()
  })

  it('an explicit REQUEST is not reclassified as a gap', () => {
    const t = turn('explain the mole concept')
    expect(t.failureState).toBeNull()
    expect(t.gap).toBeNull()
    // …and it still opens its detour by its own route, untouched.
    expect(t.excursion.transition).toBe('started')
  })
})

// ── 2. AMBIGUITY DOES NOT GUESS ─────────────────────────────────────────────

describe('2. resolution is deterministic and never guesses', () => {
  it('a bare "I don\'t know" names nothing and stays exactly what it is today', () => {
    for (const m of ["I don't know", "I don't understand", "idk", "I have no idea"]) {
      const t = turn(m)
      expect(isDontKnowSignal(t.failureState), m).toBe(true)   // still a recovery signal
      expect(t.resolvedConceptId, m).toBeNull()
      expect(t.gap, m).toBeNull()                              // but not a gap
      expect(t.excursion.transition, m).toBe('none')           // and no detour
    }
  })

  it('an UNRESOLVABLE name does not corrupt state — it yields no gap at all', () => {
    // MEASURED: the resolver is deliberately strict (loosening it is the L1
    // qualifier defect), so these name something real that it cannot title.
    for (const m of ["I don't know enough about compound structures",
                     "I don't understand chemical equilibrium",
                     "I never learned the periodic table"]) {
      const t = turn(m)
      expect(t.gap, m).toBeNull()
      expect(t.excursion.state.targetConceptId, m).toBeNull()
      // Critically: no INVENTED concept, and the lesson is not relabelled.
      expect(t.excursion.targetConceptId, m).toBe(LESSON)
    }
  })

  it('naming the concept already being taught is not a gap (no detour to itself)', () => {
    const gap = classifyKnowledgeGap({
      failureState: 'dont_know', resolvedConceptId: LESSON,
      lessonConceptId: LESSON, lessonPrerequisites: prereqs(),
    })
    expect(gap).toBeNull()
  })

  it('the module holds no detector: no regex, and it never sees a raw message', () => {
    const src = readFileSync('src/lib/teaching/knowledgeGap.ts', 'utf8')
    expect(src).not.toMatch(/=\s*\/[^/\n*]+\/[gimsuy]*/)
    expect(src).not.toContain('new RegExp')
    expect(src).not.toMatch(/\bmessage\b\s*:/)
  })
})

// ── 3. THE AFFECT BUDGET ────────────────────────────────────────────────────

describe('3. a gap does not spend the affect budget', () => {
  it('a gap turn is an excursion turn, which the route already exempts', () => {
    // The exemption is not new code. route.ts guards the synthetic failure with
    // `!excursionActiveHoisted`, whose comment already argues this exact case
    // for side-questions. Opening the detour is what reaches it.
    const t = turn("I don't know enough about the mole concept")
    expect(t.excursion.transition).toBe('started')
    expect(turnCountsForLesson(t.excursion)).toBe(false)

    const route = readFileSync('src/app/api/learn/chat/route.ts', 'utf8')
    const at = route.indexOf('const syntheticSignal =')
    expect(at).toBeGreaterThan(0)
    expect(route.slice(Math.max(0, at - 900), at)).toContain('!excursionActiveHoisted')
  })

  it('DISTRESS STILL SPENDS IT — the protection is not removed', () => {
    const t = turn("I give up")
    expect(t.excursion.transition).toBe('none')
    expect(turnCountsForLesson(t.excursion)).toBe(true)   // reaches the synthetic failure
  })

  it('a bare "I don\'t know" still spends it, exactly as before', () => {
    expect(turnCountsForLesson(turn("I don't know").excursion)).toBe(true)
  })

  it('no MistakeRecord is written against the lesson for a reported gap', () => {
    const route = readFileSync('src/app/api/learn/chat/route.ts', 'utf8')
    expect(route).toContain('if (resolvedConceptId && !knowledgeGapHoisted) {')
  })
})

// ── 4. THE PREREQUISITE DETOUR ──────────────────────────────────────────────

describe('4. the detour preserves the parent lesson', () => {
  it('opens on the named concept and anchors the return to the lesson', () => {
    const t = turn(`I don't know enough about ${PREREQ}`)
    expect(t.excursion.state.active).toBe(true)
    expect(t.excursion.state.targetConceptId).toBe(PREREQ)
    expect(t.excursion.state.returnToConceptId).toBe(LESSON)   // position preserved
    expect(t.excursion.state.turns).toBe(0)
  })

  it('CANNOT complete or bank mastery for the parent lesson', () => {
    const t = turn(`I don't know enough about ${PREREQ}`)
    expect(turnCountsForLesson(t.excursion)).toBe(false)
    // and on the RETURN turn either — a turn that resumes cannot also finish.
    const back = decideExcursion({
      state: t.excursion.state, message: 'got it, thanks', lessonConceptId: LESSON,
      requestedConceptId: null, requestedTopicTitle: null,
      knowledgeGapConceptId: null, lastAssistantAskedQuestion: false,
    })
    expect(back.state.active).toBe(false)
    expect(turnCountsForLesson(back)).toBe(false)
  })

  it('a gap can never redirect the detour to a concept the resolver did not return', () => {
    // The guard is `knowledgeGapConceptId === requestedConceptId`.
    const d = decideExcursion({
      state: NO_EXCURSION, message: "I don't know enough about the mole concept",
      lessonConceptId: LESSON, requestedConceptId: null, requestedTopicTitle: null,
      knowledgeGapConceptId: 'chem.found.matter', lastAssistantAskedQuestion: false,
    })
    expect(d.transition).toBe('none')
    expect(d.state.targetConceptId).toBeNull()
  })

  it('cannot detour forever — the existing turn limit still converges', () => {
    let st = turn(`I don't know enough about ${PREREQ}`).excursion.state
    for (let i = 0; i < 60 && st.active; i++) {
      st = decideExcursion({
        state: st, message: 'tell me more', lessonConceptId: LESSON,
        requestedConceptId: null, requestedTopicTitle: null,
        knowledgeGapConceptId: null, lastAssistantAskedQuestion: false,
      }).state
    }
    expect(st.active).toBe(false)
  })

  it('survives the request boundary — the state round-trips through the snapshot', () => {
    const opened = turn(`I don't know enough about ${PREREQ}`).excursion.state
    const readBack = parseExcursionState(JSON.parse(JSON.stringify(opened)))
    expect(readBack.active).toBe(true)
    expect(readBack.targetConceptId).toBe(PREREQ)
    expect(readBack.returnToConceptId).toBe(LESSON)
  })
})

// ── 5. THE REMEDIATION LIFECYCLE ────────────────────────────────────────────

describe('5. remediation has a real exit', () => {
  const remediating = () => {
    let s = initialConversationState(LESSON)
    s = advanceConversationState(s, { learnerRequest: 'explain_differently', deliveredTeaching: true } as never)
    s = advanceConversationState(s, { learnerRequest: 'explain_differently', deliveredTeaching: true } as never)
    return s
  }

  it('enters on explain-differently and counts strategies', () => {
    expect(remediating().remediationCount).toBe(2)
  })

  it('"Got it" DOES NOT clear it — an acknowledgement is not evidence', () => {
    const s = advanceConversationState(remediating(), { acknowledgement: true, deliveredTeaching: true } as never)
    expect(s.remediationCount).toBe(2)
    expect(s.correctAtCheck).toBe(0)
    expect(s.correctAtPractice).toBe(0)
  })

  it('a graded CORRECT answer clears it — the same evidence that clears failures', () => {
    const s = advanceConversationState(remediating(), {
      askedQuestion: true, signalCorrect: true, deliveredTeaching: true,
    } as never)
    expect(s.remediationCount).toBe(0)
    expect(s.consecutiveFailures).toBe(0)
  })

  it('a WRONG answer does not clear it', () => {
    const s = advanceConversationState(remediating(), {
      askedQuestion: true, signalCorrect: false, deliveredTeaching: true,
    } as never)
    expect(s.remediationCount).toBe(2)
  })

  it('clearing remediation FABRICATES NO MASTERY', () => {
    const s = advanceConversationState(remediating(), {
      askedQuestion: true, signalCorrect: true, deliveredTeaching: true,
    } as never)
    expect(s.remediationCount).toBe(0)
    expect(masteryVerifiedStrict(s)).toBe(false)
    const gated = gateLessonCompletion('Done! [LESSON_COMPLETE]', s)
    expect(gated.authorized).toBe(false)
    expect(gated.cleanText).not.toContain('[LESSON_COMPLETE]')
  })
})

// ── 6. PRECEDENCE INTEGRATION (Phase 3 remains authoritative) ───────────────

describe('6. the gap integrates with Phase-3 arbitration rather than replacing it', () => {
  const claiming = (over: Partial<TurnClaims>) => arbitrateTurn({ ...NO_CLAIMS, ...over })

  it('KNOWLEDGE_GAP is one INSERTED rung; nothing below it was reordered', () => {
    expect(TURN_AUTHORITY_ORDER[0]).toBe('KNOWLEDGE_GAP')
    expect(TURN_AUTHORITY_ORDER.filter((a) => a !== 'KNOWLEDGE_GAP')).toEqual([
      'RECOVERY', 'LEARNER_REQUEST', 'CLOSE', 'COMPLETE', 'TEACH',
    ])
  })

  it('a resolved gap takes the turn from RECOVERY, and takes the SCRIPT with it', () => {
    const v = claiming({ knowledgeGapResolved: true, recoveryActive: true })
    expect(v.owner).toBe('KNOWLEDGE_GAP')
    expect(v.overridden).toContain('RECOVERY')
    // The one instruction that would forbid teaching the prerequisite.
    expect(v.allows('RECOVERY_SCRIPT')).toBe(false)
    // Teaching it IS the turn.
    expect(v.allows('PHASE_FRAME')).toBe(true)
    expect(v.allows('NEXT_MOVE')).toBe(true)
  })

  it('an UNRESOLVED "don\'t know" leaves RECOVERY owning the turn, script intact', () => {
    const v = claiming({ knowledgeGapResolved: false, recoveryActive: true })
    expect(v.owner).toBe('RECOVERY')
    expect(v.allows('RECOVERY_SCRIPT')).toBe(true)
  })

  it('a gap does not close the session and does not quiz the parent concept', () => {
    const v = claiming({ knowledgeGapResolved: true })
    expect(v.allows('SESSION_CLOSE')).toBe(false)
    expect(v.allows('AUTHORED_PROBE')).toBe(false)
    expect(v.allows('FILLER_REPAIR')).toBe(false)
  })

  it('a STOP still wins over a gap-with-close, per Phase 3\'s unchanged order', () => {
    // CLOSE sits below KNOWLEDGE_GAP, so a gap defers the close — the same
    // "deferred, never cancelled" shape Phase 3/4 already use elsewhere.
    const v = claiming({ knowledgeGapResolved: true, closing: true })
    expect(v.owner).toBe('KNOWLEDGE_GAP')
    expect(v.overridden).toContain('CLOSE')
  })

  it('the route consults the verdict before injecting the recovery script', () => {
    const route = readFileSync('src/app/api/learn/chat/route.ts', 'utf8')
    expect(route).toContain("allows('RECOVERY_SCRIPT')")
  })

  it('the ladder is still total and first-match-wins with the new rung', () => {
    const fields: (keyof TurnClaims)[] = [
      'knowledgeGapResolved', 'recoveryActive', 'learnerRequestActive', 'closing', 'completionReady',
    ]
    for (let mask = 0; mask < (1 << fields.length); mask++) {
      const c = { ...NO_CLAIMS }
      fields.forEach((f, i) => { if (mask & (1 << i)) c[f] = true })
      const v = arbitrateTurn(c)
      expect(TURN_AUTHORITY_ORDER).toContain(v.owner)
    }
  })
})

// ── 7. ADVERSARIAL: WHAT CAN NOW GET STUCK OR SURVIVE TOO LONG ─────────────

describe('7. adversarial — the new detour under pressure', () => {
  const open = () => decideExcursion({
    state: NO_EXCURSION, message: `I don't know enough about ${PREREQ}`, lessonConceptId: LESSON,
    requestedConceptId: PREREQ, requestedTopicTitle: null,
    knowledgeGapConceptId: PREREQ, lastAssistantAskedQuestion: false,
  }).state
  const step = (state: ReturnType<typeof open>, message: string, gapId: string | null = null) =>
    decideExcursion({
      state, message, lessonConceptId: LESSON,
      requestedConceptId: gapId, requestedTopicTitle: null,
      knowledgeGapConceptId: gapId, lastAssistantAskedQuestion: false,
    })

  it('THE PREREQUISITE HAS ITS OWN PREREQUISITE: switches, never nests, keeps the anchor', () => {
    const d = step(open(), "I don't know enough about the mole concept", GAP)
    expect(d.transition).toBe('switched')
    expect(d.state.targetConceptId).toBe(GAP)
    // The one thing that must never move: the way back to the lesson.
    expect(d.state.returnToConceptId).toBe(LESSON)
  })

  it('a DIAGRAM REQUEST mid-detour does not hijack the detour', () => {
    const d = step(open(), 'show me a diagram')
    expect(d.transition).toBe('continued')
    expect(d.state.targetConceptId).toBe(PREREQ)
  })

  it('SATISFACTION closes it, returns, and still cannot complete the lesson', () => {
    const d = step(open(), 'got it, thanks')
    expect(d.transition).toBe('closed-satisfied')
    expect(d.state.active).toBe(false)
    expect(turnCountsForLesson(d)).toBe(false)
  })

  it('CHARACTERISED, NOT FIXED: a stop mid-detour defers the close', () => {
    // MEASURED. "I'm done for today." during a detour leaves the excursion
    // ACTIVE ('continued'), and `shouldInjectAffectClose` excludes an active
    // excursion — so the closing SCRIPT is not injected. Phase-3 arbitration
    // still gives the turn to CLOSE, so nothing is taught and nothing is
    // asked; the learner simply does not get a close until the detour ends.
    //
    // This is PRE-EXISTING, shipped and live-verified in Series A Phase 4 for
    // every "explain X" excursion — Phase 4 did not create it. It is recorded
    // here because a gap now opens detours too, so the case is reachable by a
    // second route. Fixing it means deciding that a session stop closes an
    // excursion outright, which is an excursion-lifecycle change and is
    // deliberately out of this phase's scope.
    const d = step(open(), "I'm done for today.")
    expect(d.transition).toBe('continued')
    expect(d.state.active).toBe(true)
    expect(shouldInjectAffectClose({
      phase: 'CLOSING', excursionActive: d.state.active, ambiguousTurn: false,
    })).toBe(false)
    // The stop is not lost: the episode is still CLOSING, so the close fires
    // on the first turn after the detour ends.
    expect(shouldInjectAffectClose({
      phase: 'CLOSING', excursionActive: false, ambiguousTurn: false,
    })).toBe(true)
  })
})

// ── 8. THE LIMIT, ASSERTED SO IT CANNOT BE MISREAD AS SOLVED ────────────────

describe('8. what Phase 4 deliberately does NOT solve', () => {
  it('an unresolvable named concept is UNCHANGED — recovery, and it spends budget', () => {
    // The motivating sentence from the phase brief. The chemistry KG has no
    // concept it can title "compound structures", the resolver correctly
    // declines to guess, and this turn therefore behaves exactly as it did
    // before Phase 4. Carrying an unresolvable name needs a gap-frame
    // extension to the topic extractor — deferred to Phase 5 by owner decision.
    const t = turn("I don't know enough about compound structures")
    expect(t.resolvedConceptId).toBeNull()
    expect(t.gap).toBeNull()
    expect(t.excursion.transition).toBe('none')
    expect(turnCountsForLesson(t.excursion)).toBe(true)      // budget still spent
    expect(arbitrateTurn({ ...NO_CLAIMS, recoveryActive: true }).owner).toBe('RECOVERY')
  })

  it('"I need to learn X first" is invisible to every stage — also Phase 5', () => {
    // MEASURED: detectFailureState returns null, so it is not a recovery turn,
    // not a gap, and CUE reads NEUTRAL. An explicit prerequisite REQUEST needs
    // a frame the extractor does not yet have.
    const t = turn('I need to learn the mole concept first')
    expect(t.failureState).toBeNull()
    expect(t.resolvedConceptId).toBe(GAP)   // the concept resolves…
    expect(t.gap).toBeNull()                // …but nothing classifies it
  })
})
