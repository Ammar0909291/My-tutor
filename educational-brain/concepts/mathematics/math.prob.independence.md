# math.prob.independence

## Identity
- **KG id**: `math.prob.independence`
- **Domain**: math.prob
- **Requires**: `math.prob.conditional-probability`
- **Unlocks**: none
- **Cross-links**: none
- **Difficulty**: proficient
- **Bloom level**: understand
- **Mastery threshold**: 0.9
- **Estimated hours**: 3

## Learning Objective
State the product-rule definition of independence ($P(A\cap B)=P(A)P(B)$) and its conditional
equivalent ($P(A|B)=P(A)$ when $P(B)>0$), verifying independence for two events by direct
computation, never by intuition; distinguish independence from DISJOINTNESS — mutually exclusive
events with positive probability are the STRONGEST possible dependence, never independence; and
extend to MUTUAL independence of $n$ events, recognizing that pairwise checks alone can miss a
hidden joint dependence (the classical two-coin counterexample).

## Core Understanding
INDEPENDENCE IS A NUMERICAL COMPARISON, NEVER A CAUSAL JUDGMENT: reusing
`math.prob.conditional-probability`'s own algebraic rearrangement directly, $A$ and $B$ are
independent iff $P(A\cap B)=P(A)P(B)$ — equivalently, $P(A|B)=P(A)$: conditioning on $B$ leaves
$A$'s probability unchanged. For two fair coins, $A=$"first heads", $B=$"second heads":
$P(A\cap B)=1/4=P(A)P(B)=1/2\cdot1/2$ — independent, confirmed by arithmetic, never by a story
about the coins being "unrelated."

DISJOINT EVENTS WITH POSITIVE PROBABILITY ARE THE STRONGEST DEPENDENCE, THE OPPOSITE OF
INDEPENDENT: for $A=$"roll 1 or 2" ($P(A)=1/3$) and $D=$"roll 3,4,5,6" ($P(D)=2/3$), disjoint:
$P(A\cap D)=0\ne2/9=P(A)P(D)$ — NOT independent; in fact $P(A|D)=0$, meaning knowing $D$ occurred
makes $A$ IMPOSSIBLE, the exact opposite of "unaffected." Disjointness (for positive-probability
events) is near-maximal dependence, never a form of independence — the everyday intuition "they
don't overlap, so they're unrelated" inverts the actual relationship.

MUTUAL INDEPENDENCE OF $n\ge3$ EVENTS REQUIRES EVERY SUBCOLLECTION'S PRODUCT, NOT JUST PAIRS: for
two fair coins with $A=$"first heads", $B=$"second heads", $X=$"same face" (all probability
$1/2$): every PAIR passes ($P(A\cap B)=P(A\cap X)=P(B\cap X)=1/4=$ each product) — yet
$P(A\cap B\cap X)=1/4\ne1/8=P(A)P(B)P(X)$. Knowing any TWO of $\{A,B,X\}$ determines the third
exactly, a hidden joint dependence pairwise checks cannot detect — "pairwise independent" and
"mutually independent" are genuinely different strengths of claim.

## Mental Models
- **"Independence is settled by one comparison, $P(A\cap B)$ versus $P(A)P(B)$ — a causal story
  is neither required nor sufficient to decide it."**
- **"Disjoint is the opposite of independent — knowing one tells you EVERYTHING about the other,
  not nothing."**

## Why Students Fail

### MC-1: DISJOINT-MEANS-INDEPENDENT
- **Surface form**: treats mutually exclusive events as independent, reasoning "they don't
  overlap, so they don't affect each other."
- **Birth type**: Type 3, language contamination (Blueprint's own declared FOUNDATIONAL severity
  — "don't overlap" and "don't affect each other" sound like the same everyday idea, inverting
  the actual mathematical relationship).
- **Repair**: re-compute $P(A\cap D)$ versus $P(A)P(D)$ directly, confirming disjoint
  positive-probability events are dependent, not independent.

### MC-2: PAIRWISE-IMPLIES-MUTUAL
- **Surface form**: checks independence pairwise for 3+ events and concludes the whole
  collection is mutually independent without checking the full intersection.
- **Birth type**: Type 1, overgeneralization (Blueprint's own declared trigger — pairwise checks
  are the natural first extension of the two-event definition, and their sufficiency feels
  intuitive until a genuine counterexample is checked).
- **Repair**: re-check the full-intersection product directly against the pairwise-confirmed
  probabilities, exposing the discrepancy.

### MC-3: INDEPENDENCE-IS-CAUSAL-UNRELATEDNESS
- **Surface form**: judges independence from an intuitive causal story rather than computing
  $P(A\cap B)$ versus $P(A)P(B)$.
- **Birth type**: Type 3, language contamination (Blueprint's own declared trigger — "independent"
  in everyday English suggests causal or physical separateness, obscuring the precise numerical
  meaning).
- **Repair**: re-anchor on computing the product rule directly, regardless of how plausible the
  causal narrative sounds.

## Misconceptions

### MC-1: DISJOINT-MEANS-INDEPENDENT
- **Surface form**: as described above.
- **Root cause (Type 3)**: as described above.
- **Repair**: as described above.

### MC-2: PAIRWISE-IMPLIES-MUTUAL
- **Surface form**: as described above.
- **Root cause (Type 1)**: as described above.
- **Repair**: as described above.

