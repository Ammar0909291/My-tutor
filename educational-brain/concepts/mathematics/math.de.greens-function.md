# math.de.greens-function

## Identity
- **KG id**: `math.de.greens-function`
- **Domain**: math.de
- **Requires**: `math.de.poisson-equation`, `math.de.ivp`
- **Unlocks**: none
- **Cross-links**: `math.fnal.distributions` (not yet authored, independence mode)
- **Difficulty**: research
- **Bloom level**: analyze
- **Mastery threshold**: 0.7
- **Estimated hours**: 9

## Learning Objective
Construct the Green's function $G(x,\xi)$ satisfying $LG=\delta(x-\xi)$ PIECEWISE, with a genuine
derivative JUMP at $x=\xi$ (never a single smooth formula across the whole interval); apply the
superposition formula $u(x)=\int G(x,\xi)f(\xi)\,d\xi$ to build the FULL solution to $Lu=f$
(recognizing $G$ ALONE never already solves the general problem); and recognize $G$ encodes BOTH
the operator $L$ AND the boundary conditions (never assuming $G$ depends on $L$ alone).

## Core Understanding
$G$ REQUIRES A PIECEWISE CONSTRUCTION WITH A DERIVATIVE JUMP — NEVER A SINGLE SMOOTH FORMULA: for
$-u''=f(x)$ on $[0,1]$ with $u(0)=u(1)=0$: $G$ satisfies $-G''=\delta(x-\xi)$ with the SAME
boundary conditions. For $x<\xi$: $G=Ax$ (satisfying $G(0)=0$). For $x>\xi$: $G=B(1-x)$ (satisfying
$G(1)=0$). CONTINUITY at $x=\xi$ gives $A\xi=B(1-\xi)$; integrating across the point source forces
a JUMP $G'(\xi^-)-G'(\xi^+)=1$. Solving: $A=1-\xi$, $B=\xi$, giving
$G(x,\xi)=x(1-\xi)$ for $x\le\xi$, $\xi(1-x)$ for $x\ge\xi$ — a genuine KINK at $x=\xi$, NEVER a
smooth function there, exactly the mathematical signature of responding to a concentrated point
source.

$G$ ALONE NEVER SOLVES THE GENERAL PROBLEM — THE SUPERPOSITION INTEGRAL IS THE ESSENTIAL STEP:
using the SAME $G$ above to solve $-u''=1$ on $[0,1]$, $u(0)=u(1)=0$:
$u(x)=\int_0^1G(x,\xi)\cdot1\,d\xi=\int_0^x\xi(1-x)\,d\xi+\int_x^1x(1-\xi)\,d\xi=
\frac{x(1-x)}2$ — EXACTLY matching the known closed-form solution ($u''=-1$ confirms $-u''=1$;
$u(0)=u(1)=0$ confirms the BCs). $G$ by itself only answers the single point-source question ($f$
concentrated at one $\xi$) — the INTEGRAL against the actual, distributed source $f(\xi)$ is what
builds the genuine general solution, never something $G$ provides on its own.

$G$ ENCODES THE BOUNDARY CONDITIONS TOO — NEVER THE OPERATOR ALONE: if the boundary conditions were
instead $u(0)=0$, $u'(1)=0$ (mixed) rather than $u(0)=u(1)=0$, the SAME operator $-d^2/dx^2$ would
require a genuinely DIFFERENT $G$ — the right-hand piece would need to satisfy $u'(1)=0$ instead
of $u(1)=0$. Changing the boundary conditions while keeping $L$ fixed produces a genuinely
different Green's function; $G$ is a property of the WHOLE boundary-value problem, operator plus
boundary conditions together, never $L$ alone. Separately, $\delta(x-\xi)$ itself is not an
ordinary function — no ordinary function is zero everywhere except one point yet integrates to $1$
there — it is a genuine mathematical object (a distribution), rigorously developed in
`math.fnal.distributions`.

