/**
 * A MODEL-WRITTEN KEY DOES NOT MOVE THE LEARNER (owner option (b), 2026-10-03).
 *
 * Measured in production QA (math.cat.functor): the learner tapped "image f(S)"
 * — right — on a model-written question whose invented key said otherwise. The
 * grade became the turn's signal: the ladder dropped GUIDE → DEMONSTRATE, CUE
 * fired D2b-CONFIDENT-WRONG, and the prompt told the model the answer was WRONG.
 * Certification was already withheld for such keys; the state move was not.
 *
 * The evidence below is built exactly as the route builds it
 * (`signalCorrect: teachingSignal?.correctness ?? null`,
 *  `misconceptionDetected: teachingSignal?.phrase !== undefined`).
 */
import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { signalFromGrade, modelKeyIsolated } from '@/lib/teaching/mcq'
import {
  advanceConversationState,
  initialConversationState,
  type ConversationState,
  type TurnEvidence,
} from '@/lib/teaching/conversationState'
import type { TeachingSignal } from '@/lib/teaching/signals'

const evidenceFrom = (s: TeachingSignal): TurnEvidence => ({
  askedQuestion: false,
  signalCorrect: s.correctness ?? null,
  signalConfidence: s.confidence,
  misconceptionDetected: s.phrase !== undefined,
  recoveryFired: false,
  acknowledgement: false,
} as TurnEvidence)

const at = (phase: ConversationState['phase']): ConversationState =>
  ({ ...initialConversationState('math.cat.functor'), phase, demonstrated: true })

const MODEL_KEY = true     // isolated: a model-written key in Mathematics
const AUTHORED_KEY = false // not isolated: the grade is ground truth

describe('1 — correct learner answer, faulty model key (graded wrong)', () => {
  // The model's own signal tag agrees with its own wrong key.
  const tag: TeachingSignal = { correctness: false, confidence: 'high', phrase: 'It sends each subset S⊆A to its image f(S) in B' }
  const s = signalFromGrade(tag, { correct: false }, MODEL_KEY, 2_000)

  it('the signal carries no verdict, no confidence and no misconception', () => {
    expect(s.correctness).toBeUndefined()
    expect(s.confidence).toBeUndefined()
    expect(s.phrase).toBeUndefined()
  })

  it('the learner is not dropped back a phase and no failure is counted', () => {
    const prev = at('GUIDE')
    const next = advanceConversationState(prev, evidenceFrom(s))
    expect(next.phase).toBe('GUIDE')
    expect(next.misconceptionDetectedThisLesson ?? false).toBe(false)
    expect(next.consecutiveFailures ?? 0).toBe(prev.consecutiveFailures ?? 0)
  })

  it('the same grade from an authored key still drops the phase, as before', () => {
    const authored = signalFromGrade(tag, { correct: false }, AUTHORED_KEY, 2_000)
    expect(authored.correctness).toBe(false)
    const next = advanceConversationState(at('CHECK'), evidenceFrom(authored))
    expect(next.phase).not.toBe('PRACTICE')
  })
})

describe('2 — wrong learner answer, faulty model key (graded right)', () => {
  const s = signalFromGrade({ correctness: true }, { correct: true }, MODEL_KEY, 2_000)

  it('no credit moves: no counter, no advance, at a gate or below it', () => {
    expect(s.correctness).toBeUndefined()
    const check = advanceConversationState(at('CHECK'), evidenceFrom(s))
    expect(check.phase).toBe('CHECK')
    expect(check.correctAtCheck ?? 0).toBe(0)
    expect(check.verifiedCorrectAtCheck ?? 0).toBe(0)
    const guide = advanceConversationState(at('GUIDE'), evidenceFrom(s))
    expect(guide.phase).toBe('GUIDE')
  })

  it('the same grade from an authored key still advances and counts, as before', () => {
    const authored = signalFromGrade(null, { correct: true }, AUTHORED_KEY, 2_000)
    expect(authored).toEqual({ correctness: true, confidence: 'high' })
    const next = advanceConversationState(at('CHECK'), evidenceFrom(authored))
    expect(next.phase).toBe('PRACTICE')
    expect(next.correctAtCheck).toBe(1)
  })
})

describe('3 — a model-written question with a false premise', () => {
  // math.num.newtons-method, production QA: "For f(x)=x³−2x, which root will
  // Newton's method converge quadratically?" with "x = 0 (a double root)" —
  // all three roots are simple. Whatever the learner picks, the key is unsound.
  const tag: TeachingSignal = { correctness: false, confidence: 'high', phrase: 'x = √2 (a simple root)', confusion: false }

  for (const correct of [true, false]) {
    it(`graded ${correct ? 'right' : 'wrong'}: no state moves and no misconception is recorded`, () => {
      const s = signalFromGrade(tag, { correct }, MODEL_KEY, 9_000)
      const prev = at('GUIDE')
      const next = advanceConversationState(prev, evidenceFrom(s))
      expect(next.phase).toBe('GUIDE')
      expect(next.misconceptionDetectedThisLesson ?? false).toBe(false)
      expect(s.confusion).toBe(false) // what the model read from the message is kept
    })
  }
})

describe('scope: Mathematics, model-written keys only', () => {
  const model = { question: 'q', options: ['a', 'b'], correctIndex: 0 } as never
  const authored = { question: 'q', options: ['a', 'b'], correctIndex: 0, assetId: 'a1' } as never
  it('isolates a model key in mathematics', () => expect(modelKeyIsolated(model, 'mathematics')).toBe(true))
  it('never isolates an authored key', () => expect(modelKeyIsolated(authored, 'mathematics')).toBe(false))
  it('leaves other subjects on their documented rule', () => {
    for (const s of ['english', 'physics', 'chemistry', 'biology', null]) expect(modelKeyIsolated(model, s)).toBe(false)
  })
})

describe('the chat route uses it at every place a grade becomes learner state', () => {
  const ROUTE = readFileSync(join(process.cwd(), 'src/app/api/learn/chat/route.ts'), 'utf8')

  it('the turn signal comes from signalFromGrade with the key provenance', () => {
    expect(ROUTE).toMatch(/teachingSignal = signalFromGrade\(teachingSignal, mcqGradedThisTurn, signalKeyIsolated\(pendingMcqHoisted, learnSession\.subject\.slug\), latencyMs\)/)
  })

  it("CUE's last signal ignores a model-written key", () => {
    expect(ROUTE).toMatch(/cueKeyIsolated\(pendingMcqHoisted, learnSession\.subject\.slug\)\s*\?\s*null/)
  })

  it('the prompt names no verdict for a model-written key', () => {
    const at = ROUTE.indexOf("answeredQuestionReminderHoisted = !reminderKeyIsolated(pendingMcqHoisted, learnSession.subject.slug)")
    expect(at).toBeGreaterThan(0)
    expect(ROUTE.slice(at, at + 1200)).toMatch(/do NOT tell the learner they are right or wrong/)
  })
})
