# Teaching Blueprint: Curvature (`math.geom.curvature`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.geom.curvature` |
| name | Curvature |
| domain | Geometry |
| difficulty | advanced |
| bloom | analyze |
| mastery_threshold | 0.7 → MAMR = ⌈0.7×5⌉ = 4/5 |
| estimated_hours | 8 |
| requires | `math.geom.differential-geometry-curves`, `math.calc.derivative-rules` |
| unlocks | `math.geom.differential-geometry-surfaces` |
| cross_links | none |
| CPA_entry_stage | A (Abstract) — advanced learner already has $T(t)$, arc length, and the qualitative notion $\kappa=|dT/ds|$ from `math.geom.differential-geometry-curves`; this concept goes directly to a COMPUTABLE formula |
| description (KG) | The rate at which a curve bends; κ = \|dT/ds\| where T is the unit tangent vector and s is arc length. |

## Component 1 — Learning Objectives

- LO1: Explain why the definition $\kappa=|dT/ds|$, while geometrically correct, is impractical to compute DIRECTLY for most curves — since it requires the arc-length reparametrization `math.geom.differential-geometry-curves` showed is a genuine solve-and-invert computation — and state the need for a formula computable directly from an ORIGINAL parameter $t$.
- LO2: Derive (via the chain rule, using `math.calc.derivative-rules`, and $ds/dt=|\vec r\,'(t)|$) and correctly apply the computable curvature formula $\kappa(t) = \dfrac{|\vec r\,'(t)\times \vec r\,''(t)|}{|\vec r\,'(t)|^3}$ to space curves given in any parametrization, without ever reparametrizing by arc length.
- LO3 (orientation level — full treatment deferred to `math.geom.differential-geometry-surfaces`): recognize that this concept's own KG-listed aliases, "geodesic curvature" and "normal curvature," name a DECOMPOSITION of curvature that only becomes meaningful once a curve is considered as living ON a surface — distinct from the single number $\kappa$ this concept computes for a curve in space generally.

## Component 2 — Prerequisite Check

Assumes mastery of `math.geom.differential-geometry-curves` (the position vector $\vec r(t)$, velocity $\vec r\,'(t)$, unit tangent $T(t)=\vec r\,'(t)/|\vec r\,'(t)|$, arc length $s(t)=\int|\vec r\,'(t)|\,dt$, and the qualitative statement $\kappa=|dT/ds|$ as a LOCAL quantity) and `math.calc.derivative-rules` (product rule, chain rule, needed to differentiate component functions and to convert $d/ds$ into $d/dt$ via $ds/dt$).

## Component 3 — Core Explanation

**Why $\kappa=|dT/ds|$ needs a computable reformulation**: `math.geom.differential-geometry-curves` defined curvature correctly but left it in terms of $s$, the arc-length parameter — and reaching $s$ from an arbitrary parametrization $t$ requires solving $s(t)=\int_a^t|\vec r\,'(u)|\,du$ and then INVERTING it, which is frequently impossible in closed form (most speed functions $|\vec r\,'(t)|$ do not have an elementary antiderivative whose inverse can be written down). A working formula must therefore compute $\kappa$ directly from $\vec r(t)$ and its $t$-derivatives, without ever performing that reparametrization.

