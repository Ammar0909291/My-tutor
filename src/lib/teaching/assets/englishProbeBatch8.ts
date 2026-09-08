/**
 * ENGLISH PROBE-CONTRACT CAMPAIGN — Batch 8.
 *
 * SCOPE: the entire eng.linguistics domain (18 concepts) + the first 7
 * eng.phonetics concepts alphabetically (accents-and-dialects,
 * articulation-organs, connected-speech, consonant-sounds,
 * intonation-patterns, ipa-basics, minimal-pairs) — 25 concepts total.
 * All 25 re-measured at closed=2 (mcq x1 + misconception_probe x1)
 * directly from the seed corpus in git before authoring (zero DB
 * access, zero egress — via local `npx tsx` imports of the real seed
 * files + docs/english/kg/graph.json). Every one confirmed to already
 * carry two genuine, distinct, ACTIVE misconception ids on its existing
 * probes — the stop-condition check passed for all 25; none were
 * skipped, none required new Educational Brain authoring.
 *
 * Each concept goes straight from depth 2 to depth 4 — TWO new probes,
 * the same resilience target established across Batches 1-7.
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
 * existing probes: MIDDLE for eng.phonetics.articulation-organs; HIGH
 * for every eng.linguistics concept in this batch and the remaining 6
 * eng.phonetics concepts (accents-and-dialects, connected-speech,
 * consonant-sounds, intonation-patterns, ipa-basics, minimal-pairs).
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

const M = GradeBand.MIDDLE
const H = GradeBand.HIGH

export const ENGLISH_PROBE_BATCH_8: SeedProbe[] = [
  // ─── eng.linguistics.applied-linguistics-intro (HIGH) ───────────────────
  probe('eng.linguistics.applied-linguistics-intro', 'checkpoint', H,
    'A teacher uses choral repetition drilling because it feels traditional and was how they themselves were taught. Does feeling familiar make a teaching method effective?',
    'No — effectiveness must be evaluated through applied-linguistics research and evidence, not by how traditional or familiar a method feels',
    'Yes — any method that feels traditional or familiar to teachers and learners must work',
    'eng.linguistics.applied-linguistics-intro:MC-A-ANY-LANGUAGE-TEACHING-METHOD-THAT-FEELS-TRADITIONAL-OR-FAMILIAR-MUST-BE-EFFECTIVE',
    'MC-A-..., re-asked with a choral-repetition-drilling example rather than the existing memorization-drill example'),
  probe('eng.linguistics.applied-linguistics-intro', 'true_false', H,
    'A vocabulary test only accepts answers phrased in one regional dialect and marks equally correct answers from other dialects wrong. Is this test a neutral, fair measure of language skill?',
    'No — a test that privileges one dialect over other equally valid ones is not a neutral or fair measure of language ability',
    'Yes — a standardized test using one dialect consistently is automatically a neutral, fair measure',
    'eng.linguistics.applied-linguistics-intro:MC-B-A-STANDARDIZED-LANGUAGE-TEST-THAT-USES-ONE-DIALECT-IS-A-NEUTRAL-FAIR-MEASURE-OF-LANGUAGE-SKILL',
    'MC-B-..., re-asked with a vocabulary-test example rather than the existing dialect-penalizing test-item example'),

  // ─── eng.linguistics.bilingualism-and-multilingualism (HIGH) ────────────
  probe('eng.linguistics.bilingualism-and-multilingualism', 'checkpoint', H,
    'Amara speaks casually and fluently with her family in Yoruba but only learned academic and technical vocabulary in English at school. Does she have to be equally fluent in both languages in every domain to count as a true bilingual?',
    'No — bilinguals often have different strengths in different languages depending on where and how they use each one; unequal domain fluency is normal, not disqualifying',
    'Yes — a true bilingual must have identical native-like fluency in both languages across every domain',
    'eng.linguistics.bilingualism-and-multilingualism:MC-A-A-TRUE-BILINGUAL-MUST-HAVE-EQUAL-NATIVE-LIKE-FLUENCY-IN-BOTH-LANGUAGES-SEPARATELY',
    'MC-A-..., re-asked with an Amara/Yoruba domain-fluency example rather than the existing heritage/schooling-language-domains example'),
  probe('eng.linguistics.bilingualism-and-multilingualism', 'true_false', H,
    'A bilingual child talking with her bilingual parent says, "I want the pelota rossa," mixing Spanish and Italian words into one English sentence. Does this mixing mean she is confused or behind in language development?',
    'No — mixing languages with another bilingual speaker is a normal, rule-governed bilingual skill, not confusion or delay',
    'Yes — mixing two languages within one sentence shows the child is confused or behind in development',
    'eng.linguistics.bilingualism-and-multilingualism:MC-B-A-BILINGUAL-CHILD-MIXING-TWO-LANGUAGES-IN-ONE-SENTENCE-IS-CONFUSED-OR-DELAYED',
    'MC-B-..., re-asked with a "pelota rossa" Spanish/Italian code-mixing example rather than the existing code-mixing-child example'),

  // ─── eng.linguistics.computational-linguistics-intro (HIGH) ─────────────
  probe('eng.linguistics.computational-linguistics-intro', 'checkpoint', H,
    'A language-generation system writes a fluent, grammatically flawless biography of a historical figure — but several dates and facts in it are invented. Does its fluent, correct grammar mean it understands meaning the way a human does?',
    'No — fluent, grammatical output can still be built from statistical patterns rather than genuine understanding, which is why factual errors can slip through undetected',
    'Yes — grammatically fluent, error-free-sounding output proves the system understands meaning the way a human does',
    'eng.linguistics.computational-linguistics-intro:MC-A-A-COMPUTER-PRODUCING-FLUENT-GRAMMATICALLY-CORRECT-LANGUAGE-MUST-UNDERSTAND-THE-MEANING-THE-WAY-A-HUMAN-DOES',
    'MC-A-..., re-asked with a fluent-but-fabricated-biography example rather than the existing fluent-but-factually-wrong-output example'),
  probe('eng.linguistics.computational-linguistics-intro', 'true_false', H,
    'In the sentence "The city council refused the demonstrators a permit because they feared violence," a computational parser must decide who "they" refers to. Can every computational language system resolve this kind of ambiguous reference with no genuine limitations?',
    'No — resolving ambiguous references like this remains a genuine, well-documented limitation for many computational language systems',
    'Yes — computational language systems handle every aspect of language equally well with no genuine limitations',
    'eng.linguistics.computational-linguistics-intro:MC-B-COMPUTATIONAL-LANGUAGE-SYSTEMS-CAN-HANDLE-EVERY-ASPECT-OF-LANGUAGE-EQUALLY-WELL-WITH-NO-GENUINE-LIMITATIONS',
    'MC-B-..., re-asked with a "city council...they feared violence" ambiguity example rather than the existing trophy/suitcase-pronoun-ambiguity example'),

  // ─── eng.linguistics.corpus-linguistics-intro (HIGH) ────────────────────
  probe('eng.linguistics.corpus-linguistics-intro', 'checkpoint', H,
    'Instead of checking a corpus, a writer simply guesses that "interested in" is used far more often than "interested about," based on gut feeling alone. Is a personal guess about frequency always as reliable as checking real corpus data?',
    'No — personal intuition about frequency is often wrong and should be checked against real corpus data, not trusted automatically',
    'Yes — my own intuition about how language is usually used is always as reliable as corpus data',
    'eng.linguistics.corpus-linguistics-intro:MC-A-MY-OWN-INTUITION-ABOUT-HOW-LANGUAGE-IS-USUALLY-USED-IS-ALWAYS-AS-RELIABLE-AS-CORPUS-DATA',
    'MC-A-..., re-asked with an "interested in"/"interested about" guessing example rather than the existing phrasing-frequency-guessing example'),
  probe('eng.linguistics.corpus-linguistics-intro', 'true_false', H,
    'A corpus search shows that a certain unusual word order occurs only rarely across millions of sentences, but every occurrence is produced by fluent native speakers in natural contexts. Does its rarity in the corpus mean the word order must be ungrammatical?',
    'No — a construction can be genuinely grammatical and still be rare; frequency and grammaticality are not the same thing',
    'Yes — if corpus data shows something is rare or unusual, it must be ungrammatical',
    'eng.linguistics.corpus-linguistics-intro:MC-B-IF-CORPUS-DATA-SHOWS-SOMETHING-IS-RARE-OR-UNUSUAL-IT-MUST-BE-UNGRAMMATICAL',
    'MC-B-..., re-asked with a rare-but-native-speaker-produced word-order example rather than the existing rare-passive-voice-construction example'),

  // ─── eng.linguistics.dialectology (HIGH) ─────────────────────────────────
  probe('eng.linguistics.dialectology', 'checkpoint', H,
    "A dialect map shows that the boundary for a certain vowel pronunciation runs through the middle of a region, while the boundary for a certain vocabulary word runs somewhere else entirely in the same region. Do dialect boundaries form one sharp line, with everyone on one side speaking one way and everyone on the other speaking differently?",
    'No — different linguistic features often have different, non-aligned boundaries (isoglosses), so there is rarely one sharp line separating dialects',
    'Yes — dialect boundaries are sharp lines where everyone on one side speaks one way and everyone on the other side speaks differently',
    'eng.linguistics.dialectology:MC-A-DIALECT-BOUNDARIES-ARE-SHARP-LINES-WHERE-EVERYONE-ON-ONE-SIDE-SPEAKS-ONE-WAY-AND-EVERYONE-ON-THE-OTHER-SPEAKS-DIFFERENTLY',
    'MC-A-..., re-asked with a vowel-boundary-vs-vocabulary-boundary example rather than the existing non-aligned-isoglosses example'),
  probe('eng.linguistics.dialectology', 'true_false', H,
    'Two lifelong residents of the same small town are both described as speaking "the local dialect," yet one regularly uses a grammatical feature the other never uses. Is a dialect one single unified thing that a speaker either has completely or doesn\'t have at all?',
    "No — a dialect is a bundle of features that individual speakers can carry to different degrees, not an all-or-nothing package",
    "Yes — a dialect is one single unified thing everyone in a region either has or doesn't have",
    'eng.linguistics.dialectology:MC-B-A-DIALECT-IS-ONE-SINGLE-UNIFIED-THING-EVERYONE-IN-A-REGION-EITHER-HAS-OR-DOESNT-HAVE',
    'MC-B-..., re-asked with a same-town differing-grammatical-feature example rather than the existing two-speakers-same-dialect-label example'),

  // ─── eng.linguistics.discourse-analysis-intro (HIGH) ────────────────────
  probe('eng.linguistics.discourse-analysis-intro', 'checkpoint', H,
    'A paragraph is packed with pronouns and conjunctions like "however," "therefore," and "it," but the ideas it connects contradict each other and don\'t logically follow. Does heavy use of cohesive devices like these automatically make a text coherent?',
    'No — cohesive devices link sentences on the surface, but coherence requires the underlying ideas to actually make logical sense together',
    'Yes — a text with lots of cohesive devices like pronouns and conjunctions is automatically coherent',
    'eng.linguistics.discourse-analysis-intro:MC-A-A-TEXT-WITH-LOTS-OF-COHESIVE-DEVICES-LIKE-PRONOUNS-AND-CONJUNCTIONS-IS-AUTOMATICALLY-COHERENT',
    'MC-A-..., re-asked with a dense-but-contradictory-paragraph example rather than the existing dense-but-illogical-passage example'),
  probe('eng.linguistics.discourse-analysis-intro', 'true_false', H,
    'In a conversation, a speaker trails off mid-sentence and looks directly at their listener — and the listener then begins speaking. Does conversational turn-taking like this just happen randomly with no underlying structure?',
    'No — speakers use systematic cues like eye gaze and trailing off to signal that they are yielding the turn',
    'Yes — conversational turn-taking just happens randomly with no underlying structure',
    'eng.linguistics.discourse-analysis-intro:MC-B-CONVERSATIONAL-TURN-TAKING-JUST-HAPPENS-RANDOMLY-WITH-NO-UNDERLYING-STRUCTURE',
    'MC-B-..., re-asked with a trailing-off/eye-gaze cue example rather than the existing falling-intonation-cue example'),

  // ─── eng.linguistics.historical-linguistics-intro (HIGH) ────────────────
  probe('eng.linguistics.historical-linguistics-intro', 'checkpoint', H,
    'A student notices that Middle English "knight" was once pronounced with both the k and the gh sounds, while Modern English "knight" drops them, and assumes this is careless corruption of a purer original pronunciation. Is language change random decay or corruption of a purer earlier form?',
    'No — sound changes like the loss of these consonants follow regular, systematic patterns over time; they are not decay or corruption',
    'Yes — language change is random decay or corruption of a purer earlier form',
    'eng.linguistics.historical-linguistics-intro:MC-A-LANGUAGE-CHANGE-IS-RANDOM-DECAY-OR-CORRUPTION-OF-A-PURER-EARLIER-FORM',
    'MC-A-..., re-asked with a Middle-English "knight" pronunciation-loss example rather than the existing Modern-vs-Old-English example'),
  probe('eng.linguistics.historical-linguistics-intro', 'true_false', H,
    'Words beginning with "kn-" — such as "know," "knee," and "knife" — all lost the pronounced k sound together, over the same historical period, following one shared sound change. Does language change happen randomly word-by-word with no systematic pattern?',
    'No — this change affected a whole class of words following the same rule at the same time, showing language change is systematic, not random word-by-word',
    'Yes — language change happens randomly word-by-word with no systematic pattern',
    'eng.linguistics.historical-linguistics-intro:MC-B-LANGUAGE-CHANGE-HAPPENS-RANDOMLY-WORD-BY-WORD-WITH-NO-SYSTEMATIC-PATTERN',
    'MC-B-..., re-asked with the "kn-" cluster-loss example rather than the existing Great Vowel Shift example'),

  // ─── eng.linguistics.language-acquisition-intro (HIGH) ──────────────────
  probe('eng.linguistics.language-acquisition-intro', 'checkpoint', H,
    'A child who has only ever heard adults say "ate" says "I eated breakfast" instead. Do children learn language purely by imitating what they hear adults say?',
    'No — this kind of error shows the child is applying a grammatical rule productively, not simply copying adult speech, which is why an unheard form like "eated" appears',
    'Yes — children learn language purely by imitating what they hear adults say',
    'eng.linguistics.language-acquisition-intro:MC-A-CHILDREN-LEARN-LANGUAGE-PURELY-BY-IMITATING-WHAT-THEY-HEAR-ADULTS-SAY',
    'MC-A-..., re-asked with an "I eated breakfast" overregularization example rather than the existing "I goed" example'),
  probe('eng.linguistics.language-acquisition-intro', 'true_false', H,
    'An adult learner explicitly studies grammar rules and, within weeks, correctly produces complex sentence structures a young child acquiring their first language would take years to master. Is an adult learning a language later in life just a weaker version of childhood acquisition?',
    'No — adult learners can use explicit rule-learning and existing cognitive skills to master certain complex structures faster than young children, showing the two processes are different, not simply weaker',
    'Yes — learning a language later in life is just a weaker or worse version of childhood acquisition',
    'eng.linguistics.language-acquisition-intro:MC-B-LEARNING-A-LANGUAGE-LATER-IN-LIFE-IS-JUST-A-WEAKER-OR-WORSE-VERSION-OF-CHILDHOOD-ACQUISITION',
    'MC-B-..., re-asked with an explicit-rule-study/complex-sentence-structure example rather than the existing adults-learning-grammar-faster example'),

  // ─── eng.linguistics.language-families (HIGH) ───────────────────────────
  probe('eng.linguistics.language-families', 'checkpoint', H,
    'English "bad" and Persian "bad" (meaning "bad") sound the same and mean the same thing, but the two words arose completely independently with no historical connection. Does a similar-sounding word pair like this prove the two languages are related?',
    'No — sound-alike words can be pure coincidence; establishing a real relationship requires systematic sound correspondences across many words, not one similar pair',
    'Yes — any two languages with similar-sounding words must be related',
    'eng.linguistics.language-families:MC-A-ANY-TWO-LANGUAGES-WITH-SIMILAR-SOUNDING-WORDS-MUST-BE-RELATED',
    'MC-A-..., re-asked with the English/Persian "bad" false-cognate example rather than the existing one-similar-word example'),
  probe('eng.linguistics.language-families', 'true_false', H,
    'Finnish and Swedish are both spoken in neighboring parts of Scandinavia, yet Finnish belongs to the Uralic family while Swedish belongs to the Indo-European family. Are languages spoken in the same region automatically in the same language family?',
    'No — geographic closeness does not determine language family membership; Finnish and Swedish are unrelated despite being neighbors',
    'Yes — languages located in the same region are automatically in the same language family',
    'eng.linguistics.language-families:MC-B-LANGUAGES-USING-THE-SAME-WRITING-SYSTEM-OR-LOCATED-IN-THE-SAME-REGION-ARE-AUTOMATICALLY-IN-THE-SAME-LANGUAGE-FAMILY',
    'MC-B-..., re-asked with the Finnish/Swedish shared-region example rather than the existing shared-writing-system/region example'),

  // ─── eng.linguistics.morphology-intro (HIGH) ────────────────────────────
  probe('eng.linguistics.morphology-intro', 'checkpoint', H,
    'The word "elephant" has three syllables (el-e-phant) but is a single unanalyzable morpheme with no smaller meaningful parts. Is a morpheme the same thing as a syllable?',
    'No — a morpheme is the smallest unit of meaning, while a syllable is a unit of pronunciation; the two counts do not have to match',
    'Yes — a morpheme is the same thing as a syllable',
    'eng.linguistics.morphology-intro:MC-A-A-MORPHEME-IS-THE-SAME-THING-AS-A-SYLLABLE',
    'MC-A-..., re-asked with the "elephant" example rather than the existing "banana" example'),
  probe('eng.linguistics.morphology-intro', 'true_false', H,
    'Adding "-er" to "teach" creates a new word, "teacher" (a person who teaches), while adding "-s" to "teacher" just marks it as plural without creating a new word. Do both kinds of endings have the same kind of effect on a word?',
    'No — "-er" is derivational (creates a new word/word class), while "-s" is inflectional (marks grammar only); the two kinds of endings work differently',
    'Yes — adding any ending to a word has the same kind of effect; derivational and inflectional endings are the same',
    'eng.linguistics.morphology-intro:MC-B-ADDING-ANY-ENDING-TO-A-WORD-HAS-THE-SAME-KIND-OF-EFFECT-DERIVATIONAL-AND-INFLECTIONAL-ARE-THE-SAME',
    'MC-B-..., re-asked with the "teacher"/"teachers" example rather than the existing "-ness"/"-ed" example'),

  // ─── eng.linguistics.phonology-intro (HIGH) ─────────────────────────────
  probe('eng.linguistics.phonology-intro', 'checkpoint', H,
    "One linguist measures the exact airflow and tongue position used to produce a sound, while another asks whether swapping that sound for a different one changes a word's meaning in the language. Are phonology and phonetics studying the exact same thing?",
    'No — phonetics studies how sounds are physically made, while phonology studies which sound differences change meaning; related, but distinct',
    'Yes — phonology and phonetics are the same thing',
    'eng.linguistics.phonology-intro:MC-A-PHONOLOGY-AND-PHONETICS-ARE-THE-SAME-THING',
    'MC-A-..., re-asked with an airflow-measurement-vs-meaning-change framing rather than the existing air-release-vs-meaning-changing-questions example'),
  probe('eng.linguistics.phonology-intro', 'true_false', H,
    'In Hindi, an aspirated "p" (as in "phal," fruit) and an unaspirated "p" (as in "pal," moment) change word meaning, but in English the same two physically different sounds never change meaning on their own. Does a physical difference between two sounds guarantee they are different phonemes in every language?',
    'No — the same physically different sounds can be separate phonemes in one language and mere variants (allophones) of one phoneme in another',
    'Yes — if two sounds are physically different, they must be different phonemes in every language',
    'eng.linguistics.phonology-intro:MC-B-IF-TWO-SOUNDS-ARE-PHYSICALLY-DIFFERENT-THEY-MUST-BE-DIFFERENT-PHONEMES-IN-EVERY-LANGUAGE',
    'MC-B-..., re-asked with the Hindi aspirated/unaspirated "p" example rather than the existing English/Thai aspirated-"p" example'),

  // ─── eng.linguistics.pragmatics-intro (HIGH) ────────────────────────────
  probe('eng.linguistics.pragmatics-intro', 'checkpoint', H,
    'Standing next to an open window, a guest says, "It\'s getting a bit cold in here," and the host gets up and closes the window. Is what a speaker literally says always exactly what they mean?',
    'No — speakers often mean more than their literal words say; here the literal comment about temperature functioned as an indirect request',
    'Yes — what a speaker literally says is always exactly what they mean',
    'eng.linguistics.pragmatics-intro:MC-A-WHAT-A-SPEAKER-LITERALLY-SAYS-IS-ALWAYS-EXACTLY-WHAT-THEY-MEAN',
    'MC-A-..., re-asked with the open-window/cold-room example rather than the existing "Can you pass the salt?" example'),
  probe('eng.linguistics.pragmatics-intro', 'true_false', H,
    'When asked whether her team finished the whole project on time, a manager replies, "Some of the deliverables were finished on time," implying — without saying so directly — that the rest were not. Does this kind of implied meaning (implicature) mean the same as just being vague or unclear?',
    'No — implicature is a precise, inferable meaning the speaker intends the listener to work out; it is different from simply being vague or unclear',
    'Yes — implicature means the same as literal vagueness or just being unclear',
    'eng.linguistics.pragmatics-intro:MC-B-IMPLICATURE-MEANS-THE-SAME-AS-LITERAL-VAGUENESS-OR-JUST-BEING-UNCLEAR',
    'MC-B-..., re-asked with the "some of the deliverables" example rather than the existing "I have to work that night" example'),

  // ─── eng.linguistics.psycholinguistics-intro (HIGH) ─────────────────────
  probe('eng.linguistics.psycholinguistics-intro', 'checkpoint', H,
    'A reader says that recognizing a printed word "just feels instant," with no noticeable steps or delay involved — yet a lexical-decision experiment measures a real, if brief, reaction time for the same task. Is simply reflecting on how language feels to use (introspection) a reliable way to study the actual mental processes behind it?',
    'No — controlled experiments show word recognition takes measurable processing time and involves multiple steps, even though it feels instantaneous; introspection alone is not a reliable method',
    'Yes — introspection, simply thinking about how language feels to use, is a reliable way to study mental language processes',
    'eng.linguistics.psycholinguistics-intro:MC-A-INTROSPECTION-SIMPLY-THINKING-ABOUT-HOW-LANGUAGE-FEELS-TO-USE-IS-A-RELIABLE-WAY-TO-STUDY-MENTAL-LANGUAGE-PROCESSES',
    'MC-A-..., re-asked with a lexical-decision reaction-time example rather than the existing "reading feels instant" example'),
  probe('eng.linguistics.psycholinguistics-intro', 'true_false', H,
    'A speaker intending to say "heat the pan" accidentally says "peat the han," swapping the initial consonants of the two words rather than producing a completely random jumble of sounds. Are speech errors like this just random noise with no systematic pattern?',
    'No — speech errors like this consistently swap structured units such as initial consonants, revealing systematic patterns in how language is mentally planned',
    'Yes — speech errors (slips of the tongue) are just random noise with no systematic pattern',
    'eng.linguistics.psycholinguistics-intro:MC-B-SPEECH-ERRORS-SLIPS-OF-THE-TONGUE-ARE-JUST-RANDOM-NOISE-WITH-NO-SYSTEMATIC-PATTERN',
    'MC-B-..., re-asked with the "peat the han" spoonerism example rather than the existing "tips of the slung" example'),

  // ─── eng.linguistics.semantics-intro (HIGH) ─────────────────────────────
  probe('eng.linguistics.semantics-intro', 'checkpoint', H,
    'The word "rose" is a hyponym of "flower," which is itself a hyponym of "plant" — each word sits inside a structured hierarchy of meaning. Is word meaning just a simple one-to-one label with no internal structure or relationships?',
    'No — words like "rose" sit within structured meaning relationships (like hyponymy) to other words, not as isolated, unrelated labels',
    'Yes — word meaning is a simple one-to-one label with no internal structure or relationships',
    'eng.linguistics.semantics-intro:MC-A-WORD-MEANING-IS-A-SIMPLE-ONE-TO-ONE-LABEL-WITH-NO-INTERNAL-STRUCTURE-OR-RELATIONSHIPS',
    'MC-A-..., re-asked with the "rose"/"flower"/"plant" hyponymy example rather than the existing "robin"/"bird" example'),
  probe('eng.linguistics.semantics-intro', 'true_false', H,
    '"The cat chased the mouse" and "The mouse chased the cat" use exactly the same words, but describe completely different events. Is sentence meaning just the sum of individual word meanings in any order?',
    'No — word order changes sentence meaning even when the individual words stay identical, so sentence meaning is not just the sum of word meanings in any order',
    'Yes — sentence meaning is just the sum of individual word meanings in any order',
    'eng.linguistics.semantics-intro:MC-B-SENTENCE-MEANING-IS-JUST-THE-SUM-OF-INDIVIDUAL-WORD-MEANINGS-IN-ANY-ORDER',
    'MC-B-..., re-asked with the "cat chased mouse"/"mouse chased cat" example rather than the existing telescope-ambiguity example'),

  // ─── eng.linguistics.sociolinguistics-intro (HIGH) ──────────────────────
  probe('eng.linguistics.sociolinguistics-intro', 'checkpoint', H,
    'Within the same city, older speakers pronounce a certain vowel one way far more often than younger speakers, even though both groups live in the same neighborhood. Is language variation only about geographic region, not social factors?',
    'No — variation can track social factors like age even within the exact same geographic area, not just region',
    'Yes — language variation is only about geographic region, not social factors',
    'eng.linguistics.sociolinguistics-intro:MC-A-LANGUAGE-VARIATION-IS-ONLY-ABOUT-GEOGRAPHIC-REGION-NOT-SOCIAL-FACTORS',
    'MC-A-..., re-asked with a same-neighborhood, age-based vowel-pronunciation example rather than the existing class-based grammatical-feature-rates example'),
  probe('eng.linguistics.sociolinguistics-intro', 'true_false', H,
    'A bilingual professional speaks formally in board meetings and switches to a relaxed, informal register when chatting with coworkers at lunch. Does switching between registers like this mean the speaker doesn\'t fully know either variety?',
    "No — skillfully switching registers to fit the situation is a sign of full command of both varieties, not a lack of knowledge of either",
    "Yes — code-switching and register-shifting mean a speaker doesn't fully know either variety",
    'eng.linguistics.sociolinguistics-intro:MC-B-CODE-SWITCHING-AND-REGISTER-SHIFTING-MEAN-A-SPEAKER-DOESNT-FULLY-KNOW-EITHER-VARIETY',
    'MC-B-..., re-asked with the board-meeting/lunch register-shift example rather than the existing bilingual-switching-by-topic/audience example'),

  // ─── eng.linguistics.syntax-theory-intro (HIGH) ─────────────────────────
  probe('eng.linguistics.syntax-theory-intro', 'checkpoint', H,
    'Without ever being taught the rule explicitly, native English speakers instinctively say "the big red barn" and immediately sense that "the red big barn" sounds wrong. Is syntax just school grammar rules taught for writing correctly?',
    'No — native speakers apply structure like adjective ordering intuitively, with no explicit instruction, showing syntax is a deeper mental system',
    'Yes — syntax is just school grammar rules for writing correctly',
    'eng.linguistics.syntax-theory-intro:MC-A-SYNTAX-IS-JUST-SCHOOL-GRAMMAR-RULES-FOR-WRITING-CORRECTLY',
    'MC-A-..., re-asked with the "big red barn" adjective-ordering example rather than the existing adjective-order-intuition example'),
  probe('eng.linguistics.syntax-theory-intro', 'true_false', H,
    '"The square circle painted the idea sadly" follows normal English subject-verb-object word order, and every word is used with the correct part of speech, yet the sentence describes something impossible and makes no real-world sense. Must a grammatically correct sentence also make sense — are syntax and meaning the same thing?',
    'No — a sentence can be perfectly well-formed syntactically while still being semantically nonsensical; syntax and meaning are separate systems',
    'Yes — a grammatically correct sentence must also make sense; syntax and meaning are the same thing',
    'eng.linguistics.syntax-theory-intro:MC-B-A-GRAMMATICALLY-CORRECT-SENTENCE-MUST-ALSO-MAKE-SENSE-SYNTAX-AND-MEANING-ARE-THE-SAME-THING',
    'MC-B-..., re-asked with the "square circle painted the idea sadly" example rather than the existing "Colorless green ideas sleep furiously" example'),

  // ─── eng.linguistics.translation-studies-intro (HIGH) ───────────────────
  probe('eng.linguistics.translation-studies-intro', 'checkpoint', H,
    'Translated word-for-word into another language, the English idiom "it\'s raining cats and dogs" produces a sentence that native speakers of that language find bizarre and meaningless. Is a good translation a mechanical word-for-word substitution from one language to another?',
    'No — mechanical word-for-word substitution can destroy idiomatic meaning; good translation conveys sense and function, not just individual words',
    'Yes — a good translation is a mechanical word-for-word substitution from one language to another',
    'eng.linguistics.translation-studies-intro:MC-A-A-GOOD-TRANSLATION-IS-A-MECHANICAL-WORD-FOR-WORD-SUBSTITUTION-FROM-ONE-LANGUAGE-TO-ANOTHER',
    'MC-A-..., re-asked with the "raining cats and dogs" idiom example rather than the existing awkward-idiom-substitution example'),
  probe('eng.linguistics.translation-studies-intro', 'true_false', H,
    'Translating a legal contract, one translator prioritizes exact literal wording for precision, while another prioritizes natural phrasing a native reader would expect — both versions are considered valid by professional translators for their different purposes. Is there always exactly one correct translation for a given passage, with all others wrong?',
    'No — different valid translations can prioritize different goals, like literal precision versus natural readability; there is not always exactly one correct version',
    'Yes — there is always exactly one correct translation for a given passage, and all others are wrong',
    'eng.linguistics.translation-studies-intro:MC-B-THERE-IS-ALWAYS-EXACTLY-ONE-CORRECT-TRANSLATION-FOR-A-GIVEN-PASSAGE-AND-ALL-OTHERS-ARE-WRONG',
    'MC-B-..., re-asked with the legal-contract-translation example rather than the existing rhyme-preserving/literal-meaning-preserving poem example'),

  // ─── eng.linguistics.what-is-linguistics (HIGH) ─────────────────────────
  probe('eng.linguistics.what-is-linguistics', 'checkpoint', H,
    'A linguist visits a community and carefully records how speakers naturally use a double negative like "I don\'t want none," describing the pattern rather than telling speakers to stop using it. Is linguistics the study of correct grammar rules that people should be taught to follow?',
    'No — linguistics is a descriptive science that observes and explains how language is actually used, rather than prescribing which forms are "correct"',
    'Yes — linguistics is the study of correct grammar rules',
    'eng.linguistics.what-is-linguistics:MC-A-LINGUISTICS-IS-THE-STUDY-OF-CORRECT-GRAMMAR-RULES',
    'MC-A-..., re-asked with the double-negative-description example rather than the existing dialect-feature-"correction" example'),
  probe('eng.linguistics.what-is-linguistics', 'true_false', H,
    'A university linguistics program requires separate courses in phonetics, syntax, historical linguistics, and sociolinguistics, each studying a different aspect of language. Is linguistics just one single subject about grammar?',
    'No — linguistics includes many distinct subfields studying sound, structure, meaning, change, and social use, not just one single subject about grammar',
    'Yes — linguistics is just one single subject about grammar',
    'eng.linguistics.what-is-linguistics:MC-B-LINGUISTICS-IS-JUST-ONE-SINGLE-SUBJECT-ABOUT-GRAMMAR',
    'MC-B-..., re-asked with the phonetics/syntax/historical-linguistics/sociolinguistics course-list example rather than the existing acquisition/historical-change course-units example'),

  // ─── eng.phonetics.accents-and-dialects (HIGH) ──────────────────────────
  probe('eng.phonetics.accents-and-dialects', 'checkpoint', H,
    'A speaker from northern England pronounces the vowel in "bath" differently from a speaker from southern England, and both pronunciations are used consistently and rule-governed within their own regions. Are accents simply mispronunciations or careless speech?',
    'No — regional accents are systematic, rule-governed pronunciation patterns, not mispronunciations or careless speech',
    'Yes — accents are mispronunciations or careless speech',
    'eng.phonetics.accents-and-dialects:MC-A-ACCENTS-ARE-MISPRONUNCIATIONS-OR-CARELESS-SPEECH',
    'MC-A-..., re-asked with the northern/southern-England "bath"-vowel example rather than the existing non-rhotic "r"-dropping example'),
  probe('eng.phonetics.accents-and-dialects', 'true_false', H,
    "A job interviewer privately rates a candidate's regional accent as \"less professional\" than their own accent, even though a linguist confirms both accents are equally systematic and rule-governed. Is a standard or prestige accent linguistically more correct than other accents?",
    'No — linguists consider all systematic accents equally valid linguistically; prestige is a social judgment, not a linguistic one',
    'Yes — a standard or prestige accent is linguistically more correct',
    'eng.phonetics.accents-and-dialects:MC-B-A-STANDARD-OR-PRESTIGE-ACCENT-IS-LINGUISTICALLY-MORE-CORRECT',
    'MC-B-..., re-asked with the job-interviewer accent-judgment example rather than the existing broadcast-vs-stigmatized-regional-accent example'),

  // ─── eng.phonetics.articulation-organs (MIDDLE) ─────────────────────────
  probe('eng.phonetics.articulation-organs', 'checkpoint', M,
    'To make the "mmmm" sound, the lips press together while the tongue stays relaxed and uninvolved. Does the tongue have to be involved for every consonant sound?',
    'No — some sounds, like "m," are made mainly with the lips, with little or no tongue involvement',
    'Yes — only the tongue matters for making consonant sounds',
    'eng.phonetics.articulation-organs:MC-ONLY-TONGUE-MATTERS',
    'MC-ONLY-TONGUE-MATTERS, re-asked with the "mmmm" lips-only example rather than the existing "ffff" example'),
  probe('eng.phonetics.articulation-organs', 'true_false', M,
    'Someone shouts the sound "sss" as loudly as they can — but their vocal cords never vibrate during it, even at that volume. Is whether a sound is voiced or voiceless about how loud it is?',
    'No — voicing is about whether the vocal cords vibrate, not about volume; a loud sound can still be voiceless',
    'Yes — voiced versus voiceless is really about how loud the sound is',
    'eng.phonetics.articulation-organs:MC-VOICED-VOICELESS-IS-VOLUME',
    'MC-VOICED-VOICELESS-IS-VOLUME, re-asked with a shouted-but-voiceless "sss" example rather than the existing whispered-"zzzz" example'),

  // ─── eng.phonetics.connected-speech (HIGH) ──────────────────────────────
  probe('eng.phonetics.connected-speech', 'checkpoint', H,
    '"Have to" is often pronounced "hafta" in fast natural speech, with the vowel and consonants blending together. Are changes like this in connected speech just sloppy speech?',
    'No — reductions like "hafta" are regular, predictable patterns of connected speech used by fluent speakers, not sloppiness',
    'Yes — connected speech changes like this are sloppy speech',
    'eng.phonetics.connected-speech:MC-CONNECTED-SPEECH-CHANGES-ARE-SLOPPY-SPEECH',
    'MC-CONNECTED-SPEECH-CHANGES-ARE-SLOPPY-SPEECH, re-asked with the "hafta" example rather than the existing "wanna" example'),
  probe('eng.phonetics.connected-speech', 'true_false', H,
    '"Did you" is often pronounced "didja" in casual speech, following the same kind of sound-blending pattern seen in "gonna" and "wanna." Is connected speech random, with each reduction happening in its own unpredictable way?',
    'No — connected-speech reductions like "didja," "gonna," and "wanna" follow the same general, predictable sound-blending patterns, not random unpredictable changes',
    'Yes — connected speech is random, with reductions happening unpredictably',
    'eng.phonetics.connected-speech:MC-CONNECTED-SPEECH-IS-RANDOM',
    'MC-CONNECTED-SPEECH-IS-RANDOM, re-asked with the "didja" example rather than the existing "gonna"/"wanna" same-pattern-type example'),

  // ─── eng.phonetics.consonant-sounds (HIGH) ──────────────────────────────
  probe('eng.phonetics.consonant-sounds', 'checkpoint', H,
    'To classify an unfamiliar consonant, a student checks where in the mouth it\'s made, how the airflow is shaped, and whether the vocal cords vibrate — then combines all three findings into one label, "voiced alveolar stop" for /d/. Is classifying a consonant like this just applying convenient labels with no real analysis?',
    'No — classification requires systematically testing place, manner, and voicing together; it is genuine phonetic analysis, not just applying convenient labels',
    'Yes — classification is just labeling, with no real analysis involved',
    'eng.phonetics.consonant-sounds:MC-CLASSIFICATION-IS-JUST-LABELING',
    'MC-CLASSIFICATION-IS-JUST-LABELING, re-asked with the /d/-classification example rather than the existing unfamiliar-sound example'),
  probe('eng.phonetics.consonant-sounds', 'true_false', H,
    'Told only that a sound is "voiced alveolar," a student cannot tell whether the sound is /d/ or /n/, because both share that place and voicing but differ in manner of articulation. Are place, manner, and voicing independent categories that don\'t need to be combined to identify a specific sound?',
    'No — place, manner, and voicing must be combined together; knowing only two of the three (like "voiced alveolar") is not enough to identify one specific sound',
    "Yes — place, manner, and voicing are independent categories that don't need to be combined",
    'eng.phonetics.consonant-sounds:MC-PLACE-MANNER-VOICING-ARE-INDEPENDENT',
    'MC-PLACE-MANNER-VOICING-ARE-INDEPENDENT, re-asked with the /d/-vs-/n/ example rather than the existing "voiceless bilabial" insufficiency example'),

  // ─── eng.phonetics.intonation-patterns (HIGH) ───────────────────────────
  probe('eng.phonetics.intonation-patterns', 'checkpoint', H,
    'A teacher asks "Where are you going?" using falling intonation at the end, rather than a rising pitch. Do all questions rise in pitch at the end?',
    'No — wh-questions like "Where are you going?" typically fall in pitch, while yes/no questions typically rise; not all questions rise',
    'Yes — all questions rise in pitch at the end',
    'eng.phonetics.intonation-patterns:MC-ALL-QUESTIONS-RISE',
    'MC-ALL-QUESTIONS-RISE, re-asked with the "Where are you going?" falling-intonation example rather than the existing wh-question-vs-yes/no example'),
  probe('eng.phonetics.intonation-patterns', 'true_false', H,
    'A waiter says "Coffee?" with rising pitch to offer it as a question, but later reads "Coffee" off a receipt with falling pitch simply as a list item. Is intonation just decorative, with no real effect on meaning?',
    'No — the same word said with different intonation patterns can signal an offer/question versus a plain statement; intonation carries real meaning',
    'Yes — intonation is just decorative and not meaningful',
    'eng.phonetics.intonation-patterns:MC-INTONATION-IS-DECORATIVE-NOT-MEANINGFUL',
    'MC-INTONATION-IS-DECORATIVE-NOT-MEANINGFUL, re-asked with the waiter "Coffee?" example rather than the existing "You\'re leaving." example'),

  // ─── eng.phonetics.ipa-basics (HIGH) ────────────────────────────────────
  probe('eng.phonetics.ipa-basics', 'checkpoint', H,
    'A student sees the IPA symbol /θ/ and reads it aloud as "t" followed by "h," as if it were two separate letter-sounds rather than one sound. Are IPA symbols just fancy versions of ordinary letters?',
    'No — /θ/ represents one single sound, as in "think," not two letters read separately',
    'Yes — IPA symbols are just fancy letters',
    'eng.phonetics.ipa-basics:MC-IPA-SYMBOLS-ARE-JUST-FANCY-LETTERS',
    'MC-IPA-SYMBOLS-ARE-JUST-FANCY-LETTERS, re-asked with the /θ/-as-"t"+"h" example rather than the existing /ʃ/-as-"s"+"h" example'),
  probe('eng.phonetics.ipa-basics', 'true_false', H,
    'The word "though" has six letters in its spelling, but its IPA transcription, /ðoʊ/, has only three symbols. Does IPA transcription always match the number of letters in a word\'s spelling?',
    'No — IPA represents actual sounds, so the symbol count can differ sharply from the letter count, as "though" shows',
    'Yes — IPA matches English spelling in the number of symbols and letters',
    'eng.phonetics.ipa-basics:MC-IPA-MATCHES-ENGLISH-SPELLING',
    'MC-IPA-MATCHES-ENGLISH-SPELLING, re-asked with the "though" example rather than the existing "knife" example'),

  // ─── eng.phonetics.minimal-pairs (HIGH) ─────────────────────────────────
  probe('eng.phonetics.minimal-pairs', 'checkpoint', H,
    '"Pin" and "bat" differ in more than one sound position, while "pin" and "bin" differ in only the first sound. Is any pair of similar-sounding words automatically a minimal pair?',
    'No — a true minimal pair must differ in exactly one sound position, like "pin"/"bin"; pairs differing in more than one position, like "pin"/"bat," are not minimal pairs',
    'Yes — any pair of similar-sounding words counts as a minimal pair',
    'eng.phonetics.minimal-pairs:MC-ANY-SIMILAR-WORDS-ARE-MINIMAL-PAIRS',
    'MC-ANY-SIMILAR-WORDS-ARE-MINIMAL-PAIRS, re-asked with the "pin"/"bat" vs "pin"/"bin" example rather than the existing "cat"/"bad" example'),
  probe('eng.phonetics.minimal-pairs', 'true_false', H,
    '"Flour" and "flower" are spelled completely differently but are pronounced exactly the same way. Does a difference in spelling always mean there\'s a difference in pronunciation?',
    'No — words like "flour" and "flower" are spelled differently but pronounced identically (homophones), so spelling differences don\'t guarantee sound differences',
    "Yes — a spelling difference always means there's a pronunciation difference",
    'eng.phonetics.minimal-pairs:MC-SPELLING-DIFFERENCE-EQUALS-SOUND-DIFFERENCE',
    'MC-SPELLING-DIFFERENCE-EQUALS-SOUND-DIFFERENCE, re-asked with the "flour"/"flower" example rather than the existing "night"/"knight" example'),
]
