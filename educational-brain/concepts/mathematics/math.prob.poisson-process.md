# math.prob.poisson-process

## Identity
- **KG id**: `math.prob.poisson-process`
- **Domain**: math.prob
- **Requires**: `math.prob.discrete-distributions`, `math.prob.continuous-distributions`,
  `math.prob.independence` (Blueprint's own "Prerequisites" field listed only
  `math.prob.discrete-distributions` — an incomplete declaration; the live KG's complete
  three-prerequisite list used as authoritative, see Curriculum Feedback)
- **Unlocks**: none
- **Cross-links**: none
- **Difficulty**: expert
- **Bloom level**: apply
- **Mastery threshold**: 0.8
- **Estimated hours**: 7

## Learning Objective
Define the Poisson process via its axioms (independent increments, stationary increments,
orderliness) and equivalently via $N(t)\sim\text{Poisson}(\lambda t)$ or i.i.d.
$\text{Exponential}(\lambda)$ interarrival times; apply the MEMORYLESS property; compute
probabilities using $\text{Poisson}(\lambda t)$; apply SUPERPOSITION (independent Poisson
processes sum to Poisson) and THINNING (each event kept with probability $p$ gives
$\text{Poisson}(\lambda p)$); and state the PASTA property.

## Core Understanding
INTERARRIVAL TIMES ARE RANDOM AND EXPONENTIAL — NEVER REGULARLY SPACED: a rate-$\lambda$ Poisson
process has $S_i\sim\text{Exponential}(\lambda)$, mean $1/\lambda$ but standard deviation ALSO
$1/\lambda$ — high variability, not regularity. Actual arrivals genuinely cluster (several close
together) and spread out (long gaps) — "rate $\lambda$" describes only the AVERAGE, never a fixed
spacing. A deterministic process with constant interarrival $1/\lambda$ is NOT a Poisson process
at all (it fails the independence-of-increments axiom).

SUPERPOSITION WORKS FOR ANY RATES, NEVER REQUIRING EQUAL $\lambda$'s: for independent
$N_1(t)\sim\text{Poisson}(\lambda_1t)$ and $N_2(t)\sim\text{Poisson}(\lambda_2t)$:
$N_1(t)+N_2(t)\sim\text{Poisson}((\lambda_1+\lambda_2)t)$ — verified via the MGF argument
$M_{N_1+N_2}(t)=e^{\lambda_1(e^t-1)}\cdot e^{\lambda_2(e^t-1)}=e^{(\lambda_1+\lambda_2)(e^t-1)}$,
holding REGARDLESS of whether $\lambda_1=\lambda_2$. For a call center receiving calls from two
sources at $4/\text{hr}$ and $6/\text{hr}$: the total is $\text{Poisson}(10/\text{hr})$ directly.

THINNING PRESERVES THE FULL POISSON STRUCTURE — THE THINNED PROCESS HAS ITS OWN EXPONENTIAL
INTERARRIVAL TIMES AT THE NEW RATE, NEVER THE ORIGINAL RATE: keeping each event independently with
probability $p$ gives a $\text{Poisson}(\lambda p)$ process whose OWN interarrival times are
$\text{Exponential}(\lambda p)$ — NOT $\text{Exponential}(\lambda)$. For a bus route with
$\lambda=12/\text{hr}$, each bus going your direction with probability 0.7: your buses form
$\text{Poisson}(8.4/\text{hr})$, with mean interarrival time $1/8.4$ hours, genuinely LONGER than
the original $1/12$ — sparser events, not the original spacing thinned down. The kept and
discarded sub-processes are furthermore INDEPENDENT of each other, a non-obvious but essential
fact.

## Mental Models
- **"Rate λ describes an average, never a schedule — Poisson arrivals are the maximally random
  process consistent with that average, genuinely clustering and gapping."**
- **"Thinning doesn't just remove events from the original timeline — it produces a genuinely new
  Poisson process with its own exponential interarrival times at the reduced rate."**

## Why Students Fail

### MC-1: POISSON-PROCESS-REQUIRES-EQUALLY-SPACED-ARRIVALS
- **Surface form**: imagines events arriving at regular intervals of length $1/\lambda$.
- **Birth type**: Type 3, language contamination (Blueprint's own declared birth type — "rate" in
  everyday language suggests regularity like heartbeats or clock ticks, whereas here it describes
  an average rate of a genuinely random process).
- **Repair**: re-simulate mentally drawing 10 interarrival times from $\text{Exp}(\lambda)$,
  observing genuine clustering and gaps.

### MC-2: SUPERPOSITION-REQUIRES-SAME-RATE
- **Surface form**: incorrectly states superposition only works when component processes share
  the same rate $\lambda$.
- **Birth type**: Type 5, instruction-induced (Blueprint's own declared birth type — superposition
  is often demonstrated with equal rates for pedagogical simplicity, and students assume this is
  a genuine requirement).
- **Repair**: re-verify the MGF argument works for ANY $\lambda_1,\lambda_2$, applying it to a
  genuinely unequal-rate example.

### MC-3: THINNING-CHANGES-THE-INTERARRIVAL-DISTRIBUTION
- **Surface form**: believes the thinned process's interarrival times remain $\text{Exp}(\lambda)$
  (the original rate) rather than $\text{Exp}(\lambda p)$.
