# Teaching Blueprint: Existence and Uniqueness Theorem (`math.de.existence-uniqueness`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.de.existence-uniqueness` |
| name | Existence and Uniqueness Theorem |
| domain | Differential Equations |
| difficulty | expert |
| bloom | understand |
| mastery_threshold | 0.8 → MAMR = ⌈0.8×5⌉ = 4/5 |
| estimated_hours | 5 |
| requires | `math.de.ivp`, `math.real.lipschitz-continuity` |
| unlocks | none |
| cross_links | `math.real.fixed-point-theorem` (authored earlier in this same batch — see Component 7) |
| CPA_entry_stage | A (Abstract) — expert learner already has IVPs and the Lipschitz condition; the task is combining them via Picard iteration, a direct instance of `math.real.fixed-point-theorem`'s machinery |
| description (KG) | If $f(x,y)$ and $\partial f/\partial y$ are continuous in a rectangle around $(x_0,y_0)$, then the IVP $y'=f(x,y)$, $y(x_0)=y_0$ has a unique solution in some interval around $x_0$. Proved via Picard iteration. |

## Component 1 — Learning Objectives

- LO1 (cross-link objective): Recognize Picard iteration — the standard proof technique for this theorem — as a DIRECT INSTANCE of `math.real.fixed-point-theorem`'s own contraction-mapping iteration, applied to the "Picard operator" $(T\phi)(x)=y_0+\int_{x_0}^xf(t,\phi(t))\,dt$ acting on a suitable space of candidate solution functions — and correctly recognize that solving $y'=f(x,y),y(x_0)=y_0$ is EQUIVALENT to finding a fixed point $\phi=T\phi$ of this integral operator.
- LO2: State the theorem's precise hypothesis — $f(x,y)$ and $\partial f/\partial y$ BOTH continuous in a rectangle around $(x_0,y_0)$ — and explain WHY $\partial f/\partial y$'s continuity is exactly what supplies `math.real.lipschitz-continuity`'s own Lipschitz condition on $f$ (in the $y$ variable, via the Mean Value Theorem, directly reusing that concept's own derivative-bound-to-Lipschitz-constant connection), making the Picard operator a genuine contraction on a suitably restricted interval.
- LO3: Correctly identify why the theorem's conclusion is only LOCAL (guaranteeing a unique solution on SOME interval around $x_0$, not necessarily globally) — using a specific IVP whose solution genuinely blows up in finite time as a concrete illustration that "exists near $x_0$" cannot always be strengthened to "exists for all $x$."

## Component 2 — Prerequisite Check

Assumes mastery of `math.de.ivp` (an ODE with conditions specified at a single point; the informal preview of this theorem, deferred here for full development) and `math.real.lipschitz-continuity` (the Lipschitz condition and its computable connection to derivative bounds).

## Component 3 — Core Explanation

**Solving the IVP is EQUIVALENT to finding a fixed point of the Picard operator**: the IVP $y'=f(x,y),y(x_0)=y_0$ can be rewritten, by integrating both sides from $x_0$ to $x$, as the INTEGRAL equation $y(x)=y_0+\int_{x_0}^xf(t,y(t))\,dt$ — a genuinely EQUIVALENT formulation (any solution of one solves the other, and vice versa, by the Fundamental Theorem of Calculus). Defining the Picard OPERATOR $(T\phi)(x)=y_0+\int_{x_0}^xf(t,\phi(t))\,dt$ (which takes a CANDIDATE function $\phi$ and produces a NEW function $T\phi$), a function $y$ solves the IVP EXACTLY when $y=Ty$ — i.e., $y$ is a FIXED POINT of $T$. This is not an analogy to `math.real.fixed-point-theorem`'s own framework — it is a DIRECT INSTANCE, with the "points" being entire FUNCTIONS (elements of a suitable complete function space) rather than numbers, and $T$ the specific Picard operator.

