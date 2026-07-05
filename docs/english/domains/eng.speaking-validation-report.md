# Domain Validation Report — Speaking (`eng.speaking`)

Date: 2026-07-04
Verdict: **PASS**

## Check Results

| Check | Result |
|-------|--------|
| Concept Count | ✓ PASS (10 concepts) |
| Prerequisite Integrity | ✓ PASS (0 broken edges) |
| Unlocks Integrity | ✓ PASS (0 broken edges) |
| Duplicate Detection | ✓ PASS (0 duplicates) |
| Orphan Concept Detection | ✓ PASS (single in-domain entry point, `oral-fluency`, requiring only the cross-domain prerequisite `eng.phonetics.connected-speech`; 0 true orphans) |
| Orphan Asset Detection | ✓ PASS (0 assets without a matching KG concept) |
| Broken Cross Links | ✓ PASS (0 broken; all four outbound/inbound cross-links — `pronunciation-in-conversation`→`eng.phonetics.prosody`, `storytelling-orally`→`eng.literature.dramatic-structure`, `debate-skills`→`eng.listening.critical-listening`, `non-verbal-communication`→`eng.communication.cross-cultural-communication` — resolve to real concepts) |
| Asset Completeness | ✓ PASS (10 assets complete, all status=draft) |
| Blueprint Sub-schema Conformance | ✓ PASS (10/10, correct field names from the start) |
| Curriculum Completeness | ✓ PASS (1081 lines, all 10 concept IDs present) |
| Quality Audit | ✓ PASS (no placeholder/[TEMPLATE] text remaining) |
| Teaching Asset Schema (deep + provenance) | ✓ PASS (10/10) |
| Prerequisite Review Triggers | ✓ PASS (exact match with KG `requires` edges, 10/10) |
| Bloom Alignment (asset ↔ KG) | ✓ PASS (10/10) |
| 3–4 Misconceptions per Concept | ✓ PASS (10/10, all exactly 4 — 40 total) |
| KG Cycle Detection (whole subject) | ✓ PASS (0 cycles across 216 concepts) |
| Subject-wide Coverage | ✓ PASS (216/216 concepts have exactly 1 asset) |
| Regression (7 completed domains draft, 4 other domains untouched) | ✓ PASS (phonics 14, phonetics 14, vocab 20, grammar 43, reading 16, writing 20, listening 8 all still draft; composition 16, literature 25, linguistics 18, communication 12 all still placeholder) |
| English KG unchanged | ✓ PASS (sha256 `d8f6140932bae1658cd774e05fb1e2df2bc9130a565676c758655dca9ce44fd8` matches pinned value) |
| Mathematics / Physics / Educational Brain / other subjects unchanged | ✓ PASS (working tree touches docs/english only) |

## Method Note

Zero pre-merge correction cycles — correct schema field names from the first chunk, continuing the established practice. Authored in 2 chunks (5+5).

## Pedagogical Audit (≥20% gate — full-domain verification performed)

Given the domain's size (10 concepts), **all 10/10 concepts (100%) received full structured pedagogical review** as part of the complete verification sweep — **17 individual verification checks** against speaking-pedagogy, conversation-analysis, pronunciation-research, and communication-psychology references. Highlights:

- Oral fluency's pace/pausing/hesitation dimensions and fluency-versus-accuracy independence verified (the CEFR genuinely treats fluency as its own scale); 'wanna' correctly treated as standard casual reduction with a register caveat.
- Pronunciation-in-conversation's intelligibility-over-accent-elimination stance verified as the genuine modern pronunciation-teaching consensus, and the suprasegmental-priority claim verified against intelligibility research; the pho-TOG-ra-phy stress example verified.
- Conversation skills' turn-taking (completion signals), backchannels, pre-closing sequences, and topical coherence verified as accurately simplified conversation-analysis content, with the interruption-versus-overlap distinction and cultural-variability caveat both correct.
- Asking/answering's open/closed functions, declarative questions via rising intonation, calibration, and dodge detection verified; the interview worked example's three answers correctly typed.
- Oral storytelling's one-pass constraint, signposting, and orientation-complication-resolution shape verified (consistent with natural-narrative structure research).
- Discussion skills' build/disagree/invite/synthesize move set verified as standard facilitation content.
- Public speaking's illusion-of-transparency (a genuine documented effect), arousal-reframing, preparation-first anxiety management, and rehearsed-opening advice all verified as evidence-based.
- Presentation skills' preview/signpost/recap structure, read-along failure mode (silent reading outpaces speech — accurate), and aid-supports-not-substitutes rule verified as standard professional guidance.
- Debate's rebuttal anatomy, strawman/ad hominem definitions, and assigned-side rationale verified; the three-rebuttal worked example correctly typed; the critical-listening cross-link made concrete and correctly.
- Non-verbal communication's three-channel model, congruence principle, iconic/beat gesture taxonomy, cluster-reading discipline, cultural variability, and — importantly — the **correct debunking of the '93% of communication is nonverbal' myth** (Mehrabian's findings applied only to single-word affect judgments under channel conflict, a limitation Mehrabian himself has stressed) all verified accurate.

**17/17 confirmed correct — 0 defects found.** No correction cycle required.

**Domain-internal cross-referencing scan:** the arc verified: oral-fluency (entry, from connected-speech) → pronunciation-in-conversation (prosody cross-link) → conversation-skills (the solo-to-joint pivot) → {asking-and-answering-questions → discussion-skills → public-speaking-basics → presentation-skills → debate-skills (capstone)} plus the parallel branches storytelling-orally and non-verbal-communication off conversation-skills. The domain's signature design — receptive skills flipped productive (phonetics' connected speech → fluent production; critical-listening's claim-tracking → rebuttal; active-listening's reply-planning trap recurring as serial monologuing and rehearsing-through-the-opponent) — verified consistent at every claimed mirror point.

**Misconception quality:** all 40 misconceptions (4 × 10) are genuine, well-documented speaking-instruction confusions (fluency=speed, accent elimination as the goal, all-overlap-is-rude, longer answers are better, confident speakers feel no fear, slides-as-script, debate-as-shouting, the 93% myth, body-language dictionaries) with accurate, substantive corrections.

**Audit verdict: PASS — 100% full-concept structured review (10/10) + 17 verification checks + cross-reference/misconception-quality review, zero defects found; zero correction cycles required.**

## Statistics

| Metric | Value |
|--------|-------|
| Domain | Speaking (`eng.speaking`) |
| Concepts (KG) | 10 |
| Assets authored | 10 |
| Assets status=draft | 10 |
| Broken prerequisite edges / cross-links / orphans / strays | 0 |
| Chapter file | `docs/english/chapters/speaking.md` (1081 lines) |
| Authoring chunks | 2 (5+5, deterministic graph order — the fluency/pronunciation production foundation, the conversation-skills interactional pivot, the question/discussion/public-speaking/presentation chain to the debate capstone, with storytelling and non-verbal communication as parallel branches) |

## Knowledge Graph Issues Discovered

None. `docs/english/kg/graph.json` was treated as frozen throughout and was not modified. The `eng.speaking` slice (10 concepts, one cross-domain entry edge from `eng.phonetics.connected-speech`, four cross-links to phonetics, literature, listening, and communication) was used exactly as shipped.

## Issues

None — all checks and all audit items passed on first validation.

## Verdict

**PASS** — Domain `eng.speaking` is validated, pedagogically audited (100% full structured review, 17 verification checks, 0 defects), and ready to commit. This is the eighth English domain to complete teaching-asset production (8/12 domains, 145/216 concepts, 67.1% of the English campaign).
