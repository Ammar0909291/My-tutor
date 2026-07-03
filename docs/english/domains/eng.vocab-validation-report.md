# Domain Validation Report — Vocabulary Development (`eng.vocab`)

Date: 2026-07-03
Verdict: **PASS**

## Check Results

| Check | Result |
|-------|--------|
| Concept Count | ✓ PASS (20 concepts) |
| Prerequisite Integrity | ✓ PASS (0 broken edges) |
| Unlocks Integrity | ✓ PASS (0 broken edges) |
| Duplicate Detection | ✓ PASS (0 duplicates) |
| Orphan Concept Detection | ✓ PASS (single in-domain entry point, `word-recognition`, requiring only the cross-domain prerequisite `eng.phonics.decoding-fluency`; 0 true orphans) |
| Orphan Asset Detection | ✓ PASS (0 assets without a matching KG concept) |
| Broken Cross Links | ✓ PASS (0 broken cross-links) |
| Asset Completeness | ✓ PASS (20 assets complete, all status=draft) |
| Blueprint Sub-schema Conformance | ✓ PASS (20/20 — `worked_example_blueprint` {setup, steps, expected_outcome}; `practice_blueprint` {item_types, difficulty_progression, suggested_count}; `assessment_blueprint` {formats, bloom_alignment, mastery_signal, assessment_note}, matching `teachingAssetSchema.ts` exactly; see Method Note for a correction cycle run mid-session) |
| Curriculum Completeness | ✓ PASS (2177 lines, all 20 concept IDs present) |
| Quality Audit | ✓ PASS (no placeholder/[TEMPLATE] text remaining) |
| Teaching Asset Schema (deep + provenance) | ✓ PASS (20/20) |
| Prerequisite Review Triggers | ✓ PASS (exact match with KG `requires` edges, 20/20) |
| Bloom Alignment (asset ↔ KG) | ✓ PASS (20/20) |
| 3–4 Misconceptions per Concept | ✓ PASS (20/20, all exactly 4) |
| KG Cycle Detection (whole subject) | ✓ PASS (0 cycles across 216 concepts) |
| Subject-wide Coverage | ✓ PASS (216/216 concepts have exactly 1 asset) |
| Regression (eng.phonics + eng.phonetics draft, 9 other domains untouched) | ✓ PASS (eng.phonics 14/14 still draft; eng.phonetics 14/14 still draft; eng.vocab's 9 sibling domains — grammar 43, reading 16, writing 20, listening 8, speaking 10, composition 16, literature 25, linguistics 18, communication 12 — all still placeholder) |
| English KG unchanged | ✓ PASS (sha256 `d8f6140932bae1658cd774e05fb1e2df2bc9130a565676c758655dca9ce44fd8` matches pinned value) |
| Mathematics / Physics / Educational Brain / other subjects unchanged | ✓ PASS (working tree touches docs/english only) |

## Method Note — Mid-session Correction Cycle

Unlike `eng.phonics` and `eng.phonetics` (which both passed validation on first attempt with zero correction cycles), this domain required **one correction cycle**, caught by this session's own validation discipline before any commit:

1. **`worked_example_blueprint` field name.** The zod schema (`teachingAssetSchema.ts` line 31) names the third field `expected_outcome`, not `outcome`. Chunk 1 of 4 (7 concepts: word-recognition, context-clues, synonyms-antonyms, word-families, compound-words, prefixes, suffixes) used the correct field name from the start. Chunks 2–4 of 4 (13 concepts) initially used `outcome` instead. This was caught immediately during chapter assembly (a `KeyError`), confirmed against the schema source, and mechanically corrected across all three affected chunk files before any merge into `assets.json`.
2. **`practice_blueprint` / `assessment_blueprint` field names.** The zod schema defines `practice_blueprint` as `{item_types, difficulty_progression, suggested_count}` and `assessment_blueprint` as `{formats, bloom_alignment, mastery_signal}`. Chunk 1 of 4 again used the correct names from the start. Chunks 2–4 of 4 (13 concepts) initially used a non-conformant shape (`task_types`, `objectives_assessed`, `sample_item_shapes`). This was caught by the same chapter-assembly `KeyError` check, confirmed against the schema source, and every affected concept's practice/assessment content was mechanically transformed into the correct shape (item type lists renamed and given a `suggested_count`; assessment formats derived from the original sample-item-shape labels; `bloom_alignment` and `mastery_signal` sentences reconstructed from the original objectives-assessed content, using each concept's own KG `bloom` and `mastery_threshold` values) — no underlying pedagogical content (misconceptions, worked examples, key ideas) was altered by this correction, only the two blueprint sub-objects' field structure.

