# math.stats.power

## Identity
- **KG id**: `math.stats.power`
- **Domain**: math.stats
- **Requires**: `math.stats.type-errors`
- **Unlocks**: none
- **Cross-links**: none
- **Difficulty**: proficient
- **Bloom level**: analyze
- **Mastery threshold**: 0.8
- **Estimated hours**: 4

## Learning Objective
Define power $=P(\text{reject }H_0\mid H_1\text{ true})=1-\beta$ — NEVER an independent quantity
requiring separate computation from $\beta$; identify the three factors that increase power
(larger sample size, larger effect size, larger $\alpha$), recognizing each carries its OWN
tradeoff, NEVER a cost-free improvement; and apply power analysis as a PRE-STUDY planning tool,
NEVER a post-hoc justification computed after already seeing non-significant results.

## Core Understanding
POWER IS DIRECTLY $1-\beta$ — NEVER A SEPARATELY COMPUTED, UNRELATED QUANTITY: given $\beta=0.2$
for a test scenario, power $=1-0.2=0.8$ (80%) — power and $\beta$ are NOT two independent numbers
requiring separate derivation; once one is known, the other follows IMMEDIATELY by this direct
relationship. Treating power as something requiring its own separate calculation, unconnected to
$\beta$, misses that they are literally complementary probabilities of the same random event
(correctly detecting $H_1$ versus failing to detect it).

EVERY POWER-INCREASING FACTOR CARRIES ITS OWN GENUINE TRADEOFF — NEVER A COST-FREE IMPROVEMENT:
three factors increase power — larger SAMPLE SIZE $n$ (costs more time/resources to collect),
larger EFFECT SIZE (a property of REALITY, not something a researcher can simply choose to
increase), and larger $\alpha$ (a more lenient threshold, but this DIRECTLY increases the Type I
error rate — more false positives). Recommending "just increase $\alpha$" to boost power without
naming the corresponding rise in false-positive risk misses that EVERY lever here has a real cost —
never a free lunch.

POWER ANALYSIS IS A PRE-STUDY PLANNING TOOL — NEVER A POST-HOC JUSTIFICATION: a researcher who
finds a NON-significant result and THEN computes "post-hoc power" using the observed effect size
FROM THAT SAME STUDY, arguing "our power was low, so the non-significant result doesn't mean
much," is using a mathematically near-direct function of the p-value itself — providing NO
genuinely new information. Genuine power analysis uses an ASSUMED (not-yet-observed) effect size,
conducted BEFORE data collection, to determine an appropriate sample size in advance; computing it
retrospectively from the SAME data serves no genuine planning purpose and is widely regarded as
statistically uninformative or misleading.

## Mental Models
- **"Power is just 1 minus beta — never a separate number needing its own computation."**
- **"Every dial that turns power up also turns something else's cost up — more data costs
  resources, a bigger effect isn't yours to choose, a looser α invites more false alarms."**
- **"Power analysis is a blueprint drawn before building, never a post-mortem excuse drawn after
  the building already failed."**

## Why Students Fail

### MC-1: POWER-AND-BETA-TREATED-AS-UNRELATED-QUANTITIES-REQUIRING-SEPARATE-COMPUTATION
- **Surface form**: treats power and $\beta$ (Type II error rate) as independent, separately-
  computed quantities rather than recognizing power is directly $1-\beta$.
