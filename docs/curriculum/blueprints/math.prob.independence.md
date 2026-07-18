<!-- BLUEPRINT: math.prob.independence -->
<!-- STATUS: PACKAGE_READY -->
<!-- SPEC VERSION: 1.0 -->

# Teaching Blueprint: Independence
**Concept ID:** `math.prob.independence`
**KG Fields:** difficulty=proficient | bloom=understand | estimated_hours=3 | mastery_threshold=0.9

---

## Component 0 — Metadata

| Field | Value |
|-------|-------|
| concept_id | math.prob.independence |
| name | Independence |
| difficulty | proficient |
| bloom | understand |
| estimated_hours | 3 |
| mastery_threshold | 0.9 |
| CPA_entry_stage | C (Concrete) |
| requires (Tier-1) | math.prob.conditional-probability |
| cross_links | (none) |
| P76_mode | independence |
| MAMR | 5/5 (⌈0.9 × 5⌉) |

---

## Component 1 — Cognitive Map

### Prior Knowledge Anchors
- **math.prob.conditional-probability**: P(A\|B) = P(A∩B)/P(B) for P(B)>0; conditioning updates the sample space from Ω to B; the formula's algebraic rearrangement P(A∩B) = P(A\|B)·P(B) is the tool this concept specializes

### Target Knowledge State
Student can state the product-rule definition of independence (P(A∩B) = P(A)P(B)) and its conditional-probability equivalent (P(A\|B) = P(A), when P(B)>0); verify independence numerically for two events by computing all three probabilities; distinguish independence from disjointness (mutually exclusive events with nonzero probability are the most dependent pair possible); extend the definition to mutual independence of n events (every subcollection's product formula must hold, not just the pairs); produce and interpret the classical counterexample showing pairwise independence does not imply mutual independence; and recognise that "independent" is a numerical property to be checked via the product rule, not a judgment about causal or real-world relatedness.

### Conceptual Obstacles
1. Confusing disjoint with independent — both feel like "A and B have nothing to do with each other," but disjoint events (A∩B=∅) satisfy P(A∩B)=0, which equals P(A)P(B) only in the degenerate case P(A)=0 or P(B)=0; for any two events with positive probability, disjointness is the strongest possible form of DEPENDENCE (knowing A occurred tells you B definitely did not)
2. Assuming pairwise independence of several events implies full mutual independence — the classical Bernstein three-coin-based example produces three events that are independent in every pair but whose triple product fails, showing "check every pair" is not enough for n≥3
3. Treating "independent" as a claim about the real world (no causal link, no relatedness) rather than a numerical condition on probabilities — this leads to declaring events independent without computing the product rule (when a hidden numerical dependence exists) or declaring dependence from an apparent causal story that the numbers do not support

---

## Component 2 — Misconception Registry

| ID | Label | Description | Trigger |
|----|-------|-------------|---------|
| MC-1 | DISJOINT-MEANS-INDEPENDENT | Student treats mutually exclusive events as independent because "they don't overlap, so they don't affect each other"; fails to see that A∩B=∅ makes P(A\|B)=0, the opposite of P(A\|B)=P(A) unless P(A)=0 | Any pair of disjoint events with positive individual probabilities; "are these independent?" asked about a partition |
| MC-2 | PAIRWISE-IMPLIES-MUTUAL | Student checks independence pairwise for three or more events (P(A∩B)=P(A)P(B), P(A∩C)=P(A)P(C), P(B∩C)=P(B)P(C)) and concludes the whole collection is mutually independent, without checking the full-intersection product | Any task with 3+ events asking to establish "independence" of the collection; the classical two-coins-and-XOR construction |
| MC-3 | INDEPENDENCE-IS-CAUSAL-UNRELATEDNESS | Student judges independence from an intuitive story about causation or relatedness ("these can't be independent, event B clearly depends on how A turns out") instead of computing P(A∩B) vs P(A)P(B); either asserts dependence with no arithmetic check, or asserts independence because "nothing links them" | Word-problems with a plausible causal narrative; asking "is it independent?" before any probabilities are given |

**Foundational Misconception:** MC-1 (DISJOINT-MEANS-INDEPENDENT) — it inverts the two most basic relationships events can have (independence and mutual exclusivity are opposite ends of the dependence spectrum for events with positive probability), and a student who conflates them cannot correctly read any subsequent problem that mixes partitions with independence questions, including the pairwise/mutual distinction in MC-2 (whose counterexample events are neither disjoint nor obviously independent, and must be checked by arithmetic, not intuition).

---

## Component 3 — Scaffolding Protocol

**Entry point:** C (Concrete) — proficient learner computes P(A∩B), P(A)P(B), and P(A\|B) directly on a two-fair-coin space for one independent pair and one disjoint pair, before any general statement of the definition.

**Scaffolding sequence:**
1. **A01 P11 REPRESENTATION SHIFT** — C: two-coin sample space, compute all three quantities for an independent pair and a dependent pair; P: probability-tree view showing "B's branch probabilities unchanged given A" as the picture of independence; A: formal product-rule definition, its conditional-probability equivalent, and the extension to mutual independence of n events
2. **A02 P06 CONTRAST PAIR** — disjoint vs. independent (MC-1); the Bernstein three-event pairwise-but-not-mutual construction (MC-2); a causal-looking word problem resolved by arithmetic alone (MC-3)
3. **A03 P91 Gate** — mastery assessment

---

## Component 4 — Protocol A (Main Teaching Sequence)

### Teaching Action A01 — From Coin Flips to the Product Rule

**Primitive:** P11 REPRESENTATION SHIFT
**Purpose:** Ground independence in direct computation before naming it; make the conditional-probability equivalence visible as the same fact stated two ways; state the n-event extension precisely

---

**[P11 — REPRESENTATION SHIFT]**

**Stage C — Concrete (two fair coins, Ω = {HH, HT, TH, TT}, each outcome probability 1/4):**

Let A = "first coin is heads" = {HH, HT}, so P(A) = 1/2. Let B = "second coin is heads" = {HH, TH}, so P(B) = 1/2.

- P(A∩B) = P({HH}) = 1/4
- P(A)·P(B) = 1/2 · 1/2 = 1/4
- **P(A∩B) = P(A)P(B) → A and B are independent.**
- Check the conditional form: P(A\|B) = P(A∩B)/P(B) = (1/4)/(1/2) = 1/2 = P(A). Knowing the second coin landed heads changes nothing about the first coin — exactly what "independent" should mean.

Now let C = "both coins show heads" = {HH}, so P(C) = 1/4. Check A and C:

- P(A∩C) = P({HH}) = 1/4
- P(A)·P(C) = 1/2 · 1/4 = 1/8
- **P(A∩C) = 1/4 ≠ 1/8 = P(A)P(C) → A and C are NOT independent.** (Sensible: if you know both coins are heads, you certainly know the first is heads — P(A\|C) = 1, not 1/2.)

**Stage P — Pictorial (probability tree, the operational picture of independence):**

```
                    first coin
                 H(1/2)     T(1/2)
                /              \
        second coin          second coin
       H(1/2) T(1/2)        H(1/2) T(1/2)
```

Independence of A ("first = H") and B ("second = H") is the statement that the SECOND coin's branch probabilities (1/2, 1/2) are identical no matter which way the first branch went. That is the picture behind P(B\|A) = P(B): conditioning on A does not redraw B's branch. Contrast: C depends on BOTH coins by definition, so conditioning on A (first = H) collapses C's branch entirely (P(C\|A) = P(second = H \| first = H) = 1/2, but unconditionally P(C) = 1/4 — wait, these are the same; the dependence shows up between A and C, not within the tree's B-branches. The decisive test is always the arithmetic, not a glance at the tree.)

