# Teaching Blueprint: Harmonic Functions (`math.de.harmonic-functions`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.de.harmonic-functions` |
| name | Harmonic Functions |
| domain | Differential Equations |
| difficulty | expert |
| bloom | analyze |
| mastery_threshold | 0.75 → MAMR = ⌈0.75×5⌉ = 4/5 |
| estimated_hours | 5 |
| requires | `math.de.laplace-equation` |
| unlocks | none |
| cross_links | `math.cx.analytic-functions` (**authored**), `math.cx.cauchy-riemann` (**authored**) — both verified via `ls`; P76_mode = cross-link probe engaging BOTH, see Component 7 |
| CPA_entry_stage | A (Abstract) — expert learner already has the mean value property and maximum principle stated at orientation level in `math.de.laplace-equation`; this concept gives them full depth plus the complex-analysis connection |
| description (KG) | Functions satisfying ∇²u=0. Key properties: mean value property (value at a point equals average over any surrounding sphere/circle), maximum/minimum principle (extrema only on boundary), uniqueness of Dirichlet problem. |

## Component 1 — Learning Objectives

- LO1 (full depth — orientation-only in the parent `math.de.laplace-equation`): state and verify the **mean value property** in full — a harmonic function's value at any point equals the average of its values on any circle centered there and lying within the domain — and derive the **maximum/minimum principle** as its direct consequence (an interior value strictly exceeding every value on a surrounding circle would contradict being that circle's own average).
- LO2 (new content beyond the parent): state and apply the **uniqueness of the Dirichlet problem** — two harmonic functions on a bounded region that agree on the ENTIRE boundary must be identical throughout the interior — derived by applying the maximum/minimum principle to their difference (itself harmonic, and zero on the boundary).
- LO3 (cross-link probe, engaging `math.cx.analytic-functions` and `math.cx.cauchy-riemann`): recognize that the real and imaginary parts of ANY holomorphic function are automatically harmonic, derived directly from the Cauchy-Riemann equations (`math.cx.cauchy-riemann`) together with the guarantee that a holomorphic function's components have continuous mixed partials (`math.cx.analytic-functions`) — a genuine cross-subject source of harmonic functions requiring no separate verification.

## Component 2 — Prerequisite Check

Assumes mastery of `math.de.laplace-equation` ($\nabla^2u=u_{xx}+u_{yy}=0$; harmonic functions as steady-state/equilibrium solutions; separation of variables on a rectangle; the mean value property and maximum principle already NAMED there at orientation level, without full derivation).

## Component 3 — Core Explanation

**The mean value property, stated precisely**: for $u$ harmonic on a domain containing the closed disk of radius $r$ around $z_0$, $u(z_0) = \dfrac1{2\pi}\displaystyle\int_0^{2\pi}u(z_0+r e^{i\theta})\,d\theta$ — the value at the CENTER exactly equals the average of the values on ANY surrounding circle, not merely approximately or only for special functions. This is an exact identity for every harmonic function and every valid circle.

**The maximum/minimum principle as a direct consequence**: if $u$'s maximum over a bounded region occurred at an INTERIOR point $z_0$, then every point on a small circle around $z_0$ would have a value $\le u(z_0)$ — but the mean value property forces $u(z_0)$ to equal the AVERAGE of those surrounding values, which is only possible if the surrounding values are all exactly $u(z_0)$ too (an average cannot exceed its constituents unless they're all equal to it). Repeating this argument shows $u$ must be constant on any region where an interior maximum occurs — so a genuinely non-constant harmonic function's maximum (and, by the same argument applied to $-u$, its minimum) can ONLY occur on the boundary.

