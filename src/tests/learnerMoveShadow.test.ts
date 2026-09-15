/**
 * LEARNER-MOVE PREVALENCE — Batch 1 shadow wiring, proved against the real
 * module and pinned against `route.ts`'s own source.
 *
 * Design: `docs/architecture/LEARNER_MOVE_INTERPRETER_DESIGN.md` §8 Batch 1.
 * Modelled directly on `excursionLifecycleTelemetry.test.ts` — same PII
 * discipline, same "exactly one emit site" / "wrapped so it can never break
 * the turn" route-wiring pins.
 */
import { describe, it, expect } from 'vitest'
import { readFileSync } from 'fs'
import { readLearnerMove, refineLearnerMove, type MessageOnlyDetectorOutputs } from '@/lib/teaching/learnerMove'
import { buildLearnerMoveEvent, recordLearnerMoveEvent, LEARNER_MOVE_EVENT_PREFIX } from '@/lib/teaching/learnerMoveTelemetry'
import type { TurnIntent } from '@/lib/teaching/turnIntent'

const SESSION = 'cmtky68dm0009l204a7c210s7'
const T0 = Date.parse('2026-09-15T03:10:00.000Z')

const BASE_INTENT: TurnIntent = {
  message: '',
  failureState: null,
  isQuestion: false,
  wantsToStop: false,
  learnerRequest: null,
  visualForm: null,
  wantsPractice: false,
  conflicts: [],
  ambiguous: false,
}
const NO_EXTRA: MessageOnlyDetectorOutputs = { isBareAcknowledgement: false, isLowSignalAcknowledgement: false }

