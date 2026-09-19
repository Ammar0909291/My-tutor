# math.prob.generating-function

## Identity
- **KG id**: `math.prob.generating-function`
- **Domain**: math.prob
- **Requires**: `math.prob.pmf`, `math.calc.power-series` (Blueprint's own "Prerequisites" field
  listed only `math.prob.pmf` — an incomplete declaration; the live KG's complete two-prerequisite
  list used as authoritative, see Curriculum Feedback)
- **Unlocks**: none
- **Cross-links**: none
- **Difficulty**: expert
- **Bloom level**: apply
- **Mastery threshold**: 0.75
- **Estimated hours**: 4

## Learning Objective
Define the probability generating function (PGF) $G_X(z)=E[z^X]=\sum_kP(X=k)z^k$ for non-negative
integer-valued $X$; compute FALLING FACTORIAL moments via $G^{(r)}(1)=E[X(X-1)\cdots(X-r+1)]$,
never raw moments directly; define the moment generating function (MGF) $M_X(t)=E[e^{tX}]$,
recovering RAW moments via $M^{(r)}(0)=E[X^r]$; apply the PRODUCT rule
$M_{X+Y}(t)=M_X(t)M_Y(t)$ for independent $X,Y$ (never a sum); and use the MGF's uniqueness
property to identify distributions.

## Core Understanding
$G''(1)$ GIVES A FALLING FACTORIAL MOMENT, NEVER $E[X^2]$ DIRECTLY: differentiating
$G(z)=\sum_kP(X=k)z^k$ twice gives $G''(z)=\sum_kk(k-1)P(X=k)z^{k-2}$, so
$G''(1)=\sum_kk(k-1)P(X=k)=E[X(X-1)]=E[X^2]-E[X]$ — NOT $E[X^2]$ itself. The correct raw second
moment requires the CONVERSION $E[X^2]=G''(1)+G'(1)$. For Bernoulli($p$): $G(z)=1-p+pz$,
$G'(1)=p=E[X]$, $G''(1)=0$, so $E[X^2]=0+p=p$ — confirmed directly since $X^2=X$ for a 0/1
variable.

INDEPENDENCE MAKES GENERATING FUNCTIONS MULTIPLY, NEVER ADD: for independent $X,Y$:
$G_{X+Y}(z)=E[z^{X+Y}]=E[z^X\cdot z^Y]=E[z^X]E[z^Y]=G_X(z)G_Y(z)$ — a PRODUCT, mirroring PMF
convolution $P(X+Y=k)=\sum_jP(X=j)P(Y=k-j)$ at the transform level. Adding generating functions
instead, $\sum_k[P(X=k)+P(Y=k)]z^k$, doesn't even integrate to $1$ (it sums to $2$) — it isn't even
a valid probability distribution, confirming the sum is never the correct operation.

THE MGF UNIQUELY DETERMINES THE DISTRIBUTION — IT IS NEVER JUST A MOMENT-COMPUTATION SHORTCUT:
if $M_X(t)=M_Y(t)$ for all $t$ near $0$, then $X$ and $Y$ have the SAME distribution — the MGF
carries ALL distributional information, not merely the moments extracted from its derivatives. For
independent $X\sim N(\mu_1,\sigma_1^2)$, $Y\sim N(\mu_2,\sigma_2^2)$:
$M_{X+Y}(t)=e^{(\mu_1+\mu_2)t+(\sigma_1^2+\sigma_2^2)t^2/2}$ — RECOGNIZABLE as the MGF of
$N(\mu_1+\mu_2,\sigma_1^2+\sigma_2^2)$, and by uniqueness this IS the distribution of $X+Y$, not
merely a distribution sharing the same moments.

## Mental Models
- **"The PGF's derivatives at 1 give falling factorial moments — E[X(X-1)⋯] — always one
  conversion step away from the raw moments E[Xʳ] you actually want."**
- **"Generating functions of independent sums multiply — mirroring how convolving PMFs is the
  coefficient-level shadow of multiplying their transforms."**

