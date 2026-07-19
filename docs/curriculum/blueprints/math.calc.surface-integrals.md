# Teaching Blueprint: Surface Integrals (`math.calc.surface-integrals`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.calc.surface-integrals` |
| name | Surface Integrals |
| domain | Calculus |
| difficulty | expert |
| bloom | apply |
| mastery_threshold | 0.65 → MAMR = ⌈0.65×5⌉ = 4/5 |
| estimated_hours | 10 |
| requires | `math.calc.double-integrals`, `math.calc.line-integrals` |
| unlocks | `math.calc.stokes-theorem`, `math.calc.divergence-theorem` |
| cross_links | none |
| CPA_entry_stage | A (Abstract) — expert-tier learner already fluent in both prerequisites; the surface integral is introduced directly as the two-parameter generalization fusing both |
| description (KG) | Integrals over a surface S; scalar: ∬_S f dS; vector (flux): ∬_S F·dS = ∬_S F·n dS; key for Stokes' and Gauss' theorems. |

## Component 1 — Learning Objectives

- LO1: Parametrize a surface $S$ via $\mathbf{r}(x,y)=(x,y,f(x,y))$ (or more generally $\mathbf{r}(u,v)$) and compute the **surface-area element** $dS = \|\mathbf{r}_x\times\mathbf{r}_y\|\,dx\,dy$ — directly generalizing `math.calc.line-integrals`' arc-length element $ds=\|\mathbf{r}'(t)\|\,dt$ (a single tangent vector's magnitude) to TWO tangent vectors' cross product magnitude.
- LO2: Compute a **scalar surface integral** $\iint_S f\,dS$ by substituting the parametrization and the $dS$ element, reducing to an ordinary double integral over the parameter domain $D$ — directly reusing `math.calc.double-integrals`' iterated-integral machinery, exactly paralleling `math.calc.line-integrals`' scalar case ($\int_C f\,ds$).
- LO3: Compute a **vector surface integral (flux)** $\iint_S \mathbf{F}\cdot d\mathbf{S} = \iint_D \mathbf{F}(\mathbf{r}(x,y))\cdot(\mathbf{r}_x\times\mathbf{r}_y)\,dx\,dy$ — recognizing that the vector surface element $d\mathbf{S}=(\mathbf{r}_x\times\mathbf{r}_y)\,dx\,dy$ already combines direction AND magnitude in one step (no separate unit-normal computation needed), and correctly handle **orientation**: reversing the surface's chosen normal direction flips the sign of the flux, exactly paralleling `math.calc.line-integrals`' path-reversal sign flip for vector line integrals.

## Component 2 — Prerequisite Check

Assumes mastery of `math.calc.double-integrals` (evaluating $\iint_D g\,dA$ as an iterated integral over a parameter domain $D$, including the lesson that a coordinate-conversion factor like polar's $r$ is essential, not optional) and `math.calc.line-integrals` (parametrizing a curve $\mathbf{r}(t)$; the scalar integral $\int_C f\,ds$ with $ds=\|\mathbf{r}'(t)\|\,dt$; the vector integral $\int_C\mathbf{F}\cdot d\mathbf{r}$ with $d\mathbf{r}=\mathbf{r}'(t)\,dt$ already combining direction and magnitude; and the scalar/vector distinction under path reversal).

## Component 3 — Core Explanation

**From one tangent vector to two: the surface-area element**: `math.calc.line-integrals` measured arc length along a curve using $ds=\|\mathbf{r}'(t)\|\,dt$ — the magnitude of ONE tangent vector. A surface $S$, parametrized by TWO parameters, $\mathbf{r}(x,y)=(x,y,f(x,y))$ over a domain $D$, has TWO tangent vectors at each point — $\mathbf{r}_x=\partial\mathbf{r}/\partial x$ and $\mathbf{r}_y=\partial\mathbf{r}/\partial y$ — spanning the tangent plane there. Exactly as `math.geom.vectors-3d`'s cross product produces a vector perpendicular to two given vectors with magnitude equal to the area of the parallelogram they span, $\mathbf{r}_x\times\mathbf{r}_y$ gives a normal vector to the surface whose magnitude $\|\mathbf{r}_x\times\mathbf{r}_y\|$ is exactly the local area-scaling factor — so $dS = \|\mathbf{r}_x\times\mathbf{r}_y\|\,dx\,dy$, directly generalizing $ds=\|\mathbf{r}'(t)\|\,dt$ from a single-derivative magnitude to a cross-product magnitude.

**Scalar surface integrals reuse the double-integral machinery directly**: once $dS$ is known, $\iint_S f\,dS = \iint_D f(\mathbf{r}(x,y))\,\|\mathbf{r}_x\times\mathbf{r}_y\|\,dx\,dy$ is an ordinary double integral over $D$ — every technique from `math.calc.double-integrals` (Fubini, variable bounds, even polar conversion of $D$ itself if convenient) applies unchanged from here. This exactly parallels `math.calc.line-integrals`' scalar case reducing to an ordinary single-variable integral over $t$.

**Vector surface integrals (flux): the combined element already has direction and magnitude**: exactly as `math.calc.line-integrals`' $d\mathbf{r}=\mathbf{r}'(t)\,dt$ already combined direction and magnitude (no separate unit-tangent normalization needed before dotting with $\mathbf{F}$), the vector surface element $d\mathbf{S} = (\mathbf{r}_x\times\mathbf{r}_y)\,dx\,dy$ already combines the normal DIRECTION and the area-scaling MAGNITUDE together — so $\iint_S\mathbf{F}\cdot d\mathbf{S} = \iint_D \mathbf{F}(\mathbf{r}(x,y))\cdot(\mathbf{r}_x\times\mathbf{r}_y)\,dx\,dy$ requires no intermediate step of computing the unit normal $\mathbf{n}=(\mathbf{r}_x\times\mathbf{r}_y)/\|\mathbf{r}_x\times\mathbf{r}_y\|$ separately (though $\iint_S\mathbf{F}\cdot d\mathbf{S}$ is sometimes written $\iint_S\mathbf{F}\cdot\mathbf{n}\,dS$, which is the SAME quantity, just with the normal split out and re-multiplied by $dS$ — the direct $\mathbf{r}_x\times\mathbf{r}_y$ form is computationally simpler). **Orientation matters for flux**: choosing $\mathbf{r}_y\times\mathbf{r}_x=-(\mathbf{r}_x\times\mathbf{r}_y)$ instead (the OPPOSITE normal direction) flips the sign of the flux — exactly paralleling how reversing a curve's direction flips the sign of a vector line integral. The SCALAR surface integral, by contrast, uses only the magnitude $\|\mathbf{r}_x\times\mathbf{r}_y\|$ and is therefore orientation-INDEPENDENT, exactly as the scalar line integral was unchanged under path reversal.

## Component 4 — Worked Examples

**Example 1 (LO1 — parametrizing a plane and computing dS)**: For the planar patch $S$: $z=4-x-y$ over $D=[0,1]\times[0,1]$, parametrize $\mathbf{r}(x,y)=(x,y,4-x-y)$. Then $\mathbf{r}_x=(1,0,-1)$, $\mathbf{r}_y=(0,1,-1)$. Cross product: $\mathbf{r}_x\times\mathbf{r}_y = (0\cdot(-1)-(-1)\cdot1,\ (-1)\cdot0-1\cdot(-1),\ 1\cdot1-0\cdot0) = (1,1,1)$. Magnitude: $\|(1,1,1)\|=\sqrt3$. So $dS=\sqrt3\,dx\,dy$ — constant here since the plane's tilt is the same everywhere.

**Example 2 (LO2 — scalar surface integral: surface area, breaking MC-1)**: Compute the actual surface area of $S$ from Example 1: $\iint_S 1\,dS = \iint_D \sqrt3\,dx\,dy = \sqrt3\cdot(\text{area of }D) = \sqrt3\cdot1=\sqrt3\approx1.73$. This is LARGER than the shadow region $D$'s own area ($1$), because $S$ is a TILTED plane — the factor $\sqrt3=\|\mathbf{r}_x\times\mathbf{r}_y\|$ accounts for exactly this tilt, exactly paralleling `math.calc.double-integrals`' own lesson that a coordinate-conversion factor (there, polar's $r$) is never optional decoration. Omitting it (computing $\iint_D 1\,dx\,dy=1$ instead) would give the shadow's flat area, not the tilted surface's actual area.

**Example 3 (LO3 — flux and orientation, breaking MC-2 and MC-3)**: Compute the flux of the constant field $\mathbf{F}(x,y,z)=(0,0,1)$ (representing, e.g., uniform "upward" fluid flow) through $S$ from Example 1, using the orientation $\mathbf{r}_x\times\mathbf{r}_y=(1,1,1)$: $\iint_S\mathbf{F}\cdot d\mathbf{S} = \iint_D (0,0,1)\cdot(1,1,1)\,dx\,dy = \iint_D 1\,dx\,dy = 1$ — computed by dotting $\mathbf{F}$ directly against $(\mathbf{r}_x\times\mathbf{r}_y)$, with NO separate unit-normal step. Now reverse orientation, using $\mathbf{r}_y\times\mathbf{r}_x=(-1,-1,-1)$ instead: $\iint_D(0,0,1)\cdot(-1,-1,-1)\,dx\,dy=\iint_D-1\,dx\,dy=-1$ — the flux's SIGN FLIPS under the orientation reversal, while Example 2's scalar surface area ($\sqrt3$, using only $\|\mathbf{r}_x\times\mathbf{r}_y\|=\sqrt3$ regardless of cross-product order) would be completely unaffected by this same reversal.

## Component 5 — Teaching Actions

### Teaching Action A01 — Two Tangent Vectors, One Cross Product (Primitive P11: Representation Shift)

State: "`math.calc.line-integrals` used ONE tangent vector's magnitude for $ds$; a surface has TWO tangent vectors, $\mathbf{r}_x$ and $\mathbf{r}_y$, and their CROSS PRODUCT's magnitude plays the exact same role for $dS$." Work Example 1's full computation.

### Teaching Action A02 — The Cross-Product Magnitude Is Not Optional (Primitive P28: Conflict Evidence)

Present Example 2's direct evidence: including $\sqrt3=\|\mathbf{r}_x\times\mathbf{r}_y\|$ gives the tilted plane's true surface area; omitting it gives only the flat shadow region's area, a different (smaller) number. State: "exactly like the factor of $r$ you couldn't skip converting to polar coordinates, $\|\mathbf{r}_x\times\mathbf{r}_y\|$ can never be skipped in $dS$ — it's what accounts for the surface's actual tilt, not just its flat 'shadow.'"

- **MC-1 hook**: ask "if I parametrize a tilted surface, is $dS$ just $dx\,dy$?" — a "yes" answer reveals MC-1 (omitting the cross-product magnitude factor, exactly the surface-integral analog of forgetting polar's factor of $r$).

### Teaching Action A03 — Flux Uses the Signed Cross Product Directly, and Orientation Flips Its Sign (Primitive P06: Contrast Pair)

Contrast Example 3's two flux computations — $(1,1,1)$-orientation giving $+1$, versus $(-1,-1,-1)$-orientation giving $-1$ — directly beside Example 2's orientation-independent scalar area ($\sqrt3$ either way). State: "for flux, you dot $\mathbf{F}$ straight into $\mathbf{r}_x\times\mathbf{r}_y$ — no separate unit-normal step needed, since that cross product already carries both direction and magnitude. But because it carries DIRECTION, which way you chose your two tangent vectors' cross product (the surface's orientation) genuinely changes the answer's sign — exactly like reversing a curve's direction flipped a vector line integral's sign."

- **MC-2 hook**: ask "do I need to compute the unit normal $\mathbf{n}$ separately before dotting it with $\mathbf{F}$ for flux?" — a "yes" answer reveals MC-2 (missing that $\mathbf{r}_x\times\mathbf{r}_y$ already combines direction and magnitude, an unnecessary extra step).
- **MC-3 hook**: ask "does flipping which way I orient the surface's normal change the flux?" — a "no" answer reveals MC-3 (assuming flux is orientation-independent like the scalar surface integral).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. Parametrize the plane $z=2x+y$ over $D=[0,2]\times[0,2]$ as $\mathbf{r}(x,y)$, and compute $dS$.
  2. Using the surface from problem 1, compute $\iint_S 1\,dS$ (its surface area).
  3. Using the same surface, compute the flux of $\mathbf{F}(x,y,z)=(1,0,0)$ through it, using $\mathbf{r}_x\times\mathbf{r}_y$ directly (state which orientation you used).
  4. Explain, in your own words, why the scalar surface integral $\iint_S f\,dS$ is unaffected by which way you orient the surface's normal, while the flux integral $\iint_S\mathbf{F}\cdot d\mathbf{S}$ is not.
- **P76 (Transfer Probe, mode = independence)**: "A solar panel is modeled as the planar surface $z=6-x-2y$ over the rectangular region $D=[0,2]\times[0,3]$ (in meters), and sunlight is modeled as the uniform vector field $\mathbf{F}=(0,0,I)$ for some intensity constant $I$ (representing straight-down sunlight). (a) Parametrize the panel and compute $dS$. (b) Compute the flux $\iint_S\mathbf{F}\cdot d\mathbf{S}$, representing total light energy captured, using the upward-pointing orientation. (c) Explain, physically, what it would mean if the panel's installer accidentally used the DOWNWARD-pointing orientation instead when computing this integral — would the total energy captured actually change, or just the computed number's sign, and why does this distinction matter when interpreting the result?"
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 4/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | SURFACE-AREA-ELEMENT-FACTOR-OMITTED | Treating dS as just dx dy, omitting the essential cross-product magnitude ‖r_x×r_y‖ that accounts for the surface's tilt | Foundational |
| MC-2 | UNIT-NORMAL-COMPUTED-AS-SEPARATE-STEP | Believing flux requires first computing the unit normal n separately, then multiplying by dS, rather than dotting F directly into the combined vector element r_x×r_y | Moderate |
| MC-3 | FLUX-ASSUMED-ORIENTATION-INDEPENDENT | Believing flux, like the scalar surface integral, is unaffected by which way the surface's normal is oriented, missing that reversing orientation flips the flux's sign | Foundational |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 (name it: "Surface-Area-Element Factor Omitted") → P41 (detect: ask a student to state $dS$ for a parametrized tilted surface and check whether they omit $\|\mathbf{r}_x\times\mathbf{r}_y\|$) → P64 (conceptual shift: re-walk Example 2's direct comparison — $\sqrt3$ (correct, tilted area) versus $1$ (shadow-only, incorrect) — re-anchoring on "the cross-product magnitude is never optional, exactly like polar's factor of $r$").
- **B02 (targets MC-2)**: P27 (name it: "Unit Normal Computed as Separate Step") → P41 (detect: ask a student to compute a flux integral and check whether they first normalize $\mathbf{r}_x\times\mathbf{r}_y$ to unit length before dotting with $\mathbf{F}$, then re-multiplying by $dS$, rather than dotting directly) → P64 (conceptual shift: re-walk Example 3's direct computation dotting $\mathbf{F}$ straight into $(1,1,1)$, re-anchoring on "$\mathbf{r}_x\times\mathbf{r}_y$ already IS the combined direction-and-magnitude element — dot it in directly, exactly like $d\mathbf{r}=\mathbf{r}'(t)\,dt$ needed no separate normalization").
- **B03 (targets MC-3)**: P27 (name it: "Flux Assumed Orientation-Independent") → P41 (detect: ask a student whether reversing a surface's chosen normal direction changes a flux computation, and check for a "no" answer) → P64 (conceptual shift: re-walk Example 3's two flux computations ($+1$ vs. $-1$) side by side, re-anchoring on "flux depends on DIRECTION, exactly like work done by a force along a curve — reversing orientation is exactly like reversing a curve's direction of travel").

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.calc.double-integrals` (the iterated-integral machinery over the parameter domain $D$ this concept's scalar case reduces to, plus the "conversion factor is never optional" lesson directly reused for $\|\mathbf{r}_x\times\mathbf{r}_y\|$), `math.calc.line-integrals` (the one-tangent-vector arc-length element $ds$, the scalar/vector distinction, and the orientation-reversal sign-flip rule, all directly generalized here to two tangent vectors).
- **Unlocks**: `math.calc.stokes-theorem` (relates a surface's flux of a curl field to a line integral around its boundary curve), `math.calc.divergence-theorem` (relates a closed surface's flux to a volume integral of divergence).
- **Cross-link**: KG lists no cross-links for this concept.

## Component 8 — Teaching Notes

- estimated_hours = 10 with an expert/apply tag places this among the corpus's larger concepts; scope was kept manageable by using a single PLANAR surface (constant $\mathbf{r}_x\times\mathbf{r}_y$) throughout all three worked examples, so the computational burden stays on genuinely understanding the parametrization/cross-product/orientation ideas rather than on evaluating a harder double integral over a curved surface — full curved-surface computation (e.g. a sphere or paraboloid) is left to practice problems and to the unlocked concepts `math.calc.stokes-theorem`/`math.calc.divergence-theorem`, which supply their own motivating curved examples.
- This blueprint deliberately structures itself as "the surface-integral analog of `math.calc.line-integrals`, one dimension up" throughout Component 3 and every Teaching Action — scalar case parallels scalar case, vector case parallels vector case, orientation-sensitivity parallels orientation-sensitivity — since the two concepts share an almost identical conceptual skeleton (parametrize, build the differential element from tangent-vector data, substitute, reduce to a lower-dimensional integral already known how to evaluate).
- Example 2's factor-of-$\|\mathbf{r}_x\times\mathbf{r}_y\|$ lesson deliberately echoes `math.calc.double-integrals`' own polar-coordinates factor-of-$r$ lesson by name in both the Core Explanation and Teaching Action A02, since both are instances of the same general pattern (a parametrization's differential element requires a scaling factor derived from how the parametrization stretches area/length) rather than two unrelated facts to memorize separately.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (both) |
| V-4 | unlocks concepts named accurately from KG | PASS |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (empty in KG → independence) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.65×5⌉=4) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Abstract: expert-tier learner, direct fusion of two mastered prerequisites) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
