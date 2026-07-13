## Section 0 — Concept Metadata

| Field             | Value                          |
|-------------------|--------------------------------|
| **Blueprint ID:** | math.prob.sample-space         |
| **Name:**         | Sample Space                   |
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

**One-sentence definition:** The sample space Ω is the set of all possible outcomes of a random experiment, ranging from finite collections to uncountably infinite continua.

**Why it matters:** Every probabilistic statement is a claim about subsets of Ω; without a well-defined sample space there is no rigorous way to assign or compare probabilities, making it the foundational object on which all of probability theory rests.

| Quantity / Symbol | Meaning                                    | Typical Units / Range       |
|-------------------|--------------------------------------------|-----------------------------|
| Ω (omega)         | Sample space — the universal set of outcomes | Finite, countable, or ℝⁿ   |
| ω                 | A single outcome (element of Ω)            | Context-dependent           |
| \|Ω\|             | Cardinality of the sample space            | ℕ or ∞                      |

---

## Section 2 — Prerequisite Map

- **math.found.set-theory** — set notation (∈, ⊆, ∪, ∩, ∅) is the language used to define and manipulate Ω.

---

## Section 3 — Learning Objectives

By the end of this concept the learner will be able to:
1. State and write the sample space for a given random experiment.
2. Classify a sample space as discrete (finite or countably infinite) or continuous (uncountable).
3. Distinguish between an outcome (element ω ∈ Ω) and an event (subset A ⊆ Ω).
4. Construct the sample space for compound experiments using Cartesian products.

---

## Section 4 — Misconception Library

### MC-1: "The sample space lists outcomes I consider likely, not all possible ones."

**Probe question:** A bag holds 3 red and 1 blue marble. A student writes Ω = {red, red, red, blue}. Is this a valid sample space?

**Characteristic phrase:** "I already know it's almost certainly red, so I focus on that."

**Bridge:** The sample space must be exhaustive: every outcome the experiment *could* produce belongs in Ω, regardless of probability. Listing red three times confuses the sample space with the probability assignment. The minimal Ω here is {red, blue}; the probability P(red) = 3/4 is assigned *after* Ω is fixed.

**Replacement concept:** Ω contains *what can happen*; the probability measure P assigns *how likely* each outcome is. These are separate objects—the sample space precedes probability.

---

### MC-2: "The sample space changes if I repeat the experiment."

**Probe question:** You roll a fair die twice. You write Ω₁ = {1,2,3,4,5,6} for each roll separately. A classmate writes Ω = {1,2,3,4,5,6}² with 36 pairs. Who is right?

**Characteristic phrase:** "For two rolls I just use the same six outcomes twice."

**Bridge:** When the experiment is "roll a die twice," a single outcome is a *pair* of results. Using {1,…,6} models only one roll; to capture both rolls as a single trial the sample space is the Cartesian product Ω = {1,…,6} × {1,…,6}, which has 36 elements. Choosing the wrong Ω makes it impossible to discuss events like "the sum equals 7."

**Replacement concept:** The sample space is defined for the *entire* experiment from start to finish. For compound experiments Ω is built via Cartesian products of the constituent spaces.

---

### MC-3: "An outcome and an event are the same thing."

**Probe question:** Consider Ω = {H, T} for one coin flip. Is {H} an event or an outcome? What about H?

**Characteristic phrase:** "Getting heads is the event I care about."

**Bridge:** An *outcome* is a single element ω ∈ Ω (e.g., H). An *event* is a *subset* A ⊆ Ω (e.g., {H}). For finite Ω this is just braces vs. no braces, but the distinction matters because probability is assigned to events (subsets), not bare outcomes. In continuous spaces (Ω = ℝ) individual outcomes often have probability 0, yet events such as intervals [a, b] can have positive probability.

**Replacement concept:** Outcomes are points; events are sets of points. Probability is a function on the collection of events (the σ-algebra), not on individual outcomes directly.

---

## Section 5 — Explanation Library

### Explanation 1 — The experiment-first definition

A *random experiment* is any procedure with an uncertain outcome that can in principle be repeated. The sample space Ω is defined by answering the question: "What are *all* the distinct results this experiment could produce?" Each distinct result is an *outcome* ω. The collection of all such ω is Ω. For a single fair-die roll, Ω = {1, 2, 3, 4, 5, 6}. For the experiment "record tomorrow's high temperature in °C" the sample space is (approximately) Ω = ℝ. The key rule: **Ω must be exhaustive (cover everything possible) and the outcomes must be mutually exclusive (no two outcomes occur simultaneously on a single trial).**

---

### Explanation 2 — Discrete vs. continuous sample spaces

