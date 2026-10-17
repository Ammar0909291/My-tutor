/**
 * ENGLISH CARD-DEPTH CAMPAIGN — Batch 17 (eng.literature part 2, 24 cards).
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
 * slug and abandon the live row's identity. Each literature concept already uses native band : mcq, misconception_probe, checkpoint, true_false and ADULT : mcq, misconception_probe, so the three new cards take the FREE slots native band : short_answer, fill_blank and ADULT : checkpoint (native band is MIDDLE for narrative-elements and plot-structure, HIGH for the rest).
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


export const ENGLISH_CARD_DEPTH_BATCH_17: SeedProbe[] = [
  // ─── eng.literature.literary-genres-overview ─────────────────────────────
  card('eng.literature.literary-genres-overview', 'short_answer', H,
    'A biography of a chess champion is built as a three-act story, with scenes and figurative language, around a mystery of her disappearance. A student says a work must fit exactly one genre, and that a biography is nonfiction and so only facts with no literary technique. What is accurate?',
    'Works can blend genres, and a biography can use deliberate craft such as scene',
    ['The work must fit cleanly into exactly one genre, so the mystery element cannot count', 'MC-A-WORK-MUST-FIT-CLEANLY-INTO-EXACTLY-ONE-GENRE-CATEGORY'],
    ['A biography is nonfiction, so it is only facts with no literary technique or craft', 'MC-NONFICTION-IS-JUST-FACTS-WITH-NO-LITERARY-TECHNIQUE-OR-CRAFT'],
    'genres blend; nonfiction uses craft, re-asked with a chess biography'),
  card('eng.literature.literary-genres-overview', 'fill_blank', H,
    'Complete the sentence: genres ____.',
    'can blend, and nonfiction can use deliberate literary craft',
    ['are exclusive boxes, so every work fits exactly one of them', 'MC-A-WORK-MUST-FIT-CLEANLY-INTO-EXACTLY-ONE-GENRE-CATEGORY'],
    ['split fiction, which has craft, from nonfiction, which is only facts', 'MC-NONFICTION-IS-JUST-FACTS-WITH-NO-LITERARY-TECHNIQUE-OR-CRAFT'],
    'Replacement texts for both misconceptions'),
  card('eng.literature.literary-genres-overview', 'checkpoint', A,
    'A prize committee says a verse memoir must be classed as either poetry or nonfiction, never both, and dismisses a travel narrative with scene-setting and a deliberate arc as just facts. Which assessment is accurate?',
    'A verse memoir blends genres, and the travel narrative\'s scenes and arc are literary craft',
    ['The committee is right: a work must fit exactly one category', 'MC-A-WORK-MUST-FIT-CLEANLY-INTO-EXACTLY-ONE-GENRE-CATEGORY'],
    ['The committee is right: nonfiction is just facts with no literary craft', 'MC-NONFICTION-IS-JUST-FACTS-WITH-NO-LITERARY-TECHNIQUE-OR-CRAFT'],
    'both misconceptions, with a verse memoir and a travel narrative'),

  // ─── eng.literature.literary-periods-survey ──────────────────────────────
  card('eng.literature.literary-periods-survey', 'short_answer', H,
    'A student learns Modernism as a stand-alone label, unrelated to what came before. She also says Jane Austen\'s novels, written in the Romantic era, must display every Romantic trait. What is accurate?',
    'Modernism partly reacts to earlier movements, and a work shows its period only as a dominant tendency',
    ['Periods are isolated categories with no connection to one another', 'MC-A-LITERARY-PERIODS-ARE-ISOLATED-CATEGORIES-WITH-NO-CONNECTION-TO-EACH-OTHER'],
    ['Every work from a period perfectly fits that period\'s defining traits, so Austen must be fully Romantic', 'MC-B-EVERY-WORK-FROM-A-GIVEN-PERIOD-PERFECTLY-FITS-THAT-PERIODS-DEFINING-CHARACTERISTICS'],
    'periods connect; labels describe tendencies, re-asked with Modernism and Austen'),
  card('eng.literature.literary-periods-survey', 'fill_blank', H,
    'Complete the sentence: a literary period label ____.',
    'describes tendencies that grow from earlier movements',
    ['stands alone, unconnected to the periods before and after it', 'MC-A-LITERARY-PERIODS-ARE-ISOLATED-CATEGORIES-WITH-NO-CONNECTION-TO-EACH-OTHER'],
    ['perfectly fits every work written in that era', 'MC-B-EVERY-WORK-FROM-A-GIVEN-PERIOD-PERFECTLY-FITS-THAT-PERIODS-DEFINING-CHARACTERISTICS'],
    'Replacement texts for both misconceptions'),
  card('eng.literature.literary-periods-survey', 'checkpoint', A,
    'A course outline presents Realism and Naturalism as two unrelated boxes, and tells students that any novel from the 1890s should show every Naturalist trait. Which assessment is accurate?',
    'Naturalism extends and intensifies Realism, and works only tend toward their period\'s traits',
    ['The outline is right: periods are isolated categories', 'MC-A-LITERARY-PERIODS-ARE-ISOLATED-CATEGORIES-WITH-NO-CONNECTION-TO-EACH-OTHER'],
    ['The outline is right: every work from a period fits all its defining traits', 'MC-B-EVERY-WORK-FROM-A-GIVEN-PERIOD-PERFECTLY-FITS-THAT-PERIODS-DEFINING-CHARACTERISTICS'],
    'both misconceptions, with Realism and Naturalism'),

  // ─── eng.literature.metaphor-and-simile ──────────────────────────────────
  card('eng.literature.metaphor-and-simile', 'short_answer', H,
    'A student says "Time is a thief" and "Time is like a thief" differ only in the word "like", and that "He ran as fast as his brother" is a simile. What is accurate?',
    'A simile marks the comparison openly; "as fast as his brother" compares like things',
    ['The only difference is the word "like", so the two lines do the same work', 'MC-THE-ONLY-DIFFERENCE-BETWEEN-METAPHOR-AND-SIMILE-IS-THE-WORD-LIKE-OR-AS'],
    ['Any comparison using "like" or "as" is a simile, so "as fast as his brother" counts', 'MC-ANY-COMPARISON-USING-LIKE-OR-AS-IS-A-SIMILE'],
    'simile marks the comparison; literal comparisons are not similes, re-asked with a thief and a brother'),
  card('eng.literature.metaphor-and-simile', 'fill_blank', H,
    'Complete the sentence: a simile ____.',
    'compares two different things, marked with "like" or "as"',
    ['is the same as a metaphor, except for the word "like" or "as"', 'MC-THE-ONLY-DIFFERENCE-BETWEEN-METAPHOR-AND-SIMILE-IS-THE-WORD-LIKE-OR-AS'],
    ['is any comparison that contains "like" or "as"', 'MC-ANY-COMPARISON-USING-LIKE-OR-AS-IS-A-SIMILE'],
    'Replacement texts for both misconceptions'),
  card('eng.literature.metaphor-and-simile', 'checkpoint', A,
    'A speechwriter flags "Her handshake was as firm as her father\'s" as a simile, and says swapping "like" for "is" never changes a figure\'s effect. Which assessment is accurate?',
    'The handshake line compares two similar things literally, so it is no simile; and a simile\'s explicit marker softens the effect',
    ['It is a simile, since any comparison using "as" is a simile', 'MC-ANY-COMPARISON-USING-LIKE-OR-AS-IS-A-SIMILE'],
    ['The effect never changes, since the only difference is the word "like"', 'MC-THE-ONLY-DIFFERENCE-BETWEEN-METAPHOR-AND-SIMILE-IS-THE-WORD-LIKE-OR-AS'],
    'both misconceptions, with a handshake comparison'),

  // ─── eng.literature.meter-and-rhyme ──────────────────────────────────────
  card('eng.literature.meter-and-rhyme', 'short_answer', H,
    'A student says a rhyming song lyric with uneven line lengths must have a regular meter because it rhymes. She also says one reversed foot in an otherwise iambic sonnet line means the sonnet has no meter. What is accurate?',
    'Rhyme and meter are separate, and one substituted foot varies a dominant pattern',
    ['A poem that rhymes must also have a regular, consistent meter', 'MC-A-A-POEM-THAT-RHYMES-MUST-ALSO-HAVE-A-REGULAR-CONSISTENT-METER'],
    ['Any deviation from the dominant stress pattern means the poem has no meter at all', 'MC-B-ANY-DEVIATION-FROM-THE-DOMINANT-STRESS-PATTERN-MEANS-THE-POEM-HAS-NO-METER'],
    'rhyme is not meter; variation is not absence, re-asked with a song lyric and a sonnet'),
  card('eng.literature.meter-and-rhyme', 'fill_blank', H,
    'Complete the sentence: when analysing a poem, ____.',
    'treat rhyme and meter as separate questions',
    ['assume rhyme guarantees a regular, consistent meter', 'MC-A-A-POEM-THAT-RHYMES-MUST-ALSO-HAVE-A-REGULAR-CONSISTENT-METER'],
    ['conclude there is no meter once a single line varies', 'MC-B-ANY-DEVIATION-FROM-THE-DOMINANT-STRESS-PATTERN-MEANS-THE-POEM-HAS-NO-METER'],
    'Replacement texts for both misconceptions'),
  card('eng.literature.meter-and-rhyme', 'checkpoint', A,
    'A critic says a ballad with a tidy ABCB rhyme must also have consistent stress, and declares a blank-verse speech has "no meter" because its third line opens with a reversed foot. Which assessment is accurate?',
    'Rhyme says nothing about meter, and a reversed first foot is a common variation inside a regular pattern',
    ['She is right: rhyme guarantees a regular meter', 'MC-A-A-POEM-THAT-RHYMES-MUST-ALSO-HAVE-A-REGULAR-CONSISTENT-METER'],
    ['She is right: one deviation means the speech has no meter', 'MC-B-ANY-DEVIATION-FROM-THE-DOMINANT-STRESS-PATTERN-MEANS-THE-POEM-HAS-NO-METER'],
    'both misconceptions, with a ballad and a blank-verse speech'),

  // ─── eng.literature.narrative-elements ───────────────────────────────────
  card('eng.literature.narrative-elements', 'short_answer', M,
    'A story follows a girl trying to win a spelling bee. It also mentions her lunch menu and her cousin\'s holiday, and the bee takes place in a stuffy, silent hall. A student says everything that happens is the plot, and that the hall is only a place name. What is accurate?',
    'The plot is the conflict-driven events, and the stuffy hall also shapes the mood',
    ['The plot is everything that happens in the story, including the lunch menu and holiday', 'MC-PLOT-MEANS-EVERYTHING-THAT-HAPPENS-IN-THE-STORY'],
    ['A setting only tells where and when, and has no other effect on the story', 'MC-SETTING-IS-JUST-WHERE-AND-WHEN-A-STORY-HAPPENS-WITH-NO-OTHER-EFFECT'],
    'plot is the conflict-linked chain; setting shapes mood, re-asked with a spelling bee'),
  card('eng.literature.narrative-elements', 'fill_blank', M,
    'Complete the sentence: to analyse a story, ____.',
    'trace the conflict-linked events, and ask what mood the setting creates',
    ['count everything that happens in the story as the plot, however minor it is', 'MC-PLOT-MEANS-EVERYTHING-THAT-HAPPENS-IN-THE-STORY'],
    ['treat the setting as only a place and a date', 'MC-SETTING-IS-JUST-WHERE-AND-WHEN-A-STORY-HAPPENS-WITH-NO-OTHER-EFFECT'],
    'Replacement texts for both misconceptions'),
  card('eng.literature.narrative-elements', 'checkpoint', A,
    'A training story about a nurse handling an emergency also mentions her commute and a colleague\'s birthday, and is set in a dim, silent ward at 3 a.m. A trainee says all those details are the plot and that the ward is just a location. Which assessment is accurate?',
    'The plot is the conflict-linked events, and the dim, silent ward at 3 a.m. creates tension, not just a location',
    ['He is right: everything that happens is the plot', 'MC-PLOT-MEANS-EVERYTHING-THAT-HAPPENS-IN-THE-STORY'],
    ['He is right: setting only says where and when', 'MC-SETTING-IS-JUST-WHERE-AND-WHEN-A-STORY-HAPPENS-WITH-NO-OTHER-EFFECT'],
    'both misconceptions, with a night-shift ward'),

  // ─── eng.literature.novel-study ──────────────────────────────────────────
  card('eng.literature.novel-study', 'short_answer', H,
    'A novel spans three generations and several linked plotlines. A student says it is just a short story with more words, and that its theme is clear from the first page alone. What is accurate?',
    'A novel sustains several plotlines, so its theme emerges across the whole text',
    ['It is a short story stretched out, so the extra length adds no structure', 'MC-A-A-NOVEL-IS-JUST-A-SHORT-STORY-STRETCHED-OUT-WITH-MORE-WORDS'],
    ['The theme can be fully understood from any single passage, including the first page', 'MC-B-A-NOVELS-THEME-CAN-BE-FULLY-UNDERSTOOD-FROM-ANY-SINGLE-PASSAGE-OR-CHAPTER'],
    'novels carry multiple threads; theme emerges whole, re-asked with a three-generation saga'),
  card('eng.literature.novel-study', 'fill_blank', H,
    'Complete the sentence: a novel ____.',
    'develops several threads, so its theme emerges over the whole book',
    ['is just a short story stretched out with more words and no new structure', 'MC-A-A-NOVEL-IS-JUST-A-SHORT-STORY-STRETCHED-OUT-WITH-MORE-WORDS'],
    ['shows its full theme in any single chapter', 'MC-B-A-NOVELS-THEME-CAN-BE-FULLY-UNDERSTOOD-FROM-ANY-SINGLE-PASSAGE-OR-CHAPTER'],
    'Replacement texts for both misconceptions'),
  card('eng.literature.novel-study', 'checkpoint', A,
    'A reviewer calls a 600-page saga "a short story with padding", then states its theme after reading only the opening scene. Which assessment is accurate?',
    'Length carries structures a short story lacks, and a theme should be judged against the whole novel',
    ['He is right: a novel is just a short story with more words', 'MC-A-A-NOVEL-IS-JUST-A-SHORT-STORY-STRETCHED-OUT-WITH-MORE-WORDS'],
    ['He is right: the opening scene fully reveals a novel\'s theme', 'MC-B-A-NOVELS-THEME-CAN-BE-FULLY-UNDERSTOOD-FROM-ANY-SINGLE-PASSAGE-OR-CHAPTER'],
    'both misconceptions, with a 600-page saga'),

  // ─── eng.literature.plot-structure ───────────────────────────────────────
  card('eng.literature.plot-structure', 'short_answer', M,
    'In a school-play story, the noisiest scene is a food fight halfway through; the outcome is decided when the lead quietly hands back the stolen trophy. A student says the food fight is the climax, and that a good story gives each of the five stages equal length. What is accurate?',
    'The climax is where the conflict is decided, here the quiet handing-back',
    ['The food fight is the climax, because the climax is the most exciting moment', 'MC-THE-CLIMAX-IS-JUST-THE-MOST-EXCITING-OR-ACTION-PACKED-MOMENT'],
    ['A good story gives all five stages equal length', 'MC-EVERY-STORY-FOLLOWS-THE-FIVE-STAGES-IN-EQUAL-PROPORTION'],
    'climax is the decision point; stages are unequal, re-asked with a school play'),
  card('eng.literature.plot-structure', 'fill_blank', M,
    'Complete the sentence: the climax is ____.',
    'the turning point where the conflict is decided',
    ['the most exciting or action-packed moment of the story', 'MC-THE-CLIMAX-IS-JUST-THE-MOST-EXCITING-OR-ACTION-PACKED-MOMENT'],
    ['one of five stages that must each take equal space', 'MC-EVERY-STORY-FOLLOWS-THE-FIVE-STAGES-IN-EQUAL-PROPORTION'],
    'Replacement texts for both misconceptions'),
  card('eng.literature.plot-structure', 'checkpoint', A,
    'A case study about a failed merger spends 90% of its length on rising action. A trainee marks the loudest board argument as the climax, and says the story is flawed because the five stages are unequal. Which assessment is accurate?',
    'The climax is the moment the outcome is decided, and unequal stage lengths are normal',
    ['He is right: the climax is the most exciting moment', 'MC-THE-CLIMAX-IS-JUST-THE-MOST-EXCITING-OR-ACTION-PACKED-MOMENT'],
    ['He is right: the stages must have equal proportions', 'MC-EVERY-STORY-FOLLOWS-THE-FIVE-STAGES-IN-EQUAL-PROPORTION'],
    'both misconceptions, with a failed-merger case study'),

  // ─── eng.literature.poetic-forms ─────────────────────────────────────────
  card('eng.literature.poetic-forms', 'short_answer', H,
    'A student identifies a poem as a haiku and moves on, saying form is just a label. She dismisses another poem, in free verse, as "not crafted" because it has no rules. What is accurate?',
    'A haiku\'s compression shapes its meaning, and free verse is crafted too',
    ['A poem\'s form is just a label with no effect on meaning', 'MC-A-A-POEMS-FORM-IS-JUST-A-LABEL-WITH-NO-EFFECT-ON-MEANING'],
    ['Free verse has no form or rules at all, so it is not really crafted work', 'MC-B-FREE-VERSE-HAS-NO-FORM-OR-RULES-AT-ALL-SO-ITS-NOT-REALLY-CRAFTED'],
    'form shapes meaning; free verse is crafted, re-asked with a haiku'),
  card('eng.literature.poetic-forms', 'fill_blank', H,
    'Complete the sentence: a poem\'s form ____.',
    'shapes its meaning, and free verse is still crafted',
    ['is a label that names it without affecting what it means', 'MC-A-A-POEMS-FORM-IS-JUST-A-LABEL-WITH-NO-EFFECT-ON-MEANING'],
    ['is absent in free verse, which has no rules at all', 'MC-B-FREE-VERSE-HAS-NO-FORM-OR-RULES-AT-ALL-SO-ITS-NOT-REALLY-CRAFTED'],
    'Replacement texts for both misconceptions'),
  card('eng.literature.poetic-forms', 'checkpoint', A,
    'An anthology editor labels a poem "a sestina" in the margin and adds no comment, and rejects a free-verse piece as unstructured. Which assessment is accurate?',
    'The sestina\'s repeated end-words shape its meaning and merit comment; free verse is crafted through line breaks and rhythm',
    ['She is right: a form name is only a label', 'MC-A-A-POEMS-FORM-IS-JUST-A-LABEL-WITH-NO-EFFECT-ON-MEANING'],
    ['She is right: free verse has no rules, so it is not crafted', 'MC-B-FREE-VERSE-HAS-NO-FORM-OR-RULES-AT-ALL-SO-ITS-NOT-REALLY-CRAFTED'],
    'both misconceptions, with a sestina and free verse'),
]
