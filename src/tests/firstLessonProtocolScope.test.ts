/**
 * PRODUCTION INCIDENT — the tutor never progressed through lesson stages.
 *
 * Symptoms: repeated explanations, repeated MCQs, repeated teaching
 * objectives, "student answers correctly -> tutor teaches the same thing
 * again", and a flow of Explain -> Explain -> Question -> Explain instead of
 * Explain -> Example -> Guided -> Practice -> Mastery -> Summary.
 *
 * RUNTIME EVIDENCE — decision rules across one production session (28 turns):
 *   16x  D0c-FIRST-LESSON-PROTOCOL
 *    6x  D0-RECOVERY-PREEMPT
 *    4x  D0a-LESSON-ALREADY-COMPLETE
 *    2x  D0b-CLOSING-PROTECT
 * Zero decisions from ANY rule below the preempt band: no memory hit, no
 * diagnosis, no practice, no progression rule ever ran. The same session
 * logged `fallback_reason=First lesson` on all 12 model turns, so Explanation
 * Memory never served either.
 *
 * ROOT CAUSE — isFirstLessonContext() was built entirely from STATIC
 * properties of the learner (not school mode, level beginner, lesson order 1,
 * zero completions). None of them changes while lesson one is being taught, so
 * the guard was true on every turn forever. conversationReader then reported
 * conversationIntent='first_lesson' every turn, and D0c preempted the whole
 * ladder beneath it.
 *
 * first-lesson/04 §1 defines lesson one as a FLOW THAT ENDS
 * (anchor -> demonstrate -> explain-after -> echo -> ONE solo -> close), not a
 * permanent mode. The protocol now governs the OPENING of lesson one and hands
 * the turn back to the ordinary ladder once the stage machine reaches CHECK.
 */
import { describe, it, expect } from 'vitest'
import { isFirstLessonContext } from '@/lib/teaching/firstLessonGuard'
import { PHASE_ORDER, isDeliveryPhase, type TeachingPhase } from '@/lib/teaching/conversationState'
import { understandStudentTurn, type UnderstandingInputs } from '@/lib/understanding'
import { decideTeaching } from '@/lib/understanding/decisionEngine'

/** The exact production population: Library beginner, lesson 1, nothing done. */
const LEARNER = {
  isSchoolMode: false,
  currentLevel: 'beginner',
  currentLessonOrder: 1,
  completedLessonCount: 0,
} as const

describe('the first-lesson protocol is an OPENING, not a permanent mode', () => {
  it('is active while lesson one is still being delivered', () => {
    for (const phase of PHASE_ORDER.filter(isDeliveryPhase)) {
      expect(isFirstLessonContext({ ...LEARNER, phase }), phase).toBe(true)
    }
  })

  it('releases the turn once the learner is being assessed', () => {
    // CHECK / PRACTICE / TRANSFER — the point at which the ordinary ladder
    // (practice, progression, memory) must own the decision.
    for (const phase of PHASE_ORDER.filter((p) => !isDeliveryPhase(p))) {
      expect(isFirstLessonContext({ ...LEARNER, phase }), phase).toBe(false)
    }
  })

  it('covers every phase in the ladder — no phase is unaccounted for', () => {
    for (const phase of PHASE_ORDER) {
      expect(typeof isFirstLessonContext({ ...LEARNER, phase })).toBe('boolean')
    }
  })

  it('an omitted phase preserves the previous behaviour exactly', () => {
    expect(isFirstLessonContext({ ...LEARNER })).toBe(true)
    expect(isFirstLessonContext({ ...LEARNER, phase: null })).toBe(true)
  })

  it('still excludes everyone outside the lesson-one population', () => {
    const phase: TeachingPhase = 'OBSERVE'
    expect(isFirstLessonContext({ ...LEARNER, phase, isSchoolMode: true })).toBe(false)
    expect(isFirstLessonContext({ ...LEARNER, phase, currentLevel: 'intermediate' })).toBe(false)
    expect(isFirstLessonContext({ ...LEARNER, phase, currentLessonOrder: 2 })).toBe(false)
    expect(isFirstLessonContext({ ...LEARNER, phase, completedLessonCount: 1 })).toBe(false)
  })
})

describe('the progression ladder becomes reachable', () => {
  function decide(o: Partial<UnderstandingInputs> = {}) {
    return decideTeaching(understandStudentTurn({ message: 'ok', ...o } as UnderstandingInputs))
  }

  it('D0c no longer answers a turn where the learner is being assessed', () => {
    // firstLessonActive is what conversationReader turns into
    // conversationIntent='first_lesson'. Once the protocol releases, the route
    // stops setting it, so D0c cannot fire.
    const opening = decide({ firstLessonActive: true })
    const assessing = decide({ firstLessonActive: false })
    expect(opening.ruleId).toBe('D0c-FIRST-LESSON-PROTOCOL')
    expect(assessing.ruleId).not.toBe('D0c-FIRST-LESSON-PROTOCOL')
  })

  it('a correct answer can now reach a rule below the preempt band', () => {
    // The production failure: a correct answer changed nothing, because no
    // rule below D0c ever ran.
    const d = decide({ firstLessonActive: false, lastSignalCorrect: true })
    expect(['D0-RECOVERY-PREEMPT', 'D0a-LESSON-ALREADY-COMPLETE',
            'D0b-CLOSING-PROTECT', 'D0c-FIRST-LESSON-PROTOCOL'])
      .not.toContain(d.ruleId)
  })

  it('the lesson-one opening is still protected — the fix does not disarm it', () => {
    expect(decide({ firstLessonActive: true }).ruleId).toBe('D0c-FIRST-LESSON-PROTOCOL')
  })
})

describe('the guard is a pure function of its inputs', () => {
  it('same inputs always give the same answer', () => {
    for (let i = 0; i < 3; i++) {
      expect(isFirstLessonContext({ ...LEARNER, phase: 'GUIDE' })).toBe(true)
      expect(isFirstLessonContext({ ...LEARNER, phase: 'PRACTICE' })).toBe(false)
    }
  })
})
