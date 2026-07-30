# Blueprint: math.prob.transition-matrix

## Component 0 — Concept Identity
| Field | Value |
|---|---|
| KG ID | math.prob.transition-matrix |
| name | Transition Matrix |
| Domain | math.prob |
| Difficulty | expert |
| Bloom level | apply |
| Estimated hours | 5 |
| Mastery threshold | 0.80 |
| MAMR | 4/5 |
| Prerequisites | math.prob.markov-chain |
| Cross-links | — |
| Unlocks | — |

## Component 1 — Learning Objective
The student defines the transition matrix P with entries P_{ij}=P(X_{n+1}=j|X_n=i); verifies that P is a stochastic matrix (rows sum to 1, entries ≥0); computes the n-step transition matrix Pⁿ via matrix multiplication; states and applies the Chapman-Kolmogorov equation P^{m+n}=P^m·P^n; classifies states as recurrent, transient, absorbing, or periodic; and identifies communication classes and determines whether a chain is irreducible.

## Component 2 — CPA Entry Stage
**P — Pictorial** (draw a 3-state Markov chain as a directed graph with states {S₁, S₂, S₃}; label each edge with its transition probability; show the corresponding 3×3 matrix P alongside; annotate: "Each row is a probability distribution (sums to 1). Entry P_{ij} = probability of going from state i to state j in one step. No arrow means P_{ij}=0.")

## Component 3 — Misconception Register

| ID | Label | Pattern | Birth type |
|---|---|---|---|
| MC-1 | P-IJ-IS-THE-PROBABILITY-OF-BEING-IN-STATE-J | Student reads P_{ij} as "the probability of being in state j" (a marginal probability) rather than "the probability of transitioning FROM state i TO state j" (a conditional probability) | Type 3 — language contamination ("transition probability" and "state probability" both refer to probabilities related to states; the conditional vs. marginal distinction is easy to miss when writing matrices) |
| MC-2 | N-STEP-PROBABILITY-IS-N-TIMES-ONE-STEP | Student computes P^{(n)}_{ij} as n·P_{ij} instead of the (i,j) entry of Pⁿ; doesn't multiply the matrix by itself n times | Type 1 — overgeneralisation (linearity of expectation makes students think "n steps" scales linearly; matrix exponentiation is the correct mechanism, not multiplication by n) |
| MC-3 | IRREDUCIBLE-MEANS-ALL-TRANSITION-PROBABILITIES-ARE-POSITIVE | Student confuses irreducibility (every state is reachable from every other state IN SOME NUMBER OF STEPS) with having all P_{ij}>0 (reachable in exactly one step); misclassifies chains with zero one-step entries as reducible | Type 1 — overgeneralisation (P_{ij}>0 for all i,j → irreducible is true; students invert this: if some P_{ij}=0, they conclude the chain is reducible, missing the reachability-in-multiple-steps criterion) |

## Component 4 — Session TA Cap
**Cap = 7** (hrs = 5 → cap 7)

## Component 5 — Teaching Action Sequence

### A01 — P11 REPRESENTATION SHIFT (open)
**The transition matrix — encoding one-step dynamics:**

**Setup:** A Markov chain has states {1,2,…,m}. The transition matrix P is the m×m matrix where:
P_{ij} = P(X_{n+1}=j | X_n=i)

**Stochastic matrix properties:**
- P_{ij} ≥ 0 for all i,j
- ∑_j P_{ij} = 1 for all i (each row sums to 1)

**Example — weather model (3 states: Sunny, Cloudy, Rainy):**
```
         S    C    R
Sunny  [0.7  0.2  0.1]
P =  Cloudy  [0.3  0.4  0.3]
Rainy   [0.2  0.3  0.5]
```

**Initial distribution:** π₀ = row vector of P(X₀=state). E.g., if we start in Sunny with certainty: π₀ = [1, 0, 0].

**One-step distribution:** π₁ = π₀·P. (Row vector times matrix: π₁_j = ∑_i π₀_i·P_{ij}.)

**n-step distribution:** πₙ = π₀·Pⁿ. (Multiply matrix by itself n times.)

**n-step transition probability:** P^{(n)}_{ij} = (Pⁿ)_{ij} — the (i,j) entry of the n-th power of P.

**Chapman-Kolmogorov equation:** P^{m+n} = P^m · P^n. (Moving m steps then n steps equals moving m+n steps.)

