# math.prob.ergodicity

## Identity
- **KG id**: `math.prob.ergodicity`
- **Domain**: math.prob
- **Requires**: `math.prob.stationary-distribution`
- **Unlocks**: none
- **Cross-links**: none
- **Difficulty**: expert
- **Bloom level**: analyze
- **Mastery threshold**: 0.7
- **Estimated hours**: 6

## Learning Objective
State the ergodic theorem — for an ergodic (irreducible + aperiodic + positive recurrent) Markov
chain, the TIME average $(1/n)\sum_{k=0}^{n-1}f(X_k)$ converges almost surely to the SPACE average
$\sum_i\pi_if(i)$; correctly identify that ergodicity means time averages equal the SPECIFIC
stationary distribution $\pi$ (never necessarily uniform visitation); apply ergodicity to finite
chains, not only infinite/continuous ones; define mixing time via total-variation distance to
$\pi$; and correctly distinguish the ergodic theorem's almost-sure TIME-average convergence from
DISTRIBUTIONAL convergence $P^t(x,\cdot)\to\pi$, which additionally requires aperiodicity.

## Core Understanding
ERGODIC MEANS TIME AVERAGES CONVERGE TO THE SPECIFIC $\pi$ — NEVER "EQUAL VISITATION OF ALL
STATES": for $P=\begin{pmatrix}0.9&0.1\\0.3&0.7\end{pmatrix}$: irreducible (both states
communicate) and aperiodic ($P_{11}=0.9>0$), hence ergodic, with $\pi=(0.75,0.25)$ — genuinely NOT
uniform. The ergodic theorem guarantees the long-run fraction of time in state 1 converges to
$0.75$, NOT to $0.5$ — ergodicity says time averages track $\pi$, whatever $\pi$ happens to be,
never that all states get equal time.

ERGODICITY APPLIES TO FINITE CHAINS JUST AS MUCH AS INFINITE ONES: for the SAME 2-state chain
above, being finite, irreducible, and aperiodic is SUFFICIENT for ergodicity (finite irreducible
chains are automatically positive recurrent) — no infinite or continuous state space is required.
A random walk on $\{0,1,\ldots,n\}$ or a finite weather chain can be fully analyzed for ergodicity
using exactly the same irreducible+aperiodic check, never requiring an unbounded state space.

TIME-AVERAGE CONVERGENCE AND DISTRIBUTIONAL CONVERGENCE ARE DISTINCT RESULTS WITH DIFFERENT
HYPOTHESES: a random walk on a 10-cycle (period 2) has time fraction at vertex 0 converging to
$\pi_0=1/10$ (the ergodic theorem holds for ANY irreducible + positive recurrent chain, periodic or
not). But $P^n(0,0)$ OSCILLATES — zero for odd $n$, positive for even $n$ — it NEVER converges,
because distributional convergence additionally requires APERIODICITY. Confirming time averages
converge is never sufficient to conclude the one-step distribution itself converges.

## Mental Models
- **"Ergodicity says time average equals space average — π decides how much time each state gets,
  and π is rarely uniform; equal visitation is a special case, not the definition."**
- **"Two separate convergence claims live here: time averages (irreducible + positive recurrent,
  even periodic chains) versus one-step distributions (additionally needs aperiodic) — proving one
  never proves the other."**

## Why Students Fail

### MC-1: ERGODIC-MEANS-THE-CHAIN-VISITS-ALL-STATES-EQUALLY
- **Surface form**: thinks an ergodic chain must spend equal time in all states, missing that time
  averages equal the specific (possibly non-uniform) stationary distribution.
- **Birth type**: Type 3, language contamination (Blueprint's own declared birth type —
  "ergodic" in physics informally describes systems visiting all regions of phase space, leading
  students to assume equal visitation rather than the mathematical stationary-measure definition).
- **Repair**: re-walk the $\pi=(0.75,0.25)$ example, confirming ergodicity with genuinely unequal
  long-run visitation.

### MC-2: ERGODICITY-REQUIRES-AN-INFINITE-STATE-SPACE
- **Surface form**: believes ergodicity only applies to infinite or continuous chains, not finite
  ones.
- **Birth type**: Type 5, instruction-induced (Blueprint's own declared birth type — ergodicity and
  mixing time are often introduced via random walks on large graphs or continuous systems, without
  explicit finite-chain examples).
- **Repair**: re-verify ergodicity directly on the finite 2-state chain via irreducibility and
  aperiodicity alone.

### MC-3: TIME-AVERAGE-CONVERGENCE-MEANS-DISTRIBUTION-CONVERGENCE
- **Surface form**: conflates the ergodic theorem (time averages converge) with distributional
  convergence $P^n(x,\cdot)\to\pi$, missing that these are distinct results with different
  hypotheses.
- **Birth type**: Type 1, overgeneralization (Blueprint's own declared birth type — both
  conclusions involve "converging to stationarity," obscuring the distinction between almost-sure
  averages and weak convergence of distributions).
- **Repair**: re-walk the 10-cycle counterexample, showing time averages converge while
  $P^n(0,0)$ oscillates forever.

## Misconceptions

