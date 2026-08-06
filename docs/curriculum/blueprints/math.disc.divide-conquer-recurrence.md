# Blueprint: math.disc.divide-conquer-recurrence

## Component 0 — Concept Identity
| Field | Value |
|---|---|
| KG ID | math.disc.divide-conquer-recurrence |
| name | Divide and Conquer Recurrences |
| Domain | math.disc |
| Difficulty | proficient |
| Bloom level | apply |
| Estimated hours | 4 |
| Mastery threshold | 0.85 |
| MAMR | 5/5 |
| Prerequisites | math.disc.recurrence-relation, math.alg.logarithm |
| Cross-links | — |
| Unlocks | math.disc.algorithm-complexity |

## Component 1 — Learning Objective
The student sets up the divide-and-conquer recurrence T(n) = aT(n/b) + f(n) for a given algorithm (identifying a subproblems of size n/b with combination cost f(n)); applies all three cases of the Master Theorem to obtain closed-form Θ-bounds; recognises when the theorem does not apply (non-polynomial f(n), non-constant a/b); verifies results on canonical examples (merge sort T(n)=2T(n/2)+Θ(n)→Θ(n log n), binary search T(n)=T(n/2)+Θ(1)→Θ(log n), Karatsuba T(n)=3T(n/2)+Θ(n)→Θ(n^{log₂3})); and applies the Akra–Bazzi extension for unequal subproblem sizes.

