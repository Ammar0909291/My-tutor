# Teaching Blueprint: Event

## Component 0 — Metadata Header

| Field | Value |
|---|---|
| BLUEPRINT_ID | math.prob.event |
| KG_ID | math.prob.event |
| KG_VERSION | v1.0.1 |
| STATUS | PACKAGE_READY |
| DOMAIN | Probability |
| NAME | Event |
| ALIASES | (none) |
| DIFFICULTY | developing |
| BLOOM | understand |
| MASTERY_THRESHOLD | 0.90 |
| ESTIMATED_HOURS | 2 |
| REQUIRES | math.prob.sample-space |
| UNLOCKS | math.prob.probability-axioms |
| CROSS_LINKS | math.meas.sigma-algebra (non-Tier-1; not assessed) |
| CPA_ENTRY | C (Concrete) |
| SESSION_TA_CAP | 7 (hours ≥ 1h) |
| PROTOCOL_A_TA_COUNT | 4 (TA-A01 through TA-A04) |
| MASTERY_GATE_TA | TA-A04 (P91, terminal) |
| PASS_CRITERION | 5/5 (⌈0.90 × 5⌉ = 5; threshold = 0.90) |
| MAMR | MC-1 EVENT-IS-OUTCOME is FOUNDATIONAL; cleared before MC-2 or MC-3 in all repair routing |
| P76_MODE | Independence (cross_links=[math.meas.sigma-algebra] is non-Tier-1; self-contained real-world context) |

---

## Component 1 — Cognitive Map

### Prerequisites Activated
- **math.prob.sample-space**: Ω is the complete set of all possible outcomes of an experiment. An event A is a SUBSET of Ω — any collection of zero or more outcomes from Ω to which a probability can (in principle) be assigned.

### Target Understanding
1. An event A is any subset of the sample space Ω: A ⊆ Ω. It can contain zero, one, or many outcomes.
2. Special events: ∅ (impossible event — contains no outcomes) and Ω itself (certain event — contains all outcomes) are both valid events.
3. Complement A^c = Ω \ A: the set of all outcomes in Ω that are NOT in A. Every outcome in Ω belongs to exactly one of A or A^c.
4. Union A ∪ B: outcomes in A OR B (or both). Intersection A ∩ B: outcomes in both A AND B.
5. Mutually exclusive events: A ∩ B = ∅ (no shared outcomes). Mutually exclusive is a SPECIAL CASE, not a requirement for all events.
6. For finite and countably infinite Ω, every subset is a valid event.

### Cross-Link Activation
- **math.meas.sigma-algebra**: For uncountable Ω (continuous sample spaces), not every subset is an event — events must form a σ-algebra. This is advanced measure-theoretic probability, non-Tier-1, not assessed here. Mentioned only if the learner raises continuous sample spaces.

---

## Component 2 — Misconception Registry

### MC-1 [FOUNDATIONAL] — EVENT-IS-OUTCOME
- **Trigger**: "An event is a single outcome" or "event = one coin flip result."
- **Root cause**: Everyday English uses "event" to mean "a thing that happens" — a single occurrence. In probability, an event is a SET of outcomes that may contain many outcomes.
- **Error pattern**: When asked "list the event 'at least one head in 3 flips'," the learner names only HHH or says "it's just one flip." Does not collect all qualifying outcomes into a set.
- **Repair**: TA-B01.
- **MAMR**: FOUNDATIONAL — addressed in TA-A02 via P41/P64; if triggered later, route to TA-B01 before returning.

### MC-2 — EVENT-COMPLEMENT-ONE-OUTCOME
- **Trigger**: "The complement of {HH} in {HH,HT,TH,TT} is {TT}" (naming only the single "most opposite" outcome).
- **Root cause**: Learner interprets "complement" as "the opposite outcome" rather than "ALL remaining outcomes."
- **Error pattern**: For Ω = {HH,HT,TH,TT} and A = {HH}, says A^c = {TT} instead of {HT,TH,TT}.
- **Repair**: TA-B02.
- **MAMR**: After MC-1 cleared. FIFO with MC-3.

