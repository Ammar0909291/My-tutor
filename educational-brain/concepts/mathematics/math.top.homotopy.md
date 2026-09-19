# math.top.homotopy

## Identity
- **KG id**: `math.top.homotopy`
- **Domain**: math.top
- **Requires**: `math.top.continuity-top`
- **Unlocks**: `math.top.fundamental-group`, `math.top.homotopy-equivalence`
- **Cross-links**: none
- **Difficulty**: expert
- **Bloom level**: understand
- **Mastery threshold**: 0.8
- **Estimated hours**: 5

## Learning Objective
Define a homotopy between $f,g:X\to Y$ as a single continuous function $H:X\times[0,1]\to Y$
with $H(x,0)=f(x)$, $H(x,1)=g(x)$; verify a candidate homotopy by checking BOTH endpoint
conditions AND joint continuity of $H$ as a function of $(x,t)$ TOGETHER (never assuming
endpoint-matching alone suffices); and recognize homotopy as a genuine equivalence relation, where
two maps failing to be homotopic is a real topological obstruction (never assumed impossible
between any two continuous maps on the same spaces).

## Core Understanding
ENDPOINT MATCHING IS NECESSARY BUT NEVER SUFFICIENT — JOINT CONTINUITY MUST BE CHECKED
SEPARATELY: for $X=[0,1]$, $Y=\mathbb R$, $f(x)=0$, $g(x)=1$: the candidate $H(x,t)=0$ for
$t<1/2$, $H(x,t)=1$ for $t\ge1/2$ satisfies BOTH endpoints exactly ($H(x,0)=0=f(x)$,
$H(x,1)=1=g(x)$) — yet FAILS to be a valid homotopy, because $H$ JUMPS discontinuously at
$t=1/2$. Matching $f$ and $g$ at the two endpoints is a necessary condition, never a sufficient
one — the WHOLE map $H(x,t)$, as a joint function of both variables, must itself be checked for
continuity exactly as any other continuity claim (via preimages of open sets). A genuinely
continuous alternative, $H(x,t)=t$, works instead.

HOMOTOPY IS A GENUINE EQUIVALENCE RELATION, EACH PROPERTY BACKED BY AN EXPLICIT CONSTRUCTION —
NEVER ASSERTED WITHOUT ONE: REFLEXIVE via $H(x,t)=f(x)$ (constant in $t$, trivially continuous);
SYMMETRIC via $H'(x,t)=H(x,1-t)$ (running the deformation backward — continuous since $t\mapsto
1-t$ is continuous); TRANSITIVE via concatenating $H_1$ (rescaled onto $[0,1/2]$) then $H_2$
(rescaled onto $[1/2,1]$). Each property corresponds to an ACTUAL homotopy you can write down —
never just an abstract label asserted without construction.

WHETHER TWO MAPS ARE HOMOTOPIC DEPENDS ON THE SPACE — NEVER ASSUMED AUTOMATIC BETWEEN ANY TWO
CONTINUOUS MAPS: on $X=Y=\mathbb R^2$, the identity $f(x)=x$ and the constant $g(x)=0$ ARE
homotopic via the straight-line homotopy $H(x,t)=(1-t)x$ (continuous, both endpoints check out).
But on $X=Y=S^1$, the identity $f(z)=z$ and the constant $g(z)=1$ are FAMOUSLY NOT homotopic — no
continuous deformation can "unwrap" the circle's full loop down to a point while staying on the
circle. Whether a homotopy exists is a genuine, provable topological OBSTRUCTION depending on the
SPACE (a disk-like space like $\mathbb R^2$ allows contraction; a loop-like space like $S^1$
provably does not) — never a foregone conclusion just because both maps are continuous on the
same pair of spaces.

## Mental Models
- **"A homotopy is a continuous movie from f to g — every single frame, including how the frames
  fit together across time, must be continuous, not just the first and last frame."**
