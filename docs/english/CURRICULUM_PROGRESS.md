# English Curriculum Production — Progress Tracker

*Source of truth for all sessions. Do not rely on conversation memory.*

## Branch
`claude/my-tutor-foundation-KDSUO` — the canonical working branch, shared
with the Mathematics and Physics production campaigns. Do NOT touch
Mathematics or Physics files from an English session, and vice versa.

## Status: TEACHING ASSET PRODUCTION IN PROGRESS — 1/12 domains complete

## Latest Commit (update after each session)
`PENDING` — feat(english): author Foundational Literacy & Phonics domain (eng.phonics, 14 concepts)

## Knowledge Graph
| File | Concepts | Domains | Status |
|------|----------|---------|--------|
| `docs/english/kg/graph.json` | 216 | 12 | v1.0.0, production (treated as FROZEN, read-only from this point forward) |

**Do not modify `graph.json`** except through an explicit, deliberate,
versioned revision (v1.1.0+) — the same freeze discipline applied to the
Mathematics and Physics KGs applies here. Schema: the **Mathematics/Physics
15-field schema** (`id, name, aliases, parent, children, requires, unlocks,
related, cross_links, description, difficulty, estimated_hours, bloom,
mastery_threshold, references`) — NOT Biology's stricter 10-field schema.
See `docs/english/RESEARCH_AND_DESIGN.md` for the full comparative-research
rationale (CEFR, Cambridge, Oxford, British Council, NCERT/ICSE/CBSE,
Common Core, Australian Curriculum, Singapore MOE, university
English/Linguistics) and `docs/english/VALIDATION_REPORT.md` for the full
validation record.
English KG sha256: see `docs/english/kg/graph.json`'s manifest entry in
`docs/CANONICAL_CURRICULUM_MANIFEST.json` (regenerated each session via
`scripts/pipeline/generate-canonical-manifest.py`).

## Domain Structure (12 domains, strict topological order)

| # | Domain | ID Prefix | Concepts | Asset Status | Chapter File | Notes |
|---|--------|-----------|----------|--------------|--------------|-------|
| 01 | Foundational Literacy & Phonics | eng.phonics | 14 | draft ✓ | chapters/phonics.md ✓ | Complete — entry point (2 roots) |
| 02 | Pronunciation & Phonetics | eng.phonetics | 14 | placeholder | — | **NEXT** |
| 03 | Vocabulary Development | eng.vocab | 20 | placeholder | — | |
| 04 | Grammar & Syntax | eng.grammar | 43 | placeholder | — | Largest domain |
| 05 | Reading | eng.reading | 16 | placeholder | — | |
| 06 | Writing | eng.writing | 20 | placeholder | — | |
| 07 | Listening | eng.listening | 8 | placeholder | — | Smallest domain |
| 08 | Speaking | eng.speaking | 10 | placeholder | — | |
| 09 | Composition & Rhetoric | eng.composition | 16 | placeholder | — | Pre-university layer |
| 10 | Literature Fundamentals | eng.literature | 25 | placeholder | — | |
| 11 | Linguistics Foundations | eng.linguistics | 18 | placeholder | — | Survey level only |
| 12 | Advanced Communication | eng.communication | 12 | placeholder | — | Capstone domain |

**Summary:** 1/12 domains complete · 14/216 assets drafted · 202/216 remaining (6.5%)

## Completed Concepts Per Domain

