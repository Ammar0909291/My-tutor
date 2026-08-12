/**
 * A CAPTURED ASSET IS SERVED TO SOMEONE ELSE.
 *
 * ── THE MEASURED FAILURE ────────────────────────────────────────────────────
 * Corpus audit, `phys.meas.dimensions`, real production, real learner account.
 * Asset `f22e5673-4b1f-473a-bec8-4fbb9637c0c0`, served with
 * `provider: memory`, `servingMode: exact_match`, `confidence: 75`:
 *
 *   "Mohammad Suaib, wave interference happens when two water waves overlap on
 *    a pond, combining to make either a much higher crest where they meet or
 *    completely flattening out.
 *
 *    Good question — now, back to Dimensional Analysis, let's examine a
 *    physical formula to see how checking units works…"
 *
 * It was served twice, in two different sessions, BYTE-FOR-BYTE IDENTICAL —
 * which is how it was identified as a stored artefact rather than a model
 * hallucination. The earlier audit entry had listed "a stored asset" as an
 * untested hypothesis; this is the measurement that settled it.
 *
 * ── WHY THE EXISTING GATE PASSED IT ─────────────────────────────────────────
 * Real concept id, supported language, valid kind, long enough, no placeholder,
 * not degenerate. Every check asked whether the text was WELL-FORMED. None
 * asked whether it was REUSABLE, and a captured asset is by definition replayed
 * to a DIFFERENT learner in a DIFFERENT session.
 *
 * Two things make this text unusable that way:
 *   1. it opens by addressing one learner BY NAME — a learner-identity leak
 *      into a shared asset, produced by the capture path itself;
 *   2. it is turn-scoped discourse: an answer to a question asked in that
 *      session plus a steer back to the lesson. Replayed to anyone else it is
 *      a non-sequitur, which is exactly how it read.
 *
 * ── THE LIMIT, STATED RATHER THAN HIDDEN ────────────────────────────────────
 * This does NOT check that content is ON TOPIC. The offending asset's second
 * paragraph is genuinely about dimensional analysis, so a vocabulary-overlap
 * test would have passed it, and a fuzzy semantic test would reject good
 * assets. That gap stays open and is recorded in the ledger.
 */
import { describe, it, expect } from 'vitest'
import { validateExplanationCandidate } from '@/lib/teaching/assets/validation'

const BASE = {
  conceptId: 'phys.meas.dimensions',
  language: 'en',
  familyKind: 'core_explanation',
} as const

/** The asset production actually stored and served, verbatim. */
const SERVED_ASSET =
  "Mohammad Suaib, wave interference happens when two water waves overlap on a pond, " +
  "combining to make either a much higher crest where they meet or completely flattening out.\n\n" +
  "Good question — now, back to Dimensional Analysis, let's examine a physical formula to see " +
  "how checking units works. Imagine you have a formula for distance where you multiply speed " +
  "by time. The seconds cancel, leaving metres on both sides."

const v = (content: string, learnerName?: string | null) =>
  validateExplanationCandidate({ ...BASE, content, learnerName })

describe('the asset that was actually served', () => {
  it('is rejected', () => {
    expect(v(SERVED_ASSET).valid).toBe(false)
  })

  it('is rejected for the identity leak first, since that is the worse half', () => {
    const r = v(SERVED_ASSET, 'Mohammad Suaib')
    expect(r.valid).toBe(false)
    if (r.valid) return
    expect(r.reason).toMatch(/name/i)
  })

  it('is still rejected when the caller cannot supply a name', () => {
    // Here the SESSION-BOUND rule carries it ("Good question — now, back to
    // Dimensional Analysis"). There is no shape heuristic for names: the first
    // draft had one and it rejected "Speed, distance and time are all
    // related…", a legitimate explanation with the exact shape of a vocative.
    // STATED LIMIT: a bare personal address with no discourse markers, from a
    // caller that supplies no name, is NOT caught. The one live capture path
    // supplies the name.
    expect(v(SERVED_ASSET, null).valid).toBe(false)
  })
})

describe('learner identity never enters a shared asset', () => {
  it('rejects the name anywhere, not only as an opener', () => {
    expect(v('A dimension is the type of a quantity. Try one yourself, Priya, and see.', 'Priya').valid)
      .toBe(false)
  })

  it('is case-insensitive', () => {
    expect(v('mohammad suaib, a dimension is the type of a quantity we measure.', 'Mohammad Suaib').valid)
      .toBe(false)
  })

  it('a regex-special name cannot break the check', () => {
    // A name is user-controlled input; an unescaped one would throw or match
    // nothing, and matching nothing means the leak ships.
    expect(() => v('A dimension is the type of a physical quantity we are measuring.', 'A.J. (Bob)')).not.toThrow()
    expect(v('A.J. (Bob), a dimension is the type of quantity.', 'A.J. (Bob)').valid).toBe(false)
  })

  it('an absent or empty name is handled without throwing', () => {
    expect(() => v('A dimension is the type of a physical quantity we measure.', '')).not.toThrow()
    expect(v('A dimension is the type of a physical quantity we measure.', '').valid).toBe(true)
  })
})

describe('turn-scoped discourse is not reusable teaching', () => {
  for (const bad of [
    "Good question — now, back to Dimensional Analysis, every term must match.",
    "Great question! Dimensions describe the type of a quantity being measured.",
    "As I mentioned earlier, the dimension of speed is length over time here.",
    "To answer your question, dimensions track the type and not the unit used.",
    "Let's get back to our lesson: every term in an equation shares dimensions.",
  ]) {
    it(`rejects ${JSON.stringify(bad.slice(0, 42))}…`, () => {
      expect(v(bad).valid).toBe(false)
    })
  }
})

describe('real explanations still capture — the gate must not empty the moat', () => {
  for (const good of [
    'A dimension is the fundamental type of a physical quantity, such as length, mass or time. ' +
      'Whether you measure a distance in metres, feet or miles, its dimension is always length, written [L].',
    'Speed is not a length. It is a length divided by a time, so its dimension is written [LT⁻¹]. ' +
      'Two cars can travel the same 100 metres at very different speeds.',
    'The principle of homogeneity says every additive term in a valid equation must share the same ' +
      'dimensions. If one side is [L] and the other is [LT], the equation is wrong before you put numbers in.',
    'An apple is the object you are counting, not an agreed standard size. Because one apple can be ' +
      'small and another huge, "five apples" gives a count but not a measurement.',
  ]) {
    it(`accepts ${JSON.stringify(good.slice(0, 42))}…`, () => {
      const r = v(good, 'Mohammad Suaib')
      expect(r.valid, r.valid ? '' : r.reason).toBe(true)
    })
  }

  it('a capitalised sentence opener is not a vocative', () => {
    // "Speed, distance and time are related" opens with a capitalised word and
    // a comma. Rejecting it would quietly starve the capture pipeline.
    expect(v('Speed, distance and time are all related by one simple equation you can check.').valid).toBe(true)
  })

  it('the existing checks are unchanged', () => {
    expect(v('short').valid).toBe(false)
    expect(validateExplanationCandidate({ ...BASE, content: 'A valid length explanation of dimensions here.', language: 'xx' }).valid).toBe(false)
    expect(validateExplanationCandidate({ ...BASE, content: 'A valid length explanation of dimensions here.', conceptId: 'phys.not.real' }).valid).toBe(false)
  })
})