### MC-3 — EVENTS-MUST-PARTITION
- **Trigger**: "Events can't overlap — each outcome can belong to only one event at a time."
- **Root cause**: Learner is used to exhaustive mutually exclusive partitions (heads OR tails, not both) and incorrectly generalizes that ALL events must be mutually exclusive.
- **Error pattern**: Says "events {HH,HT} and {HH,TH} can't both be valid events because they share HH."
- **Repair**: TA-B03.
- **MAMR**: After MC-1 cleared. FIFO with MC-2.

---

## Component 3 — Scaffolding Protocol

### CPA Entry: Concrete
Open with physical poker chips or colored cards as outcomes (Concrete). Pictorial: Venn diagram with Ω as rectangle and event A as interior circle. Abstract: set notation A ⊆ Ω, A^c = Ω \ A, A ∪ B, A ∩ B.

### MAMR Enforcement
MC-1 addressed in TA-A02 (P41/P64). Route → TA-B01 if triggered later. MC-2 and MC-3 FIFO.

---

## Component 4 — Protocol A (Main Teaching Sequence)

### TA-A01 — Event as a Subset of the Sample Space
**Primitives**: P03 → P11 → P49

**P03 (ANALOGY BRIDGE):**
- **Source**: Six poker chips in a hat, labeled 1 through 6 (representing a die roll). Ω = {1,2,3,4,5,6}. You want the event "even number." You reach in and select chips 2, 4, and 6 — a GROUP of three chips. The event is not one chip; it is the WHOLE COLLECTION of chips satisfying "even."
- **Target**: Event A = {2,4,6} ⊆ Ω. An event is any subset — the specific collection of outcomes that satisfy the described condition.
- **Operations preview**: Chips NOT in A = {1,3,5} = A^c (the complement). Chips in A AND in "less than 4" = {2} = the intersection.

**P11 (REPRESENTATION SHIFT):**
Three representations of event A = "even number" in Ω = {1,2,3,4,5,6}:
| Representation | Form | Key feature |
|---|---|---|
| Set notation | A = {2, 4, 6} | Explicitly lists every outcome in A |
| Venn diagram | Circle labeled A inside rectangle Ω; 2,4,6 inside A; 1,3,5 outside | Interior = outcomes in A; exterior = A^c |
| Verbal | "Outcome is an even number" | Natural-language condition; fulfilled by 2, 4, and 6 |

**P49:** "Is {2, 4, 6} one outcome or multiple outcomes?"
- **CORRECT**: Multiple — {2,4,6} is a SET of three distinct outcomes. An event can contain many outcomes. → TA-A02.
- **PARTIAL**: "An event is a SUBSET: it can have 0, 1, 2, or more outcomes. Here A has 3." → TA-A02.
- **INCORRECT/NO_RESPONSE**: "Hold up three poker chips (2, 4, 6) — these are three separate chips, three outcomes. The event 'even' collects all three into one set." → TA-A02.

---

### TA-A02 — Misconception Gate: EVENT-IS-OUTCOME (FOUNDATIONAL)
**Primitives**: P41 → P64 → P49

**P41 (MISCONCEPTION DETECTOR):**
Probe: "In Ω = {HH, HT, TH, TT} (two coin flips), which outcomes belong to event 'at least one head'?"
- If learner names only one outcome (e.g., "HH"): proceed to P64.
- If learner correctly lists {HH, HT, TH}: validate and advance to TA-A03.

**P64 (CONCEPTUAL SHIFT):**
"An EVENT is a SUBSET of Ω — it collects EVERY outcome that satisfies the condition. 'At least one head' in {HH, HT, TH, TT}: check every ω:
- HH: has 2 heads ✓
- HT: has 1 head ✓
- TH: has 1 head ✓
- TT: has 0 heads ✗

Event = {HH, HT, TH} — THREE outcomes. An event is the WHOLE COLLECTION satisfying the condition, gathered into one set."

**P49:** "In Ω = {1,2,3,4,5,6}, list all outcomes in event B = 'number greater than 4'."
- **CORRECT**: B = {5, 6} — exactly the outcomes satisfying the condition. → TA-A03.
- **PARTIAL**: "Check each ω: 5 > 4 ✓; 6 > 4 ✓; all others ✗. So B = {5, 6}." → TA-A03.
- **INCORRECT/NO_RESPONSE**: → TA-B01, then return.

---

### TA-A03 — Complement, Union, and Intersection
**Primitives**: P06 → P49

