/**
 * ENGLISH PROBE-CONTRACT CAMPAIGN — Batch 2.
 *
 * 15 more MIDDLE-band grammar/vocab concepts, all re-measured at closed=2
 * (mcq x1 + misconception_probe x1) directly from the seed corpus in git
 * before authoring (zero DB access, zero egress). Each concept goes
 * straight from depth 2 to depth 4 — TWO new probes, matching the
 * owner-set resilience target (Batch 1's live Mohd validation proved
 * depth 3 is zero-slack; depth 4 tolerates one imperfect answer).
 *
 * Probe A: probeKind 'checkpoint' (depth 3), reuses the concept's FIRST
 *   registered misconception from a fresh angle.
 * Probe B: probeKind 'true_false' (depth 4), reuses the concept's SECOND
 *   registered misconception from a fresh angle.
 * Both verified free (no prior 'checkpoint'/'true_false' probe) for all
 * 15 concepts before authoring — a fresh, collision-free pair of slots
 * each, same P-10-safe technique as every prior file in this campaign.
 * No new misconception ids. No Educational Brain authoring.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedProbe } from './brainSeedAssets'

const S = 'english'
const src = (concept: string, what: string) =>
  `docs/curriculum/blueprints/${concept}.md — Misconception Registry; ${what}`

function probe(
  conceptId: string,
  kind: 'checkpoint' | 'true_false',
  stem: string,
  correct: string,
  wrong: string,
  misconceptionId: string,
  note: string,
): SeedProbe {
  return {
    conceptId, subjectSlug: S, probeKind: kind,
    gradeBand: GradeBand.MIDDLE,
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

export const ENGLISH_PROBE_BATCH_2: SeedProbe[] = [
  // ─── eng.grammar.question-formation ────────────────────────────────────
  probe('eng.grammar.question-formation', 'checkpoint',
    'How do you correctly turn "She sings well" into a yes/no question?',
    '"Does she sing well?" — insert "does," move it before the subject, and revert the verb to base form',
    '"Do she sings well?" — just add "do" to the front of any statement',
    'eng.grammar.question-formation:MC-JUST-ADD-DO-TO-ANY-STATEMENT',
    'MC-JUST-ADD-DO-TO-ANY-STATEMENT — a subject-verb-agreement-sensitive example'),
  probe('eng.grammar.question-formation', 'true_false',
    'Which is correct — "Where you are going?" or "Where are you going?"',
    '"Where are you going?" — wh-questions still need subject-auxiliary inversion, just like yes/no questions',
    '"Where you are going?" — wh-questions keep normal statement word order since the question word already signals a question',
    'eng.grammar.question-formation:MC-WH-QUESTIONS-DONT-NEED-INVERSION',
    'MC-WH-QUESTIONS-DONT-NEED-INVERSION'),

  // ─── eng.grammar.direct-and-indirect-speech ────────────────────────────
  probe('eng.grammar.direct-and-indirect-speech', 'checkpoint',
    'Convert to indirect speech: She said, "I am tired." Which is correct?',
    '"She said she was tired." — the pronoun and tense both shift, not just the punctuation',
    '"She said I am tired." — just remove the quotation marks and keep everything else the same',
    'eng.grammar.direct-and-indirect-speech:MC-INDIRECT-SPEECH-IS-JUST-REMOVING-QUOTATION-MARKS',
    'MC-INDIRECT-SPEECH-IS-JUST-REMOVING-QUOTATION-MARKS'),
  probe('eng.grammar.direct-and-indirect-speech', 'true_false',
    'He said, "The sun rises in the east" (a universal truth). Reporting this indirectly, must the tense shift back to past?',
    'No — universal truths and facts still true can keep the present tense even in reported speech: "He said the sun rises in the east"',
    'Yes — backshift to an earlier tense is always required in indirect speech, no matter what is being reported',
    'eng.grammar.direct-and-indirect-speech:MC-BACKSHIFT-ALWAYS-REQUIRED-REGARDLESS-OF-TRUTH-STATUS',
    'MC-BACKSHIFT-ALWAYS-REQUIRED-REGARDLESS-OF-TRUTH-STATUS'),

  // ─── eng.grammar.interjections ──────────────────────────────────────────
  probe('eng.grammar.interjections', 'checkpoint',
    '"Well, I suppose we could try that." Is "well" an interjection here, even though the sentence ends with a period, not an exclamation point?',
    'Yes — interjections can appear in calm, quiet speech too; they do not require an exclamation point',
    'No — an interjection must always be paired with an exclamation point to count as one',
    'eng.grammar.interjections:MC-INTERJECTIONS-MUST-BE-EXCLAMATIONS-WITH-EXCLAMATION-POINTS',
    'MC-INTERJECTIONS-MUST-BE-EXCLAMATIONS-WITH-EXCLAMATION-POINTS'),
  probe('eng.grammar.interjections', 'true_false',
    'Do interjections like "Ouch!" or "Wow!" have any real grammatical status, or are they just meaningless filler?',
    'They have real status — interjections are a recognized part of speech, standing independently to express sudden emotion',
    'They are just filler noise with no grammatical role at all',
    'eng.grammar.interjections:MC-INTERJECTIONS-ARE-JUST-FILLER-WITH-NO-GRAMMATICAL-STATUS',
    'MC-INTERJECTIONS-ARE-JUST-FILLER-WITH-NO-GRAMMATICAL-STATUS'),

  // ─── eng.grammar.pronouns ────────────────────────────────────────────────
  probe('eng.grammar.pronouns', 'checkpoint',
    '"I bought a lamp. It is bright." What does the pronoun "it" replace?',
    '"Lamp" — a thing, not a person; pronouns can stand in for objects and ideas too, not just people',
    'Nothing valid — pronouns can only replace people’s names',
    'eng.grammar.pronouns:MC-PRONOUNS-ONLY-REPLACE-PEOPLE',
    'MC-PRONOUNS-ONLY-REPLACE-PEOPLE'),
  probe('eng.grammar.pronouns', 'true_false',
    '"She hurt herself." Is "herself" just adding emphasis here, or is it doing real grammatical work?',
    'Real work — "herself" is the OBJECT of the verb "hurt," showing the action’s target is the same as its subject, not merely emphasis',
    'Just emphasis — reflexive pronouns like "herself" only stress a point and could be removed with no grammatical change',
    'eng.grammar.pronouns:MC-REFLEXIVE-PRONOUNS-ARE-JUST-EMPHASIS',
    'MC-REFLEXIVE-PRONOUNS-ARE-JUST-EMPHASIS'),

  // ─── eng.grammar.sentence-types-by-function ────────────────────────────
  probe('eng.grammar.sentence-types-by-function', 'checkpoint',
    '"Close the door!" Is this an exclamatory sentence just because it ends with an exclamation point?',
    'No — it is imperative (a command); the exclamation point only adds emphasis, it does not change the sentence’s FUNCTION',
    'Yes — the exclamation point alone is what determines that this is an exclamatory sentence',
    'eng.grammar.sentence-types-by-function:MC-PUNCTUATION-MARK-ALONE-DEFINES-SENTENCE-TYPE',
    'MC-PUNCTUATION-MARK-ALONE-DEFINES-SENTENCE-TYPE'),
  probe('eng.grammar.sentence-types-by-function', 'true_false',
    '"Did you finish your homework?" Does this interrogative sentence start with a question word like "what" or "where"?',
    'No — yes/no questions start with an auxiliary verb ("did"), not a question word, and are still interrogative',
    'It must not really be a question — interrogative sentences always start with a question word',
    'eng.grammar.sentence-types-by-function:MC-QUESTIONS-ALWAYS-START-WITH-A-QUESTION-WORD',
    'MC-QUESTIONS-ALWAYS-START-WITH-A-QUESTION-WORD'),

  // ─── eng.grammar.phrases ─────────────────────────────────────────────────
  probe('eng.grammar.phrases', 'checkpoint',
    'Is "the tall boy" a phrase in the same specific grammatical sense as any random group of words like "dog the quickly"?',
    'No — "the tall boy" is a coherent NOUN PHRASE functioning as one grammatical unit; a random word jumble is not a phrase in that sense',
    'Yes — a phrase is simply any group of words placed next to each other',
    'eng.grammar.phrases:MC-A-PHRASE-IS-JUST-ANY-GROUP-OF-WORDS',
    'MC-A-PHRASE-IS-JUST-ANY-GROUP-OF-WORDS'),
  probe('eng.grammar.phrases', 'true_false',
    '"Running in the park" versus "He was running in the park." Do both count as clauses?',
    'No — "running in the park" is a phrase (no subject-verb pair); "he was running in the park" is a clause because it has both',
    'Yes — phrases and clauses are just two names for the same thing',
    'eng.grammar.phrases:MC-PHRASES-AND-CLAUSES-ARE-THE-SAME-THING',
    'MC-PHRASES-AND-CLAUSES-ARE-THE-SAME-THING'),

  // ─── eng.grammar.tense-consistency ──────────────────────────────────────
  probe('eng.grammar.tense-consistency', 'checkpoint',
    '"I walked to the store because I need milk." Is mixing past ("walked") and present ("need") always wrong?',
    'No — the shift is logical: the walking happened in the past, but the need for milk is still true now; tense consistency means logical shifts are fine',
    'Yes — every verb in a passage must use the exact same tense with no exceptions',
    'eng.grammar.tense-consistency:MC-ALL-VERBS-IN-A-PASSAGE-MUST-MATCH-EXACTLY',
    'MC-ALL-VERBS-IN-A-PASSAGE-MUST-MATCH-EXACTLY'),
  probe('eng.grammar.tense-consistency', 'true_false',
    '"So the wolf huffs and puffs and blows the house down." Can a story be told entirely in present tense like this?',
    'Yes — present tense is a valid, common storytelling choice (the "historical present"), not only past tense',
    'No — narratives must always be told in past tense',
    'eng.grammar.tense-consistency:MC-NARRATIVE-TENSE-CANT-BE-PRESENT',
    'MC-NARRATIVE-TENSE-CANT-BE-PRESENT'),

  // ─── eng.grammar.clauses ─────────────────────────────────────────────────
  probe('eng.grammar.clauses', 'checkpoint',
    '"Because it was raining" — does this count as a clause even though it cannot stand alone as a full sentence?',
    'Yes — it has a subject ("it") and a verb ("was raining"), so it is a clause; being DEPENDENT (needing "because") does not stop it being a clause',
    'No — adding a subordinating word like "because" means it is no longer a clause at all',
    'eng.grammar.clauses:MC-A-CLAUSE-WITH-A-SUBORDINATING-WORD-ISNT-A-CLAUSE',
    'MC-A-CLAUSE-WITH-A-SUBORDINATING-WORD-ISNT-A-CLAUSE'),
  probe('eng.grammar.clauses', 'true_false',
    '"I like tea, and she likes coffee" has two independent clauses joined together. Does that make it a simple sentence?',
    'No — a sentence built from two independent clauses is a COMPOUND sentence; "independent clause" describes the clause type, not the sentence classification',
    'Yes — as long as every clause is independent, the sentence stays a simple sentence',
    'eng.grammar.clauses:MC-INDEPENDENT-CLAUSE-MEANS-SIMPLE-SENTENCE-ONLY',
    'MC-INDEPENDENT-CLAUSE-MEANS-SIMPLE-SENTENCE-ONLY'),

  // ─── eng.grammar.conditionals ────────────────────────────────────────────
  probe('eng.grammar.conditionals', 'checkpoint',
    '"If I won the lottery, I would travel the world." Does the past-tense verb "won" mean this already happened?',
    'No — the second conditional uses past-tense FORM to signal a hypothetical, unlikely present/future situation, not actual past time',
    'Yes — using "won" means the speaker is describing something that already happened in the past',
    'eng.grammar.conditionals:MC-SECOND-CONDITIONAL-PAST-TENSE-MEANS-PAST-TIME',
    'MC-SECOND-CONDITIONAL-PAST-TENSE-MEANS-PAST-TIME'),
  probe('eng.grammar.conditionals', 'true_false',
    '"If it rains, I stay home" (a general habit) and "If I had studied, I would have passed" (an unreal past). Do these follow the same conditional structure?',
    'No — the first is a zero conditional (general truth); the second is a third conditional (counterfactual past) — different structures for different meanings',
    'Yes — all conditional sentences follow one identical if-then structure',
    'eng.grammar.conditionals:MC-ALL-CONDITIONALS-ARE-THE-SAME-STRUCTURE',
    'MC-ALL-CONDITIONALS-ARE-THE-SAME-STRUCTURE'),

  // ─── eng.grammar.participles-and-participial-phrases ────────────────────
  probe('eng.grammar.participles-and-participial-phrases', 'checkpoint',
    '"The barking dog woke me up." Is "barking" here functioning the same way as a gerund (a noun)?',
    'No — here "barking" is a present participle acting as an ADJECTIVE describing "dog," not a noun; the same -ing form plays different roles',
    'Yes — any -ing word is a gerund, whatever role it plays in the sentence',
    'eng.grammar.participles-and-participial-phrases:MC-PRESENT-PARTICIPLE-IS-JUST-A-GERUND-AGAIN',
    'MC-PRESENT-PARTICIPLE-IS-JUST-A-GERUND-AGAIN'),
  probe('eng.grammar.participles-and-participial-phrases', 'true_false',
    '"Walking down the street, the trees looked beautiful." Is this sentence correct, since most readers can guess what is meant?',
    'No — this is a dangling participle: it says the TREES were walking, which is grammatically wrong even if the intended meaning is guessable',
    'Yes — as long as the reader can figure out the intended meaning, a dangling participle is not a real problem',
    'eng.grammar.participles-and-participial-phrases:MC-DANGLING-PARTICIPLES-ARE-FINE-IF-MEANING-IS-CLEAR',
    'MC-DANGLING-PARTICIPLES-ARE-FINE-IF-MEANING-IS-CLEAR'),

  // ─── eng.grammar.pronoun-antecedent-agreement ───────────────────────────
  probe('eng.grammar.pronoun-antecedent-agreement', 'checkpoint',
    '"Everyone should bring ___ own lunch." Which fits standard agreement — treating "everyone" as singular or as strictly plural?',
    '"Everyone" is grammatically singular, so it takes a singular pronoun reference ("his or her," or singular "their" in modern usage)',
    '"Everyone" refers to a group of people, so it must always take a plural pronoun',
    'eng.grammar.pronoun-antecedent-agreement:MC-INDEFINITE-PRONOUNS-ARE-ALWAYS-PLURAL',
    'MC-INDEFINITE-PRONOUNS-ARE-ALWAYS-PLURAL'),
  probe('eng.grammar.pronoun-antecedent-agreement', 'true_false',
    '"Sam told Jake that he had won." Is it fine to leave "he" referring to either Sam or Jake, since the reader can probably guess?',
    'No — this is genuinely ambiguous and should be rewritten (e.g., "Sam told Jake, \'You won\'"); a guessable reading is not the same as a clear one',
    'Yes — as long as the sentence sounds natural, an ambiguous pronoun reference does not need fixing',
    'eng.grammar.pronoun-antecedent-agreement:MC-AMBIGUOUS-PRONOUN-REFERENCE-IS-FINE-IF-CONTEXT-SEEMS-CLEAR',
    'MC-AMBIGUOUS-PRONOUN-REFERENCE-IS-FINE-IF-CONTEXT-SEEMS-CLEAR'),

  // ─── eng.grammar.end-punctuation ─────────────────────────────────────────
  probe('eng.grammar.end-punctuation', 'checkpoint',
    '"I can’t believe we won!" Does the exclamation point here mean the sentence must be spoken loudly?',
    'No — the exclamation point signals strong EMOTION (excitement, surprise), which is not the same thing as literal loudness',
    'Yes — an exclamation point specifically indicates that a sentence should be shouted or spoken loudly',
    'eng.grammar.end-punctuation:MC-EXCLAMATION-POINT-MEANS-LOUD-NOT-EMOTIONAL',
    'MC-EXCLAMATION-POINT-MEANS-LOUD-NOT-EMOTIONAL'),
  probe('eng.grammar.end-punctuation', 'true_false',
    '"What a beautiful sunset!" This starts with "what," a wh-word. Does it need a question mark?',
    'No — this is an exclamatory sentence expressing admiration, not a question; starting with a wh-word does not automatically mean a question mark',
    'Yes — any sentence beginning with a wh-word like "what" must end with a question mark',
    'eng.grammar.end-punctuation:MC-ANY-SENTENCE-STARTING-WITH-A-WH-WORD-IS-A-QUESTION-MARK',
    'MC-ANY-SENTENCE-STARTING-WITH-A-WH-WORD-IS-A-QUESTION-MARK'),

  // ─── eng.grammar.simple-sentences ────────────────────────────────────────
  probe('eng.grammar.simple-sentences', 'checkpoint',
    '"The exhausted marathon runner collapsed dramatically across the finish line." Is this a simple sentence, even though it is a long one?',
    'Yes — it has exactly one independent clause (one subject, one verb); "simple" describes the STRUCTURE, not the sentence’s length',
    'No — a sentence this long cannot be a simple sentence',
    'eng.grammar.simple-sentences:MC-SIMPLE-SENTENCE-MEANS-SHORT-SENTENCE',
    'MC-SIMPLE-SENTENCE-MEANS-SHORT-SENTENCE'),
  probe('eng.grammar.simple-sentences', 'true_false',
    '"Tom and Jerry ran and jumped." This sentence contains "and" twice. Can it still be a simple sentence?',
    'Yes — "and" can join a compound subject or compound verb WITHIN one independent clause without creating a compound sentence',
    'No — any sentence containing the word "and" is automatically a compound sentence, never simple',
    'eng.grammar.simple-sentences:MC-A-SENTENCE-WITH-AND-IS-NEVER-SIMPLE',
    'MC-A-SENTENCE-WITH-AND-IS-NEVER-SIMPLE'),

  // ─── eng.grammar.comma-usage ─────────────────────────────────────────────
  probe('eng.grammar.comma-usage', 'checkpoint',
    'You might pause briefly before "quickly" when saying "She ran quickly to the store." Should a comma go there?',
    'No — comma placement follows grammatical rules (lists, clauses, introductory elements), not simply wherever a speaker pauses for breath',
    'Yes — a comma should go anywhere you naturally pause while speaking the sentence',
    'eng.grammar.comma-usage:MC-COMMA-GOES-WHEREVER-YOU-PAUSE-WHEN-SPEAKING',
    'MC-COMMA-GOES-WHEREVER-YOU-PAUSE-WHEN-SPEAKING'),
  probe('eng.grammar.comma-usage', 'true_false',
    '"She sings and dances." This joins two verbs with "and." Does it need a comma before "and"?',
    'No — a comma before "and" is needed only when joining two INDEPENDENT clauses; here "and" just joins two verbs sharing one subject',
    'Yes — any use of "and" joining two things always needs a comma before it',
    'eng.grammar.comma-usage:MC-ANY-TWO-CLAUSES-JOINED-BY-AND-NEED-A-COMMA',
    'MC-ANY-TWO-CLAUSES-JOINED-BY-AND-NEED-A-COMMA'),

  // ─── eng.vocab.word-recognition ──────────────────────────────────────────
  probe('eng.vocab.word-recognition', 'checkpoint',
    'A learner sounds out the printed word "cat" correctly as /k/-/æ/-/t/ but does not connect it to the furry animal they already know by ear. Have they fully RECOGNIZED the word?',
    'No — decoding the sounds is only half the job; word recognition also requires linking the decoded sounds to the meaning already known from spoken vocabulary',
    'Yes — successfully sounding out the letters means the word has been fully recognized',
    'eng.vocab.word-recognition:MC-DECODING-EQUALS-RECOGNIZING-MEANING',
    'MC-DECODING-EQUALS-RECOGNIZING-MEANING'),
  probe('eng.vocab.word-recognition', 'true_false',
    'A learner sees the printed word "umbrella" for the first time and does not recognize it by sight. Does that mean "umbrella" is a word they do not know at all?',
    'No — they may already know and use the SPOKEN word "umbrella" perfectly well; not recognizing its PRINTED form is a different, narrower gap',
    'Yes — if a learner cannot recognize a word in print, that word must be completely unknown to them',
    'eng.vocab.word-recognition:MC-UNFAMILIAR-PRINTED-WORD-MEANS-UNKNOWN-WORD',
    'MC-UNFAMILIAR-PRINTED-WORD-MEANS-UNKNOWN-WORD'),
]
