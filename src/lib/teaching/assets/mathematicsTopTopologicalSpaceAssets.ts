/**
 * Batch: topological-space (math.top) — OPENS the math.top domain (0/23).
 *
 * Fresh Phase 0 frontier recompute after math.fnal reached 18/18
 * completion: math.top is one of the 2 remaining Mathematics domains
 * (top 23, cx 31) and its own frontier has exactly 1 concept ready —
 * topological-space, the domain's sole root (requires only
 * math.found.set-theory, already authored). The domain's remaining 22
 * concepts branch out from here (open-sets, continuity-top, and onward),
 * so only this one concept is ready until it's authored.
 * Transcribed from its frozen Educational Brain entry at educational-
 * brain/concepts/mathematics/math.top.topological-space.md.
 *
 * Grade band: GradeBand.UNDERGRADUATE, matching the established
 * convention for expert-tier pure-mathematics domains (math.cat,
 * math.abst, math.meas, math.fnal) — point-set topology is genuinely
 * undergraduate/early-graduate content.
 *
 * This concept's KG cross-link (math.real.metric-space) is authored —
 * a genuine transfer target (metric spaces motivate and generalize into
 * topological spaces).
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

const TOPOLOGICAL_SPACE = 'math.top.topological-space'

export const MATHEMATICS_TOP_TOPOLOGICAL_SPACE_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: TOPOLOGICAL_SPACE, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'THE UNION/INTERSECTION ASYMMETRY IS ESSENTIAL — NEVER SYMMETRIZED: in R, each interval '
      + '(−1/n, 1/n) is open, but the intersection of ALL of them (n=1,2,3,...) is just {0} — and '
      + '{0} is NOT open in R (no interval around 0 fits inside it). Infinite intersections can '
      + 'squeeze open sets down to non-open ones; unions have no such failure (a union of intervals '
      + 'only gains room, never loses it). The axioms encode exactly what survives: arbitrary '
      + 'unions, but only FINITE intersections — demanding arbitrary intersections would make the '
      + 'axioms fail to describe R itself.\n\n'
      + 'OPENNESS IS RELATIVE TO A DECLARED τ — NEVER AN INTRINSIC PROPERTY: on X={a,b,c}: is {a} '
      + 'open? MEANINGLESS until a topology is named. In the discrete topology (all subsets): yes. '
      + 'In a specific topology containing {a} and {a,b}: yes. In the indiscrete topology (only the '
      + 'empty set and X itself): no. Even (0,1) in R — open in the standard topology, but NOT open '
      + 'if R were instead equipped with the indiscrete topology. Every openness claim silently '
      + 'carries "...in the topology τ" — a set is open ONLY relative to a chosen topology, never '
      + 'absolutely.\n\n'
      + 'TOPOLOGIES GENUINELY GENERALIZE METRIC SPACES — NEVER ASSUMED TO ALWAYS COME FROM SOME '
      + 'METRIC: the indiscrete topology on X={a,b} is NOT metrizable. Proof: suppose a metric d '
      + 'gave this topology. Since a≠b, the distance r=d(a,b)>0. The ball of radius r/2 around a is '
      + 'open in the metric topology, contains a, excludes b — a nonempty open set that is NEITHER '
      + 'the empty set NOR X. But the indiscrete topology has NO such set — contradiction. Metrics '
      + 'ALWAYS separate distinct points with disjoint balls; topologies are free NOT to. '
      + 'Topological spaces form a strictly LARGER world than metric spaces — the generalization is '
      + 'genuine, never merely a repackaging.',
    targetedMisconceptions: [`${TOPOLOGICAL_SPACE}:MC-1`, `${TOPOLOGICAL_SPACE}:MC-2`, `${TOPOLOGICAL_SPACE}:MC-3`],
    source: eb(TOPOLOGICAL_SPACE, 'Core Understanding — the union/intersection asymmetry being essential never symmetrized, openness being relative to a declared topology never an intrinsic property, and topologies genuinely generalizing metric spaces never assumed to always come from some metric'),
  },
]

export const MATHEMATICS_TOP_TOPOLOGICAL_SPACE_PROBES: SeedProbe[] = [
  {
    conceptId: TOPOLOGICAL_SPACE, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Must arbitrary intersections of open sets be open, the same way arbitrary unions must be?',
    choices: [
      { text: "No — only FINITE intersections are required to be open; in R, each interval (−1/n,1/n) is open, but the intersection of ALL of them is {0}, which is NOT open. Unions can only add room, but infinite intersections can shrink an open set down to a non-open one", isCorrect: true },
      { text: "Yes, arbitrary intersections of open sets must be open, the same way arbitrary unions must be", isCorrect: false, misconceptionId: `${TOPOLOGICAL_SPACE}:MC-1` },
      { text: "Since unions and intersections are treated symmetrically in most other axiomatic systems, the topology axioms should require the same closure property for both", isCorrect: false, misconceptionId: `${TOPOLOGICAL_SPACE}:MC-1` },
    ],
    targetedMisconceptions: [`${TOPOLOGICAL_SPACE}:MC-1`],
    source: eb(TOPOLOGICAL_SPACE, 'Discovery Question 1 as a detection probe (verbatim) — whether arbitrary intersections of open sets must be open, an answer of "yes" confirming ARBITRARY-INTERSECTIONS-ALLOWED'),
  },
  {
    conceptId: TOPOLOGICAL_SPACE, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Is a set "open" by itself, or only relative to a specific declared topology?',
    choices: [
      { text: "Only relative to a declared topology — on X={a,b,c}, whether {a} is open is MEANINGLESS until a topology is named: yes in the discrete topology, no in the indiscrete topology; even (0,1) in R is open in the standard topology but NOT open under the indiscrete topology", isCorrect: true },
      { text: "A set like (0,1) in R is simply open by itself, an intrinsic property that doesn't depend on which topology is being used", isCorrect: false, misconceptionId: `${TOPOLOGICAL_SPACE}:MC-2` },
      { text: "Since openness feels like a geometric property inherited directly from a set's shape, it should be treated as intrinsic rather than dependent on a declared topology", isCorrect: false, misconceptionId: `${TOPOLOGICAL_SPACE}:MC-2` },
    ],
    targetedMisconceptions: [`${TOPOLOGICAL_SPACE}:MC-2`],
    source: eb(TOPOLOGICAL_SPACE, 'Discovery Question 2 as a detection probe (verbatim) — whether a set is open by itself or only relative to a declared topology, an answer treating openness as intrinsic confirming OPEN-IS-ABSOLUTE'),
  },
  {
    conceptId: TOPOLOGICAL_SPACE, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Does every topology come from some metric, or can a topology exist with no metric behind it?',
    choices: [
      { text: "A topology can exist with no metric behind it — the indiscrete topology on X={a,b} is NOT metrizable: if a metric d gave this topology, the ball of radius d(a,b)/2 around a would be a nonempty open set that is neither empty nor all of X, but the indiscrete topology has no such set, a contradiction", isCorrect: true },
      { text: "Yes, every topology comes from some metric — topological spaces are just metric spaces restated in different language", isCorrect: false, misconceptionId: `${TOPOLOGICAL_SPACE}:MC-3` },
      { text: "Since every example of a topology typically encountered arises from a metric, it should be assumed that all topologies have some underlying metric", isCorrect: false, misconceptionId: `${TOPOLOGICAL_SPACE}:MC-3` },
    ],
    targetedMisconceptions: [`${TOPOLOGICAL_SPACE}:MC-3`],
    source: eb(TOPOLOGICAL_SPACE, 'Discovery Question 3 as a detection probe (verbatim) — whether every topology comes from some metric, an answer of "yes" confirming EVERY-TOPOLOGY-IS-METRIC'),
  },
]
