## Section 0 — Concept Metadata

| Field             | Value                          |
|-------------------|--------------------------------|
| **Blueprint ID:** | math.prob.event                |
| **Name:**         | Event                          |
| **Domain:**       | Probability                    |
| **Subject:**      | Mathematics                    |
| **Status:**       | PACKAGE_READY                  |
| **Date:**         | 2026-07-13                     |
| **Framework:**    | v2.0                           |
| **Difficulty:**   | developing                     |
| **Bloom:**        | understand                     |
| **Mastery:**      | 0.90                           |
| **Est. Hours:**   | 2                              |
| **Session Cap:**  | 3                              |

---

## Section 1 — Concept Spine

**One-sentence definition:** An event is a subset A ⊆ Ω of the sample space to which a probability can be meaningfully assigned.

**Why it matters:** Events are the objects probabilities are attached to; distinguishing them from individual outcomes allows probability theory to handle everything from simple outcomes to complex combinations (unions, intersections, complements) using the language of sets.

| Quantity / Symbol | Meaning                                     | Typical Units / Range       |
|-------------------|---------------------------------------------|-----------------------------|
| A, B, C           | Events (subsets of Ω)                       | Subsets of Ω                |
| Aᶜ                | Complement of A — outcomes NOT in A         | Ω \ A                       |
| A ∪ B             | Union — outcomes in A or B (or both)        | Subset of Ω                 |
| A ∩ B             | Intersection — outcomes in both A and B     | Subset of Ω                 |
| ∅                 | Impossible event (empty set)                | P(∅) = 0                    |
| Ω                 | Certain event (entire sample space)         | P(Ω) = 1                    |

---

## Section 2 — Prerequisite Map

- **math.prob.sample-space** — events are subsets of Ω; you must know what Ω is.
- **math.found.set-theory** — set operations (union, intersection, complement) define how events combine.

---

## Section 3 — Learning Objectives

By the end of this concept the learner will be able to:
1. Define an event as a subset of the sample space.
2. Write events for English-language descriptions (e.g., "roll an even number").
3. Form complements, unions, and intersections of events and describe them in words.
4. Identify the impossible event ∅ and the certain event Ω and state their probabilities.
5. Determine whether two events are mutually exclusive (A ∩ B = ∅).

---

## Section 4 — Misconception Library

### MC-1: "An event is just one outcome."

**Probe question:** Ω = {1, 2, 3, 4, 5, 6}. Is "rolling an even number" one event or several? Write it as a set.

**Characteristic phrase:** "The event is rolling a 2, or rolling a 4, or rolling a 6 — those are three different events."

**Bridge:** "Rolling an even number" is one event: A = {2, 4, 6}. An event can contain many outcomes. What makes it a single event is that it is described by a single condition, and it corresponds to a single subset of Ω. The probability P(A) is assigned to the entire subset {2, 4, 6} at once.

**Replacement concept:** An event is any subset of Ω, however many elements it contains. Each element in the event is an outcome; the event itself is the set containing those outcomes.

---

### MC-2: "The complement of 'rolling a 6' is 'rolling a 1'."

**Probe question:** For Ω = {1,…,6}, if A = {6}, what is Aᶜ?

**Characteristic phrase:** "The opposite of 6 is 1."

**Bridge:** "Opposite" in everyday language is not the mathematical complement. The complement Aᶜ = Ω \ A contains *every* outcome in Ω that is *not* in A. So Aᶜ = {1, 2, 3, 4, 5} — five outcomes, not just one. A reliable check: A and Aᶜ must be disjoint (A ∩ Aᶜ = ∅) and their union must be Ω (A ∪ Aᶜ = Ω).

**Replacement concept:** The complement Aᶜ is everything in Ω outside A. P(Aᶜ) = 1 − P(A), which is always nonnegative because P(A) ≤ 1.

---

### MC-3: "Mutually exclusive events can happen at the same time."

**Probe question:** A = {roll an even number}, B = {roll a 3 or 5}. Can A and B both occur on one roll? Are they mutually exclusive?

**Characteristic phrase:** "They could happen together if you roll a lot."

**Bridge:** Mutually exclusive means A ∩ B = ∅ — there is no single outcome that belongs to both events simultaneously. On *one* roll of the die you observe exactly one outcome. Check: even numbers are {2, 4, 6}; {3, 5} shares no element with {2, 4, 6}. So A ∩ B = ∅ and the events are mutually exclusive — they *cannot* both occur on the same roll.

**Replacement concept:** Two events are mutually exclusive if and only if their intersection is empty. This directly implies P(A ∪ B) = P(A) + P(B), which is the additivity rule for disjoint events.

---

## Section 5 — Explanation Library

### Explanation 1 — Events as subsets

Given sample space Ω = {1, 2, 3, 4, 5, 6}, every English description of a condition on the roll corresponds to a subset of Ω. "Roll a number greater than 4" → A = {5, 6}. "Roll a prime" → B = {2, 3, 5}. "Roll a 7" → C = ∅ (impossible — 7 ∉ Ω). "Roll something" → D = Ω (certain). Once an event is written as a subset, all set operations apply: Aᶜ, A ∪ B, A ∩ B, etc.

