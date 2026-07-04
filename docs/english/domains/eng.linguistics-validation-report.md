# Domain Validation Report — Linguistics Foundations (`eng.linguistics`)

Date: 2026-07-04
Verdict: **PASS**

## Check Results

| Check | Result |
|-------|--------|
| Concept Count | ✓ PASS (18 concepts) |
| Prerequisite Integrity | ✓ PASS (0 broken edges) |
| Unlocks Integrity | ✓ PASS (0 broken edges) |
| Duplicate Detection | ✓ PASS (0 duplicates) |
| Orphan Concept Detection | ✓ PASS (single in-domain entry point, `what-is-linguistics`, requiring only the cross-domain prerequisites `eng.grammar.sentence-combining` and `eng.phonetics.prosody`; several later concepts additionally enter via cross-domain edges from vocab/phonetics; 0 true orphans) |
| Orphan Asset Detection | ✓ PASS (0 assets without a matching KG concept) |
| Broken Cross Links | ✓ PASS (0 broken; all outbound cross-links — `semantics-intro`→`eng.grammar.conditionals`, `pragmatics-intro`→`eng.vocab.idioms`, `sociolinguistics-intro`→`eng.phonetics.accents-and-dialects`, `historical-linguistics-intro`→`eng.vocab.etymology`, `corpus-linguistics-intro`→`eng.vocab.collocations`, `computational-linguistics-intro`→`eng.communication.digital-communication` — resolve to real concepts) |
| Asset Completeness | ✓ PASS (18 assets complete, all status=draft, version 1.1.0) |
| Blueprint Sub-schema Conformance | ✓ PASS (18/18, correct field names from the start) |
| Curriculum Completeness | ✓ PASS (2046 lines, all 18 concept IDs present) |
| Quality Audit | ✓ PASS (no placeholder/[TEMPLATE] text remaining) |
| Teaching Asset Schema (deep + provenance) | ✓ PASS (18/18; provenance pins kg_commit d298f09, generation_commit 8e87b3f) |
| Prerequisite Review Triggers | ✓ PASS (exact match with KG `requires` edges, 18/18) |
| 3–4 Misconceptions per Concept | ✓ PASS (18/18, all exactly 4 — 72 total) |
| KG Cycle Detection (whole subject) | ✓ PASS (0 cycles; 216/216 concepts topologically sorted) |
| Subject-wide Coverage | ✓ PASS (216/216 concepts have exactly 1 asset) |
| Regression (10 completed domains draft, 1 domain untouched) | ✓ PASS (phonics 14, phonetics 14, vocab 20, grammar 43, reading 16, writing 20, listening 8, speaking 10, composition 16, literature 25 all still draft; communication 12 still placeholder — 12 placeholders remaining) |
| English KG unchanged | ✓ PASS (sha256 `d8f6140932bae1658cd774e05fb1e2df2bc9130a565676c758655dca9ce44fd8` matches pinned value) |
| Mathematics / Physics / Educational Brain / other subjects unchanged | ✓ PASS (working tree touches docs/english only) |

## Method Note

Zero pre-merge correction cycles — correct schema field names from the first chunk, continuing the established practice. Authored in 4 chunks (5+5+4+4), strict KG topological order.

## Pedagogical Audit (≥20% gate — full-domain verification performed)