**P06 (CONTRAST PAIR):**
| Operation | Symbol | Definition | Example: Ω={1..6}, A={2,4,6}, B={1,2,3} |
|---|---|---|---|
| Complement | A^c | All outcomes in Ω NOT in A | A^c = {1,3,5} |
| Union | A ∪ B | Outcomes in A OR B (or both) | A∪B = {1,2,3,4,6} |
| Intersection | A ∩ B | Outcomes in both A AND B | A∩B = {2} |
| Mutually exclusive | A∩B = ∅ | No shared outcomes | C={1,3}, D={2,4}: C∩D=∅ |

Key fact: A and A^c always partition Ω — every outcome in Ω belongs to exactly one of A or A^c, with no overlap and no gaps. |A| + |A^c| = |Ω|.

**P49:** "Ω = {HH, HT, TH, TT}. Event C = {HH, TT}. What is C^c?"
- **CORRECT**: C^c = {HT, TH} — the two outcomes in Ω not in C. → TA-A04.
- **PARTIAL**: "C^c = Ω \ C = {HH,HT,TH,TT} \ {HH,TT} = {HT,TH}." → TA-A04.
- **INCORRECT/NO_RESPONSE**: "Remove each outcome of C from Ω. HH removed, TT removed — what remains?" → TA-A04.

---

### TA-A04 — P91 Mastery Gate (Terminal)
**Primitive**: P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78

**[GR-3: Terminal TA]** **[GR-6: P91 terminal]** **[GR-7: P76 present]**

**P77 (MULTI-PROBLEM SET):**
Q1: True or False: An event in probability is always a single outcome.
Q2: Ω = {1,2,3,4,5,6}. Event A = {1,2,3}. What is A^c?
Q3: Same Ω. A = {2,4,6}, B = {1,2,3}. Find A∪B and A∩B.
Q4: Same Ω. Are events {1,3,5} and {2,4,6} mutually exclusive?

**P55 (SCORE):**
Q1: FALSE — an event is a SUBSET of Ω; it may contain zero, one, or many outcomes.
Q2: A^c = {4,5,6} — the outcomes in Ω not in A = {1,2,3}.
Q3: A∪B = {1,2,3,4,6}; A∩B = {2}.
Q4: Yes — {1,3,5} ∩ {2,4,6} = ∅; they share no outcomes, so they are mutually exclusive.

**P76 (TRANSFER PROBE — Independence):**
A weather forecaster models tomorrow's weather. Ω = {Sunny, Cloudy, Rainy, Stormy}.
(a) Define event W = "wet weather." List its outcomes. Is W a single outcome or a set?
(b) What is W^c?
(c) Event X = {Sunny, Cloudy}, event Y = {Cloudy, Rainy}. Are X and Y mutually exclusive?

**Expected**: (a) W = {Rainy, Stormy} — a SET of two outcomes, not a single outcome. (b) W^c = {Sunny, Cloudy}. (c) X ∩ Y = {Cloudy} ≠ ∅, so X and Y are NOT mutually exclusive (they share "Cloudy").

**P55 (SCORE):** W identified as a set; W^c = {Sunny, Cloudy} correct; X∩Y = {Cloudy} ≠ ∅ → not mutually exclusive.

**P75 (MASTERY ASSESSMENT):** Items: Q1, Q2, Q3, Q4, P76 = **5 items**. Pass: **5/5** (⌈0.90×5⌉ = 5).
- PASS → P78.
- FAIL → P74.

**P74 (ROUTING DECISION):**
- PASS → P78.
- Q1 wrong or P76(a) wrong → TA-B01 (EVENT-IS-OUTCOME; apply MAMR).
- Q2 or P76(b) wrong → TA-B02 (EVENT-COMPLEMENT-ONE-OUTCOME).
- Q4 or P76(c) wrong → TA-B03 (EVENTS-MUST-PARTITION).
- Q3 wrong → re-teach TA-A03 union/intersection with worked example; re-gate.
- Multiple → MAMR: TA-B01 first; FIFO TA-B02, TA-B03; re-gate.

**P78 (COMPLETION):** Mastery confirmed. Schedule P89. Activate: math.prob.probability-axioms.

---

## Component 5 — Protocol B (Repair Chains)

### TA-B01 — Repair MC-1 EVENT-IS-OUTCOME
**Primitives**: P41 → P06 → P64 → P49

