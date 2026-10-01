# math.prob.conditional-distribution

## Identity
- **KG id**: `math.prob.conditional-distribution`
- **Domain**: math.prob
- **Requires**: `math.prob.joint-distribution`, `math.prob.conditional-probability`
- **Unlocks**: `math.prob.conditional-expectation`
- **Cross-links**: none
- **Difficulty**: proficient
- **Bloom level**: apply
- **Mastery threshold**: 0.8
- **Estimated hours**: 5

## Learning Objective
Define $f_{X|Y}(x|y)=f(x,y)/f_Y(y)$ as conditional probability's OWN structure applied to an
ENTIRE distribution (never a genuinely new probability concept); compute a conditional
distribution and verify it is GENUINELY normalized (never merely a "proportional rescaling"); and
recognize conditional expectation $E[X|Y=y]$ as an average over the CONDITIONAL distribution,
which can genuinely DIFFER from the marginal expectation $E[X]$ (never assumed equal).

## Core Understanding
THE CONDITIONAL DISTRIBUTION FORMULA IS CONDITIONAL PROBABILITY, APPLIED TO ENTIRE DISTRIBUTIONS
— NEVER A NEW CONCEPT: for joint PMF $f(1,1)=0.1$, $f(1,2)=0.2$, $f(2,1)=0.3$, $f(2,2)=0.4$:
$f_Y(1)=f(1,1)+f(2,1)=0.4$. Then $f_{X|Y}(1|1)=0.1/0.4=0.25$ and $f_{X|Y}(2|1)=0.3/0.4=0.75$ —
this DIRECTLY matches `math.prob.conditional-probability`'s $P(A|B)=P(A\cap B)/P(B)$ structure,
with $f(x,y)$ playing the role of $P(A\cap B)$ and $f_Y(y)$ playing the role of $P(B)$. This is
the SAME conditioning idea, NEVER a separately invented probability concept, just applied ACROSS
an entire distribution over $x$ instead of a single event.

DIVIDING BY THE MARGINAL GUARANTEES PROPER NORMALIZATION — NEVER MERELY A RESCALING: checking
$f_{X|Y}(1|1)+f_{X|Y}(2|1)=0.25+0.75=1$ — this is GUARANTEED, never a coincidence, because
$f_Y(1)=f(1,1)+f(2,1)$ is EXACTLY the sum of the numerators used, so dividing EACH numerator by
that SAME sum ALWAYS produces terms summing to 1. The result is NOT merely "proportional to a
distribution" — dividing by the marginal IS exactly the normalization that makes it a genuine,
properly normalized probability distribution in its own right.

CONDITIONAL EXPECTATION CAN GENUINELY DIFFER FROM MARGINAL EXPECTATION — NEVER ASSUMED EQUAL:
using $f_{X|Y}(1|1)=0.25$, $f_{X|Y}(2|1)=0.75$: $E[X|Y=1]=1(0.25)+2(0.75)=1.75$. The MARGINAL
expectation from the SAME joint distribution is $E[X]=1(0.3)+2(0.7)=1.7$ — GENUINELY DIFFERENT
from $E[X|Y=1]=1.75$. Conditioning on $Y=1$ SHIFTS the expected value away from the unconditional
average, because it averages over a DIFFERENT (conditional, not marginal) distribution — never
the same number by default, since "the expected value of $X$" depends on WHICH distribution you
average over.

## Mental Models
- **"Conditional distribution is P(A|B) scaled up to work on a whole distribution at once —
  never a brand new idea."**
- **"Dividing by the marginal isn't a cosmetic rescale — it's precisely the normalization that
  makes the result sum to exactly 1."**
- **"Conditioning changes which distribution you're averaging over — expect the expected value
  to shift, not stay put."**

## Why Students Fail

### MC-1: CONDITIONAL-DISTRIBUTION-ASSUMED-NEW-CONCEPT
- **Surface form**: believes the conditional distribution formula is a genuinely new probability
  concept, missing that it is conditional probability's own structure applied across an entire
  distribution.
- **Birth type**: Foundational severity (Blueprint's own declared severity — the new notation and
  distribution-level framing obscure the underlying identical structure).
- **Repair**: re-walk the direct structural match to `math.prob.conditional-probability`'s
  formula.

### MC-2: CONDITIONAL-DISTRIBUTION-ASSUMED-MERELY-RESCALED
- **Surface form**: believes the result of dividing joint values by the marginal is merely a
  "proportional" rescaling, missing that this division guarantees proper normalization.
- **Birth type**: High severity (Blueprint's own declared severity — "dividing by a constant"
  sounds like mere rescaling rather than a normalization guarantee).
- **Repair**: re-walk the guaranteed-sum-to-1 verification, connecting it to the marginal being
  the exact sum of the numerators.

### MC-3: CONDITIONAL-EXPECTATION-ASSUMED-EQUAL-TO-MARGINAL
- **Surface form**: believes the conditional expectation must equal the ordinary (marginal)
  expectation, missing that conditioning shifts the distribution being averaged over.
