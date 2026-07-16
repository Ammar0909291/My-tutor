# Teaching Blueprint: Sample Space

## Component 0 — Metadata Header

| Field | Value |
|---|---|
| BLUEPRINT_ID | math.prob.sample-space |
| KG_ID | math.prob.sample-space |
| KG_VERSION | v1.0.1 |
| STATUS | PACKAGE_READY |
| DOMAIN | Probability |
| NAME | Sample Space |
| ALIASES | Ω, outcome space |
| DIFFICULTY | developing |
| BLOOM | understand |
| MASTERY_THRESHOLD | 0.90 |
| ESTIMATED_HOURS | 2 |
| REQUIRES | math.found.set-theory |
| UNLOCKS | math.prob.probability-axioms |
| CROSS_LINKS | (none) |
| CPA_ENTRY | C (Concrete) |
| SESSION_TA_CAP | 7 (hours ≥ 1h) |
| PROTOCOL_A_TA_COUNT | 5 (TA-A01 through TA-A05) |
| MASTERY_GATE_TA | TA-A05 (P91, terminal) |
| PASS_CRITERION | 6/6 (⌈0.90 × 6⌉ = 6; threshold = 0.90) |
| MAMR | MC-1 SAMPLE-SPACE-OUTCOMES-LABELED is FOUNDATIONAL; cleared before MC-2 or MC-3 in all repair routing |
| P76_MODE | Independence (cross_links = []; self-contained real-world context) |

---

## Component 1 — Cognitive Map

### Prerequisites Activated
- **math.found.set-theory**: The sample space Ω IS a set. Set operations (union ∪, intersection ∩, complement, subset ⊆) apply directly to events (subsets of Ω). Cardinality of Ω determines whether the space is finite, countably infinite, or uncountable.

### Target Understanding
1. **Sample space** Ω = the set of ALL possible outcomes of a random experiment. Each element ω ∈ Ω is an elementary outcome (or sample point). No outcome is omitted and no outcome appears twice (Ω is a set, not a multiset).
2. **Types**: Finite (coin flip: Ω = {H, T}); countably infinite (count rolls until first 6: Ω = {1, 2, 3, …}); uncountable (uniform on [0,1]: Ω = [0, 1]).
3. **Event**: Any subset A ⊆ Ω. The empty set ∅ is the impossible event; Ω itself is the certain event.
4. **Set operations on events**: A ∪ B (A or B occurs), A ∩ B (both A and B), A^c = Ω \ A (A does not occur), A ∩ B = ∅ means A and B are mutually exclusive.
5. **Sample space depends on the question**: A die roll can have Ω = {1, 2, 3, 4, 5, 6} (if the question is about the number) or Ω = {odd, even} (if only parity matters). Different questions → different Ω.

### Cross-Link Activation
- No cross-links. P76 uses an independence probe (self-contained coin-flip experiment).

---

## Component 2 — Misconception Registry

### MC-1 [FOUNDATIONAL] — SAMPLE-SPACE-OUTCOMES-LABELED
- **Trigger**: "The sample space is just a list of what can happen" or ignoring that Ω is a SET with set operations.
- **Root cause**: Learner treats probability informally; "write down the possibilities" without the structure of set theory.
- **Error pattern**: Forgets to check whether all outcomes are included; uses the word "list" instead of "set"; tries to compute probabilities without the set-theoretic framework.
- **Repair**: TA-B01.
- **MAMR**: FOUNDATIONAL — addressed in TA-A02 via P41/P64; if triggered later, route to TA-B01 before returning.

### MC-2 — SAMPLE-SPACE-MUST-BE-FINITE
- **Trigger**: "You can't have infinitely many outcomes — probability wouldn't make sense" or refusing to accept Ω = ℝ or Ω = [0, 1].
- **Root cause**: Elementary probability uses only finite sample spaces (dice, cards, coins); learner over-generalizes.
- **Error pattern**: Rejects continuous random variables; cannot define sample space for "a randomly chosen real number in [0,1]"; believes uncountable Ω means individual outcomes have positive probability (confusion with finite case).
- **Repair**: TA-B02.
- **MAMR**: After MC-1 cleared. FIFO with MC-3.

