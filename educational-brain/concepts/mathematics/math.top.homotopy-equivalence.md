# math.top.homotopy-equivalence

## Identity
- **KG id**: `math.top.homotopy-equivalence`
- **Domain**: math.top
- **Requires**: `math.top.homotopy`
- **Unlocks**: none
- **Cross-links**: none
- **Difficulty**: expert
- **Bloom level**: understand
- **Mastery threshold**: 0.8
- **Estimated hours**: 4

## Learning Objective
Define homotopy equivalence ($f:X\to Y$, $g:Y\to X$ with $g\circ f\simeq\mathrm{id}_X$,
$f\circ g\simeq\mathrm{id}_Y$) as STRICTLY WEAKER than homeomorphism (never equivalent to it);
use deformation retracts (BOTH the retraction $r$ and the inclusion-composed-with-retraction
homotopy to the identity, never just one direction) to establish equivalences; and apply
homotopy invariants ($\pi_1$, homology) to prove non-equivalence, while recognizing
contractibility is logically independent of compactness (never conflated).

## Core Understanding
HOMOTOPY EQUIVALENCE IS STRICTLY WEAKER THAN HOMEOMORPHISM — NEVER THE SAME RELATION: $[0,1]$ is
contractible via $H(x,t)=(1-t)x$, giving $\mathrm{id}_{[0,1]}\simeq c_0$ — so $[0,1]\simeq\{0\}$.
But $[0,1]\not\cong\{0\}$ (different numbers of points entirely). Homotopy equivalence allows
"crushing" dimensions and structure that homeomorphism strictly forbids — every homeomorphism IS
a homotopy equivalence (take $g=f^{-1}$, both compositions literally equal the identity), but the
converse fails dramatically, as $[0,1]\simeq\{pt\}\not\cong\{pt\}$ demonstrates.

A DEFORMATION RETRACT REQUIRES CHECKING BOTH DIRECTIONS — NEVER JUST THE RETRACTION MAP ALONE: for
$r:\mathbb R^2\setminus\{0\}\to S^1$, $r(x)=x/|x|$, with $H(x,t)=x/|x|^t$: checking $H(x,0)=x$,
$H(x,1)=x/|x|\in S^1$, AND $H(u,t)=u$ for $u\in S^1$ (since $|u|=1$) confirms $r$ is a genuine
retraction. But a DEFORMATION retract additionally requires $i\circ r\simeq\mathrm{id}_X$ where
$i:S^1\hookrightarrow\mathbb R^2\setminus\{0\}$ is inclusion — the SAME homotopy $H$ witnesses
this second condition too. Checking ONLY that $r\circ i=\mathrm{id}_A$ (the "easy," exact
direction) while forgetting $i\circ r\simeq\mathrm{id}_X$ (the "up to homotopy" direction) misses
half of what a deformation retract requires.

CONTRACTIBLE AND COMPACT ARE LOGICALLY INDEPENDENT — NEVER CONFLATED: $\mathbb R^n$ is
CONTRACTIBLE (via $H(x,t)=(1-t)x$, shrinking everything to the origin) but is NOT compact. $S^n$
is COMPACT but is NOT contractible (it has nontrivial higher homotopy groups, e.g.
$\pi_n(S^n)\cong\mathbb Z$). The unit disk $D^2$ is BOTH contractible AND compact. All four
combinations of {contractible, not contractible} × {compact, not compact} genuinely occur —
"contractible" is a purely homotopy-theoretic deformation property, entirely independent of the
metric/covering property "compact."

## Mental Models
- **"Homotopy equivalence lets you crush and stretch dimensions away — homeomorphism never does;
  a point and an interval can be 'the same shape' homotopically while being utterly different
  spaces."**
- **"A deformation retract needs two checks, not one — the retraction going in, AND the inclusion-
  then-retraction being homotopic to the identity going back."**
- **"Contractible is about deforming to a point; compact is about coverings and boundedness — two
  independent properties that can mix in any combination."**

## Why Students Fail

### MC-1: HOMOTOPY-EQUIVALENT-MEANS-HOMEOMORPHIC
- **Surface form**: believes homotopy equivalence implies homeomorphism, missing that
  contractible spaces (all homotopy equivalent to a point) need not be homeomorphic to each
  other.
- **Birth type**: Critical severity (Blueprint's own declared severity — the whole point of the
  weaker relation is easy to miss without a sharp, concrete counterexample).
- **Repair**: re-walk the $[0,1]\simeq\{0\}$-but-$[0,1]\not\cong\{0\}$ contrast.

### MC-2: DEFORMATION-RETRACT-DIRECTION-CONFUSED
- **Surface form**: believes the deformation retract is only the retraction map $r:X\to A$,
  missing that BOTH the inclusion $i$ and the retraction $r$ must be checked as homotopy
  inverses.
- **Birth type**: Foundational severity (Blueprint's own declared severity — the retraction
  direction is more visually intuitive, easily overshadowing the "back" direction).
- **Repair**: re-verify both $r\circ i=\mathrm{id}_A$ (exact) and $i\circ r\simeq\mathrm{id}_X$
  (up to homotopy) explicitly for $\mathbb R^2\setminus\{0\}\simeq S^1$.

### MC-3: CONTRACTIBLE-MEANS-COMPACT
- **Surface form**: believes "contractible" implies "bounded" or "compact," conflating a
  topological deformation property with a metric/compactness property.
- **Birth type**: Moderate severity (Blueprint's own declared severity — both properties feel like
  "the space is somehow small or simple," inviting conflation).
