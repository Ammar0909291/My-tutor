# math.prob.stationary-distribution

## Identity
- **KG id**: `math.prob.stationary-distribution`
- **Domain**: math.prob
- **Requires**: `math.prob.transition-matrix`
- **Unlocks**: `math.prob.ergodicity`
- **Cross-links**: none
- **Difficulty**: expert
- **Bloom level**: apply
- **Mastery threshold**: 0.75
- **Estimated hours**: 5

## Learning Objective
Define a stationary distribution $\pi$ as a probability vector satisfying $\pi P=\pi$ and
$\sum_i\pi_i=1$ — the LONG-RUN distribution the chain converges to, never the initial
distribution; solve balance equations for small chains and prove uniqueness for irreducible
chains; state DETAILED BALANCE ($\pi_iP_{ij}=\pi_jP_{ji}$) as SUFFICIENT but NOT NECESSARY for
stationarity; and correctly account for reducible or periodic chains where uniqueness or
convergence can fail.

## Core Understanding
$\pi$ IS THE LONG-RUN DISTRIBUTION THE CHAIN CONVERGES TO — NEVER THE INITIAL DISTRIBUTION: for a
weather chain starting Sunny ($\pi_0=[1,0,0]$): after many steps, $\pi_0\cdot P^n\to\pi$ — the
STATIONARY distribution, generally DIFFERENT from $[1,0,0]$ unless the chain happens to already
start there. "Stationary" means unchanged by ONE MORE STEP ($\pi P=\pi$), never "fixed from the
start" — for an ergodic chain, ANY starting distribution eventually converges to the SAME $\pi$,
regardless of where it began.

DETAILED BALANCE IS SUFFICIENT, NEVER NECESSARY, FOR STATIONARITY: if $\pi_iP_{ij}=\pi_jP_{ji}$
for ALL pairs (flows between $i$ and $j$ cancel in both directions), then $\pi$ IS stationary:
$\sum_i\pi_iP_{ij}=\sum_i\pi_jP_{ji}=\pi_j\sum_iP_{ji}=\pi_j$. But the CONVERSE fails: a 3-cycle
chain ($1\to2\to3\to1$ with probability 1) has stationary distribution
$\pi=[1/3,1/3,1/3]$, yet VIOLATES detailed balance (flux $1\to2=1/3$, flux $2\to1=0$, genuinely
unequal) — this chain has "probability currents" flowing in one direction, stationary WITHOUT
being reversible.

