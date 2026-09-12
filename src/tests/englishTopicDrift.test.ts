/**
 * ENG-D07 / ENG-D08 / ENG-D09 — English topic drift.
 *
 * `docs/architecture/ENGLISH_TOPIC_DRIFT_FINDING.md` recorded two episode
 * classes and warned explicitly that they may not share a root cause. They do
 * not. Investigated independently 2026-09-12 against the REAL detectors:
 *
 *   ENG-D08 (self-echoing)  -> the topic-request detector. `namedTopicUnknownTo`
 *                              extracted VERBATIM the phrase the transcripts
 *                              say was then taught. Root cause, not a lead.
 *   ENG-D09 (cross-concept) -> the weak-topic reinforcement advisory, whose
 *                              2026-09-06 suppression guard consults the
 *                              RECOVERY rung of the arbitration ladder but not
 *                              the LEARNER_REQUEST rung above TEACH.
 *   ENG-D07 ("new topic")   -> no runtime mechanism acts on it at all.
 */
import { describe, it, expect } from 'vitest'
import fs from 'fs'
import path from 'path'
import { namedTopicUnknownTo, extractRequestedTopic } from '@/lib/teaching/visual/requestedTopic'
import {
  isExplicitTopicRequest,
  isReturnRequest,
  isExplicitCorrection,
} from '@/lib/teaching/visual/session'
import { resolveRequestedConceptId } from '@/lib/teaching/concept/requestedConcept'
import { readTurnIntent } from '@/lib/teaching/turnIntent'

const DIGRAPHS = 'Digraphs: two letters that make one sound. The sh in ship, the ch in chair.'
const PRINT = 'Print concepts: books open left to right, words carry meaning on the page.'

describe('ENG-D08: a learner pleasantry is not a topic to teach', () => {
  it('"hello, what are we learning today" names nothing', () => {
    // Before the fix this returned the topic "we learning today", which the
    // transcript shows being taught as group-learning dynamics for 5 turns.
    expect(namedTopicUnknownTo('hello, what are we learning today', DIGRAPHS)).toBeNull()
  })

  it('"explain simple please, im a beginner" names nothing', () => {
    // Before the fix: topic "simple please, im a beginner", taught as a
    // four-step meta-lesson on giving a simple explanation.
    expect(namedTopicUnknownTo('explain simple please, im a beginner', PRINT)).toBeNull()
  })

  it('the request phrase is still detected — only the TITLE is refused', () => {
    // The narrowing is in what counts as a NAME, not in whether the learner
    // asked. Widening the request detector instead would have been the wrong
    // layer and would have broken genuine requests.
    expect(isExplicitTopicRequest('hello, what are we learning today')).toBe(true)
    expect(isExplicitTopicRequest('explain simple please, im a beginner')).toBe(true)
  })

  // NEGATIVE CONTROLS — one real word must still be enough to name a topic.
  const genuine: Array<[string, string]> = [
    ['explain photosynthesis today', 'Digraphs are two letters making one sound.'],
    ['teach me about the water cycle', 'Digraphs are two letters making one sound.'],
    ['explain machine learning', 'Digraphs are two letters making one sound.'],
    ['explain simple machines please', 'Digraphs are two letters making one sound.'],
    ['what are prime numbers', 'Digraphs are two letters making one sound.'],
  ]
  it.each(genuine)('still names a topic for %j', (msg, taught) => {
    expect(namedTopicUnknownTo(msg, taught)).not.toBeNull()
  })

  it('a beginner-level aside does not remove a real topic beside it', () => {
    const r = extractRequestedTopic('explain fractions, im a beginner', 1, true)
    expect(r).not.toBeNull()
    // contentWords folds a trailing plural, per its own contract.
    expect([...(r?.words ?? [])]).toContain('fraction')
  })
})

describe('ENG-D09: a learner request preempts the weak-topic advisory', () => {
  const TRIGGER = 'please explain it another way'

  it('reproduces the gap: every PRE-EXISTING suppression term reads false', () => {
    // This is the negative control for the fix. If a future change makes this
    // message suppressible some other way that is fine; what must never happen
    // is this test passing because the message stopped reaching the guard.
    const intent = readTurnIntent(TRIGGER)
    expect(intent.failureState).toBeNull()
    expect(isReturnRequest(TRIGGER)).toBe(false)
    expect(isExplicitCorrection(TRIGGER)).toBe(false)
  })

  it('but the LEARNER_REQUEST rung does fire, which is what now suppresses it', () => {
    expect(readTurnIntent(TRIGGER).learnerRequest).toBe('explain_differently')
  })

  it('an ordinary on-topic turn still leaves the advisory standing', () => {
    const calm = readTurnIntent('so a subordinate clause cannot stand alone')
    expect(calm.failureState).toBeNull()
    expect(calm.learnerRequest).toBeNull()
    expect(isReturnRequest('so a subordinate clause cannot stand alone')).toBe(false)
    expect(isExplicitCorrection('so a subordinate clause cannot stand alone')).toBe(false)
  })

  it('the guard consults the learnerRequest rung', () => {
    const src = fs.readFileSync(
      path.join(process.cwd(), 'src/app/api/learn/chat/route.ts'),
      'utf8',
    )
    const at = src.indexOf('const weakTopicAdvisorySuppressed')
    expect(at).toBeGreaterThan(0)
    const block = src.slice(at, at + 3000)
    expect(block).toContain('if (turnIntent.failureState !== null) return true')
    expect(block).toContain('if (turnIntent.learnerRequest !== null) return true')
  })
})

describe('ENG-D07: "hello, new topic for me" — no runtime mechanism acts on it', () => {
  const M = 'hello, new topic for me'

  it('names no topic, resolves no concept, and requests nothing', () => {
    // Recorded rather than patched: an excursion can only open on a resolved
    // concept id or an unresolved topic title, and both are null here. The
    // observed drift is model behaviour reading its own context, with no
    // deterministic path to narrow. Guessing a regex here would be the kind of
    // speculative patch that produced the ENG-D02 exclusion-list trap.
    expect(namedTopicUnknownTo(M, 'Word formation: prefixes and suffixes.')).toBeNull()
    expect(extractRequestedTopic(M, 1, true)).toBeNull()
    expect(resolveRequestedConceptId(M, 'eng.vocab.word-formation', 'english')).toBeNull()
    expect(isExplicitTopicRequest(M)).toBe(false)
    const intent = readTurnIntent(M)
    expect(intent.learnerRequest).toBeNull()
    expect(intent.failureState).toBeNull()
  })
})
