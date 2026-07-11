# Teaching Blueprint Specification
## How Any KG Concept Becomes a Teachable Concept

**Status:** Authoritative — defines the complete concept-to-teaching transformation  
**Date:** 2026-07-11  
**Branch:** claude/math-linalg-curriculum-34wonr  
**Governs:** All Teaching Blueprint authoring across Mathematics, Physics, English  
**Depends on:** `docs/curriculum/PRIMITIVE_LIBRARY.md` · `docs/curriculum/TEACHING_COMPOSITION_GRAMMAR.md`  
**Reference implementation:** `docs/curriculum/protocols/math.func.function-concept.md`  
**Subjects in scope:** Mathematics (908 KG concepts) · Physics (194) · English (216)

---

## 0. What a Teaching Blueprint Is

A **Teaching Blueprint** is the complete specification that transforms one KG concept node into a fully teachable concept.

It is not a lesson plan. It is not narrative. It is not content.

It is the **authoring contract** that maps every field a teaching engine needs to execute teaching decisions for this concept — deterministically, without inventing teaching logic at runtime.

A Blueprint sits above a Teaching Protocol. A Protocol is one execution path (one student state) through the Blueprint. A Blueprint contains all paths.

| Level | Definition |
|---|---|
| Teaching Blueprint | Full specification for one concept — all states, all misconceptions, all probes |
| Teaching Protocol | One path through the Blueprint — one student state |
| Teaching Action | One move within a Protocol — one TA |
| Primitive Sequence | The atomic composition within one TA |

The Educational Brain is a library of Blueprints. When the engine receives a student on a concept, it opens the Blueprint, reads the student's entry state, and selects a Protocol. The rest is execution.

---

## 1. Inputs Required

### 1.1 Fields from the Knowledge Graph

Every Blueprint begins with these KG fields. No authoring may proceed until all are present and valid.

| KG Field | How Used in Blueprint |
|---|---|
| `concept_id` | Primary key for StudentMemory, Protocol routing, KG unlock signals |
| `name` | Display label; content slot `[concept_name]` throughout |
| `domain` | Determines subject-specific primitive eligibility (P92 for Physics; P93/P94/P95 for English) |
| `difficulty` | 1–5 scale; determines plausible student states and CPA entry stage |
| `bloom` | Target Bloom level; determines which probe types are mandatory in P91 expansion |
| `prerequisites[]` | Prerequisite IDs; used in Prerequisite Check (Part 0.4); gates S4 detection |
| `estimated_hours` | Used to set PA-3 session cap and P62 schedule granularity |
| `mastery_threshold` | Passed to P91 gate as the required success threshold |
| `cross_links[]` | Used in P76 (Transfer Probe) and P87 (Transfer Bridging) content slots |
| `description` | Source material for Learning Objective authoring only — not used verbatim |

These 10 fields come directly from the canonical KG JSON. No other KG fields are required.

### 1.2 Fields Authored for the Blueprint

These cannot be derived from the KG automatically. They must be authored by the curriculum team.

| Authored Field | Description | Grammar Mapping |
|---|---|---|
| `learning_objective` | Boundary statement — minimum observable behaviour for mastery | P91 content slots |
| `student_state_rationale[]` | Why each state (S0–S9) applies to this concept | Protocol selection matrix |
| `diagnostic_battery[]` | 2–3 questions that classify entry state within 3 moves | P41 sequences |
| `prerequisite_checks[]` | 1–3 minimal questions to detect S4 | P41[prereq] |
| `concrete_instances[]` | Authored physical/tangible examples for P06 | P06 content slot |
| `narrative_instances[]` | Authored story scenarios for P09 | P09 content slot |
| `visual_instances[]` | Authored diagrams per modality for P07 | P07[modality] content slot |
| `worked_examples[]` | 2–5 authored complete examples for P10/P11/P12 | P10/P11/P12 content slots |
| `misconceptions[]` | Named misconceptions MC1…MCn with: name, description, trigger signal, conflict_evidence, bridge_text, replacement_text, discrimination_pairs | Schema Repair chain content slots |
| `elicitation_banks[]` | Authored question sets per elicitation type (P34–P48) | E-category content slots |
| `probe_items[]` | 2–5 authored items per probe type (P74–P80) | G-category content slots |
| `transfer_contexts[]` | Cross-domain application scenarios for P76 | P76 content slot |
| `retrieval_items[]` | Retrieval practice items for P88/P56 | H-category content slots |
| `s6_adaptations` | Per-TA delivery adaptations for S6 students | S6 regulation override |
| `s9_adaptations` | Language simplifications + visual-first routing for S9 | S9 protocol modifier |

Minimum viable Blueprint: all `1.1` fields present + `learning_objective` + `diagnostic_battery` + at least one `misconception` + `concrete_instances` + `probe_items`. Everything else makes the Blueprint richer but not blocked.

---

## 2. Composition Process

The following six phases convert KG fields + authored fields into a valid Blueprint.

### Phase 1 — KG Ingestion

Read the 10 KG fields. Derive:

```
cpa_entry_stage:
    difficulty ≤ 2 AND domain ≠ physics: C (start concrete)
    difficulty 3: C or P (start concrete; pictorial accelerated track available)
    difficulty ≥ 4: P (perceptual bridge entry; concrete optional)
    domain = physics AND bloom = Analyse|Evaluate: C (thought experiment still needs anchor)
    domain = english/phonics: C (physical letters/sounds before written symbols)
    domain = english/literature: P (text is the concrete object; P95 at opening)

plausible_student_states:
    difficulty ≤ 2: S0, S3, S6, S9 most common
    difficulty 3: S0, S1, S3, S4, S6 most common
    difficulty ≥ 4: S1, S2, S4, S5, S7 most common
    difficulty 5: S5, S7, S4 dominant

session_cap:
    estimated_hours ≤ 0.5h: max 3 TAs per session
    estimated_hours 0.5–1h: max 5 TAs per session
    estimated_hours ≥ 1h: max 7 TAs per session (PA-3 hard limit)
```

### Phase 2 — Objective and State Design

**Learning Objective (Boundary Statement):**
Write one or more observable behaviours that define the minimum mastery threshold. The test: a person with no teaching experience should be able to read the objective and judge pass/fail from a single student response.

