# math.de.stability-analysis

## Identity
- **KG id**: `math.de.stability-analysis`
- **Domain**: math.de
- **Requires**: `math.de.phase-plane`
- **Unlocks**: none
- **Cross-links**: none
- **Difficulty**: expert
- **Bloom level**: analyze
- **Mastery threshold**: 0.75
- **Estimated hours**: 7

## Learning Objective
Distinguish STABILITY (do nearby trajectories stay near, or return to, the equilibrium?) from
`math.de.phase-plane`'s own equilibrium TYPE classification — nodes and spirals can be EITHER
stable OR unstable depending on eigenvalue sign, saddles are ALWAYS unstable, centers are Lyapunov
stable but NEVER asymptotically stable; precisely distinguish LYAPUNOV stability (staying close
forever, not necessarily converging) from ASYMPTOTIC stability (staying close AND converging); and
construct a Lyapunov function to determine GLOBAL stability where linearization genuinely fails
(purely imaginary eigenvalues).

## Core Understanding
EQUILIBRIUM TYPE ALONE NEVER DETERMINES STABILITY — THE SAME EIGENVALUES MUST BE READ FOR SIGN
TOO: for $x'=x-y,y'=x+y$ (already classified as a spiral via $\lambda=1\pm i$ in
`math.de.phase-plane`): the real part is STRICTLY POSITIVE — this spiral is UNSTABLE, trajectories
spiraling AWAY, not toward, the origin. Both stable and unstable versions of nodes and spirals
exist, distinguished by the SIGN of the eigenvalues' real part, never by type alone; a saddle is
ALWAYS unstable (one eigendirection always repels) regardless of the other direction.

LYAPUNOV STABILITY AND ASYMPTOTIC STABILITY ARE PRECISELY DIFFERENT — THE CENTER CASE PROVES IT:
for eigenvalues $\lambda=-2,-3$ (both real, negative): ASYMPTOTICALLY stable — trajectories stay
close AND converge. For $\lambda=\pm3i$ (purely imaginary): Lyapunov STABLE but NOT
asymptotically stable — a center's orbits stay at a fixed distance FOREVER, never converging. For
$\lambda=2,-1$ (opposite signs): UNSTABLE — a saddle. The precise correspondence: BOTH real parts
strictly negative gives asymptotic stability; purely imaginary gives Lyapunov stability WITHOUT
asymptotic stability; any positive real part (or mixed signs) gives instability.

LYAPUNOV FUNCTIONS RESOLVE EXACTLY THE CASES LINEARIZATION CANNOT — NEVER LEAVING THE
PURELY-IMAGINARY CASE UNRESOLVABLE: for $x'=-y-x^3,y'=x-y^3$: linearizing gives Jacobian
$\begin{pmatrix}0&-1\\1&0\end{pmatrix}$, eigenvalues $\lambda=\pm i$ — PURELY IMAGINARY, so
linearization ALONE cannot tell whether the true nonlinear system is a genuine center or actually
spirals. Trying $V(x,y)=x^2+y^2$ (positive except zero at origin): $\dot
V=2x(-y-x^3)+2y(x-y^3)=-2x^4-2y^4$ — STRICTLY NEGATIVE everywhere except the origin — certifying
the origin is ACTUALLY ASYMPTOTICALLY STABLE, resolving what linearization alone left ambiguous.

## Mental Models
- **"Type tells you the shape; stability asks the sharper question of whether trajectories
  actually stay near or return — the same eigenvalues answer both, but you must check the sign of
  the real part for the second question."**
- **"A Lyapunov function works directly with the nonlinear equations, sidestepping exactly the
  borderline case (purely imaginary eigenvalues) where linearization goes silent."**

## Why Students Fail

### MC-1: EQUILIBRIUM-TYPE-ASSUMED-TO-DETERMINE-STABILITY-ALONE
- **Surface form**: believes an equilibrium's type (node, saddle, spiral, center) alone determines
  its stability without further checking.
- **Birth type**: Foundational severity (Blueprint's own declared severity — "spiral" or "node"
  sound like they should already answer the stability question).
- **Repair**: re-walk the sign-based stability determination on the already-classified spiral from
  `math.de.phase-plane`.

### MC-2: LYAPUNOV-STABILITY-ASSUMED-TO-IMPLY-ASYMPTOTIC-STABILITY
- **Surface form**: believes Lyapunov stability (staying close) automatically implies asymptotic
  stability (eventually converging).
- **Birth type**: High severity (Blueprint's own declared severity — "stable" colloquially suggests
  settling down, obscuring the genuine distinction the center case reveals).
- **Repair**: re-walk the center case, staying close but never converging.

### MC-3: LINEARIZATION-INCONCLUSIVE-CASE-ASSUMED-UNRESOLVABLE
- **Surface form**: believes that when linearization gives purely imaginary eigenvalues, no
  further technique can resolve the true nonlinear system's stability.
- **Birth type**: Moderate severity (Blueprint's own declared severity — an inconclusive linear
  approximation feels like a dead end rather than an invitation to a different technique).
