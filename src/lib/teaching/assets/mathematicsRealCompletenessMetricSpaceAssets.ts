/**
 * Batch: completeness, metric-space (math.real) — OPENS THE DOMAIN.
 *
 * math.num is now blocked at 11/16: its 5 remaining concepts all
 * transitively require math.real.ivt or math.de.euler-method, neither of
 * which is reachable yet (math.real.ivt itself needs math.real.connectedness
 * and math.real.continuity-rigorous, several steps into the domain).
 * Rather than leave the campaign idle on a blocked domain (the same
 * situation math.prob's final 2 concepts were left in earlier), this batch
 * opens math.real — the next domain per a fresh Phase 0 frontier
 * computation across all mathematics domains, found with 2/30 concepts
 * immediately ready (completeness, metric-space, both requiring only
 * already-certified math.found.* prerequisites). Progressing math.real
 * will eventually reach math.real.ivt and unblock math.num's remaining 5
 * concepts as a side effect. Transcribed from the frozen Educational Brain
 * entries at educational-brain/concepts/mathematics/math.real.
 * {completeness,metric-space}.md.
 *
 * Grade band: both adopt GradeBand.UNDERGRADUATE — real analysis
 * (completeness axiom, metric spaces) is inherently undergraduate-level
 * material, establishing math.real's domain baseline from its first
 * concepts, consistent with math.num's and math.opt's own precedents.
 *
 *   COMPLETENESS  The supremum of a set need NEVER be attained by an
 *           element of that set — completeness guarantees it exists as a
 *           real number, never that it belongs to the set; completeness is
 *           NEVER a property shared by the rationals — a bounded-above
 *           subset of Q can genuinely lack a rational least upper bound;
 *           and a bounded sequence need NEVER converge — only a Cauchy
 *           sequence (terms bunching against EACH OTHER, not merely
 *           against a fixed bound) is guaranteed to converge in R.
 *   METRIC-SPACE  A metric is NEVER restricted to the Euclidean distance
 *           formula — any function satisfying the three axioms qualifies,
 *           verified across Euclidean, taxicab, max, and discrete metrics;
 *           non-negativity is NEVER a fourth independent axiom — it is a
 *           THEOREM derivable from the three stated axioms; and the
 *           triangle inequality NEVER bounds the detour by the direct
 *           distance — it is always the reverse, direct distance bounded
 *           above by the detour.
 *
 * Seeded as DRAFT. Promotion stays human.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedExplanation, SeedProbe } from './brainSeedAssets'

const S = 'mathematics'
const eb = (id: string, what: string) =>
  `educational-brain/concepts/mathematics/${id}.md — ${what}`

const COMPLETENESS = 'math.real.completeness'
const METRIC_SPACE = 'math.real.metric-space'

export const MATHEMATICS_REAL_COMPLETENESS_METRIC_SPACE_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: COMPLETENESS, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'THE SUPREMUM NEED NOT BE ATTAINED BY ANY ELEMENT OF THE SET: for the open interval '
      + 'S=(0,1), the supremum is 1 — the LEAST upper bound — even though 1 is not in S and no '
      + 'element of S actually equals 1. Completeness guarantees the supremum EXISTS as a real '
      + 'number, never that it belongs to the set itself; S=(0,1] instead has its supremum equal '
      + 'to 1 and attained, since 1 is in S — both are valid, and whether the supremum is '
      + 'attained is a separate question from whether it exists.\n\n'
      + 'COMPLETENESS IS SPECIFICALLY A PROPERTY OF THE REAL NUMBERS, GENUINELY FAILING IN THE '
      + 'RATIONALS: consider $S=\\{x\\in\\mathbb{Q}:x^2<2\\}$. Within the rationals, $S$ is '
      + 'bounded above (for example by 2) but has NO supremum within the rationals — the '
      + '"natural" candidate $\\sqrt2$ is irrational. Every rational upper bound can be improved '
      + 'by a smaller rational upper bound, with no least one existing among the rationals. In '
      + 'the reals, by contrast, the supremum of $S$ exists and equals $\\sqrt2$, exactly because '
      + 'completeness fills in precisely the gaps that the rationals leave open — this is not a '
      + 'minor technicality but the exact reason the real numbers are needed at all for '
      + 'analysis.\n\n'
      + 'A BOUNDED SEQUENCE NEED NOT CONVERGE, EVEN THOUGH EVERY CAUCHY SEQUENCE DOES: the '
      + 'sequence $a_n=(-1)^n$ is bounded (its absolute value never exceeds 1) but does NOT '
      + 'converge — it oscillates forever between -1 and 1, never settling. Cauchy-sequence '
      + 'completeness makes a strictly STRONGER claim than mere boundedness: a sequence is '
      + 'Cauchy precisely when its terms become arbitrarily close to EACH OTHER as the index '
      + 'grows (not just bounded in magnitude) — $a_n=(-1)^n$ fails to be Cauchy since '
      + 'consecutive terms stay exactly 2 apart forever. Completeness guarantees convergence for '
      + 'CAUCHY sequences specifically, never for merely bounded ones.',
    targetedMisconceptions: [`${COMPLETENESS}:MC-1`, `${COMPLETENESS}:MC-2`, `${COMPLETENESS}:MC-3`],
    source: eb(COMPLETENESS, 'Core Understanding — the supremum never needing to be attained by an element of the set, completeness never being a property shared by the rationals since a bounded-above subset of Q can lack a rational least upper bound, and a bounded sequence never needing to converge since only a Cauchy sequence is guaranteed to converge in R'),
  },
  {
    conceptId: METRIC_SPACE, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'A METRIC IS ANY FUNCTION SATISFYING THE THREE AXIOMS — NEVER RESTRICTED TO THE EUCLIDEAN '
      + 'FORMULA: measuring the distance from (0,0) to (3,4) three ways: the Euclidean distance '
      + 'is 5; the taxicab distance is 7; the max distance is 4 — three DIFFERENT numbers, yet '
      + 'each satisfies the identity-of-indiscernibles property, symmetry, and the triangle '
      + 'inequality. The DISCRETE metric (distance 0 if the points are equal, else 1) works on '
      + 'ANY set, even with no geometric structure whatsoever — the axioms, not any particular '
      + 'formula, define what "distance" means.\n\n'
      + 'NON-NEGATIVITY IS A THEOREM DERIVED FROM THE THREE AXIOMS, NEVER A FOURTH INDEPENDENT '
      + 'ASSUMPTION: applying the triangle inequality with the third point equal to the first '
      + 'point gives $d(x,x)\\le d(x,y)+d(y,x)$. By identity of indiscernibles, $d(x,x)=0$; by '
      + 'symmetry, $d(y,x)=d(x,y)$. So $(0\\le2d(x,y))$, giving $d(x,y)\\ge0$ — derived from '
      + 'exactly the three stated axioms, using all three, showing the definition is economical: '
      + 'nothing redundant is assumed.\n\n'
      + 'THE TRIANGLE INEQUALITY BOUNDS THE DIRECT DISTANCE ABOVE BY THE DETOUR, NEVER THE '
      + 'REVERSE: for the points 0, 5, and 1 on the real line, the direct distance from 0 to 1 is '
      + '1, while the detour through 5 has total length 9; indeed 1 is at most 9 — "going home '
      + 'directly is never longer than a detour through the store." Writing the inequality with '
      + 'the direction reversed produces absurd conclusions (a direct route being LONGER than a '
      + 'detour). Ball SHAPE depends on the metric: a ball of radius 1 around the origin is a '
      + 'circle under the Euclidean metric, a diamond under the taxicab metric, and a square '
      + 'under the max metric — the same center and radius, three genuinely different sets.',
    targetedMisconceptions: [`${METRIC_SPACE}:MC-1`, `${METRIC_SPACE}:MC-2`, `${METRIC_SPACE}:MC-3`],
    source: eb(METRIC_SPACE, 'Core Understanding — a metric never being restricted to the Euclidean formula since any function satisfying the three axioms qualifies, non-negativity never being a fourth independent axiom since it is a theorem derived from the three axioms, and the triangle inequality never bounding the detour by the direct distance since it is always the reverse'),
  },
]

export const MATHEMATICS_REAL_COMPLETENESS_METRIC_SPACE_PROBES: SeedProbe[] = [
  {
    conceptId: COMPLETENESS, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Must the supremum of a set be an element of that set itself?',
    choices: [
      { text: 'No — S=(0,1) has supremum 1, but 1 is not in S; completeness guarantees the supremum exists as a real number, never that it belongs to the set. S=(0,1] has supremum 1 which IS attained, showing attainment is a separate question', isCorrect: true },
      { text: 'Yes — the supremum of a set must always be an element of that same set', isCorrect: false, misconceptionId: `${COMPLETENESS}:MC-1` },
      { text: "Yes, since a least upper bound only counts as a supremum if it is actually achieved by some member of the set", isCorrect: false, misconceptionId: `${COMPLETENESS}:MC-1` },
    ],
    targetedMisconceptions: [`${COMPLETENESS}:MC-1`],
    source: eb(COMPLETENESS, 'Discovery Question 1 as a detection probe (verbatim) — whether the supremum must be an element of the set, an answer of "yes" confirming SUPREMUM-MUST-BE-ATTAINED'),
  },
  {
    conceptId: COMPLETENESS, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Does every bounded-above subset of the rational numbers have a rational supremum?',
    choices: [
      { text: 'No — the set of rationals x with x²<2 is bounded above in Q (e.g. by 2), but has no rational least upper bound, since every rational upper bound can be improved by a smaller one; only in R does its supremum √2 exist', isCorrect: true },
      { text: 'Yes — every bounded-above subset of the rational numbers has a supremum that is itself rational', isCorrect: false, misconceptionId: `${COMPLETENESS}:MC-2` },
      { text: "Yes, since Q and R share the same arithmetic and order properties, so completeness must hold identically in both", isCorrect: false, misconceptionId: `${COMPLETENESS}:MC-2` },
    ],
    targetedMisconceptions: [`${COMPLETENESS}:MC-2`],
    source: eb(COMPLETENESS, 'Discovery Question 2 as a detection probe (verbatim) — whether every bounded-above subset of Q has a rational supremum, an answer of "yes" confirming COMPLETENESS-HOLDS-IN-RATIONALS'),
  },
  {
    conceptId: COMPLETENESS, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Does every bounded sequence in R converge?',
    choices: [
      { text: 'No — a_n=(-1)^n is bounded (never exceeding 1 in absolute value) but does not converge, since it oscillates forever and is not Cauchy; only Cauchy sequences (terms bunching against each other) are guaranteed to converge', isCorrect: true },
      { text: 'Yes — every bounded sequence of real numbers is guaranteed to converge to some limit', isCorrect: false, misconceptionId: `${COMPLETENESS}:MC-3` },
      { text: "Yes, since completeness of R means boundedness alone is always sufficient to guarantee convergence", isCorrect: false, misconceptionId: `${COMPLETENESS}:MC-3` },
    ],
    targetedMisconceptions: [`${COMPLETENESS}:MC-3`],
    source: eb(COMPLETENESS, 'Discovery Question 3 as a detection probe (verbatim) — whether every bounded sequence in R converges, an answer of "yes" confirming BOUNDED-SEQUENCE-CONVERGES'),
  },
  {
    conceptId: METRIC_SPACE, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Is the discrete metric a legitimate metric, or is it "not a real distance"?',
    choices: [
      { text: 'It is a legitimate metric — it satisfies all three metric axioms (identity of indiscernibles, symmetry, triangle inequality) on any set whatsoever, even one with no geometric structure; a metric is defined by the axioms, never by resembling Euclidean distance', isCorrect: true },
      { text: 'It is not a real distance — only the Euclidean formula qualifies as a genuine metric', isCorrect: false, misconceptionId: `${METRIC_SPACE}:MC-1` },
      { text: "It is a fake metric that happens to satisfy the axioms by coincidence, without capturing real distance", isCorrect: false, misconceptionId: `${METRIC_SPACE}:MC-1` },
    ],
    targetedMisconceptions: [`${METRIC_SPACE}:MC-1`],
    source: eb(METRIC_SPACE, 'Discovery Question 1 as a detection probe (verbatim) — whether the discrete metric is a legitimate metric, an answer rejecting it confirming METRIC-IS-EUCLIDEAN'),
  },
  {
    conceptId: METRIC_SPACE, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'How many independent axioms define a metric — three, or four?',
    choices: [
      { text: 'Three — identity of indiscernibles, symmetry, and the triangle inequality; non-negativity is NOT a fourth independent axiom, it is a theorem derivable from those three by applying the triangle inequality with the third point equal to the first', isCorrect: true },
      { text: 'Four — identity of indiscernibles, symmetry, the triangle inequality, and non-negativity as a separate independent requirement', isCorrect: false, misconceptionId: `${METRIC_SPACE}:MC-2` },
      { text: "Four, since non-negativity cannot be derived from the other three axioms and must be assumed separately", isCorrect: false, misconceptionId: `${METRIC_SPACE}:MC-2` },
    ],
    targetedMisconceptions: [`${METRIC_SPACE}:MC-2`],
    source: eb(METRIC_SPACE, 'Discovery Question 2 as a detection probe (verbatim) — how many independent axioms define a metric, an answer of "four" confirming NONNEGATIVITY-AS-AXIOM'),
  },
  {
    conceptId: METRIC_SPACE, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Does the triangle inequality say the direct distance can exceed the detour, or the reverse?',
    choices: [
      { text: 'The reverse — the direct distance is always bounded above by the detour: for points 0, 5, 1 on the real line, the direct distance from 0 to 1 is 1, while the detour through 5 totals 9, and indeed 1 is at most 9', isCorrect: true },
      { text: 'The direct distance can exceed the detour — a route through an intermediate point can sometimes be shorter than going directly', isCorrect: false, misconceptionId: `${METRIC_SPACE}:MC-3` },
      { text: "Neither direction is fixed — the triangle inequality allows the direct distance and the detour to be in any relative order depending on the metric", isCorrect: false, misconceptionId: `${METRIC_SPACE}:MC-3` },
    ],
    targetedMisconceptions: [`${METRIC_SPACE}:MC-3`],
    source: eb(METRIC_SPACE, 'Discovery Question 3 as a detection probe (verbatim) — whether the triangle inequality allows the direct distance to exceed the detour, an answer reversing the direction confirming TRIANGLE-DIRECTION-REVERSED'),
  },
]
