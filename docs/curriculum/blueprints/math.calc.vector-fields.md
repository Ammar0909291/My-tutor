# Teaching Blueprint: Vector Fields (`math.calc.vector-fields`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.calc.vector-fields` |
| name | Vector Fields |
| domain | Calculus |
| difficulty | expert |
| bloom | analyze |
| mastery_threshold | 0.7 → MAMR = ⌈0.7×5⌉ = 4/5 |
| estimated_hours | 8 |
| requires | `math.calc.gradient`, `math.geom.vectors-3d` |
| unlocks | `math.calc.line-integrals` |
| cross_links | none |
| CPA_entry_stage | A (Abstract) — expert-tier learner already fluent in both prerequisites; the vector field is introduced directly as the general object of which the gradient is one special case |
| description (KG) | An assignment of a vector to each point in a region; a field is conservative if F = ∇f for some potential f, in which case ∫_C F·dr is path-independent. |

## Component 1 — Learning Objectives

- LO1: Define a **vector field** $\mathbf{F}(x,y,z)$ as an assignment of a vector (using `math.geom.vectors-3d`'s component-vector notation) to EVERY point in a region — and recognize that `math.calc.gradient`'s $\nabla f$ is just ONE specific example of a vector field; most vector fields are NOT the gradient of any scalar function at all.
- LO2: Define a **conservative** vector field as one for which $\mathbf{F}=\nabla f$ for some scalar **potential function** $f$, and state the key consequence — the Fundamental Theorem for Line Integrals — that for a conservative field, $\int_C\mathbf{F}\cdot d\mathbf{r} = f(\text{endpoint})-f(\text{start point})$, **path-independent**: finding $f$ directly proves the integral is the same for EVERY path between those two endpoints, without needing to test multiple paths.
- LO3: Correctly distinguish conservative fields from genuinely **non-conservative** ones using the necessary condition $\partial P/\partial y=\partial Q/\partial x$ (for $\mathbf{F}=(P,Q)$) and the signature fact that a non-conservative field's line integral around a CLOSED loop can be nonzero (unlike a conservative field's, which is always exactly $0$ around any closed loop) — recognizing that no potential function exists at all for a non-conservative field, so no shortcut is available and the integral must be computed directly by parametrization.

## Component 2 — Prerequisite Check

Assumes mastery of `math.calc.gradient` ($\nabla f = (\partial f/\partial x,\partial f/\partial y,\ldots)$, pointing in the direction of steepest ascent, with magnitude equal to the maximum rate of change) and `math.geom.vectors-3d` (component vectors, dot products, magnitude).

## Component 3 — Core Explanation

**A vector field is more general than a gradient**: a **vector field** $\mathbf{F}(x,y,z)$ assigns a vector to EVERY point in a region — think of it as a "wind map" or "flow map," with an arrow drawn at each location. `math.calc.gradient`'s $\nabla f$ IS a vector field (one vector per point, built from $f$'s partial derivatives) — but it is only ONE particular kind. A general vector field need not come from differentiating any scalar function at all; many vector fields (e.g. ones representing rotation or circulation) are not gradients of anything.

**Conservative fields: a potential function, and the payoff of path-independence**: a vector field $\mathbf{F}$ is called **conservative** if there EXISTS a scalar function $f$ (the **potential function**) with $\mathbf{F}=\nabla f$. This is a genuinely special, restrictive property — not every field qualifies. The payoff, when it does hold, is the **Fundamental Theorem for Line Integrals**: $\int_C\mathbf{F}\cdot d\mathbf{r} = f(\text{end})-f(\text{start})$ — the line integral depends ONLY on the two endpoints, not on which specific path $C$ connects them. Crucially, finding an explicit $f$ with $\nabla f=\mathbf{F}$ is a DIRECT, one-time proof of path-independence for EVERY possible path between any two given endpoints simultaneously — there is no need to compute the integral along several different paths and check that they happen to agree.

**Testing for conservativeness, and what "no potential exists" really means**: for a 2D field $\mathbf{F}=(P,Q)$, a NECESSARY condition for $\mathbf{F}$ to be conservative is $\partial P/\partial y=\partial Q/\partial x$ (both must equal the mixed partial $\partial^2f/\partial x\partial y=\partial^2 f/\partial y\partial x$ of the same potential, so they must match each other, by Clairaut's theorem). If this condition FAILS, no potential function exists at all — not "an approximate one" or "one that mostly works" — and the shortcut of LO2 is simply unavailable; the line integral must be computed the ordinary way, by parametrizing the curve and integrating directly (`math.calc.line-integrals`'s general method). A telltale signature of a non-conservative field is a NONZERO line integral around some CLOSED loop (same start and end point) — for a conservative field, a closed loop always gives EXACTLY $f(\text{same point})-f(\text{same point})=0$, so any closed loop with a nonzero integral proves conservativeness fails.

## Component 4 — Worked Examples

