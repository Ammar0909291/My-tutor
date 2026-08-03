/**
 * TWO OWNERSHIP GAPS CLOSED — both through the TURN DIRECTIVE, the existing
 * canonical owner of what a turn may do.
 *
 * ISSUE 1 — CONCEPT RELEASE. One turn introduced Molarity, Molality, Mole
 * Fraction, ppm, ppb and Dilution. The route has always COMPUTED a new-term
 * budget (contentRegister === 'beginner' ? 1 : 2) but only ever handed it to
 * the flag-gated verifier context and to compareDecisions() for parity. It
 * never reached the served prompt, so nothing bounded how much new material a
 * single turn could open. No owner published it.
 *
 * ISSUE 2 — FOLLOW-UP VARIETY. "How did you figure that out?" repeated
 * constantly. The QUESTION STAGE POLICY already defines the follow-up
 * vocabulary as a 1-7 ladder (Observation, Recognition, Identification, Simple
 * reasoning, Application, Calculation, Transfer) and
 * PHASE_MAX_QUESTION_STAGE already publishes a per-phase CEILING — but nothing
 * ever SELECTED a stage. The directive said only "never ask above N", so the
 * follow-up form was the model's free choice and it settled on one Stage-4
 * reasoning probe. The ladder was the owner all along; it published half its
 * answer.
 *
 * Neither fix adds a teaching system, a per-subject rule, or new state.
 */
import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import {
  selectQuestionStage, buildTurnDirective, initialConversationState,
  PHASE_MAX_QUESTION_STAGE, PHASE_ORDER, type ConversationState, type TeachingPhase,
} from '@/lib/teaching/conversationState'

const ROUTE = readFileSync('src/app/api/learn/chat/route.ts', 'utf8')

function state(over: Partial<ConversationState> = {}): ConversationState {
  return { ...initialConversationState(), conceptId: 'c', ...over }
}
function directive(over: Partial<ConversationState>, extra: Record<string, unknown> = {}): string {
  return buildTurnDirective({
    state: state(over), nextMove: 'ask', maxParagraphs: 3,
    workedExampleFirst: false, visualType: null, ...extra,
  } as never)
}

// ─── ISSUE 1 ────────────────────────────────────────────────────────────────
describe('new-concept release is bounded, and the bound is published', () => {
  it('the directive carries a new-concept budget when one is supplied', () => {
    const d = directive({ phase: 'GUIDE' }, { maxNewTerms: 1 })
    expect(d).toContain('New-concept budget: at most 1 new concept/term this turn')
  })

  it('the budget pluralises correctly for a non-beginner register', () => {
    expect(directive({ phase: 'GUIDE' }, { maxNewTerms: 2 }))
      .toContain('at most 2 new concepts/terms this turn')
  })

  it('it tells the model to defer, not to silently truncate', () => {
    const d = directive({ phase: 'GUIDE' }, { maxNewTerms: 1 })
    expect(d).toMatch(/belongs to a later turn or a later lesson/)
    expect(d).toMatch(/name it in a clause and move on, do not open it/)
  })

  it('omitting it preserves the previous directive exactly', () => {
    expect(directive({ phase: 'GUIDE' })).not.toContain('New-concept budget')
    expect(directive({ phase: 'GUIDE' }, { maxNewTerms: null })).not.toContain('New-concept budget')
  })

  it('the route now passes the value it already computed', () => {
    // It was previously computed only for the verifier context and parity.
    const call = ROUTE.slice(ROUTE.indexOf('systemPrompt += buildTurnDirective({'))
    expect(call.slice(0, 1400)).toContain("maxNewTerms: contentRegister === 'beginner' ? 1 : 2")
  })
})