## Mental Models
- **"The Green's function has a kink at the source point — the jump in its derivative is the exact
  mathematical signature of a concentrated point source, never a smooth response."**
- **"Finding G answers only one question — what happens for a single point source. Integrating G
  against the actual f is what answers the real question."**
- **"G belongs to the whole boundary-value problem — operator AND boundary conditions together,
  never the operator alone."**

## Why Students Fail

### MC-1: GREENS-FUNCTION-ASSUMED-SMOOTH-THROUGHOUT
- **Surface form**: believes the Green's function can be found as a single smooth formula across
  the whole interval, missing the piecewise construction with a derivative jump.
- **Birth type**: Foundational severity (Blueprint's own declared severity — without seeing the
  jump condition's derivation, a smooth-throughout construction can seem like the natural
  expectation for a "solution").
- **Repair**: re-walk Example 1's full piecewise construction and jump condition.

### MC-2: GREENS-FUNCTION-ALONE-ASSUMED-SUFFICIENT
- **Surface form**: believes finding $G$ already solves the general nonhomogeneous equation
  $Lu=f$, missing that the superposition integral against $f$ is the essential remaining step.
- **Birth type**: High severity (Blueprint's own declared severity — finding $G$ feels like the
  hard part, obscuring that the integral against $f$ is what actually produces the general
  solution).
- **Repair**: re-walk Example 2's superposition-integral verification against the known closed-form
  solution.

### MC-3: GREENS-FUNCTION-ASSUMED-OPERATOR-ONLY
- **Surface form**: believes the Green's function depends only on the differential operator $L$,
  missing that it also encodes the specific boundary conditions.
- **Birth type**: Moderate severity (Blueprint's own declared severity — the notation $G(x,\xi)$
  for a fixed $L$ suggests $G$ is purely a property of $L$, obscuring the boundary-condition
  dependence baked into the piecewise construction).
- **Repair**: re-walk Example 3's mixed-boundary-condition contrast, producing a genuinely
  different $G$ for the same $L$.

## Misconceptions

### MC-1: GREENS-FUNCTION-ASSUMED-SMOOTH-THROUGHOUT
- **Surface form**: as described above.
- **Root cause (Foundational)**: as described above.
- **Repair**: as described above.

### MC-2: GREENS-FUNCTION-ALONE-ASSUMED-SUFFICIENT
- **Surface form**: as described above.
- **Root cause (High)**: as described above.
- **Repair**: as described above.

### MC-3: GREENS-FUNCTION-ASSUMED-OPERATOR-ONLY
- **Surface form**: as described above.
- **Root cause (Moderate)**: as described above.
- **Repair**: as described above.

## Analogies
- **"The Green's function is the system's response to a single, perfectly localized tap — a kink
  at the exact spot the tap landed, never a smooth ripple everywhere."**
- **Anti-analogy**: knowing the response to ONE point source is NOT the same as having solved the
  problem for every possible source — you still have to add up (integrate) that response over
  every point the real source occupies.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: the full piecewise $G(x,\xi)$ construction for
  $-u''=\delta(x-\xi)$ on $[0,1]$, deriving the continuity and jump conditions.
- **Demonstration 2 (targets MC-2)**: the superposition-integral computation for $-u''=1$,
  verified against the known closed-form solution $x(1-x)/2$.
- **Demonstration 3 (targets MC-3)**: the mixed-boundary-condition contrast, producing a
  genuinely different $G$ for the same operator.

## Discovery Questions
1. "Can the Green's function for -u''=δ(x-ξ) be found as a single smooth formula across the whole
   interval, or does it need separate pieces?"
2. "Once you've found the Green's function for an operator, have you already solved the general
   nonhomogeneous equation for any source f?"
3. "If the differential operator stays the same, must the Green's function also stay the same
   regardless of the boundary conditions?"

## Teaching Sequence
1. **Representation shift**: the piecewise construction and jump condition, working
   Demonstration 1, isolating MC-1.
