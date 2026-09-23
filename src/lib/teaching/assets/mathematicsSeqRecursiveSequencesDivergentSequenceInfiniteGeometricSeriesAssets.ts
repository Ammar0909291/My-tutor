/**
 * Batch: recursive-sequences, divergent-sequence, infinite-geometric-series (math.seq).
 *
 * The FINAL batch of the math.seq domain excursion opened in Batch 86 to
 * unblock math.calc. All three remaining math.seq concepts were
 * simultaneously ready (leaf nodes, no further KG unlocks): math.seq.
 * recursive-sequences (requires sequence + math.found.proof-by-induction),
 * math.seq.divergent-sequence (requires convergent), and math.seq.
 * infinite-geometric-series (requires geometric-series). Authoring all
 * three CLOSES math.seq entirely at 21/21 — DOMAIN CERTIFIED.
 * Transcribed from the frozen Educational Brain entries at
 * educational-brain/concepts/mathematics/math.seq.{recursive-sequences,
 * divergent-sequence,infinite-geometric-series}.md.
 *
 *   RECURSIVE-SEQUENCES  recursive-sequences — a recursive definition and
 *                 an explicit formula are TWO EQUALLY VALID ways to specify
 *                 the SAME kind of object, never two different kinds;
 *                 computing a recursive term requires walking through
 *                 EVERY earlier term in order, no shortcut without more
 *                 machinery; proving a property by induction VERIFIES a
 *                 claim, it never hands you a closed-form formula.
 *   DIVERGENT-SEQUENCE  divergent-sequence — divergence is the PRECISE
 *                 logical negation of convergence, not a vague "blows up"
 *                 notion — oscillation counts as divergence too; boundedness
 *                 ALONE never guarantees convergence (monotonicity is also
 *                 required, per the Monotone Convergence Theorem);
 *                 alternating sign never determines convergence by itself —
 *                 check |aₙ|→0 first, the sign is irrelevant once that holds.
 *   INFINITE-GEOMETRIC-SERIES  infinite-geometric-series — the formula
 *                 a/(1−r) is a LIMIT that exists ONLY because rⁿ→0, and the
 *                 convergence condition |r|<1 must be checked BEFORE
 *                 applying it, never treated as an optional footnote; the
 *                 terms vanishing (lim rⁿ=0) and the series summing to a
 *                 nonzero value (lim Sₙ=a/(1−r)) are two DIFFERENT limits;
 *                 no single partial sum IS the infinite sum, only its LIMIT
 *                 is.
 *
 * Seeded as DRAFT. Promotion stays human.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedExplanation, SeedProbe } from './brainSeedAssets'

const S = 'mathematics'
const eb = (id: string, what: string) =>
  `educational-brain/concepts/mathematics/${id}.md — ${what}`

const RECURSIVE_SEQUENCES = 'math.seq.recursive-sequences'
const DIVERGENT_SEQUENCE = 'math.seq.divergent-sequence'
const INFINITE_GEOMETRIC_SERIES = 'math.seq.infinite-geometric-series'

export const MATHEMATICS_SEQ_RECURSIVE_SEQUENCES_DIVERGENT_SEQUENCE_INFINITE_GEOMETRIC_SERIES_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: RECURSIVE_SEQUENCES, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'An EXPLICIT (closed-form) definition gives a formula for the nth term directly in terms of '
      + 'n — plug in n, get the term, with no reference to any other term. A RECURSIVE definition '
      + 'instead gives each term in terms of one or more PREVIOUS terms, plus enough starting '
      + 'values (base cases). Both are legitimate specifications of the SAME kind of object — a '
      + 'sequence — not two different kinds of mathematical entity.\n\n'
      + "The defining feature of a recursive definition, and the source of its computational cost, "
      + 'is that finding a specific term requires passing through every earlier term the '
      + 'recursion depends on, IN ORDER. To find the 6th term of aₙ=aₙ₋₁+aₙ₋₂, one cannot "jump '
      + 'ahead" — a₆ genuinely depends on a₅, which depends on a₄, and so on back to the base '
      + 'cases. This is qualitatively different from an explicit formula, where a₁₀₀ can be '
      + 'computed with no reference to a₉₉ at all.\n\n'
      + "Because a recursive definition's structure — each case building directly on the case(s) "
      + 'before it — exactly mirrors the structure of an inductive proof, induction is the natural '
      + 'and standard tool for PROVING properties about a recursively-defined sequence. But proving '
      + 'a property BY induction is a DIFFERENT task from FINDING a closed-form formula: induction '
      + 'can verify that a proposed closed form is correct once one is already suspected, but the '
      + 'systematic technique for actually DERIVING a closed form from a recurrence is a separate, '
      + 'more advanced tool.',
    targetedMisconceptions: [`${RECURSIVE_SEQUENCES}:MC-1`, `${RECURSIVE_SEQUENCES}:MC-2`, `${RECURSIVE_SEQUENCES}:MC-3`],
    source: eb(RECURSIVE_SEQUENCES, 'Core Understanding — a recursive definition and an explicit formula are two equally valid specifications of the same object, computing a recursive term requires walking through every earlier term in order, and proving a property by induction is a different task from deriving a closed-form formula'),
  },
  {
    conceptId: DIVERGENT_SEQUENCE, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'Divergence is the exact logical NEGATION of convergence, not an intuitive notion of '
      + '"blowing up": {aₙ} DIVERGES iff for every candidate limit L, there exists some ε_L>0 such '
      + 'that infinitely many terms fail to stay within ε_L of L. In plain terms: no matter which '
      + 'real number is proposed as a limit, the sequence eventually strays too far from it, over '
      + 'and over.\n\n'
      + 'There are exactly THREE divergence types, and only one of them "blows up": diverging to '
      + '+∞ (e.g. aₙ=n), diverging to −∞ (e.g. aₙ=−n), and OSCILLATING — bounded, yet with no '
      + 'single limit (e.g. aₙ=(−1)ⁿ, which stays in {−1,+1} forever yet diverges). "Diverges" '
      + 'means "does not converge" — it does NOT mean "grows without bound."\n\n'
      + 'BOUNDEDNESS ALONE does not guarantee convergence: {(−1)ⁿ} is bounded (every term in '
      + '[−1,1]) and STILL diverges, because it never settles near any single value. The Monotone '
      + 'Convergence Theorem supplies the missing ingredient: if {aₙ} is monotone AND bounded, '
      + 'then it converges. Its contrapositive: if {aₙ} is monotone but unbounded, it diverges; if '
      + '{aₙ} is not monotone, the theorem is simply silent.\n\n'
      + 'ALTERNATING SIGN does not, by itself, determine convergence or divergence — the ABSOLUTE '
      + 'VALUE is decisive: {(−1)ⁿ/n} alternates sign forever, yet CONVERGES to 0, because '
      + '|aₙ|=1/n→0 forces the sequence into any ε-neighborhood of 0 for large n (a direct '
      + 'squeeze-theorem argument). Alternating sign is irrelevant once |aₙ|→0.',
    targetedMisconceptions: [`${DIVERGENT_SEQUENCE}:MC-1`, `${DIVERGENT_SEQUENCE}:MC-2`, `${DIVERGENT_SEQUENCE}:MC-3`],
    source: eb(DIVERGENT_SEQUENCE, 'Core Understanding — divergence as the precise logical negation of convergence with three divergence types (only one of which blows up), boundedness alone never guaranteeing convergence per the Monotone Convergence Theorem, and alternating sign being decided by the absolute value rather than the sign pattern'),
  },
  {
    conceptId: INFINITE_GEOMETRIC_SERIES, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'The finite sum formula Sₙ=a(1−rⁿ)/(1−r) asks what happens as n→∞ — as more and more terms '
      + 'are added forever. The answer hinges entirely on rⁿ: if |r|<1, then rⁿ→0 as n→∞, and '
      + 'substituting rⁿ→0 into the finite formula gives the infinite sum formula directly: '
      + 'S∞=a(1−0)/(1−r)=a/(1−r).\n\n'
      + 'This convergence condition, |r|<1, is NOT optional — it is the entire reason the formula '
      + 'works, and it must be checked BEFORE the formula is applied, never after. If |r|≥1, the '
      + 'series DIVERGES and has no finite sum: at r=1, Sₙ=na→∞; for r>1, the terms grow without '
      + 'bound; at r=−1, the partial sums oscillate forever between a and 0. Applying a/(1−r) '
      + 'blindly to such a case produces a number that is not the sum of anything — an algebraic '
      + 'expression evaluated outside the domain where it represents a genuine limit.\n\n'
      + 'Every recurring decimal is exactly an infinite geometric series in disguise — '
      + '0.333...=0.3+0.03+0.003+⋯ is geometric with a=0.3, r=0.1, so S∞=0.3/0.9=1/3, converting '
      + 'the recurring decimal to its exact fractional value. Physical situations involving an '
      + 'infinitely repeated process with a fixed shrinking ratio (a bouncing ball losing a fixed '
      + 'fraction of height each bounce) have their total computable the same way, precisely '
      + 'because the geometric structure is present in both the mathematical and physical '
      + 'situation.',
    targetedMisconceptions: [`${INFINITE_GEOMETRIC_SERIES}:MC-1`, `${INFINITE_GEOMETRIC_SERIES}:MC-2`, `${INFINITE_GEOMETRIC_SERIES}:MC-3`],
    source: eb(INFINITE_GEOMETRIC_SERIES, 'Core Understanding — the infinite sum formula a/(1-r) derived as the limit of the finite formula as r^n vanishes, requiring the convergence condition |r|<1 to be checked before application, and its use in converting recurring decimals to fractions and solving infinite-process finite-total problems'),
  },
]

export const MATHEMATICS_SEQ_RECURSIVE_SEQUENCES_DIVERGENT_SEQUENCE_INFINITE_GEOMETRIC_SERIES_PROBES: SeedProbe[] = [
  {
    conceptId: RECURSIVE_SEQUENCES, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'An arithmetic sequence can be defined explicitly (aₙ=a₁+(n−1)d) or recursively (aₙ=aₙ₋₁+d, a₁ given). Are these two genuinely different kinds of mathematical objects, or two specifications of the same one?',
    choices: [
      { text: 'Two specifications of the same object — computing the same terms from both definitions gives identical numbers; only the specification METHOD differs, not the kind of object being described', isCorrect: true },
      { text: 'Two genuinely different kinds of objects — a "recursive sequence" is a fundamentally distinct mathematical category from a sequence defined by an explicit formula', isCorrect: false, misconceptionId: `${RECURSIVE_SEQUENCES}:MC-1` },
      { text: 'Two different objects, since the self-referential recursive notation describes a conceptually novel structure not reducible to the explicit-formula case', isCorrect: false, misconceptionId: `${RECURSIVE_SEQUENCES}:MC-1` },
    ],
    targetedMisconceptions: [`${RECURSIVE_SEQUENCES}:MC-1`],
    source: eb(RECURSIVE_SEQUENCES, 'Demonstration 1 — computing an arithmetic sequence\'s terms both from its explicit formula and its recursive definition, directly breaking recursive-sequence-assumed-different-kind-of-object'),
  },
  {
    conceptId: RECURSIVE_SEQUENCES, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'For the Fibonacci sequence (F₁=F₂=1, Fₙ=Fₙ₋₁+Fₙ₋₂), can F₆ be computed directly without first finding F₃, F₄, and F₅?',
    choices: [
      { text: 'No — F₆ genuinely depends on F₅, which depends on F₄, and so on back to the base cases; there is no shortcut without additional machinery (a closed-form derivation), so every earlier term must be computed in order: F₆=8', isCorrect: true },
      { text: 'Yes — plugging n=6 into the recurrence relation directly yields F₆ without needing any of the earlier terms\' actual values', isCorrect: false, misconceptionId: `${RECURSIVE_SEQUENCES}:MC-2` },
      { text: 'Yes, since a recursive definition works exactly like an explicit formula once you know the index you want to compute', isCorrect: false, misconceptionId: `${RECURSIVE_SEQUENCES}:MC-2` },
    ],
    targetedMisconceptions: [`${RECURSIVE_SEQUENCES}:MC-2`],
    source: eb(RECURSIVE_SEQUENCES, 'Demonstration 2 — attempting to compute F6 with intermediate terms hidden then revealing F3, F4, F5 must be computed first, directly breaking recursive-terms-assumed-directly-computable'),
  },
  {
    conceptId: RECURSIVE_SEQUENCES, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Proving Fₙ≥n for n≥5 by induction succeeds. Does this proof give you the exact closed-form formula for Fₙ (like Binet\'s formula)?',
    choices: [
      { text: 'No — the induction proof VERIFIES a stated bound (Fₙ≥n), a genuinely different activity from DERIVING an exact closed-form formula; induction can confirm a proposed formula once one is suspected, but deriving one from scratch requires a separate, more advanced technique', isCorrect: true },
      { text: 'Yes — proving any property of a sequence by induction is equivalent to deriving its exact closed-form formula, since both are "proofs about the sequence"', isCorrect: false, misconceptionId: `${RECURSIVE_SEQUENCES}:MC-3` },
      { text: 'Yes, since an inductive proof automatically produces the precise numerical value of any term in the sequence as a byproduct', isCorrect: false, misconceptionId: `${RECURSIVE_SEQUENCES}:MC-3` },
    ],
    targetedMisconceptions: [`${RECURSIVE_SEQUENCES}:MC-3`],
    source: eb(RECURSIVE_SEQUENCES, 'Demonstration 3 — proving Fn>=n for n>=5 by induction then asking whether this tells you the exact value of F100, directly breaking induction-proof-assumed-to-give-closed-form'),
  },
  {
    conceptId: DIVERGENT_SEQUENCE, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'The sequence {(−1)ⁿ} is bounded (every term lies in [−1,1]). Does this mean it converges?',
    choices: [
      { text: 'No — boundedness ALONE does not guarantee convergence; {(−1)ⁿ} is bounded but NOT monotone, so the Monotone Convergence Theorem does not apply, and it genuinely has two cluster points (+1 from even indices, −1 from odd indices), which is exactly what prevents convergence', isCorrect: true },
      { text: 'Yes — any sequence whose terms all stay within a fixed finite range must converge to some value within that range', isCorrect: false, misconceptionId: `${DIVERGENT_SEQUENCE}:MC-1` },
      { text: 'Yes, since boundedness is the complete condition needed for the Monotone Convergence Theorem to guarantee convergence', isCorrect: false, misconceptionId: `${DIVERGENT_SEQUENCE}:MC-1` },
    ],
    targetedMisconceptions: [`${DIVERGENT_SEQUENCE}:MC-1`],
    source: eb(DIVERGENT_SEQUENCE, 'Demonstration 1 — showing (-1)^n\'s even-indexed and odd-indexed terms converge to two distinct cluster points, directly breaking bounded-sequence-converges'),
  },
  {
    conceptId: DIVERGENT_SEQUENCE, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'The sequence sin(nπ/2) cycles through 0,1,0,−1,... forever without ever growing large. Does "divergent" only apply to sequences that grow without bound, or does this oscillating sequence also count as divergent?',
    choices: [
      { text: 'This oscillating sequence also counts as divergent — "diverges" means "does NOT converge," full stop; a bounded sequence that never settles near a single value (like this one, with multiple cluster points) is just as divergent as one that blows up to infinity', isCorrect: true },
      { text: 'Only sequences with aₙ→±∞ are classified as divergent; an oscillating but bounded sequence like this one is neither convergent nor divergent', isCorrect: false, misconceptionId: `${DIVERGENT_SEQUENCE}:MC-2` },
      { text: 'This sequence is convergent, since its values never grow without bound the way a genuinely divergent sequence\'s values would', isCorrect: false, misconceptionId: `${DIVERGENT_SEQUENCE}:MC-2` },
    ],
    targetedMisconceptions: [`${DIVERGENT_SEQUENCE}:MC-2`],
    source: eb(DIVERGENT_SEQUENCE, 'Demonstration 2 — classifying a_n=n, a_n=(-1)^n*n, and a_n=sin(n*pi/2) side by side as equally divergent, directly breaking diverges-only-to-infinity'),
  },
  {
    conceptId: DIVERGENT_SEQUENCE, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'The sequence {(−1)ⁿ/n} alternates sign forever. Does this alternating sign pattern, by itself, mean the sequence diverges?',
    choices: [
      { text: 'No — the sign alone does not decide convergence; |aₙ|=1/n→0, so by the squeeze theorem (−1/n≤(−1)ⁿ/n≤1/n, both bounds →0), the sequence CONVERGES to 0 regardless of the alternating appearance', isCorrect: true },
      { text: 'Yes — any sequence whose terms visibly flip sign at every step is diverging, since a genuinely convergent sequence must eventually settle on one consistent sign', isCorrect: false, misconceptionId: `${DIVERGENT_SEQUENCE}:MC-3` },
      { text: 'Yes, since the flip-flopping pattern itself is sufficient evidence of instability, overriding any computation of the terms\' absolute values', isCorrect: false, misconceptionId: `${DIVERGENT_SEQUENCE}:MC-3` },
    ],
    targetedMisconceptions: [`${DIVERGENT_SEQUENCE}:MC-3`],
    source: eb(DIVERGENT_SEQUENCE, 'Demonstration 3 — applying the squeeze theorem to (-1)^n/n proving convergence to 0 despite the alternating sign, directly breaking alternating-sign-implies-divergence'),
  },
  {
    conceptId: INFINITE_GEOMETRIC_SERIES, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'For ∑3ⁿ (a=1, r=3), plugging into a/(1−r) gives 1/(1−3)=−1/2. Is this the actual sum of the series?',
    choices: [
      { text: 'No — |r|=3≥1, so the convergence condition fails and the series DIVERGES entirely; the formula\'s output outside its validity condition is meaningless, contradicted directly by the series\' own partial sums, which grow without bound (never negative)', isCorrect: true },
      { text: 'Yes — the formula a/(1−r) always produces the correct sum for any geometric series, regardless of the value of r', isCorrect: false, misconceptionId: `${INFINITE_GEOMETRIC_SERIES}:MC-1` },
      { text: 'Yes, since a negative result just means the series converges to a small residual value close to zero', isCorrect: false, misconceptionId: `${INFINITE_GEOMETRIC_SERIES}:MC-1` },
    ],
    targetedMisconceptions: [`${INFINITE_GEOMETRIC_SERIES}:MC-1`],
    source: eb(INFINITE_GEOMETRIC_SERIES, 'Demonstration 1 — attempting the formula on a divergent series (r=3) and cross-checking against genuinely growing partial sums, directly breaking formula-without-convergence-check'),
  },
  {
    conceptId: INFINITE_GEOMETRIC_SERIES, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'For a convergent geometric series with r=0.5, lim(n→∞) rⁿ=0. Does this mean the SERIES itself sums to 0?',
    choices: [
      { text: 'No — these are two DIFFERENT limits: lim rⁿ=0 says the individual TERMS vanish, while lim Sₙ=a/(1−r) (a nonzero value) says the accumulated TOTAL settles at a finite nonzero number; both are true simultaneously, and neither determines the other\'s numerical value', isCorrect: true },
      { text: 'Yes — since the ratio rⁿ approaches zero, the entire series must also sum to zero, as both statements describe the identical convergence fact', isCorrect: false, misconceptionId: `${INFINITE_GEOMETRIC_SERIES}:MC-2` },
      { text: 'Yes, because "the terms converge to zero" and "the series converges to zero" are simply two equivalent phrasings of the same mathematical claim', isCorrect: false, misconceptionId: `${INFINITE_GEOMETRIC_SERIES}:MC-2` },
    ],
    targetedMisconceptions: [`${INFINITE_GEOMETRIC_SERIES}:MC-2`],
    source: eb(INFINITE_GEOMETRIC_SERIES, 'Demonstration 2 — computing lim r^n=0 and lim Sn=a/(1-r) side by side for a specific convergent series, directly breaking term-limit-as-series-sum'),
  },
  {
    conceptId: INFINITE_GEOMETRIC_SERIES, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Computing S₁₀ for a convergent geometric series gives a value close to, but not exactly equal to, a/(1−r). Is S₁₀ "the" infinite sum?',
    choices: [
      { text: 'No — no single finite partial sum, however large its index, ever exactly EQUALS the infinite sum; only the LIMIT of Sₙ as n→∞ qualifies as the infinite sum, and successive partial sums (S₅, S₁₀, S₂₀) get closer and closer without ever reaching it exactly', isCorrect: true },
      { text: 'Yes — computing a sufficiently large partial sum like S₁₀ and reporting that value is exactly what "finding the infinite sum" means', isCorrect: false, misconceptionId: `${INFINITE_GEOMETRIC_SERIES}:MC-3` },
      { text: 'Yes, since once a partial sum is close enough to the formula\'s predicted value, it can be treated as being exactly equal to the infinite sum', isCorrect: false, misconceptionId: `${INFINITE_GEOMETRIC_SERIES}:MC-3` },
    ],
    targetedMisconceptions: [`${INFINITE_GEOMETRIC_SERIES}:MC-3`],
    source: eb(INFINITE_GEOMETRIC_SERIES, 'Demonstration 3 — computing S5, S10, S20 approaching but never reaching the formula\'s value, directly breaking partial-sum-is-infinite-sum'),
  },
]
