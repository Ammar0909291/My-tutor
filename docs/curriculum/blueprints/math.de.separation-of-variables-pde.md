# Teaching Blueprint: Separation of Variables (PDE) (`math.de.separation-of-variables-pde`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.de.separation-of-variables-pde` |
| name | Separation of Variables (PDE) |
| domain | Differential Equations |
| difficulty | expert |
| bloom | apply |
| mastery_threshold | 0.8 → MAMR = ⌈0.8×5⌉ = 4/5 |
| estimated_hours | 8 |
| requires | `math.de.pde`, `math.de.fourier-series`, `math.de.bvp` |
| unlocks | none |
| cross_links | none |
| CPA_entry_stage | C (Concrete) — the heat equation on a finite rod, worked start to finish, before naming the general procedure |
| description (KG) | Assumes u(x,t)=X(x)T(t) (or analogous in other variables), splitting the PDE into ODEs for each factor, linked by a separation constant. Yields eigenvalue problems for X, then Fourier series expansions. |

## Component 1 — Learning Objectives

- LO1: Apply the **separation ansatz** $u(x,t)=X(x)T(t)$ to a linear PDE (the heat equation, $u_t=ku_{xx}$), substitute it in, and algebraically rearrange so that all $x$-dependence is isolated on one side of the equation and all $t$-dependence on the other — recognizing that this is only possible because both sides can then be set equal to the SAME constant (the **separation constant**, traditionally $-\lambda$).
- LO2: Recognize that the $X$-equation, together with the problem's boundary conditions, forms a **boundary value problem** (`math.de.bvp`) whose nontrivial solutions exist only for specific values of $\lambda$ — an **eigenvalue problem** — and solve it to find the allowed $\lambda_n$ and corresponding **eigenfunctions** $X_n(x)$.
- LO3: Assemble the general solution as an infinite sum $u(x,t)=\sum_n c_nX_n(x)T_n(t)$, and determine the coefficients $c_n$ by matching the initial condition to a **Fourier series** (`math.de.fourier-series`) expansion in the eigenfunctions — directly refuting the misconception that a single separated solution $X(x)T(t)$ already solves the full problem, when in general only a SUM of all such solutions can match an arbitrary initial condition.

## Component 2 — Prerequisite Check

Assumes mastery of `math.de.pde` (the heat equation $u_t=ku_{xx}$ as a canonical parabolic PDE, and PDEs generally involving partial derivatives of a multivariable unknown function), `math.de.bvp` (solving an ODE subject to conditions at two points, and that a BVP may have no solution, a unique solution, or infinitely many, depending on a parameter), and `math.de.fourier-series` (representing a function as an infinite sum of orthogonal basis functions, with coefficients extracted via orthogonality integrals).

## Component 3 — Core Explanation

**The separation ansatz**: to solve the heat equation $u_t=ku_{xx}$ for $u(x,t)$ on $0\le x\le L$, **assume** (as an ansatz — a guess whose validity is confirmed by it working, not assumed true in general) that a solution has the special product form $u(x,t)=X(x)T(t)$, a function of $x$ alone times a function of $t$ alone. Substituting: $X(x)T'(t) = kX''(x)T(t)$. Dividing both sides by $kX(x)T(t)$: $\frac{T'(t)}{kT(t)} = \frac{X''(x)}{X(x)}$. The left side depends ONLY on $t$; the right side depends ONLY on $x$. Since $x$ and $t$ are independent variables, the only way a function of $t$ alone can equal a function of $x$ alone for all $x,t$ is if **both sides equal the same constant** — call it $-\lambda$ (the **separation constant**). This splits the single PDE into two ODEs: $X''(x)=-\lambda X(x)$ and $T'(t) = -\lambda k T(t)$.

