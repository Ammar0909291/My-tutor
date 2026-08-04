import { describe, it, expect } from 'vitest'
import {
  advanceConversationState, initialConversationState,
  type ConversationState, type TurnEvidence,
} from '@/lib/teaching/conversationState'
import {
  CONCEPT_TURN_BUDGET, MAX_TEACHING_ATTEMPTS, MAX_CONSECUTIVE_FAILURES,
  evaluateConceptBudget, hasDemonstratedMastery, questionPurpose, buildLessonFlowBlock,
} from '@/lib/teaching/conceptBudget'
import {
  conceptOutcome, buildLessonSummary, buildLessonSummaryBlock,
} from '@/lib/teaching/lessonSummary'

function st(over: Partial<ConversationState> = {}): ConversationState {
  return { ...initialConversationState('c1'), ...over }
}
function ev(over: Partial<TurnEvidence> = {}): TurnEvidence {
  return { askedQuestion: false, signalCorrect: null, recoveryFired: false, ...over }
}

describe('turnsOnConcept — the counter the budget needs', () => {
  it('starts at zero and increments per real turn', () => {
    let s = st()
    expect(s.turnsOnConcept).toBe(0)
    s = advanceConversationState(s, ev())
    s = advanceConversationState(s, ev())
    expect(s.turnsOnConcept).toBe(2)
  })

  it('does not count a degraded turn — it taught nothing', () => {
    let s = st()
    s = advanceConversationState(s, ev({ degradedTurn: true }))
    expect(s.turnsOnConcept).toBe(0)
  })

  it('resets when the concept changes, via readConversationState', async () => {
    const { readConversationState } = await import('@/lib/teaching/conversationState')
    const spent = st({ turnsOnConcept: 9 })
    expect(readConversationState(spent, 'a-different-concept').turnsOnConcept).toBe(0)
  })
})

describe('evaluateConceptBudget', () => {
  it('is ok early in a concept', () => {
    const b = evaluateConceptBudget(st({ turnsOnConcept: 1 }))
    expect(b.status).toBe('ok')
    expect(b.reason).toBeNull()
    expect(b.markForReview).toBe(false)
  })

  it('warns before cutting off, so the concept can be closed deliberately', () => {
    expect(evaluateConceptBudget(st({ turnsOnConcept: CONCEPT_TURN_BUDGET - 1 })).status)
      .toBe('final_attempt')
  })

  it('exhausts on turns and marks for review', () => {
    const b = evaluateConceptBudget(st({ turnsOnConcept: CONCEPT_TURN_BUDGET }))
    expect(b.status).toBe('exhausted')
    expect(b.reason).toBe('turns')
    expect(b.markForReview).toBe(true)
  })

  it('exhausts on teaching attempts', () => {
    const b = evaluateConceptBudget(st({ remediationCount: MAX_TEACHING_ATTEMPTS }))
    expect(b.status).toBe('exhausted')
    expect(b.reason).toBe('attempts')
  })

  it('exhausts on consecutive failures', () => {
    const b = evaluateConceptBudget(st({ consecutiveFailures: MAX_CONSECUTIVE_FAILURES }))
    expect(b.status).toBe('exhausted')
    expect(b.reason).toBe('failures')
  })

  it('never marks a MASTERED concept for review, however slow it was', () => {
    // The critical case: a learner who struggled but got there must not be
    // told the thing they just proved needs review.
    const b = evaluateConceptBudget(st({
      turnsOnConcept: CONCEPT_TURN_BUDGET + 5,
      remediationCount: 9,
      consecutiveFailures: 0,
      correctAtPractice: 2,
    }))
    expect(b.status).toBe('ok')
    expect(b.markForReview).toBe(false)
  })

  it('reports remaining turns and never goes negative', () => {
    expect(evaluateConceptBudget(st({ turnsOnConcept: 3 })).turnsRemaining)
      .toBe(CONCEPT_TURN_BUDGET - 3)
    expect(evaluateConceptBudget(st({ turnsOnConcept: 999 })).turnsRemaining).toBe(0)
  })
})

describe('hasDemonstratedMastery — server-owned evidence only', () => {
  it('requires real practice evidence or the transfer phase', () => {
    expect(hasDemonstratedMastery(st())).toBe(false)
    expect(hasDemonstratedMastery(st({ correctAtPractice: 1 }))).toBe(false)
    expect(hasDemonstratedMastery(st({ correctAtPractice: 2 }))).toBe(true)
    expect(hasDemonstratedMastery(st({ phase: 'TRANSFER' }))).toBe(true)
  })

  it('is not satisfied by explanations alone', () => {
    expect(hasDemonstratedMastery(st({ explanationCount: 50, demonstrated: true }))).toBe(false)
  })
})

