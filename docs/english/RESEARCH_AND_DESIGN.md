# Canonical English Knowledge Graph — Research & Design Rationale (V1)

*Build date: 2026-07-03 · Status: production (KG-only, teaching assets not started)*

## 1. Objective

Build a **universal canonical English Knowledge Graph** — not an
implementation of any single curriculum (CBSE, Cambridge, IELTS, TOEFL,
SAT, etc.) but a superset structure that every one of those curricula can
be generated *from*, by selecting a subset of concepts, remapping
difficulty bands to grade/level labels, and reordering for a specific
syllabus. This mirrors exactly how the Mathematics and Physics Knowledge
Graphs were built: one canonical, curriculum-agnostic concept graph,
consumed later by curriculum-specific "views."

## 2. Comparative Framework Research

Before designing the graph, the following authoritative frameworks were
compared for scope, sequencing, and terminology:

| Framework | What it covers | What it contributed to this design |
|---|---|---|
| **CEFR** (Common European Framework of Reference, Council of Europe) | Six proficiency bands (A1–C2) spanning listening, reading, spoken interaction, spoken production, and writing, described through "can-do" descriptors | The four-skill split (reading/writing/listening/speaking) as first-class domains, and the developing→proficient→advanced→expert difficulty progression, mirror CEFR's own low-to-high band structure; the CEFR Companion Volume is cited directly as a reference in `eng.vocab` and `eng.listening`/`eng.speaking` |
| **Cambridge English** (Cambridge Assessment English, Cambridge Grammar of English) | Graded qualifications (Starters through Proficiency/C2) built on CEFR, plus the descriptive Cambridge Grammar of English | Used to calibrate the internal ordering of `eng.grammar` (word classes → sentence basics → verb system → agreement/mechanics) and cited as a `eng.grammar` reference |
| **Oxford** (Oxford Word Skills, Oxford Guide to Effective Writing and Speaking) | Vocabulary-building progression and writing/speaking craft guidance | Informed the `eng.vocab` domain's word-formation → collocation → register progression, and the `eng.writing`/`eng.communication` process-writing sequence |
| **British Council** (LearnEnglish materials) | Skills-based teaching resources for reading, listening, grammar, vocabulary at all levels | Cross-checked domain skill lists for completeness (e.g., confirmed listening-for-gist vs. listening-for-detail as a standard distinction, now `eng.listening.listening-for-gist`/`listening-for-detail`) |
| **NCERT / CBSE / ICSE** (India) | School-level English syllabi (literacy → grammar → literature → composition) spanning Classes 1–12 | Grounded the foundational literacy sequence (`eng.phonics`) in NCERT's early-grade phonics/reading progression, and the `eng.grammar`/`eng.literature`/`eng.composition` domains in CBSE/ICSE's grammar-composition-literature three-way split, which this graph generalizes rather than replicates verbatim |
| **Common Core State Standards** (US) | K–12 English Language Arts standards: Reading, Writing, Speaking & Listening, Language | The Reading/Writing/Speaking-Listening/Language four-strand structure is the direct ancestor of this graph's `eng.reading`/`eng.writing`/`eng.listening`+`eng.speaking`/`eng.grammar`+`eng.vocab` domain split; cited throughout as a reference |
| **Australian Curriculum: English** | Three interrelated strands — Language, Literature, Literacy — taught across Foundation to Year 10 | Cross-checked to confirm `eng.literature` deserved status as a first-class domain (not a subordinate topic within reading), consistent with the Australian Curriculum's explicit "Literature" strand |
| **Singapore MOE English Language Syllabus** | Integrated skills approach across listening, reading, viewing, speaking, writing, representing, with strong grammar and vocabulary strands | Confirmed the value of keeping listening and speaking as separate domains from reading/writing (Singapore's syllabus treats all skill areas as co-equal, not reading/writing-dominant) |
| **University English/Linguistics curricula** (representative undergraduate programs) | Composition & Rhetoric, Literature (period/genre survey + criticism), and Linguistics (phonology, morphology, syntax, semantics, pragmatics, sociolinguistics, historical linguistics, psycholinguistics, applied linguistics) as separate majors/tracks | Directly informed the `eng.composition`, `eng.literature` (periods/criticism), and `eng.linguistics` domains, each capped at survey depth per this session's explicit "research topics receive only survey concepts" instruction — no concept assumes graduate-level specialization |

**Synthesis finding:** every framework surveyed decomposes English into
some combination of (a) foundational literacy/phonics, (b) the four
skills (reading, writing, listening, speaking), (c) a grammar/vocabulary
"language system" layer feeding all four skills, and (d) — at the upper
end — literature and/or linguistics as content domains built on top of
the skills layer. No framework fully separates rhetoric/composition from
general writing, or linguistics from grammar, at school level; both
splits become standard only at the pre-university/university level. This
graph therefore uses **12 domains** that collapse cleanly downward into
any K-12 framework's simpler skill groupings (e.g., a CBSE view could
merge `eng.composition` back into `eng.writing`, or a CEFR-only view could
drop `eng.literature`/`eng.linguistics` entirely for a general-English
track) while still supporting the university-level depth the "undergraduate
English/Linguistics" ceiling requires.

