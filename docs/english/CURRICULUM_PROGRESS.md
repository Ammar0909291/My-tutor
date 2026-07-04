# English Curriculum Production — Progress Tracker

*Source of truth for all sessions. Do not rely on conversation memory.*

## Branch
`claude/my-tutor-foundation-KDSUO` — the canonical working branch, shared
with the Mathematics and Physics production campaigns. Do NOT touch
Mathematics or Physics files from an English session, and vice versa.

## Status: TEACHING ASSET PRODUCTION IN PROGRESS — 9/12 domains complete

## Latest Commit (update after each session)
`e70a3a7` — feat(english): author Composition & Rhetoric domain (eng.composition, 16 concepts)

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
| 02 | Pronunciation & Phonetics | eng.phonetics | 14 | draft ✓ | chapters/phonetics.md ✓ | Complete — RP convention |
| 03 | Vocabulary Development | eng.vocab | 20 | draft ✓ | chapters/vocab.md ✓ | Complete |
| 04 | Grammar & Syntax | eng.grammar | 43 | draft ✓ | chapters/grammar.md ✓ | Complete — largest domain |
| 05 | Reading | eng.reading | 16 | draft ✓ | chapters/reading.md ✓ | Complete |
| 06 | Writing | eng.writing | 20 | draft ✓ | chapters/writing.md ✓ | Complete |
| 07 | Listening | eng.listening | 8 | draft ✓ | chapters/listening.md ✓ | Complete — smallest domain |
| 08 | Speaking | eng.speaking | 10 | draft ✓ | chapters/speaking.md ✓ | Complete |
| 09 | Composition & Rhetoric | eng.composition | 16 | draft ✓ | chapters/composition.md ✓ | Complete — pre-university layer |
| 10 | Literature Fundamentals | eng.literature | 25 | placeholder | — | **NEXT** |
| 11 | Linguistics Foundations | eng.linguistics | 18 | placeholder | — | Survey level only |
| 12 | Advanced Communication | eng.communication | 12 | placeholder | — | Capstone domain |

**Summary:** 9/12 domains complete · 161/216 assets drafted · 55/216 remaining (74.5%)

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

### eng.phonetics (14 concepts) — COMPLETE
All 14 concepts authored: speech-sounds-overview, articulation-organs,
consonant-sounds, vowel-sounds, ipa-basics, minimal-pairs,
syllable-stress, sentence-stress, intonation-patterns, connected-speech,
rhythm-and-timing, accents-and-dialects, phonetic-transcription, prosody
(2 chunks: 4+10, deterministic graph order — converges at ipa-basics
after parallel consonant/vowel classification systems, then a mostly
linear stress→intonation→connected-speech→rhythm→accents chain to the
phonetic-transcription/prosody capstone pair. Uses Received Pronunciation
(RP, non-rhotic British English per Roach's textbook, this domain's own
cited reference) as its consistent phonetic-notation convention,
explicitly distinct from eng.phonics' American-English conventions — see
the note at the top of chapters/phonetics.md. Pedagogical audit: 100%
phonetic/IPA/articulation/stress/pronunciation verification sweep across
all 14 concepts (42 checks, independently verified against Roach's RP
framework in place of numeric recomputation per this session's explicit
instruction) + 5/14 concepts (35.7%) full structured review — PASS, 0
defects found; see eng.phonetics-validation-report.md.)

### eng.vocab (20 concepts) — COMPLETE
All 20 concepts authored: word-recognition, context-clues, synonyms-antonyms,
word-families, compound-words, prefixes, suffixes, roots-and-origins,
word-formation-processes, homonyms-homophones, multiple-meaning-words,
connotation-denotation, collocations, idioms, phrasal-verbs,
register-and-formality, academic-vocabulary, etymology,
thesaurus-and-dictionary-skills, semantic-fields
(4 chunks: 7+4+3+6, deterministic graph order — a converge/diverge/reconverge
structure pivoting at roots-and-origins/word-formation-processes, splitting
into a homonymy/polysemy track and a connotation/collocation/idiom/
phrasal-verb track, reconverging at register-and-formality/
academic-vocabulary, and closing through etymology/thesaurus-skills into the
semantic-fields capstone. One pre-merge correction cycle: 13/20 concepts
initially used non-schema-conformant field names for the worked-example,
practice, and assessment blueprints (e.g. `outcome` instead of
`expected_outcome`); caught during chapter assembly, corrected mechanically
before any merge — not a content-accuracy defect. Pedagogical audit: 100%
factual/linguistic verification sweep across all 20 concepts (51 checks,
0 content defects found) + 6/20 concepts fully audited (30%) spanning
entry-point/synthesis-pivot/high-risk/bridge/cross-subject/capstone concept
roles — PASS; see eng.vocab-validation-report.md.)

