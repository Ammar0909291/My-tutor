# math.de.poisson-equation

## Identity
- **KG id**: `math.de.poisson-equation`
- **Domain**: math.de
- **Requires**: `math.de.laplace-equation`
- **Unlocks**: none
- **Cross-links**: `math.de.greens-function` (not yet authored, independence mode)
- **Difficulty**: expert
- **Bloom level**: apply
- **Mastery threshold**: 0.75
- **Estimated hours**: 5

## Learning Objective
State $\nabla^2u=f$ as the NONHOMOGENEOUS generalization of Laplace's Equation (the special case
$f\equiv0$), recognizing Laplace's special properties (mean value, maximum principle) do NOT
automatically extend to the nonhomogeneous case; apply the equation to electrostatics
$\nabla^2V=-\rho/\varepsilon_0$, correctly identifying $f=0$ as a charge-free region (never treating
Poisson and Laplace as unrelated theories); and recognize Green's functions as the
point-source-then-superpose STRATEGY for solving Poisson's Equation (never a mere notational
convenience).

## Core Understanding
LAPLACE'S SPECIAL PROPERTIES DO NOT AUTOMATICALLY EXTEND TO POISSON'S EQUATION — NEVER ASSUMED TO
CARRY OVER UNCHANGED: for $u=x^2$: $\nabla^2u=u_{xx}+u_{yy}=2+0=2$ — a Poisson solution with source
$f=2$. Checking the mean value property at the origin: $u(r\cos\theta,r\sin\theta)=r^2\cos^2\theta$,
averaging to $\frac{r^2}2$ over $\theta\in[0,2\pi]$ — but $u(0,0)=0$. Since $\frac{r^2}2\ne0$ for
$r>0$, the mean value property GENUINELY FAILS for this Poisson solution — directly demonstrating
that the mean value property and maximum principle are SPECIAL consequences of the homogeneous
$f\equiv0$ case, never automatically inherited whenever $\nabla^2u$ merely gets computed for some
function.

POISSON'S EQUATION CONTAINS LAPLACE'S EQUATION AS ITS SPECIAL CASE $f\equiv0$ — NEVER A SEPARATE,
UNRELATED THEORY: the electrostatic potential satisfies $\nabla^2V=-\rho/\varepsilon_0$. In a
charge-FREE region ($\rho=0$), this reduces EXACTLY to Laplace's Equation $\nabla^2V=0$ — meaning
`math.de.laplace-equation`'s ENTIRE machinery (separation of variables, mean value property,
maximum principle) applies validly there. But wherever charge genuinely exists ($\rho\ne0$), the
FULL nonhomogeneous equation must be solved, and NONE of Laplace's special properties can be
assumed to hold at those points without separate justification — Laplace's Equation is not a
different topic, it's Poisson's Equation with its source term set to zero.

GREEN'S FUNCTIONS REPRESENT A GENUINE POINT-SOURCE-THEN-SUPERPOSE STRATEGY — NEVER MERE NOTATION:
solving $\nabla^2u=f$ for an ARBITRARY source distribution proceeds by first solving the SIMPLER
problem $\nabla^2G=\delta$ (the response to a single idealized point source), then building the
full solution by SUPERPOSING (integrating) copies of $G$, each shifted to a different point and
weighted by $f$'s actual value there. This is a genuinely distinct SOLUTION STRATEGY — contrast
`math.de.laplace-equation`'s separation-of-variables approach, which directly solves the full
boundary-value problem at once, rather than building it up from point-source responses.

## Mental Models
- **"Poisson's Equation is Laplace's Equation with a source term added — and that one extra term
  is exactly what breaks the special properties that made Laplace's Equation so structured."**
- **"Laplace's Equation isn't a different topic — it's Poisson's Equation with the source set to
  zero."**
- **"Green's functions solve the simplest version once (a single point source), then build the
  general answer by superposition — a genuinely different strategy from solving the whole problem
  at once."**

## Why Students Fail

### MC-1: LAPLACE-PROPERTIES-ASSUMED-TO-EXTEND
- **Surface form**: believes Laplace's special properties (mean value property, maximum principle)
  automatically extend unchanged to Poisson's Equation.
- **Birth type**: Foundational severity (Blueprint's own declared severity — the equations look
  almost identical, inviting the assumption that their special structural properties transfer too).
- **Repair**: re-walk the direct numerical counterexample showing the mean value property fails for
  $u=x^2$.

### MC-2: POISSON-AND-LAPLACE-ASSUMED-UNRELATED
- **Surface form**: believes Poisson's Equation and Laplace's Equation require entirely separate,
  unrelated theory.
- **Birth type**: High severity (Blueprint's own declared severity — the two are often taught as
  distinct named equations without stressing the direct special-case relationship).
- **Repair**: re-walk the electrostatics charge-free reduction, confirming Laplace's Equation as
  the exact special case $f\equiv0$.

### MC-3: GREENS-FUNCTIONS-ASSUMED-MERELY-NOTATIONAL
- **Surface form**: believes Green's functions are just a convenient notation for writing the
  answer, missing the specific point-source-then-superpose strategy they represent.
