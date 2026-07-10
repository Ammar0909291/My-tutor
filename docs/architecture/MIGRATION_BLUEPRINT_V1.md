# Educational Brain Migration Blueprint — V1

**Purpose**: Convert My Tutor from a system where AI invents everything  
into a retrieval-driven tutor where the Educational Brain is the primary  
source of intelligence and the AI renders surface wording only.

**Constraint**: No rewrites. No parallel engines. Every phase reuses  
existing code, existing curriculum, existing authored knowledge.  
Each phase independently improves teaching quality.

**Horizon**: Two weeks to real improvement for Mathematics, Physics,  
and English in Library Mode.

---

## Part 1 — Architecture as It Exists Today

### 1.1 The three layers that should be cleanly separated

```
KNOWLEDGE LAYER   What exists, authored, permanent
  ├─ Curriculum (WHAT)     KG JSON files — 6 subjects, 1,793 concepts
  ├─ Brain (HOW)           educational-brain/ — authored teaching science
  └─ State (WHO)           educational-brain/student-state/ — learner model

DECISION LAYER    What happens next — computed, not invented
  ├─ Placement             WHERE teaching begins
  ├─ Decision Engine       WHAT to do this turn
  └─ Memory Engine         WHEN to review

EXECUTION LAYER   What runs — retrieves from above, renders via LLM
  ├─ route.ts              orchestrator
  ├─ LLM                   surface wording only
  └─ DB                    state persistence
```

In reality these three layers are fully collapsed into one: `route.ts`
assembles everything, invents everything, and calls the LLM to render
everything. The Knowledge and Decision layers exist as documents and
TypeScript constants — not as retrieval sources.

### 1.2 Responsibility map — every domain, its intended owner, its actual owner, and the gap

| Domain | Intended owner | Actual owner | Gap |
|---|---|---|---|
| Curriculum (WHAT to teach) | KG JSON files | KG JSON files | ✓ None |
| Placement (WHERE to begin) | `placement/` Brain + `placement.ts` | `placement.ts` difficulty floor | Large — 8-phase protocol authored, 1-dimension proxy implemented |
| Category confidence | `placement/04` (ANCHORED/PROBABLE/UNCERTAIN/UNKNOWN) | `MasteryLevel` (4-tier, faster to declare) | Medium — same shape, different evidence bars |
| Knowledge-ladder rung | `student-state/02` (8 rungs) | `masteryScore` float in DB | Large — float has no rung semantics |
| Misconception ledger | `student-state/03` (verbatim phrases, lifecycle, regrowth priors) | `MistakeRecord` (flag + confidence tier) | Medium — structure exists, authored content not loaded |
| Teaching session shape | `decision-engine/07` (OPENING/CORE/STRETCH/CLOSE) | LLM-generated `LessonPlan` JSON | Large — shape is authored, implementation is invention |
| Teaching state machine | `decision-engine/01` (10 states, full transition table) | Implicit in `TeachingStrategyType` label | Large — no explicit state tracking |
| Turn-level decision | `decision-engine/03` (decision matrix, 8 strategies) | LLM improvises every turn | Critical — every single turn |
| Action selection | `decision-engine/04` (7-filter funnel, 27 actions) | 5 hardcoded strings per strategy type | Critical — every single turn |
| Teaching content | `concepts/` entries + AssetIdentity DB | LLM generates every turn | Critical — every single turn |
| First-lesson rules | `first-lesson/` (8 docs, hard limits) | Not enforced anywhere | Critical — every beginner lesson |
| Assessment | `assessment/` Brain | `evaluateCheckpointTurn()` school-only | Large — Library mode has no formal assessment |
| Recovery | Recovery Engine (D1, pending transcription) | `RECOVERY_PHASE` strategy label + 5 strings | Large — scripts not authored yet |
| Memory / Spaced Repetition | `student-state/07` (7 statuses, personal forgetting rate) | `retentionMetrics` + `reviewSchedule` | Medium — mechanism exists, Brain model not mapped |
| Category progression | `placement/05` (promotion criteria, demotion triggers) | `StudentProgress.currentLesson` linear counter | Large — no category-level promotion logic |
| Warm-up for returning learners | `placement/06` (decay timeline, warm-up protocol) | Not implemented | Large — gap-length detection absent |
| Conversation engine rules | `decision-engine/06` (anti-quiz, max-2-questions, turn skeleton) | Not enforced | High-frequency gap |
| Strategy instruction content | Authored concept-specific dispatch | `STRATEGY_INSTRUCTIONS[]` hardcoded TS constants | 35 strings never updated |
| AI reasoning (the residue) | Surface wording, novel utterances | Everything above + surface wording | Should shrink to surface only |

### 1.3 Duplication inventory — every place two systems own the same thing

| Responsibility | System A | System B | Resolution |
|---|---|---|---|
| Lesson planning | `decision-engine/07` authored shape | LLM-generated `LessonPlan` in contextSnapshot | A owns the structure. B renders the surface text within A's constraints. |
| Strategy selection | `decision-engine/03` decision matrix | `teachingStrategy.ts` `determineStrategy()` | `determineStrategy()` already does this deterministically — extend it with authored matrix content, don't replace it. |
| Placement decision | `placement/01–06` authored protocol | `placement.ts` difficulty floor | `placement.ts` is the implementation file. Extend it with the authored protocol. |
| Mastery gate | `placement/04` ANCHORED criteria | `MasteryLevel` TRUE_MASTERY criteria | Map TRUE_MASTERY → ANCHORED by tightening the evidence bar. One system with two names. |
| Student state | `student-state/01–09` 8 dimensions | DB schema: TopicProgress, MistakeRecord, ConceptMasteryRecord, contextSnapshot | DB tables ARE the implementation of the authored model. No duplication — a connection gap. |
| Assessment | `assessment/02` binary-search protocol | `evaluateCheckpointTurn()` school checkpoints | Both valid, different purposes. Placement protocol ≠ formative assessment. Keep both; extend formative to Library mode. |
| Recovery | `decision-engine/01 §4` + Recovery Engine D1 | `RECOVERY_PHASE` strategy + 5 hardcoded strings | After D1 transcription: authored scripts replace the 5 strings. Until then: the strategy label is correct, the interior is incomplete. |

