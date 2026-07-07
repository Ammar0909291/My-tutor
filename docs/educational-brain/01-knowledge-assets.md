# 01 · Knowledge Assets — the atomic unit of the Brain

> *The Brain is a graph of validated assets, not a stream of generated
> answers. If an asset can be reused for the next million learners, it
> must be — once, well, and forever.*

---

## 1. What is a Knowledge Asset?

A **Knowledge Asset** is a persisted, versioned, addressable unit of
educational content with explicit provenance and evidence. It is the
*only* unit the Decision Pipeline (doc 03) ever returns to a learner;
generation paths exist solely to *create* assets, never to *replace*
them.

A Knowledge Asset answers exactly one question at one of three layers:

- **WHAT** — what is this concept? (an explanation, a definition, a
  worked example)
- **SHOW** — what does it look like? (a scene, an animation, a graph,
  a diagram)
- **CHECK** — has the learner got it? (a question, a misconception
  probe, a checkpoint)

Anything that does not answer one of those three questions is not an
asset.

---

## 2. Three candidate designs for the asset model

The single most consequential design decision in Phase 1. Three
candidates, with explicit trade-offs.

### Design A — Polymorphic "Asset" with type discriminator

A single `Asset` table; a `type` column (`EXPLANATION`,
`SCENE_SPEC`, `MCQ`, `MISCONCEPTION_PROBE`, …); a `payload` JSONB
column holding the type-specific data. Validation happens at write
time via a per-type schema.

- ✅ Easy retrieval: one query, one index, one table. Cross-type
  ranking and search are trivial (every asset has the same metadata
  surface).
- ✅ Cheap addition of new asset types: new schema, no migration.
- ❌ The payload is opaque to SQL — you cannot easily query "all
  scenes with `sceneType=simulation` and `language=hi`" without JSONB
  indexes per asset type.
- ❌ Application-layer dispatch on every read: `if type === 'SCENE'
  then validate as SceneSpec else …`. Easy to forget a case.

### Design B — Per-type tables (Explanation, Scene, Question, …)

A separate table for each asset type, each with a typed schema; a
shared `KnowledgeAssetMeta` join row for cross-type metadata
(provenance, language, evidence, ranking).

- ✅ Strong typing at the database layer. SQL queries are natural.
- ✅ Per-type optimizations (e.g., scene-specific full-text indexes,
  question-specific difficulty indexes).
