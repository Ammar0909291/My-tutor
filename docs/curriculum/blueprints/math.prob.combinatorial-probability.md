## Section 0 — Concept Metadata

| Field             | Value                                 |
|-------------------|---------------------------------------|
| **Blueprint ID:** | math.prob.combinatorial-probability   |
| **Name:**         | Combinatorial Probability             |
| **Domain:**       | Probability                           |
| **Subject:**      | Mathematics                           |
| **Status:**       | PACKAGE_READY                         |
| **Date:**         | 2026-07-13                            |
| **Framework:**    | v2.0                                  |
| **Difficulty:**   | developing                            |
| **Bloom:**        | apply                                 |
| **Mastery:**      | 0.85                                  |
| **Est. Hours:**   | 5                                     |
| **Session Cap:**  | 5                                     |

---

## Section 1 — Concept Spine

**One-sentence definition:** Combinatorial probability computes P(A) = |A|/|Ω| for equally-likely sample spaces by using permutations, combinations, and the multiplication/addition principles to count |A| and |Ω| without listing every outcome.

**Why it matters:** Many real-world probability calculations (poker hands, lottery odds, quality-control sampling, genetics) involve sample spaces too large to enumerate; combinatorial counting converts those counting problems into tractable formulas.

| Tool                   | Formula                          | When to use                                         |
|------------------------|----------------------------------|-----------------------------------------------------|
| Multiplication rule    | n₁ × n₂ × … × nₖ                | Sequence of k independent choices                   |
| Permutations P(n, r)   | n! / (n−r)!                      | r items chosen from n, order matters                |
| Combinations C(n, r)   | n! / (r!(n−r)!)                  | r items chosen from n, order doesn't matter         |
| Classical probability  | P(A) = \|A\| / \|Ω\|            | After counting via the tools above                  |

---

## Section 2 — Prerequisite Map

- **math.prob.classical-probability** — P(A) = |A|/|Ω| is the formula being applied.
- **math.disc.permutations** — P(n,r) and the multiplication principle.
- **math.disc.combinations** — C(n,r) (binomial coefficient).

---

## Section 3 — Learning Objectives

By the end of this concept the learner will be able to:
1. Identify whether a counting problem requires permutations or combinations.
2. Compute |Ω| and |A| using the multiplication rule, P(n,r), or C(n,r).
3. Apply P(A) = |A|/|Ω| after completing the combinatorial count.
4. Solve classic setups: poker hands, committee selection, sampling with/without replacement.
5. Use complementary counting: P(A) = 1 − P(Aᶜ) when counting Aᶜ is easier.

---

## Section 4 — Misconception Library

### MC-1: "Order always matters when picking items."

**Probe question:** Five people apply for 3 identical seats on a committee. How many ways can the committee be formed?

**Characteristic phrase:** "I use 5 × 4 × 3 = 60 because who we pick first matters."

**Bridge:** The committee has *identical* seats — "Alice, Bob, Carol" and "Carol, Alice, Bob" form the same committee. Only combinations apply: C(5,3) = 10. The multiplication rule and P(n,r) count ordered sequences; C(n,r) counts unordered groups. The question to ask first: "Does order change the outcome?" If not, use C(n,r).

**Replacement concept:** Permutations → when order matters (passwords, ranked prizes, arrangements). Combinations → when order doesn't matter (committees, hands, samples). This decision is the first step in every combinatorial probability problem.

---

### MC-2: "I can always compute |Ω| and |A| separately without thinking about whether they use the same counting logic."

**Probe question:** A 5-card hand is dealt from 52 cards. What is P(all 5 are hearts)?

**Characteristic phrase:** "Total outcomes = 52 × 51 × 50 × 49 × 48 (ordered), favorable = 13 × 12 × 11 × 10 × 9 (ordered). So P = (13×12×11×10×9)/(52×51×50×49×48)."

**Bridge:** The formula is valid — but only because both numerator and denominator use the same counting model (ordered sequences). If Ω is counted using *unordered* combinations [C(52,5) = 2,598,960], then |A| must also use unordered combinations [C(13,5) = 1,287]. Mixing ordered for one and unordered for the other gives a wrong answer. Decide on one model (ordered or unordered) and apply it consistently.

**Replacement concept:** |Ω| and |A| must be counted using the same framework (both ordered or both unordered). In practice: choose unordered combinations for "hand" or "sample" problems (cards, balls), ordered permutations for "arrangement" or "sequence" problems.

---

### MC-3: "Complementary counting is just harder — always count the event directly."

**Probe question:** In a group of 10 people, what is P(at least 2 share a birthday) over 365 days?

**Characteristic phrase:** "I'll add up P(exactly 2) + P(exactly 3) + … — it's more thorough."

**Bridge:** Counting "at least 2 share a birthday" directly requires summing over many cases. Counting the complement "no two share a birthday" is one clean formula: P(all different) = (365 × 364 × … × 356)/365¹⁰. Then P(at least 2 share) = 1 − P(all different). Complementary counting is a *strategy* that dramatically simplifies many "at least one / at least two" problems — it is often far easier, not harder.

**Replacement concept:** When the event is "at least one …" or "at least k …", consider computing 1 − P(complement). Count the complement first; if it's simpler, use it.

---

## Section 5 — Explanation Library

### Explanation 1 — The order-matters decision tree

