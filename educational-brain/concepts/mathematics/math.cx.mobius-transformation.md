# math.cx.mobius-transformation

## Identity
- **KG id**: `math.cx.mobius-transformation`
- **Domain**: math.cx
- **Requires**: `math.cx.conformal-mapping`
- **Unlocks**: none
- **Cross-links**: none
- **Difficulty**: expert
- **Bloom level**: apply
- **Mastery threshold**: 0.8
- **Estimated hours**: 6

## Learning Objective
Recognize composition of Möbius transformations as DIRECT MATRIX MULTIPLICATION — NEVER lacking a
systematic formula; recognize EXACTLY THREE prescribed points determine a Möbius transformation —
NEVER two (underdetermined) or four (overdetermined); and recognize circle-and-line preservation
as covering BOTH circles AND lines as "generalized circles" — NEVER circles only.

## Core Understanding
COMPOSITION IS DIRECT MATRIX MULTIPLICATION — NEVER LACKING A SYSTEMATIC FORMULA: for
$f(z)=(z+1)/(z-1)$ and $g(z)=2z/(z+3)$: computing $(g\circ f)(z)$ algebraically gives
$(z+1)/(2z-1)$. The MATRIX product $\begin{pmatrix}2&0\\1&3\end{pmatrix}\begin{pmatrix}1&1\\1&-1
\end{pmatrix}=\begin{pmatrix}2&2\\4&-2\end{pmatrix}$ gives EXACTLY the same transformation
$(2z+2)/(4z-2)=(z+1)/(2z-1)$. Believing there is no systematic algebraic formula for composing
Möbius transformations is WRONG — the matrix-multiplication correspondence makes composition a
direct, mechanical $2\times2$ matrix product, faster and less error-prone than algebraic
substitution.

EXACTLY THREE PRESCRIBED POINTS DETERMINE THE TRANSFORMATION — NEVER TWO OR FOUR: a Möbius
transformation $(a:b:c:d)$ modulo scalar has exactly 3 complex degrees of freedom; each point
condition $f(z_i)=w_i$ imposes exactly ONE complex constraint. For $f(0)=1$, $f(1)=0$,
$f(\infty)=\infty$: solving directly gives the UNIQUE transformation $f(z)=1-z$. Believing a
Möbius transformation is determined by two points (underdetermined) or requires four points
(overdetermined) is WRONG — exactly three free parameters require exactly three prescribed image
points to pin down a unique transformation, no more and no less.