---

## Part 2 — Single Source of Truth for Every Responsibility

### 2.1 The ownership assignments

**CURRICULUM (WHAT)** → KG JSON files. Final authority. Never edited by  
runtime or Brain. Brain references KG concept IDs; if KG and Brain  
disagree on concept structure, KG wins.

**PLACEMENT (WHERE)** → `placement.ts` is the single implementation file,  
`placement/` Brain is its specification. `placement.ts` should implement  
the authored protocol exactly. The difficulty floor stays as Phase 0  
fallback; the binary-search verification runs after it as Phase 1.  
**Why `placement.ts` is the right file and not a new one**: it already  
wires to `curriculum/route.ts` and `getDashboardV2Data.ts` — both read  
its output. Extending it is zero-integration-work.

**STUDENT STATE (WHO)** → DB tables are the implementation containers;  
`student-state/` Brain is the specification. The mapping is:  
- `ConceptMasteryRecord` → knowledge-ladder rungs (8 named rungs, not a float)  
- `MistakeRecord` → misconception ledger (verbatim phrase, strength, regrowth count)  
- `contextSnapshot` JSONB → session state machine position + teaching state  
- `retentionMetrics` → memory status (map 7 Brain statuses onto existing score/date fields)  
No new tables needed for Phase 1–3. `ConceptMasteryRecord` rung field is Phase 4 (schema change, needs G2).

**DECISION ENGINE (WHAT NEXT)** → `teaching-engine/index.ts` is the  
implementation file, `decision-engine/` Brain is its specification.  
Currently `decide()` runs a simplified version of the authored logic,  
school-mode only. It should run for all modes and implement the full  
7-step loop. **Why `teaching-engine/index.ts` and not a new engine**: it  
already has the right signature, the right inputs, the right output shape.  
It needs to be extended, not replaced.

**TEACHING STRATEGY (MACRO)** → `teachingStrategy.ts` `determineStrategy()`  
is the implementation; `decision-engine/02–03` Brain is its specification.  
The function is already deterministic and correct in structure. Its inputs  
(masteryLevel, misconceptionConfidence, transferLevel, calibration,  
momentum) map directly to the authored decision matrix's axes.  
**What changes**: the 35 hardcoded `STRATEGY_INSTRUCTIONS[]` strings become  
DB-retrieved content from AssetIdentity. The function logic stays identical.

**TEACHING ACTION (MICRO)** → `getTeachingAction()` in Teaching Action  
Intelligence (TAI) is the implementation file, `decision-engine/04` Brain  
is its specification. Currently school-mode only. Must fire for Library  
mode. **Why TAI and not a new file**: the function exists, the flag path  
exists (`ENABLE_LIBRARY_CONCEPT_TRACKING`), the concept-tracking write  
path needs to be unconditional. One flag change.

**TEACHING CONTENT** → `AssetIdentity` DB tables are the implementation  
containers, `concepts/` entries are the source material. `assembleLesson()`  
is the retrieval function. It is wired, callable, and returns null only  
because the catalogue is empty. **Activation**: import authored concept  
entries as DRAFT assets, review to ACTIVE. Zero code change.

**SESSION SHAPE** → `contextSnapshot` JSONB carries `sessionPhase` (new  
field); `decision-engine/07` Brain is the specification. Currently the  
session shape is in a LLM-generated `LessonPlan` JSON that the LLM is  
asked to respect. Replace with: a deterministic `sessionPhase` field  
that route.ts writes and reads. The LLM receives the phase as a constraint,  
not generates the plan.

**ASSESSMENT (FORMATIVE)** → `evaluateCheckpointTurn()` (extended to  
Library mode) is the implementation; `assessment/` Brain is the  
specification. Currently school-only because it uses `schoolCtx`.  
Library mode needs the same evaluation — same function, different caller  
path in route.ts.

**FIRST-LESSON RULES** → A deterministic pre-LLM constraint block in  
route.ts. Not a new file — route.ts already conditionally adds ~25 blocks.  
A 26th block that fires when `currentLesson === entryLesson && currentLevel  
=== 'beginner'` and injects: 1-concept limit, ≤3 new words, demonstrate-  
before-explain, ORAL-first (English), failure budget 1. This block is  
smaller and simpler than most of the 25 blocks that already run.

**RECOVERY** → Until Delivery 1 is transcribed: the `RECOVERY_PHASE`  
strategy label is correct. After transcription: the authored scripts  
replace the 5 hardcoded strings exactly as explained above for teaching  
actions. No structural change needed in either case.

**MEMORY** → `retentionMetrics` + `reviewSchedule` implement the memory  
engine mechanically. The Brain's 7-status model (UNKNOWN/FRAGILE/STABLE/  
FORGOTTEN/RECOVERED/CUED/AUTOMATIC) maps onto existing fields:  
- score ≥ 0.85 + interval expanding → STABLE  
- score < 0.85 + interval shrinking → FRAGILE  
- score = 0 + item due → FORGOTTEN  
- item retrieved after FORGOTTEN + cue → RECOVERED  
No new tables needed; status is a computed view over existing fields.  
The personal forgetting rate (`student-state/07 §3`) maps to each  
learner's observed `interval_factor` — already computed by the spaced  
repetition algorithm.

**CATEGORY PROGRESSION** → `placement.ts` + `StudentProgress` implement  
this. A new `categoryConfidence` field in `StudentProgress` (or a JSON  
map in contextSnapshot) carries the ANCHORED/PROBABLE/UNCERTAIN/UNKNOWN  
state per category. Promotion fires when the category's gate concepts  
reach AUTOMATIC + STABLE + one transfer event (observable from existing  
TopicProgress + retentionMetrics + EvidenceRecord data). No new table  
required if stored in contextSnapshot JSON; new table if queried cross-  
session (Phase 4, G2 required).

---

## Part 3 — Runtime Migration Roadmap

### The constraint reread before every phase

Every phase must pass: does this reuse existing code, existing curriculum,  
existing architecture? If the answer involves a new file where an existing  
one can be extended, the phase is wrong.

---

### Phase 0 — Activate AssetIdentity (zero code changes, hours not days)

**What changes**: Content is loaded into the DB. Nothing else.

