/**
 * Production Replay Regression Tests — pins the 13 originally-reported
 * failing conversation patterns to ensure they stay fixed.
 *
 * Each test exercises the REAL CUE → Decision Engine → Dispatcher →
 * Execution pipeline and the conversationState machine for the specific
 * multi-turn conversation that exposed each bug.
 */
import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { understandStudentTurn, type UnderstandingInputs } from '@/lib/understanding'
import { decideTeaching } from '@/lib/understanding/decisionEngine'
import { planDispatch, isBrainRuntimeEnabled, legacyDecisionBlocksSuppressed } from '@/lib/understanding/dispatcher'
import { buildBrainExecutionBlock } from '@/lib/understanding/execution'
import { detectFailureState } from '@/lib/teaching/recoveryGuard'
import {
  readConversationState, advanceConversationState, decideNextMove,
  isPriorKnowledgeProbe, repliesWithQuestion,
  type ConversationState,
} from '@/lib/teaching/conversationState'

function inputs(overrides: Partial<UnderstandingInputs> = {}): UnderstandingInputs {
  return {
    message: '', history: [], recoveryKey: null, firstLessonActive: false,
    lastSignal: null, sessionFailureCount: 0, episode: null, freshBoundary: false,
    lastSuccessfulTeachingStyle: null, conceptId: null, placement: null,
    pendingPlacementProbe: null, dueReviewCount: 0, strategyType: null,
    evidenceMove: null, assembled: null, memoryFallbackReason: null,
    observations: {}, consecutivePriorKnowledgeProbes: 0,
    ...overrides,
  }
}

beforeEach(() => { process.env.ENABLE_BRAIN_RUNTIME = '1' })
afterEach(() => { delete process.env.ENABLE_BRAIN_RUNTIME })

