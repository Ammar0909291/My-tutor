# Teaching Blueprint: Multivariable Chain Rule (`math.calc.chain-rule-multivariable`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.calc.chain-rule-multivariable` |
| name | Multivariable Chain Rule |
| domain | Calculus |
| difficulty | advanced |
| bloom | apply |
| mastery_threshold | 0.75 → MAMR = ⌈0.75×5⌉ = 4/5 |
| estimated_hours | 5 |
| requires | `math.calc.partial-derivatives`, `math.calc.chain-rule` |
| unlocks | (none in KG) |
| cross_links | (none) |
| CPA_entry_stage | P (Pictorial) — draw the dependency tree before writing the formula |
| description (KG) | Generalizes the chain rule to functions of multiple variables via a tree of partial derivatives; fundamental for implicit differentiation in multiple variables.

 |

## Component 1 — Learning Objectives

- LO1: Apply the multivariable chain rule $\frac{dz}{dt}=\frac{\partial z}{\partial x}\frac{dx}{dt}+\frac{\partial z}{\partial y}\frac{dy}{dt}$ when $z=f(x,y)$ and $x,y$ are BOTH functions of a single variable $t$ — summing the contribution through EACH intermediate variable's path.
- LO2: Draw the DEPENDENCY TREE (showing $z$ depending on $x,y$, each of which depends on $t$) BEFORE writing the formula, to correctly identify EVERY path from $z$ down to $t$ — omitting a path (a missing branch) produces an incomplete, incorrect formula.
- LO3: Apply the analogous rule when $x,y$ depend on TWO variables $s,t$ instead of one — e.g. $\frac{\partial z}{\partial s}=\frac{\partial z}{\partial x}\frac{\partial x}{\partial s}+\frac{\partial z}{\partial y}\frac{\partial y}{\partial s}$ — recognizing that each PARTIAL (not total) derivative with respect to $s$ still sums over every intermediate path, but uses $\partial$ throughout rather than mixing in any $d/dt$-style total derivatives.

## Component 2 — Prerequisite Check

Assumes mastery of `math.calc.partial-derivatives` (the building blocks $\partial z/\partial x$, etc.) and `math.calc.chain-rule` (the single-variable version this generalizes).

## Component 3 — Core Explanation

The **multivariable chain rule** generalizes the ordinary chain rule to functions of several variables. If $z=f(x,y)$ where $x=x(t)$ and $y=y(t)$ (both functions of a single variable $t$), then $\frac{dz}{dt}=\frac{\partial z}{\partial x}\cdot\frac{dx}{dt}+\frac{\partial z}{\partial y}\cdot\frac{dy}{dt}$ — the total rate of change of $z$ with respect to $t$ sums the contribution flowing through EACH intermediate variable ($x$ and $y$ separately), since $z$ can change either because $x$ changes OR because $y$ changes (or both).

A DEPENDENCY TREE — a diagram showing $z$ at the top, branching down to $x$ and $y$, each branching further down to $t$ — makes this structure explicit and helps avoid missing a path: EVERY path from $z$ down to the final variable contributes ONE term (a product of partial/ordinary derivatives along that path), and the total derivative SUMS all these path-contributions.

When $x,y$ instead depend on TWO variables $s,t$ (e.g. $x=x(s,t)$, $y=y(s,t)$), the analogous rule applies for EACH variable separately: $\frac{\partial z}{\partial s}=\frac{\partial z}{\partial x}\frac{\partial x}{\partial s}+\frac{\partial z}{\partial y}\frac{\partial y}{\partial s}$ (and similarly for $\frac{\partial z}{\partial t}$) — using PARTIAL derivatives throughout, since $x$ and $y$ each depend on MULTIPLE variables now, not just $t$ alone.

## Component 4 — Worked Examples

**Example 1 (LO1, LO2 — single-variable case with dependency tree, breaking MC-1)**: For $z=x^2y$, $x=t^2$, $y=t^3$, find $\frac{dz}{dt}$. Dependency tree: $z\to x\to t$ and $z\to y\to t$ (two paths). $\frac{\partial z}{\partial x}=2xy$, $\frac{dx}{dt}=2t$; $\frac{\partial z}{\partial y}=x^2$, $\frac{dy}{dt}=3t^2$. $\frac{dz}{dt}=2xy(2t)+x^2(3t^2)$. Substituting $x=t^2,y=t^3$: $=2(t^2)(t^3)(2t)+(t^2)^2(3t^2)=4t^6+3t^6=7t^6$. A common error computes only ONE term (e.g. only the $x$-path contribution, $\frac{\partial z}{\partial x}\frac{dx}{dt}$), OMITTING the $y$-path entirely — missing a branch of the dependency tree produces an incomplete formula that misses a genuine source of $z$'s change.

**Example 2 (LO2 — verifying via direct substitution)**: For the same functions in Example 1, verify by substituting $x=t^2,y=t^3$ directly into $z=x^2y$ FIRST: $z=(t^2)^2(t^3)=t^7$, so $\frac{dz}{dt}=7t^6$ — matching Example 1's chain-rule result exactly, confirming the multivariable chain rule's correctness as a genuine shortcut to what direct substitution-then-differentiation would also give (though the chain rule is far more practical when direct substitution is messy or the functions are abstract).

