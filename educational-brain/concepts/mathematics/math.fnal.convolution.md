# math.fnal.convolution

## Identity
- **KG id**: `math.fnal.convolution`
- **Domain**: math.fnal
- **Requires**: `math.meas.lebesgue-integral`
- **Unlocks**: none
- **Cross-links**: `math.de.convolution-theorem`, `math.de.fourier-transform`
- **Difficulty**: expert
- **Bloom level**: apply
- **Mastery threshold**: 0.8
- **Estimated hours**: 5

## Learning Objective
Compute $(f*g)(x)=\int f(x-y)g(y)\,dy$ directly and verify $f*g=g*f$ via a change of variables —
NEVER assumed genuinely different despite the asymmetric flip-and-slide picture; recognize Young's
inequality's exponent relationship as a genuine integrability trade-off — NEVER an arbitrary
formula; and recognize the convolution theorem $\mathcal F(f*g)=\mathcal F(f)\cdot\mathcal F(g)$
as a real, often dramatic simplification — NEVER a mere computational curiosity.

## Core Understanding
CONVOLUTION IS GENUINELY COMMUTATIVE — NEVER TREATED AS ASYMMETRIC DESPITE THE FLIP-AND-SLIDE
PICTURE: for $f(x)=g(x)=\mathbf1_{[0,1]}(x)$: $(f*g)(x)=x$ on $[0,1]$, $=2-x$ on $[1,2]$, else $0$
— the "triangle function." The construction LOOKS asymmetric (one function held fixed, the other
flipped and slid), but substituting $u=x-y$ gives
$\int f(x-y)g(y)\,dy=\int f(u)g(x-u)\,du=(g*f)(x)$ — genuinely proving $f*g=g*f$. Believing $f*g$
and $g*f$ could differ, based on the construction's visual asymmetry, is WRONG — a simple change
of variables proves the order never actually matters.

YOUNG'S INEQUALITY'S EXPONENT RELATIONSHIP IS A GENUINE TRADE-OFF — NEVER AN ARBITRARY FORMULA:
$\|f*g\|_r\le\|f\|_p\|g\|_q$ with $\frac1r=\frac1p+\frac1q-1$. For $f,g\in L^1$ ($p=q=1$):
$\frac1r=1+1-1=1$, so $r=1$ — predicting $f*g\in L^1$, matching the actual bounded, compactly
supported triangle function. For $p=1,q=\infty$ instead: $\frac1r=1+0-1=0$, so $r=\infty$ —
a WEAKER but still meaningful conclusion, without assuming $g$ is integrable at all. Treating this
exponent relationship as an arbitrary formula to memorize is WRONG — it precisely balances how
much integrability each input contributes to the output.

THE CONVOLUTION THEOREM IS A REAL, OFTEN DRAMATIC SIMPLIFICATION — NEVER A MERE CURIOSITY:
computing $(f*g)(x)$ directly (Example 1) required a careful piecewise overlap-integral for EVERY
$x$. Using $\mathcal F(f*g)(\omega)=\mathcal F(f)(\omega)\cdot\mathcal F(g)(\omega)$ instead
replaces that with a SIMPLE pointwise product of two individually simpler transforms. Believing
the convolution theorem is mostly a computational curiosity with limited practical value is WRONG
— transform, multiply, and transform back is often far easier than computing the convolution
integral directly, which is precisely why convolution is central to signal processing.

## Mental Models
- **"The flip-and-slide picture looks asymmetric, but a change of variables proves the order never
  actually matters — f*g=g*f, always."**
- **"Young's inequality's exponent relationship isn't arbitrary — it precisely balances how much
  integrability each input contributes to the output."**
- **"The convolution theorem replaces a hard integral with easy multiplication — a genuine,
  often dramatic simplification, never a curiosity."**

## Why Students Fail

### MC-1: CONVOLUTION-ASSUMED-NON-COMMUTATIVE
- **Surface form**: believes $f*g$ and $g*f$ could be different, given the visually asymmetric
  flip-and-slide construction, missing that a change of variables proves commutativity always.
- **Birth type**: perceptual intuition (Blueprint's own declared foundational severity — the
  construction visually looks asymmetric even though the result is symmetric).
- **Repair**: re-walk Example 1's change-of-variables proof, re-anchoring on "the order never
  actually matters, despite how the construction looks."

### MC-2: YOUNGS-INEQUALITY-EXPONENTS-ASSUMED-ARBITRARY
- **Surface form**: believes Young's inequality's exponent relationship is an arbitrary formula to
  memorize, missing that it expresses a genuine, checkable integrability trade-off.
- **Birth type**: instruction-induced (Blueprint's own declared high severity — the formula is
  often presented without deriving its balancing logic).
- **Repair**: re-walk Example 2's two exponent-choice scenarios, re-anchoring on "this precisely
  balances each input's integrability contribution."

### MC-3: CONVOLUTION-THEOREM-ASSUMED-MERE-CURIOSITY
- **Surface form**: believes the convolution theorem is a computational curiosity with limited
  practical value, missing that it provides a genuine, often dramatic simplification strategy.
- **Birth type**: overgeneralization (Blueprint's own declared birth type — abstract identities can
  seem like mathematical trivia without a concrete practical comparison).
- **Repair**: re-walk Example 3's harder-direct-computation-vs-easier-transform contrast,
  re-anchoring on "this is a genuine, often dramatic practical simplification."

