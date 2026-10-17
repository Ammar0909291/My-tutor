/**
 * ENGLISH CARD-DEPTH CAMPAIGN — Batch 2 (eng.listening, 8 concepts, 24 cards).
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
 * slug and abandon the live row's identity. Each listening concept already uses
 *   native band : mcq, misconception_probe, checkpoint, true_false
 *   ADULT       : mcq, misconception_probe
 * so the three new cards take the FREE slots:
 *   native band (ELEMENTARY or MIDDLE) : short_answer, fill_blank      ADULT : checkpoint
 * Serving never filters by probeKind (`probeToMcq` is the predicate), so the kind is
 * only a slot label.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedProbe } from './brainSeedAssets'

const S = 'english'
const E = GradeBand.ELEMENTARY
const M = GradeBand.MIDDLE
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


export const ENGLISH_CARD_DEPTH_BATCH_2: SeedProbe[] = [
  // ─── eng.listening.active-listening ──────────────────────────────────────
  card('eng.listening.active-listening', 'short_answer', E,
    'Your friend tells you about her holiday. Which of these shows that you are really listening?',
    'You look at her, nod, and later ask, "What was your favourite part?"',
    ['You hear every word while you think about your next game', 'MC-HEARING-EQUALS-LISTENING'],
    ['You stay completely quiet and still, so you never get in her way', 'MC-ACTIVE-LISTENING-MEANS-STAYING-SILENT'],
    'hearing vs. listening and engaged silence, re-asked with a holiday story'),
  card('eng.listening.active-listening', 'fill_blank', E,
    'Complete the sentence: a good listener ____.',
    'pays attention to the meaning and shows they are following',
    ['hears the words, even if their mind is somewhere else', 'MC-HEARING-EQUALS-LISTENING'],
    ['keeps totally silent and never says a single thing', 'MC-ACTIVE-LISTENING-MEANS-STAYING-SILENT'],
    'Replacement text for both misconceptions'),
  card('eng.listening.active-listening', 'checkpoint', A,
    'On a project call, Ines nods, keeps her camera on, and at a natural pause asks, "So the deadline moved to the 12th?" Which description fits?',
    'Active listening: she shows engagement and checks her understanding',
    ['Rude interruption: real listeners stay silent until the speaker has completely finished', 'MC-ACTIVE-LISTENING-MEANS-STAYING-SILENT'],
    ['Unnecessary: once every word has been heard, the listening is already done', 'MC-HEARING-EQUALS-LISTENING'],
    'both misconceptions, in a workplace setting'),

  // ─── eng.listening.critical-listening ────────────────────────────────────
  card('eng.listening.critical-listening', 'short_answer', M,
    'Two students argue for a longer lunch break. Maya speaks calmly and cites a survey of 300 students. Leo is very confident but only says, "Everyone knows it." Whose argument is stronger?',
    'Maya\'s, because the survey is real evidence for her claim',
    ['Leo\'s, because he sounds so sure of himself', 'MC-A-A-CONFIDENT-FLUENT-SPEAKER-IS-MAKING-A-STRONGER-ARGUMENT'],
    ['Neither is stronger, because each gave some kind of support', 'MC-B-ANY-EVIDENCE-A-SPEAKER-MENTIONS-PROVES-THEIR-POINT-EQUALLY-WELL'],
    'delivery vs. evidence quality, re-asked with a lunch-break debate'),
  card('eng.listening.critical-listening', 'fill_blank', M,
    'Complete the sentence: when judging a spoken argument, listen mainly for ____.',
    'how good the evidence behind the claim is',
    ['how confident and fluent the speaker sounds', 'MC-A-A-CONFIDENT-FLUENT-SPEAKER-IS-MAKING-A-STRONGER-ARGUMENT'],
    ['how many examples are named, whatever their source', 'MC-B-ANY-EVIDENCE-A-SPEAKER-MENTIONS-PROVES-THEIR-POINT-EQUALLY-WELL'],
    'both misconceptions, stated as the principle'),
  card('eng.listening.critical-listening', 'checkpoint', A,
    'One vendor presents with great polish but offers only "many clients like us" as proof. Another stumbles slightly but shows a twelve-month trial result. Which should a careful listener trust more?',
    'The second, because a documented trial is stronger evidence than a general claim',
    ['The first, because a fluent, polished delivery signals a stronger case', 'MC-A-A-CONFIDENT-FLUENT-SPEAKER-IS-MAKING-A-STRONGER-ARGUMENT'],
    ['Neither more than the other, since both mentioned some evidence', 'MC-B-ANY-EVIDENCE-A-SPEAKER-MENTIONS-PROVES-THEIR-POINT-EQUALLY-WELL'],
    'both misconceptions, in a workplace setting'),

  // ─── eng.listening.distinguishing-sounds-in-speech ───────────────────────
  card('eng.listening.distinguishing-sounds-in-speech', 'short_answer', M,
    'In a kitchen someone says, "Please pass the cap" or "cup" — both words fit the situation. What is the best way to decide?',
    'Listen closely to the vowel, or ask for a repeat, because context cannot decide here',
    ['Choose from context alone; the situation always tells you which word it was', 'MC-A-YOU-CAN-ALWAYS-TELL-SIMILAR-SOUNDING-WORDS-APART-JUST-BY-USING-SENTENCE-CONTEXT'],
    ['Nothing more is needed: you heard cap and cup apart in slow speech, so you will always catch it', 'MC-B-IF-YOU-CAN-DISTINGUISH-A-MINIMAL-PAIR-IN-CAREFUL-ISOLATED-SPEECH-YOULL-AUTOMATICALLY-DISTINGUISH-IT-IN-FAST-CONNECTED-SPEECH'],
    'both misconceptions, re-asked with the cap/cup pair'),
  card('eng.listening.distinguishing-sounds-in-speech', 'fill_blank', M,
    'Complete the sentence: you can hear "full" and "fool" as different when they are said slowly, but in fast, connected speech you ____.',
    'may still miss the difference, so you need practice at natural speed',
    ['will hear the difference just as clearly, with no extra practice', 'MC-B-IF-YOU-CAN-DISTINGUISH-A-MINIMAL-PAIR-IN-CAREFUL-ISOLATED-SPEECH-YOULL-AUTOMATICALLY-DISTINGUISH-IT-IN-FAST-CONNECTED-SPEECH'],
    ['can always work it out from the other words in the sentence', 'MC-A-YOU-CAN-ALWAYS-TELL-SIMILAR-SOUNDING-WORDS-APART-JUST-BY-USING-SENTENCE-CONTEXT'],
    'isolated vs. connected speech (WE-1)'),
  card('eng.listening.distinguishing-sounds-in-speech', 'checkpoint', A,
    'On a fast call a supplier says, "We can ship it Friday." It could be "can" or "can\'t", and both fit the conversation. What is the best response?',
    'Check the vowel and stress, or confirm by asking, "Can or can\'t?"',
    ['Rely on context: the rest of the sentence will make it obvious', 'MC-A-YOU-CAN-ALWAYS-TELL-SIMILAR-SOUNDING-WORDS-APART-JUST-BY-USING-SENTENCE-CONTEXT'],
    ['Do nothing: anyone who hears can and can\'t clearly when said slowly will hear them just as clearly at speed', 'MC-B-IF-YOU-CAN-DISTINGUISH-A-MINIMAL-PAIR-IN-CAREFUL-ISOLATED-SPEECH-YOULL-AUTOMATICALLY-DISTINGUISH-IT-IN-FAST-CONNECTED-SPEECH'],
    'both misconceptions, in a workplace setting'),

  // ─── eng.listening.following-instructions ────────────────────────────────
  card('eng.listening.following-instructions', 'short_answer', E,
    'Your teacher says, "Before you hand in your page, check your spelling. Then put it in the blue tray." What should you do first?',
    'Listen to all of it, then check your spelling before anything else',
    ['Start moving the moment you hear "hand in your page", before the teacher is finished', 'MC-A-ACTING-IMMEDIATELY-ON-THE-FIRST-INSTRUCTION-HEARD-IS-THE-RIGHT-APPROACH'],
    ['Hand in the page first, because it was the first thing mentioned', 'MC-B-INSTRUCTIONS-ARE-ALWAYS-EXECUTED-IN-THE-SAME-ORDER-THEY-ARE-MENTIONED'],
    'listen to the whole instruction; "before" reverses the order (WE-1), re-asked with a spelling check'),
  card('eng.listening.following-instructions', 'fill_blank', E,
    'Complete the sentence: with a spoken instruction that has several steps, you should ____ before you begin.',
    'listen to the whole instruction and work out the order',
    ['start straight away on the first step you hear', 'MC-A-ACTING-IMMEDIATELY-ON-THE-FIRST-INSTRUCTION-HEARD-IS-THE-RIGHT-APPROACH'],
    ['plan to do the steps in the same order they were said, every time', 'MC-B-INSTRUCTIONS-ARE-ALWAYS-EXECUTED-IN-THE-SAME-ORDER-THEY-ARE-MENTIONED'],
    'both misconceptions, stated as the principle'),
  card('eng.listening.following-instructions', 'checkpoint', A,
    'A colleague says, "After you update the spreadsheet, email it to Dana, but before you update it, back up the old version." In what order should the three actions happen?',
    'Back up the old version, update the spreadsheet, then email it to Dana',
    ['Update the spreadsheet right away, then fit in the other steps as you hear them', 'MC-A-ACTING-IMMEDIATELY-ON-THE-FIRST-INSTRUCTION-HEARD-IS-THE-RIGHT-APPROACH'],
    ['Update, email, then back up, which is the order they were said', 'MC-B-INSTRUCTIONS-ARE-ALWAYS-EXECUTED-IN-THE-SAME-ORDER-THEY-ARE-MENTIONED'],
    'both misconceptions, in a workplace setting'),

  // ─── eng.listening.listening-comprehension-strategies ────────────────────
  card('eng.listening.listening-comprehension-strategies', 'short_answer', M,
    'In a lecture you miss the word "hypothesis", but the speaker goes on to describe testing an idea with an experiment. What is the best strategy?',
    'Keep listening and use the context to work out roughly what it means',
    ['Stop and focus on the missed word, because good listeners understand every word the first time', 'MC-A-GOOD-LISTENERS-UNDERSTAND-EVERY-WORD-PERFECTLY-THE-FIRST-TIME'],
    ['Pick any meaning at random and treat it as certainly right', 'MC-B-PREDICTING-WHAT-COMES-NEXT-MEANS-GUESSING-RANDOMLY-OR-JUST-ASSUMING-YOURE-RIGHT'],
    'context over perfection, re-asked with the word "hypothesis"'),
  card('eng.listening.listening-comprehension-strategies', 'fill_blank', M,
    'Complete the sentence: when you predict what a speaker will say next, you should ____.',
    'use context and signal words, then check and adjust as you listen',
    ['guess at random and assume the guess is right', 'MC-B-PREDICTING-WHAT-COMES-NEXT-MEANS-GUESSING-RANDOMLY-OR-JUST-ASSUMING-YOURE-RIGHT'],
    ['wait until you understand every word before predicting anything', 'MC-A-GOOD-LISTENERS-UNDERSTAND-EVERY-WORD-PERFECTLY-THE-FIRST-TIME'],
    'prediction at "however" (WE-1)'),
  card('eng.listening.listening-comprehension-strategies', 'checkpoint', A,
    'In an online seminar the presenter says, "Unexpectedly, the pilot results showed…" A listener thinks, "A surprise is coming, probably a negative result," then hears a positive one and adjusts. What does this show?',
    'Good prediction: signal words guided a sensible guess, and the listener updated it',
    ['Poor listening: prediction is random guessing, so a wrong guess means failure', 'MC-B-PREDICTING-WHAT-COMES-NEXT-MEANS-GUESSING-RANDOMLY-OR-JUST-ASSUMING-YOURE-RIGHT'],
    ['Poor listening: a good listener would have understood every word first time and needed no guess', 'MC-A-GOOD-LISTENERS-UNDERSTAND-EVERY-WORD-PERFECTLY-THE-FIRST-TIME'],
    'both misconceptions, in a workplace setting'),

  // ─── eng.listening.listening-for-detail ──────────────────────────────────
  card('eng.listening.listening-for-detail', 'short_answer', E,
    'An announcement says, "The zoo bus leaves from gate 4 at ten o\'clock." You are asked for the gate and the time, but you only caught the gate. What should you do?',
    'Say the gate you caught and, if you can, listen again for the time',
    ['Say nothing, because missing the time means the whole task has failed', 'MC-IF-YOU-MISS-ONE-DETAIL-THE-WHOLE-LISTENING-TASK-FAILED'],
    ['Decide you must catch every word, and ask for the whole announcement again', 'MC-LISTENING-FOR-DETAIL-MEANS-TRYING-TO-CATCH-EVERY-WORD'],
    'independent details, re-asked with a bus announcement'),
  card('eng.listening.listening-for-detail', 'fill_blank', E,
    'Complete the sentence: when you listen for one detail, such as a time, ____.',
    'decide what you need first and listen mainly for that',
    ['try to catch every word the speaker says', 'MC-LISTENING-FOR-DETAIL-MEANS-TRYING-TO-CATCH-EVERY-WORD'],
    ['missing it once means you have failed the whole task', 'MC-IF-YOU-MISS-ONE-DETAIL-THE-WHOLE-LISTENING-TASK-FAILED'],
    'Replacement text for both misconceptions'),
  card('eng.listening.listening-for-detail', 'checkpoint', A,
    'A voicemail gives a delivery date, a postcode and a contact name. A listener catches the date and the name, but the postcode was unclear. What is the right way to treat this?',
    'Record the date and name, and replay or ask only for the postcode',
    ['Discard everything, since the task failed once one detail was missed', 'MC-IF-YOU-MISS-ONE-DETAIL-THE-WHOLE-LISTENING-TASK-FAILED'],
    ['Replay and write out every word of the voicemail to be sure', 'MC-LISTENING-FOR-DETAIL-MEANS-TRYING-TO-CATCH-EVERY-WORD'],
    'both misconceptions, in a workplace setting'),

  // ─── eng.listening.listening-for-gist ────────────────────────────────────
  card('eng.listening.listening-for-gist', 'short_answer', E,
    'You hear a recording about a sunny day, a picnic and the park, but you miss some of the words. What can you tell about it?',
    'It is about a sunny picnic in the park, and that is the gist',
    ['Nothing, because you did not understand every word', 'MC-MUST-UNDERSTAND-EVERY-WORD-TO-UNDERSTAND-THE-GIST'],
    ['Not much that counts, since gist is a weak skill that only beginners rely on', 'MC-GIST-LISTENING-IS-A-LOWER-SKILL-THAN-DETAILED-LISTENING'],
    'key content words give the gist (WE-1), re-asked with a picnic recording'),
  card('eng.listening.listening-for-gist', 'fill_blank', E,
    'Complete the sentence: to get the gist of a talk, you should ____.',
    'listen for the key words and main topic, and let small words go',
    ['make sure you understand every single word', 'MC-MUST-UNDERSTAND-EVERY-WORD-TO-UNDERSTAND-THE-GIST'],
    ['treat it as an easy skill that only beginners need', 'MC-GIST-LISTENING-IS-A-LOWER-SKILL-THAN-DETAILED-LISTENING'],
    'Replacement text for both misconceptions'),
  card('eng.listening.listening-for-gist', 'checkpoint', A,
    'Before a long meeting recording, an expert listener plays it quickly to see what each section is about, then returns to the sections that matter. How should this be judged?',
    'A skilled, deliberate strategy that fluent listeners use to preview and filter',
    ['A beginner\'s shortcut: real skill means listening to every detail from the start', 'MC-GIST-LISTENING-IS-A-LOWER-SKILL-THAN-DETAILED-LISTENING'],
    ['A mistake: a recording cannot be grasped unless every word was understood', 'MC-MUST-UNDERSTAND-EVERY-WORD-TO-UNDERSTAND-THE-GIST'],
    'both misconceptions, in a workplace setting'),

  // ─── eng.listening.note-taking-while-listening ───────────────────────────
  card('eng.listening.note-taking-while-listening', 'short_answer', M,
    'A speaker says, "There are three causes of the flood: heavy rain, a blocked river, and weak banks." Which note is best?',
    '"Flood causes: 1 rain 2 blocked river 3 weak banks"',
    ['"There are three causes of the flood: heavy rain, a blocked river, and weak banks."', 'MC-A-GOOD-NOTES-MEANS-WRITING-DOWN-AS-MUCH-AS-POSSIBLE-WORD-FOR-WORD'],
    ['"flood, rain, river, three, banks, weak, causes"', 'MC-B-NOTE-TAKING-IS-JUST-WRITING-DOWN-RANDOM-FACTS-AS-THEY-COME-UP-WITH-NO-STRUCTURE'],
    'short structured notes, re-asked with a flood-causes statement'),
  card('eng.listening.note-taking-while-listening', 'fill_blank', M,
    'Complete the sentence: good notes are made of ____.',
    'short phrases arranged to show how the ideas connect',
    ['full sentences copied word for word', 'MC-A-GOOD-NOTES-MEANS-WRITING-DOWN-AS-MUCH-AS-POSSIBLE-WORD-FOR-WORD'],
    ['separate facts jotted down in whatever order they arrive', 'MC-B-NOTE-TAKING-IS-JUST-WRITING-DOWN-RANDOM-FACTS-AS-THEY-COME-UP-WITH-NO-STRUCTURE'],
    'Replacement text for both misconceptions'),
  card('eng.listening.note-taking-while-listening', 'checkpoint', A,
    'A trainer says, "Two risks: cost, which is high, and delay, although that matters less." One participant writes it all out in full sentences; another writes "Risks: 1) cost, high 2) delay, minor". Which approach is better?',
    'The second: short, structured notes capture the ideas and their relative importance',
    ['The first: complete sentences are the best record of what was said', 'MC-A-GOOD-NOTES-MEANS-WRITING-DOWN-AS-MUCH-AS-POSSIBLE-WORD-FOR-WORD'],
    ['Neither matters: notes are just facts jotted down as they come up', 'MC-B-NOTE-TAKING-IS-JUST-WRITING-DOWN-RANDOM-FACTS-AS-THEY-COME-UP-WITH-NO-STRUCTURE'],
    'both misconceptions, in a workplace setting'),
]