describe('questionPurpose — every question has a reason', () => {
  it('derives a purpose from each phase', () => {
    expect(questionPurpose(st({ phase: 'OBSERVE' }))).toBe('diagnostic')
    expect(questionPurpose(st({ phase: 'DEMONSTRATE' }))).toBe('understanding_check')
    expect(questionPurpose(st({ phase: 'PRACTICE' }))).toBe('mastery_verification')
    expect(questionPurpose(st({ phase: 'TRANSFER' }))).toBe('transfer')
  })

  it('lets an active misconception outrank the ladder', () => {
    expect(questionPurpose(st({
      phase: 'PRACTICE', misconceptionDetectedThisLesson: true, consecutiveFailures: 1,
    }))).toBe('misconception_repair')
  })

  it('does not claim repair when nothing is currently failing', () => {
    expect(questionPurpose(st({
      phase: 'PRACTICE', misconceptionDetectedThisLesson: true, consecutiveFailures: 0,
    }))).toBe('mastery_verification')
  })
})

describe('buildLessonFlowBlock', () => {
  it('names the purpose of the next question', () => {
    expect(buildLessonFlowBlock(st({ phase: 'OBSERVE' }))).toMatch(/already know/)
  })

  it('stops teaching a mastered concept', () => {
    const block = buildLessonFlowBlock(st({ correctAtPractice: 2 }))
    expect(block).toMatch(/DEMONSTRATED/)
    expect(block).toMatch(/move to the next concept/)
  })

  it('forbids repeating the failed explanation, and lists what was used', () => {
    const block = buildLessonFlowBlock(st({
      consecutiveFailures: 1,
      analogiesUsed: ['pizza slices'],
      demonstrationsShown: ['bar model'],
    }))
    expect(block).toMatch(/Do NOT repeat the explanation that failed/)
    expect(block).toMatch(/DIFFERENT way/)
    expect(block).toContain('pizza slices')
    expect(block).toContain('bar model')
    expect(block).toMatch(/NEW multiple-choice question/)
  })

  it('announces the final attempt', () => {
    expect(buildLessonFlowBlock(st({ turnsOnConcept: CONCEPT_TURN_BUDGET - 1 })))
      .toMatch(/LAST attempt/)
  })

  it('closes the concept and moves on when the budget is spent', () => {
    const block = buildLessonFlowBlock(st({ turnsOnConcept: CONCEPT_TURN_BUDGET }))
    expect(block).toMatch(/budget for this concept is SPENT/)
    expect(block).toMatch(/move to the next concept/)
    expect(block).toMatch(/Do NOT ask another question/)
  })

  it('does not tell a mastered concept it is out of budget', () => {
    const block = buildLessonFlowBlock(st({
      turnsOnConcept: CONCEPT_TURN_BUDGET + 3, correctAtPractice: 2,
    }))
    expect(block).not.toMatch(/SPENT/)
  })
})