### MC-3 — SAMPLE-SPACE-UNIQUE
- **Trigger**: "There is only one correct sample space for a given experiment."
- **Root cause**: School problems present unique Ω (e.g., "the sample space for a coin flip IS {H, T}"), giving the impression that Ω is fixed by the experiment, not by the question.
- **Error pattern**: Cannot choose between two valid Ω's depending on the question being asked; insists on the "most detailed" Ω for every problem even when it is unnecessary.
- **Repair**: TA-B03.
- **MAMR**: After MC-1 cleared. FIFO with MC-2.

---

## Component 3 — Scaffolding Protocol

### CPA Entry: Concrete
Open with a Concrete experiment (coin flip, die roll) and build Ω as a literal set. Move to Pictorial (Venn-diagram-like set pictures for event operations) in TA-A04. Reach Abstract (formal notation, countably infinite and uncountable Ω) in TA-A03.

### MAMR Enforcement
MC-1 addressed in TA-A02 (P41/P64). If triggered in later TAs, route → TA-B01 → return. MC-2 and MC-3 FIFO after MC-1 cleared.

---

## Component 4 — Protocol A (Main Teaching Sequence)

### TA-A01 — The Sample Space as a Universe of Possibilities
**Primitives**: P03 → P49

**P03 (ANALOGY BRIDGE):**
- **Source domain**: A library catalogue. Before you can find a book, the library must first define its entire COLLECTION — every book on every shelf. The catalogue is complete: it lists exactly all books that exist in the library.
- **Target domain**: The sample space Ω. Before assigning probabilities, you must define the complete set of all POSSIBLE outcomes. Ω is the "catalogue" of the experiment — every outcome that could happen, nothing missing, nothing duplicated.
- **Bridge**: Searching for P("the outcome is X") without defining Ω first is like searching for a book in a library without a catalogue — you don't know what's in the collection. Ω IS the collection.
- **Concrete example**:
  - Experiment: roll a standard 6-sided die once.
  - Ω = {1, 2, 3, 4, 5, 6}. Each element (1, 2, ..., 6) is an elementary outcome ω ∈ Ω.
  - This is a FINITE sample space with 6 elements.

**P49:** "A bag contains 3 red and 2 blue marbles. You draw one marble. Write Ω."
- **CORRECT**: Ω = {red₁, red₂, red₃, blue₁, blue₂} OR Ω = {red, blue} — depends on the question. If only color matters: {red, blue}. If individual marbles matter: {r₁, r₂, r₃, b₁, b₂}. → TA-A02.
- **PARTIAL**: "Both are valid depending on the question. Mention which assumption you're using." → TA-A02.
- **INCORRECT**: List the outcomes and connect to the question being asked. → TA-A02.
- **NO_RESPONSE**: Give both Ω's and explain why each is valid. → TA-A02.

---

### TA-A02 — Misconception Gate: SAMPLE-SPACE-OUTCOMES-LABELED (FOUNDATIONAL)
**Primitives**: P41 → P64 → P49

**P41 (MISCONCEPTION DETECTOR):**
Probe: "A student lists the outcomes of a coin flip as: Heads, Tails. They write P(Heads) = 1/2. Are they applying probability correctly, or is something missing?"
- If learner says **Nothing missing**: proceed to P64.
- If learner spots the missing set-theory structure: validate — then proceed to P64 to formalize.

**P64 (CONCEPTUAL SHIFT):**
"The student wrote the outcomes correctly, but informally. In formal probability, the sample space is a SET: Ω = {H, T}. This matters because:

1. **Events are SUBSETS**: 'Heads occurs' = the event A = {H} ⊆ Ω. 'Tails occurs' = B = {T} ⊆ Ω. 'At least one of H or T occurs' = A ∪ B = {H, T} = Ω (the certain event).

2. **Set operations give us free tools**: Complement of A = A^c = Ω \ {H} = {T}. P(A^c) = 1 − P(A) — this only works because we have a SET with a well-defined complement.

3. **Ω must be exhaustive**: Every possible outcome must be in Ω. If we forgot to include 'coin lands on its edge', our Ω would be incomplete and probabilities wouldn't sum to 1.

The 'list' intuition is almost right — but it must be formalized as a SET, so that all the machinery of set theory (union, intersection, complement, cardinality) applies directly to events."

**P49:** "For Ω = {1, 2, 3, 4, 5, 6} (die roll): (a) Write the event A = 'an even number appears' as a subset. (b) Write A^c."
- **CORRECT**: A = {2, 4, 6} ⊆ Ω. A^c = Ω \ A = {1, 3, 5}. → TA-A03.
- **PARTIAL**: Address whichever part was wrong. → TA-A03.
- **INCORRECT/NO_RESPONSE**: → TA-B01, then return.

