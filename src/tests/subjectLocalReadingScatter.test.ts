/**
 * SCATTERED ACROSS THE SUBJECT — regression tests for the fix in
 * `requestedConcept.ts`'s `subjectLocalReading`, found as a byproduct of the
 * Deterministic Physics Verifier's Batch 4 observation window (2026-09-16),
 * unrelated to that programme.
 *
 * ── THE DEFECT, confirmed live in production ────────────────────────────────
 * Every one of 24 real phys.mech.* lessons driven against the deployed app,
 * on the turn "can you show me the equation and explain what each symbol
 * means?", opened an excursion targeting `phys.mech.hamiltons-equations` —
 * "Hamilton's Equations of Motion", an expert-level classical-mechanics
 * topic unrelated to whatever lesson was actually open. 24/24, 100%
 * reproducible, regardless of which lesson was open.
 *
 * ── THE MECHANISM, traced with real instrumentation (temporary console.log
 *    tracing, then confirmed by directly calling the real exported functions
 *    — never hand-derived) ────────────────────────────────────────────────
 * "the equation" bare-word-matches `math.alg.equation` ("Equation") via
 * EXACT_TITLE, 0.95 confidence — a real, cross-subject (mathematics) match.
 * Because the winning match's subject differs from the physics lesson's,
 * `subjectLocalReading` ran, found every physics title containing the whole
 * word "equation" (SEVEN of them — Hamilton's, the wave equation,
 * Bernoulli's, Schrödinger's, Maxwell's, Hamilton-Jacobi, Euler-Lagrange —
 * scattered across FOUR unrelated domains: phys.mech, phys.wave, phys.qm,
 * phys.em), and — before this fix — returned the SHORTEST one
 * unconditionally: "Hamilton's Equations of Motion" (28 normalized chars,
 * the shortest of the seven).
 *
 * ── THE FIX, two parts ──────────────────────────────────────────────────────
 * 1. `subjectLocalReading` now counts the distinct KG DOMAINS its same-
 *    subject candidates span. A full corpus sweep (every bare single-word
 *    title read from every OTHER subject, 71 (word, target-subject) pairs
 *    with >=1 same-subject candidate) found the R1/R6-protected cases
 *    (reflection, vector, hydrogen, field, resonance) all stay at 1-2
 *    domains, while "equation"->physics (4), "equation"->chemistry (4, the
 *    same defect in the untested direction), "function"->mathematics (14),
 *    "set"->mathematics (5), "algorithm"->mathematics (4), "power"-
 *    >mathematics (4) and "function"->physics (3, x2) all exceed 2. More
 *    than `MAX_COHERENT_DOMAINS` (2): the honest answer is null rather than
 *    a guess by title length.
 * 2. That alone still let the message resolve to the ORIGINAL cross-subject
 *    match, `math.alg.equation` — a less wrong but still real excursion
 *    away from the lesson (`subjectLocalReading(...) ?? requested` keeps the
 *    cross-subject destination when no local reading exists, which is
 *    CORRECT for a genuine cross-subject request like "explain
 *    photosynthesis" from physics, and wrong here). "equation" was added to
 *    `MEDIUM_NOUNS`, the SAME mechanism that already separates "show me a
 *    graph" (medium) from "teach me graph" (topic) for `math.disc.graph` —
 *    "show me THE equation" is a presentation-format request, not a request
 *    to be taught the Algebra concept "Equation"; "teach me
 *    equations"/"what is an equation"/"explain equations" keep a
 *    TEACHING_CUE nearby and are unaffected.
 */
import { describe, it, expect } from 'vitest'
import { resolveRequestedConceptId } from '@/lib/teaching/concept/requestedConcept'
import { CONCEPT_DIMENSION_BINDINGS } from '@/lib/teaching/physics/dimensionBindings'

// The real, current registry — never hand-copied, so this suite tracks
// dimensionBindings.ts automatically and can never silently drift from it.
const BOUND_PHYS_MECH_CONCEPTS = Object.keys(CONCEPT_DIMENSION_BINDINGS)

const REPRO = 'can you show me the equation and explain what each symbol means?'

