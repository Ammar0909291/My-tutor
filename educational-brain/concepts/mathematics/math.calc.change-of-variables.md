# math.calc.change-of-variables

## Identity
- **KG id**: `math.calc.change-of-variables`
- **Domain**: math.calc
- **Requires**: `math.calc.multiple-integrals`, `math.linalg.determinant`
- **Unlocks**: none
- **Cross-links**: none
- **Difficulty**: expert
- **Bloom level**: apply
- **Mastery threshold**: 0.7
- **Estimated hours**: 8

## Learning Objective
Compute the Jacobian determinant $\frac{\partial(x,y)}{\partial(u,v)}=\det\begin{pmatrix}\partial x/\partial u&\partial x/\partial v\\\partial y/\partial u&\partial y/\partial v\end{pmatrix}$
for a substitution $(x,y)=T(u,v)$, reusing `math.linalg.determinant`'s own $2\times2$ formula
directly; apply the change-of-variables formula $\iint f\,dA=\iint f(T(u,v))\left|\frac{\partial(x,y)}{\partial(u,v)}\right|du\,dv$,
taking the ABSOLUTE VALUE of the Jacobian; and recognize the Jacobian's magnitude as the LOCAL
area-scaling factor of the transformation, extending `math.linalg.determinant`'s own scaling-factor
interpretation from a global (linear) statement to a pointwise (possibly nonlinear) one.

## Core Understanding
The change of variables technique generalizes single-variable $u$-substitution to multiple
integrals, reusing `math.calc.multiple-integrals`'s own iterated-integral machinery as the object
being transformed. For a substitution $(x,y)=T(u,v)$, the **Jacobian determinant** is
$\frac{\partial(x,y)}{\partial(u,v)}=\det\begin{pmatrix}\partial x/\partial u&\partial x/\partial v\\\partial y/\partial u&\partial y/\partial v\end{pmatrix}$
— computed exactly as an ordinary $2\times2$ determinant (`math.linalg.determinant`'s own $ad-bc$
formula), but with partial-derivative entries rather than plain numbers. The matrix must be set up
with a CONSISTENT convention — rows are the output variables $x,y$, columns are the input variables
$u,v$ — for the determinant to correctly represent the transformation.