---

### Explanation 2 — Set algebra of events in words

| Set operation    | Symbol  | In words for die roll (A = {5,6}, B = {2,3,5}) |
|------------------|---------|--------------------------------------------------|
| Complement of A  | Aᶜ      | "Did NOT roll 5 or 6" = {1,2,3,4}               |
| A union B        | A ∪ B   | "Rolled 5, 6, 2, or 3" = {2,3,5,6}              |
| A intersect B    | A ∩ B   | "Rolled 5" = {5}                                 |
| A minus B        | A \ B   | "Rolled 6 but not 5" = {6}                       |

Practising this translation (English ↔ set notation) is the core skill at this stage.

---

### Explanation 3 — Impossible and certain events

The empty set ∅ is the impossible event: it contains no outcomes, so it can never occur, and P(∅) = 0. The full sample space Ω is the certain event: at least one outcome must occur on every trial, so P(Ω) = 1. These two special events are the boundaries of the probability scale.

---

## Section 6 — Analogy Library

**The guest-list analogy:** Ω is every name that *could* appear on a guest list. An event is any sub-list satisfying some criterion (e.g., "guests who RSVP'd yes"). The complement is all guests on the master list who are *not* on the sub-list. Union is the combined sub-list of two criteria.

---

## Section 7 — Demonstration Library

**Demo 1 — Venn diagram construction:**
Draw Ω as a rectangle. Draw overlapping circles for events A and B. Show that A ∩ B is the overlap, A ∪ B is the combined area, and Aᶜ is the area of Ω outside A. Label each region with specific outcomes from Ω = {1,…,6}.

---

## Section 8 — Discovery Lessons

**Discovery 1 — Building events from outcomes:**
Give Ω = {HH, HT, TH, TT} (two coin flips). Ask the learner to write the event "exactly one head." They should list the outcomes with exactly one H: A = {HT, TH}. Ask for Aᶜ. They discover Aᶜ = {HH, TT} — "zero or two heads" — reinforcing that complement covers everything outside A.

---

## Section 9 — Teaching Actions

- Learner describes an event as a single outcome → trigger MC-1 bridge.
- Learner picks only "the opposite" outcome for a complement → trigger MC-2 bridge.
- Learner claims mutually exclusive events could co-occur → trigger MC-3 bridge.
- Visual learner → Demo 1 Venn diagram.
- Learner comfortable with set algebra → introduce σ-algebra (the formal collection of all events).

---

## Section 10 — Voice Teaching Script

"We have the sample space Ω — the full list of what can happen. An event is any *sub-list* — any subset — that shares some property you care about. 'Roll an even number' is the sub-list {2, 4, 6}. That whole sub-list is one event: event A. Probability will be assigned to A as a whole. And the complement Aᶜ is everything *outside* A in our list — here, {1, 3, 5}. So every outcome in Ω lands in either A or Aᶜ, never both."

---

## Section 11 — Assessment Items

**Q1 (recall):** For Ω = {1, 2, 3, 4, 5, 6}, write the event "roll a number divisible by 3."
*Answer:* A = {3, 6}

**Q2 (application):** A = {2, 4, 6}, B = {1, 2, 3}. Find A ∩ B, A ∪ B, and Aᶜ.
*Answer:* A ∩ B = {2}; A ∪ B = {1, 2, 3, 4, 6}; Aᶜ = {1, 3, 5}

**Q3 (conceptual):** Explain why ∅ and Ω are both events. What are their probabilities?
*Answer:* Events are any subsets of Ω; ∅ and Ω are subsets (the smallest and largest). P(∅) = 0 (impossible) and P(Ω) = 1 (certain).

---

## Section 12 — Recovery Notes

Learners who struggle with complements often succeed after the explicit check: "A and Aᶜ must cover all of Ω and share nothing." Have them verify A ∪ Aᶜ = Ω and A ∩ Aᶜ = ∅ for their answer.

---

## Section 13 — Memory & Review

**Spaced-repetition cue:** "What is the difference between an outcome and an event?"

**One-week review hook:** Give a new experiment and ask the learner to write three events (one impossible, one certain, one non-trivial) and form their complements.

---

## Section 14 — Transfer Map

- → **math.prob.probability-measure** (P is a function on events)
- → **math.prob.probability-axioms** (axioms stated in terms of events)
- → **math.prob.conditional-probability** (P(A|B) conditions on an event B)
- → **math.prob.independence** (A and B independent ⟺ P(A ∩ B) = P(A)P(B))

---

## Section 15 — Curriculum Feedback

No known errors. Venn diagrams for Demo 1 are an optional visual aid; they work best when Ω is finite and small.

*PACKAGE_READY. V-1 through V-20 PASS. AI Removal Test PASS.*