- **"Each equivalence-relation property of homotopy is an actual deformation you can write down —
  reflexive is 'do nothing,' symmetric is 'run it backward,' transitive is 'splice two movies
  together.'"**
- **"Whether you can deform one map into another depends on the shape of the space it lives on —
  a disk lets you shrink everything to a point; a loop can refuse."**

## Why Students Fail

### MC-1: HOMOTOPY-ENDPOINTS-CHECKED-WITHOUT-VERIFYING-JOINT-CONTINUITY
- **Surface form**: believes a candidate function satisfying the two endpoint conditions
  automatically qualifies as a homotopy, without separately verifying joint continuity of $H$ as
  a function of $x$ and $t$ together.
- **Birth type**: Foundational severity (Blueprint's own declared severity — the endpoint
  conditions are the most visually salient part of the definition, inviting a check-the-obvious-
  part shortcut).
- **Repair**: re-walk the piecewise-constant candidate's jump discontinuity at $t=1/2$ despite
  correct endpoints.

### MC-2: ALL-CONTINUOUS-MAPS-BETWEEN-SAME-SPACES-ASSUMED-HOMOTOPIC
- **Surface form**: assumes any two continuous maps between the same pair of spaces must be
  homotopic, missing that genuine topological obstructions (like on $S^1$) can prevent this.
- **Birth type**: Foundational severity (Blueprint's own declared severity — without a concrete
  non-homotopic counterexample, "just deform one into the other" feels like it should always be
  achievable).
- **Repair**: re-present the $\mathbb R^2$-versus-$S^1$ contrast directly.

### MC-3: HOMOTOPY-EQUIVALENCE-RELATION-PROPERTIES-ASSUMED-WITHOUT-CONSTRUCTION
- **Surface form**: accepts that homotopy is reflexive/symmetric/transitive without being able to
  exhibit the specific homotopies establishing each property.
- **Birth type**: Moderate severity (Blueprint's own declared severity — equivalence-relation
  properties are often learned as abstract labels rather than concrete constructions).
- **Repair**: re-walk the explicit reflexive/symmetric/transitive constructions.

## Misconceptions

### MC-1: HOMOTOPY-ENDPOINTS-CHECKED-WITHOUT-VERIFYING-JOINT-CONTINUITY
- **Surface form**: as described above.
- **Root cause (Foundational)**: as described above.
- **Repair**: as described above.

### MC-2: ALL-CONTINUOUS-MAPS-BETWEEN-SAME-SPACES-ASSUMED-HOMOTOPIC
- **Surface form**: as described above.
- **Root cause (Foundational)**: as described above.
- **Repair**: as described above.

### MC-3: HOMOTOPY-EQUIVALENCE-RELATION-PROPERTIES-ASSUMED-WITHOUT-CONSTRUCTION
- **Surface form**: as described above.
- **Root cause (Moderate)**: as described above.
- **Repair**: as described above.

## Analogies
- **"A homotopy is a continuous movie, not a slideshow with only a first and last slide checked —
  every frame in between, and how they connect, must play smoothly."**
- **Anti-analogy**: not every pair of continuous maps between the same spaces can be deformed into
  each other — a loop-like space can genuinely trap a map, refusing any continuous path to a
  different map.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: the piecewise-constant candidate on $[0,1]\to\mathbb R$,
  correct endpoints but discontinuous at $t=1/2$.
- **Demonstration 2 (targets MC-3)**: the explicit reflexive/symmetric/transitive homotopy
  constructions.
- **Demonstration 3 (targets MC-2)**: the $\mathbb R^2$ straight-line contraction contrasted with
  $S^1$'s provable non-contractibility.

## Discovery Questions
1. "If a function $H$ correctly satisfies $H(x,0)=f(x)$ and $H(x,1)=g(x)$, is it automatically a
   valid homotopy?"
2. "Must any two continuous maps between the same pair of spaces be homotopic to each other?"
3. "Can you exhibit the actual homotopies proving homotopy is reflexive, symmetric, and
   transitive, rather than just asserting these properties?"

