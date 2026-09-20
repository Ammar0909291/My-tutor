# math.cx.riemann-surface

## Identity
- **KG id**: `math.cx.riemann-surface`
- **Domain**: math.cx
- **Requires**: `math.cx.analytic-continuation`, `math.top.topological-space`
- **Unlocks**: none
- **Cross-links**: `math.top.covering-space`
- **Difficulty**: research
- **Bloom level**: analyze
- **Mastery threshold**: 0.55
- **Estimated hours**: 10

## Learning Objective
Recognize multivaluedness as signaling the WRONG DOMAIN — NEVER a bug to patch with an ad-hoc
principal-branch convention; recognize the Riemann surface as a GENUINE new geometric domain —
NEVER merely notational bookkeeping; and recognize branch points as producing genuinely FINITE
structures — NEVER assuming every multivalued function needs $\log z$'s infinite helical
structure.

## Core Understanding
MULTIVALUEDNESS SIGNALS THE WRONG DOMAIN — NEVER A PATCHABLE QUIRK: continuing $\log z$ around a
loop enclosing $0$ returns to the SAME point $z=1$ with value $2\pi i$ instead of $0$ — genuinely
NOT single-valued on $\mathbb{C}\setminus\{0\}$. Believing this misbehavior should be patched with
an ad-hoc convention like "always pick the principal branch" is WRONG — it signals that
$\mathbb{C}\setminus\{0\}$ is genuinely the WRONG domain for $\log z$ to live on as a
single-valued function; a Riemann surface is the CORRECT domain, built specifically to make it
single-valued.

THE RIEMANN SURFACE IS A GENUINE NEW GEOMETRIC DOMAIN — NEVER MERE NOTATION: stacking infinitely
many sheets of $\mathbb{C}\setminus\{0\}$, glued along a cut so crossing it counterclockwise moves
sheet $n$ to sheet $n+1$, with $\log z=\ln|z|+i(\theta+2\pi n)$ defined on sheet $n$: this is an
honest, rigorous new space on which $\log z$ is PROVABLY single-valued — going around the origin
once moves you to a genuinely DIFFERENT point (sheet $n+1$), never back to the same point.
Believing the Riemann surface construction is a notational bookkeeping trick for tracking which
branch of $\log z$ you're using is WRONG — it is a genuine, rigorous new geometric domain, not a
convenience for notation.

BRANCH POINTS PRODUCE GENUINELY FINITE STRUCTURES — NEVER ASSUMING EVERY FUNCTION NEEDS AN
INFINITE HELIX: for $\sqrt z$: going around the origin ONCE gives $\sqrt z\cdot e^{i\pi}=-\sqrt z$
(a DIFFERENT value — not yet closed), but going around TWICE gives $\sqrt z\cdot e^{2\pi i}=
\sqrt z$ (back to the ORIGINAL value) — exactly TWO sheets, genuinely MERGING at $z=0$ after
finitely many loops, a "branch point," fundamentally different from $\log z$'s infinite,
never-closing helix. Believing every multivalued function requires the same kind of infinite,
never-closing Riemann surface that $\log z$ does is WRONG — branch points produce genuinely
different, finite-sheeted structures that close up after a specific finite number of loops.

## Mental Models
- **"log z isn't broken — it's living on the wrong domain. The Riemann surface is the correct
  domain, built to make it single-valued."**
- **"Gluing sheets together isn't bookkeeping — it's a genuine new geometric object you can stand
  on, where the function behaves normally."**
- **"Not every branch cut leads to an infinite tower — some, like √z, close up after exactly a
  finite number of loops, at a branch point."**

## Why Students Fail

### MC-1: MULTIVALUEDNESS-TREATED-AS-PATCHABLE-QUIRK
- **Surface form**: believes a multivalued function's misbehavior should be patched with an ad-hoc
  convention, missing that it signals the function's true domain must genuinely change.
- **Birth type**: foundational (Blueprint's own declared severity — the principal-branch
  convention is so pervasive in introductory treatments that it feels like the actual solution
  rather than a workaround).
- **Repair**: re-walk the reframing of monodromy as a domain problem, not a quirk.

### MC-2: RIEMANN-SURFACE-ASSUMED-MERELY-NOTATIONAL
- **Surface form**: believes the Riemann surface construction is a notational bookkeeping trick,
  missing that it is a genuine, rigorous new geometric domain.
- **Birth type**: high severity (Blueprint's own declared severity — "sheets" and "branches" sound
  like labeling schemes rather than an actual constructed space).
- **Repair**: re-walk the concrete gluing construction and its provable single-valuedness.

### MC-3: ALL-MULTIVALUED-FUNCTIONS-ASSUMED-INFINITE-SHEETED
- **Surface form**: believes every multivalued function requires an infinite, never-closing
  Riemann surface like $\log z$'s, missing that branch points produce finite-sheeted structures.
- **Birth type**: moderate severity (Blueprint's own declared severity — $\log z$ is often the
  first and most memorable example, over-generalizing its infinite structure).
- **Repair**: re-walk the $\sqrt z$ two-loop closing computation.

## Misconceptions

### MC-1: MULTIVALUEDNESS-TREATED-AS-PATCHABLE-QUIRK
- **Surface form**: as described above.
- **Root cause (foundational)**: as described above.
- **Repair**: as described above.