**Uniqueness of the Dirichlet problem**: given two harmonic functions $u_1,u_2$ on a bounded region, both satisfying the SAME boundary values, let $w=u_1-u_2$ — harmonic (the Laplacian is linear) and identically zero on the entire boundary. By the maximum/minimum principle, $w$'s maximum and minimum both occur on the boundary, where $w\equiv0$ — so $\max w=\min w=0$ throughout the closed region, forcing $w\equiv0$ everywhere, i.e. $u_1\equiv u_2$. A solution to the Dirichlet problem, if one exists, is therefore the ONLY solution with that boundary data.

**Harmonic functions from holomorphic functions, for free (the cross-link)**: if $f=u+iv$ is holomorphic, the Cauchy-Riemann equations (`math.cx.cauchy-riemann`) give $u_x=v_y$ and $u_y=-v_x$. Differentiating the first with respect to $x$: $u_{xx}=v_{yx}$. Differentiating the second with respect to $y$: $u_{yy}=-v_{xy}$. Since $f$ is holomorphic, its real and imaginary parts have continuous second partial derivatives (`math.cx.analytic-functions`'s guarantee of infinite differentiability), so $v_{yx}=v_{xy}$ by equality of mixed partials — giving $u_{xx}+u_{yy}=v_{yx}-v_{xy}=0$. The identical argument (differentiating the other way) shows $v$ is harmonic too. Every holomorphic function's real AND imaginary parts are therefore automatically, guaranteed harmonic — no separate Laplacian check is ever needed once holomorphicity is established.

## Component 4 — Worked Examples

**Example 1 (LO1 — the mean value property, verified exactly, breaking MC-1)**: $u(x,y)=x^2-y^2$ is harmonic ($u_{xx}=2$, $u_{yy}=-2$, sum $=0$). Around the origin with radius $r$: $u(r\cos\theta,r\sin\theta)=r^2\cos^2\theta-r^2\sin^2\theta=r^2\cos2\theta$. The average over a full period: $\dfrac1{2\pi}\int_0^{2\pi}r^2\cos2\theta\,d\theta = 0$ (since $\cos2\theta$ integrates to zero over a full period) — EXACTLY matching $u(0,0)=0^2-0^2=0$, confirming the mean value property as an exact identity, not an approximation.

**Example 2 (LO2 — uniqueness of the Dirichlet problem, via the maximum principle on the difference)**: Suppose $u_1,u_2$ are both harmonic on the unit disk and both equal $\sin\theta$ on the entire boundary circle $|z|=1$. Let $w=u_1-u_2$: harmonic (linearity of $\nabla^2$) and $w=0$ everywhere on the boundary. By the maximum/minimum principle, $w$'s max and min over the closed disk occur on the boundary, where $w\equiv0$ — forcing $\max w=\min w=0$ throughout, hence $w\equiv0$ everywhere and $u_1\equiv u_2$. Agreement on the boundary ALONE — no interior information needed — forces full agreement.

**Example 3 (LO3 — cross-link probe, harmonic functions from a holomorphic function, breaking MC-3)**: $f(z)=z^2=(x+iy)^2$, with $u=x^2-y^2$ and $v=2xy$. Verify holomorphicity via `math.cx.cauchy-riemann`'s equations: $u_x=2x$, $v_y=2x$ ($u_x=v_y$ ✓); $u_y=-2y$, $v_x=2y$, so $-v_x=-2y=u_y$ ✓ — CR holds everywhere, confirming $f$ is holomorphic (in fact entire). By the derivation above (using `math.cx.analytic-functions`'s continuous-mixed-partials guarantee), BOTH $u=x^2-y^2$ and $v=2xy$ must be harmonic — and indeed $u$ is EXACTLY Example 1's function (not a coincidence: $u=\mathrm{Re}(z^2)$), while $v_{xx}+v_{yy}=0+0=0$ confirms $v$ too. Picking any holomorphic function certifies both its real and imaginary parts as harmonic, with zero extra verification work.

## Component 5 — Teaching Actions

### Teaching Action A01 — The Mean Value Property Is Exact, Not Approximate (Primitive P11: Representation Shift)

