# math.de.bvp

## Identity
- **KG id**: `math.de.bvp`
- **Domain**: math.de
- **Requires**: `math.de.second-order-ode`
- **Unlocks**: `math.de.sturm-liouville`
- **Cross-links**: none
- **Difficulty**: expert
- **Bloom level**: apply
- **Mastery threshold**: 0.8
- **Estimated hours**: 5

## Learning Objective
Define a Boundary Value Problem (BVP) as an ODE with conditions at TWO OR MORE distinct points
(never a single point, unlike an IVP); recognize existence and uniqueness are NEVER guaranteed —
a BVP may have NO solution, a UNIQUE solution, or INFINITELY MANY solutions; and solve a BVP by
finding the general solution FIRST, then applying BOTH boundary conditions SIMULTANEOUSLY as a
system (never sequentially, one condition at a time).

## Core Understanding
THE SAME ODE CAN LAND IN ANY OF THREE OUTCOMES — NEVER GUARANTEED A UNIQUE SOLUTION LIKE AN IVP:
for $y''+y=0$ (general solution $y=c_1\cos x+c_2\sin x$) with THREE different boundary-condition
pairs: $y(0)=0,y(\pi/2)=1$ gives $c_1=0,c_2=1$ — a UNIQUE solution $y=\sin x$. Changing only the
second condition to $y(\pi)=1$: $c_1=0$ forces $-c_1=1\Rightarrow0=1$ — a CONTRADICTION, NO
solution exists. Changing it instead to $y(\pi)=0$: $-c_1=0$ is automatically satisfied (since
$c_1=0$ already), leaving $c_2$ COMPLETELY FREE — INFINITELY MANY solutions $y=c_2\sin x$. The
IDENTICAL ODE produces all three outcomes depending purely on where and what the boundary values
are.

