# Teaching Blueprint: Second-Order Linear ODE (`math.de.second-order-linear`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.de.second-order-linear` |
| name | Second-Order Linear ODE |
| domain | Differential Equations |
| difficulty | advanced |
| bloom | understand |
| mastery_threshold | 0.85 → MAMR = ⌈0.85×5⌉ = 5/5 |
| estimated_hours | 4 |
| requires | `math.de.second-order-ode`, `math.de.ode-linearity` |
| unlocks | `math.de.second-order-homogeneous` |
| cross_links | none |
| CPA_entry_stage | A (Abstract) — direct classification grounded immediately in already-known linearity criterion |
| description (KG) | An ODE y″ + P(x)y′ + Q(x)y = G(x). When G=0 it is homogeneous; when G≠0 it is nonhomogeneous. Solutions form a vector space (superposition principle applies for homogeneous case). |

## Component 1 — Learning Objectives

- LO1: Recognize the standard form of a **second-order linear ODE**, $y''+P(x)y'+Q(x)y=G(x)$, and correctly classify a given second-order ODE as linear (matching this form) using the linearity criterion already established.
- LO2: Distinguish **homogeneous** ($G(x)=0$, so $y''+P(x)y'+Q(x)y=0$) from **nonhomogeneous** ($G(x)\neq0$) second-order linear ODEs, and correctly identify which case a given equation falls into.
- LO3: State and apply the **superposition principle** for the homogeneous case: if $y_1$ and $y_2$ are both solutions, then $c_1y_1+c_2y_2$ is ALSO a solution for any constants $c_1,c_2$ — and explain why this means the homogeneous solution set forms a **vector space**, while explicitly recognizing superposition FAILS for the nonhomogeneous case.

## Component 2 — Prerequisite Check

Assumes mastery of `math.de.second-order-ode` (the general second-order ODE, involving $y''$, standard form $y''+P(x)y'+Q(x)y=G(x)$) and `math.de.ode-linearity` (the general linearity criterion — coefficients depending only on $x$, no products or nonlinear functions of $y$).

## Component 3 — Core Explanation

A **second-order linear ODE** has the standard form:
$$y'' + P(x)y' + Q(x)y = G(x)$$
matching the general linearity criterion already established: $y,y',y''$ each appear to the first power, unmultiplied, with coefficients ($1, P(x), Q(x)$) depending only on $x$.

**Homogeneous vs. nonhomogeneous**: when $G(x)=0$, the equation is **homogeneous**: $y''+P(x)y'+Q(x)y=0$. When $G(x)\neq0$ (some nonzero function of $x$ on the right side), it's **nonhomogeneous**.

**The superposition principle (homogeneous case only)**: if $y_1$ and $y_2$ are both solutions to the SAME homogeneous equation, then $c_1y_1+c_2y_2$ is ALSO a solution, for any constants $c_1,c_2$. This follows directly from the linearity of the operator $L[y]=y''+P(x)y'+Q(x)y$: $L[c_1y_1+c_2y_2] = c_1L[y_1]+c_2L[y_2] = c_1(0)+c_2(0)=0$ (using $L[y_1]=L[y_2]=0$ since both are solutions of $L[y]=0$).

**Why this means the solution set is a vector space**: the set of all solutions to a homogeneous linear ODE is closed under addition and scalar multiplication (exactly the superposition principle), and contains the zero function (trivially a solution) — satisfying the key vector-space closure properties.

**Superposition fails for nonhomogeneous equations**: if $y_1,y_2$ both solve the SAME nonhomogeneous equation $L[y]=G(x)$ (with $G\neq0$), then $L[c_1y_1+c_2y_2] = c_1G(x)+c_2G(x) = (c_1+c_2)G(x)$ — this only equals $G(x)$ again if $c_1+c_2=1$, NOT for arbitrary constants. So arbitrary linear combinations of nonhomogeneous solutions are generally NOT themselves solutions — superposition, in its simple form, is strictly a homogeneous-case privilege.

## Component 4 — Worked Examples

**Example 1 (LO1/LO2 — classifying standard form)**: $y''+3xy'-e^x y=\sin x$. This matches $y''+P(x)y'+Q(x)y=G(x)$ with $P(x)=3x$, $Q(x)=-e^x$, $G(x)=\sin x$. Since $G(x)=\sin x\neq0$, this is **nonhomogeneous**.

**Example 2 (LO3 — verifying superposition for a homogeneous equation)**: For $y''-y=0$ (homogeneous, $P=0,Q=-1,G=0$), verify $y_1=e^x$ and $y_2=e^{-x}$ are both solutions: $y_1''=e^x=y_1$ ✓ (satisfies $y''-y=0$); $y_2''=e^{-x}=y_2$ ✓. Now check $y=3e^x-2e^{-x}$ (a specific linear combination): $y''=3e^x-2e^{-x}=y$ — indeed $y''-y=0$ ✓, confirming this combination IS also a solution, exactly as superposition predicts.

**Example 3 (LO3 — superposition failing for nonhomogeneous, breaking MC-1)**: For $y''-y=2$ (nonhomogeneous, $G=2$), verify $y_1=-2$ is a particular solution ($y_1''=0$, so $y_1''-y_1=0-(-2)=2$ ✓). Check whether $2y_1=-4$ is also a solution: $(2y_1)''-2y_1 = 0-(-4)=4\neq2$ — **NOT** a solution, since $4\neq2$. This directly demonstrates that scaling a nonhomogeneous solution by a constant does NOT generally preserve the solution property — superposition genuinely fails here, confirming it is a strictly homogeneous-case phenomenon.

## Component 5 — Teaching Actions

### Teaching Action A01 — Standard Form, Homogeneous vs. Nonhomogeneous (Primitive P11: Representation Shift)

Recall the general linearity criterion. State: "second-order linear ODEs all fit the SAME template — $y''+P(x)y'+Q(x)y=G(x)$ — with everything hinging on whether the right side, $G(x)$, is zero or not." Work Example 1's classification directly, identifying $P,Q,G$ explicitly and determining homogeneous/nonhomogeneous status.

Shift representation to the superposition principle: state it directly, then work Example 2's explicit verification — showing two individual solutions AND a specific linear combination of them all genuinely satisfy the same homogeneous equation.

- **MC-1 hook**: ask "if $y_1$ solves a nonhomogeneous equation $L[y]=G(x)$, does $2y_1$ also solve it?" — a "yes" answer (assuming superposition-like behavior carries over from the homogeneous case) reveals MC-1 (believing superposition/scaling of solutions applies to nonhomogeneous equations the same way it does for homogeneous ones).

### Teaching Action A02 — Superposition Is Strictly a Homogeneous Privilege (Primitive P06: Contrast Pair)

**Contrast 1 (targets MC-1)**: Place Example 2 (homogeneous, superposition genuinely holds — verified directly) beside Example 3 (nonhomogeneous, scaling a solution FAILS to produce another solution — also verified directly). State the rule with full precision: "superposition ($L[c_1y_1+c_2y_2]=c_1L[y_1]+c_2L[y_2]$) is always TRUE as an algebraic fact about the linear operator $L$ itself — but it only translates into 'a combination of solutions is a solution' when the right-hand side is ZERO, since $c_1(0)+c_2(0)=0$ but $c_1G+c_2G\neq G$ in general."

**Contrast 2**: Connect the homogeneous solution set's closure properties (Example 2) directly to the vector-space concept: "closed under addition, closed under scalar multiplication, contains the zero function — these are exactly the closure axioms a vector space needs; the SET of all solutions to a homogeneous linear ODE genuinely forms a vector space, a fact with real structural consequences for how many independent solutions you need to describe the general solution."

### Teaching Action A03 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. Classify $y''-2xy'+y=0$ as homogeneous or nonhomogeneous, identifying $P(x),Q(x),G(x)$.
  2. Classify $x^2y''+y'-3y=x^3$ as homogeneous or nonhomogeneous, identifying $P(x),Q(x),G(x)$.
  3. For the homogeneous equation $y''-4y=0$, verify that $y_1=e^{2x}$ and $y_2=e^{-2x}$ are both solutions, then verify that $5y_1-3y_2$ is also a solution.
  4. For the nonhomogeneous equation $y''-4y=8$, verify that $y_1=-2$ is a particular solution, then check whether $3y_1$ is also a solution, explaining the result.
- **P76 (Transfer Probe, mode = independence)**: "A mechanical engineer models a vibrating beam's displacement using a second-order linear ODE. In the FREE-vibration case (no external forcing), the equation is homogeneous; when an external periodic force is applied, it becomes nonhomogeneous. (a) Explain, using this lesson's superposition principle, why an engineer analyzing free vibration can safely combine two known vibration-mode solutions (e.g. representing different frequencies) into new valid solutions by simple linear combination. (b) Explain why, once an external forcing term is added (nonhomogeneous case), the engineer CANNOT simply scale a known particular solution by an arbitrary constant and expect it to still satisfy the forced equation — connecting your answer directly to this lesson's demonstrated failure of superposition in the nonhomogeneous case."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 5/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | SUPERPOSITION-APPLIED-TO-NONHOMOGENEOUS-CASE | Believing the superposition principle (combinations of solutions are solutions) applies to nonhomogeneous linear ODEs the same way it applies to homogeneous ones | Foundational |
| MC-2 | HOMOGENEOUS-NONHOMOGENEOUS-DETERMINED-BY-COEFFICIENT-STRUCTURE | Determining homogeneous/nonhomogeneous status by looking at the complexity of $P(x)$ or $Q(x)$, rather than correctly checking only whether the right-hand side $G(x)$ is zero | Moderate |
| MC-3 | SOLUTION-SET-VECTOR-SPACE-STATUS-ASSUMED-FOR-NONHOMOGENEOUS | Believing the solution set of a nonhomogeneous linear ODE also forms a vector space, not recognizing this structural fact is specific to the homogeneous case | Moderate |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 (name it: "Superposition Misapplied to Nonhomogeneous Case") → P41 (detect: ask whether scaling a nonhomogeneous solution by a constant produces another solution) → P64 (conceptual shift: work through Example 3's explicit failure, showing $2y_1$ genuinely fails to satisfy the equation, unlike the homogeneous case).
- **B02 (targets MC-2)**: P27 (name it: "Homogeneity Judged by Coefficient Complexity") → P41 (detect: present an equation with simple $P,Q$ but nonzero $G$, and check whether the student correctly identifies it as nonhomogeneous despite the coefficients "looking simple") → P64 (conceptual shift: re-anchor on "homogeneous vs. nonhomogeneous depends ENTIRELY on whether $G(x)=0$ — check only that, regardless of how $P(x)$ or $Q(x)$ look").
- **B03 (targets MC-3)**: P27 (name it: "Vector-Space Status Overextended to Nonhomogeneous") → P41 (detect: ask whether the solution set of a nonhomogeneous linear ODE forms a vector space) → P64 (conceptual shift: check the zero-function-is-a-solution requirement directly — for a nonhomogeneous equation $L[y]=G(x)$ with $G\neq0$, $L[0]=0\neq G(x)$, so the zero function ISN'T even a solution, immediately disqualifying vector-space status).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.de.second-order-ode` (the general second-order ODE and its standard form), `math.de.ode-linearity` (the linearity criterion this concept's standard form satisfies by construction).
- **Unlocks**: `math.de.second-order-homogeneous` (a dedicated deep treatment of the homogeneous case's solution methods, building directly on this concept's superposition principle).
- **Cross-link**: KG lists no cross-links for this concept.

## Component 8 — Teaching Notes

- estimated_hours = 4 with an advanced/understand tag places this at the "2 main TAs + gate" tier — A01 (standard form and homogeneous/nonhomogeneous classification) and A02 (the superposition principle and its strict homogeneous-only scope) jointly cover all three LOs.
- MC-1 (superposition applied to nonhomogeneous case) was made this blueprint's central focus because superposition is one of the most powerful and memorable tools in this subject, creating a strong temptation to over-apply it — Example 3's explicit numerical failure (scaling by 2 breaks the equation, $4\neq2$) was chosen specifically to make the failure viscerally concrete rather than relying on an abstract algebraic argument alone.
- The vibrating-beam transfer probe was chosen because free-vs-forced vibration is among the most standard, immediately recognizable physical instances of the homogeneous/nonhomogeneous distinction, giving superposition's genuine engineering utility (combining vibration modes) real-world grounding while making its FAILURE in the forced case equally concrete and consequential.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (both) |
| V-4 | unlocks concepts named accurately from KG | PASS |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (empty in KG → independence) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A03) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.85×5⌉=5) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Abstract, grounded directly in known linearity criterion) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1/LO2, Ex2→LO3, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
