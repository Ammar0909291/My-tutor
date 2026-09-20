# math.cx.poles

## Identity
- **KG id**: `math.cx.poles`
- **Domain**: math.cx
- **Requires**: `math.cx.singularities`
- **Unlocks**: `math.cx.residue-theorem`
- **Cross-links**: none
- **Difficulty**: expert
- **Bloom level**: apply
- **Mastery threshold**: 0.85
- **Estimated hours**: 4

## Learning Objective
Determine pole ORDER as the UNIQUE $n$ making $(z-z_0)^nf(z)$ holomorphic AND NONZERO — NEVER
assume multiple $n$ values could equally satisfy this test; confirm meromorphicity by EXPLICITLY
checking every singularity is a pole — NEVER assume "generally well-behaved" suffices; and
recognize the rational-function classification of globally meromorphic functions with tame
infinity as a NONTRIVIAL structural theorem — NEVER an obvious restatement.

## Core Understanding
POLE ORDER IS THE UNIQUE $n$ THREADING BETWEEN TOO-SMALL AND TOO-LARGE — NEVER MULTIPLE VALID
$n$: for $f(z)=1/(z-2)^3$ at $z_0=2$: testing $n=2$: $(z-2)^2f(z)=1/(z-2)$ — STILL unbounded, too
small. Testing $n=3$: $(z-2)^3f(z)=1$ — holomorphic AND nonzero ($=1\neq0$) — CORRECT. Testing
$n=4$: $(z-2)^4f(z)=(z-2)$ — holomorphic but EQUALS ZERO at $z=2$ — over-cancels, too large.
Believing multiple values of $n$ could equally satisfy the "holomorphic and nonzero" test is
WRONG — exactly ONE $n$ threads between the too-small failure (still unbounded) and the too-large
failure (holomorphic but zero).

MEROMORPHICITY REQUIRES EXPLICITLY CHECKING EVERY SINGULARITY — NEVER ASSUMED FROM GENERAL GOOD
BEHAVIOR: for $f(z)=e^z/(z^2(z-1))$: at $z=0$, testing $(z-0)^2f(z)=e^z/(z-1)$ — holomorphic and
nonzero at $z=0$ ($=-1\neq0$) — a pole of order 2. At $z=1$, testing $(z-1)f(z)=e^z/z^2$ —
holomorphic and nonzero at $z=1$ ($=e\neq0$) — a pole of order 1. BOTH singularities are
EXPLICITLY confirmed as poles (never essential), qualifying $f$ as meromorphic. Believing
confirming meromorphicity does not require explicitly checking every individual singularity
against the pole-versus-essential classification is WRONG — meromorphicity is confirmed by
checking EVERY singularity, one at a time, never assumed from a vague impression of
well-behavedness.

THE RATIONAL-FUNCTION CLASSIFICATION IS A NONTRIVIAL STRUCTURAL THEOREM — NEVER AN OBVIOUS
RESTATEMENT: for $f(z)=(z^2+1)/((z-1)(z+2)^2)$: poles at $z=1$ (order 1) and $z=-2$ (order 2),
directly readable from the factorization. This CONFIRMS the expected direction (rational
$\Rightarrow$ meromorphic with matching poles) — but the deeper CONVERSE claim — that ANY function
globally meromorphic on $\mathbb{C}$ with tame behavior at infinity MUST be rational — is the
genuinely powerful content. Believing this classification is a fairly obvious, expected fact
rather than a genuinely nontrivial structural theorem is WRONG — an apparently much BROADER
analytic class (globally meromorphic with tame infinity behavior) collapses EXACTLY to the purely
algebraic class of rational functions, no more and no less.

## Mental Models
- **"Multiply by (z−z₀)ⁿ for increasing n until the result is holomorphic AND nonzero — too few
  cancels too little, too many cancels too much, and exactly one n threads between."**
- **"Confirming meromorphicity means checking every singularity individually against the pole-
  versus-essential test — never a vague impression of good behavior."**
- **"An apparently much broader analytic class — globally meromorphic with tame infinity behavior
  — collapses exactly to rational functions. That's genuinely surprising, not obvious."**

## Why Students Fail

### MC-1: POLE-ORDER-ASSUMED-NON-UNIQUE
- **Surface form**: believes multiple values of $n$ could equally satisfy the "holomorphic and
  nonzero" pole-order test, missing that exactly one $n$ threads between the too-small and
  too-large failure modes.