State: "the value at the center doesn't just resemble the surrounding average — it EQUALS it, exactly, for every harmonic function on every valid circle." Work Example 1's full integral computation, confirming the average comes out to precisely $0$, matching $u(0,0)$ exactly.

- **MC-1 hook**: ask "does the mean value property hold exactly for every harmonic function and every circle, or is it only an approximation that improves for small circles?" — an "approximation" answer reveals MC-1 (believing the property is asymptotic rather than an exact identity).

### Teaching Action A02 — Boundary Agreement Alone Forces Interior Agreement (Primitive P28: Conflict Evidence)

Present Example 2's direct evidence: $w=u_1-u_2$ is forced to be identically zero throughout the ENTIRE disk, using only the fact that it vanishes on the boundary — no interior data was ever supplied or needed. State: "the maximum principle applied to the difference is what does this — since $w$'s extremes can only live on the boundary, and the boundary is entirely zero, $w$ has nowhere left to be nonzero."

- **MC-2 hook**: ask "to confirm two harmonic functions are identical throughout a region, do you need to check their values at interior points too, or is boundary agreement alone sufficient?" — a "yes, interior points needed too" answer reveals MC-2 (missing that boundary agreement alone, via the maximum principle, is already sufficient).

### Teaching Action A03 — Holomorphic Functions Are a Free Source of Harmonic Functions (Primitive P06: Contrast Pair)

Contrast treating harmonic functions as an unrelated, standalone class (requiring their own from-scratch Laplacian verification every time, as in Examples 1–2) against Example 3's evidence that ANY holomorphic function's real and imaginary parts arrive "pre-certified" harmonic via the Cauchy-Riemann-based derivation. State: "you don't need a new harmonic function from nowhere — take any function you already know is holomorphic, and both of its component functions are automatically harmonic, for free."

