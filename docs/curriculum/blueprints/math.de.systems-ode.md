# Teaching Blueprint: Systems of ODEs (`math.de.systems-ode`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.de.systems-ode` |
| name | Systems of ODEs |
| domain | Differential Equations |
| difficulty | expert |
| bloom | apply |
| mastery_threshold | 0.8 → MAMR = ⌈0.8×5⌉ = 4/5 |
| estimated_hours | 8 |
| requires | `math.de.second-order-ode`, `math.linalg.matrix`, `math.linalg.eigenvalues` |
| unlocks | none |
| cross_links | `math.linalg.diagonalization` (unauthored — see Component 7) |
| CPA_entry_stage | C (Concrete) — converting a single second-order ODE into a coupled pair of first-order equations by hand, before the matrix formalism |
| description (KG) | A set of ODEs involving multiple dependent variables: x′=Ax+b (linear) or x′=f(x) (nonlinear). First-order systems can represent nth-order scalar ODEs via state-vector reduction. |

## Component 1 — Learning Objectives

- LO1: Define a **system of ODEs** as a set of equations involving MULTIPLE dependent variables (e.g. $x_1(t),x_2(t)$) and their derivatives, written compactly as $\vec x' = A\vec x + \vec b$ for a linear system, where $\vec x$ is a vector of the dependent variables and $A$ is a matrix of coefficients.
- LO2: Convert a single higher-order scalar ODE into an equivalent FIRST-order system via **state-vector reduction** — introducing new variables for each derivative up to one less than the highest order, so an $n$th-order scalar ODE becomes $n$ coupled first-order equations.
- LO3: Solve a homogeneous linear system $\vec x'=A\vec x$ using the **eigenvalues and eigenvectors** of $A$ (from `math.linalg.eigenvalues`) — each eigenpair $(\lambda,\vec v)$ contributing a solution $\vec v e^{\lambda t}$ — and correctly recognize that this method requires $A$ to have enough independent eigenvectors, directly refuting the misconception that any system can be solved this way with no further consideration.

## Component 2 — Prerequisite Check

Assumes mastery of `math.de.second-order-ode` (solving $ay''+by'+cy=0$ via the characteristic equation, and the standard form $y''+P(x)y'+Q(x)y=G(x)$), `math.linalg.matrix` (matrices as arrays encoding linear transformations), and `math.linalg.eigenvalues` ($Av=\lambda v$, finding eigenvalues via $\det(A-\lambda I)=0$, and eigenvectors as fixed directions).

## Component 3 — Core Explanation

**A system of ODEs, and its matrix form**: while a single ODE involves ONE dependent variable (e.g. $y(t)$), a **system** involves SEVERAL dependent variables simultaneously, each with its own derivative equation, and typically COUPLED (each equation may depend on the OTHER variables too). A linear system with constant coefficients is written compactly as $\vec x' = A\vec x + \vec b$, where $\vec x = (x_1,\dots,x_n)$ is a vector of the dependent variables, $A$ is an $n\times n$ matrix of coefficients, and $\vec b$ is a (possibly zero) vector of constants — directly extending the matrix-equation framework from `math.linalg.matrix` to a DIFFERENTIAL, rather than purely algebraic, setting.

