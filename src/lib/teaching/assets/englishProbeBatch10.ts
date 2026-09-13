/**
 * ENGLISH PROBE-CONTRACT CAMPAIGN — Batch 10 (FINAL BATCH).
 *
 * SCOPE: closes out the last remaining eng.phonics concept
 * (syllable-types) + the entire eng.speaking domain (10 concepts) — 11
 * concepts total, fewer than the usual ~25 target because this exhausts
 * every remaining applicable concept in the English subject (per the
 * campaign's own "process ALL remaining eligible concepts" rule when
 * fewer than 25 remain). Completing this batch takes English from
 * 203/214 (94.9%) to 214/214 (100%) applicable native-band coverage.
 *
 * eng.speaking note: like eng.listening and the eng.phonics domains
 * before it, these 10 concepts test conceptual understanding of speaking
 * PRINCIPLES (turn-taking, evidence use, register, non-verbal cues,
 * fluency, etc.) via closed-choice written scenario judgments — never
 * requiring the learner to actually produce spoken audio. All 10 already
 * carried exactly 2 such probes each before this batch, confirming the
 * same modality precedent this batch extends.
 *
 * All 11 re-measured at closed=2 directly from the seed corpus in git
 * before authoring (zero DB access, zero egress). Every one confirmed
 * to already carry two genuine, distinct, ACTIVE misconception ids on
 * its existing probes — the stop-condition check passed for all 11;
 * none were skipped, none required new Educational Brain authoring.
 *
 * Each concept goes straight from depth 2 to depth 4 — TWO new probes,
 * the same resilience target established across Batches 1-9.
 *
 * Probe A: probeKind 'checkpoint' (depth 3), reuses the concept's FIRST
 *   registered misconception from a fresh worked example.
 * Probe B: probeKind 'true_false' (depth 4), reuses the concept's SECOND
 *   registered misconception from a fresh worked example.
 * Both verified free (no prior 'checkpoint'/'true_false' probe) for all
 * 11 concepts before authoring, same P-10-safe technique as every prior
 * file in this campaign.
 *
 * No new misconception ids. No Educational Brain authoring. Every
 * gradeBand below is the concept's OWN native band, read off its
 * existing probes: ELEMENTARY for syllable-types; HIGH for debate-skills
 * and presentation-skills; MIDDLE for every other eng.speaking concept
 * in this batch.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedProbe } from './brainSeedAssets'

const S = 'english'
const src = (concept: string, what: string) =>
  `docs/curriculum/blueprints/${concept}.md — Misconception Registry; ${what}`

function probe(
  conceptId: string,
  kind: 'checkpoint' | 'true_false',
  band: GradeBand,
  stem: string,
  correct: string,
  wrong: string,
  misconceptionId: string,
  note: string,
): SeedProbe {
  return {
    conceptId, subjectSlug: S, probeKind: kind,
    gradeBand: band,
    difficulty: kind === 'checkpoint' ? ProbeDifficulty.DEVELOPING : ProbeDifficulty.PROFICIENT,
    stem,
    choices: [
      { text: correct, isCorrect: true },
      { text: wrong, isCorrect: false, misconceptionId },
    ],
    targetedMisconceptions: [misconceptionId],
    source: src(conceptId, note),
  }
}

const EL = GradeBand.ELEMENTARY
const M = GradeBand.MIDDLE
const H = GradeBand.HIGH

export const ENGLISH_PROBE_BATCH_10: SeedProbe[] = [
  // ─── eng.phonics.syllable-types (ELEMENTARY) ─────────────────────────────
  probe('eng.phonics.syllable-types', 'checkpoint', EL,
    'How should you approach reading the long word "napkin"?',
    'Split it into syllables (nap-kin) and decode each one using known patterns',
    'Guess the whole word from its general shape',
    'eng.phonics.syllable-types:MC-MULTISYLLABIC-WORDS-ARE-UNPREDICTABLE',
    'MC-MULTISYLLABIC-WORDS-ARE-UNPREDICTABLE, re-asked with "napkin" rather than the existing "reptile" example'),
  probe('eng.phonics.syllable-types', 'true_false', EL,
    'Does the first syllable of "tiger" ("ti") use a short vowel, like "tip" does?',
    'No — "ti" is an open syllable (no closing consonant), so it uses the long vowel sound',
    'Yes — every syllable follows the same short-vowel pattern',
    'eng.phonics.syllable-types:MC-ALL-SYLLABLES-FOLLOW-THE-SAME-PATTERN',
    'MC-ALL-SYLLABLES-FOLLOW-THE-SAME-PATTERN, re-asked with "tiger" rather than the existing "baby" example'),

  // ─── eng.speaking.asking-and-answering-questions (MIDDLE) ───────────────
  probe('eng.speaking.asking-and-answering-questions', 'checkpoint', M,
    'Someone asks "How did you solve the problem?" Can this be fully answered with just "Yes"?',
    'No — this is a wh-question requiring explanation; "yes" does not even make sense as an answer here',
    'Yes — a yes-or-no answer is always a complete answer',
    'eng.speaking.asking-and-answering-questions:MC-A-YES-OR-NO-ANSWER-IS-ALWAYS-A-COMPLETE-ANSWER',
    'MC-A-..., re-asked with "How did you solve the problem?" rather than the existing "Why were you late?" example'),
  probe('eng.speaking.asking-and-answering-questions', 'true_false', M,
    'Someone asks "Where is the nearest pharmacy?" and you respond, "I like pharmacies, they\'re really useful." Does this count as a genuine answer, since it\'s related to the topic?',
    'No — a genuine answer must directly address the specific information requested, not just share the topic',
    'Yes — a good question can be answered with anything related to the topic',
    'eng.speaking.asking-and-answering-questions:MC-A-GOOD-QUESTION-CAN-BE-ANSWERED-WITH-ANYTHING-RELATED-TO-THE-TOPIC',
    'MC-A-..., re-asked with the pharmacy-location example rather than the existing movie-start-time example'),

  // ─── eng.speaking.conversation-skills (MIDDLE) ───────────────────────────
  probe('eng.speaking.conversation-skills', 'checkpoint', M,
    'One speaker dominates a group discussion for five minutes straight without letting anyone else contribute. Does talking this much signal good conversational skill?',
    'No — conversation is a turn-taking activity; good conversationalists share space, not maximize their own talking time',
    'Yes — good conversation means talking a lot',
    'eng.speaking.conversation-skills:MC-GOOD-CONVERSATION-MEANS-TALKING-A-LOT',
    'MC-GOOD-CONVERSATION-MEANS-TALKING-A-LOT, re-asked with the five-minute group-domination example rather than the existing two-minute weekend monologue example'),
  probe('eng.speaking.conversation-skills', 'true_false', M,
    'Two colleagues pause for a moment to consider a tricky question before one responds thoughtfully. Did something go wrong in that pause?',
    'No — a short thinking pause is completely normal; only silence with visible discomfort signals a real problem',
    'Yes — silence in a conversation means something went wrong',
    'eng.speaking.conversation-skills:MC-SILENCE-IN-A-CONVERSATION-MEANS-SOMETHING-WENT-WRONG',
    'MC-SILENCE-IN-A-CONVERSATION-MEANS-SOMETHING-WENT-WRONG, re-asked with the colleagues/tricky-question example rather than the existing friends-reminiscing example'),

  // ─── eng.speaking.debate-skills (HIGH) ───────────────────────────────────
  probe('eng.speaking.debate-skills', 'checkpoint', H,
    'A debater recites the exact same opening statement, word for word, as their closing statement, ignoring everything raised in between. Does this count as winning the exchange?',
    'No — a rebuttal must directly engage with what the opponent actually said, requiring active listening, not a fixed script delivered regardless of the exchange',
    'Yes — winning a debate means delivering your prepared arguments regardless of what the opponent actually says',
    'eng.speaking.debate-skills:MC-A-WINNING-A-DEBATE-MEANS-DELIVERING-YOUR-PREPARED-ARGUMENTS-REGARDLESS-OF-WHAT-THE-OPPONENT-ACTUALLY-SAYS',
    'MC-A-..., re-asked with the identical-opening-and-closing-statement example rather than the existing ignored-rebuttal example'),
  probe('eng.speaking.debate-skills', 'true_false', H,
    '"Your statistic is outdated and does not reflect current data" — this rebuttal firmly and directly challenges the opponent\'s evidence. Does being this forceful and direct mean the speaker is being disrespectful or hostile?',
    'No — forceful, direct engagement with an opponent\'s evidence and personal respect are fully compatible; this rebuttal targets the argument, not the person',
    'Yes — being forceful or directly challenging an opponent\'s argument means being disrespectful or hostile',
    'eng.speaking.debate-skills:MC-B-BEING-FORCEFUL-OR-DIRECTLY-CHALLENGING-AN-OPPONENTS-ARGUMENT-MEANS-BEING-DISRESPECTFUL-OR-HOSTILE',
    'MC-B-..., re-asked with the "outdated statistic" example rather than the existing "evidence doesn\'t support conclusion" example'),

  // ─── eng.speaking.discussion-skills (MIDDLE) ─────────────────────────────
  probe('eng.speaking.discussion-skills', 'checkpoint', M,
    'A student politely voices disagreement with a proposed plan, explaining a specific flaw they noticed. Does voicing this disagreement serve the group\'s goal?',
    'Yes — respectful, substantive disagreement is one of the most valuable contributions to a discussion',
    'No — disagreeing means being rude or confrontational',
    'eng.speaking.discussion-skills:MC-DISAGREEING-MEANS-BEING-RUDE-OR-CONFRONTATIONAL',
    'MC-DISAGREEING-MEANS-BEING-RUDE-OR-CONFRONTATIONAL, re-asked with the politely-explained-flaw example rather than the existing silently-going-along example'),
  probe('eng.speaking.discussion-skills', 'true_false', M,
    'A group member says "Building on what Maria said, I\'d add that..." and extends her point rather than raising something unrelated. Is introducing a brand-new idea the only valuable way to contribute to a discussion?',
    'No — building on, extending, or connecting prior points, like this, are equally valuable contributions',
    'Yes — a good discussion contribution means introducing a new idea',
    'eng.speaking.discussion-skills:MC-A-GOOD-DISCUSSION-CONTRIBUTION-MEANS-INTRODUCING-A-NEW-IDEA',
    'MC-A-..., re-asked with the "building on what Maria said" example rather than the existing unrelated-new-topic example'),

  // ─── eng.speaking.non-verbal-communication (MIDDLE) ─────────────────────
  probe('eng.speaking.non-verbal-communication', 'checkpoint', M,
    'A thumbs-up gesture signals approval in one cultural context but is considered offensive in another. Does a specific non-verbal cue like this mean the same thing in every culture?',
    'No — non-verbal cues are culturally variable; the same gesture can carry opposite meanings depending on cultural context',
    'Yes — non-verbal cues like gestures mean the same thing in every culture',
    'eng.speaking.non-verbal-communication:MC-A-NON-VERBAL-CUES-LIKE-EYE-CONTACT-AND-GESTURE-MEAN-THE-SAME-THING-IN-EVERY-CULTURE',
    'MC-A-..., re-asked with the thumbs-up example rather than the existing eye-contact-with-an-elder example'),
  probe('eng.speaking.non-verbal-communication', 'true_false', M,
    'Someone says "I\'m not upset" while clenching their jaw and avoiding eye contact. Is the non-verbal signal just a minor addition to the real message, which is the spoken words?',
    'No — when words and body language contradict, listeners often trust the non-verbal signal over the words',
    'Yes — non-verbal communication is just a minor addition to the real message, which is the spoken words',
    'eng.speaking.non-verbal-communication:MC-B-NON-VERBAL-COMMUNICATION-IS-JUST-A-MINOR-ADDITION-TO-THE-REAL-MESSAGE-WHICH-IS-THE-SPOKEN-WORDS',
    'MC-B-..., re-asked with the "I\'m not upset" clenched-jaw example rather than the existing "excited to be here" monotone example'),

  // ─── eng.speaking.oral-fluency (MIDDLE) ──────────────────────────────────
  probe('eng.speaking.oral-fluency', 'checkpoint', M,
    'A genuinely fluent speaker briefly says "um" while gathering a thought mid-sentence, then continues smoothly. Does this brief hesitation mean the speaker isn\'t actually fluent?',
    'No — fluency is about overall flow; a brief natural filler is normal, not a failure',
    'Yes — fluency means zero hesitation',
    'eng.speaking.oral-fluency:MC-FLUENCY-MEANS-ZERO-HESITATION',
    'MC-FLUENCY-MEANS-ZERO-HESITATION, re-asked with the brief-mid-sentence-"um" example rather than the existing recorded-unscripted-answer example'),
  probe('eng.speaking.oral-fluency', 'true_false', M,
    'A speaker makes a small grammar slip mid-sentence but keeps talking smoothly instead of stopping to correct it. Is stopping to fix small errors necessary to maintain fluency?',
    'No — stopping to fix a minor error is often more disruptive than the error itself',
    'Yes — fluency requires perfect grammar',
    'eng.speaking.oral-fluency:MC-FLUENCY-REQUIRES-PERFECT-GRAMMAR',
    'MC-FLUENCY-REQUIRES-PERFECT-GRAMMAR, re-asked with the keeps-talking-through-a-slip example rather than the existing five-second-pause-to-fix-a-mistake example'),

  // ─── eng.speaking.presentation-skills (HIGH) ─────────────────────────────
  probe('eng.speaking.presentation-skills', 'checkpoint', H,
    'A slide shows a single striking image and a three-word phrase, while the speaker explains the details verbally. Is this an effective way to support a spoken presentation?',
    'Yes — a spare slide with a key phrase or image supports delivery without making the audience read instead of listen',
    'No — visual aids should contain everything the speaker will say, to make sure the audience doesn\'t miss anything',
    'eng.speaking.presentation-skills:MC-VISUAL-AIDS-SHOULD-CONTAIN-EVERYTHING-THE-SPEAKER-WILL-SAY',
    'MC-VISUAL-AIDS-SHOULD-CONTAIN-EVERYTHING-THE-SPEAKER-WILL-SAY, re-asked with the sparse-image-plus-phrase example rather than the existing six-dense-sentences example'),
  probe('eng.speaking.presentation-skills', 'true_false', H,
    'One presenter tries to mention every possible fact about a topic; another picks the 3 most relevant points for the specific audience. Does covering as much information as possible make a presentation better?',
    'No — effective presentations are selective, choosing the most important points for the specific audience and purpose rather than cramming in everything',
    'Yes — a good presentation covers as much information as possible to demonstrate thorough preparation',
    'eng.speaking.presentation-skills:MC-A-GOOD-PRESENTATION-COVERS-AS-MUCH-INFORMATION-AS-POSSIBLE',
    'MC-A-GOOD-PRESENTATION-COVERS-AS-MUCH-INFORMATION-AS-POSSIBLE, re-asked with the every-fact-vs-3-relevant-points example rather than the existing 12-points-vs-4-points example'),

  // ─── eng.speaking.pronunciation-in-conversation (MIDDLE) ────────────────
  probe('eng.speaking.pronunciation-in-conversation', 'checkpoint', M,
    'Someone says "PHOtograph" with the wrong stress placement (should be "phoTOgraph"), but every individual sound is accurate. Is this easily understood, since every individual sound is correct?',
    'No — wrong stress placement can genuinely confuse a listener even with perfect individual sounds',
    'Yes — perfect individual sounds are more important than stress and intonation',
    'eng.speaking.pronunciation-in-conversation:MC-PERFECT-INDIVIDUAL-SOUNDS-MORE-IMPORTANT-THAN-STRESS-AND-INTONATION',
    'MC-PERFECT-INDIVIDUAL-SOUNDS-MORE-IMPORTANT-THAN-STRESS-AND-INTONATION, re-asked with "PHOtograph" rather than the existing "comPUter" example'),
  probe('eng.speaking.pronunciation-in-conversation', 'true_false', M,
    'A speaker has a noticeable accent but is always clearly understood by listeners. Should the pronunciation goal be eliminating that accent completely to sound native-like?',
    'No — intelligibility, being clearly understood, is the realistic goal; an accent and intelligibility can coexist',
    'Yes — a native-like accent is the goal',
    'eng.speaking.pronunciation-in-conversation:MC-NATIVE-LIKE-ACCENT-IS-THE-GOAL',
    'MC-NATIVE-LIKE-ACCENT-IS-THE-GOAL, re-asked with the always-clearly-understood-with-an-accent framing rather than the existing generic "eliminate accent completely" question'),

  // ─── eng.speaking.public-speaking-basics (MIDDLE) ───────────────────────
  probe('eng.speaking.public-speaking-basics', 'checkpoint', M,
    'A student\'s hands tremble slightly right before they step on stage to speak. Does this reliably mean they\'re going to do badly?',
    'No — nervousness is a nearly universal physiological response that coexists with good performance; it doesn\'t reliably predict how well someone will do',
    'Yes — nervousness before speaking means you will do badly',
    'eng.speaking.public-speaking-basics:MC-NERVOUSNESS-BEFORE-SPEAKING-MEANS-YOU-WILL-DO-BADLY',
    'MC-NERVOUSNESS-BEFORE-SPEAKING-MEANS-YOU-WILL-DO-BADLY, re-asked with the trembling-hands-before-stage example rather than the existing racing-heart-before-a-presentation example'),
  probe('eng.speaking.public-speaking-basics', 'true_false', M,
    'A speaker prepares by jotting a few key phrases on note cards, rather than writing out and memorizing a full script. Is this a weaker way to prepare for public speaking?',
    'No — preparing key points allows natural, flexible delivery, which is a strong and common approach among skilled speakers',
    'Yes — a good speaker memorizes every word and recites it exactly',
    'eng.speaking.public-speaking-basics:MC-A-GOOD-SPEAKER-MEMORIZES-EVERY-WORD-AND-RECITES-IT-EXACTLY',
    'MC-A-GOOD-SPEAKER-MEMORIZES-EVERY-WORD-AND-RECITES-IT-EXACTLY, re-asked with the note-cards-vs-full-script example rather than the existing generic "memorize word-for-word" question'),

  // ─── eng.speaking.storytelling-orally (MIDDLE) ───────────────────────────
  probe('eng.speaking.storytelling-orally', 'checkpoint', M,
    'A retelling of a surprise party includes every minor detail in strict order — what everyone wore, every hallway walked through. Does including every detail make a story better?',
    'No — a good oral story selects and emphasizes the events that matter, compressing or cutting minor details that don\'t add to the impact',
    'Yes — a good oral story includes every detail in exact order',
    'eng.speaking.storytelling-orally:MC-A-A-GOOD-ORAL-STORY-INCLUDES-EVERY-DETAIL-IN-EXACT-ORDER',
    'MC-A-..., re-asked with the surprise-party-retelling example rather than the existing getting-lost example'),
  probe('eng.speaking.storytelling-orally', 'true_false', M,
    'A scary campfire story is told in a flat, unvarying monotone with all the same events and words as an exciting version. Does the flat delivery still feel scary to the listener?',
    'No — vocal expression is integral to how a story lands; a flat delivery of scary content doesn\'t convey the fear despite identical events',
    'Yes — vocal expression is an optional extra separate from the real content of the story',
    'eng.speaking.storytelling-orally:MC-B-VOCAL-EXPRESSION-IS-AN-OPTIONAL-EXTRA-SEPARATE-FROM-THE-REAL-CONTENT-OF-THE-STORY',
    'MC-B-..., re-asked with the campfire-story example rather than the existing chase-scene example'),
]
