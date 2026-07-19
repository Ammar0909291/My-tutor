# Teaching Blueprint: Area by Integration (`math.calc.integral-area`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.calc.integral-area` |
| name | Area by Integration |
| domain | Calculus |
| difficulty | advanced |
| bloom | apply |
| mastery_threshold | 0.8 → MAMR = ⌈0.8×5⌉ = 4/5 |
| estimated_hours | 8 |
| requires | `math.calc.definite-integral` |
| unlocks | `math.calc.volume-revolution` |
| cross_links | none |
| CPA_entry_stage | C (Concrete) — computing one specific area-under-a-curve and one specific area-between-two-curves before naming the general formulas |
| description (KG) | Area under $y=f(x)$ from $a$ to $b$ is $\int_a^b f(x)\,dx$; area between curves is $\int_a^b[f(x)-g(x)]\,dx$ where $f\ge g$. |

## Component 1 — Learning Objectives

- LO1: Compute the area under a curve $y=f(x)\ge0$ on $[a,b]$ as $\int_a^bf(x)\,dx$, recognizing this as a direct APPLICATION of `math.calc.definite-integral`'s own limit-of-Riemann-sums definition, not a new operation.
- LO2: Compute the area BETWEEN two curves $f(x)\ge g(x)$ on $[a,b]$ as $\int_a^b[f(x)-g(x)]\,dx$, recognizing the integrand as the height of each vertical strip (top minus bottom), and correctly identify WHICH function is on top before setting up the integral.
- LO3 (orientation level — full sign-handling theory deferred): recognize, without full derivation, that when $f(x)$ is NEGATIVE on part of $[a,b]$, the definite integral $\int_a^bf(x)\,dx$ computes SIGNED area (subtracting area below the axis), so computing genuine unsigned area requires splitting the interval at $f$'s zeros and using $\int|f(x)|\,dx$ region by region.

## Component 2 — Prerequisite Check

Assumes mastery of `math.calc.definite-integral` (the definite integral as the limit of Riemann sums, and the Fundamental Theorem of Calculus for evaluation).

## Component 3 — Core Explanation

**Area under a curve is the definite integral itself, applied, not a new formula**: `math.calc.definite-integral` already established $\int_a^bf(x)\,dx$ as the limit of Riemann sums — a sum of thin rectangle areas $f(x_i)\Delta x$. When $f(x)\ge0$ on $[a,b]$, each of these rectangles genuinely represents a piece of the region's area, so the limit itself IS the area under the curve — no new definition is needed, only the observation that this particular integral's value coincides with an area when $f\ge0$.

**Area between curves — each vertical strip's height is top minus bottom**: for $f(x)\ge g(x)$ on $[a,b]$, imagine a thin vertical strip at each $x$: its height is $f(x)-g(x)$ (top curve minus bottom curve) and its width is $\Delta x$, giving strip area $[f(x)-g(x)]\Delta x$. Summing all such strips and taking the limit gives $\int_a^b[f(x)-g(x)]\,dx$ — this generalizes the area-under-a-curve case, which is the special case $g(x)=0$ (the $x$-axis as the "bottom curve"). Correctly identifying WHICH function is on top over the relevant interval is essential — reversing $f$ and $g$ flips the sign of every strip.