**State-vector reduction — converting a higher-order scalar ODE into a first-order system**: any $n$th-order scalar ODE can be rewritten as an equivalent system of $n$ FIRST-order equations, by introducing new variables for the original function and each of its derivatives up to order $n-1$. For a second-order ODE $y''=f(y',y,t)$: let $x_1=y$ and $x_2=y'$. Then $x_1'=y'=x_2$ (by definition), and $x_2'=y''=f(x_2,x_1,t)$ (substituting the original equation) — TWO first-order equations, in the two new variables $x_1,x_2$, exactly equivalent to the original single second-order equation.

**Solving via eigenvalues and eigenvectors**: for the homogeneous linear system $\vec x'=A\vec x$, seek solutions of the form $\vec x(t) = \vec v e^{\lambda t}$ for a constant vector $\vec v$ and scalar $\lambda$. Substituting: $\lambda\vec v e^{\lambda t} = A\vec v e^{\lambda t}$, which simplifies (dividing by the nonzero $e^{\lambda t}$) to $A\vec v=\lambda\vec v$ — EXACTLY the eigenvalue equation from `math.linalg.eigenvalues`. So each eigenvalue-eigenvector pair $(\lambda,\vec v)$ of $A$ gives one solution $\vec ve^{\lambda t}$, and (when $A$ has $n$ linearly independent eigenvectors, for an $n\times n$ system) the general solution is a linear combination $\vec x(t) = c_1\vec v_1e^{\lambda_1t}+\cdots+c_n\vec v_ne^{\lambda_nt}$. This method requires enough independent eigenvectors to exist — a genuine, checkable condition, not automatic for every matrix $A$.

## Component 4 — Worked Examples

**Example 1 (LO2 — state-vector reduction, converting a known second-order ODE)**: Convert $y''-5y'+6y=0$ (from `math.de.second-order-ode`'s own worked example, with known solution $y=C_1e^{2x}+C_2e^{3x}$) into a first-order system. Let $x_1=y$, $x_2=y'$. Then $x_1'=x_2$, and from the original equation, $y''=5y'-6y$, so $x_2'=5x_2-6x_1$. In matrix form: $\begin{pmatrix}x_1'\\x_2'\end{pmatrix} = \begin{pmatrix}0&1\\-6&5\end{pmatrix}\begin{pmatrix}x_1\\x_2\end{pmatrix}$ — a genuine first-order system, $\vec x'=A\vec x$ with $A=\begin{pmatrix}0&1\\-6&5\end{pmatrix}$.

**Example 2 (LO3 — solving via eigenvalues, confirming agreement with the known answer)**: Continuing Example 1, find the eigenvalues of $A=\begin{pmatrix}0&1\\-6&5\end{pmatrix}$: $\det(A-\lambda I) = \det\begin{pmatrix}-\lambda&1\\-6&5-\lambda\end{pmatrix} = -\lambda(5-\lambda)+6 = \lambda^2-5\lambda+6=0$ — notice this is EXACTLY the characteristic equation $r^2-5r+6=0$ from the original second-order ODE, giving $\lambda=2,3$ (matching $r_1=2,r_2=3$ exactly). The eigenvector for $\lambda=2$: solve $(A-2I)\vec v=0$: $\begin{pmatrix}-2&1\\-6&3\end{pmatrix}\vec v=0 \Rightarrow v_2=2v_1$, so $\vec v_1=(1,2)$. The general solution is $\vec x(t) = c_1(1,2)e^{2t}+c_2\vec v_2e^{3t}$, and since $x_1=y$, the first COMPONENT of this vector solution is $y=c_1e^{2t}+c_2e^{3t}$ — matching the already-known scalar solution exactly, confirming the two methods (characteristic equation directly, or system-of-ODEs via eigenvalues) agree.

**Example 3 (LO3 — the eigenvector method requires enough independent eigenvectors, breaking MC-1)**: Consider $A=\begin{pmatrix}2&1\\0&2\end{pmatrix}$ (a repeated eigenvalue case): $\det(A-\lambda I)=(2-\lambda)^2=0$, so $\lambda=2$ is a REPEATED eigenvalue. Solving $(A-2I)\vec v=0$: $\begin{pmatrix}0&1\\0&0\end{pmatrix}\vec v=0 \Rightarrow v_2=0$, giving only ONE independent eigenvector direction, $\vec v=(1,0)$ (up to scaling) — not the two independent eigenvectors a simple "one solution per eigenvalue" approach would need for a full 2D general solution. Naively writing $\vec x(t)=c_1(1,0)e^{2t}+c_2(1,0)e^{2t}$ (using the same eigenvector twice) fails to produce a genuinely two-parameter general solution (both terms are just multiples of each other) — this repeated-eigenvalue case requires an ADDITIONAL technique (a generalized eigenvector, paralleling the repeated-root case $y=(C_1+C_2x)e^{rx}$ already known from `math.de.second-order-ode`) beyond simply "one solution per eigenvalue."

