/**
 * ENGLISH PROBE-CONTRACT CAMPAIGN — Batch 7.
 *
 * SCOPE: closes out the remaining eng.vocab domain (7 concepts) + the
 * entire eng.composition domain (14 concepts) — 21 concepts total,
 * fewer than the usual ~25 target because both domains' remaining
 * populations are exhausted by this batch (per the campaign's own
 * "process ALL remaining eligible concepts" rule when fewer than 25
 * remain). All 21 re-measured at closed=2 (mcq x1 + misconception_probe
 * x1) directly from the seed corpus in git before authoring (zero DB
 * access, zero egress). Every one confirmed to already carry two
 * genuine, distinct, ACTIVE misconception ids on its existing probes —
 * the stop-condition check passed for all 21; none were skipped, none
 * required new Educational Brain authoring.
 *
 * Each concept goes straight from depth 2 to depth 4 — TWO new probes,
 * the same resilience target established across Batches 1-6.
 *
 * Probe A: probeKind 'checkpoint' (depth 3), reuses the concept's FIRST
 *   registered misconception from a fresh worked example.
 * Probe B: probeKind 'true_false' (depth 4), reuses the concept's SECOND
 *   registered misconception from a fresh worked example.
 * Both verified free (no prior 'checkpoint'/'true_false' probe) for all
 * 21 concepts before authoring, same P-10-safe technique as every prior
 * file in this campaign.
 *
 * No new misconception ids. No Educational Brain authoring. Every
 * gradeBand below is the concept's OWN native band, read off its
 * existing probes: MIDDLE for suffixes, synonyms-antonyms, thesaurus-
 * and-dictionary-skills, word-families, word-formation-processes; HIGH
 * for roots-and-origins, semantic-fields (vocab) and every eng.composition
 * concept in this batch.
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
const H = GradeBand.HIGH

export const ENGLISH_PROBE_BATCH_7: SeedProbe[] = [
  // ─── eng.vocab.roots-and-origins (HIGH) ─────────────────────────────────
  probe('eng.vocab.roots-and-origins', 'checkpoint', H,
    'The root "scrib/script" means "write." Does "prescription" today still mean literally just "written before"?',
    'No — its meaning has narrowed to a specific medical/legal document; the root is a starting clue, not a fixed rule for the word\'s current meaning',
    'Yes — a root always keeps the exact same meaning in every word it appears in',
    'eng.vocab.roots-and-origins:MC-A-ROOT-ALWAYS-KEEPS-THE-EXACT-SAME-MEANING-IN-EVERY-WORD',
    'MC-A-..., re-asked with "prescription"/"scrib" rather than the existing "manufacture"/"manu" example'),
  probe('eng.vocab.roots-and-origins', 'true_false', H,
    'Does "carpet" share a real root connection with "car," since it starts with those letters?',
    'No — this is a coincidental letter overlap; "carpet" has no etymological relationship to "car" at all',
    'Yes — if a word looks like it has a root, it must be that root',
    'eng.vocab.roots-and-origins:MC-IF-A-WORD-LOOKS-LIKE-IT-HAS-A-ROOT-IT-MUST-BE-THAT-ROOT',
    'MC-IF-A-WORD-LOOKS-LIKE-IT-HAS-A-ROOT-IT-MUST-BE-THAT-ROOT, re-asked with "carpet"/"car" rather than the existing "caterpillar"/"cat" example'),

  // ─── eng.vocab.semantic-fields (HIGH) ───────────────────────────────────
  probe('eng.vocab.semantic-fields', 'checkpoint', H,
    '"Sprint," "jog," "amble," and "stumble" all belong to the movement semantic field. Must they mean nearly the same thing to belong to that field?',
    'No — a semantic field shares a conceptual domain, not a meaning; these words describe very different kinds of movement despite sharing the domain',
    'Yes — a semantic field is just a list of synonyms for one word',
    'eng.vocab.semantic-fields:MC-A-A-SEMANTIC-FIELD-IS-JUST-A-LIST-OF-SYNONYMS-FOR-ONE-WORD',
    'MC-A-..., re-asked with a movement-verb set rather than the existing emotion-word set'),
  probe('eng.vocab.semantic-fields', 'true_false', H,
    '"Candle" often appears in the same sentences as "birthday." Does that mean "candle" belongs to the celebration semantic field?',
    'No — "candle" is an object, not a celebration concept; frequent co-occurrence (collocation) is not the same as genuine shared-domain membership',
    'Yes — any words that often appear together in the same context belong to the same semantic field',
    'eng.vocab.semantic-fields:MC-B-ANY-WORDS-THAT-OFTEN-APPEAR-TOGETHER-IN-THE-SAME-CONTEXT-BELONG-TO-THE-SAME-SEMANTIC-FIELD',
    'MC-B-..., re-asked with a candle/birthday example rather than the existing umbrella/rain example'),

  // ─── eng.vocab.suffixes (MIDDLE) ────────────────────────────────────────
  probe('eng.vocab.suffixes', 'checkpoint', M,
    'When "-ness" is added to "kind" (an adjective) to make "kindness," does the suffix only add meaning, or does it also change the word\'s class?',
    'It changes the word class too — "kindness" is a noun, not an adjective; suffixes often primarily do this grammatical job',
    'Suffixes only add meaning and never change a word\'s class',
    'eng.vocab.suffixes:MC-SUFFIXES-ONLY-CHANGE-MEANING-NOT-WORD-CLASS',
    'MC-SUFFIXES-ONLY-CHANGE-MEANING-NOT-WORD-CLASS, re-asked with "-ness"/"kind" rather than the existing "-tion"/"create" example'),
  probe('eng.vocab.suffixes', 'true_false', M,
    'Is the spelling change from "run" to "running" (doubling the final consonant) just a random exception to memorize?',
    'No — it follows a systematic rule: double a short-vowel-preceded final consonant before a vowel-starting suffix',
    'Yes — suffix spelling changes are random and must be memorized case by case',
    'eng.vocab.suffixes:MC-SUFFIX-SPELLING-CHANGES-ARE-RANDOM',
    'MC-SUFFIX-SPELLING-CHANGES-ARE-RANDOM, re-asked with "run"/"running" (consonant doubling) rather than the existing "hope"/"hoping" (silent-e drop) example'),

  // ─── eng.vocab.synonyms-antonyms (MIDDLE) ───────────────────────────────
  probe('eng.vocab.synonyms-antonyms', 'checkpoint', M,
    'Are "cheap" and "affordable" exactly identical, with zero difference in how they feel to a listener?',
    'No — both describe a low price, but "cheap" often sounds more negative (low-quality) while "affordable" often sounds more neutral or positive',
    'Yes — synonyms are always fully interchangeable with no difference at all',
    'eng.vocab.synonyms-antonyms:MC-SYNONYMS-ARE-EXACTLY-IDENTICAL',
    'MC-SYNONYMS-ARE-EXACTLY-IDENTICAL, re-asked with "cheap"/"affordable" rather than the existing "skinny"/"slender" example'),
  probe('eng.vocab.synonyms-antonyms', 'true_false', M,
    'Does the word "chair" have a meaningful antonym, the same way "fast" has "slow"?',
    'No — "chair" is a concrete noun/category, not a gradable quality, so it has no true antonym',
    'Yes — every word has a simple, clear-cut opposite',
    'eng.vocab.synonyms-antonyms:MC-EVERY-WORD-HAS-A-SIMPLE-OPPOSITE',
    'MC-EVERY-WORD-HAS-A-SIMPLE-OPPOSITE, re-asked with "chair" rather than the existing "book" example'),

  // ─── eng.vocab.thesaurus-and-dictionary-skills (MIDDLE) ─────────────────
  probe('eng.vocab.thesaurus-and-dictionary-skills', 'checkpoint', M,
    'A thesaurus lists "glad" first under "happy." Should you always substitute the first-listed word without checking your sentence?',
    'No — thesaurus entries are grouped by similarity, not ranked by best fit; you must check several options against your specific sentence',
    'Yes — the first word listed in a thesaurus entry is always the best choice',
    'eng.vocab.thesaurus-and-dictionary-skills:MC-A-THE-FIRST-WORD-LISTED-IN-A-THESAURUS-ENTRY-IS-ALWAYS-THE-BEST-CHOICE',
    'MC-A-..., re-asked with "glad"/"happy" rather than the existing "content"/"happy" example'),
  probe('eng.vocab.thesaurus-and-dictionary-skills', 'true_false', M,
    'A thesaurus groups "request," "demand," and "beg" together as synonyms of "ask." Are all three fully interchangeable in every sentence?',
    'No — they carry different connotations (demand: forceful, beg: desperate); check a dictionary\'s usage label before swapping',
    'Yes — all synonyms listed together are fully interchangeable in every situation',
    'eng.vocab.thesaurus-and-dictionary-skills:MC-B-ALL-SYNONYMS-LISTED-TOGETHER-ARE-FULLY-INTERCHANGEABLE-IN-EVERY-SITUATION',
    'MC-B-..., re-asked with "request/demand/beg" rather than the existing "slim/skinny/gaunt" example'),

  // ─── eng.vocab.word-families (MIDDLE) ───────────────────────────────────
  probe('eng.vocab.word-families', 'checkpoint', M,
    'Do "sun," "sunk," and "sung" belong to the same word family, since they all start with "sun"?',
    'No — they share no actual meaning connection; a true word family requires a shared root meaning, not just similar spelling',
    'Yes — sharing the same starting letters is enough to be a word family',
    'eng.vocab.word-families:MC-SIMILAR-SPELLING-MEANS-SAME-FAMILY',
    'MC-SIMILAR-SPELLING-MEANS-SAME-FAMILY, re-asked with "sun/sunk/sung" rather than the existing "car/care/card" example'),
  probe('eng.vocab.word-families', 'true_false', M,
    'If "decide" is a verb, must "decisive" (from the same word family) also be a verb?',
    'No — "decisive" is an adjective; word families typically span different word classes (verb, noun, adjective, adverb) built from the same root',
    'Yes — all members of a word family must share the same word class',
    'eng.vocab.word-families:MC-WORD-FAMILY-MEMBERS-ARE-ALWAYS-SAME-WORD-CLASS',
    'MC-WORD-FAMILY-MEMBERS-ARE-ALWAYS-SAME-WORD-CLASS, re-asked with "decide"/"decisive" rather than the existing "act"/"action" example'),

  // ─── eng.vocab.word-formation-processes (MIDDLE) ────────────────────────
  probe('eng.vocab.word-formation-processes', 'checkpoint', M,
    'Is "smog" (blended from "smoke" and "fog") formed the same way as "app" (shortened from "application")?',
    'No — "smog" is blending (fusing parts of two words) while "app" is clipping (shortening one word); these are two distinct word-formation processes',
    'Yes — all new words are formed the same generic way, by combining or changing parts',
    'eng.vocab.word-formation-processes:MC-ALL-NEW-WORDS-ARE-FORMED-THE-SAME-WAY',
    'MC-ALL-NEW-WORDS-ARE-FORMED-THE-SAME-WAY, re-asked with "smog"/"app" (blending vs. clipping) rather than the existing "toothbrush"/"gym" (compounding vs. clipping) example'),
  probe('eng.vocab.word-formation-processes', 'true_false', M,
    'The noun "text" became the verb "to text" with no spelling change at all. Does true conversion require some hidden suffix or spelling change to have happened?',
    'No — conversion is exactly a zero-change grammatical role shift; hunting for a hidden change is looking for evidence that shouldn\'t exist',
    'Yes — conversion must involve some hidden suffix or spelling change even if it isn\'t obvious',
    'eng.vocab.word-formation-processes:MC-CONVERSION-MUST-INVOLVE-SOME-HIDDEN-SUFFIX-OR-CHANGE',
    'MC-CONVERSION-MUST-INVOLVE-SOME-HIDDEN-SUFFIX-OR-CHANGE, re-asked with "text"/"to text" rather than the existing "email"/"to email" example'),

  // ─── eng.composition.audience-and-purpose (HIGH) ────────────────────────
  probe('eng.composition.audience-and-purpose', 'checkpoint', H,
    'Two essays both have the topic "electric cars" — one argues FOR wider adoption, the other explains HOW the battery technology works. Do they have the same purpose because they share a topic?',
    'No — topic (what it\'s about) and purpose (what you want the reading to DO — persuade vs. inform) are separate; same topic can carry different purposes',
    'Yes — the purpose of an essay is its topic, so same topic means same purpose',
    'eng.composition.audience-and-purpose:MC-A-PURPOSE-IS-THE-TOPIC',
    'MC-A-..., re-asked with an electric-cars example rather than the existing school-uniforms example'),
  probe('eng.composition.audience-and-purpose', 'true_false', H,
    'An explanation of gravity written for a 6-year-old uses "things fall down"; one for a physics graduate student uses tensor equations. Is "audience" just whoever happens to pick up the text, with no active adjustment needed?',
    'No — audience is a set of active choices about what the reader already knows, cares about, and needs; the writer must build this in deliberately',
    'Yes — audience just means whoever reads it; the writing shouldn\'t need to change for different readers',
    'eng.composition.audience-and-purpose:MC-B-AUDIENCE-MEANS-WHOEVER-READS-IT',
    'MC-B-..., re-asked with a gravity example rather than the existing photosynthesis example'),

  // ─── eng.composition.claim-evidence-reasoning (HIGH) ────────────────────
  probe('eng.composition.claim-evidence-reasoning', 'checkpoint', H,
    '"The new bridge should be built. Traffic surveys show a 40-minute average commute delay." Is evidence placed directly next to a claim like this enough to make a complete argument?',
    'No — without an explicit reasoning sentence explaining why this evidence leads to this claim, several different conclusions could be drawn from the same evidence',
    'Yes — evidence next to a claim is enough; the reader will supply the connection themselves',
    'eng.composition.claim-evidence-reasoning:MC-A-EVIDENCE-NEXT-TO-A-CLAIM-IS-ENOUGH',
    'MC-A-..., re-asked with a bridge/commute-delay example rather than the existing lunch-period example'),
  probe('eng.composition.claim-evidence-reasoning', 'true_false', H,
    'A student writes: Claim — "The bridge should be built." Evidence — "40-minute average delay." Reasoning — "This proves the bridge is necessary." Is this reasoning sentence genuine reasoning?',
    'No — it just restates the claim in different words (an echo) and adds no new explanatory content about WHY the evidence supports the claim',
    'Yes — reasoning just means restating the claim again after the evidence to reinforce it',
    'eng.composition.claim-evidence-reasoning:MC-B-REASONING-MEANS-JUST-RESTATING-THE-CLAIM-AGAIN',
    'MC-B-..., re-asked with the bridge example rather than the existing lunch example'),

  // ─── eng.composition.comparative-essay-writing (HIGH) ───────────────────
  probe('eng.composition.comparative-essay-writing', 'checkpoint', H,
    'An essay comparing two poems has two paragraphs fully describing Poem A, followed by two paragraphs fully describing Poem B, with no paragraph that explicitly compares them. Does this block structure make a genuine comparative essay?',
    'No — this leaves the actual comparing work implicit or absent; a genuine comparative essay organizes by POINT, explicitly comparing both texts within each paragraph',
    'Yes — a comparative essay means fully describing one item, then fully describing the other',
    'eng.composition.comparative-essay-writing:MC-A-A-COMPARATIVE-ESSAY-MEANS-FULLY-DESCRIBING-ONE-ITEM-THEN-FULLY-DESCRIBING-THE-OTHER',
    'MC-A-..., re-asked with a two-poems example rather than the existing two-texts example'),
  probe('eng.composition.comparative-essay-writing', 'true_false', H,
    'A student selects "both poems are printed on the same size paper" as a point of comparison. Is any true similarity or difference, like this one, a meaningful point of comparison worth a full paragraph?',
    'No — this is a trivial, analytically empty point; genuine comparison points must reveal something meaningful about the works\' themes, techniques, or effects',
    'Yes — any superficial similarity or difference is a meaningful point of comparison worth a paragraph',
    'eng.composition.comparative-essay-writing:MC-B-ANY-SUPERFICIAL-SIMILARITY-OR-DIFFERENCE-IS-A-MEANINGFUL-POINT-OF-COMPARISON-WORTH-A-PARAGRAPH',
    'MC-B-..., re-asked with a paper-size example rather than the existing chapter-division example'),

  // ─── eng.composition.counterargument-and-rebuttal (HIGH) ────────────────
  probe('eng.composition.counterargument-and-rebuttal', 'checkpoint', H,
    'An essay about a proposed park summarizes the opposing view as "some people just hate the idea of any change at all" — an extreme, easily-dismissed version — rather than the more common, moderate objection about maintenance cost. Is this a genuine counterargument?',
    'No — a real opponent wouldn\'t recognize this as their actual position; a genuine counterargument must engage the strongest, most reasonable version of the opposing view',
    'Yes — counterargument means picking the weakest opposing view so it\'s easy to defeat',
    'eng.composition.counterargument-and-rebuttal:MC-A-COUNTERARGUMENT-MEANS-PICKING-THE-WEAKEST-OPPOSING-VIEW-TO-EASILY-DEFEAT',
    'MC-A-..., re-asked with a park/maintenance-cost example rather than the existing uniforms/cost example'),
  probe('eng.composition.counterargument-and-rebuttal', 'true_false', H,
    'After fairly summarizing an opponent\'s specific concern about maintenance cost, a student writes: "But the park is still a good idea because it brings the community together." Does this count as a genuine rebuttal?',
    'No — it restates the original position without addressing the specific cost concern raised at all; a real rebuttal must specifically engage the substance of the objection',
    'Yes — rebuttal means restating your original position more forcefully after the opposing view is presented',
    'eng.composition.counterargument-and-rebuttal:MC-B-REBUTTAL-MEANS-JUST-RESTATING-YOUR-ORIGINAL-POSITION-MORE-FORCEFULLY',
    'MC-B-..., re-asked with the park example rather than the existing uniforms example'),

  // ─── eng.composition.editing-for-style (HIGH) ────────────────────────────
  probe('eng.composition.editing-for-style', 'checkpoint', H,
    '"In light of the fact that the venue was found to be unsuitable, the meeting was subsequently rescheduled." This sentence is grammatically flawless. Is there nothing left to edit here?',
    'No — correctness and stylistic quality are independent; this sentence is grammatically correct but wordy and could be tightened to "The unsuitable venue forced the meeting to be rescheduled"',
    'Yes — if a sentence is grammatically correct, there is nothing left to edit',
    'eng.composition.editing-for-style:MC-A-IF-A-SENTENCE-IS-GRAMMATICALLY-CORRECT-THERE-IS-NOTHING-LEFT-TO-EDIT',
    'MC-A-..., re-asked with a venue/rescheduling example rather than the existing weather/cancellation example'),
  probe('eng.composition.editing-for-style', 'true_false', H,
    '"The board, after reviewing all eight applicants over two separate rounds of interviews, selected the candidate from the marketing department." is cut to "The board chose someone." Did cutting all these words automatically improve the sentence?',
    'No — this over-cut destroyed real information the reader needed (how many applicants, how many rounds, which department); cutting words always improving a sentence regardless of what is cut is false',
    'Yes — cutting words always improves a sentence regardless of what is cut',
    'eng.composition.editing-for-style:MC-B-CUTTING-WORDS-ALWAYS-IMPROVES-A-SENTENCE-REGARDLESS-OF-WHAT-IS-CUT',
    'MC-B-..., re-asked with a board/applicants example rather than the existing committee/proposals example'),

  // ─── eng.composition.figurative-language-in-composition (HIGH) ──────────
  probe('eng.composition.figurative-language-in-composition', 'checkpoint', H,
    'An expository passage explains the immune system using a controlled metaphor: "The immune system is like a security team patrolling a building, checking every visitor\'s badge." Does using this metaphor make the passage seem like fiction rather than serious expository writing?',
    'No — figurative language is a legitimate expository and persuasive tool used across serious, respected non-fiction writing to make abstract ideas easier to grasp',
    'Yes — figurative language only belongs in fiction or poetry and has no place in expository writing',
    'eng.composition.figurative-language-in-composition:MC-A-FIGURATIVE-LANGUAGE-ONLY-BELONGS-IN-FICTION-OR-POETRY',
    'MC-A-..., re-asked with an immune-system/security-team example rather than the existing inflation/tire example'),
  probe('eng.composition.figurative-language-in-composition', 'true_false', H,
    'A paragraph explaining the immune system crams in three unrelated metaphors: "a security team, and also an army, and also a fire alarm." Does adding more figurative language like this automatically make the writing better?',
    'No — switching between multiple competing comparisons for the same idea makes it harder to follow; one well-developed, consistent comparison usually clarifies far more',
    'Yes — any figurative language added is automatically good writing, so more metaphors make an explanation clearer',
    'eng.composition.figurative-language-in-composition:MC-B-ANY-FIGURATIVE-LANGUAGE-ADDED-IS-AUTOMATICALLY-GOOD-WRITING',
    'MC-B-..., re-asked with the immune-system example rather than the existing inflation example'),

  // ─── eng.composition.logical-fallacies (HIGH) ────────────────────────────
  probe('eng.composition.logical-fallacies', 'checkpoint', H,
    '"This new policy is good because everyone who opposes it is just uninformed." The conclusion (the policy is good) might be true. Does this true conclusion mean the reasoning used (dismissing opponents as uninformed) is not fallacious?',
    'No — the reasoning is still a fallacious ad hominem attack even though the conclusion might happen to be true; fallacy is about broken reasoning, separate from whether the conclusion is true',
    'Yes — if an argument\'s conclusion is true or agreeable, the argument can\'t be fallacious',
    'eng.composition.logical-fallacies:MC-A-IF-AN-ARGUMENTS-CONCLUSION-IS-TRUE-OR-AGREEABLE-THE-ARGUMENT-CANT-BE-FALLACIOUS',
    'MC-A-..., re-asked with a policy/uninformed-opponents example rather than the existing exercise example'),
  probe('eng.composition.logical-fallacies', 'true_false', H,
    'Someone criticizes a claim about a supplement\'s benefits by noting: "This researcher\'s study was funded by the supplement company itself, which is a relevant conflict of interest." Is this criticism an ad hominem fallacy?',
    'No — this raises a genuinely relevant concern about bias affecting this specific claim; it is a legitimate credibility challenge, not an irrelevant personal attack',
    'Yes — every strong criticism of a person making a claim is an ad hominem fallacy',
    'eng.composition.logical-fallacies:MC-B-EVERY-STRONG-DISAGREEMENT-OR-CRITICISM-OF-A-PERSON-IS-AN-AD-HOMINEM-FALLACY',
    'MC-B-..., re-asked with a supplement-study-funding example rather than the existing medical-treatment example'),

  // ─── eng.composition.persuasive-techniques (HIGH) ───────────────────────
  probe('eng.composition.persuasive-techniques', 'checkpoint', H,
    'A persuasive essay includes a separate paragraph labeled implicitly as "credibility," another as "emotion," another as "statistics," with no connection between them. Does this checklist structure count as sophisticated persuasion?',
    'No — sophisticated persuasion weaves appeals and evidence together to reinforce the same specific points, rather than presenting each technique in its own disconnected section',
    'Yes — sophisticated persuasion means including every technique separately in its own section',
    'eng.composition.persuasive-techniques:MC-A-SOPHISTICATED-PERSUASION-MEANS-INCLUDING-EVERY-TECHNIQUE-SEPARATELY-IN-ITS-OWN-SECTION',
    'MC-A-..., re-asked with a credibility/emotion/statistics framing rather than the existing ethos/pathos/logos framing'),
  probe('eng.composition.persuasive-techniques', 'true_false', H,
    'A persuasive piece saves its strongest counterargument for the very last paragraph, after building its entire case, because the writer judges that ordering strengthens the overall argument. Must a counterargument always go at the very beginning regardless of the argument\'s structure?',
    'No — counterargument placement should be strategic based on the argument\'s specific needs; addressing it late can work if the case is built strongly enough first',
    'Yes — a counterargument should always go at the very beginning regardless of the argument\'s structure',
    'eng.composition.persuasive-techniques:MC-B-A-COUNTERARGUMENT-SHOULD-ALWAYS-GO-AT-THE-VERY-END-REGARDLESS-OF-THE-ARGUMENTS-STRUCTURE',
    'MC-B-..., re-asked with a saved-for-last framing rather than the existing addressed-early framing'),

  // ─── eng.composition.plagiarism-and-citation-ethics (HIGH) ──────────────
  probe('eng.composition.plagiarism-and-citation-ethics', 'checkpoint', H,
    'A student submits a lab report entirely copied from a classmate\'s prior submission with no attribution, presenting it as their own original work. Is this just a technical formatting rule violation, not a real ethical issue?',
    'No — this is a genuine ethical violation, misrepresenting someone else\'s work as one\'s own, which has real consequences for the original author and the shared academic record',
    'Yes — plagiarism is just a technical formatting rule, not a real ethical issue',
    'eng.composition.plagiarism-and-citation-ethics:MC-A-PLAGIARISM-IS-JUST-A-TECHNICAL-FORMATTING-RULE-NOT-A-REAL-ETHICAL-ISSUE',
    'MC-A-..., re-asked with a lab-report/classmate example rather than the existing online-source example'),
  probe('eng.composition.plagiarism-and-citation-ethics', 'true_false', H,
    'A student correctly paraphrases a source\'s idea and genuinely attempts to cite it, but uses the wrong citation format style. Is this equally as serious as a student who copies an entire paragraph with no citation at all, presented as original writing?',
    'No — the format mistake is an honest attempt at attribution, fundamentally different in kind from deliberate, uncredited copying, which is a genuine misrepresentation of authorship',
    'Yes — any citation mistake, even a wrong format style, is equally serious as deliberate plagiarism',
    'eng.composition.plagiarism-and-citation-ethics:MC-B-ANY-CITATION-MISTAKE-EVEN-A-MINOR-FORMATTING-ERROR-IS-EQUALLY-SERIOUS-AS-DELIBERATE-PLAGIARISM',
    'MC-B-..., re-asked with a wrong-citation-style example rather than the existing missing-page-number example'),

  // ─── eng.composition.research-paper-writing (HIGH) ──────────────────────
  probe('eng.composition.research-paper-writing', 'checkpoint', H,
    'A research paper has one paragraph fully summarizing Study X, then a paragraph fully summarizing Study Y, then one fully summarizing Study Z, with no paragraph combining them around one point. Is this a strong way to organize a research paper?',
    'No — this organizes by source rather than by idea; a strong paper organizes by sub-argument, pulling in whichever sources support each specific point',
    'Yes — a research paper is a sequence of source summaries, one after another',
    'eng.composition.research-paper-writing:MC-A-A-RESEARCH-PAPER-IS-A-SEQUENCE-OF-SOURCE-SUMMARIES',
    'MC-A-..., re-asked with "Study X/Y/Z" rather than the existing "Source A/B/C" example'),
  probe('eng.composition.research-paper-writing', 'true_false', H,
    'A student researching a thesis finds a study that partially complicates it, and decides not to cite that study at all, citing only studies that agree. Does synthesizing sources mean only using ones that agree with the thesis?',
    'No — a strong paper deliberately engages sources that complicate or partially disagree, explaining how the argument accounts for them, which strengthens rather than weakens credibility',
    'Yes — synthesizing sources means only using sources that agree with the thesis',
    'eng.composition.research-paper-writing:MC-B-SYNTHESIZING-SOURCES-MEANS-ONLY-USING-SOURCES-THAT-AGREE',
    'MC-B-..., re-asked with "study" rather than the existing "source" framing'),

  // ─── eng.composition.rhetorical-analysis (HIGH) ──────────────────────────
  probe('eng.composition.rhetorical-analysis', 'checkpoint', H,
    'A student\'s analysis of an ad says: "This uses a celebrity endorsement, then a statistic, then a slogan, then bright colors," with no discussion of how these choices work together. Is this a complete rhetorical analysis?',
    'No — this is just an inventory of devices found; a complete analysis must synthesize how the choices work together to build a cumulative effect',
    'Yes — rhetorical analysis means listing every device found in a text',
    'eng.composition.rhetorical-analysis:MC-A-RHETORICAL-ANALYSIS-MEANS-LISTING-EVERY-DEVICE-FOUND',
    'MC-A-..., re-asked with an ad-analysis example rather than the existing speech-analysis example'),
  probe('eng.composition.rhetorical-analysis', 'true_false', H,
    'A student writes: "This ad fails because I don\'t like the product," about an ad whose rhetorical strategy is actually well-matched to its target demographic. Does evaluating rhetorical effectiveness mean stating whether you personally like the product?',
    'No — rhetorical effectiveness asks whether the strategy is well-suited to persuading its intended audience, a separate question from whether the analyst personally likes the product',
    'Yes — evaluating a text\'s rhetorical effectiveness means stating whether you personally like the product',
    'eng.composition.rhetorical-analysis:MC-B-EVALUATING-EFFECTIVENESS-MEANS-STATING-WHETHER-YOU-AGREE-WITH-THE-ARGUMENT',
    'MC-B-..., re-asked with an ad/personal-liking example rather than the existing skeptical-audience example'),

  // ─── eng.composition.rhetorical-appeals (HIGH) ───────────────────────────
  probe('eng.composition.rhetorical-appeals', 'checkpoint', H,
    'An essay about a new bike lane inserts a vague, generic sentence — "It\'s just so wonderful when things improve" — unrelated to the specific traffic-safety argument. Does this count as effective pathos?',
    'No — pathos must connect a real feeling to the SPECIFIC claim being made; generic emotional language disconnected from the argument is decoration, not persuasion',
    'Yes — pathos just means using emotional or dramatic language anywhere in a persuasive piece',
    'eng.composition.rhetorical-appeals:MC-A-PATHOS-MEANS-JUST-BEING-EMOTIONAL-OR-DRAMATIC',
    'MC-A-..., re-asked with a bike-lane/generic-sentence example rather than the existing recycling example'),
  probe('eng.composition.rhetorical-appeals', 'true_false', H,
    'A persuasive essay cites "Studies show 80% of cities benefit" with no source and no explanation of why this general figure supports building a specific local bike lane. Does including this statistic make the argument logical (logos)?',
    'No — a number with no explained connection to the specific claim is a floating statistic, not logos; logos requires an explicit reasoning chain linking evidence to conclusion',
    'Yes — logos just means using numbers or statistics anywhere in the argument',
    'eng.composition.rhetorical-appeals:MC-B-LOGOS-MEANS-JUST-USING-NUMBERS-OR-STATISTICS',
    'MC-B-..., re-asked with a bike-lane/80%-statistic example rather than the existing park/73%-statistic example'),

  // ─── eng.composition.rhetorical-devices (HIGH) ───────────────────────────
  probe('eng.composition.rhetorical-devices', 'checkpoint', H,
    'A student analysis states only: "This passage uses parallel structure." Is naming the device this way a complete rhetorical device analysis?',
    'No — naming the device is only half the task; the analysis must also explain the specific effect the device produces in this passage',
    'Yes — naming the device is the same as explaining its effect; once you\'ve identified it correctly, the analysis is complete',
    'eng.composition.rhetorical-devices:MC-A-NAMING-THE-DEVICE-IS-THE-SAME-AS-EXPLAINING-ITS-EFFECT',
    'MC-A-..., re-asked with "parallel structure" rather than the existing "repetition" example'),
  probe('eng.composition.rhetorical-devices', 'true_false', H,
    'The word "a" appears six times in a paragraph simply because ordinary sentences require it. Is this repetition automatically a deliberate rhetorical device?',
    'No — genuine rhetorical devices are noticeable, structurally placed, and tied to meaning; ordinary grammatical repetition like "a" is just how language naturally works',
    'Yes — any repeated word or balanced phrase is automatically a deliberate device',
    'eng.composition.rhetorical-devices:MC-B-ANY-REPEATED-WORD-OR-BALANCED-PHRASE-IS-AUTOMATICALLY-A-DELIBERATE-DEVICE',
    'MC-B-..., re-asked with "a" rather than the existing "the" example'),

  // ─── eng.composition.style-voice-and-tone (HIGH) ─────────────────────────
  probe('eng.composition.style-voice-and-tone', 'checkpoint', H,
    '"The feline reposed upon the domicile\'s aperture" versus "The cat sat in the window, watching the rain." Does the first, more elaborate sentence have a stronger style than the second, simpler one?',
    'No — the simpler sentence has a clearer, more confident voice; style comes from precise, deliberate word choice, not complicated vocabulary',
    'Yes — style is just using fancy or complicated vocabulary, so the more elaborate sentence must have the stronger style',
    'eng.composition.style-voice-and-tone:MC-A-STYLE-IS-JUST-USING-FANCY-OR-COMPLICATED-VOCABULARY',
    'MC-A-..., re-asked with a cat/window example rather than the existing dog/field example'),
  probe('eng.composition.style-voice-and-tone', 'true_false', H,
    'A writer uses playful wordplay and short sentences in a humor column, but measured, careful sentences and formal vocabulary in a legal brief, while both share a preference for concrete, specific examples over vague generalities. Must a writer\'s style stay exactly the same across every piece to be authentic?',
    'No — adjusting surface choices like formality and sentence complexity for different purposes is exactly what skilled writers do, while core recognizable habits stay consistent',
    'Yes — a writer\'s style should stay exactly the same across every piece they write, or it isn\'t their real voice',
    'eng.composition.style-voice-and-tone:MC-B-A-WRITERS-STYLE-SHOULD-STAY-EXACTLY-THE-SAME-ACROSS-EVERY-PIECE-THEY-WRITE',
    'MC-B-..., re-asked with a humor-column/legal-brief pair rather than the existing blog-post/analytical-piece pair'),
]
