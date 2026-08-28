/**
 * D2b (`studentMemoryReader.ts`'s masteryState === 'misconceiving') reads
 * the LAST GRADED signal, not a state machine — it does not clear itself
 * while the learner is off on an unrelated excursion tangent, because no new
 * signal is produced there. So the Decision Engine kept dispatching
 * DETECT_MISCONCEPTION ("elicit the reasoning, get commitment, collide it")
 * on every excursion turn, fighting the excursion's own "answer the
 * question first" directive.
 *
 * MEASURED (production, 2026-08-27, phys.rel.postulates): masteryState
 * stayed 'misconceiving' through an unrelated arithmetic tangent and
 * produced a stitched turn — an "elicit the reasoning" opener concatenated
 * with a leftover question:
 *
 *   "How did you decide that it was the second postulate? \n\n If you have
 *    7 pencils and you find 3 more, how many pencils do you have now?"
 *
 * FIX: route.ts defers (never drops) D2b specifically while
 * `excursionDecisionHoisted.state.active` is true, by overriding the
 * decision to ESCALATE_TO_LLM (open escalation — the same decision D0's
 * recovery preempt and D0b's closing protect already use to yield the turn
 * to whatever directive already governs it). The underlying signal
 * `decideTeaching` reads is unchanged, so the very next non-excursion turn
 * re-derives the same 'misconceiving' state and D2b fires again.
 */
import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { understandStudentTurn, type UnderstandingInputs } from '@/lib/understanding'
import { decideTeaching } from '@/lib/understanding/decisionEngine'

const ROUTE = readFileSync(
  join(process.cwd(), 'src/app/api/learn/chat/route.ts'),
  'utf8',
)

function inputs(overrides: Partial<UnderstandingInputs> = {}): UnderstandingInputs {
  return {
    message: '',
    history: [],
    recoveryKey: null,
    firstLessonActive: false,
    lastSignal: null,
    sessionFailureCount: 0,
    episode: null,
    freshBoundary: false,
    consecutivePriorKnowledgeProbes: 0,
    lastSuccessfulTeachingStyle: null,
    conceptId: null,
    placement: null,
    pendingPlacementProbe: null,
    dueReviewCount: 0,
    strategyType: null,
    evidenceMove: null,
    assembled: null,
    memoryFallbackReason: null,
    observations: {},
    ...overrides,
  }
}

const CONFIDENT_WRONG = { correctness: false as const, confidence: 'high' as const }

describe('the underlying signal is untouched — decisionEngine.ts itself still fires D2b', () => {
  it('a confident-wrong last answer still dispatches DETECT_MISCONCEPTION / D2b-CONFIDENT-WRONG', () => {
    const d = decideTeaching(understandStudentTurn(inputs({
      message: 'ok',
      lastSignal: CONFIDENT_WRONG,
      conceptId: 'phys.rel.postulates',
    })))
    expect(d.decision).toBe('DETECT_MISCONCEPTION')
    expect(d.ruleId).toBe('D2b-CONFIDENT-WRONG')
  })

  it('this is unchanged by the fix — decisionEngine.ts carries no excursion awareness at all', () => {
    // The fix lives at the route.ts call site (below), deliberately: this
    // pure ladder stays the single source of truth for "what does the
    // signal say", and the excursion-aware override only decides whether
    // THIS turn is the right moment to act on it.
    const decisionEngine = readFileSync(
      join(process.cwd(), 'src/lib/understanding/decisionEngine.ts'),
      'utf8',
    )
    expect(decisionEngine).not.toMatch(/excursionDecisionHoisted|excursionActive/)
  })
})

describe('route.ts defers D2b — and only D2b — while an excursion is open', () => {
  it('the override checks the exact rule id, not every DETECT_MISCONCEPTION decision', () => {
    // D-2 (an engine-catalogued HIGH-confidence misconception) is a
    // stronger, freshly-evidenced signal and must stay untouched — the
    // override is scoped to the ruleId D2b's stale-signal rule uses.
    expect(ROUTE).toMatch(
      /teachingDecision\.decision === 'DETECT_MISCONCEPTION'\s*\n\s*&& teachingDecision\.ruleId === 'D2b-CONFIDENT-WRONG'\s*\n\s*&& excursionDecisionHoisted\?\.state\.active === true/,
    )
  })

  it('defers to open escalation (ESCALATE_TO_LLM), the same yield-the-turn decision D0/D0b use', () => {
    expect(ROUTE).toMatch(/decision: 'ESCALATE_TO_LLM',\s*\n\s*ruleId: 'D2b-DEFERRED-TO-EXCURSION',/)
  })

  it('carries no misconception parameters once deferred — nothing invents a misconception label', () => {
    const overrideBlock = ROUTE.slice(
      ROUTE.indexOf("ruleId === 'D2b-CONFIDENT-WRONG'"),
      ROUTE.indexOf("ruleId === 'D2b-CONFIDENT-WRONG'") + 900,
    )
    expect(overrideBlock).toContain('parameters: {}')
  })

  it('falls through to the ORIGINAL decision when no excursion is open — the else branch', () => {
    expect(ROUTE).toMatch(/} else \{\s*\n\s*cueDecisionHoisted = teachingDecision\s*\n\s*\}/)
  })
})
