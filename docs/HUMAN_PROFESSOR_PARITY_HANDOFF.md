# My Tutor — Human Professor Parity Handoff Document

**Purpose:** Complete briefing for a dedicated Claude session tasked with making
My Tutor behave identically to a world-class human physics (or any-subject) professor
who can teach every student from absolute scratch to expert level, across all IQ levels.

**Date written:** 2026-07-24
**Branch:** main (always develop on main, push to main, never create PRs unless asked)
**Hard constraint:** Do NOT modify Knowledge Graphs, Blueprints, or Educational Brain
markdown files. Only modify the Brain Runtime (TypeScript src/ files).

---

## 1. What My Tutor Is

A Next.js 14 App Router tutoring application. Students choose a subject (physics,
mathematics, chemistry, biology, computer science, English), state their level
(beginner / intermediate / advanced), and chat with an AI tutor that teaches them
concept by concept through the subject's Knowledge Graph.

**AI stack:** Groq primary (openai/gpt-oss-20b), YandexGPT fallback (Russia only).
**Database:** PostgreSQL via Prisma (no migration files — use `npx prisma db push`).
**Auth:** NextAuth v5 JWT.

---

## 2. What Is Already Built (Full Technical Inventory)

### 2a. Knowledge Infrastructure (DO NOT MODIFY)
- `docs/{subject}/kg/graph.json` — Canonical Knowledge Graphs for 6 subjects:
  mathematics (908 concepts), physics (238), chemistry (187), biology (108),
  computer science (119), English (216). Total: 1,756 concepts.
- `docs/curriculum/blueprints/{conceptId}.md` — 984 blueprint files loaded live
  into every chat turn via `src/lib/curriculum/blueprintLoader.ts`.
  These inject BLUEPRINT CONTEXT (concept spine, misconceptions with probe questions,
  characteristic phrases, correction bridges) into the system prompt every turn.
- `educational-brain/concepts/` — 409 authored Educational Brain entries, each a
  21-section expert teaching guide for one concept. Sections include: Core Understanding,
  Mental Models, Why Students Fail, Misconceptions, Analogies, Demonstrations,
  Discovery Questions, Teaching Sequence, Tutor Actions, Voice Teaching Notes,
  Assessment Signals, Tutor Recovery Strategy, Memory Hooks, Transfer Connections,
  Curriculum Feedback. Loaded via `blueprintLoader.ts::loadEBConceptContext()`.
- `educational-brain/` (root) — The complete teaching science knowledge base:
  assessment/, concepts/, decision-engine/, first-lesson/, foundations/, misconceptions/,
  placement/, student-state/, teaching-actions/, validation/.

### 2b. Brain Runtime (THE TARGET FOR YOUR WORK)

**Main chat route:** `src/app/api/learn/chat/route.ts`
This is the orchestrator. It runs on every student message. Key call sequence:
1. Load student context (StudentProgress, MistakeRecords, session snapshot)
2. Run placement verification if needed (`placementVerification.ts`)
3. Run session lifecycle state machine (`sessionLifecycle.ts`)
4. Load blueprint + EB concept context (`blueprintLoader.ts`)
5. Run teaching engine decide() (`teaching-engine/index.ts`)
6. Check recovery guard (`recoveryGuard.ts`)
7. Assemble lesson from memory if assets exist (`assets/assetIdentity.ts`)
8. Build system prompt from all the above
9. Call LLM (Groq / YandexGPT)
10. Parse LLM response: strip SIGNAL tags, detect lesson complete, detect misconceptions
11. Persist evidence events (`evidence/evidenceEngine.ts`)
12. Update session snapshot

**Key runtime files and their job:**

