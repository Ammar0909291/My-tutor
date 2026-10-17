/**
 * ENGLISH CARD-DEPTH CAMPAIGN — Batch 9 (eng.composition part 2, 8 concepts, 24 cards).
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
 * slug and abandon the live row's identity. Each composition concept already uses
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


export const ENGLISH_CARD_DEPTH_BATCH_9: SeedProbe[] = [
  // ─── eng.composition.logical-fallacies ───────────────────────────────────
  card('eng.composition.logical-fallacies', 'short_answer', H,
    '"Vaccines are safe, because anyone who doubts them is a fool." One reader agrees vaccines are safe, so calls the argument fine; another says any criticism of a person is ad hominem. Which view is correct?',
    'It attacks people, not reasons; relevant criticism of a claim is not ad hominem',
    ['The argument is fine: a true conclusion cannot come from a fallacious argument', 'MC-A-IF-AN-ARGUMENTS-CONCLUSION-IS-TRUE-OR-AGREEABLE-THE-ARGUMENT-CANT-BE-FALLACIOUS'],
    ['Every strong criticism of a person is an ad hominem fallacy, so both readers are partly right', 'MC-B-EVERY-STRONG-DISAGREEMENT-OR-CRITICISM-OF-A-PERSON-IS-AN-AD-HOMINEM-FALLACY'],
    'judge the reasoning, not the conclusion; relevant criticism is not ad hominem, re-asked with a vaccine argument'),
  card('eng.composition.logical-fallacies', 'fill_blank', H,
    'Complete the sentence: to judge an argument for fallacies, check ____.',
    'whether the reasoning supports the conclusion, whether or not you agree with it',
    ['whether the conclusion is true or agreeable to you', 'MC-A-IF-AN-ARGUMENTS-CONCLUSION-IS-TRUE-OR-AGREEABLE-THE-ARGUMENT-CANT-BE-FALLACIOUS'],
    ['whether anyone\'s character is criticised, which is always ad hominem', 'MC-B-EVERY-STRONG-DISAGREEMENT-OR-CRITICISM-OF-A-PERSON-IS-AN-AD-HOMINEM-FALLACY'],
    'Replacement texts for both misconceptions'),
  card('eng.composition.logical-fallacies', 'checkpoint', A,
    'A manager argues, "The new tool is bad because its designer is lazy." She believes the tool really is bad, so says her argument cannot be fallacious. A colleague replies that pointing out the tool\'s security flaws is also ad hominem. Which assessment is accurate?',
    'The designer attack is ad hominem; criticising the security flaws is not',
    ['She is right: an argument with a true conclusion cannot be fallacious', 'MC-A-IF-AN-ARGUMENTS-CONCLUSION-IS-TRUE-OR-AGREEABLE-THE-ARGUMENT-CANT-BE-FALLACIOUS'],
    ['The colleague is right: every strong criticism is an ad hominem fallacy, flaws included', 'MC-B-EVERY-STRONG-DISAGREEMENT-OR-CRITICISM-OF-A-PERSON-IS-AN-AD-HOMINEM-FALLACY'],
    'both misconceptions, with a software-tool argument'),

  // ─── eng.composition.persuasive-techniques ───────────────────────────────
  card('eng.composition.persuasive-techniques', 'short_answer', H,
    'A persuasive essay on a new bike lane has one paragraph each for ethos, pathos and logos, and always puts its counterargument last. Which advice is best?',
    'Weave the appeals together, and place the counterargument where the structure needs it',
    ['Keep each technique in its own separate section, since that is what sophisticated persuasion means', 'MC-A-SOPHISTICATED-PERSUASION-MEANS-INCLUDING-EVERY-TECHNIQUE-SEPARATELY-IN-ITS-OWN-SECTION'],
    ['Always put the counterargument last, whatever the structure of the argument', 'MC-B-A-COUNTERARGUMENT-SHOULD-ALWAYS-GO-AT-THE-VERY-END-REGARDLESS-OF-THE-ARGUMENTS-STRUCTURE'],
    'blended appeals and flexible counterargument placement, re-asked with a bike-lane essay'),
  card('eng.composition.persuasive-techniques', 'fill_blank', H,
    'Complete the sentence: effective persuasion ____.',
    'blends appeals within paragraphs and places the counterargument where it fits the structure',
    ['gives every technique its own separate section', 'MC-A-SOPHISTICATED-PERSUASION-MEANS-INCLUDING-EVERY-TECHNIQUE-SEPARATELY-IN-ITS-OWN-SECTION'],
    ['always leaves the counterargument to the very last paragraph', 'MC-B-A-COUNTERARGUMENT-SHOULD-ALWAYS-GO-AT-THE-VERY-END-REGARDLESS-OF-THE-ARGUMENTS-STRUCTURE'],
    'Replacement texts for both misconceptions'),
  card('eng.composition.persuasive-techniques', 'checkpoint', A,
    'A pitch has a credibility section, an emotion section and a data section, and answers its strongest objection at the very end whatever came before. Which revision is best?',
    'Combine the appeals, and answer the objection where it fits best',
    ['Add a separate section for every other technique too, so each stands on its own', 'MC-A-SOPHISTICATED-PERSUASION-MEANS-INCLUDING-EVERY-TECHNIQUE-SEPARATELY-IN-ITS-OWN-SECTION'],
    ['Keep the objection at the very end, since a counterargument should always go last', 'MC-B-A-COUNTERARGUMENT-SHOULD-ALWAYS-GO-AT-THE-VERY-END-REGARDLESS-OF-THE-ARGUMENTS-STRUCTURE'],
    'both misconceptions, with a sectioned pitch'),

  // ─── eng.composition.plagiarism-and-citation-ethics ──────────────────────
  card('eng.composition.plagiarism-and-citation-ethics', 'short_answer', H,
    'A student copies two paragraphs from a website without any citation. Another cites honestly but puts the year in the wrong place. A third says plagiarism is only a formatting rule. Which view is correct?',
    'Copying without credit is an ethical breach; an honest formatting slip is a minor error',
    ['Plagiarism is just a technical formatting rule, not a real ethical issue', 'MC-A-PLAGIARISM-IS-JUST-A-TECHNICAL-FORMATTING-RULE-NOT-A-REAL-ETHICAL-ISSUE'],
    ['Both cases are equally serious, since any citation mistake is as bad as deliberate plagiarism', 'MC-B-ANY-CITATION-MISTAKE-EVEN-A-MINOR-FORMATTING-ERROR-IS-EQUALLY-SERIOUS-AS-DELIBERATE-PLAGIARISM'],
    'plagiarism as an ethical issue vs. an honest formatting slip, re-asked with a website copy'),
  card('eng.composition.plagiarism-and-citation-ethics', 'fill_blank', H,
    'Complete the sentence: plagiarism is ____.',
    'presenting someone else\'s work as your own, which differs from an honest formatting slip',
    ['merely a formatting rule with no ethical weight', 'MC-A-PLAGIARISM-IS-JUST-A-TECHNICAL-FORMATTING-RULE-NOT-A-REAL-ETHICAL-ISSUE'],
    ['any citation slip at all, exactly as serious as deliberate copying', 'MC-B-ANY-CITATION-MISTAKE-EVEN-A-MINOR-FORMATTING-ERROR-IS-EQUALLY-SERIOUS-AS-DELIBERATE-PLAGIARISM'],
    'Replacement texts for both misconceptions'),
  card('eng.composition.plagiarism-and-citation-ethics', 'checkpoint', A,
    'An employee pastes a competitor\'s report into a proposal without credit. Another cites everything honestly but formats one reference wrongly. A manager treats both as identical offences, saying plagiarism is only a style rule. Which assessment is accurate?',
    'They differ: the first misrepresents authorship, the second is an honest formatting error',
    ['The manager is right that plagiarism is just a technical style rule with no real ethical weight behind it', 'MC-A-PLAGIARISM-IS-JUST-A-TECHNICAL-FORMATTING-RULE-NOT-A-REAL-ETHICAL-ISSUE'],
    ['The manager is right that every citation mistake is equally serious', 'MC-B-ANY-CITATION-MISTAKE-EVEN-A-MINOR-FORMATTING-ERROR-IS-EQUALLY-SERIOUS-AS-DELIBERATE-PLAGIARISM'],
    'both misconceptions, in a workplace setting'),

  // ─── eng.composition.research-paper-writing ──────────────────────────────
  card('eng.composition.research-paper-writing', 'short_answer', H,
    'A student\'s paper on screen time has one paragraph per source: Study A, Study B, Study C. She left out a study that complicated her thesis. Which advice is best?',
    'Organise by sub-argument and include the study that complicates her thesis',
    ['Keep one summary per source in order, since a research paper is a sequence of summaries', 'MC-A-A-RESEARCH-PAPER-IS-A-SEQUENCE-OF-SOURCE-SUMMARIES'],
    ['Keep using only the sources that agree, since synthesising means combining agreeing sources', 'MC-B-SYNTHESIZING-SOURCES-MEANS-ONLY-USING-SOURCES-THAT-AGREE'],
    'sub-argument structure and engaging complicating sources, re-asked with screen time'),
  card('eng.composition.research-paper-writing', 'fill_blank', H,
    'Complete the sentence: a research paper is built around ____.',
    'sub-arguments that draw on several sources, including ones that complicate the thesis',
    ['one section per source, taken in turn', 'MC-A-A-RESEARCH-PAPER-IS-A-SEQUENCE-OF-SOURCE-SUMMARIES'],
    ['only the sources that agree with the thesis', 'MC-B-SYNTHESIZING-SOURCES-MEANS-ONLY-USING-SOURCES-THAT-AGREE'],
    'Replacement texts for both misconceptions'),
  card('eng.composition.research-paper-writing', 'checkpoint', A,
    'A paper on microlearning reviews Study 1, then Study 2, then Study 3, and omits a study with mixed results to keep the sources consistent. A reviewer asks for synthesis. Which revision answers best?',
    'Reorganise by idea, comparing sources within each point, and engage the mixed study',
    ['Keep one summary per source, adding a final paragraph that lists them all', 'MC-A-A-RESEARCH-PAPER-IS-A-SEQUENCE-OF-SOURCE-SUMMARIES'],
    ['Cut any further source that disagrees, since synthesis means using agreeing sources only', 'MC-B-SYNTHESIZING-SOURCES-MEANS-ONLY-USING-SOURCES-THAT-AGREE'],
    'both misconceptions, with a microlearning paper'),

  // ─── eng.composition.rhetorical-analysis ─────────────────────────────────
  card('eng.composition.rhetorical-analysis', 'short_answer', H,
    'A student analyses a speech: "It uses ethos, then pathos, then a metaphor, then repetition." Another writes, "It fails because I dislike the speaker\'s party." Which is the best way to improve the analysis?',
    'Explain how the devices affect the audience, and judge effectiveness separately',
    ['List even more devices, since analysis means naming every device found', 'MC-A-RHETORICAL-ANALYSIS-MEANS-LISTING-EVERY-DEVICE-FOUND'],
    ['State whether you agree with the argument, since that is how effectiveness is judged', 'MC-B-EVALUATING-EFFECTIVENESS-MEANS-STATING-WHETHER-YOU-AGREE-WITH-THE-ARGUMENT'],
    'explain effect and separate effectiveness from agreement, re-asked with a speech'),
  card('eng.composition.rhetorical-analysis', 'fill_blank', H,
    'Complete the sentence: a rhetorical analysis ____.',
    'explains how choices affect an audience and judges effectiveness apart from agreement',
    ['lists every device that can be found in the text', 'MC-A-RHETORICAL-ANALYSIS-MEANS-LISTING-EVERY-DEVICE-FOUND'],
    ['says whether the analyst agrees with the argument', 'MC-B-EVALUATING-EFFECTIVENESS-MEANS-STATING-WHETHER-YOU-AGREE-WITH-THE-ARGUMENT'],
    'Replacement texts for both misconceptions'),
  card('eng.composition.rhetorical-analysis', 'checkpoint', A,
    'An analysis of a charity appeal lists seven devices in order and concludes, "I support this cause, so it is effective." Which assessment is accurate?',
    'It names devices without explaining effects, and mixes up agreement and effectiveness',
    ['It is complete: an analysis means listing all the devices found in the text', 'MC-A-RHETORICAL-ANALYSIS-MEANS-LISTING-EVERY-DEVICE-FOUND'],
    ['It is sound: an argument is effective whenever the analyst happens to agree with it, whatever its reasoning', 'MC-B-EVALUATING-EFFECTIVENESS-MEANS-STATING-WHETHER-YOU-AGREE-WITH-THE-ARGUMENT'],
    'both misconceptions, with a charity appeal'),

  // ─── eng.composition.rhetorical-appeals ──────────────────────────────────
  card('eng.composition.rhetorical-appeals', 'short_answer', H,
    'An essay on road safety says, "It is so sad when accidents happen!" and cites "Studies show 80% of crashes are avoidable" with no source. Which revision strengthens the appeals?',
    'Tie the emotion to a specific example, and explain what the statistic shows',
    ['Make the emotion more dramatic, since pathos simply means being emotional, as audiences respond to drama', 'MC-A-PATHOS-MEANS-JUST-BEING-EMOTIONAL-OR-DRAMATIC'],
    ['Add more numbers, since logos simply means using numbers or statistics', 'MC-B-LOGOS-MEANS-JUST-USING-NUMBERS-OR-STATISTICS'],
    'pathos tied to the case, logos with explained reasoning, re-asked with road safety'),
  card('eng.composition.rhetorical-appeals', 'fill_blank', H,
    'Complete the sentence: pathos and logos work best when ____.',
    'the emotion is tied to the case and the numbers come with explained reasoning',
    ['the writing is as dramatic as possible', 'MC-A-PATHOS-MEANS-JUST-BEING-EMOTIONAL-OR-DRAMATIC'],
    ['the writing contains as many statistics as possible', 'MC-B-LOGOS-MEANS-JUST-USING-NUMBERS-OR-STATISTICS'],
    'Replacement texts for both misconceptions'),
  card('eng.composition.rhetorical-appeals', 'checkpoint', A,
    'A fundraising letter piles on tragic adjectives and quotes "9 out of 10" with no explanation. The board wants stronger appeals. Which change is best?',
    'Anchor the emotion in a concrete story, and explain what the figure means',
    ['Add more dramatic language, since pathos is simply emotional writing that moves readers as strongly as possible', 'MC-A-PATHOS-MEANS-JUST-BEING-EMOTIONAL-OR-DRAMATIC'],
    ['Add more statistics, since logos is simply the use of numbers', 'MC-B-LOGOS-MEANS-JUST-USING-NUMBERS-OR-STATISTICS'],
    'both misconceptions, with a fundraising letter'),

  // ─── eng.composition.rhetorical-devices ──────────────────────────────────
  card('eng.composition.rhetorical-devices', 'short_answer', H,
    'A student writes, "This speech uses repetition." She also notes that "the" appears twelve times. Which improvement is best?',
    'Explain what the repetition achieves, and do not count words like "the" as devices',
    ['Nothing: naming the device is the same as explaining its effect', 'MC-A-NAMING-THE-DEVICE-IS-THE-SAME-AS-EXPLAINING-ITS-EFFECT'],
    ['Treat each repeated word, including "the", as a deliberate device chosen by the speaker', 'MC-B-ANY-REPEATED-WORD-OR-BALANCED-PHRASE-IS-AUTOMATICALLY-A-DELIBERATE-DEVICE'],
    'effect and deliberateness, re-asked with a speech and "the"'),
  card('eng.composition.rhetorical-devices', 'fill_blank', H,
    'Complete the sentence: when you name a rhetorical device, ____.',
    'also explain the effect it creates and check that it is deliberate',
    ['the naming already explains its effect', 'MC-A-NAMING-THE-DEVICE-IS-THE-SAME-AS-EXPLAINING-ITS-EFFECT'],
    ['any repeated word counts as a deliberate device', 'MC-B-ANY-REPEATED-WORD-OR-BALANCED-PHRASE-IS-AUTOMATICALLY-A-DELIBERATE-DEVICE'],
    'Replacement texts for both misconceptions'),
  card('eng.composition.rhetorical-devices', 'checkpoint', A,
    'A review of a sales presentation says only, "The speaker uses rhetorical questions", and treats the word "in" appearing nine times as a device. Which revision is best?',
    'Explain what the questions do, and set aside incidental words like "in"',
    ['Leave it: naming rhetorical questions already explains what they do to the audience', 'MC-A-NAMING-THE-DEVICE-IS-THE-SAME-AS-EXPLAINING-ITS-EFFECT'],
    ['Keep counting "in", since any repeated word is a deliberate device', 'MC-B-ANY-REPEATED-WORD-OR-BALANCED-PHRASE-IS-AUTOMATICALLY-A-DELIBERATE-DEVICE'],
    'both misconceptions, with a sales presentation'),

  // ─── eng.composition.style-voice-and-tone ────────────────────────────────
  card('eng.composition.style-voice-and-tone', 'short_answer', H,
    'A writer swaps "We finished early" for "We achieved premature completion" to sound stylish, and says her style must be identical in a wedding toast and a lab report. What is the best view?',
    'Style is fit: the core voice stays while tone adapts to the piece',
    ['She is right: style means using fancier, more complicated vocabulary', 'MC-A-STYLE-IS-JUST-USING-FANCY-OR-COMPLICATED-VOCABULARY'],
    ['She is right: a writer\'s style should stay exactly the same in every piece', 'MC-B-A-WRITERS-STYLE-SHOULD-STAY-EXACTLY-THE-SAME-ACROSS-EVERY-PIECE-THEY-WRITE'],
    'style as fitting choices; voice persists while tone adapts, re-asked with a toast and a lab report'),
  card('eng.composition.style-voice-and-tone', 'fill_blank', H,
    'Complete the sentence: a writer\'s style ____.',
    'keeps a recognisable core voice while adapting tone to each piece',
    ['is shown by using fancy or complicated vocabulary', 'MC-A-STYLE-IS-JUST-USING-FANCY-OR-COMPLICATED-VOCABULARY'],
    ['must stay exactly the same in every piece they write', 'MC-B-A-WRITERS-STYLE-SHOULD-STAY-EXACTLY-THE-SAME-ACROSS-EVERY-PIECE-THEY-WRITE'],
    'Replacement texts for both misconceptions'),
  card('eng.composition.style-voice-and-tone', 'checkpoint', A,
    'A consultant believes polysyllabic jargon makes her reports stylish, and insists her chatty newsletter voice must carry unchanged into legal briefs. Which assessment is accurate?',
    'Style is about fit and clarity; tone should adapt to the genre',
    ['She is right that complicated vocabulary is what style means', 'MC-A-STYLE-IS-JUST-USING-FANCY-OR-COMPLICATED-VOCABULARY'],
    ['She is right that a writer\'s style must be identical in every document', 'MC-B-A-WRITERS-STYLE-SHOULD-STAY-EXACTLY-THE-SAME-ACROSS-EVERY-PIECE-THEY-WRITE'],
    'both misconceptions, with a consultant'),
]