**Stage A — Abstract (the definition, its equivalent form, and the n-event extension):**

**Definition (two events):** A and B are **independent** iff
$$P(A \cap B) = P(A)\,P(B).$$

**Equivalent form** (when P(B) > 0): dividing both sides by P(B) gives
$$P(A \mid B) = P(A),$$
i.e. conditioning on B does not change A's probability. (Symmetrically, P(B\|A) = P(B) when P(A)>0 — the relation is symmetric even though the conditional form looks asymmetric.)

**Definition (mutual independence of n events A₁,…,Aₙ):** every subcollection's product formula holds — for every subset {i₁,…,iₖ} of the indices with k≥2,
$$P(A_{i_1}\cap\cdots\cap A_{i_k}) = P(A_{i_1})\cdots P(A_{i_k}).$$
This is stronger than checking only the pairs (k=2); it demands the product rule for every triple, quadruple, and so on up to the full collection.

---

**[P49 — ADAPTIVE CHECKPOINT]**

**Prompt:** Roll a fair six-sided die once. Let A = "the roll is even" = {2,4,6} and B = "the roll is at most 4" = {1,2,3,4}. Are A and B independent? Show the check.

**CORRECT:** P(A) = 3/6 = 1/2. P(B) = 4/6 = 2/3. A∩B = {2,4}, so P(A∩B) = 2/6 = 1/3. P(A)P(B) = (1/2)(2/3) = 1/3. **P(A∩B) = P(A)P(B) → independent.**
→ "Correct. Notice A and B are not disjoint (they share {2,4}) and don't look obviously unrelated — the product rule alone decides it, exactly the discipline this concept builds." → Proceed to A02.

