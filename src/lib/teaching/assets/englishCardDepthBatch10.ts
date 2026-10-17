/**
 * ENGLISH CARD-DEPTH CAMPAIGN — Batch 10 (eng.linguistics part 1, 9 concepts, 27 cards).
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


export const ENGLISH_CARD_DEPTH_BATCH_10: SeedProbe[] = [
  // ─── eng.linguistics.applied-linguistics-intro ───────────────────────────
  card('eng.linguistics.applied-linguistics-intro', 'short_answer', H,
    'A school teaches a language only through memorised word lists and rule tables because "that is how it has always been done", and tests it with a paper written in one regional dialect. What is the best evaluation?',
    'Check the method against evidence, and whether the test measures skill rather than dialect',
    ['The method is effective, because a traditional and familiar method must work, having served generations of students', 'MC-A-ANY-LANGUAGE-TEACHING-METHOD-THAT-FEELS-TRADITIONAL-OR-FAMILIAR-MUST-BE-EFFECTIVE'],
    ['The test is fair and neutral, since it uses one standard dialect', 'MC-B-A-STANDARDIZED-LANGUAGE-TEST-THAT-USES-ONE-DIALECT-IS-A-NEUTRAL-FAIR-MEASURE-OF-LANGUAGE-SKILL'],
    'evidence-based method evaluation and fair testing, re-asked with a traditional school'),
  card('eng.linguistics.applied-linguistics-intro', 'fill_blank', H,
    'Complete the sentence: to judge a teaching method or a language test, ask whether ____.',
    'it matches evidence about how languages are learned and measures what it claims to',
    ['it feels traditional and familiar, which shows that it works', 'MC-A-ANY-LANGUAGE-TEACHING-METHOD-THAT-FEELS-TRADITIONAL-OR-FAMILIAR-MUST-BE-EFFECTIVE'],
    ['it uses one standard dialect, which makes it a neutral measure', 'MC-B-A-STANDARDIZED-LANGUAGE-TEST-THAT-USES-ONE-DIALECT-IS-A-NEUTRAL-FAIR-MEASURE-OF-LANGUAGE-SKILL'],
    'Replacement texts for both misconceptions'),
  card('eng.linguistics.applied-linguistics-intro', 'checkpoint', A,
    'A company\'s training relies on long translation drills because "it worked when we were students", and its proficiency test marks a legitimate dialect construction as wrong. Which assessment is accurate?',
    'Familiarity is not evidence of effectiveness, and a one-dialect test can mismeasure skill',
    ['The drills are effective, because a familiar method must work', 'MC-A-ANY-LANGUAGE-TEACHING-METHOD-THAT-FEELS-TRADITIONAL-OR-FAMILIAR-MUST-BE-EFFECTIVE'],
    ['The test is fair, since a single standard dialect gives a neutral, fair measure of language skill', 'MC-B-A-STANDARDIZED-LANGUAGE-TEST-THAT-USES-ONE-DIALECT-IS-A-NEUTRAL-FAIR-MEASURE-OF-LANGUAGE-SKILL'],
    'both misconceptions, in a corporate-training setting'),

  // ─── eng.linguistics.bilingualism-and-multilingualism ────────────────────
  card('eng.linguistics.bilingualism-and-multilingualism', 'short_answer', H,
    'Noor speaks Urdu at home and English at school, fluent in each for the topics she uses it for. She sometimes says, "Mama, I want the doodh, please". What is accurate?',
    'She is bilingual; mixing is a normal feature, not confusion',
    ['She is not truly bilingual unless she is equally native-like in both languages', 'MC-A-A-TRUE-BILINGUAL-MUST-HAVE-EQUAL-NATIVE-LIKE-FLUENCY-IN-BOTH-LANGUAGES-SEPARATELY'],
    ['Mixing languages in one sentence shows that she is confused or delayed', 'MC-B-A-BILINGUAL-CHILD-MIXING-TWO-LANGUAGES-IN-ONE-SENTENCE-IS-CONFUSED-OR-DELAYED'],
    'overall competence and normal code-mixing, re-asked with Urdu and English'),
  card('eng.linguistics.bilingualism-and-multilingualism', 'fill_blank', H,
    'Complete the sentence: when a bilingual child mixes two languages in one sentence, this ____.',
    'is usually normal and rule-governed, and shows skill in both languages',
    ['shows that the child is confused or delayed', 'MC-B-A-BILINGUAL-CHILD-MIXING-TWO-LANGUAGES-IN-ONE-SENTENCE-IS-CONFUSED-OR-DELAYED'],
    ['means the child is not truly bilingual, since true bilinguals keep them apart', 'MC-A-A-TRUE-BILINGUAL-MUST-HAVE-EQUAL-NATIVE-LIKE-FLUENCY-IN-BOTH-LANGUAGES-SEPARATELY'],
    'Replacement texts for both misconceptions'),
  card('eng.linguistics.bilingualism-and-multilingualism', 'checkpoint', A,
    'A hiring manager says a candidate is "not really bilingual" because she presents better in one language, and worries that her casual habit of mixing languages shows confusion. Which assessment is accurate?',
    'Bilingual competence is judged overall, and mixing reflects skill, not confusion',
    ['The manager is right: true bilinguals have equal, native-like fluency in both languages', 'MC-A-A-TRUE-BILINGUAL-MUST-HAVE-EQUAL-NATIVE-LIKE-FLUENCY-IN-BOTH-LANGUAGES-SEPARATELY'],
    ['The manager is right: mixing languages is a sign of confusion', 'MC-B-A-BILINGUAL-CHILD-MIXING-TWO-LANGUAGES-IN-ONE-SENTENCE-IS-CONFUSED-OR-DELAYED'],
    'both misconceptions, in a hiring setting'),

  // ─── eng.linguistics.computational-linguistics-intro ─────────────────────
  card('eng.linguistics.computational-linguistics-intro', 'short_answer', H,
    'A chatbot writes a fluent, grammatically perfect paragraph that states a false date as fact. A student says it must understand the topic like a human, and that such systems handle every aspect of language equally well. What is the best view?',
    'Fluent output does not prove human-like understanding, and these systems have real limits',
    ['It must understand the topic as a human does, since its output is fluent and grammatical', 'MC-A-A-COMPUTER-PRODUCING-FLUENT-GRAMMATICALLY-CORRECT-LANGUAGE-MUST-UNDERSTAND-THE-MEANING-THE-WAY-A-HUMAN-DOES'],
    ['It handles every aspect of language equally well, so the false date is only a rare glitch', 'MC-B-COMPUTATIONAL-LANGUAGE-SYSTEMS-CAN-HANDLE-EVERY-ASPECT-OF-LANGUAGE-EQUALLY-WELL-WITH-NO-GENUINE-LIMITATIONS'],
    'fluency is not understanding; systems have limits, re-asked with a chatbot and a false date'),
  card('eng.linguistics.computational-linguistics-intro', 'fill_blank', H,
    'Complete the sentence: when a system produces fluent, grammatical text, ____.',
    'that does not prove it understands as a person does, and it still has real limits',
    ['it must understand the meaning in the way a human does', 'MC-A-A-COMPUTER-PRODUCING-FLUENT-GRAMMATICALLY-CORRECT-LANGUAGE-MUST-UNDERSTAND-THE-MEANING-THE-WAY-A-HUMAN-DOES'],
    ['it can handle every aspect of language equally well', 'MC-B-COMPUTATIONAL-LANGUAGE-SYSTEMS-CAN-HANDLE-EVERY-ASPECT-OF-LANGUAGE-EQUALLY-WELL-WITH-NO-GENUINE-LIMITATIONS'],
    'Replacement texts for both misconceptions'),
  card('eng.linguistics.computational-linguistics-intro', 'checkpoint', A,
    'A manager says a tool that drafts flawless emails must truly understand customers\' needs, and that it can deal with every language task equally well. Which assessment is accurate?',
    'Fluency does not show human-style understanding, and such tools have real limits',
    ['She is right: grammatically perfect output requires genuinely human-like understanding of the customers', 'MC-A-A-COMPUTER-PRODUCING-FLUENT-GRAMMATICALLY-CORRECT-LANGUAGE-MUST-UNDERSTAND-THE-MEANING-THE-WAY-A-HUMAN-DOES'],
    ['She is right: these tools handle every language task equally well', 'MC-B-COMPUTATIONAL-LANGUAGE-SYSTEMS-CAN-HANDLE-EVERY-ASPECT-OF-LANGUAGE-EQUALLY-WELL-WITH-NO-GENUINE-LIMITATIONS'],
    'both misconceptions, in a workplace setting'),

  // ─── eng.linguistics.corpus-linguistics-intro ────────────────────────────
  card('eng.linguistics.corpus-linguistics-intro', 'short_answer', H,
    'A writer wants to know which of two phrasings is more common in published English. One student trusts her own feeling; another finds one construction rare in a corpus and calls it ungrammatical. What is the best approach?',
    'Check frequency in a corpus rather than relying on intuition, and remember that rare does not mean ungrammatical',
    ['Trust intuition, which is as reliable as corpus data about how often forms are used', 'MC-A-MY-OWN-INTUITION-ABOUT-HOW-LANGUAGE-IS-USUALLY-USED-IS-ALWAYS-AS-RELIABLE-AS-CORPUS-DATA'],
    ['Treat the rare construction as ungrammatical, since rarity shows that it is wrong', 'MC-B-IF-CORPUS-DATA-SHOWS-SOMETHING-IS-RARE-OR-UNUSUAL-IT-MUST-BE-UNGRAMMATICAL'],
    'corpus data for frequency; rarity is not ungrammaticality, re-asked with two phrasings'),
  card('eng.linguistics.corpus-linguistics-intro', 'fill_blank', H,
    'Complete the sentence: for questions about how often a form is used, ____.',
    'check a corpus; a rare form is not necessarily ungrammatical',
    ['trust your intuition, which is as reliable as corpus data', 'MC-A-MY-OWN-INTUITION-ABOUT-HOW-LANGUAGE-IS-USUALLY-USED-IS-ALWAYS-AS-RELIABLE-AS-CORPUS-DATA'],
    ['treat any form that is rare in the corpus as ungrammatical', 'MC-B-IF-CORPUS-DATA-SHOWS-SOMETHING-IS-RARE-OR-UNUSUAL-IT-MUST-BE-UNGRAMMATICAL'],
    'Replacement texts for both misconceptions'),
  card('eng.linguistics.corpus-linguistics-intro', 'checkpoint', A,
    'Drafting a style guide, an editor relies on "what sounds natural to me" for how often a phrase occurs, and bans a construction that a corpus shows is uncommon but well-formed. Which assessment is accurate?',
    'Frequency needs corpus data, and an uncommon form can still be grammatical',
    ['Her own sense of how often phrases occur is as reliable as corpus counts', 'MC-A-MY-OWN-INTUITION-ABOUT-HOW-LANGUAGE-IS-USUALLY-USED-IS-ALWAYS-AS-RELIABLE-AS-CORPUS-DATA'],
    ['A construction uncommon in a corpus must be ungrammatical, so banning it is right', 'MC-B-IF-CORPUS-DATA-SHOWS-SOMETHING-IS-RARE-OR-UNUSUAL-IT-MUST-BE-UNGRAMMATICAL'],
    'both misconceptions, in a style-guide setting'),

  // ─── eng.linguistics.dialectology ────────────────────────────────────────
  card('eng.linguistics.dialectology', 'short_answer', H,
    'A map plots where people say "you guys" versus "y\'all" and, separately, a vowel pronunciation, and the two boundaries do not match. What does this show?',
    'Dialect features have different, often gradual boundaries, so there is no single sharp dividing line',
    ['The mapmaker made a mistake: there should be one sharp line with everyone on each side speaking alike', 'MC-A-DIALECT-BOUNDARIES-ARE-SHARP-LINES-WHERE-EVERYONE-ON-ONE-SIDE-SPEAKS-ONE-WAY-AND-EVERYONE-ON-THE-OTHER-SPEAKS-DIFFERENTLY'],
    ['A dialect is a single unified thing that everyone in the region either has or lacks', 'MC-B-A-DIALECT-IS-ONE-SINGLE-UNIFIED-THING-EVERYONE-IN-A-REGION-EITHER-HAS-OR-DOESNT-HAVE'],
    'isoglosses differ and are fuzzy, re-asked with "you guys"/"y\'all"'),
  card('eng.linguistics.dialectology', 'fill_blank', H,
    'Complete the sentence: the boundary of one dialect feature ____.',
    'rarely lines up exactly with another feature\'s boundary, and speakers within a region vary',
    ['is a sharp line with everyone on each side speaking alike', 'MC-A-DIALECT-BOUNDARIES-ARE-SHARP-LINES-WHERE-EVERYONE-ON-ONE-SIDE-SPEAKS-ONE-WAY-AND-EVERYONE-ON-THE-OTHER-SPEAKS-DIFFERENTLY'],
    ['marks one unified dialect that everyone in the region has', 'MC-B-A-DIALECT-IS-ONE-SINGLE-UNIFIED-THING-EVERYONE-IN-A-REGION-EITHER-HAS-OR-DOESNT-HAVE'],
    'Replacement texts for both misconceptions'),
  card('eng.linguistics.dialectology', 'checkpoint', A,
    'A researcher maps three features across a region and finds three boundaries that do not coincide. A colleague insists each boundary should be a sharp line, and that the region\'s dialect is one thing all residents share. Which assessment is accurate?',
    'Features have separate, often gradual boundaries, and a dialect label covers considerable variation among speakers',
    ['The colleague is right that dialect boundaries are sharp lines dividing speakers', 'MC-A-DIALECT-BOUNDARIES-ARE-SHARP-LINES-WHERE-EVERYONE-ON-ONE-SIDE-SPEAKS-ONE-WAY-AND-EVERYONE-ON-THE-OTHER-SPEAKS-DIFFERENTLY'],
    ['The colleague is right that all residents share one single, unified dialect', 'MC-B-A-DIALECT-IS-ONE-SINGLE-UNIFIED-THING-EVERYONE-IN-A-REGION-EITHER-HAS-OR-DOESNT-HAVE'],
    'both misconceptions, with a three-feature map'),

  // ─── eng.linguistics.discourse-analysis-intro ────────────────────────────
  card('eng.linguistics.discourse-analysis-intro', 'short_answer', H,
    'A paragraph is full of "it", "this", "however" and "therefore", but its ideas do not connect logically. In a conversation, speakers swap turns smoothly after falling pitch and a pause. What is the best conclusion?',
    'Cohesive devices do not guarantee coherence, and turn-taking follows signals',
    ['The paragraph is coherent, because many cohesive devices make a text automatically coherent', 'MC-A-A-TEXT-WITH-LOTS-OF-COHESIVE-DEVICES-LIKE-PRONOUNS-AND-CONJUNCTIONS-IS-AUTOMATICALLY-COHERENT'],
    ['Turn-taking happens at random, with no underlying structure', 'MC-B-CONVERSATIONAL-TURN-TAKING-JUST-HAPPENS-RANDOMLY-WITH-NO-UNDERLYING-STRUCTURE'],
    'cohesion is not coherence; turn-taking signals, re-asked with a connective-heavy paragraph'),
  card('eng.linguistics.discourse-analysis-intro', 'fill_blank', H,
    'Complete the sentence: discourse analysis looks for ____ in texts and conversations.',
    'patterns such as coherence and turn-taking signals, not just counts of connecting words',
    ['high counts of connecting words, which show that a text is coherent', 'MC-A-A-TEXT-WITH-LOTS-OF-COHESIVE-DEVICES-LIKE-PRONOUNS-AND-CONJUNCTIONS-IS-AUTOMATICALLY-COHERENT'],
    ['no pattern at all in turn-taking, which is random', 'MC-B-CONVERSATIONAL-TURN-TAKING-JUST-HAPPENS-RANDOMLY-WITH-NO-UNDERLYING-STRUCTURE'],
    'Replacement texts for both misconceptions'),
  card('eng.linguistics.discourse-analysis-intro', 'checkpoint', A,
    'A memo is rich in "this", "it" and "therefore", yet readers cannot tell what "this" refers to. A trainer also claims turn-taking in meetings is random. Which assessment is accurate?',
    'The memo is cohesive but not coherent; turn-taking follows signals',
    ['The memo is coherent, because plenty of cohesive devices make a text coherent', 'MC-A-A-TEXT-WITH-LOTS-OF-COHESIVE-DEVICES-LIKE-PRONOUNS-AND-CONJUNCTIONS-IS-AUTOMATICALLY-COHERENT'],
    ['The trainer is right: turn-taking happens at random, with no underlying structure', 'MC-B-CONVERSATIONAL-TURN-TAKING-JUST-HAPPENS-RANDOMLY-WITH-NO-UNDERLYING-STRUCTURE'],
    'both misconceptions, in a workplace setting'),

  // ─── eng.linguistics.historical-linguistics-intro ────────────────────────
  card('eng.linguistics.historical-linguistics-intro', 'short_answer', H,
    'A columnist says new slang is "corrupting" English. A linguist shows that a sound changed the same way across dozens of words. What is the best conclusion?',
    'Language change is natural and often systematic',
    ['The columnist is right: change corrupts a purer earlier form of the language', 'MC-A-LANGUAGE-CHANGE-IS-RANDOM-DECAY-OR-CORRUPTION-OF-A-PURER-EARLIER-FORM'],
    ['Each word changes randomly on its own, so no pattern exists', 'MC-B-LANGUAGE-CHANGE-HAPPENS-RANDOMLY-WORD-BY-WORD-WITH-NO-SYSTEMATIC-PATTERN'],
    'change is natural and systematic, re-asked with a columnist and a sound shift'),
  card('eng.linguistics.historical-linguistics-intro', 'fill_blank', H,
    'Complete the sentence: language change is ____.',
    'natural, and it often follows systematic sound patterns',
    ['decay from a purer earlier form', 'MC-A-LANGUAGE-CHANGE-IS-RANDOM-DECAY-OR-CORRUPTION-OF-A-PURER-EARLIER-FORM'],
    ['random, word by word, with no pattern', 'MC-B-LANGUAGE-CHANGE-HAPPENS-RANDOMLY-WORD-BY-WORD-WITH-NO-SYSTEMATIC-PATTERN'],
    'Replacement texts for both misconceptions'),
  card('eng.linguistics.historical-linguistics-intro', 'checkpoint', A,
    'A writer laments that modern English has "decayed" from Shakespeare\'s, and says each historical sound change just happened randomly, word by word. Which assessment is accurate?',
    'Change is neither decay nor random: sound changes tend to be systematic',
    ['The writer is right that later forms are corrupted versions of a purer earlier English', 'MC-A-LANGUAGE-CHANGE-IS-RANDOM-DECAY-OR-CORRUPTION-OF-A-PURER-EARLIER-FORM'],
    ['The writer is right that each change hit single words at random', 'MC-B-LANGUAGE-CHANGE-HAPPENS-RANDOMLY-WORD-BY-WORD-WITH-NO-SYSTEMATIC-PATTERN'],
    'both misconceptions, with a laments-decay writer'),

  // ─── eng.linguistics.language-acquisition-intro ──────────────────────────
  card('eng.linguistics.language-acquisition-intro', 'short_answer', H,
    'A four-year-old says "I runned home", a form she has never heard. Her uncle says children learn only by copying, and that his adult language class is just a weaker version of how she learns. What is the best view?',
    'Her form shows rule application, and adults learn differently, not just worse',
    ['Children simply copy what they hear, so she must have heard "runned" somewhere', 'MC-A-CHILDREN-LEARN-LANGUAGE-PURELY-BY-IMITATING-WHAT-THEY-HEAR-ADULTS-SAY'],
    ['Adult learning is only a weaker, worse copy of childhood acquisition', 'MC-B-LEARNING-A-LANGUAGE-LATER-IN-LIFE-IS-JUST-A-WEAKER-OR-WORSE-VERSION-OF-CHILDHOOD-ACQUISITION'],
    'children apply rules; later learning differs in kind, re-asked with "runned"'),
  card('eng.linguistics.language-acquisition-intro', 'fill_blank', H,
    'Complete the sentence: errors like "foots" in a child\'s speech show that the child ____.',
    'applies a rule worked out from what they hear, rather than only copying',
    ['only imitates exactly what adults say', 'MC-A-CHILDREN-LEARN-LANGUAGE-PURELY-BY-IMITATING-WHAT-THEY-HEAR-ADULTS-SAY'],
    ['learns in a way that adult learners can only match more weakly', 'MC-B-LEARNING-A-LANGUAGE-LATER-IN-LIFE-IS-JUST-A-WEAKER-OR-WORSE-VERSION-OF-CHILDHOOD-ACQUISITION'],
    'Replacement texts for both misconceptions'),
  card('eng.linguistics.language-acquisition-intro', 'checkpoint', A,
    'A teacher assumes a child saying "goed" must have heard adults say it, and thinks teenagers learning a new language are simply doing a weaker version of what toddlers do. Which assessment is accurate?',
    '"Goed" shows rule application, and later learning differs in kind',
    ['She is right: children acquire language purely by imitating the adults around them', 'MC-A-CHILDREN-LEARN-LANGUAGE-PURELY-BY-IMITATING-WHAT-THEY-HEAR-ADULTS-SAY'],
    ['She is right: later learning is just a weaker version of childhood acquisition', 'MC-B-LEARNING-A-LANGUAGE-LATER-IN-LIFE-IS-JUST-A-WEAKER-OR-WORSE-VERSION-OF-CHILDHOOD-ACQUISITION'],
    'both misconceptions, with a teacher'),

  // ─── eng.linguistics.language-families ───────────────────────────────────
  card('eng.linguistics.language-families', 'short_answer', H,
    'Basque and Spanish are spoken in the same region, use the Latin alphabet and share some borrowed words. A student says they must be in one family. What is correct?',
    'Not necessarily: relatedness needs systematic sound correspondences, not just script or region',
    ['Yes, since they have similar-sounding words, they must be related', 'MC-A-ANY-TWO-LANGUAGES-WITH-SIMILAR-SOUNDING-WORDS-MUST-BE-RELATED'],
    ['Yes, because languages in the same region using the same script are automatically in one family', 'MC-B-LANGUAGES-USING-THE-SAME-WRITING-SYSTEM-OR-LOCATED-IN-THE-SAME-REGION-ARE-AUTOMATICALLY-IN-THE-SAME-LANGUAGE-FAMILY'],
    'systematic correspondences decide relatedness, re-asked with Basque and Spanish'),
  card('eng.linguistics.language-families', 'fill_blank', H,
    'Complete the sentence: two languages are shown to be related by ____.',
    'regular sound correspondences across many words',
    ['a few similar-sounding words', 'MC-A-ANY-TWO-LANGUAGES-WITH-SIMILAR-SOUNDING-WORDS-MUST-BE-RELATED'],
    ['the same writing system or the same region', 'MC-B-LANGUAGES-USING-THE-SAME-WRITING-SYSTEM-OR-LOCATED-IN-THE-SAME-REGION-ARE-AUTOMATICALLY-IN-THE-SAME-LANGUAGE-FAMILY'],
    'Replacement texts for both misconceptions'),
  card('eng.linguistics.language-families', 'checkpoint', A,
    'Vietnamese shares a region with Chinese, was once written in Chinese characters, and has many Chinese loanwords. A student says it must belong to the Sino-Tibetan family. Which assessment is accurate?',
    'No: shared region, script history and loanwords do not show family; systematic correspondences do',
    ['Yes: many similar-sounding words show that two languages are related, so Vietnamese is Sino-Tibetan', 'MC-A-ANY-TWO-LANGUAGES-WITH-SIMILAR-SOUNDING-WORDS-MUST-BE-RELATED'],
    ['Yes: a shared writing system and region make them one family', 'MC-B-LANGUAGES-USING-THE-SAME-WRITING-SYSTEM-OR-LOCATED-IN-THE-SAME-REGION-ARE-AUTOMATICALLY-IN-THE-SAME-LANGUAGE-FAMILY'],
    'both misconceptions, with Vietnamese and Chinese'),
]
