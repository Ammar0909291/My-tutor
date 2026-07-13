## Section 0 — Concept Metadata

| Field             | Value                          |
|-------------------|--------------------------------|
| **Blueprint ID:** | math.prob.probability-axioms   |
| **Name:**         | Axioms of Probability          |
| **Domain:**       | Probability                    |
| **Subject:**      | Mathematics                    |
| **Status:**       | PACKAGE_READY                  |
| **Date:**         | 2026-07-13                     |
| **Framework:**    | v2.0                           |
| **Difficulty:**   | developing                     |
| **Bloom:**        | understand                     |
| **Mastery:**      | 0.90                           |
| **Est. Hours:**   | 3                              |
| **Session Cap:**  | 4                              |

---

## Section 1 — Concept Spine

**One-sentence definition:** Kolmogorov's three axioms — non-negativity, normalization, and countable additivity — are the minimal rules from which all of probability theory is logically derived.

**Why it matters:** The axioms convert intuitive "chance" into a mathematical system: every probability formula, theorem, and inequality follows from these three rules alone, ensuring that any model labelled "probabilistic" is internally consistent.

| Axiom | Statement                                                                                        |
|-------|--------------------------------------------------------------------------------------------------|
| A1    | P(A) ≥ 0 for every event A                                                                       |
| A2    | P(Ω) = 1                                                                                         |
| A3    | If A₁, A₂, … are pairwise disjoint, then P(⋃ Aᵢ) = Σ P(Aᵢ) (countable additivity)            |

---

## Section 2 — Prerequisite Map

- **math.prob.probability-measure** — the axioms define what a probability measure must satisfy.

---

## Section 3 — Learning Objectives

By the end of this concept the learner will be able to:
1. State the three Kolmogorov axioms precisely.
2. Derive key consequences: P(∅) = 0, P(Aᶜ) = 1 − P(A), monotonicity, inclusion-exclusion.
3. Prove that classical and frequentist assignments satisfy all three axioms.
4. Identify which axiom is violated when a proposed probability assignment fails.

---

## Section 4 — Misconception Library

### MC-1: "The axioms are just definitions — they don't prove anything."

**Probe question:** Can you derive P(Aᶜ) = 1 − P(A) from the axioms alone, without additional assumptions?

**Characteristic phrase:** "We just define the complement rule separately."

**Bridge:** The complement rule is a *theorem*, not an axiom. Proof from axioms: A and Aᶜ are disjoint and A ∪ Aᶜ = Ω, so by A3 and A2, P(A) + P(Aᶜ) = P(Ω) = 1, therefore P(Aᶜ) = 1 − P(A). Every standard rule follows in this way. The axioms generate the full theory.

**Replacement concept:** The axioms are not definitions of specific probabilities — they are constraints on any function claiming to be a probability measure. All probability theorems are logical consequences of A1, A2, A3.

---

### MC-2: "Axiom A3 requires exactly two disjoint events."

**Probe question:** You have four mutually disjoint events A₁, A₂, A₃, A₄. Can you apply A3?

**Characteristic phrase:** "A3 is for A∪B, so I'd need to apply it twice for three events."

**Bridge:** A3 is stated for *countably many* pairwise disjoint events — any finite n or countably infinite sequence. For finite n, this is called *finite additivity*. Applying A3 to {A₁, A₂, A₃, A₄} directly gives P(A₁ ∪ A₂ ∪ A₃ ∪ A₄) = P(A₁) + P(A₂) + P(A₃) + P(A₄) in a single step. The two-event version is a special case.

**Replacement concept:** Countable additivity is the general form. Finite additivity (any fixed n disjoint events) is the most-used special case in introductory probability.

---

### MC-3: "P(A ∪ B) = P(A) + P(B) always."

**Probe question:** P(roll even) = 1/2, P(roll > 3) = 1/2. Is P(roll even or > 3) = 1?

**Characteristic phrase:** "Just add the two probabilities."

**Bridge:** A3 applies only when A and B are *disjoint* (A ∩ B = ∅). "Even" = {2,4,6} and "> 3" = {4,5,6} share elements {4,6}, so they are not disjoint. Naively adding gives 1, but P({2,4,5,6}) = 4/6 ≠ 1. The correct formula for non-disjoint events is inclusion-exclusion: P(A ∪ B) = P(A) + P(B) − P(A ∩ B) = 1/2 + 1/2 − 2/6 = 4/6.

**Replacement concept:** Additivity (A3) applies only to disjoint events. For overlapping events, use inclusion-exclusion: P(A ∪ B) = P(A) + P(B) − P(A ∩ B), which is itself derived from A3 by partitioning A ∪ B into disjoint pieces.

---

## Section 5 — Explanation Library

### Explanation 1 — Deriving four theorems from three axioms

Starting from A1, A2, A3:

**Theorem 1: P(∅) = 0.**
Ω and ∅ are disjoint and Ω ∪ ∅ = Ω. By A3: P(Ω) + P(∅) = P(Ω). By A2: P(∅) = 0.

**Theorem 2: P(Aᶜ) = 1 − P(A).**
A and Aᶜ are disjoint; A ∪ Aᶜ = Ω. By A3 + A2: P(A) + P(Aᶜ) = 1.

**Theorem 3: Monotonicity. If A ⊆ B then P(A) ≤ P(B).**
Write B = A ∪ (B \ A) (disjoint). By A3: P(B) = P(A) + P(B \ A) ≥ P(A) by A1.

