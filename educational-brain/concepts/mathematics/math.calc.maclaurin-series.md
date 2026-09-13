# math.calc.maclaurin-series

## Identity
- **KG id**: `math.calc.maclaurin-series`
- **Domain**: math.calc
- **Requires**: `math.calc.taylor-series`
- **Unlocks**: none
- **Cross-links**: none
- **Difficulty**: advanced
- **Bloom level**: apply
- **Mastery threshold**: 0.75
- **Estimated hours**: 8

## Learning Objective
Define the Maclaurin series as `math.calc.taylor-series`'s own special case centered at $a=0$;
derive and recognize the four standard Maclaurin series ($e^x$, $\sin x$, $\cos x$, $1/(1-x)$),
including the structural reason $\sin x$'s series contains only odd powers and $\cos x$'s only
even powers; and derive new Maclaurin series from the four standard ones via substitution,
differentiation, or integration, rather than computing every derivative from scratch.

## Core Understanding
`math.calc.taylor-series` builds an approximation $f(x)=\sum_{n=0}^{\infty}\frac{f^{(n)}(a)}{n!}
(x-a)^n$ centered at an ARBITRARY point $a$. The Maclaurin series is nothing more than this exact
same construction with the center fixed specifically at $a=0$:
$f(x)=\sum_{n=0}^{\infty}\frac{f^{(n)}(0)}{n!}x^n$ — every derivative is evaluated AT ZERO. This
single simplification is what makes four particular series worth memorizing directly, since their
coefficients at $a=0$ turn out to be unusually clean: $e^x=\sum\frac{x^n}{n!}$ (since every
derivative of $e^x$ equals $e^x$ itself, and $e^0=1$); $\sin x=\sum\frac{(-1)^nx^{2n+1}}{(2n+1)!}$
(only ODD powers); $\cos x=\sum\frac{(-1)^nx^{2n}}{(2n)!}$ (only EVEN powers); and
$1/(1-x)=\sum x^n$ (the geometric series, $|x|<1$).

The odd/even power pattern in $\sin x$ and $\cos x$'s series is not a coincidence to memorize
separately — it is a DIRECT structural consequence of $\sin$ being an odd function ($\sin(-x)=
-\sin x$) and $\cos$ being an even function ($\cos(-x)=\cos x$). A Maclaurin series for an odd
function can only contain odd powers of $x$ (since $x^n$ for even $n$ is itself an even function,
and an even function cannot sum to an odd one unless its coefficient is exactly zero), and
symmetrically for an even function and even powers. This is worth deriving rather than merely
observing, since it EXPLAINS why the pattern must hold rather than presenting it as an arbitrary
fact to remember.

Rather than re-deriving a new function's Maclaurin series from scratch every time (a genuinely
tedious process requiring repeated differentiation), the four standard series serve as BUILDING
BLOCKS: a new series can usually be obtained far more efficiently via SUBSTITUTION (replacing $x$
with some expression, e.g. finding $e^{-x^2}$'s series by substituting $-x^2$ into $e^x$'s
series), DIFFERENTIATION (term-by-term, valid within the radius of convergence), or INTEGRATION
(also term-by-term, e.g. finding $\ln(1+x)$'s series by integrating $1/(1+x)$'s geometric-series
form). Recognizing which technique applies — and reaching for it before attempting direct
differentiation — is itself the practical skill this concept develops.

## Mental Models
- **"The Maclaurin series is the Taylor series, centered at zero — nothing more."**
- **"Odd function, only odd powers. Even function, only even powers — not a coincidence, a
  structural consequence."**
- **"Build new series from the four standard ones via substitution/differentiation/integration —
  don't re-derive from scratch."**

## Why Students Fail