- ❌ Cross-type queries (e.g., "all assets covering Newton's second
  law") require joins through the meta table.
- ❌ Adding a new asset type is a schema migration AND a code change
  in every cross-type consumer.

### Design C — Hybrid: small typed table per asset family + shared meta

Three or four asset *family* tables (`Explanation`, `Visual`,
`Question`, `Probe`) — each family large enough to subsume several
related types via a discriminator column on the family table (e.g.,
`Visual.kind = 'scene' | 'graph' | 'diagram' | 'animation'`). All
families share a single `AssetIdentity` row (id, provenance, language,
concept refs, evidence pointer, lifecycle status).

- ✅ Strong typing where it matters (per family) + cross-family
  metadata in one place.
- ✅ Adding a new TYPE within an existing family (e.g., a new visual
  kind) is a schema change to one table.
- ✅ Adding a new FAMILY is rare (we have three) — controlled cost.
- ✅ Cross-asset queries (`give me everything tagged to concept
  physics.newton.f_eq_ma`) go through `AssetIdentity` — one join, no
  fan-out.
- ❌ Slightly more schema than A.

### Choice — Design C

C is the only design that survives the four-way tension between
**typed validation**, **cross-asset ranking**, **easy extensibility
within a family**, and **scaling to millions of assets per family**.

The deciding observation: the three families (Explanation, Visual,
Question/Probe) are **architecturally different** — they have
different evidence types, different rankability, different lifetimes,
different generation costs. A polymorphic table (A) hides this. Pure
per-type (B) loses the cross-asset queryability that the Decision
Pipeline depends on. C gives us the right cleavage.

---

## 3. The three asset families in detail

### 3.1 Explanation Family

Plain-text or lightly-formatted teaching content that explains a
concept. The mascot's reply text, a hint, a worked example, a
remediation tip.

| Kind | Description | Authored by |
|------|-------------|-------------|
| `definition` | One- or two-sentence canonical statement of the concept | curator |
| `core_explanation` | The mascot's primary answer for "what is X?" | curator + LLM-assisted |
| `worked_example` | Step-by-step solution to a representative problem | curator + LLM-assisted |
| `hint_tier_1` / `hint_tier_2` / `hint_tier_3` | Progressively less subtle nudges | curator + LLM-assisted |
| `misconception_repair` | The corrective explanation for one specific misconception | curator |
| `prerequisite_recovery` | A short re-teach of a missing prerequisite, in context | curator + LLM-assisted |

Every Explanation asset carries:

```text
id              (slug, stable forever)
familyKind      'definition' | 'core_explanation' | ...
conceptId       FK → KnowledgeNode (the concept the asset teaches)
language        ISO 639-1 ('en', 'hi', 'ru', 'sa', ...)
gradeBand       'k_5' | '6_8' | '9_10' | '11_12' | 'undergrad'
style           'rigorous' | 'concrete' | 'analogy' | 'visual_first'
content         the actual text (markdown subset)
contentHash     SHA-256 of content (for dedup + integrity)
length          char count (denormalized; helps the ranker)
readingLevel    Flesch-Kincaid (computed at write time)
```

### 3.2 Visual Family

Anything that renders to pixels — a 2D `VisualSpec`, a 3D `SceneSpec`,
an animation, a diagram, an interactive widget.

| Kind | Description |
|------|-------------|
| `visual_spec_2d` | Existing `VisualSpec` (number line, graph, geometry, process flow, …) |
| `scene_spec_3d` | Existing `SceneSpec` from parametric / deterministic / AI generators |
| `dynamic_react` | LLM-generated React component (current dynamic engine output) |
| `animation` | Pre-authored animation timeline (keyframes, durations) |
| `interactive_widget` | A bounded, parameter-driven interactive (e.g., draggable slope) |

Every Visual asset carries:

```text
id, conceptId, language, gradeBand   (as above)
familyKind         'visual_spec_2d' | 'scene_spec_3d' | ...
specPayload        the typed payload (Zod-validated by family)
specHash           SHA-256 of specPayload (for dedup)
renderer           which renderer handles it ('katex' | 'recharts' | 'three' | 'custom')
estimatedRenderMs  for budget management
a11yDescription    long-form alt text (mandatory; never null)
```

### 3.3 Probe Family (Questions + Misconception Probes + Checkpoints)

Anything that elicits a learner response we can grade.

| Kind | Description |
|------|-------------|
| `mcq` | Multiple choice, exactly one correct |
| `true_false` | Boolean |
| `short_answer` | Free-text scored by keywords + sample answer |
| `numeric` | Numeric answer with tolerance |
| `step_check` | Did the learner pick the right next step? |
| `misconception_probe` | A question designed to *trip* a specific misconception (so the system can detect it deterministically) |
| `checkpoint` | A lightweight in-conversation comprehension check |

Every Probe carries:

```text
id, conceptId, language, gradeBand   (as above)
familyKind            'mcq' | 'true_false' | ...
stem                  the question text
choices               for mcq: 4 entries with text + correctness + (optional) misconceptionId
correctValue          for true_false / numeric / short_answer
tolerance             for numeric
keywords              for short_answer keyword scoring
sampleAnswer          for short_answer
difficulty            'foundational' | 'developing' | 'proficient' | 'advanced'
discriminationScore   IRT-like signal updated by Evidence Engine
targetedMisconceptions [misconceptionId] — what specific wrong answers map to
```

The `targetedMisconceptions` field is what fixes the prior MCQ
distractor bug (Sprint commit `cb362a2`) at the schema level — every
wrong answer is forced to be a real misconception, not "an unrelated
concept." If no misconception is named, the asset cannot be saved.

---

## 4. The shared `AssetIdentity` row

Every asset of every family has exactly one row in `AssetIdentity`,
joined by `assetId`. This is what gives us cross-family queryability
and a single place to look up provenance, evidence, ranking, and
lifecycle.

```text
assetId             (UUID; the universal handle)
family              'EXPLANATION' | 'VISUAL' | 'PROBE'
familyKind          discriminator within the family
conceptId           FK → KnowledgeNode
language            ISO 639-1
gradeBand           enum
authorId            FK → User (or a SYSTEM_AUTHOR row for AI-authored)
authorKind          'HUMAN_CURATOR' | 'AI_AUTHORED' | 'AI_AUTHORED_REVIEWED' | 'IMPORTED'
sourceTraceId       FK → KnowledgeAcquisitionTrace (doc 07)
createdAt           timestamp
version             monotonic int per (conceptId, familyKind, language)
parentVersionId     FK → AssetIdentity (when this asset is a revision)
status              'DRAFT' | 'REVIEW' | 'ACTIVE' | 'DEPRECATED' | 'RETIRED'
deprecationReason   text, null unless deprecated
qualityScore        denormalized rolling score from Evidence Engine (0..1)
qualityConfidence   denormalized uncertainty band on qualityScore (0..1)
sampleSize          how many learners contributed evidence
embedding           pgvector(768) — semantic content embedding (for retrieval)
tags                text[]   (e.g., 'good_for_visual_learners', 'requires_calc')
```

### Why the duplication between `language`/`conceptId` here and on the
family table?

Denormalization is deliberate. The vast majority of reads go through
`AssetIdentity` (decision pipeline, ranking, search). Forcing every
read to join the family table doubles the query cost on the hottest
path. The family table is the source of truth; `AssetIdentity` is the
indexed view.

---

## 5. Metadata that every asset must carry

```text
provenance           how the asset entered the Brain
                       'human_curator'        — a teacher / SME wrote it
                       'ai_authored'          — LLM produced it, no human review yet
                       'ai_authored_reviewed' — LLM produced it, a curator approved
                       'imported'             — extracted from a source document
                       'student_contribution' — a learner submitted (rare, gated)

source               (when provenance != human_curator)
                       FK → KnowledgeAcquisitionTrace
                       — which book / video / model + which page / timestamp

review                 reviewerId, reviewedAt, reviewVerdict
                       — null until reviewed

intellectualProperty   'public_domain' | 'cc_by' | 'cc_by_sa' | 'proprietary' | ...
                       — flagged on import; gates distribution

curriculumMappings     [(curriculumId, codeRef)]
                       — e.g. ('cbse_class_10_science', '10-physics-light-7.3')
                       — multiple curricula per asset; this is what makes the
                         core curriculum-agnostic

prerequisites          [conceptId]  — what the *asset* assumes the learner
                       knows, beyond what the conceptId requires globally
                       (e.g., an analogy-based explanation may presume
                       familiarity with the analogy domain)

incompatibilities      [misconceptionId]
                       — misconceptions this asset is known to FAIL to
                         repair (because the asset itself reinforces them)
```

The `incompatibilities` field is critical and rarely seen in
content-management systems: it lets the Decision Pipeline *avoid* an
otherwise-high-ranked asset for a learner who carries a specific
misconception, because the asset is known to confuse those learners.

---

## 6. Versioning

Every asset is **append-only versioned**. An "edit" creates a new
`AssetIdentity` row with the same logical slug (`canonicalSlug` =
`(conceptId, familyKind, language, style)`) and an incremented
`version`, plus a `parentVersionId` link. The old version is moved to
`status='DEPRECATED'` (never deleted).

### Why never delete?

- Evidence already collected against the old version stays valid (we
  can re-analyze whether the new version actually improved things).
- Reproducibility — a learner who saw version N gets the same asset
  if they revisit the lesson; new learners get version N+1.
- A/B comparison — the Evidence Engine can run a small experiment on
  V vs N+1 before promoting.

### Versioning rules

| Change | Bump |
|--------|------|
| Typo / formatting | `patch` — increments `version`, same `qualityScore` carried over (negligible content delta) |
| Substantive text edit | `minor` — increments `version`, `qualityScore` reset to prior * 0.7 (penalized; evidence must rebuild) |
| Replacing the asset semantically | `major` — new `assetId` entirely; previous asset deprecated |
| Adding a translation | not a version bump on the source — a NEW asset with the same `canonicalSlug` group |

---

## 7. Validation

Every asset passes through a validator BEFORE entering `status='REVIEW'`
(human-curated) or `status='ACTIVE'` (AI-authored with the AI also
producing a validation trace).

### Three validator layers

**Layer 1 — Schema** (per family): a strict Zod schema. Reject on any
schema violation. Free, deterministic, fast.

**Layer 2 — Static checks** (per family):

- *Explanation*: reading level within `gradeBand`'s tolerance; no
  unfamiliar jargon (compared against a per-grade vocabulary
  whitelist); no markdown that would break the renderer; no broken
  references to nonexistent concepts.
- *Visual*: payload validates against the renderer's spec validator
  (the existing `validateSceneSpec`, `validateVisualSpec`); a11y
  description present and non-trivial; estimated render time within
  budget.
- *Probe*: at least one correct answer; for MCQ, exactly one correct
  and every distractor has a non-empty `misconceptionId` OR is itself
  a curriculum-relevant fact; difficulty matches the concept's
  grade band; the question stem references vocabulary from the
  concept's `KnowledgeNode.title` or `description`.

**Layer 3 — Consistency** (cross-asset, per family):

- *Explanation*: the new asset cannot contradict the `definition` for
  the same concept (the definition is the canonical statement; if the
  explanation contradicts it, one of them is wrong).
- *Visual*: a parametric scene must pass the existing
  `checkProjectileConsistency`-style independent recomputation.
- *Probe*: the correct answer of an MCQ, when fed through the
  Explanation family's definition asset, must be *derivable* (a
  reasoning-trace check, deterministic when the concept has a formula;
  LLM-judged otherwise).