describe('no learner text and no signal detail reach the measurement', () => {
  const SECRET = 'my name is Ammar and my email is learner@example.com'

  it('a QUESTION_ABOUT_TOPIC signal — whose own `detail` IS the learner\'s words — never leaks them', () => {
    const staged = readLearnerMove(
      { ...BASE_INTENT, message: `What is ${SECRET}?`, isQuestion: true },
      NO_EXTRA,
    )
    const refined = refineLearnerMove(staged, {
      pendingProbe: null,
      taughtText: 'This lesson covers free body diagrams and net force.',
      lessonConceptId: 'phys.mech.newtons-second-law',
    })
    // Sanity: the topic really was named, so `detail` on the real signal
    // really does carry the secret — proving the event-builder is the thing
    // stripping it, not an accident of the fixture.
    const topicSignal = refined.signals.find((s) => s.kind === 'QUESTION_ABOUT_TOPIC')
    expect(topicSignal?.detail).toContain('Ammar')

    const event = buildLearnerMoveEvent({
      reading: refined,
      sessionId: SESSION,
      subject: 'physics',
      lessonConceptId: 'phys.mech.newtons-second-law',
      turnReceivedAt: T0,
    })
    const serialised = JSON.stringify(event)
    expect(serialised).not.toContain('Ammar')
    expect(serialised).not.toContain('@example.com')
    expect(serialised).not.toContain(SECRET)
  })

  it('the message itself never reaches the event, on an ordinary or a distress turn', () => {
    const cases = [
      readLearnerMove({ ...BASE_INTENT, message: SECRET }, NO_EXTRA),
      readLearnerMove({ ...BASE_INTENT, message: SECRET, failureState: 'dont_know' }, NO_EXTRA),
    ]
    for (const reading of cases) {
      const event = buildLearnerMoveEvent({
        reading, sessionId: SESSION, subject: 'physics', lessonConceptId: null, turnReceivedAt: T0,
      })
      const serialised = JSON.stringify(event)
      expect(serialised).not.toContain('Ammar')
      expect(serialised).not.toContain('example.com')
    }
  })

  it('the event carries no userId, email, message or detail field at all', () => {
    const reading = readLearnerMove({ ...BASE_INTENT, message: 'the answer is 4' }, NO_EXTRA)
    const event = buildLearnerMoveEvent({
      reading, sessionId: SESSION, subject: 'physics', lessonConceptId: null, turnReceivedAt: T0,
    })
    const keys = Object.keys(event)
    expect(keys).not.toContain('userId')
    expect(keys).not.toContain('email')
    expect(keys).not.toContain('message')
    expect(keys).not.toContain('text')
    expect(keys).not.toContain('detail')
    expect(JSON.stringify(event)).not.toContain('"detail"')
    // sessionId is the correlation id, and it is a cuid, not a person
    expect(keys).toContain('sessionId')
  })

  it('the module never reads `.detail` off a signal — structural, not a spot check', () => {
    const src = readFileSync('src/lib/teaching/learnerMoveTelemetry.ts', 'utf-8')
    // Comments cite `LearnerMoveSignal.detail` BY NAME as the very thing this
    // module must not read (that is the point of the comments); the
    // constraint is about CODE, so block/line comments are stripped first —
    // same discipline `learnerMovePurity.test.ts` uses for `learnerMove.ts`.
    const code = src
      .replace(/\/\*[\s\S]*?\*\//g, '')
      .split('\n')
      .map((l) => l.replace(/\/\/.*$/, ''))
      .join('\n')
    expect(code).not.toMatch(/\.detail\b/)
    expect(code).not.toMatch(/\bmessage\b\s*[:.]/)
  })
})

describe('the reading fed to the event is UNINTERPRETABLE-aware and stage-labelled', () => {
  it('an ordinary turn with no probe pending is uninterpretable, and that fact is on the event', () => {
    const staged = readLearnerMove({ ...BASE_INTENT, message: 'the anode' }, NO_EXTRA)
    const refined = refineLearnerMove(staged, { pendingProbe: null, taughtText: null, lessonConceptId: null })
    const event = buildLearnerMoveEvent({
      reading: refined, sessionId: SESSION, subject: 'physics', lessonConceptId: null, turnReceivedAt: T0,
    })
    expect(event.uninterpretable).toBe(true)
    expect(event.kinds).toEqual(['UNINTERPRETABLE'])
    expect(event.stage).toBe('state-refined')
  })
})

describe('the route wires the shadow exactly once, safely', () => {
  const ROUTE = readFileSync('src/app/api/learn/chat/route.ts', 'utf-8')

  it('exactly one emit site', () => {
    expect(ROUTE.split('recordLearnerMoveEvent(').length - 1).toBe(1)
  })

  it('exactly one refineLearnerMove call; readLearnerMove now legitimately has 2 (hoist + fallback)', () => {
    // Batch 5 (design doc §8 row 5) hoists stage A earlier (AUTONOMY/
    // NAVIGATION steering site) and Batch 1's own site reuses it via a
    // defensive `?? readLearnerMove(...)` fallback — 2 real call-
    // expressions in the whole file is now correct, not a regression.
    // Original assertion, preserved:
    //
    //   expect(ROUTE.split('readLearnerMove(').length - 1).toBe(1)
    //
    // learnerMoveSteeringEquivalence.test.ts is the authoritative,
    // comment-stripped pin for that count (2). Stage B is untouched by
    // Batch 5 — still exactly one `refineLearnerMove(` call.
    expect(ROUTE.split('refineLearnerMove(').length - 1).toBe(1)
  })

  it('the emit is wrapped so it can never break the turn', () => {
    const i = ROUTE.indexOf('recordLearnerMoveEvent(')
    expect(i).toBeGreaterThan(-1)
    // The whole shadow block, from its own header comment to the emit call,
    // is one `try`. `excursionLifecycleTelemetry.test.ts`'s own 500-char
    // window is too short for this block (the header comment alone runs
    // longer), so anchor on the block's own named start instead of a fixed
    // character offset.
    const start = ROUTE.lastIndexOf('Learner-Move Interpreter, Batch 1', i)
    expect(start).toBeGreaterThan(-1)
    expect(ROUTE.slice(start, i)).toMatch(/try \{/)
    // And the try never closes before the emit — no early `} catch` between
    // the header and the call that would leave the emit unguarded.
    const tryAt = ROUTE.indexOf('try {', start)
    const catchAt = ROUTE.indexOf('} catch', tryAt)
    expect(catchAt).toBeGreaterThan(i)
  })

  it('the log prefix is the shared constant, so an aggregation query cannot drift', () => {
    expect(LEARNER_MOVE_EVENT_PREFIX).toBe('[learn/chat] LEARNER_MOVE=')
  })

  it('reads `turnIntent`, the same instance readTurnIntent produced — never a re-derivation', () => {
    // Batch 5 added TWO earlier mentions of `readLearnerMove(` inside
    // COMMENTS (~L861 and within Batch 1's own header block, ~L7167), so a
    // bare `indexOf` — file-wide OR scoped to Batch 1's header — no longer
    // lands on the real call. Anchored on the actual assignment statement's
    // own literal text instead, which cannot appear in prose by accident.
    const i = ROUTE.indexOf('const learnerMoveStageA = learnerMoveStageAHoisted ?? readLearnerMove(')
    expect(i).toBeGreaterThan(-1)
    expect(ROUTE.slice(i, i + 90)).toMatch(/readLearnerMove\(turnIntent,/)
  })

  it('reads the resolved Batch-6 ack booleans, never re-detecting them', () => {
    const i = ROUTE.indexOf('const learnerMoveStageA = learnerMoveStageAHoisted ?? readLearnerMove(')
    const block = ROUTE.slice(i, i + 350)
    expect(block).toMatch(/resolvedIsBareAck/)
    expect(block).toMatch(/resolvedLowSignalAck/)
  })

  it('never calls resolveMcqChoice at the shadow site (grading is untouched)', () => {
    const i = ROUTE.indexOf('recordLearnerMoveEvent(')
    const start = ROUTE.lastIndexOf('Learner-Move Interpreter, Batch 1', i)
    expect(ROUTE.slice(start, i)).not.toMatch(/resolveMcqChoice/)
  })
})

// The record function itself must never throw outward, matching
// excursionTelemetry/brainMetrics' own fail-open contract — exercised
// directly since `console.log` cannot meaningfully be made to throw from a
// test without mocking it, which would test the mock, not the guarantee.
describe('recordLearnerMoveEvent never breaks the caller', () => {
  it('is callable and returns void even for a maximal event', () => {
    const reading = readLearnerMove(
      { ...BASE_INTENT, message: 'x', failureState: 'give_up', isQuestion: true, learnerRequest: 'diagram', wantsPractice: true, wantsToStop: true },
      { isBareAcknowledgement: true, isLowSignalAcknowledgement: true },
    )
    const event = buildLearnerMoveEvent({
      reading, sessionId: SESSION, subject: 'physics', lessonConceptId: 'phys.mech.newtons-second-law', turnReceivedAt: T0,
    })
    expect(recordLearnerMoveEvent(event)).toBeUndefined()
  })
})