---

### TA-A03 — Pattern Induction: Three Types of Sample Spaces
**Primitives**: P04 → P49

**P04 (PATTERN INDUCTION):**
Three experiments with increasing Ω complexity:

| Experiment | Sample Space Ω | Type | Cardinality |
|---|---|---|---|
| Flip a fair coin | {H, T} | Finite | 2 |
| Roll a die until first 6 | {1, 2, 3, 4, 5, …} = ℕ | Countably infinite | ℵ₀ |
| Pick a random real in [0, 1] | [0, 1] = {x ∈ ℝ : 0 ≤ x ≤ 1} | Uncountable | 2^ℵ₀ |

Pattern: Ω is ALWAYS a set of all possible outcomes. What varies is its size and structure.

Key observation about uncountable Ω: In the third experiment, P(ω) = 0 for each individual outcome ω ∈ [0, 1] — yet the experiment definitely produces some outcome! This is NOT a contradiction: when Ω is uncountable, we assign probabilities to EVENTS (measurable subsets A ⊆ Ω), not to individual points. For example, P([0, 0.5]) = 0.5 (half the interval).

**P49:** "For the experiment 'roll a die repeatedly until the first 6 appears,' write three elementary outcomes. Is Ω finite or infinite?"
- **CORRECT**: e.g., ω₁ = 1 (first roll is 6), ω₂ = 2 (first 6 on second roll: fail, 6), ω₃ = 3 (fail, fail, 6). Ω = ℕ = {1, 2, 3, …} — countably infinite. → TA-A04.
- **PARTIAL**: Confirm any three outcomes; address whether Ω is finite (it is not — you could theoretically roll 1,000,000 non-6s before the first 6). → TA-A04.
- **INCORRECT/NO_RESPONSE**: Walk through ω = k meaning "the first 6 appears on the k-th roll." → TA-A04.

---

### TA-A04 — Contrast Pair: Ω vs. Event; Finite vs. Infinite Ω
**Primitives**: P06 → P49

**P06 (CONTRAST PAIR PROMPT):**

Contrast A — Sample Space vs. Event:
| | Sample Space Ω | Event A |
|---|---|---|
| What it is | The universal set for the experiment | A subset A ⊆ Ω |
| Contains | All possible outcomes | Some (possibly zero) outcomes |
| Probability | P(Ω) = 1 (always) | P(A) ∈ [0, 1] |
| Role | Defines the "world" | Describes a "question" about the world |
| Example | Ω = {1,2,3,4,5,6} | A = {2,4,6} (even number) |

Contrast B — Finite vs. Infinite Ω:
| | Finite Ω | Countably Infinite Ω | Uncountable Ω |
|---|---|---|---|
| Example | {H, T} | {1, 2, 3, …} | [0, 1] |
| P(single outcome) | Can be > 0 | Can be > 0 | Usually = 0 |
| How to assign P | P(ω) for each ω, sum to 1 | P(ω) for each ω, series sums to 1 | Via probability density |
| Event cardinality | Finite subset | Can be finite or infinite | Measurable subset |

Mutual exclusivity and set operations:
- A ∩ B = ∅: A and B are mutually exclusive (cannot both occur simultaneously)
- A ∪ B: A or B occurs (at least one)
- A^c: A does not occur

Example: Ω = {1,2,3,4,5,6}. A = {1,2,3} (≤3), B = {4,5,6} (>3).
A ∩ B = ∅ (mutually exclusive). A ∪ B = Ω (together they cover everything). A^c = {4,5,6} = B.

**P49:** "Ω = {1, 2, 3, 4, 5, 6}. Let A = {2, 4, 6} and B = {1, 2, 3}. Find: A ∩ B; A^c; A ∪ B."
- **CORRECT**: A ∩ B = {2}; A^c = {1, 3, 5}; A ∪ B = {1, 2, 3, 4, 6}. → TA-A05.
- **PARTIAL**: Correct any subset calculation. → TA-A05.
- **INCORRECT/NO_RESPONSE**: Walk through each set operation on the concrete Ω. → TA-A05.

---

### TA-A05 — P91 Mastery Gate (Terminal)
**Primitive**: P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78

**[GR-3: Terminal TA]** **[GR-6: P91 terminal in this TA]** **[GR-7: P76 present]**

**P77 (MULTI-PROBLEM SET):**