- **Birth type**: Foundational severity (Blueprint's own declared severity).
- **Repair**: re-state the defining relationship $\text{power}=1-\beta$ explicitly.

### MC-2: POWER-INCREASING-ACTIONS-ASSUMED-COST-FREE-WITHOUT-RECOGNIZING-THEIR-TRADEOFFS
- **Surface form**: assumes a power-increasing action (like raising $\alpha$ or sample size) is a
  universally beneficial improvement with no accompanying cost or tradeoff.
- **Birth type**: Foundational severity (Blueprint's own declared severity).
- **Repair**: re-examine each power-increasing factor explicitly, naming its associated cost.

## Misconceptions

### MC-1: POWER-AND-BETA-TREATED-AS-UNRELATED-QUANTITIES-REQUIRING-SEPARATE-COMPUTATION
- **Surface form**: as described above.
- **Root cause (Foundational)**: as described above.
- **Repair**: as described above.

### MC-2: POWER-INCREASING-ACTIONS-ASSUMED-COST-FREE-WITHOUT-RECOGNIZING-THEIR-TRADEOFFS
- **Surface form**: as described above.
- **Root cause (Foundational)**: as described above.
- **Repair**: as described above.

## Analogies
- **"Power and beta are two sides of the same coin — heads (detect it) and tails (miss it) — never
  two coins needing separate flips."**
- **Anti-analogy**: cranking up a metal detector's sensitivity to catch more weapons (higher
  power) also means more false alarms on belt buckles (more Type I errors) — never a pure
  upgrade with no downside.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: the direct $\beta=0.2\Rightarrow\text{power}=0.8$
  computation.
- **Demonstration 2 (targets MC-2)**: the three power-increasing factors, each paired with its
  genuine tradeoff.
- **Demonstration 3**: the post-hoc-power-from-a-non-significant-result critique, contrasted with
  genuine pre-study power analysis.

## Discovery Questions
1. "If you know β for a test, do you need a separate calculation to find its power, or does it
   follow immediately?"
2. "Is raising α to boost power a cost-free improvement, or does it come with a tradeoff?"
3. "Is computing 'power' after already seeing a non-significant result the same as genuine power
   analysis done before the study?"

## Teaching Sequence
1. **Conceptual shift**: the direct $\text{power}=1-\beta$ derivation, working Demonstration 1,
   isolating MC-1.
2. **Contrast pair**: the three power-increasing factors and their tradeoffs, working
   Demonstration 2, isolating MC-2.
3. **Reused procedure**: the pre-study-versus-post-hoc power analysis critique, working
   Demonstration 3.
4. **Mastery gate**: require a correct power-from-beta computation, a correct identification of a
   tradeoff for a given power-increasing factor, and a correct explanation of why power analysis
   belongs before data collection, at the Blueprint's own stated MAMR of 4/5.

## Tutor Actions
- Never accept power computed as anything other than directly $1-\beta$.
- Never accept a power-increasing recommendation stated without its accompanying tradeoff.
- Never accept "post-hoc power analysis" treated as methodologically equivalent to pre-study
  power analysis.

## Voice Teaching Notes
- Say "what is β here — because power is just 1 minus that" whenever power is being computed.
- Ask "what does this action cost you, in exchange for higher power?" whenever a power-increasing
  strategy is proposed.

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly computes power directly from a given $\beta$.
- **Rung 2 (application)**: learner correctly names a power-increasing factor's tradeoff.
- **Rung 3 (transfer)**: learner correctly plans a pre-study sample-size determination using an
  assumed effect size, explaining why this differs from a post-hoc power computation.

## Tutor Recovery Strategy
- If MC-1 recurs, re-state $\text{power}=1-\beta$ explicitly.
- If MC-2 recurs, re-examine each power-increasing factor's cost explicitly.

## Memory Hooks
- "Power is 1 minus beta — never a separate number."
- "Every power dial has a cost dial attached — never a free lunch."
- "Power analysis belongs before the study, never as an after-the-fact excuse."

## Transfer Connections
- `math.stats.type-errors` (already authored, this campaign, Batch 203): supplies the Type II
  error rate $\beta$ that power is directly defined as $1-\beta$ of.

## Cross-Subject Connections
- Clinical trial design: determining enrollment size before a trial begins, to ensure adequate
  power for detecting a clinically meaningful effect, is a standard, legally/ethically expected
  planning step in medical research.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.stats.power.md`, reused by reference for its
  direct power-from-beta computation, its three-factor tradeoff analysis, its post-hoc-power
  critique, and its two-misconception registry (severity levels adopted directly as declared).
- Transfer probe: the Blueprint's own independence-mode probe on planning a clinical trial's
  sample size before the trial begins, using an assumed effect size for 80% power.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires
  `math.stats.type-errors`, unlocks none, cross_links none, proficient/analyze,
  mastery_threshold 0.8, estimated_hours 4) was directly verified against the live KG and matches
  exactly.

## Version History
- 2026-09-19 (Batch 204): authored. Second entry this batch. Companion batch concept:
  `math.stats.p-value`.
