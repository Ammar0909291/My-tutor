# math.de.laplace-ode

## Identity
- **KG id**: `math.de.laplace-ode`
- **Domain**: math.de
- **Requires**: `math.de.inverse-laplace`, `math.de.ivp`
- **Unlocks**: none
- **Cross-links**: none
- **Difficulty**: expert
- **Bloom level**: apply
- **Mastery threshold**: 0.85
- **Estimated hours**: 6

## Learning Objective
Apply the Laplace transform pipeline to solve an IVP: transform both sides (initial conditions
BAKED INTO $\mathcal{L}\{y''\}=s^2Y-sy(0)-y'(0)$, never applied as free constants afterward);
solve algebraically for $Y(s)$, decompose via partial fractions (checking degree and root-type
carefully), and invert to $y(t)$; and correctly distinguish the convolution
$\mathcal{L}^{-1}\{FG\}=(f*g)(t)$ from the POINTWISE product $f(t)g(t)$ (never conflated).

## Core Understanding
INITIAL CONDITIONS ARE ENCODED AT THE TRANSFORM STEP — NEVER APPLIED AS FREE CONSTANTS AT THE
END: for $y''+4y=0,y(0)=2,y'(0)=0$: transforming gives $s^2Y-2s+4Y=0\Rightarrow(s^2+4)Y=2s
\Rightarrow Y=2s/(s^2+4)$, inverting to $y=2\cos(2t)$ — verified directly ($y''+4y=0$ ✓, $y(0)=2$
✓, $y'(0)=0$ ✓). There are NO free constants $C_1,C_2$ in this method — the initial conditions are
ALREADY baked into $Y(s)$ algebraically, the moment the derivatives are transformed.

PARTIAL FRACTIONS MUST BE CHECKED FOR PROPER DEGREE AND CORRECT ROOT-TYPE FORM — NEVER APPLIED
NAIVELY: for $Y(s)=1/[(s+1)^2(s+2)]+1/[(s+1)(s+2)]$: decomposing
$1/[(s+1)^2(s+2)]=A/(s+1)+B/(s+1)^2+C/(s+2)$ requires the REPEATED-root form (multiple terms per
power), giving $C=1,B=1,A=-1$; combined with $1/[(s+1)(s+2)]=-1/(s+1)+1/(s+2)$, the sum is
$Y=-2/(s+1)+1/(s+1)^2+2/(s+2)$, inverting to $y(t)=-2e^{-t}+te^{-t}+2e^{-2t}$. If the numerator
degree is $\ge$ denominator degree, polynomial long division must happen FIRST — never assumed
away.

CONVOLUTION IS NEVER THE SAME AS THE POINTWISE PRODUCT: $\mathcal{L}^{-1}\{F(s)G(s)\}\ne
f(t)g(t)$ — the correct inverse is the CONVOLUTION $(f*g)(t)=\int_0^tf(\tau)g(t-\tau)d\tau$. For
$\mathcal{L}^{-1}\{1/[s(s+1)]\}$: the convolution gives $\int_0^t1\cdot e^{-(t-\tau)}d\tau=
1-e^{-t}$ — checking the pointwise product instead ($1\cdot e^{-t}=e^{-t}$) gives a genuinely
WRONG answer. Because $\mathcal{L}$ is LINEAR ($\mathcal{L}\{f+g\}=F+G$) but NEVER multiplicative
($\mathcal{L}\{fg\}\ne FG$ in general), the multiplication-in-$s$ rule specifically corresponds to
convolution in $t$, never a pointwise product.

## Mental Models
- **"The Laplace ODE pipeline bakes initial conditions in at the transform step — there are no
  free constants left to solve for at the end."**
- **"Multiplication of transforms in s corresponds to convolution in t — never the pointwise
  product, which has no elementary-algebra analogue here."**

## Why Students Fail

### MC-1: INITIAL-CONDITIONS-IGNORED-UNTIL-END
- **Surface form**: takes $\mathcal{L}\{y''\}=s^2Y(s)$ (forgetting $-sy(0)-y'(0)$), then applies
  initial conditions only at the end to free constants — which fails because there are none.
- **Birth type**: Type 5, instruction-induced (Blueprint's own declared birth type — students learn
  the general-solution-plus-ICs-at-the-end pattern for ordinary ODE solving and apply it here,
  missing that the Laplace method encodes ICs algebraically at the transform step itself).
- **Repair**: re-walk the derivative-transform formula $\mathcal{L}\{y''\}=s^2Y-sy(0)-y'(0)$,
  re-anchoring on ICs entering immediately, never as free constants.

### MC-2: PARTIAL-FRACTIONS-DEGREE-ERROR
- **Surface form**: writes a partial-fraction decomposition for $Y(s)$ without first checking
  proper-fraction status, or writes the wrong form for repeated or complex roots.
- **Birth type**: Type 5, instruction-induced (Blueprint's own declared birth type — calculus
  partial fractions assume proper fractions and don't cover repeated/complex-conjugate forms as
  thoroughly).
- **Repair**: re-verify the correct repeated-root decomposition form
  $A/(s-r)+B/(s-r)^2+\cdots$ term by term.

### MC-3: CONVOLUTION-CONFUSED-WITH-PRODUCT
- **Surface form**: believes $\mathcal{L}^{-1}\{F(s)G(s)\}=f(t)g(t)$ (pointwise product).
- **Birth type**: Type 1, overgeneralization (Blueprint's own declared birth type — linearity of
  $\mathcal{L}$ tempts students to assume multiplicativity symmetrically, though the convolution
  correspondence has no elementary-algebra analogue).
- **Repair**: re-verify $\mathcal{L}^{-1}\{1/[s(s+1)]\}=1-e^{-t}$ via convolution, contrasted with
  the wrong pointwise-product guess $e^{-t}$.

## Misconceptions

### MC-1: INITIAL-CONDITIONS-IGNORED-UNTIL-END
- **Surface form**: as described above.
- **Root cause (Type 5)**: as described above.
- **Repair**: as described above.

### MC-2: PARTIAL-FRACTIONS-DEGREE-ERROR
- **Surface form**: as described above.
- **Root cause (Type 5)**: as described above.
- **Repair**: as described above.

### MC-3: CONVOLUTION-CONFUSED-WITH-PRODUCT
- **Surface form**: as described above.
- **Root cause (Type 1)**: as described above.
- **Repair**: as described above.

## Analogies
- **"The Laplace transform lifts differentiation to multiplication by s, and the initial
  conditions ride along automatically — there's no 'apply the IC later' step to remember."**
- **Anti-analogy**: multiplying two transforms is NOT like multiplying two ordinary functions
  pointwise — it's a running weighted blend (convolution) of the two original functions.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: the $y''+4y=0$ IVP, transformed with ICs baked in and
  verified directly.
- **Demonstration 2 (targets MC-2)**: the repeated-root partial-fraction decomposition for
  $Y(s)=1/[(s+1)^2(s+2)]+1/[(s+1)(s+2)]$.
- **Demonstration 3 (targets MC-3)**: the $\mathcal{L}^{-1}\{1/[s(s+1)]\}$ convolution
  computation, contrasted with the wrong pointwise-product guess.

## Discovery Questions
1. "When you transform y'', do the initial conditions appear immediately, or do you apply them
   later like free constants?"
2. "Before decomposing Y(s) by partial fractions, have you checked whether it's a proper fraction
   and identified any repeated or complex roots?"
3. "Is the inverse Laplace transform of F(s)G(s) the pointwise product f(t)g(t), or the
   convolution (f*g)(t)?"

## Teaching Sequence
1. **Representation shift**: the derivative-transform pipeline with ICs baked in, working
   Demonstration 1, isolating MC-1.
2. **Pattern induction**: partial-fraction decomposition discipline for the transformed equation,
   working Demonstration 2, isolating MC-2.
3. **Contrast pair**: convolution versus pointwise product, working Demonstration 3, isolating
   MC-3.
4. **Mastery gate**: require a correct IVP solved via the full Laplace pipeline with ICs correctly
   encoded, a correct partial-fraction decomposition handling a repeated root, and a correct
   application of the convolution theorem, at the Blueprint's own stated MAMR of 5/5.

## Tutor Actions
- Never accept initial conditions applied to free constants at the end of the Laplace method.
- Never accept a partial-fraction decomposition that skips checking proper-fraction status or
  root type.
- Never accept the inverse of a product of transforms computed as a pointwise product.

## Voice Teaching Notes
- Say "where did the initial conditions go in your transformed equation?" whenever a
  Laplace-transformed derivative appears.
- When inverting a product of transforms, ask "is that the pointwise product, or the
  convolution?"

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly transforms an IVP with initial conditions correctly
  encoded.
- **Rung 2 (application)**: learner correctly decomposes $Y(s)$ via partial fractions, handling a
  repeated root, and inverts to $y(t)$.
- **Rung 3 (transfer)**: learner correctly solves an IVP with impulsive (Dirac delta) or piecewise
  (Heaviside step) forcing, and correctly applies the convolution theorem where needed.

## Tutor Recovery Strategy
- If MC-1 recurs, re-walk the derivative-transform formula with ICs baked in.
- If MC-2 recurs, re-verify the repeated-root decomposition form.
- If MC-3 recurs, re-verify the convolution computation against the wrong pointwise-product guess.

## Memory Hooks
- "Initial conditions are baked into Y(s) at the transform step — no free constants left."
- "Check proper-fraction status and root type before decomposing Y(s)."
- "Multiplication in s means convolution in t — never a pointwise product."

## Transfer Connections
- `math.de.inverse-laplace` (already authored, this campaign, Batch 158): supplies the
  partial-fraction-based inversion procedure this concept's final step directly reuses.
- `math.de.ivp` (already authored, this campaign, Batch 146): supplies the initial-value-problem
  framing this concept's pipeline solves.

## Cross-Subject Connections
- Electrical engineering: circuit analysis with impulsive and piecewise forcing (transfer
  function, impulse response).

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.de.laplace-ode.md`, reused by reference for
  its constant-coefficient-with-ICs worked example, its Heaviside/delta-function forcing
  examples, its convolution-versus-product contrast, and its three-misconception registry (birth
  types adopted directly as declared).
- Transfer probe: the Blueprint's own independence-mode probe, connecting the Laplace ODE method
  to transfer functions and impulse response, the Z-transform's discrete analogue, and the
  Paley-Wiener theorem's region-of-convergence interpretation.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires
  `math.de.inverse-laplace`/`math.de.ivp`, unlocks none, cross_links none, expert/apply,
  mastery_threshold 0.85, estimated_hours 6) was directly verified against the live KG and matches
  exactly.

## Version History
- 2026-09-19 (Batch 159): authored. First entry this batch. Companion batch concept:
  `math.de.bessel-equation`.