describe('lesson summary — from demonstrated evidence', () => {
  it('reports a mastered concept as mastered', () => {
    const o = conceptOutcome(st({ conceptId: 'frac', correctAtPractice: 2 }), 'Fractions')
    expect(o.status).toBe('mastered')
    expect(o.title).toBe('Fractions')
  })

  it('reports an exhausted concept as needing review, not as done', () => {
    const o = conceptOutcome(st({ conceptId: 'frac', turnsOnConcept: 99 }), 'Fractions')
    expect(o.status).toBe('needs_review')
  })

  it('counts a misconception as corrected only when mastery followed', () => {
    const fixed = conceptOutcome(st({ correctAtPractice: 2, misconceptionsSeen: ['m1'] }))
    expect(fixed.misconceptionsCorrected).toBe(true)
    const notFixed = conceptOutcome(st({ misconceptionsSeen: ['m1'] }))
    expect(notFixed.misconceptionsCorrected).toBe(false)
  })

  it('never falls back to the concept id when no title is known', () => {
    // WAS: expected 'math.x' — this test asserted that an unknown title falls
    // back to the raw concept id. That behaviour was a production defect, not
    // a contract: this `title` is rendered verbatim into the lesson close and
    // the completion card, so internal ids like `chem.found.states-of-matter`
    // were shown to learners. The scenario is kept; the expectation is
    // corrected to the intended behaviour (a generic phrase reads as prose,
    // an id reads as a bug). See src/tests/curriculumLocalization.test.ts for
    // the full id-leak guard across every language.
    const { title } = conceptOutcome(st({ conceptId: 'math.x' }), '  ')
    expect(title).toBe('this concept')
    expect(title).not.toBe('math.x')
  })

  it('aggregates the three required buckets', () => {
    const summary = buildLessonSummary([
      conceptOutcome(st({ conceptId: 'a', correctAtPractice: 2 }), 'A'),
      conceptOutcome(st({ conceptId: 'b', correctAtPractice: 2, misconceptionsSeen: ['m'] }), 'B'),
      conceptOutcome(st({ conceptId: 'c', turnsOnConcept: 99 }), 'C'),
    ])
    expect(summary.mastered.map((o) => o.title)).toEqual(['A', 'B'])
    expect(summary.corrected.map((o) => o.title)).toEqual(['B'])
    expect(summary.needsReview.map((o) => o.title)).toEqual(['C'])
    expect(summary.complete).toBe(false)
  })

  it('is complete only when nothing needs review', () => {
    expect(buildLessonSummary([conceptOutcome(st({ correctAtPractice: 2 }), 'A')]).complete).toBe(true)
    expect(buildLessonSummary([]).complete).toBe(false)
  })

  it('renders the facts and forbids inventing coverage', () => {
    const block = buildLessonSummaryBlock(buildLessonSummary([
      conceptOutcome(st({ conceptId: 'a', correctAtPractice: 2, misconceptionsSeen: ['m'] }), 'A'),
      conceptOutcome(st({ conceptId: 'c', turnsOnConcept: 99 }), 'C'),
    ]))
    expect(block).toMatch(/do NOT add any concept/)
    expect(block).toMatch(/Mastered: A/)
    expect(block).toMatch(/Misconceptions corrected: A/)
    expect(block).toMatch(/Worth another look later: C/)
  })

  it('renders nothing when no concept was attempted', () => {
    expect(buildLessonSummaryBlock(buildLessonSummary([]))).toBe('')
  })

  it('says so honestly when nothing was mastered', () => {
    const block = buildLessonSummaryBlock(buildLessonSummary([
      conceptOutcome(st({ conceptId: 'c', turnsOnConcept: 99 }), 'C'),
    ]))
    expect(block).toMatch(/Nothing reached full mastery/)
  })
})

describe('manual trace — one lesson start to completion', () => {
  it('progresses deterministically and terminates without looping', () => {
    // A learner who struggles, recovers, and finishes.
    let s = initialConversationState('math.arith.fractions')
    const phases: string[] = [s.phase]

    // Teaching turns (no questions) move the delivery ladder forward.
    s = advanceConversationState(s, ev({ signalCorrect: true }))   // OBSERVE -> DEMONSTRATE
    phases.push(s.phase)
    s = advanceConversationState(s, ev())                          // demonstrate -> GUIDE
    phases.push(s.phase)
    s = advanceConversationState(s, ev({ signalCorrect: true }))   // GUIDE -> CHECK
    phases.push(s.phase)
    s = advanceConversationState(s, ev({ askedQuestion: true, signalCorrect: true })) // CHECK -> PRACTICE
    phases.push(s.phase)
    s = advanceConversationState(s, ev({ askedQuestion: true, signalCorrect: true }))
    s = advanceConversationState(s, ev({ askedQuestion: true, signalCorrect: true })) // PRACTICE -> TRANSFER
    phases.push(s.phase)

    expect(phases[0]).toBe('OBSERVE')
    expect(s.phase).toBe('TRANSFER')

    // The lesson ENDS: mastery is demonstrated, budget never traps it.
    expect(hasDemonstratedMastery(s)).toBe(true)
    expect(evaluateConceptBudget(s).markForReview).toBe(false)
    const summary = buildLessonSummary([conceptOutcome(s, 'Fractions')])
    expect(summary.complete).toBe(true)
    // And the flow block stops teaching rather than continuing.
    expect(buildLessonFlowBlock(s)).toMatch(/DEMONSTRATED/)
  })

  it('terminates even when the learner never succeeds — never trapped', () => {
    let s = initialConversationState('math.arith.fractions')
    for (let i = 0; i < 40; i++) {
      s = advanceConversationState(s, ev({ askedQuestion: true, signalCorrect: false }))
    }
    const budget = evaluateConceptBudget(s)
    expect(budget.status).toBe('exhausted')
    expect(budget.markForReview).toBe(true)
    expect(buildLessonFlowBlock(s)).toMatch(/SPENT/)
    // The lesson still completes, honestly reporting the concept for review.
    const summary = buildLessonSummary([conceptOutcome(s, 'Fractions')])
    expect(summary.needsReview).toHaveLength(1)
    expect(buildLessonSummaryBlock(summary)).toMatch(/Worth another look later/)
  })
})