**Deriving the computable formula via the chain rule**: by the chain rule, $\dfrac{dT}{dt} = \dfrac{dT}{ds}\cdot\dfrac{ds}{dt}$, and since $\dfrac{ds}{dt}=|\vec r\,'(t)|$ (the curve's speed), this gives $\dfrac{dT}{ds} = \dfrac{1}{|\vec r\,'(t)|}\dfrac{dT}{dt}$, so $\kappa = \left|\dfrac{dT}{ds}\right| = \dfrac{|T'(t)|}{|\vec r\,'(t)|}$ — already computable from $t$-derivatives alone, though it still requires differentiating the normalized vector $T(t)$, which is algebraically messy (quotient rule on a vector with a square-root magnitude in the denominator). Working through that differentiation and simplifying (a standard vector-calculus identity) yields the equivalent, cleaner closed form
$$\kappa(t) = \frac{|\vec r\,'(t)\times \vec r\,''(t)|}{|\vec r\,'(t)|^{3}}$$
— a formula built entirely from the ORIGINAL parametrization's first and second derivatives and a single cross product (from `math.geom.vectors-3d`, via `math.geom.differential-geometry-curves`), with no arc-length substitution anywhere in it.

**Curvature vs. its surface decomposition (orientation level)**: this concept's own KG aliases, "geodesic curvature" and "normal curvature," belong properly to a curve that lives ON a surface — where its total bending (the $\kappa$ computed here, treating it as an ordinary space curve) can be split into a component bending AWAY from the surface (normal curvature) and a component turning WITHIN the surface (geodesic curvature). That decomposition requires a surface to decompose against, and is the dedicated subject of `math.geom.differential-geometry-surfaces`; this concept computes the single, undecomposed space-curve $\kappa$.

## Component 4 — Worked Examples

**Example 1 (LO2 — verifying the formula on the parent concept's own straight line and circle, breaking MC-1)**: For the straight line $\vec r_1(t)=(t,0,0)$ (from `math.geom.differential-geometry-curves`'s own Example 3): $\vec r_1\,'(t)=(1,0,0)$, $\vec r_1\,''(t)=(0,0,0)$, so $\vec r_1\,'\times\vec r_1\,''=(0,0,0)$ and $\kappa=0/1=0$ — confirming, via direct computation and with NO arc-length step at all, exactly what the parent concept stated qualitatively. For the radius-$2$ circle $\vec r_2(t)=(2\cos t,2\sin t,0)$: $\vec r_2\,'(t)=(-2\sin t,2\cos t,0)$, $|\vec r_2\,'(t)|=2$; $\vec r_2\,''(t)=(-2\cos t,-2\sin t,0)$; the cross product is $\vec r_2\,'\times\vec r_2\,''=(0,0,(-2\sin t)(-2\sin t)-(2\cos t)(-2\cos t))=(0,0,4\sin^2t+4\cos^2t)=(0,0,4)$, so $|\vec r_2\,'\times\vec r_2\,''|=4$ and $|\vec r_2\,'|^3=8$, giving $\kappa=4/8=1/2$ — matching the well-known fact $\kappa=1/\text{radius}$ for a circle, obtained here directly from $t$-derivatives with no reparametrization performed.

**Example 2 (LO1/LO2 — the SAME helix as the parent concept, computed via the direct formula, breaking MC-1)**: For $\vec r(t)=(\cos t,\sin t,t)$ (the parent concept's own helix, where $|\vec r\,'(t)|=\sqrt2$ was already established): $\vec r\,'(t)=(-\sin t,\cos t,1)$, $\vec r\,''(t)=(-\cos t,-\sin t,0)$. The cross product is $\vec r\,'\times\vec r\,''=(\cos t\cdot0-1\cdot(-\sin t),\,1\cdot(-\cos t)-(-\sin t)\cdot0,\,(-\sin t)(-\sin t)-(\cos t)(-\cos t))=(\sin t,-\cos t,1)$, so $|\vec r\,'\times\vec r\,''|=\sqrt{\sin^2t+\cos^2t+1}=\sqrt2$. With $|\vec r\,'(t)|^3=(\sqrt2)^3=2\sqrt2$, this gives $\kappa=\sqrt2/(2\sqrt2)=1/2$ — a CONSTANT curvature obtained entirely from the original $t$-parametrization, with the arc-length substitution that concept's Example 2 performed nowhere in sight.

**Example 3 (LO3 — reparametrization invariance, breaking MC-2)**: Retrace the SAME radius-$2$ circle, but at double speed: $\vec r_3(t)=(2\cos2t,2\sin2t,0)$. Now $\vec r_3\,'(t)=(-4\sin2t,4\cos2t,0)$, $|\vec r_3\,'(t)|=4$; $\vec r_3\,''(t)=(-8\cos2t,-8\sin2t,0)$; the cross product is $(0,0,32\sin^22t+32\cos^22t)=(0,0,32)$, so $|\vec r_3\,'\times\vec r_3\,''|=32$ and $|\vec r_3\,'|^3=64$, giving $\kappa=32/64=1/2$ — IDENTICAL to Example 1's value, even though $|\vec r_3\,'\times\vec r_3\,''|$ itself is $8\times$ larger than Example 1's. The cube in the denominator exactly cancels the extra speed, confirming $\kappa$ is a property of the GEOMETRIC curve, not of how fast it is traced.

**Example 4 (LO3, orientation level, curves vs. surfaces)**: the equator on a sphere is a "geodesic" — a curve that does not turn WITHIN the sphere's surface — yet, computed as an ordinary space curve via this concept's own formula, it has nonzero $\kappa$ (it visibly bends in 3D, tracing a circle). Its **geodesic curvature** (bending tangent to the surface) is zero, while its **normal curvature** (bending into the surface) accounts for the entire nonzero $\kappa$ — the two KG aliases name two DIFFERENT numbers that only appear once a surface is present, not two names for this concept's single $\kappa$.

## Component 5 — Teaching Actions

### Teaching Action A01 — A Computable Formula, No Arc-Length Step Required (Primitive P11: Representation Shift)

State: "curvature is DEFINED as $|dT/ds|$, but you never need to reparametrize by arc length to COMPUTE it — the chain rule converts the definition into a formula built entirely from $\vec r\,'(t)$ and $\vec r\,''(t)$ in whatever parameter you already have." Work Example 1's straight-line and circle verification, and Example 2's helix computation, emphasizing that neither required solving for $s(t)$.

- **MC-1 hook**: ask "to find the curvature of $\vec r(t)=(t^3,t^2,0)$ at $t=1$, do you first need to reparametrize this curve by arc length?" — a "yes" answer reveals MC-1 (believing arc-length reparametrization is a NECESSARY step for every curvature computation, rather than knowing the direct $t$-parameter formula).

### Teaching Action A02 — Curvature Is Invariant Under Reparametrization (Primitive P28: Conflict Evidence)

Present Example 3's direct evidence: retracing the SAME circle at double speed makes $|\vec r\,'\times\vec r\,''|$ eight times larger, yet $\kappa$ comes out identically $1/2$ both times. State: "the cube of the speed in the denominator exactly cancels out how fast you happen to be tracing the curve — curvature belongs to the GEOMETRIC shape, not to the particular parametrization describing it."

- **MC-2 hook**: ask "if I retrace a circle twice as fast, does its curvature value double?" — a "yes" answer reveals MC-2 (believing a larger cross-product magnitude alone signals larger curvature, without accounting for the required division by $|\vec r\,'(t)|^3$).

### Teaching Action A03 — Space Curvature Is Not the Same Number as Geodesic/Normal Curvature (Primitive P06: Contrast Pair)

Contrast Example 4's equator (nonzero space curvature $\kappa$, computed exactly as this concept's formula would give, yet ZERO geodesic curvature since it doesn't turn within the sphere's surface) against a generic space curve with no surface in view at all (where only the single number $\kappa$ this concept defines is meaningful). State: "this concept's own alias list mentions 'geodesic curvature' and 'normal curvature' — those are NOT alternate names for the $\kappa$ you just computed; they are components of a DECOMPOSITION of bending that only exists once a curve is considered as living on a surface, which `math.geom.differential-geometry-surfaces` will construct."

- **MC-3 hook**: ask "are 'geodesic curvature' and 'normal curvature' just two other names for the curvature $\kappa$ this concept computes?" — a "yes" answer reveals MC-3 (treating the KG's alias list as synonyms rather than as names for a surface-relative decomposition).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. Compute $\kappa(t)$ for $\vec r(t)=(3t,4t,0)$ (a straight line traced at nonunit speed) using the formula, and confirm it comes out $0$ as expected for a straight line regardless of parametrization speed.
  2. For the circle $\vec r(t)=(5\cos t,5\sin t,0)$, compute $\kappa$ using the formula and verify it equals $1/5$, the reciprocal of the radius.
  3. Explain, in words and without redoing the full derivation, why $\kappa(t)=|\vec r\,'(t)\times\vec r\,''(t)|/|\vec r\,'(t)|^3$ gives the SAME value no matter which parametrization traces a given geometric curve, referencing Teaching Action A02's evidence.
  4. A car travels along a road modeled by $\vec r(t)=(t,t^2,0)$. Using the curvature formula, determine whether the road turns more sharply at $t=0$ or at $t=2$, and explain what this predicts about how much the driver must turn the steering wheel at each point.
- **P76 (Transfer Probe, mode = independence)**: "A cyclist rides along a path modeled by $\vec r(t)=(t,\sin t,0)$. (a) Using the curvature formula, compute $\kappa$ at $t=0$ and at $t=\pi/2$. (b) Based on your two values, at which point is the cyclist's path turning more sharply, and what does this predict about how hard the cyclist must lean or steer at each point? (c) Without recomputing, explain what would happen to your two $\kappa$ values if the path were instead traced twice as fast (e.g. $\vec r(t)=(2t,\sin2t,0)$), citing the reparametrization-invariance evidence from this lesson."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 4/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | ARC-LENGTH-REQUIRED-FOR-COMPUTATION | Believing curvature can only be computed by first reparametrizing the curve by arc length, missing that the direct formula $\kappa(t)=\|\vec r\,'(t)\times\vec r\,''(t)\|/\|\vec r\,'(t)\|^3$ computes the identical value from ANY parametrization | Foundational |
| MC-2 | CROSS-PRODUCT-MAGNITUDE-ALONE-IS-CURVATURE | Believing a larger $\|\vec r\,'(t)\times\vec r\,''(t)\|$ alone signals larger curvature, ignoring that it must be divided by $\|\vec r\,'(t)\|^3$ — so a faster parametrization of the SAME curve is mistakenly read as more sharply curved | High |
| MC-3 | GEODESIC-NORMAL-CURVATURE-AS-SYNONYMS | Treating this concept's own KG aliases "geodesic curvature" and "normal curvature" as alternate names for the single number $\kappa$ computed here, rather than as components of a surface-relative decomposition that requires a surface to exist | Moderate |

- **B01 (targets MC-1)**: P27 (name it: "Arc-Length Required Assumption") → P41 (detect: ask a student to find $\kappa(t)$ for a new curve and check whether their first step is attempting to solve for and invert $s(t)$) → P64 (conceptual shift: re-walk Example 2's helix computation, re-anchoring on "the chain rule already builds the arc-length conversion into the formula — you never perform it separately").
- **B02 (targets MC-2)**: P27 (name it: "Cross-Product Magnitude Mistaken for Curvature") → P41 (detect: ask a student to compare curvature between two parametrizations of the same circle at different speeds, checking whether they compare $|\vec r\,'\times\vec r\,''|$ directly instead of the full ratio) → P64 (conceptual shift: re-walk Example 3's double-speed circle, re-anchoring on "always divide by $|\vec r\,'(t)|^3$ before comparing curvature values").
- **B03 (targets MC-3)**: P27 (name it: "Geodesic/Normal Curvature Treated as Synonyms") → P41 (detect: ask whether "geodesic curvature" is just another name for $\kappa$, checking for a "yes") → P64 (conceptual shift: re-walk Example 4's equator case, re-anchoring on "space curvature is one number; geodesic and normal curvature are two DIFFERENT numbers that only exist once a surface is present").

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.geom.differential-geometry-curves` (the position vector $\vec r(t)$, unit tangent $T(t)$, arc length, and the qualitative $\kappa=|dT/ds|$ definition — this concept's straight-line, circle, and helix examples are all reused directly from that concept's own worked examples) and `math.calc.derivative-rules` (chain rule, needed to convert $d/ds$ into $d/dt$).
- **Unlocks**: `math.geom.differential-geometry-surfaces` (will decompose this concept's single $\kappa$ into geodesic and normal curvature components once a surface is present — the exact deferred content of LO3/Example 4/MC-3).
- **Cross-link**: KG lists no cross_links for this concept (checked via `ls docs/curriculum/blueprints/` before setting P76_mode — none to check). $P76_{mode}=$ **independence**.

## Component 8 — Teaching Notes

- estimated_hours = 8 with an advanced/analyze tag supports the full "3 TAs + gate" tier used here, with LO1 and LO2 at full computational depth (the derivation and its verification across three parametrizations of essentially two geometric curves) and LO3 kept orientation-level, consistent with this concept's own unlocked child owning the full surface-relative decomposition.
- **Division of labor**: `math.geom.differential-geometry-curves` owns the DEFINITION $\kappa=|dT/ds|$ and the qualitative claim that curvature is local; this concept owns the COMPUTABLE reformulation and its verification, deliberately reusing that concept's exact straight-line and helix examples (rather than introducing new curves) so the entire lesson demonstrates one thing: the new formula reproduces the previously-asserted qualitative results, now by direct computation.
- Example 3's double-speed reparametrization of the same circle was chosen specifically to make the reparametrization-invariance argument concrete and numerically checkable, rather than asserting it abstractly — the $8\times$ growth in the cross-product magnitude exactly canceling against the $8\times$ growth in $|\vec r\,'|^3$ is a fact a learner can verify by hand.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS |
| V-4 | unlocks concepts named accurately from KG | PASS |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (no cross_links listed → independence) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.7×5⌉=4) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Abstract: advanced learner already has $T(t)$ and qualitative $\kappa$; formula introduced directly) |
| V-16 | Worked examples cover all LOs | PASS (Ex1/Ex2→LO1/LO2, Ex3→LO2/reinforcement, Ex4→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
