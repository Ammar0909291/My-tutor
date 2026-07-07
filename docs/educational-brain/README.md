# Educational Brain — Phase 1 Architecture

**Status:** Phase 1 design only. No production code until approval.
**Scope:** Specification of the Brain itself — what it is, how it stores
knowledge, how it decides, how it learns. Not a feature list. Not a
sprint plan.

> *"Every AI call must permanently reduce future AI dependency."*
> — Educational Brain Constitution (assumed, not restated here)

---

## What the Brain is, in one paragraph

The Educational Brain is the **stateful, evidence-driven core** that
chooses, for every learner moment, the smallest correct teaching action:
what to say, what to show, what to ask, and what to remember. It is
**not** a chat wrapper around an LLM. It is a graph of validated
knowledge, a memory of every learner's progress, and a decision engine
that composes them deterministically — calling an LLM only when no
existing asset and no rule can answer better. Every LLM call produces
an artifact that, after validation, removes the need to ever make that
call again.

The Brain has four enduring properties:

1. **It owns its knowledge.** Knowledge Assets — explanations, scenes,
   questions, misconceptions — are first-class persistent objects with
   provenance, versions, and quality scores. They are not regenerated
   per request; they are retrieved, ranked, and (rarely) authored.
2. **It learns from every learner.** Every interaction emits Evidence.
   Evidence updates asset rankings, misconception confidence, and the
   Brain's own decision policies.
3. **It degrades gracefully.** Every layer has a deterministic
   fallback. AI failure never causes a broken lesson. Asset retrieval
   failure falls back to generation; generation failure falls back to a
   simpler asset; the simplest asset is hand-curated.
4. **It is portable.** The Brain's knowledge and decision rules are
   exportable as data (graph + rule files), so a future on-device or
   non-AI deployment is a matter of shipping the snapshot, not
   rebuilding the system.

---

## Why now — what the current codebase already gives us