## Component 2 — CPA Entry Stage
**P — Pictorial** (draw a recursion tree for T(n)=2T(n/2)+n: root level costs n, level 1 costs 2×(n/2)=n, level 2 costs 4×(n/4)=n, …, log n levels total → total cost n log n; annotate each level's aggregate cost; label a=2, b=2, f(n)=n; mark n^{log_b a}=n^1=n: "when f(n)=Θ(n^{log_b a}), multiply by log n → Case 2 of Master Theorem")

## Component 3 — Misconception Register

| ID | Label | Pattern | Birth type |
|---|---|---|---|
| MC-1 | MASTER-THEOREM-ALWAYS-APPLIES | Student applies the Master Theorem to recurrences outside its domain — non-polynomial f(n) (e.g. f(n)=n log n falls on the Case 2 boundary and requires logarithmic adjustment; f(n)=2ⁿ is clearly non-polynomial and the theorem gives no answer), unequal partition sizes (T(n)=T(n/3)+T(2n/3)+n), or non-constant a or b | Type 5 — instruction-induced (the Master Theorem is presented as the universal divide-and-conquer solver; its applicability conditions are stated but never drilled as hard checks; students reach for it automatically without verifying f(n) is polynomial and the split is uniform) |
| MC-2 | WRONG-CRITICAL-EXPONENT | Student computes log_b a incorrectly — confusing a and b (uses log_a b instead of log_b a), or forgetting that the critical exponent is log_b a and not a/b or a−b | Type 4 — notation-induced (the formula T(n)=aT(n/b)+f(n) has a and b appearing symmetrically to the eye; the asymmetric role they play in log_b a is counter-intuitive; a numerical example: a=8, b=2 gives log₂ 8=3, not log₈ 2=1/3 — the two values differ by a factor of 9) |
| MC-3 | CASE-BOUNDARY-CONFUSION | Student confuses the three Master Theorem cases: applies Case 1 when f(n) is polynomially smaller than n^{log_b a} but uses the wrong direction; conflates Case 1 (f smaller, answer is n^{log_b a}) with Case 3 (f larger, answer is f(n)) | Type 4 — notation-induced (Cases 1 and 3 both involve a polynomial gap between f(n) and n^{log_b a} but in opposite directions; students memorise the formula structure without anchoring which case applies when; the "if f is smaller, the recursion tree dominates; if f is larger, the root dominates" intuition from the tree picture is the antidote but is rarely emphasised) |

## Component 4 — Session TA Cap
**Cap = 6** (hrs = 4 → cap 6)

## Component 5 — Teaching Action Sequence

### A01 — P11 REPRESENTATION SHIFT (open)
**Setting up the recurrence and the Master Theorem:**

**Standard form:** T(n) = aT(n/b) + f(n), where:
- a ≥ 1: number of subproblems
- b > 1: factor by which problem size shrinks
- f(n): cost of dividing and combining (not counting recursive calls)

**Critical exponent:** c* = log_b a (= log of a, base b)

**Master Theorem (polynomial f(n) version):**
1. **Case 1:** f(n) = O(n^{c*−ε}) for some ε > 0 → T(n) = Θ(n^{c*}). (Recursion tree dominates; leaves dominate.)
2. **Case 2:** f(n) = Θ(n^{c*} · log^k n) for k ≥ 0 → T(n) = Θ(n^{c*} · log^{k+1} n). (Every level of the recursion tree costs the same; multiply by number of levels.)
3. **Case 3:** f(n) = Ω(n^{c*+ε}) for some ε > 0 AND af(n/b) ≤ cf(n) for some c < 1 (regularity) → T(n) = Θ(f(n)). (Root dominates.)

**Canonical examples:**
| Algorithm | Recurrence | a, b, f(n) | c* | Case | Answer |
|---|---|---|---|---|---|
| Merge sort | 2T(n/2)+n | 2, 2, n | 1 | 2 | Θ(n log n) |
| Binary search | T(n/2)+1 | 1, 2, 1 | 0 | 2 | Θ(log n) |
| Naive matrix mult. | 8T(n/2)+n² | 8, 2, n² | 3 | 1 | Θ(n³) |
| Karatsuba mult. | 3T(n/2)+n | 3, 2, n | log₂3≈1.585 | 1 | Θ(n^{log₂3}) |
| Strassen | 7T(n/2)+n² | 7, 2, n² | log₂7≈2.807 | 1 | Θ(n^{log₂7}) |

**Recursion tree method (when Master Theorem doesn't apply):**
Each level l contributes aˡ · f(n/bˡ) to the total cost. Sum over all levels l = 0, …, log_b n.

**P49 checkpoint:**
- CORRECT → "T(n)=aT(n/b)+f(n): identify a, b, f; compute c*=log_b a; compare f(n) to n^{c*} polynomially; apply Case 1/2/3. Merge sort: Θ(n log n); binary search: Θ(log n); Karatsuba: Θ(n^{log₂3})." → A02
- PARTIAL (MC-2: wrong critical exponent) → "Critical exponent: log BASE b of a — the logarithm WITH BASE b applied to a. For T(n)=8T(n/2)+n²: a=8, b=2, c*=log₂ 8=3 (since 2³=8). f(n)=n² vs n^3: n² is polynomially smaller → Case 1 → Θ(n³). The two values log_b a and log_a b are RECIPROCALS of each other — always use log_b a as the exponent." → TB-R01 → A02
- INCORRECT → TB-R01 → A02
- NO_RESPONSE → "T(n)=4T(n/2)+n: a=4, b=2, c*=log₂4=2, f(n)=n=O(n^{2−1}): Case 1 → Θ(n²). T(n)=4T(n/2)+n²: c*=2, f(n)=Θ(n²)=Θ(n^2 log⁰n): Case 2 → Θ(n² log n). T(n)=4T(n/2)+n³: f(n)=Ω(n^{2+1}): regularity: 4·(n/2)³=n³/2=0.5·n³✓: Case 3 → Θ(n³)." → TB-R01 → A02

### A02 — P04 PATTERN INDUCTION
**Non-standard recurrences and Akra–Bazzi:**

**When Master Theorem does NOT apply:**
- f(n) = n log n: falls in Case 2 with k=1 → T(n)=2T(n/2)+n log n gives Θ(n log² n). (This is a log-adjusted Case 2.)
- Non-uniform split: T(n) = T(n/3) + T(2n/3) + n (merge with unequal parts). Master Theorem requires one subproblem size; Akra–Bazzi or the tree method applies instead.
- Non-constant a or b: T(n) = √n · T(√n) + n. Master Theorem assumes integer a ≥ 1, b > 1; this has variable branching and requires transformation.

**Akra–Bazzi theorem (non-uniform splits):**
T(n) = Σᵢ aᵢ T(n/bᵢ) + f(n). Find p such that Σᵢ aᵢ/bᵢᵖ = 1. Then T(n) = Θ(nᵖ(1 + ∫₁ⁿ f(u)/u^{p+1} du)).

**Example (non-uniform):** T(n) = T(n/3) + T(2n/3) + n. Solve 1/3ᵖ + (2/3)ᵖ = 1: p=1. ∫ u/u² du = ln n → T(n) = Θ(n log n). (Same answer as merge sort despite unequal halves because the "heavy" subproblem dominates the work at each level similarly.)

**Substitution (guess and verify):** Guess T(n) = O(n log n). Assume T(n/2) ≤ c(n/2)log(n/2). Substitute: T(n) ≤ 2c(n/2)(log n − 1) + n = cn log n − cn + n ≤ cn log n for c ≥ 1. ✓

**P49 checkpoint:**
- CORRECT → "Master Theorem needs uniform a/b, polynomial f. Non-uniform: Akra–Bazzi or substitution. f(n)=n log n: log-adjusted Case 2 → extra log factor. Non-uniform T(n)=T(n/3)+T(2n/3)+n: p=1 → Θ(n log n)." → Gate (P91)
- PARTIAL (MC-1: theorem applied out of domain) → "Master Theorem requires: (1) uniform split — all subproblems the same size n/b; (2) polynomial f(n) that can be compared to n^{c*} via O or Ω with a polynomial gap ε>0. For f(n)=n log n vs n^1: the gap is logarithmic, not polynomial — Case 2 with k=1 applies directly since n log n = Θ(n · log¹ n) = Θ(n^{c*} · log¹ n) → Θ(n log² n). Always CHECK: is the split uniform? Is f(n) polynomial or polylogarithmic in n?" → TB-R02 → Gate
- INCORRECT → TB-R02 → Gate
- NO_RESPONSE → "T(n)=T(n/4)+T(3n/4)+n: Akra–Bazzi. p: (1/4)ᵖ+(3/4)ᵖ=1. Test p=1: 1/4+3/4=1✓. ∫₁ⁿ u/u²du=ln n. Answer: Θ(n log n). Verify intuitively: every level sums to n, and there are O(log n) levels (depth = log_{4/3} n) → O(n log n). ✓" → TB-R02 → Gate

## Component 6 — Protocol B Repair Chains

**TB-R01 (MC-2 + MC-3 combined):**
Step 1 — "The three-step checklist before applying Master Theorem: (1) Write T(n)=aT(n/b)+f(n) explicitly — identify a (number of recursive calls), b (the factor — n becomes n/b), f(n) (the non-recursive work). (2) Compute c*=log_b(a) using a calculator or logarithm rules. (3) Ask: is f(n) polynomially smaller, same, or larger than n^{c*}? If same: Case 2. If smaller: Case 1. If larger (with regularity): Case 3."
Step 2 — "Memory device for Cases 1 and 3: think of a weighing scale. On the left pan: n^{c*} (the recursion tree total, all the leaves). On the right pan: f(n) repeated O(log n) times. Case 1: left pan is heavier (leaves dominate) → answer is n^{c*}. Case 3: right pan is heavier (root dominates) → answer is f(n). Case 2: balanced → multiply by log n."
Step 3 — "Practice with wrong answers: a student says T(n)=9T(n/3)+n² gives Θ(n²). Check: a=9, b=3, c*=log₃9=2, f(n)=n²=Θ(n^2·log⁰n). This is Case 2 (k=0) → Θ(n² log n). The student forgot the extra log factor from Case 2. Another: T(n)=2T(n/4)+√n. c*=log₄2=1/2. f(n)=n^{1/2}=n^{c*}: Case 2 → Θ(√n · log n)."

**TB-R02 (MC-1 APPLICABILITY):**
Step 1 — "The three disqualifiers from Master Theorem: (a) NON-UNIFORM subproblems (T(n/3)+T(2n/3)+n) — Master requires one size n/b; (b) VARIABLE branching (√n subproblems of size √n) — Master requires constant a; (c) f(n) that is NOT comparable via polynomial gap (f(n)=n log n vs n^{c*}=n: the gap is log n, which is sub-polynomial — this actually IS Case 2 with k=1, so it's handleable; f(n)=2ⁿ vs n^{c*}: exponential gap, no case applies)."
Step 2 — "For non-uniform splits, use the recursion TREE: draw levels 0,1,2,…; at level l, you have a 'fan' of active subproblems with total sizes summing to n (or close); sum the f-costs per level; count levels (depth of shallowest leaf vs deepest leaf may differ — take the geometric progression of costs into account)."
Step 3 — "Substitution method: your backup when the tree is hard. (1) GUESS a closed form (informed by a simpler similar recurrence). (2) ASSUME the induction hypothesis holds for all m < n. (3) SUBSTITUTE into T(n)=aT(n/b)+f(n). (4) VERIFY the algebra closes. Common pitfall: forgetting to verify the base case separately — set T(1)=Θ(1) and confirm the constant absorbs."

## Component 7 — P91 Mastery Gate Sequence

**P77 — Problem Set (5 items):**
1. Apply the Master Theorem to each: (a) T(n)=5T(n/5)+n; (b) T(n)=7T(n/2)+n²; (c) T(n)=3T(n/9)+1; (d) T(n)=T(n/2)+log n; (e) T(n)=2T(n/2)+n log n. Identify the case and state the Θ-bound.
2. The Strassen matrix multiplication algorithm computes a product of two n×n matrices using 7 multiplications of n/2×n/2 matrices plus O(n²) additions. Write its recurrence and apply the Master Theorem to show T(n)=Θ(n^{log₂7}).
3. For the non-uniform recurrence T(n)=T(n/3)+T(2n/3)+n, use the recursion tree method to show T(n)=O(n log n). (Hint: show every level costs exactly n and count the number of levels.)
4. Use the substitution method to prove T(n)=2T(⌊n/2⌋)+n=O(n log n). Be careful with the floor; assume T(1)=1 and show the inductive step closes with a specific choice of constant c.
5. Algorithm X solves a problem of size n by dividing it into a=4 subproblems of size n/2 and doing Θ(n²) work to combine. Algorithm Y divides into 2 subproblems of size n/2 with Θ(n²) work. Compare their asymptotic complexities and explain which is faster and why.

**P55 — Reflect & Consolidate:** "T(n)=aT(n/b)+f(n): c*=log_b a. Case 1: f polynomially smaller → Θ(n^{c*}). Case 2: f matches n^{c*}·log^k → Θ(n^{c*}·log^{k+1}n). Case 3: f polynomially larger + regularity → Θ(f(n)). Non-uniform splits: Akra–Bazzi or tree. Merge sort: Case 2, Θ(n log n). Binary search: Case 2, Θ(log n). Karatsuba: Case 1, Θ(n^{log₂3})."

**P76 — Transfer Probe (Independence mode):**
(a) The Akra–Bazzi theorem: prove that for T(n)=aT(n/b)+f(n) with p=log_b a, the integral formula T(n)=Θ(nᵖ(1+∫₁ⁿ f(u)/u^{p+1}du)) reduces to the three Master Theorem cases when f(n)=nᵈ: verify Case 1 (d<p → integral converges to a constant → T=Θ(nᵖ)), Case 2 (d=p → integral gives log n → T=Θ(nᵖ log n)), Case 3 (d>p → integral grows as n^{d−p} → T=Θ(nᵈ)). (b) Lower-bound matching: the Ω lower bound for merge sort is Ω(n log n) via the comparison-based sorting lower bound (any comparison tree for n elements has at least n! leaves → depth ≥ log₂(n!), and Stirling gives log₂(n!)=Θ(n log n)). Explain why this lower bound and the Master-Theorem upper bound Θ(n log n) together prove merge sort is optimal. (c) Integer multiplication history: the grade-school algorithm runs in Θ(n²) (two n-digit numbers → n² digit multiplications). Karatsuba uses 3 multiplications of ⌈n/2⌉-digit numbers → Θ(n^{log₂3}≈n^{1.585}). The Schönhage–Strassen algorithm achieves Θ(n log n log log n) via FFT-based polynomial multiplication. Describe the mathematical structure that lets FFT replace the 3-multiplication divide-and-conquer with a completely different paradigm.

**P75 — Mastery Assessment:**
"(a) Solve T(n)=4T(n/2)+n² log n completely, identifying the case and finding the Θ-bound. (b) A recursive algorithm for the closest-pair-of-points problem has recurrence T(n)=2T(n/2)+Θ(n). State the bound and identify which sorting step makes the combination cost O(n). (c) Consider T(n)=T(n−1)+n. Is this a divide-and-conquer recurrence? Apply the appropriate method (not Master Theorem) and find T(n)=Θ(n²). Explain why Master Theorem doesn't apply. (d) An algorithm divides a problem into 3 subproblems of sizes n/4, n/4, n/2 with O(n) combination. Use Akra–Bazzi to find p, then compute T(n)."

**P74 — Routing Decision:**
- Score ≥ 5/5 → MASTERED
- Score 4/5 → REVIEW the Master Theorem case identification and Akra–Bazzi integral formula
- Score ≤ 3/5 → PREREQUISITE GAP in math.disc.recurrence-relation or math.alg.logarithm; reassign

**P78 — Completion:** Divide and Conquer Recurrences certified. Student sets up T(n)=aT(n/b)+f(n) from algorithm descriptions; identifies a, b, f(n) and computes c*=log_b a; applies all three Master Theorem cases; recognises applicability limits; uses the recursion tree and substitution as alternatives; and applies Akra–Bazzi for non-uniform splits.

## Component 8 — P76 Transfer Probe Detail
**Mode: Independence** (cross_links = [])
Target: Akra–Bazzi reduces to Master Theorem; merge sort optimality via comparison lower bound; FFT paradigm vs. divide-and-conquer for integer multiplication
Skill tested: Connect the Master Theorem to its analytical foundation, use it to prove algorithm optimality, and see the limits of the divide-and-conquer paradigm

## Component 10 — Version History
| Version | Date | Note |
|---|---|---|
| 1.0 | 2026-07-30 | Initial authoring |
