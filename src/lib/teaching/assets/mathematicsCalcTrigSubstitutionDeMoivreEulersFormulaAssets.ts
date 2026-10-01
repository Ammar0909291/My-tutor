/**
 * Batch: trigonometric substitution (math.calc), De Moivre's theorem, and
 * Euler's formula (both math.trig).
 *
 * math.calc.trig-substitution becomes ready off already-authored
 * math.calc.trig-integrals (prior batch) and math.trig.trig-identities,
 * and directly unblocks math.calc.partial-fractions next. math.trig.
 * de-moivres-theorem and math.trig.eulers-formula both become ready off
 * already-authored math.trig.polar-form-complex (prior batch); authoring
 * both in the same batch brings math.trig's own Educational Brain layer to
 * its full 25/25 domain certification (already achieved at the EB layer;
 * this batch is asset-contract seeding only).
 * Transcribed from the frozen Educational Brain entries at
 * educational-brain/concepts/mathematics/math.calc.trig-substitution.md,
 * math.trig.de-moivres-theorem.md, and math.trig.eulers-formula.md.
 *
 *   TRIGSUB   trig-substitution — the sign pattern under the square root
 *             (a²-x², a²+x², or x²-a²) dictates exactly ONE of the three
 *             substitutions, never a single substitution applied to every
 *             radical; dx must be converted together with x as one
 *             package, never left unsubstituted; the definite-integral
 *             bound-conversion shortcut works only because bounds exist
 *             to convert, never extending to indefinite integrals.
 *   DEMOIVRE  de-moivres-theorem — every nonzero complex number has
 *             EXACTLY n distinct n-th roots, never just the one obvious
 *             (often real) root; the modulus raises to the n-th power
 *             SEPARATELY from the angle computation, never left
 *             unchanged; the entire right side of n·φ=θ+2πk must be
 *             divided by n, never just the θ term alone.
 *   EULER     eulers-formula — e^(iθ)=cosθ+isinθ is ONE fact written in
 *             two notations, never two independently-verifiable facts;
 *             Euler's identity requires nothing beyond substituting θ=π
 *             into the already-known general formula, never a separate
 *             dedicated proof; the formula is a genuine consequence of
 *             the complex exponential's power series, never an arbitrary
 *             notational convention.
 *
 * Seeded as DRAFT. Promotion stays human.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedExplanation, SeedProbe } from './brainSeedAssets'

const S = 'mathematics'
const eb = (id: string, what: string) =>
  `educational-brain/concepts/mathematics/${id}.md — ${what}`

const TRIGSUB = 'math.calc.trig-substitution'
const DEMOIVRE = 'math.trig.de-moivres-theorem'
const EULER = 'math.trig.eulers-formula'

export const MATHEMATICS_CALC_TRIG_SUBSTITUTION_DE_MOIVRE_EULERS_FORMULA_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: TRIGSUB, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'Matching the radical\'s shape to the correct substitution is the whole strategy — the sign pattern '
      + 'under the root dictates exactly ONE of three choices, never a single substitution applied '
      + 'everywhere. 1-sin²θ=cos²θ turns a²-x² (via x=asinθ) into a²cos²θ. 1+tan²θ=sec²θ turns a²+x² '
      + '(via x=atanθ) into a²sec²θ. sec²θ-1=tan²θ turns x²-a² (via x=asecθ) into a²tan²θ. Applying the '
      + 'wrong substitution does not merely produce extra work — it produces an outright algebraic '
      + 'breakdown, a negative quantity under a square root.\n\n'
      + 'The substitution is a package deal: x and dx must change TOGETHER, exactly as u-substitution '
      + 'never leaves du behind. For x=asinθ, dx=acosθ dθ must be substituted at the SAME step as x '
      + 'itself — leaving dx unconverted breaks the integral\'s internal consistency just as surely as '
      + 'forgetting du would.\n\n'
      + 'After integrating in θ, an INDEFINITE integral\'s answer must be converted back into x via a '
      + 'right-triangle reference diagram. For a DEFINITE integral, converting the BOUNDS themselves into '
      + 'θ-values at the outset lets the entire evaluation happen in θ, skipping back-substitution — but '
      + 'this shortcut works ONLY because numeric bounds exist to convert; it does NOT extend to '
      + 'indefinite integrals, which have no bounds at all.',
    targetedMisconceptions: [`${TRIGSUB}:MC-1`, `${TRIGSUB}:MC-2`, `${TRIGSUB}:MC-3`],
    source: eb(TRIGSUB, 'Core Understanding — the sign pattern under the radical dictates exactly one of three substitutions, x and dx must be converted together as a package deal, and the definite-integral bound-conversion shortcut depends on bounds existing to convert'),
  },
  {
    conceptId: DEMOIVRE, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'De Moivre\'s Theorem, (cosθ+isinθ)ⁿ=cos(nθ)+isin(nθ), is exactly the polar multiplication rule '
      + '(multiply moduli, add arguments) applied n times to a number multiplied by itself: the argument '
      + 'θ adds to itself n times, giving nθ. For a general z=r(cosθ+isinθ), the modulus raises to the '
      + 'n-th power SEPARATELY: zⁿ=rⁿ(cos(nθ)+isin(nθ)) — never left unchanged just because the '
      + 'modulus-1 special case looks simpler.\n\n'
      + 'The theorem runs BACKWARD to find n-th roots: solving wⁿ=z with w=s(cosφ+isinφ) gives sⁿ=r (so '
      + 's=r^(1/n)) and nφ=θ+2πk for ANY integer k, since angles are only determined up to full-circle '
      + 'multiples of 2π. Dividing the ENTIRE right side by n gives φₖ=(θ+2πk)/n — never just the θ term '
      + 'divided while 2πk is added afterward. Taking k=0,1,...,n-1 produces exactly n genuinely DISTINCT '
      + 'roots, evenly spaced around a circle of radius r^(1/n) — every nonzero complex number has '
      + 'EXACTLY n distinct n-th roots, never just the one obvious (often real) root.\n\n'
      + 'The theorem also gives multiple-angle formulas algebraically: expanding (cosθ+isinθ)ⁿ via the '
      + 'binomial theorem and comparing real/imaginary parts against cos(nθ)+isin(nθ) yields explicit '
      + 'polynomial formulas for cos(nθ) and sin(nθ), with no separate geometric argument needed.',
    targetedMisconceptions: [`${DEMOIVRE}:MC-1`, `${DEMOIVRE}:MC-2`, `${DEMOIVRE}:MC-3`],
    source: eb(DEMOIVRE, 'Core Understanding — De Moivre\'s theorem is the polar multiplication rule applied n times, every nonzero complex number has exactly n distinct roots, the modulus raises to the power separately, and the entire root-angle formula must be divided by n'),
  },
  {
    conceptId: EULER, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'Euler\'s formula, e^(iθ)=cosθ+isinθ, is not a coincidence between two independently-verifiable '
      + 'facts — e^(iθ) is DEFINED (via the complex exponential\'s power series) to equal precisely this. '
      + 'So z=re^(iθ) is simply the already-familiar polar form z=r(cosθ+isinθ), rewritten in exponential '
      + 'notation: one fact, two notations, never two facts to memorize separately.\n\n'
      + 'Euler\'s identity is one specific instance, not a separate result requiring its own proof: '
      + 'setting θ=π in the general formula, e^(iπ)=cosπ+isinπ=-1+i(0)=-1, so e^(iπ)+1=0. This equation\'s '
      + 'fame comes from uniting five fundamental constants, but structurally it requires nothing beyond '
      + 'substituting θ=π into the already-established formula and evaluating two standard trig values — '
      + 'no additional machinery.\n\n'
      + 'The formula is a genuine mathematical consequence, not an arbitrary convention: the complex '
      + 'exponential e^z is analytic on all of ℂ, representable everywhere by its power series '
      + 'Σzⁿ/n!. Substituting z=iθ and using i²=-1, i³=-i, i⁴=1 (cycling), the terms split cleanly into a '
      + 'REAL part matching cosine\'s own power series and an IMAGINARY part matching sine\'s own power '
      + 'series — this is provable from deeper structure, never a notational choice made purely for '
      + 'convenience.',
    targetedMisconceptions: [`${EULER}:MC-1`, `${EULER}:MC-2`, `${EULER}:MC-3`],
    source: eb(EULER, 'Core Understanding — Euler\'s formula is one fact in two notations rather than two separate facts, Euler\'s identity is a bare substitution requiring no separate proof, and the formula is a provable consequence of the power series rather than an arbitrary convention'),
  },
]

export const MATHEMATICS_CALC_TRIG_SUBSTITUTION_DE_MOIVRE_EULERS_FORMULA_PROBES: SeedProbe[] = [
  // --- math.calc.trig-substitution ------------------------------------------
  {
    conceptId: TRIGSUB, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Can √(x²-9) and √(9-x²) both be handled with the substitution x=3sinθ? Try applying it to both and see what happens.',
    choices: [
      { text: 'No — x=3sinθ correctly simplifies √(9-x²) to 3cosθ, but applied to √(x²-9) it gives √(9sin²θ-9)=√(-9cos²θ), a negative quantity under a root; the sign pattern under the radical (a²-x² versus x²-a²) dictates which of the three substitutions is required, never a single one applied to both', isCorrect: true },
      { text: 'Yes — x=3sinθ correctly simplifies both radicals, since any square root of a quadratic expression responds to the same substitution', isCorrect: false, misconceptionId: `${TRIGSUB}:MC-1` },
      { text: 'Yes, since the substitution only depends on the constant 3 appearing in both expressions, not on the sign pattern under the root', isCorrect: false, misconceptionId: `${TRIGSUB}:MC-1` },
    ],
    targetedMisconceptions: [`${TRIGSUB}:MC-1`],
    source: eb(TRIGSUB, 'Discovery Question 1 — can sqrt(x^2-9) and sqrt(9-x^2) both be handled with the substitution x=3sintheta; try applying it to both and see what happens'),
  },
  {
    conceptId: TRIGSUB, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'The bound-conversion shortcut let you skip back-substitution on a definite integral by converting the bounds into θ-values. Would that same shortcut work on an indefinite integral, which has no bounds at all?',
    choices: [
      { text: 'No — the shortcut works ONLY because specific numeric bounds exist to convert into θ-bounds; an indefinite integral has no bounds at all, so its final answer must be expressed in terms of x, requiring the mandatory triangle-based back-substitution', isCorrect: true },
      { text: 'Yes — once the shortcut has been shown to work on one definite integral, it applies universally to every trig-substitution integral, definite or indefinite', isCorrect: false, misconceptionId: `${TRIGSUB}:MC-3` },
      { text: 'Yes, since back-substitution is always optional regardless of whether the integral has numeric bounds', isCorrect: false, misconceptionId: `${TRIGSUB}:MC-3` },
    ],
    targetedMisconceptions: [`${TRIGSUB}:MC-3`],
    source: eb(TRIGSUB, 'Discovery Question 3 — the bound-conversion shortcut let you skip back-substitution on a definite integral; would that same shortcut work on an indefinite integral, which has no bounds at all'),
  },
  {
    conceptId: TRIGSUB, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'When substituting x=2sinθ into an integral, is it acceptable to replace x but leave dx unchanged as bare dx?',
    choices: [
      { text: 'No — dx must be converted to 2cosθ dθ at the SAME step as substituting x; x and dx form a package deal, exactly as u and du must both change together in ordinary substitution; leaving dx unconverted breaks the integral\'s internal consistency', isCorrect: true },
      { text: 'Yes — once x has been replaced by 2sinθ, the differential dx can remain in its original form without any further conversion', isCorrect: false, misconceptionId: `${TRIGSUB}:MC-2` },
      { text: 'Yes, since dx only needs to be converted when the integral is definite, never for an indefinite integral', isCorrect: false, misconceptionId: `${TRIGSUB}:MC-2` },
    ],
    targetedMisconceptions: [`${TRIGSUB}:MC-2`],
    source: eb(TRIGSUB, 'Discovery Question 2 — when substituting x=2sintheta into an integral, is it acceptable to replace x but leave dx unchanged'),
  },

  // --- math.trig.de-moivres-theorem ------------------------------------------
  {
    conceptId: DEMOIVRE, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'If w=2 satisfies w³=8, are there any OTHER complex numbers that also satisfy w³=8? How many should there be in total?',
    choices: [
      { text: 'Yes — exactly 3 distinct complex cube roots exist in total (2, -1+i√3, and -1-i√3), evenly spaced around a circle of radius 2; every nonzero complex number has EXACTLY n distinct n-th roots, never just the one obvious real root', isCorrect: true },
      { text: 'No — w=2 is the only number whose cube equals 8, since real-number cube roots are always unique', isCorrect: false, misconceptionId: `${DEMOIVRE}:MC-1` },
      { text: 'There could be additional roots, but there is no way to determine how many without solving the equation by trial and error', isCorrect: false, misconceptionId: `${DEMOIVRE}:MC-1` },
    ],
    targetedMisconceptions: [`${DEMOIVRE}:MC-1`],
    source: eb(DEMOIVRE, 'Discovery Question 1 — if w=2 satisfies w^3=8, are there any other complex numbers that also satisfy w^3=8; how many should there be in total'),
  },
  {
    conceptId: DEMOIVRE, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Does De Moivre\'s Theorem in its simplest form (modulus exactly 1) tell you what happens to the modulus when it ISN\'T 1? Compute [3(cosθ+isinθ)]⁴.',
    choices: [
      { text: '[3(cosθ+isinθ)]⁴=3⁴(cos4θ+isin4θ)=81(cos4θ+isin4θ) — the modulus 3 raises to the 4th power SEPARATELY from the angle computation, giving 81, never left at 3 just because the modulus-1 case looks unchanged', isCorrect: true },
      { text: '[3(cosθ+isinθ)]⁴=3(cos4θ+isin4θ) — the modulus stays at 3 regardless of the exponent, since only the angle changes under De Moivre\'s theorem', isCorrect: false, misconceptionId: `${DEMOIVRE}:MC-2` },
      { text: 'The modulus cannot be computed at all without first knowing the specific numerical value of θ', isCorrect: false, misconceptionId: `${DEMOIVRE}:MC-2` },
    ],
    targetedMisconceptions: [`${DEMOIVRE}:MC-2`],
    source: eb(DEMOIVRE, 'Discovery Question 2 — does De Moivre\'s Theorem in its simplest form (modulus exactly 1) tell you what happens to the modulus when it isn\'t 1'),
  },
  {
    conceptId: DEMOIVRE, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'In the equation nφ=θ+2πk, if you divide both sides by n, does the 2πk term get divided too?',
    choices: [
      { text: 'Yes — dividing the ENTIRE right side by n gives φ=(θ+2πk)/n, with both the θ term and the 2πk term divided together; dividing only the θ term while adding 2πk afterward produces the wrong root-angle formula', isCorrect: true },
      { text: 'No — only the θ term is divided by n, giving φ=θ/n+2πk, since the 2πk term represents a separate correction added after the division', isCorrect: false, misconceptionId: `${DEMOIVRE}:MC-3` },
      { text: 'The 2πk term should be divided by n but the θ term should not, since 2πk originates from the periodicity adjustment rather than the original angle', isCorrect: false, misconceptionId: `${DEMOIVRE}:MC-3` },
    ],
    targetedMisconceptions: [`${DEMOIVRE}:MC-3`],
    source: eb(DEMOIVRE, 'Discovery Question 3 — in the equation n*phi=theta+2*pi*k, if you divide both sides by n, does the 2*pi*k term get divided too'),
  },

  // --- math.trig.eulers-formula ------------------------------------------
  {
    conceptId: EULER, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'If e^(iθ) is DEFINED to equal cosθ+isinθ, are these two independent claims requiring separate verification, or one claim written two ways?',
    choices: [
      { text: 'One claim written two ways — e^(iθ) is DEFINED (via the complex exponential\'s power series) to equal precisely cosθ+isinθ, so z=re^(iθ) is simply the already-familiar polar form rewritten in exponential notation, never two independently-verifiable facts', isCorrect: true },
      { text: 'Two genuinely independent claims that happen to coincidentally produce the same value for every θ, each requiring its own separate proof', isCorrect: false, misconceptionId: `${EULER}:MC-1` },
      { text: 'Two independent claims, and the exponential form is only approximately equal to the trigonometric form for small values of θ', isCorrect: false, misconceptionId: `${EULER}:MC-1` },
    ],
    targetedMisconceptions: [`${EULER}:MC-1`],
    source: eb(EULER, 'Discovery Question 1 — if e^(itheta) is defined to equal costheta+isintheta, are these two independent claims, or one claim written two ways'),
  },
  {
    conceptId: EULER, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Is Euler\'s formula something chosen by convention, or something that can be derived from e^z\'s own power series?',
    choices: [
      { text: 'It is derivable from the power series — substituting z=iθ into Σzⁿ/n! and using i²=-1, i³=-i, i⁴=1 (cycling), the terms split cleanly into a real part matching cosine\'s power series and an imaginary part matching sine\'s, a genuine mathematical consequence, never an arbitrary notational choice', isCorrect: true },
      { text: 'It is purely a notational convention chosen for convenience, with no deeper mathematical justification available', isCorrect: false, misconceptionId: `${EULER}:MC-3` },
      { text: 'It cannot be derived at all; it must simply be accepted as an unprovable axiom of complex analysis', isCorrect: false, misconceptionId: `${EULER}:MC-3` },
    ],
    targetedMisconceptions: [`${EULER}:MC-3`],
    source: eb(EULER, 'Discovery Question 3 — is Euler\'s formula something chosen by convention, or something that can be derived from e^z\'s own power series'),
  },
  {
    conceptId: EULER, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'What additional steps, beyond substituting θ=π into the general formula, are needed to obtain Euler\'s identity e^(iπ)+1=0?',
    choices: [
      { text: 'None beyond that single substitution plus evaluating two standard trig values: e^(iπ)=cosπ+isinπ=-1+i(0)=-1, so e^(iπ)+1=0; the identity needs no separate dedicated proof, despite its fame from uniting five fundamental constants', isCorrect: true },
      { text: 'A full separate derivation independent of the general Euler formula, since the identity uniting five fundamental constants requires its own dedicated proof', isCorrect: false, misconceptionId: `${EULER}:MC-2` },
      { text: 'The power-series expansion must be redone from scratch specifically at θ=π, since the general formula does not apply at that particular angle', isCorrect: false, misconceptionId: `${EULER}:MC-2` },
    ],
    targetedMisconceptions: [`${EULER}:MC-2`],
    source: eb(EULER, 'Discovery Question 2 — what additional steps, beyond substituting theta=pi into the general formula, are needed to obtain Euler\'s identity'),
  },
]
