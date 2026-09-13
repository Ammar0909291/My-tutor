# math.disc.linear-recurrence

## Identity
- **KG id**: `math.disc.linear-recurrence`
- **Domain**: math.disc
- **Requires**: `math.disc.recurrence-relation`, `math.alg.polynomial-roots`
- **Unlocks**: none
- **Cross-links**: `math.de.char-equation` (handled in independence mode — see Curriculum
  Feedback)
- **Difficulty**: proficient
- **Bloom level**: apply
- **Mastery threshold**: 0.85
- **Estimated hours**: 5

## Learning Objective
Solve linear recurrences with constant coefficients ($a_n=c_1a_{n-1}+c_2a_{n-2}+\cdots$) via the
characteristic-equation method: form the characteristic polynomial, find its roots using
`math.alg.polynomial-roots`, write the general solution as a linear combination of $r^n$ terms
(or $n^jr^n$ for a root of multiplicity $j+1$), and apply initial conditions to fix the
constants; derive Binet's formula for the Fibonacci sequence explicitly; and handle
non-homogeneous recurrences by adding a particular solution.

## Core Understanding
`math.disc.recurrence-relation` already establishes the general idea of a recurrence and how to
derive one via case-splitting, but does not supply a general SOLVING method. For a LINEAR
recurrence with CONSTANT coefficients, $a_n=c_1a_{n-1}+\cdots+c_ka_{n-k}$, substituting the trial
solution $a_n=r^n$ transforms the recurrence into a genuine POLYNOMIAL equation — the
characteristic polynomial $r^k-c_1r^{k-1}-\cdots-c_k=0$ — whose roots `math.alg.polynomial-roots`
finds directly. Each DISTINCT root $r$ contributes a term $r^n$ to the general solution, since
$a_n=r^n$ genuinely satisfies the recurrence for exactly those values of $r$; the crucial
conceptual bridge is that the root $r$ is a NUMBER, while the term it contributes, $r^n$, is a
FUNCTION of $n$ — the solution to the recurrence is this function, never the root itself.

When a root $r$ has MULTIPLICITY $m>1$, a single term $r^n$ is not enough — repeating it $m$
times gives only ONE genuinely distinct function, not $m$ independent ones. The additional
independent solutions are $nr^n, n^2r^n,\ldots,n^{m-1}r^n$ — polynomial-in-$n$ factors
multiplying the same base, exactly analogous to the $te^{rt}$ term appearing for a repeated root
of a linear ODE's characteristic equation (the discrete-continuous parallel this concept
explicitly draws: $r^n\leftrightarrow e^{\lambda t}$, with $r=e^\lambda$).

The GENERAL solution — with its free constants $A_1,\ldots,A_k$ — represents an entire FAMILY of
sequences all satisfying the recurrence, not yet the specific one asked for. Only substituting
the given INITIAL CONDITIONS ($a_0,a_1,\ldots$) into this general form and solving the resulting
$k\times k$ linear system pins down the unique sequence matching the problem — for the Fibonacci
recurrence, $F_n=A\varphi^n+B\psi^n$ (roots $\varphi=(1+\sqrt5)/2$, $\psi=(1-\sqrt5)/2$) becomes
Binet's exact formula $F_n=(\varphi^n-\psi^n)/\sqrt5$ only after applying $F_0=0,F_1=1$.

For NON-HOMOGENEOUS recurrences (an extra term $f(n)$ added), the general solution is the
HOMOGENEOUS solution plus a PARTICULAR solution — found via an educated guess whose form depends
on $f(n)$'s own shape, adjusted by multiplying by $n^m$ if the guessed form collides with an
existing characteristic root (the identical guarded-guess principle familiar from
undetermined-coefficients methods for ODEs). Crucially, initial conditions must be applied to the
FULL general solution (homogeneous plus particular), never to the homogeneous part alone — doing
so ignores $f(n)$'s own contribution and produces the wrong specific sequence.

## Mental Models
- **"A root $r$ is a number; the term it contributes, $r^n$, is a FUNCTION — never confuse the
  two."**
- **"A repeated root of multiplicity $m$ needs $m$ genuinely independent terms — $r^n,
  nr^n,\ldots,n^{m-1}r^n$ — not $m$ copies of the same one."**
- **"The general solution is a whole family — initial conditions pin down the ONE sequence you
  actually want."**

## Why Students Fail

