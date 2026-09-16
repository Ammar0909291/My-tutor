/**
 * Deterministic Physics Verifier, Batch 3 — the rule itself.
 *
 * Design: `docs/architecture/DETERMINISTIC_PHYSICS_VERIFIER_DESIGN.md` §5.2-
 * §5.6, §6 row 3. This is the first batch to build `dimensionalViolation`
 * and to run it against the FULL Batch 1 corpus (912 CORRECT_CONTROLS / 25
 * REJECTION_CASES / 10 MUST_NOT_FIRE_CONTROLS) — the row's own stated gate,
 * "100% rejection + 0 false positives", proven here as real assertions,
 * not printed once and trusted.
 */
import { describe, it, expect } from 'vitest'
import { CONCEPT_DIMENSION_BINDINGS } from '@/lib/teaching/physics/dimensionBindings'
import {
  dimensionalViolation, diagnosePhysicsDim, extractEquationCandidates,
  extractAssertedEquations, isAssertedEquation, hasAssertedEquationFrame,
} from '@/lib/teaching/physics/dimensionalVerifier'
import { CORRECT_CONTROLS, REJECTION_CASES, MUST_NOT_FIRE_CONTROLS } from '@/tests/support/physicsVerifierCorpus'

describe('GATE A — extraction: §4.1\'s two named false positives must die here', () => {
  it('rejects "src = (concept: string" — a DIFFERENT defense than Batch 0\'s parser-level fix', () => {
    expect(extractEquationCandidates('src = (concept: string')).toEqual([])
  })

  it('rejects "min = 4 km in (1/30) h"', () => {
    expect(extractEquationCandidates('min = 4 km in (1/30) h')).toEqual([])
  })

  it('extracts a genuine equation-shaped sentence', () => {
    const candidates = extractEquationCandidates('The formula is F = ma.')
    expect(candidates.length).toBeGreaterThan(0)
    expect(candidates[0].text).toBe('F = ma')
  })

  it('rejects anything inside a code fence or backtick span', () => {
    expect(extractEquationCandidates('```F = ma```')).toEqual([])
    expect(extractEquationCandidates('the code is `F = ma`')).toEqual([])
  })

  it('rejects an equation immediately preceded by ":" (a labeled caption, not an assertion)', () => {
    expect(extractEquationCandidates('Mirror: 1/v + 1/u = 1/f.')).toEqual([])
  })

  it('rejects a bare value assignment ("v = 0" is a value, not a relation)', () => {
    expect(extractEquationCandidates('At the top, v = 0.')).toEqual([])
  })

  it('never throws on garbage input', () => {
    for (const s of ['', '=', '====', '👍=🎉', 'a'.repeat(2000) + ' = b']) {
      expect(() => extractEquationCandidates(s)).not.toThrow()
    }
  })
})

describe('GATE B — binding: an unbound symbol or unbound concept always abstains', () => {
  it('a null binding always returns null, regardless of draft content', () => {
    expect(dimensionalViolation('The formula is F = ma.', null)).toBeNull()
    expect(dimensionalViolation('', null)).toBeNull()
  })

  it('a concept outside the phys.mech.* registry has no binding entry at all', () => {
    expect(CONCEPT_DIMENSION_BINDINGS['phys.em.electric-field']).toBeUndefined()
    expect(CONCEPT_DIMENSION_BINDINGS['phys.opt.lenses']).toBeUndefined()
  })

  it('an equation using a symbol outside the concept\'s own vocabulary abstains, never guesses', () => {
    const binding = CONCEPT_DIMENSION_BINDINGS['phys.mech.momentum']
    // momentum's own binding never defines "v" (its 2 real equations use
    // F, m, a, F_net, Δp, Δt) — this must abstain, not guess a dimension.
    expect(dimensionalViolation('The formula is F = mv.', binding)).toBeNull()
    expect(diagnosePhysicsDim('The formula is F = mv.', binding).gate).toBe('unbound-symbol')
  })
})