describe('REGRESSION 1 — the exact repro string never opens the Hamilton\'s-equations excursion', () => {
  it('the bound registry really has 24 phys.mech.* concepts (sanity check on the fixture itself)', () => {
    expect(BOUND_PHYS_MECH_CONCEPTS.length).toBe(24)
    expect(BOUND_PHYS_MECH_CONCEPTS.every((id) => id.startsWith('phys.mech.'))).toBe(true)
  })

  it.each(BOUND_PHYS_MECH_CONCEPTS)('%s: the repro string does not resolve to phys.mech.hamiltons-equations', (lessonConceptId) => {
    expect(resolveRequestedConceptId(REPRO, lessonConceptId, 'physics')).not.toBe('phys.mech.hamiltons-equations')
  })

  it.each(BOUND_PHYS_MECH_CONCEPTS)('%s: the repro string opens NO excursion at all (null, not merely a different one)', (lessonConceptId) => {
    // The narrower "not Hamilton's-equations" assertion above is not enough —
    // a fix that only avoided THAT one concept while still resolving to some
    // OTHER unrelated concept (e.g. math.alg.equation, the cross-subject match
    // that triggers subjectLocalReading in the first place) would still open
    // a real excursion away from the lesson. The live-verification bar this
    // pins is "no excursion opens", not "opens a less-wrong excursion".
    expect(resolveRequestedConceptId(REPRO, lessonConceptId, 'physics')).toBeNull()
  })
})

describe('REGRESSION 2 — positive control: an explicit, full-name request for Hamilton\'s Equations still resolves', () => {
  // Deliberately phrased to include "of Motion" so this control resolves via
  // a DIRECT same-subject EXACT_TITLE match, completely independent of
  // `subjectLocalReading` — proving the concept is still reachable at all,
  // not merely that a phrase which happened to rely on the bug now fails.
  // ("teach me about Hamilton's equations", without "of Motion", was
  // measured to resolve ONLY through the bug being fixed here — it has no
  // other match in the index, since the KG's own per-concept `aliases` field
  // is not loaded into the matcher at all (a separate, pre-existing gap, out
  // of this fix's scope) — so it is deliberately not used as the control.)
  it.each([
    'can you explain Hamilton\'s equations of motion',
    'teach me Hamilton\'s equations of motion',
    'what are Hamilton\'s equations of motion',
  ])('%s -> phys.mech.hamiltons-equations', (message) => {
    expect(resolveRequestedConceptId(message, 'phys.mech.newtons-second-law', 'physics'))
      .toBe('phys.mech.hamiltons-equations')
  })
})

describe('REGRESSION 3 — the fix does not blanket-ban "equation" as a topic', () => {
  // A genuine teaching-cue-governed request for the Algebra concept must
  // still work from a physics lesson — this is the overcorrection check the
  // MEDIUM_NOUNS addition is not allowed to fail.
  it.each([
    'teach me equations',
    'what is an equation',
    'explain the equation',
    'explain equations to me',
  ])('%s -> math.alg.equation (still a real cross-subject request)', (message) => {
    expect(resolveRequestedConceptId(message, 'phys.mech.newtons-second-law', 'physics'))
      .toBe('math.alg.equation')
  })
})

describe('REGRESSION 4 — the OTHER Batch 4 turn phrasings that rode the same open excursion', () => {
  // These never resolved to hamiltons-equations DIRECTLY in production (the
  // excursion "continued" once opened by the repro turn, per the real
  // [excursion] telemetry) — pinned here so a future change cannot silently
  // start resolving them to the same wrong concept via a different path.
  it.each([
    'can you derive this for me step by step?',
    'give me a worked example using the formula',
  ])('%s -> null from a Newton\'s-Second-Law lesson', (message) => {
    expect(resolveRequestedConceptId(message, 'phys.mech.newtons-second-law', 'physics')).toBeNull()
  })
})

