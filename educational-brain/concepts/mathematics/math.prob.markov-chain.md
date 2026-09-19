# math.prob.markov-chain

## Identity
- **KG id**: `math.prob.markov-chain`
- **Domain**: math.prob
- **Requires**: `math.prob.conditional-probability`, `math.linalg.matrix-multiplication`
- **Unlocks**: none
- **Cross-links**: none
- **Difficulty**: expert
- **Bloom level**: apply
- **Mastery threshold**: 0.8
- **Estimated hours**: 8

## Learning Objective
State the Markov property precisely ($P(X_{n+1}=j\mid X_0,\ldots,X_n)=P(X_{n+1}=j\mid X_n)$),
distinguishing a genuine Markov chain from a sequence whose next value depends on MORE than just
the current state; construct the transition matrix $P$ and apply matrix multiplication to compute
MULTI-STEP probabilities via $P^n$, rejecting naive linear scaling; and recognize (at orientation
level) that long-run behavior — stationary distributions and ergodicity — is a deferred, richer
question.

## Core Understanding
THE MARKOV PROPERTY IS A CLAIM ABOUT SUFFICIENCY, NEVER MERE RECENCY: a weather model where
tomorrow depends only on TODAY (not yesterday or earlier) genuinely satisfies the Markov property.
Contrast a sequence where the NEXT exam score depends on the AVERAGE of the last THREE scores —
under the state "single most recent score," this is NOT Markov, since the other two recent scores
carry genuine additional predictive information the current state alone discards. The property
demands the CURRENT state be FULLY sufficient, never merely "weighted most heavily."

MULTI-STEP PROBABILITIES REQUIRE GENUINE MATRIX POWERS, NEVER LINEAR SCALING: for a 2-state
weather chain $P=\begin{pmatrix}0.8&0.2\\0.4&0.6\end{pmatrix}$: the one-step $P(S\to R)=0.2$
directly. The TWO-step probability is the $(S,R)$ entry of $P^2$: row $S$ of
$P^2=[0.8,0.2]\cdot P=0.8[0.8,0.2]+0.2[0.4,0.6]=[0.72,0.28]$ — giving $0.28$, NOT $2\times0.2=0.4$
as naive scaling would suggest. Each intermediate step genuinely branches across every possible
state, and matrix multiplication is exactly the operation that correctly sums over those
branches.

THE STARTING STATE'S INFLUENCE CAN WASH OUT OVER TIME (ORIENTATION LEVEL): iterating the same
2-state chain, the distribution empirically approaches a fixed limit regardless of starting state.
Solving $\pi P=\pi$ with $\pi_S+\pi_R=1$: $\pi_S=0.8\pi_S+0.4\pi_R\Rightarrow0.2\pi_S=0.4\pi_R
\Rightarrow\pi_S=2\pi_R$, giving $\pi=(2/3,1/3)$ — the SAME stationary distribution reached
whether starting Sunny or Rainy. Full treatment of when and why this holds is deferred to
`math.prob.stationary-distribution` and `math.prob.ergodicity`.

## Mental Models
- **"Markov means the present is a complete summary — the past adds zero extra predictive power
  once the current state is known, not merely 'the past matters less.'"**
- **"Multi-step transitions branch at every intermediate step — matrix multiplication is the
  machinery built exactly to sum over all those branches; simple scaling ignores them entirely."**

## Why Students Fail

### MC-1: RECENCY-MISTAKEN-FOR-MARKOV
- **Surface form**: believes a sequence is Markov as long as the recent past weighs most heavily
  on the next value.
- **Birth type**: Foundational severity (Blueprint's own declared severity — "recent matters
  most" and "only the current state matters" feel like the same idea until tested against a
  genuine multi-lag dependency).
- **Repair**: re-walk the exam-score-average non-example, re-anchoring on full sufficiency of the
  current state.

### MC-2: MULTI-STEP-PROBABILITY-LINEARLY-SCALED
- **Surface form**: believes the $n$-step transition probability is simply $n$ times the one-step
  probability.
- **Birth type**: High severity (Blueprint's own declared severity — linear scaling is the
  natural first guess for "doing something $n$ times").
- **Repair**: re-walk the matrix-power computation, contrasting the correct $0.28$ against the
  naive $0.4$.

### MC-3: LONG-RUN-BEHAVIOR-ASSUMED-START-DEPENDENT
- **Surface form**: believes a Markov chain's long-run behavior must always depend on its
  starting state.