**$\partial f/\partial y$'s continuity is exactly what makes $T$ a contraction — directly reusing `math.real.lipschitz-continuity`'s own mechanism**: `math.real.lipschitz-continuity` already establishes that a bound on a function's DERIVATIVE directly supplies a valid Lipschitz constant via the Mean Value Theorem. Here, $\partial f/\partial y$ CONTINUOUS on a compact rectangle means it is BOUNDED there (by `math.calc.optimization`-adjacent reasoning, or simply the extreme value property on a compact set) — say $|\partial f/\partial y|\le K$. The SAME Mean-Value-Theorem argument `math.real.lipschitz-continuity` already uses then gives $|f(x,y_1)-f(x,y_2)|\le K|y_1-y_2|$ — $f$ is LIPSCHITZ IN $y$, with constant $K$. This Lipschitz bound on $f$ is EXACTLY what makes the Picard operator $T$ CONTRACT distances between candidate functions (on a sufficiently SHORT interval around $x_0$, where the accumulated integral's effect stays controlled) — directly instantiating `math.real.fixed-point-theorem`'s own contraction condition, with $k<1$ achieved specifically by choosing the interval SHORT enough.

**The conclusion is only LOCAL — existence "for some interval," not automatically globally**: `math.real.fixed-point-theorem`'s own machinery guarantees a UNIQUE fixed point on the space where the contraction genuinely holds — here, this space is built from functions restricted to a SHORT enough interval around $x_0$ (short enough that the Picard operator's contraction constant is genuinely $k<1$). The theorem's conclusion is correspondingly LOCAL: a unique solution exists on SOME interval around $x_0$, but nothing in the proof guarantees this interval can be extended indefinitely — and indeed, some IVPs genuinely have solutions that blow up (diverge to infinity) in FINITE time, well before reaching every real $x$, confirming the "local" qualifier reflects a genuine limitation, not proof-technique laziness.

## Component 4 — Worked Examples

**Example 1 (LO1 — verifying the IVP-to-fixed-point equivalence directly, breaking MC-1)**: for the IVP $y'=y,y(0)=1$ (with known solution $y=e^x$): the Picard operator is $(T\phi)(x)=1+\int_0^x\phi(t)\,dt$. Checking $y=e^x$ is a genuine fixed point: $(Ty)(x)=1+\int_0^xe^t\,dt=1+(e^x-1)=e^x=y(x)$ ✓ — confirming $y=Ty$ EXACTLY, directly instantiating LO1's claimed equivalence: solving this specific IVP and finding this specific operator's fixed point are the SAME problem, verified concretely rather than asserted abstractly.

**Example 2 (LO2 — $\partial f/\partial y$'s boundedness supplying the Lipschitz constant, breaking MC-2)**: for $f(x,y)=x^2+y^2$ near $(x_0,y_0)=(0,0)$, restricted to a rectangle where $|y|\le1$: $\partial f/\partial y=2y$, and on this rectangle $|2y|\le2$ — bounded by $K=2$. By the Mean Value Theorem argument (directly reusing `math.real.lipschitz-continuity`'s own mechanism): $|f(x,y_1)-f(x,y_2)|=|y_1^2-y_2^2|=|y_1+y_2||y_1-y_2|\le2|y_1-y_2|$ (using $|y_1|,|y_2|\le1$, so $|y_1+y_2|\le2$) — confirming $f$ IS Lipschitz in $y$ with constant $K=2$ on this restricted rectangle, EXACTLY the ingredient LO2 requires to make the Picard operator contract.

**Example 3 (LO3 — a solution blowing up in finite time, confirming the local-only conclusion, breaking MC-3)**: for the IVP $y'=y^2,y(0)=1$: separating variables directly gives the explicit solution $y(x)=\frac1{1-x}$ (verified by substitution: $y'=\frac1{(1-x)^2}=y^2$ ✓, and $y(0)=1$ ✓). This solution is perfectly well-defined and unique NEAR $x=0$ — but as $x\to1^-$, $y(x)\to\infty$, a genuine BLOW-UP in FINITE time — the solution simply does NOT exist for $x\ge1$, no matter how the equation is analyzed. This concretely confirms LO3's claim: the theorem's guarantee is genuinely LOCAL ("some interval around $x_0$"), and this specific IVP's solution provably CANNOT be extended to all $x$, not due to any deficiency in the proof technique, but a genuine property of this equation.

## Component 5 — Teaching Actions

### Teaching Action A01 — Solving the IVP IS Finding a Fixed Point of the Picard Operator (Primitive P11: Representation Shift)

