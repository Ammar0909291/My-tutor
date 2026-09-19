# math.opt.stochastic-gradient

## Identity
- **KG id**: `math.opt.stochastic-gradient`
- **Domain**: math.opt
- **Requires**: `math.opt.gradient-methods`, `math.prob.expected-value`
- **Unlocks**: none
- **Cross-links**: none
- **Difficulty**: expert
- **Bloom level**: apply
- **Mastery threshold**: 0.8
- **Estimated hours**: 5

## Learning Objective
Define the SGD update $\theta\leftarrow\theta-\alpha\nabla f_i(\theta)$ using a single randomly
selected term, justifying it as an UNBIASED estimate of the true gradient (never a systematically
wrong or biased one, despite the high variance); select learning-rate schedules recognizing
CONSTANT learning rates produce a noise floor that PREVENTS exact convergence (never assumed to
converge exactly the way full-gradient GD does); and explain mini-batch size as a fixed
HYPERPARAMETER trading variance for cost (never scaled inversely with dataset size $N$).

## Core Understanding
SGD'S UPDATE IS UNBIASED, NOT WRONG — HIGH VARIANCE IS NOT THE SAME AS BIAS: for $f(\theta)=
\frac13(f_1+f_2+f_3)(\theta)=2\theta^2$: the TRUE gradient at $\theta=1$ is $\nabla f(1)=4$. The
STOCHASTIC gradients are $\nabla f_1(1)=2$, $\nabla f_2(1)=4$, $\nabla f_3(1)=6$ — their AVERAGE
is $(2+4+6)/3=4=\nabla f(1)$, EXACTLY matching the true gradient. If $i$ is chosen UNIFORMLY,
$\mathbb E[\nabla f_i(\theta)]=\nabla f(\theta)$ ALWAYS — each individual step is off, but in
RANDOM directions that average out correctly. Bias means the AVERAGE is wrong; variance means
individual estimates SCATTER — SGD has HIGH variance but ZERO bias, never the reverse.

CONSTANT LEARNING RATES CREATE A PERMANENT NOISE FLOOR — NEVER EXACT CONVERGENCE: training with
constant $\alpha=0.1$ for 10,000 steps produces loss OSCILLATING between 0.32 and 0.38, never
settling — because EVERY stochastic gradient step adds noise proportional to $\alpha^2$, and this
noise NEVER vanishes near the minimum; the iterates bounce in a ball of radius
$O(\alpha\cdot\sigma^2)$ FOREVER. Only a DECAYING learning rate ($\alpha_t=\alpha_0/t$, satisfying
the Robbins-Monro conditions $\sum\alpha_t=\infty$, $\sum\alpha_t^2<\infty$) allows the noise
ball to SHRINK TO ZERO — a constant rate, however small, NEVER achieves exact convergence for
SGD, unlike deterministic full-gradient descent on a strongly convex function.

MINI-BATCH SIZE IS A FIXED HYPERPARAMETER — NEVER SCALED INVERSELY WITH DATASET SIZE: with
$N=10^6$ samples, you STILL use $b=32$ or $b=256$ — the same-sized mini-batch is a noisy but
UNBIASED estimate of the gradient REGARDLESS of whether $N$ is $10^6$ or $10^9$. What SCALES with
$N$ is the NUMBER OF STEPS PER EPOCH ($N/b$), never the batch size itself. The variance of a
mini-batch gradient is $\sigma^2/b$ — depending ONLY on $b$, INDEPENDENT of $N$. Doubling $b$
HALVES the variance (and, via the linear scaling rule, allows roughly doubling $\alpha$ while
keeping the noise floor comparable) — but $b$ is NEVER chosen as a function of $N$ itself.

## Mental Models
- **"SGD's individual steps are noisy but never systematically wrong — average enough of them
  and you land exactly on the true gradient."**
- **"A constant learning rate leaves a permanent noise ball around the minimum — only a decaying
  rate lets that ball shrink to nothing."**
- **"Batch size is a knob you set independently of how much data you have — more data means more
  steps per epoch, never a smaller batch."**

## Why Students Fail

### MC-1: SGD-UPDATE-IS-WRONG-GRADIENT
- **Surface form**: believes using $\nabla f_i$ instead of $\nabla f$ introduces a systematic
  error (bias) into each step, not seeing that $\mathbb E[\nabla f_i(\theta)]=\nabla f(\theta)$.
- **Birth type**: Type 5 instruction-induced (Blueprint's own declared birth type — students
  learn "use the true gradient" from deterministic GD, framing any deviation as wrong).
- **Repair**: re-verify the numerical unbiasedness example, averaging $\nabla f_1,\nabla f_2,
  \nabla f_3$ at $\theta=1$.

### MC-2: CONSTANT-LR-ALWAYS-CONVERGES
- **Surface form**: applies a constant (non-decaying) learning rate and expects convergence to
  the exact minimum, is confused when loss oscillates near the optimum.