UNIQUENESS AND CONVERGENCE EACH HAVE THEIR OWN, SEPARATE HYPOTHESES: uniqueness of $\pi$ holds
ONLY for IRREDUCIBLE chains — a REDUCIBLE chain with closed classes $C_1,C_2$ has infinitely many
stationary distributions (any convex combination of each class's own stationary distribution).
Separately, even for an irreducible chain, if it is PERIODIC (period $d\ge2$), a unique
stationary distribution STILL EXISTS, but the chain does NOT converge to it — it oscillates
forever instead. Only ERGODIC chains (irreducible + aperiodic + positive recurrent) both have a
unique $\pi$ AND actually converge to it.

## Mental Models
- **"Stationary means the distribution survives one more step unchanged — it says nothing about
  where the chain started, only about a self-consistency property of the limiting distribution
  itself."**
- **"Detailed balance is a stronger, sufficient shortcut for finding π — many perfectly stationary
  distributions never satisfy it, especially ones with directional probability currents."**

## Why Students Fail

### MC-1: STATIONARY-DISTRIBUTION-IS-THE-INITIAL-DISTRIBUTION
- **Surface form**: believes $\pi$ is the distribution at time 0, rather than the long-run
  distribution the chain converges to.
- **Birth type**: Type 3, language contamination (Blueprint's own declared birth type —
  "stationary" suggests "fixed from the start" in everyday usage, when it actually means "doesn't
  change from one step to the next").
- **Repair**: re-walk the weather-chain example, tracking $\pi_0\cdot P^n\to\pi$ from a starting
  distribution genuinely different from $\pi$.

### MC-2: DETAILED-BALANCE-IS-REQUIRED-FOR-STATIONARITY
- **Surface form**: believes a distribution must satisfy detailed balance to be stationary.
- **Birth type**: Type 5, instruction-induced (Blueprint's own declared birth type — detailed
  balance is usually TAUGHT as the method for computing $\pi$, and students generalize the
  calculation method into a definitional requirement).
- **Repair**: re-walk the 3-cycle chain's stationary-but-not-detailed-balanced counterexample.

### MC-3: EVERY-CHAIN-HAS-A-UNIQUE-STATIONARY-DISTRIBUTION
- **Surface form**: assumes any Markov chain has exactly one stationary distribution, missing
  reducible chains (multiple) and periodic chains (unique but non-convergent).
- **Birth type**: Type 5, instruction-induced (Blueprint's own declared birth type — uniqueness is
  proved specifically for irreducible chains, and students generalize past that hypothesis).
- **Repair**: re-walk a reducible chain's multiple stationary distributions and a periodic chain's
  existing-but-non-convergent stationary distribution.

## Misconceptions

### MC-1: STATIONARY-DISTRIBUTION-IS-THE-INITIAL-DISTRIBUTION
- **Surface form**: as described above.
- **Root cause (Type 3)**: as described above.
- **Repair**: as described above.

### MC-2: DETAILED-BALANCE-IS-REQUIRED-FOR-STATIONARITY
- **Surface form**: as described above.
- **Root cause (Type 5)**: as described above.
- **Repair**: as described above.

### MC-3: EVERY-CHAIN-HAS-A-UNIQUE-STATIONARY-DISTRIBUTION
- **Surface form**: as described above.
- **Root cause (Type 5)**: as described above.
- **Repair**: as described above.

## Analogies
- **"A stationary distribution is like a river's steady-state water level — it doesn't matter
  where the water started; given enough time, the level settles to the same equilibrium."**
- **Anti-analogy**: detailed balance is NOT a universal requirement for equilibrium — a
  circulating current (like a one-way 3-cycle) can maintain a perfectly steady overall
  distribution while flows are genuinely unequal in each direction.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: the weather chain converging from $[1,0,0]$ toward $\pi$
  over many steps.
- **Demonstration 2 (targets MC-2)**: the 3-cycle chain's $\pi=[1/3,1/3,1/3]$, stationary yet
  violating detailed balance.
- **Demonstration 3 (targets MC-3)**: a reducible chain's multiple stationary distributions versus
  a periodic chain's unique-but-non-convergent one.

## Discovery Questions
1. "Is the stationary distribution π the distribution the chain starts in, or the one it
   converges to?"
2. "Must a distribution satisfy detailed balance in order to be stationary?"
3. "Does every Markov chain have exactly one stationary distribution?"

## Teaching Sequence
1. **Representation shift**: the balance-equation setup and long-run-convergence interpretation,
   working Demonstration 1, isolating MC-1.
2. **Pattern induction**: the detailed-balance sufficiency proof and 3-cycle counterexample,
   working Demonstration 2, isolating MC-2.
3. **Pattern induction (continued)**: uniqueness and convergence hypotheses, working
   Demonstration 3, isolating MC-3.
4. **Mastery gate**: require a correct balance-equation solution for a new chain, a correct
   application of detailed balance for a birth-death chain, and a correct identification of when
   uniqueness or convergence fails, at the Blueprint's own stated MAMR of 4/5.

## Tutor Actions
- Never accept the stationary distribution treated as the chain's starting distribution.
- Never accept detailed balance presented as a requirement for stationarity rather than a
  sufficient shortcut.
- Never accept a claim that every Markov chain has exactly one stationary distribution without
  verifying irreducibility.

## Voice Teaching Notes
- Say "is that the starting distribution, or the one the chain settles into?" whenever a
  stationary distribution is discussed.
- When detailed balance is invoked, ask "does the distribution HAVE to satisfy this, or is this
  just one way to find it?"

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly sets up and solves the balance equations $\pi P=\pi$
  for a new chain.
- **Rung 2 (application)**: learner correctly applies detailed balance to solve a birth-death
  chain telescopically.
- **Rung 3 (transfer)**: learner correctly connects stationary-distribution theory to
  Metropolis-Hastings, Gibbs sampling, or PageRank, explaining why detailed balance guarantees the
  target distribution is stationary.

## Tutor Recovery Strategy
- If MC-1 recurs, re-walk the weather-chain convergence example.
- If MC-2 recurs, re-walk the 3-cycle counterexample.
- If MC-3 recurs, re-walk the reducible and periodic chain examples.

## Memory Hooks
- "Stationary means unchanged by one more step — not fixed from the beginning."
- "Detailed balance is sufficient for stationarity, never necessary — some equilibria have
  circulating currents."
- "Uniqueness needs irreducibility; convergence needs ergodicity — check both separately."

## Transfer Connections
- `math.prob.transition-matrix` (already authored, this campaign, Batch 142): supplies the
  transition matrix $P$ and matrix-power machinery this concept's balance equations directly
  build on.
- `math.prob.ergodicity` (not yet authored): the KG's declared unlock, fully developing when a
  chain both has a unique stationary distribution AND converges to it.

## Cross-Subject Connections
- None formal.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.prob.stationary-distribution.md`, reused by
  reference for its balance-equation worked examples, its detailed-balance/3-cycle
  counterexample, its uniqueness-and-convergence hypothesis clarification, and its
  three-misconception register (birth types adopted directly as declared).
- Transfer probe: the Blueprint's own independence-mode probe, connecting stationary-distribution
  theory to Metropolis-Hastings, Gibbs sampling, and PageRank.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires
  `math.prob.transition-matrix`, unlocks `math.prob.ergodicity`, cross_links none, expert/apply,
  mastery_threshold 0.75, estimated_hours 5) was directly verified against the live KG and
  matches exactly.

## Version History
- 2026-09-19 (Batch 143): authored. First entry this batch. Companion batch concept:
  `math.prob.poisson-process`.