## Component 5 — Teaching Actions

### Teaching Action A01 — Converting a Higher-Order ODE Into a First-Order System (Primitive P11: Representation Shift)

State: "instead of tracking $y$ and its derivatives as one messy higher-order equation, introduce a NEW variable for each derivative — then everything becomes a system of simpler, first-order equations working together." Work Example 1's direct conversion of the already-known second-order ODE.

### Teaching Action A02 — Solving via Eigenvalues: The Same Characteristic Equation Reappears (Primitive P28: Conflict Evidence)

Present Example 2's direct evidence: the matrix $A$'s characteristic equation $\det(A-\lambda I)=0$ is EXACTLY the same polynomial as the original ODE's characteristic equation $ar^2+br+c=0$. State: "this isn't a coincidence — the eigenvalue method for systems and the characteristic-equation method for a single higher-order ODE are the SAME underlying idea, viewed through two different but equivalent formalisms."

### Teaching Action A03 — Repeated Eigenvalues Need More Than One Eigenvector Per Value (Primitive P28: Conflict Evidence)

Present Example 3's direct evidence: a repeated eigenvalue $\lambda=2$ yielding only ONE independent eigenvector direction, insufficient to build a genuine two-parameter general solution by the naive "one term per eigenvalue" approach. State: "just like a repeated ROOT in the scalar characteristic equation needed an extra factor of $x$ (from `math.de.second-order-ode`), a repeated EIGENVALUE with too few independent eigenvectors needs its own extra technique — you can't just assume every eigenvalue automatically supplies enough independent solutions."

- **MC-1 hook**: ask "can the eigenvalue-eigenvector method always fully solve any linear system $\vec x'=A\vec x$, with one solution term per eigenvalue?" — a "yes" answer reveals MC-1 (assuming the method always works with no further consideration, missing that insufficient independent eigenvectors — as in a repeated-eigenvalue case — requires additional technique).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. Convert the second-order ODE $y''+2y'-3y=0$ into a first-order system, writing it in matrix form $\vec x'=A\vec x$.
  2. Find the eigenvalues of the matrix $A$ from problem 1, and verify they match the roots of the ODE's characteristic equation $r^2+2r-3=0$.
  3. Find the eigenvector for one of the eigenvalues from problem 2, and state the corresponding component of the general solution matching $y(t)$.
  4. Explain, using Example 3's reasoning, why a matrix with a repeated eigenvalue does not automatically supply a complete general solution via one eigenvector per eigenvalue, and what additional consideration is needed.
