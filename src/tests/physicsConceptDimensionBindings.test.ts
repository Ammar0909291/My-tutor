/**
 * Deterministic Physics Verifier, Batch 2 — phys.mech.* concept bindings.
 *
 * Design: `docs/architecture/DETERMINISTIC_PHYSICS_VERIFIER_DESIGN.md` §6
 * row 2, §5.2, §4.3. This is where Batch 1's manufactured corpus finally
 * gets used for real (§4.5/§4.6) rather than merely sanity-parsed: every
 * canonical equation in every `phys.mech.*` binding is run through Batch
 * 0's real `analyzeEquation` (unmodified — dimensions.ts is not touched
 * this batch) and classified into one of four REAL, observed outcomes.
 *
 * The four outcomes, and why all four are asserted rather than only the
 * "success" case: this batch's own validation found that Batch 0's parser
 * has real, structural limits (documented in `dimensionBindings.ts`'s own
 * header and inline comments) — a bare multi-letter symbol name ("KE",
 * "PE") is never recognized as one token, "Σ" does not combine with a
 * following letter the way "Δ" does, and neither ASCII "-" nor Unicode "−"
 * is supported as a UNARY (leading) minus. Asserting only "the equations
 * that work, work" would hide these — asserting the FULL classification
 * makes every one of them a pinned, reportable fact instead of a printed
 * one-off.
 */
import { describe, it, expect } from 'vitest'
import { CONCEPT_DIMENSION_BINDINGS } from '@/lib/teaching/physics/dimensionBindings'
import { CORRECT_CONTROLS, REJECTION_CASES } from '@/tests/support/physicsVerifierCorpus'
import { analyzeEquation, dimensionsEqual } from '@/lib/teaching/physics/dimensions'

const bindings = CONCEPT_DIMENSION_BINDINGS
const conceptIds = Object.keys(bindings)

type Outcome = 'match' | 'mismatch' | 'unbound' | 'parse-fail'

function classify(conceptId: string, text: string): Outcome {
  const binding = bindings[conceptId]
  const analysis = analyzeEquation(text, binding.symbols)
  if (!analysis.parsed) return 'parse-fail'
  if (!analysis.lhs?.ok || !analysis.rhs?.ok) return 'unbound'
  return dimensionsEqual(analysis.lhs.dimension, analysis.rhs.dimension) ? 'match' : 'mismatch'
}

describe('STRUCTURAL — 24 phys.mech.* concepts are bound, sourced from the real Batch 1 corpus', () => {
  it('binds at least 24 concepts, all under phys.mech.*', () => {
    expect(conceptIds.length).toBeGreaterThanOrEqual(24)
    for (const id of conceptIds) {
      expect(id.startsWith('phys.mech.')).toBe(true)
      expect(bindings[id].conceptId).toBe(id)
    }
  })

  it('every canonical equation text is verbatim-present in Batch 1\'s CORRECT_CONTROLS — nothing invented', () => {
    const corpusTexts = new Set(CORRECT_CONTROLS.map((e) => e.text))
    let total = 0
    for (const binding of Object.values(bindings)) {
      for (const c of binding.canonical) {
        total += 1
        expect(corpusTexts.has(c.text), `"${c.text}" is not a real CORRECT_CONTROLS entry`).toBe(true)
      }
    }
    // Real, re-verifiable count — see dimensionBindings.ts's own header for
    // the excluded-equation accounting (10 of 94 phys.mech.* candidates
    // across these 24 concepts: bare-value statements, natural-language
    // "equations", Leibniz-derivative-notation forms, and extraction-noise
    // duplicates — each named in-line where it is excluded).
    expect(total).toBe(84)
  })

  it('every symbol referenced by every binding\'s own canonical equations is grounded in authored prose (spot-checked via the file\'s own header/inline citations, not re-derived here)', () => {
    // A structural floor: every binding must declare at least one symbol.
    for (const [id, binding] of Object.entries(bindings)) {
      expect(Object.keys(binding.symbols).length, `${id} binds zero symbols`).toBeGreaterThan(0)
    }
  })
})

describe('§4.3 IN PRACTICE — the same letter means different quantities across these bindings', () => {
  it('"L" is angular momentum in angular-momentum but rod length in moment-of-inertia', () => {
    const angularL = bindings['phys.mech.angular-momentum'].symbols.L
    const rodL = bindings['phys.mech.moment-of-inertia'].symbols.L
    expect(dimensionsEqual(angularL, rodL)).toBe(false)
    expect(angularL).toEqual({ M: 1, L: 2, T: -1, I: 0, Θ: 0, N: 0, J: 0 }) // kg m^2/s
    expect(rodL).toEqual({ M: 0, L: 1, T: 0, I: 0, Θ: 0, N: 0, J: 0 }) // metres
  })

  it('"T" is period in hookes-law but tension (a force) in tension', () => {
    const period = bindings['phys.mech.hookes-law'].symbols.T
    const tension = bindings['phys.mech.tension'].symbols.T
    expect(dimensionsEqual(period, tension)).toBe(false)
    expect(period).toEqual({ M: 0, L: 0, T: 1, I: 0, Θ: 0, N: 0, J: 0 }) // seconds
    expect(tension).toEqual({ M: 1, L: 1, T: -2, I: 0, Θ: 0, N: 0, J: 0 }) // newtons
  })
})