// ─── ISSUE 2 ────────────────────────────────────────────────────────────────
describe('the question ladder selects a stage, not only a ceiling', () => {
  it('a turn that asks nothing selects no stage', () => {
    expect(selectQuestionStage(state({ phase: 'GUIDE' }), 'teach')).toBeNull()
    expect(selectQuestionStage(state({ phase: 'GUIDE' }), 'show')).toBeNull()
  })

  it('a correct learner climbs the ladder instead of repeating one probe', () => {
    // The reported failure: the same Stage-4 reasoning question every turn.
    const climb = [0, 1, 2, 3, 4].map((correct) =>
      selectQuestionStage(state({ phase: 'PRACTICE', correctAtPractice: correct }), 'ask'))
    // strictly non-decreasing, and it actually moves
    for (let i = 1; i < climb.length; i++) expect(climb[i]!).toBeGreaterThanOrEqual(climb[i - 1]!)
    expect(new Set(climb).size).toBeGreaterThan(1)
    expect(climb.at(-1)!).toBeGreaterThan(climb[0]!)
  })

  it('struggle drops the stage — the policy\'s own "drop one stage lower" rule', () => {
    const ok = selectQuestionStage(state({ phase: 'PRACTICE', correctAtPractice: 3 }), 'ask')!
    const struggling = selectQuestionStage(
      state({ phase: 'PRACTICE', correctAtPractice: 3, consecutiveFailures: 2 }), 'ask')!
    expect(struggling).toBeLessThan(ok)
  })

  it('never exceeds the phase ceiling, for any phase or any amount of success', () => {
    for (const phase of PHASE_ORDER) {
      for (const correct of [0, 1, 5, 50]) {
        const s = selectQuestionStage(state({ phase, correctAtCheck: correct }), 'ask')!
        expect(s, `${phase}@${correct}`).toBeLessThanOrEqual(PHASE_MAX_QUESTION_STAGE[phase])
        expect(s, `${phase}@${correct}`).toBeGreaterThanOrEqual(1)
      }
    }
  })

  it('the structural ban holds — calculation is unreachable before PRACTICE', () => {
    for (const phase of ['OBSERVE', 'DEMONSTRATE', 'GUIDE', 'CHECK'] as TeachingPhase[]) {
      const s = selectQuestionStage(state({ phase, correctAtCheck: 99 }), 'ask')!
      expect(s, phase).toBeLessThan(6)
    }
  })

  it('the directive publishes the selection as a target, not another ceiling', () => {
    const d = directive({ phase: 'PRACTICE', correctAtPractice: 2 })
    expect(d).toMatch(/Question stage THIS TURN: Stage \d/)
    expect(d).toContain('this is the target')
    // the ceiling line is still there — selection is bounded by it
    expect(d).toContain('Question stage ceiling')
  })

  it('is total and pure — absurd counters never throw or escape the ladder', () => {
    expect(() => selectQuestionStage(state({ consecutiveFailures: -5 }), 'ask')).not.toThrow()
    const s = selectQuestionStage(
      state({ phase: 'TRANSFER', correctAtCheck: Number.MAX_SAFE_INTEGER }), 'ask')!
    expect(s).toBe(PHASE_MAX_QUESTION_STAGE.TRANSFER)
    for (let i = 0; i < 3; i++) {
      expect(selectQuestionStage(state({ phase: 'GUIDE', correctAtCheck: 1 }), 'ask')).toBe(
        selectQuestionStage(state({ phase: 'GUIDE', correctAtCheck: 1 }), 'ask'))
    }
  })
})

describe('no second teaching system was introduced', () => {
  it('the selector reads only ConversationState counters and the existing ceiling', () => {
    const src = readFileSync('src/lib/teaching/conversationState.ts', 'utf8')
    const fn = src.slice(src.indexOf('export function selectQuestionStage'))
      .slice(0, src.slice(src.indexOf('export function selectQuestionStage')).indexOf('\n}') + 2)
    expect(fn).toContain('PHASE_MAX_QUESTION_STAGE')
    expect(fn).toContain('correctAtCheck')
    expect(fn).toContain('consecutiveFailures')
    // no new store, no fetch, no clock
    expect(fn).not.toMatch(/prisma|await|Date\.now/)
  })

  it('both bounds are published by the SAME owner — the turn directive', () => {
    const d = directive({ phase: 'PRACTICE', correctAtPractice: 2 }, { maxNewTerms: 2 })
    expect(d).toContain('TURN DIRECTIVE')
    expect(d).toContain('New-concept budget')
    expect(d).toContain('Question stage THIS TURN')
  })
})
