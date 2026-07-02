# ADR 14 · Knowledge Asset Lifecycle

**Status:** Proposed (documentation only — implementation blocked on Canonical KG v1 freeze and explicit user approval)
**Date:** 2026-07-02
**Supersedes:** nothing — first ADR on knowledge asset lifecycle
**Superseded by:** —

---

## 1. Problem

Every teaching turn in the current system generates content from scratch — the LLM writes a new
explanation for Newton's second law, the parametric generator re-extracts the same parameters for
a projectile scene, `workedExamples.ts` generates a new step sequence for the same worked example
type. Generated content is served once and discarded. The Brain has no persistent, versioned,
evidence-ranked catalogue of *what it has already produced and validated*.

**The concrete failure class:**

- The same concept explained differently in every session — even for the same student, whose
  prior explanation was discarded. Inconsistency harms long-term memory formation.
- A high-quality explanation that earned strong probe-pass-rate evidence three months ago has
  zero effect on this turn, because it was never persisted as an asset.
- A misconception probe that consistently correlates with detecting a specific misconception
  was used once and thrown away.

**There is no `AssetIdentity` table.** The Brain has no unified schema for "a persisted,
versioned, evidence-ranked unit of educational content." The closest live approximation is
the `VisualizationCache` table (introduced in ADR 12 as the Visual Asset cache), but:
- It covers only the Visual family.
- It has no lifecycle states.
- It carries no versioning, validation trace, provenance, or intellectual property metadata.
- Its quality score is not yet populated by the Evidence Engine (ADR 13).

This ADR designs the foundational `AssetIdentity` table and the three-family schema that
ADRs 12 and 13 depend on.

---

## 2. Evidence

**Existing content-producing components that map to Knowledge Assets:**

| Live component | Asset family | Asset kind | Current persistence |
|---|---|---|---|
| `route.ts` LLM explanation | Explanation | `core_explanation` | Not persisted — discarded every turn |
| `workedExamples.ts` | Explanation | `worked_example` | Step progress persisted to `contextSnapshot`, but the generated content is not cached |
| `buildSceneSpec.ts` | Visual | `scene_spec_3d` | Not persisted (ADR 12 §2 confirmed) |
| Parametric generators (×29) | Visual | `scene_spec_3d` | Not persisted — re-generated per turn |
| `generateVisualizationCode.ts` | Visual | `dynamic_react` | `VisualizationCache` (session-scoped, not concept-keyed until ADR 12) |
| Practice questions (`PracticeSession`) | Probe | `mcq` | `PracticeSession.questions` JSONB (per-session, not globally ranked) |

**`docs/educational-brain/01-knowledge-assets.md` (ch01, confirmed by reading):**
Comprehensive design for three asset families (Explanation, Visual, Probe) plus a shared
`AssetIdentity` row. Design C (hybrid: small typed table per family + shared meta) selected
by ch01 with full trade-off analysis. This ADR adopts Design C and specifies how it integrates
with ADR 10, 12, 13. Key ch01 findings incorporated:

- `incompatibilities: [misconceptionId]` field on `AssetIdentity` — misconceptions the asset
  is known to *fail to repair* or actively reinforce; gates serving.
- Append-only versioning: "edit" creates new `AssetIdentity` row with `parentVersionId`; old
  version moves to `DEPRECATED`. Never delete.
- Five deprecation triggers (§11): evidence-driven, replacement available, validation
  regression, curriculum delisting, curator manual.
- Three asset improvement mechanisms (§12): stem variants (probes), style transfers
  (explanations), geometry refinement (visuals).
- Single-writer rule for `AssetIdentity.qualityScore`: the Evidence Engine owns it (ADR 13).

**`curriculum/teachingAssets.ts` (Teaching Assets Platform):**
`teachingAssetSchema.ts` / `teachingAssetAdapter.ts` / `teachingAssets.ts` are confirmed
ORPHANED (zero live importers, per CLAUDE.md). They represent a prior, abandoned attempt at
an asset model. They are NOT adopted by ADR 14 — the correct model is ch01's Design C.

---

## 3. Alternative designs

### Design A — Polymorphic single `Asset` table