- **Birth type**: overgeneralization (Blueprint's own declared foundational severity — without
  seeing the bracketing test worked through explicitly, uniqueness isn't obvious).
- **Repair**: re-walk the three-way bracketing test showing exactly one $n$ works.

### MC-2: MEROMORPHICITY-ASSUMED-NOT-TO-NEED-EXPLICIT-CHECKING
- **Surface form**: believes confirming meromorphicity does not require explicitly checking every
  individual singularity against the pole-vs-essential classification.
- **Birth type**: instruction-induced (Blueprint's own declared high severity — "meromorphic"
  sounds like a description of general tameness rather than a per-point checked property).
- **Repair**: re-walk the explicit per-singularity verification.

### MC-3: RATIONAL-CLASSIFICATION-UNDERVALUED-AS-OBVIOUS
- **Surface form**: believes the classification of globally meromorphic functions with tame
  infinity behavior as exactly the rational functions is an obvious, unremarkable fact.
- **Birth type**: overgeneralization (Blueprint's own declared moderate severity — the one
  direction shown by example, rational implies meromorphic, is easy and obscures the harder
  converse).
- **Repair**: re-walk the concrete verification and its framing as illustrating, not trivializing,
  the deeper classification claim.

## Misconceptions

### MC-1: POLE-ORDER-ASSUMED-NON-UNIQUE
- **Surface form**: as described above.
- **Root cause (overgeneralization)**: as described above.
- **Repair**: as described above.

### MC-2: MEROMORPHICITY-ASSUMED-NOT-TO-NEED-EXPLICIT-CHECKING
- **Surface form**: as described above.
- **Root cause (instruction-induced)**: as described above.
- **Repair**: as described above.

### MC-3: RATIONAL-CLASSIFICATION-UNDERVALUED-AS-OBVIOUS
- **Surface form**: as described above.
- **Root cause (overgeneralization)**: as described above.
- **Repair**: as described above.

## Analogies
- **"Finding pole order is like finding the exact number of coats of paint needed to cover a
  stain completely without over-painting — too few leaves it showing through, too many wastes
  paint (and changes the color at that spot to zero)."**
- **Anti-analogy**: the rational-function classification isn't a definitional tautology — it's a
  genuine collapse of a seemingly analytic, infinite-dimensional-feeling class down to a small,
  purely algebraic one.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: the $1/(z-2)^3$ three-way bracketing test ($n=2,3,4$).
- **Demonstration 2 (targets MC-2)**: the $e^z/(z^2(z-1))$ per-singularity meromorphicity check.
- **Demonstration 3 (targets MC-3)**: the $(z^2+1)/((z-1)(z+2)^2)$ pole-order-from-factorization
  confirmation.

## Discovery Questions
1. "Is there only one way to test a pole's order, or could different values of n all equally
   satisfy the test?"
2. "Does confirming a function is meromorphic require checking every individual singularity, or is
   it enough that the function seems generally well-behaved?"
3. "Is the classification 'globally meromorphic with tame infinity = rational functions' a fairly
   obvious fact, or a genuinely nontrivial structural theorem?"

## Teaching Sequence
1. **Representation shift**: work the three-way bracketing test for $1/(z-2)^3$, isolating MC-1.
2. **Conflict evidence**: work the per-singularity meromorphicity check, isolating MC-2.
3. **Contrast pair**: work the rational-function pole-factorization confirmation, isolating MC-3.
4. **Mastery gate**: require a correct pole-order determination, a correct meromorphicity
   verification for a multi-singularity function, a correct explanation of why a given function is
   NOT meromorphic (an essential singularity present), and a correct pole identification from a
   rational function's factorization, at the Blueprint's own stated MAMR of 5/5.

## Tutor Actions
- Never accept a pole order determined without the bracketing test showing uniqueness.
- Never accept meromorphicity confirmed without explicitly checking every singularity.
- Never accept the rational-function classification dismissed as obvious.

## Voice Teaching Notes
- Say "have you checked n one below and one above your answer, to confirm uniqueness?" whenever a
  pole order is claimed.
- Ask "did you check EVERY singularity, or just assume the function looks fine?" whenever
  meromorphicity is claimed.

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly determines a pole's order via the bracketing test.
- **Rung 2 (application)**: learner correctly verifies meromorphicity by checking every
  singularity of a multi-pole function.
- **Rung 3 (transfer)**: learner correctly simplifies a rational transfer function algebraically
  before identifying its true poles, avoiding a spurious pole from an uncancelled common factor.

## Tutor Recovery Strategy
- If MC-1 recurs, re-walk the three-way bracketing test.
- If MC-2 recurs, re-walk the per-singularity verification.
- If MC-3 recurs, re-frame the classification's genuine structural surprise.

## Memory Hooks
- "Exactly one n threads between too-small and too-large — never multiple valid answers."
- "Meromorphic means every singularity checked and confirmed a pole — never assumed."
- "Globally meromorphic with tame infinity collapses exactly to rational — a genuine surprise."

## Transfer Connections
- `math.cx.singularities` (prerequisite, already authored, this campaign): supplies the isolated-
  singularity classification into removable/pole/essential this concept's pole-order refinement
  and meromorphicity definition both directly build on.

## Cross-Subject Connections
- Control theory: a transfer function's poles (after algebraic simplification to avoid spurious
  cancelled-factor poles) determine system stability, directly applying this concept's
  pole-order and meromorphicity machinery.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.cx.poles.md`, reused by reference for its
  three worked examples and its three-misconception registry (birth types adopted directly as
  declared).
- Transfer probe: the Blueprint's own independence-mode probe on a control-system transfer
  function $H(z)=(z^2-1)/(z^3-z)$, requiring algebraic simplification before correct pole
  identification.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires
  `math.cx.singularities`, unlocks `math.cx.residue-theorem`, cross_links none, expert/apply,
  mastery_threshold 0.85, estimated_hours 4) was directly verified against the live KG and matches
  exactly.

## Version History
- 2026-09-20 (Batch 242): authored. Second entry this batch. Companion batch concept:
  `math.cx.higher-derivatives`.
