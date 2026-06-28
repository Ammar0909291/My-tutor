# 02 · Educational Knowledge Graph — how knowledge connects

> *Concepts are the vertices. Pedagogy is the edges. Curricula are
> views over the graph, not separate graphs.*

---

## 1. The thing the graph models

There is exactly **one** Knowledge Graph in the Brain. It is the
universal map of what can be learned. It is not the CBSE syllabus, not
the IB syllabus, not a particular textbook's chapter order — those are
*views* (§ 6) over the one graph.

The graph's vertices are **Concepts**: atomic learnable ideas, each
with a unique stable id (`physics.kinematics.projectile_motion`,
`math.algebra.distributive_property`, `hindi.grammar.sandhi.svara`).
The graph's edges are **typed relations** between concepts and between
concepts and assets.

---

## 2. Three candidate designs for the graph topology

### Design A — Strict hierarchical tree (Curriculum → Subject → Chapter → … → Concept)

Each concept has exactly one parent. The hierarchy IS the graph.

- ✅ Trivial to display in a UI; matches how curricula are commonly
  expressed.
- ❌ Concepts genuinely belong in multiple places: "vectors" is in
  Physics (kinematics) AND Math (algebra) AND Computer Graphics. A
  tree forces an arbitrary one-true-parent choice.
