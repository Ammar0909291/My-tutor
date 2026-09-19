# math.de.phase-plane

## Identity
- **KG id**: `math.de.phase-plane`
- **Domain**: math.de
- **Requires**: `math.de.systems-ode`, `math.de.slope-field`
- **Unlocks**: `math.de.stability-analysis`
- **Cross-links**: none
- **Difficulty**: expert
- **Bloom level**: analyze
- **Mastery threshold**: 0.8
- **Estimated hours**: 7

## Learning Objective
Recognize the phase portrait of a 2D system $x'=f(x,y),y'=g(x,y)$ as `math.de.slope-field`'s own
construction GENERALIZED from one dimension to two (a VECTOR $(f,g)$ prescribing direction, never
merely a slope); find and classify EQUILIBRIA via the linearization's Jacobian eigenvalues (real
same-sign → node, real opposite-sign → saddle, complex nonzero-real-part → spiral, purely
imaginary → center), never requiring extensive direct plotting; and correctly interpret a phase
portrait's GLOBAL qualitative behavior, recognizing this reveals genuinely global structure that
NEITHER equation's own slope field (with the other variable frozen) could show separately.

## Core Understanding
THE PHASE PORTRAIT DIRECTLY GENERALIZES SLOPE-FIELD CONSTRUCTION — NEVER A GENUINELY NEW
PROCEDURE: for $x'=y,y'=-x$: evaluating the velocity vector $(f,g)=(y,-x)$ at $(1,0)$: $(0,-1)$
(down); at $(0,1)$: $(1,0)$ (right); at $(-1,0)$: $(0,1)$ (up); at $(0,-1)$: $(-1,0)$ (left) —
revealing a CLOCKWISE rotation, via the SAME grid-evaluation procedure `math.de.slope-field`
established, now applied to a vector rather than a scalar.

EQUILIBRIUM TYPE IS READ DIRECTLY FROM THE LINEARIZATION'S EIGENVALUES — NEVER REQUIRING EXTENSIVE
PLOTTING: for $x'=x-y,y'=x+y$: the only equilibrium is $(0,0)$. Since the system is already
linear, $J=\begin{pmatrix}1&-1\\1&1\end{pmatrix}$ everywhere; solving
$\det(J-\lambda I)=(1-\lambda)^2+1=0$ gives $\lambda=1\pm i$ — COMPLEX with POSITIVE real part —
IMMEDIATELY classifying the origin as an outward SPIRAL, with zero need to solve the system
explicitly or plot extensive trajectories.

PHASE-PLANE ANALYSIS REVEALS GLOBAL BEHAVIOR NEITHER SLOPE FIELD ALONE COULD SHOW — NEVER
EQUIVALENT TO EXAMINING EACH EQUATION SEPARATELY: for a predator-prey-style system with a saddle
at $(0,0)$ (extinction unstable) and a center or spiral at a positive $(x^*,y^*)$: the FULL phase
portrait reveals trajectories near $(0,0)$ repelled away while others ORBIT around $(x^*,y^*)$ —
genuinely global structure invisible to either the $x$-equation's slope field (with $y$ frozen)
or the $y$-equation's alone, since each discards the OTHER variable's simultaneous evolution.

## Mental Models
- **"The phase portrait is the slope field's own construction, generalized — evaluate a vector
  instead of a slope, at each point in a plane of two coupled variables."**
- **"An equilibrium's type is read directly off the linearization's eigenvalues — no need to plot
  your way to an answer the algebra already gives you."**

## Why Students Fail

### MC-1: PHASE-PORTRAIT-ASSUMED-GENUINELY-NEW-PROCEDURE
- **Surface form**: believes constructing a phase portrait is a genuinely new procedure, missing
  that it directly generalizes the slope-field construction to a vector-valued quantity.
- **Birth type**: Foundational severity (Blueprint's own declared severity — moving from a single
  equation to a system of two feels like a categorically different task).
- **Repair**: re-walk the direct vector-evaluation parallel for $x'=y,y'=-x$.

### MC-2: EQUILIBRIUM-CLASSIFICATION-ASSUMED-TO-REQUIRE-EXTENSIVE-PLOTTING
- **Surface form**: believes classifying an equilibrium's type requires extensive direct plotting
  of nearby trajectories.
- **Birth type**: High severity (Blueprint's own declared severity — the phase portrait's visual
  nature makes plotting feel like the "real" way to determine behavior, obscuring the direct
  algebraic shortcut).
- **Repair**: re-walk the direct eigenvalue-based classification for $x'=x-y,y'=x+y$.

### MC-3: SEPARATE-SLOPE-FIELDS-ASSUMED-EQUIVALENT-TO-PHASE-PORTRAIT
- **Surface form**: believes examining each equation's own slope field separately reveals the same
  global qualitative structure as the full phase portrait.
- **Birth type**: Moderate severity (Blueprint's own declared severity — each individual equation
  looks like it should carry its own complete picture).
- **Repair**: re-walk the predator-prey saddle-at-extinction/center-at-coexistence global picture,
  showing it's invisible to either frozen-variable slope field alone.

## Misconceptions

