/**
 * ENGLISH CARD-DEPTH CAMPAIGN — Batch 6 (eng.reading part 1, 8 concepts, 24 cards).
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
 * slug and abandon the live row's identity. Each reading concept already uses
 *   native band : mcq, misconception_probe, checkpoint, true_false
 *   ADULT       : mcq, misconception_probe
 * so the three new cards take the FREE slots:
 *   native band (ELEMENTARY or MIDDLE) : short_answer, fill_blank      ADULT : checkpoint
 * Serving never filters by probeKind (`probeToMcq` is the predicate), so the kind is
 * only a slot label.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedProbe } from './brainSeedAssets'

const S = 'english'
const EL = GradeBand.ELEMENTARY
const M = GradeBand.MIDDLE
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


export const ENGLISH_CARD_DEPTH_BATCH_6: SeedProbe[] = [
  // ─── eng.reading.authors-purpose-and-tone ────────────────────────────────
  card('eng.reading.authors-purpose-and-tone', 'short_answer', EL,
    'A funny ad uses jokes and also asks you to buy a snack. Its voice is cheerful, yet one reader says she felt bored. What is true?',
    'It entertains and persuades; its cheerful tone comes from the writer\'s word choices',
    ['The ad can only have one purpose, so it must be there to entertain and nothing else', 'MC-A-TEXT-CAN-ONLY-HAVE-ONE-PURPOSE-INFORM-OR-PERSUADE-OR-ENTERTAIN'],
    ['Its tone is bored, because tone is whatever feeling the reader happens to have', 'MC-TONE-IS-JUST-WHATEVER-EMOTION-THE-READER-HAPPENS-TO-FEEL'],
    'primary plus secondary purpose; tone as authorial attitude, re-asked with a snack ad'),
  card('eng.reading.authors-purpose-and-tone', 'fill_blank', EL,
    'Complete the sentence: the tone of a text is ____.',
    'the attitude the author shows through word choices',
    ['whatever feeling the reader happens to have while reading it', 'MC-TONE-IS-JUST-WHATEVER-EMOTION-THE-READER-HAPPENS-TO-FEEL'],
    ['its one purpose, which is always inform, persuade or entertain', 'MC-A-TEXT-CAN-ONLY-HAVE-ONE-PURPOSE-INFORM-OR-PERSUADE-OR-ENTERTAIN'],
    'Replacement text, MC-TONE-IS-JUST-WHATEVER-EMOTION-THE-READER-HAPPENS-TO-FEEL'),
  card('eng.reading.authors-purpose-and-tone', 'checkpoint', A,
    'A product email explains a new feature, urges recipients to upgrade, and is written in a warm, friendly voice. One reader finds it annoying and calls its tone "annoyed". Which analysis is accurate?',
    'It informs and persuades; its tone is warm, whatever one reader feels',
    ['It can only inform or persuade, not both, so only its primary purpose counts as a purpose', 'MC-A-TEXT-CAN-ONLY-HAVE-ONE-PURPOSE-INFORM-OR-PERSUADE-OR-ENTERTAIN'],
    ['Its tone is annoyed, since tone is simply the emotion the reader ends up feeling', 'MC-TONE-IS-JUST-WHATEVER-EMOTION-THE-READER-HAPPENS-TO-FEEL'],
    'both misconceptions, in a workplace email'),

  // ─── eng.reading.close-reading ───────────────────────────────────────────
  card('eng.reading.close-reading', 'short_answer', M,
    'Ana reads a poem four times, slowly, but only retells the plot. Ben reads it twice, notices the repeated word "cold", and asks why the poet chose it. Who is close reading?',
    'Ben: he questions why specific words were chosen',
    ['Ana: close reading simply means reading slowly and re-reading many times', 'MC-CLOSE-READING-MEANS-READING-SLOWLY-OR-RE-READING-MULTIPLE-TIMES'],
    ['Neither: a close reader must analyse every single word equally deeply', 'MC-EVERY-DETAIL-IN-A-TEXT-IS-EQUALLY-SIGNIFICANT-AND-MUST-BE-ANALYZED'],
    'analytical depth, not speed or pass count (WE-1), re-asked with a poem'),
  card('eng.reading.close-reading', 'fill_blank', M,
    'Complete the sentence: close reading is mainly about ____.',
    'asking why the author chose particular words and what they suggest',
    ['how slowly you read and how many times you re-read', 'MC-CLOSE-READING-MEANS-READING-SLOWLY-OR-RE-READING-MULTIPLE-TIMES'],
    ['giving every word and every detail equally deep analysis', 'MC-EVERY-DETAIL-IN-A-TEXT-IS-EQUALLY-SIGNIFICANT-AND-MUST-BE-ANALYZED'],
    'Replacement texts for both misconceptions'),
  card('eng.reading.close-reading', 'checkpoint', A,
    'A tenant reads a lease clause five times, slowly. Another tenant highlights three unusual terms and questions their purpose. A colleague says every word of a lease deserves equal analysis. Which view is sound?',
    'Close reading is analytical, focusing on standout words and patterns',
    ['The first tenant is closest: more slow passes means a closer reading of the text', 'MC-CLOSE-READING-MEANS-READING-SLOWLY-OR-RE-READING-MULTIPLE-TIMES'],
    ['The colleague is right: all details in a text are equally significant', 'MC-EVERY-DETAIL-IN-A-TEXT-IS-EQUALLY-SIGNIFICANT-AND-MUST-BE-ANALYZED'],
    'both misconceptions, with a lease clause'),

  // ─── eng.reading.compare-and-contrast-texts ──────────────────────────────
  card('eng.reading.compare-and-contrast-texts', 'short_answer', M,
    'A student compares a newspaper report and a diary entry about the same storm. Which comparison is strongest?',
    'One that sets them side by side on tone, purpose and perspective, showing where they differ',
    ['A summary of the report, then a separate summary of the diary entry, one after the other', 'MC-COMPARING-TWO-TEXTS-MEANS-SUMMARIZING-BOTH-ONE-AFTER-ANOTHER'],
    ['A note that both are about the storm, so they must be mostly the same', 'MC-TWO-TEXTS-ON-THE-SAME-TOPIC-MUST-BE-MOSTLY-THE-SAME'],
    'relational comparison, re-asked with a storm report and diary entry'),
  card('eng.reading.compare-and-contrast-texts', 'fill_blank', M,
    'Complete the sentence: to compare two texts, first summarise each, then ____.',
    'pick dimensions such as tone or structure and compare them directly',
    ['stop, since two summaries already make a comparison', 'MC-COMPARING-TWO-TEXTS-MEANS-SUMMARIZING-BOTH-ONE-AFTER-ANOTHER'],
    ['assume they treat the topic alike because the topic is shared', 'MC-TWO-TEXTS-ON-THE-SAME-TOPIC-MUST-BE-MOSTLY-THE-SAME'],
    'Replacement texts for both misconceptions'),
  card('eng.reading.compare-and-contrast-texts', 'checkpoint', A,
    'To compare two vendor contracts, an analyst writes a page on Contract A and a page on Contract B, and notes that both cover cloud hosting so they must be similar. How should this be judged?',
    'Incomplete: it needs direct point-by-point comparison, not just a shared topic',
    ['Complete: summarising each in turn is exactly what comparing means', 'MC-COMPARING-TWO-TEXTS-MEANS-SUMMARIZING-BOTH-ONE-AFTER-ANOTHER'],
    ['Sound: contracts on one topic are mostly alike, so a short note saying so is enough for a comparison', 'MC-TWO-TEXTS-ON-THE-SAME-TOPIC-MUST-BE-MOSTLY-THE-SAME'],
    'both misconceptions, with vendor contracts'),

  // ─── eng.reading.critical-reading ────────────────────────────────────────
  card('eng.reading.critical-reading', 'short_answer', M,
    'An article on recycling cites "a recent study" but gives no name, date or sample size. One student says the claim is credible because it cites a study; another says critical readers must always disagree. What is the best approach?',
    'Ask whether the evidence is specific and credible: a vague citation is weak',
    ['Disagree with the article, because critical reading means finding fault with the text', 'MC-CRITICAL-READING-MEANS-FINDING-FAULT-OR-DISAGREEING-WITH-THE-TEXT'],
    ['Accept the claim, because any cited study makes it credible', 'MC-IF-A-TEXT-CITES-SOURCES-OR-STATISTICS-ITS-CLAIMS-ARE-AUTOMATICALLY-CREDIBLE'],
    'evaluate evidence quality; do not force disagreement, re-asked with a recycling article'),
  card('eng.reading.critical-reading', 'fill_blank', M,
    'Complete the sentence: critical reading means ____ the evidence and reasoning.',
    'fairly evaluating',
    ['hunting for faults in', 'MC-CRITICAL-READING-MEANS-FINDING-FAULT-OR-DISAGREEING-WITH-THE-TEXT'],
    ['trusting whenever there is a citation for', 'MC-IF-A-TEXT-CITES-SOURCES-OR-STATISTICS-ITS-CLAIMS-ARE-AUTOMATICALLY-CREDIBLE'],
    'Replacement texts for both misconceptions'),
  card('eng.reading.critical-reading', 'checkpoint', A,
    'A manager finds a market report well supported and accepts its reasoning. An aide says a critical reader must always find something to disagree with, and trusts a footnote saying "experts say" because it cites experts. Which view is accurate?',
    'Sound reasoning can be accepted; a vague "experts say" should still be questioned',
    ['The aide is right: a critical reader must always find fault in a text', 'MC-CRITICAL-READING-MEANS-FINDING-FAULT-OR-DISAGREEING-WITH-THE-TEXT'],
    ['The footnote is credible, since a citation of experts makes the claim credible', 'MC-IF-A-TEXT-CITES-SOURCES-OR-STATISTICS-ITS-CLAIMS-ARE-AUTOMATICALLY-CREDIBLE'],
    'both misconceptions, in a workplace setting'),

  // ─── eng.reading.evaluating-sources ──────────────────────────────────────
  card('eng.reading.evaluating-sources', 'short_answer', M,
    'A polished website with an official-looking seal makes a health claim with no named author. A usually reliable newspaper makes one poorly sourced claim. Which approach is best?',
    'Check the author, the evidence and the sourcing of each claim, whatever the look',
    ['Trust the polished site, since a professional look signals that a source is reliable', 'MC-A-SOURCE-IS-CREDIBLE-IF-IT-LOOKS-PROFESSIONAL-OR-OFFICIAL'],
    ['Reject the newspaper entirely, since one weak claim makes the whole source unreliable', 'MC-A-SOURCE-IS-EITHER-COMPLETELY-RELIABLE-OR-COMPLETELY-UNRELIABLE'],
    'substance over appearance; claim-by-claim evaluation, re-asked with a seal and a newspaper'),
  card('eng.reading.evaluating-sources', 'fill_blank', M,
    'Complete the sentence: judge a source by ____.',
    'its author, its evidence and how well each claim is supported',
    ['how professional or official it looks', 'MC-A-SOURCE-IS-CREDIBLE-IF-IT-LOOKS-PROFESSIONAL-OR-OFFICIAL'],
    ['one label, reliable or unreliable, for everything it publishes', 'MC-A-SOURCE-IS-EITHER-COMPLETELY-RELIABLE-OR-COMPLETELY-UNRELIABLE'],
    'Replacement texts for both misconceptions'),
  card('eng.reading.evaluating-sources', 'checkpoint', A,
    'An executive says a report must be accurate because it has an official letterhead, and later calls a trade journal worthless after one weak article. Which assessment is accurate?',
    'Neither is sound: appearance proves nothing, and sources vary by claim',
    ['The first is sound: an official look is a good signal of a reliable source', 'MC-A-SOURCE-IS-CREDIBLE-IF-IT-LOOKS-PROFESSIONAL-OR-OFFICIAL'],
    ['The second is sound: one weak article shows that the whole journal is unreliable', 'MC-A-SOURCE-IS-EITHER-COMPLETELY-RELIABLE-OR-COMPLETELY-UNRELIABLE'],
    'both misconceptions, in a workplace setting'),

  // ─── eng.reading.genre-recognition ───────────────────────────────────────
  card('eng.reading.genre-recognition', 'short_answer', EL,
    'A book tells a real girl\'s life story using scenes and dialogue. A friend says it must be fiction because it has dialogue. What is the best view?',
    'Dialogue alone does not decide genre: it can be a true memoir that borrows story features',
    ['Dialogue means fiction, since one surface feature is enough to name the genre', 'MC-A-A-TEXTS-GENRE-CAN-BE-IDENTIFIED-FROM-ONE-SURFACE-FEATURE-ALONE'],
    ['It must be either fiction or non-fiction with no mixing, so it cannot use story features', 'MC-B-EVERY-TEXT-BELONGS-TO-EXACTLY-ONE-FIXED-GENRE-WITH-NO-OVERLAP'],
    'genre needs several features and allows overlap, re-asked with a true-story book'),
  card('eng.reading.genre-recognition', 'fill_blank', EL,
    'Complete the sentence: to name a text\'s genre, look at ____.',
    'its purpose and several features together, and allow for overlap',
    ['one surface feature, such as dialogue or line breaks', 'MC-A-A-TEXTS-GENRE-CAN-BE-IDENTIFIED-FROM-ONE-SURFACE-FEATURE-ALONE'],
    ['which single fixed box it fits, with no overlap allowed', 'MC-B-EVERY-TEXT-BELONGS-TO-EXACTLY-ONE-FIXED-GENRE-WITH-NO-OVERLAP'],
    'Replacement texts for both misconceptions'),
  card('eng.reading.genre-recognition', 'checkpoint', A,
    'A company document has numbered steps and also persuades staff to adopt a new process. A colleague calls it "a manual" because of the numbering and says it cannot also be promotional. Which analysis is accurate?',
    'Numbering alone does not fix genre; a document can blend purposes',
    ['She is right: numbered steps alone show that it is a manual', 'MC-A-A-TEXTS-GENRE-CAN-BE-IDENTIFIED-FROM-ONE-SURFACE-FEATURE-ALONE'],
    ['She is right that it must fit one genre only, so it cannot persuade as well', 'MC-B-EVERY-TEXT-BELONGS-TO-EXACTLY-ONE-FIXED-GENRE-WITH-NO-OVERLAP'],
    'both misconceptions, with a process document'),

  // ─── eng.reading.inference-in-reading ────────────────────────────────────
  card('eng.reading.inference-in-reading', 'short_answer', EL,
    '"Sam kept looking at the door and checking his watch." What can you infer?',
    'Sam is probably waiting for someone, because those clues point that way',
    ['Sam has a pet dog, because any guess that seems possible is an inference', 'MC-INFERENCE-MEANS-ANY-GUESS-THAT-FEELS-PLAUSIBLE'],
    ['Nothing at all: since the text does not say it outright, you cannot know', 'MC-IF-ITS-NOT-STATED-EXPLICITLY-YOU-CANT-KNOW-IT'],
    'inference traced to clues, re-asked with door and watch'),
  card('eng.reading.inference-in-reading', 'fill_blank', EL,
    'Complete the sentence: a good inference is based on ____.',
    'clues in the text plus what you already know',
    ['any guess that seems possible', 'MC-INFERENCE-MEANS-ANY-GUESS-THAT-FEELS-PLAUSIBLE'],
    ['only what the text states in exact words', 'MC-IF-ITS-NOT-STATED-EXPLICITLY-YOU-CANT-KNOW-IT'],
    'Replacement texts for both misconceptions'),
  card('eng.reading.inference-in-reading', 'checkpoint', A,
    'A report says, "The store closed early on three Fridays, and each time the manager left a note about the parking lot." One reader infers the closures were about parking; another says nothing can be concluded unless it is stated; a third guesses a staff party. Which is the sound inference?',
    'The first: the note is a clue pointing to parking',
    ['The staff party guess, since any plausible guess counts as an inference', 'MC-INFERENCE-MEANS-ANY-GUESS-THAT-FEELS-PLAUSIBLE'],
    ['The second reader: you cannot conclude anything that is not stated outright', 'MC-IF-ITS-NOT-STATED-EXPLICITLY-YOU-CANT-KNOW-IT'],
    'both misconceptions, with a store-closure report'),

  // ─── eng.reading.literal-comprehension ───────────────────────────────────
  card('eng.reading.literal-comprehension', 'short_answer', EL,
    'A note says, "The shop opens at nine, except on Sundays." Which shows literal understanding?',
    'It opens at nine on every day but Sunday',
    ['Saying the sentence back word for word, since that proves understanding', 'MC-LITERAL-COMPREHENSION-MEANS-MEMORIZING-EXACT-WORDING'],
    ['It opens at nine every day, because I understand each word in it', 'MC-IF-I-UNDERSTAND-THE-WORDS-I-UNDERSTAND-THE-TEXT'],
    'restate stated facts in your own words, re-asked with a shop-hours note'),
  card('eng.reading.literal-comprehension', 'fill_blank', EL,
    'Complete the sentence: literal comprehension means explaining the stated facts ____.',
    'accurately, in your own words',
    ['by repeating the exact wording', 'MC-LITERAL-COMPREHENSION-MEANS-MEMORIZING-EXACT-WORDING'],
    ['once you know each word, with no need to check how the words combine', 'MC-IF-I-UNDERSTAND-THE-WORDS-I-UNDERSTAND-THE-TEXT'],
    'Replacement texts for both misconceptions'),
  card('eng.reading.literal-comprehension', 'checkpoint', A,
    'An employee can define every word of "Refunds apply only to unopened items returned within 14 days", yet concludes that all returns within 14 days get refunds. A trainer says she must recite the clause from memory to prove understanding. Which view is accurate?',
    'She should restate it in her own words: only unopened items returned within 14 days qualify',
    ['Her conclusion is right: knowing every word means she understands the clause', 'MC-IF-I-UNDERSTAND-THE-WORDS-I-UNDERSTAND-THE-TEXT'],
    ['The trainer is right: reciting the exact wording is what shows understanding', 'MC-LITERAL-COMPREHENSION-MEANS-MEMORIZING-EXACT-WORDING'],
    'both misconceptions, with a refund clause'),
]
