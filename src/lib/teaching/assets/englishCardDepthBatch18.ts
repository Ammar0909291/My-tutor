/**
 * ENGLISH CARD-DEPTH CAMPAIGN — Batch 18 (eng.literature part 3, 24 cards).
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
 * slug and abandon the live row's identity. Each literature concept already uses native band : mcq, misconception_probe, checkpoint, true_false and ADULT : mcq, misconception_probe, so the three new cards take the FREE slots native band : short_answer, fill_blank and ADULT : checkpoint (native band is MIDDLE for point-of-view and setting-and-atmosphere, HIGH for the rest).
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


export const ENGLISH_CARD_DEPTH_BATCH_18: SeedProbe[] = [
  // ─── eng.literature.poetry-basics ────────────────────────────────────────
  card('eng.literature.poetry-basics', 'short_answer', H,
    'A student says the short text "Rain stopped. / Silence. / The street smells of pennies." is just prose with line breaks in random places, and that it is no real poem because it does not rhyme. What is accurate?',
    'Line breaks set emphasis and pace, and poetry does not need rhyme',
    ['It is just prose with line breaks in random places, so nothing about it is poetic', 'MC-POETRY-IS-JUST-PROSE-WRITTEN-WITH-LINE-BREAKS-IN-RANDOM-PLACES'],
    ['It is not poetry, since all real poetry must rhyme and keep a strict meter', 'MC-ALL-POETRY-MUST-RHYME-AND-HAVE-A-STRICT-METER'],
    'line breaks are deliberate; rhyme is not required, re-asked with a rain poem'),
  card('eng.literature.poetry-basics', 'fill_blank', H,
    'Complete the sentence: what makes a text poetry is ____.',
    'condensed language and deliberate line choices',
    ['prose cut into lines wherever the writer happens to like', 'MC-POETRY-IS-JUST-PROSE-WRITTEN-WITH-LINE-BREAKS-IN-RANDOM-PLACES'],
    ['rhyme and a strict meter in every line it contains', 'MC-ALL-POETRY-MUST-RHYME-AND-HAVE-A-STRICT-METER'],
    'Replacement texts for both misconceptions'),
  card('eng.literature.poetry-basics', 'checkpoint', A,
    'A newsletter editor rewrites a compact poem as one paragraph, saying its line breaks were random, and rejects an unrhymed poem as "not real poetry". Which assessment is accurate?',
    'The breaks control emphasis and pacing, and an unrhymed poem is still poetry through condensed language',
    ['He is right: line breaks are random, so it is just prose', 'MC-POETRY-IS-JUST-PROSE-WRITTEN-WITH-LINE-BREAKS-IN-RANDOM-PLACES'],
    ['He is right: real poetry must rhyme with a strict meter', 'MC-ALL-POETRY-MUST-RHYME-AND-HAVE-A-STRICT-METER'],
    'both misconceptions, with a newsletter editor'),

  // ─── eng.literature.point-of-view ────────────────────────────────────────
  card('eng.literature.point-of-view', 'short_answer', M,
    'In a story, "I" says "I won the relay by a mile", but the tale shows teammates picking up the baton he dropped. A student says first-person narrators always tell the whole unbiased truth, and that third-person omniscient and limited are the same since both use "he" and "she". What is accurate?',
    'A first-person narrator can be biased, and omniscient reveals many minds, limited one',
    ['A first-person narrator always tells the complete, unbiased truth, so he won by a mile', 'MC-A-A-FIRST-PERSON-NARRATOR-ALWAYS-TELLS-THE-COMPLETE-UNBIASED-TRUTH-ABOUT-EVERYTHING-THAT-HAPPENS'],
    ['Third-person omniscient and limited are basically the same, since both use "he" and "she"', 'MC-B-THIRD-PERSON-OMNISCIENT-AND-THIRD-PERSON-LIMITED-ARE-BASICALLY-THE-SAME-THING-JUST-USING-HE-SHE'],
    'narrators can be biased; omniscient differs from limited, re-asked with a relay story'),
  card('eng.literature.point-of-view', 'fill_blank', M,
    'Complete the sentence: to judge point of view, ____.',
    'ask who tells, how much they know and whether they are biased',
    ['trust a first-person narrator to give the unbiased truth', 'MC-A-A-FIRST-PERSON-NARRATOR-ALWAYS-TELLS-THE-COMPLETE-UNBIASED-TRUTH-ABOUT-EVERYTHING-THAT-HAPPENS'],
    ['check only the pronouns, since omniscient and limited are the same', 'MC-B-THIRD-PERSON-OMNISCIENT-AND-THIRD-PERSON-LIMITED-ARE-BASICALLY-THE-SAME-THING-JUST-USING-HE-SHE'],
    'Replacement texts for both misconceptions'),
  card('eng.literature.point-of-view', 'checkpoint', A,
    'A case study is told by a project lead who says "my team never missed a deadline", while its appendix lists three misses. A reviewer says first-person narrators always report objectively, and that third-person limited and omniscient versions would differ only in using "she". Which assessment is accurate?',
    'First-person accounts can be self-serving, and the two third-person types differ in how many minds they reveal',
    ['She is right: a first-person narrator tells the complete, unbiased truth', 'MC-A-A-FIRST-PERSON-NARRATOR-ALWAYS-TELLS-THE-COMPLETE-UNBIASED-TRUTH-ABOUT-EVERYTHING-THAT-HAPPENS'],
    ['She is right: the two third-person types differ only in the pronouns', 'MC-B-THIRD-PERSON-OMNISCIENT-AND-THIRD-PERSON-LIMITED-ARE-BASICALLY-THE-SAME-THING-JUST-USING-HE-SHE'],
    'both misconceptions, with a project-lead case study'),

  // ─── eng.literature.prose-fiction ────────────────────────────────────────
  card('eng.literature.prose-fiction', 'short_answer', H,
    'One story focuses on a single conflict between two characters; another has a woman slowly turning transparent to show her loneliness. A student says the first is only a shorter novel, and the second is weak because good fiction must be realistic. What is accurate?',
    'A short story aims for one effect, and a fantastical element can express truth',
    ['The short story is just a shorter version of a novel, with less of everything in it', 'MC-A-SHORT-STORY-IS-JUST-A-SHORTER-VERSION-OF-A-NOVEL'],
    ['The transparent woman makes the story weak, since good fiction must be completely realistic', 'MC-PROSE-FICTION-MUST-ALWAYS-BE-COMPLETELY-REALISTIC-TO-BE-GOOD'],
    'short story is its own form; fantasy can carry truth, re-asked with a transparent woman'),
  card('eng.literature.prose-fiction', 'fill_blank', H,
    'Complete the sentence: when judging prose fiction, ____.',
    'ask what the form achieves and what truth a fantasy shows',
    ['treat a short story as a novel with fewer pages in it', 'MC-A-SHORT-STORY-IS-JUST-A-SHORTER-VERSION-OF-A-NOVEL'],
    ['rank realistic stories above any with fantastical elements', 'MC-PROSE-FICTION-MUST-ALWAYS-BE-COMPLETELY-REALISTIC-TO-BE-GOOD'],
    'Replacement texts for both misconceptions'),
  card('eng.literature.prose-fiction', 'checkpoint', A,
    'A reviewer faults a flash-length story for lacking a novel\'s subplots, and calls a fable with talking animals unserious since fiction should be realistic. Which assessment is accurate?',
    'A short form aims at one concentrated effect, and a fable\'s talking animals can carry serious human truths',
    ['He is right: a short story is just a short novel', 'MC-A-SHORT-STORY-IS-JUST-A-SHORTER-VERSION-OF-A-NOVEL'],
    ['He is right: good fiction must be completely realistic', 'MC-PROSE-FICTION-MUST-ALWAYS-BE-COMPLETELY-REALISTIC-TO-BE-GOOD'],
    'both misconceptions, with a flash story and a fable'),

  // ─── eng.literature.prose-nonfiction ─────────────────────────────────────
  card('eng.literature.prose-nonfiction', 'short_answer', H,
    'A student reads a eulogy, a lab report and a travel essay, and says all nonfiction is neutral fact-reporting with no author voice, and that the three are basically the same kind of text. What is accurate?',
    'Nonfiction carries an author\'s voice, and each subgenre has its own purpose',
    ['Nonfiction is purely objective fact-reporting, so none of these has an author\'s voice', 'MC-A-NONFICTION-MEANS-PURELY-OBJECTIVE-NEUTRAL-FACT-REPORTING-WITH-NO-AUTHOR-VOICE-OR-INTERPRETATION'],
    ['The three are basically the same thing, since all nonfiction subgenres are interchangeable', 'MC-B-ALL-NONFICTION-SUBGENRES-ESSAY-MEMOIR-BIOGRAPHY-JOURNALISM-ARE-BASICALLY-THE-SAME-THING'],
    'nonfiction has voice; subgenres differ, re-asked with a eulogy, lab report and travel essay'),
  card('eng.literature.prose-nonfiction', 'fill_blank', H,
    'Complete the sentence: nonfiction ____.',
    'carries the author\'s voice, and subgenres differ',
    ['is neutral fact-reporting with no interpretation at all', 'MC-A-NONFICTION-MEANS-PURELY-OBJECTIVE-NEUTRAL-FACT-REPORTING-WITH-NO-AUTHOR-VOICE-OR-INTERPRETATION'],
    ['is one kind of text, whether memoir, journalism or essay', 'MC-B-ALL-NONFICTION-SUBGENRES-ESSAY-MEMOIR-BIOGRAPHY-JOURNALISM-ARE-BASICALLY-THE-SAME-THING'],
    'Replacement texts for both misconceptions'),
  card('eng.literature.prose-nonfiction', 'checkpoint', A,
    'A grant panel treats a memoir chapter and a news report as interchangeable, and expects both to be voiceless fact-reporting. Which assessment is accurate?',
    'Each reflects an author\'s selection and voice, and the genres serve different purposes with different conventions',
    ['The panel is right: nonfiction is neutral reporting with no author voice', 'MC-A-NONFICTION-MEANS-PURELY-OBJECTIVE-NEUTRAL-FACT-REPORTING-WITH-NO-AUTHOR-VOICE-OR-INTERPRETATION'],
    ['The panel is right: the two are basically the same thing', 'MC-B-ALL-NONFICTION-SUBGENRES-ESSAY-MEMOIR-BIOGRAPHY-JOURNALISM-ARE-BASICALLY-THE-SAME-THING'],
    'both misconceptions, with a memoir and a news report'),

  // ─── eng.literature.setting-and-atmosphere ───────────────────────────────
  card('eng.literature.setting-and-atmosphere', 'short_answer', M,
    'One story describes a beach as "a grey sky, empty sand and a bell clanging in the wind"; another shows the same beach with "kites, ice cream and laughing swimmers". A student says a setting is neutral background with no emotional effect, and that a beach can only ever feel cheerful. What is accurate?',
    'Setting details create mood, and one beach can feel lonely or joyful',
    ['A setting is neutral background and has no emotional effect on the reader', 'MC-A-SETTING-IS-JUST-NEUTRAL-BACKGROUND-INFORMATION-WITH-NO-EMOTIONAL-EFFECT'],
    ['A beach can only ever create a cheerful atmosphere, whatever the story does with it', 'MC-B-A-SPECIFIC-SETTING-CAN-ONLY-EVER-CREATE-ONE-FIXED-ATMOSPHERE'],
    'setting creates mood; one place, many atmospheres, re-asked with two beaches'),
  card('eng.literature.setting-and-atmosphere', 'fill_blank', M,
    'Complete the sentence: a setting ____.',
    'shapes the mood, and one place can feel different',
    ['is background information with no emotional effect on the reader', 'MC-A-SETTING-IS-JUST-NEUTRAL-BACKGROUND-INFORMATION-WITH-NO-EMOTIONAL-EFFECT'],
    ['always creates one fixed atmosphere', 'MC-B-A-SPECIFIC-SETTING-CAN-ONLY-EVER-CREATE-ONE-FIXED-ATMOSPHERE'],
    'Replacement texts for both misconceptions'),
  card('eng.literature.setting-and-atmosphere', 'checkpoint', A,
    'A training story places a tense safety briefing in a windowless basement lit by a flickering bulb. A trainee calls the room neutral background and says basements can only create fear. Which assessment is accurate?',
    'The cramped, flickering room builds tension, and the same basement could feel cosy in another story',
    ['He is right: setting is just neutral background with no emotional effect', 'MC-A-SETTING-IS-JUST-NEUTRAL-BACKGROUND-INFORMATION-WITH-NO-EMOTIONAL-EFFECT'],
    ['He is right: a basement can only create one fixed atmosphere', 'MC-B-A-SPECIFIC-SETTING-CAN-ONLY-EVER-CREATE-ONE-FIXED-ATMOSPHERE'],
    'both misconceptions, with a basement briefing'),

  // ─── eng.literature.short-story-study ────────────────────────────────────
  card('eng.literature.short-story-study', 'short_answer', H,
    'A short story spends two pages on one dinner argument and ends with a door closing. A student calls it an unfinished novel, and says the single mention of "a green scarf" must be a deep symbol. What is accurate?',
    'A short story is compressed for one effect, and a scarf needs evidence to be a symbol',
    ['It is just a short novel, with less of everything and the ending left out by mistake', 'MC-A-SHORT-STORY-IS-JUST-A-SHORT-NOVEL'],
    ['Every detail, including the green scarf, must be a deep symbol', 'MC-B-EVERY-DETAIL-MUST-BE-A-DEEP-SYMBOL'],
    'compression is craft; symbols need evidence, re-asked with a dinner argument and a scarf'),
  card('eng.literature.short-story-study', 'fill_blank', H,
    'Complete the sentence: when studying a short story, ____.',
    'ask what its compression does, and seek evidence for symbols',
    ['judge it as a short novel that has been cut down and left unfinished', 'MC-A-SHORT-STORY-IS-JUST-A-SHORT-NOVEL'],
    ['treat every detail as a deep symbol', 'MC-B-EVERY-DETAIL-MUST-BE-A-DEEP-SYMBOL'],
    'Replacement texts for both misconceptions'),
  card('eng.literature.short-story-study', 'checkpoint', A,
    'A workshop leader calls a compact story about one phone call "a novel missing its middle", and insists the caller\'s blue coat, mentioned once, must be a deep symbol. Which assessment is accurate?',
    'The compression is the story\'s craft, and a once-mentioned coat needs textual evidence to count as a symbol',
    ['She is right: a short story is just a short novel', 'MC-A-SHORT-STORY-IS-JUST-A-SHORT-NOVEL'],
    ['She is right: every detail must be a deep symbol', 'MC-B-EVERY-DETAIL-MUST-BE-A-DEEP-SYMBOL'],
    'both misconceptions, with a phone-call story'),

  // ─── eng.literature.symbolism ────────────────────────────────────────────
  card('eng.literature.symbolism', 'short_answer', H,
    'A character\'s flashlight is mentioned six times because the plot is set in a cave. In another story a snake stands for healing, not evil. A student says the flashlight is a symbol since it repeats, and that a snake must always symbolise evil. What is accurate?',
    'Repetition alone does not make a symbol, and meaning comes from the specific story',
    ['The flashlight is a symbol, since any object mentioned repeatedly is a symbol', 'MC-ANY-OBJECT-MENTIONED-REPEATEDLY-IN-A-STORY-IS-AUTOMATICALLY-A-SYMBOL'],
    ['A snake always symbolises evil, because a symbol has one fixed universal meaning everywhere', 'MC-A-SYMBOL-HAS-ONE-FIXED-UNIVERSAL-MEANING-ACROSS-ALL-STORIES'],
    'repetition is not symbolism; meaning is story-specific, re-asked with a flashlight and a snake'),
  card('eng.literature.symbolism', 'fill_blank', H,
    'Complete the sentence: a symbol is ____.',
    'an object the story ties to a larger idea',
    ['any object that is mentioned repeatedly in the story', 'MC-ANY-OBJECT-MENTIONED-REPEATEDLY-IN-A-STORY-IS-AUTOMATICALLY-A-SYMBOL'],
    ['something with one fixed meaning in all stories', 'MC-A-SYMBOL-HAS-ONE-FIXED-UNIVERSAL-MEANING-ACROSS-ALL-STORIES'],
    'Replacement texts for both misconceptions'),
  card('eng.literature.symbolism', 'checkpoint', A,
    'A critic labels a protagonist\'s coffee mug a symbol because it appears nine times at breakfast scenes, and insists a rose must mean love in every story. Which assessment is accurate?',
    'Repetition alone is not symbolism, and a rose means what its specific story makes it mean',
    ['She is right: any object mentioned repeatedly is a symbol', 'MC-ANY-OBJECT-MENTIONED-REPEATEDLY-IN-A-STORY-IS-AUTOMATICALLY-A-SYMBOL'],
    ['She is right: a rose has one fixed meaning across all stories', 'MC-A-SYMBOL-HAS-ONE-FIXED-UNIVERSAL-MEANING-ACROSS-ALL-STORIES'],
    'both misconceptions, with a coffee mug and a rose'),

  // ─── eng.literature.theme-and-message ────────────────────────────────────
  card('eng.literature.theme-and-message', 'short_answer', H,
    'A student states a story\'s theme as "friendship". Two classmates then argue over whether it is "loyalty costs something" or "trust must be earned", insisting only one can be right. What is accurate?',
    '"Friendship" is a topic and a theme is a claim; both statements can be valid',
    ['"Friendship" is already a complete theme, since a theme is the story\'s subject', 'MC-THEME-IS-THE-SAME-AS-THE-TOPIC-OR-SUBJECT-OF-THE-STORY'],
    ['Only one theme statement can be correct, so one classmate must be wrong', 'MC-A-STORY-CAN-ONLY-HAVE-ONE-CORRECT-THEME'],
    'a theme is a claim, not a topic; several themes can hold, re-asked with friendship'),
  card('eng.literature.theme-and-message', 'fill_blank', H,
    'Complete the sentence: a theme should be worded as ____.',
    'a claim about the topic, and a story may have several',
    ['the topic or subject of the story, named in a word or two', 'MC-THEME-IS-THE-SAME-AS-THE-TOPIC-OR-SUBJECT-OF-THE-STORY'],
    ['one single correct message that every reader must find', 'MC-A-STORY-CAN-ONLY-HAVE-ONE-CORRECT-THEME'],
    'Replacement texts for both misconceptions'),
  card('eng.literature.theme-and-message', 'checkpoint', A,
    'A panel records a play\'s theme as "ambition", and rejects a second reviewer\'s "unchecked ambition isolates people" because only one theme can be correct. Which assessment is accurate?',
    '"Ambition" is a topic, while the reviewer\'s sentence is a claim; several evidence-backed themes can coexist',
    ['The panel is right: the theme is the same as the topic', 'MC-THEME-IS-THE-SAME-AS-THE-TOPIC-OR-SUBJECT-OF-THE-STORY'],
    ['The panel is right: a story can have only one correct theme', 'MC-A-STORY-CAN-ONLY-HAVE-ONE-CORRECT-THEME'],
    'both misconceptions, with a play about ambition'),
]
