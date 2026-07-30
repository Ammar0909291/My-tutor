# Blueprint: math.opt.stochastic-gradient

## Component 0 — Concept Identity
| Field | Value |
|---|---|
| KG ID | math.opt.stochastic-gradient |
| Title | Stochastic Gradient Descent |
| Domain | math.opt |
| Difficulty | expert |
| Bloom level | apply |
| Estimated hours | 5 |
| Mastery threshold | 0.80 |
| MAMR | 4/5 |
| Prerequisites | math.opt.gradient-methods, math.prob.expected-value |
| Cross-links | — |
| Unlocks | — |

## Component 1 — Learning Objective
Given an objective function of the form f(θ)=(1/N)Σᵢfᵢ(θ) (finite-sum structure), the student explains why full-gradient GD is computationally prohibitive for large N, defines the SGD update θ←θ−α∇fᵢ(θ) using a single randomly-selected term, justifies the update as an unbiased estimate of the true gradient, selects appropriate learning rate schedules (constant, decaying, warm-up), explains mini-batch as a variance-reduction middle ground, and identifies the convergence properties (convergence to a neighbourhood of the minimum, noise floor) versus those of full GD.

## Component 2 — CPA Entry Stage
**A — Abstract** (gradient update equations; expectation argument; learning rate schedule formulas)

## Component 3 — Misconception Register

| ID | Label | Pattern | Birth type |
|---|---|---|---|
| MC-1 | SGD-UPDATE-IS-WRONG-GRADIENT | Student believes using ∇fᵢ instead of ∇f introduces a systematic error (bias) into each step; does not see that 𝔼[∇fᵢ(θ)]=∇f(θ) | Type 5 — instruction-induced (students learn "use the true gradient" from deterministic GD) |
| MC-2 | CONSTANT-LR-ALWAYS-CONVERGES | Student applies a constant (non-decaying) learning rate and expects convergence to the exact minimum; is confused when loss oscillates near the optimum | Type 1 — overgeneralization (constant LR works for GD on strongly convex functions; fails for SGD noise) |
| MC-3 | MORE-DATA-MEANS-SMALLER-BATCH | Student believes mini-batch size should decrease as the dataset grows; confuses batch size with step count or epoch count | Type 3 — language contamination ("mini-batch" sounds like it should scale with N) |

## Component 4 — Session TA Cap
**Cap = 7** (hrs = 5 → cap 7)

## Component 5 — Teaching Action Sequence

### A01 — P11 REPRESENTATION SHIFT (open)
**Four representations of SGD:**

| Representation | Instance |
|---|---|
| Motivation | Full GD: θ←θ−(α/N)Σᵢ∇fᵢ(θ); cost O(N) per step; SGD: pick one i uniformly, θ←θ−α∇fᵢ(θ); cost O(1) per step |
| Probabilistic | 𝔼ᵢ[∇fᵢ(θ)]=∇f(θ); each step is an unbiased estimate of the true gradient |
| Trajectory picture | Full GD: smooth monotone descent toward minimum. SGD: noisy zigzag path; on average descends, but individual steps can go uphill |
| Update rule family | SGD: b=1; Mini-batch: 1<b<N; Full GD: b=N |

**Unbiasedness proof sketch:** If i is chosen uniformly from {1,…,N}, then 𝔼[∇fᵢ(θ)] = (1/N)Σᵢ∇fᵢ(θ) = ∇[(1/N)Σᵢfᵢ(θ)] = ∇f(θ). Each SGD step is a noisy but unbiased gradient step.

**P49 checkpoint:**
- CORRECT → "SGD replaces O(N) gradient by O(1) unbiased estimate. The noise is a price for the speedup." → A02
- PARTIAL (understands update, misses unbiasedness) → "What is 𝔼[∇fᵢ(θ)] if i is chosen uniformly from {1,…,N}?" → TB-R01 → A02
- INCORRECT → TB-R01 → A02
- NO_RESPONSE → "If f(θ)=(f₁(θ)+f₂(θ)+f₃(θ))/3, what is the average of ∇f₁,∇f₂,∇f₃?" → TB-R01 → A02

### A02 — P41 MISCONCEPTION DETECTOR + P64 MC-2 gate
**Learning rate schedule and the noise floor:**

