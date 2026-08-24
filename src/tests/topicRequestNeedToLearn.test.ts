/**
 * PHASE 5 (Case G, item 2) — TOPIC_REQUEST_RE (visual/session.ts) already
 * recognised "I want to learn X" as an explicit topic request. "I need to
 * learn X first" is the same request with a different modal auxiliary
 * (want/need), but was entirely absent, so an explicit prerequisite request
 * phrased that way could not open an excursion via `isExplicitTopicRequest`
 * (which IS this same regex) even though nothing about it is ambiguous.
 *
 * This is a synonym addition to an existing, already-measured production
 * regex (see the file's own "40-topic production run" precedent for
 * QUESTION_FORM_RE) — not a new frame, not a new detector.
 */
import { describe, it, expect } from 'vitest'
import { isExplicitTopicRequest, matchTopicRequest } from '@/lib/teaching/visual/session'
import { resolveRequestedConceptId } from '@/lib/teaching/concept/requestedConcept'

describe('Phase 5 Case G — "need to learn" is now recognised as an explicit topic request', () => {
  it('"I need to learn X first" is an explicit topic request', () => {
    expect(isExplicitTopicRequest('I need to learn compound structures first')).toBe(true)
  })
  it('"I need to learn about X first" is an explicit topic request', () => {
    expect(isExplicitTopicRequest('I need to learn about entropy first')).toBe(true)
  })
  it('the existing "want to learn" phrasing still works (no regression)', () => {
    expect(isExplicitTopicRequest('I want to learn vectors')).toBe(true)
  })
  it('matchTopicRequest resolves a match object for the new phrasing, same as "want"', () => {
    expect(matchTopicRequest('I need to learn about entropy first')).not.toBeNull()
  })

  it('does not over-match: "I need help with this" is unrelated to learning a topic', () => {
    expect(isExplicitTopicRequest('I need help with this')).toBe(false)
  })
  it('does not over-match: "I need a break" names nothing to teach', () => {
    expect(isExplicitTopicRequest('I need a break')).toBe(false)
  })
  it('does not over-match: past tense "needed to learn" is a different claim, not a live request', () => {
    expect(isExplicitTopicRequest('I needed to learn this last week')).toBe(false)
  })

  it('NEGATIVE CONTROL: the OLD pattern (want only) genuinely fails on "need to learn"', () => {
    const oldPattern =
      /\b(teach|show|explain|describe|demonstrate|illustrate|draw|visuali[sz]e|what\s+(?:is|are|was|were)|what'?s|tell\s+me\s+about|help\s+me\s+(?:with|understand)|move\s+on\s+to|switch\s+to|change\s+to|let'?s\s+(?:do|try|learn|study)|now\s+(?:do|teach|explain)|i\s+want\s+to\s+learn|can\s+you\s+(?:teach|show|explain))\b/i
    expect(oldPattern.test('I need to learn compound structures first')).toBe(false)
    // ...but the real (fixed) detector now matches it.
    expect(isExplicitTopicRequest('I need to learn compound structures first')).toBe(true)
  })
})

describe('Phase 5 Case G — end to end: "need to learn" resolves a KG concept when one exists', () => {
  it('resolves an unambiguous concept named after "need to learn"', () => {
    const resolved = resolveRequestedConceptId(
      'I need to learn about hybridization',
      'chem.solid.ionic-solids',
      'chemistry',
    )
    expect(resolved).toBe('chem.bond.hybridization')
  })

  it('honestly returns null when the curriculum genuinely has no such concept — no guessing', () => {
    // "compound structures" is not a KG title anywhere in chemistry; this
    // proves the fix widens WHICH REQUESTS ARE RECOGNISED, not the
    // resolver's own anti-guessing discipline (see requestedConcept.ts).
    const resolved = resolveRequestedConceptId(
      'I need to learn compound structures first',
      'chem.found.pure-substances',
      'chemistry',
    )
    expect(resolved).toBeNull()
  })
})