**P49 checkpoint:**
- CORRECT → "P_{ij}=P(go to j | from i). Rows sum to 1. n-step: Pⁿ (matrix power). Chapman-Kolmogorov: P^{m+n}=P^m·P^n. πₙ=π₀·Pⁿ." → A02
- PARTIAL (MC-2: multiply instead of exponentiate) → "P^{(2)}_{ij} is NOT 2·P_{ij}. It's (P²)_{ij}=∑_k P_{ik}·P_{kj} — the probability of reaching j from i in 2 steps, summing over all intermediate states k. After 2 steps in the weather example: P²_{S,S}=0.7²+0.2×0.3+0.1×0.2=0.49+0.06+0.02=0.57." → TB-R01 → A02
- INCORRECT → TB-R01 → A02
- NO_RESPONSE → "2-state chain: P=[[0.6, 0.4],[0.2, 0.8]]. If X₀=state 1, what is P(X₂=state 2)? Compute P²: (P²)_{12}=P_{11}·P_{12}+P_{12}·P_{22}=0.6×0.4+0.4×0.8=0.24+0.32=0.56." → TB-R01 → A02

### A02 — P04 PATTERN INDUCTION
**Classification of states:**

**Communication:** State j is reachable from state i (i→j) if P^{(n)}_{ij}>0 for SOME n≥1. States i and j communicate (i↔j) if i→j and j→i.

**Communication classes:** The relation ↔ is an equivalence relation; it partitions the states into communication classes.

**Irreducible chain:** A chain where all states communicate (one communication class). Equivalently: from any state, any state can eventually be reached.

**Absorbing state:** State i where P_{ii}=1 (once entered, never left).

**Transient vs. recurrent:** State i is recurrent if P(return to i | start at i) = 1. State i is transient if P(return to i | start at i) < 1.
- In a finite irreducible chain: all states are recurrent.
- In an infinite chain: random walk on ℤ is recurrent (d=1,2) but transient (d≥3).

**Period:** State i has period d(i) = gcd{n≥1 : P^{(n)}_{ii}>0}. If d(i)=1, state i is aperiodic; if d(i)>1, it is periodic.

**Ergodic chain:** Irreducible + aperiodic + positive recurrent → the chain has a unique stationary distribution and Pⁿ converges to it.

**Example:**
```
P = [[0, 1],
     [1, 0]]  (states alternate: period 2, not ergodic)

P = [[0.5, 0.5],
     [0.5, 0.5]]  (irreducible, aperiodic → ergodic)
```

**P49 checkpoint:**
- CORRECT → "States communicate ↔ mutually reachable. Irreducible: one communication class. Recurrent: certain return. Period: gcd of return times. Ergodic: irreducible + aperiodic + positive recurrent." → Gate (P91)
- PARTIAL (MC-3: irreducible means P_{ij}>0 for all i,j) → "Irreducibility only requires eventual reachability. Example: P=[[0,1],[1,0]]. P₁₂=1, P₂₁=1, P₁₁=0, P₂₂=0. Is state 2 reachable from state 1 in ONE step? Yes (P₁₂=1). Is state 1 reachable from state 2? Yes (P₂₁=1). Both states communicate → irreducible. The chain is periodic (period 2), but still irreducible." → TB-R02 → Gate
- INCORRECT → TB-R02 → Gate
- NO_RESPONSE → "Chain with 3 states: P=[[0.5,0.5,0],[0,0.5,0.5],[0.5,0,0.5]]. (a) Can we reach state 3 from state 1? P₁₃=0 (not in one step). P²₁₃=(P₁₁·P₁₃+P₁₂·P₂₃+P₁₃·P₃₃)=0+0.5×0.5+0=0.25. Yes, in 2 steps! (b) Conclusion: all states communicate → irreducible." → TB-R02 → Gate

## Component 6 — Protocol B Repair Chains

**TB-R01 (MC-2 N-STEP-PROBABILITY-IS-N-TIMES-ONE-STEP):**
Step 1 — "P^{(n)}_{ij} = (Pⁿ)_{ij}: you matrix-multiply P by itself n times. This accounts for all possible paths of length n from i to j."
Step 2 — "Why matrix multiplication? P^{(2)}_{ij}=∑_k P_{ik}P_{kj}. For each intermediate state k (visited after step 1), multiply the probability of going i→k by the probability of going k→j. Sum over all k. This is the (i,j) entry of P·P=P²."
Step 3 — "Verify: for a 2×2 stochastic matrix, compute P² directly and check all rows still sum to 1 (they will — the product of stochastic matrices is stochastic)."

