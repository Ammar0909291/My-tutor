/**
 * Batch: counting-principles, graph, propositional-logic (math.disc).
 *
 * Opens math.disc (0/32) as the campaign's new frontier after math.prob
 * reached its natural limit (46/49, remaining 3 blocked on external
 * domains — one of them, combinatorial-probability, needs
 * math.disc.permutations/combinations, so progress here will eventually
 * unblock it too). Fresh frontier recompute found 4 ready concepts
 * (counting-principles, graph, propositional-logic, recurrence-relation);
 * these 3 were selected because each unlocks further downstream math.disc
 * work, leaving recurrence-relation for a later batch. Transcribed from the
 * frozen Educational Brain entries at educational-brain/concepts/
 * mathematics/math.disc.{counting-principles,graph,propositional-logic}.md.
 *
 * Grade band: no math.disc sibling files exist yet to establish a domain
 * convention. All three concepts require/cross-link directly into
 * math.found.proposition / math.found.logical-connectives / math.found.
 * truth-table, which this campaign already seeded at GradeBand.HIGH — and
 * math.disc as a domain (combinatorics, graph theory, propositional logic)
 * is standard HIGH-school-through-early-college discrete math, matching
 * math.prob's own HIGH convention for closely related combinatorial
 * content. GradeBand.HIGH adopted as the math.disc domain convention.
 *
 *   COUNTING-PRINCIPLES  AND-scenarios (independent sequential choices)
 *           MULTIPLY (m×n); OR-scenarios (mutually exclusive choices) ADD
 *           (m+n); never the reverse; independence/overlap must be
 *           re-checked at every stage before applying either rule, never
 *           applied mechanically.
 *   GRAPH  A directed edge (u,v) is NEVER symmetric — (v,u) requires its
 *           own explicit entry; a self-loop contributes 2 to its vertex's
 *           degree (both ends attach at the same vertex), never 1; the
 *           Handshaking Lemma is Σdeg(v)=2|E|, never |E|, since every edge
 *           has 2 endpoints.
 *   PROPOSITIONAL-LOGIC  DNF is built from the TRUE rows (OR-of-ANDs),
 *           deterministically equivalent by construction, never an
 *           arbitrary rewrite; CNF is built from the FALSE rows with the
 *           OPPOSITE negation convention, never the same procedure as DNF;
 *           checking ONE assignment is easy, but determining SAT in
 *           general is NP-complete — easy-to-verify never implies
 *           easy-to-decide.
 *
 * Seeded as DRAFT. Promotion stays human.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedExplanation, SeedProbe } from './brainSeedAssets'

const S = 'mathematics'
const eb = (id: string, what: string) =>
  `educational-brain/concepts/mathematics/${id}.md — ${what}`

const COUNTING_PRINCIPLES = 'math.disc.counting-principles'
const GRAPH = 'math.disc.graph'
const PROPOSITIONAL_LOGIC = 'math.disc.propositional-logic'

export const MATHEMATICS_DISC_COUNTING_PRINCIPLES_GRAPH_PROPOSITIONAL_LOGIC_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: COUNTING_PRINCIPLES, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'AND-SCENARIOS (INDEPENDENT, SEQUENTIAL CHOICES) MULTIPLY, NEVER ADD: with 3 shirts (red, '
      + 'blue, green) and 4 trousers (black, grey, white, navy), draw the 3×4 grid — each row a '
      + 'shirt, each column a trouser, each cell a distinct outfit. Counting cells directly gives '
      + '12, matching 3×4=12 — NOT the item count 3+4=7 an addition error would produce. This '
      + 'chains across MULTIPLE independent stages: a 4-wheel lock with 3, 5, 4, and 6 symbols per '
      + 'wheel gives 3×5×4×6=360 total combinations, computed by multiplying the running product by '
      + 'each new stage in turn (3, then 15, then 60, then 360) — never a single asserted leap.\n\n'
      + 'OR-SCENARIOS (MUTUALLY EXCLUSIVE, SINGLE CHOICES) ADD, NEVER MULTIPLY: a café offers 5 hot '
      + 'drinks and 3 cold drinks; a customer orders exactly ONE drink. Since hot and cold are '
      + 'mutually exclusive (not "hot AND cold"), the total is 5+3=8 — contrast this against the '
      + 'DIFFERENT scenario "how many ways to order one hot AND one cold drink" (a genuine pairing), '
      + 'which would correctly be 5×3=15. The SAME two numbers (5 and 3) give a different answer '
      + 'depending entirely on whether the stages are independent-and-paired (AND, multiply) or '
      + 'mutually-exclusive-and-chosen-once (OR, add).\n\n'
      + 'INDEPENDENCE AND OVERLAP MUST BE RE-CHECKED AT EVERY STAGE, NEVER APPLIED MECHANICALLY: '
      + 'before applying either rule to a multi-stage count, ask explicitly — "does stage B\'s '
      + 'option count ever change depending on stage A\'s outcome, or does the same option ever get '
      + 'counted at more than one stage?" For example, 5 flavours and 3 toppings where one topping '
      + '("no topping") is effectively available at every flavour independently: multiplying 5×3 '
      + 'and then separately re-adding for the "no topping" case double-counts it. If overlap or '
      + 'dependence holds, list the affected cases separately rather than applying one fixed '
      + 'product or sum.',
    targetedMisconceptions: [`${COUNTING_PRINCIPLES}:MC-1`, `${COUNTING_PRINCIPLES}:MC-2`, `${COUNTING_PRINCIPLES}:MC-3`],
    source: eb(COUNTING_PRINCIPLES, 'Core Understanding — the multiplication principle for AND-scenarios and addition principle for OR-scenarios, chaining across multiple stages, and the independence/overlap check required before applying either rule'),
  },
  {
    conceptId: GRAPH, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'A DIRECTED EDGE (u,v) IS NEVER SYMMETRIC — (v,u) REQUIRES ITS OWN EXPLICIT ENTRY: for G with '
      + 'V={X,Y}, E={(X,Y),(Y,X),(X,X)}, the edges (X,Y) and (Y,X) are genuinely DIFFERENT edges (an '
      + 'arrow X→Y and a SEPARATE arrow Y→X), coexisting without contradiction; (X,X) is a self-loop '
      + 'at X. A one-way street from A to B does not create a road back from B to A — the two '
      + 'directions are entirely independent facts, each requiring its own explicit edge.\n\n'
      + 'A SELF-LOOP CONTRIBUTES 2 TO ITS VERTEX\'S DEGREE, NEVER 1: both ends of the loop attach at '
      + 'the SAME vertex, and both attachments count. For G with V={A,B,C,D}, E={{A,B},{A,C},{B,C},'
      + '{C,D}}: deg(A)=2, deg(B)=2, deg(C)=3, deg(D)=1.\n\n'
      + 'THE HANDSHAKING LEMMA IS Σdeg(v)=2|E|, NEVER |E|, SINCE EVERY EDGE HAS 2 ENDPOINTS: '
      + 'checking the graph above, 2+2+3+1=8=2×4=2|E| — confirmed. This also solves for a missing '
      + 'degree: an undirected graph has 5 edges and four known vertex degrees 2,3,1,3; '
      + 'Σdeg(v)=2|E|=2(5)=10, the known sum is 2+3+1+3=9, so the fifth vertex\'s degree is '
      + '10-9=1 — derived from the factor of 2, never from Σdeg(v)=|E|=5.',
    targetedMisconceptions: [`${GRAPH}:MC-1`, `${GRAPH}:MC-2`, `${GRAPH}:MC-3`],
    source: eb(GRAPH, 'Core Understanding — directed edges as ordered pairs never implying their reverse, self-loops contributing 2 to degree never 1, and the Handshaking Lemma Σdeg(v)=2|E| never |E|'),
  },
  {
    conceptId: PROPOSITIONAL_LOGIC, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'DNF IS BUILT FROM THE TRUE ROWS, DETERMINISTICALLY EQUIVALENT BY CONSTRUCTION, NEVER AN '
      + 'ARBITRARY REWRITE: for F=(P∧Q)∨(¬P∧R), the truth table over P,Q,R has F TRUE at (T,T,T), '
      + '(T,T,F), (F,T,T), (F,F,T). Each true row contributes one AND-clause (literals matching that '
      + 'row\'s values, negated where the row is false), joined by OR: DNF = '
      + '(P∧Q∧R)∨(P∧Q∧¬R)∨(¬P∧Q∧R)∨(¬P∧¬Q∧R). Re-evaluating this DNF reproduces the SAME truth '
      + 'table as the original formula — the equivalence is guaranteed by the construction, never a '
      + 'coincidence of one particular rewriting choice.\n\n'
      + 'CNF IS BUILT FROM THE FALSE ROWS WITH THE OPPOSITE NEGATION CONVENTION, NEVER THE SAME '
      + 'PROCEDURE AS DNF: for the same F, the FALSE rows are (T,F,T), (T,F,F), (F,T,F), (F,F,F). '
      + 'Each false row contributes one OR-clause, false exactly there, with literals negated '
      + 'OPPOSITE to DNF\'s convention (e.g. row (T,F,T) gives (¬P∨Q∨¬R)). CNF = '
      + '(¬P∨Q∨¬R)∧(¬P∨Q∨R)∧(P∨¬Q∨R)∧(P∨Q∨R) — a genuinely different procedure (false rows, '
      + 'opposite negation) from DNF\'s (true rows, direct negation), never the same steps applied '
      + 'twice.\n\n'
      + 'CHECKING ONE ASSIGNMENT IS EASY, BUT DETERMINING SAT IN GENERAL IS NP-COMPLETE — '
      + 'EASY-TO-VERIFY NEVER IMPLIES EASY-TO-DECIDE: for the same F, checking whether P=T,Q=T,R=F '
      + 'satisfies it is a single trivial evaluation (row (T,T,F): F=T, yes). But determining '
      + 'whether ANY satisfying assignment exists for an arbitrary large formula requires, in the '
      + 'worst case, checking all 2ⁿ rows — computationally infeasible for large n, with no known '
      + 'efficient general algorithm (SAT is NP-complete). Easy to CHECK a proposed answer and easy '
      + 'to FIND one at all are two completely different questions.',
    targetedMisconceptions: [`${PROPOSITIONAL_LOGIC}:MC-1`, `${PROPOSITIONAL_LOGIC}:MC-2`, `${PROPOSITIONAL_LOGIC}:MC-3`],
    source: eb(PROPOSITIONAL_LOGIC, 'Core Understanding — DNF built from true rows as a guaranteed-equivalent construction never an arbitrary rewrite, CNF built from false rows with the opposite negation convention never the same procedure as DNF, and SAT\'s easy-to-verify/hard-to-decide gap underlying NP-completeness'),
  },
]

export const MATHEMATICS_DISC_COUNTING_PRINCIPLES_GRAPH_PROPOSITIONAL_LOGIC_PROBES: SeedProbe[] = [
  {
    conceptId: COUNTING_PRINCIPLES, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'A coin is flipped and a die is rolled. How many outcomes are possible?',
    choices: [
      { text: '12 — the coin (2 outcomes) and die (6 outcomes) are independent sequential choices, an AND-scenario, so they multiply: 2×6=12', isCorrect: true },
      { text: '8 — the coin\'s 2 outcomes plus the die\'s 6 outcomes, added together', isCorrect: false, misconceptionId: `${COUNTING_PRINCIPLES}:MC-1` },
      { text: "8, since combining a coin flip with a die roll just means totaling up how many faces/sides are involved", isCorrect: false, misconceptionId: `${COUNTING_PRINCIPLES}:MC-1` },
    ],
    targetedMisconceptions: [`${COUNTING_PRINCIPLES}:MC-1`],
    source: eb(COUNTING_PRINCIPLES, 'Misconceptions MC-1 detection probe (verbatim, Blueprint) — coin-flip-and-die-roll, an answer of 8 confirming ADDITION-NOT-MULTIPLICATION'),
  },
  {
    conceptId: COUNTING_PRINCIPLES, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'A café offers 5 hot drinks and 3 cold drinks. A customer orders exactly one drink. How many choices does the customer have?',
    choices: [
      { text: '8 — hot and cold are mutually exclusive single choices (an OR-scenario), so they add: 5+3=8', isCorrect: true },
      { text: '15 — the 5 hot drinks and 3 cold drinks paired together, 5×3=15', isCorrect: false, misconceptionId: `${COUNTING_PRINCIPLES}:MC-2` },
      { text: "15, since counting problems with two separate menu categories should be multiplied together", isCorrect: false, misconceptionId: `${COUNTING_PRINCIPLES}:MC-2` },
    ],
    targetedMisconceptions: [`${COUNTING_PRINCIPLES}:MC-2`],
    source: eb(COUNTING_PRINCIPLES, 'Misconceptions MC-2 detection probe (verbatim, Blueprint) — café hot-or-cold single order, an answer of 15 confirming MULTIPLICATION-NOT-ADDITION'),
  },
  {
    conceptId: COUNTING_PRINCIPLES, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'A shop counts ID cards starting with a specific letter, and separately counts ID cards with a repeated first-two-letter pattern; some cards satisfy BOTH conditions. To find the total number of cards satisfying EITHER condition, is it correct to simply add the two separate counts?',
    choices: [
      { text: 'No — since the two counted sets genuinely overlap, adding the raw counts double-counts the overlapping cards; the overlap must be identified and handled separately (e.g. subtracted once) rather than applying a single fixed sum', isCorrect: true },
      { text: 'Yes — whenever two counting scenarios are being combined with "either," their counts should always simply be added', isCorrect: false, misconceptionId: `${COUNTING_PRINCIPLES}:MC-3` },
      { text: "Yes, because the addition principle applies to any two categories of outcomes regardless of whether they overlap", isCorrect: false, misconceptionId: `${COUNTING_PRINCIPLES}:MC-3` },
    ],
    targetedMisconceptions: [`${COUNTING_PRINCIPLES}:MC-3`],
    source: eb(COUNTING_PRINCIPLES, 'Misconceptions MC-3 detection probe (Blueprint\'s own transfer probe, part (d)) — overlapping ID-card subsets, failing to notice the overlap and simply adding confirming INDEPENDENCE-IGNORED'),
  },
  {
    conceptId: GRAPH, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'In a directed graph with edge (A,B) only, does the edge (B,A) also exist?',
    choices: [
      { text: 'No — a directed edge (A,B) is an ordered pair; the reverse (B,A) is a genuinely separate edge that must be explicitly listed to exist, and it is not here', isCorrect: true },
      { text: 'Yes — an edge between two vertices always exists in both directions, whether or not it is directed', isCorrect: false, misconceptionId: `${GRAPH}:MC-1` },
      { text: "Yes, since connections between two things are naturally two-way by default", isCorrect: false, misconceptionId: `${GRAPH}:MC-1` },
    ],
    targetedMisconceptions: [`${GRAPH}:MC-1`],
    source: eb(GRAPH, 'Misconceptions MC-1 detection probe — directed graph with edge (A,B) only, an answer of "yes" confirming DIRECTED-EDGE-ASSUMED-SYMMETRIC'),
  },
  {
    conceptId: GRAPH, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'A vertex has exactly one self-loop and no other edges. What is its degree?',
    choices: [
      { text: '2 — both ends of the self-loop attach at this same vertex, and each attachment counts separately toward the degree', isCorrect: true },
      { text: '1 — a self-loop is a single loop, so it contributes 1 to the degree', isCorrect: false, misconceptionId: `${GRAPH}:MC-2` },
      { text: "1, since visually there is only one curve drawn at the vertex", isCorrect: false, misconceptionId: `${GRAPH}:MC-2` },
    ],
    targetedMisconceptions: [`${GRAPH}:MC-2`],
    source: eb(GRAPH, 'Misconceptions MC-2 detection probe — a vertex with exactly one self-loop and no other edges, an answer of 1 confirming SELF-LOOP-DEGREE-ONE'),
  },
  {
    conceptId: GRAPH, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'A graph has 4 edges. Without listing individual vertex degrees, what is Σᵥdeg(v)?',
    choices: [
      { text: '8 — the Handshaking Lemma gives Σdeg(v)=2|E|=2×4=8, since every edge contributes 2 to the total (one for each endpoint)', isCorrect: true },
      { text: '4 — the sum of degrees equals the number of edges', isCorrect: false, misconceptionId: `${GRAPH}:MC-3` },
      { text: "4, because each edge contributes exactly one unit to the total degree count", isCorrect: false, misconceptionId: `${GRAPH}:MC-3` },
    ],
    targetedMisconceptions: [`${GRAPH}:MC-3`],
    source: eb(GRAPH, 'Misconceptions MC-3 detection probe — a graph with 4 edges, an answer of 4 confirming HANDSHAKE-SUM-EQUALS-EDGES'),
  },
  {
    conceptId: PROPOSITIONAL_LOGIC, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Is a formula\'s DNF just one arbitrary way among many to rewrite it, with no guaranteed connection to its truth table?',
    choices: [
      { text: 'No — DNF is mechanically constructed from the TRUE rows of the truth table (one AND-clause per true row, joined by OR), so it is deterministically GUARANTEED to be equivalent to the original formula, never an arbitrary rewrite', isCorrect: true },
      { text: 'Yes — DNF is simply one of several equally-valid ways to rewrite a formula, with no particular guarantee it matches the original truth table', isCorrect: false, misconceptionId: `${PROPOSITIONAL_LOGIC}:MC-1` },
      { text: "Yes, since there are many logically equivalent ways to express the same formula and DNF is just a stylistic preference among them", isCorrect: false, misconceptionId: `${PROPOSITIONAL_LOGIC}:MC-1` },
    ],
    targetedMisconceptions: [`${PROPOSITIONAL_LOGIC}:MC-1`],
    source: eb(PROPOSITIONAL_LOGIC, 'Misconceptions MC-1 detection probe — "is DNF just an arbitrary rewrite," an answer of "yes" confirming DNF-TREATED-AS-ARBITRARY-REWRITE'),
  },
  {
    conceptId: PROPOSITIONAL_LOGIC, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Is CNF built the same way as DNF — from the true rows, with the same negation convention?',
    choices: [
      { text: 'No — CNF is built from the FALSE rows (one OR-clause per false row, joined by AND), with the OPPOSITE literal-negation convention from DNF; the two procedures are genuinely different, never the same steps applied twice', isCorrect: true },
      { text: 'Yes — both DNF and CNF are constructed from the same true rows using the same negation convention, just written in a different form', isCorrect: false, misconceptionId: `${PROPOSITIONAL_LOGIC}:MC-2` },
      { text: "Yes, since CNF and DNF are just two different labels for the same construction procedure applied to a truth table", isCorrect: false, misconceptionId: `${PROPOSITIONAL_LOGIC}:MC-2` },
    ],
    targetedMisconceptions: [`${PROPOSITIONAL_LOGIC}:MC-2`],
    source: eb(PROPOSITIONAL_LOGIC, 'Misconceptions MC-2 detection probe — "is CNF built the same way as DNF," an answer of "yes" confirming CNF-BUILT-LIKE-DNF'),
  },
  {
    conceptId: PROPOSITIONAL_LOGIC, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Since checking whether one specific assignment satisfies a formula is fast and easy, must determining whether ANY satisfying assignment exists also be easy?',
    choices: [
      { text: 'No — checking one assignment is a single trivial evaluation, but determining satisfiability in general requires, in the worst case, checking all 2ⁿ possible assignments with no known efficient shortcut (SAT is NP-complete); easy-to-verify never implies easy-to-decide', isCorrect: true },
      { text: 'Yes — since evaluating any single assignment is fast, finding whether a satisfying one exists must also be fast in general', isCorrect: false, misconceptionId: `${PROPOSITIONAL_LOGIC}:MC-3` },
      { text: "Yes, because a problem that is easy to check is always just as easy to solve in general", isCorrect: false, misconceptionId: `${PROPOSITIONAL_LOGIC}:MC-3` },
    ],
    targetedMisconceptions: [`${PROPOSITIONAL_LOGIC}:MC-3`],
    source: eb(PROPOSITIONAL_LOGIC, 'Misconceptions MC-3 detection probe — "does easy verification imply easy decision," an answer of "yes" confirming EASY-VERIFICATION-ASSUMED-TO-IMPLY-EASY-DECISION'),
  },
]