**Why this is not solved by existing code**: `assembleLesson()` IS the  
solution. It works. It returns null because the DB is empty. Populating  
the DB is not a code problem — it is an activation problem.

**Actions**:
1. For each of the three authored concept entries  
   (`math.arith.fractions`, `phys.mech.newtons-first-law`,  
   `eng.phonics.letter-sound-correspondence`), extract:
   - Primary explanation → `ExplanationAsset` record (DRAFT)
   - Each alternative representation (concrete / visual / abstract) → separate `ExplanationAsset` (DRAFT)
   - Each misconception probe (the elicit/commit/collide items) → `ProbeAsset` records (DRAFT)
   - The anti-analogy warnings → `incompatibilities` field on the `AssetIdentity` row
2. Admin review at `/api/admin/knowledge-assets` → promote to ACTIVE
3. Verify: call the chat API for one of these concepts → response has  
   `provider: "memory"`, LLM is not called

**What the learner experiences**: For these three concepts, every  
explanation and probe is authored, not invented. The AI renders it in  
appropriate register, respecting burst limits. Every other concept: unchanged.

**Why this is Phase 0**: It is independent of every other phase. It  
improves teaching quality immediately. It exercises the complete pipeline  
end-to-end (matcher → assembleLesson → route.ts integration → LLM render).  
The pipeline being live on real data is the prerequisite for all subsequent  
content activation.

**Reused**: `AssetIdentity` schema, `explanationMemory.ts`, `matcher.ts`,  
`studentState.ts`, `assembleLesson()`, `/api/admin/knowledge-assets`.  
Zero new files.

---

### Phase 1 — First-Lesson Constraints (one conditional block in route.ts)

**What changes**: One block added to the system prompt assembly in route.ts.  
A `isFirstLesson(currentLesson, entryLesson)` utility function.

**Why this is not solved by existing code**: route.ts assembles ~25 blocks.  
This block does not exist. The first-lesson constraints are authored but  
never injected. No function in the codebase checks whether this is a  
beginner's first lesson and adjusts the system prompt accordingly.

**The block content** (derived from `first-lesson/`):
```
When currentLesson === entryLesson AND currentLevel === 'beginner':

FIRST LESSON PROTOCOL — MANDATORY CONSTRAINTS:
- ONE concept only this session. Do not introduce a second.
- Maximum 3 new words. Use each at least 3 times before continuing.
- DEMONSTRATE before you explain. Show it; name it after.
- For English phonics: this is an ORAL lesson. Print is optional, sound is mandatory.
- Ask maximum 6 questions total this session.
- Failure budget: 1 visible failure. If the learner fails twice, end
  with a success the learner can reach, then close.
- Session close trigger: the learner produces one correct solo response.
  Bank the win and close. Do not wait for three in a row.
- DO NOT: open with a definition, quiz before demonstrating, correct
  immediately, use metalanguage the learner hasn't heard.
```

**What the learner experiences**: Every complete beginner receives a  
lesson one that conforms to the authored standard. The AI still writes  
the surface words — it just cannot violate the injected constraints.

**Why this is Phase 1**: It prevents the most documented platform failure  
(English lesson one collapse). It requires the minimum possible code change.  
It is independent of Phases 2–6.

**Reused**: route.ts block assembly pattern (the same try/catch pattern as  
the other 25 blocks). `computeCurriculumEntryOrder()` already returns the  
entry lesson number. Zero new files.

---

### Phase 2 — Session State Machine in contextSnapshot

**What changes**: contextSnapshot gains a `sessionPhase` field.  
route.ts reads it to determine which instruction block to inject.  
route.ts writes it at the end of each turn.

**Why this is not solved by existing code**: contextSnapshot already  
carries `lessonStageProgress` (from ADR 09), which was intended to persist  
stage continuity across turns. But it carries LLM-generated plan state,  
not the authored session shape state. The authored shape (OPENING/CORE/  
STRETCH/CLOSE) is not tracked anywhere. The LLM receives a generated  
lesson plan and is asked to follow it — there is no deterministic enforcement.

**The sessionPhase field**:
```typescript
type SessionPhase = 'OPENING' | 'CORE' | 'STRETCH' | 'CLOSING'
type TeachingState = 'INTRODUCTION' | 'DEMONSTRATION' | 'EXPLANATION' |
                    'GUIDED' | 'INDEPENDENT' | 'ASSESSMENT' | 'TRANSITION' |
                    'RECOVERY' | 'REVIEW'
// Added to contextSnapshot:
sessionPhase: SessionPhase          // current session phase
teachingState: TeachingState        // current concept machine state
openingReviewsDue: string[]         // concept IDs due for review this OPENING
turnsSinceLastSuccess: number       // for recovery preemption
consecutiveFailures: number         // for circuit breaker
```

**Phase transition logic** (deterministic, in route.ts):
- OPENING → CORE: when `openingReviewsDue` is empty (all due reviews done)
- CORE → STRETCH: when gate conditions met AND `studentState === 'CONFIDENT | CURIOUS'`
- CORE/STRETCH → CLOSING: on any hard trigger (affect budget spent, time box,  
  summit banked, 2 consecutive failures)
- Any state → RECOVERY: when affect band fires (fearful/frustrated/overloaded signals)

**The injection pattern**: route.ts already injects the lesson plan block  
conditionally. Replace the LLM-generated plan block with phase-specific  
instruction blocks:
- OPENING block: "Begin with due retrieval items for [concept IDs]. Do not introduce new content until retrieval is complete."
- CORE block: "Teaching target: [concept node title]. State: [teachingState]. Action: [retrieved from TAI or authored dispatch]."
- CLOSING block: "Name one specific thing the learner accomplished. Forecast the next session. Leave one open loop."

**What the learner experiences**: Every session has a deterministic  
structure. Due reviews happen before new content, every time. Sessions  
end with the scripted close, every time. The LLM no longer invents the  
session structure.

**Reused**: contextSnapshot JSONB (already written/read per turn),  
`retentionMetrics` (already queries due items for `buildRevisionBlock()`),  
`getRationaleForTurn()` pattern from lesson planning. No new tables, no  
schema migration (JSONB is schema-free).

---

### Phase 3 — Library Mode Placement Verification

