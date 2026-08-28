/**
 * Compound / stitched turns: two unrelated fragments concatenated into one
 * reply.
 *
 * MEASURED (production, phys.rel.postulates, T5, 2026-08-27):
 *
 *   "How did you decide that it was the second postulate? \n\n If you have 7
 *    pencils and you find 3 more, how many pencils do you have now?"
 *
 * INVESTIGATION: `phys.rel.postulates` carries a remediation card, but the
 * text matches neither the card's content nor the held-card fallback shape
 * — this is not the remediation floor (already fixed separately; see
 * remediationFallbackNoRepeat.test.ts). Tracing where each half comes from:
 *
 *   Half 1, "How did you decide that it was the second postulate?" is
 *   D2b-CONFIDENT-WRONG's own directive text, verbatim in spirit
 *   (`execution.ts`'s RENDER_ROLES.DETECT_MISCONCEPTION.directive): "elicit
 *   the learner's reasoning, get them to commit to it, then present one
 *   concrete case where their rule visibly breaks."
 *
 *   Half 2, the pencils question, is the excursion's own arithmetic tangent
 *   being answered — the same "unrelated arithmetic tangent" class of turn
 *   #8 (a held figure not releasing) and #11 (masteryState staying
 *   'misconceiving') were both measured against, on the same concept.
 *
 * ROOT CAUSE (shared with #11, not a second mechanism): `route.ts` injects
 * BOTH the excursion's conversation directive AND the DETECT_MISCONCEPTION
 * "BRAIN DECISION" block into the SAME system prompt
 * (`buildBrainExecutionBlock`'s own `lines` array pushes
 * `opts.conversationDirective` first, then the BRAIN DECISION text) whenever
 * D2b fires — which, per #11, it does even while an excursion is open,
 * because `masteryState` is a stale per-turn read with no excursion
 * awareness. One LLM call, two live directives pointed at two different
 * topics, dutifully satisfied as two concatenated sentences.
 *
 * FIX: the SAME override #11 added (deferring D2b to ESCALATE_TO_LLM while
 * `excursionDecisionHoisted.state.active` is true) removes the competing
 * BRAIN DECISION block at the source — `buildBrainExecutionBlock` returns
 * '' for any decision whose executor is not LLM_RENDERER (ESCALATE_TO_LLM
 * maps to LLM_OPEN), so only the excursion's own conversation directive
 * reaches the model. No second fix was needed or added.
 */
import { describe, it, expect } from 'vitest'
import { buildBrainExecutionBlock } from '@/lib/understanding/execution'
import { planDispatch } from '@/lib/understanding/dispatcher'
import type { TeachingDecision } from '@/lib/understanding/decisionEngine'

const CONVERSATION_DIRECTIVE =
  'CONVERSATION DIRECTIVE: the learner asked an unrelated question — answer it '
  + 'before returning to the lesson. Do not ask them to justify a previous answer '
  + 'this turn.'

function d2bDecision(): TeachingDecision {
  return {
    version: 1,
    computedAt: new Date().toISOString(),
    shadow: true,
    decision: 'DETECT_MISCONCEPTION',
    ruleId: 'D2b-CONFIDENT-WRONG',
    rationale: ['Last answer was wrong with HIGH stated confidence.'],
    inputsUsed: ['masteryState'],
    confidence: 0.75,
    parameters: { conceptId: 'phys.rel.postulates' },
  }
}

describe('before the fix: D2b and the excursion directive compete in one prompt', () => {
  it('reproduces the two live directives that produced the stitched turn', () => {
    const decision = d2bDecision()
    const plan = planDispatch(decision, { assembledAvailable: false })
    expect(plan.executor).toBe('LLM_RENDERER') // the competing block DOES render
    const block = buildBrainExecutionBlock(plan, decision, {
      conversationDirective: CONVERSATION_DIRECTIVE,
    })
    // Both halves of the production stitch are present in the same prompt —
    // the excursion's own instruction to answer the tangent, AND the
    // misconception engine's instruction to elicit reasoning about the
    // lesson concept. A model asked to do both in one turn did both.
    expect(block).toContain(CONVERSATION_DIRECTIVE)
    expect(block).toContain('elicit')
    expect(block).toContain("learner's reasoning")
  })
})

describe('after the fix: the deferred decision carries no competing directive', () => {
  it('ESCALATE_TO_LLM (the #11 override target) renders nothing from buildBrainExecutionBlock', () => {
    const deferred: TeachingDecision = {
      ...d2bDecision(),
      decision: 'ESCALATE_TO_LLM',
      ruleId: 'D2b-DEFERRED-TO-EXCURSION',
      parameters: {},
    }
    const plan = planDispatch(deferred, { assembledAvailable: false })
    expect(plan.executor).toBe('LLM_OPEN')
    const block = buildBrainExecutionBlock(plan, deferred, {
      conversationDirective: CONVERSATION_DIRECTIVE,
    })
    // No "BRAIN DECISION" section, no elicit-reasoning instruction — only
    // whatever the caller's own conversationDirective carries reaches the
    // model, and buildBrainExecutionBlock is not the one injecting it.
    expect(block).toBe('')
  })
})