**PARTIAL:** Student computes P(A), P(B), P(A∩B) correctly but does not compare P(A∩B) to P(A)P(B), and instead answers by intuition.
→ "You have every number you need — finish the comparison: is 1/3 equal to (1/2)(2/3) = 1/3? It is, so they're independent. The comparison IS the definition; nothing else settles the question."

**INCORRECT:** Student answers "not independent, because both events involve the same die roll, so they must be related" (MC-3).
→ "Sharing the same die roll doesn't decide it — only the arithmetic does. Compute: P(A)=1/2, P(B)=2/3, P(A∩B)=P({2,4})=1/3. Since 1/3 = (1/2)(2/3), the product rule holds and they ARE independent, despite both depending on the same roll. 'Independent' is a numerical relationship between the probabilities, not a statement about physical separateness."

**NO_RESPONSE:** → "List the sets: A={2,4,6}, B={1,2,3,4}, A∩B={2,4}. Probabilities: P(A)=1/2, P(B)=2/3, P(A∩B)=1/3. Product: (1/2)(2/3)=1/3. Since these match, A and B are independent."

---

### Teaching Action A02 — Disjoint vs. Independent; Pairwise vs. Mutual

**Primitive:** P06 CONTRAST PAIR
**Purpose:** Break MC-1 by showing disjointness is near-maximal dependence, not independence; break MC-2 with the classical pairwise-but-not-mutual construction; break MC-3 by resolving a causal-sounding scenario by arithmetic alone

---

**[P06 — CONTRAST PAIR]**

**Contrast 1 — Disjoint is the OPPOSITE of independent (MC-1):**

Roll a fair die. Let A = "roll is 1 or 2" (P(A)=1/3) and D = "roll is 3, 4, 5, or 6" (P(D)=2/3). A and D are disjoint: A∩D=∅, so P(A∩D)=0.

Check independence: P(A)P(D) = (1/3)(2/3) = 2/9 ≠ 0 = P(A∩D). **Not independent** — in fact as dependent as two nontrivial events can be: P(A\|D) = 0/(2/3) = 0, meaning once you know D occurred, A is now IMPOSSIBLE. Knowing one tells you everything about the other. Disjointness (for events with positive probability) is strong dependence, the opposite of the intuition "they don't overlap, so they're unrelated."

**Contrast 2 — Pairwise independent, but not mutually independent (MC-2), the classical construction:**

Toss two fair coins. Let A = "first coin is heads", B = "second coin is heads", and X = "the two coins show the same face" (both heads or both tails). Each has probability 1/2 (X = {HH, TT}, 2 of 4 equally likely outcomes).

Check every pair:
- P(A∩B) = P({HH}) = 1/4 = (1/2)(1/2) = P(A)P(B) ✓
- P(A∩X) = P({HH}) = 1/4 = (1/2)(1/2) = P(A)P(X) ✓ (A∩X requires first=H AND same face, i.e. HH only)
- P(B∩X) = P({HH}) = 1/4 = (1/2)(1/2) = P(B)P(X) ✓ (by the same reasoning)

