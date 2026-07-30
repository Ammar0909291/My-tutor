# Blueprint: math.nt.induction-applications

## Component 0 — Concept Identity
| Field | Value |
|---|---|
| KG ID | math.nt.induction-applications |
| name | Induction Applications in Number Theory |
| Domain | math.nt |
| Difficulty | proficient |
| Bloom level | create |
| Estimated hours | 8 |
| Mastery threshold | 0.75 |
| MAMR | 4/5 |
| Prerequisites | math.found.proof-by-induction, math.nt.divisibility |
| Cross-links | — |
| Unlocks | — |

## Component 1 — Learning Objective
The student constructs complete inductive proofs (base case + inductive step) for number-theoretic divisibility claims (e.g., n(n²−1) is divisible by 6 for all n∈ℕ); selects between weak induction (P(n)→P(n+1)) and strong induction (P(1)∧…∧P(n)→P(n+1)) based on what the inductive step requires; proves sum and product formulas using induction; applies induction to prove properties of prime factorisation and divisibility; and identifies when an inductive proof fails because the inductive step implicitly uses a stronger hypothesis.

## Component 2 — CPA Entry Stage
**C — Concrete** (build triangle staircase: 1+2+…+n blocks form a triangular arrangement of (n+1)n/2 total blocks; adding row n+1 (with n+1 new blocks) visually extends the triangle — this IS the inductive step made spatial; the formula 1+2+…+(n+1)=n(n+1)/2+(n+1)=(n+1)(n+2)/2 corresponds to the picture)

## Component 3 — Misconception Register

