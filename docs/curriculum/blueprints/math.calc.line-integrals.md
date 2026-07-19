# Teaching Blueprint: Line Integrals (`math.calc.line-integrals`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.calc.line-integrals` |
| name | Line Integrals |
| domain | Calculus |
| difficulty | expert |
| bloom | apply |
| mastery_threshold | 0.7 → MAMR = ⌈0.7×5⌉ = 4/5 |
| estimated_hours | 10 |
| requires | `math.calc.parametric-curves`, `math.geom.vectors-3d` |
| unlocks | `math.calc.greens-theorem` |
| cross_links | none |
| CPA_entry_stage | P (Pictorial) — walking along a curve while a scalar field/force varies before the formal integral |
| description (KG) | Integrals along a curve C: scalar line integral ∫_C f ds measures arc-length-weighted sum; vector line integral ∫_C F·dr computes work done by force field F. |

## Component 1 — Learning Objectives

- LO1: Set up and compute a **scalar line integral** $\int_C f\,ds$ — parametrize the curve $C$ via $\mathbf{r}(t)$, use $ds=\|\mathbf{r}'(t)\|\,dt$, and reduce to an ordinary single-variable integral over the parameter $t$.
- LO2: Set up and compute a **vector line integral** $\int_C \mathbf{F}\cdot d\mathbf{r}$ (representing work done by a force field $\mathbf{F}$ along $C$) — parametrize, use $d\mathbf{r}=\mathbf{r}'(t)\,dt$, and reduce to $\int_a^b \mathbf{F}(\mathbf{r}(t))\cdot\mathbf{r}'(t)\,dt$.
- LO3: Correctly distinguish the two integral types' behavior under **path reversal**: the scalar line integral $\int_C f\,ds$ is UNCHANGED if the curve is traversed in reverse, while the vector line integral $\int_C \mathbf{F}\cdot d\mathbf{r}$ **changes sign** under reversal — reflecting the physical fact that work done depends on DIRECTION of travel, while arc-length-weighted totals do not.

## Component 2 — Prerequisite Check

Assumes mastery of `math.calc.parametric-curves` (curves given by $x=f(t),y=g(t)$, or in vector form $\mathbf{r}(t)$) and `math.geom.vectors-3d` (dot products, vector arithmetic in 3D).

## Component 3 — Core Explanation

**Scalar line integral**: for a scalar function $f$ and a curve $C$ parametrized by $\mathbf{r}(t)=(x(t),y(t),z(t))$ for $t\in[a,b]$:
$$\int_C f\,ds = \int_a^b f(\mathbf{r}(t))\,\|\mathbf{r}'(t)\|\,dt$$
where $ds=\|\mathbf{r}'(t)\|\,dt$ is the **arc-length element** — this integral measures an arc-length-WEIGHTED sum of $f$'s values along the curve (e.g. total mass of a wire with density $f$ per unit length).

**Vector line integral**: for a vector field $\mathbf{F}$ and the same curve:
$$\int_C \mathbf{F}\cdot d\mathbf{r} = \int_a^b \mathbf{F}(\mathbf{r}(t))\cdot\mathbf{r}'(t)\,dt$$
where $d\mathbf{r}=\mathbf{r}'(t)\,dt$ — this integral computes the **work done** by force field $\mathbf{F}$ as an object moves along $C$ (the dot product captures how much of the force acts ALONG the direction of motion at each instant).

**Behavior under path reversal**: if $-C$ denotes the SAME curve traversed in the OPPOSITE direction:
- $\int_{-C} f\,ds = \int_C f\,ds$ (UNCHANGED) — since arc length itself doesn't care about direction of travel, only the geometric path and $f$'s values along it.
- $\int_{-C}\mathbf{F}\cdot d\mathbf{r} = -\int_C\mathbf{F}\cdot d\mathbf{r}$ (SIGN FLIPS) — since reversing direction reverses the tangent vector $\mathbf{r}'(t)$ at every point, flipping the sign of the dot product with $\mathbf{F}$ throughout; physically, work done moving WITH a force is positive, work done moving AGAINST the same force (same path, opposite direction) is negative.

## Component 4 — Worked Examples

**Example 1 (LO1 — scalar line integral)**: Compute $\int_C (x+y)\,ds$ where $C$ is the line segment from $(0,0)$ to $(3,4)$. Parametrize: $\mathbf{r}(t)=(3t,4t)$ for $t\in[0,1]$. $\mathbf{r}'(t)=(3,4)$, $\|\mathbf{r}'(t)\|=\sqrt{9+16}=5$. $\int_0^1 (3t+4t)(5)\,dt = \int_0^1 35t\,dt = 35\cdot\frac{t^2}{2}\Big|_0^1 = \frac{35}{2}=17.5$.