### MC-1: CHARACTERISTIC-ROOT-IS-THE-TERM
- **Surface form**: confusing the characteristic root $r$ (a number) with the term $a_n$ itself,
  failing to recognize that each root contributes the FUNCTION $r^n$ (or $n r^n$ for a repeated
  root) to the general solution.
- **Frequency band**: not stated in the Blueprint (adopted as given).
- **Root cause (Type 4, notation-induced)**: solving the characteristic equation
  $r^2=c_1r+c_2$ genuinely produces numbers $r_1,r_2$, and the conceptual leap from "root $r$" to
  "contributed term $r^n$" is easy to skip without explicit articulation.
- **Repair**: verify directly, by substitution, that $a_n=r^n$ genuinely satisfies the original
  recurrence whenever $r$ is a characteristic root — making the root-to-term bridge concrete
  rather than assumed.

### MC-2: REPEATED-ROOT-OMITS-POLYNOMIAL-FACTOR
- **Surface form**: correctly identifying a repeated root $r$ but writing the general solution as
  $c_1r^n+c_2r^n=(c_1+c_2)r^n$ — a single term — instead of the correct $c_1r^n+c_2nr^n$.
- **Frequency band**: not stated in the Blueprint (adopted as given).
- **Root cause (Type 4, notation-induced)**: the distinct-roots formula
  $c_1r_1^n+c_2r_2^n$ visually invites writing "two copies" of the same term when $r_1=r_2$,
  since the formula's shape doesn't itself signal that a genuinely different second solution is
  needed.
- **Repair**: verify by direct substitution that $nr^n$ (not $r^n$ again) genuinely satisfies the
  recurrence when $r$ is a double root, establishing it as the necessary SECOND independent
  solution.

### MC-3: GENERAL-SOLUTION-WITHOUT-INITIAL-CONDITIONS-IS-THE-ANSWER
- **Surface form**: writing the general solution with undetermined constants $A,B,\ldots$ and
  reporting it as the final answer without applying the given initial conditions to solve for
  those constants.
- **Frequency band**: not stated in the Blueprint (adopted as given).
- **Root cause (Type 5, instruction-induced)**: instruction often emphasizes deriving the general
  solution as the conceptual achievement, with the final step of solving for the constants
  under-weighted relative to that derivation.
- **Repair**: show that BOTH the all-zero sequence and the genuine Fibonacci sequence satisfy the
  general form $F_n=A\varphi^n+B\psi^n$ for different constant choices — only the initial
  conditions distinguish which specific sequence is actually being solved for.

## Misconceptions

### MC-1: CHARACTERISTIC-ROOT-IS-THE-TERM
- **Surface form**: as described above.
- **Root cause (Type 4)**: as described above.
- **Repair**: as described above.

### MC-2: REPEATED-ROOT-OMITS-POLYNOMIAL-FACTOR
- **Surface form**: as described above.
- **Root cause (Type 4)**: as described above.
- **Repair**: as described above.

### MC-3: GENERAL-SOLUTION-WITHOUT-INITIAL-CONDITIONS-IS-THE-ANSWER
- **Surface form**: as described above.
- **Root cause (Type 5)**: as described above.
- **Repair**: as described above.

## Analogies
- **"Solving a linear recurrence mirrors solving a linear ODE with constant coefficients — the
  characteristic equation, its roots, and repeated-root handling all carry over directly."**
- **Anti-analogy**: the general solution is NOT a finished answer by itself — it is an
  UNDETERMINED family, and reporting it without applying initial conditions leaves the actual
  question unanswered.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: substitute $a_n=r^n$ into a specific recurrence and verify
  directly that it satisfies it exactly when $r$ solves the characteristic equation.
- **Demonstration 2 (targets MC-2)**: for $a_n=6a_{n-1}-9a_{n-2}$ (double root $r=3$), verify by
  substitution that $n\cdot3^n$ genuinely satisfies the recurrence, distinct from $3^n$ alone.
- **Demonstration 3 (targets MC-3)**: derive Binet's formula in full — $F_n=A\varphi^n+B\psi^n$
  with $A=1/\sqrt5,B=-1/\sqrt5$ found only after substituting $F_0=0,F_1=1$ — contrasted against
  the incomplete general form alone.

## Discovery Questions
1. "If $r$ solves the characteristic equation, is $r$ itself the answer to the recurrence, or is
   it something else derived from $r$?"
