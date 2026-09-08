/**
 * ENGLISH PROBE-CONTRACT CAMPAIGN — Batch-1 depth-4 upgrade.
 *
 * ── WHY THIS EXISTS ──────────────────────────────────────────────────────
 * Live Mohd-account validation of Batch 1 (depth 3) reproduced, on
 * eng.grammar.modals, the exact zero-slack failure this project already
 * measured and fixed for eng.grammar.nouns: two imperfect answers against a
 * 3-probe pool left `practiceCorrect` unreachable, and the lesson correctly
 * (honestly) closed as needsReview rather than mastered. The owner's
 * follow-up instruction set the resilience target at depth 4 for all
 * applicable native-band pairs, matching the already-proven pattern.
 *
 * This file brings the 15 Batch-1 concepts (englishProbeBatch1.ts) from
 * depth 3 to depth 4 — one more probe each, `probeKind: 'true_false'` (a
 * fourth distinct, previously-empty slot per concept — verified free for
 * all 15 before authoring, so no P-10 slot-collision risk), reusing
 * whichever of the concept's two already-registered misconceptions was
 * NOT the one Batch 1's own `checkpoint` probe targeted — spreading
 * coverage across both rather than testing one misconception three times
 * and leaving the other tested only once.
 *
 * No new misconception ids. No Educational Brain authoring. Every stem is
 * a genuinely new worked example, checked against both the original two
 * probes and the Batch-1 `checkpoint` probe for each concept.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedProbe } from './brainSeedAssets'

const S = 'english'
const src = (concept: string, what: string) =>
  `docs/curriculum/blueprints/${concept}.md — Misconception Registry; ${what}`

function trueFalse(
  conceptId: string,
  stem: string,
  correct: string,
  wrong: string,
  misconceptionId: string,
  note: string,
): SeedProbe {
  return {
    conceptId, subjectSlug: S, probeKind: 'true_false',
    gradeBand: GradeBand.MIDDLE, difficulty: ProbeDifficulty.PROFICIENT,
    stem,
    choices: [
      { text: correct, isCorrect: true },
      { text: wrong, isCorrect: false, misconceptionId },
    ],
    targetedMisconceptions: [misconceptionId],
    source: src(conceptId, note),
  }
}

export const ENGLISH_BATCH_1_DEPTH_4: SeedProbe[] = [
  trueFalse(
    'eng.grammar.articles-and-determiners',
    'Which is correct — "The dogs make great pets" or "Dogs make great pets" — when talking about dogs as a category in general?',
    '"Dogs make great pets" — no article is needed for a general statement about a whole category',
    '"The dogs make great pets" — plural nouns always need "the" in front of them',
    'eng.grammar.articles-and-determiners:MC-THE-IS-ALWAYS-NEEDED-OR-NEVER-NEEDED',
    'MC-THE-IS-ALWAYS-NEEDED-OR-NEVER-NEEDED, re-asked with a generic-category statement rather than the existing first-mention "a dog" example',
  ),
  trueFalse(
    'eng.grammar.present-tenses',
    '"I have lost my keys" vs. "I lost my keys yesterday." Which one connects a past action to a state that is still true right now?',
    '"I have lost my keys" — present perfect links a past action to a RESULT that matters now (they are still missing)',
    'Neither — present perfect and simple past always describe exactly the same timeframe',
    'eng.grammar.present-tenses:MC-PRESENT-PERFECT-IS-JUST-PAST-TENSE',
    'MC-PRESENT-PERFECT-IS-JUST-PAST-TENSE, re-asked via the present-relevance test rather than the existing specific-past-time test',
  ),
  trueFalse(
    'eng.grammar.past-tenses',
    '"While I was cooking, my sister was setting the table." Could you replace both verbs with simple past ("cooked"/"set") and keep exactly the same meaning?',
    'No — past continuous shows both actions happening AT THE SAME TIME as a background; simple past would suggest one happened after the other',
    'Yes — past continuous and simple past always describe events identically',
    'eng.grammar.past-tenses:MC-PAST-CONTINUOUS-AND-SIMPLE-PAST-ARE-INTERCHANGEABLE',
    'MC-PAST-CONTINUOUS-AND-SIMPLE-PAST-ARE-INTERCHANGEABLE, re-asked with two simultaneous background actions rather than the existing single-interruption scenario',
  ),
  trueFalse(
    'eng.grammar.future-tenses',
    '"Our flight departs at 9am tomorrow." What time does this describe, even though "departs" is present tense?',
    'Tomorrow, the future — simple present is the normal way to talk about a fixed schedule or timetable',
    'It must be a mistake — present-tense verbs can only describe present or habitual actions, never the future',
    'eng.grammar.future-tenses:MC-PRESENT-TENSE-CANNOT-EXPRESS-FUTURE-TIME',
    'MC-PRESENT-TENSE-CANNOT-EXPRESS-FUTURE-TIME, re-asked with a flight departure rather than the existing train-timetable example',
  ),
  trueFalse(
    'eng.grammar.prepositions',
    'Which is the correct English expression — "good AT sports" or "good IN sports"?',
    '"Good AT sports" — like many preposition pairings, this is a fixed convention to learn, not something derivable from logic alone',
    '"Good IN sports" — "in" logically fits because sports happen inside a game or activity',
    'eng.grammar.prepositions:MC-PREPOSITION-CHOICE-IS-PREDICTABLE-FROM-MEANING',
    'MC-PREPOSITION-CHOICE-IS-PREDICTABLE-FROM-MEANING, re-asked with "good at" rather than the existing "afraid of"',
  ),
  trueFalse(
    'eng.grammar.adjectives',
    'In "The soup tastes delicious," is "delicious" an adjective even though it comes AFTER the noun "soup"?',
    'Yes — it is a predicate adjective after the linking verb "tastes," describing "soup"',
    'No — an adjective must sit directly in front of the noun it describes',
    'eng.grammar.adjectives:MC-ADJECTIVES-MUST-COME-BEFORE-THE-NOUN',
    'MC-ADJECTIVES-MUST-COME-BEFORE-THE-NOUN, re-asked with "tastes" rather than the existing "seems"',
  ),
  trueFalse(
    'eng.grammar.subject-verb-agreement',
    'In standard American English, which is the default — "The family IS moving to a new house" or "The family ARE moving to a new house"?',
    '"IS" — "family," like other collective nouns, is treated as one single unit and takes a singular verb',
    '"ARE" — a family is made up of several people, so the verb must be plural',
    'eng.grammar.subject-verb-agreement:MC-COLLECTIVE-NOUNS-ARE-ALWAYS-PLURAL-VERBS',
    'MC-COLLECTIVE-NOUNS-ARE-ALWAYS-PLURAL-VERBS, re-asked with "family" rather than the existing "team"',
  ),
  trueFalse(
    'eng.vocab.prefixes',
    'What does the prefix "pre-" add in "preview"?',
    'Time: before — "pre-" shows something happens ahead of the main event (viewing before the main showing)',
    'Negation: not a view — prefixes always reverse the base word’s meaning',
    'eng.vocab.prefixes:MC-PREFIXES-ONLY-NEGATE-MEANING',
    'MC-PREFIXES-ONLY-NEGATE-MEANING, re-asked with "pre-" (time) rather than the existing "sub-" (location)',
  ),
  trueFalse(
    'eng.grammar.conjunctions',
    'Which comma placement is correct — "I was hungry, so I made a sandwich" or "I was hungry so, I made a sandwich"?',
    '"I was hungry, so I made a sandwich" — the comma goes BEFORE the coordinating conjunction, joining two independent clauses',
    '"I was hungry so, I made a sandwich" — comma placement with conjunctions does not follow a fixed rule',
    'eng.grammar.conjunctions:MC-COMMA-PLACEMENT-WITH-CONJUNCTIONS-IS-RANDOM',
    'MC-COMMA-PLACEMENT-WITH-CONJUNCTIONS-IS-RANDOM, re-asked with "so" rather than the existing "but"',
  ),
  trueFalse(
    'eng.grammar.active-and-passive-voice',
    '"My wallet was stolen last night." Is passive voice a good choice here, even though writers are often told to avoid passive voice?',
    'Yes — passive voice is the natural choice when the doer of the action is unknown or unimportant, not always bad writing',
    'No — passive voice should always be eliminated from good writing, with no exceptions',
    'eng.grammar.active-and-passive-voice:MC-PASSIVE-VOICE-IS-ALWAYS-BAD-WRITING',
    'MC-PASSIVE-VOICE-IS-ALWAYS-BAD-WRITING, re-asked with an unknown-agent scenario rather than the existing scientific-convention example',
  ),
  trueFalse(
    'eng.grammar.modals',
    'Do "You might want to bring an umbrella" and "You have to bring an umbrella" express the same strength of suggestion?',
    'No — "might" is a gentle, optional suggestion; "have to" is a strong requirement — modals differ a lot in strength',
    'Yes — all modal expressions carry the same strength, so they can be swapped freely',
    'eng.grammar.modals:MC-MODAL-STRENGTH-IS-ALL-THE-SAME',
    'MC-MODAL-STRENGTH-IS-ALL-THE-SAME, re-asked with "might"/"have to" rather than the existing "must"/"should"',
  ),
  trueFalse(
    'eng.grammar.gerunds-and-infinitives',
    'Which is grammatically correct — "I want to go home" or "I want going home"?',
    '"I want to go home" — "want" governs the infinitive; gerunds and infinitives are NOT interchangeable after every verb',
    'Both are equally correct — gerunds and infinitives can always replace each other after any verb',
    'eng.grammar.gerunds-and-infinitives:MC-GERUND-AND-INFINITIVE-ARE-ALWAYS-INTERCHANGEABLE',
    'MC-GERUND-AND-INFINITIVE-ARE-ALWAYS-INTERCHANGEABLE, re-asked with "want" rather than the existing "enjoy"',
  ),
  trueFalse(
    'eng.grammar.comparatives-and-superlatives',
    'What is the correct comparative form of "bad"?',
    '"Worse" — bad is one of a small set of irregular, memorized comparative forms',
    '"Badder" — apply the regular -er rule to any adjective',
    'eng.grammar.comparatives-and-superlatives:MC-IRREGULAR-COMPARATIVES-ARE-JUST-MISTAKES',
    'MC-IRREGULAR-COMPARATIVES-ARE-JUST-MISTAKES, re-asked with "bad" rather than the existing "good"',
  ),
  trueFalse(
    'eng.grammar.negation',
    'Which sentence is correct in standard/formal English — "I didn’t see anybody" or "I didn’t see nobody"?',
    '"I didn’t see anybody" — standard English uses only one negative word per clause',
    '"I didn’t see nobody" — using two negative words makes the negation even stronger',
    'eng.grammar.negation:MC-DOUBLE-NEGATIVES-ARE-JUST-EXTRA-EMPHASIS',
    'MC-DOUBLE-NEGATIVES-ARE-JUST-EXTRA-EMPHASIS, re-asked with "anybody"/"nobody" rather than the existing "any money"/"no money"',
  ),
  trueFalse(
    'eng.grammar.word-order',
    'Which sentence has correct English word order — "She quickly ate the sandwich" or "She ate quickly the sandwich"?',
    '"She quickly ate the sandwich" — the adverb sits before the verb, not wedged between the verb and its object',
    '"She ate quickly the sandwich" — adverbs can be placed anywhere in the sentence',
    'eng.grammar.word-order:MC-ADJECTIVES-AND-ADVERBS-CAN-GO-ANYWHERE',
    'MC-ADJECTIVES-AND-ADVERBS-CAN-GO-ANYWHERE, re-asked with "quickly ate" rather than the existing "very much chocolate"',
  ),
]
