/**
 * MATHEMATICS — probe DEPTH, batch 22: math.graph (16 (concept, band) pairs, 32 probes).
 *
 * Why depth, and the identity rule every probe here obeys, are stated once in
 * mathematicsDepthArithAssets.ts (batch 1): five gradeable probes per pair so a
 * learner recovers from one or two mistakes on questions they have not seen;
 * every probe extends the pair's existing ladder slot at an unused difficulty
 * rung, so no seeded probe is re-identified.
 *
 * Every value was worked by hand, e.g. the flow network s→a 3, s→b 2, a→t 2,
 * b→t 3, a→b 1 carries 2 + 2 + 1 = 5 and the cut {s} also has capacity 5,
 * a→c→b→d costs 1 + 2 + 1 = 4, Mantel gives ⌊36/4⌋ = 9, K₂,₂,₂ has 12 edges,
 * and Cayley gives 5³ = 125 labelled trees on 5 vertices.
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

export const MATHEMATICS_DEPTH_GRAPH_THEORY_PROBES: SeedProbe[] = [
  q('math.graph.algebraic-graph-theory', UG, D, 'A graph\'s Laplacian has eigenvalue 0 with multiplicity 3. How many connected components does it have?', '3', ['1', '0', '6'], 'one zero eigenvalue per component'),
  q('math.graph.algebraic-graph-theory', UG, A, 'What is the largest eigenvalue of the adjacency matrix of K₄?', '3', ['4', '1', '−1'], 'a k-regular graph has largest eigenvalue k'),

  q('math.graph.connectivity', HIGH, D, 'What is the vertex connectivity κ of the cycle C₆?', '2', ['1', '6', '3'], 'removing any one vertex leaves a path'),
  q('math.graph.connectivity', HIGH, A, 'What is the edge connectivity λ of K₅?', '4', ['5', '10', '1'], 'cut all 4 edges at one vertex'),

  q('math.graph.eulerian-circuit', HIGH, D, 'Which graph has an Eulerian circuit?', 'The cycle C₅', ['The path P₄', 'K₄', 'A single edge K₂'], 'connected with every degree even'),
  q('math.graph.eulerian-circuit', HIGH, A, 'A connected graph has exactly two vertices of odd degree. What does it have?', 'An Eulerian trail between those two vertices, but no Eulerian circuit', ['An Eulerian circuit', 'Neither a trail nor a circuit', 'A Hamiltonian cycle'], 'the trail must start and end at the odd vertices'),

  q('math.graph.extremal-graph-theory', HIGH, D, 'By Mantel\'s theorem, what is the most edges a triangle-free graph on 6 vertices can have?', '9', ['15', '6', '12'], '⌊n²/4⌋, achieved by K₃,₃'),
  q('math.graph.extremal-graph-theory', HIGH, A, 'Which graph has the most edges among K₄-free graphs on 6 vertices?', 'K₂,₂,₂', ['K₆', 'K₃,₃', 'C₆'], 'the Turán graph T(6, 3), with 12 edges'),

  q('math.graph.graph-coloring', HIGH, D, 'What is the chromatic number of a bipartite graph with at least one edge?', '2', ['1', '3', 'It depends on its size'], 'colour each side'),
  q('math.graph.graph-coloring', HIGH, A, 'What is the edge chromatic number of K₄?', '3', ['4', '6', '2'], 'its 6 edges split into 3 perfect matchings'),

  q('math.graph.graph-invariants', HIGH, D, 'What is the diameter of the path P₅ (five vertices)?', '4', ['5', '2', '3'], 'the two ends are 4 edges apart'),
  q('math.graph.graph-invariants', HIGH, A, 'What is the girth of K₄?', '3', ['4', '6', '∞'], 'it contains triangles'),

  q('math.graph.graph-operations', HIGH, D, 'What is the complement of K₄?', '4 isolated vertices', ['K₄', 'C₄', 'A star'], 'every possible edge is already in K₄'),
  q('math.graph.graph-operations', HIGH, A, 'How many edges does the complement of C₅ have?', '5', ['10', '0', '15'], 'C(5, 2) − 5'),

  q('math.graph.graph', HIGH, D, 'What is the most edges a simple graph on 7 vertices can have?', '21', ['49', '7', '42'], 'C(7, 2)'),
  q('math.graph.graph', HIGH, A, 'How many vertices of odd degree can a graph have?', 'An even number', ['An odd number', 'Exactly two', 'Any number'], 'the degree sum is even'),

  q('math.graph.hamiltonian-cycle', HIGH, D, 'Which graph has a Hamiltonian cycle?', 'K₄', ['The star K₁,₃', 'The path P₄', 'Any tree'], 'visit all four vertices round a square'),
  q('math.graph.hamiltonian-cycle', HIGH, A, 'By Dirac\'s theorem, which condition guarantees a Hamiltonian cycle in a simple graph on n ≥ 3 vertices?', 'Every vertex has degree at least n/2', ['Every vertex has even degree', 'The graph is connected', 'n is even'], 'a sufficient condition'),

  q('math.graph.matching', HIGH, D, 'What is the size of a maximum matching in the cycle C₆?', '3', ['6', '2', '1'], 'alternate edges cover all six vertices'),
  q('math.graph.matching', HIGH, A, 'What is the size of a maximum matching in K₂,₅?', '2', ['5', '7', '10'], 'the side with 2 vertices limits it'),

  q('math.graph.maximum-flow', HIGH, D, 'By the max-flow min-cut theorem, the maximum flow equals what?', 'The capacity of a minimum s–t cut', ['The sum of all capacities', 'The largest single capacity', 'The number of s–t paths'], 'max-flow min-cut'),
  q('math.graph.maximum-flow', HIGH, A, 'Capacities: s→a 3, s→b 2, a→t 2, b→t 3, a→b 1. What is the maximum flow from s to t?', '5', ['4', '3', '7'], 's–a–t 2, s–b–t 2, s–a–b–t 1; the cut at s is 5'),

  q('math.graph.minimum-spanning-tree', HIGH, D, 'In what order does Kruskal\'s algorithm add edges?', 'By increasing weight, skipping any edge that would form a cycle', ['By decreasing weight', 'By vertex label', 'In random order'], 'greedy on the lightest safe edge'),
  q('math.graph.minimum-spanning-tree', HIGH, A, 'A triangle has edge weights 1, 2 and 3. What is the weight of its minimum spanning tree?', '3', ['6', '5', '1'], 'keep 1 and 2, drop 3'),

  q('math.graph.ramsey-theory', HIGH, D, 'What is the Ramsey number R(3, 3)?', '6', ['5', '9', '3'], 'K₅ can avoid a monochromatic triangle; K₆ cannot'),
  q('math.graph.ramsey-theory', HIGH, A, 'What is R(2, n)?', 'n', ['2', 'n + 2', '2n'], 'one red edge, or all n vertices blue'),

  q('math.graph.random-graph', HIGH, D, 'In G(n, p), what is the expected degree of a vertex?', '(n − 1)p', ['np²', 'n', 'p'], 'n − 1 possible neighbours, each with probability p'),
  q('math.graph.random-graph', HIGH, A, 'Around which p does G(n, p) become connected?', 'p ≈ (ln n)/n', ['p = 1/2', 'p ≈ 1/n²', 'p ≈ 1/√n'], 'the connectivity threshold'),

  q('math.graph.shortest-path', UG, D, 'Why can Dijkstra\'s algorithm fail with negative edge weights?', 'A vertex it has finalized could later get a shorter path', ['It cannot read negative numbers', 'It loops forever', 'It only works on trees'], 'finalization assumes distances only grow'),
  q('math.graph.shortest-path', UG, A, 'Edges: a→b 4, a→c 1, c→b 2, b→d 1. What is the shortest distance from a to d?', '4', ['5', '3', '6'], 'a → c → b → d'),

  q('math.graph.tree', HIGH, D, 'How many labelled trees are there on 5 vertices?', '125', ['25', '60', '120'], 'Cayley: 5³'),
  q('math.graph.tree', HIGH, A, 'A forest has 10 vertices and 3 components. How many edges does it have?', '7', ['9', '10', '3'], 'each tree has one fewer edge than vertices'),
]
