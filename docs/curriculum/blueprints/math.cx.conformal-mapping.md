# Teaching Blueprint: Conformal Mapping (`math.cx.conformal-mapping`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.cx.conformal-mapping` |
| name | Conformal Mapping |
| domain | Complex Analysis |
| difficulty | expert |
| bloom | apply |
| mastery_threshold | 0.8 → MAMR = ⌈0.8×5⌉ = 4/5 |
| estimated_hours | 6 |
| requires | `math.cx.analytic-functions` |
| unlocks | `math.cx.riemann-mapping` |
| cross_links | none |
| CPA_entry_stage | C (Concrete) — checking a specific holomorphic function's conformality at one point where it holds and one where it fails, before the general theorem | 
| description (KG) | A holomorphic bijection is conformal (angle-preserving) wherever f′≠0. The Jacobian of a conformal map is a rotation-dilation matrix. Used to map complicated domains to simpler ones (disc, upper half-plane) for PDE applications. |

## Component 1 — Learning Objectives

- LO1: Define **conformal** (angle-preserving): a holomorphic function $f$ is conformal at $z_0$ wherever $f'(z_0)\ne0$ — and recognize conformality genuinely FAILS at points where $f'(z_0)=0$, directly refuting the assumption that every holomorphic function is conformal everywhere on its domain.
- LO2: Recognize that near a point where $f'(z_0)\ne0$, the real Jacobian of $f$ (viewed as a map $\mathbb{R}^2\to\mathbb{R}^2$) is genuinely a **rotation-dilation matrix** — of the special form $\begin{pmatrix}a&-b\\b&a\end{pmatrix}$ — a direct structural consequence of the Cauchy-Riemann equations, NOT true of an arbitrary real-differentiable map.
- LO3: Recognize that conformal maps preserve ONLY angles between curves — they generally DISTORT lengths (by the locally varying scale factor $|f'(z)|$) and areas (by $|f'(z)|^2$) — directly refuting the assumption that a conformal map preserves distances or areas as well.

## Component 2 — Prerequisite Check

Assumes mastery of `math.cx.analytic-functions` (holomorphic means complex-differentiable on an open set; holomorphic $\iff$ analytic in $\mathbb{C}$; the sharp single-point-vs-open-set distinction via $f(z)=|z|^2$).

## Component 3 — Core Explanation

**Conformal requires $f'\ne0$ — it is not automatic everywhere**: a holomorphic function $f$ is **conformal** at $z_0$ — meaning it preserves both the magnitude and orientation of angles between curves crossing at $z_0$ — exactly where $f'(z_0)\ne0$. At a point where $f'(z_0)=0$ (a "critical point" of the holomorphic map), conformality genuinely FAILS: angles are no longer preserved, typically getting multiplied by some integer factor greater than $1$.

