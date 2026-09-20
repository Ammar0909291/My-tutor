# math.graph.random-graph

## Identity
- **KG id**: `math.graph.random-graph`
- **Domain**: math.graph
- **Requires**: `math.graph.graph`, `math.prob.probability-axioms`
- **Unlocks**: none
- **Cross-links**: `math.prob.random-variable`
- **Difficulty**: research
- **Bloom level**: analyze
- **Mastery threshold**: 0.6
- **Estimated hours**: 8

## Learning Objective
Compute $E[\#\text{edges}]=\binom n2p$ as an AVERAGE — NEVER a per-realization guarantee;
interpret "asymptotically almost surely" as a LIMITING probability — NEVER a universal claim
about every finite-$n$ graph; and recognize the connectivity threshold as a SHARP phase
transition — NEVER a gradual, smooth increase.

## Core Understanding
THE EXPECTED EDGE COUNT IS AN AVERAGE — NEVER A PER-GRAPH GUARANTEE: for $G(5,0.3)$: total
possible edges $\binom52=10$, each independently present with probability $0.3$, giving
$E[\#\text{edges}]=10\times0.3=3$ via linearity of expectation. The ACTUAL realized graph on any
single draw could have anywhere from $0$ to $10$ edges — $3$ is only the average over MANY draws.
Believing $E[\#\text{edges}]=\binom n2p$ means every single random draw of $G(n,p)$ will have
EXACTLY that many edges is WRONG — it is a statement about the mean across many independent
draws, never a promise about any one specific realization.

"ASYMPTOTICALLY ALMOST SURELY" IS A LIMITING PROBABILITY — NEVER A UNIVERSAL GUARANTEE ABOUT
EVERY FINITE $n$: "$G(n,p)$ is connected a.a.s." means $P(\text{connected})\to1$ AS $n\to\infty$
— for any SPECIFIC finite $n$, some random draws can still fail to be connected, just with
probability shrinking toward $0$ as $n$ grows. Believing "asymptotically almost surely" means
LITERALLY every graph, for every $n$, has the property is WRONG — a.a.s. describes a limiting
probability as $n\to\infty$, with genuine finite-$n$ exceptions possible; it never rules out
exceptions at any particular finite $n$.

THE CONNECTIVITY THRESHOLD IS A SHARP PHASE TRANSITION — NEVER A GRADUAL, SMOOTH RAMP: at
$p^*=\log(n)/n$: for $p$ significantly LARGER than $p^*$, $G(n,p)$ is connected a.a.s.
(probability $\to1$); for $p$ significantly SMALLER, it is disconnected a.a.s. (probability
$\to0$) — a genuinely sudden transition concentrated in a narrow window around $p^*$. Believing
the probability of a threshold property increases smoothly and gradually as $p$ rises from $0$ to
$1$ is WRONG — this is a genuine "phase transition," flipping rapidly from almost-never to
almost-always, one of the most striking discoveries in random graph theory.

## Mental Models
- **"E[#edges] tells you what happens on average across many random draws — any single realized
  graph can genuinely differ."**
- **"A.a.s. describes what happens in the limit of large n — it doesn't rule out exceptions at
  any particular finite n, it just says they become vanishingly rare."**
- **"The connectivity threshold isn't a gentle slope from unlikely to likely — it's a genuine
  phase transition, flipping rapidly in a narrow window."**

## Why Students Fail

### MC-1: EXPECTED-EDGE-COUNT-MISTAKEN-FOR-GUARANTEE
- **Surface form**: believes $E[\#\text{edges}]$ means every random draw of $G(n,p)$ has exactly
  that many edges, missing that it is only an average over many draws.
- **Birth type**: overgeneralization (Blueprint's own declared foundational severity — "expected
  value" sounds like it should describe a fixed, guaranteed outcome rather than a statistical
  average).
- **Repair**: re-walk the average-vs-realization distinction, re-anchoring on "expected value is
  an average, not a per-graph promise."

### MC-2: AAS-MISTAKEN-FOR-UNIVERSAL-GUARANTEE
- **Surface form**: believes "asymptotically almost surely" means literally every graph for every
  $n$ has the property, missing that it describes a limiting probability as $n\to\infty$, with
  finite-$n$ exceptions genuinely possible.
- **Birth type**: instruction-induced (Blueprint's own declared high severity — "almost surely"
  sounds absolute, obscuring the asymptotic/limiting qualifier).
- **Repair**: re-walk the precise limiting-probability definition, re-anchoring on "a.a.s.
  describes the limit as $n\to\infty$, not a universal fact at every finite $n$."

### MC-3: THRESHOLD-ASSUMED-GRADUAL
- **Surface form**: believes the probability of a threshold property increases smoothly and
  gradually as $p$ increases, missing the sharp, sudden phase-transition nature of the threshold
  phenomenon.
- **Birth type**: overgeneralization (Blueprint's own declared moderate severity — most probability
  concepts encountered earlier vary smoothly, making a sharp threshold counterintuitive).
- **Repair**: re-walk the phase-transition framing, re-anchoring on "this is a sharp, sudden
  transition, not a gentle ramp."

## Misconceptions

### MC-1: EXPECTED-EDGE-COUNT-MISTAKEN-FOR-GUARANTEE
- **Surface form**: as described above.
- **Root cause (overgeneralization)**: as described above.
- **Repair**: as described above.

### MC-2: AAS-MISTAKEN-FOR-UNIVERSAL-GUARANTEE
- **Surface form**: as described above.
- **Root cause (instruction-induced)**: as described above.
- **Repair**: as described above.

### MC-3: THRESHOLD-ASSUMED-GRADUAL
- **Surface form**: as described above.
- **Root cause (overgeneralization)**: as described above.
- **Repair**: as described above.

## Analogies
- **"E[#edges] is like a casino's expected payout per spin — true on average across thousands of
  spins, but any single spin can land far from it."**
- **Anti-analogy**: the connectivity threshold isn't a dimmer switch gradually brightening as p
  rises — it's a light switch that flips almost instantly once p crosses a narrow critical band.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: the $G(5,0.3)$ expected-edge-count computation.
- **Demonstration 2 (targets MC-2)**: the precise a.a.s. limiting-probability definition applied
  to connectivity.
- **Demonstration 3 (targets MC-3)**: the $p^*=\log(n)/n$ sharp-threshold phase-transition framing.

## Discovery Questions
1. "Does E[#edges]=C(n,2)p mean every single random draw of G(n,p) will have exactly that many
   edges?"
2. "Does 'G(n,p) is connected asymptotically almost surely' mean literally every graph, for every
   n, is connected?"
3. "Does the probability of a threshold property increase smoothly and gradually as p increases?"

## Teaching Sequence
1. **Representation shift**: work the $G(5,0.3)$ expected-edge-count computation, isolating MC-1.
2. **Conflict evidence**: work the precise a.a.s. definition, isolating MC-2.
3. **Contrast pair**: work the sharp-threshold-versus-gradual-ramp contrast, isolating MC-3.
4. **Mastery gate**: require a correct expected-edge-count computation, a correct explanation of
   why a single draw can differ from the expectation, a correct precise statement of a.a.s., and a
   correct explanation of what makes the connectivity threshold "sharp," at the Blueprint's own
   stated MAMR of 3/5.

## Tutor Actions
- Never accept the expected edge count treated as a guarantee for every realized graph.
- Never accept "asymptotically almost surely" interpreted as a universal claim about every finite
  $n$.
- Never accept the connectivity threshold described as a smooth, gradual increase.

## Voice Teaching Notes
- Say "is that the average, or a promise about this specific graph?" whenever an expected value is
  computed for a random graph property.
- Ask "is that true for every n, or just in the limit as n grows?" whenever "a.a.s." is invoked.

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly computes $E[\#\text{edges}]$ for a specific
  $G(n,p)$.
- **Rung 2 (application)**: learner correctly explains why a.a.s. is a limiting statement, not a
  universal guarantee.
- **Rung 3 (transfer)**: learner correctly predicts connectivity behavior for $p$ well above and
  well below the connectivity threshold for a specific $n$, without computing exact probabilities.

## Tutor Recovery Strategy
- If MC-1 recurs, re-walk the average-vs-realization distinction.
- If MC-2 recurs, re-walk the precise limiting-probability definition of a.a.s.
- If MC-3 recurs, re-walk the sharp phase-transition framing.

## Memory Hooks
- "Expected edges is an average — never a promise about one specific graph."
- "A.a.s. is a limit as n grows — never a universal fact at every finite n."
- "The connectivity threshold flips fast — never a smooth ramp."

## Transfer Connections
- `math.graph.graph` (prerequisite, already authored): supplies the vertices/edges/connectivity
  vocabulary this concept randomizes.
- `math.prob.probability-axioms` (prerequisite, already authored): supplies the independence
  mechanism by which each edge is included.
- `math.prob.random-variable` (already authored, cross-link): supplies the random-variable
  framework this concept uses to frame both edge counts and graph properties like connectivity.

## Cross-Subject Connections
- Network science and epidemiology: random-graph models underlie the study of network robustness,
  epidemic spreading thresholds, and internet topology, all relying directly on this concept's
  threshold-phenomenon machinery.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.graph.random-graph.md`, reused by reference
  for its three worked examples and its three-misconception registry (birth types adopted directly
  as declared).
- Transfer probe: the Blueprint's own cross-link probe engaging `math.prob.random-variable`, on a
  network engineer's $G(100,p)$ model and the predicted connectivity behavior above and below the
  connectivity threshold.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires
  `math.graph.graph`/`math.prob.probability-axioms`, unlocks none, cross_links
  `math.prob.random-variable`, research/analyze, mastery_threshold 0.6, estimated_hours 8) was
  directly verified against the live KG and matches exactly. The cross-link target is confirmed
  authored, matching the Blueprint's own cross-link-mode determination.

## Version History
- 2026-09-20 (Batch 235): authored. Second entry this batch. Companion batch concept:
  `math.cx.complex-numbers-analysis`.
