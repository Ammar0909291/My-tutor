/**
 * ENGLISH ADULT-BAND CARD-DEPTH — Batch 36 (10 cards, one per (concept, ADULT) pair). Why this exists, what a card is and the P-10 slot rule: see
 * `englishAdultCard.ts`. A new 3-option `fill_blank` card takes each pair from four gradeable probes to five; each wrong answer carries the id of one
 * of the concept's two registered misconceptions (A = first, B = second in `englishAdultMisconceptionIds.ts`). Option lengths are balanced (the correct
 * answer is the uniquely longest option in about a third of the cards, as chance would give), like the earlier card-depth batches.
 */
import type { SeedProbe } from './brainSeedAssets'
import { adultCard } from './englishAdultCard'

export const ENGLISH_CARD_DEPTH_BATCH_36: SeedProbe[] = [
  // reading.authors-purpose-and-tone
  //   A: MC-A-TEXT-CAN-ONLY-HAVE-ONE-PURPOSE-INFORM-OR-PERSUADE-OR-ENTERTAIN
  //   B: MC-TONE-IS-JUST-WHATEVER-EMOTION-THE-READER-HAPPENS-TO-FEEL
  adultCard("eng.reading.authors-purpose-and-tone",
    "A charity newsletter tells a funny story about a volunteer's first day, explains how donations are used, and ends by urging readers to give. The writing is warm and teasing. Which analysis is accurate?",
    "Its primary purpose may be to persuade, with informing and entertaining secondary; the warm tone is the writer's attitude, not the reader's mood",
    "It must have exactly one purpose, since a text can only inform, persuade or entertain",
    "Its tone is whatever emotion the reader happens to feel, so it is sad for a reader who feels sad and cheerful for one who feels cheerful, whatever the writer intended",
    "primary and secondary purposes; tone is the author's attitude"),
  // reading.close-reading
  //   A: MC-CLOSE-READING-MEANS-READING-SLOWLY-OR-RE-READING-MULTIPLE-TIMES
  //   B: MC-EVERY-DETAIL-IN-A-TEXT-IS-EQUALLY-SIGNIFICANT-AND-MUST-BE-ANALYZED
  adultCard("eng.reading.close-reading",
    "A student reads a short poem five times slowly and then comments on every word and punctuation mark as equally important. Another reads it once, picks out three word choices and explains how they build the tone. Which has close-read?",
    "The second: close reading is analytical depth, selecting significant details and explaining their effect, not slowness or equal weight",
    "The first, because close reading means reading slowly or re-reading many times",
    "The first, because every detail in a text is equally significant and must be analyzed, and she commented on every word and mark of the poem",
    "depth of analysis, not speed or equal weight"),
  // reading.compare-and-contrast-texts
  //   A: MC-COMPARING-TWO-TEXTS-MEANS-SUMMARIZING-BOTH-ONE-AFTER-ANOTHER
  //   B: MC-TWO-TEXTS-ON-THE-SAME-TOPIC-MUST-BE-MOSTLY-THE-SAME
  adultCard("eng.reading.compare-and-contrast-texts",
    "Two reports on the same city's traffic reach opposite conclusions. A student drafts a page on Report A, then a page on Report B, and expects them to be mostly alike because the topic is the same. What is the better approach?",
    "Connect them point by point on shared dimensions, such as evidence and conclusion, using \"both... but\" or \"unlike Report A, Report B...\", expecting real differences",
    "Keep the two summaries side by side, since comparing texts means summarizing both one after another",
    "Expect the two reports to be mostly the same, since two texts on the same topic must be mostly alike",
    "explicit connection on shared dimensions; same topic does not mean same text"),
  // reading.critical-reading
  //   A: MC-CRITICAL-READING-MEANS-FINDING-FAULT-OR-DISAGREEING-WITH-THE-TEXT
  //   B: MC-IF-A-TEXT-CITES-SOURCES-OR-STATISTICS-ITS-CLAIMS-ARE-AUTOMATICALLY-CREDIBLE
  adultCard("eng.reading.critical-reading",
    "A reader carefully checks a report that cites \"a national survey\" without saying who ran it. A second reader says critical reading means finding fault, and a third accepts the report because it cites a survey. Which is sound?",
    "The careful reader: critical means evaluative, and a survey with no named source is not automatically credible, though evaluation can also conclude that a text is credible",
    "The second reader: critical reading means finding fault or disagreeing with the text",
    "The third reader: if a text cites sources or statistics, its claims are automatically credible",
    "critical means evaluative; citation is not credibility"),
  // reading.evaluating-sources
  //   A: MC-A-SOURCE-IS-CREDIBLE-IF-IT-LOOKS-PROFESSIONAL-OR-OFFICIAL
  //   B: MC-A-SOURCE-IS-EITHER-COMPLETELY-RELIABLE-OR-COMPLETELY-UNRELIABLE
  adultCard("eng.reading.evaluating-sources",
    "A slick, official-looking website with no named author claims a miracle diet works, and a plain university page by a named researcher once corrected an error in an earlier article. How should a reader judge them?",
    "By substance: authorship, evidence and purpose; the slick site is not credible just because it looks official, and a source that once made an error is not completely unreliable",
    "The slick site is credible, because it looks professional and official",
    "The university page is now completely unreliable, since a source is either completely reliable or completely unreliable",
    "credibility is substance-based and graded"),
  // reading.genre-recognition
  //   A: MC-A-A-TEXTS-GENRE-CAN-BE-IDENTIFIED-FROM-ONE-SURFACE-FEATURE-ALONE
  //   B: MC-B-EVERY-TEXT-BELONGS-TO-EXACTLY-ONE-FIXED-GENRE-WITH-NO-OVERLAP
  adultCard("eng.reading.genre-recognition",
    "A text has short lines and dialogue in quotation marks, and it also informs readers about a historical event while telling an engaging story. A student calls it a poem because of the short lines, and says it must belong to exactly one fixed genre. Which statement is accurate?",
    "Genre is judged from overall purpose, structure and content, not one surface feature, and a text can blend genres",
    "It is a poem, because line breaks alone identify poetry",
    "It must be exactly one fixed genre with no overlap, so only one of informing or storytelling can be true",
    "genre needs more than one feature; genres overlap"),
  // reading.inference-in-reading
  //   A: MC-IF-ITS-NOT-STATED-EXPLICITLY-YOU-CANT-KNOW-IT
  //   B: MC-INFERENCE-MEANS-ANY-GUESS-THAT-FEELS-PLAUSIBLE
  adultCard("eng.reading.inference-in-reading",
    "A notice says, \"The pharmacy's lights were still on at 9 pm, and three customers waited at the door.\" Which conclusion is a valid inference?",
    "\"The pharmacy was probably open late\": the text gives lights and customers, and I know pharmacies serve customers when open",
    "No conclusion can be drawn, because the notice never states whether the pharmacy was open, and an unstated fact cannot be known",
    "\"The pharmacy was celebrating an anniversary\": that feels plausible, so it counts as an inference",
    "inference ties text evidence to background knowledge"),
  // reading.literal-comprehension
  //   A: MC-IF-I-UNDERSTAND-THE-WORDS-I-UNDERSTAND-THE-TEXT
  //   B: MC-LITERAL-COMPREHENSION-MEANS-MEMORIZING-EXACT-WORDING
  adultCard("eng.reading.literal-comprehension",
    "An employee can define every word in \"Parcels over 20 kg must be booked 48 hours ahead\" but cannot say what the rule asks. Another recites the sentence perfectly from memory. Which has shown literal comprehension?",
    "Neither yet: literal comprehension is understanding what is explicitly stated, shown by restating the facts in one's own words, not by knowing word meanings or reciting the wording",
    "The first, because understanding the words means understanding the text",
    "The second, because literal comprehension means memorizing the exact wording",
    "literal comprehension is stated facts restated, not words or memory"),
  // reading.main-idea-and-details
  //   A: MC-A-FIRST-SENTENCE-IS-ALWAYS-THE-MAIN-IDEA
  //   B: MC-MAIN-IDEA-MUST-BE-STATED-WORD-FOR-WORD-SOMEWHERE
  adultCard("eng.reading.main-idea-and-details",
    "A paragraph begins \"It rained all week.\" It then explains that the harvest was late, the roads washed out and the market closed, without any sentence stating the overall point. A student says the first sentence is the main idea, and another says there is none because it is not stated. Which is accurate?",
    "The main idea is broad enough to cover every sentence, here that a week of rain disrupted the town's farming and trade, and it can be unstated",
    "The main idea is \"It rained all week\", because the first sentence is always the main idea",
    "There is no main idea, because a main idea must be stated word for word somewhere in the paragraph",
    "main idea covers all the sentences; it can be unstated"),
  // reading.predicting-and-confirming
  //   A: MC-A-A-PREDICTION-IS-JUST-A-GUESS-AND-DOESNT-NEED-TO-BE-BASED-ON-TEXT-CLUES
  //   B: MC-B-ONCE-A-PREDICTION-IS-MADE-IT-SHOULD-BE-DEFENDED-RATHER-THAN-REVISED
  adultCard("eng.reading.predicting-and-confirming",
    "Before reading an article titled \"Library Hours Cut as Funding Falls\", a reader predicts it will mention fewer open days, and then finds it is mostly about volunteers filling the gap. What should she do?",
    "Base predictions on clues such as the title, and revise when the text differs: her prediction was reasoned, and revising confirms or corrects it",
    "Treat her prediction as a free guess that need not rely on the title or other clues",
    "Defend the original prediction against the text, since a prediction once made should be defended rather than revised, even when the article differs",
    "predictions are clue-based and revisable"),
]
