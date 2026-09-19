# math.linalg.least-squares

## Identity
- **KG id**: `math.linalg.least-squares`
- **Domain**: math.linalg
- **Requires**: `math.linalg.projection`, `math.linalg.matrix-transpose`
- **Unlocks**: none
- **Cross-links**: `math.stats.linear-regression` (not yet authored, independence mode)
- **Difficulty**: proficient
- **Bloom level**: apply
- **Mastery threshold**: 0.85
- **Estimated hours**: 5

## Learning Objective
Recognize minimizing $\|Ax-b\|^2$ as EXACTLY `math.linalg.projection`'s own closest-point problem
applied to $b$ and $W=\text{col}(A)$ (never a genuinely new kind of problem); derive the normal
equations $A^TA\hat x=A^Tb$ DIRECTLY from projection's own orthogonality characterization (never
an unmotivated formula to memorize); and apply least squares to data-fitting, recognizing the
best-fit line MINIMIZES total squared deviation while generally MISSING every point (never
assumed to pass through all points exactly).

## Core Understanding
LEAST SQUARES IS PROJECTION'S OWN CLOSEST-POINT PROBLEM — NEVER A GENUINELY NEW PROBLEM: for the
inconsistent system $\begin{pmatrix}1&0\\0&1\\1&1\end{pmatrix}x=\begin{pmatrix}1\\1\\3\end{pmatrix}$
(verified inconsistent: rows 1-2 force $x_1=x_2=1$, but row 3 demands $x_1+x_2=2\ne3$): $b$ does
NOT lie in $W=\text{col}(A)$. The least-squares solution seeks $A\hat x=\text{proj}_W(b)$ — this IS
`math.linalg.projection`'s closest-point-in-$W$ problem, applied here with $W=\text{col}(A)$,
never an unrelated new technique requiring separate machinery.

THE NORMAL EQUATIONS FOLLOW DIRECTLY FROM PROJECTION'S ORTHOGONALITY CHARACTERIZATION — NEVER AN
UNMOTIVATED FORMULA: since $\text{proj}_W(b)$'s residual $b-\text{proj}_W(b)$ is orthogonal to
ALL of $W$, and $W=\text{col}(A)$ is spanned by $A$'s columns, orthogonality to $W$ is equivalent
to orthogonality to EACH column of $A$ — i.e. $a_i^T(b-A\hat x)=0$ for every column $a_i$.
Stacking these via $(AB)^T=B^TA^T$: $A^T(b-A\hat x)=0$, giving $A^TA\hat x=A^Tb$ — the NORMAL
EQUATIONS, derived DIRECTLY from the already-known orthogonality condition, never introduced as a
separate formula to memorize. Verified: for
$A^TA=\begin{pmatrix}2&1\\1&2\end{pmatrix}$, $A^Tb=\begin{pmatrix}4\\4\end{pmatrix}$: solving gives
$\hat x=(4/3,4/3)$, with residual $(-1/3,-1/3,1/3)$ genuinely orthogonal to $A$'s first column
$(1,0,1)$: $-1/3+0+1/3=0$ ✓.

THE BEST-FIT LINE MINIMIZES TOTAL SQUARED DEVIATION — IT GENERALLY MISSES EVERY POINT, NEVER
PASSES THROUGH ALL EXACTLY: fitting $y=c_0+c_1x$ to $(0,1),(1,2),(2,2)$ (which do NOT lie on any
single exact line): setting up $A=\begin{pmatrix}1&0\\1&1\\1&2\end{pmatrix}$,
$b=\begin{pmatrix}1\\2\\2\end{pmatrix}$: solving the normal equations gives $\hat x=(2/3,1/2)$ —
the best-fit line $y=2/3+x/2$ MINIMIZES the total squared vertical deviation, but generally does
NOT pass through any of the three points exactly. Least squares never pretends the data lies on a
perfect line — it finds the specific line that comes closest, in the precise squared-distance
sense.

## Mental Models
- **"Least squares isn't a new problem — it's asking projection's own question: what's the
  closest point in col(A) to b, and which x produces it?"**
- **"The normal equations aren't handed down as a recipe — they're projection's own orthogonality
  requirement, written compactly with the transpose identity."**
- **"The best-fit line minimizes total squared deviation — it doesn't pretend the data is
  perfectly linear, and it generally misses every single point."**

## Why Students Fail

### MC-1: LEAST-SQUARES-ASSUMED-UNRELATED-NEW-PROBLEM
- **Surface form**: believes the least-squares problem is a genuinely new kind of problem, missing
  that it is literally `math.linalg.projection`'s own closest-point-in-a-subspace problem applied
  to $b$ and $\text{col}(A)$.
- **Birth type**: Foundational severity (Blueprint's own declared severity — least squares is
  often introduced as a standalone data-fitting technique, obscuring its direct identification
  with the already-known projection problem).
- **Repair**: re-walk the direct identification of $W=\text{col}(A)$ as the relevant subspace.

### MC-2: NORMAL-EQUATIONS-ASSUMED-UNMOTIVATED-FORMULA
- **Surface form**: believes the normal equations $A^TA\hat x=A^Tb$ are an independent formula to
  memorize, missing that they follow directly from projection's own orthogonality
  characterization.
- **Birth type**: High severity (Blueprint's own declared severity — the formula's compact matrix
  form obscures its direct derivation from a condition already known).
- **Repair**: re-walk the direct orthogonality verification of the residual against $A$'s columns.

### MC-3: LEAST-SQUARES-LINE-ASSUMED-TO-PASS-THROUGH-ALL-POINTS
- **Surface form**: believes the least-squares best-fit line passes through every data point
  exactly, missing that it minimizes total squared deviation while generally missing every point.