BOTH BOUNDARY CONDITIONS MUST BE APPLIED AS A GENUINE SIMULTANEOUS SYSTEM — NEVER SEQUENTIALLY:
substituting both conditions into the general solution produces a 2×2 linear system in
$c_1,c_2$ — solving for one constant using only the first condition, then treating the second as
an afterthought, risks missing either a genuine inconsistency (Example 2's contradiction) or a
free parameter (Example 3's unconstrained $c_2$). The system must be set up and analyzed as a
WHOLE.

AN AUTOMATICALLY-SATISFIED CONDITION SIGNALS INFINITELY MANY SOLUTIONS — NEVER A COMPUTATIONAL
ERROR: when substituting the second boundary condition produces an identity ($0=0$) rather than a
genuine constraint on the remaining constant, this is the CORRECT signature of the
infinitely-many-solutions case, not a sign that something went wrong in the algebra.

## Mental Models
- **"A BVP's conditions live at two or more separate points — never bundled at one, like an
  IVP's."**
- **"The same ODE, different boundary conditions, can land anywhere on a spectrum from no
  solution to infinitely many — never assume a BVP behaves like an IVP's guaranteed uniqueness."**

## Why Students Fail

### MC-1: BVP-ASSUMED-TO-ALWAYS-HAVE-UNIQUE-SOLUTION
- **Surface form**: believes a BVP, like an IVP, always has a unique solution once correctly set
  up and solved.
- **Birth type**: Foundational severity (Blueprint's own declared severity — prior experience with
  IVPs, which essentially always have unique solutions under mild conditions, creates a strong but
  incorrect carryover expectation).
- **Repair**: re-walk the identical-ODE, different-boundary-condition contrast across all three
  outcomes.

### MC-2: BOTH-BOUNDARY-CONDITIONS-NOT-APPLIED-SIMULTANEOUSLY
- **Surface form**: solves for one constant using the first boundary condition alone, without
  correctly incorporating the second into a genuine system.
- **Birth type**: Moderate severity (Blueprint's own declared severity — the sequential-application
  habit from other contexts carries over without checking).
- **Repair**: re-derive by explicitly setting up both conditions as a 2-equation system before
  solving for either constant.

### MC-3: INFINITELY-MANY-SOLUTIONS-CASE-MISTAKEN-FOR-AN-ERROR
- **Surface form**: when a boundary condition is found to be automatically satisfied, treats this
  as a computational mistake rather than the genuine infinitely-many-solutions case.
- **Birth type**: Moderate severity (Blueprint's own declared severity — an equation that
  simplifies to "0=0" feels like a sign of a dropped term or algebra error).
- **Repair**: re-anchor on an automatically-true condition, leaving a constant fully free, as the
  genuine signature of infinitely many solutions.

## Misconceptions

### MC-1: BVP-ASSUMED-TO-ALWAYS-HAVE-UNIQUE-SOLUTION
- **Surface form**: as described above.
- **Root cause (Foundational)**: as described above.
- **Repair**: as described above.

### MC-2: BOTH-BOUNDARY-CONDITIONS-NOT-APPLIED-SIMULTANEOUSLY
- **Surface form**: as described above.
- **Root cause (Moderate)**: as described above.
- **Repair**: as described above.

### MC-3: INFINITELY-MANY-SOLUTIONS-CASE-MISTAKEN-FOR-AN-ERROR
- **Surface form**: as described above.
- **Root cause (Moderate)**: as described above.
- **Repair**: as described above.

## Analogies
- **"A BVP is like specifying a beam's height at both supported ends, rather than its starting
  height and slope at one end — pin both ends and you might overconstrain (no solution), exactly
  constrain (unique), or underconstrain (infinitely many) the shape."**
- **Anti-analogy**: solving for constants one boundary condition at a time is NOT a shortcut — it
  risks missing exactly the contradiction or free parameter that defines the BVP's true outcome.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: the three-outcome contrast on the identical ODE $y''+y=0$
  with varying boundary conditions.
- **Demonstration 2 (targets MC-2)**: the 2×2 linear-system framing of both conditions applied
  simultaneously.
- **Demonstration 3 (targets MC-3)**: the automatically-satisfied second condition in the
  infinitely-many-solutions case.

## Discovery Questions
1. "Does a BVP for a nice second-order linear ODE always have a solution once you correctly solve
   for the constants?"
2. "When solving a BVP, should you solve for one constant using the first condition alone, or set
   up both conditions as a system first?"
3. "If substituting a boundary condition gives an automatically-true equation, does that mean an
   error occurred, or something else?"

## Teaching Sequence
1. **Representation shift**: BVP versus IVP, and the general-solution-plus-both-conditions
   procedure, working Demonstration 1's first case.
2. **Contrast pair**: the three genuinely different outcomes on the identical ODE, working all of
   Demonstration 1, isolating MC-1.
3. **Contrast pair (continued)**: the linear-system framing and the automatically-satisfied
   condition, working Demonstrations 2 and 3, isolating MC-2 and MC-3.
4. **Mastery gate**: require a correct classification of a new BVP into one of the three outcomes,
   a correct simultaneous-system setup for both conditions, and a correct recognition of the
   infinitely-many-solutions signature, at the Blueprint's own stated MAMR of 4/5.

## Tutor Actions
- Never accept a BVP assumed to have a unique solution without actually solving the boundary-
  condition system.
- Never accept boundary conditions applied sequentially rather than as a genuine simultaneous
  system.
- Never accept an automatically-satisfied boundary condition treated as a computational error.

## Voice Teaching Notes
- Say "is this guaranteed to have a unique solution, or do we need to check?" whenever a BVP is
  introduced.
- When boundary conditions are substituted, ask "are you solving both together, or one at a
  time?"

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly distinguishes a BVP from an IVP by the placement of
  its conditions.
- **Rung 2 (application)**: learner correctly solves a BVP's boundary-condition system and
  classifies the outcome into one of the three cases.
- **Rung 3 (transfer)**: learner correctly interprets a structural-engineering BVP's "no solution"
  or "infinitely many solutions" outcome in physical terms.

## Tutor Recovery Strategy
- If MC-1 recurs, re-walk the three-outcome contrast on the identical ODE.
- If MC-2 recurs, re-derive the simultaneous 2-equation system.
- If MC-3 recurs, re-anchor on the automatically-satisfied-condition signature.

## Memory Hooks
- "A BVP might have no solution, a unique one, or infinitely many — never assume it's like an
  IVP."
- "Set up both boundary conditions as one system — never solve them one at a time."
- "An automatically-true condition means infinitely many solutions, not an error."

## Transfer Connections
- `math.de.second-order-ode` (already authored, certified domain): supplies the general
  second-order ODE and solution methods this concept applies with two-point conditions instead of
  IVP-style single-point conditions.
- `math.de.ivp` (already authored, this campaign, Batch 146, KG's declared related concept): the
  single-point-condition counterpart this concept's outcomes contrast against.
- `math.de.sturm-liouville` (not yet authored): the KG's declared unlock, a richly-structured
  family of BVPs building directly on this concept's three-case framework.

## Cross-Subject Connections
- Structural engineering: beam deflection with fixed end-supports.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.de.bvp.md`, reused by reference for its
  three-outcome worked examples on the identical ODE $y''+y=0$, and its three-misconception
  registry (severity levels adopted directly as declared).
- Transfer probe: the Blueprint's own independence-mode probe, interpreting a structural beam's
  BVP outcomes (no solution, infinitely many solutions) in physical terms.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires
  `math.de.second-order-ode`, unlocks `math.de.sturm-liouville`, cross_links none, expert/apply,
  mastery_threshold 0.8, estimated_hours 5) was directly verified against the live KG and matches
  exactly.

## Version History
- 2026-09-19 (Batch 160): authored. Second entry this batch. Companion batch concept:
  `math.de.legendre-equation`.
