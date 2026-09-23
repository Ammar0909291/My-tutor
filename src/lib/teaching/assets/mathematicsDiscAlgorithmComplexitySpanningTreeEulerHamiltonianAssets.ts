/**
 * Batch: algorithm-complexity, spanning-tree, euler-hamiltonian (math.disc).
 *
 * Continues math.disc (18/32 -> 21/32) after the generating-functions/
 * divide-conquer-recurrence/graph-types batch. Fresh frontier recompute
 * found 13 ready concepts; these 3 selected for downstream value:
 * algorithm-complexity unlocks complexity-classes, while spanning-tree and
 * euler-hamiltonian close out the remaining graph-connectivity/graph-trees
 * children opened in earlier batches. Transcribed from the frozen
 * Educational Brain entries at educational-brain/concepts/mathematics/
 * math.disc.{algorithm-complexity,spanning-tree,euler-hamiltonian}.md.
 *
 * Grade band: algorithm-complexity (EB difficulty "proficient") directly
 * requires math.disc.asymptotic-notation and math.disc.divide-conquer-
 * recurrence, both already seeded GradeBand.UNDERGRADUATE this campaign —
 * GradeBand.UNDERGRADUATE adopted. spanning-tree and euler-hamiltonian
 * (both EB difficulty "proficient") have sole prerequisites math.disc.
 * graph-trees and math.disc.graph-connectivity respectively, both
 * GradeBand.HIGH — GradeBand.HIGH retained, consistent with the domain's
 * graph-theory subtree.
 *
 *   ALGORITHM-COMPLEXITY  NESTED loops MULTIPLY their iteration counts,
 *           never add — an outer-n/inner-n nested pair is Θ(n²), never
 *           Θ(n); "the complexity" of an algorithm is an incomplete claim
 *           until best/worst/average case is specified, since the same
 *           algorithm can genuinely differ between them; asymptotic
 *           comparison is about behavior as n grows large, NEVER decided
 *           by wall-clock performance on a small fixed input.
 *   SPANNING-TREE  A spanning tree must independently satisfy BOTH
 *           spanning (every vertex) AND tree (connected, acyclic) —
 *           satisfying spanning alone is never sufficient; Kruskal's and
 *           Prim's greedy choices are PROVABLY globally optimal via the
 *           cut property, never merely "usually good" the way TSP's
 *           greedy heuristics are; the MST is unique ONLY when all edge
 *           weights are distinct — tied weights can produce multiple
 *           distinct MSTs of equal total weight, never a guaranteed
 *           single MST.
 *   EULER-HAMILTONIAN  Eulerian circuit existence is determined by
 *           COUNTING DEGREES alone — a connected graph has one iff every
 *           vertex has even degree, never requiring an attempted trace;
 *           exactly two odd-degree vertices still guarantees an open
 *           Eulerian PATH, never "no Eulerian structure at all"; Eulerian
 *           and Hamiltonian properties are logically INDEPENDENT, never
 *           implying each other, governed by genuinely different
 *           complexity classes (efficient vs. NP-complete).
 *
 * Seeded as DRAFT. Promotion stays human.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedExplanation, SeedProbe } from './brainSeedAssets'

const S = 'mathematics'
const eb = (id: string, what: string) =>
  `educational-brain/concepts/mathematics/${id}.md — ${what}`

const ALGORITHM_COMPLEXITY = 'math.disc.algorithm-complexity'
const SPANNING_TREE = 'math.disc.spanning-tree'
const EULER_HAMILTONIAN = 'math.disc.euler-hamiltonian'

export const MATHEMATICS_DISC_ALGORITHM_COMPLEXITY_SPANNING_TREE_EULER_HAMILTONIAN_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: ALGORITHM_COMPLEXITY, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'NESTED LOOPS MULTIPLY THEIR ITERATION COUNTS, NEVER ADD: an outer loop of n iterations '
      + 'wrapping an inner loop of n iterations performs n·n=n² total inner-loop executions — the '
      + 'inner loop truly runs n times for EACH of the n outer iterations, never n+n=2n. In '
      + 'contrast, SEQUENTIAL loops (one after another, not nested) genuinely ADD their costs: an '
      + 'O(n) loop followed by a separate O(n) loop is still O(n) overall, since O(n)+O(n)=O(n) '
      + "under Big-O's additive-dominance rule. Whether two loop structures combine by "
      + 'multiplication or addition is decided entirely by "inside or beside," never by the number '
      + 'of loops alone.\n\n'
      + '"THE COMPLEXITY" OF AN ALGORITHM IS AN INCOMPLETE CLAIM UNTIL BEST/WORST/AVERAGE CASE IS '
      + 'SPECIFIED: linear search through an unsorted array of n elements does O(1) work in the '
      + 'best case (target found first), O(n) work in the worst case (target last or absent), and '
      + 'Θ(n) work on average (roughly n/2 comparisons) — the SAME algorithm genuinely differs by '
      + 'more than a constant factor between best and worst case. Stating a complexity without '
      + 'naming which case is being described is never a complete claim.\n\n'
      + 'ASYMPTOTIC COMPARISON IS ABOUT BEHAVIOR AS n GROWS LARGE, NEVER DECIDED BY WALL-CLOCK '
      + 'PERFORMANCE ON A SMALL FIXED INPUT: an O(n²) algorithm with very low constant overhead can '
      + 'genuinely run FASTER than an O(n log n) algorithm with higher constant overhead on small '
      + 'n — but the asymptotically superior O(n log n) algorithm always overtakes it once n grows '
      + 'large enough. Judging which algorithm "wins" from a small-input benchmark alone says '
      + 'nothing about which one scales better. Recursive algorithms are analyzed via the recursion '
      + 'tree or, for the divide-and-conquer shape T(n)=aT(n/b)+f(n), the Master Theorem directly — '
      + 'both must agree when both apply, and cross-checking one against the other is a genuine '
      + 'correctness check, never a redundant repetition.',
    targetedMisconceptions: [`${ALGORITHM_COMPLEXITY}:MC-1`, `${ALGORITHM_COMPLEXITY}:MC-2`, `${ALGORITHM_COMPLEXITY}:MC-3`],
    source: eb(ALGORITHM_COMPLEXITY, 'Core Understanding — nested loops multiplying iteration counts never adding, "the complexity" as an incomplete claim without specifying best/worst/average case, and asymptotic comparison as a claim about large-n behavior never decided by small-input wall-clock performance'),
  },
  {
    conceptId: SPANNING_TREE, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'A SPANNING TREE MUST INDEPENDENTLY SATISFY BOTH SPANNING AND TREE — SATISFYING SPANNING '
      + 'ALONE IS NEVER SUFFICIENT: for K₄ with edges {1-2,1-3,2-3,3-4} (4 edges), every vertex is '
      + 'touched (the SPANNING half holds), but 1-2-3-1 is a cycle, so this is a spanning connected '
      + 'SUBGRAPH, NOT a spanning tree — a genuine spanning tree needs exactly n-1=3 edges, '
      + 'connected AND acyclic, per the already-established tree definition. Removing the most '
      + 'expensive edge of that cycle (1-2) leaves {1-3,2-3,3-4} — connected, acyclic, exactly 3 '
      + 'edges — a genuine spanning tree.\n\n'
      + "KRUSKAL'S AND PRIM'S GREEDY CHOICES ARE PROVABLY GLOBALLY OPTIMAL VIA THE CUT PROPERTY, "
      + 'NEVER MERELY "USUALLY GOOD" THE WAY TSP\'S GREEDY HEURISTICS ARE: when Kruskal considers '
      + 'the next cheapest edge e=(u,v), the vertices already connected to u form one side of a '
      + 'cut, and e is that cut\'s minimum-weight crossing edge (every cheaper edge was already '
      + 'processed) — the CUT PROPERTY certifies this locally cheapest choice belongs to some MST, '
      + 'every single time. This is a genuine structural guarantee MST has that the Travelling '
      + 'Salesman Problem does NOT share (where a locally cheap edge can strand the tour, forcing '
      + 'an expensive one later) — MST\'s cuts are independent of prior choices, while TSP\'s partial '
      + 'tours are not.\n\n'
      + 'THE MST IS UNIQUE ONLY WHEN ALL EDGE WEIGHTS ARE DISTINCT — TIED WEIGHTS CAN PRODUCE '
      + 'MULTIPLE DISTINCT MSTs OF EQUAL TOTAL WEIGHT, NEVER A GUARANTEED SINGLE MST: with distinct '
      + 'weights, any two supposedly-different MSTs can be shown to force a strictly cheaper '
      + 'alternative, a contradiction — so uniqueness is proven. But when two edges genuinely tie '
      + 'in weight and are interchangeable, swapping between them (with everything else fixed) '
      + 'produces two literally different spanning trees sharing the identical minimum total '
      + 'weight. Uniqueness is a property of the WEIGHTS, never an automatic guarantee bundled with '
      + 'the MST concept itself.',
    targetedMisconceptions: [`${SPANNING_TREE}:MC-1`, `${SPANNING_TREE}:MC-2`, `${SPANNING_TREE}:MC-3`],
    source: eb(SPANNING_TREE, "Core Understanding — a spanning tree requiring both the spanning and tree conditions independently never spanning alone, Kruskal's/Prim's cut-property-proven global optimality never a merely-usually-good heuristic like TSP's, and MST uniqueness as earned specifically by distinct weights never an automatic guarantee"),
  },
  {
    conceptId: EULER_HAMILTONIAN, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'EULERIAN CIRCUIT EXISTENCE IS DETERMINED BY COUNTING DEGREES ALONE, NEVER REQUIRING AN '
      + 'ATTEMPTED TRACE: a connected graph has an Eulerian circuit if and only if EVERY vertex has '
      + 'EVEN degree. For a 4-cycle A,B,C,D, every vertex has degree 2 (even) — a circuit exists, '
      + 'confirmed by tracing A→B→C→D→A. Adding the diagonal A-C makes A,C degree 3 (odd) — Euler\'s '
      + "theorem immediately says NO circuit exists, determined purely by recomputing degrees; no "
      + 'attempted trace, successful or failed, ever enters into the determination.\n\n'
      + 'EXACTLY TWO ODD-DEGREE VERTICES STILL GUARANTEES AN OPEN EULERIAN PATH, NEVER "NO EULERIAN '
      + 'STRUCTURE AT ALL": Königsberg\'s four landmasses have degrees 3,3,3,5 — all odd, so no '
      + 'Eulerian circuit exists (Euler\'s 1736 resolution). But a path graph A-B-C-D-E has degrees '
      + '1,2,2,2,1 — exactly two odd vertices (A,E) — failing the all-even circuit condition, yet '
      + 'still satisfying the open-path condition: A→B→C→D→E uses every edge exactly once. The '
      + 'precise rule is exactly 0 OR 2 odd vertices for the path case, never "zero only."\n\n'
      + 'EULERIAN AND HAMILTONIAN PROPERTIES ARE LOGICALLY INDEPENDENT, NEVER IMPLYING EACH OTHER, '
      + 'GOVERNED BY GENUINELY DIFFERENT COMPLEXITY CLASSES: the "bowtie" graph (two triangles '
      + 'sharing vertex C) has all vertices even degree (C has degree 4, others degree 2), so an '
      + 'Eulerian circuit exists — but C is the ONLY connection between the two triangles, so any '
      + 'cycle visiting every vertex exactly once cannot connect both triangles without revisiting '
      + 'C — no Hamiltonian cycle exists. One graph, one property present, the other genuinely '
      + 'absent. Eulerian existence is efficiently checkable (O(V), pure arithmetic); Hamiltonian '
      + 'existence is NP-complete in general — a genuine complexity-class gap, never merely a '
      + 'difference of degree, despite the superficially similar "visit everything exactly once" '
      + 'framing.',
    targetedMisconceptions: [`${EULER_HAMILTONIAN}:MC-1`, `${EULER_HAMILTONIAN}:MC-2`, `${EULER_HAMILTONIAN}:MC-3`],
    source: eb(EULER_HAMILTONIAN, "Core Understanding — Eulerian circuit existence determined by counting degrees alone never requiring a trace, exactly two odd-degree vertices still guaranteeing an open Eulerian path never total failure, and Eulerian/Hamiltonian as logically independent properties governed by genuinely different complexity classes"),
  },
]

export const MATHEMATICS_DISC_ALGORITHM_COMPLEXITY_SPANNING_TREE_EULER_HAMILTONIAN_PROBES: SeedProbe[] = [
  {
    conceptId: ALGORITHM_COMPLEXITY, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'A loop of n iterations sits INSIDE another loop of n iterations. Does the inner loop run a total of n times, or n times for EACH pass of the outer loop?',
    choices: [
      { text: 'n times for EACH pass of the outer loop, giving n·n=n² total inner-loop executions — nested loops multiply their iteration counts', isCorrect: true },
      { text: 'A total of n times overall, giving O(n)+O(n)=O(n) for the combined structure', isCorrect: false, misconceptionId: `${ALGORITHM_COMPLEXITY}:MC-1` },
      { text: "n times total, since two loops of n iterations each should be added together regardless of whether they are nested or sequential", isCorrect: false, misconceptionId: `${ALGORITHM_COMPLEXITY}:MC-1` },
    ],
    targetedMisconceptions: [`${ALGORITHM_COMPLEXITY}:MC-1`],
    source: eb(ALGORITHM_COMPLEXITY, 'Misconceptions MC-1 detection probe (Discovery Question 1) — a nested pair of n-iteration loops, an additive answer confirming NESTED-LOOP-COMPLEXITIES-ADDED-INSTEAD-OF-MULTIPLIED'),
  },
  {
    conceptId: ALGORITHM_COMPLEXITY, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Could the very same linear search algorithm take a different number of steps depending on WHERE in the array the target happens to be?',
    choices: [
      { text: 'Yes — best case (target first) is O(1), worst case (target last or absent) is O(n), and average case is Θ(n); stating "the complexity" without naming which case is meant is an incomplete claim', isCorrect: true },
      { text: 'No — an algorithm has one single complexity that applies regardless of where the target is located', isCorrect: false, misconceptionId: `${ALGORITHM_COMPLEXITY}:MC-2` },
      { text: "No, since the number of steps an algorithm takes doesn't depend on the specific input, only on the input size", isCorrect: false, misconceptionId: `${ALGORITHM_COMPLEXITY}:MC-2` },
    ],
    targetedMisconceptions: [`${ALGORITHM_COMPLEXITY}:MC-2`],
    source: eb(ALGORITHM_COMPLEXITY, 'Misconceptions MC-2 detection probe (Discovery Question 2) — linear search\'s case-dependent step count, a denial that cases differ confirming ALGORITHM-COMPLEXITY-REPORTED-WITHOUT-SPECIFYING-CASE'),
  },
  {
    conceptId: ALGORITHM_COMPLEXITY, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'If Algorithm A (O(n²), low constant overhead) is faster than Algorithm B (O(n log n), higher constant overhead) on an input of size 10, does that guarantee A is still faster on an input of size 10,000?',
    choices: [
      { text: 'No — asymptotic comparison is about behavior as n grows large; the O(n log n) algorithm B will overtake A once n is large enough, regardless of which one wins at small n', isCorrect: true },
      { text: 'Yes — if A is faster on a specific input, it will remain faster on any larger input as well', isCorrect: false, misconceptionId: `${ALGORITHM_COMPLEXITY}:MC-3` },
      { text: "Yes, since observing which algorithm runs faster on any single benchmark input reliably predicts which one scales better", isCorrect: false, misconceptionId: `${ALGORITHM_COMPLEXITY}:MC-3` },
    ],
    targetedMisconceptions: [`${ALGORITHM_COMPLEXITY}:MC-3`],
    source: eb(ALGORITHM_COMPLEXITY, 'Misconceptions MC-3 detection probe (Discovery Question 3) — Algorithm A faster at n=10, an assumption this holds at n=10,000 confirming SMALL-INPUT-PERFORMANCE-MISTAKEN-FOR-ASYMPTOTIC-COMPARISON'),
  },
  {
    conceptId: SPANNING_TREE, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Is a connected subgraph that touches every vertex of G, but also contains a cycle, a spanning tree?',
    choices: [
      { text: 'No — a spanning tree must independently satisfy BOTH conditions: spans every vertex AND is a tree (connected, acyclic); a cycle-containing subgraph fails the tree half regardless of spanning every vertex', isCorrect: true },
      { text: 'Yes — since it touches every vertex, the spanning requirement alone is enough to call it a spanning tree', isCorrect: false, misconceptionId: `${SPANNING_TREE}:MC-1` },
      { text: "Yes, because 'spanning' is the defining word, and any extra cycle-forming edges don't disqualify it", isCorrect: false, misconceptionId: `${SPANNING_TREE}:MC-1` },
    ],
    targetedMisconceptions: [`${SPANNING_TREE}:MC-1`],
    source: eb(SPANNING_TREE, 'Misconceptions MC-1 detection probe (verbatim, Blueprint) — a connected, vertex-touching subgraph with a cycle, an answer of "yes" confirming SPANNING-TREE-CAN-HAVE-CYCLES'),
  },
  {
    conceptId: SPANNING_TREE, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: "Does Kruskal's algorithm always find the true minimum spanning tree, or just a reasonably good one?",
    choices: [
      { text: 'Always the true MST — the cut property proves the locally cheapest edge at every step is globally safe, since MST\'s cuts are independent of prior choices, unlike problems (e.g. the Travelling Salesman Problem) where greedy genuinely fails', isCorrect: true },
      { text: "Just a reasonably good one — like other greedy algorithms, it can produce a suboptimal result", isCorrect: false, misconceptionId: `${SPANNING_TREE}:MC-2` },
      { text: "It depends on the graph; Kruskal's is a heuristic that usually works well but isn't provably optimal", isCorrect: false, misconceptionId: `${SPANNING_TREE}:MC-2` },
    ],
    targetedMisconceptions: [`${SPANNING_TREE}:MC-2`],
    source: eb(SPANNING_TREE, "Misconceptions MC-2 detection probe (verbatim, Blueprint) — whether Kruskal's always finds the true MST, an answer expressing doubt confirming KRUSKAL-GREEDY-IS-NOT-GLOBALLY-OPTIMAL"),
  },
  {
    conceptId: SPANNING_TREE, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'A weighted graph has two edges of equal weight, and swapping between them (with everything else fixed) still produces a spanning tree of the same total weight. Is the MST still unique?',
    choices: [
      { text: 'No — when edge weights tie and the tied edges are interchangeable, swapping between them produces two literally different spanning trees sharing the same minimum total weight; uniqueness holds only when all weights are distinct', isCorrect: true },
      { text: 'Yes — the MST is always unique regardless of whether any edge weights tie', isCorrect: false, misconceptionId: `${SPANNING_TREE}:MC-3` },
      { text: "Yes, since the MST is defined as THE minimum spanning tree, implying there is always exactly one", isCorrect: false, misconceptionId: `${SPANNING_TREE}:MC-3` },
    ],
    targetedMisconceptions: [`${SPANNING_TREE}:MC-3`],
    source: eb(SPANNING_TREE, 'Misconceptions MC-3 detection probe (verbatim, Blueprint) — tied, interchangeable edge weights, an answer of "yes" (still unique) confirming MST-IS-UNIQUE'),
  },
  {
    conceptId: EULER_HAMILTONIAN, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'To determine whether a graph has an Eulerian circuit, do you need to attempt tracing a route and see if it works?',
    choices: [
      { text: 'No — Euler\'s theorem gives a direct, efficient arithmetic answer: a connected graph has an Eulerian circuit if and only if every vertex has even degree, determined purely by counting degrees, with no trace attempt needed', isCorrect: true },
      { text: 'Yes — the only way to determine existence is to attempt tracing a route and check whether it succeeds', isCorrect: false, misconceptionId: `${EULER_HAMILTONIAN}:MC-1` },
      { text: "Yes, since there's no shortcut for Eulerian circuit existence besides trial-and-error tracing", isCorrect: false, misconceptionId: `${EULER_HAMILTONIAN}:MC-1` },
    ],
    targetedMisconceptions: [`${EULER_HAMILTONIAN}:MC-1`],
    source: eb(EULER_HAMILTONIAN, 'Misconceptions MC-1 detection probe (verbatim, Blueprint) — whether tracing is required to determine Eulerian circuit existence, an answer of "yes" confirming TRACING-REQUIRED-TO-DETERMINE-EXISTENCE'),
  },
  {
    conceptId: EULER_HAMILTONIAN, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'A connected graph has exactly two odd-degree vertices. Does it have any Eulerian structure at all?',
    choices: [
      { text: 'Yes — exactly two odd-degree vertices guarantees an open Eulerian PATH between those two vertices, even though it fails the all-even CIRCUIT condition; failing the circuit test is not the same as failing every Eulerian condition', isCorrect: true },
      { text: 'No — any odd-degree vertex rules out all Eulerian structure entirely', isCorrect: false, misconceptionId: `${EULER_HAMILTONIAN}:MC-2` },
      { text: "No, since Euler's theorem requires every vertex to have even degree with no exceptions or intermediate cases", isCorrect: false, misconceptionId: `${EULER_HAMILTONIAN}:MC-2` },
    ],
    targetedMisconceptions: [`${EULER_HAMILTONIAN}:MC-2`],
    source: eb(EULER_HAMILTONIAN, 'Misconceptions MC-2 detection probe (verbatim, Blueprint) — a graph with exactly two odd-degree vertices, an answer of "no" confirming ODD-VERTICES-IMPLY-NO-EULERIAN-STRUCTURE'),
  },
  {
    conceptId: EULER_HAMILTONIAN, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'If a graph has an Eulerian circuit, must it also have a Hamiltonian cycle?',
    choices: [
      { text: 'No — the two properties are logically independent; the bowtie graph (two triangles sharing one vertex) has an Eulerian circuit (all vertices even degree) but NO Hamiltonian cycle, since the shared vertex is the only connection between the triangles', isCorrect: true },
      { text: 'Yes — a graph with an Eulerian circuit is guaranteed to also have a Hamiltonian cycle', isCorrect: false, misconceptionId: `${EULER_HAMILTONIAN}:MC-3` },
      { text: "Yes, since both properties mean 'visit everything exactly once,' so one implies the other", isCorrect: false, misconceptionId: `${EULER_HAMILTONIAN}:MC-3` },
    ],
    targetedMisconceptions: [`${EULER_HAMILTONIAN}:MC-3`],
    source: eb(EULER_HAMILTONIAN, 'Misconceptions MC-3 detection probe (verbatim, Blueprint) — whether an Eulerian circuit implies a Hamiltonian cycle, an answer of "yes" confirming EULERIAN-IMPLIES-HAMILTONIAN'),
  },
]