## Misconceptions

### MC-1: CONVOLUTION-ASSUMED-NON-COMMUTATIVE
- **Surface form**: as described above.
- **Root cause (perceptual intuition)**: as described above.
- **Repair**: as described above.

### MC-2: YOUNGS-INEQUALITY-EXPONENTS-ASSUMED-ARBITRARY
- **Surface form**: as described above.
- **Root cause (instruction-induced)**: as described above.
- **Repair**: as described above.

### MC-3: CONVOLUTION-THEOREM-ASSUMED-MERE-CURIOSITY
- **Surface form**: as described above.
- **Root cause (overgeneralization)**: as described above.
- **Repair**: as described above.

## Analogies
- **"Convolution is like two hands passing a shape back and forth — flipping which hand does the
  'sliding' never changes what ends up on the table."**
- **Anti-analogy**: the convolution theorem isn't a party trick — it's the reason a whole chain of
  audio filters can be applied by multiplying spectra instead of computing a fresh hard integral
  at every stage.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: the indicator-function triangle-function computation and
  its change-of-variables commutativity proof.
- **Demonstration 2 (targets MC-2)**: the $p=q=1$-versus-$p=1,q=\infty$ Young's-inequality
  exponent comparison.
- **Demonstration 3 (targets MC-3)**: the direct-piecewise-computation-versus-transform-multiply
  contrast for the same indicator-function pair.

## Discovery Questions
1. "Could f*g and g*f be genuinely different functions, given how asymmetric the flip-and-slide
   construction looks?"
2. "Is Young's inequality's exponent relationship an arbitrary formula, or a genuine trade-off?"
3. "Is the convolution theorem mostly a curiosity, or a genuine practical simplification?"

## Teaching Sequence
1. **Representation shift**: work Example 1's direct triangle-function computation and
   commutativity proof, isolating MC-1.
2. **Conflict evidence**: work Example 2's two exponent-choice scenarios, isolating MC-2.
3. **Contrast pair**: work Example 3's direct-versus-transform comparison, isolating MC-3.
4. **Mastery gate**: require a correct direct convolution computation with commutativity check, a
   correct Young's-inequality exponent determination, and a correct explanation of the
   transform-multiply simplification, at the Blueprint's own stated MAMR of 4/5.

## Tutor Actions
- Never accept f*g and g*f treated as potentially different without a change-of-variables check.
- Never accept Young's inequality's exponent relationship presented as arbitrary.
- Never accept the convolution theorem dismissed as a mere curiosity.

## Voice Teaching Notes
- Say "does the order actually matter here, or does a change of variables settle it?" whenever
  convolution order is questioned.
- Ask "is that exponent relationship arbitrary, or does it balance something specific?" whenever
  Young's inequality is applied.

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly computes a direct convolution and verifies
  commutativity.
- **Rung 2 (application)**: learner correctly applies Young's inequality to determine the
  resulting integrability class.
- **Rung 3 (transfer)**: learner correctly explains the transform-multiply-transform-back strategy
  for a signal-processing smoothing filter, citing `math.de.fourier-transform`'s machinery.

## Tutor Recovery Strategy
- If MC-1 recurs, re-walk the change-of-variables commutativity proof.
- If MC-2 recurs, re-walk the two exponent-choice scenarios.
- If MC-3 recurs, re-walk the direct-versus-transform contrast.

## Memory Hooks
- "f*g=g*f, always — a change of variables proves it despite the asymmetric picture."
- "Young's exponents balance integrability contributions — never arbitrary."
- "The convolution theorem turns a hard integral into easy multiplication — a real
  simplification."

## Transfer Connections
- `math.meas.lebesgue-integral` (prerequisite, already authored): supplies the integration
  machinery underlying the convolution integral's rigorous definition.
- `math.de.fourier-transform` (already authored, cross-link): supplies the transform machinery
  this concept's convolution theorem directly reuses.

## Cross-Subject Connections
- Signal processing and differential equations: smoothing filters, PDE Green's-function solutions,
  and probability-density sums of independent random variables are all genuine applications of
  this exact convolution operation.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.fnal.convolution.md`, reused by reference for
  its three worked examples, its cross-link engagement of `math.de.fourier-transform`, and its
  three-misconception registry (birth types adopted directly as declared).
- Transfer probe: the Blueprint's own cross-link probe on an audio-engineering smoothing filter,
  using `math.de.fourier-transform`'s transform-multiply-transform-back strategy.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Reverse-direction discrepancy (cross-link target since authored)**: the Blueprint's Component 0
  and Component 7 state `math.de.convolution-theorem` was "not yet authored" at the Blueprint's own
  write time. The live EB corpus directory listing now shows `math.de.convolution-theorem.md`
  IS authored (this campaign has since progressed past that point). This is the campaign's 15th
  discrepancy overall and a reverse-direction case (target authored after the Blueprint's own
  write-time check, mirroring the pattern first seen earlier in this campaign). No correction to
  the P76 probe was needed here: the Blueprint's chosen cross-link-probe target,
  `math.de.fourier-transform`, was independently confirmed still authored and remains the
  Blueprint's genuine engagement target; `math.de.convolution-theorem`'s now-authored status is
  noted for the record but does not change which probe this concept's mastery gate uses.

## Version History
- 2026-09-19 (Batch 225): authored. Second entry this batch. Companion batch concept:
  `math.fnal.normed-space`.
