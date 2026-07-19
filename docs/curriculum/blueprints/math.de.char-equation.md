# Teaching Blueprint: Characteristic Equation (`math.de.char-equation`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.de.char-equation` |
| name | Characteristic Equation |
| domain | Differential Equations |
| difficulty | advanced |
| bloom | apply |
| mastery_threshold | 0.9 → MAMR = ⌈0.9×5⌉ = 5/5 |
| estimated_hours | 4 |
| requires | `math.de.second-order-homogeneous`, `math.alg.quadratic-formula` |
| unlocks | none |
| cross_links | `math.linalg.characteristic-polynomial` (not yet authored — see Component 7) |
| CPA_entry_stage | A (Abstract) — advanced learner already has the Wronskian/fundamental-set machinery and the quadratic formula; the substitution ansatz is introduced directly |
| description (KG) | For constant-coefficient ODE ay″+by′+cy=0, substituting y=e^{rx} yields the characteristic equation ar²+br+c=0. The three cases (distinct real, repeated, complex roots) yield distinct solution forms. |

## Component 1 — Learning Objectives

- LO1: Derive the **characteristic equation** $ar^2+br+c=0$ by substituting the ansatz $y=e^{rx}$ into $ay''+by'+cy=0$, and recognize that solving this ALGEBRAIC equation for $r$ (via `math.alg.quadratic-formula`) directly produces candidate exponential solutions.
- LO2: Handle the **distinct real roots** case: two distinct real roots $r_1\ne r_2$ give the fundamental set $y_1=e^{r_1x}$, $y_2=e^{r_2x}$ — reusing `math.de.second-order-homogeneous`'s own Wronskian verification to confirm these are genuinely linearly independent.
- LO3 (orientation level — full derivation deferred): recognize, without full derivation, that REPEATED roots require the modified form $y=(c_1+c_2x)e^{rx}$ (an extra factor of $x$, since $e^{rx}$ used twice would be linearly dependent) and COMPLEX roots ($r=\alpha\pm\beta i$) require the real-valued form $y=e^{\alpha x}(c_1\cos\beta x+c_2\sin\beta x)$ — the three-way case split determined by the SAME discriminant sign already familiar from `math.alg.quadratic-formula`.

## Component 2 — Prerequisite Check