- **P76 (Transfer Probe, mode = independence — KG cross_link `math.linalg.diagonalization` is not yet authored; a future revision may add a genuine cross-link probe into the general diagonalization framework once that entry exists)**: "An ecologist models a predator-prey system with two coupled populations, $x_1(t)$ (prey) and $x_2(t)$ (predators), via the LINEARIZED system $\vec x'=A\vec x$ near an equilibrium point, for some matrix $A$ derived from the model's parameters. (a) Explain, in general terms, how the ecologist would use the eigenvalues of $A$ to determine whether the populations near this equilibrium oscillate, grow, or decay over time. (b) If $A$ turns out to have a repeated eigenvalue with only one independent eigenvector, explain why the ecologist cannot simply proceed with the standard 'one solution term per eigenvalue' approach, referencing Example 3's evidence. (c) Explain why converting a single higher-order population model (if the ecologist had instead started with one second-order equation) into this first-order system form is a useful step, even before knowing anything about the specific eigenvalues."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 4/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | EIGENVALUE-METHOD-ASSUMED-ALWAYS-SUFFICIENT | Believing the eigenvalue-eigenvector method always produces a complete general solution with one term per eigenvalue, missing that a repeated eigenvalue with too few independent eigenvectors requires additional technique | Foundational |
| MC-2 | STATE-VECTOR-REDUCTION-VARIABLES-MISASSIGNED | Incorrectly assigning the new state variables during state-vector reduction (e.g. not correctly setting $x_2=y'$, or misforming the equation for $x_2'$), producing an incorrect system | Foundational |
| MC-3 | SYSTEM-AND-SCALAR-CHARACTERISTIC-EQUATIONS-TREATED-AS-UNRELATED | Failing to recognize that the matrix's characteristic equation $\det(A-\lambda I)=0$ and the original scalar ODE's characteristic equation are the identical polynomial, treating the two solution methods as unrelated rather than equivalent | Moderate |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 (name it: "Eigenvalue-Method-Always-Sufficient Assumption") → P41 (detect: give a matrix with a repeated eigenvalue and ask a student to write the general solution using one term per eigenvalue) → P64 (conceptual shift: re-walk Example 3's direct demonstration that only one independent eigenvector exists, re-anchoring on "count independent eigenvectors — if there are fewer than the matrix's size, the naive one-term-per-eigenvalue approach is incomplete, exactly parallel to the repeated-root case in a single ODE").
- **B02 (targets MC-2)**: P27 (name it: "State-Vector Variable Misassignment") → P41 (detect: ask a student to perform state-vector reduction on a second-order ODE and check whether $x_1'=x_2$ is correctly stated, and $x_2'$ correctly substitutes the original equation) → P64 (conceptual shift: re-walk Example 1's explicit derivation, re-anchoring on "$x_1=y$, $x_2=y'$ — so $x_1'$ is automatically $x_2$ by definition, and $x_2'=y''$ comes directly from solving the original equation for $y''$").
- **B03 (targets MC-3)**: P27 (name it: "System-Scalar Characteristic Equation Disconnection") → P41 (detect: ask a student whether the eigenvalues of the system's matrix $A$ are related to the original scalar ODE's characteristic-equation roots) → P64 (conceptual shift: re-walk Example 2's direct side-by-side comparison, confirming the two polynomials are identical, re-anchoring on "these are the SAME method, viewed two ways — not two independent facts to memorize separately").

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.de.second-order-ode` (the characteristic-equation method and root-case taxonomy this concept's eigenvalue method directly parallels and reuses), `math.linalg.matrix` (the matrix notation $\vec x'=A\vec x$ this concept is built on), `math.linalg.eigenvalues` (the $Av=\lambda v$ equation and its solution method, directly reused for solving the system).
- **Unlocks**: none listed in the KG.
- **Cross-link**: KG lists `math.linalg.diagonalization` as a cross-link, but that concept is **not yet authored** in the corpus (checked via `ls docs/curriculum/blueprints/math.linalg.diagonalization.md`, not found) — P76_mode = independence for this blueprint's transfer probe. A future revision may add a genuine cross-link probe into the general diagonalization framework (which reframes this concept's solution method as $\vec x(t)=e^{At}\vec x(0)$ via matrix diagonalization) once that entry exists.

## Component 8 — Teaching Notes

- estimated_hours = 8 with an expert/apply tag places this at a "3 TAs + gate" tier — A01 (state-vector reduction), A02 (the eigenvalue solution method), and A03 (the repeated-eigenvalue caveat) each target a distinct LO, appropriate for a concept synthesizing linear algebra and differential equations into one combined technique.
- This blueprint deliberately reuses `math.de.second-order-ode`'s own worked example ($y''-5y'+6y=0$) throughout Examples 1 and 2, specifically to make the equivalence between the characteristic-equation method and the eigenvalue method as concrete and verifiable as possible — the student can directly confirm both methods produce the identical answer, rather than taking the equivalence on faith.
- Example 3's repeated-eigenvalue case was deliberately connected back to `math.de.second-order-ode`'s own repeated-root case ($y=(C_1+C_2x)e^{rx}$) — Teaching Notes name this parallel explicitly so a student recognizes the SAME underlying phenomenon (a repeated characteristic root/eigenvalue needing an extra structural fix) reappearing in the matrix formalism, rather than treating it as a brand-new complication.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (all 3) |
| V-4 | unlocks concepts named accurately from KG | PASS (none) |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (math.linalg.diagonalization not authored → independence) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.8×5⌉=4) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Concrete: converting a specific second-order ODE by hand before the matrix formalism) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO2, Ex2→LO3, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
