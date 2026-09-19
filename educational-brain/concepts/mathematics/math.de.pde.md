# math.de.pde

## Identity
- **KG id**: `math.de.pde`
- **Domain**: math.de
- **Requires**: `math.de.ode`, `math.calc.partial-derivatives`
- **Unlocks**: none
- **Cross-links**: none
- **Difficulty**: expert
- **Bloom level**: understand
- **Mastery threshold**: 0.8
- **Estimated hours**: 8

## Learning Objective
Define a PDE as an equation involving an unknown function of TWO OR MORE independent variables and
its PARTIAL derivatives (directly extending an ODE's single-variable framework, never confused
with a SYSTEM of several ODEs); apply the discriminant $B^2-4AC$ to classify linear second-order
PDEs as elliptic, parabolic, or hyperbolic (orientation level, correctly identifying $A,B,C$ even
when the equation isn't in canonical form); and recognize each classification corresponds to a
GENUINELY DIFFERENT physical behavior — never a purely formal algebraic label.

## Core Understanding
A PDE HAS ONE UNKNOWN FUNCTION OF MULTIPLE VARIABLES — NEVER CONFUSED WITH A SYSTEM OF SEVERAL
ODEs: the heat equation $u_t=u_{xx}$ describes temperature $u(x,t)$ depending on BOTH position
and time — ONE unknown function, TWO independent variables, requiring PARTIAL derivatives
(holding the other variable fixed). Contrast a coupled ODE system like $y_1'=y_2,y_2'=-y_1$: TWO
unknown functions, each of ONE variable $t$, using ORDINARY derivatives — a structurally
DIFFERENT object, even though both involve "more than one derivative relationship."

THE DISCRIMINANT $B^2-4AC$ CLASSIFIES A LINEAR SECOND-ORDER PDE — REQUIRING CAREFUL
IDENTIFICATION OF $A,B,C$, NEVER ASSUMED FROM THE EQUATION'S SUPERFICIAL APPEARANCE: for
Laplace's equation $u_{xx}+u_{yy}=0$: $A=1,B=0,C=1$, discriminant $=-4<0$ — ELLIPTIC. For the heat
equation $u_{xx}-u_t=0$: $A=1,B=0,C=0$ (no $u_{tt}$ term at all), discriminant $=0$ — PARABOLIC.
For the wave equation $u_{tt}-u_{xx}=0$: $A=-1$ (coefficient of $u_{xx}$), $B=0$, $C=1$
(coefficient of $u_{tt}$), discriminant $=4>0$ — HYPERBOLIC. Matching a given equation's terms to
$A,B,C$ carefully, term by term, is required whenever the equation isn't already in the exact
canonical $Au_{xx}+Bu_{xy}+Cu_{yy}$ form.

CLASSIFICATION CORRESPONDS TO GENUINELY DIFFERENT PHYSICAL BEHAVIOR — NEVER A PURELY FORMAL LABEL:
the heat equation (parabolic) models a rod with a sharp initial temperature spike SMOOTHING OUT
over time into a bell-curve profile with no sharp features remaining. The wave equation
(hyperbolic) models a plucked guitar string's sharp initial kink PERSISTING and traveling at a
fixed speed, rather than smoothing away. Two second-order PDEs, one erasing sharp features and one
preserving and propagating them — a direct STRUCTURAL consequence of their classification, never a
coincidence of the specific equations chosen. Elliptic equations (Laplace's) describe
EQUILIBRIUM/steady-state phenomena with no time variable at all.

## Mental Models
- **"A PDE is one function with several inputs, needing partial derivatives — never several
  functions each with one input."**
- **"The discriminant B²−4AC for a PDE works exactly like the discriminant for a conic section —
  same test, same three-way split."**

## Why Students Fail

### MC-1: PDE-CLASSIFICATION-TREATED-AS-PURELY-FORMAL
- **Surface form**: believes the elliptic/parabolic/hyperbolic classification is just an
  algebraic label with no connection to actual solution behavior.
- **Birth type**: Foundational severity (Blueprint's own declared severity — a discriminant test
  feels like a pattern-matching exercise disconnected from physical meaning).
- **Repair**: re-walk the heat-equation-smoothing versus wave-equation-propagating contrast as
  concrete evidence.

### MC-2: PDE-CONFUSED-WITH-MULTIVARIABLE-ODE-SYSTEM
- **Surface form**: confuses a single PDE with a system of several ODEs.
- **Birth type**: Foundational severity (Blueprint's own declared severity — both structures
  involve "more than one derivative relationship," inviting conflation).
- **Repair**: re-anchor on the structural distinction — one function of multiple inputs (PDE)
  versus multiple functions each of one input (ODE system).

### MC-3: DISCRIMINANT-COEFFICIENTS-MISIDENTIFIED
- **Surface form**: misidentifies which terms correspond to $A,B,C$ in the discriminant formula,
  especially when the equation isn't already in canonical form.
- **Birth type**: Moderate severity (Blueprint's own declared severity — equations like the wave
  equation don't visually resemble the canonical $Au_{xx}+Bu_{xy}+Cu_{yy}$ template).
- **Repair**: re-walk the explicit term-by-term identification for the wave equation.

## Misconceptions

### MC-1: PDE-CLASSIFICATION-TREATED-AS-PURELY-FORMAL
- **Surface form**: as described above.
- **Root cause (Foundational)**: as described above.
- **Repair**: as described above.

### MC-2: PDE-CONFUSED-WITH-MULTIVARIABLE-ODE-SYSTEM
- **Surface form**: as described above.
- **Root cause (Foundational)**: as described above.
- **Repair**: as described above.

### MC-3: DISCRIMINANT-COEFFICIENTS-MISIDENTIFIED
- **Surface form**: as described above.
- **Root cause (Moderate)**: as described above.
- **Repair**: as described above.

## Analogies
- **"Elliptic, parabolic, hyperbolic PDEs are like the three conic sections wearing physics
  costumes — equilibrium, diffusion, and propagation, the same discriminant test picking out
  which."**
- **Anti-analogy**: a PDE is NOT just "an ODE with extra variables tacked on" in a loose sense —
  it genuinely requires the partial-derivative framework, and confusing it with a coupled ODE
  system misses its actual structure.

## Demonstrations
- **Demonstration 1 (targets MC-2)**: the heat-equation-versus-coupled-ODE-system structural
  contrast.
- **Demonstration 2 (targets MC-3)**: the three-canonical-equation discriminant classification.
- **Demonstration 3 (targets MC-1)**: the heat-equation-smoothing versus wave-equation-propagating
  physical contrast.

## Discovery Questions
1. "Is the elliptic/parabolic/hyperbolic classification just an algebraic label, or does it
   connect to how solutions actually behave?"
2. "Is the heat equation ut=uxx a single PDE, or a system of several ODEs?"
3. "For the wave equation utt−uxx=0, what are A, B, and C in the discriminant formula?"

## Teaching Sequence
1. **Representation shift**: PDE as an extension of ODE to multiple variables, working
   Demonstration 1, isolating MC-2.
2. **Representation shift (continued)**: the discriminant classification, working
   Demonstration 2, isolating MC-3.
3. **Contrast pair**: the physical-behavior correspondence, working Demonstration 3, isolating
   MC-1.
4. **Mastery gate**: require a correct PDE-versus-ODE-system distinction, a correct discriminant
   classification for a non-canonical equation, and a correct physical-behavior match for three
   named scenarios, at the Blueprint's own stated MAMR of 4/5.

## Tutor Actions
- Never accept the PDE classification described as a purely formal label unconnected to solution
  behavior.
- Never accept a PDE confused with a coupled system of ODEs.
- Never accept discriminant coefficients identified without careful term-by-term matching to the
  canonical form.

## Voice Teaching Notes
- Say "is this one function of several variables, or several functions of one variable each?"
  whenever a PDE is introduced.
- When classifying a PDE, ask "have you matched the terms to A, B, C carefully, or assumed the
  form?"

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly distinguishes a PDE from an ODE system.
- **Rung 2 (application)**: learner correctly classifies a linear second-order PDE via the
  discriminant, including a non-canonical form.
- **Rung 3 (transfer)**: learner correctly matches three physical scenarios (steady-state
  potential, diffusion, wave propagation) to their PDE classifications and justifies each match.

## Tutor Recovery Strategy
- If MC-1 recurs, re-walk the smoothing-versus-propagating physical contrast.
- If MC-2 recurs, re-anchor on the structural PDE-versus-ODE-system distinction.
- If MC-3 recurs, re-walk the term-by-term coefficient identification for the wave equation.

## Memory Hooks
- "One function, many variables, partial derivatives — that's a PDE, never a system of ODEs."
- "The discriminant B²−4AC works just like it does for conics — elliptic, parabolic, hyperbolic."
- "Classification predicts real behavior — parabolic smooths, hyperbolic propagates, elliptic has
  no time at all."

## Transfer Connections
- `math.de.ode` (already authored, certified domain): supplies the equation-relating-a-function-
  to-its-derivatives framework this concept extends to multiple variables.
- `math.calc.partial-derivatives` (already authored, certified domain): supplies the partial-
  derivative notation and holding-other-variables-fixed convention this concept's equations are
  built from.

## Cross-Subject Connections
- Physics/engineering: heat conduction, wave propagation, electrostatics (Laplace's equation).

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.de.pde.md`, reused by reference for its
  PDE-versus-ODE contrast, its three-canonical-equation discriminant classification, its
  smoothing-versus-propagating physical contrast, and its three-misconception registry (severity
  levels adopted directly as declared). Orientation-level treatment maintained per the Blueprint's
  own cited corpus precedent (large-scope research/expert-tier concepts).
- Transfer probe: the Blueprint's own independence-mode probe, matching three physical processes
  (steady-state potential, groundwater diffusion, beam vibration) to their PDE classifications.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires `math.de.ode`/
  `math.calc.partial-derivatives`, unlocks none, cross_links none, expert/understand,
  mastery_threshold 0.8, estimated_hours 8) was directly verified against the live KG and matches
  exactly.

## Version History
- 2026-09-19 (Batch 161): authored. Second entry this batch. Companion batch concept:
  `math.de.sturm-liouville`.