### MC-1: PHASE-PORTRAIT-ASSUMED-GENUINELY-NEW-PROCEDURE
- **Surface form**: as described above.
- **Root cause (Foundational)**: as described above.
- **Repair**: as described above.

### MC-2: EQUILIBRIUM-CLASSIFICATION-ASSUMED-TO-REQUIRE-EXTENSIVE-PLOTTING
- **Surface form**: as described above.
- **Root cause (High)**: as described above.
- **Repair**: as described above.

### MC-3: SEPARATE-SLOPE-FIELDS-ASSUMED-EQUIVALENT-TO-PHASE-PORTRAIT
- **Surface form**: as described above.
- **Root cause (Moderate)**: as described above.
- **Repair**: as described above.

## Analogies
- **"A phase portrait is a slope field with two hands instead of one — at every point it points
  not just up or down, but in a full 2D direction that couples both variables' fates together."**
- **Anti-analogy**: freezing one variable and reading the other's slope field alone is NOT a
  shortcut to the phase portrait's insight — it discards exactly the coupling that makes a system
  genuinely two-dimensional.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: the $x'=y,y'=-x$ rotational vector-field construction.
- **Demonstration 2 (targets MC-2)**: the $x'=x-y,y'=x+y$ direct eigenvalue-based spiral
  classification.
- **Demonstration 3 (targets MC-3)**: the predator-prey saddle/center global structure, invisible
  to either frozen-variable slope field.

## Discovery Questions
1. "Is constructing a phase portrait a genuinely new procedure, or does it generalize slope-field
   construction to a vector-valued quantity?"
2. "To classify an equilibrium's type, is extensive plotting of nearby trajectories necessary, or
   can the linearization's eigenvalues determine this directly?"
3. "Would examining each equation's own slope field separately reveal the same global structure as
   the full phase portrait?"

## Teaching Sequence
1. **Representation shift**: the direct vector-evaluation generalization, working
   Demonstration 1, isolating MC-1.
2. **Conflict evidence**: the direct eigenvalue-based classification, working Demonstration 2,
   isolating MC-2.
3. **Contrast pair**: the global-versus-separate-slope-field distinction, working Demonstration 3,
   isolating MC-3.
4. **Mastery gate**: require a correct rotational-pattern vector evaluation, a correct equilibrium
   classification via eigenvalues, and a correct explanation of why phase-plane analysis reveals
   global behavior separate slope fields cannot, at the Blueprint's own stated MAMR of 4/5.

## Tutor Actions
- Never accept phase-portrait construction described as a genuinely new procedure unrelated to
  slope fields.
- Never accept an equilibrium classified by extensive trajectory plotting instead of direct
  eigenvalue analysis.
- Never accept a claim that examining each equation's slope field separately reveals the same
  global structure as the full phase portrait.

## Voice Teaching Notes
- Say "is this a new idea, or the slope field generalized to a vector?" whenever a phase portrait
  is introduced.
- When an equilibrium's type is asked, ask "what do the linearization's eigenvalues tell you
  directly?"

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly evaluates the velocity vector at several points to
  reveal a phase portrait's local pattern.
- **Rung 2 (application)**: learner correctly finds an equilibrium and classifies its type via the
  Jacobian's eigenvalues.
- **Rung 3 (transfer)**: learner correctly interprets a nonlinear system's full phase portrait,
  identifying saddle and center/spiral behavior and explaining why this global structure requires
  the full 2D picture.

## Tutor Recovery Strategy
- If MC-1 recurs, re-walk the direct vector-evaluation parallel to slope-field construction.
- If MC-2 recurs, re-walk the direct eigenvalue-based classification.
- If MC-3 recurs, re-walk the predator-prey global-structure example.

## Memory Hooks
- "The phase portrait is the slope field with a vector instead of a slope."
- "An equilibrium's type comes straight from the linearization's eigenvalues — no need to plot
  your way there."
- "Separate slope fields discard the coupling — only the full phase plane reveals global
  behavior."

## Transfer Connections
- `math.de.systems-ode` (already authored, certified domain): supplies the eigenvalue-based
  solution method for linear systems this concept's equilibrium classification directly reuses.
- `math.de.slope-field` (already authored, this campaign, Batch 149): supplies the single-equation
  grid-evaluation construction this concept's phase portrait directly generalizes, closing its
  declared unlock.
- `math.de.stability-analysis` (not yet authored): the KG's declared unlock, formalizing the
  stability implications of each equilibrium type this concept classifies.

## Cross-Subject Connections
- None formal.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.de.phase-plane.md`, reused by reference for
  its rotational-system vector-field example, its spiral-classification example, its
  predator-prey global-structure example, and its three-misconception registry (severity levels
  adopted directly as declared).
- Transfer probe: the Blueprint's own independence-mode probe, applying phase-plane analysis to a
  control-systems engineer's feedback-loop stability question.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires
  `math.de.systems-ode`/`math.de.slope-field`, unlocks `math.de.stability-analysis`, cross_links
  none, expert/analyze, mastery_threshold 0.8, estimated_hours 7) was directly verified against
  the live KG and matches exactly.

## Version History
- 2026-09-19 (Batch 151): authored. Second entry this batch, closing
  `math.de.slope-field`'s declared unlock. Companion batch concept:
  `math.de.second-order-homogeneous`.
