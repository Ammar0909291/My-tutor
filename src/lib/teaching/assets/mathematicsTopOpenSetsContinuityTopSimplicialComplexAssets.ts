/**
 * Batch: open-sets, continuity-top, simplicial-complex (math.top) — 1/23 -> 4/23.
 *
 * Fresh Phase 0 frontier recompute after topological-space was authored:
 * 9 concepts became ready simultaneously (open-sets, basis, continuity-
 * top, compactness, connectedness, separation-axioms, quotient-space,
 * product-space, simplicial-complex). This batch prioritizes the 3 that
 * themselves unlock further math.top concepts (open-sets -> interior-
 * closure; continuity-top -> homeomorphism; simplicial-complex ->
 * homology), leaving the 6 domain-leaf-for-now concepts (basis,
 * compactness, connectedness, separation-axioms, quotient-space,
 * product-space) for subsequent batches.
 * Transcribed from their frozen Educational Brain entries at educational-
 * brain/concepts/mathematics/math.top.open-sets.md,
 * math.top.continuity-top.md, and math.top.simplicial-complex.md.
 *
 * Grade band: GradeBand.UNDERGRADUATE, matching this domain's established
 * baseline.
 *
 * open-sets' cross-link (math.real.open-sets) and continuity-top's
 * cross-link (math.real.continuity-rigorous) are both authored — genuine
 * transfer targets. simplicial-complex declares no KG cross-link.
 *
 * All 3 EB entries register exactly 3 formal misconceptions each (full
 * contract, no retargeting needed).
 *
 * Seeded as DRAFT. Promotion stays human.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedExplanation, SeedProbe } from './brainSeedAssets'

const S = 'mathematics'
const eb = (id: string, what: string) =>
  `educational-brain/concepts/mathematics/${id}.md — ${what}`

const OPEN_SETS = 'math.top.open-sets'
const CONTINUITY_TOP = 'math.top.continuity-top'
const SIMPLICIAL_COMPLEX = 'math.top.simplicial-complex'

export const MATHEMATICS_TOP_OPEN_SETS_CONTINUITY_TOP_SIMPLICIAL_COMPLEX_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: OPEN_SETS, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'OPEN AND CLOSED ARE DEFINED PURELY FROM τ — NEVER REQUIRING A METRIC: for X={a,b,c} with a '
      + 'topology containing the empty set, {a}, {a,b}, and X: the OPEN sets are exactly those four '
      + 'elements. The CLOSED sets are their complements: X, {b,c}, {c}, and the empty set. This '
      + 'entire computation used ZERO distance or metric-ball reasoning — a genuine generalization '
      + 'of the metric-ball-based definitions, never merely a relabeling.\n\n'
      + 'A NONEMPTY SET CAN HAVE EMPTY INTERIOR — NEVER ASSUMED AUTOMATICALLY NONEMPTY: for the '
      + 'same X and topology: the interior of {b} asks for the LARGEST open set contained in {b}. '
      + 'Checking each open set: the empty set is trivially contained; {a}, {a,b}, and X are not '
      + 'subsets of {b}. The ONLY open subset of {b} is the empty set itself — so the interior of '
      + '{b} is empty, even though {b} is perfectly nonempty. Interior asks "what\'s the biggest '
      + 'open set hiding INSIDE this set" — and for some perfectly nonempty sets, in some '
      + 'topologies, the honest answer is nothing at all.\n\n'
      + 'THE BOUNDARY CAN BE THE ENTIRE SPACE — NEVER ASSUMED ALWAYS THIN: for A=(2,5) in R: the '
      + 'closure of A is [2,5], the closure of its complement is everything outside (2,5), giving a '
      + 'boundary of just {2,5} — matching familiar "endpoints" intuition. But for A=the rationals: '
      + 'since BOTH the rationals AND the irrationals are DENSE in R, the closure of each is all of '
      + 'R, giving a boundary equal to ALL of R — the ENTIRE real line. When a set and its '
      + 'complement are BOTH dense, the boundary swallows the whole space — never a thin "edge," '
      + 'contrary to the interval-endpoint intuition.',
    targetedMisconceptions: [`${OPEN_SETS}:MC-1`, `${OPEN_SETS}:MC-2`, `${OPEN_SETS}:MC-3`],
    source: eb(OPEN_SETS, 'Core Understanding — open and closed being defined purely from the topology never requiring a metric, a nonempty set being able to have empty interior never assumed automatically nonempty, and the boundary being able to be the entire space never assumed always thin'),
  },
  {
    conceptId: CONTINUITY_TOP, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'CONTINUITY RUNS ON PREIMAGES, NEVER FORWARD IMAGES: let f(x)=5 (constant) on R. Checking '
      + 'the open interval (4,6): its preimage is all of R, open. Checking (0,1): its preimage is '
      + 'the empty set, open. Every preimage test passes, so f IS continuous. But the FORWARD image '
      + 'of the open set (0,1) under f is just {5} — a single point, NOT open. A continuous function '
      + 'can perfectly well send an open set forward to a non-open one; the definition constrains '
      + 'ONLY what pulls back from the target\'s open sets, never what pushes forward.\n\n'
      + 'THE OPEN-SET DEFINITION GENERALIZES ε-δ — NEVER A MERE REPHRASING WITH NO INDEPENDENT '
      + 'VALUE: for f(x)=2x+1 at a=3: the preimage of an epsilon-interval around 7 works out to '
      + 'EXACTLY the interval around 3 with radius epsilon/2 — the same delta that the classical '
      + 'epsilon-delta definition derives. Same content, different vocabulary — for METRIC spaces. '
      + 'But the open-set definition remains meaningful in a space where NO metric exists at all '
      + '(the indiscrete topology) — there, "epsilon" and "delta" cannot even be written down, while '
      + '"for every open V, the preimage of V is open" still applies unchanged. The generalization '
      + 'is genuine, never a stylistic detour around an already-adequate tool.\n\n'
      + 'COMPOSITION NEVER NEEDS RE-DERIVATION FROM SCRATCH: for f(x)=x² and g(x)=x+1, both '
      + 'continuous: the preimage under the composite g∘f of any open W equals the preimage under f '
      + 'of the preimage under g of W — since g continuous makes the inner preimage open, and f '
      + 'continuous then makes the outer preimage open, the composite is continuous with NO extra '
      + 'distance-based work at all. This set-identity argument uses only open sets, so it applies '
      + 'IDENTICALLY in any topological space with no metric whatsoever — confirming continuity is '
      + 'a genuinely TOPOLOGICAL property, never one requiring a fresh proof for each new composite.',
    targetedMisconceptions: [`${CONTINUITY_TOP}:MC-1`, `${CONTINUITY_TOP}:MC-2`, `${CONTINUITY_TOP}:MC-3`],
    source: eb(CONTINUITY_TOP, 'Core Understanding — continuity running on preimages never forward images, the open-set definition genuinely generalizing epsilon-delta never a mere rephrasing, and composition never needing re-derivation from scratch since continuity is a genuinely topological property'),
  },
  {
    conceptId: SIMPLICIAL_COMPLEX, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'FACE-CLOSURE MUST BE EXPLICIT — NEVER ASSUMED AUTOMATIC: a collection representing a filled '
      + 'triangle A,B,C must EXPLICITLY include the 2-simplex {A,B,C} AND all three edges {A,B}, '
      + '{A,C}, {B,C} AND all three vertices {A}, {B}, {C} — 7 simplices total. Listing JUST the '
      + '2-simplex {A,B,C} alone, without separately including its edges and vertices, FAILS to be '
      + 'a valid simplicial complex — even though the triangle "obviously contains" those faces '
      + 'geometrically. The simplicial complex is defined by which simplices are EXPLICITLY in the '
      + 'collection, never by what\'s geometrically implied.\n\n'
      + 'A TRIANGULATION IS A CHOSEN MODEL — NEVER THE SPACE\'S UNIQUE INTRINSIC STRUCTURE: a '
      + 'filled square can be triangulated via ONE diagonal (2 triangles sharing one edge, 4 '
      + 'vertices, 5 edges, 2 faces) OR via BOTH diagonals meeting at the center (4 triangles '
      + 'sharing a central vertex, 5 vertices, 8 edges, 4 faces). BOTH are valid simplicial '
      + 'complexes (each closed under faces), and BOTH represent the SAME topological space — the '
      + 'filled square — despite having genuinely DIFFERENT vertex/edge/face counts. The square has '
      + 'no single "correct" triangulation; a triangulation is a chosen representation, never an '
      + 'intrinsic, unique feature of the space itself.\n\n'
      + 'THE COMPACT-MANIFOLD TRIANGULATION GUARANTEE IS SCOPED — NEVER EXTENDED TO EVERY SPACE: '
      + 'the sphere S² (a compact manifold) admits a triangulation — the surface of a regular '
      + 'tetrahedron (4 triangular faces, 6 edges, 4 vertices) is topologically a valid '
      + 'triangulation. But the theorem "every compact manifold admits a triangulation" applies '
      + 'SPECIFICALLY to spaces that are BOTH compact AND manifolds — the non-compact open '
      + 'half-plane fails the compactness hypothesis, so this SPECIFIC theorem is simply SILENT '
      + 'about it (never claiming it\'s untriangulable, just outside this theorem\'s scope). '
      + 'Dropping either hypothesis removes the guarantee entirely — it never automatically extends '
      + 'further.',
    targetedMisconceptions: [`${SIMPLICIAL_COMPLEX}:MC-1`, `${SIMPLICIAL_COMPLEX}:MC-2`, `${SIMPLICIAL_COMPLEX}:MC-3`],
    source: eb(SIMPLICIAL_COMPLEX, 'Core Understanding — face-closure needing to be explicit never assumed automatic, a triangulation being a chosen model never the space\'s unique intrinsic structure, and the compact-manifold triangulation guarantee being scoped never extended to every space'),
  },
]

export const MATHEMATICS_TOP_OPEN_SETS_CONTINUITY_TOP_SIMPLICIAL_COMPLEX_PROBES: SeedProbe[] = [
  {
    conceptId: OPEN_SETS, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Can interior, closure, and boundary only be computed using distance or metric balls?',
    choices: [
      { text: "No — for X={a,b,c} with a specific topology, the open sets are exactly the topology's declared elements, and closed sets their complements — ZERO distance or metric-ball reasoning was used; interior, closure, and boundary are all defined purely from the declared topology", isCorrect: true },
      { text: "Yes, interior, closure, and boundary can only be defined or computed using distance or metric balls", isCorrect: false, misconceptionId: `${OPEN_SETS}:MC-1` },
      { text: "Since these concepts were first encountered via metric balls, they should be understood as inherently requiring a metric to make sense", isCorrect: false, misconceptionId: `${OPEN_SETS}:MC-1` },
    ],
    targetedMisconceptions: [`${OPEN_SETS}:MC-1`],
    source: eb(OPEN_SETS, 'Discovery Question 1 as a detection probe (verbatim) — whether interior/closure/boundary require a metric, an answer of "yes" confirming TOPOLOGICAL-CONCEPTS-ASSUMED-TO-NEED-A-METRIC'),
  },
  {
    conceptId: OPEN_SETS, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Does every nonempty set have a nonempty interior?',
    choices: [
      { text: "No — for X={a,b,c} with a topology containing {a},{a,b},X: the interior of {b} asks for the largest open set contained in {b}, but the ONLY open subset of {b} is the empty set, so the interior of {b} is empty even though {b} itself is nonempty", isCorrect: true },
      { text: "Yes, every nonempty set automatically has a nonempty interior", isCorrect: false, misconceptionId: `${OPEN_SETS}:MC-2` },
      { text: "Since \"nonempty\" and \"has interior\" feel like properties that should track together, a nonempty set should always have some nonempty interior", isCorrect: false, misconceptionId: `${OPEN_SETS}:MC-2` },
    ],
    targetedMisconceptions: [`${OPEN_SETS}:MC-2`],
    source: eb(OPEN_SETS, 'Discovery Question 2 as a detection probe (verbatim) — whether every nonempty set has a nonempty interior, an answer of "yes" confirming NONEMPTY-SET-ASSUMED-NONEMPTY-INTERIOR'),
  },
  {
    conceptId: OPEN_SETS, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: "Is the boundary of a set always a small, thin collection of 'edge' points?",
    choices: [
      { text: "No — for A equal to the rationals in R: since BOTH the rationals AND the irrationals are dense in R, the closure of each is all of R, giving a boundary equal to the ENTIRE real line, not a thin edge; this contrasts with an interval like (2,5), whose boundary is just its two endpoints", isCorrect: true },
      { text: "Yes, a set's boundary is always a small, thin collection of edge points, like an interval's endpoints", isCorrect: false, misconceptionId: `${OPEN_SETS}:MC-3` },
      { text: "Since the interval example gives a thin, two-point boundary, that pattern should generalize to every set's boundary being similarly thin", isCorrect: false, misconceptionId: `${OPEN_SETS}:MC-3` },
    ],
    targetedMisconceptions: [`${OPEN_SETS}:MC-3`],
    source: eb(OPEN_SETS, 'Discovery Question 3 as a detection probe (verbatim) — whether a set\'s boundary is always thin, an answer of "yes" confirming BOUNDARY-ASSUMED-ALWAYS-THIN'),
  },
  {
    conceptId: CONTINUITY_TOP, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Does continuity mean that f sends open sets forward to open sets?',
    choices: [
      { text: "No — continuity is defined via PREIMAGES, never forward images; the constant function f(x)=5 on R is continuous (every preimage test passes), yet the forward image of the open set (0,1) under f is just the single point {5}, which is NOT open", isCorrect: true },
      { text: "Yes, continuity requires that f sends open sets forward to open sets", isCorrect: false, misconceptionId: `${CONTINUITY_TOP}:MC-1` },
      { text: "Since \"continuous\" colloquially suggests smooth forward behavior, the definition should be understood as constraining what happens to open sets going forward", isCorrect: false, misconceptionId: `${CONTINUITY_TOP}:MC-1` },
    ],
    targetedMisconceptions: [`${CONTINUITY_TOP}:MC-1`],
    source: eb(CONTINUITY_TOP, 'Discovery Question 1 as a detection probe (verbatim) — whether continuity means open sets map forward to open sets, an answer of "yes" confirming CONTINUITY-DEFINITION-DIRECTION-REVERSED'),
  },
  {
    conceptId: CONTINUITY_TOP, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Is the open-set definition just a rephrasing of ε-δ with no independent use, since ε-δ already works for metric spaces?',
    choices: [
      { text: "No — the open-set definition remains meaningful in a space where NO metric exists at all (like the indiscrete topology), where \"epsilon\" and \"delta\" cannot even be written down, while \"for every open V, the preimage of V is open\" still applies unchanged; the generalization is genuine", isCorrect: true },
      { text: "Yes, the open-set definition is just a stylistic alternative to epsilon-delta with no independent value beyond metric spaces", isCorrect: false, misconceptionId: `${CONTINUITY_TOP}:MC-2` },
      { text: "Since epsilon-delta already works for the metric spaces usually studied first, the open-set definition should be viewed as an unnecessary rephrasing", isCorrect: false, misconceptionId: `${CONTINUITY_TOP}:MC-2` },
    ],
    targetedMisconceptions: [`${CONTINUITY_TOP}:MC-2`],
    source: eb(CONTINUITY_TOP, 'Discovery Question 2 as a detection probe (verbatim) — whether the open-set definition is just a rephrasing of epsilon-delta, an answer of "yes" confirming OPEN-SET-DEFINITION-TREATED-AS-MERE-REPHRASING'),
  },
  {
    conceptId: CONTINUITY_TOP, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'If f and g are both known to be continuous, do you need to re-derive continuity of g∘f from scratch?',
    choices: [
      { text: "No — the preimage under g∘f of any open W equals the preimage under f of the preimage under g of W, a general set-identity argument using only open sets; this proves the composite continuous once and for all, applying identically in any topological space with no metric needed", isCorrect: true },
      { text: "Yes, continuity of a composite function g∘f must be re-derived from scratch each time, even when f and g are individually known to be continuous", isCorrect: false, misconceptionId: `${CONTINUITY_TOP}:MC-3` },
      { text: "Since each new pair of functions looks different, verifying their composite's continuity should require its own fresh epsilon-delta or preimage argument every time", isCorrect: false, misconceptionId: `${CONTINUITY_TOP}:MC-3` },
    ],
    targetedMisconceptions: [`${CONTINUITY_TOP}:MC-3`],
    source: eb(CONTINUITY_TOP, 'Discovery Question 3 as a detection probe (verbatim) — whether composite continuity must be re-derived from scratch, an answer of "yes" confirming COMPOSITION-CONTINUITY-RE-DERIVED-FROM-SCRATCH'),
  },
  {
    conceptId: SIMPLICIAL_COMPLEX, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'If a collection includes a triangle, are its edges and vertices automatically considered part of the simplicial complex even if not separately listed?',
    choices: [
      { text: "No — face-closure must be EXPLICIT; a valid complex representing a filled triangle A,B,C must explicitly include the 2-simplex AND all three edges AND all three vertices (7 simplices total) — listing just the triangle alone FAILS to be a valid simplicial complex, even though the faces are geometrically implied", isCorrect: true },
      { text: "Yes, a simplex's faces are automatically part of a simplicial complex without needing to be explicitly listed", isCorrect: false, misconceptionId: `${SIMPLICIAL_COMPLEX}:MC-1` },
      { text: "Since a triangle obviously contains its edges and vertices geometrically, listing just the triangle should be sufficient to define a valid simplicial complex", isCorrect: false, misconceptionId: `${SIMPLICIAL_COMPLEX}:MC-1` },
    ],
    targetedMisconceptions: [`${SIMPLICIAL_COMPLEX}:MC-1`],
    source: eb(SIMPLICIAL_COMPLEX, 'Discovery Question 1 as a detection probe (verbatim) — whether a simplex\'s faces are automatically included, an answer of "yes" confirming SIMPLEX-FACES-ASSUMED-AUTOMATICALLY-INCLUDED'),
  },
  {
    conceptId: SIMPLICIAL_COMPLEX, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Does a topological space have one single, intrinsically correct triangulation, or can it have multiple genuinely different valid ones?',
    choices: [
      { text: "It can have multiple genuinely different valid ones — a filled square can be triangulated via one diagonal (2 triangles) OR both diagonals (4 triangles meeting at the center), with genuinely different vertex/edge/face counts, yet BOTH represent the exact same square; there is no single 'correct' triangulation", isCorrect: true },
      { text: "A topological space has one single, intrinsically correct triangulation that uniquely represents it", isCorrect: false, misconceptionId: `${SIMPLICIAL_COMPLEX}:MC-2` },
      { text: "Since the first triangulation of a shape one encounters tends to feel canonical, it should be treated as THE triangulation of that space", isCorrect: false, misconceptionId: `${SIMPLICIAL_COMPLEX}:MC-2` },
    ],
    targetedMisconceptions: [`${SIMPLICIAL_COMPLEX}:MC-2`],
    source: eb(SIMPLICIAL_COMPLEX, 'Discovery Question 2 as a detection probe (verbatim) — whether a space has one single intrinsic triangulation, an answer of "yes, one single" confirming SIMPLICIAL-COMPLEX-AS-UNIQUE-INTRINSIC-STRUCTURE'),
  },
  {
    conceptId: SIMPLICIAL_COMPLEX, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Does the fact that every compact manifold is triangulable mean every topological space is triangulable?',
    choices: [
      { text: "No — the theorem's guarantee is SCOPED specifically to spaces that are BOTH compact AND manifolds; the non-compact open half-plane fails the compactness hypothesis, so this specific theorem is simply SILENT about it, never claiming it's untriangulable — dropping either hypothesis removes the guarantee entirely", isCorrect: true },
      { text: "Yes, since compact manifolds are triangulable, every topological space must also be triangulable", isCorrect: false, misconceptionId: `${SIMPLICIAL_COMPLEX}:MC-3` },
      { text: "Since triangulability is such a positive and important result for compact manifolds, it should be expected to extend to all topological spaces in general", isCorrect: false, misconceptionId: `${SIMPLICIAL_COMPLEX}:MC-3` },
    ],
    targetedMisconceptions: [`${SIMPLICIAL_COMPLEX}:MC-3`],
    source: eb(SIMPLICIAL_COMPLEX, 'Discovery Question 3 as a detection probe (verbatim) — whether every topological space is triangulable because compact manifolds are, an answer of "yes" confirming COMPACT-MANIFOLD-TRIANGULATION-OVERGENERALIZED'),
  },
]