describe('Production Replay Regression — Brain ON fixes all 13 reported bugs', () => {

  it('BUG-01: "I don\'t know" triggers recovery, not more probing', () => {
    const recovery = detectFailureState("I don't know")
    expect(recovery).toBe('dont_know')
    const decision = decideTeaching(understandStudentTurn(inputs({
      message: "I don't know",
      recoveryKey: 'dont_know',
      sessionFailureCount: 1,
    })))
    expect(decision.ruleId).toBe('D0-RECOVERY-PREEMPT')
  })

  it('BUG-01: repeated "I don\'t know" with failures → REVIEW_PREREQUISITE, not more questions', () => {
    const decision = decideTeaching(understandStudentTurn(inputs({
      message: "I really don't know, just tell me",
      sessionFailureCount: 2,
      conceptId: 'phys.mech.newtons-first-law',
    })))
    expect(decision.decision).toBe('REVIEW_PREREQUISITE')
    const convState = readConversationState(null, 'phys.mech.newtons-first-law')
    const state: ConversationState = { ...convState, consecutiveFailures: 2 }
    const nextMove = decideNextMove(state, { recoveryTurn: false, workedExampleFirst: true })
    expect(nextMove).toBe('show')
  })

  it('BUG-02: "explain differently" does NOT trigger recovery — routes to D4b', () => {
    const recovery = detectFailureState("I don't understand. Can you explain it differently?")
    expect(recovery).toBeNull()
    const decision = decideTeaching(understandStudentTurn(inputs({
      message: "I don't understand. Can you explain it differently?",
      recoveryKey: null,
      history: [{ role: 'assistant', content: 'A fraction represents a part of a whole.' }],
    })))
    expect(decision.ruleId).toBe('D4b-ANSWER-STUDENT-FIRST')
  })

  it('BUG-03: student question mid-lesson → D4b-ANSWER-STUDENT-FIRST', () => {
    const decision = decideTeaching(understandStudentTurn(inputs({
      message: 'Wait, what exactly is acceleration? Is it the same as speed?',
      history: [{ role: 'assistant', content: "Newton's second law states F = ma." }],
    })))
    expect(decision.ruleId).toBe('D4b-ANSWER-STUDENT-FIRST')
    expect(legacyDecisionBlocksSuppressed()).toBe(true)
  })

  it('BUG-04: semantic loop detected after 2+ prior-knowledge probes → TEACH_DIRECTLY', () => {
    const decision = decideTeaching(understandStudentTurn(inputs({
      message: 'Not really, no',
      consecutivePriorKnowledgeProbes: 2,
      history: [
        { role: 'assistant', content: 'Have you heard of atoms? What do you know about them?' },
        { role: 'user', content: 'Not really' },
        { role: 'assistant', content: 'Can you think of what the smallest piece of something might be?' },
      ],
    })))
    expect(decision.ruleId).toBe('D0e-QUESTION-LOOP-BREAK')
    expect(decision.decision).toBe('TEACH_DIRECTLY')
  })

  it('BUG-05: repeated "Have you seen..." probes → D0e-QUESTION-LOOP-BREAK', () => {
    const decision = decideTeaching(understandStudentTurn(inputs({
      message: "No, I haven't learned this",
      consecutivePriorKnowledgeProbes: 2,
      history: [
        { role: 'assistant', content: 'Have you heard about cells before?' },
        { role: 'user', content: 'No' },
        { role: 'assistant', content: 'Can you think of what the building blocks of living things might be?' },
      ],
    })))
    expect(decision.ruleId).toBe('D0e-QUESTION-LOOP-BREAK')
  })

  it('BUG-06: first answer with no prior signal → D8-LLM-FLOOR + legacy suppressed', () => {
    const decision = decideTeaching(understandStudentTurn(inputs({
      message: '12',
      history: [{ role: 'assistant', content: 'What is 7 + 5?' }],
    })))
    expect(decision.decision).toBe('ESCALATE_TO_LLM')
    expect(legacyDecisionBlocksSuppressed()).toBe(true)
  })

  it('BUG-07: after Q&A detour, phase tracks progress — no restart', () => {
    let state = readConversationState(null, 'phys.mech.velocity')
    state = advanceConversationState(state, {
      askedQuestion: false, signalCorrect: null, recoveryFired: false, isPriorKnowledgeProbe: false,
    })
    state = advanceConversationState(state, {
      askedQuestion: true, signalCorrect: true, recoveryFired: false, isPriorKnowledgeProbe: false,
    })
    expect(state.phase).not.toBe('OBSERVE')
  })

  it('BUG-08: "too_many_questions" recovery fires → D0-RECOVERY-PREEMPT', () => {
    const recovery = detectFailureState('Why do you keep asking me questions? Just teach me')
    expect(recovery).toBe('too_many_questions')
    const decision = decideTeaching(understandStudentTurn(inputs({
      message: 'Why do you keep asking me questions? Just teach me',
      recoveryKey: 'too_many_questions',
    })))
    expect(decision.ruleId).toBe('D0-RECOVERY-PREEMPT')
  })

  it('BUG-08: question budget forces SHOW after 2 asks without teaching', () => {
    let state = readConversationState(null, 'eng.phonics.letter-sound-correspondence')
    state = advanceConversationState(state, {
      askedQuestion: true, signalCorrect: null, recoveryFired: false, isPriorKnowledgeProbe: false,
    })
    state = advanceConversationState(state, {
      askedQuestion: true, signalCorrect: null, recoveryFired: false, isPriorKnowledgeProbe: false,
    })
    expect(state.questionsAskedSinceTeach).toBe(2)
    const nextMove = decideNextMove(state, { recoveryTurn: false, workedExampleFirst: false })
    expect(nextMove).not.toBe('ask')
  })

  it('BUG-09: Brain ON produces ONE authority, legacy suppressed', () => {
    expect(isBrainRuntimeEnabled()).toBe(true)
    expect(legacyDecisionBlocksSuppressed()).toBe(true)
    const decision = decideTeaching(understandStudentTurn(inputs({
      message: '12',
      lastSignal: { correctness: true },
      history: [
        { role: 'assistant', content: 'Multiplication is repeated addition. What is 2 × 5?' },
        { role: 'user', content: '10' },
        { role: 'assistant', content: 'Correct! What is 4 × 3?' },
      ],
    })))
    expect(decision.decision).toBe('CONTINUE_LESSON')
    const plan = planDispatch(decision, { assembledAvailable: false })
    const block = buildBrainExecutionBlock(plan, decision)
    expect(block).toContain('BRAIN DECISION')
  })

  it('BUG-10: phase machine prevents re-starting from OBSERVE after progress', () => {
    let state = readConversationState(null, 'phys.mech.force')
    state = advanceConversationState(state, {
      askedQuestion: true, signalCorrect: null, recoveryFired: false, isPriorKnowledgeProbe: false,
    })
    state = advanceConversationState(state, {
      askedQuestion: false, signalCorrect: true, recoveryFired: false, isPriorKnowledgeProbe: false,
    })
    expect(state.phase).toBe('DEMONSTRATE')
    state = advanceConversationState(state, {
      askedQuestion: false, signalCorrect: null, recoveryFired: false, isPriorKnowledgeProbe: false,
    })
    expect(state.phase).toBe('DEMONSTRATE')
  })

  it('BUG-11: follow-up question → D4b-ANSWER-STUDENT-FIRST', () => {
    const decision = decideTeaching(understandStudentTurn(inputs({
      message: 'That makes sense. What are the groups?',
      lastSignal: { correctness: true },
      history: [
        { role: 'assistant', content: 'The periodic table organizes elements.' },
        { role: 'user', content: 'So elements in the same column are similar?' },
        { role: 'assistant', content: 'Exactly! Elements in the same column share similar properties.' },
      ],
    })))
    expect(decision.ruleId).toBe('D4b-ANSWER-STUDENT-FIRST')
  })

  it('BUG-12: consecutive failures ≥ 2 → nextMove forced to SHOW', () => {
    const state = readConversationState(null, 'math.arith.subtraction')
    const withFailures: ConversationState = { ...state, consecutiveFailures: 2 }
    const nextMove = decideNextMove(withFailures, { recoveryTurn: false, workedExampleFirst: false })
    expect(nextMove).toBe('show')
  })

  it('BUG-12: sessionFailureCount ≥ 2 → D3-PREREQ-REVIEW (stop asking, demonstrate)', () => {
    const decision = decideTeaching(understandStudentTurn(inputs({
      message: '6?',
      lastSignal: { correctness: false },
      sessionFailureCount: 2,
      conceptId: 'math.arith.subtraction',
      history: [{ role: 'assistant', content: 'What is 15 - 9?' }],
    })))
    expect(decision.decision).toBe('REVIEW_PREREQUISITE')
  })

  it('BUG-13: "I don\'t know" after wrong answers → recovery preempts, nextMove=teach', () => {
    const recovery = detectFailureState("I don't know. Maybe 3?")
    expect(recovery).toBe('dont_know')
    const decision = decideTeaching(understandStudentTurn(inputs({
      message: "I don't know. Maybe 3?",
      recoveryKey: 'dont_know',
      sessionFailureCount: 2,
      lastSignal: { correctness: false },
    })))
    expect(decision.ruleId).toBe('D0-RECOVERY-PREEMPT')
    const state = readConversationState(null, 'math.arith.division')
    const nextMove = decideNextMove(state, { recoveryTurn: true, workedExampleFirst: false })
    expect(nextMove).toBe('teach')
  })

  it('isPriorKnowledgeProbe detects "Have you seen/heard" patterns', () => {
    expect(isPriorKnowledgeProbe('Have you heard about cells before?')).toBe(true)
    expect(isPriorKnowledgeProbe('Can you think of what the building blocks might be?')).toBe(true)
    expect(isPriorKnowledgeProbe('Do you know what a cell is?')).toBe(true)
    expect(isPriorKnowledgeProbe('Here is how cells work: they divide.')).toBe(false)
  })

  it('repliesWithQuestion correctly detects questions in assistant text', () => {
    expect(repliesWithQuestion('What is 7 + 5?')).toBe(true)
    expect(repliesWithQuestion('Great job! The answer is 12.')).toBe(false)
  })
})
