# math.stats.standard-error

## Identity
- **KG id**: `math.stats.standard-error`
- **Domain**: math.stats
- **Requires**: `math.stats.sampling-distribution`
- **Unlocks**: none
- **Cross-links**: none
- **Difficulty**: proficient
- **Bloom level**: apply
- **Mastery threshold**: 0.85
- **Estimated hours**: 3

## Learning Objective
Compute $SE(\bar X)=\sigma/\sqrt n$ (or $s/\sqrt n$ when $\sigma$ is unknown), never dividing by
raw $n$ or reporting the raw standard deviation directly; recognize SE decreases with $n$ via the
SQUARE ROOT — quadrupling $n$ HALVES SE, never quarters it; and recognize SE IS, by definition,
the standard deviation of the SAMPLING DISTRIBUTION — a fundamentally DIFFERENT quantity from the
raw data's standard deviation within one sample, never used interchangeably.

## Core Understanding
SE REQUIRES DIVIDING BY $\sqrt n$ — NEVER $n$ ITSELF OR THE RAW STANDARD DEVIATION ALONE: for
$n=25$, $s=10$: $SE=10/\sqrt{25}=10/5=2$. A common error reports $s=10$ directly, or divides by
$n$ instead of $\sqrt n$ (giving $10/25=0.4$, WRONG) — the standard error SPECIFICALLY requires
the SQUARE ROOT of $n$ in the denominator, a genuinely different computation from either the raw
standard deviation or a naive $1/n$ scaling.

QUADRUPLING $n$ HALVES SE — NEVER QUARTERS IT: if $SE=4$ at $n=16$, increasing to $n=64$
(QUADRUPLED): since $\sqrt{64}=2\sqrt{16}$ ($\sqrt n$ DOUBLES when $n$ quadruples), the new
$SE=4/2=2$ — HALVED, NEVER reduced to a quarter. A common error assumes quadrupling $n$ should
QUARTER SE (treating the relationship as directly proportional to $n$ rather than $\sqrt n$) —
because of the square root, SE shrinks more SLOWLY than $n$ grows, producing DIMINISHING returns
as sample size increases, never a proportional payoff.

SE IS THE SAMPLING DISTRIBUTION'S OWN STANDARD DEVIATION — NEVER THE SAME AS THE RAW DATA'S
STANDARD DEVIATION: for 100 exam scores with sample standard deviation $s=12$: this $s=12$
describes how SPREAD OUT the individual scores are WITHIN this one sample. The standard error
$12/\sqrt{100}=1.2$ describes how much the SAMPLE MEAN ITSELF would vary if the sampling were
REPEATED many times — a MUCH SMALLER number, reflecting that averages are more stable than
individual data points. These two quantities answer GENUINELY DIFFERENT QUESTIONS (spread of
individual data vs. variability of the sample mean across repeated sampling) — NEVER
interchangeable, whichever is asked for.

## Mental Models
- **"Standard error divides by √n, never n itself — a genuinely different computation from the
  raw standard deviation."**
- **"Quadruple your sample size, halve your standard error — never a proportional quartering;
  the square root always slows the payoff."**
- **"Standard error measures how the AVERAGE would wobble across repeated sampling — never how
  spread out the raw data within one sample already is."**

## Why Students Fail

### MC-1: STANDARD-ERROR-COMPUTED-WITHOUT-DIVIDING-BY-SQUARE-ROOT-OF-N
- **Surface form**: reports the raw standard deviation, or divides by $n$ instead of the square
  root of $n$, when computing the standard error.
- **Birth type**: Foundational severity (Blueprint's own declared severity — produces a
  numerically wrong value with real practical consequences).
- **Repair**: re-derive the formula explicitly, confirming the square root's role.

### MC-2: SAMPLE-SIZE-INCREASE-ASSUMED-TO-SCALE-STANDARD-ERROR-PROPORTIONALLY-RATHER-THAN-VIA-SQUARE-ROOT
- **Surface form**: assumes the standard error scales directly (proportionally) with sample size
  changes, rather than via the square root relationship.
- **Birth type**: Foundational severity (Blueprint's own declared severity — a fundamentally
  incorrect scaling prediction, e.g. underestimating sample size needs).
- **Repair**: re-derive using $\sqrt{4n}=2\sqrt n$ explicitly, confirming the square-root scaling.

## Misconceptions

