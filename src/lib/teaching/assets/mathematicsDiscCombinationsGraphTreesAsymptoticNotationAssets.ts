/**
 * Batch: combinations, graph-trees, asymptotic-notation (math.disc).
 *
 * Continues math.disc (6/32 -> 9/32) after the permutations/graph-
 * connectivity/recurrence-relation batch. Fresh frontier recompute found 13
 * ready concepts; these 3 selected for maximal downstream unlocks:
 * combinations unlocks BOTH binomial-theorem and inclusion-exclusion (and
 * is the concept this program's own math.disc excursion exists to reach —
 * its EB entry's Curriculum Feedback notes math.alg.binomial-theorem's own
 * requires field is now satisfied), graph-trees unlocks spanning-tree, and
 * asymptotic-notation unlocks algorithm-complexity. Transcribed from the
 * frozen Educational Brain entries at educational-brain/concepts/
 * mathematics/math.disc.{combinations,graph-trees,asymptotic-notation}.md.
 *
 * Grade band: combinations is EB difficulty "developing" with sole
 * prerequisite permutations (seeded GradeBand.HIGH) — GradeBand.HIGH.
 * graph-trees is EB difficulty "proficient" but its sole prerequisite,
 * graph-connectivity, is itself HIGH/"developing" with no calculus or
 * undergraduate-level machinery required — GradeBand.HIGH retained, unlike
 * the concepts below whose prerequisite chains specifically pull into
 * undergraduate content. asymptotic-notation is EB difficulty "proficient"
 * and directly requires math.calc.limits, itself seeded
 * GradeBand.UNDERGRADUATE throughout this campaign — GradeBand.UNDERGRADUATE
 * adopted for this one concept, matching that established math.calc
 * convention.
 *
 *   COMBINATIONS  C(n,r)=P(n,r)/r! counts UNORDERED selections, dividing
 *           out the r! redundant orderings within each group — never the
 *           same value as P(n,r); Pascal's identity C(n,r)=C(n-1,r-1)+
 *           C(n-1,r) is proven by a combinatorial in-or-out split, never
 *           mere algebra; the order-matters test must be re-applied
 *           SEPARATELY to each stage of a multi-stage problem, never
 *           assumed uniform across the whole problem.
 *   GRAPH-TREES  A tree requires CONNECTED AND ACYCLIC simultaneously,
 *           never either alone; n-1 edges is NECESSARY but never
 *           SUFFICIENT for tree status — a disconnected graph with a
 *           cycle can still total n-1 edges; the SAME free tree rooted at
 *           different vertices produces genuinely DIFFERENT hierarchies,
 *           never one fixed hierarchy.
 *   ASYMPTOTIC-NOTATION  f=O(g) is an upper bound permitting f to grow
 *           STRICTLY SLOWER than g, never a same-rate claim; constants and
 *           lower-order terms NEVER change the asymptotic class; a
 *           technically-true but loose O-bound can still be far less
 *           informative than the tightest available Θ-classification.
 *
 * Seeded as DRAFT. Promotion stays human.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedExplanation, SeedProbe } from './brainSeedAssets'

const S = 'mathematics'
const eb = (id: string, what: string) =>
  `educational-brain/concepts/mathematics/${id}.md — ${what}`

const COMBINATIONS = 'math.disc.combinations'
const GRAPH_TREES = 'math.disc.graph-trees'
const ASYMPTOTIC_NOTATION = 'math.disc.asymptotic-notation'

export const MATHEMATICS_DISC_COMBINATIONS_GRAPH_TREES_ASYMPTOTIC_NOTATION_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: COMBINATIONS, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'C(n,r)=P(n,r)/r! COUNTS UNORDERED SELECTIONS, DIVIDING OUT REDUNDANT ORDERINGS, NEVER THE '
      + 'SAME VALUE AS P(n,r): choosing a 3-person committee from 8 people (no roles — just '
      + 'membership) is NOT P(8,3)=8×7×6=336, since every unordered group of 3 corresponds to '
      + '3!=6 different orderings all counted separately by P(n,r). Dividing out this redundancy: '
      + 'C(8,3)=336/6=56, matching 8!/(3!5!)=40320/(6×120)=56 directly.\n\n'
      + "PASCAL'S IDENTITY C(n,r)=C(n-1,r-1)+C(n-1,r) IS PROVEN BY A COMBINATORIAL IN-OR-OUT SPLIT, "
      + 'NEVER MERE ALGEBRA: to choose r items from n, fix one specific item — say Dana, from a '
      + 'group of 6, choosing 2. Either Dana IS included (then 1 more from the remaining 5: '
      + 'C(5,1)=5 ways) or Dana is NOT included (then 2 from the remaining 5: C(5,2)=10 ways). '
      + 'Since every selection falls into exactly one of these two mutually exclusive cases, adding '
      + 'them gives the total: 5+10=15, matching C(6,2)=6!/(2!4!)=15 directly. This combinatorial '
      + 'correspondence EXPLAINS why the identity holds, never merely verifies it symbolically.\n\n'
      + 'THE ORDER-MATTERS TEST MUST BE RE-APPLIED SEPARATELY TO EACH STAGE OF A MULTI-STAGE '
      + 'PROBLEM, NEVER ASSUMED UNIFORM: a trivia team of 4 chosen from 10 students, then that same '
      + 'team elects a captain and co-captain. Choosing the 4-person team: order does NOT matter — '
      + 'use C(10,4)=10!/(4!6!)=210. Given that specific 4-person team, choosing captain and '
      + 'co-captain (two distinct roles): order DOES matter — use P(4,2)=4!/2!=12. The SAME pool of '
      + 'people requires C for the membership-only stage and P for the role-assignment stage — '
      + 'proving the two formulas are never interchangeable across an entire problem.',
    targetedMisconceptions: [`${COMBINATIONS}:MC-1`, `${COMBINATIONS}:MC-2`, `${COMBINATIONS}:MC-3`],
    source: eb(COMBINATIONS, "Core Understanding — C(n,r) derived from P(n,r) by dividing out redundant orderings, Pascal's identity proven via the combinatorial in-or-out split rather than algebra, and the order-matters test re-applied separately to each stage of a multi-stage problem"),
  },
  {
    conceptId: GRAPH_TREES, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'A TREE REQUIRES CONNECTED AND ACYCLIC SIMULTANEOUSLY, NEVER EITHER ALONE: graph A with '
      + 'V={1,2,3,4}, edges {(1,2),(2,3),(3,4)} is connected AND acyclic — a genuine TREE. Graph B '
      + '(same vertices plus edge (4,1)) is still connected, but now cyclic — NOT a tree. Graph C '
      + 'with edges {(1,2),(3,4)} is acyclic but disconnected — also NOT a tree. Failing EITHER '
      + 'condition alone disqualifies a graph from tree status; both must be checked independently.\n\n'
      + 'n-1 EDGES IS NECESSARY BUT NEVER SUFFICIENT FOR TREE STATUS: a tree with n vertices always '
      + 'has exactly n-1 edges, but a graph can match this count without being a tree. For '
      + 'V={1,2,3,4}, edges {(1,2),(2,3),(1,3)} (a triangle on 1,2,3) with vertex 4 isolated: '
      + 'n=4, edges=3=n-1 exactly, YET the graph is disconnected (vertex 4 unreachable) AND cyclic '
      + '(the triangle) — NOT a tree despite matching the edge count exactly. Matching n-1 edges is '
      + 'a quick consequence to check, never a substitute for verifying connectedness and acyclicity '
      + 'directly.\n\n'
      + 'THE SAME FREE TREE ROOTED AT DIFFERENT VERTICES PRODUCES GENUINELY DIFFERENT HIERARCHIES, '
      + 'NEVER ONE FIXED HIERARCHY: for the free tree {A,B,C,D} with edges {(A,B),(B,C),(B,D)}, '
      + 'rooting at B makes A, C, and D all direct children of B (a depth-1 hierarchy). Rooting the '
      + 'IDENTICAL edges at A instead makes B the child of A, while C and D become GRANDCHILDREN of '
      + 'A (a depth-2 hierarchy). The underlying edges never change, but the parent-child '
      + 'relationships genuinely do — a different root produces a structurally different hierarchy, '
      + 'never merely a relabeling of the same one.',
    targetedMisconceptions: [`${GRAPH_TREES}:MC-1`, `${GRAPH_TREES}:MC-2`, `${GRAPH_TREES}:MC-3`],
    source: eb(GRAPH_TREES, 'Core Understanding — a tree requiring connected and acyclic simultaneously never either alone, n-1 edges as necessary but never sufficient for tree status, and the same free tree producing genuinely different hierarchies under different root choices'),
  },
  {
    conceptId: ASYMPTOTIC_NOTATION, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'f=O(g) IS AN UPPER BOUND PERMITTING f TO GROW STRICTLY SLOWER THAN g, NEVER A SAME-RATE '
      + 'CLAIM: f=O(g) means there exist constants c>0 and n₀ such that f(n)≤c·g(n) for all n≥n₀ — '
      + 'this permits f to grow MUCH SLOWER than g, since "at most as fast" includes "much slower." '
      + 'n=O(n²) is TRUE even though n and n² do not grow at comparable rates at all: verifying '
      + 'directly with c=1, n₀=1 confirms n≤n² for n≥1, while the ratio n/n²=1/n→0 shows the two '
      + 'functions genuinely do NOT grow at the same rate. Big-Ω is the mirror image (a LOWER '
      + 'bound, f grows at least as fast as g); Big-Θ requires BOTH O and Ω simultaneously — '
      + 'genuinely the SAME growth rate, sandwiched from both sides. These are three distinct '
      + 'directions of comparison, never interchangeable notations for "roughly similar."\n\n'
      + 'CONSTANTS AND LOWER-ORDER TERMS NEVER CHANGE THE ASYMPTOTIC CLASS: 3n²+5n+2=Θ(n²) despite '
      + 'the leading coefficient 3, the term 5n, and the constant +2, because both bounds required '
      + 'for Θ can be verified against n² alone — the upper bound 3n²+5n+2≤10n² holds for n≥1, and '
      + 'the lower bound 3n²+5n+2≥3n² holds for all n≥0. Constants and lower-order terms affect only '
      + 'the constant multiplier c in the bound, never the classification itself.\n\n'
      + 'A TECHNICALLY-TRUE BUT LOOSE O-BOUND CAN STILL BE FAR LESS INFORMATIVE THAN THE TIGHTEST '
      + 'AVAILABLE CLASSIFICATION: an algorithm that is actually Θ(n) is also, technically, O(n²) '
      + '(since n=O(n²)), but stating only the weaker O(n²) bound obscures the algorithm\'s true, '
      + 'much faster performance. Truth and informativeness are genuinely different properties — a '
      + 'true statement can still be misleadingly loose, and the tightest known classification '
      + 'should always be preferred when available.',
    targetedMisconceptions: [`${ASYMPTOTIC_NOTATION}:MC-1`, `${ASYMPTOTIC_NOTATION}:MC-2`, `${ASYMPTOTIC_NOTATION}:MC-3`],
    source: eb(ASYMPTOTIC_NOTATION, 'Core Understanding — Big-O as an upper bound permitting strictly slower growth never a same-rate claim, constants and lower-order terms never changing the asymptotic classification, and a true-but-loose bound remaining less informative than the tightest known classification'),
  },
]

export const MATHEMATICS_DISC_COMBINATIONS_GRAPH_TREES_ASYMPTOTIC_NOTATION_PROBES: SeedProbe[] = [
  {
    conceptId: COMBINATIONS, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'A 4-person team is chosen from 10 students (order doesn\'t matter), and then that SAME team elects a captain and co-captain (two distinct roles). Should the same formula be used for both parts?',
    choices: [
      { text: 'No — choosing the team uses C(10,4) since there are no roles, but choosing captain/co-captain from that team uses P(4,2) since the two roles are distinct; each stage needs its own order-matters check', isCorrect: true },
      { text: 'Yes — since the team was chosen with combinations, every later step involving that same team must also use combinations', isCorrect: false, misconceptionId: `${COMBINATIONS}:MC-1` },
      { text: "Yes, because once a formula is correctly chosen for one part of a problem, it applies to the whole problem", isCorrect: false, misconceptionId: `${COMBINATIONS}:MC-1` },
    ],
    targetedMisconceptions: [`${COMBINATIONS}:MC-1`],
    source: eb(COMBINATIONS, 'Misconceptions MC-1 detection probe (verbatim, Blueprint) — the two-stage team-selection-then-role-assignment scenario, solving both parts with the same formula confirming COMBINATIONS-AND-PERMUTATIONS-TREATED-AS-INTERCHANGEABLE'),
  },
  {
    conceptId: COMBINATIONS, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'How many 3-person committees (no roles) can be formed from 8 people?',
    choices: [
      { text: '56 — computed as C(8,3)=8!/(3!5!)=56, dividing out the 3!=6 orderings within each committee', isCorrect: true },
      { text: '336 — computed as P(8,3)=8×7×6=336', isCorrect: false, misconceptionId: `${COMBINATIONS}:MC-2` },
      { text: "336, since choosing 3 people from 8 always uses the P(n,r) formula", isCorrect: false, misconceptionId: `${COMBINATIONS}:MC-2` },
    ],
    targetedMisconceptions: [`${COMBINATIONS}:MC-2`],
    source: eb(COMBINATIONS, 'Misconceptions MC-2 detection probe (verbatim, Blueprint) — 3-person committees from 8 people, an answer of 336 instead of 56 confirming DIVISION-BY-R-FACTORIAL-OMITTED'),
  },
  {
    conceptId: COMBINATIONS, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Can you explain WHY C(n,r)=C(n-1,r-1)+C(n-1,r) is true, beyond just stating the formula?',
    choices: [
      { text: 'Yes — fix one specific item; every selection either includes it (C(n-1,r-1) ways to choose the rest) or excludes it (C(n-1,r) ways); since these two cases are mutually exclusive and exhaustive, they sum to the total', isCorrect: true },
      { text: 'It is simply an algebraic identity that happens to hold when you expand the factorials — there is no other explanation needed', isCorrect: false, misconceptionId: `${COMBINATIONS}:MC-3` },
      { text: "It's just the formula for combinations of consecutive values of n and r — no further justification is needed", isCorrect: false, misconceptionId: `${COMBINATIONS}:MC-3` },
    ],
    targetedMisconceptions: [`${COMBINATIONS}:MC-3`],
    source: eb(COMBINATIONS, "Misconceptions MC-3 detection probe (verbatim, Blueprint) — explaining WHY Pascal's identity holds, an inability to justify it beyond citing the formula confirming PASCALS-IDENTITY-TREATED-AS-UNMOTIVATED-ALGEBRA"),
  },
  {
    conceptId: GRAPH_TREES, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Is a connected graph that contains a cycle a tree?',
    choices: [
      { text: 'No — a tree requires BOTH connected AND acyclic; a connected graph with a cycle fails the acyclic requirement, so it is not a tree', isCorrect: true },
      { text: 'Yes — since the graph is connected, that alone is enough to call it a tree', isCorrect: false, misconceptionId: `${GRAPH_TREES}:MC-1` },
      { text: "Yes, because connectedness is the main requirement for a tree", isCorrect: false, misconceptionId: `${GRAPH_TREES}:MC-1` },
    ],
    targetedMisconceptions: [`${GRAPH_TREES}:MC-1`],
    source: eb(GRAPH_TREES, 'Misconceptions MC-1 detection probe — a connected graph with a cycle, an answer of "yes" confirming TREE-ASSUMED-FROM-EITHER-CONDITION-ALONE'),
  },
  {
    conceptId: GRAPH_TREES, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'A graph has n=4 vertices and exactly 3=n-1 edges. Must it be a tree?',
    choices: [
      { text: 'No — n-1 edges is necessary but not sufficient; a graph like a triangle on 3 vertices plus one isolated vertex has exactly n-1=3 edges while being both disconnected and cyclic, so it is not a tree', isCorrect: true },
      { text: 'Yes — matching the n-1 edge count is enough by itself to guarantee tree status', isCorrect: false, misconceptionId: `${GRAPH_TREES}:MC-2` },
      { text: "Yes, since trees are defined by having exactly n-1 edges", isCorrect: false, misconceptionId: `${GRAPH_TREES}:MC-2` },
    ],
    targetedMisconceptions: [`${GRAPH_TREES}:MC-2`],
    source: eb(GRAPH_TREES, 'Misconceptions MC-2 detection probe — a graph with n=4, exactly 3 edges, an answer of "yes" confirming N-MINUS-1-EDGES-ASSUMED-SUFFICIENT'),
  },
  {
    conceptId: GRAPH_TREES, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Does a free tree have one single intrinsic parent-child hierarchy, regardless of which vertex is chosen as root?',
    choices: [
      { text: 'No — for the free tree {A,B,C,D} with edges (A,B),(B,C),(B,D), rooting at B makes A,C,D all children of B, but rooting at A instead makes B a child of A while C,D become grandchildren — genuinely different hierarchies from the same edges', isCorrect: true },
      { text: 'Yes — since the underlying edges of a free tree never change, the hierarchy it induces is also fixed regardless of root choice', isCorrect: false, misconceptionId: `${GRAPH_TREES}:MC-3` },
      { text: "Yes, because the root is just a label and doesn't affect the actual parent-child structure", isCorrect: false, misconceptionId: `${GRAPH_TREES}:MC-3` },
    ],
    targetedMisconceptions: [`${GRAPH_TREES}:MC-3`],
    source: eb(GRAPH_TREES, 'Misconceptions MC-3 detection probe — the same free tree rooted at B versus at A, an answer of "yes" confirming TREE-HIERARCHY-ASSUMED-ROOT-INDEPENDENT'),
  },
  {
    conceptId: ASYMPTOTIC_NOTATION, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Given that n=O(n²), does this mean n and n² grow at the same rate?',
    choices: [
      { text: 'No — O is an upper bound permitting n to grow STRICTLY SLOWER than n²; indeed n/n²=1/n→0, showing the two functions do not grow at comparable rates at all despite the O-relationship holding', isCorrect: true },
      { text: 'Yes — writing f=O(g) means f and g grow at essentially the same rate', isCorrect: false, misconceptionId: `${ASYMPTOTIC_NOTATION}:MC-1` },
      { text: "Yes, since the equals sign in f=O(g) indicates the two functions are asymptotically equivalent", isCorrect: false, misconceptionId: `${ASYMPTOTIC_NOTATION}:MC-1` },
    ],
    targetedMisconceptions: [`${ASYMPTOTIC_NOTATION}:MC-1`],
    source: eb(ASYMPTOTIC_NOTATION, 'Misconceptions MC-1 — n=O(n²), an answer of "yes" (same rate) confirming BIG-O-CONFLATED-WITH-SAME-RATE'),
  },
  {
    conceptId: ASYMPTOTIC_NOTATION, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Do 3n²+5n+2 and n² belong to different asymptotic classes, since they are not literally the same function?',
    choices: [
      { text: 'No — 3n²+5n+2=Θ(n²), since both an upper bound (3n²+5n+2≤10n² for n≥1) and a lower bound (3n²+5n+2≥3n² for all n≥0) can be verified against n² alone; constants and lower-order terms never change the classification', isCorrect: true },
      { text: 'Yes — since 3n²+5n+2 has extra terms and a coefficient that n² does not have, they must belong to different asymptotic classes', isCorrect: false, misconceptionId: `${ASYMPTOTIC_NOTATION}:MC-2` },
      { text: "Yes, because asymptotic classification requires functions to match exactly, term for term", isCorrect: false, misconceptionId: `${ASYMPTOTIC_NOTATION}:MC-2` },
    ],
    targetedMisconceptions: [`${ASYMPTOTIC_NOTATION}:MC-2`],
    source: eb(ASYMPTOTIC_NOTATION, 'Misconceptions MC-2 — 3n²+5n+2 versus n², an answer of "yes" (different classes) confirming CONSTANTS-AND-LOWER-ORDER-TERMS-ASSUMED-TO-CHANGE-CLASS'),
  },
  {
    conceptId: ASYMPTOTIC_NOTATION, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'An algorithm is actually Θ(n) but is described only as "O(n²)." Since this statement is technically true, is it an equally good description as stating the tight Θ(n) classification?',
    choices: [
      { text: 'No — O(n²) is technically true but obscures the algorithm\'s actual, much faster performance; truth and informativeness are different properties, and the tightest known classification (Θ(n) here) should always be preferred when available', isCorrect: true },
      { text: 'Yes — since "O(n²)" is a true statement about the algorithm, it is just as good a description as any other true statement', isCorrect: false, misconceptionId: `${ASYMPTOTIC_NOTATION}:MC-3` },
      { text: "Yes, because as long as a bound is technically correct, it doesn't matter how loose it is", isCorrect: false, misconceptionId: `${ASYMPTOTIC_NOTATION}:MC-3` },
    ],
    targetedMisconceptions: [`${ASYMPTOTIC_NOTATION}:MC-3`],
    source: eb(ASYMPTOTIC_NOTATION, 'Misconceptions MC-3 — a Θ(n) algorithm described only as O(n²), an answer of "yes" (equally good) confirming LOOSE-O-BOUND-ASSUMED-EQUALLY-INFORMATIVE-AS-TIGHT-BOUND'),
  },
]
