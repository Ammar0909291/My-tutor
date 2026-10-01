# math.num.lu-factorization

## Identity
- **KG id**: `math.num.lu-factorization`
- **Domain**: math.num
- **Requires**: `math.linalg.lu-factorization`, `math.num.error-analysis`
- **Unlocks**: none
- **Cross-links**: `math.linalg.lu-factorization`
- **Difficulty**: proficient
- **Bloom level**: apply
- **Mastery threshold**: 0.85
- **Estimated hours**: 5

## Learning Objective
Factor $A=LU$ (or $PA=LU$ with partial pivoting) by Gaussian elimination and solve $Ax=b$ via
forward substitution ($Ly=b$) THEN back substitution ($Ux=y$), NEVER the reverse order; explain
that pivoting is NEVER optional — a near-zero pivot causes catastrophic cancellation; and
recognize solving via LU is NEVER equivalent in cost or stability to explicitly computing
$A^{-1}$.

## Core Understanding
FORWARD SUBSTITUTION MUST COME BEFORE BACK SUBSTITUTION — NEVER THE REVERSE: since $L$ is lower
triangular, its first row has only ONE unknown ($y_1=b_1/L_{11}$), enabling solving TOP-DOWN —
forward substitution, solving $Ly=b$. Since $U$ is upper triangular, its LAST row has only one
unknown ($x_n=y_n/U_{nn}$), enabling solving BOTTOM-UP — back substitution, solving $Ux=y$.
Attempting to solve $Ux=y$ before $Ly=b$ is WRONG — $y$ is not yet known, and $Ly=b$ must be
solved first since it is what DEFINES $y$; the order is mathematically forced by the structure,
never arbitrary.

PIVOTING IS NEVER OPTIONAL — A NEAR-ZERO PIVOT CAUSES CATASTROPHIC CANCELLATION: for
$A=[[10^{-8},1],[1,1]]$ WITHOUT pivoting: the multiplier $m_{21}=1/10^{-8}=10^8$ is enormous, and
$U_{22}=fl(1-10^8)\approx-10^8$ — this large multiplier AMPLIFIES any rounding error in row 1,
leaving the computed $x_2$ with only ~8 correct digits instead of 15. WITH partial pivoting
(swapping rows so the largest entry becomes the pivot): $A=[[1,1],[10^{-8},1]]$, giving
$m_{21}=10^{-8}$ and $U_{22}\approx1$ — well-conditioned, full 15-digit accuracy. Believing
Gaussian elimination without pivoting is always correct if the matrix is invertible misses that a
near-zero pivot doesn't make the matrix singular — it just causes a large multiplier that
amplifies rounding error catastrophically.

SOLVING VIA LU IS NEVER EQUIVALENT IN COST OR STABILITY TO COMPUTING $A^{-1}$ EXPLICITLY:
`np.linalg.inv(A) @ b` computes $A^{-1}$ explicitly (costing roughly $3\times(\frac23n^3)$ flops
plus $n^2$ for the multiply), while `np.linalg.solve(A,b)` uses LU factorization plus one
forward/back substitution ($\frac23n^3+2n^2$ flops) — for $n=1000$, `solve` is roughly 3× FASTER.
Additionally, $A^{-1}$'s own computation errors get MAGNIFIED during the matrix-vector multiply
step, while direct solving has better backward-error guarantees. Solving $Ax=b$ by computing
$A^{-1}x$ rather than using LU directly is WRONG — never necessary and never as numerically
stable.

## Mental Models
- **"For-ward goes with L (lower triangle, go down); Back-ward goes with U (upper triangle, go
  up) — the direction words match the triangle shapes, never reversed."**
- **"A near-zero pivot doesn't make a matrix singular — it makes the arithmetic catastrophically
  sensitive; pivoting keeps multipliers bounded, never optional."**
- **"Never compute A⁻¹ just to solve Ax=b — LU plus forward/back substitution is faster and more
  stable, every time."**

## Why Students Fail

### MC-1: LU-SAME-AS-INVERSE
- **Surface form**: solves $Ax=b$ by computing $A^{-1}x$ rather than LU; does not recognize LU is
  $O(n^3/3)$ while $A^{-1}$ costs three times more and loses backward-stability guarantees.
- **Birth type**: instruction-induced (Blueprint's own declared birth type — linear algebra
  courses present $A^{-1}$ as the canonical solution method; the numerical cost of forming an
  explicit inverse is rarely discussed there).
- **Repair**: re-count the flop costs explicitly, confirming $A^{-1}$ is $\approx\frac23n^4+n^2$
  versus LU's $\frac23n^3+2n^2$.

### MC-2: PIVOTING-IS-OPTIONAL
- **Surface form**: applies Gaussian elimination without pivoting and believes the result is
  always correct if the matrix is invertible, not recognizing that a near-zero pivot causes
  catastrophic cancellation.
- **Birth type**: overgeneralization (Blueprint's own declared birth type — textbook examples use
  "nice" matrices where the (1,1) pivot is already large; students generalize that the first
  element is always a suitable pivot).
- **Repair**: re-demonstrate the $\varepsilon=10^{-16}$ near-singular-pivot case, comparing
  with-and-without-pivoting outcomes explicitly.

