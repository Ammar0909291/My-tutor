# Teaching Blueprint: Types of Solutions (`math.de.solution-types`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.de.solution-types` |
| name | Types of Solutions |
| domain | Differential Equations |
| difficulty | advanced |
| bloom | understand |
| mastery_threshold | 0.85 → MAMR = ⌈0.85×5⌉ = 5/5 |
| estimated_hours | 2 |
| requires | `math.de.ode` |
| unlocks | none |
| cross_links | none |
| CPA_entry_stage | C (Concrete) — a solved ODE that mysteriously has an extra solution the general family can't reach, before the formal definition |
| description (KG) | A general solution contains arbitrary constants equal in number to the ODE order. A particular solution fixes those constants from initial/boundary conditions. Singular solutions are not obtainable from the general solution. |

## Component 1 — Learning Objectives

- LO1: Recall (directly reusing `math.de.ode`'s own already-established content, not re-deriving it) that a **general solution** of an $n$th-order ODE contains exactly $n$ arbitrary constants, and a **particular solution** fixes those constants via initial or boundary conditions.
- LO2: Define a **singular solution** as a solution to the ODE that is genuinely NOT obtainable from the general solution for ANY choice of its constant(s) — a solution existing entirely OUTSIDE the general-solution family — and verify a specific singular solution by direct substitution into the ODE.
- LO3: Explain WHY singular solutions arise: typically from a step in the general solution's derivation (e.g. separation of variables) that implicitly assumes some quantity is nonzero (to divide by it) — directly refuting the misconception that every solution to an ODE must be capturable by the general solution formula for some value of the constant(s).

## Component 2 — Prerequisite Check

Assumes mastery of `math.de.ode` (an ODE relates an unknown function to its derivatives; the general solution has $n$ arbitrary constants for an $n$th-order equation; the particular solution fixes them via a condition like $y(x_0)$ — this concept's own MC-3 and worked examples already establish the general/particular distinction in full, which this concept directly reuses rather than re-teaching).

## Component 3 — Core Explanation

**General and particular solutions, briefly recalled**: `math.de.ode` already fully established that an $n$th-order ODE's general solution has exactly $n$ arbitrary constants, and a particular solution is obtained by using $n$ conditions (e.g. initial values) to pin down those constants uniquely. This concept assumes that distinction is solid and moves directly to a THIRD category the general/particular framework does not cover.

**Singular solutions — outside the general-solution family entirely**: a **singular solution** is a function that satisfies the ODE, yet is NOT a member of the general solution family for ANY choice of the constant(s) — no matter what value you plug in, the general formula never produces this particular function. This is a genuinely different phenomenon from a "hard-to-find" particular solution (which IS in the family, just requiring the right constant); a singular solution is structurally EXCLUDED from the family altogether.

**Why singular solutions arise — a gap in the derivation process**: singular solutions typically emerge from a step in solving the ODE (most commonly, separation of variables) that implicitly divides by some expression, silently assuming it is nonzero. If that expression CAN be zero for some function satisfying the original equation, that function is "lost" during the division step — it never appears in the resulting general solution family, yet it still genuinely satisfies the ORIGINAL (undivided) equation. Checking for singular solutions means examining precisely those steps where such an assumption was made, and testing whether the corresponding "forbidden" case yields a genuine solution.

## Component 4 — Worked Examples

**Example 1 (LO1 — general and particular solutions, a quick recall)**: For $y'=3x^2$ (a first-order ODE), the general solution is $y=x^3+C$ (one arbitrary constant, matching the order $1$). Given $y(0)=5$: $0+C=5\Rightarrow C=5$, giving the particular solution $y=x^3+5$ — exactly the already-familiar general/particular machinery from `math.de.ode`, recalled here as the foundation this concept builds beyond.

**Example 2 (LO2 — a genuine singular solution, verified directly)**: Solve $y' = 3y^{2/3}$ by separation of variables: $y^{-2/3}\,dy = 3\,dx$, integrating: $3y^{1/3} = 3x+C_1$, so $y^{1/3}=x+C$ (absorbing constants), giving $y=(x+C)^3$ — the general solution. Now check $y\equiv0$ (the constant zero function) directly in the ORIGINAL equation: $y'=0$ and $3y^{2/3}=3(0)^{2/3}=0$ — both sides equal $0$, so $y\equiv0$ genuinely satisfies the ODE. But is $y\equiv0$ a member of the general family $(x+C)^3$? For ANY constant $C$, $(x+C)^3=0$ only at the single point $x=-C$ — it is NEVER identically zero for all $x$. So $y\equiv0$ is a genuine solution that no choice of $C$ in the general formula can produce — a true SINGULAR solution.

**Example 3 (LO3 — locating the exact gap in the derivation, breaking MC-1)**: Revisit Example 2's separation step: $y^{-2/3}\,dy=3\,dx$ REQUIRES dividing both sides of $\frac{dy}{dx}=3y^{2/3}$ by $y^{2/3}$ — a step that is only valid when $y^{2/3}\ne0$, i.e. when $y\ne0$. This is EXACTLY where the singular solution $y\equiv0$ got silently excluded: the division step implicitly assumed $y\ne0$, so any solution with $y\equiv0$ could never appear in the resulting family, even though it satisfies the original (undivided) equation perfectly well. This proves singular solutions are not a mysterious extra category tacked onto ODEs at random — they arise from a SPECIFIC, identifiable gap in a specific solution technique's assumptions.

## Component 5 — Teaching Actions

### Teaching Action A01 — Recalling General and Particular Solutions (Primitive P11: Representation Shift)

Briefly work Example 1's already-familiar general/particular computation, explicitly stating: "you already fully know this distinction from `math.de.ode` — we're building past it, not re-teaching it."

### Teaching Action A02 — A Genuine Singular Solution, Verified by Direct Substitution (Primitive P28: Conflict Evidence)

Present Example 2's direct evidence: $y\equiv0$ satisfies the original ODE, yet no value of $C$ in $(x+C)^3$ produces it. State: "this solution isn't hiding in the general formula waiting for the right constant — it's genuinely OUTSIDE the family, a completely different kind of solution."

- **MC-1 hook**: ask "must every solution to an ODE be obtainable from the general solution formula for some choice of the constant(s)?" — a "yes" answer reveals MC-1 (believing the general solution formula is exhaustive, missing that singular solutions genuinely lie outside it).

### Teaching Action A03 — Locating the Exact Gap: Division by a Possibly-Zero Quantity (Primitive P11: Representation Shift)

Work Example 3's precise identification of the division step, re-anchoring: "singular solutions aren't random — go back to the step where you divided by something, and ask: could that something have been zero for a genuine solution? If so, check it directly."

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. State the general solution of $y'=4x^3$ and find the particular solution satisfying $y(1)=2$.
  2. For the ODE $y'=2\sqrt{y}$ (separable), find the general solution via separation of variables.
  3. Verify directly that $y\equiv0$ satisfies $y'=2\sqrt{y}$ from problem 2, and explain why it is (or isn't) obtainable from your general solution for any choice of the constant.
  4. Identify the specific step in your separation-of-variables work from problem 2 where an implicit nonzero assumption was made, and explain how this connects to the singular solution you found in problem 3.
- **P76 (Transfer Probe, mode = independence)**: "An engineer models a chemical reaction's concentration decay with the ODE $\frac{dC}{dt} = -k\,C^{1/2}$ (a common form for certain reaction orders), where $C(t)\ge0$ is concentration and $k>0$ is a rate constant. (a) Solve this ODE via separation of variables to find the general solution. (b) Verify that $C(t)\equiv0$ (the reaction has already fully completed, no reactant left) satisfies the original ODE. (c) Explain why $C(t)\equiv0$ is a singular solution here, identifying the specific division step in part (a) responsible for excluding it from the general family, and explain why this makes physical sense (once concentration hits exactly zero, the reaction simply stays at zero forever — a genuinely different long-term behavior than any decaying-toward-zero curve in the general family)."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 5/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | GENERAL-SOLUTION-ASSUMED-EXHAUSTIVE | Believing every solution to an ODE must be obtainable from the general solution formula for some choice of the constant(s), missing that singular solutions genuinely lie outside this family | Foundational |
| MC-2 | SINGULAR-SOLUTION-VERIFICATION-SKIPPED | Asserting a candidate function is a singular solution without directly verifying it satisfies the original ODE by substitution | Foundational |
| MC-3 | DIVISION-STEP-CAUSING-SINGULAR-SOLUTION-NOT-IDENTIFIED | Being unable to trace a singular solution back to the specific step in the general solution's derivation (typically a division by a possibly-zero quantity) that excluded it | Moderate |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 (name it: "General-Solution-Exhaustive Assumption") → P41 (detect: ask whether $y\equiv0$ must be reachable from $(x+C)^3$ for some $C$, given that it satisfies $y'=3y^{2/3}$) → P64 (conceptual shift: re-walk Example 2's direct check — no $C$ makes $(x+C)^3$ identically zero — re-anchoring on "singular solutions are structurally excluded, not just hard to find").
- **B02 (targets MC-2)**: P27 (name it: "Singular-Solution Verification Skipped") → P41 (detect: ask a student to identify a singular solution and check whether they substitute it into the ORIGINAL ODE to confirm it genuinely satisfies the equation) → P64 (conceptual shift: re-walk Example 2's explicit substitution check, re-anchoring on "always verify directly — a candidate singular solution must satisfy the original equation, not just look like a plausible edge case").
- **B03 (targets MC-3)**: P27 (name it: "Division-Step Origin Not Identified") → P41 (detect: ask a student to explain WHY a specific singular solution was excluded from the general family, checking whether they can point to the exact division step) → P64 (conceptual shift: re-walk Example 3's precise identification of the $y^{2/3}$ division step, re-anchoring on "go back to the separation-of-variables step and ask what was implicitly assumed nonzero").

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.de.ode` (the general/particular solution distinction this concept recalls briefly before introducing singular solutions as a third category).
- **Unlocks**: none listed in the KG.
- **Cross-link**: KG lists no cross-links for this concept.

## Component 8 — Teaching Notes

- estimated_hours = 2 with an advanced/understand tag places this at a "3 TAs + gate" tier, each TA kept brief — A01 (a quick recall of already-known material), A02 (verifying a genuine singular solution), and A03 (locating the exact derivation gap) — appropriate for a short concept whose entire distinguishing content is the singular-solution category `math.de.ode` does not cover.
- **Explicit scope note**: this blueprint deliberately does NOT re-teach the general/particular solution distinction in depth — `math.de.ode`'s own Component 3, worked examples, and MC-3 already fully establish it (including the "$n$ constants for order $n$" principle and initial-condition fixing) — Component 3/A01 here is a brief recall only, with the concept's real teaching weight placed entirely on singular solutions (LO2, LO3), the genuinely new content this concept exists to add.
- Example 2's $y'=3y^{2/3}$ was chosen as the standard, canonical textbook illustration of a singular solution arising from separation of variables — its verification ($y\equiv0$ satisfying the original equation but unreachable from $(x+C)^3$) is simple enough to check by direct substitution, keeping the arithmetic minimal so the conceptual point (existence outside the family) remains the focus.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS |
| V-4 | unlocks concepts named accurately from KG | PASS (none) |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (empty in KG → independence) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.85×5⌉=5) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Concrete: a solved ODE with an extra, unreachable solution before the formal definition) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