- **Birth type**: Moderate severity (Blueprint's own declared severity — "best fit" can be
  misread as "perfect fit").
- **Repair**: re-walk the non-collinear three-point example's minimizing, non-exact best-fit line.

## Misconceptions

### MC-1: LEAST-SQUARES-ASSUMED-UNRELATED-NEW-PROBLEM
- **Surface form**: as described above.
- **Root cause (Foundational)**: as described above.
- **Repair**: as described above.

### MC-2: NORMAL-EQUATIONS-ASSUMED-UNMOTIVATED-FORMULA
- **Surface form**: as described above.
- **Root cause (High)**: as described above.
- **Repair**: as described above.

### MC-3: LEAST-SQUARES-LINE-ASSUMED-TO-PASS-THROUGH-ALL-POINTS
- **Surface form**: as described above.
- **Root cause (Moderate)**: as described above.
- **Repair**: as described above.

## Analogies
- **"Least squares finds the closest achievable point in a limited set of outcomes — like finding
  the nearest parking spot to your actual destination when the destination itself isn't a
  parking spot."**
- **Anti-analogy**: the best-fit line is not a promise that the data is truly linear — it's the
  best possible compromise given that it isn't, measured in the precise squared-distance sense.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: the direct identification of $W=\text{col}(A)$ for the
  inconsistent three-equation, two-unknown system.
- **Demonstration 2 (targets MC-2)**: the normal-equations derivation and residual-orthogonality
  verification.
- **Demonstration 3 (targets MC-3)**: the best-fit-line data-fitting example, showing the line
  misses all three non-collinear points while minimizing total squared deviation.

## Discovery Questions
1. "Is the least-squares problem a genuinely new kind of problem, or is it literally the
   closest-point-in-a-subspace problem, applied to b and col(A)?"
2. "Are the normal equations an independent formula to memorize, or do they follow directly from
   the orthogonality characterization of the closest point?"
3. "Does the least-squares best-fit line pass through every data point exactly, or does it
   minimize the total squared deviation while generally missing every point?"

## Teaching Sequence
1. **Representation shift**: identifying least squares as projection's closest-point problem,
   working Demonstration 1, isolating MC-1.
2. **Conflict evidence**: the normal-equations derivation from orthogonality, working
   Demonstration 2, isolating MC-2.
3. **Contrast pair**: the minimizing, non-exact best-fit line, working Demonstration 3, isolating
   MC-3.
4. **Mastery gate**: require a correct column-space identification for an inconsistent system, a
   correct normal-equations derivation and solution with residual verification, and a correct
   best-fit-line data-fitting application, at the Blueprint's own stated MAMR of 5/5.

## Tutor Actions
- Never accept least squares described as unrelated to the projection problem.
- Never accept the normal equations presented as an unmotivated formula without deriving them
  from orthogonality.
- Never accept a claim that the least-squares best-fit line passes through every data point
  exactly.

## Voice Teaching Notes
- Say "what's the closest point in col(A) to b — isn't that exactly the projection question?"
  whenever an inconsistent system is set up for least squares.
- Ask "does this line need to pass through every point, or just minimize total squared
  deviation?" whenever a best-fit line is discussed.

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly identifies the column space and recognizes an
  inconsistent system as a projection problem.
- **Rung 2 (application)**: learner correctly derives and solves the normal equations, verifying
  the residual's orthogonality to $A$'s columns.
- **Rung 3 (transfer)**: learner correctly fits a best-fit line to noisy data and explains why the
  resulting line is provably the best possible choice via projection's orthogonality
  characterization.

## Tutor Recovery Strategy
- If MC-1 recurs, re-walk the column-space identification.
- If MC-2 recurs, re-walk the residual-orthogonality verification.
- If MC-3 recurs, re-walk the minimizing, non-exact best-fit line example.

## Memory Hooks
- "Least squares is projection's closest-point problem — never a separate new question."
- "The normal equations come from orthogonality — never an unmotivated recipe."
- "Best fit minimizes squared deviation — it generally misses every point, never passes through
  all of them."

## Transfer Connections
- `math.linalg.projection` (already authored, this campaign, Batch 174): supplies the orthogonal
  projection and its orthogonality characterization this concept's entire derivation is built on.
- `math.linalg.matrix-transpose` (already authored, certified domain): supplies the transpose and
  $(AB)^T=B^TA^T$ identity used to compactly derive the normal equations.
- `math.stats.linear-regression` (not yet authored, KG's declared cross-link and related concept):
  the statistical interpretation of regression coefficients this concept's normal-equations
  machinery directly underlies.

## Cross-Subject Connections
- Engineering/data fitting: fitting a linear model to noisy sensor measurements that don't satisfy
  the theoretical relationship exactly, obtaining a single well-defined best-fit line.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.linalg.least-squares.md`, reused by
  reference for its full inconsistent-system worked example, its normal-equations derivation and
  residual-orthogonality verification, its best-fit-line data-fitting example, and its
  three-misconception registry (severity levels adopted directly as declared).
- Transfer probe: the Blueprint's own independence-mode probe (pending
  `math.stats.linear-regression`'s authoring), applying least squares to a noisy-sensor-
  measurement engineering scenario.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires
  `math.linalg.projection`/`math.linalg.matrix-transpose`, unlocks none, cross_links
  `math.stats.linear-regression`, proficient/apply, mastery_threshold 0.85, estimated_hours 5) was
  directly verified against the live KG and matches exactly. `math.linalg.matrix-transpose`
  independently re-confirmed authored; `math.stats.linear-regression` independently re-confirmed
  still unauthored — the Blueprint's independence-mode deferral remains correct.

## Version History
- 2026-09-19 (Batch 179): authored. First entry this batch. Companion batch concept:
  `math.linalg.dual-space`.