## Why Students Fail

### MC-1: MGF-IS-JUST-A-TRICK-NOT-A-DISTRIBUTION-TOOL
- **Surface form**: treats the MGF as merely a computational shortcut for moments, unaware it
  uniquely determines the distribution.
- **Birth type**: Type 5, instruction-induced (Blueprint's own declared birth type — MGFs are
  introduced as "moment machines," and the uniqueness theorem is often mentioned briefly or
  omitted).
- **Repair**: re-walk the sum-of-independent-normals derivation, using uniqueness to conclude the
  EXACT distribution of $X+Y$, not just its moments.

### MC-2: G-PRIME-AT-1-GIVES-E[X-SQUARED]
- **Surface form**: differentiates $G(z)$ once and evaluates at $z=1$, mistakenly expecting
  $E[X^2]$ instead of $E[X]$; or evaluates $G''(1)$ expecting $E[X^2]$ directly.
- **Birth type**: Type 1, overgeneralization (Blueprint's own declared birth type — "derivative at
  a point gives a moment" is applied without tracking the falling-factorial-versus-raw-moment
  distinction).
- **Repair**: re-derive $G''(1)=E[X(X-1)]=E[X^2]-E[X]$ explicitly, verifying
  $E[X^2]=G''(1)+G'(1)$ against the Bernoulli check.

### MC-3: INDEPENDENCE-MEANS-PGFS-ADD
- **Surface form**: writes $G_{X+Y}(z)=G_X(z)+G_Y(z)$ for independent $X,Y$ instead of the
  product $G_X(z)G_Y(z)$.