**Every pair is independent.** Now check the triple:

- P(A∩B∩X) = P({HH}) = 1/4 (HH is the only outcome satisfying all three)
- P(A)P(B)P(X) = (1/2)(1/2)(1/2) = 1/8

**1/4 ≠ 1/8 — the triple is NOT mutually independent**, even though every pair passed. Knowing any two of {A, B, X} determines the third exactly (e.g. A and B together force X), which is exactly the kind of hidden joint dependence that pairwise checks cannot see.

**Contrast 3 — A causal-sounding scenario resolved by arithmetic alone (MC-3):**

"A factory runs two machines. Let A = 'Machine 1 breaks down this month' and B = 'Machine 2 breaks down this month.' Since both machines run in the same factory and share the same power supply, surely A and B can't be independent." This is a STORY, not a computation. Suppose historical data gives P(A)=0.1, P(B)=0.2, and P(A∩B)=0.02. Check: P(A)P(B) = (0.1)(0.2) = 0.02 = P(A∩B). **The data says independent**, regardless of the plausible-sounding shared-power-supply narrative — perhaps the two machines fail for unrelated mechanical reasons despite sharing infrastructure. Conversely, if the data had given P(A∩B) = 0.05, the events would be dependent (positively, since 0.05 > 0.02) even with no causal story offered at all. The number decides; the story is neither required nor sufficient.

---

**[P49 — ADAPTIVE CHECKPOINT]**

**Prompt:** A jar contains 4 red and 4 blue marbles. Let A = "first draw (no replacement) is red" and B = "second draw is red." (a) Are A and B independent? (b) Now let C = "first draw is red" and D = "first draw is blue." Are C and D independent?

**CORRECT:** (a) P(A)=4/8=1/2. P(B) depends on the first draw, so compute P(A∩B) directly: P(both red) = (4/8)(3/7) = 12/56 = 3/14. By symmetry P(B)=1/2 too (unconditionally, second draw is equally likely to be any marble). Check: P(A)P(B) = (1/2)(1/2) = 1/4 = 14/56, but P(A∩B) = 12/56. **12/56 ≠ 14/56 → NOT independent** (drawing without replacement links the two draws). (b) C and D are complementary and disjoint (a single draw is either red or blue, not both): P(C∩D) = 0, while P(C)P(D) = (1/2)(1/2) = 1/4 ≠ 0. **Not independent** — disjoint, hence strongly dependent, matching Contrast 1.
→ "Correct on both. (a) shows sampling without replacement typically breaks independence even when the marginal probabilities look symmetric; (b) is Contrast 1 again — disjoint complementary events are never independent (unless one has probability 0)." → Proceed to A03.

**PARTIAL:** Student gets (b) right but in (a) assumes independence because "each marble is equally likely to be any color."

**INCORRECT:** Student answers (a) "independent, since P(B)=1/2 same as P(A)" (confusing equal marginal probabilities with independence) and/or (b) "independent, since red and blue are just different colors, unrelated" (MC-1/MC-3).
→ "(a) Equal marginals are not the test — compare P(A∩B) to P(A)P(B) directly: P(A∩B)=3/14=12/56, but P(A)P(B)=1/4=14/56. They differ, so NOT independent; drawing the first red marble removes it from the jar, changing the odds for the second draw. (b) 'Different colors' doesn't matter — what matters is that a single draw cannot be both red and blue, so P(C∩D)=0 while P(C)P(D)=1/4≠0. Disjoint and positive-probability ⇒ dependent, every time."

**NO_RESPONSE:** → "(a) P(A∩B) = (4/8)(3/7) = 3/14 = 12/56; P(A)P(B) = (1/2)(1/2) = 14/56. Unequal → not independent. (b) C∩D=∅ so P(C∩D)=0, but P(C)P(D)=1/4≠0 → not independent (disjoint ⇒ dependent)."

---

### Teaching Action A03 — Mastery Gate (P91)

