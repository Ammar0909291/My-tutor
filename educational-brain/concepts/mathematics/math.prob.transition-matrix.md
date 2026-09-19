# math.prob.transition-matrix

## Identity
- **KG id**: `math.prob.transition-matrix`
- **Domain**: math.prob
- **Requires**: `math.prob.markov-chain`, `math.linalg.matrix` (Blueprint's own "Prerequisites"
  field listed only `math.prob.markov-chain` — an incomplete declaration; the live KG's
  two-prerequisite list used as authoritative, see Curriculum Feedback)
- **Unlocks**: none
- **Cross-links**: none
- **Difficulty**: expert
- **Bloom level**: apply
- **Mastery threshold**: 0.8
- **Estimated hours**: 5

## Learning Objective
Define the transition matrix $P$ with entries $P_{ij}=P(X_{n+1}=j\mid X_n=i)$ — a CONDITIONAL
probability, never a marginal "probability of being in state $j$"; verify $P$ is STOCHASTIC (rows
sum to 1, entries $\ge0$); compute the $n$-step matrix $P^n$ via genuine matrix multiplication,
never $n\times P_{ij}$; apply the Chapman-Kolmogorov equation $P^{m+n}=P^m\cdot P^n$; and classify
states as recurrent, transient, absorbing, or periodic, correctly distinguishing IRREDUCIBILITY
(eventual reachability in SOME number of steps) from "all $P_{ij}>0}$" (reachability in exactly
one step).

## Core Understanding
$P_{ij}$ IS A CONDITIONAL PROBABILITY — TRANSITIONING FROM $i$ TO $j$, NEVER A MARGINAL "BEING IN
$j$": for the weather chain $P=\begin{pmatrix}0.7&0.2&0.1\\0.3&0.4&0.3\\0.2&0.3&0.5\end{pmatrix}$
(Sunny/Cloudy/Rainy): $P_{SR}=0.1$ means "GIVEN today is Sunny, probability tomorrow is Rainy" —
never "the probability of being Rainy" in isolation. Each ROW sums to 1 (from any state, the chain
must go SOMEWHERE), never each column.

$n$-STEP PROBABILITIES REQUIRE GENUINE MATRIX EXPONENTIATION, NEVER LINEAR SCALING: for a 2-state
chain $P=\begin{pmatrix}0.6&0.4\\0.2&0.8\end{pmatrix}$: $P^{(2)}_{12}=(P^2)_{12}=P_{11}P_{12}+
P_{12}P_{22}=0.6(0.4)+0.4(0.8)=0.24+0.32=0.56$ — computed by SUMMING over every intermediate state
$k$, never $2\times P_{12}=0.8$. The Chapman-Kolmogorov equation $P^{m+n}=P^m\cdot P^n$ formalizes
this: moving $m$ steps then $n$ steps equals moving $m+n$ steps directly, verified by matrix
multiplication, never addition or scalar scaling.

IRREDUCIBILITY MEANS EVENTUAL REACHABILITY, NEVER "ALL $P_{ij}>0$ IN ONE STEP": for
$P=\begin{pmatrix}0&1\\1&0\end{pmatrix}$ (states alternate): $P_{11}=0$ and $P_{22}=0$, yet
$P_{12}=1$ and $P_{21}=1$ — states 1 and 2 communicate directly (each reachable from the other in
ONE step), so this chain IS irreducible, despite having zero diagonal entries. Separately, for
$P=\begin{pmatrix}0&1&0\\0.5&0&0.5\\0&0.5&0.5\end{pmatrix}$: $P_{13}=0$ (unreachable in one step),
but $(P^2)_{13}=P_{11}P_{13}+P_{12}P_{23}+P_{13}P_{33}=0+0.5(0.5)+0=0.25>0$ — reachable in TWO
steps, so states 1 and 3 STILL communicate. Irreducibility requires only that SOME power $P^{(n)}$
has a positive $(i,j)$ entry, never that $n=1$ specifically.

## Mental Models
- **"P_ij answers 'given I'm at i, where do I go next?' — a conditional question, never a
  standalone probability of occupying j."**
- **"n steps means n genuine matrix multiplications, summing over every possible intermediate
  path — never a shortcut multiplication by n."**

## Why Students Fail

### MC-1: P-IJ-IS-THE-PROBABILITY-OF-BEING-IN-STATE-J
- **Surface form**: reads $P_{ij}$ as "the probability of being in state $j$" (marginal) rather
  than "the probability of transitioning FROM state $i$ TO state $j$" (conditional).
- **Birth type**: Type 3, language contamination (Blueprint's own declared birth type —
  "transition probability" and "state probability" both involve states, and the conditional-
  versus-marginal distinction is easy to miss when reading a matrix entry).
- **Repair**: re-anchor on $P_{ij}=P(X_{n+1}=j\mid X_n=i)$ explicitly, verifying the row-sum-to-1
  property makes sense only under this conditional reading.

### MC-2: N-STEP-PROBABILITY-IS-N-TIMES-ONE-STEP
- **Surface form**: computes $P^{(n)}_{ij}$ as $n\cdot P_{ij}$ instead of the $(i,j)$ entry of
  $P^n$.
- **Birth type**: Type 1, overgeneralization (Blueprint's own declared birth type — linearity of
  expectation makes "n steps scales linearly" feel natural, when matrix exponentiation is the
  correct mechanism).
- **Repair**: re-walk the summing-over-intermediate-states computation for $P^{(2)}_{12}$.

### MC-3: IRREDUCIBLE-MEANS-ALL-TRANSITION-PROBABILITIES-ARE-POSITIVE
- **Surface form**: confuses irreducibility with having all $P_{ij}>0$ in exactly one step,
  misclassifying chains with zero one-step entries as reducible.