Assumes mastery of `math.de.second-order-homogeneous` (the superposition principle, fundamental sets, and the Wronskian test for linear independence) and `math.alg.quadratic-formula` (solving $ar^2+br+c=0$, and the discriminant's sign determining the root-count classification).

## Component 3 — Core Explanation

**Why $y=e^{rx}$ converts a differential equation into an algebraic one**: exponentials are the unique functions whose derivatives are proportional to themselves ($y'=re^{rx}$, $y''=r^2e^{rx}$) — substituting this ansatz into $ay''+by'+cy=0$ gives $ar^2e^{rx}+bre^{rx}+ce^{rx}=0$, and since $e^{rx}$ is never zero, it factors out completely, leaving $ar^2+br+c=0$ — a purely algebraic equation for $r$, with the exponential function itself gone from the equation to solve.

**Distinct real roots, verified via the Wronskian**: solving $ar^2+br+c=0$ (via `math.alg.quadratic-formula`) for two DISTINCT real roots $r_1,r_2$ gives candidate solutions $y_1=e^{r_1x}$, $y_2=e^{r_2x}$. Finding two roots is not automatically the same as having a genuine fundamental set — `math.de.second-order-homogeneous`'s own Wronskian test must still confirm linear independence, exactly as that concept established for any pair of candidate solutions.

**The three-case split, governed by the discriminant (orientation level)**: the discriminant $b^2-4ac$ (already familiar from `math.alg.quadratic-formula`) determines which of three solution FORMS applies. Positive discriminant: distinct real roots, handled above. Zero discriminant: a REPEATED root $r$, requiring $y=(c_1+c_2x)e^{rx}$ — using $e^{rx}$ twice would give only a one-dimensional family, since the two "solutions" would be proportional, not independent. Negative discriminant: COMPLEX roots $r=\alpha\pm\beta i$, requiring the real-valued oscillatory form $y=e^{\alpha x}(c_1\cos\beta x+c_2\sin\beta x)$. Full derivation of the repeated and complex cases is deferred beyond this concept's core scope.

## Component 4 — Worked Examples

**Example 1 (LO1 — deriving the characteristic equation via substitution, breaking MC-1)**: for $y''-5y'+6y=0$, substitute $y=e^{rx}$: $y'=re^{rx}$, $y''=r^2e^{rx}$. Substituting: $r^2e^{rx}-5re^{rx}+6e^{rx}=0$. Factoring out $e^{rx}$ (never zero): $r^2-5r+6=0$ — the characteristic equation, purely algebraic in $r$, with the exponential having disappeared entirely. This confirms WHY the substitution works: it converts a differential equation into an algebraic one.

**Example 2 (LO2 — distinct real roots via the quadratic formula, verified by Wronskian, breaking MC-2)**: continuing Example 1: $r^2-5r+6=0$ (discriminant $=25-24=1>0$) factors as $(r-2)(r-3)=0$, giving DISTINCT real roots $r_1=2$, $r_2=3$. The candidate solutions are $y_1=e^{2x}$, $y_2=e^{3x}$. Verifying via `math.de.second-order-homogeneous`'s own Wronskian test: $W(y_1,y_2)=e^{2x}(3e^{3x})-e^{3x}(2e^{2x})=3e^{5x}-2e^{5x}=e^{5x}\ne0$ for all $x$ — confirming genuine linear independence, so the general solution is $y=c_1e^{2x}+c_2e^{3x}$.

**Example 3 (LO3, orientation level — the three-case split via the discriminant, breaking MC-3)**: for $r^2-5r+6=0$ (Examples 1–2), discriminant $=1>0$ → distinct real roots, handled above. Contrast with $r^2-4r+4=0$: discriminant $=16-16=0$ → REPEATED root $r=2$; the naive guess $y=c_1e^{2x}+c_2e^{2x}$ collapses to a single-term family $(c_1+c_2)e^{2x}$, NOT a genuine 2-dimensional general solution — the correct form is $y=(c_1+c_2x)e^{2x}$. Contrast further with $r^2+4r+13=0$: discriminant $=16-52=-36<0$ → COMPLEX roots $r=-2\pm3i$; the correct real-valued form is $y=e^{-2x}(c_1\cos3x+c_2\sin3x)$. All three cases are governed by the SAME discriminant sign already familiar from `math.alg.quadratic-formula`.

## Component 5 — Teaching Actions

### Teaching Action A01 — The Exponential Ansatz Converts Calculus Into Algebra (Primitive P11: Representation Shift)

State: "$e^{rx}$ isn't an arbitrary guess — its derivatives are proportional to itself, and that's exactly what makes it factor out completely, turning a differential equation into a plain algebraic one." Work Example 1's full substitution, emphasizing the exponential's complete disappearance.

- **MC-1 hook**: ask "is substituting $y=e^{rx}$ an arbitrary trick with no clear reason it should work?" — a "yes" answer reveals MC-1 (missing that exponentials' self-proportional derivative is precisely why the substitution converts the ODE into an algebraic equation).

### Teaching Action A02 — Finding Two Roots Doesn't Automatically Give a Fundamental Set (Primitive P28: Conflict Evidence)

Present Example 2's direct evidence: even after finding distinct roots $r_1=2,r_2=3$, the Wronskian STILL had to be checked to confirm $y_1,y_2$ are genuinely independent. State: "two different-looking exponential solutions aren't automatically a fundamental set — the Wronskian test from `math.de.second-order-homogeneous` still applies here, exactly as it did for any other pair of candidate solutions."

- **MC-2 hook**: ask "if the characteristic equation has two distinct roots, does that automatically guarantee the resulting exponentials form a genuine fundamental set, with no further check needed?" — a "yes" answer reveals MC-2 (missing that the Wronskian test is still the concept doing the actual verification work).

### Teaching Action A03 — Repeated Roots Require a Genuinely Different Form (Primitive P06: Contrast Pair)

Contrast the distinct-roots case (Example 2, two genuinely independent exponentials) against Example 3's repeated-root case, where $c_1e^{2x}+c_2e^{2x}$ collapses to a ONE-dimensional family, requiring the fix $y=(c_1+c_2x)e^{2x}$. State: "a repeated root isn't just 'the same case, twice' — using the same exponential twice collapses the solution space, and the extra factor of $x$ is specifically what restores the missing dimension."

- **MC-3 hook**: ask "for a repeated root $r_1=r_2=r$, do $y_1=e^{rx}$ and $y_2=e^{rx}$ (or any constant multiple) form a genuine fundamental set?" — a "yes" answer reveals MC-3 (missing that these are identical or proportional functions, collapsing the general solution to one dimension, requiring the $x\cdot e^{rx}$ fix).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. Substitute $y=e^{rx}$ into $y''-7y'+12y=0$ and derive the characteristic equation.
  2. Solve the characteristic equation from problem 1 using the quadratic formula, and write the general solution using the resulting roots.
  3. For $y''+6y'+9y=0$, find the characteristic equation's roots, determine whether they are repeated, and write the CORRECT general solution form (justifying why the naive $c_1e^{rx}+c_2e^{rx}$ form would be wrong if the roots are repeated).
  4. Without fully solving, use the discriminant of the characteristic equation for $y''+2y'+5y=0$ to determine which of the three solution-form cases (distinct real, repeated, complex) applies.
- **P76 (Transfer Probe, mode = independence)**: "A damped spring-mass system is modeled by the ODE $y''+4y'+13y=0$. (a) Substitute $y=e^{rx}$ and derive the characteristic equation. (b) Use the discriminant to determine, before solving, which of the three solution-form cases applies. (c) Solve the characteristic equation and write the correct general solution form, explaining why physically this makes sense for a damped oscillating system (i.e., why you'd expect an oscillatory term combined with a decaying exponential factor, rather than either alone)."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 5/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | EXPONENTIAL-ANSATZ-ASSUMED-ARBITRARY | Believing the substitution $y=e^{rx}$ is an arbitrary trick with no clear motivation, missing that exponentials' self-proportional derivative is exactly why it converts the ODE into an algebraic equation | Foundational |
| MC-2 | DISTINCT-ROOTS-ASSUMED-TO-AUTOMATICALLY-GIVE-FUNDAMENTAL-SET | Believing two distinct roots automatically produce a genuine fundamental set, missing that the Wronskian test is still required to confirm linear independence | High |
| MC-3 | REPEATED-ROOT-ASSUMED-TO-GIVE-TWO-INDEPENDENT-SOLUTIONS | Believing a repeated root still yields two independent solutions via $e^{rx}$ used twice, missing that this collapses to a one-dimensional family, requiring the $(c_1+c_2x)e^{rx}$ fix | Moderate |

- **B01 (targets MC-1)**: P27 (name it: "Exponential Ansatz Assumed Arbitrary") → P41 (detect: ask whether $y=e^{rx}$ is an arbitrary substitution with no clear reason to work) → P64 (conceptual shift: re-walk Example 1's factoring-out demonstration, re-anchoring on "the exponential's self-proportional derivative is exactly why this converts calculus into algebra").
- **B02 (targets MC-2)**: P27 (name it: "Distinct Roots Assumed to Automatically Give Fundamental Set") → P41 (detect: ask whether finding two distinct roots automatically guarantees a fundamental set) → P64 (conceptual shift: re-walk Example 2's Wronskian verification, re-anchoring on "the Wronskian test is still doing the actual verification work").
- **B03 (targets MC-3)**: P27 (name it: "Repeated Root Assumed to Give Two Independent Solutions") → P41 (detect: ask whether a repeated root still yields two independent solutions via $e^{rx}$ used twice) → P64 (conceptual shift: re-walk Example 3's collapse demonstration, re-anchoring on "the extra factor of $x$ is specifically what restores the missing dimension").

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.de.second-order-homogeneous` (the Wronskian test and fundamental-set machinery this concept's distinct-roots case directly reuses) and `math.alg.quadratic-formula` (solving the characteristic equation and reading its discriminant, which directly determines this concept's three-way case split).
- **Unlocks**: none listed in the KG for this concept.
- **Cross-link**: KG lists `math.linalg.characteristic-polynomial`, checked via `ls docs/curriculum/blueprints/` and confirmed NOT YET authored. $P76_{mode}=$ **independence**.

## Component 8 — Teaching Notes

- estimated_hours = 4 with an advanced/apply tag supports the "3 TAs + gate" tier, with LO1 and LO2 at full computational depth (the substitution derivation and the distinct-roots case, fully verified via the Wronskian) and LO3 kept orientation-level, appropriately surveying the repeated and complex cases without deriving their own general solution forms from scratch.
- **Division of labor**: `math.de.second-order-homogeneous` owns the Wronskian/fundamental-set machinery generally; `math.alg.quadratic-formula` owns solving the resulting algebraic equation and reading its discriminant. This concept owns the SPECIFIC exponential-ansatz substitution and the three-way case split it produces, deliberately reusing the SAME characteristic equation ($r^2-5r+6=0$) across Examples 1 and 2 so the derivation and its Wronskian verification read as one continuous worked problem.
- Example 3's deliberate choice to vary only the constant term (6→4→13, keeping other coefficients fixed where possible) across the three discriminant cases was chosen to isolate the discriminant's sign as the single variable determining which solution form applies, rather than introducing three unrelated equations.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS |
| V-4 | unlocks concepts named accurately from KG | PASS (none listed) |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (`math.linalg.characteristic-polynomial` confirmed unauthored → independence) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.9×5⌉=5) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Abstract: advanced learner already has Wronskian machinery and the quadratic formula; ansatz introduced directly) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
