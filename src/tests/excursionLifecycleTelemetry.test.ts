/**
 * EXCURSION PREVALENCE — the measurement, proved against the real lifecycle.
 *
 * R1-R4 are production-verified, so excursion BEHAVIOUR is known. Its
 * POPULATION FREQUENCY is not: every excursion signal in production was a
 * pretty-printed object log with no session identity and no aggregable shape.
 * This file pins the instrumentation that closes that gap
 * (docs/architecture/EXCURSION_GATE_OWNERSHIP_PROPOSAL.md §9 step 0).
 *
 * WHAT IS NOT MOCKED: the real `decideExcursion`, driven turn by turn with the
 * persisted state fed forward exactly as route.ts feeds it. A measurement built
 * on a re-implementation of the lifecycle would measure the re-implementation.
 *
 * THE DEFECT CLASS THIS GUARDS: counting one excursion once per turn. A
 * six-turn detour that reports six opens turns a rare event into an epidemic
 * and would send the next decision the wrong way.
 */
import { describe, it, expect, vi } from 'vitest'
import { readFileSync } from 'fs'
import {
  decideExcursion, NO_EXCURSION, MAX_EXCURSION_TURNS,
  type ExcursionState, type ExcursionDecision,
} from '@/lib/teaching/excursion'
import {
  buildExcursionEvent, recordExcursionEvent, EXCURSION_EVENT_PREFIX,
  type ExcursionEvent,
} from '@/lib/teaching/excursionTelemetry'

const LESSON = 'phys.mech.newtons-second-law'
const SIDE = 'phys.mech.acceleration'
const SESSION = 'cmtky68dm0009l204a7c210s7'
const T0 = Date.parse('2026-09-03T03:10:00.000Z')

/**
 * One turn, exactly as route.ts runs it: decide from the persisted state, build
 * the event from the PRIOR state plus the decision, then persist the new state.
 */
function turn(
  state: ExcursionState,
  message: string,
  over: Record<string, unknown> = {},
  n = 0,
): { state: ExcursionState; decision: ExcursionDecision; event: ExcursionEvent } {
  const lessonConceptId = 'lessonConceptId' in over
    ? (over.lessonConceptId as string | null)
    : LESSON
  const decision = decideExcursion({
    state,
    message,
    lessonConceptId,
    requestedConceptId: null,
    lastAssistantAskedQuestion: true,
    ...over,
  } as Parameters<typeof decideExcursion>[0])
  const event = buildExcursionEvent({
    priorState: state,
    decision,
    lessonConceptId,
    sessionId: SESSION,
    subject: 'physics',
    turnReceivedAt: T0 + n * 60_000,
  })
  return { state: decision.state, decision, event }
}

/** Open an excursion, then hold it for `hold` further turns. */
function runExcursion(hold: number) {
  const events: ExcursionEvent[] = []
  let s = NO_EXCURSION
  const opened = turn(s, 'can you explain acceleration', { requestedConceptId: SIDE }, 0)
  events.push(opened.event); s = opened.state
  for (let i = 1; i <= hold; i++) {
    const t = turn(s, 'and why does that happen', {}, i)
    events.push(t.event); s = t.state
  }
  return { events, state: s, nextIndex: hold + 1 }
}

describe('one excursion is one OPEN, however many turns it spans', () => {
  it('a single opening produces exactly one open event', () => {
    const { events } = runExcursion(0)
    expect(events.filter((e) => e.kind === 'open')).toHaveLength(1)
    expect(events[0].transition).toBe('started')
    expect(events[0].targetConceptId).toBe(SIDE)
    expect(events[0].lessonConceptId).toBe(LESSON)
  })

  it('five further turns inside the SAME excursion add no opens', () => {
    // The defect this exists to prevent: 1 excursion reported as 6.
    const { events } = runExcursion(5)
    expect(events).toHaveLength(6)
    expect(events.filter((e) => e.kind === 'open')).toHaveLength(1)
    expect(events.filter((e) => e.kind === 'continue')).toHaveLength(5)
    expect(events.filter((e) => e.kind === 'close')).toHaveLength(0)
  })

  it('a SWITCHED target is not a new excursion', () => {
    // The excursion never closed, so counting this as an open would double the
    // numerator for a learner who simply asked about a second thing.
    const { state, nextIndex } = runExcursion(1)
    const t = turn(state, 'actually explain kinetic energy instead',
      { requestedConceptId: 'phys.mech.kinetic-energy' }, nextIndex)
    expect(t.event.kind).toBe('switch')
    expect(t.event.transition).toBe('switched')
    expect(t.event.kind).not.toBe('open')
    // the run that just ended is still measured
    expect(t.event.turnsHeld).toBe(1)
  })
})