## 3. Depth Ceiling

Per the session's explicit instruction, depth is capped at approximately
**undergraduate English/Linguistics**. Concretely:

- `eng.linguistics` and the upper tiers of `eng.literature`/`eng.composition`
  use `difficulty: expert` or `research` **only as survey-level
  introductions** (`*-intro` concepts: e.g., `syntax-theory-intro`,
  `psycholinguistics-intro`, `literary-criticism-intro`) — no concept
  assumes a specific theoretical framework (e.g., no Chomskyan
  Minimalist Program, no specific critical school beyond a survey
  mention) that would require graduate-level specialization.
- `mastery_threshold` is lowered to `0.7` for `research`-difficulty survey
  concepts, matching the convention already established in the Physics KG
  (`phys.astro.dark-matter`, `phys.astro.gravitational-waves`) for
  research-frontier survey material.

## 4. Domain Structure (12 domains, 216 concepts)

Domains are listed in **strict topological order** — every cross-domain
`requires` edge points from a later domain to an earlier one, guaranteeing
the whole-graph `requires` DAG is acyclic by construction (verified
separately by DFS cycle detection; see `VALIDATION_REPORT.md`).

| # | Domain | Prefix | Concepts | Rationale |
|---|--------|--------|----------|-----------|
| 1 | Foundational Literacy & Phonics | `eng.phonics` | 14 | Pre-literacy through decoding fluency; the graph's true entry point (2 root nodes: print concepts, phonemic awareness) |
| 2 | Pronunciation & Phonetics | `eng.phonetics` | 14 | The physical/articulatory sound system, distinct from phonics' print-sound mapping |
| 3 | Vocabulary Development | `eng.vocab` | 20 | Word-level meaning, formation, and use, feeding grammar/reading/writing/speaking alike |
| 4 | Grammar & Syntax | `eng.grammar` | 43 | The largest domain (mirrors Classical Mechanics' role as Physics' largest domain) — parts of speech through mechanics and error correction |
| 5 | Reading | `eng.reading` | 16 | Comprehension strategies from literal understanding through source evaluation |
| 6 | Writing | `eng.writing` | 20 | Mechanics through the full writing process and essay form |
| 7 | Listening | `eng.listening` | 8 | Receptive oral skill, built on phonetics |
| 8 | Speaking | `eng.speaking` | 10 | Productive oral skill, built on phonetics and vocabulary |
| 9 | Composition & Rhetoric | `eng.composition` | 16 | Argumentation, rhetorical analysis, and academic/research writing — the pre-university/university layer above general writing |
| 10 | Literature Fundamentals | `eng.literature` | 25 | Narrative/poetic/dramatic elements through a survey of literary periods and criticism |
| 11 | Linguistics Foundations | `eng.linguistics` | 18 | Survey-level introduction to the scientific study of language (phonology through computational linguistics) |
| 12 | Advanced Communication | `eng.communication` | 12 | Capstone domain integrating academic, technical, business, media, and cross-cultural communication |

## 5. Concept Schema

Identical to the schema used by Mathematics and Physics (verified by
direct inspection of `docs/mathematics/kg/graph.json` and
`docs/physics/kg/graph.json` before designing this graph) — **not** the
newer stricter 10-field schema used by Biology, per this session's
explicit instruction to match "the exact same standards used for
Mathematics and Physics":

```
id, name, aliases, parent, children, requires, unlocks, related,
cross_links, description, difficulty, estimated_hours, bloom,
mastery_threshold, references
```

`domain` and `concept_type` are intentionally absent (derived at runtime
by `inferDomain()`/`inferConceptType()` in the generic
`subjectKgAdapter.ts`, exactly as for Physics/Mathematics/Biology).

## 6. Difficulty and Bloom Taxonomy

No new levels invented — the existing six-level difficulty taxonomy
(`foundational, developing, proficient, advanced, expert, research`) and
six-level Bloom taxonomy (`remember, understand, apply, analyze, evaluate,
create`) from Mathematics/Physics are reused exactly, preserving
cross-subject comparability (a `foundational` English concept and a
`foundational` Physics concept are calibrated to the same intended
learner readiness level).

## 7. What This Graph Is Not

- Not a CBSE, ICSE, Cambridge, IELTS, TOEFL, or SAT syllabus — those are
  downstream **views** to be generated later by selecting/reordering
  subsets of this graph, exactly as `docs/architecture` describes the
  Bible's planned board/grade curriculum-mapping view layer for other
  subjects.
- Not yet wired into the runtime adapter (`SUBJECT_ADAPTERS`,
  `ID_PREFIX_TO_SUBJECT` in `src/lib/curriculum/knowledgeGraph.ts`) or
  into any teaching-asset production — this session's explicit scope is
  KG-only, matching Physics' and Chemistry's own "kg-only" campaign
  status before their teaching-asset production began.
- Not exhaustive at the literary/linguistic frontier — per the explicit
  "research topics receive only survey concepts" instruction, advanced
  linguistics and literary-theory concepts are deliberately shallow
  (`*-intro` survey concepts), not full sub-curricula.