### MC-2: RIEMANN-SURFACE-ASSUMED-MERELY-NOTATIONAL
- **Surface form**: as described above.
- **Root cause (high severity)**: as described above.
- **Repair**: as described above.

### MC-3: ALL-MULTIVALUED-FUNCTIONS-ASSUMED-INFINITE-SHEETED
- **Surface form**: as described above.
- **Root cause (moderate severity)**: as described above.
- **Repair**: as described above.

## Analogies
- **"A Riemann surface is like building a spiral parking garage for a function that keeps wanting
  to climb to a new level every time it circles the block — the 'multivaluedness' was really just
  the ground floor being too small."**
- **Anti-analogy**: the helical surface for log z isn't a metaphor for tracking branches — it is
  an actual, connected geometric space, as real as any manifold studied elsewhere.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: the $\log z$ monodromy-as-domain-problem reframing.
- **Demonstration 2 (targets MC-2)**: the concrete helical-surface gluing construction.
- **Demonstration 3 (targets MC-3)**: the $\sqrt z$ two-sheet closing-after-two-loops computation.

## Discovery Questions
1. "Is log z's multivaluedness best handled by an ad-hoc convention, or does it signal something
   deeper about the function's true domain?"
2. "Is the Riemann surface construction just a notational convenience, rather than an actual new
   geometric space?"
3. "Do all multivalued functions require the same kind of infinite, never-closing Riemann surface
   that log z does?"

## Teaching Sequence
1. **Representation shift**: work the monodromy-as-domain-problem reframing, isolating MC-1.
2. **Conflict evidence**: work the concrete helical-surface gluing construction, isolating MC-2.
3. **Contrast pair**: work the $\sqrt z$-versus-$\log z$ finite-versus-infinite structure contrast,
   isolating MC-3.
4. **Mastery gate**: require a correct explanation of why $\log z$ cannot be single-valued on
   $\mathbb{C}\setminus\{0\}$, a correct explanation of the helical construction's crossing
   behavior, a correct verification that $\sqrt z$ closes after two loops, and a correct
   distinction between a branch point and $\log z$'s infinite structure, at the Blueprint's own
   stated MAMR of 3/5.

## Tutor Actions
- Never accept multivaluedness treated as fixable purely by a principal-branch convention.
- Never accept the Riemann surface described as mere notation rather than a genuine space.
- Never accept every multivalued function assumed to need an infinite-sheeted surface.

## Voice Teaching Notes
- Say "is that really the wrong domain, or just an inconvenient function?" whenever multivaluedness
  is discussed.
- Ask "does this function's surface close up after finitely many loops, or never?" whenever a new
  multivalued function's Riemann surface is introduced.

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly explains why $\log z$ fails to be single-valued on
  $\mathbb{C}\setminus\{0\}$ using the monodromy example.
- **Rung 2 (application)**: learner correctly describes the helical gluing construction making
  $\log z$ single-valued.
- **Rung 3 (transfer)**: learner correctly determines the number of sheets for $z^{1/3}$'s Riemann
  surface and explains why building the correct surface is more honest than a principal-branch
  convention.

## Tutor Recovery Strategy
- If MC-1 recurs, re-walk the monodromy-as-domain-problem reframing.
- If MC-2 recurs, re-walk the concrete gluing construction.
- If MC-3 recurs, re-walk the $\sqrt z$ two-loop closing computation.

## Memory Hooks
- "Multivaluedness signals the wrong domain — never a quirk to patch."
- "The Riemann surface is a genuine new space — never mere notation."
- "Branch points close up finitely — never assume an infinite helix universally."

## Transfer Connections
- `math.cx.analytic-continuation` (prerequisite, already authored, this campaign): supplies the
  monodromy phenomenon this concept's entire motivation directly resolves.
- `math.top.topological-space` (prerequisite, already authored): supplies the general notion of a
  space needed to make sense of a "one-dimensional complex manifold."

## Cross-Subject Connections
- `math.top.covering-space` (cross-link, already authored): supplies the formal "evenly covered"
  and universal-cover framework that rigorously underlies both the $\log z$ helical construction
  and the $\sqrt z$ branch-point construction built here.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.cx.riemann-surface.md`, reused by reference
  for its three worked examples and its three-misconception registry (birth types adopted directly
  as declared).
- Transfer probe: the Blueprint's own independence-mode probe on the cube-root function
  $z^{1/3}$'s sheet count and branch-point structure.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Reverse-direction discrepancy**: the Blueprint states its cross-link target
  `math.top.covering-space` was "not yet authored at time of writing" (Component 7) and set
  `P76_mode = independence` accordingly. Direct verification against the live EB corpus confirms
  `math.top.covering-space` IS now authored (`educational-brain/concepts/mathematics/
  math.top.covering-space.md` exists on disk). This is the same class of reverse-direction
  discrepancy documented repeatedly earlier in this campaign (Blueprint's authored-status snapshot
  is now stale) — the EB content itself remains accurate to the Blueprint's worked examples and
  misconception registry; only the cross-link authored-status note is now outdated. All other
  fields (requires, unlocks, difficulty, bloom, mastery_threshold, estimated_hours) were directly
  verified against the live KG and match exactly.

## Version History
- 2026-09-20 (Batch 251): authored. First entry this batch. Companion batch concept:
  `math.cx.riemann-zeta`.
