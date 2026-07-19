# Teaching Blueprint: Arc Length (`math.calc.arc-length`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.calc.arc-length` |
| name | Arc Length |
| domain | Calculus |
| difficulty | advanced |
| bloom | apply |
| mastery_threshold | 0.8 → MAMR = ⌈0.8×5⌉ = 4/5 |
| estimated_hours | 6 |
| requires | `math.calc.definite-integral`, `math.calc.derivative-rules` |
| unlocks | none |
| cross_links | `math.geom.differential-geometry-curves` (authored earlier — see Component 7) |
| CPA_entry_stage | C (Concrete) — approximating one specific curve's length via straight-line segments before naming the general integral formula |
| description (KG) | The length of a curve $y=f(x)$ from $a$ to $b$: $L=\int_a^b\sqrt{1+[f'(x)]^2}\,dx$; generalizes to parametric and polar curves. |

## Component 1 — Learning Objectives

- LO1: Derive the arc length formula $L=\int_a^b\sqrt{1+[f'(x)]^2}\,dx$ by approximating the curve with SHORT STRAIGHT-LINE SEGMENTS (each segment's length computed via the Pythagorean theorem, $\sqrt{(\Delta x)^2+(\Delta y)^2}$), and recognize the formula as the LIMIT of this approximation as the segments shrink — a direct application of `math.calc.definite-integral`'s own Riemann-sum-as-a-limit idea.
- LO2: Compute arc length for a specific curve by differentiating $f$ (via `math.calc.derivative-rules`) to get $f'(x)$, then evaluating the resulting definite integral, and recognize why $\sqrt{1+[f'(x)]^2}$ (not simply $f'(x)$ or $|f'(x)|$) is the correct integrand.
- LO3 (orientation level — full parametric/polar derivation deferred): recognize, without full derivation, that the arc length formula GENERALIZES to parametric curves ($x(t),y(t)$) as $L=\int\sqrt{[x'(t)]^2+[y'(t)]^2}\,dt$ and to polar curves — previewing `math.geom.differential-geometry-curves`'s own more general Frenet-Serret framework for curves in higher dimensions.

## Component 2 — Prerequisite Check

Assumes mastery of `math.calc.definite-integral` (the definite integral as a limit of Riemann sums) and `math.calc.derivative-rules` (the power rule and other basic differentiation rules, needed to compute $f'(x)$).

## Component 3 — Core Explanation

**Arc length is the limit of straight-line-segment approximations, exactly like a Riemann sum**: to approximate a curve's length, partition $[a,b]$ into small pieces of width $\Delta x$, and approximate the curve on each piece by a STRAIGHT LINE segment connecting $(x_i,f(x_i))$ to $(x_{i+1},f(x_{i+1}))$. Each segment's length, via the Pythagorean theorem, is $\sqrt{(\Delta x)^2+(\Delta y)^2}=\Delta x\sqrt{1+(\Delta y/\Delta x)^2}$. As the partition gets finer, $\Delta y/\Delta x\to f'(x)$ (the derivative), and the SUM of segment lengths becomes a Riemann sum for $\int_a^b\sqrt{1+[f'(x)]^2}\,dx$ — this is EXACTLY `math.calc.definite-integral`'s own limit-of-Riemann-sums construction, applied here to lengths instead of areas.

**Why $\sqrt{1+[f'(x)]^2}$, not just $f'(x)$ or $|f'(x)|$**: the integrand comes DIRECTLY from the Pythagorean-theorem derivation above — each infinitesimal segment has length $\sqrt{(dx)^2+(dy)^2}=\sqrt{1+(dy/dx)^2}\,dx=\sqrt{1+[f'(x)]^2}\,dx$. Using merely $f'(x)$ (the SLOPE) would compute something entirely different (related to total vertical change, not length along the curve); the square root of ONE PLUS the squared derivative is what correctly accounts for BOTH the horizontal ($dx$) and vertical ($dy$) components of each tiny segment via the Pythagorean relationship.

**The formula generalizes to parametric and polar curves (orientation level)**: for a curve given parametrically as $(x(t),y(t))$, the same Pythagorean-segment argument gives $L=\int\sqrt{[x'(t)]^2+[y'(t)]^2}\,dt$ — the SAME underlying idea (sum tiny straight-line segments, take the limit), just with both $x$ and $y$ varying with a parameter $t$ rather than $y$ being an explicit function of $x$. This is a special case of the more general Frenet-Serret machinery `math.geom.differential-geometry-curves` develops for smooth curves in $\mathbb{R}^n$. Full derivation of the parametric and polar cases is deferred beyond this concept's core scope.

## Component 4 — Worked Examples