**Example 1 (LO1 — a general, rotational vector field)**: $\mathbf{F}(x,y)=(-y,x)$ assigns, to each point $(x,y)$, the vector $(-y,x)$ — e.g. at $(1,0)$, $\mathbf{F}=(0,1)$ (pointing straight "up," perpendicular to the position vector, consistent with a field representing rotational circulation around the origin). This is a perfectly legitimate vector field — an arrow at every point in the plane — with no scalar function $f$ assumed or required yet.

**Example 2 (LO2 — a conservative field, potential function, path-independence)**: For $\mathbf{F}(x,y)=(2xy,x^2)$, try $f(x,y)=x^2y$: $\partial f/\partial x=2xy$ ✓, $\partial f/\partial y=x^2$ ✓ — confirmed $\mathbf{F}=\nabla f$, so $\mathbf{F}$ is conservative with potential $f=x^2y$. Then $\int_C\mathbf{F}\cdot d\mathbf{r}$ from $(0,0)$ to $(1,2)$ equals $f(1,2)-f(0,0) = (1)^2(2)-0 = 2$ — REGARDLESS of which specific path $C$ connects these two points (a straight line, a curvy detour, anything) — found directly from $f$, with no need to parametrize any path or try a second one to confirm the answer matches.

**Example 3 (LO3 — a non-conservative field, failing the test, and a nonzero closed loop, breaking MC-1 and MC-3)**: For $\mathbf{F}(x,y)=(-y,x)$ from Example 1, $P=-y,Q=x$: $\partial P/\partial y=-1$, $\partial Q/\partial x=1$ — these do **NOT** match ($-1\ne1$), so $\mathbf{F}$ fails the necessary condition and has **no potential function at all**. Confirming directly: compute $\int_C\mathbf{F}\cdot d\mathbf{r}$ around the closed unit circle $\mathbf{r}(t)=(\cos t,\sin t)$, $t\in[0,2\pi]$: $\mathbf{F}(\mathbf{r}(t))=(-\sin t,\cos t)$, $\mathbf{r}\,'(t)=(-\sin t,\cos t)$, so $\mathbf{F}\cdot\mathbf{r}\,' = \sin^2t+\cos^2t=1$, giving $\int_0^{2\pi}1\,dt=2\pi$ — **NONZERO**, even though the loop starts and ends at the exact same point $(1,0)$. For a conservative field, this same closed-loop computation would be forced to equal exactly $f(1,0)-f(1,0)=0$ — the fact that this field gives $2\pi\ne0$ is direct, conclusive proof that no potential function exists for it at all.

## Component 5 — Teaching Actions

### Teaching Action A01 — Not Every Vector Field Comes From a Gradient (Primitive P11: Representation Shift)

State: "`math.calc.gradient`'s $\nabla f$ is ONE example of a vector field — an arrow assigned to each point, built from partial derivatives. But a general vector field is just any such assignment; most are not the gradient of anything at all." Introduce Example 1's rotational field, emphasizing no potential function is assumed.

- **MC-1 hook**: ask "is every vector field automatically the gradient of some scalar function?" — a "yes" answer reveals MC-1 (assuming "vector field" and "conservative vector field" are synonymous).

### Teaching Action A02 — Finding a Potential Function Proves Path-Independence Directly (Primitive P11: Representation Shift)

State: "once you find $f$ with $\nabla f=\mathbf{F}$, the Fundamental Theorem for Line Integrals hands you the answer for ANY path at once — you never need to try a second path to double-check." Work Example 2's full construction and endpoint evaluation.

- **MC-2 hook**: ask "to confirm a field's line integral is path-independent, do I need to compute it along two or three different paths and check they match?" — a "yes" answer reveals MC-2 (missing that finding an explicit potential function is a direct, complete proof, not merely suggestive evidence).

### Teaching Action A03 — A Failed Test and a Nonzero Closed Loop (Primitive P06: Contrast Pair)

Present Example 3's direct evidence: $\mathbf{F}=(-y,x)$ fails $\partial P/\partial y=\partial Q/\partial x$, and its closed-loop integral around the unit circle is $2\pi$, not $0$. Contrast directly with what a conservative field's closed loop would give (always exactly $0$, from $f(\text{same point})-f(\text{same point})$). State: "when the test fails, there is no potential function at all — not a rough one, not a partial one — and a nonzero closed-loop integral is the clearest possible proof that no shortcut is available; you have to integrate directly."

- **MC-3 hook**: ask "for a field that fails the conservativeness test, can I still find SOME approximate potential function to shortcut the integral?" — a "yes" answer reveals MC-3 (believing an approximate or partial potential can substitute for a genuine one, when in fact none exists at all).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. Verify that $\mathbf{F}(x,y)=(3x^2y,x^3)$ is conservative by finding an explicit potential function $f$.
  2. Using the potential function from problem 1, compute $\int_C\mathbf{F}\cdot d\mathbf{r}$ from $(0,0)$ to $(2,1)$, and explain why the specific path taken does not matter.
  3. Apply the necessary condition $\partial P/\partial y=\partial Q/\partial x$ to $\mathbf{F}(x,y)=(y,-x)$ and determine whether it could be conservative.
  4. Explain why a nonzero line integral around a closed loop proves a vector field is NOT conservative, referencing what a conservative field's closed-loop integral would have to equal instead.
