/**
 * ENGLISH ADULT-BAND PROBE-CONTRACT CAMPAIGN — Batch 13.
 *
 * ── THE GAP THIS CLOSES ─────────────────────────────────────────────────────
 * Batches 1-12 (commits since 2026-09-08) took 119 English concepts to
 * >= 3 ADULT-band closed-choice probes. `scripts/assets/contract-audit.ts`
 * (fixed 2026-09-17 to classify seed content by SHAPE rather than export
 * NAME — see `contractAuditShapeDetection.test.ts` — the prior name-based
 * detector silently dropped every `ENGLISH_ADULT_BAND_BATCH_*`/
 * `ENGLISH_PROBE_BATCH_*` export from every audit this project ever ran)
 * shows the TRUE remaining gap is 99 (concept, ADULT) pairs, all with
 * gradeable=0 — not the "2/412" figure quoted in every prior CLAUDE.md entry.
 *
 * All 99 are advanced/academic-adult English domains never touched by
 * batches 1-12, which covered eng.grammar/phonics/phonetics/listening/
 * speaking/reading/vocab/writing FOUNDATIONS only. This batch is the first
 * to close part of `eng.composition.*` — essay-writing and rhetoric concepts
 * whose native band is already adult-level content, so an ADULT-band probe
 * gap here blocks the majority-likely learner for these specific concepts,
 * not just a Library default.
 *
 * ── THIS BATCH ───────────────────────────────────────────────────────────
 * 8 concepts (alphabetically first 8 of `eng.composition.*`'s 16-concept
 * short-list: academic-writing-conventions, argumentation-basics,
 * audience-and-purpose, claim-evidence-reasoning, comparative-essay-writing,
 * counterargument-and-rebuttal, editing-for-style,
 * figurative-language-in-composition), 3 new ADULT-band closed-choice
 * probes each (24 total) — the bare mastery-gate contract
 * (`correctAtCheck >= 1` + `correctAtPractice >= 2` = 3, `assetContract.ts`).
 * The remaining 8 concepts in `eng.composition.*` (logical-fallacies,
 * persuasive-techniques, plagiarism-and-citation-ethics,
 * research-paper-writing, rhetorical-analysis, rhetorical-appeals,
 * rhetorical-devices, style-voice-and-tone) are deliberately deferred to a
 * future batch, matching this campaign's own established
 * one-bounded-batch-per-turn discipline.
 *
 * Every distractor carries the `misconceptionId` naming it, reusing ONE of
 * each concept's own two ALREADY-REGISTERED, ALREADY-ACTIVE misconceptions
 * (verified: every one of these 8 concepts' Blueprint Misconception
 * Registry holds exactly MC-A and MC-B — no more, no fewer; no new
 * misconception ids invented, no Educational Brain authoring). Structure
 * mirrors `englishAdultBandBatch1.ts`'s `adultLadder` helper exactly:
 * `mcq`(FOUNDATIONAL) + `misconception_probe`(DEVELOPING) + `mcq`(PROFICIENT)
 * per concept, so the ladder-aware slug resolver (`buildProbeSlugResolver`)
 * disambiguates the two `mcq` rungs by difficulty without re-identifying any
 * already-serving row. None of these 8 concepts hold any existing ADULT
 * probe today, so this is a fresh singleton-to-ladder promotion within this
 * batch only — no P-10 collision risk against any pre-existing row.
 *
 * Register: adult/academic framing throughout, matching the age these
 * essay-writing/rhetoric concepts are naturally taught at — never
 * child-directed examples. Every worked example below is deliberately
 * DIFFERENT from the Blueprint's own Conflict Evidence / Discrimination
 * Pairs examples, so a learner who has met the explanation is not simply
 * asked to recall the identical example.
 *
 * Seeded as DRAFT-then-bootstrap-ACTIVE through the same path as every
 * other batch in this campaign: `src/instrumentation.ts`'s cold-start
 * bootstrap (English is in `BOOTSTRAP_SEED_SUBJECTS`) and
 * `scripts/brain/seed-knowledge-assets.ts`. Nothing here is a database
 * write performed by this session directly — no DATABASE_URL is available
 * here.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedProbe } from './brainSeedAssets'

const S = 'english'
const src = (concept: string, what: string) =>
  `docs/curriculum/blueprints/${concept}.md — Misconception Registry; ${what}`

function adultLadder(
  conceptId: string,
  mcA: string,
  mcB: string,
  items: [
    { stem: string; correct: string; wrong: string }, // mcq, FOUNDATIONAL, mcA
    { stem: string; correct: string; wrong: string }, // misconception_probe, DEVELOPING, mcB
    { stem: string; correct: string; wrong: string }, // mcq, PROFICIENT, mcA (fresh example)
  ],
  notes: [string, string, string],
): SeedProbe[] {
  const mcAId = `${conceptId}:${mcA}`
  const mcBId = `${conceptId}:${mcB}`
  return [
    {
      conceptId, subjectSlug: S, probeKind: 'mcq',
      gradeBand: GradeBand.ADULT, difficulty: ProbeDifficulty.FOUNDATIONAL,
      stem: items[0].stem,
      choices: [
        { text: items[0].correct, isCorrect: true },
        { text: items[0].wrong, isCorrect: false, misconceptionId: mcAId },
      ],
      targetedMisconceptions: [mcAId],
      source: src(conceptId, notes[0]),
    },
    {
      conceptId, subjectSlug: S, probeKind: 'misconception_probe',
      gradeBand: GradeBand.ADULT, difficulty: ProbeDifficulty.DEVELOPING,
      stem: items[1].stem,
      choices: [
        { text: items[1].correct, isCorrect: true },
        { text: items[1].wrong, isCorrect: false, misconceptionId: mcBId },
      ],
      targetedMisconceptions: [mcBId],
      source: src(conceptId, notes[1]),
    },
    {
      conceptId, subjectSlug: S, probeKind: 'mcq',
      gradeBand: GradeBand.ADULT, difficulty: ProbeDifficulty.PROFICIENT,
      stem: items[2].stem,
      choices: [
        { text: items[2].correct, isCorrect: true },
        { text: items[2].wrong, isCorrect: false, misconceptionId: mcAId },
      ],
      targetedMisconceptions: [mcAId],
      source: src(conceptId, notes[2]),
    },
  ]
}

const ACADEMIC_WRITING_CONVENTIONS_ADULT = adultLadder(
  'eng.composition.academic-writing-conventions',
  'MC-A-ACADEMIC-OBJECTIVITY-MEANS-HAVING-NO-OPINION-OR-ARGUMENT-AT-ALL',
  'MC-B-HEDGING-LANGUAGE-MEANS-BEING-VAGUE-OR-WEAK-ABOUT-EVERYTHING',
  [
    {
      stem: 'A report draft reads: "There are different opinions about whether remote work improves productivity." Is this sentence making an academic argument, or avoiding one?',
      correct: 'Avoiding one — it states that opinions differ but takes no evidence-grounded position of its own',
      wrong: 'Making an argument — staying neutral between two views is itself what counts as an academic argument',
    },
    {
      stem: 'A writer hedges every claim in a report identically ("might possibly," "could potentially") whether the underlying study is a single small pilot or a large, heavily-replicated finding. Is this uniform hedging doing its job?',
      correct: 'No — hedging should track how strong the actual evidence is; identical hedging on a strong finding and a weak one hides the real difference between them',
      wrong: 'Yes — hedging language is meant to sound cautious and modest throughout, regardless of how strong any particular piece of evidence is',
    },
    {
      stem: 'A student revises "Some believe social media affects mental health" into "Longitudinal data suggests heavy social-media use is associated with increased anxiety in teenagers, though causation remains disputed." Has the student moved toward or away from academic objectivity?',
      correct: 'Toward it — the revision states a specific, evidence-grounded claim with confidence calibrated to what the evidence actually shows, rather than avoiding a position',
      wrong: 'Away from it — naming a specific claim at all makes the sentence more biased than the vague, opinion-free original',
    },
  ],
  [
    'MC-A-ACADEMIC-OBJECTIVITY-MEANS-HAVING-NO-OPINION-OR-ARGUMENT-AT-ALL, fresh adult example (a workplace report on remote work) rather than the existing renewable-energy-policy example',
    'MC-B-HEDGING-LANGUAGE-MEANS-BEING-VAGUE-OR-WEAK-ABOUT-EVERYTHING, fresh example (uniform hedging across a pilot study and a replicated finding) rather than the existing three-claims example',
    'MC-A-ACADEMIC-OBJECTIVITY-MEANS-HAVING-NO-OPINION-OR-ARGUMENT-AT-ALL, second fresh example (a social-media-and-mental-health revision) forming the ladder\'s third rung',
  ],
)

const ARGUMENTATION_BASICS_ADULT = adultLadder(
  'eng.composition.argumentation-basics',
  'MC-A-MORE-REASONS-IS-ALWAYS-A-STRONGER-ARGUMENT',
  'MC-B-ARGUMENT-ORGANIZATION-DOESNT-MATTER-AS-LONG-AS-THE-POINTS-ARE-GOOD',
  [
    {
      stem: 'A memo arguing for a four-day work week lists six reasons, four of which all restate "employees will be less tired" in different words, plus two genuinely distinct points (a productivity study; a retention-cost comparison). Would trimming the four overlapping reasons down to one weaken the memo?',
      correct: 'No — the four overlapping reasons are one point repeated; keeping the two genuinely distinct points and cutting the repetition makes the argument stronger, not weaker',
      wrong: 'Yes — removing any stated reason always weakens an argument, since a persuasive case is built by accumulating as many reasons as possible',
    },
    {
      stem: 'Two proposals use the identical three strong points for adopting a new software tool, but one lists them in the order they were thought of, and the other deliberately places the most compelling point (cost savings) last, right before the recommendation. Does the reordering change how convincing the proposal feels?',
      correct: 'Yes — the same points can land with different force depending on their order; placing the strongest point last, right before the conclusion, gives it more weight',
      wrong: 'No — since the exact same three points are present either way, the order in which they appear cannot affect how persuasive the proposal is',
    },
    {
      stem: 'A student argues against a proposed tuition increase using ten scattered points, several of which restate "students cannot afford it" using different phrasing. A reviewer suggests cutting to three well-developed, genuinely distinct points instead. Is the reviewer\'s advice sound?',
      correct: "Yes — a few genuinely distinct, well-developed points persuade more effectively than many overlapping ones; quantity of stated reasons is not what makes an argument strong",
      wrong: "No — cutting from ten points to three always makes an argument weaker, since more stated reasons inherently give a position more support",
    },
  ],
  [
    'MC-A-MORE-REASONS-IS-ALWAYS-A-STRONGER-ARGUMENT, fresh adult example (a workplace four-day-week memo) rather than the existing school-start-time example',
    'MC-B-ARGUMENT-ORGANIZATION-DOESNT-MATTER-AS-LONG-AS-THE-POINTS-ARE-GOOD, fresh example (a software-adoption proposal) rather than the existing meal-course anchor',
    'MC-A-MORE-REASONS-IS-ALWAYS-A-STRONGER-ARGUMENT, second fresh example (a tuition-increase argument) forming the ladder\'s third rung',
  ],
)

const AUDIENCE_AND_PURPOSE_ADULT = adultLadder(
  'eng.composition.audience-and-purpose',
  'MC-A-PURPOSE-IS-THE-TOPIC',
  'MC-B-AUDIENCE-MEANS-WHOEVER-READS-IT',
  [
    {
      stem: 'Asked "what is the purpose of your report?", an employee answers "quarterly sales figures." Has the employee named a purpose, or a topic?',
      correct: "A topic — \"quarterly sales figures\" is what the report is about; the purpose would be what the writer wants the reader to DO after reading it (approve a budget, understand a trend, etc.)",
      wrong: "A purpose — stating the subject matter of a report is the same thing as stating what job that report is meant to do",
    },
    {
      stem: 'A technical writer produces one paragraph explaining a software update for the engineering team and a second paragraph explaining the same update for customers, using identical wording in both. Is treating "audience" as irrelevant here likely to work well?',
      correct: 'No — engineers and customers have different background knowledge and needs, so identical wording is likely to either over-explain to engineers or under-explain to customers',
      wrong: 'Yes — since both paragraphs describe the same true update, the audience reading them does not require any change in how it is explained',
    },
    {
      stem: 'A writer produces a cover letter using dense, jargon-heavy industry language for a hiring manager who explicitly said they are new to the field. Has the writer correctly analyzed the audience?',
      correct: "No — the audience's stated unfamiliarity with the jargon means the writer should have adjusted vocabulary and explanation, not assumed expert-level background knowledge",
      wrong: "Yes — using the most professional, technical vocabulary available always demonstrates competence to any reader, regardless of what that reader has said about their own background",
    },
  ],
  [
    'MC-A-PURPOSE-IS-THE-TOPIC, fresh adult example (a workplace quarterly report) rather than the existing dogs/climate-change example',
    'MC-B-AUDIENCE-MEANS-WHOEVER-READS-IT, fresh example (an engineering-vs-customer software update) rather than the existing photosynthesis example',
    'MC-B-AUDIENCE-MEANS-WHOEVER-READS-IT, second fresh example (a jargon-heavy cover letter for a self-described novice reader) forming the ladder\'s third rung',
  ],
)

const CLAIM_EVIDENCE_REASONING_ADULT = adultLadder(
  'eng.composition.claim-evidence-reasoning',
  'MC-A-EVIDENCE-NEXT-TO-A-CLAIM-IS-ENOUGH',
  'MC-B-REASONING-MEANS-JUST-RESTATING-THE-CLAIM-AGAIN',
  [
    {
      stem: 'A proposal states: "Our team should switch to a four-day week. A pilot program at a comparable firm showed a 12% drop in reported burnout." Nothing else is said. Could a skeptical reader draw a different conclusion from that same evidence?',
      correct: "Yes — without an explicit reasoning sentence connecting the drop in burnout to the case for a four-day week specifically, a reader could attribute the drop to something else the pilot firm also changed",
      wrong: 'No — once a piece of supporting evidence is placed directly after a claim, the connection between them is automatically clear to any reader',
    },
    {
      stem: 'After presenting evidence that a company\'s customer complaints dropped after adding live chat support, a writer\'s "reasoning" sentence reads: "This shows that live chat support should be adopted." Does this sentence add reasoning, or repeat the claim?',
      correct: 'It repeats the claim — it restates the conclusion without explaining the mechanism connecting the complaint drop to the recommendation',
      wrong: 'It adds reasoning — restating the recommendation directly after the evidence is what counts as explaining the connection between them',
    },
    {
      stem: 'A report states a claim, cites a relevant statistic, and then adds: "This drop occurred specifically after live chat was introduced and not after other, unrelated changes that quarter, which indicates the live chat feature itself is the likely cause of the improvement." Does this sentence do genuine reasoning work?',
      correct: 'Yes — it explains WHY the evidence supports the specific claim (ruling out an alternative explanation), adding content beyond a restated conclusion',
      wrong: "No — any sentence placed immediately after a claim and its evidence counts as reasoning, regardless of whether it explains the connection between them",
    },
  ],
  [
    'MC-A-EVIDENCE-NEXT-TO-A-CLAIM-IS-ENOUGH, fresh adult example (a four-day-week workplace pilot) rather than the existing lunch-periods example',
    'MC-B-REASONING-MEANS-JUST-RESTATING-THE-CLAIM-AGAIN, fresh example (a live-chat customer-complaints report) rather than the existing lunch-periods "echo" example',
    'MC-B-REASONING-MEANS-JUST-RESTATING-THE-CLAIM-AGAIN, second fresh example (a report ruling out an alternative cause) forming the ladder\'s third rung',
  ],
)

const COMPARATIVE_ESSAY_WRITING_ADULT = adultLadder(
  'eng.composition.comparative-essay-writing',
  'MC-A-A-COMPARATIVE-ESSAY-MEANS-FULLY-DESCRIBING-ONE-ITEM-THEN-FULLY-DESCRIBING-THE-OTHER',
  'MC-B-ANY-SUPERFICIAL-SIMILARITY-OR-DIFFERENCE-IS-A-MEANINGFUL-POINT-OF-COMPARISON-WORTH-A-PARAGRAPH',
  [
    {
      stem: 'A student compares two novels by writing four paragraphs fully describing Novel A, then four paragraphs fully describing Novel B, with no paragraph directly stating how the two are similar or different on any point. Is this a completed comparative essay?',
      correct: "No — this is block structure; the reader is never shown an explicit comparison, only two separate descriptions placed next to each other",
      wrong: "Yes — once both items have been fully and accurately described, the comparison between them is automatically complete",
    },
    {
      stem: 'Comparing two job offers, a candidate spends a full paragraph noting that both companies\' names contain exactly nine letters. Is this a meaningful point of comparison?',
      correct: "No — it is a trivial, coincidental similarity that reveals nothing significant about the two offers worth analyzing",
      wrong: "Yes — any true similarity between the two items being compared is, by definition, worth a dedicated paragraph",
    },
    {
      stem: 'Revising a block-structured essay comparing two marketing campaigns, a writer reorganizes it into three paragraphs, each addressing one shared category (target audience, messaging tone, measured results) across both campaigns within the same paragraph. Has this revision improved the comparison?',
      correct: 'Yes — organizing by point makes the actual comparison explicit, paragraph by paragraph, instead of leaving the reader to infer it from two separate descriptions',
      wrong: 'No — since the same factual content about both campaigns is present either way, reorganizing from block to point structure has no effect on how comparative the essay is',
    },
  ],
  [
    'MC-A-A-COMPARATIVE-ESSAY-MEANS-FULLY-DESCRIBING-ONE-ITEM-THEN-FULLY-DESCRIBING-THE-OTHER, fresh adult example (comparing two novels) rather than the existing restaurant-review anchor',
    'MC-B-ANY-SUPERFICIAL-SIMILARITY-OR-DIFFERENCE-IS-A-MEANINGFUL-POINT-OF-COMPARISON-WORTH-A-PARAGRAPH, fresh example (comparing two job offers by an irrelevant name-length coincidence) rather than the existing "both have chapters" example',
    'MC-A-A-COMPARATIVE-ESSAY-MEANS-FULLY-DESCRIBING-ONE-ITEM-THEN-FULLY-DESCRIBING-THE-OTHER, second fresh example (revising a marketing-campaign comparison from block to point structure) forming the ladder\'s third rung',
  ],
)

const COUNTERARGUMENT_AND_REBUTTAL_ADULT = adultLadder(
  'eng.composition.counterargument-and-rebuttal',
  'MC-A-COUNTERARGUMENT-MEANS-PICKING-THE-WEAKEST-OPPOSING-VIEW-TO-EASILY-DEFEAT',
  'MC-B-REBUTTAL-MEANS-JUST-RESTATING-YOUR-ORIGINAL-POSITION-MORE-FORCEFULLY',
  [
    {
      stem: 'Arguing for a proposed office return-to-work policy, a memo summarizes the opposition as "some people just don\'t want to work at all," when the actual common objection is about lost commuting time and childcare logistics. Would an opponent recognize their own view in this summary?',
      correct: 'No — this is a strawman; a real opponent raising commuting and childcare concerns would say this summary misrepresents their actual position',
      wrong: 'Yes — any statement that disagrees with the memo\'s position counts as a fair summary of the opposing argument, regardless of how it is worded',
    },
    {
      stem: 'After fairly summarizing an objection that a proposed pricing change would hurt small customers, a rebuttal reads: "Still, this pricing change is a smart business decision." Does this rebuttal engage with the specific objection raised?',
      correct: "No — it restates the original position more forcefully without addressing the small-customer impact the objection specifically raised",
      wrong: "Yes — reasserting the original position after any objection counts as a rebuttal to that objection, regardless of what the objection specifically said",
    },
    {
      stem: 'A rebuttal to the concern that a new attendance policy would unfairly penalize employees with chronic illness responds: "This is a valid concern; the policy already includes a documented medical-exception process that addresses exactly this case." Does this engage with the specific objection?',
      correct: "Yes — it names the specific concern raised and responds to its actual substance, rather than repeating the original policy proposal unchanged",
      wrong: "No — conceding that a concern is valid at all always means the original position has failed and cannot be defended further",
    },
  ],
  [
    'MC-A-COUNTERARGUMENT-MEANS-PICKING-THE-WEAKEST-OPPOSING-VIEW-TO-EASILY-DEFEAT, fresh adult example (a return-to-work-policy memo) rather than the existing school-uniforms example',
    'MC-B-REBUTTAL-MEANS-JUST-RESTATING-YOUR-ORIGINAL-POSITION-MORE-FORCEFULLY, fresh example (a pricing-change rebuttal) rather than the existing school-uniforms example',
    'MC-B-REBUTTAL-MEANS-JUST-RESTATING-YOUR-ORIGINAL-POSITION-MORE-FORCEFULLY, second fresh example (a partial concession that still directly engages the objection) forming the ladder\'s third rung',
  ],
)

const EDITING_FOR_STYLE_ADULT = adultLadder(
  'eng.composition.editing-for-style',
  'MC-A-IF-A-SENTENCE-IS-GRAMMATICALLY-CORRECT-THERE-IS-NOTHING-LEFT-TO-EDIT',
  'MC-B-CUTTING-WORDS-ALWAYS-IMPROVES-A-SENTENCE-REGARDLESS-OF-WHAT-IS-CUT',
  [
    {
      stem: 'A grammar checker flags zero errors in the sentence "It is important to note that, in the majority of instances, the outcome tends to be favorable." Does a clean grammar check mean this sentence needs no further editing?',
      correct: "No — grammatical correctness and stylistic quality are separate questions; this sentence is correct but wordy and vague, and a style pass is still needed",
      wrong: "Yes — once a sentence contains no grammatical errors, it has reached its final, best form and needs no further revision",
    },
    {
      stem: 'Editing a sentence describing a company\'s hiring process, a writer cuts "after conducting three rounds of structured interviews with a five-person panel" down to just "after interviews," removing details a reader actually needed to understand the process\'s rigor. Did this cut improve the sentence?',
      correct: "No — the cut removed real, needed information rather than genuine padding, making the sentence shorter but less useful, not better",
      wrong: "Yes — any reduction in word count is itself an improvement, regardless of what specific information the removed words were carrying",
    },
    {
      stem: 'A sentence reads "Due to the fact that the server experienced an outage of a temporary nature, the deployment was delayed" and is revised to "The deployment was delayed by a brief server outage," with no information lost. Is this revision a stylistic improvement?',
      correct: "Yes — it removes padding phrasing while preserving every fact the original sentence conveyed, which is what a genuine style edit does",
      wrong: "No — since the original sentence was already grammatically correct, shortening it afterward cannot make it any better",
    },
  ],
  [
    'MC-A-IF-A-SENTENCE-IS-GRAMMATICALLY-CORRECT-THERE-IS-NOTHING-LEFT-TO-EDIT, fresh adult example (a grammar-checker-passed but vague sentence) rather than the existing weather-cancellation example',
    'MC-B-CUTTING-WORDS-ALWAYS-IMPROVES-A-SENTENCE-REGARDLESS-OF-WHAT-IS-CUT, fresh example (a hiring-process description losing real detail) rather than the existing committee-proposals example',
    'MC-B-CUTTING-WORDS-ALWAYS-IMPROVES-A-SENTENCE-REGARDLESS-OF-WHAT-IS-CUT, second fresh example (a server-outage sentence cut with no information lost) forming the ladder\'s third rung',
  ],
)

const FIGURATIVE_LANGUAGE_IN_COMPOSITION_ADULT = adultLadder(
  'eng.composition.figurative-language-in-composition',
  'MC-A-FIGURATIVE-LANGUAGE-ONLY-BELONGS-IN-FICTION-OR-POETRY',
  'MC-B-ANY-FIGURATIVE-LANGUAGE-ADDED-IS-AUTOMATICALLY-GOOD-WRITING',
  [
    {
      stem: 'A student avoids using any metaphor in an economics essay explaining compound interest, reasoning that "metaphors are for stories, not serious writing." Is this reasoning sound?',
      correct: 'No — metaphor is a legitimate expository tool used across serious, respected non-fiction writing to make abstract ideas concrete, not something exclusive to fiction or poetry',
      wrong: 'Yes — any use of metaphor or comparison in an essay automatically signals that the writing is not being treated seriously',
    },
    {
      stem: 'Explaining supply and demand, a writer piles up three unrelated metaphors in one paragraph — comparing it to a seesaw, then to a tug-of-war, then to a thermostat — switching between them sentence by sentence. Does this make the explanation clearer?',
      correct: "No — switching between several unrelated comparisons for the same idea forces the reader to keep re-mapping the concept, which tends to confuse rather than clarify",
      wrong: "Yes — including more figurative comparisons for the same idea always makes an explanation easier to follow, regardless of how many are used",
    },
    {
      stem: 'A financial column explains a company\'s cash-flow problem as "running on fumes, with the tank nearly empty and no gas station in sight," developing that single image across the paragraph. Is this a legitimate use of figurative language in expository writing?',
      correct: "Yes — it is one well-developed, consistently mapped comparison used to clarify a financial concept in a respected non-fiction context, not fictional decoration",
      wrong: "No — using any vivid imagery in a financial or business publication is inappropriate, since such writing must remain entirely literal",
    },
  ],
  [
    'MC-A-FIGURATIVE-LANGUAGE-ONLY-BELONGS-IN-FICTION-OR-POETRY, fresh adult example (an economics essay on compound interest) rather than the existing inflation example',
    'MC-B-ANY-FIGURATIVE-LANGUAGE-ADDED-IS-AUTOMATICALLY-GOOD-WRITING, fresh example (three competing metaphors for supply and demand) rather than the existing inflation example',
    'MC-B-ANY-FIGURATIVE-LANGUAGE-ADDED-IS-AUTOMATICALLY-GOOD-WRITING, second fresh example (one well-developed cash-flow metaphor) forming the ladder\'s third rung',
  ],
)

export const ENGLISH_ADULT_BAND_BATCH_13: SeedProbe[] = [
  ...ACADEMIC_WRITING_CONVENTIONS_ADULT,
  ...ARGUMENTATION_BASICS_ADULT,
  ...AUDIENCE_AND_PURPOSE_ADULT,
  ...CLAIM_EVIDENCE_REASONING_ADULT,
  ...COMPARATIVE_ESSAY_WRITING_ADULT,
  ...COUNTERARGUMENT_AND_REBUTTAL_ADULT,
  ...EDITING_FOR_STYLE_ADULT,
  ...FIGURATIVE_LANGUAGE_IN_COMPOSITION_ADULT,
]
