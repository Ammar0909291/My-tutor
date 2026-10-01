# math.top.covering-space

## Identity
- **KG id**: `math.top.covering-space`
- **Domain**: math.top
- **Requires**: `math.top.fundamental-group`
- **Unlocks**: none
- **Cross-links**: `math.cx.riemann-surface`
- **Difficulty**: research
- **Bloom level**: apply
- **Mastery threshold**: 0.65
- **Estimated hours**: 7

## Learning Objective
Define a covering map $p:\tilde X\to X$ (every point has a neighborhood $U$ whose preimage is a
DISJOINT UNION of homeomorphic copies — "evenly covered," never merely a connected or surjective
preimage); define the universal cover as the SPECIAL, distinguished covering space with trivial
$\pi_1$ (never assumed automatic for every covering space); and recognize the Galois
correspondence (subgroups of $\pi_1(X)\leftrightarrow$ covering spaces) as a PRECISE bijection,
never a loose naming analogy.

## Core Understanding
"EVENLY COVERED" MEANS DISJOINT HOMEOMORPHIC COPIES — NEVER MERELY CONNECTED OR SURJECTIVE: for a
covering map $p:\tilde X\to X$, a small disk $U$ around a base point (excluding any branch point)
must have $p^{-1}(U)$ split into INFINITELY MANY DISJOINT small disks — one per "sheet" — each
mapped HOMEOMORPHICALLY onto $U$ by $p$. This is the SPECIFIC structure the definition demands —
never just "the preimage happens to be connected" or "$p$ happens to be surjective onto $U$." A
point where no such evenly-covered neighborhood exists (like a branch point where all sheets
tangle together) must be EXCLUDED from the base entirely.

THE UNIVERSAL COVER IS A SPECIAL, DISTINGUISHED COVERING SPACE — NEVER THE GENERAL RULE: the
universal cover is specifically the covering space with TRIVIAL $\pi_1$ (no nontrivial loops
survive at all). This is a SPECIAL property, not automatic — a covering space can be perfectly
valid without being simply connected itself: a covering space with FINITELY many sheets can have
a loop in the base that winds around exactly enough times to close up into a genuine nontrivial
CLOSED loop upstairs (returning to its exact starting sheet), giving that covering space its own
nontrivial $\pi_1$. Conflating "covering space" with "universal cover" misses that the latter is
one very special member of a much larger family.

THE GALOIS CORRESPONDENCE IS A PRECISE BIJECTION — NEVER A LOOSE ANALOGY: subgroups of $\pi_1(X)$
correspond BIJECTIVELY to covering spaces of $X$ — this is a RIGOROUS, CHECKABLE theorem, never
decorative wordplay borrowed from field-theory Galois correspondence. The TRIVIAL subgroup
corresponds to the universal cover (no loops survive); progressively LARGER subgroups correspond
to covering spaces with progressively FEWER sheets (more loops close up). Which SPECIFIC subgroup
you pick determines EXACTLY which SPECIFIC covering space you get, in a completely precise,
verifiable way — never a fuzzy or approximate matching.

## Mental Models
- **"Evenly covered means the preimage genuinely splits into separate, homeomorphic copies — not
  just 'connected' or 'onto,' but disjoint sheets stacked over the base."**
- **"The universal cover is the ONE covering space where every loop finally gives up and shrinks
  to nothing — other covering spaces are allowed to keep some loops alive."**
- **"Which subgroup you name determines exactly which covering space you get — a precise
  bijection, checkable case by case, never a loose family resemblance."**

## Why Students Fail

### MC-1: EVENLY-COVERED-UNDERSPECIFIED
- **Surface form**: believes "evenly covered" merely requires a connected preimage or
  surjectivity, missing the specific disjoint-union-of-homeomorphic-copies structure it requires.
- **Birth type**: Foundational severity (Blueprint's own declared severity — "covering" suggests
  a looser, more informal notion of surjective mapping without the precise disjointness
  structure).
- **Repair**: re-walk the precise unpacking of the covering condition on a concrete example,
  identifying exactly why a branch point must be excluded from the base.

### MC-2: ALL-COVERING-SPACES-ASSUMED-SIMPLY-CONNECTED
- **Surface form**: believes every covering space is automatically simply connected, conflating
  covering spaces in general with the specific, distinguished universal cover.
- **Birth type**: High severity (Blueprint's own declared severity — the universal cover, as the
  "most important" covering space, is easy to over-generalize as THE covering space).
- **Repair**: re-walk a finite-sheeted covering space with a genuine nontrivial closed loop,
  contrasted with the universal cover's triviality.

### MC-3: GALOIS-CORRESPONDENCE-ASSUMED-LOOSE-ANALOGY
- **Surface form**: believes the Galois correspondence between subgroups of $\pi_1(X)$ and
  covering spaces is a loose naming analogy, missing that it is a precise, checkable bijection.
- **Birth type**: Moderate severity (Blueprint's own declared severity — the shared name "Galois"
  with the unrelated field-theory correspondence invites dismissing it as merely evocative
  terminology).
- **Repair**: re-walk a specific subgroup-to-covering-space pairing, verifying the correspondence
  directly.

## Misconceptions

### MC-1: EVENLY-COVERED-UNDERSPECIFIED
- **Surface form**: as described above.
- **Root cause (Foundational)**: as described above.
- **Repair**: as described above.

### MC-2: ALL-COVERING-SPACES-ASSUMED-SIMPLY-CONNECTED
- **Surface form**: as described above.
- **Root cause (High)**: as described above.
- **Repair**: as described above.

