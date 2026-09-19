/**
 * ENGLISH ADULT-BAND PROBE-CONTRACT CAMPAIGN — Batch 19.
 *
 * ── THE GAP THIS CLOSES ─────────────────────────────────────────────────────
 * Batch 18 closed all `eng.literature.*` concepts. This batch closes all 12
 * short `eng.phonetics.*` concepts (live count matched the prior estimate
 * exactly this time — `contract-audit.ts --all` confirmed 12, not a stale
 * number): accents-and-dialects, connected-speech, consonant-sounds,
 * intonation-patterns, ipa-basics, minimal-pairs, phonetic-transcription,
 * prosody, rhythm-and-timing, sentence-stress, syllable-stress,
 * vowel-sounds. 3 new ADULT-band closed-choice probes each (36 total), the
 * bare mastery-gate contract (`correctAtCheck >= 1` + `correctAtPractice >=
 * 2` = 3, `assetContract.ts`). Remaining gap after this batch: `eng.vocab.*`
 * (9 advanced), `eng.writing.*` (9 advanced), `eng.reading.reading-across-
 * genres`, `eng.speaking.debate-skills`/`presentation-skills`, and the 2
 * EARLY-band phonics pairs excluded per Batch 13's own finding (voice-
 * required), deferred to future batches (see
 * `docs/history/subject-onboarding-and-fix-campaign.md`).
 *
 * Every distractor carries the `misconceptionId` naming it, reusing ONE of
 * each concept's own two ALREADY-REGISTERED, ALREADY-ACTIVE misconceptions
 * (verified against each concept's Blueprint Component 1 — Misconception
 * Register: every one of these 12 concepts holds exactly two — no more, no
 * fewer; no new misconception ids invented, no Educational Brain
 * authoring). As with Batch 18, several of these Blueprints label their two
 * misconceptions with bare `MC-...` headings rather than the
 * `MC-A-.../MC-B-...` convention (e.g. `connected-speech`, `consonant-
 * sounds`, `intonation-patterns`, `ipa-basics`, `minimal-pairs`, `phonetic-
 * transcription`, `prosody`, `rhythm-and-timing`, `sentence-stress`,
 * `syllable-stress`, `vowel-sounds`) — this file carries each concept's
 * exact heading text verbatim as the misconceptionId regardless. Structure
 * otherwise mirrors `englishAdultBandBatch13.ts`'s `adultLadder` helper
 * exactly: `mcq`(FOUNDATIONAL) + `misconception_probe`(DEVELOPING) +
 * `mcq`(PROFICIENT) per concept, so the ladder-aware slug resolver
 * (`buildProbeSlugResolver`) disambiguates the two `mcq` rungs by
 * difficulty without re-identifying any already-serving row. None of these
 * 12 concepts hold any existing ADULT probe today, so this is a fresh
 * singleton-to-ladder promotion within this batch only — no P-10 collision
 * risk against any pre-existing row.
 *
 * Register: adult/professional framing throughout (a call-center training
 * program, a presentation coach, a workplace rehearsal) — never
 * child-directed examples, even though phonetics terminology is inherently
 * technical regardless of register. Every worked example below is
 * deliberately DIFFERENT from the Blueprint's own Conflict Evidence /
 * Discrimination Pairs examples, so a learner who has met the explanation
 * is not simply asked to recall the identical example.
 *
 * Seeded as DRAFT-then-bootstrap-ACTIVE through the same path as every
 * other batch in this campaign: `src/instrumentation.ts`'s cold-start
 * bootstrap (English is in `BOOTSTRAP_SEED_SUBJECTS`) and
 * `scripts/brain/seed-knowledge-assets.ts`. Nothing here is a database
 * write performed by this session directly — no DATABASE_URL is available
 * here.
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

const ACCENTS_AND_DIALECTS_ADULT = adultLadder(
  'eng.phonetics.accents-and-dialects',
  'MC-A-ACCENTS-ARE-MISPRONUNCIATIONS-OR-CARELESS-SPEECH',
  'MC-B-A-STANDARD-OR-PRESTIGE-ACCENT-IS-LINGUISTICALLY-MORE-CORRECT',
  [
    {
      stem: 'A speaker of a regional variety consistently pronounces the vowel in "about" differently from a Standard American pronunciation, applying this same vowel shift predictably across dozens of similar words. Is this speaker making pronunciation mistakes?',
      correct: 'No — the vowel shift is applied consistently and predictably across many words sharing that sound pattern, which is exactly what a rule-governed feature of a different, internally consistent accent looks like, not carelessness or error',
      wrong: 'Yes — any pronunciation that differs from the standard, most widely broadcast form of English counts as a mispronunciation, regardless of how consistently it\'s applied',
    },
    {
      stem: 'A call-center training program requires employees to adopt a "neutral," broadcast-style accent, describing it as more professional and linguistically correct than employees\' own regional accents. Is the broadcast-style accent actually linguistically more correct?',
      correct: "No — neither accent contains an actual grammar or pronunciation error; the broadcast accent's higher social prestige reflects historical and social power (media, education, government), not linguistic superiority",
      wrong: 'Yes — a standard, broadcast-style accent is linguistically more correct than a regional accent, since it is the version most widely taught and used in professional contexts',
    },
    {
      stem: 'A linguist demonstrates that a speaker\'s dropped "g" sound in "-ing" words ("walkin\'," "talkin\'") appears predictably in the same phonetic environment across dozens of words in that speaker\'s variety. Does this predictability confirm the pattern is rule-governed rather than careless?',
      correct: 'Yes — a sound feature applying predictably across many different words in the same environment is exactly the test for a systematic, rule-governed accent feature, not random carelessness',
      wrong: 'No — since the sound is being dropped rather than fully pronounced, this is still evidence of careless or sloppy speech regardless of how consistently it occurs',
    },
  ],
  [
    'MC-A-ACCENTS-ARE-MISPRONUNCIATIONS-OR-CARELESS-SPEECH, fresh adult example (a regional "about" vowel shift) rather than the existing rhotic/non-rhotic "car" example',
    'MC-B-A-STANDARD-OR-PRESTIGE-ACCENT-IS-LINGUISTICALLY-MORE-CORRECT, fresh example (a call-center training program) rather than the existing generic broadcast-accent example',
    'MC-A-ACCENTS-ARE-MISPRONUNCIATIONS-OR-CARELESS-SPEECH, second fresh example (a dropped "-ing" g) forming the ladder\'s third rung',
  ],
)

const CONNECTED_SPEECH_ADULT = adultLadder(
  'eng.phonetics.connected-speech',
  'MC-CONNECTED-SPEECH-CHANGES-ARE-SLOPPY-SPEECH',
  'MC-CONNECTED-SPEECH-IS-RANDOM',
  [
    {
      stem: 'A student insists on always pronouncing "should have" as two fully separate, crisp words, even in casual conversation, believing the natural reduction to "should\'ve" is sloppy. Is this the correct standard for natural spoken English?',
      correct: 'No — connected-speech reductions like "should\'ve" are regular, rule-governed features of natural, fluent speech used by careful and casual speakers alike, not errors to eliminate; very formal speech may use the fuller form, but that doesn\'t make the reduced form sloppy',
      wrong: 'Yes — pronouncing every word in its full, separate citation form is always more correct than natural connected-speech reductions like "should\'ve"',
    },
    {
      stem: 'A student is confused by "did you" reducing to "didja" and separately confused by "got you" reducing to "gotcha," treating these as two unrelated, random things to memorize. Do both of these involve the same general type of connected-speech pattern?',
      correct: 'Yes — both involve assimilation, where a final consonant blends with a following /j/ sound in a predictable way; recognizing the shared pattern type, rather than memorizing each case in isolation, reveals the underlying system',
      wrong: 'No — since "didja" and "gotcha" involve different words, they are unrelated, random reductions with no shared underlying pattern connecting them',
    },
    {
      stem: 'A presenter deliberately uses the fuller, separated pronunciation of "want to" rather than "wanna" while giving a formal keynote speech, then reverts to natural reductions when chatting with colleagues afterward. Is switching between these two forms appropriate, rather than one being simply wrong?',
      correct: 'Yes — both the fuller citation form and the natural reduced form are legitimate, context-appropriate registers; formal speech may favor fuller forms while casual conversation naturally favors reductions, neither being inherently more correct',
      wrong: 'No — since reduced forms like "wanna" are natural in fluent speech, using the fuller "want to" form in the keynote must have been a mistake',
    },
  ],
  [
    'MC-CONNECTED-SPEECH-CHANGES-ARE-SLOPPY-SPEECH, fresh adult example ("should have"/"should\'ve") rather than the existing "want to"/"wanna" example',
    'MC-CONNECTED-SPEECH-IS-RANDOM, fresh example ("didja"/"gotcha") rather than the existing "gonna"/"gimme" example',
    'MC-CONNECTED-SPEECH-CHANGES-ARE-SLOPPY-SPEECH, second fresh example (a keynote vs. casual chat) forming the ladder\'s third rung',
  ],
)

const CONSONANT_SOUNDS_ADULT = adultLadder(
  'eng.phonetics.consonant-sounds',
  'MC-CLASSIFICATION-IS-JUST-LABELING',
  'MC-PLACE-MANNER-VOICING-ARE-INDEPENDENT',
  [
    {
      stem: 'A student is asked to classify a consonant sound from an audio recording of a language they\'ve never studied, one they haven\'t memorized a label for. Can the three-test method (locate the place, observe the manner, check voicing) still be applied to identify this unfamiliar sound?',
      correct: 'Yes — place, manner, and voicing are three physical tests that can be applied to any consonant, including ones never classified before, not a fixed list of labels that only work for previously memorized sounds',
      wrong: "No — since this sound wasn't previously drilled and labeled, there's no way to classify it without first being given its name to memorize",
    },
    {
      stem: 'A student describes a sound as simply "voiced" and stops there, believing this alone is enough to identify which specific consonant is being described. Does voicing alone fully specify a consonant?',
      correct: 'No — place, manner, and voicing are three separate dimensions that must all be combined together to uniquely identify a sound; voicing alone (or any single dimension) leaves the specific sound ambiguous among many possibilities',
      wrong: 'Yes — voicing is the single most important dimension, so stating whether a sound is voiced or voiceless is sufficient on its own to identify exactly which consonant is meant',
    },
    {
      stem: 'Presented with a click consonant from a language with no English equivalent, a student runs the place, manner, and voicing tests directly on the sound rather than searching their memory for a matching label. Is this the correct approach to a genuinely novel sound?',
      correct: 'Yes — applying the three diagnostic tests directly to any sound, rather than relying on a memorized label, is exactly the transferable skill this classification system is meant to build',
      wrong: 'No — since this sound has no equivalent in English and wasn\'t previously studied, it cannot be classified using the place/manner/voicing system at all',
    },
  ],
  [
    'MC-CLASSIFICATION-IS-JUST-LABELING, fresh adult example (an unfamiliar foreign-language recording) rather than the existing generic novel-sound example',
    'MC-PLACE-MANNER-VOICING-ARE-INDEPENDENT, fresh example ("voiced" stated alone) rather than the existing "voiceless bilabial" example',
    'MC-CLASSIFICATION-IS-JUST-LABELING, second fresh example (a click consonant) forming the ladder\'s third rung',
  ],
)

const INTONATION_PATTERNS_ADULT = adultLadder(
  'eng.phonetics.intonation-patterns',
  'MC-ALL-QUESTIONS-RISE',
  'MC-INTONATION-IS-DECORATIVE-NOT-MEANINGFUL',
  [
    {
      stem: 'A presentation coach tells a trainee to raise their pitch at the end of every question, including "Why did you leave the meeting early?" Is rising intonation correct for this wh-question in neutral speech?',
      correct: 'No — wh-questions (who, what, where, when, why, how) typically fall in neutral, unmarked speech, just like statements; only yes/no questions typically rise, so applying a rise here would sound unnatural',
      wrong: 'Yes — since it\'s a question, rising intonation at the end is the correct pattern regardless of whether it\'s a yes/no question or a wh-question',
    },
    {
      stem: 'A colleague says "That\'s fine" with falling intonation to genuinely accept a proposal, and later says the exact same words, "That\'s fine?" with rising intonation, sounding skeptical and unconvinced. Do these two utterances mean the same thing, since the words are identical?',
      correct: 'No — intonation alone, with zero change in the words, distinguishes genuine acceptance from skeptical questioning here; intonation is meaning-bearing, not merely decorative vocal style',
      wrong: 'Yes — since the words are exactly the same in both cases, the meaning must be the same regardless of whether the pitch rises or falls',
    },
    {
      stem: 'A trainee revises their delivery of "Did you finish the report?" (rising, correct for a yes/no question) and "Why did you leave early?" (falling, correct for a wh-question), applying the opposite pattern to each. Has the trainee correctly distinguished the two question types?',
      correct: 'Yes — correctly applying rising intonation to the yes/no question and falling intonation to the wh-question is exactly the distinction between the two question categories in neutral speech',
      wrong: 'No — since both sentences are questions, they should both receive the same rising intonation pattern regardless of which type of question each one is',
    },
  ],
  [
    'MC-ALL-QUESTIONS-RISE, fresh adult example ("why did you leave early?") rather than the existing "where are you going?" example',
    'MC-INTONATION-IS-DECORATIVE-NOT-MEANINGFUL, fresh example ("that\'s fine" accepted vs. questioned) rather than the existing "you\'re leaving" example',
    'MC-ALL-QUESTIONS-RISE, second fresh example (contrasting a yes/no and a wh-question) forming the ladder\'s third rung',
  ],
)

const IPA_BASICS_ADULT = adultLadder(
  'eng.phonetics.ipa-basics',
  'MC-IPA-SYMBOLS-ARE-JUST-FANCY-LETTERS',
  'MC-IPA-MATCHES-ENGLISH-SPELLING',
  [
    {
      stem: 'A student reads the IPA symbol /tʃ/ (as in "church") by sounding out "t" and then "ch" as if they were two separate English letters. Is this the correct way to interpret an IPA symbol?',
      correct: 'No — /tʃ/ is one single symbol representing one specific phoneme already known from consonant classification (the "ch" sound); IPA symbols should never be sounded out using English letter-reading habits',
      wrong: 'Yes — since IPA symbols look similar to English letters, reading them by applying familiar English letter-sound rules is the correct approach',
    },
    {
      stem: 'A student transcribing "through" (7 letters) expects the IPA transcription to also contain roughly 7 symbols, since that\'s how many letters the word has. Is this a safe expectation?',
      correct: 'No — IPA transcribes only the sounds actually spoken, completely ignoring spelling; "through" is pronounced /θruː/, just 4 symbols, since several letters are silent or combine into single sounds',
      wrong: 'Yes — since IPA is a transcription of the written word, the number of symbols should generally match the number of letters in the word being transcribed',
    },
    {
      stem: 'Presented with the symbol /ŋ/ (as in "sing"), a student recalls it represents the single sound already classified as a voiced velar nasal, rather than trying to sound out "n" and "g" separately. Is this the correct approach?',
      correct: 'Yes — treating /ŋ/ as one symbol for one already-known sound, rather than decomposing it into separate letter sounds, is exactly the correct way to read any IPA symbol',
      wrong: 'No — since /ŋ/ visually resembles a combination of "n" and "g," it should be read as those two letters\' sounds combined, the same way English spelling would suggest',
    },
  ],
  [
    'MC-IPA-SYMBOLS-ARE-JUST-FANCY-LETTERS, fresh adult example (/tʃ/ in "church") rather than the existing /ʃ/ in "ship" example',
    'MC-IPA-MATCHES-ENGLISH-SPELLING, fresh example ("through") rather than the existing "knife" example',
    'MC-IPA-SYMBOLS-ARE-JUST-FANCY-LETTERS, second fresh example (/ŋ/ in "sing") forming the ladder\'s third rung',
  ],
)

const MINIMAL_PAIRS_ADULT = adultLadder(
  'eng.phonetics.minimal-pairs',
  'MC-ANY-SIMILAR-WORDS-ARE-MINIMAL-PAIRS',
  'MC-SPELLING-DIFFERENCE-EQUALS-SOUND-DIFFERENCE',
  [
    {
      stem: 'A student calls "pin" and "bend" a minimal pair because they sound somewhat similar. Transcribed, these are /pɪn/ and /bɛnd/. Is this a true minimal pair?',
      correct: 'No — comparing the transcriptions shows they differ in the first sound, the vowel, and there\'s an extra final sound in "bend" — multiple positions differ, not exactly one, so this is not a true minimal pair',
      wrong: 'Yes — any two words that sound broadly similar to each other qualify as a minimal pair, regardless of how many individual sound positions actually differ between them',
    },
    {
      stem: 'A student assumes "write" and "right" must not be a minimal pair, reasoning that they\'re spelled quite differently. Transcribed, both are /raɪt/. Does the spelling difference mean these words have a sound difference?',
      correct: 'No — "write" and "right" are pronounced identically despite their different spelling; they are homophones with zero sound difference, which actually means they are NOT a minimal pair either (a minimal pair requires exactly one sound difference, not zero)',
      wrong: 'Yes — since "write" and "right" are spelled quite differently, they must also differ in pronunciation, which would make them a valid minimal pair once the sound difference is identified',
    },
    {
      stem: 'Checking "pin" /pɪn/ against "pen" /pɛn/, a student confirms only the vowel differs, with the first and last consonants identical in both words. Is this correctly identified as a true minimal pair?',
      correct: 'Yes — transcribing both words and confirming exactly one sound position differs, with every other sound identical, is exactly the correct test for a genuine minimal pair',
      wrong: 'No — since "pin" and "pen" are different words with different meanings, that alone is enough to disqualify them from being a minimal pair regardless of how many sounds actually differ',
    },
  ],
  [
    'MC-ANY-SIMILAR-WORDS-ARE-MINIMAL-PAIRS, fresh adult example ("pin"/"bend") rather than the existing "cat"/"bad" example',
    'MC-SPELLING-DIFFERENCE-EQUALS-SOUND-DIFFERENCE, fresh example ("write"/"right") rather than the existing "night"/"knight" example',
    'MC-ANY-SIMILAR-WORDS-ARE-MINIMAL-PAIRS, second fresh example ("pin"/"pen") forming the ladder\'s third rung',
  ],
)

const PHONETIC_TRANSCRIPTION_ADULT = adultLadder(
  'eng.phonetics.phonetic-transcription',
  'MC-TRANSCRIPTION-IS-SYMBOL-SUBSTITUTION-FOR-LETTERS',
  'MC-ONE-CORRECT-TRANSCRIPTION-EXISTS',
  [
    {
      stem: 'A student transcribes "island" by assigning a symbol to every letter, including the "s," producing an incorrect transcription with an extra sound. Saying the word aloud, is there actually an /s/ sound pronounced in "island"?',
      correct: 'No — "island" is pronounced /aɪlənd/, with the "s" being silent; transcription represents only the sounds actually spoken, not a symbol-per-letter substitution, so the silent "s" gets no symbol at all',
      wrong: 'Yes — since the written word "island" contains the letter "s," the transcription should include a corresponding symbol for it regardless of whether it\'s actually pronounced',
    },
    {
      stem: 'A student\'s transcription of "class" as /klæs/ is marked differently from a textbook\'s /klɑːs/ transcription of the same word. Does this difference mean the student\'s transcription is simply wrong?',
      correct: 'No — /klæs/ reflects General American pronunciation while /klɑːs/ reflects Received Pronunciation; both are correct transcriptions of their respective dialects, since phonetic transcription always reflects a specific accent, not one universal standard',
      wrong: "Yes — since the textbook's transcription differs from the student's, the student's transcription must contain an error and should be corrected to match the textbook exactly",
    },
    {
      stem: 'Transcribing "hour," a student first says the word aloud, notices the silent "h," and writes only the sounds actually produced. Is saying the word aloud first, rather than working from the spelling, the correct method?',
      correct: 'Yes — saying the word aloud and transcribing only the sounds actually heard, rather than mapping letters one by one, is exactly the correct transcription method',
      wrong: 'No — the correct method is to look at each written letter in turn and assign it a corresponding IPA symbol, checking afterward whether the result sounds right',
    },
  ],
  [
    'MC-TRANSCRIPTION-IS-SYMBOL-SUBSTITUTION-FOR-LETTERS, fresh adult example ("island") rather than the existing "know" example',
    'MC-ONE-CORRECT-TRANSCRIPTION-EXISTS, fresh example ("class") rather than the existing "dance" example',
    'MC-TRANSCRIPTION-IS-SYMBOL-SUBSTITUTION-FOR-LETTERS, second fresh example ("hour") forming the ladder\'s third rung',
  ],
)

const PROSODY_ADULT = adultLadder(
  'eng.phonetics.prosody',
  'MC-PROSODY-IS-JUST-INTONATION',
  'MC-PROSODY-ONLY-CONVEYS-GRAMMAR',
  [
    {
      stem: 'A student analyzes a manager\'s remark "That\'s an interesting approach" only for its rising-then-falling pitch contour, without considering which words are stressed or how the timing is paced. Does analyzing pitch contour alone capture the full prosody of the utterance?',
      correct: 'No — prosody is the integrated combination of stress, rhythm, and intonation together; analyzing pitch alone misses how stress placement and timing also shape the utterance\'s full effect, including whether "interesting" is stressed sincerely or exaggeratedly',
      wrong: 'Yes — intonation (the pitch pattern) is the complete picture of an utterance\'s prosody, so analyzing rise and fall alone is sufficient',
    },
    {
      stem: 'A student correctly identifies that a sentence is grammatically a statement based on its falling intonation, but stops there without asking whether the speaker sounds genuinely engaged or bored and dismissive. Does prosody only convey grammatical information like statement versus question?',
      correct: 'No — prosody does double duty, also independently conveying attitude and emotion (boredom, sarcasm, enthusiasm) through exaggerated pitch range, distinctive stress, or rhythm, beyond just signaling grammatical structure',
      wrong: 'Yes — prosody\'s function is limited to signaling grammatical structure, such as distinguishing a statement from a question, with no separate role in conveying attitude or emotion',
    },
    {
      stem: 'Revising their analysis of "That\'s an interesting approach," a student now notes the flat pitch range, clipped rhythm, and lack of stress on "interesting" all together suggest the manager is being dismissive rather than genuinely impressed. Has this revision correctly analyzed the utterance\'s full prosody?',
      correct: 'Yes — considering stress, rhythm, and intonation together, rather than pitch alone, is exactly the correct, integrated way to analyze prosody\'s full effect',
      wrong: "No — since the words and grammatical structure of the sentence are unchanged, adding observations about stress and rhythm doesn't add anything to the analysis",
    },
  ],
  [
    'MC-PROSODY-IS-JUST-INTONATION, fresh adult example (a manager\'s remark) rather than the existing generic sentence example',
    'MC-PROSODY-ONLY-CONVEYS-GRAMMAR, fresh example (bored vs. engaged delivery) rather than the existing sarcasm example',
    'MC-PROSODY-IS-JUST-INTONATION, second fresh example (revising the manager-remark analysis) forming the ladder\'s third rung',
  ],
)

const RHYTHM_AND_TIMING_ADULT = adultLadder(
  'eng.phonetics.rhythm-and-timing',
  'MC-EACH-SYLLABLE-TAKES-EQUAL-TIME',
  'MC-RHYTHM-IS-THE-SAME-AS-STRESS',
  [
    {
      stem: 'A non-native speaker rehearsing a presentation gives each syllable in "The dog ran to the park" exactly equal duration, producing mechanically even spacing. Does natural English rhythm work this way?',
      correct: 'No — English is a stress-timed language, where stressed syllables ("DOG," "PARK") tend to recur at roughly equal time intervals while unstressed syllables compress or stretch to fit between them, unlike syllable-timed languages where every syllable gets equal duration',
      wrong: 'Yes — natural English rhythm gives each syllable roughly equal duration regardless of which syllables are stressed, the same way some other languages work',
    },
    {
      stem: 'A coach correctly identifies which syllables are stressed in a rehearsed sentence, then assumes this identification is the same thing as having analyzed the sentence\'s rhythm. Is identifying stress the same task as identifying rhythm?',
      correct: 'No — stress identifies which syllables are emphasized, while rhythm is the distinct timing pattern this creates across the utterance, specifically how the stressed syllables recur at roughly regular intervals; rhythm is a further layer built on top of stress, not identical to it',
      wrong: "Yes — since rhythm is built from the stressed syllables, correctly identifying which syllables are stressed is the same thing as identifying the sentence's rhythm",
    },
    {
      stem: 'Comparing "The DOG ran to the PARK" (two unstressed syllables between the stresses) and "DOGS ran to PARKS" (no unstressed syllables between the stresses), a coach notes the time between the two stressed beats stays roughly similar in both. Is this consistent with English\'s stress-timed rhythm?',
      correct: "Yes — stressed syllables recurring at roughly equal time intervals regardless of how many unstressed syllables fall between them is exactly the defining feature of English's stress-timed rhythm",
      wrong: 'No — since the second sentence has fewer total syllables, the time between its stressed beats should be proportionally shorter, not roughly the same as the first sentence\'s',
    },
  ],
  [
    'MC-EACH-SYLLABLE-TAKES-EQUAL-TIME, fresh adult example ("The dog ran to the park") rather than the existing "The cat sat on the mat" example',
    'MC-RHYTHM-IS-THE-SAME-AS-STRESS, fresh example (a presentation rehearsal coach) rather than the existing generic clapping example',
    'MC-EACH-SYLLABLE-TAKES-EQUAL-TIME, second fresh example (comparing two sentences\' stressed-beat timing) forming the ladder\'s third rung',
  ],
)

const SENTENCE_STRESS_ADULT = adultLadder(
  'eng.phonetics.sentence-stress',
  'MC-EVERY-WORD-GETS-EQUAL-STRESS',
  'MC-CONTENT-FUNCTION-SPLIT-IS-FIXED-PER-WORD',
  [
    {
      stem: 'A trainee reads a sentence aloud giving every word exactly equal emphasis: "I NEED TO FINISH THE REPORT TODAY." Does natural English sentence stress work this way?',
      correct: 'No — natural English stresses content words (NEED, FINISH, REPORT, TODAY) carrying the core meaning while function words (to, the) are typically unstressed and reduced; giving every word equal stress produces unnaturally flat, robotic-sounding speech',
      wrong: 'Yes — clearly stressing every single word equally is the natural, correct pattern for delivering a sentence clearly in English',
    },
    {
      stem: 'A trainee insists the word "that" is always unstressed, since it\'s usually a function word. Compare "I don\'t like THAT" (pointing at something specific, "that" as a demonstrative pronoun carrying real meaning) with "I think that it\'s fine" ("that" as a grammatical connector). Is "that" always unstressed regardless of its grammatical role?',
      correct: 'No — the content/function classification is a strong default, not a fixed label per word; "that" as a demonstrative pronoun pointing to something specific is a content word and gets stressed, while "that" as a grammatical connector is typically unstressed',
      wrong: 'Yes — since "that" is fundamentally a function word, it should always be unstressed regardless of which grammatical role it plays in a specific sentence',
    },
    {
      stem: 'Revising the report-deadline sentence, the trainee stresses only NEED, FINISH, REPORT, and TODAY while reducing "to" and "the," producing a natural-sounding delivery. Has this revision correctly applied the content/function stress pattern?',
      correct: 'Yes — stressing the content words while reducing the function words is exactly the natural pattern that distinguishes fluent-sounding English from flat, equally-stressed delivery',
      wrong: "No — since the sentence's meaning and word choice are unchanged, varying which words receive stress doesn't actually affect how natural the delivery sounds",
    },
  ],
  [
    'MC-EVERY-WORD-GETS-EQUAL-STRESS, fresh adult example (a report-deadline sentence) rather than the existing "want to go to the store" example',
    'MC-CONTENT-FUNCTION-SPLIT-IS-FIXED-PER-WORD, fresh example ("that" as demonstrative vs. connector) rather than the existing "can" example',
    'MC-EVERY-WORD-GETS-EQUAL-STRESS, second fresh example (revising the report-deadline delivery) forming the ladder\'s third rung',
  ],
)

const SYLLABLE_STRESS_ADULT = adultLadder(
  'eng.phonetics.syllable-stress',
  'MC-STRESS-IS-JUST-LOUDNESS',
  'MC-STRESS-PATTERN-IS-FIXED-BY-SPELLING',
  [
    {
      stem: 'A trainee marks the stressed syllable in "computer" by shouting it as loud as possible: "com-PU-ter!" Does natural English stress rely primarily on loudness this way?',
      correct: 'No — stress is a bundle of cues working together (length, pitch change, and full vowel quality), with unstressed syllables often reducing to a weak schwa sound; pure loudness alone, especially shouted, sounds unnatural',
      wrong: 'Yes — increasing volume sharply on the stressed syllable is the primary, correct way natural English speakers mark stress',
    },
    {
      stem: 'A trainee assumes the word "conflict" always stresses the same syllable regardless of context, since the spelling never changes. Compare "There\'s a CONflict between the two teams" (noun) with "Their schedules conFLICT with each other" (verb). Does the spelling reliably predict where the stress falls?',
      correct: 'No — English spelling never marks stress directly, and "conflict" shifts its stress depending on whether it\'s used as a noun (first syllable) or a verb (second syllable), the same noun/verb stress-shift pattern seen in words like "record" and "present"',
      wrong: 'Yes — since "conflict" is spelled the same way in both cases, the stress pattern must also be identical regardless of whether it\'s functioning as a noun or a verb',
    },
    {
      stem: 'Revising their pronunciation of "computer," the trainee instead lengthens the middle syllable and lets its vowel stay full and clear, while reducing the final syllable\'s vowel toward a weak schwa, without any shouting. Is this the correct way to mark stress naturally?',
      correct: 'Yes — using length, pitch change, and vowel quality together, rather than loudness, is exactly the correct, natural-sounding way to produce syllable stress',
      wrong: "No — without added volume on the stressed syllable, a listener won't be able to perceive any stress at all, regardless of length or vowel quality cues",
    },
  ],
  [
    'MC-STRESS-IS-JUST-LOUDNESS, fresh adult example ("computer" shouted) rather than the existing "banana" example',
    'MC-STRESS-PATTERN-IS-FIXED-BY-SPELLING, fresh example ("conflict" noun/verb) rather than the existing "record" example',
    'MC-STRESS-IS-JUST-LOUDNESS, second fresh example (revising "computer" naturally) forming the ladder\'s third rung',
  ],
)

const VOWEL_SOUNDS_ADULT = adultLadder(
  'eng.phonetics.vowel-sounds',
  'MC-VOWELS-HAVE-NO-ARTICULATION-PLACE',
  'MC-MONOPHTHONGS-AND-DIPHTHONGS-ARE-THE-SAME',
  [
    {
      stem: 'A trainee says vowels are "just open mouth noises" with no specific tongue position, unlike consonants. Comparing "oo" as in "boot" and "ah" as in "father," is there actually a describable difference in tongue position between these two vowels?',
      correct: 'Yes — vowels have a precise articulatory description just like consonants: tongue height, tongue backness, and lip rounding; "oo" is high, back, and rounded, while "ah" is low, back, and unrounded, a real, locatable difference in tongue position',
      wrong: "No — vowels involve no specific physical positioning beyond an open mouth, so there's no real describable difference in tongue position between different vowel sounds",
    },
    {
      stem: 'A trainee stretches out the vowel in "coin" /kɔɪn/ slowly and treats it as one steady, unchanging sound the whole way through, the same way they\'d treat the vowel in "caught" /kɔːt/. Does the vowel in "coin" actually stay in one steady position?',
      correct: 'No — the vowel in "coin" is a diphthong, gliding from one tongue position toward another within the same syllable, unlike the steady, unchanging monophthong in "caught"; stretching it out slowly should reveal the tongue moving partway through',
      wrong: 'Yes — both vowels hold one steady tongue position for their entire duration, since they\'re both single vowel sounds within a syllable',
    },
    {
      stem: 'Comparing "ee" as in "see" (high, front, unrounded) and "oo" as in "boot" (high, back, rounded), a trainee notes both vowels share the same tongue height but differ in backness and rounding. Is this a correct application of the three-dimension vowel description?',
      correct: 'Yes — checking tongue height, backness, and lip rounding separately, and noting which dimensions match and which differ, is exactly the correct way to describe and compare vowel articulation',
      wrong: 'No — since both vowels are commonly described simply as "high" vowels, there is no further meaningful distinction to make between them',
    },
  ],
  [
    'MC-VOWELS-HAVE-NO-ARTICULATION-PLACE, fresh adult example ("oo" vs. "ah") rather than the existing "ee" vs. "ah" example',
    'MC-MONOPHTHONGS-AND-DIPHTHONGS-ARE-THE-SAME, fresh example ("coin" vs. "caught") rather than the existing "time" example',
    'MC-VOWELS-HAVE-NO-ARTICULATION-PLACE, second fresh example (comparing "ee" and "oo") forming the ladder\'s third rung',
  ],
)

export const ENGLISH_ADULT_BAND_BATCH_19: SeedProbe[] = [
  ...ACCENTS_AND_DIALECTS_ADULT,
  ...CONNECTED_SPEECH_ADULT,
  ...CONSONANT_SOUNDS_ADULT,
  ...INTONATION_PATTERNS_ADULT,
  ...IPA_BASICS_ADULT,
  ...MINIMAL_PAIRS_ADULT,
  ...PHONETIC_TRANSCRIPTION_ADULT,
  ...PROSODY_ADULT,
  ...RHYTHM_AND_TIMING_ADULT,
  ...SENTENCE_STRESS_ADULT,
  ...SYLLABLE_STRESS_ADULT,
  ...VOWEL_SOUNDS_ADULT,
]