**What changes**: The first 3–5 turns of a Library mode learner's first  
session run a structured verification of the self-reported level. The  
result is stored in contextSnapshot as `placementVerified: true/false` and  
`categoryConfidence: Record<string, 'ANCHORED'|'PROBABLE'|'UNCERTAIN'|'UNKNOWN'>`.

**Why this is not solved by existing code**: `computeCurriculumEntryOrder()`  
computes an entry point from difficulty tags. It never verifies the entry  
point. The authored placement protocol (assessment/02 + placement/03)  
specifies exactly how to verify it using binary-search probes on cut-nodes.  
No code currently runs those probes.

**The verification sequence** (derived from `assessment/02` and `placement/03`):
```
First session, turns 1–5, when placementVerified is false:

Turn 1: One probe BELOW the computed entry point (fluency check of the  
        category below the proposed frontier). Assesses: is the foundation solid?
        If fast+correct → PROBABLE for that category.
        If slow/wrong → frontier is lower; adjust computedEntryLesson downward.

Turn 2: One probe AT the computed entry point.
        If fast+correct → PROBABLE for this category.
        If slow-correct → UNCERTAIN (frontier is here, not above).
        If wrong → frontier is below; binary-search down.

Turn 3: One probe ABOVE the computed entry point.
        If correct → frontier may be higher; note but don't advance without more evidence.
        If wrong → confirms: frontier IS the computed entry.

After turn 3: set placementVerified = true, write categoryConfidence map.
Apply the never-reteach law: any category rated ANCHORED or PROBABLE is  
not a teaching target; it is a prerequisite anchor only.
```

**What "probes" are**: Concept-level questions generated from the KG node's  
description and difficulty, with a structured response format that captures  
`correctness: boolean, latency: 'fast'|'slow', confidence: 'high'|'medium'|'low'`.  
The LLM generates the probe question (within the authored constraint that  
probes are APPLICATION or PRODUCTION level, not recognition).  
**Why the LLM can do this**: probe GENERATION is surface wording (authorized  
AI residue). Probe EVALUATION is deterministic (the structured response  
format provides the correctness/latency signals the code reads).

**Structured response format** (the key that unlocks deterministic decision-making):
```
Require the LLM to embed structured data in every response using a hidden tag:
<!--SIGNAL correctness="true|false" confidence="high|medium|low" confusion="true|false"-->
route.ts strips this tag and writes the signals to contextSnapshot.
The next turn's decision uses contextSnapshot signals, not LLM re-inference.
```

**Why this structured signal is the most important insight in the migration**:  
Currently, the LLM must re-infer the student's state from the last 30 messages  
on every turn. With structured signals written to contextSnapshot after each  
turn, the student state machine advances deterministically. The LLM's job  
shrinks from "infer the state AND decide what to do AND generate a response"  
to "generate a response given the retrieved state and decision." This is the  
OBSERVE → CLASSIFY transition becoming code rather than AI inference.

**Reused**: contextSnapshot JSONB (already schema-free, already written  
per turn), KG difficulty tags (already loaded by `subjectKgAdapter.ts`),  
`computeCurriculumEntryOrder()` output (the starting point for binary search),  
placement/04 ANCHORED/PROBABLE/UNCERTAIN/UNKNOWN definitions (the output vocabulary).

---

### Phase 4 — Decision Matrix Replacing Hardcoded Strategy Instructions

**What changes**: `STRATEGY_INSTRUCTIONS[]` and `STRATEGY_ACTION_DIRECTIVE[]`  
in `teachingStrategy.ts` become DB-retrieved content from AssetIdentity.  
A new AssetIdentity family: `PolicyAsset` (type: 'POLICY') carries  
strategy-level instructions keyed to `strategyType + conceptId`.

**Why this is not solved by existing code**: `STRATEGY_INSTRUCTIONS[]` is  
an array of 35 hardcoded strings. `AssetIdentity` already supports  
`ExplanationAsset` and `ProbeAsset` families. Adding `PolicyAsset` is the  
same structural pattern. The `assembleLesson()` function already queries  
by `conceptId + language + gradeBand`. The same query, extended to include  
`assetType: 'POLICY'`, retrieves authored strategy instructions instead of  
hardcoded strings.

**What the PolicyAsset carries**:
- `strategyType`: one of the 7 strategy labels
- `conceptId`: the KG concept ID (or `*` for universal policies)
- `instructionLines`: the specific teaching instructions for this strategy on this concept
- `actionDirective`: the one-line action directive
- `incompatibilities`: asset IDs that conflict (e.g., MOMENTUM_RECOVERY conflicts with ACCELERATION assets)

**What authored content this unlocks**:  
The decision matrix in `decision-engine/03` has specific instructions for  
every cell (teaching state × student state). These map to PolicyAssets  
keyed by `teachingState + studentState`. For example:
- `DEMONSTRATION × MISCONCEIVING` → "Lock in their prediction warmly ('lock that in — let's see'), reveal, then let the mismatch sit in silence for a full beat before speaking."
- `INDEPENDENT × FRAGILE` → "One more solo rep at the same type NOW. Do not advance. Say: 'that one was quicker — feel it?'"

These are specific, auditable, authored instructions. They are not the  
current 5 generic strings. They do not require a new file system — just  
a new asset family in the existing AssetIdentity model.

**Reused**: `AssetIdentity` table (add `assetType: 'POLICY'`), `assembleLesson()`  
(extend to query POLICY type), `teachingStrategy.ts` `buildTeachingStrategyBlock()`  
(use retrieved content instead of `STRATEGY_INSTRUCTIONS[strategyType]`),  
admin review endpoint (same approval flow). No new tables if `PolicyAsset`  
is stored as a JSONB column on `AssetIdentity`. One migration: add `PolicyAsset`  
columns.

---

### Phase 5 — Library Mode Teaching Engine (Unconditional decide())

**What changes**: The `ENABLE_LIBRARY_CONCEPT_TRACKING` flag path becomes  
the default path for Library mode. `snapshotCurrentConceptId` is written  
unconditionally when a Library mode session has a current concept node.  
`getTeachingAction()` and `getLessonPlan()` are called for Library mode  
(not only when `schoolCtx` is truthy).

