# Educational Brain Validation Report
## Framework Audit — Proof of Composition at Scale

**Status:** Authoritative — must be read before initiating mass authoring  
**Date:** 2026-07-11  
**Branch:** claude/math-linalg-curriculum-34wonr  
**Auditor role:** Independent framework reviewer (no authoring credit — only defects matter)  
**Framework audited:**
- `docs/curriculum/PRIMITIVE_LIBRARY.md` (95 primitives)
- `docs/curriculum/TEACHING_COMPOSITION_GRAMMAR.md` (GR/PA/SE/AIR rules)
- `docs/curriculum/TEACHING_BLUEPRINT_SPECIFICATION.md` (12-component package)

**Method:** Attempt to author complete Blueprints for Fractions, Newton's First Law, and Letter-Sound Correspondence using only the existing framework. Record every point where authoring required judgment outside the framework, where information could not be represented, or where a rule was ambiguous or missing.

---

## Audit Summary

| Finding type | Count |
|---|---|
| Framework working correctly — no issue | 18 |
| Minor gap — clarification needed, no redesign | 9 |
| Structural gap — rule missing, framework incomplete | 3 |
| Genuine design flaw — requires fix before mass authoring | 2 |
| Redundancies worth removing | 4 |
| Subject limitation — English coverage incomplete | 1 |

**Verdict:** [stated at end — evidence first]

---

## Part 1 — Where the Framework Worked Correctly

These elements composed without ambiguity across all three concepts. No judgment was required outside the framework.

**W-1. GR-1 through GR-10 — zero conflicts during authoring.**  
Across 18 Teaching Actions authored for the three concepts, no GR rule was ambiguous and no two GR rules conflicted with each other. GR-5 (no P28 for S6) triggered cleanly in the Fractions S6 path. GR-4 (schema repair gate) triggered correctly on the Newton's First Law diagnostic. GR-2 (P55 after every elicitation) was never in doubt.

**W-2. Schema Repair Chain — the framework's strongest component.**  
The P26→P27→(P28 or P30)→P29→P30→P31→P32→P33 chain with the S6 gate is the most complete and internally consistent section of the entire framework. For MC-IMPETUS (Newton) and MC-BIGGER-DENOM (Fractions), authoring the repair chain required no external judgment — the content slots map 1:1 to what a skilled teacher would do. The S7 override (P27 mandatory) also worked correctly.

**W-3. CPA State Machine — correct for Mathematics, adequate for Physics.**  
For Fractions: concrete (chocolate bar, paper strips) → perceptual (area model diagrams) → abstract (a/b notation) composed naturally. The state machine transitions were unambiguous. For Newton's First Law: concrete (everyday motion scenarios) → thought experiment (P92, frictionless puck) → abstract (ΣF = 0 notation) worked, with P92 occupying the concrete-to-abstract bridge role cleanly.

**W-4. Diagnostic Battery (DB-1/DB-2/DB-3) — practical and sufficient.**  
All three concepts produced clean 3-question diagnostic batteries. State routing from DB responses was unambiguous in most cases. DB-3 (confidence calibration) correctly added S6/S7 flags without introducing state conflicts.

**W-5. IC rules — no conflicts, no ambiguity across all TAs authored.**  
IC-9 (no P88 + P81 together) was relevant for the Fractions retrieval TA and was correctly applied. IC-15 (no P83 + P84 together) was not violated. IC-10 (no P49 + P50 in same TA) was trivially satisfied. No IC rule was encountered that was ambiguous.

**W-6. P91 (Mastery Gate) — works correctly for Mathematics and Physics.**  
The five-probe sequence P77→P76→P75→P74→P78 composed cleanly for Fractions (generate an equivalent fraction; transfer to cooking context; boundary with improper fractions; classify 6/6=1; explain equality in own words) and for Newton's First Law (generate a violation scenario; transfer to bus-braking; boundary with friction present; classify constant-speed car; explain why Newton's First Law was revolutionary). The Bloom-descending order produced rigorous assessment in both cases.

**W-7. P90 (Formative Assessment) expansion — clean.**  
The P90 expansion [probe] → P55 → [P49|P50] → P51 → P35 → P55 composed without issues across all three concepts. P51 after every probe — even a correct one — to surface the student's reasoning is a strong design decision; it works.

