# math.de.linear-first-order

## Identity
- **KG id**: `math.de.linear-first-order`
- **Domain**: math.de
- **Requires**: `math.de.first-order-ode`, `math.de.ode-linearity`, `math.calc.u-substitution`
- **Unlocks**: none
- **Cross-links**: none
- **Difficulty**: advanced
- **Bloom level**: apply
- **Mastery threshold**: 0.9
- **Estimated hours**: 5

## Learning Objective
Identify a first-order linear ODE in standard form $dy/dx+P(x)y=Q(x)$; compute the integrating
factor $\mu(x)=e^{\int P(x)\,dx}$ using the SIMPLEST antiderivative (no constant); multiply through
to get $(\mu y)'=\mu Q(x)$; integrate BOTH sides and DIVIDE by $\mu$ to isolate $y$, never leaving
$\mu y$ unresolved; apply initial conditions for the particular solution; and correctly identify
when the method genuinely applies (never to a nonlinear equation misidentified as this standard
form).

## Core Understanding
THE INTEGRATING FACTOR NEEDS NO ARBITRARY CONSTANT IN ITS OWN EXPONENT: $\mu(x)=e^{\int P(x)dx}$
uses ANY antiderivative of $P$; writing $\mu=Ce^{\int Pdx}$ instead just rescales $\mu$ by a
constant factor that CANCELS when the equation is later divided through — the single true
arbitrary constant comes from integrating $\mu Q$ afterward, never from $\mu$ itself. The
convention: set the constant inside $\mu$'s exponent to zero, giving the simplest
$\mu=e^{\int Pdx}$.

AFTER INTEGRATING, $y$ MUST BE ISOLATED BY DIVIDING BY $\mu$ — NEVER LEFT AS $\mu y$: for
$dy/dx+y/x=x,\ y(1)=2$: $P=1/x,\mu=x$. Multiplying gives $(xy)'=x^2$, integrating gives
$xy=x^3/3+C$ — this is $\mu y$, NOT $y$. Dividing by $\mu=x$: $y=x^2/3+C/x$. Applying $y(1)=2$:
$2=1/3+C\Rightarrow C=5/3$, giving $y=x^2/3+5/(3x)$. Stopping at $xy=x^3/3+C$ without the final
division leaves the wrong quantity isolated.

THE METHOD APPLIES ONLY TO THE EXACT STANDARD FORM $dy/dx+P(x)y=Q(x)$ WITH $P,Q$ FUNCTIONS OF $x$
ONLY — NEVER TO A DIFFERENT SIGN CONVENTION OR A NONLINEAR EQUATION: for a Bernoulli equation
$dy/dx+P(x)y=Q(x)y^n$ ($n\ne0,1$): the right side depends on $y$ itself, so the integrating factor
method does NOT apply directly — the substitution $v=y^{1-n}$ must FIRST convert it to genuine
linear form before $\mu$ can be computed. Checking the equation is genuinely in standard form —
never guessing based on surface resemblance — is a required first step, exactly like verifying
Binomial assumptions before applying that named distribution elsewhere in this corpus.

## Mental Models
- **"μ = e^{∫P dx} is chosen so multiplying makes the left side a perfect derivative — the
  constant inside its exponent is a free choice that always cancels, so take it to be zero."**
- **"After integrating you have μy, not y — dividing by μ is the last, easily-forgotten step."**

## Why Students Fail

### MC-1: INTEGRATING-FACTOR-MUST-INCLUDE-CONSTANT
- **Surface form**: writes $\mu(x)=Ce^{\int Pdx}$ and carries $C$ throughout, confusing which
  constant belongs to $\mu$ and which to the final integration.
- **Birth type**: Type 5, instruction-induced (Blueprint's own declared birth type — students know
  every indefinite integral gets a $+C$ and don't realize the integrating factor's own constant is
  absorbed and can be set to zero).
- **Repair**: re-derive how the constant inside $\mu$'s exponent rescales out, leaving the single
  true arbitrary constant coming from integrating $\mu Q$.

### MC-2: FORGETTING-TO-DIVIDE-BY-MU-AT-THE-END
- **Surface form**: correctly computes $\int\mu Q\,dx$ but writes $y=\int\mu Q\,dx+C$ instead of
  $y=(1/\mu)(\int\mu Q\,dx+C)$, forgetting the final division.