### MC-1: ODD-EVEN-POWER-PARITY-VIOLATED-WHEN-RECONSTRUCTING-STANDARD-SERIES
- **Surface form**: including a wrong-parity power term (an even-power term in $\sin x$'s series,
  or an odd-power term in $\cos x$'s) when reconstructing a standard Maclaurin series from memory.
- **Frequency band**: Moderate.
- **Root cause (Type 1, overgeneralization)**: memorizing the series as an arbitrary list of terms
  rather than connecting the parity pattern to the function's own odd/even symmetry, so a
  recalled-from-memory error is not structurally caught.
- **Repair**: re-derive the parity pattern directly from the function's own odd/even symmetry
  property ($\sin(-x)=-\sin x$ forces every even-power coefficient to vanish) rather than merely
  re-stating the correct series.

### MC-2: NEW-SERIES-DERIVED-VIA-DIRECT-DIFFERENTIATION-INSTEAD-OF-REUSING-KNOWN-SERIES
- **Surface form**: attempting to derive a new Maclaurin series (e.g. for $e^{-x^2}$) by computing
  successive derivatives directly from the Maclaurin formula's definition, rather than efficiently
  substituting into an already-known standard series.
- **Frequency band**: Moderate.
- **Root cause (Type 1, overgeneralization)**: the Maclaurin formula's own definition genuinely
  works via direct differentiation, so that procedure is over-applied even in cases where a much
  more efficient substitution shortcut is available.
- **Repair**: contrast the tedious direct-differentiation approach against the substitution
  shortcut for the same function, showing both reach the identical series while one requires
  dramatically less work.

## Misconceptions

### MC-1: ODD-EVEN-POWER-PARITY-VIOLATED-WHEN-RECONSTRUCTING-STANDARD-SERIES
- **Surface form**: as described above.
- **Frequency band**: Moderate.
- **Root cause (Type 1)**: as described above.
- **Repair**: as described above.

### MC-2: NEW-SERIES-DERIVED-VIA-DIRECT-DIFFERENTIATION-INSTEAD-OF-REUSING-KNOWN-SERIES
- **Surface form**: as described above.
- **Frequency band**: Moderate.
- **Root cause (Type 1)**: as described above.
- **Repair**: as described above.

## Analogies
- **"The four standard series are a toolkit, not a museum exhibit"**: like a carpenter reaching for
  an already-sharpened tool rather than forging a new one from raw metal each time, substitution
  into a known series reuses work already done.
- **Anti-analogy**: the Maclaurin series is NOT a separate topic requiring its own derivation
  method distinct from the Taylor series — it is the identical construction with one number ($a$)
  fixed at zero.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: write out $\sin x$'s first three nonzero Maclaurin terms
  ($x-\frac{x^3}{3!}+\frac{x^5}{5!}$, powers 1, 3, 5 — all odd) and explicitly connect this to
  $\sin(-x)=-\sin x$ forcing every even-power coefficient to be exactly zero.
- **Demonstration 2 (targets MC-2)**: find $e^{-x^2}$'s Maclaurin series by substituting $-x^2$
  for $x$ in $e^x=\sum\frac{x^n}{n!}$, contrasted against the far more tedious alternative of
  computing $e^{-x^2}$'s successive derivatives directly.
- **Demonstration 3**: find $\ln(1+x)$'s Maclaurin series by integrating the geometric series
  $1/(1+x)=\sum(-1)^nx^n$ term-by-term, yielding $\ln(1+x)=\sum\frac{(-1)^nx^{n+1}}{n+1}$.

## Discovery Questions
1. "If $\sin(-x)=-\sin(x)$ for every $x$, what does that force about the coefficient of $x^2$ in
   $\sin x$'s Maclaurin series?"
2. "Instead of computing $e^{-x^2}$'s derivatives directly, could you get its series by
   substituting something into $e^x$'s already-known series?"
3. "If the Maclaurin series is just the Taylor series with $a=0$, what changes about the formula
   itself — and what stays exactly the same?"

## Teaching Sequence
1. **Anchor**: connect to `math.calc.taylor-series`'s general formula, framing the Maclaurin series
   as the $a=0$ special case.
2. **Conflict evidence**: derive the odd/even power-parity pattern directly from $\sin$/$\cos$'s
   own symmetry, rather than presenting it as a fact to memorize.
3. **Contrast pair**: substitution-based derivation of $e^{-x^2}$'s series versus tedious direct
   differentiation of the same function.
4. **Mastery gate**: require reconstructing a standard series with correct power parity and
   deriving a new series via substitution or integration into a known one.

## Tutor Actions
- Never accept a recalled Maclaurin series without checking that its power parity matches the
  function's own odd/even symmetry.
- When a learner attempts to derive a new series, ask whether substitution into a known series is
  possible before allowing direct differentiation from the definition.

## Voice Teaching Notes
- Say "only odd powers" and "only even powers" explicitly rather than relying on the learner to
  notice the pattern silently.
- When a learner reaches for direct differentiation, ask "is there a series you already know that
  this function is related to?" before correcting the approach outright.

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly reconstructs a standard Maclaurin series with
  correct power parity.
- **Rung 2 (application)**: learner correctly derives a new series via substitution into a known
  standard series.
- **Rung 3 (transfer)**: learner correctly derives a new series via term-by-term integration or
  differentiation, choosing the appropriate technique for the given function.

## Tutor Recovery Strategy
- If MC-1 recurs, re-run the odd/even symmetry derivation for the specific function in question.
- If MC-2 recurs, re-run the substitution-versus-direct-differentiation contrast.

## Memory Hooks
- "Maclaurin = Taylor at $a=0$. Nothing more."
- "Odd function, odd powers only. Even function, even powers only."
- "Substitute, differentiate, or integrate a known series — don't re-derive from scratch."

## Transfer Connections
- `math.calc.taylor-series` (already authored): supplies the general Taylor formula this concept
  specializes to $a=0$.

## Cross-Subject Connections
- None formal.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.calc.maclaurin-series.md`, reused by
  reference for its four standard series, its odd/even power-parity examples, its $e^{-x^2}$
  substitution derivation, its $\ln(1+x)$ integration derivation, and its two-misconception
  registry (independently birth-type-classified above, since the Blueprint carries severity
  labels but no birth-type column).
- Transfer probe cited by reference: the Blueprint's own independence-mode probe (a physicist
  approximating the relativistic energy correction term via binomial-series substitution).

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- No genuine Blueprint/KG metadata discrepancy found: requires, unlocks, cross_links, difficulty,
  bloom, mastery_threshold, and estimated_hours all match the live KG exactly.

## Version History
- 2026-09-13 (Batch 66): authored. Unblocked by `math.calc.taylor-series` (Batch 65). Companion
  batch concepts: `math.calc.taylor-remainder`, `math.seq.alternating-series`,
  `math.seq.comparison-test`. `math.calc` moves from **72/76** toward **73/76** this batch.