Q1: A spinner has four equally-likely sectors labeled A, B, C, D. Write the sample space Ω.
Q2: For Ω = {A, B, C, D} from Q1, write the event E = "the result is A or B" as a subset. Is E ⊆ Ω? What is E^c?
Q3: True or False: The sample space for "flip a coin 3 times" must be listed as {H, T}. Explain.
Q4: An experiment consists of tossing a coin until the first Head appears. Is Ω finite or infinite? Give three elements of Ω using notation ω = number of tosses needed.
Q5: For Ω = {1, 2, 3, 4, 5, 6} (die roll), let A = {1, 2} and B = {2, 3, 4}. Are A and B mutually exclusive? Find A ∩ B and A ∪ B.

**P55 (SCORE):**
Q1: Ω = {A, B, C, D}.
Q2: E = {A, B} ⊆ Ω ✓. E^c = {C, D}.
Q3: FALSE. The correct Ω for three coin flips is {HHH, HHT, HTH, HTT, THH, THT, TTH, TTT} (8 outcomes, or equivalently all binary strings of length 3). {H, T} is only the sample space for ONE flip.
Q4: Infinite. ω₁ = 1 (H on first toss); ω₂ = 2 (TH, head on second); ω₃ = 3 (TTH); Ω = {1, 2, 3, …}.
Q5: NOT mutually exclusive: A ∩ B = {2} ≠ ∅. A ∪ B = {1, 2, 3, 4}.

**P76 (TRANSFER PROBE — Independence: cross_links = []):**

**Context**: A fair coin is flipped 3 times. Let the outcomes be written as sequences like HHT (first toss H, second H, third T).

**(a)** Write the complete sample space Ω for this experiment.
**(b)** Let event A = "exactly 2 heads appear." List the elements of A as a subset of Ω.
**(c)** Is A an elementary outcome or an event? Explain the distinction.
**(d)** What is A^c (the complement of A)? Write it as a subset of Ω.

**Expected answers**:
(a) Ω = {HHH, HHT, HTH, HTT, THH, THT, TTH, TTT} — 8 elements.
(b) A = {HHT, HTH, THH} — exactly 2 H's in the sequence.
(c) A is an EVENT (a subset of Ω with 3 elements), not an elementary outcome. An elementary outcome is a single element of Ω (e.g., HHT). "Exactly 2 heads" is a property shared by multiple outcomes — it describes a set of outcomes.
(d) A^c = Ω \ A = {HHH, HTT, THT, TTH, TTT} — 5 elements (0, 1, or 3 heads).

**P55 (SCORE):** Ω complete (8 elements); A correct (3 elements); event vs. outcome distinction stated; A^c correctly computed as Ω \ A.

**P75 (MASTERY ASSESSMENT):** Items: Q1, Q2, Q3, Q4, Q5, P76 = **6 items**.
Pass criterion: **6/6** (⌈0.90 × 6⌉ = 6; threshold = 0.90).
- **PASS (6/6)** → P78.
- **FAIL (< 6/6)** → P74 repair routing.

