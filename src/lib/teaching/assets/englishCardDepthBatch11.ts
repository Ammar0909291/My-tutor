/**
 * ENGLISH CARD-DEPTH CAMPAIGN — Batch 11 (eng.linguistics part 2, 9 concepts, 27 cards).
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
 * slug and abandon the live row's identity. Each linguistics concept already uses
 *   native band : mcq, misconception_probe, checkpoint, true_false
 *   ADULT       : mcq, misconception_probe
 * so the three new cards take the FREE slots:
 *   native band (HIGH) : short_answer, fill_blank      ADULT : checkpoint
 * Serving never filters by probeKind (`probeToMcq` is the predicate), so the kind is
 * only a slot label.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedProbe } from './brainSeedAssets'

const S = 'english'
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


export const ENGLISH_CARD_DEPTH_BATCH_11: SeedProbe[] = [
  // ─── eng.linguistics.morphology-intro ────────────────────────────────────
  card('eng.linguistics.morphology-intro', 'short_answer', H,
    '"Teachers" has two syllables. A student says it therefore has two morphemes, and that "-er" and "-s" do the same kind of job. What is accurate?',
    'Three morphemes: teach, -er (makes a new word) and -s (marks plural)',
    ['Two morphemes, because a morpheme is simply the same thing as a syllable', 'MC-A-A-MORPHEME-IS-THE-SAME-THING-AS-A-SYLLABLE'],
    ['Three morphemes, with -er and -s doing the same kind of job, since any ending has the same effect on a word', 'MC-B-ADDING-ANY-ENDING-TO-A-WORD-HAS-THE-SAME-KIND-OF-EFFECT-DERIVATIONAL-AND-INFLECTIONAL-ARE-THE-SAME'],
    'morphemes are not syllables; derivational vs. inflectional, re-asked with "teachers"'),
  card('eng.linguistics.morphology-intro', 'fill_blank', H,
    'Complete the sentence: to count the morphemes in a word, ____.',
    'look for meaningful parts and ask what each ending does',
    ['count its syllables, since each syllable is one morpheme', 'MC-A-A-MORPHEME-IS-THE-SAME-THING-AS-A-SYLLABLE'],
    ['treat every ending as doing exactly the same job on the word', 'MC-B-ADDING-ANY-ENDING-TO-A-WORD-HAS-THE-SAME-KIND-OF-EFFECT-DERIVATIONAL-AND-INFLECTIONAL-ARE-THE-SAME'],
    'Replacement texts for both misconceptions'),
  card('eng.linguistics.morphology-intro', 'checkpoint', A,
    'A trainee says "reusable" has four syllables and so four morphemes, and that "-able" and the "-s" of "cups" do the same kind of job. Which assessment is accurate?',
    '"Reusable" has three morphemes; -able makes a new word while -s only marks grammar',
    ['Four morphemes, because each syllable is a morpheme, though -able and -s differ in job', 'MC-A-A-MORPHEME-IS-THE-SAME-THING-AS-A-SYLLABLE'],
    ['Three morphemes, but -able and -s do the same kind of job, since every ending has the same effect', 'MC-B-ADDING-ANY-ENDING-TO-A-WORD-HAS-THE-SAME-KIND-OF-EFFECT-DERIVATIONAL-AND-INFLECTIONAL-ARE-THE-SAME'],
    'both misconceptions; each wrong option keeps exactly one'),

  // ─── eng.linguistics.phonology-intro ─────────────────────────────────────
  card('eng.linguistics.phonology-intro', 'short_answer', H,
    'The "l" in "leaf" and the "l" in "feel" differ physically (clear and dark l), yet English speakers hear one sound. What does this show?',
    'Phonetics describes the physical difference; phonology asks whether it distinguishes words',
    ['Phonology and phonetics are the same study of how sounds are produced and heard', 'MC-A-PHONOLOGY-AND-PHONETICS-ARE-THE-SAME-THING'],
    ['Physically different sounds must be different phonemes in every language, English included', 'MC-B-IF-TWO-SOUNDS-ARE-PHYSICALLY-DIFFERENT-THEY-MUST-BE-DIFFERENT-PHONEMES-IN-EVERY-LANGUAGE'],
    'phonetic vs. phonemic difference, re-asked with clear and dark l'),
  card('eng.linguistics.phonology-intro', 'fill_blank', H,
    'Complete the sentence: phonetics studies how sounds are made and heard, while phonology studies ____.',
    'which sound differences signal meaning in a particular language',
    ['exactly the same thing, the physical production of sounds', 'MC-A-PHONOLOGY-AND-PHONETICS-ARE-THE-SAME-THING'],
    ['only differences that are physically measurable, in every language alike', 'MC-B-IF-TWO-SOUNDS-ARE-PHYSICALLY-DIFFERENT-THEY-MUST-BE-DIFFERENT-PHONEMES-IN-EVERY-LANGUAGE'],
    'Replacement texts for both misconceptions'),
  card('eng.linguistics.phonology-intro', 'checkpoint', A,
    'The "t" of "top" and the "t" of "stop" differ physically (aspirated and unaspirated), yet English treats them as one sound. A student says a physical difference means separate phonemes, and that phonology is just another name for phonetics. Which is accurate?',
    'Phonology asks which differences matter; English treats these as one phoneme',
    ['Physical difference always means separate phonemes in every language', 'MC-B-IF-TWO-SOUNDS-ARE-PHYSICALLY-DIFFERENT-THEY-MUST-BE-DIFFERENT-PHONEMES-IN-EVERY-LANGUAGE'],
    ['Phonology is simply phonetics under another name, so no further distinction is needed', 'MC-A-PHONOLOGY-AND-PHONETICS-ARE-THE-SAME-THING'],
    'both misconceptions, with aspirated and unaspirated t'),

  // ─── eng.linguistics.pragmatics-intro ────────────────────────────────────
  card('eng.linguistics.pragmatics-intro', 'short_answer', H,
    'Asked "Did you finish the report?", Dan says, "I was in meetings all day." What is accurate?',
    'He conveys "no" indirectly: implicature is meaning beyond the literal words, not vagueness',
    ['He literally said nothing about the report, so he conveyed nothing at all', 'MC-A-WHAT-A-SPEAKER-LITERALLY-SAYS-IS-ALWAYS-EXACTLY-WHAT-THEY-MEAN'],
    ['He was just being vague and unclear, and implied meaning is only a kind of vagueness', 'MC-B-IMPLICATURE-MEANS-THE-SAME-AS-LITERAL-VAGUENESS-OR-JUST-BEING-UNCLEAR'],
    'implicature is reliably conveyed meaning, re-asked with an unfinished report'),
  card('eng.linguistics.pragmatics-intro', 'fill_blank', H,
    'Complete the sentence: implicature is ____.',
    'meaning reliably conveyed beyond the literal words',
    ['exactly what the words literally say, and nothing more', 'MC-A-WHAT-A-SPEAKER-LITERALLY-SAYS-IS-ALWAYS-EXACTLY-WHAT-THEY-MEAN'],
    ['just vagueness or unclear speech', 'MC-B-IMPLICATURE-MEANS-THE-SAME-AS-LITERAL-VAGUENESS-OR-JUST-BEING-UNCLEAR'],
    'Replacement text, MC-B-IMPLICATURE-MEANS-THE-SAME-AS-LITERAL-VAGUENESS-OR-JUST-BEING-UNCLEAR'),
  card('eng.linguistics.pragmatics-intro', 'checkpoint', A,
    'A dinner guest says, "The soup is a bit salty", and the host immediately offers water. A trainee says the guest communicated only what her words literally said, and that implied meanings are just being unclear. Which assessment is accurate?',
    'The guest implied a complaint; implicature is reliably conveyed meaning, not vagueness',
    ['She is right: speakers mean exactly what they literally say, so nothing more was conveyed', 'MC-A-WHAT-A-SPEAKER-LITERALLY-SAYS-IS-ALWAYS-EXACTLY-WHAT-THEY-MEAN'],
    ['She is right: implied meaning is only a polite word for being vague or unclear', 'MC-B-IMPLICATURE-MEANS-THE-SAME-AS-LITERAL-VAGUENESS-OR-JUST-BEING-UNCLEAR'],
    'both misconceptions, with a salty-soup remark'),

  // ─── eng.linguistics.psycholinguistics-intro ─────────────────────────────
  card('eng.linguistics.psycholinguistics-intro', 'short_answer', H,
    'A speaker says "a lack of pies" for "a pack of lies". A student says slips like this are random noise, and that how effortless reading feels proves how the mind processes words. What is the best view?',
    'Slips follow patterns that reveal planning; feelings of ease are not reliable evidence',
    ['How reading feels is a reliable guide to what the mind actually does', 'MC-A-INTROSPECTION-SIMPLY-THINKING-ABOUT-HOW-LANGUAGE-FEELS-TO-USE-IS-A-RELIABLE-WAY-TO-STUDY-MENTAL-LANGUAGE-PROCESSES'],
    ['Slips of the tongue are just random noise with no pattern worth studying, so they reveal nothing', 'MC-B-SPEECH-ERRORS-SLIPS-OF-THE-TONGUE-ARE-JUST-RANDOM-NOISE-WITH-NO-SYSTEMATIC-PATTERN'],
    'speech errors as data; introspection is unreliable, re-asked with a spoonerism'),
  card('eng.linguistics.psycholinguistics-intro', 'fill_blank', H,
    'Complete the sentence: to study how the mind processes language, researchers ____.',
    'use experiments and speech-error data',
    ['rely on introspection about how language feels to use', 'MC-A-INTROSPECTION-SIMPLY-THINKING-ABOUT-HOW-LANGUAGE-FEELS-TO-USE-IS-A-RELIABLE-WAY-TO-STUDY-MENTAL-LANGUAGE-PROCESSES'],
    ['ignore speech errors as random noise that tells us nothing', 'MC-B-SPEECH-ERRORS-SLIPS-OF-THE-TONGUE-ARE-JUST-RANDOM-NOISE-WITH-NO-SYSTEMATIC-PATTERN'],
    'Replacement texts for both misconceptions'),
  card('eng.linguistics.psycholinguistics-intro', 'checkpoint', A,
    'A manager says she knows exactly how her mind finds words because it feels instant, and dismisses a colleague\'s slip "the queer old dean" for "the dear old queen" as meaningless noise. Which assessment is accurate?',
    'Introspection is unreliable here, and systematic slips are real evidence about planning',
    ['She is right: how language feels to use is a reliable guide to the mind', 'MC-A-INTROSPECTION-SIMPLY-THINKING-ABOUT-HOW-LANGUAGE-FEELS-TO-USE-IS-A-RELIABLE-WAY-TO-STUDY-MENTAL-LANGUAGE-PROCESSES'],
    ['She is right: slips are random noise with no pattern behind them', 'MC-B-SPEECH-ERRORS-SLIPS-OF-THE-TONGUE-ARE-JUST-RANDOM-NOISE-WITH-NO-SYSTEMATIC-PATTERN'],
    'both misconceptions, with a classic Spooner slip'),

  // ─── eng.linguistics.semantics-intro ─────────────────────────────────────
  card('eng.linguistics.semantics-intro', 'short_answer', H,
    '"Dog bites man" and "Man bites dog" use the same words, and "puppy" is a kind of "dog". What do these show?',
    'Structure as well as words shapes meaning, and words relate to other words',
    ['Each word is just a simple label with no relationships to any other word', 'MC-A-WORD-MEANING-IS-A-SIMPLE-ONE-TO-ONE-LABEL-WITH-NO-INTERNAL-STRUCTURE-OR-RELATIONSHIPS'],
    ['A sentence means the sum of its words, in any order, so the two must mean the same', 'MC-B-SENTENCE-MEANING-IS-JUST-THE-SUM-OF-INDIVIDUAL-WORD-MEANINGS-IN-ANY-ORDER'],
    'word relations and structure, re-asked with dog and man'),
  card('eng.linguistics.semantics-intro', 'fill_blank', H,
    'Complete the sentence: the meaning of a sentence depends on ____.',
    'the meanings of its words and how they are structured',
    ['only the words it contains, taken in any order', 'MC-B-SENTENCE-MEANING-IS-JUST-THE-SUM-OF-INDIVIDUAL-WORD-MEANINGS-IN-ANY-ORDER'],
    ['single labels for each word, with no links between words', 'MC-A-WORD-MEANING-IS-A-SIMPLE-ONE-TO-ONE-LABEL-WITH-NO-INTERNAL-STRUCTURE-OR-RELATIONSHIPS'],
    'Replacement texts for both misconceptions'),
  card('eng.linguistics.semantics-intro', 'checkpoint', A,
    'A drafter claims each word in a contract is a simple one-to-one label, and that a sentence means the sum of its words in any order. Which assessment is accurate?',
    'Words sit in meaning relationships, and structure affects sentence meaning',
    ['She is right: words are just labels with no relationships between them', 'MC-A-WORD-MEANING-IS-A-SIMPLE-ONE-TO-ONE-LABEL-WITH-NO-INTERNAL-STRUCTURE-OR-RELATIONSHIPS'],
    ['She is right: sentence meaning is just the sum of the words, whatever their order', 'MC-B-SENTENCE-MEANING-IS-JUST-THE-SUM-OF-INDIVIDUAL-WORD-MEANINGS-IN-ANY-ORDER'],
    'both misconceptions, with a contract drafter'),

  // ─── eng.linguistics.sociolinguistics-intro ──────────────────────────────
  card('eng.linguistics.sociolinguistics-intro', 'short_answer', H,
    'In one city older speakers say "sofa" and younger ones "couch", and a lawyer speaks formally in court but casually with friends. A student says variation is only about region, and the lawyer must not know either style well. What is the best view?',
    'Variation also follows social factors such as age, and switching styles shows skill in both',
    ['Variation depends only on geography, so age cannot matter', 'MC-A-LANGUAGE-VARIATION-IS-ONLY-ABOUT-GEOGRAPHIC-REGION-NOT-SOCIAL-FACTORS'],
    ['Switching shows that she does not fully know either style', 'MC-B-CODE-SWITCHING-AND-REGISTER-SHIFTING-MEAN-A-SPEAKER-DOESNT-FULLY-KNOW-EITHER-VARIETY'],
    'social factors and skilled style shifting, re-asked with sofa/couch and a lawyer'),
  card('eng.linguistics.sociolinguistics-intro', 'fill_blank', H,
    'Complete the sentence: a speaker who switches between styles or languages usually ____.',
    'knows both well and chooses between them to suit the setting',
    ['does not fully know either variety', 'MC-B-CODE-SWITCHING-AND-REGISTER-SHIFTING-MEAN-A-SPEAKER-DOESNT-FULLY-KNOW-EITHER-VARIETY'],
    ['is simply showing a regional accent, since variation is only geographic', 'MC-A-LANGUAGE-VARIATION-IS-ONLY-ABOUT-GEOGRAPHIC-REGION-NOT-SOCIAL-FACTORS'],
    'Replacement texts for both misconceptions'),
  card('eng.linguistics.sociolinguistics-intro', 'checkpoint', A,
    'On one hospital ward, newer nurses use a phrase more than veterans do, and a nurse who talks formally to patients but casually at lunch is said not to "really master English". A colleague says variation is purely geographic. Which assessment is accurate?',
    'Age is a social factor in variation, and style shifting shows command of both styles',
    ['The colleague is right that variation is only about geography, not social factors', 'MC-A-LANGUAGE-VARIATION-IS-ONLY-ABOUT-GEOGRAPHIC-REGION-NOT-SOCIAL-FACTORS'],
    ['The nurse\'s shifting shows that she does not fully know either style', 'MC-B-CODE-SWITCHING-AND-REGISTER-SHIFTING-MEAN-A-SPEAKER-DOESNT-FULLY-KNOW-EITHER-VARIETY'],
    'both misconceptions, on a hospital ward'),

  // ─── eng.linguistics.syntax-theory-intro ─────────────────────────────────
  card('eng.linguistics.syntax-theory-intro', 'short_answer', H,
    'A child never taught any rule says "the three small red cars", never "the red three small cars". "The cheerful rock drafted a happy theory" has normal word order but is odd in meaning. What does this show?',
    'Syntax is acquired without teaching, and grammaticality is separate from sense',
    ['Syntax is just the school rules taught for writing correctly', 'MC-A-SYNTAX-IS-JUST-SCHOOL-GRAMMAR-RULES-FOR-WRITING-CORRECTLY'],
    ['A grammatical sentence must also make sense, so the second sentence is ungrammatical', 'MC-B-A-GRAMMATICALLY-CORRECT-SENTENCE-MUST-ALSO-MAKE-SENSE-SYNTAX-AND-MEANING-ARE-THE-SAME-THING'],
    'syntax is internalised; syntax vs. meaning, re-asked with an odd-meaning sentence'),
  card('eng.linguistics.syntax-theory-intro', 'fill_blank', H,
    'Complete the sentence: syntax is ____.',
    'the unconscious system of word order and structure speakers know',
    ['the school rules that were taught for writing correctly in formal essays', 'MC-A-SYNTAX-IS-JUST-SCHOOL-GRAMMAR-RULES-FOR-WRITING-CORRECTLY'],
    ['the same thing as whether a sentence makes sense', 'MC-B-A-GRAMMATICALLY-CORRECT-SENTENCE-MUST-ALSO-MAKE-SENSE-SYNTAX-AND-MEANING-ARE-THE-SAME-THING'],
    'Replacement texts for both misconceptions'),
  card('eng.linguistics.syntax-theory-intro', 'checkpoint', A,
    'A manager insists "The report sleeps loudly on Tuesday" is bad grammar because it makes no sense, and says grammar means the rules she was taught for writing. Which assessment is accurate?',
    'Its structure is grammatical though odd in meaning; syntax is internalised knowledge',
    ['She is right: a sentence that makes no sense must be ungrammatical', 'MC-B-A-GRAMMATICALLY-CORRECT-SENTENCE-MUST-ALSO-MAKE-SENSE-SYNTAX-AND-MEANING-ARE-THE-SAME-THING'],
    ['She is right: syntax means only the rules that were taught for writing correctly at school', 'MC-A-SYNTAX-IS-JUST-SCHOOL-GRAMMAR-RULES-FOR-WRITING-CORRECTLY'],
    'both misconceptions, with an odd-meaning sentence'),

  // ─── eng.linguistics.translation-studies-intro ───────────────────────────
  card('eng.linguistics.translation-studies-intro', 'short_answer', H,
    'A translator renders "break a leg" word for word and gets a puzzling phrase; another gives the local "good luck" phrase. A third says only one translation can be correct. What is the best view?',
    'A good translation conveys meaning and effect, so several valid translations can exist',
    ['The word-for-word version is best, since translation is word substitution', 'MC-A-A-GOOD-TRANSLATION-IS-A-MECHANICAL-WORD-FOR-WORD-SUBSTITUTION-FROM-ONE-LANGUAGE-TO-ANOTHER'],
    ['Only one translation is correct, and every other version is simply wrong', 'MC-B-THERE-IS-ALWAYS-EXACTLY-ONE-CORRECT-TRANSLATION-FOR-A-GIVEN-PASSAGE-AND-ALL-OTHERS-ARE-WRONG'],
    'meaning-based translation with several valid versions, re-asked with "break a leg"'),
  card('eng.linguistics.translation-studies-intro', 'fill_blank', H,
    'Complete the sentence: a good translation ____.',
    'carries over meaning and effect, and several versions can be valid',
    ['swaps each word for its dictionary equivalent', 'MC-A-A-GOOD-TRANSLATION-IS-A-MECHANICAL-WORD-FOR-WORD-SUBSTITUTION-FROM-ONE-LANGUAGE-TO-ANOTHER'],
    ['is the single correct rendering, so all other versions are errors', 'MC-B-THERE-IS-ALWAYS-EXACTLY-ONE-CORRECT-TRANSLATION-FOR-A-GIVEN-PASSAGE-AND-ALL-OTHERS-ARE-WRONG'],
    'Replacement texts for both misconceptions'),
  card('eng.linguistics.translation-studies-intro', 'checkpoint', A,
    'A company translates a slogan word for word and gets nonsense in the target language; its agency says every text has only one correct translation. Which assessment is accurate?',
    'Literal substitution fails for idiomatic text, and several adequate translations can serve different goals',
    ['The word-for-word version is correct, since translating means substitution', 'MC-A-A-GOOD-TRANSLATION-IS-A-MECHANICAL-WORD-FOR-WORD-SUBSTITUTION-FROM-ONE-LANGUAGE-TO-ANOTHER'],
    ['The agency is right: every passage has one correct translation and no other', 'MC-B-THERE-IS-ALWAYS-EXACTLY-ONE-CORRECT-TRANSLATION-FOR-A-GIVEN-PASSAGE-AND-ALL-OTHERS-ARE-WRONG'],
    'both misconceptions, with a slogan'),

  // ─── eng.linguistics.what-is-linguistics ─────────────────────────────────
  card('eng.linguistics.what-is-linguistics', 'short_answer', H,
    'One linguist records how teenagers in a town really speak, without judging it right or wrong; another studies how babies learn words. A friend says linguistics is the study of correct grammar, all in one subject. What is the best view?',
    'Linguistics describes how language really works and varies, across many subfields',
    ['It is the study of which grammar rules are correct and which are wrong', 'MC-A-LINGUISTICS-IS-THE-STUDY-OF-CORRECT-GRAMMAR-RULES'],
    ['It is a single subject that is all about grammar', 'MC-B-LINGUISTICS-IS-JUST-ONE-SINGLE-SUBJECT-ABOUT-GRAMMAR'],
    'descriptive, multi-subfield linguistics, re-asked with teenagers and babies'),
  card('eng.linguistics.what-is-linguistics', 'fill_blank', H,
    'Complete the sentence: linguistics is ____.',
    'the scientific study of language, with many subfields',
    ['the study of which grammar rules are correct', 'MC-A-LINGUISTICS-IS-THE-STUDY-OF-CORRECT-GRAMMAR-RULES'],
    ['one subject, and it is only about grammar', 'MC-B-LINGUISTICS-IS-JUST-ONE-SINGLE-SUBJECT-ABOUT-GRAMMAR'],
    'Replacement texts for both misconceptions'),
  card('eng.linguistics.what-is-linguistics', 'checkpoint', A,
    'A manager tells a new hire that linguistics is "the study of correct English" and "just grammar". Which assessment is accurate?',
    'Linguistics describes language as speakers use it, across subfields such as syntax',
    ['She is right: linguistics is about which grammar rules are correct', 'MC-A-LINGUISTICS-IS-THE-STUDY-OF-CORRECT-GRAMMAR-RULES'],
    ['She is right: linguistics is a single subject about grammar and the correct rules, nothing else', 'MC-B-LINGUISTICS-IS-JUST-ONE-SINGLE-SUBJECT-ABOUT-GRAMMAR'],
    'both misconceptions, with a new hire'),
]