describe('REGRESSION 5 — R1/R6 anti-regression, re-pinned here against the SAME fixed function', () => {
  // resolverLessonVocabulary.test.ts already pins these; repeated here
  // because this file is the one that changed `subjectLocalReading`'s
  // internals (candidate collection + a new domain-scatter gate), and a
  // fix that passed the OLD file's assertions by coincidence should not be
  // trusted without also passing them read directly against the new code
  // path in the same commit that changes it.
  it.each([
    ['teach me vector', 'phys.opt.refraction', 'phys.meas.scalars-vectors'],
    ['what is a vector', 'phys.opt.refraction', 'phys.meas.scalars-vectors'],
    ['explain reflection', 'phys.opt.refraction', 'phys.opt.reflection'],
    ['what is reflection', 'phys.opt.refraction', 'phys.opt.reflection'],
    ['explain resonance', 'chem.bond.vsepr', 'chem.bond.resonance'],
    ['explain hydrogen', 'phys.opt.refraction', 'phys.mod.bohr-model'],
    ['explain field', 'phys.opt.refraction', 'phys.em.electric-field'],
  ])('%s (lesson %s) -> %s', (message, lesson, expected) => {
    expect(resolveRequestedConceptId(message, lesson)).toBe(expected)
  })

  it('R1: "ray" still resolves to the genuine physics ray concept, never x-rays', () => {
    const got = resolveRequestedConceptId('can you draw diagram of ray bending please', 'phys.opt.refraction')
    expect(got).toBe('phys.opt.nature-of-light')
  })

  it('R4: an explicit X-ray request still reaches X-rays', () => {
    expect(resolveRequestedConceptId('can you explain X-rays', 'phys.opt.refraction')).toBe('phys.mod.x-rays')
  })

  it('R5: cross-subject switches unrelated to "equation" are unchanged', () => {
    expect(resolveRequestedConceptId('explain entropy', 'phys.mech.free-body-diagram'))
      .toBe('phys.therm.entropy')
    expect(resolveRequestedConceptId('explain photosynthesis', 'phys.opt.refraction'))
      .toBe('bio.plant.photosynthesis')
  })
})

describe('REGRESSION 6 — the scatter rule generalizes past "equation", measured corpus-wide AND verified reachable', () => {
  // The same full corpus sweep that justified MAX_COHERENT_DOMAINS found
  // several OTHER (word, target-subject) pairs exceeding it. Two of the
  // original candidates ("function", "set" read into mathematics) turned out
  // NOT to be reachable through the real resolver on further verification —
  // mathematics has its OWN same-subject bare "Function"/"Set" concept, and
  // `resolveRequestedConceptId`'s same-subject preference (`viable.find`)
  // picks that directly, never reaching `subjectLocalReading` at all. Only
  // cases below were confirmed reachable by calling the REAL resolver, not
  // assumed from the sweep's raw candidate/domain counts alone — exactly the
  // "prove it by observing the actual execution" discipline this fix itself
  // was built on.
  it('"equation" read into chemistry (the same defect, untested direction) no longer guesses (4 domains)', () => {
    // Chemistry has no own-subject bare "Equation" concept, so math.alg.equation
    // is genuinely the cross-subject winner and subjectLocalReading genuinely
    // runs, scattered across 4 chemistry domains exactly like physics.
    expect(resolveRequestedConceptId('teach me equation', 'chem.bond.vsepr', 'chemistry'))
      .toBe('math.alg.equation') // falls back to the genuine cross-subject topic
    expect(resolveRequestedConceptId('can you show me the equation', 'chem.bond.vsepr', 'chemistry'))
      .toBeNull() // the medium-noun reading closes it exactly as in physics
  })

  it('"algorithm" read into mathematics no longer guesses (4 domains)', () => {
    // computer_science's cs.algo.algorithms is the only bare "Algorithm"
    // title in the whole corpus, so it is genuinely the cross-subject
    // winner from any math lesson, and subjectLocalReading genuinely runs,
    // scattered across 4 math domains.
    expect(resolveRequestedConceptId('teach me algorithm', 'math.calc.limits', 'mathematics'))
      .toBe('cs.algo.algorithms') // falls back to the genuine cross-subject topic
  })

  it('"power" read into mathematics no longer guesses (4 domains)', () => {
    // phys.mech.power is the only bare "Power" title, so it genuinely wins
    // from a math lesson, and subjectLocalReading genuinely runs, scattered
    // across 4 math domains.
    expect(resolveRequestedConceptId('teach me power', 'math.calc.limits', 'mathematics'))
      .toBe('phys.mech.power') // falls back to the genuine cross-subject topic
  })
})
