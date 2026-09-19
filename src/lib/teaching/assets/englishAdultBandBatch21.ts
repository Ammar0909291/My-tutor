/**
 * ENGLISH ADULT-BAND PROBE-CONTRACT CAMPAIGN — Batch 21.
 *
 * ── THE GAP THIS CLOSES ─────────────────────────────────────────────────────
 * Batch 20 closed all `eng.vocab.*` concepts. This batch closes the
 * remaining closed-choice-eligible English gap: `eng.reading.reading-
 * across-genres`, `eng.speaking.debate-skills`, `eng.speaking.presentation-
 * skills`, and all 5 short `eng.writing.*` concepts (the prior estimate of
 * "9 advanced" `eng.writing.*` concepts was stale — live `contract-audit.ts
 * --all` regeneration found only 5 short: citations-and-referencing,
 * creative-writing-forms, essay-structure, revising-for-content, thesis-
 * statements; per this campaign's standing rule, never trust a count in a
 * history file). 3 new ADULT-band closed-choice probes each (24 total),
 * the bare mastery-gate contract (`correctAtCheck >= 1` + `correctAtPractice
 * >= 2` = 3, `assetContract.ts`).
 *
 * NOT touched by this batch: the same `--all` regeneration also surfaced 2
 * previously-unknown short `eng.phonics.*` pairs —
 * `letter-sound-correspondence::ELEMENTARY` and `phonemic-awareness::ADULT`
 * — distinct from the already-excluded `::EARLY` band pairs for the same
 * two concepts (which Batch 13 found voice-required and un-closable this
 * way). These two are `gradeable=0, openRecall=0` (no content of ANY kind
 * yet, not even voice-required), so whether they're closed-choice-eligible
 * needs its own investigation before authoring — deliberately deferred to a
 * future bounded batch, flagged in
 * `docs/history/subject-onboarding-and-fix-campaign.md`, not mixed into
 * this batch's different subdomains.
 *
 * Every distractor carries the `misconceptionId` naming it, reusing ONE of
 * each concept's own two ALREADY-REGISTERED, ALREADY-ACTIVE misconceptions
 * (verified against each concept's Blueprint Component 1 — Misconception
 * Register: every one of these 8 concepts holds exactly two — no more, no
 * fewer; no new misconception ids invented, no Educational Brain
 * authoring). As with Batches 18-20, several of these Blueprints label
 * their two misconceptions with bare `MC-...` headings rather than the
 * `MC-A-.../MC-B-...` convention (e.g. `presentation-skills`, `essay-
 * structure`, `revising-for-content`) — this file carries each concept's
 * exact heading text verbatim as the misconceptionId regardless. Structure
 * otherwise mirrors `englishAdultBandBatch13.ts`'s `adultLadder` helper
 * exactly: `mcq`(FOUNDATIONAL) + `misconception_probe`(DEVELOPING) +
 * `mcq`(PROFICIENT) per concept, so the ladder-aware slug resolver
 * (`buildProbeSlugResolver`) disambiguates the two `mcq` rungs by
 * difficulty without re-identifying any already-serving row. None of these
 * 8 concepts hold any existing ADULT probe today, so this is a fresh
 * singleton-to-ladder promotion within this batch only — no P-10 collision
 * risk against any pre-existing row.
 *
 * Register: adult/professional framing throughout (a product-defect
 * synthesis, a budget-proposal debate, a quarterly-results slide, a grant
 * proposal, a business report) — never child-directed examples. Every
 * worked example below is deliberately DIFFERENT from the Blueprint's own
 * Conflict Evidence / Discrimination Pairs examples, so a learner who has
 * met the explanation is not simply asked to recall the identical example.
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

const READING_ACROSS_GENRES_ADULT = adultLadder(
  'eng.reading.reading-across-genres',
  'MC-A-SYNTHESIZING-MULTIPLE-TEXTS-MEANS-SUMMARIZING-EACH-ONE-SEPARATELY-BACK-TO-BACK',
  'MC-B-TEXTS-IN-DIFFERENT-GENRES-CANNOT-BE-MEANINGFULLY-CONNECTED-OR-SYNTHESIZED',
  [
    {
      stem: 'Asked to synthesize three sources about a product defect — a technical memo, a customer complaint email, and a sales report — a writer produces three separate paragraphs, one full summary per source, with no paragraph combining insights across all three. Has this writer produced a genuine synthesis?',
      correct: "No — this is three separate summaries placed one after another; genuine synthesis requires an integrated statement drawing on all three sources together, such as noting how the memo's technical cause, the complaint's described symptom, and the sales dip all point to the same underlying issue",
      wrong: 'Yes — since all three sources have been summarized and included in the same document, this counts as a genuine synthesis of the three texts',
    },
    {
      stem: 'A researcher has a company\'s internal blog post about employee burnout (personal, emotional reflections) and an HR report with statistical turnover data (factual, numerical). Because these two texts are in very different genres, does that mean their content cannot be meaningfully connected?',
      correct: 'No — despite their different genres, both texts address the same underlying topic (employee burnout and its consequences); the emotional reflections and the statistical data can be synthesized to illuminate different facets of the same real issue',
      wrong: 'Yes — since the blog post and the HR report are in fundamentally different genres, their content is unrelated and cannot be meaningfully synthesized into one understanding',
    },
    {
      stem: 'Revising the product-defect analysis, the writer instead writes one paragraph stating that the memo\'s identified technical flaw explains the specific symptom customers reported and accounts for the drop shown in the sales report. Is this revision a genuine synthesis?',
      correct: 'Yes — this integrates insights from all three sources into one connected understanding, which is exactly what genuine synthesis requires, rather than three separate summaries placed side by side',
      wrong: "No — since the writer is still just describing what each of the three sources said, this is no different from the original three-separate-summaries version",
    },
  ],
  [
    'MC-A-SYNTHESIZING-MULTIPLE-TEXTS-MEANS-SUMMARIZING-EACH-ONE-SEPARATELY-BACK-TO-BACK, fresh adult example (a product-defect memo, complaint, and sales report) rather than the existing generic three-texts example',
    'MC-B-TEXTS-IN-DIFFERENT-GENRES-CANNOT-BE-MEANINGFULLY-CONNECTED-OR-SYNTHESIZED, fresh example (a burnout blog post and an HR turnover report) rather than the existing drought poem/report example',
    'MC-A-SYNTHESIZING-MULTIPLE-TEXTS-MEANS-SUMMARIZING-EACH-ONE-SEPARATELY-BACK-TO-BACK, second fresh example (revising the product-defect analysis) forming the ladder\'s third rung',
  ],
)

const DEBATE_SKILLS_ADULT = adultLadder(
  'eng.speaking.debate-skills',
  'MC-A-WINNING-A-DEBATE-MEANS-DELIVERING-YOUR-PREPARED-ARGUMENTS-REGARDLESS-OF-WHAT-THE-OPPONENT-ACTUALLY-SAYS',
  'MC-B-BEING-FORCEFUL-OR-DIRECTLY-CHALLENGING-AN-OPPONENTS-ARGUMENT-MEANS-BEING-DISRESPECTFUL-OR-HOSTILE',
  [
    {
      stem: 'In a budget debate, a colleague raises a specific concern that the proposal underestimates staffing costs. The presenter\'s rebuttal ignores this and instead delivers a pre-planned point about market growth that doesn\'t address the staffing concern at all. Is this an effective rebuttal?',
      correct: "No — the rebuttal doesn't actually engage with the specific point the colleague raised; a debate rebuttal has to directly respond to the opponent's actual argument, not deliver pre-planned content regardless of what was said",
      wrong: "Yes — since the presenter delivered a confident, well-prepared point, the rebuttal was effective regardless of whether it addressed the colleague's specific staffing concern",
    },
    {
      stem: 'In a boardroom discussion, one executive firmly and directly says, "The revenue projections in this proposal don\'t hold up because they ignore last quarter\'s decline." Is this forceful, direct challenge to the argument the same thing as being disrespectful toward the person who proposed it?',
      correct: 'No — directly and firmly challenging the argument\'s reasoning while staying focused on the numbers and evidence is compatible with respect for the person; forceful argumentative disagreement and personal respect are not in conflict',
      wrong: "Yes — firmly and directly stating that a colleague's projections don't hold up is inherently disrespectful and hostile toward that colleague, regardless of how the disagreement is phrased",
    },
    {
      stem: 'Preparing for a debate, a presenter drafts flexible talking points but commits to actually listening to the opponent\'s specific case and adjusting the rebuttal to directly answer whatever is actually argued. Is this the correct way to prepare for a debate?',
      correct: "Yes — preparing flexible content while committing to actively listen and directly engage with whatever the opponent actually argues is exactly the correct approach, rather than a fixed script delivered regardless of the opponent's case",
      wrong: "No — since debates reward confident, well-rehearsed delivery, committing to adjust the rebuttal based on what the opponent actually says would undermine the strength of a well-prepared case",
    },
  ],
  [
    'MC-A-WINNING-A-DEBATE-MEANS-DELIVERING-YOUR-PREPARED-ARGUMENTS-REGARDLESS-OF-WHAT-THE-OPPONENT-ACTUALLY-SAYS, fresh adult example (a budget-debate rebuttal) rather than the existing generic debate-transcript example',
    'MC-B-BEING-FORCEFUL-OR-DIRECTLY-CHALLENGING-AN-OPPONENTS-ARGUMENT-MEANS-BEING-DISRESPECTFUL-OR-HOSTILE, fresh example (a boardroom revenue-projections challenge) rather than the existing generic rebuttal example',
    'MC-A-WINNING-A-DEBATE-MEANS-DELIVERING-YOUR-PREPARED-ARGUMENTS-REGARDLESS-OF-WHAT-THE-OPPONENT-ACTUALLY-SAYS, second fresh example (preparing flexible debate content) forming the ladder\'s third rung',
  ],
)

const PRESENTATION_SKILLS_ADULT = adultLadder(
  'eng.speaking.presentation-skills',
  'MC-VISUAL-AIDS-SHOULD-CONTAIN-EVERYTHING-THE-SPEAKER-WILL-SAY',
  'MC-A-GOOD-PRESENTATION-COVERS-AS-MUCH-INFORMATION-AS-POSSIBLE',
  [
    {
      stem: 'A presenter\'s quarterly-results slide contains six full sentences of dense text, essentially duplicating everything the presenter plans to say aloud. Does this slide effectively support the spoken presentation?',
      correct: 'No — when a slide contains everything the speaker will say, the audience reads the slide instead of listening to the speaker; a good visual aid reinforces spoken content with key points or data, not a full duplicate script',
      wrong: "Yes — including complete sentences on the slide ensures the audience won't miss any information, which is what makes a visual aid effective",
    },
    {
      stem: 'Preparing a product-launch presentation, a team tries to cover all fifteen features of the new product in equal depth, believing this demonstrates thoroughness. Would the audience likely remember and understand the product better from this approach than from a presentation focusing on the 3 most important differentiating features in depth?',
      correct: 'No — cramming in more information usually makes a presentation harder to follow and less memorable; an effective presentation is selective, developing the most important points well rather than superficially covering everything',
      wrong: 'Yes — covering as many features as possible in a presentation always demonstrates more thorough preparation and gives the audience more value than a selective, in-depth approach',
    },
    {
      stem: 'Revising the quarterly-results slide down to a single chart and the phrase "Revenue +12% QoQ," with the presenter explaining the details aloud, has this revision improved the slide\'s role in supporting the presentation?',
      correct: 'Yes — reducing the slide to key data and a short phrase, letting the spoken delivery carry the explanation, is exactly what a supportive, non-duplicating visual aid should do',
      wrong: "No — since the underlying quarterly results are the same in both versions, removing the detailed sentences doesn't change how well the slide supports the presentation",
    },
  ],
  [
    'MC-VISUAL-AIDS-SHOULD-CONTAIN-EVERYTHING-THE-SPEAKER-WILL-SAY, fresh adult example (a quarterly-results slide) rather than the existing generic 6-sentence slide example',
    'MC-A-GOOD-PRESENTATION-COVERS-AS-MUCH-INFORMATION-AS-POSSIBLE, fresh example (a fifteen-feature product launch) rather than the existing generic 12-points example',
    'MC-VISUAL-AIDS-SHOULD-CONTAIN-EVERYTHING-THE-SPEAKER-WILL-SAY, second fresh example (revising the quarterly-results slide) forming the ladder\'s third rung',
  ],
)

const CITATIONS_AND_REFERENCING_ADULT = adultLadder(
  'eng.writing.citations-and-referencing',
  'MC-A-ONLY-DIRECT-QUOTES-NEED-CITATION',
  'MC-B-CITING-A-SOURCE-MEANS-THE-INFORMATION-IS-AUTOMATICALLY-TRUE-OR-GOOD-EVIDENCE',
  [
    {
      stem: 'A business report states, in the writer\'s own words, "Roughly a third of customers abandon their shopping cart at checkout," a fact the writer read in an industry report but rephrased entirely. Since the wording was changed and it\'s not in quotation marks, does this sentence need a citation?',
      correct: 'Yes — citation is about whether the underlying fact or data came from a source, not whether the exact wording was quoted; paraphrasing a specific finding into different words still requires attributing where that fact came from',
      wrong: "No — since the sentence doesn't use the source's exact wording and isn't in quotation marks, no citation is needed, only direct quotes require attribution",
    },
    {
      stem: 'Two properly formatted citations support the same claim that a supplement is effective — one from a peer-reviewed clinical trial, one from a promotional article funded by the company that sells the supplement. Does the fact that both citations are correctly formatted tell us anything about which source is more trustworthy?',
      correct: "No — citation format only indicates where information came from; it says nothing about the source's reliability, which requires separately evaluating the author's expertise, potential bias, and whether the finding is confirmed elsewhere",
      wrong: 'Yes — since both sources are cited correctly in the proper format, both should be considered equally reliable evidence for the claim',
    },
    {
      stem: 'Revising a report, a writer adds a citation to a paraphrased statistic about checkout abandonment rates that had previously been left uncited, after realizing the specific number originated from a source the writer read rather than personal knowledge. Is adding this citation the correct fix?',
      correct: 'Yes — recognizing that a specific fact or statistic originated from a source, even when paraphrased into different words, and citing it accordingly is exactly the correct practice',
      wrong: "No — since the statistic is now phrased in the writer's own words rather than quoted directly, no citation is actually needed regardless of where the underlying number came from",
    },
  ],
  [
    'MC-A-ONLY-DIRECT-QUOTES-NEED-CITATION, fresh adult example (a checkout-abandonment statistic) rather than the existing renewable-energy example',
    'MC-B-CITING-A-SOURCE-MEANS-THE-INFORMATION-IS-AUTOMATICALLY-TRUE-OR-GOOD-EVIDENCE, fresh example (a supplement-effectiveness study) rather than the existing food-product example',
    'MC-A-ONLY-DIRECT-QUOTES-NEED-CITATION, second fresh example (revising the report to add a citation) forming the ladder\'s third rung',
  ],
)

const CREATIVE_WRITING_FORMS_ADULT = adultLadder(
  'eng.writing.creative-writing-forms',
  'MC-A-A-CREATIVE-FORM-LIKE-FLASH-FICTION-OR-FREE-VERSE-HAS-NO-RULES-OR-CONSTRAINTS',
  'MC-B-THE-SAME-CONTENT-AND-STRUCTURE-WORKS-EQUALLY-WELL-IN-ANY-CREATIVE-FORM',
  [
    {
      stem: 'A writer submits a 2,000-word piece to a flash fiction contest with a 500-word limit, believing "flash fiction" simply means any short story with no specific constraint. Does flash fiction actually have a real length constraint?',
      correct: 'Yes — flash fiction has a genuine, specific length constraint and demands extreme compression to achieve a complete narrative effect within that limit; treating it as free of any constraint misunderstands the form',
      wrong: 'No — "flash fiction" is simply a stylistic label with no actual rules or constraints, so a piece of any length can accurately be called flash fiction',
    },
    {
      stem: 'A writer tries to compress a full subplot involving four characters and multiple scene changes into a six-word micro-story format without cutting any of the original content. Can this much content fit into six words without genuinely adapting it to the form?',
      correct: 'No — six-word micro-fiction demands selecting a single, implied moment and cutting virtually everything else; the same content and structure that works in a longer story cannot simply be shrunk into a radically different form without real adaptation',
      wrong: 'Yes — since the underlying story content is the same, it should transfer into the six-word format without needing any cutting or restructuring, just written more briefly',
    },
    {
      stem: 'Revising the flash fiction submission, the writer cuts the piece down to 480 words, selecting one compressed moment that implies the surrounding story rather than narrating it fully. Has this revision correctly applied flash fiction\'s actual constraint?',
      correct: "Yes — cutting to fit within the form's genuine length limit while using compression and implication to convey a complete narrative effect is exactly the correct way to work within flash fiction's real constraints",
      wrong: 'No — since the story\'s core content is unchanged, cutting it down to fit a word count doesn\'t actually address whether the piece qualifies as genuine flash fiction',
    },
  ],
  [
    'MC-A-A-CREATIVE-FORM-LIKE-FLASH-FICTION-OR-FREE-VERSE-HAS-NO-RULES-OR-CONSTRAINTS, fresh adult example (a 2,000-word contest submission) rather than the existing generic several-pages example',
    'MC-B-THE-SAME-CONTENT-AND-STRUCTURE-WORKS-EQUALLY-WELL-IN-ANY-CREATIVE-FORM, fresh example (a six-word micro-story) rather than the existing 400-word flash fiction example',
    'MC-A-A-CREATIVE-FORM-LIKE-FLASH-FICTION-OR-FREE-VERSE-HAS-NO-RULES-OR-CONSTRAINTS, second fresh example (revising the contest submission) forming the ladder\'s third rung',
  ],
)

const ESSAY_STRUCTURE_ADULT = adultLadder(
  'eng.writing.essay-structure',
  'MC-THE-INTRODUCTION-JUST-ANNOUNCES-THE-TOPIC-THE-WAY-A-PARAGRAPHS-TOPIC-SENTENCE-DOES',
  'MC-THE-CONCLUSION-JUST-REPEATS-THE-INTRODUCTION-WORD-FOR-WORD',
  [
    {
      stem: 'An essay opens with "This essay will discuss remote work policies." Does this introduction tell the reader what the essay will argue, or just what it\'s about?',
      correct: 'Just what it\'s about — this is a topic announcement with no specific claim; a genuine introduction needs an arguable thesis, such as "remote work policies should prioritize output measurement over hours logged," that the essay body will develop and defend',
      wrong: "What the essay will argue — naming the general subject the essay covers is sufficient to establish the essay's thesis and direction",
    },
    {
      stem: 'An essay\'s conclusion restates its introduction\'s thesis in nearly identical wording, adding nothing about what the body paragraphs actually showed. Does this conclusion demonstrate that the essay\'s argument genuinely developed across its body?',
      correct: "No — a conclusion that just repeats the introduction word-for-word suggests the argument never moved; a genuine conclusion synthesizes the specific evidence the body actually presented and explains the argument's broader significance",
      wrong: "Yes — restating the thesis in the conclusion, in wording close to the introduction, is exactly what demonstrates the essay's argument has been consistently maintained throughout",
    },
    {
      stem: 'Revising the remote-work essay\'s opening to "Remote work policies should prioritize output measurement over hours logged, since the latter fails to capture actual productivity," a writer confirms this gives the reader something specific to agree or disagree with. Has this revision correctly moved from topic announcement to thesis?',
      correct: 'Yes — stating a specific, arguable position the essay will develop and defend, rather than simply naming the general subject, is exactly the correct distinction between a topic announcement and a genuine thesis',
      wrong: "No — since both versions are about the same general subject of remote work, rewording the topic announcement into a longer sentence doesn't actually change whether it counts as a thesis",
    },
  ],
  [
    'MC-THE-INTRODUCTION-JUST-ANNOUNCES-THE-TOPIC-THE-WAY-A-PARAGRAPHS-TOPIC-SENTENCE-DOES, fresh adult example (remote work policies) rather than the existing climate-change example',
    'MC-THE-CONCLUSION-JUST-REPEATS-THE-INTRODUCTION-WORD-FOR-WORD, fresh example (the remote-work essay\'s conclusion) rather than the existing generic thesis-restatement example',
    'MC-THE-INTRODUCTION-JUST-ANNOUNCES-THE-TOPIC-THE-WAY-A-PARAGRAPHS-TOPIC-SENTENCE-DOES, second fresh example (revising the remote-work opening) forming the ladder\'s third rung',
  ],
)

const REVISING_FOR_CONTENT_ADULT = adultLadder(
  'eng.writing.revising-for-content',
  'MC-REVISING-MEANS-FIXING-SURFACE-ERRORS-LIKE-SPELLING-AND-GRAMMAR',
  'MC-A-DRAFT-WITH-ENOUGH-WORDS-OR-PARAGRAPHS-DOESNT-NEED-CONTENT-REVISION',
  [
    {
      stem: 'Asked to "revise" a grant proposal, a writer spends the entire time correcting spelling and punctuation, leaving the proposal\'s confusing, poorly organized argument untouched. Has this writer actually revised the proposal for content?',
      correct: "No — revising for content means reconsidering big-picture questions like whether the argument is clear and the organization logical, not correcting spelling or grammar; a proposal with flawless spelling but confusing organization still has a bigger, unaddressed problem",
      wrong: 'Yes — correcting spelling, grammar, and punctuation errors is exactly what revising a draft means, regardless of whether the underlying argument or organization has any problems',
    },
    {
      stem: 'A report spans twelve pages and repeats the same core point across several sections with minimal new evidence each time. Does this report\'s length mean it doesn\'t need content revision?',
      correct: 'No — length and paragraph count don\'t measure content quality; this report has a real content problem (repetition without genuine development) that needs revision regardless of how long it is',
      wrong: 'Yes — since the report is already quite long and substantial, it has clearly been developed enough and doesn\'t need further content revision',
    },
    {
      stem: 'Revising the grant proposal, the writer reorganizes the argument for clarity and logical flow, leaving a few minor typos for a later editing pass. Is prioritizing the big-picture reorganization over the surface typos the correct order of operations?',
      correct: 'Yes — addressing argument clarity and organization is the actual work of content revision, while surface-level correction belongs to a later editing stage; this is exactly the correct order of priorities',
      wrong: 'No — the typos should have been fixed first, since revising a draft primarily means correcting surface-level spelling and grammar errors before anything else',
    },
  ],
  [
    'MC-REVISING-MEANS-FIXING-SURFACE-ERRORS-LIKE-SPELLING-AND-GRAMMAR, fresh adult example (a grant proposal) rather than the existing generic draft example',
    'MC-A-DRAFT-WITH-ENOUGH-WORDS-OR-PARAGRAPHS-DOESNT-NEED-CONTENT-REVISION, fresh example (a twelve-page repetitive report) rather than the existing generic long-draft example',
    'MC-REVISING-MEANS-FIXING-SURFACE-ERRORS-LIKE-SPELLING-AND-GRAMMAR, second fresh example (reordering the grant-proposal revision priorities) forming the ladder\'s third rung',
  ],
)

const THESIS_STATEMENTS_ADULT = adultLadder(
  'eng.writing.thesis-statements',
  'MC-A-THESIS-IS-JUST-THE-TOPIC-ANNOUNCEMENT',
  'MC-B-THESIS-JUST-NEEDS-TO-BE-AN-OPINION',
  [
    {
      stem: 'An essay opens with the sentence "This essay is about workplace flexibility policies." Does this sentence let a reader predict what position the essay will argue?',
      correct: 'No — this only announces the general topic with no claim attached; a genuine thesis, like "companies should offer flexible scheduling because it reduces turnover and requires no additional budget," makes a specific, checkable claim a reader could agree or disagree with',
      wrong: 'Yes — naming the subject an essay will cover is sufficient for a reader to know what position the essay will take on that subject',
    },
    {
      stem: 'A writer proposes the thesis "Remote work is bad," believing that since it states a clear opinion, it must be a valid thesis. Listing every possible body paragraph topic this thesis could require (productivity, isolation, cost savings, management challenges, work-life balance...), is this thesis appropriately scoped for a typical essay?',
      correct: 'No — this thesis is too broad; the list of possible supporting paragraphs sprawls unmanageably, meaning the claim needs to be narrowed with a specific reason or angle before it can be adequately supported within a normal essay\'s length',
      wrong: 'Yes — since "remote work is bad" is a clear, disagreeable opinion, having an opinion alone is sufficient to make it a valid, properly scoped thesis',
    },
    {
      stem: 'Revising "This essay is about workplace flexibility policies" into "Companies should offer flexible scheduling because it reduces turnover and requires no additional budget," a writer confirms the new version gives readers something specific to agree or disagree with. Has this revision correctly turned a topic announcement into a thesis?',
      correct: 'Yes — stating a specific, defensible claim with built-in reasons, rather than simply naming the subject, is exactly the correct transformation from topic announcement to genuine thesis',
      wrong: 'No — since both versions concern the same general subject of workplace flexibility, rewording the announcement into a longer sentence doesn\'t actually change whether it functions as a thesis',
    },
  ],
  [
    'MC-A-THESIS-IS-JUST-THE-TOPIC-ANNOUNCEMENT, fresh adult example (workplace flexibility policies) rather than the existing school-lunch-programs example',
    'MC-B-THESIS-JUST-NEEDS-TO-BE-AN-OPINION, fresh example ("remote work is bad") rather than the existing "social media is bad" example',
    'MC-A-THESIS-IS-JUST-THE-TOPIC-ANNOUNCEMENT, second fresh example (revising the workplace-flexibility opening) forming the ladder\'s third rung',
  ],
)

export const ENGLISH_ADULT_BAND_BATCH_21: SeedProbe[] = [
  ...READING_ACROSS_GENRES_ADULT,
  ...DEBATE_SKILLS_ADULT,
  ...PRESENTATION_SKILLS_ADULT,
  ...CITATIONS_AND_REFERENCING_ADULT,
  ...CREATIVE_WRITING_FORMS_ADULT,
  ...ESSAY_STRUCTURE_ADULT,
  ...REVISING_FOR_CONTENT_ADULT,
  ...THESIS_STATEMENTS_ADULT,
]
