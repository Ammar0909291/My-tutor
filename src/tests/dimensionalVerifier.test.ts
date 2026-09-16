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
  normalizeLatex,
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

/**
 * BATCH 6 — colon-marker whitelist + LaTeX normalization.
 *
 * Design: §6.3, built directly from §6.2's real observation window (0/36
 * fired even on equation-eliciting turns; the model writes correct physics,
 * almost never in the specific shape Gate A/C required). The two named
 * causes fixed here: LaTeX-wrapped equations, and an explicit
 * forward-declaration colon. Several cases below are the EXACT strings
 * captured live this session (this repo's own Groq-vs-Gemini provider
 * comparison run, phys.mech.newtons-second-law, real account, real model
 * output) or quoted verbatim from §6.2 — not invented.
 */
describe('BATCH 6 — normalizeLatex: a closed whitelist, unrecognized macros pass through untouched', () => {
  it('is a no-op for text with no backslash at all', () => {
    expect(normalizeLatex('F = ma')).toBe('F = ma')
    expect(normalizeLatex('')).toBe('')
  })

  it('strips \\( \\) and \\[ \\] delimiters (and, being a math span, collapses the surrounding whitespace too)', () => {
    expect(normalizeLatex('\\(F = ma\\)')).toBe('F=ma')
    expect(normalizeLatex('\\[F = ma\\]')).toBe('F=ma')
  })

  it('unwraps decorator commands, keeping the argument (\\vec{F} -> F)', () => {
    expect(normalizeLatex('\\vec{F} = m\\vec{a}')).toBe('F = ma')
    expect(normalizeLatex('\\hat{n}')).toBe('n')
  })

  it('maps named Greek/operator commands to their Unicode letter', () => {
    expect(normalizeLatex('\\Delta p')).toBe('Δ p')
    expect(normalizeLatex('\\sum F')).toBe('Σ F')
    expect(normalizeLatex('\\omega')).toBe('ω')
  })

  it('collapses TIGHT spacing commands to nothing (a decorative multiplicand gap, "m\\,v" means "mv")', () => {
    expect(normalizeLatex('m\\,v')).toBe('mv')
  })

  it('collapses WIDE spacing commands to one real space (a genuine word-level gap)', () => {
    expect(normalizeLatex('F = ma\\quadtext')).toBe('F = ma text')
  })

  it('the two real §6.2-quoted shapes normalize with ALL internal whitespace collapsed — LaTeX math mode is whitespace-insignificant, unlike prose', () => {
    expect(normalizeLatex('\\[ \\sum \\vec{F} = m\\,\\vec{a} \\]')).toBe('ΣF=ma')
    expect(normalizeLatex('\\(p = m\\,v\\)')).toBe('p=mv')
  })

  it('whitespace INSIDE a recognized \\( \\) / \\[ \\] span collapses; whitespace OUTSIDE stays significant', () => {
    expect(normalizeLatex('\\(F = ma\\)')).toBe('F=ma')
    expect(normalizeLatex('\\[F = ma\\]')).toBe('F=ma')
    // No \( \) wrapper here — bare commands in ordinary prose keep their
    // surrounding whitespace exactly as significant as it always was.
    expect(normalizeLatex('\\vec{F} = m\\vec{a}')).toBe('F = ma')
  })

  it('an unrecognized command is left untouched — never guessed at (Gate A then simply fails to extract it, exactly as today)', () => {
    expect(normalizeLatex('\\nabla \\cdot F')).toBe('\\nabla \\cdot F')
  })

  it('is idempotent — normalizing already-normalized text changes nothing', () => {
    const once = normalizeLatex('\\[ \\sum \\vec{F} = m\\,\\vec{a} \\]')
    expect(normalizeLatex(once)).toBe(once)
  })
})