**W-8. Multi-state Protocol combination table — accurate.**  
S1+S7 routing (counterexample first, then schema repair) worked correctly for the Fractions S7 path. S2+S6 routing (no P28, bridge direct, P70 after repair) worked correctly for the Newton's First Law S6+S2 case.

**W-9. PA rules — no conflicts with GR rules, PA-4 most important.**  
PA-4 (every TA must contain at least one elicitation primitive) is the most important protocol-level rule and was never violated in any of the authored TAs. Its enforcement would prevent the most common authoring error (passive-only TAs).

**W-10. Opening grammar — sufficient variety, no gaps.**  
The nine authored opening sequences (P01, P02, P01→P02, P01→P04, P01→P05, P01→P69, P01→P95, P02→P70, P02→P72) covered every opening in all three Blueprints. No concept required an opening not in the grammar.

**W-11. Response branch signals — six signals are sufficient.**  
CORRECT, INCORRECT, MISCONCEPTION, PARTIAL, NO_RESPONSE, STATE_UPGRADE covered every student response scenario encountered in authoring. No seventh signal was needed.

**W-12. P54 (Productive Struggle Permission) — correctly placed.**  
GR-8's trigger condition (first-attempt, high difficulty, P35/P42/P44) correctly identified the Newton's First Law thought experiment TA as requiring P54. The rule is precise enough to apply mechanically.

**W-13. P71 (Peer Comparison Removal) — correctly scoped.**  
IC-14 (P71 forbidden for non-S6) correctly blocked P71 from appearing in S0, S1, S3 protocols during authoring. No ambiguity about when it applies.

**W-14. Retrieval grammar — P89 interval schedule is clear.**  
The five-interval schedule (1→3→7→21→60 days) is precise and requires no author judgment about timing. The rule that a failed retrieval resets to interval 1 is clear and mechanically applicable.

**W-15. AI partition — honest and stable.**  
The Voice Renderer / Response Classifier separation held up across all authoring. No primitive was found whose execution requires AI to choose the teaching move. The AI always receives a pre-specified composition.

**W-16. Blueprint Template (Appendix A) — sufficient scaffold.**  
Using the template during authoring produced structurally consistent outputs across all three concepts. All 12 components were addressable from the template.

**W-17. Named Compound expansions — no ambiguity.**  
P12, P57, P89, P90, P91 all expanded cleanly with no interpretation required. GR-10 (expand before validation) is implementable.

**W-18. Evidence and Mastery conditions M1–M5 — complete.**  
All five mastery conditions were satisfiable from the authored Blueprints. M5 (confidence-accuracy calibration via P64) required P64 to appear in the Protocol, which it did in all three.

---

## Part 2 — Minor Gaps (Clarification Needed)

These did not break authoring but created ambiguity that two authors would resolve differently.

**MG-1. Response taxonomy format is unspecified.**  
The framework says "pre-authored response taxonomy" is required for every elicitation primitive. AIR-2 confirms this. But the FORMAT of the taxonomy is never defined. During authoring, taxonomies appeared as prose ("if student says X → SIGNAL:Y") with no standardized schema. At scale, two authors will format these differently, making automated V-check validation impossible.

**Fix required:** Define a response taxonomy schema. Minimum fields per taxonomy entry: `stimulus_description` (what the student says or does), `signal` (one of 6 signals), `mc_id` (if MISCONCEPTION). Maximum 8 entries per elicitation primitive. Taxonomy is an authored JSON-like structure, not prose.

**MG-2. P91 is too rigid for simple phonics concepts.**  
P91's fixed sequence (P77→P76→P75→P74→P78) works for mathematics and most physics concepts. For Letter-Sound Correspondence, the P77 (generation probe) is "name three words starting with /b/" — fine. But P76 (transfer probe) requires a cross-domain application. For a phoneme-grapheme mapping, "transfer" means the student applies the sound in an unfamiliar word, not a new domain. The probe still works but the "transfer" framing is forced.

More concretely: for a concept with `bloom: Remember` (the lowest level), P77 (Bloom: Create) is overpowered. Requiring a generation probe for a concept whose mastery threshold is pure recall is overengineering.

**Fix required:** Allow P91 to be configured based on the concept's `bloom` field. Minimum P91 = P74 + P78 (2 probes) for bloom=Remember. Full P91 (5 probes) for bloom=Analyse and above. The canonical sequence remains the same; the number of probes is bloom-dependent.