**P41**: "You named one outcome — how many outcomes in Ω satisfy the condition? Should we collect all of them?"

**P06 (CONTRAST):**
| | Outcome (ω) | Event (A) |
|---|---|---|
| What it is | A single element: ω ∈ Ω | A subset: A ⊆ Ω |
| Example (die) | ω = 4 | A = {2, 4, 6} (even outcomes) |
| How many elements? | Exactly 1 | 0, 1, 2, … up to \|Ω\| |
| Is {ω} an event? | — | Yes — a singleton set {4} is a valid event |

**P64**: "An OUTCOME is one element of Ω. An EVENT is a COLLECTION — a subset. The event 'even' in {1,2,3,4,5,6} is the collection {2,4,6}: EVERY outcome that satisfies 'even.' You must check each ω and gather all that qualify."

**P49**: "In Ω = {1,2,3,4,5,6}, list all outcomes in event 'less than 4'."
- **CORRECT**: {1,2,3} — three outcomes, all satisfying the condition. → return.
- **PARTIAL/INCORRECT/NO_RESPONSE**: "Check each: 1<4 ✓, 2<4 ✓, 3<4 ✓, 4<4 ✗, 5<4 ✗, 6<4 ✗. Event = {1,2,3}." → return.

---

### TA-B02 — Repair MC-2 EVENT-COMPLEMENT-ONE-OUTCOME
**Primitives**: P06 → P27 → P49

**P27**: "MC-2 EVENT-COMPLEMENT-ONE-OUTCOME: 'A^c is just the one opposite outcome.' Wrong. A^c = Ω \ A = EVERY outcome in Ω that is NOT in A. If Ω = {HH,HT,TH,TT} and A = {HH}, then A^c = {HT,TH,TT} — ALL three non-HH outcomes, not just TT. You must remove A from Ω and take everything that remains."

**P06 (CONTRAST):**
| | A = {HH} in Ω = {HH,HT,TH,TT} | Correct A^c | MC-2 wrong answer |
|---|---|---|---|
| Rule | — | Ω \ A: remove A, keep the rest | "The opposite of HH is TT" |
| Result | — | {HT, TH, TT} | {TT} — misses HT and TH |
| \|A^c\| | — | 3 (= 4 − 1) | 1 (wrong) |

**P49**: "Ω = {a,b,c,d,e}. A = {a,c}. What is A^c?"
- **CORRECT**: A^c = {b,d,e} — all elements of Ω not in A. → return.
- **PARTIAL/INCORRECT/NO_RESPONSE**: "Remove a and c from Ω = {a,b,c,d,e}. What's left? → {b,d,e} = A^c. Count check: |A^c| = 5 − 2 = 3." → return.

---

### TA-B03 — Repair MC-3 EVENTS-MUST-PARTITION
**Primitives**: P27 → P06 → P49

**P27**: "MC-3 EVENTS-MUST-PARTITION: 'Events can't share outcomes.' Wrong. An EVENT is ANY subset of Ω — overlapping events are perfectly valid. A = {1,2,3} and B = {2,3,4} are both valid events in Ω = {1,2,3,4,5,6}, and A∩B = {2,3} ≠ ∅. Mutually exclusive (no overlap) is a SPECIAL CASE that we CHECK for — it is not required of all events."

**P06 (CONTRAST):**
| | General events (any subsets) | Mutually exclusive (special case) |
|---|---|---|
| Overlap allowed? | Yes — A∩B can be any subset of Ω | No — A∩B = ∅ required |
| Example of overlap | A={1,2}, B={2,3}: A∩B={2} | A={1,3}, B={2,4}: A∩B=∅ |
| Both valid events? | Yes | Yes (and they also happen to not overlap) |

**P49**: "Ω = {HH,HT,TH,TT}. A = {HH,HT}, B = {HT,TH}. Are A and B both valid events? Are they mutually exclusive?"
- **CORRECT**: Both A and B are valid events (any subset of Ω is valid). They are NOT mutually exclusive: A∩B = {HT} ≠ ∅. → return.
- **PARTIAL/INCORRECT/NO_RESPONSE**: "Any subset is a valid event — A and B are fine. A∩B = {HT} means they share HT, so not mutually exclusive." → return.

---

## Component 6 — P89 Spaced Repetition Schedule

