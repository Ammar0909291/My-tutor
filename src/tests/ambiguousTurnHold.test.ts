/**
 * AN AMBIGUOUS TURN MAY NOT CHANGE WHAT IS BEING TAUGHT. (Phase 2.)
 *
 * ── THE RULE ────────────────────────────────────────────────────────────────
 * Phase 1 established one authoritative reading of the learner's message and
 * recorded, without acting on, the cases where two readings of that same
 * message contradict each other — "I'm done for today, but why does it bend?"
 * is genuinely both a stop and a question. Phase 2 gives that recording its
 * first authority, and exactly one:
 *
 *   AMBIGUOUS TURN -> HOLD THE CURRENT EDUCATIONAL CONTEXT.
 *
 * HOLD is not silence. The learner is still answered, the model still writes
 * the turn, a requested diagram of the concept in hand is still a diagram of
 * the concept in hand. What may not happen is a CHANGE of subject on evidence
 * that contradicted itself: no excursion opens, none closes, none switches,
 * and the lesson does not move.
 *
 * ── WHY THE BOUNDARY IS IN decideExcursion AND NOWHERE ELSE ──────────────────
 * Tracing every consumer that can act on the learner's turn, the entire
 * educational-context axis funnels through one value. `excursionDecision`
 * determines the teaching target, mastery attribution (via
 * `turnCountsForLesson`), the teaching title, the visual layer's target, and
 * the persisted excursion state. One `if` at one boundary governs all of them,
 * which is why this is a single guard rather than `if (ambiguous)` scattered
 * through route.ts.
 *
 * ── THE TWO THINGS THE GUARD DELIBERATELY DOES NOT OUTRANK ───────────────────
 * The two structural valves above it — the lesson moved underneath us, and the
 * turn limit — never read the learner's text, and both exist so a learner is
 * never stranded off-lesson. An unreadable turn is when they matter most, so
 * they keep their priority. Cases G and H hold that line.
 *
 * ── NEGATIVE CONTROLS ───────────────────────────────────────────────────────
 * Every hold case below is paired with the identical input at
 * `ambiguous: false`, which must still do the thing the hold suppressed. A
 * guard that holds everything would pass the hold half of this file and fail
 * the control half — which is the point of pairing them.
 */
import { describe, it, expect } from 'vitest'
import {
  decideExcursion,
  turnCountsForLesson,
  MAX_EXCURSION_TURNS,
  type ExcursionState,
} from '@/lib/teaching/excursion'
import { readTurnIntent } from '@/lib/teaching/turnIntent'

const LESSON = 'phys.optics.refraction'
const SIDE = 'phys.mech.friction'

const openExcursion = (turns = 1): ExcursionState => ({
  active: true,
  targetConceptId: SIDE,
  targetTopicTitle: null,
  returnToConceptId: LESSON,
  turns,
})
const noExcursion: ExcursionState = {
  active: false,
  targetConceptId: null,
  targetTopicTitle: null,
  returnToConceptId: null,
  turns: 0,
}

const decide = (over: Partial<Parameters<typeof decideExcursion>[0]>) =>
  decideExcursion({
    state: noExcursion,
    message: '',
    lessonConceptId: LESSON,
    requestedConceptId: null,
    requestedTopicTitle: null,
    lastAssistantAskedQuestion: false,
    ...over,
  })

