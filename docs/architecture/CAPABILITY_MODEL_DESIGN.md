# Capability Model — Design Document (v0.1, 2026-07-14)

**Status: DESIGN ONLY — no runtime implementation. Approved scope: this document.**

## 1. Problem

Today the system's picture of "what this learner can do" is a scatter of
verdict-shaped fields: `Profile.currentLevel` ('beginner'), mastery percentages
per topic, recovery-signal MistakeRecords, and (since P1) a session failure
counter. All of these answer "how is the learner doing on CONTENT." None of
them answer the question a human tutor actually holds in their head:
**"which operations can this person perform right now?"**

The SI Units failure conversation demonstrated the gap concretely: the tutor
asked a square-root calculation of a learner who could not multiply. No topic
mastery score could have prevented that — the missing fact ("cannot multiply")
is a *capability*, not a topic. `beginner=true` is too coarse: a beginner may
count and compare fluently while being unable to divide; an "intermediate" may
have a dead spot on roots.

## 2. The model

A **capability** is a small, subject-agnostic, testable operation — not a
curriculum concept. The learner's capability state is a map:

```
capabilities: {
  "compare":            { state: "yes",     evidence: 3, lastSeen: "2026-07-14" },
  "count":              { state: "yes",     evidence: 2, lastSeen: "2026-07-14" },
  "multiply":           { state: "no",      evidence: 2, lastSeen: "2026-07-13" },
  "divide":             { state: "unknown" },
  "square":             { state: "no",      evidence: 1, lastSeen: "2026-07-13" },
  "root":               { state: "no",      evidence: 1, lastSeen: "2026-07-13" },
  "identify-direction": { state: "yes",     evidence: 1, lastSeen: "2026-07-12" },
  "estimate":           { state: "yes",     evidence: 1, lastSeen: "2026-07-12" }
},
questionStage: 2,          // highest Question Stage answered reliably (1–7)
stageConfidence: "low"     // low | medium | high — evidence density behind it
```

### 2.1 Capability states

| State     | Meaning                                              | How it is set |
|-----------|------------------------------------------------------|---------------|
| `unknown` | never observed — the default for every capability    | absence       |
| `yes`     | demonstrated ≥1 time, unaided, in this or a recent session | observed success |
| `shaky`   | mixed evidence (success then failure, or aided-only) | conflicting evidence |
| `no`      | attempted and failed, or learner stated inability ("I can't multiply") | observed failure / stated |

`no` is **not permanent**: any later demonstrated success promotes it
(`no → shaky → yes` on repeat). Stated inability ("I can't do maths") writes
`no` immediately — the learner's stated state is ground truth (foundations/04
P20) — but is the *cheapest* state to overturn, since self-report
under-estimates (placement/02).

### 2.2 The starter capability vocabulary

Deliberately tiny — a capability earns its place only if a teaching decision
branches on it. Initial set (~14):

- **Numeric:** `count`, `compare`, `estimate`, `add-subtract`, `multiply`,
  `divide`, `fractions`, `square`, `root`, `read-notation` (can parse "v = d/t"
  as symbols at all)
- **Spatial/observational:** `identify-direction`, `read-simple-graph`
- **Verbal:** `restate-in-own-words`, `follow-two-step-instruction`

The vocabulary is a versioned constant in code (like the Question Stages), not
per-subject data — capabilities are what make the model transferable ACROSS
subjects: `multiply: no` learned in physics protects the learner in chemistry.

### 2.3 Question Stage as a first-class field

Phase A made the Question Stage ladder (1 Observation → 7 Transfer) the
universal questioning law. The capability model persists **the highest stage
the learner reliably answers** plus a confidence level. This replaces the
implicit "beginner" question ceiling with a measured one, and gives the
prompt one number instead of a paragraph of hedges.

## 3. Storage — no new tables

The whole model is one JSON object. Two-tier storage, both existing:

1. **Session tier (source of truth during a session):**
   `LearnSession.contextSnapshot.capabilities` — read at turn start alongside
   `sessionFailureCount` (P1's exact pattern), folded into the existing
   Library snapshot persist. Zero migration.
2. **Cross-session tier:** on session close (or lazily on next session open,
   the same inheritance pattern placement verification uses for its
   cross-session lookup), the map is copied forward from the learner's most
   recent session in the same subject. Numeric capabilities (`multiply`,
   `root`, …) are subject-independent and may be inherited from ANY subject's
   most recent session; a later iteration can move them to
   `Profile`-adjacent storage, but v1 needs no schema change.

Size bound: ~14 capabilities × ~60 bytes ≈ under 1 KB. Capped: unknown
capabilities are simply absent from the map.

## 4. Evidence rules (who writes, and when)

Single-writer per signal, mirroring the evidence architecture (validation/08):

| Event | Capability effect |
|---|---|
| SIGNAL `correctness=true` on a turn whose question exercised capability X | `X → yes` (or `shaky → yes`) |
| SIGNAL `correctness=false`, `confidence=high` on such a turn | `X → no` (misconception-shaped) |
| Recovery utterance naming an operation ("I can't do maths", "how would I square that?") | targeted capability → `no` (stated) |
| Learner performs the operation inside free text (e.g. writes "so 3×4=12") | `X → yes` — LLM self-report via the existing `<!--SIGNAL-->` tag, extended with an optional `capability="multiply:yes"` attribute (same fabrication-forbidden rule) |
| 30+ days without observation | `yes → shaky` (decay — never straight to `no`) |

The `<!--SIGNAL-->` extension is the only new moving part, and it reuses the
Blueprint Phase 3 mechanism that already ships correctness/confidence/
confusion — one more attribute on an existing tag, parsed by the existing
parser, persisted by the existing snapshot fold.

## 5. Consumption — replacing beginner heuristics one reader at a time

Each current beginner heuristic has a direct capability-model successor:

| Today (Phase A/B) | Capability-model replacement |
|---|---|
| `contentRegister === 'beginner'` tunes the base prompt | `questionStage` + the capability map rendered as ONE compact line: `STUDENT CAPABILITIES: can compare, count, estimate; canNOT multiply, square, root; question stage 2 (low confidence)` |
| `computeFoundationConfidence()` score (Phase B) | foundation bias = any `no` capability that the current concept's teaching requires |
| Assessment gate on `currentLevel/failureCount` | gate = `questionStage < 4` |
| Hint policy "if they cannot do the calculation, teach" | deterministic: hint generator checks required capabilities before hinting toward any step |
| First-lesson guard's blanket assumptions | first-lesson stays; capability map takes over from lesson 2 |

Note the interference property: the capability line REPLACES several
paragraphs of conditional prose across multiple blocks with one factual
sentence. The model does not need to be told how to behave toward someone
who cannot multiply — it needs to be told, truthfully, that they cannot.

## 6. Relationship to existing architecture

- **Student State Model (educational-brain/student-state/02):** the 8-rung
  knowledge ladder is per-CONCEPT; capabilities are per-OPERATION. The
  capability map is the runtime's first concrete step toward student-state/05's
  behaviour profile ("affinities as statistics, never identities") — states are
  evidence-backed and dated, never verdicts, per the seven design laws.
- **ADR 10 (Student Memory):** capabilities live in Store 1 (Session) with
  inheritance into Store 2 (Student) — consistent with the six-store ownership
  map; no new store.
- **Placement Engine (placement/02):** stated inability is trusted but
  cheaply overturned — matching the self-report trust model exactly.
- **P1–P5:** `sessionFailureCount` remains the affect/pacing counter;
  capabilities are the WHAT-can-they-do counter. They do not merge: one is
  emotional budget, the other is a skills ledger.

## 7. Migration path

1. **M0 (now):** this document.
2. **M1:** add `capability` attribute to the SIGNAL tag + snapshot
   read/write of the map. No consumer yet (write-only, observe data quality).
3. **M2:** render the one-line STUDENT CAPABILITIES sentence into the base
   prompt; retire the beginner tuning sentence for learners who have a map.
4. **M3:** switch the Phase B foundation bias and the assessment gate to
   capability/stage reads; retire `computeFoundationConfidence()`'s
   profile-level term (keep the failure-count terms as fallback for
   map-less learners).
5. **M4 (evaluation gate):** only proceed past M3 if capability states
   demonstrably change decisions (measurable via the existing
   TeachingStrategyEvent + evidence-event join, loop L5).

## 8. Risks

- **Capability attribution is fuzzy** — which capability did a question
  exercise? Mitigated by letting the LLM self-report via SIGNAL (it knows what
  it asked) under the existing fabrication-forbidden rule, and by treating
  single-evidence states as `low` confidence.
- **Stale `no` insults a learner who improved elsewhere** — mitigated by the
  cheap-overturn rule and 30-day decay to `shaky`, and by the standing law
  that the map NEVER surfaces to the learner as a verdict
  (student-state design law: descriptions-never-verdicts, never-leaks).
- **Vocabulary creep** — mitigated by the admission rule: a capability enters
  the vocabulary only with a named teaching decision that branches on it.
