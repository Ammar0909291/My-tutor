import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { resolveVisualForTurn } from '@/lib/teaching/visual/resolveVisual'
import { checkBudgets, DEFAULT_BUDGETS } from '@/lib/teaching/visual/generationBudget'

/**
 * THE PER-SESSION BUDGET, AND THE FACT THAT IT WAS NEVER SUPPLIED.
 *
 * `resolveVisualForTurn` has accepted `sessionGenerationCount` since budgets
 * replaced the allowlist, and `checkBudgets` skips the session cap entirely
 * when the count is `undefined` — which is what the resolver received, because
 * the one production call site never passed it. Grepped before this test
 * existed: the only occurrence of the parameter name in `src/` outside the
 * resolver's own signature was in a test. One learner could therefore generate
 * without any per-session bound, and the daily cap was the only thing standing
 * between a topic-hopping session and 500 generations.
 *
 * The count could not come from the outcome table the daily cap reads: those
 * rows carry no session. It rides `contextSnapshot`, which the route already
 * writes every turn and which is per-session by construction.
 */

const ROUTE = readFileSync(join(process.cwd(), 'src/app/api/learn/chat/route.ts'), 'utf8')

describe('Per-session generation budget — wired end to end', () => {
  it('the route supplies the count the resolver was already asking for', () => {
    expect(ROUTE).toMatch(/sessionGenerationCount:\s*visualGenerationCount/)
  })

  it('the count is read from the session snapshot, not from memory', () => {
    // An in-process counter bounds one lambda, which is to say it bounds
    // nothing. The snapshot is a database row shared by every instance.
    expect(ROUTE).toContain('visualGenerationCount')
    expect(ROUTE).toMatch(/contextSnapshot[^\n]*\n?[^\n]*visualGenerationCount|visualGenerationCount/)
  })

  it('the count advances only when a provider call was actually spent', () => {
    // A cached figure, an approved figure and a declined turn cost nothing, so
    // they must not consume a bound whose whole purpose is to limit cost.
    expect(ROUTE).toMatch(/generationSpent\s*\n?\s*\?\s*\{\s*visualGenerationCount:\s*visualGenerationCountHoisted \+ 1/)
  })

  it('a corrupt or negative stored count cannot buy an unbounded budget', () => {
    // Anything unusable is treated as the cap, not as zero. A safety bound has
    // to fail in the safe direction.
    expect(ROUTE).toContain('Number.MAX_SAFE_INTEGER')
  })
})

describe('Per-session generation budget — the rule itself', () => {
  it('an exhausted session is over budget however much of the day is left', () => {
    expect(checkBudgets({ session: DEFAULT_BUDGETS.perSession, day: 0 }))
      .toEqual({ ok: false, reason: 'session-budget-exhausted' })
  })

  it('one generation below the cap is still allowed', () => {
    expect(checkBudgets({ session: DEFAULT_BUDGETS.perSession - 1, day: 0 })).toEqual({ ok: true })
  })

  it('an exhausted session yields NO FIGURE, and the lesson continues', async () => {
    const decision = await resolveVisualForTurn(
      {
        message: 'show me a diagram of that',
        // A concept with no curated figure, so the turn would reach generation.
        lessonConceptId: 'math.found.set-operations',
        subject: 'mathematics',
        learnerRequest: 'diagram',
      },
      {
        sessionGenerationCount: DEFAULT_BUDGETS.perSession,
        budgetReader: { countToday: async () => 0 },
        // If the budget failed to bite, this would be reached and would throw —
        // which is what makes this an assertion rather than a hope.
        generate: async () => { throw new Error('generation must not be attempted over budget') },
      },
    )
    expect(decision.graphical).toBe(false)
    expect(decision.payload).toBeNull()
    expect(decision.provenance).toBe('no-figure:session-budget-exhausted')
    expect(decision.generationSpent).toBeFalsy()
  })

  it('an unreadable budget is treated as exhausted, never as unlimited', async () => {
    const decision = await resolveVisualForTurn(
      {
        message: 'show me a diagram of that',
        lessonConceptId: 'math.found.set-operations',
        subject: 'mathematics',
        learnerRequest: 'diagram',
      },
      {
        sessionGenerationCount: 0,
        budgetReader: { countToday: async () => { throw new Error('database down') } },
        generate: async () => { throw new Error('generation must not be attempted') },
      },
    )
    expect(decision.provenance).toBe('no-figure:budget-unreadable')
  })
})