Format: "A student who achieves mastery demonstrates [specific observable behaviour], NOT [commonly confused surrogate behaviour]. A student who [surrogate] without [actual] has NOT achieved mastery."

**Student State Matrix:**
For each plausible state, document:
- Why this state occurs at this concept
- The tell-tale entry behaviour
- Which Protocol serves it

**Diagnostic Battery:**
Write 2–3 questions that classify entry state within 3 questions. Rules:
- DB-1: prior exposure check — routes S0 before any content is tested
- DB-2: representation test — surfaces S1, S2, S3 discriminatorily
- DB-3: confidence calibration — overlays S6 or S7 flag
- Each response branch maps exactly to one state classification
- Maximum 3 questions before routing begins

### Phase 3 — Protocol Architecture

For each student state (or state combination), select a Protocol structure:

```
Protocol selection principles:
    S0: concrete-first protocol (CPA entry: C)
    S1: counterexample-first protocol (exploits schema to expose limits)
    S2: misconception-driven entry (run misconception engine first, then state-matched protocol)
    S3: guided questioning protocol (surfaces partial schema, extends it)
    S4: prerequisite repair first (suspend concept, schedule prereq session)
    S5: abstract-first protocol (formal definition entry)
    S6: analogy/narrative-first protocol (lowest abstraction load)
    S7: challenge-first protocol (counterexample before any confirmation)
    S8: application-first protocol (real-world situation, then principle)
    S9: visual-dominant protocol (P07 heavy, P08 deferred, P13 for narration)
```

Each Protocol specifies:
- Entry condition
- Success exit: the observable signal that allows Protocol exit
- Failure exit: escalation route (which Protocol to try next on failure)
- Estimated duration
- CPA stage at entry

### Phase 4 — Primitive Sequencing

For each Protocol, design the TA sequence using the Teaching Composition Grammar:

1. Apply GR-1: every TA opens with P01 or P02
2. Select input_phase based on CPA stage
3. Select processing_phase (max 3, GR-7)
4. Design elicitation_cycle (primitive + P55, GR-2)
5. Write both branches of response_branch (success and failure paths)
6. Add regulation_tail only where needed
7. Validate against IC-1 through IC-20

### Phase 5 — Content Slot Authoring

Fill every content slot in every primitive with a specific authored value from the `1.2` fields:

```
Content slot filling rules:
    P06[concrete_instance]: draw from concrete_instances[]
    P07[modality, diagram_id]: draw from visual_instances[]
    P08: no content slot — fires only after CPA_stage reaches P
    P10[example]: draw from worked_examples[]
    P34[question, expected_answers[]]: draw from elicitation_banks[type=closed]
    P35[question]: draw from elicitation_banks[type=open]
    P41[question, misconception_ids[]]: draw from diagnostic_battery[] or misconception[].trigger
    P74–P80[probe_item]: draw from probe_items[type=matching]
    P28[conflict_evidence]: draw from misconceptions[id].conflict_evidence
    P30[bridge_text]: draw from misconceptions[id].bridge_text
    P31[replacement_text]: draw from misconceptions[id].replacement_text
    P33[discrimination_pairs]: draw from misconceptions[id].discrimination_pairs
    P76[transfer_context]: draw from transfer_contexts[]
    P56[time_gap]: draw from retrieval schedule (P89 expansion)
    P88[retrieval_item]: draw from retrieval_items[]
```

No content slot value is generated by AI. Every slot value is present in the authored Blueprint before the session begins.

### Phase 6 — Validation

Before a Blueprint is marked `status: READY`, apply all checks:

| Check | Rule |
|---|---|
| V-1 | All 10 KG fields present and non-null |
| V-2 | Learning objective has boundary statement with NOT-clause |
| V-3 | Diagnostic battery has 2–3 questions; all response branches lead to a state |
| V-4 | Every plausible student state has a Protocol |
| V-5 | Every Protocol has a success exit AND a failure exit |
| V-6 | Every TA opens with P01 or P02 (GR-1) |
| V-7 | Every elicitation primitive has P55 following it (GR-2) |
| V-8 | No P08 in session without prior P06 or P07 (GR-3) |
| V-9 | Schema Repair chain not entered without P41/P64 gate (GR-4) |
| V-10 | P28 not present for S6 Protocol (GR-5) |
| V-11 | P91 is terminal; P68 and P62 follow; nothing else (GR-6) |
| V-12 | No > 3 consecutive C-category without E break (GR-7) |
| V-13 | P54 present before high-difficulty first-attempt P35/P42/P44 (GR-8) |
| V-14 | Assessment TAs not first in session (GR-9) |
| V-15 | Named Compounds expanded before IC validation (GR-10) |
| V-16 | All IC-1 through IC-20 pass |
| V-17 | All four AIR invariants pass per every TA |
| V-18 | P90 appears before P91 |
| V-19 | P91 expansion has all 5 probes authored |
| V-20 | P89 retrieval schedule authored with specific interval values |

A Blueprint with any V-check failing is `status: DRAFT`. Only `status: READY` Blueprints are loaded by the engine.

---

## 3. Output — The Teaching Package

A completed Blueprint produces a self-contained teaching package with the following components. No component requires runtime AI authoring.

| # | Component | Contents | Primitive References |
|---|---|---|---|
| 0 | Concept Profile | concept_id, name, domain, difficulty, bloom, prerequisites, mastery_threshold | KG fields |
| 1 | Learning Objective | Boundary statement with observable criterion and NOT-clause | P91 gate |
| 2 | Student State Matrix | S0–S9 rationale, entry behaviour, Protocol pointer | Protocol routing |
| 3 | Diagnostic Battery | 2–3 questions with complete response taxonomy and state routing | P41 × 3 |
| 4 | Prerequisite Check | 1–3 gap-detection questions with minimum in-session repair instructions | P41[prereq] |
| 5 | Protocol Library | One Protocol per student state; each with: entry condition, TA sequence, success/failure exit, CPA stage, duration estimate | Grammar §3 |
| 6 | Misconception Engine | Named MCs with: trigger signal, authored P26/P27/P28/P30/P31/P32/P33 content, S6-safe path | Grammar §6 |
| 7 | CPA Visual Sequence | Ordered visual assets per CPA stage with modality labels and introduction timing rules | Grammar §4 |
| 8 | Assessment Battery | 2–5 items per probe type (P74–P80), ordered by Bloom level | Grammar §7 |
| 9 | Mastery Gate | P91 expansion: 5 authored probe items in canonical order P77→P76→P75→P74→P78 | Grammar §7.3 |
| 10 | Retrieval Schedule | P89 expansion: 5-interval schedule with authored retrieval items per interval | Grammar §8.2 |
| 11 | S6 Adaptation Layer | Per-TA delivery overrides for low-confidence routing; replaces P28 with P30 | GR-5 |
| 12 | S9 Adaptation Layer | Language simplifications, visual-first routing rules, P13 narration triggers | Protocol modifier |

