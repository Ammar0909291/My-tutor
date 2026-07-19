# Teaching Blueprint: Markov Chain (`math.prob.markov-chain`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.prob.markov-chain` |
| name | Markov Chain |
| domain | Probability |
| difficulty | expert |
| bloom | apply |
| mastery_threshold | 0.8 → MAMR = ⌈0.8×5⌉ = 4/5 |
| estimated_hours | 8 |
| requires | `math.prob.conditional-probability`, `math.linalg.matrix-multiplication` |
| unlocks | none |
| cross_links | none |
| CPA_entry_stage | C (Concrete) — a familiar day-to-day weather sequence, before the formal Markov property statement |
| description (KG) | A sequence of RVs {Xₙ} where P(Xₙ₊₁=j\|X₀,…,Xₙ) = P(Xₙ₊₁=j\|Xₙ) (Markov property). Future depends only on present state, not history. Characterized by state space and transition matrix. |

## Component 1 — Learning Objectives

- LO1: State the **Markov property** precisely — $P(X_{n+1}=j\mid X_0,\dots,X_n)=P(X_{n+1}=j\mid X_n)$ — using `math.prob.conditional-probability`'s own conditional notation directly, and correctly distinguish a genuine Markov chain (future depends ONLY on the current state) from a superficially similar sequence whose next value depends on MORE than just the current state.
- LO2: Construct the **transition matrix** $P$ for a Markov chain ($P_{ij}=$ probability of moving from state $i$ to state $j$), and apply `math.linalg.matrix-multiplication` to compute MULTI-STEP transition probabilities — the probability of moving from state $i$ to state $j$ in exactly $n$ steps is the $(i,j)$ entry of $P^n$ — correctly rejecting the naive idea of simply scaling the one-step probability by $n$.
- LO3 (orientation level — full treatment deferred to this concept's own KG-listed children): recognize that a Markov chain's LONG-RUN behavior — whether the state probabilities settle into a fixed **stationary distribution**, and whether that limit is the same regardless of starting state (**ergodicity**) — is a rich further question, deferred to `math.prob.transition-matrix`, `math.prob.stationary-distribution`, and `math.prob.ergodicity`.

## Component 2 — Prerequisite Check

Assumes mastery of `math.prob.conditional-probability` (the conditional probability notation $P(A\mid B)$ and its interpretation) and `math.linalg.matrix-multiplication` (computing matrix products, including recognizing when $BA\ne AB$ and when a product is undefined).

## Component 3 — Core Explanation

**The Markov property — future depends only on the present**: a sequence of random variables $\{X_n\}$ is a Markov chain if $P(X_{n+1}=j\mid X_0,\dots,X_n)=P(X_{n+1}=j\mid X_n)$ — knowing the ENTIRE history $X_0,\dots,X_n$ gives no more predictive power about $X_{n+1}$ than knowing $X_n$ alone. This is a strong, checkable structural claim, not merely "the recent past matters most" — it says the recent past (specifically, the SINGLE current state) is ALL that matters, with everything earlier providing zero additional information once the current state is known.

**The transition matrix and multi-step probabilities via matrix powers**: the transition matrix $P$ has entries $P_{ij}=P(X_{n+1}=j\mid X_n=i)$ — each ROW sums to $1$ (from state $i$, the chain must go SOMEWHERE). The probability of moving from state $i$ to state $j$ in exactly ONE step is $P_{ij}$ directly. For exactly $n$ STEPS, the correct quantity is the $(i,j)$ entry of $P^n$ (the matrix raised to the $n$-th power via repeated `math.linalg.matrix-multiplication`) — NOT $n\times P_{ij}$. This is because each intermediate step genuinely branches across every possible intermediate state, and matrix multiplication is exactly the operation that correctly sums over all those intermediate possibilities.

**Long-run behavior (orientation level)**: iterating a Markov chain's transition matrix many times often reveals the state probabilities settling toward a fixed **stationary distribution** $\pi$ (satisfying $\pi P=\pi$), and for suitably well-behaved (**ergodic**) chains, this limiting distribution is reached regardless of the STARTING state — the influence of where you began eventually washes out. The precise conditions for this, and how to compute $\pi$ directly (rather than by iterating), are the dedicated subject of `math.prob.stationary-distribution` and `math.prob.ergodicity`.

## Component 4 — Worked Examples

**Example 1 (LO1 — Markov property verified and violated, breaking MC-1)**: a simplified weather model, Sunny(S)/Rainy(R), where tomorrow's weather depends only on TODAY's weather, not on yesterday's or any earlier day: $P(\text{tomorrow}=R\mid\text{today}=S,\text{yesterday}=R,\dots)=P(\text{tomorrow}=R\mid\text{today}=S)$ — if verified, this genuinely satisfies the Markov property. Contrast: a sequence tracking a student's exam score, where the NEXT score depends on the AVERAGE of the last THREE scores (not just the most recent one) — under the state definition "single most recent score," this is NOT Markov, since knowing only the most recent score discards information (the other two recent scores) that genuinely affects the prediction. (It CAN be made Markov by redefining the state as "the last three scores taken together as one combined state" — a standard resolution technique, though not pursued further here.)

**Example 2 (LO2 — transition matrix and genuine matrix-power computation, breaking MC-2)**: a 2-state weather chain, $P(S\to S)=0.8$, $P(S\to R)=0.2$, $P(R\to S)=0.4$, $P(R\to R)=0.6$, so $P=\begin{pmatrix}0.8&0.2\\0.4&0.6\end{pmatrix}$. One-step: $P(\text{tomorrow}=R\mid\text{today}=S)=0.2$ directly. TWO-step: $P(\text{2 days ahead}=R\mid\text{today}=S)$ is the $(S,R)$ entry of $P^2$, computed via genuine matrix multiplication: row $S$ of $P^2 = [0.8,0.2]\cdot P = 0.8\cdot[0.8,0.2]+0.2\cdot[0.4,0.6]=[0.64+0.08,\ 0.16+0.12]=[0.72,0.28]$. So the 2-step probability is $0.28$ — NOT $2\times0.2=0.4$, confirming the naive linear-scaling shortcut fails and genuine matrix exponentiation is required.

**Example 3 (LO3, orientation level — long-run behavior preview)**: iterating the SAME 2-state chain from Example 2 many steps, the distribution empirically approaches a fixed limit regardless of whether the chain starts Sunny or Rainy: solving $\pi P=\pi$ with $\pi_S+\pi_R=1$ gives $\pi_S=0.8\pi_S+0.4\pi_R$, i.e. $0.2\pi_S=0.4\pi_R$, so $\pi_S=2\pi_R$, giving $\pi_R=1/3$, $\pi_S=2/3$ — the SAME stationary distribution $(\tfrac23,\tfrac13)$ is approached whether the chain starts at $S$ or at $R$. This previews exactly the question `math.prob.stationary-distribution` and `math.prob.ergodicity` fully answer: why and when the starting state's influence washes out over time.

## Component 5 — Teaching Actions

### Teaching Action A01 — The Markov Property Is a Strong Claim About Sufficiency, Not Recency (Primitive P11: Representation Shift)

State: "the Markov property doesn't just say the recent past matters most — it says the CURRENT state is ALL that matters, with the rest of history adding zero extra predictive power once you know it." Work Example 1's genuine-Markov weather case and its non-Markov exam-score-average contrast.

- **MC-1 hook**: ask "if a sequence's next value depends mostly on the last few values, with the current one weighing most heavily, is that sequence Markov?" — a "yes" answer reveals MC-1 (missing that Markov requires the CURRENT state alone to be sufficient, not merely the most heavily-weighted recent factor).

### Teaching Action A02 — Multi-Step Probabilities Require Matrix Powers, Not Linear Scaling (Primitive P28: Conflict Evidence)

Present Example 2's direct evidence: the two-step Rainy probability from Sunny comes out to $0.28$ via genuine matrix multiplication, NOT $2\times0.2=0.4$ as naive scaling would suggest. State: "each intermediate step genuinely branches across every possible intermediate state — matrix multiplication is exactly the operation built to sum over all of those branches correctly."

- **MC-2 hook**: ask "to find the probability of moving from state $i$ to state $j$ in exactly $2$ steps, can you just double the one-step probability $P_{ij}$?" — a "yes" answer reveals MC-2 (the naive linear-scaling error, missing that genuine matrix exponentiation is required).

### Teaching Action A03 — The Starting State's Influence Can Wash Out Over Time (Primitive P06: Contrast Pair)

Contrast the intuitive expectation that "where you start should matter forever" against Example 3's evidence that the SAME stationary distribution $(\tfrac23,\tfrac13)$ is approached regardless of starting state. State: "for a well-behaved chain, the starting state's influence genuinely fades — the long-run behavior converges to one fixed distribution no matter where you began, a fact `math.prob.ergodicity` will make precise."

- **MC-3 hook**: ask "must a Markov chain's long-run behavior always depend on which state it started in?" — a "yes" answer reveals MC-3 (missing that, for suitably well-behaved chains, the starting state's influence washes out, converging to the same stationary distribution).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. A sequence tracks a robot's position, where the next move depends only on the CURRENT square, not on how the robot got there. Explain why this satisfies the Markov property, using the formal conditional-probability statement.
  2. For a 2-state chain with transition matrix $P=\begin{pmatrix}0.5&0.5\\0.3&0.7\end{pmatrix}$, compute the one-step and two-step transition probabilities from state $1$ to state $2$.
  3. Explain why a sequence where the next value depends on the average of the last $5$ values is generally NOT Markov under the "single most recent value" state definition, and describe how the state could be redefined to restore the Markov property.
  4. Explain, referencing this lesson's preview, what question a Markov chain's "long-run behavior" is asking, and why the starting state's influence might be expected to matter less and less over time.
- **P76 (Transfer Probe, mode = independence)**: "A company tracks customer subscription status month-to-month — Active, Paused, or Cancelled — where next month's status depends only on this month's status, not on earlier history. (a) Explain why this satisfies the Markov property, citing the formal definition. (b) Given a transition matrix $P$ where $P(\text{Active}\to\text{Active})=0.9$, explain HOW you would compute the probability that a customer active this month is still active $3$ months from now, referencing matrix multiplication. (c) Explain why simply computing $0.9\times3=2.7$ (or any other naive linear scaling of the one-step probability) would be an invalid way to answer part (b)."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 4/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | RECENCY-MISTAKEN-FOR-MARKOV | Believing a sequence is Markov as long as the recent past weighs most heavily on the next value, missing that Markov requires the CURRENT state ALONE to be fully sufficient, with no additional predictive power from earlier history | Foundational |
| MC-2 | MULTI-STEP-PROBABILITY-LINEARLY-SCALED | Believing the $n$-step transition probability is simply $n$ times the one-step probability, missing that genuine matrix exponentiation $P^n$ is required | High |
| MC-3 | LONG-RUN-BEHAVIOR-ASSUMED-START-DEPENDENT | Believing a Markov chain's long-run behavior must always depend on its starting state, missing that for well-behaved (ergodic) chains the starting state's influence washes out over time | Moderate |

- **B01 (targets MC-1)**: P27 (name it: "Recency Mistaken for Full Markov Sufficiency") → P41 (detect: ask whether a sequence weighted heavily toward its most recent value, but still depending on earlier values too, counts as Markov) → P64 (conceptual shift: re-walk Example 1's exam-score-average non-example, re-anchoring on "the current state must be FULLY sufficient — any genuine dependence on more history disqualifies it").
- **B02 (targets MC-2)**: P27 (name it: "Multi-Step Probability Assumed Linear") → P41 (detect: ask whether the 2-step transition probability can be found by doubling the 1-step probability) → P64 (conceptual shift: re-walk Example 2's matrix-power computation, re-anchoring on "matrix multiplication correctly sums over every intermediate-state branch — linear scaling does not").
- **B03 (targets MC-3)**: P27 (name it: "Long-Run Behavior Assumed Start-Dependent Forever") → P41 (detect: ask whether a chain's long-run distribution must depend on its starting state) → P64 (conceptual shift: re-walk Example 3's stationary-distribution computation, re-anchoring on "for well-behaved chains, the same limiting distribution is reached regardless of starting state").

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.prob.conditional-probability` (the conditional notation this concept's Markov property statement directly reuses) and `math.linalg.matrix-multiplication` (the matrix-power computation underlying multi-step transition probabilities).
- **Unlocks**: none listed in the KG for this concept, though its own KG-listed children (`math.prob.transition-matrix`, `math.prob.stationary-distribution`, `math.prob.ergodicity`) own the deeper long-run-behavior theory previewed at orientation level in LO3.
- **Cross-link**: KG lists no cross_links for this concept (checked via `ls docs/curriculum/blueprints/` before setting P76_mode — none to check). $P76_{mode}=$ **independence**.

## Component 8 — Teaching Notes

- estimated_hours = 8 with an expert/apply tag supports the full "3 TAs + gate" tier, with LO1 and LO2 at full computational depth (the Markov property's precise statement and a genuine multi-step matrix-power computation) and LO3 kept orientation-level, appropriately deferring to this concept's own three KG-listed children rather than re-deriving stationary distributions or ergodicity here.
- **Division of labor**: `math.prob.conditional-probability` owns the general conditional-probability notation; `math.linalg.matrix-multiplication` owns the general matrix-product mechanics (including when $BA\ne AB$ or is undefined). This concept owns the SPECIALIZATION of both into the Markov-chain setting — the property statement and the transition-matrix/matrix-power connection — deliberately deferring long-run theory to its own named children rather than attempting a preview derivation.
- Example 2 and Example 3 deliberately reuse the SAME 2-state weather chain throughout, so the multi-step computation (LO2) and the long-run preview (LO3) read as one continuous investigation of a single concrete chain rather than two unrelated examples.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS |
| V-4 | unlocks concepts named accurately from KG | PASS (none listed) |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (no cross_links listed → independence) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.8×5⌉=4) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Concrete: a familiar weather sequence before the formal Markov property) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
