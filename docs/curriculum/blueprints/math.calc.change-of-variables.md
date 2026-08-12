# Teaching Blueprint: Change of Variables (Jacobian) (`math.calc.change-of-variables`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.calc.change-of-variables` |
| name | Change of Variables (Jacobian) |
| domain | Calculus |
| difficulty | expert |
| bloom | apply |
| mastery_threshold | 0.70 → MAMR = ⌈0.70×5⌉ = 4/5 |
| estimated_hours | 8 |
| requires | `math.calc.multiple-integrals`, `math.linalg.determinant` |
| unlocks | (none in KG) |
| cross_links | (none) |
| CPA_entry_stage | A (Abstract) |
| description (KG) | For the substitution (x,y) = T(u,v): ∬ f dA = ∬ f(T(u,v))|∂(x,y)/∂(u,v)| du dv; the Jacobian determinant is the scaling factor.

 |

## Component 1 — Learning Objectives

- LO1: Compute the JACOBIAN DETERMINANT $\frac{\partial(x,y)}{\partial(u,v)}=\det\begin{pmatrix}\partial x/\partial u&\partial x/\partial v\\\partial y/\partial u&\partial y/\partial v\end{pmatrix}$ for a substitution $(x,y)=T(u,v)$, using `math.linalg.determinant`.
- LO2: Apply the change-of-variables formula $\iint f\,dA=\iint f(T(u,v))\left|\frac{\partial(x,y)}{\partial(u,v)}\right|du\,dv$ — taking the ABSOLUTE VALUE of the Jacobian determinant (a NEGATIVE determinant would represent an orientation-reversing transformation, but AREA is always positive, so the absolute value is essential, never optional).
- LO3: Recognize the Jacobian determinant as the LOCAL SCALING FACTOR for area (or volume) under the transformation $T$ — a Jacobian of magnitude 2 means the transformation locally DOUBLES area near that point, connecting this concept to `math.linalg.determinant`'s geometric meaning as a scaling factor.

## Component 2 — Prerequisite Check

Assumes mastery of `math.calc.multiple-integrals` (the integrals being transformed) and `math.linalg.determinant` (needed to compute the Jacobian and understand its scaling-factor interpretation).

## Component 3 — Core Explanation

The **change of variables** technique generalizes single-variable $u$-substitution to multiple integrals. For a substitution $(x,y)=T(u,v)$ (mapping $u,v$-space to $x,y$-space), the **Jacobian determinant** is $\frac{\partial(x,y)}{\partial(u,v)}=\det\begin{pmatrix}\partial x/\partial u&\partial x/\partial v\\\partial y/\partial u&\partial y/\partial v\end{pmatrix}$ — computed exactly as an ordinary $2\times2$ determinant (from `math.linalg.determinant`), but with partial-derivative entries.