- **Birth type**: Moderate severity (Blueprint's own declared severity — "the expected value of
  X" sounds like it should be one fixed number regardless of conditioning).
- **Repair**: re-walk the numeric mismatch between $E[X|Y=1]$ and $E[X]$ from the identical joint
  distribution.

## Misconceptions

### MC-1: CONDITIONAL-DISTRIBUTION-ASSUMED-NEW-CONCEPT
- **Surface form**: as described above.
- **Root cause (Foundational)**: as described above.
- **Repair**: as described above.

### MC-2: CONDITIONAL-DISTRIBUTION-ASSUMED-MERELY-RESCALED
- **Surface form**: as described above.
- **Root cause (High)**: as described above.
- **Repair**: as described above.

### MC-3: CONDITIONAL-EXPECTATION-ASSUMED-EQUAL-TO-MARGINAL
- **Surface form**: as described above.
- **Root cause (Moderate)**: as described above.
- **Repair**: as described above.

## Analogies
- **"Conditioning is zooming the sample space in on B and re-normalizing what's left — the
  conditional distribution formula does exactly this, just across a whole distribution instead
  of one event."**
- **Anti-analogy**: the conditional expectation is not "the same expected value viewed through a
  different lens" — it's a genuinely different number, because it averages over a genuinely
  different distribution.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: the direct structural match between $f_{X|Y}(x|y)$ and
  $P(A|B)$.
- **Demonstration 2 (targets MC-2)**: the guaranteed-sum-to-1 verification for the conditional
  distribution.
- **Demonstration 3 (targets MC-3)**: the $E[X|Y=1]=1.75$ versus $E[X]=1.7$ numeric contrast.

## Discovery Questions
1. "Is the conditional distribution formula $f_{X|Y}(x|y)=f(x,y)/f_Y(y)$ a genuinely new
   probability concept, unrelated to conditional probability $P(A|B)$?"
2. "Is the result of computing $f(x,y)/f_Y(y)$ for each $x$ merely a 'proportional' or
   'rescaled' version of the joint row, or a genuine, properly normalized distribution?"
3. "Should the conditional expectation $E[X|Y=y]$ always equal the ordinary (marginal)
   expectation $E[X]$?"

## Teaching Sequence
1. **Representation shift**: the direct structural match to conditional probability, working
   Demonstration 1, isolating MC-1.
2. **Conflict evidence**: the guaranteed normalization verification, working Demonstration 2,
   isolating MC-2.
3. **Contrast pair**: the conditional-versus-marginal expectation numeric mismatch, working
   Demonstration 3, isolating MC-3.
4. **Mastery gate**: require a correct conditional distribution computation from a joint PMF, a
   correct normalization verification with an explanation of why it's guaranteed, and a correct
   conditional expectation computation contrasted with the marginal, at the Blueprint's own
   stated MAMR of 4/5.

## Tutor Actions
- Never accept the conditional distribution formula treated as an unrelated new concept rather
  than conditional probability applied to a whole distribution.
- Never accept the normalization of a conditional distribution dismissed as coincidental rather
  than guaranteed.
- Never accept a claim that conditional expectation must equal the marginal expectation.

## Voice Teaching Notes
- Say "how does this match the conditional probability formula you already know?" whenever a
  conditional distribution is introduced.
- Ask "does this sum to 1 by coincidence, or is that guaranteed by the definition?" whenever a
  conditional distribution's normalization is checked.

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly computes a conditional distribution from a joint
  PMF by dividing by the correct marginal.
- **Rung 2 (application)**: learner correctly verifies the conditional distribution sums to 1 and
  explains why this is guaranteed.
- **Rung 3 (transfer)**: learner correctly computes a conditional expectation and correctly
  contrasts it with the marginal expectation from the same joint distribution.

## Tutor Recovery Strategy
- If MC-1 recurs, re-walk the structural match to conditional probability.
- If MC-2 recurs, re-walk the guaranteed-sum-to-1 verification.
- If MC-3 recurs, re-walk the conditional-versus-marginal expectation numeric contrast.

## Memory Hooks
- "Conditional distribution IS conditional probability, applied to a whole distribution."
- "Dividing by the marginal guarantees the sum is exactly 1 — never a coincidence."
- "Conditioning changes the distribution you average over — expect the expectation to shift."

## Transfer Connections
- `math.prob.joint-distribution` (already authored, this campaign, Batch 197): supplies the
  joint PMF/PDF $f(x,y)$ this concept conditions and normalizes.
- `math.prob.conditional-probability` (already authored, certified domain): supplies the
  $P(A|B)=P(A\cap B)/P(B)$ template this concept's formula generalizes to entire distributions.
- `math.prob.conditional-expectation` (not yet authored, KG's declared unlock): builds directly
  on this concept's orientation-level introduction to conditional expectation.

## Cross-Subject Connections
- Quality control: comparing a defect count's conditional distribution across different
  production lines, a direct application of conditioning on a categorical variable.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.prob.conditional-distribution.md`, reused
  by reference for its structural-match derivation, its normalization verification, its
  conditional-versus-marginal expectation contrast, and its three-misconception registry
  (severity levels adopted directly as declared).
- Transfer probe: the Blueprint's own independence-mode probe on a quality-control process
  comparing defect-count conditional distributions across two production lines.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires
  `math.prob.joint-distribution`/`math.prob.conditional-probability`, unlocks
  `math.prob.conditional-expectation`, cross_links none, proficient/apply,
  mastery_threshold 0.8, estimated_hours 5) was directly verified against the live KG and matches
  exactly.

## Version History
- 2026-09-19 (Batch 198): authored. Second entry this batch. Companion batch concept:
  `math.prob.covariance`.
