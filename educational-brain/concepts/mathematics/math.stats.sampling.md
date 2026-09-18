# math.stats.sampling

## Identity
- **KG id**: `math.stats.sampling`
- **Domain**: math.stats
- **Requires**: `math.stats.population-sample`, `math.prob.probability-axioms`
- **Unlocks**: `math.stats.sampling-distribution`
- **Cross-links**: none
- **Difficulty**: developing
- **Bloom level**: understand
- **Mastery threshold**: 0.85
- **Estimated hours**: 3

## Learning Objective
Define SIMPLE RANDOM SAMPLING (SRS: every unit, and every subset of a given size, equally
likely) and distinguish it from STRATIFIED sampling (SRS WITHIN every stratum) and CLUSTER
sampling (WHOLE clusters selected, all units inside included); explain why sample SIZE alone
never compensates for a biased sampling METHOD; and recognize "random" as a precise procedural
guarantee (known, typically equal, selection probabilities), never a synonym for haphazard or
convenient.

## Core Understanding
STRATIFIED SAMPLES WITHIN EVERY GROUP; CLUSTER SAMPLES WHOLE GROUPS: for a population divided into
groups, STRATIFIED sampling draws an independent SRS WITHIN each stratum — every stratum
contributes SOME units, guaranteeing representation across all groups. CLUSTER sampling instead
randomly selects WHOLE clusters and includes EVERY unit inside them — only a FEW clusters
contribute, but those contribute completely. Both start with "divide into groups," but what
happens NEXT is opposite: sample within groups (stratified) versus sample between groups
(cluster) — a hospital drawing 3 patients from EACH of 8 wards is stratified; randomly selecting
2 of the 8 wards and surveying EVERY patient in them is cluster.

SAMPLE SIZE CONTROLS PRECISION; SAMPLING METHOD CONTROLS WHETHER THE ESTIMATE IS CENTERED
CORRECTLY: in 1936, *Literary Digest* mailed 10 million postcards (drawn from telephone
directories and car registrations — systematically excluding poorer voters) and received 2.4
MILLION responses, predicting the WRONG president; Gallup's much smaller (~50,000) genuinely
random sample got it right. Every additional biased response is drawn from the SAME flawed
frame — a larger biased sample makes the WRONG estimate more PRECISELY wrong, never more correct.
Size reduces spread AROUND whatever the method is already centered on; it never corrects a
systematically biased center.

"RANDOM" IS A CONTROLLED PROCEDURE WITH KNOWN PROBABILITIES, NEVER A SYNONYM FOR HAPHAZARD:
directly reusing `math.prob.probability-axioms`'s own machinery, "random" means every unit has a
KNOWN, pre-specified (typically equal) probability of selection — a controlled procedure, decided
BEFORE data collection. "I randomly asked shoppers in the mall parking lot" is NOT a random
sample statistically — every uncontrolled feature of who happens to be there creates systematic
selection (a CONVENIENCE sample); genuine randomization requires assigning every unit a number
and using a controlled draw with known, equal selection probabilities.

## Mental Models
- **"Stratified spreads a thin slice across every group; cluster fully shades a few whole groups
  and leaves the rest blank — the same first step, opposite second steps."**
- **"Sample size only tightens the spread around wherever the method already points — a biased
  method's huge sample is precisely wrong, never corrected by volume."**

## Why Students Fail

### MC-1: LARGER-SAMPLE-FIXES-BIAS
- **Surface form**: believes a large biased sample is more reliable than a small properly
  randomized one.
- **Birth type**: Type 1, overgeneralization (Blueprint's own declared FOUNDATIONAL severity —
  "more data = more accurate" is intuitive but ignores that a biased method sharpens a wrong
  center rather than correcting it).
- **Repair**: re-walk the Literary Digest/Gallup 1936 contrast, confirming size never fixes a
  flawed selection frame.

### MC-2: STRATIFIED-CLUSTER-CONFUSION
- **Surface form**: conflates stratified sampling (SRS within each subgroup, all represented)
  with cluster sampling (whole subgroups selected, only some represented, but fully).
- **Birth type**: Type 3, language contamination (Blueprint's own declared trigger — both methods
  begin with "divide into groups," obscuring their genuinely opposite second steps).
- **Repair**: re-diagram the "sample within every group" versus "sample whole groups, skip the
  rest" contrast directly.

### MC-3: RANDOM-MEANS-HAPHAZARD
- **Surface form**: uses "random" to mean arbitrary, unplanned, or convenient, rather than a
  procedure with known, typically equal selection probabilities.
- **Birth type**: Type 3, language contamination (Blueprint's own declared trigger — everyday
  "random" means unplanned, obscuring the precise statistical meaning).
- **Repair**: re-anchor on the controlled-procedure definition directly, contrasting a genuine
  random draw against a convenience sample.

## Misconceptions

### MC-1: LARGER-SAMPLE-FIXES-BIAS
- **Surface form**: as described above.
- **Root cause (Type 1)**: as described above.
- **Repair**: as described above.

### MC-2: STRATIFIED-CLUSTER-CONFUSION
- **Surface form**: as described above.
- **Root cause (Type 3)**: as described above.
- **Repair**: as described above.

### MC-3: RANDOM-MEANS-HAPHAZARD
- **Surface form**: as described above.
- **Root cause (Type 3)**: as described above.
- **Repair**: as described above.