State: "Picard iteration isn't a separate ODE-specific technique loosely inspired by fixed-point ideas — solving $y'=f(x,y),y(x_0)=y_0$ is LITERALLY the same problem as finding a fixed point of the specific operator $(T\phi)(x)=y_0+\int_{x_0}^xf(t,\phi(t))\,dt$, a direct instance of `math.real.fixed-point-theorem`'s own machinery." Walk Example 1's direct verification that $y=e^x$ satisfies $y=Ty$.

- **MC-1 hook**: ask "is Picard iteration a separate technique merely INSPIRED BY fixed-point ideas, or is solving the IVP LITERALLY equivalent to finding a fixed point of a specific operator?" — a "merely inspired by" answer reveals MC-1 (missing the direct, exact equivalence).

### Teaching Action A02 — $\partial f/\partial y$'s Continuity Supplies the Lipschitz Constant via the SAME Mechanism Already Known (Primitive P28: Conflict Evidence)

Present Example 2's direct evidence: bounding $\partial f/\partial y$ by $K=2$ on the restricted rectangle, then applying EXACTLY `math.real.lipschitz-continuity`'s own Mean-Value-Theorem argument to derive the Lipschitz bound on $f$ itself. State: "the theorem's hypothesis about $\partial f/\partial y$ isn't an unrelated extra condition — it's precisely what's needed to invoke `math.real.lipschitz-continuity`'s own already-established derivative-bound-to-Lipschitz-constant connection."

- **MC-2 hook**: ask "is the hypothesis on $\partial f/\partial y$'s continuity an unrelated extra technical condition, or does it directly supply the Lipschitz bound needed to make the Picard operator a contraction?" — an "unrelated extra condition" answer reveals MC-2 (missing the direct mechanism connecting the hypothesis to the proof).

### Teaching Action A03 — "Local" Is a Genuine Limitation, Not Proof-Technique Laziness (Primitive P06: Contrast Pair)

Contrast the tempting assumption that a stronger, global-existence proof technique could always extend the theorem's local guarantee against Example 3's demonstration that $y'=y^2,y(0)=1$ has a solution that GENUINELY, provably blows up at $x=1$ — no proof technique could extend it further, because the actual solution simply stops existing there. State: "the theorem's 'local' qualifier isn't a weakness of the Picard-iteration PROOF that a cleverer argument could fix — for equations like $y'=y^2$, the solution GENUINELY fails to exist past some finite point, a real property of the equation itself, not a limitation of the proof."

- **MC-3 hook**: ask "does the theorem's local-existence conclusion reflect a genuine limitation on how far solutions can extend, or merely a limitation of the specific Picard-iteration proof technique that a better technique could overcome?" — a "merely a proof-technique limitation" answer reveals MC-3 (missing that finite-time blow-up is a genuine property of certain equations, not a proof artifact).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. Write the Picard operator for the IVP $y'=2y,y(0)=3$, and verify the known solution $y=3e^{2x}$ is a fixed point.
  2. For $f(x,y)=xy$ near $(0,1)$ restricted to $|y|\le2$, bound $\partial f/\partial y$ and derive a valid Lipschitz constant for $f$ in $y$.
  3. Explain, in your own words, why $\partial f/\partial y$'s continuity is the specific hypothesis that supplies the Lipschitz bound needed for Picard iteration to work.
  4. Explain why the theorem only guarantees a solution on "some interval around $x_0$" rather than for all $x$, citing a concrete example.
- **P76 (Transfer Probe, mode = cross-link probe engaging `math.real.fixed-point-theorem`)**: "A physicist models a population's growth rate using the IVP $y'=y^2-1,y(0)=2$ (a nonlinear equation), and wants to know whether a unique solution is guaranteed to exist near $x=0$, and whether that guarantee extends indefinitely. (a) Verify that $f(x,y)=y^2-1$ and $\partial f/\partial y=2y$ are both continuous near $(0,2)$, and explain what this guarantees via this lesson's theorem. (b) Using `math.real.fixed-point-theorem`'s own machinery (which this lesson's Picard iteration directly instantiates), explain in general terms why the resulting solution's existence is only guaranteed on SOME interval around $x=0$, not necessarily for all $x$. (c) Without solving the equation explicitly, explain what kind of behavior (referencing Example 3's blow-up phenomenon) might cause this solution to fail to extend to all $x$, given that $y^2$ appears in the equation."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 4/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | PICARD-ITERATION-ASSUMED-MERELY-INSPIRED-BY-FIXED-POINTS | Believing Picard iteration is a separate ODE-specific technique merely inspired by fixed-point ideas, missing that solving the IVP is literally equivalent to finding a fixed point of a specific operator | Foundational |
| MC-2 | PARTIAL-DERIVATIVE-HYPOTHESIS-ASSUMED-UNRELATED | Believing the hypothesis on $\partial f/\partial y$'s continuity is an unrelated extra technical condition, missing that it directly supplies the Lipschitz bound the proof needs | High |
| MC-3 | LOCAL-CONCLUSION-ASSUMED-PROOF-TECHNIQUE-LIMITATION | Believing the theorem's local-existence conclusion reflects only a limitation of the Picard-iteration proof technique, missing that finite-time blow-up is a genuine property of certain equations | Moderate |

