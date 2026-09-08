/**
 * ENGLISH PROBE-CONTRACT CAMPAIGN — Batch 1.
 *
 * ── SCOPE CORRECTION FROM RE-MEASUREMENT (2026-09-08) ───────────────────────
 * The prior session's "214 of 216" figure came from a Supabase `GROUP BY` over
 * existing `probe_assets` rows — a query that can only ever report pairs that
 * already have at least one probe. It structurally cannot see a pair with
 * ZERO probes, because there is no row to group. Re-measured directly from
 * the real seed corpus in git (zero DB access, zero egress):
 *
 *   at contract (>=3 closed-choice)                     : 2   (this file's
 *                                                              predecessor,
 *                                                              englishBandGapAssets.ts)
 *   voice-first exempt (phonemic-awareness,
 *     letter-sound-correspondence)                       : 4  (2 concepts x
 *                                                              2 bands each)
 *   native-band pairs needing exactly 1 more probe       : 212
 *   ADULT-band pairs with ZERO closed-choice probes      : 194
 *
 * The 212 figure CONFIRMS the prior finding (214 - 2 already fixed = 212).
 * The 194 ADULT-band figure is NEW, previously unmeasured scope: every
 * English concept apparently carries an authored ADULT-band explanation (for
 * returning adult learners) but none was ever given ADULT-band assessment
 * probes. Whether that is an intentional design (ADULT relies on the
 * adjacent-band matcher score, e.g. the documented HIGH<->ADULT +15
 * exception) or a genuine second gap is NOT decided here — it is flagged as
 * an open scope question for the owner, and NOT touched by this batch, per
 * this campaign's own stop condition ("STOP if content ownership becomes
 * ambiguous"). This batch targets ONLY the well-understood, already-proven
 * native-band shortfall — the same shape as the depth-3->4 fix already
 * live-verified for eng.grammar.nouns / eng.phonics.blending-segmenting.
 *
 * ── THIS BATCH ────────────────────────────────────────────────────────────
 * 15 concepts, all MIDDLE band, all currently `mcq x1 + misconception_probe
 * x1` (closed=2). Each gets exactly ONE new probe, `probeKind: 'checkpoint'`
 * (verified free for every concept below via buildProbeSlugResolver /
 * abandonedLegacyProbeSlugs — same P-10-safe technique as
 * englishBandGapAssets.ts), reusing ONE of the concept's own two
 * ALREADY-REGISTERED, ALREADY-ACTIVE misconceptions from a genuinely
 * different example/context than its existing two probes use — no new
 * misconception ids invented, no Educational Brain authoring.
 *
 * Quality bar applied to every stem below: tests actual understanding (a
 * different worked example, not a reworded duplicate of an existing stem);
 * plausible, misconception-carrying distractor; correct option ends with a
 * short "— because" justification, matching this corpus's own established
 * house style exactly (every existing probe already does this); no
 * "all of the above"; no answer-length giveaway beyond what the existing
 * probes already carry; register matches the existing MIDDLE-band probes
 * for the same concept.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedProbe } from './brainSeedAssets'

const S = 'english'
const src = (concept: string, what: string) =>
  `docs/curriculum/blueprints/${concept}.md — Misconception Registry; ${what}`

function checkpoint(
  conceptId: string,
  stem: string,
  correct: string,
  wrong: string,
  misconceptionId: string,
  note: string,
): SeedProbe {
  return {
    conceptId, subjectSlug: S, probeKind: 'checkpoint',
    gradeBand: GradeBand.MIDDLE, difficulty: ProbeDifficulty.DEVELOPING,
    stem,
    choices: [
      { text: correct, isCorrect: true },
      { text: wrong, isCorrect: false, misconceptionId },
    ],
    targetedMisconceptions: [misconceptionId],
    source: src(conceptId, note),
  }
}

export const ENGLISH_PROBE_BATCH_1: SeedProbe[] = [
  checkpoint(
    'eng.grammar.articles-and-determiners',
    'Which is correct — "a honest mistake" or "an honest mistake"?',
    '"An honest mistake" — the h is silent, so the word starts with a vowel SOUND',
    '"A honest mistake" — h is a consonant letter, so "a" is correct',
    'eng.grammar.articles-and-determiners:MC-A-AN-DEPENDS-ON-SPELLING-NOT-SOUND',
    'MC-A-AN-DEPENDS-ON-SPELLING-NOT-SOUND, re-asked with a silent-h word ("honest") rather than the existing "university"/"hour" pair',
  ),
  checkpoint(
    'eng.grammar.present-tenses',
    '"The sun rises in the east." Is this happening at this exact moment you are reading it?',
    'No — simple present states a general truth or habitual fact, not necessarily this exact instant',
    'Yes — simple present always means the action is happening right now',
    'eng.grammar.present-tenses:MC-SIMPLE-PRESENT-MEANS-HAPPENING-RIGHT-NOW',
    'MC-SIMPLE-PRESENT-MEANS-HAPPENING-RIGHT-NOW, re-asked via a general-truth sentence rather than the existing in-the-moment phone call',
  ),
  checkpoint(
    'eng.grammar.past-tenses',
    'What is the past tense of "eat"?',
    '"Ate" — eat is irregular and keeps its own memorized past form',
    '"Eated" — past tense verbs add -ed',
    'eng.grammar.past-tenses:MC-ALL-PAST-TENSE-VERBS-ADD-ED',
    'MC-ALL-PAST-TENSE-VERBS-ADD-ED, re-asked with "eat" rather than the existing "go"',
  ),
  checkpoint(
    'eng.grammar.future-tenses',
    'You already booked flights and packed your bags for a trip next week. Which best describes your plan?',
    '"I\'m going to travel next week" — "going to" fits a plan already decided before speaking',
    '"I\'ll travel next week" — "will" and "going to" always mean exactly the same thing',
    'eng.grammar.future-tenses:MC-WILL-AND-GOING-TO-ARE-FULLY-INTERCHANGEABLE',
    'MC-WILL-AND-GOING-TO-ARE-FULLY-INTERCHANGEABLE, re-asked via a pre-planned scenario rather than the existing spontaneous-decision phone call',
  ),
  checkpoint(
    'eng.grammar.prepositions',
    'In "She traveled by train," what relationship does "by" express?',
    'Means/method — prepositions can show how something is done, not only where',
    'Location — prepositions always tell you where something is',
    'eng.grammar.prepositions:MC-PREPOSITIONS-ONLY-SHOW-LOCATION',
    'MC-PREPOSITIONS-ONLY-SHOW-LOCATION, re-asked with "by" (means) rather than the existing "at" (time)',
  ),
  checkpoint(
    'eng.grammar.adjectives',
    'Which sounds natural — "a small red car" or "a red small car"?',
    '"A small red car" — size comes before color in the conventional adjective order',
    'Both sound equally natural — adjective order does not matter in English',
    'eng.grammar.adjectives:MC-ADJECTIVE-ORDER-DOESNT-MATTER',
    'MC-ADJECTIVE-ORDER-DOESNT-MATTER, re-asked with size-before-color rather than the existing age-before-material pair',
  ),
  checkpoint(
    'eng.grammar.subject-verb-agreement',
    'Which sentence is correct — "The bouquet of flowers IS on the table" or "The bouquet of flowers ARE on the table"?',
    '"IS" — the true subject is "bouquet" (singular); "of flowers" does not change that',
    '"ARE" — the verb should agree with "flowers," the noun right next to it',
    'eng.grammar.subject-verb-agreement:MC-AGREE-WITH-THE-NEAREST-NOUN',
    'MC-AGREE-WITH-THE-NEAREST-NOUN, re-asked with "bouquet of flowers" rather than the existing "box of toys"',
  ),
  checkpoint(
    'eng.vocab.prefixes',
    'Does "un-" mean the same thing in "unhappy" and "untie"?',
    'No — "unhappy" negates (not happy), but "untie" reverses an action (undo tying); the same prefix can carry different senses',
    'Yes — a prefix always keeps one single fixed meaning wherever it appears',
    'eng.vocab.prefixes:MC-A-PREFIX-ALWAYS-HAS-ONE-FIXED-MEANING',
    'MC-A-PREFIX-ALWAYS-HAS-ONE-FIXED-MEANING, re-asked with "un-" (negation vs. reversal) rather than the existing "re-"',
  ),
  checkpoint(
    'eng.grammar.conjunctions',
    '"Although it was raining, we went for a walk." Could you replace "although" with "and" and keep the same meaning?',
    'No — "although" signals contrast/concession; "and" only adds information, it does not show contrast',
    'Yes — conjunctions like "although" and "and" all just connect ideas the same way',
    'eng.grammar.conjunctions:MC-ALL-CONJUNCTIONS-WORK-THE-SAME-WAY',
    'MC-ALL-CONJUNCTIONS-WORK-THE-SAME-WAY, re-asked with "although" (subordinating/contrast) rather than the existing "because" (subordinating/cause)',
  ),
  checkpoint(
    'eng.grammar.active-and-passive-voice',
    'What is the correct passive form of "The chef cooked the meal"?',
    '"The meal was cooked by the chef" — the object becomes the subject, and the verb becomes be + past participle',
    '"The meal cooked the chef" — just swap the subject and the object',
    'eng.grammar.active-and-passive-voice:MC-JUST-SWAP-SUBJECT-AND-OBJECT-FOR-PASSIVE',
    'MC-JUST-SWAP-SUBJECT-AND-OBJECT-FOR-PASSIVE, re-asked with "the chef cooked the meal" rather than the existing "the boy ate the cake"',
  ),
  checkpoint(
    'eng.grammar.modals',
    '"Can I open the window?" and "I can swim." Does "can" mean the same thing in both?',
    'No — the first asks for permission, the second states ability; the same modal can express different meanings',
    'Yes — each modal verb has exactly one fixed meaning in every sentence',
    'eng.grammar.modals:MC-EACH-MODAL-HAS-ONLY-ONE-MEANING',
    'MC-EACH-MODAL-HAS-ONLY-ONE-MEANING, re-asked with "can" (permission vs. ability) rather than the existing "must" (deduction vs. obligation)',
  ),
  checkpoint(
    'eng.grammar.gerunds-and-infinitives',
    'In "Reading calms me down," what role does "reading" play?',
    'A gerund — it is the NOUN subject of the sentence, not a verb describing an ongoing action',
    'Present continuous verb — the same form as in "I am reading"',
    'eng.grammar.gerunds-and-infinitives:MC-GERUND-IS-JUST-PRESENT-CONTINUOUS',
    'MC-GERUND-IS-JUST-PRESENT-CONTINUOUS, re-asked with "Reading calms me down" rather than the existing "Swimming is my favorite hobby"',
  ),
  checkpoint(
    'eng.grammar.comparatives-and-superlatives',
    'What is the correct superlative form of "intelligent"?',
    '"Most intelligent" — longer, multi-syllable adjectives take most/more, not -est',
    '"Intelligentest" — add -est to any adjective for the superlative',
    'eng.grammar.comparatives-and-superlatives:MC-ALWAYS-ADD-ER-EST-OR-ALWAYS-USE-MORE-MOST',
    'MC-ALWAYS-ADD-ER-EST-OR-ALWAYS-USE-MORE-MOST, re-asked with "intelligent" rather than the existing "beautiful"',
  ),
  checkpoint(
    'eng.grammar.negation',
    'How do you correctly negate "He played football" (simple past, no existing auxiliary)?',
    '"He did not play football" — insert "did," attach "not" to it, and revert the verb to base form',
    '"He played not football" — attach "not" directly after the main verb',
    'eng.grammar.negation:MC-JUST-ADD-NOT-ANYWHERE',
    'MC-JUST-ADD-NOT-ANYWHERE, re-asked in simple past ("played") rather than the existing simple present ("likes")',
  ),
  checkpoint(
    'eng.grammar.word-order',
    'In English, "The cat chased the mouse" means:',
    'The cat did the chasing — English fixes meaning by word order (Subject-Verb-Object), not by logic alone',
    'It could mean either the cat chased the mouse or the mouse chased the cat — word order is flexible, so context decides',
    'eng.grammar.word-order:MC-WORD-ORDER-IS-FLEXIBLE-LIKE-OTHER-LANGUAGES',
    'MC-WORD-ORDER-IS-FLEXIBLE-LIKE-OTHER-LANGUAGES, re-asked with "The cat chased the mouse" rather than the existing "The ball threw the boy"',
  ),
]