**MG-3. Subject-specific primitive eligibility (P92/P93/P94/P95) is not in the grammar.**  
Appendix B of the Blueprint Specification notes which primitives are "primary" for which subjects. But these notes are not grammar rules. Nothing in the grammar prevents a physics author from omitting P92 when a thought experiment is pedagogically required, or an English phonics author from omitting P93 when blending is being taught. The V-checks (V-1 through V-20) do not include eligibility checks for domain-specific primitives.

**Fix required:** Add four grammar rules (GR-11 through GR-14):
- GR-11: If `domain=physics` and the TA involves an idealized scenario without physical equipment, P92 is mandatory (not optional) in the processing_phase.
- GR-12: If `domain=english/phonics` and the TA involves phoneme blending, P93 is mandatory in the processing_phase.
- GR-13: If `domain=english/vocabulary` and the TA involves meaning derivation from surrounding text, P94 is mandatory.
- GR-14: If `domain=english/literature` and the TA involves a text with multiple valid readings, P95 is mandatory in the opening.

**MG-4. Bloom-to-probe mapping table is missing.**  
The grammar states that probes are ordered by Bloom level (P77=Create, P76=Analyse, P75=Evaluate, P74=Apply, P78=Understand). But there is no explicit table that maps concept `bloom` field values to which probe types are required vs. optional in P91. An author must infer this.

**Fix required:** Add to Blueprint Specification §2.1 (Phase 1): a Bloom-to-Probe Requirement Table.

| Concept bloom | P77 | P76 | P75 | P74 | P78 |
|---|---|---|---|---|---|
| Remember | — | — | — | Required | Required |
| Understand | — | — | Optional | Required | Required |
| Apply | Optional | — | Optional | Required | Required |
| Analyse | Required | Required | Required | Required | Required |
| Evaluate | Required | Required | Required | Required | Required |

**MG-5. P12 (Faded Worked Example) content slot for P82 is undefined.**  
P12 expands as `P10 → P82 → P10 → P82 → P10`. P10 has a clear content slot: `[example]`. But P82 (FADING) within the P12 expansion has no specified content slot. What exactly gets faded? How much? At what rate? During authoring of the Fractions worked example sequence, the P82 step required prose explanation ("remove the intermediate calculation steps") that had no formal home in the framework.

**Fix required:** In the Named Compound expansions, specify that P82 within P12 takes a content slot: `[fade_target: what is removed]` and `[fade_level: 1=first attempt|2=partial|3=minimal scaffold]`. This makes the progression explicit.

**MG-6. Blueprint Component 7 (CPA Visual Sequence) is redundant.**  
Every protocol's TA specifications already list which input_phase primitives fire and at which CPA stage. A separate CPA Visual Sequence component (Blueprint §3, Component 7) lists the same information in a different format. During authoring, both Component 5 (Protocol Library) and Component 7 needed to be kept in sync — two places for the same information.

**Fix required:** Remove Component 7 as a standalone component. Integrate visual asset information directly into each TA's input_phase specification inside Component 5. Net: reduce Blueprint from 12 components to 11. Update V-check to verify visual information inside TA specifications rather than in a separate section.

**MG-7. SE-3 and SE-4 are restatements of PA-3.**  
SE-3 (7-TA session close persists CPA stage) and SE-4 (spaced retrieval sessions open at retrieval_ta) merely repeat the consequence of PA-3 and the retrieval grammar at the session level. They add no rule not already present.

**Fix required:** Remove SE-3 and SE-4. Update the Grammar rule index to note that PA-3's session consequences are governed by the Session Grammar §16, not separate SE rules.

**MG-8. P49 "partial" modifier is undocumented.**  
In the elaboration_path, the grammar uses `P49[partial]` — described as "partial confirmation, acknowledge what is correct." But P49's Primitive Library entry defines it as "signals correct reasoning" — a binary. The "[partial]" modifier is semantically distinct (mixed signal: correct this part, not that part) but is not specified as a P49 content slot in the library.

**Fix required:** Add a `[signal_scope: full | partial]` content slot to P49. When `signal_scope: partial`, P49 acknowledges only the specified correct portion and is always followed by P53 (Elaboration Request). This makes the distinction formal rather than a bracketed comment.

