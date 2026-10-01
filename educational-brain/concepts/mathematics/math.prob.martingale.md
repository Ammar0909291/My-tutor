# math.prob.martingale

## Identity
- **KG id**: `math.prob.martingale`
- **Domain**: math.prob
- **Requires**: `math.prob.conditional-expectation`
- **Unlocks**: none
- **Cross-links**: none
- **Difficulty**: research
- **Bloom level**: analyze
- **Mastery threshold**: 0.65
- **Estimated hours**: 8

## Learning Objective
Verify the martingale condition $E[M_{n+1}\mid M_0,\ldots,M_n]=M_n$ as a DIRECT application of
conditional expectation conditioning on the entire past — NEVER a fundamentally new tool;
distinguish martingale/submartingale/supermartingale by the PRECISE direction of the conditional-
expectation inequality — NEVER a loose qualitative judgment; and recognize the optional stopping
theorem requires genuine, checkable hypotheses — NEVER holds unconditionally for any stopping
strategy.

## Core Understanding
THE MARTINGALE CONDITION IS CONDITIONAL EXPECTATION'S OWN MACHINERY, CONDITIONING ON THE ENTIRE
PAST — NEVER A FUNDAMENTALLY NEW TOOL: for $M_n=\sum_{i=1}^nX_i$ with each $X_i=\pm1$ equally
likely, independent: $E[M_{n+1}\mid M_0,\ldots,M_n]=E[M_n+X_{n+1}\mid M_0,\ldots,M_n]
=M_n+E[X_{n+1}\mid M_0,\ldots,M_n]$. Since $X_{n+1}$ is INDEPENDENT of the past,
$E[X_{n+1}\mid M_0,\ldots,M_n]=E[X_{n+1}]=\frac12(1)+\frac12(-1)=0$, giving
$E[M_{n+1}\mid M_0,\ldots,M_n]=M_n$ — confirming the martingale property using ORDINARY
conditional-expectation machinery, conditioning on the WHOLE history $M_0,\ldots,M_n$ rather than
one variable. Believing this verification requires a fundamentally new probabilistic tool is
WRONG — it is exactly `math.prob.conditional-expectation`'s own apparatus, applied to a richer
conditioning set.

SUB-/SUPERMARTINGALE CLASSIFICATION IS PRECISELY DETERMINED BY THE INEQUALITY'S DIRECTION — NEVER
A LOOSE QUALITATIVE JUDGMENT: for a biased walk with $X_i=+1$ w.p. $0.6$, $-1$ w.p. $0.4$:
$E[X_{n+1}]=0.2>0$, so $E[M_{n+1}\mid\text{past}]=M_n+0.2>M_n$ — a SUBMARTINGALE. Taking $-M_n$
instead: $E[-M_{n+1}\mid\text{past}]=-M_n-0.2<-M_n$ — a SUPERMARTINGALE. The SAME underlying
random process, viewed with a sign flip, switches classification entirely. Treating sub-/
supermartingale as a vague, "somewhat favorable/unfavorable" judgment call is WRONG — the
classification is a precise, sign-sensitive computation determined exactly by which direction the
conditional-expectation inequality points.

THE OPTIONAL STOPPING THEOREM REQUIRES GENUINE, SOMETIMES-FAILING HYPOTHESES — NEVER HOLDS
UNCONDITIONALLY FOR ANY STOPPING STRATEGY: for the fair random walk from Example 1, the strategy
"stop as soon as $M_n$ first reaches $+10$" defines a random stopping time $\tau$. Naive intuition
suggests $E[M_\tau]=E[M_0]=0$ should still hold — but this UNBOUNDED stopping time has
$E[\tau]=\infty$, FAILING the theorem's own hypotheses (e.g. bounded stopping time or bounded
increments with $E[\tau]<\infty$); the conclusion $E[M_\tau]=E[M_0]$ does NOT straightforwardly
follow here. Believing the optional stopping theorem guarantees $E[M_\tau]=E[M_0]$ for ANY
stopping strategy with no further conditions is WRONG — "you can't beat a fair game" is a precise
mathematical theorem with real, checkable hypotheses, never a blanket, hypothesis-free maxim.

## Mental Models
- **"The martingale condition is conditional expectation applied to the whole observed history —
  no new machinery, just a richer conditioning set."**
- **"Sub- and supermartingale aren't vague labels — they're precisely determined by which
  direction the conditional-expectation inequality points, and a sign flip flips the label
  entirely."**
- **"'You can't beat a fair game' is a real theorem with real hypotheses — not a folk maxim that
  applies to every conceivable stopping strategy."**

## Why Students Fail

### MC-1: MARTINGALE-CONDITION-ASSUMED-NEW-TOOL
- **Surface form**: believes verifying the martingale condition requires a fundamentally new
  probabilistic tool, missing that it is exactly `math.prob.conditional-expectation`'s own
  machinery, applied to the whole past.
- **Birth type**: instruction-induced (Blueprint's own declared foundational severity — the
  richer notation $E[M_{n+1}\mid M_0,\ldots,M_n]$ looks unfamiliar despite being the same
  underlying operation).
- **Repair**: re-walk Example 1's independence-based conditional-expectation computation,
  re-anchoring on "the same conditional-expectation machinery, applied to the whole past."

### MC-2: SUB-SUPERMARTINGALE-ASSUMED-QUALITATIVE-JUDGMENT
- **Surface form**: believes sub- versus supermartingale classification is a loose qualitative
  judgment, missing that it is precisely determined by the direction of the conditional-
  expectation inequality.
- **Birth type**: overgeneralization (Blueprint's own declared high severity — "favorable" and
  "unfavorable" sound like informal, gradable judgments rather than a strict inequality check).