**Primitive:** P91 = P77→P55→P76→P55→P75→P55→P74→P55→P78
**Purpose:** Assess product-rule fluency, the disjoint/independent distinction, and the pairwise-vs-mutual distinction under transfer

---

**[P77 — MULTI-PROBLEM SET]** *(4 problems)*

**Problem 1:** Two events satisfy P(A)=0.4, P(B)=0.5, P(A∩B)=0.2. Are A and B independent? Justify with the product rule.

*Solution:* P(A)P(B) = (0.4)(0.5) = 0.2 = P(A∩B). **Independent.**

**Problem 2:** Events E and F satisfy P(E)=0.3, P(F)=0.3, and E∩F=∅. Are E and F independent? Explain using P(E\|F).

*Solution:* P(E∩F)=0, but P(E)P(F)=0.09≠0 — **not independent**. P(E\|F) = P(E∩F)/P(F) = 0/0.3 = 0 ≠ P(E)=0.3: knowing F occurred makes E impossible, the opposite of "unaffected."

**Problem 3:** A spinner has three independent independent-by-construction fair events A, B, C each with probability 1/2, satisfying the full mutual-independence condition. What must be true of P(A∩B∩C), and how does that differ from what the Bernstein coin/coin/same-face example produces?

*Solution:* Genuine mutual independence requires P(A∩B∩C) = P(A)P(B)P(C) = 1/8. The Bernstein construction (A, B, X from two coins) instead gives P(A∩B∩X) = 1/4 ≠ 1/8 despite every pair passing — the defining difference between "pairwise independent" and "mutually independent."

**Problem 4:** True or false, with justification: "If P(A∩B) = 0, then A and B are independent." Give a specific numeric counterexample if false.

*Solution:* **False**, unless P(A)=0 or P(B)=0. Counterexample: a die roll, A = "roll is 1" (P(A)=1/6), B = "roll is 2" (P(B)=1/6); A∩B=∅ so P(A∩B)=0, but P(A)P(B)=1/36≠0. Disjoint nonzero-probability events are dependent, not independent.

---

**[P55 — SCORE]**
Count correct responses. Record raw score S₁ (0–4) after P77.

---

**[P76 — TRANSFER PROBE]** *(P76_mode: independence)*

**Prompt:** A quality-control system tests a manufactured part with two independent sensors. Sensor 1 correctly flags a defect with probability 0.9 (independent of Sensor 2). Sensor 2 correctly flags a defect with probability 0.8. Assume the part is in fact defective.

(a) Let F₁ = "Sensor 1 flags it" and F₂ = "Sensor 2 flags it." Using the independence of F₁ and F₂, compute P(both sensors flag it) and P(neither sensor flags it).
(b) A colleague argues: "Since both sensors are inspecting the exact same physical part, their results can't really be independent — if the defect is severe, both are more likely to catch it, and if it's subtle, both are more likely to miss it." Explain what this argument gets right and what it would require to be reflected in the model, and contrast this with the pure product-rule computation in (a).

**Expected solution:**

(a) P(F₁∩F₂) = P(F₁)P(F₂) = (0.9)(0.8) = 0.72 (product rule, given independence). P(neither) = P(F₁ᶜ∩F₂ᶜ) = P(F₁ᶜ)P(F₂ᶜ) = (0.1)(0.2) = 0.02 (complements of independent events are independent, so the product rule still applies).

(b) The colleague's point is a genuine modeling concern, not a computational one: if defect severity varies and affects both sensors' chances simultaneously, then conditioning on "severe defect" vs. "subtle defect" could make F₁ and F₂ dependent overall (this is the mechanism behind conditional independence: F₁ and F₂ might be independent GIVEN the severity level, but marginally dependent once severity is unknown and averaged over). The stated problem, however, ASSERTS independence of F₁ and F₂ as a given premise (0.9 and 0.8 are given as unconditional, independent rates) — under that premise the product rule in (a) is simply correct arithmetic, full stop. Whether independence is a reasonable assumption for a real system is a modeling judgment made BEFORE the computation (and would need to be justified with data, e.g. checking P(F₁∩F₂) against P(F₁)P(F₂) empirically, exactly as in A01/A02); once independence is assumed or established, the product rule is applied mechanically, with no further appeal to the causal story.