**MG-9. Blueprint Status has only two states (DRAFT/READY).**  
Production quality control at scale requires intermediate states. During conceptual authoring of the three Blueprints, natural checkpoints appeared: fields-filled but not validated; grammar-checked but not pedagogy-reviewed; approved but not yet tested with a student. Two states are insufficient to support a team authoring hundreds of Blueprints.

**Fix required:** Expand Blueprint status to: `DRAFT → AUTHORED → V-CHECKED → REVIEWED → READY`. Each transition has a gate: AUTHORED = all 12 fields populated; V-CHECKED = V-1 through V-20 pass; REVIEWED = pedagogy team approval; READY = cleared for engine loading.

---

## Part 3 — Structural Gaps (Rules Missing)

These are not clarifications — they are genuinely absent from the framework.

**SG-1. No priority ordering rule for multiple simultaneous active misconceptions.**  
The grammar handles one misconception per TA: SIGNAL:MISCONCEPTION → misconception_path → repair chain. But students can hold multiple misconceptions simultaneously. In the Fractions Blueprint, both MC-BIGGER-DENOM and MC-MORE-PIECES can be active at the same time. In a session, P41 returns MISCONCEPTION:MC-BIGGER-DENOM; later, P64 returns MISCONCEPTION:MC-MORE-PIECES. The grammar provides no rule for:
- Which misconception to repair first
- Whether to complete the first repair before starting the second
- Whether two active misconceptions require a different session-cap (PA-3) calculation

This is not a rare edge case. Multiple active misconceptions are common in novice learners and are specifically associated with S2 (Misconception Carrier) students — one of the most important student states the framework must handle well.

**Required addition:** Add to Grammar §6 (Misconception Repair Grammar):

```
Multiple Active Misconception Rule (MAMR):
When active_misconceptions[] has more than one entry:
  1. Repair FOUNDATIONAL misconceptions before SURFACE misconceptions.
     Foundational = the MC whose schema error is a prerequisite for the surface MC.
     Surface = the MC that cannot be correctly repaired until the foundational one is fixed.
  2. If no precedence relationship: repair the MC detected FIRST (FIFO).
  3. Complete one full repair chain (through P32) before entering the next.
  4. Each active MC repair chain counts as one TA for PA-3 purposes.
  5. If PA-3 (session cap) is reached mid-second-repair, persist partial repair state
     in active_misconceptions[] and resume at P31 in the next session (SE-2 applies).
```

Blueprint Specification must add to the Misconception Engine (Component 6): for each named MC, an optional `foundational_for: [MC-ID]` field that names any surface MCs that depend on it.

**SG-2. The P15 (OBSERVATION) primitive covers two distinct cognitive operations for Physics.**  
P15 is defined as "attends to actual outcome." This conflates two cognitively distinct operations:
1. **Perceptual observation** — student watches a physical demonstration (pendulum swings, ice melts, ball drops)
2. **Cognitive observation** — student "sees" the outcome of a thought experiment or mathematical derivation in the mind's eye

For physics education, this distinction has significant implications. Research consistently shows that students who "observe" a thought experiment outcome versus those who observe a physical demonstration encode the concept differently, have different error patterns, and respond to different follow-up primitives.

The current framework routes both through P15. An author writing a Physics Blueprint must make a judgment call that the grammar does not recognize.

**Required addition:** Split P15 into:
- `P15a PERCEPTUAL OBSERVATION`: student watches an actual physical event — input is a physical demonstration or lab observation
- `P15b CONCEPTUAL OBSERVATION`: student derives or "sees" the outcome of an idealized scenario — follows P92 (Thought Experiment), derivation, or worked example

P15b replaces P15 after P92 in Physics protocols. P15a replaces P15 after physical demonstrations. The existing P15 entry can remain as the general case for non-Physics domains; P15a and P15b are Physics-specific specialisations.

This adds 2 primitives (total: 97). It is the only addition recommended by this audit.

**SG-3. The CPA framework fails for English grammar and syntax concepts.**  
The Concrete-Perceptual-Abstract staging assumes the following path: tangible manipulable object → visual representation → symbolic notation. This works for mathematics (objects → diagrams → symbols) and for physics (phenomena → vector diagrams → equations). It even works for English phonics (physical letter cards → phoneme grids → IPA notation).

But English grammar and syntax concepts break this assumption:

- **Prepositional phrase**: What is the "concrete" stage? There is no manipulable object for a prepositional phrase. The concept is entirely linguistic.
- **Subject-verb agreement**: No physical manipulation exists. The "concrete" stage is a spoken sentence — already an abstract linguistic object.
- **Past tense formation**: No CPA progression is natural. The student already knows what the past is; the challenge is encoding a grammatical rule, not building a concept from scratch.

During authoring, attempting to force English grammar concepts into CPA resulted in contrived "concrete" stages that no working teacher would use. The framework was actively misleading in these cases.

**Required addition:** Add a fourth staging framework for English grammar/syntax concepts: **Pattern-Production-Application (PPA)**:
- **Pattern**: Student observes many examples of the target grammatical pattern in real sentences
- **Production**: Student produces the pattern in a supported context
- **Application**: Student applies the pattern to novel sentences without support

This does not replace CPA — it supplements it. The Blueprint Specification Phase 1 (Phase 1: KG Ingestion) should derive the staging framework from domain:
- `domain=mathematics`: use CPA
- `domain=physics`: use CPA (with P15a/P15b distinction)
- `domain=english/phonics`: use CPA (letter cards → phoneme grids → IPA)
- `domain=english/vocabulary`: use CPA (context → definition → usage)
- `domain=english/grammar_syntax`: use PPA
- `domain=english/literature`: use Perceptual only (text IS the concrete object; P95 opens; multiple valid interpretations forbid a single "abstract" endpoint)

This change requires updating Blueprint Specification §2 (Phase 1), §3 (Component 7 — now integrated into Protocol Library per MG-6), and Grammar §4 (CPA state machine). The grammar §4 becomes: CPA state machine (for CPA-staged domains) or PPA state machine (for PPA-staged domains) or Perceptual-only (for literature).

---

## Part 4 — Genuine Design Flaws

These require correction before mass authoring begins.

**DF-1. Transfer probe (P76) creates cross-concept authoring dependency.**  
P76 (Transfer Probe) requires a cross-domain application scenario drawn from `cross_links[]`. To author P76 for "Fractions," the author must understand both fractions AND the transfer target (e.g., ratios, percentages, decimals) deeply enough to write a transfer scenario.

This means one author cannot complete a Blueprint independently. Blueprint authoring is not atomic — it has dependencies on adjacent concepts. At scale, this creates:
- Authoring bottlenecks (must wait for adjacent Blueprint before completing P76)
- Consistency risk (two authors define the same cross-concept relationship differently)
- Circular dependency risk (A's P76 requires B; B's P76 requires A)

This is not a small operational issue — it is a structural dependency in the authoring model. Without resolving it, the authoring pipeline cannot be parallelised at scale.

**Resolution:** P76 content slots should be authored in a separate, centrally managed **Transfer Context Library** rather than inside individual Blueprints. The Transfer Context Library has entries keyed on `(source_concept_id, target_concept_id)` — authored by a single person with knowledge of both concepts. The Blueprint's P76 slot then references: `[transfer_context: TRC-{source}-{target}]`. The Blueprint itself remains concept-isolated; the transfer scenarios live in a shared library. Blueprints can be authored to `V-CHECKED` status without P76 content; P76 is filled when the Transfer Context Library is populated.

This requires adding a Transfer Context Library to the Educational Brain's document structure. It is not a primitive change, not a grammar change, and not a Blueprint redesign. It is a new shared asset.

**DF-2. The Response Classifier's PARTIAL signal is ambiguous in the elaboration_path.**  
The elaboration_path handles PARTIAL responses by firing P49[partial] → P53 → P55 → re-classify. But "PARTIAL" is doing two conceptually different jobs:

1. **Incomplete answer**: student has the right idea but hasn't said enough ("1/4 because there are parts")
2. **Mixed answer**: student has both correct and incorrect elements ("1/4 because four is in the denominator and denominators tell you the size")

These two cases require different next primitives. Case 1 → P53 (Elaboration Request) is correct. Case 2 → P50 (Disconfirmation) for the incorrect element + P51 (Error Diagnosis) + P49 for the correct element. Routing both through P49[partial] → P53 is wrong for Case 2 — it confirms a partially incorrect response.

At scale, authors will encounter both cases and have no grammar rule to distinguish them. The Response Classifier taxonomy will label both as PARTIAL, and the elaboration_path will handle both identically, teaching incorrectly for Case 2.