- **Repair**: re-walk Example 2's sign-flip reclassification, re-anchoring on "precisely
  determined by the direction of the inequality."

### MC-3: OPTIONAL-STOPPING-ASSUMED-UNCONDITIONAL
- **Surface form**: believes the optional stopping theorem guarantees $E[M_\tau]=E[M_0]$ for any
  stopping strategy unconditionally, missing that it requires genuine, sometimes-failing
  hypotheses.
- **Birth type**: overgeneralization (Blueprint's own declared birth type — the informal gambling
  maxim "you can't beat a fair game" is often stated without its technical qualifications).
- **Repair**: re-walk Example 3's failed-hypothesis stopping-time case, re-anchoring on "genuine,
  sometimes-failing hypotheses are required."

## Misconceptions

### MC-1: MARTINGALE-CONDITION-ASSUMED-NEW-TOOL
- **Surface form**: as described above.
- **Root cause (instruction-induced)**: as described above.
- **Repair**: as described above.

### MC-2: SUB-SUPERMARTINGALE-ASSUMED-QUALITATIVE-JUDGMENT
- **Surface form**: as described above.
- **Root cause (overgeneralization)**: as described above.
- **Repair**: as described above.

### MC-3: OPTIONAL-STOPPING-ASSUMED-UNCONDITIONAL
- **Surface form**: as described above.
- **Root cause (overgeneralization)**: as described above.
- **Repair**: as described above.

## Analogies
- **"A martingale is a fair coin-flip game viewed through conditional expectation's own lens — the
  best guess for tomorrow, given everything known today, is exactly today's value."**
- **Anti-analogy**: "you can't beat a fair game" isn't gambling folklore you can invoke anywhere —
  it's a theorem with load-bearing hypotheses, and an unbounded stopping time can genuinely break
  it.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: the symmetric random walk's independence-based martingale
  verification.
- **Demonstration 2 (targets MC-2)**: the biased-walk-versus-its-negation submartingale/
  supermartingale sign-flip reclassification.
- **Demonstration 3 (targets MC-3)**: the "stop at +10" unbounded-stopping-time optional-stopping
  hypothesis failure.

## Discovery Questions
1. "Does verifying the martingale condition require a fundamentally new probabilistic tool, beyond
   conditional expectation's own machinery?"
2. "Is classifying a sequence as a submartingale versus supermartingale a loose, qualitative
   judgment, or a precise inequality check?"
3. "Does the optional stopping theorem guarantee $E[M_\tau]=E[M_0]$ for any stopping strategy, with
   no further conditions needed?"

## Teaching Sequence
1. **Representation shift**: work Example 1's independence-based martingale verification,
   isolating MC-1.
2. **Conflict evidence**: work Example 2's sign-flip sub-/supermartingale reclassification,
   isolating MC-2.
3. **Contrast pair**: work Example 3's failed-hypothesis optional-stopping case, isolating MC-3.
4. **Mastery gate**: require a correct martingale-condition verification citing conditional
   expectation's independence-based simplification, a correct sub-/supermartingale classification
   (including its sign-flip counterpart), and a correct explanation of why the optional stopping
   theorem's hypotheses genuinely matter, at the Blueprint's own stated MAMR of 3/5.

## Tutor Actions
- Never accept the martingale condition treated as requiring a new probabilistic tool.
- Never accept sub-/supermartingale classification stated as a qualitative judgment rather than an
  inequality check.
- Never accept the optional stopping theorem applied without checking its hypotheses.

## Voice Teaching Notes
- Say "is that just conditional expectation on a bigger conditioning set?" whenever the martingale
  condition is verified.
- Ask "which direction does the inequality actually point?" whenever a sequence is classified as
  sub- or supermartingale.

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly verifies the martingale condition for an i.i.d.-sum
  sequence, citing independence.
- **Rung 2 (application)**: learner correctly classifies a sequence and its negation as
  submartingale/supermartingale.
- **Rung 3 (transfer)**: learner correctly diagnoses why an unbounded "sell at +5%" trading
  strategy can't invoke the optional stopping theorem's guarantee without checking its hypotheses.

## Tutor Recovery Strategy
- If MC-1 recurs, re-walk the independence-based conditional-expectation computation.
- If MC-2 recurs, re-walk the sign-flip reclassification.
- If MC-3 recurs, re-walk the failed-hypothesis stopping-time case.

## Memory Hooks
- "The martingale condition is conditional expectation on the whole past — no new tool."
- "Sub-/supermartingale is a sign-sensitive inequality check — never a vague judgment."
- "Optional stopping needs real hypotheses — an unbounded stopping time can break it."

## Transfer Connections
- `math.prob.conditional-expectation` (prerequisite, already authored): supplies the $E[X\mid Y]$
  machinery and tower property this concept directly extends to conditioning on an entire
  observed history.

## Cross-Subject Connections
- Quantitative finance: modeling asset log-returns as a martingale (the efficient-market "fair
  game" hypothesis) directly determines which trading strategies can or cannot systematically
  profit, subject to the optional stopping theorem's real hypotheses.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.prob.martingale.md`, reused by reference for
  its three worked examples (the running symmetric-random-walk example across Examples 1 and 3)
  and its three-misconception registry (birth types adopted directly as declared).
- Transfer probe: the Blueprint's own independence-mode probe on a trader modeling daily
  log-returns as a martingale, the failure mode of an unbounded "sell at +5%" stopping strategy,
  and the submartingale reclassification under genuine positive drift.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires
  `math.prob.conditional-expectation`, unlocks none, cross_links none, research/analyze,
  mastery_threshold 0.65, estimated_hours 8) was directly verified against the live KG and matches
  exactly.

## Version History
- 2026-09-19 (Batch 227): authored. Second entry this batch. Companion batch concept:
  `math.fnal.banach-space`.