| File | Job | Status |
|------|-----|--------|
| `src/lib/teaching/recoveryGuard.ts` | Detects distress signals, injects authored recovery scripts BEFORE LLM | WORKING |
| `src/lib/teaching/sessionLifecycle.ts` | OPENING→CORE→CLOSING state machine, 30-min gap boundary, failure budget | WORKING |
| `src/lib/teaching/firstLessonGuard.ts` | Deterministic hard limits for lesson 1 (1 concept, ≤6 questions, demo-first) | WORKING |
| `src/lib/teaching/placementVerification.ts` | 3-bracket placement probe for intermediate/advanced students | WORKING |
| `src/lib/teaching/conversationState.ts` | 6-phase state machine OBSERVE→DEMONSTRATE→GUIDE→CHECK→PRACTICE→TRANSFER | WORKING |
| `src/lib/teaching/masteryGate.ts` | Requires 1 CHECK correct + 2 PRACTICE correct before lesson advance | WORKING |
| `src/lib/teaching/signals.ts` | Parses <!--SIGNAL correctness/confidence/confusion/phrase/probe--> tags | WORKING |
| `src/lib/teaching/evidence/evidenceEngine.ts` | Writes EvidenceEvent rows — write-only in Phase 1, no readers yet | PARTIAL |
| `src/lib/teaching/assets/assetIdentity.ts` | assembleLesson() — serves authored content when ACTIVE assets exist | WORKS but empty |
| `src/lib/curriculum/blueprintLoader.ts` | Loads blueprints + EB entries per concept, parses 4 EB fields | FIXED 2026-07-24 |
| `src/lib/teaching-engine/index.ts` | decide() — 5-step pipeline selecting concept, action type, difficulty, goal | WORKING |
| `src/lib/teaching/teachingStrategy.ts` | 7-value teaching posture (FRAGILE/MISCONCEIVING/CONFUSED/etc.) | WORKING |
| `src/lib/ai/client.ts` | System prompt builder — assembles all blocks into final LLM instructions | KEY FILE |
| `src/lib/learn/tutorRecovery.ts` | CLIENT-SIDE ONLY — fallback messages when AI call fails | CLIENT ONLY |

### 2c. System Prompt Architecture

`src/lib/ai/client.ts` builds the LLM system prompt by concatenating blocks in this order:
1. BASE persona + 10 universal rules
2. SUBJECT context block
3. BLUEPRINT CONTEXT (concept spine + misconceptions — from blueprintLoader)
4. EB CONCEPT CONTEXT (teaching strategy from EB entry — antiAnalogies, voiceDetectionCues, openingScenario, recoveryTriggers)
5. STUDENT STATE block (level, failures, confidence signals)
6. TEACHING ENGINE DECISION block (decide() output)
7. SESSION LIFECYCLE block (OPENING/CORE/CLOSING phase)
8. PLACEMENT VERIFICATION block (if active)
9. ASSET MEMORY block (if assembleLesson returned content)
10. FIRST LESSON PROTOCOL (if lesson 1, Library, beginner, 0 completions) — LAST, overrides all
11. RECOVERY GUARD injection (if distress detected) — LAST OF ALL

---

## 3. How a Human Physics Professor Actually Teaches (The Target)

A world-class human professor does NOT:
- Open with a quiz
- Define terms before showing examples
- Ask the same question twice
- Give the answer immediately when a student is stuck
- Ignore emotional signals (confusion, shame, boredom, frustration)
- Treat all students identically regardless of prior knowledge
- Move on while a student is still confused
- Use childish language with adults or adult language with children

A world-class human professor DOES:
- **Anchor first:** connects every new concept to something the student already knows
- **Demonstrate before naming:** shows the thing working before giving it a name
- **Read non-verbal signals:** pace of response, self-corrections, silence, hedging
- **Personalize difficulty in real time:** not via a fixed difficulty setting — by watching
  what the student actually does, then adjusting THIS TURN
- **Shrink the problem when stuck:** doesn't repeat the same explanation louder — shrinks
  to a smaller concrete example the student can win at
- **Protect the ego:** never says "wrong" — says "interesting — let me show you another angle"
- **Praise the process, not the person:** "you noticed the pattern" not "you're so smart"
- **Close deliberately:** names one specific thing the student did, forecasts next session,
  leaves one open loop to create re-engagement