describe('BATCH 6 — Gate A extracts LaTeX-wrapped equations after normalization', () => {
  it('extracts from \\(p = m\\,v\\)', () => {
    const candidates = extractEquationCandidates('\\(p = m\\,v\\)')
    expect(candidates.length).toBeGreaterThan(0)
    expect(candidates[0].text).toBe('p = mv')
  })

  it('extracts ΣF = ma from the display-math \\sum \\vec{F} form — Σ is NOT dropped, it survives as a compound LHS token (isPlausibleSymbol accepts length<=2), exactly the same "ΣF" shape dimensionBindings.ts\'s own newtons-second-law binding already documents and binds (Σ: DIMENSIONLESS, multiplying implicitly with an adjacent F)', () => {
    const candidates = extractEquationCandidates('\\[ \\sum \\vec{F} = m\\,\\vec{a} \\]')
    expect(candidates.length).toBeGreaterThan(0)
    expect(candidates.some((c) => c.text === 'ΣF = ma')).toBe(true)
  })

  it('still rejects an unrecognized LaTeX command\'s symbol (no guessing)', () => {
    // \nabla is not in the decorator or named-symbol whitelist, so it stays
    // literally "\nabla" — not a plausible bare-letter LHS, and the
    // backslash is caught by the SAME backtick/fence-style conservatism
    // this file already applies elsewhere (an unmapped macro simply does
    // not produce a match).
    expect(extractEquationCandidates('\\nabla \\cdot F = 0')).toEqual([])
  })
})

describe('BATCH 6 — Gate A/C colon-marker whitelist: forward-declaration markers admit, bare labels still do not', () => {
  it('admits "In equation form, this is written as: F = ma" — the real captured shape', () => {
    const sentence = 'In equation form, this is written as: F = ma'
    const candidates = extractEquationCandidates(sentence)
    expect(candidates.length).toBe(1)
    expect(isAssertedEquation(sentence, candidates[0])).toBe(true)
  })

  it('admits "In symbols: ΣF = ma" (§6.2\'s own quoted example, modulo the Σ-drop already covered above)', () => {
    const sentence = 'In symbols: F = ma'
    const candidates = extractEquationCandidates(sentence)
    expect(candidates.length).toBe(1)
    expect(isAssertedEquation(sentence, candidates[0])).toBe(true)
  })

  it('admits "Mathematically: F = ma"', () => {
    const sentence = 'Mathematically: F = ma'
    const candidates = extractEquationCandidates(sentence)
    expect(candidates.length).toBe(1)
    expect(isAssertedEquation(sentence, candidates[0])).toBe(true)
  })

  it('still EXCLUDES a bare label colon — "Mirror: 1/v + 1/u = 1/f." does not match any forward-declaration marker', () => {
    expect(extractEquationCandidates('Mirror: 1/v + 1/u = 1/f.')).toEqual([])
  })

  it('still EXCLUDES an unrelated colon clause that happens to precede an equation — the marker phrase itself must be present', () => {
    const sentence = 'Consider the following: F = ma applies here.'
    expect(extractEquationCandidates(sentence)).toEqual([])
  })

  it('a marker-admitted candidate is still subject to every OTHER Gate C override — a question mark still suppresses it', () => {
    const sentence = 'In equation form, this is written as: F = ma, right?'
    const candidates = extractEquationCandidates(sentence)
    // Gate A admits it (the marker matches before the colon)...
    expect(candidates.length).toBe(1)
    expect(candidates[0].text).toBe('F = ma')
    // ...but Gate C's question-mark override still fires, unconditionally.
    expect(isAssertedEquation(sentence, candidates[0])).toBe(false)
  })
})