One table; `type` discriminator; `payload` JSONB. Straightforward. Loses per-family SQL
queryability. Dispatch in application code must handle every asset type explicitly.

*Rejected*: same reason as ch01's rejection of Design A — the three families have structurally
different evidence types, different rankability axes, and different validation logic. A JSONB
payload hides the structure the Brain needs to reason about.

### Design B — Per-type tables only

One table per asset kind (ExplanationDefinition, ExplanationWorkedExample, SceneSpec3D, McqProbe,
etc.). Perfect typing, no cross-type queries.

*Rejected*: cross-asset queries (all assets for a concept, the ranking score for an asset,
deprecation of all versions of a logical asset) are the hot path of the Decision Pipeline —
they require a single `AssetIdentity` index, not a fan-out through 10 tables.

### Design C — Three family tables + shared `AssetIdentity` (selected)

Adopts ch01 Design C. Three family tables (`ExplanationAsset`, `VisualAsset` already designed
in ADR 12, `ProbeAsset`) each with a per-family typed schema. One shared `AssetIdentity` table
indexed by the per-family primary key. Cross-asset queries go through `AssetIdentity`; family-
specific queries go directly to the family table.

---

## 4. Selected design

**Design C — Three family tables + shared `AssetIdentity`.**

### 4.1 `AssetIdentity` table (central)

```typescript
interface AssetIdentity {
  assetId: string           // UUID — the universal, stable, opaque handle
  family: 'EXPLANATION' | 'VISUAL' | 'PROBE'
  familyKind: string        // discriminator within the family (see §4.2–4.4)
  conceptId: string         // KG concept slug
  language: string          // ISO 639-1 ('en', 'hi', 'ru', ...)
  gradeBand: GradeBand      // 'k_5' | '6_8' | '9_10' | '11_12' | 'undergrad'
  authorId: string          // userId or 'SYSTEM_AI' sentinel
  authorKind: AuthorKind    // 'HUMAN_CURATOR' | 'AI_AUTHORED' | 'AI_AUTHORED_REVIEWED' | 'IMPORTED'
  status: AssetStatus       // see §4.5 lifecycle state machine
  version: number           // monotonic int per (conceptId, familyKind, language)
  parentVersionId?: string  // FK → AssetIdentity (when this is a revision)
  canonicalSlug: string     // (conceptId + familyKind + language) hash — groups all versions
  // Evidence (single-writer: Evidence Engine, ADR 13)
  qualityScore: number      // 0–1; Evidence Engine's derived score
  qualityConfidence: number // 0–1; width of credible interval
  sampleSize: number        // number of contributing evidence events
  // Content metadata
  contentHash: string       // SHA-256 of family-specific payload (dedup + integrity)
  embedding?: number[]      // pgvector(768) — semantic similarity (Phase 3+)
  tags: string[]            // e.g. 'good_for_visual_learners', 'requires_calc'
  // Provenance
  sourceTraceId?: string    // FK → future KnowledgeAcquisitionTrace table
  intellectualProperty: string  // 'public_domain' | 'cc_by' | 'proprietary' | ...
  curriculumMappings: Array<{ curriculumId: string; codeRef: string }>
  deprecationReason?: string
  createdAt: Date
  updatedAt: Date           // last status change only
  // Safety gates (per ch01 §5)
  incompatibilities: string[]  // [misconceptionId] — misconceptions this asset reinforces
  prerequisites: string[]      // [conceptId] — asset-specific prerequisites beyond concept-level
}
```

### 4.2 Explanation Family (`ExplanationAsset`)

```typescript
interface ExplanationAsset {
  assetId: string           // FK → AssetIdentity
  content: string           // markdown subset — the teaching text
  style: 'rigorous' | 'concrete' | 'analogy' | 'visual_first'
  readingLevel: number      // Flesch-Kincaid score (computed at write time)
  lengthChars: number       // denormalized
  targetedMisconceptions: string[]  // [misconceptionId] this asset is designed to repair
}

type ExplanationKind =
  | 'definition'
  | 'core_explanation'
  | 'worked_example'
  | 'hint_tier_1'
  | 'hint_tier_2'
  | 'hint_tier_3'
  | 'misconception_repair'
  | 'prerequisite_recovery'
```