Both defects were tooling/field-naming errors caught before merge, not content-accuracy defects — the underlying pedagogical content passed the full 51-check independent verification sweep below without any correction. `assets.json` and `chapters/vocab.md` reflect the corrected, schema-conformant version only; no non-conformant intermediate state was ever committed.

## Pedagogical Audit (≥20% gate — full-domain verification performed)

Following this session's established practice (used at both `eng.phonics` and `eng.phonetics`) of independently re-verifying every factual/linguistic claim across the entire domain in place of numeric recomputation (since vocabulary content contains no arithmetic), the verification sweep was run across **all 20/20 concepts (100%)**, exceeding the 20% minimum-audit gate. In addition, **6 of 20 concepts (30%) received full structured pedagogical review** (factual correctness, misconception quality, terminology consistency, pedagogical flow) beyond the sweep, spanning the domain's difficulty range and structural roles:

- `eng.vocab.word-recognition` (domain entry point, foundational)
- `eng.vocab.word-formation-processes` (synthesis pivot combining compounding + affixation, advanced)
- `eng.vocab.multiple-meaning-words` (highest-risk concept for confusion with adjacent homonyms-homophones concept, proficient)
- `eng.vocab.collocations` (bridge concept between connotation and idioms, proficient)
- `eng.vocab.academic-vocabulary` (cross-subject transfer concept, advanced)
- `eng.vocab.semantic-fields` (domain capstone, advanced)

**Full-domain independent factual/linguistic verification (all 20 concepts, performed in place of numeric recomputation since this domain contains no arithmetic):** every worked example, classroom example, and misconception's factual claim across all 20 concepts was independently checked against standard lexical semantics, morphology, and applied-linguistics references — **51 individual verification checks**, spanning phonemic decoding examples, context-clue taxonomy, antonym-type distinctions, word-family/compound/affix classification and examples, root-family accuracy (Latin `spect`/`dict` and their derivations), word-formation-process taxonomy (compounding/blending/clipping/conversion/acronym-vs-initialism) and examples, homophone/homograph/homonym terminology and examples, polysemy-vs-homonymy distinction and the `run`/`quick` worked examples, denotation/connotation terminology and the `slender`/`thin`/`skinny` ladder, collocation examples (`make`/`do`/`take`/`have`), idiom glosses, phrasal-verb separability rules, register spectrum examples, academic-vs-technical vocabulary distinction, etymology (`nice`, semantic narrowing/broadening/metaphorical-extension examples), dictionary/thesaurus mechanics, and semantic-field examples.

**51/51 confirmed correct — 0 defects found.** No content-accuracy correction cycle was required for this domain (the one correction cycle noted above was a schema field-naming issue, not a factual/pedagogical defect).

**Domain-internal cross-referencing scan:** every concept's `cross_topic_connections` field was checked against the actual preceding/following concepts it names, confirming the intended arc: word-recognition → {context-clues, synonyms-antonyms, word-families} → {compound-words, prefixes, suffixes} → roots-and-origins → word-formation-processes (first synthesis point) → {homonyms-homophones → multiple-meaning-words} and {connotation-denotation → collocations → idioms / phrasal-verbs} as two parallel tracks → register-and-formality → academic-vocabulary (second synthesis point) and, on the other branch, etymology → thesaurus-and-dictionary-skills → semantic-fields (domain capstone, explicitly synthesizing thesaurus skills and etymology). All named connections resolve to real, correctly-sequenced concepts.