---

**[P55 — SCORE]**
Record transfer score S₂ (0 or 1) after P76.

Total score S = S₁ + S₂ (max 5).

---

**[P75 — MASTERY ASSESSMENT]**

MAMR: 5/5 (⌈0.9 × 5⌉ = ⌈4.5⌉ = 5)

- S ≥ 5: MASTERY ACHIEVED → proceed to P74
- S = 4: NEAR MASTERY → attempt repair on missed items; re-gate at next session
- S ≤ 3: MASTERY NOT ACHIEVED → execute Protocol B

---

**[P55 — SCORE]**
Record mastery determination (ACHIEVED / NEAR / NOT ACHIEVED).

---

**[P74 — ROUTING DECISION]**

- MASTERY ACHIEVED → unlock math.prob.lln and math.prob.poisson-process; record completion
- NEAR MASTERY → flag for Protocol B on specific missed item(s); re-assess next session
- MASTERY NOT ACHIEVED → execute Protocol B immediately

---

**[P55 — SCORE]**
Record routing outcome.

---

**[P78 — COMPLETION]**

Session record: concept math.prob.independence assessed. Mastery status logged. Student directed to next concept or repair protocol per P74 routing.

---

## Component 5 — Protocol B (Misconception Repair)

### Repair Action B01 — DISJOINT-MEANS-INDEPENDENT (MC-1)

**[P27 — MISCONCEPTION NAMING]**
"Treating mutually exclusive events as independent is DISJOINT-MEANS-INDEPENDENT. They are opposite ends of the dependence spectrum: disjointness (for events with positive probability) is the STRONGEST form of dependence, not its absence."

**[P41 — MISCONCEPTION DETECTOR]**
Diagnostic: "A={roll is 1 or 2}, D={roll is 3,4,5,6} on a fair die. Are A and D independent?"
- MC-1 response: "Yes — they don't overlap, so they can't affect each other."

**[P64 — CONCEPTUAL SHIFT]**
"Compute, don't intuit: P(A∩D)=0 (they never both happen), but P(A)P(D)=(1/3)(2/3)=2/9≠0. Since these differ, NOT independent. In fact P(A\|D)=0/(2/3)=0: once you know D happened, A becomes IMPOSSIBLE — that is maximal dependence, the opposite of 'unaffected.' Mental model: independence means knowing one event leaves the OTHER'S probability unchanged; disjointness means knowing one event collapses the other's probability to zero. Those are opposite outcomes, not the same one."

Practice: For a fair coin flipped twice, let A={first flip heads} and B={first flip tails}. Show P(A∩B)=0 but P(A)P(B)=1/4≠0, confirming disjoint ⇒ dependent here too.

---

### Repair Action B02 — PAIRWISE-IMPLIES-MUTUAL (MC-2)

**[P27 — MISCONCEPTION NAMING]**
"Concluding full independence of 3+ events from checking pairs only is PAIRWISE-IMPLIES-MUTUAL. Mutual independence demands the product rule for EVERY subcollection, including the full intersection — pairwise checks alone can miss a hidden joint dependence."

**[P41 — MISCONCEPTION DETECTOR]**
Diagnostic: "Two coins give A='first heads', B='second heads', X='same face'. All three pairs (A,B), (A,X), (B,X) satisfy the product rule. Are A, B, X mutually independent?"
- MC-2 response: "Yes — every pair checks out, so the whole set must be independent."

**[P64 — CONCEPTUAL SHIFT]**
"Check the triple, not just the pairs: P(A∩B∩X) = P({HH}) = 1/4, but P(A)P(B)P(X) = (1/2)³ = 1/8. These differ — NOT mutually independent, despite every pair passing. Mechanism: knowing any TWO of {A,B,X} determines the third exactly (e.g. A and B together force X = 'both heads' to be true), a joint dependence invisible to pairwise checks. Rule to internalize: for n≥3 events, mutual independence requires checking ALL subcollections' products, not just pairs — 'pairwise' and 'mutual' are genuinely different strengths of claim."

