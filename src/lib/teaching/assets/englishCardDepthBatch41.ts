/**
 * ENGLISH ADULT-BAND CARD-DEPTH — Batch 41 (13 cards, one per (concept, ADULT) pair). Why this exists, what a card is and the P-10 slot rule: see
 * `englishAdultCard.ts`. A new 3-option `fill_blank` card takes each pair from four gradeable probes to five; each wrong answer carries the id of one
 * of the concept's two registered misconceptions (A = first, B = second in `englishAdultMisconceptionIds.ts`). Option lengths are balanced (the correct
 * answer is the uniquely longest option in about a third of the cards, as chance would give), like the earlier card-depth batches.
 */
import type { SeedProbe } from './brainSeedAssets'
import { adultCard } from './englishAdultCard'

export const ENGLISH_CARD_DEPTH_BATCH_41: SeedProbe[] = [
  // writing.handwriting-and-formation
  //   A: MC-ANY-STROKE-ORDER-WORKS
  //   B: MC-SIZE-AND-BASELINE-DONT-MATTER
  adultCard("eng.writing.handwriting-and-formation",
    "An adult learner forms each letter with a backward stroke sequence that gives a passable shape when she writes slowly, and lets letter sizes wander above and below the line. She says the finished letters look fine. Which statement is accurate?",
    "The look of the finished letter and the motor process are separately assessable: an inefficient stroke order shows up in speed and fatigue, and consistent size and baseline alignment matter for legibility",
    "Any stroke order works, since the finished letter looks fine",
    "Size and baseline do not matter, since the letters are still recognizable",
    "process and outcome are separate; size and baseline matter"),
  // writing.narrative-writing
  //   A: MC-A-GOOD-NARRATIVE-JUST-LISTS-EVERYTHING-THAT-HAPPENED-IN-ORDER
  //   B: MC-DIALOGUE-IS-JUST-DECORATION-AND-CAN-BE-SUMMARIZED-INSTEAD
  adultCard("eng.writing.narrative-writing",
    "A manager writes a short story about a hard negotiation: she lists every call in time order with equal detail and summarizes the key exchange as \"they argued about the price\". What revision fits narrative writing?",
    "Slow down on the one or two moments that matter, developing them with sensory detail and the actual words spoken, and compress the rest",
    "Keep listing everything that happened in order, since a good narrative just lists the events, one after another, in full, with the same weight for each call",
    "Keep the summary, since dialogue is decoration and can be summarized instead",
    "selective development; dialogue does work"),
  // writing.outlining-and-planning
  //   A: MC-AN-OUTLINE-MUST-BE-A-RIGID-FORMAL-ROMAN-NUMERAL-LIST
  //   B: MC-ONCE-AN-OUTLINE-IS-MADE-IT-CANT-BE-CHANGED-DURING-DRAFTING
  adultCard("eng.writing.outlining-and-planning",
    "Before writing a ten-page guide, a writer sketches a mind map of her ideas grouped by topic, and halfway through drafting sees a better order. Her coach says a mind map is not a real outline and she must keep the original order. Which statement is accurate?",
    "A mind map with logical grouping counts as planning, and an outline is a working plan that can change if a better organization appears",
    "The coach is right that an outline must be a rigid formal Roman-numeral list, so a mind map does not count as an outline or as real planning at all",
    "The coach is right that once an outline is made it cannot be changed during drafting",
    "outline formats vary; outlines can change"),
  // writing.paragraph-structure
  //   A: MC-A-PARAGRAPH-IS-JUST-A-GROUP-OF-SENTENCES-ABOUT-THE-SAME-GENERAL-TOPIC
  //   B: MC-A-TOPIC-SENTENCE-MUST-ALWAYS-BE-THE-FIRST-SENTENCE
  adultCard("eng.writing.paragraph-structure",
    "A paragraph has five sentences about \"the library\": one on its opening hours, one on its roof, one on a book sale, one on its founder and one on parking. A student says it is a paragraph because all are about the library, and that a topic sentence would have to be first. Which statement is accurate?",
    "A paragraph needs one controlling idea that every sentence supports, not just a shared broad topic; and a topic sentence can sit elsewhere, such as in the middle or at the end",
    "It is already a good paragraph, because a paragraph is just a group of sentences about the same general topic",
    "A topic sentence must always be the first sentence, so it could only work at the start",
    "one controlling idea; topic sentence position varies"),
  // writing.persuasive-writing-basics
  //   A: MC-A-STATING-AN-OPINION-FORCEFULLY-OR-WITH-STRONG-LANGUAGE-MAKES-IT-PERSUASIVE
  //   B: MC-B-RESTATING-A-PERSONAL-PREFERENCE-COUNTS-AS-A-REASON
  adultCard("eng.writing.persuasive-writing-basics",
    "A proposal for a new printer says, \"We MUST buy this printer!!! It is clearly the only sensible choice, and I just prefer it.\" Which statement is accurate?",
    "Intensity does not persuade; the proposal needs specific reasons, such as cost and speed, and a personal preference is not a reason",
    "Strong, forceful language makes the opinion persuasive, so the capitals and exclamation marks are exactly what the proposal needs to convince the reader",
    "\"I just prefer it\" is a valid reason, since restating a personal preference counts as a reason",
    "reasons persuade, not force or preference"),
  // writing.revising-for-content
  //   A: MC-A-DRAFT-WITH-ENOUGH-WORDS-OR-PARAGRAPHS-DOESNT-NEED-CONTENT-REVISION
  //   B: MC-REVISING-MEANS-FIXING-SURFACE-ERRORS-LIKE-SPELLING-AND-GRAMMAR
  adultCard("eng.writing.revising-for-content",
    "A student's 1,500-word essay has flawless spelling, but its second half argues the opposite of its first. She spends her review fixing commas and says it is long enough that it needs no content revision. Which statement is accurate?",
    "Revising for content means reconsidering the argument, organization and evidence, such as resolving the contradiction; commas belong to editing, and length does not show the content is sound",
    "It needs no content revision, because a draft with enough words or sections does not need it",
    "Her review pass is revision, because revising means fixing surface errors like spelling and grammar",
    "revising is content; length is not soundness"),
  // writing.sentence-writing
  //   A: MC-A-SENTENCE-IS-COMPLETE-AS-LONG-AS-IT-HAS-A-CAPITAL-LETTER-AND-A-PERIOD
  //   B: MC-LONGER-SENTENCES-ARE-ALWAYS-BETTER-WRITING
  adultCard("eng.writing.sentence-writing",
    "A report contains \"Hoping to finish by Friday.\" and a 60-word sentence with six clauses that readers find hard to follow. A writer says the first is complete because it has a capital letter and a period, and that the longer sentence is better. Which statement is accurate?",
    "The first lacks a subject and a complete thought, so it is a fragment despite its capital and period; longer is not automatically better",
    "The first is a complete sentence, because a capital letter and a period make a sentence complete, whatever words it contains or leaves out of the clause",
    "The 60-word sentence is better writing, since longer sentences are always better",
    "completeness is subject-verb pair and thought; longer is not better"),
  // writing.spelling-strategies
  //   A: MC-SOUNDING-OUT-ALWAYS-GIVES-CORRECT-SPELLING
  //   B: MC-SPELLING-IS-PURE-MEMORIZATION
  adultCard("eng.writing.spelling-strategies",
    "A trainee spells \"unnatural\" as \"unatural\" after sounding it out, and says spelling is pure memorization with no useful patterns. Which statement is accurate?",
    "Spelling uses pattern knowledge such as word parts: \"unnatural\" is un- plus \"natural\", so both n's stay; sounding out alone is not enough",
    "Sounding out gives the correct spelling, so \"unatural\" is right, because it matches the way the word sounds when said aloud, which is all a speller needs",
    "Spelling is pure memorization, with no useful patterns to apply",
    "spelling uses patterns and word parts; sounding out is not enough"),
  // writing.supporting-details
  //   A: MC-ANY-TRUE-STATEMENT-ABOUT-THE-TOPIC-COUNTS-AS-A-SUPPORTING-DETAIL
  //   B: MC-MORE-SUPPORTING-DETAILS-ALWAYS-MAKES-A-PARAGRAPH-STRONGER
  adultCard("eng.writing.supporting-details",
    "A paragraph argues \"The new app cut booking time.\" It adds that the app was designed in two countries, that the company has 300 employees, and ten more true facts about the company. Which statement is accurate?",
    "A supporting detail must develop the specific claim, such as how long booking took before and after; true company facts do not support it, and extra details that do not match the claim weaken the paragraph",
    "The design and size facts are supporting details, since any true statement about the topic counts",
    "Adding more details always makes the paragraph stronger, so the extra facts help",
    "claim-match test; more details do not mean stronger"),
  // writing.the-writing-process
  //   A: MC-EDITING-AND-REVISING-ARE-THE-SAME-THING
  //   B: MC-GOOD-WRITERS-PRODUCE-A-FINISHED-PIECE-IN-ONE-PASS
  adultCard("eng.writing.the-writing-process",
    "A new analyst writes a newsletter article in one sitting, spends five minutes correcting typos, and concludes she has revised and finished it, as experienced writers do in one pass. Which statement is accurate?",
    "Skilled writers draft, revise for content and then edit in separate passes; fixing typos is editing, not revising, and a polished piece is rarely finished in one pass",
    "She has revised it, because editing and revising are the same thing",
    "She is right that good writers produce a finished piece in one pass, since skilled writers rarely need to draft, revise or edit again after a first attempt at writing the piece",
    "multi-pass process; revising differs from editing"),
  // writing.thesis-statements
  //   A: MC-A-THESIS-IS-JUST-THE-TOPIC-ANNOUNCEMENT
  //   B: MC-B-THESIS-JUST-NEEDS-TO-BE-AN-OPINION
  adultCard("eng.writing.thesis-statements",
    "For an essay on public libraries, a student proposes the thesis \"This essay discusses public libraries\" and a friend proposes \"Libraries are great.\" Which statement is accurate?",
    "Neither works: the first only announces the topic and the second is a bare opinion; a thesis makes a specific, arguable claim the essay will support, such as that libraries remain worth funding because they serve people with no home internet",
    "The first works, because a thesis is just an announcement of the topic",
    "The second works, because a thesis just needs to be an opinion",
    "thesis is a specific arguable claim"),
  // writing.topic-sentences
  //   A: MC-A-TOPIC-SENTENCE-JUST-ANNOUNCES-THE-TOPIC-RATHER-THAN-MAKING-A-CLAIM
  //   B: MC-A-TOPIC-SENTENCE-MUST-BE-VERY-GENERAL-AND-VAGUE-TO-COVER-EVERYTHING
  adultCard("eng.writing.topic-sentences",
    "A paragraph about a town festival opens \"This paragraph is about the festival.\" An editor suggests widening it to \"Festivals involve many things\" so that it covers every sentence. Which statement is accurate?",
    "A topic sentence states a specific, developable claim, such as that the festival brings local shops steady business, rather than announcing a topic or being so general that it says nothing",
    "The opening is fine, since a topic sentence just announces the topic",
    "The editor is right that a topic sentence must be very general and vague to cover everything, so \"Festivals involve many things\" is ideal for a paragraph that covers every sentence about the festival",
    "specific, developable claim; not announcement, not vague"),
  // writing.transitions-and-cohesion
  //   A: MC-ANY-TRANSITION-WORD-CAN-BE-INSERTED-ANYWHERE-TO-IMPROVE-FLOW
  //   B: MC-COHESION-ONLY-HAPPENS-AT-THE-BEGINNING-OF-SENTENCES-WITH-TRANSITION-WORDS
  adultCard("eng.writing.transitions-and-cohesion",
    "A writer inserts \"However\" before \"The new schedule saved two hours a week\", which follows praise for the schedule, and believes cohesion comes only from transition words at the start of sentences. Which statement is accurate?",
    "\"However\" signals contrast, so it misrepresents a sentence that adds to the praise; a transition must match the logical relationship, and cohesion also comes from repeated key words, pronouns and sentence order",
    "\"However\" is fine there, because any transition word can be inserted anywhere to improve flow",
    "Cohesion only happens at the beginning of sentences through transition words, so nothing else links sentences",
    "transitions signal specific relationships; cohesion has other means"),
]
