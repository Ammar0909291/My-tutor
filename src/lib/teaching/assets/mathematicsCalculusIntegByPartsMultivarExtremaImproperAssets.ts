/**
 * Thirteenth math.calc asset batch — integration by parts, classifying
 * multivariable extrema, and improper integrals.
 *
 * Continues serving-asset coverage for math.calc (40/76 -> 43/76).
 * Transcribed from the frozen Educational Brain entries at
 * educational-brain/concepts/mathematics/math.calc.integration-by-parts.md,
 * math.calc.multivariable-extrema.md, and math.calc.improper-integrals.md.
 *
 *   INTBYPARTS   integration-by-parts — the choice of u and dv is a
 *                DELIBERATE strategic decision, never an arbitrary
 *                labeling — a poor choice produces a genuinely MORE
 *                complicated integral, not merely a less efficient path;
 *                a single application is never automatically sufficient
 *                — the resulting integral must be checked for a
 *                remaining product requiring the technique again; the
 *                constant of integration is reserved for the FINAL
 *                answer only, never appended when computing v from dv as
 *                an intermediate step.
 *   MULTIVAREXT  multivariable-extrema — D=0 is genuinely INCONCLUSIVE,
 *                never a weak signal toward any particular classification
 *                — the true nature must be determined by direct
 *                inspection; checking only f_xx (or f_yy) alone is never
 *                sufficient — the mixed partial f_xy carries genuinely
 *                new information the full discriminant requires; a
 *                single directional slice through a critical point is
 *                never sufficient to classify it — a saddle point looks
 *                like a minimum from one direction and a maximum from
 *                another simultaneously.
 *   IMPROPERINT  improper-integrals — impropriety is NEVER limited to
 *                integrals with infinite limits — an integrand can be
 *                unbounded (a singularity) even with both limits of
 *                integration perfectly finite; an improper integral is
 *                NEVER automatically assumed to converge — the defining
 *                limit must be computed, and divergence (no value at
 *                all) is a genuine, common outcome; a singularity can
 *                occur at an INTERIOR point, never assumed to sit only
 *                at an endpoint — the entire interval must be scanned.
 *
 * Seeded as DRAFT. Promotion stays human.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedExplanation, SeedProbe } from './brainSeedAssets'

const S = 'mathematics'
const eb = (id: string, what: string) =>
  `educational-brain/concepts/mathematics/${id}.md — ${what}`

const INTBYPARTS = 'math.calc.integration-by-parts'
const MULTIVAREXT = 'math.calc.multivariable-extrema'
const IMPROPERINT = 'math.calc.improper-integrals'

export const MATHEMATICS_CALCULUS_INTEG_BY_PARTS_MULTIVAR_EXTREMA_IMPROPER_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: INTBYPARTS, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'Integration by Parts (∫u dv=uv-∫v du) is the Product Rule run backward. THE CHOICE OF u AND dv '
      + 'IS A DELIBERATE STRATEGIC DECISION, NEVER AN ARBITRARY LABELING — the formula does not '
      + 'simplify an integral automatically; it TRADES one integral for a different one, and whether '
      + 'that trade is good depends entirely on the choice. A poor choice produces a genuinely MORE '
      + 'complicated integral, not merely a less efficient path to the same answer — swapping the '
      + 'roles of the SAME two factors can turn a solvable integral into a harder one.\n\n'
      + 'A SINGLE APPLICATION IS NEVER AUTOMATICALLY SUFFICIENT. When the resulting integral ∫v du '
      + 'still contains a product, the technique must be applied again — each application typically '
      + 'reduces a polynomial factor\'s degree by one, so a degree-n polynomial factor requires n '
      + 'applications to fully resolve; stopping while an integral sign is still present is never a '
      + 'complete answer.\n\n'
      + 'THE CONSTANT OF INTEGRATION IS RESERVED FOR THE FINAL ANSWER ONLY. Computing v from dv as an '
      + 'intermediate step within the formula never needs its own +C — any such constant would cancel '
      + 'out algebraically in the final rearranged formula regardless of which value was chosen.',
    targetedMisconceptions: [`${INTBYPARTS}:MC-1`, `${INTBYPARTS}:MC-2`, `${INTBYPARTS}:MC-3`],
    source: eb(INTBYPARTS, 'Core Understanding — the choice of u and dv is a deliberate strategic decision, a single application is never automatically sufficient, and the constant of integration belongs only to the final answer'),
  },
  {
    conceptId: MULTIVAREXT, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'Classifying a critical point (where ∇f=0) uses the Hessian discriminant D=f_xx·f_yy-f_xy². If '
      + 'D>0 and f_xx>0: local minimum. If D>0 and f_xx<0: local maximum. If D<0: a SADDLE — a '
      + 'genuinely new classification with no single-variable analogue, where the function increases '
      + 'in one direction and decreases in another simultaneously.\n\n'
      + 'D=0 IS GENUINELY INCONCLUSIVE, NEVER A WEAK SIGNAL TOWARD ANY PARTICULAR CLASSIFICATION. It '
      + 'is a complete absence of information, not a "probably a saddle" or "probably still an '
      + 'extremum" verdict — the point\'s true nature must be determined by directly examining f near '
      + 'the critical point.\n\n'
      + 'CHECKING ONLY f_xx (OR ONLY f_yy) ALONE IS NEVER SUFFICIENT. The mixed partial f_xy carries '
      + 'genuinely new information — about how the function twists between the two axis directions — '
      + 'that f_xx and f_yy alone cannot capture; the full discriminant, using all three second '
      + 'partials, is always required.\n\n'
      + 'A SINGLE DIRECTIONAL SLICE THROUGH A CRITICAL POINT IS NEVER SUFFICIENT TO CLASSIFY IT. A '
      + 'function can look like a minimum along one line through a point and a maximum along a '
      + 'different line through the very same point — this is exactly the saddle case, and only the '
      + 'full discriminant test (using information from all directions via f_xy) correctly identifies '
      + 'it.',
    targetedMisconceptions: [`${MULTIVAREXT}:MC-1`, `${MULTIVAREXT}:MC-2`, `${MULTIVAREXT}:MC-3`],
    source: eb(MULTIVAREXT, 'Core Understanding — D=0 is genuinely inconclusive never a weak signal, checking a single Hessian entry alone is never sufficient, and a single directional slice is never sufficient to classify a critical point'),
  },
  {
    conceptId: IMPROPERINT, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'DEFINE an improper integral as a limit of ordinary proper integrals, never as something computed '
      + 'by an independent set of rules. Type I (unbounded interval): ∫ₐ^∞f(x)dx=lim_{t→∞}∫ₐᵗf(x)dx. Type '
      + 'II (unbounded integrand, a singularity): resolved by integrating from a safe distance away, '
      + 'then letting that distance shrink to zero.\n\n'
      + 'IMPROPRIETY IS NEVER LIMITED TO INTEGRALS WITH INFINITE LIMITS. An integrand can be unbounded '
      + '(a singularity) even with BOTH limits of integration perfectly finite — ∫₀¹(1/√x)dx is '
      + 'genuinely improper despite finite-looking bounds, since the integrand blows up as x→0⁺.\n\n'
      + 'AN IMPROPER INTEGRAL IS NEVER AUTOMATICALLY ASSUMED TO CONVERGE. The defining limit must be '
      + 'COMPUTED — a reasonable-looking setup does not guarantee a finite answer; divergence (the '
      + 'limit failing to exist or being infinite, meaning NO numeric value at all) is a genuine, '
      + 'common outcome requiring actual verification, never assumed away.\n\n'
      + 'A SINGULARITY CAN OCCUR AT AN INTERIOR POINT, NEVER ASSUMED TO SIT ONLY AT AN ENDPOINT. The '
      + 'entire interval must be scanned for anywhere the integrand blows up; an interior singularity '
      + 'requires SPLITTING the integral into two separately-treated pieces, never a direct '
      + 'antiderivative evaluation across the whole span.',
    targetedMisconceptions: [`${IMPROPERINT}:MC-1`, `${IMPROPERINT}:MC-2`, `${IMPROPERINT}:MC-3`],
    source: eb(IMPROPERINT, 'Core Understanding — impropriety is never limited to infinite limits, convergence is never automatically assumed and must be computed, and a singularity can occur at an interior point requiring the interval to be split'),
  },
]

export const MATHEMATICS_CALCULUS_INTEG_BY_PARTS_MULTIVAR_EXTREMA_IMPROPER_PROBES: SeedProbe[] = [
  // --- math.calc.integration-by-parts ---------------------------------------------------
  {
    conceptId: INTBYPARTS, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'For ∫xeˣdx, does it matter whether you set u=x, dv=eˣdx versus the swapped u=eˣ, dv=x dx?',
    choices: [
      { text: 'Yes — u=x, dv=eˣdx gives a simpler resulting integral (∫eˣdx), while the swapped choice produces a genuinely HARDER integral involving x²/2·eˣ', isCorrect: true },
      { text: 'No — the formula is algebraically valid for either choice, so it does not matter which factor is called u and which dv', isCorrect: false, misconceptionId: `${INTBYPARTS}:MC-1` },
      { text: 'No, since both choices always lead to the same level of computational difficulty', isCorrect: false, misconceptionId: `${INTBYPARTS}:MC-1` },
    ],
    targetedMisconceptions: [`${INTBYPARTS}:MC-1`],
    source: eb(INTBYPARTS, 'Detection probe (Blueprint A02) — the choice of u and dv is a deliberate strategic decision with real consequences; a poor choice produces a genuinely more complicated integral, not merely a less efficient path'),
  },
  {
    conceptId: INTBYPARTS, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Applying Integration by Parts once to ∫x²eˣdx gives x²eˣ-∫2xeˣdx. Is this the complete final answer?',
    choices: [
      { text: 'No — ∫2xeˣdx still contains a product and requires a second application of the technique before reaching a fully resolved answer', isCorrect: true },
      { text: 'Yes — once the formula has been applied once, the result is always the complete final answer', isCorrect: false, misconceptionId: `${INTBYPARTS}:MC-2` },
      { text: 'Yes, since any expression containing an integral sign is already considered a valid final answer', isCorrect: false, misconceptionId: `${INTBYPARTS}:MC-2` },
    ],
    targetedMisconceptions: [`${INTBYPARTS}:MC-2`],
    source: eb(INTBYPARTS, 'Detection probe (Blueprint A03) — a single application is never automatically sufficient; the resulting integral must be checked for a remaining product requiring the technique again'),
  },
  {
    conceptId: INTBYPARTS, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Computing v from dv=eˣdx as an intermediate step within the Integration by Parts formula, should v=eˣ+C?',
    choices: [
      { text: 'No — v=eˣ alone; any constant added at this intermediate step would cancel out algebraically in the final rearranged formula regardless of its value, so it is never needed here', isCorrect: true },
      { text: 'Yes — every antiderivative computed anywhere, including this intermediate step, must carry its own +C', isCorrect: false, misconceptionId: `${INTBYPARTS}:MC-3` },
      { text: 'Yes, since omitting +C at this step would make the final answer specific to only one particular antiderivative', isCorrect: false, misconceptionId: `${INTBYPARTS}:MC-3` },
    ],
    targetedMisconceptions: [`${INTBYPARTS}:MC-3`],
    source: eb(INTBYPARTS, 'Detection probe — the constant of integration is reserved for the final answer only; computing v from dv as an intermediate step never needs its own constant, since it cancels algebraically regardless'),
  },

  // --- math.calc.multivariable-extrema ---------------------------------------------------
  {
    conceptId: MULTIVAREXT, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'For f(x,y)=x⁴+y⁴ at (0,0), computing the Hessian discriminant gives D=0. What can you conclude?',
    choices: [
      { text: 'Nothing from the test itself — D=0 is genuinely inconclusive; the true classification (here, a minimum, confirmed by direct inspection since f≥0 everywhere) must be found by examining f directly', isCorrect: true },
      { text: 'The point is probably a saddle, since D=0 sits between the positive and negative cases', isCorrect: false, misconceptionId: `${MULTIVAREXT}:MC-1` },
      { text: 'The point is probably still a local extremum of some kind, since the discriminant came out to a definite number', isCorrect: false, misconceptionId: `${MULTIVAREXT}:MC-1` },
    ],
    targetedMisconceptions: [`${MULTIVAREXT}:MC-1`],
    source: eb(MULTIVAREXT, 'Detection probe (Blueprint Example 2) — D=0 is genuinely inconclusive, a complete absence of information, never a weak signal toward any particular classification'),
  },
  {
    conceptId: MULTIVAREXT, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'At a critical point, f_xx=6 (positive). Is this enough to classify the point as a local minimum?',
    choices: [
      { text: 'No — the full discriminant D=f_xx·f_yy-f_xy² must be computed; f_xy carries genuinely new information about how the function twists that f_xx alone cannot capture', isCorrect: true },
      { text: 'Yes — a positive f_xx alone is sufficient to conclude the point is a local minimum', isCorrect: false, misconceptionId: `${MULTIVAREXT}:MC-2` },
      { text: 'Yes, since f_xx plays the exact same diagnostic role in two variables as f\'\'(x) did in one variable, with no further information needed', isCorrect: false, misconceptionId: `${MULTIVAREXT}:MC-2` },
    ],
    targetedMisconceptions: [`${MULTIVAREXT}:MC-2`],
    source: eb(MULTIVAREXT, 'Detection probe — checking only f_xx (or f_yy) alone is never sufficient; the mixed partial f_xy carries genuinely new information the full discriminant requires'),
  },
  {
    conceptId: MULTIVAREXT, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'For g(x,y)=x²-y² at (0,0), the slice along y=0 gives g(x,0)=x² (looks like a minimum), and the slice along x=0 gives g(0,y)=-y² (looks like a maximum). What does this contradiction mean?',
    choices: [
      { text: 'The point is a SADDLE — the contradictory single-slice verdicts are exactly what a saddle produces; only the full discriminant test (here D=-4<0) correctly and unambiguously identifies it', isCorrect: true },
      { text: 'One of the two slices must contain a computational error, since a single critical point cannot give two different verdicts', isCorrect: false, misconceptionId: `${MULTIVAREXT}:MC-3` },
      { text: 'The point should be classified using whichever slice happens to be checked first', isCorrect: false, misconceptionId: `${MULTIVAREXT}:MC-3` },
    ],
    targetedMisconceptions: [`${MULTIVAREXT}:MC-3`],
    source: eb(MULTIVAREXT, 'Detection probe (Blueprint Example 3) — a single directional slice is never sufficient to classify a critical point; a saddle looks like a minimum from one direction and a maximum from another simultaneously'),
  },

  // --- math.calc.improper-integrals ---------------------------------------------------------
  {
    conceptId: IMPROPERINT, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Is ∫₀¹(1/√x)dx improper, given that both limits of integration (0 and 1) are perfectly finite numbers?',
    choices: [
      { text: 'Yes — the integrand 1/√x is unbounded as x→0⁺ (a singularity), which makes the integral improper regardless of the finite-looking bounds', isCorrect: true },
      { text: 'No — an integral is only improper if infinity literally appears as one of its limits of integration', isCorrect: false, misconceptionId: `${IMPROPERINT}:MC-1` },
      { text: 'No, since both endpoints of the interval are ordinary finite numbers', isCorrect: false, misconceptionId: `${IMPROPERINT}:MC-1` },
    ],
    targetedMisconceptions: [`${IMPROPERINT}:MC-1`],
    source: eb(IMPROPERINT, 'Detection probe (Blueprint A02) — impropriety is never limited to integrals with infinite limits; an integrand can be unbounded (a singularity) even with both limits of integration perfectly finite'),
  },
  {
    conceptId: IMPROPERINT, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Does ∫₁^∞(1/x)dx, being a well-formed setup following valid integration and limit rules, necessarily evaluate to some specific finite number?',
    choices: [
      { text: 'No — computing the defining limit gives lim_{t→∞}ln(t)=∞, so this integral DIVERGES and has no numeric value at all, despite the setup looking perfectly reasonable', isCorrect: true },
      { text: 'Yes — any improper integral set up correctly must evaluate to some specific number, since the underlying rules are all valid', isCorrect: false, misconceptionId: `${IMPROPERINT}:MC-2` },
      { text: 'Yes, since a reasonable-looking integral setup guarantees a finite answer', isCorrect: false, misconceptionId: `${IMPROPERINT}:MC-2` },
    ],
    targetedMisconceptions: [`${IMPROPERINT}:MC-2`],
    source: eb(IMPROPERINT, 'Detection probe (Blueprint A03) — an improper integral is never automatically assumed to converge; the defining limit must be computed, and divergence is a genuine, common outcome'),
  },
  {
    conceptId: IMPROPERINT, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Evaluating ∫₋₁¹(1/x²)dx, can you apply the antiderivative directly across the whole interval since both endpoints are finite?',
    choices: [
      { text: 'No — the integrand has a singularity at the INTERIOR point x=0; the integral must be split into two separate pieces, [-1,0) and (0,1], each treated as its own improper integral', isCorrect: true },
      { text: 'Yes — since both endpoints -1 and 1 are finite, a direct antiderivative evaluation across the whole interval is valid', isCorrect: false, misconceptionId: `${IMPROPERINT}:MC-3` },
      { text: 'Yes, since singularities only ever occur at the endpoints of an interval, never at interior points', isCorrect: false, misconceptionId: `${IMPROPERINT}:MC-3` },
    ],
    targetedMisconceptions: [`${IMPROPERINT}:MC-3`],
    source: eb(IMPROPERINT, 'Detection probe (Blueprint B03) — a singularity can occur at an interior point, never assumed to sit only at an endpoint; the entire interval must be scanned and split there if found'),
  },
]
