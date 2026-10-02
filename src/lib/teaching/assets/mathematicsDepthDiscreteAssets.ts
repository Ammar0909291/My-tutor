/**
 * MATHEMATICS — probe DEPTH, batch 15: math.disc (32 (concept, band) pairs, 64 probes).
 *
 * Why depth, and the identity rule every probe here obeys, are stated once in
 * mathematicsDepthArithAssets.ts (batch 1): five gradeable probes per pair so a
 * learner recovers from one or two mistakes on questions they have not seen;
 * every probe extends the pair's existing ladder slot at an unused difficulty
 * rung, so no seeded probe is re-identified.
 *
 * Every count was worked by hand, e.g. 26 · 25 · 24 · 10³ = 15,600,000,
 * C(4, 1) · C(6, 2) = 60, D(4) = 9 and 44/120 ≈ 0.37, a tree with four
 * degree-3 vertices has 12 + L = 2(3 + L) so L = 6, 50 + 20 − 10 = 60,
 * aₙ = 3ⁿ − 2ⁿ from a₀ = 0, a₁ = 1, and Cayley's 4² = 16 spanning trees of K₄.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedProbe } from './brainSeedAssets'

const S = 'mathematics'
const { HIGH, UNDERGRADUATE: UG } = GradeBand
const { DEVELOPING: D, ADVANCED: A } = ProbeDifficulty

function q(
  conceptId: string, gradeBand: GradeBand, difficulty: ProbeDifficulty,
  stem: string, correct: string, wrong: string[], what: string,
): SeedProbe {
  return {
    conceptId, subjectSlug: S, probeKind: 'mcq', gradeBand, difficulty, stem,
    choices: [{ text: correct, isCorrect: true }, ...wrong.map((text) => ({ text, isCorrect: false }))],
    correctValue: correct,
    targetedMisconceptions: [],
    source: `educational-brain/concepts/mathematics/${conceptId}.md — probe-depth set 2026-10-02: ${what}`,
  }
}

export const MATHEMATICS_DEPTH_DISCRETE_PROBES: SeedProbe[] = [
  q('math.disc.algorithm-complexity', UG, D, 'What is the running time of binary search on n sorted items?', 'O(log n)', ['O(n)', 'O(n log n)', 'O(1)'], 'the range halves each step'),
  q('math.disc.algorithm-complexity', UG, A, 'For i from 1 to n, an inner loop runs j from 1 to i doing O(1) work. What is the total running time?', 'O(n²)', ['O(n)', 'O(n log n)', 'O(n³)'], '1 + 2 + ⋯ + n = n(n + 1)/2'),

  q('math.disc.asymptotic-notation', UG, D, 'Which statement is true?', '5n² + 3n = Θ(n²)', ['5n² + 3n = Θ(n³)', '5n² + 3n = Θ(n)', '5n² + 3n = O(n)'], 'the leading term sets the class; constants do not'),
  q('math.disc.asymptotic-notation', UG, A, 'Which list orders the functions from slowest to fastest growth?', 'log n, √n, n, n log n', ['√n, log n, n, n log n', 'n, log n, √n, n log n', 'log n, n, √n, n log n'], 'log n grows slower than any positive power of n'),

  q('math.disc.binomial-theorem', HIGH, D, 'What is the coefficient of x³ in (1 + x)⁵?', '10', ['5', '3', '15'], 'C(5, 3)'),
  q('math.disc.binomial-theorem', HIGH, A, 'What is C(6, 0) + C(6, 1) + ⋯ + C(6, 6)?', '64', ['36', '720', '6'], 'set x = 1 in (1 + x)⁶'),

  q('math.disc.boolean-circuits', HIGH, D, 'What does a NAND gate output when both inputs are 1?', '0', ['1', '2', 'It depends on the circuit'], 'NOT (1 AND 1)'),
  q('math.disc.boolean-circuits', HIGH, A, 'How many rows does the truth table of a 4-input Boolean function have?', '16', ['8', '4', '256'], 'one row per input combination: 2⁴'),

  q('math.disc.catalan-numbers', UG, D, 'What is the Catalan number C₃?', '5', ['6', '3', '14'], 'C(6, 3)/4 = 20/4'),
  q('math.disc.catalan-numbers', UG, A, 'In how many ways can a convex hexagon be cut into triangles by non-crossing diagonals?', '14', ['5', '42', '6'], 'an (n + 2)-gon has Cₙ triangulations: C₄'),

  q('math.disc.combinations', HIGH, D, 'How many 2-element subsets does {a, b, c, d, e} have?', '10', ['20', '5', '25'], 'C(5, 2)'),
  q('math.disc.combinations', HIGH, A, 'From 6 men and 4 women, how many 3-person committees contain exactly 1 woman?', '60', ['120', '24', '80'], 'C(4, 1) · C(6, 2) = 4 · 15'),

  q('math.disc.combinatorics', HIGH, D, 'How many binary strings of length 5 are there?', '32', ['10', '25', '120'], '2⁵'),
  q('math.disc.combinatorics', HIGH, A, 'How many 4-digit PINs have four different digits?', '5040', ['10000', '210', '24'], '10 · 9 · 8 · 7'),

  q('math.disc.complexity-classes', UG, D, 'Which problem is known to be in P?', 'Sorting a list', ['Boolean satisfiability (SAT)', 'Deciding a travelling-salesman tour under a bound', 'Graph 3-colouring'], 'n log n comparisons suffice'),
  q('math.disc.complexity-classes', UG, A, 'If some NP-complete problem had a polynomial-time algorithm, what would follow?', 'P = NP', ['P ≠ NP', 'Only that one problem would become easy', 'Nothing about other problems'], 'every NP problem reduces to it'),

  q('math.disc.counting-principles', HIGH, D, 'A password is 2 letters (A–Z) followed by 1 digit. How many passwords are there?', '6760', ['62', '520', '17576'], '26 · 26 · 10'),
  q('math.disc.counting-principles', HIGH, A, 'A plate has 3 letters then 3 digits, with no letter repeated. How many plates are there?', '15,600,000', ['17,576,000', '15,600', '11,232,000'], '26 · 25 · 24 · 10³'),

  q('math.disc.derangements', HIGH, D, 'What is D(4), the number of derangements of 4 items?', '9', ['24', '6', '11'], '24 − 24 + 12 − 4 + 1'),
  q('math.disc.derangements', HIGH, A, 'Five letters go into five addressed envelopes at random. About how likely is it that none is in its own envelope?', 'About 0.37', ['0.5', '0.2', 'About 0.63'], 'D(5)/5! = 44/120, close to 1/e'),

  q('math.disc.divide-conquer-recurrence', UG, D, 'By the master theorem, what is T(n) = 2T(n/2) + n?', 'Θ(n log n)', ['Θ(n)', 'Θ(n²)', 'Θ(log n)'], 'log₂2 = 1 matches f(n) = n'),
  q('math.disc.divide-conquer-recurrence', UG, A, 'By the master theorem, what is T(n) = 4T(n/2) + n?', 'Θ(n²)', ['Θ(n log n)', 'Θ(n)', 'Θ(n² log n)'], 'log₂4 = 2 beats f(n) = n'),

  q('math.disc.egf', UG, D, 'What is the exponential generating function of aₙ = 1?', 'eˣ', ['1/(1 − x)', 'x', 'e⁻ˣ'], 'Σ xⁿ/n!'),
  q('math.disc.egf', UG, A, 'What is the exponential generating function of aₙ = 2ⁿ?', 'e^(2x)', ['1/(1 − 2x)', '2eˣ', 'e^(x²)'], 'Σ (2x)ⁿ/n!'),

  q('math.disc.euler-hamiltonian', HIGH, D, 'Which condition guarantees an Eulerian circuit in a connected graph?', 'Every vertex has even degree', ['Exactly two vertices have odd degree', 'Every vertex has degree at least n/2', 'The graph is complete'], 'Euler\'s theorem'),
  q('math.disc.euler-hamiltonian', HIGH, A, 'Does K₅ have an Eulerian circuit?', 'Yes, every vertex has degree 4', ['No, it has odd-degree vertices', 'No, complete graphs never do', 'It has only an Eulerian path'], 'K₅ is connected with all degrees even'),

  q('math.disc.generating-functions', UG, D, 'Which sequence does 1/(1 − 2x) generate?', '1, 2, 4, 8, …', ['1, 1, 1, 1, …', '2, 2, 2, 2, …', '1, 2, 3, 4, …'], 'a geometric series in 2x'),
  q('math.disc.generating-functions', UG, A, 'What is the coefficient of x³ in 1/(1 − x)²?', '4', ['3', '1', '6'], 'the coefficient of xⁿ is n + 1'),

  q('math.disc.graph-coloring', HIGH, D, 'What is the chromatic number of the 5-cycle C₅?', '3', ['2', '5', '4'], 'an odd cycle cannot be 2-coloured'),
  q('math.disc.graph-coloring', HIGH, A, 'What is the chromatic number of K₄?', '4', ['3', '2', '6'], 'every pair of vertices is adjacent'),

  q('math.disc.graph-connectivity', HIGH, D, 'A 7-vertex graph is a triangle, a separate 3-vertex path and one isolated vertex. How many connected components does it have?', '3', ['1', '7', '2'], 'triangle, path, lone vertex'),
  q('math.disc.graph-connectivity', HIGH, A, 'What is the fewest edges a connected graph on 10 vertices can have?', '9', ['10', '45', '5'], 'a spanning tree has n − 1 edges'),

  q('math.disc.graph-representation', UG, D, 'An undirected graph has 5 vertices and 6 edges. How many 1s are in its adjacency matrix?', '12', ['6', '25', '10'], 'each edge appears at (i, j) and (j, i)'),
  q('math.disc.graph-representation', UG, A, 'How much memory does an adjacency list use for V vertices and E edges?', 'O(V + E)', ['O(V²)', 'O(E²)', 'O(V · E)'], 'one list head per vertex plus one entry per edge end'),

  q('math.disc.graph-trees', HIGH, D, 'How many edges does a tree with 12 vertices have?', '11', ['12', '13', '66'], 'n − 1'),
  q('math.disc.graph-trees', HIGH, A, 'A tree has four vertices of degree 3 and every other vertex is a leaf. How many leaves does it have?', '6', ['4', '8', '12'], 'degree sum 12 + L = 2(4 + L − 1)'),

  q('math.disc.graph-types', HIGH, D, 'How many edges does K₆ have?', '15', ['30', '6', '36'], 'C(6, 2)'),
  q('math.disc.graph-types', HIGH, A, 'How many edges does K₃,₄ have?', '12', ['7', '21', '6'], 'every one of 3 joins every one of 4'),

  q('math.disc.graph', HIGH, D, 'A graph has degrees 3, 3, 2, 2, 2. How many edges does it have?', '6', ['12', '5', '10'], 'the degree sum 12 is twice the edge count'),
  q('math.disc.graph', HIGH, A, 'Can a simple graph have degrees 3, 3, 3, 2?', 'No, the degree sum would be odd', ['Yes, any list of degrees works', 'Yes, if it has a loop', 'No, a degree cannot be 3 with 4 vertices'], 'the handshaking lemma: the sum is 2|E|'),

  q('math.disc.inclusion-exclusion', HIGH, D, '|A| = 20, |B| = 15 and |A ∩ B| = 5. What is |A ∪ B|?', '30', ['35', '40', '25'], '20 + 15 − 5'),
  q('math.disc.inclusion-exclusion', HIGH, A, 'How many integers from 1 to 100 are divisible by 2 or by 5?', '60', ['70', '50', '40'], '50 + 20 − 10'),

  q('math.disc.linear-recurrence', UG, D, 'What is the characteristic equation of aₙ = 5aₙ₋₁ − 6aₙ₋₂?', 'r² − 5r + 6 = 0', ['r² + 5r − 6 = 0', 'r − 5 = 0', 'r² − 6r + 5 = 0'], 'substitute aₙ = rⁿ'),
  q('math.disc.linear-recurrence', UG, A, 'aₙ = 5aₙ₋₁ − 6aₙ₋₂ with a₀ = 0 and a₁ = 1. What is aₙ?', '3ⁿ − 2ⁿ', ['2ⁿ − 3ⁿ', '3ⁿ', '2ⁿ + 3ⁿ'], 'A + B = 0 and 2A + 3B = 1'),

  q('math.disc.ogf', UG, D, 'What is the ordinary generating function of 1, 1, 1, …?', '1/(1 − x)', ['eˣ', 'x/(1 − x)', '1/(1 + x)'], 'the geometric series'),
  q('math.disc.ogf', UG, A, 'Which sequence has ordinary generating function x/(1 − x)²?', '0, 1, 2, 3, …', ['1, 2, 3, 4, …', '1, 1, 1, 1, …', '0, 1, 4, 9, …'], 'x · Σ (n + 1)xⁿ'),

  q('math.disc.permutations', HIGH, D, 'In how many ways can 5 runners take 1st, 2nd and 3rd place?', '60', ['10', '125', '15'], '5 · 4 · 3'),
  q('math.disc.permutations', HIGH, A, 'How many arrangements of the letters of LEVEL are there?', '30', ['120', '60', '20'], '5!/(2! · 2!)'),

  q('math.disc.pigeonhole', HIGH, D, 'A drawer holds red, blue and green socks. How many must you take to be sure of a matching pair?', '4', ['3', '2', '6'], '3 colours are the pigeonholes'),
  q('math.disc.pigeonhole', HIGH, A, 'How many integers from 1 to 20 must you pick to be sure two of them add up to 21?', '11', ['10', '20', '21'], '10 pairs (1, 20), (2, 19), …, (10, 11)'),

  q('math.disc.planar-graph', HIGH, D, 'A connected planar graph has 8 vertices and 12 edges. How many faces does it have?', '6', ['4', '2', '22'], 'V − E + F = 2'),
  q('math.disc.planar-graph', HIGH, A, 'Is K₅ planar?', 'No, it has 10 edges but a planar graph on 5 vertices has at most 9', ['Yes, any 5 points can be drawn without crossings', 'Yes, every complete graph is planar', 'It depends on how it is drawn'], 'E ≤ 3V − 6 = 9'),

  q('math.disc.predicate-logic-disc', HIGH, D, 'What is the negation of ∃x (x > 5)?', '∀x (x ≤ 5)', ['∃x (x ≤ 5)', '∀x (x > 5)', '∃x (x < 5)'], 'swap the quantifier and negate the predicate'),
  q('math.disc.predicate-logic-disc', HIGH, A, 'What is the negation of ∀x ∃y (x + y = 0)?', '∃x ∀y (x + y ≠ 0)', ['∀x ∀y (x + y ≠ 0)', '∃x ∃y (x + y ≠ 0)', '∀x ∃y (x + y ≠ 0)'], 'flip each quantifier in turn'),

  q('math.disc.propositional-logic', HIGH, D, 'When is p → q false?', 'When p is true and q is false', ['When p is false and q is true', 'When both are false', 'Never'], 'the only falsifying row'),
  q('math.disc.propositional-logic', HIGH, A, 'Which formula is equivalent to ¬(p ∧ q)?', '¬p ∨ ¬q', ['¬p ∧ ¬q', 'p ∨ q', '¬p ∧ q'], 'De Morgan\'s law'),

  q('math.disc.recurrence-relation', UG, D, 'a₀ = 2 and aₙ = 3aₙ₋₁. What is a₄?', '162', ['54', '24', '486'], '2 · 3⁴'),
  q('math.disc.recurrence-relation', UG, A, 'aₙ = aₙ₋₁ + 2n with a₀ = 0. What is aₙ?', 'n(n + 1)', ['n²', '2n', 'n(n − 1)'], '2(1 + 2 + ⋯ + n)'),

  q('math.disc.spanning-tree', HIGH, D, 'How many edges does a spanning tree of a connected 9-vertex graph have?', '8', ['9', '36', 'It depends on the graph'], 'every spanning tree has n − 1 edges'),
  q('math.disc.spanning-tree', HIGH, A, 'How many spanning trees does K₄ have?', '16', ['4', '12', '24'], 'Cayley\'s formula nⁿ⁻² = 4²'),

  q('math.disc.stars-bars', HIGH, D, 'In how many ways can 5 identical candies go to 3 children, some possibly getting none?', '21', ['15', '10', '243'], 'C(5 + 2, 2)'),
  q('math.disc.stars-bars', HIGH, A, 'How many non-negative integer solutions does x + y + z + w = 6 have?', '84', ['28', '120', '1296'], 'C(6 + 3, 3)'),

  q('math.disc.stirling-numbers', UG, D, 'What is S(4, 2), the number of ways to split 4 labelled items into 2 non-empty groups?', '7', ['6', '8', '14'], '(2⁴ − 2)/2'),
  q('math.disc.stirling-numbers', UG, A, 'What is S(n, 1) for any n ≥ 1?', '1', ['n', 'n!', '0'], 'all items in one group'),
]