**Example 2 (LO2 — vector line integral, work done)**: Compute the work done by $\mathbf{F}(x,y)=(y,-x)$ along the same segment from $(0,0)$ to $(3,4)$, parametrized as in Example 1. $\mathbf{F}(\mathbf{r}(t))=\mathbf{F}(3t,4t)=(4t,-3t)$. $\mathbf{r}'(t)=(3,4)$. $\mathbf{F}\cdot\mathbf{r}' = 4t(3)+(-3t)(4)=12t-12t=0$. So $\int_C\mathbf{F}\cdot d\mathbf{r}=\int_0^1 0\,dt=0$ — the force field happens to do ZERO net work along this particular straight path (this specific $\mathbf{F}$ is always perpendicular to radial straight-line motion from the origin, a fact worth noting but not derived further here).

**Example 3 (LO3 — path reversal, breaking MC-1)**: Reverse Example 2's path: travel from $(3,4)$ to $(0,0)$ instead. Reparametrize: $\mathbf{r}(t)=(3-3t,4-4t)$ for $t\in[0,1]$ (now $t=0$ gives $(3,4)$, $t=1$ gives $(0,0)$). $\mathbf{r}'(t)=(-3,-4)$. $\mathbf{F}(\mathbf{r}(t))=(4-4t,-(3-3t))=(4-4t,-3+3t)$. Dot product: $(4-4t)(-3)+(-3+3t)(-4) = -12+12t+12-12t=0$ — STILL zero here (a special case of this particular $\mathbf{F}$), but had the force field instead been, e.g., a CONSTANT force $\mathbf{F}=(1,0)$: forward work $=\int_0^1(1,0)\cdot(3,4)\,dt=3$; reversed work $=\int_0^1(1,0)\cdot(-3,-4)\,dt=-3$ — genuinely flipping sign, confirming the general rule even though the specific field in this worked example happened to give zero both ways.

## Component 5 — Teaching Actions

### Teaching Action A01 — Setting Up Both Integral Types via Parametrization (Primitive P11: Representation Shift)

Start pictorial: imagine walking along a wire with varying density (scalar field) versus walking through a force field doing work at each instant (vector field). State: "both integrals follow the SAME basic recipe — parametrize the curve, substitute into the integrand, and reduce to an ordinary single-variable integral over $t$ — but they differ in exactly WHAT gets substituted: arc-length element $ds$ for the scalar case, the vector differential $d\mathbf{r}$ (dotted with $\mathbf{F}$) for the vector case."

Work Example 1 (scalar) and Example 2 (vector) side by side on the SAME curve, explicitly contrasting the $ds=\|\mathbf{r}'(t)\|\,dt$ substitution against the $d\mathbf{r}=\mathbf{r}'(t)\,dt$ (no norm taken!) substitution.

- **MC-1 hook**: ask "if you reverse the direction of travel along a curve, does the SCALAR line integral $\int_C f\,ds$ change value?" — an answer of "yes, it should flip sign, just like the vector case" reveals MC-1 (assuming both integral types behave identically under path reversal, when only the vector line integral actually flips sign).

### Teaching Action A02 — Path Reversal: Scalar Unchanged, Vector Flips Sign (Primitive P06: Contrast Pair)

**Contrast 1 (targets MC-1)**: Work Example 3's constant-force counterexample explicitly — forward work $=3$, reversed work $=-3$ — a genuine sign flip for the VECTOR case. Then explicitly verify the SCALAR line integral from Example 1 does NOT change under reversal (arc length and $f$'s values along the geometric path are identical regardless of direction — a quick direct argument, since $ds=\|\mathbf{r}'(t)\|\,dt$ stays positive regardless of parametrization direction). State the rule with full precision: "scalar line integrals genuinely don't care about direction — they're measuring something about the PATH and the field's values on it. Vector line integrals genuinely DO care about direction — they're measuring work, which is inherently directional (walking with vs. against a force)."

**Contrast 2**: Connect this distinction to the underlying reason: $ds=\|\mathbf{r}'(t)\|\,dt$ is built from a NORM (always nonnegative, direction-independent), while $d\mathbf{r}=\mathbf{r}'(t)\,dt$ retains the actual VECTOR $\mathbf{r}'(t)$ (whose direction flips under reversal) — dotting this flipped vector against $\mathbf{F}$ is precisely what flips the vector integral's sign.

### Teaching Action A03 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. Compute $\int_C xy\,ds$ where $C$ is the line segment from $(0,0)$ to $(1,2)$.
  2. Compute the work done by $\mathbf{F}(x,y)=(2x,y)$ along the same segment as problem 1.
  3. Compute the work done by $\mathbf{F}(x,y)=(2x,y)$ along the SAME segment but traversed in the reverse direction (from $(1,2)$ to $(0,0)$), and confirm the sign flips relative to problem 2's answer.
  4. Explain, in your own words, why the scalar line integral would NOT flip sign for the same path reversal in problem 3, using this lesson's arc-length-vs-work distinction.
