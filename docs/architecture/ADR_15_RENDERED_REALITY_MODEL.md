# ADR 15 · Rendered Reality Model (RRM)

**Status:** Proposed (architecture only — no implementation)
**Date:** 2026-07-30
**Depends on:** ADR 12 (visual pipeline), ADR 10 (contextSnapshot persistence)
**Supersedes:** nothing — first ADR on visual-state feedback

---

## 1. Purpose

The LLM teaches about visual content it cannot perceive. Five mechanisms produce this gap:
tag stripping destroys visual provenance from stored messages; four competing post-LLM
pipelines resolve invisibly to the LLM; `alreadyShown` is a phase-counter heuristic, not
rendered history; `contextSnapshot` persists zero visual state; and the learner's visual
observation has no comparison target.

**Consequence:** the LLM confabulates about what EXISTS on the learner's screen — a
perception-chain failure orthogonal to the evidence-chain failures addressed by Signal
Verification (commit 8c63076).

**Failure classes eliminated:**
- Tutor describes objects not on screen
- Tutor ignores learner's accurate visual description
- Observation questions about nonexistent objects
- Recovery loops triggered by the tutor's own visual confabulation
- Progression stalls from confabulation-induced confusion cascades

The RRM is the component that closes the perception loop.

---

## 2. Responsibilities

**RRM owns:**
- The ground truth of what visual artifact is currently rendered on the learner's screen
- A semantic description of that artifact sufficient for the LLM to reference specific elements
- The temporal record of which visuals were rendered on which turns within a session
- The comparison target against which learner visual observations can be validated

**RRM does NOT own:**
- Visual selection or generation (owned by the visual pipeline, ADR 12)
- Visual asset caching or lifecycle (owned by the Visual Asset Model, ADR 12)
- Teaching decisions about when to show visuals (owned by the Decision Engine, ADR 08)
- The visual component library or renderer (owned by the client UI)
- Correctness assessment of learner answers (owned by Signal Verification)

---

## 3. Ownership

| Role | Subsystem |
|------|-----------|
| **Sole writer** | Conversation Runtime — the same code path that resolves which visual pipeline won |
| **Authoritative reader** | Conversation Runtime — injects RRM into the system prompt each turn |
| **Secondary readers** | Decision Engine (informs visual-repeat avoidance), Visual Intelligence block (replaces the `alreadyShown` heuristic) |
| **Never writes** | The LLM, the client UI, the Educational Brain |

Single-writer invariant: only the server's post-visual-resolution code path may create or
update RRM entries. The LLM's `VISUAL:` tag emission is an input to the visual pipeline,
not a write to the RRM.

---

## 4. Lifecycle

**Creation:** An RRM entry is created when a visual pipeline resolves a non-null visual for
a turn. If no visual is rendered on a turn, no entry is created and the existing RRM state
is carried forward unchanged.

**Update:** Each new visual rendering creates a new entry. The RRM accumulates entries within
a session — it is an append-only log, not a single-slot register. The "current" visual is the
most recent entry.

**Persistence:** RRM state persists in the same storage mechanism as `contextSnapshot` — it
survives across turns within a session. It is loaded at the start of each turn and injected
into the system prompt.

**Expiration:** RRM entries expire at session boundary (the 30-minute inactivity gap defined
by the Session Lifecycle state machine, `decision-engine/07 §8`). A new session starts with
an empty RRM. Within a session, entries do not expire — the LLM should know the full visual
history of the current session.

**Recovery:** If RRM state is missing or corrupted, the system degrades gracefully to
current behavior (no visual awareness). This is the zero-regression guarantee: the RRM is
additive information. Its absence produces today's behavior, not a crash.

---

## 5. Data Model

Conceptual fields per RRM entry (not an implementation schema):

| Field | Meaning |
|-------|---------|
| **visual identity** | Which visual was rendered (the resolved type after pipeline arbitration) |
| **visual semantics** | What the visual depicts — a natural-language description sufficient for the LLM to reference specific elements (e.g., "a force diagram showing a 5 kg block on a flat surface with a rightward 10 N applied force arrow and a leftward friction arrow") |
| **source pipeline** | Which of the competing pipelines produced this visual (responseVisual / detectedVisualSpec / detectedSceneSpec / dynamicVisualizationCode) |
| **matched concept** | The concept ID the visual was matched to |
| **turn position** | Which turn in the session this visual was rendered on |

The semantic description is the architecturally critical field. Without it, the LLM knows
a visual EXISTS but not what it SHOWS — reducing confabulation about existence while leaving
confabulation about content.

**Semantic description sources (ranked by fidelity):**
1. Hand-authored metadata per visual type in the visual registry (highest fidelity, lowest coverage)
2. Structured spec fields from VisualSpec/SceneSpec (medium fidelity — available for data-driven visuals)
3. The LLM's own narration text captured before tag stripping (available for all visuals, but self-referential)

The RRM does not mandate a single source. It mandates that a semantic description EXISTS for
every entry, however sourced.