Discrete sample spaces contain outcomes you can count one by one (including countably infinite cases such as Ω = ℕ for "the number of coin flips until the first head"). Continuous sample spaces contain an interval or higher-dimensional region of ℝ (uncountably infinite). This classification matters because it determines how probabilities are assigned: via sums for discrete Ω and via integrals for continuous Ω. Most introductory probability starts with finite discrete Ω to build intuition before moving to continuous cases.

---

### Explanation 3 — Cartesian product for compound experiments

When an experiment consists of several stages or trials, the sample space is built as a Cartesian product. Rolling two dice: Ω = {1,…,6} × {1,…,6} = { (i, j) : i, j ∈ {1,…,6} }, which has 36 elements. Flipping a coin three times: Ω = {H, T}³, which has 8 elements. The Cartesian product ensures that each distinct *sequence* of results is a single outcome in the compound sample space, enabling correct counting and probability assignments for events that span multiple stages.

---

## Section 6 — Analogy Library

**The seating-chart analogy:** Designing a sample space is like making a class seating chart before the first day. You must list *every seat* (outcome), even if some are rarely chosen. Probability only tells you which seats are popular—the chart (Ω) must list them all first.

**The road-map analogy:** Ω is the complete map of every destination reachable from a starting point. A probability is a GPS confidence score for each destination. You cannot assign GPS scores without the map.

---

## Section 7 — Demonstration Library

**Demo 1 — Building Ω for a two-stage experiment (live construction):**
Ask the learner to list all outcomes for "flip a coin, then roll a die." Draw a tree: two branches (H/T) each splitting into 6 branches (1–6), producing 12 leaves. Show that Ω = {(H,1),(H,2),…,(T,6)} has exactly 12 elements. Point out that |Ω| = 2 × 6 = 12, illustrating the multiplication principle.

---

## Section 8 — Discovery Lessons

**Discovery 1 — Why do we need all outcomes?**
Scenario: a biased coin is flipped once. Ask: "Can we build a probability model if Ω = {H} only?" The learner discovers they cannot assign P(T) without T in Ω. Conclude: Ω must be exhaustive, and the bias is encoded in P, not by omitting outcomes from Ω.

---

## Section 9 — Teaching Actions

- If learner lists only "likely" outcomes in Ω → trigger MC-1 bridge.
- If learner conflates single-trial and compound Ω → trigger MC-2 bridge.
- If learner uses "outcome" and "event" interchangeably → trigger MC-3 bridge.
- For visual learner → use Demo 1 tree diagram.
- For abstract learner → introduce σ-algebra as the formal structure built on Ω.

---

## Section 10 — Voice Teaching Script

"Picture yourself about to roll a die. Before the roll, you make a list: every number from 1 to 6 could come up. That complete list is your sample space—Ω equals the set {1, 2, 3, 4, 5, 6}. Notice you listed all six numbers *before* you cared about which is more or less likely. Probability comes later; the sample space just answers the question 'what could possibly happen?'"

---

## Section 11 — Assessment Items

**Q1 (recall):** Write the sample space for drawing one card from a standard 52-card deck and recording only its suit.
*Answer:* Ω = {♠, ♥, ♦, ♣}

**Q2 (application):** A spinner has sectors labelled A, B, C, D. You spin it twice and record the result as an ordered pair. How many elements are in Ω?
*Answer:* |Ω| = 4 × 4 = 16

**Q3 (conceptual):** A student defines Ω = {even, odd} for a fair die. Is this a valid sample space? Explain.
*Answer:* Yes — it is a valid (coarser) sample space for the experiment "record the parity." It is not the same as Ω = {1,…,6}; events such as "outcome is 4" cannot be expressed in the coarser space. Both are valid; the choice of Ω depends on which events matter.

---

## Section 12 — Recovery Notes

Students who confuse Ω with a probability distribution benefit from seeing the separation written explicitly: Step 1 — list Ω (no numbers yet). Step 2 — assign P to events (numbers appear now). Doing these as separate written steps prevents conflation.

---

## Section 13 — Memory & Review

**Spaced-repetition cue:** "What three requirements must a sample space satisfy?" (Exhaustive, mutually exclusive outcomes; well-defined for the experiment in question.)

**One-week review hook:** Ask the learner to build Ω for a new experiment they describe themselves, then classify it as discrete or continuous.

---

## Section 14 — Transfer Map

- → **math.prob.event** (events are subsets of Ω)
- → **math.prob.probability-measure** (P is defined on events over Ω)
- → **math.prob.combinatorial-probability** (counting |Ω| and |A|)
- → **math.prob.continuous-rv** (Ω = ℝ or ℝⁿ for real-valued experiments)

---

## Section 15 — Curriculum Feedback

No known errors. Cartesian product notation assumes learner has seen ordered-pair notation in math.found.set-theory.

*PACKAGE_READY. V-1 through V-20 PASS. AI Removal Test PASS.*
