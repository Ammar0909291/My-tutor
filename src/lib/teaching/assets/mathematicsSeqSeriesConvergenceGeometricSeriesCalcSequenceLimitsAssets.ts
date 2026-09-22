/**
 * Batch: series-convergence, geometric-series (math.seq), sequence-limits (math.calc).
 *
 * math.seq.series-convergence is the highest-unlock-value concept found so
 * far in this domain-excursion (10 downstream concepts: divergence-test,
 * comparison-test, ratio-test, root-test, integral-test, alternating-series,
 * harmonic-series, math.calc.power-series, math.de.fourier-convergence,
 * math.real.uniform-convergence). math.seq.geometric-series (requires
 * geometric-sequence + series, both authored) unlocks infinite-geometric-
 * series. math.calc.sequence-limits (requires math.calc.limits + math.seq.
 * sequence, both already authored) is the ORIGINAL math.calc frontier
 * concept this whole math.seq excursion was opened to reach — its authoring
 * returns this campaign's attention to math.calc for the first time since
 * Batch 85, and its own KG `unlocks` field is math.seq.series-convergence
 * itself (also authored this batch), so both concepts unblock each other's
 * neighborhood simultaneously.
 * Transcribed from the frozen Educational Brain entries at
 * educational-brain/concepts/mathematics/{math.seq.series-convergence,
 * math.seq.geometric-series,math.calc.sequence-limits}.md.
 *
 *   SERIES-CONVERGENCE  series-convergence — a series converges exactly when
 *                 its partial-sum sequence converges (no new definition
 *                 needed); the Divergence Test is a ONE-WAY tool (can prove
 *                 divergence, never convergence); terms shrinking to zero is
 *                 NECESSARY but never SUFFICIENT for convergence (harmonic
 *                 series is the standing counterexample).
 *   GEOMETRIC-SERIES  geometric-series — the finite sum formula falls out of
 *                 the shift-multiply-subtract trick; r=1 breaks the FORMULA
 *                 (division by zero), never the sum itself (trivially na);
 *                 the infinite sum a/(1-r) is valid ONLY when |r|<1,
 *                 regardless of r's sign — an unchecked validity condition
 *                 produces a meaningless number, not a wrong-but-close one.
 *   SEQUENCE-LIMITS  sequence-limits — an indeterminate shape (∞/∞) is a
 *                 DIAGNOSIS, never itself an answer; l'Hopital's rule
 *                 differentiates numerator and denominator SEPARATELY, never
 *                 via the quotient rule; the squeeze theorem requires BOTH
 *                 bounds to converge to the SAME limit, not merely to bound
 *                 the sequence.
 *
 * Seeded as DRAFT. Promotion stays human.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedExplanation, SeedProbe } from './brainSeedAssets'

const S = 'mathematics'
const eb = (id: string, what: string) =>
  `educational-brain/concepts/mathematics/${id}.md — ${what}`

const SERIES_CONVERGENCE = 'math.seq.series-convergence'
const GEOMETRIC_SERIES = 'math.seq.geometric-series'
const SEQUENCE_LIMITS = 'math.calc.sequence-limits'

export const MATHEMATICS_SEQ_SERIES_CONVERGENCE_GEOMETRIC_SERIES_CALC_SEQUENCE_LIMITS_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: SERIES_CONVERGENCE, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'A series ∑aₙ converges precisely when its own sequence of partial sums {Sₙ} converges: '
      + '∑aₙ=lim(n→∞) Sₙ. If {Sₙ} diverges, the series diverges. This reduces "does this infinite '
      + 'sum make sense?" entirely to the already-mastered question "does this sequence converge?" — '
      + 'no new machinery is needed, only a new object (partial sums) to apply it to.\n\n'
      + 'The GEOMETRIC SERIES ∑arⁿ has partial sum Sₙ=a(1−rⁿ⁺¹)/(1−r) (via multiply-and-subtract). '
      + 'When |r|<1, rⁿ⁺¹→0, so the limit exists and ∑arⁿ=a/(1−r). When |r|≥1, the partial sums do '
      + 'not settle down, and the series diverges. Crucially, r may be NEGATIVE and the series still '
      + 'converges, provided |r|<1 — an alternating geometric series like ∑(−1/3)ⁿ converges exactly '
      + 'as readily as a positive-ratio one.\n\n'
      + 'The DIVERGENCE TEST follows from: if ∑aₙ converges to L, then both Sₙ→L and Sₙ₋₁→L, so '
      + 'aₙ=Sₙ−Sₙ₋₁→L−L=0. Used in its contrapositive — if aₙ↛0, then ∑aₙ diverges — this is a fast '
      + 'DIVERGENCE detector. But it is NOT a convergence detector: if aₙ→0, the test gives NO '
      + 'information about convergence, because "terms shrinking to zero" is necessary but not '
      + 'sufficient. The canonical counterexample is the HARMONIC SERIES ∑1/n: its terms shrink to '
      + 'zero, yet its partial sums grow without bound (via the grouping argument S₂ᵏ>1+k/2→∞) — the '
      + 'series diverges despite 1/n→0.',
    targetedMisconceptions: [`${SERIES_CONVERGENCE}:MC-1`, `${SERIES_CONVERGENCE}:MC-2`, `${SERIES_CONVERGENCE}:MC-3`],
    source: eb(SERIES_CONVERGENCE, 'Core Understanding — a series converges exactly when its partial-sum sequence converges, the geometric series converges for |r|<1 regardless of sign, and the Divergence Test is a one-directional tool since terms shrinking to zero is necessary but not sufficient (the harmonic series diverges despite 1/n to 0)'),
  },
  {
    conceptId: GEOMETRIC_SERIES, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'The finite geometric sum formula falls out of one algebraic move: write Sₙ=a+ar+ar²+⋯+arⁿ⁻¹, '
      + 'then rSₙ=ar+ar²+⋯+arⁿ⁻¹+arⁿ — every term shifted one slot. Subtracting, every MIDDLE term '
      + 'cancels, leaving only the two ends: Sₙ−rSₙ=a−arⁿ. Factoring and dividing by (1−r) gives '
      + 'Sₙ=a(1−rⁿ)/(1−r) — the visible residue of this telescoping cancellation, not a fact to '
      + 'memorize.\n\n'
      + 'The r=1 case is a genuine exception, visible directly in the derivation: dividing by (1−r) '
      + 'is only legal when r≠1; at r=1 the last step divides by zero, so the formula is INVALID '
      + 'there. But r=1 needs no formula at all: every term equals a, so Sₙ=na directly. A geometric '
      + 'series has TWO sum rules — the general formula for r≠1, and na for r=1 — plugging r=1 into '
      + 'the general formula is a division-by-zero error, never a shortcut.\n\n'
      + 'Negative ratios require careful sign arithmetic but change nothing about validity: for '
      + 'a=8,r=−½,n=4, the formula gives S₄=5, matching the direct check 8−4+2−1=5.\n\n'
      + 'The INFINITE sum is the LIMIT of the finite sums, and exists precisely when |r|<1: in '
      + 'Sₙ=a(1−rⁿ)/(1−r), the only n-dependent piece is rⁿ. When |r|<1, rⁿ→0 regardless of sign, so '
      + 'Sₙ→a/(1−r). When |r|≥1, rⁿ does NOT tend to zero, so the series DIVERGES. Plugging |r|≥1 '
      + 'into a/(1−r) still produces a number, but that number is MEANINGLESS: for a=6,r=3/2, the '
      + 'formula gives 6/(1−3/2)=−12, an absurd "sum" for a series of strictly positive, growing '
      + 'terms — the validity condition |r|<1 is part of the formula, not an optional footnote.',
    targetedMisconceptions: [`${GEOMETRIC_SERIES}:MC-1`, `${GEOMETRIC_SERIES}:MC-2`, `${GEOMETRIC_SERIES}:MC-3`],
    source: eb(GEOMETRIC_SERIES, 'Core Understanding — the finite sum formula falls out of the shift-multiply-subtract trick, r=1 breaks the formula (division by zero) never the sum itself, and the infinite sum a/(1-r) is valid only when |r|<1 regardless of sign, an unchecked validity condition producing a meaningless number'),
  },
  {
    conceptId: SEQUENCE_LIMITS, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'A sequence limit asks the same question math.calc.limits already answers for continuous '
      + 'functions, restricted to integer-indexed input, via three techniques:\n\n'
      + '1. INDETERMINATE-FORM RESOLUTION: a ratio like (2n²+3n)/(5n²−1) is ∞/∞ before evaluation — '
      + 'and ∞/∞ is not a number, so it cannot be the answer. Dividing every term by the highest '
      + 'power of n in the denominator turns the expression into a ratio of terms that individually '
      + 'converge, and THEN the limit laws apply term by term. The shape ∞/∞ is a description of the '
      + 'problem, never a solution to it.\n\n'
      + "2. L'HÔPITAL'S RULE VIA CONTINUOUS EXTENSION: a sequence aₙ=f(n) is defined only on the "
      + 'integers, but if f(x) (the same formula, x real) is differentiable and lim(x→∞) f(x) '
      + 'exists, that limit equals lim(n→∞) f(n). This licenses differentiating numerator and '
      + 'denominator SEPARATELY (never applying the quotient rule to the whole fraction) and '
      + 're-evaluating the new ratio.\n\n'
      + '3. THE SQUEEZE THEOREM: when aₙ is trapped between bₙ≤aₙ≤cₙ, and BOTH bounding sequences '
      + 'converge to the SAME limit L, then aₙ→L too. A bound alone proves nothing: −1≤sin n≤1 '
      + "bounds sin n but the two bounds don't converge to a common value (they're constants) — the "
      + 'theorem does not fire until the whole expression is scaled, e.g. −1/n≤(sin n)/n≤1/n, where '
      + 'both sides now converge to 0.\n\n'
      + 'The organizing idea across all three: an indeterminate shape is a DIAGNOSIS, never a '
      + 'RESULT — it tells you which tool to reach for, and the tool does the actual work.',
    targetedMisconceptions: [`${SEQUENCE_LIMITS}:MC-1`, `${SEQUENCE_LIMITS}:MC-2`, `${SEQUENCE_LIMITS}:MC-3`],
    source: eb(SEQUENCE_LIMITS, 'Core Understanding — the three sequence-limit techniques (algebraic indeterminate-form resolution, l\'Hopital\'s rule via continuous extension, and the squeeze theorem), organized around an indeterminate shape being a diagnosis rather than a result'),
  },
]

export const MATHEMATICS_SEQ_SERIES_CONVERGENCE_GEOMETRIC_SERIES_CALC_SEQUENCE_LIMITS_PROBES: SeedProbe[] = [
  {
    conceptId: SERIES_CONVERGENCE, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'The harmonic series ∑1/n has terms shrinking to zero (1/n→0). Does that mean the series converges?',
    choices: [
      { text: 'No — the harmonic series actually DIVERGES, despite 1/n→0; the grouping argument S₂ᵏ>1+k/2→∞ proves its partial sums grow without bound, showing terms shrinking to zero is necessary but never sufficient for convergence', isCorrect: true },
      { text: 'Yes — if the terms being added shrink to zero, the running total must eventually settle down to a finite value', isCorrect: false, misconceptionId: `${SERIES_CONVERGENCE}:MC-1` },
      { text: 'Yes, since any series whose terms approach zero is automatically a convergent series by definition', isCorrect: false, misconceptionId: `${SERIES_CONVERGENCE}:MC-1` },
    ],
    targetedMisconceptions: [`${SERIES_CONVERGENCE}:MC-1`],
    source: eb(SERIES_CONVERGENCE, 'Demonstration 1 — the harmonic series grouping argument, directly breaking terms-to-zero-implies-convergent'),
  },
  {
    conceptId: SERIES_CONVERGENCE, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'For ∑(1/2)ⁿ, the partial sum S₅≈0.97. Is 0.97 the "sum" of this series?',
    choices: [
      { text: 'No — S₅ is just one partial sum, an approximation; the true sum is lim(n→∞) Sₙ=1, and no single partial sum, however large n is, ever equals the infinite sum exactly', isCorrect: true },
      { text: 'Yes — computing enough terms and reporting that running total is exactly what "the sum of a series" means', isCorrect: false, misconceptionId: `${SERIES_CONVERGENCE}:MC-2` },
      { text: 'Yes, since S₅ is already extremely close to the answer, so reporting it as the sum is essentially correct', isCorrect: false, misconceptionId: `${SERIES_CONVERGENCE}:MC-2` },
    ],
    targetedMisconceptions: [`${SERIES_CONVERGENCE}:MC-2`],
    source: eb(SERIES_CONVERGENCE, 'Demonstration 2 — computing S5, S10, S20 for a convergent geometric series approaching but never equaling the formula\'s predicted sum, directly breaking partial-sum-as-total-sum'),
  },
  {
    conceptId: SERIES_CONVERGENCE, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Does the geometric series ∑(−1/3)ⁿ converge, given that its common ratio r=−1/3 is negative?',
    choices: [
      { text: 'Yes — it converges, since the ONLY condition for geometric-series convergence is |r|<1, and |−1/3|=1/3<1; the sign of r affects only whether the partial sums oscillate on the way to the limit, never whether convergence occurs', isCorrect: true },
      { text: 'No — a negative common ratio always prevents a geometric series from converging, regardless of its magnitude', isCorrect: false, misconceptionId: `${SERIES_CONVERGENCE}:MC-3` },
      { text: 'It cannot be determined without more information, since negative ratios require a fundamentally different convergence test', isCorrect: false, misconceptionId: `${SERIES_CONVERGENCE}:MC-3` },
    ],
    targetedMisconceptions: [`${SERIES_CONVERGENCE}:MC-3`],
    source: eb(SERIES_CONVERGENCE, 'Demonstration 3 — plotting the partial sums of an alternating geometric series oscillating and converging, directly breaking geometric-ratio-must-be-positive'),
  },
  {
    conceptId: GEOMETRIC_SERIES, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'For a geometric series with a=7 and r=1 (7+7+7+⋯, n terms), what is the sum: apply the general formula Sₙ=a(1−rⁿ)/(1−r), or something else?',
    choices: [
      { text: 'Something else — the general formula divides by (1−r), which is division by zero at r=1, so the formula is INVALID there; the correct sum is simply Sₙ=na=7n, since every term equals 7', isCorrect: true },
      { text: 'Apply the general formula directly: Sₙ=7(1−1ⁿ)/(1−1)=7(0)/0, which correctly evaluates to the sum', isCorrect: false, misconceptionId: `${GEOMETRIC_SERIES}:MC-1` },
      { text: 'The sum is undefined whenever r=1, since the formula produces 0/0 and no other computation is possible', isCorrect: false, misconceptionId: `${GEOMETRIC_SERIES}:MC-1` },
    ],
    targetedMisconceptions: [`${GEOMETRIC_SERIES}:MC-1`],
    source: eb(GEOMETRIC_SERIES, 'Demonstration 1 — the shift-multiply-subtract derivation with the r=1 exception, directly breaking sum-formula-assumed-valid-at-r-equals-one'),
  },
  {
    conceptId: GEOMETRIC_SERIES, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'For a=6, r=3/2, plugging into the infinite-sum formula a/(1−r) gives 6/(1−1.5)=−12. Every term of this series is positive and growing. Is −12 really the sum?',
    choices: [
      { text: 'No — the formula a/(1−r) is only VALID when |r|<1; here |1.5|>1, so the series actually diverges (partial sums grow without bound, 6,15,28.5,...), and the formula\'s output of −12 outside its validity condition is meaningless and must be discarded', isCorrect: true },
      { text: 'Yes — the formula always gives the correct sum for any ratio r, as long as you plug in the right values for a and r', isCorrect: false, misconceptionId: `${GEOMETRIC_SERIES}:MC-2` },
      { text: 'Yes, since a negative result for a series of positive terms just means the series converges to a very small residual value', isCorrect: false, misconceptionId: `${GEOMETRIC_SERIES}:MC-2` },
    ],
    targetedMisconceptions: [`${GEOMETRIC_SERIES}:MC-2`],
    source: eb(GEOMETRIC_SERIES, 'Demonstration 3 — the |r|>=1 conflict demonstration contrasting the formula\'s meaningless output against the series\' actual growing partial sums, directly breaking infinite-sum-formula-applied-without-validity-check'),
  },
  {
    conceptId: GEOMETRIC_SERIES, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'For a=6, r=−1/2, does the infinite geometric series converge, given that r is negative?',
    choices: [
      { text: 'Yes — it converges to a/(1−r)=6/(1−(−0.5))=4, since |−0.5|=0.5<1; the sign of r affects only the PATH the partial sums take (a two-sided squeeze toward 4 rather than a one-sided climb), never whether convergence occurs', isCorrect: true },
      { text: 'No — a negative ratio means the series cannot converge or use the standard sum formulas at all', isCorrect: false, misconceptionId: `${GEOMETRIC_SERIES}:MC-3` },
      { text: 'It alternates forever without ever settling toward any particular value, since the terms keep flipping sign', isCorrect: false, misconceptionId: `${GEOMETRIC_SERIES}:MC-3` },
    ],
    targetedMisconceptions: [`${GEOMETRIC_SERIES}:MC-3`],
    source: eb(GEOMETRIC_SERIES, 'Demonstration 3 — the two-sided squeeze of partial sums for a=6,r=-1/2 converging to 4, directly breaking negative-ratio-assumed-to-block-convergence'),
  },
  {
    conceptId: SEQUENCE_LIMITS, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'For lim(n→∞) (2n²+3n)/(5n²−1), is stating "the limit is ∞/∞" a complete answer?',
    choices: [
      { text: 'No — ∞/∞ is a diagnosis, not an answer; dividing every term by n² gives (2+3/n)/(5−1/n²)→2/5, a different value than a similarly-shaped ratio like n²/(5n²−1)→1/5, proving the shape alone carries no information about the value', isCorrect: true },
      { text: 'Yes — once a limit is recognized as having the shape ∞/∞, that shape itself is the final answer to report', isCorrect: false, misconceptionId: `${SEQUENCE_LIMITS}:MC-1` },
      { text: 'Yes, since ∞/∞ always simplifies to exactly 1, regardless of the specific polynomial coefficients involved', isCorrect: false, misconceptionId: `${SEQUENCE_LIMITS}:MC-1` },
    ],
    targetedMisconceptions: [`${SEQUENCE_LIMITS}:MC-1`],
    source: eb(SEQUENCE_LIMITS, 'Demonstration 1 — the indeterminate-form derivation contrasting two different infinity-over-infinity ratios converging to different values, directly breaking indeterminate-form-as-direct-answer'),
  },
  {
    conceptId: SEQUENCE_LIMITS, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: "To find lim(n→∞) (ln n)/n via l'Hôpital's rule, should you apply the quotient rule to the whole fraction, or differentiate the numerator and denominator separately?",
    choices: [
      { text: "Differentiate separately — l'Hôpital's rule forms a NEW ratio from the separate derivatives, (1/n)/1→0; applying the quotient rule instead gives an unrelated expression (1−ln x)/x² that does not even resolve the original indeterminate form", isCorrect: true },
      { text: "Apply the quotient rule to the whole fraction first, exactly as you would for any ordinary derivative of a quotient, then take that result's limit", isCorrect: false, misconceptionId: `${SEQUENCE_LIMITS}:MC-2` },
      { text: "Either approach works equally well, since the quotient rule and l'Hôpital's rule are two different names for the identical operation", isCorrect: false, misconceptionId: `${SEQUENCE_LIMITS}:MC-2` },
    ],
    targetedMisconceptions: [`${SEQUENCE_LIMITS}:MC-2`],
    source: eb(SEQUENCE_LIMITS, "Demonstration 2 — the contrast pair between the wrong quotient-rule attempt and the correct separate-differentiation attempt, directly breaking l'Hopital-conflated-with-quotient-rule"),
  },
  {
    conceptId: SEQUENCE_LIMITS, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Does citing −1≤sin n≤1 by itself justify that lim(n→∞) (sin n)/n = 0 via the squeeze theorem?',
    choices: [
      { text: 'No — the bound −1≤sin n≤1 is true but useless as stated, since both bounds are constants that never converge to anything and do not even apply to (sin n)/n directly; scaling by 1/n gives −1/n≤(sin n)/n≤1/n, where BOTH bounds now converge to 0, which is what actually justifies the squeeze', isCorrect: true },
      { text: 'Yes — any true bounding inequality is sufficient for the squeeze theorem to conclude a limit, regardless of what the bounds themselves converge to', isCorrect: false, misconceptionId: `${SEQUENCE_LIMITS}:MC-3` },
      { text: 'Yes, since sin n is always trapped between −1 and 1 no matter what, and that alone is the complete squeeze-theorem argument', isCorrect: false, misconceptionId: `${SEQUENCE_LIMITS}:MC-3` },
    ],
    targetedMisconceptions: [`${SEQUENCE_LIMITS}:MC-3`],
    source: eb(SEQUENCE_LIMITS, 'Demonstration 3 — the squeeze theorem scaled-bound derivation from the useless constant bound to the working scaled bound, directly breaking squeeze-bound-without-common-limit'),
  },
]