A validation **failure** in layer 1 or 2 always rejects the asset.
A validation failure in layer 3 *flags* the asset for human review,
because layer 3 catches plausible-looking but subtly wrong content.

---

## 8. Ranking

Every asset of the same `canonicalSlug` group competes for "which
version to serve" based on a composite ranking score recomputed nightly
(see doc 04 for the full evidence model). Ranking inputs:

| Signal | Range | Weight |
|--------|-------|--------|
| `qualityScore` from Evidence Engine | 0..1 | 0.45 |
| `qualityConfidence` (high confidence wins ties) | 0..1 | 0.10 |
| `sampleSize` (logarithmic; more learners → more trust) | log10(n+1) | 0.10 |
| Recency penalty (older assets decay 5%/year) | 0..1 | 0.05 |
| Author trust (curated > reviewed > AI > student) | 0.3..1.0 | 0.10 |
| Concept-asset match (embedding similarity to concept) | 0..1 | 0.10 |
| Diversity bonus (penalize if 5 similar assets already ranked) | 0..1 | 0.10 |

Weights are not magic constants; they live in
`brain.config/ranking.json` and are themselves subject to A/B tests
(see doc 04, "Ranking-policy experiments").

---

## 9. Search

Two search paths, both required.

### Path 1 — Symbolic (used by the Decision Pipeline)

