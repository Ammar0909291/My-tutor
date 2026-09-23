/**
 * Batch: graph-representation, boolean-circuits, predicate-logic-disc
 * (math.disc).
 *
 * Continues math.disc (27/32 -> 30/32) after the linear-recurrence/graph-
 * coloring/planar-graph batch. Fresh frontier recompute found the domain's
 * final 5 concepts ALL simultaneously ready; these 3 selected, leaving
 * catalan-numbers and stirling-numbers as the final closing batch. This
 * batch's own EB entry (graph-representation.md) records that its sibling
 * concept CLOSED the math.disc domain in an earlier, differently-numbered
 * EB-authoring campaign timeline — not this asset-seeding campaign's own
 * numbering, which still has 2 concepts remaining after this batch.
 * Transcribed from the frozen Educational Brain entries at
 * educational-brain/concepts/mathematics/math.disc.{graph-representation,
 * boolean-circuits,predicate-logic-disc}.md.
 *
 * Grade band: graph-representation (EB difficulty "developing") requires
 * BOTH math.disc.graph (GradeBand.HIGH) and math.linalg.matrix (GradeBand.
 * UNDERGRADUATE) — GradeBand.UNDERGRADUATE adopted, since the matrix
 * machinery (adjacency/incidence matrices as direct instances of a
 * matrix) is central to this concept's own core content, matching the
 * precedent set for math.disc.asymptotic-notation and other concepts
 * whose content is inseparable from an undergraduate-level prerequisite.
 * boolean-circuits and predicate-logic-disc (both EB difficulty
 * "proficient") have prerequisites (math.disc.propositional-logic,
 * math.found.predicate-logic) both already GradeBand.HIGH — GradeBand.HIGH
 * retained for both.
 *
 *   GRAPH-REPRESENTATION  A directed graph's adjacency matrix is
 *           ASYMMETRIC AS A RULE, never automatically symmetric the way
 *           an undirected graph's is; Aᵏ's (i,j) entry counts WALKS
 *           (repeats allowed), never simple PATHS (repeats forbidden) —
 *           genuinely different, harder problems; an adjacency list is a
 *           specific DATA STRUCTURE with its own O(V+E)/O(deg(v))
 *           guarantees, never merely an informal way of writing down
 *           edges.
 *   BOOLEAN-CIRCUITS  Circuit DEPTH (longest path) and circuit SIZE
 *           (total gate count) are genuinely DIFFERENT measures — a deep
 *           circuit can have few gates and a shallow circuit can have
 *           many, never interchangeable; universality is a BINARY
 *           qualitative property (can every function be computed at
 *           all?), never affected by gate-count efficiency, which is a
 *           separate quantitative question; the DNF-derived circuit is
 *           always VALID but never necessarily OPTIMAL — shared
 *           subexpressions can shrink some functions from exponential to
 *           linear size.
 *   PREDICATE-LOGIC-DISC  Quantifier ORDER genuinely changes a claim's
 *           meaning — ∀x∃y and ∃y∀x are never the same statement, since
 *           the witness in the former may depend on x while the latter
 *           demands one witness for everyone; negating a quantified
 *           statement requires BOTH flipping the quantifier type AND
 *           negating the predicate, never just one alone; a counterexample
 *           refutes a UNIVERSAL claim but NEVER an existential one, which
 *           instead requires proving the predicate fails for every
 *           element.
 *
 * Seeded as DRAFT. Promotion stays human.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedExplanation, SeedProbe } from './brainSeedAssets'

const S = 'mathematics'
const eb = (id: string, what: string) =>
  `educational-brain/concepts/mathematics/${id}.md — ${what}`

const GRAPH_REPRESENTATION = 'math.disc.graph-representation'
const BOOLEAN_CIRCUITS = 'math.disc.boolean-circuits'
const PREDICATE_LOGIC_DISC = 'math.disc.predicate-logic-disc'

export const MATHEMATICS_DISC_GRAPH_REPRESENTATION_BOOLEAN_CIRCUITS_PREDICATE_LOGIC_DISC_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: GRAPH_REPRESENTATION, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      "A DIRECTED GRAPH'S ADJACENCY MATRIX IS ASYMMETRIC AS A RULE, NEVER AUTOMATICALLY SYMMETRIC "
      + 'THE WAY AN UNDIRECTED GRAPH\'S IS: for the directed cycle 1→2→3→1, Aᵢⱼ=1 (edge i→j) and '
      + 'Aⱼᵢ are entirely INDEPENDENT — checking directly, A₁₃=0 while A₃₁=1, genuinely asymmetric. '
      + 'Symmetry holds only for a "symmetric digraph" (every edge paired with its reverse), which '
      + 'is equivalent to an undirected graph in disguise — never a default property of a digraph\'s '
      + 'matrix.\n\n'
      + 'Aᵏ\'S (i,j) ENTRY COUNTS WALKS, NEVER SIMPLE PATHS — GENUINELY DIFFERENT, HARDER '
      + 'PROBLEMS: for a triangle, A²[1,1]=2 counts the two CLOSED WALKS 1→2→1 and 1→3→1 — a '
      + "diagonal entry that could never represent a 'path' back to the same vertex, since a path "
      + 'by definition has distinct endpoints (except a trivial zero-length walk). A walk ALLOWS '
      + 'repeated vertices and edges; counting simple PATHS (which forbid repetition) is NP-hard '
      + 'in general, while Aᵏ counting walks is a fast, purely algebraic computation — the two '
      + 'problems coincide only by accident for small k or special graphs.\n\n'
      + 'AN ADJACENCY LIST IS A SPECIFIC DATA STRUCTURE WITH ITS OWN O(V+E)/O(deg(v)) GUARANTEES, '
      + 'NEVER MERELY AN INFORMAL WAY OF WRITING DOWN EDGES: for a road network with 10⁷ vertices '
      + 'and 10⁷ edges, the adjacency matrix would require 10¹⁴ entries (more storage than exists '
      + 'practically), while the adjacency list requires only ~10⁷ entries. The adjacency matrix '
      + 'costs O(V²) space with O(1) lookup, efficient for DENSE graphs; the adjacency list costs '
      + 'O(V+E) space with O(deg(v)) neighbour iteration, efficient for SPARSE graphs — choosing '
      + 'between them is a genuine algorithmic decision about space-versus-lookup-speed, never a '
      + 'stylistic preference.',
    targetedMisconceptions: [`${GRAPH_REPRESENTATION}:MC-1`, `${GRAPH_REPRESENTATION}:MC-2`, `${GRAPH_REPRESENTATION}:MC-3`],
    source: eb(GRAPH_REPRESENTATION, "Core Understanding — a digraph's adjacency matrix as asymmetric as a rule never automatically symmetric, Aᵏ's entries counting walks never simple paths as genuinely different harder problems, and the adjacency list as a specific data structure with its own complexity guarantees never merely an informal edge listing"),
  },
  {
    conceptId: BOOLEAN_CIRCUITS, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'CIRCUIT DEPTH AND CIRCUIT SIZE ARE GENUINELY DIFFERENT MEASURES, NEVER INTERCHANGEABLE: for '
      + 'f=AB∨CD, arranging AND₁(A,B) and AND₂(C,D) both at depth 1, then OR at depth 2, gives size '
      + '3, depth 2. Chaining the SAME-length expression as ((AB)C)D instead keeps size 3 but '
      + 'pushes depth to 3 — the SAME size, a DIFFERENT depth, depending purely on gate '
      + 'arrangement. A chain of n single-input NOT gates has size n AND depth n (fully '
      + 'sequential); a balanced binary tree of n-1 AND gates has size n-1 but depth only log₂n '
      + '(highly parallel) — size measures total hardware, depth measures parallel time, and '
      + 'confusing the two answers the wrong question.\n\n'
      + 'UNIVERSALITY IS A BINARY QUALITATIVE PROPERTY, NEVER AFFECTED BY GATE-COUNT EFFICIENCY: '
      + 'NAND alone is functionally complete because NOT(x)=NAND(x,x), AND(x,y)=NOT(NAND(x,y)), and '
      + 'OR(x,y)=NAND(NAND(x,x),NAND(y,y)) — since all three of AND, OR, NOT can each be simulated '
      + 'by a bounded number of NAND gates, and {AND,OR,NOT} is already complete, NAND alone is '
      + 'complete too. NAND-only circuits typically need MORE gates than an equivalent AND/OR/NOT '
      + 'circuit, but this constant-factor overhead is a separate, quantitative efficiency cost — '
      + 'it never affects the qualitative, binary question of whether every function CAN be '
      + 'computed at all. AND alone (or OR alone) genuinely is NOT complete, since AND-only '
      + 'circuits are monotone and can never compute the anti-monotone NOT.\n\n'
      + 'THE DNF-DERIVED CIRCUIT IS ALWAYS VALID BUT NEVER NECESSARILY OPTIMAL: any truth table '
      + "converts directly into a two-level circuit (one AND gate per true row, one OR gate "
      + 'combining them) that is guaranteed correct by construction. But the parity function\'s DNF '
      + 'requires 2^(n-1) AND gates (exponential), while building it instead from a TREE of XOR '
      + 'gates gives size O(n) and depth O(log n) — exploiting shared subexpressions the row-by-row '
      + 'DNF construction cannot detect. "A working circuit" never automatically means "the '
      + 'smallest possible circuit."',
    targetedMisconceptions: [`${BOOLEAN_CIRCUITS}:MC-1`, `${BOOLEAN_CIRCUITS}:MC-2`, `${BOOLEAN_CIRCUITS}:MC-3`],
    source: eb(BOOLEAN_CIRCUITS, 'Core Understanding — circuit depth and size as genuinely different measures never interchangeable, universality as a binary property never affected by gate-count efficiency, and the DNF-derived circuit as always valid but never necessarily optimal'),
  },
  {
    conceptId: PREDICATE_LOGIC_DISC, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'QUANTIFIER ORDER GENUINELY CHANGES A CLAIM\'S MEANING — ∀x∃y AND ∃y∀x ARE NEVER THE SAME '
      + 'STATEMENT: over the integers with R(x,y) meaning x<y, ∀x∃y R(x,y) is TRUE (take y=x+1 for '
      + 'each x — the witness y may depend on x), while ∃y∀x R(x,y) is FALSE (no single integer '
      + 'exceeds every integer — this form demands ONE witness working for ALL x simultaneously, a '
      + 'far stronger requirement). The outer quantifier determines what the inner one is permitted '
      + 'to depend on; order is never a cosmetic choice.\n\n'
      + 'NEGATING A QUANTIFIED STATEMENT REQUIRES BOTH FLIPPING THE QUANTIFIER TYPE AND NEGATING '
      + 'THE PREDICATE, NEVER JUST ONE ALONE: ¬∀x P(x)≡∃x ¬P(x) and ¬∃x P(x)≡∀x ¬P(x) — the exact '
      + 'quantified analogue of De Morgan\'s laws (∀ behaves like AND across the domain, ∃ like OR). '
      + 'For a nested statement like ∀x∃y(R(x,y)∧x<y), negating step by step flips the outer ∀ to '
      + '∃, the inner ∃ to ∀, AND negates the innermost predicate — giving ∃x∀y(¬R(x,y)∨x≥y). '
      + 'Negating only the predicate while leaving ∀x∃y P(x,y) as ∀x∃y ¬P(x,y) is never correct; '
      + 'BOTH quantifiers must flip.\n\n'
      + 'A COUNTEREXAMPLE REFUTES A UNIVERSAL CLAIM BUT NEVER AN EXISTENTIAL ONE: for the universal '
      + 'claim ∀x∈ℤ, x²>x, the counterexample x=0 (0²=0 is NOT >0) genuinely refutes it. But for '
      + 'the existential claim ∃x∈ℝ, x²=2 (TRUE, via x=√2), checking that x=1 fails (1²=1≠2) says '
      + 'NOTHING about the claim\'s truth — a DIFFERENT x might still satisfy it. Refuting ∃x P(x) '
      + 'requires proving ∀x ¬P(x) — that NO element anywhere satisfies P — a far stronger '
      + 'requirement than exhibiting one non-example, since existential claims need only ONE true '
      + 'disjunct to hold.',
    targetedMisconceptions: [`${PREDICATE_LOGIC_DISC}:MC-1`, `${PREDICATE_LOGIC_DISC}:MC-2`, `${PREDICATE_LOGIC_DISC}:MC-3`],
    source: eb(PREDICATE_LOGIC_DISC, 'Core Understanding — quantifier order genuinely changing a claim\'s meaning with ∀x∃y never equal to ∃y∀x, negating a quantifier requiring both the type flip and predicate negation together never one alone, and a counterexample refuting only universal claims never existential ones'),
  },
]

export const MATHEMATICS_DISC_GRAPH_REPRESENTATION_BOOLEAN_CIRCUITS_PREDICATE_LOGIC_DISC_PROBES: SeedProbe[] = [
  {
    conceptId: GRAPH_REPRESENTATION, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'For a directed graph, if Aᵢⱼ=1 (an edge from i to j exists), does that guarantee Aⱼᵢ=1 as well?',
    choices: [
      { text: 'No — for the directed cycle 1→2→3→1, A₁₃=0 while A₃₁=1; a digraph\'s adjacency matrix is asymmetric as a rule, and symmetry holds only when every edge is paired with its reverse', isCorrect: true },
      { text: 'Yes — an adjacency matrix is always symmetric, whether the graph is directed or undirected', isCorrect: false, misconceptionId: `${GRAPH_REPRESENTATION}:MC-1` },
      { text: "Yes, since Aᵢⱼ=Aⱼᵢ holds for any adjacency matrix by the definition of adjacency", isCorrect: false, misconceptionId: `${GRAPH_REPRESENTATION}:MC-1` },
    ],
    targetedMisconceptions: [`${GRAPH_REPRESENTATION}:MC-1`],
    source: eb(GRAPH_REPRESENTATION, 'Misconceptions MC-1 detection probe (Discovery Question 1) — a directed edge i→j, an assumption of automatic symmetry confirming ADJACENCY-MATRIX-IS-ALWAYS-SYMMETRIC'),
  },
  {
    conceptId: GRAPH_REPRESENTATION, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Does A^k[i,j] count routes that are allowed to revisit a vertex, or only routes that never repeat a vertex?',
    choices: [
      { text: 'Routes that ARE allowed to revisit a vertex (walks) — for a triangle, A²[1,1]=2 counts the two closed walks 1→2→1 and 1→3→1, which could never be "paths" back to the same start', isCorrect: true },
      { text: 'Only routes that never repeat a vertex — A^k counts simple paths of length k', isCorrect: false, misconceptionId: `${GRAPH_REPRESENTATION}:MC-2` },
      { text: "It counts paths, since 'walk' and 'path' mean the same thing in this context", isCorrect: false, misconceptionId: `${GRAPH_REPRESENTATION}:MC-2` },
    ],
    targetedMisconceptions: [`${GRAPH_REPRESENTATION}:MC-2`],
    source: eb(GRAPH_REPRESENTATION, 'Misconceptions MC-2 detection probe (Discovery Question 2) — whether A^k counts walks or paths, an answer confusing the two confirming MATRIX-POWER-Aᵏ-COUNTS-PATHS'),
  },
  {
    conceptId: GRAPH_REPRESENTATION, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'For a graph with a million vertices but only a few edges per vertex, would a full adjacency matrix or an adjacency list use less memory?',
    choices: [
      { text: 'The adjacency list — it costs O(V+E) space (efficient for sparse graphs), while the adjacency matrix costs O(V²) space regardless of how few edges exist, making the matrix impractically large here', isCorrect: true },
      { text: 'The adjacency matrix — a full grid of all pairs is always more memory-efficient than a per-vertex list', isCorrect: false, misconceptionId: `${GRAPH_REPRESENTATION}:MC-3` },
      { text: "They use the same amount of memory, since an adjacency list is just an informal way of writing the same information as the matrix", isCorrect: false, misconceptionId: `${GRAPH_REPRESENTATION}:MC-3` },
    ],
    targetedMisconceptions: [`${GRAPH_REPRESENTATION}:MC-3`],
    source: eb(GRAPH_REPRESENTATION, 'Misconceptions MC-3 detection probe (Discovery Question 3) — a large sparse graph\'s memory footprint, an answer treating the list as merely informal confirming ADJACENCY-LIST-IS-JUST-A-LIST'),
  },
  {
    conceptId: BOOLEAN_CIRCUITS, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'A balanced binary tree of AND gates over 8 inputs has 7 gates. What is its depth?',
    choices: [
      { text: 'log₂8=3 — depth measures the longest input-to-output path, genuinely different from size (the total gate count, 7 here)', isCorrect: true },
      { text: '7 — the depth equals the total number of gates in the circuit', isCorrect: false, misconceptionId: `${BOOLEAN_CIRCUITS}:MC-1` },
      { text: "7, since depth and size are the same measure of a circuit's complexity", isCorrect: false, misconceptionId: `${BOOLEAN_CIRCUITS}:MC-1` },
    ],
    targetedMisconceptions: [`${BOOLEAN_CIRCUITS}:MC-1`],
    source: eb(BOOLEAN_CIRCUITS, 'Misconceptions MC-1 detection probe (verbatim, Blueprint) — a balanced binary tree with 7 gates, an answer of 7 for depth confirming DEPTH-EQUALS-SIZE'),
  },
  {
    conceptId: BOOLEAN_CIRCUITS, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Does NAND\'s need for more gates to simulate AND/OR/NOT mean NAND-only circuits cannot compute some functions that AND/OR/NOT circuits can?',
    choices: [
      { text: 'No — universality is a binary property (can every function be computed at all?), entirely separate from gate-count efficiency; since NOT, AND, and OR can each be simulated by a bounded number of NAND gates, NAND alone is fully universal despite the overhead', isCorrect: true },
      { text: 'Yes — needing more gates means NAND-only circuits are somehow less capable than AND/OR/NOT circuits', isCorrect: false, misconceptionId: `${BOOLEAN_CIRCUITS}:MC-2` },
      { text: "Yes, since more gates required implies a weaker or incomplete gate set", isCorrect: false, misconceptionId: `${BOOLEAN_CIRCUITS}:MC-2` },
    ],
    targetedMisconceptions: [`${BOOLEAN_CIRCUITS}:MC-2`],
    source: eb(BOOLEAN_CIRCUITS, 'Misconceptions MC-2 detection probe (verbatim, Blueprint) — NAND needing more gates, an answer of "yes" (less capable) confirming NAND-IS-NOT-UNIVERSAL-BECAUSE-IT-NEEDS-MORE-GATES'),
  },
  {
    conceptId: BOOLEAN_CIRCUITS, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Is the DNF-derived circuit for a Boolean function always the smallest possible circuit computing that function?',
    choices: [
      { text: 'No — the parity function\'s DNF requires 2^(n-1) AND gates (exponential), but a tree of XOR gates computes it in size O(n), depth O(log n); the DNF construction is always valid but frequently far from optimal, since it misses shared-subexpression opportunities', isCorrect: true },
      { text: 'Yes — the DNF construction always produces the minimal circuit for any Boolean function', isCorrect: false, misconceptionId: `${BOOLEAN_CIRCUITS}:MC-3` },
      { text: "Yes, since DNF is the canonical normal form and canonical forms are always optimal", isCorrect: false, misconceptionId: `${BOOLEAN_CIRCUITS}:MC-3` },
    ],
    targetedMisconceptions: [`${BOOLEAN_CIRCUITS}:MC-3`],
    source: eb(BOOLEAN_CIRCUITS, 'Misconceptions MC-3 detection probe (verbatim, Blueprint) — whether the DNF-derived circuit is always smallest, an answer of "yes" confirming DNF-AND-CIRCUIT-ARE-THE-SAME'),
  },
  {
    conceptId: PREDICATE_LOGIC_DISC, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Over the integers, is ∀x∃y(x<y) the same claim as ∃y∀x(x<y)?',
    choices: [
      { text: 'No — ∀x∃y(x<y) is TRUE (take y=x+1 for each x, a different witness per x), while ∃y∀x(x<y) is FALSE (no single integer exceeds every integer); the outer quantifier determines what the inner one may depend on', isCorrect: true },
      { text: 'Yes — the two orderings of the same quantifiers and predicate express the identical claim', isCorrect: false, misconceptionId: `${PREDICATE_LOGIC_DISC}:MC-1` },
      { text: "Yes, since ∀ and ∃ can be freely reordered without changing a statement's meaning", isCorrect: false, misconceptionId: `${PREDICATE_LOGIC_DISC}:MC-1` },
    ],
    targetedMisconceptions: [`${PREDICATE_LOGIC_DISC}:MC-1`],
    source: eb(PREDICATE_LOGIC_DISC, 'Misconceptions MC-1 detection probe (verbatim, Blueprint) — ∀x∃y(x<y) versus ∃y∀x(x<y), an answer of "yes" (same claim) confirming QUANTIFIER-ORDER-COMMUTES'),
  },
  {
    conceptId: PREDICATE_LOGIC_DISC, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Negate ∀x P(x).',
    choices: [
      { text: '∃x ¬P(x) — negating a quantified statement flips the quantifier type (∀ to ∃) AND negates the predicate, both simultaneously, since ∀ behaves as a conjunction across the domain', isCorrect: true },
      { text: '∀x ¬P(x) — keep the same quantifier and just negate the predicate', isCorrect: false, misconceptionId: `${PREDICATE_LOGIC_DISC}:MC-2` },
      { text: "∀x ¬P(x), since negation simply passes through to the inner predicate without affecting the quantifier", isCorrect: false, misconceptionId: `${PREDICATE_LOGIC_DISC}:MC-2` },
    ],
    targetedMisconceptions: [`${PREDICATE_LOGIC_DISC}:MC-2`],
    source: eb(PREDICATE_LOGIC_DISC, 'Misconceptions MC-2 detection probe (verbatim, Blueprint) — negating ∀x P(x), an answer of ∀x ¬P(x) confirming NEGATION-FLIPS-PREDICATE-NOT-QUANTIFIER'),
  },
  {
    conceptId: PREDICATE_LOGIC_DISC, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Someone claims ∃x∈ℤ, x²=2. You point out that x=1 gives 1²=1≠2. Have you refuted the claim?',
    choices: [
      { text: 'No — a counterexample only refutes a UNIVERSAL claim; refuting this existential claim would require proving ∀x∈ℤ, x²≠2 (that NO integer works), and checking one failed value says nothing about whether some other value might succeed', isCorrect: true },
      { text: 'Yes — showing that x=1 fails is a valid counterexample that refutes the existential claim', isCorrect: false, misconceptionId: `${PREDICATE_LOGIC_DISC}:MC-3` },
      { text: "Yes, since finding any value that doesn't satisfy the equation disproves the statement", isCorrect: false, misconceptionId: `${PREDICATE_LOGIC_DISC}:MC-3` },
    ],
    targetedMisconceptions: [`${PREDICATE_LOGIC_DISC}:MC-3`],
    source: eb(PREDICATE_LOGIC_DISC, 'Misconceptions MC-3 detection probe (verbatim, Blueprint) — refuting ∃x∈ℤ,x²=2 via x=1, an answer of "yes" confirming COUNTEREXAMPLE-REFUTES-EXISTENTIAL'),
  },
]