CIRCLE-AND-LINE PRESERVATION COVERS BOTH AS GENERALIZED CIRCLES — NEVER CIRCLES ONLY: for
$f(z)=(z-i)/(z+i)$ applied to the unit circle $|z|=1$: three points $1,-1,i$ map to $-i,i,0$ — all
lying on the IMAGINARY AXIS (a LINE, not a circle). Believing circle-and-line preservation means
Möbius transformations always send circles to circles (never lines) is WRONG — on the Riemann
sphere, lines ARE "circles through $\infty$"; the theorem is symmetric between circles and lines,
and a circle can genuinely map to a line (as here, since $|z|=1$ passes through the point that
maps near $\infty$'s behavior on the extended plane).

## Mental Models
- **"Möbius composition is just matrix multiplication in disguise — identify the 2x2 matrices,
  multiply, read off the answer."**
- **"Three complex degrees of freedom need exactly three point conditions — never two, never
  four."**
- **"On the Riemann sphere, lines are circles through infinity — 'circle-and-line preservation' is
  really one unified 'generalized-circle preservation' law."**

## Why Students Fail

### MC-1: MOBIUS-COMPOSITION-NOT-SYSTEMATIC
- **Surface form**: believes there is no systematic algebraic formula for composing Möbius
  transformations, missing the matrix-multiplication correspondence.
- **Birth type**: foundational (Blueprint's own declared severity — the rational-function form of
  a Möbius transformation obscures its underlying linear-algebraic structure).
- **Repair**: re-walk the matrix-multiplication computation matching the algebraic composition.

### MC-2: MOBIUS-DETERMINED-BY-TWO-OR-FOUR-POINTS
- **Surface form**: believes a Möbius transformation is determined by two points or requires four
  points, missing the exact count of three free parameters.
- **Birth type**: foundational (Blueprint's own declared severity — without counting degrees of
  freedom explicitly, "how many points" has no obvious anchor).
- **Repair**: re-derive the degree-of-freedom count and re-walk the three-point solution for
  $f(z)=1-z$.

### MC-3: CIRCLE-PRESERVATION-MEANS-CIRCLES-ONLY
- **Surface form**: believes circle-and-line preservation means Möbius transformations always send
  circles to circles (not lines), missing the unified Riemann sphere perspective.
- **Birth type**: moderate severity (Blueprint's own declared severity — "circle" in everyday
  usage excludes lines, obscuring the generalized-circle unification).
- **Repair**: re-walk the unit-circle-to-imaginary-axis mapping under the Cayley map.

## Misconceptions

### MC-1: MOBIUS-COMPOSITION-NOT-SYSTEMATIC
- **Surface form**: as described above.
- **Root cause (foundational)**: as described above.
- **Repair**: as described above.

### MC-2: MOBIUS-DETERMINED-BY-TWO-OR-FOUR-POINTS
- **Surface form**: as described above.
- **Root cause (foundational)**: as described above.
- **Repair**: as described above.

### MC-3: CIRCLE-PRESERVATION-MEANS-CIRCLES-ONLY
- **Surface form**: as described above.
- **Root cause (moderate severity)**: as described above.
- **Repair**: as described above.

## Analogies
- **"Möbius transformations are secretly 2x2 matrices wearing a rational-function disguise —
  strip off the disguise and composition, inversion, and structure all become ordinary linear
  algebra."**
- **Anti-analogy**: on the Riemann sphere a line isn't a lesser cousin of a circle needing separate
  treatment — it IS a circle, just one that happens to pass through the point at infinity.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: the algebraic-versus-matrix-multiplication composition
  match.
- **Demonstration 2 (targets MC-2)**: the three-point-normalization derivation of $f(z)=1-z$.
- **Demonstration 3 (targets MC-3)**: the unit-circle-to-imaginary-axis Cayley-map computation.

## Discovery Questions
1. "Is the composition of two Möbius transformations always a Möbius transformation, and how do
   you compute it?"
2. "How many points does it take to uniquely determine a Möbius transformation, and why not two
   or four?"
3. "Does circle-and-line preservation mean Möbius transformations always send circles to circles,
   never to lines?"

## Teaching Sequence
1. **Representation shift**: work the matrix-multiplication composition computation, isolating
   MC-1.
2. **Contrast pair**: work the circle-to-line Cayley-map example, isolating MC-3.
3. **Deductive**: work the three-point normalization and cross-ratio derivation, isolating MC-2.
4. **Mastery gate**: require a correct inverse computation verified via both formula and matrix,
   a correct image classification of a line under a given transformation, a correct three-point
   construction, and a correct involution-constraint derivation, at the Blueprint's own stated
   MAMR of 4/5.

## Tutor Actions
- Never accept Möbius composition computed only by algebraic substitution without the matrix
  correspondence being available.
- Never accept a claim that two or four points determine a Möbius transformation.
- Never accept circle-and-line preservation described as covering circles only.

## Voice Teaching Notes
- Say "what are the matrices for those two transformations?" whenever a Möbius composition is
  being computed.
- Ask "is that a circle, or could it be a line?" whenever a Möbius transformation's image of a
  generalized circle is discussed.

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly computes a Möbius transformation's inverse via both
  the formula and matrix inversion.
- **Rung 2 (application)**: learner correctly finds the image of a circle or line under a given
  Möbius transformation.
- **Rung 3 (transfer)**: learner correctly explains why prescribing three boundary points
  uniquely determines a disc automorphism despite the formula having only two parameters, and
  identifies the group structure of the Poincaré disk's isometry group.

## Tutor Recovery Strategy
- If MC-1 recurs, re-walk the matrix-multiplication computation.
- If MC-2 recurs, re-derive the degree-of-freedom count.
- If MC-3 recurs, re-walk the circle-to-line Cayley-map example.

## Memory Hooks
- "Möbius composition is matrix multiplication — never lacking a formula."
- "Exactly three points determine the map — never two, never four."
- "Lines are circles through infinity — never excluded from circle preservation."

## Transfer Connections
- `math.cx.conformal-mapping` (prerequisite, already authored, this campaign): supplies the
  conformal/biholomorphic-map foundation Möbius transformations specialize as the conformal
  automorphisms of the Riemann sphere.

## Cross-Subject Connections
- Hyperbolic geometry: the Poincaré disk model's isometry group is exactly the automorphism group
  of the unit disk under Möbius transformations, directly applying this concept's group structure
  and three-point normalization.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.cx.mobius-transformation.md`, reused by
  reference for its three worked examples and its three-misconception registry (birth types
  adopted directly as declared).
- Transfer probe: the Blueprint's own independence-mode probe on disc automorphisms, Blaschke
  factors, and the Poincaré disk's isometry group structure.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires
  `math.cx.conformal-mapping`, unlocks none, cross_links none, expert/apply, mastery_threshold
  0.8, estimated_hours 6) was directly verified against the live KG and matches exactly.

## Version History
- 2026-09-20 (Batch 250): authored. First entry this batch. Companion batch concept:
  `math.cx.riemann-mapping`.