- **Birth type**: Type 1 overgeneralization (Blueprint's own declared birth type — constant LR
  works for GD on strongly convex functions; fails for SGD's persistent noise).
- **Repair**: re-derive the noise-floor argument, connecting $\alpha$ directly to the oscillation
  radius.

### MC-3: MORE-DATA-MEANS-SMALLER-BATCH
- **Surface form**: believes mini-batch size should decrease as the dataset grows, confusing
  batch size with step count or epoch count.
- **Birth type**: Type 3 language contamination (Blueprint's own declared birth type —
  "mini-batch" sounds like it should scale with $N$).
- **Repair**: re-anchor on the variance formula $\sigma^2/b$, independent of $N$, and on what
  actually scales with $N$ (steps per epoch).

## Misconceptions

### MC-1: SGD-UPDATE-IS-WRONG-GRADIENT
- **Surface form**: as described above.
- **Root cause (Type 5 instruction-induced)**: as described above.
- **Repair**: as described above.

### MC-2: CONSTANT-LR-ALWAYS-CONVERGES
- **Surface form**: as described above.
- **Root cause (Type 1 overgeneralization)**: as described above.
- **Repair**: as described above.

### MC-3: MORE-DATA-MEANS-SMALLER-BATCH
- **Surface form**: as described above.
- **Root cause (Type 3 language contamination)**: as described above.
- **Repair**: as described above.

## Analogies
- **"A stochastic gradient is like a single noisy poll — individually unreliable, but averaging
  enough of them gives you the true population answer, with zero systematic skew."**
- **Anti-analogy**: a constant learning rate is not a dial you can leave fixed and expect perfect
  convergence — it leaves a permanent jitter that only a decaying rate can remove.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: the numerical unbiasedness verification at $\theta=1$ for
  $f(\theta)=2\theta^2$.
- **Demonstration 2 (targets MC-2)**: the constant-$\alpha=0.1$ oscillation-versus-decaying-rate
  contrast.
- **Demonstration 3 (targets MC-3)**: the SGD/mini-batch/full-GD comparison table, showing
  variance depends only on $b$, never on $N$.

## Discovery Questions
1. "Does using a single randomly selected gradient $\nabla f_i$ instead of the true gradient
   $\nabla f$ introduce a systematic bias?"
2. "Does a constant learning rate guarantee SGD converges to the exact minimum?"
3. "Should mini-batch size decrease as the dataset size $N$ grows?"

## Teaching Sequence
1. **Representation shift**: the four representations of SGD (motivation, probabilistic,
   trajectory, update-rule family), working Demonstration 1, isolating MC-1.
2. **Misconception detector**: the learning-rate-schedule and noise-floor analysis, working
   Demonstration 2, isolating MC-2.
3. **Contrast pair**: the SGD-versus-mini-batch-versus-full-GD comparison table, working
   Demonstration 3, isolating MC-3.
4. **Mastery gate**: require a correct unbiasedness verification, a correct explanation of the
   noise-floor-versus-decaying-rate trade-off, and a correct application of the linear scaling
   rule between batch size and learning rate, at the Blueprint's own stated MAMR of 4/5.

## Tutor Actions
- Never accept the stochastic gradient described as systematically biased rather than unbiased
  with high variance.
- Never accept a constant learning rate assumed to guarantee exact convergence for SGD.
- Never accept mini-batch size described as something that should shrink as the dataset grows.

## Voice Teaching Notes
- Say "is that a bias problem or a variance problem?" whenever SGD's noisiness is discussed.
- Ask "will that noise ball ever shrink to zero with a constant rate?" whenever a learning-rate
  schedule is chosen.

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly verifies $\mathbb E[\nabla f_i(\theta)]=\nabla
  f(\theta)$ for a small finite-sum example.
- **Rung 2 (application)**: learner correctly explains why a constant learning rate produces a
  noise floor and why a decaying rate is needed for exact convergence.
- **Rung 3 (transfer)**: learner correctly applies the linear scaling rule between batch size and
  learning rate, and correctly explains why mini-batch size doesn't scale with $N$.

## Tutor Recovery Strategy
- If MC-1 recurs, re-verify the numerical unbiasedness example.
- If MC-2 recurs, re-derive the noise-floor argument.
- If MC-3 recurs, re-anchor on the variance formula $\sigma^2/b$, independent of $N$.

## Memory Hooks
- "SGD is unbiased but noisy — never systematically wrong."
- "Constant learning rate leaves a permanent noise ball — decay it to converge exactly."
- "Batch size is independent of dataset size — more data means more steps, not smaller batches."

## Transfer Connections
- `math.opt.gradient-methods` (already authored, certified domain): supplies the
  deterministic full-gradient descent framework this concept's stochastic variant directly
  contrasts against.
- `math.prob.expected-value` (already authored, certified domain): supplies the expectation
  machinery this concept's unbiasedness proof ($\mathbb E[\nabla f_i(\theta)]=\nabla f(\theta)$)
  directly relies on.

## Cross-Subject Connections
- Machine learning: SGD and its variants (Adam, momentum, warm-up schedules) are the standard
  training algorithms for deep neural networks, the primary motivating application this concept
  establishes.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.opt.stochastic-gradient.md`, reused by
  reference for its unbiasedness proof sketch, its constant-versus-decaying learning-rate
  contrast, its SGD/mini-batch/full-GD comparison table, and its three-misconception registry
  (birth types adopted directly as declared).
- Transfer probe: the Blueprint's own independence-mode probe on SVRG (Stochastic Variance
  Reduced Gradient), extending the unbiasedness argument to a variance-reduced estimator.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires
  `math.opt.gradient-methods`/`math.prob.expected-value`, unlocks none, cross_links none,
  expert/apply, mastery_threshold 0.8, estimated_hours 5) was directly verified against the live
  KG and matches exactly.

## Version History
- 2026-09-19 (Batch 196): authored. Second entry this batch. Companion batch concept:
  `math.opt.quadratic-programming`.