**Package completeness signal:** A Blueprint emits `PACKAGE_READY` when components 0–9 are present and all V-checks pass. Components 11–12 are required only if S6/S9 are in the plausible state set.

---

## 4. Universal Pipeline

```
┌────────────────────────────────────────────────────────────────────────┐
│                          KNOWLEDGE GRAPH                               │
│  concept_id · name · domain · difficulty · bloom · prerequisites[]    │
│  mastery_threshold · cross_links[] · estimated_hours · description    │
└──────────────────────────────┬─────────────────────────────────────────┘
                               │ KG fields (10 fields)
                               ▼
┌────────────────────────────────────────────────────────────────────────┐
│                       TEACHING BLUEPRINT                               │
│  Learning Objective · Student State Matrix · Diagnostic Battery       │
│  Protocol Library · Misconception Engine · CPA Visual Sequence        │
│  Assessment Battery · Mastery Gate · Retrieval Schedule               │
│  S6/S9 Adaptations                                                    │
│  Status: DRAFT → READY (all 20 V-checks pass)                        │
└──────────────────────────────┬─────────────────────────────────────────┘
                               │ Protocol pointer (from student state)
                               ▼
┌────────────────────────────────────────────────────────────────────────┐
│                       TEACHING PROTOCOL                                │
│  [Selected for student's entry state]                                 │
│  diagnostic_ta → concept_ta+ → consolidation_ta? → assessment_ta     │
│  → mastery_close                                                       │
└──────────────────────────────┬─────────────────────────────────────────┘
                               │ TA selection (current state + CPA stage)
                               ▼
┌────────────────────────────────────────────────────────────────────────┐
│                       TEACHING ACTIONS                                 │
│  TA-1: opening → input_phase → processing_phase → elicitation_cycle  │
│  TA-2: opening → elicitation_cycle → response_branch                 │
│  TA-N: [selected by engine from protocol, based on prior signal]      │
└──────────────────────────────┬─────────────────────────────────────────┘
                               │ Primitive sequence + content slots
                               ▼
┌────────────────────────────────────────────────────────────────────────┐
│                    PRIMITIVE COMPOSITION                               │
│  P01 → P06[concrete_instance] → P14 → P34[question] → P55 → P49     │
│  [All content slots filled from Blueprint authored fields]            │
│  [Validated against IC-1–IC-20 and AIR-1–AIR-5]                     │
└──────────────────────────────┬─────────────────────────────────────────┘
                               │ Voiced by AI (Voice Renderer)
                               ▼
┌────────────────────────────────────────────────────────────────────────┐
│                     STUDENT INTERACTION                                │
│  Student receives: voiced primitive sequence                          │
│  Student produces: natural language response                          │
│  Response Classifier: maps response → {CORRECT, INCORRECT,           │
│  MISCONCEPTION:MC-ID, PARTIAL, NO_RESPONSE, STATE_UPGRADE}           │
└──────────────────────────────┬─────────────────────────────────────────┘
                               │ Response signal
                               ▼
┌────────────────────────────────────────────────────────────────────────┐
│                          EVIDENCE                                      │
│  Signal appended to EvidenceRecord[concept_id, student_id]           │
│  CORRECT: +evidence weight                                            │
│  INCORRECT: −evidence weight + error_attribution                     │
│  MISCONCEPTION: +MC-ID to active_misconceptions[]                    │
│  StudentMemory updated: CPA_stage, confidence, last_probe_results    │
└──────────────────────────────┬─────────────────────────────────────────┘
                               │ Accumulated evidence → threshold check
                               ▼
┌────────────────────────────────────────────────────────────────────────┐
│                          MASTERY                                       │
│  Conditions M1–M5 all true:                                           │
│  M1: P90 passed · M2: P91 all 5 probes CORRECT · M3: CPA_stage = A  │
│  M4: no active misconceptions · M5: confidence calibrated            │
│  → P68 (self-declaration) → P62 (schedule retrieval) → KG unlock     │
└────────────────────────────────────────────────────────────────────────┘
```