### eng.grammar (43 concepts) — COMPLETE
All 43 concepts authored: word-classes-overview, nouns, pronouns, verbs,
adjectives, adverbs, prepositions, conjunctions, interjections,
articles-and-determiners, subject-and-predicate, word-order,
sentence-types-by-function, question-formation, negation, phrases, clauses,
simple-sentences, compound-sentences, complex-sentences, sentence-combining,
present-tenses, past-tenses, future-tenses, tense-consistency, modals,
conditionals, active-and-passive-voice, direct-and-indirect-speech,
gerunds-and-infinitives, participles-and-participial-phrases,
subject-verb-agreement, pronoun-antecedent-agreement,
comparatives-and-superlatives, parallel-structure, capitalization-rules,
end-punctuation, comma-usage, apostrophes, quotation-marks,
colons-semicolons-dashes, sentence-fragments,
run-on-sentences-and-comma-splices
(7 chunks: 6+6+6+6+6+6+7, deterministic graph order — the domain's largest,
proceeding from the 8 word-class concepts through subject-predicate/
word-order, the sentence-type/phrase-clause branch, the simple/compound/
complex sentence sequence, the full tense/voice/speech-reporting system,
agreement and comparison, and closing through the capitalization/
punctuation/mechanics sequence culminating in the fragment/run-on capstone
pair. Zero pre-merge correction cycles required — the correct schema field
names were used from the start, applying the lesson learned from
eng.vocab's mid-session field-naming fix. Pedagogical audit: 100%
grammatical-accuracy verification sweep across all 43 concepts (45 checks,
0 defects found) + 8/43 concepts fully audited (18.6%) spanning entry-
point/pivotal/highest-load-bearing/tense-system-opener/highest-complexity/
highest-frequency-error/advanced-synthesis/capstone concept roles — PASS;
see eng.grammar-validation-report.md.)

