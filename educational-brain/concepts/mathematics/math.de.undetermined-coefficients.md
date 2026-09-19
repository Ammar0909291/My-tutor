# math.de.undetermined-coefficients

## Identity
- **KG id**: `math.de.undetermined-coefficients`
- **Domain**: math.de
- **Requires**: `math.de.second-order-linear`, `math.de.char-equation`
- **Unlocks**: none
- **Cross-links**: none
- **Difficulty**: advanced
- **Bloom level**: apply
- **Mastery threshold**: 0.85
- **Estimated hours**: 5

## Learning Objective
Find a particular solution $y_p$ of $ay''+by'+cy=g(x)$ when $g$ is a polynomial, exponential,
sine, cosine, or product thereof; select the trial function including the FULL polynomial (all
degrees down to the constant term, never just the lead term); ALWAYS pair sine with cosine in a
trigonometric trial (never sine alone); apply the MODIFICATION RULE (multiply by $x$ or $x^2$)
whenever any trial term duplicates a homogeneous solution; and form the general solution
$y=y_h+y_p$.

## Core Understanding
A POLYNOMIAL TRIAL NEEDS EVERY DEGREE DOWN TO THE CONSTANT — NEVER JUST THE LEAD TERM: for
$y''-3y'+2y=x^2$: the correct trial is $y_p=Ax^2+Bx+C$ (ALL three terms), never just $Ax^2$.
Substituting: $2A-3(2Ax+B)+2(Ax^2+Bx+C)=x^2$ requires matching $2A=1$, $2B-6A=0$, $2A-3B+2C=0$ —
three equations needing all three unknowns; differentiation LOWERS degree, so lower-degree terms
are essential to cancel what differentiation of the higher-degree terms produces.

A SINE-FORCING TRIAL ALWAYS INCLUDES COSINE TOO — NEVER SINE ALONE: for $g(x)=\sin(bx)$: the
trial is $y_p=A\sin(bx)+B\cos(bx)$, even though $g$ has ONLY sine. Differentiating $A\sin(bx)$
produces $Ab\cos(bx)$ — a cosine term that needs its OWN $B$ coefficient to cancel upon
substitution. The pair $\{\sin(bx),\cos(bx)\}$ is closed under differentiation; omitting cosine
leaves an uncancellable term.

THE MODIFICATION RULE APPLIES WHENEVER THE TRIAL OVERLAPS THE HOMOGENEOUS SOLUTION — NEVER SKIPPED
WHEN IT DOES: for $y''-4y'+4y=e^{2x}$ (repeated root $r=2$, so $y_h=(C_1+C_2x)e^{2x}$): the naive
trial $Ae^{2x}$ overlaps $y_h$; even $Axe^{2x}$ still overlaps. Multiplying by $x^2$:
$y_p=Ax^2e^{2x}$ gives $y_p''-4y_p'+4y_p=2Ae^{2x}=e^{2x}\Rightarrow A=1/2$. Substituting an
un-modified trial that duplicates $y_h$ produces an INCONSISTENT system (e.g., $0=1$) — the signal
to multiply by $x$ (or $x^2$ if still overlapping), never to conclude "no solution."

## Mental Models
- **"The trial function must contain every term differentiation could produce from it — a full
  polynomial, or the sin/cos pair together, never a truncated guess."**
- **"An inconsistent coefficient system (0=nonzero) means the trial duplicates a homogeneous
  solution — the fix is multiplying by x, never giving up."**

## Why Students Fail

### MC-1: ONLY-MATCHING-THE-LEAD-TERM
- **Surface form**: for a degree-$n$ polynomial $g(x)$, uses only $Ax^n$ as $y_p$ instead of the
  full $A_nx^n+\cdots+A_0$.
- **Birth type**: Type 5, instruction-induced (Blueprint's own declared birth type — simple
  examples with constant $g$ work fine with a constant trial, and students extrapolate the
  pattern incorrectly to higher degrees).
- **Repair**: re-walk the $x^2$ example, showing all three coefficient equations require the full
  trial.

### MC-2: FORGETTING-MODIFICATION-RULE
- **Surface form**: uses the standard trial even when part of it is already in $y_h$, leading to
  an inconsistent system.
- **Birth type**: Type 5, instruction-induced (Blueprint's own declared birth type — the basic
  method is taught first for non-overlapping cases, and students report "no solution" rather than
  recognizing the modification signal).
- **Repair**: re-walk the $e^{2x}$ repeated-root example, showing the $x^2$ modification resolves
  the overlap.

