# Educational Brain — Knowledge Base

This directory is the **permanent, authored educational knowledge** of My Tutor —
the moat. It contains teaching science, not software: the knowledge that makes
the tutor teach like the world's greatest human teacher, authored once and
reused forever.

## Charter

**The Educational Brain is the moat. AI is not the moat.**

The long-term objective is to reduce AI reasoning over time: every time
educational knowledge is discovered that can be authored once and reused
forever, it is written here. Eventually the AI should mostly *retrieve*
educational knowledge instead of *inventing* it, turn by turn, at inference
time. Invented pedagogy is inconsistent, unauditable, and lost after every
conversation; authored pedagogy compounds.

The quality bar for everything in this tree:

> If the weakest student in the world can master a concept using this
> knowledge, then almost every other student can too.

## What lives here vs. elsewhere

| Location | Contents | Nature |
|---|---|---|
| `educational-brain/` (this tree) | Teaching science: assessment design, misconception science, explanation libraries, teaching actions, memory/curiosity/transfer engines | **Knowledge** (subject-independent, implementation-independent, permanent) |
| `docs/educational-brain/` | ch01–ch11 implementation blueprints (knowledge assets, decision pipeline, evidence engine, scaling) | **Implementation design** for the runtime Brain |
| `docs/architecture/` | The Educational Brain Bible + ADRs 02–14 | **Engine architecture** (frozen v1.0) |
| `docs/{subject}/kg/` | Canonical Knowledge Graphs | **Curriculum** (owned by the Curriculum Production Pipeline — never edited here) |

Nothing in this tree modifies, or is modified by, runtime code, schemas,
curriculum, or the architecture documents. It is the content the runtime Brain
will eventually retrieve from.

## Provenance and delivery history

- **Delivery 1** (chat-authored, pending transcription into this tree):
  Recovery Engine, Adaptive Teaching Rules, Voice-First Learning Model,
  Canonical Per-Concept Schema, seed concepts (Equals Sign; Letter-Sound
  Correspondence & Blending).
- **Delivery 2** (chat-authored, pending transcription): Mental Model Library,
  Discovery Framework, Curiosity Engine, Misconception Evolution, Cognitive
  Load Engine, Teaching Action Library, Transfer Library, Memory Engine,
  Motivation Engine, Universal Teaching Principles (23 laws).
- **Delivery 3** (this tree's first in-repo content): the **Assessment Design
  Library** — `assessment/`.

Documents in this tree cite Delivery 1/2 knowledge by name (e.g. "the Recovery
Engine", "the latency × correctness grid", "Universal Principle 17") and
restate whatever they depend on, so every file remains self-contained and
permanent even before those deliveries are transcribed.

## Directory map

Authored now:

```
educational-brain/
  README.md                 ← this file
  assessment/               ← Assessment Design Library (Delivery 3)
```

Planned libraries (authored in future deliveries; listed here as the intended
organization — directories are created when their content is authored, never
as empty placeholders):

```
  foundations/        ← Delivery 1 transcription: recovery, adaptive rules, voice model, concept schema
  mental-models/      ← model stages, versioning, replacement rules (Delivery 2 §1)
  discovery/          ← the 6-step Discovery Framework + worked designs (Delivery 2 §2)
  curiosity/          ← triggers, chains, by-age/subject/personality (Delivery 2 §3)
  misconceptions/     ← birth taxonomy, evolution, 7-step repair + per-concept libraries (Delivery 2 §4)
  cognitive-load/     ← intrinsic/extraneous/germane, chunking, density rules (Delivery 2 §5)
  teaching-actions/   ← the 27-action dispatch library (Delivery 2 §6)
  transfer/           ← the transfer ladder + six rules (Delivery 2 §7)
  memory/             ← spacing, retrieval, interleaving, review-by-type (Delivery 2 §8)
  motivation/         ← the 12 learner personas (Delivery 2 §9)
  principles/         ← the Universal Teaching Principles (Delivery 2 §10)
  explanations/       ← per-concept explanation libraries (Delivery 1 schema §3)
  visual-teaching/    ← visual/diagram/animation design knowledge
  voice/              ← voice-first tutoring knowledge beyond the D1 model
  prerequisites/      ← prerequisite-diagnosis protocols per subject
  rubrics/            ← cross-cutting rubrics (assessment/10-rubrics.md seeds this)
```

## Authoring rules for this tree

1. **Permanence over brevity.** Every document should be worth reading in ten
   years. No summaries-of-summaries, no placeholders, no TODOs.
2. **Why, not just what.** A principle whose *why* is lost gets discarded by
   the next generation of designers. Every rule carries its mechanism.
3. **Observable criteria only.** "The learner understands deeply" is not
   knowledge; "the learner explains the mechanism and survives a delayed,
   disguised re-probe" is.
4. **Self-contained files.** Cross-reference freely, but restate what a file
   depends on. A file that cannot stand alone is not permanent.
5. **Subject-independent first.** Prefer knowledge that applies to thousands
   of concepts. Per-concept entries follow the Canonical Per-Concept Schema
   (Delivery 1) and live in per-concept libraries.
6. **No implementation.** No code, no schemas, no API designs — those belong
   to `docs/educational-brain/` and `docs/architecture/`. This tree tells the
   runtime *what a great teacher knows*; how the runtime stores and serves it
   is someone else's document.