describe('every close reason is measured, and stays distinguishable', () => {
  const cases: Array<[string, string, Record<string, unknown>]> = [
    ['closed-satisfied', 'ok got it thanks', {}],
    ['closed-returned', 'back to the lesson please', {}],
    ['closed-on-lesson', 'so F=ma means force equals mass times acceleration',
      { requestedConceptId: LESSON }],
    ['closed-wants-practice', 'give me a practice question', { wantsPractice: true }],
    ['closed-lesson-changed', 'ok', { lessonConceptId: 'phys.mech.kinetic-energy' }],
  ]

  for (const [reason, message, over] of cases) {
    it(`${reason} produces exactly one close event carrying its reason`, () => {
      const { state, nextIndex } = runExcursion(2)
      const t = turn(state, message, over, nextIndex)
      expect(t.event.kind).toBe('close')
      expect(t.event.transition).toBe(reason)
      expect(t.event.atBound).toBe(false)
    })
  }

  it('closed-lesson-changed stays distinguishable from a normal close', () => {
    // Navigating away is not the learner finishing a detour, and a prevalence
    // report that conflates them overstates how often excursions resolve well.
    const { state, nextIndex } = runExcursion(2)
    const navigated = turn(state, 'ok', { lessonConceptId: 'phys.mech.kinetic-energy' }, nextIndex)
    const finished = turn(state, 'ok got it thanks', {}, nextIndex)
    expect(navigated.event.anchorHeld).toBe(false)
    expect(finished.event.anchorHeld).toBe(true)
    expect(navigated.event.transition).not.toBe(finished.event.transition)
  })

  it('a prerequisite detour is distinguishable from a chosen one at both ends', () => {
    const opened = turn(NO_EXCURSION, 'what is acceleration though, i dont get it',
      { requestedConceptId: SIDE, knowledgeGapConceptId: SIDE }, 0)
    expect(opened.event.openedAsKnowledgeGap).toBe(true)
    const closed = turn(opened.state, 'quiz me now', { wantsPractice: true }, 1)
    expect(closed.event.openedAsKnowledgeGap).toBe(true)
  })
})

describe('turns-held is read from the state that actually holds it', () => {
  it('is the prior counter, not the closing decision (which is reset to zero)', () => {
    // decideExcursion returns NO_EXCURSION on a close, so reading the DECISION's
    // own `turns` would report every excursion in production as zero turns long.
    const { state, nextIndex } = runExcursion(3)
    expect(state.turns).toBe(3)
    const t = turn(state, 'ok got it thanks', {}, nextIndex)
    expect(t.decision.state.turns).toBe(0)
    expect(t.event.turnsHeld).toBe(3)
  })

  it('turnsBlocked counts the opening and closing turns too', () => {
    // Both are blocked: the open turn has active state, and the close turn is
    // the RETURN turn, which turnCountsForLesson also excludes.
    const { state, nextIndex } = runExcursion(3)
    const t = turn(state, 'ok got it thanks', {}, nextIndex)
    expect(t.event.turnsBlocked).toBe(5)
  })

  it('turnsHeld is null where no run ended, so it cannot be summed by accident', () => {
    const { events } = runExcursion(2)
    expect(events.map((e) => e.turnsHeld)).toEqual([null, null, null])
  })
})

describe('the 6-turn safety bound is measured as such', () => {
  it('a bound closure records 6 held turns and flags atBound', () => {
    const { state, nextIndex } = runExcursion(MAX_EXCURSION_TURNS)
    expect(state.turns).toBe(MAX_EXCURSION_TURNS)
    const t = turn(state, 'and what about when it speeds up', {}, nextIndex)
    expect(t.event.transition).toBe('closed-turn-limit')
    expect(t.event.turnsHeld).toBe(6)
    expect(t.event.atBound).toBe(true)
    expect(t.event.turnsBlocked).toBe(8)
  })

  it('one turn earlier is not at the bound', () => {
    const { state, nextIndex } = runExcursion(MAX_EXCURSION_TURNS - 1)
    const t = turn(state, 'and what about when it speeds up', {}, nextIndex)
    expect(t.event.atBound).not.toBe(true)
    expect(t.event.kind).toBe('continue')
  })
})

