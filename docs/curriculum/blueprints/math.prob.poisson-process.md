# Blueprint: math.prob.poisson-process

## Component 0 — Concept Identity
| Field | Value |
|---|---|
| KG ID | math.prob.poisson-process |
| name | Poisson Process |
| Domain | math.prob |
| Difficulty | expert |
| Bloom level | apply |
| Estimated hours | 7 |
| Mastery threshold | 0.80 |
| MAMR | 4/5 |
| Prerequisites | math.prob.discrete-distributions |
| Cross-links | — |
| Unlocks | — |

## Component 1 — Learning Objective
The student defines the Poisson process via three axioms (stationarity, independence of increments, and rare-events/Orderliness); derives that N(t)~Poisson(λt) and that interarrival times are i.i.d. Exponential(λ); applies the memoryless property of interarrival times; computes probabilities using the Poisson(λt) distribution; states and applies superposition (sum of independent Poisson processes is Poisson) and thinning (each event independently retained with prob p gives a Poisson(λp) process); and identifies the PASTA property (Poisson Arrivals See Time Averages).

## Component 2 — CPA Entry Stage
**P — Pictorial** (draw a timeline from 0 to T with marks at random event times T₁,T₂,T₃,…; label: interarrival times S₁=T₁, S₂=T₂−T₁, S₃=T₃−T₂ on the timeline; label N(t)=number of events by time t as a step function above the timeline; annotate that each Sᵢ~Exp(λ) and each N(t)~Poisson(λt); show that "the number of events in any interval of length h is approximately Poisson(λh)")

## Component 3 — Misconception Register

| ID | Label | Pattern | Birth type |
|---|---|---|---|
| MC-1 | POISSON-PROCESS-REQUIRES-EQUALLY-SPACED-ARRIVALS | Student imagines a Poisson process as events arriving at regular intervals of length 1/λ; doesn't know the interarrival times are random (Exponentially distributed), so actual arrivals are clustered and spread out variably | Type 3 — language contamination ("rate λ" suggests regularity; the word "rate" in everyday language describes regular repetition (heartbeats, clock ticks), whereas in the Poisson process it describes the AVERAGE rate of a random process) |
| MC-2 | SUPERPOSITION-REQUIRES-SAME-RATE | Student incorrectly states that superposition only works when the component processes have the same rate λ; doesn't apply the general result that the sum of independent Poisson(λ₁) and Poisson(λ₂) processes is Poisson(λ₁+λ₂) regardless of whether λ₁=λ₂ | Type 5 — instruction-induced (superposition is often demonstrated with equal rates for simplicity; students assume the equal-rates condition is necessary rather than a pedagogical convenience) |
| MC-3 | THINNING-CHANGES-THE-INTERARRIVAL-DISTRIBUTION | Student accepts that thinning gives a Poisson(λp) process but thinks the interarrival times of the thinned process are NOT exponential (or are Exp(λ) instead of Exp(λp)); doesn't apply the fact that a thinned Poisson process is itself a Poisson process with rate λp | Type 1 — overgeneralisation (after thinning, students track the original process's interarrival times and try to thin those, rather than recognising the thinned process inherits the full Poisson structure including Exp(λp) interarrival times) |

## Component 4 — Session TA Cap
**Cap = 9** (hrs = 7 → cap 9)

## Component 5 — Teaching Action Sequence

### A01 — P11 REPRESENTATION SHIFT (open)
**The Poisson process — three equivalent definitions:**

**Definition 1 (Counting process):** {N(t), t≥0} is a Poisson process with rate λ>0 if:
1. N(0)=0
2. **Independent increments:** For 0≤s<t≤u<v: N(t)−N(s) and N(v)−N(u) are independent.
3. **Stationary increments:** N(t+h)−N(t) has the same distribution as N(h) for all t,h≥0.
4. **Orderliness (rare events):** P(N(h)≥2)=o(h) as h↓0 (two simultaneous events have probability negligible relative to h).

