/**
 * ENGLISH CARD-DEPTH CAMPAIGN — Batch 14 (eng.writing part 1, 30 cards).
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
 * slug and abandon the live row's identity. Each writing concept already uses native band : mcq, misconception_probe, checkpoint, true_false and ADULT : mcq, misconception_probe, so the three new cards take the FREE slots native band : short_answer, fill_blank and ADULT : checkpoint (native band is HIGH for citations-and-referencing, creative-writing-forms and essay-structure, MIDDLE for the rest).
 * Serving never filters by probeKind (`probeToMcq` is the predicate), so the kind is
 * only a slot label.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedProbe } from './brainSeedAssets'

const S = 'english'
const M = GradeBand.MIDDLE
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


export const ENGLISH_CARD_DEPTH_BATCH_14: SeedProbe[] = [
  // ─── eng.writing.citations-and-referencing ───────────────────────────────
  card('eng.writing.citations-and-referencing', 'short_answer', H,
    'A student writes, in her own words, "Tropical forests absorb about a quarter of the carbon dioxide people emit", with no source. Her teacher asks for a citation, but she says only direct quotes need one, and that any cited claim must be true. What is accurate?',
    'A paraphrased statistic still needs a citation, which shows origin, not truth',
    ['No citation is needed, because she used her own words instead of quoting', 'MC-A-ONLY-DIRECT-QUOTES-NEED-CITATION'],
    ['Once cited, the claim is automatically true, so checking the source\'s quality is unnecessary', 'MC-B-CITING-A-SOURCE-MEANS-THE-INFORMATION-IS-AUTOMATICALLY-TRUE-OR-GOOD-EVIDENCE'],
    'paraphrase needs a citation; a citation is provenance, not proof; re-asked with a forest statistic'),
  card('eng.writing.citations-and-referencing', 'fill_blank', H,
    'Complete the sentence: a citation tells the reader ____.',
    'where a fact or idea came from, so they can judge its quality',
    ['which words were quoted directly, since only direct quotes need one', 'MC-A-ONLY-DIRECT-QUOTES-NEED-CITATION'],
    ['that the claim is true, because a cited source is automatically reliable', 'MC-B-CITING-A-SOURCE-MEANS-THE-INFORMATION-IS-AUTOMATICALLY-TRUE-OR-GOOD-EVIDENCE'],
    'Replacement texts for both misconceptions'),
  card('eng.writing.citations-and-referencing', 'checkpoint', A,
    'A manager\'s slide deck states, in her own words, a market-share figure taken from an industry report, with no source. A colleague says paraphrased figures need no citation, and that naming the report would make the figure certainly correct. Which assessment is accurate?',
    'Paraphrased figures need a citation, and a named source still needs its quality checked',
    ['He is right: only direct quotes need a citation', 'MC-A-ONLY-DIRECT-QUOTES-NEED-CITATION'],
    ['He is right: naming a source makes a figure certainly correct and removes any need to check it', 'MC-B-CITING-A-SOURCE-MEANS-THE-INFORMATION-IS-AUTOMATICALLY-TRUE-OR-GOOD-EVIDENCE'],
    'both misconceptions, with a market-share figure'),

  // ─── eng.writing.creative-writing-forms ──────────────────────────────────
  card('eng.writing.creative-writing-forms', 'short_answer', H,
    'A student pastes a paragraph of prose into a poem and calls it done, saying free verse has no rules. Her friend turns a slow 3,000-word short story into a screenplay without changing it. What is accurate?',
    'Free verse still depends on line breaks and imagery, and a story must be reshaped',
    ['Free verse has no constraints at all, so pasted prose already counts as a poem', 'MC-A-A-CREATIVE-FORM-LIKE-FLASH-FICTION-OR-FREE-VERSE-HAS-NO-RULES-OR-CONSTRAINTS'],
    ['The story can move into a screenplay unchanged, since the same structure works equally well in every form', 'MC-B-THE-SAME-CONTENT-AND-STRUCTURE-WORKS-EQUALLY-WELL-IN-ANY-CREATIVE-FORM'],
    'forms have conventions; content is reshaped per form, re-asked with free verse and a screenplay'),
  card('eng.writing.creative-writing-forms', 'fill_blank', H,
    'Complete the sentence: when you move into a new creative form, ____.',
    'learn its conventions and reshape the content to suit them',
    ['assume it has no rules, so anything you write counts', 'MC-A-A-CREATIVE-FORM-LIKE-FLASH-FICTION-OR-FREE-VERSE-HAS-NO-RULES-OR-CONSTRAINTS'],
    ['keep the same content and structure, since it works equally well in any form', 'MC-B-THE-SAME-CONTENT-AND-STRUCTURE-WORKS-EQUALLY-WELL-IN-ANY-CREATIVE-FORM'],
    'Replacement texts for both misconceptions'),
  card('eng.writing.creative-writing-forms', 'checkpoint', A,
    'A writer enters a six-word-story contest with a 400-word scene. She says the form has no real constraints and plans to reuse her novel chapter\'s slow build-up as it is. Which assessment is accurate?',
    'Six words is a hard limit, so the story must be rebuilt around one implied moment',
    ['She is right: creative forms like this have no rules to follow', 'MC-A-A-CREATIVE-FORM-LIKE-FLASH-FICTION-OR-FREE-VERSE-HAS-NO-RULES-OR-CONSTRAINTS'],
    ['She is right: a slow novel build-up works equally well in any form, including this one', 'MC-B-THE-SAME-CONTENT-AND-STRUCTURE-WORKS-EQUALLY-WELL-IN-ANY-CREATIVE-FORM'],
    'both misconceptions, with a six-word story'),

  // ─── eng.writing.descriptive-writing ─────────────────────────────────────
  card('eng.writing.descriptive-writing', 'short_answer', M,
    'A student writes "The wet, soggy, damp, drenched street was dark, gloomy, grey and dull." He says more adjectives always make a description more vivid, and that describing only what he can see is enough. What is accurate?',
    'One precise detail, like rain on a bus shelter, and other senses beat stacked adjectives',
    ['Adding even more adjectives, such as "sodden" and "murky", would make it more vivid still', 'MC-MORE-ADJECTIVES-ALWAYS-MAKES-DESCRIPTION-MORE-VIVID'],
    ['Sight alone is enough, because description relies only on what the eye sees', 'MC-DESCRIPTIVE-WRITING-ONLY-USES-VISUAL-SIGHT-DETAILS'],
    'precise detail over stacked adjectives; several senses, re-asked with a rainy street'),
  card('eng.writing.descriptive-writing', 'fill_blank', M,
    'Complete the sentence: vivid description comes from ____.',
    'precise details drawn from several senses',
    ['piling up as many adjectives as possible on the subject', 'MC-MORE-ADJECTIVES-ALWAYS-MAKES-DESCRIPTION-MORE-VIVID'],
    ['describing only what can be seen by the eye', 'MC-DESCRIPTIVE-WRITING-ONLY-USES-VISUAL-SIGHT-DETAILS'],
    'Replacement texts for both misconceptions'),
  card('eng.writing.descriptive-writing', 'checkpoint', A,
    'A hotel brochure calls its lobby "a lovely, beautiful, elegant, stunning, gorgeous space". The reviewer wants even more adjectives and no mention of sound or scent. Which assessment is accurate?',
    'Swap the stack for one concrete detail, like cedar scent, and use more than sight',
    ['She is right: more adjectives always make a description more vivid, so add several more', 'MC-MORE-ADJECTIVES-ALWAYS-MAKES-DESCRIPTION-MORE-VIVID'],
    ['She is right: descriptions rely on sight details only', 'MC-DESCRIPTIVE-WRITING-ONLY-USES-VISUAL-SIGHT-DETAILS'],
    'both misconceptions, with a hotel lobby'),

  // ─── eng.writing.drafting ────────────────────────────────────────────────
  card('eng.writing.drafting', 'short_answer', M,
    'While drafting a story, you cannot remember the name of a character you invented earlier, and your opening paragraph feels weak. A friend says to stop and fix every gap right now, and to stop writing until the opening is perfect. What is the best advice?',
    'Mark the gap, such as [NAME?], and keep drafting; polish when you revise',
    ['Stop and fix every gap right away, so that the draft is error-free as you go', 'MC-YOU-MUST-STOP-AND-FIX-EVERY-ERROR-DURING-DRAFTING'],
    ['Stop drafting until you know exactly what the opening should say', 'MC-IF-YOU-GET-STUCK-YOU-SHOULD-STOP-DRAFTING-UNTIL-YOU-KNOW-EXACTLY-WHAT-TO-WRITE'],
    'placeholders keep drafting moving; re-asked with a forgotten name and a weak opening'),
  card('eng.writing.drafting', 'fill_blank', M,
    'Complete the sentence: when you hit a snag while drafting, ____.',
    'leave a quick note or placeholder and keep writing',
    ['stop and repair it before you write another sentence', 'MC-YOU-MUST-STOP-AND-FIX-EVERY-ERROR-DURING-DRAFTING'],
    ['pause the draft until you know exactly what to write', 'MC-IF-YOU-GET-STUCK-YOU-SHOULD-STOP-DRAFTING-UNTIL-YOU-KNOW-EXACTLY-WHAT-TO-WRITE'],
    'Replacement texts for both misconceptions'),
  card('eng.writing.drafting', 'checkpoint', A,
    'Drafting a grant proposal, a writer cannot recall a funding figure, and the budget section feels shaky. She stops to chase the figure and refuses to continue until the budget wording is exact. Which assessment is accurate?',
    'Insert a placeholder like [FIGURE], move on, and return to the budget later',
    ['She is right to stop and fix every gap as it appears, so the draft stays accurate', 'MC-YOU-MUST-STOP-AND-FIX-EVERY-ERROR-DURING-DRAFTING'],
    ['She is right to stop writing until she knows exactly what to write', 'MC-IF-YOU-GET-STUCK-YOU-SHOULD-STOP-DRAFTING-UNTIL-YOU-KNOW-EXACTLY-WHAT-TO-WRITE'],
    'both misconceptions, with a grant proposal'),

  // ─── eng.writing.editing-and-proofreading ────────────────────────────────
  card('eng.writing.editing-and-proofreading', 'short_answer', M,
    'A student writes "We where happy to loose the contest", and the spell-checker shows no errors. He reads the paragraph silently once and calls it clean. What is accurate?',
    '"Where" and "loose" are real words, so the checker misses them; reading aloud slowly would catch both',
    ['One silent read is enough to catch every error, so it is clean', 'MC-PROOFREADING-BY-READING-SILENTLY-ONCE-CATCHES-ALL-ERRORS'],
    ['The spell-checker catches every error, so the sentence must be correct', 'MC-SPELL-CHECK-AND-GRAMMAR-CHECK-TOOLS-CATCH-EVERY-ERROR'],
    'real-word errors escape tools and a single silent read, re-asked with where/were and loose/lose'),
  card('eng.writing.editing-and-proofreading', 'fill_blank', M,
    'Complete the sentence: to proofread well, ____.',
    'use tools first, then read slowly aloud yourself',
    ['read it through silently once at normal speed', 'MC-PROOFREADING-BY-READING-SILENTLY-ONCE-CATCHES-ALL-ERRORS'],
    ['trust spell-check and grammar-check to catch every error', 'MC-SPELL-CHECK-AND-GRAMMAR-CHECK-TOOLS-CATCH-EVERY-ERROR'],
    'Replacement texts for both misconceptions'),
  card('eng.writing.editing-and-proofreading', 'checkpoint', A,
    'An employee emails a client "Please send the principle contact\'s phone number" after one quick silent read and a clean spell-check. He says both steps catch everything. Which assessment is accurate?',
    'Tools miss real words used wrongly, like "principle" for "principal"; slow, aloud proofreading adds a real check',
    ['He is right: one quick silent read catches every error', 'MC-PROOFREADING-BY-READING-SILENTLY-ONCE-CATCHES-ALL-ERRORS'],
    ['He is right: spell-check and grammar-check catch every error', 'MC-SPELL-CHECK-AND-GRAMMAR-CHECK-TOOLS-CATCH-EVERY-ERROR'],
    'both misconceptions, with principle/principal'),

  // ─── eng.writing.essay-structure ─────────────────────────────────────────
  card('eng.writing.essay-structure', 'short_answer', H,
    'An essay opens "Today I am going to talk about school uniforms" and ends with that same line copied exactly. A student says the opening is a good introduction and the copied line makes a good conclusion. What is accurate?',
    'The opening only names a topic, not a position; the conclusion should synthesise',
    ['The opening is fine, because an introduction simply announces the topic', 'MC-THE-INTRODUCTION-JUST-ANNOUNCES-THE-TOPIC-THE-WAY-A-PARAGRAPHS-TOPIC-SENTENCE-DOES'],
    ['Copying the opening makes a strong conclusion, since it restates the thesis word for word', 'MC-THE-CONCLUSION-JUST-REPEATS-THE-INTRODUCTION-WORD-FOR-WORD'],
    'an introduction takes a position; a conclusion synthesises, re-asked with school uniforms'),
  card('eng.writing.essay-structure', 'fill_blank', H,
    'Complete the sentence: a strong introduction ____.',
    'gives a specific position the essay will argue, not just the topic',
    ['announces the topic, as a paragraph\'s topic sentence does', 'MC-THE-INTRODUCTION-JUST-ANNOUNCES-THE-TOPIC-THE-WAY-A-PARAGRAPHS-TOPIC-SENTENCE-DOES'],
    ['is copied word for word into the conclusion', 'MC-THE-CONCLUSION-JUST-REPEATS-THE-INTRODUCTION-WORD-FOR-WORD'],
    'Replacement texts for both misconceptions'),
  card('eng.writing.essay-structure', 'checkpoint', A,
    'A report opens "This report is about employee retention" and ends by repeating that sentence word for word. A reviewer says the opening is a proper introduction and the repeat is the best conclusion. Which assessment is accurate?',
    'The opening names a topic without a position, and the conclusion should synthesise',
    ['She is right: an introduction only needs to announce the topic', 'MC-THE-INTRODUCTION-JUST-ANNOUNCES-THE-TOPIC-THE-WAY-A-PARAGRAPHS-TOPIC-SENTENCE-DOES'],
    ['She is right: repeating the introduction word for word is the best conclusion for a report', 'MC-THE-CONCLUSION-JUST-REPEATS-THE-INTRODUCTION-WORD-FOR-WORD'],
    'both misconceptions, with a retention report'),

  // ─── eng.writing.expository-writing ──────────────────────────────────────
  card('eng.writing.expository-writing', 'short_answer', M,
    'A student writes "Tides are the rise and fall of the sea" and adds "I think tides are the most beautiful part of the ocean." She says opinions belong in explanatory writing and that the definition alone explains tides. What is accurate?',
    'Explanatory writing sticks to facts, and a definition needs a cause or example',
    ['Her opinion belongs, since explanatory writing means giving your view of the topic', 'MC-EXPOSITORY-WRITING-MEANS-STATING-YOUR-OPINION-ABOUT-THE-TOPIC'],
    ['The definition alone is enough to explain tides to someone new', 'MC-A-DEFINITION-OR-FACT-ALONE-IS-ENOUGH-TO-EXPLAIN-A-COMPLEX-TOPIC'],
    'objective facts plus example or cause, re-asked with tides'),
  card('eng.writing.expository-writing', 'fill_blank', M,
    'Complete the sentence: expository writing ____.',
    'explains facts objectively, with examples where a definition is not enough',
    ['states the writer\'s own opinion about the topic', 'MC-EXPOSITORY-WRITING-MEANS-STATING-YOUR-OPINION-ABOUT-THE-TOPIC'],
    ['gives a definition and stops, since a definition alone explains any topic fully', 'MC-A-DEFINITION-OR-FACT-ALONE-IS-ENOUGH-TO-EXPLAIN-A-COMPLEX-TOPIC'],
    'Replacement texts for both misconceptions'),
  card('eng.writing.expository-writing', 'checkpoint', A,
    'A guide on how a mortgage works says "A mortgage is a loan for buying property", then adds "Mortgages are a great idea for everyone." The editor says the definition explains the topic fully and the opinion makes it expository. Which assessment is accurate?',
    'The opinion does not belong, and a worked example of repayments is needed to explain the topic',
    ['She is right: expository writing should include the writer\'s opinion', 'MC-EXPOSITORY-WRITING-MEANS-STATING-YOUR-OPINION-ABOUT-THE-TOPIC'],
    ['She is right: that definition alone fully explains how a mortgage works', 'MC-A-DEFINITION-OR-FACT-ALONE-IS-ENOUGH-TO-EXPLAIN-A-COMPLEX-TOPIC'],
    'both misconceptions, with a mortgage guide'),

  // ─── eng.writing.handwriting-and-formation ───────────────────────────────
  card('eng.writing.handwriting-and-formation', 'short_answer', M,
    'A child forms a lowercase "b" by drawing the circle first, then the stick, and writes it floating above the line at half the size of its neighbours. She says stroke order and size do not matter if it looks right today. What is accurate?',
    'Start with the stick, then the bowl, with the base on the line, so it stays legible',
    ['Any stroke order works, so drawing the circle first is perfectly fine if it looks right', 'MC-ANY-STROKE-ORDER-WORKS'],
    ['Size and baseline don\'t matter, so floating and small is fine', 'MC-SIZE-AND-BASELINE-DONT-MATTER'],
    'stroke order and baseline both matter, re-asked with the letter b'),
  card('eng.writing.handwriting-and-formation', 'fill_blank', M,
    'Complete the sentence: when forming letters by hand, ____.',
    'follow standard stroke order and keep letters on the baseline',
    ['any stroke order works if the letter looks right', 'MC-ANY-STROKE-ORDER-WORKS'],
    ['size and baseline do not matter, as long as the word is readable', 'MC-SIZE-AND-BASELINE-DONT-MATTER'],
    'Replacement texts for both misconceptions'),
  card('eng.writing.handwriting-and-formation', 'checkpoint', A,
    'An adult learner practising handwriting draws every "a" clockwise from the bottom and lets letters drift above and below the line at uneven heights, saying neither matters. Which assessment is accurate?',
    'Use the standard start point and direction, and keep letters on the baseline at consistent heights for fluent, legible writing',
    ['He is right: any stroke order works', 'MC-ANY-STROKE-ORDER-WORKS'],
    ['He is right: size and baseline don\'t matter', 'MC-SIZE-AND-BASELINE-DONT-MATTER'],
    'both misconceptions, with the letter a'),

  // ─── eng.writing.narrative-writing ───────────────────────────────────────
  card('eng.writing.narrative-writing', 'short_answer', M,
    'A student\'s story reads "I got up, ate, walked to the park, found a dog, took it home, and went to bed." At the key moment he writes "We argued and I felt bad" instead of the argument itself. He says a story is everything in order and dialogue is decoration. What is accurate?',
    'Slow down at the key moment with details and real dialogue',
    ['Listing every event in order is what makes a good story', 'MC-A-GOOD-NARRATIVE-JUST-LISTS-EVERYTHING-THAT-HAPPENED-IN-ORDER'],
    ['Summarising the argument is fine, since dialogue is only decoration', 'MC-DIALOGUE-IS-JUST-DECORATION-AND-CAN-BE-SUMMARIZED-INSTEAD'],
    'dwell on key moments; dialogue carries them, re-asked with a lost dog'),
  card('eng.writing.narrative-writing', 'fill_blank', M,
    'Complete the sentence: a strong narrative ____.',
    'slows down at key moments and uses real dialogue',
    ['lists every event in the order it happened', 'MC-A-GOOD-NARRATIVE-JUST-LISTS-EVERYTHING-THAT-HAPPENED-IN-ORDER'],
    ['summarises every conversation, since dialogue only decorates', 'MC-DIALOGUE-IS-JUST-DECORATION-AND-CAN-BE-SUMMARIZED-INSTEAD'],
    'Replacement texts for both misconceptions'),
  card('eng.writing.narrative-writing', 'checkpoint', A,
    'A company-history narrative lists each year\'s events with equal detail and summarises the founders\' key argument as "they disagreed about strategy". An editor calls this complete and says the actual conversation would be mere decoration. Which assessment is accurate?',
    'Dwell on the turning points, and quote the founders\' exchange where it shows character and changes the plot',
    ['She is right: a narrative should list everything in order', 'MC-A-GOOD-NARRATIVE-JUST-LISTS-EVERYTHING-THAT-HAPPENED-IN-ORDER'],
    ['She is right: dialogue is decoration and can be summarised', 'MC-DIALOGUE-IS-JUST-DECORATION-AND-CAN-BE-SUMMARIZED-INSTEAD'],
    'both misconceptions, with a company history'),

  // ─── eng.writing.outlining-and-planning ──────────────────────────────────
  card('eng.writing.outlining-and-planning', 'short_answer', M,
    'A student plans an essay with a quick numbered list. Her friend says a plan counts only in formal I., II., III. format, and that once written it is locked even if drafting shows a better order. What is accurate?',
    'Any format that organises ideas works, and the outline can change as you draft',
    ['A real outline must be a formal Roman-numeral list', 'MC-AN-OUTLINE-MUST-BE-A-RIGID-FORMAL-ROMAN-NUMERAL-LIST'],
    ['Once made, the outline is fixed, whatever drafting shows afterwards about the order', 'MC-ONCE-AN-OUTLINE-IS-MADE-IT-CANT-BE-CHANGED-DURING-DRAFTING'],
    'outline format is flexible and revisable, re-asked with a numbered list'),
  card('eng.writing.outlining-and-planning', 'fill_blank', M,
    'Complete the sentence: an outline is ____.',
    'a flexible plan in any helpful format, updated as drafting teaches you',
    ['a formal Roman-numeral list, or it does not count', 'MC-AN-OUTLINE-MUST-BE-A-RIGID-FORMAL-ROMAN-NUMERAL-LIST'],
    ['a fixed plan that cannot change once drafting starts', 'MC-ONCE-AN-OUTLINE-IS-MADE-IT-CANT-BE-CHANGED-DURING-DRAFTING'],
    'Replacement texts for both misconceptions'),
  card('eng.writing.outlining-and-planning', 'checkpoint', A,
    'A team lead sketches a report plan as a simple flowchart, then finds while drafting that the risks section should come first. A colleague says plans must be Roman-numeral lists and that the flowchart cannot be altered now. Which assessment is accurate?',
    'A flowchart is a valid outline, and moving the risks section up is a sensible revision of the plan',
    ['He is right: only a formal Roman-numeral list is a real outline', 'MC-AN-OUTLINE-MUST-BE-A-RIGID-FORMAL-ROMAN-NUMERAL-LIST'],
    ['He is right: once an outline exists it cannot change during drafting', 'MC-ONCE-AN-OUTLINE-IS-MADE-IT-CANT-BE-CHANGED-DURING-DRAFTING'],
    'both misconceptions, with a flowchart plan'),
]