- **Calibrate register:** adult gets adult dignity; child gets simpler steps — never
  simpler dignity
- **Vary the action:** doesn't just explain — demonstrates, asks prediction questions,
  uses analogy, runs thought experiments, uses comparison/contrast, elicits student explanation
- **Track failure state:** one visible failure → support more; two failures → success before continuing
- **Never quiz-first:** the first minutes of a session never test what the student doesn't know yet

### What This Means for the Tutor Per IQ Level:

**Lower fluency / slower processor:**
- Maximum 1 idea per burst (2 sentences)
- Concrete before abstract — always
- More anchors to daily life objects
- More repetition with variation (same concept, different surface)
- Shorter wait before offering a scaffold (don't let silence become shame)
- Never use technical vocabulary until it's been used 3 times in context

**Higher fluency / faster processor:**
- Can compress the demonstration phase
- Can introduce two related concepts if naturally connected
- Welcomes "why" questions mid-explanation
- Can use technical vocabulary earlier once shown
- Needs intellectual challenge — boredom is the failure mode, not confusion

**Expert level:**
- Peer register — talks TO the student, not AT them
- Socratic: pose problems, elicit student's own theory, then stress-test it
- Welcomes contradiction: "actually, here's where that breaks down..."
- Transfers to adjacent domains and real research problems

---

## 4. Gap Analysis — Current Behavior vs. Human Professor Behavior

### GAP 1: The LLM still largely improvises — EB content not reaching it
**Evidence:** `src/lib/curriculum/blueprintLoader.ts` was parsing 4 EB fields
(openingScenario, antiAnalogies, voiceDetectionCues, recoveryTriggers) but getting
empty results for 363 of 409 entries due to section name mismatch.
**Status:** FIXED 2026-07-24 (commit e883b120). All 4 fields now parse correctly.
**Remaining gap:** The EB contains 21 sections; only 4 are extracted. Sections like
Teaching Sequence, Tutor Actions, Assessment Signals, Demonstrations, Discovery Questions
are authored but never reach the LLM. These are the sections that tell the tutor exactly
what to DO next — they're the core of the professor's repertoire.

**To fix:** Extend `EBConceptContext` (type in `blueprintLoader.ts`) and `loadEBConceptContext()`
to also extract and inject:
- `## Teaching Sequence` → inject as "For this concept, follow this teaching order:"
- `## Tutor Actions` → inject as "When the student does X, do Y"
- `## Assessment Signals` → inject as mastery gate cues
- `## Demonstrations` → inject as concrete demo options
- `## Discovery Questions` → inject as the question bank to draw from

### GAP 2: Evidence engine is write-only — tutor never learns from past sessions
**Evidence:** `src/lib/teaching/evidence/evidenceEngine.ts` line 4:
```
// No readers wired in Phase 1. Aggregation and rolling-window worker are Phase 2.
```
`appendEvidenceEvent()` writes to EvidenceEvent table but nothing reads it back
to change behaviour.
**Impact:** Every session starts cold. The tutor doesn't remember "last time I tried
the LEGO analogy for this student and it failed." A human professor remembers.
**To fix (Phase 2):** Build a reader that on session start queries the last N
EvidenceEvents for this student + concept and injects "Past session signals:" into
the system prompt. This doesn't require the full EWMA rollup — just a simple
`prisma.evidenceEvent.findMany()` ordered by createdAt DESC, limit 5.

### GAP 3: EB Teaching Sequence never executed — tutor free-styles the order
**Evidence:** `educational-brain/concepts/chemistry/chem.found.matter.md` section
`## Teaching Sequence` contains the expert-designed step-by-step order for teaching
that concept. It is never parsed or injected.
**Impact:** The LLM decides the teaching order on its own every turn. A human professor
follows a proven pedagogical sequence — separation-test anchor → particle diagram →
classification trichotomy — not a random order.
**To fix:** Parse `## Teaching Sequence` and inject it as a numbered sequence the
LLM must follow for this concept.

### GAP 4: tutorRecovery.ts (client-side) doesn't update server state on AI failures
**Evidence:** `src/lib/learn/tutorRecovery.ts` — pure client-side functions:
`pickRecoveryMessage()` and `isFallbackResponse()` run in the browser when the API
call fails. They do NOT call any server endpoint. When the AI fails and the client
shows a fallback message, `consecutiveDontKnows` on the server is NOT incremented.
**Impact:** Two AI failures in a row look like silence to the teaching state machine.
The student may be stuck in CONFUSED state but the server thinks they're fine.
**To fix:** When `isFallbackResponse()` fires, call a lightweight server endpoint
`POST /api/learn/signal-ai-failure` that increments the failure counter in the
session snapshot.

### GAP 5: assembleLesson() always returns null — authored memory never served
**Evidence:** `src/lib/teaching/assets/assetIdentity.ts` — `assembleLesson()` queries
ACTIVE assets. No assets have been promoted to ACTIVE via admin review.
**Impact:** The ADR 14 "LLM as voice-renderer" endgame never activates. Every turn
generates fresh content, discarding what was generated before.
**To fix:** Run `npm run seed:brain-assets` (already written at
`scripts/brain/seed-knowledge-assets.ts`) and then promote the seeded assets via the
admin review endpoint (`/api/admin/knowledge-assets`). This requires ACTIVE seeds.
The seed script already exists — the assets just need admin approval.

### GAP 6: Teaching action selection is LLM-improvised, not from the authored action catalog
**Evidence:** `src/lib/teaching-engine/index.ts` `decideActionType()` returns one of
7 hardcoded strings based on conversation state. The authored Teaching Action Library
(`educational-brain/teaching-actions/`) with its 27 actions (SHOW/TELL/DO/TEST-THINKING/
ORGANIZE/SOCIAL) is never consulted.
**Impact:** The tutor picks "explain" or "ask" by rule of thumb. A professor picks
"Thought Experiment" for a confused physics student, "Error Analysis" for a
misconceiving math student, "Role-Play" for a language student — context-specific.
**To fix:** Wire `decideActionType()` to read from the EB entry's `## Tutor Actions`
section, which maps student state → specific teaching action from the 27-action catalog.

### GAP 7: Transfer verification missing
**Evidence:** `conversationState.ts` has TRANSFER as the 6th phase but the system prompt
has no instruction distinguishing "reproduce what I showed you" from "apply this to a new
domain." `masteryGate.ts` gates on PRACTICE correctness, not TRANSFER correctness.
**Impact:** A student can "master" a concept by parroting examples without ever
demonstrating real understanding.
**To fix:** Add a transfer probe template to the system prompt in TRANSFER phase:
"Use a domain the student hasn't seen yet for this concept."

### GAP 8: IQ/fluency calibration is static, not dynamic
**Evidence:** `src/lib/curriculum/placement.ts` sets starting lesson based on level.
Level is self-reported at onboarding. Nothing in the runtime adjusts the teaching
register (vocabulary complexity, burst length, wait time) based on observed response
latency or answer quality.
**Impact:** A student who self-reports "intermediate" but gives beginner-level answers
gets intermediate-register explanations they can't process.
**To fix:** The `<!--SIGNAL-->` tag already captures `confidence` and `correctness`.
Add a `fluency` inference step: if correctness is low AND answer latency (already
captured as server-measured ms) is high, inject a register-reduction instruction
("Student is processing slowly — use shorter bursts, simpler vocabulary this turn").

### GAP 9: Boredom/fatigue detection is theorized but undetectable
**Evidence:** `educational-brain/decision-engine/02-student-state-engine.md` documents
BORED and FATIGUED states. The runtime has no detection signal for them — there's no
behavioral baseline to compare against.
**Short-term fix:** Add a session-length signal. After N turns (configurable), if the
student's answer length is decreasing and correctness is still high, inject:
"Student may be tiring — suggest a pause or switch to a fun application problem."

### GAP 10: Voice signal data discarded at STT endpoint
**Evidence:** `src/app/api/stt/route.ts` requests `response_format: 'json'` from Whisper,
receiving only `{ text }`. Switching to `verbose_json` would give segment timestamps,
enabling latency-vs-baseline detection (foundations/03 §7 — the one genuine text-channel
instrument). Currently all 4 voice instruments (latency, prosody, hesitation, self-correction)
are unavailable to the decision layer.
**To fix:** Change `response_format` to `'verbose_json'` in `src/app/api/stt/route.ts`,
parse `segments[0].start` and `segments[-1].end` as response duration, pass as a header
or query param to the chat route, store in signal alongside the message timestamp.

---

## 5. Priority Roadmap (Ordered by Teaching Impact)

### P1 — Extract and inject full EB Teaching Sequence + Tutor Actions (HIGHEST IMPACT)
**File:** `src/lib/curriculum/blueprintLoader.ts`
**What to do:**
1. Add `teachingSequence: string[]`, `tutorActions: string`, `demonstrations: string`,
   `discoveryQuestions: string[]`, `assessmentSignals: string` to `EBConceptContext`.
2. Add parser functions:
   - `parseEBTeachingSequence(content)` → extracts `## Teaching Sequence` numbered steps
   - `parseEBTutorActions(content)` → extracts `## Tutor Actions` raw text
   - `parseEBDemonstrations(content)` → extracts `## Demonstrations` raw text
   - `parseEBDiscoveryQuestions(content)` → extracts `## Discovery Questions` as string[]
   - `parseEBAssessmentSignals(content)` → extracts `## Assessment Signals` raw text
3. Call them in `loadEBConceptContext()`.
4. In `buildBlueprintContextBlock()` (also in `blueprintLoader.ts`), add new prompt sections:
   - "TEACHING SEQUENCE FOR THIS CONCEPT (follow this order):"
   - "TUTOR ACTIONS (when student does X → do Y):"
   - "DEMONSTRATIONS AVAILABLE:"
   - "DISCOVERY QUESTIONS TO DRAW FROM:"
   - "MASTERY SIGNALS:"

This alone will transform the tutor from a generalist responder to a concept-specific expert.

### P2 — Past session signal injection (evidence engine Phase 2 reader)
**File:** Create `src/lib/teaching/sessionHistory.ts`
**What to do:**
1. On each chat turn, query `prisma.evidenceEvent.findMany()` for this student + conceptId,
   last 5 events, ordered by createdAt DESC.
2. Summarize into a compact block: "PAST SIGNALS: [2 correct at CHECK] [1 misconception: phrase]"
3. Inject into system prompt before the TEACHING ENGINE DECISION block.

This makes the tutor remember. Without it, every session restarts from zero.

### P3 — Dynamic fluency calibration via SIGNAL data
**Files:** `src/app/api/learn/chat/route.ts`, `src/lib/ai/client.ts`
**What to do:**
1. After parsing `<!--SIGNAL-->`, compute a `fluencyEstimate`:
   - HIGH: correctness='correct' AND latencyMs < 8000 AND confidence != 'low'
   - LOW: correctness='incorrect' AND latencyMs > 15000 OR confidence='low' repeatedly
2. Store `fluencyEstimate` in contextSnapshot.
3. Inject a register instruction into system prompt:
   - LOW: "REGISTER: Student is processing slowly. Max 2-sentence bursts. Use daily-life
     analogies only. No technical vocabulary until used 3 times."
   - HIGH: "REGISTER: Student is processing confidently. Can compress demonstration phase.
     Intellectual challenge welcome."

### P4 — Teaching action catalog wiring
**File:** `src/lib/teaching-engine/index.ts`
**What to do:**
1. After `decideActionType()`, check if the current EB entry has `tutorActions` content.
2. If yes, append to the TEACHING ENGINE DECISION block in the system prompt:
   "Authored action dispatch for this student's current state: [tutorActions text]"
3. This makes the engine execute AUTHOR-DESIGNED actions rather than LLM-improvised ones.

### P5 — Transfer verification (phase distinction)
**File:** `src/lib/ai/client.ts`
**What to do:**
1. Detect when `conversationState.phase === 'TRANSFER'`.
2. Inject: "TRANSFER PHASE — You are now verifying REAL understanding, not reproduction.
   Use an example domain the student has NOT seen in this session. Ask them to apply
   the concept to it. If they succeed with a genuinely novel case, mastery is real."

### P6 — STT verbose_json for latency signal
**File:** `src/app/api/stt/route.ts`
**What to do:**
1. Change `response_format: 'json'` to `response_format: 'verbose_json'`.
2. Extract response duration from segments.
3. Pass as `X-Response-Duration-Ms` header to the chat route (or store in a redis key).
4. In route.ts, read this and include in the SIGNAL alongside message timestamps.

### P7 — Session-length fatigue detection
**File:** `src/app/api/learn/chat/route.ts`
**What to do:**
1. Count turns in contextSnapshot.
2. If turns > 20 AND recent answer lengths are decreasing: inject "FATIGUE SIGNAL" block.

---

## 6. Technical Architecture — Key Wiring Map

```
Student message
      │
      ▼
route.ts (orchestrator)
      │
      ├─► placementVerification.ts  (bracket probe for intermediate/advanced)
      │
      ├─► sessionLifecycle.ts       (OPENING/CORE/CLOSING, failure budget, gap boundary)
      │
      ├─► blueprintLoader.ts        (blueprint + EB concept entry — injected into prompt)
      │         └─ loadBlueprint()          → BLUEPRINT CONTEXT block
      │         └─ loadEBConceptContext()   → EB CONCEPT CONTEXT block (4 fields, more to add)
      │
      ├─► teaching-engine/index.ts  (decide() — concept, action, difficulty, goal)
      │         └─ teachingStrategy.ts      → 7-value teaching posture
      │         └─ conversationState.ts     → 6-phase state machine
      │
      ├─► assets/assetIdentity.ts   (assembleLesson() — serves authored content if ACTIVE)
      │
      ├─► ai/client.ts              (BUILDS FINAL SYSTEM PROMPT — assembles all blocks)
      │
      ├─► recoveryGuard.ts          (LAST: injects recovery script if distress detected)
      │
      ▼
    LLM (Groq / YandexGPT)
      │
      ▼
route.ts (response processing)
      ├─► signals.ts                (parse <!--SIGNAL--> tags, strip them from response)
      ├─► masteryGate.ts            (evaluate [LESSON_COMPLETE], strip unauthorized ones)
      ├─► evidence/evidenceEngine.ts (write EvidenceEvent rows)
      └─► contextSnapshot persist   (update session state in DB)
```

---

## 7. How to Build System Prompt Blocks

All prompt blocks are assembled in `src/lib/ai/client.ts`. The pattern is:
```typescript
// In buildSystemPrompt():
let systemPrompt = BASE_SYSTEM_PROMPT

if (blueprintContext?.found) {
  systemPrompt += buildBlueprintContextBlock(blueprintContext.blueprint, misconceptions)
}

if (ebContext?.found) {
  systemPrompt += buildEBConceptContextBlock(ebContext.context)  // add new fields here
}

// ... more blocks ...

if (isFirstLesson) {
  systemPrompt += buildFirstLessonBlock(subjectSlug)  // MUST be last advisory block
}

if (recoveryState) {
  systemPrompt += buildRecoveryBlock(recoveryState)   // MUST be absolute last
}
```

To add a new teaching instruction to the tutor, add a block in this function.
Blocks added LATER override earlier advisory blocks (the LLM weighs later instructions
more heavily). Recovery and First Lesson blocks are last by design.

---

## 8. Running the Project

```bash
cp .env.example .env
# Required: DATABASE_URL, AUTH_SECRET (openssl rand -base64 32), GROQ_API_KEY
# Optional: YANDEX_API_KEY + YANDEX_FOLDER_ID (Russia-only fallback)
npm install
npx prisma db push
npm run dev           # http://localhost:3000
npm run build         # prisma generate + next build
npx tsc --noEmit      # type check
npm test              # vitest suite (2044 tests as of 2026-07-24)
```

---

## 9. Hard Constraints (Never Violate)

1. **Never modify `docs/{subject}/kg/graph.json`** — Canonical Knowledge Graphs are owned
   by the Curriculum Production Pipeline.
2. **Never modify `docs/curriculum/blueprints/`** — Blueprint files are Pipeline-generated.
3. **Never modify `educational-brain/`** — The EB is the authored knowledge library,
   frozen by governance. Only READ it.
4. **Never push to any branch except main** — All work on main, always.
5. **Never create PRs unless explicitly asked.**
6. **Always run `npm test` before committing** — suite must stay green.
7. **Always run `npx tsc --noEmit` before committing** — must be 0 errors.
8. **Do NOT redesign the Architecture** — ADRs 01-14 and the Educational Brain Bible
   are frozen. Extend existing systems, never replace them.

---

## 10. What "Human Professor Parity" Looks Like (Success Criteria)

You will know the tutor is matching a human professor when:

1. **Concept-specific behaviour:** The tutor's opening for `phys.meas.units` (SI units)
   is different from its opening for `phys.mech.newtons-first-law` (Newton's First Law) —
   each driven by the authored Teaching Sequence for that concept, not generic LLM output.

2. **Failure handling:** When a student fails twice, the tutor does NOT ask a third harder
   question. It gives an unmissable success (echo-level), then closes warmly.
   `recoveryGuard.ts` + `sessionLifecycle.ts` together enforce this.

3. **Register calibration:** A student who answers slowly and incorrectly gets shorter
   bursts and daily-life anchors. A student who answers fast and correctly gets intellectual
   challenge and compressed explanations.

4. **Anti-analogies enforced:** When teaching `phys.meas.units`, the tutor never uses the
   "ruler" analogy (it conflates the instrument with the unit). This is authored in the EB
   entry's `## Analogies` section — it must reach the LLM.

5. **Cross-session memory:** On return visit, the tutor says something like "last time we
   established that you understand X — let's build on that" — driven by evidence event
   history, not re-probing from zero.

6. **Transfer verification:** The tutor's lesson on Newton's First Law is not complete until
   the student successfully applies it to a scenario they haven't seen in this session
   (a hockey puck on ice, not the same block on a table example used in teaching).

7. **Deliberate close:** Every session ends with: one specific thing the student did, one
   forecast for next session, one open loop. Never just "good work, see you next time."

---

## 11. Quick Reference — Files You Will Touch Most

| What to change | File |
|----------------|------|
| Add new EB sections to prompt | `src/lib/curriculum/blueprintLoader.ts` |
| Change system prompt structure | `src/lib/ai/client.ts` |
| Change teaching action logic | `src/lib/teaching-engine/index.ts` |
| Change recovery behaviour | `src/lib/teaching/recoveryGuard.ts` |
| Change session phase logic | `src/lib/teaching/sessionLifecycle.ts` |
| Change mastery gate | `src/lib/teaching/masteryGate.ts` |
| Add past-session memory reader | `src/lib/teaching/sessionHistory.ts` (new) |
| Change fluency/register logic | `src/app/api/learn/chat/route.ts` |
| Fix voice signal data | `src/app/api/stt/route.ts` |

---

*Document version: 1.0 — 2026-07-24*
*Author: Claude session (Ammar0909291/My-tutor) acting as Chief Teaching Engineer*