**TB-R02 (MC-3 IRREDUCIBLE-MEANS-P-IJ-ALL-POSITIVE):**
Step 1 — "Irreducible: for every pair (i,j), there EXISTS some n≥1 such that P^{(n)}_{ij}>0. Not necessarily n=1."
Step 2 — "Example: simple random walk on a line {0,1,2} with boundaries. P_{01}=1, P_{10}=0.5, P_{12}=0.5, P_{21}=1. P_{02}=0 but P^{(2)}_{02}=P_{01}P_{12}=0.5>0. So state 0 can reach state 2 in 2 steps → they communicate."
Step 3 — "The directed graph view: i→j if there is a directed path from i to j (any length). Irreducible ↔ the directed graph is strongly connected."

## Component 7 — P91 Mastery Gate Sequence

**P77 — Problem Set (5 items):**
1. Weather chain (Sunny/Cloudy/Rainy) with P as above. Starting from Sunny: (a) compute the 2-day state distribution; (b) compute the 3-day state distribution using π₂·P instead of recomputing P³ from scratch.
2. A gambler has $2. Each round: win $1 with prob 0.6, lose $1 with prob 0.4. The game stops at $0 or $5. Write the transition matrix (7×7, states 0,1,2,3,4,5), identify absorbing states, and classify each state as absorbing, transient, or recurrent.
3. Two-state chain with P=[[1−α, α],[β, 1−β]]. Compute Pⁿ using eigenvalue decomposition (eigenvalues are 1 and 1−α−β). Find the long-run fraction of time in state 1. What happens as n→∞?
4. A Markov chain on {1,2,3,4} has transition matrix:
   P = [[0, 1, 0, 0],[0.5, 0, 0.5, 0],[0, 0.5, 0, 0.5],[0, 0, 1, 0]].
   (a) Is this chain irreducible? (b) What is the period of each state? (c) Is it ergodic?
5. Prove that if P is the transition matrix of a finite irreducible aperiodic Markov chain, then there exist A>0 and ρ<1 such that |P^{(n)}_{ij}−π_j|≤A·ρⁿ for all states i,j, where π is the stationary distribution. (Outline the argument: use Pⁿ → 1π as a consequence of the Perron-Frobenius theorem.)

**P55 — Reflect & Consolidate:** "P_{ij}=P(next=j | current=i). Rows sum to 1. n-step: (Pⁿ)_{ij}. Chapman-Kolmogorov: P^{m+n}=P^m·P^n. Communication classes, irreducibility, recurrence, period. Ergodic = irreducible + aperiodic + positive recurrent → convergence."

**P76 — Transfer Probe (Independence mode):**
(a) Google's PageRank: the web is modelled as a Markov chain where each page is a state and P_{ij}=1/d(i) if page i links to page j (d(i) = out-degree of i). The stationary distribution π gives the "importance" of each page. The dangling node problem (pages with no outlinks) is fixed by adding a teleportation probability — what is the resulting modified transition matrix? (b) Hidden Markov Models (HMMs): in an HMM, the hidden state X_n is a Markov chain, but only an observation Y_n (which depends on X_n) is visible. The forward-backward algorithm computes P(X_n|Y_1,…,Y_T) — an application of Bayes' theorem to Markov chains. What role does the transition matrix play in the forward recursion? (c) The mixing time of a Markov chain is T_mix = min{t: max_{x}‖P^t(x,·)−π‖_TV ≤ 1/4}. How does the spectral gap (1 minus the second-largest eigenvalue of P) determine the mixing time?

**P75 — Mastery Assessment:**
"A server processes jobs one at a time. Each job takes 1 time unit and is either 'easy' (E) or 'hard' (H) with equal probability, independently of other jobs. After processing: if E, next job is E with prob 0.8, H with prob 0.2; if H, next job is E with prob 0.4, H with prob 0.6. (a) Write the 2×2 transition matrix P. (b) Compute P² and P³. (c) What is the long-run probability of processing an easy job? (Hint: find the stationary distribution.) (d) If the server currently processed a hard job, what is the probability it processes 2 consecutive easy jobs next? (e) Classify the chain: irreducible? aperiodic? ergodic?"

**P74 — Routing Decision:**
- Score ≥ 5/5 → MASTERED
- Score 4/5 → REVIEW state classification (recurrent/transient/periodic)
- Score ≤ 3/5 → PREREQUISITE GAP in math.prob.markov-chains; reassign

**P78 — Completion:** Transition Matrix certified. Student constructs and interprets transition matrices; computes n-step probabilities via matrix powers; applies Chapman-Kolmogorov; classifies states and chains; connects to PageRank and HMMs.

## Component 8 — P76 Transfer Probe Detail
**Mode: Independence** (cross_links = [])
Target: PageRank; Hidden Markov Models; mixing time and spectral gap
Skill tested: Apply transition matrix theory to algorithmic and statistical applications

## Component 10 — Version History
| Version | Date | Note |
|---|---|---|
| 1.0 | 2026-07-30 | Initial authoring |