- **P76 (Transfer Probe, mode = independence)**: "An engineer models the force field exerted by a spring system as $\mathbf{F}(x,y)=(2x,2y)$, representing a restoring force pulling toward the origin. (a) Determine whether $\mathbf{F}$ is conservative by finding a potential function (or showing one exists via the necessary condition). (b) If it is conservative, explain what the potential function physically represents in this spring context, and compute the work done moving from $(1,1)$ to $(3,0)$ using only the potential function's values at the endpoints. (c) A colleague argues that since the spring force clearly 'depends on position,' the work done must also depend on the exact path taken to get from one point to another. Using this lesson's Fundamental Theorem for Line Integrals, explain precisely why this is not the case for a conservative field like this one."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 4/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | EVERY-VECTOR-FIELD-ASSUMED-CONSERVATIVE | Believing every vector field is automatically the gradient of some scalar function, treating "vector field" and "conservative vector field" as synonymous | Foundational |
| MC-2 | PATH-INDEPENDENCE-ASSUMED-TO-NEED-MULTI-PATH-VERIFICATION | Believing confirming path-independence requires computing the line integral along several different paths and checking they match, rather than recognizing a found potential function is a direct, complete proof | Moderate |
| MC-3 | APPROXIMATE-POTENTIAL-ASSUMED-AVAILABLE-FOR-NON-CONSERVATIVE-FIELDS | Believing a field that fails the conservativeness test might still have some approximate or partial potential function usable as a shortcut, missing that no potential function exists at all in that case | Foundational |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 (name it: "Every Vector Field Assumed Conservative") → P41 (detect: ask a student whether every vector field is the gradient of some function, and check for a "yes") → P64 (conceptual shift: re-walk Example 1's rotational field, introduced with no potential function assumed at all, re-anchoring on "a vector field is just an arrow at each point — being a gradient is a special, extra property, not automatic").
- **B02 (targets MC-2)**: P27 (name it: "Path-Independence Assumed to Need Multi-Path Verification") → P41 (detect: ask a student how they would confirm a line integral is path-independent, and check for a "try several paths and compare" answer) → P64 (conceptual shift: re-walk Example 2's direct potential-function proof, re-anchoring on "finding $f$ with $\nabla f=\mathbf{F}$ settles path-independence for every path at once — no need to test any path directly").
- **B03 (targets MC-3)**: P27 (name it: "Approximate Potential Assumed Available for Non-Conservative Fields") → P41 (detect: ask a student whether a field failing the conservativeness test might still have a rough or partial potential function) → P64 (conceptual shift: re-walk Example 3's failed test and nonzero closed-loop integral, re-anchoring on "no potential function exists at all here — not an approximate one — and the nonzero closed loop is direct proof, not merely a warning sign").

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.calc.gradient` ($\nabla f$, the specific vector-field construction this concept generalizes, and whose existence is exactly the conservativeness property), `math.geom.vectors-3d` (the component-vector notation used throughout).
- **Unlocks**: `math.calc.line-integrals` (already authored — see the production-order note below; that concept's general parametrization-based method is exactly the "no shortcut available" fallback this concept's LO3 points to for non-conservative fields).
- **Cross-link**: KG lists no cross-links for this concept.
- **Production-order note**: `math.calc.line-integrals` was authored (batch 100, as a prerequisite for `math.calc.surface-integrals`) before this concept despite being this concept's own KG `unlocks` target — production order in this corpus follows the ROI-ranked topological schedule (gated only by `requires`, not `unlocks` order), matching the precedent already recorded for `math.alg.system-3var`/`math.linalg.row-reduction`. This blueprint's Core Explanation and Teaching Action A03 could therefore cite `math.calc.line-integrals`' actual authored method directly for the non-conservative fallback case.

## Component 8 — Teaching Notes

- estimated_hours = 8 with an expert/analyze tag places this at a "3 TAs + gate" tier — A01 (the general vector-field concept), A02 (conservative fields and the potential-function shortcut), and A03 (the failed-test/nonzero-closed-loop contrast) each target a distinct LO, appropriate for a concept whose core difficulty is conceptual (recognizing conservativeness as a special, testable property) rather than computationally heavy.
- Examples 1 and 3 deliberately reuse the SAME field, $\mathbf{F}=(-y,x)$, first introduced purely as a general vector field (Example 1, no claims about conservativeness) and later shown to fail the conservativeness test (Example 3) — this matches the corpus's established near-identical-pair technique, letting the field's own later "reveal" (non-conservative, nonzero closed loop) land as a genuine discovery rather than an artificially separate example.
- Example 2's potential function $f=x^2y$ was deliberately verified by directly checking BOTH partial derivatives against $\mathbf{F}$'s two components, rather than asserting the result, so the worked example models the exact verification procedure the gate's P77 problems require students to perform themselves.

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
| V-15 | CPA_entry_stage justified | PASS (Abstract: expert-tier learner, direct generalization of two mastered prerequisites) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