- **Birth type**: Type 1, overgeneralization (Blueprint's own declared birth type — PMF convolution
  involves a SUM, and students conflate "summing probabilities" with "adding generating
  functions").
- **Repair**: re-derive $G_{X+Y}(z)=E[z^X]E[z^Y]$ from independence directly, confirming the
  additive version fails to even integrate to 1.

## Misconceptions

### MC-1: MGF-IS-JUST-A-TRICK-NOT-A-DISTRIBUTION-TOOL
- **Surface form**: as described above.
- **Root cause (Type 5)**: as described above.
- **Repair**: as described above.

### MC-2: G-PRIME-AT-1-GIVES-E[X-SQUARED]
- **Surface form**: as described above.
- **Root cause (Type 1)**: as described above.
- **Repair**: as described above.

### MC-3: INDEPENDENCE-MEANS-PGFS-ADD
- **Surface form**: as described above.
- **Root cause (Type 1)**: as described above.
- **Repair**: as described above.

## Analogies
- **"A generating function is a probability-encoding machine — each power of z stores a
  probability, and derivatives at the right point unlock summary statistics, one careful
  conversion step away from the raw quantity wanted."**
- **Anti-analogy**: combining independent variables' generating functions is NOT like combining
  their probabilities directly — it's a multiplication at the transform level, exactly mirroring
  convolution at the coefficient level.

## Demonstrations
- **Demonstration 1 (targets MC-2)**: the Bernoulli($p$) PGF check, confirming
  $E[X^2]=G''(1)+G'(1)=p$.
- **Demonstration 2 (targets MC-3)**: the independent-sum product rule
  $G_{X+Y}(z)=G_X(z)G_Y(z)$, contrasted with the invalid, non-normalizing additive version.
- **Demonstration 3 (targets MC-1)**: the sum-of-independent-normals MGF derivation, using
  uniqueness to identify $X+Y\sim N(\mu_1+\mu_2,\sigma_1^2+\sigma_2^2)$ exactly.

## Discovery Questions
1. "Does G''(1) give E[X²] directly, or does it give a falling factorial moment that still needs
   converting?"
2. "For independent X and Y, do their PGFs add or multiply?"
3. "If two random variables have the same MGF, does that just mean they share some moments, or
   does it mean they have the exact same distribution?"

## Teaching Sequence
1. **Representation shift**: the PGF definition and falling-factorial-moment extraction, working
   Demonstration 1, isolating MC-2.
2. **Pattern induction**: the MGF definition, raw-moment extraction, and the independent-sum
   product rule, working Demonstration 2, isolating MC-3.
3. **Conceptual anchor**: the uniqueness theorem and sum-of-normals application, working
   Demonstration 3, isolating MC-1.
4. **Mastery gate**: require a correct PGF-based moment computation with the falling-factorial
   conversion applied, a correct independent-sum PGF/MGF product computation, and a correct
   application of the uniqueness theorem to identify a sum's exact distribution, at the Blueprint's
   own stated MAMR of 4/5.

## Tutor Actions
- Never accept $G''(1)$ reported as $E[X^2]$ without the $+G'(1)$ conversion.
- Never accept $G_{X+Y}(z)=G_X(z)+G_Y(z)$ for independent $X,Y$.
- Never accept the MGF treated as merely a moment-computation shortcut without acknowledging its
  uniqueness property.

## Voice Teaching Notes
- Say "is that the falling factorial moment, or have you converted it to the raw moment you
  actually want?" whenever a PGF derivative is evaluated at 1.
- When independent variables are summed, ask "do their generating functions add or multiply?"

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly computes a PGF and extracts $E[X]$ and $\text{Var}(X)$
  via the falling-factorial conversion.
- **Rung 2 (application)**: learner correctly applies the product rule to show a sum of independent
  Poissons is Poisson via MGFs or PGFs.
- **Rung 3 (transfer)**: learner correctly connects generating functions to characteristic
  functions, compound PGFs, and the Z-transform's convolution theorem.

## Tutor Recovery Strategy
- If MC-1 recurs, re-walk the sum-of-normals uniqueness-based identification.
- If MC-2 recurs, re-derive $G''(1)=E[X^2]-E[X]$ against the Bernoulli check.
- If MC-3 recurs, re-derive the independent-sum product rule from $E[z^X\cdot z^Y]=E[z^X]E[z^Y]$.

## Memory Hooks
- "G''(1) is a falling factorial moment — add G'(1) to get the raw second moment."
- "Independent sums multiply generating functions — never add them."
- "The MGF doesn't just give moments — matching MGFs means matching distributions, by
  uniqueness."

## Transfer Connections
- `math.prob.pmf` (already authored, certified domain): supplies the PMF $P(X=k)$ this concept's
  PGF directly encodes as power-series coefficients.
- `math.calc.power-series` (already authored, certified domain): supplies the power-series
  machinery (convergence, term-by-term differentiation) underlying the PGF's definition and moment
  extraction.
- `math.prob.mgf` (already authored, this campaign, Batch 128): the KG's declared related concept,
  supplying the moment generating function developed alongside the PGF in this entry.

## Cross-Subject Connections
- None formal.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.prob.generating-function.md`, reused by
  reference for its PGF/MGF definitions, its falling-factorial-moment derivation, its independent-
  sum product rule, its sum-of-normals uniqueness application, and its three-misconception register
  (birth types adopted directly as declared).
- Transfer probe: the Blueprint's own independence-mode probe, connecting generating functions to
  characteristic functions (the CLT proof tool), compound PGFs, and the Z-transform's convolution
  theorem.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Incomplete Blueprint metadata found and corrected**: the Blueprint's own "Prerequisites" field
  lists only `math.prob.pmf`, omitting `math.calc.power-series` — the live KG's complete
  two-prerequisite `requires` field used as authoritative throughout this entry (this pattern last
  occurred at Batch 143's `poisson-process` and Batch 142's `transition-matrix`). All other fields
  (unlocks none, cross_links none, expert/apply, mastery_threshold 0.75, estimated_hours 4) matched
  exactly.

## Version History
- 2026-09-19 (Batch 145): authored. Second entry this batch. Companion batch concept:
  `math.prob.convergence-types`.