**Example 1 (LO1 — deriving the formula via straight-line-segment approximation, breaking MC-1)**: for $f(x)=x^2$ on $[0,1]$, approximating with just 2 segments (at $x=0,0.5,1$): the first segment goes from $(0,0)$ to $(0.5,0.25)$, length $\sqrt{0.5^2+0.25^2}=\sqrt{0.25+0.0625}=\sqrt{0.3125}\approx0.559$; the second from $(0.5,0.25)$ to $(1,1)$, length $\sqrt{0.5^2+0.75^2}=\sqrt{0.25+0.5625}=\sqrt{0.8125}\approx0.901$. Total approximation $\approx1.460$. Using MORE, finer segments would approach the EXACT value given by $L=\int_0^1\sqrt{1+(2x)^2}\,dx=\int_0^1\sqrt{1+4x^2}\,dx\approx1.479$ — confirming the integral IS the limit of exactly this straight-line-segment process, refined infinitely.

**Example 2 (LO2 — computing arc length via differentiation and integration, breaking MC-2)**: for $f(x)=\frac23x^{3/2}$ on $[0,3]$: by `math.calc.derivative-rules`'s power rule, $f'(x)=x^{1/2}=\sqrt x$, so $[f'(x)]^2=x$. The arc length is $L=\int_0^3\sqrt{1+x}\,dx=\left[\frac23(1+x)^{3/2}\right]_0^3=\frac23(4^{3/2}-1^{3/2})=\frac23(8-1)=\frac{14}{3}$. Note the integrand used $1+[f'(x)]^2=1+x$, NOT merely $f'(x)=\sqrt x$ — confirming the Pythagorean-derived integrand, not the bare derivative, is what correctly measures length.

**Example 3 (LO3, orientation level — the parametric generalization, breaking MC-3)**: the SAME curve from Example 2, $y=\frac23x^{3/2}$, can be written parametrically as $x(t)=t$, $y(t)=\frac23t^{3/2}$ for $t\in[0,3]$: then $x'(t)=1$, $y'(t)=\sqrt t$, giving $L=\int_0^3\sqrt{1^2+(\sqrt t)^2}\,dt=\int_0^3\sqrt{1+t}\,dt$ — the IDENTICAL integral as Example 2's computation (with $t$ simply relabeling $x$), confirming the parametric formula is a genuine generalization that reduces to the explicit-function formula as a special case, not an unrelated alternative method.

## Component 5 — Teaching Actions

### Teaching Action A01 — The Formula Is Exactly a Riemann-Sum Limit, For Lengths Instead of Areas (Primitive P11: Representation Shift)

State: "you already know the definite integral as the limit of a sum of small pieces — arc length is the SAME idea, just summing tiny straight-line-segment lengths (via the Pythagorean theorem) instead of tiny rectangle areas." Walk Example 1's 2-segment approximation converging toward the exact integral value.

- **MC-1 hook**: ask "is the arc length formula an independent new formula, unrelated to the Riemann-sum-as-a-limit idea you already know from `math.calc.definite-integral`?" — a "yes" answer reveals MC-1 (missing that arc length is exactly the same limit-of-sums construction, applied to segment lengths).

### Teaching Action A02 — The Integrand Comes From the Pythagorean Theorem, Not the Bare Derivative (Primitive P28: Conflict Evidence)

Present Example 2's direct evidence: the correct integrand was $\sqrt{1+x}$ (from $1+[f'(x)]^2$), NOT $f'(x)=\sqrt x$ itself. State: "using just the derivative would measure something else entirely — the $\sqrt{1+[f'(x)]^2}$ form comes directly from the Pythagorean theorem applied to each tiny segment's horizontal and vertical components."

- **MC-2 hook**: ask "could you compute arc length by integrating just $f'(x)$ (the slope) directly, rather than $\sqrt{1+[f'(x)]^2}$?" — a "yes" answer reveals MC-2 (missing that the Pythagorean-derived square-root form is what correctly measures length, not the bare derivative).

### Teaching Action A03 — The Parametric Formula Is a Generalization, Not an Unrelated Alternative (Primitive P06: Contrast Pair)

Contrast Example 2's explicit-function computation against Example 3's parametric computation of the SAME curve — producing the IDENTICAL integral. State: "the parametric arc length formula isn't a separate technique to learn from scratch — it's the same underlying idea, generalized to handle curves where $y$ isn't simply a function of $x$, and it reduces to exactly what you already know when it doesn't need to."