**Definition 2 (via distribution):** {N(t)} is Poisson(λt)-distributed: P(N(t)=k)=e^{−λt}(λt)^k/k!.

**Definition 3 (via interarrival times):** Let S₁,S₂,… be the interarrival times. {N(t)} is a Poisson process iff S₁,S₂,… are i.i.d. Exponential(λ).

**Key results:**
- E[N(t)] = λt, Var[N(t)] = λt.
- The n-th arrival time: T_n = S₁+⋯+S_n ~ Gamma(n,λ). E[T_n]=n/λ.
- **Memoryless property:** Given N(t)=0, the next arrival time has the same Exp(λ) distribution regardless of t. "The process doesn't remember how long it's been since the last event."

**Worked example:**
Customers arrive at a rate of 6 per hour (λ=6/hr = 0.1/min).
- P(no arrivals in 5 minutes): N(5min)~Poisson(0.5). P(N=0)=e^{-0.5}≈0.607.
- Expected time to 3rd arrival: E[T₃]=3/λ=3/(0.1 per min)=30 min.
- P(interarrival time > 15 min): P(Exp(0.1)>15)=e^{-0.1×15}=e^{-1.5}≈0.223.

**P49 checkpoint:**
- CORRECT → "Poisson process: N(t)~Poisson(λt). Interarrivals i.i.d. Exp(λ). Memoryless. E[N(t)]=λt." → A02
- PARTIAL (MC-1: regular arrivals) → "The Poisson process has RANDOM interarrival times S_i~Exp(λ). Each S_i has mean 1/λ, so on AVERAGE events arrive every 1/λ time units. But any particular interarrival time is random — it could be very short (events cluster) or very long (a gap). This randomness is a feature, not a flaw: real arrivals (customers, photons, mutations) are not perfectly regular." → TB-R01 → A02
- INCORRECT → TB-R01 → A02
- NO_RESPONSE → "Calls arrive at rate λ=3 per hour. (a) P(more than 5 calls in 2 hours): N(2)~Poisson(6). P(N>5)=1−∑_{k=0}^5 P(N=k)≈1−0.446=0.554. (b) Expected time until 4th call: E[T₄]=4/3 hours≈80 minutes. (c) P(next call within 10 minutes | no calls yet): Exp(3/hr=0.05/min), P(S≤10)=1−e^{-0.5}≈0.393. Memoryless: same as P(S≤10) unconditionally." → TB-R01 → A02

### A02 — P04 PATTERN INDUCTION
**Superposition, thinning, and PASTA:**

**Superposition:** If {N₁(t)} is Poisson(λ₁) and {N₂(t)} is Poisson(λ₂), both independent, then {N₁(t)+N₂(t)} is Poisson(λ₁+λ₂).

**Proof:** N₁(t)~Poisson(λ₁t) and N₂(t)~Poisson(λ₂t) independent → sum~Poisson((λ₁+λ₂)t). ✓

**Application:** Call centre receives calls from two sources at rates 4/hr and 6/hr. Total: Poisson(10/hr).

**Thinning:** Each event of a Poisson(λ) process is independently "kept" with probability p or "discarded" with probability 1−p. The kept events form a Poisson(λp) process; the discarded events form a Poisson(λ(1−p)) process; the two are INDEPENDENT.

**Application:** Bus route with λ=12 buses/hour; each bus has probability 0.7 of going your direction. Your buses: Poisson(8.4/hr). The independence of the two sub-processes is a key, non-obvious result.

**PASTA property (Poisson Arrivals See Time Averages):**
If a system (e.g., a queue) is in state A with probability P_A at a random time, then a Poisson-process arrival sees state A with the SAME probability P_A. Formally: the fraction of Poisson arrivals who find the system in state A equals the long-run time-fraction the system spends in state A.

This is due to the Poisson process's independence of increments — arrivals don't "anticipate" the system's state.