| Schedule | Update | Effect |
|---|---|---|
| Constant α | θ←θ−α∇fᵢ | Oscillates in neighbourhood of radius O(α·σ²) around minimum; never converges exactly |
| Decaying α_t=α₀/t | Σαt=∞, Σαt²<∞ (Robbins-Monro) | Converges to exact minimum for convex f; slow late steps |
| Warm-up + cosine decay | α increases then decreases smoothly | Practical; used in deep learning (Adam, SGD with momentum) |

**Gate question (MC-2):** "A student trains a logistic regression with SGD, α=0.1, and observes that after 10,000 steps the training loss oscillates between 0.32 and 0.38 rather than converging. What is the cause?" The constant LR α=0.1 causes a noise floor: each stochastic gradient step adds noise of variance proportional to α². The oscillation radius is O(α·variance). Fix: decay the learning rate (e.g., α_t=0.1/√t).

**P49 checkpoint:**
- CORRECT → "Constant LR → noise floor; decaying LR → exact convergence (in theory); practical: warm-up + decay." → A03
- PARTIAL (knows LR matters, can't quantify noise floor) → "If σ² is the gradient variance and α is the LR, how does the oscillation radius scale with α?" → TB-R02 → A03
- INCORRECT → TB-R02 → A03
- NO_RESPONSE → "If you halve α from 0.1 to 0.05, the oscillation amplitude roughly halves. Does the loss floor go up or down?" → TB-R02 → A03

### A03 — P06 CONTRAST PAIR
**SGD vs. Mini-batch SGD vs. Full GD:**

| Feature | SGD (b=1) | Mini-batch (b=32) | Full GD (b=N) |
|---|---|---|---|
| Gradient estimate variance | High (σ²) | Medium (σ²/b) | Zero |
| Steps per epoch | N | N/b | 1 |
| Cost per step | O(1) | O(b) | O(N) |
| Parallelism | None | GPU-friendly | GPU-friendly |
| Noise floor at constant α | O(α·σ²) | O(α·σ²/b) | Zero (deterministic) |
| Memory | O(1) | O(b) | O(N) |

**Key insight:** Increasing batch size b reduces variance by 1/b but costs b× more per step. Doubling b → same steps per epoch costs 2×; but halves noise, so LR can be doubled (linear scaling rule: if b is doubled, α can be doubled to maintain similar convergence speed). For b→N: full GD, zero noise, exact convergence with constant LR.

**P49 checkpoint:**
- CORRECT → "Mini-batch is the variance-cost trade-off. Doubling b halves variance and allows doubling LR." → Gate (P91)
- PARTIAL (knows mini-batch reduces variance, misses linear scaling rule) → "If you double the mini-batch size from 32 to 64, by how much can you increase the learning rate without increasing the noise floor?" → TB-R03 → Gate
- INCORRECT → TB-R03 → Gate
- NO_RESPONSE → "A mini-batch of b=32 has variance σ²/32. A mini-batch of b=64 has variance _?" → TB-R03 → Gate

## Component 6 — Protocol B Repair Chains

**TB-R01 (MC-1 SGD-UPDATE-IS-WRONG-GRADIENT):**
Step 1 — "Bias means the average of many estimates is wrong. Variance means individual estimates scatter around the correct value. SGD has HIGH variance but ZERO bias: 𝔼[∇fᵢ]=∇f." Step 2 — Numerical example: f(θ)=(θ²+2θ²+3θ²)/3=2θ². True gradient at θ=1: ∇f(1)=4. Stochastic gradients: ∇f₁(1)=2, ∇f₂(1)=4, ∇f₃(1)=6. Average=(2+4+6)/3=4=∇f(1). ✓ Step 3 — "Each step is off, but in random directions — on average they point the right way."

**TB-R02 (MC-2 CONSTANT-LR-ALWAYS-CONVERGES):**
Step 1 — "GD with constant LR on a strongly convex f: converges to the minimum because the gradient is exact and each step reduces the gap geometrically." Step 2 — "SGD with constant LR: each step is gradient + noise. The noise is always present — even near the minimum the stochastic gradient is nonzero. The update never fully stops. The iterates bounce in a ball of radius ∝ α around the minimum." Step 3 — "To make the ball shrink to zero, α must decay to zero. Robbins-Monro: Σα_t=∞ (enough total movement to escape bad starts) and Σα_t²<∞ (noise eventually negligible)."

**TB-R03 (MC-3 MORE-DATA-MEANS-SMALLER-BATCH):**
Step 1 — "Batch size is a hyperparameter, not a function of N. With N=10⁶ samples you still use b=32 or b=256 — the same 32 samples are a noisy but unbiased estimate of the gradient regardless of whether N is 10⁶ or 10⁹." Step 2 — "What scales with N: the number of steps per epoch (N/b). More data → more distinct mini-batches per epoch → more updates → better coverage, not smaller batches." Step 3 — Re-explain the variance formula: Var[batch gradient]=(σ²/b), independent of N.

## Component 7 — P91 Gate Sequence (Mastery)

**P77 — Problem Set (4 items):**
1. For f(θ)=(1/4)(f₁(θ)+f₂(θ)+f₃(θ)+f₄(θ)) where fᵢ(θ)=(θ−i)², compute the true gradient ∇f(θ) at θ=3. Then compute the stochastic gradient ∇f₂(θ) at θ=3. Verify 𝔼ᵢ[∇fᵢ(3)]=∇f(3).
2. A student uses SGD with constant α=0.01 on a convex problem and observes training loss stabilizing at 0.05±0.02. They switch to SGD with α_t=0.01/√t. Qualitatively describe the expected behavior of the training loss over the next 10,000 steps.
3. Compare the total computational cost (in gradient evaluations) of: (a) 1000 full-GD steps on N=50,000 samples; (b) 1,562,500 SGD steps on b=32 mini-batches covering the same total gradient evaluations.
4. State the Robbins-Monro conditions on the learning rate schedule {α_t} and explain intuitively what each condition ensures.

**P55 — Reflect & Consolidate:** "SGD trades gradient accuracy (variance) for computational speed. The noise floor is proportional to α; convergence requires α→0 at the right rate. Mini-batch interpolates between SGD and full GD."

**P76 — Transfer Probe (Independence mode):**
Variance reduction method — SVRG (Stochastic Variance Reduced Gradient): periodically compute the full gradient g̃=∇f(θ̃) at a snapshot θ̃; then each step uses ∇fᵢ(θ)−∇fᵢ(θ̃)+g̃ instead of ∇fᵢ(θ). Show that this modified estimator is still unbiased (𝔼ᵢ[∇fᵢ(θ)−∇fᵢ(θ̃)+g̃]=∇f(θ)). Explain qualitatively why the variance is smaller when θ≈θ̃ compared to plain SGD.

**P55 — Reflect & Consolidate:** "SVRG shows the unbiasedness argument generalises: any correction that averages to zero preserves unbiasedness. Variance reduction by subtracting a correlated control variate is a general technique."

**P75 — Mastery Assessment:**
"You train a model on N=1,000,000 samples. (a) Full GD would require one pass through all N samples per step. You plan 100 epochs. How many gradient evaluations does full GD use? (b) SGD with b=256 and same 100 epochs: how many gradient evaluations? (c) The noise floor of SGD with constant α is proportional to α·σ²/b. If you double b from 256 to 512, by what factor should you scale α to keep the noise floor the same? (d) Explain why a decaying learning rate schedule is preferable to a constant LR if you want convergence guarantees."

**P55 — Reflect & Consolidate:** "The key trade-offs: computation per step (O(b)), gradient variance (σ²/b), noise floor (α·σ²/b), convergence (decay LR). These three levers interact."

**P74 — Routing Decision:**
- Score ≥ 4/5 → MASTERED; math.opt.stochastic-gradient complete
- Score 3/5 → REVIEW unbiasedness and learning rate schedule; replay A01–A02
- Score ≤ 2/5 → PREREQUISITE GAP in math.opt.gradient-methods or math.prob.expected-value; reassign

**P78 — Completion:** Stochastic gradient descent certified. Student can justify unbiasedness, select learning rate schedules, and reason about the noise floor vs. convergence trade-off.

## Component 8 — P76 Transfer Probe Detail
**Mode: Independence** (cross_links = [])
Target: SVRG variance-reduction method (unbiasedness preserved; variance shrinks near snapshot)
Skill tested: Extend the unbiasedness argument to a modified estimator; reason about variance qualitatively from proximity to snapshot

## Component 10 — Version History
| Version | Date | Note |
|---|---|---|
| 1.0 | 2026-07-30 | Initial authoring |