**Signed vs. unsigned area when $f$ dips below the axis (orientation level)**: if $f(x)<0$ somewhere on $[a,b]$, the Riemann sum there accumulates NEGATIVE contributions (each rectangle's "height" $f(x_i)$ is negative), so $\int_a^bf(x)\,dx$ computes SIGNED area — area above the axis counted positively, area below counted negatively, and these can partially cancel. Computing the genuine (unsigned) total area requires locating $f$'s zeros in $[a,b]$, splitting the interval there, and using $\int|f(x)|\,dx$ (equivalently, flipping the sign of the integral over each sub-interval where $f<0$) rather than a single unmodified integral over the whole interval.

## Component 4 — Worked Examples

**Example 1 (LO1 — area under a curve as the definite integral itself, breaking MC-1)**: for $f(x)=x^2$ on $[0,2]$ (with $f\ge0$ throughout), the area under the curve is $\int_0^2x^2\,dx=\left[\frac{x^3}{3}\right]_0^2=\frac{8}{3}-0=\frac{8}{3}$. This is EXACTLY the same Fundamental-Theorem-of-Calculus evaluation `math.calc.definite-integral` already taught — no new procedure was introduced; the only new content is recognizing that this particular integral's numeric value represents the region's area, because $f\ge0$ here.

**Example 2 (LO2 — area between curves, identifying top and bottom, breaking MC-2)**: for $f(x)=x+2$ and $g(x)=x^2$ on $[-1,2]$ (where $f(x)\ge g(x)$, verified by checking $f(-1)=1\ge g(-1)=1$, $f(0)=2\ge g(0)=0$, $f(2)=4\ge g(2)=4$, with equality exactly at the endpoints — confirming $f$ is on top throughout): the area between the curves is $\int_{-1}^2[(x+2)-x^2]\,dx=\left[\frac{x^2}{2}+2x-\frac{x^3}{3}\right]_{-1}^2=\left(2+4-\frac{8}{3}\right)-\left(\frac{1}{2}-2+\frac{1}{3}\right)=\frac{10}{3}-\left(-\frac{7}{6}\right)=\frac{20}{6}+\frac{7}{6}=\frac{27}{6}=\frac{9}{2}$. Setting up $g(x)-f(x)$ instead (reversing top and bottom) would have given the NEGATIVE of the correct area — confirming that correctly identifying which function is on top is essential, not a minor detail.

**Example 3 (LO3, orientation level — signed vs. unsigned area, breaking MC-3)**: for $f(x)=x$ on $[-1,2]$: $f$ is negative on $[-1,0)$ and positive on $(0,2]$. The single integral $\int_{-1}^2x\,dx=\left[\frac{x^2}{2}\right]_{-1}^2=2-0.5=1.5$ gives the SIGNED area (the negative contribution from $[-1,0]$ partially cancels the positive contribution from $[0,2]$). The genuine (unsigned) total area requires splitting at $f$'s zero $x=0$: area $=\left|\int_{-1}^0x\,dx\right|+\int_0^2x\,dx=\left|-0.5\right|+2=0.5+2=2.5$ — genuinely larger than the signed value $1.5$, because the region below the axis was counted as POSITIVE area rather than subtracted.

## Component 5 — Teaching Actions

### Teaching Action A01 — Area Under a Curve Is the Definite Integral, Not a New Operation (Primitive P11: Representation Shift)

State: "you're not learning a new formula for area here — $\int_a^bf(x)\,dx$ IS the area, precisely because each Riemann-sum rectangle genuinely represents a piece of the region when $f\ge0$." Walk Example 1's direct FTC evaluation.

- **MC-1 hook**: ask "is computing the area under a curve a genuinely new operation, distinct from evaluating a definite integral you already know how to compute?" — a "yes" answer reveals MC-1 (missing that the area IS the definite integral's value, when $f\ge0$).

### Teaching Action A02 — Getting the Top and Bottom Backwards Flips the Sign (Primitive P28: Conflict Evidence)

Present Example 2's direct evidence: setting up $f(x)-g(x)$ correctly (with $f$ on top) gave $\frac{9}{2}$, while reversing to $g(x)-f(x)$ would give $-\frac{9}{2}$. State: "the integrand $f(x)-g(x)$ isn't symmetric in $f$ and $g$ — you must first confirm which function is genuinely on top over the interval, or the sign comes out backwards."

- **MC-2 hook**: ask "does it matter which function you subtract from which when setting up the area-between-curves integral, as long as both functions appear?" — a "yes"... — actually rephrase: ask "can you set up the area-between-curves integral as $g(x)-f(x)$ just as validly as $f(x)-g(x)$, regardless of which curve is on top?" — a "yes" answer reveals MC-2 (missing that the top-minus-bottom order is required, not an arbitrary choice).

### Teaching Action A03 — A Single Integral Can Silently Cancel Area Below the Axis (Primitive P06: Contrast Pair)

Contrast Example 3's single unsplit integral ($1.5$) against the correctly split unsigned-area computation ($2.5$). State: "the moment $f$ dips below the axis, a single integral over the whole interval starts SUBTRACTING that region's area instead of adding it — genuine total area requires splitting at the zeros first."

- **MC-3 hook**: ask "does $\int_a^bf(x)\,dx$ always compute the genuine (unsigned) area under $y=f(x)$, even when $f$ is negative somewhere on $[a,b]$?" — a "yes" answer reveals MC-3 (missing that a negative $f$ contributes NEGATIVE signed area, requiring the interval to be split at $f$'s zeros for genuine unsigned area).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. Compute the area under $f(x)=3x^2$ on $[0,3]$ via the definite integral.
  2. Verify $f(x)=6-x\ge g(x)=x^2$ on $[-1,2]$ at the endpoints and one interior point, then set up (and evaluate) the area-between-curves integral.
  3. For $f(x)=x-2$ on $[0,5]$, identify where $f$ changes sign, and set up (without necessarily fully evaluating) the correctly split expression for the genuine unsigned area.
  4. Explain, in one or two sentences, why reversing which function is "on top" in an area-between-curves setup produces the negative of the correct answer rather than an equally valid alternative.
- **P76 (Transfer Probe, mode = independence)**: "A cross-section of a riverbed's flow-rate difference between two measurement methods is modeled by $f(t)=8-t^2$ (upstream) and $g(t)=t$ (downstream) for $t\in[0,3]$ (in appropriate units). (a) Verify which function is on top over this interval. (b) Set up and evaluate the area between the two curves, representing the net accumulated difference. (c) Suppose instead a single function $h(t)=4-t^2$ representing net flow difference is given, and $h$ is negative for part of $[0,3]$ — explain what would go wrong if you simply evaluated $\int_0^3h(t)\,dt$ to answer 'what is the total accumulated MAGNITUDE of the difference,' and describe the fix."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 4/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | AREA-UNDER-CURVE-ASSUMED-NEW-OPERATION | Believing computing area under a curve is a genuinely new operation distinct from the definite integral, missing that the area IS the definite integral's value when $f\ge0$ | Foundational |
| MC-2 | TOP-BOTTOM-ORDER-ASSUMED-ARBITRARY | Believing the area-between-curves integrand can be set up as either $f-g$ or $g-f$ regardless of which curve is on top, missing that reversing the order flips the sign | High |
| MC-3 | SIGNED-INTEGRAL-ASSUMED-TO-ALWAYS-GIVE-UNSIGNED-AREA | Believing $\int_a^bf(x)\,dx$ always computes genuine unsigned area even when $f$ is negative somewhere, missing that negative regions subtract rather than add, requiring splitting at zeros | Moderate |

- **B01 (targets MC-1)**: P27 (name it: "Area Under Curve Assumed New Operation") → P41 (detect: ask whether computing area under a curve is a genuinely new operation distinct from the definite integral) → P64 (conceptual shift: re-walk Example 1's direct FTC evaluation, re-anchoring on "the area IS the definite integral's value, when $f\ge0$").
- **B02 (targets MC-2)**: P27 (name it: "Top-Bottom Order Assumed Arbitrary") → P41 (detect: ask whether the area-between-curves integrand can be set up in either order regardless of which curve is on top) → P64 (conceptual shift: re-walk Example 2's sign-reversal demonstration, re-anchoring on "top minus bottom is required, not an arbitrary choice").
- **B03 (targets MC-3)**: P27 (name it: "Signed Integral Assumed to Always Give Unsigned Area") → P41 (detect: ask whether a single integral over an interval where $f$ is sometimes negative still gives genuine unsigned area) → P64 (conceptual shift: re-walk Example 3's split-versus-unsplit contrast, re-anchoring on "negative regions subtract rather than add, requiring splitting at the zeros").

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.calc.definite-integral` (the definite integral as the limit of Riemann sums and its Fundamental-Theorem-of-Calculus evaluation, directly reused as the mechanism computing area).
- **Unlocks**: `math.calc.volume-revolution` per the KG (this concept's area-between-curves and vertical-strip reasoning is the direct precursor to computing volumes of revolution via disks/washers).
- **Cross-link**: none listed in the KG for this concept.

## Component 8 — Teaching Notes

- estimated_hours = 8 with an advanced/apply tag supports the "3 TAs + gate" tier, with LO1 and LO2 given full computational depth (the direct FTC evaluation and the correctly-ordered area-between-curves setup) and LO3 kept orientation-level, appropriately surveying signed-vs-unsigned area without deriving a general formula for arbitrarily many sign changes.
- **Division of labor**: `math.calc.definite-integral` owns the general definite-integral definition and FTC evaluation machinery; this concept owns the SPECIFIC geometric interpretation as area and the top-minus-bottom setup for regions between curves — deliberately verifying $f\ge g$ explicitly at multiple points in Example 2 before integrating, modeling the verification step as a required part of the procedure rather than an assumption.
- Example 3's deliberate choice of the simplest possible sign-changing function ($f(x)=x$) was chosen so the split-interval unsigned-area computation is easy to verify by direct comparison against the unsplit signed value, isolating the sign-handling point cleanly.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS |
| V-4 | unlocks concepts named accurately from KG | PASS (`math.calc.volume-revolution`) |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (none listed in KG) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.8×5⌉=4) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Concrete: one specific under-curve area and one specific between-curves area precede the general formulas) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