- **Repair**: re-walk the four-combination table: $\mathbb R^n$ (contractible, not compact), $S^n$
  (compact, not contractible), $D^2$ (both).

## Misconceptions

### MC-1: HOMOTOPY-EQUIVALENT-MEANS-HOMEOMORPHIC
- **Surface form**: as described above.
- **Root cause (Critical)**: as described above.
- **Repair**: as described above.

### MC-2: DEFORMATION-RETRACT-DIRECTION-CONFUSED
- **Surface form**: as described above.
- **Root cause (Foundational)**: as described above.
- **Repair**: as described above.

### MC-3: CONTRACTIBLE-MEANS-COMPACT
- **Surface form**: as described above.
- **Root cause (Moderate)**: as described above.
- **Repair**: as described above.

## Analogies
- **"Homotopy equivalence is like saying a wrinkled sheet and a flat sheet are 'the same' once you
  smooth out the wrinkles — homeomorphism demands the sheets already have identical thread
  counts."**
- **Anti-analogy**: contractible does not mean "small" or "boundable" — the entire infinite plane
  $\mathbb R^2$ is contractible, and no amount of shrinking-to-a-point implies fitting inside a
  bounded region.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: the $[0,1]\simeq\{0\}$-but-not-homeomorphic contrast.
- **Demonstration 2 (targets MC-2)**: the $\mathbb R^2\setminus\{0\}\simeq S^1$ deformation
  retract, both directions verified explicitly.
- **Demonstration 3 (targets MC-3)**: the contractible/compact four-combination table
  ($\mathbb R^n$, $S^n$, $D^2$).

## Discovery Questions
1. "If $[0,1]$ and $\{0\}$ are homotopy equivalent, does that mean they're homeomorphic?"
2. "Is the retraction $r:X\to A$ the only direction that needs checking in a homotopy
   equivalence?"
3. "Is contractible the same as compact?"

## Teaching Sequence
1. **Representation shift**: the homotopy-of-maps-to-equivalence-of-spaces bridge, working
   Demonstration 1, isolating MC-1.
2. **Deductive**: the formal deformation-retract definition, working Demonstration 2, isolating
   MC-2.
3. **Counterexample**: the homotopy-invariant distinguishing argument and the contractible/
   compact independence table, working Demonstration 3, isolating MC-3.
4. **Mastery gate**: require a correct contracting-homotopy construction for a convex set, a
   correct deformation-retract verification with both directions checked, a correct
   equivalence-relation proof for homotopy equivalence, and a correct homotopy-invariant argument
   distinguishing two spaces, at the Blueprint's own stated MAMR of 4/5.

## Tutor Actions
- Never accept homotopy equivalence treated as implying homeomorphism.
- Never accept a deformation retract verified by checking only the retraction direction, without
  the inclusion-composed-with-retraction homotopy.
- Never accept "contractible" conflated with "compact" or "bounded."

## Voice Teaching Notes
- Say "does this mean the spaces are the SAME, or just homotopy equivalent — which is weaker?"
  whenever homotopy equivalence is discussed alongside homeomorphism.
- Ask "have you checked BOTH directions of the deformation retract?" whenever a deformation
  retract is proposed.

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly distinguishes homotopy equivalence from
  homeomorphism using the $[0,1]$-versus-$\{pt\}$ example.
- **Rung 2 (application)**: learner correctly constructs a deformation retract, verifying both
  the retraction and the homotopy-to-identity condition.
- **Rung 3 (transfer)**: learner correctly uses a homotopy invariant (e.g. $\pi_1$ or Euler
  characteristic) to prove two spaces are not homotopy equivalent.

## Tutor Recovery Strategy
- If MC-1 recurs, re-walk the $[0,1]\simeq\{0\}$-but-not-homeomorphic contrast.
- If MC-2 recurs, re-verify both directions of the $\mathbb R^2\setminus\{0\}\simeq S^1$
  deformation retract.
- If MC-3 recurs, re-walk the contractible/compact four-combination table.

## Memory Hooks
- "Homotopy equivalence is strictly weaker than homeomorphism — it can crush dimensions away."
- "A deformation retract needs both directions checked — the retraction, and the homotopy back to
  the identity."
- "Contractible and compact are independent — check them separately, never assume one from the
  other."

## Transfer Connections
- `math.top.homotopy` (already authored, this campaign, Batch 187): supplies the homotopy-of-maps
  machinery this concept's homotopy-equivalence-of-spaces relation is built directly on.

## Cross-Subject Connections
- Algebraic topology: homology and cohomology groups, which — like $\pi_1$ — are homotopy
  invariants used to distinguish spaces up to homotopy equivalence.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.top.homotopy-equivalence.md`, reused by
  reference for its $[0,1]$-versus-$\{pt\}$ contrast, its $\mathbb R^2\setminus\{0\}\simeq S^1$
  deformation retract, its $S^1$-versus-$\mathbb R$ homotopy-invariant distinguishing argument,
  and its three-misconception registry (severity levels adopted directly as declared).
- Transfer probe: the Blueprint's own independence-mode probe computing Euler characteristics of
  $S^1\vee S^1$ and the punctured torus to verify a homotopy-invariant prediction.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires `math.top.homotopy`,
  unlocks none, cross_links none, expert/understand, mastery_threshold 0.8, estimated_hours 4)
  was directly verified against the live KG and matches exactly.

## Version History
- 2026-09-19 (Batch 188): authored. Second entry this batch. Companion batch concept:
  `math.top.fundamental-group`.
