/**
 * ENGLISH CARD-DEPTH CAMPAIGN — Batch 1 (eng.speaking, 10 concepts, 30 cards).
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
 * slug and abandon the live row's identity. Each speaking concept already uses
 *   native band : mcq, misconception_probe, checkpoint, true_false
 *   ADULT       : mcq, misconception_probe
 * so the three new cards take the FREE slots:
 *   native band : short_answer, fill_blank      ADULT : checkpoint
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

export const ENGLISH_CARD_DEPTH_BATCH_1: SeedProbe[] = [
  // ─── eng.speaking.asking-and-answering-questions ─────────────────────────
  card('eng.speaking.asking-and-answering-questions', 'short_answer', M,
    'Your friend asks, "Where did you put my umbrella?" Which reply actually answers the question?',
    '"I left it by the front door."',
    ['"Yes, I did."', 'MC-A-YES-OR-NO-ANSWER-IS-ALWAYS-A-COMPLETE-ANSWER'],
    ['"It rained a lot today, and umbrellas are useful."', 'MC-A-GOOD-QUESTION-CAN-BE-ANSWERED-WITH-ANYTHING-RELATED-TO-THE-TOPIC'],
    'both misconceptions, re-asked with the umbrella-location question'),
  card('eng.speaking.asking-and-answering-questions', 'fill_blank', M,
    'Complete the sentence: "What is your favourite sport, and why?" is answered well only when the reply ____.',
    'names a sport and gives a reason',
    ['says a clear "Yes" or "No"', 'MC-A-YES-OR-NO-ANSWER-IS-ALWAYS-A-COMPLETE-ANSWER'],
    ['talks about sports in some way', 'MC-A-GOOD-QUESTION-CAN-BE-ANSWERED-WITH-ANYTHING-RELATED-TO-THE-TOPIC'],
    'question-type matching (WE-1) and the bullseye-vs-near-miss idea (WE-2)'),
  card('eng.speaking.asking-and-answering-questions', 'checkpoint', A,
    'A manager asks, "Which supplier did we choose, and what was the main reason?" Which response answers the request?',
    '"We chose Alder Tools, because their delivery times were the shortest."',
    ['"Yes, we did choose one, and the whole team is happy with that decision."', 'MC-A-YES-OR-NO-ANSWER-IS-ALWAYS-A-COMPLETE-ANSWER'],
    ['"Suppliers across the industry have raised prices this year."', 'MC-A-GOOD-QUESTION-CAN-BE-ANSWERED-WITH-ANYTHING-RELATED-TO-THE-TOPIC'],
    'both misconceptions, in a workplace setting with a two-part question'),

  // ─── eng.speaking.conversation-skills ────────────────────────────────────
  card('eng.speaking.conversation-skills', 'short_answer', M,
    'After Dana finishes describing her trip, Sam waits two seconds and then asks about her favourite part. Which statement is accurate?',
    'A short pause to think before replying is a normal part of conversation',
    ['A pause like that means the conversation has gone wrong and needs rescuing', 'MC-SILENCE-IN-A-CONVERSATION-MEANS-SOMETHING-WENT-WRONG'],
    ['Sam should have talked more, because more talking is better', 'MC-GOOD-CONVERSATION-MEANS-TALKING-A-LOT'],
    'both misconceptions, re-asked with the trip-description example'),
  card('eng.speaking.conversation-skills', 'fill_blank', M,
    'Complete the sentence: a conversation is going well when both people get fair turns and ____.',
    'each responds to what the other said',
    ['one person speaks for as long as possible', 'MC-GOOD-CONVERSATION-MEANS-TALKING-A-LOT'],
    ['nobody lets a single pause happen', 'MC-SILENCE-IN-A-CONVERSATION-MEANS-SOMETHING-WENT-WRONG'],
    'balanced vs. monopolised turn-taking (WE-1)'),
  card('eng.speaking.conversation-skills', 'checkpoint', A,
    'In a hallway chat, Priya talks for six minutes about her project while her colleague Omar says only "Right" twice. Priya thinks it was a great conversation. How should it be judged?',
    'It was lopsided: a good conversation shares turns and responds to the other person',
    ['It was a great conversation, because the more a person talks, the better their conversation skills', 'MC-GOOD-CONVERSATION-MEANS-TALKING-A-LOT'],
    ['It was fine, because no pause was ever allowed to happen', 'MC-SILENCE-IN-A-CONVERSATION-MEANS-SOMETHING-WENT-WRONG'],
    'both misconceptions, in a workplace setting'),

  // ─── eng.speaking.debate-skills ──────────────────────────────────────────
  card('eng.speaking.debate-skills', 'short_answer', H,
    'In a debate, your opponent argues that homework improves grades. Which rebuttal is strongest and still respectful?',
    '"The study you cite covered one school, so it cannot show that homework raises grades everywhere."',
    ['"As I said in my opening, homework should be banned, and nothing my opponent has said changes that."', 'MC-A-WINNING-A-DEBATE-MEANS-DELIVERING-YOUR-PREPARED-ARGUMENTS-REGARDLESS-OF-WHAT-THE-OPPONENT-ACTUALLY-SAYS'],
    ['"I would rather not challenge that directly, because firm disagreement is disrespectful."', 'MC-B-BEING-FORCEFUL-OR-DIRECTLY-CHALLENGING-AN-OPPONENTS-ARGUMENT-MEANS-BEING-DISRESPECTFUL-OR-HOSTILE'],
    'rebuttal that engages the specific claim (WE-1), re-asked with the homework topic'),
  card('eng.speaking.debate-skills', 'fill_blank', H,
    'Complete the sentence: in a debate, the most effective way to answer a claim is to ____.',
    'address that specific claim with evidence, in respectful words',
    ['repeat your prepared points, whatever the claim was', 'MC-A-WINNING-A-DEBATE-MEANS-DELIVERING-YOUR-PREPARED-ARGUMENTS-REGARDLESS-OF-WHAT-THE-OPPONENT-ACTUALLY-SAYS'],
    ['avoid sharp disagreement, since a firm challenge is hostile', 'MC-B-BEING-FORCEFUL-OR-DIRECTLY-CHALLENGING-AN-OPPONENTS-ARGUMENT-MEANS-BEING-DISRESPECTFUL-OR-HOSTILE'],
    'both misconceptions, stated as the principle'),
  card('eng.speaking.debate-skills', 'checkpoint', A,
    'At a budget meeting a colleague says, "Your forecast assumes 10% growth, but last year we managed only 4%." Which reply best handles the challenge?',
    '"Fair point about the 4%. The 10% rests on two new contracts, and here is why they change the picture."',
    ['"Let me carry on with my slides; the forecast is on page nine."', 'MC-A-WINNING-A-DEBATE-MEANS-DELIVERING-YOUR-PREPARED-ARGUMENTS-REGARDLESS-OF-WHAT-THE-OPPONENT-ACTUALLY-SAYS'],
    ['"That sounded confrontational, so I will not answer a challenge put to me so bluntly in front of the whole team."', 'MC-B-BEING-FORCEFUL-OR-DIRECTLY-CHALLENGING-AN-OPPONENTS-ARGUMENT-MEANS-BEING-DISRESPECTFUL-OR-HOSTILE'],
    'both misconceptions, in a workplace setting'),

  // ─── eng.speaking.discussion-skills ──────────────────────────────────────
  card('eng.speaking.discussion-skills', 'short_answer', M,
    'In a group discussion about a school trip, Ali says, "We should visit the science museum." You think the tickets cost too much. Which contribution helps the group most?',
    '"I see why the museum appeals, but tickets are costly. Could we check the group price first?"',
    ['Say nothing at all and let the idea stand, because disagreeing out loud would be rude', 'MC-DISAGREEING-MEANS-BEING-RUDE-OR-CONFRONTATIONAL'],
    ['"Let us talk about something new instead: what is everyone planning to have for lunch on the trip?"', 'MC-A-GOOD-DISCUSSION-CONTRIBUTION-MEANS-INTRODUCING-A-NEW-IDEA'],
    'respectful disagreement as a contribution, re-asked with the museum-trip example'),
  card('eng.speaking.discussion-skills', 'fill_blank', M,
    'Complete the sentence: in a discussion, a valuable contribution can be to ____ what someone just said.',
    'extend it or connect it to another point',
    ['agree with it, even when you disagree, to avoid sounding rude', 'MC-DISAGREEING-MEANS-BEING-RUDE-OR-CONFRONTATIONAL'],
    ['set it aside so that only brand-new ideas get shared', 'MC-A-GOOD-DISCUSSION-CONTRIBUTION-MEANS-INTRODUCING-A-NEW-IDEA'],
    'contribution-type labelling (WE-1): building on and connecting'),
  card('eng.speaking.discussion-skills', 'checkpoint', A,
    'In a planning meeting, Lena proposes moving the launch to March. Kofi thinks that date is unrealistic. Which contribution helps the group most?',
    '"I see the appeal of March, but testing takes six weeks. Could we look at April?"',
    ['Kofi nods along and says nothing, to keep the meeting friendly and avoid any conflict', 'MC-DISAGREEING-MEANS-BEING-RUDE-OR-CONFRONTATIONAL'],
    ['Kofi changes the subject to holiday schedules, since only a fresh idea counts', 'MC-A-GOOD-DISCUSSION-CONTRIBUTION-MEANS-INTRODUCING-A-NEW-IDEA'],
    'both misconceptions, in a workplace setting'),

  // ─── eng.speaking.non-verbal-communication ───────────────────────────────
  card('eng.speaking.non-verbal-communication', 'short_answer', M,
    'A new classmate from another country looks down instead of at you while greeting you. How should you read this?',
    'It may show respect in their culture, so do not assume it means rudeness',
    ['It means the same as it would in your culture: they are being rude', 'MC-A-NON-VERBAL-CUES-LIKE-EYE-CONTACT-AND-GESTURE-MEAN-THE-SAME-THING-IN-EVERY-CULTURE'],
    ['It does not matter, because only the spoken words carry the message', 'MC-B-NON-VERBAL-COMMUNICATION-IS-JUST-A-MINOR-ADDITION-TO-THE-REAL-MESSAGE-WHICH-IS-THE-SPOKEN-WORDS'],
    'cultural variability of eye contact, re-asked with a greeting scenario'),
  card('eng.speaking.non-verbal-communication', 'fill_blank', M,
    'Complete the sentence: gestures and facial expressions ____.',
    'carry real meaning, but that meaning can differ between cultures',
    ['mean exactly the same thing everywhere in the world', 'MC-A-NON-VERBAL-CUES-LIKE-EYE-CONTACT-AND-GESTURE-MEAN-THE-SAME-THING-IN-EVERY-CULTURE'],
    ['are only a minor extra beside the spoken words', 'MC-B-NON-VERBAL-COMMUNICATION-IS-JUST-A-MINOR-ADDITION-TO-THE-REAL-MESSAGE-WHICH-IS-THE-SPOKEN-WORDS'],
    'both misconceptions, stated as the principle'),
  card('eng.speaking.non-verbal-communication', 'checkpoint', A,
    'A manager from a culture where steady eye contact is polite notices that a visiting colleague rarely meets her gaze. What is the sound conclusion?',
    'Nothing certain yet: the same cue can mean something different in the colleague\'s culture',
    ['The colleague is hiding something, because steady eye contact always signals honesty in every culture', 'MC-A-NON-VERBAL-CUES-LIKE-EYE-CONTACT-AND-GESTURE-MEAN-THE-SAME-THING-IN-EVERY-CULTURE'],
    ['The gaze is irrelevant, because only the spoken words carry the real message', 'MC-B-NON-VERBAL-COMMUNICATION-IS-JUST-A-MINOR-ADDITION-TO-THE-REAL-MESSAGE-WHICH-IS-THE-SPOKEN-WORDS'],
    'both misconceptions, in a workplace setting'),

  // ─── eng.speaking.oral-fluency ───────────────────────────────────────────
  card('eng.speaking.oral-fluency', 'short_answer', M,
    'A speaker pauses briefly twice to think and makes one small grammar slip, but the talk keeps flowing. What does this show?',
    'Fluency is smooth overall flow, which can include pauses and small slips',
    ['The speaker is not fluent, because fluent speech has no hesitation', 'MC-FLUENCY-MEANS-ZERO-HESITATION'],
    ['The speaker must stop to fix each slip, because fluency needs perfect grammar', 'MC-FLUENCY-REQUIRES-PERFECT-GRAMMAR'],
    'natural hesitation and small errors (WE-1), re-asked with a flowing-talk example'),
  card('eng.speaking.oral-fluency', 'fill_blank', M,
    'Complete the sentence: when you cannot think of a word mid-answer, it is better to ____.',
    'use a short filler such as "let me think" and carry on',
    ['stay silent until you can speak with no hesitation at all', 'MC-FLUENCY-MEANS-ZERO-HESITATION'],
    ['stop and restart the sentence until the grammar is perfect', 'MC-FLUENCY-REQUIRES-PERFECT-GRAMMAR'],
    'strategic pausing (WE-2)'),
  card('eng.speaking.oral-fluency', 'checkpoint', A,
    'During a presentation Q&A a speaker says, "The, um, projected — sorry, the projected figure is four per cent," and continues smoothly. How should a listener judge their fluency?',
    'Fluent: a brief restart is normal in natural speech',
    ['Not fluent: fluent speakers never hesitate or restart', 'MC-FLUENCY-MEANS-ZERO-HESITATION'],
    ['Not fluent: the restart proves the grammar was not perfect', 'MC-FLUENCY-REQUIRES-PERFECT-GRAMMAR'],
    'both misconceptions, in a workplace setting'),

  // ─── eng.speaking.presentation-skills ────────────────────────────────────
  card('eng.speaking.presentation-skills', 'short_answer', H,
    'A student has ten minutes to present on volcanoes. Which plan is strongest?',
    'Choose three key points for the audience and explain each with one clear example',
    ['Put the full script on the slides so nothing is forgotten', 'MC-VISUAL-AIDS-SHOULD-CONTAIN-EVERYTHING-THE-SPEAKER-WILL-SAY'],
    ['Cover every fact found about volcanoes so the talk looks thorough', 'MC-A-GOOD-PRESENTATION-COVERS-AS-MUCH-INFORMATION-AS-POSSIBLE'],
    'selective focus (WE-2) and slide density (WE-1), re-asked with a volcano topic'),
  card('eng.speaking.presentation-skills', 'fill_blank', H,
    'Complete the sentence: a slide supports a talk best when it shows ____.',
    'a key phrase or image that reinforces what the speaker says',
    ['the full text of everything the speaker plans to say', 'MC-VISUAL-AIDS-SHOULD-CONTAIN-EVERYTHING-THE-SPEAKER-WILL-SAY'],
    ['as many facts as will fit, to show thoroughness', 'MC-A-GOOD-PRESENTATION-COVERS-AS-MUCH-INFORMATION-AS-POSSIBLE'],
    'both misconceptions, stated as the principle'),
  card('eng.speaking.presentation-skills', 'checkpoint', A,
    'A product manager has eight minutes to brief executives on a new app. Which approach is best?',
    'Pick the three results executives care about most and show one simple chart for each',
    ['Paste the complete script onto each slide and then read every slide aloud to the board', 'MC-VISUAL-AIDS-SHOULD-CONTAIN-EVERYTHING-THE-SPEAKER-WILL-SAY'],
    ['List all twenty features in equal detail so nothing seems missing', 'MC-A-GOOD-PRESENTATION-COVERS-AS-MUCH-INFORMATION-AS-POSSIBLE'],
    'both misconceptions, in a workplace setting'),

  // ─── eng.speaking.pronunciation-in-conversation ──────────────────────────
  card('eng.speaking.pronunciation-in-conversation', 'short_answer', M,
    'A learner says "baNAna" with the correct stress but a vowel slightly different from a native speaker\'s. Is the word likely to be understood?',
    'Yes: correct stress usually keeps a word recognisable even when one vowel differs',
    ['No: every individual sound must be perfect before listeners can understand', 'MC-PERFECT-INDIVIDUAL-SOUNDS-MORE-IMPORTANT-THAN-STRESS-AND-INTONATION'],
    ['No: only a native-like accent makes a word understandable', 'MC-NATIVE-LIKE-ACCENT-IS-THE-GOAL'],
    'stress vs. individual sounds (WE-1 discrimination pair), re-asked with "banana"'),
  card('eng.speaking.pronunciation-in-conversation', 'fill_blank', M,
    'Complete the sentence: for clear conversation, a learner\'s pronunciation goal should be to be ____.',
    'easily understood, even with some accent',
    ['indistinguishable from a native speaker', 'MC-NATIVE-LIKE-ACCENT-IS-THE-GOAL'],
    ['perfect on every single sound, whatever the stress', 'MC-PERFECT-INDIVIDUAL-SOUNDS-MORE-IMPORTANT-THAN-STRESS-AND-INTONATION'],
    'intelligibility as the goal (Replacement text, MC-NATIVE-LIKE-ACCENT-IS-THE-GOAL)'),
  card('eng.speaking.pronunciation-in-conversation', 'checkpoint', A,
    'An engineer has a clear regional accent, stresses words correctly and is understood in every meeting. His coach suggests spending a month removing the accent. What is the best advice?',
    'Keep working on features that affect understanding; the accent itself need not go',
    ['Follow the coach: sounding exactly like a native speaker is the real goal of pronunciation work', 'MC-NATIVE-LIKE-ACCENT-IS-THE-GOAL'],
    ['Drill each individual sound until perfect; stress matters less', 'MC-PERFECT-INDIVIDUAL-SOUNDS-MORE-IMPORTANT-THAN-STRESS-AND-INTONATION'],
    'both misconceptions, in a workplace setting'),

  // ─── eng.speaking.public-speaking-basics ─────────────────────────────────
  card('eng.speaking.public-speaking-basics', 'short_answer', M,
    'Before reading her poem aloud, Mei feels butterflies in her stomach. What is the best way for her to think about this?',
    'It is a normal body response; she can feel nervous and still speak well',
    ['It means she will do badly, so she should not speak', 'MC-NERVOUSNESS-BEFORE-SPEAKING-MEANS-YOU-WILL-DO-BADLY'],
    ['She can only calm down by memorising every word exactly', 'MC-A-GOOD-SPEAKER-MEMORIZES-EVERY-WORD-AND-RECITES-IT-EXACTLY'],
    'nervousness reframing (WE-1), re-asked with a poem-reading scenario'),
  card('eng.speaking.public-speaking-basics', 'fill_blank', M,
    'Complete the sentence: a flexible way to prepare a talk is to practise from ____.',
    'a few key points, said in your own words',
    ['a script memorised and recited word for word', 'MC-A-GOOD-SPEAKER-MEMORIZES-EVERY-WORD-AND-RECITES-IT-EXACTLY'],
    ['a feeling of calm, speaking only once the nerves have gone', 'MC-NERVOUSNESS-BEFORE-SPEAKING-MEANS-YOU-WILL-DO-BADLY'],
    'key-points delivery (Replacement text, MC-A-GOOD-SPEAKER-MEMORIZES-EVERY-WORD-AND-RECITES-IT-EXACTLY)'),
  card('eng.speaking.public-speaking-basics', 'checkpoint', A,
    'Ravi must give a five-minute update to the board. He plans to memorise his script and recite it exactly, and he fears his nerves mean it will go badly. Which advice fits best?',
    'Prepare key points and practise them naturally; nerves are normal and do not predict failure',
    ['Wait until the nervousness fully disappears, since nerves reliably signal a poor talk', 'MC-NERVOUSNESS-BEFORE-SPEAKING-MEANS-YOU-WILL-DO-BADLY'],
    ['Memorise every single word of the script, so that nothing at all is left to chance on the day', 'MC-A-GOOD-SPEAKER-MEMORIZES-EVERY-WORD-AND-RECITES-IT-EXACTLY'],
    'both misconceptions, in a workplace setting'),

  // ─── eng.speaking.storytelling-orally ────────────────────────────────────
  card('eng.speaking.storytelling-orally', 'short_answer', M,
    'You are telling friends about the day your kite got stuck in a tree. Which is the better way to tell it?',
    'Pick the key moments, speed up for the chase and slow down for the suspense',
    ['Include every detail in exact order, from what you ate at breakfast to going to bed', 'MC-A-A-GOOD-ORAL-STORY-INCLUDES-EVERY-DETAIL-IN-EXACT-ORDER'],
    ['Use an even, steady voice, because tone is only decoration', 'MC-B-VOCAL-EXPRESSION-IS-AN-OPTIONAL-EXTRA-SEPARATE-FROM-THE-REAL-CONTENT-OF-THE-STORY'],
    'selecting key moments and matching voice to content, re-asked with a kite story'),
  card('eng.speaking.storytelling-orally', 'fill_blank', M,
    'Complete the sentence: to make an oral story gripping, the teller should ____.',
    'choose the key events and match pace and tone to them',
    ['include everything that happened, in the exact order', 'MC-A-A-GOOD-ORAL-STORY-INCLUDES-EVERY-DETAIL-IN-EXACT-ORDER'],
    ['keep the voice flat, because delivery is separate from the story', 'MC-B-VOCAL-EXPRESSION-IS-AN-OPTIONAL-EXTRA-SEPARATE-FROM-THE-REAL-CONTENT-OF-THE-STORY'],
    'both misconceptions, stated as the principle'),
  card('eng.speaking.storytelling-orally', 'checkpoint', A,
    'A sales lead is telling a short story about winning over a difficult customer. Which version is the strongest?',
    'Three key moments, with a pause before the turning point and a lift in tone at the win',
    ['A minute-by-minute account of the whole week, in order', 'MC-A-A-GOOD-ORAL-STORY-INCLUDES-EVERY-DETAIL-IN-EXACT-ORDER'],
    ['The same events in a flat tone, since delivery is a decorative extra', 'MC-B-VOCAL-EXPRESSION-IS-AN-OPTIONAL-EXTRA-SEPARATE-FROM-THE-REAL-CONTENT-OF-THE-STORY'],
    'both misconceptions, in a workplace setting'),
]