- **B01 (targets MC-1)**: P27 (name it: "Picard Iteration Assumed Merely Inspired by Fixed Points") → P41 (detect: ask whether Picard iteration is merely inspired by or literally equivalent to fixed-point finding) → P64 (conceptual shift: re-walk Example 1's direct verification that $y=e^x$ satisfies $y=Ty$).
- **B02 (targets MC-2)**: P27 (name it: "Partial Derivative Hypothesis Assumed Unrelated") → P41 (detect: ask whether the $\partial f/\partial y$ hypothesis is unrelated or directly supplies the Lipschitz bound) → P64 (conceptual shift: re-walk Example 2's direct derivation of the Lipschitz constant from the bounded partial derivative).
- **B03 (targets MC-3)**: P27 (name it: "Local Conclusion Assumed Proof-Technique Limitation") → P41 (detect: ask whether local existence reflects a genuine equation property or merely a proof limitation) → P64 (conceptual shift: re-walk Example 3's genuine finite-time blow-up for $y'=y^2$).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.de.ivp` (the initial value problem this concept's theorem directly addresses, previewed there informally) and `math.real.lipschitz-continuity` (the Lipschitz condition and its derivative-bound connection this concept's proof directly reuses).
- **Unlocks**: none listed in the KG for this concept.
- **Cross-link**: KG lists `math.real.fixed-point-theorem`, checked via `ls docs/curriculum/blueprints/` — confirmed authored EARLIER IN THIS SAME BATCH (same-batch cross-link-enabling pattern). $P76_{mode}=$ **cross-link probe**, engaging `math.real.fixed-point-theorem`'s own contraction-mapping machinery directly in Component 3's Picard-operator derivation and the P76 transfer probe.

## Component 8 — Teaching Notes

- estimated_hours = 5 with an expert/understand tag supports the "3 TAs + gate" tier, with LO1 establishing the direct fixed-point equivalence, LO2 given full depth connecting the hypothesis directly to `math.real.lipschitz-continuity`'s own mechanism, and LO3 grounding the local-only conclusion in a genuine finite-time blow-up example.
- **Division of labor**: `math.de.ivp` already owns the initial-value-problem framing itself and previews this theorem informally, explicitly deferring full development here (verified by grep — its own Unlocks section names this concept directly); `math.real.lipschitz-continuity` already owns the Lipschitz condition and its own derivative-bound-to-constant mechanism (verified by grep — no ODE-specific content there); `math.real.fixed-point-theorem` (authored immediately before this concept in the same batch specifically to enable this cross-link) already owns the general contraction-mapping existence-and-uniqueness machinery. This concept owns the SPECIFIC instantiation: the Picard operator, the derivation connecting $\partial f/\partial y$'s continuity to the Lipschitz/contraction condition, and the local-existence-only conclusion with its genuine blow-up counterexample.
- Example 3's deliberate choice of $y'=y^2$ (an equation whose EXPLICIT closed-form solution is easily found via separation of variables) rather than an equation requiring numerical approximation was made specifically so the finite-time blow-up could be VERIFIED directly and rigorously, rather than merely asserted as a possibility.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS |
| V-4 | unlocks concepts named accurately from KG | PASS (none listed) |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (`math.real.fixed-point-theorem` confirmed authored earlier in this batch → cross-link probe) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (cross-link probe) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.8×5⌉=4) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Abstract: expert learner already has IVPs and Lipschitz continuity; task is combining them via Picard iteration) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
