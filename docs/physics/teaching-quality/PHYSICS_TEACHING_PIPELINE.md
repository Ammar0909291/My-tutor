# Physics Teaching Pipeline — Canonical Specification

**Status:** AUTHORITATIVE v1.0  
**Date:** 2026-07-13  
**Purpose:** Defines the complete pipeline from authored teaching knowledge to student
understanding. Establishes the gold standard for all Physics teaching quality. Founded
on evidence from the first real student session.

---

## 0. The Founding Evidence

A real student session on `phys.meas.scalars-vectors` (Scalars and Vectors) produced
this exchange:

> Student: "I don't know."  
> Student: "Still don't understand."  
> Student: "Can you give me a diagram?"  
> Student: "I cannot understand like this."

The tutor responded to each "I don't understand" with a similar explanation — different
words, same abstraction level. The student eventually understood only after this explanation
reached them:

> "Walk 100 metres."  
> vs.  
> "Walk 100 metres north."

**This explanation exists in the authored blueprint at TA-A01 line 1.** The blueprint
for `phys.meas.scalars-vectors` opens with exactly this scenario: "You want to meet a
friend. They say 'I'm 500 metres away.' Is that enough to find them?" — and the EB
concept entry Recovery Notes state: "shrink to: 'Can temperature point north? Can force
point north? What's the difference?'"

**The authored knowledge was correct. The runtime never accessed it.**

This is the founding failure of the Teaching Quality Program. The pipeline has a gap
between what is authored and what reaches the LLM.

---

## 1. The Two Layers of Authored Knowledge

Every physics concept has two complementary files:

### 1A. The Teaching Blueprint (`docs/curriculum/blueprints/{id}.md`)

The **execution layer** — prescribes what to do, in what order, for each student state.

Contents:
- **Section 0 — Concept Profile**: metadata (difficulty, Bloom, mastery threshold, etc.)
- **Section 1 — Learning Objective**: the measurable target for this concept
- **Section 2 — Student State Matrix**: 5 entry states (S0/S1/S2/S6/S9) and protocol routing
- **Section 3 — Diagnostic Battery**: DB-1 and DB-2 questions that determine the student state
- **Section 4 — Prerequisite Check**: verify prior concepts are not blocking
- **Section 5 — Protocol Library**: Teaching Action sequences for each student state
  - Protocol A (S0 complete novice): Full CPA path, 5 TAs
  - Protocol B (S1 partial knowledge): Targeted gap-fill, 3–4 TAs
  - Protocol C (S2 misconception carrier): MAMR repair, 3–5 TAs
  - Protocol D (S6 low confidence): Scaffolded CPA, 4 TAs (no cognitive conflict)
  - Protocol E (S9 second-language learner): Visual-first, 3 TAs
- **Section 6 — Misconception Engine**: Each misconception with observable symptom,
  diagnostic trigger, root cause, repair chain
- **Section 7 — Assessment Battery**: AB-1 through AB-4 graded tasks
- **Section 8 — Mastery Gate**: 5-probe terminal assessment (P77–P78)
- **Section 9 — Retrieval Schedule**: Spaced repetition intervals (Day 1, 3, 7, 21, 60)
- **Section 10 — Validation Checklist**: 20 V-checks confirming blueprint integrity

### 1B. The EB Concept Entry (`educational-brain/concepts/physics/{id}.md`)

The **intelligence layer** — explains why to do it that way.

Contents:
- **Mental models**: Beginner → Intermediate → Advanced → Expert model descriptions
- **Why beginners fail**: Root cause analysis of the most common failure modes
- **Misconception library**: Richer than the blueprint — includes birth-type reasoning,
  detection probes with verbatim phrasing, and multi-step recovery notes
