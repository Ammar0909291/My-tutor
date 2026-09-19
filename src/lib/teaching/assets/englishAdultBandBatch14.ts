/**
 * ENGLISH ADULT-BAND PROBE-CONTRACT CAMPAIGN — Batch 14.
 *
 * ── THE GAP THIS CLOSES ─────────────────────────────────────────────────────
 * Batch 13 (2026-09-17) closed the first 8 of 16 `eng.composition.*`
 * concepts. This batch closes the remaining 8: logical-fallacies,
 * persuasive-techniques, plagiarism-and-citation-ethics,
 * research-paper-writing, rhetorical-analysis, rhetorical-appeals,
 * rhetorical-devices, style-voice-and-tone — completing `eng.composition.*`
 * entirely. 3 new ADULT-band closed-choice probes each (24 total), the bare
 * mastery-gate contract (`correctAtCheck >= 1` + `correctAtPractice >= 2` =
 * 3, `assetContract.ts`). Remaining gap after this batch: 83 pairs across
 * `eng.communication.*` (11), `eng.linguistics.*` (16), `eng.literature.*`
 * (16 advanced), `eng.phonetics.*` (12 advanced), `eng.vocab.*` (9
 * advanced), `eng.writing.*` (9 advanced), `eng.reading.reading-across-
 * genres`, `eng.speaking.debate-skills`/`presentation-skills`, deferred to
 * future batches per this campaign's own one-bounded-batch-per-turn
 * discipline (see `docs/history/subject-onboarding-and-fix-campaign.md`).
 *
 * Every distractor carries the `misconceptionId` naming it, reusing ONE of
 * each concept's own two ALREADY-REGISTERED, ALREADY-ACTIVE misconceptions
 * (verified against each concept's Blueprint Component 1 — Misconception
 * Register: every one of these 8 concepts holds exactly MC-A and MC-B — no
 * more, no fewer; no new misconception ids invented, no Educational Brain
 * authoring). Structure mirrors `englishAdultBandBatch13.ts`'s `adultLadder`
 * helper exactly: `mcq`(FOUNDATIONAL) + `misconception_probe`(DEVELOPING) +
 * `mcq`(PROFICIENT) per concept, so the ladder-aware slug resolver
 * (`buildProbeSlugResolver`) disambiguates the two `mcq` rungs by difficulty
 * without re-identifying any already-serving row. None of these 8 concepts
 * hold any existing ADULT probe today, so this is a fresh singleton-to-
 * ladder promotion within this batch only — no P-10 collision risk against
 * any pre-existing row.
 *
 * Register: adult/academic framing throughout, matching the age these
 * composition/rhetoric concepts are naturally taught at — never
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

const LOGICAL_FALLACIES_ADULT = adultLadder(
  'eng.composition.logical-fallacies',
  'MC-A-IF-AN-ARGUMENTS-CONCLUSION-IS-TRUE-OR-AGREEABLE-THE-ARGUMENT-CANT-BE-FALLACIOUS',
  'MC-B-EVERY-STRONG-DISAGREEMENT-OR-CRITICISM-OF-A-PERSON-IS-AN-AD-HOMINEM-FALLACY',
  [
    {
      stem: 'A colleague argues "We should cut the marketing budget, because the person who proposed keeping it just wants to protect their own department\'s headcount." The cut later turns out to be the right call, trimming real waste. Does the argument\'s later-correct outcome mean the reasoning used to reach it was sound?',
      correct: "No — the conclusion happening to be right doesn't make the reasoning valid; attacking the proposer's motives (an ad hominem) never actually assessed whether keeping the budget was wasteful",
      wrong: 'Yes — once a recommendation turns out to be correct, the argument that produced it must have been logically sound',
    },
    {
      stem: 'In a debate over a proposed merger, an analyst says "we should discount this consultant\'s rosy projection — she is paid a contingency fee by the acquiring company only if the deal closes." Is this a personal attack unrelated to the merger\'s merits, or a legitimate reason for caution?',
      correct: "A legitimate reason for caution — a direct financial stake in the outcome is a relevant conflict of interest for evaluating this specific projection, not an irrelevant personal jab",
      wrong: 'A personal attack — any comment about who is paying someone is, by definition, attacking the person rather than addressing the argument',
    },
    {
      stem: 'A council member argues "This zoning proposal must be flawed, because the developer who supports it has been fined for building-code violations before." Evaluated independently, the proposal does turn out to violate several safety codes. Was the council member\'s original argument fallacy-free just because the conclusion holds up?',
      correct: "No — the argument itself was still a fallacious ad hominem, attacking the developer's history rather than examining the proposal's contents; the real violations found later are separate evidence, not a retroactive rescue of the original flawed reasoning",
      wrong: "Yes — since the proposal did turn out to violate codes, the original objection based on the developer's fine history was valid reasoning all along",
    },
  ],
  [
    'MC-A-IF-AN-ARGUMENTS-CONCLUSION-IS-TRUE-OR-AGREEABLE-THE-ARGUMENT-CANT-BE-FALLACIOUS, fresh adult example (a marketing-budget cut) rather than the existing exercise/out-of-shape example',
    'MC-B-EVERY-STRONG-DISAGREEMENT-OR-CRITICISM-OF-A-PERSON-IS-AN-AD-HOMINEM-FALLACY, fresh example (a merger consultant\'s contingency fee) rather than the existing medical-treatment-funding example',
    'MC-A-IF-AN-ARGUMENTS-CONCLUSION-IS-TRUE-OR-AGREEABLE-THE-ARGUMENT-CANT-BE-FALLACIOUS, second fresh example (a zoning-proposal objection) forming the ladder\'s third rung',
  ],
)

const PERSUASIVE_TECHNIQUES_ADULT = adultLadder(
  'eng.composition.persuasive-techniques',
  'MC-A-SOPHISTICATED-PERSUASION-MEANS-INCLUDING-EVERY-TECHNIQUE-SEPARATELY-IN-ITS-OWN-SECTION',
  'MC-B-A-COUNTERARGUMENT-SHOULD-ALWAYS-GO-AT-THE-VERY-END-REGARDLESS-OF-THE-ARGUMENTS-STRUCTURE',
  [
    {
      stem: 'A fundraising letter has one self-contained paragraph on the charity\'s audited financial efficiency (logos), a separate paragraph on the founder\'s twenty years of field experience (ethos), and a separate paragraph with a single donor\'s personal story (pathos), with no connection between them. Is stacking one paragraph per technique the mark of sophisticated persuasion?',
      correct: "No — the techniques sit side by side without reinforcing each other; sophisticated persuasion would use the donor's story alongside the efficiency data to support the same specific point about impact",
      wrong: 'Yes — covering ethos, pathos, and logos in their own dedicated paragraphs demonstrates a complete, sophisticated persuasive structure',
    },
    {
      stem: 'A proposal for new bike lanes addresses the objection "this will slow down car traffic" in its opening paragraph, immediately after stating the request, before presenting any supporting data. Is addressing the objection this early a structural mistake?',
      correct: 'No — clearing the most obvious objection early, before building the rest of the case, can be the more strategically effective placement; there is no fixed rule that a counterargument must come last',
      wrong: 'Yes — a counterargument-and-rebuttal must always appear at the very end of a persuasive piece, regardless of what would serve that specific argument\'s structure best',
    },
    {
      stem: 'Revising a product-launch pitch, a writer merges three separate sections — a customer-satisfaction statistic, a specific customer\'s story, and a note on the company\'s reliability record — into one paragraph where the statistic sets up the story and the reliability record closes it. Compared to the original three-section version, has this revision moved toward sophisticated persuasion?',
      correct: 'Yes — weaving the appeals together so each reinforces the same specific point is what sophisticated persuasion does, rather than presenting each technique in its own isolated compartment',
      wrong: 'No — splitting appeals into their own clearly labeled sections is always the more sophisticated, organized approach, so merging them is a step backward',
    },
  ],
  [
    'MC-A-SOPHISTICATED-PERSUASION-MEANS-INCLUDING-EVERY-TECHNIQUE-SEPARATELY-IN-ITS-OWN-SECTION, fresh adult example (a fundraising letter) rather than the existing generic ethos/pathos/logos passage',
    'MC-B-A-COUNTERARGUMENT-SHOULD-ALWAYS-GO-AT-THE-VERY-END-REGARDLESS-OF-THE-ARGUMENTS-STRUCTURE, fresh example (a bike-lane proposal) rather than the existing lawyer\'s-closing-statement analogy',
    'MC-A-SOPHISTICATED-PERSUASION-MEANS-INCLUDING-EVERY-TECHNIQUE-SEPARATELY-IN-ITS-OWN-SECTION, second fresh example (a product-launch pitch revision) forming the ladder\'s third rung',
  ],
)

const PLAGIARISM_AND_CITATION_ETHICS_ADULT = adultLadder(
  'eng.composition.plagiarism-and-citation-ethics',
  'MC-A-PLAGIARISM-IS-JUST-A-TECHNICAL-FORMATTING-RULE-NOT-A-REAL-ETHICAL-ISSUE',
  'MC-B-ANY-CITATION-MISTAKE-EVEN-A-MINOR-FORMATTING-ERROR-IS-EQUALLY-SERIOUS-AS-DELIBERATE-PLAGIARISM',
  [
    {
      stem: 'A freelance consultant submits a client report copying three pages, nearly word-for-word, from a competitor\'s publicly posted whitepaper, presenting the analysis as their own original work. Is this fundamentally a formatting oversight, or an ethical violation?',
      correct: "An ethical violation — presenting someone else's analysis as your own original work misrepresents authorship, regardless of whether any citation formatting was involved at all",
      wrong: 'A formatting oversight — since the content itself may be accurate, the real problem is just that a citation was never added, a technical step rather than an ethical one',
    },
    {
      stem: 'One writer copies two paragraphs from a report with no citation at all and presents them as their own. A second writer paraphrases a source in their own words, genuinely cites it, but lists the wrong publication year by mistake. Should these two be treated as equally serious violations?',
      correct: "No — the second case is an honest attempt at attribution with a minor factual slip; the first case is a genuine misrepresentation of authorship with no attempt at credit at all, a different kind of problem, not just a bigger version of the same mistake",
      wrong: 'Yes — any inaccuracy in how a source is cited is equally serious, since both cases involve using the source\'s information without a perfectly correct citation',
    },
    {
      stem: 'A student claims that quoting three sentences from an article and citing it correctly is basically the same ethical issue as failing to cite anything at all, "since both involve using someone else\'s words." Is this framing accurate?',
      correct: "No — a correctly cited quotation is honest attribution, not plagiarism at all; plagiarism is specifically about misrepresenting someone else's work as your own, which a proper citation directly prevents",
      wrong: "Yes — using someone else's exact words is the entire definition of plagiarism, so whether or not a citation is present doesn't change the ethical status of the act",
    },
  ],
  [
    'MC-A-PLAGIARISM-IS-JUST-A-TECHNICAL-FORMATTING-RULE-NOT-A-REAL-ETHICAL-ISSUE, fresh adult example (a freelance consultant\'s client report) rather than the existing business-meeting-idea-credit example',
    'MC-B-ANY-CITATION-MISTAKE-EVEN-A-MINOR-FORMATTING-ERROR-IS-EQUALLY-SERIOUS-AS-DELIBERATE-PLAGIARISM, fresh example (a wrong publication year vs. two uncited paragraphs) rather than the existing missing-page-number example',
    'MC-A-PLAGIARISM-IS-JUST-A-TECHNICAL-FORMATTING-RULE-NOT-A-REAL-ETHICAL-ISSUE, second fresh example (a correctly cited quotation) forming the ladder\'s third rung',
  ],
)

const RESEARCH_PAPER_WRITING_ADULT = adultLadder(
  'eng.composition.research-paper-writing',
  'MC-A-A-RESEARCH-PAPER-IS-A-SEQUENCE-OF-SOURCE-SUMMARIES',
  'MC-B-SYNTHESIZING-SOURCES-MEANS-ONLY-USING-SOURCES-THAT-AGREE',
  [
    {
      stem: 'A paper on remote-work productivity has paragraph 1 fully summarizing Study A, paragraph 2 fully summarizing Study B, paragraph 3 fully summarizing Study C, with no paragraph directly comparing or combining their findings. Is this paper making its own argument?',
      correct: "No — this is source-by-source reporting; the paper never combines the studies to build its own point, it just reports what each one found in turn",
      wrong: 'Yes — thoroughly and accurately summarizing each source in turn is what it means to make an argument grounded in research',
    },
    {
      stem: 'Researching whether four-day work weeks improve productivity, a writer finds one large study showing no measurable change and chooses not to cite it, keeping only the three studies that found improvement. Does omitting the contradicting study strengthen the paper\'s argument?',
      correct: "No — omitting a genuine complicating finding makes the argument fragile rather than strong; the paper should address the contradicting study directly, either explaining the discrepancy or refining its claim to account for it",
      wrong: 'Yes — a research paper is stronger when it only cites sources supporting its thesis, since including a contradicting study would undermine the argument',
    },
    {
      stem: 'Revising a paper on urban green-space access, a writer reorganizes from "Study A found X. Study B found Y. Study C found Z." into sections titled "The health-outcome evidence" and "The equity-of-access evidence," each pulling relevant findings from whichever studies are relevant to that specific point. Has this revision improved the paper\'s argument structure?',
      correct: 'Yes — organizing by idea instead of by source lets the paper build its own argument, drawing on whichever sources are relevant to each specific point rather than reporting each source in isolation',
      wrong: 'No — since the same factual content from the same three studies is present either way, reorganizing from source-based to idea-based structure has no real effect on the paper\'s argument',
    },
  ],
  [
    'MC-A-A-RESEARCH-PAPER-IS-A-SEQUENCE-OF-SOURCE-SUMMARIES, fresh adult example (remote-work productivity studies) rather than the existing screen-time-and-adolescent-sleep example',
    'MC-B-SYNTHESIZING-SOURCES-MEANS-ONLY-USING-SOURCES-THAT-AGREE, fresh example (a four-day-work-week study) rather than the existing screen-time example',
    'MC-A-A-RESEARCH-PAPER-IS-A-SEQUENCE-OF-SOURCE-SUMMARIES, second fresh example (an urban green-space-access paper reorganized by idea) forming the ladder\'s third rung',
  ],
)

const RHETORICAL_ANALYSIS_ADULT = adultLadder(
  'eng.composition.rhetorical-analysis',
  'MC-A-RHETORICAL-ANALYSIS-MEANS-LISTING-EVERY-DEVICE-FOUND',
  'MC-B-EVALUATING-EFFECTIVENESS-MEANS-STATING-WHETHER-YOU-AGREE-WITH-THE-ARGUMENT',
  [
    {
      stem: 'An analysis of a CEO\'s product-launch keynote reads: "This keynote uses ethos, then a statistic, then an anecdote, then a rhetorical question." Nothing further is said about how these choices relate to each other. Is this a complete rhetorical analysis?',
      correct: "No — this is an inventory of devices present, not an analysis of how they combine to build the keynote's overall persuasive effect on its audience",
      wrong: 'Yes — once every rhetorical device present in the keynote has been correctly identified and named, the analysis is complete',
    },
    {
      stem: 'Asked to evaluate an op-ed arguing for a tax policy she personally opposes, a writer concludes "this argument is ineffective because I don\'t agree with raising taxes." Is disagreeing with the op-ed\'s position the same as evaluating its rhetorical effectiveness?',
      correct: "No — rhetorical effectiveness asks whether the strategy is likely to persuade its intended audience, a separate question from whether the analyst personally agrees with the conclusion; a text can be rhetorically strong even when its reader disagrees with it",
      wrong: 'Yes — if an argument fails to convince a specific reader of its conclusion, that reader\'s disagreement is itself proof the argument is rhetorically ineffective',
    },
    {
      stem: 'Revising a five-device inventory of a charity\'s fundraising speech into a paragraph explaining how the opening statistic establishes urgency, which the following personal story then makes emotionally concrete, building toward the closing direct appeal — has this revision strengthened the rhetorical analysis?',
      correct: 'Yes — explaining how each device sets up the next, building toward one cumulative effect, is what turns a list of identified devices into an actual analysis',
      wrong: 'No — since the same five devices are still being discussed either way, connecting them with explanatory sentences doesn\'t change how complete the analysis is',
    },
  ],
  [
    'MC-A-RHETORICAL-ANALYSIS-MEANS-LISTING-EVERY-DEVICE-FOUND, fresh adult example (a CEO product-launch keynote) rather than the existing generic five-device speech',
    'MC-B-EVALUATING-EFFECTIVENESS-MEANS-STATING-WHETHER-YOU-AGREE-WITH-THE-ARGUMENT, fresh example (a tax-policy op-ed) rather than the existing school-uniforms example',
    'MC-A-RHETORICAL-ANALYSIS-MEANS-LISTING-EVERY-DEVICE-FOUND, second fresh example (a charity fundraising speech revision) forming the ladder\'s third rung',
  ],
)

const RHETORICAL_APPEALS_ADULT = adultLadder(
  'eng.composition.rhetorical-appeals',
  'MC-A-PATHOS-MEANS-JUST-BEING-EMOTIONAL-OR-DRAMATIC',
  'MC-B-LOGOS-MEANS-JUST-USING-NUMBERS-OR-STATISTICS',
  [
    {
      stem: 'A proposal to expand workplace mental-health benefits opens with a paragraph about "how difficult modern life can be for everyone," with no connection to the specific benefits being proposed, before moving on to the actual request. Is this an effective use of pathos?',
      correct: "No — the emotional language floats free of the specific claim; effective pathos would connect a real feeling directly to why these specific benefits matter, not a generic statement about life being hard",
      wrong: 'Yes — including emotionally resonant language anywhere in a proposal is what pathos means, regardless of whether it connects to the specific request being made',
    },
    {
      stem: 'A proposal for a new crosswalk cites "nationally, thousands of pedestrian injuries occur every year," a true but very broad statistic, without addressing the specific intersection at all. Does citing this true statistic make the proposal\'s reasoning logically strong?',
      correct: "No — a number not connected by explicit reasoning to the specific claim isn't doing logical work; a genuinely strong logos argument would use a statistic actually about this location, reasoned directly to the proposal",
      wrong: 'Yes — including any true statistic automatically makes an argument\'s reasoning logical, regardless of whether that statistic is actually about the specific case being argued',
    },
    {
      stem: 'Revising the mental-health-benefits proposal, a writer replaces the generic "life is hard" opening with a specific, anonymized account of an employee who returned to full productivity after using a benefit the company already offers in a pilot program, directly tied to why expanding it would help others. Has this revision improved the use of pathos?',
      correct: 'Yes — the emotion is now tied to a specific case that directly supports the specific claim being argued, rather than floating as generic, unconnected emotional language',
      wrong: 'No — since both versions use emotional content about workplace mental health, replacing the generic opening with a specific anecdote does not change how well pathos is being used',
    },
  ],
  [
    'MC-A-PATHOS-MEANS-JUST-BEING-EMOTIONAL-OR-DRAMATIC, fresh adult example (a workplace mental-health-benefits proposal) rather than the existing school-funding-cuts example',
    'MC-B-LOGOS-MEANS-JUST-USING-NUMBERS-OR-STATISTICS, fresh example (a crosswalk proposal) rather than the existing park/green-space example',
    'MC-A-PATHOS-MEANS-JUST-BEING-EMOTIONAL-OR-DRAMATIC, second fresh example (the same proposal revised with a specific anecdote) forming the ladder\'s third rung',
  ],
)

const RHETORICAL_DEVICES_ADULT = adultLadder(
  'eng.composition.rhetorical-devices',
  'MC-A-NAMING-THE-DEVICE-IS-THE-SAME-AS-EXPLAINING-ITS-EFFECT',
  'MC-B-ANY-REPEATED-WORD-OR-BALANCED-PHRASE-IS-AUTOMATICALLY-A-DELIBERATE-DEVICE',
  [
    {
      stem: 'An analysis of a commencement address states only: "This passage uses parallelism." Nothing else is said. Does this tell the reader anything about why the speaker chose this technique?',
      correct: "No — naming the device only identifies what tool was used, not what effect it produces in this specific passage; the analysis still needs to explain what that parallelism does here",
      wrong: 'Yes — correctly identifying a rhetorical device by name is itself a complete piece of rhetorical analysis',
    },
    {
      stem: 'A staff memo happens to use the word "and" eleven times across one page, simply because listing several unrelated tasks requires it. Is this repetition of "and" a deliberate rhetorical device?',
      correct: "No — this is ordinary background repetition that any list of items in a sentence naturally produces; a deliberate device would be a noticeable, structurally placed repetition tied to meaning, not an unavoidable small connecting word",
      wrong: 'Yes — any word that appears multiple times in the same piece of writing counts as a deliberate rhetorical device, regardless of what the word is or why it repeats',
    },
    {
      stem: 'Revising an analysis of a gala speech\'s antithesis ("not what this fund has taken from hardship, but what it has given back to it") from "this uses antithesis" to "this antithesis reframes the fund\'s role from a passive record of hardship to an active source of relief, right before the closing donation appeal" — has this revision completed the analysis?',
      correct: 'Yes — the revised version explains the specific effect the device produces in this passage, completing the second half of the analytical task that naming alone leaves undone',
      wrong: 'No — since the device identified (antithesis) is the same in both versions, adding a sentence about its effect doesn\'t change how complete the analysis is',
    },
  ],
  [
    'MC-A-NAMING-THE-DEVICE-IS-THE-SAME-AS-EXPLAINING-ITS-EFFECT, fresh adult example (a commencement-address parallelism) rather than the existing "we will..." repetition example',
    'MC-B-ANY-REPEATED-WORD-OR-BALANCED-PHRASE-IS-AUTOMATICALLY-A-DELIBERATE-DEVICE, fresh example (a memo\'s ordinary "and" repetition) rather than the existing "the" example',
    'MC-A-NAMING-THE-DEVICE-IS-THE-SAME-AS-EXPLAINING-ITS-EFFECT, second fresh example (a gala speech\'s antithesis) forming the ladder\'s third rung',
  ],
)

const STYLE_VOICE_AND_TONE_ADULT = adultLadder(
  'eng.composition.style-voice-and-tone',
  'MC-A-STYLE-IS-JUST-USING-FANCY-OR-COMPLICATED-VOCABULARY',
  'MC-B-A-WRITERS-STYLE-SHOULD-STAY-EXACTLY-THE-SAME-ACROSS-EVERY-PIECE-THEY-WRITE',
  [
    {
      stem: 'Revising a project status update, a writer changes "We finished the task" to "We successfully actualized the completion of the aforementioned deliverable," believing the more elaborate phrasing gives the update a stronger style. Does the revision improve the update\'s style?',
      correct: "No — the elaborate phrasing obscures a simple fact behind unnecessary vocabulary; a stronger style here would be precise and clear, not more complicated",
      wrong: 'Yes — replacing simple wording with more elaborate, sophisticated-sounding vocabulary always strengthens a piece of writing\'s style',
    },
    {
      stem: 'An essayist known for a witty, informal newsletter voice insists on keeping identical joking asides and casual phrasing in a formal grant application, arguing that changing anything would be "betraying my real voice." Is this the right way to think about maintaining a consistent style?',
      correct: "No — a skilled writer's core habits (precise word choice, a characteristic way of noticing detail) can stay recognizable while surface choices like formality and humor flex for a different purpose and audience; refusing to adjust at all isn't loyalty to voice, it's ignoring the task",
      wrong: "Yes — a writer's true style must remain completely identical in every piece they write, regardless of purpose or audience, or it isn't a genuine personal style",
    },
    {
      stem: 'Comparing two drafts of a conference bio, a writer prefers "a leading innovator synergizing cross-disciplinary paradigms" over "a researcher connecting ideas across engineering and biology," believing the first version has more style because its words sound more impressive. Is this preference well-founded?',
      correct: 'No — the plainer version communicates the actual claim clearly and precisely, while the first buries a simple point under vague, inflated vocabulary; precise, well-chosen words create stronger style than merely impressive-sounding ones',
      wrong: 'Yes — between two descriptions of the same person, the one using more sophisticated-sounding vocabulary always demonstrates the stronger writing style',
    },
  ],
  [
    'MC-A-STYLE-IS-JUST-USING-FANCY-OR-COMPLICATED-VOCABULARY, fresh adult example (a project status update) rather than the existing dog/field passage',
    'MC-B-A-WRITERS-STYLE-SHOULD-STAY-EXACTLY-THE-SAME-ACROSS-EVERY-PIECE-THEY-WRITE, fresh example (a newsletter essayist vs. a grant application) rather than the existing blog-post/lab-report example',
    'MC-A-STYLE-IS-JUST-USING-FANCY-OR-COMPLICATED-VOCABULARY, second fresh example (two conference-bio drafts) forming the ladder\'s third rung',
  ],
)

export const ENGLISH_ADULT_BAND_BATCH_14: SeedProbe[] = [
  ...LOGICAL_FALLACIES_ADULT,
  ...PERSUASIVE_TECHNIQUES_ADULT,
  ...PLAGIARISM_AND_CITATION_ETHICS_ADULT,
  ...RESEARCH_PAPER_WRITING_ADULT,
  ...RHETORICAL_ANALYSIS_ADULT,
  ...RHETORICAL_APPEALS_ADULT,
  ...RHETORICAL_DEVICES_ADULT,
  ...STYLE_VOICE_AND_TONE_ADULT,
]
