/**
 * ENGLISH CARD-DEPTH CAMPAIGN — Batch 15 (eng.writing part 2, 30 cards).
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
 * slug and abandon the live row's identity. Each writing concept already uses native band : mcq, misconception_probe, checkpoint, true_false and ADULT : mcq, misconception_probe, so the three new cards take the FREE slots native band : short_answer, fill_blank and ADULT : checkpoint (native band is HIGH for revising-for-content and thesis-statements, MIDDLE for the rest).
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


export const ENGLISH_CARD_DEPTH_BATCH_15: SeedProbe[] = [
  // ─── eng.writing.paragraph-structure ─────────────────────────────────────
  card('eng.writing.paragraph-structure', 'short_answer', M,
    'A paragraph about the school library holds sentences on its opening hours, a favourite novel, the librarian\'s hobby and the price of printer ink. A student says it is fine because every sentence mentions the library, and that a topic sentence must open every paragraph. What is accurate?',
    'A paragraph needs one controlling idea all sentences support, wherever it sits',
    ['It is fine, since a paragraph is any group of sentences on the same general topic', 'MC-A-PARAGRAPH-IS-JUST-A-GROUP-OF-SENTENCES-ABOUT-THE-SAME-GENERAL-TOPIC'],
    ['The first sentence must always be the topic sentence, wherever the main idea appears', 'MC-A-TOPIC-SENTENCE-MUST-ALWAYS-BE-THE-FIRST-SENTENCE'],
    'one controlling idea, any position, re-asked with a library paragraph'),
  card('eng.writing.paragraph-structure', 'fill_blank', M,
    'Complete the sentence: a paragraph is built around ____.',
    'one controlling idea that every sentence supports',
    ['the same general subject, with any sentence about it allowed', 'MC-A-PARAGRAPH-IS-JUST-A-GROUP-OF-SENTENCES-ABOUT-THE-SAME-GENERAL-TOPIC'],
    ['a topic sentence placed first, with no exceptions', 'MC-A-TOPIC-SENTENCE-MUST-ALWAYS-BE-THE-FIRST-SENTENCE'],
    'Replacement texts for both misconceptions'),
  card('eng.writing.paragraph-structure', 'checkpoint', A,
    'A manager\'s paragraph gives four facts about the new office and ends with its point, "These changes make remote collaboration harder." A reviewer says it is not a proper paragraph because the topic sentence comes last, and that any sentences about the new office would form one. Which assessment is accurate?',
    'A closing topic sentence is valid when every sentence supports it; what matters is one controlling idea',
    ['She is right: the topic sentence must always be the first sentence', 'MC-A-TOPIC-SENTENCE-MUST-ALWAYS-BE-THE-FIRST-SENTENCE'],
    ['She is right: any sentences about the new office would form a paragraph', 'MC-A-PARAGRAPH-IS-JUST-A-GROUP-OF-SENTENCES-ABOUT-THE-SAME-GENERAL-TOPIC'],
    'both misconceptions, with an office paragraph'),

  // ─── eng.writing.persuasive-writing-basics ───────────────────────────────
  card('eng.writing.persuasive-writing-basics', 'short_answer', M,
    'One student argues "Cafeteria food is DISGUSTING! Everybody knows it must change!!" Another argues "The cafeteria should add salad because I like salad." Which statement is accurate?',
    'Neither persuades; a reader needs reasons and evidence',
    ['The first persuades, since forceful language convinces readers', 'MC-A-STATING-AN-OPINION-FORCEFULLY-OR-WITH-STRONG-LANGUAGE-MAKES-IT-PERSUASIVE'],
    ['The second persuades, since a personal preference counts as a reason', 'MC-B-RESTATING-A-PERSONAL-PREFERENCE-COUNTS-AS-A-REASON'],
    'force and preference are not reasons, re-asked with cafeteria food'),
  card('eng.writing.persuasive-writing-basics', 'fill_blank', M,
    'Complete the sentence: a persuasive argument convinces by ____.',
    'giving reasons and evidence a doubter would accept',
    ['using forceful language and repetition to drive the point home', 'MC-A-STATING-AN-OPINION-FORCEFULLY-OR-WITH-STRONG-LANGUAGE-MAKES-IT-PERSUASIVE'],
    ['stating your own preference clearly', 'MC-B-RESTATING-A-PERSONAL-PREFERENCE-COUNTS-AS-A-REASON'],
    'Replacement texts for both misconceptions'),
  card('eng.writing.persuasive-writing-basics', 'checkpoint', A,
    'A pitch to move the team to a four-day week says "This is clearly the ONLY sensible choice!!!" and adds "I personally would love Fridays off." The sponsor calls it compelling for its force and its honesty about preference. Which assessment is accurate?',
    'Force and preference are not reasons; it needs evidence such as trial output data',
    ['She is right: forceful wording makes a pitch persuasive, and capitals add emphasis', 'MC-A-STATING-AN-OPINION-FORCEFULLY-OR-WITH-STRONG-LANGUAGE-MAKES-IT-PERSUASIVE'],
    ['She is right: a personal preference counts as a reason', 'MC-B-RESTATING-A-PERSONAL-PREFERENCE-COUNTS-AS-A-REASON'],
    'both misconceptions, with a four-day-week pitch'),

  // ─── eng.writing.revising-for-content ────────────────────────────────────
  card('eng.writing.revising-for-content', 'short_answer', H,
    'A student\'s 1,500-word essay meets the word count, but its third paragraph contradicts its thesis. He spends the evening fixing commas and says that is revising, and that a draft of the right length needs no content changes. What is accurate?',
    'Revising targets content: fix the contradiction and check the evidence first',
    ['Fixing commas and spelling is revising, so he did the right thing', 'MC-REVISING-MEANS-FIXING-SURFACE-ERRORS-LIKE-SPELLING-AND-GRAMMAR'],
    ['A draft of the required length is content-complete, so no content revision is needed', 'MC-A-DRAFT-WITH-ENOUGH-WORDS-OR-PARAGRAPHS-DOESNT-NEED-CONTENT-REVISION'],
    'revising is about content, not length or commas, re-asked with a contradicting paragraph'),
  card('eng.writing.revising-for-content', 'fill_blank', H,
    'Complete the sentence: revising for content means ____.',
    'checking that the argument, evidence and organisation work',
    ['fixing spelling and grammar errors in the draft before anything else', 'MC-REVISING-MEANS-FIXING-SURFACE-ERRORS-LIKE-SPELLING-AND-GRAMMAR'],
    ['leaving the draft alone once it is long enough', 'MC-A-DRAFT-WITH-ENOUGH-WORDS-OR-PARAGRAPHS-DOESNT-NEED-CONTENT-REVISION'],
    'Replacement texts for both misconceptions'),
  card('eng.writing.revising-for-content', 'checkpoint', A,
    'A consultant\'s 20-page report repeats one finding in five sections, and her review pass fixes only typos and commas. She says the length shows the content is complete. Which assessment is accurate?',
    'She should cut the repetition and test whether each section develops something new; typos come last',
    ['She is right: revising means fixing typos and commas', 'MC-REVISING-MEANS-FIXING-SURFACE-ERRORS-LIKE-SPELLING-AND-GRAMMAR'],
    ['She is right: a long report does not need content revision', 'MC-A-DRAFT-WITH-ENOUGH-WORDS-OR-PARAGRAPHS-DOESNT-NEED-CONTENT-REVISION'],
    'both misconceptions, with a repetitive report'),

  // ─── eng.writing.sentence-writing ────────────────────────────────────────
  card('eng.writing.sentence-writing', 'short_answer', M,
    'A student writes "The old bridge over the river." and says it is a sentence because it starts with a capital and ends with a period. She also rewrites "We left early" as "We made the decision, in light of the circumstances, to depart at an earlier time" because longer is better. What is accurate?',
    'The first has no verb, so it is a fragment, and the padded version is less clear',
    ['It is a complete sentence, because a capital letter and a period are enough', 'MC-A-SENTENCE-IS-COMPLETE-AS-LONG-AS-IT-HAS-A-CAPITAL-LETTER-AND-A-PERIOD'],
    ['The longer version is better writing, since longer sentences are always better writing', 'MC-LONGER-SENTENCES-ARE-ALWAYS-BETTER-WRITING'],
    'fragment without a verb; padding is not quality, re-asked with a bridge'),
  card('eng.writing.sentence-writing', 'fill_blank', M,
    'Complete the sentence: a complete sentence needs ____.',
    'a subject and verb expressing a complete thought',
    ['a capital letter at the start and a period at the end', 'MC-A-SENTENCE-IS-COMPLETE-AS-LONG-AS-IT-HAS-A-CAPITAL-LETTER-AND-A-PERIOD'],
    ['as many words and clauses as possible', 'MC-LONGER-SENTENCES-ARE-ALWAYS-BETTER-WRITING'],
    'Replacement texts for both misconceptions'),
  card('eng.writing.sentence-writing', 'checkpoint', A,
    'An email contains "The quarterly figures for the northern region." and later "We are in a position at this point in time to confirm receipt of your request", which the author says is stronger because it is longer. Which assessment is accurate?',
    'The first lacks a verb, so it is a fragment, and "We confirm receipt of your request" says the same thing more clearly',
    ['The first is complete, since it has a capital letter and a period', 'MC-A-SENTENCE-IS-COMPLETE-AS-LONG-AS-IT-HAS-A-CAPITAL-LETTER-AND-A-PERIOD'],
    ['The longer line is better, since longer sentences are always better writing', 'MC-LONGER-SENTENCES-ARE-ALWAYS-BETTER-WRITING'],
    'both misconceptions, in a workplace email'),

  // ─── eng.writing.spelling-strategies ─────────────────────────────────────
  card('eng.writing.spelling-strategies', 'short_answer', M,
    'A student spells "knife" as "nife" by sounding it out, and plans to learn "unhappiness" as eleven unrelated letters. A friend says sounding out always works, and that spelling is only memorising. What is accurate?',
    'Sound out first, then check patterns and word parts, such as the silent k',
    ['Sounding out always gives the correct spelling, so "nife" is right', 'MC-SOUNDING-OUT-ALWAYS-GIVES-CORRECT-SPELLING'],
    ['Spelling is pure memorisation, so learning all eleven letters by rote is the best method', 'MC-SPELLING-IS-PURE-MEMORIZATION'],
    'sound out to narrow, then use patterns and parts, re-asked with knife and unhappiness'),
  card('eng.writing.spelling-strategies', 'fill_blank', M,
    'Complete the sentence: to spell an unfamiliar word, ____.',
    'sound it out, then use word parts and patterns',
    ['trust the sounds, which always give the right spelling', 'MC-SOUNDING-OUT-ALWAYS-GIVES-CORRECT-SPELLING'],
    ['memorise the letters one by one, since spelling is just memory', 'MC-SPELLING-IS-PURE-MEMORIZATION'],
    'Replacement texts for both misconceptions'),
  card('eng.writing.spelling-strategies', 'checkpoint', A,
    'A designer writes "aquaintance" after sounding it out, and says her team should simply memorise every spelling by rote with no patterns. Which assessment is accurate?',
    'Sounding out only narrows the options; the word comes from "acquaint", a familiar part that shows the "c"',
    ['She is right: sounding out gives the right spelling', 'MC-SOUNDING-OUT-ALWAYS-GIVES-CORRECT-SPELLING'],
    ['She is right: spelling is pure rote memorisation', 'MC-SPELLING-IS-PURE-MEMORIZATION'],
    'both misconceptions, with aquaintance'),

  // ─── eng.writing.supporting-details ──────────────────────────────────────
  card('eng.writing.supporting-details', 'short_answer', M,
    'The topic sentence is "Our school\'s recycling programme has cut the waste we send to landfill." A student adds "The cafeteria serves pizza on Fridays" (true) and then lists seven short facts. She says any true fact about the school supports it, and more details always make it stronger. What is accurate?',
    'Details must support the specific claim; a few developed details beat many thin ones',
    ['Any true statement about the school counts as a supporting detail', 'MC-ANY-TRUE-STATEMENT-ABOUT-THE-TOPIC-COUNTS-AS-A-SUPPORTING-DETAIL'],
    ['Seven short details are stronger than a few, since more details always strengthen a paragraph', 'MC-MORE-SUPPORTING-DETAILS-ALWAYS-MAKES-A-PARAGRAPH-STRONGER'],
    'details must match the claim; depth beats count, re-asked with a recycling paragraph'),
  card('eng.writing.supporting-details', 'fill_blank', M,
    'Complete the sentence: a good supporting detail ____.',
    'develops the topic sentence\'s specific claim',
    ['is any true statement about the general topic', 'MC-ANY-TRUE-STATEMENT-ABOUT-THE-TOPIC-COUNTS-AS-A-SUPPORTING-DETAIL'],
    ['is one of as many details as the paragraph can hold', 'MC-MORE-SUPPORTING-DETAILS-ALWAYS-MAKES-A-PARAGRAPH-STRONGER'],
    'Replacement texts for both misconceptions'),
  card('eng.writing.supporting-details', 'checkpoint', A,
    'A paragraph argues "The new scheduling tool cut missed meetings." It adds that the vendor is based in Oslo and lists eight brief facts about features. The editor says both are fine: they are true, and more details make it stronger. Which assessment is accurate?',
    'The vendor\'s location does not support the claim; fewer, developed details such as the drop in missed meetings are stronger',
    ['She is right: any true statement about the tool counts as support', 'MC-ANY-TRUE-STATEMENT-ABOUT-THE-TOPIC-COUNTS-AS-A-SUPPORTING-DETAIL'],
    ['She is right: more supporting details always make a paragraph stronger', 'MC-MORE-SUPPORTING-DETAILS-ALWAYS-MAKES-A-PARAGRAPH-STRONGER'],
    'both misconceptions, with a scheduling tool'),

  // ─── eng.writing.the-writing-process ─────────────────────────────────────
  card('eng.writing.the-writing-process', 'short_answer', M,
    'A student finishes an essay in one sitting, reads it over for commas and spelling, and says that was both revising and editing, so she is done. What is accurate?',
    'Writing is a process: revise ideas and organisation first, then edit; she has only edited',
    ['She is done, because good writers produce a finished piece in one pass without redrafting', 'MC-GOOD-WRITERS-PRODUCE-A-FINISHED-PIECE-IN-ONE-PASS'],
    ['She did both, since editing and revising are the same thing', 'MC-EDITING-AND-REVISING-ARE-THE-SAME-THING'],
    'revise then edit; drafts are reshaped, re-asked with a one-sitting essay'),
  card('eng.writing.the-writing-process', 'fill_blank', M,
    'Complete the sentence: in the writing process, ____.',
    'you revise ideas first, then edit for surface errors',
    ['skilled writers get a finished piece right in one pass', 'MC-GOOD-WRITERS-PRODUCE-A-FINISHED-PIECE-IN-ONE-PASS'],
    ['revising and editing are two names for the same step', 'MC-EDITING-AND-REVISING-ARE-THE-SAME-THING'],
    'Replacement texts for both misconceptions'),
  card('eng.writing.the-writing-process', 'checkpoint', A,
    'A new analyst writes a board summary in one go and checks only spelling. He says experienced writers work this way and that checking spelling is revising. Which assessment is accurate?',
    'Skilled writers redraft; revising reworks content and structure, while spelling checks are editing',
    ['He is right: strong writers produce finished work in one pass', 'MC-GOOD-WRITERS-PRODUCE-A-FINISHED-PIECE-IN-ONE-PASS'],
    ['He is right: revising and editing are the same thing', 'MC-EDITING-AND-REVISING-ARE-THE-SAME-THING'],
    'both misconceptions, with a board summary'),

  // ─── eng.writing.thesis-statements ───────────────────────────────────────
  card('eng.writing.thesis-statements', 'short_answer', H,
    'A student offers two thesis statements: "My essay is about school lunches" and "Pizza is the best food ever." She says the first announces a topic, which is all a thesis is, and the second is an opinion, which is all a thesis needs. What is accurate?',
    'Neither works: a thesis is a claim body paragraphs can prove',
    ['The first works, since a thesis is the topic announcement', 'MC-A-THESIS-IS-JUST-THE-TOPIC-ANNOUNCEMENT'],
    ['The second works, since a thesis only needs to be an opinion of the writer', 'MC-B-THESIS-JUST-NEEDS-TO-BE-AN-OPINION'],
    'a thesis is an arguable claim, re-asked with school lunches and pizza'),
  card('eng.writing.thesis-statements', 'fill_blank', H,
    'Complete the sentence: a thesis statement is ____.',
    'a specific, arguable claim the essay can prove',
    ['an announcement of the essay\'s topic', 'MC-A-THESIS-IS-JUST-THE-TOPIC-ANNOUNCEMENT'],
    ['any opinion, however broad or unsupported it is', 'MC-B-THESIS-JUST-NEEDS-TO-BE-AN-OPINION'],
    'Replacement texts for both misconceptions'),
  card('eng.writing.thesis-statements', 'checkpoint', A,
    'A policy brief first states "This brief examines pricing", then revises to "Pricing is unfair." The director says the first is a thesis because it names the topic and the second because it is an opinion. Which assessment is accurate?',
    'Neither is a thesis; "Tiered pricing should replace flat fees" is a claim the brief can argue with evidence',
    ['He is right: a thesis is a statement of the topic', 'MC-A-THESIS-IS-JUST-THE-TOPIC-ANNOUNCEMENT'],
    ['He is right: any opinion works as a thesis', 'MC-B-THESIS-JUST-NEEDS-TO-BE-AN-OPINION'],
    'both misconceptions, with a pricing brief'),

  // ─── eng.writing.topic-sentences ─────────────────────────────────────────
  card('eng.writing.topic-sentences', 'short_answer', M,
    'For a paragraph about cycling to school, a student writes "This paragraph is about bikes." A friend suggests "Things are good in many ways" so it can cover every detail. What is accurate?',
    'Both fail; a topic sentence makes a specific claim, like "Cycling beats the bus"',
    ['The first works, since a topic sentence just announces the topic', 'MC-A-TOPIC-SENTENCE-JUST-ANNOUNCES-THE-TOPIC-RATHER-THAN-MAKING-A-CLAIM'],
    ['The second works, since a topic sentence must be general enough to cover everything', 'MC-A-TOPIC-SENTENCE-MUST-BE-VERY-GENERAL-AND-VAGUE-TO-COVER-EVERYTHING'],
    'specific claim over topic label or vagueness, re-asked with cycling to school'),
  card('eng.writing.topic-sentences', 'fill_blank', M,
    'Complete the sentence: a strong topic sentence ____.',
    'makes a specific claim to develop',
    ['names the subject the paragraph is about', 'MC-A-TOPIC-SENTENCE-JUST-ANNOUNCES-THE-TOPIC-RATHER-THAN-MAKING-A-CLAIM'],
    ['is general enough to cover every possible detail', 'MC-A-TOPIC-SENTENCE-MUST-BE-VERY-GENERAL-AND-VAGUE-TO-COVER-EVERYTHING'],
    'Replacement texts for both misconceptions'),
  card('eng.writing.topic-sentences', 'checkpoint', A,
    'A section opens "This section looks at onboarding." An editor suggests widening it to "Employees have experiences at work" so it can cover any detail. Which assessment is accurate?',
    'Both fall short; "New hires stay longer when onboarding includes a buddy" is a focused claim the section can prove',
    ['The opening works: a topic sentence only has to announce the topic', 'MC-A-TOPIC-SENTENCE-JUST-ANNOUNCES-THE-TOPIC-RATHER-THAN-MAKING-A-CLAIM'],
    ['The wider version is better: a topic sentence should be vague enough to cover everything', 'MC-A-TOPIC-SENTENCE-MUST-BE-VERY-GENERAL-AND-VAGUE-TO-COVER-EVERYTHING'],
    'both misconceptions, with an onboarding section'),

  // ─── eng.writing.transitions-and-cohesion ────────────────────────────────
  card('eng.writing.transitions-and-cohesion', 'short_answer', M,
    'A student writes "We forgot the map. Therefore, we found the trail easily." She says any transition word can be inserted anywhere to improve flow, and that cohesion comes only from sentence-opening transition words. What is accurate?',
    'Match the transition to the relationship (contrast: "Nevertheless"); pronouns also help',
    ['"Therefore" improves the flow, since any transition word can be inserted anywhere to improve it', 'MC-ANY-TRANSITION-WORD-CAN-BE-INSERTED-ANYWHERE-TO-IMPROVE-FLOW'],
    ['Cohesion comes only from transition words at the start of sentences, and nothing else links ideas', 'MC-COHESION-ONLY-HAPPENS-AT-THE-BEGINNING-OF-SENTENCES-WITH-TRANSITION-WORDS'],
    'transitions must fit the logic; cohesion has other sources, re-asked with a forgotten map'),
  card('eng.writing.transitions-and-cohesion', 'fill_blank', M,
    'Complete the sentence: to make writing flow, ____.',
    'match each transition to the relationship, and use pronouns and repeated terms',
    ['insert any transition word between the sentences', 'MC-ANY-TRANSITION-WORD-CAN-BE-INSERTED-ANYWHERE-TO-IMPROVE-FLOW'],
    ['start every sentence with a transition word, since cohesion comes from nothing else', 'MC-COHESION-ONLY-HAPPENS-AT-THE-BEGINNING-OF-SENTENCES-WITH-TRANSITION-WORDS'],
    'Replacement texts for both misconceptions'),
  card('eng.writing.transitions-and-cohesion', 'checkpoint', A,
    'In a status report, a writer praises a launch, then inserts "Furthermore" before "The launch was delayed by a month". She avoids pronouns and repeated terms, saying cohesion comes only from opening transitions. Which assessment is accurate?',
    '"Furthermore" adds a similar point, but this is a contrast ("However"); pronouns and repeated terms also build cohesion',
    ['"Furthermore" is fine, since any transition word works anywhere', 'MC-ANY-TRANSITION-WORD-CAN-BE-INSERTED-ANYWHERE-TO-IMPROVE-FLOW'],
    ['She is right: cohesion comes only from transition words opening sentences', 'MC-COHESION-ONLY-HAPPENS-AT-THE-BEGINNING-OF-SENTENCES-WITH-TRANSITION-WORDS'],
    'both misconceptions, in a status report'),
]
