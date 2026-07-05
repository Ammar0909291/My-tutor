# English Knowledge Graph — Validation Report

## Version: 1.0.0
## Date: 2026-07-03
## Status: PRODUCTION
## Platform: Generic Knowledge Graph / Generic Subject Adapter (shared with Mathematics, Physics, Chemistry, Biology, Computer Science)

## 1. Curriculum

English is the sixth flagship subject in the Canonical Curriculum
Production Pipeline (after Mathematics, Physics, Chemistry, Biology,
Computer Science) and the **third to actually begin production**, after
Mathematics (in progress) and Physics (100% complete). Unlike the other
five STEM subjects, English required original comparative research across
CEFR, Cambridge, Oxford, British Council, NCERT/ICSE/CBSE, Common Core,
the Australian Curriculum, Singapore MOE, and representative university
English/Linguistics curricula before design — see
`docs/english/RESEARCH_AND_DESIGN.md` for the full comparative analysis
and rationale. Coverage spans:

- Foundational Literacy & Phonics (print concepts through decoding fluency)
- Pronunciation & Phonetics (articulation through prosody)
- Vocabulary Development (word recognition through semantic fields)
- Grammar & Syntax (word classes through error correction — the largest domain)
- Reading (fluency through cross-genre synthesis)
- Writing (handwriting through creative forms)
- Listening (active listening through critical listening)
- Speaking (oral fluency through debate)
- Composition & Rhetoric (argumentation through academic writing conventions)
- Literature Fundamentals (narrative elements through comparative literature)
- Linguistics Foundations — survey level (phonology through computational linguistics)
- Advanced Communication (academic writing through professional/cross-cultural communication)

No new curriculum process was invented — this follows the identical
Curriculum → KG → Validation → Documentation checklist used for the KG-only
phase of Physics, Chemistry, Biology, and Computer Science.

## 2. Knowledge Graph

