# math.disc.recurrence-relation

## Identity
- **KG id**: `math.disc.recurrence-relation`
- **Domain**: math.disc
- **Requires**: `math.seq.sequence`, `math.alg.polynomial`
- **Unlocks**: `math.disc.generating-functions`
- **Cross-links**: `math.de.ode` (see Curriculum Feedback — handled in independence mode, not the
  Blueprint's declared cross-link-probe mode)
- **Difficulty**: proficient
- **Bloom level**: apply
- **Mastery threshold**: 0.85
- **Estimated hours**: 4

## Learning Objective
Define a recurrence relation as an equation defining a sequence $a_n$ in terms of earlier terms
plus required initial conditions, evaluate terms directly by working forward through the
recursion, and solve a linear recurrence with constant coefficients in closed form via the
characteristic equation — including the adjusted form required when the characteristic equation
has a repeated root.

## Core Understanding
A **recurrence relation** defines a sequence $a_n$ using one or more EARLIER terms of the same
sequence, together with **initial conditions** that pin down a specific starting value (or
values) — without which the recurrence rule alone does not determine a unique sequence, since
infinitely many sequences could satisfy the identical rule with different starting points. The
canonical example is the Fibonacci sequence, $F_n=F_{n-1}+F_{n-2}$, with $F_0=0$, $F_1=1$.

Solving a **linear recurrence with constant coefficients** in closed form uses the
**characteristic equation** method: for $a_n=c_1a_{n-1}+c_2a_{n-2}$, hypothesize a solution of
the form $a_n=r^n$. Substituting and dividing through by $r^{n-2}$ gives the characteristic
equation $r^2=c_1r+c_2$. If this quadratic has two DISTINCT roots $r_1,r_2$, the general solution
is $a_n=Ar_1^n+Br_2^n$, with $A,B$ fitted to the initial conditions. But if the characteristic
equation has a REPEATED root $r$, the distinct-roots form $Ar^n+Br^n$ collapses algebraically to
$(A+B)r^n$ — a single effective constant times $r^n$, which cannot be fitted to TWO independent
initial conditions. The correct adjusted form in this case is $a_n=(A+Bn)r^n$, which carries an
extra genuine degree of freedom precisely because a repeated root loses one otherwise.

A recurrence's **order** (how many previous terms it references — Fibonacci is order 2) is a
genuinely different notion from the characteristic equation's own **degree**. For a simple linear
constant-coefficient recurrence these two numbers happen to coincide, but they describe different
objects: order describes the RECURRENCE itself, degree describes the associated CHARACTERISTIC
POLYNOMIAL — a distinction whose two numbers can diverge once nonlinear or variable-coefficient
recurrences are considered, though that generalization is beyond this concept's scope.

## Mental Models
- **"A recurrence is a rule for the next term, plus a starting point — neither alone is enough."**
- **"Check the roots before choosing a form — distinct and repeated roots need genuinely
  different closed-form structures."**
- **"Order describes the recurrence's own reach backward; degree describes its characteristic
  polynomial — they coincide here, but they are not the same idea."**

## Why Students Fail
- **MC-1 (Type 1, overgeneralization)**: once a learner has internalized the distinct-roots
  template $Ar_1^n+Br_2^n$ as THE closed-form solution, that memorized template is applied
  without first checking whether the characteristic equation's roots are actually distinct,
  overgeneralizing a conditionally-valid formula into an unconditional one.
- **MC-2 (Type 5, instruction-induced)**: the recurrence RULE alone looks self-contained and
  complete as a piece of mathematics (an equation relating $a_n$ to earlier terms), and nothing
  about its presentation visually signals that it is genuinely incomplete without a stated
  starting value — the dependency on initial conditions is easy to understate.
- **MC-3 (Type 3, language contamination)**: "order" and "degree" are two different pieces of
  mathematical vocabulary that happen to describe numerically coincident quantities in this
  simple linear case, and the shared numeric value contaminates the two distinct terms into being
  treated as synonyms for one idea rather than two.

## Misconceptions

### MC-1: DISTINCT-ROOTS-FORM-APPLIED-TO-REPEATED-ROOTS
- **Surface form**: for $a_n=4a_{n-1}-4a_{n-2}$ (characteristic equation $(r-2)^2=0$, a repeated
  root $r=2$), applying $A(2^n)+B(2^n)$ directly — which collapses to $(A+B)2^n$, a single
  effective constant unable to fit two independent initial conditions.
- **Frequency band**: Foundational — the Blueprint's own note identifies this as the single most
  common procedural error once a learner has learned one closed-form template.
- **Root cause (Type 1)**: as described above.
- **Repair**: show the algebraic collapse explicitly — $Ar^n+Br^n=(A+B)r^n$ — demonstrating that
  the distinct-roots form genuinely loses a degree of freedom when the roots coincide, motivating
  the adjusted form $(A+Bn)r^n$ as the fix rather than an arbitrary rule to memorize.

### MC-2: INITIAL-CONDITIONS-OMITTED-AS-UNNECESSARY
- **Surface form**: believing the bare rule $a_n=2a_{n-1}$ fully determines "the" sequence it
  defines, without recognizing that $a_0=0$ and $a_0=5$ produce two entirely different (but
  equally valid) sequences satisfying the identical rule.
- **Frequency band**: Foundational.
- **Root cause (Type 5)**: as described above — the rule's self-contained appearance understates
  its genuine dependency on a starting value.
- **Repair**: demonstrate two concretely different sequences satisfying the SAME recurrence rule
  but different initial conditions, making the incompleteness of the bare rule a directly observed
  fact rather than an asserted requirement.

### MC-3: ORDER-CONFLATED-WITH-DEGREE
- **Surface form**: treating "order" (how many previous terms the recurrence references) and
  "degree" (the characteristic polynomial's own degree) as two names for the identical concept,
  rather than two different objects that happen to share a numeric value in this simple case.
- **Frequency band**: Moderate.
- **Root cause (Type 3)**: shared numeric coincidence between two distinct technical vocabularies
  contaminates them into being treated as interchangeable.
- **Repair**: re-anchor explicitly — order describes the RECURRENCE (how far back it looks);
  degree describes the CHARACTERISTIC POLYNOMIAL (its own algebraic degree) — asking the learner
  to state both terms separately for a given recurrence, rather than supplying one number for
  both.

## Analogies
- **"A rule and a launch point"**: a recurrence relation without initial conditions is like a set
  of driving directions ("turn left, then go straight") without a starting address — the
  directions alone don't specify a destination.
- **Anti-analogy**: solving a repeated-root recurrence is NOT "the same procedure with the roots
  just happening to be equal" — the distinct-roots FORM itself becomes structurally inadequate
  and must be replaced, not merely evaluated with equal inputs.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: attempt the distinct-roots form on a repeated-root
  recurrence, show it algebraically collapsing to one effective constant, then apply the correct
  adjusted form and verify against both initial conditions.
- **Demonstration 2 (targets MC-2)**: generate two different sequences from the identical
  recurrence rule $a_n=2a_{n-1}$ using $a_0=0$ and $a_0=5$, side by side.
- **Demonstration 3 (targets MC-3)**: state the order and degree separately for Fibonacci
  (order 2, characteristic degree 2 — coincidentally equal) and discuss why they are conceptually
  distinct even when numerically equal.

## Discovery Questions
1. "If a recurrence's characteristic equation has a REPEATED root, can the distinct-roots formula
   $Ar^n+Br^n$ actually fit two DIFFERENT initial conditions? What happens when you try?"
2. "Does the rule $a_n=2a_{n-1}$ alone tell you what $a_0$ is? Could two different starting values
   produce two different, equally valid sequences from this same rule?"
3. "Is 'order' describing the recurrence itself, or its characteristic polynomial? Are these
   always the same number for every possible recurrence?"

## Teaching Sequence
1. **Anchor**: connect to `math.seq.sequence`'s general notion of a sequence, introducing the
   Fibonacci story as a concrete recurrence example.
2. **Representation shift**: move from direct term-by-term evaluation to the characteristic-
   equation method, working a full distinct-roots example.
3. **Contrast pair**: the repeated-root case worked in full, contrasted against the naive
   distinct-roots attempt; the order-vs-degree distinction stated directly.
4. **Conflict evidence**: the three demonstrations above.
5. **Mastery gate**: require direct term evaluation, a distinct-roots closed-form solution, a
   repeated-root closed-form solution (with a check on which case applies), and an explanation
   of why the repeated-root form genuinely needs the extra factor of $n$.

## Tutor Actions
- Before accepting a closed-form solution, require the learner to state whether the
  characteristic equation's roots are distinct or repeated.
- When a bare recurrence rule is presented without initial conditions, ask what starting value(s)
  are needed before any specific sequence can be named.
- When "order" and "degree" are used interchangeably, ask the learner to define each separately.

## Voice Teaching Notes
- Introduce the characteristic-equation method by deriving it live — substitute $a_n=r^n$,
  divide through, arrive at the characteristic equation — so the method is heard as a derivation,
  not a memorized recipe.
- When a learner applies a closed-form template without checking the roots, ask "did you check
  whether the roots are distinct or repeated first?" before evaluating the rest of their work.

## Assessment Signals
- **Rung 1 (recognition)**: learner states that a recurrence rule alone does not determine a
  unique sequence without initial conditions.
- **Rung 2 (application)**: learner correctly solves a distinct-roots linear recurrence via the
  characteristic equation.
- **Rung 3 (transfer)**: learner correctly identifies a repeated-root case, applies the adjusted
  closed-form solution, and explains why the adjustment is structurally necessary.

## Tutor Recovery Strategy
- If MC-1 recurs, re-run the algebraic-collapse demonstration on the learner's own repeated-root
  example.
- If MC-2 recurs, generate two sequences from the same rule with different starting values
  together with the learner.
- If MC-3 recurs, require the learner to state order and degree as two separate, independently
  defined quantities.

## Memory Hooks
- "A rule needs a starting point — neither is a recurrence alone."
- "Check the roots before choosing the form."
- "Order is the recurrence's reach; degree is the polynomial's degree — not the same idea."

## Transfer Connections
- `math.seq.sequence` (already authored): supplies the general notion of a sequence this entry's
  recurrence defines.
- `math.alg.polynomial` (already authored): supplies the polynomial-equation-solving skill needed
  to solve the characteristic equation.

## Cross-Subject Connections
- None formal.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.disc.recurrence-relation.md`, reused by
  reference for its Fibonacci-based worked examples (direct evaluation, distinct-roots solution,
  repeated-root solution) and its three-misconception registry (independently birth-type-
  classified above, since the Blueprint carries severity labels but no birth-type column).
- Transfer probe, adapted to INDEPENDENCE MODE (see Curriculum Feedback below): the Blueprint's
  own structural-comparison probe (discrete recurrence order vs. continuous ODE order; the
  repeated-root adjustment needed in both settings) is preserved in substance — this entry asks
  the learner to reflect on why a repeated characteristic root would ALSO force an adjusted
  solution form in an analogous continuous setting, without assuming any specific ODE-solving
  technique is available for direct citation.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Genuine Blueprint-staleness finding on P76 cross-link mode.** The Blueprint declares
  cross-link-probe mode against `math.de.ode`, stating it is "authored" and verified via `ls` —
  but that `ls` check only confirmed the BLUEPRINT FILE exists
  (`docs/curriculum/blueprints/math.de.ode.md`), not that an Educational Brain entry exists.
  Direct verification (`ls educational-brain/concepts/mathematics/math.de.ode.md`) confirmed no
  such file exists — `math.de` has zero Educational Brain entries. Per this program's established
  precedent (Batch 48's `math.opt.*`, Batch 53's `math.seq.convergent`, Batch 58's
  `math.fnal.hilbert-space`, Batch 62's `math.disc.recurrence-relation` cross-link itself as
  flagged from the OTHER side in `math.seq.recursive-sequences`), Blueprint-file-existence is not
  a sufficient condition for cross-link-probe mode — an actual Educational Brain entry must
  exist. This entry therefore uses INDEPENDENCE MODE for its transfer probe instead, preserving
  the Blueprint's underlying structural-comparison intent without assuming the ODE concept's own
  Educational Brain content is available for direct citation.
- This entry directly resolves the standing forward-reference this program's own
  `math.seq.recursive-sequences` (Batch 62) recorded — that entry noted `math.disc.recurrence-
  relation` did not yet exist and used independence mode for its own transfer probe as a result.
  With this entry now authored, `math.seq.recursive-sequences`'s own probe content remains
  correct as written (it did not assume anything about this entry that would now need revision).
- Zero discrepancy on all other substantive fields (`requires`, `unlocks`, `difficulty`, `bloom`,
  `mastery_threshold`, `estimated_hours`).

## Version History
- 2026-09-13 (Batch 63): authored. Unblocked by `math.seq.sequence` (Batch 52) and
  `math.alg.polynomial` (already authored under `math.alg`'s own certification). Companion batch
  concepts: `math.trig.polar-form-complex`, `math.seq.series-convergence`,
  `math.disc.asymptotic-notation`. This is the first `math.disc` concept authored since Batch 23,
  which left the domain PARKED at 20/32 with 0 topologically-ready candidates — this batch's
  frontier check found `math.disc` had reopened (2 candidates: this entry and
  `asymptotic-notation`) once `math.seq`'s own concepts advanced far enough. `math.disc` reaches
  **21/32** this batch.