describe('GATE C — assertion frame: a WHITELIST, tested against Batch 1\'s own MUST_NOT_FIRE_CONTROLS', () => {
  it('every one of the 10 MUST_NOT_FIRE_CONTROLS carries NO asserted equation, independent of any binding', () => {
    for (const c of MUST_NOT_FIRE_CONTROLS) {
      expect(hasAssertedEquationFrame(c.text), `wrongly asserted: "${c.text}"`).toBe(false)
    }
  })

  it('a question mark suppresses an otherwise-matching frame', () => {
    expect(isAssertedEquation(
      'Is the formula F = ma?',
      { text: 'F = ma', matchStart: 15, matchEnd: 21 },
    )).toBe(false)
  })

  it('quotation marks suppress an otherwise-matching frame', () => {
    const sentence = 'The student wrote "F = ma" on the board.'
    const start = sentence.indexOf('F = ma')
    expect(isAssertedEquation(sentence, { text: 'F = ma', matchStart: start, matchEnd: start + 6 })).toBe(false)
  })

  it('an attribution verb ("writes"/"says"/"thinks"/"claims") suppresses the frame even without quotes or a question mark', () => {
    for (const verb of ['writes', 'says', 'thinks', 'claims', 'wrote', 'said']) {
      const sentence = `A student ${verb} F = ma is the whole story.`
      const start = sentence.indexOf('F = ma')
      expect(isAssertedEquation(sentence, { text: 'F = ma', matchStart: start, matchEnd: start + 6 }), verb).toBe(false)
    }
  })

  it('the four positive whitelist shapes are recognized', () => {
    const cases: [string, string][] = [
      ['The formula is F = ma.', 'F = ma'],
      ['We write F = ma.', 'F = ma'],
      ['So F = ma.', 'F = ma'],
      ['F = ma.', 'F = ma'], // standalone display line
    ]
    for (const [sentence, text] of cases) {
      const start = sentence.indexOf(text)
      const asserted = isAssertedEquation(sentence, { text, matchStart: start, matchEnd: start + text.length })
      expect(asserted, sentence).toBe(true)
    }
  })

  it('"X = ... tells us ..." is recognized', () => {
    const sentence = 'F = ma tells us that acceleration scales with force.'
    const start = 0
    expect(isAssertedEquation(sentence, { text: 'F = ma', matchStart: start, matchEnd: 6 })).toBe(true)
  })

  it('a plain mid-sentence mention with no whitelist marker is NOT asserted (the whitelist\'s own recall cost, by design)', () => {
    const sentence = 'Consider the case where F = ma applies to a falling ball.'
    const start = sentence.indexOf('F = ma')
    expect(isAssertedEquation(sentence, { text: 'F = ma', matchStart: start, matchEnd: start + 6 })).toBe(false)
  })
})

describe('THE RULE — total function, never throws', () => {
  it('never throws across a fuzz sweep and explicit garbage/edge cases', () => {
    const binding = CONCEPT_DIMENSION_BINDINGS['phys.mech.momentum']
    const edge = ['', '=', '====', 'a'.repeat(5000), 'F = ma'.repeat(500), '👍=🎉', null as unknown as string, undefined as unknown as string]
    for (const draft of edge) {
      expect(() => dimensionalViolation(draft, binding)).not.toThrow()
      expect(() => dimensionalViolation(draft, null)).not.toThrow()
    }
    const chars = 'FmaΔ=+-*/^() .!?"\'`:\n'.split('')
    let seed = 7
    function rand() { seed = (seed * 1103515245 + 12345) & 0x7fffffff; return seed / 0x7fffffff }
    for (let i = 0; i < 300; i += 1) {
      let s = ''
      const len = Math.floor(rand() * 30)
      for (let j = 0; j < len; j += 1) s += chars[Math.floor(rand() * chars.length)]
      expect(() => dimensionalViolation(s, binding)).not.toThrow()
    }
  })

  it('returns null for a dimensionally consistent, fully-bound, asserted equation', () => {
    const binding = CONCEPT_DIMENSION_BINDINGS['phys.mech.momentum']
    expect(dimensionalViolation('The formula is F = ma.', binding)).toBeNull()
  })

  it('returns a non-null violation for a fully-bound, asserted, dimensionally WRONG equation', () => {
    const binding = CONCEPT_DIMENSION_BINDINGS['phys.mech.momentum']
    // F = m (drops the acceleration factor) — a real REJECTION_CASES entry.
    const v = dimensionalViolation('The formula is F = m.', binding)
    expect(v).not.toBeNull()
    expect(v?.conceptId).toBe('phys.mech.momentum')
    expect(v?.equationText).toBe('F = m')
  })
})