### MC-3: SINE-ONLY-TRIAL-FOR-SINE-FORCING
- **Surface form**: for $g(x)=\sin(bx)$, uses $y_p=A\sin(bx)$ only, omitting the cosine term.
- **Birth type**: Type 1, overgeneralization (Blueprint's own declared birth type — "g has only
  sine" seems to logically imply "the trial should have only sine").
- **Repair**: re-derive why differentiating $A\sin(bx)$ produces a cosine term needing its own
  coefficient to cancel.

## Misconceptions

### MC-1: ONLY-MATCHING-THE-LEAD-TERM
- **Surface form**: as described above.
- **Root cause (Type 5)**: as described above.
- **Repair**: as described above.

### MC-2: FORGETTING-MODIFICATION-RULE
- **Surface form**: as described above.
- **Root cause (Type 5)**: as described above.
- **Repair**: as described above.

### MC-3: SINE-ONLY-TRIAL-FOR-SINE-FORCING
- **Surface form**: as described above.
- **Root cause (Type 1)**: as described above.
- **Repair**: as described above.

## Analogies
- **"The trial function is a net cast wide enough to catch everything differentiation could throw
  back — too narrow a net (missing terms) always lets something through uncancelled."**
- **Anti-analogy**: an inconsistent coefficient system is NOT a dead end — it's a diagnostic
  signal that the trial overlaps the homogeneous solution and needs the modification rule.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: the $y''-3y'+2y=x^2$ full-polynomial trial and coefficient
  matching.
- **Demonstration 2 (targets MC-2)**: the $y''-4y'+4y=e^{2x}$ modification-rule resolution via
  $x^2$.
- **Demonstration 3 (targets MC-3)**: the sine-forcing example requiring both $A\sin(bx)$ and
  $B\cos(bx)$.

## Discovery Questions
1. "For g(x) = x², is the trial yₚ = Ax² enough, or does it need lower-degree terms too?"
2. "If substituting your trial gives an inconsistent system (like 0=5), does that mean there's no
   solution, or does it signal something about yₕ?"
3. "If g(x) = sin(bx) only, should the trial include cos(bx) too?"

## Teaching Sequence
1. **Representation shift**: the trial function table and full-polynomial requirement, working
   Demonstration 1, isolating MC-1.
2. **Pattern induction**: the modification rule, working Demonstration 2, isolating MC-2.
3. **Contrast pair**: the sine/cosine pairing rule, working Demonstration 3, isolating MC-3.
4. **Mastery gate**: require a correct full-polynomial trial, a correct modification-rule
   application for a resonant forcing term, and a correct sine/cosine-paired trial, at the
   Blueprint's own stated MAMR of 5/5.

## Tutor Actions
- Never accept a polynomial trial missing any lower-degree term.
- Never accept an inconsistent coefficient system reported as "no solution" instead of triggering
  the modification rule.
- Never accept a sine-forcing trial that omits the cosine term.

## Voice Teaching Notes
- Say "does your trial include every degree, down to the constant?" whenever a polynomial forcing
  term is handled.
- When a coefficient system comes out inconsistent, ask "does your trial overlap the homogeneous
  solution?"

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly selects a trial function from the table for a given
  forcing term.
- **Rung 2 (application)**: learner correctly applies the modification rule when the trial
  overlaps $y_h$.
- **Rung 3 (transfer)**: learner correctly connects the trial-function method to the exponential
  response formula and explains why it fails for forcing terms like $\tan x$.

## Tutor Recovery Strategy
- If MC-1 recurs, re-walk the full-polynomial coefficient-matching example.
- If MC-2 recurs, re-walk the modification-rule resolution for a resonant forcing term.
- If MC-3 recurs, re-derive why cosine must accompany sine in the trial.

## Memory Hooks
- "Full polynomial trial, every degree — never just the lead term."
- "An inconsistent system means modify by x, not 'no solution.'"
- "Sine forcing always needs a cosine partner in the trial."

## Transfer Connections
- `math.de.second-order-linear` (already authored, this campaign, Batch 150): supplies the
  standard form and superposition structure $y=y_h+y_p$ this concept's method builds on.
- `math.de.char-equation` (already authored, this campaign, Batch 152): supplies the homogeneous
  solution $y_h$ this concept's modification rule checks trial overlap against.
- `math.de.variation-of-parameters` (companion batch concept): the KG's declared related concept,
  a more general technique for forcing terms this method's trial-function table cannot handle.

## Cross-Subject Connections
- None formal.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.de.undetermined-coefficients.md`, reused by
  reference for its trial-function table, its polynomial and modification-rule worked examples,
  its sine/cosine pairing rule, and its three-misconception library (birth types adopted directly
  as declared).
- Transfer probe: the Blueprint's own independence-mode probe, generalizing the trial-function
  pattern to the exponential response formula and the complex-exponential shortcut for sin/cos
  forcing.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires
  `math.de.second-order-linear`/`math.de.char-equation`, unlocks none, cross_links none,
  advanced/apply, mastery_threshold 0.85, estimated_hours 5) was directly verified against the
  live KG and matches exactly.

## Version History
- 2026-09-19 (Batch 153): authored. First entry this batch. Companion batch concept:
  `math.de.variation-of-parameters`.
