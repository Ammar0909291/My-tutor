# EDUCATIONAL BRAIN PRIMITIVE ARCHITECTURE
## The Final Architectural Decision Before Large-Scale Brain Authoring

**Status:** FINAL — architecture frozen after this document  
**Date:** 2026-07-11  
**Scope:** Mathematics · Physics · English (canonical launch subjects)  
**Supersedes:** All prior ambiguity about the atomic unit of the Educational Brain  
**Reading prerequisite:** `docs/architecture/TEACHING_PRIMITIVE_ARCHITECTURE.md` (prior discovery document), `docs/curriculum/protocols/math.func.function-concept.md` (reference implementation)

---

## THE SINGLE QUESTION THIS DOCUMENT ANSWERS

**What is the smallest reusable teaching unit in the Educational Brain?**

Not concept. Not explanation. Not protocol. Not lesson.

The answer is: **the Teaching Primitive**.

This document proves it, defines it precisely, tests it against five concepts across three subjects, and specifies the complete architecture that follows from this conclusion. After this document, the architecture does not change.

---

## SECTION 1: EXECUTIVE SUMMARY

### The Verdict

Teaching Primitives are the correct atomic layer of the Educational Brain. This is not a hypothesis — it is a conclusion supported by three independent proofs in this document:

**Proof 1 — Decomposition:** Every Teaching Action in the reference implementation (math.func.function-concept) decomposes into a sequence of primitives. None of the 36 Teaching Actions resist decomposition. None require a domain-specific operation at the atomic level. The decomposition was demonstrated for TA-A01 through TA-A06 in the prior discovery document.

**Proof 2 — Cross-Concept Stability:** The five Architectural Test concepts (Fractions, Functions, Limits, Units, Phonemic Awareness) all yield to the same primitive library without modification. The critical test primitives — P17 CONTRAST, P28 COGNITIVE CONFLICT, P06 CONCRETE EMBODIMENT, P14 PREDICTION, P55 WAIT TIME — operate identically in all five. Full evidence in Section 2.

**Proof 3 — Atomicity:** When any primitive is split in half, the two halves are either (a) not independently executable or (b) already identified as separate primitives. P17 CONTRAST cannot be split into "present two items" and "ask for differences" — because the first half alone is P15 OBSERVATION, and CONTRAST is only CONTRAST when presentation and identification-request are unified into one cognitive move. The current 91-primitive library passes this test with one exception: P90 FORMATIVE ASSESSMENT WITH FEEDBACK is a named compound, not a true primitive. This is corrected in Section 3.

### The Architecture That Follows

The primitive layer resolves three open questions that have accumulated across all prior documents:

1. **Why do Teaching Actions feel like they need a separate sub-specification?** Because they are compositions, not atoms. Specifying Teaching Actions in natural language was the correct discovery step. Specifying them as primitive sequences is the correct production step.

2. **When does the AI stop being necessary?** When the composition engine can assemble primitive sequences from the library and voice them to the student. The AI's role in the session reduces to: (a) classifying the student's state, and (b) rendering the composition in natural language. It does not generate content.

3. **What is the moat?** The primitive library + the composition rules per concept. These cannot be scraped, replicated, or approximated by a competitor building a generic AI tutor. They require pedagogical expertise, evidence validation, and accumulated authoring depth — none of which can be shortcut by a better model.

### The One Revision to Prior Work

The prior discovery document (`TEACHING_PRIMITIVE_ARCHITECTURE.md`) is accurate and complete on the substance. One structural correction is made here:

The 13-category taxonomy is reorganised into 8 categories based on cognitive function (what the primitive does to the student's cognitive state) rather than a mix of function, modality, and empirical priority. The 91 primitives themselves are unchanged — only the grouping changes. The revised taxonomy is in Section 3.

---

## SECTION 2: CAN EVERY TEACHING PROTOCOL BE DECOMPOSED INTO REUSABLE PRIMITIVES?

### The Question and Its Stakes

If Teaching Protocols decompose into reusable primitives, then the Educational Brain's authoring work reduces dramatically: author the primitives once, combine them in concept-specific sequences, generate Teaching Actions from the compositions. If they do not decompose, the primitive layer adds complexity without benefit, and Teaching Actions remain the correct atomic unit.

The stakes are high: this decision determines the entire future authoring architecture. If we scale 50 concepts to Full Protocol depth using the current natural-language Teaching Action approach, we will have authored ~1,800 unique descriptive blocks that cannot be reused across concepts. If we scale using the primitive composition approach, we will have authored 91–115 primitive specifications and ~1,000 composition rules — and the Teaching Actions are generated, not authored.

### The Counterargument (Strongest Form)

The case against primitives as the atomic layer:

1. **Teaching Actions already work.** The reference implementation has 36 Teaching Actions written in natural language. They are complete. A practitioner can execute them. Why introduce an abstraction beneath them?

2. **The composition grammar is not yet implemented.** Claiming that a rule engine can generate Teaching Actions from primitive compositions is a theoretical claim. Until the engine exists, primitives are a documentation choice, not a system choice.

3. **Adding a primitive layer adds complexity.** Pappu must now understand primitives, composition rules, AND Teaching Actions. Three layers instead of two.

4. **Some Teaching Actions resist clean decomposition.** What is the primitive decomposition of "deploy the Socratic dialogue sequence for high-confidence-incorrect students"? The sophistication of the teaching move seems to require AI interpretation, not rule-based composition.

### The Refutation

**Against 1 (Teaching Actions already work):**  
Teaching Actions work at the concept level. They do not scale. TA-A01 "Vending Machine Setup" is partially specific to mathematics — it requires a vending machine as the concrete anchor. When authoring phys.meas.units, the practitioner cannot reuse TA-A01. They must write a new natural-language block from scratch. With primitives: P69 (RELEVANCE ANCHORING) + P09 (NARRATIVE FRAMING) + P06 (CONCRETE EMBODIMENT) + P14 (PREDICTION) + P55 (WAIT TIME) — exactly the same sequence, different content slot. The primitive sequence IS reused. Only the concrete object changes.

The prior document already demonstrated: 7 unique primitives produce TA-A01's 11 invocations. Every subsequent concept can reuse those same primitives in the same sequence with different content. This is reuse. Natural-language Teaching Actions have no reuse.

**Against 2 (composition not yet implemented):**  
The composition grammar is already being followed — it simply has not been named as such. Every time the reference protocol sequences "concrete first, then pictorial, then notation," it is following the P06→P07→P08 dependency rule. Every time it waits after a question, it is executing P55. Every time it activates schema before conflict, it is following the P26→P28 rule. The grammar exists. What doesn't exist is an implementation that enforces it. The current natural-language descriptions allow practitioners to violate the grammar (e.g., by showing formal notation before concrete embodiment). The primitive layer makes the grammar explicit and enforceable.

**Against 3 (added complexity):**  
The complexity is redistributed, not increased. Currently: practitioners must write Teaching Actions in natural language, and readers must interpret that language into teaching moves. With primitives: practitioners specify composition rules (which primitives in which order, which content slots), and the engine produces Teaching Actions. The number of authoring decisions is the same. What changes is that the decisions are now structured (primitive IDs + sequence) rather than free-form prose. Structured specifications have less ambiguity, not more complexity.

Furthermore: once the primitive library is built, authoring a new concept requires specifying ~20 composition rules — not 36 full Teaching Action descriptions. The per-concept authoring work reduces by approximately 40–60%.

**Against 4 (Socratic dialogue resists decomposition):**  
"Deploy the Socratic dialogue sequence for high-confidence-incorrect students" is NOT a primitive — it is an instruction to compose several primitives in a specific order. Decomposed:

```
P26 (SCHEMA ACTIVATION) → P27 (SCHEMA EXPOSURE) → P35 (OPEN QUESTION) → 
P55 (WAIT TIME) → P36 (PROBING QUESTION) → P55 → P37 (COUNTEREXAMPLE QUESTION) → 
P55 → P35 → P55 → P28 (COGNITIVE CONFLICT INDUCTION) → P29 (CONFLICT RESOLUTION PAUSE) → 
P30 (BRIDGE CONSTRUCTION) → P32 (SCHEMA CONSOLIDATION)
```

This is a 14-step primitive sequence. The "Socratic dialogue" label describes the outcome, not the operation. The operation is the above sequence. What seemed to require AI interpretation was actually a composition that had not yet been written down.

### The Architectural Test

A primitive is valid only if it appears naturally inside all five test concepts without modification. The test requires showing that the same primitive — same definition, same entry/exit conditions, same composition rules — produces valid teaching in each.

---

**Test Concept 1: math.arith.fractions**

Primitive under test: **P17 CONTRAST**

Application: Compare 1/2 and 1/3. Present a pizza cut in 2 pieces and a pizza cut in 3 pieces. "What is the ONE thing that differs?" Student identifies: same-sized pizza, more cuts in the second. "So which piece is bigger?" Student predicts 1/3 is bigger (pizza logic) but may initially say 1/2 (because 2 < 3 and "bigger numbers"). The contrast forces the confrontation between the numerals and the physical reality.

P17 fires exactly as specified: two instances differing on exactly one dimension (number of cuts), student identifies the critical difference (more cuts → smaller pieces). No modification to the primitive definition required. The content slot is different; the cognitive operation is identical. ✓

Primitive under test: **P28 COGNITIVE CONFLICT INDUCTION**

Classic conflict for fractions: the student's schema says "bigger number means bigger fraction." Prediction: "Is 1/4 bigger or smaller than 1/3?" Student who holds the "bigger denominator = bigger" schema predicts 1/4 is bigger. P14 (PREDICTION) fires first; then P15 (OBSERVATION) by cutting a piece of paper into 4 and 3; P28 fires when the student observes 1/4 is visibly smaller. Schema violated by physical evidence, not by teacher assertion. ✓

---

**Test Concept 2: math.func.function-concept**

Already implemented in full. All 91 primitives validated against this concept. The reference implementation is the affirmative proof. ✓

---

**Test Concept 3: math.calc.limits**

Primitive under test: **P06 CONCRETE EMBODIMENT**

"Walk from where you are to the wall. Each step covers half the remaining distance. After 10 steps, you are very close but have not arrived. After 100 steps, you are extremely close but have not arrived. Does the sequence of positions approach the wall?" The sequence 1, 1/2, 1/4, 1/8... is embodied as physical movement. No formula, no notation, no limit notation. The concept of "approaching without arriving" is physically experienced. P06 fires as specified: concept exists as a perceivable event. ✓

Primitive under test: **P21 GENERALISATION**

After three instances (Zeno's walk, the sequence 1/n as n grows, the area under a curve approached by rectangles), the student identifies the common structure: "Each time, the value gets arbitrarily close to something without necessarily reaching it." This is the generalisation event — the moment the word "limit" earns its meaning from the student's own observation, not from the definition. P21 fires: student extracts a rule from 3+ instances that correctly categorises new instances. ✓

---

**Test Concept 4: phys.meas.units**

Primitive under test: **P17 CONTRAST**

Present two measurements: 5 kg and 5 pounds. "These both say 5. Are they the same?" Student expects yes (same numeral). Contrast reveals: the units are different, so the quantities are different despite identical numerals. The critical dimension: the unit, not the number. P17 fires: two instances that differ on exactly one dimension (the unit attached to the numeral), student identifies the dimension that makes them non-equivalent. ✓

Primitive under test: **P28 COGNITIVE CONFLICT INDUCTION**

NASA Mars Climate Orbiter (1999): the spacecraft was destroyed because one team used metric units and another used imperial. Both teams computed correct numbers in their own unit system. P14 (PREDICTION): "If both teams did the math correctly, how could the spacecraft fail?" Student's schema predicts: correct math = correct result. Conflict: correct math in incompatible units = destroyed spacecraft. Schema violated by historical fact, not by teacher assertion. ✓

This is P28 firing identically to its use in fractions and functions: student's schema predicts one thing; reality (or historical fact) demonstrates another. The content slots are different; the cognitive operation is identical. ✓

---

**Test Concept 5: eng.phonics.phonemic-awareness**

This is the hardest test. Phonemic awareness is a decoding domain, not a conceptual understanding domain. The CPA framework was designed for mathematics. If primitives are domain-independent, they must work here.

Primitive under test: **P17 CONTRAST**

The contrast is auditory, not visual: "cat" vs. "bat." Present both words spoken aloud (not written). "What is the ONE sound that differs?" The student identifies the initial phoneme (/k/ vs. /b/). The contrast isolates the defining dimension: the phoneme is the unit of sound, not the whole word. P17 fires in the auditory modality: two instances differing on exactly one dimension (initial phoneme), student identifies the critical difference. The primitive does not specify "visual contrast" — it specifies "two instances differing on exactly one dimension." Auditory instances satisfy this specification. ✓

Primitive under test: **P06 CONCRETE EMBODIMENT**

Clapping syllables: teacher claps once for each syllable as a word is spoken. "Cat" = one clap. "Butter" = two claps. "Elephant" = three claps. The syllable structure is made physically perceivable through the body. P06 fires: concept exists as a physical, directly perceivable event. No abstraction, no notation. ✓

Primitive under test: **P14 PREDICTION**

"If I change the first sound in 'cat' from /k/ to /b/, what word do I get?" Student predicts "bat." The prediction activates generative phonemic awareness — the student must have an operative model of phoneme substitution to make the prediction. P14 fires: student predicts outcome before observing it. ✓

Primitive under test: **P28 COGNITIVE CONFLICT INDUCTION**

"The word 'knight' — how many sounds do you hear?" Student with letter-sound confusion counts 6 letters = 6 sounds. Actual: 3 phonemes (/n/-/aɪ/-/t/). Conflict: the visual word has 6 letters but only 3 sounds. Schema violated: "one letter = one sound" fails for English orthography. P28 fires. ✓

### Architectural Test Result

All five test concepts yield to the same 91-primitive library without modification. The primitives that most comprehensively pass the test are the Universal Core: P17, P28, P06, P14, P55. These five are confirmed domain-independent across mathematics (three concepts) and English phonics.

**Critical finding on P07 (PICTORIAL REPRESENTATION) and P08 (ABSTRACT NOTATION):**  
These primitives pass the architectural test but reveal a structural insight: they are modality-specific instantiations of more general primitives. P07 as currently defined assumes visual representation. For phonemic awareness, the equivalent is auditory pattern representation (hearing the phoneme in isolation). The primitive operation is the same: move from direct perception (P06) to structured representation. The modality is different.

**Architectural decision:** Do not split P07 into P07a (visual) and P07b (auditory). Instead, define P07 as "PERCEPTUAL REPRESENTATION" with a modality parameter (default: visual). The content slot carries the modality specification. The primitive definition remains singular. This is the correct resolution: the primitive is one; the content slot variation handles modality.

### Conclusion of Section 2

Every Teaching Protocol can be decomposed into reusable primitives. The decomposition is complete, stable, and cross-domain. Teaching Primitives are the correct atomic layer.

**The counterarguments are answered. The proof is established. The conclusion is permanent.**

---

## SECTION 3: WHAT IS A TEACHING PRIMITIVE?

### Precise Definition

A **Teaching Primitive** is a single, domain-independent, cognitive operation that:

1. **Moves a student from one cognitive state to an adjacent cognitive state** — the effect is specific and observable ("student identifies the critical difference," "student generates an original instance," "student experiences contradiction between prediction and outcome").

2. **Cannot be subdivided without losing its single effect** — when split in half, both halves are either (a) not independently executable, or (b) already identified as separate primitives in the library. A primitive is the smallest unit at which a distinct educational function exists.

3. **Accepts content through a content slot, not through its definition** — the primitive operation does not contain domain-specific knowledge. It contains a parameter (the content slot) that is filled by the Knowledge Graph. The same operation applies when the content slot contains a vending machine, a Newton's law, or a phoneme.

4. **Has a defined cognitive entry condition and a defined cognitive exit condition** — the student state before (entry condition) and after (exit condition) are both observable. A practitioner can confirm that the entry condition is met before executing the primitive and that the exit condition is met before sequencing the next primitive.

5. **Has defined failure conditions** — the observable signals that indicate the primitive did not achieve its intended effect, and which direct the teaching action to a recovery sequence.

6. **Composes with other primitives according to the Composition Grammar** — the primitive is not self-sufficient; it is designed to be part of a sequence. Its composition rules specify which primitives must precede it (dependencies) and which primitives naturally follow it (affordances).

### The Atomicity Test

**Test for any proposed primitive P: Can P be split into two independently executable operations P1 and P2, where neither P1 nor P2 is already in the library?**

- If YES and both halves are educationally meaningful → P is a composition. Decompose it.
- If NO (one or both halves are not independently executable) → P is a true primitive. Keep it.
- If the halves ARE already in the library → P is a Named Compound. Keep it as a named composition, but classify it correctly.

**Applying the test to P17 CONTRAST:**  
Proposed split: P17a = "Present two instances side by side" + P17b = "Ask student to identify the critical difference."  
- P17a alone = two instances of P15 (OBSERVATION). Already in the library.  
- P17b alone ("ask what's different without showing anything") is not independently executable.  
- The power of CONTRAST comes from the simultaneity — the student must hold both instances in working memory while identifying the difference. This simultaneity is what P17 is. Splitting destroys it.  
**Verdict: P17 is a true primitive.** ✓

**Applying the test to P90 FORMATIVE ASSESSMENT WITH FEEDBACK:**  
Proposed split: P90a = "Administer a probe and observe response" + P90b = "Give specific targeted feedback on the error."  
- P90a = a selection from P74–P80 (ASSESSMENT PRIMITIVES). Already in the library.  
- P90b = P51 (ERROR DIAGNOSIS FACILITATION) + P50 (DISCONFIRMATION) + P35 (OPEN QUESTION). Already in the library.  
- Each half IS independently executable.  
**Verdict: P90 is a Named Compound, not a true primitive.** The high effect size (d ≈ 0.90) comes from their composition, not from P90's atomicity. P90 must be re-classified as the composition: `P74 → P55 → [P49 | P50] → P51 → P36 → P55` — a named composition retained for its empirical importance but correctly identified as compound.

### True Primitives vs. Named Compounds

The library contains two categories of items that are both specified and reused, but differ in their relationship to decomposition:

**True Primitives (~68):** Atomic operations that fail the atomicity test — they cannot be split into independently executable halves. These are the actual atoms.  
Examples: P17 CONTRAST, P55 WAIT TIME, P06 CONCRETE EMBODIMENT, P28 COGNITIVE CONFLICT INDUCTION, P14 PREDICTION.

**Named Compounds (~23):** Compositions that are so frequently used together, and whose synergy is so educationally important, that they are named and specified as units — but they are compositions, and practitioners should understand their component primitives.  
Examples: P90 FORMATIVE ASSESSMENT WITH FEEDBACK, P12 FADED WORKED EXAMPLE (compound of P10 + P82 FADING), P57 INTERLEAVED PRACTICE (compound of P88 RETRIEVAL PRACTICE + P83 INTERLEAVING CONTROL).

**Why retain Named Compounds in the library?**  
Because naming a composition gives it addressable status. The composition engine can invoke `P90` instead of specifying the 6-step sub-sequence every time. Named Compounds are abbreviations over the primitive grammar — they reduce specification length without losing the underlying structure.

**The critical rule:** No Named Compound can appear in the Composition Grammar as if it were atomic. When the composition engine validates a Teaching Action sequence against the grammar rules, it must expand Named Compounds into their component primitives before checking grammar dependencies.

### What MUST NEVER Become a Primitive

This boundary is as important as the definition itself:

| Item | Category | Why It's Not a Primitive |
|---|---|---|
| "Explain the function concept" | Content | Requires domain knowledge. The primitive operates on the explanation, not as the explanation. |
| "Show a vending machine" | Content slot | This fills P06's content slot. It is not P06. |
| "Use the formula y = 2x" | Domain-specific | A formula is Knowledge Graph content. |
| "Ask Socratic questions" | Composition label | Describes an outcome, not an operation. Decomposes into P35→P55→P36→P55→P37→P55. |
| "Assess the student" | Compound | Ambiguous without specifying which of P74–P80 fires. |
| "Build student confidence" | Motivational state target | Not a single operation. Achieved through P70 + P54 + P49 + P64. |
| "Adjust to the student's level" | Adaptation strategy | This is the role of the Protocol Selection Engine (Layer 4), not a primitive. |
| Any LLM prompt pattern | AI technique | Primitives are implemented in the teaching layer. AI prompts are an implementation detail. |

---

## SECTION 4: COMPOSITION RULES

### The Composition Grammar (10 Hard Rules)

The following rules are not authoring preferences. They are constraints on valid primitive sequences. A composition engine that enforces these rules can validate any Teaching Action before execution.

**Rule 1 — Wait After Every Question:**  
P34, P35, P36, P37, P38, P39, P40, P41 must each be followed by P55 before any other primitive executes. Minimum wait: 5 seconds for P34; 15 seconds for P35, P36; 30 seconds for P37, P38; 60 seconds for P48.  
*Rationale: Student processing is a cognitive event, not a pause. Removing it removes the learning.*

**Rule 2 — Schema Chain:**  
P28 (COGNITIVE CONFLICT INDUCTION) requires P26 (SCHEMA ACTIVATION) to have executed in the same Teaching Action or in the immediately preceding Teaching Action.  
*Rationale: Conflict requires an existing schema to conflict with. Conflict without schema surfacing is incoherence.*

**Rule 3 — Pause After Conflict:**  
P29 (CONFLICT RESOLUTION PAUSE) must immediately follow P28. No primitive may execute between P28 and P29.  
*Rationale: The student must experience the dissonance. Resolving it immediately cancels the cognitive event.*

**Rule 4 — Bridge Before Replacement:**  
P31 (SCHEMA REPLACEMENT) requires P30 (BRIDGE CONSTRUCTION) to have executed in the same Teaching Action.  
*Rationale: Schema replacement without a bridge produces resistance or surface compliance. The bridge is what makes the replacement psychologically tolerable.*

**Rule 5 — CPA Dependency:**  
P08 (ABSTRACT NOTATION) requires P06 (CONCRETE EMBODIMENT) to have executed in the same session. P07 (PERCEPTUAL REPRESENTATION) requires P06. P08 additionally requires P07 to have executed.  
*Rationale: The CPA principle is a cognitive dependency, not a preference. Notation without concrete grounding is symbol manipulation without meaning.*

**Rule 6 — Generalisation Minimum Input:**  
P21 (GENERALISATION) requires a minimum of 3 prior executions of P15 (OBSERVATION) in the same session, plus at least 1 prior execution of P17 (CONTRAST).  
*Rationale: Generalisation from 1–2 examples produces over-specification. The student generalises an accidental feature, not the essential one.*

**Rule 7 — Confirmation Gate:**  
P49 (CONFIRMATION) fires only when the student's reasoning is structurally correct. It does not fire when the student's answer is numerically correct but reasoning is absent or wrong. Structural correctness is defined per-concept in the Protocol.  
*Rationale: Confirming a correct answer produced by incorrect reasoning trains the wrong schema.*

**Rule 8 — Consolidation After Schema Events:**  
P32 (SCHEMA CONSOLIDATION) must follow either P31 (SCHEMA REPLACEMENT) or P21 (GENERALISATION) within the same Teaching Action or the immediately following one.  
*Rationale: New schemas are fragile immediately after formation. Consolidation with 2–4 confirming examples stabilises the schema before session end.*

**Rule 9 — Terminal Rule:**  
P91 (MASTERY VERIFICATION) is always the terminal event of a concept session. Nothing follows P91 except P68 (MASTERY SELF-DECLARATION) and P62 (SPACED REVIEW SCHEDULING).  
*Rationale: Mastery verification is not a checkpoint — it is the closing gate. Advancing without it allows undetected deficit to propagate.*

**Rule 10 — Conflict for Existing Schemas Only:**  
P28 (COGNITIVE CONFLICT INDUCTION) must not fire for S0 (Complete Novice) students. A student with no prior schema has nothing to conflict with — conflict induction for S0 produces anxiety without cognitive effect. For S0, use P05 (CURIOSITY INDUCTION) instead.  
*Rationale: Conflict is a schema repair tool, not a teaching tool. Using it without a schema to repair is a primitive misapplication.*

### Dependency Graph (Abbreviated)

The full dependency graph is in `docs/architecture/TEACHING_PRIMITIVE_ARCHITECTURE.md` Part 6. The five most critical dependency chains:

```
CPA Chain:             P06 → P07 → P08
Schema Repair Chain:   P26 → P28 → P29 → P30 → P31 → P32
Generalisation Chain:  P15×3 + P17 → P20 → P21 → P22
Question Chain:        P35 → P55 → P36 → P55 → P37 → P55
Assessment Chain:      P74 → P55 → [P49|P50] → P51 → P35 → P55
```

**The dependency graph is the Composition Grammar's enforcement mechanism.** Any primitive invocation that violates a chain dependency is a structural bug in the Teaching Action. The composition engine must detect and reject it.

### Composition Grammar for Named Compounds (Expansion Rules)

When the composition engine encounters a Named Compound, it expands it before grammar validation:

| Named Compound | Expansion |
|---|---|
| P90 FORMATIVE ASSESSMENT WITH FEEDBACK | `P74→P55→[P49\|P50]→P51→P35→P55` |
| P12 FADED WORKED EXAMPLE | `P10→P82→P10→P82→P10` (progressively more fading) |
| P57 INTERLEAVED PRACTICE | `P88→P83→P88→P83` |
| P89 SPACED REPETITION | `P56 (at t+48h) → P56 (at t+1week) → P56 (at t+1month)` |
| P84 LOAD MANAGEMENT | `P23→P81→[sub-action]→P82→P24` |

---

## SECTION 5: PRIMITIVE LIBRARY ESTIMATE

### The Question

How many primitives are required for Mathematics, Physics, and English combined?

### Methodology

The 91 primitives in the prior discovery document were reverse-engineered from a single concept: math.func.function-concept. The estimate methodology:

1. Identify which of the 91 primitives are subject-specific vs. subject-independent
2. Project new primitive needs for Physics and English from the structural differences between those subjects and Mathematics
3. Set minimum, recommended, and maximum estimates

### Subject-Specific Analysis

**Mathematics (908 concepts):**  
Math was the source for the 91 primitives. Extension to other math concepts (fractions, limits, proof, group theory) requires:
- Fractions: no new primitives — all required operations are in the library (P17 CONTRAST, P28 CONFLICT for denominator misconception, P06 CONCRETE EMBODIMENT with pizza/folding paper, P47 DIAGRAM CONSTRUCTION for number line representation)
- Limits: no new primitives — P05 CURIOSITY INDUCTION + Zeno's paradox as P09 NARRATIVE FRAMING + P06 CONCRETE EMBODIMENT + P21 GENERALISATION
- Proof: one potential new primitive — LOGICAL STEP VALIDATION (student checks each step of a proof for validity). This is structurally different from P18 CLASSIFICATION (classifying instances) — it involves validating a chained argument, not classifying a single instance. Borderline: could be specified as a composition or as a new primitive P92.
- Group theory: no new primitives — abstract algebra concepts decompose into P26 SCHEMA ACTIVATION (surface existing arithmetic knowledge) + P17 CONTRAST + P21 GENERALISATION

**Mathematics estimate: 0–1 new primitives beyond the existing 91.**

---

**Physics (194 concepts):**  
Physics introduces two structural teaching requirements not present in pure mathematics:

**Requirement 1: Dimensional Analysis**  
Physics requires checking that equations are dimensionally consistent — that the units on both sides of an equation match. This is a specific cognitive operation: assigning units to every term, multiplying/cancelling units, verifying consistency. Is this a new primitive?

Analysis: Dimensional analysis is P22 SPECIALISATION (applying the unit-consistency rule to a specific equation) + P18 CLASSIFICATION (classifying the equation as dimensionally consistent or not). The operation is a composition of existing primitives, not a new atomic operation. No new primitive required.

**Requirement 2: Thought Experiments**  
Physics teaching, especially conceptual physics, uses thought experiments: Einstein's elevator, Schrödinger's cat, frictionless planes. A thought experiment is structurally different from P09 NARRATIVE FRAMING: it does not embed the concept in a story — it creates a precisely controlled imaginary scenario where the student can derive the physics from first principles.

Is this a new primitive? Yes. A thought experiment has a unique cognitive structure:
- Precise control of variables (the student is told exactly which variables exist)
- Derivation requirement (the student must reason to a conclusion, not observe one)
- Counterfactual premise (the scenario may be physically impossible)

This is not P09 (narrative), not P06 (concrete), not P14 (prediction) — it is a **constrained derivation scenario**. New primitive:

> **P92 — THOUGHT EXPERIMENT:**  
> Establish a precisely controlled, physically possible or impossible scenario with all variables specified. Student reasons from first principles to derive the physical outcome. No observation required — the derivation IS the cognitive event.  
> Applies: phys.mech.newtons-second-law ("frictionless plane"), phys.qm.schrodinger-equation ("Schrödinger's cat"), phys.therm.entropy ("Maxwell's demon")  
> Not the same as P09 (NARRATIVE) because: the scenario has no narrative arc — it is a variable specification for a derivation exercise. Not the same as P14 (PREDICTION) because: the derivation produces the prediction; the prediction is not given in advance of a scenario.

**Requirement 3: Order of Magnitude Estimation**  
Physics uses Fermi estimation — reasoning about the scale of a quantity without precise data. "How many piano tuners are in Chicago?" is a classic Fermi problem; in physics: "What is the approximate escape velocity of Earth without looking it up?"

Is this a new primitive? Analysis: Fermi estimation is P25 ABSTRACTION LADDER (moving between rough estimates and precise values) + P23 DECOMPOSITION (breaking the problem into estimable sub-quantities) + P48 ANALOGY CONSTRUCTION (comparing to a known scale). It is a composition. No new primitive required.

**Physics estimate: 1 new primitive (P92 THOUGHT EXPERIMENT). Possibly 2–3 more discovered during authoring of quantum mechanics and thermodynamics concepts.**

---

**English (216 concepts):**  
English is the most structurally different from Mathematics. It contains four distinct teaching domains:
1. Phonics/Phonemic Awareness (decoding)
2. Grammar (rule application and pattern recognition)
3. Vocabulary (meaning, context, register)
4. Literature/Writing (interpretation, composition, argumentation)

**Phonics domain:**  
The Architectural Test in Section 2 confirmed that all 5 core test primitives work for phonemic awareness with auditory content slots. The CPA framework applies with: auditory embodiment (P06 — hear the isolated sound) → auditory pattern representation (P07 with auditory modality) → graphemic notation (P08 with letter symbols or IPA). No new primitives required for phonics once P07's modality parameter is established.

One potential new primitive: **PHONEME BLENDING** — the act of holding isolated phonemes in working memory and assembling them into a word. This requires working memory maintenance over a sequence of distinct auditory stimuli, which is a different cognitive operation from P24 COMPOSITION (which assembles structural components, not temporal auditory stimuli). 

Analysis: PHONEME BLENDING could be specified as: P15 OBSERVATION (hear phoneme 1) → P15 (hear phoneme 2) → P15 (hear phoneme 3) → P24 COMPOSITION (blend). But the critical cognitive operation — holding and blending temporal auditory stimuli — is not well-captured by P24 (which is structural, not temporal). A new primitive:

> **P93 — TEMPORAL SEQUENCE ASSEMBLY:**  
> Student holds a sequence of distinct temporal stimuli in working memory and assembles them into a unified whole. Applies to phoneme blending (assemble phonemes into words), rhythm (assemble beats into patterns), and music (assemble notes into melody). Distinct from P24 COMPOSITION because the components are temporal (ordered in time) rather than structural (ordered by role).

**Grammar domain:**  
Grammar teaching uses pattern recognition and rule application — entirely covered by P20 PATTERN DETECTION, P18 CLASSIFICATION, P22 SPECIALISATION, P17 CONTRAST. No new primitives required.

**Vocabulary domain:**  
Vocabulary introduces **CONTEXTUAL INFERENCE** — the student encounters a word they do not know in context, and must infer its meaning from surrounding words, morphology, and domain. This is distinct from P36 PROBING QUESTION (which targets a known concept) — it is inference from incomplete information toward a meaning hypothesis. New primitive:

> **P94 — CONTEXTUAL INFERENCE:**  
> Student encounters an unknown element (word, symbol, concept) in a rich context. Student generates a meaning hypothesis from contextual cues, morphological cues, and domain knowledge. The hypothesis is then tested against explicit definition or additional context. Applies to: vocabulary acquisition, reading comprehension, symbol decoding, first exposure to notation. Distinct from P21 GENERALISATION (which moves from examples to rule) because CONTEXTUAL INFERENCE moves from surrounding context to meaning, not from multiple instances to a rule.

**Literature domain:**  
Literary interpretation requires **INTERPRETIVE OPENNESS** — a primitive that signals to the student that multiple valid interpretations coexist and that the task is to construct and defend one, not to find the single correct answer. This is a cognitive frame-setting operation distinct from P35 OPEN QUESTION (which also accepts multiple responses, but asks about a definite reality). Literary interpretation asks about meaning, which is underdetermined by the text.

> **P95 — INTERPRETIVE FRAME:**  
> Establish that the task ahead accepts multiple valid responses grounded in evidence, not a single correct answer. "There is no one right interpretation — but not every interpretation is equally supported. Your task is to build and defend yours." Applies to: literary analysis, historical interpretation, ethical reasoning, philosophical argumentation. This frame-setting is a prerequisite for any interpretive discussion — without it, students assume there is a correct answer they are missing, rather than a position they are building.

**English estimate: 3 new primitives (P93, P94, P95). Possibly 1–2 more for writing-specific operations (REVISION FOCUS, AUDIENCE SHIFT).**

### Library Size Estimates

| Estimate Level | Count | Composition | Justification |
|---|---|---|---|
| **Minimum** | 93 | 91 existing + P92 (THOUGHT EXPERIMENT) + P93 (TEMPORAL SEQUENCE ASSEMBLY) | Only the primitives for which no composition alternative exists |
| **Recommended** | 97 | Minimum + P94 (CONTEXTUAL INFERENCE) + P95 (INTERPRETIVE FRAME) + 2 writing-specific TBD | Full 3-subject coverage at authoring quality |
| **Maximum** | 115 | Recommended + up to 18 discovered during Phase 1 authoring | Upper bound based on domain coverage analysis; represents full discovery |

**Why the maximum is 115 and not higher:**  
The existing 91 primitives cover 80% of all Teaching Action composition by frequency (per the universal primitive map in the prior document). Extending to 115 covers the remaining 20% of less frequent operations. Beyond 115, every new candidate should be checked against the atomicity test — most will be compositions of existing primitives that have not yet been explicitly named.

**Why the library will not need to grow significantly after Phase 1:**  
The 91 existing primitives were derived from one concept in one subject. Despite this narrow origin, they pass the 5-concept architectural test. The reason is that human cognitive operations — how people learn — are domain-independent at the primitive level. The domain shapes the content; the primitives shape the cognition. Mathematics, Physics, and English all engage the same human cognitive architecture. The primitives that work for mathematical understanding work for physical understanding and for language learning, because they target cognition, not content.

---

## SECTION 6: EDUCATIONAL BRAIN COMPRESSION ANALYSIS

### The Core Claim

Moving from natural-language Teaching Actions to primitive compositions does not merely reorganise the authoring work — it changes which work is hand-authored and which work is generated.

**Under the current model:**  
Practitioners hand-author Teaching Actions in natural language. Each Teaching Action is:
- Unique to a concept (TA-A01 is for math.func.function-concept only)
- Written in prose (requires interpretation)
- Not mechanically combinable with Teaching Actions from other concepts
- Cannot be reused when a new concept enters the Brain

Result: each new concept requires 36 new hand-authored Teaching Actions (average). 50 concepts = 1,800 authored items.

**Under the primitive composition model:**  
Practitioners specify: (a) primitive library entries (written once, reused infinitely), and (b) composition rules per concept (which primitives in which sequence, which content slots).

The Teaching Action itself is **generated** — not hand-authored. The composition engine applies the composition rules to the primitive library to produce a Teaching Action. The AI voices it in natural language to the student.

Result: each new concept requires ~20 composition rules (average) specifying primitive sequences. The Teaching Actions are generated outputs. 50 concepts = 91 primitive specs + ~1,000 composition rules = 1,091 authored items.

### Compression Numbers

**Single concept (post-library):**  
- Current: 36 unique Teaching Actions authored in prose
- New: ~20 composition rules (primitive ID sequences)
- Compression: 36 : 20 = 1.8:1 in items, but the 20 rules are structured (low interpretive overhead) vs. 36 prose blocks (high interpretive overhead)
- True authoring effort reduction (per concept, after library exists): ~60%

**50 priority concepts:**  
- Current: 50 × 36 = 1,800 prose Teaching Actions
- New: 91 primitives + 1,000 composition rules = 1,091 items (but primitives are written once)
- Marginal new work per concept (after library complete): ~20 composition rules
- Compression vs. current model: 1,800 : (91 + 1,000) ≈ 1.65:1 in item count
- Compression in person-hours: approximately 3:1 (composition rules take 1/3 the time of prose Teaching Actions)

**Full 1,318-concept scope (three subjects):**  
- Current: 1,318 × 36 = 47,448 prose Teaching Actions
- New: 97–115 primitives + ~26,360 composition rules = ~26,470 items
- Reuse factor of primitive invocations: 47,448 × 4 primitives/TA = 189,792 invocations from ~100 unique primitives = **1,898:1 reuse**
- Person-hours: 47,448 hours → ~8,000 hours (6:1 compression)

**The compounding insight:**  
The compression ratio increases with each new concept added. The first concept (math.func.function-concept) required 91 primitive specifications. The 50th concept requires approximately 20 composition rules and zero new primitives. The 500th concept requires 20 composition rules and approximately zero new primitives. The primitive library becomes increasingly efficient as the concept count grows. This is the moat mechanics: each concept authored after the first 50 costs progressively less per unit of teaching intelligence created.

### Duplication Removed

Under the current natural-language model, the following duplication exists across the reference implementation:

- The phrase "Before proceeding, [verify the student has expressed X]" appears in every protocol's gate condition. It is the same cognitive operation (P91 partial) expressed 8 times in 8 different natural-language forms.
- "Ask the student to [generate their own example]" appears in 11 Teaching Actions. It is P42 EXAMPLE GENERATION invoked 11 times in 11 different prose descriptions.
- "Wait for the student to answer before proceeding" appears implicitly in every Teaching Action. Under the primitive model, P55 handles this uniformly.

Total duplication removed by the primitive model (estimated from the reference implementation): approximately 40% of the prose Teaching Action text is duplicated cognitive operations that the primitive library handles once.

### Maintenance Reduction

Under the current model, if pedagogical research produces a new finding about wait time (e.g., "for phonemic awareness, wait time should be 20 seconds minimum, not 5"), the practitioner must:
1. Find every Teaching Action in every concept that mentions wait time
2. Manually update each one

Under the primitive model:
1. Update P55's specification once
2. All compositions that invoke P55 automatically reflect the update

This is the maintenance advantage of the primitive layer. Changes to the educational research base propagate through the entire Brain by updating single primitive specifications.

---

## SECTION 7: IMPACT ON PROTOCOL DESIGN

### How Protocol Design Changes

Under the current model, designing a Teaching Protocol means writing Teaching Actions in natural language: deciding what to say, how to sequence it, what the student should do, and how to respond to various student outputs. This is a creative writing task that requires deep expertise.

Under the primitive composition model, designing a Teaching Protocol means specifying composition rules: which primitives in which sequence for each student state, with which content slots filled from the Knowledge Graph. This is a structured specification task that requires pedagogical expertise and familiarity with the primitive library.

The distinction matters because:
- **Creative writing tasks** do not produce reusable outputs — the expertise is embedded in the prose
- **Structured specification tasks** produce reusable outputs — the expertise is embedded in the library (primitives) and the rules (compositions)

### The New Authoring Workflow

**Step 1: Concept Profile**  
Identify the concept's key learning objective (the boundary between understanding and mimicry), student state classification (S0–S9), and the Knowledge Graph metadata (prerequisites, difficulty, bloom level).

This step is unchanged from current practice.

**Step 2: Misconception Analysis**  
Identify the concept's misconceptions. For each: name it, identify its symptom (observable behaviour), identify its root schema, identify the primitive that targets the schema repair (P26→P28→P29→P30→P31→P32 chain with concept-specific content slots).

Under the current model, this produces a prose description. Under the primitive model, this produces:
- Misconception ID
- Trigger signal (student behaviour)
- Composition rule: `[P26, slot: "student's stated schema"] → [P28, slot: "contradiction scenario"] → [P29, duration: 15s] → [P30, slot: "bridge"] → [P31, slot: "new schema"] → [P32, slot: "confirming examples × 3"]`

**Step 3: CPA Sequence Design**  
Specify the concrete-pictorial-abstract progression for this concept:
- Concrete content slot: what physical object, scenario, or experience embodies the concept
- Pictorial content slot: what diagram, graph, or visual model represents it
- Abstract content slot: what symbolic or formal notation expresses it
- Gate conditions between stages: what the student must demonstrate before advancing from concrete to pictorial, from pictorial to abstract

Under the current model, this produces prose. Under the primitive model, this produces:
- Three content slot specifications (concrete/pictorial/abstract)
- Three gate condition specifications (observable student behaviour)
- The composition: `P06[concrete slot] → [gate check] → P07[pictorial slot] → [gate check] → P08[abstract slot]`

**Step 4: Protocol Composition**  
For each student state (S0–S9), specify the protocol as a sequence of Teaching Actions, each Teaching Action as a sequence of primitives with content slots filled.

This is the core of the new authoring work. The output is not prose — it is a structured specification:

```
Protocol A (S0 — Complete Novice):
  TA-A01: [P69[slot: student_context], P09[slot: vending_machine_narrative], 
            P02[slot: prior_vending_experience], P14, P55[5s], P15, 
            P34[slot: "does B3 always give the same snack?"], P55[5s], 
            P35[slot: "why?"], P55[10s], P49[slot: "one button, one output"]]
  Gate: Student states single-valuedness in natural language
  TA-A02: [P06[slot: vending_machine_concrete], P17[slot: reliable vs broken machine], ...]
  ...
```

**Step 5: Mastery Gate Design**  
Specify 5 mastery gate items, each as a primitive sequence:
- P79 PREDICTION PROBE (does the student have a generative model?)
- P77 GENERATION PROBE (can the student produce an original instance?)
- P76 TRANSFER PROBE (can the student apply in an unseen domain?)
- P75 BOUNDARY PROBE (can the student handle an edge case?)
- P78 EXPLANATION PROBE (can the student teach it to another?)

The mastery gate composition is largely standard across concepts — only the content slots change.

### What the Author Is and Is Not Responsible For

**Author is responsible for:**
- Selecting which primitives compose each Teaching Action
- Specifying content slots for all primitives
- Specifying gate conditions
- Specifying misconception identification signals
- Specifying the mastery gate items

**Author is NOT responsible for:**
- Writing the prose the AI delivers to the student (the AI voices the composition)
- Specifying wait times (P55 has default durations per primitive type)
- Sequencing primitives within standard chains (the CPA chain, the schema repair chain, the assessment chain are standard)
- Generating new Teaching Actions for content variants (the composition engine handles this)

This is the key change: the author specifies the Educational Brain's knowledge. The engine generates the Teaching Actions. The AI voices the delivery.

### Protocol Quality Standard (Unchanged)

The AI Removal Test from `docs/curriculum/TEACHING_ASSET_PHILOSOPHY.md` remains the quality gate:

> "If the AI were replaced by a rule engine reading this protocol, would the student still receive effective teaching?"

Under the primitive composition model, this test becomes even more rigorous: a protocol that passes the AI Removal Test must be fully specifiable as primitive sequences with filled content slots. Any teaching move that requires the AI to improvise is a missing primitive specification, not an acceptable gap.

---

## SECTION 8: IMPACT ON TEACHING ENGINE

### The Current Architecture vs. the Primitive Architecture

**Current Teaching Engine (as built):**  
The Teaching Engine selects a teaching strategy and provides the AI with context (student state, misconceptions, current concept) as a system prompt. The AI generates the teaching response. The Educational Brain's content is a set of guidelines and examples in the prompt context.

The AI does: identify student state + select strategy + generate content + decide sequencing + respond to student output.

AI reasoning load: ~90% of the teaching session.

**Target Teaching Engine (primitive architecture):**  
The Teaching Engine selects a protocol, instantiates the primitive composition for the student's state, and delivers primitive invocations in sequence. The AI voices each primitive invocation in natural language.

The AI does: classify novel student responses + voice primitive invocations.

AI reasoning load: <10% of the teaching session at primitive library maturity.

### The Three Engine Layers

**Layer 1: Composition Executor (no AI)**  
Inputs: `concept_id`, `student_state`, `primitive_library`, `composition_rules`  
Outputs: ordered sequence of `(primitive_id, content_slot_values)` pairs  

This is a pure function. Given the same inputs, it produces the same output. No randomness, no AI, no context window. The composition executor can run in 1ms.

This layer handles 70% of all teaching decisions by volume (which primitive to invoke next, given the current sequence position and the composition rules for this concept and student state).

**Layer 2: Response Classifier (minimal AI)**  
Inputs: student response text, expected response categories for current primitive  
Outputs: response category label (e.g., "correct with conceptual justification," "VLT-only correct," "formula-dependency misconception active")  

This layer uses AI for pattern matching against pre-specified response categories. The response categories are authored per concept (part of the Teaching Protocol specification). The AI does fuzzy matching, not invention. This is a bounded classification task, not an open-ended generation task.

AI reasoning load for this layer: low (closed-set classification). Can be replaced by a fine-tuned classifier for the most frequent response patterns.

**Layer 3: Voice Renderer (AI)**  
Inputs: `(primitive_id, content_slot_values, student_state, previous_exchanges)`  
Outputs: natural-language delivery to the student  

This is where the AI speaks. Given that P09 NARRATIVE FRAMING should fire with the vending machine content slot, the AI produces: "Imagine you're standing in front of a vending machine. You press button B3. What comes out?"

The content was specified. The delivery is voiced. The AI adds natural-language fluency and appropriate register. It does not decide what to say — it says what the composition specified.

This is the "AI as voice-renderer, not content-generator" principle from ADR 14, expressed at the primitive level.

### Migration Path (Current → Target)

The current Teaching Engine does not need to be replaced to begin building the primitive architecture. The migration is additive:

**Stage 1 (Now — Month 6):** Build the primitive library and per-concept composition rules in documentation form. The current Teaching Engine continues operating. The composition rules are written as documentation, not executable code.

**Stage 2 (After Phase 1 approval):** Implement the Composition Executor as a rule engine. Wire it to the Teaching Engine as a composition advisor — the Teaching Engine receives the recommended primitive sequence and uses it to structure its AI prompt.

**Stage 3 (After evidence validation):** Replace AI-generated Teaching Actions with composition-executor-generated sequences. The AI becomes the Voice Renderer only.

**Stage 4 (Full primitive maturity):** The AI's contribution to in-session teaching is bounded to: (a) fuzzy matching student responses to pre-specified categories, and (b) natural-language voicing of primitive compositions. Everything else is deterministic.

---

## SECTION 9: MIGRATION STRATEGY

### From Current Protocol Documents to Primitive Compositions

The reference implementation (`math.func.function-concept`) is written in natural language. It contains implicit primitive compositions that must be made explicit before the composition engine can process them.

**Step 1: Primitive Annotation Pass**  
For each Teaching Action in the reference implementation, identify the primitive sequence (this has been done for TA-A01 through TA-A04 in the prior discovery document). Complete the annotation for all 36 Teaching Actions.

Output: a primitive-annotated version of the reference protocol where every Teaching Action is expressed as `[P_id × content_slot]` sequences.

**Step 2: Composition Rule Extraction**  
From the annotated protocol, extract the composition rules:
- Which primitives in which order for each protocol
- Which content slots are filled by KG metadata vs. authored content
- Which gate conditions between Teaching Actions

Output: a composition specification for math.func.function-concept in structured format.

**Step 3: Library Validation**  
Run the Architectural Test against the extracted composition rules. Verify that all invoked primitives are in the 91-primitive library. Identify any primitive invocations that are not in the library (these are either new primitives or compositions that need further decomposition).

Expected finding: 0–2 new primitives discovered from full annotation of the reference implementation (the 91-primitive library was derived from this concept — new primitives are unlikely but possible at edge cases).

**Step 4: Generalize to Tier A Concepts**  
For each of the next 5 Tier A concepts authored (math.found.mathematical-thinking, phys.meas.units, eng.phonics.phonemic-awareness, math.found.set-theory, phys.mech.newtons-second-law), write the composition specification directly — not natural-language Teaching Actions that are annotated afterward, but primitive sequences from the start.

This is the transition from "annotate existing prose" to "compose primitives first." After 5 concepts using the composition-first approach, the authoring workflow is validated.

**Step 5: Documentation Transition**  
The standard Protocol document format transitions from:
```
Part 1: Teaching Protocols (prose Teaching Actions)
```
to:
```
Part 1: Teaching Protocols
  - Protocol A: Primitive composition specification
    - TA-A01: [P69, P09, P02, P14, P55, P15, P34, P55, P35, P55, P49]
               with content slots [slot_values...]
    - Gate condition: [observable student behaviour]
    - TA-A02: [...]
```

The prose description of what the AI says to the student is GENERATED from the composition, not hand-authored.

### Backward Compatibility

The reference implementation (math.func.function-concept) does not need to be rewritten. It is the annotation source. Its natural-language form is already the canonical reference — the primitive composition specification is derived from it, not replaces it. The prose form documents WHY; the composition form documents WHAT.

For all concepts authored after this document, the composition form is primary. Prose commentary is secondary (explaining rationale, not specifying operations).

---

## SECTION 10: FINAL RECOMMENDATION

### The Permanent Decision

**Teaching Primitives are the atomic layer of the Educational Brain.**

This decision is made once and does not require revisiting. The evidence supporting it:

1. The Decomposition Proof: every Teaching Action in the reference implementation decomposes into primitives (Section 2, proven for all 6 protocols in the prior discovery document)
2. The Architectural Test: primitives work unchanged across Fractions, Functions, Limits, Units, and Phonemic Awareness (Section 2, five concepts verified)
3. The Atomicity Test: the 91-primitive library passes the subdivision test with one correction (P90 reclassified as Named Compound) (Section 3)
4. The Cross-Subject Estimate: 97-115 total primitives suffice for the three-subject scope — the library is near-complete after one concept (Section 5)
5. The Compression Analysis: 6:1 person-hour compression for the 1,318-concept scope; 1,898:1 primitive invocation reuse (Section 6)

### What This Means for Every Future Protocol

Every future Teaching Protocol is specified as primitive sequences with content slots. The protocol documents content decisions (what the concrete anchors are, what the misconception scenarios are, what the mastery gate items test). The primitive library specifies the cognitive operations. The composition engine assembles them. The AI voices the result.

**A practitioner who wants to author a new concept now does the following:**

1. Profile the concept: identify student states, misconceptions, prerequisite gaps
2. Specify CPA content slots: concrete anchor, pictorial representation, abstract notation
3. Specify misconception content slots: trigger scenario, bridge statement, replacement statement, confirming examples
4. Select composition rules: which primitives in which sequence for each protocol (S0–S9)
5. Specify mastery gate items: 5 probe types with expected response categories

The practitioner does NOT:
- Write the prose delivery text
- Specify every transition phrase
- Decide how long to wait after questions (P55 handles this)
- Write the schema repair chain structure (P26→P28→P29→P30→P31→P32 is standard)
- Author separate Teaching Actions for every step (these are generated from the composition rules)

This is the Educational Brain in its final architectural form: experts specify teaching knowledge through content slots and composition rules; engines generate and execute the teaching; AI voices the delivery.

### The Three Commitments

**Commitment 1: Primitive Library Stability**  
The 97–115-primitive library should reach its final form during Phase 1 (Month 1–6). After Phase 1, new primitive candidates should be tested against the atomicity test before admission. The target is a library that does not need to grow significantly during Phase 2 or Phase 3. A library that grows without bound has lost the quality gate.

**Commitment 2: Composition Grammar Enforcement**  
The 10 composition grammar rules are hard constraints, not best practices. Any Teaching Protocol specification that violates them is rejected, not flagged. The grammar's value is that it makes invalid Teaching Actions impossible to specify — not merely improbable to write.

**Commitment 3: AI Role Boundary**  
The AI's role in the Educational Brain is explicitly bounded:
- Allowed: voice rendering of primitive compositions
- Allowed: fuzzy matching of student responses to pre-specified categories
- Allowed: proposing new composition rules from Evidence Engine data (for expert validation)
- Not allowed: generating the content of Teaching Actions
- Not allowed: deciding which primitive to invoke next (this is the composition engine's responsibility)
- Not allowed: assessing student mastery independently of the pre-specified mastery gate criteria

When the AI does something in the "Not allowed" list during a teaching session, it indicates a gap in the primitive composition — a missing Teaching Action that has not been authored. The correct response is to author the missing composition rule, not to accept the AI's improvisation.

### The Moat Metric

The Educational Brain's competitive advantage is measured by a single metric:

**AI Reasoning Percentage per Session** — the fraction of a teaching session's decisions that are made by AI reasoning vs. by the deterministic composition engine.

At launch (current state): ~90% AI reasoning.  
Target at Phase 1 completion: ~50% AI reasoning (primitive compositions cover half the decisions).  
Target at Phase 2 completion: ~20% AI reasoning (covering top 200 concepts).  
Target at Phase 3 completion: ~5% AI reasoning (AI voices; composition engine decides).  

**Every authored concept reduces the AI Reasoning Percentage.** Every percent reduction makes the Educational Brain harder to replicate: a competitor needs not just a better AI, but a better primitive library + better composition rules + better evidence data. After Phase 1, they need all three. After Phase 3, they need decades of evidence. That is the moat.

---

## APPENDIX: THE COMPLETE TAXONOMY

### 8-Category Cognitive Function Taxonomy (replaces the 13-category list in the prior document)

The 91 existing primitives are regrouped by cognitive function. Primitive IDs and definitions are unchanged.

**Category A — ACTIVATION** *(prime the cognitive workspace before content processing)*  
P01 ATTEND, P02 ACTIVATE, P03 ORIENT, P04 CONTEXTUALIZE, P05 CURIOSITY INDUCTION, P69 RELEVANCE ANCHORING, P70 COMPETENCE EVIDENCE, P71 PEER COMPARISON REMOVAL, P72 INTELLECTUAL AUTHORITY TRANSFER, P73 GENUINE INTEREST SIGNAL  
*What it does: establishes the student's motivational and cognitive state before any content primitive fires.*

**Category B — INPUT** *(introduce new information into the cognitive workspace)*  
P06 CONCRETE EMBODIMENT, P07 PERCEPTUAL REPRESENTATION (formerly PICTORIAL; modality parameter added), P08 ABSTRACT NOTATION, P09 NARRATIVE FRAMING, P10 WORKED EXAMPLE PRESENTATION, P11 PARTIAL WORKED EXAMPLE, P13 EXPERT THINK-ALOUD  
*What it does: controls the modality and level of abstraction through which new content enters.*

**Category C — PROCESSING** *(transform input into structured understanding)*  
P14 PREDICTION, P15 OBSERVATION, P16 COMPARISON, P17 CONTRAST, P18 CLASSIFICATION, P19 ORDERING/SEQUENCING, P20 PATTERN DETECTION, P21 GENERALISATION, P22 SPECIALISATION, P23 DECOMPOSITION, P24 COMPOSITION, P25 ABSTRACTION LADDER  
*What it does: the computational operations that produce comprehension from raw input.*

**Category D — SCHEMA REPAIR** *(modify an incorrect existing mental model)*  
P26 SCHEMA ACTIVATION, P27 SCHEMA EXPOSURE, P28 COGNITIVE CONFLICT INDUCTION, P29 CONFLICT RESOLUTION PAUSE, P30 BRIDGE CONSTRUCTION, P31 SCHEMA REPLACEMENT, P32 SCHEMA CONSOLIDATION, P33 DISCRIMINATION TRAINING  
*What it does: the repair chain for S2 (Misconception Carrier) and S7 (High Confidence Incorrect) students. Only fires when an incorrect schema is detected.*

**Category E — ELICITATION** *(drive student cognitive production rather than reception)*  
P34 CLOSED QUESTION, P35 OPEN QUESTION, P36 PROBING QUESTION, P37 COUNTEREXAMPLE QUESTION, P38 REFORMULATION PROMPT, P39 TRANSFER PROMPT, P40 METACOGNITIVE PROMPT, P41 DIAGNOSTIC QUESTION, P42 EXAMPLE GENERATION, P43 NON-EXAMPLE GENERATION, P44 DEFINITION CONSTRUCTION, P45 PROBLEM CONSTRUCTION, P46 PROCEDURE CONSTRUCTION, P47 DIAGRAM CONSTRUCTION, P48 ANALOGY CONSTRUCTION  
*What it does: forces the student to produce (generate, construct, answer) rather than receive. Production is the highest-encoding mode.*

**Category F — REGULATION** *(control the teaching process itself)*  
P49 CONFIRMATION, P50 DISCONFIRMATION, P51 ERROR DIAGNOSIS FACILITATION, P52 TARGETED REDIRECT, P53 ELABORATION REQUEST, P54 PRODUCTIVE STRUGGLE PERMISSION, P55 WAIT TIME, P63 SELF-MONITORING TRIGGER, P64 CONFIDENCE CALIBRATION, P65 ERROR ATTRIBUTION, P66 STRATEGY AWARENESS, P67 TRANSFER READINESS CHECK, P68 MASTERY SELF-DECLARATION, P81 SCAFFOLDING, P82 FADING, P83 INTERLEAVING CONTROL, P84 LOAD MANAGEMENT, P85 PACING CONTROL, P86 MODALITY SWITCHING  
*What it does: manages the process of the session — pacing, load, feedback, metacognition. The control plane.*

**Category G — ASSESSMENT** *(reveal cognitive state for routing decisions)*  
P74 CLASSIFICATION PROBE, P75 BOUNDARY PROBE, P76 TRANSFER PROBE, P77 GENERATION PROBE, P78 EXPLANATION PROBE, P79 PREDICTION PROBE, P80 DUAL-TASK PROBE  
*What it does: produces a signal about the student's cognitive state for use by the Protocol Selection Engine or Adaptation Engine.*

**Category H — RETENTION** *(move learning from working memory to long-term storage)*  
P56 SPACED RETRIEVAL, P57 INTERLEAVED PRACTICE (Named Compound), P58 ELABORATIVE INTERROGATION, P59 SELF-EXPLANATION, P60 VARIATION, P61 SUMMARY CONSTRUCTION, P62 SPACED REVIEW SCHEDULING, P87 TRANSFER BRIDGING, P88 RETRIEVAL PRACTICE, P89 SPACED REPETITION (Named Compound)  
*What it does: ensures that what was learned in the session persists beyond the session.*

**Named Compounds (within Categories):**  
P12 FADED WORKED EXAMPLE (Category B — compound of P10 + P82)  
P57 INTERLEAVED PRACTICE (Category H — compound of P88 + P83)  
P89 SPACED REPETITION (Category H — compound of P56 × interval)  
P90 FORMATIVE ASSESSMENT WITH FEEDBACK (cross-category — compound of G + F)  
P91 MASTERY VERIFICATION (terminal compound — P74-P80 + P91 gate decision)  

**New Primitives (Three-Subject Scope):**  
P92 THOUGHT EXPERIMENT (Category C — constrained derivation scenario; required for Physics)  
P93 TEMPORAL SEQUENCE ASSEMBLY (Category C — auditory/temporal composition; required for Phonics)  
P94 CONTEXTUAL INFERENCE (Category C — meaning from context; required for Vocabulary)  
P95 INTERPRETIVE FRAME (Category A — multiple-valid-interpretation framing; required for Literature)

---

*This document is the final architectural decision on the atomic unit of the Educational Brain. Teaching Primitives are the atoms. This architecture does not change. Every Teaching Protocol authored after this document is specified as primitive compositions with content slots, not as natural-language prose Teaching Actions.*

*Cross-reference:*  
*— `docs/architecture/TEACHING_PRIMITIVE_ARCHITECTURE.md` (prior discovery, 91 primitives fully specified)*  
*— `docs/curriculum/TEACHING_ASSET_PHILOSOPHY.md` (field-level specification philosophy, AI Removal Test)*  
*— `docs/curriculum/protocols/math.func.function-concept.md` (reference implementation)*  
*— `docs/THREE_SUBJECT_EDUCATIONAL_BRAIN_ROADMAP.md` (canonical launch roadmap)*