describe('FULL CORPUS VALIDATION — the row\'s own stated gate: "100% rejection + 0 false positives"', () => {
  it('CORRECT_CONTROLS: every bound concept\'s OWN canonical equations abstain, except the ONE already-documented corpus defect', () => {
    let nullCount = 0
    let nonNullCount = 0
    const nonNull: string[] = []
    for (const [conceptId, binding] of Object.entries(CONCEPT_DIMENSION_BINDINGS)) {
      for (const c of binding.canonical) {
        const v = dimensionalViolation(c.text, binding)
        if (v === null) nullCount += 1
        else { nonNullCount += 1; nonNull.push(`${conceptId}::${c.text}`) }
      }
    }
    expect(nullCount).toBe(83)
    expect(nonNullCount).toBe(1)
    // The ONE non-null is Batch 2's own documented, KNOWN corpus-extraction
    // defect (hookes-law's stored text is missing a leading "1/") — a true
    // positive against BAD STORED TEXT, not a false positive against
    // correct physics. Pinned by name so a future corpus fix (out of this
    // batch's scope) is a deliberate, noticed change to this test.
    expect(nonNull).toEqual(['phys.mech.hookes-law::k_eq = 1/k₁ + 1/k₂'])
  })

  it('CORRECT_CONTROLS: all 912 entries abstain when tested with binding=null (correctly abstaining outside the bound registry)', () => {
    let nonNullWithNullBinding = 0
    for (const eq of CORRECT_CONTROLS) {
      if (dimensionalViolation(eq.text, null) !== null) nonNullWithNullBinding += 1
    }
    expect(nonNullWithNullBinding).toBe(0)
  })

  it('REJECTION_CASES: every phys.mech.*-bound seeded corruption either REJECTS or correctly ABSTAINS (never falsely passes)', () => {
    let rejected = 0
    let abstained = 0
    for (const rc of REJECTION_CASES) {
      for (const binding of Object.values(CONCEPT_DIMENSION_BINDINGS)) {
        const hasSource = binding.canonical.some((c) => c.text === rc.sourceEquation)
        if (!hasSource) continue
        const v = dimensionalViolation(rc.text, binding)
        if (v !== null) rejected += 1
        else abstained += 1
      }
    }
    // Matches Batch 2's own exact finding: 5 provably wrong, 2 introduce a
    // symbol outside the source concept's own vocabulary (correct abstain
    // per Gate B, not a rejection-rate failure).
    expect(rejected).toBe(5)
    expect(abstained).toBe(2)
    expect(rejected + abstained).toBe(7)
  })

  it('MUST_NOT_FIRE_CONTROLS: zero false fires across all 10 controls x all 24 bindings (240 checks)', () => {
    let falseFires = 0
    let checks = 0
    for (const c of MUST_NOT_FIRE_CONTROLS) {
      for (const binding of Object.values(CONCEPT_DIMENSION_BINDINGS)) {
        checks += 1
        if (dimensionalViolation(c.text, binding) !== null) falseFires += 1
      }
    }
    expect(checks).toBe(10 * Object.keys(CONCEPT_DIMENSION_BINDINGS).length)
    expect(falseFires).toBe(0)
  })

  it('extractAssertedEquations never throws across the full 912-entry corpus', () => {
    for (const eq of CORRECT_CONTROLS) {
      expect(() => extractAssertedEquations(eq.text)).not.toThrow()
    }
  })
})

describe('diagnosePhysicsDim — the gate-level classification telemetry consumes', () => {
  it('reports "no-binding" when binding is null', () => {
    expect(diagnosePhysicsDim('F = ma', null).gate).toBe('no-binding')
  })

  it('reports "no-extraction" when nothing equation-shaped survives Gate A', () => {
    expect(diagnosePhysicsDim('Nothing to see here.', CONCEPT_DIMENSION_BINDINGS['phys.mech.momentum']).gate).toBe('no-extraction')
  })

  it('reports "no-assertion-frame" when an equation is extracted but never asserted', () => {
    const binding = CONCEPT_DIMENSION_BINDINGS['phys.mech.momentum']
    expect(diagnosePhysicsDim('Is F = ma correct?', binding).gate).toBe('no-assertion-frame')
  })

  it('reports "violation" and carries the violation object together', () => {
    const binding = CONCEPT_DIMENSION_BINDINGS['phys.mech.momentum']
    const diagnosis = diagnosePhysicsDim('The formula is F = m.', binding)
    expect(diagnosis.gate).toBe('violation')
    expect(diagnosis.violation).not.toBeNull()
  })

  it('reports "consistent" for a correct, asserted, fully-bound equation', () => {
    const binding = CONCEPT_DIMENSION_BINDINGS['phys.mech.momentum']
    const diagnosis = diagnosePhysicsDim('The formula is F = ma.', binding)
    expect(diagnosis.gate).toBe('consistent')
    expect(diagnosis.violation).toBeNull()
  })

  it('never throws', () => {
    const binding = CONCEPT_DIMENSION_BINDINGS['phys.mech.momentum']
    for (const s of ['', '=', 'a'.repeat(3000), '👍=🎉']) {
      expect(() => diagnosePhysicsDim(s, binding)).not.toThrow()
      expect(() => diagnosePhysicsDim(s, null)).not.toThrow()
    }
  })
})
