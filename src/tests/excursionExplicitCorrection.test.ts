/**
 * F3 — AN EXPLICIT CORRECTION MUST END A STALE EXCURSION.
 *
 * ── THE PRODUCTION FAILURE ───────────────────────────────────────────────────
 * Real black-box session, physics, `phys.mech.newtons-first-law` lesson, an
 * off-lesson excursion open on "element 55" (cesium — chemistry content with
 * no physics KG concept, so an UNRESOLVED-TOPIC excursion, exactly the shape
 * `unresolvedTopicExcursion.test.ts` covers). Captured verbatim:
 *
 *   learner: "the table push it up? can you explain again"
 *   tutor:   answered about cesium — ignored the actual message.
 *   learner: "no wait I meant the book and table thing, not cesium. why
 *             doesnt the book fall through the table"
 *   tutor:   "I'm currently focused on element 55. If you'd like to explore
 *             that topic, just let me know!" — refused the explicit
 *             correction.
 *   learner: "stop cesium. lets go back to newtons first law lesson"
 *   tutor:   finally recovered — but only because this phrasing happens to
 *            match the PRE-EXISTING `isReturnRequest` ("back to").
 *
 * Root cause: neither `isExplicitTopicRequest` ("explain/teach/what is...")
 * nor `isReturnRequest` ("back to/go back...") recognize "I meant X, not Y" /
 * "that's not what I meant" as a signal at all, so a correction that uses
 * neither phrasing falls through every branch to `decideExcursion`'s
 * "stay on whatever is currently active" default.
 *
 * ── WHAT THESE TESTS HOLD ────────────────────────────────────────────────────
 * The same recall/restraint balance `unresolvedTopicExcursion.test.ts` uses:
 *   A. an EXPLICIT return to the lesson topic already works (pre-existing).
 *   B. an explicit correction ("I meant X, not Y") ends the excursion.
 *   C. a genuine follow-up about the excursion topic — no "not"/"meant" —
 *      still holds it (must not become trigger-happy).
 *   D. a genuinely new excursion still opens normally.
 *   E. an incidental "I meant to ask" with no negation does not misfire.
 */
import { describe, it, expect } from 'vitest'
import { resolveRequestedConceptId } from '@/lib/teaching/concept/requestedConcept'
import { namedTopicUnknownTo } from '@/lib/teaching/visual/requestedTopic'
import { isExplicitCorrection } from '@/lib/teaching/visual/session'
import {
  decideExcursion, NO_EXCURSION, type ExcursionState,
} from '@/lib/teaching/excursion'
import { getKGNode } from '@/lib/curriculum/knowledgeGraph'

const LESSON = 'phys.mech.newtons-first-law' // "Newton's First Law — Inertia"

/** route.ts's own wiring, reproduced exactly — see unresolvedTopicExcursion.test.ts. */
function turn(opts: {
  message: string
  state?: ExcursionState
  lastAssistantAskedQuestion?: boolean
}) {
  const state = opts.state ?? NO_EXCURSION
  const requestedConceptId = resolveRequestedConceptId(opts.message, LESSON, 'physics')

  const node = getKGNode(LESSON)
  const activeTitle = state.active
    ? (state.targetTopicTitle ?? getKGNode(state.targetConceptId ?? '')?.title ?? '')
    : ''
  const taughtText = [node?.title ?? '', node?.description ?? '', activeTitle].join(' ')
  const requestedTopicTitle = requestedConceptId
    ? null
    : (namedTopicUnknownTo(opts.message, taughtText)?.title ?? null)

  return decideExcursion({
    state,
    message: opts.message,
    lessonConceptId: LESSON,
    requestedConceptId,
    requestedTopicTitle,
    lastAssistantAskedQuestion: opts.lastAssistantAskedQuestion ?? false,
  })
}

/** The excursion state carried into every scenario below: active on cesium. */
const CESIUM_EXCURSION: ExcursionState = {
  active: true,
  targetConceptId: null,
  targetTopicTitle: 'element 55',
  returnToConceptId: LESSON,
  turns: 5,
}

