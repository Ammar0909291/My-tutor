/**
 * A PREREQUISITE DETOUR FROZE A LESSON FOR SIX TURNS.
 *
 * ── THE MEASURED FAILURE ────────────────────────────────────────────────────
 * Production, `phys.mech.friction`, 2026-09-01, real account, studied as a
 * learner. Turn 2, the learner wrote:
 *
 *   "ok. what is the normal force though, you mentioned it in the formula but
 *    i dont get it"
 *
 * The engine did the right thing — `[knowledge-gap] concept:
 * phys.mech.normal-force, signal: dont_understand` — and opened a detour.
 *
 * Four turns later the learner had answered correctly twice and been told so
 * ("You're right—on a flat table the normal force balances the book's weight,
 * so it's 100 N"), and then wrote:
 *
 *   "the one pointing up. can you quiz me properly on friction now"
 *
 * THE ENGINE SAW IT. That turn logged `wantsPractice: true` and
 * `practiceRequested: true`. The detour stayed open anyway — `transition:
 * 'continued'`, `active: true` — for two more turns.
 *
 * ── WHY THAT IS NOT A COSMETIC PROBLEM ──────────────────────────────────────
 * While a detour is open, `notExcursion: false` blocks the assessment gate:
 *
 *   [gate-eligibility] {"phase":"OBSERVE","eligible":false,
 *     "blockedBy":["phaseAllowsProbe","probeAttachablePhase","notExcursion"]}
 *
 * So the lesson sat in OBSERVE with check 0 / practice 0 and could not have
 * reached mastery however well the learner answered. The learner asked to be
 * assessed and was structurally prevented from being assessed.
 *
 * ── WHY NO EXISTING EXIT FIRED ──────────────────────────────────────────────
 * Not a return request. No satisfaction phrase (and it carries a "?" clause
 * anyway). Not a correction. The lesson did not change. The turn limit is 40.
 * Every exit was correct to decline; the one signal that WAS present was not
 * read at all.
 *
 * ── SCOPED TO A DETOUR THE LEARNER DID NOT CHOOSE ───────────────────────────
 * A learner who asked to explore a topic and then says "quiz me" may well mean
 * quizzed on THAT topic. That ambiguity is real and is left alone. A learner
 * who was detoured did not choose it, and asking to be assessed is asking for
 * the lesson back.
 *
 * ── WHAT IS NOT MOCKED ──────────────────────────────────────────────────────
 * The real `decideExcursion`, and the real route source for the wiring.
 */
import { describe, it, expect } from 'vitest'
import { readFileSync } from 'fs'
import { decideExcursion, parseExcursionState } from '@/lib/teaching/excursion'
import type { ExcursionState } from '@/lib/teaching/excursion'

const LESSON = 'phys.mech.friction'
const GAP = 'phys.mech.normal-force'

/** The detour, open and mid-flight, exactly as the session carried it. */
const openDetour = (over: Partial<ExcursionState> = {}): ExcursionState => ({
  active: true,
  targetConceptId: GAP,
  targetTopicTitle: null,
  returnToConceptId: LESSON,
  turns: 4,
  openedAsKnowledgeGap: true,
  ...over,
})

const decide = (state: ExcursionState, message: string, over: Record<string, unknown> = {}) =>
  decideExcursion({
    state,
    message,
    lessonConceptId: LESSON,
    requestedConceptId: null,
    knowledgeGapConceptId: null,
    lastAssistantAskedQuestion: true,
    ...over,
  } as Parameters<typeof decideExcursion>[0])