The change-of-variables formula is $\iint_R f(x,y)\,dA=\iint_{R'} f(T(u,v))\left|\frac{\partial(x,y)}{\partial(u,v)}\right|du\,dv$
— the ABSOLUTE VALUE of the Jacobian is essential, never optional. A negative Jacobian indicates
the transformation reverses orientation, but AREA itself is never negative, so taking the absolute
value correctly produces a genuine, positive area-scaling factor regardless of orientation.

Geometrically, the Jacobian determinant's MAGNITUDE is the LOCAL area-scaling factor: if
$\left|\frac{\partial(x,y)}{\partial(u,v)}\right|=2$ at some point, a tiny region near that point
in $u,v$-space gets stretched to twice its area when mapped by $T$ into $x,y$-space — the exact
same "determinant as scaling factor" interpretation from `math.linalg.determinant`, now applied
POINTWISE to a possibly non-linear transformation rather than uniformly across all of space. For a
linear transformation, the Jacobian is CONSTANT everywhere, recovering `math.linalg.determinant`'s
original global-scaling-factor statement as a special case.

## Mental Models
- **"The Jacobian is an ordinary $2\times2$ determinant — the entries just happen to be partial
  derivatives instead of plain numbers."**
- **"Absolute value is not optional — area can never be negative, whatever the Jacobian's sign
  says about orientation."**
- **"The Jacobian is `math.linalg.determinant`'s scaling factor, applied pointwise instead of
  globally."**

## Why Students Fail

### MC-1: JACOBIAN-MATRIX-ROWS-AND-COLUMNS-SET-UP-INCONSISTENTLY
- **Surface form**: sets up the Jacobian matrix with mismatched or inconsistent row/column
  conventions (e.g. mixing which partial derivatives go in which row), producing an incorrect
  determinant.
- **Frequency band**: Foundational (Blueprint's own declared severity).
- **Root cause (Type 4, notation-induced)**: the matrix's entries are all partial derivatives that
  look structurally similar to each other, so without deliberately fixing "rows = outputs $x,y$,
  columns = inputs $u,v$" as a rule, the four entries are easy to place inconsistently.
- **Repair**: re-build the matrix explicitly with output variables as rows and input variables as
  columns, verified against a known result (e.g. recovering the familiar polar-coordinates factor
  $r$).

### MC-2: JACOBIAN-SIGNED-VALUE-USED-INSTEAD-OF-ABSOLUTE-VALUE-IN-THE-FORMULA
- **Surface form**: uses the Jacobian's signed value directly in the change-of-variables formula,
  rather than its required absolute value — potentially introducing a negative contribution to
  what should be a purely positive area/volume computation.
- **Frequency band**: Foundational (Blueprint's own declared severity).
- **Root cause (Type 1, overgeneralization)**: the Jacobian is genuinely a signed quantity (its
  sign correctly encodes orientation in other contexts), so carrying that sign forward into the
  integral formula feels like preserving information rather than discarding it — the specific
  requirement that AREA itself is never negative is a separate fact that must be actively applied.
- **Repair**: re-state the formula explicitly with the absolute-value bars, connecting to why area
  must be non-negative regardless of the transformation's orientation.

### MC-3: LOCAL-SCALING-FACTOR-ASSUMED-CONSTANT
- **Surface form**: after computing the Jacobian at one point, assumes the same value applies
  uniformly across the entire region, missing that for a NONLINEAR transformation the Jacobian
  varies from point to point.
- **Frequency band**: Moderate (independently classified; the Blueprint's own registry covers only
  MC-1/MC-2, but this distinction is essential to LO3's own local-vs-global claim).
- **Root cause (Type 6, analogy overextension)**: `math.linalg.determinant`'s own linear-map
  scaling factor is genuinely CONSTANT everywhere (a single number describes the whole
  transformation), and that global-constancy property is overextended onto the Jacobian, which is
  only constant for LINEAR substitutions.
- **Repair**: contrast a linear substitution (constant Jacobian everywhere, e.g. $x=2u,y=3v$) with
  a nonlinear one (polar coordinates, Jacobian $=r$, genuinely varying with position), showing the
  Jacobian must be evaluated at each point separately for a nonlinear map.

## Misconceptions

### MC-1: JACOBIAN-MATRIX-ROWS-AND-COLUMNS-SET-UP-INCONSISTENTLY
- **Surface form**: as described above.
- **Root cause (Type 4)**: as described above.
- **Repair**: as described above.

### MC-2: JACOBIAN-SIGNED-VALUE-USED-INSTEAD-OF-ABSOLUTE-VALUE-IN-THE-FORMULA
- **Surface form**: as described above.
- **Root cause (Type 1)**: as described above.
- **Repair**: as described above.

### MC-3: LOCAL-SCALING-FACTOR-ASSUMED-CONSTANT
- **Surface form**: as described above.
- **Root cause (Type 6)**: as described above.
- **Repair**: as described above.

## Analogies
- **"A local currency exchange rate that varies by neighborhood: the Jacobian tells you the
  'exchange rate' between $u,v$-area and $x,y$-area at THAT specific point, not a single rate for
  the whole map."**
- **Anti-analogy**: the Jacobian is NOT "just a bigger version of ordinary $u$-substitution's
  $du=g'(x)dx$ factor kept as a signed number" — the absolute value requirement genuinely changes
  behavior relative to the single-variable case, where the sign of $g'(x)$ is folded into the
  limits of integration instead.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: for polar coordinates $x=r\cos\theta$, $y=r\sin\theta$,
  build the Jacobian matrix with $x,y$ as rows and $r,\theta$ as columns, computing
  $\det=r\cos^2\theta+r\sin^2\theta=r$ — the familiar polar factor, derived rigorously.
- **Demonstration 2 (targets MC-2)**: for a substitution whose Jacobian works out to $-3$ at some
  point, use $|-3|=3$ as the scaling factor in the formula, explicitly contrasting against the
  incorrect use of $-3$ directly.
- **Demonstration 3 (targets MC-3)**: contrast $x=2u,y=3v$ (constant Jacobian $=6$ everywhere)
  against polar coordinates (Jacobian $=r$, varying with position), showing the constant case is
  the exception, not the rule.

## Discovery Questions
1. "If the Jacobian works out to a negative number at some point, what should the actual
   area-scaling factor be?"
2. "For a nonlinear substitution, is the Jacobian the same everywhere, or does it depend on which
   point you evaluate it at?"
3. "How does building the Jacobian matrix here compare to building an ordinary $2\times2$ matrix
   from `math.linalg.determinant`?"

## Teaching Sequence
1. **Anchor**: connect to `math.calc.multiple-integrals`'s own iterated-integral structure and
   `math.linalg.determinant`'s $2\times2$ formula, framing the Jacobian as that same determinant
   with partial-derivative entries.
2. **Conflict evidence**: the polar-coordinates Jacobian computation, breaking MC-1 directly by
   requiring a consistent row/column setup.
3. **Contrast pair**: the correct absolute-value usage against the incorrect signed usage, plus the
   constant-vs-varying Jacobian contrast — isolating MC-2 and MC-3.
4. **Mastery gate**: require a Jacobian computation, an absolute-value judgment, and a
   local-vs-global scaling-factor distinction under transfer, at the Blueprint's own stated MAMR
   of 4/5.

## Tutor Actions
- Never accept a Jacobian matrix without confirming the row/column convention is consistent.
- When a negative Jacobian is computed, require the learner to state the absolute value before
  using it in the integral formula.

## Voice Teaching Notes
- Say "which convention are outputs and which are inputs?" whenever a learner sets up the Jacobian
  matrix.
- When a Jacobian is computed once, ask "does this value apply everywhere, or just at this point?"

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly computes a Jacobian determinant for a given
  substitution using the consistent row/column convention.
- **Rung 2 (application)**: learner correctly applies the change-of-variables formula, taking the
  absolute value of the Jacobian.
- **Rung 3 (transfer)**: learner correctly explains, in a novel context (e.g. image-warping pixel
  redistribution), why the Jacobian's magnitude is the local area-scaling factor and why the
  absolute value matters even where orientation flips.

## Tutor Recovery Strategy
- If MC-1 recurs, re-build the Jacobian matrix explicitly with the consistent convention for the
  specific substitution in question.
- If MC-2 recurs, re-state the formula with the absolute-value bars for the specific computed
  Jacobian in question.
- If MC-3 recurs, re-contrast the constant-Jacobian linear case against the varying-Jacobian
  nonlinear case in question.

## Memory Hooks
- "The Jacobian is a determinant wearing partial derivatives."
- "Absolute value, always — area is never negative."
- "Local scaling factor: evaluate at the point, don't assume it's constant."

## Transfer Connections
- `math.calc.multiple-integrals` (already authored, this campaign): supplies the iterated-integral
  structure being transformed by the substitution.
- `math.linalg.determinant` (already authored, this campaign): supplies the $2\times2$ determinant
  formula and the scaling-factor interpretation the Jacobian extends pointwise.

## Cross-Subject Connections
- None formal.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.calc.change-of-variables.md`, reused by
  reference for its polar-coordinates worked example, its absolute-value contrast pair, its
  linear-substitution scaling-factor example, and its two-misconception registry (birth types
  independently classified for MC-1/MC-2, since this Blueprint states severity but not birth type;
  MC-3 added independently to cover LO3's local-vs-global distinction, not present in the
  Blueprint's own registry).
- Transfer probe cited by reference: the Blueprint's own independence-mode probe (an image-warping
  pixel-brightness-redistribution scenario, explaining the Jacobian's role and the absolute-value
  requirement).

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires
  `multiple-integrals`/`determinant`, unlocks none, cross_links none, expert/apply,
  mastery_threshold 0.7, estimated_hours 8) was directly verified against the live KG and matches
  exactly.

## Version History
- 2026-09-13 (Batch 75): authored. Unblocked by `math.linalg.determinant` (Batch 74). **This
  concept was math.calc's FINAL remaining concept — authoring it CLOSES the domain to 76/76,
  DOMAIN CERTIFIED, the tenth mathematics domain.** Companion batch concepts:
  `math.linalg.eigenvalues`, `math.linalg.unit-vector`, `math.linalg.cross-product`.