Step 1: Is the sample space finite and equally likely? (If not, classical formula doesn't apply.)
Step 2: Does the selection produce a *sequence* (order matters) or a *set* (order doesn't matter)?
- Sequence → use P(n,r) = n!/(n−r)! for selections without repetition, or nʳ for with repetition.
- Set → use C(n,r) = n!/(r!(n−r)!) for selections without repetition.

Step 3: Compute |Ω| using Step 2 logic. Repeat for |A|. Compute P(A) = |A|/|Ω|.

Both |A| and |Ω| must use the *same* logic from Step 2.

---

### Explanation 2 — Classic poker-hand example

52-card deck, 5-card hand. Since cards in a hand are unordered:
|Ω| = C(52,5) = 2,598,960.

*Probability of a flush (all 5 cards same suit):*
Choose suit: 4 ways. Choose 5 cards from 13 in that suit: C(13,5) = 1,287.
|A| = 4 × 1,287 = 5,148.
P(flush) = 5,148 / 2,598,960 ≈ 0.00198 (about 1 in 505).

*Probability of at least one ace:*
Complement: no aces. Choose 5 from 48 non-ace cards: C(48,5) = 1,712,304.
P(at least one ace) = 1 − 1,712,304/2,598,960 ≈ 0.341.

---

### Explanation 3 — Sampling with vs. without replacement

When sampling k items from n:
- **Without replacement:** each item removed before next selection. |Ω| = P(n,k) if ordered, C(n,k) if unordered.
- **With replacement:** item returned before next draw. |Ω| = nᵏ (ordered), or C(n+k−1, k) unordered (multiset).

Most "draw from an urn" problems are without replacement unless stated otherwise. The distinction significantly changes both |Ω| and |A|.

---

## Section 6 — Analogy Library

**The wardrobe analogy:** Choosing an outfit (ordered: shirt first, then pants) uses multiplication (permutation-style). Choosing team members for a project (unordered group) uses combinations. The "outfit" and "team" framings always reveal which tool to pick.

---

## Section 7 — Demonstration Library

**Demo 1 — Committee vs. officer selection (same numbers, different formulas):**
n = 8 people. Problem A: "Choose a president, VP, and treasurer." → ordered → P(8,3) = 336. Problem B: "Choose a 3-person committee." → unordered → C(8,3) = 56. Same n, same r, drastically different answers. Walk through why: the 336 ordered selections collapse into 336/6 = 56 unordered groups (because 3! = 6 orderings per group).

---

## Section 8 — Discovery Lessons

**Discovery 1 — The birthday paradox opening:**
Ask the learner to guess P(at least 2 people in a group of 23 share a birthday). Most guess around 5–10%. Compute via complementary counting: P(all different) ≈ 0.493, so P(at least one match) ≈ 0.507. Result (>50%) surprises learners, motivating the power of systematic combinatorial counting over intuition.

---

## Section 9 — Teaching Actions

- Learner uses permutations for an unordered selection → trigger MC-1 bridge + Demo 1.
- Learner mixes ordered and unordered counting → trigger MC-2 bridge.
- Learner tries to enumerate "at least k" cases directly → trigger MC-3 bridge + Explanation 3 complement strategy.
- Learner is ready for harder problems → bridge to poker-hand Explanation 2.

---

## Section 10 — Voice Teaching Script

"Classical probability says P(A) = favorable outcomes over total outcomes. Combinatorial probability is about counting those numbers efficiently. The first decision is always: does order matter? If I'm ranking three finalists, yes — first, second, third are different positions. If I'm picking a committee, no — the same three people make the same committee regardless of who was named first. That one decision tells you whether to use permutations or combinations. Once you've chosen, apply it consistently to both the favorable count and the total count."

---

## Section 11 — Assessment Items

**Q1 (recall):** When do you use C(n,r) instead of P(n,r)?
*Answer:* C(n,r) when order of selection does not matter (unordered subsets); P(n,r) when order matters (ordered arrangements).

**Q2 (application):** A committee of 4 is chosen from 9 candidates. What is P(a specific person is included)?
*Answer:* |Ω| = C(9,4) = 126. |A| = C(8,3) = 56 (fix that person, choose 3 of remaining 8). P = 56/126 = 4/9.

**Q3 (synthesis):** 5 cards from a standard 52-card deck. What is P(exactly two aces)?
*Answer:* |Ω| = C(52,5) = 2,598,960. |A| = C(4,2) × C(48,3) = 6 × 17,296 = 103,776. P = 103,776/2,598,960 ≈ 0.0399.

---

## Section 12 — Recovery Notes

Learners who mix P(n,r) and C(n,r) almost always recover after Demo 1 (committee vs. officers with same n and r). The factor of r! = 6 difference makes the error concrete and memorable.

---

## Section 13 — Memory & Review

**Spaced-repetition cue:** "What is the first question you ask before computing a combinatorial probability?"

**One-week review hook:** Give a new problem requiring complementary counting and ask the learner to identify why direct counting is harder before computing via the complement.

---

## Section 14 — Transfer Map

- → **math.prob.conditional-probability** (conditional counting: restrict Ω to B, then count A ∩ B)
- → **math.prob.discrete-distributions** (binomial distribution directly uses C(n,r))
- → **math.prob.discrete-distributions** (hypergeometric distribution = combinatorial sampling without replacement)

---

## Section 15 — Curriculum Feedback

Discovery 1 (birthday paradox) is high-engagement and should be used early; it motivates both the complementary counting strategy and the power of mathematical reasoning over intuition. Ensure learners from math.disc.combinations have seen C(n,r) before this blueprint.

*PACKAGE_READY. V-1 through V-20 PASS. AI Removal Test PASS.*
