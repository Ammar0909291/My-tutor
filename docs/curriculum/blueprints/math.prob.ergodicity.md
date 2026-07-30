# Blueprint: math.prob.ergodicity

## Component 0 — Concept Identity
| Field | Value |
|---|---|
| KG ID | math.prob.ergodicity |
| name | Ergodicity |
| Domain | math.prob |
| Difficulty | expert |
| Bloom level | analyze |
| Estimated hours | 6 |
| Mastery threshold | 0.70 |
| MAMR | 4/5 |
| Prerequisites | math.prob.stationary-distribution |
| Cross-links | — |
| Unlocks | — |

## Component 1 — Learning Objective
The student states the ergodic theorem: for an ergodic Markov chain, the time average (1/n)∑_{k=1}^n f(X_k) converges almost surely to the space average ∑_i πᵢf(i); identifies the conditions for ergodicity (irreducible + aperiodic + positive recurrent for discrete chains; or mixing in continuous settings); explains why periodic and reducible chains are NOT ergodic; states the mixing time as the number of steps until the chain's distribution is close to stationarity; and applies ergodicity to justify Monte Carlo estimates via Markov chains (MCMC).

## Component 2 — CPA Entry Stage
**P — Pictorial** (draw a Markov chain trajectory (sequence of states over time) and two horizontal lines — one showing the empirical frequency of state A (the time average) and one showing πₐ (the space average/stationary probability); show both converging to the same value as time grows; annotate: "time average = space average" — this is what ergodicity says; contrast with a periodic chain where the time average oscillates instead of converging)

## Component 3 — Misconception Register

| ID | Label | Pattern | Birth type |
|---|---|---|---|
| MC-1 | ERGODIC-MEANS-THE-CHAIN-VISITS-ALL-STATES-EQUALLY | Student thinks an ergodic chain must spend equal time in all states; doesn't know ergodicity means time averages equal the specific stationary distribution (which need not be uniform) | Type 3 — language contamination ("ergodic" in physics sometimes describes systems that visit all regions of phase space — this informal description makes students think it means equal visitation; the mathematical definition involves the stationary measure, which can be non-uniform) |
| MC-2 | ERGODICITY-REQUIRES-AN-INFINITE-STATE-SPACE | Student believes ergodicity is a property of infinite or continuous chains only; doesn't apply the concept to finite chains where ergodicity = irreducible + aperiodic | Type 5 — instruction-induced (ergodicity and mixing time are often introduced in the context of random walks on large graphs or continuous systems; students don't see finite-chain examples explicitly analysed for ergodicity) |
| MC-3 | TIME-AVERAGE-CONVERGENCE-MEANS-DISTRIBUTION-CONVERGENCE | Student conflates the ergodic theorem (time averages converge) with convergence in distribution (Pⁿ(x,·)→π in TV distance); doesn't know these are distinct results — time averages converge for ergodic chains; distributional convergence additionally requires the chain to be aperiodic | Type 1 — overgeneralisation (both conclusions involve "converging to stationarity"; students conflate sample-path averages with one-step distributional convergence, missing the distinction between almost-sure convergence of averages and weak convergence of distributions) |

## Component 4 — Session TA Cap
**Cap = 8** (hrs = 6 → cap 8)

## Component 5 — Teaching Action Sequence

### A01 — P11 REPRESENTATION SHIFT (open)
**The ergodic theorem for Markov chains:**

**Setup:** Let X₀,X₁,X₂,… be an ergodic Markov chain (irreducible + aperiodic + positive recurrent) with stationary distribution π. Let f: states → ℝ be any bounded function.

**Ergodic theorem:** With probability 1:
lim_{n→∞} (1/n) ∑_{k=0}^{n−1} f(X_k) = ∑ᵢ πᵢ f(i) = E_π[f(X)]

**Time average = space average** (π-weighted sum over states).

**Special case f(x)=1_{x=j}:** The fraction of time spent in state j converges to πⱼ almost surely. This is why πⱼ is called the "long-run fraction of time in state j."

**Conditions:**
- **Irreducibility:** Ensures the chain visits all states (no state is "unreachable").
- **Positive recurrence:** Ensures the chain returns to each state in finite expected time. (E[return time to state j] = 1/πⱼ.) All states in a finite irreducible chain are positive recurrent.
- **Aperiodicity:** Not required for the time-average convergence, but required for distributional convergence (Pⁿ(x,·)→π).

**Proof sketch (for finite, irreducible chains):** By the strong law of large numbers applied to the sequence of return times to state j (which are i.i.d. after the first return), the long-run frequency of visiting j equals 1/(mean return time) = πⱼ.

**MCMC application:** If we want to compute ∑ᵢ πᵢf(i) (an expectation under π), but π is too complex to sample from directly — construct a Markov chain with stationary distribution π, run it for n steps, and use (1/n)∑f(X_k) as the estimate. This converges to the true expectation by the ergodic theorem.

