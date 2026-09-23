/**
 * Batch: extremal-graph-theory, random-graph (math.graph) — DOMAIN COMPLETE.
 *
 * Closes math.graph out at 16/16 (DOMAIN CERTIFIED). Fresh frontier
 * recompute found exactly these 2 concepts ready, the domain's last two
 * remaining. extremal-graph-theory requires math.graph.graph and
 * math.disc.combinatorics (both already authored); random-graph requires
 * math.graph.graph and math.prob.probability-axioms (both already
 * authored). Transcribed from the frozen Educational Brain entries at
 * educational-brain/concepts/mathematics/math.graph.
 * {extremal-graph-theory,random-graph}.md.
 *
 * Grade band: both retain GradeBand.HIGH. extremal-graph-theory (EB
 * difficulty "research") has prerequisites math.graph.graph and
 * math.disc.combinatorics, both GradeBand.HIGH. random-graph (EB
 * difficulty "research") has prerequisites math.graph.graph and
 * math.prob.probability-axioms, both GradeBand.HIGH. Neither has a
 * prerequisite that itself pulls into undergraduate content, so — per the
 * established convention — grade band follows the prerequisite chain,
 * never the EB difficulty label alone, and both stay HIGH despite the
 * "research" label (the most advanced difficulty tag used anywhere in this
 * domain).
 *
 *   EXTREMAL-GRAPH-THEORY  Turán's theorem is a genuine EXTREMAL
 *           (maximize-under-a-constraint) question, never a restatement of
 *           ordinary edge counting from math.graph.graph; the theorem's
 *           bound is never merely an abstract ceiling — the Turán graph
 *           $T(n,r)$ EXPLICITLY, VERIFIABLY ACHIEVES it, hand-buildable and
 *           hand-checkable; the Szemerédi Regularity Lemma is NEVER another
 *           precise numerical formula like Turán's theorem — it is a
 *           qualitative structural decomposition guarantee, used as
 *           machinery WITHIN other proofs rather than answering any one
 *           extremal number directly.
 *   RANDOM-GRAPH  $E[\#\text{edges}]=\binom{n}{2}p$ is an AVERAGE across
 *           many draws, NEVER a per-realization guarantee — any single
 *           drawn graph can genuinely differ; "asymptotically almost
 *           surely" is a LIMITING probability as $n\to\infty$, NEVER a
 *           universal claim about every finite-$n$ graph — finite-$n$
 *           exceptions remain genuinely possible; the connectivity
 *           threshold at $p^*=\log(n)/n$ is a SHARP PHASE TRANSITION,
 *           NEVER a gradual, smooth ramp — probability flips rapidly from
 *           almost-never to almost-always in a narrow window.
 *
 * Seeded as DRAFT. Promotion stays human.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedExplanation, SeedProbe } from './brainSeedAssets'

const S = 'mathematics'
const eb = (id: string, what: string) =>
  `educational-brain/concepts/mathematics/${id}.md — ${what}`

const EXTREMAL_GRAPH_THEORY = 'math.graph.extremal-graph-theory'
const RANDOM_GRAPH = 'math.graph.random-graph'

export const MATHEMATICS_GRAPH_EXTREMAL_GRAPH_THEORY_RANDOM_GRAPH_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: EXTREMAL_GRAPH_THEORY, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      "TURÁN'S THEOREM IS A GENUINE EXTREMAL QUESTION, NEVER A RESTATEMENT OF ORDINARY EDGE "
      + 'COUNTING: it asks, among ALL $n$-vertex graphs containing NO $K_{r+1}$, what is the LARGEST '
      + 'possible edge count — a search over an entire FAMILY of qualifying graphs for the best one, '
      + 'not a computation on a single given graph. The answer, $\\mathrm{ex}(n,K_{r+1})=(1-1/r)n^2/2$, '
      + 'is an exact maximum under a forbidden-subgraph CONSTRAINT — a qualitatively new optimization '
      + 'structure layered on top of basic edge counting, never a mere elaboration of it.\n\n'
      + "THE THEOREM'S BOUND IS NEVER MERELY AN ABSTRACT CEILING — THE TURÁN GRAPH $T(n,r)$ "
      + 'EXPLICITLY, VERIFIABLY ACHIEVES IT: $T(n,r)$ partitions $n$ vertices into $r$ nearly-equal '
      + 'groups, connecting every cross-group pair while leaving every within-group pair unconnected. '
      + 'For $n=6,r=2$: two groups of 3, giving $K_{3,3}$ with exactly $(3\\times3=9)$ edges — precisely '
      + "matching the theorem's claimed maximum. $K_{r+1}$-FREENESS is verified directly by "
      + 'pigeonhole: any $r+1$ vertices must include two from the SAME group (only $r$ groups exist), '
      + 'and those two are non-adjacent by construction, so no $(r+1)$-clique can ever form — the '
      + 'bound is hand-built and hand-checked, never an unreachable abstraction.\n\n'
      + 'THE SZEMERÉDI REGULARITY LEMMA IS NEVER ANOTHER PRECISE NUMERICAL FORMULA LIKE '
      + "TURÁN'S THEOREM — IT IS A QUALITATIVE STRUCTURAL DECOMPOSITION GUARANTEE, USED AS MACHINERY "
      + "WITHIN OTHER PROOFS: where Turán's theorem hands over an EXACT number and an explicit "
      + 'construction, the Regularity Lemma instead guarantees that ANY sufficiently dense graph\'s '
      + 'vertex set decomposes into a bounded number of parts whose inter-part edges behave '
      + "quasi-randomly — a fundamentally DIFFERENT kind of result, with no specific numerical answer "
      + 'to any one question and no direct construction of a particular extremal graph, invoked as a '
      + 'general-purpose tool inside many OTHER extremal proofs rather than serving as a direct answer '
      + 'itself.',
    targetedMisconceptions: [`${EXTREMAL_GRAPH_THEORY}:MC-1`, `${EXTREMAL_GRAPH_THEORY}:MC-2`, `${EXTREMAL_GRAPH_THEORY}:MC-3`],
    source: eb(EXTREMAL_GRAPH_THEORY, "Core Understanding — Turán's theorem as a genuine extremal question never a restatement of ordinary edge counting, the theorem's bound never merely an abstract ceiling since the Turán graph explicitly and verifiably achieves it, and the Szemerédi Regularity Lemma never another precise numerical formula like Turán's theorem but a qualitative structural decomposition guarantee used as machinery within other proofs"),
  },
  {
    conceptId: RANDOM_GRAPH, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      '$E[\\#\\text{EDGES}]=\\binom{n}{2}p$ IS AN AVERAGE ACROSS MANY DRAWS, NEVER A '
      + 'PER-REALIZATION GUARANTEE: for $G(5,0.3)$, total possible edges $\\binom{5}{2}=10$, each '
      + 'independently present with probability $(0.3)$, gives $E[\\#\\text{edges}]=10\\times0.3=3$ via '
      + 'linearity of expectation. The ACTUAL realized graph on any single draw could have anywhere '
      + 'from 0 to 10 edges — 3 is only the MEAN over many independent draws, never a promise that '
      + 'this specific realization will have exactly 3 edges.\n\n'
      + '"ASYMPTOTICALLY ALMOST SURELY" IS A LIMITING PROBABILITY AS $n\\to\\infty$, NEVER A '
      + 'UNIVERSAL CLAIM ABOUT EVERY FINITE-$n$ GRAPH: "$G(n,p)$ is connected a.a.s." means '
      + '$P(\\text{connected})\\to1$ AS $n\\to\\infty$ — for any SPECIFIC finite $n$, some random '
      + 'draws can still genuinely fail to be connected, with that failure probability merely '
      + 'shrinking toward 0 as $n$ grows. Reading "almost surely" as "literally every graph, at every '
      + '$n$" is never correct; it describes a limit, never a universal fact at any one finite size.\n\n'
      + 'THE CONNECTIVITY THRESHOLD AT $p^*=\\log(n)/n$ IS A SHARP PHASE TRANSITION, NEVER A '
      + 'GRADUAL, SMOOTH RAMP: for $p$ significantly LARGER than $p^*$, $G(n,p)$ is connected a.a.s. '
      + '(probability $\\to1$); for $p$ significantly SMALLER, it is disconnected a.a.s. (probability '
      + '$\\to0$) — the transition is genuinely SUDDEN, concentrated in a narrow window around $p^*$, '
      + 'never a slow, steady climb from unlikely to likely as $p$ increases across its full range. '
      + 'This rapid flip from almost-never to almost-always is one of random graph theory\'s most '
      + 'striking phenomena, and assuming it behaves like a smooth dial is never valid.',
    targetedMisconceptions: [`${RANDOM_GRAPH}:MC-1`, `${RANDOM_GRAPH}:MC-2`, `${RANDOM_GRAPH}:MC-3`],
    source: eb(RANDOM_GRAPH, 'Core Understanding — the expected edge count as an average across many draws never a per-realization guarantee, asymptotically almost surely as a limiting probability as n approaches infinity never a universal claim about every finite-n graph, and the connectivity threshold as a sharp phase transition never a gradual smooth ramp'),
  },
]

export const MATHEMATICS_GRAPH_EXTREMAL_GRAPH_THEORY_RANDOM_GRAPH_PROBES: SeedProbe[] = [
  {
    conceptId: EXTREMAL_GRAPH_THEORY, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Is Turán\'s theorem just restating how to count a graph\'s edges, the way you already know how to do?',
    choices: [
      { text: 'No — Turán\'s theorem asks a genuinely new optimization question: among ALL n-vertex graphs avoiding a given clique, which has the MOST edges, a search over a whole family of graphs rather than a count on one', isCorrect: true },
      { text: 'Yes — since it still involves counting edges, Turán\'s theorem is essentially the same skill as ordinary edge counting', isCorrect: false, misconceptionId: `${EXTREMAL_GRAPH_THEORY}:MC-1` },
      { text: "Yes, because any statement involving an edge count is just an instance of basic edge counting", isCorrect: false, misconceptionId: `${EXTREMAL_GRAPH_THEORY}:MC-1` },
    ],
    targetedMisconceptions: [`${EXTREMAL_GRAPH_THEORY}:MC-1`],
    source: eb(EXTREMAL_GRAPH_THEORY, 'Misconceptions MC-1 detection probe (verbatim, Blueprint) — whether Turán\'s theorem restates ordinary edge counting, an answer of "yes" confirming TURAN-THEOREM-ASSUMED-MERE-EDGE-COUNTING'),
  },
  {
    conceptId: EXTREMAL_GRAPH_THEORY, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: "Does Turán's theorem only tell you the maximum edge count is at most some number, without showing you a graph that actually reaches it?",
    choices: [
      { text: "No — the Turán graph T(n,r) explicitly and verifiably achieves the bound; for n=6, r=2, the graph K_{3,3} has exactly 9 edges, matching the claimed maximum, and is directly confirmed triangle-free by pigeonhole", isCorrect: true },
      { text: 'Yes — Turán\'s theorem only establishes an abstract upper bound with no concrete achieving construction', isCorrect: false, misconceptionId: `${EXTREMAL_GRAPH_THEORY}:MC-2` },
      { text: "Yes, since upper bounds in extremal combinatorics are generally unreachable in practice", isCorrect: false, misconceptionId: `${EXTREMAL_GRAPH_THEORY}:MC-2` },
    ],
    targetedMisconceptions: [`${EXTREMAL_GRAPH_THEORY}:MC-2`],
    source: eb(EXTREMAL_GRAPH_THEORY, 'Misconceptions MC-2 detection probe (verbatim, Blueprint) — whether Turán\'s theorem\'s bound is merely abstract, an answer of "yes" confirming TURAN-BOUND-ASSUMED-MERELY-ABSTRACT'),
  },
  {
    conceptId: EXTREMAL_GRAPH_THEORY, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Does the Szemerédi Regularity Lemma give you a specific maximum edge count, the way Turán\'s theorem does, just for a different forbidden pattern?',
    choices: [
      { text: 'No — the Regularity Lemma is a qualitative structural guarantee (any sufficiently dense graph decomposes into a bounded number of quasi-random parts), used as machinery WITHIN other proofs, never itself a specific numerical extremal formula', isCorrect: true },
      { text: 'Yes — the Regularity Lemma is essentially another precise numerical formula like Turán\'s theorem, just applied to a different forbidden subgraph', isCorrect: false, misconceptionId: `${EXTREMAL_GRAPH_THEORY}:MC-3` },
      { text: "Yes, since all major extremal graph theory results take the same formula-shaped structure as Turán's theorem", isCorrect: false, misconceptionId: `${EXTREMAL_GRAPH_THEORY}:MC-3` },
    ],
    targetedMisconceptions: [`${EXTREMAL_GRAPH_THEORY}:MC-3`],
    source: eb(EXTREMAL_GRAPH_THEORY, 'Misconceptions MC-3 detection probe (verbatim, Blueprint) — whether the Regularity Lemma is another numerical formula like Turán\'s theorem, an answer of "yes" confirming REGULARITY-LEMMA-ASSUMED-ANOTHER-NUMERICAL-FORMULA'),
  },
  {
    conceptId: RANDOM_GRAPH, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Does $E[\\#\\text{edges}]=\\binom{n}{2}p$ mean every single random draw of $G(n,p)$ will have exactly that many edges?',
    choices: [
      { text: 'No — this is an average over many independent draws; for $G(5,0.3)$, $E[\\#\\text{edges}]=3$, but any single realized graph could genuinely have anywhere from 0 to 10 edges', isCorrect: true },
      { text: 'Yes — the expected edge count is a guaranteed, fixed outcome that every single random draw of the graph must exhibit', isCorrect: false, misconceptionId: `${RANDOM_GRAPH}:MC-1` },
      { text: "Yes, since expected value describes a fixed property true of every individual realization", isCorrect: false, misconceptionId: `${RANDOM_GRAPH}:MC-1` },
    ],
    targetedMisconceptions: [`${RANDOM_GRAPH}:MC-1`],
    source: eb(RANDOM_GRAPH, 'Discovery Question 1 as a detection probe (verbatim) — whether $E[\\#\\text{edges}]$ guarantees every draw\'s edge count, an answer of "yes" confirming EXPECTED-EDGE-COUNT-MISTAKEN-FOR-GUARANTEE'),
  },
  {
    conceptId: RANDOM_GRAPH, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: "Does 'G(n,p) is connected asymptotically almost surely' mean literally every graph, for every n, is connected?",
    choices: [
      { text: 'No — a.a.s. means $P(\\text{connected})\\to1$ as $n\\to\\infty$; for any specific finite $n$, some random draws can still genuinely fail to be connected, with that failure probability merely shrinking as $n$ grows', isCorrect: true },
      { text: 'Yes — asymptotically almost surely means the property holds universally, for literally every graph at every value of n', isCorrect: false, misconceptionId: `${RANDOM_GRAPH}:MC-2` },
      { text: "Yes, since 'almost surely' is an absolute guarantee with no finite-n exceptions possible", isCorrect: false, misconceptionId: `${RANDOM_GRAPH}:MC-2` },
    ],
    targetedMisconceptions: [`${RANDOM_GRAPH}:MC-2`],
    source: eb(RANDOM_GRAPH, 'Discovery Question 2 as a detection probe (verbatim) — whether a.a.s. means a universal guarantee at every n, an answer of "yes" confirming AAS-MISTAKEN-FOR-UNIVERSAL-GUARANTEE'),
  },
  {
    conceptId: RANDOM_GRAPH, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Does the probability of a threshold property (like connectivity) increase smoothly and gradually as $p$ increases?',
    choices: [
      { text: 'No — at $p^*=\\log(n)/n$, the connectivity probability undergoes a SHARP phase transition, flipping rapidly from almost-never (well below $p^*$) to almost-always (well above $p^*$) within a narrow window, never a gentle, gradual ramp', isCorrect: true },
      { text: 'Yes — the probability of connectivity climbs steadily and gradually as $p$ rises from 0 to 1, like most probability concepts encountered previously', isCorrect: false, misconceptionId: `${RANDOM_GRAPH}:MC-3` },
      { text: "Yes, since threshold phenomena in random graphs behave the same smooth way as ordinary probability increases", isCorrect: false, misconceptionId: `${RANDOM_GRAPH}:MC-3` },
    ],
    targetedMisconceptions: [`${RANDOM_GRAPH}:MC-3`],
    source: eb(RANDOM_GRAPH, 'Discovery Question 3 as a detection probe (verbatim) — whether the connectivity threshold increases smoothly, an answer of "yes" confirming THRESHOLD-ASSUMED-GRADUAL'),
  },
]