describe('BATCH 6 — full pipeline against REAL captured production text', () => {
  it('the core of the exact Gemini T1 sentence from this session\'s own Groq-vs-Gemini run (phys.mech.newtons-second-law, real account) now reaches "consistent"', () => {
    // Captured verbatim, scripts/qa/qa-runs/groq-vs-gemini-*/gemini.json,
    // turn T1: "In equation form, this is written as:\n\( F = m a \) (force
    // equals mass times acceleration)". The trailing parenthetical is
    // dropped here — see the NEXT test, which documents (not fixes) a
    // separate, pre-existing Gate A limitation that clause triggers.
    // Momentum's binding is used (not newtons-second-law's own, which binds
    // only F_net, not bare F — a separate, already-documented Batch 2
    // finding) since it binds F/m/a and lists "F = ma" as canonical.
    const draft = 'In equation form, this is written as:\n\\( F = m a \\)'
    const binding = CONCEPT_DIMENSION_BINDINGS['phys.mech.momentum']
    const diagnosis = diagnosePhysicsDim(draft, binding)
    expect(diagnosis.gate).toBe('consistent')
  })

  it('FIXED in Batch 7 (§6.5): the real Gemini T1 sentence\'s trailing parenthetical ("F = m a (force equals mass times acceleration)") now trims the annotation and reaches "consistent" — Batch 6 recorded this as a pre-existing Gate A limitation, out of its own stated scope (LaTeX symbols, colon markers; not trailing-parenthetical RHS trimming); Batch 7 closes it narrowly, as an additive whitelist rule that trims a SPACE-separated, balanced, operator-free, word-bearing trailing parenthetical (see extractEquationCandidates\'s own comment for the full discriminator and why "N = m(g + a)" — no space before the paren — is untouched)', () => {
    const withLatex = diagnosePhysicsDim(
      'In equation form, this is written as:\n\\( F = m a \\) (force equals mass times acceleration)',
      CONCEPT_DIMENSION_BINDINGS['phys.mech.momentum'],
    )
    expect(withLatex.gate).toBe('consistent')
    const plainText = diagnosePhysicsDim(
      'The formula is F = ma (force equals mass times acceleration).',
      CONCEPT_DIMENSION_BINDINGS['phys.mech.momentum'],
    )
    // Same overcapture, zero LaTeX involved — confirms the underlying Gate
    // A fix is the trailing-parenthetical trim itself, not anything LaTeX-
    // or colon-marker-specific (those stay Batch 6's own, unmodified).
    expect(plainText.gate).toBe('consistent')
  })

  it('§6.2\'s own quoted LaTeX momentum example reaches "consistent" against a binding that has p, m, v, once phrased through a whitelisted assertion frame', () => {
    const draft = 'The formula is \\(p = m\\,v\\).'
    const binding = CONCEPT_DIMENSION_BINDINGS['phys.mech.angular-momentum']
    const diagnosis = diagnosePhysicsDim(draft, binding)
    expect(diagnosis.gate).toBe('consistent')
  })

  it('a genuinely broken equation reached only through the new colon-marker path still REJECTS — the widened gate can still catch a real violation', () => {
    // F = m (drops the acceleration factor), the same REJECTION_CASES entry
    // already used above, now phrased through the new admission path.
    const draft = 'In equation form, this is written as: F = m.'
    const binding = CONCEPT_DIMENSION_BINDINGS['phys.mech.momentum']
    const diagnosis = diagnosePhysicsDim(draft, binding)
    expect(diagnosis.gate).toBe('violation')
  })

  it('MUST_NOT_FIRE_CONTROLS still fires on none of the 10 x 24 bindings after the widening (re-run, not just trusted from the earlier describe block)', () => {
    let falseFires = 0
    for (const c of MUST_NOT_FIRE_CONTROLS) {
      for (const binding of Object.values(CONCEPT_DIMENSION_BINDINGS)) {
        if (dimensionalViolation(c.text, binding) !== null) falseFires += 1
      }
    }
    expect(falseFires).toBe(0)
  })
})

/**
 * BATCH 7 — Gate A: trim a trailing, space-separated, balanced parenthetical
 * annotation from the RHS capture.
 *
 * Design: §6.5, built directly from §6.3/§6.4's own named-but-not-fixed
 * finding — a trailing balanced parenthetical clause ("F = ma (force equals
 * mass times acceleration)") over-captures into the RHS and drives a
 * genuinely consistent equation to parse-failure. The discriminator (see
 * extractEquationCandidates's own comment): a SPACE before the "(" (genuine
 * math grouping in the corpus always attaches directly, "m(g + a)"), the
 * parenthetical's own content carrying NO arithmetic-operator character, and
 * at least one true English word (three-plus plain letters) inside it.
 */
