# math.de.pde-classification

## Identity
- **KG id**: `math.de.pde-classification`
- **Domain**: math.de
- **Requires**: `math.de.pde`
- **Unlocks**: none
- **Cross-links**: none
- **Difficulty**: expert
- **Bloom level**: understand
- **Mastery threshold**: 0.8
- **Estimated hours**: 4

## Learning Objective
Classify second-order linear PDEs via $\Delta=B^2-4AC$ where $A,B,C$ are SPECIFICALLY the
coefficients of $u_{xx},u_{xy},u_{yy}$ (never lower-order terms or unrelated polynomials);
recognize the classification is LOCAL for variable coefficients (can CHANGE across the domain,
never assumed globally fixed); and never confuse "parabolic" with a parabola-SHAPED solution — it
means $\Delta=0$ exactly, unrelated to solution geometry.

## Core Understanding
$A,B,C$ ARE SPECIFICALLY THE SECOND-ORDER-TERM COEFFICIENTS — NEVER ANY OTHER POLYNOMIAL IN THE
PROBLEM: for $3u_{xx}-4u_{xy}+5u_{yy}=0$: $A=3,B=-4,C=5$ (from $u_{xx},u_{xy},u_{yy}$
SPECIFICALLY, dropping any lower-order terms entirely), giving $\Delta=16-60=-44<0$ — ELLIPTIC.
"Discriminant" is first learned for quadratic equations $ax^2+bx+c=0$, but here $A,B,C$ must be
identified from the PDE's LEADING second-order terms, never reflexively applied to whatever
polynomial happens to appear elsewhere in the problem.

VARIABLE-COEFFICIENT CLASSIFICATION IS LOCAL — NEVER ASSUMED GLOBALLY FIXED: for the Tricomi
equation $yu_{xx}+u_{yy}=0$: $A=y,B=0,C=1$, giving $\Delta=-4y$. For $y>0$: $\Delta<0$ — ELLIPTIC.
For $y=0$: $\Delta=0$ — PARABOLIC (the transition). For $y<0$: $\Delta>0$ — HYPERBOLIC. This SAME
equation genuinely changes TYPE across the domain — there is NO single global label when $A,B,C$
are variable; classification must be evaluated pointwise.

"PARABOLIC" MEANS $\Delta=0$ — NEVER A PARABOLA-SHAPED SOLUTION: the heat equation IS parabolic
($\Delta=0$), but a solution starting from $u(x,0)=e^{-x^2}$ (a bell curve) STAYS a bell curve as
$t$ evolves — NEVER becoming literally parabola-shaped. "Parabolic" is a technical classification
term by discriminant, connected historically to conic sections ($Ax^2+Bxy+Cy^2=1$ IS a parabola
when $B^2-4AC=0$) but never describing the actual geometric shape of any PDE solution.

## Mental Models
- **"A, B, C come only from the leading second-order terms — everything else in the PDE is
  irrelevant to classification."**
- **"For variable coefficients, the discriminant is a function of position — check it pointwise,
  never assume one label for the whole domain."**

## Why Students Fail

### MC-1: DISCRIMINANT-APPLIED-TO-COEFFICIENTS-NOT-PDE
- **Surface form**: applies $B^2-4AC$ to a quadratic polynomial appearing in the solution or
  boundary data rather than to the PDE's own second-order-term coefficients.
- **Birth type**: Type 3, language contamination (Blueprint's own declared birth type — the
  discriminant is first encountered for quadratic equations, and students reflexively apply it to
  whatever polynomial appears without correctly identifying $A,B,C$ as the PDE coefficients).
- **Repair**: re-walk the mechanical identification — circle the second-order terms $u_{xx},
  u_{xy},u_{yy}$ and read off their coefficients only.

### MC-2: CLASSIFICATION-IS-GLOBAL-NOT-LOCAL
- **Surface form**: thinks the classification of a PDE with variable coefficients is fixed
  globally, missing that the discriminant can change sign across the domain.
- **Birth type**: Type 5, instruction-induced (Blueprint's own declared birth type — textbook
  examples almost always have constant coefficients, leaving the impression that classification
  is always a single fixed label).
- **Repair**: re-walk the Tricomi equation's local classification changing across $y=0$.

### MC-3: PARABOLIC-MEANS-PARABOLA-SHAPE
- **Surface form**: confuses "parabolic PDE" with a PDE whose solution has a parabolic shape.
- **Birth type**: Type 3, language contamination (Blueprint's own declared birth type —
  "parabolic" describes a parabola in everyday mathematics, but here is a technical discriminant
  classification unrelated to solution geometry).
- **Repair**: re-anchor on the heat equation's bell-curve solution staying bell-shaped, never
  becoming parabolic in shape.

## Misconceptions

### MC-1: DISCRIMINANT-APPLIED-TO-COEFFICIENTS-NOT-PDE
- **Surface form**: as described above.
- **Root cause (Type 3)**: as described above.
- **Repair**: as described above.

