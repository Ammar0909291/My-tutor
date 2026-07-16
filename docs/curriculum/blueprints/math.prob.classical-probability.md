## Section 0 — Concept Metadata

| Field             | Value                            |
|-------------------|----------------------------------|
| **Blueprint ID:** | math.prob.classical-probability  |
| **Name:**         | Classical Probability            |
| **Domain:**       | Probability                      |
| **Subject:**      | Mathematics                      |
| **Status:**       | PACKAGE_READY                    |
| **Date:**         | 2026-07-13                       |
| **Framework:**    | v2.0                             |
| **Difficulty:**   | developing                       |
| **Bloom:**        | apply                            |
| **Mastery:**      | 0.90                             |
| **Est. Hours:**   | 3                                |
| **Session Cap:**  | 4                                |

---

## Section 1 — Concept Spine

**One-sentence definition:** When all outcomes of a finite sample space are equally likely, the probability of an event A equals the number of outcomes in A divided by the total number of outcomes: P(A) = |A| / |Ω|.

**Why it matters:** Classical probability turns probability questions into counting problems, enabling exact calculation without data collection; it underpins card games, dice experiments, lotteries, and the entire classical combinatorial tradition.

| Quantity / Symbol | Meaning                                          | Typical Units / Range |
|-------------------|--------------------------------------------------|-----------------------|
| \|Ω\|             | Total number of equally-likely outcomes          | ℕ (positive integer)  |
| \|A\|             | Number of outcomes in event A (favorable)        | {0, 1, …, \|Ω\|}     |
| P(A)              | Classical probability of A                      | [0, 1]                |
| P(A) = \|A\|/\|Ω\| | The classical formula                         | —                     |

---

## Section 2 — Prerequisite Map

- **math.prob.probability-axioms** — classical probability is a special measure that satisfies all three axioms.
- **math.disc.counting-principles** — computing |A| and |Ω| requires systematic counting.

---

## Section 3 — Learning Objectives

By the end of this concept the learner will be able to:
1. State the equally-likely assumption and verify when it is appropriate.
2. Apply P(A) = |A| / |Ω| to compute probabilities for standard experiments (coins, dice, cards).
3. Verify that the classical measure satisfies the Kolmogorov axioms.
4. Identify when the equally-likely assumption fails and the classical formula does not apply.

---

## Section 4 — Misconception Library

### MC-1: "Classical probability works for any experiment — just count outcomes."

**Probe question:** A biased coin lands heads 70% of the time. I have two outcomes: {H, T}. Is P(H) = 1/2?

**Characteristic phrase:** "There are two outcomes, so it must be 50-50."

**Bridge:** The classical formula requires that outcomes be *equally likely* — not merely that they be listed. A biased coin has Ω = {H, T} but the outcomes are not equally likely. Applying |A|/|Ω| gives 1/2, which contradicts the known bias. The equally-likely assumption is a precondition, not a consequence, of the classical formula.

**Replacement concept:** Before using P(A) = |A|/|Ω|, confirm that the physical setup guarantees equal likelihood (e.g., fair die, well-shuffled deck, symmetric spinner). If the experiment is not symmetric, the classical formula does not apply.

---

### MC-2: "Favorable outcomes means outcomes I want, not outcomes where A occurs."

**Probe question:** I want to roll at least 3 on a fair die. Which outcomes are "favorable"?

**Characteristic phrase:** "Favorable just means the good ones — I want 6 so only 6 is favorable."

**Bridge:** "Favorable" is a technical term meaning "outcomes that make the event A occur." If A = "roll at least 3," then A = {3, 4, 5, 6} — all four of these outcomes satisfy A, so |A| = 4. "Favorable" has nothing to do with what the problem-solver prefers; it means membership in A.

**Replacement concept:** |A| = the number of outcomes ω ∈ Ω such that ω ∈ A. Write the event A as a set and count its elements.

---

### MC-3: "Listing more outcomes makes my probability more accurate."

**Probe question:** For a die roll, someone writes Ω = {1, 2, 3, 4, 5, 6, "any even number"}. Is |Ω| = 7?

**Characteristic phrase:** "I can make Ω bigger to get a more precise answer."

**Bridge:** Sample space elements must be *mutually exclusive* (no two occur at the same time) and *exhaustive*. "Any even number" overlaps with {2, 4, 6} already in the list, violating mutual exclusivity. Adding it doesn't add new outcomes — it double-counts. |Ω| = 7 would give nonsensical fractions. The sample space must be a proper partition of all possible trial results.

**Replacement concept:** Outcomes in Ω must be the minimal, non-overlapping building blocks. Each trial produces exactly one outcome; use that standard Ω and count subsets.

---

## Section 5 — Explanation Library

### Explanation 1 — The classical formula and its conditions

The classical probability model applies when:
1. The sample space Ω is finite: |Ω| = N for some positive integer N.
2. Each single outcome ω ∈ Ω is equally likely: P({ω}) = 1/N for all ω.

Under these conditions, for any event A:
P(A) = |A| / |Ω|.

*Verification that this satisfies the axioms:*
- A1: |A| ≥ 0 and |Ω| > 0, so P(A) ≥ 0. ✓
- A2: P(Ω) = |Ω|/|Ω| = 1. ✓
- A3: If A ∩ B = ∅, then |A ∪ B| = |A| + |B|, so P(A ∪ B) = (|A| + |B|)/|Ω| = P(A) + P(B). ✓