**P74 (ROUTING DECISION):**
- PASS → P78.
- Q1 wrong or Q2 wrong or Q3 wrong → TA-B01 (SAMPLE-SPACE-OUTCOMES-LABELED; apply MAMR).
- Q4 wrong → TA-B02 (SAMPLE-SPACE-MUST-BE-FINITE).
- Q5 wrong → TA-B01 (set-operation confusion in Ω).
- P76 wrong (part c especially) → TA-B01 (confusing elementary outcome with event).
- Q3 wrong in a specific way (claiming many valid Ω's wrong) → TA-B03 (SAMPLE-SPACE-UNIQUE).
- Multiple wrongs → MAMR: TA-B01 first; then FIFO TA-B02, TA-B03; re-gate.

**P78 (COMPLETION):** Mastery confirmed. Schedule P89. Activate: math.prob.probability-axioms. Children unlocked: math.prob.event, math.prob.probability-measure.

---

## Component 5 — Protocol B (Repair Chains)

### TA-B01 — Repair MC-1 SAMPLE-SPACE-OUTCOMES-LABELED
**Primitives**: P41 → P06 → P64 → P49

**P41**: "You listed the die outcomes as '1, 2, 3, 4, 5, 6.' Is this a list or a set? What's the difference?"

**P06 (CONTRAST PAIR PROMPT):**
| | "List of outcomes" (informal) | Sample space Ω (set-theoretic) |
|---|---|---|
| Duplicates allowed? | Possibly | No — sets have no duplicates |
| Order matters? | Possibly | No — sets are unordered |
| Complement defined? | Not without extra structure | A^c = Ω \ A always defined |
| Set operations | Not directly | ∪, ∩, \ all apply |

**P64**: "The REASON we define Ω as a SET (not just a list) is that set operations give us the mathematical machinery for probability. P(A^c) = 1 − P(A) only works because Ω is a set and A^c = Ω \ A is well-defined. Lists don't have complements; sets do."

**P49**: "For Ω = {H, T} (coin flip), is it possible for an outcome to appear twice in Ω? What is {H}^c?"
- **CORRECT**: No — sets have no duplicates. {H}^c = Ω \ {H} = {T}. → return.
- **PARTIAL/INCORRECT/NO_RESPONSE**: "Sets don't have duplicates. Complement: everything in Ω that's not in the given event." → return.

---

### TA-B02 — Repair MC-2 SAMPLE-SPACE-MUST-BE-FINITE
**Primitives**: P06 → P27 → P49

**P27**: "MC-2 SAMPLE-SPACE-MUST-BE-FINITE: the belief that probability only works for finite Ω. In fact, probability theory is fully developed for countably infinite and uncountable Ω — this is the foundation of continuous probability and random processes."

**P06 (CONTRAST):**
| Experiment | Ω | Finite? | Can assign P? |
|---|---|---|---|
| Roll a die | {1,2,3,4,5,6} | Finite (6) | ✓ Yes |
| Flip until first Head | {1, 2, 3, …} | Countably infinite | ✓ Yes (geometric distribution) |
| Uniform on [0,1] | [0, 1] ⊂ ℝ | Uncountable | ✓ Yes (via density) |

Key: for uncountable Ω, P({single point}) = 0 is not a problem — we assign probabilities to INTERVALS and measurable sets, not individual points.

**P49**: "Ω = [0, 1] (uniform distribution). What is P({0.5})? What is P([0, 0.5])?"
- **CORRECT**: P({0.5}) = 0 (single point has measure zero). P([0, 0.5]) = 0.5 (half the interval). → return.
- **PARTIAL/INCORRECT/NO_RESPONSE**: "Individual points have probability 0; intervals have probability = their length. This is how uniform probability works on ℝ." → return.

---

### TA-B03 — Repair MC-3 SAMPLE-SPACE-UNIQUE
**Primitives**: P27 → P06 → P49

**P27**: "MC-3 SAMPLE-SPACE-UNIQUE: believing there is only one correct Ω for a given experiment. In fact, the sample space is determined by the QUESTION you want to answer, not by the experiment alone. Different questions about the same physical setup lead to different valid sample spaces."

**P06 (CONTRAST):**
| Physical setup | Question asked | Ω chosen | Valid? |
|---|---|---|---|
| Roll one die | What number shows? | {1, 2, 3, 4, 5, 6} | ✓ |
| Roll one die | Is the result even? | {even, odd} | ✓ |
| Roll one die | Is the result ≥ 4? | {yes, no} | ✓ |
| Roll two dice | What are both numbers? | {(1,1),(1,2),…,(6,6)} | ✓ |
| Roll two dice | What is the sum? | {2, 3, …, 12} | ✓ |

Each row describes the same physical action; different Ω's are all valid, chosen to suit the question.

**P49**: "A bag has 3 red and 2 blue marbles. You draw one. Give two different valid sample spaces Ω depending on different questions."
- **CORRECT**: If question is "what color?": Ω = {red, blue}. If question is "which specific marble?": Ω = {r₁, r₂, r₃, b₁, b₂}. Both valid for different levels of detail. → return.
- **PARTIAL/INCORRECT/NO_RESPONSE**: "The finer-grained Ω = {r₁,r₂,r₃,b₁,b₂} and the coarser Ω = {red, blue} are both valid depending on the problem. Neither is 'wrong.'" → return.

---

## Component 6 — P89 Spaced Repetition Schedule

| Interval | Review Content | Pass Criterion |
|---|---|---|
| Day 1 | Q1 (write Ω) + Q2 (event and complement) | 2/2 |
| Day 3 | Q3 (3-flip Ω) + Q5 (set operations) | 2/2 |
| Day 7 | Mixed 3-item: write Ω for one experiment, classify outcome vs. event, compute A^c | 2/3 |
| Day 21 | Q1, Q2, Q3, Q4, Q5 (5 items) | 5/5 |
| Day 60 | Full 6-item mastery gate | 6/6 |

**Decay**: Failure → reset to Day 1 + TA-B routing by error type.

---

## Component 7 — Cross-Blueprint Dependencies

### Input Dependencies
| Blueprint | KG ID | What it supplies |
|---|---|---|
| Set Theory | math.found.set-theory | Set language (∈, ⊆, ∪, ∩, \ , ∅); Ω IS a set; events ARE subsets |

### Output Unlocks
| Blueprint | KG ID | What this blueprint enables |
|---|---|---|
| Probability Axioms | math.prob.probability-axioms | Kolmogorov's axioms assign probability to measurable subsets of Ω |

### Output Children
| Blueprint | KG ID | Relationship |
|---|---|---|
| Event | math.prob.event | An event is a subset A ⊆ Ω; requires Ω to be defined first |
| Probability Measure | math.prob.probability-measure | A function P: subsets of Ω → [0,1]; requires Ω |

### Cross-Links
- None. P76 uses an independent real-world context (3-coin-flip experiment).

---

## Component 8 — Teaching Notes

1. **Set theory is the foundation**: Emphasize that Ω is not "just a list" — it is a formal set. Every tool from set theory (union, complement, cardinality, subset) applies to events. This is what makes probability rigorous.
2. **Ω depends on the question**: This is the most useful practical insight. Always ask "what is the question?" before defining Ω. The same physical experiment can have many valid Ω's.
3. **Uncountable Ω is not a paradox**: When Ω = [0,1], individual outcomes have P = 0 — this is expected and not a contradiction. Only measurable subsets receive positive probability. Introduce this briefly without full measure theory.
4. **Certain vs. impossible events**: Ω is the certain event (P(Ω) = 1); ∅ is the impossible event (P(∅) = 0). These are useful boundary cases for all probability calculations.
5. **Bloom level**: UNDERSTAND — learner must be able to define Ω, identify events as subsets, compute complements and unions/intersections, and explain the role of Ω in probability.

---

## Component 10 — Validation Checklist

| Check | Criterion | Status |
|---|---|---|
| V-1 | Blueprint ID matches KG node ID | ✓ math.prob.sample-space |
| V-2 | KG node ID exists in graph.json v1.0.1 | ✓ Verified |
| V-3 | All Component 0 fields populated | ✓ |
| V-4 | DIFFICULTY matches KG (developing) | ✓ |
| V-5 | BLOOM matches KG (understand) | ✓ |
| V-6 | MASTERY_THRESHOLD matches KG (0.90) | ✓ |
| V-7 | ESTIMATED_HOURS matches KG (2) | ✓ |
| V-8 | REQUIRES listed; blueprint exists | ✓ math.found.set-theory ✓ |
| V-9 | CPA_ENTRY correct (developing → C) | ✓ C |
| V-10 | SESSION_TA_CAP correct (hours=2 ≥ 1h → max 7; used 5) | ✓ 5 ≤ 7 |
| V-11 | GR-1: non-repair TAs open with B-category primitive | ✓ A01:P03, A02:P41, A03:P04, A04:P06 |
| V-12 | GR-2: every non-gate TA has P49 | ✓ TA-A01 through TA-A04 |
| V-13 | GR-3: mastery gate TA is terminal | ✓ TA-A05 uses P91 |
| V-14 | GR-4: P41/P64 gates repair chain in TA-A02 | ✓ P41 detects MC-1 SAMPLE-SPACE-OUTCOMES-LABELED; P64 provides set-theoretic shift |
| V-15 | GR-6: P91 terminal in TA-A05 | ✓ |
| V-16 | GR-7: P76 in mastery gate | ✓ P76 independence probe (3-coin-flip) |
| V-17 | GR-8: cross_links documented | ✓ (none) — stated explicitly in Component 0 and Component 7 |
| V-18 | GR-9: P76 mode correct (cross_links=[] → independence probe) | ✓ P76 uses self-contained coin-flip context, no KG cross-link |
| V-19 | GR-10: MAMR stated and enforced | ✓ MC-1 FOUNDATIONAL; Component 0 and 2; P74 routing |
| V-20 | Protocol B TAs open with B-category primitive | ✓ B01:P41, B02:P06, B03:P27 |
| AIR | All content fully specified; human tutor can execute without AI | ✓ |

**PACKAGE_READY**: V-1 through V-20 PASS. AIR PASS.
