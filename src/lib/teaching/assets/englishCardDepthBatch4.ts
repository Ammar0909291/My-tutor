/**
 * ENGLISH CARD-DEPTH CAMPAIGN — Batch 4 (eng.phonetics, 14 concepts, 42 cards).
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
 * slug and abandon the live row's identity. Each phonetics concept already uses
 *   native band : mcq, misconception_probe, checkpoint, true_false
 *   ADULT       : mcq, misconception_probe
 * so the three new cards take the FREE slots:
 *   native band (HIGH, or MIDDLE for articulation-organs and speech-sounds-overview) : short_answer, fill_blank      ADULT : checkpoint
 * Serving never filters by probeKind (`probeToMcq` is the predicate), so the kind is
 * only a slot label.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedProbe } from './brainSeedAssets'

const S = 'english'
const M = GradeBand.MIDDLE
const H = GradeBand.HIGH
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


export const ENGLISH_CARD_DEPTH_BATCH_4: SeedProbe[] = [
  // ─── eng.phonetics.accents-and-dialects ──────────────────────────────────
  card('eng.phonetics.accents-and-dialects', 'short_answer', H,
    'A teacher hears a student say "fink" for "think" every time, as everyone in the student\'s neighbourhood does. What is the linguistically accurate description?',
    'A consistent, rule-governed feature of that accent, not careless speech',
    ['Careless speech that the student should simply stop', 'MC-A-ACCENTS-ARE-MISPRONUNCIATIONS-OR-CARELESS-SPEECH'],
    ['A less correct sound, because the broadcast accent is linguistically more correct', 'MC-B-A-STANDARD-OR-PRESTIGE-ACCENT-IS-LINGUISTICALLY-MORE-CORRECT'],
    'accents as systematic varieties, re-asked with th-fronting'),
  card('eng.phonetics.accents-and-dialects', 'fill_blank', H,
    'Complete the sentence: from a linguistic point of view, accents ____.',
    'are systematic varieties, and none is inherently more correct than another',
    ['are mostly mispronunciations caused by careless speech', 'MC-A-ACCENTS-ARE-MISPRONUNCIATIONS-OR-CARELESS-SPEECH'],
    ['differ in correctness, with the prestige accent the most correct', 'MC-B-A-STANDARD-OR-PRESTIGE-ACCENT-IS-LINGUISTICALLY-MORE-CORRECT'],
    'Replacement text for both misconceptions'),
  card('eng.phonetics.accents-and-dialects', 'checkpoint', A,
    'A company says callers must be answered in a "standard" accent because other accents are "sloppy" and "less correct". A linguist is consulted. Which summary of her advice is accurate?',
    'No accent is linguistically sloppy or more correct; prestige is social, not linguistic',
    ['Right: non-standard accents are mostly carelessness, and customers deserve clearer, more careful speech', 'MC-A-ACCENTS-ARE-MISPRONUNCIATIONS-OR-CARELESS-SPEECH'],
    ['Right: the prestige accent is linguistically more correct and should be required', 'MC-B-A-STANDARD-OR-PRESTIGE-ACCENT-IS-LINGUISTICALLY-MORE-CORRECT'],
    'both misconceptions, in a call-centre policy setting'),

  // ─── eng.phonetics.articulation-organs ───────────────────────────────────
  card('eng.phonetics.articulation-organs', 'short_answer', M,
    'Say "ffff" and then "vvvv". What is the difference between them?',
    '"vvvv" uses vibrating vocal cords and "ffff" does not, however loud either is',
    ['"vvvv" is simply the louder of the two sounds', 'MC-VOICED-VOICELESS-IS-VOLUME'],
    ['"vvvv" uses the tongue and "ffff" does not', 'MC-ONLY-TONGUE-MATTERS'],
    'voicing is vibration, not volume; lip and teeth do the work for /f/ and /v/'),
  card('eng.phonetics.articulation-organs', 'fill_blank', M,
    'Complete the sentence: to tell whether a sound is voiced, ____.',
    'feel for a buzz in your throat',
    ['judge whether it is loud or quiet', 'MC-VOICED-VOICELESS-IS-VOLUME'],
    ['check what your tongue is doing', 'MC-ONLY-TONGUE-MATTERS'],
    'throat/vibration test (Replacement text, MC-VOICED-VOICELESS-IS-VOLUME)'),
  card('eng.phonetics.articulation-organs', 'checkpoint', A,
    'A learner says /f/ more loudly and believes this turns it into /v/. Which statement is accurate?',
    'Loudness does not change voicing: /v/ needs vibrating vocal cords, felt at the throat',
    ['Yes: voiced sounds are simply the louder ones', 'MC-VOICED-VOICELESS-IS-VOLUME'],
    ['No: but /v/ needs a different tongue position, because the tongue is what separates sounds', 'MC-ONLY-TONGUE-MATTERS'],
    'both misconceptions, re-asked with /f/ and /v/'),

  // ─── eng.phonetics.connected-speech ──────────────────────────────────────
  card('eng.phonetics.connected-speech', 'short_answer', H,
    'On a relaxed chat show a presenter says "Whaddya think?" for "What do you think?" Which description is accurate?',
    'A normal, systematic connected-speech reduction, suited to casual speech',
    ['Sloppy speech that a careful speaker would avoid in every situation', 'MC-CONNECTED-SPEECH-CHANGES-ARE-SLOPPY-SPEECH'],
    ['A random one-off slip with no pattern behind it', 'MC-CONNECTED-SPEECH-IS-RANDOM'],
    'connected speech is systematic, re-asked with "whaddya"'),
  card('eng.phonetics.connected-speech', 'fill_blank', H,
    'Complete the sentence: forms such as "kinda" and "sorta" ____.',
    'follow general patterns of reduction and linking found in natural speech',
    ['are sloppy errors that careful speakers never make', 'MC-CONNECTED-SPEECH-CHANGES-ARE-SLOPPY-SPEECH'],
    ['are random, so each one must simply be memorised', 'MC-CONNECTED-SPEECH-IS-RANDOM'],
    'both misconceptions, stated as the principle'),
  card('eng.phonetics.connected-speech', 'checkpoint', A,
    'A language coach tells learners that linking "pick it up" as "pi-ki-tup" is lazy articulation and that each linked form is a separate irregular exception. Which assessment is best?',
    'Linking is a systematic feature of natural speech, learned as a pattern',
    ['Correct: linking is lazy speech and should be avoided', 'MC-CONNECTED-SPEECH-CHANGES-ARE-SLOPPY-SPEECH'],
    ['Partly correct: linked forms are random and must be memorised word by word', 'MC-CONNECTED-SPEECH-IS-RANDOM'],
    'both misconceptions, in a coaching setting'),

  // ─── eng.phonetics.consonant-sounds ──────────────────────────────────────
  card('eng.phonetics.consonant-sounds', 'short_answer', H,
    'A sound is described as "voiceless labiodental". Which description is complete enough to identify it as /f/?',
    '"Voiceless labiodental fricative": the manner is needed to complete the description',
    ['"Voiceless labiodental": voicing and place already identify it, so manner is optional', 'MC-PLACE-MANNER-VOICING-ARE-INDEPENDENT'],
    ['"/f/": classification only means attaching a memorised label to a known sound', 'MC-CLASSIFICATION-IS-JUST-LABELING'],
    'all three dimensions together, re-asked with /f/'),
  card('eng.phonetics.consonant-sounds', 'fill_blank', H,
    'Complete the sentence: to classify an unfamiliar consonant, ____.',
    'work out its place, manner and voicing from how it is produced',
    ['search memory for a label you have already learned for it', 'MC-CLASSIFICATION-IS-JUST-LABELING'],
    ['describe just one dimension, such as voicing, which is enough to identify it', 'MC-PLACE-MANNER-VOICING-ARE-INDEPENDENT'],
    'Replacement texts for both misconceptions'),
  card('eng.phonetics.consonant-sounds', 'checkpoint', A,
    'A student meets a consonant from a language she does not know and says, "I only know labels for English sounds." Her tutor says she can still describe it. What does the tutor mean?',
    'She can observe place, manner and voicing for any new consonant, using the same three tests',
    ['She can only classify it once she has found and memorised its label in a full reference chart of the world\'s sounds', 'MC-CLASSIFICATION-IS-JUST-LABELING'],
    ['She needs only one of the three dimensions, which will be enough to identify the sound', 'MC-PLACE-MANNER-VOICING-ARE-INDEPENDENT'],
    'both misconceptions, with an unfamiliar-language consonant'),

  // ─── eng.phonetics.intonation-patterns ───────────────────────────────────
  card('eng.phonetics.intonation-patterns', 'short_answer', H,
    'Which description fits natural, neutral speech of "What time is the meeting?" and "Is the meeting at nine?"',
    'The wh-question usually falls, and the yes/no question rises',
    ['Both rise at the end, since every question rises', 'MC-ALL-QUESTIONS-RISE'],
    ['The pitch pattern makes no difference to the meaning of either', 'MC-INTONATION-IS-DECORATIVE-NOT-MEANINGFUL'],
    'wh-questions fall, yes/no questions rise, re-asked with a meeting-time pair'),
  card('eng.phonetics.intonation-patterns', 'fill_blank', H,
    'Complete the sentence: intonation ____.',
    'carries real meaning, such as whether the speaker is stating, asking or doubting',
    ['is only decoration that does not change meaning', 'MC-INTONATION-IS-DECORATIVE-NOT-MEANINGFUL'],
    ['makes every question end on a rising pitch', 'MC-ALL-QUESTIONS-RISE'],
    'Replacement texts for both misconceptions'),
  card('eng.phonetics.intonation-patterns', 'checkpoint', A,
    'A trainee says "Okay." with a falling pitch to accept a plan and "Okay?" with a rise to check agreement. A coach claims intonation is only decoration and that every question rises anyway. Which assessment is accurate?',
    'The two "Okay" forms differ in meaning by pitch alone, and neutral wh-questions fall',
    ['The coach is right: the pitch change adds no meaning', 'MC-INTONATION-IS-DECORATIVE-NOT-MEANINGFUL'],
    ['The coach is right that every question, wh-questions included, ends on a rise, so there is nothing more to learn', 'MC-ALL-QUESTIONS-RISE'],
    'both misconceptions, with the "Okay" statement/question pair'),

  // ─── eng.phonetics.ipa-basics ────────────────────────────────────────────
  card('eng.phonetics.ipa-basics', 'short_answer', H,
    'A learner meets the symbol /ð/ in /ðɪs/ ("this"). How should it be read?',
    'As one single sound, the "th" of "this", not spelled out with English letters',
    ['As a fancy "d", so the word is read "dis"', 'MC-IPA-SYMBOLS-ARE-JUST-FANCY-LETTERS'],
    ['As the letters t-h-i-s, because IPA follows English spelling', 'MC-IPA-MATCHES-ENGLISH-SPELLING'],
    'IPA symbols stand for sounds, re-asked with /ð/'),
  card('eng.phonetics.ipa-basics', 'fill_blank', H,
    'Complete the sentence: in IPA, each symbol stands for ____.',
    'one specific sound, not a spelled letter',
    ['a fancy version of an ordinary letter', 'MC-IPA-SYMBOLS-ARE-JUST-FANCY-LETTERS'],
    ['the same letters that spell the word in English', 'MC-IPA-MATCHES-ENGLISH-SPELLING'],
    'Replacement texts for both misconceptions'),
  card('eng.phonetics.ipa-basics', 'checkpoint', A,
    'A student transcribes "phone" letter by letter, giving "ph" two symbols and the final "e" one. What is the correct way to proceed?',
    'Say it and write one symbol per sound heard, e.g. /foʊn/; silent letters get none',
    ['Keep a symbol for every letter so the transcription matches the written word', 'MC-IPA-MATCHES-ENGLISH-SPELLING'],
    ['Treat IPA symbols as fancy letters and swap them in for the English ones, one by one', 'MC-IPA-SYMBOLS-ARE-JUST-FANCY-LETTERS'],
    'both misconceptions, re-asked with "phone" (General American transcription)'),

  // ─── eng.phonetics.minimal-pairs ─────────────────────────────────────────
  card('eng.phonetics.minimal-pairs', 'short_answer', H,
    'Which pair is a true minimal pair?',
    '"sheep" /ʃiːp/ and "cheap" /tʃiːp/: only the first sound differs',
    ['"ship" /ʃɪp/ and "chop" /tʃɒp/: they sound similar overall', 'MC-ANY-SIMILAR-WORDS-ARE-MINIMAL-PAIRS'],
    ['"there" and "their": different spellings, so different sounds', 'MC-SPELLING-DIFFERENCE-EQUALS-SOUND-DIFFERENCE'],
    'exactly one sound position differs, judged from IPA not spelling'),
  card('eng.phonetics.minimal-pairs', 'fill_blank', H,
    'Complete the sentence: two words form a minimal pair when, in IPA, ____.',
    'exactly one sound differs, in the same position',
    ['they merely sound somewhat alike', 'MC-ANY-SIMILAR-WORDS-ARE-MINIMAL-PAIRS'],
    ['their spellings differ, since different letters mean different sounds', 'MC-SPELLING-DIFFERENCE-EQUALS-SOUND-DIFFERENCE'],
    'Replacement texts for both misconceptions'),
  card('eng.phonetics.minimal-pairs', 'checkpoint', A,
    'A teacher lists "bat/bet", "rain/rein" and "lock/lack" as minimal pairs for a drill. Which statement is accurate?',
    '"bat/bet" and "lock/lack" are minimal pairs; "rain/rein" are homophones',
    ['All three qualify, because minimal pairs are any words that sound similar', 'MC-ANY-SIMILAR-WORDS-ARE-MINIMAL-PAIRS'],
    ['"rain/rein" is the best example, because the different spelling proves the sounds differ', 'MC-SPELLING-DIFFERENCE-EQUALS-SOUND-DIFFERENCE'],
    'both misconceptions, with a drill list that includes a homophone pair'),

  // ─── eng.phonetics.phonetic-transcription ────────────────────────────────
  card('eng.phonetics.phonetic-transcription', 'short_answer', H,
    'An American speaker transcribes "tomato" as /təˈmeɪtoʊ/ while a British source gives /təˈmɑːtəʊ/. Who is right?',
    'Both: each transcription represents a different accent',
    ['Only one is correct; the other speaker has made a mistake', 'MC-ONE-CORRECT-TRANSCRIPTION-EXISTS'],
    ['Neither: each letter should simply be replaced by a symbol', 'MC-TRANSCRIPTION-IS-SYMBOL-SUBSTITUTION-FOR-LETTERS'],
    'accent-specific transcriptions, re-asked with "tomato"'),
  card('eng.phonetics.phonetic-transcription', 'fill_blank', H,
    'Complete the sentence: to transcribe a word, first ____.',
    'say it aloud and write one symbol for each sound you hear in your accent',
    ['replace every spelled letter with an IPA symbol', 'MC-TRANSCRIPTION-IS-SYMBOL-SUBSTITUTION-FOR-LETTERS'],
    ['look up the one correct transcription that every accent shares', 'MC-ONE-CORRECT-TRANSCRIPTION-EXISTS'],
    'Replacement texts for both misconceptions'),
  card('eng.phonetics.phonetic-transcription', 'checkpoint', A,
    'A student transcribing "daughter" writes a symbol for every letter, silent "gh" included. A classmate\'s transcription differs in the vowel because she speaks another variety. How should these be judged?',
    'The first transcribes sounds not pronounced; the vowel difference is an accent difference, not an error',
    ['The first is fine, since transcription swaps in a symbol for each letter', 'MC-TRANSCRIPTION-IS-SYMBOL-SUBSTITUTION-FOR-LETTERS'],
    ['The second is wrong, because there is only one correct transcription of any word, whatever accent the speaker has', 'MC-ONE-CORRECT-TRANSCRIPTION-EXISTS'],
    'both misconceptions, re-asked with "daughter"'),

  // ─── eng.phonetics.prosody ───────────────────────────────────────────────
  card('eng.phonetics.prosody', 'short_answer', H,
    'A speaker says "Thanks a lot" with slow timing, heavy stress on "lot" and a flat, wide pitch. Which analysis is most complete?',
    'Prosody is stress, rhythm and intonation, and here it conveys attitude, probably sarcasm',
    ['Only the intonation counts as prosody, so describing the pitch is enough', 'MC-PROSODY-IS-JUST-INTONATION'],
    ['Prosody only signals grammar, so this is simply a statement with nothing else conveyed by the speaker', 'MC-PROSODY-ONLY-CONVEYS-GRAMMAR'],
    'prosody carries attitude (WE discrimination pair), re-asked with "Thanks a lot"'),
  card('eng.phonetics.prosody', 'fill_blank', H,
    'Complete the sentence: prosody ____.',
    'combines stress, rhythm and intonation, and carries attitude as well as grammar',
    ['means intonation and nothing more', 'MC-PROSODY-IS-JUST-INTONATION'],
    ['only tells the listener which grammatical structure is used', 'MC-PROSODY-ONLY-CONVEYS-GRAMMAR'],
    'Replacement texts for both misconceptions'),
  card('eng.phonetics.prosody', 'checkpoint', A,
    'A trainee describes a colleague\'s "Great idea" only as "a falling pitch, so it is a statement". Her coach says this misses something. Which fuller analysis is best?',
    'Add the stress and timing, and ask what attitude the delivery conveys: enthusiasm or sarcasm',
    ['Add more detail about pitch alone, since prosody is intonation', 'MC-PROSODY-IS-JUST-INTONATION'],
    ['Nothing is missing: prosody only signals the grammatical type, here a statement', 'MC-PROSODY-ONLY-CONVEYS-GRAMMAR'],
    'both misconceptions, with a workplace remark'),

  // ─── eng.phonetics.rhythm-and-timing ─────────────────────────────────────
  card('eng.phonetics.rhythm-and-timing', 'short_answer', H,
    'Compare "The DOG barks" and "The DOG is BARKing at the POSTman". In natural English, what is true of the timing between stressed syllables?',
    'Stressed syllables tend to fall at regular beats, with unstressed ones squeezed or stretched between them',
    ['Every syllable takes the same length of time', 'MC-EACH-SYLLABLE-TAKES-EQUAL-TIME'],
    ['Rhythm only means which syllables are stressed, with no timing pattern between the stressed beats at all, whatever the sentence', 'MC-RHYTHM-IS-THE-SAME-AS-STRESS'],
    'stress-timing (WE-1), re-asked with a dog sentence pair'),
  card('eng.phonetics.rhythm-and-timing', 'fill_blank', H,
    'Complete the sentence: to describe rhythm you need to look at ____.',
    'how the time between stressed syllables is organised',
    ['whether every syllable has the same length', 'MC-EACH-SYLLABLE-TAKES-EQUAL-TIME'],
    ['which syllables are stressed, and nothing else', 'MC-RHYTHM-IS-THE-SAME-AS-STRESS'],
    'Replacement texts for both misconceptions'),
  card('eng.phonetics.rhythm-and-timing', 'checkpoint', A,
    'A speaker rehearses a sentence giving every syllable equal length and strong stress on the content words. A coach says it sounds robotic. Which advice is right?',
    'Let stressed syllables fall at a steady beat and compress the unstressed syllables between them',
    ['Keep every syllable the same length, since English syllables take equal time', 'MC-EACH-SYLLABLE-TAKES-EQUAL-TIME'],
    ['Stress the right syllables and nothing else needs to change, because rhythm is the same as stress', 'MC-RHYTHM-IS-THE-SAME-AS-STRESS'],
    'both misconceptions, in a coaching setting'),

  // ─── eng.phonetics.sentence-stress ───────────────────────────────────────
  card('eng.phonetics.sentence-stress', 'short_answer', H,
    '"A cup of tea" normally has an unstressed "of". How is "of" said in "Is it a cup OF tea or a cup FOR tea?"',
    'Stressed, because the speaker is contrasting it with "for"',
    ['Unstressed, because a function word is always unstressed', 'MC-CONTENT-FUNCTION-SPLIT-IS-FIXED-PER-WORD'],
    ['With the same weight as every other word, since all words are stressed equally', 'MC-EVERY-WORD-GETS-EQUAL-STRESS'],
    'content/function default and contrastive stress, re-asked with "of" vs. "for"'),
  card('eng.phonetics.sentence-stress', 'fill_blank', H,
    'Complete the sentence: in natural English a speaker normally stresses ____, and may stress others for contrast.',
    'the content words, such as nouns and main verbs',
    ['every word equally', 'MC-EVERY-WORD-GETS-EQUAL-STRESS'],
    ['only the words that are always stressed, with no exceptions in any sentence', 'MC-CONTENT-FUNCTION-SPLIT-IS-FIXED-PER-WORD'],
    'Replacement texts for both misconceptions'),
  card('eng.phonetics.sentence-stress', 'checkpoint', A,
    'A trainee reads "I NEED TO SEND THE REPORT TODAY" with equal weight on every word, and insists that "to" can never be stressed, even for contrast. Which advice is accurate?',
    'Stress content words and reduce function words, though a function word can take contrast stress',
    ['Equal weight on every word is correct, since each word matters equally', 'MC-EVERY-WORD-GETS-EQUAL-STRESS'],
    ['Right about function words: they can never take stress under any circumstances, even when the speaker contrasts them', 'MC-CONTENT-FUNCTION-SPLIT-IS-FIXED-PER-WORD'],
    'both misconceptions, in a workplace reading'),

  // ─── eng.phonetics.speech-sounds-overview ────────────────────────────────
  card('eng.phonetics.speech-sounds-overview', 'short_answer', M,
    'Which statement about speech sounds is accurate?',
    'Count them by listening, not by counting letters, and expect normal variation between speakers',
    ['The number of sounds in a word always equals its number of letters', 'MC-SOUNDS-EQUAL-LETTERS'],
    ['Each sound is a fixed unit that every speaker should produce in exactly the same way, in every accent and every word', 'MC-SPEECH-SOUNDS-ARE-FIXED-UNITS'],
    'both misconceptions, stated as a comparison of claims'),
  card('eng.phonetics.speech-sounds-overview', 'fill_blank', M,
    'Complete the sentence: the sounds of a word are found by ____.',
    'listening to how it is said, which can differ slightly between accents',
    ['counting its letters', 'MC-SOUNDS-EQUAL-LETTERS'],
    ['looking up a fixed pronunciation that every speaker uses', 'MC-SPEECH-SOUNDS-ARE-FIXED-UNITS'],
    'Replacement texts for both misconceptions'),
  card('eng.phonetics.speech-sounds-overview', 'checkpoint', A,
    'One colleague says "water" with a quick tap in the middle, another with a clear /t/. A student decides one of them has the sound wrong, and that "tax" has three sounds because it has three letters. Which correction is accurate?',
    'Both pronunciations are valid variants, and "tax" has four sounds: /t/ /æ/ /k/ /s/',
    ['One is wrong, since each sound is a fixed unit made one way, and "tax" has four sounds', 'MC-SPEECH-SOUNDS-ARE-FIXED-UNITS'],
    ['Both are valid variants, but "tax" has three sounds because it has three letters', 'MC-SOUNDS-EQUAL-LETTERS'],
    'both misconceptions; each wrong option keeps exactly one of them'),

  // ─── eng.phonetics.syllable-stress ───────────────────────────────────────
  card('eng.phonetics.syllable-stress', 'short_answer', H,
    'Which statement about the word "present" is accurate?',
    'As a noun it is stressed on the first syllable, as a verb on the second, so spelling cannot show stress',
    ['It has one fixed stress pattern, which its spelling shows, and the same pattern applies whether it is used as a noun or a verb', 'MC-STRESS-PATTERN-IS-FIXED-BY-SPELLING'],
    ['The stressed syllable is simply the one said loudest, whichever word it is', 'MC-STRESS-IS-JUST-LOUDNESS'],
    'noun/verb stress shift, re-asked with "present"'),
  card('eng.phonetics.syllable-stress', 'fill_blank', H,
    'Complete the sentence: in English, a stressed syllable is marked by ____.',
    'longer length, a pitch change and a clear vowel, not volume alone',
    ['being said louder than the others', 'MC-STRESS-IS-JUST-LOUDNESS'],
    ['its spelling, which shows which syllable is stressed', 'MC-STRESS-PATTERN-IS-FIXED-BY-SPELLING'],
    'Replacement texts for both misconceptions'),
  card('eng.phonetics.syllable-stress', 'checkpoint', A,
    'A trainee shouts the first syllable of "photograph" to mark its stress, and assumes "photographer" is stressed the same way because the spelling is almost identical. What is the accurate correction?',
    'Stress shows in length, pitch and vowel, not volume alone, and moves in "photographer" despite the spelling',
    ['Volume is what stress means, so shouting the syllable is correct', 'MC-STRESS-IS-JUST-LOUDNESS'],
    ['The pattern follows the spelling, so "photographer" stresses the same syllable as "photograph", since the two are spelled so alike', 'MC-STRESS-PATTERN-IS-FIXED-BY-SPELLING'],
    'both misconceptions, re-asked with "photograph" / "photographer"'),

  // ─── eng.phonetics.vowel-sounds ──────────────────────────────────────────
  card('eng.phonetics.vowel-sounds', 'short_answer', H,
    'Which statement about the vowels in "bee" /biː/ and "bay" /beɪ/ is accurate?',
    '"bee" holds a steady tongue position (a monophthong), while "bay" glides (a diphthong)',
    ['They differ only in loudness, since vowels have no tongue position of their own', 'MC-VOWELS-HAVE-NO-ARTICULATION-PLACE'],
    ['Both are monophthongs, since stretching a vowel never changes it', 'MC-MONOPHTHONGS-AND-DIPHTHONGS-ARE-THE-SAME'],
    'monophthong vs. diphthong with a describable tongue position, re-asked with "bee"/"bay"'),
  card('eng.phonetics.vowel-sounds', 'fill_blank', H,
    'Complete the sentence: vowels ____.',
    'have a describable tongue height, frontness and lip shape; diphthongs glide',
    ['are just open-mouth noises with no particular tongue position that anyone could describe', 'MC-VOWELS-HAVE-NO-ARTICULATION-PLACE'],
    ['never change quality while held, so monophthongs and diphthongs are the same', 'MC-MONOPHTHONGS-AND-DIPHTHONGS-ARE-THE-SAME'],
    'Replacement texts for both misconceptions'),
  card('eng.phonetics.vowel-sounds', 'checkpoint', A,
    'A student stretches the vowel in "low" (/loʊ/) and feels her tongue and lips move. She concludes vowels have no fixed place and that all vowels behave this way. Which correction is accurate?',
    '"low" glides (a diphthong); monophthongs such as /iː/ keep one steady tongue position',
    ['Right: vowels have no tongue position to describe', 'MC-VOWELS-HAVE-NO-ARTICULATION-PLACE'],
    ['Right: a vowel is a vowel, so monophthongs and diphthongs are the same, however they move', 'MC-MONOPHTHONGS-AND-DIPHTHONGS-ARE-THE-SAME'],
    'both misconceptions, re-asked with "low"'),
]