2. **Conflict evidence**: the superposition-integral's essential role, working Demonstration 2,
   isolating MC-2.
3. **Contrast pair**: the boundary-condition dependence, working Demonstration 3, isolating MC-3.
4. **Mastery gate**: require a correct piecewise Green's-function construction with the jump
   condition, a correct superposition-integral solution matching a known closed-form answer, and a
   correct explanation of why changing boundary conditions changes $G$, at the Blueprint's own
   stated MAMR of 4/5.

## Tutor Actions
- Never accept a Green's function proposed as a single smooth formula across the whole interval.
- Never accept a claim that finding $G$ alone already solves the general nonhomogeneous equation.
- Never accept a claim that $G$ depends only on the operator, independent of boundary conditions.

## Voice Teaching Notes
- Say "does this need to be found piecewise, with a jump at the source point?" whenever a Green's
  function is constructed.
- Ask "have you integrated against the actual source, or does G alone already answer this?"
  whenever a nonhomogeneous equation is solved via Green's functions.

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly constructs a piecewise Green's function with the
  correct continuity and jump conditions.
- **Rung 2 (application)**: learner correctly applies the superposition integral to solve a
  nonhomogeneous equation for a given source, verified against a known solution.
- **Rung 3 (transfer)**: learner correctly identifies that a change in boundary conditions or
  interval requires a genuinely different Green's function, even for the same operator.

## Tutor Recovery Strategy
- If MC-1 recurs, re-walk the piecewise construction and jump condition.
- If MC-2 recurs, re-walk the superposition-integral verification.
- If MC-3 recurs, re-walk the mixed-boundary-condition contrast.

## Memory Hooks
- "The Green's function has a kink at the source point — never smooth throughout."
- "G alone answers one question; integrating G against f answers the real one."
- "G belongs to operator plus boundary conditions together — never the operator alone."

## Transfer Connections
- `math.de.poisson-equation` (already authored, this campaign, Batch 168): supplies the
  nonhomogeneous-equation framing and its own orientation-level preview of the point-source-then-
  superpose strategy this concept develops in full.
- `math.de.ivp` (already authored): supplies the simultaneous-condition-solving technique this
  concept's piecewise construction directly reuses (continuity plus jump conditions solved
  together).
- `math.fnal.distributions` (not yet authored): the KG's declared cross-link, the rigorous theory
  of the Dirac delta this concept's LO3 flags but defers.

## Cross-Subject Connections
- Physics/engineering: beam deflection under a distributed load, electrostatic potential from a
  point charge, impulse response in signal processing.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.de.greens-function.md`, reused by reference
  for its full $[0,1]$ piecewise Green's-function construction, its superposition-integral
  verification, its mixed-boundary-condition contrast, and its three-misconception registry
  (severity levels adopted directly as declared).
- Transfer probe: the Blueprint's own independence-mode probe, applying the same construction and
  superposition logic to a beam-deflection problem on $[0,2]$ with a different interval.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires
  `math.de.poisson-equation`/`math.de.ivp`, unlocks none, cross_links `math.fnal.distributions`,
  research/analyze, mastery_threshold 0.7, estimated_hours 9) was directly verified against the
  live KG and matches exactly. `math.de.ivp`'s authorship was independently re-verified directly
  against the EDUCATIONAL-BRAIN corpus and confirmed genuinely authored (satisfying the `requires`
  dependency). `math.fnal.distributions`'s authorship was independently re-verified and confirmed
  still unauthored — the Blueprint's independence-mode deferral remains correct. This entry,
  together with `math.de.chaos` authored earlier this same batch, closes `math.de`'s entire
  currently-reachable frontier for this campaign.

## Version History
- 2026-09-19 (Batch 169): authored. Second entry this batch, closing `math.de`'s currently-
  reachable frontier. Companion batch concept: `math.de.chaos`.