2. "If a double root $r$ contributes only the term $r^n$, how many genuinely independent
   solutions does a second-order recurrence actually have?"
3. "Does the general solution, by itself, already tell you the ONE specific sequence the problem
   is asking about?"

## Teaching Sequence
1. **Anchor**: connect to `math.disc.recurrence-relation`'s general recurrence framework and
   `math.alg.polynomial-roots`'s root-finding machinery, framing the characteristic-equation
   method as their direct combination.
2. **Conflict evidence**: direct substitution verifying $r^n$ satisfies the recurrence, making the
   root-to-term bridge concrete.
3. **Contrast pair**: the incorrect single-term repeated-root solution versus the correct
   $(A+Bn)r^n$ form, verified by substitution.
4. **Mastery gate**: require solving a homogeneous recurrence with distinct roots, one with a
   repeated root, and a non-homogeneous recurrence, applying initial conditions in every case.

## Tutor Actions
- Never accept a characteristic root reported as though it were the sequence's value itself.
- Never accept a repeated root's general solution missing the polynomial-in-$n$ factor.
- Never accept a "final answer" that still carries undetermined constants.

## Voice Teaching Notes
- Say "the root is a number, the term is a function of $n$" whenever introducing the
  characteristic-equation method.
- When a learner reports the general solution as final, ask "have the initial conditions been
  used yet?"

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly forms the characteristic polynomial and finds its
  roots.
- **Rung 2 (application)**: learner correctly writes the general solution, including the
  polynomial-in-$n$ factor for a repeated root, and applies initial conditions to solve for the
  constants.
- **Rung 3 (transfer)**: learner correctly solves a non-homogeneous recurrence by adding a
  particular solution before applying initial conditions.

## Tutor Recovery Strategy
- If MC-1 recurs, re-run the direct-substitution verification that $r^n$ satisfies the
  recurrence.
- If MC-2 recurs, re-run the $nr^n$-verification for a repeated root.
- If MC-3 recurs, re-run the full Binet's-formula derivation, from general solution through
  applied initial conditions.

## Memory Hooks
- "The root is a number; the term it contributes is a function of $n$."
- "Repeated root of multiplicity $m$? You need $m$ genuinely different terms — $r^n, nr^n,
  \ldots$."
- "The general solution is a family — initial conditions choose the ONE member you want."

## Transfer Connections
- `math.disc.recurrence-relation` (already authored): supplies the general recurrence framework
  this concept's characteristic-equation method solves.
- `math.alg.polynomial-roots` (already authored): supplies the root-finding machinery applied
  directly to the characteristic polynomial.

## Cross-Subject Connections
- None formal.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.disc.linear-recurrence.md`, reused by
  reference for its Fibonacci/Binet's-formula derivation, its repeated-root verification, its
  non-homogeneous worked example, and its three-misconception registry (birth types adopted
  directly from the Blueprint's own explicit classification).
- Transfer probe cited by reference, adapted to independence mode: the Blueprint's own probe
  connects generating functions, matrix diagonalization via the companion matrix, and the
  Skolem–Mahler–Lech zero-set theorem to the characteristic-equation method — reused here without
  assuming content from the unauthored `math.de.char-equation` cross-link.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Genuine Blueprint-staleness finding on P76 cross-link mode, corrected via independence
  mode**: the Blueprint declares P76_mode as "Cross-link" against `math.de.char-equation`;
  verified via `ls educational-brain/concepts/mathematics/` that no `math.de.char-equation` entry
  exists (`math.de` is entirely unstarted). This entry's transfer probe is therefore reused in
  independence mode, adapting the Blueprint's own generating-function/matrix-diagonalization/
  Skolem–Mahler–Lech content without assuming any specific unauthored concept's own content.
- No other genuine Blueprint/KG metadata discrepancy found: requires, unlocks, cross_links,
  difficulty, bloom, mastery_threshold, and estimated_hours all match the live KG exactly.

## Version History
- 2026-09-13 (Batch 68): authored. Unblocked by `math.disc.recurrence-relation` (Batch 63) and
  `math.alg.polynomial-roots` (already authored). Companion batch concepts:
  `math.calc.radius-of-convergence`, `math.disc.catalan-numbers`,
  `math.disc.divide-conquer-recurrence`. `math.disc` reaches **26/32** this batch (all 4 batch
  concepts authored: math.calc.radius-of-convergence + 3 of math.disc's 4 ready candidates,
  deferring `generating-functions`).
