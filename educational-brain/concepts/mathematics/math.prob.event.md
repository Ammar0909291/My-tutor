# math.prob.event

## Identity
- **KG id**: `math.prob.event`
- **Domain**: math.prob
- **Requires**: `math.prob.sample-space`
- **Unlocks**: `math.prob.probability-axioms`
- **Cross-links**: `math.meas.sigma-algebra` (not yet authored — verified via `ls`; independence
  mode used, see Blueprint References)
- **Difficulty**: developing
- **Bloom level**: understand
- **Mastery threshold**: 0.9
- **Estimated hours**: 2

## Learning Objective
Define an EVENT $A$ as any subset of the sample space, $A\subseteq\Omega$ — able to contain zero,
one, or many outcomes, never assumed to be a single outcome; compute the COMPLEMENT $A^c=\Omega
\setminus A$ as ALL outcomes not in $A$ (never just the "one opposite outcome"); and apply union,
intersection, and mutual exclusivity, recognizing that overlapping events are perfectly valid —
mutual exclusivity is a special case to CHECK for, never a requirement.

## Core Understanding
AN EVENT IS A SUBSET, NEVER A SINGLE OUTCOME: reusing `math.prob.sample-space`'s own set
language directly, an event $A$ is ANY subset of $\Omega$ — it can contain 0, 1, or many
outcomes. For $\Omega=\{1,2,3,4,5,6\}$ (a die roll), the event "even number" is
$A=\{2,4,6\}$ — a genuine collection of THREE outcomes, gathered by checking each $\omega\in
\Omega$ against the condition and collecting every one that qualifies, never named as a single
representative outcome.

THE COMPLEMENT IS EVERYTHING REMAINING, NOT JUST ONE OUTCOME: $A^c=\Omega\setminus A$ collects
EVERY outcome in $\Omega$ not in $A$. For $\Omega=\{HH,HT,TH,TT\}$ and $A=\{HH\}$, $A^c=\{HT,TH,
TT\}$ — ALL THREE remaining outcomes, not merely "the one opposite outcome" ($TT$ alone would be
wrong). $A$ and $A^c$ always PARTITION $\Omega$: every outcome belongs to exactly one of the two,
with $|A|+|A^c|=|\Omega|$.

OVERLAPPING EVENTS ARE VALID; MUTUAL EXCLUSIVITY IS A SPECIAL CASE, NOT A REQUIREMENT: any subset
of $\Omega$ is a valid event, and two events can share outcomes freely — $A=\{1,2,3\}$ and
$B=\{2,3,4\}$ are both valid events in $\Omega=\{1,\dots,6\}$ even though $A\cap B=\{2,3\}\ne
\emptyset$. Mutually exclusive events ($A\cap B=\emptyset$, no shared outcomes) are a SPECIAL
CASE that must be CHECKED for explicitly, never assumed to hold for every pair of events.

## Mental Models
- **"An event is a whole collection gathered by a condition, never just the one outcome that
  first comes to mind."**
- **"The complement is everything LEFT OVER after removing the event — never just the single
  outcome that feels most 'opposite.'"**

## Why Students Fail

### MC-1: EVENT-IS-OUTCOME
- **Surface form**: believes an event is a single outcome, e.g. "event = one coin flip result."
- **Birth type**: Type 3, language contamination (Blueprint's own declared FOUNDATIONAL severity
  — everyday English uses "event" to mean "a thing that happens," a single occurrence, obscuring
  the mathematical meaning of a SET of outcomes).
- **Repair**: re-check every outcome in $\Omega$ against the condition and gather all that
  qualify into one set.

### MC-2: EVENT-COMPLEMENT-ONE-OUTCOME
- **Surface form**: names only the single "most opposite" outcome as the complement, e.g.
  claiming $A^c=\{TT\}$ for $A=\{HH\}$ in $\Omega=\{HH,HT,TH,TT\}$.
- **Birth type**: Type 3, language contamination (Blueprint's own declared severity — everyday
  "complement/opposite" suggests one contrasting item, not a full remaining collection).
- **Repair**: re-derive $A^c$ by removing every element of $A$ from $\Omega$ and confirming what
  remains.

### MC-3: EVENTS-MUST-PARTITION
- **Surface form**: believes events can't overlap — each outcome belongs to only one event at a
  time.
- **Birth type**: Type 1, overgeneralization (Blueprint's own declared severity — familiarity with
  exhaustive, mutually exclusive partitions like heads-or-tails is over-applied to ALL events).
- **Repair**: re-verify with a concrete overlapping pair that both are valid events despite
  sharing outcomes.

## Misconceptions

### MC-1: EVENT-IS-OUTCOME
- **Surface form**: as described above.
- **Root cause (Type 3)**: as described above.
- **Repair**: as described above.

### MC-2: EVENT-COMPLEMENT-ONE-OUTCOME
- **Surface form**: as described above.
- **Root cause (Type 3)**: as described above.
- **Repair**: as described above.

### MC-3: EVENTS-MUST-PARTITION
- **Surface form**: as described above.
- **Root cause (Type 1)**: as described above.
- **Repair**: as described above.