- **Explanation library**: Age-specific explanations (Age 10-12, Age 14+, returning adult)
- **Analogy library**: Best analogy + breaking point + anti-analogies to avoid
- **Demonstration library**: Home, teacher, digital, and prediction-first demos
- **Discovery lesson**: Whether guided discovery or direct instruction is appropriate + why
- **Teaching actions**: Ranked dispatch list from Delivery 2 §6
- **Voice teaching**: How it sounds when taught well; load-bearing sentences to slow down on;
  what to listen for (active misconception detection signals)
- **Assessment**: Golden probe; distractor-mapped items; guided→independent fading ladder
- **Recovery notes**: Likeliest student utterances; concept-specific "shrink-to" question
- **Memory & review**: Concept type; review form; automaticity target
- **Transfer map**: Near, far, cross-subject, real-world, expert transfer contexts

**These two files together constitute the complete authored teaching knowledge for a concept.
No teaching decision should be made without consulting both.**

---

## 2. The Runtime Injection — What Currently Reaches the LLM

The `blueprintLoader.ts` injects a `BLUEPRINT CONTEXT` block into the system prompt.
This is what the LLM actually receives when teaching a concept.

### 2A. What IS injected (current state)

For Protocol-format blueprints (`phys.meas.units`, `phys.meas.scalars-vectors`, and
43 other foundational physics concepts):

```
BLUEPRINT CONTEXT
Concept: {id}

CONCEPT SPINE
Definition: {Core idea from Section 0}
Why it matters: Key vocabulary: {vocabulary list from Section 0}

KNOWN MISCONCEPTIONS — watch for these and address them directly:

MC-1: "{title}"
  Probe: {Observable symptom text}
  Watch for: "{first 80 chars of symptom}"
  Correction: {Repair chain header only — e.g. "P27 → P07 (circular track...)"}
  Install: {empty — not extracted for Protocol format}

EXPLANATION LIBRARY — choose the explanation best suited:

Explanation A — Learning Objective:
{Learning objective text from Section 1}
```

### 2B. What is NOT injected (the gap)

The following authored knowledge is available but never reaches the LLM:

| Authored knowledge | Location | Why it matters |
|--------------------|----------|----------------|
| CPA opening scenario (concrete anchor for S0) | Blueprint TA-A01 | The "Walk 100m north" scenario — exactly what the student needed |
| Escalation rules on INCORRECT/NO_RESPONSE | Blueprint P49/P50/P52/P54 routing | When student says "I don't understand", what to do differently |
| Recovery notes — concept-specific "shrink-to" | EB concept entry | "Can temperature point north? Can force point north?" |
| Demonstration library | EB concept entry | Concrete demos for when abstract fails |
| Voice cues — "what to listen for" | EB concept entry | Active misconception detection from student's language |
| Best analogy + anti-analogies | EB concept entry | "Temperature vs wind velocity" works; "scalars are small" is harmful |
| Why beginners fail | EB concept entry | Root cause that informs teaching approach |
| Age-specific explanations | EB concept entry | Age 10-12, 14+, returning adult — different entry points |

### 2C. The injection gap — quantified

For `phys.meas.scalars-vectors`:
- Authored words: ~12,000 (blueprint) + ~4,000 (EB concept entry)
- Injected words: ~500
- Teaching-critical content reaching LLM: approximately **3% of authored knowledge**

The critical 97% includes: every escalation path, every concrete scenario, every demo,
every recovery script, every analogy, every detection cue.

---

## 3. The Canonical Teaching Pipeline

The full pipeline from authored knowledge to student mastery:

```
┌─────────────────────────────────────────────────────────────────┐
│ LAYER 1 — AUTHORED KNOWLEDGE (complete, quality-validated)       │
│                                                                   │
│  Teaching Blueprint           EB Concept Entry                   │
│  ├── Student State Matrix     ├── Why beginners fail             │
│  ├── Diagnostic Battery       ├── Mental models                  │
│  ├── Protocol Library         ├── Explanation library            │
│  │   ├── Protocol A (S0)      ├── Analogy library                │
│  │   ├── Protocol B (S1)      ├── Demonstration library          │
│  │   ├── Protocol C (S2 MC)   ├── Voice cues                     │
│  │   ├── Protocol D (S6)      ├── Recovery notes                 │
│  │   └── Protocol E (S9)      └── Transfer map                   │
│  ├── Misconception Engine                                         │
│  └── Mastery Gate                                                 │
└─────────────────────────────────────────────────────────────────┘
                         │
                    [blueprintLoader]
                         │
                  ⚠ INJECTION GAP ⚠
            (only ~3% currently passes through)
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│ LAYER 2 — RUNTIME INJECTION (current: incomplete)                │
│                                                                   │
│  ✓ Concept definition                                             │
│  ✓ Misconception names + observable symptoms                      │
│  ✓ Learning objective                                             │
│                                                                   │
│  ✗ CPA concrete anchor (the opening scenario)                     │
│  ✗ Escalation sequences (what to do when student fails)          │
│  ✗ Recovery scripts (concept-specific shrink-to)                  │
│  ✗ Demonstration library                                          │
│  ✗ Voice detection cues                                           │
│  ✗ Age-appropriate explanations                                   │
│  ✗ Anti-analogies to avoid                                        │
└─────────────────────────────────────────────────────────────────┘
                         │
                    [system prompt]
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│ LAYER 3 — LLM TEACHING (current gap: improvisation)              │
│                                                                   │
│  Student: "I don't understand."                                   │
│  LLM: no authored escalation path → generates a similar          │
│       explanation again (observed failure mode)                   │
│                                                                   │
│  Required: LLM receives authored recovery notes → applies         │
│       concept-specific "shrink-to" question → student              │
│       understands from concrete anchor                            │
└─────────────────────────────────────────────────────────────────┘
                         │
              [SIGNAL:CORRECT / SIGNAL:INCORRECT]
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│ LAYER 4 — EVIDENCE CAPTURE (implemented, Wave 0)                 │
│                                                                   │
│  ✓ PROBE_OUTCOME written (correctness × latency × confidence)     │
│  ✓ MISCONCEPTION_DETECTED written (verbatim phrase)               │
│  ✓ TeachingStrategyEvent rows (L5 decision-consequence join)     │
└─────────────────────────────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│ LAYER 5 — MASTERY (current gap: no authored mastery gate in LLM) │
│                                                                   │
│  TopicProgress written from SIGNAL (Wave 0)                       │
│  Missing: P77–P78 five-probe gate driving final mastery verdict   │
└─────────────────────────────────────────────────────────────────┘
```

---

## 4. The Gold Standard — What Quality Teaching Looks Like

A physics teaching session meets the gold standard when all five criteria are satisfied:

### G1 — Concrete Before Abstract

The session opens with a concrete scenario anchored to physical objects or direct
experience, BEFORE any formal definition is given. For `phys.meas.scalars-vectors`:
the "I'm 500 metres away — is that enough to find me?" question MUST precede the
definition of "vector."