- ❌ Cross-subject teaching is impossible to express ("you already
  saw vectors in Math; here they are again in Physics").
- ❌ Curriculum changes (CBSE renames a chapter) cascade into the
  graph itself.

Verdict: rejected. The current codebase actually uses a flatter model
already (a Subject has a `KnowledgeNode[]` with `prerequisites: string[]`),
which is closer to design B; doubling down on a tree would be a
regression.

### Design B — Flat concept list with explicit prerequisite edges only

Concepts are a flat namespace. The only graph edge is `prerequisites`.
Subject/Chapter is a *tag* on the concept, not a structural parent.

- ✅ Concepts are first-class; multi-subject reuse is trivial.
- ✅ Matches the existing `KnowledgeNode { prerequisites: string[] }`
  model.
- ❌ Prerequisite is only one of several relations we need (see § 4);
  forcing every relation through it ("X is a special case of Y") is
  semantic abuse.
- ❌ Curriculum views still need to be expressible somewhere; tags
  alone don't capture ordering.

### Design C — Typed property graph: concepts + multiple edge types + curriculum views as overlay

Concepts are vertices. Several typed edges connect them
(`prerequisite_of`, `is_a`, `part_of`, `analogous_to`,
`commonly_confused_with`). Curricula are **separate views** that
select a subset of concepts and impose an ordering.

- ✅ Captures the *actual* structure of knowledge (mathematics has
  branching dependencies, history has temporal sequence, language
  has analogies, etc.).
- ✅ Concepts are reusable across curricula AND subjects.
- ✅ Curriculum updates touch only the view layer; the graph itself
  is stable.
- ✅ The Decision Pipeline (doc 03) gets richer signals: "next best
  thing to teach" can use `analogous_to` to suggest a transfer
  opportunity, not just `prerequisite_of`.
- ❌ More schema. More care needed at write time. Worth it.

### Choice — Design C

The Educational Brain models knowledge as it actually is, not as a
particular textbook organizes it. The existing 16 `KnowledgeGraph`
files already implicitly contain Design-C-shaped data
(`scienceKnowledgeGraph` is umbrella-shaped: 66 nodes spanning
physics.\*, chemistry.\*, biology.\*) — Phase 1 makes the structure
explicit.

---

## 3. Vertex types

The graph has **three** vertex types, not one. This is a deliberate
departure from the current `KnowledgeNode`-only model.

### 3.1 `Concept` (the core vertex)

The thing a learner can learn. Every concept can be the subject of
explanations, visuals, probes, mastery measurements, evidence updates.

```text
Concept {
  id                    'physics.kinematics.projectile_motion'
  title                 'Projectile motion'
  description           one paragraph
  primaryDomain         'physics'
  alsoIn                ['math.geometry', 'engineering.ballistics']
  difficultyByGrade     { 'k_5': null, '6_8': 'foundational', '9_10': 'developing', '11_12': 'proficient' }
  estimatedMinutesToMastery   range, by grade band
  abstractionLevel      'concrete' | 'symbolic' | 'abstract' | 'meta'
  modality              ['visual', 'numerical', 'symbolic']
  authoritativeFormula  optional LaTeX (when concept is formula-bearing)
  canonicalDefinition   FK → Explanation asset (the asset deemed canonical by curators)
}
```

The `alsoIn` field is the multi-subject reuse field. The
`canonicalDefinition` is a *pointer* to one Explanation asset — not
the only one, but the curators' agreed reference; useful for
validation (other Explanation assets must not contradict it).

### 3.2 `LearningObjective` (curriculum-side vertex)

What a curriculum wants learners to be able to *do*. A learning
objective is not the same as a concept — "understand projectile
motion" (a concept) ≠ "solve word problems involving projectile
motion" (an objective). Objectives map many-to-many to concepts.

```text
LearningObjective {
  id                     'cbse.10.science.physics.7.derive_range'
  curriculumId           FK → Curriculum
  title                  'Derive the range of a projectile algebraically'
  bloomLevel             'remember' | 'understand' | 'apply' | 'analyze' | 'evaluate' | 'create'
  requiredConcepts       [conceptId]   — concepts the objective covers
  optionalConcepts       [conceptId]   — adjacent concepts the objective doesn't strictly require
  examplePrompt          a representative student-facing prompt
}
```

### 3.3 `Misconception` (the equally-first-class wrong belief)

A misconception is a *named wrong belief* a learner can hold about a
concept. Misconceptions are vertices, not properties of concepts,
because the same misconception can apply to multiple concepts (the
"correlation = causation" misconception touches statistics AND
science AND economics).

```text
Misconception {
  id                    'physics.kinematics.heavier_falls_faster'
  title                 'Heavier objects fall faster'
  description           one paragraph stating the wrong belief and the right belief
  affectedConcepts      [conceptId]
  prevalenceByGrade     { '6_8': 'high', '9_10': 'medium', '11_12': 'low' }
  detectableBy          [probeId]    — probes that reliably surface this misconception
  repairableBy          [assetId]    — Explanation assets that have demonstrably repaired it
}
```

Promoting misconceptions to vertices is a meaningful change from the
current rule-based `MisconceptionEngine`. The current engine has 20+
rules; Phase 1's design treats those rules as a *seed* for the
Misconception vertex set. Each rule becomes a vertex with the rule
itself migrating to `Misconception.detectableBy` (the probes that
trigger the rule) and `Misconception.repairableBy` (the assets the
rule recommends).

---

## 4. Edge types

The graph has eight typed edges. Every edge is directional.
`A —edge→ B` is read "A is `edge` of B".

| Edge | Reads | Example | Required? |
|------|-------|---------|-----------|
| `prerequisite_of` | "A is a prerequisite of B" | `algebra.linear_equations —prereq_of→ algebra.quadratic_equations` | optional but ubiquitous |
| `part_of` | "A is part of B" | `solar_system.earth —part_of→ solar_system` | optional |
| `is_a` | "A is a kind of B" | `geometry.square —is_a→ geometry.rectangle` | optional |
| `analogous_to` | "A is analogous to B" | `electricity.voltage —analogous_to→ fluid.pressure` | optional |
| `commonly_confused_with` | "A is commonly confused with B" | `statistics.mean —commonly_confused_with→ statistics.median` | optional |
| `covers` | (objective → concept) "objective O covers concept C" | `cbse.10.sci.7.1 —covers→ physics.optics.reflection` | required for objectives |
| `targets_misconception` | (concept → misconception) "concept C is commonly accompanied by misconception M" | `physics.kinematics.projectile —targets→ heavier_falls_faster` | optional |
| `repaired_by` | (misconception → asset) "misconception M is repaired by asset A" | `heavier_falls_faster —repaired_by→ assetId(Galileo's pendulum exp.)` | optional |

The eight-edge palette is deliberate: enough to express the structure
of a real curriculum, few enough to fit in a single mental model. We
explicitly *did not* include `causes`, `correlates_with`, `enables`,
or other relations — they're either subsumed by `prerequisite_of` /
`analogous_to`, or are too domain-specific for the universal graph.

---

## 5. Graph traversal semantics

The Decision Pipeline runs four standard traversals over this graph.
Each has a name in the codebase, a fixed signature, and a deterministic
implementation.

### 5.1 `prerequisitesOf(conceptId, depth=∞)`

Backward closure on `prerequisite_of`. Returns the topological order
of every concept that must be known before `conceptId` can be learned.
**Used for**: prerequisite recovery, gap detection.

### 5.2 `unlocks(conceptId, depth=1)`

Forward closure on `prerequisite_of`. Returns concepts that become
learnable once `conceptId` is mastered. **Used for**: "what's next?"
recommendations.

### 5.3 `confusionNeighbors(conceptId)`

`commonly_confused_with` edges. Returns concepts the learner might
mix up with `conceptId`. **Used for**: probe generation (build MCQ
distractors from confusion neighbors), targeted differentiation
explanations.

### 5.4 `analogyChain(conceptId, depth=2)`

Walks `analogous_to` outward. Returns analogies the Brain can use to
re-explain the concept ("voltage is like pressure; current is like
flow rate"). **Used for**: the "explain it differently" fallback.

All four are pure functions over an in-memory graph snapshot
(refreshed on every graph write; small enough to fit in memory at the
1M-concept scale — see doc 09).

---

## 6. Curriculum views

A `Curriculum` is a **view**: a named, ordered selection of concepts
+ learning objectives, plus metadata about the curriculum itself.

```text
Curriculum {
  id              'cbse_class_10_science_2025'
  title           'CBSE Class 10 Science (2025 syllabus)'
  authority       'cbse'
  grade           10
  language        'en'        — the curriculum's language of instruction
  effectiveFrom   2025-04-01
  effectiveTo     null         — current
  modules         [Module]     — ordered
}

Module {
  id              'cbse.10.sci.physics.7'
  title           'Light — Reflection and Refraction'
  objectives      [objectiveId] — ordered
  concepts        [conceptId]   — derived from objectives, deduplicated, topologically sorted by prerequisites
  estimatedHours  6
}
```

A new curriculum is a configuration change. Adding ICSE Class 10
Science is creating a new `Curriculum` with overlapping concept
references; no graph mutation. Updating CBSE in 2026 is creating a
new `Curriculum` with `effectiveFrom: 2026-04-01` and the old one
gets `effectiveTo: 2026-03-31` — both stay queryable forever.

This is the resolution to the user-stated graph design:
> Curriculum ↓ Subject ↓ Chapter ↓ Topic ↓ Concept ↓ Learning
> Objective ↓ Prerequisites ↓ Misconceptions ↓ Teaching Assets ↓ …

That hierarchy IS the picture — but only when you read it as
"`Curriculum` is a view that organizes `Subject` groupings of
`Module` groupings of `LearningObjective` instances, each of which
`covers` one or more `Concept` vertices, which have
`prerequisite_of` edges to other Concepts, and `targets_misconception`
edges to Misconceptions, and via the asset model in doc 01 link to
Explanation, Visual, and Probe assets."

The hierarchy is *navigational sugar* over the graph, not the graph's
own shape.

---

## 7. Where the existing 16 KnowledgeGraph files fit

The current `mathKnowledgeGraph.ts`, `physicsKnowledgeGraph.ts`, etc.
each emit a flat `KnowledgeNode[]` with `prerequisites`. In Phase 1's
model:

- Every `KnowledgeNode` becomes a `Concept` vertex.
- The `domain` field maps to `primaryDomain`.
- The `prerequisites` list becomes `prerequisite_of` incoming edges.
- The current Subject grouping becomes a `Curriculum` view named
  `legacy.<subject>.k_12` for backward compatibility — existing routes
  keep working until Phase 2 migrates them.

Migration is **non-destructive**. The existing TS files stay as-is
during Phase 2; the Brain's seed loader reads them and writes them
into the new tables on startup (or, in production, via a one-shot
import). The legacy files can then be retired once the curator UI
can produce equivalent edits.

---

## 8. Validation invariants

The graph itself, not just individual assets, must satisfy invariants
that the Brain checks on every write.

### Invariants every graph commit must preserve

1. **Acyclic `prerequisite_of`**: no cycles. Enforced by a topological
   sort on commit; commit fails on cycle detection.
2. **Reachability**: every concept is reachable from at least one
   "foundation" concept (concepts with `difficultyByGrade.k_5 =
   foundational`). Concepts that aren't reachable suggest a missing
   `prerequisite_of` edge — flag for review.
3. **No orphan misconceptions**: every Misconception has at least one
   `affectedConcepts` entry.
4. **At least one `repairableBy` per Misconception**: a misconception
   the Brain cannot repair is a Brain-level bug, not a content
   omission. The author of the misconception must either name a
   repairing asset or mark it `unrepairableWithoutHuman = true`
   (escalates to a human teacher).
5. **Curriculum coverage**: every `Module.objective` must `covers` at
   least one Concept. Empty modules are forbidden.
6. **Locality of `analogous_to`**: an analogy edge between two
   concepts in different `primaryDomain` is allowed only if both
   concepts share at least one `modality` value. (Prevents the
   "electricity is like love" anti-pattern.)
7. **No duplicate canonical definitions**: at most one Explanation
   asset per concept has `style='canonical_definition'`. Enforced via
   a unique index.

---

## 9. Multilingual graph

Concepts are language-agnostic — `physics.newton.second_law` is the
same vertex whether the learner sees it in English, Hindi, or Sanskrit.
Concept fields that contain language (`title`, `description`) have
companion `title_translations: Record<lang, string>` columns; the
column itself is language-tagged.

LearningObjective is also language-agnostic at the structural level,
with `title_translations` for display. A Hindi-medium CBSE curriculum
references the same `LearningObjective.id` as the English-medium
version; only the displayed translation differs.

Misconception is the trickiest: a misconception may be language-
specific (e.g., a Hindi sandhi rule misconception has no English
equivalent). Solution: `Misconception.scope = 'universal' |
'language_specific'`. Language-specific misconceptions carry an
explicit `language` field; the Decision Pipeline filters by it.

---

## 10. Read patterns the Brain must serve cheaply

The hottest reads, in approximate frequency order:

| Read | Path | Latency budget | Implementation |
|------|------|----------------|----------------|
| "What concept does this chat turn touch?" | Brain Intent Layer → concept lookup | < 5 ms | symbolic + embedding hybrid (see doc 03) |
| "What's the canonical definition asset for concept C in language L grade G?" | `AssetIdentity` covering index | < 2 ms | covering index `(conceptId, family='EXPLANATION', familyKind='definition', language, gradeBand)` |
| "What misconceptions does concept C carry, and are any of them flagged on this learner?" | graph + learner memory | < 5 ms | graph in memory; learner mistake set via redis cache |
| "What's the next-best concept for this learner in this curriculum?" | view + learner memory + mastery | < 20 ms | view = ordered; filter by mastered set; pick first unfilled with all prerequisites mastered |
| "What other assets cover this concept (alternatives)?" | `AssetIdentity` index | < 5 ms | secondary index `(conceptId, family, familyKind, language, gradeBand, qualityScore DESC)` |

Critically, **every hot path is a single indexed read or an in-memory
graph walk**. The graph is small enough (~1 M vertices, ~10 M edges
even at the 5-year scale) to keep entirely in process memory and
serve from a derived adjacency list.

---

## 11. Write patterns

Writes to the graph are RARE compared to reads. They come from:

- Curator UI (humans editing concepts / objectives / misconceptions).
- Knowledge Acquisition Engine (doc 07) — bulk import of a curriculum,
  bulk import of misconceptions from a research paper.
- Evidence Engine — updates to `Concept.estimatedMinutesToMastery` as
  the population accumulates evidence.

All writes go through a single `GraphMutation` API that:

1. Validates the mutation against the invariants in § 8.
2. Computes the diff vs. the previous graph state.
3. Writes the new vertices/edges (append-only at the version level —
   old vertex versions are kept).
4. Refreshes the in-memory adjacency snapshot atomically.
5. Emits a `GraphChanged` event so dependent caches (asset rankings,
   curriculum views) can rebuild.

---

## 12. Anti-patterns explicitly rejected

- ❌ **One subject = one graph**. The current code has 16 graph
  files; Phase 1 unifies them under one logical graph with subject
  *tags*, not 16 disconnected graphs.
- ❌ **Curriculum embedded in the concept**. A concept does not "know"
  it's in CBSE Class 10. The curriculum view does.
- ❌ **Misconceptions as a column on Concept**. A misconception is a
  vertex; treating it as a column kills multi-concept reuse and
  multi-asset-repair tracking.
- ❌ **Implicit prerequisites** (e.g., inferring prereqs from concept
  difficulty). Prereqs are EXPLICIT edges. Inferred prereqs are
  unreliable.
- ❌ **Letting the LLM author graph edges at runtime**. The graph is
  written by humans (or by Knowledge Acquisition Engine outputs that
  passed a human review queue). The Decision Pipeline reads the graph;
  it never writes.
- ❌ **Treating "chapter" as a graph vertex**. A chapter is a
  `Module` in a Curriculum view, not a vertex. (Subtle, important.)

---

## 13. Why this design is right for the next 5 years

It separates three things the current code conflates:

1. **What is true** — the Knowledge Graph. Concept relations,
   misconceptions, validated assets. Owned by curators and the
   Knowledge Acquisition Engine.
2. **What is taught** — Curricula. A particular authority's selection
   and ordering. Owned by curriculum designers.
3. **How it is taught** — Knowledge Assets. The actual explanations,
   visuals, probes. Owned by curators + AI authoring + Evidence.

These three concerns scale on different time horizons (graph: years;
curricula: per-year revisions; assets: continuously). Phase 1's
separation makes that natural. The current code's flat
`KnowledgeNode + Subject` model conflates all three and pays for it
at every change.