| Interval | Review Content | Pass Criterion |
|---|---|---|
| Day 1 | Q1 (event definition) + Q2 (complement) | 2/2 |
| Day 3 | Q3 (union + intersection) + P76 (a) | 2/2 |
| Day 7 | Mixed 2-item: list all outcomes of a verbal event; find complement | 2/2 |
| Day 21 | Q1, Q2, Q3, Q4 (4 items) | 4/4 |
| Day 60 | Full 5-item mastery gate | 5/5 |

**Decay**: Failure → reset to Day 1 + TA-B routing.

---

## Component 7 — Cross-Blueprint Dependencies

### Input Dependencies
| Blueprint | KG ID | What it supplies |
|---|---|---|
| Sample Space | math.prob.sample-space | The set Ω of all possible outcomes; an event is defined as a subset of Ω |

### Output Unlocks
| Blueprint | KG ID | What this blueprint enables |
|---|---|---|
| Probability Axioms | math.prob.probability-axioms | Probability is a function P that assigns a number in [0,1] to each event A ⊆ Ω |

### Cross-Links
- **math.meas.sigma-algebra**: For uncountable Ω, events must form a σ-algebra. Non-Tier-1; not assessed in this blueprint.

---

## Component 8 — Teaching Notes

1. **σ-algebra**: The cross-link to math.meas.sigma-algebra appears in the KG description. Do NOT introduce σ-algebras at this stage — they are advanced measure theory, non-Tier-1. If a learner asks "what about continuous sample spaces?", acknowledge that the structure becomes more subtle (σ-algebra), but defer the full treatment.
2. **Empty event and certain event**: ∅ and Ω are both events. Mention them briefly if they arise in discussion; they will become important as "probability 0" and "probability 1" cases in math.prob.probability-axioms.
3. **Notation discipline**: Use lowercase ω for outcomes and uppercase A, B for events. Reinforce this consistently — it prevents MC-1 recurrence.
4. **Bloom=understand**: Learners must correctly APPLY set operations (complement, union, intersection) to novel events, not just recite definitions. Q3 and P76 provide this application surface.

---

## Component 10 — Validation Checklist

| Check | Criterion | Status |
|---|---|---|
| V-1 | Blueprint ID matches KG node ID | ✓ math.prob.event |
| V-2 | KG node ID exists in graph.json v1.0.1 | ✓ Verified |
| V-3 | All Component 0 fields populated | ✓ |
| V-4 | DIFFICULTY matches KG (developing) | ✓ |
| V-5 | BLOOM matches KG (understand) | ✓ |
| V-6 | MASTERY_THRESHOLD matches KG (0.90) | ✓ |
| V-7 | ESTIMATED_HOURS matches KG (2) | ✓ |
| V-8 | REQUIRES listed; blueprint exists | ✓ math.prob.sample-space ✓ |
| V-9 | CPA_ENTRY correct (developing → C) | ✓ C |
| V-10 | SESSION_TA_CAP correct (hours=2 ≥ 1h → max 7; used 4) | ✓ 4 ≤ 7 |
| V-11 | GR-1: non-repair TAs open with B-category primitive | ✓ A01:P03, A02:P41, A03:P06 |
| V-12 | GR-2: every non-gate TA has P49 | ✓ TA-A01, TA-A02, TA-A03 |
| V-13 | GR-3: mastery gate TA is terminal | ✓ TA-A04 uses P91 |
| V-14 | GR-4: P41/P64 gates repair chain in TA-A02 | ✓ P41 detects MC-1; P64 shifts single-outcome→subset |
| V-15 | GR-6: P91 terminal in TA-A04 | ✓ |
| V-16 | GR-7: P76 in mastery gate | ✓ P76 independence probe (weather forecast) |
| V-17 | GR-8: cross_links documented | ✓ math.meas.sigma-algebra (non-Tier-1) — stated in Component 0 and Component 7 |
| V-18 | GR-9: P76 mode correct (cross_link non-Tier-1 → independence probe) | ✓ |
| V-19 | GR-10: MAMR stated and enforced | ✓ MC-1 FOUNDATIONAL; P74 routing |
| V-20 | Protocol B TAs open with B-category primitive | ✓ B01:P41, B02:P06, B03:P27 |
| AIR | All content fully specified; human tutor can execute without AI | ✓ |

**PACKAGE_READY**: V-1 through V-20 PASS. AIR PASS.