### MC-1: STANDARD-ERROR-COMPUTED-WITHOUT-DIVIDING-BY-SQUARE-ROOT-OF-N
- **Surface form**: as described above.
- **Root cause (Foundational)**: as described above.
- **Repair**: as described above.

### MC-2: SAMPLE-SIZE-INCREASE-ASSUMED-TO-SCALE-STANDARD-ERROR-PROPORTIONALLY-RATHER-THAN-VIA-SQUARE-ROOT
- **Surface form**: as described above.
- **Root cause (Foundational)**: as described above.
- **Repair**: as described above.

## Analogies
- **"Standard error is not a shrunk-down copy of the raw standard deviation — it's a genuinely
  different quantity, measured by dividing by a square root, never by n itself."**
- **Anti-analogy**: quadrupling your data is not "four times the precision" — the square root
  means you only get half the improvement a naive linear intuition would predict.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: the explicit $10/\sqrt{25}=2$ computation, contrasted with
  the incorrect $10/25$ alternative.
- **Demonstration 2 (targets MC-2)**: the $n=16\to64$ (quadrupled) SE-halving derivation via
  $\sqrt{4n}=2\sqrt n$.
- **Demonstration 3**: the raw-standard-deviation-versus-standard-error contrast for 100 exam
  scores.

## Discovery Questions
1. "Is the standard error computed by dividing by $n$, or by the square root of $n$?"
2. "If you quadruple your sample size, does the standard error get cut to a quarter, or to a
   half?"
3. "Is the standard error the same thing as the standard deviation of the raw data in your
   sample?"

## Teaching Sequence
1. **Conceptual shift**: the explicit $\sqrt n$-division computation, working Demonstration 1,
   isolating MC-1.
2. **Contrast pair**: the quadrupling-halves-not-quarters derivation, working Demonstration 2,
   isolating MC-2.
3. **Representation shift**: the standard-error-versus-raw-standard-deviation distinction,
   working Demonstration 3.
4. **Mastery gate**: require a correct standard-error computation, a correct scaling prediction
   for a quadrupled sample size, and a correct explanation distinguishing standard error from raw
   standard deviation, at the Blueprint's own stated MAMR of 5/5.

## Tutor Actions
- Never accept the standard error computed by dividing by $n$ rather than $\sqrt n$.
- Never accept a claim that quadrupling the sample size quarters the standard error.
- Never accept the standard error and the raw sample standard deviation used interchangeably.

## Voice Teaching Notes
- Say "did you take the square root of n before dividing?" whenever a standard error is computed.
- Ask "is this question about the spread of the raw data, or about how the sample mean itself
  would vary?" whenever standard error is compared to standard deviation.

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly computes the standard error using $\sigma/\sqrt n$
  or $s/\sqrt n$.
- **Rung 2 (application)**: learner correctly predicts the new standard error after a stated
  change in sample size.
- **Rung 3 (transfer)**: learner correctly explains why doubling a poll's sample size does not
  halve the margin of error, and why standard error is the relevant precision measure rather than
  raw response variability.

## Tutor Recovery Strategy
- If MC-1 recurs, re-derive the formula explicitly, confirming the square root's role.
- If MC-2 recurs, re-derive using $\sqrt{4n}=2\sqrt n$ explicitly.

## Memory Hooks
- "Divide by √n — never n itself."
- "Quadruple n, halve SE — never quarter it."
- "Standard error is the sampling distribution's spread — never the raw data's spread."

## Transfer Connections
- `math.stats.sampling-distribution` (already authored, this campaign, Batch 199): supplies the
  sampling-distribution framework this concept's standard error IS the standard deviation of.

## Cross-Subject Connections
- Survey research: the margin of error reported in political polling is directly derived from
  the standard error, with diminishing-returns sample-size scaling a genuinely important
  practical consideration.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.stats.standard-error.md`, reused by
  reference for its basic computation example, its quadrupling-halves-SE derivation, its
  raw-standard-deviation-versus-standard-error contrast, and its two-misconception registry
  (severity levels adopted directly as declared).
- Transfer probe: the Blueprint's own independence-mode probe on a polling company's margin of
  error, explaining why doubling respondents does not halve the standard error.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires
  `math.stats.sampling-distribution`, unlocks none, cross_links none, proficient/apply,
  mastery_threshold 0.85, estimated_hours 3) was directly verified against the live KG and
  matches exactly.

## Version History
- 2026-09-19 (Batch 200): authored. First entry this batch. Companion batch concept:
  `math.stats.estimator`.