describe('the denominator: ordinary turns are measured, and are not excursions', () => {
  it('an ordinary lesson turn emits a none event with no lifecycle fields', () => {
    const t = turn(NO_EXCURSION, 'I think the answer is 2 m/s^2', {}, 0)
    expect(t.event.kind).toBe('none')
    expect(t.event.eligible).toBe(true)
    expect(t.event.turnsHeld).toBeNull()
    expect(t.event.turnsBlocked).toBeNull()
    expect(t.event.atBound).toBeNull()
    expect(t.event.targetConceptId).toBeNull()
  })

  it('a turn with no lesson is marked NOT eligible rather than dropped', () => {
    // Free chat / Library browsing: an excursion is structurally impossible, so
    // these turns are not a denominator for anything and must not silently
    // dilute one.
    const t = turn(NO_EXCURSION, 'explain acceleration',
      { lessonConceptId: null, requestedConceptId: SIDE }, 0)
    expect(t.event.eligible).toBe(false)
    expect(t.event.kind).toBe('none')
  })

  it('prevalence is computable from one stream: 1 excursion over 9 eligible turns', () => {
    const { events, state, nextIndex } = runExcursion(6)
    const closed = turn(state, 'ok got it thanks', {}, nextIndex)
    const ordinary = [0, 1].map((i) => turn(NO_EXCURSION, 'the answer is 4', {}, 100 + i).event)
    const all = [...events, closed.event, ...ordinary]

    const eligibleTurns = all.filter((e) => e.eligible).length
    const opens = all.filter((e) => e.kind === 'open').length
    const sessionsWithExcursion = new Set(all.filter((e) => e.kind === 'open').map((e) => e.sessionId)).size
    const eligibleSessions = new Set(all.filter((e) => e.eligible).map((e) => e.sessionId)).size

    expect(eligibleTurns).toBe(10)
    expect(opens).toBe(1)
    expect(sessionsWithExcursion / eligibleSessions).toBe(1)
    // and the cost of that one excursion, from the close event alone
    expect(closed.event.turnsBlocked).toBe(8)
  })
})

describe('duplication', () => {
  it('a retry of the SAME turn cannot produce a second open', () => {
    // FOUND BY THIS TEST, and the reason `kind` is not just the transition
    // label: excursion.ts emits transition 'started' AGAIN when the concept an
    // excursion is already on is re-requested. Counting the label would have
    // reported one excursion as two. The persisted prior state is the
    // authority, and it says this one never closed.
    const opened = turn(NO_EXCURSION, 'can you explain acceleration', { requestedConceptId: SIDE }, 0)
    expect(opened.event.kind).toBe('open')
    const retried = turn(opened.state, 'can you explain acceleration', { requestedConceptId: SIDE }, 0)
    expect(retried.event.transition).toBe('started')   // the label repeats …
    expect(retried.event.kind).toBe('restate')          // … the measurement does not
  })

  it('a learner asking for the same topic a third time still adds no open', () => {
    let s = turn(NO_EXCURSION, 'can you explain acceleration', { requestedConceptId: SIDE }, 0)
    const kinds = [s.event.kind]
    for (let i = 1; i <= 2; i++) {
      s = turn(s.state, 'explain acceleration again', { requestedConceptId: SIDE }, i)
      kinds.push(s.event.kind)
    }
    expect(kinds.filter((k) => k === 'open')).toHaveLength(1)
  })

  it('NEGATIVE CONTROL: a genuinely new excursion after a close IS an open', () => {
    // The restate rule must not swallow a real second excursion.
    const opened = turn(NO_EXCURSION, 'can you explain acceleration', { requestedConceptId: SIDE }, 0)
    const closed = turn(opened.state, 'ok got it thanks', {}, 1)
    expect(closed.event.kind).toBe('close')
    const again = turn(closed.state, 'can you explain acceleration', { requestedConceptId: SIDE }, 2)
    expect(again.event.kind).toBe('open')
  })

  it('duplicate DELIVERY of one execution collapses on turnKey', () => {
    const { event } = turn(NO_EXCURSION, 'can you explain acceleration', { requestedConceptId: SIDE }, 3)
    const delivered = [event, { ...event }, { ...event }]
    expect(delivered).toHaveLength(3)
    expect(new Set(delivered.map((e) => e.turnKey)).size).toBe(1)
  })

  it('two genuinely different turns do NOT collapse', () => {
    // The negative control for the line above: turnKey must not merge real turns.
    const a = turn(NO_EXCURSION, 'the answer is 4', {}, 0).event
    const b = turn(NO_EXCURSION, 'the answer is 5', {}, 1).event
    expect(a.turnKey).not.toBe(b.turnKey)
  })
})