describe('Phase 2 — ambiguous turn holds the educational context', () => {
  it('A — an open excursion is HELD, not closed, not switched', () => {
    const d = decide({
      state: openExcursion(1),
      message: "I'm done for today, but why does it bend?",
      ambiguous: true,
    })
    expect(d.state.active).toBe(true)
    expect(d.targetConceptId).toBe(SIDE)
    expect(d.transition).toBe('continued')
    expect(d.justClosed).toBe(false)
  })

  it('B — an ordinary lesson turn stays on the lesson', () => {
    const d = decide({
      message: "I'm done for today, but why does it bend?",
      ambiguous: true,
    })
    expect(d.state.active).toBe(false)
    expect(d.targetConceptId).toBe(LESSON)
    expect(d.transition).toBe('none')
  })

  it('C — a named concept does NOT open an excursion (control: it does when clear)', () => {
    const input = {
      message: 'explain friction',
      requestedConceptId: SIDE,
    }
    expect(decide({ ...input, ambiguous: true }).state.active).toBe(false)
    expect(decide({ ...input, ambiguous: true }).targetConceptId).toBe(LESSON)

    const control = decide({ ...input, ambiguous: false })
    expect(control.state.active).toBe(true)
    expect(control.targetConceptId).toBe(SIDE)
    expect(control.transition).toBe('started')
  })

  it('D — a named unresolved topic does NOT open one (control: it does when clear)', () => {
    const input = {
      message: 'what is thermal conductivity?',
      requestedTopicTitle: 'thermal conductivity',
    }
    expect(decide({ ...input, ambiguous: true }).state.active).toBe(false)

    const control = decide({ ...input, ambiguous: false })
    expect(control.state.active).toBe(true)
    expect(control.state.targetTopicTitle).toBe('thermal conductivity')
  })

  it('E — a satisfaction signal does NOT close (control: it closes when clear)', () => {
    const input = { state: openExcursion(2), message: 'got it, thanks' }
    const held = decide({ ...input, ambiguous: true })
    expect(held.state.active).toBe(true)
    expect(held.justClosed).toBe(false)

    const control = decide({ ...input, ambiguous: false })
    expect(control.state.active).toBe(false)
    expect(control.transition).toBe('closed-satisfied')
  })

  it('F — a return request does NOT close (control: it closes when clear)', () => {
    const input = { state: openExcursion(2), message: "let's get back to the lesson" }
    expect(decide({ ...input, ambiguous: true }).state.active).toBe(true)

    const control = decide({ ...input, ambiguous: false })
    expect(control.state.active).toBe(false)
    expect(control.transition).toBe('closed-returned')
  })

  it('G — ambiguity does NOT outrank the turn-limit safety valve', () => {
    const d = decide({
      state: openExcursion(MAX_EXCURSION_TURNS),
      message: "I'm done, but why?",
      ambiguous: true,
    })
    expect(d.state.active).toBe(false)
    expect(d.transition).toBe('closed-turn-limit')
  })

  it('H — ambiguity does NOT outrank the lesson-changed safety valve', () => {
    const d = decide({
      state: { ...openExcursion(1), returnToConceptId: 'phys.mech.newtons-first-law' },
      message: "I'm done, but why?",
      ambiguous: true,
    })
    expect(d.state.active).toBe(false)
    expect(d.transition).toBe('closed-lesson-changed')
  })

  it('I — HOLD does not disturb mastery attribution either way', () => {
    // No excursion: the turn still belongs to the lesson, exactly as before.
    expect(turnCountsForLesson(decide({ message: 'x', ambiguous: true }))).toBe(true)
    // Excursion open: it still does not, exactly as before. HOLD neither
    // freezes a ladder that was running nor thaws one that was frozen.
    expect(
      turnCountsForLesson(decide({ state: openExcursion(1), message: 'x', ambiguous: true })),
    ).toBe(false)
  })

  it('J — a held excursion still advances its turn counter, so the valve converges', () => {
    let state = openExcursion(0)
    for (let i = 0; i < MAX_EXCURSION_TURNS; i += 1) {
      const d = decide({ state, message: "I'm done, but why?", ambiguous: true })
      state = d.state
    }
    // The counter reached the limit under HOLD; the next turn is closed by the
    // valve rather than held forever.
    expect(decide({ state, message: 'anything', ambiguous: true }).transition)
      .toBe('closed-turn-limit')
  })

  it('K — a clear request still opens an excursion (the guard is not always-on)', () => {
    const d = decide({ message: 'explain friction', requestedConceptId: SIDE, ambiguous: false })
    expect(d.state.active).toBe(true)
    expect(d.targetConceptId).toBe(SIDE)
  })

  it('L — a clear return still closes (the guard is not always-on)', () => {
    const d = decide({
      state: openExcursion(1),
      message: "let's get back to the lesson",
      ambiguous: false,
    })
    expect(d.transition).toBe('closed-returned')
  })

  it('M — omitting `ambiguous` behaves exactly as false (back-compat)', () => {
    const omitted = decide({ message: 'explain friction', requestedConceptId: SIDE })
    const explicit = decide({ message: 'explain friction', requestedConceptId: SIDE, ambiguous: false })
    expect(omitted).toEqual(explicit)
    expect(omitted.state.active).toBe(true)
  })
})

describe('Phase 2 — what actually reaches the guard', () => {
  it('N — the real conflict shapes read as ambiguous', () => {
    const stopAndQuestion = readTurnIntent("I'm done for today, but why does it bend?", null)
    expect(stopAndQuestion.ambiguous).toBe(true)
    expect(stopAndQuestion.conflicts.map((c) => c.code)).toContain('STOP_AND_QUESTION')

    const stopAndRequest = readTurnIntent("that's enough for today, show me a diagram", null)
    expect(stopAndRequest.ambiguous).toBe(true)
    expect(stopAndRequest.conflicts.map((c) => c.code)).toContain('STOP_AND_REQUEST')
  })

  it('O — ordinary teaching turns are NOT ambiguous and reach no guard', () => {
    for (const message of [
      'why does light bend?',
      "I'm done for today",
      'show me a diagram',
      'explain it differently',
      'the answer is 12',
      "I don't understand this",
    ]) {
      expect(readTurnIntent(message, null).ambiguous, message).toBe(false)
    }
  })
})