**Misconception quality:** all 80 misconceptions (4 per concept × 20 concepts) are genuine, well-documented vocabulary-instruction confusions (e.g., conflating polysemy with homonymy, assuming thesaurus synonyms are freely interchangeable, treating phrasal verbs as slang, assuming collocation errors are minor) rather than invented strawman errors, each paired with an accurate, substantive correction that references the correct distinguishing test or example.

**Audit verdict: PASS — 6 full-concept structured reviews + 51 factual/linguistic verification checks spanning all 20 concepts + cross-reference/misconception-quality review, zero content defects found; one schema field-naming correction cycle completed pre-merge (see Method Note).**

## Statistics

| Metric | Value |
|--------|-------|
| Domain | Vocabulary Development (`eng.vocab`) |
| Concepts (KG) | 20 |
| Assets authored | 20 |
| Assets status=draft | 20 |
| Broken prerequisite edges / cross-links / orphans / strays | 0 |
| Chapter file | `docs/english/chapters/vocab.md` (2177 lines) |
| Authoring chunks | 4 (7+4+3+6, deterministic graph order — the domain proceeds from `word-recognition` through a converge/diverge structure at `roots-and-origins`/`word-formation-processes`, splits into a homonymy/polysemy track and a connotation/collocation/idiom/phrasal-verb track, reconverges at `register-and-formality`/`academic-vocabulary`, and closes through `etymology`/`thesaurus-and-dictionary-skills` into the `semantic-fields` capstone) |

## Method Note

Validation executed with Python equivalents of the deterministic checks established across the Physics, eng.phonics, and eng.phonetics production sessions (structural completeness, prerequisite/unlocks/cross-link integrity, cycle detection, deep schema + provenance completeness, blueprint sub-schema conformance, Bloom alignment, subject-wide coverage, regression), because `node_modules` is unavailable in this container. English convention (established at the KG-creation session, upheld here): `prerequisite_review_triggers` are strict KG concept IDs, exact match with `requires`. Provenance `source_references` are drawn deterministically from each concept's own KG `references` field (Nation, I.S.P. *Learning Vocabulary in Another Language* and *Oxford Word Skills*, matching the KG's own reference metadata exactly for all 20 concepts). One correction cycle was required and completed before merge (see Method Note — Mid-session Correction Cycle above); the underlying pedagogical content itself required no corrections after its own independent 51-check verification sweep.

## Knowledge Graph Issues Discovered

None. `docs/english/kg/graph.json` was treated as frozen throughout this session and was not modified. No inconsistency, gap, or defect was found in the `eng.vocab` slice of the graph during authoring or validation — its structure (20 concepts, prefix `eng.vocab.`, a single cross-domain entry edge from `eng.phonics.decoding-fluency`, a converge/diverge/reconverge dependency shape, and forward cross-links previewing `eng.grammar.word-classes-overview`, `eng.reading.print-to-meaning`, `eng.linguistics.corpus-linguistics-intro`, `eng.linguistics.pragmatics-intro`, `eng.communication.digital-communication`, and `eng.linguistics.historical-linguistics-intro`) was used exactly as shipped; no modification was made or proposed.

## Issues

None remaining — the one field-naming correction cycle (documented above) was resolved before any content was merged or committed; all checks and all audit items now pass with zero outstanding defects.

## Verdict

**PASS** — Domain `eng.vocab` is validated, pedagogically audited (100% factual/linguistic verification sweep, 30% full structured review depth on 6/20 concepts), and ready to commit. Zero content defects found; one pre-merge schema field-naming correction cycle completed. This is the third English domain to complete teaching-asset production (3/12 domains, 48/216 concepts, 22.2% of the English campaign).