**Example 3 (LO3 — two-variable case, breaking MC-2)**: For $z=x^2+y^2$, $x=s+t$, $y=s-t$, find $\frac{\partial z}{\partial s}$. $\frac{\partial z}{\partial x}=2x$, $\frac{\partial x}{\partial s}=1$; $\frac{\partial z}{\partial y}=2y$, $\frac{\partial y}{\partial s}=1$. $\frac{\partial z}{\partial s}=2x(1)+2y(1)=2x+2y=2(s+t)+2(s-t)=4s$. A common error mixes $d/dt$-STYLE total-derivative notation into a genuinely multi-variable-input situation (writing $\frac{dz}{ds}$ as if $s$ were the ONLY variable $x,y$ depended on) — when $x$ and $y$ depend on MULTIPLE variables ($s$ AND $t$), every derivative in the formula must be a PARTIAL derivative (holding the other variable fixed), never a total derivative.

## Component 5 — Teaching Actions

### Teaching Action A01 — Draw the Dependency Tree and Sum Every Path (Primitive P64: Conceptual Shift)

Work Example 1, explicitly drawing the two-branch dependency tree before writing the formula, ensuring both paths are included.

- **MC-1 hook**: check whether every path in the dependency tree is included in the sum.

### Teaching Action A02 — Verifying the Chain Rule Against Direct Substitution (reused procedure)

Work Example 2, cross-checking the chain-rule result against direct substitution as a sanity check.

### Teaching Action A03 — Use Partial Derivatives Throughout When Multiple Input Variables Exist (Primitive P06: Contrast Pair)

Work Example 3, explicitly contrasting the correct all-partial-derivative notation against the incorrect mixed total/partial notation.

- **MC-2 hook**: this directly targets MC-2 (mixing total-derivative notation into a genuinely multi-variable-input scenario).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78. MAMR = ⌈0.75×5⌉ = 4/5.

- **P77 (4-problem set)**:
  1. For $z=xy$, $x=\cos t$, $y=\sin t$, find $\frac{dz}{dt}$ using the multivariable chain rule, first drawing the dependency tree.
  2. Verify your answer to problem 1 by directly substituting $x,y$ into $z=xy$ and differentiating.
  3. For $z=x^2y^3$, $x=s^2t$, $y=st^2$, find $\frac{\partial z}{\partial t}$.
  4. Explain, in one sentence, why every branch of the dependency tree must contribute a term to the chain-rule sum.
- **P76 (Transfer Probe, mode = independence)**: "A meteorologist models atmospheric pressure $P(x,y)$ as a function of geographic position, and a weather balloon's position $x(t),y(t)$ changes over time as it drifts. (a) Explain how the multivariable chain rule lets the meteorologist find the RATE OF CHANGE of pressure experienced by the balloon, $\frac{dP}{dt}$, without needing to substitute the balloon's full trajectory into $P$ directly. (b) Draw (describe) the dependency tree for this scenario, and identify what each branch physically represents."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 4/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed misconception's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | DEPENDENCY-TREE-PATH-OMITTED-FROM-CHAIN-RULE-SUM | Omitting one branch/path of the dependency tree from the chain-rule sum, producing an incomplete formula that misses a genuine source of change | Foundational |
| MC-2 | TOTAL-DERIVATIVE-NOTATION-MIXED-IN-WHEN-MULTIPLE-INPUT-VARIABLES-EXIST | Using total-derivative (d/dt) notation for a variable that actually depends on multiple input variables, rather than consistently using partial derivatives | Foundational |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 ("Dependency Tree Path Omitted from Chain Rule Sum") → P41 (detect: present Example 1 and check whether only one path's contribution is included) → P64 (conceptual shift: re-draw the dependency tree explicitly, confirming every branch is represented as a term).
- **B02 (targets MC-2)**: P27 ("Total Derivative Notation Mixed in When Multiple Input Variables Exist") → P41 (detect: present Example 3 and check whether total-derivative notation is (incorrectly) used) → P64 (conceptual shift: re-identify how many variables each intermediate function genuinely depends on, switching to partial-derivative notation throughout).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.calc.partial-derivatives`, `math.calc.chain-rule`.
- **Unlocks**: none recorded in the KG.

## Component 8 — Teaching Notes

- estimated_hours = 5 reflects the genuine conceptual leap from single-variable to multivariable dependency structures, requiring careful bookkeeping.
- Both misconceptions were ranked Foundational because each produces a formula that is missing genuine mathematical content (a path, or the correct derivative type), not merely imprecise.
- The weather-balloon transfer probe was deliberately chosen because tracking a changing quantity along a moving trajectory through a multivariable field is a genuinely common real-world application (meteorology, robotics, fluid dynamics), motivating the chain rule's practical necessity beyond an abstract exercise.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (`math.calc.partial-derivatives`, `math.calc.chain-rule`) |
| V-4 | unlocks concepts named accurately from KG | PASS (none) |
| V-5 | cross_links checked against disk | PASS (none declared) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (2 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.75×5⌉=4) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Pictorial: dependency tree before formula) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1/LO2, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
