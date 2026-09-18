# math.prob.probability-axioms

## Identity
- **KG id**: `math.prob.probability-axioms`
- **Domain**: math.prob
- **Requires**: `math.prob.probability-measure`
- **Unlocks**: `math.prob.conditional-probability`, `math.prob.independence`
- **Cross-links**: none
- **Difficulty**: developing
- **Bloom level**: understand
- **Mastery threshold**: 0.9
- **Estimated hours**: 3

## Learning Objective
Distinguish the three Kolmogorov AXIOMS (A1: $P(A)\ge0$; A2: $P(\Omega)=1$; A3: if $A\cap B=
\emptyset$ then $P(A\cup B)=P(A)+P(B)$) — the only assumed truths — from every other probability
rule, which is a derived THEOREM; trace a derivation (e.g. $P(A^c)=1-P(A)$, $P(\emptyset)=0$)
back to the specific axioms that generate each step, never stating a conclusion without citing
its source; and prove the MONOTONICITY theorem ($A\subseteq B\Rightarrow P(A)\le P(B)$) via A1
and A3.

## Core Understanding
ONLY THREE STATEMENTS ARE AXIOMS; EVERYTHING ELSE IS DERIVED: reusing
`math.prob.probability-measure`'s own four working rules directly, this concept reveals WHY they
hold — all follow from exactly three Kolmogorov axioms: A1 ($P(A)\ge0$), A2 ($P(\Omega)=1$), A3
(disjoint events add: $A\cap B=\emptyset\Rightarrow P(A\cup B)=P(A)+P(B)$). $P(\emptyset)=0$,
$P(A^c)=1-P(A)$, and the general addition rule are all THEOREMS — proven from the axioms, never
themselves additional axioms, however "obvious" or "definitional" they may feel.

A THEOREM'S PROOF MUST CITE THE SPECIFIC AXIOM AT EACH STEP: deriving $P(A^c)=1-P(A)$: since
$A\cap A^c=\emptyset$ (disjoint) and $A\cup A^c=\Omega$, by A3, $P(A)+P(A^c)=P(A\cup A^c)=P(\Omega)$;
by A2, $P(\Omega)=1$; so $P(A^c)=1-P(A)$. Every equality that isn't a plain definition must be
justified by naming A1, A2, or A3 explicitly — stating "complements add to 1" without these
citations is an assertion, not a proof, even when the conclusion is correct.

MONOTONICITY FOLLOWS FROM A1 AND A3 TOGETHER: if $A\subseteq B$, decompose $B=A\cup(B\setminus A)$
(a disjoint union). By A3, $P(B)=P(A)+P(B\setminus A)$. By A1, $P(B\setminus A)\ge0$. Therefore
$P(B)\ge P(A)$, i.e. $P(A)\le P(B)$. Non-negativity (A1) is SPECIFICALLY what produces the $\le$
direction — without it, the inequality's direction would not be forced.

## Mental Models
- **"Only three statements are ever assumed — everything else, however familiar, is a derivation
  that must be traced back to them."**
- **"A proof step that doesn't name A1, A2, or A3 is a guess dressed up as a conclusion."**

## Why Students Fail

### MC-1: AXIOM-THEOREM-CONFUSION
- **Surface form**: calls $P(\emptyset)=0$ "Axiom 3" or $P(A^c)=1-P(A)$ "Axiom 4," unable to
  identify the three Kolmogorov axioms precisely.
- **Birth type**: Type 1, overgeneralization (Blueprint's own declared FOUNDATIONAL severity —
  treating all probability rules as equal in epistemic status, without distinguishing assumed
  from derived).
- **Repair**: re-sort a mixed list of statements into AXIOM versus THEOREM by comparing each
  word-for-word against A1/A2/A3.

### MC-2: DERIVATION-GAP
- **Surface form**: states a theorem correctly but without naming which axioms justify each step,
  e.g. "$P(A^c)=1-P(A)$ because complements add to 1."
- **Birth type**: Type 5, instruction-induced (Blueprint's own declared severity — the conclusion
  is memorized as a fact, so the proof feels unnecessary to spell out).
- **Repair**: re-derive the theorem with each line explicitly labeled by the axiom used.

### MC-3: MONOTONICITY-UNKNOWN
- **Surface form**: doesn't know $P(A)\le P(B)$ when $A\subseteq B$, or reverses the inequality.
- **Birth type**: Type 1, overgeneralization (Blueprint's own declared severity — no prior exposure
  to the theorem, or confusing subset direction with probability direction).
- **Repair**: re-derive via the concrete marble example, confirming the direction directly.

## Misconceptions

### MC-1: AXIOM-THEOREM-CONFUSION
- **Surface form**: as described above.
- **Root cause (Type 1)**: as described above.
- **Repair**: as described above.

### MC-2: DERIVATION-GAP
- **Surface form**: as described above.
- **Root cause (Type 5)**: as described above.
- **Repair**: as described above.

### MC-3: MONOTONICITY-UNKNOWN
- **Surface form**: as described above.
- **Root cause (Type 1)**: as described above.
- **Repair**: as described above.

## Analogies
- **"The three axioms are the only three ingredients in the pantry — every other probability
  rule is a recipe cooked from just those three, never a fourth ingredient smuggled in."**
