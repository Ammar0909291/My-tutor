# Teaching Blueprint: Harmonic Functions (Complex Analysis) (`math.cx.harmonic-functions`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.cx.harmonic-functions` |
| name | Harmonic Functions (Complex Analysis) |
| domain | Complex Analysis |
| difficulty | expert |
| bloom | apply |
| mastery_threshold | 0.85 → MAMR = ⌈0.85×5⌉ = 5/5 |
| estimated_hours | 4 |
| requires | `math.cx.cauchy-riemann`, `math.de.laplace-equation` |
| unlocks | none |
| cross_links | `math.de.harmonic-functions` (authored earlier — see Component 7) |
| CPA_entry_stage | A (Abstract) — expert learner already finds ONE harmonic conjugate via the CR two-step integration recipe from `math.cx.cauchy-riemann`; the task is proving the recipe ALWAYS works locally, and why "locally" is essential |
| description (KG) | $u$ is harmonic iff $\Delta u=u_{xx}+u_{yy}=0$. The real and imaginary parts of a holomorphic function are harmonic. Every harmonic $u$ has a harmonic conjugate $v$ (locally) such that $f=u+iv$ is holomorphic. |

## Component 1 — Learning Objectives

- LO1 (cross-link objective): Recognize the FORWARD direction — "the real and imaginary parts of a holomorphic function are harmonic" — as ALREADY fully derived in `math.de.harmonic-functions`'s own cross-link content (via the Cauchy-Riemann equations and equality of mixed partials), reused here rather than re-derived, and state the CONVERSE direction this concept adds: every harmonic $u$ arises as the real part of SOME holomorphic function, at least locally.
- LO2: Prove (not merely apply, as `math.cx.cauchy-riemann`'s own worked example does for one specific $u$) WHY the two-step CR-integration recipe for constructing a harmonic conjugate $v$ from a given harmonic $u$ ALWAYS succeeds — using $u$'s harmonicity itself to guarantee the integrability condition the recipe silently depends on — and correctly identify which property of $u$ makes the construction valid in general, not just for the one example already worked elsewhere.
- LO3: Explain precisely why the theorem's "locally" qualifier is essential — using a concrete function harmonic on an ANNULUS (a domain with a hole) whose natural candidate conjugate fails to be single-valued globally — and correctly distinguish domains (like a disc) where a GLOBAL harmonic conjugate is guaranteed from domains (like an annulus) where only a LOCAL one is guaranteed.

## Component 2 — Prerequisite Check

Assumes mastery of `math.cx.cauchy-riemann` (the CR equations $u_x=v_y,u_y=-v_x$; the two-step integration procedure for finding a harmonic conjugate $v$ given a specific $u$, already practiced there) and `math.de.laplace-equation` ($\nabla^2u=0$; harmonic functions as its solutions).

## Component 3 — Core Explanation

**The forward direction is already proven — this concept adds the converse**: `math.de.harmonic-functions`'s own cross-link content already derives, in full, that if $f=u+iv$ is holomorphic, the Cauchy-Riemann equations force BOTH $u$ and $v$ to be harmonic. This concept does NOT re-derive that. Instead, it addresses the CONVERSE question `math.de.harmonic-functions` leaves open: given only a harmonic function $u$ (with no $f$ or $v$ yet in hand), does there EXIST some holomorphic $f=u+iv$ with $u$ as its real part? The answer is yes, at least LOCALLY — such a $v$ is called a harmonic conjugate of $u$.

**Why the CR-integration recipe always works — the missing existence proof**: `math.cx.cauchy-riemann`'s own worked example APPLIES the two-step recipe (integrate $v_y=u_x$ partially in $y$, then use $v_x=-u_y$ to pin down the remaining piece) to ONE specific $u$, but does not explain why this procedure is guaranteed to succeed for ANY harmonic $u$. The key: the recipe's second step requires a certain mixed-partial consistency condition (that the "leftover" piece obtained from integrating $v_y=u_x$ satisfies the SECOND equation $v_x=-u_y$ without contradiction) — and this consistency condition is EXACTLY $u_{xx}+u_{yy}=0$, i.e., $u$'s own harmonicity. In other words, $u$ being harmonic is PRECISELY the condition that makes the two-step integration recipe self-consistent — the recipe cannot fail (locally) for a genuinely harmonic $u$, because harmonicity is the exact integrability condition the construction needs.

**"Locally" is essential — a global harmonic conjugate can fail to exist on domains with holes**: the local existence argument above works on any small disc around a point, but does not automatically extend to the WHOLE domain if that domain has a "hole." The standard example: $u(x,y)=\log\sqrt{x^2+y^2}=\log|z|$ is harmonic on the punctured plane (or any annulus avoiding the origin) — but its natural candidate conjugate is $v=\theta=\arg(z)$, which is NOT single-valued: going once around the origin increases $\theta$ by $2\pi$, so no single continuous choice of $v$ works on the WHOLE annulus, even though a LOCAL choice (avoiding a full loop around the hole) works perfectly fine. On a domain WITHOUT holes (like a disc, or more generally any simply connected domain), this obstruction cannot arise, and a single global harmonic conjugate is guaranteed to exist.

## Component 4 — Worked Examples

**Example 1 (LO1 — stating both directions precisely, with the forward direction cited not re-derived, breaking MC-1)**: for $f(z)=e^z=e^x\cos y+ie^x\sin y$, `math.de.harmonic-functions`'s own already-proven forward direction guarantees $u=e^x\cos y$ and $v=e^x\sin y$ are BOTH harmonic (no new verification needed here — this is directly reused). Now reversing the question: given ONLY $u=e^x\cos y$ (harmonic, as just cited), does a matching $v$ exist making $f=u+iv$ holomorphic? Yes — and it happens to be the SAME $v=e^x\sin y$ recoverable via the CR-integration recipe, confirming this concept's converse direction concretely on a case whose forward direction was already established rather than freshly verified.

**Example 2 (LO2 — proving the recipe's success is guaranteed by $u$'s harmonicity, breaking MC-2)**: for a GENERAL harmonic $u(x,y)$ (harmonicity assumed, not yet a specific formula): Step 1 of the recipe integrates $v_y=u_x$ partially in $y$: $v(x,y)=\int u_x\,dy+h(x)$ for an unknown function $h(x)$. Step 2 requires $v_x=-u_y$: differentiating the Step-1 expression, $v_x=\int u_{xx}\,dy+h'(x)$, and setting this equal to $-u_y$ gives $h'(x)=-u_y-\int u_{xx}\,dy$. This equation for $h'(x)$ must have its right side depend ONLY on $x$ (not $y$) for $h(x)$ to exist at all — differentiating the right side with respect to $y$ and requiring it to vanish gives EXACTLY $-u_{yy}-u_{xx}=0$, i.e., $u_{xx}+u_{yy}=0$ — $u$'s own harmonicity. So the recipe's internal consistency requirement IS $u$'s harmonicity, confirming LO2's claim: a harmonic $u$ is guaranteed (locally) to make the recipe succeed, not merely happen to work for one lucky example.

**Example 3 (LO3 — the annulus obstruction to a global harmonic conjugate, breaking MC-3)**: for $u(x,y)=\log\sqrt{x^2+y^2}$ on the annulus $A=\{1<\sqrt{x^2+y^2}<2\}$: direct computation confirms $u_{xx}+u_{yy}=0$ (harmonic). The CR-integration recipe LOCALLY produces $v=\theta=\arctan(y/x)$ (suitably interpreted) as a candidate conjugate — but tracking $v$ continuously around a full loop encircling the origin (staying within $A$) shows $v$ must INCREASE by $2\pi$ upon return to the starting point, meaning no single-valued, continuous $v$ exists on the WHOLE annulus $A$. Contrast: on a disc NOT containing the origin (e.g. a small disc entirely within $A$, avoiding any full loop around the hole), the SAME local recipe DOES produce a genuine, single-valued conjugate — confirming the "locally" qualifier is not a technicality but reflects a genuine global obstruction tied to the domain's hole.

## Component 5 — Teaching Actions

### Teaching Action A01 — This Concept Adds the Converse Direction — the Forward Direction Is Already Proven Elsewhere (Primitive P11: Representation Shift)

State: "`math.de.harmonic-functions` already proved holomorphic $\Rightarrow$ harmonic components — don't re-derive that here; this concept's genuinely new content is the REVERSE question: given just a harmonic $u$, can you always find a matching holomorphic $f$?" Walk Example 1's direct reuse of the already-established forward direction.

- **MC-1 hook**: ask "does this concept need to re-derive that holomorphic functions have harmonic components, or can that be directly reused from `math.de.harmonic-functions`?" — a "re-derive" answer reveals MC-1 (missing that the forward direction is already established and should be cited, not repeated).

### Teaching Action A02 — Harmonicity of $u$ IS the Recipe's Success Condition, Proven Not Assumed (Primitive P28: Conflict Evidence)

Present Example 2's direct derivation: the recipe's internal consistency requirement (that $h'(x)$ depends only on $x$) reduces ALGEBRAICALLY to exactly $u_{xx}+u_{yy}=0$. State: "`math.cx.cauchy-riemann`'s own worked example just APPLIED the recipe once and it happened to work — this derivation shows WHY it always works: $u$'s harmonicity isn't a side fact, it's the PRECISE condition the construction's consistency requires."

- **MC-2 hook**: ask "does the CR-integration recipe for finding a harmonic conjugate happen to work for some harmonic functions and fail for others, or is its success guaranteed by harmonicity itself?" — a "happens to work sometimes" answer reveals MC-2 (missing the direct algebraic guarantee harmonicity provides).

### Teaching Action A03 — "Locally" Is a Genuine Restriction, Not Boilerplate (Primitive P06: Contrast Pair)

Contrast the tempting assumption that "locally" is routine mathematical fine print against Example 3's concrete demonstration that $v=\theta$ genuinely fails to be single-valued on the FULL annulus, while succeeding on any sub-disc avoiding a full loop around the hole. State: "the word 'locally' in this theorem isn't decoration — on a domain with a hole, a global harmonic conjugate can genuinely fail to exist, and $\log|z|$'s candidate conjugate $\theta$ is the standard concrete demonstration of exactly this failure."

- **MC-3 hook**: ask "is the theorem's 'locally' qualifier just routine mathematical caution, or does it reflect a genuine failure that can occur on domains with holes?" — a "just routine caution" answer reveals MC-3 (missing the concrete annulus obstruction).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. State both directions of this concept's theorem (forward and converse), citing which is already proven in `math.de.harmonic-functions` and which is new here.
  2. Verify $u=x^3-3xy^2$ is harmonic, then use the CR-integration recipe to find its harmonic conjugate $v$.
  3. Explain, using Example 2's derivation, exactly which step of the CR-integration recipe would fail if $u$ were NOT harmonic.
  4. Explain why $u=\log\sqrt{x^2+y^2}$ has no single-valued harmonic conjugate on a full annulus surrounding the origin, but does have one on any sufficiently small disc avoiding the origin.
- **P76 (Transfer Probe, mode = cross-link probe engaging `math.de.harmonic-functions`)**: "A fluid-dynamics engineer models the velocity potential of an idealized 2D flow around a cylindrical obstacle using a harmonic function $u$ defined on an ANNULAR region (the flow domain excludes the cylinder itself, creating a hole). The engineer wants to find the flow's stream function $v$ (the harmonic conjugate of $u$, so that $f=u+iv$ is holomorphic) to complete the flow's complex potential. (a) Using `math.de.harmonic-functions`'s own already-established forward direction together with this concept's converse, explain why the engineer is justified in expecting SOME local harmonic conjugate to exist near any single point of the flow domain. (b) Using Example 3's annulus obstruction, explain why the engineer should NOT assume a single, globally consistent stream function $v$ necessarily exists across the ENTIRE annular flow domain, and what physical/geometric feature of the domain is responsible. (c) If the engineer instead restricts attention to a flow domain that is simply connected (no obstacle, no hole), explain why this concern disappears entirely."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 5/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | FORWARD-DIRECTION-ASSUMED-TO-NEED-RE-DERIVATION | Believing this concept must re-derive that holomorphic functions have harmonic components, missing that `math.de.harmonic-functions` already establishes this and it should be directly reused | Foundational |
| MC-2 | CR-RECIPE-SUCCESS-ASSUMED-COINCIDENTAL | Believing the CR-integration recipe for finding a harmonic conjugate happens to succeed for particular examples by luck, rather than being GUARANTEED by the given function's harmonicity | High |
| MC-3 | LOCALLY-QUALIFIER-ASSUMED-ROUTINE | Believing the theorem's "locally" qualifier is routine mathematical fine print, missing that a global harmonic conjugate can genuinely fail to exist on domains with holes | Moderate |

- **B01 (targets MC-1)**: P27 (name it: "Forward Direction Assumed to Need Re-Derivation") → P41 (detect: ask whether this concept must re-derive the holomorphic-implies-harmonic direction) → P64 (conceptual shift: re-walk Example 1's direct reuse of the already-established result).
- **B02 (targets MC-2)**: P27 (name it: "CR Recipe Success Assumed Coincidental") → P41 (detect: ask whether the recipe's success is coincidental or guaranteed) → P64 (conceptual shift: re-walk Example 2's algebraic derivation reducing the recipe's consistency to $u$'s harmonicity).
- **B03 (targets MC-3)**: P27 (name it: "Locally Qualifier Assumed Routine") → P41 (detect: ask whether "locally" reflects a genuine restriction or is routine caution) → P64 (conceptual shift: re-walk Example 3's annulus obstruction with $v=\theta$).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.cx.cauchy-riemann` (the CR equations and the two-step conjugate-finding recipe, applied there to one example and here proven to always succeed) and `math.de.laplace-equation` (the Laplacian equation $\nabla^2u=0$ this concept's harmonic functions satisfy).
- **Unlocks**: none listed in the KG for this concept.
- **Cross-link**: KG lists `math.de.harmonic-functions`, checked via `ls docs/curriculum/blueprints/` and confirmed ALREADY authored. $P76_{mode}=$ **cross-link probe**, engaging `math.de.harmonic-functions`'s own already-proven forward-direction result directly in Component 3's converse framing and the P76 transfer probe.

## Component 8 — Teaching Notes

- estimated_hours = 4 with an expert/apply tag supports the "3 TAs + gate" tier, with LO1 explicitly citing (not repeating) the forward direction, LO2 given full existence-proof depth beyond `math.cx.cauchy-riemann`'s single-example application, and LO3 grounding the "locally" qualifier in a concrete, worked obstruction.
- **Division of labor**: `math.de.harmonic-functions` already owns the full forward-direction derivation (holomorphic $\Rightarrow$ harmonic components, verified by grep — its own LO3 and Example 3 already prove this precisely via CR plus mixed-partial equality); `math.cx.cauchy-riemann` already owns the specific two-step conjugate-finding RECIPE, applied once to $u=e^x\cos y$ (verified by grep — its own P76 probe uses exactly this recipe on this example, with no general existence argument). This concept owns the CONVERSE direction, the general PROOF that the recipe always succeeds for any harmonic $u$ (not just the one example elsewhere), and the "locally" qualifier's genuine necessity on domains with holes.
- Example 1's deliberate reuse of a DIFFERENT function ($f(z)=e^z$) from `math.cx.cauchy-riemann`'s own worked example ($u=e^x\cos y$ happens to be the real part of $e^z$ too, but approached from the different direction here — starting from $f$ and citing the forward direction, rather than starting from $u$ and applying the recipe) was chosen to make the TWO directions (forward, already proven; converse, this concept's content) visibly distinct rather than blurring into a single repeated computation.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS |
| V-4 | unlocks concepts named accurately from KG | PASS (none listed) |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (`math.de.harmonic-functions` confirmed authored → cross-link probe) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (cross-link probe) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.85×5⌉=5) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Abstract: expert learner already applies the CR conjugate recipe once; task is proving it always works and why "locally" matters) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