The audit (see commit `7a0017c`'s working session) found that this
codebase is *unusually well-equipped* for a Brain rewrite:

- **16 knowledge graphs** spanning ~614 `KnowledgeNode`s already exist
  (Math 54, Science 66, English 38, Hindi 61, etc.).
- **A deterministic visual pipeline** (`VisualSpec`), **a deterministic
  3D pipeline** (`SceneSpec`), **a parametric scene router** (9 textbook
  scene types with formula-correct geometry), and **a 3D dynamic
  engine** (Three.js / recharts fallback) all exist and are independent
  modules.
- **A teaching strategy engine** synthesizes 5 signals into 7 strategy
  types deterministically (no LLM).
- **A misconception engine** matches mistakes to a 20+ rule taxonomy
  deterministically.
- **Evidence, Mistake, Checkpoint, Practice, Mastery, Retention,
  ReviewSchedule** tables already exist in Prisma.

What's missing is **the spine** that connects them: a unified decision
layer that turns the present 1,400-line inline chat-route orchestration
into a composable, observable, testable pipeline; an evidence engine
that actually uses the EvidenceRecord weights to rank assets; and a
knowledge-asset model that lets an explanation, a scene, or a question
be retrieved instead of regenerated.

Phase 1 designs that spine.

---

## Reading order

Read top-to-bottom for the full architecture. Each document is
self-contained; cross-references are explicit.

1. **[01-knowledge-assets.md](01-knowledge-assets.md)** — the atomic unit
2. **[02-knowledge-graph.md](02-knowledge-graph.md)** — how units connect
3. **[03-decision-pipeline.md](03-decision-pipeline.md)** — how the Brain
   decides what to do next
4. **[04-evidence-engine.md](04-evidence-engine.md)** — how the Brain
   learns from every interaction
5. **[05-memory-system.md](05-memory-system.md)** — what is remembered,
   where, and why
6. **[06-ai-integration.md](06-ai-integration.md)** — where AI belongs;
   where it does not
7. **[07-knowledge-acquisition.md](07-knowledge-acquisition.md)** — how
   external knowledge becomes a Knowledge Asset
8. **[08-visualization-strategy.md](08-visualization-strategy.md)** —
   how a Knowledge Asset becomes a scene / animation / experiment
9. **[09-scaling.md](09-scaling.md)** — 100 M students, millions of
   assets, hundreds of languages
10. **[10-database-strategy.md](10-database-strategy.md)** — concrete
    schema sketch
11. **[11-risks-and-roadmap.md](11-risks-and-roadmap.md)** — what could
    go wrong + recommended Phase 2

---

## First principles (used to evaluate every design decision below)

These are the lenses each document uses when choosing between three
candidate designs.

### P1. Determinism first, AI as last resort

Every layer must produce a defensible answer with no LLM call. The LLM
is a **synthesis tool**, used to author a new asset when no existing
asset fits, never as a runtime decision-maker for behavior that could
be deterministic. A rule that fires correctly 90% of the time is more
valuable than an LLM that fires correctly 95% of the time, because the
rule is auditable, deterministic, free, and explainable.

### P2. Assets, not generations

If we can generate it once and reuse it forever, we must. If we
re-generate it per request, we have failed both economically and
educationally — an explanation that varies subtly each time cannot be
ranked, improved, or proven correct. The Knowledge Asset is the atomic
unit; generation is a path that *creates* assets, not a path that
*replaces* them.

### P3. Evidence over opinion

The Brain holds no architectural opinion that cannot be defeated by
data. Every ranking, every default, every prompt-selection heuristic
has an evidence signal attached to it and a feedback loop that updates
it. An asset that demonstrably teaches worse than its alternative is
deprecated, not defended.

### P4. Composable, not monolithic

The chat route's 1,400-line inline composition is a bug, not a feature.
Phase 1's decision pipeline is a chain of small, pure-when-possible
stages with typed inputs and outputs, each observable in isolation,
each testable without a live LLM, each replaceable. A new visual
engine is a new stage, not a new branch in a switch.

### P5. Bounded blast radius

Any stage failure must degrade the response, never break it. A stage
that throws must be functionally indistinguishable from a stage that
returns null. The Brain ships a lesson, not an error.

### P6. Honest about what is unknown

Every quality metric (mastery, confidence, retention) carries an
uncertainty band, not just a point estimate. A learner who has
attempted a topic once is not "70 % mastered" — they are "estimated
70 % with high uncertainty." Decision policies use the uncertainty,
not just the point.

### P7. Multi-lingual at the schema level, not via translation calls

Every asset that contains language carries explicit `(content, lang)`
pairs from day one, not a default English version plus on-the-fly
translation. A Hindi explanation is a different *asset*, with its own
evidence and ranking, not a translation of the English asset.

### P8. Curriculum-agnostic core, curriculum-aware edges

The Brain's core (assets, graph, decisions, evidence) knows nothing
about CBSE, ICSE, IB, A-Levels, or any other syllabus. Curricula are
**views** over the graph — selections, orderings, and groupings — not
hard-coded into the asset model. A new curriculum is a configuration,
not a code change.

### P9. Every AI call leaves a trace that reduces the next call

When the Brain calls an LLM to author an explanation, the validated
result becomes a permanent Knowledge Asset. When the Brain calls an
LLM to extract parameters for a parametric scene, the parameter set is
cached against the concept text. When the LLM is asked to classify an
intent, the classification + the verbatim phrasing become a deterministic
rule the next time that phrasing arrives. **The Brain shrinks the
LLM's role with every call.**

### P10. The Brain is testable end-to-end without a live LLM

Every stage must be runnable in a unit test with a recorded LLM
transcript. CI must verify the Brain's behavior on a frozen set of
real-learner-shaped fixtures. A regression is a fixture that flips
verdict; CI rejects it before merge.

---

## What Phase 1 is NOT

- Not a rewrite of the chat route — Phase 1 produces the specification
  that Phase 2 implements against.
- Not a database migration — Phase 1 sketches the schema; Phase 2
  migrates.
- Not a feature freeze on shipping work — existing engines keep
  shipping under the existing flags.
- Not an AI roadmap — the Brain's AI choices are output-driven, not
  vendor-driven. Groq vs. Anthropic vs. local is a Phase 2 / 3
  decision, gated on Evidence Engine data.

---

## How to use this document set

If you are reviewing for **soundness**, read 01 → 02 → 03 → 04 in order:
the asset/graph/decision/evidence chain is the entire architecture; the
rest is implication.

If you are reviewing for **risk**, read 11 first.

If you are reviewing for **engineering plan**, read 10 + 11.

If you are reviewing for **AI strategy**, read 06.

If you are reviewing for **content strategy**, read 07 + 08.
