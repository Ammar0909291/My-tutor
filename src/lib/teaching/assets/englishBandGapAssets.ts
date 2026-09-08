/**
 * ENGLISH PROBE-DEPTH GAP — the two concepts a real learner test needed to
 * reach mastery, and could not.
 *
 * ── THE DEFECT, MEASURED (2026-09-08, direct production query) ─────────────
 * `assetContract.ts` requires >= 3 closed-choice probes per (concept, band) —
 * derived from the mastery bar itself (`correctAtCheck >= 1` plus
 * `correctAtPractice >= 2`, and the gate never re-asks a spent probe). Queried
 * production directly: **all 214 of 216 English (concept, band) pairs hold
 * exactly 2 ACTIVE closed-choice probes.** `eng.grammar.nouns` (MIDDLE) and
 * `eng.phonics.blending-segmenting` (EARLY) — the two concepts a real-learner
 * student-readiness validation needed to drive through wrong-answer ->
 * remediation -> correct-answer -> progression — are both in that set: two
 * probes each, one wrong answer away from an empty pool.
 *
 * This is the exact defect class `PHASE6_P1_ENGLISH_ASSET_CONTRACT.md`
 * classified (Step 3/4 of that report): CONTENT DEFECT, not a runtime defect
 * — `assetContract.ts` is imported by zero production modules, so a
 * below-contract concept cannot itself cause a runtime bug. What it causes is
 * documented there too: once the pool is spent, the model's own `<!--MCQ-->`
 * question is advisory only, `withholdUngradedGateQuestion` correctly strips
 * an ungradeable one rather than fabricate evidence, and the lesson cannot
 * reach `correctAtPractice >= 2` — so it cannot close. That report's own
 * recommended remedy: "author ONE additional closed-choice probe" per
 * concept, matching the modality already in use.
 *
 * The full 214-concept remedy is out of this file's scope (a multi-session
 * content campaign, per this project's own established "one bounded batch"
 * discipline — see CLAUDE.md's Curriculum Completion Program). This file
 * closes the two concepts a live validation explicitly required, using the
 * SAME modality (closed-choice, misconception-targeted) already serving
 * every other probe for these concepts.
 *
 * ── SLOT SAFETY (the P-10 defect class, `brainSeedAssets.ts`'s own note) ────
 * `canonicalSlug` is `conceptId:probeKind:lang:band[:difficulty]`, and the
 * difficulty segment is appended only once a slot holds MORE than one probe.
 * Both target concepts already hold exactly one ACTIVE `mcq` probe and one
 * ACTIVE `misconception_probe`, each a live singleton slot. Adding a SECOND
 * probe to either slot would re-identify (rename) that already-serving row —
 * the exact P-10 recurrence `abandonedLegacyProbeSlugs` exists to catch.
 * Both probes below are authored into `probeKind: 'true_false'` instead —
 * verified empty for both concepts before authoring — keeping each a fresh
 * singleton slot, the same technique `chemistrySeedAssets.ts` and
 * `authoredSeedAssets.ts`'s MOAT STAGE 2 batch already document and use.
 *
 * ── MISCONCEPTION REUSE, NOT NEW AUTHORING ──────────────────────────────────
 * Neither concept's Blueprint or Educational Brain entry documents a third
 * misconception (checked directly: both registries hold exactly two). Rather
 * than invent a new misconception id — which would be Educational Brain
 * authoring, out of this file's scope — each probe below asks a DIFFERENT
 * question targeting one of the two ALREADY-REGISTERED, ALREADY-ACTIVE
 * misconceptions for its concept, exactly as `mathematicsBandGapAssets.ts`'s
 * own header states its probes do ("misconception ids reuse the identifiers
 * already ACTIVE for the same concept").
 *
 * Seeded through the same corpus as `physicsBandGapAssets.ts` /
 * `chemistryDepthSeedAssets.ts` — wired into both `src/instrumentation.ts`'s
 * cold-start bootstrap (which seeds English on every cold start,
 * `BOOTSTRAP_SEED_SUBJECTS`) and `scripts/brain/seed-knowledge-assets.ts`, so
 * it converges automatically and idempotently; nothing here is a database
 * write performed by this session directly.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedProbe } from './brainSeedAssets'

const S = 'english'
const src = (concept: string, what: string) =>
  `docs/curriculum/blueprints/${concept}.md — Misconception Registry; ${what}`

// ─── eng.grammar.nouns @ MIDDLE ───────────────────────────────────────────────
// Registry: MC-NOUNS-ARE-ONLY-PHYSICAL-THINGS, MC-COUNTABLE-VS-UNCOUNTABLE-
// IS-ARBITRARY. The existing `mcq` probe already tests the first with an
// abstract-noun set (table/happiness/freedom); the existing
// `misconception_probe` already tests the second with "a piece of advice".
// This asks the SAME already-registered second misconception through a
// different, equally common example (furniture), so it diagnoses the belief
// again from an angle the learner may not have met, rather than repeating a
// question they may simply recall the answer to.
const NOUNS_GAP: SeedProbe[] = [
  {
    conceptId: 'eng.grammar.nouns', subjectSlug: S, probeKind: 'true_false',
    gradeBand: GradeBand.MIDDLE, difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Which sentence is correct — "I need three furnitures for my new room" or "I need three pieces of furniture for my new room"?',
    choices: [
      { text: '"Three pieces of furniture" — furniture is uncountable, so it is measured in units like "piece", not counted directly with a number', isCorrect: true },
      { text: '"Three furnitures" — furniture is a noun, and any noun can take a plural -s when you mean more than one', isCorrect: false, misconceptionId: 'eng.grammar.nouns:MC-COUNTABLE-VS-UNCOUNTABLE-IS-ARBITRARY' },
    ],
    correctValue: 'three pieces of furniture',
    targetedMisconceptions: ['eng.grammar.nouns:MC-COUNTABLE-VS-UNCOUNTABLE-IS-ARBITRARY'],
    source: src('eng.grammar.nouns', 'MC-COUNTABLE-VS-UNCOUNTABLE-IS-ARBITRARY, re-asked with "furniture" rather than the existing "advice" example'),
  },
]

// ─── eng.phonics.blending-segmenting @ EARLY ─────────────────────────────────
// Registry: MC-BLENDING-IS-JUST-FAST-LETTERS, MC-SEGMENTING-STOPS-AT-
// SYLLABLES. The existing `mcq` probe already tests the first with "sun"; the
// existing `misconception_probe` already tests the second with "rabbit". This
// asks the SAME already-registered first misconception with a different word
// ("cat"), so blending is diagnosed twice with independent evidence rather
// than a single memorisable example.
const BLENDING_GAP: SeedProbe[] = [
  {
    conceptId: 'eng.phonics.blending-segmenting', subjectSlug: S, probeKind: 'true_false',
    gradeBand: GradeBand.EARLY, difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Which way of saying the sounds in "cat" turns into the real word?',
    choices: [
      { text: 'Gliding the sounds together with no stops: "/k/-/æ/-/t/" said smoothly, one flowing into the next -> "cat"', isCorrect: true },
      { text: 'Saying the letter names quickly: "see... ay... tee"', isCorrect: false, misconceptionId: 'eng.phonics.blending-segmenting:MC-BLENDING-IS-JUST-FAST-LETTERS' },
    ],
    correctValue: 'gliding the sounds together',
    targetedMisconceptions: ['eng.phonics.blending-segmenting:MC-BLENDING-IS-JUST-FAST-LETTERS'],
    source: src('eng.phonics.blending-segmenting', 'MC-BLENDING-IS-JUST-FAST-LETTERS, re-asked with "cat" rather than the existing "sun" example'),
  },
]

export const ENGLISH_BAND_GAP_PROBES: SeedProbe[] = [...NOUNS_GAP, ...BLENDING_GAP]