## Analogies
- **"An event is a handful of poker chips gathered by a rule — not the single chip you happen to
  glance at first."**
- **Anti-analogy**: two events sharing outcomes is NOT a contradiction — only mutual exclusivity
  (checked, never assumed) forbids overlap.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: in $\Omega=\{HH,HT,TH,TT\}$, the event "at least one head"
  requires checking every outcome: $HH$ (2 heads, qualifies), $HT$ (1 head, qualifies), $TH$ (1
  head, qualifies), $TT$ (0 heads, excluded) — event $=\{HH,HT,TH\}$, three outcomes gathered by
  the condition.
- **Demonstration 2 (targets MC-2)**: for $\Omega=\{HH,HT,TH,TT\}$, $C=\{HH,TT\}$: $C^c=\Omega
  \setminus C=\{HT,TH\}$ — both remaining outcomes, confirmed by removing each element of $C$ from
  $\Omega$ directly.
- **Demonstration 3 (targets MC-3)**: in $\Omega=\{HH,HT,TH,TT\}$, $A=\{HH,HT\}$ and $B=\{HT,TH\}$
  are both valid events despite $A\cap B=\{HT\}\ne\emptyset$ — overlap does not disqualify either
  as a genuine event.

## Discovery Questions
1. "In two coin flips, which outcomes belong to the event 'at least one head' — is it one outcome
   or several?"
2. "For $\Omega=\{HH,HT,TH,TT\}$ and $A=\{HH\}$, is $A^c$ just $\{TT\}$, or does it include more?"
3. "Can two different events share some of the same outcomes, or must every event be completely
   separate from every other?"

## Teaching Sequence
1. **Anchor**: connect to `math.prob.sample-space`'s own set language, framing an event as
   exactly a subset $A\subseteq\Omega$.
2. **Conceptual shift**: Demonstration 1's outcome-by-outcome collection, isolating MC-1 by
   requiring every qualifying outcome be gathered, not just one.
3. **Contrast pair**: Demonstration 2's full-complement computation, isolating MC-2 by requiring
   ALL remaining outcomes, not just the "opposite" one.
4. **Contrast pair**: Demonstration 3's overlapping valid events, isolating MC-3 by confirming
   shared outcomes don't disqualify either event.
5. **Mastery gate**: require a correctly gathered event for a new condition, a correctly computed
   complement, and a correct union/intersection/mutual-exclusivity determination, at the
   Blueprint's own stated pass criterion of 5/5 (⌈0.9×5⌉).

## Tutor Actions
- Never accept an event description naming only one outcome — require every qualifying outcome
  gathered explicitly.
- Never accept a complement naming fewer than all remaining outcomes.

## Voice Teaching Notes
- Say "did you check every outcome in Ω, or just name the first one that came to mind?" whenever
  an event is described.
- When a complement is computed, ask "does that include everything left over, or just one
  outcome?"

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly gathers all outcomes satisfying a new condition
  into an event.
- **Rung 2 (application)**: learner correctly computes a complement, union, or intersection for a
  new pair of events.
- **Rung 3 (transfer)**: learner correctly determines whether two NEW events are mutually
  exclusive by checking their intersection, rather than assuming either way.

## Tutor Recovery Strategy
- If MC-1 recurs, re-check every outcome against the condition and gather all that qualify.
- If MC-2 recurs, re-derive the complement by removing every element of the event from $\Omega$.
- If MC-3 recurs, re-verify with a concrete overlapping pair that both are valid events.

## Memory Hooks
- "An event is a collection, not a single outcome — gather everything that qualifies."
- "The complement is everything left over, not just the one opposite-feeling outcome."
- "Overlapping events are normal — mutual exclusivity is checked, never assumed."

## Transfer Connections
- `math.prob.sample-space` (already authored, this campaign): supplies the set $\Omega$ this
  concept's events are defined as subsets of.
- `math.prob.probability-axioms` (not yet authored): the KG's declared unlock, assigning
  probability values to the events this concept defines.

## Cross-Subject Connections
- None formal — `math.meas.sigma-algebra` is declared as a cross-link in the KG but is not yet
  authored (confirmed via `ls`), so this entry uses independence mode per the established
  convention.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.prob.event.md`, reused by reference for its
  poker-chip event-gathering analogy, its full-complement computation, its overlapping-events
  contrast, and its three-misconception registry (severity levels and trigger conditions adopted
  directly as declared).
- Transfer probe cited by reference: the Blueprint's own independence-mode probe, examining a
  weather-forecast sample space, the "wet weather" event as a set, its complement, and a mutual
  -exclusivity check between two overlapping weather events.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires
  `math.prob.sample-space`, unlocks `math.prob.probability-axioms`, cross_links
  `math.meas.sigma-algebra`, developing/understand, mastery_threshold 0.9, estimated_hours 2)
  was directly verified against the live KG and matches exactly.

## Version History
- 2026-09-18 (Batch 98): authored. First entry this batch. Companion batch concept:
  `math.prob.probability-measure`. `math.prob` moves 1/49 → **2/49** this batch.
