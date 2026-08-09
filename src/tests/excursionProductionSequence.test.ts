/**
 * THE EXACT PRODUCTION SEQUENCE — a doubt must never end an excursion.
 *
 * REAL TRANSCRIPT (lesson: "Scalar and Vector Quantities"), after the
 * excursion lifecycle shipped and with production confirmed running it:
 *
 *   learner: "Explain Viscosity with a diagram"
 *   tutor:   "Good question — now, back to Scalar and Vector Quantities…"
 *   learner: "I don't understand velocity gradient"
 *   tutor:   "Okay — let's come at it differently…"           (good)
 *            "We'll come back to this concept later."          (WRONG)
 *   learner: "I still don't understand it"
 *   tutor:   "I hear you … let's pause on that for today. Next time, we will
 *             return to our lesson on scalar and vector quantities…"  (WRONG)
 *
 * WHY THE EXISTING TESTS PASSED ANYWAY — and the reason this file exists.
 * They tested decideExcursion() and buildExcursionDirective() in isolation,
 * and both were RIGHT: the excursion never closed (the Viscosity figure stayed
 * on screen precisely because the server still had it open). The failure was
 * never in the state machine. It was in the ASSEMBLED PROMPT: other blocks,
 * injected after the excursion directive, told the model to defer the concept
 * and wrap the session up. Their text is quoted verbatim in the transcript:
 *
 *   recoveryGuard.ts  "…say \"we'll come back to this\" and move to a simpler
 *                      related point."            (2+ failures rung)
 *                     "Close this concept for today … return to it next
 *                      session…"                  (4+ failures rung)
 *   sessionLifecycle  "SESSION CLOSE (mandatory …) … forecast the next
 *                      session in one sentence."  (affect budget spent)
 *
 * So these tests assert on WHAT THE MODEL IS ACTUALLY TOLD, block by block, in
 * the order route.ts appends them — not on the state machine alone. A unit test
 * of any single function would have passed throughout the outage.
 */

import { describe, expect, it } from 'vitest'
import {
  decideExcursion,
  buildExcursionDirective,
  turnCountsForLesson,
  isSatisfactionSignal,
  NO_EXCURSION,
  type ExcursionDecision,
  type ExcursionState,
} from '@/lib/teaching/excursion'
import { resolveRequestedConceptId } from '@/lib/teaching/concept/requestedConcept'
import { detectFailureState, buildRecoveryBlock } from '@/lib/teaching/recoveryGuard'
import { buildAffectCloseBlock } from '@/lib/teaching/sessionLifecycle'
import { gateLessonCompletion } from '@/lib/teaching/masteryGate'
import { resolveVisual } from '@/lib/teaching/visual/resolveVisual'
import { getKGNode } from '@/lib/curriculum/knowledgeGraph'

const LESSON = 'phys.meas.scalars-vectors'          // "Scalar and Vector Quantities"
const VISCOSITY = 'phys.mech.viscosity'
const LESSON_TITLE = 'Scalar and Vector Quantities'

/** Phrases the tutor must never be told to say while an excursion is open. */
const ABANDONMENT = [
  /we'?ll come back to this/i,
  /come back to (?:this|it) (?:concept )?later/i,
  /close this concept for today/i,
  /return to it next session/i,
  /forecast the next session/i,
  /pause (?:on )?(?:that|this) for today/i,
  /move to a simpler related point/i,
]

/**
 * The turn, assembled the way route.ts assembles it. Block ORDER is part of
 * the contract being tested: the excursion directive is appended LAST, after
 * RECOVERY, because RECOVERY declares itself "PREEMPTS EVERYTHING ABOVE".
 */
