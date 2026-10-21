/**
 * ENGLISH ADULT-BAND CARD-DEPTH — Batch 32 (10 cards, one per (concept, ADULT) pair). Why this exists, what a card is and the P-10 slot rule: see
 * `englishAdultCard.ts`. A new 3-option `fill_blank` card takes each pair from four gradeable probes to five; each wrong answer carries the id of one
 * of the concept's two registered misconceptions (A = first, B = second in `englishAdultMisconceptionIds.ts`). Option lengths are balanced (the correct
 * answer is the uniquely longest option in about a third of the cards, as chance would give), like the earlier card-depth batches.
 */
import type { SeedProbe } from './brainSeedAssets'
import { adultCard } from './englishAdultCard'

export const ENGLISH_CARD_DEPTH_BATCH_32: SeedProbe[] = [
  // literature.metaphor-and-simile
  //   A: MC-ANY-COMPARISON-USING-LIKE-OR-AS-IS-A-SIMILE
  //   B: MC-THE-ONLY-DIFFERENCE-BETWEEN-METAPHOR-AND-SIMILE-IS-THE-WORD-LIKE-OR-AS
  adultCard("eng.literature.metaphor-and-simile",
    "Which analysis is correct? (1) \"She ran like her brother did, with long strides.\" (2) \"Time is a thief\" compared with \"time slips by like sand\".",
    "Sentence 1 is a literal comparison, not a simile; \"time is a thief\" is a bold metaphor and \"time slips by like sand\" a softer simile",
    "Sentence 1 is a simile, because any comparison using \"like\" or \"as\" is a simile",
    "\"Time is a thief\" and \"time slips by like sand\" are the same device, since the only difference between a metaphor and a simile is the word \"like\" or \"as\"",
    "a simile needs a figurative comparison; metaphor and simile do different work"),
  // literature.meter-and-rhyme
  //   A: MC-A-A-POEM-THAT-RHYMES-MUST-ALSO-HAVE-A-REGULAR-CONSISTENT-METER
  //   B: MC-B-ANY-DEVIATION-FROM-THE-DOMINANT-STRESS-PATTERN-MEANS-THE-POEM-HAS-NO-METE
  adultCard("eng.literature.meter-and-rhyme",
    "A poem has no rhyme at all, but nearly every line follows the same stress pattern, with one line reversed for emphasis. Which statement is correct?",
    "It has a regular meter with one acceptable variation; rhyme and meter are separate, and one deviation does not erase the pattern",
    "It cannot have a regular meter, because a poem must rhyme to have a consistent meter, and this poem has no rhyme at all, so its stress pattern is accidental",
    "It has no meter at all, because one line deviates from the dominant stress pattern",
    "rhyme and meter are independent; meter is the dominant pattern"),
  // literature.narrative-elements
  //   A: MC-PLOT-MEANS-EVERYTHING-THAT-HAPPENS-IN-THE-STORY
  //   B: MC-SETTING-IS-JUST-WHERE-AND-WHEN-A-STORY-HAPPENS-WITH-NO-OTHER-EFFECT
  adultCard("eng.literature.narrative-elements",
    "In a story about a nurse handling a hospital emergency, the narrator also mentions what she had for breakfast, and the whole story takes place during a power cut at night. Which statement is correct?",
    "The breakfast is texture, not plot, since plot is the causally connected chain of events driving the conflict; the night-time power cut is setting that heightens the tension, not just a backdrop",
    "The breakfast is part of the plot, because plot means everything that happens in the story",
    "The power cut is only where and when the story happens, with no other effect on the story",
    "plot is the causal chain; setting does work"),
  // literature.novel-study
  //   A: MC-A-A-NOVEL-IS-JUST-A-SHORT-STORY-STRETCHED-OUT-WITH-MORE-WORDS
  //   B: MC-B-A-NOVELS-THEME-CAN-BE-FULLY-UNDERSTOOD-FROM-ANY-SINGLE-PASSAGE-OR-CHAPTER
  adultCard("eng.literature.novel-study",
    "Reading a novel, a student meets a long subplot about a minor character and, after chapter 2, writes down the book's theme. Which approach is sounder?",
    "Ask what the subplot contributes that a compressed form could not, and trace the theme across the whole novel, not one chapter",
    "Treat the subplot as padding, since a novel is just a short story stretched out with more words added to fill the pages and make it longer",
    "Record the theme now, since a novel's theme can be fully understood from any single chapter",
    "novel form allows subplots; theme builds across the work"),
  // literature.plot-structure
  //   A: MC-EVERY-STORY-FOLLOWS-THE-FIVE-STAGES-IN-EQUAL-PROPORTION
  //   B: MC-THE-CLIMAX-IS-JUST-THE-MOST-EXCITING-OR-ACTION-PACKED-MOMENT
  adultCard("eng.literature.plot-structure",
    "A story spends most of its length on mounting complications and ends with one short paragraph of resolution; its decisive moment is a quiet conversation. Which statement is correct?",
    "The quiet conversation can be the climax because it decides the conflict; uneven proportions are normal, since structure is order and function",
    "The story is flawed, because every story follows the five stages in equal proportion",
    "The climax must be an earlier, louder chase scene, because the climax is just the most exciting or action-packed moment in the whole story, and a quiet scene cannot be one",
    "climax is the turning point; stages need not be equal"),
  // literature.poetic-forms
  //   A: MC-A-A-POEMS-FORM-IS-JUST-A-LABEL-WITH-NO-EFFECT-ON-MEANING
  //   B: MC-B-FREE-VERSE-HAS-NO-FORM-OR-RULES-AT-ALL-SO-ITS-NOT-REALLY-CRAFTED
  adultCard("eng.literature.poetic-forms",
    "A student labels a poem \"a sonnet\" and stops there. Another dismisses a free verse poem as \"not really crafted\" because it has no fixed pattern. What is the better analysis?",
    "Naming the sonnet is only a first step: ask what its structure lets the poem do; and free verse has real form through deliberate line breaks",
    "The sonnet label is enough, because a poem's form is just a label with no effect on meaning",
    "The second student is right, because free verse has no fixed form or rules at all, so it is not really crafted and needs no analysis of its form",
    "form shapes meaning; free verse is crafted"),
  // literature.poetry-basics
  //   A: MC-ALL-POETRY-MUST-RHYME-AND-HAVE-A-STRICT-METER
  //   B: MC-POETRY-IS-JUST-PROSE-WRITTEN-WITH-LINE-BREAKS-IN-RANDOM-PLACES
  adultCard("eng.literature.poetry-basics",
    "A poem reads \"I am not / the one who / left\" over three short lines, with no rhyme and no fixed meter. A reader says it is just a sentence chopped into random lines and so is not really poetry. How should it be judged?",
    "Line breaks are deliberate choices that create emphasis and pacing, and poetry needs no rhyme or regular meter, so it can be real poetry",
    "It is not poetry, because all poetry must rhyme and have a strict meter",
    "The reader is right that it is prose with line breaks placed in random spots, since line breaks in poetry are arbitrary and carry no particular effect",
    "line breaks are deliberate; rhyme and meter are optional"),
  // literature.point-of-view
  //   A: MC-A-A-FIRST-PERSON-NARRATOR-ALWAYS-TELLS-THE-COMPLETE-UNBIASED-TRUTH-ABOUT-EV
  //   B: MC-B-THIRD-PERSON-OMNISCIENT-AND-THIRD-PERSON-LIMITED-ARE-BASICALLY-THE-SAME-T
  adultCard("eng.literature.point-of-view",
    "A story told in first person by a shopkeeper says \"I have never once cheated a customer\" while describing a scale she secretly weighted. Another version lets the narrator see into every character's mind. Which analysis is correct?",
    "The first-person account is not automatically reliable, so a careful reader notices the contradicting detail; omniscient narration, unlike limited narration, can enter every character's mind",
    "The shopkeeper's account must be the complete, unbiased truth, since a first-person narrator always tells the whole truth",
    "The second version is third-person limited, because omniscient and limited narration are basically the same thing",
    "first-person is not automatically reliable; omniscient differs from limited"),
  // literature.prose-fiction
  //   A: MC-A-SHORT-STORY-IS-JUST-A-SHORTER-VERSION-OF-A-NOVEL
  //   B: MC-PROSE-FICTION-MUST-ALWAYS-BE-COMPLETELY-REALISTIC-TO-BE-GOOD
  adultCard("eng.literature.prose-fiction",
    "A reader calls a 1,200-word story \"a novel that ran out of room\", and adds that its house slowly filling with water as the narrator grieves is a flaw because prose fiction must be realistic. What is the better view?",
    "The story is a short story, a distinct form built around one unified effect, and the flooding house is a non-realistic device that carries the grief, so neither complaint shows a flaw",
    "The story is just a shorter version of a novel, so it is incomplete without a novel's subplots and cast",
    "Prose fiction must always be completely realistic to be good, so the flooding house is a flaw",
    "short story is its own form; fiction need not be realistic"),
  // literature.prose-nonfiction
  //   A: MC-A-NONFICTION-MEANS-PURELY-OBJECTIVE-NEUTRAL-FACT-REPORTING-WITH-NO-AUTHOR-V
  //   B: MC-B-ALL-NONFICTION-SUBGENRES-ESSAY-MEMOIR-BIOGRAPHY-JOURNALISM-ARE-BASICALLY-
  adultCard("eng.literature.prose-nonfiction",
    "A reader says a memoir about caring for a parent is not nonfiction because it has a strong personal voice and chooses which days to include, and expects a biography of a scientist to read just like it. What is the better view?",
    "Nonfiction rests on a factual basis, not on the absence of voice and selection, and memoir and biography have different conventions",
    "The memoir cannot be nonfiction, since nonfiction means purely objective, neutral reporting with no author voice, selection or interpretation at all",
    "The biography should read like the memoir, since all nonfiction subgenres are basically the same thing",
    "nonfiction is not voiceless; subgenres differ"),
]