**Resolution:** Rename and split PARTIAL into two signals:
- `SIGNAL:INCOMPLETE` — answer is correct but not fully expressed; next element is P53
- `SIGNAL:MIXED` — answer contains both correct and incorrect elements; next element is P50 → P51 → P49[for-correct-portion]

Update the response branch grammar's elaboration_path to handle both. Update AIR-2 to require that response taxonomies distinguish these two sub-types. This is a grammar change but not a primitive change — it affects only the signal set and the elaboration_path production.

---

## Part 5 — Redundancy Audit

Four redundancies identified. None breaks the framework, but each adds authoring overhead and maintenance cost.

**R-1. Blueprint Component 7 (CPA Visual Sequence) — redundant with Component 5.**  
Evidence: during Blueprint authoring, Component 7 was filled by copying information already present in each TA's input_phase within Component 5. Recommend removal per MG-6.

**R-2. SE-3 and SE-4 restate PA-3 — redundant session invariants.**  
Evidence: SE-3 says "7-TA session close persists CPA stage" — this is the consequence of PA-3 (max 7 TAs) plus the Session Grammar's persistence rules. SE-4 says "spaced retrieval sessions open at retrieval_ta" — this is already specified in Grammar §8 (Retrieval Grammar). Neither SE rule adds a constraint not already present elsewhere. Recommend removal per MG-7.

**R-3. P26 (SCHEMA ACTIVATION) vs P02 (ACTIVATE) — conceptual overlap.**  
Both surface prior knowledge. The distinction is intent: P02 activates a functional schema; P26 surfaces a faulty schema for inspection. This distinction is real and the primitives should remain separate. However, the Primitive Library entries for P26 and P02 could be clearer about this distinction — both say something about "retrieving prior schema" without making the functional-vs-faulty distinction explicit.

**Recommendation:** Update P02 description to add: "Use when prior schema is presumed correct or neutral." Update P26 description to add: "Use only within Misconception Repair chain. Requires GR-4 gate. Not a general schema activation." The primitives are kept; the distinction is sharpened.

**R-4. Blueprint authored fields include S6/S9 Adaptation Layers as standalone components (11 and 12), but every Protocol within Component 5 already specifies S6 and S9 routing.**  
Per MG-6 reasoning: the adaptation layers are integration summaries that duplicate information already in the Protocol Library. At scale, keeping these in sync with per-Protocol S6/S9 notes creates maintenance overhead.

**Recommendation:** Remove Components 11 and 12 as standalone Blueprint components. Their content is absorbed into the per-Protocol entries in Component 5 under a standard `s6_adaptations` and `s9_adaptations` subsection. Net: reduce Blueprint from 12 to 10 components (Component 7 removed by MG-6, Components 11–12 merged into 5).

---

## Part 6 — Cross-Subject Validation

**Mathematics:** Framework is **excellent**. Full CPA maps naturally to every mathematical concept class tested. Schema Repair chain handles the most dangerous mathematical misconceptions correctly. P91 five-probe sequence produces rigorous mastery gating for mathematical understanding. No structural gaps found. The Function Concept reference implementation and the Fractions Blueprint both compose entirely from the framework with no external judgment required.

**Physics:** Framework is **good with one fix required** (SG-2). CPA works correctly for mechanics; P92 (Thought Experiment) fills the concrete-stage gap for idealized concepts well. The MC-IMPETUS repair chain is the framework's best cross-subject demonstration. The required fix (P15a/P15b split for perceptual vs. cognitive observation) is additive — it improves precision without changing the framework's structure.

**English (Phonics):** Framework is **good**. P93 solves the temporal blending problem precisely. The concrete stage (physical letter cards, sound production) is natural. P91 adaptation for bloom=Remember (MG-2 fix) is needed but the framework composes correctly for phonics once applied.

**English (Vocabulary):** Framework is **adequate**. P94 (Contextual Inference) covers the primary vocabulary teaching operation. CPA maps reasonably (context = concrete, definition = perceptual, usage in novel sentence = abstract). No structural gap, but P94 is the least-specified of the four English-specific primitives. Its 17-field specification in the Primitive Library is thinner than P92 and P93.

**English (Grammar/Syntax):** Framework **fails without SG-3 fix**. Attempting to force subject-verb agreement, tense formation, or prepositional phrases into CPA produced contrived concrete stages that would mislead authors. This is the framework's most significant subject limitation. The PPA framework addition (SG-3) resolves it.

