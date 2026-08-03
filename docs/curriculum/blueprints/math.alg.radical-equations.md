# Teaching Blueprint: Radical Equations (`math.alg.radical-equations`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.alg.radical-equations` |
| name | Radical Equations |
| domain | Algebra |
| difficulty | proficient |
| bloom | apply |
| mastery_threshold | 0.75 → MAMR = ⌈0.75×5⌉ = 4/5 |
| estimated_hours | 5 |
| requires | `math.alg.radicals` |
| unlocks | (none in KG) |
| cross_links | (none) |
| CPA_entry_stage | A (Abstract) |
| description (KG) | Equations in which the variable appears under a radical sign; solved by isolating the radical and squaring (requiring check for extraneous solutions).

 |

## Component 1 — Learning Objectives

- LO1: Solve a radical equation by first ISOLATING the radical (getting it alone on one side), then SQUARING both sides to eliminate it.
- LO2: Solve the resulting polynomial equation using appropriate prior techniques.
- LO3: Check every candidate solution against the ORIGINAL (unsquared) equation, correctly identifying and discarding EXTRANEOUS solutions introduced by the squaring step.

## Component 2 — Prerequisite Check

Assumes mastery of `math.alg.radicals` (what a radical represents) — this concept solves equations where the variable sits under such a radical.

## Component 3 — Core Explanation

A **radical equation** has the variable appearing under a radical (square root, cube root, etc.). Solved by: (1) ISOLATE the radical (get it alone on one side of the equation); (2) SQUARE both sides (or raise to the matching power for a higher-index root), eliminating the radical; (3) solve the resulting polynomial equation; (4) CHECK every candidate solution against the ORIGINAL equation.

The check is CRITICAL because SQUARING is not a reversible operation in general — squaring both sides of an equation can introduce EXTRANEOUS solutions (values that satisfy the squared equation but NOT the original), since squaring loses information about SIGN (both $a=b$ and $a=-b$ squared give $a^2=b^2$).

## Component 4 — Worked Examples

**Example 1 (LO1, LO2 — standard case)**: Solve $\sqrt{x+3}=4$. Already isolated. Square both sides: $x+3=16\Rightarrow x=13$. Check: $\sqrt{13+3}=\sqrt{16}=4$ ✓ — genuine solution.

**Example 2 (LO3 — an extraneous solution introduced by squaring, breaking MC-1)**: Solve $\sqrt{x+2}=x$. Square both sides: $x+2=x^2\Rightarrow x^2-x-2=0\Rightarrow(x-2)(x+1)=0\Rightarrow x=2$ or $x=-1$. Check $x=2$: $\sqrt{2+2}=\sqrt4=2$ ✓ genuine. Check $x=-1$: $\sqrt{-1+2}=\sqrt1=1$, but the ORIGINAL equation requires this to equal $x=-1$ — $1\ne-1$, so $x=-1$ is EXTRANEOUS and must be discarded. A common error accepts BOTH candidates from the squared equation without checking each against the original, missing that squaring $\sqrt{x+2}=x$ silently also captures solutions to the DIFFERENT equation $\sqrt{x+2}=-x$ (since both square to the same result), one of which is not a genuine solution to the original.

**Example 3 (LO1 — isolating the radical before squaring, breaking MC-2)**: Solve $\sqrt{2x-1}+3=x$. FIRST isolate the radical: $\sqrt{2x-1}=x-3$ (subtracting 3 from both sides). THEN square: $2x-1=(x-3)^2=x^2-6x+9\Rightarrow x^2-8x+10=0$. A common error squares BEFORE isolating the radical (e.g. squaring $\sqrt{2x-1}+3$ directly as a single expression), incorrectly expanding it as if it were $(\sqrt{2x-1})^2+3^2$ rather than correctly using $(\sqrt{2x-1}+3)^2=(2x-1)+6\sqrt{2x-1}+9$ — squaring a SUM involving a radical, without first isolating that radical alone, produces a MORE complicated expression (still containing a radical) rather than eliminating it, defeating the purpose of the squaring step.

## Component 5 — Teaching Actions

### Teaching Action A01 — Isolate the Radical BEFORE Squaring (Primitive P64: Conceptual Shift)

Work Example 3 in full, explicitly performing the isolation step FIRST (subtracting the 3) before squaring, contrasting against the flawed attempt to square the entire two-term expression directly — showing the isolated version cleanly eliminates the radical while the un-isolated attempt does not.

- **MC-2 hook**: this directly targets MC-2 (squaring before isolating the radical, producing an incompletely-simplified result).