- **Birth type**: Moderate severity (Blueprint's own declared severity — the formal integral
  notation can look like a shorthand rather than revealing the underlying "simplest case first,
  then combine" solution strategy).
- **Repair**: re-walk the point-source-then-superpose framing explicitly.

## Misconceptions

### MC-1: LAPLACE-PROPERTIES-ASSUMED-TO-EXTEND
- **Surface form**: as described above.
- **Root cause (Foundational)**: as described above.
- **Repair**: as described above.

### MC-2: POISSON-AND-LAPLACE-ASSUMED-UNRELATED
- **Surface form**: as described above.
- **Root cause (High)**: as described above.
- **Repair**: as described above.

### MC-3: GREENS-FUNCTIONS-ASSUMED-MERELY-NOTATIONAL
- **Surface form**: as described above.
- **Root cause (Moderate)**: as described above.
- **Repair**: as described above.

## Analogies
- **"Poisson's Equation is Laplace's Equation with a heat source switched on — the special
  no-source structure genuinely breaks the moment that source is present."**
- **Anti-analogy**: Green's functions are NOT just a compact way to write an answer you could get
  some other way — they represent building the general solution from many single-point-source
  responses, a fundamentally different construction than direct separation of variables.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: the direct $u=x^2$ mean-value-property failure computation.
- **Demonstration 2 (targets MC-2)**: the electrostatic-potential charge-free reduction to
  Laplace's Equation.
- **Demonstration 3 (targets MC-3)**: the point-source-then-superpose strategy framing, contrasted
  with separation of variables.

## Discovery Questions
1. "Does the mean value property (or the maximum principle) automatically hold for any function
   satisfying Poisson's Equation, the same way it holds for harmonic functions?"
2. "Are Poisson's Equation and Laplace's Equation essentially unrelated equations requiring
   completely separate theory?"
3. "Are Green's functions just a convenient way to write down the answer to Poisson's Equation,
   rather than representing a distinct solution strategy?"

## Teaching Sequence
1. **Representation shift**: the mean-value-property failure demonstration, working
   Demonstration 1, isolating MC-1.
2. **Conflict evidence**: the electrostatics charge-free reduction, working Demonstration 2,
   isolating MC-2.
3. **Contrast pair**: the Green's-function point-source-then-superpose strategy, working
   Demonstration 3, isolating MC-3.
4. **Mastery gate**: require a correct identification of Poisson's Equation as Laplace's
   nonhomogeneous generalization, a correct physical-modeling application distinguishing $f=0$ from
   $f\ne0$ regions, and a correct explanation of the Green's-function strategy, at the Blueprint's
   own stated MAMR of 4/5.

## Tutor Actions
- Never accept the mean value property or maximum principle assumed to hold for a Poisson-equation
  solution without separate justification.
- Never accept Poisson's Equation and Laplace's Equation described as requiring entirely separate
  theory.
- Never accept Green's functions described as merely a notational shortcut rather than a distinct
  solution strategy.

## Voice Teaching Notes
- Say "does this property genuinely hold here, or is it special to the homogeneous case?" whenever
  a Laplace-equation property is invoked for a Poisson-equation solution.
- Ask "what does this equation reduce to when the source term is zero?" whenever Poisson's Equation
  is introduced in a new physical context.

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly states Poisson's Equation as Laplace's Equation's
  nonhomogeneous generalization.
- **Rung 2 (application)**: learner correctly identifies the charge-free reduction in an
  electrostatics (or analogous gravitational) context and checks whether the mean value property
  holds for a given function.
- **Rung 3 (transfer)**: learner correctly explains the Green's-function point-source-then-
  superpose strategy in a new physical context (e.g. Newtonian gravity).

## Tutor Recovery Strategy
- If MC-1 recurs, re-walk the direct mean-value-property failure computation.
- If MC-2 recurs, re-walk the electrostatics charge-free reduction.
- If MC-3 recurs, re-walk the point-source-then-superpose framing.

## Memory Hooks
- "Laplace's special properties are special — they genuinely fail once a source term is present."
- "Laplace's Equation is Poisson's Equation with the source set to zero, not a separate topic."
- "Green's functions solve the single-point-source case first, then superpose — that's the whole
  strategy."

## Transfer Connections
- `math.de.laplace-equation` (already authored, this campaign, Batch 167): supplies the
  homogeneous equation, its equilibrium framing, and the mean value property/maximum principle this
  concept directly contrasts against.
- `math.de.harmonic-functions` (authored earlier this same batch): supplies the full derivation of
  the mean value property and maximum principle this concept demonstrates as failing in the
  nonhomogeneous case.
- `math.de.greens-function` (not yet authored): the KG's declared cross-link, the dedicated
  technique this concept previews at orientation level.

## Cross-Subject Connections
- Physics: electrostatics (Poisson's equation for potential), Newtonian gravity (gravitational
  potential from mass density).

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.de.poisson-equation.md`, reused by reference
  for its $u=x^2$ mean-value-property counterexample, its electrostatics charge-free-region
  reduction, its Green's-function point-source-then-superpose preview, and its three-misconception
  registry (severity levels adopted directly as declared).
- Transfer probe: the Blueprint's own independence-mode probe, applying the same reasoning to the
  Newtonian gravitational potential equation $\nabla^2\Phi=4\pi G\rho$.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires
  `math.de.laplace-equation`, unlocks none, cross_links `math.de.greens-function`, expert/apply,
  mastery_threshold 0.75, estimated_hours 5) was directly verified against the live KG and matches
  exactly. `math.de.greens-function`'s authorship was independently re-verified directly against
  the EDUCATIONAL-BRAIN corpus and confirmed still unauthored — the Blueprint's independence-mode
  deferral remains correct. This entry, together with `math.de.harmonic-functions` authored earlier
  this same batch, closes `math.de`'s entire currently-reachable frontier for this campaign.

## Version History
- 2026-09-19 (Batch 168): authored. Second entry this batch, closing `math.de`'s currently-
  reachable frontier. Companion batch concept: `math.de.harmonic-functions`.
