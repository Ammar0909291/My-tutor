/**
 * Batch: open-sets, uniform-continuity, convergence-sequences (math.real).
 *
 * Fresh Phase 0 frontier recompute after the continuity-rigorous/sup-inf/
 * archimedean batch found 6 ready concepts (convergence-sequences,
 * differentiability-rigorous, open-sets, riemann-integral,
 * uniform-continuity, uniform-convergence); this batch prioritizes
 * open-sets since it is the direct next step on the critical path toward
 * math.real.ivt (ivt requires connectedness, which itself requires
 * open-sets) — the concept math.num's 5 blocked concepts transitively
 * need. uniform-continuity and convergence-sequences are added since both
 * require only already-authored prerequisites (continuity-rigorous and
 * completeness/math.seq.sequence respectively). Transcribed from the
 * frozen Educational Brain entries at
 * educational-brain/concepts/mathematics/math.real.
 * {open-sets,uniform-continuity,convergence-sequences}.md.
 *
 * Grade band: all three adopt GradeBand.UNDERGRADUATE, continuing math.real's
 * established domain baseline.
 *
 *   OPEN-SETS  A set being open means every point has SOME ball fitting
 *           inside it — the radius may shrink per point, NEVER one uniform
 *           radius required for the whole set; open and closed are NEVER
 *           an exhaustive either/or dichotomy — a set can be NEITHER or
 *           BOTH; and the closure is NEVER just any closed superset — it
 *           is specifically the SMALLEST closed set containing the
 *           original set.
 *   UNIFORM-CONTINUITY  Uniform continuity is NEVER equivalent to ordinary
 *           pointwise continuity — the quantifier order genuinely differs,
 *           with a single delta required to work for every point at once;
 *           continuity at every individual point NEVER automatically
 *           implies uniform continuity on the whole domain — $1/x$ on
 *           $(0,1)$ is continuous everywhere yet fails uniform continuity;
 *           and the Heine-Cantor theorem NEVER contradicts such a
 *           counterexample — it simply does not apply, since the
 *           counterexample's domain is not compact.
 *   CONVERGENCE-SEQUENCES  Epsilon in a convergence proof is NEVER a single
 *           convenient number to spot-check — it must be treated as
 *           arbitrary, with a genuine proof supplying a FORMULA for N in
 *           terms of epsilon; convergent implies bounded is a TRUE
 *           one-directional theorem whose converse is NEVER also true —
 *           a bounded sequence can still fail to converge; and the
 *           Bolzano-Weierstrass theorem guarantees a convergent
 *           SUBSEQUENCE, NEVER convergence of the whole original sequence.
 *
 * Seeded as DRAFT. Promotion stays human.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedExplanation, SeedProbe } from './brainSeedAssets'

const S = 'mathematics'
const eb = (id: string, what: string) =>
  `educational-brain/concepts/mathematics/${id}.md — ${what}`

const OPEN_SETS = 'math.real.open-sets'
const UNIFORM_CONTINUITY = 'math.real.uniform-continuity'
const CONVERGENCE_SEQUENCES = 'math.real.convergence-sequences'

export const MATHEMATICS_REAL_OPEN_SETS_UNIFORM_CONTINUITY_CONVERGENCE_SEQUENCES_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: OPEN_SETS, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'OPEN MEANS EVERY POINT HAS SOME BALL FITTING ENTIRELY INSIDE — THE RADIUS CAN SHRINK PER '
      + 'POINT: for the interval (2,5) in R: at $x=4.9$, choosing radius 0.05 gives a ball '
      + 'entirely inside (2,5). In general, taking the radius as the distance to the nearer '
      + 'endpoint always works — the radius is allowed to SHRINK as $x$ approaches an endpoint, '
      + 'which is fine: the definition requires only SOME radius per point, never one uniform '
      + 'radius for the whole set.\n\n'
      + 'CLOSED MEANS THE COMPLEMENT IS OPEN, EQUIVALENTLY EVERY LIMIT POINT IS ALREADY INCLUDED: '
      + 'for the closed interval [0,1]: its complement is a union of two open rays, hence open, '
      + 'so [0,1] is closed. Equivalently: every limit point of [0,1] (points every ball around '
      + 'which intersects [0,1]) — including 0 and 1 themselves — is already IN [0,1]; no point '
      + 'outside like 1.5 has this property once its ball is small enough.\n\n'
      + 'OPEN AND CLOSED ARE NOT COMPLEMENTARY CATEGORIES — A SET CAN BE NEITHER OR BOTH: the '
      + 'half-open interval [0,1) is NEITHER: not open (every ball around $x=0$ contains negative '
      + 'numbers, so 0 is not interior), and not closed (1 is a limit point but is not in the '
      + 'set). Conversely, the empty set and the whole space are BOTH open and closed in ANY '
      + 'metric space, vacuously. The CLOSURE of a set is the SMALLEST closed set containing '
      + 'it — never just ANY closed superset: [0,2] is A closed superset of the open interval '
      + '(0,1), but the closure is specifically [0,1], since no smaller closed set still '
      + 'contains (0,1).',
    targetedMisconceptions: [`${OPEN_SETS}:MC-1`, `${OPEN_SETS}:MC-2`, `${OPEN_SETS}:MC-3`],
    source: eb(OPEN_SETS, 'Core Understanding — open meaning every point has some ball fitting inside with the radius allowed to shrink per point, open and closed never being an exhaustive either/or dichotomy since a set can be neither or both, and the closure never being just any closed superset since it is specifically the smallest one'),
  },
  {
    conceptId: UNIFORM_CONTINUITY, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'THE QUANTIFIER ORDER IS THE ENTIRE DIFFERENCE FROM POINTWISE CONTINUITY: pointwise '
      + 'continuity at a point allows delta to depend on BOTH which point is being checked and '
      + 'epsilon. Uniform continuity requires a SINGLE delta, depending on epsilon ALONE, that '
      + 'must work for EVERY point simultaneously. Uniform continuity is STRICTLY STRONGER: a '
      + 'uniformly continuous function is automatically continuous everywhere, but the converse '
      + 'can fail.\n\n'
      + '1/X ON (0,1) IS CONTINUOUS EVERYWHERE YET FAILS UNIFORM CONTINUITY: fixing '
      + '$\\varepsilon=1$ and taking $x_n=1/n$, $y_n=1/(n+1)$: the gap between $x_n$ and $y_n$ '
      + 'shrinks toward 0 (arbitrarily close together), yet the gap between $f(x_n)$ and '
      + '$f(y_n)$ stays EXACTLY 1 for every $n$ — no candidate delta can ever work, since some '
      + 'sufficiently large $n$ makes the inputs close together while the output gap stays fixed '
      + 'at 1. Every INDIVIDUAL point is perfectly continuous; the failure is that the required '
      + 'delta shrinks toward 0 as $x$ approaches 0 from the right, with no uniform bound '
      + 'possible across the whole interval.\n\n'
      + 'HEINE-CANTOR: COMPACTNESS UPGRADES CONTINUITY TO UNIFORM CONTINUITY FOR FREE, EXPLAINING '
      + '(NOT CONTRADICTING) THE COUNTEREXAMPLE: any function continuous on a COMPACT set is '
      + 'AUTOMATICALLY uniformly continuous there. The interval (0,1) is NOT compact (bounded '
      + 'but not closed, missing the limit point 0) — so the theorem\'s hypothesis simply does '
      + 'not apply there. On [0.1,1] (closed, bounded, hence compact, strictly avoiding 0), the '
      + 'SAME function $(1/x)$ IS automatically uniformly continuous by Heine-Cantor — the '
      + 'theorem\'s guarantee applies exactly where compactness genuinely holds, and fails to '
      + 'apply exactly where it does not.',
    targetedMisconceptions: [`${UNIFORM_CONTINUITY}:MC-1`, `${UNIFORM_CONTINUITY}:MC-2`, `${UNIFORM_CONTINUITY}:MC-3`],
    source: eb(UNIFORM_CONTINUITY, 'Core Understanding — the quantifier order being the entire difference from pointwise continuity, 1/x on (0,1) being continuous everywhere yet failing uniform continuity, and Heine-Cantor explaining rather than contradicting the counterexample since compactness genuinely fails on (0,1)'),
  },
  {
    conceptId: CONVERGENCE_SEQUENCES, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'EPSILON MUST BE TREATED AS ARBITRARY, NEVER AS A SINGLE CONVENIENT NUMBER: proving '
      + '$(1/n\\to0)$ requires, for an ARBITRARY $\\varepsilon>0$ (given, not chosen), producing '
      + 'SOME $N$ (depending on $\\varepsilon$) such that every term past $N$ is within '
      + '$\\varepsilon$ of 0. By the Archimedean property, some $N$ greater than '
      + '$1/\\varepsilon$ exists, so every $n>N$ satisfies $1/n<\\varepsilon$. A "proof" that '
      + 'only checks $\\varepsilon=0.01$ against some found $N$ has NOT engaged the definition — '
      + 'it must work no matter how small $\\varepsilon$ is handed over, which is why a FORMULA '
      + 'for $N$ in terms of $\\varepsilon$, not a numerical check, is what a genuine proof '
      + 'supplies.\n\n'
      + 'CONVERGENT IMPLIES BOUNDED IS A TRUE, ONE-DIRECTIONAL THEOREM; ITS CONVERSE IS FALSE: if '
      + 'a sequence converges to $L$, applying the definition with the specific choice '
      + '$\\varepsilon=1$ traps all terms past some $N$ within a fixed interval around $L$; the '
      + 'finitely many remaining terms are individually bounded, so the entire sequence is '
      + 'bounded. But the sequence $(-1)^n$ is BOUNDED (all terms in $\\{-1,1\\}$) yet NOT '
      + 'convergent: using $\\varepsilon=1$, no single limit can trap both recurring values -1 '
      + 'and 1 (distance 2 apart) past any $N$ — a direct contradiction proof. "Bounded implies '
      + 'convergent" is simply false; $(-1)^n$ is the standard counterexample.\n\n'
      + 'BOLZANO-WEIERSTRASS GUARANTEES A CONVERGENT SUBSEQUENCE, NEVER CONVERGENCE OF THE WHOLE '
      + 'SEQUENCE: applying the theorem to $(-1)^n$ (bounded, but divergent, per above) does NOT '
      + 'claim $(-1)^n$ itself converges — it claims SOME subsequence does. The even-indexed '
      + 'subsequence converges to 1; the odd-indexed subsequence converges to -1 — both converge '
      + '(to DIFFERENT limits), while the original sequence converges to neither, because it '
      + 'does not converge at all. The theorem\'s power is extracting SOME convergent thread from '
      + 'any bounded sequence, a strictly weaker claim than the whole sequence converging.',
    targetedMisconceptions: [`${CONVERGENCE_SEQUENCES}:MC-1`, `${CONVERGENCE_SEQUENCES}:MC-2`, `${CONVERGENCE_SEQUENCES}:MC-3`],
    source: eb(CONVERGENCE_SEQUENCES, 'Core Understanding — epsilon needing to be treated as arbitrary never a single convenient number, convergent implies bounded being a true one-directional theorem whose converse is false, and Bolzano-Weierstrass guaranteeing a convergent subsequence never convergence of the whole sequence'),
  },
]

export const MATHEMATICS_REAL_OPEN_SETS_UNIFORM_CONTINUITY_CONVERGENCE_SEQUENCES_PROBES: SeedProbe[] = [
  {
    conceptId: OPEN_SETS, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Is [0,1) open, closed, both, or neither?',
    choices: [
      { text: 'Neither — it is not open since every ball around x=0 contains negative numbers (0 is not interior), and not closed since 1 is a limit point not contained in the set', isCorrect: true },
      { text: 'It must be exactly one of open or closed, since every set falls into one of those two categories', isCorrect: false, misconceptionId: `${OPEN_SETS}:MC-1` },
      { text: "It is closed, since it contains its left endpoint 0", isCorrect: false, misconceptionId: `${OPEN_SETS}:MC-1` },
    ],
    targetedMisconceptions: [`${OPEN_SETS}:MC-1`],
    source: eb(OPEN_SETS, 'Discovery Question 1 as a detection probe (verbatim) — whether [0,1) is open, closed, both, or neither, an answer forcing it into exactly one category confirming OPEN-CLOSED-ASSUMED-EXHAUSTIVE-DICHOTOMY'),
  },
  {
    conceptId: OPEN_SETS, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Is any closed superset of a set S automatically "the closure" of S?',
    choices: [
      { text: 'No — [0,2] is a closed superset of the open interval (0,1), but the closure is specifically [0,1], the SMALLEST closed set containing (0,1); any closed superset qualifies only if no smaller one exists', isCorrect: true },
      { text: 'Yes — any closed set that contains S automatically qualifies as the closure of S', isCorrect: false, misconceptionId: `${OPEN_SETS}:MC-2` },
      { text: "Yes, since all closed supersets of a given set are always equal to each other", isCorrect: false, misconceptionId: `${OPEN_SETS}:MC-2` },
    ],
    targetedMisconceptions: [`${OPEN_SETS}:MC-2`],
    source: eb(OPEN_SETS, 'Discovery Question 2 as a detection probe (verbatim) — whether any closed superset qualifies as the closure, an answer of "yes" confirming CLOSURE-CONFUSED-WITH-ANY-CLOSED-SUPERSET'),
  },
  {
    conceptId: OPEN_SETS, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Must a point already belong to C to be a limit point of C?',
    choices: [
      { text: 'No — 1 is a limit point of [0,1) even though 1 is not in [0,1); a limit point is defined by every ball around it intersecting the set, entirely independent of whether the point itself is a member', isCorrect: true },
      { text: 'Yes — a point must already be an element of C in order to qualify as a limit point of C', isCorrect: false, misconceptionId: `${OPEN_SETS}:MC-3` },
      { text: "Yes, since 'limit point of C' by definition only applies to points already inside C", isCorrect: false, misconceptionId: `${OPEN_SETS}:MC-3` },
    ],
    targetedMisconceptions: [`${OPEN_SETS}:MC-3`],
    source: eb(OPEN_SETS, 'Discovery Question 3 as a detection probe (verbatim) — whether a limit point must belong to C, an answer of "yes" confirming LIMIT-POINT-REQUIRES-SET-MEMBERSHIP'),
  },
  {
    conceptId: UNIFORM_CONTINUITY, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: "Is uniform continuity's definition just a restatement of ordinary pointwise continuity?",
    choices: [
      { text: 'No — pointwise continuity allows delta to depend on both the point and epsilon, while uniform continuity requires a single delta depending on epsilon alone that works for every point simultaneously; the quantifier order changes the claim\'s strength dramatically', isCorrect: true },
      { text: 'Yes — uniform continuity and pointwise continuity are simply two names for the identical mathematical statement', isCorrect: false, misconceptionId: `${UNIFORM_CONTINUITY}:MC-1` },
      { text: "Yes, since both definitions involve the same epsilon-delta structure with no meaningful difference", isCorrect: false, misconceptionId: `${UNIFORM_CONTINUITY}:MC-1` },
    ],
    targetedMisconceptions: [`${UNIFORM_CONTINUITY}:MC-1`],
    source: eb(UNIFORM_CONTINUITY, 'Discovery Question 1 as a detection probe (verbatim) — whether uniform continuity is a restatement of pointwise continuity, an answer of "yes" confirming UNIFORM-CONTINUITY-ASSUMED-EQUIVALENT-TO-POINTWISE'),
  },
  {
    conceptId: UNIFORM_CONTINUITY, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'If a function is continuous at every single point of its domain, must it be uniformly continuous there too?',
    choices: [
      { text: 'No — 1/x is continuous at every point of (0,1), yet fails uniform continuity: sequences x_n=1/n and y_n=1/(n+1) get arbitrarily close together while their images stay a fixed distance 1 apart, so no single delta works for every point', isCorrect: true },
      { text: 'Yes — continuity at every individual point of a domain automatically guarantees uniform continuity on that whole domain', isCorrect: false, misconceptionId: `${UNIFORM_CONTINUITY}:MC-2` },
      { text: "Yes, since pointwise continuity everywhere composes automatically into a single uniform guarantee", isCorrect: false, misconceptionId: `${UNIFORM_CONTINUITY}:MC-2` },
    ],
    targetedMisconceptions: [`${UNIFORM_CONTINUITY}:MC-2`],
    source: eb(UNIFORM_CONTINUITY, 'Discovery Question 2 as a detection probe (verbatim) — whether pointwise continuity everywhere implies uniform continuity, an answer of "yes" confirming POINTWISE-CONTINUITY-ASSUMED-TO-IMPLY-UNIFORM'),
  },
  {
    conceptId: UNIFORM_CONTINUITY, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: "Does the Heine-Cantor theorem's guarantee of automatic uniform continuity on compact sets conflict with a function that fails to be uniformly continuous on a non-compact set?",
    choices: [
      { text: 'No conflict — (0,1) is not compact (missing the limit point 0), so Heine-Cantor\'s hypothesis simply does not apply there; on the compact [0.1,1], the same function 1/x IS automatically uniformly continuous by the theorem', isCorrect: true },
      { text: 'Yes, it is a genuine contradiction — the theorem and the non-compact counterexample cannot both be true at once', isCorrect: false, misconceptionId: `${UNIFORM_CONTINUITY}:MC-3` },
      { text: "Yes, since Heine-Cantor claims every continuous function is uniformly continuous on any domain, compact or not", isCorrect: false, misconceptionId: `${UNIFORM_CONTINUITY}:MC-3` },
    ],
    targetedMisconceptions: [`${UNIFORM_CONTINUITY}:MC-3`],
    source: eb(UNIFORM_CONTINUITY, 'Discovery Question 3 as a detection probe (verbatim) — whether Heine-Cantor conflicts with a non-compact counterexample, an answer of "yes, conflict" confirming HEINE-CANTOR-ASSUMED-TO-CONFLICT-WITH-COUNTEREXAMPLES'),
  },
  {
    conceptId: CONVERGENCE_SEQUENCES, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Does checking one specific ε (like 0.01) with a valid N constitute a complete convergence proof?',
    choices: [
      { text: 'No — a genuine proof must supply a FORMULA for N in terms of an ARBITRARY ε, working no matter how small ε is handed over; checking only one numerical ε has not engaged the definition', isCorrect: true },
      { text: 'Yes — finding a valid N that works for one specific, sufficiently small ε is sufficient to prove convergence', isCorrect: false, misconceptionId: `${CONVERGENCE_SEQUENCES}:MC-1` },
      { text: "Yes, since checking a small enough epsilon like 0.01 automatically covers all smaller epsilon values too", isCorrect: false, misconceptionId: `${CONVERGENCE_SEQUENCES}:MC-1` },
    ],
    targetedMisconceptions: [`${CONVERGENCE_SEQUENCES}:MC-1`],
    source: eb(CONVERGENCE_SEQUENCES, 'Discovery Question 1 as a detection probe (verbatim) — whether checking one specific epsilon constitutes a complete proof, an answer of "yes" confirming EPSILON-IS-A-SPECIFIC-NUMBER'),
  },
  {
    conceptId: CONVERGENCE_SEQUENCES, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Does every bounded sequence converge?',
    choices: [
      { text: 'No — (-1)^n is bounded (all terms in {-1,1}) but not convergent, since using ε=1, no single limit can trap both recurring values -1 and 1 past any N; convergent implies bounded, never the reverse', isCorrect: true },
      { text: 'Yes — every bounded sequence of real numbers is guaranteed to converge to some limit', isCorrect: false, misconceptionId: `${CONVERGENCE_SEQUENCES}:MC-2` },
      { text: "Yes, since boundedness is mathematically equivalent to convergence for real sequences", isCorrect: false, misconceptionId: `${CONVERGENCE_SEQUENCES}:MC-2` },
    ],
    targetedMisconceptions: [`${CONVERGENCE_SEQUENCES}:MC-2`],
    source: eb(CONVERGENCE_SEQUENCES, 'Discovery Question 2 as a detection probe (verbatim) — whether every bounded sequence converges, an answer of "yes" confirming BOUNDED-IMPLIES-CONVERGENT'),
  },
  {
    conceptId: CONVERGENCE_SEQUENCES, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Does Bolzano-Weierstrass mean every bounded sequence converges, or something more specific?',
    choices: [
      { text: 'Something more specific — it guarantees every bounded sequence has a convergent SUBSEQUENCE, never that the whole sequence converges; (-1)^n itself diverges, but its even-indexed and odd-indexed subsequences each converge, to different limits', isCorrect: true },
      { text: 'It means every bounded sequence converges — that is the theorem\'s exact statement', isCorrect: false, misconceptionId: `${CONVERGENCE_SEQUENCES}:MC-3` },
      { text: "It means a bounded sequence's subsequences and the sequence itself always converge to the same limit", isCorrect: false, misconceptionId: `${CONVERGENCE_SEQUENCES}:MC-3` },
    ],
    targetedMisconceptions: [`${CONVERGENCE_SEQUENCES}:MC-3`],
    source: eb(CONVERGENCE_SEQUENCES, 'Discovery Question 3 as a detection probe (verbatim) — whether Bolzano-Weierstrass means every bounded sequence converges, an answer of "yes, converges" confirming BOLZANO-WEIERSTRASS-MEANS-SEQUENCE-CONVERGES'),
  },
]