### eng.phonics (14 concepts) — COMPLETE
All 14 concepts authored: print-concepts, phonemic-awareness,
alphabet-recognition, rhyming, blending-segmenting,
letter-sound-correspondence, consonants, short-vowels, consonant-blends,
digraphs, long-vowels-silent-e, sight-words, syllable-types,
decoding-fluency
(2 chunks: 7+7, deterministic graph order — a converge-branch-reconverge
dependency structure pivoting at letter-sound-correspondence and
culminating at decoding-fluency. Pedagogical audit: 5/14 concepts fully
audited (35.7%) spanning root/pivotal/high-risk/irregular/capstone
concept roles + full-domain phonetic/orthographic verification sweep
(60 checks, every worked example's phonetic/orthographic claims
independently verified before commit per this session's requirement) —
PASS, 0 defects found; see eng.phonics-validation-report.md.)

## Workflow (mirrors Physics exactly, once teaching-asset production begins)

1. **Extract domain slice** — filter `graph.json` concepts by `eng.{prefix}.`
2. **Author chunks** — `chunk-output-XX.json` files, each an array of
   `{concept_id, asset: {10 authorable TeachingAssetSchema fields},
   chapter_extra: {vocabulary, teacher_notes, student_notes,
   common_mistakes, cross_topic_connections, revision_guidance}}`.
3. **Deterministic merge** — into a new `docs/english/teaching-assets/assets.json`
   (does not yet exist — create it as a full placeholder scaffold, one
   entry per KG concept at `status: placeholder`, the first time teaching-asset
   production begins, mirroring `docs/physics/teaching-assets/assets.json`'s
   original structure before any domain was drafted).
4. **Deterministic assembly** — render `chapters/{prefix}.md` per domain.
5. **Validate** — Python equivalents of `scripts/validate-teaching-assets.ts`
   plus the domain-level report checks (count/prereq/unlocks/duplicates/
   orphans/cross-links/completeness/quality/cycle detection/deep
   schema/bloom alignment) + regression checks that previously drafted
   domains and the KG (sha256) are untouched.
6. **Domain artifacts** — write `domains/eng.{prefix}-validation-report.md`,
   `-summary.md`, `-manifest.json` (with sha256 checksums).
7. **Update this file**, commit, push to `claude/my-tutor-foundation-KDSUO`.
   One domain per session turn, then STOP (same discipline as Physics).

## Runtime Integration (NOT performed this session — explicit follow-up)

English is not yet wired into `src/lib/curriculum/knowledgeGraph.ts`. When
approved, integration requires exactly 3 additions (identical pattern to
Biology's integration, see `docs/biology/VALIDATION_REPORT.md` §5):

1. `SUBJECT_ADAPTERS.english = createSubjectAdapter('english')`
2. `ID_PREFIX_TO_SUBJECT.eng = 'english'`
3. 12 `domainLabel()` entries for the qualified `eng.*` domain keys

Zero new adapter, validator, or Teaching Engine code required — the
generic platform already supports this pattern for Physics, Chemistry,
Biology, and Computer Science.

## Build Verification Notes

- `node_modules` absent in this container (same limitation as recorded in
  the Mathematics/Physics trackers). The Knowledge Graph validator run
  this session was a documented Python port of
  `scripts/validate-knowledge-graph.ts`, deterministic and re-verifiable
  locally with the real TS script after `npm install`:
  `npx tsx scripts/validate-knowledge-graph.ts docs/english/kg/graph.json`.

## Session Resumption Checklist

1. `git fetch origin claude/my-tutor-foundation-KDSUO` and check out that branch
2. Read this file to determine the current domain and next unfinished chunk
3. Check `docs/english/teaching-assets/assets.json` (now exists, 216
   entries) — domains with `status: draft` are complete
4. Check `docs/english/chapters/` — present `.md` files are assembled and committed
5. Resume at the first domain with `status: placeholder` in the table above
6. Do NOT regenerate already-drafted assets (eng.phonics is done)
7. Do NOT modify `docs/english/kg/graph.json` without an explicit,
   deliberate version bump and user approval
8. Do NOT touch Mathematics, Physics, Chemistry, Biology, Computer
   Science, or the Educational Brain
9. Push ONLY to `claude/my-tutor-foundation-KDSUO`

## Next Planned Domain (after eng.phonics)

**eng.phonetics** — Pronunciation & Phonetics · 14 concepts. Rationale:
it is the only domain whose sole prerequisite (`eng.phonics.phonemic-
awareness`) is now satisfied and complete, following the same
deterministic topological-order progression used throughout the Physics
campaign — each domain is produced only once its upstream dependencies
are drafted.
