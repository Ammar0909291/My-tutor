/**
 * ENGLISH CARD-DEPTH CAMPAIGN — Batch 5 (eng.phonics, 12 regular concepts, 36 cards).
 *
 * WHY THIS EXISTS (docs/history/learner-experience-backlog-plan-2026-10-16.md §3-§5)
 * Measured 2026-10-16: 1,493 of English's 1,501 authored cards had only TWO options,
 * so a blind guess scored ~50 %. Owner decision 3 (2026-10-07, `turnContract.
 * certifiesMastery`) makes a 2-option card practice-only once a concept holds three
 * authored cards with 3+ options — which no English concept did. Owner decision
 * (2026-10-17, "go ahead"): ADD new 3-option cards (Path A) rather than edit the
 * existing identities, so the create-only bootstrap delivers them with no content sync.
 *
 * WHAT A CARD IS HERE
 * Three options: the correct answer plus one wrong answer for EACH of the concept's
 * two registered misconceptions (ids read off the concept's own existing probes, so
 * none is invented). Every stem is a NEW worked example — none reuses a scenario the
 * concept's existing cards already ask. Facts come only from the concept's blueprint
 * (docs/curriculum/blueprints/<concept>.md — Misconception Register, Worked Examples).
 *
 * SLOTS (the P-10 constraint)
 * A (conceptId, probeKind, gradeBand) slot that already holds a probe must never gain
 * a second one: `buildProbeSlugResolver` would promote the whole slot to a 5-segment
 * slug and abandon the live row's identity. Each phonics concept already uses
 *   native band : mcq, misconception_probe, checkpoint, true_false
 *   ADULT       : mcq, misconception_probe
 * so the three new cards take the FREE slots:
 *   native band (EARLY or ELEMENTARY) : short_answer, fill_blank      ADULT : checkpoint
 * Serving never filters by probeKind (`probeToMcq` is the predicate), so the kind is
 * only a slot label.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedProbe } from './brainSeedAssets'

const S = 'english'
const EA = GradeBand.EARLY
const EL = GradeBand.ELEMENTARY
const A = GradeBand.ADULT

type Kind = 'short_answer' | 'fill_blank' | 'checkpoint'

function card(
  conceptId: string,
  kind: Kind,
  band: GradeBand,
  stem: string,
  correct: string,
  wrongA: [text: string, misconception: string],
  wrongB: [text: string, misconception: string],
  note: string,
): SeedProbe {
  const id = (m: string) => `${conceptId}:${m}`
  return {
    conceptId, subjectSlug: S, probeKind: kind, gradeBand: band,
    difficulty: kind === 'fill_blank' ? ProbeDifficulty.PROFICIENT : ProbeDifficulty.DEVELOPING,
    stem,
    choices: [
      { text: correct, isCorrect: true },
      { text: wrongA[0], isCorrect: false, misconceptionId: id(wrongA[1]) },
      { text: wrongB[0], isCorrect: false, misconceptionId: id(wrongB[1]) },
    ],
    targetedMisconceptions: [id(wrongA[1]), id(wrongB[1])],
    source: `docs/curriculum/blueprints/${conceptId}.md — Misconception Register; ${note}`,
  }
}


export const ENGLISH_CARD_DEPTH_BATCH_5: SeedProbe[] = [
  // ─── eng.phonics.alphabet-recognition ────────────────────────────────────
  card('eng.phonics.alphabet-recognition', 'short_answer', EA,
    'A friend says "D" and "d" are different letters, and that "d" and "b" are the same letter turned around. What is true?',
    '"D" and "d" are one letter in two sizes; "d" and "b" are two different letters',
    ['"D" and "d" are two different letters, because big and little look different', 'MC-CASE-ARE-DIFFERENT-LETTERS'],
    ['"d" and "b" are the same letter, only turned around so that the loop faces the other way', 'MC-SHAPE-CONFUSION-MIRROR-LETTERS'],
    'case vs. mirror letters, re-asked with D/d and d/b'),
  card('eng.phonics.alphabet-recognition', 'fill_blank', EA,
    'Complete the sentence: "p" and "q" are ____.',
    'two different letters, so check which way the loop points',
    ['the big and little forms of one letter', 'MC-CASE-ARE-DIFFERENT-LETTERS'],
    ['the same letter turned around', 'MC-SHAPE-CONFUSION-MIRROR-LETTERS'],
    'mirror-letter direction check (Replacement text, MC-SHAPE-CONFUSION-MIRROR-LETTERS)'),
  card('eng.phonics.alphabet-recognition', 'checkpoint', A,
    'An adult learner writes "bog" for "dog" and says "b" and "d" are the same letter flipped. She also thinks "e" and "E" are different letters. Which correction is accurate?',
    '"b" and "d" are different letters; "e" and "E" are one letter in two cases',
    ['"b" and "d" are different, but "e" and "E" are also two different letters', 'MC-CASE-ARE-DIFFERENT-LETTERS'],
    ['"e" and "E" are one letter, and "b" and "d" are the same letter flipped', 'MC-SHAPE-CONFUSION-MIRROR-LETTERS'],
    'both misconceptions; each wrong option keeps exactly one'),

  // ─── eng.phonics.blending-segmenting ─────────────────────────────────────
  card('eng.phonics.blending-segmenting', 'short_answer', EA,
    'A friend sounds out "dog" by saying the letter names "dee-oh-gee" quickly, and says it makes no word. What should she do?',
    'Say the sounds /d/ /o/ /g/ and glide them together, with no added "uh" sounds',
    ['Say the letter names even faster, until they turn into the word', 'MC-BLENDING-IS-JUST-FAST-LETTERS'],
    ['Stop at the syllable, since "dog" is one syllable and cannot be split any further', 'MC-SEGMENTING-STOPS-AT-SYLLABLES'],
    'blend sounds, not letter names (WE discrimination pair), re-asked with "dog"'),
  card('eng.phonics.blending-segmenting', 'fill_blank', EA,
    'Complete the sentence: after splitting "pumpkin" into "pump" and "kin", ____.',
    'keep splitting each part into its single sounds',
    ['you have finished, because the syllables are the smallest sounds', 'MC-SEGMENTING-STOPS-AT-SYLLABLES'],
    ['blend the letter names quickly to check the word', 'MC-BLENDING-IS-JUST-FAST-LETTERS'],
    'segmenting goes below the syllable (Replacement text, MC-SEGMENTING-STOPS-AT-SYLLABLES)'),
  card('eng.phonics.blending-segmenting', 'checkpoint', A,
    'Helping an adult learner read "drum", a tutor says the letter names "dee-ar-you-em" quickly. The learner still cannot say the word. What should the tutor change?',
    'Glide the sounds together: /d/ /r/ /u/ /m/, with no "uh" added',
    ['Say the letter names even faster until they merge into the word', 'MC-BLENDING-IS-JUST-FAST-LETTERS'],
    ['Split the word into syllables only, since smaller units are not needed', 'MC-SEGMENTING-STOPS-AT-SYLLABLES'],
    'both misconceptions, with an adult learner and "drum"'),

  // ─── eng.phonics.consonant-blends ────────────────────────────────────────
  card('eng.phonics.consonant-blends', 'short_answer', EL,
    'In "frog", how many consonant sounds start the word, and is "fr" a blend or a digraph?',
    'Two separate sounds, /f/ then /r/: a blend',
    ['One fused sound, /fr/, with nothing you can pick apart', 'MC-BLEND-IS-ONE-FUSED-SOUND'],
    ['One new sound, a digraph just like "ch" in "chip"', 'MC-BLENDS-AND-DIGRAPHS-ARE-THE-SAME-THING'],
    'blend = two audible sounds, re-asked with "frog"'),
  card('eng.phonics.consonant-blends', 'fill_blank', EL,
    'Complete the sentence: in a blend like "sl" in "slip", ____.',
    'you can hear both sounds, /s/ and /l/',
    ['the two sounds fuse into one', 'MC-BLEND-IS-ONE-FUSED-SOUND'],
    ['the two letters make one new sound, as in a digraph', 'MC-BLENDS-AND-DIGRAPHS-ARE-THE-SAME-THING'],
    'say it slowly test (Replacement texts for both misconceptions)'),
  card('eng.phonics.consonant-blends', 'checkpoint', A,
    'A learner says that in "brick" she hears one fused sound at the start, and that "ch" in "chin" is also a blend. Which correction is accurate?',
    '"br" is two sounds, a blend; "ch" is one sound, a digraph',
    ['"br" is one fused sound with nothing to pick apart, but "ch" is a digraph', 'MC-BLEND-IS-ONE-FUSED-SOUND'],
    ['"br" is two sounds, but "ch" is also a blend', 'MC-BLENDS-AND-DIGRAPHS-ARE-THE-SAME-THING'],
    'both misconceptions; each wrong option keeps exactly one'),

  // ─── eng.phonics.consonants ──────────────────────────────────────────────
  card('eng.phonics.consonants', 'short_answer', EL,
    'Read "cell" and "cap". What do the two "c" letters sound like?',
    '/s/ in "cell" and /k/ in "cap": the next letter helps decide',
    ['/k/ in both, because "c" always has one sound', 'MC-C-AND-G-ARE-SINGLE-SOUND-LETTERS'],
    ['/s/ in both, because every letter always makes exactly one sound', 'MC-EVERY-LETTER-MAKES-EXACTLY-ONE-SOUND'],
    'hard and soft c, re-asked with "cell" and "cap"'),
  card('eng.phonics.consonants', 'fill_blank', EL,
    'Complete the sentence: the letter "g" ____.',
    'can say /g/ as in "goat" or /j/ as in "giant", depending on the next letter',
    ['always says the one sound /g/', 'MC-C-AND-G-ARE-SINGLE-SOUND-LETTERS'],
    ['says one fixed sound, and silent letters never happen', 'MC-EVERY-LETTER-MAKES-EXACTLY-ONE-SOUND'],
    'hard and soft g (WE discrimination pair gum/gem)'),
  card('eng.phonics.consonants', 'checkpoint', A,
    'A learner reads "gym" with a hard /g/ like "gum", and pronounces the "w" in "wrap" because every letter makes exactly one sound. Which correction is accurate?',
    '"g" before "y", as in "gym", can say /j/; the "w" in "wrap" is silent, an exception',
    ['"g" always says /g/, but the "w" in "wrap" is silent', 'MC-C-AND-G-ARE-SINGLE-SOUND-LETTERS'],
    ['"g" can say /j/, but every letter is pronounced, so the "w" in "wrap" is heard', 'MC-EVERY-LETTER-MAKES-EXACTLY-ONE-SOUND'],
    'both misconceptions; each wrong option keeps exactly one'),

  // ─── eng.phonics.decoding-fluency ────────────────────────────────────────
  card('eng.phonics.decoding-fluency', 'short_answer', EL,
    'Jo reads "The dog ran to the park" with every word right but slowly, one word at a time. Mia reads it fast but skips "to". Which statement is true?',
    'Neither: fluency needs accuracy, natural pace and expression',
    ['Jo is fluent, because every one of her words was read accurately and correctly', 'MC-ACCURATE-EQUALS-FLUENT'],
    ['Mia is fluent, because speed is what fluency means', 'MC-FLUENCY-MEANS-READING-FAST-ABOVE-ALL'],
    'fluency has three parts, re-asked with Jo and Mia'),
  card('eng.phonics.decoding-fluency', 'fill_blank', EL,
    'Complete the sentence: fluent reading is ____.',
    'accurate, at a natural pace, and with expression',
    ['getting every word correct, however slowly', 'MC-ACCURATE-EQUALS-FLUENT'],
    ['reading as fast as possible', 'MC-FLUENCY-MEANS-READING-FAST-ABOVE-ALL'],
    'Replacement texts for both misconceptions'),
  card('eng.phonics.decoding-fluency', 'checkpoint', A,
    'An adult reads a safety notice perfectly accurately but at a halting pace, word by word. Her tutor says she is accurate but not yet fluent. Which view is accurate?',
    'The tutor is right: fluency needs accuracy plus natural pace and expression',
    ['Fluency just means every word was read correctly', 'MC-ACCURATE-EQUALS-FLUENT'],
    ['Fluency means reading fast above all else', 'MC-FLUENCY-MEANS-READING-FAST-ABOVE-ALL'],
    'both misconceptions, with an adult reader'),

  // ─── eng.phonics.digraphs ────────────────────────────────────────────────
  card('eng.phonics.digraphs', 'short_answer', EL,
    'Read "house", "soup" and "touch". What is true of the vowel digraph "ou"?',
    '"ou" can say different sounds, so vowel digraphs have exceptions to check',
    ['"ou" always follows the same short-vowel rule in all three words', 'MC-VOWEL-DIGRAPHS-FOLLOW-SHORT-VOWEL-RULES'],
    ['"ou" is a blend, so you hear /o/ and then /u/ each time', 'MC-DIGRAPH-IS-A-BLEND'],
    'vowel digraph variability, re-asked with house/soup/touch'),
  card('eng.phonics.digraphs', 'fill_blank', EL,
    'Complete the sentence: a digraph is two letters that make ____.',
    'one sound',
    ['two sounds said quickly, like a blend', 'MC-DIGRAPH-IS-A-BLEND'],
    ['a short vowel sound every time', 'MC-VOWEL-DIGRAPHS-FOLLOW-SHORT-VOWEL-RULES'],
    'Replacement texts for both misconceptions'),
  card('eng.phonics.digraphs', 'checkpoint', A,
    'A tutor says "th" in "thin" is /t/ then /h/ said quickly. Later the learner reads "ea" in "head" like the "ea" in "heat", because vowel teams are always regular. Which correction is accurate?',
    '"th" is one sound, /θ/; "ea" in "head" is an exception',
    ['"th" is /t/ then /h/, but "ea" can vary', 'MC-DIGRAPH-IS-A-BLEND'],
    ['"th" is one sound, and "ea" follows the same rule in every word', 'MC-VOWEL-DIGRAPHS-FOLLOW-SHORT-VOWEL-RULES'],
    'both misconceptions; each wrong option keeps exactly one'),

  // ─── eng.phonics.long-vowels-silent-e ────────────────────────────────────
  card('eng.phonics.long-vowels-silent-e', 'short_answer', EL,
    'Read "made", "tune" and "come". Which statement is right?',
    '"made" and "tune" follow the silent-e rule, but "come" is an exception',
    ['The final "e" does nothing in any of them', 'MC-SILENT-E-DOES-NOTHING'],
    ['All three have long vowels, since a final "e" always makes the vowel long', 'MC-ANY-E-AT-THE-END-MEANS-LONG-VOWEL'],
    'silent-e rule and its exceptions, re-asked with made/tune/come'),
  card('eng.phonics.long-vowels-silent-e', 'fill_blank', EL,
    'Complete the sentence: in "bike", the silent "e" ____.',
    'makes the "i" say its long name',
    ['has no job at all', 'MC-SILENT-E-DOES-NOTHING'],
    ['makes the vowel long in every word that ends with "e"', 'MC-ANY-E-AT-THE-END-MEANS-LONG-VOWEL'],
    'Replacement text, MC-SILENT-E-DOES-NOTHING'),
  card('eng.phonics.long-vowels-silent-e', 'checkpoint', A,
    'A learner reads "gone" as /goʊn/, saying a final "e" always makes the vowel long. Her tutor adds that if the "e" were removed from "note", nothing would change. Which statement is accurate?',
    'Removing the "e" turns "note" into "not" with a short vowel; "gone" is an exception to the silent-e rule',
    ['Removing the "e" changes nothing about the vowel sound', 'MC-SILENT-E-DOES-NOTHING'],
    ['"gone" follows the rule, so /goʊn/ is correct', 'MC-ANY-E-AT-THE-END-MEANS-LONG-VOWEL'],
    'both misconceptions; each wrong option keeps exactly one'),

  // ─── eng.phonics.print-concepts ──────────────────────────────────────────
  card('eng.phonics.print-concepts', 'short_answer', EA,
    'Which statement about a picture book is true?',
    'The print says the same words each time, and spaces mark where words end',
    ['The picture tells exactly what the story is, so the print is optional for the reader', 'MC-PICTURE-IS-THE-STORY'],
    ['The spaces between words are just decoration', 'MC-SPACES-ARE-DECORATION'],
    'print carries the fixed message; spaces mark words'),
  card('eng.phonics.print-concepts', 'fill_blank', EA,
    'Complete the sentence: the spaces between printed words ____.',
    'show where each word starts and ends',
    ['are just decoration with no job', 'MC-SPACES-ARE-DECORATION'],
    ['show where the picture takes over from the words', 'MC-PICTURE-IS-THE-STORY'],
    'word boundaries (Replacement text, MC-SPACES-ARE-DECORATION)'),
  card('eng.phonics.print-concepts', 'checkpoint', A,
    'An adult learner looks at a recipe card with a photo and says the photo is the recipe. She also does not see why words are separated by spaces. Which statement is accurate?',
    'The print holds the exact instructions, and spaces mark the boundaries of each word',
    ['The photo is the recipe, since a picture tells everything the print does', 'MC-PICTURE-IS-THE-STORY'],
    ['Spaces are decoration; the instructions would read the same without them', 'MC-SPACES-ARE-DECORATION'],
    'both misconceptions, with an adult learner'),

  // ─── eng.phonics.rhyming ─────────────────────────────────────────────────
  card('eng.phonics.rhyming', 'short_answer', EA,
    'Which word rhymes with "blue"?',
    '"shoe"',
    ['"blur", since it is spelled almost the same', 'MC-SPELLING-MUST-MATCH'],
    ['"bus", since it starts with the same sound "b"', 'MC-FIRST-SOUND-IS-ENOUGH'],
    'rhyme is by ear and by the ending sound, re-asked with "blue"/"shoe"'),
  card('eng.phonics.rhyming', 'fill_blank', EA,
    'Complete the sentence: two words rhyme when ____.',
    'they sound the same at the end',
    ['they are spelled the same at the end', 'MC-SPELLING-MUST-MATCH'],
    ['they start with the same sound', 'MC-FIRST-SOUND-IS-ENOUGH'],
    'Replacement texts for both misconceptions'),
  card('eng.phonics.rhyming', 'checkpoint', A,
    'In a word game a player says "cough" and "though" rhyme because both end in "-ough", and "cat" and "cow" rhyme because both start with "c". Which correction is accurate?',
    'Rhyme depends on the ending sound: neither pair rhymes',
    ['"cough" and "though" do rhyme, since rhyme follows spelling, but "cat" and "cow" do not', 'MC-SPELLING-MUST-MATCH'],
    ['"cat" and "cow" do rhyme, since the first sound is what matters, but "cough" and "though" do not', 'MC-FIRST-SOUND-IS-ENOUGH'],
    'both misconceptions; each wrong option keeps exactly one'),

  // ─── eng.phonics.short-vowels ────────────────────────────────────────────
  card('eng.phonics.short-vowels', 'short_answer', EL,
    'Which is the correct reading of "cot" and "cope"?',
    '"cot" with a short "o", and "cope" with a long "o"',
    ['"cot" with a long "o", since a vowel\'s name is its sound, and "cope" long too', 'MC-VOWEL-LETTER-NAME-IS-THE-SOUND'],
    ['"cot" short and "cope" short too, since one-syllable words have short vowels', 'MC-ONE-SYLLABLE-WORDS-ALWAYS-SHORT-VOWEL'],
    'short vowel in closed syllables; silent e changes it, re-asked with cot/cope'),
  card('eng.phonics.short-vowels', 'fill_blank', EL,
    'Complete the sentence: in a short closed word like "hen", the vowel ____.',
    'says its short sound, because no silent "e" follows',
    ['says its alphabet name', 'MC-VOWEL-LETTER-NAME-IS-THE-SOUND'],
    ['would also be short if a silent "e" were added, since it has one syllable', 'MC-ONE-SYLLABLE-WORDS-ALWAYS-SHORT-VOWEL'],
    'Replacement texts for both misconceptions'),
  card('eng.phonics.short-vowels', 'checkpoint', A,
    'A learner reads "cut" as "cute" because "u" is "you", and reads "cute" with a short "u" because it has one syllable. Which correction is accurate?',
    '"cut" has a short /ʌ/; "cute" has a silent "e", so it has the long /juː/ sound',
    ['"cut" should be read as "cute", since a vowel\'s name is its sound', 'MC-VOWEL-LETTER-NAME-IS-THE-SOUND'],
    ['"cute" keeps a short vowel, because every one-syllable word is short', 'MC-ONE-SYLLABLE-WORDS-ALWAYS-SHORT-VOWEL'],
    'both misconceptions; each wrong option keeps exactly one'),

  // ─── eng.phonics.sight-words ─────────────────────────────────────────────
  card('eng.phonics.sight-words', 'short_answer', EL,
    'A child reads "from" as "form" and says sight words cannot be sounded out anyway. What is the best advice?',
    'Look at every letter in order; many sight words, like "from", can be sounded out',
    ['Memorise the whole shape, since sight words cannot be sounded out at all, so do not try', 'MC-SIGHT-WORDS-CANNOT-BE-SOUNDED-OUT-AT-ALL'],
    ['Keep going by shape alone: if the length and outline look right, it is right', 'MC-MEMORIZING-THE-WORD-SHAPE-IS-ENOUGH'],
    'sound out first, check every letter, re-asked with "from"/"form"'),
  card('eng.phonics.sight-words', 'fill_blank', EL,
    'Complete the sentence: when you meet a sight word like "big", ____.',
    'first try sounding it out, and notice only the irregular parts',
    ['do not sound it out, because sight words never can be', 'MC-SIGHT-WORDS-CANNOT-BE-SOUNDED-OUT-AT-ALL'],
    ['just remember its length and outline', 'MC-MEMORIZING-THE-WORD-SHAPE-IS-ENOUGH'],
    'Replacement texts for both misconceptions'),
  card('eng.phonics.sight-words', 'checkpoint', A,
    'A learner confuses "trial" and "trail" when reading fast. She says she recognises words by their overall shape, and that sight words like "sit" cannot be sounded out. Which correction is accurate?',
    'Read each letter in order; "sit" is fully decodable, and shape alone confuses words with the same letters',
    ['Shape is enough once a word is memorised, though "sit" can be sounded out', 'MC-MEMORIZING-THE-WORD-SHAPE-IS-ENOUGH'],
    ['"sit" cannot be sounded out, but each letter should still be checked', 'MC-SIGHT-WORDS-CANNOT-BE-SOUNDED-OUT-AT-ALL'],
    'both misconceptions; each wrong option keeps exactly one'),

  // ─── eng.phonics.syllable-types ──────────────────────────────────────────
  card('eng.phonics.syllable-types', 'short_answer', EL,
    'How should a child read the word "robot"?',
    'Split it ro-bot: open "ro" says long "o", closed "bot" says short "o"',
    ['Split it ro-bot and read both syllables with a short "o"', 'MC-ALL-SYLLABLES-FOLLOW-THE-SAME-PATTERN'],
    ['Guess from the shape of the whole word, since long words are unpredictable', 'MC-MULTISYLLABIC-WORDS-ARE-UNPREDICTABLE'],
    'identify each syllable type, re-asked with "robot"'),
  card('eng.phonics.syllable-types', 'fill_blank', EL,
    'Complete the sentence: to read an unfamiliar long word, ____.',
    'divide it into syllables and decode each by its type',
    ['guess from its overall shape', 'MC-MULTISYLLABIC-WORDS-ARE-UNPREDICTABLE'],
    ['read every syllable with the same vowel rule', 'MC-ALL-SYLLABLES-FOLLOW-THE-SAME-PATTERN'],
    'Replacement texts for both misconceptions'),
  card('eng.phonics.syllable-types', 'checkpoint', A,
    'Reading "pilot" (pi-lot), a learner applies the short-vowel rule to both syllables and says "pillot". Which correction is accurate?',
    '"pi" is open (long vowel) and "lot" is closed (short vowel): check each type first',
    ['Her reading is right, since all syllables follow the same pattern', 'MC-ALL-SYLLABLES-FOLLOW-THE-SAME-PATTERN'],
    ['She should guess from the shape of the whole word instead, since long words are unpredictable', 'MC-MULTISYLLABIC-WORDS-ARE-UNPREDICTABLE'],
    'both misconceptions, with "pilot"'),
]
