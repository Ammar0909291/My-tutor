/**
 * Batch: complex-numbers-analysis (math.cx) — OPENS the math.cx domain
 * (0/31), the final remaining Mathematics domain this campaign.
 *
 * Fresh Phase 0 frontier recompute after math.top reached 23/23
 * completion: math.cx is the only remaining Mathematics domain, and its
 * own frontier has exactly 1 concept ready — complex-numbers-analysis,
 * the domain's sole root (requires math.found.complex-numbers and
 * math.trig.polar-form-complex, both already authored). The domain's
 * remaining 30 concepts branch out from here, so only this one concept
 * is ready until it's authored.
 * Transcribed from its frozen Educational Brain entry at educational-
 * brain/concepts/mathematics/math.cx.complex-numbers-analysis.md.
 *
 * Grade band: GradeBand.HIGH, matching this concept's "advanced"
 * difficulty tier and the established precedent set by other
 * advanced-tier trig/complex-number concepts (DeMoivre's theorem, Euler's
 * formula) in mathematicsCalcTrigSubstitutionDeMoivreEulersFormulaAssets.ts
 * — distinct from math.top's UNDERGRADUATE baseline, which was
 * established for that domain's overwhelmingly expert/research tier
 * (math.cx is itself 24 expert + 5 research + only 2 advanced concepts,
 * of which this is one).
 *
 * This concept's KG cross-link (math.trig.eulers-formula) is authored —
 * a genuine transfer target, though the Blueprint's own independence-mode
 * probe (no cross-link-specific transfer question in the Discovery
 * Questions) is preserved as-is per the EB entry's own Curriculum
 * Feedback note.
 *
 * This EB entry registers exactly 3 formal misconceptions (full
 * contract, no retargeting needed).
 *
 * Seeded as DRAFT. Promotion stays human.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedExplanation, SeedProbe } from './brainSeedAssets'

const S = 'mathematics'
const eb = (id: string, what: string) =>
  `educational-brain/concepts/mathematics/${id}.md — ${what}`

const COMPLEX_NUMBERS_ANALYSIS = 'math.cx.complex-numbers-analysis'

export const MATHEMATICS_CX_COMPLEX_NUMBERS_ANALYSIS_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: COMPLEX_NUMBERS_ANALYSIS, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'THE MODULUS IS THE PYTHAGOREAN DISTANCE — NEVER THE SUM OF THE COORDINATES: for z=5+12i: '
      + '|z|=√(5²+12²)=√169=13 — the Euclidean distance from the origin on the Argand plane. '
      + 'Computing |z|=5+12=17 instead is WRONG — that is the taxicab (L¹) distance, never the '
      + 'modulus; the modulus is ALWAYS the Pythagorean √(x²+y²), the direct analogue of ordinary '
      + 'Euclidean distance in R².\n\n'
      + 'CONJUGATION NEGATES ONLY THE IMAGINARY PART — NEVER BOTH PARTS: for z=−2+5i: z̄=−2−5i — '
      + 'the real part −2 stays UNCHANGED; only the imaginary part flips sign. Writing z̄=2−5i '
      + '(negating the real part too) is WRONG — that computes −z\'s real part combined with z̄\'s '
      + 'imaginary part, neither z̄ nor −z correctly; conjugation is geometrically a reflection '
      + 'across the real axis, which by definition leaves the real coordinate fixed.\n\n'
      + 'zz̄=|z|² IS ALWAYS REAL AND NON-NEGATIVE — NEVER THE SAME AS z²: for z=1+2i: '
      + 'zz̄=(1+2i)(1−2i)=1+4=5=|z|² (real, non-negative), while z²=(1+2i)²=1+4i+4i²=−3+4i '
      + '(genuinely complex, with a nonzero imaginary part). Confusing zz̄ with z² is WRONG — they '
      + 'are computed from entirely different formulas and give different TYPES of results in '
      + 'general: zz̄=x²+y² is always real and non-negative, while z²=(x²−y²)+2xyi is complex '
      + 'unless y=0.',
    targetedMisconceptions: [`${COMPLEX_NUMBERS_ANALYSIS}:MC-1`, `${COMPLEX_NUMBERS_ANALYSIS}:MC-2`, `${COMPLEX_NUMBERS_ANALYSIS}:MC-3`],
    source: eb(COMPLEX_NUMBERS_ANALYSIS, 'Core Understanding — the modulus being the Pythagorean distance never the sum of the coordinates, conjugation negating only the imaginary part never both parts, and zz-bar equaling |z|^2 always real and non-negative never the same as z^2'),
  },
]

export const MATHEMATICS_CX_COMPLEX_NUMBERS_ANALYSIS_PROBES: SeedProbe[] = [
  {
    conceptId: COMPLEX_NUMBERS_ANALYSIS, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'For z=5+12i, is |z| the sum 5+12, or the Pythagorean √(5²+12²)?',
    choices: [
      { text: "The Pythagorean √(5²+12²) — |z|=√(25+144)=√169=13, the Euclidean distance from the origin on the Argand plane; the modulus is always the Pythagorean distance, never the taxicab sum of the coordinates", isCorrect: true },
      { text: "The sum 5+12=17", isCorrect: false, misconceptionId: `${COMPLEX_NUMBERS_ANALYSIS}:MC-1` },
      { text: "Since adding the real and imaginary parts together feels like the natural way to combine them into one number, |z| should be computed as their sum", isCorrect: false, misconceptionId: `${COMPLEX_NUMBERS_ANALYSIS}:MC-1` },
    ],
    targetedMisconceptions: [`${COMPLEX_NUMBERS_ANALYSIS}:MC-1`],
    source: eb(COMPLEX_NUMBERS_ANALYSIS, 'Discovery Question 1 as a detection probe (verbatim) — whether |z| is the coordinate sum or the Pythagorean distance, an answer of "the sum" confirming MODULUS-IS-SUM'),
  },
  {
    conceptId: COMPLEX_NUMBERS_ANALYSIS, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Does conjugation negate both the real and imaginary parts, or just the imaginary part?',
    choices: [
      { text: "Just the imaginary part — for z=-2+5i, z-bar=-2-5i; the real part -2 stays unchanged, since conjugation is geometrically a reflection across the real axis, which by definition leaves the real coordinate fixed", isCorrect: true },
      { text: "Conjugation negates both the real and imaginary parts", isCorrect: false, misconceptionId: `${COMPLEX_NUMBERS_ANALYSIS}:MC-2` },
      { text: "Since 'conjugate' sounds like it should mean a total sign flip similar to ordinary negation, both parts should be expected to change sign", isCorrect: false, misconceptionId: `${COMPLEX_NUMBERS_ANALYSIS}:MC-2` },
    ],
    targetedMisconceptions: [`${COMPLEX_NUMBERS_ANALYSIS}:MC-2`],
    source: eb(COMPLEX_NUMBERS_ANALYSIS, 'Discovery Question 2 as a detection probe (verbatim) — whether conjugation negates both parts or just the imaginary part, an answer of "both" confirming CONJUGATE-NEGATES-BOTH'),
  },
  {
    conceptId: COMPLEX_NUMBERS_ANALYSIS, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Is z·z̄ the same thing as z², or genuinely different?',
    choices: [
      { text: "Genuinely different — for z=1+2i, z times z-bar = (1+2i)(1-2i)=1+4=5, real and non-negative, while z^2=(1+2i)^2=1+4i+4i^2=-3+4i, genuinely complex; z times z-bar always equals x^2+y^2 (real), while z^2=(x^2-y^2)+2xyi is complex unless y=0", isCorrect: true },
      { text: "z times z-bar is the same thing as z squared", isCorrect: false, misconceptionId: `${COMPLEX_NUMBERS_ANALYSIS}:MC-3` },
      { text: "Since both notations look like 'z times something related to z', z times z-bar and z squared should be expected to give the same result", isCorrect: false, misconceptionId: `${COMPLEX_NUMBERS_ANALYSIS}:MC-3` },
    ],
    targetedMisconceptions: [`${COMPLEX_NUMBERS_ANALYSIS}:MC-3`],
    source: eb(COMPLEX_NUMBERS_ANALYSIS, 'Discovery Question 3 as a detection probe (verbatim) — whether z times z-bar is the same as z squared, an answer of "same" confirming ZZ-BAR-AS-Z-SQUARED'),
  },
]