function assembleTurn(opts: {
  message: string
  state: ExcursionState
  lastAssistantAskedQuestion: boolean
  /** Affect budget already spent before this turn (episode phase CLOSING). */
  episodeClosing?: boolean
  /** Failures recorded this session — drives the recovery escalation rungs. */
  sessionFailureCount?: number
}) {
  const requested = resolveRequestedConceptId(opts.message, LESSON, 'physics')
  const excursion: ExcursionDecision = decideExcursion({
    state: opts.state,
    message: opts.message,
    lessonConceptId: LESSON,
    requestedConceptId: requested,
    lastAssistantAskedQuestion: opts.lastAssistantAskedQuestion,
  })
  const target = excursion.targetConceptId ?? LESSON
  const excursionActive = !turnCountsForLesson(excursion)
  const targetTitle = excursion.state.active ? (getKGNode(target)?.title ?? null) : null

  let prompt = ''
  // route.ts: SESSION CLOSE, only when the episode is CLOSING and no excursion.
  if (opts.episodeClosing && !excursionActive) prompt += buildAffectCloseBlock()
  // route.ts: RECOVERY, scoped to the excursion target when one is open.
  const recoveryKey = detectFailureState(opts.message)
  if (recoveryKey) {
    prompt += buildRecoveryBlock(recoveryKey, false, opts.sessionFailureCount ?? 0, false, {
      excursionTargetTitle: targetTitle,
    })
  }
  // route.ts: EXCURSION DIRECTIVE, last.
  prompt += buildExcursionDirective({
    decision: excursion,
    targetTitle: targetTitle ?? getKGNode(excursion.state.targetConceptId ?? '')?.title ?? null,
    lessonTitle: LESSON_TITLE,
  })

  const visual = resolveVisual({
    message: opts.message,
    lessonConceptId: target,
    excursionReturnToConceptId: excursion.returnToConceptId,
    excursionActive: excursion.state.active,
    subject: 'physics',
    learnerRequest: /diagram/i.test(opts.message) ? 'diagram' : null,
    lastAssistantAskedQuestion: opts.lastAssistantAskedQuestion,
  })

  return { excursion, excursionActive, prompt, visual, recoveryKey, target }
}

// ── the sequence ─────────────────────────────────────────────────────────────

