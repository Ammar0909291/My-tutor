# math.de.laplace-transform

## Identity
- **KG id**: `math.de.laplace-transform`
- **Domain**: math.de
- **Requires**: `math.de.second-order-ode`, `math.calc.improper-integrals`,
  `math.calc.integration-by-parts`
- **Unlocks**: `math.de.laplace-ode`, `math.de.convolution-theorem`
- **Cross-links**: `math.fnal.fourier-transform`
- **Difficulty**: expert
- **Bloom level**: apply
- **Mastery threshold**: 0.85
- **Estimated hours**: 8

## Learning Objective
Define $\mathcal{L}\{f\}(s)=\int_0^\infty e^{-st}f(t)\,dt$ as a Type I improper integral (never a
new kind of object); derive the derivative rule $\mathcal{L}\{f'\}(s)=sF(s)-f(0)$ (the $-f(0)$
term NEVER omitted) — the transform's entire reason for existing, converting differentiation into
algebraic multiplication by $s$; and recognize convergence is NEVER universal, holding only for
$s$ above a function-specific threshold.

## Core Understanding
THE LAPLACE TRANSFORM IS A TYPE I IMPROPER INTEGRAL — NOTHING NEW ABOUT THE DEFINITION: for
$\mathcal{L}\{e^{at}\}(s)=\int_0^\infty e^{-(s-a)t}\,dt$: computing the proper integral to a cutoff
$T$ then taking $T\to\infty$ (exactly the Type I procedure): $\frac{1}{s-a}(1-e^{-(s-a)T})\to
\frac{1}{s-a}$ WHEN $s>a$ (so $e^{-(s-a)T}\to0$). This is the identical machinery already known
for improper integrals, applied to a specific, extremely useful integrand.

THE DERIVATIVE RULE IS THE ENTIRE POINT — THE $-f(0)$ TERM IS NEVER OPTIONAL: applying integration
by parts with $u=e^{-st},dv=f'(t)dt$: $\mathcal{L}\{f'\}(s)=[e^{-st}f(t)]_0^\infty+s\int_0^\infty
e^{-st}f(t)dt=(0-f(0))+sF(s)=sF(s)-f(0)$ — the boundary term at $t=0$ is EXACTLY where $-f(0)$
comes from. Verified for $f(t)=e^{at}$: direct computation gives $\mathcal{L}\{ae^{at}\}=a/(s-a)$;
the rule gives $s\cdot\frac{1}{s-a}-1=\frac{a}{s-a}$ — matching exactly. This ONE fact — that
differentiation becomes multiplication by $s$ — is what converts a differential equation into an
algebraic one.

CONVERGENCE IS NEVER UNIVERSAL — IT DEPENDS ON THE SPECIFIC FUNCTION'S GROWTH RATE: for
$\mathcal{L}\{e^{5t}\}(s)=1/(s-5)$: valid ONLY for $s>5$. At $s\le5$: $e^{-(s-5)t}$ does NOT decay
(the exponent is $\ge0$), so the integral genuinely DIVERGES — "$\mathcal{L}\{e^{10t}\}(2)$" is
MEANINGLESS, not simply a small or negative number. Different functions require different minimum
$s$ (the "abscissa of convergence") — there is no universal $s$ that works for every $f$.

## Mental Models
- **"The Laplace transform is just an improper integral with a purposeful integrand — nothing
  about its definition is new."**
- **"Differentiation in t becomes multiplication by s — that single fact is the whole reason this
  transform exists."**

## Why Students Fail

### MC-1: LAPLACE-TRANSFORM-ASSUMED-UNIVERSALLY-DEFINED
- **Surface form**: believes $\mathcal{L}\{f\}(s)$ is valid for every value of $s$ once a formula
  is found.
- **Birth type**: Foundational severity (Blueprint's own declared severity — transform TABLES
  typically omit the convergence condition, making it easy to internalize the formula while
  losing the conditional-validity fact).
- **Repair**: re-walk the $e^{5t}$ divergence check at $s\le5$, confirming the integral genuinely
  diverges there.