**P49 checkpoint:**
- CORRECT → "Ergodic theorem: time average → space average almost surely. Conditions: irreducible + positive recurrent (+ aperiodic for distributional convergence). MCMC: ergodic theorem justifies using Markov chain time averages as integrals." → A02
- PARTIAL (MC-1: ergodic = visits all states equally) → "Ergodicity means time averages converge to the STATIONARY distribution π, not to the uniform distribution. If state 1 has π₁=0.1 and state 2 has π₂=0.9, an ergodic chain spends 10% of time in state 1 and 90% in state 2 — unequal visitation, but perfectly ergodic. The stationary distribution determines how much time is spent in each state." → TB-R01 → A02
- INCORRECT → TB-R01 → A02
- NO_RESPONSE → "Weather chain: π=(0.4, 0.3, 0.3) for (Sunny, Cloudy, Rainy). Run the chain for 1000 steps. Ergodic theorem predicts: ~400 sunny days, ~300 cloudy, ~300 rainy. If f(Sunny)=1, f(Cloudy)=0.5, f(Rainy)=0 (comfort index): long-run average comfort = π_S·1+π_C·0.5+π_R·0=0.4+0.15+0=0.55." → TB-R01 → A02

### A02 — P04 PATTERN INDUCTION
**Mixing time and convergence rate:**

**Total variation distance:** ‖μ−ν‖_TV = (1/2)∑ᵢ|μᵢ−νᵢ| = max_{A⊆states}|μ(A)−ν(A)|.

**Definition of mixing time:**
T_mix(ε) = min{t : max_{x} ‖P^t(x,·) − π‖_TV ≤ ε}

Typically defined with ε=1/4 (standard convention). T_mix = T_mix(1/4).

**Convergence bound:** For finite, irreducible, aperiodic chains:
‖P^t(x,·) − π‖_TV ≤ (1−γ)^t · max initial distance

where γ = 1 − λ₂ is the spectral gap (λ₂ = second-largest eigenvalue of P in absolute value).

**Implication:** T_mix ≈ (1/γ)·log(1/ε). Small spectral gap → slow mixing.

**Examples:**
- **Random walk on a line** ({0,…,n}): mixing time O(n²) — slow, because it takes O(n²) steps for a random walk to traverse the whole space.
- **Random walk on a complete graph** (Kₙ): mixing time O(log n) — very fast, every step independently mixes.
- **Glauber dynamics for Ising model** at high temperature: fast mixing; at low temperature (below critical): exponentially slow mixing (phase transition!).

**P49 checkpoint:**
- CORRECT → "Mixing time = steps until TV distance to π ≤ ε. Spectral gap determines mixing speed. Aperiodicity required. Fast vs. slow mixing examples." → Gate (P91)
- PARTIAL (MC-3: time average = distributional convergence) → "Two separate convergence results: (1) Ergodic theorem — time averages (1/n)∑f(X_k) → E_π[f] a.s. for irreducible + positive recurrent chains, even periodic ones. (2) Distributional convergence — P^t(x,·)→π in TV distance — requires ALSO aperiodic. A periodic chain with period 2 alternates between two sets of states; its time averages still converge to π, but its one-step distributions oscillate and never converge." → TB-R02 → Gate
- INCORRECT → TB-R02 → Gate
- NO_RESPONSE → "Random walk on a cycle of length 10 (periodic, period 2): starting at vertex 0, after n steps, you're always at an even vertex (even n) or odd vertex (odd n). Time fraction at vertex 0 → 1/10=π₀. But P^n(0,0) oscillates: 0 for odd n, positive for even n. Time average converges; distributional convergence fails." → TB-R02 → Gate

## Component 6 — Protocol B Repair Chains

**TB-R01 (MC-1 + MC-2 combined):**
Step 1 — "Ergodic: irreducible + aperiodic + positive recurrent (= ergodic theorem + distributional convergence). Finite irreducible + aperiodic chains are automatically positive recurrent → ergodic."
Step 2 — "The ergodic theorem guarantees time average → E_π[f], where π is the specific stationary distribution. π can be anything — it's determined by the transition matrix. Uniform π occurs only in special chains (doubly stochastic P where each COLUMN also sums to 1)."
Step 3 — "Finite-chain example: P=[[0.9,0.1],[0.3,0.7]]. π=(0.75, 0.25) (not uniform). This IS ergodic: irreducible (both states communicate), aperiodic (P₁₁=0.9>0). Time fraction in state 1 → 0.75 ≠ 0.50 (not equally visited)."