**The eigenvalue problem for $X$**: the boundary conditions on $u$ (e.g. $u(0,t)=u(L,t)=0$, a rod held at zero temperature at both ends) translate directly to boundary conditions on $X$ alone: $X(0)=X(L)=0$. Together with the ODE $X''=-\lambda X$, this is a **boundary value problem** in $\lambda$: for MOST values of $\lambda$, the only solution satisfying both boundary conditions is the trivial $X\equiv0$ (uninteresting — gives $u\equiv0$ everywhere). But for a specific discrete set of values $\lambda_n = (n\pi/L)^2$ ($n=1,2,3,\dots$), called **eigenvalues**, a NONTRIVIAL solution exists: $X_n(x)=\sin(n\pi x/L)$, called the corresponding **eigenfunction**. This is exactly analogous to a matrix eigenvalue problem (special values of a parameter admitting nonzero solutions), now in the setting of a boundary value problem instead of a linear algebra equation.

**Assembling the full solution via Fourier series**: for each eigenvalue $\lambda_n$, the $T$-equation gives $T_n(t) = e^{-\lambda_n k t}$ (exponential decay, matching the physical expectation that heat dissipates over time). Each product $u_n(x,t) = X_n(x)T_n(t) = \sin(n\pi x/L)\,e^{-\lambda_n kt}$ solves the PDE and boundary conditions individually — but generally **none of them alone** matches a given, arbitrary initial temperature profile $u(x,0)=f(x)$. Since the PDE is linear, any SUM of solutions is also a solution (superposition), so the general solution is $u(x,t)=\sum_{n=1}^\infty c_n\sin(n\pi x/L)e^{-\lambda_nkt}$. Setting $t=0$: $f(x) = \sum_n c_n\sin(n\pi x/L)$ — precisely a **Fourier sine series** expansion of $f$, with the $c_n$ extracted using exactly the orthogonality-integral technique from `math.de.fourier-series`.

## Component 4 — Worked Examples

