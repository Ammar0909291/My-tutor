# Teaching Blueprint: Curves in Space (`math.geom.differential-geometry-curves`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.geom.differential-geometry-curves` |
| name | Curves in Space |
| domain | Geometry |
| difficulty | advanced |
| bloom | analyze |
| mastery_threshold | 0.7 → MAMR = ⌈0.7×5⌉ = 4/5 |
| estimated_hours | 12 |
| requires | `math.calc.parametric-curves`, `math.geom.vectors-3d` |
| unlocks | `math.geom.differential-geometry-surfaces` |
| cross_links | none |
| CPA_entry_stage | A (Abstract) — advanced learner already fluent in 2D parametrization and 3D vector components; the vector-valued position function $\vec r(t)$ is introduced directly as the natural fusion of both prerequisites |
| description (KG) | Smooth curves in ℝⁿ studied via their parametrization; local geometry described by curvature κ and torsion τ via the Frenet-Serret apparatus. |

## Component 1 — Learning Objectives

- LO1: Represent a space curve as a **vector-valued position function** $\vec r(t) = (x(t),y(t),z(t))$ — directly fusing `math.calc.parametric-curves`' $(x(t),y(t))$ tracing with `math.geom.vectors-3d`'s $(a,b,c)$ component vectors into a single moving-point object — and compute the **velocity vector** $\vec r\,'(t)$ and the **unit tangent vector** $T(t)=\vec r\,'(t)/|\vec r\,'(t)|$, correctly distinguishing the two (the velocity vector's length is the curve's SPEED at $t$, which is generally NOT $1$; only $T(t)$ is normalized).
- LO2: Compute **arc length** $L=\int_a^b|\vec r\,'(t)|\,dt$ over a parameter interval, and explain what it means to **reparametrize by arc length** $s$ — obtaining $\vec r(s)$ with $|d\vec r/ds|\equiv1$ everywhere — as a genuine change of variables (solving $s(t)=\int_a^{t}|\vec r\,'(u)|\,du$ and inverting), not merely relabeling the existing parameter $t$ as $s$.
- LO3 (orientation level — full computational depth deferred to the dedicated child concepts `math.geom.curvature` and `math.geom.frenet-serret`): recognize **curvature** $\kappa = |dT/ds|$ as a LOCAL, pointwise measure of how sharply the curve turns (large $\kappa$ = tight turn, $\kappa=0$ = locally straight), and recognize the **Frenet-Serret frame** $(T,N,B)$ — unit tangent, principal normal, binormal — as the moving frame whose rate of twist out of the $(T,N)$-plane defines **torsion** $\tau$, without yet deriving the full Frenet-Serret differential equations.

## Component 2 — Prerequisite Check

Assumes mastery of `math.calc.parametric-curves` ($(x(t),y(t))$ parametrization, tracking direction of increasing $t$, recognizing that eliminating the parameter loses direction/range information) and `math.geom.vectors-3d` (component vectors $(a,b,c)$, magnitude $|(a,b,c)|=\sqrt{a^2+b^2+c^2}$, dot and cross products, unit vectors $\hat u = u/|u|$).

## Component 3 — Core Explanation