- **Birth type**: Type 3, language contamination (Blueprint's own declared birth type — $(\mu y)'=
  \mu Q$ is visually a multiplication, and solving for $\mu y$ correctly is mistaken for "already
  solved" for $y$).
- **Repair**: re-walk the $dy/dx+y/x=x$ example, explicitly writing $xy=x^3/3+C$ before the
  division step to $y=x^2/3+C/x$.

### MC-3: MISIDENTIFYING-THE-STANDARD-FORM
- **Surface form**: applies the integrating factor method to $dy/dx=P(x)y+Q(x)$ (wrong sign) or a
  Bernoulli equation without first converting it, getting the wrong $\mu$.
- **Birth type**: Type 1, overgeneralization (Blueprint's own declared birth type — the method is
  learned in one form and applied to any equation with a $y$-term on the right without checking
  the exact standard-form match).
- **Repair**: re-verify the exact standard form $dy/dx+P(x)y=Q(x)$ before computing $\mu$, and
  re-walk the Bernoulli substitution $v=y^{1-n}$ as the required first conversion step.

## Misconceptions

### MC-1: INTEGRATING-FACTOR-MUST-INCLUDE-CONSTANT
- **Surface form**: as described above.
- **Root cause (Type 5)**: as described above.
- **Repair**: as described above.

### MC-2: FORGETTING-TO-DIVIDE-BY-MU-AT-THE-END
- **Surface form**: as described above.
- **Root cause (Type 3)**: as described above.
- **Repair**: as described above.

### MC-3: MISIDENTIFYING-THE-STANDARD-FORM
- **Surface form**: as described above.
- **Root cause (Type 1)**: as described above.
- **Repair**: as described above.

## Analogies
- **"The integrating factor is a multiplying key that unlocks a perfect derivative on the left —
  once you've used the key, you still have to divide it back out to read off y."**
- **Anti-analogy**: the integrating factor method is NOT a universal y-term remover — it applies
  only to the exact linear standard form, never to equations where y appears nonlinearly on the
  right without first converting.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: the constant-in-μ cancellation derivation, confirming the
  simplest choice $\mu=e^{\int Pdx}$ is always valid.
- **Demonstration 2 (targets MC-2)**: the $dy/dx+y/x=x,\ y(1)=2$ full solve, isolating the
  divide-by-$\mu$ step explicitly.
- **Demonstration 3 (targets MC-3)**: the Bernoulli equation's required $v=y^{1-n}$ conversion
  before the integrating factor method applies.

## Discovery Questions
1. "Does the integrating factor μ=e^{∫P dx} need its own arbitrary constant, or does any
   antiderivative work?"
2. "After integrating to get μy = ∫μQ dx + C, have you divided by μ to isolate y?"
3. "Is dy/dx + P(x)y = Q(x)yⁿ already in the linear standard form, or does it need converting
   first?"

## Teaching Sequence
1. **Representation shift**: the integrating factor derivation and the no-constant convention,
   working Demonstration 1, isolating MC-1.
2. **Pattern induction**: the full multiply-integrate-divide method, working Demonstration 2,
   isolating MC-2.
3. **Contrast pair**: the standard-form verification and Bernoulli conversion, working
   Demonstration 3, isolating MC-3.
4. **Mastery gate**: require a correct integrating factor with no stray constant, a correct
   solution with the divide-by-$\mu$ step shown explicitly, and a correct identification of when
   the method does or doesn't directly apply, at the Blueprint's own stated MAMR of 5/5.

## Tutor Actions
- Never accept an integrating factor written with its own separate arbitrary constant.
- Never accept a solution left at $\mu y=\ldots$ without the final division by $\mu$.
- Never accept the integrating factor method applied to an equation not verified to be in the
  exact standard form $dy/dx+P(x)y=Q(x)$.

## Voice Teaching Notes
- Say "does μ need its own constant, or does any antiderivative of P work?" whenever the
  integrating factor is computed.
- After integrating, ask "is that y, or is that still μy?"

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly computes an integrating factor with no stray
  constant.
- **Rung 2 (application)**: learner correctly solves a linear first-order IVP, showing the
  divide-by-$\mu$ step explicitly.
- **Rung 3 (transfer)**: learner correctly converts a Bernoulli equation to linear form via
  substitution and solves it using the integrating factor method.

## Tutor Recovery Strategy
- If MC-1 recurs, re-derive the constant-in-μ cancellation.
- If MC-2 recurs, re-walk the $dy/dx+y/x=x$ solve with the explicit division step.
- If MC-3 recurs, re-verify the standard form and re-walk the Bernoulli conversion.

## Memory Hooks
- "μ needs no constant of its own — any antiderivative of P works."
- "μy is not y — always divide by μ at the end."
- "Check the standard form first — Bernoulli and other nonlinear equations need converting before
  this method applies."

## Transfer Connections
- `math.de.first-order-ode` (already authored, certified domain): supplies the first-order ODE
  framework this concept's integrating factor method specializes.
- `math.de.ode-linearity` (already authored, certified domain): supplies the linearity concept
  distinguishing this equation's standard form from nonlinear alternatives.
- `math.calc.u-substitution` (already authored, certified domain): supplies the substitution
  technique underlying the integration steps used throughout.
- `math.de.separable` (already authored, this campaign, Batch 146): the KG's declared related
  concept, an alternative first-order technique for equations not in linear standard form.

## Cross-Subject Connections
- None formal.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.de.linear-first-order.md`, reused by
  reference for its integrating-factor derivation, its $dy/dx+y/x=x$ worked IVP example, its
  homogeneous-case and Bernoulli-conversion notes, and its three-misconception library (birth
  types adopted directly as declared).
- Transfer probe: the Blueprint's own independence-mode probe, extending the integrating-factor
  idea to matrix exponentials for linear systems, Sturm-Liouville weight functions, and
  thermodynamic integrating factors.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires
  `math.de.first-order-ode`/`math.de.ode-linearity`/`math.calc.u-substitution`, unlocks none,
  cross_links none, advanced/apply, mastery_threshold 0.9, estimated_hours 5) was directly
  verified against the live KG and matches exactly.

## Version History
- 2026-09-19 (Batch 147): authored. Second entry this batch. Companion batch concept:
  `math.de.existence-uniqueness`.