---

### Explanation 2 — Standard examples

| Experiment               | Ω                          | \|Ω\| | Event A              | \|A\| | P(A)   |
|--------------------------|----------------------------|--------|----------------------|--------|--------|
| One fair die             | {1,2,3,4,5,6}              | 6      | Roll even            | 3      | 1/2    |
| One fair die             | {1,2,3,4,5,6}              | 6      | Roll > 4             | 2      | 1/3    |
| Two fair coins           | {HH,HT,TH,TT}             | 4      | Exactly one head     | 2      | 1/2    |
| Draw one card (52-deck)  | all 52 cards               | 52     | Draw an ace          | 4      | 1/13   |
| Draw one card (52-deck)  | all 52 cards               | 52     | Draw a heart         | 13     | 1/4    |

The skill is always: (1) list or count Ω, (2) identify which ω belong to A, (3) divide.

---

### Explanation 3 — When classical probability fails

Classical probability fails — and must not be used — when:
- The experiment is not symmetric (biased coin, loaded die, non-uniform spinner).
- Outcomes in Ω have been constructed at different levels of granularity (mixing "HH" with "at least one head").
- The sample space is infinite and continuous (cannot assign 1/|Ω| to each point).

In these cases, probabilities must be assigned by other means: empirical relative frequencies, a given probability distribution, or an integral (for continuous cases). The classical formula is a special case, not the general definition.

---

## Section 6 — Analogy Library

**The lottery analogy:** In a fair lottery every ticket has the same chance. The probability of holding a winning ticket = (number of winning tickets you hold) ÷ (total tickets sold). Classical probability is exactly this reasoning applied to any symmetric experiment.

---

## Section 7 — Demonstration Library

**Demo 1 — Card probability with explicit counting:**
Sample space: 52 cards. Ask: "What is P(draw a red face card)?" Learner lists red face cards: {J♥, Q♥, K♥, J♦, Q♦, K♦} — 6 cards. P = 6/52 = 3/26. Walk through each step: identify Ω, count |A|, divide. Verify with complement: P(not red face card) = 1 − 3/26 = 23/26.

---

## Section 8 — Discovery Lessons

**Discovery 1 — When counting goes wrong:**
Ask for P(two dice sum to 7) with a sample space defined as Ω = {2, 3, 4, …, 12} (11 outcomes). Using classical formula naively gives P = 1/11. Then show the correct Ω of 36 ordered pairs; count the 6 pairs summing to 7; get P = 6/36 = 1/6. Lesson: the sample space must consist of equally-likely outcomes.

---

## Section 9 — Teaching Actions

- Learner applies formula to non-equally-likely experiment → trigger MC-1 bridge.
- Learner misidentifies "favorable" outcomes → trigger MC-2 bridge.
- Learner constructs a non-partition Ω → trigger MC-3 bridge.
- Learner gets negative probability → check for |A| > |Ω| error (impossible event, A ⊄ Ω).
- Learner is ready for harder counting → bridge to math.prob.combinatorial-probability.

---

## Section 10 — Voice Teaching Script

"Fair die, fair coin, well-shuffled deck — these share one property: every elementary outcome is equally likely. That symmetry is the key. When it holds, the probability of any event is just a fraction: how many outcomes are in your event, divided by how many outcomes are in total. Count the favorable, count the total, divide. The whole art of classical probability is in the counting — making sure you've listed every equally-likely outcome exactly once."

---

## Section 11 — Assessment Items

**Q1 (recall):** State the classical probability formula and its precondition.
*Answer:* P(A) = |A|/|Ω|, provided all outcomes in Ω are equally likely.

**Q2 (application):** A bag contains 3 red, 4 blue, and 5 green marbles. One is drawn at random. What is P(not green)?
*Answer:* |Ω| = 12, |not green| = 7. P = 7/12.

**Q3 (critical):** For a biased die where P(6) = 1/3 and all other faces have equal probability, what is P(roll > 4)?
*Answer:* Classical formula does not apply directly. P(5) = P(1) = P(2) = P(3) = P(4) = (1 − 1/3)/5 = 2/15. P(roll > 4) = P(5) + P(6) = 2/15 + 1/3 = 2/15 + 5/15 = 7/15.

---

## Section 12 — Recovery Notes

Learners who apply the classical formula to non-uniform experiments usually recover after seeing Discovery 1 (two-dice example) where the wrong Ω gives a wrong answer they can check against intuition.

---

## Section 13 — Memory & Review

**Spaced-repetition cue:** "What two conditions must hold before you can use P(A) = |A|/|Ω|?"

**One-week review hook:** Give a problem where the classical formula gives the wrong answer (biased die) and ask the learner to explain why and how to fix it.

---

## Section 14 — Transfer Map

- → **math.prob.combinatorial-probability** (using permutations/combinations to count |A| and |Ω|)
- → **math.prob.conditional-probability** (P(A|B) = |A ∩ B|/|B| in the classical setting)
- → **math.prob.discrete-distributions** (non-uniform discrete distributions generalize classical probability)

---

## Section 15 — Curriculum Feedback

Discovery 1 is pedagogically important: many learners use the wrong sample space for compound experiments and Discovery 1 exposes this error in a memorable way. Include it before moving to combinatorial probability.

*PACKAGE_READY. V-1 through V-20 PASS. AI Removal Test PASS.*