## Analogies
- **"Cluster sampling opens a few whole drawers completely; stratified sampling opens every
  drawer just a crack — same cabinet, opposite strategies."**
- **Anti-analogy**: "whoever happens to walk by" is NOT a random sample — genuine randomness
  requires the surveyor to control selection with known probabilities, the opposite of
  convenience.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: Literary Digest's 2.4 million biased responses predicted
  the wrong 1936 president; Gallup's ~50,000 genuinely random responses predicted correctly —
  method, not size, determined accuracy.
- **Demonstration 2 (targets MC-2)**: a hospital survey drawing 3 patients from EACH of 8 wards
  (stratified, all wards represented) versus randomly selecting 2 of 8 wards and surveying EVERY
  patient in them (cluster, only 2 wards represented, but completely).
- **Demonstration 3 (targets MC-3)**: "I randomly asked shoppers in the parking lot" is a
  convenience sample (uncontrolled, unknown selection probabilities); assigning every registered
  shopper a number and using a computer to draw 200 uniformly at random is genuinely random
  (known, equal, pre-specified probabilities).

## Discovery Questions
1. "Does surveying 100,000 self-selected online respondents beat a random sample of 1,000?"
2. "If a population is divided into groups and only some groups are surveyed completely, is that
   stratified or cluster sampling?"
3. "Is asking whoever happens to be nearby the same as a random sample?"

## Teaching Sequence
1. **Representation shift**: trace SRS, stratified, and cluster sampling mechanically on a small
   concrete population before naming any method formally.
2. **Contrast pair**: Demonstration 1's Literary Digest/Gallup case, isolating MC-1 by requiring
   method be evaluated independently of size.
3. **Contrast pair**: Demonstration 2's stratified-versus-cluster procedural comparison, isolating
   MC-2 by requiring the specific post-division step identified.
4. **Contrast pair**: Demonstration 3's genuine-random-versus-convenience comparison, isolating
   MC-3 by requiring known, pre-specified probabilities as the deciding criterion.
5. **Mastery gate**: require a correct sampling-method classification, a correct size-versus-
   method evaluation, and a correct random-versus-convenience determination, at the Blueprint's
   own stated MAMR of 5/5 (⌈0.85×5⌉).

## Tutor Actions
- Never accept a larger sample judged more trustworthy without evaluating its selection method
  first.
- Never accept "random" used to mean unplanned or convenient without the known-probability
  criterion applied.

## Voice Teaching Notes
- Say "does that sample's method matter more here than its size?" whenever a size comparison is
  made between samples.
- When a sample is called "random," ask "did every unit have a known, pre-specified probability
  of being chosen?"

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly classifies a new sampling procedure as SRS,
  stratified, cluster, or convenience.
- **Rung 2 (application)**: learner correctly evaluates a size-versus-method tradeoff between two
  competing sampling proposals.
- **Rung 3 (transfer)**: learner correctly ranks THREE new sampling proposals by likely accuracy,
  justifying the ranking via method rather than size alone.

## Tutor Recovery Strategy
- If MC-1 recurs, re-walk the Literary Digest/Gallup contrast directly.
- If MC-2 recurs, re-diagram the within-group-versus-whole-group contrast.
- If MC-3 recurs, re-anchor on the known-probability criterion directly.

## Memory Hooks
- "A huge biased sample is precisely wrong — method, not size, determines accuracy."
- "Stratified: a slice from every group. Cluster: everything from a few groups."
- "Random means known, controlled probabilities — never just 'whoever's around.'"

## Transfer Connections
- `math.stats.population-sample` (already authored, this campaign, Batch 105): supplies the
  population/sample vocabulary and representativeness goal this concept's sampling methods are
  designed to achieve.
- `math.prob.probability-axioms` (already authored, this campaign, Batch 99): supplies the
  precise probabilistic machinery ($P(A)\ge0$, etc.) making "equally likely selection" a checkable
  claim rather than an informal notion.
- `math.stats.sampling-distribution` (not yet authored): the KG's declared unlock, studying the
  behavior of a statistic computed from repeated SRS draws — this concept's own SRS definition is
  the exact mechanism that distribution is built on.

## Cross-Subject Connections
- None formal.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.stats.sampling.md`, reused by reference for
  its toy-population method demonstrations, its Literary Digest/Gallup historical case, its
  stratified-versus-cluster diagram, its random-versus-convenience contrast, and its
  three-misconception registry (severity levels and trigger conditions adopted directly as
  declared).
- Transfer probe cited by reference: the Blueprint's own independence-mode probe, examining three
  national commute-time survey proposals (a self-selected app poll, a cluster sample of towns,
  and an SRS from a voter registration list), ranking their likely accuracy by method rather than
  size.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires
  `math.stats.population-sample`+`math.prob.probability-axioms`, unlocks
  `math.stats.sampling-distribution`, cross_links none, developing/understand,
  mastery_threshold 0.85, estimated_hours 3) was directly verified against the live KG and
  matches exactly.

## Version History
- 2026-09-18 (Batch 106): authored. Second entry this batch. Companion batch concept:
  `math.stats.descriptive-statistics`. `math.stats` moves 1/40 → **3/40** this batch (both
  concepts authored, both independently ready).