- **Birth type**: Moderate severity (Blueprint's own declared severity — "where you start should
  matter forever" is an intuitive but ultimately incorrect default expectation).
- **Repair**: re-walk the stationary-distribution computation showing the same limit from either
  starting state.

## Misconceptions

### MC-1: RECENCY-MISTAKEN-FOR-MARKOV
- **Surface form**: as described above.
- **Root cause**: as described above.
- **Repair**: as described above.

### MC-2: MULTI-STEP-PROBABILITY-LINEARLY-SCALED
- **Surface form**: as described above.
- **Root cause**: as described above.
- **Repair**: as described above.

### MC-3: LONG-RUN-BEHAVIOR-ASSUMED-START-DEPENDENT
- **Surface form**: as described above.
- **Root cause**: as described above.
- **Repair**: as described above.

## Analogies
- **"A Markov chain's current state is like a complete medical chart summary — once you have it,
  reading the patient's entire history adds nothing more to your prediction."**
- **Anti-analogy**: computing $n$ steps ahead is NOT like scaling a single rate by $n$ — it's like
  tracing every possible branching path and summing them, which is exactly what matrix
  multiplication does.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: the weather model (genuinely Markov) versus the
  exam-score-average sequence (not Markov under a single-score state).
- **Demonstration 2 (targets MC-2)**: the 2-state weather chain's two-step probability computed
  correctly as $0.28$ via $P^2$, versus the wrong $0.4$ from linear scaling.
- **Demonstration 3 (targets MC-3)**: the same chain's stationary distribution $(2/3,1/3)$,
  reached from either starting state.

## Discovery Questions
1. "If a sequence's next value depends mostly on the last few values, with the current one
   weighing most heavily, is that sequence Markov?"
2. "To find the probability of moving from state i to state j in exactly 2 steps, can you just
   double the one-step probability?"
3. "Must a Markov chain's long-run behavior always depend on which state it started in?"

## Teaching Sequence
1. **Representation shift**: the Markov property's sufficiency claim, working the weather-versus-
   exam-score contrast, isolating MC-1.
2. **Conflict evidence**: the matrix-power multi-step computation, isolating MC-2.
3. **Contrast pair**: the stationary-distribution starting-state-independence result, isolating
   MC-3.
4. **Mastery gate**: require a correct Markov-property justification for a new sequence, a correct
   one-step and two-step transition computation via matrix multiplication, and a correct
   explanation of long-run behavior's starting-state independence, at the Blueprint's own stated
   MAMR of 4/5 (⌈0.8×5⌉).

## Tutor Actions
- Never accept a sequence declared Markov solely because recent values weigh most heavily.
- Never accept an $n$-step transition probability computed via linear scaling of the one-step
  probability.
- Never accept a claim that long-run behavior must always depend on the starting state.

## Voice Teaching Notes
- Say "does the current state alone fully determine the next-step probabilities, or does earlier
  history still matter?" whenever the Markov property is checked.
- When a multi-step probability is computed, ask "did you use matrix multiplication, or just
  scale the one-step value?"

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly determines whether a new sequence satisfies the
  Markov property.
- **Rung 2 (application)**: learner correctly computes a two-step transition probability via
  matrix multiplication.
- **Rung 3 (transfer)**: learner correctly explains, for a customer-subscription-status model, why
  a 3-month-ahead probability requires matrix exponentiation and why naive linear scaling is
  invalid.

## Tutor Recovery Strategy
- If MC-1 recurs, re-walk the exam-score-average non-example.
- If MC-2 recurs, re-walk the matrix-power computation.
- If MC-3 recurs, re-walk the stationary-distribution computation from both starting states.

## Memory Hooks
- "Markov means the current state is fully sufficient — not just heavily weighted."
- "Multi-step transitions need matrix powers — never simple scaling by n."
- "For well-behaved chains, the starting state's influence washes out over time."

## Transfer Connections
- `math.prob.conditional-probability` (already authored, certified domain): supplies the
  conditional notation this concept's Markov property statement directly reuses.
- `math.linalg.matrix-multiplication` (already authored, certified domain): supplies the
  matrix-power computation underlying multi-step transition probabilities.
- `math.prob.transition-matrix`, `math.prob.stationary-distribution`, `math.prob.ergodicity` (not
  yet authored): this concept's own KG-listed children, owning the deeper long-run-behavior theory
  previewed at orientation level.

## Cross-Subject Connections
- None formal.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.prob.markov-chain.md`, reused by reference
  for its weather-model Markov-property verification, its matrix-power multi-step computation,
  its stationary-distribution preview, and its three-misconception registry (severity levels
  adopted directly as declared).
- Transfer probe: the Blueprint's own independence-mode probe, applying the Markov property and
  matrix exponentiation to a customer-subscription-status model.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires
  `math.prob.conditional-probability`/`math.linalg.matrix-multiplication`, unlocks none,
  cross_links none, expert/apply, mastery_threshold 0.8, estimated_hours 8) was directly verified
  against the live KG and matches exactly.

## Version History
- 2026-09-19 (Batch 141): authored. Second entry this batch. Companion batch concept:
  `math.prob.classical-probability`.
