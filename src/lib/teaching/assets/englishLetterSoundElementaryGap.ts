/**
 * ENGLISH PHONICS ASSET-CONTRACT GAP — `eng.phonics.letter-sound-
 * correspondence` @ ELEMENTARY, closed choice.
 *
 * ── WHY THIS FILE EXISTS, SEPARATELY FROM THE ADULT-BAND CAMPAIGN ──────────
 * Batch 21's `--all` regeneration of the English asset-contract surfaced 4
 * remaining short pairs, all `eng.phonics.*`, none previously flagged:
 *   - `letter-sound-correspondence::EARLY`   (already has a `short_answer`
 *     probe — openRecall=1 — excluded per Batch 13's finding: voice-required)
 *   - `letter-sound-correspondence::ELEMENTARY` (gradeable=0, openRecall=0 —
 *     THIS FILE closes it)
 *   - `phonemic-awareness::EARLY`  (already has a `short_answer` probe —
 *     openRecall=1 — excluded per Batch 13's finding: voice-required)
 *   - `phonemic-awareness::ADULT`  (gradeable=0, openRecall=0 — investigated
 *     and NOT closed, see below)
 *
 * Investigated both zero-content pairs directly against
 * `educational-brain/concepts/english/eng.phonics.phonemic-awareness.md` and
 * `eng.phonics.letter-sound-correspondence.md` (the same reference Batch 13
 * used for the `::EARLY` exclusion) before writing anything:
 *
 * - `phonemic-awareness` is explicitly authored as voice-only at EVERY band,
 *   not just EARLY: its own "Voice teaching" section calls it "the tree's
 *   flagship voice-required territory — every success and every failure is
 *   audible and nothing is writable," its Mastery gate requires "production
 *   (isolate a fresh word's first sound with no cueing)," and its own
 *   ANTI-ANALOGY section names using written letters here a CATEGORY ERROR
 *   ("letters are a written-language convention that arrives LATER... using
 *   letter-talk here installs exactly the letter-before-sound
 *   misconception"). A closed-choice probe would have to either (a) present
 *   written word options, which requires the very letter-sound knowledge
 *   this node is prerequisite TO, or (b) not actually test phoneme
 *   isolation at all. Neither is a valid probe. The concept file DOES give
 *   an adult-register explanation (its content is age-appropriate at every
 *   band), but the ASSESSMENT itself stays oral at every band — the skill
 *   doesn't change with age, only the vocabulary framing does. Conclusion:
 *   `phonemic-awareness::ADULT` is voice-required for the same structural
 *   reason `::EARLY` is, not by omission — left uncited, matching `::EARLY`.
 *
 * - `letter-sound-correspondence` is different in kind: letters ARE the
 *   content here (not excluded), so recognition/decoding CAN be validly
 *   described in text without requiring live audio — e.g. testing whether a
 *   learner distinguishes a letter's NAME from its SOUND, or recognizes that
 *   guessing from a picture is not decoding, both purely conceptual
 *   distinctions statable and checkable in writing. This is the same
 *   pattern `englishBandGapAssets.ts` already uses for this exact concept's
 *   sibling gaps (`eng.phonics.blending-segmenting`) — a scenario described
 *   in text, tested `true_false`/`mcq`, no oral production required of the
 *   probe-taker.
 *
 * ── MISCONCEPTION SOURCE ─────────────────────────────────────────────────
 * This concept carries TWO independent, already-authored misconception
 * registries: `docs/curriculum/blueprints/eng.phonics.letter-sound-
 * correspondence.md`'s "Misconception Engine" (MC-1..MC-4), and
 * `educational-brain/concepts/english/eng.phonics.letter-sound-
 * correspondence.md`'s "Misconception library" (M1..M5). The EXISTING
 * EARLY-band probe in `brainSeedAssets.ts` already targets
 * `eng.phonics.letter-sound-correspondence:M1`/`:M2` — the educational-brain
 * registry, not the Blueprint one — so this file follows that SAME already-
 * live registry for consistency (M1 "letters say their names", M5
 * "first-letter guessing"), rather than introducing the Blueprint's parallel
 * MC-1..4 ids that nothing else for this concept currently uses.
 *
 * ── SLOT SAFETY ──────────────────────────────────────────────────────────
 * `letter-sound-correspondence::ELEMENTARY` holds a `core_explanation` only
 * (see `brainSeedAssets.ts`) and ZERO probes of any kind — confirmed via
 * `contract-audit.ts --all` (`gradeable=0, openRecall=0`). Any probeKind
 * chosen here is therefore a fresh singleton slot; no P-10 collision risk.
 *
 * Register: 8-11, "returning older struggler, dignity-first" (the same
 * register the concept's own existing ELEMENTARY explanation uses) — not
 * the adult-professional register the rest of this campaign's batches use,
 * since this concept's ELEMENTARY band is a genuinely different audience.
 *
 * Seeded as DRAFT-then-bootstrap-ACTIVE through the same path as every
 * other file in this campaign: `src/instrumentation.ts`'s cold-start
 * bootstrap and `scripts/brain/seed-knowledge-assets.ts`. Nothing here is a
 * database write performed by this session directly.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedProbe } from './brainSeedAssets'

const CONCEPT = 'eng.phonics.letter-sound-correspondence'
const S = 'english'
const src = (what: string) =>
  `educational-brain/concepts/english/${CONCEPT}.md — Misconception library; ${what}`

const M1 = `${CONCEPT}:M1`
const M5 = `${CONCEPT}:M5`

export const ENGLISH_LETTER_SOUND_ELEMENTARY_GAP: SeedProbe[] = [
  {
    conceptId: CONCEPT, subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.ELEMENTARY, difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Asked to read the word "sun," a student says "ess-you-en" — the NAMES of the letters — instead of blending their sounds. Has this student read the word?',
    choices: [
      { text: 'No — the student named the letters instead of producing their sounds; reading means using each letter\'s JOB (its sound, /s/-/u/-/n/), not its NAME', isCorrect: true },
      { text: 'Yes — since the student correctly identified every letter by its proper name, saying the letter names counts as reading the word', isCorrect: false, misconceptionId: M1 },
    ],
    targetedMisconceptions: [M1],
    source: src('M1 — "Letters say their names", fresh example ("sun") rather than the existing "cat"/EARLY-band example'),
  },
  {
    conceptId: CONCEPT, subjectSlug: S, probeKind: 'misconception_probe',
    gradeBand: GradeBand.ELEMENTARY, difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Shown the word "house" next to a picture of a house, a student quickly says "horse" because the word starts with the same letter and the picture looks similar enough at a glance. Is guessing from the first letter and a picture a reliable way to read a new word?',
    choices: [
      { text: 'No — guessing from the first letter and a picture can produce a wrong word that shares only a starting letter; reliable reading means decoding all the sounds in order, not guessing from a partial clue', isCorrect: true },
      { text: 'Yes — since the guessed word starts with the same letter and a similar picture is nearby, guessing this way is just as reliable as sounding out every letter', isCorrect: false, misconceptionId: M5 },
    ],
    targetedMisconceptions: [M5],
    source: src('M5 — "First-letter guessing", fresh example ("house"/"horse") rather than the existing generic picture-book example'),
  },
  {
    conceptId: CONCEPT, subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.ELEMENTARY, difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Revising their attempt at "sun," the student instead blends the sounds /s/-/u/-/n/ together smoothly instead of naming the letters "ess-you-en." Is blending the sounds, rather than naming the letters, the correct way to read the word?',
    choices: [
      { text: 'Yes — reading requires producing and blending each letter\'s sound, not reciting its name; the student\'s revised attempt correctly uses the letters\' sound-jobs instead of their names', isCorrect: true },
      { text: 'No — since the letters are the same either way, naming them or blending their sounds should work equally well for reading the word', isCorrect: false, misconceptionId: M1 },
    ],
    targetedMisconceptions: [M1],
    source: src('M1 — "Letters say their names", second fresh example (revising the "sun" attempt) forming the ladder\'s third rung'),
  },
]