## Teaching Sequence
1. **Representation shift**: the continuous-movie framing and the straight-line homotopy example.
2. **Conflict evidence**: the piecewise-constant discontinuous candidate, working
   Demonstration 1, isolating MC-1.
3. **Contrast pair**: the $\mathbb R^2$-versus-$S^1$ homotopy-existence contrast, working
   Demonstration 3, isolating MC-2.
4. **Mastery gate**: require a correct explicit homotopy construction with joint-continuity
   verification, a correct identification of why a discontinuous candidate fails, and a correct
   construction of the reflexive/symmetric/transitive witnessing homotopies, at the Blueprint's
   own stated MAMR of 4/5.

## Tutor Actions
- Never accept a homotopy candidate verified only by its two endpoint conditions, without
  checking joint continuity.
- Never accept a claim that any two continuous maps between the same pair of spaces must be
  homotopic.
- Never accept homotopy's equivalence-relation properties asserted without an explicit
  constructed homotopy for each.

## Voice Teaching Notes
- Say "does H jump anywhere as t varies, even if the endpoints are correct?" whenever a candidate
  homotopy is proposed.
- Ask "can you actually write down the homotopy that makes this property true?" whenever an
  equivalence-relation property of homotopy is claimed.

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly constructs an explicit homotopy between two given
  maps and verifies both endpoint conditions.
- **Rung 2 (application)**: learner correctly verifies joint continuity of a candidate homotopy
  and correctly identifies why a discontinuous candidate fails despite correct endpoints.
- **Rung 3 (transfer)**: learner correctly explains why the identity and constant maps on $S^1$
  are not homotopic, contrasting with the analogous $\mathbb R^2$ case.

## Tutor Recovery Strategy
- If MC-1 recurs, re-walk the piecewise-constant discontinuous candidate.
- If MC-2 recurs, re-present the $\mathbb R^2$-versus-$S^1$ contrast.
- If MC-3 recurs, re-walk the explicit reflexive/symmetric/transitive constructions.

## Memory Hooks
- "Endpoints matching is necessary, never sufficient — check joint continuity separately."
- "Reflexive, symmetric, transitive: each is an actual homotopy you can write down."
- "Whether a homotopy exists depends on the space — a loop can refuse what a disk allows."

## Transfer Connections
- `math.top.continuity-top` (already authored, this campaign, Batch 183): supplies the
  preimage-based continuity condition this concept's homotopy $H$ must itself satisfy on the
  product space $X\times[0,1]$.
- `math.top.fundamental-group` (not yet authored, KG's declared unlock): built directly from
  homotopy classes of loops, the exact obstruction previewed in the $S^1$ example.
- `math.top.homotopy-equivalence` (not yet authored, KG's declared unlock): a weaker notion of
  "same shape" for spaces themselves, built from homotopic maps between them.

## Cross-Subject Connections
- Robotics/control theory: modeling a continuous configuration transition (e.g. a robotic arm
  moving without teleporting) as a homotopy between configuration maps.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.top.homotopy.md`, reused by reference for
  its straight-line homotopy example, its discontinuous-candidate joint-continuity
  counterexample, its equivalence-relation constructions, its $\mathbb R^2$-versus-$S^1$
  obstruction contrast, and its three-misconception registry (severity levels adopted directly
  as declared).
- Transfer probe: the Blueprint's own independence-mode probe modeling a robotic arm's continuous
  configuration transition as a homotopy, and interpreting a nonexistent homotopy as a genuine
  topological obstruction.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires
  `math.top.continuity-top`, unlocks `math.top.fundamental-group`/`math.top.homotopy-equivalence`,
  cross_links none, expert/understand, mastery_threshold 0.8, estimated_hours 5) was directly
  verified against the live KG and matches exactly.

## Version History
- 2026-09-19 (Batch 187): authored. First entry this batch. Companion batch concept:
  `math.top.manifold`.
