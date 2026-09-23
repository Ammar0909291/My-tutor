/**
 * Batch: permutations, graph-connectivity, recurrence-relation (math.disc).
 *
 * Continues math.disc (3/32 -> 6/32) after the counting-principles/graph/
 * propositional-logic opening batch. Fresh frontier recompute found 11
 * ready concepts; these 3 selected for their downstream unlocks
 * (permutations unlocks combinations, itself the last blocker for
 * math.prob's combinatorial-probability; graph-connectivity unlocks BOTH
 * graph-trees and euler-hamiltonian; recurrence-relation unlocks
 * generating-functions). Transcribed from the frozen Educational Brain
 * entries at educational-brain/concepts/mathematics/math.disc.{permutations,
 * graph-connectivity,recurrence-relation}.md.
 *
 * Grade band: permutations and graph-connectivity are both EB difficulty
 * "developing," matching the GradeBand.HIGH convention already established
 * for math.disc (see the counting-principles/graph/propositional-logic
 * batch). recurrence-relation is EB difficulty "proficient" and requires
 * math.seq.sequence, itself seeded at GradeBand.UNDERGRADUATE throughout
 * this campaign's math.seq work — GradeBand.UNDERGRADUATE adopted for this
 * one concept specifically, matching both its own higher difficulty and its
 * direct prerequisite's grade band, rather than forcing the whole domain
 * convention onto a concept whose own EB metadata says otherwise.
 *
 *   PERMUTATIONS  Order matters is the ONLY test for whether a "choose r
 *           from n" scenario is a permutation at all, never surface
 *           phrasing; identical items among the n must have their
 *           redundant internal orderings divided out (n!/(n1!n2!...)),
 *           never left as a naive n!; a circular arrangement is (n-1)!,
 *           never the linear n!, since rotations of the same arrangement
 *           are identical.
 *   GRAPH-CONNECTIVITY  Directed reachability is NEVER automatically
 *           symmetric — strong connectivity demands mutual reachability
 *           for EVERY pair in BOTH directions, never merely "can reach
 *           somewhere"; a path never revisits a vertex, never a general
 *           walk; connectedness is a universal claim, confirmed only by
 *           systematic search, never by sampling a few pairs.
 *   RECURRENCE-RELATION  A repeated characteristic root requires the
 *           adjusted form (A+Bn)rⁿ, never the distinct-roots form
 *           Ar₁ⁿ+Br₂ⁿ which algebraically collapses to a single constant;
 *           a bare recurrence rule NEVER determines a unique sequence
 *           without initial conditions; "order" (the recurrence's own
 *           reach backward) and "degree" (the characteristic polynomial's
 *           degree) are genuinely different quantities, never synonyms.
 *
 * Seeded as DRAFT. Promotion stays human.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedExplanation, SeedProbe } from './brainSeedAssets'

const S = 'mathematics'
const eb = (id: string, what: string) =>
  `educational-brain/concepts/mathematics/${id}.md — ${what}`

const PERMUTATIONS = 'math.disc.permutations'
const GRAPH_CONNECTIVITY = 'math.disc.graph-connectivity'
const RECURRENCE_RELATION = 'math.disc.recurrence-relation'

export const MATHEMATICS_DISC_PERMUTATIONS_GRAPH_CONNECTIVITY_RECURRENCE_RELATION_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: PERMUTATIONS, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'ORDER MATTERS IS THE ONLY TEST FOR WHETHER A SCENARIO IS A PERMUTATION AT ALL, NEVER SURFACE '
      + 'PHRASING: to arrange r items chosen from n distinct items where order matters, the '
      + 'multiplication principle applies sequentially — n choices for the first position, n-1 '
      + 'remaining for the second, down to n-r+1 for the r-th — giving P(n,r)=n(n-1)⋯(n-r+1)=n!/(n-r)!. '
      + 'For a race with 8 runners producing a 1st/2nd/3rd finish: P(8,3)=8!/5!=8×7×6=336. But a '
      + 'teacher selecting 3 students from 10 for a role-less committee (no distinct roles — just '
      + 'membership) does NOT use this formula: choosing Alice-then-Bob-then-Carol is the IDENTICAL '
      + 'outcome as Bob-then-Carol-then-Alice, since swapping the chosen items changes nothing. The '
      + 'deciding test is always "would swapping two chosen items give a genuinely different '
      + 'outcome?" — never whether the problem is phrased using words like "choose" or "select."\n\n'
      + 'IDENTICAL ITEMS MUST HAVE THEIR REDUNDANT ORDERINGS DIVIDED OUT, NEVER LEFT AS A NAIVE n!: '
      + 'arranging the letters of "BANANA" (1 B, 3 A\'s, 2 N\'s) is NOT 6!=720, since swapping two '
      + 'identical A\'s (or the two identical N\'s) produces an arrangement that LOOKS the same but '
      + 'would be counted as different by the naive factorial. The correction '
      + '6!/(1!×3!×2!)=720/(1×6×2)=60 divides out exactly those redundant internal orderings of the '
      + 'identical copies.\n\n'
      + 'A CIRCULAR ARRANGEMENT IS (n-1)!, NEVER THE LINEAR n!: seating 5 distinct people around a '
      + 'round table gives (5-1)!=4!=24, NOT 5!=120 — since rotating the WHOLE arrangement produces '
      + 'what counts as the SAME arrangement (there is no fixed starting point), fixing one person\'s '
      + 'seat and arranging the rest relative to it removes exactly the redundant rotations. A fourth '
      + 'variant, permutations WITH REPETITION allowed (e.g. a 3-digit lock code from digits 0-9, '
      + 'repeats allowed), gives MORE than P(n,r): 10³=1000, since each position independently has '
      + 'all 10 digits available, with nothing ever "used up."',
    targetedMisconceptions: [`${PERMUTATIONS}:MC-1`, `${PERMUTATIONS}:MC-2`, `${PERMUTATIONS}:MC-3`],
    source: eb(PERMUTATIONS, 'Core Understanding — the order-matters test as the sole criterion for whether a permutation formula applies, dividing out identical objects\' redundant orderings, and circular permutations as (n-1)! never the linear n!'),
  },
  {
    conceptId: GRAPH_CONNECTIVITY, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'A PATH NEVER REVISITS A VERTEX — NEVER A GENERAL WALK: in a graph with V={A,B,C,D}, edges '
      + 'A-B, B-C, C-D, D-A, the sequence A,B,C is a valid PATH (distinct vertices throughout); '
      + 'A,B,C,D,A is a valid CYCLE (closed, distinct except for the repeated start/end); but A,B,A,C '
      + 'is NEITHER, since it revisits A mid-sequence — the distinctness requirement is what '
      + 'separates a path from a general "walk" that might retrace its steps.\n\n'
      + 'CONNECTEDNESS IS A UNIVERSAL CLAIM, CONFIRMED ONLY BY SYSTEMATIC SEARCH, NEVER BY SAMPLING A '
      + 'FEW PAIRS: for V={A,B,C,D,E} with edges A-B, B-C, D-E (two separate pieces), tracing from A '
      + 'reaches only {A,B,C}, never D or E — since no path connects {A,B,C} to {D,E}, the graph is '
      + 'DISCONNECTED. Finding this ONE unreachable pair is sufficient to prove disconnection; '
      + 'conversely, checking even many pairs and finding them all connected can never CONFIRM '
      + 'connectedness — it can only fail to find a counterexample. Only a full systematic trace from '
      + 'every vertex settles the question.\n\n'
      + 'DIRECTED REACHABILITY IS NEVER AUTOMATICALLY SYMMETRIC — STRONG CONNECTIVITY DEMANDS MUTUAL '
      + 'REACHABILITY FOR EVERY PAIR IN BOTH DIRECTIONS, NEVER MERELY "CAN REACH SOMEWHERE": for a '
      + 'directed graph with A→B, B→C, C→A, every pair is mutually reachable — STRONGLY CONNECTED. '
      + 'But modified to A→B, B→C only (no return edges): from A, both B and C are reachable, yet C '
      + 'has NO path back to A or B at all — this graph is NOT strongly connected, despite every '
      + 'vertex being able to reach somewhere. "Every vertex can reach at least one other vertex" is '
      + 'a strictly WEAKER condition than strong connectivity, never sufficient for it.',
    targetedMisconceptions: [`${GRAPH_CONNECTIVITY}:MC-1`, `${GRAPH_CONNECTIVITY}:MC-2`, `${GRAPH_CONNECTIVITY}:MC-3`],
    source: eb(GRAPH_CONNECTIVITY, 'Core Understanding — paths defined by the distinctness requirement never a general walk, connectedness as a universal claim confirmed only by systematic search, and strong connectivity requiring mutual reachability for every pair never merely partial reachability'),
  },
  {
    conceptId: RECURRENCE_RELATION, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'A REPEATED CHARACTERISTIC ROOT REQUIRES THE ADJUSTED FORM (A+Bn)rⁿ, NEVER THE DISTINCT-ROOTS '
      + 'FORM WHICH COLLAPSES: for aₙ=4aₙ₋₁-4aₙ₋₂, hypothesizing aₙ=rⁿ gives the characteristic '
      + 'equation (r-2)²=0, a REPEATED root r=2. Applying the distinct-roots template directly as '
      + 'A(2ⁿ)+B(2ⁿ) algebraically COLLAPSES to (A+B)2ⁿ — a single effective constant, unable to fit '
      + 'TWO independent initial conditions. The correct adjusted form aₙ=(A+Bn)rⁿ carries an extra '
      + 'genuine degree of freedom precisely because a repeated root loses one otherwise, restoring '
      + 'the ability to match both initial conditions.\n\n'
      + 'A BARE RECURRENCE RULE NEVER DETERMINES A UNIQUE SEQUENCE WITHOUT INITIAL CONDITIONS: the '
      + 'rule aₙ=2aₙ₋₁ alone does not specify a₀ — starting from a₀=0 produces the sequence '
      + '0,0,0,0,...; starting from a₀=5 produces 5,10,20,40,... — two ENTIRELY DIFFERENT but EQUALLY '
      + 'VALID sequences satisfying the IDENTICAL rule. The recurrence rule and the initial '
      + 'condition(s) are both required; neither alone is enough (the Fibonacci recurrence '
      + 'Fₙ=Fₙ₋₁+Fₙ₋₂ similarly requires the stated F₀=0, F₁=1 to pin down THE Fibonacci sequence '
      + 'specifically).\n\n'
      + '"ORDER" AND "DEGREE" ARE GENUINELY DIFFERENT QUANTITIES, NEVER SYNONYMS: a recurrence\'s '
      + 'ORDER (how many previous terms it references — Fibonacci is order 2, since Fₙ depends on '
      + 'Fₙ₋₁ and Fₙ₋₂) describes the RECURRENCE itself; the characteristic equation\'s DEGREE '
      + 'describes the associated CHARACTERISTIC POLYNOMIAL. For a simple linear constant-'
      + 'coefficient recurrence these two numbers happen to COINCIDE (both 2 for Fibonacci), but '
      + 'they describe different objects — a numeric coincidence in this simple case, never a '
      + 'reason to treat the two terms as interchangeable.',
    targetedMisconceptions: [`${RECURRENCE_RELATION}:MC-1`, `${RECURRENCE_RELATION}:MC-2`, `${RECURRENCE_RELATION}:MC-3`],
    source: eb(RECURRENCE_RELATION, 'Core Understanding — the repeated-root case requiring the adjusted form (A+Bn)rⁿ never the collapsing distinct-roots form, a bare recurrence rule never determining a unique sequence without initial conditions, and order versus degree as genuinely different quantities that merely coincide numerically in the simple linear case'),
  },
]

export const MATHEMATICS_DISC_PERMUTATIONS_GRAPH_CONNECTIVITY_RECURRENCE_RELATION_PROBES: SeedProbe[] = [
  {
    conceptId: PERMUTATIONS, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'A teacher must select 3 students from a class of 10 to form a committee, with no distinct roles assigned — just membership. Is this a permutation problem?',
    choices: [
      { text: 'No — swapping which order the 3 students are chosen in produces the SAME committee, so order does not matter here; this is not a permutation problem', isCorrect: true },
      { text: 'Yes — since we are choosing 3 specific people from a larger group of 10, this is a permutation problem just like a race-placement scenario', isCorrect: false, misconceptionId: `${PERMUTATIONS}:MC-1` },
      { text: "Yes, because any 'choose r from n' scenario is automatically a permutation problem", isCorrect: false, misconceptionId: `${PERMUTATIONS}:MC-1` },
    ],
    targetedMisconceptions: [`${PERMUTATIONS}:MC-1`],
    source: eb(PERMUTATIONS, 'Misconceptions MC-1 detection probe (verbatim, Blueprint) — the committee-selection scenario from Example 3, an answer of "yes" confirming PERMUTATION-ASSUMED-SYNONYMOUS-WITH-ANY-SELECTION'),
  },
  {
    conceptId: PERMUTATIONS, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'How many distinct arrangements are there of the letters in "BANANA" (1 B, 3 A\'s, 2 N\'s)?',
    choices: [
      { text: '60 — computed as 6!/(1!×3!×2!)=720/(1×6×2)=60, dividing out the redundant orderings of the identical A\'s and N\'s', isCorrect: true },
      { text: '720 — computed as 6! treating all 6 letters as distinct', isCorrect: false, misconceptionId: `${PERMUTATIONS}:MC-2` },
      { text: "720, since the formula for arranging n items is always n! regardless of whether any are repeated", isCorrect: false, misconceptionId: `${PERMUTATIONS}:MC-2` },
    ],
    targetedMisconceptions: [`${PERMUTATIONS}:MC-2`],
    source: eb(PERMUTATIONS, 'Misconceptions MC-2 detection probe (verbatim, Blueprint) — arrangements of "BANANA," an answer of 720 without adjustment confirming IDENTICAL-OBJECTS-OVERCOUNTED-WITH-NAIVE-FACTORIAL'),
  },
  {
    conceptId: PERMUTATIONS, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'How many ways can 4 distinct people be seated around a round table, where rotations of the same seating are considered identical?',
    choices: [
      { text: '6 — computed as (4-1)!=3!=6, fixing one person\'s seat to remove the redundant rotations of the whole arrangement', isCorrect: true },
      { text: '24 — computed as the full linear count 4!=24', isCorrect: false, misconceptionId: `${PERMUTATIONS}:MC-3` },
      { text: "24, since seating people around a table uses the same formula as seating them in a row", isCorrect: false, misconceptionId: `${PERMUTATIONS}:MC-3` },
    ],
    targetedMisconceptions: [`${PERMUTATIONS}:MC-3`],
    source: eb(PERMUTATIONS, 'Misconceptions MC-3 detection probe (verbatim, Blueprint) — seating 4 people around a round table, an answer of 24 without adjustment confirming CIRCULAR-PERMUTATION-COUNTED-AS-LINEAR'),
  },
  {
    conceptId: GRAPH_CONNECTIVITY, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'In a directed graph, every vertex can reach at least one other vertex. Is the graph automatically strongly connected?',
    choices: [
      { text: 'No — strong connectivity requires EVERY pair of vertices to be mutually reachable in BOTH directions, which is a strictly stronger requirement than merely "every vertex can reach somewhere"', isCorrect: true },
      { text: 'Yes — if every vertex can reach at least one other vertex, the graph must be strongly connected', isCorrect: false, misconceptionId: `${GRAPH_CONNECTIVITY}:MC-1` },
      { text: "Yes, since being able to reach something is basically the same as being fully connected in both directions", isCorrect: false, misconceptionId: `${GRAPH_CONNECTIVITY}:MC-1` },
    ],
    targetedMisconceptions: [`${GRAPH_CONNECTIVITY}:MC-1`],
    source: eb(GRAPH_CONNECTIVITY, 'Misconceptions MC-1 detection probe — a directed graph where every vertex can reach somewhere, an answer of "yes" confirming PARTIAL-REACHABILITY-ASSUMED-SUFFICIENT-FOR-STRONG-CONNECTIVITY'),
  },
  {
    conceptId: GRAPH_CONNECTIVITY, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Is the sequence A,B,A,C a valid path?',
    choices: [
      { text: 'No — a path requires DISTINCT vertices throughout; this sequence revisits A mid-route, so it is not a valid path', isCorrect: true },
      { text: 'Yes — as long as the sequence eventually reaches its destination, revisiting a vertex along the way is allowed in a path', isCorrect: false, misconceptionId: `${GRAPH_CONNECTIVITY}:MC-2` },
      { text: "Yes, since a path is just any route between two vertices, regardless of whether it repeats a vertex", isCorrect: false, misconceptionId: `${GRAPH_CONNECTIVITY}:MC-2` },
    ],
    targetedMisconceptions: [`${GRAPH_CONNECTIVITY}:MC-2`],
    source: eb(GRAPH_CONNECTIVITY, 'Misconceptions MC-2 detection probe — the sequence A,B,A,C, an answer of "yes" confirming PATH-DEFINITION-ALLOWS-REPEATED-VERTICES'),
  },
  {
    conceptId: GRAPH_CONNECTIVITY, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'You check 3 pairs of vertices in a 10-vertex graph and all 3 pairs have a connecting path. Is the graph connected?',
    choices: [
      { text: 'Not necessarily — connectedness requires EVERY pair to have a path, and checking only a sample can never confirm this; only a systematic search (or finding one unreachable pair) settles the question', isCorrect: true },
      { text: 'Yes — since the 3 checked pairs are all connected, the graph is connected', isCorrect: false, misconceptionId: `${GRAPH_CONNECTIVITY}:MC-3` },
      { text: "Yes, probably, since a large enough sample of connected pairs is good evidence the whole graph is connected", isCorrect: false, misconceptionId: `${GRAPH_CONNECTIVITY}:MC-3` },
    ],
    targetedMisconceptions: [`${GRAPH_CONNECTIVITY}:MC-3`],
    source: eb(GRAPH_CONNECTIVITY, 'Misconceptions MC-3 detection probe — checking only 3 pairs in a 10-vertex graph, an answer of "yes" confirming CONNECTEDNESS-VERIFIED-BY-CHECKING-ONLY-A-FEW-PAIRS'),
  },
  {
    conceptId: RECURRENCE_RELATION, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'For aₙ=4aₙ₋₁-4aₙ₋₂, the characteristic equation is (r-2)²=0, giving a REPEATED root r=2. Can the distinct-roots form A(2ⁿ)+B(2ⁿ) correctly fit two different initial conditions?',
    choices: [
      { text: 'No — A(2ⁿ)+B(2ⁿ) algebraically collapses to (A+B)2ⁿ, a single effective constant, which cannot independently fit two conditions; the correct adjusted form is (A+Bn)2ⁿ', isCorrect: true },
      { text: 'Yes — A(2ⁿ)+B(2ⁿ) works the same way regardless of whether the root is distinct or repeated', isCorrect: false, misconceptionId: `${RECURRENCE_RELATION}:MC-1` },
      { text: "Yes, since A and B can always be chosen independently to fit any two initial conditions", isCorrect: false, misconceptionId: `${RECURRENCE_RELATION}:MC-1` },
    ],
    targetedMisconceptions: [`${RECURRENCE_RELATION}:MC-1`],
    source: eb(RECURRENCE_RELATION, 'Misconceptions MC-1 — a repeated-root recurrence, the distinct-roots form applied directly, an answer of "yes" confirming DISTINCT-ROOTS-FORM-APPLIED-TO-REPEATED-ROOTS'),
  },
  {
    conceptId: RECURRENCE_RELATION, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Does the rule aₙ=2aₙ₋₁ alone fully determine a unique sequence?',
    choices: [
      { text: 'No — the rule alone does not specify a₀; a₀=0 gives 0,0,0,... while a₀=5 gives 5,10,20,..., two entirely different but equally valid sequences satisfying the identical rule', isCorrect: true },
      { text: 'Yes — the recurrence rule alone is a complete, self-contained definition of one specific sequence', isCorrect: false, misconceptionId: `${RECURRENCE_RELATION}:MC-2` },
      { text: "Yes, since a recurrence relation is a full equation and doesn't need any additional information to define its sequence", isCorrect: false, misconceptionId: `${RECURRENCE_RELATION}:MC-2` },
    ],
    targetedMisconceptions: [`${RECURRENCE_RELATION}:MC-2`],
    source: eb(RECURRENCE_RELATION, 'Misconceptions MC-2 — the bare rule aₙ=2aₙ₋₁, an answer of "yes" confirming INITIAL-CONDITIONS-OMITTED-AS-UNNECESSARY'),
  },
  {
    conceptId: RECURRENCE_RELATION, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'The Fibonacci recurrence Fₙ=Fₙ₋₁+Fₙ₋₂ has order 2, and its characteristic equation r²=r+1 has degree 2. Are "order" and "degree" simply two names for the same idea?',
    choices: [
      { text: 'No — order describes how many previous terms the RECURRENCE itself references, while degree describes the CHARACTERISTIC POLYNOMIAL\'s own degree; they happen to coincide numerically here but describe genuinely different objects', isCorrect: true },
      { text: 'Yes — since they give the same number (2) for Fibonacci, "order" and "degree" are interchangeable terms for the same concept', isCorrect: false, misconceptionId: `${RECURRENCE_RELATION}:MC-3` },
      { text: "Yes, because any recurrence's order and its characteristic equation's degree are always defined identically", isCorrect: false, misconceptionId: `${RECURRENCE_RELATION}:MC-3` },
    ],
    targetedMisconceptions: [`${RECURRENCE_RELATION}:MC-3`],
    source: eb(RECURRENCE_RELATION, 'Misconceptions MC-3 — Fibonacci\'s order 2 and characteristic degree 2, an answer of "yes" confirming ORDER-CONFLATED-WITH-DEGREE'),
  },
]