**Example 1 (LO1 — the separation step, in full)**: For $u_t=u_{xx}$ (taking $k=1$ for simplicity) with $u(x,t)=X(x)T(t)$: substituting gives $XT'=X''T$, dividing by $XT$ gives $\frac{T'}{T}=\frac{X''}{X}$. Setting both sides equal to $-\lambda$: $\frac{X''}{X}=-\lambda \Rightarrow X''+\lambda X=0$, and $\frac{T'}{T}=-\lambda \Rightarrow T'+\lambda T=0$ — the single PDE has become exactly two ODEs, linked only through the shared constant $\lambda$.

**Example 2 (LO2 — solving the eigenvalue problem)**: With boundary conditions $u(0,t)=u(\pi,t)=0$ (so $L=\pi$), the $X$-equation $X''+\lambda X=0$ with $X(0)=X(\pi)=0$ is a BVP exactly like `math.de.bvp`'s own worked examples. Trying $\lambda>0$: general solution $X=c_1\cos(\sqrt\lambda x)+c_2\sin(\sqrt\lambda x)$; $X(0)=0\Rightarrow c_1=0$; $X(\pi)=c_2\sin(\sqrt\lambda\pi)=0$ requires (for nontrivial $c_2\ne0$) $\sin(\sqrt\lambda\pi)=0$, i.e. $\sqrt\lambda\pi = n\pi$ for integer $n$, giving $\lambda_n=n^2$ ($n=1,2,3,\dots$) and eigenfunctions $X_n(x)=\sin(nx)$. (Trying $\lambda\le0$ gives only the trivial solution — omitted here for brevity, but confirmable directly by substitution.)

**Example 3 (LO3 — assembling via Fourier series, breaking MC-1)**: Suppose the initial condition is $u(x,0) = 3\sin(2x) - \sin(5x)$. A student might try a SINGLE separated solution, e.g. $u_1(x,t)=\sin(2x)e^{-4t}$ (using $\lambda_2=4$) — but check: at $t=0$, $u_1(x,0)=\sin(2x)$, which does NOT match the full initial condition $3\sin(2x)-\sin(5x)$ (missing the coefficient $3$ and the entire $-\sin(5x)$ term). The correct solution requires the FULL superposition matching every term present: since $3\sin(2x)-\sin(5x)$ is ALREADY exactly a (finite) Fourier sine series with $c_2=3$, $c_5=-1$, and all other $c_n=0$, the solution is $u(x,t) = 3\sin(2x)e^{-4t} - \sin(5x)e^{-25t}$ — a SUM of the two relevant separated solutions, each decaying at its own rate ($e^{-4t}$ for the $n=2$ mode, faster $e^{-25t}$ for the $n=5$ mode). A single separated term alone was never going to be enough unless the initial condition happened to be a pure single sine term.

## Component 5 — Teaching Actions

### Teaching Action A01 — The Separation Step: Isolating x from t (Primitive P11: Representation Shift)

State: "we GUESS the solution has this special product form — and the guess pays off because after dividing, one side depends ONLY on $x$ and the other ONLY on $t$. Two independent variables can only stay equal for every possible $x$ and $t$ if they're both secretly equal to the same fixed number." Work Example 1's full algebraic derivation, explicitly narrating the "both sides must be constant" logical step.

### Teaching Action A02 — The Eigenvalue Problem, Solved Directly (Primitive P11: Representation Shift)

Connect directly to `math.de.bvp`: "the $X$-equation plus the boundary conditions IS a boundary value problem, just like you've already solved — except now $\lambda$ is an unknown parameter, and we ask: for which values of $\lambda$ does a NONTRIVIAL solution exist?" Work Example 2's full case computation, deriving $\lambda_n=n^2$ and $X_n=\sin(nx)$.

### Teaching Action A03 — One Separated Solution Is Rarely Enough — Sum via Fourier Series (Primitive P28: Conflict Evidence)

Present Example 3's direct conflict: the single term $u_1(x,t)=\sin(2x)e^{-4t}$ matches the PDE and boundary conditions perfectly, yet FAILS to match the given initial condition on its own. State: "a single separated solution is a valid building block, but almost never the whole answer. The general solution needs a SUM over all the eigenfunctions, with coefficients chosen — via exactly the Fourier series machinery you already know — to match whatever initial condition is actually given."

- **MC-1 hook**: ask "once you've found one separated solution $X(x)T(t)$ that satisfies the PDE and boundary conditions, have you solved the problem?" — a "yes" answer reveals MC-1 (believing a single separated solution is generally sufficient, missing that matching an arbitrary initial condition requires the full Fourier-series superposition).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. Apply the separation ansatz $u(x,t)=X(x)T(t)$ to $u_t=4u_{xx}$, and derive the two resulting ODEs in terms of the separation constant $\lambda$.
  2. Solve the eigenvalue problem $X''+\lambda X=0$ with $X(0)=X(2\pi)=0$ (note the different interval length from Example 2), finding the eigenvalues $\lambda_n$ and eigenfunctions $X_n(x)$.
  3. Given the initial condition $u(x,0)=5\sin(x)+2\sin(3x)$ (matching Example 2's eigenfunctions with $L=\pi$), write the full solution $u(x,t)$ as a sum of the corresponding separated solutions, using the correct decay rate for each term.
  4. Explain why a student who proposes $u(x,t)=\sin(3x)e^{-9t}$ as "the solution" to a problem whose actual initial condition is $u(x,0)=\sin(3x)+\sin(7x)$ has only captured PART of the correct answer, and state what term is missing.
- **P76 (Transfer Probe, mode = independence)**: "An engineer models the temperature $u(x,t)$ in a metal rod of length $L=\pi$ held at zero temperature at both ends ($u(0,t)=u(\pi,t)=0$), governed by $u_t=u_{xx}$, with an initial temperature profile $u(x,0) = 4\sin(x) - 2\sin(4x) + \sin(6x)$. (a) Using the eigenvalues and eigenfunctions already derived in Example 2 for this exact boundary-condition setup, write the full solution $u(x,t)$ directly, without re-deriving the eigenvalue problem from scratch. (b) Explain, using the different decay rates $e^{-\lambda_nt}$ for each term, which of the three modes (n=1, n=4, n=6) will have decayed away the FASTEST after a long time, and which will dominate the rod's temperature profile in the long run. (c) Explain why this problem's initial condition being ALREADY a finite sum of the exact eigenfunctions $\sin(nx)$ made this problem's Fourier-coefficient-matching step trivial, and what would have been different if the initial condition had instead been a non-sinusoidal function like $u(x,0)=x(\pi-x)$."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 4/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | SINGLE-SEPARATED-SOLUTION-ASSUMED-SUFFICIENT | Believing a single separated solution $X(x)T(t)$ satisfying the PDE and boundary conditions is generally the complete answer, missing that matching an arbitrary initial condition requires a full Fourier-series superposition | Foundational |
| MC-2 | SEPARATION-CONSTANT-SIGN-OR-VALUE-MISHANDLED | Failing to correctly determine which sign/range of the separation constant $\lambda$ yields nontrivial eigenfunctions, or skipping the case analysis (positive, zero, negative $\lambda$) that determines this | Foundational |
| MC-3 | DECAY-RATES-ASSUMED-EQUAL-ACROSS-MODES | Assuming every term $T_n(t)=e^{-\lambda_nkt}$ in the solution decays at the SAME rate, missing that higher-$n$ modes (larger $\lambda_n$) decay strictly faster | Moderate |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 (name it: "Single-Separated-Solution Sufficiency Assumption") → P41 (detect: give an initial condition that is a sum of two different sine terms and ask the student to propose a solution, checking whether they offer only one term) → P64 (conceptual shift: re-walk Example 3's direct check — the single term $u_1(x,0)=\sin(2x)$ demonstrably fails to match $3\sin(2x)-\sin(5x)$ — re-anchoring on "match term by term, and sum every term the initial condition actually contains").
- **B02 (targets MC-2)**: P27 (name it: "Separation-Constant Case Analysis Skipped") → P41 (detect: ask a student to solve the eigenvalue problem and check whether they test only one sign of $\lambda$ without justifying why the other cases give no nontrivial solution) → P64 (conceptual shift: re-walk Example 2's full case reasoning, explicitly noting that $\lambda\le0$ must be checked and ruled out, not simply skipped, before concluding $\lambda_n=n^2$ are the only eigenvalues).
- **B03 (targets MC-3)**: P27 (name it: "Uniform-Decay-Rate Assumption") → P41 (detect: ask which term of a multi-mode solution decays fastest, checking whether the student assumes all terms behave identically) → P64 (conceptual shift: re-walk the transfer probe's part (b) reasoning directly, comparing $e^{-\lambda_nt}$ for different $n$ and confirming larger $\lambda_n$ (higher mode number) means faster decay).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.de.pde` (the heat equation and PDE framework this technique solves), `math.de.bvp` (the eigenvalue problem for $X$ is directly a boundary value problem), `math.de.fourier-series` (the coefficient-matching step is exactly a Fourier series expansion in the eigenfunctions).
- **Unlocks**: none listed in the KG.
- **Cross-link**: KG lists no cross-links for this concept.

## Component 8 — Teaching Notes

- estimated_hours = 8 with an expert/apply tag places this at a "3 TAs + gate" tier — A01 (the separation step), A02 (the eigenvalue problem), and A03 (superposition via Fourier series) each target a distinct LO, appropriate for a capstone-style concept that directly synthesizes all three of its prerequisites into one multi-step technique, warranting full worked-example treatment (not orientation-level) given its "apply" bloom level.
- This blueprint deliberately works a single running example (the heat equation on $[0,L]$ with zero boundary conditions) across all three Teaching Actions and Examples, rather than switching contexts, so the student experiences the technique as one continuous multi-step procedure — separation, eigenvalue-solving, superposition — echoing exactly how the three prerequisite concepts (`math.de.pde`, `math.de.bvp`, `math.de.fourier-series`) are combined in sequence.
- Example 2's case analysis (only $\lambda>0$ shown in detail, $\lambda\le0$ noted as "confirmable by substitution" but not fully worked) was a deliberate scope decision to keep the worked example focused on the technique's main thread; MC-2's repair action (B02) explicitly requires the full case analysis when a student's understanding needs reinforcement, so the omission is compensated for at the mastery-gate level rather than left unaddressed.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (all 3) |
| V-4 | unlocks concepts named accurately from KG | PASS (none) |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (empty in KG → independence) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.8×5⌉=4) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Concrete: heat equation on a finite rod worked start to finish) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
