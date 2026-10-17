/**
 * ENGLISH CARD-DEPTH CAMPAIGN — Batch 20 (eng.grammar part 2, 26 cards).
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
 * slug and abandon the live row's identity. Each grammar concept already uses native band : mcq, misconception_probe, true_false, checkpoint and ADULT : mcq, misconception_probe, so the new cards take the FREE slots native band : short_answer, fill_blank and ADULT : checkpoint. eng.grammar.future-tenses already holds one 3-option card, so it receives two (short_answer + checkpoint). The native band is MIDDLE for every concept in this batch.
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


export const ENGLISH_CARD_DEPTH_BATCH_20: SeedProbe[] = [
  // ─── eng.grammar.comparatives-and-superlatives ───────────────────────────
  card('eng.grammar.comparatives-and-superlatives', 'short_answer', M,
    'A student forms comparatives by always adding -er ("interestinger", "gooder") and says "better" is just a mistake. What is accurate?',
    '"More interesting" for long adjectives, and "better" is the irregular form of "good"',
    ['"Interestinger" is right, since -er can be added to every adjective in English without exception', 'MC-ALWAYS-ADD-ER-EST-OR-ALWAYS-USE-MORE-MOST'],
    ['"Better" is a mistake, since the regular -er rule gives "gooder"', 'MC-IRREGULAR-COMPARATIVES-ARE-JUST-MISTAKES'],
    'rule depends on the word; irregular forms are standard, re-asked with interesting and good'),
  card('eng.grammar.comparatives-and-superlatives', 'fill_blank', M,
    'Complete the sentence: to form a comparative, ____.',
    'check its length and ending, and learn irregulars like good → better',
    ['always add -er, or always use "more", whatever the word is', 'MC-ALWAYS-ADD-ER-EST-OR-ALWAYS-USE-MORE-MOST'],
    ['treat forms like "better" and "worse" as mistakes that need correcting', 'MC-IRREGULAR-COMPARATIVES-ARE-JUST-MISTAKES'],
    'Replacement texts for both misconceptions'),
  card('eng.grammar.comparatives-and-superlatives', 'checkpoint', A,
    'A style guide tells writers to always use "more" with adjectives ("more fast", "more good") and to correct "worse" to "more bad". Which assessment is accurate?',
    'Short adjectives usually take -er ("faster"), and "better" and "worse" are standard irregular forms',
    ['The guide is right: "more" works with every adjective, however short', 'MC-ALWAYS-ADD-ER-EST-OR-ALWAYS-USE-MORE-MOST'],
    ['The guide is right: "worse" is a mistake and "more bad" is the correct form', 'MC-IRREGULAR-COMPARATIVES-ARE-JUST-MISTAKES'],
    'both misconceptions, with a style guide'),

  // ─── eng.grammar.complex-sentences ───────────────────────────────────────
  card('eng.grammar.complex-sentences', 'short_answer', M,
    'A student says "The bus was late because the road flooded" is compound since it has two clauses, and that "because the road flooded" cannot come second in a complex sentence. What is accurate?',
    'It is complex: one independent and one dependent clause, in either order',
    ['It is compound, since any sentence with two clauses and a joining word is compound', 'MC-A-SENTENCE-WITH-A-SUBORDINATING-WORD-IS-COMPOUND'],
    ['The dependent clause must always come first, so this order is wrong', 'MC-THE-DEPENDENT-CLAUSE-MUST-ALWAYS-COME-FIRST'],
    'complex ≠ compound; either clause order, re-asked with a flooded road'),
  card('eng.grammar.complex-sentences', 'fill_blank', M,
    'Complete the sentence: a complex sentence ____.',
    'has an independent clause and a dependent clause, in either order',
    ['has two clauses joined by a word like "because", which makes it compound', 'MC-A-SENTENCE-WITH-A-SUBORDINATING-WORD-IS-COMPOUND'],
    ['must begin with its dependent clause', 'MC-THE-DEPENDENT-CLAUSE-MUST-ALWAYS-COME-FIRST'],
    'Replacement texts for both misconceptions'),
  card('eng.grammar.complex-sentences', 'checkpoint', A,
    'A manual labels "The audit continued although the deadline had passed" a compound sentence, and rejects it because "although the deadline had passed" should open the sentence. Which assessment is accurate?',
    'It is complex, and a dependent clause can follow the main clause without any error',
    ['The manual is right: a subordinating word makes a sentence compound', 'MC-A-SENTENCE-WITH-A-SUBORDINATING-WORD-IS-COMPOUND'],
    ['The manual is right: the dependent clause must always come first', 'MC-THE-DEPENDENT-CLAUSE-MUST-ALWAYS-COME-FIRST'],
    'both misconceptions, with an audit sentence'),

  // ─── eng.grammar.compound-sentences ──────────────────────────────────────
  card('eng.grammar.compound-sentences', 'short_answer', M,
    'A student says "She sang and danced" is compound because of "and", and leaves "The bus was late, we walked" alone because a comma and a semicolon do the same job. What is accurate?',
    '"She sang and danced" is not compound; independent clauses need a semicolon or comma + conjunction',
    ['"And" makes any sentence compound, so "She sang and danced" is compound', 'MC-ANY-CONJUNCTION-CREATES-A-COMPOUND-SENTENCE'],
    ['A comma alone is fine there, since a comma and a semicolon are interchangeable joiners of two clauses', 'MC-A-SEMICOLON-AND-A-COMMA-ARE-INTERCHANGEABLE-JOINERS'],
    'compound needs two independent clauses; a comma alone cannot join them, re-asked with singing and a bus'),
  card('eng.grammar.compound-sentences', 'fill_blank', M,
    'Complete the sentence: a compound sentence ____.',
    'joins two independent clauses with a comma and conjunction, or a semicolon',
    ['is any sentence that contains a conjunction such as "and"', 'MC-ANY-CONJUNCTION-CREATES-A-COMPOUND-SENTENCE'],
    ['can join its clauses with either a comma or a semicolon, as they are the same', 'MC-A-SEMICOLON-AND-A-COMMA-ARE-INTERCHANGEABLE-JOINERS'],
    'Replacement texts for both misconceptions'),
  card('eng.grammar.compound-sentences', 'checkpoint', A,
    'A newsletter calls "The vendors reviewed and approved the plan" compound because of "and", and accepts "The test ended, the team celebrated" as correct, saying commas and semicolons are interchangeable. Which assessment is accurate?',
    'The first has one subject, so it is not compound; the second needs a semicolon or a conjunction after the comma',
    ['The newsletter is right: any "and" makes a sentence compound', 'MC-ANY-CONJUNCTION-CREATES-A-COMPOUND-SENTENCE'],
    ['The newsletter is right: a comma and a semicolon are interchangeable', 'MC-A-SEMICOLON-AND-A-COMMA-ARE-INTERCHANGEABLE-JOINERS'],
    'both misconceptions, with a newsletter'),

  // ─── eng.grammar.conditionals ────────────────────────────────────────────
  card('eng.grammar.conditionals', 'short_answer', M,
    'A student says "If I were taller, I would play basketball" is about the past because "were" is past tense, and that "If you heat ice, it melts" should use the same structure with "would". What is accurate?',
    'Past form here shows an unreal present; a general truth takes present tense in both clauses',
    ['"Were" shows past time, so the sentence is about something that happened', 'MC-SECOND-CONDITIONAL-PAST-TENSE-MEANS-PAST-TIME'],
    ['Both sentences use one structure, so "If you heat ice, it would melt" is just the same thing', 'MC-ALL-CONDITIONALS-ARE-THE-SAME-STRUCTURE'],
    'past form ≠ past time; conditionals differ, re-asked with basketball and melting ice'),
  card('eng.grammar.conditionals', 'fill_blank', M,
    'Complete the sentence: in "If I knew the answer, I would tell you", the past form "knew" ____.',
    'signals an unreal present, not past time',
    ['places the knowing in the past, before now', 'MC-SECOND-CONDITIONAL-PAST-TENSE-MEANS-PAST-TIME'],
    ['follows the same structure as in every other conditional', 'MC-ALL-CONDITIONALS-ARE-THE-SAME-STRUCTURE'],
    'Replacement texts for both misconceptions'),
  card('eng.grammar.conditionals', 'checkpoint', A,
    'A training note says "If the supplier were available now, we would order today" refers to last week because "were" is past, and that every conditional follows "if + past, would + verb". Which assessment is accurate?',
    'It describes an unreal present, and other conditionals follow different patterns',
    ['The note is right: "were" shows past time', 'MC-SECOND-CONDITIONAL-PAST-TENSE-MEANS-PAST-TIME'],
    ['The note is right: all conditionals share the same structure', 'MC-ALL-CONDITIONALS-ARE-THE-SAME-STRUCTURE'],
    'both misconceptions, with a supplier note'),

  // ─── eng.grammar.conjunctions ────────────────────────────────────────────
  card('eng.grammar.conjunctions', 'short_answer', M,
    'A student writes "Although it snowed we walked" with no comma, and "She smiled but, he frowned". She says all conjunctions work the same way and commas go wherever feels right. What is accurate?',
    '"Although" opening a sentence needs a comma after its clause; "but" takes one before it',
    ['All conjunctions work the same way, so "although" and "but" take the same comma pattern', 'MC-ALL-CONJUNCTIONS-WORK-THE-SAME-WAY'],
    ['Commas with conjunctions are placed by feel, so both sentences are acceptable', 'MC-COMMA-PLACEMENT-WITH-CONJUNCTIONS-IS-RANDOM'],
    'conjunction type and clause order decide the comma, re-asked with although and but'),
  card('eng.grammar.conjunctions', 'fill_blank', M,
    'Complete the sentence: where a comma goes with a conjunction depends on ____.',
    'the type of conjunction and the order of the clauses',
    ['nothing, because every conjunction works the same way', 'MC-ALL-CONJUNCTIONS-WORK-THE-SAME-WAY'],
    ['the writer\'s feeling, since placement is random', 'MC-COMMA-PLACEMENT-WITH-CONJUNCTIONS-IS-RANDOM'],
    'Replacement texts for both misconceptions'),
  card('eng.grammar.conjunctions', 'checkpoint', A,
    'A guideline puts a comma after "because" in "The meeting ended early because, the speaker was ill", and treats "and" and "because" as doing the same job. Which assessment is accurate?',
    '"Because" introduces a dependent clause and takes no comma after it here, while "and" joins equal clauses, so they differ',
    ['The guideline is right: all conjunctions work the same way', 'MC-ALL-CONJUNCTIONS-WORK-THE-SAME-WAY'],
    ['The guideline is right: comma placement with conjunctions is random', 'MC-COMMA-PLACEMENT-WITH-CONJUNCTIONS-IS-RANDOM'],
    'both misconceptions, with a meeting sentence'),

  // ─── eng.grammar.direct-and-indirect-speech ──────────────────────────────
  card('eng.grammar.direct-and-indirect-speech', 'short_answer', M,
    'Mia said, "I will call you tomorrow." A student reports it as "Mia said I will call you tomorrow", and says backshift is required even for a still-true fact like "Water boils at 100 degrees". What is accurate?',
    'Pronoun, tense and time words all shift, but a still-true fact can keep its tense',
    ['Removing the quotation marks is enough to make indirect speech', 'MC-INDIRECT-SPEECH-IS-JUST-REMOVING-QUOTATION-MARKS'],
    ['Backshift is always required, even for facts that are still true and never change', 'MC-BACKSHIFT-ALWAYS-REQUIRED-REGARDLESS-OF-TRUTH-STATUS'],
    'three shifts, not just dropping quotes; facts can keep their tense, re-asked with Mia calling'),
  card('eng.grammar.direct-and-indirect-speech', 'fill_blank', M,
    'Complete the sentence: in indirect speech, ____.',
    'shift tense, pronouns and time words, though a true fact may stay',
    ['remove the quotation marks and leave the words unchanged', 'MC-INDIRECT-SPEECH-IS-JUST-REMOVING-QUOTATION-MARKS'],
    ['always backshift the tense, whether or not the statement is still true', 'MC-BACKSHIFT-ALWAYS-REQUIRED-REGARDLESS-OF-TRUTH-STATUS'],
    'Replacement texts for both misconceptions'),
  card('eng.grammar.direct-and-indirect-speech', 'checkpoint', A,
    'The director said, "I will sign the contract tomorrow." The minutes read "The director said I will sign the contract tomorrow", and an editor adds that a fact like "the sun rises in the east" must always backshift. Which assessment is accurate?',
    'The minutes need shifts ("she would sign the contract the next day"), and a still-true fact may keep its tense',
    ['The minutes are fine: indirect speech just drops the quotation marks', 'MC-INDIRECT-SPEECH-IS-JUST-REMOVING-QUOTATION-MARKS'],
    ['The editor is right: backshift is always required whether or not the fact is still true', 'MC-BACKSHIFT-ALWAYS-REQUIRED-REGARDLESS-OF-TRUTH-STATUS'],
    'both misconceptions, with meeting minutes'),

  // ─── eng.grammar.end-punctuation ─────────────────────────────────────────
  card('eng.grammar.end-punctuation', 'short_answer', M,
    'A student writes "How kind of you to come" with a question mark because it starts with "How", and says an exclamation point is only for shouting, so a whispered "We did it" should end with a period. What is accurate?',
    '"How kind of you to come!" is an exclamation, and a whispered "We did it!" can carry feeling',
    ['Any sentence starting with a wh-word, including "How kind of you to come", takes a question mark', 'MC-ANY-SENTENCE-STARTING-WITH-A-WH-WORD-IS-A-QUESTION-MARK'],
    ['An exclamation point means a loud voice, so a whispered line cannot take one', 'MC-EXCLAMATION-POINT-MEANS-LOUD-NOT-EMOTIONAL'],
    'function and feeling decide punctuation, re-asked with "How kind of you" and a whisper'),
  card('eng.grammar.end-punctuation', 'fill_blank', M,
    'Complete the sentence: choose end punctuation by ____.',
    'function and strength of feeling, not the first word',
    ['its first word, so a wh-word always means a question mark', 'MC-ANY-SENTENCE-STARTING-WITH-A-WH-WORD-IS-A-QUESTION-MARK'],
    ['how loudly it would be spoken aloud', 'MC-EXCLAMATION-POINT-MEANS-LOUD-NOT-EMOTIONAL'],
    'Replacement texts for both misconceptions'),
  card('eng.grammar.end-punctuation', 'checkpoint', A,
    'An editor changes "What a relief it is to finish" to end with a question mark because it starts with "what", and removes the exclamation point from "We hit our target!" since the message is calmly delivered. Which assessment is accurate?',
    'The first is an exclamation, not a question, and an exclamation point marks feeling whatever the volume',
    ['He is right: any sentence starting with a wh-word is a question', 'MC-ANY-SENTENCE-STARTING-WITH-A-WH-WORD-IS-A-QUESTION-MARK'],
    ['He is right: an exclamation point only means loud', 'MC-EXCLAMATION-POINT-MEANS-LOUD-NOT-EMOTIONAL'],
    'both misconceptions, with an editor'),

  // ─── eng.grammar.future-tenses (two cards: one 3-option card already exists) ─
  card('eng.grammar.future-tenses', 'short_answer', M,
    'A shop assistant, hearing a customer ask for a bag, replies "I am going to get one" on the spot, and a timetable says "The shop opens at 9 tomorrow". A trainee says will and going to are interchangeable, and that the timetable cannot refer to the future because it is in the present tense. What is accurate?',
    'A spontaneous offer takes "will", and the present tense can state a timetabled future',
    ['"Will" and "going to" are fully interchangeable in every situation', 'MC-WILL-AND-GOING-TO-ARE-FULLY-INTERCHANGEABLE'],
    ['A present-tense verb cannot express future time, so the timetable sentence is simply wrong', 'MC-PRESENT-TENSE-CANNOT-EXPRESS-FUTURE-TIME'],
    'will vs going to; present tense for timetables, re-asked with a shop assistant'),
  card('eng.grammar.future-tenses', 'checkpoint', A,
    'A coordinator says "We are meeting the client on Friday" cannot refer to the future because it uses the present continuous, and that for a firm plan "will" and "going to" are interchangeable. Which assessment is accurate?',
    'The present continuous often expresses a confirmed future plan, and "going to" fits a plan better than a spontaneous "will"',
    ['She is right: the present tense cannot express future time', 'MC-PRESENT-TENSE-CANNOT-EXPRESS-FUTURE-TIME'],
    ['She is right: "will" and "going to" are interchangeable', 'MC-WILL-AND-GOING-TO-ARE-FULLY-INTERCHANGEABLE'],
    'both misconceptions, with a client meeting'),

  // ─── eng.grammar.gerunds-and-infinitives ─────────────────────────────────
  card('eng.grammar.gerunds-and-infinitives', 'short_answer', M,
    'A student says "painting" in "Painting relaxes me" is just present continuous, and that "I enjoy painting" and "I enjoy to paint" are interchangeable because gerunds and infinitives always swap. What is accurate?',
    'It is a gerund acting as a noun, and "enjoy" takes a gerund, not an infinitive',
    ['"Painting" is present continuous here, since every -ing word is the same', 'MC-GERUND-IS-JUST-PRESENT-CONTINUOUS'],
    ['Both sentences are correct, since a gerund and an infinitive are always interchangeable', 'MC-GERUND-AND-INFINITIVE-ARE-ALWAYS-INTERCHANGEABLE'],
    'gerund is a noun use; verbs govern the form, re-asked with painting'),
  card('eng.grammar.gerunds-and-infinitives', 'fill_blank', M,
    'Complete the sentence: after a verb such as "enjoy", ____.',
    'use a gerund, because some verbs take only a gerund or only an infinitive',
    ['use a present continuous verb, since a gerund is only that form', 'MC-GERUND-IS-JUST-PRESENT-CONTINUOUS'],
    ['either form works, since gerunds and infinitives are always interchangeable', 'MC-GERUND-AND-INFINITIVE-ARE-ALWAYS-INTERCHANGEABLE'],
    'Replacement texts for both misconceptions'),
  card('eng.grammar.gerunds-and-infinitives', 'checkpoint', A,
    'A style note says "Reviewing the plan took an hour" uses a present continuous verb, and that "She stopped to smoke" and "She stopped smoking" mean the same because gerunds and infinitives are interchangeable. Which assessment is accurate?',
    '"Reviewing" is a gerund subject, and the two stop-sentences differ in meaning: "stopped to smoke" and "stopped smoking"',
    ['The note is right: a gerund is just present continuous', 'MC-GERUND-IS-JUST-PRESENT-CONTINUOUS'],
    ['The note is right: the two forms always mean the same', 'MC-GERUND-AND-INFINITIVE-ARE-ALWAYS-INTERCHANGEABLE'],
    'both misconceptions, with reviewing and stop'),
]