**The Jacobian of a conformal map is a rotation-dilation matrix**: near a point where $f'(z_0)\ne0$, $f$ acts locally like multiplication by the complex number $f'(z_0)$ — geometrically, a rotation by $\arg(f'(z_0))$ combined with a scaling by $|f'(z_0)|$. Writing $f=u+iv$ and $z=x+iy$, the real $2\times2$ Jacobian $\begin{pmatrix}u_x&u_y\\v_x&v_y\end{pmatrix}$ MUST take the special form $\begin{pmatrix}a&-b\\b&a\end{pmatrix}$ — a direct consequence of the Cauchy-Riemann equations ($u_x=v_y$, $u_y=-v_x$) that holomorphy itself already guarantees. This is a genuine structural restriction: an arbitrary real-differentiable map $\mathbb{R}^2\to\mathbb{R}^2$ has NO such constraint on its Jacobian (it could stretch the $x$- and $y$-directions by completely different amounts) — only a holomorphic map's Jacobian is forced into this rotation-dilation form.

**Angles preserved, but lengths and areas are not**: since $f$ acts locally like multiplication by $f'(z_0)$, a conformal map preserves the ANGLE between any two curves crossing at $z_0$ exactly — but it scales lengths locally by the factor $|f'(z_0)|$, and areas by $|f'(z_0)|^2$. A conformal map is angle-preserving, not distance-preserving or area-preserving; these are genuinely different properties.

## Component 4 — Worked Examples

**Example 1 (LO1 — conformal away from a critical point, failing at it, breaking MC-1)**: For $f(z)=z^2$, $f'(z)=2z$. At $z_0=0$: $f'(0)=0$ — conformality FAILS here. Concretely, two rays from the origin at angles $\theta_1,\theta_2$ map under $f(z)=z^2$ to rays at angles $2\theta_1,2\theta_2$ — the angle BETWEEN them, $\theta_2-\theta_1$, DOUBLES to $2(\theta_2-\theta_1)$ under the map, a direct violation of angle-preservation. At $z_0=1$, however, $f'(1)=2\ne0$ — conformal there, by the general theorem: any two curves crossing at $z=1$ have their angle of intersection preserved exactly under $f$.

**Example 2 (LO2 — the Jacobian is genuinely a rotation-dilation matrix, breaking MC-2)**: Writing $f(z)=z^2=(x^2-y^2)+i(2xy)$, so $u(x,y)=x^2-y^2$, $v(x,y)=2xy$. At $z_0=x_0+iy_0$: $u_x=2x_0$, $u_y=-2y_0$, $v_x=2y_0$, $v_y=2x_0$. The Jacobian is $\begin{pmatrix}2x_0&-2y_0\\2y_0&2x_0\end{pmatrix}$ — exactly of the form $\begin{pmatrix}a&-b\\b&a\end{pmatrix}$ with $a=2x_0,b=2y_0$. Checking the scaling factor: $\sqrt{a^2+b^2}=\sqrt{4x_0^2+4y_0^2}=2|z_0|$, matching $|f'(z_0)|=|2z_0|=2|z_0|$ exactly — confirming the Jacobian's rotation-dilation structure is directly forced by $f$'s own derivative, via the Cauchy-Riemann equations.

**Example 3 (LO3 — angles preserved, lengths and areas scaled, breaking MC-3)**: At $z_0=1$ (where $f(z)=z^2$ is conformal, $f'(1)=2$): a small region near $z=1$ maps to a region near $f(1)=1$, with lengths locally stretched by a factor $|f'(1)|=2$, and areas by $|f'(1)|^2=4$. So while the ANGLE between any two curves crossing at $z=1$ is preserved EXACTLY, the LENGTHS of those curves near $z=1$ and the AREA of any small region there are both genuinely distorted — a factor of $2$ for lengths, a factor of $4$ for area — demonstrating conformality is specifically about angles, not distances or areas.

## Component 5 — Teaching Actions

### Teaching Action A01 — Conformality Fails Exactly Where f'=0 (Primitive P28: Conflict Evidence)

Present Example 1's direct evidence: $f(z)=z^2$ doubles angles at $z=0$ (where $f'(0)=0$), yet preserves angles at $z=1$ (where $f'(1)=2\ne0$). State: "conformality is not automatic just because a function is holomorphic — it specifically requires $f'(z_0)\ne0$ at the point in question, and fails precisely where the derivative vanishes."

- **MC-1 hook**: ask "is every holomorphic function conformal everywhere on its domain?" — a "yes" answer reveals MC-1 (missing that conformality fails at points where $f'=0$).

### Teaching Action A02 — The Jacobian Must Be a Rotation-Dilation Matrix (Primitive P11: Representation Shift)

State: "holomorphy forces the Cauchy-Riemann equations, and those equations force the real Jacobian into the specific rotation-dilation form $\begin{pmatrix}a&-b\\b&a\end{pmatrix}$ — a genuine structural restriction no arbitrary real-differentiable map has to obey." Work Example 2's full computation, verifying the Jacobian's special form and matching scaling factor.

- **MC-2 hook**: ask "could a conformal map's local Jacobian be any arbitrary 2x2 real matrix, stretching x and y differently?" — a "yes" answer reveals MC-2 (missing that holomorphy forces the Jacobian into the specific rotation-dilation form).

### Teaching Action A03 — Angles Preserved, Lengths and Areas Are Not (Primitive P06: Contrast Pair)

Contrast Example 3's exact angle preservation at $z=1$ against the genuine length-scaling (factor $2$) and area-scaling (factor $4$) at that same point. State: "conformal specifically means angle-preserving — it says nothing about preserving distances or areas, which a conformal map is free to (and generally does) distort."

- **MC-3 hook**: ask "does a conformal map preserve lengths and areas, in addition to angles?" — a "yes" answer reveals MC-3 (missing that conformal maps preserve only angles, generally distorting lengths and areas).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. For $f(z)=z^3$, find all points where conformality fails.
  2. For $f(z)=e^z$, explain why this function is conformal at every point of $\mathbb{C}$ (referencing $f'(z)=e^z$).
  3. For $f(z)=z^2$ at $z_0=2$, compute the Jacobian and verify it has the rotation-dilation form, matching the expected scaling factor $|f'(2)|$.
  4. Explain why a conformal map at a given point can still distort the area of a small region there, despite preserving all angles exactly.
- **P76 (Transfer Probe, mode = independence)**: "An engineer wants to solve a heat-flow (PDE) problem on an irregularly shaped metal plate by first mapping it conformally to a simple disc, solving the easier problem there, and mapping the solution back. (a) Explain why using a conformal map (rather than an arbitrary smooth map) is important for correctly transferring angle-dependent boundary conditions from the disc back to the original irregular plate. (b) The engineer's conformal map has a point where its derivative vanishes, right in the middle of the plate. Explain what practical problem this could cause for the mapping near that specific point. (c) The engineer notices that distances measured on the original plate don't match distances on the mapped disc, even far from any critical point. Explain why this is expected and not a sign of an error in the conformal map."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 4/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | HOLOMORPHIC-ASSUMED-CONFORMAL-EVERYWHERE | Believing every holomorphic function is conformal at every point of its domain, missing that conformality specifically fails where f'=0 | Foundational |
| MC-2 | CONFORMAL-JACOBIAN-ASSUMED-ARBITRARY | Believing a conformal map's local Jacobian could be any arbitrary real 2x2 matrix, missing that holomorphy forces it into the specific rotation-dilation form | Foundational |
| MC-3 | CONFORMAL-ASSUMED-TO-PRESERVE-LENGTHS-AND-AREAS | Believing a conformal map preserves distances or areas in addition to angles, missing that it generally distorts both, preserving only angles | Foundational |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 (name it: "Holomorphic Assumed Conformal Everywhere") → P41 (detect: ask a student whether a holomorphic function is conformal at every point, and check for a "yes") → P64 (conceptual shift: re-walk Example 1's angle-doubling at $z=0$ versus angle-preservation at $z=1$, re-anchoring on "conformality genuinely requires $f'\ne0$ — it fails exactly at critical points").
- **B02 (targets MC-2)**: P27 (name it: "Conformal Jacobian Assumed Arbitrary") → P41 (detect: ask a student whether a conformal map's Jacobian could be any 2x2 matrix, and check for a "yes") → P64 (conceptual shift: re-walk Example 2's explicit Cauchy-Riemann-derived Jacobian computation, re-anchoring on "holomorphy forces this exact rotation-dilation structure — it's not a coincidence, it's a direct consequence of $f'$ existing").
- **B03 (targets MC-3)**: P27 (name it: "Conformal Assumed to Preserve Lengths and Areas") → P41 (detect: ask a student whether a conformal map preserves distances or areas, and check for a "yes") → P64 (conceptual shift: re-walk Example 3's exact angle preservation alongside the genuine length/area distortion at the same point, re-anchoring on "conformal means angle-preserving specifically — nothing more").

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.cx.analytic-functions` (holomorphic/analytic definitions this concept's conformality condition is built directly on top of).
- **Unlocks**: `math.cx.riemann-mapping` (the Riemann Mapping Theorem guarantees a conformal map exists between any simply connected proper subset of $\mathbb{C}$ and the unit disc — building directly on this concept's machinery).
- **Cross-link**: KG lists no cross-links for this concept.

## Component 8 — Teaching Notes

- estimated_hours = 6 with an expert/apply tag places this at a "3 TAs + gate" tier — A01 (conformality's precise failure condition), A02 (the forced rotation-dilation Jacobian structure), and A03 (angles preserved, lengths/areas not) each target a distinct LO, appropriate for a concept whose core content is one precise geometric property with two important structural consequences.
- All three worked examples deliberately reuse the SAME function, $f(z)=z^2$, evaluated at different points ($z_0=0$ for the failure case, $z_0=1$ and a general $z_0$ for the success cases) — letting one simple, fully computable holomorphic function carry the failure demonstration, the Jacobian-structure verification, and the length/area distortion illustration, rather than introducing fresh functions for each objective.
- Example 1's angle-doubling at $z=0$ under $f(z)=z^2$ is the standard textbook illustration of conformality failure at a critical point (appearing in essentially every complex analysis course), chosen for the same reason this corpus favors canonical field examples for genuinely delicate points.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS |
| V-4 | unlocks concepts named accurately from KG | PASS |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (empty in KG → independence) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.8×5⌉=4) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Concrete: specific success/failure points checked before the general theorem) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