The change-of-variables formula is $\iint_Rf(x,y)\,dA=\iint_{R'}f(T(u,v))\left|\frac{\partial(x,y)}{\partial(u,v)}\right|du\,dv$ — the ABSOLUTE VALUE of the Jacobian is essential: a negative determinant indicates the transformation reverses orientation, but AREA itself is never negative, so taking the absolute value correctly produces a genuine, positive area-scaling factor regardless of orientation.

Geometrically, the Jacobian determinant's MAGNITUDE is the local area-scaling factor: if $\left|\frac{\partial(x,y)}{\partial(u,v)}\right|=2$ at some point, a tiny region near that point in $u,v$-space gets STRETCHED to twice its area when mapped by $T$ into $x,y$-space — the exact same "determinant as scaling factor" interpretation from `math.linalg.determinant`, now applied LOCALLY (pointwise) to a possibly non-linear transformation.

## Component 4 — Worked Examples

**Example 1 (LO1 — computing the Jacobian, breaking MC-1)**: For polar coordinates $x=r\cos\theta$, $y=r\sin\theta$, compute the Jacobian $\frac{\partial(x,y)}{\partial(r,\theta)}$. $\frac{\partial x}{\partial r}=\cos\theta$, $\frac{\partial x}{\partial\theta}=-r\sin\theta$, $\frac{\partial y}{\partial r}=\sin\theta$, $\frac{\partial y}{\partial\theta}=r\cos\theta$. $\det\begin{pmatrix}\cos\theta&-r\sin\theta\\\sin\theta&r\cos\theta\end{pmatrix}=r\cos^2\theta+r\sin^2\theta=r$ — the FAMILIAR polar-coordinates $r$ factor, now derived rigorously as a Jacobian determinant rather than assumed. A common error sets up the Jacobian MATRIX with rows and columns transposed or mismatched (e.g. putting $\partial x/\partial r$ and $\partial y/\partial r$ in the SAME column instead of properly organizing $x$'s partials in one row and $y$'s in another) — the matrix must be set up with a CONSISTENT convention (rows = output variables $x,y$; columns = input variables $u,v$) for the determinant to correctly represent the transformation.

**Example 2 (LO2 — absolute value requirement, breaking MC-2)**: For a substitution whose Jacobian works out to $-3$ at some point, the change-of-variables formula uses $|-3|=3$ as the scaling factor, NOT $-3$. A common error uses the Jacobian's SIGNED value directly in the integral formula (without taking the absolute value), potentially introducing an incorrect NEGATIVE contribution to what should be a purely positive area/volume computation — the sign of the Jacobian reflects orientation (a genuinely meaningful concept in some contexts), but the area SCALING FACTOR itself must always be non-negative.

**Example 3 (LO3 — Jacobian as local scaling factor)**: For the transformation $x=2u$, $y=3v$ (a simple linear stretch), the Jacobian is $\det\begin{pmatrix}2&0\\0&3\end{pmatrix}=6$ — CONSTANT everywhere (since the transformation is linear), meaning EVERY region in $u,v$-space gets its area multiplied by exactly 6 when mapped into $x,y$-space; this matches directly with `math.linalg.determinant`'s interpretation of a linear transformation's determinant as its GLOBAL area-scaling factor, here recovered as a special (constant) case of the more general, pointwise Jacobian.

## Component 5 — Teaching Actions

### Teaching Action A01 — Setting Up the Jacobian Matrix with a Consistent Row/Column Convention (Primitive P64: Conceptual Shift)

Work Example 1, explicitly organizing the matrix with output variables as rows and input variables as columns.

- **MC-1 hook**: check whether the Jacobian matrix is set up consistently.

### Teaching Action A02 — Absolute Value Is Mandatory in the Change-of-Variables Formula (Primitive P06: Contrast Pair)

Work Example 2, contrasting the correct absolute-value usage against the incorrect signed usage.

- **MC-2 hook**: this directly targets MC-2 (using the Jacobian's signed value instead of its absolute value).

### Teaching Action A03 — Jacobian as the Local (or Global, for Linear Maps) Scaling Factor (Primitive P11: Representation Shift)

Work Example 3, explicitly connecting the Jacobian's constant value here to `math.linalg.determinant`'s scaling-factor interpretation for linear transformations.

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78. MAMR = ⌈0.70×5⌉ = 4/5.

- **P77 (4-problem set)**:
  1. Compute the Jacobian $\frac{\partial(x,y)}{\partial(u,v)}$ for $x=u+v$, $y=u-v$.
  2. Given a Jacobian of $-5$ at a point, state the correct scaling factor to use in the change-of-variables formula.
  3. For the linear transformation $x=4u$, $y=u+v$, compute the Jacobian and interpret it as an area-scaling factor.
  4. Explain, in one sentence, why the absolute value of the Jacobian is used in the change-of-variables formula, even though the Jacobian itself can be negative.
- **P76 (Transfer Probe, mode = independence)**: "An image-processing algorithm applies a nonlinear geometric warp $T(u,v)=(x,y)$ to a photograph (e.g. correcting for lens distortion), and needs to know how much a small region's AREA changes at each point after the warp, to correctly redistribute pixel brightness values. (a) Explain how the Jacobian determinant of $T$ at a given point answers exactly this question. (b) Explain why the algorithm must use the ABSOLUTE VALUE of the Jacobian for this brightness-redistribution purpose, even in regions where the warp happens to flip orientation (producing a negative Jacobian there)."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 4/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed misconception's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | JACOBIAN-MATRIX-ROWS-AND-COLUMNS-SET-UP-INCONSISTENTLY | Setting up the Jacobian matrix with mismatched or inconsistent row/column conventions, producing an incorrect determinant | Foundational |
| MC-2 | JACOBIAN-SIGNED-VALUE-USED-INSTEAD-OF-ABSOLUTE-VALUE-IN-THE-FORMULA | Using the Jacobian's signed value directly in the change-of-variables formula, rather than its required absolute value | Foundational |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 ("Jacobian Matrix Rows and Columns Set Up Inconsistently") → P41 (detect: present Example 1 and check whether the matrix rows/columns are set up consistently) → P64 (conceptual shift: re-build the matrix explicitly with output variables as rows and input variables as columns, verified against the known polar-coordinates result).
- **B02 (targets MC-2)**: P27 ("Jacobian Signed Value Used Instead of Absolute Value in the Formula") → P41 (detect: present Example 2 and check whether the signed value is (incorrectly) used) → P64 (conceptual shift: re-state the formula explicitly with the absolute-value bars, connecting to why area must be non-negative).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.calc.multiple-integrals`, `math.linalg.determinant`.
- **Unlocks**: none recorded in the KG.

## Component 8 — Teaching Notes

- difficulty = expert and estimated_hours = 8 reflect that this concept genuinely synthesizes multivariable calculus and linear algebra (the determinant) into a single powerful technique.
- Both misconceptions were ranked Foundational because each produces a numerically wrong scaling factor, corrupting the entire transformed integral.
- The image-warping transfer probe was deliberately chosen because pixel-area redistribution under a geometric transformation is a genuinely concrete, verifiable application of the Jacobian's scaling-factor role, distinct from a purely abstract exercise.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (`math.calc.multiple-integrals`, `math.linalg.determinant`) |
| V-4 | unlocks concepts named accurately from KG | PASS (none) |
| V-5 | cross_links checked against disk | PASS (none declared) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (2 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.70×5⌉=4) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Abstract) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