describe('opening records WHY, so the exit can differ', () => {
  it('a reported gap opens a detour and marks it as one', () => {
    const d = decide(
      { active: false, targetConceptId: null, targetTopicTitle: null, returnToConceptId: null, turns: 0 },
      'ok. what is the normal force though, you mentioned it in the formula but i dont get it',
      { requestedConceptId: GAP, knowledgeGapConceptId: GAP },
    )
    expect(d.state.active).toBe(true)
    expect(d.state.targetConceptId).toBe(GAP)
    expect(d.state.openedAsKnowledgeGap).toBe(true)
  })

  it('a topic the learner ASKED for is not a detour', () => {
    // The discriminator is upstream: classifyKnowledgeGap fires only on a
    // don't-know/don't-understand signal, so an ordinary request arrives here
    // with knowledgeGapConceptId null. An earlier version of the flag ALSO
    // excluded request-shaped messages and thereby killed itself on the real
    // gap turn, which is request-shaped and a reported gap at once.
    const d = decide(
      { active: false, targetConceptId: null, targetTopicTitle: null, returnToConceptId: null, turns: 0 },
      'explain the normal force to me',
      { requestedConceptId: GAP, knowledgeGapConceptId: null },
    )
    expect(d.state.active).toBe(true)
    expect(d.state.openedAsKnowledgeGap).toBe(false)
  })
})

describe('the measured turn now closes the detour', () => {
  const MESSAGE = 'the one pointing up. can you quiz me properly on friction now'

  it('closes when the detoured learner asks to be assessed', () => {
    const d = decide(openDetour(), MESSAGE, { wantsPractice: true })
    expect(d.state.active).toBe(false)
    expect(d.transition).toBe('closed-wants-practice')
    expect(d.justClosed).toBe(true)
  })

  it('the lesson is what it returns to', () => {
    const d = decide(openDetour(), MESSAGE, { wantsPractice: true })
    expect(d.targetConceptId).toBe(LESSON)
  })

  it('without the fix it stayed open — the defect, pinned', () => {
    // wantsPractice unread is exactly the shipped behaviour that froze it.
    const d = decide(openDetour(), MESSAGE, { wantsPractice: false })
    expect(d.state.active).toBe(true)
    expect(d.transition).toBe('continued')
  })
})

describe('scoped, so it cannot end a detour the learner chose', () => {
  it('a self-chosen topic excursion is NOT closed by a practice request', () => {
    const d = decide(openDetour({ openedAsKnowledgeGap: false }), 'quiz me on this', { wantsPractice: true })
    expect(d.state.active).toBe(true)
  })

  it('a snapshot persisted before the flag existed behaves as before', () => {
    const { openedAsKnowledgeGap: _drop, ...legacy } = openDetour()
    const d = decide(legacy as ExcursionState, 'quiz me on this', { wantsPractice: true })
    expect(d.state.active).toBe(true)
  })

  it('an ordinary answer during a detour still holds it open', () => {
    const d = decide(openDetour(), '100 N, since weight is mass times g', { wantsPractice: false })
    expect(d.state.active).toBe(true)
  })

  it('the existing exits are untouched', () => {
    expect(decide(openDetour(), 'ok got it thanks').state.active).toBe(false)
    expect(decide(openDetour(), 'back to the lesson please').state.active).toBe(false)
  })
})

describe('the route supplies the signal it already computed', () => {
  const ROUTE = readFileSync('src/app/api/learn/chat/route.ts', 'utf-8')

  it('passes turnIntent.wantsPractice into the excursion decision', () => {
    // Read, never recomputed — the same per-turn intent the move engine and
    // the MCQ grader consult.
    expect(ROUTE).toMatch(/wantsPractice: turnIntent\.wantsPractice/)
  })
})

describe('the flag survives a refresh', () => {
  it('a round trip through the snapshot keeps it', () => {
    // parseExcursionState rebuilds the state field by field, so a new field is
    // DROPPED unless named there. Without this the exit would never fire for a
    // learner who reloaded the page — caught by an existing round-trip test in
    // lessonIdentityExcursionReturn.test.ts, not by reading.
    const open = openDetour()
    const revived = parseExcursionState(JSON.parse(JSON.stringify(open)))
    expect(revived.openedAsKnowledgeGap).toBe(true)
    expect(decide(revived, 'can you quiz me on friction now', { wantsPractice: true }).state.active)
      .toBe(false)
  })

  it('a snapshot written before the field existed reads as NOT a detour', () => {
    // Conservative direction: the detour stays open rather than closing on a
    // signal it should not act on.
    const { openedAsKnowledgeGap: _drop, ...legacy } = openDetour()
    const revived = parseExcursionState(JSON.parse(JSON.stringify(legacy)))
    expect(revived.openedAsKnowledgeGap).toBe(false)
  })
})