The independent verification sweep covered **all 18/18 concepts (100%)** — **24 individual verification checks** against general-linguistics, phonology, acquisition, sociolinguistics, historical-linguistics, and computational references (the domain's own cited references: Fromkin, Rodman & Hyams' *An Introduction to Language*; Yule's *The Study of Language*). Highlights:

- Hockett's design features (arbitrariness, duality of patterning, productivity, displacement) correctly attributed and characterized; the descriptive/prescriptive stance and the adjective-ordering unconscious-rule demonstration are standard introductory content.
- The phoneme/allophone architecture verified: English aspiration ([pʰ]/[p], [kʰ]/[k]) as allophonic with complementary distribution; the Hindi minimal pair /kʰiil/ 'parched grain' vs /kiil/ 'nail' is the standard textbook demonstration that the same contrast is phonemic elsewhere; the plural allomorphy rule (/s/~/z/~/ɪz/) accurate.
- The eight English inflectional suffixes claim verified (plural, possessive, 3sg, past, past participle, progressive, comparative, superlative); derivation-inside-inflection ordering and the 'unlockable' double-tree ambiguity are standard morphology-course material; in-/im-/ir-/il- nasal assimilation accurate.
- Chomsky's 'Colorless green ideas sleep furiously' correctly deployed for the grammaticality/meaningfulness split; constituency tests, attachment ambiguity ('the man with the telescope'), and recursion accurately presented.
- Sense/reference (Frege's tradition), the three antonymy kinds, prototype theory (Rosch), entailment vs presupposition (negation test) vs implicature (cancellability), and compositionality all verified as standard semantics-survey content.
- Grice's cooperative principle and four maxims, flouting vs violating, Austin/Searle speech-act theory, and Brown & Levinson's face/politeness framework correctly attributed.
- Halliday & Hasan's cohesion taxonomy and the Sacks/Schegloff/Jefferson conversation-analysis tradition (turn-taking, adjacency pairs, preference organization, repair) correctly attributed; the cohesion-without-coherence dissociation is the standard demonstration.
- Labov's department-store /r/ study, the sociolinguistic variable method, matched-guise logic, and overt/covert prestige verified; the deficit-reading rebuttal is the field's consensus position.
- Grimm's Law correspondences (pater/father, tres/three, cornu/horn, piscis/fish) verified accurate; the Great Vowel Shift (~1400–1700) as the explanation of English spelling-sound mismatch is standard; the four semantic-change pathways with 'meat'/'deer'/'silly'/'knight' are the canonical examples.
- Sir William Jones's 1786 'common source' observation correctly dated and quoted in paraphrase; English's pedigree (PIE → Germanic → West Germanic → Anglo-Frisian → English, Frisian as closest relative) verified; Hungarian (Uralic), Tamil (Dravidian), and Basque (isolate) are the standard placement teaching cases; the borrowed/inherited doublets (three/trio) accurate.
- Berko's wug test, overregularization U-shaped development, the imperviousness-to-correction anecdote, poverty-of-the-stimulus vs usage-based (Chomsky vs Tomasello) presented as a live debate, interlanguage, and the critical-period gradient (phonology-weighted) all verified as accurate, honestly calibrated acquisition content; manual babbling in sign-exposed deaf infants verified.
- Garden-path sentences ('The old man the boats'), semantic priming/lexical decision, tip-of-the-tongue partial form access, lawful speech errors (same-type exchanges, morpheme stranding — the Fromkin error-corpus tradition), and the Broca's/Wernicke's aphasia dissociation with the modern network qualification all verified.
- Grosjean's 'a bilingual is not two monolinguals', Ferguson's diglossia, the three-generation shift pattern, Fishman's intergenerational-transmission priority, Hebrew revernacularization with Māori/Welsh as partial successes, and the honestly-layered bilingual-cognition report (metalinguistic gains robust; executive-function advantage contested; deficit claims refuted) all verified as the responsible consensus framing.
- Nida's formal/dynamic equivalence and skopos theory (German functionalist school) correctly attributed; the expressibility principle framing of untranslatability is standard; post-editing as current professional practice accurate.
- The Brown Corpus (1961, one million words) and BNC (100 million) correctly characterized; Biber's register tradition, KWIC concordancing, normalization, MI vs log-likelihood, and the representativeness/absence disciplines verified; Firth's 'company it keeps' correctly attributed.
- The three NLP eras with the 1960s MT funding winter (ALPAC-era), n-gram horizon vs recursion, embeddings as the geometrized distributional hypothesis, and the fluency-is-not-understanding evaluation stance verified as accurate, current survey content.

**24/24 confirmed correct — 0 defects found.** No correction cycle required.

**Domain-internal cross-referencing scan:** the arc verified: what-is-linguistics (gateway, from grammar + phonetics) opens the levels tower — phonology-intro and morphology-intro (also fed by vocab.word-formation-processes) → syntax-theory-intro (with grammar.clauses) → semantics-intro → pragmatics-intro → discourse-analysis-intro; the society/history wing (sociolinguistics-intro ← phonetics.accents-and-dialects; historical-linguistics-intro ← vocab.etymology; → language-families; → dialectology); the mind wing (language-acquisition-intro ← syntax+phonology → psycholinguistics-intro); and the applied chain (applied-linguistics-intro ← sociolinguistics+acquisition → bilingualism-and-multilingualism → translation-studies-intro (with semantics); corpus-linguistics-intro ← discourse → computational-linguistics-intro (with syntax), the domain's terminal concept). The domain's signature design — one running specimen utterance ('Could you unlock the gate?', continuous with the literature domain's Amara gate narrative) dissected at every level, and the collect-pattern-rule-test loop reapplied from phonology through corpus method — verified internally consistent at every claimed point.

**Misconception quality:** all 72 misconceptions (4 × 18) are genuine, well-documented linguistics-instruction confusions (linguist-as-polyglot, descriptivism-as-anything-goes, letters-as-phonemes, morphemes-as-syllables, syntax-as-school-rules, meaning-as-reference, implicature-as-guesswork, dialect-as-error, change-as-decay, lookalikes-as-cognates, imitation-based acquisition, bilingual confusion myth, literal-translation fidelity, corpus-absence-as-impossibility, fluency-as-understanding) with accurate, substantive corrections.

**Audit verdict: PASS — 100% full-concept structured review (18/18) + 24 verification checks + cross-reference/misconception-quality review, zero defects found; zero correction cycles required.**

## Statistics

| Metric | Value |
|--------|-------|
| Domain | Linguistics Foundations (`eng.linguistics`) |
| Concepts (KG) | 18 |
| Assets authored | 18 |
| Assets status=draft | 18 |
| Broken prerequisite edges / cross-links / orphans / strays | 0 |
| Chapter file | `docs/english/chapters/linguistics.md` (2046 lines) |
| Authoring chunks | 4 (5+5+4+4, deterministic graph order — the what-is-linguistics gateway and the levels tower (phonology, morphology, syntax, semantics); pragmatics through discourse, the society wing (sociolinguistics) and history wing (historical linguistics, language families); the mind wing (acquisition, psycholinguistics) plus applied linguistics and dialectology; the terminal applied chain (bilingualism, translation studies, corpus linguistics, computational linguistics)) |

## Knowledge Graph Issues Discovered

None. `docs/english/kg/graph.json` was treated as frozen throughout and was not modified. The `eng.linguistics` slice (18 concepts, cross-domain entry edges from grammar/phonetics/vocab, six outbound cross-links) was used exactly as shipped.

## Issues

None — all checks and all audit items passed on first validation.

## Verdict

**PASS** — Domain `eng.linguistics` is validated, pedagogically audited (100% full structured review, 24 verification checks, 0 defects), and ready to commit. This is the eleventh English domain to complete teaching-asset production (11/12 domains, 204/216 concepts, 94.4% of the English campaign).