describe('isExplicitCorrection — the new predicate', () => {
  it('recognizes the exact production correction', () => {
    expect(isExplicitCorrection(
      'no wait I meant the book and table thing, not cesium. why doesnt the '
      + 'book fall through the table',
    )).toBe(true)
  })

  it('recognizes "not X, I meant Y" (reversed order) and "that\'s not what I meant"', () => {
    expect(isExplicitCorrection('not cesium, I meant sodium')).toBe(true)
    expect(isExplicitCorrection("that's not what I meant, tell me about the book")).toBe(true)
    expect(isExplicitCorrection('I didnt mean that, can we go back')).toBe(true)
  })

  it('does NOT fire on an incidental "I meant to ask" with no negation (test E)', () => {
    expect(isExplicitCorrection('I meant to ask, is cesium radioactive?')).toBe(false)
  })

  it('does NOT fire on an ordinary negative answer', () => {
    expect(isExplicitCorrection('I do not know the answer')).toBe(false)
    expect(isExplicitCorrection('not really')).toBe(false)
  })
})

describe('F3 fix — decideExcursion end to end (test cases A-E)', () => {
  it('A. an EXPLICIT return to the lesson (pre-existing isReturnRequest) already works', () => {
    const d = turn({ state: CESIUM_EXCURSION, message: 'stop cesium. lets go back to newtons first law lesson' })
    expect(d.transition).toBe('closed-returned')
    expect(d.state.active).toBe(false)
    expect(d.targetConceptId).toBe(LESSON)
  })

  it('B. the exact production correction ends the excursion and returns to the lesson', () => {
    const d = turn({
      state: CESIUM_EXCURSION,
      message: 'no wait I meant the book and table thing, not cesium. why doesnt the book fall through the table',
      lastAssistantAskedQuestion: true,
    })
    expect(d.transition).toBe('closed-returned')
    expect(d.state.active).toBe(false)
    expect(d.targetConceptId).toBe(LESSON)
    expect(d.justClosed).toBe(true)
  })

  it('B2. "that\'s not what I meant" also closes the excursion', () => {
    const d = turn({ state: CESIUM_EXCURSION, message: "that's not what I meant" })
    expect(d.transition).toBe('closed-returned')
    expect(d.targetConceptId).toBe(LESSON)
  })

  it('C. a genuine follow-up about the excursion topic — no negation — still holds it', () => {
    const d = turn({ state: CESIUM_EXCURSION, message: 'why is it so reactive with water though' })
    expect(d.transition).toBe('continued')
    expect(d.state.active).toBe(true)
    expect(d.state.targetTopicTitle).toBe('element 55')
  })

  it('D. a genuinely new excursion still opens normally (unaffected by this fix)', () => {
    const d = turn({ state: NO_EXCURSION, message: 'can you explain viscosity to me' })
    expect(d.transition).toBe('started')
    expect(d.state.active).toBe(true)
  })

  it('E. an incidental "I meant to ask" with no negation does not accidentally close the excursion', () => {
    const d = turn({ state: CESIUM_EXCURSION, message: 'I meant to ask, is cesium radioactive?' })
    expect(d.transition).not.toBe('closed-returned')
    expect(d.state.active).toBe(true)
  })

  it('a correction that ALSO names a real new concept redirects to it, not to the lesson', () => {
    // isExplicitCorrection paired with a resolvable requestedConceptId takes
    // the concept branch (now unblocked by the isExplicitCorrection OR),
    // rather than the "nothing resolved, return to lesson" branch.
    const d = turn({
      state: CESIUM_EXCURSION,
      message: 'no I meant explain viscosity, not cesium',
    })
    expect(d.state.active).toBe(true)
    expect(d.state.targetConceptId).toBe('phys.mech.viscosity')
    expect(d.transition).toBe('switched')
  })
})