- **Birth type**: Type 1, overgeneralization (Blueprint's own declared birth type —
  "$P_{ij}>0$ for all $i,j$ implies irreducible" is true, and students incorrectly invert this to
  "some $P_{ij}=0$ implies reducible," missing the reachability-in-multiple-steps criterion).
- **Repair**: re-walk the $\begin{pmatrix}0&1\\1&0\end{pmatrix}$ and multi-step reachability
  examples directly.

## Misconceptions

### MC-1: P-IJ-IS-THE-PROBABILITY-OF-BEING-IN-STATE-J
- **Surface form**: as described above.
- **Root cause (Type 3)**: as described above.
- **Repair**: as described above.

### MC-2: N-STEP-PROBABILITY-IS-N-TIMES-ONE-STEP
- **Surface form**: as described above.
- **Root cause (Type 1)**: as described above.
- **Repair**: as described above.

### MC-3: IRREDUCIBLE-MEANS-ALL-TRANSITION-PROBABILITIES-ARE-POSITIVE
- **Surface form**: as described above.
- **Root cause (Type 1)**: as described above.
- **Repair**: as described above.

## Analogies
- **"A transition matrix is a directed road map with probabilities on each road — Pij tells you
  the odds of taking the direct road from i to j, never the odds of simply standing at j."**
- **Anti-analogy**: a missing direct road (Pij=0) does NOT mean the destination is unreachable —
  a longer route through intermediate stops can still connect them, exactly what irreducibility
  actually requires.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: the weather chain's $P_{SR}=0.1$ read as a conditional
  probability, with row-sum-to-1 verified.
- **Demonstration 2 (targets MC-2)**: the 2-state chain's $P^{(2)}_{12}=0.56$ computed via
  summing over intermediate states, versus the wrong $0.8$ from linear scaling.
- **Demonstration 3 (targets MC-3)**: the alternating 2-state chain's irreducibility despite zero
  diagonal entries, and the 3-state chain's 2-step reachability despite a zero 1-step entry.

## Discovery Questions
1. "Does Pij mean 'the probability of being in state j,' or 'the probability of transitioning
   from i to j'?"
2. "Is the n-step transition probability n times the one-step probability, or the (i,j) entry of
   Pⁿ?"
3. "If some Pij=0, does that automatically mean the chain is reducible?"

## Teaching Sequence
1. **Representation shift**: the stochastic-matrix setup and conditional reading of $P_{ij}$,
   isolating MC-1.
2. **Pattern induction**: the $n$-step matrix-power computation and Chapman-Kolmogorov equation,
   isolating MC-2.
3. **Pattern induction (continued)**: state classification (communication, irreducibility,
   recurrence, period, ergodicity), isolating MC-3.
4. **Mastery gate**: require a correct stochastic-matrix verification, a correct $n$-step
   probability computation via matrix powers, and a correct irreducibility classification for a
   chain with some zero one-step entries, at the Blueprint's own stated MAMR of 4/5.

## Tutor Actions
- Never accept $P_{ij}$ interpreted as a marginal "probability of state $j$" rather than a
  conditional transition probability.
- Never accept an $n$-step transition probability computed via linear scaling.
- Never accept a chain classified as reducible solely because some one-step entries are zero,
  without checking multi-step reachability.

## Voice Teaching Notes
- Say "is that the probability of transitioning from i, or just of being at j?" whenever a matrix
  entry is interpreted.
- When irreducibility is judged, ask "have you checked reachability over multiple steps, or just
  one?"

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly verifies a matrix is stochastic and interprets an
  entry conditionally.
- **Rung 2 (application)**: learner correctly computes a two-step or three-step transition
  probability via matrix powers.
- **Rung 3 (transfer)**: learner correctly classifies a chain's states (irreducible, aperiodic,
  ergodic) and connects the framework to an application like PageRank or Hidden Markov Models.

## Tutor Recovery Strategy
- If MC-1 recurs, re-anchor on the conditional definition and row-sum-to-1 property.
- If MC-2 recurs, re-walk the summing-over-intermediate-states computation.
- If MC-3 recurs, re-walk the multi-step reachability examples.

## Memory Hooks
- "Pij is conditional — from i to j — never a standalone probability of j."
- "n steps means matrix powers, summing over every intermediate path — never linear scaling."
- "Irreducibility needs reachability in SOME number of steps — not necessarily one."

## Transfer Connections
- `math.prob.markov-chain` (already authored, this campaign, Batch 141): supplies the Markov
  property and the basic transition-matrix/matrix-power connection this concept formalizes fully.
- `math.linalg.matrix` (already authored, certified domain): supplies the general matrix
  machinery this concept's stochastic-matrix specialization builds on.

## Cross-Subject Connections
- None formal.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.prob.transition-matrix.md`, reused by
  reference for its weather-chain stochastic-matrix example, its matrix-power computation, its
  irreducibility/recurrence/period classification framework, and its three-misconception register
  (birth types adopted directly as declared).
- Transfer probe: the Blueprint's own independence-mode probe, connecting transition-matrix
  theory to PageRank, Hidden Markov Models, and mixing time via the spectral gap.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Incomplete Blueprint metadata found and corrected**: the Blueprint's own Component 0
  "Prerequisites" field lists only `math.prob.markov-chain`, omitting `math.linalg.matrix` —
  the live KG's `requires` field lists both. The live KG's complete two-prerequisite list is used
  as authoritative throughout this entry. All other fields (unlocks none, cross_links none,
  expert/apply, mastery_threshold 0.8, estimated_hours 5) matched exactly.

## Version History
- 2026-09-19 (Batch 142): authored. Second entry this batch, closing out
  `math.prob.markov-chain`'s declared unlock. Companion batch concept:
  `math.prob.combinatorial-probability`.