### MC-3: GALOIS-CORRESPONDENCE-ASSUMED-LOOSE-ANALOGY
- **Surface form**: as described above.
- **Root cause (Moderate)**: as described above.
- **Repair**: as described above.

## Analogies
- **"A covering space is a parking garage stacked over a single ground-floor spot — each level is
  a separate, disjoint homeomorphic copy of that spot, never a single tangled floor."**
- **Anti-analogy**: not every covering space is the universal cover — most coverings still let
  some loops survive as genuinely nontrivial, only the universal cover strips every loop down to
  nothing.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: the precise disjoint-homeomorphic-copies verification of
  "evenly covered" at a base point, and the exclusion of a branch point where sheets tangle.
- **Demonstration 2 (targets MC-2)**: a finite-sheeted covering space's genuine nontrivial closed
  loop, contrasted with the universal cover's triviality.
- **Demonstration 3 (targets MC-3)**: a specific subgroup-to-covering-space pairing verified
  directly under the Galois correspondence.

## Discovery Questions
1. "Does 'evenly covered' just mean the preimage $p^{-1}(U)$ is connected, or that $p$ is
   surjective onto $U$?"
2. "Is every covering space automatically simply connected, the way the universal cover is?"
3. "Is the Galois correspondence between subgroups of $\pi_1(X)$ and covering spaces just a
   loose naming analogy, or a precise mathematical bijection?"

## Teaching Sequence
1. **Representation shift**: the precise "evenly covered" unpacking, working Demonstration 1,
   isolating MC-1.
2. **Conflict evidence**: the finite-sheeted-covering-versus-universal-cover contrast, working
   Demonstration 2, isolating MC-2.
3. **Contrast pair**: the specific subgroup-to-covering-space Galois pairing, working
   Demonstration 3, isolating MC-3.
4. **Mastery gate**: require a correct statement of the evenly-covered condition with a correct
   identification of an excluded branch point, a correct determination of whether a specific
   finite-sheeted covering is simply connected, and a correct subgroup-to-covering-space
   correspondence, at the Blueprint's own stated MAMR of 4/5.

## Tutor Actions
- Never accept "evenly covered" described as merely a connected or surjective preimage.
- Never accept a claim that every covering space is automatically simply connected.
- Never accept the Galois correspondence dismissed as a loose naming analogy rather than a
  precise bijection.

## Voice Teaching Notes
- Say "are these genuinely disjoint, homeomorphic copies, or just one connected preimage?"
  whenever "evenly covered" is being verified.
- Ask "is this covering space THE universal cover, or just A covering space?" whenever
  simple-connectivity of a covering space is assumed.

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly states the precise evenly-covered condition and
  identifies why a branch point must be excluded from the base.
- **Rung 2 (application)**: learner correctly determines whether a specific finite-sheeted
  covering space is simply connected.
- **Rung 3 (transfer)**: learner correctly applies the Galois correspondence to pair a specific
  subgroup with a specific covering space.

## Tutor Recovery Strategy
- If MC-1 recurs, re-walk the precise disjoint-homeomorphic-copies unpacking.
- If MC-2 recurs, re-walk the finite-sheeted-covering-versus-universal-cover contrast.
- If MC-3 recurs, re-walk a specific subgroup-to-covering-space pairing.

## Memory Hooks
- "Evenly covered means genuinely disjoint, homeomorphic copies — never just 'connected' or
  'onto.'"
- "The universal cover is special — most covering spaces still let some loops survive."
- "The Galois correspondence is a precise, checkable bijection — never a loose analogy."

## Transfer Connections
- `math.top.fundamental-group` (already authored, this campaign, Batch 188): supplies
  $\pi_1(X,x_0)$ and the group structure of loops under based homotopy, the algebraic object this
  concept's Galois correspondence connects covering spaces to.

## Cross-Subject Connections
- Complex analysis: Riemann surfaces (the multi-sheeted surfaces for multivalued functions like
  $\log z$ and $\sqrt z$) are the classical motivating examples of covering spaces.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.top.covering-space.md`, reused by reference
  for its evenly-covered-condition framing, its universal-cover-versus-general-covering-space
  contrast, its Galois-correspondence statement, and its three-misconception registry (severity
  levels adopted directly as declared).
- Transfer probe: adapted to INDEPENDENCE mode (see Curriculum Feedback) rather than the
  Blueprint's stated cross-link probe, since `math.cx.riemann-surface` is not yet authored in
  this Educational Brain corpus.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Wrong-corpus cross-link discrepancy found**: the Blueprint's Component 7 states its
  cross-link `math.cx.riemann-surface` was "verified via `ls`" and is "authored," but the
  Blueprint's own citation (`docs/curriculum/blueprints/`) checked the BLUEPRINTS directory, not
  the Educational Brain corpus (`educational-brain/concepts/mathematics/`). Independently
  re-verified here: `math.cx.riemann-surface` has NOT yet been authored in this EB corpus (only
  its Blueprint exists). This EB file therefore treats the transfer probe as INDEPENDENCE mode
  rather than the Blueprint's stated cross-link probe, per this campaign's established discipline
  — the ninth such wrong-corpus discrepancy this campaign (after the pre-segment occurrences and
  Batches 157, 160, 161, 162×2, 168, 179). All other fields (requires
  `math.top.fundamental-group`, unlocks none, difficulty/bloom research/apply, mastery_threshold
  0.65, estimated_hours 7) verified exact matches against the live KG.

## Version History
- 2026-09-19 (Batch 189): authored. First entry this batch. Companion batch concept:
  `math.top.smooth-manifold`.