### MC-3: INDEPENDENCE-IS-CAUSAL-UNRELATEDNESS
- **Surface form**: as described above.
- **Root cause (Type 3)**: as described above.
- **Repair**: as described above.

## Analogies
- **"Independence and disjointness sit at opposite ends of the same spectrum — one means
  'unaffected,' the other means 'fully determined.'"**
- **Anti-analogy**: sharing a physical cause or mechanism does NOT rule out independence — the
  arithmetic decides, not the plausibility of a causal story.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: $A=$"roll 1 or 2", $D=$"roll 3-6" on a fair die: disjoint,
  $P(A\cap D)=0\ne2/9=P(A)P(D)$ — dependent, with $P(A|D)=0$ confirming knowing $D$ makes $A$
  impossible.
- **Demonstration 2 (targets MC-2)**: the two-coin $A,B,X$ construction — every pair's product
  matches ($1/4$ each), yet the triple's product ($1/8$) doesn't match the actual triple
  intersection ($1/4$) — pairwise independence proven insufficient for mutual independence.
- **Demonstration 3 (targets MC-3)**: two machines sharing a power supply, with $P(A)=0.1,
  P(B)=0.2,P(A\cap B)=0.02$: the product $P(A)P(B)=0.02$ matches exactly — independent by the
  data, regardless of the plausible shared-infrastructure narrative suggesting otherwise.

## Discovery Questions
1. "If two events never happen together, does that make them independent?"
2. "If every pair among three events passes the independence test, must all three be mutually
   independent?"
3. "If two events share an obvious physical connection, must they be dependent?"

## Teaching Sequence
1. **Anchor**: connect to `math.prob.conditional-probability`'s own algebraic rearrangement,
   grounding independence in direct two-coin computation before any general definition.
2. **Contrast pair**: Demonstration 1's disjoint-versus-independent case, isolating MC-1 by
   requiring the arithmetic comparison, never intuition.
3. **Contrast pair**: Demonstration 2's pairwise-versus-mutual construction, isolating MC-2 by
   requiring the full-intersection product checked explicitly.
4. **Contrast pair**: Demonstration 3's causal-sounding scenario resolved by arithmetic,
   isolating MC-3 by requiring the product rule decide, regardless of narrative plausibility.
5. **Mastery gate**: require a correct independence determination via the product rule, a correct
   disjoint-versus-independent distinction, and a correct pairwise-versus-mutual determination for
   a new three-event scenario, at the Blueprint's own stated MAMR of 5/5 (⌈0.9×5⌉).

## Tutor Actions
- Never accept "they don't overlap, so they're independent" — require the product-rule
  comparison.
- Never accept mutual independence concluded from pairwise checks alone for 3+ events.

## Voice Teaching Notes
- Say "does P(A∩B) actually equal P(A)P(B), or are you going by intuition?" whenever independence
  is claimed.
- When 3+ events are checked, ask "did you check the FULL intersection, or just the pairs?"

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly computes $P(A\cap B)$ and $P(A)P(B)$ to determine
  independence for a new pair of events.
- **Rung 2 (application)**: learner correctly distinguishes a disjoint pair from an independent
  pair, computing both quantities explicitly.
- **Rung 3 (transfer)**: learner correctly determines mutual independence (or its failure) for a
  NEW three-event scenario by checking the full-intersection product, and correctly resolves a
  causal-sounding word problem using only the arithmetic.

## Tutor Recovery Strategy
- If MC-1 recurs, re-compute the disjoint pair's actual product comparison directly.
- If MC-2 recurs, re-check the full-intersection product against the pairwise-confirmed values.
- If MC-3 recurs, re-anchor on computing the product rule directly, regardless of narrative.

## Memory Hooks
- "Disjoint means fully dependent — never confuse 'no overlap' with 'unaffected.'"
- "Pairwise checks can miss a hidden three-way dependence — always check the full intersection
  too."
- "The story never decides independence — only P(A∩B) versus P(A)P(B) does."

## Transfer Connections
- `math.prob.conditional-probability` (already authored, this campaign, Batch 100): supplies the
  algebraic rearrangement $P(A\cap B)=P(A|B)\cdot P(B)$ this concept's product-rule definition is
  built from directly.

## Cross-Subject Connections
- None formal.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.prob.independence.md`, reused by reference
  for its two-coin product-rule computation, its disjoint-versus-independent die example, its
  classical pairwise-not-mutual Bernstein construction, and its three-misconception registry
  (severity levels and trigger conditions adopted directly as declared).
- Transfer probe cited by reference: the Blueprint's own independence-mode probe, examining a
  quality-control system with two independent sensors, computing joint flag/no-flag
  probabilities, and evaluating a causal-sounding objection about shared physical conditions
  against the pure product-rule computation.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Blueprint/KG metadata discrepancy found and documented**: the Blueprint's own P74 routing
  decision states "MASTERY ACHIEVED → unlock math.prob.lln and math.prob.poisson-process," but
  the live KG (`docs/mathematics/kg/graph.json`) lists this concept's `unlocks` as an empty
  array. This Identity section states the KG's actual value (no unlocks), not the Blueprint's
  routing claim. All other fields (requires `math.prob.conditional-probability`, cross_links
  none, proficient/understand, mastery_threshold 0.9, estimated_hours 3) matched exactly.

## Version History
- 2026-09-18 (Batch 102): authored. Second entry this batch. Companion batch concept:
  `math.de.first-order-ode`. `math.prob` moves 5/49 → **6/49** this batch.