- **MC-3 hook**: ask "are harmonic functions and holomorphic functions two separate, unrelated topics, or is there a direct structural connection between them?" — an "unrelated" answer reveals MC-3 (missing that holomorphicity, via Cauchy-Riemann, automatically produces harmonic functions).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. Verify the mean value property for $u(x,y)=xy$ (confirm it's harmonic first) at the origin over a circle of radius $r$, by computing the average of $u(r\cos\theta,r\sin\theta)$ over $\theta\in[0,2\pi]$ and comparing to $u(0,0)$.
  2. Two harmonic functions on the unit disk both equal $\cos2\theta$ on the boundary circle. Using the maximum principle applied to their difference, explain why they must be identical throughout the disk.
  3. Verify that $v=2xy$ (the imaginary part of $z^2$ from Example 3) is harmonic by DIRECT computation of $v_{xx}+v_{yy}$, without invoking the Cauchy-Riemann-based shortcut.
  4. Explain, referencing this lesson's derivation, why $u(x,y)=x^3-3xy^2$ (which is $\mathrm{Re}(z^3)$) must automatically be harmonic without computing $u_{xx}+u_{yy}$ directly — then verify this by direct computation.
- **P76 (Transfer Probe, mode = cross-link probe, engaging BOTH `math.cx.cauchy-riemann` and `math.cx.analytic-functions`)**: "Let $f(z)=e^z=e^x\cos y+i\,e^x\sin y$, so $u=e^x\cos y$, $v=e^x\sin y$. (a) Using the Cauchy-Riemann equations from `math.cx.cauchy-riemann`, verify $f$ is holomorphic. (b) Using `math.cx.analytic-functions`'s guarantee that a holomorphic function's mixed partials agree, show directly that $u=e^x\cos y$ satisfies Laplace's equation. (c) Without redoing the general derivation, explain in your own words why this pattern works for ANY holomorphic function, not just this specific example."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 4/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | MEAN-VALUE-PROPERTY-AS-APPROXIMATION | Believing the mean value property only holds approximately, or only for "nice"/special harmonic functions, rather than exactly for every harmonic function and every valid circle | Foundational |
| MC-2 | INTERIOR-CHECK-ASSUMED-NECESSARY | Believing confirming two harmonic functions are identical requires checking interior points too, missing that boundary agreement alone, via the maximum principle applied to the difference, is already sufficient | High |
| MC-3 | HARMONIC-AND-HOLOMORPHIC-UNRELATED | Believing harmonic functions and holomorphic functions are separate, unrelated topics, missing that the Cauchy-Riemann equations directly force any holomorphic function's real and imaginary parts to be harmonic | Moderate |

- **B01 (targets MC-1)**: P27 (name it: "Mean Value Property Assumed Approximate") → P41 (detect: ask whether the property is an exact identity or an approximation that improves for small circles) → P64 (conceptual shift: re-walk Example 1's exact integral, re-anchoring on "the average comes out to precisely the center value, every time, for every valid circle").
- **B02 (targets MC-2)**: P27 (name it: "Interior Check Assumed Necessary") → P41 (detect: ask whether confirming two harmonic functions agree requires checking interior values, given they already agree on the boundary) → P64 (conceptual shift: re-walk Example 2's difference-function argument, re-anchoring on "the maximum principle applied to the difference already forces the interior to match — boundary agreement alone is enough").
- **B03 (targets MC-3)**: P27 (name it: "Harmonic/Holomorphic Treated as Unrelated") → P41 (detect: ask whether harmonic functions and holomorphic functions are connected topics) → P64 (conceptual shift: re-walk Example 3's Cauchy-Riemann-based derivation, re-anchoring on "any holomorphic function's components are automatically harmonic — this is a direct structural consequence, not a coincidence").

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.de.laplace-equation` (the equation $\nabla^2u=0$ itself, the equilibrium/steady-state framing, and its own orientation-level naming of the mean value property and maximum principle, which this concept develops to full depth).
- **Unlocks**: none listed in the KG for this concept.
- **Cross-link**: KG lists `math.cx.analytic-functions` and `math.cx.cauchy-riemann`, BOTH verified authored via `ls docs/curriculum/blueprints/`. $P76_{mode}=$ **cross-link probe**, engaging both targets together (Example 3, Teaching Action A03, and the P76 transfer probe all directly cite both concepts' own guarantees — Cauchy-Riemann's equations and analytic-functions' continuous-mixed-partials fact — rather than just one).

## Component 8 — Teaching Notes

- estimated_hours = 5 with an expert/analyze tag supports the full "3 TAs + gate" tier, with LO1 and LO2 given genuine full-depth derivations (the parent concept, `math.de.laplace-equation`, deliberately left both at orientation level, explicitly deferring them here) and LO3 built as a rich cross-link probe engaging BOTH authored cross-subject targets at once, following this corpus's established precedent (batches 127-128) for concepts whose KG-listed cross_links are both already authored.
- **Division of labor**: `math.de.laplace-equation` owns the PDE itself, its separation-of-variables solution on a rectangle, and the orientation-level naming of the mean value property/maximum principle; this concept owns the FULL derivations of those two properties, the new Dirichlet-uniqueness content, and the cross-subject connection to holomorphic functions — deliberately not re-deriving the PDE-solving machinery from scratch.
- Example 3 was deliberately built to reuse Example 1's exact function ($u=x^2-y^2$, revealed as $\mathrm{Re}(z^2)$) rather than introducing an unrelated harmonic function, so the cross-link payoff (this function was "free" all along, once $z^2$'s holomorphicity is recognized) lands concretely rather than abstractly.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS |
| V-4 | unlocks concepts named accurately from KG | PASS (none listed) |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (both `math.cx.analytic-functions` and `math.cx.cauchy-riemann` found authored → cross-link probe) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (cross-link probe, both targets) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.75×5⌉=4) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Abstract: expert learner already has orientation-level MVP/max-principle from the parent; full derivation and cross-link introduced directly) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