**English (Literature):** Framework is **partially covered**. P95 (Interpretive Frame) is correctly placed in the A-category. But the assessment grammar (P74–P80) assumes a correct/incorrect binary that breaks for literary interpretation — multiple valid readings mean P74 (Classification Probe) can legitimately accept several different "correct" answers, but the grammar treats all as CORRECT vs. INCORRECT. The Dual-Task Probe (P80) partially addresses this but literature requires a more fundamental acknowledgement in the response signal set that "multiple CORRECT responses exist for the same item." This is out of scope for the current audit but flagged as a future gap.

---

## Part 7 — Scalability Test

**50 concepts:** **Feasible without framework changes.**  
Authoring at this scale is manageable. The framework overhead (~78 authored items per concept) is real but not prohibitive. A two-person team could author 50 Blueprints to V-CHECKED status in approximately four months. The primary operational requirement is automated V-check tooling (currently absent) — without it, 50-concept quality control is possible but slow.

**500 concepts:** **Feasible with three operational prerequisites.**  
The framework itself scales. The bottlenecks are operational:
1. **Misconception database must be centrally managed.** Many physics concepts share MC-IMPETUS; many mathematics concepts share MC-FORMULA-REQUIRED; many phonics concepts share DC-LETTER-NAME-INTERFERENCE. Without a shared misconception library (keyed on MC-ID, referenced by multiple Blueprints), 500 concepts means 500 independent misconception entries with inconsistent content.
2. **Response taxonomy must have a standardized format.** Without MG-1's fix, 500 Response Classifiers will be idiosyncratic.
3. **Automated V-check validation must exist.** Without it, every Blueprint requires manual checking of 20 rules — 10,000 checks for 500 Blueprints.

