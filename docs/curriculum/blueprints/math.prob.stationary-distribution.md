# Blueprint: math.prob.stationary-distribution

## Component 0 — Concept Identity
| Field | Value |
|---|---|
| KG ID | math.prob.stationary-distribution |
| name | Stationary Distribution |
| Domain | math.prob |
| Difficulty | expert |
| Bloom level | apply |
| Estimated hours | 5 |
| Mastery threshold | 0.75 |
| MAMR | 4/5 |
| Prerequisites | math.prob.transition-matrix |
| Cross-links | — |
| Unlocks | math.prob.ergodicity |

## Component 1 — Learning Objective
The student defines a stationary distribution π as a probability vector satisfying πP=π and ∑_i πᵢ=1; solves the balance equations for small chains; proves uniqueness for irreducible chains; states the detailed balance condition πᵢP_{ij}=πⱼP_{ji} (reversibility) and explains that it implies stationarity; applies detailed balance to compute stationary distributions without solving linear systems; and connects the stationary distribution to long-run time averages.

## Component 2 — CPA Entry Stage
**P — Pictorial** (draw a 2-state chain with states A and B; draw arrows labeled with transition probabilities; show the stationary distribution as a "balance of flows": π_A × P_{AB} = π_B × P_{BA} (probability flow from A to B equals flow from B to A); label this "detailed balance" and show how solving it gives π_A/π_B = P_{BA}/P_{AB}; illustrate that at stationarity, the distribution is "stationary" — one step further doesn't change it)

## Component 3 — Misconception Register

| ID | Label | Pattern | Birth type |
|---|---|---|---|
| MC-1 | STATIONARY-DISTRIBUTION-IS-THE-INITIAL-DISTRIBUTION | Student believes the stationary distribution π is the distribution at time 0; doesn't know π is the LONG-RUN distribution that the chain converges to (for ergodic chains), which may differ from any initial distribution | Type 3 — language contamination ("stationary" suggests something fixed from the start; in the probabilistic sense it means a distribution that doesn't CHANGE from one step to the next, not that it was always there) |
| MC-2 | DETAILED-BALANCE-IS-REQUIRED-FOR-STATIONARITY | Student believes a distribution must satisfy detailed balance to be stationary; doesn't know detailed balance is SUFFICIENT but not NECESSARY for stationarity (πP=π is the only requirement; detailed balance is a stronger condition that implies reversibility) | Type 5 — instruction-induced (detailed balance is usually taught as the method for finding stationary distributions; students generalise the calculation method to a definition requirement) |
| MC-3 | EVERY-CHAIN-HAS-A-UNIQUE-STATIONARY-DISTRIBUTION | Student assumes any Markov chain has exactly one stationary distribution; doesn't account for reducible chains (which have multiple stationary distributions — one supported on each closed communication class) or periodic chains (stationary exists but chain doesn't converge to it) | Type 5 — instruction-induced (uniqueness is proved for irreducible chains; students generalise to all chains without verifying irreducibility) |

## Component 4 — Session TA Cap
**Cap = 7** (hrs = 5 → cap 7)

## Component 5 — Teaching Action Sequence

### A01 — P11 REPRESENTATION SHIFT (open)
**The stationary distribution — long-run equilibrium:**