**P49 checkpoint:**
- CORRECT → "Superposition: Poisson(λ₁)+Poisson(λ₂)=Poisson(λ₁+λ₂). Thinning: Poisson(λ) → Poisson(λp) + Poisson(λ(1−p)), independent. PASTA: Poisson arrivals see time averages." → Gate (P91)
- PARTIAL (MC-2: superposition requires same rate) → "Superposition works for ANY independent Poisson processes, regardless of rate. N₁(t)~Poisson(λ₁t), N₂(t)~Poisson(λ₂t), independent → N₁(t)+N₂(t)~Poisson((λ₁+λ₂)t). The key is that the Poisson distribution is closed under addition of independent processes. λ₁=λ₂ is a special case, not a requirement." → TB-R02 → Gate
- INCORRECT → TB-R02 → Gate
- NO_RESPONSE → "Internet traffic: packets arrive at rate λ=100/sec. Each is independently a video packet (p=0.3) or a data packet (p=0.7). How are video and data packets distributed? [Thinning: video Poisson(30/sec), data Poisson(70/sec), independent.] What is the probability of getting 5 or more video packets in 0.1 seconds? [Poisson(3). P(N≥5)=1−P(N≤4)≈1−0.815=0.185.]" → TB-R02 → Gate

## Component 6 — Protocol B Repair Chains

**TB-R01 (MC-1 POISSON-PROCESS-REQUIRES-EQUALLY-SPACED-ARRIVALS):**
Step 1 — "Exp(λ) has mean 1/λ but standard deviation also 1/λ (same as mean). A coefficient of variation of 1 means high variability — the interarrival time can be much shorter or much longer than 1/λ."
Step 2 — "Simulate mentally: with λ=1, draw 10 interarrival times from Exp(1). You'll see some close together (clustering) and some far apart (gaps). The AVERAGE is 1 per unit time, but the actual times are scattered."
Step 3 — "Contrast: a deterministic process with constant interarrival 1/λ also has rate λ, but is NOT a Poisson process (it fails the Orderliness axiom for simultaneous events — wait, it actually never has simultaneous events — it fails the independence axiom). The Poisson process is the maximally 'random' process with a given rate."

**TB-R02 (MC-2 + MC-3 combined):**
Step 1 — "Superposition: P(N₁(t)+N₂(t)=k)=∑_{j=0}^k P(N₁=j)P(N₂=k−j) — the convolution of two Poisson distributions with different parameters is Poisson with parameter the sum. This is the MGF argument: M_{N₁+N₂}(t)=M_{N₁}(t)·M_{N₂}(t)=e^{λ₁(e^t−1)}·e^{λ₂(e^t−1)}=e^{(λ₁+λ₂)(e^t−1)}."
Step 2 — "Thinning: the thinned process IS a Poisson process with rate λp. Its interarrival times are Exp(λp), NOT Exp(λ). Smaller rate → longer interarrival times (sparser events). This follows from the defining axioms: the thinned process is stationary, has independent increments, and is orderly — hence Poisson."
Step 3 — "PASTA: the arrival sees the system as it 'randomly' finds it, without causing or anticipating the system's current state. This relies specifically on the independence of increments property of the Poisson process — non-Poisson arrivals may see a biased view of the system."

## Component 7 — P91 Mastery Gate Sequence