**The position vector fuses both prerequisites**: a space curve is described by a vector-valued function $\vec r(t) = (x(t),y(t),z(t))$ — exactly `math.calc.parametric-curves`' idea of tracing a path as $t$ increases, now written with `math.geom.vectors-3d`'s component-vector notation, and with a third coordinate function $z(t)$ added the same way that concept added a $z$-component to a static point. Differentiating component-by-component gives the **velocity vector** $\vec r\,'(t) = (x'(t),y'(t),z'(t))$, which points in the curve's instantaneous direction of travel. Its magnitude $|\vec r\,'(t)| = \sqrt{x'(t)^2+y'(t)^2+z'(t)^2}$ (the 3D magnitude formula from `math.geom.vectors-3d`) is the curve's **speed** at that instant — a number that generally changes with $t$ and is generally NOT $1$. The **unit tangent vector** $T(t) = \vec r\,'(t)/|\vec r\,'(t)|$ normalizes away the speed, keeping only the pure DIRECTION of travel — exactly `math.geom.vectors-3d`'s unit-vector construction $\hat u = u/|u|$ applied to the velocity vector.

**Arc length as an integral, and reparametrization as a genuine change of variables**: the total distance traveled along the curve from $t=a$ to $t=b$ is $L = \int_a^b |\vec r\,'(t)|\,dt$ — summing infinitesimal speed-times-time slices, the same "integrate the speed" idea used for distance traveled along any path. Defining $s(t) = \int_a^t |\vec r\,'(u)|\,du$ gives arc length ACCUMULATED so far as a function of $t$; since $s'(t)=|\vec r\,'(t)|>0$ (assuming the curve never stops), $s(t)$ is invertible, and substituting $t=t(s)$ back into $\vec r$ gives the **arc-length parametrization** $\vec r(s)$. This is a real computation (solve for $s(t)$, then invert it), not a cosmetic renaming of $t$ to $s$ — and it comes with a genuine payoff: differentiating $\vec r(s)$ with respect to $s$ ALWAYS gives a unit vector, $|d\vec r/ds| \equiv 1$, by the chain rule ($d\vec r/ds = (d\vec r/dt)(dt/ds) = \vec r\,'(t)/|\vec r\,'(t)| = T$), because $s$ measures actual distance traveled, so moving one unit of $s$ moves exactly one unit of distance, at unit speed, by construction.

**Curvature and torsion as LOCAL geometry (orientation level)**: once a curve is parametrized by arc length, its **curvature** $\kappa(s) = |dT/ds|$ measures how fast the unit tangent direction turns per unit distance traveled — a genuinely LOCAL quantity, computed and potentially different at every point along the curve, not one global number describing the whole curve at once (a straight line has $\kappa\equiv0$ everywhere; a tighter circle has larger constant $\kappa$ than a gentler one). The **Frenet-Serret frame** extends $T$ with a **principal normal** $N = (dT/ds)/|dT/ds|$ (the direction the tangent is turning toward) and a **binormal** $B = T\times N$ (perpendicular to both, using `math.geom.vectors-3d`'s cross product), giving a moving 3D coordinate frame that travels along the curve. The **torsion** $\tau$ measures how fast this frame twists OUT of the flat $(T,N)$-plane — a genuinely 3D phenomenon with no 2D analogue, since a 2D curve's Frenet frame never leaves its own plane at all. The full differential system relating $T,N,B$'s rates of change to $\kappa$ and $\tau$ (the Frenet-Serret formulas) is the dedicated subject of `math.geom.frenet-serret`; this concept introduces the CONCEPTS of $\kappa$ and $\tau$ as local, computable, physically meaningful quantities, deferring their full derivation and computational formulas to that child concept and to `math.geom.curvature`.

## Component 4 — Worked Examples

**Example 1 (LO1 — velocity, speed, and unit tangent for a helix)**: For $\vec r(t) = (\cos t, \sin t, t)$ (a helix), $\vec r\,'(t) = (-\sin t, \cos t, 1)$. Its speed is $|\vec r\,'(t)| = \sqrt{\sin^2t+\cos^2t+1} = \sqrt{1+1}=\sqrt2$ — CONSTANT, but NOT equal to $1$. The unit tangent is $T(t) = \vec r\,'(t)/\sqrt2 = (-\sin t/\sqrt2,\cos t/\sqrt2, 1/\sqrt2)$, which genuinely has magnitude $1$ (check: $\sin^2t/2+\cos^2t/2+1/2 = 1/2+1/2=1$ ✓) — directly illustrating that the velocity vector and the unit tangent are two DIFFERENT vectors, related by dividing out the (here constant, but not $1$) speed.

**Example 2 (LO2 — arc length and reparametrization, breaking MC-2)**: For the same helix on $t\in[0,2\pi]$, arc length is $L=\int_0^{2\pi}\sqrt2\,dt = 2\pi\sqrt2$ (speed is constant here, so the integral is trivial). Since $s(t) = \int_0^t\sqrt2\,du = \sqrt2\,t$, inverting gives $t = s/\sqrt2$. Substituting back: $\vec r(s) = (\cos(s/\sqrt2),\sin(s/\sqrt2), s/\sqrt2)$. Checking: $d\vec r/ds = (-\sin(s/\sqrt2)/\sqrt2,\cos(s/\sqrt2)/\sqrt2, 1/\sqrt2)$, whose magnitude is $\sqrt{(1/2)\sin^2+(1/2)\cos^2+1/2} = \sqrt{1/2+1/2}=1$ ✓ — exactly $1$, confirming the reparametrization genuinely required solving for and substituting $t=s/\sqrt2$, not simply writing "$\vec r(s)=(\cos s,\sin s,s)$" (which a bare relabeling would incorrectly suggest, and which would NOT have unit speed: $|\vec r\,'(s)|$ would still be $\sqrt2$, not $1$).

**Example 3 (LO3 — curvature as local, breaking MC-3, orientation level)**: Compare a straight line $\vec r_1(t)=(t,0,0)$ (constant direction, $T$ never changes, so $\kappa\equiv0$ at every point) against a circle of radius $2$, $\vec r_2(t)=(2\cos t, 2\sin t, 0)$ (the tangent direction rotates steadily, giving a constant nonzero $\kappa$ at every point — smaller than the curvature of a radius-$1$ circle, whose tangent direction rotates through the same angle over a shorter arc length). Neither curve has ONE global curvature "value" describing it loosely — each has a curvature that is evaluated POINT BY POINT (constant in these two special symmetric cases, but generally varying, e.g. along the helix's own tightening or loosening if its radius were not constant).

## Component 5 — Teaching Actions

### Teaching Action A01 — Velocity Is Not Automatically Unit Speed (Primitive P11: Representation Shift)

State: "the position vector $\vec r(t)$ fuses everything you already know: `math.calc.parametric-curves`' idea of tracing a path in order, plus `math.geom.vectors-3d`'s component vectors with a $z$-coordinate added — differentiate component-by-component, and you get the velocity vector, whose LENGTH is the speed, not automatically $1$." Work Example 1's full computation.

### Teaching Action A02 — Arc-Length Reparametrization Is a Real Computation, Not a Relabeling (Primitive P28: Conflict Evidence)

Present Example 2's direct evidence: substituting $t=s/\sqrt2$ genuinely produces $|d\vec r/ds|=1$, while the "just rename $t$ to $s$" shortcut ($\vec r(s)=(\cos s,\sin s,s)$) does NOT — its derivative still has magnitude $\sqrt2$. State: "reparametrizing by arc length means SOLVING for how far along the curve you are at each $t$, then substituting that back in — the payoff is that differentiating with respect to $s$ always gives unit speed, but only if you actually did the substitution."

- **MC-2 hook**: ask "if I just replace every $t$ with $s$ in $\vec r(t)=(\cos t,\sin t,t)$, is $\vec r(s)$ now the arc-length parametrization?" — a "yes" answer reveals MC-2 (treating reparametrization as cosmetic relabeling rather than a genuine change of variables via $s(t)=\int|\vec r\,'|\,dt$ and its inverse).

### Teaching Action A03 — Curvature Is Local, Not a Single Global Number (Primitive P06: Contrast Pair)

Contrast Example 3's straight line ($\kappa\equiv0$ everywhere — the tangent direction never turns) against the radius-$2$ circle (constant nonzero $\kappa$ at every point, smaller than a tighter circle's). State: "curvature is evaluated AT A POINT, using how fast the unit tangent is turning right there per unit distance traveled — a curve is allowed to be more curved in one place and straighter in another; these two examples just happen to have the SAME curvature value everywhere along themselves, by their own symmetry, not because curvature is inherently a single global number."

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. For $\vec r(t) = (t^2, t, 0)$, compute $\vec r\,'(t)$, the speed $|\vec r\,'(t)|$, and the unit tangent $T(t)$ at $t=1$.
  2. Set up (but do not necessarily fully evaluate) the arc-length integral $L=\int_0^1|\vec r\,'(t)|\,dt$ for the curve in problem 1, and explain in words what reparametrizing this curve by arc length would require solving for.
  3. Explain why a straight line has curvature $\kappa=0$ at every point, referencing what happens to the unit tangent vector $T$ as you move along it.
  4. A roller coaster track is modeled as a space curve. Explain, using the concept of curvature as a LOCAL quantity, why two different points on the same track can feel like "gentle" and "sharp" turns to a rider, even though it's a single continuous curve.
- **P76 (Transfer Probe, mode = independence)**: "A robotic arm's fingertip traces a path $\vec r(t)=(3\cos t, 3\sin t, 0.5t)$ (a helix of radius $3$) while welding along a spiral seam. (a) Compute the fingertip's velocity vector and speed at a general time $t$. (b) Explain what it would mean, physically, for the arm's CONTROL software to reparametrize this path by arc length instead of by $t$ — specifically, why a welding robot's software might prefer to command motion in terms of \"distance traveled\" rather than \"time elapsed.\" (c) Without computing an exact formula, explain qualitatively how you'd expect the curvature of this helix to compare to the curvature of a flat circle of the same radius $3$ (i.e., the same helix with its $z$-component removed) — is the helix's turn as sharp, sharper, or gentler, and why might the vertical rise affect this?"
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 4/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | VELOCITY-VECTOR-ASSUMED-UNIT-SPEED | Believing the velocity vector $\vec r\,'(t)$ is automatically a unit vector, conflating it with the unit tangent $T(t)$, and skipping the normalization step | Foundational |
| MC-2 | ARC-LENGTH-REPARAMETRIZATION-TREATED-AS-RELABELING | Believing reparametrizing a curve by arc length $s$ is just substituting the symbol $s$ for $t$, missing that it requires solving $s(t)=\int|\vec r\,'(u)|\,du$ and inverting it | Foundational |
| MC-3 | CURVATURE-TREATED-AS-ONE-GLOBAL-NUMBER | Treating curvature as a single overall property describing an entire curve, rather than a pointwise (local) quantity that can vary from point to point along the same curve | Moderate |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 (name it: "Velocity Assumed Unit Speed") → P41 (detect: ask a student to state the speed of $\vec r(t)=(\cos t,\sin t,t)$ and check whether they answer "$1$" without computing $|\vec r\,'(t)|$) → P64 (conceptual shift: re-walk Example 1's explicit magnitude computation $|\vec r\,'(t)|=\sqrt2\ne1$, re-anchoring on "differentiate first, THEN divide by the magnitude to get a unit vector — the velocity vector itself carries no such guarantee").
- **B02 (targets MC-2)**: P27 (name it: "Arc-Length Reparametrization Treated as Relabeling") → P41 (detect: ask a student to reparametrize a simple curve by arc length and check whether they merely swap the letter $t$ for $s$ without solving $s(t)$ and inverting) → P64 (conceptual shift: re-walk Example 2's explicit substitution $t=s/\sqrt2$ and the verification that only this substitution yields $|d\vec r/ds|=1$, re-anchoring on "arc-length reparametrization is a real change of variables with a checkable payoff — unit speed — not a cosmetic rename").
- **B03 (targets MC-3)**: P27 (name it: "Curvature Treated as One Global Number") → P41 (detect: ask a student whether a single curve can have different curvature values at different points, and check for a "no, curvature is just one number for the whole curve" answer) → P64 (conceptual shift: re-walk Example 3's straight-line-vs-circle contrast, re-anchoring on "curvature is evaluated AT A POINT using the local rate of turning of the tangent — the same curve can be tighter in one place and straighter in another").

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.calc.parametric-curves` (2D parametrization, tracking direction of increasing $t$ — extended here to $(x(t),y(t),z(t))$), `math.geom.vectors-3d` (component vectors, 3D magnitude, dot/cross products — supplying every computational tool this concept applies to a moving point).
- **Unlocks**: `math.geom.differential-geometry-surfaces` (extends curves' local-geometry apparatus — curvature, moving frames — to 2D surfaces embedded in $\mathbb{R}^3$).
- **Cross-link**: KG lists no cross-links for this concept.
- **KG hierarchy note (not a `requires`/`unlocks`/`cross_links` relationship, but relevant to scope)**: the KG lists `math.geom.curvature` and `math.geom.frenet-serret` as this concept's `children` — neither is authored yet. This blueprint deliberately treats curvature, torsion, and the Frenet-Serret frame at ORIENTATION level (LO3), reserving the full computational derivations (the Frenet-Serret differential equations, the determinant/cross-product curvature formula) for those two dedicated child concepts when authored, rather than duplicating that depth here.

## Component 8 — Teaching Notes

- estimated_hours = 12 with an advanced/analyze tag places this among the corpus's larger concepts; scope was deliberately bounded by the KG's own `children` structure (`math.geom.curvature`, `math.geom.frenet-serret` as separate future concepts) — LO1-LO2 (position vector, velocity/speed/unit tangent, arc length and its genuine reparametrization) are taught to full worked-example depth, since they belong wholly to THIS concept, while LO3 (curvature/torsion/Frenet-Serret) is deliberately orientation-level, per the established large-scope precedent (`math.cat.limits`, `math.nt.analytic-number-theory`, `math.fnal.banach-space`, `math.de.pde`, `math.fnal.hilbert-space`, `math.de.laplace-equation`, `math.cat.adjunction`) — here applied forward-looking (to not-yet-authored children) rather than backward (to an already-authored concept).
- This is the first concept in the corpus whose position vector genuinely FUSES both a `math.calc.*` prerequisite (parametrization) and a `math.geom.*` prerequisite (3D vectors) into a single new object rather than extending one primary prerequisite with a secondary supporting one — Component 3's opening paragraph makes this fusion explicit rather than treating either prerequisite as merely "background."
- Example 1's helix was chosen deliberately for CONSTANT (but non-unit) speed $\sqrt2$ — strong enough to break MC-1 (speed isn't automatically $1$) while still being simple enough that Example 2 can complete the full arc-length reparametrization by hand, which would be intractable for a curve with non-constant speed.

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
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.7×5⌉=4) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Abstract: advanced learner, direct fusion of two mastered prerequisites) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