### 4.3 Visual Family (`VisualAsset`)

Already designed in ADR 12 §4.1 and §4.2. `VisualAsset` is the Visual family table.
`AssetIdentity.assetId` is the join key between `AssetIdentity` and the `VisualizationCache`
table (ADR 12's bridge table) until `VisualAsset` is fully implemented.

```typescript
// Reference to ADR 12 §4.1 — reproduced here for completeness:
type VisualRenderer = 'katex' | 'scene_spec' | 'visual_spec' | 'dynamic_component' | 'animation' | 'interactive_widget'
```

### 4.4 Probe Family (`ProbeAsset`)

```typescript
interface ProbeAsset {
  assetId: string                 // FK → AssetIdentity
  stem: string                    // the question text
  choices?: ProbeChoice[]         // for MCQ
  correctValue?: string | number  // for true_false, numeric, short_answer
  tolerance?: number              // for numeric answer
  keywords?: string[]             // for short_answer keyword scoring
  sampleAnswer?: string           // for short_answer
  difficulty: 'foundational' | 'developing' | 'proficient' | 'advanced'
  discriminationScore?: number    // IRT-like signal (0–1, updated by Evidence Engine)
  targetedMisconceptions: string[] // [misconceptionId] — what wrong answers map to
  requiredVisuals: string[]        // [assetId] — Visual assets that must be on screen
}

interface ProbeChoice {
  text: string
  isCorrect: boolean
  misconceptionId?: string   // if wrong: which misconception does this distractor trigger?
}

type ProbeKind =
  | 'mcq'
  | 'true_false'
  | 'short_answer'
  | 'numeric'
  | 'step_check'
  | 'misconception_probe'
  | 'checkpoint'
```

### 4.5 Lifecycle state machine

```
       ┌─────────┐
       │  DRAFT   │  ← All AI-authored assets enter here
       └────┬─────┘
            │ passes Layer 1 + Layer 2 validation
            ▼
       ┌─────────┐
       │  REVIEW  │  ← Curator must approve (human-curated assets may skip directly to ACTIVE)
       └────┬─────┘
            │ curator approves
            ▼
       ┌─────────┐     ← The only status served to learners in production
       │  ACTIVE  │
       └────┬─────┘
            │ one of five deprecation triggers fires (§4.6)
            ▼
       ┌────────────┐
       │ DEPRECATED  │  ← Still readable for analysis/rollback; not served to new learners
       └────┬────────┘
            │ curator explicit action (separate, non-automatic)
            ▼
       ┌─────────┐
       │  RETIRED │  ← Removed from all serving paths; kept for audit/research only
       └──────────┘
```

Only `ACTIVE` assets are served to learners. One canonical rule: **at most one asset per
`canonicalSlug` may be `ACTIVE` at any time** (experiments use `EXPERIMENT_VARIANT` status,
not `ACTIVE`).

### 4.6 Five deprecation triggers

| Trigger | Condition | Action |
|---|---|---|
| Evidence-driven | `qualityScore < 0.4` AND `qualityConfidence > 0.7` AND `sampleSize > 500` | → `DEPRECATED`; emit `CuratorQueueEntry` (ADR 13) |
| Replacement available | Newer version in same `canonicalSlug` group has been `ACTIVE` ≥14 days with `qualityScore > old + 0.1` AND `sampleSize > 200` | → old version `DEPRECATED` |
| Validation regression | A future validator rule retroactively flags the asset (e.g., misconception taxonomy update) | → `DEPRECATED`; emit `CuratorQueueEntry` |
| Curriculum delisting | The only curricula referencing this asset were updated and no longer reference it | → `DEPRECATED` |
| Curator manual | A human flagged it with a reason | → `DEPRECATED` immediately |

### 4.7 Three versioning rules (per ch01 §6)

| Change type | Action |
|---|---|
| Typo / formatting patch | New `version` int; `qualityScore` carried over (negligible content delta) |
| Substantive text edit | New `version` int; `qualityScore × 0.7` (penalty; evidence must rebuild) |
| Semantic replacement | New `assetId` entirely (new entry in `AssetIdentity`); previous `DEPRECATED` |
| Translation | New `assetId` with same `canonicalSlug` group; no version bump on source |

### 4.8 Canonical retrieval contract

The Decision Pipeline's stage 6 (Visual) and stage 5 (Composition) query `AssetIdentity` via:

```
SELECT a.*
FROM AssetIdentity a
WHERE a.conceptId = $conceptId
  AND a.family = $family
  AND a.familyKind IN ($acceptedKinds)
  AND a.language = $language
  AND a.gradeBand = $gradeBand
  AND a.status = 'ACTIVE'
  AND NOT EXISTS (SELECT 1 FROM incompatibilities WHERE assetId = a.assetId
                  AND misconceptionId = ANY($activeMisconceptions))
ORDER BY (a.qualityScore * a.qualityConfidence) DESC
LIMIT 1
```

The `NOT EXISTS` clause on `incompatibilities` is the mechanism that prevents an asset
known to reinforce the learner's active misconception from being served — per ch01 §5.

---

## 5. Trade-offs

**Schema complexity:** three family tables + one identity table is more schema than the current
zero tables for assets. This is an intentional complexity trade for correctness: the three-
family split is what enables per-family validation, per-family evidence weights, and
per-family optimization without collapsing everything into a JSONB blob.

**Migration from the current generation path:** every AI-authored explanation and visual is
currently generated inline and discarded. Phase 2 of this ADR captures generations and stores
them as `DRAFT` assets — no immediate behavior change, but the catalogue starts accumulating
content. Phase 3 switches the serving path from generation to retrieval (with generation as
the miss fallback).

**`PracticeSession.questions` as asset store:** practice questions are currently stored as
JSONB per-session, not as globally-ranked `ProbeAsset` records. Migrating this is the most
invasive part of the Knowledge Asset model — it affects the practice generation path, the
assessment path, and the `PracticeSession` schema. This migration is explicitly deferred to
implementation Phase 4.

---

## 6. Scalability

**`AssetIdentity` at 1M assets:** indexed on `(conceptId, family, familyKind, language,
gradeBand, status)` — a composite covering index. O(log n) per retrieval, bounded by the
candidate set for a given `(conceptId, familyKind)` tuple (typically ≤10 active versions).

**pgvector embedding:** Phase 3+ only; not required for the hot retrieval path. The symbolic
lookup (§4.8) is the Decision Pipeline's hot path.

**Append-only versioning:** the `AssetIdentity` table grows monotonically. Historical versions
are DEPRECATED but not deleted. Mitigation: a cold-storage tier (Parquet) for assets that have
been RETIRED for > 90 days (same pattern as ADR 10's long-term Memory Store 6).

---

## 7. AI independence impact

This ADR is the architectural complement to ADR 13's Evidence Engine for AI independence (P2
and P9). Together:

- **ADR 13** measures what works.
- **ADR 14** persists what worked, versioned and ranked.
- Once the `AssetIdentity` catalogue is populated, the per-turn LLM call shifts from
  "generate the explanation" to "render the already-chosen explanation in the conversational
  voice." The LLM becomes a voice-renderer, not a content-generator. This is the Phase 2
  endgame.

The journey: Phase 1 (generate + discard) → Phase 2 (generate + persist as DRAFT) → Phase 3
(retrieve ACTIVE; generate only on miss; persist the generation as DRAFT for curator review)
→ Phase 4 (the catalogue is rich enough that the miss rate is negligible).

---

## 8. Backward compatibility

**Phase 1 (additive, no behavior change):** `AssetIdentity`, `ExplanationAsset`, `ProbeAsset`
tables are added. No existing call site is changed. The tables are empty. The generation path
continues unchanged.

**Phase 2 (capture generation output):** after a successful generation, the result is written
to `AssetIdentity` + family table with `status = 'DRAFT'`. The next request for the same
`(conceptId, familyKind, language, gradeBand)` will find a `DRAFT` asset but not serve it —
only `ACTIVE` assets are served. Behavior is unchanged; the catalogue grows passively.

**Phase 3 (activate retrieval):** a curator (or an automated reviewer for parametric/deterministic
assets that pass all three validation layers) promotes DRAFT assets to ACTIVE. The retrieval
path is switched on; the miss-then-generate path remains as a fallback.

---

## 9. Validation strategy

**`AssetIdentity` schema validation:**
- Zod schema; must pass at write time.
- `qualityScore` in [0, 1]; `qualityConfidence` in [0, 1]; `sampleSize` ≥ 0.
- `canonicalSlug` is a deterministic hash of `(conceptId, familyKind, language)` — validated
  at write time to prevent collision.
- `incompatibilities` must be valid `misconceptionId` values (FK check).

**Three-layer asset validation (per-family, run before status → REVIEW or ACTIVE):**
- Layer 1 (schema): Zod per family.
- Layer 2 (static): reading level within gradeBand (Explanation), a11y present (Visual),
  correct answer present (Probe), MCQ distractors have `misconceptionId` (Probe).
- Layer 3 (consistency): Explanation doesn't contradict the concept's definition asset;
  Visual passes existing `validateSceneSpec`/`checkConsistency`; Probe's correct answer
  derivable from the concept's definition.

**Lifecycle state machine:**
- Property test: no asset may transition directly from `DRAFT` to `ACTIVE` (must pass through
  `REVIEW`); no asset may transition from `RETIRED` to any state.
- Unit test: all five deprecation triggers produce `status → DEPRECATED` and emit a
  `CuratorQueueEntry` row.

---

## 10. Migration strategy

**Phase 1 (schema creation):**
1. Add `AssetIdentity`, `ExplanationAsset`, `ProbeAsset` Prisma models.
2. `VisualAsset` (ADR 12) already maps to the Visual family — add `assetId` FK to
   `VisualizationCache` as the bridge until `VisualAsset` is fully separated.

**Phase 2 (passive catalogue population):**
1. After each successful generation in `route.ts`, write the result to `AssetIdentity` +
   family table with `status = 'DRAFT'`. Fire-and-forget, non-blocking.
2. After parametric generation: all three validation layers run deterministically; passing
   assets auto-promote to `REVIEW`.

**Phase 3 (active retrieval):**
1. Add concept-keyed `AssetIdentity` lookup at the start of the content-composition stage.
2. On hit (status = `ACTIVE`): serve the asset, emit `ASSET_SHOWN` `EbEvidenceEvent`.
3. On miss: generate, persist as `DRAFT`, serve the generation.
4. Introduce the curator UI (minimal: a list of REVIEW assets, approve/edit/reject actions).

**Phase 4 (probe assets):**
1. Migrate `PracticeSession.questions` to `ProbeAsset` records (dedup by `contentHash`).
2. Practice generation now retrieves from `ProbeAsset` catalogue; generates only on miss.

---

## 11. Relationship to previous ADRs

**ADR 06 (KG Consumption Pipeline):** `AssetIdentity.conceptId` is a KG slug. The slug
stability guarantee that ADR 06's consumption gate enforces also protects the asset catalogue.
A KG slug rename must trigger an `AssetIdentity` migration (same pattern as ADR 13 R18).

**ADR 10 (Student Memory Architecture):** the `BrainConfig` store (ADR 10 §4.5) owns the
ranking weights (`qualityScore × qualityConfidence` weight ratios, author-trust scores,
diversity bonus config) used in §4.8's retrieval query.

**ADR 12 (Visualization & Simulation Architecture):** `VisualAsset` (ADR 12 §4.1) is the
Visual family table. ADR 14 provides the `AssetIdentity` shared meta that ADR 12's
`VisualAsset` type is a specialization of. Implementation: the `VisualizationCache` table
becomes the `VisualAsset` family table plus the shared `AssetIdentity` join, rather than a
separate implementation.

**ADR 13 (Evidence Engine):** the Evidence Engine is the sole writer of `AssetIdentity.qualityScore`,
`AssetIdentity.qualityConfidence`, and `AssetIdentity.sampleSize`. ADR 14 formalizes this as a
single-writer rule on `AssetIdentity`'s quality fields. No other component may write them.

**ADR 11 (Recommendation Intelligence):** the `CuratorQueueEntry` table (ADR 13 §4.3) is
triggered by evidence-driven deprecation (Trigger 1 in §4.6 above). The curator queue is the
human feedback loop that prevents AI-authored content from degrading unnoticed — it is the
Recommendation Intelligence system's equivalent of `SessionRecommendation.suppressedSignals`
(a decision explained rather than hidden).

---

## 12. Relationship to the Canonical Knowledge Graph

Every `AssetIdentity` row has a `conceptId` that is a KG concept slug. This is the graph edge
between the Knowledge Graph ("what exists to be learned") and the Knowledge Asset catalogue
("how it is taught"). The KG prescribes *what* a concept means; the asset catalogue prescribes
*how* it is taught, to whom, in what style, with what evidence.

The KG is immutable (Curriculum Production Pipeline authority). Assets are mutable (authored,
versioned, deprecated). This asymmetry is the correct one: the concept doesn't change, but
how best to explain it does.

`curriculumMappings: [(curriculumId, codeRef)]` on `AssetIdentity` links assets to specific
board/grade references without coupling the asset's identity to any curriculum — a single
asset can reference CBSE Class 10, Pearson Grade 9, and Khan Academy Grade 8 simultaneously.

---

## 13. Relationship to the Teaching Engine

The Teaching Engine (`decide()`) is pure, zero-I/O. It does not read `AssetIdentity` directly.
Its output (`TeachingDecision.visual_type`, `action_type`, `bloom_level`) informs which
`familyKind` and `difficulty` filters the caller (`route.ts`) uses when querying `AssetIdentity`.
The Teaching Engine never knows which specific asset was served — it makes the pedagogical
*type* decision; the asset retrieval makes the *content* decision.

The asset retrieval query in `route.ts` is a deterministic, read-only query. It follows the
Teaching Engine's output; it never precedes or influences it.

---

## 14. Future implementation plan

When implementation is approved:

1. **`prisma/schema.prisma`** — add `AssetIdentity`, `ExplanationAsset`, `ProbeAsset` models;
   extend `VisualizationCache` with `assetId` FK.
2. **`src/lib/teaching/assets/assetIdentity.ts`** — new file: `AssetIdentity` type,
   `AssetStatus` enum, `AuthorKind` enum, `GradeBand` enum, `ExplanationKind` enum,
   `ProbeKind` enum, `ProbeChoice` type, lifecycle state machine functions.
3. **`src/lib/teaching/assets/assetRetrieval.ts`** — new file: `findActiveAsset(conceptId,
   family, familyKinds, language, gradeBand, activeMisconceptions)` — the canonical retrieval
   function used by `route.ts` and any future asset-serving caller.
4. **`src/lib/teaching/assets/assetValidator.ts`** — new file: three-layer validator with
   per-family Layer 2 checks.
5. **`src/lib/teaching/assets/assetIngestion.ts`** — new file: `ingestGeneratedAsset()` —
   writes a DRAFT `AssetIdentity` + family row from a generation path's output.
6. **`src/app/api/learn/chat/route.ts`** — Phase 3 change: add `findActiveAsset()` call
   before LLM explanation generation; add `ingestGeneratedAsset()` call after generation.
7. **Teaching Assets Platform orphaned files** (`teachingAssetSchema.ts`,
   `teachingAssetAdapter.ts`, `teachingAssets.ts`) — formally retired (add archive-status
   header comment). They are NOT the implementation path; ADR 14's schema supersedes them.
   No deletion required; the files carry real content and may be valuable as author reference.
8. **Add `Finding 14`** to `ARCHITECTURE_DECISIONS.md` (current generation-per-turn path as
   P2 violation; three-family Knowledge Asset model as the resolution; orphaned Teaching
   Assets Platform formally retired in favor of ADR 14's schema).

How does this make the Educational Brain think and teach more like a world-class human teacher?
A world-class teacher has a lesson plan — a set of carefully prepared, evidence-tested
explanations and questions — not an improvised monologue generated fresh every class. The
Knowledge Asset model gives the Brain exactly this: a persisted, ranked, validated catalogue
of teaching content that gets better over time, not just more fluent.
