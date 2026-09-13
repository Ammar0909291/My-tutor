/**
 * ENGLISH ADULT-BAND PROBE-CONTRACT CAMPAIGN — Batch 8.
 *
 * Continues Batches 1-7 (70 concepts) per the standing instruction to finish
 * all English concepts against the TRUE-gap list `englishAdultBandAudit.ts`
 * computes.
 *
 * 10 concepts (all eng.reading, all MIDDLE-native, continuing in KG order):
 * eng.reading.inference-in-reading, eng.reading.summarizing,
 * eng.reading.predicting-and-confirming, eng.reading.text-structure,
 * eng.reading.genre-recognition, eng.reading.authors-purpose-and-tone,
 * eng.reading.compare-and-contrast-texts, eng.reading.skimming-and-scanning,
 * eng.reading.close-reading, eng.reading.critical-reading. 30 new ADULT-band
 * closed-choice probes (3/concept), same mcq(FOUNDATIONAL)/misconception_probe
 * (DEVELOPING)/mcq(PROFICIENT) ladder as Batches 1-7, reusing each concept's
 * own two already-registered, already-ACTIVE misconceptions (every registry
 * checked, confirmed exactly 2) via genuinely different adult-context
 * examples (workplace reports, professional correspondence, news articles)
 * than each concept's native-band probes use.
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
    { stem: string; correct: string; wrong: string },
    { stem: string; correct: string; wrong: string },
    { stem: string; correct: string; wrong: string },
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

const INFERENCE_ADULT = adultLadder(
  'eng.reading.inference-in-reading', 'MC-IF-ITS-NOT-STATED-EXPLICITLY-YOU-CANT-KNOW-IT', 'MC-INFERENCE-MEANS-ANY-GUESS-THAT-FEELS-PLAUSIBLE',
  [
    {
      stem: 'A memo says "The team submitted the report at 11:58 PM, just before the midnight deadline." It never says the team was rushing. Can a reader reasonably INFER they were working under time pressure, even though it is not stated explicitly?',
      correct: 'Yes — inference means drawing a reasonable conclusion from clues in the text (submitting 2 minutes before a deadline) even when it is not stated outright; not everything true has to be spelled out',
      wrong: 'No — if something is not stated explicitly in the text, a reader cannot know it or claim it',
    },
    {
      stem: 'A report says "Sales dropped 40% after the store closed for renovations." Is it a valid inference to guess "the CEO probably regrets the renovation," just because the guess feels plausible?',
      correct: 'No — a valid inference must be grounded in specific clues in the text; a plausible-feeling guess with no textual support (nothing about the CEO\'s feelings is given) is not a sound inference',
      wrong: 'Yes — any guess that feels plausible counts as a valid inference, whether or not the text actually supports it',
    },
    {
      stem: 'An email says "The client called three times today and each time asked about the delayed shipment." It never says the client was frustrated. Can a reader reasonably infer growing frustration from these clues?',
      correct: 'Yes — the repeated calls about the same delayed issue is a textual clue supporting the inference of frustration, even though "frustrated" is never stated explicitly',
      wrong: 'No — since the text never uses the word "frustrated," a reader cannot conclude the client was frustrated',
    },
  ],
  [
    'MC-IF-ITS-NOT-STATED-EXPLICITLY-YOU-CANT-KNOW-IT, adult workplace framing with a late-night report submission rather than the existing everyday-sentence examples',
    'MC-INFERENCE-MEANS-ANY-GUESS-THAT-FEELS-PLAUSIBLE, re-asked with a sales-drop/CEO-feelings example rather than the existing toy examples',
    'MC-IF-ITS-NOT-STATED-EXPLICITLY-YOU-CANT-KNOW-IT, a second fresh example (repeated client calls about a delayed shipment) forming the ladder\'s third rung',
  ],
)

const SUMMARIZING_ADULT = adultLadder(
  'eng.reading.summarizing', 'MC-A-SUMMARY-MEANS-COPYING-THE-IMPORTANT-SENTENCES', 'MC-A-GOOD-SUMMARY-INCLUDES-EVERY-DETAIL-FROM-THE-ORIGINAL',
  [
    {
      stem: 'To summarize a long quarterly report, is copying and pasting the three sentences that seem most important an acceptable summary?',
      correct: 'No — a genuine summary is written in the summarizer\'s own words, condensing the overall meaning, not a collage of copied sentences pulled from the original',
      wrong: 'Yes — a summary just means selecting and copying the most important sentences from the original text',
    },
    {
      stem: 'Should a good one-paragraph summary of a 10-page project report try to include every single detail from the original, to make sure nothing is missed?',
      correct: 'No — a good summary condenses the text to its main points, deliberately leaving out minor details; including every detail would defeat the purpose of summarizing',
      wrong: 'Yes — a good summary must include every detail from the original to be considered complete and accurate',
    },
    {
      stem: 'To summarize a client meeting\'s notes, is copying the exact sentences that seem most important, word-for-word, an acceptable summary?',
      correct: 'No — a summary should restate the main points in the summarizer\'s own words, not string together copied original sentences',
      wrong: 'Yes — as long as the copied sentences are truly the most important ones, copying them counts as summarizing',
    },
  ],
  [
    'MC-A-SUMMARY-MEANS-COPYING-THE-IMPORTANT-SENTENCES, adult workplace framing with a quarterly report rather than the existing everyday-sentence examples',
    'MC-A-GOOD-SUMMARY-INCLUDES-EVERY-DETAIL-FROM-THE-ORIGINAL, re-asked with a 10-page project report rather than the existing toy examples',
    'MC-A-SUMMARY-MEANS-COPYING-THE-IMPORTANT-SENTENCES, a second fresh example (client meeting notes) forming the ladder\'s third rung',
  ],
)

const PREDICTING_ADULT = adultLadder(
  'eng.reading.predicting-and-confirming', 'MC-A-A-PREDICTION-IS-JUST-A-GUESS-AND-DOESNT-NEED-TO-BE-BASED-ON-TEXT-CLUES', 'MC-B-ONCE-A-PREDICTION-IS-MADE-IT-SHOULD-BE-DEFENDED-RATHER-THAN-REVISED',
  [
    {
      stem: 'Before reading a report titled "Q3 Results: Revenue Declines Amid Market Shifts," is predicting "this report will likely discuss reasons for a revenue decrease" a random guess, or is it grounded in the title\'s clues?',
      correct: 'It is grounded in the title\'s clues (the words "declines" and "market shifts" point toward causes of a decrease) — a good prediction uses available text clues, not a random guess unconnected to the text',
      wrong: 'It is just a random guess; predictions do not need to be based on any clues from the text',
    },
    {
      stem: 'After predicting a report would focus on cost-cutting, a reader discovers the report is actually about a new product launch. Should the reader defend the original prediction anyway, or revise it based on the new information?',
      correct: 'The reader should revise the prediction — an accurate reading process updates predictions when new evidence from the text contradicts them, rather than clinging to the original guess',
      wrong: 'The reader should defend the original prediction, since changing your mind partway through means you predicted poorly',
    },
    {
      stem: 'Before reading an article titled "Startup Struggles to Secure Funding After Investor Pullback," is predicting "this article will likely discuss financial difficulties" grounded in the title\'s clues or just a random guess?',
      correct: 'It is grounded in the title\'s clues ("struggles," "investor pullback" point toward financial difficulty) — good predictions draw on available text clues rather than being arbitrary',
      wrong: 'It is a random guess; predictions do not require any connection to clues actually present in the text',
    },
  ],
  [
    'MC-A-A-PREDICTION-IS-JUST-A-GUESS-AND-DOESNT-NEED-TO-BE-BASED-ON-TEXT-CLUES, adult workplace framing with a "Q3 Results" report title rather than the existing everyday-sentence examples',
    'MC-B-ONCE-A-PREDICTION-IS-MADE-IT-SHOULD-BE-DEFENDED-RATHER-THAN-REVISED, re-asked with a cost-cutting-vs-product-launch example rather than the existing toy examples',
    'MC-A-A-PREDICTION-IS-JUST-A-GUESS-AND-DOESNT-NEED-TO-BE-BASED-ON-TEXT-CLUES, a second fresh example (a startup-funding article title) forming the ladder\'s third rung',
  ],
)

const TEXT_STRUCTURE_ADULT = adultLadder(
  'eng.reading.text-structure', 'MC-TEXT-STRUCTURE-IS-JUST-ABOUT-PARAGRAPH-BREAKS', 'MC-A-TEXT-CAN-ONLY-HAVE-ONE-STRUCTURE-PATTERN',
  [
    {
      stem: 'A report is broken into five clearly separated paragraphs. Does having distinct paragraph breaks alone tell you the text\'s STRUCTURE (e.g., problem/solution, cause/effect, chronological)?',
      correct: 'No — text structure refers to how ideas are logically organized (e.g., problem-solution, cause-effect, compare-contrast), not merely where the paragraph breaks happen to fall',
      wrong: 'Yes — text structure is simply about where the paragraph breaks are placed in a document',
    },
    {
      stem: 'A long report first explains a business problem (structure: problem/solution) and later, within the same document, compares two possible vendors (structure: compare/contrast). Can a single text contain more than one structural pattern?',
      correct: 'Yes — longer or more complex texts can combine multiple structural patterns in different sections; a text is not restricted to exactly one structure throughout',
      wrong: 'No — a text can only ever have one single structure pattern from beginning to end',
    },
    {
      stem: 'An article is broken into four clearly separated sections. Does having distinct section breaks alone tell you the article\'s organizational structure?',
      correct: 'No — the number of section breaks does not reveal the underlying organizational pattern (chronological, cause-effect, etc.); structure is about how ideas relate, not paragraph/section boundaries',
      wrong: 'Yes — the presence of clear section breaks is what determines a text\'s structure',
    },
  ],
  [
    'MC-TEXT-STRUCTURE-IS-JUST-ABOUT-PARAGRAPH-BREAKS, adult workplace framing with a five-paragraph report rather than the existing everyday-sentence examples',
    'MC-A-TEXT-CAN-ONLY-HAVE-ONE-STRUCTURE-PATTERN, re-asked with a report combining problem/solution and compare/contrast rather than the existing toy examples',
    'MC-TEXT-STRUCTURE-IS-JUST-ABOUT-PARAGRAPH-BREAKS, a second fresh example (a four-section article) forming the ladder\'s third rung',
  ],
)

const GENRE_ADULT = adultLadder(
  'eng.reading.genre-recognition', 'MC-A-A-TEXTS-GENRE-CAN-BE-IDENTIFIED-FROM-ONE-SURFACE-FEATURE-ALONE', 'MC-B-EVERY-TEXT-BELONGS-TO-EXACTLY-ONE-FIXED-GENRE-WITH-NO-OVERLAP',
  [
    {
      stem: 'A document has bullet points. Does having bullet points alone reliably tell you whether it is a memo, a résumé, a presentation outline, or a set of meeting notes?',
      correct: 'No — bullet points appear across many different genres; one surface feature alone is not enough to reliably identify a text\'s genre',
      wrong: 'Yes — a single surface feature, like bullet points, is enough by itself to identify a text\'s genre',
    },
    {
      stem: 'A company newsletter article both informs readers about a new product AND tells an engaging personal story about its creation. Must this piece belong to exactly one fixed genre with no overlap?',
      correct: 'No — many real texts blend features of multiple genres (informational and narrative); genres are not always mutually exclusive, airtight categories',
      wrong: 'Yes — every text must belong to exactly one genre category with absolutely no overlap between categories',
    },
    {
      stem: 'A document uses numbered steps. Does having numbered steps alone reliably tell you whether it is a recipe, a set of instructions, a legal contract\'s clauses, or a to-do list?',
      correct: 'No — numbered steps appear across many genres; a single surface feature is not sufficient to reliably determine genre',
      wrong: 'Yes — the presence of numbered steps by itself is enough to determine the genre of a document',
    },
  ],
  [
    'MC-A-A-TEXTS-GENRE-CAN-BE-IDENTIFIED-FROM-ONE-SURFACE-FEATURE-ALONE, adult workplace framing with bullet points across memo/résumé/notes rather than the existing everyday-sentence examples',
    'MC-B-EVERY-TEXT-BELONGS-TO-EXACTLY-ONE-FIXED-GENRE-WITH-NO-OVERLAP, re-asked with a newsletter blending informational and narrative genres rather than the existing toy examples',
    'MC-A-A-TEXTS-GENRE-CAN-BE-IDENTIFIED-FROM-ONE-SURFACE-FEATURE-ALONE, a second fresh example (numbered steps across recipe/instructions/contract/to-do list) forming the ladder\'s third rung',
  ],
)

const PURPOSE_TONE_ADULT = adultLadder(
  'eng.reading.authors-purpose-and-tone', 'MC-A-TEXT-CAN-ONLY-HAVE-ONE-PURPOSE-INFORM-OR-PERSUADE-OR-ENTERTAIN', 'MC-TONE-IS-JUST-WHATEVER-EMOTION-THE-READER-HAPPENS-TO-FEEL',
  [
    {
      stem: 'A company blog post both explains a new feature (to inform) AND urges readers to try it (to persuade). Must a piece of writing have exactly one single purpose?',
      correct: 'No — a text can have multiple purposes working together (informing and persuading at once); purpose is not always a single, exclusive category',
      wrong: 'Yes — every text can only have one purpose: to inform, or to persuade, or to entertain, never a combination',
    },
    {
      stem: 'A memo is written in a formal, urgent tone (short sentences, words like "immediately" and "critical"), but a particular reader happens to feel calm while reading it. Does the READER\'S feeling determine the memo\'s tone?',
      correct: 'No — tone is a quality of the WRITING itself (word choice, sentence structure, phrasing chosen by the author), not simply whatever emotion a given reader happens to feel',
      wrong: 'Yes — the tone of a text is just whatever emotion the reader happens to feel while reading it',
    },
    {
      stem: 'A product announcement email both informs customers of a price change AND persuades them that the change is fair. Must this email have exactly one single purpose?',
      correct: 'No — this email combines informing and persuading; texts commonly serve more than one purpose at once',
      wrong: 'Yes — a piece of writing can only ever serve one purpose, never two at the same time',
    },
  ],
  [
    'MC-A-TEXT-CAN-ONLY-HAVE-ONE-PURPOSE-INFORM-OR-PERSUADE-OR-ENTERTAIN, adult workplace framing with a company blog post rather than the existing everyday-sentence examples',
    'MC-TONE-IS-JUST-WHATEVER-EMOTION-THE-READER-HAPPENS-TO-FEEL, re-asked with an urgent memo rather than the existing toy examples',
    'MC-A-TEXT-CAN-ONLY-HAVE-ONE-PURPOSE-INFORM-OR-PERSUADE-OR-ENTERTAIN, a second fresh example (a product-announcement email) forming the ladder\'s third rung',
  ],
)

const COMPARE_CONTRAST_ADULT = adultLadder(
  'eng.reading.compare-and-contrast-texts', 'MC-COMPARING-TWO-TEXTS-MEANS-SUMMARIZING-BOTH-ONE-AFTER-ANOTHER', 'MC-TWO-TEXTS-ON-THE-SAME-TOPIC-MUST-BE-MOSTLY-THE-SAME',
  [
    {
      stem: 'To compare two vendor proposals, is writing a summary of Proposal A, followed by a separate summary of Proposal B, the same thing as comparing them?',
      correct: 'No — comparing means directly examining similarities and differences BETWEEN the two texts; summarizing each one separately in sequence does not by itself draw any connections or contrasts',
      wrong: 'Yes — comparing two texts just means summarizing each one, one after the other',
    },
    {
      stem: 'Two news articles both cover the same company\'s earnings report. Must these two texts be MOSTLY the same, just because they cover the same topic?',
      correct: 'No — two texts on the same topic can differ substantially in perspective, tone, emphasis, and conclusions, even while covering identical subject matter',
      wrong: 'Yes — if two texts are about the same topic, they must be mostly similar in content and perspective',
    },
    {
      stem: 'To compare two policy memos, is writing a summary of Memo A followed by a separate summary of Memo B the same as comparing them?',
      correct: 'No — true comparison requires identifying specific similarities and differences between the two memos, not just presenting two independent summaries back-to-back',
      wrong: 'Yes — presenting a summary of each memo in sequence counts as comparing them',
    },
  ],
  [
    'MC-COMPARING-TWO-TEXTS-MEANS-SUMMARIZING-BOTH-ONE-AFTER-ANOTHER, adult workplace framing with two vendor proposals rather than the existing everyday-sentence examples',
    'MC-TWO-TEXTS-ON-THE-SAME-TOPIC-MUST-BE-MOSTLY-THE-SAME, re-asked with two earnings-report news articles rather than the existing toy examples',
    'MC-COMPARING-TWO-TEXTS-MEANS-SUMMARIZING-BOTH-ONE-AFTER-ANOTHER, a second fresh example (two policy memos) forming the ladder\'s third rung',
  ],
)

const SKIMMING_SCANNING_ADULT = adultLadder(
  'eng.reading.skimming-and-scanning', 'MC-A-SKIMMING-AND-SCANNING-ARE-THE-SAME-TECHNIQUE-WITH-DIFFERENT-NAMES', 'MC-B-SKIMMING-OR-SCANNING-GIVES-THE-SAME-DEPTH-OF-UNDERSTANDING-AS-CAREFUL-READING',
  [
    {
      stem: 'To get a general sense of a long report\'s overall topic (skimming) vs. to find one specific number, like a budget figure, in that same report (scanning) — are these the exact same reading technique under two different names?',
      correct: 'No — skimming means quickly getting the general gist of a whole text, while scanning means searching for one specific piece of information; they are different techniques for different goals',
      wrong: 'Yes — skimming and scanning are simply two different names for the same reading technique',
    },
    {
      stem: 'After quickly skimming a 20-page contract to get its general topic, does the reader now have the SAME depth of understanding as someone who carefully read every clause?',
      correct: 'No — skimming and scanning are fast, surface-level techniques that trade depth for speed; they do not provide the same depth of understanding as careful, thorough reading',
      wrong: 'Yes — skimming or scanning a document gives you just as deep an understanding as reading it carefully in full',
    },
    {
      stem: 'To get a general sense of an article\'s main topic (skimming) vs. to find one specific date mentioned in that same article (scanning) — are these genuinely different techniques, or just two names for one technique?',
      correct: 'They are genuinely different techniques — skimming targets overall gist, scanning targets a specific detail; the goals and eye-movement patterns differ',
      wrong: 'They are just two names for the exact same technique, used interchangeably',
    },
  ],
  [
    'MC-A-SKIMMING-AND-SCANNING-ARE-THE-SAME-TECHNIQUE-WITH-DIFFERENT-NAMES, adult workplace framing with a long report\'s topic vs. a budget figure rather than the existing everyday-sentence examples',
    'MC-B-SKIMMING-OR-SCANNING-GIVES-THE-SAME-DEPTH-OF-UNDERSTANDING-AS-CAREFUL-READING, re-asked with a 20-page contract rather than the existing toy examples',
    'MC-A-SKIMMING-AND-SCANNING-ARE-THE-SAME-TECHNIQUE-WITH-DIFFERENT-NAMES, a second fresh example (an article\'s topic vs. a specific date) forming the ladder\'s third rung',
  ],
)

const CLOSE_READING_ADULT = adultLadder(
  'eng.reading.close-reading', 'MC-CLOSE-READING-MEANS-READING-SLOWLY-OR-RE-READING-MULTIPLE-TIMES', 'MC-EVERY-DETAIL-IN-A-TEXT-IS-EQUALLY-SIGNIFICANT-AND-MUST-BE-ANALYZED',
  [
    {
      stem: 'An employee reads a contract clause very slowly, three times, but never stops to examine specific word choices or their implications. Does slow, repeated reading alone count as close reading?',
      correct: 'No — close reading means deliberately analyzing specific word choices, structure, and implications, not merely reading slowly or repeatedly without that deeper analysis',
      wrong: 'Yes — close reading simply means reading a text slowly or reading it multiple times',
    },
    {
      stem: 'When closely analyzing a legal contract, must a reader treat EVERY single word and detail (including routine boilerplate phrases) as equally significant and worthy of deep analysis?',
      correct: 'No — close reading involves judgment about which details carry the most meaning or ambiguity; not every detail (like routine formatting language) deserves equally deep scrutiny',
      wrong: 'Yes — in close reading, every single detail in a text must be treated as equally significant and analyzed with the same depth',
    },
    {
      stem: 'An employee reads a policy document very slowly and re-reads it twice, but never questions why particular words were chosen. Does this alone count as close reading?',
      correct: 'No — close reading requires analyzing word choice and meaning, not just the act of reading slowly or repeatedly',
      wrong: 'Yes — reading a text slowly and re-reading it is sufficient by itself to count as close reading',
    },
  ],
  [
    'MC-CLOSE-READING-MEANS-READING-SLOWLY-OR-RE-READING-MULTIPLE-TIMES, adult workplace framing with a contract clause rather than the existing everyday-sentence examples',
    'MC-EVERY-DETAIL-IN-A-TEXT-IS-EQUALLY-SIGNIFICANT-AND-MUST-BE-ANALYZED, re-asked with a legal contract\'s boilerplate language rather than the existing toy examples',
    'MC-CLOSE-READING-MEANS-READING-SLOWLY-OR-RE-READING-MULTIPLE-TIMES, a second fresh example (a slowly-read policy document) forming the ladder\'s third rung',
  ],
)

const CRITICAL_READING_ADULT = adultLadder(
  'eng.reading.critical-reading', 'MC-CRITICAL-READING-MEANS-FINDING-FAULT-OR-DISAGREEING-WITH-THE-TEXT', 'MC-IF-A-TEXT-CITES-SOURCES-OR-STATISTICS-ITS-CLAIMS-ARE-AUTOMATICALLY-CREDIBLE',
  [
    {
      stem: 'A reader carefully evaluates a market analysis report and concludes its reasoning is sound and well-supported. Since the reader ended up agreeing with the report rather than finding fault with it, does that mean they were NOT reading critically?',
      correct: 'No — critical reading means carefully evaluating evidence and reasoning, which can lead to agreement OR disagreement; it is not defined by finding fault, just by thoughtful evaluation',
      wrong: 'Yes — critical reading specifically means finding faults or disagreeing with what a text says; agreeing with a text means you weren\'t reading critically',
    },
    {
      stem: 'A report cites an impressive-sounding statistic ("studies show 87% improvement") without naming the study or its methodology. Does citing a statistic like this automatically make the report\'s claim credible?',
      correct: 'No — a vague, unsourced citation ("studies show") does not automatically establish credibility; critical readers check whether the source is identifiable, relevant, and methodologically sound',
      wrong: 'Yes — as soon as a text cites any statistic or source, its claims are automatically credible',
    },
    {
      stem: 'A reader carefully evaluates a proposal and concludes it makes a strong, well-supported case. Since they ended up agreeing with it, does that mean they failed to read critically?',
      correct: 'No — critical reading is about the QUALITY of evaluation, not the conclusion reached; agreeing after careful evaluation is still critical reading',
      wrong: 'Yes — genuinely critical reading always results in disagreement or fault-finding; agreement signals a lack of critical evaluation',
    },
  ],
  [
    'MC-CRITICAL-READING-MEANS-FINDING-FAULT-OR-DISAGREEING-WITH-THE-TEXT, adult workplace framing with a market analysis report rather than the existing everyday-sentence examples',
    'MC-IF-A-TEXT-CITES-SOURCES-OR-STATISTICS-ITS-CLAIMS-ARE-AUTOMATICALLY-CREDIBLE, re-asked with a vague "studies show 87%" statistic rather than the existing toy examples',
    'MC-CRITICAL-READING-MEANS-FINDING-FAULT-OR-DISAGREEING-WITH-THE-TEXT, a second fresh example (a well-supported proposal) forming the ladder\'s third rung',
  ],
)

export const ENGLISH_ADULT_BAND_BATCH_8: SeedProbe[] = [
  ...INFERENCE_ADULT, ...SUMMARIZING_ADULT, ...PREDICTING_ADULT, ...TEXT_STRUCTURE_ADULT,
  ...GENRE_ADULT, ...PURPOSE_TONE_ADULT, ...COMPARE_CONTRAST_ADULT, ...SKIMMING_SCANNING_ADULT,
  ...CLOSE_READING_ADULT, ...CRITICAL_READING_ADULT,
]
