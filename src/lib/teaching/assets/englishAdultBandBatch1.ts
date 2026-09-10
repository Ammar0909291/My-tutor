/**
 * ENGLISH ADULT-BAND PROBE-CONTRACT CAMPAIGN — Batch 1.
 *
 * ── THE GAP THIS CLOSES ─────────────────────────────────────────────────────
 * The native-band probe-contract campaign (batches 1-10, commit 0ebf3cd,
 * 2026-09-08) took all 214 applicable English concepts to >= 3 closed-choice
 * probes at each concept's NATIVE KG-derived band. Batch 1's own header
 * flagged, as an explicitly UNTOUCHED open scope question: "every English
 * concept apparently carries an authored ADULT-band explanation ... but none
 * was ever given ADULT-band assessment probes."
 *
 * Measured directly (`scripts/qa/englishAdultBandAudit.ts`, zero DB access,
 * reads only the corpus already in git): **all 214 applicable English
 * concepts hold ZERO ADULT-band closed-choice probes.** This is not a
 * cosmetic gap. `studentState.ts`'s `gradeToGradeBand` defaults a learner
 * with no school grade on file — the ordinary case for a self-directed adult
 * Library learner — to ADULT. `matcher.ts`'s `scoreMatch` gives HIGH<->ADULT
 * a +15 compatibility bonus (score 65, exactly the 65 threshold), but
 * EARLY/ELEMENTARY/MIDDLE native-band concepts (the majority of
 * eng.phonics/eng.grammar/eng.vocab) get NO such bonus for an ADULT learner:
 * distance >= 2 scores 50, below threshold. So an ADULT-band learner
 * studying one of these concepts gets essentially zero authored closed-choice
 * probes today — the exact "taught but never quizzed" failure this project
 * already fixed once for mathematics (`mathematicsBandGapAssets.ts`) and once
 * for a handful of English (concept, band) pairs
 * (`englishBandGapAssets.ts`), at production-measured scale here.
 *
 * ── THIS BATCH ───────────────────────────────────────────────────────────
 * 10 concepts (the entire eng.phonics domain's first 10 concepts, KG order:
 * print-concepts, alphabet-recognition, rhyming, blending-segmenting,
 * consonants, short-vowels, consonant-blends, digraphs,
 * long-vowels-silent-e, sight-words), 3 new ADULT-band closed-choice probes
 * each (30 total) — the bare mastery-gate contract
 * (`correctAtCheck >= 1` + `correctAtPractice >= 2` = 3, `assetContract.ts`).
 *
 * Two of the ten (phonemic-awareness, letter-sound-correspondence) are
 * deliberately EXCLUDED, exactly as the native-band campaign excluded them:
 * `educational-brain/first-lesson/07-subject-adaptations.md` §1 documents
 * these as genuinely voice-required, "nothing is writable" territory.
 * `print-concepts`, by contrast, already carries native written probes (the
 * PHASE6_P1 report flagged the opposite inconsistency — print-concepts
 * having written probes while genuinely being pre-reading) and is squarely
 * within scope for an ADULT learner, who by definition of the ADULT band is
 * literate (an adult returning to review foundational phonics, or an adult
 * ESL/literacy learner — both real segments).
 *
 * Every distractor carries the `misconceptionId` naming it, reusing ONE of
 * each concept's own two ALREADY-REGISTERED, ALREADY-ACTIVE misconceptions
 * (verified: every one of these 10 concepts' Blueprint Misconception
 * Registry holds exactly 2 — no more, no fewer; no new misconception ids
 * invented, no Educational Brain authoring). Structure mirrors
 * `mathematicsBandGapAssets.ts`'s `FRACTIONS_ADULT` precedent exactly:
 * `mcq`(FOUNDATIONAL) + `misconception_probe`(DEVELOPING) + `mcq`(PROFICIENT)
 * per concept, so the ladder-aware slug resolver (`buildProbeSlugResolver`)
 * disambiguates the two `mcq` rungs by difficulty without re-identifying any
 * already-serving row (there are none at ADULT for these concepts today, so
 * this is a fresh singleton-to-ladder promotion within this batch only, no
 * P-10 risk to existing rows).
 *
 * Register: adult framing throughout (helping a child read, tutoring an ESL
 * adult learner, reading a form/sign/recipe) — never child-directed
 * storybook language — matching the existing ADULT-band `core_explanation`
 * for each of these concepts (`authoredSeedAssets.ts`,
 * "foundations/03 §5 adult-register guard"). Every worked example below is
 * deliberately DIFFERENT from the words already used in this concept's
 * native-band probes and its own ADULT explanation, so a learner who has met
 * the explanation is not simply asked to recall the same example.
 *
 * Seeded as DRAFT-then-bootstrap-ACTIVE through the same path as every other
 * batch in this campaign: `src/instrumentation.ts`'s cold-start bootstrap
 * (English is in `BOOTSTRAP_SEED_SUBJECTS`) and
 * `scripts/brain/seed-knowledge-assets.ts`. Nothing here is a database write
 * performed by this session directly — no DATABASE_URL is available here.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedProbe } from './brainSeedAssets'

const S = 'english'
const src = (concept: string, what: string) =>
  `docs/curriculum/blueprints/${concept}.md — Misconception Registry; ${what}`

function adultLadder(
  conceptId: string,
  mcA: string,
  mcB: string,
  items: [
    { stem: string; correct: string; wrong: string }, // mcq, FOUNDATIONAL, mcA
    { stem: string; correct: string; wrong: string }, // misconception_probe, DEVELOPING, mcB
    { stem: string; correct: string; wrong: string }, // mcq, PROFICIENT, mcA (fresh example)
  ],
  notes: [string, string, string],
): SeedProbe[] {
  const mcAId = `${conceptId}:${mcA}`
  const mcBId = `${conceptId}:${mcB}`
  return [
    {
      conceptId, subjectSlug: S, probeKind: 'mcq',
      gradeBand: GradeBand.ADULT, difficulty: ProbeDifficulty.FOUNDATIONAL,
      stem: items[0].stem,
      choices: [
        { text: items[0].correct, isCorrect: true },
        { text: items[0].wrong, isCorrect: false, misconceptionId: mcAId },
      ],
      targetedMisconceptions: [mcAId],
      source: src(conceptId, notes[0]),
    },
    {
      conceptId, subjectSlug: S, probeKind: 'misconception_probe',
      gradeBand: GradeBand.ADULT, difficulty: ProbeDifficulty.DEVELOPING,
      stem: items[1].stem,
      choices: [
        { text: items[1].correct, isCorrect: true },
        { text: items[1].wrong, isCorrect: false, misconceptionId: mcBId },
      ],
      targetedMisconceptions: [mcBId],
      source: src(conceptId, notes[1]),
    },
    {
      conceptId, subjectSlug: S, probeKind: 'mcq',
      gradeBand: GradeBand.ADULT, difficulty: ProbeDifficulty.PROFICIENT,
      stem: items[2].stem,
      choices: [
        { text: items[2].correct, isCorrect: true },
        { text: items[2].wrong, isCorrect: false, misconceptionId: mcAId },
      ],
      targetedMisconceptions: [mcAId],
      source: src(conceptId, notes[2]),
    },
  ]
}

const PRINT_CONCEPTS_ADULT = adultLadder(
  'eng.phonics.print-concepts', 'MC-PICTURE-IS-THE-STORY', 'MC-SPACES-ARE-DECORATION',
  [
    {
      stem: 'You are reading a bedtime story aloud to a child. If someone covers the illustration but leaves the text visible, can you still read the exact same words?',
      correct: 'Yes — the print carries the fixed message every time; the picture only illustrates it',
      wrong: 'No — without the picture, there is nothing left to read from',
    },
    {
      stem: "On a printed form, the words \"PleaseSignHere\" are jammed together with no gaps, and a new reader struggles to read it. What job do the missing spaces normally do?",
      correct: 'Spaces mark where one word ends and the next begins — without them, "please", "sign" and "here" cannot be told apart',
      wrong: 'Spaces are just visual spacing with no real job — the words are still there either way',
    },
    {
      stem: 'An adult learner is shown a recipe card: instructions on one side, a photo of the finished dish on the other. If the photo is torn off, can the recipe still be followed?',
      correct: "Yes — the recipe's instructions live in the print; the photo is only a preview of the result",
      wrong: 'No — the photo is essential; without it, the recipe cannot be understood',
    },
  ],
  [
    'MC-PICTURE-IS-THE-STORY, adult framing (reading aloud with the illustration covered) rather than the existing "different page" example',
    'MC-SPACES-ARE-DECORATION, adult framing (a jammed-together printed form) rather than the existing "I see a dog" example',
    'MC-PICTURE-IS-THE-STORY, a second fresh adult example (a recipe card) forming the ladder\'s third rung',
  ],
)

const ALPHABET_RECOGNITION_ADULT = adultLadder(
  'eng.phonics.alphabet-recognition', 'MC-CASE-ARE-DIFFERENT-LETTERS', 'MC-SHAPE-CONFUSION-MIRROR-LETTERS',
  [
    {
      stem: "On a form, your name is printed as \"JOHN\" in the heading and you sign it \"John\" below. Are \"J\" and \"j\" two different letters, or the same letter in two forms?",
      correct: 'The same letter — same name and sound, just uppercase and lowercase forms',
      wrong: 'Two different letters, because they look different',
    },
    {
      stem: 'An adult learner copies the word "dog" from a sign but writes "bog". What is the most likely cause?',
      correct: 'Mixing up "b" and "d" — mirror-image letters that share the same curve-and-stick shape, differing only in which way they face',
      wrong: 'A spelling mistake unrelated to letter shape — the learner simply does not know how "dog" is spelled',
    },
    {
      stem: 'A learner sees "STOP" on a road sign and later types "stop" in a text message. Has the meaning of the word changed because the letters look different?',
      correct: 'No — "STOP" and "stop" are the identical word; case is a style choice, not a change of letters',
      wrong: 'Yes — the capital and lowercase versions are effectively different words',
    },
  ],
  [
    'MC-CASE-ARE-DIFFERENT-LETTERS, adult framing (a name on a form vs. a signature) rather than the existing "Tt" example',
    'MC-SHAPE-CONFUSION-MIRROR-LETTERS, adult framing (copying a sign, "dog" written as "bog") rather than the existing "p/q" example',
    'MC-CASE-ARE-DIFFERENT-LETTERS, a second fresh adult example (a road sign vs. a text message) forming the ladder\'s third rung',
  ],
)

const RHYMING_ADULT = adultLadder(
  'eng.phonics.rhyming', 'MC-SPELLING-MUST-MATCH', 'MC-FIRST-SOUND-IS-ENOUGH',
  [
    {
      stem: 'In a word game, do "night" and "kite" rhyme, even though "night" has a silent "gh" and "kite" does not?',
      correct: 'Yes — say them aloud: both end in the same sound, /aɪt/; spelling can differ even when the sound matches',
      wrong: 'No — the spellings at the end are different, so they cannot rhyme',
    },
    {
      stem: 'A learner claims "ball" and "bell" rhyme because they both start with "b". Is that the right test for a rhyme?',
      correct: 'No — rhyme is about the ending sound; "ball" and "bell" only share their first sound, which is a different device (alliteration)',
      wrong: 'Yes — sharing the same starting sound is what makes two words rhyme',
    },
    {
      stem: 'Do "eight" and "late" rhyme, even though one ends in "-eight" and the other in "-ate"?',
      correct: 'Yes — both end in the sound /eɪt/; the spelling of the ending differs, but the sound is what counts',
      wrong: 'No — two words can only rhyme if their last letters are spelled the same way',
    },
  ],
  [
    'MC-SPELLING-MUST-MATCH, adult framing (a word game) with "night"/"kite" rather than the existing "love"/"move" example',
    'MC-FIRST-SOUND-IS-ENOUGH, re-asked with "ball"/"bell" rather than the existing "sun"/"sit"/"fun" example',
    'MC-SPELLING-MUST-MATCH, a second fresh example ("eight"/"late") forming the ladder\'s third rung',
  ],
)

const BLENDING_SEGMENTING_ADULT = adultLadder(
  'eng.phonics.blending-segmenting', 'MC-BLENDING-IS-JUST-FAST-LETTERS', 'MC-SEGMENTING-STOPS-AT-SYLLABLES',
  [
    {
      stem: "Helping a child sound out the word \"plant\": do you glide the individual sounds together — /p/-/l/-/æ/-/n/-/t/ blended smoothly — or say the letter names quickly, \"pee-el-ay-en-tee\"?",
      correct: 'Glide the sounds together smoothly — that is what blending means, not speeding up letter names',
      wrong: 'Say the letter names fast — blending is really just saying the alphabet names quickly',
    },
    {
      stem: 'Asked to segment the one-syllable word "milk" into its smallest sounds, is "mi-lk" (two chunks) the complete segmentation?',
      correct: 'No — "milk" breaks into four separate sounds, /m/-/ɪ/-/l/-/k/; segmenting goes down to individual sounds, not just syllables',
      wrong: 'Yes — one syllable can only be split once, so two chunks is as far as segmenting goes',
    },
    {
      stem: "Teaching an adult ESL learner to read \"stop\": should they glide /s/-/t/-/ɒ/-/p/ together, or recite the letter names \"ess-tee-oh-pee\" faster and faster?",
      correct: 'Glide the sounds together — blending is merging sounds smoothly, a different skill from reciting letter names quickly',
      wrong: 'Recite the letter names faster — with enough speed, the letter names become the word',
    },
  ],
  [
    'MC-BLENDING-IS-JUST-FAST-LETTERS, adult framing (helping a child) with "plant" rather than the existing "sun"/"cat" examples',
    'MC-SEGMENTING-STOPS-AT-SYLLABLES, re-asked with "milk" rather than the existing "rabbit"/"fish" examples',
    'MC-BLENDING-IS-JUST-FAST-LETTERS, a second fresh example (an adult ESL learner, "stop") forming the ladder\'s third rung',
  ],
)

const CONSONANTS_ADULT = adultLadder(
  'eng.phonics.consonants', 'MC-C-AND-G-ARE-SINGLE-SOUND-LETTERS', 'MC-EVERY-LETTER-MAKES-EXACTLY-ONE-SOUND',
  [
    {
      stem: 'Compare the "c" in "cup" with the "c" in "city". Do both make the same sound?',
      correct: 'No — "c" is hard /k/ in "cup" but soft /s/ in "city"; "c" and "g" each represent two different sounds depending on context',
      wrong: 'Yes — the letter "c" always makes the same sound no matter what follows it',
    },
    {
      stem: 'Reading the word "know" aloud, is the "k" pronounced?',
      correct: 'No — the "k" is silent in "know"; not every letter in a written word is actually pronounced',
      wrong: 'Yes — every letter in a word must be pronounced, since it is written there',
    },
    {
      stem: 'Compare the "g" in "gate" with the "g" in "giant". Same sound or different?',
      correct: 'Different — hard /g/ in "gate", soft /dʒ/ in "giant"; "g" is not a single-sound letter',
      wrong: 'The same — a consonant letter always represents one fixed sound',
    },
  ],
  [
    'MC-C-AND-G-ARE-SINGLE-SOUND-LETTERS, re-asked with "cup"/"city" rather than the existing "cent" example',
    'MC-EVERY-LETTER-MAKES-EXACTLY-ONE-SOUND, re-asked with "know" rather than the existing "write" example',
    'MC-C-AND-G-ARE-SINGLE-SOUND-LETTERS, a second fresh example ("gate"/"giant") forming the ladder\'s third rung',
  ],
)

const SHORT_VOWELS_ADULT = adultLadder(
  'eng.phonics.short-vowels', 'MC-VOWEL-LETTER-NAME-IS-THE-SOUND', 'MC-ONE-SYLLABLE-WORDS-ALWAYS-SHORT-VOWEL',
  [
    {
      stem: "Recite the alphabet name of \"e\" — \"ee\" — then say the word \"pen\" naturally. Is the vowel sound in the middle of \"pen\" the same as the letter's alphabet name?",
      correct: 'No — "pen" uses the short /ɛ/ sound, which is different from the letter name "ee"',
      wrong: 'Yes — the vowel inside a word always matches its alphabet name',
    },
    {
      stem: '"Pin" and "pine" are both one-syllable words. Do they share the same vowel sound?',
      correct: 'No — "pin" has the short /ɪ/, "pine" has the long /aɪ/ because of the silent final e; syllable count alone does not decide the vowel sound',
      wrong: "Yes — any one-syllable word uses its vowel's short sound",
    },
    {
      stem: "Say the alphabet name of \"o\" — \"oh\" — then say \"hot\" naturally. Does the vowel in \"hot\" match that letter name?",
      correct: 'No — "hot" uses the short /ɒ/ sound, distinct from the letter name "oh"',
      wrong: "Yes — a vowel letter's sound inside a word is always its alphabet name",
    },
  ],
  [
    'MC-VOWEL-LETTER-NAME-IS-THE-SOUND, re-asked with "pen" rather than the existing "cat" (native) / "cat" (ADULT explanation) examples',
    'MC-ONE-SYLLABLE-WORDS-ALWAYS-SHORT-VOWEL, re-asked with "pin"/"pine" rather than the existing "bit"/"bite" (native) / "cap"/"cape" (ADULT explanation) examples',
    'MC-VOWEL-LETTER-NAME-IS-THE-SOUND, a second fresh example ("hot") forming the ladder\'s third rung',
  ],
)

const CONSONANT_BLENDS_ADULT = adultLadder(
  'eng.phonics.consonant-blends', 'MC-BLEND-IS-ONE-FUSED-SOUND', 'MC-BLENDS-AND-DIGRAPHS-ARE-THE-SAME-THING',
  [
    {
      stem: 'Say the word "club" slowly. How many separate consonant sounds open the word?',
      correct: 'Two — /k/ then /l/, both audible; a blend keeps its component sounds, unlike a single fused sound',
      wrong: 'One — the two letters fuse into a single new sound',
    },
    {
      stem: 'Is "ch" in "chair" a blend (two sounds you can pick apart) or a digraph (one sound)?',
      correct: 'A digraph — "ch" makes one sound, /tʃ/, not /k/ followed by /h/',
      wrong: 'A blend — you can hear the "c" sound and the "h" sound separately',
    },
    {
      stem: 'Say the word "trip" slowly. Are /t/ and /r/ two distinct sounds, or one fused sound?',
      correct: 'Two distinct sounds, /t/ then /r/, both still audible — that is what makes it a blend rather than a single sound',
      wrong: 'One fused sound — combined consonant letters always merge into something new',
    },
  ],
  [
    'MC-BLEND-IS-ONE-FUSED-SOUND, re-asked with "club" rather than the existing "flag"/"stop" examples',
    'MC-BLENDS-AND-DIGRAPHS-ARE-THE-SAME-THING, re-asked with "ch" in "chair" rather than the existing "th" in "the" example',
    'MC-BLEND-IS-ONE-FUSED-SOUND, a second fresh example ("trip") forming the ladder\'s third rung',
  ],
)

const DIGRAPHS_ADULT = adultLadder(
  'eng.phonics.digraphs', 'MC-DIGRAPH-IS-A-BLEND', 'MC-VOWEL-DIGRAPHS-FOLLOW-SHORT-VOWEL-RULES',
  [
    {
      stem: 'Say "shop" naturally. Do you hear a full /s/ sound followed by a full /h/ sound, or one single sound?',
      correct: 'One single sound, /ʃ/, throughout — "sh" is a digraph, not two sounds blended together',
      wrong: 'Two separate sounds, /s/ then /h/, said quickly',
    },
    {
      stem: 'Does "oo" make the same sound in "book" as it does in "moon"?',
      correct: "No — \"book\" uses the short /ʊ/ sound while \"moon\" uses the long /uː/ sound; vowel digraphs don't always sound the same across words",
      wrong: 'Yes — a vowel team spells one fixed sound in every word it appears in',
    },
    {
      stem: 'Say "thin" naturally. Is the "th" one single sound, or two sounds said quickly one after another?',
      correct: 'One single sound, /θ/ — digraphs are always one sound, however the two letters look',
      wrong: 'Two sounds — /t/ then /h/, blended together fast',
    },
  ],
  [
    'MC-DIGRAPH-IS-A-BLEND, re-asked with "shop" rather than the existing "chip"/"ship" examples',
    'MC-VOWEL-DIGRAPHS-FOLLOW-SHORT-VOWEL-RULES, re-asked with "book"/"moon" rather than the existing "bread"/"read" example',
    'MC-DIGRAPH-IS-A-BLEND, a second fresh example ("thin") forming the ladder\'s third rung',
  ],
)

const LONG_VOWELS_SILENT_E_ADULT = adultLadder(
  'eng.phonics.long-vowels-silent-e', 'MC-SILENT-E-DOES-NOTHING', 'MC-ANY-E-AT-THE-END-MEANS-LONG-VOWEL',
  [
    {
      stem: 'What changes between "tap" and "tape", and what job does the final "e" do?',
      correct: 'The final "e" — silent itself, but it makes the earlier vowel say its long sound, /eɪ/ instead of /æ/',
      wrong: 'The final "e" does nothing at all; both words sound the same',
    },
    {
      stem: 'Does the "o" in "love" say its long sound, the way the silent-e rule would predict?',
      correct: 'No — "love" is a common exception; the vowel stays short even though the word ends in e',
      wrong: 'Yes — any word ending in "e" must have a long vowel sound',
    },
    {
      stem: 'What is the only difference between "rid" and "ride", and what does the final letter do?',
      correct: 'The final "e" — silent itself, but it shifts the vowel from short /ɪ/ to long /aɪ/',
      wrong: 'Nothing — the final "e" is decorative and has no effect on pronunciation',
    },
  ],
  [
    'MC-SILENT-E-DOES-NOTHING, re-asked with "tap"/"tape" rather than the existing "kit"/"kite" example',
    'MC-ANY-E-AT-THE-END-MEANS-LONG-VOWEL, re-asked with "love" rather than the existing "give" example',
    'MC-SILENT-E-DOES-NOTHING, a second fresh example ("rid"/"ride") forming the ladder\'s third rung',
  ],
)

const SIGHT_WORDS_ADULT = adultLadder(
  'eng.phonics.sight-words', 'MC-SIGHT-WORDS-CANNOT-BE-SOUNDED-OUT-AT-ALL', 'MC-MEMORIZING-THE-WORD-SHAPE-IS-ENOUGH',
  [
    {
      stem: 'Can the sight word "in" be sounded out using ordinary phonics rules?',
      correct: 'Yes — /ɪ/-/n/ works perfectly; "sight word" means high-frequency, not automatically irregular',
      wrong: 'No — sight words must always be memorised whole; they can never be sounded out',
    },
    {
      stem: 'A learner mixes up "form" and "from" when reading quickly. What does this suggest about relying on overall word shape alone?',
      correct: 'Word shape alone is not reliable — "form" and "from" share the same letters in a different order and can look similar at a glance',
      wrong: 'Nothing is wrong — recognising the general shape of a familiar word is a sufficient reading strategy',
    },
    {
      stem: 'Can the sight word "him" be decoded with regular phonics, or must it be memorised as a whole irregular shape?',
      correct: 'It can be decoded — /h/-/ɪ/-/m/ is fully regular; many sight words are simply common, not phonetically irregular',
      wrong: 'It must be memorised whole — sight words by definition cannot be sounded out',
    },
  ],
  [
    'MC-SIGHT-WORDS-CANNOT-BE-SOUNDED-OUT-AT-ALL, re-asked with "in" rather than the existing "at"/"and" examples',
    'MC-MEMORIZING-THE-WORD-SHAPE-IS-ENOUGH, re-asked with "form"/"from" rather than the existing "no"/"on"/"was"/"saw" examples',
    'MC-SIGHT-WORDS-CANNOT-BE-SOUNDED-OUT-AT-ALL, a second fresh example ("him") forming the ladder\'s third rung',
  ],
)

export const ENGLISH_ADULT_BAND_BATCH_1: SeedProbe[] = [
  ...PRINT_CONCEPTS_ADULT,
  ...ALPHABET_RECOGNITION_ADULT,
  ...RHYMING_ADULT,
  ...BLENDING_SEGMENTING_ADULT,
  ...CONSONANTS_ADULT,
  ...SHORT_VOWELS_ADULT,
  ...CONSONANT_BLENDS_ADULT,
  ...DIGRAPHS_ADULT,
  ...LONG_VOWELS_SILENT_E_ADULT,
  ...SIGHT_WORDS_ADULT,
]
