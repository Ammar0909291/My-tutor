/**
 * ENGLISH ADULT-BAND CARD-DEPTH — Batch 37 (10 cards, one per (concept, ADULT) pair). Why this exists, what a card is and the P-10 slot rule: see
 * `englishAdultCard.ts`. A new 3-option `fill_blank` card takes each pair from four gradeable probes to five; each wrong answer carries the id of one
 * of the concept's two registered misconceptions (A = first, B = second in `englishAdultMisconceptionIds.ts`). Option lengths are balanced (the correct
 * answer is the uniquely longest option in about a third of the cards, as chance would give), like the earlier card-depth batches.
 */
import type { SeedProbe } from './brainSeedAssets'
import { adultCard } from './englishAdultCard'

export const ENGLISH_CARD_DEPTH_BATCH_37: SeedProbe[] = [
  // reading.print-to-meaning
  //   A: MC-COMPREHENSION-IS-ALL-OR-NOTHING
  //   B: MC-READING-ALOUD-CORRECTLY-EQUALS-COMPREHENSION
  adultCard("eng.reading.print-to-meaning",
    "An adult learner reads a lease aloud flawlessly but cannot say what the tenant must do, while another understands the main obligation but is unsure about two clauses. Which statement is accurate?",
    "Accurate reading aloud is not comprehension, since meaning needs an extra step of connecting words to ideas; comprehension comes in degrees",
    "The second learner understands nothing, since comprehension is all or nothing",
    "The first learner has understood the lease, since reading aloud correctly equals comprehension, as her flawless reading aloud of every clause plainly shows",
    "decoding is not comprehension; comprehension is partial"),
  // reading.reading-across-genres
  //   A: MC-A-SYNTHESIZING-MULTIPLE-TEXTS-MEANS-SUMMARIZING-EACH-ONE-SEPARATELY-BACK-TO
  //   B: MC-B-TEXTS-IN-DIFFERENT-GENRES-CANNOT-BE-MEANINGFULLY-CONNECTED-OR-SYNTHESIZED
  adultCard("eng.reading.reading-across-genres",
    "An analyst has a safety report, a worker's diary and a news article about the same factory fire. She writes three separate summaries and says the genres are too different to be connected. What is the better approach?",
    "Integrate the insights into one understanding of how the fire spread, treating each genre as a different kind of evidence",
    "Keep the three summaries back to back, since synthesizing texts means summarizing each one separately, one after another, and leaving them there",
    "Leave the connections out, since texts in different genres cannot be meaningfully connected or synthesized",
    "synthesis integrates across texts and genres"),
  // reading.reading-fluency
  //   A: MC-FLUENCY-DEVELOPS-AUTOMATICALLY-FROM-JUST-READING-MORE
  //   B: MC-READING-FLUENCY-IS-JUST-SPEED
  adultCard("eng.reading.reading-fluency",
    "A trainee reads policy documents at top speed with a flat voice and errors, and believes that simply reading more pages each week will fix fluency. Which statement is accurate?",
    "Fluency combines accuracy, appropriate rate and expression, and grows with practice and feedback on all three, not volume or speed",
    "Fluency develops automatically from just reading more, so extra pages each week will fix it without any feedback or practice on the rest",
    "Fluency is just speed, so the trainee already reads fluently",
    "fluency has three components; practice, not volume alone"),
  // reading.skimming-and-scanning
  //   A: MC-A-SKIMMING-AND-SCANNING-ARE-THE-SAME-TECHNIQUE-WITH-DIFFERENT-NAMES
  //   B: MC-B-SKIMMING-OR-SCANNING-GIVES-THE-SAME-DEPTH-OF-UNDERSTANDING-AS-CAREFUL-REA
  adultCard("eng.reading.skimming-and-scanning",
    "Before a meeting, an analyst skims a 40-page report for its overall argument, then scans it for one supplier's name. She says the two are the same technique and that she now understands the report as deeply as if she had read it carefully. Which statement is accurate?",
    "Skimming samples structure for the general idea and scanning hunts one target, so they differ, and neither equals careful reading",
    "Skimming and scanning are the same technique with different names",
    "Skimming and scanning give the same depth of understanding as careful reading, so she has now understood the report as fully as a careful reader would",
    "skimming differs from scanning; neither replaces careful reading"),
  // reading.summarizing
  //   A: MC-A-GOOD-SUMMARY-INCLUDES-EVERY-DETAIL-FROM-THE-ORIGINAL
  //   B: MC-A-SUMMARY-MEANS-COPYING-THE-IMPORTANT-SENTENCES
  adultCard("eng.reading.summarizing",
    "To summarize a podcast transcript in three sentences, one person lifts four striking quotations and another tries to include every example the host mentions. What is the better approach?",
    "Restate the essential content in your own words and sentence structure, leaving out most of the details",
    "Include every detail and example, since a good summary includes everything from the original, however long it makes the summary",
    "Lift the striking quotations and join them, since a summary means copying the important sentences",
    "summary is essential content in your own words"),
  // reading.text-structure
  //   A: MC-A-TEXT-CAN-ONLY-HAVE-ONE-STRUCTURE-PATTERN
  //   B: MC-TEXT-STRUCTURE-IS-JUST-ABOUT-PARAGRAPH-BREAKS
  adultCard("eng.reading.text-structure",
    "A report has eight neat paragraphs. Some describe events in time order, one compares two suppliers, and one explains what caused a delay. A student says the structure is just the eight paragraph breaks, and that a text can have only one pattern. Which statement is accurate?",
    "Structure is how ideas are logically connected, and a text can use several patterns: sequence, compare-contrast and cause-effect here",
    "A text can have only one structure pattern, so the report must fit just one of these",
    "The structure is just the paragraph breaks, so eight paragraphs mean eight structural units, whatever the paragraphs actually say or do",
    "structure is logical connection; several patterns can coexist"),
  // speaking.asking-and-answering-questions
  //   A: MC-A-GOOD-QUESTION-CAN-BE-ANSWERED-WITH-ANYTHING-RELATED-TO-THE-TOPIC
  //   B: MC-A-YES-OR-NO-ANSWER-IS-ALWAYS-A-COMPLETE-ANSWER
  adultCard("eng.speaking.asking-and-answering-questions",
    "A manager asks, \"Why did the delivery arrive late?\" One employee answers \"Yes\", and another talks about next month's schedule. Which statement is accurate?",
    "The question asks for an explanation, so a good answer gives the reason; \"yes\" does not fit a why-question, nor does a different topic",
    "The employee who talks about the schedule has answered, since anything related to the topic is a good answer to a manager's question about the delivery",
    "\"Yes\" is a complete answer, since a yes or no answer is always complete",
    "match the answer to the question type"),
  // speaking.conversation-skills
  //   A: MC-GOOD-CONVERSATION-MEANS-TALKING-A-LOT
  //   B: MC-SILENCE-IN-A-CONVERSATION-MEANS-SOMETHING-WENT-WRONG
  adultCard("eng.speaking.conversation-skills",
    "At a workshop, Mia speaks for five minutes without a break, and when Noor takes a thoughtful pause before replying, Mia hurries to fill the silence. Which statement is accurate?",
    "Good conversation is measured by balanced turns and responsiveness, and a short thoughtful pause is normal, so Mia should leave Noor room",
    "Mia is conversing well, because good conversation means talking a lot",
    "The pause shows that the conversation has gone wrong, because silence always means something went wrong, and Mia is right to fill it quickly",
    "balance and responsiveness; silence is normal"),
  // speaking.debate-skills
  //   A: MC-A-WINNING-A-DEBATE-MEANS-DELIVERING-YOUR-PREPARED-ARGUMENTS-REGARDLESS-OF-W
  //   B: MC-B-BEING-FORCEFUL-OR-DIRECTLY-CHALLENGING-AN-OPPONENTS-ARGUMENT-MEANS-BEING-
  adultCard("eng.speaking.debate-skills",
    "In a debate on school start times, the opponent argues that later starts would raise bus costs. A speaker ignores this and reads her prepared points on sleep, and she criticizes a rival for firmly saying \"That figure is wrong\". Which statement is accurate?",
    "A strong debater responds to what the opponent actually said, and firmly challenging an argument is not disrespectful when it stays on the argument",
    "Her approach wins, since winning a debate means delivering the prepared arguments whatever the opponent says",
    "The rival was being disrespectful, because being forceful or directly challenging an argument is hostile",
    "engaged rebuttal; forceful is not hostile"),
  // speaking.discussion-skills
  //   A: MC-A-GOOD-DISCUSSION-CONTRIBUTION-MEANS-INTRODUCING-A-NEW-IDEA
  //   B: MC-DISAGREEING-MEANS-BEING-RUDE-OR-CONFRONTATIONAL
  adultCard("eng.speaking.discussion-skills",
    "In a planning meeting, Sana builds on a colleague's idea by clarifying it, while Tomas thinks the proposed budget is too small but stays silent so as not to seem rude. Which statement is accurate?",
    "Clarifying and building on an idea is a real contribution, and Tomas should respectfully say he sees it differently, and why",
    "Sana's clarifying adds nothing, since a good contribution means introducing a new idea rather than building on one already made",
    "Tomas is right to stay silent, since disagreeing means being rude or confrontational",
    "building on ideas counts; respectful disagreement helps"),
]