- **Repair**: re-walk the direct Lyapunov-function certification for $x'=-y-x^3,y'=x-y^3$.

## Misconceptions

### MC-1: EQUILIBRIUM-TYPE-ASSUMED-TO-DETERMINE-STABILITY-ALONE
- **Surface form**: as described above.
- **Root cause (Foundational)**: as described above.
- **Repair**: as described above.

### MC-2: LYAPUNOV-STABILITY-ASSUMED-TO-IMPLY-ASYMPTOTIC-STABILITY
- **Surface form**: as described above.
- **Root cause (High)**: as described above.
- **Repair**: as described above.

### MC-3: LINEARIZATION-INCONCLUSIVE-CASE-ASSUMED-UNRESOLVABLE
- **Surface form**: as described above.
- **Root cause (Moderate)**: as described above.
- **Repair**: as described above.

## Analogies
- **"Type is the shape of the trajectory near equilibrium; stability is whether that shape leads
  home or away — the same eigenvalues, read for a different feature."**
- **Anti-analogy**: a center's Lyapunov stability is NOT "almost asymptotic stability" — it's a
  genuinely permanent, non-converging orbit, categorically different from a stable spiral that
  actually arrives.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: the already-classified spiral's sign-based stability
  determination (unstable, real part $+1$).
- **Demonstration 2 (targets MC-2)**: the three-eigenvalue-case comparison — asymptotically
  stable, Lyapunov-stable-only (center), unstable (saddle).
- **Demonstration 3 (targets MC-3)**: the Lyapunov-function certification for the
  purely-imaginary-eigenvalue nonlinear system.

## Discovery Questions
1. "Does knowing an equilibrium's type (e.g. 'it's a spiral') automatically tell you whether it's
   stable or unstable?"
2. "Does Lyapunov stability (staying close) automatically imply asymptotic stability (eventually
   converging)?"
3. "When linearization gives purely imaginary eigenvalues, is there any further technique to
   determine the true nonlinear system's stability?"

## Teaching Sequence
1. **Representation shift**: the type-versus-stability distinction, working Demonstration 1,
   isolating MC-1.
2. **Conflict evidence**: the Lyapunov-versus-asymptotic distinction, working Demonstration 2,
   isolating MC-2.
3. **Contrast pair**: the Lyapunov-function resolution of linearization's inconclusive case,
   working Demonstration 3, isolating MC-3.
4. **Mastery gate**: require a correct stability classification from given eigenvalues, a correct
   three-way Lyapunov/asymptotic/unstable classification, and a correct construction and
   verification of a Lyapunov function for a borderline case, at the Blueprint's own stated MAMR
   of 4/5.

## Tutor Actions
- Never accept an equilibrium's stability determined from its type alone without checking the
  eigenvalues' sign.
- Never accept Lyapunov stability treated as equivalent to asymptotic stability.
- Never accept a purely-imaginary-eigenvalue case declared unresolvable without attempting a
  Lyapunov function.

## Voice Teaching Notes
- Say "what's the sign of the real part?" whenever an equilibrium's type is used to infer
  stability.
- When Lyapunov stability is claimed, ask "does it also converge, or just stay close forever?"

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly determines stability from a given set of
  eigenvalues.
- **Rung 2 (application)**: learner correctly classifies an equilibrium as asymptotically stable,
  Lyapunov stable only, or unstable.
- **Rung 3 (transfer)**: learner correctly constructs and verifies a Lyapunov function for a
  nonlinear system where linearization is inconclusive.

## Tutor Recovery Strategy
- If MC-1 recurs, re-walk the sign-based stability determination.
- If MC-2 recurs, re-walk the center case's Lyapunov-but-not-asymptotic distinction.
- If MC-3 recurs, re-walk the Lyapunov-function certification example.

## Memory Hooks
- "Type tells you the shape — stability needs the sign of the real part too."
- "A center stays close forever without ever converging — Lyapunov stable, never asymptotic."
- "Purely imaginary eigenvalues aren't a dead end — a Lyapunov function can resolve them."

## Transfer Connections
- `math.de.phase-plane` (already authored, this campaign, Batch 151): supplies the equilibrium
  classification via linearization eigenvalues this concept's stability question directly builds
  on and sharpens, closing its declared unlock.

## Cross-Subject Connections
- None formal.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.de.stability-analysis.md`, reused by
  reference for its sign-based stability example, its three-eigenvalue-case comparison, its
  Lyapunov-function certification example, and its three-misconception registry (severity levels
  adopted directly as declared).
- Transfer probe: the Blueprint's own independence-mode probe, applying stability analysis and
  Lyapunov functions to a robotic-arm control system's inconclusive linearization.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires
  `math.de.phase-plane`, unlocks none, cross_links none, expert/analyze, mastery_threshold 0.75,
  estimated_hours 7) was directly verified against the live KG and matches exactly.

## Version History
- 2026-09-19 (Batch 154): authored. Second entry this batch, closing
  `math.de.phase-plane`'s declared unlock. Companion batch concept:
  `math.de.harmonic-oscillator`.
