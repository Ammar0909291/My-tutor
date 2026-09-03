/**
 * The two properties the resolver fix must not disturb.
 *
 * V - THE VISUAL LAYER HAS NO SECOND OPINION.
 *     `resolveVisualTarget` calls the SAME `resolveRequestedConceptId` the
 *     Teaching Engine's excursion lifecycle calls, with the same arguments, so
 *     "the figure can never depict a concept the teaching layer did not agree
 *     the learner asked for" (that module's own header). Both production
 *     false positives propagated into wrong-concept FIGURES through exactly
 *     that shared call - which is why the fix belongs upstream, once, and why
 *     no visual-side guard may be added. These tests assert the EQUALITY
 *     rather than two hard-coded ids, so what is pinned is the property.
 *
 * A - THE ASSESSMENT ARCHITECTURE IS UNCHANGED, AND IS NOT THE DEFECT.
 *     The zero-MCQ physics sessions were caused by the excursion freeze
 *     (route.ts: an active excursion returns the conversation state unchanged
 *     instead of folding it, and `gateTerms.notExcursion` blocks every
 *     authored probe), which the resolver false positives switched on. These
 *     tests CHARACTERISE today's behaviour so that (a) the fix can be shown
 *     not to have touched it, and (b) any future "assessment escape" proposal
 *     has a measured baseline to beat. No new mechanism is introduced here.
 */

import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { resolveVisualTarget } from '@/lib/teaching/visual/resolveVisualTarget'
import { resolveRequestedConceptId } from '@/lib/teaching/concept/requestedConcept'
import { turnCountsForLesson } from '@/lib/teaching/excursion'
import { isProbeAttachablePhase, isMasteryGatePhase } from '@/lib/teaching/gateAssessment'
import {
  initialConversationState,
  advanceConversationState,
  decideNextMoveDetailed,
  type ConversationState,
} from '@/lib/teaching/conversationState'

const REFRACTION = 'phys.opt.refraction'
const PHOTOELECTRIC = 'phys.mod.photoelectric-effect'

describe('V1 - the visual target follows the resolver, never its own reading', () => {
  it.each([
    ['can you draw diagram of ray bending please', REFRACTION],
    ['what is max KE of electron', PHOTOELECTRIC],
    ['can you explain X-rays', REFRACTION],
    ['Can you explain kinetic energy?', PHOTOELECTRIC],
    ['explain photosynthesis', REFRACTION],
  ])('%s (lesson %s): figure concept === resolver concept', (message, lesson) => {
    const requested = resolveRequestedConceptId(message, lesson, 'physics')
    const target = resolveVisualTarget(message, lesson, 'physics')
    expect(target).not.toBeNull()
    // When the learner named something, the figure depicts THAT; otherwise it
    // falls back to the lesson. There is no third possibility.
    expect(target!.conceptId).toBe(requested ?? lesson)
    expect(target!.origin).toBe(requested ? 'learner-request' : 'lesson-concept')
  })

  it('neither production message may target the concept it wrongly resolved to', () => {
    expect(resolveVisualTarget('can you draw diagram of ray bending please', REFRACTION, 'physics')!.conceptId)
      .not.toBe('phys.mod.x-rays')
    expect(resolveVisualTarget('what is max KE of electron', PHOTOELECTRIC, 'physics')!.conceptId)
      .not.toBe('phys.mech.kinetic-energy')
  })
})

describe('V2 - an excursion flag is derived, not independently decided', () => {
  it('excursion is exactly "the target is not the lesson"', () => {
    for (const [message, lesson] of [
      ['can you draw diagram of ray bending please', REFRACTION],
      ['explain photosynthesis', REFRACTION],
      ['what is max KE of electron', PHOTOELECTRIC],
    ] as const) {
      const target = resolveVisualTarget(message, lesson, 'physics')!
      expect(target.excursion).toBe(target.conceptId !== lesson)
    }
  })
})