**P77 — Problem Set (5 items):**
1. Earthquakes in a region occur according to a Poisson process with rate λ=3 per year. (a) P(at least 1 earthquake in the next 6 months). (b) E[time until the 5th earthquake]. (c) P(3 earthquakes in the first year AND 2 earthquakes in the second year). [Use independence of increments.]
2. Two independent Poisson processes: jobs arrive to processor A at rate 5/min and to processor B at rate 8/min. (a) What is the total arrival rate? (b) P(more than 15 arrivals in 1 minute across both processors). (c) A job is equally likely to be type 1 or type 2. Arrivals occur at rate 10/min. What is the rate of type-1 arrivals? (Apply thinning.)
3. A shop receives customers at rate λ=20/hour. Each customer independently makes a purchase with probability 0.6. (a) What is the rate of purchasing customers? (b) Are purchases and non-purchases independent Poisson processes? (c) In a 3-hour period, what is the probability of exactly 30 purchases?
4. PASTA application: a queue has servers always busy when there are 5 or more customers in the system; P(≥5 customers in system)=0.2 based on its long-run distribution. A Poisson stream of customers arrives. What fraction of customers find all servers busy upon arrival?
5. Non-homogeneous Poisson process: the rate is λ(t) (not constant). The expected number of events in [0,t] is Λ(t)=∫₀^t λ(s)ds, and N(t)~Poisson(Λ(t)). If λ(t)=2t (increasing rate), what is E[N(3)]? P(N(3)=10)?

**P55 — Reflect & Consolidate:** "Poisson process: N(t)~Poisson(λt); interarrivals i.i.d. Exp(λ); independent increments; orderliness. Superposition: Poisson(λ₁)+Poisson(λ₂)=Poisson(λ₁+λ₂). Thinning: rate λp (independent of unthinned part). PASTA: arrivals see time averages."

**P76 — Transfer Probe (Independence mode):**
(a) Renewal process: a generalisation where interarrival times S_i are i.i.d. with mean μ (not necessarily exponential). By the renewal theorem, the long-run arrival rate is 1/μ, and the number of arrivals in [0,t] satisfies N(t)/t → 1/μ a.s. The Poisson process is the special case S_i~Exp(λ). What additional properties does the Poisson process have that a general renewal process lacks? (b) Compound Poisson process: S(t)=∑_{k=1}^{N(t)} X_k where N(t) is Poisson(λt) and X_k are i.i.d. with mean μ and variance σ². Compute E[S(t)] and Var[S(t)]. Applications: insurance claims, stock price jumps. (c) M/M/1 queue: customers arrive as a Poisson(λ) process; each is served in Exp(μ) time; one server. By PASTA, the steady-state queue length distribution (from the customer's perspective) equals the time-average distribution. The stationary distribution is π_k=(1−ρ)ρ^k where ρ=λ/μ<1. Derive E[number in system] and explain the instability when ρ≥1.

**P75 — Mastery Assessment:**
"An emergency room receives patients according to a Poisson process. During weekday daytime hours (8am–8pm), the rate is 10 patients/hour. During night hours (8pm–8am), the rate is 4 patients/hour. (a) Is this a standard Poisson process? If not, what kind? (b) What is the expected number of patients in a full 24-hour weekday? (c) Each patient is independently classified as 'critical' (p=0.15) or 'non-critical'. What is the arrival rate of critical patients during daytime? At night? Are the two streams independent? (d) P(exactly 3 critical patients in a 1-hour daytime period). (e) The ER has 2 trauma bays. By PASTA, the fraction of patients who find both bays occupied equals the long-run time-fraction that both bays are occupied. If this fraction is 0.05, what does this tell a patient about the waiting experience?"

**P74 — Routing Decision:**
- Score ≥ 5/5 → MASTERED
- Score 4/5 → REVIEW superposition and thinning properties
- Score ≤ 3/5 → PREREQUISITE GAP in math.prob.exponential-distribution; reassign

**P78 — Completion:** Poisson Process certified. Student defines the process via axioms; computes probabilities using Poisson(λt); applies superposition and thinning; uses PASTA; connects to queuing theory and renewal processes.

## Component 8 — P76 Transfer Probe Detail
**Mode: Independence** (cross_links = [])
Target: Renewal process; compound Poisson; M/M/1 queue via PASTA
Skill tested: Extend the Poisson process to general renewal theory and queuing applications

## Component 10 — Version History
| Version | Date | Note |
|---|---|---|
| 1.0 | 2026-07-30 | Initial authoring |