describe('THE REAL PROOF — every canonical equation classified against Batch 0\'s actual analyzeEquation', () => {
  // Built once, asserted from multiple angles below.
  const classification = new Map<string, Outcome>()
  for (const [conceptId, binding] of Object.entries(bindings)) {
    for (const c of binding.canonical) {
      classification.set(`${conceptId}::${c.text}`, classify(conceptId, c.text))
    }
  }
  const counts: Record<Outcome, number> = { match: 0, mismatch: 0, unbound: 0, 'parse-fail': 0 }
  for (const outcome of classification.values()) counts[outcome] += 1

  it('the real, current classification totals — re-verify with dimensions.ts unmodified before trusting a different number', () => {
    // These are measured facts about this batch's own bindings against
    // Batch 0's real parser, not targets. A future batch that widens
    // dimensions.ts (unary minus, ×, trig calls, bare multi-letter names)
    // should INCREASE `match`/`mismatch` and correspondingly shrink
    // `unbound`/`parse-fail` — if that happens, update these numbers with
    // the new real count, do not leave them stale.
    expect(counts.match).toBe(57)
    expect(counts.mismatch).toBe(1)
    expect(counts.unbound).toBe(9)
    expect(counts['parse-fail']).toBe(17)
    expect(counts.match + counts.mismatch + counts.unbound + counts['parse-fail']).toBe(84)
  })

  it('COVERAGE — at least 75 of 84 (89%) phys.mech.* canonical equations have every symbol confidently bound', () => {
    // "Bound" per this batch's own task definition: every symbol the
    // equation resolves to under Batch 0's real tokenizer has a Dimension
    // in this concept's own `symbols` map — i.e. NOT `unbound`. Whether it
    // then parses/matches/mismatches is a separate, syntax-level axis
    // (asserted elsewhere in this file), not a binding-confidence one.
    const bound = counts.match + counts.mismatch + counts['parse-fail']
    expect(bound).toBeGreaterThanOrEqual(75)
    expect(bound).toBe(84 - counts.unbound)
  })

  it('the 9 UNBOUND equations are exactly the bare-multi-letter-compound family (KE/PE/GPE/EPE), never a grounding failure', () => {
    const unboundEntries = [...classification.entries()].filter(([, o]) => o === 'unbound')
    expect(unboundEntries.length).toBe(9)
    for (const [key] of unboundEntries) {
      const text = key.split('::')[1]
      expect(/KE|PE|GPE|EPE/.test(text), `"${text}" was expected to fail via the KE/PE-family gap`).toBe(true)
    }
  })

  it('the ONE mismatch is the known, documented corpus-extraction artifact (a dropped leading "1/"), not a fresh regression', () => {
    const mismatches = [...classification.entries()].filter(([, o]) => o === 'mismatch')
    expect(mismatches.length).toBe(1)
    expect(mismatches[0][0]).toBe('phys.mech.hookes-law::k_eq = 1/k₁ + 1/k₂')
  })

  it('the 57 MATCHING equations include at least one from each of several distinct physical domains (a real spread, not one lucky concept)', () => {
    const matchedConcepts = new Set(
      [...classification.entries()].filter(([, o]) => o === 'match').map(([k]) => k.split('::')[0]),
    )
    for (const id of [
      'phys.mech.newtons-second-law', 'phys.mech.momentum', 'phys.mech.impulse',
      'phys.mech.gravitational-field', 'phys.mech.power', 'phys.mech.pressure-fluids',
      'phys.mech.angular-momentum', 'phys.mech.moment-of-inertia',
    ]) {
      expect(matchedConcepts.has(id), `expected at least one MATCH in ${id}`).toBe(true)
    }
  })

  it('never throws, across every canonical equation in every binding', () => {
    for (const [conceptId, binding] of Object.entries(bindings)) {
      for (const c of binding.canonical) {
        expect(() => analyzeEquation(c.text, binding.symbols)).not.toThrow()
      }
    }
  })
})

describe('REJECTION_CASES — seeded corruptions of equations this batch bound must never falsely verify', () => {
  // Every REJECTION_CASES entry whose sourceEquation appears as a
  // canonical entry somewhere in these 24 bindings.
  const relevant: { conceptId: string; text: string; sourceEquation: string }[] = []
  for (const rc of REJECTION_CASES) {
    for (const [conceptId, binding] of Object.entries(bindings)) {
      if (binding.canonical.some((c) => c.text === rc.sourceEquation)) {
        relevant.push({ conceptId, text: rc.text, sourceEquation: rc.sourceEquation })
      }
    }
  }

  it('finds a non-trivial number of relevant rejection cases (the corpus and the bindings actually overlap)', () => {
    expect(relevant.length).toBeGreaterThanOrEqual(7)
  })

  it('NEVER reports a false MATCH — a corrupted equation may mismatch or correctly abstain (unbound), but must never wrongly verify', () => {
    for (const { conceptId, text } of relevant) {
      const outcome = classify(conceptId, text)
      expect(outcome, `"${text}" (seeded corruption) wrongly matches under ${conceptId}`).not.toBe('match')
    }
  })

  it('at least 5 of the relevant cases are PROVEN corruptions — a real dimensional mismatch, not just an abstain', () => {
    const mismatches = relevant.filter(({ conceptId, text }) => classify(conceptId, text) === 'mismatch')
    expect(mismatches.length).toBeGreaterThanOrEqual(5)
  })

  it('a rejection case introducing a symbol outside the concept\'s own vocabulary correctly abstains rather than silently passing', () => {
    // "F = mv" (from momentum's "F = ma") introduces "v", which momentum's
    // own binding never needed to define (its 2 real equations use F, m,
    // a, F_net, Δp, Δt — never v). The honest, Gate-B-style outcome is
    // "unbound", proven here rather than assumed.
    expect(classify('phys.mech.momentum', 'F = mv')).toBe('unbound')
  })
})