Practice: Using the same A, B, X, verify directly that P(X\|A∩B) ≠ P(X) (compute both sides) to see the hidden dependence from a conditional-probability angle.

---

### Repair Action B03 — INDEPENDENCE-IS-CAUSAL-UNRELATEDNESS (MC-3)

**[P27 — MISCONCEPTION NAMING]**
"Deciding independence from a causal story instead of the product rule is INDEPENDENCE-IS-CAUSAL-UNRELATEDNESS. 'Independent' is a numerical relationship between probabilities (P(A∩B)=P(A)P(B)), checked by arithmetic — not a claim about physical or causal separateness."

**[P41 — MISCONCEPTION DETECTOR]**
Diagnostic: "Two machines share a power supply in the same factory. Given P(A)=0.1, P(B)=0.2, P(A∩B)=0.02, are the breakdown events independent?"
- MC-3 response: "No — they share infrastructure, so they must be dependent," without computing the product.

**[P64 — CONCEPTUAL SHIFT]**
"Compute first: P(A)P(B)=(0.1)(0.2)=0.02=P(A∩B) — the product rule holds, so by definition A and B ARE independent, regardless of the shared-power-supply story. A plausible causal narrative is neither required for independence nor sufficient to rule it out; only the arithmetic comparison decides. (If the data instead gave P(A∩B)=0.05, THAT would establish dependence — from the number, not the story.) Standing habit: whenever asked 'are these independent,' the first and only decisive move is computing P(A∩B) and comparing it to P(A)P(B); a real-world plausibility argument is not a substitute and is not needed once the numbers are in hand."

Practice: Given P(rain today)=0.3, P(traffic jam today)=0.4, P(both today)=0.2, decide independence purely from the numbers, then note whether the intuitive story ("rain causes traffic jams, so they must be dependent") agrees with the computed answer.

---

## Component 6 — P89 Spaced Repetition Schedule

**[P89 — SPACED REPETITION]**

| Review | Delay | Focus |
|--------|-------|-------|
| SR-1 | +1 day | Recompute the two-coin A/B/C example from memory; state both forms of the definition (product rule and conditional-probability equivalence) |
| SR-2 | +3 days | The disjoint-vs-independent contrast: given any disjoint pair with positive probabilities, show why it cannot be independent |
| SR-3 | +7 days | Reconstruct the Bernstein pairwise-not-mutual example (A, B, X from two coins) from scratch, including both the pairwise checks and the failing triple check |
| SR-4 | +14 days | Resolve one causal-sounding word problem using only the product rule, explicitly rejecting the temptation to judge from the narrative alone |

Retrieval flag: if student declares a disjoint pair independent (MC-1) or accepts pairwise checks as sufficient for 3+ events (MC-2), re-execute B01/B02 before continuing.

---

## Component 7 — Cross-Blueprint Dependencies

**[GR-8: Cross-link documentation]**

| Direction | Concept | Relationship |
|-----------|---------|---------------|
| Requires (Tier-1) | math.prob.conditional-probability | Independence is defined as the special case P(A\|B)=P(A); the algebraic rearrangement of the conditional-probability formula is used directly in A01's Stage A |
| Unlocks | math.prob.lln | The Law of Large Numbers is stated for independent (and identically distributed) trials; the product-rule definition here is the exact hypothesis LLN requires |
| Unlocks | math.prob.poisson-process | Poisson process increments are defined to be independent across disjoint time intervals; this concept's product-rule test is the tool used to verify that property |

**GR-9:** cross_links: none in the KG for this concept; P76_mode = independence (the transfer probe tests the definition in a genuinely new applied context — quality-control sensors — rather than against a named cross-linked concept).

---

## Component 8 — Teaching Notes

**Structural decisions:**
- h=3 → compact structure (2 main TAs + gate), matching other h=3, bloom=understand Tier-2 concepts (e.g. math.linalg.subspace)
- bloom=understand → V-4 = N/A (no P07 required; verification and classification tasks, not derivations)
- CPA_entry = C for a proficient learner: direct two-coin computation precedes any general statement of the definition, so "independent" is anchored to arithmetic from the first sentence

