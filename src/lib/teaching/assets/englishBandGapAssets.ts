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
 *
 * ── DEPTH 3 -> 4: THE ZERO-SLACK DEFECT, MEASURED LIVE (2026-09-08) ─────────
 * The first version of this file brought both concepts to exactly 3 probes —
 * the bare mastery bar (1 CHECK + 2 PRACTICE), matching `assetContract.ts`'s
 * stated minimum. Driving `eng.grammar.nouns` as a real learner against the
 * deployed app (one deliberate wrong answer, then two correct, exactly the
 * "wrong answer -> remediation -> correct -> progression" scenario a real
 * lesson must survive) reproduced the SAME zero-slack failure this project
 * already found and fixed in physics/chemistry (probe depth 3 -> 5, "the
 * required success rate was therefore 1.00 — one wrong answer made mastery
 * unreachable"): the wrong answer consumed one of the 3 probes without
 * banking either counter, so by the time `checkCorrect:1, practiceCorrect:1`
 * was reached, all 3 authored probes were spent and the concept could not
 * reach `practiceCorrect >= 2` from authored content alone. Verified via
 * production Vercel logs (`TURN_EVENT`) and the session's persisted
 * `contextSnapshot.conversationState`, not guessed.
 *
 * One additional probe per concept (below) brings both to depth 4 — enough
 * for the mastery bar (3) plus exactly one wrong-answer/remediation cycle,
 * the realistic case this task's own validation scenario requires. Each new
 * probe uses `probeKind: 'checkpoint'` — a THIRD distinct probeKind, verified
 * empty for both concepts before authoring, so it is a fresh singleton slot
 * exactly like the `true_false` slot above and carries no P-10 risk.
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

// ─── depth-4 probes — one wrong-answer/remediation cycle of slack ───────────

const NOUNS_DEPTH: SeedProbe[] = [
  {
    conceptId: 'eng.grammar.nouns', subjectSlug: S, probeKind: 'checkpoint',
    gradeBand: GradeBand.MIDDLE, difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Which sentence is correct — "I need an advice about this" or "I need some advice about this"?',
    choices: [
      { text: '"Some advice" — advice is uncountable, so it takes "some", not "an", the way you would say "some water" rather than "a water"', isCorrect: true },
      { text: '"An advice" — advice is a noun, so "a"/"an" works with it exactly like with any other singular noun', isCorrect: false, misconceptionId: 'eng.grammar.nouns:MC-COUNTABLE-VS-UNCOUNTABLE-IS-ARBITRARY' },
    ],
    correctValue: 'some advice',
    targetedMisconceptions: ['eng.grammar.nouns:MC-COUNTABLE-VS-UNCOUNTABLE-IS-ARBITRARY'],
    source: src('eng.grammar.nouns', 'MC-COUNTABLE-VS-UNCOUNTABLE-IS-ARBITRARY, a third angle (the a/an test rather than plural -s or unit-counting) so a learner who has already met the "furniture"/"advice" examples still faces a genuinely new question'),
  },
]

const BLENDING_DEPTH: SeedProbe[] = [
  {
    conceptId: 'eng.phonics.blending-segmenting', subjectSlug: S, probeKind: 'checkpoint',
    gradeBand: GradeBand.EARLY, difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'You break the word "fish" into its smallest sounds. Is "fi-sh" (two chunks) the full segmentation, or is there more to do?',
    choices: [
      { text: 'There is more to do — /f/, /i/ and /sh/ are three separate sounds; "sh" is one sound (a digraph) but "fi" is still two: /f/ and /i/', isCorrect: true },
      { text: '"Fi-sh" is fully segmented — two chunks is as small as the word can be broken', isCorrect: false, misconceptionId: 'eng.phonics.blending-segmenting:MC-SEGMENTING-STOPS-AT-SYLLABLES' },
    ],
    correctValue: 'there is more to do',
    targetedMisconceptions: ['eng.phonics.blending-segmenting:MC-SEGMENTING-STOPS-AT-SYLLABLES'],
    source: src('eng.phonics.blending-segmenting', 'MC-SEGMENTING-STOPS-AT-SYLLABLES, re-asked with "fish" (a single-syllable word, so the stopping-point error appears at the sound level rather than the syllable level) rather than the existing "rabbit" example'),
  },
]

export const ENGLISH_BAND_GAP_PROBES: SeedProbe[] = [
  ...NOUNS_GAP, ...BLENDING_GAP, ...NOUNS_DEPTH, ...BLENDING_DEPTH,
]
