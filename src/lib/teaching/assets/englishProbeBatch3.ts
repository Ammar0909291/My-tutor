/**
 * ENGLISH PROBE-CONTRACT CAMPAIGN — Batch 3.
 *
 * 25 more concepts (14 eng.grammar, 11 eng.vocab), all re-measured at
 * closed=2 (mcq x1 + misconception_probe x1) directly from the seed corpus
 * in git before authoring (zero DB access, zero egress — see
 * inventory script run this session). Every one of the 182 concepts
 * remaining below depth 4 was found at exactly depth 2, so "prioritize
 * depth 2" and "prioritize concepts needing the most probes" name the same
 * population; this batch takes the next 25 in the two lowest-risk,
 * already-proven domains (grammar and vocabulary, both used successfully
 * in Batches 1 and 2) rather than moving into the unproven HIGH-band
 * composition/communication domains.
 *
 * Each concept goes straight from depth 2 to depth 4 — TWO new probes,
 * matching the owner-set resilience target (Batch 1's live Mohd validation
 * on eng.grammar.modals proved depth 3 is zero-slack; depth 4 tolerates
 * one imperfect answer, live-verified on pronouns/comma-usage).
 *
 * Probe A: probeKind 'checkpoint' (depth 3), reuses the concept's FIRST
 *   registered misconception from a fresh worked example.
 * Probe B: probeKind 'true_false' (depth 4), reuses the concept's SECOND
 *   registered misconception from a fresh worked example.
 * Both verified free (no prior 'checkpoint'/'true_false' probe) for all
 * 25 concepts before authoring — dumped every existing probe's probeKind
 * for this exact concept list before writing a single new stem. Same
 * P-10-safe technique as every prior file in this campaign.
 *
 * No new misconception ids. No Educational Brain authoring. Every
 * gradeBand below is the concept's OWN native band, read off its two
 * existing probes (not defaulted to MIDDLE) — capitalization-rules is
 * EARLY; colons-semicolons-dashes, parallel-structure, sentence-combining,
 * academic-vocabulary, collocations, connotation-denotation, etymology,
 * multiple-meaning-words, and register-and-formality are HIGH; every
 * other concept below is MIDDLE.
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

const M = GradeBand.MIDDLE
const E = GradeBand.EARLY
const H = GradeBand.HIGH

export const ENGLISH_PROBE_BATCH_3: SeedProbe[] = [
  // ─── eng.grammar.adverbs (MIDDLE) ──────────────────────────────────────
  probe('eng.grammar.adverbs', 'checkpoint', M,
    'In "She works hard every day," is "hard" an adverb even though it does not end in "-ly"?',
    'Yes — "hard" modifies the verb "works," which makes it an adverb; many common adverbs (fast, hard, well) never take "-ly"',
    'No — a word must end in "-ly" to be an adverb',
    'eng.grammar.adverbs:MC-ALL-ADVERBS-END-IN-LY',
    'MC-ALL-ADVERBS-END-IN-LY, re-asked with "hard" rather than the existing "fast" example'),
  probe('eng.grammar.adverbs', 'true_false', M,
    'In "The soup smells absolutely delicious," what does "absolutely" modify?',
    'The adjective "delicious" — adverbs can intensify adjectives, not just modify verbs',
    'Nothing — adverbs can only modify verbs, so "absolutely" cannot be doing real work here',
    'eng.grammar.adverbs:MC-ADVERBS-ONLY-MODIFY-VERBS',
    'MC-ADVERBS-ONLY-MODIFY-VERBS, re-asked with "absolutely delicious" rather than the existing "very tall" example'),

  // ─── eng.grammar.apostrophes (MIDDLE) ──────────────────────────────────
  probe('eng.grammar.apostrophes', 'checkpoint', M,
    'Does "I bought two apple\'s at the store" need an apostrophe?',
    'No — this is a simple plural (more than one apple), with no possession or contraction; it should be "two apples"',
    'Yes — any word ending in "s" needs an apostrophe before it',
    'eng.grammar.apostrophes:MC-A-ADD-AN-APOSTROPHE-BEFORE-ANY-S-AT-THE-END-OF-A-WORD-INCLUDING-SIMPLE-PLURALS',
    'MC-A-...-SIMPLE-PLURALS, re-asked with "apples" rather than the existing "dogs" example'),
  probe('eng.grammar.apostrophes', 'true_false', M,
    'Does "the children\'s toys" (irregular plural "children") and "the teachers\' lounge" (regular plural "teachers") place the apostrophe the same way?',
    'No — "children" does not end in s, so it takes apostrophe-then-s ("children\'s"); "teachers" already ends in s, so it takes just an apostrophe after the s ("teachers\'")',
    'Yes — possessive apostrophes always go in the same place regardless of how the plural is formed',
    'eng.grammar.apostrophes:MC-B-POSSESSIVE-APOSTROPHES-ALWAYS-GO-IN-THE-SAME-PLACE-REGARDLESS-OF-WHETHER-THE-NOUN-IS-SINGULAR-OR-PLURAL',
    'MC-B-..., re-asked with an irregular plural ("children") against a regular one ("teachers") rather than the existing "dog\'s"/"dogs\'" pair'),

  // ─── eng.grammar.capitalization-rules (EARLY) ──────────────────────────
  probe('eng.grammar.capitalization-rules', 'checkpoint', E,
    'Which sentence uses capitalization correctly — "We watched the Sun set" or "We watched the sun set"?',
    '"We watched the sun set" — "sun" is a general noun, not a proper name, so it stays lowercase even though it sounds important',
    '"We watched the Sun set" — capitalize words that name something big or important',
    'eng.grammar.capitalization-rules:MC-CAPITALIZE-ANY-IMPORTANT-SOUNDING-WORD',
    'MC-CAPITALIZE-ANY-IMPORTANT-SOUNDING-WORD, re-asked with "sun" rather than the existing "Beach" example'),
  probe('eng.grammar.capitalization-rules', 'true_false', E,
    'In "I like pizza. My friend likes pasta," does "My" need a capital letter even though it is not the very first word of the whole text?',
    'Yes — every new sentence needs its own capital first letter, not just the first sentence of the passage',
    'No — only the very first word of the whole text needs a capital',
    'eng.grammar.capitalization-rules:MC-CAPITALIZE-ONLY-THE-VERY-FIRST-WORD-OF-A-TEXT',
    'MC-CAPITALIZE-ONLY-THE-VERY-FIRST-WORD-OF-A-TEXT, re-asked with "I like pizza. My friend..." rather than the existing "dog barked. It ran..." example'),

  // ─── eng.grammar.colons-semicolons-dashes (HIGH) ───────────────────────
  probe('eng.grammar.colons-semicolons-dashes', 'checkpoint', H,
    'Is "The recipe requires: flour, sugar, and eggs" correctly punctuated?',
    'No — "the recipe requires" is not a complete independent clause on its own, so the colon is misplaced',
    'Yes — a colon can be used after any phrase that seems to introduce a list',
    'eng.grammar.colons-semicolons-dashes:MC-A-A-COLON-CAN-BE-USED-AFTER-ANY-INTRODUCTORY-PHRASE-EVEN-IF-WHAT-COMES-BEFORE-ISNT-A-COMPLETE-SENTENCE',
    'MC-A-..., re-asked with "the recipe requires" rather than the existing "my favorite foods are" example'),
  probe('eng.grammar.colons-semicolons-dashes', 'true_false', H,
    'Is "I wanted to go, however, it was raining" correctly punctuated?',
    'No — "however" joining two independent clauses needs a semicolon before it ("I wanted to go; however, it was raining"), not just a comma',
    'Yes — semicolons and commas do the same job and can be used interchangeably',
    'eng.grammar.colons-semicolons-dashes:MC-B-SEMICOLONS-AND-COMMAS-DO-THE-SAME-JOB-AND-CAN-BE-USED-INTERCHANGEABLY',
    'MC-B-..., re-asked with a conjunctive-adverb example ("however") rather than the existing "after the movie" example'),

  // ─── eng.grammar.complex-sentences (MIDDLE) ────────────────────────────
  probe('eng.grammar.complex-sentences', 'checkpoint', M,
    'Is "Although she was tired, she finished the race" a compound sentence, since it has a joining word?',
    'No — it is complex; "although she was tired" cannot stand alone as a complete sentence, so it is a dependent clause, not a second independent clause',
    'Yes — any sentence with a joining word between two clauses is compound',
    'eng.grammar.complex-sentences:MC-A-SENTENCE-WITH-A-SUBORDINATING-WORD-IS-COMPOUND',
    'MC-A-..., re-asked with "although" rather than the existing "because" example'),
  probe('eng.grammar.complex-sentences', 'true_false', M,
    'Are "She finished the race although she was tired" and "Although she was tired, she finished the race" both valid complex sentences with the same meaning?',
    'Yes — a dependent clause can come before or after the independent clause; only the comma placement changes, not whether it is complex',
    'No — the dependent clause must always come first in a complex sentence',
    'eng.grammar.complex-sentences:MC-THE-DEPENDENT-CLAUSE-MUST-ALWAYS-COME-FIRST',
    'MC-THE-DEPENDENT-CLAUSE-MUST-ALWAYS-COME-FIRST, re-asked with "although" rather than the existing "because it was raining" example'),

  // ─── eng.grammar.compound-sentences (MIDDLE) ───────────────────────────
  probe('eng.grammar.compound-sentences', 'checkpoint', M,
    'Is "He opened the window and closed the door" a compound sentence, since it contains "and"?',
    'No — it is simple, with one subject "he" and a compound verb "opened...and closed," but only one subject-verb pairing overall',
    'Yes — any sentence containing "and" is compound',
    'eng.grammar.compound-sentences:MC-ANY-CONJUNCTION-CREATES-A-COMPOUND-SENTENCE',
    'MC-ANY-CONJUNCTION-CREATES-A-COMPOUND-SENTENCE, re-asked with a compound-verb example rather than the existing compound-subject one'),
  probe('eng.grammar.compound-sentences', 'true_false', M,
    'Is "She finished her homework, she went to bed" correctly punctuated?',
    'No — this is a comma splice; a bare comma cannot join two independent clauses, it needs a coordinating conjunction added, or should use a semicolon instead',
    'Yes — a comma alone is always enough to join two independent clauses',
    'eng.grammar.compound-sentences:MC-A-SEMICOLON-AND-A-COMMA-ARE-INTERCHANGEABLE-JOINERS',
    'MC-A-..., re-asked with "she finished her homework, she went to bed" rather than the existing "rain stopped" example'),

  // ─── eng.grammar.parallel-structure (HIGH) ─────────────────────────────
  probe('eng.grammar.parallel-structure', 'checkpoint', H,
    'Does "The coach wanted the team to be disciplined, hardworking, and showing respect" violate parallel structure?',
    'Yes — "showing respect" (a participle phrase) mismatches the two adjectives ("disciplined," "hardworking")',
    'No — parallel structure only applies to simple lists of single words, not phrases',
    'eng.grammar.parallel-structure:MC-A-PARALLEL-STRUCTURE-ONLY-APPLIES-TO-SIMPLE-LISTS-OF-SINGLE-WORDS',
    'MC-A-..., re-asked with an adjective-list example rather than the existing "swimming, to run, and biking" example'),
  probe('eng.grammar.parallel-structure', 'true_false', H,
    'Does changing "...cooking, cleaning, and to organize the house" to "...cooking, cleaning, and organized the house" actually fix the parallel structure violation?',
    'No — "organized" is past tense while "cooking" and "cleaning" are gerunds; the exact grammatical form still does not match',
    'Yes — the items now sound more similar, so the structure is fixed',
    'eng.grammar.parallel-structure:MC-B-FIXING-A-PARALLEL-STRUCTURE-ERROR-JUST-MEANS-MAKING-THE-ITEMS-SOUND-SIMILAR',
    'MC-B-..., re-asked with a gerund-vs-past-tense mismatch rather than the existing infinitive/gerund mismatch'),

  // ─── eng.grammar.quotation-marks (MIDDLE) ──────────────────────────────
  probe('eng.grammar.quotation-marks', 'checkpoint', M,
    'Should "He told me he would be late" have quotation marks around "he would be late"?',
    'No — this is indirect/reported speech, a paraphrase, which should never be placed in quotation marks',
    'Yes — reported speech should also be placed in quotation marks',
    'eng.grammar.quotation-marks:MC-A-QUOTATION-MARKS-SHOULD-BE-USED-AROUND-INDIRECT-REPORTED-SPEECH-TOO',
    'MC-A-..., re-asked with "He told me he would be late" rather than the existing "she said that she was tired" example'),
  probe('eng.grammar.quotation-marks', 'true_false', M,
    'In standard American English convention, where does the question mark go in “Where are you going” he asked — inside or outside the closing quotation mark?',
    'Inside — since the quoted material itself is the question: "Where are you going?" he asked',
    'Outside — question marks always go after the closing quotation mark, the same way commas do',
    'eng.grammar.quotation-marks:MC-B-COMMAS-AND-END-PUNCTUATION-GO-OUTSIDE-THE-CLOSING-QUOTATION-MARK-IN-AMERICAN-ENGLISH-DIALOGUE',
    'MC-B-..., re-asked with a quoted question mark rather than the existing quoted-statement comma example'),

  // ─── eng.grammar.run-on-sentences-and-comma-splices (MIDDLE) ──────────
  probe('eng.grammar.run-on-sentences-and-comma-splices', 'checkpoint', M,
    'Is "She loves reading, she visits the library every week" correctly punctuated?',
    'No — this is a comma splice; a comma alone cannot join two independent clauses, it needs a conjunction added or a different fix',
    'Yes — a comma is just as correct as a comma-plus-conjunction for joining two independent clauses',
    'eng.grammar.run-on-sentences-and-comma-splices:MC-A-A-COMMA-SPLICE-IS-JUST-AS-CORRECT-AS-A-COMPOUND-SENTENCE-SINCE-BOTH-USE-A-COMMA',
    'MC-A-..., re-asked with "she loves reading, she visits the library" rather than the existing "rain stopped" example'),
  probe('eng.grammar.run-on-sentences-and-comma-splices', 'true_false', M,
    'For the run-on "He was hungry he ate a sandwich," is adding a semicolon the ONLY valid fix?',
    'No — adding a comma plus conjunction ("He was hungry, so he ate a sandwich") or splitting into two sentences are also valid fixes',
    'Yes — a semicolon is the only correct way to fix a run-on sentence',
    'eng.grammar.run-on-sentences-and-comma-splices:MC-B-THE-ONLY-WAY-TO-FIX-A-RUN-ON-OR-COMMA-SPLICE-IS-TO-SPLIT-IT-INTO-TWO-SEPARATE-SENTENCES',
    'MC-B-..., re-asked framing the semicolon as the supposed single fix rather than the existing sentence-split framing'),

  // ─── eng.grammar.sentence-combining (HIGH) ─────────────────────────────
  probe('eng.grammar.sentence-combining', 'checkpoint', H,
    'Does "She studied hard and she passed the exam" show WHY she passed, the same way "Because she studied hard, she passed the exam" does?',
    'No — "and" just lists two events; "because" makes the actual cause-effect relationship explicit',
    'Yes — "and" works fine for combining any two sentences regardless of their relationship',
    'eng.grammar.sentence-combining:MC-A-COMBINING-SENTENCES-JUST-MEANS-ADDING-AND-BETWEEN-THEM',
    'MC-A-..., re-asked with "studied hard...passed the exam" rather than the existing "raining...went inside" example'),
  probe('eng.grammar.sentence-combining', 'true_false', H,
    '"He knocked. Silence. No one answered." uses short sentences to build suspense. Would combining them into one longer sentence always improve this passage?',
    'No — the short sentences are deliberately building tension; combining them would weaken that effect',
    'Yes — a longer, combined sentence is always better than several short ones',
    'eng.grammar.sentence-combining:MC-B-A-LONGER-COMBINED-SENTENCE-IS-ALWAYS-BETTER-THAN-SEVERAL-SHORT-ONES',
    'MC-B-..., re-asked with a suspense-building example rather than the existing "opened the door" example'),

  // ─── eng.grammar.sentence-fragments (MIDDLE) ───────────────────────────
  probe('eng.grammar.sentence-fragments', 'checkpoint', M,
    'Is "Which she really wanted." a complete sentence, since it has a subject ("she") and a verb ("wanted")?',
    'No — it is a fragment; "which" leaves the reader expecting to know what it refers back to',
    'Yes — any group of words with a subject and a verb somewhere in it is a complete sentence',
    'eng.grammar.sentence-fragments:MC-A-A-GROUP-OF-WORDS-IS-A-COMPLETE-SENTENCE-AS-LONG-AS-IT-HAS-A-SUBJECT-AND-A-VERB-SOMEWHERE-IN-IT',
    'MC-A-..., re-asked with a relative-clause fragment ("Which she really wanted") rather than the existing "Because the rain started" example'),
  probe('eng.grammar.sentence-fragments', 'true_false', M,
    'To fix "He left early. Since he felt sick." should you pad the fragment into its own sentence, or join it to the sentence before it?',
    'Join it to the sentence before it: "He left early since he felt sick" — this reads far more naturally',
    'Always pad the fragment out into its own standalone complete sentence',
    'eng.grammar.sentence-fragments:MC-B-FIXING-A-FRAGMENT-ALWAYS-MEANS-ADDING-MORE-WORDS-TO-THE-SAME-STANDALONE-GROUP',
    'MC-B-..., re-asked with "He left early. Since he felt sick." rather than the existing "team celebrated" example'),

  // ─── eng.grammar.subject-and-predicate (MIDDLE) ────────────────────────
  probe('eng.grammar.subject-and-predicate', 'checkpoint', M,
    'In "Under the old oak tree, the children played," is "Under the old oak tree" the subject, since it comes first?',
    'No — "the children" is the subject, since that\'s who is doing the playing; "Under the old oak tree" just tells us where',
    'Yes — the subject is always whatever word or phrase comes first in the sentence',
    'eng.grammar.subject-and-predicate:MC-SUBJECT-IS-ALWAYS-THE-FIRST-WORD',
    'MC-SUBJECT-IS-ALWAYS-THE-FIRST-WORD, re-asked with a fronted prepositional phrase rather than the existing "In the morning" example'),
  probe('eng.grammar.subject-and-predicate', 'true_false', M,
    'In "The teacher explained the lesson patiently," is the predicate just "explained"?',
    'No — the full predicate is "explained the lesson patiently," everything in the sentence except the subject "the teacher"',
    'Yes — the predicate is just the single verb word',
    'eng.grammar.subject-and-predicate:MC-PREDICATE-IS-JUST-THE-VERB',
    'MC-PREDICATE-IS-JUST-THE-VERB, re-asked with "explained the lesson patiently" rather than the existing "chased the ball" example'),

  // ─── eng.grammar.verbs (MIDDLE) ────────────────────────────────────────
  probe('eng.grammar.verbs', 'checkpoint', M,
    'In "I know the answer," is anything physically happening? Is "know" still a verb?',
    'Nothing is physically happening, but "know" is still a verb — it expresses a mental state, not just physical action',
    '"Know" cannot be a verb since nothing is physically being done',
    'eng.grammar.verbs:MC-VERBS-ARE-ONLY-PHYSICAL-ACTIONS',
    'MC-VERBS-ARE-ONLY-PHYSICAL-ACTIONS, re-asked with "know" (a mental-state verb) rather than the existing "is" (a linking verb) example'),
  probe('eng.grammar.verbs', 'true_false', M,
    'In "They have finished the project," is "finished" the only verb, or is "have" also part of the verb?',
    '"Have finished" together is the complete verb phrase — "have" is a genuine helping verb, not just an optional extra word',
    'Only "finished" is the verb — helping verbs like "have" don\'t really count as verbs',
    'eng.grammar.verbs:MC-HELPING-VERBS-ARE-NOT-REAL-VERBS',
    'MC-HELPING-VERBS-ARE-NOT-REAL-VERBS, re-asked with "have finished" rather than the existing "is running" example'),

  // ─── eng.grammar.word-classes-overview (MIDDLE) ────────────────────────
  probe('eng.grammar.word-classes-overview', 'checkpoint', M,
    'In "Turn on the light," is "light" functioning as a noun, the same as in "The bag is light"?',
    'No — here "light" functions as a noun (a thing, taking "the" before it), even though it\'s an adjective in "The bag is light"',
    'Yes — "light" is always the same word class no matter how it\'s used',
    'eng.grammar.word-classes-overview:MC-WORD-CLASS-IS-FIXED-PER-WORD',
    'MC-WORD-CLASS-IS-FIXED-PER-WORD, re-asked with "light" rather than the existing "run" example'),
  probe('eng.grammar.word-classes-overview', 'true_false', M,
    'In "The decision surprised everyone," is "decision" a verb, since it describes an action-like event?',
    'No — "decision" functions as a noun here; it takes "the" and acts as the sentence\'s subject, regardless of feeling action-like',
    'Yes — if a word\'s meaning is about an action, it must be a verb',
    'eng.grammar.word-classes-overview:MC-WORD-CLASS-DETERMINED-BY-MEANING-ALONE',
    'MC-WORD-CLASS-DETERMINED-BY-MEANING-ALONE, re-asked with "decision" rather than the existing "arrival" example'),

  // ─── eng.vocab.academic-vocabulary (HIGH) ──────────────────────────────
  probe('eng.vocab.academic-vocabulary', 'checkpoint', H,
    'Is "photosynthesis" (biology-only jargon) the same kind of word as "analyze" (which appears across science, history, and literature essays)?',
    'No — "photosynthesis" is technical jargon belonging to one field; "analyze" is general academic vocabulary recurring across every discipline',
    'Yes — any unfamiliar or complex-sounding word in an academic text counts as academic vocabulary',
    'eng.vocab.academic-vocabulary:MC-A-ANY-UNFAMILIAR-OR-COMPLEX-SOUNDING-WORD-IN-AN-ACADEMIC-TEXT-COUNTS-AS-ACADEMIC-VOCABULARY',
    'MC-A-..., re-asked with "photosynthesis"/"analyze" rather than the existing "mitochondria"/"significant" pair'),
  probe('eng.vocab.academic-vocabulary', 'true_false', H,
    'Does "concrete" mean the same thing in "a concrete sidewalk" (casual) and "concrete evidence" (academic)?',
    'No — academic words often carry a more precise, figurative sense than their everyday sense; here "concrete" shifts from "a hard building material" to "specific and tangible"',
    'Yes — academic words mean the same thing in academic writing as they do in everyday casual speech',
    'eng.vocab.academic-vocabulary:MC-B-ACADEMIC-WORDS-MEAN-THE-SAME-THING-IN-ACADEMIC-WRITING-AS-THEY-DO-IN-EVERYDAY-CASUAL-SPEECH',
    'MC-B-..., re-asked with "concrete" rather than the existing "argument" example'),

  // ─── eng.vocab.collocations (HIGH) ─────────────────────────────────────
  probe('eng.vocab.collocations', 'checkpoint', H,
    'Since "strong" and "powerful" are near-synonyms, is "powerful coffee" just as natural as "strong coffee"?',
    'No — English speakers only pair "strong" with "coffee"; a synonym fitting the dictionary definition doesn\'t mean it fits the fixed phrase',
    'Yes — if a synonym fits the definition, it fits the phrase',
    'eng.vocab.collocations:MC-IF-A-SYNONYM-FITS-THE-DEFINITION-IT-FITS-THE-PHRASE',
    'MC-IF-A-SYNONYM-FITS-THE-DEFINITION-IT-FITS-THE-PHRASE, re-asked with "strong/powerful coffee" rather than the existing "do/make a decision" example'),
  probe('eng.vocab.collocations', 'true_false', H,
    'Is "fast food" the same kind of phrase as "kick the bucket"?',
    'No — "fast food" is a transparent collocation (means exactly what it says); "kick the bucket" is an idiom (non-literal, can\'t be derived from the words)',
    'Yes — collocations are just a fancier name for idioms',
    'eng.vocab.collocations:MC-COLLOCATIONS-ARE-JUST-A-FANCY-NAME-FOR-IDIOMS',
    'MC-COLLOCATIONS-ARE-JUST-A-FANCY-NAME-FOR-IDIOMS, re-asked with "fast food"/"kick the bucket" rather than the existing "heavy rain" example'),

  // ─── eng.vocab.compound-words (MIDDLE) ─────────────────────────────────
  probe('eng.vocab.compound-words', 'checkpoint', M,
    'Does "ladybug" mean something related to ladies and bugs, the same way "doghouse" means a house for a dog?',
    'No — "ladybug" is opaque; it names an insect, unrelated to ladies, unlike the transparent "doghouse"',
    'Yes — every compound word\'s meaning is always the literal sum of its two parts',
    'eng.vocab.compound-words:MC-COMPOUND-MEANING-IS-ALWAYS-LITERAL-SUM',
    'MC-COMPOUND-MEANING-IS-ALWAYS-LITERAL-SUM, re-asked with "ladybug" rather than the existing "butterfly" example'),
  probe('eng.vocab.compound-words', 'true_false', M,
    'Is "mother-in-law" a real compound word, even though it\'s written with hyphens instead of as one unbroken word?',
    'Yes — it names one unified relationship, making it a hyphenated compound; compounds can be closed, hyphenated, or open',
    'No — compound words are always written as one unbroken word',
    'eng.vocab.compound-words:MC-COMPOUND-WORDS-ARE-ALWAYS-WRITTEN-AS-ONE-WORD',
    'MC-COMPOUND-WORDS-ARE-ALWAYS-WRITTEN-AS-ONE-WORD, re-asked with "mother-in-law" rather than the existing "ice cream" example'),

  // ─── eng.vocab.connotation-denotation (HIGH) ───────────────────────────
  probe('eng.vocab.connotation-denotation', 'checkpoint', H,
    'If you wanted to CRITICIZE someone for refusing to change their mind, would calling them "determined" work just as well as "stubborn," since both describe the same behavior?',
    'No — "stubborn" carries a critical connotation while "determined" carries an admiring one, even though both can describe the same literal behavior',
    'Yes — if two words share the same denotation, they are fully interchangeable in any context',
    'eng.vocab.connotation-denotation:MC-SAME-DENOTATION-MEANS-INTERCHANGEABLE',
    'MC-SAME-DENOTATION-MEANS-INTERCHANGEABLE, re-asked with "stubborn"/"determined" rather than the existing "cheap"/"frugal" example'),
  probe('eng.vocab.connotation-denotation', 'true_false', H,
    'If ten different English speakers were asked whether "childish" sounds more negative than "childlike," would their answers be totally random and different for each person?',
    'No — most speakers would agree "childish" sounds more critical; connotation is a shared, culturally-recognized pattern, not random personal opinion',
    'Yes — connotation is just each individual person\'s private, unpredictable feeling about a word',
    'eng.vocab.connotation-denotation:MC-CONNOTATION-IS-JUST-PERSONAL-OPINION',
    'MC-CONNOTATION-IS-JUST-PERSONAL-OPINION, re-asked with "childish"/"childlike" rather than the existing "nosy"/"curious" example'),

  // ─── eng.vocab.context-clues (MIDDLE) ──────────────────────────────────
  probe('eng.vocab.context-clues', 'checkpoint', M,
    'In "The reticent boy said nothing during the entire meeting," is it reliable to guess "reticent" means "shy" based only on the word "meeting"?',
    'No — the fuller clue "said nothing during the entire meeting" is what actually signals quietness; the whole sentence should be weighed, not just one nearby word',
    'Yes — the closest nearby word is usually enough to determine a word\'s meaning',
    'eng.vocab.context-clues:MC-GUESS-FROM-ONE-WORD-NEARBY',
    'MC-GUESS-FROM-ONE-WORD-NEARBY, re-asked with "reticent" rather than the existing "gregarious" example'),
  probe('eng.vocab.context-clues', 'true_false', M,
    'You guessed "candid" means "shy" from one sentence. The next sentence says "she was so candid that she told everyone exactly what she thought." Should you keep your original guess?',
    'No — this new context contradicts "shy"; the guess should be revised toward "honest/outspoken" — a context-clue guess is a working hypothesis, not a locked-in answer',
    'Yes — once you make a context-clue guess, it is certain and should not be revised',
    'eng.vocab.context-clues:MC-CONTEXT-CLUES-ALWAYS-GIVE-CERTAINTY',
    'MC-CONTEXT-CLUES-ALWAYS-GIVE-CERTAINTY, re-asked with "candid" rather than the existing "morose" example'),

  // ─── eng.vocab.etymology (HIGH) ────────────────────────────────────────
  probe('eng.vocab.etymology', 'checkpoint', H,
    '"Awful" originally meant "inspiring awe/wonder" centuries ago. Should you insist that meaning is the "true" or "correct" meaning today?',
    'No — current usage, however drifted, is what a word actually means today; etymology is history, not a rulebook for present usage',
    'Yes — a word\'s original meaning is its true or correct meaning today',
    'eng.vocab.etymology:MC-A-WORDS-ORIGINAL-MEANING-IS-ITS-TRUE-OR-CORRECT-MEANING-TODAY',
    'MC-A-..., re-asked with "awful" rather than the existing "nice" example'),
  probe('eng.vocab.etymology', 'true_false', H,
    '"Alcohol" traveled Arabic → Medieval Latin → English. Does every English word trace back to one single, simple ancestor language with no borrowing?',
    'No — English vocabulary is substantially built from borrowing across many languages, sometimes through multi-step paths through more than one language',
    'Yes — every word came from a single clear language with no borrowing',
    'eng.vocab.etymology:MC-EVERY-WORD-CAME-FROM-A-SINGLE-CLEAR-LANGUAGE-WITH-NO-BORROWING',
    'MC-EVERY-WORD-CAME-FROM-A-SINGLE-CLEAR-LANGUAGE-WITH-NO-BORROWING, re-asked with "alcohol" rather than the existing "restaurant" example'),

  // ─── eng.vocab.homonyms-homophones (MIDDLE) ────────────────────────────
  probe('eng.vocab.homonyms-homophones', 'checkpoint', M,
    'Are "to," "too," and "two" homonyms, since they all sound the same?',
    'No — they are homophones; they sound identical but are spelled differently, unlike homonyms which are spelled the same',
    'Yes — homonym and homophone mean the same thing',
    'eng.vocab.homonyms-homophones:MC-HOMONYM-AND-HOMOPHONE-ARE-THE-SAME-THING',
    'MC-HOMONYM-AND-HOMOPHONE-ARE-THE-SAME-THING, re-asked with "to/too/two" rather than the existing "their/there/they\'re" example'),
  probe('eng.vocab.homonyms-homophones', 'true_false', M,
    'In "He cast a long shadow on the wall," does "cast" mean a group of actors, the same as it usually does?',
    'No — the surrounding context ("shadow," "wall") signals the "throw/project" meaning here, not the group-of-actors meaning',
    'Yes — "cast" always means a group of actors regardless of context',
    'eng.vocab.homonyms-homophones:MC-CONTEXT-DOESNT-MATTER-FOR-THESE-WORDS',
    'MC-CONTEXT-DOESNT-MATTER-FOR-THESE-WORDS, re-asked with "cast" rather than the existing "bank" example'),

  // ─── eng.vocab.idioms (MIDDLE) ─────────────────────────────────────────
  probe('eng.vocab.idioms', 'checkpoint', M,
    'Can you figure out what "break the ice" means by translating "break," "the," and "ice" separately?',
    'No — the idiom\'s meaning ("ease social tension") must be learned as one fixed whole-unit expression, not decoded word by word',
    'Yes — you can figure out an idiom\'s meaning by translating each word literally',
    'eng.vocab.idioms:MC-A-YOU-CAN-FIGURE-OUT-AN-IDIOMS-MEANING-BY-TRANSLATING-EACH-WORD-LITERALLY',
    'MC-A-..., re-asked with "break the ice" rather than the existing "raining cats and dogs" example'),
  probe('eng.vocab.idioms', 'true_false', M,
    '"Container" is a genuine synonym of "boat." Can you say "miss the container" instead of "miss the boat" and keep the same idiomatic meaning?',
    'No — idioms are fixed expressions; swapping even a real synonym breaks the idiom entirely, since it must be used word-for-word as fixed',
    'Yes — you can freely change words within an idiom as long as the meaning stays similar',
    'eng.vocab.idioms:MC-B-YOU-CAN-FREELY-CHANGE-WORDS-WITHIN-AN-IDIOM-AS-LONG-AS-THE-MEANING-STAYS-SIMILAR',
    'MC-B-..., re-asked with "miss the boat"/"container" rather than the existing "kick the bucket"/"pail" example'),

  // ─── eng.vocab.multiple-meaning-words (HIGH) ───────────────────────────
  probe('eng.vocab.multiple-meaning-words', 'checkpoint', H,
    'Is "sharp" (a sharp knife) and "sharp" (a sharp mind) the same kind of multiple-meaning relationship as "fair" (just) and "fair" (a carnival)?',
    'No — "sharp" is polysemy (the two meanings are conceptually related through "keenness/precision"), while "fair" is homonymy (unrelated, coincidental meanings)',
    'Yes — multiple-meaning words are just another name for homonyms',
    'eng.vocab.multiple-meaning-words:MC-MULTIPLE-MEANING-WORDS-ARE-JUST-HOMONYMS',
    'MC-MULTIPLE-MEANING-WORDS-ARE-JUST-HOMONYMS, re-asked with "sharp"/"fair" rather than the existing "bright"/"bat" example'),
  probe('eng.vocab.multiple-meaning-words', 'true_false', H,
    'Should you pick whichever meaning of "spring" a dictionary lists first, or use the sentence context to decide?',
    'Use context — dictionary listing order does not indicate which sense applies in a specific sentence',
    'Always pick the first-listed meaning, since dictionaries list meanings in order of importance',
    'eng.vocab.multiple-meaning-words:MC-DICTIONARY-LISTS-MEANINGS-IN-IMPORTANCE-ORDER',
    'MC-DICTIONARY-LISTS-MEANINGS-IN-IMPORTANCE-ORDER, re-asked with "spring" rather than the existing "bank" example'),

  // ─── eng.vocab.phrasal-verbs (MIDDLE) ──────────────────────────────────
  probe('eng.vocab.phrasal-verbs', 'checkpoint', M,
    '"The meeting was put off until next week." Does "put off" here involve physically placing anything?',
    'No — "put off" is a fixed whole-unit phrasal verb meaning "to postpone," with no derivable connection to physically placing something',
    'Yes — a phrasal verb\'s meaning can usually be figured out from the verb and particle\'s literal meanings',
    'eng.vocab.phrasal-verbs:MC-A-A-PHRASAL-VERBS-MEANING-CAN-USUALLY-BE-FIGURED-OUT-FROM-THE-VERB-AND-PARTICLES-LITERAL-MEANINGS',
    'MC-A-..., re-asked with "put off" rather than the existing "gave up" example'),
  probe('eng.vocab.phrasal-verbs', 'true_false', M,
    '"She ran into an old friend" is correct. Can you also say "She ran an old friend into," the same way "give the fight up" works for "give up"?',
    'No — "run into" is inseparable and never allows the object to split it, unlike "give up," which is separable; each phrasal verb must be checked individually',
    'Yes — you can always place the object either between the verb and particle or after both, regardless of which phrasal verb it is',
    'eng.vocab.phrasal-verbs:MC-B-YOU-CAN-ALWAYS-PLACE-THE-OBJECT-EITHER-BETWEEN-THE-VERB-AND-PARTICLE-OR-AFTER-BOTH-REGARDLESS-OF-WHICH-PHRASAL-VERB-IT-IS',
    'MC-B-..., re-asked with "run into" rather than the existing "look after" example'),

  // ─── eng.vocab.register-and-formality (HIGH) ───────────────────────────
  probe('eng.vocab.register-and-formality', 'checkpoint', H,
    'Is texting a close friend "I would be most grateful for your prompt reply" more correct than "let me know soon pls"?',
    'No — it sounds oddly stiff or sarcastic in that context; formal isn\'t automatically more correct, it has to fit the audience',
    'Yes — more formal language is always better, more correct English',
    'eng.vocab.register-and-formality:MC-FORMAL-ALWAYS-MEANS-BETTER-OR-MORE-CORRECT',
    'MC-FORMAL-ALWAYS-MEANS-BETTER-OR-MORE-CORRECT, re-asked with a different formal/informal pair than the existing "delighted to accompany you" example'),
  probe('eng.vocab.register-and-formality', 'true_false', H,
    'Is "gonna grab lunch, wanna come?" a grammar error that needs fixing?',
    'No — it correctly fits its informal, spoken-style context; contractions and casual choices are legitimate register conventions, not mistakes',
    'Yes — informal register always means bad grammar or sloppy writing',
    'eng.vocab.register-and-formality:MC-INFORMAL-REGISTER-MEANS-BAD-GRAMMAR-OR-SLOPPY-WRITING',
    'MC-INFORMAL-REGISTER-MEANS-BAD-GRAMMAR-OR-SLOPPY-WRITING, re-asked with "gonna grab lunch, wanna come?" rather than the existing "omw" example'),
]
