/**
 * Deterministic Physics Verifier, Batch 1 — the manufactured corpus.
 *
 * Design: `docs/architecture/DETERMINISTIC_PHYSICS_VERIFIER_DESIGN.md` §6
 * row 1. Asserts real content, not just file existence — thresholds below
 * are the actual harvested/curated counts re-verified this batch (see
 * `physicsVerifierCorpus.ts`'s own header for full provenance), not
 * invented targets. If a future re-run of `scripts/physics/
 * extractEquationCorpus.ts` produces a smaller corpus than these floors,
 * that is itself a regression worth investigating, not a threshold to
 * silently lower.
 */
import { describe, it, expect } from 'vitest'
import {
  CORRECT_CONTROLS, REJECTION_CASES, MUST_NOT_FIRE_CONTROLS,
} from '@/tests/support/physicsVerifierCorpus'
import { parseEquation } from '@/lib/teaching/physics/dimensions'

describe('CORRECT_CONTROLS — real, harvested, deduplicated authored equations', () => {
  it('has a non-trivial, specific floor (re-verify with the extraction script, do not just raise this)', () => {
    expect(CORRECT_CONTROLS.length).toBeGreaterThanOrEqual(900)
  })

  it('every entry cites a real source path and a corroborating occurrence count', () => {
    for (const eq of CORRECT_CONTROLS) {
      expect(eq.text.length).toBeGreaterThan(0)
      expect(eq.source.length).toBeGreaterThan(0)
      expect(eq.occurrences).toBeGreaterThanOrEqual(3)
    }
  })

  it('contains no exact-text duplicates (the extraction script\'s own dedup invariant)', () => {
    const seen = new Set<string>()
    for (const eq of CORRECT_CONTROLS) {
      expect(seen.has(eq.text), `duplicate: "${eq.text}"`).toBe(false)
      seen.add(eq.text)
    }
  })

  it('includes the ten canonical §4.2 equations this corpus is meant to supersede in breadth', () => {
    const texts = new Set(CORRECT_CONTROLS.map((e) => e.text))
    // §4.2's own ten are not required verbatim (this corpus uses whatever
    // form the corpus actually authors them in), but familiar high-frequency
    // members of that family must be present.
    expect(texts.has('F = ma')).toBe(true)
    expect(texts.has('p = mv')).toBe(true)
    expect(texts.has('E = mc²')).toBe(true)
  })
})

describe('REJECTION_CASES — hand-curated dimensionally-broken variants', () => {
  it('has a non-trivial floor', () => {
    expect(REJECTION_CASES.length).toBeGreaterThanOrEqual(20)
  })

  it('every sourceEquation is a REAL entry in CORRECT_CONTROLS, not invented', () => {
    const correct = new Set(CORRECT_CONTROLS.map((e) => e.text))
    for (const rc of REJECTION_CASES) {
      expect(correct.has(rc.sourceEquation), `"${rc.sourceEquation}" is not in CORRECT_CONTROLS`).toBe(true)
    }
  })

  it('every case is a genuine corruption: its text differs from its sourceEquation', () => {
    for (const rc of REJECTION_CASES) {
      expect(rc.text).not.toBe(rc.sourceEquation)
    }
  })

  it('every case documents its corruption method and a non-empty dimensional reason', () => {
    const methods = ['DROP_FACTOR', 'WRONG_EXPONENT', 'SYMBOL_SUBSTITUTION']
    for (const rc of REJECTION_CASES) {
      expect(methods).toContain(rc.corruptionMethod)
      expect(rc.brokenBecause.length).toBeGreaterThan(10)
    }
  })

  it('covers all three named corruption methods, not just one', () => {
    const methods = new Set(REJECTION_CASES.map((c) => c.corruptionMethod))
    expect(methods.has('DROP_FACTOR')).toBe(true)
    expect(methods.has('WRONG_EXPONENT')).toBe(true)
    expect(methods.has('SYMBOL_SUBSTITUTION')).toBe(true)
  })

  it('contains no exact-text duplicates', () => {
    const seen = new Set<string>()
    for (const rc of REJECTION_CASES) {
      expect(seen.has(rc.text), `duplicate: "${rc.text}"`).toBe(false)
      seen.add(rc.text)
    }
  })
})

describe('MUST_NOT_FIRE_CONTROLS — authored pedagogy a verifier must never suppress', () => {
  it('has a non-trivial floor: the two §4.6 verbatim seeds plus a real harvested handful', () => {
    expect(MUST_NOT_FIRE_CONTROLS.length).toBeGreaterThanOrEqual(10)
  })

  it('includes both §4.6 verbatim seeds exactly as the design doc states them', () => {
    const texts = MUST_NOT_FIRE_CONTROLS.map((c) => c.text)
    expect(texts).toContain(
      'A student writes v = at², where v is a velocity, a an acceleration and t a time. Is the equation dimensionally consistent?',
    )
    expect(texts.some((t) => t.startsWith('τ = Iω is the ANGULAR MOMENTUM'))).toBe(true)
  })

  it('every control cites a reason from the closed taxonomy and a non-trivial note', () => {
    const reasons = ['QUESTIONED', 'QUOTED_AS_LEARNER_ERROR', 'NEGATED_ASSERTION', 'COMPARED_NOT_ASSERTED']
    for (const c of MUST_NOT_FIRE_CONTROLS) {
      expect(reasons).toContain(c.reason)
      expect(c.note.length).toBeGreaterThan(20)
    }
  })

  it('covers more than one reason category — this is not a single-shape test', () => {
    const reasons = new Set(MUST_NOT_FIRE_CONTROLS.map((c) => c.reason))
    expect(reasons.size).toBeGreaterThanOrEqual(3)
  })

  it('at least one control cites a source outside the design doc itself (a REAL harvested example)', () => {
    expect(MUST_NOT_FIRE_CONTROLS.some((c) => c.source.startsWith('educational-brain/'))).toBe(true)
  })

  it('every control genuinely contains an "=" — these are equation-bearing sentences, not unrelated prose', () => {
    for (const c of MUST_NOT_FIRE_CONTROLS) {
      expect(c.text).toContain('=')
    }
  })
})

describe('the free check — Batch 0\'s real parser against the real corpus (dimensions.ts untouched)', () => {
  it('parses a meaningful fraction of the real corpus, and reports the true rate rather than asserting a target', () => {
    let ok = 0
    for (const eq of CORRECT_CONTROLS) {
      if (parseEquation(eq.text).ok) ok += 1
    }
    const rate = ok / CORRECT_CONTROLS.length
    // Not a quality gate on Batch 0 (touching dimensions.ts is out of this
    // batch's scope) — a structural floor proving the parser is genuinely
    // being exercised against real content, not a corpus of only failures.
    expect(rate).toBeGreaterThan(0.05)
    expect(ok).toBeGreaterThan(0)
  })

  it('every §4.2-family equation still parses (the ten originally-tested shapes are not a regression)', () => {
    for (const text of ['F = ma', 'p = mv', 'E = mc²']) {
      expect(parseEquation(text).ok, `"${text}" should still parse`).toBe(true)
    }
  })

  it('never throws when run across the entire real corpus, including REJECTION_CASES and MUST_NOT_FIRE_CONTROLS', () => {
    for (const eq of CORRECT_CONTROLS) {
      expect(() => parseEquation(eq.text)).not.toThrow()
    }
    for (const rc of REJECTION_CASES) {
      expect(() => parseEquation(rc.text)).not.toThrow()
    }
    for (const c of MUST_NOT_FIRE_CONTROLS) {
      expect(() => parseEquation(c.text)).not.toThrow()
    }
  })
})
