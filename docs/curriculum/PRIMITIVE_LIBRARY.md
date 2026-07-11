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
**Type:** Named Compound &nbsp;|&nbsp; **Expansion:** `P10 → P82 → P10 → P82 → P10`

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