Lookup by exact `(conceptId, familyKind, language, gradeBand)` →
returns the top-ranked active asset. This is the hot path; sub-1 ms
latency expected. Backed by a covering index on `AssetIdentity`.

### Path 2 — Semantic (used by retrieval-augmented authoring)

Lookup by query embedding → top-K most similar assets across all
families. Backed by pgvector on `AssetIdentity.embedding`. Used by:

- **The author tool**: a curator typing a new explanation sees a list
  of existing similar assets to avoid duplication.
- **Knowledge Acquisition (doc 07)**: a new book chunk's embedding is
  matched against existing assets before authoring a new one.
- **The Decision Pipeline's "explain it differently"** fallback when
  the learner taps "I don't get it" — surface a *semantically similar
  but stylistically different* asset.

---

## 10. Linking

Assets link to:

- Their **concept** (`conceptId` → KnowledgeNode in the graph)
- Their **prerequisites** (asset-specific, beyond concept-level)
- Their **misconceptions targeted** (probes especially)
- Their **incompatibilities** (misconceptions the asset is known to
  fail on)
- Other **assets** via `relatedAssetIds` for navigational links
  ("see also") — directed, typed (`'see_also' | 'alternative' |
  'follow_on' | 'remediation_for'`)

Linking is the responsibility of the *Knowledge Graph* layer (doc 02);
this section just lists the link fields the asset must carry.

---

## 11. Deprecation

An asset becomes `status='DEPRECATED'` when ANY of:

1. **Evidence-driven**: its `qualityScore` falls below 0.4 with
   `qualityConfidence > 0.7` and `sampleSize > 500`. (We are confident
   it teaches worse than its alternatives.)
2. **Replacement available**: a newer version of the same
   `canonicalSlug` has been `ACTIVE` for 14 days with `qualityScore >
   old.qualityScore + 0.1` and `sampleSize > 200`.
3. **Validation regression**: a future validator rule retroactively
   flags the asset (e.g., a misconception taxonomy update reveals the
   asset reinforces a now-recognized misconception).
4. **Curriculum delisting**: the only curricula referencing the asset
   were updated and no longer reference it.
5. **Curator manual deprecation**: a human flagged it with a reason.