**Failure mode (observed):** Opening with the formal definition ("A vector quantity
requires both magnitude and direction...") before the learner has experienced WHY
direction matters.

### G2 — Escalation Decreases Abstraction

When a student signals confusion (says "I don't understand", gives a wrong answer,
goes silent), the next teaching action MUST be more concrete than the previous one —
not a restatement of the same idea in different words.

**Failure mode (observed):** Student fails three times; tutor gives three progressively
more verbose restatements of the same abstract definition.

**Authored escalation path** (what should happen):
1. First failure → try a different explanation from the authored library
2. Second failure → go to the concrete demo (walk 3m north then 4m east)
3. Third failure → shrink to the smallest recoverable question ("Can temperature
   point north?")
4. Fourth failure → Protocol D (low-confidence path, remove cognitive conflict)

### G3 — Misconception-Targeted Recovery

When a student's answer reveals a specific misconception, the recovery must match
the misconception — not be a generic "let me explain again."

The authored misconception library for each concept contains:
- The characteristic phrase to detect it
- The specific cognitive conflict to surface it (P28)
- The bridge text (P30) 
- The replacement concept (P31)

**Gold standard:** student says "velocity is 60 km/h" (no direction) → tutor
detects M2 active → uses circular track scenario → surfaces conflict (constant
speed, changing direction) → installs speed/velocity distinction.

### G4 — Mastery Gate Before Advancement

A student advances to the next concept ONLY after passing the five-probe terminal
assessment (P77–P78): generation probe, transfer probe, boundary probe, classification
probe, explanation probe.

Partial mastery → schedule Day 1 retrieval → advance.
Failed mastery → return to weakest protocol entry point → no advancement.

**Current gap:** advancement is driven by conversational flow, not a structured
five-probe gate.

### G5 — Retrieval at Scheduled Intervals

After first mastery, the concept is reviewed at Day 1, 3, 7, 21, 60 intervals with
appropriate probe types. This is the authored `Retrieval Schedule` section of each
blueprint.

**Current gap:** spaced repetition scheduling for Library Mode is not yet connected
to the authored retrieval schedule.

---

## 5. Injection Enhancement Specification

To close the gap between authored knowledge and runtime injection, the following
additions to `buildBlueprintContextBlock()` are specified.

Priority order (highest impact first):

### Priority 1 — Recovery Notes (closes the Vectors failure)

**Source:** EB concept entry, `## Recovery notes` section  
**What to inject:**
```
RECOVERY PROTOCOL — use when student signals confusion:
- Likeliest confusion utterance: {text}
- Shrink to: {concept-specific smallest recoverable question}
- Escalation order: {concrete anchor → demo → shrink-to → Protocol D}
```
**Impact:** Directly prevents the observed failure mode. Student says "I don't
understand" → LLM applies authored recovery → 3-step escalation instead of repetition.

### Priority 2 — CPA Opening Scenario

**Source:** Blueprint Protocol A TA-A01, P04/P06 context  
**What to inject:**
```
OPENING SCENARIO (use at session start for new learners):
{concrete opening scenario from TA-A01}
```
**Impact:** Ensures the concrete anchor is the first thing the student experiences,
not the formal definition.

### Priority 3 — Voice Detection Cues

**Source:** EB concept entry, `## Voice teaching` section, "What to listen for"  
**What to inject:**
```
ACTIVE MISCONCEPTION SIGNALS — if you hear these, a misconception is live:
- "{phrase}" → {which misconception}: use {correction}
- "{phrase}" → {which misconception}: use {correction}
```
**Impact:** Enables real-time misconception detection from student's exact words,
not just from explicit wrong answers.

### Priority 4 — Age-Appropriate Explanations

**Source:** EB concept entry, `## Explanation library`  
**What to inject:**
```
EXPLANATION LIBRARY (choose based on student age/level):
- Age 10-12: {story-based explanation}
- Age 14+: {structural explanation}
- Returning adult: {experience-connecting explanation}
```
**Impact:** Replaces the improvised "let me try another way" with authored,
tested, age-appropriate alternatives.

### Priority 5 — Anti-Analogies

**Source:** EB concept entry, `## Analogy library`, anti-analogy entries  
**What to inject:**
```
ANALOGIES — tested and safe:
- Best: {analogy} [breaks if: {breaking point}]
ANTI-ANALOGIES — do not use:
- {anti-analogy}: installs {which misconception}
```
**Impact:** Prevents LLM from spontaneously generating analogies that actively
harm the learner's model (documented failure pattern in the Brain).

---

## 6. `phys.meas.units` — Gold Standard Audit

`phys.meas.units` is the root concept of the entire physics curriculum (zero prerequisites;
8 downstream unlocks). It is also the simplest concept by Bloom level (remember). The audit
examines it across all layers.

### 6A. Authored Knowledge Audit

**Teaching Blueprint status:**
- Concept Profile: ✓ COMPLETE (difficulty=foundational, bloom=remember, threshold=0.70)
- Student State Matrix: ✓ COMPLETE (5 states: S0/S1/S2/S6/S9)
- Diagnostic Battery: ✓ COMPLETE (DB-1 free recall + DB-2 MC screen, 3 targeted questions)
- Protocol Library: ✓ COMPLETE (5 protocols, 17 Teaching Actions)
  - Protocol A (S0, full novice): 5 TAs — concrete anchoring → chunked recall → perceptual
    chart → non-SI distinctions → mastery gate ✓
  - Protocol B (S1, partial): 3 TAs — gap identification → retrieval → mastery gate ✓
  - Protocol C (S2, MC carrier): 5 TAs — MC-1/2/3/4 repair + mastery gate ✓
  - Protocol D (S6, low confidence): 4 TAs — no cognitive conflict (GR-5) ✓
  - Protocol E (S9, visual): 3 TAs — visual-first + scaffold removal ✓
- Misconception Engine: ✓ COMPLETE (4 MCs with full MAMR chains)
- Assessment Battery: ✓ COMPLETE (AB-1 free recall, AB-2 classification, AB-3 symbol-match, AB-4 conversion)
- Mastery Gate: ✓ COMPLETE (P77–P78 five-probe terminal)
- Retrieval Schedule: ✓ COMPLETE (Days 1, 3, 7, 21, 60 with specific probe types)
- Validation Checklist: ✓ ALL 20 V-CHECKS PASS

**EB Concept Entry status:**
- Mental models: ✓ 4-level progression (beginner → intermediate → advanced → expert)
- Why beginners fail: ✓ Root cause: "units as decorative rather than constitutive"
- Misconception library: ✓ 4 MCs with birth-type reasoning
- Explanation library: ✓ 4 variants (Age 10-12, Age 14+, returning adult, visual frame)
- Analogy library: ✓ Primary colours + alphabet + explicit anti-analogy
- Demonstration library: ✓ Home demo + Mars Climate Orbiter + interactive converter + prediction
- Discovery lesson: ✓ Direct instruction argued (with reasoning: convention, not logical necessity)
- Teaching actions: ✓ Ranked (Tell→Show→Apply, Error exposure, Retrieval practice)
- Voice teaching: ✓ Load-bearing sentence identified; detection signals for M1/M2/M3
- Assessment: ✓ Golden probe + distractor-mapped items + 5-step fading ladder
- Recovery notes: ✓ "shrink to: 'What is the unit we use every day for length?'"
- Memory & review: ✓ Concept type: fact-set; review form: flash-card retrieval
- Transfer map: ✓ Near/far/cross-subject/real-world/expert mapped

**Authored knowledge verdict: GOLD STANDARD** — both files are complete and consistent.
No gaps found at the authored layer.

### 6B. Runtime Injection Audit

What actually reaches the LLM for `phys.meas.units` (Protocol-format):

**Injected — PASS:**
- Core idea: ✓ "The International System of Units (SI) defines seven base units..."
- Key vocabulary: ✓ "SI unit, base unit, derived unit, quantity, symbol, metre, kilogram..."
- MC-1 through MC-4: ✓ All four misconceptions with observable symptoms

**Not injected — GAPS:**

| Gap | Impact | Priority |
|-----|--------|----------|
| Recovery note: "shrink to: 'What is the unit we use every day for length?'" | HIGH — exactly what prevents the Vectors-failure pattern | P1 |
| Mars Climate Orbiter demonstration | MEDIUM — the most powerful motivation for SI precision | P2 |
| Age-specific explanations (the "medieval foot" story for Age 10-12) | MEDIUM — multiple entry points for different learners | P2 |
| Anti-analogy: "units are just different names for the same thing" | HIGH — this actively installs M1 if used | P1 |
| Voice cues: "kg of weight" → M2; drops unit mid-sentence → M1; "sec" → M3 | MEDIUM — real-time detection | P2 |
| Protocol A TA-A01 opening: seven physical objects scenario | MEDIUM — concrete anchor for S0 learners | P3 |

**Injection verdict: PARTIAL** — definition and misconceptions injected; escalation and
recovery not injected.

### 6C. Teaching Quality Gaps for `phys.meas.units`

**Gap 1 (Critical) — No recovery escalation in the LLM's context.**  
If a student says "I don't understand the SI system", the LLM does not have access to:
> "shrink to: 'What is the unit we use every day for length? Just the name.' (metre) —
> then, 'and the short symbol?' (m). Build from the one they know. Do NOT start by
> asking for all seven."

This is authored in the EB concept entry Recovery Notes. It is not injected.

**Gap 2 (High) — Anti-analogy risk is unguarded.**  
The LLM may spontaneously say "units are just different names for the same thing, like
Celsius and Fahrenheit" — which the EB concept entry explicitly marks as an anti-analogy
that installs M1 directly. The injected content has no anti-analogy warning.

**Gap 3 (High) — Misconception voice detection signals not injected.**  
The blueprint has explicit detection signals: "kg of weight" or "kg of force" → M2 active;
dropping the unit mid-sentence → M1 active; "sec" or "amp" instead of "s" and "A" → M3
active. These voice cues allow real-time detection from conversational phrasing. They
are not in the injected content.

**Gap 4 (Medium) — Opening is definition-first risk.**  
Without the CPA anchor being injected, there is no guarantee the session opens concretely.
The LLM may open with "The SI system consists of seven base units..." instead of using
the Mars Orbiter story or the medieval foot chaos as the need-creation hook.

### 6D. Verdict for `phys.meas.units`

| Layer | Status |
|-------|--------|
| Authored knowledge | ✓ GOLD STANDARD |
| Runtime injection | ⚠ PARTIAL (definition + MCs; recovery/escalation missing) |
| Teaching quality | ⚠ RISK (four gaps identified; none blocking but all reduce quality) |
| Mastery gate | ✗ NOT ACTIVE (five-probe gate exists in blueprint, not connected to runtime) |
| Retrieval schedule | ✗ NOT ACTIVE (authored at Days 1/3/7/21/60; not connected to Library Mode) |

**Teaching quality verdict: READY WITH GAPS**  
`phys.meas.units` CAN be taught at adequate quality today. It CANNOT be taught at gold
standard quality until Gaps 1–4 are closed via injection enhancement.

---

## 7. Criteria for Gold Standard Teaching Quality

A physics concept achieves gold standard teaching quality when ALL of the following
are true:

| Criterion | Measurement | Current state |
|-----------|-------------|---------------|
| **Concrete-before-abstract** | Opening message references a physical scenario before any formal definition | ✗ Not enforced |
| **Recovery escalation** | On student confusion, next action is MORE concrete than current | ✗ Not injected |
| **Misconception voice detection** | LLM can detect MC from student's conversational phrasing | ✗ Not injected |
| **Age-appropriate entry** | Explanation matches student's age/level | ✗ Not injected |
| **Anti-analogy avoidance** | Harmful analogies are explicitly excluded | ✗ Not injected |
| **Mastery gate active** | Five-probe terminal assessment runs before advancement | ✗ Not connected |
| **Spaced retrieval active** | Day 1/3/7/21/60 reviews are scheduled and delivered | ✗ Not connected |

**Gold standard requires all 7 criteria.** Current state satisfies 0 of 7 consistently.

---

## 8. Ordered Improvement Roadmap

In priority order, from highest to lowest impact per implementation effort:

### Phase TQ-1 — Recovery and Escalation Injection (closes the Vectors failure)

Expand `buildBlueprintContextBlock()` to inject:
1. EB concept entry Recovery Notes → "shrink-to" question
2. Anti-analogies from Analogy Library → explicit exclusion list
3. Voice detection cues from Voice Teaching → "if you hear X, it means Y"

Source: EB concept entry (not the blueprint). Requires blueprintLoader to also read
`educational-brain/concepts/{subject}/{id}.md` for the active concept.

**Scope:** `blueprintLoader.ts` + `buildBlueprintContextBlock()`.  
**Impact:** Directly closes the Vectors-failure gap. Applies to all 67 authored EB
concept entries.

### Phase TQ-2 — Opening Scenario Injection

Inject Protocol A TA-A01 context and P06 concrete scenario into the prompt.
This ensures the first teaching action is concrete, not abstract.

**Scope:** Protocol-format section extraction in `blueprintLoader.ts`.  
**Impact:** Enforces G1 (Concrete Before Abstract) for 47 Protocol-format blueprints.

### Phase TQ-3 — Age-Appropriate Explanation Selection

Inject all three age-specific explanations from EB concept entry Explanation Library.
Tag each with age/level. Use student's `currentLevel` (beginner/intermediate/advanced)
to select which to prioritise.

**Scope:** `blueprintLoader.ts` + `buildBlueprintContextBlock()`.  
**Impact:** Multiple authored entry points instead of LLM improvisation.

### Phase TQ-4 — Mastery Gate Connection

Connect the blueprint's five-probe terminal assessment (P77–P78) to the session end.
Require all five probes to be answered before issuing MASTERY_CONFIRMED signal.

**Scope:** Route.ts session lifecycle + firstLessonGuard pattern.  
**Impact:** Enforces G4 (Mastery Gate Before Advancement) for all 195 blueprints.

### Phase TQ-5 — Retrieval Schedule Connection

Connect blueprint's Retrieval Schedule (Days 1/3/7/21/60) to Library Mode session
opening. Surface the scheduled review item as the session's OPENING block.

**Scope:** Session lifecycle + Library Mode session planner.  
**Impact:** Enforces G5 (Retrieval at Scheduled Intervals).

---

## 9. The Gold Standard Session — Example

What a gold-standard teaching session for `phys.meas.scalars-vectors` looks like,
with all gaps closed:

```
OPENING (need-creation, concrete):
"Tell me — your friend texts you: 'I'm 500 metres away.'
Can you find them? What's missing?"

[Student: "Which direction?"]

TEACH (the distinction emerges from the student's own answer):
"Exactly. Distance — how far — isn't enough by itself. You need direction too.
That's the difference between a scalar and a vector.
Some quantities in physics, direction changes everything.
Others, direction is irrelevant."

[Student says: "Is velocity just a fancier word for speed?"]

← LLM detects M2 from phrase "just a fancier word" →

MISCONCEPTION TARGETED REPAIR (authored, not improvised):
"Let's test that. A car on a circular track drives at a constant 60 km/h.
Does its SPEED change?" [No.]
"Now — is it going north? Is it going east? Is it going south?"
"Its DIRECTION changes every moment. If speed and velocity were the same word,
what changed? Speed didn't. Velocity did."

← Student resolves contradiction →

MASTERY GATE (P77-P78 five probes):
"Before we move on — from memory: two scalars, two vectors. For each vector,
tell me what direction information it needs."
```

This session is fully authored today. It is not what the student experiences today.
The pipeline gap is the only thing preventing it.

---

## 10. Document Status

This document is the canonical reference for the Physics Teaching Quality Program.

It is derived from:
- The real student session (the Vectors failure)
- `docs/curriculum/blueprints/phys.meas.scalars-vectors.md` (all 899 lines)
- `educational-brain/concepts/physics/phys.meas.scalars-vectors.md` (full entry)
- `docs/curriculum/blueprints/phys.meas.units.md` (all 869 lines)
- `educational-brain/concepts/physics/phys.meas.units.md` (full entry)
- `src/lib/curriculum/blueprintLoader.ts` (all 748 lines, actual injection audit)

All findings are based on reading the actual files, not assumptions.

**Next action:** Phase TQ-1 — Recovery and Escalation Injection.  
**Owner decision required for:** Phases TQ-4 and TQ-5 (route.ts and session lifecycle changes).