### MC-3: FORWARD-BACK-ORDER-DOESNT-MATTER
- **Surface form**: solves $Ux=y$ before $Ly=b$, or confuses which system to solve first; does not
  remember the two-step order.
- **Birth type**: language contamination (Blueprint's own declared birth type — "forward" and
  "backward" substitution labels are both directional adjectives, causing confusion about which
  step comes first).
- **Repair**: re-derive the order from the triangular structure explicitly — $L$ solved top-down
  first, then $U$ solved bottom-up.

## Misconceptions

### MC-1: LU-SAME-AS-INVERSE
- **Surface form**: as described above.
- **Root cause (instruction-induced)**: as described above.
- **Repair**: as described above.

### MC-2: PIVOTING-IS-OPTIONAL
- **Surface form**: as described above.
- **Root cause (overgeneralization)**: as described above.
- **Repair**: as described above.

### MC-3: FORWARD-BACK-ORDER-DOESNT-MATTER
- **Surface form**: as described above.
- **Root cause (language contamination)**: as described above.
- **Repair**: as described above.

## Analogies
- **"LU factorization is like prepping ingredients once, then cooking multiple meals cheaply —
  factor once, solve many right-hand sides fast, never re-factoring each time."**
- **Anti-analogy**: dividing by a near-zero pivot isn't just "a small number to work around" —
  it's a multiplier explosion that amplifies rounding error catastrophically, never a harmless
  technicality.

## Demonstrations
- **Demonstration 1 (targets MC-3)**: the forward-then-back substitution order derived from
  triangular structure.
- **Demonstration 2 (targets MC-2)**: the $\varepsilon=10^{-16}$ pivot-without-versus-with-
  pivoting comparison.
- **Demonstration 3 (targets MC-1)**: the LU-versus-explicit-inverse flop-count and stability
  comparison.

## Discovery Questions
1. "Do you solve Ly=b first, or Ux=y first — and why does the order matter?"
2. "Does a near-zero pivot make the matrix singular, or just numerically dangerous to divide by?"
3. "Is computing A⁻¹ explicitly ever cheaper or more stable than solving Ax=b directly via LU?"

## Teaching Sequence
1. **Representation shift**: the four-representation LU derivation (elimination, matrix equation,
   pivot explanation, two-step solve), working Demonstration 1, isolating MC-3.
2. **Pattern induction**: the pivoting gallery, working Demonstration 2, isolating MC-2.
3. **Misconception detector**: the LU-versus-inverse gate question, working Demonstration 3,
   isolating MC-1.
4. **Mastery gate**: require a correct $PA=LU$ factorization with pivoting, a correct
   forward-then-back substitution solve, and a correct explanation of why LU beats explicit
   inversion, at the Blueprint's own stated MAMR of 5/5.

## Tutor Actions
- Never accept $Ax=b$ solved by explicitly computing $A^{-1}$.
- Never accept Gaussian elimination performed without pivoting on a matrix with a small pivot.
- Never accept $Ux=y$ solved before $Ly=b$.

## Voice Teaching Notes
- Say "is that pivot large enough, or should you swap rows first?" whenever Gaussian elimination
  is performed.
- Ask "which do you solve first — Ly=b or Ux=y — and why does the triangular shape force that
  order?" whenever the two-step solve is applied.

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly factors a matrix as $PA=LU$ with partial pivoting.
- **Rung 2 (application)**: learner correctly solves $Ax=b$ via forward substitution then back
  substitution.
- **Rung 3 (transfer)**: learner correctly derives block LU factorization and the Schur
  complement from scalar LU, in a large-system context.

## Tutor Recovery Strategy
- If MC-1 recurs, re-count the flop costs of LU versus explicit inversion.
- If MC-2 recurs, re-demonstrate the near-singular-pivot comparison.
- If MC-3 recurs, re-derive the forward-then-back order from triangular structure.

## Memory Hooks
- "Forward goes with L (down); backward goes with U (up) — never reversed."
- "A near-zero pivot amplifies error catastrophically — always pivot."
- "Never form A⁻¹ just to solve Ax=b — LU is faster and more stable."

## Transfer Connections
- `math.linalg.lu-factorization` (already authored, certified domain; cross-link): supplies the
  general LU factorization theory this concept applies with explicit numerical-stability
  analysis.
- `math.num.error-analysis` (already authored, this campaign, Batch 217): supplies the roundoff
  and condition-number framework this concept's pivoting analysis directly depends on.

## Cross-Subject Connections
- Structural engineering: solving a stiffness matrix system for multiple load vectors via a
  single LU factorization is a standard, practically essential computational technique.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.num.lu-factorization.md`, reused by
  reference for its four-representation LU derivation, its pivoting gallery, its LU-versus-
  inverse gate question, and its three-misconception registry (birth types adopted directly as
  declared).
- Transfer probe: the Blueprint's own cross-link-mode probe (`math.linalg.lu-factorization`) on
  block LU factorization and the Schur complement for large-scale systems.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires
  `math.linalg.lu-factorization`/`math.num.error-analysis`, unlocks none, cross_links
  `math.linalg.lu-factorization`, proficient/apply, mastery_threshold 0.85, estimated_hours 5)
  was directly verified against the live KG and matches exactly.

## Version History
- 2026-09-19 (Batch 218): authored. Second entry this batch. Companion batch concept:
  `math.num.numerical-differentiation`.
