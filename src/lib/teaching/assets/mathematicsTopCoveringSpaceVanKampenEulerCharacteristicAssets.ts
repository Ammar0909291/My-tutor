/**
 * Batch: covering-space, van-kampen, euler-characteristic (math.top) —
 * 13/23 -> 16/23.
 *
 * Fresh Phase 0 frontier recompute after basis, connectedness, and
 * interior-closure were authored: the remaining 10 math.top concepts
 * (all domain leaves, unlocks=[]) stayed simultaneously ready. This batch
 * closes out fundamental-group's remaining unlocks (covering-space,
 * van-kampen) plus homology's euler-characteristic, leaving 7 concepts
 * (cohomology, homotopy-equivalence, product-space, quotient-space,
 * separation-axioms, smooth-manifold, tychonoff) for subsequent batches.
 * Transcribed from their frozen Educational Brain entries at educational-
 * brain/concepts/mathematics/math.top.{covering-space,van-kampen,
 * euler-characteristic}.md.
 *
 * Grade band: GradeBand.UNDERGRADUATE, matching this domain's established
 * baseline.
 *
 * covering-space's declared KG cross-link (math.cx.riemann-surface) is
 * NOT authored in this EB corpus (per the EB entry's own Curriculum
 * Feedback finding) — its probe is independence-mode, no cross-link
 * probe written. euler-characteristic's cross-link (math.disc.planar-
 * graph) IS authored — a genuine transfer target. van-kampen declares no
 * cross-link.
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

const COVERING_SPACE = 'math.top.covering-space'
const VAN_KAMPEN = 'math.top.van-kampen'
const EULER_CHARACTERISTIC = 'math.top.euler-characteristic'

export const MATHEMATICS_TOP_COVERING_SPACE_VAN_KAMPEN_EULER_CHARACTERISTIC_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: COVERING_SPACE, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      '"EVENLY COVERED" MEANS DISJOINT HOMEOMORPHIC COPIES — NEVER MERELY CONNECTED OR SURJECTIVE: '
      + 'for a covering map p:X̃→X, a small disk U around a base point (excluding any branch point) '
      + 'must have p⁻¹(U) split into INFINITELY MANY DISJOINT small disks — one per "sheet" — each '
      + 'mapped HOMEOMORPHICALLY onto U by p. This is the SPECIFIC structure the definition demands '
      + '— never just "the preimage happens to be connected" or "p happens to be surjective onto '
      + 'U." A point where no such evenly-covered neighborhood exists (like a branch point where '
      + 'all sheets tangle together) must be EXCLUDED from the base entirely.\n\n'
      + 'THE UNIVERSAL COVER IS A SPECIAL, DISTINGUISHED COVERING SPACE — NEVER THE GENERAL RULE: '
      + 'the universal cover is specifically the covering space with TRIVIAL π₁ (no nontrivial '
      + 'loops survive at all). This is a SPECIAL property, not automatic — a covering space can be '
      + 'perfectly valid without being simply connected itself: a covering space with FINITELY many '
      + 'sheets can have a loop in the base that winds around exactly enough times to close up into '
      + 'a genuine nontrivial CLOSED loop upstairs (returning to its exact starting sheet), giving '
      + 'that covering space its own nontrivial π₁. Conflating "covering space" with "universal '
      + 'cover" misses that the latter is one very special member of a much larger family.\n\n'
      + 'THE GALOIS CORRESPONDENCE IS A PRECISE BIJECTION — NEVER A LOOSE ANALOGY: subgroups of '
      + 'π₁(X) correspond BIJECTIVELY to covering spaces of X — this is a RIGOROUS, CHECKABLE '
      + 'theorem, never decorative wordplay borrowed from field-theory Galois correspondence. The '
      + 'TRIVIAL subgroup corresponds to the universal cover (no loops survive); progressively '
      + 'LARGER subgroups correspond to covering spaces with progressively FEWER sheets (more loops '
      + 'close up). Which SPECIFIC subgroup you pick determines EXACTLY which SPECIFIC covering '
      + 'space you get, in a completely precise, verifiable way — never a fuzzy or approximate '
      + 'matching.',
    targetedMisconceptions: [`${COVERING_SPACE}:MC-1`, `${COVERING_SPACE}:MC-2`, `${COVERING_SPACE}:MC-3`],
    source: eb(COVERING_SPACE, 'Core Understanding — "evenly covered" meaning disjoint homeomorphic copies never merely connected or surjective, the universal cover being a special distinguished covering space never the general rule, and the Galois correspondence being a precise bijection never a loose analogy'),
  },
  {
    conceptId: VAN_KAMPEN, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'THE THEOREM\'S HYPOTHESES MUST BE VERIFIED — NEVER ASSUMED AUTOMATIC FOR ANY DECOMPOSITION: '
      + 'for X=S¹∨S¹ (two circles joined at point p): naively setting U=one circle, V=the other '
      + 'gives U∩V={p} — path-connected, but U,V are NOT open in X as bare circles. Each must be '
      + 'slightly ENLARGED (a small open neighborhood of p reaching into the other circle) to '
      + 'satisfy OPENNESS — a genuine technical adjustment the hypotheses require, never skippable. '
      + 'Only AFTER this adjustment, with U∩V deformation-retracting to {p} (still simply '
      + 'connected) and both U,V genuinely open, do all three hypotheses hold and the theorem '
      + 'become applicable.\n\n'
      + 'WHEN U∩V IS SIMPLY CONNECTED, AMALGAMATION COLLAPSES TO AN ORDINARY FREE PRODUCT — NEVER '
      + 'IMPOSING EXTRA RELATIONS: continuing the wedge-of-circles example: π₁(U)≅π₁(S¹)=Z '
      + '(reusing the previously computed value), similarly π₁(V)≅Z. Since π₁(U∩V)={e}, there are '
      + 'NO nontrivial elements to map anywhere — NO relations get imposed beyond the free '
      + 'product\'s own structure. This gives π₁(S¹∨S¹)≅Z*Z, the free group on two generators, with '
      + 'genuinely NO identifications between the two circles\' loops.\n\n'
      + 'WHEN U∩V HAS NONTRIVIAL π₁, GENUINE AMALGAMATION OCCURS — NEVER LEAVING THE COMPUTATION '
      + 'UNCHANGED: for two tori glued along a common circle, with U∩V≃S¹ (so π₁(U∩V)≅Z, '
      + 'NONTRIVIAL): van Kampen\'s theorem gives π₁(X)≅π₁(U)*_Z π₁(V) — the generator of π₁(U∩V) '
      + 'is IDENTIFIED with SPECIFIC elements inside BOTH π₁(U) and π₁(V) (the images of the '
      + 'gluing circle\'s loop as seen from within each torus). This genuinely FUSES the two '
      + 'pieces\' group structures together at the shared overlap — a strictly richer, '
      + 'structurally different computation than the simply-connected-intersection case, never the '
      + 'same answer regardless of the intersection\'s fundamental group.',
    targetedMisconceptions: [`${VAN_KAMPEN}:MC-1`, `${VAN_KAMPEN}:MC-2`, `${VAN_KAMPEN}:MC-3`],
    source: eb(VAN_KAMPEN, 'Core Understanding — the theorem\'s hypotheses needing to be verified never assumed automatic for any decomposition, amalgamation collapsing to an ordinary free product when U∩V is simply connected never imposing extra relations, and genuine amalgamation occurring when U∩V has nontrivial π1 never leaving the computation unchanged'),
  },
  {
    conceptId: EULER_CHARACTERISTIC, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'EULER\'S χ=2 HOLDS ONLY FOR S²-TOPOLOGY — NEVER FOR EVERY POLYHEDRON: a cube has V=8, E=12, '
      + 'F=6, giving χ=8−12+6=2 — matching the homological check (H₀≅Z, H₁=0, H₂≅Z, so χ=1−0+1=2). '
      + 'But a TORUS triangulated with, say, 9 vertices, 27 edges, 18 faces gives χ=9−27+18=0, NOT '
      + '2 — because the torus is not homeomorphic to S². Euler\'s famous "χ=2" is specific to '
      + 'polyhedra homeomorphic to the SPHERE, never a universal fact about all polyhedra.\n\n'
      + 'χ ALONE NEVER CLASSIFIES A SURFACE — ORIENTABILITY IS A REQUIRED SECOND PIECE: the torus '
      + 'T² (CW structure: 1 vertex, 2 edges, 1 face, χ=1−2+1=0) and the Klein bottle K (SAME cell '
      + 'counts, different attaching map, χ=1−2+1=0 via cells, or χ=1−1+0=0 via Betti numbers) have '
      + 'the IDENTICAL χ=0 — yet T² is not homeomorphic to K. The distinguishing fact: T² is '
      + 'ORIENTABLE (H₂(T²;Z)≅Z, a genuine 2-cycle exists), while K is NOT (H₂(K;Z)=0, no global '
      + 'orientation class). χ collapses orientation information — classification genuinely '
      + 'requires χ PLUS an orientability flag, never χ alone.\n\n'
      + 'THE CLASSIFICATION OF COMPACT SURFACES READS OFF THE TYPE FROM χ AND ORIENTABILITY '
      + 'TOGETHER: every compact connected surface (without boundary) is homeomorphic to EXACTLY '
      + 'ONE of: S² (χ=2), Σ_g (orientable genus g≥1, χ=2−2g), or N_k (non-orientable, k≥1 copies '
      + 'of RP², χ=2−k). Given χ and an orientability flag, the specific surface is DETERMINED — '
      + 'for orientable surfaces, g=(2−χ)/2; for non-orientable, k=2−χ — but χ by itself, without '
      + 'knowing orientability, leaves the surface genuinely AMBIGUOUS whenever an orientable and '
      + 'non-orientable surface happen to share the same χ value.',
    targetedMisconceptions: [`${EULER_CHARACTERISTIC}:MC-1`, `${EULER_CHARACTERISTIC}:MC-2`, `${EULER_CHARACTERISTIC}:MC-3`],
    source: eb(EULER_CHARACTERISTIC, 'Core Understanding — Euler\'s χ=2 holding only for S2-topology never for every polyhedron, χ alone never classifying a surface since orientability is a required second piece, and the classification of compact surfaces reading off the type from χ and orientability together'),
  },
]

export const MATHEMATICS_TOP_COVERING_SPACE_VAN_KAMPEN_EULER_CHARACTERISTIC_PROBES: SeedProbe[] = [
  // COVERING_SPACE
  {
    conceptId: COVERING_SPACE, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Does "evenly covered" just mean the preimage p⁻¹(U) is connected, or that p is surjective onto U?',
    choices: [
      { text: "Neither — evenly covered means p-1(U) splits into a DISJOINT UNION of infinitely many small copies, each mapped HOMEOMORPHICALLY onto U by p (one per 'sheet'); a point where no such neighborhood exists, like a branch point, must be excluded from the base entirely", isCorrect: true },
      { text: "Evenly covered just means the preimage p-1(U) is connected", isCorrect: false, misconceptionId: `${COVERING_SPACE}:MC-1` },
      { text: "Since 'covering' sounds like an informal surjective mapping, 'evenly covered' should be read as simply requiring p to be onto U", isCorrect: false, misconceptionId: `${COVERING_SPACE}:MC-1` },
    ],
    targetedMisconceptions: [`${COVERING_SPACE}:MC-1`],
    source: eb(COVERING_SPACE, 'Discovery Question 1 as a detection probe (verbatim) — whether "evenly covered" just means connected preimage or surjectivity, an answer confirming EVENLY-COVERED-UNDERSPECIFIED'),
  },
  {
    conceptId: COVERING_SPACE, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Is every covering space automatically simply connected, the way the universal cover is?',
    choices: [
      { text: "No — the universal cover is a special, distinguished covering space with trivial π1; a covering space with finitely many sheets can have a loop in the base wind around exactly enough times to close up into a genuine nontrivial closed loop upstairs, giving that covering space its own nontrivial π1", isCorrect: true },
      { text: "Yes, every covering space is automatically simply connected, just like the universal cover", isCorrect: false, misconceptionId: `${COVERING_SPACE}:MC-2` },
      { text: "Since the universal cover is the most important covering space, it should be treated as representative of covering spaces in general, all of which should be simply connected", isCorrect: false, misconceptionId: `${COVERING_SPACE}:MC-2` },
    ],
    targetedMisconceptions: [`${COVERING_SPACE}:MC-2`],
    source: eb(COVERING_SPACE, 'Discovery Question 2 as a detection probe (verbatim) — whether every covering space is automatically simply connected, an answer of "yes" confirming ALL-COVERING-SPACES-ASSUMED-SIMPLY-CONNECTED'),
  },
  {
    conceptId: COVERING_SPACE, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Is the Galois correspondence between subgroups of π₁(X) and covering spaces just a loose naming analogy, or a precise mathematical bijection?',
    choices: [
      { text: "A precise mathematical bijection — subgroups of π1(X) correspond bijectively to covering spaces of X; the trivial subgroup corresponds to the universal cover, and progressively larger subgroups correspond to covering spaces with progressively fewer sheets, in a completely precise, checkable way", isCorrect: true },
      { text: "Just a loose naming analogy borrowed from field-theory Galois correspondence, with no precise checkable content", isCorrect: false, misconceptionId: `${COVERING_SPACE}:MC-3` },
      { text: "Since the term 'Galois correspondence' is shared with an unrelated field-theory concept, it should be treated as merely evocative terminology rather than a rigorous theorem", isCorrect: false, misconceptionId: `${COVERING_SPACE}:MC-3` },
    ],
    targetedMisconceptions: [`${COVERING_SPACE}:MC-3`],
    source: eb(COVERING_SPACE, 'Discovery Question 3 as a detection probe (verbatim) — whether the Galois correspondence is a loose analogy or a precise bijection, an answer treating it as loose confirming GALOIS-CORRESPONDENCE-ASSUMED-LOOSE-ANALOGY'),
  },
  // VAN_KAMPEN
  {
    conceptId: VAN_KAMPEN, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Can van Kampen\'s theorem be applied to any decomposition X=U∪V of a space into two pieces, or must specific hypotheses be verified first?',
    choices: [
      { text: "Specific hypotheses must be verified first — for X=S1∨S1, naively setting U and V as bare circles gives U∩V={p}, path-connected, but U,V are NOT open in X; each must be enlarged into a small open neighborhood to satisfy openness before all three hypotheses hold and the theorem applies", isCorrect: true },
      { text: "Van Kampen's theorem can be applied to any decomposition X=U∪V without checking any hypotheses first", isCorrect: false, misconceptionId: `${VAN_KAMPEN}:MC-1`},
      { text: "Since the theorem's conclusion is so general and powerful, it should be treated as an unconditional formula that applies regardless of how X is decomposed", isCorrect: false, misconceptionId: `${VAN_KAMPEN}:MC-1` },
    ],
    targetedMisconceptions: [`${VAN_KAMPEN}:MC-1`],
    source: eb(VAN_KAMPEN, 'Discovery Question 1 as a detection probe (verbatim) — whether the theorem applies to any decomposition or requires verified hypotheses, an answer treating it as unconditional confirming VAN-KAMPEN-HYPOTHESES-ASSUMED-AUTOMATIC'),
  },
  {
    conceptId: VAN_KAMPEN, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'When U∩V is simply connected, does the amalgamated free product formula still impose extra relations between π1(U) and π1(V), or does it collapse to their ordinary free product?',
    choices: [
      { text: "It collapses to the ordinary free product — for X=S1∨S1 with π1(U∩V)={e}, there are no nontrivial elements to map anywhere, so no relations get imposed beyond the free product's own structure, giving π1(S1∨S1)≅Z*Z with no identifications between the two circles' loops", isCorrect: true },
      { text: "The amalgamated free product formula still imposes extra relations between π1(U) and π1(V) even when U∩V is simply connected", isCorrect: false, misconceptionId: `${VAN_KAMPEN}:MC-2` },
      { text: "Since the amalgamated-product notation always looks like it should impose some relation, a trivial π1(U∩V) should still be expected to add some constraint to the formula", isCorrect: false, misconceptionId: `${VAN_KAMPEN}:MC-2` },
    ],
    targetedMisconceptions: [`${VAN_KAMPEN}:MC-2`],
    source: eb(VAN_KAMPEN, 'Discovery Question 2 as a detection probe (verbatim) — whether a simply-connected intersection still imposes extra relations, an answer of "yes" confirming SIMPLY-CONNECTED-INTERSECTION-ASSUMED-TO-STILL-IMPOSE-RELATIONS'),
  },
  {
    conceptId: VAN_KAMPEN, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Does a nontrivial π1(U∩V) change the resulting computation, or does the answer stay the same regardless of the intersection\'s fundamental group?',
    choices: [
      { text: "It genuinely changes the computation — for two tori glued along a common circle with π1(U∩V)≅Z, the generator of π1(U∩V) is identified with specific elements inside BOTH π1(U) and π1(V), genuinely fusing the two pieces' group structures together, a structurally different, richer computation than the free-product case", isCorrect: true },
      { text: "A nontrivial π1(U∩V) does not genuinely change the resulting computation from the simpler free-product case", isCorrect: false, misconceptionId: `${VAN_KAMPEN}:MC-3` },
      { text: "Without a direct contrasting example, it's reasonable to assume the amalgamation's structural effect is minor and the answer stays essentially the same as the free-product case", isCorrect: false, misconceptionId: `${VAN_KAMPEN}:MC-3` },
    ],
    targetedMisconceptions: [`${VAN_KAMPEN}:MC-3`],
    source: eb(VAN_KAMPEN, 'Discovery Question 3 as a detection probe (verbatim) — whether a nontrivial intersection changes the computation, an answer of "no" confirming NONTRIVIAL-INTERSECTION-ASSUMED-NOT-TO-CHANGE-COMPUTATION'),
  },
  // EULER_CHARACTERISTIC
  {
    conceptId: EULER_CHARACTERISTIC, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Does V−E+F=2 hold for any polyhedron?',
    choices: [
      { text: "No — a cube has V=8, E=12, F=6, giving χ=2, but a torus triangulated with 9 vertices, 27 edges, 18 faces gives χ=9−27+18=0, not 2, because the torus is not homeomorphic to the sphere; χ=2 is specific to polyhedra homeomorphic to S2, never a universal fact", isCorrect: true },
      { text: "Yes, V-E+F=2 holds for any polyhedron regardless of its topology", isCorrect: false, misconceptionId: `${EULER_CHARACTERISTIC}:MC-1` },
      { text: "Since the formula is usually first taught only via sphere-like examples such as the cube, it should be treated as universally true for every polyhedron", isCorrect: false, misconceptionId: `${EULER_CHARACTERISTIC}:MC-1` },
    ],
    targetedMisconceptions: [`${EULER_CHARACTERISTIC}:MC-1`],
    source: eb(EULER_CHARACTERISTIC, 'Discovery Question 1 as a detection probe (verbatim) — whether V-E+F=2 holds for any polyhedron, an answer of "yes" confirming EULER-FORMULA-HOLDS-FOR-ALL-POLYHEDRA'),
  },
  {
    conceptId: EULER_CHARACTERISTIC, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'If two closed surfaces have the same χ, are they homeomorphic?',
    choices: [
      { text: "No — the torus and the Klein bottle both have χ=0 (identical cell counts) yet are not homeomorphic; the torus is orientable (H2≅Z, a genuine 2-cycle exists) while the Klein bottle is not (H2=0), so classification genuinely requires χ plus an orientability flag, never χ alone", isCorrect: true },
      { text: "Yes, two closed surfaces with the same Euler characteristic must be homeomorphic", isCorrect: false, misconceptionId: `${EULER_CHARACTERISTIC}:MC-2` },
      { text: "Since χ is computed the same way for both surfaces and comes out equal, that alone should be treated as sufficient evidence that the two surfaces are the same", isCorrect: false, misconceptionId: `${EULER_CHARACTERISTIC}:MC-2` },
    ],
    targetedMisconceptions: [`${EULER_CHARACTERISTIC}:MC-2`],
    source: eb(EULER_CHARACTERISTIC, 'Discovery Question 2 as a detection probe (verbatim) — whether equal χ implies homeomorphic, an answer of "yes" confirming SAME-EULER-CHARACTERISTIC-MEANS-HOMEOMORPHIC'),
  },
  {
    conceptId: EULER_CHARACTERISTIC, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Does Euler\'s formula V−E+F=2 apply to any closed surface?',
    choices: [
      { text: "No — the general formula is χ=2−2g for an orientable genus-g surface, of which χ=2 is just the g=0 special case (the sphere); a genus-2 surface has χ=2−2(2)=−2, not 2", isCorrect: true },
      { text: "Yes, V-E+F=2 is the general formula that applies to any closed surface's triangulation", isCorrect: false, misconceptionId: `${EULER_CHARACTERISTIC}:MC-3` },
      { text: "Since the numerical value 2 shows up for the most familiar shapes like the sphere and the cube, it should be treated as the general result for all closed surfaces", isCorrect: false, misconceptionId: `${EULER_CHARACTERISTIC}:MC-3` },
    ],
    targetedMisconceptions: [`${EULER_CHARACTERISTIC}:MC-3`],
    source: eb(EULER_CHARACTERISTIC, 'Discovery Question 3 as a detection probe (verbatim) — whether Euler\'s formula V-E+F=2 applies to any closed surface, an answer of "yes" confirming EULER-FORMULA-V-MINUS-E-PLUS-F-UNIVERSALLY-2'),
  },
]