### MC-2: DERIVATIVE-RULE-SIGN-OR-INITIAL-CONDITION-TERM-OMITTED
- **Surface form**: states the derivative rule as $\mathcal{L}\{f'\}(s)=sF(s)$, omitting the
  essential $-f(0)$ term.
- **Birth type**: Foundational severity (Blueprint's own declared severity — the algebraic
  simplicity of $sF(s)$ makes the boundary term easy to drop).
- **Repair**: re-derive the boundary term at $t=0$ explicitly from integration by parts, showing
  it's exactly where $-f(0)$ arises.

### MC-3: LAPLACE-TRANSFORM-COMPUTATION-ATTEMPTED-WITHOUT-VERIFYING-INTEGRATION-BY-PARTS-CHOICE
- **Surface form**: applies integration by parts to compute a transform without a deliberate
  choice of $u,dv$, leading to a more complicated resulting integral.
- **Birth type**: Moderate severity (Blueprint's own declared severity — the transform's integrand
  offers multiple superficially plausible choices).
- **Repair**: re-anchor on the LIATE-style reasoning already established for choosing $u,dv$.

## Misconceptions

### MC-1: LAPLACE-TRANSFORM-ASSUMED-UNIVERSALLY-DEFINED
- **Surface form**: as described above.
- **Root cause (Foundational)**: as described above.
- **Repair**: as described above.

### MC-2: DERIVATIVE-RULE-SIGN-OR-INITIAL-CONDITION-TERM-OMITTED
- **Surface form**: as described above.
- **Root cause (Foundational)**: as described above.
- **Repair**: as described above.

### MC-3: LAPLACE-TRANSFORM-COMPUTATION-ATTEMPTED-WITHOUT-VERIFYING-INTEGRATION-BY-PARTS-CHOICE
- **Surface form**: as described above.
- **Root cause (Moderate)**: as described above.
- **Repair**: as described above.

## Analogies
- **"The Laplace transform is a translator that turns 'differentiate' into 'multiply by s' —
  exactly the reason a hard differential equation becomes an easy algebraic one."**
- **Anti-analogy**: a computed transform formula is NOT automatically valid everywhere — like any
  improper integral, it carries its own domain of convergence that must be stated, never assumed.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: the $\mathcal{L}\{e^{at}\}(s)=1/(s-a)$ computation with
  explicit convergence condition $s>a$.
- **Demonstration 2 (targets MC-2)**: the derivative-rule derivation and its independent
  verification for $f(t)=e^{at}$.
- **Demonstration 3 (targets MC-3)**: the deliberate $u,dv$ choice for computing
  $\mathcal{L}\{t\}(s)$.

## Discovery Questions
1. "Once you've computed L{f}(s) = 1/(s−a) for some function f, is this formula valid for every
   value of s?"
2. "Does the derivative rule include a −f(0) term, or just sF(s)?"
3. "When computing a Laplace transform via integration by parts, does the choice of u and dv
   matter?"

## Teaching Sequence
1. **Representation shift**: the transform as an improper integral, working Demonstration 1.
2. **Conflict evidence**: the derivative rule's derivation and verification, working
   Demonstration 2, isolating MC-2; the convergence condition, isolating MC-1.
3. **Deliberate technique**: the $u,dv$ choice discipline, working Demonstration 3, isolating
   MC-3.
4. **Mastery gate**: require a correct transform computed with its convergence condition stated, a
   correct derivative-rule application including $-f(0)$, and a correct explanation of why a
   value outside the convergence domain is meaningless, at the Blueprint's own stated MAMR of
   5/5.

## Tutor Actions
- Never accept a Laplace transform formula stated without its valid range of $s$.
- Never accept the derivative rule stated without the $-f(0)$ term.
- Never accept an integration-by-parts computation with an undeliberate choice of $u,dv$.

## Voice Teaching Notes
- Say "for which values of s does this actually converge?" whenever a transform formula is
  computed.
- When the derivative rule is stated, ask "where did the −f(0) term go?"

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly computes a basic transform as an improper integral
  with its convergence condition.
- **Rung 2 (application)**: learner correctly derives and verifies the derivative rule for a
  specific function.
- **Rung 3 (transfer)**: learner correctly transforms a first-order IVP into an algebraic equation
  in $s$ using the derivative rule and initial condition.

## Tutor Recovery Strategy
- If MC-1 recurs, re-walk the divergence check for $s$ below the threshold.
- If MC-2 recurs, re-derive the boundary term at $t=0$.
- If MC-3 recurs, re-anchor on the LIATE-style $u,dv$ choice.

## Memory Hooks
- "The transform's formula is only valid where the integral actually converges — always state the
  range."
- "The derivative rule is sF(s) minus f(0) — never just sF(s)."
- "Choose u and dv deliberately, exactly as already learned for integration by parts."

## Transfer Connections
- `math.de.second-order-ode` (already authored, certified domain): supplies the differential
  equations this transform is ultimately designed to convert into algebraic form.
- `math.calc.improper-integrals` (already authored, certified domain): supplies the Type I
  improper-integral machinery this transform's definition directly instantiates.
- `math.calc.integration-by-parts` (already authored, certified domain): supplies the technique
  used to derive the derivative rule and compute specific transforms.
- `math.de.laplace-ode`, `math.de.convolution-theorem` (not yet authored): the KG's declared
  unlocks, the practical payoff (solving ODEs) and a further structural property of the
  transform.
- `math.fnal.fourier-transform` (not yet authored, formal KG cross-link): a related integral
  transform; independence mode maintained per the Blueprint's own deferral note.

## Cross-Subject Connections
- Electrical engineering: circuit analysis via transform methods.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.de.laplace-transform.md`, reused by
  reference for its exponential-transform worked example, its derivative-rule derivation and
  verification, its convergence-failure example, and its three-misconception registry (severity
  levels adopted directly as declared).
- Transfer probe: the Blueprint's own independence-mode probe (deferred cross-link to
  `math.fnal.fourier-transform`), transforming a discharging-circuit IVP into an algebraic
  equation.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires
  `math.de.second-order-ode`/`math.calc.improper-integrals`/`math.calc.integration-by-parts`,
  unlocks `math.de.laplace-ode`/`math.de.convolution-theorem`, cross_links
  `math.fnal.fourier-transform`, expert/apply, mastery_threshold 0.85, estimated_hours 8) was
  directly verified against the live KG and matches exactly. `math.fnal.fourier-transform`
  confirmed not yet authored, consistent with the Blueprint's own independence-mode deferral note.

## Version History
- 2026-09-19 (Batch 156): authored. First entry this batch. Companion batch concept:
  `math.de.series-solution`.