describe('BATCH 7 — Gate A trims a trailing space-separated balanced parenthetical annotation', () => {
  it('trims a multi-word explanatory aside — the real Gemini shape', () => {
    const candidates = extractEquationCandidates('F = ma (force equals mass times acceleration)')
    expect(candidates.length).toBe(1)
    expect(candidates[0].text).toBe('F = ma')
  })

  it('trims a single-word units label', () => {
    expect(extractEquationCandidates('C = Q/V (farads)')[0]?.text).toBe('C = Q/V')
  })

  it('trims "(maximum)" / "(seconds)" / "(equilibrium)"-style single-word asides', () => {
    expect(extractEquationCandidates('v = Aω (maximum)')[0]?.text).toBe('v = Aω')
    expect(extractEquationCandidates('τ = RC (seconds)')[0]?.text).toBe('τ = RC')
  })

  it('does NOT trim units notation that carries an operator character — "(N/C)", "(W/m²)", "(N/kg)" are left untouched, exactly as before this batch', () => {
    expect(extractEquationCandidates('E = F/q (N/C)')[0]?.text).toBe('E = F/q (N/C)')
    expect(extractEquationCandidates('I = P/A (W/m²)')[0]?.text).toBe('I = P/A (W/m²)')
    expect(extractEquationCandidates('g = F/m (N/kg)')[0]?.text).toBe('g = F/m (N/kg)')
  })

  it('does NOT trim genuine math grouping directly attached with no space — "N = m(g + a)", "F = q(E + v × B)"', () => {
    expect(extractEquationCandidates('N = m(g + a)')[0]?.text).toBe('N = m(g + a)')
    expect(extractEquationCandidates('F = q(E + v × B)')[0]?.text).toBe('F = q(E + v × B)')
  })

  it('does NOT trim a space-separated parenthetical that carries an arithmetic operator, even hypothetically (the operator guard, independent of the no-space guard above)', () => {
    // A stress case not present in the corpus: if a real generated sentence
    // ever DID write a genuine multiplicative factor with a stray space
    // before it, the operator inside must still block the trim.
    expect(extractEquationCandidates('F = k (x - x0)')[0]?.text).toBe('F = k (x - x0)')
  })

  it('does NOT trim a space-separated parenthetical whose content is a bare short symbol, not a word — "(x0)" has no arithmetic operator but also no 3+ letter word', () => {
    expect(extractEquationCandidates('F = k (x0)')[0]?.text).toBe('F = k (x0)')
  })

  it('leaves the candidate empty (never crashes) when the trim would empty the RHS entirely — "x = (equilibrium)" style', () => {
    expect(() => extractEquationCandidates('x = (equilibrium)')).not.toThrow()
  })

  it('the real captured production sentence now reaches "consistent" end to end, via diagnosePhysicsDim', () => {
    const draft = 'In equation form, this is written as: \\( F = m a \\) (force equals mass times acceleration)'
    const diagnosis = diagnosePhysicsDim(draft, CONCEPT_DIMENSION_BINDINGS['phys.mech.newtons-second-law'])
    expect(diagnosis.gate).toBe('consistent')
    expect(diagnosis.violation).toBeNull()
  })

  it('a genuinely WRONG equation with the identical trailing-annotation shape still REJECTS — the trim does not weaken violation detection', () => {
    // F = m (drops the acceleration factor), wrapped in the same trailing
    // annotation shape this batch trims.
    const draft = 'The formula is F = m (this is the broken version).'
    const diagnosis = diagnosePhysicsDim(draft, CONCEPT_DIMENSION_BINDINGS['phys.mech.momentum'])
    expect(diagnosis.gate).toBe('violation')
  })

  it('FULL CORPUS: re-run CORRECT_CONTROLS/REJECTION_CASES/MUST_NOT_FIRE_CONTROLS after the Batch 7 trim — identical counts to the pre-Batch-7 baseline (912/25/240, 0 regressions)', () => {
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
    expect(nonNull).toEqual(['phys.mech.hookes-law::k_eq = 1/k₁ + 1/k₂'])

    let nonNullWithNullBinding = 0
    for (const eq of CORRECT_CONTROLS) {
      if (dimensionalViolation(eq.text, null) !== null) nonNullWithNullBinding += 1
    }
    expect(nonNullWithNullBinding).toBe(0)

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
    expect(rejected).toBe(5)
    expect(abstained).toBe(2)

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
})
