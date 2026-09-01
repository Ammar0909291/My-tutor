/**
 * A held figure must release when the Teaching Engine's excursion system has
 * ALREADY decided the learner moved to a topic the curriculum cannot name —
 * even when the message itself is a genuine question, not an explicit
 * "explain X" / "teach me X" request.
 *
 * REPRODUCED FROM PRODUCTION (2026-08-27, real account, four separate
 * sessions): an S-matrix diagram, a p-n junction diagram, and an alpha/
 * beta/gamma decay diagram each stayed pinned on screen through several
 * turns of an unrelated arithmetic tangent the learner opened with an
 * ordinary question (not a "teach me" request).
 *
 * ROOT CAUSE: `resolveVisual.ts` asked only `requestLeavesActiveFigure`
 * (session.ts's `requestLeftActiveFigure` input), which uses
 * `extractRequestedTopic`'s STRICT, explicit-request-only detector — by
 * design, for the asymmetric-caution reasons documented on that function.
 * Meanwhile `excursion.ts`'s own topic-drift detector
 * (`namedTopicUnknownTo`) is deliberately WIDER and already recognises
 * genuine questions ("what happens if the numbers are bigger though"). The
 * excursion system correctly opened an unresolved-topic excursion on these
 * turns; the visual layer, asking a narrower question of the same message,
 * never released the figure.
 *
 * FIX: route.ts now also tells `resolveVisualForTurn` whether the
 * excursion decision itself just opened or switched onto an unresolved
 * topic this turn (`excursionJustLeftFigure`), and `resolveVisual.ts` ORs
 * that into `requestLeftActiveFigure` — reusing the excursion system's own
 * finding instead of loosening the general-purpose detector.
 */
import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { decideContinuity, type VisualSession } from '@/lib/teaching/visual/session'
import { requestLeavesActiveFigure } from '@/lib/teaching/visual/resolveVisualTarget'
import { getKGNode } from '@/lib/curriculum/knowledgeGraph'

const ROUTE = readFileSync(
  join(process.cwd(), 'src/app/api/learn/chat/route.ts'),
  'utf8',
)

const LESSON = 'phys.mod.pn-junction'

const figureText = (conceptId: string) => {
  const node = getKGNode(conceptId)
  return `${node?.title ?? ''} ${node?.description ?? ''}`
}

const session: VisualSession = {
  conceptId: LESSON,
  representation: 'diagram',
  renderer: 'diagram',
  returnToConceptId: null,
  turns: 2,
}

// The exact shape of the production message class: an ordinary arithmetic
// aside, not an "explain X"/"teach me X" request.
const ARITHMETIC_TANGENT = 'If you have 7 pencils and you find 3 more, how many pencils do you have now?'

describe('requestLeavesActiveFigure alone does not catch the production defect', () => {
  it('the strict detector sees no named topic in the arithmetic tangent', () => {
    expect(requestLeavesActiveFigure(ARITHMETIC_TANGENT, figureText(LESSON))).toBe(false)
  })

  it('so continuity would hold the unrelated figure without the excursion signal', () => {
    const action = decideContinuity({
      session,
      message: ARITHMETIC_TANGENT,
      // route.ts passes null here on an unresolved-topic excursion turn.
      lessonConceptId: null,
      requestedConceptId: null,
      lastAssistantAskedQuestion: false,
      requestLeftActiveFigure: requestLeavesActiveFigure(ARITHMETIC_TANGENT, figureText(LESSON)),
    })
    expect(action.kind).toBe('hold')
  })
})

describe('the excursion system\'s own topic-drift finding releases the figure', () => {
  it('releases when excursionJustLeftFigure is true, even though no topic was named', () => {
    const action = decideContinuity({
      session,
      message: ARITHMETIC_TANGENT,
      lessonConceptId: null,
      requestedConceptId: null,
      lastAssistantAskedQuestion: false,
      requestLeftActiveFigure:
        requestLeavesActiveFigure(ARITHMETIC_TANGENT, figureText(LESSON)) || true,
    })
    expect(action.kind).toBe('switch')
    expect(action.kind === 'switch' && action.targetConceptId).toBe(null)
  })

  it('draws nothing rather than substituting a wrong figure — same law as the strict path', () => {
    const action = decideContinuity({
      session,
      message: ARITHMETIC_TANGENT,
      lessonConceptId: null,
      requestedConceptId: null,
      lastAssistantAskedQuestion: false,
      requestLeftActiveFigure: true,
    })
    expect(action.kind === 'switch' && action.targetConceptId).toBeNull()
  })
})

describe('an answer to the tutor still holds, even mid-excursion', () => {
  // The excursion signal must not override the answer-protection rule —
  // only route.ts's own transition-turn gating (below) keeps this narrow.
  it('a short reply to a question the tutor just asked is not released', () => {
    const action = decideContinuity({
      session,
      message: 'Ten.',
      lessonConceptId: null,
      requestedConceptId: null,
      lastAssistantAskedQuestion: true,
      requestLeftActiveFigure: true,
    })
    expect(action.kind).toBe('hold')
  })
})

describe('route.ts wires the excursion\'s own transition into the visual layer', () => {
  it('computes excursionJustLeftFigure only on the transition turn (started or switched)', () => {
    expect(ROUTE).toMatch(
      /excursionJustLeftFigure:\s*\n\s*unresolvedTopicExcursion\s*\n\s*&& \(excursionDecision\.transition === 'started'\s*\n\s*\|\| excursionDecision\.transition === 'switched'\)/,
    )
  })

  it('resolveVisual.ts ORs it into requestLeftActiveFigure rather than replacing the strict detector', () => {
    const resolveVisual = readFileSync(
      join(process.cwd(), 'src/lib/teaching/visual/resolveVisual.ts'),
      'utf8',
    )
    // The invariant is the OR: the excursion signal is ADDED to the strict
    // detector, never substituted for it. The detector's argument list is not
    // part of that invariant — it gained a third argument (the figure's
    // concept id, for the domain-vocabulary evidence) on 2026-09-01, and this
    // guard failed for a change that could not affect what it protects. It now
    // states the invariant instead of the call's exact shape.
    expect(resolveVisual).toMatch(
      /requestLeftActiveFigure:\s*\n\s*liveSession !== null\s*\n\s*&& \(requestLeavesActiveFigure\([^)]*\)\s*\n\s*\|\| input\.excursionJustLeftFigure === true\)/,
    )
  })
})
