/**
 * PRODUCTION SYMPTOMS — the tutor did not speed up for a learner who was
 * clearly succeeding:
 *
 *   3. "Even after many consecutive correct answers the tutor still behaves
 *       like the student is a beginner."
 *   4. "Responses are unnecessarily long — textbook-sized paragraphs where two
 *       or three concise paragraphs would teach equally well."
 *   1. One response introduces several new concepts (a long budget is what
 *      leaves room for several mini-lessons in one turn).
 *
 * ROOT CAUSE — the single owner of explanation length had no success term.
 *
 *   routeMaxParagraphsHoisted =
 *     firstLessonActive ? 2 : responseBudget(contentRegister, consecutiveFailures)
 *
 *   · contentRegister is a pure function of the PROFILE — resolveContentRegister
 *     reads grade / currentLevel / targetLevel, all static onboarding values,
 *     never re-derived from performance.
 *   · consecutiveFailures only ever registers STRUGGLE.
 *
 * So no amount of demonstrated success could move the budget. A learner who
 * self-reported beginner kept a 4-paragraph budget after twenty correct
 * answers, and an expert who was never struggling had NO budget at all (null).
 *
 * Ownership itself was sound and is unchanged: routeMaxParagraphsHoisted is the
 * only value the route applies. The other maxParagraphs values in route.ts
 * (k.budgets / gate.decision.budgets) feed compareDecisions() for parity
 * measurement only. The fix adds the missing INPUT to the existing owner.
 */
import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { responseBudget, type Register } from '@/lib/teaching/conversationState'
import { resolveContentRegister } from '@/lib/teaching/assets/studentState'

const REGISTERS: Register[] = ['beginner', 'intermediate', 'expert']
const ROUTE = readFileSync('src/app/api/learn/chat/route.ts', 'utf8')

describe('pacing responds to demonstrated mastery', () => {
  it('a fluent learner gets a shorter budget than a fresh one, in every register', () => {
    for (const reg of REGISTERS) {
      const fresh = responseBudget(reg, 0, 0)
      const fluent = responseBudget(reg, 0, 2)
      if (fresh === null) {
        // expert: unbounded until they demonstrate — then bounded.
        expect(fluent, reg).not.toBeNull()
      } else {
        expect(fluent, reg).not.toBeNull()
        expect(fluent!, reg).toBeLessThan(fresh)
      }
    }
  })

  it('the reported case: a self-reported beginner who keeps answering correctly', () => {
    // The static register never changes — that is the point.
    expect(resolveContentRegister({ currentLevel: 'beginner' })).toBe('beginner')
    expect(responseBudget('beginner', 0, 0)).toBe(4)   // before any evidence
    expect(responseBudget('beginner', 0, 2)).toBe(2)   // after demonstrated success
    expect(responseBudget('beginner', 0, 20)).toBe(2)  // and it stays tight
  })

  it('an expert who is succeeding is no longer unbounded', () => {
    expect(responseBudget('expert', 0, 0)).toBeNull()
    expect(responseBudget('expert', 0, 2)).toBe(6)
  })

  it('budgets are monotonic in demonstrated success — never longer', () => {
    for (const reg of REGISTERS) {
      let prev = responseBudget(reg, 0, 0) ?? Number.POSITIVE_INFINITY
      for (let correct = 1; correct <= 6; correct++) {
        const next = responseBudget(reg, 0, correct) ?? Number.POSITIVE_INFINITY
        expect(next, `${reg} @${correct}`).toBeLessThanOrEqual(prev)
        prev = next
      }
    }
  })
})

describe('struggle still wins, and its behaviour is unchanged', () => {
  it('the pre-existing struggle budgets are byte-identical', () => {
    // Default third argument keeps every historical call the same.
    expect(responseBudget('beginner', 0)).toBe(4)
    expect(responseBudget('beginner', 2)).toBe(2)
    expect(responseBudget('intermediate', 0)).toBe(7)
    expect(responseBudget('intermediate', 3)).toBe(4)
    expect(responseBudget('expert', 0)).toBeNull()
    expect(responseBudget('expert', 2)).toBe(6)
  })

  it('a learner who succeeded and is NOW failing is treated as struggling', () => {
    // Struggle is about now, not history.
    for (const reg of REGISTERS) {
      expect(responseBudget(reg, 2, 5), reg).toBe(responseBudget(reg, 2, 0))
    }
  })

  it('one correct answer is not yet evidence — the >= 2 threshold is reused', () => {
    // Same "repeated evidence" threshold the runtime already uses for struggle,
    // worked-example-first and remediation gating. No new number.
    for (const reg of REGISTERS) {
      expect(responseBudget(reg, 0, 1), reg).toBe(responseBudget(reg, 0, 0))
    }
  })

  it('is total — negative or absurd counters never throw or lengthen', () => {
    expect(() => responseBudget('beginner', -1, -5)).not.toThrow()
    expect(responseBudget('beginner', 0, -5)).toBe(4)
    expect(responseBudget('beginner', 0, Number.MAX_SAFE_INTEGER)).toBe(2)
  })
})

describe('the owner is fed from the canonical mastery counters', () => {
  it('the route passes correctAtCheck + correctAtPractice', () => {
    expect(ROUTE).toContain(
      'conversationStateHoisted.correctAtCheck + conversationStateHoisted.correctAtPractice',
    )
  })

  it('no second mastery model was introduced', () => {
    // The counters come from ConversationState, the existing owner of
    // demonstrated mastery — not from a new store or a duplicate counter.
    const call = ROUTE.slice(ROUTE.indexOf(': responseBudget('), ROUTE.indexOf(': responseBudget(') + 700)
    expect(call).toContain('conversationStateHoisted.consecutiveFailures')
    expect(call).toContain('conversationStateHoisted.correctAtCheck')
  })

  it('the kernel shadow mirrors the shipping formula exactly', () => {
    // parity.ts warns that a shadow passing different inputs reports a
    // divergence that is not real.
    const policy = readFileSync('src/lib/kernel/stages/policy.ts', 'utf8')
    expect(policy).toContain('counters.correctAtCheck')
    expect(policy).toContain('counters.correctAtPractice')
  })

  it('the first-lesson override still wins over the register budget', () => {
    expect(ROUTE).toMatch(/routeMaxParagraphsHoisted = firstLessonActiveHoisted\s*\n?\s*\? 2/)
  })
})