### Teaching Action A02 — Squaring Can Introduce Extraneous Solutions — Always Check (Primitive P06: Contrast Pair)

Work Example 2's two-candidate case, checking each against the ORIGINAL equation individually and showing one passes while the other fails. State the rule: "squaring loses sign information — always check EVERY candidate against the original (pre-squared) equation, since squaring can silently pull in solutions to a DIFFERENT, sign-flipped equation."

- **MC-1 hook**: this directly targets MC-1 (accepting all candidates from the squared equation without individually checking each against the original).

### Teaching Action A03 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78. MAMR = ⌈0.75×5⌉ = 4/5.

- **P77 (4-problem set)**:
  1. Solve $\sqrt{2x+5}=7$.
  2. Solve $\sqrt{x+6}=x$, checking each candidate for extraneous solutions.
  3. Solve $\sqrt{3x-2}-1=x-3$, isolating the radical before squaring.
  4. Explain, in one sentence, why squaring both sides of an equation can introduce extraneous solutions.
- **P76 (Transfer Probe, mode = independence)**: "A physics formula relates a pendulum's period to its length via $T=2\pi\sqrt{\frac{L}{g}}$; a student rearranges this to solve for $L$ given a specific measured period $T=2$ seconds and $g=9.8$ (so $2=2\pi\sqrt{L/9.8}$). (a) Isolate the radical and solve for $L$. (b) Explain why, in this particular physical scenario, checking for extraneous solutions is somewhat less likely to be an issue in PRACTICE (hint: consider what physical quantities like length and period must always be, sign-wise) — while still explaining why the general algebraic check remains good mathematical practice regardless."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 4/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed misconception's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | RADICAL-EQUATION-CANDIDATES-NOT-CHECKED-AGAINST-ORIGINAL | Accepting every candidate solution from the squared equation without individually checking each against the original (unsquared) equation | Foundational |
| MC-2 | RADICAL-SQUARED-BEFORE-BEING-ISOLATED | Squaring both sides of a radical equation before first isolating the radical alone on one side, producing an incompletely-simplified result | Foundational |
| MC-3 | SQUARED-SUM-EXPANDED-INCORRECTLY | When a radical equation, once isolated, still involves squaring a binomial (e.g. $(x-3)^2$), expanding it incorrectly (e.g. as $x^2-9$ instead of $x^2-6x+9$) | Moderate |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 ("Radical Equation Candidates Not Checked Against Original") → P41 (detect: present Example 2 and check whether both $x=2$ and $x=-1$ are accepted without individual verification) → P64 (conceptual shift: re-substitute EACH candidate separately into the original unsquared equation, showing one fails).
- **B02 (targets MC-2)**: P27 ("Radical Squared Before Being Isolated") → P41 (detect: present Example 3 and check whether the radical is isolated before squaring) → P64 (conceptual shift: re-attempt squaring the un-isolated expression directly, showing the radical does NOT disappear, then re-derive correctly after isolating first).
- **B03 (targets MC-3)**: P27 ("Squared Sum Expanded Incorrectly") → P41 (detect: review a submitted binomial-squaring step for a missing middle term) → P64 (conceptual shift: re-expand using the full $(a-b)^2=a^2-2ab+b^2$ pattern from `math.alg.factoring-special`, explicitly including the middle term).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.alg.radicals`.
- **Unlocks**: none recorded in the KG.
- **Related**: `math.alg.simplifying-radicals` (radical manipulation this concept assumes fluency with), `math.alg.factoring-special` (the perfect-square-trinomial expansion this concept's binomial-squaring step reuses).

## Component 8 — Teaching Notes

- estimated_hours = 5 reflects that this concept combines radical isolation, squaring mechanics (including binomial expansion), polynomial solving, and the genuinely distinct extraneous-solution check into one multi-stage procedure.
- MC-1 and MC-2 are both ranked foundational because each corrupts the solving process at a DIFFERENT stage — MC-2 at the start (premature squaring) and MC-1 at the end (missing verification) — together spanning the entire procedure's critical junctures.
- The pendulum transfer probe was deliberately designed with a genuine physical constraint (length and period are always positive) to test whether students can reason about WHY extraneous solutions are less practically likely in certain applied contexts, while still correctly maintaining the general algebraic verification discipline — a nuanced but valuable distinction between mathematical rigor and applied context.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (`math.alg.radicals`) |
| V-4 | unlocks concepts named accurately from KG | PASS (none) |
| V-5 | cross_links checked against disk | PASS (none declared) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A03) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.75×5⌉=4) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Abstract) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1/LO2, Ex2→LO3, Ex3→LO1) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
