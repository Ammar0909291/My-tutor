# Teaching Assets Platform v1.0 — Production Report

Build date: 2026-06-29

## 1. Generic Teaching Asset Schema

`src/lib/curriculum/teachingAssetSchema.ts` — a single Zod schema used by every
subject. It contains zero subject-specific field names (no math/physics/
chemistry/biology/CS terms in the schema itself) and covers all 10 required
dimensions:

| # | Dimension | Field | Type |
|---|---|---|---|
| 1 | Learning Objective | `learning_objective` | string |
| 2 | Concept Summary | `concept_summary` | string |
| 3 | Key Ideas | `key_ideas` | string[] (min 1) |
| 4 | Common Misconceptions | `common_misconceptions` | `{misconception, correction}[]` (min 1) |
| 5 | Visual Teaching Suggestions | `visual_teaching_suggestions` | string[] (min 1) |
| 6 | Worked Example Blueprint | `worked_example_blueprint` | `{setup, steps[], expected_outcome}` |
| 7 | Practice Blueprint | `practice_blueprint` | `{item_types[], difficulty_progression, suggested_count}` |
| 8 | Assessment Blueprint | `assessment_blueprint` | `{formats[], bloom_alignment, mastery_signal}` |
| 9 | Real-world Applications | `real_world_applications` | string[] (min 1) |
| 10 | Prerequisite Review Triggers | `prerequisite_review_triggers` | string[] (KG concept IDs) |

Identity/lifecycle fields: `id`, `concept_id` (must match a KG concept ID
exactly), `version`, `status` (`placeholder \| draft \| reviewed \| published`).

The schema never includes the KG's `description` field — placeholder content
is generated only from structural fields (`id`, `name`, `bloom`, `difficulty`,
`requires`), so the asset layer cannot duplicate curriculum authored in the KG.

## 2. Asset Storage Architecture

Mirrors the existing KG storage convention exactly:

```
docs/{subject}/teaching-assets/assets.json
```

File shape: `{ name, version, status, build_date, subject, assets: TeachingAsset[] }`.

Loaded via `createTeachingAssetAdapter(subject)`
(`src/lib/curriculum/teachingAssetAdapter.ts`), which lazy-loads and caches
for the process lifetime — identical pattern to `subjectKgAdapter.ts`. If a
subject has no assets file yet, the adapter returns `[]` instead of throwing,
so subjects can adopt the layer incrementally.