---

## 6. Interfaces

**Educational Brain:** No direct interface. The Brain owns teaching knowledge (what to teach,
how to teach). The RRM owns rendered state (what the learner sees). The Brain may inform the
semantic description of concept-keyed visuals through authored visual metadata in concept
entries, but this is an input to the visual registry, not a direct RRM interaction.

**Decision Engine:** Reads RRM to answer "has the learner already seen a visual for this
concept this session?" — replacing the `alreadyShown` heuristic with ground truth. The
Decision Engine's teaching-state transitions do not change; only the visual-repeat signal
becomes accurate.

**Conversation Runtime:** The sole writer and primary reader. Writes entries after visual
pipeline resolution. Reads the full RRM log at the start of each turn and injects a
`RENDERED REALITY` system-prompt block containing: the current visual (if any), its semantic
description, and a compact history of prior visuals this session. This block replaces the
`alreadyShown` boolean in `buildVisualIntelligenceBlock`.

**Visual Pipeline:** The visual pipeline's output is the RRM's input. The pipeline does not
read from the RRM (avoiding circular dependency). The RRM observes the pipeline's resolution
— it is downstream, not upstream.

**UI:** In the minimal architecture, the UI is not involved — the RRM is server-authoritative,
written at visual-resolution time, not at render time. A future enhancement could add
client-to-server render confirmation (closing the gap between "server selected visual X" and
"client successfully rendered visual X"), but this is not required for architectural
correctness — the server's selection is the best available ground truth without a client
feedback channel.

**Persistence:** RRM entries are stored alongside `contextSnapshot`. They are read at turn
start and written at turn end, in the same persistence transaction as the snapshot delta.

---

## 7. Invariants

**INV-1 — Perception before reference:** The LLM must not reference visual content unless a
corresponding RRM entry exists in its context. The system prompt must make this explicit: "You
may only describe or reference visuals listed in the RENDERED REALITY block."

**INV-2 — Server authority:** The RRM is written by the server's visual-resolution code, never
by the LLM. The LLM's `VISUAL:` tag is an input to the pipeline, not a write to the RRM.

**INV-3 — Semantic sufficiency:** Every RRM entry must carry a semantic description detailed
enough for the LLM to reference specific visual elements without guessing. An entry with only
a type identifier (e.g., "force_diagram") and no semantic description is architecturally
incomplete.

**INV-4 — Session scope:** RRM state is scoped to a session. Cross-session visual continuity
is not an RRM responsibility — it belongs to the Visual Asset Model (ADR 12).

**INV-5 — Additive only:** The RRM adds information to the LLM's context. Its absence or
failure must produce today's behavior (no visual awareness), never a degraded or broken state.

---

## 8. Failure Handling

Four beliefs can disagree:

| Disagreement | Detection | Resolution |
|-------------|-----------|------------|
| **RRM says visual X; LLM references visual Y** | INV-1 violation — the LLM ignored the RENDERED REALITY block | Detectable post-hoc by checking LLM output against RRM. Future: a visual-parity observer (analogous to the existing Turn Parity Observer) could flag this. No runtime correction — the RRM is in the prompt; the LLM's compliance is a prompt-following problem, not an architecture problem. |
| **RRM says visual X; learner describes visual Z** | The learner's description contradicts the RRM | The RRM provides the comparison target the system currently lacks. The LLM can now say "I showed you X, but you're describing Z — let me check" instead of confabulating agreement. Resolution: trust the learner's observation over the RRM for *interactive* visuals (slider positions, manipulations); trust the RRM over the learner for *static* visuals (the visual type itself cannot change client-side). |
| **RRM says visual X; client rendered nothing** | Client-side failure (JS error, load failure) | Undetectable without client feedback. The RRM will incorrectly claim a visual is on screen. Mitigation: the RRM's semantic description still gives the LLM something accurate to reference — the visual was *intended* and *selected*; only the rendering failed. A future client-confirmation channel would close this gap. |
| **No RRM entry; LLM references a visual anyway** | INV-1 violation | Same as row 1. The RENDERED REALITY block explicitly states "no visual is currently displayed" when the RRM is empty. |

---

## 9. Migration Strategy

**Phase 0 — Zero behavioral change.** Begin writing RRM entries to `contextSnapshot` after
visual pipeline resolution. Do not inject them into the system prompt. This is a persistence-
only change — the LLM sees nothing new, behavior is identical, but the data accumulates and
can be audited.

**Phase 1 — Typed RRM.** Inject a `RENDERED REALITY` block into the system prompt containing
the visual type and matched concept from the most recent RRM entry. Replace the `alreadyShown`
heuristic with a ground-truth check against the RRM log. This eliminates confabulation about
visual *existence* with minimal context budget cost.

**Phase 2 — Semantic RRM.** Add semantic descriptions to RRM entries. For VisualSpec and
SceneSpec visuals, derive descriptions from the structured spec fields. For `responseVisual`
(legacy VisualType), use hand-authored metadata from the visual registry. This eliminates
confabulation about visual *content*.