**TB-R02 (MC-3 TIME-AVERAGE = DISTRIBUTION-CONVERGENCE):**
Step 1 — "Distinct results: time averages converge (ergodic theorem) vs. distributional convergence (Pⁿ(x,·)→π in TV)."
Step 2 — "Periodic chain example: alternating chain with period 2. Even-time chain (look at P²) IS aperiodic and has stationary distribution π. Time averages using the original chain converge to π. But P^t(x,·) oscillates: positive at time 2k, zero at 2k+1 for even-period classes."
Step 3 — "Practical implication for MCMC: time averages work (use for estimating E_π[f]). But you can't check convergence by watching the distribution at one time — it oscillates. Run the chain for a long time and take the average."

## Component 7 — P91 Mastery Gate Sequence

**P77 — Problem Set (5 items):**
1. 2-state ergodic chain with P=[[0.6,0.4],[0.2,0.8]]. (a) Simulate (mentally or computationally) 10 steps starting from state 1. (b) Stationary distribution π. (c) After 100 steps, the empirical fraction of time in state 1 should be close to π₁. What does the ergodic theorem guarantee about this fraction as n→∞?
2. A 3-state chain has P=[[0,1,0],[0,0,1],[1,0,0]]. (a) Is this chain ergodic? (b) Does the time average (1/n)∑𝟏{X_k=1} converge? If so, to what? (c) Does P^n(1,·) converge?
3. For the 2-state chain P=[[1−α,α],[β,1−β]], the second eigenvalue is λ₂=1−α−β. (a) What is the spectral gap γ? (b) Bound the mixing time T_mix (to ε=0.01) in terms of α and β. (c) Which is slower to mix: α=β=0.01 or α=β=0.5?
4. MCMC estimate: π is a distribution on {1,2,3,4,5} with πᵢ∝i (so π₁=1/15, π₂=2/15, …, π₅=5/15). Design a Metropolis-Hastings chain on these states and describe how you would use it to estimate E_π[X²].
5. Prove: if a finite Markov chain is irreducible and has a doubly stochastic transition matrix (each column also sums to 1), then the uniform distribution is stationary. (Hint: check πP=π for uniform π.)

**P55 — Reflect & Consolidate:** "Ergodic theorem: time average → E_π[f] a.s. (irreducible + positive recurrent). Distributional convergence: Pⁿ(x,·)→π in TV (also need aperiodic). Mixing time: steps to get within ε of π. Spectral gap γ: T_mix≈(1/γ)log(1/ε). MCMC: ergodic theorem justifies sampling-based integration."

**P76 — Transfer Probe (Independence mode):**
(a) Continuous ergodic theory: for measure-preserving dynamical systems (T,X,μ), the Birkhoff ergodic theorem states (1/n)∑_{k=0}^{n−1}f(T^kx)→∫f dμ a.e. for ergodic systems. Explain the analogy: what plays the role of the transition matrix P, the stationary distribution π, and the function f? (b) Rapid mixing and counting: for many combinatorial problems (e.g., counting perfect matchings of a bipartite graph), exact counting is #P-complete. Approximate counting can be done by constructing an ergodic Markov chain on the combinatorial structures and estimating the fraction via the ergodic theorem. What mixing-time bound is needed for an ε-approximation in polynomial time? (c) Coupling and mixing: the coupling argument upper-bounds mixing time by constructing two copies of the chain (one starting from the worst initial state, one from π) and bounding the time until they meet (couple). Why does coupling provide a TV distance bound?

**P75 — Mastery Assessment:**
"An MCMC algorithm simulates a Markov chain on {1,2,…,100} with stationary distribution πᵢ∝i² (so π concentrates near 100). The transition matrix has spectral gap γ=0.01. (a) Estimate the mixing time T_mix. (b) If we want to estimate E_π[X]=∑πᵢ·i to within ±1 with 95% probability, how long should we run the chain? (Give a rough estimate: the variance of the time average is ≈(∫f dπ − (∫f dπ)²) × 2/γ / n by the CLT for Markov chains.) (c) The chain starts at state 1 (far from where π concentrates). Should we discard the first T_mix steps as 'burn-in' before using the ergodic average? Justify. (d) If we doubled the spectral gap to γ=0.02 (faster mixing chain), how would the answers to (a) and (b) change?"

**P74 — Routing Decision:**
- Score ≥ 5/5 → MASTERED
- Score 4/5 → REVIEW mixing time definition and spectral gap
- Score ≤ 3/5 → PREREQUISITE GAP in math.prob.stationary-distribution; reassign

**P78 — Completion:** Ergodicity certified. Student states and applies the ergodic theorem; distinguishes time-average from distributional convergence; computes mixing time bounds; connects to MCMC and Birkhoff's theorem.

## Component 8 — P76 Transfer Probe Detail
**Mode: Independence** (cross_links = [])
Target: Birkhoff ergodic theorem; rapid mixing and approximate counting; coupling argument
Skill tested: Connect discrete Markov chain ergodicity to continuous dynamical systems and algorithms

## Component 10 — Version History
| Version | Date | Note |
|---|---|---|
| 1.0 | 2026-07-30 | Initial authoring |