describe('the exact production sequence, turn by turn', () => {
  // TURN 1 — the learner asks for the side concept.
  const t1 = assembleTurn({
    message: 'Explain Viscosity with a diagram',
    state: NO_EXCURSION,
    lastAssistantAskedQuestion: false,
  })

  it('TURN 1 opens the excursion and attaches the Viscosity figure', () => {
    expect(t1.excursion.state.active).toBe(true)
    expect(t1.excursion.targetConceptId).toBe(VISCOSITY)
    expect(t1.excursion.returnToConceptId).toBe(LESSON)
    expect(t1.visual.graphical).toBe(true)
    expect(t1.visual.asset?.conceptId).toBe(VISCOSITY)
  })

  it('TURN 1 does not tell the tutor to go "back to Scalar and Vector Quantities"', () => {
    expect(t1.prompt).toMatch(/THE LEARNER IS CURRENTLY LEARNING/i)
    expect(t1.prompt).toMatch(/IS PAUSED/i)
    // The lesson may be named ONLY as the paused destination.
    expect(t1.prompt).toMatch(/Do NOT teach, open, anchor, illustrate or ask a question belonging to/i)
    for (const phrase of ABANDONMENT) expect(t1.prompt, String(phrase)).not.toMatch(phrase)
  })

  // TURN 2 — the first doubt. Recovery fires.
  const t2 = assembleTurn({
    message: "I don't understand velocity gradient",
    state: t1.excursion.state,
    lastAssistantAskedQuestion: true,
    sessionFailureCount: 1,
  })

  it('TURN 2 keeps the excursion open and fires recovery on the target', () => {
    expect(t2.recoveryKey).toBe('dont_understand')
    expect(t2.excursion.state.active).toBe(true)
    expect(t2.excursion.targetConceptId).toBe(VISCOSITY)
    expect(t2.excursion.returnToConceptId).toBe(LESSON)
    expect(t2.excursion.transition).toBe('continued')
  })

  it('TURN 2 never instructs "we\'ll come back to this concept later"', () => {
    for (const phrase of ABANDONMENT) expect(t2.prompt, String(phrase)).not.toMatch(phrase)
    // Recovery's own job is untouched: change representation, no new content.
    expect(t2.prompt).toMatch(/come at it differently/i)
    expect(t2.prompt).toMatch(/No new content this turn/i)
    // And it is re-scoped to the concept the learner asked for.
    expect(t2.prompt).toMatch(/STAY ON "VISCOSITY AND STOKES' LAW"/i)
  })

  // TURN 3 — the failing turn. Second doubt, budget spent, episode CLOSING.
  const t3 = assembleTurn({
    message: 'I still don\'t understand it',
    state: t2.excursion.state,
    lastAssistantAskedQuestion: true,
    episodeClosing: true,          // the affect budget was already spent
    sessionFailureCount: 4,        // and the harshest recovery rung is reachable
  })

  it('TURN 3 — "I still don\'t understand it" is a DOUBT, never satisfaction', () => {
    expect(isSatisfactionSignal("I still don't understand it")).toBe(false)
    expect(t3.recoveryKey).toBe('dont_understand')
  })

  it('TURN 3 keeps the excursion ACTIVE — the acceptance criterion', () => {
    expect(t3.excursion.state.active).toBe(true)
    expect(t3.excursion.targetConceptId).toBe(VISCOSITY)
    expect(t3.excursion.returnToConceptId).toBe(LESSON)
    expect(t3.excursion.justClosed).toBe(false)
    expect(t3.excursion.state.turns).toBeGreaterThan(0)
  })

  it('TURN 3 contains NO instruction to defer, pause, or close anything', () => {
    for (const phrase of ABANDONMENT) expect(t3.prompt, String(phrase)).not.toMatch(phrase)
    // Even at the harshest escalation rung, and with the session's affect
    // budget already spent, the SESSION CLOSE block is not injected.
    expect(t3.prompt).not.toMatch(/SESSION CLOSE/i)
    expect(t3.prompt).not.toMatch(/next session/i)
  })

  it('TURN 3 explicitly tells the tutor confusion means teach it again', () => {
    expect(t3.prompt).toMatch(/CONFUSION DOES NOT END THIS/i)
    expect(t3.prompt).toMatch(/teach .* AGAIN with a different representation/i)
    expect(t3.prompt).toMatch(/Re-explain, then ask again/i)
  })

  it('TURN 3 keeps the Viscosity figure and no unrelated visual', () => {
    expect(t3.visual.conceptId).toBe(VISCOSITY)
    expect(t3.visual.conceptId).not.toBe(LESSON)
  })

  it('TURN 3 leaves lesson progress and completion untouched', () => {
    expect(turnCountsForLesson(t3.excursion)).toBe(false)
    expect(gateLessonCompletion(
      'Great work — that wraps up the lesson. [LESSON_COMPLETE]',
      null,
      { excursionActive: true },
    ).authorized).toBe(false)
  })

  it('the EXCURSION DIRECTIVE is the LAST word, after RECOVERY', () => {
    // RECOVERY declares "PREEMPTS EVERYTHING ABOVE"; the directive that says
    // WHICH concept is being taught must therefore come after it.
    const recoveryAt = t3.prompt.indexOf('RECOVERY — PREEMPTS EVERYTHING ABOVE')
    const excursionAt = t3.prompt.indexOf('CONCEPT EXCURSION')
    expect(recoveryAt).toBeGreaterThan(-1)
    expect(excursionAt).toBeGreaterThan(recoveryAt)
    expect(t3.prompt).toMatch(/THIS BLOCK OVERRIDES every instruction above it/i)
  })

  // TURN 4 — genuine understanding closes it.
  const t4 = assembleTurn({
    message: 'I understand now',
    state: t3.excursion.state,
    lastAssistantAskedQuestion: true,
  })

  it('TURN 4 closes the excursion on real understanding, without completing the lesson', () => {
    expect(t4.excursion.state).toEqual(NO_EXCURSION)
    expect(t4.excursion.justClosed).toBe(true)
    expect(t4.excursion.targetConceptId).toBe(LESSON)
    expect(t4.prompt).toContain('EXCURSION CLOSED')
    // The return turn resumes the lesson; it does not finish it.
    expect(turnCountsForLesson(t4.excursion)).toBe(false)
    expect(gateLessonCompletion('Done! [LESSON_COMPLETE]', null, {
      excursionActive: !turnCountsForLesson(t4.excursion),
    }).authorized).toBe(false)
  })

  // TURN 5 — back to the lesson.
  const t5 = assembleTurn({
    message: 'continue',
    state: t4.excursion.state,
    lastAssistantAskedQuestion: false,
  })

  it('TURN 5 is an ordinary lesson turn again', () => {
    expect(t5.excursion.state.active).toBe(false)
    expect(t5.excursion.targetConceptId).toBe(LESSON)
    expect(turnCountsForLesson(t5.excursion)).toBe(true)
    expect(t5.prompt).toBe('')                       // no excursion instructions
    expect(t5.visual.conceptId).toBe(LESSON)         // visual follows the lesson again
  })

  it('and the deferred SESSION CLOSE becomes available again once back', () => {
    const back = assembleTurn({
      message: 'ok what next',
      state: t4.excursion.state,
      lastAssistantAskedQuestion: false,
      episodeClosing: true,
    })
    // Protection was deferred, not deleted.
    expect(back.prompt).toMatch(/SESSION CLOSE/i)
  })
})

