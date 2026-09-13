/**
 * ENGLISH PROBE-CONTRACT CAMPAIGN — Batch 4.
 *
 * DOMAIN CHANGE FROM BATCH 3: Batch 3 closed out the remaining low-risk
 * grammar/vocab concepts. This batch deliberately moves into previously
 * untouched domains — 16 eng.reading concepts (the ENTIRE remaining
 * eng.reading domain) + 9 eng.writing concepts (alphabetically first) —
 * rather than continuing grammar/vocab merely because it's easier, per
 * explicit instruction.
 *
 * All 25 concepts re-measured at closed=2 (mcq x1 + misconception_probe
 * x1) directly from the seed corpus in git before authoring (zero DB
 * access, zero egress — see the inventory script run this session).
 * Every one confirmed to already carry two genuine, distinct, ACTIVE
 * misconception ids on its existing probes — the stop-condition check
 * ("skip a candidate lacking sufficient existing misconceptions rather
 * than inventing Educational Brain content") passed for all 25; none
 * were skipped.
 *
 * Each concept goes straight from depth 2 to depth 4 — TWO new probes,
 * matching the owner-set resilience target established across Batches
 * 1-3 (live-verified on nouns/blending-segmenting/modals/pronouns/
 * comma-usage/sentence-combining).
 *
 * Probe A: probeKind 'checkpoint' (depth 3), reuses the concept's FIRST
 *   registered misconception from a fresh worked example.
 * Probe B: probeKind 'true_false' (depth 4), reuses the concept's SECOND
 *   registered misconception from a fresh worked example.
 * Both verified free (no prior 'checkpoint'/'true_false' probe) for all
 * 25 concepts before authoring — dumped every existing probe's stem/
 * misconceptionId for this exact concept list before writing a single
 * new stem, same P-10-safe technique as every prior file in this
 * campaign.
 *
 * No new misconception ids. No Educational Brain authoring. Every
 * gradeBand below is the concept's OWN native band, read off its
 * existing probes: ELEMENTARY for 13 of the 16 reading concepts
 * (authors-purpose-and-tone, genre-recognition, inference-in-reading,
 * literal-comprehension, main-idea-and-details, predicting-and-
 * confirming, print-to-meaning, reading-fluency, skimming-and-scanning,
 * summarizing, text-structure); MIDDLE for close-reading, compare-and-
 * contrast-texts, critical-reading, evaluating-sources (reading) and
 * descriptive-writing, drafting, editing-and-proofreading, expository-
 * writing, handwriting-and-formation, narrative-writing (writing); HIGH
 * for reading-across-genres (reading) and citations-and-referencing,
 * creative-writing-forms, essay-structure (writing).
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

const EL = GradeBand.ELEMENTARY
const M = GradeBand.MIDDLE
const H = GradeBand.HIGH

export const ENGLISH_PROBE_BATCH_4: SeedProbe[] = [
  // ─── eng.reading.authors-purpose-and-tone (ELEMENTARY) ─────────────────
  probe('eng.reading.authors-purpose-and-tone', 'checkpoint', EL,
    'A cookbook recipe teaches you how to make bread and also includes a warm personal story about the author\'s grandmother. Does this text have only one purpose?',
    'No — it can have a primary purpose (to inform/instruct) and a genuine secondary purpose (to share a personal story) at the same time',
    'Yes — every text must be classified under exactly one purpose',
    'eng.reading.authors-purpose-and-tone:MC-A-TEXT-CAN-ONLY-HAVE-ONE-PURPOSE-INFORM-OR-PERSUADE-OR-ENTERTAIN',
    'MC-A-..., re-asked with a cookbook/memoir hybrid rather than the existing humorous-essay example'),
  probe('eng.reading.authors-purpose-and-tone', 'true_false', EL,
    '"The factory closed, leaving 200 workers without jobs" is written in flat, factual language. If one reader feels angry and another feels indifferent, has the author\'s tone changed?',
    'No — the author\'s tone (flat, factual) is fixed in the word choices; reader reactions can vary without changing it',
    'Yes — tone is whatever emotion each individual reader happens to feel',
    'eng.reading.authors-purpose-and-tone:MC-TONE-IS-JUST-WHATEVER-EMOTION-THE-READER-HAPPENS-TO-FEEL',
    'MC-TONE-IS-JUST-WHATEVER-EMOTION-THE-READER-HAPPENS-TO-FEEL, re-asked with a factory-closure sentence rather than the existing battle-casualties example'),

  // ─── eng.reading.close-reading (MIDDLE) ────────────────────────────────
  probe('eng.reading.close-reading', 'checkpoint', M,
    'One student reads a poem five times but can only recite it from memory. Another reads it once and can explain why the poet repeats one specific word three times. Who did close reading?',
    'The second student — close reading is defined by analytical depth, not speed or repetition',
    'The first student — reading it many times is what close reading means',
    'eng.reading.close-reading:MC-CLOSE-READING-MEANS-READING-SLOWLY-OR-RE-READING-MULTIPLE-TIMES',
    'MC-CLOSE-READING-MEANS-READING-SLOWLY-OR-RE-READING-MULTIPLE-TIMES, re-asked with a poem/memorization example rather than the existing plot/tone example'),
  probe('eng.reading.close-reading', 'true_false', M,
    'A short story mentions "blue curtains" once, in passing, with no other emphasis anywhere in the text. Does close reading require treating this detail with the same depth as the story\'s repeated central image?',
    'No — close reading focuses deep analysis on standout details (repetitions, unusual choices, emphasized positions), not every passing detail equally',
    'Yes — every detail in a text is equally significant and must be analyzed',
    'eng.reading.close-reading:MC-EVERY-DETAIL-IN-A-TEXT-IS-EQUALLY-SIGNIFICANT-AND-MUST-BE-ANALYZED',
    'MC-EVERY-DETAIL-IN-A-TEXT-IS-EQUALLY-SIGNIFICANT-AND-MUST-BE-ANALYZED, re-asked with a "blue curtains" passing-detail example rather than the existing generic "every word" framing'),

  // ─── eng.reading.compare-and-contrast-texts (MIDDLE) ───────────────────
  probe('eng.reading.compare-and-contrast-texts', 'checkpoint', M,
    'A student writes one paragraph about a novel\'s hero, then a separate paragraph about a movie\'s hero, with no sentence ever linking the two. Is this a genuine comparison?',
    'No — a genuine comparison explicitly connects the texts on shared dimensions using comparison language',
    'Yes — writing about each one separately, back to back, is what comparing means',
    'eng.reading.compare-and-contrast-texts:MC-COMPARING-TWO-TEXTS-MEANS-SUMMARIZING-BOTH-ONE-AFTER-ANOTHER',
    'MC-COMPARING-TWO-TEXTS-MEANS-SUMMARIZING-BOTH-ONE-AFTER-ANOTHER, re-asked with a novel/movie-hero example rather than the existing Text A/Text B example'),
  probe('eng.reading.compare-and-contrast-texts', 'true_false', M,
    'A folk tale and a modern news article both describe a flood. Does sharing this topic mean the two texts must be mostly similar in structure and tone?',
    'No — they can differ substantially in structure, tone, and perspective despite the shared topic',
    'Yes — two texts on the same topic must be mostly the same',
    'eng.reading.compare-and-contrast-texts:MC-TWO-TEXTS-ON-THE-SAME-TOPIC-MUST-BE-MOSTLY-THE-SAME',
    'MC-TWO-TEXTS-ON-THE-SAME-TOPIC-MUST-BE-MOSTLY-THE-SAME, re-asked with a folk-tale/news-article flood example rather than the existing historical-event example'),

  // ─── eng.reading.critical-reading (MIDDLE) ─────────────────────────────
  probe('eng.reading.critical-reading', 'checkpoint', M,
    'A student critically reads a clearly-argued opinion column and concludes its reasoning is sound, even though they personally disagree with its conclusion. Did the student fail at critical reading by not rejecting the article?',
    'No — critical reading means evaluating the REASONING, which can validly conclude an argument is well-constructed even if you disagree with its conclusion',
    'Yes — critical reading requires finding something wrong with or disagreeing with the text',
    'eng.reading.critical-reading:MC-CRITICAL-READING-MEANS-FINDING-FAULT-OR-DISAGREEING-WITH-THE-TEXT',
    'MC-CRITICAL-READING-MEANS-FINDING-FAULT-OR-DISAGREEING-WITH-THE-TEXT, re-asked with a well-argued-but-disagreed-with column rather than the existing well-researched-article example'),
  probe('eng.reading.critical-reading', 'true_false', M,
    'An article claims "experts agree" on a controversial topic but never names a single expert, study, or organization. Does the phrase "experts agree" alone make the claim credible?',
    'No — the citation\'s specificity must be evaluated; an unnamed, vague appeal to "experts" is weak evidence, not automatic credibility',
    'Yes — if a text cites sources or statistics, its claims are automatically credible',
    'eng.reading.critical-reading:MC-IF-A-TEXT-CITES-SOURCES-OR-STATISTICS-ITS-CLAIMS-ARE-AUTOMATICALLY-CREDIBLE',
    'MC-IF-A-TEXT-CITES-SOURCES-OR-STATISTICS-ITS-CLAIMS-ARE-AUTOMATICALLY-CREDIBLE, re-asked with an unnamed "experts agree" claim rather than the existing unnamed-study example'),

  // ─── eng.reading.evaluating-sources (MIDDLE) ───────────────────────────
  probe('eng.reading.evaluating-sources', 'checkpoint', M,
    'A blog post uses a formal-sounding ".org" domain and official-looking logos, but makes a scientific claim with no named author or cited research. Is it credible because of its official appearance?',
    'No — check authorship, cited evidence, and track record, not domain type or visual polish',
    'Yes — an official-looking domain and logos signal reliability',
    'eng.reading.evaluating-sources:MC-A-SOURCE-IS-CREDIBLE-IF-IT-LOOKS-PROFESSIONAL-OR-OFFICIAL',
    'MC-A-SOURCE-IS-CREDIBLE-IF-IT-LOOKS-PROFESSIONAL-OR-OFFICIAL, re-asked with a ".org" domain/logo example rather than the existing slick-website example'),
  probe('eng.reading.evaluating-sources', 'true_false', M,
    'A well-regarded science magazine that has published accurate articles for decades runs one unsourced claim in an opinion piece. Does this one lapse make every future article from that magazine unreliable?',
    'No — evaluate each specific claim on its own merits; credibility varies by claim and topic, even for generally reputable sources',
    'Yes — a source is either completely reliable or completely unreliable',
    'eng.reading.evaluating-sources:MC-A-SOURCE-IS-EITHER-COMPLETELY-RELIABLE-OR-COMPLETELY-UNRELIABLE',
    'MC-A-SOURCE-IS-EITHER-COMPLETELY-RELIABLE-OR-COMPLETELY-UNRELIABLE, re-asked with a science-magazine example rather than the existing news-source example'),

  // ─── eng.reading.genre-recognition (ELEMENTARY) ────────────────────────
  probe('eng.reading.genre-recognition', 'checkpoint', EL,
    'A fictional adventure story about talking animals is illustrated with realistic, detailed drawings. Is it automatically nonfiction because the pictures look realistic?',
    'No — its content (talking animals, an invented plot) is fiction; illustration style alone does not determine genre',
    'Yes — any text with realistic-looking illustrations is nonfiction',
    'eng.reading.genre-recognition:MC-A-A-TEXTS-GENRE-CAN-BE-IDENTIFIED-FROM-ONE-SURFACE-FEATURE-ALONE',
    'MC-A-..., re-asked with a realistic-illustration example rather than the existing poetic-line-breaks example'),
  probe('eng.reading.genre-recognition', 'true_false', EL,
    'A biography tells the true story of a scientist\'s life but uses vivid scene-setting and dialogue like a novel. Must this be classified as purely biography or purely fiction, with no overlap?',
    'No — it can be named as narrative nonfiction, a genuine hybrid combining both genres\' conventions',
    'Yes — every text must fit into exactly one fixed genre with no overlap',
    'eng.reading.genre-recognition:MC-B-EVERY-TEXT-BELONGS-TO-EXACTLY-ONE-FIXED-GENRE-WITH-NO-OVERLAP',
    'MC-B-..., re-asked with a biography/novel-style-scenes example rather than the existing memoir example'),

  // ─── eng.reading.inference-in-reading (ELEMENTARY) ─────────────────────
  probe('eng.reading.inference-in-reading', 'checkpoint', EL,
    'A character "kept glancing at the clock and tapping her foot." A student infers "she was excited about a party." Is this a well-grounded inference?',
    'No — nothing in the text supports excitement about a party; "she was anxious about the time" is the inference the clues actually support',
    'Yes — any plausible real-world explanation counts as an inference',
    'eng.reading.inference-in-reading:MC-INFERENCE-MEANS-ANY-GUESS-THAT-FEELS-PLAUSIBLE',
    'MC-INFERENCE-MEANS-ANY-GUESS-THAT-FEELS-PLAUSIBLE, re-asked with a clock-watching example rather than the existing coat/sky example'),
  probe('eng.reading.inference-in-reading', 'true_false', EL,
    '"Maria\'s eyes welled up as she read the letter." The text never says Maria felt sad. Can a reader still reasonably conclude she was sad?',
    'Yes — physical signs of emotion, described in the text, support that conclusion even though the word is never used',
    'No — if the text never states a feeling directly, you cannot know it',
    'eng.reading.inference-in-reading:MC-IF-ITS-NOT-STATED-EXPLICITLY-YOU-CANT-KNOW-IT',
    'MC-IF-ITS-NOT-STATED-EXPLICITLY-YOU-CANT-KNOW-IT, re-asked with a welling-eyes example rather than the existing shaking-hands example'),

  // ─── eng.reading.literal-comprehension (ELEMENTARY) ────────────────────
  probe('eng.reading.literal-comprehension', 'checkpoint', EL,
    'The text says "The bridge collapsed in 1940 after strong winds." A student says "Powerful wind caused the bridge to fall down in 1940." Does this show literal comprehension?',
    'Yes — the key explicit facts are preserved, even though the wording changed',
    'No — literal comprehension requires the exact original wording',
    'eng.reading.literal-comprehension:MC-LITERAL-COMPREHENSION-MEANS-MEMORIZING-EXACT-WORDING',
    'MC-LITERAL-COMPREHENSION-MEANS-MEMORIZING-EXACT-WORDING, re-asked with a bridge-collapse example rather than the existing volcano example'),
  probe('eng.reading.literal-comprehension', 'true_false', EL,
    'A student knows every word in "Few of the guests arrived on time" but says it means "most guests arrived on time." Does knowing every word\'s meaning guarantee correct comprehension?',
    'No — the words must be correctly combined, including qualifying details like "few" vs. "most"',
    'Yes — knowing every word\'s meaning is enough to understand the sentence',
    'eng.reading.literal-comprehension:MC-IF-I-UNDERSTAND-THE-WORDS-I-UNDERSTAND-THE-TEXT',
    'MC-IF-I-UNDERSTAND-THE-WORDS-I-UNDERSTAND-THE-TEXT, re-asked with a "few"/"most" example rather than the existing "only some"/"all" example'),

  // ─── eng.reading.main-idea-and-details (ELEMENTARY) ────────────────────
  probe('eng.reading.main-idea-and-details', 'checkpoint', EL,
    'A paragraph opens with "The old clock ticked loudly in the silent room," but sentences 2-5 describe a family\'s morning routine. Is the first sentence the main idea?',
    'No — check whether it covers every sentence; here it is just an opening detail setting a scene',
    'Yes — the first sentence is always the main idea',
    'eng.reading.main-idea-and-details:MC-A-FIRST-SENTENCE-IS-ALWAYS-THE-MAIN-IDEA',
    'MC-A-FIRST-SENTENCE-IS-ALWAYS-THE-MAIN-IDEA, re-asked with a clock-ticking opener rather than the existing lion\'s-roar opener'),
  probe('eng.reading.main-idea-and-details', 'true_false', EL,
    'Three sentences each describe a different neighbor bringing food after a house fire, but no sentence says "the neighbors came together to help." Can this paragraph still have a main idea?',
    'Yes — an implied main idea, put in your own words, is just as valid as a stated one',
    'No — if no sentence states it directly, there is no main idea',
    'eng.reading.main-idea-and-details:MC-MAIN-IDEA-MUST-BE-STATED-WORD-FOR-WORD-SOMEWHERE',
    'MC-MAIN-IDEA-MUST-BE-STATED-WORD-FOR-WORD-SOMEWHERE, re-asked with a house-fire/neighbors example rather than the existing flood/townspeople example'),

  // ─── eng.reading.predicting-and-confirming (ELEMENTARY) ────────────────
  probe('eng.reading.predicting-and-confirming', 'checkpoint', EL,
    'A text titled "The Storm That Sank the Ship" opens describing dark clouds gathering over the harbor. Which is the better prediction: "the story is about a birthday party" or "the story is about a dangerous voyage"?',
    '"The story is about a dangerous voyage" — grounded in the title and opening clues',
    '"The story is about a birthday party" — any guess counts as a prediction',
    'eng.reading.predicting-and-confirming:MC-A-A-PREDICTION-IS-JUST-A-GUESS-AND-DOESNT-NEED-TO-BE-BASED-ON-TEXT-CLUES',
    'MC-A-..., re-asked with a storm/ship title example rather than the existing drought/village example'),
  probe('eng.reading.predicting-and-confirming', 'true_false', EL,
    'A reader predicted "the two characters will become friends," then read a scene showing them arguing bitterly and refusing to speak. What should the reader do?',
    'Revise the prediction based on the new evidence',
    'Keep defending the original prediction despite the contradicting evidence',
    'eng.reading.predicting-and-confirming:MC-B-ONCE-A-PREDICTION-IS-MADE-IT-SHOULD-BE-DEFENDED-RATHER-THAN-REVISED',
    'MC-B-..., re-asked with a friendship-prediction example rather than the existing succeeds-easily example'),

  // ─── eng.reading.print-to-meaning (ELEMENTARY) ─────────────────────────
  probe('eng.reading.print-to-meaning', 'checkpoint', EL,
    'A student reads a sentence aloud smoothly with no mistakes but, when asked, cannot say who the sentence was even about. Did they comprehend it?',
    'No — accurate, smooth reading does not by itself guarantee comprehension',
    'Yes — reading every word correctly means they understood it',
    'eng.reading.print-to-meaning:MC-READING-ALOUD-CORRECTLY-EQUALS-COMPREHENSION',
    'MC-READING-ALOUD-CORRECTLY-EQUALS-COMPREHENSION, re-asked with a "who is this about" example rather than the existing paragraph-summary example'),
  probe('eng.reading.print-to-meaning', 'true_false', EL,
    'A student says they "didn\'t get any of it" about a paragraph, but they correctly named the setting and one thing that happened. What does this suggest?',
    'They have a partial understanding to build on, not zero comprehension',
    'They are right — any confusion means total failure to comprehend',
    'eng.reading.print-to-meaning:MC-COMPREHENSION-IS-ALL-OR-NOTHING',
    'MC-COMPREHENSION-IS-ALL-OR-NOTHING, re-asked with a setting/event example rather than the existing character/want example'),

  // ─── eng.reading.reading-across-genres (HIGH) ──────────────────────────
  probe('eng.reading.reading-across-genres', 'checkpoint', H,
    'A student writes three separate paragraph summaries, one per source, in the order the sources were assigned, with no connecting sentence anywhere. Is this genuine synthesis?',
    'No — genuine synthesis integrates insights across sources into one unified understanding',
    'Yes — summarizing each source in order, one after another, is what synthesis means',
    'eng.reading.reading-across-genres:MC-A-SYNTHESIZING-MULTIPLE-TEXTS-MEANS-SUMMARIZING-EACH-ONE-SEPARATELY-BACK-TO-BACK',
    'MC-A-..., re-asked framing the order as "assignment order" rather than the existing generic framing'),
  probe('eng.reading.reading-across-genres', 'true_false', H,
    'A short story about the emotional toll of a famine and a government economic report on famine\'s statistical impact are in completely different genres. Can they still be synthesized into one understanding?',
    'Yes — they share a genuine underlying topic despite their different forms',
    'No — texts in different genres cannot be meaningfully connected',
    'eng.reading.reading-across-genres:MC-B-TEXTS-IN-DIFFERENT-GENRES-CANNOT-BE-MEANINGFULLY-CONNECTED-OR-SYNTHESIZED',
    'MC-B-..., re-asked with a famine short-story/economic-report example rather than the existing drought poem/report example'),

  // ─── eng.reading.reading-fluency (ELEMENTARY) ──────────────────────────
  probe('eng.reading.reading-fluency', 'checkpoint', EL,
    'A student reads at a moderate, natural pace, sounds out one word incorrectly, and reads with no expression at all. Is this fluent reading?',
    'No — fluency needs accuracy and expression together with an appropriate rate, not rate alone',
    'Yes — reading at a natural pace is the main sign of fluency',
    'eng.reading.reading-fluency:MC-READING-FLUENCY-IS-JUST-SPEED',
    'MC-READING-FLUENCY-IS-JUST-SPEED, re-asked with a moderate-pace-but-flat-and-inaccurate example rather than the existing fast-and-skipping example'),
  probe('eng.reading.reading-fluency', 'true_false', EL,
    'Will listening to an audiobook of many different new titles, once each, build the same fluency gains as a student repeatedly reading one short passage aloud themselves?',
    'No — a student\'s own repeated oral reading of the same passage is a distinct, targeted technique for building fluency, different from passive listening',
    'Yes — any reading-related activity builds fluency the same way',
    'eng.reading.reading-fluency:MC-FLUENCY-DEVELOPS-AUTOMATICALLY-FROM-JUST-READING-MORE',
    'MC-FLUENCY-DEVELOPS-AUTOMATICALLY-FROM-JUST-READING-MORE, re-asked with an audiobook-listening example rather than the existing new-books example'),

  // ─── eng.reading.skimming-and-scanning (ELEMENTARY) ────────────────────
  probe('eng.reading.skimming-and-scanning', 'checkpoint', EL,
    'You need to get a general sense of what a long article is about before deciding whether to read it fully. Should you skim or scan?',
    'Skim — quickly move through the whole text to grasp the general gist, not search for one specific item',
    'Scan — skimming and scanning are the same technique either way',
    'eng.reading.skimming-and-scanning:MC-A-SKIMMING-AND-SCANNING-ARE-THE-SAME-TECHNIQUE-WITH-DIFFERENT-NAMES',
    'MC-A-..., re-asked with a "get the general gist" task rather than the existing "find one date" task'),
  probe('eng.reading.skimming-and-scanning', 'true_false', EL,
    'A task asks you to evaluate whether an author\'s evidence actually supports their conclusion. Is scanning for keywords enough for this task?',
    'No — this requires full careful reading to evaluate how the evidence connects to the conclusion',
    'Yes — scanning gives the same depth of understanding as careful reading',
    'eng.reading.skimming-and-scanning:MC-B-SKIMMING-OR-SCANNING-GIVES-THE-SAME-DEPTH-OF-UNDERSTANDING-AS-CAREFUL-READING',
    'MC-B-..., re-asked with an evidence-evaluation task rather than the existing reasons-connection task'),

  // ─── eng.reading.summarizing (ELEMENTARY) ──────────────────────────────
  probe('eng.reading.summarizing', 'checkpoint', EL,
    'A student writes a "summary" by copying the passage\'s opening and closing sentences word-for-word, with nothing in between. Does this demonstrate understanding?',
    'No — copying only proves the reader can locate text, not that they understood and could restate the ideas',
    'Yes — copying the opening and closing sentences is a valid summary',
    'eng.reading.summarizing:MC-A-SUMMARY-MEANS-COPYING-THE-IMPORTANT-SENTENCES',
    'MC-A-SUMMARY-MEANS-COPYING-THE-IMPORTANT-SENTENCES, re-asked with an opening/closing-sentence copy rather than the existing three-sentence copy'),
  probe('eng.reading.summarizing', 'true_false', EL,
    'A student\'s summary of a two-page article is one and a half pages long because it restates nearly every example and side note. Is this a good summary?',
    'No — a summary must compress by dropping minor details and keeping only load-bearing ones',
    'Yes — restating nearly every detail from the original makes a summary more complete',
    'eng.reading.summarizing:MC-A-GOOD-SUMMARY-INCLUDES-EVERY-DETAIL-FROM-THE-ORIGINAL',
    'MC-A-GOOD-SUMMARY-INCLUDES-EVERY-DETAIL-FROM-THE-ORIGINAL, re-asked with a two-page-article/1.5-page-summary example rather than the existing near-original-length example'),

  // ─── eng.reading.text-structure (ELEMENTARY) ───────────────────────────
  probe('eng.reading.text-structure', 'checkpoint', EL,
    '"The bridge was old, so engineers closed it, which forced drivers to take a longer route" is one unbroken sentence. Does it have a text structure?',
    'Yes — it shows a clear cause-effect pattern, independent of paragraph breaks',
    'No — it is only one sentence, so there is no real structure to identify',
    'eng.reading.text-structure:MC-TEXT-STRUCTURE-IS-JUST-ABOUT-PARAGRAPH-BREAKS',
    'MC-TEXT-STRUCTURE-IS-JUST-ABOUT-PARAGRAPH-BREAKS, re-asked with a bridge-closure sentence rather than the existing river-flood sentence'),
  probe('eng.reading.text-structure', 'true_false', EL,
    'Paragraph 1 compares two smartphone models side by side (compare-contrast); paragraph 2 lists the steps to set up the winning model (sequence). What is "the" structure of this passage?',
    'It uses two patterns — compare-contrast in the first part, sequence in the second',
    'It must be classified under one single structure label overall',
    'eng.reading.text-structure:MC-A-TEXT-CAN-ONLY-HAVE-ONE-STRUCTURE-PATTERN',
    'MC-A-TEXT-CAN-ONLY-HAVE-ONE-STRUCTURE-PATTERN, re-asked with a smartphone compare/setup-steps example rather than the existing lake-pollution example'),

  // ─── eng.writing.citations-and-referencing (HIGH) ──────────────────────
  probe('eng.writing.citations-and-referencing', 'checkpoint', H,
    'A student reads "Global smartphone sales dropped 12% last quarter, per a market research firm" and writes, in their own words, "Fewer people bought smartphones recently" with no citation. Does paraphrasing remove the need to cite the source?',
    'No — the fact itself came from the source regardless of wording; only the words changed, not the ownership of the underlying information, so a citation is still needed',
    'Yes — only direct quotes need citation; rewording a fact into your own words means no citation is required',
    'eng.writing.citations-and-referencing:MC-A-ONLY-DIRECT-QUOTES-NEED-CITATION',
    'MC-A-ONLY-DIRECT-QUOTES-NEED-CITATION, re-asked with a smartphone-sales example rather than the existing renewable-energy example'),
  probe('eng.writing.citations-and-referencing', 'true_false', H,
    'Two sources are both properly cited for the same claim about a supplement\'s benefits — one an independent clinical trial, one a press release from the company selling the supplement. Does correct citation formatting tell us both are equally reliable evidence?',
    'No — a citation only shows where information came from; source credibility is a separate question requiring its own evaluation (expertise, bias, corroboration)',
    'Yes — citing a source means the information is automatically true or good evidence',
    'eng.writing.citations-and-referencing:MC-B-CITING-A-SOURCE-MEANS-THE-INFORMATION-IS-AUTOMATICALLY-TRUE-OR-GOOD-EVIDENCE',
    'MC-B-..., re-asked with a supplement clinical-trial/press-release example rather than the existing nutrition-study/blog example'),

  // ─── eng.writing.creative-writing-forms (HIGH) ─────────────────────────
  probe('eng.writing.creative-writing-forms', 'checkpoint', H,
    'A student writes a poem with no line breaks at all, running the words together like prose, and calls it "free verse." Does calling something free verse mean it has no real conventions to consider?',
    'No — free verse\'s line breaks are a deliberate craft choice central to the form; abandoning them entirely isn\'t a stylistic freedom, it changes what the form is doing',
    'Yes — a creative form like free verse has no rules or constraints',
    'eng.writing.creative-writing-forms:MC-A-A-CREATIVE-FORM-LIKE-FLASH-FICTION-OR-FREE-VERSE-HAS-NO-RULES-OR-CONSTRAINTS',
    'MC-A-..., re-asked with a no-line-breaks free-verse example rather than the existing rambling-flash-fiction example'),
  probe('eng.writing.creative-writing-forms', 'true_false', H,
    'A student takes a detailed, slow-paced descriptive passage written for a novel and pastes it directly into a script meant to be performed on stage. Will the same content and structure work equally well in both forms?',
    'No — a script demands dialogue and stage directions rather than descriptive prose; content must be genuinely adapted to each form\'s specific demands, not just transplanted',
    'Yes — the same content and structure works equally well in any creative form',
    'eng.writing.creative-writing-forms:MC-B-THE-SAME-CONTENT-AND-STRUCTURE-WORKS-EQUALLY-WELL-IN-ANY-CREATIVE-FORM',
    'MC-B-..., re-asked with a novel-passage-into-script example rather than the existing flash-fiction-plot-cramming example'),

  // ─── eng.writing.descriptive-writing (MIDDLE) ──────────────────────────
  probe('eng.writing.descriptive-writing', 'checkpoint', M,
    '"The scary, frightening, terrifying, horrifying, dreadful monster appeared" piles on five fear-adjectives. Does stacking more adjectives like this make description more vivid?',
    'No — redundant adjectives dilute vividness; a few precise, specific sensory details create a sharper image than a pile of near-synonyms',
    'Yes — more adjectives always makes description more vivid',
    'eng.writing.descriptive-writing:MC-MORE-ADJECTIVES-ALWAYS-MAKES-DESCRIPTION-MORE-VIVID',
    'MC-MORE-ADJECTIVES-ALWAYS-MAKES-DESCRIPTION-MORE-VIVID, re-asked with a fear-adjective pile rather than the existing size-adjective pile'),
  probe('eng.writing.descriptive-writing', 'true_false', M,
    'A description of a campfire only mentions its bright orange flames and the dark night sky (sight details). Is a sight-only description enough for vivid, immersive writing?',
    'No — sound (crackling), smell (woodsmoke), and touch (warmth) often carry as much sensory power as sight; genuinely immersive description draws on multiple senses',
    'Yes — descriptive writing only uses visual sight details',
    'eng.writing.descriptive-writing:MC-DESCRIPTIVE-WRITING-ONLY-USES-VISUAL-SIGHT-DETAILS',
    'MC-DESCRIPTIVE-WRITING-ONLY-USES-VISUAL-SIGHT-DETAILS, re-asked with a campfire example rather than the existing bakery example'),

  // ─── eng.writing.drafting (MIDDLE) ─────────────────────────────────────
  probe('eng.writing.drafting', 'checkpoint', M,
    'While drafting, you realize a word you used is repeated awkwardly three sentences in a row. Should you stop immediately and rewrite it before continuing?',
    'No — mark it and keep writing; drafting\'s job is capturing content, and word-choice polish is editing\'s job, deferred to later',
    'Yes — you must stop and fix every issue during drafting',
    'eng.writing.drafting:MC-YOU-MUST-STOP-AND-FIX-EVERY-ERROR-DURING-DRAFTING',
    'MC-YOU-MUST-STOP-AND-FIX-EVERY-ERROR-DURING-DRAFTING, re-asked with a repeated-word example rather than the existing spelling-error example'),
  probe('eng.writing.drafting', 'true_false', M,
    'You get stuck figuring out the best way to end a chapter while drafting. Should you stop drafting entirely until you know exactly how it should end?',
    'No — use a placeholder note, skip ahead to the next section, or write a rough approximate ending, keeping the overall drafting process moving',
    'Yes — if you get stuck, you should stop drafting until you know exactly what to write',
    'eng.writing.drafting:MC-IF-YOU-GET-STUCK-YOU-SHOULD-STOP-DRAFTING-UNTIL-YOU-KNOW-EXACTLY-WHAT-TO-WRITE',
    'MC-IF-YOU-GET-STUCK-YOU-SHOULD-STOP-DRAFTING-UNTIL-YOU-KNOW-EXACTLY-WHAT-TO-WRITE, re-asked with a chapter-ending example rather than the existing transition-phrasing example'),

  // ─── eng.writing.editing-and-proofreading (MIDDLE) ─────────────────────
  probe('eng.writing.editing-and-proofreading', 'checkpoint', M,
    'You proofread your report by scrolling through it quickly on screen once. Does this reliably catch all remaining errors?',
    'No — the brain auto-corrects familiar text when scanning quickly; techniques like reading aloud or reading backward catch errors a quick scroll misses',
    'Yes — proofreading by scrolling through once catches all errors',
    'eng.writing.editing-and-proofreading:MC-PROOFREADING-BY-READING-SILENTLY-ONCE-CATCHES-ALL-ERRORS',
    'MC-PROOFREADING-BY-READING-SILENTLY-ONCE-CATCHES-ALL-ERRORS, re-asked with a quick-scroll example rather than the existing silent-read example'),
  probe('eng.writing.editing-and-proofreading', 'true_false', M,
    '"I should of called you." Would a spell-checker flag "of" as an error here?',
    'No — "of" is correctly spelled, just the wrong word here; spell-check tools miss this kind of error, so human proofreading is still needed',
    'Yes — spell-check and grammar-check tools catch every error',
    'eng.writing.editing-and-proofreading:MC-SPELL-CHECK-AND-GRAMMAR-CHECK-TOOLS-CATCH-EVERY-ERROR',
    'MC-SPELL-CHECK-AND-GRAMMAR-CHECK-TOOLS-CATCH-EVERY-ERROR, re-asked with a "should of" example rather than the existing "Their going" example'),

  // ─── eng.writing.essay-structure (HIGH) ────────────────────────────────
  probe('eng.writing.essay-structure', 'checkpoint', H,
    '"This essay will discuss the history of the internet." Does this introduction give the reader a specific claim the essay will argue?',
    'No — it only announces the general subject; an essay introduction needs a specific, arguable thesis, just like a paragraph needs a genuine topic sentence claim',
    'Yes — the introduction just announces the topic the way a paragraph\'s topic sentence does',
    'eng.writing.essay-structure:MC-THE-INTRODUCTION-JUST-ANNOUNCES-THE-TOPIC-THE-WAY-A-PARAGRAPHS-TOPIC-SENTENCE-DOES',
    'MC-THE-INTRODUCTION-JUST-ANNOUNCES-THE-TOPIC-THE-WAY-A-PARAGRAPHS-TOPIC-SENTENCE-DOES, re-asked with an internet-history example rather than the existing climate-change example'),
  probe('eng.writing.essay-structure', 'true_false', H,
    'An essay\'s conclusion copies its introduction\'s thesis sentence verbatim, changing nothing. Does this demonstrate the essay\'s body actually developed the argument?',
    'No — a conclusion that just repeats the introduction verbatim suggests the body never developed anything; a genuine conclusion synthesizes the specific evidence shown',
    'Yes — the conclusion just repeats the introduction word-for-word',
    'eng.writing.essay-structure:MC-THE-CONCLUSION-JUST-REPEATS-THE-INTRODUCTION-WORD-FOR-WORD',
    'MC-THE-CONCLUSION-JUST-REPEATS-THE-INTRODUCTION-WORD-FOR-WORD, re-asked with a verbatim-copy framing rather than the existing near-identical-wording framing'),

  // ─── eng.writing.expository-writing (MIDDLE) ───────────────────────────
  probe('eng.writing.expository-writing', 'checkpoint', M,
    '"I believe recycling is the most important thing humans can do, and everyone should do more of it." Is this an appropriate sentence for expository writing?',
    'No — expository writing explains or clarifies objectively; this inserts personal opinion and a call to action, which belongs in persuasive writing instead',
    'Yes — expository writing means stating your opinion about the topic',
    'eng.writing.expository-writing:MC-EXPOSITORY-WRITING-MEANS-STATING-YOUR-OPINION-ABOUT-THE-TOPIC',
    'MC-EXPOSITORY-WRITING-MEANS-STATING-YOUR-OPINION-ABOUT-THE-TOPIC, re-asked with a recycling-opinion example rather than the existing photosynthesis example'),
  probe('eng.writing.expository-writing', 'true_false', M,
    '"Erosion is the gradual wearing away of rock and soil by wind or water." Is this bare, technically-correct definition alone enough to explain erosion to someone unfamiliar with it?',
    'No — a bare definition often isn\'t enough; adding a concrete example (like a canyon slowly carved by a river over centuries) helps the reader actually understand it',
    'Yes — a definition or fact alone is enough to explain a complex topic',
    'eng.writing.expository-writing:MC-A-DEFINITION-OR-FACT-ALONE-IS-ENOUGH-TO-EXPLAIN-A-COMPLEX-TOPIC',
    'MC-A-DEFINITION-OR-FACT-ALONE-IS-ENOUGH-TO-EXPLAIN-A-COMPLEX-TOPIC, re-asked with an erosion example rather than the existing osmosis example'),

  // ─── eng.writing.handwriting-and-formation (MIDDLE) ────────────────────
  probe('eng.writing.handwriting-and-formation', 'checkpoint', M,
    'A student writes a lowercase "e" starting from the bottom loop and working upward, but the finished letter looks fine right now. Does the stroke direction matter?',
    'Yes — an inefficient stroke direction slows writing down and causes problems later, especially for connected/cursive writing, even if it looks fine now',
    'No — if the letter looks the same, any stroke direction works',
    'eng.writing.handwriting-and-formation:MC-ANY-STROKE-ORDER-WORKS',
    'MC-ANY-STROKE-ORDER-WORKS, re-asked with a lowercase "e" stroke-direction example rather than the existing "O" example'),
  probe('eng.writing.handwriting-and-formation', 'true_false', M,
    'Does it matter whether letters like "p" and "g" hang correctly below the baseline, or is that just a stylistic flourish?',
    'It matters — descenders sitting correctly below the baseline keep writing consistent and predictable, which is what makes it quick and easy for others to read',
    'It doesn\'t matter — where descenders sit is not important',
    'eng.writing.handwriting-and-formation:MC-SIZE-AND-BASELINE-DONT-MATTER',
    'MC-SIZE-AND-BASELINE-DONT-MATTER, re-asked with a descender ("p"/"g") example rather than the existing generic baseline-height example'),

  // ─── eng.writing.narrative-writing (MIDDLE) ────────────────────────────
  probe('eng.writing.narrative-writing', 'checkpoint', M,
    '"I got up. I brushed my teeth. I got dressed. I ate cereal. I left for school." Is listing every event equally, in order, what makes a good narrative?',
    'No — good narrative writing slows down on the moments that matter most and compresses or skips less important time; uniform listing produces a report, not a narrative',
    'Yes — a good narrative just lists everything that happened in order',
    'eng.writing.narrative-writing:MC-A-GOOD-NARRATIVE-JUST-LISTS-EVERYTHING-THAT-HAPPENED-IN-ORDER',
    'MC-A-GOOD-NARRATIVE-JUST-LISTS-EVERYTHING-THAT-HAPPENED-IN-ORDER, re-asked with a morning-routine list rather than the existing school-day list'),
  probe('eng.writing.narrative-writing', 'true_false', M,
    '"I asked my brother if he was okay, and he said he was fine" summarizes a tense exchange. Is summarizing dialogue like this just as effective as rendering the actual exchange?',
    'No — actual dialogue reveals character voice and creates immediacy that summary flattens out; for key moments, rendered dialogue is more powerful',
    'Yes — dialogue is just decoration and can be summarized instead',
    'eng.writing.narrative-writing:MC-DIALOGUE-IS-JUST-DECORATION-AND-CAN-BE-SUMMARIZED-INSTEAD',
    'MC-DIALOGUE-IS-JUST-DECORATION-AND-CAN-BE-SUMMARIZED-INSTEAD, re-asked with a brother/tense-exchange example rather than the existing sister/scared example'),
]
