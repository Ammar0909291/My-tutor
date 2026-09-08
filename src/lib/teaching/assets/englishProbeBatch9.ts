/**
 * ENGLISH PROBE-CONTRACT CAMPAIGN — Batch 9.
 *
 * SCOPE: closes out the remaining eng.phonetics domain (7 concepts:
 * phonetic-transcription, prosody, rhythm-and-timing, sentence-stress,
 * speech-sounds-overview, syllable-stress, vowel-sounds) + the entire
 * eng.listening domain (8 concepts) + the first 10 eng.phonics concepts
 * alphabetically (alphabet-recognition, consonant-blends, consonants,
 * decoding-fluency, digraphs, long-vowels-silent-e, print-concepts,
 * rhyming, short-vowels, sight-words) — 25 concepts total.
 *
 * eng.phonics note: this domain's 11 non-exempt concepts were flagged in
 * an earlier batch's report as "near the voice-first boundary and should
 * be inspected individually before authoring." Inspected: all 11 already
 * carry exactly 2 existing probes each (mcq + misconception_probe), both
 * genuinely closed-choice text scenarios describing sounds/letters (never
 * requiring the learner to produce audio) — the same modality this batch
 * extends. No voice-first ambiguity blocks continued closed-choice
 * authoring; only `eng.phonics.syllable-types` (the 11th) is deferred to
 * a later batch to keep this batch at exactly 25 concepts.
 *
 * All 25 re-measured at closed=2 directly from the seed corpus in git
 * before authoring (zero DB access, zero egress). Every one confirmed to
 * already carry two genuine, distinct, ACTIVE misconception ids on its
 * existing probes — the stop-condition check passed for all 25; none
 * were skipped, none required new Educational Brain authoring.
 *
 * Each concept goes straight from depth 2 to depth 4 — TWO new probes,
 * the same resilience target established across Batches 1-8.
 *
 * Probe A: probeKind 'checkpoint' (depth 3), reuses the concept's FIRST
 *   registered misconception from a fresh worked example.
 * Probe B: probeKind 'true_false' (depth 4), reuses the concept's SECOND
 *   registered misconception from a fresh worked example.
 * Both verified free (no prior 'checkpoint'/'true_false' probe) for all
 * 25 concepts before authoring, same P-10-safe technique as every prior
 * file in this campaign.
 *
 * No new misconception ids. No Educational Brain authoring. Every
 * gradeBand below is the concept's OWN native band, read off its
 * existing probes: EARLY for alphabet-recognition/print-concepts/
 * rhyming; ELEMENTARY for consonant-blends/consonants/decoding-fluency/
 * digraphs/long-vowels-silent-e/short-vowels/sight-words/active-
 * listening/following-instructions/listening-for-detail/listening-for-
 * gist; MIDDLE for speech-sounds-overview/critical-listening/
 * distinguishing-sounds-in-speech/listening-comprehension-strategies/
 * note-taking-while-listening; HIGH for phonetic-transcription/prosody/
 * rhythm-and-timing/sentence-stress/syllable-stress/vowel-sounds.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedProbe } from './brainSeedAssets'

const S = 'english'
const src = (concept: string, what: string) =>
  `docs/curriculum/blueprints/${concept}.md — Misconception Registry; ${what}`

function probe(
  conceptId: string,
  kind: 'checkpoint' | 'true_false',
  band: GradeBand,
  stem: string,
  correct: string,
  wrong: string,
  misconceptionId: string,
  note: string,
): SeedProbe {
  return {
    conceptId, subjectSlug: S, probeKind: kind,
    gradeBand: band,
    difficulty: kind === 'checkpoint' ? ProbeDifficulty.DEVELOPING : ProbeDifficulty.PROFICIENT,
    stem,
    choices: [
      { text: correct, isCorrect: true },
      { text: wrong, isCorrect: false, misconceptionId },
    ],
    targetedMisconceptions: [misconceptionId],
    source: src(conceptId, note),
  }
}

const EA = GradeBand.EARLY
const EL = GradeBand.ELEMENTARY
const M = GradeBand.MIDDLE
const H = GradeBand.HIGH

export const ENGLISH_PROBE_BATCH_9: SeedProbe[] = [
  // ─── eng.phonetics.phonetic-transcription (HIGH) ────────────────────────
  probe('eng.phonetics.phonetic-transcription', 'checkpoint', H,
    'The word "schedule" has 8 letters. Should its IPA transcription have 8 symbols, one per letter?',
    "No — transcription represents sounds, not letters; the symbol count reflects the sounds actually spoken, not the letter count",
    'Yes — transcription is symbol substitution for letters',
    'eng.phonetics.phonetic-transcription:MC-TRANSCRIPTION-IS-SYMBOL-SUBSTITUTION-FOR-LETTERS',
    'MC-TRANSCRIPTION-IS-SYMBOL-SUBSTITUTION-FOR-LETTERS, re-asked with the "schedule" example rather than the existing "know" example'),
  probe('eng.phonetics.phonetic-transcription', 'true_false', H,
    '"Either" is transcribed /ˈiːðər/ by one source and /ˈaɪðər/ by another. Must one of these be wrong?',
    'No — transcription always reflects a specific dialect; both are correct for their respective varieties',
    'Yes — one correct transcription exists for every word',
    'eng.phonetics.phonetic-transcription:MC-ONE-CORRECT-TRANSCRIPTION-EXISTS',
    'MC-ONE-CORRECT-TRANSCRIPTION-EXISTS, re-asked with the "either" example rather than the existing "dance" example'),

  // ─── eng.phonetics.prosody (HIGH) ────────────────────────────────────────
  probe('eng.phonetics.prosody', 'checkpoint', H,
    "You described a sentence's prosody by only naming which syllables are stressed. Is that a complete prosodic analysis?",
    'No — prosody combines stress, rhythm, AND intonation together; stress alone is only one of three parts',
    'Yes — prosody is just stress placement',
    'eng.phonetics.prosody:MC-PROSODY-IS-JUST-INTONATION',
    'MC-PROSODY-IS-JUST-INTONATION, re-asked with a stress-only description rather than the existing pitch-pattern-only example'),
  probe('eng.phonetics.prosody', 'true_false', H,
    "You identified that a sentence is grammatically a question based on its rising intonation. Have you fully analyzed its prosody?",
    'No — prosody also conveys attitude, like sarcasm or boredom; grammar is only one of its two roles',
    'Yes — prosody only conveys grammar',
    'eng.phonetics.prosody:MC-PROSODY-ONLY-CONVEYS-GRAMMAR',
    'MC-PROSODY-ONLY-CONVEYS-GRAMMAR, re-asked with a rising-intonation-question example rather than the existing falling-intonation-statement example'),

  // ─── eng.phonetics.rhythm-and-timing (HIGH) ──────────────────────────────
  probe('eng.phonetics.rhythm-and-timing', 'checkpoint', H,
    '"The BOY ate the CAKE" has few unstressed syllables between the stresses; "The BOY who was hungry ate the CAKE" has several more. Does the time between "BOY" and "CAKE" stay the same in natural speech either way?',
    'Yes — English is stress-timed, so the unstressed syllables compress or stretch to keep the stressed beats at roughly regular intervals',
    'No — more unstressed syllables must make the gap between stresses proportionally longer',
    'eng.phonetics.rhythm-and-timing:MC-EACH-SYLLABLE-TAKES-EQUAL-TIME',
    'MC-EACH-SYLLABLE-TAKES-EQUAL-TIME, re-asked with the "BOY...CAKE" stress-interval example rather than the existing "CAT sat on MAT" example'),
  probe('eng.phonetics.rhythm-and-timing', 'true_false', H,
    "You marked which words in a sentence carry stress. Is that the same thing as describing the sentence's rhythm?",
    'No — rhythm is the timing pattern this creates across the utterance, a distinct temporal layer built on top of, but not identical to, stress placement',
    'Yes — marking stressed words fully describes rhythm',
    'eng.phonetics.rhythm-and-timing:MC-RHYTHM-IS-THE-SAME-AS-STRESS',
    'MC-RHYTHM-IS-THE-SAME-AS-STRESS, re-asked with a marked-stressed-words framing rather than the existing identified-stressed-syllables framing'),

  // ─── eng.phonetics.sentence-stress (HIGH) ────────────────────────────────
  probe('eng.phonetics.sentence-stress', 'checkpoint', H,
    'Should every word in "She is going to the park" get equal stress and emphasis when spoken naturally?',
    'No — content words like "GOing" and "PARK" are stressed while function words are reduced',
    'Yes — every word gets equal stress',
    'eng.phonetics.sentence-stress:MC-EVERY-WORD-GETS-EQUAL-STRESS',
    'MC-EVERY-WORD-GETS-EQUAL-STRESS, re-asked with the "She is going to the park" example rather than the existing "I want to go to the store" example'),
  probe('eng.phonetics.sentence-stress', 'true_false', H,
    '"Of" is usually unstressed as a function word ("a cup of tea"). Is a word\'s content/function stress status always fixed, no matter the sentence?',
    'No — grammatical role and emphatic intent can shift stress; "I said OF, not FOR" stresses "of" for contrastive emphasis',
    'Yes — the content/function split is fixed per word',
    'eng.phonetics.sentence-stress:MC-CONTENT-FUNCTION-SPLIT-IS-FIXED-PER-WORD',
    'MC-CONTENT-FUNCTION-SPLIT-IS-FIXED-PER-WORD, re-asked with the "of" contrastive-emphasis example rather than the existing "can" example'),

  // ─── eng.phonetics.speech-sounds-overview (MIDDLE) ───────────────────────
  probe('eng.phonetics.speech-sounds-overview', 'checkpoint', M,
    'Does the word "though" have the same number of letters as sounds?',
    'No — "though" has 6 letters but only 3 sounds, since several letters combine into single sounds',
    'Yes — the number of letters always equals the number of sounds',
    'eng.phonetics.speech-sounds-overview:MC-SOUNDS-EQUAL-LETTERS',
    'MC-SOUNDS-EQUAL-LETTERS, re-asked with the "though" example rather than the existing "ship" example'),
  probe('eng.phonetics.speech-sounds-overview', 'true_false', M,
    'Two people from different English-speaking regions pronounce the vowel in "bath" slightly differently. Is one of them speaking incorrectly?',
    'No — both are real, valid dialect variations of the same sound, not an error',
    'Yes — there is only one correct way to pronounce each sound',
    'eng.phonetics.speech-sounds-overview:MC-SPEECH-SOUNDS-ARE-FIXED-UNITS',
    'MC-SPEECH-SOUNDS-ARE-FIXED-UNITS, re-asked with the "bath"-vowel example rather than the existing "butter" example'),

  // ─── eng.phonetics.syllable-stress (HIGH) ────────────────────────────────
  probe('eng.phonetics.syllable-stress', 'checkpoint', H,
    'A speaker says a syllable louder but keeps the pitch completely flat and the vowel unchanged. Does volume alone make it sound naturally stressed?',
    'No — stress combines length, pitch, and vowel quality; volume alone sounds robotic',
    'Yes — stress is just loudness',
    'eng.phonetics.syllable-stress:MC-STRESS-IS-JUST-LOUDNESS',
    'MC-STRESS-IS-JUST-LOUDNESS, re-asked with a flat-pitch-louder-volume example rather than the existing generic "is stress marked by loudness" framing'),
  probe('eng.phonetics.syllable-stress', 'true_false', H,
    '"CONtent" (satisfied, adjective) and "conTENT" (subject matter, noun) are spelled identically but stressed differently. Does English spelling reliably fix a word\'s stress pattern?',
    'No — spelling never marks stress; it must be learned by ear or reference, though patterns like this shift do exist',
    'Yes — stress pattern is fixed by spelling',
    'eng.phonetics.syllable-stress:MC-STRESS-PATTERN-IS-FIXED-BY-SPELLING',
    'MC-STRESS-PATTERN-IS-FIXED-BY-SPELLING, re-asked with the "CONtent"/"conTENT" example rather than the existing "REcord"/"reCORD" example'),

  // ─── eng.phonetics.vowel-sounds (HIGH) ───────────────────────────────────
  probe('eng.phonetics.vowel-sounds', 'checkpoint', H,
    'Comparing the vowel in "beat" to the vowel in "boot," is there a specific, describable tongue position for each, or are they just interchangeable "open mouth noises"?',
    'Each has a specific, describable tongue position — "beat" is high and front, "boot" is high and back — even without a closure like consonants have',
    'Vowels have no articulation place at all, so the two are not really distinguishable',
    'eng.phonetics.vowel-sounds:MC-VOWELS-HAVE-NO-ARTICULATION-PLACE',
    'MC-VOWELS-HAVE-NO-ARTICULATION-PLACE, re-asked with the "beat"/"boot" comparison rather than the existing generic "open mouth noises" framing'),
  probe('eng.phonetics.vowel-sounds', 'true_false', H,
    'If you stretch out the vowel in "boy" slowly, does your tongue position stay exactly the same the whole time?',
    'No — it glides from one position toward another; "boy" contains a diphthong, not a static monophthong',
    'Yes — monophthongs and diphthongs are the same thing, both just one steady vowel sound',
    'eng.phonetics.vowel-sounds:MC-MONOPHTHONGS-AND-DIPHTHONGS-ARE-THE-SAME',
    'MC-MONOPHTHONGS-AND-DIPHTHONGS-ARE-THE-SAME, re-asked with the "boy" example rather than the existing "time" example'),

  // ─── eng.listening.active-listening (ELEMENTARY) ─────────────────────────
  probe('eng.listening.active-listening', 'checkpoint', EL,
    'A listener can recite the exact sentence a speaker just said, word for word, but cannot answer a simple follow-up question about it. Were they actively listening?',
    'No — reciting the words back is not the same as actively attending to and processing the meaning',
    'Yes — reciting every word back means they were listening',
    'eng.listening.active-listening:MC-HEARING-EQUALS-LISTENING',
    'MC-HEARING-EQUALS-LISTENING, re-asked with a word-for-word recitation example rather than the existing repeat-back-words example'),
  probe('eng.listening.active-listening', 'true_false', EL,
    'A listener maintains eye contact and asks a brief clarifying question mid-conversation. Is this good active listening, or a rude interruption?',
    'Good active listening — appropriate engagement like eye contact and clarifying questions supports understanding, not interrupts it',
    'A rude interruption — active listening means staying completely silent',
    'eng.listening.active-listening:MC-ACTIVE-LISTENING-MEANS-STAYING-SILENT',
    'MC-ACTIVE-LISTENING-MEANS-STAYING-SILENT, re-asked with an eye-contact-plus-clarifying-question example rather than the existing silent-and-still example'),

  // ─── eng.listening.critical-listening (MIDDLE) ───────────────────────────
  probe('eng.listening.critical-listening', 'checkpoint', M,
    'Speaker C repeats the same claim loudly and passionately three times with no evidence. Speaker D speaks quietly but cites two independent sources. Whose argument is actually better supported?',
    'Speaker D — evaluate the evidence and reasoning, not the volume or passion of the delivery',
    'Speaker C — repeating a claim passionately makes it more convincing',
    'eng.listening.critical-listening:MC-A-A-CONFIDENT-FLUENT-SPEAKER-IS-MAKING-A-STRONGER-ARGUMENT',
    'MC-A-..., re-asked with a repeated-passionate-claim-vs-cited-sources example rather than the existing confident-anecdote-vs-hesitant-study example'),
  probe('eng.listening.critical-listening', 'true_false', M,
    'A salesperson says "thousands of happy customers" to support a claim. An analyst cites a specific, verifiable statistic to support a similar claim. Are these two pieces of evidence equally strong?',
    'No — a vague, unverifiable claim is far weaker evidence than a specific, checkable statistic; evaluate the evidence itself, not just whether something was mentioned',
    'Yes — both speakers offered evidence, so both claims are equally supported',
    'eng.listening.critical-listening:MC-B-ANY-EVIDENCE-A-SPEAKER-MENTIONS-PROVES-THEIR-POINT-EQUALLY-WELL',
    'MC-B-..., re-asked with the salesperson/analyst example rather than the existing neighbor-anecdote/peer-reviewed-study example'),

  // ─── eng.listening.distinguishing-sounds-in-speech (MIDDLE) ─────────────
  probe('eng.listening.distinguishing-sounds-in-speech', 'checkpoint', M,
    '"I need a pen/pin from the supply cabinet," said in an office where either word could plausibly fit the request. Can context alone tell you which word was said?',
    'No — context is ambiguous here; you need to actually hear the phonetic contrast between the two words',
    'Yes — sentence context always lets you tell similar-sounding words apart',
    'eng.listening.distinguishing-sounds-in-speech:MC-A-YOU-CAN-ALWAYS-TELL-SIMILAR-SOUNDING-WORDS-APART-JUST-BY-USING-SENTENCE-CONTEXT',
    'MC-A-..., re-asked with the "pen/pin" office-supply example rather than the existing "ship/sheep" foggy-harbor example'),
  probe('eng.listening.distinguishing-sounds-in-speech', 'true_false', M,
    'You can clearly distinguish "bit" and "beat" when each is said slowly and separately. Will you automatically distinguish them in fast, natural conversation?',
    'No — connected, fast speech can blur the contrast; this needs separate, dedicated practice',
    "Yes — if you can hear the difference in isolation, you'll automatically hear it in fast speech too",
    'eng.listening.distinguishing-sounds-in-speech:MC-B-IF-YOU-CAN-DISTINGUISH-A-MINIMAL-PAIR-IN-CAREFUL-ISOLATED-SPEECH-YOULL-AUTOMATICALLY-DISTINGUISH-IT-IN-FAST-CONNECTED-SPEECH',
    'MC-B-..., re-asked with the "bit"/"beat" example rather than the existing "ship"/"sheep" example'),

  // ─── eng.listening.following-instructions (ELEMENTARY) ──────────────────
  probe('eng.listening.following-instructions', 'checkpoint', EL,
    '"Put the pencil in the box, but first sharpen it." Should you begin as soon as you hear "put the pencil in the box"?',
    "No — listen to the whole instruction first; starting early would mean putting the pencil away unsharpened",
    'Yes — acting immediately on the first instruction heard is the right approach',
    'eng.listening.following-instructions:MC-A-ACTING-IMMEDIATELY-ON-THE-FIRST-INSTRUCTION-HEARD-IS-THE-RIGHT-APPROACH',
    'MC-A-..., re-asked with the "put the pencil in the box, but first sharpen it" example rather than the existing generic multi-step example'),
  probe('eng.listening.following-instructions', 'true_false', EL,
    '"After you finish your homework, take out the trash." Which action should happen first?',
    'Finish your homework — "after" means the trash comes second, despite being mentioned second in the sentence',
    'Take out the trash — it was mentioned second, so the order stays as heard',
    'eng.listening.following-instructions:MC-B-INSTRUCTIONS-ARE-ALWAYS-EXECUTED-IN-THE-SAME-ORDER-THEY-ARE-MENTIONED',
    'MC-B-..., re-asked with the "after you finish your homework" example rather than the existing "before you close the window" example'),

  // ─── eng.listening.listening-comprehension-strategies (MIDDLE) ──────────
  probe('eng.listening.listening-comprehension-strategies', 'checkpoint', M,
    'A listener hears an unfamiliar technical term in a lecture and stops taking notes for the rest of the talk while trying to figure it out. Was this the better strategy compared to guessing from context and continuing?',
    'No — making a quick contextual guess and continuing to listen usually leads to better overall understanding',
    'Yes — good listeners must understand every word perfectly the first time',
    'eng.listening.listening-comprehension-strategies:MC-A-GOOD-LISTENERS-UNDERSTAND-EVERY-WORD-PERFECTLY-THE-FIRST-TIME',
    'MC-A-..., re-asked with the unfamiliar-technical-term-in-a-lecture example rather than the existing generic freeze example'),
  probe('eng.listening.listening-comprehension-strategies', 'true_false', M,
    'A listener predicted the speaker would conclude positively, but the speaker actually ended on a cautionary note. Does this wrong prediction mean the strategy failed?',
    'No — a prediction is a revisable hypothesis; update it when new information contradicts it, rather than treating it as a failure',
    'Yes — predicting what comes next means you must guess randomly or assume you are always right',
    'eng.listening.listening-comprehension-strategies:MC-B-PREDICTING-WHAT-COMES-NEXT-MEANS-GUESSING-RANDOMLY-OR-JUST-ASSUMING-YOURE-RIGHT',
    'MC-B-..., re-asked with the positive-vs-cautionary-conclusion example rather than the existing generic wrong-prediction example'),

  // ─── eng.listening.listening-for-detail (ELEMENTARY) ─────────────────────
  probe('eng.listening.listening-for-detail', 'checkpoint', EL,
    'You need the price of a specific item from a longer store announcement. Should you try to catch every word, or focus only on the price?',
    'Focus only on the price — decide what you need before listening and let the rest pass',
    'Try to catch every single word to be safe',
    'eng.listening.listening-for-detail:MC-LISTENING-FOR-DETAIL-MEANS-TRYING-TO-CATCH-EVERY-WORD',
    'MC-LISTENING-FOR-DETAIL-MEANS-TRYING-TO-CATCH-EVERY-WORD, re-asked with the store-announcement-price example rather than the existing museum-tour-time example'),
  probe('eng.listening.listening-for-detail', 'true_false', EL,
    'A passage asks for 4 details (a date, a place, a time, a price). You caught 3 of the 4. Should you report the 3 you caught, or refuse to answer since you missed one?',
    'Report the 3 you caught — missing one detail does not erase what you caught for the others',
    'Refuse to answer anything, since missing one detail means the whole task failed',
    'eng.listening.listening-for-detail:MC-IF-YOU-MISS-ONE-DETAIL-THE-WHOLE-LISTENING-TASK-FAILED',
    'MC-IF-YOU-MISS-ONE-DETAIL-THE-WHOLE-LISTENING-TASK-FAILED, re-asked with a 4-detail/3-caught example rather than the existing 3-detail/2-caught example'),

  // ─── eng.listening.listening-for-gist (ELEMENTARY) ───────────────────────
  probe('eng.listening.listening-for-gist', 'checkpoint', EL,
    'A listener catches the words "meeting," "postponed," and "Friday" in an announcement but misses several connecting words. Can they understand the gist?',
    'Yes — key content words are often enough to grasp the general topic',
    'No — missing any word means you cannot understand the gist at all',
    'eng.listening.listening-for-gist:MC-MUST-UNDERSTAND-EVERY-WORD-TO-UNDERSTAND-THE-GIST',
    'MC-MUST-UNDERSTAND-EVERY-WORD-TO-UNDERSTAND-THE-GIST, re-asked with the "meeting/postponed/Friday" example rather than the existing "weather/rain/tomorrow" example'),
  probe('eng.listening.listening-for-gist', 'true_false', EL,
    "Do experienced conference interpreters ever use gist listening to preview an upcoming speaker's topic, or is that only for beginners who can't listen for detail?",
    'Skilled listeners, including experienced interpreters, deliberately use gist listening too, to preview content and decide what deserves attention',
    'Gist listening is a lower skill only needed by weaker listeners',
    'eng.listening.listening-for-gist:MC-GIST-LISTENING-IS-A-LOWER-SKILL-THAN-DETAILED-LISTENING',
    'MC-GIST-LISTENING-IS-A-LOWER-SKILL-THAN-DETAILED-LISTENING, re-asked with the conference-interpreter example rather than the existing generic "skilled listeners" example'),

  // ─── eng.listening.note-taking-while-listening (MIDDLE) ─────────────────
  probe('eng.listening.note-taking-while-listening', 'checkpoint', M,
    'While listening, should you write "the population increased by two million people over the past decade mainly due to migration" in full, or "pop +2M/decade ← migration"?',
    '"pop +2M/decade ← migration" — brief abbreviated notes keep you ready for the next point',
    'The full sentence — good notes mean writing down as much as possible word-for-word',
    'eng.listening.note-taking-while-listening:MC-A-GOOD-NOTES-MEANS-WRITING-DOWN-AS-MUCH-AS-POSSIBLE-WORD-FOR-WORD',
    'MC-A-..., re-asked with the population/migration example rather than the existing economy/consumer-spending example'),
  probe('eng.listening.note-taking-while-listening', 'true_false', M,
    'A speaker says "Although... on the other hand... in conclusion...". Should your notes ignore these words and just list facts, or capture them to show structure?',
    'Capture the structural signal words — they show how the ideas actually relate to each other',
    'Ignore them — note-taking is just writing down facts as they come up, with no structure needed',
    'eng.listening.note-taking-while-listening:MC-B-NOTE-TAKING-IS-JUST-WRITING-DOWN-RANDOM-FACTS-AS-THEY-COME-UP-WITH-NO-STRUCTURE',
    'MC-B-..., re-asked with "Although... on the other hand... in conclusion" rather than the existing "First... however... but the most important factor" example'),

  // ─── eng.phonics.alphabet-recognition (EARLY) ────────────────────────────
  probe('eng.phonics.alphabet-recognition', 'checkpoint', EA,
    'Here is a big "T" and a little "t". Are they the same letter, or two different letters?',
    'The same letter — same name and sound, just two different "costumes"',
    'Two different letters, because they look different',
    'eng.phonics.alphabet-recognition:MC-CASE-ARE-DIFFERENT-LETTERS',
    'MC-CASE-ARE-DIFFERENT-LETTERS, re-asked with "Tt" rather than the existing "Mm" example'),
  probe('eng.phonics.alphabet-recognition', 'true_false', EA,
    'Is this letter "p" or "q"? [shows a letter with the loop on the left side]',
    '"q" — the loop points left with the stick going down, unlike "p" whose loop is on the right',
    '"p" — it has a loop and a stick, so it must be "p"',
    'eng.phonics.alphabet-recognition:MC-SHAPE-CONFUSION-MIRROR-LETTERS',
    'MC-SHAPE-CONFUSION-MIRROR-LETTERS, re-asked with "p/q" rather than the existing "b/d" example'),

  // ─── eng.phonics.consonant-blends (ELEMENTARY) ───────────────────────────
  probe('eng.phonics.consonant-blends', 'checkpoint', EL,
    'Say "flag" slowly. How many separate consonant sounds do you hear at the start?',
    'Two — /f/ then /l/, both fully pronounced',
    'One fused sound',
    'eng.phonics.consonant-blends:MC-BLEND-IS-ONE-FUSED-SOUND',
    'MC-BLEND-IS-ONE-FUSED-SOUND, re-asked with "flag" rather than the existing "stop" example'),
  probe('eng.phonics.consonant-blends', 'true_false', EL,
    'Is "th" in "the" a blend (two sounds) or a digraph (one sound)?',
    'A digraph — it is one single sound, /ð/, not /t/ followed by /h/',
    'A blend — you can hear /t/ then /h/ separately',
    'eng.phonics.consonant-blends:MC-BLENDS-AND-DIGRAPHS-ARE-THE-SAME-THING',
    'MC-BLENDS-AND-DIGRAPHS-ARE-THE-SAME-THING, re-asked with "th" in "the" rather than the existing "sh" in "ship" example'),

  // ─── eng.phonics.consonants (ELEMENTARY) ─────────────────────────────────
  probe('eng.phonics.consonants', 'checkpoint', EL,
    'What sound does "g" make in "gem"?',
    'A soft /dʒ/ sound — "g" before e, i, or y is often soft',
    'A hard /g/ sound — "g" always makes the same sound',
    'eng.phonics.consonants:MC-C-AND-G-ARE-SINGLE-SOUND-LETTERS',
    'MC-C-AND-G-ARE-SINGLE-SOUND-LETTERS, re-asked with "gem" rather than the existing "cent" example'),
  probe('eng.phonics.consonants', 'true_false', EL,
    'Do you hear a /w/ sound at the start of "write" when you say it naturally?',
    'No — the "w" is silent; the word starts right on the /r/ sound',
    'Yes — every letter must make its own sound, so the "w" must be pronounced',
    'eng.phonics.consonants:MC-EVERY-LETTER-MAKES-EXACTLY-ONE-SOUND',
    'MC-EVERY-LETTER-MAKES-EXACTLY-ONE-SOUND, re-asked with "write" rather than the existing "knife" example'),

  // ─── eng.phonics.decoding-fluency (ELEMENTARY) ───────────────────────────
  probe('eng.phonics.decoding-fluency', 'checkpoint', EL,
    'A student reads with great speed and expression, but mispronounces several words along the way. Is this fluent reading?',
    'No — fluency needs accuracy, automaticity, AND expression together, not speed and expression alone',
    'Yes — reading fast and with expression is the whole goal of fluent reading',
    'eng.phonics.decoding-fluency:MC-ACCURATE-EQUALS-FLUENT',
    'MC-ACCURATE-EQUALS-FLUENT, re-asked with the fast-and-expressive-but-inaccurate example rather than the existing accurate-but-slow example'),
  probe('eng.phonics.decoding-fluency', 'true_false', EL,
    'A student reads at a natural pace, getting every word right, but in a flat monotone with no phrasing at all. Is this fluent reading?',
    'No — expression and phrasing matter too; accuracy and pace alone are not the whole picture',
    'Yes — reading fast and accurately is the main sign of fluency',
    'eng.phonics.decoding-fluency:MC-FLUENCY-MEANS-READING-FAST-ABOVE-ALL',
    'MC-FLUENCY-MEANS-READING-FAST-ABOVE-ALL, re-asked with the accurate-but-flat-monotone example rather than the existing fast-but-skips-words example'),

  // ─── eng.phonics.digraphs (ELEMENTARY) ───────────────────────────────────
  probe('eng.phonics.digraphs', 'checkpoint', EL,
    'Say "chip" naturally. Do you hear a full /t/ sound followed by a full /h/ sound, or one single sound?',
    'One single sound, /tʃ/, the whole time',
    'Two separate sounds, /t/ then /h/',
    'eng.phonics.digraphs:MC-DIGRAPH-IS-A-BLEND',
    'MC-DIGRAPH-IS-A-BLEND, re-asked with "chip" rather than the existing "ship" example'),
  probe('eng.phonics.digraphs', 'true_false', EL,
    'Does "ea" make the same sound in "bread" as it does in "read" (as in, "I read the book every day")?',
    'No — "bread" is an exception to the usual long-vowel-team pattern',
    'Yes — vowel teams always make the same sound in every word',
    'eng.phonics.digraphs:MC-VOWEL-DIGRAPHS-FOLLOW-SHORT-VOWEL-RULES',
    'MC-VOWEL-DIGRAPHS-FOLLOW-SHORT-VOWEL-RULES, re-asked with "bread"/"read" rather than the existing "said"/"rain" example'),

  // ─── eng.phonics.long-vowels-silent-e (ELEMENTARY) ───────────────────────
  probe('eng.phonics.long-vowels-silent-e', 'checkpoint', EL,
    'What is the only spelling difference between "kit" and "kite", and what does it do?',
    'The final "e" — it is silent itself but makes the earlier vowel say its long sound',
    'The final "e" — it does nothing at all',
    'eng.phonics.long-vowels-silent-e:MC-SILENT-E-DOES-NOTHING',
    'MC-SILENT-E-DOES-NOTHING, re-asked with "kit"/"kite" rather than the existing "cap"/"cape" example'),
  probe('eng.phonics.long-vowels-silent-e', 'true_false', EL,
    'Does the "i" in "give" say its long sound, the way the silent-e rule would predict?',
    'No — "give" is a common exception; the vowel stays short despite the final e',
    'Yes — any word ending in e must have a long vowel',
    'eng.phonics.long-vowels-silent-e:MC-ANY-E-AT-THE-END-MEANS-LONG-VOWEL',
    'MC-ANY-E-AT-THE-END-MEANS-LONG-VOWEL, re-asked with "give" rather than the existing "have" example'),

  // ─── eng.phonics.print-concepts (EARLY) ──────────────────────────────────
  probe('eng.phonics.print-concepts', 'checkpoint', EA,
    'On a different page of the same picture book, does the picture or the print say the exact same thing every single time it is read aloud?',
    'The print — it carries the fixed message; the picture just helps you imagine the story',
    'The picture — the picture is the story',
    'eng.phonics.print-concepts:MC-PICTURE-IS-THE-STORY',
    'MC-PICTURE-IS-THE-STORY, re-asked with a "different page" framing rather than the existing generic picture-book-page example'),
  probe('eng.phonics.print-concepts', 'true_false', EA,
    'Are the blank spaces in the sentence "I see a dog" just decoration, with no real job?',
    'No — spaces mark where one word ends and the next begins',
    'Yes — spaces are decoration',
    'eng.phonics.print-concepts:MC-SPACES-ARE-DECORATION',
    'MC-SPACES-ARE-DECORATION, re-asked with the "I see a dog" example rather than the existing generic letter-clusters example'),

  // ─── eng.phonics.rhyming (EARLY) ─────────────────────────────────────────
  probe('eng.phonics.rhyming', 'checkpoint', EA,
    'Do "bear" and "wear" rhyme?',
    'Yes — say them out loud: they end with the same sound, even though the letters differ',
    'No — they are not spelled exactly the same at the end',
    'eng.phonics.rhyming:MC-SPELLING-MUST-MATCH',
    'MC-SPELLING-MUST-MATCH, re-asked with "bear"/"wear" rather than the existing "love"/"move" example'),
  probe('eng.phonics.rhyming', 'true_false', EA,
    'Which word rhymes with "cat": "cup" or "hat"?',
    '"hat" — both words end in the same "-at" sound',
    '"cup" — both words start with the same sound',
    'eng.phonics.rhyming:MC-FIRST-SOUND-IS-ENOUGH',
    'MC-FIRST-SOUND-IS-ENOUGH, re-asked with "cat"/"cup"/"hat" rather than the existing "sun"/"sit"/"fun" example'),

  // ─── eng.phonics.short-vowels (ELEMENTARY) ───────────────────────────────
  probe('eng.phonics.short-vowels', 'checkpoint', EL,
    'What vowel sound is in the middle of "bed"?',
    'The short /ɛ/ sound',
    'The letter name, "ee"',
    'eng.phonics.short-vowels:MC-VOWEL-LETTER-NAME-IS-THE-SOUND',
    'MC-VOWEL-LETTER-NAME-IS-THE-SOUND, re-asked with "bed" rather than the existing "cat" example'),
  probe('eng.phonics.short-vowels', 'true_false', EL,
    'Do "bit" and "bite" have the same vowel sound, since both are one-syllable words?',
    'No — "bit" has a short /ɪ/, "bite" has a long /aɪ/ because of the silent e',
    'Yes — both are one-syllable words, so both use the short vowel',
    'eng.phonics.short-vowels:MC-ONE-SYLLABLE-WORDS-ALWAYS-SHORT-VOWEL',
    'MC-ONE-SYLLABLE-WORDS-ALWAYS-SHORT-VOWEL, re-asked with "bit"/"bite" rather than the existing "cap"/"cape" example'),

  // ─── eng.phonics.sight-words (ELEMENTARY) ────────────────────────────────
  probe('eng.phonics.sight-words', 'checkpoint', EL,
    'Can the sight word "at" be sounded out phonetically?',
    'Yes — /æ/-/t/ works perfectly; not all sight words are irregular',
    'No — sight words can never be sounded out, they must be memorized',
    'eng.phonics.sight-words:MC-SIGHT-WORDS-CANNOT-BE-SOUNDED-OUT-AT-ALL',
    'MC-SIGHT-WORDS-CANNOT-BE-SOUNDED-OUT-AT-ALL, re-asked with "at" rather than the existing "and" example'),
  probe('eng.phonics.sight-words', 'true_false', EL,
    'Is "no" the same word as "on"?',
    'No — same two letters, but in reversed order, so they are different words',
    'Yes — they look similar enough at a glance',
    'eng.phonics.sight-words:MC-MEMORIZING-THE-WORD-SHAPE-IS-ENOUGH',
    'MC-MEMORIZING-THE-WORD-SHAPE-IS-ENOUGH, re-asked with "no"/"on" rather than the existing "was"/"saw" example'),
]