**Theorem 4: P(A) ≤ 1.**
A ⊆ Ω, so by Theorem 3 and A2: P(A) ≤ P(Ω) = 1.

Four key results, zero new assumptions.

---

### Explanation 2 — Inclusion-exclusion for two events

For any two events A and B (not necessarily disjoint):
P(A ∪ B) = P(A) + P(B) − P(A ∩ B).

*Proof:* Partition A ∪ B into three disjoint pieces: A \ B, B \ A, A ∩ B.
P(A ∪ B) = P(A \ B) + P(B \ A) + P(A ∩ B).
Also P(A) = P(A \ B) + P(A ∩ B) and P(B) = P(B \ A) + P(A ∩ B).
Adding: P(A) + P(B) = P(A \ B) + P(B \ A) + 2P(A ∩ B) = P(A ∪ B) + P(A ∩ B).
Rearrange: P(A ∪ B) = P(A) + P(B) − P(A ∩ B).

---

### Explanation 3 — Why countable additivity, not just finite?

Finite additivity suffices for finite Ω. For infinite Ω (e.g., Ω = ℕ), consider A = "first head on flip n" for n = 1, 2, 3, … These events are disjoint and their union is the certain event Ω. Finite additivity alone cannot handle an infinite union in one step; countable additivity makes this rigorous and yields P(Ω) = Σ P(Aₙ) = Σ (1/2)ⁿ = 1, consistent with A2.

---

## Section 6 — Analogy Library

**The Constitution analogy:** The three axioms are like a constitutional charter — a minimal set of rules from which all specific laws (theorems) are derived. No law may contradict the charter. The charter doesn't tell you *which* probabilities to assign; it tells you the rules any valid assignment must obey.

---

## Section 7 — Demonstration Library

**Demo 1 — Axiom-violation diagnosis:**
Present five proposed probability assignments for Ω = {a, b, c}. For each, name which axiom is violated (or confirm validity). Include: negative value (A1), sum ≠ 1 (A2), disjoint union inconsistency (A3), and two valid examples. Go through each axiom check explicitly.

---

## Section 8 — Discovery Lessons

**Discovery 1 — Building the complement rule:**
Ask the learner: "If A and Aᶜ cannot both happen and together they cover everything, what does P(A) + P(Aᶜ) equal?" They answer 1 (from everyday logic). Then show that axioms A2 and A3 already guarantee this — the intuition and the axiom-derived theorem agree.

---

## Section 9 — Teaching Actions

- Learner treats axioms as definitions only, not generators of theorems → trigger MC-1 bridge + Explanation 1.
- Learner restricts A3 to two events → trigger MC-2 bridge.
- Learner adds probabilities of non-disjoint events → trigger MC-3 bridge + Explanation 2.
- Learner asks why "countable" and not "uncountable" additivity → deliver Explanation 3.

---

## Section 10 — Voice Teaching Script

"Three rules. First: probabilities are never negative. Second: something in Ω always happens, so P of the whole space is 1. Third: if two events can't both happen, the probability of at least one of them happening equals the sum of their individual probabilities. That's it — those three rules are enough to prove everything else. P of the complement, P of a union, even inequalities like Boole's inequality — all theorems, all derivable from just these three axioms."

---

## Section 11 — Assessment Items

**Q1 (recall):** State all three Kolmogorov axioms using formal notation.
*Answer:* A1: P(A) ≥ 0; A2: P(Ω) = 1; A3: for pairwise disjoint Aᵢ, P(⋃ Aᵢ) = Σ P(Aᵢ).

**Q2 (application):** P(A) = 0.3, P(B) = 0.5, P(A ∩ B) = 0.1. Compute P(A ∪ B).
*Answer:* P(A ∪ B) = 0.3 + 0.5 − 0.1 = 0.7

**Q3 (proof):** Prove monotonicity: if A ⊆ B then P(A) ≤ P(B).
*Answer:* B = A ∪ (B \ A) (disjoint since A ∩ (B \ A) = ∅). By A3: P(B) = P(A) + P(B \ A). By A1: P(B \ A) ≥ 0. Therefore P(B) ≥ P(A).

---

## Section 12 — Recovery Notes

Learners who add non-disjoint probabilities recover quickly when they draw a Venn diagram and see the overlap region being counted twice. The inclusion-exclusion formula emerges naturally from the diagram.

---

## Section 13 — Memory & Review

**Spaced-repetition cue:** "Which theorem derived from the axioms says P(A) can never exceed 1?"

**One-week review hook:** Ask the learner to prove Boole's inequality P(A₁ ∪ … ∪ Aₙ) ≤ Σ P(Aᵢ) using A3 and the complement rule.

---

## Section 14 — Transfer Map

- → **math.prob.classical-probability** (uniform measure satisfies all three axioms)
- → **math.prob.conditional-probability** (P(A|B) defined to preserve A3)
- → **math.prob.chebyshev** (Markov's inequality derived from monotonicity + expectation)
- → **math.prob.lln** (requires countable additivity over infinite sequences)

---

## Section 15 — Curriculum Feedback

Infinite countable additivity (Explanation 3) is background enrichment; it need not be assessed unless the learner is headed toward measure-theoretic probability. For standard introductory courses, finite additivity is the operative form.

*PACKAGE_READY. V-1 through V-20 PASS. AI Removal Test PASS.*