### eng.reading (16 concepts) — COMPLETE
All 16 concepts authored: print-to-meaning, reading-fluency,
literal-comprehension, main-idea-and-details, inference-in-reading,
summarizing, predicting-and-confirming, text-structure, genre-recognition,
authors-purpose-and-tone, compare-and-contrast-texts, skimming-and-scanning,
close-reading, critical-reading, evaluating-sources, reading-across-genres
(3 chunks: 5+4+7, deterministic graph order — the domain proceeds from the
print-to-meaning bridging concept (Simple View of Reading) through fluency
and literal comprehension into the main-idea/inference branch, splits into
a summarizing/text-structure/genre track and a prediction/purpose-tone
track, reconverges at compare-and-contrast-texts, and closes through the
skimming-scanning/close-reading/critical-reading/evaluating-sources
sequence into the reading-across-genres capstone. Zero pre-merge
correction cycles required. Pedagogical audit: 100% full-concept
structured review (16/16, given the domain's smaller size) + 18
independent verification checks against standard reading-science
references, 0 defects found — PASS; see eng.reading-validation-report.md.)

### eng.writing (20 concepts) — COMPLETE
All 20 concepts authored: handwriting-and-formation, spelling-strategies,
sentence-writing, paragraph-structure, topic-sentences, supporting-details,
transitions-and-cohesion, narrative-writing, descriptive-writing,
expository-writing, persuasive-writing-basics, the-writing-process,
outlining-and-planning, drafting, revising-for-content,
editing-and-proofreading, essay-structure, thesis-statements,
citations-and-referencing, creative-writing-forms
(4 chunks: 6+5+5+4, deterministic graph order — the domain proceeds from
the handwriting/spelling motor-and-encoding foundation through the
sentence→paragraph composition sequence, splits at transitions-and-cohesion
into the four writing-purpose branches (narrative/descriptive/expository/
persuasive), runs the five-stage recursive writing-process sequence, and
closes through the essay-structure/thesis/citations academic capstone
alongside the creative-writing-forms creative capstone. The domain's
signature design: reading-domain skills mirrored in productive form
(main-idea→paragraph-unity, calibration test→topic-sentences/thesis,
signal words→transitions). Zero pre-merge correction cycles required.
Pedagogical audit: 100% verification sweep across all 20 concepts (22
checks, 0 defects found) + 7/20 concepts fully audited (35%) — PASS;
see eng.writing-validation-report.md.)

### eng.listening (8 concepts) — COMPLETE
All 8 concepts authored: active-listening, listening-for-gist,
listening-for-detail, distinguishing-sounds-in-speech,
following-instructions, note-taking-while-listening,
listening-comprehension-strategies, critical-listening
(1 chunk: all 8, deterministic graph order — active-listening entry (from
eng.phonetics.prosody), the gist/detail strategy pair mirroring reading's
skim/scan, the sound-discrimination precision branch (from minimal-pairs,
with the can/can't relocated-cue analysis), the applied instructions/
note-taking pair, the metacognitive predict/infer/monitor convergence, and
the critical-listening capstone porting critical-reading's framework to
speech. Zero pre-merge correction cycles. Pedagogical audit: 100% full
structured review (8/8) + 17 verification checks, 0 defects — PASS; see
eng.listening-validation-report.md.)

### eng.speaking (10 concepts) — COMPLETE
All 10 concepts authored: oral-fluency, pronunciation-in-conversation,
conversation-skills, asking-and-answering-questions, storytelling-orally,
discussion-skills, public-speaking-basics, presentation-skills,
debate-skills, non-verbal-communication
(2 chunks: 5+5, deterministic graph order — the fluency/pronunciation
production foundation (flipping phonetics receptive→productive), the
conversation-skills interactional pivot, the question/discussion/
public-speaking/presentation chain to the debate capstone (whose rebuttal
engine is critical-listening's claim-tracking, per the KG cross-link),
with storytelling and non-verbal communication as parallel branches.
Includes the correct debunking of the Mehrabian '93% nonverbal' myth.
Zero pre-merge correction cycles. Pedagogical audit: 100% full
structured review (10/10) + 17 verification checks, 0 defects — PASS;
see eng.speaking-validation-report.md.)

### eng.composition (16 concepts) — COMPLETE
All 16 concepts authored: audience-and-purpose, claim-evidence-reasoning,
argumentation-basics, counterargument-and-rebuttal, logical-fallacies,
rhetorical-appeals, rhetorical-devices, figurative-language-in-composition,
style-voice-and-tone, persuasive-techniques, rhetorical-analysis,
comparative-essay-writing, research-paper-writing,
academic-writing-conventions, plagiarism-and-citation-ethics,
editing-for-style
(3 chunks: 6+5+5, deterministic graph order — the audience-and-purpose
gateway, parallel argumentation (claim-evidence-reasoning →
argumentation-basics → counterargument/fallacies) and appeals
(ethos-pathos-logos → devices → figurative language → style-voice-tone)
tracks, converging at persuasive-techniques and rhetorical-analysis, then
the academic capstone chain (comparative essay, research paper, academic
conventions, citation ethics, editing-for-style). Grounded in the KG's own
cited references (Aristotle's Rhetoric, Corbett & Connors); Toulmin's
warrant, Howard's patchwriting, and the Fowler/Williams style tradition
all correctly attributed. Zero pre-merge correction cycles. Pedagogical
audit: 100% full structured review (16/16) + 20 verification checks,
0 defects — PASS; see eng.composition-validation-report.md.)

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
6. Do NOT regenerate already-drafted assets (eng.phonics and eng.phonetics are done)
7. Do NOT modify `docs/english/kg/graph.json` without an explicit,
   deliberate version bump and user approval
8. Do NOT touch Mathematics, Physics, Chemistry, Biology, Computer
   Science, or the Educational Brain
9. Push ONLY to `claude/my-tutor-foundation-KDSUO`

## Next Planned Domain (after eng.composition)

**eng.literature** — Literature Fundamentals · 25 concepts (the largest
remaining domain). Rationale: it is next in the domain's established
topological production order (... → composition → literature → ...), and
its cross-domain prerequisites are satisfied by the completed reading and
writing domains.