Every stage in this pipeline is deterministic, except the Voice Renderer (AI voices the composition) and the Response Classifier (AI categorises the student's response into a pre-authored taxonomy). Those two AI roles are the full extent of AI involvement.

---

## 5. Three Complete Blueprint Examples

Each example is a **complete Blueprint specification** for that concept — not a summary.

---

### 5.1 Fractions — `math.num.fractions`

**KG Fields (derived or approximated):**

| Field | Value |
|---|---|
| `concept_id` | `math.num.fractions` |
| `domain` | Number Systems |
| `difficulty` | 3 |
| `bloom` | Understand → Apply |
| `prerequisites` | `math.num.whole-numbers`, `math.num.division-basic` |
| `mastery_threshold` | 0.80 |
| `estimated_hours` | 1.5 |
| `cross_links` | `math.num.decimals`, `math.num.percentages`, `math.alg.ratio` |

**Learning Objective (Boundary Statement):**

A student who achieves mastery demonstrates: (1) correctly identifies that 2/4 and 1/2 are equal by reasoning about equal parts — not by applying a reduction rule; (2) correctly compares 3/8 and 1/2 by converting to a common denominator, explaining why comparison requires equal-sized parts; (3) correctly classifies 5/5 as equal to 1 by recognising that all parts together equal one whole.

A student who can "simplify fractions" mechanically but cannot explain why 2/4 = 1/2 has **NOT** achieved mastery. The mechanical rule without conceptual grounding propagates into all downstream ratio, proportion, and algebra work.

**Student State Matrix:**

| State | Why here | Tell-tale behaviour |
|---|---|---|
| S0 | No exposure to fraction notation | Cannot interpret 3/4 in any context |
| S1 | "Top divided by bottom" schema | Applies fraction as division only; cannot use in comparison |
| S2-BIGGER-DENOM | Believes 1/8 > 1/2 because 8 > 2 | Sorts fractions by denominator size; fails any comparison |
| S2-MORE-PIECES | Believes more pieces always means more — not accounting for piece size | Says 3/4 > 2/3 because 3 > 2 |
| S3 | Has partial correct schema — knows "out of" but not equal-part constraint | Can use simple fractions; fails when piece sizes vary |
| S6 | Math anxiety triggered by fraction notation | Freezes when shown a/b format; disengages |
| S8 | Adult learner — wants practical fractions (cooking, measurement) | Motivated by application; impatient with manipulatives |

**Diagnostic Battery:**

```
DB-1: "Have you seen fractions — like 1/2 or 3/4 — in maths class before?"
    No → S0. Enter Protocol A (Concrete Objects).
    Yes → DB-2.

DB-2: "Which is bigger: 1/8 or 1/2?"
    "1/8 because 8 is bigger" → SIGNAL:MISCONCEPTION:MC-BIGGER-DENOM. Enter Misconception Engine.
    "1/2, because..." (cites equal parts or more of the whole) → S3. Enter Protocol C.
    "1/2" (no explanation) → clarify: "How do you know?" → if correct reason → S3 | if "just know" → S1.
    Pause / "I don't know" → add S6 flag. Ask: "Are you comfortable with maths generally?"
        No → S6. Enter Protocol F.
        Yes → S0. Enter Protocol A.

DB-3: "How confident are you about fractions — 1 to 5?"
    1–2 → add S6 flag.
    4–5 + DB-2 showed BIGGER-DENOM → add S7 flag. Override to Protocol G (challenge-first).
```

**Named Misconceptions:**

```
MC-BIGGER-DENOM: "A bigger denominator means a bigger fraction"
  trigger_signal: student compares fractions by denominator size alone
  conflict_evidence: "You have a pizza cut into 8 slices. I have a pizza cut into 2 slices.
                      If you take 1 slice and I take 1 slice, who has more pizza?"
  bridge_text: "The denominator tells you how many equal parts the whole is cut into.
                More cuts means each part is smaller. So a bigger denominator means
                each piece is smaller — not bigger."
  replacement_text: "To compare fractions, pieces must be the same size — that is what a
                     common denominator achieves."
  discrimination_pairs: ["1/8 vs 1/2: same whole, different cuts", "3/8 vs 3/4: same number of pieces, different sizes"]
  s6_path: skip P28; go directly to bridge_text via P30

MC-MORE-PIECES: "More pieces = more, regardless of piece size"
  trigger_signal: student claims 3/4 > 2/3 citing only numerators
  conflict_evidence: "If I cut a chocolate bar into 4 pieces and give you 3, vs.
                      cutting it into 3 pieces and giving you 2 — which gives you more chocolate?"
  bridge_text: "Three-quarters means 3 of 4 equal parts. Two-thirds means 2 of 3 equal parts.
                The pieces are different sizes — you cannot compare the counts directly."
  replacement_text: "Equal-sized parts are required before comparing fractions."
```

**Protocol A (S0) — Primitive Sequence:**

```
[TA-1: Concrete Entry]
P01
→ P04[content: "We're going to share things — and figure out how to describe the shares fairly"]
→ P06[content: a chocolate bar — student physically describes halving]
→ P34[question: "If two people share this bar equally, what does each person get?"] → P55
→ success_path → P49 → P05[curiosity: "What if we had three people? Or seven?"]

[TA-2: Naming the Parts]
P02
→ P06[content: paper strip folded into 4 equal pieces]
→ P13[think-aloud: "I fold the strip into 4 equal parts. Each part is 1 out of 4.
                     In maths, we write that as 1/4 — the bottom number is how many parts,
                     the top number is how many we're using."]
→ P08[notation: 1/4, 2/4, 3/4, 4/4]
// GR-3 satisfied: P06 (concrete) and P13 preceded P08
→ P34[question: "Shade 3 of the 4 parts. What fraction is shaded?"] → P55
→ success_path → P49

[TA-3: Equivalence — Key Insight]
P02
→ P06[content: two identical strips — one folded into 2, one into 4]
→ P14[predict: "Which strip has larger pieces — the one with 2 folds or 4 folds?"] → P55
→ success_path → P15[observe: "Shade 1/2 on the first strip. Shade 2/4 on the second."]
→ P17[contrast: "Look at the shaded regions. What do you notice?"] → P55
→ success_path → P21[generalise: "1/2 and 2/4 cover the same amount — even though the numbers look different.
                                    What does that tell you about comparing fractions?"] → P55

[TA-4: Comparison — Size of Parts]
P02
→ P41[diagnostic: "Which is bigger: 1/8 or 1/2?"] → P55
→ [if MC-BIGGER-DENOM] → misconception_repair_chain[MC-BIGGER-DENOM]
→ [if correct] → P49 → P36[probe: "Why?"] → P55

[TA-5: Formative Assessment]
P02
→ P90_expansion:
    P74[classify: "Is 4/4 the same as 1? Why?"] → P55
    → P49 → P51[diagnose reasoning: concrete or abstract?]
    → P35[open: "Explain 3/4 without using the words 'out of' or 'divided by'"] → P55

[TA-6: Mastery Gate]
P02
→ P91_expansion:
    P77[generate: "Invent two different fractions that are equal to 1/2"] → P55 → CORRECT
    → P76[transfer: "A recipe calls for 3/6 of a cup of sugar. Is that the same as 1/2 a cup?"] → P55 → CORRECT
    → P75[boundary: "Can you have a fraction greater than 1? Give an example."] → P55 → CORRECT
    → P74[classify: "Is 6/6 a function? No — is 6/6 equal to 1?"] → P55 → CORRECT
    → P78[explain: "Tell me in your own words: what makes two fractions equal?"] → P55 → CORRECT
→ P68 → P62[schedule: first retrieval in 2 days]
```

---

### 5.2 Newton's First Law — `phys.mech.newtons-first-law`

**KG Fields:**

| Field | Value |
|---|---|
| `concept_id` | `phys.mech.newtons-first-law` |
| `domain` | Classical Mechanics |
| `difficulty` | 4 |
| `bloom` | Understand → Analyse |
| `prerequisites` | `phys.mech.force-basics`, `phys.mech.velocity` |
| `mastery_threshold` | 0.85 |
| `estimated_hours` | 1.0 |
| `cross_links` | `phys.mech.newtons-second-law`, `phys.mech.friction`, `phys.mech.inertia` |

**Learning Objective:**

A student who achieves mastery correctly predicts the motion of an object when the net force is zero — in contexts with and without visible forces. They must explain the prediction by citing the absence of net force, NOT by citing friction, gravity, or other forces as "keeping the object still." A student who says "the object stays still because nothing is pushing it" has NOT achieved mastery — they have restated Aristotelian impetus theory.

**Dominant Misconception:**

```
MC-IMPETUS: "Moving objects need a force to keep moving"
  (Aristotelian impetus — the most persistent physics misconception at this level)
  trigger_signal: student says "it will slow down and stop" when asked about frictionless motion,
                  OR says "something must be pushing it" to explain constant velocity
  conflict_evidence: [P92 — Thought Experiment] "Imagine a hockey puck sliding on perfectly
                      frictionless ice in empty space. No air. No friction. No gravity.
                      Nothing touching it. What does it do?"
  bridge_text: "Newton's key insight: a net force of zero does NOT mean the object stops.
                It means the object's motion does not CHANGE. Constant velocity (including zero)
                needs no force to maintain it."
  replacement_text: "Objects change velocity only when net force is non-zero.
                     Constant velocity — including rest — is the natural state, not the exceptional one."
  discrimination_pairs: ["puck on frictionless ice (constant v) vs puck on rough floor (decelerating)",
                         "book on table (net force = 0, v = 0) vs book in free fall (net force ≠ 0)"]
  physics_primitive: P92 is the mandatory primitive for the conflict step — thought experiment
                     must precede any diagram or equation for this misconception
  s6_path: replace P92[open space] with P92[car seat when braking — familiar inertia sensation]
```

**Diagnostic Battery:**

```
DB-1: "Have you come across the idea of inertia or Newton's Laws in class?"
    No → S0. Enter Protocol A (Concrete — everyday motion scenarios).
    Yes → DB-2.

DB-2: "A hockey puck slides across perfectly frictionless ice in empty space. No air, no friction.
       What happens to it after 1 minute? After 10 minutes?"
    "Slows down and stops" → SIGNAL:MISCONCEPTION:MC-IMPETUS. Enter Misconception Engine.
    "Keeps moving forever at the same speed" → S3 or S5. Proceed to DB-3.
    "Depends on..." [looks for force source] → S1 (procedure-matching). Enter Protocol B.
    No response → S0 or S6. Ask confidence question → route.

DB-3: "Why does it keep moving? What force is keeping it going?"
    "No force is needed — it keeps moving because nothing changes it" → S5. Protocol H (Formal).
    "The force from the initial push" → MC-RESIDUAL-FORCE (secondary MC). Protocol B with MC engine.
    "I'm not sure" → S3. Protocol C (Guided Questioning).
```

**Protocol A (S0) — Primitive Sequence:**

```
[TA-1: Everyday Motion Anchor]
P01
→ P04[content: "Think about pushing a shopping trolley. What happens when you stop pushing?"]
→ P34[question: "Does it keep moving or stop immediately?"] → P55
→ success_path → P49
→ P35[open: "Why does it slow down?"] → P55
→ success_path[student says: friction / ground / resistance]
→ P05[curiosity: "What if there were no friction at all?"]

[TA-2: Thought Experiment — No Friction World]
P02
→ P92[thought_experiment: "Imagine a puck on perfectly frictionless ice in empty space.
                             Nothing touching it. No air. No gravity. You gave it one push.
                             What does it do? Describe its motion 1 minute later, 10 minutes later,
                             1 year later."]
// P92 is mandatory here — Physics domain, thought experiment about idealized scenario
→ P54 // This is novel and counterintuitive — productive struggle is expected
→ P35[question: "What is your best prediction?"] → P55
→ [if INCORRECT: "slows down"] → failure_path → P50 → P15[observe: "In space, the Voyager probe
                                                              has been moving for 46 years with
                                                              no engine. It has not stopped."]
→ P17[contrast: trolley on floor vs. puck in space] → P55

[TA-3: Naming the Pattern]
P02
→ P21[generalise from both scenarios: "What is the common pattern between rest and constant velocity?"]
→ P55 → success_path
→ P13[think-aloud: "Both are states where velocity is NOT changing. Newton called this the
                    natural state — no net force needed to maintain it. Force only changes velocity."]
→ P08[notation: ΣF = 0 ⟹ a = 0 ⟹ v = constant]
// P08 after P92 + P15 satisfy GR-3

[TA-4: Misconception Probe]
P02
→ P41[diagnostic: "A book sits still on a table. Is there a net force on it?"] → P55
→ [if "no force" or "gravity but table pushes back"] → S3/correct → P49 → P36[probe: "Why does it not move?"] → P55
→ [if "yes, gravity"] → partial MC → P50 → P51 → P30[bridge: "Gravity pulls down. Table pushes up.
                                                            Net force = 0. Net force, not individual forces,
                                                            is what determines motion change."]

[TA-5: Formative Assessment]
P02
→ P90_expansion:
    P79[predict: "A rocket engine turns off in deep space. What does the rocket do?"] → P55
    → P49 → P51[check if they cited net force = 0 or just "no friction"] → P35 → P55

[TA-6: Mastery Gate]
P02
→ P91_expansion:
    P77[generate: "Invent a scenario where Newton's First Law is violated"] → P55 → [expects: "can't — it's a law"]
    → P76[transfer: "Passengers lurch forward when a bus brakes hard. Explain using Newton's First Law."] → P55 → CORRECT
    → P75[boundary: "Does Newton's First Law apply when friction is present?"] → P55 → CORRECT
    → P74[classify: "Net force on a car travelling at constant speed on a straight road: zero or non-zero?"] → P55 → CORRECT
    → P78[explain: "State Newton's First Law and explain why it was revolutionary."] → P55 → CORRECT
→ P68 → P62[schedule: 3 days]
```

---

### 5.3 Letter-Sound Correspondence — `eng.phon.letter-sound-correspondence`

**KG Fields:**

| Field | Value |
|---|---|
| `concept_id` | `eng.phon.letter-sound-correspondence` |
| `domain` | Phonics |
| `difficulty` | 2 |
| `bloom` | Remember → Apply |
| `prerequisites` | `eng.phon.phoneme-awareness`, `eng.phon.print-concepts` |
| `mastery_threshold` | 0.90 |
| `estimated_hours` | 0.5 per letter cluster; full alphabet requires multiple sessions |
| `cross_links` | `eng.phon.blending`, `eng.phon.segmenting`, `eng.vocab.sight-words` |

**Learning Objective:**

A student who achieves mastery correctly produces the most common sound for a given grapheme (letter or letter combination) on first attempt, without sounding out using letter names. They must use phoneme sounds (/b/, /æ/, /t/) NOT letter names (bee, ay, tee). A student who says "bee-ay-tee" instead of /b/-/æ/-/t/ when decoding "bat" has NOT achieved mastery — they are using letter names as an intermediate step, which fails at decoding speed and at multi-grapheme words.

**Key Challenge (not a misconception — a developmental stage):**

```
DC-PHONEME-IDENTITY: Phoneme-grapheme mapping is not 1:1
  description: English has ~44 phonemes but 26 letters; most letters have
               multiple sounds; some sounds have multiple spellings
  teaching_implication: "Learn the most common sound first" not "learn the rule"
  primary_primitive: P93 (TEMPORAL SEQUENCE ASSEMBLY) — phoneme blending is inherently temporal;
                     sounds must be produced in sequence and held simultaneously
  authoring_rule: P93 is mandatory in every TA that involves blending or segmenting
```

**Student State Matrix:**

| State | Why here | Tell-tale behaviour |
|---|---|---|
| S0 | Pre-reader — no letter-sound connections | Cannot produce any phoneme sound from a grapheme |
| S1 | Knows letter names but not phoneme sounds | Says "bee" for 'b' not /b/ |
| S3 | Knows some sounds; inconsistent at novel graphemes | Decodes familiar words; fails new ones |
| S6 | Reading anxiety; fear of "getting sounds wrong" | Refuses to attempt unfamiliar graphemes |
| S9 | Different first language; phoneme set differs | Substitutes L1 phonemes for unfamiliar English phonemes |

**Diagnostic Battery:**

```
DB-1: "Can you show me what sound this letter makes?" [Show card: 'b']
    Produces /b/ sound correctly → S3. Proceed to DB-2.
    Says "bee" (letter name) → S1. Enter Protocol B (Phoneme Introduction).
    No attempt → add S6 flag. Ask: "Have you done reading in school?"
        Yes → S6. Enter Protocol F (Low Pressure).
        No → S0. Enter Protocol A.

DB-2: "Can you blend these sounds to make a word?" [Slowly say: /k/ ... /æ/ ... /t/]
    Blends correctly to "cat" → S3 (sounds present; may not generalise). Protocol C.
    Cannot blend (knows sounds but not sequential assembly) → S3-blending-gap. Protocol D (Blending Focus).
    Produces a different word → S9 check: is this a phoneme substitution from L1?

DB-3: "How do you feel about reading — do you enjoy trying new words?"
    Hesitates; says "not really" → S6 flag confirmed. Add S6 adaptations to selected protocol.
```

**Named Challenge (Phonics uses developmental challenges, not misconceptions):**

```
DC-LETTER-NAME-INTERFERENCE: Student uses letter names instead of phoneme sounds
  trigger_signal: student produces letter name ("bee") not phoneme sound (/b/)
  intervention: NOT schema repair — this is not a misconception, it is a missing distinction
  teaching_move: explicit labelling of difference: "The NAME of this letter is 'bee.'
                 The SOUND it makes in words is /b/ — like the beginning of 'bat' and 'ball'."
  primitive_used: P17 (CONTRAST) — contrast the letter name with the letter sound
  followed_by: P93 (TEMPORAL SEQUENCE ASSEMBLY) to practice producing /b/ in a blend
```

**Protocol A (S0) — Primitive Sequence:**

```
[TA-1: Concrete Sound Anchor]
P01
→ P06[content: physical letter card 'b' + picture of a ball on the reverse]
→ P13[think-aloud: "This letter's sound is /b/ — watch my mouth: /b/.
                    It's the sound at the start of 'ball' and 'bat.'"]
→ P34[question: "What sound does this letter make?"] → P55
→ success_path → P49

[TA-2: Phoneme Production Practice]
P02
→ P88[retrieval: "What sound?"] [Show card] → P55
// P88: No scaffolding — test retrieval under recall conditions
→ success_path → P49
→ failure_path → P50 → P52[narrow: "Think of the word 'ball' — what sound comes first?"] → P55 → re-elicit

[TA-3: Blending — Temporal Assembly]
P02
→ P93[temporal_sequence: /b/ pause /æ/ pause /t/ — three phonemes sequenced auditorily]
// P93 is mandatory — blending is inherently temporal; sounds are assembled in time, not space
→ P54 // S0: first blending attempt; productive struggle expected
→ P35[question: "What word did those sounds make?"] → P55
→ success_path → P49 → P53[elaborate: "Say the sounds again, but faster this time"]
→ failure_path → P50 → P81[scaffold: slow the phoneme delivery further] → repeat P93 → P35 → P55

[TA-4: Generalisation to New Word]
P02
→ P93[new blend: /k/ ... /æ/ ... /t/ — same vowel, different consonant]
→ P35[question: "What word?"] → P55
→ success_path → P21[generalise: "You used the sounds you know to figure out a brand new word.
                                   That is exactly what reading is."]

[TA-5: Formative Assessment]
P02
→ P90_expansion:
    P74[classify: show card 'd' — "Is this letter's sound /b/ or /d/?"] → P55
    → P49 → P51[listen for: confusion of b/d — common reversal issue] → P35 → P55

[TA-6: Mastery Gate]
P02
→ P91_expansion:
    P77[generate: "Name three words that start with the /b/ sound"] → P55 → CORRECT
    → P76[transfer: "In the word 'cab' — where is the /b/ sound? Beginning or end?"] → P55 → CORRECT
    → P75[boundary: "Does 'phone' start with the /f/ sound?"] → P55
         // Tests that letter-sound is about sound, not spelling — 'ph' makes /f/
    → P74[classify: show cards 'b' 'd' 'p' — student produces correct phoneme for each] → P55 → CORRECT
    → P78[explain: "Tell me in your own words: what's the difference between a letter's name
                    and its sound?"] → P55 → CORRECT
→ P68 → P62[schedule: 1 day — phonics requires high-frequency retrieval]
```

---

## 6. AI Removal Test

### 6.1 What the Educational Brain Decides (Deterministic)

These operations are pre-determined by the Blueprint. The AI makes no decision here.

| Decision | Pre-determined by |
|---|---|
| Which Protocol to use | Student entry state from Diagnostic Battery routing |
| Which TA to execute | Protocol sequence + prior response signal |
| Which primitives to fire | TA authored primitive sequence |
| What content to deliver | Blueprint authored content slots (filled from KG assets) |
| What response categories exist | Pre-authored response taxonomy per elicitation primitive |
| Which branch to take | Response signal × student state × CPA stage decision table |
| Whether to enter Schema Repair | P41/P64 gate signal (binary) |
| Which misconception to repair | MC-ID in SIGNAL:MISCONCEPTION |
| Whether P28 is allowed | S6 flag (binary check) |
| When P91 fires | After M1 and M2 conditions met (deterministic count) |
| When to schedule retrieval | After P91 passes; P89 interval is authored |
| When to unlock downstream KG nodes | After M1–M5 all true (deterministic gate) |

### 6.2 What the AI Does

These two operations are the only AI involvement in execution:

**Voice Renderer:** Receives the authored primitive sequence with filled content slots. Produces natural language delivery. It does not choose what to say — it chooses how to say a pre-specified composition.

Input: `P06[content: "a chocolate bar broken into 4 equal pieces"] → P34[question: "What fraction of the bar is one piece?"]`  
Output: [AI-generated spoken sentence conveying this — style, pacing, warmth chosen by AI; content determined by Blueprint]

**Response Classifier:** Receives the student's natural language response. Maps it to one category from the pre-authored response taxonomy.

Input: student says "it's 1/4 because there are four equal bits"  
Output: `SIGNAL:CORRECT` (matched against authored taxonomy entry: "Correct if student cites '4 equal parts' or equivalent")

The Classifier does not evaluate quality of reasoning. It matches to a pre-defined category. If the response does not match any category, it returns `SIGNAL:PARTIAL` and the elaboration_path fires.

### 6.3 What Remains AI-Dependent

These operations still require AI reasoning beyond pattern matching. They represent the current boundary of the AI Removal Test:

| Operation | Why AI Is Still Needed | Resolution Path |
|---|---|---|
| PARTIAL response categorisation | "I think it's 1/4 because... maybe?" — mapping this to CORRECT vs. PARTIAL requires language understanding | Author additional taxonomy entries for ambiguous phrasings |
| Multi-turn context holding | The classifier sees one response at a time; complex multi-sentence responses need context | Author response taxonomy entries per TA, not per concept globally |
| S9 phoneme error identification | Distinguishing L1 phoneme substitution from random error requires language knowledge | Author S9 error taxonomy per phoneme for each target language pair |
| Confidence calibration matching | P64 matches stated confidence against accuracy — requires counting prior responses | Move to deterministic counter in StudentMemory; eliminate AI from this operation |
| Voice Renderer pacing | How long to pause, when to slow down — judgement call | Author pace parameters into regulation_tail (P85 already does this) |

The direction of travel is clear: each remaining AI dependency can be eliminated by authoring more taxonomy entries, more authored parameters, or moving state to StudentMemory. The AI Removal Test is a completion metric, not a fixed property.

---

## 7. Missing Knowledge

### 7.1 Per-Concept Authoring Requirements

For every KG concept to have a valid Blueprint, the following must be authored. This is the full authoring backlog:

| Field | Count per concept | Notes |
|---|---|---|
| Learning objective | 1 | With boundary statement and NOT-clause |
| Student state matrix | 4–7 states | Only plausible states for difficulty |
| Diagnostic battery | 2–3 questions | With complete response taxonomy |
| Prerequisite checks | 1–3 questions | One per direct prerequisite |
| Concrete instances | 3–5 examples | Including alternative for S9 |
| Visual instances | 2–4 diagrams | Per modality (table, diagram, graph, etc.) |
| Worked examples | 2–5 | Including partial and faded versions |
| Named misconceptions | 2–6 per concept | With all 5 content slots per MC |
| Elicitation banks | 5–10 per type | P34 bank, P35 bank, etc. |
| Probe items | 3–5 per probe type | P74–P80 = up to 35 items |
| Transfer contexts | 2–3 | From cross_links[] in KG |
| Retrieval items | 5–10 | Across 5 intervals |

**Total authoring estimate:**

| Subject | Concepts | Min authored items per concept | Total items |
|---|---|---|---|
| Mathematics | 908 | ~80 | ~72,600 |
| Physics | 194 | ~75 | ~14,550 |
| English | 216 | ~70 | ~15,120 |
| **All subjects** | **1,318** | **~78 avg** | **~102,800** |

This is the authoring scale the Educational Brain must reach for full coverage. The Function Concept Reference Implementation represents 1 of 1,318 completed Blueprints.

### 7.2 Systematic Gaps

**Gap 1 — Misconception Database not yet authored.**  
Each named misconception needs: trigger signal, conflict evidence, bridge text, replacement text, discrimination pairs, S6 path. This is the highest-leverage authoring task — a single misconception (e.g., MC-IMPETUS for physics) appears across multiple concepts (Newton 1, 2, 3, work-energy theorem, orbital mechanics). Authoring it once and referencing by ID across all relevant Blueprints reduces total authoring volume significantly.

**Gap 2 — Visual Asset Catalogue not yet populated.**  
Every P07 instance requires an authored diagram. For 1,318 concepts × 2–4 diagrams = 2,600–5,200 visual assets required. The Visual Asset Model (ADR 12) specifies the identity schema; population is blocked on that schema being authorised.

**Gap 3 — Cross-concept transfer items not yet authored.**  
P76 (Transfer Probe) requires a cross-domain scenario drawn from `cross_links[]`. For most concepts, these links exist in the KG but the authored scenarios do not. These cannot be auto-generated from the KG — they require understanding of how concepts interact.

**Gap 4 — Response taxonomy not yet authored per elicitation.**  
Every P34, P35, P41 in every Blueprint requires an authored response taxonomy with 3–6 categories. Without these, the Response Classifier cannot make deterministic decisions. This is the blocking gap for AI Removal.

**Gap 5 — S9 phoneme error taxonomy not yet authored.**  
For English phonics concepts, the S9 adaptation requires a phoneme substitution map per source language. This requires linguistic knowledge of L1 interference patterns for each major learner population.

**Gap 6 — Retrieval item banks not yet authored.**  
P88 (Retrieval Practice) requires items authored to test conditions — no scaffolding, no hints. These are distinct from formative assessment items and require separate authoring.

**Gap 7 — Blueprint validation tooling does not exist.**  
The 20 V-checks are specified but not automated. Currently a Blueprint author must check V-1 through V-20 manually. Until this is automated, V-check errors will propagate.

### 7.3 Path to Full Coverage

The gaps above define the authoring roadmap in priority order:

```
Priority 1: Cross-concept misconception database
            Author each unique misconception once; reference by MC-ID across all affected concepts.
            Estimate: ~200 unique misconceptions across 1,318 concepts.

Priority 2: Response taxonomy per elicitation primitive
            Blocks AI Removal Test completion.
            Estimate: ~5,000 taxonomy entries (avg 4 per elicitation × 3–4 elicitations per concept).

Priority 3: Probe item banks (P74–P80)
            Required for P90 and P91. Without these, mastery gate cannot fire.
            Estimate: ~9,000 probe items (7 probe types × 3 items × 430 priority concepts).

Priority 4: Concrete and visual instance catalogue
            Required for CPA-stage-correct protocol execution.
            Estimate: ~5,000 authored examples + ~4,000 diagram assets.

Priority 5: Blueprint validation automation
            Eliminates V-check errors before engine receives a Blueprint.
            Enables authoring at scale (detect errors early).
```

Full Blueprint coverage is not a prerequisite for launch. The Teaching Engine can serve concepts with partial Blueprints by falling back to Voice Renderer improvisation for unfilled content slots — the AI Removal Test then partially fails for those concepts, which is an acceptable temporary state. Coverage grows as authoring proceeds.

---

## Appendix A — Blueprint Template

The following is the empty authoring scaffold. Every new Blueprint begins here.

```markdown
# Teaching Blueprint: [concept_id]

## 0. Concept Profile
concept_id: 
name: 
domain: 
difficulty: 
bloom: 
prerequisites: []
mastery_threshold: 
estimated_hours: 
cross_links: []
status: DRAFT

## 1. Learning Objective
[Boundary statement]
A student who achieves mastery demonstrates:
1. 
2. 
3. 
A student who [surrogate behaviour] has NOT achieved mastery because: [reason]

## 2. Student State Matrix
| State | Why here | Tell-tale behaviour | Protocol |
|---|---|---|---|
| S0 | | | |
| ... | | | |

## 3. Diagnostic Battery
DB-1: [question]
  [response] → [state] → [action]

DB-2: [question]
  [response] → [state] → [action]

DB-3: (confidence calibration)
  1–2 → S6 flag
  4–5 + [incorrect in DB-2] → S7 flag

## 4. Prerequisite Check
PD-1: [question for prerequisite_id]
  [cannot answer] → flag PREREQ-GAP-[ID] → [in-session minimum repair instruction]

## 5. Protocol Library
### Protocol A — [name]
Serves: [states]
CPA entry: [C|P|A]
Entry condition: [observable]
Success exit: [observable signal]
Failure exit: Escalate to Protocol [X]
Duration: [estimate]

[TA-1: Name]
[primitive sequence]

...

## 6. Misconception Engine
### MC-[ID]: "[Name]"
trigger_signal: 
conflict_evidence: 
bridge_text: 
replacement_text: 
discrimination_pairs: []
s6_path: 

## 7. CPA Visual Sequence
| CPA Stage | Modality | diagram_id | Introduction timing |
|---|---|---|---|
| C | | | |
| P | | | |
| A | | | |

## 8. Assessment Battery
| Probe | Item | Expected signal |
|---|---|---|
| P74 | | |
| P75 | | |
| P76 | | |
| P77 | | |
| P78 | | |

## 9. Mastery Gate (P91 expansion)
P77: [generation item] → expected: CORRECT
P76: [transfer item] → expected: CORRECT
P75: [boundary item] → expected: CORRECT
P74: [classification item] → expected: CORRECT
P78: [explanation item] → expected: CORRECT

## 10. Retrieval Schedule (P89 expansion)
Interval 1 (1 day): [retrieval item]
Interval 2 (3 days): [retrieval item]
Interval 3 (7 days): [retrieval item]
Interval 4 (21 days): [retrieval item]
Interval 5 (60 days): [retrieval item]

## 11. S6 Adaptation Layer (if applicable)
[Per-TA delivery overrides]

## 12. S9 Adaptation Layer (if applicable)
[Language simplifications; visual routing; phoneme notes]

---
V-check status: [ ] V-1 through V-20 all PASS
status: DRAFT → READY
```

---

## Appendix B — Primitive Eligibility by Subject

Not all primitives are available to all subjects. This table governs authoring.

| Primitive | Mathematics | Physics | English |
|---|---|---|---|
| P06 CONCRETE EMBODIMENT | ✓ (manipulatives, objects) | ✓ (physical demonstrations) | ✓ (physical letter cards, objects) |
| P07 PERCEPTUAL REPRESENTATION | ✓ (graphs, tables, diagrams) | ✓ (vector diagrams, force arrows) | ✓ (text, word cards, phoneme grids) |
| P08 ABSTRACT NOTATION | ✓ (symbols, equations) | ✓ (equations, formulae) | ✓ (IPA notation, written words) — deferred in phonics |
| P92 THOUGHT EXPERIMENT | Situational | **Primary** (mandatory for many physics concepts) | — |
| P93 TEMPORAL SEQUENCE ASSEMBLY | — | Situational (wave phenomena) | **Primary** (phonics blending — mandatory) |
| P94 CONTEXTUAL INFERENCE | — | — | **Primary** (vocabulary meaning from context) |
| P95 INTERPRETIVE FRAME | — | Situational (theoretical frameworks) | **Primary** (literature: multiple valid readings) |