- **Anti-analogy**: a theorem "feeling obvious" does NOT make it an axiom — its truth still
  requires a traceable derivation from A1, A2, A3.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: sorting five statements — $P(A)\ge0$, $P(\Omega)=1$,
  $P(A^c)=1-P(A)$, disjoint-additivity, $P(\emptyset)=0$ — correctly places only three (A1, A2,
  disjoint-additivity) as axioms; the other two are theorems.
- **Demonstration 2 (targets MC-2)**: deriving $P(\emptyset)=0$: $\Omega\cap\emptyset=\emptyset$
  and $\Omega\cup\emptyset=\Omega$; by A3, $P(\Omega)+P(\emptyset)=P(\Omega)$; by A2, $P(\Omega)=1$;
  so $1=1+P(\emptyset)\Rightarrow P(\emptyset)=0$ — each line cites its specific axiom.
- **Demonstration 3 (targets MC-3)**: for a bag with 3 red marbles (event $A$) and 5 additional
  blue marbles (event $B\supseteq A$ = "red or blue," 8 total): $P(A)=0.3\le P(B)=0.8$, proven via
  $B=A\cup(B\setminus A)$ (disjoint), A3 giving $P(B)=P(A)+P(B\setminus A)$, and A1 giving
  $P(B\setminus A)\ge0$.

## Discovery Questions
1. "Is $P(\emptyset)=0$ one of the three Kolmogorov axioms, or is it derived from them?"
2. "If you state $P(A^c)=1-P(A)$, can you name which specific axioms make that true?"
3. "If $A\subseteq B$, must $P(A)$ be less than or equal to $P(B)$, or could it go either way?"

## Teaching Sequence
1. **Anchor**: connect to `math.prob.probability-measure`'s own four working rules, framing this
   concept as revealing WHY they hold.
2. **Representation shift/pattern induction**: Demonstration 2's step-by-step $P(\emptyset)=0$
   derivation, establishing the citation discipline from the start.
3. **Conceptual shift**: Demonstration 1's axiom/theorem sort, isolating MC-1 by requiring exact
   word-for-word comparison against A1/A2/A3.
4. **Contrast pair**: a justified-proof-versus-proof-gap comparison, isolating MC-2 by requiring
   every step be cited.
5. **Contrast pair**: Demonstration 3's monotonicity proof, isolating MC-3 by requiring the
   direction be derived, not guessed.
6. **Mastery gate**: require a correct axiom/theorem classification, a correctly cited derivation,
   and a correct monotonicity application, at the Blueprint's own stated pass criterion of 5/5
   (⌈0.9×5⌉).

## Tutor Actions
- Never accept a derived rule (complement, general addition, $P(\emptyset)=0$) labeled as an
  axiom.
- Never accept a proof step without an explicit A1/A2/A3 citation.

## Voice Teaching Notes
- Say "is that one of the three axioms word-for-word, or is it something we prove?" whenever a
  probability rule is invoked as a starting point.
- When a derivation is given, ask "which axiom justifies that specific step?"

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly sorts a mixed list of probability statements into
  axioms versus theorems.
- **Rung 2 (application)**: learner correctly derives a theorem with each step cited to a
  specific axiom.
- **Rung 3 (transfer)**: learner correctly applies monotonicity and the complement/addition
  theorems together on a NEW finite probability space, naming the axiom responsible for each
  conclusion.

## Tutor Recovery Strategy
- If MC-1 recurs, re-sort the mixed statement list against A1/A2/A3 word-for-word.
- If MC-2 recurs, re-derive the theorem with each line explicitly labeled.
- If MC-3 recurs, re-derive monotonicity via the concrete marble example.

## Memory Hooks
- "Only three axioms exist — everything else is proven, never assumed."
- "A proof without a cited axiom is a guess, however correct the answer looks."
- "Bigger set, at least as big probability — A1 is what guarantees it never flips."

## Transfer Connections
- `math.prob.probability-measure` (already authored, this campaign): supplies the four working
  rules ($P(A)\in[0,1]$, complement, general addition) this concept explains the derivation of.
- `math.prob.conditional-probability`, `math.prob.independence` (not yet authored): the KG's
  declared unlocks, both built directly on the axiomatic structure this concept establishes.

## Cross-Subject Connections
- None formal.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.prob.probability-axioms.md`, reused by
  reference for its axiom/theorem sorting exercise, its cited step-by-step derivations, its
  monotonicity proof, and its three-misconception registry (severity levels and root causes both
  adopted directly as declared).
- Transfer probe cited by reference: the Blueprint's own independence-mode probe, examining a
  4-outcome probability space, verifying A2 via repeated A3 application, applying monotonicity to
  an intersection, deriving a complement, and naming the axiom behind non-negativity.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires
  `math.prob.probability-measure`, unlocks `math.prob.conditional-probability`+
  `math.prob.independence`, cross_links none, developing/understand, mastery_threshold 0.9,
  estimated_hours 3) was directly verified against the live KG and matches exactly.

## Version History
- 2026-09-18 (Batch 99): authored. First entry this batch. Companion batch concept:
  `math.de.ode` (opening a new domain). `math.prob` moves 3/49 → **4/49** this batch.