describe('A1 - a question-only learner reaches probe eligibility (baseline)', () => {
  /** The route's own rule, restated so the simulation cannot drift from it:
   *  `deliveredTeaching` is the engine's decided move, and `phaseAllowsProbe`
   *  is the phase/move conjunction the gate reads. */
  const phaseAllowsProbe = (s: ConversationState, move: string) =>
    isMasteryGatePhase(s.phase)
    || (s.phase === 'GUIDE' && move === 'ask')
    || (s.phase === 'DEMONSTRATE'
      && ((s.consecutiveFailures ?? 0) > 0 || (s.observeFailures ?? 0) > 0))

  function drive(turns: number, tutorAlwaysAsks: boolean) {
    let s: ConversationState = { ...initialConversationState(), taughtThisSession: false }
    let firstEligibleTurn: number | null = null
    let eligible = 0
    for (let t = 1; t <= turns; t++) {
      const move = decideNextMoveDetailed(s, { recoveryTurn: false, workedExampleFirst: false }).move
      if (phaseAllowsProbe(s, move)) {
        eligible++
        if (firstEligibleTurn === null) firstEligibleTurn = t
      }
      s = advanceConversationState(s, {
        askedQuestion: tutorAlwaysAsks || move === 'ask',
        signalCorrect: null,            // the learner never answers anything
        recoveryFired: false,
        questionSanctioned: move === 'ask',
        deliveredTeaching: move === 'teach' || move === 'show',
        degradedTurn: false,
      })
      s = { ...s, taughtThisSession: true }
    }
    return { firstEligibleTurn, eligible, phase: s.phase }
  }

  it.each([true, false])(
    'is offered assessment within 6 turns and never trapped (tutorAlwaysAsks=%s)',
    (tutorAlwaysAsks) => {
      const r = drive(12, tutorAlwaysAsks)
      expect(r.firstEligibleTurn).not.toBeNull()
      expect(r.firstEligibleTurn!).toBeLessThanOrEqual(6)
      expect(r.eligible).toBeGreaterThanOrEqual(3)
      // OBSERVE must not absorb the session - the diagnostic concludes.
      expect(r.phase).not.toBe('OBSERVE')
    })
})

describe('A2 - the excursion freeze is INTENDED behaviour, not the defect', () => {
  it('an active excursion does not credit the turn to the lesson', () => {
    expect(turnCountsForLesson({
      state: { active: true, targetConceptId: 'phys.mod.x-rays', targetTopicTitle: null, returnToConceptId: REFRACTION, turns: 1 },
      justClosed: false,
    })).toBe(false)
  })

  it('the closing (return) turn also does not credit the lesson', () => {
    expect(turnCountsForLesson({
      state: { active: false, targetConceptId: null, targetTopicTitle: null, returnToConceptId: null, turns: 0 },
      justClosed: true,
    })).toBe(false)
  })

  it('an ordinary turn does credit the lesson', () => {
    expect(turnCountsForLesson({
      state: { active: false, targetConceptId: null, targetTopicTitle: null, returnToConceptId: null, turns: 0 },
      justClosed: false,
    })).toBe(true)
  })

  it('the route still freezes the ladder on an excursion turn', () => {
    // Source pin: this is the mechanism that turned two resolver false
    // positives into zero-MCQ sessions. It must stay exactly as it is - the
    // fix is upstream, and nothing here may be relaxed to compensate.
    const route = readFileSync('src/app/api/learn/chat/route.ts', 'utf8')
    expect(route).toContain('conversationStateAfterTurnHoisted = excursionActiveHoisted')
    expect(route).toContain('notExcursion: !excursionActiveHoisted')
  })
})

describe('A3-A5 - mastery invariants are untouched', () => {
  it('A3 - a wrong answer at CHECK creates no mastery credit', () => {
    const at = { ...initialConversationState(), phase: 'CHECK' as const, demonstrated: true, taughtThisSession: true }
    const after = advanceConversationState(at, {
      askedQuestion: true,
      signalCorrect: false,
      recoveryFired: false,
      questionSanctioned: true,
      deliveredTeaching: false,
      degradedTurn: false,
    })
    expect(after.correctAtCheck).toBe(0)
    expect(after.correctAtPractice).toBe(0)
    expect(after.verifiedCorrectAtCheck).toBe(0)
    expect(after.verifiedCorrectAtPractice).toBe(0)
  })

  it('A4 - a correct answer at CHECK still banks exactly one credit', () => {
    const at = { ...initialConversationState(), phase: 'CHECK' as const, demonstrated: true, taughtThisSession: true }
    const after = advanceConversationState(at, {
      askedQuestion: true,
      signalCorrect: true,
      recoveryFired: false,
      questionSanctioned: true,
      deliveredTeaching: false,
      degradedTurn: false,
    })
    expect(after.correctAtCheck).toBe(1)
  })

  it('A5 - OBSERVE remains probe-free, and the mastery gate phases are unchanged', () => {
    expect(isProbeAttachablePhase('OBSERVE')).toBe(false)
    expect(isProbeAttachablePhase('GUIDE')).toBe(true)
    expect(isMasteryGatePhase('CHECK')).toBe(true)
    expect(isMasteryGatePhase('PRACTICE')).toBe(true)
    expect(isMasteryGatePhase('GUIDE')).toBe(false)
    expect(isMasteryGatePhase('DEMONSTRATE')).toBe(false)
  })
})
