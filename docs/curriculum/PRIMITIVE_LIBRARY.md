# Primitive Library
## Canonical Specification for All Teaching Primitives

**Status:** Authoritative — single source of truth for all Teaching Action composition  
**Date:** 2026-07-11  
**Branch:** claude/math-linalg-curriculum-34wonr  
**Scope:** Mathematics (908 concepts), Physics (194 concepts), English (216 concepts)  
**Total Items:** 95 (90 true primitives + 5 named compounds)  
**Cross-reference:** `docs/architecture/EDUCATIONAL_BRAIN_PRIMITIVE_ARCHITECTURE.md` (architecture decision), `docs/architecture/TEACHING_PRIMITIVE_ARCHITECTURE.md` (discovery document), `docs/curriculum/TEACHING_ASSET_PHILOSOPHY.md` (authoring philosophy)

---

## HOW TO USE THIS DOCUMENT

This library specifies **what cognitive operation** each primitive performs, not what content it delivers. Content slots are filled by the Knowledge Graph at execution time. Every entry is concept-independent.

**For Protocol Authors:** When specifying a Teaching Protocol for a new concept, select primitives from this library to compose Teaching Actions. Never write prose delivery text — specify primitive sequences with content slots. The Voice Renderer (AI) converts compositions to speech.

**For Engine Developers:** Each entry specifies the inputs a primitive requires, the response it expects, and the signals that indicate pass or failure. Build these as typed operations, not narrative generators.

**For Reviewers:** Apply the **AI Removal Test** to any composition: "If the AI disappeared, could a deterministic engine execute this primitive sequence correctly given only the content slots?" If the answer is NO for any primitive, either the primitive is under-specified or the composition is incomplete.

---

## THE AI REMOVAL TEST

Before accepting any primitive into a Teaching Action composition, verify:

1. **Defined inputs?** Does the primitive have explicit content slots that can be filled deterministically?
2. **Observable output?** Can a rule engine detect the expected student response without LLM reasoning?
3. **Deterministic execution?** Given the same student state and inputs, does the primitive execute identically every time?
4. **Subject-independent?** Could the same primitive fire for a mathematics concept, a physics concept, and an English concept without modification?

If any answer is NO, the primitive specification is incomplete. Revise before authoring with it.

---

## SUMMARY TABLE

All 95 library items. Type: **TP** = True Primitive, **NC** = Named Compound.

| ID | Canonical Name | Type | Category | Reuse Freq | Key Effect |
|---|---|---|---|---|---|
| P01 | ATTEND | TP | A — Activation | Universal | Establishes selective attention |
| P02 | ACTIVATE | TP | A — Activation | Universal | Retrieves prior schema |
| P03 | ORIENT | TP | A — Activation | Very High | Sets the learning frame |
| P04 | CONTEXTUALIZE | TP | A — Activation | High | Embeds concept in recognized situation |
| P05 | CURIOSITY INDUCTION | TP | A — Activation | High | Creates knowledge gap |
| P06 | CONCRETE EMBODIMENT | TP | B — Input | High | Introduces concept tangibly |
| P07 | PERCEPTUAL REPRESENTATION | TP | B — Input | High | Introduces structural visual |
| P08 | ABSTRACT NOTATION | TP | B — Input | High | Introduces formal symbol system |
| P09 | NARRATIVE FRAMING | TP | B — Input | Medium | Activates episodic memory |
| P10 | WORKED EXAMPLE PRESENTATION | TP | B — Input | High | Shows complete procedure |
| P11 | PARTIAL WORKED EXAMPLE | TP | B — Input | Medium | Partially scaffolded procedure |
| P12 | FADED WORKED EXAMPLE | NC | B — Input | Medium | Systematic scaffold withdrawal |
| P13 | EXPERT THINK-ALOUD | TP | B — Input | Medium | Makes expert process visible |
| P14 | PREDICTION | TP | C — Processing | Very High | Activates active encoding |
| P15 | OBSERVATION | TP | C — Processing | Very High | Attends to actual outcome |
| P16 | COMPARISON | TP | C — Processing | High | Identifies similarities |
| P17 | CONTRAST | TP | C — Processing | Very High | Isolates defining feature |
| P18 | CLASSIFICATION | TP | C — Processing | High | Tests schema as criterion |
| P19 | ORDERING/SEQUENCING | TP | C — Processing | Medium | Reveals structural relationships |
| P20 | PATTERN DETECTION | TP | C — Processing | High | Identifies recurring structure |
| P21 | GENERALISATION | TP | C — Processing | High | Extracts principle from examples |
| P22 | SPECIALISATION | TP | C — Processing | High | Applies principle to specific case |
| P23 | DECOMPOSITION | TP | C — Processing | Medium | Breaks whole into parts |
| P24 | COMPOSITION | TP | C — Processing | Medium | Assembles parts into whole |
| P25 | ABSTRACTION LADDER | TP | C — Processing | Medium | Moves between abstraction levels |
| P26 | SCHEMA ACTIVATION | TP | D — Schema Repair | Situational | Surfaces existing mental model |
| P27 | SCHEMA EXPOSURE | TP | D — Schema Repair | Situational | Makes hidden schema explicit |
| P28 | COGNITIVE CONFLICT INDUCTION | TP | D — Schema Repair | Situational | Creates schema-vs-evidence tension |
| P29 | CONFLICT RESOLUTION PAUSE | TP | D — Schema Repair | Situational | Holds dissonance for processing |
| P30 | BRIDGE CONSTRUCTION | TP | D — Schema Repair | Situational | Links old schema to correct one |
| P31 | SCHEMA REPLACEMENT | TP | D — Schema Repair | Situational | Installs correct schema |
| P32 | SCHEMA CONSOLIDATION | TP | D — Schema Repair | Situational | Stabilises new schema |
| P33 | DISCRIMINATION TRAINING | TP | D — Schema Repair | Situational | Distinguishes correct from adjacent |
| P34 | CLOSED QUESTION | TP | E — Elicitation | Very High | Tests specific recall/application |
| P35 | OPEN QUESTION | TP | E — Elicitation | Very High | Surfaces student reasoning |
| P36 | PROBING QUESTION | TP | E — Elicitation | High | Deepens a specific response |
| P37 | COUNTEREXAMPLE QUESTION | TP | E — Elicitation | High | Tests generalisation boundaries |
| P38 | REFORMULATION PROMPT | TP | E — Elicitation | Medium | Forces multiple representations |
| P39 | TRANSFER PROMPT | TP | E — Elicitation | Medium | Initiates cross-context transfer |
| P40 | METACOGNITIVE PROMPT | TP | E — Elicitation | Medium | Triggers self-monitoring |
| P41 | DIAGNOSTIC QUESTION | TP | E — Elicitation | High | Detects specific misconception |
| P42 | EXAMPLE GENERATION | TP | E — Elicitation | High | Student produces own example |
| P43 | NON-EXAMPLE GENERATION | TP | E — Elicitation | Medium | Student produces counterexample |
| P44 | DEFINITION CONSTRUCTION | TP | E — Elicitation | Medium | Student generates definition |
| P45 | PROBLEM CONSTRUCTION | TP | E — Elicitation | Low | Student creates problem |
| P46 | PROCEDURE CONSTRUCTION | TP | E — Elicitation | Low | Student designs procedure |
| P47 | DIAGRAM CONSTRUCTION | TP | E — Elicitation | Medium | Student builds visual |
| P48 | ANALOGY CONSTRUCTION | TP | E — Elicitation | Low | Student invents analogy |
| P49 | CONFIRMATION | TP | F — Regulation | Very High | Signals correct reasoning |
| P50 | DISCONFIRMATION | TP | F — Regulation | High | Signals need for revision |
| P51 | ERROR DIAGNOSIS FACILITATION | TP | F — Regulation | High | Identifies error cause |
| P52 | TARGETED REDIRECT | TP | F — Regulation | High | Moves attention to right focus |
| P53 | ELABORATION REQUEST | TP | F — Regulation | Medium | Extends correct response |
| P54 | PRODUCTIVE STRUGGLE PERMISSION | TP | F — Regulation | Medium | Permits not-knowing |
| P55 | WAIT TIME | TP | F — Regulation | Universal | Deliberate post-question silence |
| P56 | SPACED RETRIEVAL | TP | H — Retention | Medium | Retrieval after time gap |
| P57 | INTERLEAVED PRACTICE | NC | H — Retention | Medium | Mixed-concept practice |
| P58 | ELABORATIVE INTERROGATION | TP | H — Retention | Medium | "Why is this true?" deepening |
| P59 | SELF-EXPLANATION | TP | H — Retention | Medium | Student narrates own reasoning |
| P60 | VARIATION | TP | H — Retention | Medium | Multi-representation rapid sequence |
| P61 | SUMMARY CONSTRUCTION | TP | H — Retention | Medium | Student writes session summary |
| P62 | SPACED REVIEW SCHEDULING | TP | H — Retention | Medium | Sets future retrieval time |
| P63 | SELF-MONITORING TRIGGER | TP | F — Regulation | Medium | Prompts understanding check |
| P64 | CONFIDENCE CALIBRATION | TP | F — Regulation | High | Measures confidence vs accuracy |
| P65 | ERROR ATTRIBUTION | TP | F — Regulation | Medium | Procedural vs conceptual error |
| P66 | STRATEGY AWARENESS | TP | F — Regulation | Low | Names strategy being used |
| P67 | TRANSFER READINESS CHECK | TP | F — Regulation | Low | Self-assessed transfer readiness |
| P68 | MASTERY SELF-DECLARATION | TP | F — Regulation | Low | Student claims mastery |
| P69 | RELEVANCE ANCHORING | TP | A — Activation | High | Connects concept to student goals |
| P70 | COMPETENCE EVIDENCE | TP | A — Activation | Medium | Shows evidence of student growth |
| P71 | PEER COMPARISON REMOVAL | TP | A — Activation | Situational | Removes social comparison (S6) |
| P72 | INTELLECTUAL AUTHORITY TRANSFER | TP | A — Activation | Medium | Shifts reasoning ownership |
| P73 | GENUINE INTEREST SIGNAL | TP | A — Activation | Medium | Authentic curiosity response |
| P74 | CLASSIFICATION PROBE | TP | G — Assessment | High | Tests criterion internalisation |
| P75 | BOUNDARY PROBE | TP | G — Assessment | Medium | Tests edge-case schema depth |
| P76 | TRANSFER PROBE | TP | G — Assessment | Medium | Tests cross-domain application |
| P77 | GENERATION PROBE | TP | G — Assessment | Medium | Tests generative schema |
| P78 | EXPLANATION PROBE | TP | G — Assessment | Medium | Tests schema structure via narration |
| P79 | PREDICTION PROBE | TP | G — Assessment | Medium | Tests generative model |
| P80 | DUAL-TASK PROBE | TP | G — Assessment | Medium | Tests positive/negative classification |
| P81 | SCAFFOLDING | TP | F — Regulation | High | Temporary structural support |
| P82 | FADING | TP | F — Regulation | High | Systematic support removal |
| P83 | INTERLEAVING CONTROL | TP | F — Regulation | Medium | Introduces deliberate interference |
| P84 | LOAD MANAGEMENT | TP | F — Regulation | High | Partitions complex task |
| P85 | PACING CONTROL | TP | F — Regulation | High | Regulates information rate |
| P86 | MODALITY SWITCHING | TP | F — Regulation | Medium | Moves between representation modes |
| P87 | TRANSFER BRIDGING | TP | H — Retention | Medium | Lays cross-concept transfer path |
| P88 | RETRIEVAL PRACTICE | TP | H — Retention | High | Tests recall under retrieval conditions |
| P89 | SPACED REPETITION | NC | H — Retention | Medium | Retrieval at increasing intervals |
| P90 | FORMATIVE ASSESSMENT WITH FEEDBACK | NC | Cross-category G+F | High | Assessment + targeted feedback loop |
| P91 | MASTERY VERIFICATION | NC | Terminal compound | Medium | Multi-probe mastery gate |
| P92 | THOUGHT EXPERIMENT | TP | C — Processing | Situational | Constrained derivation scenario |
| P93 | TEMPORAL SEQUENCE ASSEMBLY | TP | C — Processing | Situational | Auditory/temporal composition |
| P94 | CONTEXTUAL INFERENCE | TP | C — Processing | Situational | Meaning extraction from context |
| P95 | INTERPRETIVE FRAME | TP | A — Activation | Situational | Multiple-valid-interpretation framing |

---

## COMPOSITION GRAMMAR — QUICK REFERENCE

The 10 rules below are **hard constraints**, not best practices. Any composition violating them is rejected.

| Rule | Constraint |
|---|---|
| GR-1 | Every Teaching Action begins with P01 (ATTEND) or P02 (ACTIVATE) |
| GR-2 | P55 (WAIT TIME) must follow every elicitation primitive (P34–P48, P74–P80) — minimum 5 s |
| GR-3 | P08 (ABSTRACT NOTATION) may not fire before at least one of P06 or P07 has fired for the same concept in the session |
| GR-4 | Schema Repair chain (P26–P32) may only be entered after P41 or P64 returns a misconception signal |
| GR-5 | P28 (COGNITIVE CONFLICT INDUCTION) may not fire for S6 (Low Confidence) students — route through P30 instead |
| GR-6 | P91 (MASTERY VERIFICATION) must be the terminal primitive in its Teaching Action — nothing follows it |
| GR-7 | No more than 3 consecutive processing primitives (C-category) without an E-category break |
| GR-8 | P54 (PRODUCTIVE STRUGGLE PERMISSION) must precede any primitive that will result in student failure (first-attempt open questions with high difficulty) |
| GR-9 | Assessment primitives (P74–P80) may not appear in the first Teaching Action of a session unless the session type is diagnostic |
| GR-10 | Named Compound expansion must be substituted before composition validation — validate the expanded form, not the compound name |

### Named Compound Expansions

| Named Compound | Canonical Expansion |
|---|---|
| P12 FADED WORKED EXAMPLE | `P10 → P82 → P10 → P82 → P10` (three worked examples with systematic fading between) |
| P57 INTERLEAVED PRACTICE | `P88 + P83` (retrieval practice with deliberate interleaving control) |
| P89 SPACED REPETITION | `P56 × [interval schedule]` (spaced retrieval at specified intervals) |
| P90 FORMATIVE ASSESSMENT WITH FEEDBACK | `[P74–P80 selection] → P55 → [P49 \| P50] → P51 → P35 → P55` |
| P91 MASTERY VERIFICATION | `P77 → P76 → P75 → P74 → P78` (five-probe gate in sequence) |

---

## CATEGORY A — ACTIVATION

*Prime the cognitive workspace before content processing. Establishes the student's motivational and attentional state. All other primitives assume at least one A-category primitive has fired.*

---

### P01 — ATTEND
**Type:** True Primitive &nbsp;|&nbsp; **Reuse Frequency:** Universal

**1. Purpose:**  
Direct student attention to a specific element before any cognitive processing begins.

**2. Cognitive Objective:**  
Establish selective attention on the target stimulus, clearing competing foci, so subsequent primitives have a defined entry point.

**3. When to Use:**  
- At the start of every Teaching Action  
- When transitioning between stimuli within a session  
- When student attention has drifted

**4. When NOT to Use:**  
- Immediately after another P01 targeting the same element (redundant)  
- As a terminal primitive in any sequence

**5. Student States Supported:**  
S0–S9 (universal)

**6. CPA Stage Compatibility:**  
C, P, A — universal; applies at all abstraction levels

**7. Inputs Required:**  
- `target_element`: object, diagram, sentence, symbol, scenario, or sub-field within the stimulus  
- Optional: `aspect_focus` — specific sub-feature to attend to within the element

**8. Expected Student Response:**  
Student orients toward the target element; can reference it in their next response without prompting.

**9. Success Signal:**  
Student's next response directly references `target_element` without being reminded of it.

**10. Failure Signal:**  
Student response addresses a different element; no engagement with `target_element` visible.

**11. Recovery:**  
Repeat P01 with narrowed `aspect_focus` ("not the formula — the diagram above it"); if fails twice, check whether the stimulus is visible/accessible.

**12. Typical Misconceptions Addressed:**  
None — pre-content primitive.

**13. Compatible Primitives:**  
All primitives. P01 is the universal predecessor. P55 (WAIT TIME) is the natural immediate successor for any elicitation that follows.

**14. Incompatible Primitives:**  
None.

**15. Composition Constraints:**  
GR-1 (every Teaching Action begins with P01 or P02); P01 cannot be a terminal primitive.

**16. Subject Examples:**  
- **Mathematics:** "Look at this arrow diagram. Focus on where each arrow starts and ends — not the labels yet."  
- **Physics:** "Before we discuss forces, look at the object sitting still on this surface."  
- **English:** "Read this sentence through once. Just read it — don't analyse it yet."

---

### P02 — ACTIVATE
**Type:** True Primitive &nbsp;|&nbsp; **Reuse Frequency:** Universal

**1. Purpose:**  
Retrieve a specific prior schema from long-term memory to prime the cognitive workspace for connection-making.

**2. Cognitive Objective:**  
Surface an existing knowledge structure so that new content can be attached to it rather than encoded in isolation.

**3. When to Use:**  
- At the start of any Teaching Action that builds on previously learned content  
- Before introducing a new concept that extends a known one  
- As an alternative to P01 when the entry point is memory-based rather than perception-based

**4. When NOT to Use:**  
- When the student has no relevant prior schema (S0 on a genuinely new concept — use P04 instead)  
- When the schema to be retrieved is known to be incorrect (use P26 instead)

**5. Student States Supported:**  
S1, S2, S3, S5, S8, S9 — students with existing schemas. For S0, substitute P04.

**6. CPA Stage Compatibility:**  
C, P, A — universal

**7. Inputs Required:**  
- `prior_concept_id`: the previously learned concept whose schema should be activated  
- `activation_cue`: a prompt, question, or partial stimulus that triggers retrieval

**8. Expected Student Response:**  
Student recalls and can articulate key aspects of the prior schema.

**9. Success Signal:**  
Student references at least one accurate feature of the prior schema without being prompted for it.

**10. Failure Signal:**  
Student cannot recall the prior schema; produces blank or incorrect description.

**11. Recovery:**  
Reduce the retrieval demand — provide a partial cue (P11 pattern); if schema is absent, execute a brief re-teach of `prior_concept_id` before returning to the current Teaching Action.

**12. Typical Misconceptions Addressed:**  
None — pre-content primitive. However, if the retrieved schema is incorrect, P26→P27 sequence should immediately follow.

**13. Compatible Primitives:**  
P17 (CONTRAST) — activate prior schema then contrast with new concept; P26 (SCHEMA ACTIVATION) — when retrieved schema is expected to be incorrect.

**14. Incompatible Primitives:**  
P08 (ABSTRACT NOTATION) immediately after P02 without an intervening Input primitive — notation without perceptual grounding is inaccessible.

**15. Composition Constraints:**  
GR-1 (may substitute for P01 as session opener); follows Grammar Rule 3 implications — if the activated schema includes abstract notation, check that P06/P07 were previously established.

**16. Subject Examples:**  
- **Mathematics:** "Before we look at linear transformations, recall what a function is. What makes something a function?"  
- **Physics:** "We've talked about Newton's First Law. What does it say about an object when no forces act on it?"  
- **English:** "You know what a verb is. Before we look at participles, recall: what does a verb do in a sentence?"

---

### P03 — ORIENT
**Type:** True Primitive &nbsp;|&nbsp; **Reuse Frequency:** Very High

**1. Purpose:**  
Establish the learning frame: what question is being answered, what problem is being solved, what skill is being built.

**2. Cognitive Objective:**  
Give the student an endpoint so that all subsequent primitives in the sequence have a coherent target. Without orientation, primitives produce disconnected knowledge.

**3. When to Use:**  
- At the start of any session or major protocol shift  
- When introducing a new protocol within a session  
- When a student has lost the thread of the current goal

**4. When NOT to Use:**  
- When the goal has already been oriented in the same session and has not changed (redundant re-orienting reduces efficiency)

**5. Student States Supported:**  
S0–S9 (universal, but especially important for S0, S4, S8)

**6. CPA Stage Compatibility:**  
C, P, A — universal

**7. Inputs Required:**  
- `learning_goal`: one sentence stating what the student will be able to do by the end of this Teaching Action  
- `frame_type`: one of [question, problem, skill] — which frame is most relevant

**8. Expected Student Response:**  
Student can state the goal in their own words.

**9. Success Signal:**  
Student paraphrases the `learning_goal` accurately when asked.

**10. Failure Signal:**  
Student cannot restate the goal; student restates a different or broader goal.

**11. Recovery:**  
Restate with a more concrete `frame_type`; convert an abstract skill frame to a question frame if student finds questions more tractable.

**12. Typical Misconceptions Addressed:**  
None — metacognitive frame-setting primitive.

**13. Compatible Primitives:**  
P01 (ATTEND) before; P04 (CONTEXTUALIZE) after to ground the frame in a recognizable situation; P05 (CURIOSITY INDUCTION) after to create urgency for the oriented goal.

**14. Incompatible Primitives:**  
No hard incompatibilities, but P68 (MASTERY SELF-DECLARATION) should not precede P03 — declaring mastery before orienting the goal is incoherent.

**15. Composition Constraints:**  
No composition rule mandates P03, but best-practice sequencing is P01/P02 → P03 → P04/P05 at the start of any session.

**16. Subject Examples:**  
- **Mathematics:** "By the end of this, you'll be able to look at any correspondence between sets and decide in under 10 seconds whether it's a function."  
- **Physics:** "The question we're answering today: why does a heavier object and a lighter object hit the ground at the same time?"  
- **English:** "The skill we're building: you'll be able to identify what a writer is implying even when they don't say it directly."

---

### P04 — CONTEXTUALIZE
**Type:** True Primitive &nbsp;|&nbsp; **Reuse Frequency:** High

**1. Purpose:**  
Embed the concept in a situation the student recognizes before the concept is named or defined.

**2. Cognitive Objective:**  
Provide the cognitive stakes for the concept — a real problem the concept solves — so that the formal definition is a solution rather than an arbitrary fact.

**3. When to Use:**  
- Before introducing any new concept to any student state  
- Especially critical for S0 (Complete Novice) and S9 (Second-Language Learner)  
- When a concept has been introduced abstractly and is not yet grounded

**4. When NOT to Use:**  
- For S5 (Mathematically Mature) students who prefer the formal definition first — offer P08 before P04 for this state  
- When the context is so elaborate that it becomes extraneous cognitive load (keep context minimal)

**5. Student States Supported:**  
S0, S1, S3, S4, S6, S8, S9 — most beneficial for students without strong formal schema

**6. CPA Stage Compatibility:**  
C (primary), P (secondary)

**7. Inputs Required:**  
- `context_scenario`: a situation from the student's recognizable world that the concept addresses  
- `concept_need`: why the concept matters in this scenario (the problem it solves)

**8. Expected Student Response:**  
Student recognizes the scenario; engages with the problem it presents before the formal concept is named.

**9. Success Signal:**  
Student articulates the problem the scenario poses; can say "so we need something that…"

**10. Failure Signal:**  
Student is confused by the scenario; scenario requires prior knowledge the student lacks.

**11. Recovery:**  
Replace `context_scenario` with a simpler or more familiar one; verify that the prerequisite knowledge for the scenario is present.

**12. Typical Misconceptions Addressed:**  
None directly — but grounding prevents the most common novice error (concept as arbitrary rule rather than solution to a real problem).

**13. Compatible Primitives:**  
P05 (CURIOSITY INDUCTION) naturally follows contextualization to create urgency; P06 (CONCRETE EMBODIMENT) follows to make the scenario tangible.

**14. Incompatible Primitives:**  
P08 (ABSTRACT NOTATION) before P04 for S0 students — notation before context produces disengagement.

**15. Composition Constraints:**  
Precedes all Input category primitives in any Protocol targeting S0, S6, or S9.

**16. Subject Examples:**  
- **Mathematics:** "You're on a train schedule app. You type in 'London to Paris' and it gives you one departure time. But the schedule doesn't work like a function — same input, two different outputs. The app crashes. Why does this matter?"  
- **Physics:** "You drop a bowling ball and a tennis ball from the same height. Before you've studied forces at all — which one do you expect to hit the floor first, and why?"  
- **English:** "A message says: 'That's a nice idea.' But the person's tone is flat. The words and the meaning are different. How do we know what they actually mean?"

---

### P05 — CURIOSITY INDUCTION
**Type:** True Primitive &nbsp;|&nbsp; **Reuse Frequency:** High

**1. Purpose:**  
Create a knowledge gap — a question the student wants to answer but cannot yet.

**2. Cognitive Objective:**  
Motivate learning by generating epistemic drive: the student must know the answer and is now paying attention to content that closes the gap.

**3. When to Use:**  
- After P03 (ORIENT) or P04 (CONTEXTUALIZE) — when the frame is set, generate the urgency  
- When student motivation is low or attention is passive