Deprecated assets remain **readable** (for reproducibility, evidence
analysis, and rollback) but are not served to new learners.

`status='RETIRED'` is the further state: hard-removed from all
serving paths, kept only for audit / research. Retirement requires
a separate curator action; it is not automatic.

---

## 12. Improvement

The Brain has three mechanisms for improving existing assets, each
cheaper to the system than authoring from scratch.

### M1. Stem variants (Probes)

For low-quality probes, the Brain can request the LLM to generate K
**stem variants** of the same probe (different wording, same correct
answer, same targeted misconceptions). The variants enter the Probe
family with `parentVersionId` linkage, run a small A/B, and the winner
is promoted. The original is retained as a fallback.

### M2. Style transfers (Explanations)

For an Explanation asset that scores well on some learner styles and
poorly on others (e.g., good for `rigorous` learners, bad for
`concrete`), the Brain can request a "rewrite in style X" pass. The
output is a NEW asset (different `style` field), not a replacement —
the original keeps its rank for its winning audience.

### M3. Geometry refinement (Visuals)

For a Visual asset with high learner-reported confusion ("I don't
understand what's happening on screen"), the Brain spawns a curator
review queue item with the asset, its evidence summary, and the
top-3 alternative visuals on the same concept. A human edits or
authors the replacement.

There is no fully-autonomous improvement loop in Phase 1 — every
promoted improvement requires either statistical confidence (M1) or
a human in the loop (M3). M2 is autonomous because failing politely
(serving the new style only when its evidence > 0.5) is the worst
case.

---

## 13. Anti-patterns explicitly rejected

- ❌ **Regenerating an explanation per request**. The current chat
  route effectively does this for every turn. Phase 2's first task is
  to make every turn a **retrieval** with generation as the rare
  fallback.
- ❌ **One global "best explanation" per concept**. Best for whom?
  A grade-5 visual learner and a grade-10 rigor-seeker are different
  audiences. Ranking is *conditional* on `(language, gradeBand,
  style, learnerProfile)`.
- ❌ **Mutating an existing asset in place**. Always versioned.
- ❌ **Treating an asset's `id` as semantic**. The id is opaque; the
  `canonicalSlug` is the human-meaningful identifier; the `assetId`
  is the database handle.
- ❌ **Trusting AI-authored content without a validation trace**.
  Every AI-authored asset arrives with the input prompt, the model id,
  the response, the validator output, and a reviewer queue placement.
- ❌ **Letting any layer of the system write directly to
  `AssetIdentity.qualityScore`**. The Evidence Engine is the sole
  writer; everything else reads.
- ❌ **Allowing more than one asset per `canonicalSlug` to be
  `ACTIVE`**. Ranking is implicit, not parallel. (Experiments use
  a `EXPERIMENT_VARIANT` status, not `ACTIVE`.)

---

## 14. Open questions, deferred to later phases

- **Asset bundles** — should a worked example + the matching probe +
  the relevant scene travel together as a "lesson bundle"? Probably
  yes; deferred to the curriculum-view layer in doc 02.
- **Curator UI** — Phase 1 specifies the data model; the curator-
  facing tool is Phase 3.
- **Asset cost accounting** — every AI-authored asset has a token cost;
  the Brain should track cumulative AI spend per concept and surface
  concepts where authoring spend has not yet paid off in evidence-
  weighted usage. Phase 2 should add a simple `costCents` field;
  cost-aware ranking is Phase 4+.

---

## 15. Why this design is right for the next 5 years

The three-family split is the only choice that scales gracefully on
three axes simultaneously:

1. **Volume** — millions of assets per family, indexed by
   `(conceptId, familyKind, language)` for O(log n) retrieval.
2. **Diversity** — adding a new probe type (`drag_and_drop`,
   `code_completion`, `proof_step`) is a single-table change, not a
   schema-wide migration.
3. **Evidence** — every asset of every family is rankable on the same
   `qualityScore` axis, so a Brain-level "show me the worst 100 assets
   across the catalogue" query is one filter on `AssetIdentity`.

The asset model is the foundation. Get this right and the rest of the
Brain composes naturally: the Graph (doc 02) is "concepts → assets";
the Decision Pipeline (doc 03) is "find the right asset"; the Evidence
Engine (doc 04) is "score assets from learner outcomes"; the Memory
System (doc 05) is "which assets did this learner already see, and
how did they do?"