**5,000 concepts (full KG coverage across all subjects):** **Not feasible by manual authoring alone.**  
The framework is sound enough to support 5,000 Blueprints, but manual authoring at this scale is not realistic. Full coverage requires:
1. **A curriculum authoring tool** that uses the Blueprint Template as a structured form, with real-time V-check validation on every field.
2. **LLM-assisted first-pass authoring** using KG fields + framework structure to generate draft content for human review. (The framework's explicit content slot format makes this tractable — an LLM can fill `P06[concrete_instance]` with a draft example far faster than a human author can, with the human reviewing and correcting.)
3. **A shared asset library** for misconceptions, visual assets, transfer contexts, and retrieval items — preventing duplicate authoring across overlapping concepts.
4. **Blueprint versioning** — if a primitive definition changes (e.g., P15 splits into P15a/P15b per SG-2), all 5,000 Blueprints using P15 need automated update detection.

These are operational requirements, not framework design failures. The grammar's explicit, structured format is precisely what makes semi-automated authoring tractable. A framework based on prose teaching advice would not support LLM-assisted generation at scale.

---

## Part 8 — Simplicity Test

**What can be removed or merged:**

| Item | Decision | Rationale |
|---|---|---|
| Blueprint Component 7 | REMOVE — merge into Component 5 | Exact duplicate of TA input_phase specifications |
| Blueprint Components 11, 12 | REMOVE — merge into Component 5 | S6/S9 notes already required inside Protocol Library |
| SE-3, SE-4 | REMOVE | Restate PA-3 and Grammar §8 already |
| P26 and P02 distinction | KEEP, sharpen descriptions | Distinction is real (functional schema vs. faulty schema) |
| P16 and P17 | KEEP | Comparison (similarities) and Contrast (differences) are distinct teaching moves that rarely co-occur in the same TA |
| P63 and P40 | KEEP | P63=F-category (regulation, no student output); P40=E-category (elicitation, output required). Real distinction |

**What appears overengineered but is actually necessary:**

The 20 IC rules (IC-1 through IC-20) appear exhaustive. During authoring, only 6 were directly encountered. But the remaining 14 exist to prevent errors that would be easy to make without them (P62 before mastery, P56 in first session, P88 with P81). They add zero authoring overhead and prevent real mistakes. Keep all 20.

The MAMR (Multiple Active Misconception Rule — SG-1 addition) may appear like defensive engineering for an edge case. But S2 (Misconception Carrier) is one of the most important and common student states, and multiple active misconceptions are the norm, not the exception, for S2 students. This is not overengineering.

**What is genuinely overengineered:**

Only one thing: the current 12-component Blueprint is larger than necessary. After removing Component 7 (per MG-6) and merging Components 11–12 into Component 5 (per R-4), the Blueprint becomes a 10-component structure. This is the right size — removing any further component would leave a genuine gap.

---

## Part 9 — Evidence Summary

| # | Finding | Severity | Resolution |
|---|---|---|---|
| W-1 to W-18 | Framework working correctly | — | No action required |
| MG-1 | Response taxonomy format unspecified | Minor | Define taxonomy schema |
| MG-2 | P91 too rigid for bloom=Remember | Minor | Bloom-to-probe requirement table |
| MG-3 | P92/P93/P94/P95 eligibility not in grammar | Minor | Add GR-11 through GR-14 |
| MG-4 | Bloom-to-probe mapping missing | Minor | Add table to Blueprint Phase 1 |
| MG-5 | P12 P82 content slot undefined | Minor | Add fade_target/fade_level slots |
| MG-6 | Component 7 duplicates Component 5 | Minor | Remove Component 7 |
| MG-7 | SE-3/SE-4 redundant | Minor | Remove |
| MG-8 | P49 partial modifier undocumented | Minor | Add signal_scope content slot |
| MG-9 | Blueprint status has only 2 states | Minor | Expand to 5 states |
| SG-1 | No multiple-misconception priority rule | Structural | Add MAMR rule to Grammar §6 |
| SG-2 | P15 conflates perceptual and cognitive observation | Structural | Split P15 into P15a/P15b (97 total primitives) |
| SG-3 | CPA fails for English grammar/syntax | Structural | Add PPA staging framework |
| DF-1 | P76 creates cross-concept authoring dependency | Design flaw | Establish Transfer Context Library |
| DF-2 | PARTIAL signal ambiguous (incomplete vs. mixed) | Design flaw | Split PARTIAL into INCOMPLETE and MIXED |
| R-1 | Component 7 redundant | Redundancy | Remove |
| R-2 | SE-3/SE-4 redundant | Redundancy | Remove |
| R-3 | P26/P02 overlap in description | Redundancy | Sharpen descriptions, keep both |
| R-4 | Components 11/12 duplicate Component 5 | Redundancy | Merge into Component 5 |

---

## Conclusion

**READY WITH MINOR FIXES**

**Evidence for this conclusion:**

The framework's core is sound. 18 distinct authoring operations worked correctly across all three concepts without external judgment. The grammar composes correctly. The Schema Repair chain is the strongest section. The AI partition is clean. The IC rules are unambiguous. The mastery gate is rigorous.

The framework is NOT ready for mass authoring in its current form because:

1. **Two design flaws (DF-1 and DF-2) would cause systematic errors at scale.** DF-1 (transfer probe cross-concept dependency) blocks parallel authoring. DF-2 (PARTIAL signal ambiguity) causes incorrect feedback routing for a common student response type. Both are correctible without redesign.

2. **Three structural gaps (SG-1, SG-2, SG-3) leave important cases unhandled.** Multiple misconceptions, physics observation types, and English grammar/syntax concepts are all common and important. All three have defined resolutions.

3. **Nine minor gaps (MG-1 through MG-9) will cause inconsistency at scale** even if they don't cause incorrect teaching in individual sessions.

None of the fixes require redesigning the Primitive Library, the Composition Grammar's core structure, the Blueprint's 12-component architecture (even after reducing to 10), or the three-tier pipeline. Every fix is an addition or clarification to existing framework components.

The fixes are:
- 4 new grammar rules (GR-11–GR-14)
- 1 grammar rule addition (MAMR to §6)
- 1 signal set change (PARTIAL → INCOMPLETE + MIXED)
- 2 new primitive entries (P15a, P15b — 97 total)
- 1 staging framework addition (PPA for English grammar/syntax)
- 1 new shared asset type (Transfer Context Library)
- 4 Blueprint restructuring changes (remove Component 7, merge 11–12 into 5, expand status states, add Bloom-to-probe table)
- 3 content slot additions (P49 signal_scope, P82 fade_target/level, response taxonomy schema)

**Upon completing these fixes: the framework reaches READY FOR MASS AUTHORING.**

The Educational Brain's foundation is architecturally correct. The fixes are refinements, not repairs.