**Key teaching insight:** The single most damaging error this concept must inoculate against is DISJOINT-MEANS-INDEPENDENT, because it inverts a relationship students will re-encounter constantly (partitions, complementary events, mutually exclusive outcomes). A01 and A02 are sequenced so that "independent" is never introduced as a vague relatedness judgment: every claim of independence or dependence in this blueprint is settled by comparing P(A∩B) to P(A)P(B), never by narrative alone — this discipline is itself the content of MC-3's repair and is reinforced by A03's transfer probe, which deliberately embeds a plausible-sounding causal argument that the correct computation overrides.

**Pairwise vs. mutual (MC-2) as a genuine content frontier:** The Bernstein-style coin construction is the standard minimal counterexample in the probability literature for "pairwise independence does not imply mutual independence"; it is reused verbatim in A02 (introduction), A03/Problem 3 (assessment), and B02 (repair) so a student who struggles with it gets three encounters with the identical concrete example before any new context is introduced.

**Sequencing note:** No cross-link concept exists yet for math.prob.independence; the P76 transfer probe instead applies the definition to a two-sensor quality-control scenario, deliberately mixing a plausible causal narrative (MC-3's trigger) with a clean given-independence premise, to force the discipline of resolving the question by arithmetic even when a story is offered.

---

## Component 10 — Validation Checklist

| Code | Rule | Check | Status |
|------|------|-------|--------|
| V-1 | Concept ID matches KG | math.prob.independence ✓ | PASS |
| V-2 | All Tier-1 requires have existing blueprints | math.prob.conditional-probability ✓ | PASS |
| V-3 | CPA entry = C for proficient difficulty | C (Concrete) ✓ | PASS |
| V-4 | bloom=understand → P07 N/A | bloom=understand; no P07; V-4=N/A ✓ | N/A |
| V-5 | GR-1: A01 opens with B-category primitive | P11 REPRESENTATION SHIFT ✓ | PASS |
| V-6 | GR-2: each non-gate TA has P49 with 4 branches | A01, A02 each have P49 CORRECT/PARTIAL/INCORRECT/NO_RESPONSE ✓ | PASS |
| V-7 | GR-3: gate TA (A03) is terminal | A03=P91; no further TAs ✓ | PASS |
| V-8 | GR-4: repair TAs open with P27+P41+P64 | B01, B02, B03 each: P27→P41→P64 ✓ | PASS |
| V-9 | GR-6: P91 terminal in its TA | P91 is A03; A03 is the last TA ✓ | PASS |
| V-10 | GR-7: P76 present in mastery gate | P76 in A03 between P77 and P75 ✓ | PASS |
| V-11 | GR-8: cross_links documented in Component 7 | requires and unlocks documented ✓ | PASS |
| V-12 | GR-9: P76 mode correct for cross_links | no cross_links → P76=independence ✓ | PASS |
| V-13 | GR-10: MAMR stated and enforced | MAMR=5/5 stated in C0 and P75 gate ✓ | PASS |
| V-14 | MAMR formula correct | ⌈0.9×5⌉=⌈4.5⌉=5; PASS=5/5 ✓ | PASS |
| V-15 | P91 structure complete | P77(4)→P55→P76(1)→P55→P75→P55→P74→P55→P78 ✓ | PASS |
| V-16 | P77 has exactly 4 problems | Problems 1–4 verified ✓ | PASS |
| V-17 | 3 misconceptions with FOUNDATIONAL declared | MC-1 FOUNDATIONAL, MC-2, MC-3 ✓ | PASS |
| V-18 | P89 spaced repetition present | Component 6 with 4 SR intervals ✓ | PASS |
| V-19 | Structure matches h | h=3 → compact (2 main TAs + gate); A01+A02+A03 ✓ | PASS |
| V-20 | P76 transfer probe is novel and correct | Quality-control sensor scenario; product rule + conditional-independence discussion ✓ | PASS |
| AIR | All internal references consistent | Concept IDs, MAMR, bloom, difficulty consistent throughout ✓ | PASS |