- **MC-3 hook**: ask "is the parametric arc length formula $L=\int\sqrt{[x'(t)]^2+[y'(t)]^2}\,dt$ an unrelated alternative technique from the explicit-function formula, requiring separate memorization?" — a "yes" answer reveals MC-3 (missing that the parametric formula is a direct generalization, reducing to the explicit-function formula as a special case).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. Set up (but don't necessarily fully evaluate) the arc length integral for $f(x)=x^3$ on $[0,2]$.
  2. Compute the arc length of $f(x)=\frac25x^{5/2}$ on $[0,4]$ (using the power rule to find $f'(x)$ first).
  3. Explain why the integrand $\sqrt{1+[f'(x)]^2}$, not simply $f'(x)$, is the correct quantity to integrate for arc length.
  4. Express $f(x)=x^2$ parametrically ($x(t)=t$, $y(t)=t^2$), and verify the parametric arc length integral matches the explicit-function integral for the same curve.
- **P76 (Transfer Probe, mode = cross-link probe engaging `math.geom.differential-geometry-curves`)**: "A roller coaster track segment follows the curve $y=\frac{1}{12}x^3$ for $x\in[0,3]$ (in some length unit). (a) Compute the exact arc length of this track segment, showing the derivative computation and the resulting integral evaluation. (b) Explain why the integrand $\sqrt{1+[f'(x)]^2}$ is not simply the slope $f'(x)$, citing the Pythagorean-theorem derivation. (c) `math.geom.differential-geometry-curves` develops curvature $\kappa$ and torsion $\tau$ for smooth curves in $\mathbb{R}^n$ via the Frenet-Serret apparatus — explain, without deriving it, why this 2D arc length formula is a special case of that more general framework's own arc-length machinery for parametrized curves."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 4/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | ARC-LENGTH-FORMULA-ASSUMED-UNRELATED-TO-RIEMANN-SUMS | Believing the arc length formula is an independent new formula unrelated to the Riemann-sum-as-a-limit idea, missing that it is the identical construction applied to segment lengths | Foundational |
| MC-2 | ARC-LENGTH-INTEGRAND-ASSUMED-TO-BE-BARE-DERIVATIVE | Believing arc length can be computed by integrating just $f'(x)$ directly, missing that the Pythagorean-derived $\sqrt{1+[f'(x)]^2}$ is the correct integrand | High |
| MC-3 | PARAMETRIC-FORMULA-ASSUMED-UNRELATED-ALTERNATIVE | Believing the parametric arc length formula is an unrelated alternative technique, missing that it is a direct generalization reducing to the explicit-function formula as a special case | Moderate |

- **B01 (targets MC-1)**: P27 (name it: "Arc Length Formula Assumed Unrelated to Riemann Sums") → P41 (detect: ask whether the arc length formula is independent of the Riemann-sum-as-a-limit idea) → P64 (conceptual shift: re-walk Example 1's segment-approximation convergence, re-anchoring on "the same limit-of-sums construction, applied to segment lengths").
- **B02 (targets MC-2)**: P27 (name it: "Arc Length Integrand Assumed to Be Bare Derivative") → P41 (detect: ask whether integrating $f'(x)$ directly gives arc length) → P64 (conceptual shift: re-walk Example 2's correct-integrand computation, re-anchoring on "$\sqrt{1+[f'(x)]^2}$, from the Pythagorean theorem, is the correct integrand").
- **B03 (targets MC-3)**: P27 (name it: "Parametric Formula Assumed Unrelated Alternative") → P41 (detect: ask whether the parametric formula is an unrelated alternative technique) → P64 (conceptual shift: re-walk Example 3's matching-integral verification, re-anchoring on "a direct generalization, reducing to the explicit-function formula as a special case").

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.calc.definite-integral` (the Riemann-sum-as-a-limit construction this concept's derivation directly reuses) and `math.calc.derivative-rules` (the power rule used to compute $f'(x)$ for the worked examples).
- **Unlocks**: none listed in the KG for this concept.
- **Cross-link**: KG lists `math.geom.differential-geometry-curves`, checked via `ls docs/curriculum/blueprints/` and confirmed ALREADY authored. $P76_{mode}=$ **cross-link probe**, engaging `math.geom.differential-geometry-curves`'s own Frenet-Serret framework directly in Component 3's generalization note and the P76 transfer probe.

## Component 8 — Teaching Notes

- estimated_hours = 6 with an advanced/apply tag supports the "3 TAs + gate" tier, with LO1 and LO2 given full computational depth (the segment-approximation derivation and the correct-integrand computation) and LO3 kept orientation-level, appropriately previewing the parametric/polar generalizations without deriving the polar-coordinate arc-length formula.
- **Division of labor**: `math.calc.definite-integral` owns the general Riemann-sum-as-a-limit construction; `math.calc.derivative-rules` owns computing $f'(x)$. This concept owns the SPECIFIC Pythagorean-segment derivation and the resulting arc-length integrand — deliberately reusing the SAME curve $y=\frac23x^{3/2}$ across Examples 2 and 3 (explicit-function and parametric forms) so learners see the parametric generalization reduce to an identical integral, not merely an analogous one.
- Example 1's deliberate choice of a coarse 2-segment approximation (rather than many segments) was chosen to make the straight-line-segment idea and its convergence toward the exact integral value transparent and hand-computable, rather than requiring a large Riemann sum to illustrate the same convergence principle.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS |
| V-4 | unlocks concepts named accurately from KG | PASS (none listed) |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (`math.geom.differential-geometry-curves` confirmed authored → cross-link probe) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (cross-link probe) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.8×5⌉=4) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Concrete: straight-line-segment approximation on a specific curve precedes the general integral formula) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