Public entry point: `src/lib/curriculum/teachingAssets.ts` exposes
`getTeachingAssets(subjectSlug)`, `getTeachingAsset(subjectSlug, conceptId)`,
and `getTeachingAssetById(conceptId)` (routes by ID prefix, same convention as
the KG's `ID_PREFIX_TO_SUBJECT`). This file never imports, and is never
imported by, `knowledgeGraph.ts` — the two registries compose independently.

## 3. Validation Tooling

`scripts/validate-teaching-assets.ts` — generic, subject-agnostic, run as:

```
npx tsx scripts/validate-teaching-assets.ts <subject-docs-slug>
```

Six checks, same PASS/WARN/FAIL convention and exit-code contract as
`validate-knowledge-graph.ts`: duplicate asset IDs, duplicate concept_id
mapping, orphan assets, full coverage, Zod schema validation, prerequisite-
review-trigger sanity (each trigger must be a real KG ID).

Real output, all 5 subjects, this run:

```
mathematics:       908/908 covered — Duplicate IDs PASS, Duplicate concept_id PASS, Orphans PASS, Coverage PASS, Schema PASS, Trigger sanity PASS — Overall: PASS
physics:           194/194 covered — all 6 checks PASS — Overall: PASS
chemistry:         187/187 covered — all 6 checks PASS — Overall: PASS
biology:            89/89  covered — all 6 checks PASS — Overall: PASS
computer-science:  119/119 covered — all 6 checks PASS — Overall: PASS
```

Total: 1,497 KG concepts, 1,497 teaching assets, 100% coverage, 0 orphans, 0
duplicates, 0 schema failures across the entire platform.

## 4. Integration with the Existing Teaching Engine

`scripts/test-teaching-assets-integration.ts` proves the unmodified `decide()`
(`src/lib/teaching-engine/index.ts`) composes with the new asset layer
without any change to engine code. For 2 concepts per subject (10 total), it:
calls the existing `subjectKgAdapter` to build a `ConceptNode`, calls
unmodified `decide()`, looks up the concept's `TeachingAsset` via the new
adapter, and confirms the asset field a real consumer would render for that
`action_type` is present and non-empty. The asset layer is consulted strictly
*after* `decide()` returns — it never participates in the decision itself.

Real run output:

```
✓ math.found.mathematical-thinking     action_type:INTERACTIVE_QUESTIONING
✓ math.calc.derivative-definition      action_type:INTERACTIVE_QUESTIONING
✓ phys.mech.newtons-first-law          action_type:INTERACTIVE_QUESTIONING
✓ phys.qm.schrodinger-equation         action_type:STEP_BY_STEP_GUIDED
✓ chem.atomic.bohr-model               action_type:STEP_BY_STEP_GUIDED
✓ chem.org.iupac                       action_type:STEP_BY_STEP_GUIDED
✓ bio.found.what-is-biology            action_type:INTERACTIVE_QUESTIONING
✓ bio.cell.mitosis                     action_type:STEP_BY_STEP_GUIDED
✓ cs.found.intro-computers             action_type:INTERACTIVE_QUESTIONING
✓ cs.struct.binary-search-trees        action_type:STEP_BY_STEP_GUIDED

Integration proof: ALL PASS
```

`git diff` on `src/lib/teaching-engine/` for this work is empty — confirmed
zero changes to engine code.

## 5. Migration Strategy for All Five Subjects

No manual authoring was required to bring all 5 subjects onto the platform
(per the explicit instruction: generate reusable templates, not final
content). The migration was mechanical and identical for every subject:

1. Read `docs/{subject}/kg/graph.json` — the canonical, unmodified KG.
2. For every concept node, derive a placeholder `TeachingAsset` from
   structural fields only (`id`, `name`, `bloom`, `difficulty`, `requires`) —
   never from `description`, so no curriculum content is duplicated.
3. Set `prerequisite_review_triggers` to mirror the KG's own `requires` edges
   exactly (structural copy, not authored content) — guarantees the
   trigger-sanity check passes by construction.
4. Mark every generated field with a `[TEMPLATE]` tag and `status:
   "placeholder"` at both the asset and file level, making it unambiguous to
   any future author or consumer that this is scaffold, not lesson content.
5. Write `docs/{subject}/teaching-assets/assets.json` and register one line
   in `TEACHING_ASSET_ADAPTERS` (`src/lib/curriculum/teachingAssets.ts`).

This is the same incremental-adoption path any future subject takes — add the
KG, then run this one mechanical pass to scaffold its asset layer. No
adapter, schema, or engine code changes are needed per subject.

Per-subject migration counts (KG concepts → placeholder assets, 1:1):

| Subject | Concepts migrated |
|---|---|
| Mathematics | 908 |
| Physics | 194 |
| Chemistry | 187 |
| Biology | 89 |
| Computer Science | 119 |
| **Total** | **1,497** |

## 6. Production Readiness Checklist

- [x] Generic schema with zero subject-specific fields — verified by code
      inspection of `teachingAssetSchema.ts`.
- [x] Every KG concept across all 5 subjects has exactly one corresponding
      Teaching Asset — verified by validator coverage check (1,497/1,497).
- [x] No orphan assets (every `concept_id` resolves to a real KG node) —
      validator PASS, all 5 subjects.
- [x] No duplicate asset IDs, no duplicate concept_id mappings — validator
      PASS, all 5 subjects.
- [x] Full Zod schema validation — validator PASS, all 5 subjects, 0
      failures out of 1,497 assets.
- [x] Prerequisite-review-trigger referential integrity — validator PASS,
      all 5 subjects.
- [x] Existing Teaching Engine (`decide()`) remains byte-for-byte
      unmodified — confirmed via empty `git diff` on `src/lib/teaching-engine/`.
- [x] Asset layer is additive and independently loadable — `teachingAssets.ts`
      has no import relationship with `knowledgeGraph.ts` in either
      direction; confirmed by code inspection.
- [x] Integration proof: unmodified `decide()` + new asset adapter compose
      correctly across all 5 subjects — real script run, 10/10 PASS.
- [x] Incremental adoption supported: adapter returns `[]` (not a throw) for
      any subject without an assets file yet.
- [x] All generated content is explicitly tagged `[TEMPLATE]`/`placeholder`
      — no lesson content, explanations, or quizzes were generated, per the
      explicit task constraint.
- [ ] Authoring pass to replace `[TEMPLATE]` placeholders with real content
      — intentionally out of scope for this phase; this platform's job was
      the reusable infrastructure, not the content itself.

**Verdict: READY TO SHIP** (infrastructure phase). The Teaching Assets
Platform is structurally complete, fully validated, and proven to integrate
with the unmodified Teaching Engine for all 5 current subjects, with zero
architectural changes required to onboard a 6th subject in the future.
