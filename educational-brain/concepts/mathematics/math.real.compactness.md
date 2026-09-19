# math.real.compactness

## Identity
- **KG id**: `math.real.compactness`
- **Domain**: math.real
- **Requires**: `math.real.open-sets`
- **Unlocks**: `math.real.extreme-value-theorem`
- **Cross-links**: `math.top.compactness` (NOT yet authored — confirmed via `ls`; independence
  mode used, matching the Blueprint's own correct self-report)
- **Difficulty**: expert
- **Bloom level**: understand
- **Mastery threshold**: 0.85
- **Estimated hours**: 6

## Learning Objective
Define an OPEN COVER of $K$ and define $K$ as COMPACT iff EVERY open cover has a FINITE subcover
— a universal claim over ALL covers, never a claim about one convenient cover; state the
HEINE-BOREL theorem (in $\mathbb R^n$): compact iff CLOSED AND BOUNDED, both required together;
and state SEQUENTIAL COMPACTNESS (every sequence has a subsequence converging to a point actually
WITHIN $K$), distinguishing this from mere convergence to any real number.

## Core Understanding
COMPACTNESS DEMANDS EVERY COVER SUCCEED — ONE FAILING COVER IS A COMPLETE DISPROOF: for
$K=(0,1)$, the cover $\mathcal U=\{(1/n,1):n=2,3,4,\ldots\}$ genuinely covers $(0,1)$ (every
$x\in(0,1)$ lies in $(1/n,1)$ once $n>1/x$), yet ANY finite subcollection, using values of $n$ up
to some $N$, has union $(1/N,1)$ — missing points like $1/(N+1)$. No finite subcover exists for
THIS cover, and that alone proves $(0,1)$ is NOT compact, regardless of how other covers of
$(0,1)$ (like the trivial single-set cover $\{(0,1)\}$) happen to behave.

HEINE-BOREL NEEDS BOTH CONDITIONS TOGETHER, NEITHER SUFFICES ALONE: $(0,1)$ is bounded (inside
$B(0.5,1)$) but NOT closed (missing limit points $0,1$) — this failure of closedness alone already
rules out compactness by Heine-Borel, matching the direct cover argument above. Contrast $[0,1]$:
closed (complement is open) AND bounded — compact by Heine-Borel.

THE SEQUENCE'S LIMIT MUST LAND BACK INSIDE $K$, NOT JUST SOMEWHERE IN $\mathbb R$: the sequence
$a_n=1/n$ lies entirely in $(0,1)$ and converges (as an ordinary real sequence) to $0$ — but
$0\notin(0,1)$, so this convergence provides NO evidence of $(0,1)$'s sequential compactness. The
IDENTICAL sequence $a_n=1/n$, viewed inside $K'=[0,1]$, converges to $0\in[0,1]$ — here it DOES
count as genuine sequential-compactness evidence. The same numerical behavior means something
different depending on whether the limit actually belongs to the set being tested.

## Mental Models
- **"Compactness is a promise that holds for every possible cover, no exceptions — finding even
  one cover that resists a finite subcover is a full disproof."**
- **"A sequence can converge perfectly well as real numbers while still failing to prove anything
  about the set it lives in — unless the limit lands back inside that set."**

## Why Students Fail

### MC-1: SOME-COVER-REDUCIBLE-ASSUMED-SUFFICIENT-FOR-COMPACTNESS
- **Surface form**: believes finding some open cover that reduces to a finite subcover proves
  compactness, missing that EVERY cover must have this property.
- **Birth type**: Foundational severity (Blueprint's own declared severity — the universal
  quantifier over "all covers" is easy to silently drop to "some cover").
- **Repair**: re-walk the $(0,1)$ cover with no finite subcover, re-anchoring on compactness as a
  claim about ALL covers.

### MC-2: BOUNDED-ALONE-ASSUMED-SUFFICIENT-FOR-COMPACTNESS
- **Surface form**: believes boundedness alone guarantees compactness in $\mathbb R^n$.
- **Birth type**: Foundational severity (Blueprint's own declared severity — boundedness is the
  more visually obvious condition, so closedness is easy to overlook as a separate requirement).
- **Repair**: re-walk the $(0,1)$-versus-$[0,1]$ contrast, re-anchoring on both conditions being
  independently required.

### MC-3: SEQUENCE-CONVERGENCE-TO-ANY-LIMIT-ASSUMED-SUFFICIENT-FOR-SEQUENTIAL-COMPACTNESS
- **Surface form**: believes a sequence in $K$ having a convergent subsequence (to any real
  number) proves $K$ sequentially compact.
- **Birth type**: Foundational severity (Blueprint's own declared severity — ordinary convergence
  and sequential compactness's stricter membership requirement look identical unless checked
  carefully).
- **Repair**: re-walk the $1/n\to0$ case, showing failure for $(0,1)$ but success for $[0,1]$,
  re-anchoring on the limit needing to land back inside $K$.

## Misconceptions

### MC-1: SOME-COVER-REDUCIBLE-ASSUMED-SUFFICIENT-FOR-COMPACTNESS
- **Surface form**: as described above.
- **Root cause**: as described above.
- **Repair**: as described above.

### MC-2: BOUNDED-ALONE-ASSUMED-SUFFICIENT-FOR-COMPACTNESS
- **Surface form**: as described above.
- **Root cause**: as described above.
- **Repair**: as described above.

### MC-3: SEQUENCE-CONVERGENCE-TO-ANY-LIMIT-ASSUMED-SUFFICIENT-FOR-SEQUENTIAL-COMPACTNESS
- **Surface form**: as described above.
- **Root cause**: as described above.
- **Repair**: as described above.

## Analogies
- **"Compactness is like a fire-safety code that must hold under every possible layout of
  furniture, not just the one arrangement the inspector happened to check."**
- **Anti-analogy**: boundedness is NOT a stand-in for compactness — an open interval like $(0,1)$
  is perfectly bounded yet still fails, because it is missing its own edges.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: the cover $\{(1/n,1)\}$ of $(0,1)$ has no finite subcover —
  a single conclusive disproof.
- **Demonstration 2 (targets MC-2)**: $(0,1)$ bounded-but-not-closed fails; $[0,1]$
  closed-and-bounded succeeds.
- **Demonstration 3 (targets MC-3)**: $1/n\to0$ fails as sequential-compactness evidence for
  $(0,1)$ but succeeds for $[0,1]$.

## Discovery Questions
1. "If I find one open cover of a set that reduces to a finite subcover, does that prove the set
   is compact?"
2. "Is a bounded subset of ℝⁿ automatically compact?"
3. "Does a sequence in K having a convergent subsequence, converging to any real number, prove K
   is sequentially compact?"

## Teaching Sequence
1. **Representation shift**: the open-cover/finite-subcover definition, working Demonstration 1's
   full argument for $(0,1)$, isolating MC-1.
2. **Contrast pair**: Demonstration 2's $(0,1)$-versus-$[0,1]$ Heine-Borel contrast, isolating
   MC-2.
3. **Conflict evidence**: Demonstration 3's identical-sequence-different-outcome case, isolating
   MC-3.
4. **Mastery gate**: require a correct no-finite-subcover argument for a new set, a correct
   Heine-Borel classification identifying which condition fails if any, and a correct
   sequential-compactness counterexample, at the Blueprint's own stated MAMR of 5/5 (⌈0.85×5⌉).

## Tutor Actions
- Never accept "some cover reduces to a finite subcover" as sufficient evidence for compactness.
- Never accept boundedness alone as sufficient for compactness in $\mathbb R^n$.
- Never accept a convergent subsequence with a limit outside $K$ as evidence for $K$'s sequential
  compactness.

## Voice Teaching Notes
- Say "does that need to hold for EVERY cover, or just the one you picked?" whenever a compactness
  argument is being built.
- When Heine-Borel is applied, ask "did you check both closed and bounded, or just one?"

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly identifies a cover with no finite subcover for a
  given non-compact set.
- **Rung 2 (application)**: learner correctly applies Heine-Borel to classify a new set as
  compact or not, naming which condition fails if any.
- **Rung 3 (transfer)**: learner correctly explains, for an optimization search over a parameter
  set, why an open constraint set (e.g. $\|x\|<10$) risks the search never reaching a genuine
  optimum, and why closing the constraint (e.g. $\|x\|\le10$) resolves this via compactness.

## Tutor Recovery Strategy
- If MC-1 recurs, re-walk the $(0,1)$ no-finite-subcover cover.
- If MC-2 recurs, re-walk the $(0,1)$-versus-$[0,1]$ contrast.
- If MC-3 recurs, re-walk the $1/n\to0$ case for both sets.

## Memory Hooks
- "Compactness must survive every cover — one failing cover is a complete disproof."
- "Bounded alone is not enough — Heine-Borel needs closed too."
- "The limit must land back inside K itself, not just exist somewhere in the real numbers."

## Transfer Connections
- `math.real.open-sets` (already authored, this campaign, Batch 125): supplies the open-ball
  interior-point definition and the closed-set/complement equivalence this concept's Heine-Borel
  characterization directly reuses.
- `math.real.convergence-sequences` (already authored, certified domain): supplies the notion of
  ordinary sequence convergence that sequential compactness restricts by requiring the limit to
  land inside $K$.
- `math.real.extreme-value-theorem` (not yet authored): the KG's declared unlock, requiring
  compactness as the exact hypothesis guaranteeing a continuous function attains its maximum and
  minimum.
- `math.top.compactness` (not yet authored): the KG's declared cross-link target, generalizing
  the open-cover definition to arbitrary topological spaces without reference to a metric.

## Cross-Subject Connections
- None formal.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.real.compactness.md`, reused by reference
  for its open-cover/finite-subcover worked example, its Heine-Borel contrast, its sequential-
  compactness conflict-evidence demonstration, and its three-misconception registry (severity
  levels adopted directly as declared).
- Transfer probe: the Blueprint's own independence-mode probe, applying Heine-Borel to an
  optimization search's parameter set and reasoning about open-versus-closed constraint sets.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires `math.real.open-sets`,
  unlocks `math.real.extreme-value-theorem`, cross_links `math.top.compactness`, expert/
  understand, mastery_threshold 0.85, estimated_hours 6) was directly verified against the live KG
  and matches exactly. The Blueprint's own correctly-declared independence-mode P76 (cross-link
  target confirmed NOT authored via `ls`) required no correction.

## Version History
- 2026-09-19 (Batch 126): authored. Second entry this batch. Companion batch concept:
  `math.prob.standard-deviation`.
