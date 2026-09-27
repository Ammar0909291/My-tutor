/**
 * Batch: basis, connectedness, interior-closure (math.top) — 10/23 -> 13/23.
 *
 * Fresh Phase 0 frontier recompute after fundamental-group, compactness,
 * and manifold were authored: all 13 remaining math.top concepts became
 * simultaneously ready (the domain has fanned out to its leaves). None of
 * the 13 unlock any further math.top concept, so this batch selects 3
 * core point-set concepts (basis, connectedness, interior-closure) to
 * continue in a principled order, leaving the remaining 10 (cohomology,
 * covering-space, euler-characteristic, homotopy-equivalence,
 * product-space, quotient-space, separation-axioms, smooth-manifold,
 * tychonoff, van-kampen) for subsequent batches.
 * Transcribed from their frozen Educational Brain entries at educational-
 * brain/concepts/mathematics/math.top.{basis,connectedness,
 * interior-closure}.md.
 *
 * Grade band: GradeBand.UNDERGRADUATE, matching this domain's established
 * baseline.
 *
 * connectedness' cross-link (math.real.connectedness) is authored — a
 * genuine transfer target. basis and interior-closure declare none.
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

const BASIS = 'math.top.basis'
const CONNECTEDNESS = 'math.top.connectedness'
const INTERIOR_CLOSURE = 'math.top.interior-closure'

export const MATHEMATICS_TOP_BASIS_CONNECTEDNESS_INTERIOR_CLOSURE_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: BASIS, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'CONDITION B2 IS A REFINEMENT REQUIREMENT — NEVER CLOSURE UNDER INTERSECTION: B2 asks only '
      + 'that SOME basis element B₃ fits inside B₁∩B₂ AT THE POINT x — it never demands B₁∩B₂ '
      + 'itself belong to the basis. For open balls in R²: B(x,r₁)∩B(x,r₂)=B(x,min(r₁,r₂)) happens '
      + 'to be a ball too — but that is a COINCIDENCE of balls, never a general requirement. If B2 '
      + 'demanded actual closure under intersection, the basis would BE a topology already, making '
      + 'the whole "basis generates a topology" framework pointless — B2\'s real job is only to '
      + 'guarantee refinability at each point, nothing stronger.\n\n'
      + 'DIFFERENT BASES CAN GENERATE THE SAME TOPOLOGY — NEVER ASSUMED AUTOMATICALLY DIFFERENT: '
      + 'compare B₁={(a,b):a,b∈R} with B₂={(a,b):a,b∈Q} on R. Applying the comparison criterion: '
      + 'for any (a,b)∈B₁ and x∈(a,b), density of Q gives rational p<x<q with (p,q)⊆(a,b), so B₂ '
      + 'refines B₁ at x; the reverse direction is immediate since B₂⊆B₁. Both directions hold, so '
      + 'the two topologies are equal — two GENUINELY different collections (one uncountable, one '
      + 'countable) generate the EXACT SAME topology. Believing distinct bases must yield distinct '
      + 'topologies misses this entirely.\n\n'
      + 'THE LOWER-LIMIT TOPOLOGY IS STRICTLY FINER — NEVER "JUST ANOTHER INTERVAL BASIS": '
      + 'comparing B_std={(a,b)} with B_LL={[a,b)}: for any (a,b)∈B_std and x∈(a,b), [x,b)∈B_LL '
      + 'satisfies x∈[x,b)⊆(a,b) — so the standard topology is contained in the lower-limit '
      + 'topology. But checking the reverse at [0,1)∈B_LL, x=0: EVERY standard interval (a,b) '
      + 'containing 0 has a<0, extending left past 0, so NO standard interval fits inside [0,1) at '
      + 'x=0 — [0,1) is LL-open but not standard-open. The comparison fails in only one direction, '
      + 'proving the standard topology is strictly contained in the lower-limit topology — genuinely '
      + 'finer, never merely a relabeling of the same "interval" idea.',
    targetedMisconceptions: [`${BASIS}:MC-1`, `${BASIS}:MC-2`, `${BASIS}:MC-3`],
    source: eb(BASIS, 'Core Understanding — condition B2 being a refinement requirement never closure under intersection, different bases being able to generate the same topology never assumed automatically different, and the lower-limit topology being strictly finer never just another interval basis'),
  },
  {
    conceptId: CONNECTEDNESS, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'CONNECTEDNESS IS ABOUT THE IMPOSSIBILITY OF AN OPEN SPLIT — NEVER ABOUT A METRIC OR '
      + 'DISTANCE DIRECTLY: for the finite space X={a,b,c} with a topology containing the empty '
      + 'set, {a}, {a,b}, and X: checking EVERY way to split X into two disjoint nonempty subsets — '
      + '{a}∪{b,c}: is {b,c} open? Scanning the topology: no. {a,b}∪{c}: is {a,b} open? Yes — but '
      + 'is {c} open? Scanning the topology: no. Since NO split has BOTH pieces open, X is '
      + 'connected. This exhaustive check used purely the declared topology, zero distance '
      + 'reasoning.\n\n'
      + 'THE OPEN-SET AND SEPARATED-SETS DEFINITIONS AGREE EXACTLY — NEVER TWO DIFFERENT NOTIONS: '
      + 'for E=[0,1]∪[2,3]⊂R: via the separated-sets route, [0,1] and [2,3] have disjoint closures '
      + '(the closure of [0,1] misses [2,3] entirely), so E is disconnected. Via THIS concept\'s '
      + 'open-set route: [0,1]=E∩(−1,1.5) and [2,3]=E∩(1.5,4) are BOTH open in E\'s subspace '
      + 'topology, disjoint, nonempty, and union to E — exhibiting the exact open split the '
      + 'definition asks for. Both routes reach the identical verdict "disconnected" by two '
      + 'genuinely equivalent characterizations, never two different concepts that happen to '
      + 'coincide by luck.\n\n'
      + 'PATH-CONNECTED IMPLIES CONNECTED BUT NOT CONVERSELY — NEVER ASSUMED EQUIVALENT: the '
      + 'topologist\'s sine curve T={(x,sin(1/x)):0<x≤1}∪({0}×[−1,1]) is CONNECTED (it is the '
      + 'closure of the connected curve piece, and closures of connected sets stay connected) but '
      + 'NOT path-connected — no continuous path exists from a point on the oscillating curve to a '
      + 'point on the vertical segment at x=0, because any such path\'s x-coordinate would have to '
      + 'pass through increasingly rapid oscillations that prevent continuity at x=0. '
      + 'Path-connectedness is a STRICTLY STRONGER property; connectedness alone never guarantees a '
      + 'path exists.',
    targetedMisconceptions: [`${CONNECTEDNESS}:MC-1`, `${CONNECTEDNESS}:MC-2`, `${CONNECTEDNESS}:MC-3`],
    source: eb(CONNECTEDNESS, 'Core Understanding — connectedness being about the impossibility of an open split never about a metric or distance directly, the open-set and separated-sets definitions agreeing exactly never two different notions, and path-connected implying connected but never conversely'),
  },
  {
    conceptId: INTERIOR_CLOSURE, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'INTERIOR IS EXISTENTIAL, CLOSURE IS UNIVERSAL — NEVER THE SAME QUANTIFIER FOR BOTH: for '
      + 'A=(0,1]⊂R: is 0 in the closure of A? Check: does EVERY open set containing 0 meet A? Yes '
      + '— any interval (−ε,ε) meets (0,1] for any ε>0. So 0 is in the closure, giving '
      + 'cl(A)=[0,1]. Is 0 in the interior of A? Check: does SOME open set containing 0 lie '
      + 'entirely in A? No open interval around 0 avoids negative numbers, so no — 0 is not in the '
      + 'interior, and in fact int(A)=(0,1). The SAME point 0 satisfies the universal "every '
      + 'neighborhood meets A" test but FAILS the existential "some neighborhood lies inside A" '
      + 'test — confirming the boundary of A equals [0,1]\\(0,1)={0,1}.\n\n'
      + 'DENSE MEANS EVERY OPEN SET MEETS A — NEVER THAT A EQUALS THE WHOLE SPACE: Q is dense in R '
      + '(cl(Q)=R, since every open interval, however small, contains a rational) — but Q≠R; Q is '
      + 'a strict, countable subset of the uncountable R. Meanwhile int(Q)=∅: no open interval lies '
      + 'entirely inside Q, since every interval also contains irrationals. So Q\'s interior, '
      + 'closure, and the set itself are THREE dramatically different objects (∅, R, Q) — density '
      + 'of the closure never collapses this distinction.\n\n'
      + 'THE BOUNDARY IS NOT ALWAYS A "NICE" SEPARATING CURVE — NEVER ASSUMED THIN OR SIMPLE: for '
      + 'the open unit disk A={(x,y):x²+y²<1} in R²: p=(0.5,0) is interior (a small ball around p '
      + 'fits inside A); q=(1,0) is boundary (every ball around q contains BOTH points inside and '
      + 'outside A); r=(2,0) is exterior (a ball around r misses A entirely). Here the boundary of '
      + 'A is the unit circle — a familiar thin curve. But for Q, the boundary of Q is all of R — '
      + 'the boundary can be the ENTIRE space, never guaranteed to be a simple separating curve.',
    targetedMisconceptions: [`${INTERIOR_CLOSURE}:MC-1`, `${INTERIOR_CLOSURE}:MC-2`, `${INTERIOR_CLOSURE}:MC-3`],
    source: eb(INTERIOR_CLOSURE, 'Core Understanding — interior being existential and closure being universal never the same quantifier for both, dense meaning every open set meets A never that A equals the whole space, and the boundary never assumed to always be a nice thin separating curve'),
  },
]

export const MATHEMATICS_TOP_BASIS_CONNECTEDNESS_INTERIOR_CLOSURE_PROBES: SeedProbe[] = [
  // BASIS
  {
    conceptId: BASIS, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'If B1 and B2 are both basis elements, must B1∩B2 itself be a basis element?',
    choices: [
      { text: "No — condition B2 only asks that SOME basis element B3 fits inside B1∩B2 at a given point x, never that B1∩B2 itself belongs to the basis; for open balls, B(x,r1)∩B(x,r2)=B(x,min(r1,r2)) happens to be a ball, but that's a coincidence, never a general requirement", isCorrect: true },
      { text: "Yes, B1∩B2 must itself be a basis element whenever B1 and B2 are basis elements", isCorrect: false, misconceptionId: `${BASIS}:MC-1` },
      { text: "Since the open-ball intersection of two balls happens to be a ball again, that pattern should be treated as a general requirement that a basis be closed under intersection", isCorrect: false, misconceptionId: `${BASIS}:MC-1` },
    ],
    targetedMisconceptions: [`${BASIS}:MC-1`],
    source: eb(BASIS, 'Discovery Question 1 as a detection probe (verbatim) — whether B1∩B2 must itself be a basis element, an answer of "yes" confirming BASIS-IS-CLOSED-UNDER-INTERSECTION'),
  },
  {
    conceptId: BASIS, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Can two genuinely different collections of sets generate the exact same topology?',
    choices: [
      { text: "Yes — comparing B1={(a,b):a,b∈R} with B2={(a,b):a,b∈Q} on R: applying the comparison criterion in both directions shows they generate the exact same topology, even though one collection is uncountable and the other is countable", isCorrect: true },
      { text: "No, two genuinely different collections of sets cannot generate the exact same topology", isCorrect: false, misconceptionId: `${BASIS}:MC-2` },
      { text: "Since a basis functions like an ingredient list defining the topology, two different ingredient lists should always be expected to produce different topologies", isCorrect: false, misconceptionId: `${BASIS}:MC-2` },
    ],
    targetedMisconceptions: [`${BASIS}:MC-2`],
    source: eb(BASIS, 'Discovery Question 2 as a detection probe (verbatim) — whether two different collections can generate the same topology, an answer of "no" confirming DIFFERENT-BASES-MEANS-DIFFERENT-TOPOLOGIES'),
  },
  {
    conceptId: BASIS, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Do [a,b) and (a,b) generate the same topology on R, since both are "intervals"?',
    choices: [
      { text: "No — comparing the two bases shows the standard topology is contained in the lower-limit topology, but the reverse fails at [0,1) with x=0: every standard interval containing 0 extends left past 0, so none fits inside [0,1) at that point; the lower-limit topology is strictly finer", isCorrect: true },
      { text: "Yes, [a,b) and (a,b) generate the same topology on R since both are interval-shaped sets", isCorrect: false, misconceptionId: `${BASIS}:MC-3` },
      { text: "Since half-open and open intervals both look like intervals on the number line, their generated topologies should be treated as identical without checking the comparison criterion", isCorrect: false, misconceptionId: `${BASIS}:MC-3` },
    ],
    targetedMisconceptions: [`${BASIS}:MC-3`],
    source: eb(BASIS, 'Discovery Question 3 as a detection probe (verbatim) — whether [a,b) and (a,b) generate the same topology, an answer of "yes" confirming LOWER-LIMIT-SAME-AS-STANDARD'),
  },
  // CONNECTEDNESS
  {
    conceptId: CONNECTEDNESS, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Can connectedness only be checked using distance, or is there a purely open-set-based test?',
    choices: [
      { text: "There is a purely open-set-based test — for the finite space X={a,b,c} with a topology containing ∅,{a},{a,b},X: checking every way to split X into two disjoint nonempty subsets shows no split has both pieces open, so X is connected, using zero distance reasoning", isCorrect: true },
      { text: "Connectedness can only be checked or defined using distance or a visual 'one piece' intuition", isCorrect: false, misconceptionId: `${CONNECTEDNESS}:MC-1` },
      { text: "Since connectedness was first learned through metric-space separated-sets language, it should be treated as fundamentally requiring a metric to check", isCorrect: false, misconceptionId: `${CONNECTEDNESS}:MC-1` },
    ],
    targetedMisconceptions: [`${CONNECTEDNESS}:MC-1`],
    source: eb(CONNECTEDNESS, 'Discovery Question 1 as a detection probe (verbatim) — whether connectedness can only be checked using distance, an answer treating it as metric-dependent confirming CONNECTEDNESS-ASSUMED-TO-NEED-METRIC'),
  },
  {
    conceptId: CONNECTEDNESS, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Are the open-set definition of connectedness and the separated-sets definition really the same fact, or two different notions that just happen to agree sometimes?',
    choices: [
      { text: "They are provably the same fact — for E=[0,1]∪[2,3]⊂R, the separated-sets route (disjoint closures) and the open-set route ([0,1] and [2,3] both open in E's subspace topology) reach the identical verdict 'disconnected', confirming they are genuinely equivalent characterizations", isCorrect: true },
      { text: "They are two different notions that happen to sometimes agree, not provably equivalent characterizations", isCorrect: false, misconceptionId: `${CONNECTEDNESS}:MC-2` },
      { text: "Since the open-set definition and the separated-sets definition look syntactically unrelated, they should be treated as unrelated notions rather than checked for equivalence directly", isCorrect: false, misconceptionId: `${CONNECTEDNESS}:MC-2` },
    ],
    targetedMisconceptions: [`${CONNECTEDNESS}:MC-2`],
    source: eb(CONNECTEDNESS, 'Discovery Question 2 as a detection probe (verbatim) — whether the open-set and separated-sets definitions are the same fact or different notions, an answer treating them as unrelated confirming OPEN-SET-AND-SEPARATED-SETS-DEFINITIONS-ASSUMED-DIFFERENT'),
  },
  {
    conceptId: CONNECTEDNESS, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Does connected mean the same thing as path-connected?',
    choices: [
      { text: "No — the topologist's sine curve is connected (it is the closure of a connected curve piece) but not path-connected, since no continuous path can reach the oscillating curve from the vertical segment at x=0; path-connected is strictly stronger and always implies connected, but never the reverse", isCorrect: true },
      { text: "Yes, connected and path-connected are the same property", isCorrect: false, misconceptionId: `${CONNECTEDNESS}:MC-3` },
      { text: "Since most familiar examples like intervals and disks are both connected and path-connected, the two properties should be treated as equivalent in general", isCorrect: false, misconceptionId: `${CONNECTEDNESS}:MC-3` },
    ],
    targetedMisconceptions: [`${CONNECTEDNESS}:MC-3`],
    source: eb(CONNECTEDNESS, 'Discovery Question 3 as a detection probe (verbatim) — whether connected means the same as path-connected, an answer of "yes" confirming CONNECTED-ASSUMED-EQUIVALENT-TO-PATH-CONNECTED'),
  },
  // INTERIOR_CLOSURE
  {
    conceptId: INTERIOR_CLOSURE, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Does interior require EVERY nearby neighborhood to fit inside the set, or just SOME neighborhood?',
    choices: [
      { text: "Just SOME neighborhood — for A=(0,1], checking x=0: no open interval around 0 avoids negative numbers, so 0 is not in the interior; interior asks whether SOME open set containing x lies entirely in A, an existential condition, distinct from closure's universal 'every neighborhood meets A' condition", isCorrect: true },
      { text: "Interior requires EVERY nearby neighborhood to fit inside the set", isCorrect: false, misconceptionId: `${INTERIOR_CLOSURE}:MC-1` },
      { text: "Since interior and closure are both stated as 'neighborhood' conditions, they should use the same quantifier and be checked the same way", isCorrect: false, misconceptionId: `${INTERIOR_CLOSURE}:MC-1` },
    ],
    targetedMisconceptions: [`${INTERIOR_CLOSURE}:MC-1`],
    source: eb(INTERIOR_CLOSURE, 'Discovery Question 1 as a detection probe (verbatim) — whether interior requires every neighborhood to fit inside, an answer of "every" confirming INTERIOR-REQUIRES-EVERY-NEIGHBORHOOD'),
  },
  {
    conceptId: INTERIOR_CLOSURE, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'If a set\'s closure equals the whole space, does the set itself have to equal the whole space too?',
    choices: [
      { text: "No — Q is dense in R (cl(Q)=R, since every open interval contains a rational), but Q≠R; Q is a strict, countable subset, and moreover int(Q)=∅, so Q's interior, closure, and the set itself are three dramatically different objects", isCorrect: true },
      { text: "Yes, if a set's closure equals the whole space, the set itself must equal the whole space too", isCorrect: false, misconceptionId: `${INTERIOR_CLOSURE}:MC-2` },
      { text: "Since 'dense' colloquially suggests a set 'fills up' the space, a dense set's closure equaling the whole space should be read as the set itself equaling the whole space", isCorrect: false, misconceptionId: `${INTERIOR_CLOSURE}:MC-2` },
    ],
    targetedMisconceptions: [`${INTERIOR_CLOSURE}:MC-2`],
    source: eb(INTERIOR_CLOSURE, 'Discovery Question 2 as a detection probe (verbatim) — whether a dense closure implies the set equals the whole space, an answer of "yes" confirming DENSE-MEANS-EQUAL-TO-WHOLE-SPACE'),
  },
  {
    conceptId: INTERIOR_CLOSURE, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Is a set\'s boundary always a thin, simple curve separating inside from outside?',
    choices: [
      { text: "No — for the open unit disk in R2, the boundary is the unit circle, a familiar thin curve, but for Q, the boundary of Q is all of R — the boundary can be the ENTIRE space, never guaranteed to be a simple separating curve", isCorrect: true },
      { text: "Yes, a set's boundary is always a thin, simple curve cleanly separating inside from outside", isCorrect: false, misconceptionId: `${INTERIOR_CLOSURE}:MC-3` },
      { text: "Since familiar geometric examples like disks have a thin circular boundary, boundaries in general should be expected to always be thin, simple curves", isCorrect: false, misconceptionId: `${INTERIOR_CLOSURE}:MC-3` },
    ],
    targetedMisconceptions: [`${INTERIOR_CLOSURE}:MC-3`],
    source: eb(INTERIOR_CLOSURE, 'Discovery Question 3 as a detection probe (verbatim) — whether a boundary is always a thin simple curve, an answer of "yes" confirming BOUNDARY-SEPARATES-INSIDE-FROM-OUTSIDE'),
  },
]