- **Birth type**: Type 1, overgeneralization (Blueprint's own declared birth type — students track
  the ORIGINAL process's interarrival times and try to thin those directly, rather than
  recognizing the thinned process inherits the full Poisson structure at its own new rate).
- **Repair**: re-derive the thinned process's own $\text{Exp}(\lambda p)$ interarrival times from
  the defining axioms.

## Misconceptions

### MC-1: POISSON-PROCESS-REQUIRES-EQUALLY-SPACED-ARRIVALS
- **Surface form**: as described above.
- **Root cause (Type 3)**: as described above.
- **Repair**: as described above.

### MC-2: SUPERPOSITION-REQUIRES-SAME-RATE
- **Surface form**: as described above.
- **Root cause (Type 5)**: as described above.
- **Repair**: as described above.

### MC-3: THINNING-CHANGES-THE-INTERARRIVAL-DISTRIBUTION
- **Surface form**: as described above.
- **Root cause (Type 1)**: as described above.
- **Repair**: as described above.

## Analogies
- **"A Poisson process is like popcorn popping — the average rate is steady, but individual pops
  cluster and space out unpredictably, never on a metronome."**
- **Anti-analogy**: thinning a Poisson process is NOT like removing beats from a fixed rhythm —
  it produces a genuinely new random process with its own, sparser exponential timing.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: the mental simulation of 10 $\text{Exp}(\lambda)$
  interarrival draws, showing genuine clustering and gaps.
- **Demonstration 2 (targets MC-2)**: the MGF-based superposition proof applied to unequal rates
  $\lambda_1=4,\lambda_2=6$.
- **Demonstration 3 (targets MC-3)**: the bus-route thinning example, deriving
  $\text{Exp}(8.4/\text{hr})$ interarrival times for the kept sub-process.

## Discovery Questions
1. "Does a Poisson process with rate λ mean events arrive every 1/λ time units regularly?"
2. "Does superposition of two independent Poisson processes require them to have the same rate?"
3. "After thinning a Poisson(λ) process by keeping each event with probability p, are the kept
   process's interarrival times Exp(λ) or Exp(λp)?"

## Teaching Sequence
1. **Representation shift**: the three equivalent definitions and the interarrival-time
   randomness demonstration, isolating MC-1.
2. **Pattern induction**: the superposition and thinning results, isolating MC-2 and MC-3
   respectively.
3. **Mastery gate**: require a correct probability computation using $\text{Poisson}(\lambda t)$,
   a correct superposition computation for unequal rates, and a correct thinning computation
   identifying the new interarrival distribution, at the Blueprint's own stated MAMR of 4/5.

## Tutor Actions
- Never accept a Poisson process described as having regularly spaced arrivals.
- Never accept superposition restricted to equal-rate component processes.
- Never accept a thinned process's interarrival times computed using the original rate $\lambda$
  instead of $\lambda p$.

## Voice Teaching Notes
- Say "is that a fixed schedule, or an average rate for a random process?" whenever Poisson
  arrivals are discussed.
- When thinning is applied, ask "what's the new rate the kept process actually runs at?"

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly computes a Poisson probability and interarrival-time
  probability for a given rate.
- **Rung 2 (application)**: learner correctly applies superposition to combine two Poisson
  processes with different rates.
- **Rung 3 (transfer)**: learner correctly applies thinning to a real-world scenario, identifying
  the correct new rate and interarrival distribution, and connects the framework to PASTA and
  queuing theory.

## Tutor Recovery Strategy
- If MC-1 recurs, re-simulate mentally drawing exponential interarrival times.
- If MC-2 recurs, re-verify the MGF argument for unequal rates.
- If MC-3 recurs, re-derive the thinned process's own interarrival distribution from the axioms.

## Memory Hooks
- "Rate λ is an average, not a schedule — Poisson arrivals cluster and gap randomly."
- "Superposition works for any rates — equal rates are a special case, not a requirement."
- "A thinned process gets its OWN new rate λp — its interarrival times are Exp(λp), not Exp(λ)."

## Transfer Connections
- `math.prob.discrete-distributions` (already authored, certified domain): supplies the Poisson
  distribution $N(t)\sim\text{Poisson}(\lambda t)$ this concept's counting process specializes.
- `math.prob.continuous-distributions` (already authored, certified domain): supplies the
  Exponential distribution governing interarrival times.
- `math.prob.independence` (already authored, certified domain): supplies the independence
  structure underlying independent increments, superposition, and thinning.

## Cross-Subject Connections
- None formal.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.prob.poisson-process.md`, reused by
  reference for its three-definitions framework, its superposition MGF proof, its thinning
  bus-route example, and its three-misconception register (birth types adopted directly as
  declared).
- Transfer probe: the Blueprint's own independence-mode probe, extending to renewal processes,
  compound Poisson processes, and the M/M/1 queue via PASTA.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Incomplete Blueprint metadata found and corrected**: the Blueprint's own "Prerequisites"
  field lists only `math.prob.discrete-distributions`, omitting `math.prob.continuous-
  distributions` and `math.prob.independence` — the live KG's complete three-prerequisite
  `requires` field used as authoritative throughout this entry (this pattern last occurred at
  Batch 142's `transition-matrix`). All other fields (unlocks none, cross_links none, expert/
  apply, mastery_threshold 0.8, estimated_hours 7) matched exactly.

## Version History
- 2026-09-19 (Batch 143): authored. Second entry this batch. Companion batch concept:
  `math.prob.stationary-distribution`.