| Property | Value |
|---|---|
| File | `docs/english/kg/graph.json` |
| Schema | The **Mathematics/Physics 15-field schema**: `id, name, aliases, parent, children, requires, unlocks, related, cross_links, description, difficulty, estimated_hours, bloom, mastery_threshold, references` — **not** Biology's newer stricter 10-field schema, per this session's explicit instruction to match Mathematics/Physics standards exactly |
| Total concepts | 216 |
| ID prefix | `eng.` |
| Domains (qualified `eng.<key>`) | 12 |
| Root nodes | `eng.phonics.print-concepts`, `eng.phonics.phonemic-awareness` (2 roots, no prerequisites — matches the small-multi-root pattern used where a subject has more than one true starting skill, analogous to Physics having a single root but Mathematics/Chemistry having several) |
| `requires` edges | 274 |
| `unlocks` edges | 274 (exact inverse of `requires`, verified programmatically) |
| `cross_links` | 20 pairs (40 directed entries), verified bidirectional |
| `mastery_threshold` | {0.7, 0.75, 0.8, 0.85, 0.9} — same band structure as Physics/Biology, extended with 0.85/0.9 for the highest-stakes foundational literacy concepts (mirrors Mathematics' use of a wider 0.35–0.95 range) |
| `estimated_hours` | 1–4 |

### Domain breakdown

| Domain | Label | Concepts |
|---|---|---|
| eng.phonics | Foundational Literacy & Phonics | 14 |
| eng.phonetics | Pronunciation & Phonetics | 14 |
| eng.vocab | Vocabulary Development | 20 |
| eng.grammar | Grammar & Syntax | 43 |
| eng.reading | Reading | 16 |
| eng.writing | Writing | 20 |
| eng.listening | Listening | 8 |
| eng.speaking | Speaking | 10 |
| eng.composition | Composition & Rhetoric | 16 |
| eng.literature | Literature Fundamentals | 25 |
| eng.linguistics | Linguistics Foundations | 18 |
| eng.communication | Advanced Communication | 12 |

### Difficulty distribution

| Difficulty | Count |
|---|---|
| foundational | 27 |
| developing | 52 |
| proficient | 47 |
| advanced | 58 |
| expert | 26 |
| research | 6 |

All six canonical difficulty levels are represented — same taxonomy as
Mathematics, Physics, Chemistry, Biology, and Computer Science, preserved
exactly (no new levels added). The `research` tier is deliberately small
(6 concepts: 4 in `eng.linguistics`, 2 in `eng.literature`), reflecting
this session's "research topics receive only survey concepts" instruction.

### Bloom distribution

| Bloom level | Count |
|---|---|
| remember | 11 |
| understand | 49 |
| apply | 76 |
| analyze | 44 |
| evaluate | 18 |
| create | 18 |

Unlike Biology (where `create` was entirely unused), English's productive
skill domains (`eng.writing`, `eng.speaking`, `eng.composition`) give
`create` meaningful representation (18 concepts) — an expected and
appropriate difference, since composition and speech production are
core to English in a way with no direct STEM-subject analogue.

## 3. Validation

Ran a Python port of the existing **generic, subject-agnostic** validator
(`scripts/validate-knowledge-graph.ts`), because `node_modules` is
unavailable in this container — the port mirrors all 9 checks and their
FAIL/WARN/INFO severity semantics exactly (see
`docs/english/kg/graph.json` alongside this report; the Python port itself
is not committed, consistent with every prior Physics-domain validation
session in this campaign, which also used documented Python equivalents
rather than committing throwaway validator scripts):

```
KNOWLEDGE GRAPH VALIDATOR
------------------------------------------------------------
subject:   Canonical English Knowledge Graph v1.0.0
concepts:  216
------------------------------------------------------------

  ✓ Duplicate concept IDs
  ✓ Broken edge references
  ✓ Disconnected nodes (no edges of any kind)
  ✓ Cycle detection (requires DAG)
  ✓ Reachability from root nodes
  ✓ Required field completeness
  ✓ Teaching Engine field compatibility
  ✓ Difficulty / Bloom enum validity
  ✓ Numeric field range sanity

------------------------------------------------------------
status:    PASS
failures:  none
warnings:  none
info:
  · Reachable: 216 / 216
  · Root nodes (2): eng.phonics.print-concepts, eng.phonics.phonemic-awareness
  · "domain" absent on 216 concept(s) — derived at runtime from ID prefix by adapter
  · "concept_type" absent on 216/216 concepts — inferred from bloom by adapter
  · 32 concept(s) use expert/research difficulty — valid extended difficulty levels
------------------------------------------------------------
```

**Clean PASS — zero failures, zero warnings** (an even cleaner result than
Biology's PASS_WITH_WARNINGS, because English's `REQUIRED_FIELDS` check
treats `domain` absence as fully derivable — every English concept ID has
≥3 dot-segments — so it degrades to INFO rather than WARN in this run; see
Check 6 semantics in `scripts/validate-knowledge-graph.ts`).

### Additional integrity checks (beyond the 9 generic checks)

Run independently to verify the manual graph-construction process:

| Check | Result |
|---|---|
| Self-loops (`id` appears in its own `requires`) | 0 |
| `cross_links` bidirectionality (every A→B pair has a matching B→A entry) | 0 violations — 20/20 pairs bidirectional |
| `unlocks` exactly the reverse of `requires` | 0 violations — 274/274 edges consistent |
| Duplicate entries within a single concept's `requires` list | 0 |
| Domain concept counts match the `domains[]` wrapper's declared `count` | 12/12 domains match exactly |
| Cross-domain `requires` edges point only to earlier-listed domains (topological order) | Verified by construction and confirmed by the cycle-detection check passing |

## 4. Knowledge Graph Issues Discovered

None — this is a newly authored KG, not an inherited one, so there is no
"issues discovered in existing content" category. All internal consistency
assertions in the generator script (`build_graph.py`, not committed —
throwaway generation tooling, mirroring how the Physics/Mathematics KGs
were themselves generated by one-time tooling) passed on first execution:
every `requires` reference resolved to a real concept ID, every
`cross_links` pair resolved to real concept IDs on both sides, and no
domain's internal concept chain produced an unintended cycle.

## 5. Integration

**None performed this session, by design.** Per this session's explicit
scope (Version 1 of the Knowledge Graph only — no teaching assets, no
runtime wiring), `src/lib/curriculum/knowledgeGraph.ts` and
`src/lib/curriculum/subjectKgAdapter.ts` were **not modified**. English is
therefore not yet reachable through `getKnowledgeGraph('english')` or any
other runtime API — it exists purely as validated, documented data under
`docs/english/`, exactly matching Physics' and Chemistry's own "kg-only"
campaign status (see `docs/CANONICAL_CURRICULUM_MANIFEST.json`) before
their own teaching-asset production began.

The generic-adapter pattern already proven for Biology (3 registry lines:
one `SUBJECT_ADAPTERS.english` entry, one `ID_PREFIX_TO_SUBJECT.eng` entry,
and `domainLabel()` entries for the 12 qualified `eng.*` domain keys — see
`docs/biology/VALIDATION_REPORT.md` §5 for the exact precedent) is
available as a low-risk follow-up whenever the user explicitly approves
runtime integration; it requires zero new adapter, validator, or Teaching
Engine code, identical to every prior subject's integration.

## 6. Production Checklist

- [x] 15-field Mathematics/Physics-standard schema used exactly (not Biology's stricter 10-field schema)
- [x] All IDs prefixed `eng.`
- [x] Difficulty taxonomy preserved exactly (foundational/developing/proficient/advanced/expert/research)
- [x] Bloom taxonomy preserved exactly (remember/understand/apply/analyze/evaluate/create)
- [x] 0 duplicate IDs, 0 broken `requires`/`unlocks` edges, 0 cycles, 216/216 reachable from 2 roots
- [x] Generic validator (Python port of `validate-knowledge-graph.ts`) passes clean — 0 failures, 0 warnings
- [x] `unlocks` verified as the exact inverse of `requires`; `cross_links` verified bidirectional
- [x] Comparative research documented across CEFR, Cambridge, Oxford, British Council, NCERT/ICSE/CBSE, Common Core, Australian Curriculum, Singapore MOE, and university English/Linguistics curricula (`RESEARCH_AND_DESIGN.md`)
- [x] Depth capped at approximately undergraduate English/Linguistics; research-tier concepts are survey-only
- [x] No teaching assets authored (out of scope this session)
- [x] No runtime/adapter/route/schema files modified (out of scope this session)
- [x] Mathematics, Physics, Educational Brain, and all other subjects untouched

**Verdict: PASS — Version 1 of the Canonical English Knowledge Graph is
validated and ready to commit as a KG-only subject.** Teaching-asset
production and runtime integration are explicitly deferred to future
sessions per this session's scope.
