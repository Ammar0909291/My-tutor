/**
 * PHASE 1 — THE AUTHORITY BOUNDARY.
 *
 * Nine places in one turn independently read the learner's raw text and drew
 * their own conclusion, so when two disagreed the winner was decided by source
 * order. This pins the boundary that ends that for the five PURE-TEXT readers,
 * and pins the two that could not move, with the reason.
 *
 * NEGATIVE CONTROLS matter here more than assertions: a test that passes with
 * and without the boundary proves nothing. The route-wiring tests below fail if
 * any consumer goes back to reading `message` directly — which is the only
 * thing the boundary actually guarantees.
 */
import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { readTurnIntent } from '@/lib/teaching/turnIntent'
import * as turnIntentModule from '@/lib/teaching/turnIntent'
import { detectFailureState } from '@/lib/teaching/recoveryGuard'
import { detectExplicitFinishRequest } from '@/lib/teaching/sessionLifecycle'
import { detectLearnerRequest, requestedVisualForm } from '@/lib/teaching/masteryGate'
import { isGenuineQuestion } from '@/lib/understanding/readers/conversationReader'

const ROUTE = readFileSync('src/app/api/learn/chat/route.ts', 'utf8')

const SAMPLES = [
  'ok', 'what?', "I don't understand", 'can you show me a picture?',
  'show me a diagram', 'give me a real life example', 'explain it differently',
  "I'm done for today", 'bye', 'why does light bend?', 'I give up',
  'can you graph this?', 'the second one', 'B', "let's continue tomorrow",
]

describe('one turn produces exactly one interpretation', () => {
  it('is a HOIST, not a reinterpretation — identical to calling each detector', () => {
    // THE central safety property. If this drifts, behaviour changed.
    for (const m of SAMPLES) {
      const intent = readTurnIntent(m, null)
      expect(intent.failureState).toEqual(detectFailureState(m, null))
      expect(intent.isQuestion).toEqual(isGenuineQuestion(m))
      expect(intent.wantsToStop).toEqual(detectExplicitFinishRequest(m))
      expect(intent.learnerRequest).toEqual(detectLearnerRequest(m))
      expect(intent.visualForm).toEqual(requestedVisualForm(m))
    }
  })

  it('is deterministic and carries the message so nothing re-reads it', () => {
    const a = readTurnIntent('can you show me a picture?', null)
    const b = readTurnIntent('can you show me a picture?', null)
    expect(JSON.stringify(a)).toBe(JSON.stringify(b))
    expect(a.message).toBe('can you show me a picture?')
  })

  it('the prior-message input is honoured, not dropped', () => {
    // detectFailureState's second argument drives repeated-answer frustration.
    const withPrior = readTurnIntent('same thing again', 'same thing again')
    expect(withPrior.failureState).toEqual(detectFailureState('same thing again', 'same thing again'))
  })
})

describe('disagreement is REPRESENTED, not silently resolved', () => {
  it('a stop that also asks something records both, and resolves neither', () => {
    const i = readTurnIntent("I'm done for today, but why does it bend?", null)
    expect(i.wantsToStop).toBe(true)
    // Both readings survive — neither is discarded to make the other win.
    expect(i.conflicts.map((c) => c.code)).toContain('STOP_AND_QUESTION')
    expect(i.ambiguous).toBe(true)
  })

  it('a clean message has no conflicts and is not ambiguous', () => {
    const i = readTurnIntent('show me a diagram', null)
    expect(i.conflicts).toEqual([])
    expect(i.ambiguous).toBe(false)
  })

  it('ambiguity is INERT in Phase 1 — it is a field, not an action', () => {
    // The whole object is data. Nothing here can advance a lesson, grade an
    // answer, change mastery or replace a topic, because there is nothing to
    // call: the module exports one pure reader and no mutator.
    const fns = Object.entries(turnIntentModule)
      .filter(([, v]) => typeof v === 'function')
      .map(([k]) => k)
    expect(fns).toEqual(['readTurnIntent'])
  })
})

describe('route wiring — no competing raw-text read remains', () => {
  // NEGATIVE CONTROLS. Each of these fails the moment a consumer goes back to
  // reading the message itself, which is the only guarantee the boundary makes.
  for (const detector of [
    'detectFailureState', 'detectExplicitFinishRequest',
    'detectLearnerRequest', 'requestedVisualForm', 'isGenuineQuestion',
  ]) {
    it(`${detector} is never called on the raw message in the route`, () => {
      expect(ROUTE).not.toMatch(new RegExp(`\\b${detector}\\(message`))
    })
  }

  it('the authoritative read happens once, and before every consumer', () => {
    const read = ROUTE.indexOf('const turnIntent = readTurnIntent(')
    expect(read).toBeGreaterThan(-1)
    expect(ROUTE.match(/readTurnIntent\(/g) ?? []).toHaveLength(1)
    for (const consumer of [
      'turnIntent.failureState',
      'turnIntent.isQuestion',
      'turnIntent.wantsToStop',
      'turnIntent.learnerRequest',
      'turnIntent.visualForm',
    ]) {
      expect(ROUTE.indexOf(consumer)).toBeGreaterThan(read)
    }
  })

  it('the two state-dependent readers are UNCHANGED and still where they were', () => {
    // Reported, not moved: hoisting these means hoisting excursion state, which
    // is an excursion redesign and out of scope for this phase.
    expect(ROUTE).toContain('resolveRequestedConceptId(message, excursionLessonConceptId, subjectCode)')
    expect(ROUTE).toContain('namedTopicUnknownTo(message, taughtText)')
  })

  it('Phase 0 provenance is untouched and still records after the close', () => {
    const record = ROUTE.indexOf('[turn-decision] provenance line skipped')
    const closeReplace = ROUTE.lastIndexOf('cleanText = buildLessonCloseText')
    expect(record).toBeGreaterThan(closeReplace)
    expect(ROUTE).toContain('formatTurnDecisionLog(')
  })
})
