# math.de.solution-types

## Identity
- **KG id**: `math.de.solution-types`
- **Domain**: math.de
- **Requires**: `math.de.ode`
- **Unlocks**: none
- **Cross-links**: none
- **Difficulty**: advanced
- **Bloom level**: understand
- **Mastery threshold**: 0.85
- **Estimated hours**: 2

## Learning Objective
Recall (directly reusing `math.de.ode`'s own already-established content) that a general solution
of an $n$-th order ODE contains exactly $n$ arbitrary constants, fixed to a particular solution by
initial/boundary conditions; define a SINGULAR solution as a solution genuinely NOT obtainable
from the general solution for ANY choice of its constant(s), verified by direct substitution; and
explain WHY singular solutions arise — typically from a derivation step (e.g. separation of
variables) that implicitly assumes some quantity is nonzero, silently excluding the case where it
is zero.

## Core Understanding
SINGULAR SOLUTIONS ARE STRUCTURALLY EXCLUDED FROM THE GENERAL FAMILY, NEVER MERELY HARD TO FIND:
`math.de.ode`'s own general/particular distinction is fully recalled, not re-derived — an $n$-th
order ODE's general solution has exactly $n$ constants, fixed by $n$ conditions. A SINGULAR
solution is a genuinely different third category: a function satisfying the ODE that NO choice of
the general formula's constant(s) can produce. Solving $y'=3y^{2/3}$ by separation of variables
gives the general solution $y=(x+C)^3$; checking $y\equiv0$ directly in the ORIGINAL equation:
$y'=0$ and $3y^{2/3}=3(0)^{2/3}=0$ — both sides match, so $y\equiv0$ genuinely satisfies the ODE.
But $(x+C)^3=0$ only at the single point $x=-C$ for any $C$ — NEVER identically zero for all $x$
— so $y\equiv0$ is structurally excluded from the family, a true singular solution, not merely a
particular solution that's hard to locate.

SINGULAR SOLUTIONS TRACE BACK TO A SPECIFIC DIVISION STEP, NEVER A RANDOM PHENOMENON: the
separation step $y^{-2/3}dy=3\,dx$ REQUIRES dividing $\frac{dy}{dx}=3y^{2/3}$ by $y^{2/3}$ — valid
only when $y\ne0$. This is EXACTLY where $y\equiv0$ was silently excluded: the division implicitly
assumed $y\ne0$, so any solution with $y\equiv0$ can never appear in the resulting family, even
though it satisfies the ORIGINAL, undivided equation perfectly. Checking for singular solutions
means examining precisely the steps where such a nonzero assumption was made, then testing whether
the "forbidden" case yields a genuine solution.

VERIFICATION IS ALWAYS BY DIRECT SUBSTITUTION INTO THE ORIGINAL EQUATION: a candidate singular
solution must be confirmed by plugging it into the ORIGINAL (undivided) ODE directly — never
merely asserted as "the case that got excluded." $y\equiv0$'s validity as a solution to
$y'=3y^{2/3}$ rests entirely on the direct check $0=3(0)^{2/3}=0$, not on the fact that it was
excluded from the family.

## Mental Models
- **"A singular solution isn't a particular solution playing hide-and-seek with the wrong
  constant — it's genuinely locked out of the family's entire address space."**
- **"Every singular solution traces back to a specific division-by-a-possibly-zero-quantity step
  — go find that step, don't just accept the exclusion as mysterious."**

## Why Students Fail

### MC-1: GENERAL-SOLUTION-ASSUMED-EXHAUSTIVE
- **Surface form**: believes every solution to an ODE must be obtainable from the general
  solution formula for some choice of the constant(s).
- **Birth type**: Type 1, overgeneralization (Blueprint's own declared Foundational severity — the
  general/particular framework from `math.de.ode` covers every example seen so far, so it feels
  complete until a genuine counterexample is checked).
- **Repair**: re-walk the direct check that no value of $C$ makes $(x+C)^3$ identically zero,
  re-anchoring on structural exclusion, not mere difficulty.

### MC-2: SINGULAR-SOLUTION-VERIFICATION-SKIPPED
- **Surface form**: asserts a candidate function is a singular solution without directly
  verifying it satisfies the original ODE by substitution.
- **Birth type**: Type 5, instruction-induced (Blueprint's own declared Foundational severity —
  singular solutions are often presented as a known fact to memorize, skipping the verification
  step).
- **Repair**: re-walk the explicit substitution check into the original, undivided equation.

### MC-3: DIVISION-STEP-CAUSING-SINGULAR-SOLUTION-NOT-IDENTIFIED
- **Surface form**: cannot trace a singular solution back to the specific derivation step
  (typically division by a possibly-zero quantity) that excluded it.
- **Birth type**: Type 5, instruction-induced (Blueprint's own declared Moderate severity — the
  singular solution's existence is accepted without connecting it to its specific structural
  cause).
- **Repair**: re-walk the precise identification of the division step and its implicit nonzero
  assumption.

## Misconceptions

### MC-1: GENERAL-SOLUTION-ASSUMED-EXHAUSTIVE
- **Surface form**: as described above.
- **Root cause (Type 1)**: as described above.
- **Repair**: as described above.

### MC-2: SINGULAR-SOLUTION-VERIFICATION-SKIPPED
- **Surface form**: as described above.
- **Root cause (Type 5)**: as described above.
- **Repair**: as described above.

### MC-3: DIVISION-STEP-CAUSING-SINGULAR-SOLUTION-NOT-IDENTIFIED
- **Surface form**: as described above.
- **Root cause (Type 5)**: as described above.
- **Repair**: as described above.

## Analogies
- **"The general solution is a specific apartment building's address scheme — a singular
  solution is a house genuinely outside that building's numbering, however you dial the
  constant."**
- **Anti-analogy**: a singular solution is NOT simply a particular solution with a tricky or
  unusual constant value — no constant reaches it at all.

## Demonstrations
- **Demonstration 1 (targets MC-1, recall)**: $y'=3x^2$'s general solution $y=x^3+C$; applying
  $y(0)=5$ gives the particular solution $y=x^3+5$ — the already-familiar machinery, recalled
  briefly.
- **Demonstration 2 (targets MC-1 and MC-2)**: for $y'=3y^{2/3}$, general solution $y=(x+C)^3$;
  direct substitution confirms $y\equiv0$ satisfies the original equation ($0=3\cdot0=0$), yet no
  $C$ makes $(x+C)^3\equiv0$ — a genuine singular solution.
- **Demonstration 3 (targets MC-3)**: the separation step $y^{-2/3}dy=3\,dx$ requires $y\ne0$ —
  exactly the assumption that silently excludes $y\equiv0$ from the resulting family, even though
  it satisfies the original, undivided equation.

## Discovery Questions
1. "Must every solution to an ODE be obtainable from the general solution formula for some
   choice of the constant?"
2. "If you claim a function is a singular solution, have you actually substituted it into the
   original equation to confirm it works?"
3. "Can you point to the specific step in a separation-of-variables solution where a possibly-
   zero quantity was divided out?"

## Teaching Sequence
1. **Anchor/recall**: briefly work Demonstration 1's already-familiar general/particular
   computation, explicitly stating this is recall, not new content.
2. **Conflict evidence**: Demonstration 2's direct singular-solution verification, isolating MC-1
   and MC-2 by requiring both the exclusion-from-family check and the original-equation
   substitution.
3. **Representation shift**: Demonstration 3's precise division-step identification, isolating
   MC-3 by requiring the specific implicit assumption be located.
4. **Mastery gate**: require a correctly recalled general/particular pair, a correctly verified
   singular solution by direct substitution, and a correctly identified division step causing its
   exclusion, at the Blueprint's own stated MAMR of 5/5 (⌈0.85×5⌉).

## Tutor Actions
- Never accept a claimed singular solution without a direct substitution check into the original
  equation.
- Never accept "the general solution formula gets everything" without testing a genuine
  counterexample.

## Voice Teaching Notes
- Say "does the general formula reach that solution for ANY constant, or is it genuinely locked
  out?" whenever a singular-solution claim is discussed.
- When a singular solution is identified, ask "which specific step in the derivation excluded
  it?"

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly recalls the general/particular solution
  relationship for a new ODE.
- **Rung 2 (application)**: learner correctly verifies a candidate singular solution by direct
  substitution into the original equation.
- **Rung 3 (transfer)**: learner correctly identifies the specific division step causing a
  singular solution's exclusion for a NEW separable ODE, and explains the physical meaning of the
  singular solution in an applied context.

## Tutor Recovery Strategy
- If MC-1 recurs, re-walk the direct check that no constant reaches the singular solution.
- If MC-2 recurs, re-walk the explicit substitution into the original equation.
- If MC-3 recurs, re-walk the precise identification of the division step.

## Memory Hooks
- "A singular solution satisfies the ODE but no constant in the general formula ever reaches it."
- "Always verify by substituting into the ORIGINAL equation, never just by exclusion."
- "Trace every singular solution back to a specific division-by-possibly-zero step."

## Transfer Connections
- `math.de.ode` (already authored, this campaign, Batch 99): supplies the general/particular
  solution distinction this concept briefly recalls before introducing singular solutions as a
  third category.

## Cross-Subject Connections
- None formal.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.de.solution-types.md`, reused by reference
  for its $y'=3y^{2/3}$ canonical singular-solution example, its precise division-step
  identification, and its three-misconception registry (severity levels adopted directly as
  declared; birth types independently classified since this Blueprint states Description but not
  a formal Type label).
- Transfer probe cited by reference: the Blueprint's own independence-mode probe, examining a
  chemical-reaction decay ODE $dC/dt=-kC^{1/2}$, its general solution, the singular solution
  $C(t)\equiv0$, the specific excluding division step, and its physical meaning (a fully-reacted
  system staying at zero forever).

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires `math.de.ode`, unlocks
  none, cross_links none, advanced/understand, mastery_threshold 0.85, estimated_hours 2) was
  directly verified against the live KG and matches exactly.

## Version History
- 2026-09-18 (Batch 101): authored. Second entry this batch. Companion batch concept:
  `math.de.ode-linearity`. `math.de` moves 2/56 → **4/56** this batch (both concepts authored).