describe('the measurement cannot change what the turn does', () => {
  it('building an event mutates neither the decision nor the prior state', () => {
    const { state } = runExcursion(2)
    const before = JSON.parse(JSON.stringify(state))
    const decision = decideExcursion({
      state, message: 'ok got it thanks', lessonConceptId: LESSON,
      requestedConceptId: null, lastAssistantAskedQuestion: true,
    } as Parameters<typeof decideExcursion>[0])
    const decisionBefore = JSON.parse(JSON.stringify(decision))
    buildExcursionEvent({
      priorState: state, decision, lessonConceptId: LESSON,
      sessionId: SESSION, subject: 'physics', turnReceivedAt: T0,
    })
    expect(state).toEqual(before)
    expect(decision).toEqual(decisionBefore)
  })

  it('the transition is identical whether or not it is measured', () => {
    const args = {
      state: runExcursion(2).state, message: 'ok got it thanks', lessonConceptId: LESSON,
      requestedConceptId: null, lastAssistantAskedQuestion: true,
    } as Parameters<typeof decideExcursion>[0]
    const unmeasured = decideExcursion(args)
    const measured = decideExcursion(args)
    buildExcursionEvent({
      priorState: NO_EXCURSION, decision: measured, lessonConceptId: LESSON,
      sessionId: SESSION, subject: 'physics', turnReceivedAt: T0,
    })
    expect(measured).toEqual(unmeasured)
  })

  it('a throwing logger cannot break the turn', () => {
    const spy = vi.spyOn(console, 'log').mockImplementation(() => { throw new Error('log sink down') })
    const { event } = turn(NO_EXCURSION, 'the answer is 4', {}, 0)
    expect(() => recordExcursionEvent(event)).not.toThrow()
    spy.mockRestore()
  })
})

describe('no learner text and no PII reach the measurement', () => {
  const SECRET = 'my name is Ammar and my email is learner@example.com'

  it('an unresolved TOPIC excursion logs the kind, never the learner words', () => {
    // requestedTopicTitle is literally the learner's own words. The pretty
    // `[excursion]` line prints it; this one must not.
    const t = turn(NO_EXCURSION, `Can we move on to how ${SECRET} works?`,
      { requestedTopicTitle: SECRET }, 0)
    expect(t.event.kind).toBe('open')
    expect(t.event.targetKind).toBe('topic')
    expect(t.event.targetConceptId).toBeNull()
    expect(JSON.stringify(t.event)).not.toContain('Ammar')
    expect(JSON.stringify(t.event)).not.toContain('@example.com')
  })

  it('no field of any lifecycle event contains the message', () => {
    const { state, nextIndex } = runExcursion(1)
    const all = [
      turn(NO_EXCURSION, SECRET, {}, 0).event,
      turn(state, SECRET, {}, nextIndex).event,
      turn(state, `${SECRET} ok got it thanks`, {}, nextIndex).event,
    ]
    for (const e of all) {
      const serialised = JSON.stringify(e)
      expect(serialised).not.toContain('Ammar')
      expect(serialised).not.toContain('learner@example.com')
    }
  })

  it('the event carries no userId or email field at all', () => {
    const keys = Object.keys(turn(NO_EXCURSION, 'the answer is 4', {}, 0).event)
    expect(keys).not.toContain('userId')
    expect(keys).not.toContain('email')
    expect(keys).not.toContain('message')
    expect(keys).not.toContain('text')
    // sessionId is the correlation id, and it is a cuid, not a person
    expect(keys).toContain('sessionId')
  })

  it('the module never reads a learner message — structural, not a spot check', () => {
    const src = readFileSync('src/lib/teaching/excursionTelemetry.ts', 'utf-8')
    expect(src).not.toMatch(/\bmessage\b\s*[:.]/)
    expect(src).not.toMatch(/targetTopicTitle\s*[,:]\s*$/m)
  })
})

describe('the route emits it once, at the site that owns the transition', () => {
  const ROUTE = readFileSync('src/app/api/learn/chat/route.ts', 'utf-8')

  it('exactly one emit site', () => {
    expect(ROUTE.split('recordExcursionEvent(').length - 1).toBe(1)
  })

  it('exactly one decideExcursion call — one owner, one measurement', () => {
    expect(ROUTE.split('decideExcursion({').length - 1).toBe(1)
  })

  it('it is fed the PRIOR persisted state, not the decision-reset one', () => {
    expect(ROUTE).toMatch(/priorState: priorExcursionState/)
  })

  it('the emit is wrapped so it can never break the turn', () => {
    const i = ROUTE.indexOf('recordExcursionEvent(')
    expect(ROUTE.slice(Math.max(0, i - 500), i)).toMatch(/try \{/)
  })

  it('the log prefix is the shared constant, so an aggregation query cannot drift', () => {
    expect(EXCURSION_EVENT_PREFIX).toBe('[learn/chat] EXCURSION_EVENT=')
  })
})