### MC-1: ERGODIC-MEANS-THE-CHAIN-VISITS-ALL-STATES-EQUALLY
- **Surface form**: as described above.
- **Root cause (Type 3)**: as described above.
- **Repair**: as described above.

### MC-2: ERGODICITY-REQUIRES-AN-INFINITE-STATE-SPACE
- **Surface form**: as described above.
- **Root cause (Type 5)**: as described above.
- **Repair**: as described above.

### MC-3: TIME-AVERAGE-CONVERGENCE-MEANS-DISTRIBUTION-CONVERGENCE
- **Surface form**: as described above.
- **Root cause (Type 1)**: as described above.
- **Repair**: as described above.

## Analogies
- **"An ergodic chain is like a well-shuffled deck's long-run habits — a biased shuffle visits
  some arrangements far more than others in the long run, yet is still perfectly 'ergodic' as long
  as time averages track that biased frequency."**
- **Anti-analogy**: the ergodic theorem's time-average convergence is NOT the same guarantee as
  the one-step distribution settling down — a periodic chain's time averages converge fine while
  its instantaneous distribution keeps oscillating forever.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: the $\pi=(0.75,0.25)$ 2-state chain, ergodic with genuinely
  unequal long-run visitation.
- **Demonstration 2 (targets MC-2)**: the same finite chain verified ergodic via irreducibility and
  aperiodicity alone, no infinite state space needed.
- **Demonstration 3 (targets MC-3)**: the 10-cycle's converging time averages versus its
  perpetually oscillating $P^n(0,0)$.

## Discovery Questions
1. "Does an ergodic chain need to spend equal time in every state, or just have its time averages
   converge to π, whatever π happens to be?"
2. "Can a finite Markov chain be ergodic, or does ergodicity require an infinite state space?"
3. "If a chain's time averages converge to π, does that also mean its one-step distribution
   Pⁿ(x,·) converges to π?"

## Teaching Sequence
1. **Representation shift**: the ergodic theorem's statement and the non-uniform $\pi=(0.75,0.25)$
   demonstration, isolating MC-1.
2. **Pattern induction**: mixing time, total variation distance, and the finite-chain verification,
   isolating MC-2.
3. **Conflict evidence**: the 10-cycle time-average-versus-distributional-convergence contrast,
   isolating MC-3.
4. **Mastery gate**: require a correct ergodicity verification for a new finite chain, a correct
   mixing-time bound via the spectral gap, and a correct explanation distinguishing time-average
   from distributional convergence, at the Blueprint's own stated MAMR of 4/5.

## Tutor Actions
- Never accept "ergodic" interpreted as requiring equal long-run visitation of all states.
- Never accept a claim that ergodicity requires an infinite or continuous state space.
- Never accept time-average convergence treated as equivalent to distributional convergence
  without checking aperiodicity separately.

## Voice Teaching Notes
- Say "is π uniform here, or does ergodicity just mean time averages track whatever π actually
  is?" whenever ergodicity is discussed.
- When distributional behavior is claimed, ask "have you checked aperiodicity, or are you only
  relying on the ergodic theorem for time averages?"

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly verifies a finite chain is ergodic via
  irreducibility and aperiodicity.
- **Rung 2 (application)**: learner correctly bounds a chain's mixing time using the spectral gap.
- **Rung 3 (transfer)**: learner correctly connects the ergodic theorem to MCMC estimation and the
  Birkhoff ergodic theorem, and explains why burn-in is discarded before using ergodic averages.

## Tutor Recovery Strategy
- If MC-1 recurs, re-walk the non-uniform $\pi=(0.75,0.25)$ example.
- If MC-2 recurs, re-verify ergodicity directly on a finite chain.
- If MC-3 recurs, re-walk the 10-cycle time-average-versus-distribution contrast.

## Memory Hooks
- "Ergodic means time average = π, whatever π is — not equal visitation."
- "Finite chains can be ergodic too — irreducible + aperiodic is enough."
- "Time averages converging (ergodic theorem) and distributions converging (needs aperiodicity)
  are two separate claims."

## Transfer Connections
- `math.prob.stationary-distribution` (already authored, this campaign, Batch 143): supplies the
  stationary distribution $\pi$ and the uniqueness/convergence hypothesis distinctions this
  concept's ergodic theorem directly builds on, closing its declared unlock.

## Cross-Subject Connections
- None formal.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.prob.ergodicity.md`, reused by reference for
  its ergodic-theorem statement, its non-uniform-π finite-chain example, its mixing-time/spectral-
  gap framework, and its three-misconception register (birth types adopted directly as declared).
- Transfer probe: the Blueprint's own independence-mode probe, connecting Markov-chain ergodicity
  to the Birkhoff ergodic theorem, rapid mixing for approximate counting, and the coupling
  argument.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires
  `math.prob.stationary-distribution`, unlocks none, cross_links none, expert/analyze,
  mastery_threshold 0.7, estimated_hours 6) was directly verified against the live KG and matches
  exactly.

## Version History
- 2026-09-19 (Batch 144): authored. Second entry this batch, closing out
  `math.prob.stationary-distribution`'s declared unlock. Companion batch concept:
  `math.prob.distribution`.
