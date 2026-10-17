/**
 * ENGLISH CARD-DEPTH CAMPAIGN — Batch 22 (eng.grammar part 4, 23 cards).
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
 * slug and abandon the live row's identity. Each grammar concept already uses native band : mcq, misconception_probe, true_false/checkpoint and ADULT : mcq, misconception_probe, so the new cards take the FREE slots native band : short_answer, fill_blank and ADULT : checkpoint. eng.grammar.present-tenses already holds one 3-option card, so it receives two (short_answer + checkpoint). The native band is HIGH for sentence-combining and MIDDLE for the rest.
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


export const ENGLISH_CARD_DEPTH_BATCH_22: SeedProbe[] = [
  // ─── eng.grammar.present-tenses (two cards: one 3-option card already exists) ─
  card('eng.grammar.present-tenses', 'short_answer', M,
    'A student says "She plays tennis" means she is playing at this exact moment, and that "I have visited Paris" is just a past tense that can take "in 2019" like the simple past. What is accurate?',
    'The simple present shows a habit; the present perfect links an experience to now',
    ['"She plays tennis" means she is playing at this exact moment', 'MC-SIMPLE-PRESENT-MEANS-HAPPENING-RIGHT-NOW'],
    ['"I have visited Paris" is just a past tense, so it can take "in 2019" like the simple past', 'MC-PRESENT-PERFECT-IS-JUST-PAST-TENSE'],
    'simple present = habit; present perfect = link to now, re-asked with tennis and Paris'),
  card('eng.grammar.present-tenses', 'checkpoint', A,
    'A report says "Our server restarts nightly" means it is restarting right now, and accepts "We have signed it last week" because the present perfect is just a past tense. Which assessment is accurate?',
    '"Restarts nightly" states a routine, and "last week" needs the simple past',
    ['It is right: the simple present means happening right now', 'MC-SIMPLE-PRESENT-MEANS-HAPPENING-RIGHT-NOW'],
    ['It is right: the present perfect is just a past tense and can take a past date', 'MC-PRESENT-PERFECT-IS-JUST-PAST-TENSE'],
    'both misconceptions, with a server report'),

  // ─── eng.grammar.pronoun-antecedent-agreement ────────────────────────────
  card('eng.grammar.pronoun-antecedent-agreement', 'short_answer', M,
    'A student writes "Everybody are ready" because everybody means many people, and "When Lena called Amy, she was angry", thinking the context makes "she" clear. What is accurate?',
    '"Everybody is ready" (singular), and "she" could be Lena or Amy, so rewrite it',
    ['"Everybody are ready" is right, since indefinite pronouns are always plural', 'MC-INDEFINITE-PRONOUNS-ARE-ALWAYS-PLURAL'],
    ['The "she" sentence is fine, since an ambiguous pronoun is acceptable if the context seems clear', 'MC-AMBIGUOUS-PRONOUN-REFERENCE-IS-FINE-IF-CONTEXT-SEEMS-CLEAR'],
    'indefinite pronouns are singular; one clear antecedent, re-asked with everybody and Lena/Amy'),
  card('eng.grammar.pronoun-antecedent-agreement', 'fill_blank', M,
    'Complete the sentence: a pronoun needs ____.',
    'one clear antecedent, and an indefinite pronoun such as everyone takes a singular verb',
    ['only a context that seems clear, even when two antecedents are possible', 'MC-AMBIGUOUS-PRONOUN-REFERENCE-IS-FINE-IF-CONTEXT-SEEMS-CLEAR'],
    ['a plural verb whenever it follows an indefinite pronoun', 'MC-INDEFINITE-PRONOUNS-ARE-ALWAYS-PLURAL'],
    'Replacement texts for both misconceptions'),
  card('eng.grammar.pronoun-antecedent-agreement', 'checkpoint', A,
    'A newsletter says "Everyone are invited" since everyone is plural, and calls "The director told the manager that she would present" clear because readers will guess. Which assessment is accurate?',
    '"Everyone is invited" (singular), and "she" could be the director or the manager, so name the person',
    ['It is right: indefinite pronouns are always plural', 'MC-INDEFINITE-PRONOUNS-ARE-ALWAYS-PLURAL'],
    ['It is right: an ambiguous pronoun is fine when the context seems clear', 'MC-AMBIGUOUS-PRONOUN-REFERENCE-IS-FINE-IF-CONTEXT-SEEMS-CLEAR'],
    'both misconceptions, with a newsletter'),

  // ─── eng.grammar.pronouns ────────────────────────────────────────────────
  card('eng.grammar.pronouns', 'short_answer', M,
    'A student says "it" in "The park is lovely. It has a pond" cannot be a pronoun because pronouns only replace people, and writes "Please contact myself" for emphasis. What is accurate?',
    '"It" replaces "the park", and "contact me" is correct here',
    ['"It" is not a pronoun here, since pronouns only replace people', 'MC-PRONOUNS-ONLY-REPLACE-PEOPLE'],
    ['"Contact myself" is fine, since reflexive pronouns are just emphasis', 'MC-REFLEXIVE-PRONOUNS-ARE-JUST-EMPHASIS'],
    'pronouns replace things too; reflexive needs same referent, re-asked with a park'),
  card('eng.grammar.pronouns', 'fill_blank', M,
    'Complete the sentence: a pronoun ____.',
    'can replace a person, thing, place or idea',
    ['replaces only people, never things or places', 'MC-PRONOUNS-ONLY-REPLACE-PEOPLE'],
    ['such as "myself" is only for emphasis and can replace "me" anywhere', 'MC-REFLEXIVE-PRONOUNS-ARE-JUST-EMPHASIS'],
    'Replacement texts for both misconceptions'),
  card('eng.grammar.pronouns', 'checkpoint', A,
    'A guideline says "it" cannot refer to "the contract" because pronouns replace only people, and approves "Send the invoice to myself" as emphatic. Which assessment is accurate?',
    '"It" can replace "the contract", and "to me" is correct since "myself" needs the subject to be the same person',
    ['The guideline is right: pronouns replace only people', 'MC-PRONOUNS-ONLY-REPLACE-PEOPLE'],
    ['The guideline is right: reflexive pronouns are just emphasis', 'MC-REFLEXIVE-PRONOUNS-ARE-JUST-EMPHASIS'],
    'both misconceptions, with a contract and an invoice'),

  // ─── eng.grammar.question-formation ──────────────────────────────────────
  card('eng.grammar.question-formation', 'short_answer', M,
    'A student turns "He can swim" into "Does he can swim?" by adding "does", and writes "What you want?" for a wh-question. What is accurate?',
    'Invert the modal ("Can he swim?") and keep inversion in "What do you want?"',
    ['"Does he can swim?" is correct, since you add "do" to any statement to make a question', 'MC-JUST-ADD-DO-TO-ANY-STATEMENT'],
    ['"What you want?" is correct, since wh-questions need no inversion', 'MC-WH-QUESTIONS-DONT-NEED-INVERSION'],
    'invert an existing auxiliary; keep inversion after wh-words, re-asked with can swim'),
  card('eng.grammar.question-formation', 'fill_blank', M,
    'Complete the sentence: to form a question, ____.',
    'invert an auxiliary with the subject, adding do/does/did only if none exists',
    ['add do/does/did to every statement', 'MC-JUST-ADD-DO-TO-ANY-STATEMENT'],
    ['after a wh-word, leave the rest of the sentence in its ordinary statement order', 'MC-WH-QUESTIONS-DONT-NEED-INVERSION'],
    'Replacement texts for both misconceptions'),
  card('eng.grammar.question-formation', 'checkpoint', A,
    'A support script has "Does the system must restart?" and "When the server restarts?", and the author says do goes on every statement and wh-questions skip inversion. Which assessment is accurate?',
    '"Must the system restart?" inverts the modal, and "When does the server restart?" keeps inversion after the wh-word',
    ['The author is right: add "does" to any statement', 'MC-JUST-ADD-DO-TO-ANY-STATEMENT'],
    ['The author is right: wh-questions need no inversion', 'MC-WH-QUESTIONS-DONT-NEED-INVERSION'],
    'both misconceptions, with a support script'),

  // ─── eng.grammar.quotation-marks ─────────────────────────────────────────
  card('eng.grammar.quotation-marks', 'short_answer', M,
    'A student writes: Tom said "that he was ready" and "I am late", she said. The student says reported speech needs quotation marks and the comma goes outside the closing mark. What is accurate?',
    'Indirect speech takes no quotation marks; in American English the comma goes inside',
    ['Quotation marks are right around reported speech such as "that he was ready" in this sentence', 'MC-A-QUOTATION-MARKS-SHOULD-BE-USED-AROUND-INDIRECT-REPORTED-SPEECH-TOO'],
    ['The comma belongs outside the closing mark: "I am late", she said', 'MC-B-COMMAS-AND-END-PUNCTUATION-GO-OUTSIDE-THE-CLOSING-QUOTATION-MARK-IN-AMERICAN-ENGLISH-DIALOGUE'],
    'quotes only for exact words; American comma placement, re-asked with Tom and "I am late"'),
  card('eng.grammar.quotation-marks', 'fill_blank', M,
    'Complete the sentence: quotation marks enclose ____.',
    'a speaker\'s exact words, with the comma inside the closing mark',
    ['any reported speech, direct or indirect', 'MC-A-QUOTATION-MARKS-SHOULD-BE-USED-AROUND-INDIRECT-REPORTED-SPEECH-TOO'],
    ['a speaker\'s words, with the comma left outside the closing mark', 'MC-B-COMMAS-AND-END-PUNCTUATION-GO-OUTSIDE-THE-CLOSING-QUOTATION-MARK-IN-AMERICAN-ENGLISH-DIALOGUE'],
    'Replacement texts for both misconceptions'),
  card('eng.grammar.quotation-marks', 'checkpoint', A,
    'A press release has: The CEO said "that profits rose" and "We are growing", he added. The editor insists reported speech takes quotation marks and the comma goes outside the closing mark. Which assessment is accurate?',
    'No quotation marks for "that profits rose", and American style puts the comma inside: "We are growing," he added',
    ['She is right: reported speech takes quotation marks', 'MC-A-QUOTATION-MARKS-SHOULD-BE-USED-AROUND-INDIRECT-REPORTED-SPEECH-TOO'],
    ['She is right: the comma goes outside the closing mark', 'MC-B-COMMAS-AND-END-PUNCTUATION-GO-OUTSIDE-THE-CLOSING-QUOTATION-MARK-IN-AMERICAN-ENGLISH-DIALOGUE'],
    'both misconceptions, with a press release'),

  // ─── eng.grammar.run-on-sentences-and-comma-splices ──────────────────────
  card('eng.grammar.run-on-sentences-and-comma-splices', 'short_answer', M,
    'A student says "The bus was late, I walked home" is as correct as a compound sentence because it has a comma, and that the only fix is to split it into two sentences. What is accurate?',
    'A comma alone is a comma splice; fix it with a semicolon, a conjunction or a period',
    ['It is correct, since a comma joins two clauses just as it does in a compound sentence', 'MC-A-A-COMMA-SPLICE-IS-JUST-AS-CORRECT-AS-A-COMPOUND-SENTENCE-SINCE-BOTH-USE-A-COMMA'],
    ['The only fix is to split it into two separate sentences', 'MC-B-THE-ONLY-WAY-TO-FIX-A-RUN-ON-OR-COMMA-SPLICE-IS-TO-SPLIT-IT-INTO-TWO-SEPARATE-SENTENCES'],
    'a comma alone cannot join clauses; three valid fixes, re-asked with a late bus'),
  card('eng.grammar.run-on-sentences-and-comma-splices', 'fill_blank', M,
    'Complete the sentence: to fix a comma splice, ____.',
    'use a semicolon, a comma plus a conjunction, or a period',
    ['split it into two sentences, the only valid fix', 'MC-B-THE-ONLY-WAY-TO-FIX-A-RUN-ON-OR-COMMA-SPLICE-IS-TO-SPLIT-IT-INTO-TWO-SEPARATE-SENTENCES'],
    ['leave it, since a comma makes it a correct compound sentence', 'MC-A-A-COMMA-SPLICE-IS-JUST-AS-CORRECT-AS-A-COMPOUND-SENTENCE-SINCE-BOTH-USE-A-COMMA'],
    'Replacement texts for both misconceptions'),
  card('eng.grammar.run-on-sentences-and-comma-splices', 'checkpoint', A,
    'A manager approves "The client agreed, we shipped the order" as a compound sentence, and says a comma splice can be fixed only with a period. Which assessment is accurate?',
    'It is a comma splice; add "and", or use a semicolon or a period',
    ['She is right: a comma makes it a correct compound sentence', 'MC-A-A-COMMA-SPLICE-IS-JUST-AS-CORRECT-AS-A-COMPOUND-SENTENCE-SINCE-BOTH-USE-A-COMMA'],
    ['She is right: a period is the only fix', 'MC-B-THE-ONLY-WAY-TO-FIX-A-RUN-ON-OR-COMMA-SPLICE-IS-TO-SPLIT-IT-INTO-TWO-SEPARATE-SENTENCES'],
    'both misconceptions, with a shipped order'),

  // ─── eng.grammar.sentence-combining ──────────────────────────────────────
  card('eng.grammar.sentence-combining', 'short_answer', H,
    'A student joins "The road flooded. We took another route." as "The road flooded and we took another route", and merges a deliberately short suspense line, "She stopped. Silence.", into one long sentence because longer is better. What is accurate?',
    'A subordinator shows the cause that "and" hides, and short sentences can build suspense',
    ['Combining just means adding "and" between sentences, so "and" is always right', 'MC-A-COMBINING-SENTENCES-JUST-MEANS-ADDING-AND-BETWEEN-THEM'],
    ['Merging the suspense lines is better, since a longer combined sentence is always better', 'MC-B-A-LONGER-COMBINED-SENTENCE-IS-ALWAYS-BETTER-THAN-SEVERAL-SHORT-ONES'],
    'connectors show relationships; short sentences can serve a purpose, re-asked with a flooded road'),
  card('eng.grammar.sentence-combining', 'fill_blank', H,
    'Complete the sentence: when combining sentences, ____.',
    'choose the connector that shows the real relationship',
    ['join them with "and", the standard way to combine', 'MC-A-COMBINING-SENTENCES-JUST-MEANS-ADDING-AND-BETWEEN-THEM'],
    ['prefer the longest version, since long sentences are always better', 'MC-B-A-LONGER-COMBINED-SENTENCE-IS-ALWAYS-BETTER-THAN-SEVERAL-SHORT-ONES'],
    'Replacement texts for both misconceptions'),
  card('eng.grammar.sentence-combining', 'checkpoint', A,
    'An editor combines "The contract expired. Fees increased." as "The contract expired and fees increased", and merges every short line in a memo into long sentences, saying longer is always better. Which assessment is accurate?',
    '"Because the contract expired, fees increased" shows the cause, and short lines can be effective where emphasis is wanted',
    ['The editor is right: combining just means adding "and"', 'MC-A-COMBINING-SENTENCES-JUST-MEANS-ADDING-AND-BETWEEN-THEM'],
    ['The editor is right: longer combined sentences are always better', 'MC-B-A-LONGER-COMBINED-SENTENCE-IS-ALWAYS-BETTER-THAN-SEVERAL-SHORT-ONES'],
    'both misconceptions, with an expired contract'),

  // ─── eng.grammar.sentence-fragments ──────────────────────────────────────
  card('eng.grammar.sentence-fragments', 'short_answer', M,
    'A student says "When the bell rang." is a complete sentence because it has a subject and a verb, and fixes "We left. Because it was late." by padding the fragment with more words. What is accurate?',
    '"When the bell rang" is a dependent clause, so it is a fragment; join it to a main clause',
    ['It is complete, since a subject and a verb somewhere in the word group make it a full sentence', 'MC-A-A-GROUP-OF-WORDS-IS-A-COMPLETE-SENTENCE-AS-LONG-AS-IT-HAS-A-SUBJECT-AND-A-VERB-SOMEWHERE-IN-IT'],
    ['Padding it with more words is the only way to fix a fragment', 'MC-B-FIXING-A-FRAGMENT-ALWAYS-MEANS-ADDING-MORE-WORDS-TO-THE-SAME-STANDALONE-GROUP'],
    'dependent clause = fragment; attach it, re-asked with a bell and a late departure'),
  card('eng.grammar.sentence-fragments', 'fill_blank', M,
    'Complete the sentence: a fragment can be fixed by ____.',
    'attaching it to the sentence it belongs with, or adding what it lacks',
    ['adding more words to the same standalone group, always', 'MC-B-FIXING-A-FRAGMENT-ALWAYS-MEANS-ADDING-MORE-WORDS-TO-THE-SAME-STANDALONE-GROUP'],
    ['confirming it has a subject and a verb, which makes it complete', 'MC-A-A-GROUP-OF-WORDS-IS-A-COMPLETE-SENTENCE-AS-LONG-AS-IT-HAS-A-SUBJECT-AND-A-VERB-SOMEWHERE-IN-IT'],
    'Replacement texts for both misconceptions'),
  card('eng.grammar.sentence-fragments', 'checkpoint', A,
    'A draft reads "Although the vendor replied." A reviewer says it is a complete sentence since it contains a subject and a verb, and that the only fix is to lengthen it into a standalone clause. Which assessment is accurate?',
    'It is a fragment; attach it to a main clause',
    ['She is right: a subject and a verb make it complete', 'MC-A-A-GROUP-OF-WORDS-IS-A-COMPLETE-SENTENCE-AS-LONG-AS-IT-HAS-A-SUBJECT-AND-A-VERB-SOMEWHERE-IN-IT'],
    ['She is right: adding more words to the same group is the only fix', 'MC-B-FIXING-A-FRAGMENT-ALWAYS-MEANS-ADDING-MORE-WORDS-TO-THE-SAME-STANDALONE-GROUP'],
    'both misconceptions, with a vendor reply'),
]