// ── doubt vs satisfaction, exhaustively ──────────────────────────────────────

describe('P7 · doubt is never satisfaction', () => {
  const open: ExcursionState = { active: true, targetConceptId: VISCOSITY, returnToConceptId: LESSON, turns: 1 }

  it.each([
    "I don't understand",
    "I still don't understand it",
    "I don't get it",
    'still confused',
    "I'm confused",
    'not clear',
    'unclear',
    "that doesn't make sense",
    'why?',
    'how?',
    'can you explain again?',
    'Got it, but I still don\'t understand why.',
    'I understand the example, but not velocity gradient.',
    'Okay, but I still don\'t get it.',
  ])('%s keeps the excursion open', (message) => {
    expect(isSatisfactionSignal(message)).toBe(false)
    const d = decideExcursion({
      state: open, message, lessonConceptId: LESSON,
      requestedConceptId: resolveRequestedConceptId(message, LESSON, 'physics'),
      lastAssistantAskedQuestion: true,
    })
    expect(d.state.active, message).toBe(true)
    expect(d.targetConceptId, message).toBe(VISCOSITY)
  })

  it.each([
    'I got it',
    'Yes, that makes sense',
    'got it, thanks',
    'all clear now',
    'I understand now',
  ])('%s may close the excursion', (message) => {
    const d = decideExcursion({
      state: open, message, lessonConceptId: LESSON,
      requestedConceptId: null,
      lastAssistantAskedQuestion: true,
    })
    expect(d.state.active, message).toBe(false)
    expect(d.justClosed, message).toBe(true)
  })

  it('when uncertain, it stays in the excursion', () => {
    // Neither a doubt phrase nor a satisfaction phrase.
    for (const message of ['hmm', 'the pancakes one', 'what about honey']) {
      const d = decideExcursion({
        state: open, message, lessonConceptId: LESSON,
        requestedConceptId: null,
        lastAssistantAskedQuestion: true,
      })
      expect(d.state.active, message).toBe(true)
    }
  })
})

// ── recovery keeps its own authority ─────────────────────────────────────────

describe('recovery is re-scoped, never weakened', () => {
  it('an ordinary lesson turn keeps every original escalation rung', () => {
    const rung2 = buildRecoveryBlock('dont_understand', false, 2, false)
    expect(rung2).toMatch(/we'll come back to this/i)
    const rung4 = buildRecoveryBlock('dont_understand', false, 4, false)
    expect(rung4).toMatch(/Close this concept for today/i)
    // Unchanged when no excursion scope is supplied — every existing caller.
    expect(buildRecoveryBlock('dont_understand', false, 2, false, {})).toBe(rung2)
    expect(buildRecoveryBlock('dont_understand', false, 2, false, { excursionTargetTitle: null })).toBe(rung2)
  })

  it('mid-excursion the affect law still holds — only the pivot is removed', () => {
    const block = buildRecoveryBlock('dont_understand', false, 4, false, {
      excursionTargetTitle: "Viscosity and Stokes' Law",
    })
    expect(block).toMatch(/PREEMPTS EVERYTHING ABOVE/)
    expect(block).toMatch(/never argue with it/i)
    expect(block).toMatch(/No new content this turn/i)
    expect(block).toMatch(/validate, shrink, and bank one small genuine win/i)
    for (const phrase of ABANDONMENT) expect(block, String(phrase)).not.toMatch(phrase)
  })
})
