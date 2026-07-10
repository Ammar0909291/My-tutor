# Foundations — Delivery 1 Transcription

This directory transcribes **Delivery 1**, the four universal engines that
every later delivery in this tree cites by name but that were, until now,
never actually written down in Git — they were chat-authored in an earlier
session and existed only as the README's provenance note: "pending
transcription into this tree." Every citation of "Delivery 1", "the D1
grid", "the Recovery Engine", "the voice model", or "Universal Principle
N" anywhere in `educational-brain/` was, until this delivery, a pointer to
content that did not exist anywhere retrievable. This directory is that
content.

## Why this delivery, now

The Architecture Audit (`../validation/07-architecture-audit.md`) and the
Migration Blueprint (`docs/architecture/MIGRATION_BLUEPRINT_V1.md`) both
independently named the same single highest-leverage gap: 13 partially-
retrieved engines across the tree cite Deliveries 1–2 and cannot be fully
retrieved until they exist. Of the two, Delivery 1 is more foundational —
Delivery 2's Teaching Action Library (`../decision-engine/04`'s filters
2–6) depends on concepts that Delivery 1 already assumes are defined
(the Recovery Engine's preemption, the fluency grid, the voice
instruments). Authoring Delivery 1 first is not arbitrary ordering — it
is dependency order.

## What already existed vs. what this delivery adds — the reuse-first check

Before writing anything, this delivery checked whether Delivery 1's scope
was already satisfied elsewhere, per the standing rule (reuse before
create):

- **Canonical Per-Concept Schema** (originally listed as part of
  Delivery 1's scope in `CLAUDE.md`'s provenance note) is **already fully
  delivered** — `../concepts/TEMPLATE.md`, authored under Delivery 5, is
  the canonical per-concept schema in every respect that matters (the
  section list, the authoring contract, the human-tutor bar). Writing a
  second "schema" document here would be exactly the duplication this
  project is instructed to eliminate. **Resolution: Delivery 1's schema
  scope is satisfied by `../concepts/TEMPLATE.md`. Not re-authored here.**
- **Seed concepts** (Equals Sign; Letter-Sound Correspondence &
  Blending) — Letter-Sound Correspondence already has a full concept
  entry (`../concepts/english/eng.phonics.letter-sound-correspondence.md`,
  Delivery 5). Equals Sign does not yet have an entry. This is a
  `../concepts/` expansion task (per-concept authoring), not a universal-
  engine task, and is out of scope for this delivery — recorded as a
  `../concepts/COVERAGE.md` backlog item, not invented here.
- **Recovery Engine, Adaptive Teaching Rules ("the D1 grid"), Voice-First
  Learning Model** — genuinely missing. Extensively cited (see the audit
  map below) but never authored. **These three are this delivery's real
  scope.**
- **Universal Teaching Principles** (23 laws, technically Delivery 2 §10
  per the original provenance note) are added here rather than deferred
  to a later Delivery 2 transcription pass, because 11 of the 23 are
  already cited BY NUMBER throughout the existing tree (`Universal
  Principle 1, 2, 3, 5, 8, 9, 14, 17, 19, 22, 23`) with zero surviving
  citations for the other 12 numbers. Every citable file in the tree
  currently points at content that doesn't exist — this is the largest
  single "dangling reference" problem in the whole Brain, larger than any
  single Delivery 2 engine, so it is resolved now rather than later.

## Audit map — every existing citation this delivery resolves

| Citing file | What it cites | Resolved by |
|---|---|---|
| `../decision-engine/01 §4` | "Recovery Engine (Delivery 1)... interior scripts" | `01-recovery-engine.md` |
| `../decision-engine/05 §5` | "Recovery Engine ran and the learner is still flooded" | `01-recovery-engine.md §6` |
| `../first-lesson/05` | "The Recovery Engine (Delivery 1) holds the general script for every stuck utterance" | `01-recovery-engine.md §3` (base scripts the lesson-one deltas modify) |
| `../student-state/06 §2, §7` | "the Recovery Engine's pacing", "the Recovery Engine's scripts are universal; their SELECTION... is this list" | `01-recovery-engine.md §5` |
| `../concepts/README.md` | "Recovery Engine \| Delivery 1 (pending transcription)" | `01-recovery-engine.md` (table entry updated) |
| `../decision-engine/01 §3` | "the D1 grid; slow-correct HOLDS" | `02-adaptive-teaching-rules.md §1` |
| `../decision-engine/02` | "the D1 grid's dangerous quadrant" (MISCONCEIVING) | `02-adaptive-teaching-rules.md §1` |
| `../decision-engine/02` | "three fluent successes is the trigger (D1 rule)" | `02-adaptive-teaching-rules.md §2` |
| `../validation/07-architecture-audit.md` | `decide()`'s partial, undocumented encoding of this grid | `02-adaptive-teaching-rules.md §5` |
| `../decision-engine/08 §1` | "prosody (confidence, affect — Delivery 1)" | `03-voice-first-learning-model.md §1` |
| `../decision-engine/06 §3` | "Wait time is a turn decision... Delivery 1", "matched energy, Delivery 1" | `03-voice-first-learning-model.md §2, §4` |
| `../decision-engine/02` | "Voice: ... (Delivery 1's instruments)" | `03-voice-first-learning-model.md §1` |
| ~11 files across the tree | "Universal Principle N" (N = 1,2,3,5,8,9,14,17,19,22,23) | `04-universal-teaching-principles.md` |

## Directory contents

```
foundations/
  README.md                          ← this file
  01-recovery-engine.md              ← the general script library + preemption rule + escalation link
  02-adaptive-teaching-rules.md      ← the fluency×correctness grid ("the D1 grid") + advancement rules
  03-voice-first-learning-model.md   ← the voice instruments, wait-time law, register/energy rules
  04-universal-teaching-principles.md ← all 23 principles, cited by number throughout the tree
```

## What this delivery does NOT do

No runtime code. No schema. No curriculum change. This is knowledge
authoring only, per the standing constraint. It also does not re-author
anything `../assessment/`, `../student-state/`, `../decision-engine/`, or
`../first-lesson/` already own — every one of those files is read first,
and this delivery restates nothing they already say; it fills exactly the
gap they leave (the base engine content their citations point at).