| ID | Label | Pattern | Birth type |
|---|---|---|---|
| MC-1 | INDUCTION-ONLY-PROVES-FINITELY-MANY-CASES | Student believes induction proves the statement "for many values of n" but not "for ALL n"; asks "but what about n=1000 — did induction really cover that?" | Type 3 — language contamination ("mathematical induction" sounds similar to "inductive reasoning" (inferring from examples), which IS fallible; students map the meaning of empirical induction onto the deductive structure of mathematical induction) |
| MC-2 | BASE-CASE-SCOPE-DETERMINES-PROVEN-RANGE | Student believes proving P(1) and P(n)→P(n+1) only proves P(1),P(2),…,P(N) for some finite N, not P(n) for all n≥1; alternatively, believes proving P(3) and P(n)→P(n+1) proves P(n) for all n (including n<3) | Type 1 — overgeneralization (students don't trace the "chain reaction" structure: P(1) triggers P(2) triggers P(3)… which never terminates — it reaches every n) |
| MC-3 | STRONG-INDUCTION-IS-STRICTLY-STRONGER-THAN-WEAK | Student believes strong induction can prove statements that weak induction cannot; treats them as genuinely different proof powers rather than equivalent strategies | Type 3 — language contamination (the word "strong" implies greater power; students don't recognise that any theorem provable by strong induction has an equivalent weak-induction proof, possibly with a modified statement) |

## Component 4 — Session TA Cap
**Cap = 10** (hrs = 8 → cap 10)

## Component 5 — Teaching Action Sequence

### A01 — P11 REPRESENTATION SHIFT (open)
**Four ways to view an inductive proof:**

| Representation | Content |
|---|---|
| Chain reaction | P(1) true; P(n)→P(n+1); so P(1)→P(2)→P(3)→… reaches every positive integer |
| Domino analogy | Dominos in a line, each knocking the next; FIRST domino falls + EACH knocking the next = ALL fall |
| Well-ordering | If S={n : P(n) is false} is non-empty, let m be its minimum. P(m−1) must be true (m≥2), but then P(m−1)→P(m) gives P(m) true — contradiction. So S=∅. |
| Recursive definition | The natural numbers are inductively defined: 0 is a natural number; if n is a natural number, so is n+1. Induction matches this structure exactly. |

**Standard template for divisibility proofs:**

**Example: prove 3|(n³−n) for all n≥1.**

Base case (n=1): 1³−1=0=3×0. ✓

Inductive step: Assume 3|(k³−k) for some k≥1. Show 3|((k+1)³−(k+1)).

(k+1)³−(k+1) = k³+3k²+3k+1−k−1 = (k³−k)+3k²+3k = (k³−k)+3k(k+1)

By assumption, 3|(k³−k). Clearly 3|3k(k+1). So 3 divides their sum. ✓

Alternatively: k³−k=k(k−1)(k+1) — product of three consecutive integers, always divisible by 6 (contains a multiple of 2 and a multiple of 3). But the inductive proof works without this factorisation insight.

**P49 checkpoint:**
- CORRECT → "Induction: base case establishes P(n₀); inductive step P(n)→P(n+1) chains from n₀ to every n≥n₀. Divisibility induction: expand P(n+1) in terms of P(n) to isolate the difference, which is always divisible by the target." → A02
- PARTIAL (skips base case or treats it as trivial verification only) → "The base case is NOT optional or a formality. Without it the chain has no starting link. The statement 'n³−n is divisible by 3' would have no proven base — the inductive step alone would only show 'IF it holds for some k, THEN it holds for k+1', which is vacuously true but proves nothing if no k is established." → TB-R01 → A02
- INCORRECT → TB-R01 → A02
- NO_RESPONSE → "What is the base case for proving P(n): 4|(n⁴−n²)? Verify it. Then compute P(2): does 4|(16−4)=12? Is 4|12?" → TB-R01 → A02

### A02 — P04 PATTERN INDUCTION
**Strong vs. weak induction — when to choose:**

**Strong induction template:**
Assume P(1),P(2),…,P(n) all hold; prove P(n+1).

**When to use strong induction:** when the inductive step for P(n+1) needs to use P(k) for some k<n, not just P(n).

**Classic example — Every integer n≥2 has a prime factorisation:**

Base case (n=2): 2 is prime. ✓

Inductive step: Assume every integer from 2 to n has a prime factorisation. Consider n+1:
- If n+1 is prime, we're done (it IS a prime factorisation with one factor).
- If n+1 is composite, then n+1=ab with 2≤a,b<n+1. By the strong induction hypothesis, both a and b have prime factorisations. Concatenating them gives a prime factorisation of n+1. ✓

Why weak induction fails here: the step needs to use P(a) and P(b) where a,b can be anywhere from 2 to n — not just P(n). Weak induction (which only gives P(n) in the hypothesis) would not supply P(a) and P(b).

**Further applications:**

| Claim | Induction type | Key divisibility insight |
|---|---|---|
| n!≥2^(n−1) for n≥1 | Weak | (n+1)!=(n+1)·n!≥(n+1)·2^(n−1)≥2·2^(n−1)=2^n |
| 2n+1≤2^n for n≥3 | Weak | Check base n=3; step: 2(n+1)+1=2n+3≤2n+2n=2·2n=2^(n+1) for n≥3 |
| Fibonacci F_n<2^n | Strong | F_(n+1)=F_n+F_(n-1)<2^n+2^(n-1)<2^n+2^n=2^(n+1) |
| Every n≥2 has a prime factor | Strong | If n is composite, n=ab with a<n; by IH a has a prime factor, which also divides n |

**P49 checkpoint:**
- CORRECT → "Strong induction: IH = P holds for ALL k≤n. Use when step needs more than just the previous case. Weak and strong induction are logically equivalent (same theorems provable)." → A03
- PARTIAL (uses strong induction but can't construct the step) → Walk through the Fibonacci example step by step → TB-R02 → A03
- INCORRECT → TB-R02 → A03
- NO_RESPONSE → "To prove 'every postage ≥8 cents can be made with 3-cent and 5-cent stamps', you need cases n=8,9 as base and then use n−3 (if n−3≥8) in the inductive step. Why does this require strong induction?" → TB-R02 → A03

### A03 — P41 MISCONCEPTION DETECTOR + P64 MC-1 gate
**Finite-vs-infinite gate:**

**Gate question (MC-1):** "A student says: 'Induction proves the statement for n=1,2,3,…up to some large N but not literally for ALL n, since we can't check infinitely many cases.' Evaluate this objection."

The objection confuses empirical induction (which does enumerate cases) with mathematical induction (a deductive proof). The argument is: (1) P(1) is true (verified). (2) For ANY k∈ℕ, IF P(k) is true THEN P(k+1) is true (proven deductively). Together, these two premises force P(n) for ALL n∈ℕ without checking each case. The logic: suppose P(N) were false for some specific N. Then there's a smallest such N>1. But then P(N−1) is true, and by (2), P(N) is true — contradiction. So no false N exists. This is a proof by contradiction that handles all n at once, not a case-by-case enumeration.

**P49 checkpoint:**
- CORRECT → "Mathematical induction is a deductive proof, not empirical enumeration. The two premises together imply ALL cases without listing them." → Gate (P91)
- PARTIAL → TB-R03 → Gate
- INCORRECT → TB-R03 → Gate
- NO_RESPONSE → "If I've proven P(1) and P(n)→P(n+1) for all n, is P(1000000) proven? Walk me through why." → TB-R03 → Gate

## Component 6 — Protocol B Repair Chains

**TB-R01 (MC-2 BASE-CASE-SCOPE-DETERMINES-PROVEN-RANGE):**
Step 1 — "The base case ANCHORS the chain. If base case is P(1) and the inductive step is P(n)→P(n+1), then the chain reaches: P(1)→P(2), P(2)→P(3), P(3)→P(4), … — every integer ≥1. The chain is infinite but each step is triggered by the previous one." Step 2 — "If you prove P(3) but not P(1) and P(2), then the chain starts at 3: P(3)→P(4)→P(5)→… only reaches n≥3. P(1) and P(2) are NOT proven." Step 3 — "If you want to prove P(n) for n≥5, set your base case at n=5. The inductive step P(k)→P(k+1) then chains from 5 onwards, proving P(5),P(6),… — exactly what you claimed."

**TB-R02 (MC-1 INDUCTION-ONLY-PROVES-FINITELY-MANY-CASES via second context):**
Step 1 — "Trace the chain: P(1) true (proven). Apply the implication: P(1)→P(2) (by the inductive step with n=1), so P(2) is true. Apply again: P(2)→P(3), so P(3) is true. This process never stops — for ANY specific n, we can reach P(n) in n−1 steps." Step 2 — "The formal justification is the well-ordering principle: if any P(n) were false, there would be a smallest such n. But then P(n−1) is true, and the inductive step gives P(n) true — contradiction." Step 3 — "This is not 'checking all cases' — it's a FINITE proof (two statements: base case + inductive step) that implies an INFINITE conclusion. All of pure mathematics works this way."

**TB-R03 (MC-3 STRONG-INDUCTION-IS-STRICTLY-STRONGER-THAN-WEAK):**
Step 1 — "Strong induction and weak induction prove exactly the same set of theorems. Any proof by strong induction can be converted to weak induction by redefining Q(n) = P(1)∧P(2)∧…∧P(n) and proving Q(n) by weak induction. The 'strength' refers to having a richer hypothesis to work with in one step, not to proving more theorems overall." Step 2 — "Why use strong induction then? Because the modified Q(n) proof is clunkier to write. Strong induction is a notational convenience that makes proofs cleaner when you need earlier cases." Step 3 — "Choose weak induction when you only need P(n) to prove P(n+1). Choose strong induction when you need P(k) for some k<n in your proof of P(n+1). The choice is about proof elegance, not logical power."

## Component 7 — P91 Mastery Gate Sequence

**P77 — Problem Set (4 items):**
1. Prove by induction: for all n≥1, 6|(n³−n). (Note: this is different from 3|(n³−n); the divisor is 6.)
2. Prove by strong induction: every integer n≥2 can be written as a product of prime numbers (possibly just one prime). This is the existence part of the Fundamental Theorem of Arithmetic.
3. Prove: for all n≥1, 1³+2³+…+n³ = [n(n+1)/2]². (The sum of cubes equals the square of the sum of first n integers.)
4. A frog climbs a staircase of n steps, jumping either 1 or 2 steps at a time. Let f(n) = the number of ways to climb n steps. Find a recurrence for f(n) and prove by strong induction that f(n)=F_{n+1} (the (n+1)th Fibonacci number).

**P55 — Reflect & Consolidate:** "Divisibility proofs: expand P(n+1) to isolate P(n)+divisible-remainder. Weak induction: use P(n) to prove P(n+1). Strong induction: use all P(1)…P(n) — necessary when the step needs non-adjacent earlier cases. Induction proves universal statements (for ALL n≥n₀), not empirical patterns."

**P76 — Transfer Probe (Independence mode):**
(a) Prove: for all n≥1, 2^n > n. (b) Prove by induction: for n≥1, ∑_{k=1}^{n} k·k! = (n+1)!−1. (c) A sequence is defined by a₁=1, a₂=3, aₙ=aₙ₋₁+2aₙ₋₂ for n≥3. Prove by strong induction that aₙ=2ⁿ+(−1)ⁿ for all n≥1. (d) Prove: if p is prime and p|(a₁a₂…aₖ), then p|aᵢ for some i. (Use strong induction on k.)

**P55 — Reflect & Consolidate:** "The prime divisibility property (part d) is the key lemma making unique prime factorisation work: if p divides a product, it divides one factor. The induction on k chains: p|a₁a₂…aₖ = (a₁…aₖ₋₁)·aₖ. Since p is prime, p|(a₁…aₖ₋₁) or p|aₖ. The first case gives the inductive hypothesis (the product has k−1 factors)."

**P75 — Mastery Assessment:**
"(a) Prove: n²+n is even for all n≥1. (b) Prove: for all n≥0, 4|(5ⁿ−1). (c) Prove by strong induction: every positive integer can be represented in binary (as a sum of distinct powers of 2). (d) Find the flaw in the following 'proof' that all horses are the same colour: Base case: trivially, a set of 1 horse has all horses the same colour. Inductive step: given n+1 horses, remove horse A to get n horses (all same colour by IH); add A back and remove horse B — n horses (all same colour by IH). So all n+1 horses are same colour. [This is a classic fallacy.]"

**P55 — Reflect & Consolidate:** "The 'all horses' proof fails at the transition from n=1 to n=2: removing horse A gives {B} (one colour), removing B gives {A} (one colour), but the two singleton sets don't overlap — so you can't conclude A and B are the same colour. The inductive step requires the n horses and the n+1 horses to share at least one element, which fails when n=1 (two sets {A} and {B} with no common element)."

**P74 — Routing Decision:**
- Score ≥ 4/5 → MASTERED; math.nt.induction-applications complete
- Score 3/5 → REVIEW the inductive step construction for divisibility; replay A01
- Score ≤ 2/5 → PREREQUISITE GAP in math.found.proof-by-induction; reassign

**P78 — Completion:** Induction Applications certified. Student constructs complete weak- and strong-induction proofs for divisibility, summation, and factorisation claims; distinguishes base case scope from proven range; explains why mathematical induction is a deductive proof covering all n; identifies classic induction fallacies.

## Component 8 — P76 Transfer Probe Detail
**Mode: Independence** (cross_links = [])
Target: Telescoping sums; second-order recurrences; prime-divisibility lemma by induction on factor count; binary representation
Skill tested: Apply strong induction to non-adjacent recurrences; prove structural number theory by induction

## Component 10 — Version History
| Version | Date | Note |
|---|---|---|
| 1.0 | 2026-07-30 | Initial authoring |
