# math.de.separation-of-variables-pde

## Identity
- **KG id**: `math.de.separation-of-variables-pde`
- **Domain**: math.de
- **Requires**: `math.de.pde`, `math.de.fourier-series`, `math.de.bvp`
- **Unlocks**: none
- **Cross-links**: none
- **Difficulty**: expert
- **Bloom level**: apply
- **Mastery threshold**: 0.8
- **Estimated hours**: 8

## Learning Objective
Apply the separation ansatz $u(x,t)=X(x)T(t)$ to a linear PDE, dividing to isolate all $x$-
dependence on one side and all $t$-dependence on the other, and recognize both sides must equal
the SAME separation constant (since $x,t$ are independent); solve the resulting $X$-equation as a
`math.de.bvp` EIGENVALUE PROBLEM to find the allowed $\lambda_n$ and eigenfunctions $X_n(x)$; and
assemble the general solution as a SUM $\sum_nc_nX_n(x)T_n(t)$, matching the initial condition via
`math.de.fourier-series` — never assuming a single separated solution already solves the full
problem.

## Core Understanding
BOTH SIDES MUST EQUAL THE SAME CONSTANT — THE LOGICAL CORE OF SEPARATION, NEVER AN ARBITRARY STEP:
for $u_t=ku_{xx}$ with $u=X(x)T(t)$: substituting and dividing by $kXT$ gives
$\frac{T'(t)}{kT(t)}=\frac{X''(x)}{X(x)}$. The LEFT side depends only on $t$; the RIGHT side
depends only on $x$. Since $x,t$ are INDEPENDENT variables, a function of $t$ alone can equal a
function of $x$ alone for EVERY $x,t$ only if BOTH sides equal the SAME constant, $-\lambda$ — this
is not an assumption but a direct logical consequence of independence, splitting one PDE into two
ODEs: $X''=-\lambda X$ and $T'=-\lambda kT$.

THE $X$-EQUATION PLUS BOUNDARY CONDITIONS IS A `math.de.bvp` EIGENVALUE PROBLEM — MOST $\lambda$
GIVE ONLY THE TRIVIAL SOLUTION: with $u(0,t)=u(L,t)=0$ translating to $X(0)=X(L)=0$: for MOST
values of $\lambda$, the only solution to $X''=-\lambda X$ satisfying both boundary conditions is
$X\equiv0$ (giving $u\equiv0$ everywhere — uninteresting). Only for the SPECIFIC discrete set
$\lambda_n=(n\pi/L)^2$ does a NONTRIVIAL solution $X_n(x)=\sin(n\pi x/L)$ exist — exactly analogous
to a matrix eigenvalue problem, now in a boundary-value-problem setting. Trying $\lambda\le0$ must
genuinely be checked and ruled out (giving only the trivial solution), never skipped.

A SINGLE SEPARATED SOLUTION IS RARELY THE WHOLE ANSWER — THE GENERAL SOLUTION NEEDS A `math.de.
fourier-series` SUM: for initial condition $u(x,0)=3\sin(2x)-\sin(5x)$: the single term
$u_1(x,t)=\sin(2x)e^{-4t}$ satisfies the PDE and boundary conditions perfectly, but at $t=0$ gives
only $\sin(2x)$ — NOT matching $3\sin(2x)-\sin(5x)$ (missing the coefficient $3$ and the entire
$-\sin(5x)$ term entirely). By linearity, ANY sum of separated solutions is also a solution, so the
correct answer sums every term the initial condition actually contains:
$u(x,t)=3\sin(2x)e^{-4t}-\sin(5x)e^{-25t}$ — each mode decaying at its OWN rate $e^{-\lambda_nt}$,
with higher $n$ (larger $\lambda_n$) decaying strictly faster.

## Mental Models
- **"Both sides of the separated equation equal the same constant because x and t are
  independent — that's not an assumption, it's forced by the logic."**
- **"The X-equation plus boundary conditions is a boundary value problem with an unknown
  parameter — solve for which λ give a nontrivial answer."**
- **"One separated solution is a building block, not the whole answer — sum every term the
  initial condition actually contains, via Fourier series."**

## Why Students Fail

### MC-1: SINGLE-SEPARATED-SOLUTION-ASSUMED-SUFFICIENT
- **Surface form**: believes a single separated solution $X(x)T(t)$ satisfying the PDE and
  boundary conditions is generally the complete answer.
- **Birth type**: Foundational severity (Blueprint's own declared severity — finding ONE working
  separated solution feels like solving the problem, obscuring that an arbitrary initial condition
  generally needs a full superposition).
- **Repair**: re-walk Example 3's direct check — $\sin(2x)e^{-4t}$ demonstrably fails to match
  $3\sin(2x)-\sin(5x)$ at $t=0$.

### MC-2: SEPARATION-CONSTANT-SIGN-OR-VALUE-MISHANDLED
- **Surface form**: fails to correctly determine which sign/range of $\lambda$ yields nontrivial
  eigenfunctions, or skips the case analysis (positive, zero, negative $\lambda$) entirely.
- **Birth type**: Foundational severity (Blueprint's own declared severity — the positive-$\lambda$
  case is often the only one worked in detail, leaving the other cases' elimination unjustified).
- **Repair**: re-walk the full case analysis, confirming $\lambda\le0$ gives only the trivial
  solution before concluding $\lambda_n=n^2$ are the only eigenvalues.

### MC-3: DECAY-RATES-ASSUMED-EQUAL-ACROSS-MODES
- **Surface form**: assumes every term $T_n(t)=e^{-\lambda_nkt}$ decays at the same rate.
- **Birth type**: Moderate severity (Blueprint's own declared severity — the exponential decay form
  looks structurally identical across modes, obscuring that $\lambda_n$ itself varies with $n$).
- **Repair**: re-walk the direct comparison of $e^{-\lambda_nt}$ across different $n$, confirming
  larger $\lambda_n$ (higher mode) decays strictly faster.

## Misconceptions

### MC-1: SINGLE-SEPARATED-SOLUTION-ASSUMED-SUFFICIENT
- **Surface form**: as described above.
- **Root cause (Foundational)**: as described above.
- **Repair**: as described above.

### MC-2: SEPARATION-CONSTANT-SIGN-OR-VALUE-MISHANDLED
- **Surface form**: as described above.
- **Root cause (Foundational)**: as described above.
- **Repair**: as described above.

### MC-3: DECAY-RATES-ASSUMED-EQUAL-ACROSS-MODES
- **Surface form**: as described above.
- **Root cause (Moderate)**: as described above.
- **Repair**: as described above.

## Analogies
- **"Separation of variables is like discovering two independent witnesses must be describing the
  same fixed number — the only way their separately-measured quantities can always agree."**
- **Anti-analogy**: a single separated solution is NOT automatically the answer just because it
  satisfies the PDE and boundary conditions — it must ALSO match the specific initial condition,
  which generally requires summing many modes.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: the direct algebraic separation derivation for
  $u_t=u_{xx}$, isolating $x$- and $t$-dependence.
- **Demonstration 2 (targets MC-2)**: the full eigenvalue-problem case analysis for
  $X''+\lambda X=0$, $X(0)=X(\pi)=0$.
- **Demonstration 3 (targets MC-3)**: the $u(x,0)=3\sin(2x)-\sin(5x)$ superposition, showing the
  single-term failure and the correct two-term, differently-decaying sum.

## Discovery Questions
1. "If one side of an equation depends only on x and the other only on t, and this must hold for
   every x and t, what does that force both sides to equal?"
2. "Does the eigenvalue problem for X have a nontrivial solution for every value of λ, or only for
   specific values?"
3. "Once you've found one separated solution that satisfies the PDE and boundary conditions, have
   you solved the problem?"

## Teaching Sequence
1. **Representation shift**: the separation-ansatz derivation, working Demonstration 1, isolating
   the logical necessity of a shared constant.
2. **Representation shift (continued)**: the eigenvalue problem, working Demonstration 2,
   isolating MC-2.
3. **Conflict evidence**: the single-term failure and superposition fix, working Demonstration 3,
   isolating MC-1 and MC-3.
4. **Mastery gate**: require a correct separation derivation for a given PDE, a correct eigenvalue/
   eigenfunction solution with justified case analysis, and a correct full-superposition solution
   matching a multi-term initial condition, at the Blueprint's own stated MAMR of 4/5.

## Tutor Actions
- Never accept the separation constant introduced without the independence-of-$x,t$ justification.
- Never accept an eigenvalue problem solved without checking and ruling out $\lambda\le0$.
- Never accept a single separated solution presented as the complete answer to an initial-value
  problem whose initial condition contains more than one mode.

## Voice Teaching Notes
- Say "why must both sides equal the same constant here?" whenever the separation ansatz is
  applied.
- After finding one separated solution, ask "does this alone match the actual initial condition,
  or do you need to sum more terms?"

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly derives the two separated ODEs from the PDE.
- **Rung 2 (application)**: learner correctly solves the eigenvalue problem, including checking and
  ruling out non-positive $\lambda$.
- **Rung 3 (transfer)**: learner correctly assembles a full multi-mode solution matching a given
  initial condition and correctly identifies the dominant long-time mode by comparing decay rates.

## Tutor Recovery Strategy
- If MC-1 recurs, re-walk the single-term-fails-to-match demonstration.
- If MC-2 recurs, re-walk the full $\lambda\le0$-elimination case analysis.
- If MC-3 recurs, re-walk the direct decay-rate comparison across modes.

## Memory Hooks
- "Independent variables on opposite sides, equal for all inputs, means both sides are the same
  constant."
- "The X-equation plus boundary conditions is an eigenvalue problem — most λ give only zero."
- "One separated term is a building block — sum every mode the initial condition actually has."

## Transfer Connections
- `math.de.pde` (already authored, this campaign, Batch 161): supplies the heat equation and PDE
  framework this technique solves.
- `math.de.bvp` (already authored, this campaign, Batch 160): supplies the boundary-value-problem
  and eigenvalue-problem machinery the $X$-equation directly instantiates.
- `math.de.fourier-series` (already authored, this campaign, Batch 163): supplies the coefficient-
  matching technique used to assemble the final superposition.
- `math.de.heat-equation`, `math.de.wave-equation`, `math.de.laplace-equation` (not yet authored,
  KG's declared related concepts): the canonical PDEs this general technique is classically applied
  to.

## Cross-Subject Connections
- Physics/engineering: heat conduction in a rod, vibrating string modes, electrostatic potential in
  a bounded region.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.de.separation-of-variables-pde.md`, reused
  by reference for its full heat-equation running example across separation, eigenvalue-solving,
  and superposition, and its three-misconception registry (severity levels adopted directly as
  declared).
- Transfer probe: the Blueprint's own independence-mode probe, applying the pre-derived eigenvalue/
  eigenfunction set to a new multi-mode initial condition and comparing long-time mode dominance.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires `math.de.pde`/
  `math.de.fourier-series`/`math.de.bvp`, unlocks none, cross_links none, expert/apply,
  mastery_threshold 0.8, estimated_hours 8) was directly verified against the live KG and matches
  exactly. This entry synthesizes all three of its prerequisites, closing `math.de`'s
  currently-reachable frontier alongside `math.de.bifurcation`.

## Version History
- 2026-09-19 (Batch 165): authored. Second entry this batch. Companion batch concept:
  `math.de.fourier-transform`.
