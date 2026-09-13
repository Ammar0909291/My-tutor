import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { namedTopicUnknownTo, extractRequestedTopic } from '@/lib/teaching/visual/requestedTopic'
import { resolveRequestedConceptId } from '@/lib/teaching/concept/requestedConcept'

/**
 * THE LEARNER'S MEANING, NOT THE LEARNER'S WORDS (2026-09-13).
 *
 * A request phrase still headed by a preposition or subordinator after every
 * existing trim is an adverbial describing HOW to teach, not a noun phrase
 * naming WHAT to teach. Before this, five such phrases named topics and opened
 * excursions that paused the lesson — two of them PCD-018/PCD-020 verbatim,
 * which the master backlog recorded as closed by a 2026-09-11 PROMPT fix while
 * the deterministic layer went on pausing the lesson underneath it.
 *
 * These are behavioural tests against the REAL extractor and the REAL resolver
 * over the REAL knowledge graph — not a regex over source.
 */

const LESSON = 'Rate Law and Order. The rate law expresses reaction rate as a ' +
  'function of reactant concentration, found by the initial-rate method.'
const UNRELATED = 'Photosynthesis. Plants convert light energy into chemical energy.'

describe('a manner phrase never names a topic', () => {
  // Transcribed from the defect registers; the first two are the reported defects.
  const MANNER = [
    'hi sir, i only know little bit, please teach from start',
    'please teach from start',
    'can you teach me in an easier manner',
    'explain like i am five years old',
    'explain it in a simple manner sir',
    'explain with real life example',
    'teach me from the very beginning',
    'explain in easy words for me',
  ]
  for (const message of MANNER) {
    it(`names nothing: ${JSON.stringify(message)}`, () => {
      expect(namedTopicUnknownTo(message, LESSON)).toBeNull()
      expect(namedTopicUnknownTo(message, UNRELATED)).toBeNull()
    })
  }
})

describe('a genuine topic request still names its topic', () => {
  const REAL: [string, string][] = [
    ['teach me about isotopes', 'isotopes'],
    // Trailing words are not trimmed — pre-existing and unchanged by this fix.
    // CLAUDE.md's excursion-telemetry note records this exact production title
    // (`requestedTopic:'momentum to me first'`); the excursion still targets the
    // right subject because `momentum` is in the word set.
    ['can you explain momentum to me first', 'momentum to me first'],
    ['explain kubernetes pod scheduling', 'kubernetes pod scheduling'],
    ['explain in-vitro fertilisation', 'in-vitro fertilisation'],
  ]
  for (const [message, title] of REAL) {
    it(`still names ${JSON.stringify(title)}`, () => {
      expect(namedTopicUnknownTo(message, UNRELATED)?.title).toBe(title)
    })
  }

  it('a hyphenated head is one token, not a preposition', () => {
    expect(extractRequestedTopic('explain in-vitro fertilisation')?.title).toBe('in-vitro fertilisation')
  })

  it('an in-lesson follow-up is still not a topic (the weak bar is unchanged)', () => {
    expect(namedTopicUnknownTo('why does concentration change the rate?', LESSON)).toBeNull()
  })
})

describe('the two curriculum titles headed by a modifier word take the RESOLVED path', () => {
  // This is the whole safety argument for the shape test, so it is measured
  // against the live KG rather than asserted. `route.ts` consults the
  // unresolved-title path only when the resolver returned nothing.
  it('"like terms" resolves to a concept id', () => {
    expect(resolveRequestedConceptId('explain like terms', 'math.arith.fractions', 'mathematics'))
      .toBe('math.alg.like-terms')
  })
  it('"from print to meaning" resolves to a concept id', () => {
    expect(resolveRequestedConceptId('teach me from print to meaning', 'eng.phonics.phonemic-awareness', 'english'))
      .toBe('eng.reading.print-to-meaning')
  })
  it('route.ts still gates the unresolved path behind the resolver', () => {
    const src = readFileSync(new URL('../app/api/learn/chat/route.ts', import.meta.url), 'utf8')
    expect(src).toMatch(/if \(requestedConceptIdThisTurn\) return null/)
  })
})

describe('the head list stays a list about English, not about subjects', () => {
  it('is exactly the three words with measured defects behind them', () => {
    const src = readFileSync(new URL('../lib/teaching/visual/requestedTopic.ts', import.meta.url), 'utf8')
    const block = src.slice(src.indexOf('const LEADING_MODIFIER_HEADS'))
    const heads = [...block.slice(0, block.indexOf('])')).matchAll(/'([a-z]+)'/g)].map((m) => m[1])
    // Deliberately exact. A first draft carried fifteen more "obvious" siblings
    // and broke `crossSubjectTemporalConnective.test.ts` on "teach me while
    // loops" — `while` and `for` name real control-flow constructs. Widening
    // this set needs a measured defect, not a plausible one.
    expect(new Set(heads)).toEqual(new Set(['from', 'in', 'like']))
  })

  it('every concept title headed by one of them is reachable via the resolver', () => {
    // The safety argument, asserted rather than trusted: `route.ts` consults
    // the unresolved path only when the resolver returned nothing, so a
    // curriculum title headed by a modifier word must resolve.
    const cases: [string, string, string][] = [
      ['explain like terms', 'mathematics', 'math.alg.like-terms'],
      ['teach me from print to meaning', 'english', 'eng.reading.print-to-meaning'],
    ]
    for (const [message, subject, expected] of cases) {
      expect(resolveRequestedConceptId(message, 'phys.mech.momentum', subject)).toBe(expected)
    }
  })
})