- **P76 (Transfer Probe, mode = independence)**: "A hiker walks along a mountain trail (a specific curve $C$), and a meteorologist wants to compute (a) the total accumulated temperature exposure, weighted by how far the hiker walked at each temperature (a scalar line integral of a temperature field along the trail), and separately (b) the total work done by a headwind force field pushing against the hiker throughout the hike (a vector line integral). (a) Explain why, if the hiker instead walked the EXACT same trail in reverse (returning the way they came), the temperature-exposure calculation would give the SAME total. (b) Explain why the headwind work calculation would NOT simply repeat the same value, and in fact should be expected to change (potentially even flip sign, if a pure headwind on the way out becomes a pure tailwind on the way back) — connecting your answer directly to this lesson's structural distinction between the two integral types."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 4/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | BOTH-INTEGRAL-TYPES-ASSUMED-TO-FLIP-SIGN-UNDER-REVERSAL | Believing both the scalar and vector line integral flip sign under path reversal, rather than recognizing only the vector line integral does | Foundational |
| MC-2 | ARC-LENGTH-ELEMENT-CONFUSED-WITH-VECTOR-DIFFERENTIAL | Confusing $ds=\|\mathbf{r}'(t)\|\,dt$ (a scalar, always positive) with $d\mathbf{r}=\mathbf{r}'(t)\,dt$ (a vector, direction-dependent), applying the wrong substitution to the wrong integral type | Foundational |
| MC-3 | PARAMETRIZATION-DIRECTION-NOT-TRACKED-FOR-VECTOR-INTEGRALS | When computing a vector line integral, failing to correctly track which direction the chosen parametrization actually traces the curve, leading to an unintended sign error | Moderate |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 (name it: "Both-Integrals-Flip-Sign Assumption") → P41 (detect: ask whether reversing a path changes the value of $\int_C f\,ds$) → P64 (conceptual shift: work through the direct argument — $ds=\|\mathbf{r}'(t)\|\,dt$ is built from a norm, always nonnegative regardless of direction, so the scalar integral is genuinely insensitive to reversal).
- **B02 (targets MC-2)**: P27 (name it: "Arc-Length/Vector-Differential Confusion") → P41 (detect: check whether a student correctly distinguishes $ds$ from $d\mathbf{r}$ when setting up each integral type) → P64 (conceptual shift: re-derive both substitutions side by side from the same parametrization, emphasizing the norm-vs-vector distinction explicitly).
- **B03 (targets MC-3)**: P27 (name it: "Parametrization Direction Untracked") → P41 (detect: give a vector line integral problem with an ambiguously-stated curve and check whether the student verifies which direction their chosen parametrization actually traces) → P64 (conceptual shift: re-anchor on "always confirm: does $t=a$ correspond to the STARTING point and $t=b$ to the ENDING point, matching the problem's stated direction of travel?").

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.calc.parametric-curves` (curves given by a parametrization $\mathbf{r}(t)$, the essential setup tool for both integral types), `math.geom.vectors-3d` (dot products and vector arithmetic, needed for the vector line integral).
- **Unlocks**: `math.calc.greens-theorem` (Green's Theorem directly relates a vector line integral around a closed curve to a double integral over the enclosed region, building immediately on this concept's vector line integral).
- **Cross-link**: KG lists no cross-links for this concept.

## Component 8 — Teaching Notes

- estimated_hours = 10 with an expert/apply tag places this at the "2 main TAs + gate" tier — A01 (setting up both integral types via parametrization, side by side) and A02 (the path-reversal contrast plus its structural explanation) jointly cover all three LOs, appropriate given the concept's genuine breadth (two distinct integral types) is unified by a single parametrization-based setup procedure.
- MC-1 (both integral types assumed to flip sign) was made this blueprint's central focus because it is the single most consequential and easily-tested distinguishing fact between the two integral types — Example 3 was deliberately extended beyond its own initial (coincidentally zero-both-ways) computation specifically because that coincidence would otherwise fail to demonstrate the general sign-flip rule, requiring the added constant-force illustration to make the point unambiguously.
- The hiking/meteorology transfer probe was chosen because "cumulative exposure along a path" (scalar) versus "work done by a directional force" (vector) map naturally and memorably onto genuinely everyday physical intuitions, without requiring invented framing.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (both) |
| V-4 | unlocks concepts named accurately from KG | PASS |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (empty in KG → independence) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A03) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.7×5⌉=4) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Pictorial: walking-along-a-curve before formal integral) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