**Definition:** π is a stationary distribution of chain with transition matrix P if:
1. π is a row probability vector: πᵢ ≥ 0 for all i, ∑ᵢ πᵢ = 1
2. πP = π (stationarity condition: one more step doesn't change the distribution)

**In component form:** πⱼ = ∑ᵢ πᵢ P_{ij} for all states j.

**How to solve:** Form the linear system πP=π (equivalent to π(P−I)=0) together with ∑πᵢ=1. Solve simultaneously.

**Example (2-state chain):**
P = [[1−α, α],[β, 1−β]] (α,β∈(0,1)).

πP=π gives: π₁(1−α)+π₂β=π₁ and π₁α+π₂(1−β)=π₂.
From first equation: −π₁α+π₂β=0 → π₁α=π₂β → π₁/π₂=β/α.
With π₁+π₂=1: **π₁=β/(α+β), π₂=α/(α+β)**.

**Interpretation:** The long-run fraction of time in state 1 is β/(α+β). If α=β: chain spends equal time in each state.

**Existence (finite chain):** Every finite irreducible Markov chain has a unique stationary distribution.

**Uniqueness:** If the chain is irreducible, there is exactly one stationary distribution. If reducible, there may be infinitely many (convex combinations of stationary distributions supported on closed classes).

**P49 checkpoint:**
- CORRECT → "πP=π, ∑πᵢ=1. Solve the linear system. Unique for irreducible chains. Long-run time average interpretation." → A02
- PARTIAL (MC-1: stationary = initial) → "The stationary distribution π is not the starting distribution. It's the distribution the chain APPROACHES over time (for ergodic chains). If the chain starts in some other distribution π₀, then π₀·Pⁿ → π as n→∞. The stationary distribution is a property of the transition matrix, not the initial conditions." → TB-R01 → A02
- INCORRECT → TB-R01 → A02
- NO_RESPONSE → "3-state chain: P=[[0.5,0.3,0.2],[0.1,0.7,0.2],[0.4,0.4,0.2]]. Set up πP=π: π₁=0.5π₁+0.1π₂+0.4π₃, π₂=0.3π₁+0.7π₂+0.4π₃, π₃=0.2π₁+0.2π₂+0.2π₃. Plus π₁+π₂+π₃=1. Solve: π₃=0.2(π₁+π₂+π₃)=0.2 (since sum=1). Simplify remaining equations." → TB-R01 → A02

### A02 — P04 PATTERN INDUCTION
**Detailed balance — the reversibility shortcut:**

**Detailed balance condition:** A distribution π satisfies detailed balance with respect to P if:
πᵢ P_{ij} = πⱼ P_{ji} for ALL pairs (i,j).

**Flow interpretation:** πᵢ P_{ij} = probability flux from i to j; πⱼ P_{ji} = probability flux from j to i. Detailed balance says: flows are equal in both directions (probability currents cancel).

**Theorem:** If π satisfies detailed balance, then π is stationary.
**Proof:** ∑ᵢ πᵢ P_{ij} = ∑ᵢ πⱼ P_{ji} = πⱼ ∑ᵢ P_{ji} = πⱼ·1 = πⱼ. ✓

**Using detailed balance to find π:**
For each pair (i,j), set πᵢ/πⱼ = P_{ji}/P_{ij}. These ratios over-determine π — must be consistent (if ratios are consistent, the chain is reversible). Normalise.

**Example (birth-death chain on {0,1,2,3}):**
From state i, go to i+1 with prob pᵢ or go to i−1 with prob qᵢ (= 1−pᵢ).
Detailed balance: πᵢpᵢ=π_{i+1}q_{i+1} → π_{i+1}=(pᵢ/q_{i+1})πᵢ.
Solve telescopically from π₀.

**Reversibility:** A chain where πᵢP_{ij}=πⱼP_{ji} is called reversible (the chain looks the same forwards and backwards).

**Not every stationary distribution satisfies detailed balance:** A chain with "circular" transitions (1→2→3→1 with probability 1) has stationary distribution π=[1/3,1/3,1/3] but violates detailed balance (flux 1→2 = 1/3·1 = 1/3 ≠ 0 = flux 2→1).

**P49 checkpoint:**
- CORRECT → "Detailed balance: πᵢP_{ij}=πⱼP_{ji}. Sufficient (not necessary) for stationarity. Reversibility. Birth-death chains solved telescopically via detailed balance." → Gate (P91)
- PARTIAL (MC-2: detailed balance required) → "Detailed balance is SUFFICIENT for stationarity but NOT necessary. Many chains are stationary without being reversible. The birth-death chain and MCMC algorithms (Metropolis-Hastings) are designed to be reversible, which makes them easy to analyse. But a 3-cycle chain has π=[1/3,1/3,1/3] as its stationary distribution WITHOUT satisfying detailed balance." → TB-R02 → Gate
- INCORRECT → TB-R02 → Gate
- NO_RESPONSE → "Birth-death chain on {0,1,2}: p₀=0.3, q₁=0.7, p₁=0.4, q₂=0.6, and state 2 is absorbing (q₂=1 at boundary). Use detailed balance: π₀p₀=π₁q₁ → 0.3π₀=0.7π₁ → π₁=(3/7)π₀. π₁p₁=π₂q₂ → 0.4π₁=0.6π₂ → π₂=(2/3)π₁=(2/3)(3/7)π₀=(2/7)π₀. Normalise: π₀(1+3/7+2/7)=π₀(12/7)=1 → π₀=7/12." → TB-R02 → Gate

## Component 6 — Protocol B Repair Chains

**TB-R01 (MC-1 STATIONARY-DISTRIBUTION-IS-THE-INITIAL-DISTRIBUTION):**
Step 1 — "The stationary distribution is defined by πP=π — it is the distribution that is unchanged by one step. If the chain starts in π₀=π (the stationary distribution), it stays in π forever. But the chain can start in any π₀."
Step 2 — "For an ergodic chain: regardless of starting distribution π₀, π₀·Pⁿ→π as n→∞. The starting distribution is irrelevant in the long run — the chain 'forgets' its initial state."
Step 3 — "Example: weather chain starting sunny [1,0,0]. After many steps: [1,0,0]·Pⁿ → π. The initial [1,0,0] is never π (unless π happens to be [1,0,0], which would require a degenerate chain)."

**TB-R02 (MC-2 + MC-3 combined):**
Step 1 — "Detailed balance ⟹ stationarity. But NOT the reverse. A distribution can be stationary without satisfying detailed balance — the chain can have 'probability currents' flowing in cycles."
Step 2 — "Uniqueness holds ONLY for irreducible chains. For a reducible chain with closed classes C₁ and C₂: any convex combination aπ₁+(1−a)π₂ (where πᵢ is the stationary distribution on Cᵢ) is also stationary. Uncountably many stationary distributions."
Step 3 — "Even for irreducible chains: if the chain is periodic (period d≥2), the stationary distribution exists and is unique, but the chain does NOT converge to it — it oscillates. Only ergodic (irreducible + aperiodic + positive recurrent) chains converge."

## Component 7 — P91 Mastery Gate Sequence

**P77 — Problem Set (5 items):**
1. Find the stationary distribution of the weather chain P=[[0.7,0.2,0.1],[0.3,0.4,0.3],[0.2,0.3,0.5]]. (Set up and solve the linear system πP=π with ∑πᵢ=1.)
2. A 2-state chain with α=0.3 and β=0.5 (see A01 formula). Compute the stationary distribution and verify πP=π directly.
3. Birth-death chain on {0,1,2,3}: p₀=p₁=p₂=0.6, q₁=q₂=q₃=0.4, absorbing at both ends. (a) Use detailed balance to find the stationary distribution. (b) Is the chain reversible?
4. A chain has transition matrix P=[[0,1,0],[0,0,1],[1,0,0]]. Find the stationary distribution. Does the chain converge to it? (This chain has a cycle of length 3 — what is the period?)
5. Consider a Markov chain on integers {0,1,2,…} (infinite state space) where from state i, the chain goes to i+1 with probability p and to 0 with probability 1−p (a "renewal chain"). When does a stationary distribution exist? (Hint: try π₀=1−p, πᵢ=(1−p)pⁱ for i≥1 and check πP=π.)

**P55 — Reflect & Consolidate:** "Stationary: πP=π, ∑πᵢ=1. Unique for irreducible chains. Long-run average. Detailed balance (sufficient, not necessary): πᵢP_{ij}=πⱼP_{ji}. Birth-death: solve telescopically. Convergence requires ergodicity."

**P76 — Transfer Probe (Independence mode):**
(a) Metropolis-Hastings algorithm: to sample from a target distribution π on a large state space, construct a Markov chain with stationary distribution π. The Metropolis-Hastings acceptance ratio r(x,y)=min(1, π(y)q(x|y)/(π(x)q(y|x))) ensures detailed balance. Why does satisfying detailed balance guarantee that π is stationary for this chain? (b) Gibbs sampling: a special case of Metropolis-Hastings where components of a multivariate distribution are updated one at a time, always from the conditional distribution. For a bivariate (X,Y): sample X|Y=y, then Y|X=x, repeat. The joint distribution P(X,Y) is the stationary distribution. Why is this useful for Bayesian posterior sampling? (c) The Google PageRank vector is the stationary distribution of a modified random walk on the web. Why does a unique stationary distribution exist? (Hint: the modification with teleportation makes the chain irreducible and aperiodic.)

**P75 — Mastery Assessment:**
"A database server has 3 possible states: Idle (I), Busy-low (L), Busy-high (H). Transition matrix:
P = [[0.5, 0.4, 0.1],
     [0.3, 0.5, 0.2],
     [0.2, 0.3, 0.5]]
(a) Find the stationary distribution π. (b) In the long run, what fraction of time is the server in each state? (c) Does the chain satisfy detailed balance? If not, which pairs violate it? (d) If the cost per time unit is 0 (Idle), 1 (Low), 5 (High), what is the long-run average cost per time unit? (e) If the server starts Idle and Idle→High direct transition probability is 0.1, after how many steps does the distribution reach within 0.01 of the stationary distribution? (Approximate using the 2nd eigenvalue.)"

**P74 — Routing Decision:**
- Score ≥ 5/5 → MASTERED
- Score 4/5 → REVIEW detailed balance vs. stationarity distinction
- Score ≤ 3/5 → PREREQUISITE GAP in math.prob.transition-matrix; reassign

**P78 — Completion:** Stationary Distribution certified. Student solves balance equations; applies detailed balance; identifies when stationarity and uniqueness hold; connects to MCMC and PageRank.

## Component 8 — P76 Transfer Probe Detail
**Mode: Independence** (cross_links = [])
Target: Metropolis-Hastings; Gibbs sampling; PageRank as stationary distribution
Skill tested: Apply stationary distribution theory to Monte Carlo simulation and web algorithms

## Component 10 — Version History
| Version | Date | Note |
|---|---|---|
| 1.0 | 2026-07-30 | Initial authoring |