**4. When NOT to Use:**  
- With S6 (Low Confidence) students who are already anxious — curiosity gaps can feel threatening if the student believes they will never close the gap; calibrate with P54 first  
- When the gap is unsolvable by the end of the session (the student must be able to close the gap they've opened)

**5. Student States Supported:**  
S0, S1, S3, S4, S5, S7, S8, S9 — most student states respond positively to genuine knowledge gaps

**6. CPA Stage Compatibility:**  
C, P, A — depends on what form the gap is expressed in

**7. Inputs Required:**  
- `knowledge_gap_statement`: a question or anomaly the student cannot currently answer  
- `gap_resolve_path`: confirmation that this session will close this gap

**8. Expected Student Response:**  
Student expresses desire to know the answer; asks a follow-up question; increases engagement.

**9. Success Signal:**  
Student asks "so why does that happen?" or equivalent — gap is active.

**10. Failure Signal:**  
Student is indifferent to the gap ("I don't really care"); student already knows the answer.

**11. Recovery:**  
Revise `knowledge_gap_statement` to connect more directly to student's stated interests (P69 context); verify student doesn't already know the answer (diagnostic).

**12. Typical Misconceptions Addressed:**  
None — motivational primitive.

**13. Compatible Primitives:**  
P04 (CONTEXTUALIZE) before; P06/P07 (Input primitives) after to begin closing the gap; P69 (RELEVANCE ANCHORING) before to personalise the gap.

**14. Incompatible Primitives:**  
P68 (MASTERY SELF-DECLARATION) before P05 — if the student has declared mastery, inducing curiosity about something they believe they know is counterproductive without first engaging P64 (CONFIDENCE CALIBRATION).

**15. Composition Constraints:**  
The gap opened by P05 must be resolvable within the current Teaching Action sequence.

**16. Subject Examples:**  
- **Mathematics:** "If I tell you that the rule is 'square the input', what's the output for x=3? Good. Now what if I square the output of that output, and then square THAT output? Does the pattern ever stop growing, or does it escape to infinity? You don't know yet. That's what we're going to find out."  
- **Physics:** "Heavier objects should fall faster — that's the intuition everyone has. But they don't. They fall at exactly the same rate. Why? Gravity is stronger on the heavier object, but something cancels it out. What is that thing?"  
- **English:** "The word 'nice' used to mean something completely different from what it means today. In fact, it used to mean its opposite. How does a word reverse its meaning over 500 years? Let's find out."

---

### P69 — RELEVANCE ANCHORING
**Type:** True Primitive &nbsp;|&nbsp; **Reuse Frequency:** High

**1. Purpose:**  
Connect the concept to the student's personal context, goals, or interests before instruction begins.

**2. Cognitive Objective:**  
Establish personal salience: the student perceives that the concept matters to them specifically, increasing sustained attention and encoding depth.

**3. When to Use:**  
- At session start for any student whose motivation is unclear or low  
- For S8 (Adult Learner) and S9 (Second-Language Learner) who benefit from explicit application context  
- Before introducing concepts that students typically dismiss as "not useful"

**4. When NOT to Use:**  
- When student motivation is already high (S5, engaged S1) — unnecessary preamble  
- When relevance cannot be honestly stated for this concept in this student's context

**5. Student States Supported:**  
S0, S4, S6, S8, S9 (most beneficial); S1, S3 (moderate benefit)

**6. CPA Stage Compatibility:**  
C, P, A — usually delivered verbally before any formal content

**7. Inputs Required:**  
- `student_context`: the student's stated goals, field of interest, or prior-stated application area  
- `concept_application`: a specific, honest connection between the concept and `student_context`

**8. Expected Student Response:**  
Student acknowledges the connection; increases engagement signal; asks a follow-up about the application.

**9. Success Signal:**  
Student references the application connection when working on the concept later in the session.

**10. Failure Signal:**  
Student dismisses the connection as artificial or irrelevant; connection does not match actual student context.

**11. Recovery:**  
Ask the student to state their own goals; generate a revised connection from their response; if no honest connection exists, use P03 (ORIENT) and P05 (CURIOSITY INDUCTION) instead.

**12. Typical Misconceptions Addressed:**  
None — motivational primitive.

**13. Compatible Primitives:**  
P05 (CURIOSITY INDUCTION) after; P03 (ORIENT) before or after; P70 (COMPETENCE EVIDENCE) in the same cluster to build both relevance and confidence.

**14. Incompatible Primitives:**  
P71 (PEER COMPARISON REMOVAL) should not immediately follow P69 — mixing relevance-building with comparison-removal sends a confused motivational signal; separate them.

**15. Composition Constraints:**  
`student_context` must be derived from actual student data (declared interest, prior session context, subject choice) — never fabricated.

**16. Subject Examples:**  
- **Mathematics:** "You mentioned you want to study computer science. Functions are the foundation of every function in programming — the keyword 'function' in code is literally this mathematical concept made executable."  
- **Physics:** "You said you're interested in aviation. Understanding Newton's laws is exactly how engineers design aircraft to stay aloft — the same equations we'll derive today govern every wing ever built."  
- **English:** "You're preparing for academic writing. The ability to infer what a text implies — not just what it says — is what separates a descriptive essay from an analytical one."

---

### P70 — COMPETENCE EVIDENCE
**Type:** True Primitive &nbsp;|&nbsp; **Reuse Frequency:** Medium

**1. Purpose:**  
Show the student concrete evidence of their own growing competence — demonstrated growth, not generic praise.

**2. Cognitive Objective:**  
Shift the student's self-efficacy belief from "I can't do this" toward "I am actually improving," using observable prior-session evidence rather than assertions.

**3. When to Use:**  
- For S6 (Low Confidence) students at session start  
- After a period of struggle, before a new challenge  
- When a student expresses doubt about their capability

**4. When NOT to Use:**  
- For S5 (Mathematically Mature) or S7 (High Confidence Incorrect) — competence evidence for S7 reinforces the wrong schema  
- When prior-session evidence does not exist (first session)

**5. Student States Supported:**  
S6 (primary target); S0, S1, S8, S9 (moderate benefit)

**6. CPA Stage Compatibility:**  
C, P, A — delivered verbally with reference to prior session data

**7. Inputs Required:**  
- `prior_performance_evidence`: specific, timestamped evidence of student success (e.g., "two sessions ago you couldn't classify this; today you classified it in 10 seconds")  
- `growth_dimension`: the specific capability that has grown

**8. Expected Student Response:**  
Student acknowledges the growth; confidence signal increases; student attempts the next challenge with more willingness.

**9. Success Signal:**  
Student is visibly less hesitant about the next challenge than before P70 fired.

**10. Failure Signal:**  
Student dismisses the evidence ("that was easy — this is different"); student remains resistant.

**11. Recovery:**  
Use a more dramatic evidence gap (earlier performance vs. now); connect the growth to the current challenge explicitly ("the skill you just used is the foundation of what we're doing now").

**12. Typical Misconceptions Addressed:**  
None — self-efficacy primitive.

**13. Compatible Primitives:**  
P71 (PEER COMPARISON REMOVAL) in the same cluster for S6 students; P54 (PRODUCTIVE STRUGGLE PERMISSION) after to lower the next challenge's perceived stakes.

**14. Incompatible Primitives:**  
P28 (COGNITIVE CONFLICT INDUCTION) immediately after — do not immediately follow confidence-building with schema-challenging content for S6 students.

**15. Composition Constraints:**  
`prior_performance_evidence` must be factually accurate (drawn from session memory); fabricated evidence is a teaching failure.

**16. Subject Examples:**  
- **Mathematics:** "Look at this problem you attempted in Session 2. You got the category wrong — you said it wasn't a function. Look at what you just classified correctly in 5 seconds. That's the same problem type. You've internalised the criterion."  
- **Physics:** "Three weeks ago, you couldn't distinguish between speed and velocity. Now you've correctly applied the vector distinction three times without prompting. You have that concept."  
- **English:** "In your first paragraph, you summarised the text. In today's paragraph, you made an analytical claim and supported it with evidence. That's a different genre. You've moved."

---

### P71 — PEER COMPARISON REMOVAL
**Type:** True Primitive &nbsp;|&nbsp; **Reuse Frequency:** Situational

**1. Purpose:**  
Explicitly remove social-comparison framing for students whose learning is being inhibited by comparison anxiety.

**2. Cognitive Objective:**  
Shift the student's attention from "how do I compare to others" to "how have I changed since last time" — converting social anxiety into personal growth tracking.

**3. When to Use:**  
- When S6 (Low Confidence) students express social comparison ("everyone else gets it faster")  
- Before introducing challenging content to comparison-anxious students

**4. When NOT to Use:**  
- For S5 (Mathematically Mature) or S7 (High Confidence Incorrect) — social comparison is not their inhibitor  
- When social comparison is not actually present in the student's expressed anxiety

**5. Student States Supported:**  
S6 (primary target); S9 (moderate benefit for students who compare to native speakers)

**6. CPA Stage Compatibility:**  
C, P, A — purely verbal/relational

**7. Inputs Required:**  
- `comparison_statement`: the specific social comparison the student made or implied  
- `reframe_reference`: the personal-growth reference point to substitute

**8. Expected Student Response:**  
Student acknowledges the reframe; shifts from "I'm behind" to "I've grown."

**9. Success Signal:**  
Student stops referencing other students in subsequent turns; self-references own prior performance.

**10. Failure Signal:**  
Student returns to social comparison within the same session; reframe did not take hold.

**11. Recovery:**  
Apply P70 (COMPETENCE EVIDENCE) with a striking performance gap; ask student to explicitly state one thing they can do now that they couldn't do before.

**12. Typical Misconceptions Addressed:**  
None — socio-motivational primitive.

**13. Compatible Primitives:**  
P70 (COMPETENCE EVIDENCE) before or after; P54 (PRODUCTIVE STRUGGLE PERMISSION) after.

**14. Incompatible Primitives:**  
P28 (COGNITIVE CONFLICT INDUCTION) immediately after — do not challenge schemas immediately after removing comparison anxiety.

**15. Composition Constraints:**  
Only fires when comparison anxiety is observed; do not pre-emptively fire for students who have not expressed comparison anxiety.

**16. Subject Examples:**  
- **Mathematics:** "The only comparison that matters in this session is where you were two weeks ago versus today. Other students' pace tells us nothing about your learning."  
- **Physics:** "Physics intuition develops at different rates depending on your prior exposure. The question is whether your intuition is getting more precise — and it is."  
- **English:** "Your English will develop along your own path, not by matching a native speaker timeline. The growth we're tracking is yours alone."

---

### P72 — INTELLECTUAL AUTHORITY TRANSFER
**Type:** True Primitive &nbsp;|&nbsp; **Reuse Frequency:** Medium

**1. Purpose:**  
Gradually transfer ownership of the reasoning from teacher to student across the arc of a session.

**2. Cognitive Objective:**  
Build student agency in the learning process: move from "teacher shows" to "teacher guides" to "student leads" within a single session.

**3. When to Use:**  
- As a session progresses and student competence builds  
- When a student is over-relying on teacher prompts rather than self-directing  
- When the session is approaching the end and student should begin demonstrating independent application

**4. When NOT to Use:**  
- At the start of a session before any competence is established  
- With S0 on a completely new concept (authority transfer before any schema exists produces abandonment anxiety)

**5. Student States Supported:**  
S1, S2, S3, S5, S6, S7 (most states — universal arc of a session); S8, S9 (especially important — adult learners and second-language learners benefit from explicit authority transfer)

**6. CPA Stage Compatibility:**  
C, P, A — the transfer arc occurs across all abstraction levels

**7. Inputs Required:**  
- `current_authority_level`: one of [teacher, joint, student]  
- `transfer_cue`: the specific language that enacts the transfer ("Let's think about it together" → "You tell me")

**8. Expected Student Response:**  
Student begins initiating reasoning steps without waiting for teacher prompts.

**9. Success Signal:**  
Student self-corrects an error or extends reasoning without being prompted.

**10. Failure Signal:**  
Student waits passively for each next instruction; does not initiate.

**11. Recovery:**  
Back up to `joint` authority level; use P35 (OPEN QUESTION) to initiate student reasoning while still holding joint authority; increase transfer pace more gradually.

**12. Typical Misconceptions Addressed:**  
None — metacognitive/relational primitive.

**13. Compatible Primitives:**  
P42 (EXAMPLE GENERATION) and P44 (DEFINITION CONSTRUCTION) are natural successors — they require student authority to execute.

**14. Incompatible Primitives:**  
P10 (WORKED EXAMPLE PRESENTATION) immediately after full authority transfer — reverting to teacher demonstration after transferring authority is confusing.

**15. Composition Constraints:**  
Should increase monotonically during a session (teacher → joint → student); reversals should be treated as recovery steps, not normal composition.

**16. Subject Examples:**  
- **Mathematics:** [Start] "I'll show you how to test this case." [Middle] "Let's work through this one together — what's your first move?" [End] "Now you've got one. Test it yourself."  
- **Physics:** [Start] "I'll apply Newton's Second Law to this system." [Middle] "Here's the system — which direction does the net force point?" [End] "New system. Set up the equation and solve it."  
- **English:** [Start] "I'll identify the implication in this sentence." [Middle] "What do you think this sentence implies?" [End] "Here's a new text. You read it, identify the implied claim, and explain why."

---

### P73 — GENUINE INTEREST SIGNAL
**Type:** True Primitive &nbsp;|&nbsp; **Reuse Frequency:** Medium

**1. Purpose:**  
Respond to a student's thinking with specific, authentic curiosity rather than generic encouragement.

**2. Cognitive Objective:**  
Establish genuine intellectual engagement between teacher and student — treating the student as a thinker, not a test-taker — which deepens encoding and reduces performance anxiety.

**3. When to Use:**  
- When a student produces an interesting, unusual, or creative response  
- When a student's reasoning reveals a genuine insight or a revealing misconception  
- When rapport is needed to maintain engagement

**4. When NOT to Use:**  
- When the student's response is clearly incorrect and needs immediate error correction (P50) — false curiosity about an incorrect response is pedagogically dishonest  
- When overused (P73 every turn becomes generic; reserve for genuinely notable responses)

**5. Student States Supported:**  
S0, S1, S3, S5, S6, S8, S9 — all states benefit from genuine interest; particularly important for S6 (Low Confidence)

**6. CPA Stage Compatibility:**  
C, P, A — the curiosity is about the student's reasoning, not about content at any particular level

**7. Inputs Required:**  
- `student_response_excerpt`: the specific part of the student's response that is genuinely interesting  
- `curiosity_question`: a genuine follow-up question that probes the interesting element

**8. Expected Student Response:**  
Student engages further with the element they produced; expands or defends their thinking.

**9. Success Signal:**  
Student produces more elaborated reasoning in the follow-up; the session deepens at this point.

**10. Failure Signal:**  
Student gives a minimal follow-up; curiosity question does not engage them further.

**11. Recovery:**  
Use P36 (PROBING QUESTION) with a more specific prompt about the same element.

**12. Typical Misconceptions Addressed:**  
None — relational primitive; however, can reveal misconceptions that P41 then targets specifically.

**13. Compatible Primitives:**  
P36 (PROBING QUESTION) after; P53 (ELABORATION REQUEST) after; the two can alternate with P73 to deepen a productive student response.

**14. Incompatible Primitives:**  
P50 (DISCONFIRMATION) immediately after — disconfirming while signalling curiosity about the same response sends a contradictory signal.

**15. Composition Constraints:**  
`curiosity_question` must be genuinely generated from `student_response_excerpt` — cannot be a generic "that's interesting, tell me more."

**16. Subject Examples:**  
- **Mathematics:** "That analogy — 'a function is like a vending machine that never malfunctions' — I haven't heard it framed that way before. Why does that work for you? What's the malfunction?"  
- **Physics:** "You said gravity 'gets heavier objects more.' That's actually a precise observation — can you tell me exactly what it gets more of, and what that changes?"  
- **English:** "You said this sentence is 'polite-aggressive.' That's a real category in linguistics — how does the sentence achieve both at once in your reading?"

---

### P95 — INTERPRETIVE FRAME
**Type:** True Primitive &nbsp;|&nbsp; **Reuse Frequency:** Situational (Literature/English)

**1. Purpose:**  
Establish, before literary analysis begins, that multiple valid interpretations of a text can coexist — and that the goal is to justify an interpretation, not find the single correct one.

**2. Cognitive Objective:**  
Prevent the "single correct answer" schema (dominant from mathematics and sciences) from being imported into literary analysis, where it produces premature closure and inhibits genuine interpretive engagement.

**3. When to Use:**  
- At the start of any literary analysis task  
- When a student is searching for "the right answer" in a context that accepts multiple valid readings  
- When transitioning from a STEM-heavy curriculum to literary content

**4. When NOT to Use:**  
- For factual reading comprehension (where single correct answers exist)  
- For grammar or phonics tasks (where P95's multiple-answer frame is incorrect)  
- When the student is already comfortable with interpretive plurality

**5. Student States Supported:**  
S0, S1, S5 (especially S5 — mathematically mature students need this frame explicitly before literary work); S8, S9

**6. CPA Stage Compatibility:**  
P, A (literary analysis operates at perceptual and abstract levels; rarely Concrete)

**7. Inputs Required:**  
- `text_excerpt`: the passage being interpreted  
- `frame_statement`: explicit statement that multiple readings are possible and the goal is justification quality  
- `justification_criterion`: what makes one interpretation better-justified than another

**8. Expected Student Response:**  
Student begins analysis with "One reading could be…" or "I think this means X because…" rather than "What is the correct meaning?"

**9. Success Signal:**  
Student produces an interpretation and supports it with textual evidence; does not ask "is that right?"

**10. Failure Signal:**  
Student continues asking for the "correct" interpretation; student produces only surface paraphrase.

**11. Recovery:**  
Model the interpretive move explicitly: "Here is ONE reading: [reading]. Here is a DIFFERENT reading: [reading]. Both are supported by the text. Your job is to find a third, or to choose one and make a stronger argument for it."

**12. Typical Misconceptions Addressed:**  
Single-correct-answer schema imported from mathematics/science into literary analysis.

**13. Compatible Primitives:**  
P14 (PREDICTION) after — "before I tell you anything about the poem, what do you expect it to be about?"; P17 (CONTRAST) after — contrast two different valid readings; P48 (ANALOGY CONSTRUCTION) after — student constructs an analogy for the interpretive situation.

**14. Incompatible Primitives:**  
P34 (CLOSED QUESTION) as the first elicitation after P95 — a closed question contradicts the multi-interpretation frame.

**15. Composition Constraints:**  
Must fire before any G-category probe (P74–P80) is used in literary analysis — the probe must be understood as asking for a justified interpretation, not a single correct classification.

**16. Subject Examples:**  
- **Mathematics:** [N/A — P95 does not fire for mathematics]  
- **Physics:** [N/A — P95 does not fire for physics]  
- **English:** "Before we read this poem, I want to establish something: there is no single correct interpretation. What we're looking for is an interpretation that can be justified with evidence from the text. Two people can disagree, and both be right, if both can point to specific lines that support their reading. Your job is not to find THE meaning — it's to build A meaning and justify it."

---

## CATEGORY B — INPUT

*Introduce new information into the cognitive workspace. Controls the modality and abstraction level through which content enters. Every B-category primitive takes a content slot filled by the Knowledge Graph.*

---

### P06 — CONCRETE EMBODIMENT
**Type:** True Primitive &nbsp;|&nbsp; **Reuse Frequency:** High

**1. Purpose:**  
Present the concept in a physical, tangible, or directly perceivable form — no abstraction, no notation, no formula.

**2. Cognitive Objective:**  
Ground the concept in sensory or kinesthetic experience so that subsequent abstractions attach to something the student has experienced rather than something purely symbolic.

**3. When to Use:**  
- As the CPA entry point for any new concept  
- For S0, S6, and S9 — students who are not yet comfortable with abstraction  
- Whenever abstract instruction has failed and the concept needs re-grounding

**4. When NOT to Use:**  
- For S5 (Mathematically Mature) who finds concrete presentation condescending for concepts within their expertise  
- When no honest concrete embodiment exists for the concept (rare; do not fabricate one)  
- GR-3 implication: P08 must not precede P06 in a session; P06 comes first

**5. Student States Supported:**  
S0, S1, S3, S4, S6, S8, S9 (most states; optional for S5)

**6. CPA Stage Compatibility:**  
C (exclusively)

**7. Inputs Required:**  
- `concrete_embodiment_slot`: a physical object, manipulative, lived scenario, or directly perceivable event that instantiates the concept without any symbolic encoding

**8. Expected Student Response:**  
Student can describe the concrete situation in their own words; can identify the key relationship or property in concrete terms.

**9. Success Signal:**  
Student describes the concept's key property using the concrete language ("the vending machine always gives you exactly what the button says").

**10. Failure Signal:**  
Student is confused by the concrete scenario; concrete scenario requires prior knowledge that is absent.

**11. Recovery:**  
Simplify the `concrete_embodiment_slot`; verify prerequisite concepts are in place; switch to a different embodiment if the current one has unintended complexity.

**12. Typical Misconceptions Addressed:**  
None directly, but prevents the most common encoding failure: concept-as-symbol-manipulation without conceptual grounding.

**13. Compatible Primitives:**  
P07 (PERCEPTUAL REPRESENTATION) after — move from concrete to pictorial; P14 (PREDICTION) and P15 (OBSERVATION) can be woven with P06 for experiential discovery.

**14. Incompatible Primitives:**  
P08 (ABSTRACT NOTATION) immediately after without P07 intermediate — GR-3 requires P06→P07→P08 progression.

**15. Composition Constraints:**  
GR-3: P08 cannot fire before P06 or P07 has been established. P06 is the CPA entry point.

**16. Subject Examples:**  
- **Mathematics:** "Here is a vending machine. You press B3. It gives you a bag of chips — exactly one bag, every time. The machine never gives you two things for one button. That reliability is what makes it function-like."  
- **Physics:** "Hold this ball in your hand. You feel the downward pull — that is gravity. Now hold a much heavier book. You feel a stronger pull. The mass is larger; the gravitational force is larger. You've felt Newton's Second Law."  
- **English:** "Listen to these two sounds: /p/ and /b/. Put your hand in front of your mouth. Say /p/ — you feel a puff of air. Say /b/ — much less puff. The only physical difference between these two sounds is that puff. That difference is what makes them two different phonemes."

---

### P07 — PERCEPTUAL REPRESENTATION
**Type:** True Primitive &nbsp;|&nbsp; **Reuse Frequency:** High  
**Note:** Formerly "Pictorial Representation." Renamed with `modality` parameter; visual is the default modality.

**1. Purpose:**  
Present the concept as a structured representation that the student can perceive but not physically interact with — diagram, graph, map, timeline, phoneme chart, or equivalent non-concrete mode.

**2. Cognitive Objective:**  
Make the concept's structure visible (or auditory, for phonics) — one level above concrete, allowing pattern detection and comparison that physical manipulation cannot support.

**3. When to Use:**  
- After P06 (CONCRETE EMBODIMENT) as the CPA second step  
- When the concept's structure can be made visible in a diagram  
- For phonics: after physical phoneme production, move to phoneme charts or segmentation diagrams

**4. When NOT to Use:**  
- Before P06 for S0 students — representation without grounding  
- When the diagram itself requires prior knowledge to read (ensure diagram literacy first)

**5. Student States Supported:**  
S0–S9 — universal second step in CPA; modality parameter adjusts for learning context

**6. CPA Stage Compatibility:**  
P (exclusively)

**7. Inputs Required:**  
- `perceptual_representation_slot`: the diagram, graph, map, chart, or auditory sequence that represents the concept's structure  
- `modality`: one of [visual (default), auditory (phonics/music), spatial, temporal]  
- `key_feature_to_observe`: the specific structural element the student should attend to

**8. Expected Student Response:**  
Student can describe the structural relationship shown in the representation; can point to or name the `key_feature_to_observe`.

**9. Success Signal:**  
Student correctly identifies the structural feature and can relate it to the concrete embodiment from P06.

**10. Failure Signal:**  
Student attends to surface features rather than structural ones ("it's a circle" rather than "every point on the left has exactly one arrow").

**11. Recovery:**  
Use P01 (ATTEND) to redirect to `key_feature_to_observe`; use P17 (CONTRAST) with a second diagram that differs only in the critical structural feature.

**12. Typical Misconceptions Addressed:**  
None directly, but the modality constraint prevents confusing visual surface features with defining structural properties.

**13. Compatible Primitives:**  
P17 (CONTRAST) — two perceptual representations differing on one dimension; P14 (PREDICTION) before showing the second diagram; P08 (ABSTRACT NOTATION) after.

**14. Incompatible Primitives:**  
P08 (ABSTRACT NOTATION) as the immediately preceding primitive — this would violate the CPA order.

**15. Composition Constraints:**  
GR-3: P08 cannot precede P07 in a session. P07 precedes P08 in CPA progression.

**16. Subject Examples:**  
- **Mathematics:** [visual] "Here is the same vending machine as an arrow diagram. Each button on the left has exactly one arrow pointing to exactly one output on the right. Look at the arrows."  
- **Physics:** [visual] "Here is a force diagram — a free-body diagram. The arrows represent forces. The length represents magnitude. The direction tells you where each force acts."  
- **English:** [auditory] "I'm going to say two words: 'cat' and 'bat.' Listen for the first sound only. /k/ — /b/. Those are different phonemes. I'll say them again — listen only to the very first sound."

---

### P08 — ABSTRACT NOTATION
**Type:** True Primitive &nbsp;|&nbsp; **Reuse Frequency:** High

**1. Purpose:**  
Present the concept in symbolic or formal language after concrete and perceptual groundings have been established.

**2. Cognitive Objective:**  
Compress the concept into its most manipulable form — symbolic notation that enables calculations, proofs, and formal operations — while ensuring the notation is understood as compression of something already grasped.

**3. When to Use:**  
- As the third CPA step, after both P06 and P07 have established the concept  
- For S5 (Mathematically Mature) who may start at abstract level for concepts within their domain — but only after confirming that the abstract level is genuinely accessible  
- When the student has explicitly demonstrated conceptual understanding and is ready for formal manipulation

**4. When NOT to Use:**  
- GR-3: never before P06 or P07 has been established for this concept in this session  
- When the student has not yet described the concept in concrete or perceptual terms  
- As the entry point for S0, S6, or S9 students

**5. Student States Supported:**  
S1, S5 (primary); S2, S3, S7 (cautiously — verify concrete grounding first); S0, S6, S9 (only after P06 and P07)

**6. CPA Stage Compatibility:**  
A (exclusively)

**7. Inputs Required:**  
- `abstract_notation_slot`: the symbolic representation of the concept (formula, definition, set notation, proof structure)  
- `notation_derivation`: brief statement connecting the symbol to the concrete/perceptual form already established

**8. Expected Student Response:**  
Student can read the notation and translate it back to the concrete/perceptual representation; can manipulate the notation in a worked example.

**9. Success Signal:**  
Student successfully applies the notation to a new instance without reverting to concrete representation.

**10. Failure Signal:**  
Student manipulates symbols without understanding (produces correct answers by pattern-matching); student cannot explain what the notation means.

**11. Recovery:**  
Return to P07 (PERCEPTUAL REPRESENTATION); explicitly connect each symbol to a visual component ("this f(x) is the single arrow from x to its unique output"); re-advance to P08.

**12. Typical Misconceptions Addressed:**  
Symbol-manipulation without conceptual grounding (the most common failure mode of abstract-first instruction).

**13. Compatible Primitives:**  
P22 (SPECIALISATION) after — apply the abstract notation to specific cases; P23 (DECOMPOSITION) after — break the notation into components; P34 (CLOSED QUESTION) to test notation reading.

**14. Incompatible Primitives:**  
P06 (CONCRETE EMBODIMENT) immediately after P08 — reverting to concrete after abstract is valid as a recovery move but should be flagged as a recovery, not a routine sequence.

**15. Composition Constraints:**  
GR-3 (P08 may not precede P06 or P07 in the session). `notation_derivation` is mandatory — notation without connection to prior grounding violates the CPA contract.

**16. Subject Examples:**  
- **Mathematics:** "The arrow diagram says: one input, one output. In notation: f: A → B where for each x ∈ A, there is exactly one y ∈ B with f(x) = y. The arrow is the f; the 'exactly one' is what the arrow diagram showed."  
- **Physics:** "The force-object-acceleration relationship becomes F = ma. F is the net force arrow from the diagram; m is the mass you felt in your hand; a is the change in motion. The equation is the diagram compressed."  
- **English:** "The phonemic transcription /kæt/ uses IPA symbols. /k/ is the stop you felt with the puff; /æ/ is the vowel; /t/ is the final stop. The symbols are the sounds made writable."

---

### P09 — NARRATIVE FRAMING
**Type:** True Primitive &nbsp;|&nbsp; **Reuse Frequency:** Medium

**1. Purpose:**  
Embed the concept in a story, scenario, or real-world situation that activates episodic memory networks.

**2. Cognitive Objective:**  
Increase retention by encoding the concept within a temporal, causal, or character-based structure — episodic memory has longer retention traces than semantic memory alone.

**3. When to Use:**  
- When a concept has a natural story or historical context  
- For S8 (Adult Learner) and S9 (Second-Language Learner) who benefit from rich situational context  
- When a student has failed to retain the concept from semantic instruction alone

**4. When NOT to Use:**  
- When the narrative is so complex that it becomes extraneous cognitive load (narrative must be simpler than the concept)  
- For S5 students who find narrative framing infantilising for concepts within their expertise

**5. Student States Supported:**  
S0, S1, S4, S8, S9 (primary); S3, S6 (moderate benefit)

**6. CPA Stage Compatibility:**  
C, P — narrative is usually concrete or perceptual; rarely used at abstract level

**7. Inputs Required:**  
- `narrative_slot`: the story, scenario, or historical context that contains the concept  
- `narrative_concept_connection`: explicit statement of how the concept appears in the narrative

**8. Expected Student Response:**  
Student can retell the narrative and identify where the concept appears within it.

**9. Success Signal:**  
Student references the narrative spontaneously when solving a later problem using the same concept.

**10. Failure Signal:**  
Student retains the story but cannot extract the concept from it; narrative becomes a distraction.

**11. Recovery:**  
Reduce narrative length; increase the explicitness of `narrative_concept_connection`; use P17 (CONTRAST) to compare the narrative scenario with a non-narrative instance.

**12. Typical Misconceptions Addressed:**  
None directly; prevents concept as "arbitrary rule" by embedding it in a context where it solves a real problem.

**13. Compatible Primitives:**  
P04 (CONTEXTUALIZE) before — contextualize then frame as narrative; P05 (CURIOSITY INDUCTION) within — build the narrative toward a knowledge gap.

**14. Incompatible Primitives:**  
P08 (ABSTRACT NOTATION) immediately after P09 without intervening processing — GR-3 applies.

**15. Composition Constraints:**  
Narrative must resolve in a way that makes the concept's utility clear; open-ended narratives that don't demonstrate the concept's value are incomplete.

**16. Subject Examples:**  
- **Mathematics:** "Euler was studying bridges in Königsberg. Seven bridges, four land masses. Could he walk across all seven bridges exactly once? He couldn't find a route, so he proved no route could exist. That proof invented graph theory — and the concept of function is the building block of every graph."  
- **Physics:** "Galileo dropped two balls from the Tower of Pisa. His contemporaries were certain the heavier ball would land first. They were wrong. He needed a new framework to explain why — and Newton's Laws were that framework."  
- **English:** "In 1066, Norman French speakers invaded England. For 200 years, the ruling class spoke French and the common people spoke Old English. That's why we have 'cow' (Old English, for the farmers who tended it) and 'beef' (French, for the nobles who ate it). Two languages, one concept, two words — that's where English vocabulary came from."

---

### P10 — WORKED EXAMPLE PRESENTATION
**Type:** True Primitive &nbsp;|&nbsp; **Reuse Frequency:** High

**1. Purpose:**  
Show the complete execution of a procedure from start to finish before the student attempts it.

**2. Cognitive Objective:**  
Provide a cognitive schema for the procedure — a complete model the student can hold in working memory and then attempt to replicate, compare against, and eventually internalize.

**3. When to Use:**  
- When introducing a new procedural skill for the first time  
- For S0, S4 — students without a procedure schema  
- Before any P11 (PARTIAL WORKED EXAMPLE)

**4. When NOT to Use:**  
- For S5 who finds full examples condescending for procedures within their expertise  
- When the student has already demonstrated the procedure correctly — showing a worked example when the student knows the procedure creates passive imitation instead of active schema use

**5. Student States Supported:**  
S0, S1, S4, S8, S9 (primary); S3 (moderate — latent schema may activate with example)

**6. CPA Stage Compatibility:**  
C, P, A — worked examples can be at any abstraction level

**7. Inputs Required:**  
- `procedure_slot`: the step-by-step procedure being demonstrated  
- `worked_example_instance`: a specific case on which the procedure is executed  
- `annotation_slot`: verbal or written annotation of each step ("I'm doing X because Y")

**8. Expected Student Response:**  
Student can identify each step in the worked example; can articulate the purpose of each step.

**9. Success Signal:**  
Student can answer "why is that step there?" for each step without referencing the annotation.

**10. Failure Signal:**  
Student can imitate the steps but cannot explain why each step is taken; student copies without understanding (imitation without schema).

**11. Recovery:**  
Use P13 (EXPERT THINK-ALOUD) to make the reasoning more explicit; use P23 (DECOMPOSITION) on the worked example to break it into smaller components.

**12. Typical Misconceptions Addressed:**  
None directly, but exposes implicit misconceptions when student fails to follow a step for a stated reason that contradicts their schema.

**13. Compatible Primitives:**  
P11 (PARTIAL WORKED EXAMPLE) after — reduce scaffolding; P13 (EXPERT THINK-ALOUD) paired with — add metacognitive narration; P34 (CLOSED QUESTION) after each step.

**14. Incompatible Primitives:**  
P22 (SPECIALISATION) before P10 — student cannot specialize a procedure they have not yet seen.

**15. Composition Constraints:**  
P10 must precede P11; P10 must precede P12 in the fading sequence. Named Compound P12 expands as P10→P82→P10→P82→P10.

**16. Subject Examples:**  
- **Mathematics:** "I'm going to classify this correspondence as a function or not. Step 1: I identify all the inputs. Step 2: I trace every arrow from each input. Step 3: I check — does any input have more than one arrow? This one has input 2 going to both A and B. Two arrows from one input. Not a function."  
- **Physics:** "I'm going to find the net force on this object. Step 1: draw all forces as arrows. Step 2: identify direction — these two are opposite, so they partially cancel. Step 3: subtract magnitudes. Step 4: state the net force magnitude and direction."  
- **English:** "I'm going to identify the implied claim in this sentence. Step 1: read the surface statement. Step 2: ask what must be true for this statement to make sense. Step 3: that prerequisite assumption is the implied claim. Let me do it: 'You should see a doctor.' Surface: advice to see a doctor. Implied: something is wrong with you, or will be if you don't act."

---

### P11 — PARTIAL WORKED EXAMPLE
**Type:** True Primitive &nbsp;|&nbsp; **Reuse Frequency:** Medium

**1. Purpose:**  
Present a procedure with deliberate gaps for the student to complete, reducing cognitive load while maintaining the full procedure's scaffold.

**2. Cognitive Objective:**  
Allow the student to participate in procedure execution before they can do it independently — a Goldilocks scaffold: enough structure to prevent failure, enough gap to require active processing.

**3. When to Use:**  
- After P10 (WORKED EXAMPLE PRESENTATION) — the student has seen the full procedure  
- When the student is in the transition between observer and independent practitioner  
- For complex procedures with many steps where full independent execution would overwhelm working memory

**4. When NOT to Use:**  
- Before P10 — partial examples without full procedure models are confusing  
- When all gaps are trivially easy (the scaffold is too strong to require processing)  
- When all gaps are hard (the scaffold is insufficient; provide more of the solution)

**5. Student States Supported:**  
S0, S1, S4 (primary); S3 (moderate)

**6. CPA Stage Compatibility:**  
C, P, A — depends on what abstraction level the procedure operates at

**7. Inputs Required:**  
- `partial_example_slot`: the procedure with specific steps blanked out  
- `gap_specification`: which steps are blanked and why (the gaps should target the most cognitively demanding steps, not arbitrary ones)

**8. Expected Student Response:**  
Student successfully fills the gaps with correct reasoning; can explain why each gap was filled as it was.

**9. Success Signal:**  
Student fills gaps correctly AND can articulate the reasoning for each gap.

**10. Failure Signal:**  
Student fills gaps by guessing without reasoning; student cannot fill any gaps.

**11. Recovery:**  
Reduce gap count (fewer blanks); move gaps to simpler steps; return to P10 for the full procedure.

**12. Typical Misconceptions Addressed:**  
None directly, but reveals which steps the student has and has not internalized.

**13. Compatible Primitives:**  
P10 (WORKED EXAMPLE PRESENTATION) before; P82 (FADING) to manage gap expansion; P36 (PROBING QUESTION) to verify gap reasoning.

**14. Incompatible Primitives:**  
P42 (EXAMPLE GENERATION) immediately after P11 — full independent generation requires more scaffolding withdrawal than P11 provides.

**15. Composition Constraints:**  
Must follow at least one P10 in the sequence. Gaps should be progressively harder in a multi-step procedure. Named Compound P12 (FADED WORKED EXAMPLE) uses P82 between successive P11 instances.

**16. Subject Examples:**  
- **Mathematics:** "Classify this correspondence. I've done Step 1 for you — here are all the inputs listed. Now you do Step 2: trace every arrow from each input. [pause] Now I'll show you Step 3: input 3 has one arrow, input 1 has one arrow — is this a function?"  
- **Physics:** "I've drawn the force diagram for you. You do the next step: identify which forces are in the same direction and which are opposite. Then I'll show you how to calculate the net magnitude."  
- **English:** "I've identified the surface statement. You do the next step: ask what must be true for this statement to make sense. State it as a sentence. Then I'll confirm whether you've found the implied claim."

---

### P12 — FADED WORKED EXAMPLE
**Type:** Named Compound &nbsp;|&nbsp; **Expansion:** `P10 → P82[fade_target: specify what support element is removed at this step] → P10 → P82[fade_target: specify what support element is removed at this step] → P10`

**1. Purpose:**  
Systematically withdraw procedural scaffolding across three worked examples, moving the student from complete observation to near-complete independence.

**2. Cognitive Objective:**  
Build procedural fluency through graduated autonomy — each iteration requires more student production, reducing cognitive load management from the teacher to the student incrementally.

**3. When to Use:**  
- For any multi-step procedure where full independence is the target  
- When the student is ready to move from observed examples to near-independent practice  
- As the primary procedure-teaching mechanism for S1 (Procedural Carrier) who needs to overwrite incorrect procedure

**4. When NOT to Use:**  
- When only one worked example has been given (cannot fade what has not been established)  
- When the fading pace is wrong for the student — calibrate P82 (FADING) based on success signals between iterations

**5. Student States Supported:**  
S0, S1, S4, S8 (primary)

**6. CPA Stage Compatibility:**  
C, P, A — procedure fading works at any abstraction level

**7. Inputs Required:**  
- All inputs from P10 applied three times  
- `fading_rate`: slow (remove 1 step per iteration), medium (remove 2–3 steps), fast (remove half the procedure per iteration)

**8. Expected Student Response:**  
After three iterations: student can execute the full procedure independently on a new instance.

**9. Success Signal:**  
Third iteration: student fills all gaps correctly without prompting; can explain each step.

**10. Failure Signal:**  
Student fails at the same gap across multiple iterations — this gap is the location of the missing schema.

**11. Recovery:**  
Pause the fading sequence; address the failing gap directly with P17 (CONTRAST) or P28 (COGNITIVE CONFLICT INDUCTION) if the failure reveals a misconception.

**12. Typical Misconceptions Addressed:**  
Procedural misconceptions (wrong procedure steps) are exposed and can be targeted at the gap location.

**13. Compatible Primitives:**  
P36 (PROBING QUESTION) between iterations to verify reasoning; P42 (EXAMPLE GENERATION) after the three-iteration sequence for independent application.

**14. Incompatible Primitives:**  
P68 (MASTERY SELF-DECLARATION) after only one iteration — mastery cannot be claimed before the full fading sequence.

**15. Composition Constraints:**  
GR-10 (expand before validation): validate as P10→P82→P10→P82→P10. Each P82 must specify which steps are being withdrawn. Three iterations is the canonical form; more iterations are permitted for high-complexity procedures.

**16. Subject Examples:**  
- **Mathematics:** [P10 full] Complete classification worked. [P82: withdraw Step 3] [P10 partial] Student does Step 3. [P82: withdraw Steps 2–3] [P10 partial] Student does Steps 2–3. Student has now executed the complete procedure independently.  
- **Physics:** [P10 full] Complete force-diagram-to-net-force worked. [P82] Student fills in direction step. [P82] Student fills in direction + calculation steps.  
- **English:** [P10 full] Complete implied-claim identification worked. [P82] Student identifies the prerequisite assumption. [P82] Student does full implied-claim derivation.

---

### P13 — EXPERT THINK-ALOUD
**Type:** True Primitive &nbsp;|&nbsp; **Reuse Frequency:** Medium

**1. Purpose:**  
Make an expert's internal reasoning visible during problem-solving — what is noticed, what alternatives are considered, what drives each decision.

**2. Cognitive Objective:**  
Teach metacognitive process: not just WHAT the expert does, but HOW they think while doing it — which is normally invisible and cannot be inferred from watching the procedure alone.

**3. When to Use:**  
- For complex problems where the procedure is insufficient (the student needs to understand the decision logic)  
- When P10 (WORKED EXAMPLE PRESENTATION) exposes the steps but not the reasoning  
- For S5 (Mathematically Mature) students who have procedural fluency but not expert-level metacognition

**4. When NOT to Use:**  
- For simple procedures where the metacognitive content is trivial  
- For S0 students — expert reasoning may overwhelm a student with no procedural schema to attach it to

**5. Student States Supported:**  
S1, S3, S5 (primary); S4 (useful when the gap is metacognitive, not just procedural)

**6. CPA Stage Compatibility:**  
P, A (expert reasoning is usually about perceptual patterns and abstract structures, not concrete manipulation)

**7. Inputs Required:**  
- `problem_instance`: the problem being solved  
- `think_aloud_script`: a structured narration of expert reasoning, including moments of uncertainty and decision-making

**8. Expected Student Response:**  
Student can distinguish between "what the expert did" (procedure) and "why the expert decided that" (metacognition); can articulate at least one decision the expert made.

**9. Success Signal:**  
Student can narrate why the expert chose a particular path at a decision fork in the problem.

**10. Failure Signal:**  
Student describes the steps (procedure) but cannot describe the decisions (metacognition).

**11. Recovery:**  
Slow the think-aloud at the decision forks; repeat each decision point and ask P36 (PROBING QUESTION) before continuing.

**12. Typical Misconceptions Addressed:**  
"Mathematics is about memorizing procedures" — expert think-aloud reveals that mathematics involves ongoing decision-making, not just procedure execution.

**13. Compatible Primitives:**  
P10 (WORKED EXAMPLE PRESENTATION) before or after — P13 adds metacognitive layer; P40 (METACOGNITIVE PROMPT) after — student applies the same metacognitive narration to their own work.

**14. Incompatible Primitives:**  
P34 (CLOSED QUESTION) immediately after — a closed question tests recall, not metacognitive awareness; use P35 or P40 instead.

**15. Composition Constraints:**  
`think_aloud_script` must include at least one explicit decision fork — a moment where the expert chose path A over path B and stated why.

**16. Subject Examples:**  
- **Mathematics:** "I'm looking at this problem and I notice something — it's asking me for a net force, but I see three forces. My first instinct is to add them. But wait — some are in opposite directions. I have to think about direction first. So I pause the arithmetic and diagram the directions. That pause is not hesitation — it's necessary."  
- **Physics:** "I'm given mass and acceleration. I know F=ma. But I'm not sure whether they're asking for net force or a specific force in the system. I read the problem again carefully: 'the tension in the rope.' That's one specific force. Now I need to identify what other forces are present and set up the equation differently."  
- **English:** "I'm reading this passage and I notice the writer uses the word 'unfortunately.' That's a signal — the writer has a perspective. What does the writer think is unfortunate? I don't answer that yet — I read the next sentence first. The next sentence clarifies. Now I have a claim: the writer believes X and regrets Y."

---

## CATEGORY C — PROCESSING

*Transform input into structured understanding. These are the computational operations that produce comprehension from raw input. Every Processing primitive requires at least one B-category primitive to have fired first.*

---

### P14 — PREDICTION
**Type:** True Primitive &nbsp;|&nbsp; **Reuse Frequency:** Very High

**1. Purpose:**  
Direct the student to predict an outcome before observing it.

**2. Cognitive Objective:**  
Activate active encoding: the student places a cognitive "stake" before seeing the result. Confirmation or violation of the prediction produces stronger encoding than passive observation.

**3. When to Use:**  
- Before any demonstration, experiment, or example result is revealed  
- Before P15 (OBSERVATION) — they always pair  
- When introducing a concept via discovery rather than exposition

**4. When NOT to Use:**  
- When the student has zero basis for a prediction (no prior schema, no concrete grounding) — P06 or P07 must have fired first  
- When the answer is so obvious it produces no cognitive stake

**5. Student States Supported:**  
S0–S9 (universal, but calibrate to ensure there is a basis for the prediction)

**6. CPA Stage Compatibility:**  
C, P, A — predictions can be made at any abstraction level

**7. Inputs Required:**  
- `scenario_slot`: the situation about which the student will predict  
- `prediction_question`: "What do you think will happen when…?"

**8. Expected Student Response:**  
Student produces a prediction; ideally states the reason for it.

**9. Success Signal:**  
Student commits to a specific prediction (not "I don't know") and can state a reason.

**10. Failure Signal:**  
Student cannot predict (no basis); student refuses to commit.

**11. Recovery:**  
Provide a partial concrete scenario (P06) to give a basis; ask a simpler prediction about one component of the scenario.

**12. Typical Misconceptions Addressed:**  
None directly, but predictions surface implicit misconceptions before they are confirmed or challenged.

**13. Compatible Primitives:**  
P15 (OBSERVATION) always follows; P17 (CONTRAST) after to compare prediction vs. outcome; P28 (COGNITIVE CONFLICT INDUCTION) when prediction is wrong.

**14. Incompatible Primitives:**  
P49 (CONFIRMATION) immediately after P14 — confirming the prediction before P15 reveals the outcome is premature.

**15. Composition Constraints:**  
GR-2: P55 (WAIT TIME) must follow the prediction question before moving to P15. The wait is mandatory — students who are rushed to predict often guess rather than reason.

**16. Subject Examples:**  
- **Mathematics:** "Before I show you the output — what does f(x) = x² give when x = −3? Predict."  
- **Physics:** "Before the demonstration: which ball do you think hits the ground first — the heavy one or the light one? State your prediction and your reason."  
- **English:** "Before you read the second stanza: given the tone of the first stanza, what emotion do you expect the second to carry?"

---

### P15 — OBSERVATION
**Type:** True Primitive &nbsp;|&nbsp; **Reuse Frequency:** Very High

**1. Purpose:**  
Direct the student to attend to and record what actually happens after a prediction or demonstration.

**2. Cognitive Objective:**  
Create a precise factual record of the outcome that the student can compare to their prediction — the comparison produces encoding.

**3. When to Use:**  
- After P14 (PREDICTION) — always paired  
- After any demonstration, result, or worked-example step where the outcome needs explicit attention

**4. When NOT to Use:**  
- Without P14 first (observation without a prior prediction is passive reception, not active encoding)

**5. Student States Supported:**  
S0–S9 (universal)

**6. CPA Stage Compatibility:**  
C, P, A

**7. Inputs Required:**  
- `observation_target`: what the student should observe  
- `observation_question`: "What actually happened? What did you notice?"

**8. Expected Student Response:**  
Student describes the outcome accurately, ideally noting whether it matched their prediction.

**9. Success Signal:**  
Student correctly describes the outcome AND notes whether it matched or violated their prediction.

**10. Failure Signal:**  
Student describes prediction as outcome ("I thought it would…"); student cannot separate what happened from what they expected.

**11. Recovery:**  
Slow down; repeat the demonstration; use P01 (ATTEND) to ensure the student is observing the right element; separate the prediction ("what did you think?") from the observation ("what actually happened?") explicitly.

**12. Typical Misconceptions Addressed:**  
Confirmation bias (student perceives the outcome as matching their prediction when it did not).

**13. Compatible Primitives:**  
P14 (PREDICTION) always precedes; P17 (CONTRAST) after to compare prediction vs. observation; P20 (PATTERN DETECTION) when multiple P14+P15 pairs have been run.

**14. Incompatible Primitives:**  
P68 (MASTERY SELF-DECLARATION) immediately after a single P15 — one observation is insufficient for mastery.

**15. Composition Constraints:**  
P15 must follow P14 in any Teaching Action that uses either primitive. P55 (WAIT TIME) between P14 and P15 is required by GR-2.

**16. Subject Examples:**  
- **Mathematics:** "Now I'll tell you: f(−3) = (−3)² = 9. Did that match your prediction? What do you notice about negative inputs into x²?"  
- **Physics:** "They hit at the same time. Both balls. Every time. Does that match what you predicted?"  
- **English:** "Read the second stanza now. What emotion does it actually carry? Does that match what you predicted from the first stanza?"

---

### P16 — COMPARISON
**Type:** True Primitive &nbsp;|&nbsp; **Reuse Frequency:** High

**1. Purpose:**  
Direct the student to identify similarities between two or more instances of a concept.

**2. Cognitive Objective:**  
Build a multi-instance representation of the concept that includes shared features — prerequisite to pattern detection (P20) and generalisation (P21).

**3. When to Use:**  
- Before P17 (CONTRAST) — comparison identifies what is shared; contrast isolates what differs  
- When introducing concept instances to build a prototype  
- Before P20 (PATTERN DETECTION)

**4. When NOT to Use:**  
- With only one instance (comparison requires at least two)  
- When the instances share too many features — oversimilar instances make comparison trivial

**5. Student States Supported:**  
S0–S9 (universal)

**6. CPA Stage Compatibility:**  
C, P, A

**7. Inputs Required:**  
- `instance_A_slot`: first instance  
- `instance_B_slot`: second instance (or more)  
- `comparison_question`: "What is the same about A and B?"

**8. Expected Student Response:**  
Student identifies shared features — both relevant (defining features) and incidental (surface features).

**9. Success Signal:**  
Student identifies at least one relevant (defining) shared feature.

**10. Failure Signal:**  
Student identifies only surface features; student cannot find any commonality.

**11. Recovery:**  
Prompt with P36 (PROBING QUESTION): "Look at the relationship between inputs and outputs — is that the same in both?" Guide toward the defining feature without naming it.

**12. Typical Misconceptions Addressed:**  
None directly, but reveals which features the student considers definitionally relevant.

**13. Compatible Primitives:**  
P17 (CONTRAST) always pairs with P16 in a complete minimal-pair analysis; P20 (PATTERN DETECTION) after multiple comparison rounds.

**14. Incompatible Primitives:**  
No hard incompatibilities; P17 and P16 should not be used in reverse order (contrast before comparison produces confusion about what is being isolated).

**15. Composition Constraints:**  
Comparisons before contrasts is the canonical order. Both primitives together form the foundation for P21 (GENERALISATION).

**16. Subject Examples:**  
- **Mathematics:** "Here are three arrow diagrams, all of which are functions. What do they have in common? What is true of all three that might not be coincidence?"  
- **Physics:** "Here are two systems where F = ma applies correctly. What is the same about how we set up the equation in both cases?"  
- **English:** "Here are two sentences that use the passive voice. What do they have in common — structurally, not in content?"

---

### P17 — CONTRAST
**Type:** True Primitive &nbsp;|&nbsp; **Reuse Frequency:** Very High

**1. Purpose:**  
Isolate the defining feature of a concept by presenting a minimal pair — two instances that differ on exactly the dimension the concept turns on.

**2. Cognitive Objective:**  
Enable feature isolation: the brain cannot determine which features of an example are defining without seeing a case that is identical except for the critical feature. Contrast eliminates all irrelevant features simultaneously.

**3. When to Use:**  
- When introducing the defining property of any concept  
- When a student's schema contains irrelevant features ("a function has a formula")  
- When two adjacent concepts need discrimination (function vs. injective function)

**4. When NOT to Use:**  
- Before the student has seen at least one instance of the concept (P06 or P07 must have fired first)  
- With more than one dimension of difference between the pair — multi-dimensional contrast confounds  
- For S6 students who are anxious — contrast creates cognitive load; add P54 (PRODUCTIVE STRUGGLE PERMISSION) before

**5. Student States Supported:**  
S0–S9 (universal; most powerful primitive by cross-study effect size)

**6. CPA Stage Compatibility:**  
C, P, A

**7. Inputs Required:**  
- `positive_instance_slot`: an instance that satisfies the concept  
- `negative_instance_slot`: an instance identical to A except for the one critical dimension  
- `contrast_question`: "What is different between these two? What makes one work and the other not?"

**8. Expected Student Response:**  
Student identifies the critical (not surface) difference between the two instances.

**9. Success Signal:**  
Student names the critical dimension in terms of the concept's defining property, not surface features.

**10. Failure Signal:**  
Student identifies surface features ("the second diagram has more arrows total"); student identifies multiple differences and cannot prioritise.

**11. Recovery:**  
Use P01 (ATTEND) to redirect: "Focus only on the arrows from input 3. What's different about input 3?"; redesign the pair to have fewer incidental differences.

**12. Typical Misconceptions Addressed:**  
Surface-feature schemas (student thinks the defining feature is something incidental to the examples shown); incorrect boundary conditions.

**13. Compatible Primitives:**  
P14 (PREDICTION) before the negative instance is revealed; P36 (PROBING QUESTION) after; P21 (GENERALISATION) after; P28 (COGNITIVE CONFLICT INDUCTION) can follow when the contrast reveals a misconception.

**14. Incompatible Primitives:**  
P08 (ABSTRACT NOTATION) as the only input before contrast — notation-based contrast requires concrete grounding first (GR-3).

**15. Composition Constraints:**  
The minimal pair must differ on exactly ONE dimension. Pairs with multiple differences are invalid and must be redesigned before use.

**16. Subject Examples:**  
- **Mathematics:** "Here are two arrow diagrams. Both have inputs 1, 2, 3. Both have outputs A, B, C. In the first, input 2 goes to B. In the second, input 2 goes to BOTH B and C. What is the only difference? What makes the second one fail to be a function?"  
- **Physics:** "These two systems are identical except for one thing: in System A, the applied force is 10N; in System B, the applied force is 20N. Mass is the same. What happens to acceleration? Why?"  
- **English:** "'The door was opened by the wind.' 'The wind opened the door.' Same event, different sentence. What changed? What is the grammatical difference?"

---

### P18 — CLASSIFICATION
**Type:** True Primitive &nbsp;|&nbsp; **Reuse Frequency:** High

**1. Purpose:**  
Direct the student to categorise instances into groups by applying a learned criterion.

**2. Cognitive Objective:**  
Test whether the criterion has been internalised as a schema (the student can apply it to new instances) rather than memorised as a fact (the student can state it but not use it).

**3. When to Use:**  
- After P17 (CONTRAST) — the criterion has been isolated; now test whether the student can apply it  
- As a low-stakes check before moving to more complex protocol stages  
- For P74 (CLASSIFICATION PROBE) in assessment mode

**4. When NOT to Use:**  
- Before the criterion has been taught (P17 must have fired)  
- With overly complex instances that introduce new concepts not yet covered

**5. Student States Supported:**  
S0–S9 (universal — this is the workhorse test of concept grasp)

**6. CPA Stage Compatibility:**  
C, P, A

**7. Inputs Required:**  
- `classification_instances`: 3–5 new instances, including both positive and negative examples  
- `criterion_slot`: the classification criterion (applied by the student, not stated by the teacher)

**8. Expected Student Response:**  
Student correctly classifies each instance and states the reason for each classification.

**9. Success Signal:**  
Student classifies correctly AND provides a criterion-based justification (not "because it looks like the other one").

**10. Failure Signal:**  
Student misclassifies; or classifies correctly but cannot provide a reason (pattern-matching without schema).

**11. Recovery:**  
Use P41 (DIAGNOSTIC QUESTION) to determine whether the error is a missing criterion or an applied misconception; then route to P17 (CONTRAST) for criterion re-isolation or P28 (COGNITIVE CONFLICT INDUCTION) for misconception repair.

**12. Typical Misconceptions Addressed:**  
Reveals prototype-based classification (student classifies based on resemblance to the canonical example rather than by criterion application).

**13. Compatible Primitives:**  
P17 (CONTRAST) before; P36 (PROBING QUESTION) after each classification to verify reasoning; P74 (CLASSIFICATION PROBE) in assessment mode is the formal version.

**14. Incompatible Primitives:**  
P68 (MASTERY SELF-DECLARATION) immediately after one classification round — one round is insufficient.

**15. Composition Constraints:**  
At least 3 instances; at least one negative example in the set; reason must be solicited for every classification (not just wrong ones).

**16. Subject Examples:**  
- **Mathematics:** "I'm going to show you 5 correspondences. For each one: is it a function? Give your reason." [Show: mapping with two arrows from one input; mapping that is bijective; mapping with one input unmapped; vertical line test graph; relation that is not a function.]  
- **Physics:** "For each of these situations: is this a case where Newton's Second Law applies as F_net = ma? State your reason." [Object in free fall; object at rest; object with two opposing forces; accelerating car; projectile mid-flight.]  
- **English:** "For each of these sentences: is it passive voice? State your reason." [Two passive, two active, one ambiguous.]

---

### P19 — ORDERING/SEQUENCING
**Type:** True Primitive &nbsp;|&nbsp; **Reuse Frequency:** Medium

**1. Purpose:**  
Direct the student to place items in a principled sequence by complexity, time, logical dependency, or magnitude.

**2. Cognitive Objective:**  
Reveal structural understanding of relationships — whether the student understands not just what things are, but how they relate to each other in order.

**3. When to Use:**  
- When concept understanding requires knowing the order of operations, the logical dependency chain, or the temporal sequence  
- When a student has learned isolated facts but not their relational structure

**4. When NOT to Use:**  
- When the ordering has no principled basis (arbitrary lists do not benefit from sequencing)  
- When all items are at the same level of complexity or dependency

**5. Student States Supported:**  
S1, S3, S5 (primary); S0, S4 with scaffolding

**6. CPA Stage Compatibility:**  
C, P, A

**7. Inputs Required:**  
- `items_to_order`: the set of items to be sequenced  
- `ordering_principle`: complexity, dependency, time, magnitude  
- `ordering_question`: "Put these in order from [principle] — explain why"

**8. Expected Student Response:**  
Student produces the correct sequence and can state the ordering principle that justifies it.

**9. Success Signal:**  
Student sequences correctly and articulates why each item precedes the next.

**10. Failure Signal:**  
Student sequences by surface feature (e.g., alphabetical, aesthetic preference); correct sequence but wrong reason.

**11. Recovery:**  
Provide P81 (SCAFFOLDING) by fixing two endpoints; ask student to place the middle items; increase difficulty gradually.

**12. Typical Misconceptions Addressed:**  
Conflation of different levels of abstraction (student places specific instances at the same level as general principles).

**13. Compatible Primitives:**  
P16 (COMPARISON) and P17 (CONTRAST) before — comparison/contrast establishes the relationship basis for ordering; P21 (GENERALISATION) can follow — the ordering reveals a principle.

**14. Incompatible Primitives:**  
No hard incompatibilities.

**15. Composition Constraints:**  
The ordering principle must be stated to the student before sequencing (they must know the basis, not discover it).

**16. Subject Examples:**  
- **Mathematics:** "Here are four representations of the same concept: a physical example, an arrow diagram, a graph, and an equation. Order them from most concrete to most abstract, and justify each step."  
- **Physics:** "Order these events in a falling-object scenario from earliest to latest: terminal velocity reached; object begins to fall; air resistance equals gravity; maximum speed."  
- **English:** "Order these stages of a formal essay from the earliest to appear to the latest: evidence; claim; analysis; introduction; conclusion."

---

### P20 — PATTERN DETECTION
**Type:** True Primitive &nbsp;|&nbsp; **Reuse Frequency:** High

**1. Purpose:**  
Direct the student to identify a recurring structure across multiple instances.

**2. Cognitive Objective:**  
Build the prerequisite for generalisation: the student must see the pattern before they can extract the general rule.

**3. When to Use:**  
- After multiple instances have been presented (P16 + P17 across 3+ instances)  
- When the student needs to discover a rule inductively rather than receive it deductively  
- Before P21 (GENERALISATION)

**4. When NOT to Use:**  
- With fewer than 3 instances (patterns require a minimum set)  
- When the instances are too similar (no variation → trivial pattern → weak generalisation)

**5. Student States Supported:**  
S0–S9 (universal)

**6. CPA Stage Compatibility:**  
C, P, A

**7. Inputs Required:**  
- `instance_set`: 3+ instances that all exhibit the same underlying structure  
- `pattern_question`: "What is the same across all of these?"

**8. Expected Student Response:**  
Student identifies the recurring structural feature (not surface similarity).

**9. Success Signal:**  
Student states the pattern in terms of structure, not surface features.

**10. Failure Signal:**  
Student identifies surface similarity; student cannot see any pattern.

**11. Recovery:**  
Add a negative instance (P17 logic applied at scale); use P01 (ATTEND) to redirect to the critical structural dimension; reduce number of surface features to make the structural pattern more salient.

**12. Typical Misconceptions Addressed:**  
Surface-feature prototype schemas (broken by exposure to structurally similar but surface-dissimilar instances).

**13. Compatible Primitives:**  
P16 (COMPARISON) and P17 (CONTRAST) before — they build the multi-instance set; P21 (GENERALISATION) after — pattern detection leads directly to generalisation.

**14. Incompatible Primitives:**  
P22 (SPECIALISATION) immediately after P20 — specialisation requires P21 first.

**15. Composition Constraints:**  
At least 3 instances required. The instance set should vary surface features while holding structural features constant, maximising the detectability of the relevant pattern.

**16. Subject Examples:**  
- **Mathematics:** "Here are five functions that look completely different: a vending machine, a formula, an arrow diagram, a table, a graph. What is the same structural property across all five?"  
- **Physics:** "Here are four F = ma problems: a falling object, a braking car, a ball thrown up, a rocket. What is always the same about how we set up the equation?"  
- **English:** "Here are five passive sentences using completely different verbs and topics. What structural pattern appears in every one?"

---

### P21 — GENERALISATION
**Type:** True Primitive &nbsp;|&nbsp; **Reuse Frequency:** High

**1. Purpose:**  
Direct the student to extract a rule, principle, or definition from a set of examples.

**2. Cognitive Objective:**  
Produce the moment of abstraction — the concept moves from a collection of specific instances to a general principle the student can apply to new instances they have never seen.

**3. When to Use:**  
- After P20 (PATTERN DETECTION) — the pattern has been identified; now extract the principle  
- When the student has enough instances to support a valid generalisation  
- As the primary mechanism for concept definition discovery (inductive method)

**4. When NOT to Use:**  
- Before sufficient instances have been examined — premature generalisation produces over-generalised or under-generalised rules  
- With only one instance (a single example supports no generalisation)

**5. Student States Supported:**  
S0–S9 (universal; the cognitive load varies — scaffold for S0)

**6. CPA Stage Compatibility:**  
P, A (generalisation moves toward abstraction)

**7. Inputs Required:**  
- `instance_set`: the examples from which the generalisation is drawn  
- `generalisation_prompt`: "From these examples, can you state the rule that's always true?"

**8. Expected Student Response:**  
Student produces a generalisation that is both correct and sufficiently general (not too narrow, not too broad).

**9. Success Signal:**  
The student's stated rule would correctly classify new instances they have not yet seen.

**10. Failure Signal:**  
Over-generalisation (rule is too broad; covers non-examples); under-generalisation (rule is too narrow; excludes valid examples).

**11. Recovery:**  
For over-generalisation: apply P37 (COUNTEREXAMPLE QUESTION) — "Can you think of a case where your rule fails?"; for under-generalisation: provide an additional instance P16 that extends the boundary.

**12. Typical Misconceptions Addressed:**  
Over-generalisation and under-generalisation are the two canonical concept-boundary errors; P21 surfaces them for correction.

**13. Compatible Primitives:**  
P20 (PATTERN DETECTION) before; P22 (SPECIALISATION) after — apply the generalisation to new specific cases; P37 (COUNTEREXAMPLE QUESTION) to test the generalisation's boundary.

**14. Incompatible Primitives:**  
P68 (MASTERY SELF-DECLARATION) immediately after P21 — producing a generalisation is not mastery; it needs P22 + P32 to be stabilised.

**15. Composition Constraints:**  
Must follow at least 3 instance observations. P22 must follow P21 before the session advances — untested generalisations are hypotheses, not schema.

**16. Subject Examples:**  
- **Mathematics:** "From everything you've seen — the vending machine, the arrow diagrams, the graphs — state a rule. What makes something a function?"  
- **Physics:** "From the four systems: state the relationship between net force, mass, and acceleration as a general rule."  
- **English:** "From the five passive sentences: state the rule for forming a passive sentence. What must always be present?"

---

### P22 — SPECIALISATION
**Type:** True Primitive &nbsp;|&nbsp; **Reuse Frequency:** High

**1. Purpose:**  
Direct the student to apply a general rule to a specific new case they have not yet seen.

**2. Cognitive Objective:**  
Test whether the generalisation is operable — whether the student can use the rule, not just state it.

**3. When to Use:**  
- After P21 (GENERALISATION) — the rule exists; now test it on new instances  
- Whenever a student states a rule but has not applied it independently  
- As the primary test of whether a concept is operational

**4. When NOT to Use:**  
- Before P21 — you cannot specialise a rule you have not yet produced  
- With an instance that requires additional concepts not yet covered

**5. Student States Supported:**  
S0–S9 (universal)

**6. CPA Stage Compatibility:**  
C, P, A

**7. Inputs Required:**  
- `new_instance_slot`: an instance the student has not encountered  
- `specialisation_question`: "Apply your rule to this new case — is it [concept], and why?"

**8. Expected Student Response:**  
Student applies the rule correctly to the new instance and states the reasoning.

**9. Success Signal:**  
Student correctly applies the rule AND can state the specific feature in the new instance that confirms or disconfirms classification.

**10. Failure Signal:**  
Student applies the rule incorrectly; student states a correct conclusion but with wrong reasoning (lucky application, not schema application).

**11. Recovery:**  
Slow down to P23 (DECOMPOSITION) — break the new instance into components, apply the rule to each component; rebuild from sub-instances.

**12. Typical Misconceptions Addressed:**  
Hollow generalisation (student states rule correctly but cannot apply it — the rule is stored as a memory trace, not as a schema).

**13. Compatible Primitives:**  
P21 (GENERALISATION) before; P36 (PROBING QUESTION) after each application to verify reasoning; P18 (CLASSIFICATION) is the multi-instance form of P22.

**14. Incompatible Primitives:**  
No hard incompatibilities.

**15. Composition Constraints:**  
At least 3 new instances for specialisation before the generalisation is considered validated. The instances should include one edge case.

**16. Subject Examples:**  
- **Mathematics:** "Is this a function: the rule that assigns to each positive integer n all of its prime factors? Use the rule you stated. Is 6 a valid input? What's the output? Is that one output or multiple?"  
- **Physics:** "Apply your F = ma rule to this new system: a 5 kg object accelerating at 3 m/s². What is the net force? Show the application."  
- **English:** "Here is a new sentence: 'Mistakes were made.' Apply your passive-voice rule. Is this passive? What confirms it?"

---

### P23 — DECOMPOSITION
**Type:** True Primitive &nbsp;|&nbsp; **Reuse Frequency:** Medium

**1. Purpose:**  
Direct the student to break a complex whole into its component parts.

**2. Cognitive Objective:**  
Reduce working memory load by making a complex structure analysable as a set of simpler structures; prerequisite to working-backward problem solving.

**3. When to Use:**  
- When a concept or problem is too complex to engage with as a whole  
- Before P24 (COMPOSITION) — understand parts before assembling  
- For P84 (LOAD MANAGEMENT) — decomposition is the mechanism

**4. When NOT to Use:**  
- When the concept is genuinely atomic (decomposition would produce meaningless fragments)  
- When the student has already decomposed successfully and is ready to compose

**5. Student States Supported:**  
S0, S4 (primary — students overwhelmed by complexity); S1, S3, S5 (moderate — decomposition as analytical strategy)

**6. CPA Stage Compatibility:**  
C, P, A

**7. Inputs Required:**  
- `complex_whole_slot`: the concept or problem to decompose  
- `decomposition_principle`: what basis to use (structural, procedural, temporal, logical)  
- `component_question`: "What are the parts of this? How many components does this have?"

**8. Expected Student Response:**  
Student produces a correct decomposition — all meaningful parts identified, no spurious parts added.

**9. Success Signal:**  
Student's decomposition correctly identifies all necessary components; no critical component is missing; no irrelevant component is added.

**10. Failure Signal:**  
Student decomposes at the wrong level (too coarse or too fine); student misses a critical component.

**11. Recovery:**  
Provide a scaffolded partial decomposition (P11 pattern); use P01 (ATTEND) to direct attention to the missing component.

**12. Typical Misconceptions Addressed:**  
Holistic application without structural understanding (student applies procedure without knowing why each step exists).

**13. Compatible Primitives:**  
P84 (LOAD MANAGEMENT) — decomposition is load management's mechanism; P24 (COMPOSITION) after — compose what was decomposed; P23 followed by P22 is a common chain (decompose a complex instance, apply the rule to each part).

**14. Incompatible Primitives:**  
No hard incompatibilities.

**15. Composition Constraints:**  
Decomposition depth must be calibrated to student capacity — do not decompose below the level the student can work at.

**16. Subject Examples:**  
- **Mathematics:** "This function composition f(g(x)) looks complicated. Let's break it down. What is g doing first? What is f receiving as its input? Two separate steps — can you identify them?"  
- **Physics:** "This system has multiple forces. Before you calculate anything, decompose the system: list every force acting on the object, its direction, and its magnitude."  
- **English:** "This argument looks complex. Let's decompose it: what is the main claim? What are the sub-claims? What is the evidence for each sub-claim? Identify each part separately."

---

### P24 — COMPOSITION
**Type:** True Primitive &nbsp;|&nbsp; **Reuse Frequency:** Medium

**1. Purpose:**  
Direct the student to assemble component parts into a working whole.

**2. Cognitive Objective:**  
Test understanding of how parts interact — the inverse of decomposition. The student must understand not just what the parts are but how they combine.

**3. When to Use:**  
- After P23 (DECOMPOSITION) — parts have been identified; now assemble  
- When the student needs to build something (a proof, a sentence, a model) from components

**4. When NOT to Use:**  
- Before P23 — students cannot compose what they have not first decomposed  
- When the composition rules are not yet known

**5. Student States Supported:**  
S1, S3, S5 (primary); S0 with significant scaffolding

**6. CPA Stage Compatibility:**  
C, P, A

**7. Inputs Required:**  
- `components_slot`: the parts to be assembled  
- `composition_rules_slot`: the rules governing how parts combine  
- `composition_question`: "Using these components and these rules, build the whole."

**8. Expected Student Response:**  
Student assembles the whole correctly; can state why each component connects to the next.

**9. Success Signal:**  
Student's assembled whole is correct AND the connection reasoning is sound.

**10. Failure Signal:**  
Student assembles a whole that is structurally incorrect; or student produces the right structure by imitation rather than by applying composition rules.

**11. Recovery:**  
Return to P23; revisit the composition rules explicitly; provide P81 (SCAFFOLDING) for the connection steps.

**12. Typical Misconceptions Addressed:**  
None directly, but composition reveals whether a student understands the interface between parts — the most common gap in structural understanding.

**13. Compatible Primitives:**  
P23 (DECOMPOSITION) before; P46 (PROCEDURE CONSTRUCTION) is the highest-autonomy form of P24.

**14. Incompatible Primitives:**  
No hard incompatibilities.

**15. Composition Constraints:**  
The composition rules must be supplied (not discovered during composition); rule discovery is a separate primitive chain.

**16. Subject Examples:**  
- **Mathematics:** "You've broken down f(g(x)) into two steps. Now compose: starting with x = 2, apply g first, then apply f to the result. Build the complete function value."  
- **Physics:** "You've identified all forces and their directions. Now compose: add the vectors. Build the net force from the components."  
- **English:** "You have a claim, two pieces of evidence, and your analysis. Now compose: write the paragraph. Assemble the parts in the order that makes the strongest argument."

---

### P25 — ABSTRACTION LADDER
**Type:** True Primitive &nbsp;|&nbsp; **Reuse Frequency:** Medium

**1. Purpose:**  
Direct the student to explicitly move up or down the abstraction hierarchy — from specific instance to general principle, or from general principle to specific instance.

**2. Cognitive Objective:**  
Build flexible access to the concept at multiple abstraction levels — the student should be able to enter the concept from any level and navigate to any other level.

**3. When to Use:**  
- When a student is stuck at one abstraction level (can see the formula but not the example, or the example but not the formula)  
- When transitioning between CPA stages  
- When the concept needs to be applied at a different abstraction level than where it was taught

**4. When NOT to Use:**  
- When only one abstraction level has been established (cannot ladder what hasn't been built yet)

**5. Student States Supported:**  
S1, S3, S5 (primary); S0 after concrete and perceptual levels established

**6. CPA Stage Compatibility:**  
C↔P↔A (this is the meta-primitive that manages CPA transitions)

**7. Inputs Required:**  
- `current_level`: the abstraction level where the student is currently working  
- `target_level`: the abstraction level to move to  
- `ladder_question`: "You've described the formula. Can you give me a specific example?" (down) or "You have a specific case — what general rule does it illustrate?" (up)

**8. Expected Student Response:**  
Student moves to the target abstraction level and produces a valid representation at that level.

**9. Success Signal:**  
Student moves correctly between levels AND maintains conceptual continuity (knows the same concept is being described at a different level).

**10. Failure Signal:**  
Student moves to a different concept when moving between levels; student cannot descend from abstract to concrete.

**11. Recovery:**  
Use P06/P07/P08 explicitly to re-establish the target level; connect to what the student did at the prior level ("the formula you just wrote — what would that look like as an arrow diagram?").

**12. Typical Misconceptions Addressed:**  
Level conflation (student believes the abstract formula IS the concept, not a representation of it).

**13. Compatible Primitives:**  
P06, P07, P08 — these are the target-level inputs after the ladder; P16 (COMPARISON) across levels is productive.

**14. Incompatible Primitives:**  
No hard incompatibilities.

**15. Composition Constraints:**  
Both the origin and target levels must exist (have been established in the session) before the ladder can be climbed.

**16. Subject Examples:**  
- **Mathematics:** "You've just described a function as 'an equation.' Can you go down a level — give me a concrete example that is a function but has no equation at all?"  
- **Physics:** "You've calculated F = 30 N. Go up a level: what general statement does this calculation illustrate about the relationship between force and acceleration?"  
- **English:** "You've identified that this sentence is passive. Go up a level: what general purpose does passive voice serve in writing? Then come back down: give me a new example that serves that purpose."

---

### P92 — THOUGHT EXPERIMENT
**Type:** True Primitive &nbsp;|&nbsp; **Reuse Frequency:** Situational (Physics primary)

**1. Purpose:**  
Present a constrained hypothetical scenario designed for the student to derive a physical or logical result without computation.

**2. Cognitive Objective:**  
Build physical intuition and causal reasoning by forcing the student to reason about an idealized situation — to derive a conclusion from first principles, not by formula application.

**3. When to Use:**  
- When physical intuition needs to be built before formal treatment  
- When the formal solution exists but understanding the WHY requires imagining the scenario  
- For S5 (Mathematically Mature) students who are strong formally but lack physical intuition  
- Physics concepts where the mechanism matters more than the calculation

**4. When NOT to Use:**  
- For concepts that require empirical data to reason about (thought experiments only work where logic alone suffices)  
- As a replacement for concrete demonstration when a demonstration is available

**5. Student States Supported:**  
S3, S5 (primary); S1 (moderate — procedural students benefit from intuition building); S8 (adult learners benefit from causal reasoning)

**6. CPA Stage Compatibility:**  
P, A (thought experiments are perceptual-imaginative then abstract)

**7. Inputs Required:**  
- `thought_experiment_scenario`: the idealized scenario (frictionless surface, infinite space, point mass, etc.)  
- `constraint_statement`: what is held constant and what is allowed to vary  
- `derivation_question`: what the student must derive from the scenario

**8. Expected Student Response:**  
Student reasons through the scenario to a conclusion without looking up or applying a memorized formula; can state the causal chain.

**9. Success Signal:**  
Student derives the correct conclusion AND can state the causal chain: "because X, therefore Y, therefore Z."

**10. Failure Signal:**  
Student applies a formula rather than reasoning; student produces a conclusion but cannot state the causal chain.

**11. Recovery:**  
Simplify the scenario (reduce variables to two); ask the student to consider the limiting case (what happens when mass approaches zero? when force approaches infinity?); use P28 (COGNITIVE CONFLICT INDUCTION) if the student's formula application produces the wrong answer in the thought experiment.

**12. Typical Misconceptions Addressed:**  
Formula-over-understanding (student applies correct formula for wrong reasons); physical intuition errors (heavier objects fall faster; larger surface area means more friction in all cases).

**13. Compatible Primitives:**  
P14 (PREDICTION) before — student predicts the thought experiment's outcome; P28 (COGNITIVE CONFLICT INDUCTION) if the derivation violates the student's intuition; P21 (GENERALISATION) after — extract the general principle from the thought experiment's conclusion.

**14. Incompatible Primitives:**  
P10 (WORKED EXAMPLE PRESENTATION) immediately before P92 — if a worked example has been shown, the student will reproduce the procedure rather than reason from scratch.

**15. Composition Constraints:**  
The thought experiment must be idealized (constraints must eliminate confounding variables); the derivation question must be answerable by reasoning alone; no numerical answers required unless they emerge naturally from the reasoning.

**16. Subject Examples:**  
- **Mathematics:** "Imagine a function machine with infinite inputs. If every output has been used at least once, is the function necessarily surjective? Reason from the definition — don't look up the word."  
- **Physics:** "Imagine you're in empty space with no gravity, no air, no friction. You push two objects — one with mass 1 kg, one with mass 100 kg — with exactly the same force. Which accelerates more? Reason from F = ma — but don't calculate. Just reason."  
- **English:** "Imagine a language with no passive voice at all. What would happen to sentences like 'Mistakes were made' where the agent is unknown or deliberately unnamed? What problem would that language have?"

---

### P93 — TEMPORAL SEQUENCE ASSEMBLY
**Type:** True Primitive &nbsp;|&nbsp; **Reuse Frequency:** Situational (Phonics primary)

**1. Purpose:**  
Direct the student to hold a temporal sequence of auditory or kinesthetic stimuli in working memory and assemble them into a composite unit.

**2. Cognitive Objective:**  
Build phonemic awareness by developing the capacity to hear a word as a sequence of discrete phonemes — and conversely, to blend phonemes into a word. The temporal dimension makes this categorically different from visual pattern detection.

**3. When to Use:**  
- When teaching phoneme segmentation or phoneme blending  
- For English phonics teaching (onset-rime, consonant blends, vowel sounds)  
- When a student cannot hear individual phonemes within a word (auditory discrimination failure)

**4. When NOT to Use:**  
- For concepts that are visual or abstract rather than auditory  
- When the student already has strong phonemic awareness  
- Outside phonics/phonology contexts (this primitive is domain-specific to sound-based language learning)

**5. Student States Supported:**  
S0 (phonics entry level); S9 (Second-Language Learner — especially for phoneme systems not present in L1)

**6. CPA Stage Compatibility:**  
C (exclusively — the physical sound is the concrete embodiment)

**7. Inputs Required:**  
- `phoneme_sequence`: the ordered sequence of phonemes to be assembled  
- `assembly_direction`: [blend] (phonemes to word) or [segment] (word to phonemes)  
- `auditory_stimulus`: the sound sequence or word

**8. Expected Student Response:**  
Blend direction: student hears separated phonemes and produces the word. Segment direction: student hears the word and produces the separated phonemes.

**9. Success Signal:**  
Correct blend or correct segmentation; student can also tap or count the number of phonemes.

**10. Failure Signal:**  
Student blends incorrectly (combines phonemes in wrong order); student cannot hear phoneme boundaries; student confuses phonemes with letters.

**11. Recovery:**  
Slow the phoneme delivery rate; use kinesthetic support (one finger tap per phoneme); reduce to 2-phoneme sequences before 3+.

**12. Typical Misconceptions Addressed:**  
Letter-phoneme conflation (student believes phonemes are the same as letters — "chair" has 5 letters but 3 phonemes); inability to hear phoneme boundaries within blends.

**13. Compatible Primitives:**  
P06 (CONCRETE EMBODIMENT) before — physical phoneme production establishes the sounds; P07 (PERCEPTUAL REPRESENTATION) with auditory modality; P17 (CONTRAST) for minimal pairs (/p/ vs. /b/).

**14. Incompatible Primitives:**  
P08 (ABSTRACT NOTATION) before P93 for novice phonics students — IPA symbols before auditory discrimination creates letter-substitution errors.

**15. Composition Constraints:**  
`assembly_direction` must be specified; blend and segment are distinct operations that require separate instruction. Do not mix directions within a single Teaching Action.

**16. Subject Examples:**  
- **Mathematics:** [N/A]  
- **Physics:** [N/A]  
- **English:** [Blend] "I'm going to say three sounds separately: /k/ … /æ/ … /t/. Listen. Now say those sounds together as fast as you can. What word?" [Segment] "I'm going to say a word: 'ship.' How many separate sounds does it have? Say each sound separately."

---

### P94 — CONTEXTUAL INFERENCE
**Type:** True Primitive &nbsp;|&nbsp; **Reuse Frequency:** Situational (Vocabulary primary)

**1. Purpose:**  
Direct the student to infer the meaning of an unfamiliar word or expression from the surrounding context rather than from explicit definition.

**2. Cognitive Objective:**  
Build the vocabulary acquisition strategy of contextual inference — a skill that operates on every reading encounter with an unfamiliar word and cannot be replaced by dictionary lookup for fluent reading.

**3. When to Use:**  
- When a target word appears in a rich enough context to support inference  
- When building reading fluency or independent vocabulary strategies  
- Before providing the definition (the inference is the learning event; the definition is the confirmation)

**4. When NOT to Use:**  
- When the context is insufficient to support inference (context must constrain the meaning significantly)  
- For function words (articles, prepositions) whose meanings are grammatical rather than semantic  
- When the student needs the word's meaning immediately to understand the passage (provide it directly; inference takes time)

**5. Student States Supported:**  
S0, S1, S8, S9 (primary vocabulary learners); S3, S5 (inference as analytical exercise)

**6. CPA Stage Compatibility:**  
P, A (vocabulary inference is perceptual-to-abstract)

**7. Inputs Required:**  
- `context_passage_slot`: a sentence or paragraph containing the unfamiliar word with sufficient context  
- `target_word`: the word whose meaning is to be inferred  
- `inference_question`: "From the surrounding sentences, what do you think [word] means here?"

**8. Expected Student Response:**  
Student produces a reasonable approximation of the word's meaning, citing at least one context clue.

**9. Success Signal:**  
Student's inference is semantically correct AND student cites a specific context clue that supports it.

**10. Failure Signal:**  
Student cannot infer any meaning; student ignores context and guesses based on word shape or partial familiarity.

**11. Recovery:**  
Use P36 (PROBING QUESTION) to direct attention to specific context clues: "What happens in the sentence right before the unfamiliar word? What does that tell you about what X must mean?"; reduce context density if passage is too complex.

**12. Typical Misconceptions Addressed:**  
Word-shape guessing (inferring meaning from a similar-looking known word without checking context fit); global meaning import (importing a word's meaning from a different language, often producing false cognate errors for S9 students).

**13. Compatible Primitives:**  
P94 before explicit definition provision; P17 (CONTRAST) after — contrast the inferred meaning with the dictionary definition to identify inference gaps; P22 (SPECIALISATION) after definition confirmation — apply the word in a new sentence.

**14. Incompatible Primitives:**  
P08 (ABSTRACT NOTATION) immediately before P94 — providing the dictionary definition before the inference eliminates the learning event.

**15. Composition Constraints:**  
The inference must precede the definition. The definition is confirmation, not instruction. Never skip the inference step to save time — the inference is where vocabulary acquisition occurs.

**16. Subject Examples:**  
- **Mathematics:** "The proof says: 'Let f be a bijection from A to B.' You may not know what bijection means yet. From the proof structure — A and B have the same number of elements, and the proof says every element of A maps to a unique element of B — what do you think bijection means?"  
- **Physics:** "The text says: 'The medium through which the wave propagates determines its speed.' You may not know 'propagates.' From the sentence — what does the wave do through the medium? What word could replace 'propagates' and make sense?"  
- **English:** "Read this sentence: 'Her laconic response surprised everyone — she had usually spoken at length.' What does 'laconic' mean? What in the surrounding sentence tells you?"

---

## CATEGORY D — SCHEMA REPAIR

*Modify an incorrect existing mental model. The repair chain fires only when an incorrect schema is detected (via P41 or P64). Only fire for S2 (Misconception Carrier) and S7 (High Confidence Incorrect) student states. The canonical repair chain is P26→P27→P28→P29→P30→P31→P32.*

---

### P26 — SCHEMA ACTIVATION
**Type:** True Primitive &nbsp;|&nbsp; **Reuse Frequency:** Situational

**1. Purpose:**  
Surface the student's existing mental model before instruction so that repair can be targeted precisely.

**2. Cognitive Objective:**  
Make the incorrect schema explicit and available for examination — you cannot repair what you cannot see.

**3. When to Use:**  
- As the first step of the Schema Repair chain whenever a misconception has been detected  
- Before any schema-targeting instruction — if you don't know what schema you're working with, you cannot target it

**4. When NOT to Use:**  
- When no prior schema exists (S0 on a genuinely new concept — no schema to activate)  
- When the existing schema is known to be correct (no repair needed)

**5. Student States Supported:**  
S2, S7 (primary repair targets); S1 (moderate — may have a partially incorrect schema)

**6. CPA Stage Compatibility:**  
C, P, A — schema activation can occur at any abstraction level

**7. Inputs Required:**  
- `activation_probe`: a question that prompts the student to articulate their understanding ("Before I explain anything — what do you think [concept] means?")

**8. Expected Student Response:**  
Student states their existing understanding — including the incorrect schema.

**9. Success Signal:**  
Student explicitly articulates a schema (correct or incorrect) that is now visible and available for the repair sequence.

**10. Failure Signal:**  
Student says "I don't know" without articulating anything; or student performs a meta-response ("I know I've heard of it") without stating a schema.

**11. Recovery:**  
Offer a completion frame: "Some people think [concept] means X — do you agree with that?" This surfaces agreement/disagreement without requiring independent schema recall.

**12. Typical Misconceptions Addressed:**  
None directly — this is the diagnostic step that precedes misconception-specific repair.

**13. Compatible Primitives:**  
P27 (SCHEMA EXPOSURE) follows if the schema is implicit; P28 (COGNITIVE CONFLICT INDUCTION) follows if the schema is explicit and incorrect.

**14. Incompatible Primitives:**  
P31 (SCHEMA REPLACEMENT) before P26 — replacement without activation is information transmission that bounces off the incorrect schema without dislodging it.

**15. Composition Constraints:**  
Must be the first primitive in any Schema Repair chain. GR-4 (chain may only be entered after P41 or P64 returns a misconception signal) applies to the chain; P26 is the chain's entry point.

**16. Subject Examples:**  
- **Mathematics:** "Before I say anything — in your own words, what makes something a function? Don't look it up. Just tell me what you currently think."  
- **Physics:** "What do you think 'force' means? Not the textbook definition — what does it mean to you right now?"  
- **English:** "What do you think 'passive voice' means? Tell me in your own words."

---

### P27 — SCHEMA EXPOSURE
**Type:** True Primitive &nbsp;|&nbsp; **Reuse Frequency:** Situational

**1. Purpose:**  
Make a hidden or implicit incorrect schema fully visible to the student — students often hold unconscious models that operate below explicit awareness.

**2. Cognitive Objective:**  
Convert implicit knowledge to explicit knowledge so the student can compare their current model with the correct one.

**3. When to Use:**  
- When P26 reveals a partially stated or unclear schema  
- When the student's errors indicate a schema that they cannot articulate on their own  
- Between P26 and P28 when the schema needs to be crystallised before conflict can be induced

**4. When NOT to Use:**  
- When the student has already stated their schema clearly in P26 (skip directly to P28)  
- When the schema has not yet been activated (P26 must fire first)

**5. Student States Supported:**  
S2, S7 (primary); S1 (moderate)

**6. CPA Stage Compatibility:**  
C, P, A

**7. Inputs Required:**  
- `inferred_schema`: the implicit schema inferred from the student's errors and P26 response  
- `exposure_statement`: "What I'm hearing is that you think [inferred_schema]. Is that right?"

**8. Expected Student Response:**  
Student confirms or corrects the inferred schema; either way, a clear schema is now on the table.

**9. Success Signal:**  
Student confirms the inferred schema or provides a clearer version — the schema is now explicit and shared.

**10. Failure Signal:**  
Student denies any schema ("I don't really think that either"); student agrees passively without genuine recognition.

**11. Recovery:**  
Provide a concrete example of the student's schema in action: "You said X — let me show you what that would mean in practice. Is this what you meant?"

**12. Typical Misconceptions Addressed:**  
Any misconception that the student holds implicitly without being able to articulate it.

**13. Compatible Primitives:**  
P26 (SCHEMA ACTIVATION) before; P28 (COGNITIVE CONFLICT INDUCTION) after — once the schema is explicit, induce conflict with it.

**14. Incompatible Primitives:**  
P31 (SCHEMA REPLACEMENT) immediately after P27 — conflict has not yet been induced; the old schema will resist replacement.

**15. Composition Constraints:**  
P27 is optional in the repair chain — it fires only when P26 produces an unclear or implicit schema. Skip directly to P28 when P26 produces a clear, explicit schema.

**16. Subject Examples:**  
- **Mathematics:** "What I'm hearing is: you think a function can have multiple outputs for one input, as long as they're all listed. Is that what you believe?"  
- **Physics:** "It sounds like your model says: more mass = more gravity-pulled downward force = faster fall. Is that what's going on in your thinking?"  
- **English:** "I think I hear you saying: passive voice means the sentence is about something being done, not about someone doing it. Is that what you think the distinction is?"

---

### P28 — COGNITIVE CONFLICT INDUCTION
**Type:** True Primitive &nbsp;|&nbsp; **Reuse Frequency:** Situational

**1. Purpose:**  
Create a situation where the student's existing schema produces a demonstrably wrong prediction, creating experienced dissonance rather than declared error.

**2. Cognitive Objective:**  
Trigger schema-change motivation: the student must experience their existing model as inadequate before they will accept a replacement.

**3. When to Use:**  
- After P26 or P27 — the schema is active and explicit  
- When the student has been told the correct answer multiple times but the schema persists  
- GR-4: only after P41 or P64 has confirmed a misconception

**4. When NOT to Use:**  
- GR-5: never with S6 (Low Confidence) — conflict deepens anxiety; use P30 (BRIDGE CONSTRUCTION) instead  
- When the incorrect schema is not yet explicit (P26/P27 must have fired)  
- When the conflict scenario requires knowledge the student does not yet have

**5. Student States Supported:**  
S2 (primary); S7 (primary — especially important; high-confidence incorrect students require experiential disconfirmation)

**6. CPA Stage Compatibility:**  
C, P (conflict is most powerful at the concrete or perceptual level — abstract-level conflict can be dismissed as "a special case")

**7. Inputs Required:**  
- `conflict_scenario_slot`: a concrete or perceptual situation where the student's schema predicts outcome X but the actual outcome is Y  
- `prediction_prompt`: "Given what you said, what should happen in this case?"

**8. Expected Student Response:**  
Student predicts based on their schema; then observes the actual outcome; experiences felt contradiction.

**9. Success Signal:**  
Student spontaneously says "but that doesn't make sense" or equivalent — the conflict is registered.

**10. Failure Signal:**  
Student explains away the conflict without revising the schema ("oh that's a special case"); student does not register the contradiction.

**11. Recovery:**  
Use a more dramatic conflict scenario; present 2–3 conflict cases in sequence to prevent each being explained as a special case; use P29 (CONFLICT RESOLUTION PAUSE) to ensure the student processes rather than dismisses.

**12. Typical Misconceptions Addressed:**  
This primitive initiates repair for any identified misconception (content-independent).

**13. Compatible Primitives:**  
P14 (PREDICTION) and P15 (OBSERVATION) are the mechanism of P28; P29 (CONFLICT RESOLUTION PAUSE) immediately after.

**14. Incompatible Primitives:**  
GR-5: P28 incompatible with S6. P49 (CONFIRMATION) immediately after — never confirm the incorrect schema while inducing conflict.

**15. Composition Constraints:**  
GR-4 (only fires after misconception signal); GR-5 (forbidden for S6). The conflict must be student-experienced, not teacher-stated. "You're wrong" is not P28. The scenario that makes the schema produce a visible wrong answer is P28.

**16. Subject Examples:**  
- **Mathematics:** "You said any correspondence where every input is used can be a function. I'm going to show you a case where every input is used but it's definitely not a function. Predict: is this a function? [Show vending machine that gives 3 different items for button B3.] Now apply your rule."  
- **Physics:** "You said heavier objects fall faster. I'm going to drop two objects — this 10 kg ball and this 1 kg ball — from the same height simultaneously. Predict: which one hits first? [Drop them.] What do you observe?"  
- **English:** "You said passive voice means the subject isn't named. Here's a passive sentence where the subject IS named: 'The door was opened by the wind.' Apply your rule. Is this passive or not?"

---

### P29 — CONFLICT RESOLUTION PAUSE
**Type:** True Primitive &nbsp;|&nbsp; **Reuse Frequency:** Situational

**1. Purpose:**  
After inducing conflict, create deliberate silence and wait without resolving the conflict for the student.

**2. Cognitive Objective:**  
Allow the student to process cognitive dissonance — the resolution pause is itself a cognitive event. Skipping it forces premature resolution that cements a surface-level fix rather than genuine schema change.

**3. When to Use:**  
- Immediately after P28 (COGNITIVE CONFLICT INDUCTION) — always  
- After any moment where the student has experienced a contradiction

**4. When NOT to Use:**  
- When the conflict has already been resolved by the student (no need to hold a pause that has already naturally concluded)

**5. Student States Supported:**  
S2, S7 (the students who have just experienced conflict)

**6. CPA Stage Compatibility:**  
C, P, A — the pause is independent of abstraction level

**7. Inputs Required:**  
- `wait_duration`: minimum 10 seconds (longer than P55's 5-second minimum — conflict requires more processing time)  
- `silence_signal`: no teacher speech, no follow-up question, no hint — deliberate silence

**8. Expected Student Response:**  
Student processes the conflict; may express confusion, ask a question, or begin revising their schema aloud.

**9. Success Signal:**  
Student initiates a question ("but then how does…") or begins revising their stated schema.

**10. Failure Signal:**  
Teacher breaks the silence prematurely; student goes passive (waits for teacher rather than processing).

**11. Recovery:**  
If the student goes passive, use P35 (OPEN QUESTION): "What are you thinking right now?" — this is not resolving the conflict, just re-engaging the student's active processing.

**12. Typical Misconceptions Addressed:**  
None directly — this is a process primitive that allows the conflict (which targets specific misconceptions) to take effect.

**13. Compatible Primitives:**  
P28 (COGNITIVE CONFLICT INDUCTION) immediately before; P30 (BRIDGE CONSTRUCTION) after.

**14. Incompatible Primitives:**  
P49 (CONFIRMATION) or P50 (DISCONFIRMATION) during the pause — feedback during the pause terminates the processing.

**15. Composition Constraints:**  
Minimum duration: 10 seconds. P29 always follows P28 in the Schema Repair chain; skipping it is the most common primitive execution error.

**16. Subject Examples:**  
- **Mathematics:** [After P28] [Silence. Wait 10–15 seconds. No additional prompting. If the student speaks, respond only with "keep thinking."]  
- **Physics:** [After demonstrating that both balls hit simultaneously] [Silence. Wait. Let the student process.]  
- **English:** [After P28 conflict scenario] [Silence. Do not explain yet. Wait for the student to speak first.]

---

### P30 — BRIDGE CONSTRUCTION
**Type:** True Primitive &nbsp;|&nbsp; **Reuse Frequency:** Situational

**1. Purpose:**  
Build an explicit conceptual bridge between the student's old (incorrect) schema and the correct one.

**2. Cognitive Objective:**  
Reduce the psychological cost of schema revision: not "your old idea was completely wrong" but "your old idea was partially right for a specific class of cases — here is what needs to be extended."

**3. When to Use:**  
- After P29 (CONFLICT RESOLUTION PAUSE) — the student has processed the conflict and is ready to receive the bridge  
- For S6 (Low Confidence) students where P28 is contraindicated — bridge directly from the existing schema without inducing conflict first

**4. When NOT to Use:**  
- Before P28 for S2 or S7 students — bridging without conflict allows the old schema to coexist with the new one rather than being replaced  
- When the old schema has no salvageable elements that can be bridged

**5. Student States Supported:**  
S2, S6, S7 (primary)

**6. CPA Stage Compatibility:**  
C, P (the bridge is most effective when stated in concrete or perceptual terms, not abstract)

**7. Inputs Required:**  
- `valid_domain_slot`: the specific class of cases where the old schema WAS correct  
- `extension_statement`: what needs to change to handle the cases where the old schema fails

**8. Expected Student Response:**  
Student accepts the bridge; can state what was right about their old model and what needed to change.

**9. Success Signal:**  
Student articulates: "So my old idea worked for [cases] but not for [new cases] because [reason]."

**10. Failure Signal:**  
Student rejects the bridge ("but my old idea still seems right"); student accepts verbally but reverts to old schema on next application.

**11. Recovery:**  
Add another conflict example (P28) if S2/S7; for S6, make the bridge more gradual — smaller extension step.

**12. Typical Misconceptions Addressed:**  
The bridge is the first constructive step of any misconception repair — it works with any misconception once conflict has been induced.

**13. Compatible Primitives:**  
P29 (CONFLICT RESOLUTION PAUSE) before; P31 (SCHEMA REPLACEMENT) after.

**14. Incompatible Primitives:**  
P68 (MASTERY SELF-DECLARATION) after P30 — the schema has been bridged but not yet replaced or consolidated.

**15. Composition Constraints:**  
P30 must follow either P29 (for S2/S7) or P26 (directly, for S6). It precedes P31 in all repair chains.

**16. Subject Examples:**  
- **Mathematics:** "Your rule — 'every input must be used' — is actually a property of some functions (surjective ones). You had a real property, just not the defining property. The defining property is about the inputs having exactly one output each, regardless of whether all outputs are used."  
- **Physics:** "Your intuition — 'heavier objects are pulled harder by gravity' — is correct. More mass, more gravitational force. The reason they still fall at the same rate is that more mass also makes them harder to accelerate. These two effects cancel each other exactly."  
- **English:** "Your definition — 'passive voice is when nothing is doing something' — captures a common USE of passive voice but not its grammar. The grammatical definition is about structure: the object of the action becomes the grammatical subject."

---

### P31 — SCHEMA REPLACEMENT
**Type:** True Primitive &nbsp;|&nbsp; **Reuse Frequency:** Situational

**1. Purpose:**  
Explicitly install a new schema in place of the old one — name both the old model and the new model explicitly.

**2. Cognitive Objective:**  
Produce a conscious, explicit transition: the student knows WHAT changed, not just that something changed.

**3. When to Use:**  
- After P30 (BRIDGE CONSTRUCTION) — the bridge has been built; now explicitly install the replacement  
- When the new schema needs to be crystallised into a named, retrievable form

**4. When NOT to Use:**  
- Before P30 — replacement without bridging produces two competing schemas, not one correct schema  
- When the schema is being extended (not replaced) — use P30 alone or P30 followed by P32

**5. Student States Supported:**  
S2, S7 (primary)

**6. CPA Stage Compatibility:**  
P, A (replacement is usually stated at the perceptual or abstract level)

**7. Inputs Required:**  
- `old_schema_label`: name for the old model ("the 'all-inputs-used' rule")  
- `new_schema_statement`: the correct schema stated explicitly  
- `replacement_marker`: explicit statement that the new schema replaces the old ("From this point forward, when you think [concept], think [new schema], not [old schema]")

**8. Expected Student Response:**  
Student can state the new schema; can articulate what has changed.

**9. Success Signal:**  
Student states the new schema in their own words; names what was wrong about the old one.

**10. Failure Signal:**  
Student states the new schema but retains the old language ("so it's like [old schema] but also…"); student cannot name what changed.

**11. Recovery:**  
Use P38 (REFORMULATION PROMPT) — "Say that again but without using the words from your old rule."

**12. Typical Misconceptions Addressed:**  
This is the core replacement step for any identified misconception.

**13. Compatible Primitives:**  
P30 (BRIDGE CONSTRUCTION) before; P32 (SCHEMA CONSOLIDATION) immediately after — the new schema is fragile.

**14. Incompatible Primitives:**  
P68 (MASTERY SELF-DECLARATION) immediately after P31 — the new schema needs consolidation before mastery can be claimed.

**15. Composition Constraints:**  
Must follow P30 in the repair chain. The `replacement_marker` is mandatory — the explicit naming of the transition is what makes this a cognitive event rather than just information transfer.

**16. Subject Examples:**  
- **Mathematics:** "Replace 'every input must be used' with: 'every input must map to exactly ONE output.' That's the whole rule. One input, exactly one output. Hold that."  
- **Physics:** "Replace 'heavier means faster' with: 'net force determines acceleration, and gravity + mass cancel exactly for free fall.' Heavier isn't faster — that model is retired."  
- **English:** "Replace 'passive means agentless' with: 'passive means the grammatical subject is the receiver of the action, regardless of whether the agent is named.' That is the rule."

---

### P32 — SCHEMA CONSOLIDATION
**Type:** True Primitive &nbsp;|&nbsp; **Reuse Frequency:** Situational

**1. Purpose:**  
Reinforce the new schema with 2–4 confirming examples immediately after replacement.

**2. Cognitive Objective:**  
Stabilise the new schema before the session ends — the schema installed in P31 is fragile and will revert to the prior incorrect schema without immediate consolidation.

**3. When to Use:**  
- Immediately after P31 (SCHEMA REPLACEMENT) — always  
- Before the session ends whenever a schema has been replaced  
- When a student's new schema is correct but not yet automatic

**4. When NOT to Use:**  
- Before P31 — consolidating without first replacing installs the wrong schema more firmly

**5. Student States Supported:**  
S2, S7 (primarily — post-repair consolidation)

**6. CPA Stage Compatibility:**  
C, P, A — confirmation examples should span at least two levels to ensure the schema is generalized

**7. Inputs Required:**  
- `consolidation_examples`: 2–4 new instances where the new schema applies correctly  
- `application_question`: "Apply your new rule to each of these. [instance 1]. [instance 2]. [instance 3]."

**8. Expected Student Response:**  
Student correctly applies the new schema to all consolidation instances.

**9. Success Signal:**  
All consolidation instances classified correctly using the new schema; student can explain each using new schema language.

**10. Failure Signal:**  
Student applies old schema language to the consolidation instances; mixed results (some correct, some reverted).

**11. Recovery:**  
Add more consolidation instances; use P33 (DISCRIMINATION TRAINING) to sharpen the boundary between old and new schema.

**12. Typical Misconceptions Addressed:**  
Schema fragility: the newly installed schema is consolidated against immediate reversion.

**13. Compatible Primitives:**  
P31 (SCHEMA REPLACEMENT) immediately before; P33 (DISCRIMINATION TRAINING) after to sharpen boundaries.

**14. Incompatible Primitives:**  
P28 (COGNITIVE CONFLICT INDUCTION) during consolidation — inducing new conflict while consolidating a fragile schema destabilises the replacement.

**15. Composition Constraints:**  
Minimum 2 confirming examples; maximum cognitive load is high post-replacement, so consolidation examples should be simpler than the conflict scenario.

**16. Subject Examples:**  
- **Mathematics:** "Apply your new rule to these three: [mapping where one input maps to nothing — not a function, no output]; [mapping where three inputs all go to the same output — IS a function, each has one]; [mapping where one input maps to two outputs — NOT a function]. Apply the rule you just stated."  
- **Physics:** "Three free-fall scenarios: [100 kg object]; [1 g feather in vacuum]; [lead ball vs. paper ball in air]. Apply your new understanding: what determines fall rate?"  
- **English:** "Three sentences. For each: is it passive? State your reason using the new definition — not the old one." [Show: 'The glass was broken.'; 'She broke the glass.'; 'The glass was broken by her.']

---

### P33 — DISCRIMINATION TRAINING
**Type:** True Primitive &nbsp;|&nbsp; **Reuse Frequency:** Situational

**1. Purpose:**  
Explicitly distinguish the newly installed schema from the old incorrect one AND from adjacent concepts that might be confused with it.

**2. Cognitive Objective:**  
Sharpen the concept's boundaries by naming and distinguishing common sources of confusion — preventing the repaired schema from being confused with related but distinct concepts.

**3. When to Use:**  
- After P32 (SCHEMA CONSOLIDATION) — the schema is stable; now sharpen its boundaries  
- Whenever two adjacent concepts are systematically confused (function vs. injection; force vs. pressure; passive vs. stative)

**4. When NOT to Use:**  
- Before P31/P32 — discrimination requires a stable new schema to discriminate from  
- When there are no adjacent concepts that are commonly confused with the target

**5. Student States Supported:**  
S2, S7 (post-repair); S3 (latent schema needing boundary sharpening); S5 (fine-grained distinctions)

**6. CPA Stage Compatibility:**  
P, A (discrimination is usually at perceptual or abstract level)

**7. Inputs Required:**  
- `target_schema`: the correct schema just installed  
- `confusion_candidates`: the old schema + any adjacent concepts commonly confused with the target  
- `discrimination_question`: "What makes [concept A] different from [concept B]? Where exactly is the line?"

**8. Expected Student Response:**  
Student names the specific criterion that separates the target from each confusion candidate.

**9. Success Signal:**  
Student can state the distinguishing criterion for each confusion candidate; can generate an instance that is in the target but not the confusion candidate and vice versa.

**10. Failure Signal:**  
Student cannot find any distinction ("they seem the same to me"); student applies the wrong criterion.

**11. Recovery:**  
Use P17 (CONTRAST) with a minimal pair between target and each confusion candidate — return to contrast as the discrimination mechanism.

**12. Typical Misconceptions Addressed:**  
Adjacent-concept conflation (function/injection; mass/weight; subject/topic; passive/stative).

**13. Compatible Primitives:**  
P32 (SCHEMA CONSOLIDATION) before; P17 (CONTRAST) can be embedded within P33 for each confusion pair.

**14. Incompatible Primitives:**  
No hard incompatibilities.

**15. Composition Constraints:**  
Each confusion candidate requires its own minimal pair (P17-style) to separate. Do not attempt to discriminate more than 2 confusion candidates in a single Teaching Action.

**16. Subject Examples:**  
- **Mathematics:** "Now: what distinguishes a function from an injective function? Draw an arrow diagram that is a function but NOT injective. Where is the line?"  
- **Physics:** "Distinguish force from pressure — they're often confused. What is the precise difference? Give me a situation where pressure is high but force is low."  
- **English:** "Distinguish passive voice from stative voice: 'The wall was painted' (passive — someone painted it) vs. 'The wall is blue' (stative — description, not action). State the criterion that separates them."

---

## CATEGORY E — ELICITATION

*Drive student cognitive production rather than reception. Every E-category primitive requires the student to generate, construct, or produce output — not simply receive and absorb. Production is the highest-encoding mode. GR-2 applies to all E-category primitives: P55 (WAIT TIME) must follow every elicitation.*

---

### P34 — CLOSED QUESTION
**Type:** True Primitive &nbsp;|&nbsp; **Reuse Frequency:** Very High

**1. Purpose:**  
Ask a question with one correct answer to test specific recall or application.

**2. Cognitive Objective:**  
Verify that a specific fact, criterion, or procedure step has been stored accurately and can be retrieved on demand.

**3. When to Use:**  
- When a specific, unambiguous answer is the target  
- As a low-stakes retrieval check mid-session  
- To confirm that a prerequisite is in place before advancing

**4. When NOT to Use:**  
- Immediately after P95 (INTERPRETIVE FRAME) — closed questions contradict the multi-interpretation frame  
- As the primary elicitation for schema testing — P35 (OPEN QUESTION) is more revealing  
- When the answer depends on the student's reasoning process, not just the correct answer

**5. Student States Supported:**  
S0–S9 (universal)

**6. CPA Stage Compatibility:**  
C, P, A

**7. Inputs Required:**  
- `question_slot`: the specific question with one correct answer  
- `correct_answer`: the expected response (for comparison)

**8. Expected Student Response:**  
Student states the correct answer; ideally can also state why.

**9. Success Signal:**  
Correct answer stated.

**10. Failure Signal:**  
Incorrect answer; or correct answer by guessing (verify with P36 PROBING QUESTION: "why?").

**11. Recovery:**  
For factual recall failure: P56 (SPACED RETRIEVAL) indicates this concept needs re-encounter; for application failure: P52 (TARGETED REDIRECT) to the missed criterion.

**12. Typical Misconceptions Addressed:**  
None directly, but incorrect answers reveal which facts are not stored or are stored incorrectly.

**13. Compatible Primitives:**  
GR-2: P55 (WAIT TIME) must follow immediately; P36 (PROBING QUESTION) after a correct answer to verify reasoning.

**14. Incompatible Primitives:**  
P95 (INTERPRETIVE FRAME) immediately before — contradicts the single-answer form.

**15. Composition Constraints:**  
GR-2 (P55 follows); GR-9 (closed questions in assessment mode require session context before firing). Never use P34 as the sole elicitation — pair with P36 to verify reasoning.

**16. Subject Examples:**  
- **Mathematics:** "What is the definition of a function? One sentence."  
- **Physics:** "What is Newton's Second Law? State it as an equation."  
- **English:** "What is the grammatical structure of a passive sentence? State it."

---

### P35 — OPEN QUESTION
**Type:** True Primitive &nbsp;|&nbsp; **Reuse Frequency:** Very High

**1. Purpose:**  
Ask a question with multiple valid responses to surface student reasoning rather than just recall.

**2. Cognitive Objective:**  
Reveal the student's schema — an open question shows HOW the student is thinking, not just WHAT they know.

**3. When to Use:**  
- When understanding the student's reasoning process is more important than confirming a specific fact  
- At the end of a conflict-resolution pause (P29) to re-engage processing  
- When exploring the depth or structure of a schema

**4. When NOT to Use:**  
- When a specific, unambiguous answer is the target (use P34)  
- As the first primitive in a sequence with S6 (Low Confidence) — open questions feel threatening when confidence is low; precede with P54 (PRODUCTIVE STRUGGLE PERMISSION)

**5. Student States Supported:**  
S0–S9 (universal; calibrate to confidence level)

**6. CPA Stage Compatibility:**  
C, P, A

**7. Inputs Required:**  
- `open_question_slot`: a question that accepts multiple valid responses  
- `reasoning_invitation`: optional — "Tell me your thinking, not just the answer."

**8. Expected Student Response:**  
Student produces a response AND some reasoning behind it.

**9. Success Signal:**  
Student response reveals schema structure (correct or incorrect); student provides reasoning.

**10. Failure Signal:**  
Student says "I don't know" without further elaboration; student provides only a one-word answer with no reasoning.

**11. Recovery:**  
Use P54 (PRODUCTIVE STRUGGLE PERMISSION) to lower stakes; convert to a partially scaffolded version ("some people say X — what do you think of that?").

**12. Typical Misconceptions Addressed:**  
None directly, but open questions surface misconceptions for targeting.

**13. Compatible Primitives:**  
GR-2: P55 (WAIT TIME) must follow; P36 (PROBING QUESTION) after to deepen the response; P73 (GENUINE INTEREST SIGNAL) when the response is interesting.

**14. Incompatible Primitives:**  
P34 (CLOSED QUESTION) immediately after an open question on the same topic — the closed question retroactively constrains the open question's answer space.

**15. Composition Constraints:**  
GR-2 (P55 follows). Open questions must be genuinely open — teacher must have no single expected answer in mind.

**16. Subject Examples:**  
- **Mathematics:** "What makes the function concept so important — why does it matter that one input gives exactly one output?"  
- **Physics:** "In your own words: why does a heavier object not fall faster than a lighter one?"  
- **English:** "What does this poem seem to be about — not the surface events, but the underlying concern?"

---

### P36 — PROBING QUESTION
**Type:** True Primitive &nbsp;|&nbsp; **Reuse Frequency:** High

**1. Purpose:**  
Ask a follow-up question that deepens a specific part of a student's response — not a new topic, but a cut deeper into the same topic.

**2. Cognitive Objective:**  
Force elaboration: surface-level correct answers often mask shallow encoding; probing reveals whether the student has genuine understanding or pattern-matching competence.

**3. When to Use:**  
- After any student response that is correct but brief  
- When a student's reasoning seems incomplete  
- After P34 or P35 to verify the reasoning behind a correct answer

**4. When NOT to Use:**  
- When the student has already elaborated fully  
- Immediately after a P50 (DISCONFIRMATION) — probing a just-disconfirmed response before redirect is confusing

**5. Student States Supported:**  
S0–S9 (universal)

**6. CPA Stage Compatibility:**  
C, P, A

**7. Inputs Required:**  
- `response_excerpt`: the specific part of the student's response to probe  
- `probing_question`: "Why?" / "What made you say that?" / "Can you give an example of that?" / "What would happen if [X changed]?"

**8. Expected Student Response:**  
Student elaborates on the specific element probed; deepens the reasoning.

**9. Success Signal:**  
Student elaboration reveals sound underlying reasoning OR reveals a specific gap that can now be targeted.

**10. Failure Signal:**  
Student cannot elaborate ("I just know it"); student restates the original response without adding depth.

**11. Recovery:**  
Provide a partial answer as a starting point ("some people would say it's because — does that match your thinking?"); use P38 (REFORMULATION PROMPT) to force a different representation.

**12. Typical Misconceptions Addressed:**  
Hollow correctness (student states the right answer for the wrong reason — detected by probing).

**13. Compatible Primitives:**  
P34 or P35 before; P53 (ELABORATION REQUEST) is a close relative — when the response is correct, use P53 rather than P36.

**14. Incompatible Primitives:**  
No hard incompatibilities; P36 should not be used so frequently it feels interrogative rather than curious.

**15. Composition Constraints:**  
GR-2 (P55 follows the probing question, not the original question — the probe is an elicitation and requires its own wait time).

**16. Subject Examples:**  
- **Mathematics:** [After student says "it's a function"] "Why? What specific feature makes it a function?"  
- **Physics:** [After student says "acceleration increases"] "Why does it increase? What is causing the change?"  
- **English:** [After student identifies implied claim] "What in the sentence specifically led you to that inference? Point to the word or phrase."

---

### P37 — COUNTEREXAMPLE QUESTION
**Type:** True Primitive &nbsp;|&nbsp; **Reuse Frequency:** High

**1. Purpose:**  
Ask the student to find a case where their stated rule does not work.

**2. Cognitive Objective:**  
Force the student to test the boundary of their own generalisation — the most efficient technique for revealing over-generalisation or under-generalisation.

**3. When to Use:**  
- After P21 (GENERALISATION) — the student has stated a rule; now test it  
- When a student's rule seems correct but its boundaries are unclear  
- When P22 (SPECIALISATION) has revealed an over-generalised rule

**4. When NOT to Use:**  
- When the student's schema is already known to be incorrect (P28 is more effective at that stage)  
- When the rule has no counterexamples (the rule is correct as stated — do not manufacture false counterexamples)

**5. Student States Supported:**  
S1, S3, S5 (primary); S0 with significant scaffolding (counterexample generation is cognitively demanding)

**6. CPA Stage Compatibility:**  
C, P, A

**7. Inputs Required:**  
- `student_rule_statement`: the rule the student has stated  
- `counterexample_question`: "Can you think of a case where your rule doesn't work? Try to break it."

**8. Expected Student Response:**  
Student produces a counterexample to their own rule; or confirms the rule holds by failing to find a counterexample.

**9. Success Signal:**  
Student finds a genuine counterexample and recognises it as a boundary case for their rule.

**10. Failure Signal:**  
Student cannot produce any candidate counterexample; student produces a non-counterexample and calls it one.

**11. Recovery:**  
Provide a hint domain ("what about cases where [specific feature] is different?"); scaffold the counterexample generation with a partial example.

**12. Typical Misconceptions Addressed:**  
Over-generalised schemas (student's rule includes non-examples); under-generalised schemas (student's rule excludes valid examples — revealed when the student cannot find counterexamples that others would find).

**13. Compatible Primitives:**  
P21 (GENERALISATION) before; P28 (COGNITIVE CONFLICT INDUCTION) if the student's rule IS wrong and a counterexample has been found.

**14. Incompatible Primitives:**  
P32 (SCHEMA CONSOLIDATION) before counterexample testing — do not consolidate before the rule's boundaries are tested.

**15. Composition Constraints:**  
GR-2 (P55 follows). The student must have stated a generalisation before P37 can be applied.

**16. Subject Examples:**  
- **Mathematics:** "You said every formula defines a function. Can you think of a formula that does NOT define a function? Try to break your rule."  
- **Physics:** "You said larger net force always means faster movement. Can you think of a case where a large net force does not produce fast movement?"  
- **English:** "You said you can always identify passive voice by looking for 'was' or 'is'. Can you think of a sentence that has 'was' in it but is NOT passive?"

---

### P38 — REFORMULATION PROMPT
**Type:** True Primitive &nbsp;|&nbsp; **Reuse Frequency:** Medium

**1. Purpose:**  
Ask the student to express the same concept in a different way, without using specific vocabulary from their previous statement.

**2. Cognitive Objective:**  
Force deeper encoding by requiring multiple representations — a student who truly understands can express it multiple ways; a student who has memorised can only retrieve the single stored form.

**3. When to Use:**  
- After a student has given a correct but formulaic answer  
- When a student is over-relying on specific vocabulary without demonstrating comprehension  
- After P31 (SCHEMA REPLACEMENT) — verify the new schema can be expressed independently of its stated form

**4. When NOT to Use:**  
- After an incorrect answer (reformulate the correct answer, not a wrong one)  
- When the student has already demonstrated understanding through multiple representations

**5. Student States Supported:**  
S1, S3, S5 (primary); S0 with scaffolding

**6. CPA Stage Compatibility:**  
C, P, A

**7. Inputs Required:**  
- `student_statement`: the statement to be reformulated  
- `excluded_terms`: the specific vocabulary the student must not use  
- `reformulation_prompt`: "Can you say that again without using the word [X]? Try a different way to express the same idea."

**8. Expected Student Response:**  
Student produces a reformulation using different vocabulary that captures the same meaning.

**9. Success Signal:**  
Reformulation is semantically equivalent to the original but uses different language — demonstrates flexible access to the concept.

**10. Failure Signal:**  
Student cannot reformulate; student substitutes a synonym for the excluded term without actually reformulating.

**11. Recovery:**  
Provide a starting frame ("think about what the concept does, rather than what it is called") or switch to P47 (DIAGRAM CONSTRUCTION) — a visual reformulation.

**12. Typical Misconceptions Addressed:**  
Verbal memorisation without schema (the student has stored a definition string, not a schema).

**13. Compatible Primitives:**  
P34 or P35 before; P47 (DIAGRAM CONSTRUCTION) as an alternative when verbal reformulation fails.

**14. Incompatible Primitives:**  
No hard incompatibilities.

**15. Composition Constraints:**  
GR-2 (P55 follows). The excluded terms must be specific — "say it differently" is not a valid P38 prompt.

**16. Subject Examples:**  
- **Mathematics:** "You said 'each input maps to exactly one output.' Say the same thing without using the words 'input', 'output', or 'maps.'"  
- **Physics:** "You said F = ma. Express the same relationship as a sentence with no equations and no variable names."  
- **English:** "You said 'passive voice is when the subject receives the action.' Say the same thing without using the word 'passive' or 'action'."

---

### P39 — TRANSFER PROMPT
**Type:** True Primitive &nbsp;|&nbsp; **Reuse Frequency:** Medium

**1. Purpose:**  
Ask the student to apply the current concept in a context they have not yet seen it applied in.

**2. Cognitive Objective:**  
Initiate transfer before the student would naturally attempt it — builds the concept as a tool for new contexts rather than a fact associated with the teaching context.

**3. When to Use:**  
- After P22 (SPECIALISATION) has confirmed operational understanding  
- When cross-subject or cross-domain application is a learning goal  
- Toward the end of a Teaching Action sequence, before P87 (TRANSFER BRIDGING)

**4. When NOT to Use:**  
- Before the student has demonstrated the concept in its original context  
- For S6 (Low Confidence) students before confidence has been established  
- When the transfer domain requires significant new knowledge not yet covered

**5. Student States Supported:**  
S1, S3, S5 (primary); S8 (adult learners benefit from cross-domain transfer)

**6. CPA Stage Compatibility:**  
P, A (transfer is usually at perceptual or abstract level)

**7. Inputs Required:**  
- `transfer_domain_slot`: a different context where the concept applies  
- `transfer_question`: "Where else would this apply? What does [concept] look like in [domain]?"

**8. Expected Student Response:**  
Student identifies a valid application of the concept in the new domain.

**9. Success Signal:**  
Student identifies a structurally valid application and can explain why the concept applies there.

**10. Failure Signal:**  
Student identifies a superficially similar application that is structurally different; student cannot identify any transfer.

**11. Recovery:**  
Provide the transfer domain and ask the student to identify HOW the concept applies within it (constrained transfer rather than open discovery).

**12. Typical Misconceptions Addressed:**  
Context-boundedness (student believes the concept is specific to the teaching context and does not generalise).

**13. Compatible Primitives:**  
P76 (TRANSFER PROBE) in assessment mode is the formal version; P87 (TRANSFER BRIDGING) lays the connection that P39 tests.

**14. Incompatible Primitives:**  
No hard incompatibilities.

**15. Composition Constraints:**  
GR-2 (P55 follows). Transfer prompts should only fire after P22 confirms operational mastery in the original context.

**16. Subject Examples:**  
- **Mathematics:** "Functions appear in programming. A function in Python takes inputs and returns outputs. How does the mathematical definition of function map to a programming function? Where does 'exactly one output' show up?"  
- **Physics:** "Newton's Second Law governs more than falling objects. Where does F = ma appear in the design of an elevator? Walk me through it."  
- **English:** "You've identified passive voice in academic writing. Does passive voice appear in advertising? What purpose would it serve in that context?"

---

### P40 — METACOGNITIVE PROMPT
**Type:** True Primitive &nbsp;|&nbsp; **Reuse Frequency:** Medium

**1. Purpose:**  
Prompt the student to reflect on their own confidence, certainty, or reasoning process.

**2. Cognitive Objective:**  
Initiate self-monitoring: the student evaluates their own understanding rather than only producing responses to teacher evaluation.

**3. When to Use:**  
- Mid-session, after a student has produced a substantive response  
- When a student seems uncertain but has not expressed it  
- Before advancing to a harder concept — check that the foundation is solid by the student's own assessment

**4. When NOT to Use:**  
- When a student is in a genuine panic state (S6, acute anxiety) — metacognitive demand adds load  
- As a substitute for actual testing (P74–P80 are the formal assessment mechanism)

**5. Student States Supported:**  
S1, S3, S5, S8 (primary); S0 (with simplification); S6 (cautiously)

**6. CPA Stage Compatibility:**  
C, P, A

**7. Inputs Required:**  
- `metacognitive_question`: "How confident are you in that answer?" / "What would you need to know to be more certain?" / "What are you still unsure about?"

**8. Expected Student Response:**  
Student rates or describes their confidence level AND articulates what they are uncertain about.

**9. Success Signal:**  
Student accurately identifies their own uncertainty (calibrated self-assessment).

**10. Failure Signal:**  
Student claims full confidence when errors are present; or student claims no confidence when responses are correct (both are calibration failures, detected by P64).

**11. Recovery:**  
Use P64 (CONFIDENCE CALIBRATION) to compare stated confidence with actual performance; show the student the gap between the two.

**12. Typical Misconceptions Addressed:**  
None directly — but P40 surfaces the gap between felt certainty and actual correctness.

**13. Compatible Primitives:**  
P64 (CONFIDENCE CALIBRATION) follows when the self-assessment needs to be compared to actual performance; P63 (SELF-MONITORING TRIGGER) is a simpler version.

**14. Incompatible Primitives:**  
No hard incompatibilities.

**15. Composition Constraints:**  
GR-2 (P55 follows). P40 produces data for P64; the two often fire in sequence.

**16. Subject Examples:**  
- **Mathematics:** "How confident are you that you could classify a new function you've never seen before? What's your uncertainty about?"  
- **Physics:** "What part of the force-diagram setup are you least certain about? What would you need to feel solid?"  
- **English:** "How confident are you that you could identify an implied claim in a passage you've never read? What's still unclear?"

---

### P41 — DIAGNOSTIC QUESTION
**Type:** True Primitive &nbsp;|&nbsp; **Reuse Frequency:** High

**1. Purpose:**  
Ask a question designed specifically to reveal the presence or absence of a particular misconception.

**2. Cognitive Objective:**  
Precision diagnosis: the question is crafted so that only a specific wrong model would produce a specific wrong answer — enabling targeted repair rather than general remediation.

**3. When to Use:**  
- When a specific misconception is suspected (from prior session data or typical error patterns)  
- Before entering the Schema Repair chain (GR-4 requires P41 or P64 to confirm a misconception before P26 fires)  
- As a session-opening diagnostic

**4. When NOT to Use:**  
- As a substitute for P34 (CLOSED QUESTION) when no specific misconception is suspected  
- When the question would also be answered incorrectly by students without the target misconception (the question must be discriminating)

**5. Student States Supported:**  
S2 (primary diagnostic target); S7 (primary); S1 (screening)

**6. CPA Stage Compatibility:**  
C, P, A — but C-level diagnostic questions are often most revealing (concrete scenarios surface implicit misconceptions better than abstract ones)

**7. Inputs Required:**  
- `target_misconception`: the specific misconception being diagnosed  
- `diagnostic_scenario`: a concrete scenario that the target misconception would misclassify  
- `diagnostic_question`: the question that, if answered incorrectly in the expected way, confirms the misconception

**8. Expected Student Response:**  
Either the schema-correct response (misconception absent) or the characteristic wrong response (misconception present).

**9. Success Signal:**  
If the student answers correctly: no misconception signal; continue. If the student answers with the characteristic wrong answer: misconception confirmed; enter Schema Repair chain (GR-4 satisfied).

**10. Failure Signal:**  
Student answers incorrectly but NOT with the characteristic wrong answer — unknown error type; switch to P35 (OPEN QUESTION) to understand the actual schema before targeting.

**11. Recovery:**  
If the diagnostic is inconclusive, use P26 (SCHEMA ACTIVATION) to surface the schema directly and examine it.

**12. Typical Misconceptions Addressed:**  
This primitive is the trigger mechanism for all misconception-specific repair; content of the misconception depends on the Knowledge Graph's misconception catalogue for the current concept.

**13. Compatible Primitives:**  
GR-4: P26 (SCHEMA ACTIVATION) enters the repair chain if P41 confirms misconception. P64 (CONFIDENCE CALIBRATION) after — compare confidence to the diagnostic result.

**14. Incompatible Primitives:**  
P31 (SCHEMA REPLACEMENT) before P41 — do not attempt replacement before diagnosis.

**15. Composition Constraints:**  
GR-4 requires P41 (or P64) to confirm before Schema Repair chain begins. P41 must be designed with one specific misconception as the target — general probing questions are not valid P41 instances.

**16. Subject Examples:**  
- **Mathematics:** [Targeting "all inputs must be used" misconception] "Is this a function: the rule that assigns to each even number its double, but leaves all odd numbers unassigned?" [Expected wrong answer from the misconception: "No — not all inputs are covered."]  
- **Physics:** [Targeting "heavier falls faster" misconception] "A 5 kg ball and a 10 kg ball are dropped simultaneously from the same height in a vacuum. Which hits first?" [Expected wrong answer: "The 10 kg ball."]  
- **English:** [Targeting "passive = agentless" misconception] "Is 'The glass was broken by the wind' in passive voice?" [Expected wrong answer: "No — we know the agent (the wind)."]

---

### P42 — EXAMPLE GENERATION
**Type:** True Primitive &nbsp;|&nbsp; **Reuse Frequency:** High

**1. Purpose:**  
Direct the student to generate their own example of the concept — not recall a given example, but produce a new one.

**2. Cognitive Objective:**  
Test that the concept is operational (can be used to produce new instances) rather than just recognisable (can be identified among presented instances).

**3. When to Use:**  
- After P22 (SPECIALISATION) — the student has applied the rule to given cases; now produce new ones  
- After P31 (SCHEMA REPLACEMENT) — test that the new schema can generate examples  
- As a higher-level check than P18 (CLASSIFICATION)

**4. When NOT to Use:**  
- Before P22 — generation requires a schema, not just pattern-recognition  
- For S0 students on entirely new concepts (generation without schema produces guessing)

**5. Student States Supported:**  
S1, S2, S3, S5 (primary); S0 (only after schema is established); S8, S9 (generation is especially effective for language learners)

**6. CPA Stage Compatibility:**  
C, P, A — students can generate examples at any level

**7. Inputs Required:**  
- `concept_slot`: the concept for which an example must be generated  
- `generation_constraints`: any constraints on the example ("it must not involve numbers" / "it must be from physics, not mathematics")  
- `generation_question`: "Give me your own example of [concept] — one I haven't shown you."

**8. Expected Student Response:**  
Student produces a valid example that satisfies the concept's defining criterion.

**9. Success Signal:**  
The generated example is valid AND the student can confirm it is valid by applying the criterion.

**10. Failure Signal:**  
Student produces an invalid example (confuses with an adjacent concept); student reproduces a previously shown example rather than generating a new one.

**11. Recovery:**  
For invalid example: use it as a contrast (P17) to the kind of example needed; for reproduction: require a constraint that makes reproduction impossible.

**12. Typical Misconceptions Addressed:**  
Hollow recall (student can state and recognise the concept but not generate novel instances).

**13. Compatible Primitives:**  
P22 (SPECIALISATION) before; P43 (NON-EXAMPLE GENERATION) paired — generate both an example and a non-example in sequence.

**14. Incompatible Primitives:**  
No hard incompatibilities.

**15. Composition Constraints:**  
GR-2 (P55 follows). Generation constraints must be explicit; unconstrained generation often produces trivial reproductions.

**16. Subject Examples:**  
- **Mathematics:** "Give me your own example of a function — not one I've shown you. It doesn't have to involve numbers. Use anything."  
- **Physics:** "Give me a situation from everyday life where Newton's Second Law applies. Make it one we haven't discussed."  
- **English:** "Write a passive sentence about something that happened in this room today — not one of my examples."

---

### P43 — NON-EXAMPLE GENERATION
**Type:** True Primitive &nbsp;|&nbsp; **Reuse Frequency:** Medium

**1. Purpose:**  
Direct the student to generate a counterexample — an instance that does NOT belong to the concept category.

**2. Cognitive Objective:**  
Test boundary understanding: the student must know not just what the concept is but what it is not — where the boundary falls.

**3. When to Use:**  
- Paired with P42 (EXAMPLE GENERATION) — generating both types tests both sides of the concept boundary  
- After P37 (COUNTEREXAMPLE QUESTION) fails to find a student-generated counterexample  
- When the concept has a boundary that is commonly violated

**4. When NOT to Use:**  
- Before P42 — first generate examples (understanding the concept); then generate non-examples (understanding its limits)  
- When no natural non-examples exist for the concept

**5. Student States Supported:**  
S1, S3, S5 (primary); S2 and S7 (non-example generation surfaces the boundaries the misconception violates)

**6. CPA Stage Compatibility:**  
C, P, A

**7. Inputs Required:**  
- `concept_slot`: the concept whose boundary is being tested  
- `non_example_question`: "Give me something that is ALMOST [concept] but is not — something that looks like it but fails the criterion."

**8. Expected Student Response:**  
Student produces a valid non-example — close enough to be interesting, but failing on the critical criterion.

**9. Success Signal:**  
The generated non-example is genuinely close (not trivially unrelated) AND fails on the correct criterion.

**10. Failure Signal:**  
Student generates a trivially unrelated non-example; or generates an example (cannot find the boundary).

**11. Recovery:**  
Use P17 (CONTRAST) to show a minimal pair; then ask the student to generate a new non-example using the same dimension that the pair used.

**12. Typical Misconceptions Addressed:**  
Boundary errors (student does not know where the concept ends); adjacent-concept conflation.

**13. Compatible Primitives:**  
P42 (EXAMPLE GENERATION) before; P33 (DISCRIMINATION TRAINING) to formalise the boundary once non-examples are being generated correctly.

**14. Incompatible Primitives:**  
No hard incompatibilities.

**15. Composition Constraints:**  
GR-2 (P55 follows). Non-example must be adjacent (close to the concept), not trivially distant.

**16. Subject Examples:**  
- **Mathematics:** "Give me something that looks like a function — has inputs and outputs — but fails to be one. Make it subtle."  
- **Physics:** "Give me a situation that looks like Newton's Second Law applies but where the system is not actually accelerating — where F_net is zero."  
- **English:** "Give me a sentence that looks passive but is actually active. Try to fool me."

---

### P44 — DEFINITION CONSTRUCTION
**Type:** True Primitive &nbsp;|&nbsp; **Reuse Frequency:** Medium

**1. Purpose:**  
Direct the student to write or state the definition of the concept in their own words without prompting.

**2. Cognitive Objective:**  
Test whether the concept exists as a generative schema (can produce a definition) or only as a recognition schema (can identify examples but not articulate the principle).

**3. When to Use:**  
- After P21 (GENERALISATION) and P22 (SPECIALISATION) — the student has worked with the concept extensively  
- As a mid-session check before advancing to complex protocol stages  
- After P31 (SCHEMA REPLACEMENT) to verify the new schema has been fully internalised

**4. When NOT to Use:**  
- Before the student has encountered multiple instances — definitions constructed too early are incomplete or borrowed  
- As a verbatim recall task (the student must generate their own definition, not reproduce the teacher's)

**5. Student States Supported:**  
S1, S3, S5 (primary); S2, S7 post-repair

**6. CPA Stage Compatibility:**  
P, A (definitions operate at perceptual or abstract level)

**7. Inputs Required:**  
- `concept_slot`: the concept to be defined  
- `definition_question`: "Define [concept] in your own words — not my words, yours."

**8. Expected Student Response:**  
Student produces a definition that is both correct and in their own language.

**9. Success Signal:**  
Definition is correct; uses student's own language; can be applied to classify new instances.

**10. Failure Signal:**  
Definition is verbatim the teacher's definition (recall, not schema); definition is too narrow or too broad.

**11. Recovery:**  
P38 (REFORMULATION PROMPT) to force different language; or if the definition is wrong, use P36 (PROBING QUESTION) to understand which criterion the student has misidentified.

**12. Typical Misconceptions Addressed:**  
Definitional errors (wrong criteria in the definition); verbatim recall without schema.

**13. Compatible Primitives:**  
P38 (REFORMULATION PROMPT) often pairs; P42 (EXAMPLE GENERATION) follows — generate an example consistent with the definition; P37 (COUNTEREXAMPLE QUESTION) to test the definition.

**14. Incompatible Primitives:**  
No hard incompatibilities.

**15. Composition Constraints:**  
GR-2 (P55 follows). The student's own language is mandatory — if the student reproduces the teacher's exact phrasing, it is not P44.

**16. Subject Examples:**  
- **Mathematics:** "Define 'function.' Your words. I'll tell you if it passes."  
- **Physics:** "State Newton's Second Law in your own words — no equations."  
- **English:** "Define 'passive voice' in your own terms — what makes a sentence passive?"

---

### P45 — PROBLEM CONSTRUCTION
**Type:** True Primitive &nbsp;|&nbsp; **Reuse Frequency:** Low

**1. Purpose:**  
Direct the student to create their own problem of a specific type.

**2. Cognitive Objective:**  
Test the highest level of operational understanding: to construct a problem, the student must understand the problem type's structure — what makes a problem of this type difficult, solvable, and valid.

**3. When to Use:**  
- For S5 (Mathematically Mature) who needs challenge beyond application  
- After the student has demonstrated fluent problem-solving  
- As a diagnostic for deep structural understanding

**4. When NOT to Use:**  
- Before the student can solve problems of the type  
- For S0 or S6 — problem construction is the highest-demand primitive; do not deploy before confidence is established

**5. Student States Supported:**  
S5 (primary); S3 (moderate — latent schema benefits from construction challenge)

**6. CPA Stage Compatibility:**  
P, A

**7. Inputs Required:**  
- `problem_type_slot`: the type of problem to construct  
- `difficulty_constraints`: e.g., "Make it require at least three steps" or "Make it have a surprising answer"  
- `construction_question`: "Create your own [problem type] problem. Make it interesting."

**8. Expected Student Response:**  
A valid, solvable problem of the specified type.

**9. Success Signal:**  
Student's problem is structurally valid, solvable, and at the specified difficulty level.

**10. Failure Signal:**  
Student produces a trivial problem (extremely easy); or an unsolvable problem (missing information); or a problem of the wrong type.

**11. Recovery:**  
Ask the student to solve their own problem — this reveals whether it is valid and how difficult it actually is.

**12. Typical Misconceptions Addressed:**  
None directly, but problem construction reveals the student's implicit model of what the problem type is.

**13. Compatible Primitives:**  
P44 (DEFINITION CONSTRUCTION) before; P46 (PROCEDURE CONSTRUCTION) as an even higher-level demand.

**14. Incompatible Primitives:**  
No hard incompatibilities.

**15. Composition Constraints:**  
GR-2 (P55 follows). Difficulty constraints must be explicit; unconstrained problem construction often produces trivial instances.

**16. Subject Examples:**  
- **Mathematics:** "Create a function from a non-mathematical domain — something I haven't seen. Make the single-valuedness condition interesting to verify."  
- **Physics:** "Create a force problem where the net force is non-zero but the acceleration appears to be zero. Can you construct a scenario where that's possible?"  
- **English:** "Write a sentence that looks like it uses passive voice but actually doesn't. Make it subtle enough to fool someone who knows the rule."

---

### P46 — PROCEDURE CONSTRUCTION
**Type:** True Primitive &nbsp;|&nbsp; **Reuse Frequency:** Low

**1. Purpose:**  
Direct the student to design a step-by-step procedure for solving a problem type.

**2. Cognitive Objective:**  
Test the deepest level of procedural understanding: the student must understand not just HOW to execute the procedure but WHY each step is necessary and what would fail if it were omitted.

**3. When to Use:**  
- For S5 (Mathematically Mature) who has mastered the procedure and needs metacognitive challenge  
- When the aim is to build transferable problem-solving strategies, not just concept-specific procedures

**4. When NOT to Use:**  
- Before the student has mastered the procedure themselves  
- For S0 or S1 students who have not internalised the procedure

**5. Student States Supported:**  
S5 (primary); S3 (moderate)

**6. CPA Stage Compatibility:**  
A (procedure construction is abstract — the student is designing, not doing)

**7. Inputs Required:**  
- `problem_type_slot`: the type of problem whose solution procedure is being constructed  
- `construction_question`: "Write a step-by-step procedure that a student who had never solved this type of problem could follow."

**8. Expected Student Response:**  
A complete, ordered procedure that correctly solves the problem type with a justification for each step.

**9. Success Signal:**  
The procedure is complete, ordered correctly, and every step is justified.

**10. Failure Signal:**  
Critical step is missing; steps are in wrong order; student cannot explain why any specific step is required.

**11. Recovery:**  
Ask the student to apply their own procedure to a specific instance — the failure point in the application reveals the missing or incorrect step.

**12. Typical Misconceptions Addressed:**  
Procedural-without-conceptual mastery (student can execute but cannot explain structure).

**13. Compatible Primitives:**  
P45 (PROBLEM CONSTRUCTION) before; P59 (SELF-EXPLANATION) follows — the student explains why each step is necessary.

**14. Incompatible Primitives:**  
No hard incompatibilities.

**15. Composition Constraints:**  
GR-2 (P55 follows). Each step must have a justification — an unjustified procedure is an incomplete P46.

**16. Subject Examples:**  
- **Mathematics:** "Write a step-by-step algorithm for classifying any correspondence as a function or not. Include what to check first, what to check if that passes, and what the final decision rule is."  
- **Physics:** "Write the general procedure for setting up any Newton's Second Law problem. Include every step from reading the problem to stating the answer."  
- **English:** "Write a step-by-step procedure for identifying passive voice in any sentence. Include steps for handling edge cases."

---

### P47 — DIAGRAM CONSTRUCTION
**Type:** True Primitive &nbsp;|&nbsp; **Reuse Frequency:** Medium

**1. Purpose:**  
Direct the student to draw or build a visual representation of the concept.

**2. Cognitive Objective:**  
Produce understanding through construction: the act of building the diagram reveals understanding in ways that verbal explanation cannot, because the diagram must be structurally correct to be valid.

**3. When to Use:**  
- After P07 (PERCEPTUAL REPRESENTATION) — the student has seen a diagram; now construct their own  
- When the concept has spatial or structural properties that are best expressed visually  
- As an alternative reformulation when verbal description (P38) fails

**4. When NOT to Use:**  
- For concepts with no meaningful visual representation  
- For S9 students whose language barrier makes verbal explanation harder — P47 removes the language constraint

**5. Student States Supported:**  
S0–S9 (universal; P47 is a language-independent elicitation)

**6. CPA Stage Compatibility:**  
P (exclusively — diagram construction is a perceptual-level activity)

**7. Inputs Required:**  
- `concept_slot`: the concept to be diagrammed  
- `diagram_constraints`: which structural features must appear ("include at least 3 inputs")  
- `construction_question`: "Draw a diagram that shows [concept]. Include [constraints]."

**8. Expected Student Response:**  
A structurally correct diagram with the required features present.

**9. Success Signal:**  
Diagram is structurally correct; the defining features of the concept are visually identifiable.

**10. Failure Signal:**  
Critical structural feature is absent or incorrectly drawn; diagram represents a related but different concept.

**11. Recovery:**  
Point to the structural feature that is missing or wrong using P01 (ATTEND) and P52 (TARGETED REDIRECT); provide a partial diagram (P81 SCAFFOLDING) for the student to complete.

**12. Typical Misconceptions Addressed:**  
Structural misconceptions (incorrect mental model of the concept's structure — the diagram makes the error visible).

**13. Compatible Primitives:**  
P07 (PERCEPTUAL REPRESENTATION) before; P17 (CONTRAST) to compare student's diagram with a correct one; P43 (NON-EXAMPLE GENERATION) as a parallel — draw a non-example diagram.

**14. Incompatible Primitives:**  
No hard incompatibilities.

**15. Composition Constraints:**  
GR-2 (P55 follows — after the construction question, before the student shows their work). The diagram must be student-constructed from memory, not copied.

**16. Subject Examples:**  
- **Mathematics:** "Draw an arrow diagram that represents a function with 3 inputs. Now draw one that is NOT a function. Label the part that makes each one what it is."  
- **Physics:** "Draw a free-body diagram for an object sitting on a table. Show all forces with arrows. Label magnitude and direction."  
- **English:** "Draw a diagram showing the grammatical structure of a passive sentence — subject, verb phrase, agent. Use boxes and arrows."

---

### P48 — ANALOGY CONSTRUCTION
**Type:** True Primitive &nbsp;|&nbsp; **Reuse Frequency:** Low

**1. Purpose:**  
Direct the student to invent their own analogy for the concept.

**2. Cognitive Objective:**  
Test structural comprehension at the deepest level: the student must understand the STRUCTURE of the concept, not just its content, because only structural understanding enables analogical reasoning.

**3. When to Use:**  
- For S5 students who have mastered the concept and need the highest-level comprehension challenge  
- When the student needs to build a personal conceptual hook for retention  
- As a session closing challenge

**4. When NOT to Use:**  
- For S0 students who have not internalised the concept structure  
- When the student has not yet demonstrated the ability to explain the concept in their own words (P44 must precede)

**5. Student States Supported:**  
S3, S5 (primary); S8 (adult learners with extensive real-world knowledge benefit from analogy construction)

**6. CPA Stage Compatibility:**  
P, A (analogies operate at the structural/abstract level)

**7. Inputs Required:**  
- `concept_slot`: the concept to be analogized  
- `analogy_question`: "What does [concept] remind you of? Explain why the comparison works — what structure do they share?"

**8. Expected Student Response:**  
A valid analogy — a different domain where the same structural relationship holds — with an explanation of what makes the analogy apt.

**9. Success Signal:**  
The analogy captures the defining structural feature of the concept, not just a surface resemblance.

**10. Failure Signal:**  
The analogy is based on surface resemblance, not structural similarity; student cannot explain why the analogy works at a structural level.

**11. Recovery:**  
Provide a known analogy and ask the student to explain why it works structurally; then ask the student to improve on it or find a different one.

**12. Typical Misconceptions Addressed:**  
Hollow comprehension (student can explain the concept but has no structural understanding of its pattern).

**13. Compatible Primitives:**  
P44 (DEFINITION CONSTRUCTION) before; P73 (GENUINE INTEREST SIGNAL) often follows — student-invented analogies are often genuinely interesting.

**14. Incompatible Primitives:**  
No hard incompatibilities.

**15. Composition Constraints:**  
GR-2 (P55 follows). The explanation of WHY the analogy works is mandatory — the analogy without the explanation is not P48.

**16. Subject Examples:**  
- **Mathematics:** "What does a function remind you of? It can be from any domain — food, relationships, nature, anything. Explain why your comparison captures the 'exactly one output' structure."  
- **Physics:** "What in real life reminds you of Newton's Second Law? Your analogy must capture the three-way relationship between force, mass, and acceleration."  
- **English:** "What does the passive voice feel like — what is the experience of reading it, compared to the active voice? Build an analogy from something outside language."

---

## CATEGORY F — REGULATION

*Control the teaching process itself — pacing, load, feedback, metacognition, scaffolding. The control plane of the Educational Brain. Category F primitives do not introduce content; they manage the conditions under which content is processed.*

---

### P49 — CONFIRMATION
**Type:** True Primitive &nbsp;|&nbsp; **Reuse Frequency:** Very High

**1. Purpose:**  
Signal that the student's reasoning is on track — targeted at the process, not the product.

**2. Cognitive Objective:**  
Reinforce productive reasoning strategies so the student continues using them; distinguish correct reasoning from merely correct answers.

**3. When to Use:**  
- After any elicitation (E-category) where the student's reasoning is sound  
- In formative assessment sequences (P90) after P55 (WAIT TIME)

**4. When NOT to Use:**  
- As generic praise ("great job!") — P49 must confirm the specific reasoning, not the general performance  
- After an incorrect answer — use P50 (DISCONFIRMATION) instead  
- During P29 (CONFLICT RESOLUTION PAUSE) — confirmation terminates the processing

**5. Student States Supported:**  
S0–S9 (universal; especially important for S6 — Low Confidence)

**6. CPA Stage Compatibility:**  
C, P, A

**7. Inputs Required:**  
- `reasoning_target`: the specific reasoning element being confirmed ("that reasoning is sound" not "you're correct")

**8. Expected Student Response:**  
Student continues the current reasoning approach; confidence increases.

**9. Success Signal:**  
Student builds on the confirmed reasoning in their next response.

**10. Failure Signal:**  
Student stops after confirmation and waits for the next question (confirmation received as a full stop, not an encouragement to continue).

**11. Recovery:**  
Follow P49 immediately with P53 (ELABORATION REQUEST) to signal that the reasoning should continue.

**12. Typical Misconceptions Addressed:**  
None — process primitive. But P49 reinforces the reasoning strategies that prevent misconceptions.

**13. Compatible Primitives:**  
GR-2 applies in assessment sequences; P53 (ELABORATION REQUEST) frequently follows; P90 (FORMATIVE ASSESSMENT WITH FEEDBACK) uses P49 in its expansion.

**14. Incompatible Primitives:**  
P28 (COGNITIVE CONFLICT INDUCTION) immediately after P49 — do not confirm and then immediately challenge.

**15. Composition Constraints:**  
P49 must identify the specific reasoning element confirmed. Generic confirmations without a `reasoning_target` are not valid P49 instances.

**16. Subject Examples:**  
- **Mathematics:** "That reasoning is correct — you checked each input separately rather than counting total arrows. That's exactly the right approach."  
- **Physics:** "Your logic is sound: you identified the net force direction before calculating magnitude. That order matters."  
- **English:** "You cited a specific line before stating your interpretation. That's the right method — evidence before claim."

---

### P50 — DISCONFIRMATION
**Type:** True Primitive &nbsp;|&nbsp; **Reuse Frequency:** High

**1. Purpose:**  
Signal that the student's reasoning needs revision — without providing the correct answer.

**2. Cognitive Objective:**  
Redirect student processing toward error identification without removing the cognitive demand — the student must find the error themselves.

**3. When to Use:**  
- After an incorrect student response  
- When the error is in the reasoning process, not just the answer

**4. When NOT to Use:**  
- As generic correction ("that's wrong") — P50 must redirect to a specific element  
- For S6 (Low Confidence) students without first deploying P54 (PRODUCTIVE STRUGGLE PERMISSION) — unexplained disconfirmation can trigger shutdown  
- When the error requires schema repair (P50 is insufficient for misconceptions — use P28)

**5. Student States Supported:**  
S0–S9 (universal; calibrate delivery for S6)

**6. CPA Stage Compatibility:**  
C, P, A

**7. Inputs Required:**  
- `redirect_target`: the specific element in the student's reasoning that needs revision ("check what happens when x = 0")  
- `redirect_framing`: non-evaluative language ("that's interesting — but check…" rather than "that's wrong")

**8. Expected Student Response:**  
Student self-corrects by re-examining the `redirect_target`.

**9. Success Signal:**  
Student identifies their error through re-examination and corrects it.

**10. Failure Signal:**  
Student repeats the same error; or student becomes confused about what needs revision.

**11. Recovery:**  
Use P51 (ERROR DIAGNOSIS FACILITATION) to help the student identify whether the error is procedural or conceptual; then route to P52 (TARGETED REDIRECT) or Schema Repair chain.

**12. Typical Misconceptions Addressed:**  
None directly, but disconfirmation without the correct answer forces active error-identification rather than passive correction-reception.

**13. Compatible Primitives:**  
P51 (ERROR DIAGNOSIS FACILITATION) follows when the student cannot self-correct; P52 (TARGETED REDIRECT) for more specific redirection.

**14. Incompatible Primitives:**  
P49 (CONFIRMATION) for the same response — never confirm and disconfirm the same reasoning.

**15. Composition Constraints:**  
`redirect_target` must be specified — generic disconfirmation ("not quite") is not P50. The correct answer must not be provided — if it is provided, this becomes P31 (SCHEMA REPLACEMENT), not P50.

**16. Subject Examples:**  
- **Mathematics:** "That's an interesting approach — but check what happens to input 2 specifically. Look at just input 2."  
- **Physics:** "Look at your force diagram again. Is gravity the only vertical force? Check the surface."  
- **English:** "Your identification might be right — but check the grammatical subject of this sentence. Who or what is performing the action?"

---

### P51 — ERROR DIAGNOSIS FACILITATION
**Type:** True Primitive &nbsp;|&nbsp; **Reuse Frequency:** High

**1. Purpose:**  
Actively help the student identify the cause of their error — not just the fact of it.

**2. Cognitive Objective:**  
Make error analysis a learning event: distinguishing procedural errors (wrong execution of a known rule) from conceptual errors (wrong understanding of the underlying idea) is itself a metacognitive skill.

**3. When to Use:**  
- After P50 (DISCONFIRMATION) when the student cannot self-correct  
- Whenever an error occurs that requires understanding its type before routing to the appropriate remediation

**4. When NOT to Use:**  
- When the error type is already clear (go directly to the appropriate remediation)  
- As a substitute for the remediation itself — diagnosis leads to remedy, not replaces it

**5. Student States Supported:**  
S0–S9 (universal)

**6. CPA Stage Compatibility:**  
C, P, A

**7. Inputs Required:**  
- `error_instance`: the specific error to diagnose  
- `diagnosis_question`: "Was that a calculation error, or did you use the wrong rule? Let's check which one."

**8. Expected Student Response:**  
Student identifies the type of error: procedural (wrong execution) or conceptual (wrong model).

**9. Success Signal:**  
Student correctly categorises their error AND can state what went wrong specifically.

**10. Failure Signal:**  
Student cannot categorise the error; or categorises it incorrectly (believes it is procedural when it is conceptual).

**11. Recovery:**  
Run the procedure step-by-step while asking after each step whether that step is correct — the first step the student agrees is wrong identifies the error location.

**12. Typical Misconceptions Addressed:**  
None directly, but conceptual error identification routes to Schema Repair chain; procedural error identification routes to P52 (TARGETED REDIRECT).

**13. Compatible Primitives:**  
P50 (DISCONFIRMATION) before; P52 (TARGETED REDIRECT) for procedural errors after; P26 (SCHEMA ACTIVATION) for conceptual errors after.

**14. Incompatible Primitives:**  
P31 (SCHEMA REPLACEMENT) before P51 — replace before diagnosing cannot be targeted.

**15. Composition Constraints:**  
P51 in the P90 (FORMATIVE ASSESSMENT WITH FEEDBACK) expansion follows P55 and [P49|P50].

**16. Subject Examples:**  
- **Mathematics:** "Let's figure out what went wrong. First question: do you think the rule you used is the right rule for this problem type? Or did you apply the right rule but make a calculation error somewhere?"  
- **Physics:** "Let's diagnose: did you set up the force diagram incorrectly, or did you set it up correctly but make an arithmetic error in the net force calculation?"  
- **English:** "Let's find the error: did you apply the passive-voice criterion correctly? Or did you apply the criterion but make a mistake in identifying the grammatical subject?"

---

### P52 — TARGETED REDIRECT
**Type:** True Primitive &nbsp;|&nbsp; **Reuse Frequency:** High

**1. Purpose:**  
Move student attention from an unproductive or wrong focus to the right one.

**2. Cognitive Objective:**  
Re-orient the student's analysis without telling them the answer — shift the frame of attack, not the answer.

**3. When to Use:**  
- After P51 reveals a procedural error  
- When the student is working on the right problem but examining the wrong aspect of it

**4. When NOT to Use:**  
- When the error is conceptual (use Schema Repair chain instead)  
- When the student's current focus is correct (do not redirect correct attention)

**5. Student States Supported:**  
S0–S9 (universal)

**6. CPA Stage Compatibility:**  
C, P, A

**7. Inputs Required:**  
- `wrong_focus`: what the student is currently examining  
- `right_focus`: what they should be examining  
- `redirect_phrase`: "Let's focus on [right_focus] for a moment — just [right_focus]."

**8. Expected Student Response:**  
Student redirects attention and finds the path forward from the new focus.

**9. Success Signal:**  
Student, having redirected, identifies the correct next step.

**10. Failure Signal:**  
Student cannot make progress even with redirected attention.

**11. Recovery:**  
If targeted redirect fails, move to P84 (LOAD MANAGEMENT) — break the problem into smaller sub-problems and redirect within a simpler scope.

**12. Typical Misconceptions Addressed:**  
None directly — procedural redirection. For conceptual errors, route to Schema Repair chain.

**13. Compatible Primitives:**  
P51 (ERROR DIAGNOSIS FACILITATION) before; P34 (CLOSED QUESTION) after to test the redirected focus.

**14. Incompatible Primitives:**  
P31 (SCHEMA REPLACEMENT) immediately after P52 — procedural redirect and schema replacement are different remediation paths; do not combine without diagnosis.

**15. Composition Constraints:**  
`right_focus` must be a specific element, not a general directive ("look more carefully" is not P52).

**16. Subject Examples:**  
- **Mathematics:** "Don't look at the whole diagram — focus only on input 2. Just input 2. How many arrows leave input 2?"  
- **Physics:** "Don't calculate yet. Focus only on the direction of each force. Get the directions right before you touch numbers."  
- **English:** "Don't read the whole sentence yet. Focus only on the main verb. What is the verb in this sentence?"

---

### P53 — ELABORATION REQUEST
**Type:** True Primitive &nbsp;|&nbsp; **Reuse Frequency:** Medium

**1. Purpose:**  
Ask the student to extend or deepen a correct response.

**2. Cognitive Objective:**  
Convert a surface-level correct answer into a deeply encoded one — depth of elaboration directly predicts retention.

**3. When to Use:**  
- After a correct but brief response  
- After P49 (CONFIRMATION) to signal that more depth is expected  
- When the student's response is correct but reveals shallow encoding

**4. When NOT to Use:**  
- After an incorrect response (use P50 + P51 instead)  
- When the student has already elaborated fully

**5. Student States Supported:**  
S1, S3, S5 (primary); S0 (with scaffolding)

**6. CPA Stage Compatibility:**  
C, P, A

**7. Inputs Required:**  
- `elaboration_target`: the specific aspect of the correct response to elaborate  
- `elaboration_question`: "Good — can you say more about why?" / "What else is true about that?"

**8. Expected Student Response:**  
Student produces a deeper, more elaborated response that connects the concept to other knowledge.

**9. Success Signal:**  
Elaboration makes a connection to another concept or explains a reason that was not present in the original response.

**10. Failure Signal:**  
Student restates the original response without deepening; student says "I don't know why."

**11. Recovery:**  
Use P58 (ELABORATIVE INTERROGATION) — a more structured "why is this true?" sequence.

**12. Typical Misconceptions Addressed:**  
None directly, but elaboration surfaces whether the correct answer is schema-based (can elaborate) or memorised (cannot).

**13. Compatible Primitives:**  
P49 (CONFIRMATION) before; P58 (ELABORATIVE INTERROGATION) as a deeper version.

**14. Incompatible Primitives:**  
P50 (DISCONFIRMATION) immediately after P53 — do not request elaboration and then disconfirm the elaboration.

**15. Composition Constraints:**  
`elaboration_target` must be specific — "say more" without a target is not P53.

**16. Subject Examples:**  
- **Mathematics:** "Good — can you say more about why single-valuedness matters? What breaks if you allow multiple outputs?"  
- **Physics:** "Right — now why does mass cancel out in free fall? Say more about the mechanism."  
- **English:** "Correct — say more about why this structure is passive. What in the grammar makes it so?"

---

### P54 — PRODUCTIVE STRUGGLE PERMISSION
**Type:** True Primitive &nbsp;|&nbsp; **Reuse Frequency:** Medium

**1. Purpose:**  
Explicitly signal that not-knowing is acceptable and expected in the current moment.

**2. Cognitive Objective:**  
Lower the psychological stakes of cognitive demand, enabling students who would otherwise shut down under challenge to engage with difficult material.

**3. When to Use:**  
- Before any elicitation that has a high difficulty ceiling  
- For S6 (Low Confidence) students at the start of a challenging sequence  
- GR-8: must precede any primitive that will likely produce student failure on first attempt

**4. When NOT to Use:**  
- When the student is already confident and the challenge is well-matched to ability  
- After a student has already succeeded — productive struggle permission before success is motivational; after success it becomes condescending

**5. Student States Supported:**  
S6 (primary); S0 (moderate — novices benefit from normalised struggle); S9 (moderate)

**6. CPA Stage Compatibility:**  
C, P, A — purely verbal/relational

**7. Inputs Required:**  
- `struggle_permission_statement`: specific language that normalises not-knowing ("take your time — this is supposed to be challenging"; "it's normal if this takes a few tries")

**8. Expected Student Response:**  
Student attempts the challenging task without withdrawing; willingness to try increases.

**9. Success Signal:**  
Student attempts the task; attempts may fail but student persists rather than stops.

**10. Failure Signal:**  
Student still refuses to attempt despite explicit permission; or student treats permission as confirmation that they cannot do it.

**11. Recovery:**  
Reduce the task demand (P84 LOAD MANAGEMENT); pair with P70 (COMPETENCE EVIDENCE) to establish that the student has already succeeded at a related task.

**12. Typical Misconceptions Addressed:**  
None — motivational/regulatory primitive.

**13. Compatible Primitives:**  
P70 (COMPETENCE EVIDENCE) before; GR-8: any high-difficulty elicitation after.

**14. Incompatible Primitives:**  
P68 (MASTERY SELF-DECLARATION) immediately after P54 — permission to struggle contradicts mastery declaration.

**15. Composition Constraints:**  
GR-8: P54 must precede any primitive where first-attempt failure is likely. This rule is particularly important for S6 students.

**16. Subject Examples:**  
- **Mathematics:** "This next problem is hard. Take your time — it's supposed to require several tries. There's no rush, and getting it wrong first is part of the process."  
- **Physics:** "You may not get this on the first try — and that's fine. Struggle with it. The thinking you do while struggling is the learning."  
- **English:** "This passage is deliberately ambiguous. You're not supposed to have an immediate answer. Sit with it."

---

### P55 — WAIT TIME
**Type:** True Primitive &nbsp;|&nbsp; **Reuse Frequency:** Universal

**1. Purpose:**  
Create deliberate silence after asking a question — minimum 5 seconds before any follow-up.

**2. Cognitive Objective:**  
Allow cognitive processing to complete: students who are given wait time produce higher quality, more elaborate responses and engage more students in responding.

**3. When to Use:**  
- GR-2: after every elicitation primitive (P34–P48, P74–P80)  
- After P29 (CONFLICT RESOLUTION PAUSE) — an extended form of wait time  
- After any question where the student is expected to produce reasoning (not just recall)

**4. When NOT to Use:**  
- Between non-elicitation primitives where no student response is expected

**5. Student States Supported:**  
S0–S9 (universal)

**6. CPA Stage Compatibility:**  
C, P, A — universal

**7. Inputs Required:**  
- `wait_duration`: minimum 5 seconds; 10+ seconds for complex questions or S2/S7 during conflict  
- `silence_signal`: no teacher speech, no hint, no verbal filler during the wait

**8. Expected Student Response:**  
Student is actively processing during the wait; produces a higher-quality response than they would have without the wait.

**9. Success Signal:**  
Student response after wait time is more elaborated, more reasoned, or more accurate than responses without wait time.

**10. Failure Signal:**  
Teacher breaks wait time before the minimum duration; teacher provides hints during the wait.

**11. Recovery:**  
If the student appears frozen (not processing): use P54 (PRODUCTIVE STRUGGLE PERMISSION) to normalise the struggle, then re-apply P55.

**12. Typical Misconceptions Addressed:**  
None directly — but P55 is the mechanism that allows P28 (COGNITIVE CONFLICT INDUCTION) and P29 (CONFLICT RESOLUTION PAUSE) to produce their effect.

**13. Compatible Primitives:**  
Every elicitation primitive; P29 (CONFLICT RESOLUTION PAUSE) is an extended variant.

**14. Incompatible Primitives:**  
No hard incompatibilities.

**15. Composition Constraints:**  
GR-2: P55 is mandatory after every E-category primitive. Minimum duration: 5 seconds. P29 uses 10+ seconds. This is the most commonly violated rule in teaching — it must be enforced by the composition engine.

**16. Subject Examples:**  
- **Mathematics:** [Ask question] [5 seconds of silence. No hints, no "take your time," no filler. Just wait.] [Student responds.]  
- **Physics:** [Ask question] [5 seconds minimum. For conflict-induction scenarios: 10 seconds minimum.]  
- **English:** [Ask interpretive question] [5 seconds. If the question is interpretive and complex: 10+ seconds.]

---

### P63 — SELF-MONITORING TRIGGER
**Type:** True Primitive &nbsp;|&nbsp; **Reuse Frequency:** Medium

**1. Purpose:**  
Prompt the student to check their own understanding before the session advances.

**2. Cognitive Objective:**  
Develop metacognitive self-monitoring as a habitual practice — the student learns to interrupt their own processing to verify comprehension.

**3. When to Use:**  
- Before advancing to a new concept or harder protocol stage  
- After a complex explanation to verify retention before building on it  
- As a mid-session pacing checkpoint

**4. When NOT to Use:**  
- More than once per major section (overuse reduces effectiveness)  
- As a substitute for actual assessment (self-monitoring is metacognitive; P74–P80 are the actual assessments)

**5. Student States Supported:**  
S0–S9 (universal; especially S1 who may not self-monitor naturally)

**6. CPA Stage Compatibility:**  
C, P, A

**7. Inputs Required:**  
- `monitoring_question`: "Before we continue — how clear is this so far?" / "What are you confident about? What are you unsure of?"

**8. Expected Student Response:**  
Student distinguishes between what they understand and what they don't; gives a differentiated self-assessment.

**9. Success Signal:**  
Student produces a calibrated self-assessment (matches actual performance level).

**10. Failure Signal:**  
Student says "everything is clear" when errors are visible; or "nothing is clear" when performance is adequate. Both are calibration failures.

**11. Recovery:**  
Use P64 (CONFIDENCE CALIBRATION) to compare self-assessment with actual performance.

**12. Typical Misconceptions Addressed:**  
Illusion of knowing (student believes they understand but cannot demonstrate it).

**13. Compatible Primitives:**  
P64 (CONFIDENCE CALIBRATION) follows when calibration needs to be verified; P40 (METACOGNITIVE PROMPT) is a more specific version.

**14. Incompatible Primitives:**  
No hard incompatibilities.

**15. Composition Constraints:**  
GR-2 (P55 follows the monitoring question). Use at natural session breaks, not arbitrarily.

**16. Subject Examples:**  
- **Mathematics:** "Before we move to examples with three variables — how solid does the two-variable case feel? What, if anything, is still fuzzy?"  
- **Physics:** "We're about to apply Newton's Second Law to more complex systems. What are you confident about so far? What would you like to revisit?"  
- **English:** "Before we read the next passage — what do you feel you've got about identifying implied claims? What are you still uncertain about?"

---

### P64 — CONFIDENCE CALIBRATION
**Type:** True Primitive &nbsp;|&nbsp; **Reuse Frequency:** High

**1. Purpose:**  
Measure the gap between student confidence and student accuracy, and address both together.

**2. Cognitive Objective:**  
Identify the most dangerous student state (high confidence + low accuracy = S7) and the most underused state (low confidence + high accuracy = S6), both of which require targeted intervention that differs from normal instruction.

**3. When to Use:**  
- After P63 (SELF-MONITORING TRIGGER) when calibration needs to be verified  
- GR-4: P64 can trigger Schema Repair chain if it reveals high confidence + wrong answer  
- Periodically for all students as a confidence-accuracy gap monitor

**4. When NOT to Use:**  
- As the first primitive in a session (no performance baseline exists yet)

**5. Student States Supported:**  
S0–S9 (calibration is universal); outputs determine routing: high conf + high acc → advance; high conf + low acc → Schema Repair; low conf + high acc → P70 (COMPETENCE EVIDENCE).

**6. CPA Stage Compatibility:**  
C, P, A

**7. Inputs Required:**  
- `confidence_question`: "How confident are you that that's correct? 1–5."  
- `accuracy_check`: the actual correctness of the student's response  
- `calibration_matrix`: [high/low confidence] × [high/low accuracy] → routing decision

**8. Expected Student Response:**  
Student rates their confidence on a simple scale.

**9. Success Signal:**  
Student's stated confidence matches their actual accuracy (well-calibrated).

**10. Failure Signal:**  
Gap between stated confidence and actual accuracy (either direction).

**11. Recovery:**  
High confidence + low accuracy: GR-4 — enter Schema Repair chain. Low confidence + high accuracy: deploy P70 (COMPETENCE EVIDENCE) to close the confidence gap.

**12. Typical Misconceptions Addressed:**  
None directly, but high confidence + wrong answer is the primary indicator of a misconception requiring P26→P32 repair.

**13. Compatible Primitives:**  
P63 (SELF-MONITORING TRIGGER) before; P70 (COMPETENCE EVIDENCE) for low-confidence/high-accuracy cases; P26 (SCHEMA ACTIVATION) for high-confidence/low-accuracy cases (GR-4 satisfied).

**14. Incompatible Primitives:**  
No hard incompatibilities.

**15. Composition Constraints:**  
GR-4: P64 (like P41) can trigger the Schema Repair chain. The `calibration_matrix` routing must be implemented deterministically — not LLM-decided.

**16. Subject Examples:**  
- **Mathematics:** "You classified it as a function. How confident are you — 1 is a guess, 5 is certain?" [Student: "5."] [Teacher: "Let's verify." — if wrong, GR-4 applies.]  
- **Physics:** "You calculated 30 N. Confidence level?" [Student: "4."] [Check: 30 N is wrong.] [High confidence + wrong → enter Schema Repair.]  
- **English:** "You said this is passive. Confidence?" [Student: "2."] [Check: it is passive.] [Low confidence + right → deploy P70.]

---

### P65 — ERROR ATTRIBUTION
**Type:** True Primitive &nbsp;|&nbsp; **Reuse Frequency:** Medium

**1. Purpose:**  
Guide the student to identify whether an error was procedural or conceptual.

**2. Cognitive Objective:**  
Build metacognitive error-classification — the student learns to diagnose the source of their own mistakes, enabling self-directed remediation.

**3. When to Use:**  
- After P51 (ERROR DIAGNOSIS FACILITATION) — the error has been identified; now the student attributes it  
- When a student keeps repeating the same type of error without understanding why

**4. When NOT to Use:**  
- In real-time during a timed task — error attribution requires reflection  
- For errors that are clearly procedural without any conceptual component

**5. Student States Supported:**  
S1, S3, S5 (primary); S8 (adult learners benefit from explicit error-type understanding)

**6. CPA Stage Compatibility:**  
C, P, A

**7. Inputs Required:**  
- `error_instance`: the specific error to attribute  
- `attribution_question`: "Was that a wrong rule or a wrong execution of the right rule?"

**8. Expected Student Response:**  
Student correctly categorises the error as procedural or conceptual and can state what would need to change to fix it.

**9. Success Signal:**  
Student correctly categorises AND identifies the specific locus of the error.

**10. Failure Signal:**  
Student incorrectly categorises (calls a conceptual error procedural, or vice versa).

**11. Recovery:**  
Run P51 (ERROR DIAGNOSIS FACILITATION) step by step to lead the student to the correct categorisation.

**12. Typical Misconceptions Addressed:**  
None directly — metacognitive primitive. However, consistent misattribution (always calling conceptual errors procedural) is itself a metacognitive pattern that requires attention.

**13. Compatible Primitives:**  
P51 (ERROR DIAGNOSIS FACILITATION) before; P66 (STRATEGY AWARENESS) often follows — understanding error type is adjacent to understanding strategy choice.

**14. Incompatible Primitives:**  
No hard incompatibilities.

**15. Composition Constraints:**  
P65 must follow an error event — it cannot fire when no error is present.

**16. Subject Examples:**  
- **Mathematics:** "You got the classification wrong. Was that because you used the wrong criterion? Or because you applied the right criterion incorrectly to this specific case?"  
- **Physics:** "Your force calculation was wrong. Was it because you forgot a force (wrong rule application), or because you made an arithmetic error (right rule, wrong execution)?"  
- **English:** "You identified it incorrectly. Was it because your rule for passive voice is wrong? Or because your rule is right but you misidentified the grammatical subject?"

---

### P66 — STRATEGY AWARENESS
**Type:** True Primitive &nbsp;|&nbsp; **Reuse Frequency:** Low

**1. Purpose:**  
Direct the student to identify which strategy they are using and why it was chosen.

**2. Cognitive Objective:**  
Convert implicit strategy use to explicit metacognitive knowledge — the student who can name their strategy can choose strategies rather than use them by default.

**3. When to Use:**  
- After the student has successfully used a strategy across several problems  
- For S5 students who need to build strategic repertoire, not just procedural fluency

**4. When NOT to Use:**  
- Before the strategy has been used successfully (naming a strategy before executing it is the inverse order)  
- For S0 students who have not yet developed any strategies

**5. Student States Supported:**  
S3, S5 (primary); S8 (adult learners benefit from explicit strategy vocabulary)

**6. CPA Stage Compatibility:**  
A (strategy awareness is abstract — it operates on the meta-level)

**7. Inputs Required:**  
- `strategy_question`: "What strategy are you using here? Why did you choose it?"

**8. Expected Student Response:**  
Student names the strategy and provides a reason for choosing it over alternatives.

**9. Success Signal:**  
Student names the strategy AND articulates when it is and is not appropriate.

**10. Failure Signal:**  
Student cannot name the strategy ("I just did it"); or names the strategy without being able to say when it applies.

**11. Recovery:**  
Provide the strategy name; ask the student to describe what the strategy does and when they would use it.

**12. Typical Misconceptions Addressed:**  
None directly — metacognitive primitive.

**13. Compatible Primitives:**  
P65 (ERROR ATTRIBUTION) often precedes — understanding errors leads to understanding strategy; P67 (TRANSFER READINESS CHECK) follows — knowing your strategy enables transfer readiness assessment.

**14. Incompatible Primitives:**  
No hard incompatibilities.

**15. Composition Constraints:**  
GR-2 (P55 follows). Strategy must have been employed at least once before P66 fires.

**16. Subject Examples:**  
- **Mathematics:** "You just used a 'check each input separately' strategy for classification. What other strategies could you have used? Why did you choose this one?"  
- **Physics:** "What strategy did you use to identify the forces in this system? Is that always your first step? Why?"  
- **English:** "You started by looking for the main verb. Is that your general strategy? When does that strategy fail?"

---

### P67 — TRANSFER READINESS CHECK
**Type:** True Primitive &nbsp;|&nbsp; **Reuse Frequency:** Low

**1. Purpose:**  
Direct the student to assess their own readiness to apply the concept in a new context before attempting it.

**2. Cognitive Objective:**  
Prevent premature transfer attempts that fail and erode confidence — build self-assessment of knowledge-application readiness.

**3. When to Use:**  
- Before introducing a transfer task (P39 TRANSFER PROMPT)  
- When the student is about to attempt applying a concept to a significantly new context

**4. When NOT to Use:**  
- After the transfer attempt (the check is before, not after)  
- When the student has already demonstrated successful transfer

**5. Student States Supported:**  
S1, S5 (primary); S3, S8 (moderate)

**6. CPA Stage Compatibility:**  
A (transfer readiness is abstract metacognition)

**7. Inputs Required:**  
- `target_transfer_context`: the new context the student is about to apply the concept in  
- `readiness_question`: "Before you try this in [new context] — what would you need to know to succeed? Do you feel ready?"

**8. Expected Student Response:**  
Student assesses readiness accurately — identifies what they know and what they would need.

**9. Success Signal:**  
Student accurately identifies the knowledge requirements for the transfer task; self-assessment matches actual performance.

**10. Failure Signal:**  
Student overestimates readiness (attempts and fails); or underestimates (refuses to attempt but would succeed).

**11. Recovery:**  
For overestimate: use P64 (CONFIDENCE CALIBRATION) after the failed attempt. For underestimate: use P70 (COMPETENCE EVIDENCE) to establish actual capability before the transfer attempt.

**12. Typical Misconceptions Addressed:**  
None directly — regulatory primitive.

**13. Compatible Primitives:**  
P39 (TRANSFER PROMPT) follows; P64 (CONFIDENCE CALIBRATION) for calibration verification.

**14. Incompatible Primitives:**  
No hard incompatibilities.

**15. Composition Constraints:**  
GR-2 (P55 follows). Must precede the transfer attempt it is preparing the student for.

**16. Subject Examples:**  
- **Mathematics:** "We've been working with functions in the context of number relationships. You're about to apply the concept to programming. What would you need to know about programming for the function concept to transfer? Do you feel ready to try?"  
- **Physics:** "We've been applying Newton's Second Law to simple systems. You're about to apply it to a system with three forces. What's different about that? Do you feel ready?"  
- **English:** "We've identified passive voice in simple sentences. You're about to read a complex academic passage and identify passive constructions throughout. What might be harder? Are you ready?"

---

### P68 — MASTERY SELF-DECLARATION
**Type:** True Primitive &nbsp;|&nbsp; **Reuse Frequency:** Low

**1. Purpose:**  
Invite the student to explicitly state that they have understood the concept.

**2. Cognitive Objective:**  
Create accountability through self-declaration: a student who has publicly claimed mastery will attend more carefully to inconsistency when it appears in subsequent sessions.

**3. When to Use:**  
- After P32 (SCHEMA CONSOLIDATION) and P33 (DISCRIMINATION TRAINING) are complete  
- At natural session closing points as a self-assessment  
- Before P91 (MASTERY VERIFICATION) — the self-declaration precedes the formal gate

**4. When NOT to Use:**  
- Before P21 + P22 + P32 are complete — mastery declaration before consolidation is premature  
- GR-6 violation: P68 must not follow P91 — the verification is the gate, not the declaration

**5. Student States Supported:**  
S1, S3, S5 (primarily); S0 (with scaffolding)

**6. CPA Stage Compatibility:**  
A (self-declaration is abstract metacognition)

**7. Inputs Required:**  
- `declaration_question`: "Do you feel you have this concept? What can you now do that you couldn't before?"

**8. Expected Student Response:**  
Student declares mastery AND can articulate what they can now do.

**9. Success Signal:**  
Student declares mastery with a specific capability statement ("I can now classify any correspondence as a function or not").

**10. Failure Signal:**  
Student declares mastery without being able to articulate a capability; or refuses to declare.

**11. Recovery:**  
If student cannot articulate a capability: use P44 (DEFINITION CONSTRUCTION) or P42 (EXAMPLE GENERATION) to surface what they have learned; return to P68 after.

**12. Typical Misconceptions Addressed:**  
None directly.

**13. Compatible Primitives:**  
P91 (MASTERY VERIFICATION) follows after self-declaration (formal gate); P32 (SCHEMA CONSOLIDATION) before.

**14. Incompatible Primitives:**  
P28 (COGNITIVE CONFLICT INDUCTION) immediately after — do not challenge the schema immediately after mastery declaration without a new domain.

**15. Composition Constraints:**  
GR-6: P91 (MASTERY VERIFICATION) must be terminal. P68 precedes P91 but P91 is the actual gate — P68 is the self-assessment that precedes the formal test.

**16. Subject Examples:**  
- **Mathematics:** "Do you feel you have the function concept? What can you now do with functions that you couldn't do at the start of this session?"  
- **Physics:** "Are you ready to use Newton's Second Law independently? Describe one type of problem you could now set up and solve."  
- **English:** "Do you feel confident identifying passive voice in any sentence you encounter? Describe how you would approach a new sentence."

---

### P81 — SCAFFOLDING
**Type:** True Primitive &nbsp;|&nbsp; **Reuse Frequency:** High

**1. Purpose:**  
Provide temporary structural support for a primitive that the student cannot yet execute independently.

**2. Cognitive Objective:**  
Enable participation in a task that is slightly beyond independent ability — the scaffolding holds the parts the student cannot yet hold, allowing the student to focus cognitive resources on the target learning.

**3. When to Use:**  
- When a task is within the student's Zone of Proximal Development (slightly beyond current independent ability)  
- When P11 (PARTIAL WORKED EXAMPLE) logic is applied to non-procedural tasks  
- Before P82 (FADING) begins

**4. When NOT to Use:**  
- For tasks already within independent ability (scaffolding without need becomes dependence)  
- As a permanent support (scaffolding that does not eventually fade is a crutch)

**5. Student States Supported:**  
S0, S4, S6 (primary); S1, S9 (moderate)

**6. CPA Stage Compatibility:**  
C, P, A — scaffolding applies at any abstraction level

**7. Inputs Required:**  
- `scaffold_type`: the structural support provided (partial answer, visual organiser, worked first step, answer space structure)  
- `target_primitive`: which primitive is being scaffolded  
- `scaffold_withdrawal_plan`: when and how P82 will remove this scaffold

**8. Expected Student Response:**  
Student uses the scaffold to engage with the task; attempts the unsupported components.

**9. Success Signal:**  
Student completes the scaffolded task AND can identify which parts they did independently.

**10. Failure Signal:**  
Student cannot engage even with the scaffold; scaffold is insufficient for the task.

**11. Recovery:**  
Reduce the task scope (P84 LOAD MANAGEMENT); provide a stronger scaffold; step back to a prerequisite concept.

**12. Typical Misconceptions Addressed:**  
None directly — load management primitive.

**13. Compatible Primitives:**  
P82 (FADING) always follows scaffolding (the withdrawal plan); P84 (LOAD MANAGEMENT) before to determine what scaffold is needed.

**14. Incompatible Primitives:**  
P91 (MASTERY VERIFICATION) during scaffolded task — mastery cannot be verified when scaffolding is present.

**15. Composition Constraints:**  
Named Compound P12 (FADED WORKED EXAMPLE) instantiates P81→P82 at the worked-example level. P81 without P82 in the withdrawal plan is an incomplete specification.

**16. Subject Examples:**  
- **Mathematics:** [Before asking student to classify independently] "I'll give you a checklist: Step 1 — list all inputs. Step 2 — count arrows from each input. Step 3 — if any input has more than one arrow: not a function. Use the checklist." [P82 removes the checklist in the next iteration.]  
- **Physics:** [Before asking student to draw free-body diagram] "I'll give you the axes — x is horizontal, y is vertical. You draw the force arrows." [P82 removes axes in next diagram.]  
- **English:** [Before asking student to identify passive voice] "The passive formula is: [object of action] + [form of 'to be'] + [past participle]. Check each sentence against this template." [P82 removes template later.]

---

### P82 — FADING
**Type:** True Primitive &nbsp;|&nbsp; **Reuse Frequency:** High

**1. Purpose:**  
Systematically remove support that was previously provided, transferring responsibility to the student.

**2. Cognitive Objective:**  
Build independence: the student who can perform with support learns to perform without it through deliberate scaffold withdrawal.

**3. When to Use:**  
- After P81 (SCAFFOLDING) has been successfully used  
- In each P10→P82→P10 cycle of Named Compound P12 (FADED WORKED EXAMPLE)

**4. When NOT to Use:**  
- Before the student has demonstrated success with the scaffold  
- All at once — fading must be gradual (one scaffold element per iteration)

**5. Student States Supported:**  
S0, S1, S4 (primary — students transitioning from supported to independent)

**6. CPA Stage Compatibility:**  
C, P, A

**7. Inputs Required:**  
- `scaffold_to_remove`: which specific support element is being withdrawn  
- `remaining_support`: what support remains after this fading step  
- `fading_rationale`: "Last time I provided [X]. This time, you'll do [X] yourself."

**8. Expected Student Response:**  
Student successfully completes the task without the removed scaffold element.

**9. Success Signal:**  
Student performs the previously scaffolded component independently.

**10. Failure Signal:**  
Student cannot perform without the removed scaffold; performance degrades significantly.

**11. Recovery:**  
Restore the scaffold; establish the specific component that failed; address it directly before re-attempting fading.

**12. Typical Misconceptions Addressed:**  
None directly, but fading reveals the exact point at which independent performance breaks down.

**13. Compatible Primitives:**  
P81 (SCAFFOLDING) always precedes; P82 appears between P10 instances in Named Compound P12.

**14. Incompatible Primitives:**  
P91 (MASTERY VERIFICATION) immediately after a single P82 — mastery cannot be verified from one successfully faded task.

**15. Composition Constraints:**  
One scaffold element removed per fading step. Named Compound P12 uses P82 twice (P10→P82→P10→P82→P10). Full specification must name the specific scaffold element being removed.

**16. Subject Examples:**  
- **Mathematics:** "Last time I gave you the checklist. This time: no checklist. You remember the three steps — apply them yourself."  
- **Physics:** "Last time I drew the axes. This time, you choose your axes and draw them before placing the force arrows."  
- **English:** "Last time you had the formula template. This time, identify the passive sentence without the template. Use the knowledge, not the reference."

---

### P83 — INTERLEAVING CONTROL
**Type:** True Primitive &nbsp;|&nbsp; **Reuse Frequency:** Medium

**1. Purpose:**  
Deliberately introduce a related concept into the current practice session to require discrimination between the two.

**2. Cognitive Objective:**  
Disrupt blocked practice and the illusion of mastery it creates — the student who can do concept A in a block of A-problems has not demonstrated that they can identify A-problems when they appear alongside B-problems.

**3. When to Use:**  
- After the student has demonstrated solid performance on the target concept in isolation  
- When the concept is adjacent to another concept that students commonly confuse with it

**4. When NOT to Use:**  
- Before the target concept is established (interleaving requires something to interleave with)  
- When the related concept has not been taught (students cannot discriminate what they haven't learned)

**5. Student States Supported:**  
S1, S3, S5 (primary — students with basic concept mastery ready for discrimination training)

**6. CPA Stage Compatibility:**  
C, P, A

**7. Inputs Required:**  
- `target_concept`: the concept being practiced  
- `interleaved_concept`: the related concept being introduced  
- `discrimination_signal`: how the student should identify which concept applies in each case

**8. Expected Student Response:**  
Student correctly identifies which concept applies to each problem in the interleaved set.

**9. Success Signal:**  
Student's accuracy on interleaved problems matches accuracy on blocked problems; discrimination is reliable.

**10. Failure Signal:**  
Student accuracy drops significantly in interleaved practice; student cannot reliably identify which concept applies.

**11. Recovery:**  
Return to blocked practice for one concept; use P33 (DISCRIMINATION TRAINING) to sharpen the boundary; reintroduce interleaving at lower density.

**12. Typical Misconceptions Addressed:**  
Context-dependent schema activation (student can identify a function in a "function lesson" but not when the problem could be from several possible concept areas).

**13. Compatible Primitives:**  
P88 (RETRIEVAL PRACTICE) in Named Compound P57 (INTERLEAVED PRACTICE); P33 (DISCRIMINATION TRAINING) before to prepare the discrimination criterion.

**14. Incompatible Primitives:**  
No hard incompatibilities.

**15. Composition Constraints:**  
Named Compound P57 = P88 + P83. The interleaved concept must have been taught before interleaving is introduced.

**16. Subject Examples:**  
- **Mathematics:** "I'm going to give you 6 problems — some involve functions, some involve relations that are not functions. You must identify which is which for each one."  
- **Physics:** "I'll give you 5 scenarios: some require Newton's First Law, some Newton's Second Law. Identify which law applies before solving."  
- **English:** "Here are 8 sentences — some are passive, some are active, some are stative. Identify each one and justify."

---

### P84 — LOAD MANAGEMENT
**Type:** True Primitive &nbsp;|&nbsp; **Reuse Frequency:** High

**1. Purpose:**  
Partition a complex task into sequenced parts to keep working memory within capacity.

**2. Cognitive Objective:**  
Reduce extraneous cognitive load so that germane load (learning) can occur — the student cannot learn when working memory is completely occupied by task management.

**3. When to Use:**  
- When a task has more than 3 simultaneous demands  
- When a student is failing on a multi-step task  
- Before P23 (DECOMPOSITION) — load management sets up the decomposition

**4. When NOT to Use:**  
- For tasks within the student's current working memory capacity (unnecessary partitioning reduces the challenge)

**5. Student States Supported:**  
S0, S4 (primary — students with limited working memory capacity for the task); S9 (moderate — second-language processing adds cognitive load)

**6. CPA Stage Compatibility:**  
C, P, A

**7. Inputs Required:**  
- `task_components`: the full set of components in the task  
- `partition_plan`: which components to address first, second, etc.  
- `load_constraint`: the maximum number of simultaneous demands appropriate for this student

**8. Expected Student Response:**  
Student successfully completes the first partition; can then proceed to the second with the first established.

**9. Success Signal:**  
Student completes each partition successfully; the partitioned approach leads to eventual task completion.

**10. Failure Signal:**  
Student cannot complete even the first partition; the first partition is itself too complex.

**11. Recovery:**  
Reduce partition size further; return to prerequisite concepts if the first partition requires knowledge not yet in place.

**12. Typical Misconceptions Addressed:**  
None directly — but overwhelm prevents learning; load management enables the conditions where misconceptions can be addressed.

**13. Compatible Primitives:**  
P23 (DECOMPOSITION) — decomposition is load management's mechanism; P81 (SCAFFOLDING) often pairs.

**14. Incompatible Primitives:**  
No hard incompatibilities.

**15. Composition Constraints:**  
The partition plan must be sequenced by prerequisite dependency (what must be done first before the next part can be attempted).

**16. Subject Examples:**  
- **Mathematics:** "This composition problem has three parts. First — just apply g to x = 2. Don't think about f yet. Just g." [After success] "Good. Now apply f to the result you got. Don't look back at g."  
- **Physics:** "Three forces acting. Let's handle one at a time. First — the gravitational force only. Magnitude and direction. Nothing else yet."  
- **English:** "Three implied claims in this passage. Let's find them one at a time. Focus only on the first paragraph."

---

### P85 — PACING CONTROL
**Type:** True Primitive &nbsp;|&nbsp; **Reuse Frequency:** High

**1. Purpose:**  
Regulate the rate of information introduction based on student processing state rather than a fixed time schedule.

**2. Cognitive Objective:**  
Match the rate of new content introduction to the rate at which working memory can process and transfer each item — prevent accumulation of unprocessed information.

**3. When to Use:**  
- Throughout every session — pacing should be adaptive, not fixed  
- When a student's response latency increases (processing is close to capacity)  
- When moving between major protocol stages

**4. When NOT to Use:**  
- Cannot be "not used" — pacing is always active; the question is whether it is controlled explicitly or left to default

**5. Student States Supported:**  
S0–S9 (universal)

**6. CPA Stage Compatibility:**  
C, P, A

**7. Inputs Required:**  
- `processing_signal`: student response latency, response quality, or explicit request for a pause  
- `pacing_action`: slow (introduce next item only after processing is confirmed); steady (normal advance rate); fast (accelerate for S5 when processing is ahead of content)

**8. Expected Student Response:**  
Session advances at the rate where each item is processed before the next is introduced.

**9. Success Signal:**  
Student response quality remains stable as new items are introduced; no degradation in performance.

**10. Failure Signal:**  
Student response quality degrades as the session advances (new items are being introduced before prior ones are processed).

**11. Recovery:**  
Pause new content introduction; allow the student to process what has been introduced; return to the last successfully processed item and re-engage from there.

**12. Typical Misconceptions Addressed:**  
None directly — but overloaded students cannot process corrections, making misconceptions uncorrectable.

**13. Compatible Primitives:**  
P84 (LOAD MANAGEMENT) — pacing is load management over time; P55 (WAIT TIME) is a single-instance pacing event; P85 is the session-level version.

**14. Incompatible Primitives:**  
No hard incompatibilities.

**15. Composition Constraints:**  
P85 is a session-level primitive that runs alongside all others — it is a monitor and control, not a discrete step. Compose as a continuous regulation layer.

**16. Subject Examples:**  
- **Mathematics:** [After student gives correct but slow response] "Let's hold here for a moment. Make sure that classification is solid before we add the next variable."  
- **Physics:** [After student gives rushed response with unnoticed error] "Slow down. Walk me through the force diagram step by step before we calculate anything."  
- **English:** [S9 student processing in second language] "We're covering this at a pace that works for you. Tell me when you're ready for the next sentence."

---

### P86 — MODALITY SWITCHING
**Type:** True Primitive &nbsp;|&nbsp; **Reuse Frequency:** Medium

**1. Purpose:**  
Move between verbal, visual, kinesthetic, and symbolic modes of presentation.

**2. Cognitive Objective:**  
Build multiple representation nodes for the same concept — each switch encodes the concept in a different representation system, creating a richer network that is more robust to retrieval cues from any direction.

**3. When to Use:**  
- When a student is stuck in one modality (cannot grasp the symbolic but can describe the concrete)  
- When moving between CPA stages (P25 ABSTRACTION LADDER in the process direction; P86 in the modality direction)  
- After a representation has been unsuccessful — switch modality rather than repeat

**4. When NOT to Use:**  
- When the student is making progress in the current modality  
- For S6 students who are stabilised in one modality — switching adds load

**5. Student States Supported:**  
S0, S1, S4, S9 (primary — students who benefit from multiple entry points); S5 (when one modality is a known gap)

**6. CPA Stage Compatibility:**  
C↔P↔A (P86 manages modality within and across CPA levels)

**7. Inputs Required:**  
- `current_modality`: the current representation mode (verbal, visual, symbolic, kinesthetic)  
- `target_modality`: the mode to switch to  
- `switch_rationale`: why this switch serves the student's current need

**8. Expected Student Response:**  
Student engages successfully with the target modality.

**9. Success Signal:**  
Student's comprehension or performance improves after the switch.

**10. Failure Signal:**  
Student is equally or more stuck in the new modality.

**11. Recovery:**  
Return to the modality where the student was most successful; add a bridge step connecting the two modalities.

**12. Typical Misconceptions Addressed:**  
None directly, but different modalities often reveal different misconceptions — a student who seems to understand verbally may reveal a misconception when asked to draw.

**13. Compatible Primitives:**  
P06, P07, P08 — the concrete/perceptual/abstract input primitives are the target-modality inputs that P86 switches between.

**14. Incompatible Primitives:**  
No hard incompatibilities.

**15. Composition Constraints:**  
The switch must be purposeful — switching modality as a random variation is not P86. The `switch_rationale` must be specified.

**16. Subject Examples:**  
- **Mathematics:** "You're stuck on the symbolic definition. Let's switch: draw an arrow diagram for the same concept. Sometimes the visual makes the symbol click."  
- **Physics:** "You understand the formula but not the mechanism. Let's switch: describe in words — no equations — what physically happens when you double the mass and keep force the same."  
- **English:** "You understand the grammar rule but keep mis-identifying examples. Let's switch: instead of reading, I'll say a sentence aloud. Listen for the grammatical pattern in speech."

---

## CATEGORY G — ASSESSMENT

*Reveal the student's cognitive state for routing decisions. Assessment primitives produce signals used by the Protocol Selection Engine or Adaptation Engine to determine the next Teaching Action. GR-9: assessment primitives may not appear in the first Teaching Action of a session unless the session type is diagnostic. GR-2: P55 (WAIT TIME) must follow every probe.*

---

### P74 — CLASSIFICATION PROBE
**Type:** True Primitive &nbsp;|&nbsp; **Reuse Frequency:** High

**1. Purpose:**  
Present an unfamiliar instance for the student to classify — reveals whether the defining criterion has been internalised.

**2. Cognitive Objective:**  
Produce a binary assessment signal (criterion internalised vs. not) that routes the session to continuation or remediation.

**3. When to Use:**  
- After P18 (CLASSIFICATION) practice has occurred — the probe is a fresh instance under assessment conditions  
- In P91 (MASTERY VERIFICATION) as the fourth probe in sequence  
- In P90 (FORMATIVE ASSESSMENT WITH FEEDBACK) as part of the probe selection

**4. When NOT to Use:**  
- GR-9: not in the first Teaching Action unless session type is diagnostic  
- When the student has not been taught the classification criterion

**5. Student States Supported:**  
S0–S9 (universal — the probe works for any student who has received the concept instruction)

**6. CPA Stage Compatibility:**  
C, P, A

**7. Inputs Required:**  
- `probe_instance_slot`: an unfamiliar instance requiring classification  
- `criterion_slot`: the criterion being tested (known to the assessment engine, not stated to the student)  
- `classification_question`: "Is this [concept]? Give your reason."

**8. Expected Student Response:**  
Student classifies the instance AND provides a criterion-based justification.

**9. Success Signal:**  
Correct classification with correct criterion-based justification.

**10. Failure Signal:**  
Incorrect classification; OR correct classification with surface-feature justification (criterion not internalised).

**11. Recovery:**  
Route to P52 (TARGETED REDIRECT) if the error is in application; route to Schema Repair chain if the error reveals a misconception.

**12. Typical Misconceptions Addressed:**  
None directly — reveals misconceptions for subsequent repair.

**13. Compatible Primitives:**  
P55 (WAIT TIME) must follow (GR-2); P50 (DISCONFIRMATION) for incorrect responses; P91 uses P74 as its fourth probe.

**14. Incompatible Primitives:**  
GR-9: not in the first Teaching Action.

**15. Composition Constraints:**  
GR-2 (P55 follows). The probe instance must be genuinely unfamiliar — a previously seen instance does not test internalisation.

**16. Subject Examples:**  
- **Mathematics:** "Is this a function: the rule that assigns to each integer its absolute value? Justify your answer using the definition."  
- **Physics:** "This object has three forces acting on it. Is it accelerating? Give your reason."  
- **English:** "Is this sentence in passive voice? 'The committee approved the proposal.' Justify."

---

### P75 — BOUNDARY PROBE
**Type:** True Primitive &nbsp;|&nbsp; **Reuse Frequency:** Medium

**1. Purpose:**  
Present an edge case — an instance that is technically within the concept but barely — to reveal schema depth.

**2. Cognitive Objective:**  
Test whether the student's schema includes the concept's boundary conditions, not just its prototypical instances.

**3. When to Use:**  
- After P74 (CLASSIFICATION PROBE) passes — basic classification confirmed; now test boundaries  
- In P91 (MASTERY VERIFICATION) as the third probe in sequence

**4. When NOT to Use:**  
- Before P74 passes — boundary probes are more challenging than classification probes; sequence them correctly  
- GR-9 applies

**5. Student States Supported:**  
S1, S3, S5 (primary — students with a basic schema who are being extended toward expert understanding)

**6. CPA Stage Compatibility:**  
P, A

**7. Inputs Required:**  
- `boundary_instance_slot`: a technically valid instance that is at the extreme edge of the concept  
- `boundary_question`: "Is [boundary instance] [concept]? This is harder than the previous questions — take your time."

**8. Expected Student Response:**  
Student correctly classifies the edge case AND articulates WHY it falls within the boundary.

**9. Success Signal:**  
Correct classification with correct boundary reasoning.

**10. Failure Signal:**  
Incorrect classification of the boundary case; OR correct classification but inability to articulate the boundary reasoning.

**11. Recovery:**  
Use P17 (CONTRAST) with the boundary case and a near-boundary non-example; use P36 (PROBING QUESTION) to deepen the reasoning.

**12. Typical Misconceptions Addressed:**  
Boundary misconceptions (student's schema excludes valid edge cases or includes near-miss non-examples).

**13. Compatible Primitives:**  
P74 (CLASSIFICATION PROBE) before; P55 (WAIT TIME) must follow (GR-2); P91 uses P75 as its third probe.

**14. Incompatible Primitives:**  
GR-9 applies.

**15. Composition Constraints:**  
GR-2 (P55 follows). Boundary cases must be technically valid — "almost" valid instances are non-examples, not boundary probes.

**16. Subject Examples:**  
- **Mathematics:** "Is this a function: a rule that maps every real number to the same value, π? It only has one output for every input — but does it satisfy the criterion?"  
- **Physics:** "An object has two equal and opposite forces acting on it. The net force is zero. Is Newton's Second Law applicable? What does it tell you?"  
- **English:** "'The door remained closed.' Is this passive voice? Why or why not?"

---

### P76 — TRANSFER PROBE
**Type:** True Primitive &nbsp;|&nbsp; **Reuse Frequency:** Medium

**1. Purpose:**  
Present the concept in a domain the student has not yet seen it applied in — tests cross-domain transfer as the highest mastery indicator.

**2. Cognitive Objective:**  
Test whether the student's schema is abstract enough to apply in new domains — cross-domain transfer is evidence of deep, generalisable understanding.

**3. When to Use:**  
- After P74 and P75 pass — basic classification and boundary conditions confirmed  
- In P91 (MASTERY VERIFICATION) as the second probe in sequence

**4. When NOT to Use:**  
- Before P74 and P75 — transfer is the highest mastery test, not the first  
- GR-9 applies

**5. Student States Supported:**  
S3, S5 (primary — transfer requires a generalisable schema); S1 (challenge level)

**6. CPA Stage Compatibility:**  
P, A (transfer operates at the structural level)

**7. Inputs Required:**  
- `transfer_domain_slot`: a domain the student has not yet applied the concept in  
- `transfer_question`: "How does [concept] apply in [transfer domain]? What would [concept] mean there?"

**8. Expected Student Response:**  
Student identifies a structurally valid application of the concept in the transfer domain.

**9. Success Signal:**  
Student's transfer application is structurally correct and the student can explain why the concept applies there.

**10. Failure Signal:**  
Student cannot identify any transfer application; or identifies a superficially similar but structurally different application.

**11. Recovery:**  
Provide the transfer domain; constrain the question ("in programming, functions take inputs and return outputs — what property of mathematical functions does that parallel?"); route to P39 (TRANSFER PROMPT) for teaching-mode treatment of transfer.

**12. Typical Misconceptions Addressed:**  
Context-boundedness (concept exists as a domain-specific rule rather than a domain-independent schema).

**13. Compatible Primitives:**  
P75 (BOUNDARY PROBE) before; P55 (WAIT TIME) must follow (GR-2); P91 uses P76 as its second probe.

**14. Incompatible Primitives:**  
GR-9 applies.

**15. Composition Constraints:**  
GR-2 (P55 follows). The transfer domain must be genuinely new — previously-discussed applications are not transfer probes.

**16. Subject Examples:**  
- **Mathematics:** "Functions appear in programming. In Python, a function takes inputs and returns a value. What property of mathematical functions does the Python function capture? What property does it NOT necessarily capture?"  
- **Physics:** "Newton's Second Law governs your car's braking. A car has mass 1,500 kg. When you apply the brakes, what happens to the net force and the acceleration? Apply the law to this new context."  
- **English:** "Passive voice appears in scientific writing. Why might a scientist choose passive voice in a methods section? What purpose does it serve there that it might not serve in a narrative?"

---

### P77 — GENERATION PROBE
**Type:** True Primitive &nbsp;|&nbsp; **Reuse Frequency:** Medium

**1. Purpose:**  
Direct the student to generate an original instance of the concept without a template.

**2. Cognitive Objective:**  
Test whether the concept is generative (the student can produce new instances) — retrieval and explanation are insufficient; generation is the evidence.

**3. When to Use:**  
- In P91 (MASTERY VERIFICATION) as the first probe in sequence  
- As the highest-demand assessment after transfer probe passes

**4. When NOT to Use:**  
- Before classification and boundary probes — generation is the hardest probe; sequence last in P91  
- GR-9 applies

**5. Student States Supported:**  
S1, S3, S5 (primary)

**6. CPA Stage Compatibility:**  
C, P, A — student can generate at any level

**7. Inputs Required:**  
- `generation_constraints`: constraints that make reproduction of shown examples impossible  
- `generation_question`: "Generate your own [concept] — one I haven't shown you. It must satisfy the criterion."

**8. Expected Student Response:**  
Student generates a valid, original instance that satisfies the concept's defining criterion.

**9. Success Signal:**  
Generated instance is valid AND novel (not a reproduction of a seen example).

**10. Failure Signal:**  
Student reproduces a seen example; student generates an invalid instance; student cannot generate anything.

**11. Recovery:**  
Route to P42 (EXAMPLE GENERATION) as a teaching-mode version of this probe (same cognitive demand, in teaching context); use generation constraints to prevent reproduction.

**12. Typical Misconceptions Addressed:**  
None directly — the highest-level diagnostic probe.

**13. Compatible Primitives:**  
P55 (WAIT TIME) must follow (GR-2); P91 uses P77 as its first probe.

**14. Incompatible Primitives:**  
GR-9 applies.

**15. Composition Constraints:**  
GR-2 (P55 follows). Must be the first probe in P91 MASTERY VERIFICATION expansion (P77→P76→P75→P74→P78). Generation constraints are mandatory.

**16. Subject Examples:**  
- **Mathematics:** "Generate a function that involves neither numbers nor letters — use any other domain. Verify that it satisfies the criterion. Don't use anything I've shown you."  
- **Physics:** "Create a new scenario — not one we've discussed — where Newton's Second Law applies. State all forces, the net force, the mass, and the resulting acceleration."  
- **English:** "Write two sentences: one passive, one active. They should be about the same event. Don't use any of my examples."

---

### P78 — EXPLANATION PROBE
**Type:** True Primitive &nbsp;|&nbsp; **Reuse Frequency:** Medium

**1. Purpose:**  
Ask the student to explain the concept as if to someone who has never heard it.

**2. Cognitive Objective:**  
Reveal the structure of the student's schema including gaps, conflations, and the relative emphasis the student places on different features.

**3. When to Use:**  
- In P91 (MASTERY VERIFICATION) as the fifth and final probe  
- After generation probe — explanation follows demonstration  
- As a session-closing probe in lieu of a full P91

**4. When NOT to Use:**  
- As the only assessment (explanation reveals schema structure but not operational competence)  
- GR-9 applies

**5. Student States Supported:**  
S0–S9 (universal — explanation reveals schema at whatever level the student has built it)

**6. CPA Stage Compatibility:**  
C, P, A

**7. Inputs Required:**  
- `audience_framing`: "Explain [concept] to someone who has never heard of it. Assume they know [prerequisite] but nothing else."  
- `explanation_question`: "Go ahead — explain it to me as if I'm encountering it for the first time."

**8. Expected Student Response:**  
Student produces a coherent explanation that covers the defining criterion, includes at least one example, and addresses common misconceptions.

**9. Success Signal:**  
Explanation is correct; includes the defining criterion; would genuinely help a novice understand the concept.

**10. Failure Signal:**  
Explanation omits the defining criterion; explanation is technically correct but incomprehensible to a novice; student explains surface features rather than structure.

**11. Recovery:**  
Use P44 (DEFINITION CONSTRUCTION) to re-establish the criterion; use P38 (REFORMULATION PROMPT) to improve the explanation's accessibility.

**12. Typical Misconceptions Addressed:**  
None directly — reveals gaps for subsequent repair.

**13. Compatible Primitives:**  
P77 (GENERATION PROBE) before in P91 sequence; P55 (WAIT TIME) must follow (GR-2); P91 uses P78 as its fifth and final probe.

**14. Incompatible Primitives:**  
GR-9 applies.

**15. Composition Constraints:**  
GR-2 (P55 follows). Must be the last probe in P91 MASTERY VERIFICATION expansion (P77→P76→P75→P74→P78). Audience framing is mandatory — "explain it to me" without audience context is not P78.

**16. Subject Examples:**  
- **Mathematics:** "Explain functions to someone who has never heard the term. They know what numbers are, they know about sets — but they've never been taught what makes a function."  
- **Physics:** "Explain Newton's Second Law to someone who understands what forces and motion are but has never studied physics formally."  
- **English:** "Explain passive voice to someone who is fluent in English but has never been taught grammar terminology."

---

### P79 — PREDICTION PROBE
**Type:** True Primitive &nbsp;|&nbsp; **Reuse Frequency:** Medium

**1. Purpose:**  
Ask the student what will happen in a scenario they have not yet seen — tests whether the student has a generative model.

**2. Cognitive Objective:**  
Distinguish a generative model (the student can predict before seeing) from a receptive model (the student can understand after seeing but not predict before).

**3. When to Use:**  
- When prediction about a new scenario is required to confirm operational understanding  
- As an alternative to P77 (GENERATION PROBE) for concepts where prediction is more natural than generation

**4. When NOT to Use:**  
- When the student would need knowledge not yet taught to make the prediction  
- GR-9 applies

**5. Student States Supported:**  
S1, S3, S5 (primary)

**6. CPA Stage Compatibility:**  
C, P (prediction is most revealing at concrete or perceptual levels)

**7. Inputs Required:**  
- `prediction_scenario_slot`: a new scenario the student has not seen  
- `prediction_question`: "Before I show you — what do you predict will happen when [scenario]?"

**8. Expected Student Response:**  
Student predicts correctly AND provides a reasoning chain.

**9. Success Signal:**  
Correct prediction with correct reasoning chain (not lucky guess).

**10. Failure Signal:**  
Incorrect prediction; OR correct prediction with incorrect reasoning ("it works because it looks similar to the last example").

**11. Recovery:**  
If prediction incorrect: P14+P15 sequence in teaching mode on the scenario; if correct prediction with wrong reasoning: P36 (PROBING QUESTION) to surface the actual reasoning.

**12. Typical Misconceptions Addressed:**  
None directly — generative-model test.

**13. Compatible Primitives:**  
P55 (WAIT TIME) must follow (GR-2); P15 (OBSERVATION) follows to reveal actual outcome.

**14. Incompatible Primitives:**  
GR-9 applies.

**15. Composition Constraints:**  
GR-2 (P55 follows). Prediction must be made before the outcome is revealed — never show the outcome and then ask for a "prediction."

**16. Subject Examples:**  
- **Mathematics:** "Before I tell you: is f(g(x)) always defined for all x where both f and g are defined? Predict — yes or no — and give your reason."  
- **Physics:** "Before the demonstration: an object is moving at constant velocity. If I apply a net force in the same direction as its motion, what will happen to its speed over the next second? Predict."  
- **English:** "Before you read the second half of the passage: given the argument structure so far, predict what the writer's conclusion will be."

---

### P80 — DUAL-TASK PROBE
**Type:** True Primitive &nbsp;|&nbsp; **Reuse Frequency:** Medium

**1. Purpose:**  
Present the concept alongside a plausible-but-wrong alternative and ask the student to distinguish them, testing both positive and negative classification simultaneously.

**2. Cognitive Objective:**  
Replicate real-world disambiguation conditions where the concept must be identified among confusable alternatives — the highest ecological validity of any assessment probe.

**3. When to Use:**  
- After P74 passes — basic classification confirmed; now add the confusable alternative  
- When the concept has a specific, commonly-confused near-miss that is the primary discrimination challenge

**4. When NOT to Use:**  
- Before P74 (CLASSIFICATION PROBE) — the dual task requires prior classification competence  
- GR-9 applies

**5. Student States Supported:**  
S1, S3, S5 (primary — requires concept AND near-miss concepts both to be established)

**6. CPA Stage Compatibility:**  
C, P, A

**7. Inputs Required:**  
- `positive_instance_slot`: a valid instance of the concept  
- `negative_instance_slot`: a confusable near-miss non-example  
- `dual_question`: "Here are two things: [A] and [B]. Which is [concept] and which is not? What makes one work and the other fail?"

**8. Expected Student Response:**  
Student correctly classifies both instances AND states the specific feature that distinguishes them.

**9. Success Signal:**  
Both classifications correct with a criterion-based distinguishing feature stated.

**10. Failure Signal:**  
One or both classifications incorrect; OR both correct but distinguishing reasoning is based on surface features.

**11. Recovery:**  
Return to P17 (CONTRAST) with the same pair in teaching mode; use P33 (DISCRIMINATION TRAINING) on the confusable pair.

**12. Typical Misconceptions Addressed:**  
Adjacent-concept conflation — the most common structural error across all domains.

**13. Compatible Primitives:**  
P74 (CLASSIFICATION PROBE) before; P55 (WAIT TIME) must follow (GR-2); P17 (CONTRAST) in teaching mode if probe fails.

**14. Incompatible Primitives:**  
GR-9 applies.

**15. Composition Constraints:**  
GR-2 (P55 follows). The negative instance must be a confusable near-miss, not an obviously unrelated non-example.

**16. Subject Examples:**  
- **Mathematics:** "Here is a function: [bijective arrow diagram]. Here is not a function: [diagram where one input maps to two outputs]. What exactly makes the second fail? Name the specific feature."  
- **Physics:** "Here are two scenarios. In Scenario A, a car is braking — slowing from 60 to 0 km/h. In Scenario B, a car is coasting at constant 60 km/h. Which one involves a net force? What makes Scenario B have no net force?"  
- **English:** "'The glass was broken' — passive. 'The glass is broken' — which one is passive and which is stative? What is the grammatical distinction?"

---

## CATEGORY H — RETENTION

*Move learning from working memory to long-term storage. Retention primitives operate on concepts that have been taught and need to be consolidated for retrieval beyond the session. Two Named Compounds (P57, P89) are in this category.*

---

### P56 — SPACED RETRIEVAL
**Type:** True Primitive &nbsp;|&nbsp; **Reuse Frequency:** Medium

**1. Purpose:**  
Prompt recall of a concept after a time gap from the original learning.

**2. Cognitive Objective:**  
Exploit the spacing effect: recall after a delay is more powerful than recall immediately after learning because the retrieval after forgetting strengthens the memory trace more than uninterrupted retention.

**3. When to Use:**  
- In a follow-up session after a concept has been taught  
- When a concept is at risk of being forgotten before it is used again  
- As the core mechanism of Named Compound P89 (SPACED REPETITION)

**4. When NOT to Use:**  
- Immediately after teaching (no space has elapsed — this is regular retrieval, not spaced retrieval)  
- When the gap is so long that the concept has been completely forgotten without any retrieval cue having been provided

**5. Student States Supported:**  
S0–S9 (universal — retention is universal)

**6. CPA Stage Compatibility:**  
C, P, A

**7. Inputs Required:**  
- `elapsed_time_slot`: time since original learning (drives interval scheduling)  
- `retrieval_cue`: a minimal prompt that initiates recall without providing the answer  
- `retrieval_question`: "You learned about [concept] [time] ago. Without looking it up — what do you remember?"

**8. Expected Student Response:**  
Student recalls key features of the concept; accuracy may be reduced compared to original session.

**9. Success Signal:**  
Student recalls the defining criterion and at least one example; performance is above chance.

**10. Failure Signal:**  
Student cannot recall anything; or recalls only surface features without the defining criterion.

**11. Recovery:**  
Provide the retrieval cue and wait; if still inaccessible, brief re-teach (shortened Teaching Protocol) followed by scheduling the next spaced retrieval at a shorter interval.

**12. Typical Misconceptions Addressed:**  
None directly — but spaced retrieval surfaces which elements of the schema are decaying fastest.

**13. Compatible Primitives:**  
P62 (SPACED REVIEW SCHEDULING) schedules the next P56 event; P88 (RETRIEVAL PRACTICE) is the same principle under test conditions.

**14. Incompatible Primitives:**  
No hard incompatibilities.

**15. Composition Constraints:**  
`elapsed_time_slot` must be non-zero. P56 must be scheduled by P62 (SPACED REVIEW SCHEDULING) in the prior session.

**16. Subject Examples:**  
- **Mathematics:** "We covered functions two weeks ago. Without any materials — what's the definition of a function? What makes something a function?"  
- **Physics:** "We discussed Newton's Second Law in the last session. State the law. Give me one example of it in action that we haven't discussed."  
- **English:** "You identified passive voice last session. Remind me — what is passive voice? How do you identify it?"

---

### P57 — INTERLEAVED PRACTICE
**Type:** Named Compound &nbsp;|&nbsp; **Expansion:** `P88 + P83`

**1. Purpose:**  
Combine retrieval practice on the current concept with retrieval practice on related prior concepts in a mixed set.

**2. Cognitive Objective:**  
Build discrimination ability and prevent the illusion of mastery through blocked practice — the student who can do a concept in a block of same-type problems has not demonstrated they can identify that concept type when it appears among other types.

**3. When to Use:**  
- After the current concept has been established  
- After at least one adjacent concept has been taught (interleaving requires something to interleave with)

**4. When NOT to Use:**  
- Before the student can solve problems of both types independently  
- When adjacent concepts have not yet been taught

**5. Student States Supported:**  
S1, S3, S5 (primary)

**6. CPA Stage Compatibility:**  
C, P, A

**7. Inputs Required:**  
All inputs from P88 (RETRIEVAL PRACTICE) applied to the mixed set; `interleaved_concept_slot` from P83.

**8. Expected Student Response:**  
Student correctly identifies which concept applies to each problem and solves accordingly.

**9. Success Signal:**  
Discrimination accuracy in the interleaved set matches or approaches accuracy in blocked practice.

**10. Failure Signal:**  
Significant accuracy drop in interleaved vs. blocked practice — discrimination is unreliable.

**11. Recovery:**  
Return to blocked practice for the failing concept; use P33 (DISCRIMINATION TRAINING) to sharpen the boundary; reintroduce interleaving.

**12. Typical Misconceptions Addressed:**  
Context-dependent activation (student recognises concept by teaching context, not by criterion).

**13. Compatible Primitives:**  
P88 (RETRIEVAL PRACTICE) and P83 (INTERLEAVING CONTROL) are the expansion; P89 (SPACED REPETITION) can combine with P57 for maximum retention effect.

**14. Incompatible Primitives:**  
No hard incompatibilities.

**15. Composition Constraints:**  
GR-10 (expand before validation): validate as P88+P83. Both expansion primitives must have their inputs specified independently.

**16. Subject Examples:**  
- **Mathematics:** "Mixed problem set: classify functions, identify domains, and evaluate compositions — in random order. You don't know which type is coming."  
- **Physics:** "Mixed problems: Newton's First Law vs. Second vs. Third. Identify which applies before solving."  
- **English:** "Mixed identification: passive, active, and stative. Classify each sentence type, then justify."

---

### P58 — ELABORATIVE INTERROGATION
**Type:** True Primitive &nbsp;|&nbsp; **Reuse Frequency:** Medium

**1. Purpose:**  
Ask "Why is this true?" questions after a correct response to force connection-making between the new knowledge and existing schemas.

**2. Cognitive Objective:**  
Deepen encoding by requiring the student to connect the new concept to prior knowledge — the connections multiply retrieval pathways and increase the concept's accessibility.

**3. When to Use:**  
- After any correct response to a factual or procedural question  
- As the primary method for converting correct-but-shallow knowledge into deeply encoded understanding

**4. When NOT to Use:**  
- After an incorrect response — use P51 (ERROR DIAGNOSIS FACILITATION) instead  
- When the student cannot provide a "why" because it requires knowledge not yet taught

**5. Student States Supported:**  
S1, S3, S5 (primary); S0 (with scaffolding)

**6. CPA Stage Compatibility:**  
P, A (elaborative interrogation operates at the structural and abstract level)

**7. Inputs Required:**  
- `correct_statement`: the student's correct response  
- `why_question`: "Why is that true? What does that connect to that you already know?"

**8. Expected Student Response:**  
Student produces a "why" explanation that connects the fact to prior knowledge.

**9. Success Signal:**  
Student's explanation makes a genuine connection to a prior concept — the new knowledge is embedded in the existing knowledge network.

**10. Failure Signal:**  
Student cannot explain why ("it just is"); student restates the fact without connecting it to anything.

**11. Recovery:**  
Provide a partial connection: "Think about [prior concept] — how does this relate?" Guide toward the connection without providing it.

**12. Typical Misconceptions Addressed:**  
None directly — retention primitive. But elaborative interrogation reveals which parts of the schema have no connections (and are therefore most vulnerable to forgetting).

**13. Compatible Primitives:**  
P53 (ELABORATION REQUEST) is a lighter version; P58 is more specifically connection-focused.

**14. Incompatible Primitives:**  
No hard incompatibilities.

**15. Composition Constraints:**  
GR-2 (P55 follows). The "why" question must target the connection to prior knowledge — a "why" about the current concept alone is not P58.

**16. Subject Examples:**  
- **Mathematics:** "You correctly said that a bijective function has a unique inverse. Why is that true? What property of functions makes the inverse possible?"  
- **Physics:** "You correctly said the net force is zero when an object moves at constant velocity. Why does zero net force imply constant velocity? What law are you drawing on?"  
- **English:** "You correctly identified the passive voice. Why does passive voice exist at all? What problem does it solve that active voice can't?"

---

### P59 — SELF-EXPLANATION
**Type:** True Primitive &nbsp;|&nbsp; **Reuse Frequency:** Medium

**1. Purpose:**  
Direct the student to narrate their own reasoning step by step, out loud or in writing.

**2. Cognitive Objective:**  
Force error-checking that silent processing does not — the act of narrating reasoning exposes inconsistencies that remain hidden when the student just thinks.

**3. When to Use:**  
- During or after problem solving, when the student should articulate their process  
- For S5 students who perform correctly but have low metacognitive access to their own process  
- As preparation for P46 (PROCEDURE CONSTRUCTION)

**4. When NOT to Use:**  
- Before the student has any reasoning to explain (S0 on genuinely new content — there is nothing to explain yet)

**5. Student States Supported:**  
S1, S3, S5 (primary); S8 (adult learners benefit from explicit self-explanation)

**6. CPA Stage Compatibility:**  
C, P, A

**7. Inputs Required:**  
- `process_to_explain`: the reasoning process to be narrated  
- `self_explanation_prompt`: "Walk me through exactly what you were thinking when you solved that."

**8. Expected Student Response:**  
Student provides a step-by-step narration of their reasoning, including the decisions at each step.

**9. Success Signal:**  
Narration is accurate and reveals genuine reasoning structure; student can identify which step was the critical decision point.

**10. Failure Signal:**  
Student narrates only the final answer, not the process; or narrates steps without being able to say why each step was taken.

**11. Recovery:**  
Ask the student to slow-think: "Do it again, but say every thought out loud as you have it — even the thoughts that seem wrong or uncertain."

**12. Typical Misconceptions Addressed:**  
Unconscious misconception application (student applies an incorrect schema automatically without noticing).

**13. Compatible Primitives:**  
P40 (METACOGNITIVE PROMPT) before — prime self-monitoring; P58 (ELABORATIVE INTERROGATION) can follow — ask "why" about specific steps the student narrated.

**14. Incompatible Primitives:**  
No hard incompatibilities.

**15. Composition Constraints:**  
GR-2 (P55 after the self-explanation prompt). The narration must be process-level, not product-level — "I got 9" is not self-explanation.

**16. Subject Examples:**  
- **Mathematics:** "Walk me through every step you took to classify that function. Tell me what you looked at, what you thought, and why you made each decision."  
- **Physics:** "Narrate your reasoning as you draw the force diagram. Say what you're placing and why, in the order you place it."  
- **English:** "Talk me through how you identified the implied claim — what did you read first, what did you notice, what did you conclude?"

---

### P60 — VARIATION
**Type:** True Primitive &nbsp;|&nbsp; **Reuse Frequency:** Medium

**1. Purpose:**  
Present the same concept in 3–4 different representations in rapid succession.

**2. Cognitive Objective:**  
Multiply the concept's encoding pathways — each representation adds a node in the conceptual network, making the concept retrievable from more entry points.

**3. When to Use:**  
- After the concept has been established in at least one representation  
- When the concept has multiple valid representations that are each informative  
- As a session closing to anchor the concept in multiple forms

**4. When NOT to Use:**  
- With more than 4 representations in a single Teaching Action — more is diminishing returns and excessive load  
- When the representations are so different that transitioning between them produces confusion rather than enrichment

**5. Student States Supported:**  
S1, S3, S5 (primary); S0 (with scaffolding)

**6. CPA Stage Compatibility:**  
C, P, A (the variation is ACROSS levels — the power is in showing C, P, and A of the same concept)

**7. Inputs Required:**  
- `representation_set`: 3–4 representations of the same concept  
- `unification_statement`: explicit statement that all 4 represent the same concept ("All of these are the same function — look for what's the same across all four forms.")

**8. Expected Student Response:**  
Student can identify what is the same across all representations — the defining criterion appears in each, differently encoded.

**9. Success Signal:**  
Student can state the defining criterion in terms of each representation; can move between representations when asked.

**10. Failure Signal:**  
Student treats the representations as different concepts; or cannot identify any commonality.

**11. Recovery:**  
Use P16 (COMPARISON) with the representation pair that shows the most obvious commonality; add representations one at a time.

**12. Typical Misconceptions Addressed:**  
Representation-bound schema (student believes the concept IS the formula, or IS the diagram — not understanding that these are representations of the same underlying structure).

**13. Compatible Primitives:**  
P25 (ABSTRACTION LADDER) traversal is the movement between representations; P16 (COMPARISON) within the variation set.

**14. Incompatible Primitives:**  
No hard incompatibilities.

**15. Composition Constraints:**  
3–4 representations maximum. The `unification_statement` is mandatory — without it, variation produces fragmentation, not consolidation.

**16. Subject Examples:**  
- **Mathematics:** "Here is the function f(x) = 2x as: (1) a vending machine rule, (2) an arrow diagram, (3) a table of values, (4) a graph. All four are the same function. In each one, find the 'exactly one output per input' property."  
- **Physics:** "Newton's Second Law as: (1) the equation F = ma, (2) a free-body diagram, (3) a real situation description, (4) a graph of force vs. acceleration. All four represent the same relationship."  
- **English:** "Passive voice as: (1) a grammatical formula, (2) a tree diagram, (3) a colour-coded sentence, (4) a spoken example. All four are passive voice. Find the common structure."

---

### P61 — SUMMARY CONSTRUCTION
**Type:** True Primitive &nbsp;|&nbsp; **Reuse Frequency:** Medium

**1. Purpose:**  
Direct the student to write a summary of what was learned in the session.

**2. Cognitive Objective:**  
Force prioritisation — the act of deciding what to include in a summary reveals what is and is not understood; the summary is not repetition but active selection.

**3. When to Use:**  
- At the end of any significant Teaching Action sequence  
- As a session-closing retention activity  
- Before the next session to activate prior learning (doubles as P56 SPACED RETRIEVAL at session start)

**4. When NOT to Use:**  
- When the session covered only one small concept (summary of a single item is just restatement)  
- Mid-session in a way that interrupts the flow

**5. Student States Supported:**  
S1, S3, S5 (primary); S8 (adult learners benefit from explicit session summaries)

**6. CPA Stage Compatibility:**  
A (summary is abstract-level synthesis)

**7. Inputs Required:**  
- `session_scope`: what the student is summarising  
- `summary_prompt`: "Write a summary of what we covered today — what can you now do that you couldn't do before?"

**8. Expected Student Response:**  
A summary that includes the defining criterion, at least one example, and a statement of what is now possible.

**9. Success Signal:**  
Summary is accurate; covers the defining criterion; identifies a new capability.

**10. Failure Signal:**  
Summary is pure repetition of teaching language; student cannot state a new capability.

**11. Recovery:**  
Use P68 (MASTERY SELF-DECLARATION) as a prerequisite — the student must state a new capability before summarising.

**12. Typical Misconceptions Addressed:**  
None directly — but summary construction reveals which misconceptions remain unresolved (they appear in the summary).

**13. Compatible Primitives:**  
P68 (MASTERY SELF-DECLARATION) before; P62 (SPACED REVIEW SCHEDULING) follows — schedule when the summary will be revisited.

**14. Incompatible Primitives:**  
No hard incompatibilities.

**15. Composition Constraints:**  
The summary must contain a new-capability statement — "I can now [X]" — to be considered complete.

**16. Subject Examples:**  
- **Mathematics:** "Write a summary of today's session on functions. Three things: (1) the definition in your own words, (2) one example that makes it concrete, (3) one thing you can now do that you couldn't do this morning."  
- **Physics:** "Summarise Newton's Second Law as we've discussed it: the concept, the formula, and one application you could now set up independently."  
- **English:** "Write a summary of passive voice. What is it, how do you identify it, and when would you use it in your own writing?"

---

### P62 — SPACED REVIEW SCHEDULING
**Type:** True Primitive &nbsp;|&nbsp; **Reuse Frequency:** Medium

**1. Purpose:**  
Set a specific future time for re-encountering the concept.

**2. Cognitive Objective:**  
Make the spacing schedule explicit and student-owned: scheduling a future retrieval event is itself a metacognitive act that increases the likelihood of the retrieval occurring.

**3. When to Use:**  
- At the end of any session where a concept has been taught  
- In conjunction with P62 (this primitive) and P56 (SPACED RETRIEVAL) to create a schedule

**4. When NOT to Use:**  
- When the concept is already part of an active spaced repetition schedule  
- For concepts mastered so firmly that no decay is expected (rare)

**5. Student States Supported:**  
S0–S9 (universal — all students benefit from scheduled retrieval)

**6. CPA Stage Compatibility:**  
A (scheduling is abstract; the scheduled event will be at the appropriate level)

**7. Inputs Required:**  
- `review_schedule`: the specific time gap before first review (based on Evidence Engine data or default schedule: 24 hours → 1 week → 1 month)  
- `scheduling_statement`: "We'll revisit this in [time gap]. When we do, you'll be asked to explain it from memory."

**8. Expected Student Response:**  
Student acknowledges the schedule; notes it if using a physical system.

**9. Success Signal:**  
The scheduled retrieval event occurs and P56 fires at the scheduled time.

**10. Failure Signal:**  
No scheduled event occurs; concept decays without retrieval.

**11. Recovery:**  
If the concept has decayed significantly at retrieval: provide a shorter interval for the next scheduled review.

**12. Typical Misconceptions Addressed:**  
None directly — retention scheduling primitive.

**13. Compatible Primitives:**  
P61 (SUMMARY CONSTRUCTION) before; P56 (SPACED RETRIEVAL) is the execution of the schedule.

**14. Incompatible Primitives:**  
No hard incompatibilities.

**15. Composition Constraints:**  
The review schedule must be specific (a time, not "sometime") and communicated to the student explicitly.

**16. Subject Examples:**  
- **Mathematics:** "In 48 hours, you'll be asked to explain functions from memory. We're scheduling that now. When that session starts, I won't give you any reminders — you'll retrieve from scratch."  
- **Physics:** "Next session, in one week, we'll start with Newton's Second Law cold — before any prompting. That's scheduled."  
- **English:** "In three days, you'll identify passive voice in a new passage — first thing, no review first. That's the test."

---

### P87 — TRANSFER BRIDGING
**Type:** True Primitive &nbsp;|&nbsp; **Reuse Frequency:** Medium

**1. Purpose:**  
Explicitly construct the connection between the current concept and a future concept where it will be applied.

**2. Cognitive Objective:**  
Lay a transfer path now so the student recognises the connection when they encounter the future concept — prospective encoding that activates when the downstream concept appears.

**3. When to Use:**  
- At the end of a concept session when a downstream concept is known  
- When introducing a prerequisite concept to a student who will later study the dependent concept

**4. When NOT to Use:**  
- When the downstream concept is unknown or highly uncertain  
- When the student will not encounter the downstream concept for a very long time (the bridge must be short enough to cross)

**5. Student States Supported:**  
S1, S3, S5 (primary); S8 (adult learners with long-term goals benefit from explicit transfer bridges)

**6. CPA Stage Compatibility:**  
A (transfer bridging is abstract — the downstream concept is described in its application)

**7. Inputs Required:**  
- `current_concept_slot`: the concept just taught  
- `downstream_concept_slot`: the future concept where the current one will be applied  
- `bridge_statement`: "What we're doing now — [current concept] — is the foundation of [downstream concept], which you'll encounter when [context]. You'll see exactly why [current concept] matters at that point."

**8. Expected Student Response:**  
Student acknowledges the downstream connection; may ask a follow-up about the downstream concept.

**9. Success Signal:**  
When the downstream concept is encountered in a future session, the student spontaneously references the current concept.

**10. Failure Signal:**  
Student does not recall the bridge at the downstream encounter (bridge was too abstract or too distant).

**11. Recovery:**  
At the downstream encounter, reference the bridge explicitly: "Remember when we said [current concept] would matter for [downstream concept]? This is that moment."

**12. Typical Misconceptions Addressed:**  
None directly — prospective transfer encoding.

**13. Compatible Primitives:**  
P61 (SUMMARY CONSTRUCTION) before; P62 (SPACED REVIEW SCHEDULING) after — schedule the bridge's downstream encounter.

**14. Incompatible Primitives:**  
No hard incompatibilities.

**15. Composition Constraints:**  
The bridge statement must be specific — naming both the current and downstream concepts explicitly. "This will be useful later" is not P87.

**16. Subject Examples:**  
- **Mathematics:** "Functions are the building block of derivatives. When you reach calculus, the derivative is defined as a limit of a function's difference quotient — you'll need to know functions inside out. We've just built that foundation."  
- **Physics:** "Newton's Second Law governs every dynamics problem you'll encounter. When we get to rotational motion, the same law appears as τ = Iα — force becomes torque, mass becomes moment of inertia. The structure is identical."  
- **English:** "Passive voice will appear in every academic text you read. When we study argumentative writing, you'll need to identify when a writer is using passive to avoid naming an agent — this is that skill."

---

### P88 — RETRIEVAL PRACTICE
**Type:** True Primitive &nbsp;|&nbsp; **Reuse Frequency:** High

**1. Purpose:**  
Recall a previously learned concept from memory under test conditions — not re-study.

**2. Cognitive Objective:**  
Exploit the testing effect: active retrieval from memory is more powerful than passive re-reading because the retrieval attempt strengthens the memory trace whether the retrieval succeeds or not.

**3. When to Use:**  
- As the primary study/practice mechanism (preferred over re-reading)  
- At session start to prime schemas from prior sessions  
- In Named Compound P57 (INTERLEAVED PRACTICE) as the retrieval component

**4. When NOT to Use:**  
- Before the concept has been taught (cannot retrieve what was never stored)  
- As the first activity in the very first session on a concept

**5. Student States Supported:**  
S0–S9 (universal for concepts previously taught)

**6. CPA Stage Compatibility:**  
C, P, A

**7. Inputs Required:**  
- `retrieval_cue`: a minimal prompt that initiates retrieval without giving the answer  
- `retrieval_test`: the specific recall task (definition, classification, explanation, application)

**8. Expected Student Response:**  
Student retrieves the concept from memory with some accuracy.

**9. Success Signal:**  
Retrieval is accurate and complete.

**10. Failure Signal:**  
Student cannot retrieve anything (complete forgetting — schedule re-teach with shorter interval); partial retrieval (retrieve main criterion but not details — provide corrective feedback and reschedule).

**11. Recovery:**  
For complete forgetting: re-teach with P10 (WORKED EXAMPLE PRESENTATION) before the next P88 event. For partial: provide the missing elements and immediately attempt retrieval again.

**12. Typical Misconceptions Addressed:**  
None directly — but retrieval failure reveals which elements are decaying fastest and is diagnostic for scheduling.

**13. Compatible Primitives:**  
P83 (INTERLEAVING CONTROL) in Named Compound P57; P56 (SPACED RETRIEVAL) is the same primitive with the spacing dimension added.

**14. Incompatible Primitives:**  
No hard incompatibilities.

**15. Composition Constraints:**  
The retrieval must be from memory — no materials, notes, or hints available during the retrieval attempt.

**16. Subject Examples:**  
- **Mathematics:** "Without any materials: state the definition of a function. Give one example. Classify this case: [new instance]."  
- **Physics:** "From memory: state Newton's Second Law. Give its equation. Apply it to: [new scenario not previously seen]."  
- **English:** "Without reference: what is passive voice? Give one example. Is this sentence passive: [new sentence]?"

---

### P89 — SPACED REPETITION
**Type:** Named Compound &nbsp;|&nbsp; **Expansion:** `P56 × [interval schedule]`

**1. Purpose:**  
Re-encounter a concept at systematically increasing intervals after initial learning.

**2. Cognitive Objective:**  
Maximise long-term retention through optimal spacing: earlier re-encounters produce weaker retention improvements than later re-encounters (the spacing effect), so the interval schedule is the intervention.

**3. When to Use:**  
- For any concept that needs long-term retention (most concepts)  
- As the primary long-term retention mechanism in the Evidence Engine's scheduling output

**4. When NOT to Use:**  
- For concepts that will only be used once (no value in spacing if no future application)  
- Without a specific interval schedule (P89 without an interval schedule is just P56)

**5. Student States Supported:**  
S0–S9 (universal)

**6. CPA Stage Compatibility:**  
C, P, A

**7. Inputs Required:**  
All inputs from P56 applied at each interval; `interval_schedule`: the specific sequence of gaps (default: 1 day → 7 days → 30 days → 90 days).

**8. Expected Student Response:**  
At each interval: retrieval with accuracy appropriate to the interval (accuracy may drop before each retrieval; the retrieval restores it).

**9. Success Signal:**  
Accuracy at each retrieval event improves relative to the previous one over the full schedule.

**10. Failure Signal:**  
Accuracy does not improve across retrievals; concept is not consolidating despite repetition.

**11. Recovery:**  
Reduce interval length; supplement with additional elaboration (P58 ELABORATIVE INTERROGATION) at each retrieval event to strengthen encoding.

**12. Typical Misconceptions Addressed:**  
None directly — the retention system for all concepts.

**13. Compatible Primitives:**  
P56 (SPACED RETRIEVAL) is the atomic unit; P62 (SPACED REVIEW SCHEDULING) manages the schedule; P57 (INTERLEAVED PRACTICE) combined with P89 for maximum discrimination + retention.

**14. Incompatible Primitives:**  
No hard incompatibilities.

**15. Composition Constraints:**  
GR-10 (expand before validation): validate as P56 applied at each interval point in the schedule. Interval schedule must be specified — default or Evidence Engine-adapted. Named Compound P89 is the temporal orchestration of P56, not a different primitive.

**16. Subject Examples:**  
- **Mathematics:** [Day 1] Teach function concept. [Day 2] Cold retrieval. [Day 9] Cold retrieval. [Day 39] Cold retrieval. [Day 129] Cold retrieval. Each retrieval: no materials, define + classify + generate.  
- **Physics:** Same spaced retrieval schedule for Newton's Second Law.  
- **English:** Same for passive voice identification.

---

## NAMED COMPOUNDS — CROSS-CATEGORY

*These two Named Compounds span multiple categories and are listed separately because they cannot be fully assigned to a single category.*

---

### P90 — FORMATIVE ASSESSMENT WITH FEEDBACK
**Type:** Named Compound &nbsp;|&nbsp; **Expansion:** `[P74–P80 selection] → P55 → [P49 | P50] → P51 → P35 → P55`  
**Effective Category:** Cross-category G (Assessment) + F (Regulation)

**1. Purpose:**  
Assess the student's current understanding and provide immediate, targeted feedback on the specific error — not generic feedback.

**2. Cognitive Objective:**  
Produce the highest single-intervention effect size (d ≈ 0.90+) by combining assessment signal with the targeted feedback that assessment enables — the assessment without feedback is measurement; the feedback without assessment is generic.

**3. When to Use:**  
- At natural checkpoint moments in a session  
- After a concept has been introduced and needs verification before advancing  
- In lieu of P91 (MASTERY VERIFICATION) when the session is not yet at mastery-gate level

**4. When NOT to Use:**  
- As a substitute for P91 when the session is at the gate — P91 is the mastery gate; P90 is an interim checkpoint  
- When no targeted feedback can be provided (feedback must be specific to be effective)

**5. Student States Supported:**  
S0–S9 (universal)

**6. CPA Stage Compatibility:**  
C, P, A

**7. Inputs Required:**  
- All inputs for the selected G-category probe  
- `feedback_specificity`: the specific error type that the feedback will address  
- `follow_up_question_slot`: the P35 (OPEN QUESTION) that follows the feedback

**8. Expected Student Response:**  
After the full P90 sequence: student can articulate what was wrong and why; performance on the next probe improves.

**9. Success Signal:**  
Student's P35 response after feedback reveals genuine schema update; performance on the next assessment probe is improved.

**10. Failure Signal:**  
Student receives feedback but cannot articulate what changed; the next probe shows no improvement.

**11. Recovery:**  
If feedback is not taken up: route to Schema Repair chain (P26→P32) for deeper misconception work; the feedback-only path is insufficient.

**12. Typical Misconceptions Addressed:**  
Any misconception detectable by the G-category probe selected in the expansion.

**13. Compatible Primitives:**  
The expansion uses P74–P80 (any probe), P55, P49/P50, P51, P35.

**14. Incompatible Primitives:**  
P91 immediately after P90 — give the student time to integrate feedback before the mastery gate.

**15. Composition Constraints:**  
GR-10 (expand before validation): validate as probe → P55 → [P49|P50] → P51 → P35 → P55. The feedback (P51 step) must be targeted at the specific error revealed by the probe. Generic feedback ("try again") is not a valid P90 instance.

**16. Subject Examples:**  
- **Mathematics:** [P74: "Is this a function?"] [P55: 5s wait] [P50: "That's not right — look specifically at input 3"] [P51: "Was that a wrong criterion or did you apply the right criterion incorrectly?"] [P35: "Tell me what you now think the issue is"] [P55: wait]  
- **Physics:** [P79: "What will the acceleration be?"] [P55] [P49: "Your reasoning is on the right track — but check the direction"] [P51: diagnosis] [P35: "What do you now think about the direction?"] [P55]  
- **English:** [P74: "Is this passive?"] [P55] [P50: "Not quite — look at the grammatical subject"] [P51: "Is it the criterion or the subject-identification that went wrong?"] [P35: "Explain what you now see"] [P55]

---

### P91 — MASTERY VERIFICATION
**Type:** Named Compound &nbsp;|&nbsp; **Expansion:** `P77 → P76 → P75 → P74 → P78`  
**Effective Category:** Terminal assessment compound

**1. Purpose:**  
Administer a five-probe mastery gate and do not advance until the gate is passed.

**2. Cognitive Objective:**  
Enforce mastery before progression: the gate prevents concept deficit accumulation — deficits that compound with every subsequent concept built on an unmastered foundation.

**3. When to Use:**  
- At the end of every Teaching Protocol, when the concept's mastery criterion has been met  
- GR-6: P91 must be the terminal primitive in its Teaching Action

**4. When NOT to Use:**  
- Before P68 (MASTERY SELF-DECLARATION) — the self-declaration precedes the formal gate  
- Immediately after P90 (FORMATIVE ASSESSMENT WITH FEEDBACK) — allow integration time  
- When the session has not yet reached the mastery stage of the Protocol

**5. Student States Supported:**  
S0–S9 (universal — the gate applies regardless of student state)

**6. CPA Stage Compatibility:**  
C, P, A — the probe set tests across levels

**7. Inputs Required:**  
- All inputs for P77, P76, P75, P74, P78 in sequence  
- `mastery_threshold`: pass criterion (default: 4/5 probes passed with criterion-based justification)

**8. Expected Student Response:**  
Student passes ≥ 4 of 5 probes with criterion-based justification in each.

**9. Success Signal:**  
≥ 4/5 probes passed with justification. Advance to the next concept or protocol.

**10. Failure Signal:**  
≤ 3/5 probes passed. Do not advance. Identify the specific probe failures and route to the appropriate remediation.

**11. Recovery:**  
For classification probe failure: targeted practice with P18 + P17. For boundary probe failure: P17 with boundary pair + P22. For transfer probe failure: P39 TRANSFER PROMPT in teaching mode. For generation probe failure: P42 EXAMPLE GENERATION in teaching mode. For explanation probe failure: P44 DEFINITION CONSTRUCTION.

**12. Typical Misconceptions Addressed:**  
None directly — the gate detects all remaining misconceptions and routes to their specific remediation before advancing.

**13. Compatible Primitives:**  
P68 (MASTERY SELF-DECLARATION) before; nothing after (GR-6: P91 is terminal).

**14. Incompatible Primitives:**  
GR-6: nothing follows P91 in its Teaching Action. P68 cannot follow P91 — the self-declaration precedes the gate, not follows it.

**15. Composition Constraints:**  
GR-6 (P91 is terminal in its Teaching Action); GR-10 (expand before validation): validate as P77→P76→P75→P74→P78. `mastery_threshold` must be specified. Probe sequence is fixed: Generation → Transfer → Boundary → Classification → Explanation.

**16. Subject Examples:**  
- **Mathematics:** [P77] "Generate a function not from mathematics." [P76] "How does function appear in programming?" [P75] "Is the empty function a function?" [P74] "Classify: [new instance]." [P78] "Explain functions to a novice." Pass: 4/5 with justification.  
- **Physics:** [P77] "Create a Newton's Second Law scenario." [P76] "Apply to a satellite in orbit." [P75] "Object at rest with two equal forces — apply." [P74] "Classify: is this system accelerating?" [P78] "Explain Newton's Second Law to a novice."  
- **English:** [P77] "Write a passive and active sentence." [P76] "Where does passive appear in scientific writing?" [P75] "Is 'The glass is broken' passive?" [P74] "Is this sentence passive?" [P78] "Explain passive voice to a novice."

---

## COVERAGE ANALYSIS

### Total Primitive Count

| Category | Count | Type Breakdown |
|---|---|---|
| A — Activation | 11 | 10 True Primitives + 1 (P95 new, TP) |
| B — Input | 8 | 7 True Primitives + 1 Named Compound (P12) |
| C — Processing | 15 | 12 True Primitives + 3 New (P92, P93, P94 — all TP) |
| D — Schema Repair | 8 | 8 True Primitives |
| E — Elicitation | 15 | 15 True Primitives |
| F — Regulation | 19 | 19 True Primitives |
| G — Assessment | 7 | 7 True Primitives |
| H — Retention | 10 | 8 True Primitives + 2 Named Compounds (P57, P89) |
| Named Compounds (standalone) | 2 | P90, P91 |
| **TOTAL** | **95** | **90 True Primitives + 5 Named Compounds** |

---

### Category Distribution

| Category | % of Library | Primary Function |
|---|---|---|
| F — Regulation | 20% | Session control plane |
| E — Elicitation | 16% | Student production |
| A — Activation | 12% | Entry-point priming |
| C — Processing | 16% | Comprehension operations |
| B — Input | 8% | Content introduction |
| D — Schema Repair | 8% | Misconception correction |
| H — Retention | 11% | Long-term storage |
| G — Assessment | 7% | Cognitive state detection |
| Named Compounds | 5% | Compound operations |

---

### Coverage Analysis by Subject

#### Mathematics (908 concepts)
- **Primitives Required:** All 95 items. No mathematics-specific new primitives were required.
- **Primary primitive clusters in use:** P06-P08 (CPA for arithmetic/algebra), P17 (CONTRAST for concept boundary work), D-category chain (for common misconceptions across 908 concepts), P74/P80 (classification probes for all concept types)
- **Confidence:** Full coverage for all 10 domains (arithmetic, algebra, geometry, calculus, statistics, discrete, linear algebra, number theory, proof, applied)

#### Physics (194 concepts)
- **Primitives Required:** All 95 items + **P92 THOUGHT EXPERIMENT** (new, C-category)
- **Rationale for P92:** Physics instruction requires constrained derivation scenarios (Galilean thought experiments, limiting cases, idealized systems) that are distinct from P14/P15 (prediction+observation) and P92 cannot be decomposed into existing primitives without losing its "derivation without calculation" character
- **Confidence:** Full coverage for all physics domains, including P92 for mechanics, electromagnetism, and thermodynamics

#### English (216 concepts, 12 domains)
- **Primitives Required:** All 95 items + **P93 TEMPORAL SEQUENCE ASSEMBLY** (Phonics), **P94 CONTEXTUAL INFERENCE** (Vocabulary), **P95 INTERPRETIVE FRAME** (Literature)
- **Rationale for P93:** Phonics instruction requires working with temporal auditory sequences in working memory — this is categorically different from any visual processing primitive and cannot be decomposed into existing library items
- **Rationale for P94:** Vocabulary acquisition via contextual inference is a distinct cognitive operation (reading for meaning, not recognition or classification) that is not reducible to P18 (CLASSIFICATION) or P35 (OPEN QUESTION)
- **Rationale for P95:** Literary analysis requires an explicit frame-setter that prevents single-correct-answer cognitive set from blocking interpretive engagement — this is an Activation-category operation with no existing equivalent
- **Confidence:** Full coverage for all 12 English domains (phonics, phonology, vocabulary, grammar, syntax, writing, reading comprehension, literature, media literacy, academic writing, spoken language, second language)

---

### Missing Primitives

**None identified** for the three-subject Mathematics/Physics/English scope at v1.

Potential candidates for Phase 2 expansion (Chemistry, Biology, Computer Science):

| Candidate | Needed For | Rationale |
|---|---|---|
| STRUCTURAL FORMULA PARSING | Chemistry | 2D/3D molecular structure reading may require a distinct spatial primitive |
| HYPOTHESIS FORMATION | Biology | Scientific method's formal hypothesis step may warrant its own primitive |
| ALGORITHM TRACING | Computer Science | Step-by-step code execution tracking may be distinct from P23 (DECOMPOSITION) |

These are **not confirmed new primitives** — they should be tested against the Atomicity Test before admission. Each candidate may reduce to existing primitives with appropriate content slots.

---

### Confidence Assessment: Completeness for Three-Subject v1

| Dimension | Assessment | Evidence |
|---|---|---|
| Mathematics completeness | **HIGH** | 908 concepts decomposable using existing 95 items; reference implementation (math.func.function-concept) uses 36 Teaching Actions fully specified with these primitives |
| Physics completeness | **HIGH** | 194 concepts; P92 (THOUGHT EXPERIMENT) closes the only identified gap; remaining Physics concept types (mechanics, E&M, thermodynamics, optics, modern physics) fully covered |
| English completeness | **HIGH** | 216 concepts across 12 domains; P93/P94/P95 close the phonics/vocabulary/literature gaps; grammar, writing, reading comprehension, and spoken language covered by existing primitives |
| Grammar rule completeness | **HIGH** | 10 composition rules cover all identified invalid compositions; no known valid composition is blocked |
| Named Compound completeness | **HIGH** | 5 compounds cover the most important empirically-validated effect-size combinations |
| Phase 1 launch readiness | **HIGH** | Library is stable for the 50 Rank-A concepts in the Three-Subject Educational Brain Roadmap |

---

### Primitive Invocation Frequency Estimates

Based on the reference implementation (math.func.function-concept) and the three-subject scope:

| Frequency Tier | Primitives | Expected invocations per 1,000 concepts |
|---|---|---|
| Universal | P01, P55 | ~10,000–15,000 each |
| Very High | P14, P15, P17, P34, P35, P49 | ~5,000–8,000 each |
| High | P02, P06, P07, P08, P10, P17, P18, P20, P21, P22, P36, P41, P42, P50, P51, P52, P64, P74, P80, P81, P82, P84, P85, P88 | ~2,000–5,000 each |
| Medium | ~40 primitives | ~500–2,000 each |
| Situational | P28, P29, P71, P92, P93, P94, P95 and D-category | ~50–500 each |

**Total estimated primitive invocations for 1,318 concepts at full Protocol depth:** 1.9–2.5 million

**Unique primitive specifications:** 95

**Compression ratio:** ~20,000:95 ≈ **210:1** (unique primitive specifications to total invocations)

---

### Document Completeness

| Section | Status |
|---|---|
| Summary Table (95 items) | COMPLETE |
| Composition Grammar Quick Reference | COMPLETE |
| Category A — Activation (11 items) | COMPLETE — full 17-field spec |
| Category B — Input (8 items) | COMPLETE — full 17-field spec |
| Category C — Processing (15 items) | COMPLETE — full 17-field spec |
| Category D — Schema Repair (8 items) | COMPLETE — full 17-field spec |
| Category E — Elicitation (15 items) | COMPLETE — full 17-field spec |
| Category F — Regulation (19 items) | COMPLETE — full 17-field spec |
| Category G — Assessment (7 items) | COMPLETE — full 17-field spec |
| Category H — Retention (10 items) | COMPLETE — full 17-field spec |
| Named Compounds P90, P91 | COMPLETE — full spec |
| Coverage Analysis | COMPLETE |

---

*This document is the canonical specification for all Teaching Primitive composition in the Educational Brain. Every Teaching Protocol authored from this point forward references primitive IDs from this library. Every primitive invocation is concept-independent. The AI voices the compositions; the library specifies the cognitive operations.*

*Cross-reference:*  
*— `docs/architecture/EDUCATIONAL_BRAIN_PRIMITIVE_ARCHITECTURE.md` (final architectural decision, frozen)*  
*— `docs/architecture/TEACHING_PRIMITIVE_ARCHITECTURE.md` (discovery document, 91-primitive basis)*  
*— `docs/curriculum/TEACHING_ASSET_PHILOSOPHY.md` (authoring philosophy, AI Removal Test)*  
*— `docs/THREE_SUBJECT_EDUCATIONAL_BRAIN_ROADMAP.md` (launch roadmap, three-subject scope)*