**Why this is not solved by existing code**: The flag exists. The concept-  
tracking write path exists (it's inside a `schoolCtx` conditional). The  
only change is moving the `snapshotCurrentConceptId` write from inside  
`if (schoolCtx)` to before the conditional. One change. Once  
`snapshotCurrentConceptId` is set, the Teaching Engine decision block  
fires, `getTeachingAction()` runs, and the action type is deterministic.

**What this unlocks**: With TAI running for Library mode:
- The teaching action type (`STEP_BY_STEP_GUIDED`, `MISCONCEPTION_FIX`,  
  `RAPID_REVIEW`, etc.) is deterministic, not invented
- The `ActionType` feeds into Phase 4's PolicyAsset retrieval — the  
  retrieved content is now specific to the action type
- The CORE session phase has a retrieved action, not an invented approach

**What does NOT change**: School mode is untouched. `schoolCtx` behavior  
is identical. The only change is the Library mode code path.

**Reused**: `teaching-engine/index.ts` `decide()` (unchanged), `getTeachingAction()`  
(unchanged), `getLessonPlan()` (unchanged), `contextSnapshot` `snapshotCurrentConceptId`  
field (already defined, just written unconditionally). No new functions.

---

### Phase 6 — Category Progression (Skip ANCHORED, Repair UNCERTAIN)

**What changes**: After placement verification (Phase 3) and ongoing  
session evidence, `categoryConfidence` in contextSnapshot maps each  
conceptId to its confidence level. route.ts reads this map to:
1. Skip ANCHORED concepts entirely — never serve them as CORE teaching  
   content; only use them as anchor references in INTRODUCTION
2. Warm up PROBABLE concepts with one retrieval item before using them  
   as prerequisites
3. Repair UNCERTAIN gate concepts before advancing the frontier
4. Flag UNKNOWN concepts as the teaching target for the current session

**Why this is not solved by existing code**: `computeCurriculumEntryOrder()`  
puts the learner at lesson N and advances sequentially. There is no concept  
of ANCHORED (skip forever) or UNCERTAIN (repair before advancing). The  
progression is purely linear. The authored progression engine (`placement/05`)  
specifies: never reteach ANCHORED, advance only when PROBABLE gate concepts  
are confirmed, repair specifically when UNCERTAIN (not the whole category).

**What the categoryConfidence map looks like**:
```typescript
// In contextSnapshot:
categoryConfidence: {
  'math.arith.whole-number-arithmetic': 'ANCHORED',
  'math.arith.fractions': 'UNCERTAIN',
  'math.arith.ratios': 'UNKNOWN',
}
```

**How it's populated**:
- Placement verification (Phase 3) writes the initial values
- After each session, evidence from `EvidenceRecord` and `retentionMetrics`  
  updates confidence levels:
  - UNCERTAIN → PROBABLE: gate concept passes assessment at INDEPENDENT level  
    (correct + slow acceptable) for 2 consecutive sessions
  - PROBABLE → ANCHORED: gate concept at AUTOMATIC level (correct + fast) +  
    21-day retention interval reached + one transfer event in EvidenceRecord
  - ANCHORED → UNCERTAIN (demotion): gate concept fails retrieval at 2  
    consecutive session opens, AND cued-recovery has failed

**What the learner experiences**: A beginner who already knows whole-number  
arithmetic is never drilled on it. The first session goes straight to  
fractions. A returning learner who mastered fractions 14 months ago is  
warm-upped, not retaught. The system finds the actual frontier.

**Reused**: contextSnapshot JSONB (add `categoryConfidence` field),  
`EvidenceRecord` (transfer event detection from existing event log),  
`retentionMetrics` (STABLE detection from existing score/interval data),  
`assessmentDecision` pipeline (INDEPENDENT-level classification already  
computed by `getAssessmentDecision()`). No new tables for Phase 6 if  
`categoryConfidence` lives in contextSnapshot.

---

### Phase 7 — Transcribe Deliveries 1 and 2

**What changes**: New authored files in `educational-brain/foundations/`  
and the nine planned libraries (`teaching-actions/`, `mental-models/`,  
`misconceptions/`, `cognitive-load/`, `memory/`, `motivation/`, `transfer/`,  
`discovery/`, `principles/`).

**Why this is not Phase 1**: The runtime is not yet ready to retrieve  
the content even if it were authored. Phases 1–6 build the retrieval  
infrastructure. Phase 7 fills the remaining libraries once the pipeline  
is exercised and trusted.

**What Delivery 1 transcription immediately unlocks**:
- The Recovery Engine scripts → replace the 5 hardcoded RECOVERY_PHASE strings
- The adaptive teaching rules → replace the static transition heuristics in `decide()`
- The voice-first learning model → replaces the hardcoded register labels
- The Canonical Per-Concept Schema → the standard format for all future concept entries

**What Delivery 2 transcription immediately unlocks** (cited by nearly every file in the Brain):
- 27-action dispatch library → action selector filters 2–6 become functional
- 12 persona veto table → affinity filter in action selector activates
- Cognitive load rules → the load filter in action selector activates
- 23 Universal Teaching Principles → resolution for every cited cross-reference
- Mental Model Library → per-concept representations become retrievable
- Misconception evolution rules → the misconception ledger gains regrowth priors

**What remains as AI residue after Phase 7**:
- Surface wording of each turn (in the retrieved register, under the retrieved limits)
- Novel utterances with no matching rule (each one logged → next week's authoring)
- Example values within authored constraint templates (numbers, names, contexts)

This is the endgame stated in `decision-engine/08 §4`: "the LLM becomes  
voice-renderer, not content-generator."

---

## Part 4 — Library Mode Full Architecture

Library Mode is the primary product. Here is exactly how it should execute  
after the migration, using existing architecture at each step.

### 4.1 Session start (first session or post-gap return)

```
1. curriculum/route.ts GET:
   - Read StudentProgress.currentLesson (or compute from placement.ts if none)
   - Read contextSnapshot.placementVerified (false for new learners)
   - Read contextSnapshot.categoryConfidence (empty for new learners)
   - Read retentionMetrics → openingReviewsDue list

2. If placementVerified = false:
   - sessionPhase = 'OPENING' with sub-mode 'PLACEMENT_VERIFICATION'
   - Run Phase 3 probe sequence (turns 1–5)
   - After probes: write categoryConfidence, set placementVerified = true

3. If placementVerified = true AND gap > 14 days:
   - sessionPhase = 'OPENING' with sub-mode 'WARM_UP'
   - openingReviewsDue populated from categoryConfidence (PROBABLE + UNCERTAIN gate concepts)
   - Warm-up is cued retrieval (authored cue design from placement/06)

4. If placementVerified = true AND gap ≤ 14 days:
   - sessionPhase = 'OPENING'
   - openingReviewsDue populated from retentionMetrics (due reviews per memory engine)
```

### 4.2 Per-turn execution (7-step loop from decision-engine/08)

```
STUDENT SPEAKS
    │
1. route.ts parses structured signal (Phase 3's <!--SIGNAL--> tag or its
   equivalent in structured JSON response format)
   → writes to contextSnapshot: lastSignal { correctness, confidence, confusion }
    │
2. CLASSIFY student state (deterministic, from contextSnapshot signals):
   - affect band check FIRST: if any failure-state utterance → teachingState = RECOVERY
   - cognitive band: CONFUSED if confusion=true, MISCONCEIVING if MistakeRecord active,
     FRAGILE if correctness=true AND confidence=low, GUESSING if confidence=low AND random
   - drive band: BORED if correctness=true AND confidence=high AND consecutiveSuccesses > 3
   → writes teachingState to contextSnapshot
    │
3. SITUATE: read sessionPhase + teachingState → apply decision matrix (03):
   Preemption rule: if affect band → RECOVER regardless of phase
   Otherwise: look up (sessionPhase.teachingState × studentState) → one of 8 strategies:
   HOLD / ADVANCE / RETREAT / ESCALATE / RECOVER / REVIEW-INJECT / STRETCH-OFFER / CLOSE
   → writes sessionStrategy to contextSnapshot
    │
4. SELECT action: if strategy calls for a teaching action:
   a. Call assembleLesson() → if ACTIVE concept asset exists, use it (Phase 0)
   b. If no asset: call decide() from teaching-engine/index.ts (Phase 5)
   c. Route the action type to PolicyAsset retrieval (Phase 4) → retrieve instructions
   → writes selectedAction, retrievedContent to contextSnapshot
    │
5. COMPOSE: inject into system prompt:
   - sessionPhase block (Phase 2): OPENING/CORE/STRETCH/CLOSE constraints
   - teachingState block: current state + legal next states
   - studentState block: classified state + decision matrix cell
   - selectedAction block: the retrieved action type + retrieved instructions
   - retrievedContent: the authored explanation/probe/policy (if available)
   - surfaceConstraints: burst limits, register, question ceiling (from decision-engine/06)
   - firstLesson block (Phase 1): if applicable
    │
6. routeAI() call: LLM receives ALL of the above as constraints
   LLM generates ONLY: the surface wording within the constraints
   LLM embeds: <!--SIGNAL correctness="..." confidence="..." confusion="...">
    │
7. UPDATE: parse the <!--SIGNAL--> tag, write to contextSnapshot + EvidenceRecord
   Update sessionPhase if transition triggered
   Update categoryConfidence if gate condition met
   Write TeachingStrategyEvent for stalemate detection
```

### 4.3 What the LLM can and cannot invent (the enforced boundary)

**The LLM CAN**:
- Choose the surface words, phrasing, register within the retrieved constraints
- Generate example values within authored templates ("a bag has ___ apples...")
- Render the REACT + MOVE + INVITE skeleton in the learner's specific context
- Handle novel utterances with no matching rule (log the exception)

**The LLM CANNOT** (because the code has already decided):
- Choose the session phase (that is in contextSnapshot)
- Choose the teaching state (that is in contextSnapshot)
- Choose whether to recover, hold, advance, or retreat (that is the decision matrix)
- Choose the action type (that is the 7-filter funnel output)
- Choose the explanation content (that is the AssetIdentity retrieval)
- Choose the assessment probe (that is the ProbeAsset retrieval)
- Choose when to close (that is the hard/soft trigger logic)
- Choose whether to skip ANCHORED content (that is the categoryConfidence map)

### 4.4 What School Mode dependencies Library Mode does NOT need

Library Mode should NOT depend on:
- `schoolCtx` (remove the `if (schoolCtx)` guard from TAI and DLC — Phase 5)
- `board`, `grade`, `chapter` parameters (these are School Mode only; never pass them for Library)
- `nextBestAction`, `dailyPlan`, `examReadiness` (school-specific pipelines)
- `prerequisiteRecovery.detectPrerequisiteGap()` (reads school KG IDs; use placement/05's just-in-time protocol instead)
- `buildGuidedTeachingPrompt()` (school-specific guided teaching parameters)

Library Mode DOES share with School Mode (and should continue to):
- `getTeachingStrategy()` (same 7-type deterministic selection)
- `evaluateCheckpointTurn()` (extend to Library mode, Phase 5)
- `detectMisconceptions()` + `buildMisconceptionBlock()` (already mostly mode-agnostic)
- `getDueRevisions()` + `buildRevisionBlock()` (already mode-agnostic)
- `decide()` from teaching-engine/index.ts (extend to Library, Phase 5)

---

## Part 5 — Category Progression from Self-Reported Level

### 5.1 What the self-reported level IS and IS NOT

**IS**: A placement hypothesis. A LOW-TRUST (adults) or MEDIUM-TRUST  
(children) signal about where to begin binary-search probing.

**IS NOT**: The curriculum starting point. Not a guarantee. Not an  
achievement. Not what the session plan executes against.

**Current treatment**: `currentLevel` maps to a `difficulty` floor →  
`computeCurriculumEntryOrder()` finds the first concept at/above that  
floor → that concept is lesson 1. Session 2 follows lesson 2. No verification.

**Correct treatment**: `currentLevel` maps to a binary-search starting  
point → 3–5 probes verify it → categoryConfidence written → subsequent  
sessions read categoryConfidence to skip ANCHORED, teach UNCERTAIN, target UNKNOWN.

### 5.2 The KG's existing category hierarchy (don't invent another)

The KG concepts are already organized by:
- `difficulty`: foundational → developing → proficient → advanced → expert → research  
  (the category spine — this IS the equivalent of categories 0–5+)
- `requires`: prerequisite links form natural clusters (the "gate concept" structure  
  is the cluster's entry condition — the KG's `requires` on the hardest-to-unlock  
  concept in each difficulty band)
- `domain`: mathematics has algebra, geometry, statistics etc. — these are the  
  branches in the per-branch placement protocol (Student E simulation)

The placement protocol's "category" = a `difficulty` band within a `domain`.  
No new hierarchy needed. Mathematics Category 5 = proficient difficulty in  
the fractions domain. The KG already encodes this.

**Concretely**:
```
beginner   self-report → probe at foundational-developing boundary
           categoryConfidence: all foundational concepts PROBABLE, developing UNKNOWN

intermediate self-report → probe at developing-proficient boundary
           categoryConfidence: foundational PROBABLE, developing PROBABLE, proficient UNKNOWN

advanced   self-report → probe at proficient-advanced boundary
           categoryConfidence: ...proficient PROBABLE, advanced UNKNOWN
```

After 3 probes (Phase 3 verification), confidence updates to ANCHORED/PROBABLE/  
UNCERTAIN/UNKNOWN per the evidence. The never-reteach law fires immediately:  
any ANCHORED concepts are removed from the session plan as teaching targets.

### 5.3 Skip / verify / repair logic (reusing compaction protocol from decision-engine/07)

```
For a given concept in the session plan:

1. Check categoryConfidence for this concept's domain + difficulty band
2. If ANCHORED → skip to next concept. Use this concept as prerequisite anchor only.
3. If PROBABLE → one warm-up item (retrieval, not teaching). If passes → advance.
   If fails → demote to UNCERTAIN. Run repair before advancing.
4. If UNCERTAIN → teach. Gate criteria: INDEPENDENT level + 2 sessions.
5. If UNKNOWN → teach from INTRODUCTION. Gate criteria: AUTOMATIC + STABLE + transfer.
```

This is `placement/05-progression-engine.md` stated as an algorithm.  
It reuses `categoryConfidence` (contextSnapshot), `EvidenceRecord` (transfer  
event detection), `retentionMetrics` (STABLE detection), and  
`assessmentDecision` (level classification). No new functions.

---

## Part 6 — The Continuous Teaching Loop

### 6.1 What the loop looks like in a world-class human tutor

A great teacher is never "processing a turn." They are continuously:
```
OBSERVE (the student's face, voice, body, what they wrote, how fast)
  → THINK  (what state is this? what does it mean? what's the gap?)
  → ACT    (one move: demonstrate, shrink, advance, recover, offer, close)
  → WAIT   (genuine silence — observation, not processing)
  → OBSERVE (again — the response to the move)
```

This loop runs at 2–5 second intervals. It never stops. There is no  
"generating a response." There is only continuous situational awareness.

### 6.2 Why the current LLM-per-turn architecture cannot produce this

The LLM receives a 30-message history plus ~25 instruction blocks and  
generates a response. It does not OBSERVE — it reads. It does not THINK  
in real-time — it generates in one pass. It does not WAIT — it has no  
mechanism for silence. The architecture is a request-response system  
masquerading as a continuous loop.

**What the migration produces instead**:

The LLM does not change. What changes is what it receives.  
Currently: the LLM receives everything (history + instructions + no state)  
and invents the decision plus the response.  
After migration: the LLM receives a pre-made decision plus the retrieved  
content, and generates only the response.

This is equivalent to giving the LLM the teacher's internal monologue  
("I can see they're FRAGILE. Hold the sub-step. Give one more success.  
Use the pizza analogy from the concept entry.") and asking it to  
translate that into words. The teacher's internal monologue is what  
the migration produces. The LLM is the voice.

### 6.3 The mechanism for continuous situational awareness

The structured signal tag (Phase 3) is the key mechanism:

After EVERY student utterance, the LLM embeds:
```
<!--SIGNAL correctness="true" confidence="medium" confusion="false" phrase="I just add them"-->
```

route.ts parses this and writes to contextSnapshot. The NEXT turn's  
decision reads from contextSnapshot, not from re-reading the history.

**Why this produces continuous awareness without continuous LLM calls**:  
The student's state is tracked in contextSnapshot turn-by-turn. The  
decision matrix (step 3 of the 7-step loop) runs in route.ts  
code, not in the LLM, on every turn. The LLM's job per turn shrinks  
from "figure out what state the learner is in, decide what to do,  
generate a response" to "generate a response given this state and this decision."

The `phrase` field in the structured signal is particularly powerful:  
if the LLM detects "I just add them" in the student's response (a  
characteristic M1 misconception phrase from the concept entry), it  
embeds this in the signal. route.ts reads it, looks it up in the  
misconception ledger, confirms M1 is active, and routes the next  
turn to the misconception repair track. The LLM that generated the  
SIGNAL tag does not need to know what M1 is or what repair means.  
It only needs to recognize the phrase and report it.

### 6.4 The OBSERVE → THINK → ACT → WAIT cycle in code

```
OBSERVE:  parse <!--SIGNAL--> from previous LLM response
          classify signals: correctness + confidence + confusion + phrases
          update contextSnapshot: studentState, consecutiveFailures, turnsSinceSuccess

THINK:    decision matrix lookup (in route.ts code):
          (sessionPhase.teachingState × studentState) → 8-strategy decision
          result: sessionStrategy written to contextSnapshot
          if sessionStrategy == ESCALATE: escalation ladder lookup (decision-engine/05)
          if sessionStrategy == RECOVER: recovery preemption overrides everything

ACT:      retrieve content for the decided action:
          assembleLesson() → ACTIVE AssetIdentity asset (if exists)
          decide() → action type (if no asset)
          PolicyAsset retrieval → specific instructions for this action × state
          build system prompt blocks from retrieved content only

WAIT:     inject into system prompt: "After your response, wait for the learner.
          Do not ask a second question. Do not fill the silence. The learner's
          next message is the next turn."
          (This is the only way to enforce wait-time in a text-based system.)
```

### 6.5 Where AI reasoning remains (minimum viable residue)

After Phases 0–6:
- **Surface wording**: the LLM writes the sentence that delivers the retrieved content  
  in the retrieved register within the retrieved burst limits
- **Novel utterance handling**: if `studentState` cannot be classified from signals,  
  the LLM infers it and embeds a SIGNAL tag — the NEXT turn is then deterministic
- **Example value selection**: "3 friends share 12 pizzas" vs "6 friends share 18 apples" —  
  the LLM varies the surface within the authored constraint template
- **Register calibration**: "okay cool so fractions" vs "certainly — let us examine  
  equivalent fractions" — the LLM adjusts register within the `contentRegister` constraint

This is the authorized residue category from `decision-engine/08 §4`.  
Everything above this list is retrieved or computed, not invented.

---

## Part 7 — Every Recommendation Justified

For every recommendation in this blueprint:

> **Why can this NOT be solved using something already in Git?**

| Recommendation | Justification |
|---|---|
| Populate AssetIdentity DB (Phase 0) | `assembleLesson()` is wired and works. Returns null because the catalogue is empty. The code is already the solution. |
| Add first-lesson constraint block (Phase 1) | route.ts already conditionally assembles ~25 blocks. A 26th conditional block is the pattern. No new infrastructure needed. |
| Add sessionPhase to contextSnapshot (Phase 2) | contextSnapshot already carries `lessonStageProgress` (ADR 09). A `sessionPhase` field is the same pattern. The JSONB is schema-free. |
| Structured signal tag from LLM (Phase 3) | The LLM already parses and strips tags (VISUAL:, WE:, INLINE_PRACTICE, HINT). A SIGNAL tag follows the same pattern. The signal parser is a 10-line addition to the tag-stripping code. |
| PolicyAsset family (Phase 4) | AssetIdentity already has ExplanationAsset + ProbeAsset. A third family follows the same schema pattern. `assembleLesson()` is already parameterized by assetType. |
| Unconditional decide() for Library mode (Phase 5) | The flag path already exists. The concept-tracking write is inside `if (schoolCtx)`. Moving it before the conditional is a single-line change. |
| categoryConfidence in contextSnapshot (Phase 6) | contextSnapshot is a JSONB. No migration needed. The confidence levels are computed views over existing EvidenceRecord + retentionMetrics data. |
| Transcribe Deliveries 1–2 (Phase 7) | The action selector's filters 2–6 explicitly reference libraries that are pending transcription. Nothing in the current codebase resolves the references because nothing has been transcribed. This is genuine new content. |
| Decision matrix as code (across phases) | The decision matrix in `decision-engine/03` has 70+ explicit decision cells. Each cell is a specific, unambiguous instruction. These can be coded as a lookup table in `teaching-engine/index.ts`. They cannot be retrieved as documents — they must become code. This is the one case where authored content must translate to TypeScript to function. |

### What SHOULD NOT be done

1. **Do not create a new orchestration layer.** route.ts is the orchestrator.  
   Every phase adds to or modifies what route.ts does. No new service, no  
   new pipeline, no new middleware.

2. **Do not create a new student model.** The DB tables ARE the student model.  
   contextSnapshot IS the in-session model. Extend them, don't rebuild them.

3. **Do not create a new assessment engine.** `evaluateCheckpointTurn()` exists.  
   Extend it to Library mode (remove the `schoolCtx` guard; provide Library  
   mode defaults for board/grade parameters). This is a 10-line change.

4. **Do not create a new lesson planning engine.** The session shape replaces  
   the LLM-generated `LessonPlan`. route.ts reads contextSnapshot.sessionPhase  
   instead of building a plan. The `LessonPlan` generation call is removed,  
   not replaced with a new planner.

5. **Do not create a new placement engine.** `placement.ts` is extended.  
   `computeCurriculumEntryOrder()` stays (it's the binary-search starting point).  
   The verification protocol runs after it and updates contextSnapshot.

6. **Do not add more system prompt blocks.** The 25 blocks are already too many.  
   The migration REPLACES blocks (LLM-generated lesson plan → deterministic  
   sessionPhase block) and CONSOLIDATES blocks (35 hardcoded strategy strings →  
   one retrieved PolicyAsset block). The total number of blocks should DECREASE,  
   not increase.

7. **Do not author more Educational Brain documents.** The library is sufficient  
   for Phases 0–6. Phase 7 transcribes what was already chat-authored (D1/D2).  
   New domains (relationship capital, worked example design, etc.) are future  
   deliveries after the retrieval pipeline is operational.

---

## Summary — What Changes in Two Weeks

### Week 1 (Phases 0–2)
- Phase 0: Import 3 concept entries into AssetIdentity → LLM bypassed for 3 concepts
- Phase 1: First-lesson constraint block → beginner lesson one compliant with authored standard
- Phase 2: sessionPhase in contextSnapshot → session structure is deterministic

**Week 1 teaching quality**: A beginner starting English letter-sound  
correspondence receives a structured lesson one. Every session has OPENING  
(reviews) → CORE → CLOSE structure enforced by code. Explanations for  
fractions, Newton's First Law, and letter-sound correspondence are served  
from the authored library. The LLM improvises substantially less.

### Week 2 (Phases 3–5)
- Phase 3: Placement verification → self-reported level is verified in first session
- Phase 4: PolicyAsset family → teaching instructions become authored and retrievable
- Phase 5: Library mode Teaching Engine → decide() fires for all modes; action types are deterministic

**Week 2 teaching quality**: A learner claiming intermediate mathematics  
receives 3 probes in session 1 that verify the claim. ANCHORED categories  
are never retaught. The teaching action type (what to do) is deterministic.  
The content (how to do it) is retrieved from authored sources for the 3  
authored concepts. For all other concepts, the AI improvises with  
deterministic constraints on what it can invent.

### After two weeks (Phases 6–7, ongoing)
- Phase 6: Category progression → never-reteach law enforced for all concepts
- Phase 7: D1/D2 transcription → 13 partially-retrieved layers become fully retrieved

**Endgame**: The LLM is a voice renderer. It generates surface wording  
within retrieved constraints for retrieved content. The Educational Brain  
is the primary source of intelligence. AI reasoning is the residue: surface  
wording, example values, novel utterances.