**Phase 3 — Learner observation cross-check.** When the learner's message references visual
content, compare it against the current RRM entry's semantic description. Flag contradictions
for the LLM (analogous to Signal Verification's CONTRADICTED status). This closes the
perception loop fully.

Each phase is independently deployable. Each phase's absence produces the prior phase's
behavior, not a regression.

---

## 10. Risks & Trade-offs

| Risk | Severity | Mitigation |
|------|----------|------------|
| **Context budget** — RRM entries consume system-prompt tokens | Medium | Cap the injected history (e.g., last 3 visuals). The current visual's semantic description is the critical entry; older entries can be summarized. |
| **Semantic description quality** — poor descriptions produce new confabulation | Medium | INV-3 requires semantic sufficiency. Phase 2 starts with structured-spec-derived descriptions (deterministic, verifiable) before attempting LLM-generated descriptions. |
| **Client rendering divergence** — server says rendered, client didn't | Low | Accepted as a known gap in Phase 1-2. Phase 3's learner-observation cross-check partially detects it. Full closure requires a client-confirmation channel (future). |
| **Four-pipeline complexity** — RRM must observe all four visual pipelines | Low | The "never two visuals" guard already reduces the resolution to a single winner. RRM observes downstream of that guard, not upstream. |
| **INV-1 compliance** — LLM may ignore the RENDERED REALITY block | Medium | Same class of risk as any system-prompt instruction. Mitigated by explicit, short, unambiguous prompt language. Measurable via a visual-parity observer in Phase 3. |

---

## 11. Architecture Diagram

```
                         ┌─────────────────────────┐
                         │    RENDERED REALITY      │
                         │        MODEL             │
                         │                          │
                         │  Entry log (per session): │
                         │  ┌─────────────────────┐ │
                         │  │ visual identity      │ │
                         │  │ visual semantics     │ │
                         │  │ source pipeline      │ │
                         │  │ matched concept      │ │
                         │  │ turn position        │ │
                         │  └─────────────────────┘ │
                         └────┬──────────┬──────────┘
                 writes ──────┘          └────── reads
                    │                           │
     ┌──────────────▼────────────┐    ┌────────▼──────────────┐
     │   CONVERSATION RUNTIME    │    │  SYSTEM PROMPT        │
     │                           │    │  INJECTION            │
     │  Visual Pipeline resolves │    │                       │
     │  → one visual wins        │    │  RENDERED REALITY:    │
     │  → RRM entry created      │    │  "force_diagram on    │
     │                           │    │   turn 4, showing..." │
     │  Persistence writes RRM   │    │                       │
     │  alongside contextSnapshot│    │  VISUAL INTELLIGENCE: │
     │                           │    │  (existing block,     │
     └──────────┬────────────────┘    │   alreadyShown now    │
                │                     │   reads RRM)          │
                │                     └────────┬──────────────┘
                │                              │
    ┌───────────▼──────┐              ┌────────▼────────┐
    │   PERSISTENCE    │              │      LLM        │
    │                  │              │                  │
    │  contextSnapshot │              │  Knows what is   │
    │  + RRM entries   │              │  on screen.      │
    │  (same txn)      │              │  Can reference    │
    │                  │              │  specific visual  │
    └──────────────────┘              │  elements.       │
                                      │  Cannot invent   │
                                      │  absent visuals. │
                                      └────────┬────────┘
                                               │
                                      ┌────────▼────────┐
                                      │   LEARNER       │
                                      │                 │
                                      │  Sees the SAME  │
                                      │  visual the LLM │
                                      │  is describing.  │
                                      └─────────────────┘
```

**The closed loop:** Visual Pipeline → RRM (write) → Persistence → System Prompt (read) →
LLM (perceives rendered reality) → Response (references actual visual) → Learner (sees
matching description). The open loop that existed before — Visual Pipeline → Client (render)
→ ✗ no feedback → LLM (confabulates) — is closed.

---

## Relationship to Previous ADRs

- **ADR 12 (Visualization & Simulation):** ADR 12 owns visual selection, generation, caching,
  and the Visual Asset Model. RRM owns the cross-turn feedback loop that ADR 12 does not
  address. The two are complementary: ADR 12 decides WHAT visual to show; RRM ensures the
  LLM KNOWS what was shown.
- **ADR 10 (Student Memory):** RRM persists in contextSnapshot, which ADR 10 formally owns.
  RRM entries are a new field in the session memory store, following ADR 10's single-writer
  invariant (Conversation Runtime is the sole writer).
- **ADR 08 (Teaching Action Intelligence):** The Decision Engine reads RRM for visual-repeat
  avoidance, replacing the `alreadyShown` heuristic. No changes to the Decision Engine's
  teaching-state machine.
- **ADR 09 (Dynamic Lesson Composition):** Lesson stage continuity (ADR 09's
  `lessonStageProgress`) and visual state continuity (RRM) are independent persistence
  concerns in the same snapshot. No interaction.