### MC-2: CLASSIFICATION-IS-GLOBAL-NOT-LOCAL
- **Surface form**: as described above.
- **Root cause (Type 5)**: as described above.
- **Repair**: as described above.

### MC-3: PARABOLIC-MEANS-PARABOLA-SHAPE
- **Surface form**: as described above.
- **Root cause (Type 3)**: as described above.
- **Repair**: as described above.

## Analogies
- **"The discriminant B²−4AC for a PDE is the conic-section formula lending its name and test to a
  different context — same algebra, but the labels describe equation TYPE, never solution
  SHAPE."**
- **Anti-analogy**: a variable-coefficient PDE's classification is NOT a fixed sticker attached to
  the equation for all time — it's a function of position that can genuinely switch type across
  the domain.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: the direct $A,B,C$ identification for
  $3u_{xx}-4u_{xy}+5u_{yy}=0$.
- **Demonstration 2 (targets MC-2)**: the Tricomi equation's local classification changing sign
  across $y=0$.
- **Demonstration 3 (targets MC-3)**: the heat equation's bell-curve solution remaining
  bell-shaped, never parabolic.

## Discovery Questions
1. "In the discriminant B²−4AC for a PDE, do A, B, C come from the PDE's leading second-order
   terms, or from some other polynomial in the problem?"
2. "If a PDE has variable coefficients, is its classification a single fixed label, or can it
   change across the domain?"
3. "Does 'parabolic PDE' mean the solution has a parabola shape, or is it a technical
   classification by discriminant?"

## Teaching Sequence
1. **Representation shift**: the mechanical $A,B,C$ identification and canonical examples,
   working Demonstration 1, isolating MC-1.
2. **Pattern induction**: variable-coefficient local classification, working Demonstration 2,
   isolating MC-2.
3. **Contrast pair**: the parabolic-versus-parabola-shape distinction, working Demonstration 3,
   isolating MC-3.
4. **Mastery gate**: require a correct $A,B,C$ identification and discriminant classification for
   several PDEs, a correct local classification of a variable-coefficient PDE, and a correct
   explanation of the "parabolic" naming's technical (not geometric) meaning, at the Blueprint's
   own stated MAMR of 4/5.

## Tutor Actions
- Never accept $A,B,C$ identified from anything other than the PDE's own second-order-term
  coefficients.
- Never accept a variable-coefficient PDE's classification stated as a single global label without
  checking for sign changes.
- Never accept "parabolic" interpreted as describing a solution's geometric shape.

## Voice Teaching Notes
- Say "which terms are the second-order ones, and what are their coefficients?" whenever a PDE is
  classified.
- For variable coefficients, ask "does the discriminant change sign anywhere in the domain?"

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly identifies $A,B,C$ and classifies a constant-
  coefficient PDE.
- **Rung 2 (application)**: learner correctly classifies a variable-coefficient PDE locally,
  identifying any type transitions.
- **Rung 3 (transfer)**: learner correctly matches each classification to its appropriate
  initial/boundary condition requirements and connects to the canonical form/characteristic
  structure.

## Tutor Recovery Strategy
- If MC-1 recurs, re-walk the mechanical $A,B,C$ identification.
- If MC-2 recurs, re-walk the Tricomi equation's local classification.
- If MC-3 recurs, re-anchor on the heat equation's bell-curve-stays-bell-curve example.

## Memory Hooks
- "A, B, C come only from uₓₓ, uₓᵧ, uᵧᵧ — nothing else counts."
- "Variable coefficients mean the classification can change across the domain — check it
  pointwise."
- "Parabolic means Δ=0 — never a parabola-shaped solution."

## Transfer Connections
- `math.de.pde` (already authored, this campaign, Batch 161): supplies the PDE framework and the
  informal discriminant preview this concept formalizes with a rigorous test and local-versus-
  global distinction.
- `math.de.heat-equation`, `math.de.wave-equation`, `math.de.laplace-equation` (not yet
  authored): the KG's declared related concepts, the canonical parabolic/hyperbolic/elliptic
  examples this concept classifies.

## Cross-Subject Connections
- Fluid dynamics: transonic flow (elliptic/hyperbolic transition, mirroring the Tricomi
  equation).

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.de.pde-classification.md`, reused by
  reference for its canonical-example discriminant computations, its Tricomi-equation local-
  classification example, its parabolic-naming clarification, and its three-misconception
  registry (birth types adopted directly as declared).
- Transfer probe: the Blueprint's own independence-mode probe, connecting the discriminant
  classification to canonical-form reduction, first-order-system characteristics, and the
  pseudo-differential symbol.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires `math.de.pde`,
  unlocks none, cross_links none, expert/understand, mastery_threshold 0.8, estimated_hours 4)
  was directly verified against the live KG and matches exactly.

## Version History
- 2026-09-19 (Batch 163): authored. Second entry this batch. Companion batch concept:
  `math.de.fourier-series`.
