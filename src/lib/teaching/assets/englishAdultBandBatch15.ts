/**
 * ENGLISH ADULT-BAND PROBE-CONTRACT CAMPAIGN — Batch 15.
 *
 * ── THE GAP THIS CLOSES ─────────────────────────────────────────────────────
 * Batches 13-14 (2026-09-17) closed all 16 `eng.composition.*` concepts.
 * This batch closes all 11 short `eng.composition.*`-adjacent
 * `eng.communication.*` concepts (`digital-communication` was already at
 * contract, so it is not touched here): academic-writing-advanced,
 * business-writing, cross-cultural-communication, discourse-markers-
 * advanced, editing-for-publication, media-literacy, negotiation-language,
 * presentation-design, professional-communication, research-methodology-
 * writing, technical-writing. 3 new ADULT-band closed-choice probes each
 * (33 total), the bare mastery-gate contract (`correctAtCheck >= 1` +
 * `correctAtPractice >= 2` = 3, `assetContract.ts`). Remaining gap after
 * this batch: 72 pairs across `eng.linguistics.*` (16), `eng.literature.*`
 * (16 advanced), `eng.phonetics.*` (12 advanced), `eng.vocab.*` (9
 * advanced), `eng.writing.*` (9 advanced), `eng.reading.reading-across-
 * genres`, `eng.speaking.debate-skills`/`presentation-skills`, and the 2
 * EARLY-band phonics pairs excluded per Batch 13's own finding (voice-
 * required), deferred to future batches per this campaign's own
 * one-bounded-batch-per-turn discipline (see
 * `docs/history/subject-onboarding-and-fix-campaign.md`).
 *
 * Every distractor carries the `misconceptionId` naming it, reusing ONE of
 * each concept's own two ALREADY-REGISTERED, ALREADY-ACTIVE misconceptions
 * (verified against each concept's Blueprint Component 1 — Misconception
 * Register: every one of these 11 concepts holds exactly MC-A and MC-B — no
 * more, no fewer; no new misconception ids invented, no Educational Brain
 * authoring). Structure mirrors `englishAdultBandBatch13.ts`'s `adultLadder`
 * helper exactly: `mcq`(FOUNDATIONAL) + `misconception_probe`(DEVELOPING) +
 * `mcq`(PROFICIENT) per concept, so the ladder-aware slug resolver
 * (`buildProbeSlugResolver`) disambiguates the two `mcq` rungs by difficulty
 * without re-identifying any already-serving row. None of these 11 concepts
 * hold any existing ADULT probe today, so this is a fresh singleton-to-
 * ladder promotion within this batch only — no P-10 collision risk against
 * any pre-existing row.
 *
 * Register: adult/professional/academic framing throughout, matching the
 * age these workplace-communication and advanced-academic concepts are
 * naturally taught at — never child-directed examples. Every worked example
 * below is deliberately DIFFERENT from the Blueprint's own Conflict
 * Evidence / Discrimination Pairs examples, so a learner who has met the
 * explanation is not simply asked to recall the identical example.
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

const ACADEMIC_WRITING_ADVANCED_ADULT = adultLadder(
  'eng.communication.academic-writing-advanced',
  'MC-A-ADVANCED-ACADEMIC-WRITING-MEANS-IGNORING-WHAT-OTHERS-HAVE-ALREADY-SAID',
  'MC-B-A-LONGER-MORE-COMPLEX-SOUNDING-PIECE-IS-AUTOMATICALLY-MORE-SOPHISTICATED',
  [
    {
      stem: 'A student begins a thesis chapter: "This chapter argues that municipal tree-canopy loss is the primary driver of neighborhood-level heat disparities." No prior scholarship is mentioned anywhere in the opening. Does opening this way show awareness that this question has already been studied by others?',
      correct: 'No — the opening reads as if the claim is the first consideration of the question, with no acknowledgment of how it relates to existing research on urban heat drivers',
      wrong: 'Yes — stating a clear, confident claim at the very start is itself evidence of scholarly sophistication, regardless of whether prior research is mentioned',
    },
    {
      stem: 'Revising a literature-review paragraph on vaccine hesitancy, a student takes a two-sentence point and expands it into five sentences using more complex clause structures, without adding any new evidence, source, or nuance. Does the longer, more complex version represent more sophisticated analysis?',
      correct: "No — restating the same point in more complicated sentence structures isn't genuine depth; sophistication comes from adding a new piece of evidence, a nuance, or a complication, not from inflating the same content",
      wrong: 'Yes — a longer paragraph using more complex sentence structures is inherently more sophisticated than a shorter one making the same point',
    },
    {
      stem: 'Revising the thesis-chapter opening to read "While prior work has attributed neighborhood heat disparities primarily to impervious surface coverage, this chapter argues tree-canopy loss plays a larger, previously underweighted role" — has this revision moved the writing toward advanced academic style?',
      correct: 'Yes — the revision situates the claim relative to existing scholarship, showing the argument is a contribution to an ongoing conversation rather than starting from nothing',
      wrong: "No — since the underlying claim about tree-canopy loss is unchanged, adding a reference to prior work doesn't affect how advanced the writing is",
    },
  ],
  [
    'MC-A-ADVANCED-ACADEMIC-WRITING-MEANS-IGNORING-WHAT-OTHERS-HAVE-ALREADY-SAID, fresh adult example (an urban-heat-island thesis chapter) rather than the existing social-media/wellbeing example',
    'MC-B-A-LONGER-MORE-COMPLEX-SOUNDING-PIECE-IS-AUTOMATICALLY-MORE-SOPHISTICATED, fresh example (a vaccine-hesitancy literature-review paragraph) rather than the existing generic padded-paragraph example',
    'MC-A-ADVANCED-ACADEMIC-WRITING-MEANS-IGNORING-WHAT-OTHERS-HAVE-ALREADY-SAID, second fresh example (the same thesis chapter revised) forming the ladder\'s third rung',
  ],
)

const BUSINESS_WRITING_ADULT = adultLadder(
  'eng.communication.business-writing',
  'MC-A-BUSINESS-WRITING-SHOULD-BUILD-UP-TO-THE-MAIN-POINT-LIKE-AN-ACADEMIC-ESSAY',
  'MC-B-A-BUSINESS-DOCUMENT-JUST-NEEDS-TO-CONTAIN-THE-RIGHT-INFORMATION-FORMATTING-DOESNT-MATTER',
  [
    {
      stem: 'An email to a client opens with three sentences of background on the project\'s history before finally asking, in the fourth sentence, for an extended payment deadline. Is building up to the actual request across several sentences the right approach for this email?',
      correct: 'No — a business reader needs the actual request stated immediately, with supporting context after it, not buried behind several sentences of background',
      wrong: 'Yes — providing context before the request mirrors the academic-essay convention of building up to a thesis, which is the appropriate structure for professional writing too',
    },
    {
      stem: 'A project-status update lists three distinct risks (budget, timeline, staffing) woven together in one dense paragraph, with all the correct information present but no bullets or headers separating the three risks. Does the accuracy of the content mean the formatting choice doesn\'t matter?',
      correct: "No — even with completely accurate content, a reader skimming a dense paragraph is far less likely to register all three distinct risks than if they were separated as a short list; formatting affects whether the information is actually usable",
      wrong: 'Yes — since all three risks are technically present and correctly described, how they are visually arranged on the page has no real effect on the update\'s effectiveness',
    },
    {
      stem: 'Revising a vendor email, a writer moves the payment-deadline request from the fourth sentence to the first, followed by the background context. Has this revision improved the email for a business reader?',
      correct: 'Yes — leading with the actual request lets a busy reader immediately understand what\'s being asked, with the supporting context available right after for anyone who needs it',
      wrong: "No — since the same information is present in both versions, moving the request to the front doesn't change how effective the email is",
    },
  ],
  [
    'MC-A-BUSINESS-WRITING-SHOULD-BUILD-UP-TO-THE-MAIN-POINT-LIKE-AN-ACADEMIC-ESSAY, fresh adult example (a client payment-deadline email) rather than the existing manager schedule-change example',
    'MC-B-A-BUSINESS-DOCUMENT-JUST-NEEDS-TO-CONTAIN-THE-RIGHT-INFORMATION-FORMATTING-DOESNT-MATTER, fresh example (a three-risk status update) rather than the existing meeting-action-items example',
    'MC-A-BUSINESS-WRITING-SHOULD-BUILD-UP-TO-THE-MAIN-POINT-LIKE-AN-ACADEMIC-ESSAY, second fresh example (the vendor email revised) forming the ladder\'s third rung',
  ],
)

const CROSS_CULTURAL_COMMUNICATION_ADULT = adultLadder(
  'eng.communication.cross-cultural-communication',
  'MC-A-MY-OWN-CULTURES-COMMUNICATION-NORMS-ARE-THE-UNIVERSAL-DEFAULT-AND-CORRECT-WAY',
  'MC-B-AN-ENTIRE-CULTURE-HAS-ONE-SINGLE-UNIFORM-COMMUNICATION-STYLE-WITH-NO-INTERNAL-VARIATION',
  [
    {
      stem: 'An employee describes a colleague\'s habit of waiting for a clear pause before speaking in meetings as "less confident" or "less engaged" than the employee\'s own habit of jumping in mid-sentence to add a point. Is one of these turn-taking styles objectively more correct?',
      correct: "No — both are different, internally consistent conventions for managing turn-taking in conversation; treating one's own habit as the correct default and the other as a deficiency is exactly the ethnocentric assumption to avoid",
      wrong: 'Yes — jumping in to add a point shows more genuine engagement, so waiting for a clear pause is objectively a weaker communication habit',
    },
    {
      stem: 'After learning that direct, immediate turn-taking isn\'t a universal default, a student concludes that "people from that country always wait for a clear pause before speaking, without exception." Is this conclusion an improvement over assuming one\'s own norm is universal?',
      correct: "No — this replaces one stereotype (my norm is the default) with another (their whole culture shares one uniform style); real communication norms vary by region, generation, and individual within any cultural group",
      wrong: 'Yes — once a student learns the general tendency of a specific culture, applying that tendency uniformly to everyone from that culture is the correct, culturally sensitive approach',
    },
    {
      stem: 'Two colleagues, both raised in the same country, run meetings very differently — one waits for pauses, one jumps in — and a new employee assumes the second colleague\'s directness is simply "more correct for that culture" rather than a personal or regional variation within the same broad culture. Is this framing accurate?',
      correct: 'No — treating one colleague\'s individual style as the universally correct default, even when both colleagues share a nationality, is the same ethnocentric error, just applied at a smaller scale',
      wrong: 'Yes — when two people share the same nationality, whichever one communicates more directly represents the objectively correct default for that culture',
    },
  ],
  [
    'MC-A-MY-OWN-CULTURES-COMMUNICATION-NORMS-ARE-THE-UNIVERSAL-DEFAULT-AND-CORRECT-WAY, fresh adult example (meeting turn-taking) rather than the existing feedback-directness example',
    'MC-B-AN-ENTIRE-CULTURE-HAS-ONE-SINGLE-UNIFORM-COMMUNICATION-STYLE-WITH-NO-INTERNAL-VARIATION, fresh example (over-generalizing a turn-taking tendency) rather than the existing generic two-individuals example',
    'MC-A-MY-OWN-CULTURES-COMMUNICATION-NORMS-ARE-THE-UNIVERSAL-DEFAULT-AND-CORRECT-WAY, second fresh example (two colleagues sharing a nationality) forming the ladder\'s third rung',
  ],
)

const DISCOURSE_MARKERS_ADVANCED_ADULT = adultLadder(
  'eng.communication.discourse-markers-advanced',
  'MC-A-DISCOURSE-MARKERS-ARE-INTERCHANGEABLE-CONNECTORS-REGARDLESS-OF-THE-ACTUAL-LOGICAL-RELATIONSHIP',
  'MC-B-MORE-SOPHISTICATED-SOUNDING-DISCOURSE-MARKERS-ARE-ALWAYS-BETTER-REGARDLESS-OF-NATURAL-FIT',
  [
    {
      stem: 'A memo reads: "Sales rose 12% this quarter. Therefore, three new products launched in this period." Does "therefore" accurately signal the relationship between these two sentences?',
      correct: "No — the second sentence doesn't follow causally from the first as written; it's additional information running in the wrong direction, so \"therefore\" falsely signals a causal link that isn't actually established here",
      wrong: 'Yes — "therefore" is a general-purpose connector that works to link any two related sentences, regardless of whether one causes the other',
    },
    {
      stem: 'Revising a project update, a writer replaces every "but" and "so" with "notwithstanding" and "consequently" throughout, even where the original simple connectors already fit naturally. Does this revision make the update better?',
      correct: "No — swapping in elaborate connectors regardless of fit sacrifices clarity for the appearance of sophistication; a discourse marker's job is to make the logical connection clear, and an ill-fitting elaborate one draws attention to itself instead",
      wrong: 'Yes — more elaborate-sounding discourse markers are always an improvement over simpler ones, since they signal a more advanced command of the language',
    },
    {
      stem: 'A report states, "The pilot program reduced wait times by 20%. However, patient satisfaction scores also improved." Is "however" the right marker here?',
      correct: 'No — the second sentence adds to the first rather than contrasting with it, since both are positive outcomes of the same program; "additionally" or "furthermore" would accurately signal the actual relationship',
      wrong: 'Yes — "however" can introduce any additional point after a first point, regardless of whether the two points actually contrast',
    },
  ],
  [
    'MC-A-DISCOURSE-MARKERS-ARE-INTERCHANGEABLE-CONNECTORS-REGARDLESS-OF-THE-ACTUAL-LOGICAL-RELATIONSHIP, fresh adult example (a sales memo\'s misused "therefore") rather than the existing "however" budget-report example',
    'MC-B-MORE-SOPHISTICATED-SOUNDING-DISCOURSE-MARKERS-ARE-ALWAYS-BETTER-REGARDLESS-OF-NATURAL-FIT, fresh example (a project update over-elaborated) rather than the existing generic paragraph example',
    'MC-A-DISCOURSE-MARKERS-ARE-INTERCHANGEABLE-CONNECTORS-REGARDLESS-OF-THE-ACTUAL-LOGICAL-RELATIONSHIP, second fresh example (a pilot-program report\'s misused "however") forming the ladder\'s third rung',
  ],
)

const EDITING_FOR_PUBLICATION_ADULT = adultLadder(
  'eng.communication.editing-for-publication',
  'MC-A-IF-YOUVE-ALREADY-CAREFULLY-READ-THROUGH-A-PIECE-FOR-CONTENT-YOUVE-ALSO-EFFECTIVELY-PROOFREAD-IT',
  'MC-B-IF-THE-CONTENT-IS-STRONG-ENOUGH-FORMATTING-AND-SURFACE-ERRORS-WONT-REALLY-MATTER-TO-A-READER-OR-EDITOR',
  [
    {
      stem: 'An author revises a book chapter\'s argument three separate times, reading closely each time to check the reasoning holds together, then submits the final draft without any additional read-through. Has the content-focused revision process also effectively proofread the chapter for spelling and punctuation errors?',
      correct: "No — reading closely for reasoning and content is a different mode of attention than reading for surface errors; a reader focused on meaning naturally reads past small errors, so a dedicated proofreading pass is still needed",
      wrong: 'Yes — three careful readings focused on the argument\'s logic are more than enough to also catch any spelling or punctuation errors along the way',
    },
    {
      stem: 'A manuscript with genuinely excellent, original findings is submitted to a journal with the wrong citation style, an over-length abstract, and several typos throughout. Does the strength of the findings mean the editor\'s evaluation won\'t be affected by these surface issues?',
      correct: "No — formatting compliance and freedom from surface errors are evaluated as a separate, real quality dimension; a manuscript with excellent content can still be delayed, sent back, or viewed less favorably over failures on this separate dimension",
      wrong: 'Yes — since the underlying findings are strong, an editor\'s evaluation of the manuscript depends only on the quality of the research, not on citation style or typos',
    },
    {
      stem: 'After submitting a "content-approved" chapter with several missed typos, an author adds a mandatory final step to their process: reading the chapter\'s last third aloud, slowly, specifically looking for surface errors, separate from any content revision. Is this an appropriate response to what happened?',
      correct: 'Yes — this creates a dedicated, separate reading pass focused specifically on surface form, exactly the missing step; content-focused reading alone reliably misses errors that this kind of pass catches',
      wrong: 'No — since the author already read the chapter carefully multiple times for content, adding another read-through pass afterward is a redundant, unnecessary step',
    },
  ],
  [
    'MC-A-IF-YOUVE-ALREADY-CAREFULLY-READ-THROUGH-A-PIECE-FOR-CONTENT-YOUVE-ALSO-EFFECTIVELY-PROOFREAD-IT, fresh adult example (a three-times-revised book chapter) rather than the existing generic passage example',
    'MC-B-IF-THE-CONTENT-IS-STRONG-ENOUGH-FORMATTING-AND-SURFACE-ERRORS-WONT-REALLY-MATTER-TO-A-READER-OR-EDITOR, fresh example (a journal manuscript with wrong citation style) rather than the existing generic submission-comparison example',
    'MC-A-IF-YOUVE-ALREADY-CAREFULLY-READ-THROUGH-A-PIECE-FOR-CONTENT-YOUVE-ALSO-EFFECTIVELY-PROOFREAD-IT, second fresh example (the author\'s process fix) forming the ladder\'s third rung',
  ],
)

const MEDIA_LITERACY_ADULT = adultLadder(
  'eng.communication.media-literacy',
  'MC-A-NEWS-AND-MEDIA-COVERAGE-SIMPLY-SHOWS-WHAT-HAPPENED-WITH-NO-CONSTRUCTED-CHOICES-INVOLVED',
  'MC-B-EMOTIONALLY-ENGAGING-OR-ATTENTION-GRABBING-CONTENT-IS-AUTOMATICALLY-LESS-TRUSTWORTHY-THAN-PLAIN-CONTENT',
  [
    {
      stem: 'Two outlets cover the same factory closure: one headline reads "Company Abandons Local Workers," the other reads "Company Restructures Amid Industry-Wide Shift." Both describe the same underlying event without stating anything false. Does one of these headlines simply show what happened with no constructed choices involved?',
      correct: 'No — both headlines involve deliberate framing choices (which words to foreground, what to emphasize) that shape the reader\'s impression differently, even though both describe the same underlying event accurately',
      wrong: 'Yes — since neither headline states anything factually false, at least one of them must be presenting the event with no constructed interpretive choices at all',
    },
    {
      stem: 'A well-produced video uses a compelling human story to explain a genuine, well-sourced scientific finding, while a plain, text-only press release on the same finding contains a factual error in its central statistic. Is the emotionally engaging video automatically less trustworthy than the plain press release?',
      correct: 'No — trustworthiness depends on accuracy and sourcing, not on emotional tone or production style; the plain-looking piece is actually the less accurate one here despite its unemotional presentation',
      wrong: 'Yes — a dramatic, emotionally engaging presentation is inherently less trustworthy than a plain, unemotional one, regardless of which piece is more factually accurate',
    },
    {
      stem: 'Revising an analysis of the factory-closure coverage, a student identifies the specific word choices ("abandons" vs. "restructures," "local workers" vs. "industry-wide shift") that shape each headline\'s emphasis, rather than treating either headline as a neutral report. Has this revision improved the media-literacy analysis?',
      correct: 'Yes — identifying the specific constructed choices behind each framing, even in accurate coverage, is what media-literate analysis requires, rather than treating either headline as an unmediated view of the event',
      wrong: "No — since both headlines describe the same real event without factual error, analyzing their specific wording choices adds nothing a reader doesn't already know",
    },
  ],
  [
    'MC-A-NEWS-AND-MEDIA-COVERAGE-SIMPLY-SHOWS-WHAT-HAPPENED-WITH-NO-CONSTRUCTED-CHOICES-INVOLVED, fresh adult example (factory-closure headlines) rather than the existing protest-headline example',
    'MC-B-EMOTIONALLY-ENGAGING-OR-ATTENTION-GRABBING-CONTENT-IS-AUTOMATICALLY-LESS-TRUSTWORTHY-THAN-PLAIN-CONTENT, fresh example (a human-interest science video vs. an inaccurate press release) rather than the existing generic topic example',
    'MC-A-NEWS-AND-MEDIA-COVERAGE-SIMPLY-SHOWS-WHAT-HAPPENED-WITH-NO-CONSTRUCTED-CHOICES-INVOLVED, second fresh example (analyzing the factory-closure headlines\' word choices) forming the ladder\'s third rung',
  ],
)

const NEGOTIATION_LANGUAGE_ADULT = adultLadder(
  'eng.communication.negotiation-language',
  'MC-A-EFFECTIVE-NEGOTIATION-LANGUAGE-MEANS-PUSHING-YOUR-OWN-POSITION-AS-HARD-AS-POSSIBLE',
  'MC-B-AVOIDING-DISAGREEMENT-ALTOGETHER-BY-STAYING-SILENT-OR-QUICKLY-AGREEING-IS-THE-SAME-AS-SUCCESSFUL-CONSENSUS-BUILDING',
  [
    {
      stem: 'Opening a salary negotiation, a candidate states: "I require $95,000, and I won\'t consider anything lower," with no acknowledgment of the employer\'s stated budget constraints. Is asserting one\'s position this forcefully, with no acknowledgment of the other side, the most effective negotiation language?',
      correct: "No — language that only pushes one position with no acknowledgment of the other party's actual constraints tends to produce resistance rather than agreement; effective negotiation language usually acknowledges the other side's position before proposing a path forward",
      wrong: 'Yes — stating your position as firmly and forcefully as possible, without acknowledging the other party\'s constraints, is what effective negotiation language means',
    },
    {
      stem: 'In a planning meeting, a team member privately believes a proposed launch date is unrealistic but says nothing and lets the date pass unchallenged. Is this silence the same as the team having reached genuine consensus on the launch date?',
      correct: "No — an unspoken disagreement isn't resolved just because it wasn't voiced; genuine consensus requires actually surfacing the concern using constructive language and working through it, not staying silent",
      wrong: 'Yes — if no one objects out loud during the meeting, that silence itself constitutes successful consensus-building on the launch date',
    },
    {
      stem: 'Revising the salary-negotiation opening to "I understand the posted range tops out around $85,000 — given my specific experience with this exact system, could we discuss $95,000, or a signing bonus that bridges the gap?" — has this revision improved the negotiation language?',
      correct: 'Yes — acknowledging the employer\'s stated constraint before proposing an alternative is what effective negotiation language does, working toward a mutually workable outcome rather than only asserting one position',
      wrong: "No — since the candidate is still ultimately asking for $95,000 in both versions, acknowledging the employer's budget first doesn't change how effective the negotiation language is",
    },
  ],
  [
    'MC-A-EFFECTIVE-NEGOTIATION-LANGUAGE-MEANS-PUSHING-YOUR-OWN-POSITION-AS-HARD-AS-POSSIBLE, fresh adult example (a salary negotiation opening) rather than the existing Friday-delivery example',
    'MC-B-AVOIDING-DISAGREEMENT-ALTOGETHER-BY-STAYING-SILENT-OR-QUICKLY-AGREEING-IS-THE-SAME-AS-SUCCESSFUL-CONSENSUS-BUILDING, fresh example (a silently-doubted launch date) rather than the existing generic proposal example',
    'MC-A-EFFECTIVE-NEGOTIATION-LANGUAGE-MEANS-PUSHING-YOUR-OWN-POSITION-AS-HARD-AS-POSSIBLE, second fresh example (the salary opening revised) forming the ladder\'s third rung',
  ],
)

const PRESENTATION_DESIGN_ADULT = adultLadder(
  'eng.communication.presentation-design',
  'MC-A-A-GOOD-SLIDE-CONTAINS-THE-FULL-TEXT-OF-WHAT-THE-SPEAKER-WILL-SAY',
  'MC-B-EVERY-SLIDE-NEEDS-DECORATIVE-VISUAL-ELEMENTS-TO-LOOK-PROFESSIONAL',
  [
    {
      stem: 'A quarterly-results slide contains three full paragraphs of text, essentially duplicating the entire script the presenter plans to read aloud. Does packing the slide with the full spoken script make it a strong slide?',
      correct: "No — a slide with the full script forces the audience to choose between reading the slide and listening to the speaker, and usually reading wins, so the spoken words go unheard; a strong slide supports the speech with a few key words or visuals, not a duplicate of it",
      wrong: 'Yes — including the complete spoken content on the slide ensures the audience won\'t miss any of the information, which is what makes a slide effective',
    },
    {
      stem: 'A data slide showing a clear, directly relevant bar chart also has a decorative border and an unrelated stock photo of a handshake added "to make it look more professional." Does adding these decorative elements improve the slide?',
      correct: "No — the decorative border and unrelated photo don't clarify the specific point the chart is making; a visual element should be included only if it helps the audience understand that point, not merely to fill space or appear polished",
      wrong: 'Yes — adding decorative visual elements like borders and relevant-feeling stock photography is necessary for any slide to look sufficiently professional',
    },
    {
      stem: 'Revising the quarterly-results slide from three paragraphs down to the phrase "Revenue +12% QoQ" alongside a simple trend line, with the presenter explaining the details aloud — has this revision improved the slide?',
      correct: 'Yes — reducing the slide to a few key words and a supporting visual lets the audience listen to the spoken explanation instead of competing with a wall of text, which is what a strong slide does',
      wrong: "No — since the underlying quarterly results are the same in both versions, removing the paragraphs of text doesn't change how effective the slide is",
    },
  ],
  [
    'MC-A-A-GOOD-SLIDE-CONTAINS-THE-FULL-TEXT-OF-WHAT-THE-SPEAKER-WILL-SAY, fresh adult example (a quarterly-results slide) rather than the existing generic dense-slide example',
    'MC-B-EVERY-SLIDE-NEEDS-DECORATIVE-VISUAL-ELEMENTS-TO-LOOK-PROFESSIONAL, fresh example (a decorative border and stock photo on a data slide) rather than the existing generic stock-image example',
    'MC-A-A-GOOD-SLIDE-CONTAINS-THE-FULL-TEXT-OF-WHAT-THE-SPEAKER-WILL-SAY, second fresh example (the quarterly-results slide revised) forming the ladder\'s third rung',
  ],
)

const PROFESSIONAL_COMMUNICATION_ADULT = adultLadder(
  'eng.communication.professional-communication',
  'MC-A-THE-CHANNEL-WRITTEN-VS-SPOKEN-DOESNT-MATTER-AS-LONG-AS-THE-MESSAGE-CONTENT-IS-RIGHT',
  'MC-B-A-SPOKEN-PRESENTATION-SHOULD-BE-A-WORD-FOR-WORD-READING-OF-THE-WRITTEN-DOCUMENT',
  [
    {
      stem: 'A manager learns of a system outage affecting customers right now and sends a detailed written email to the on-call engineer, who doesn\'t check email for another two hours. Would sending the same urgent content via an instant message or phone call have changed whether the message achieved its purpose?',
      correct: "Yes — channel choice is a functional decision based on urgency; the identical content sent through a channel the recipient checks immediately would have reached them in time to act, while the email did not",
      wrong: 'No — since the written email contained the exact correct information about the outage, which channel delivered it has no real effect on whether the message succeeds',
    },
    {
      stem: 'Presenting findings at a conference, a researcher reads their dense written report aloud exactly as written, sentence by sentence, without adapting the phrasing. Is reading the written document verbatim the right approach for a listening audience?',
      correct: "No — a listening audience gets only one pass and can't re-read a dense sentence the way a reader could; the spoken version needs shorter sentences, verbal signposts, and some repetition of key points, even while keeping the same core content as the written report",
      wrong: 'Yes — reading the written report exactly as written ensures full consistency between the spoken and written versions, which is the goal of a professional presentation',
    },
    {
      stem: 'After the outage incident, the manager updates their process: any message rated "urgent" is now sent by phone or instant message first, with a written summary email sent afterward for the record. Is this an appropriate response to what the outage incident revealed?',
      correct: 'Yes — this treats channel choice as a functional decision tied to urgency, matching the channel to how quickly the message needs to reach its recipient, exactly the gap the outage incident exposed',
      wrong: "No — since a written record is still being sent either way, changing which channel delivers the initial urgent notice doesn't really address what went wrong",
    },
  ],
  [
    'MC-A-THE-CHANNEL-WRITTEN-VS-SPOKEN-DOESNT-MATTER-AS-LONG-AS-THE-MESSAGE-CONTENT-IS-RIGHT, fresh adult example (a system-outage notice) rather than the existing deadline-email/group-feedback example',
    'MC-B-A-SPOKEN-PRESENTATION-SHOULD-BE-A-WORD-FOR-WORD-READING-OF-THE-WRITTEN-DOCUMENT, fresh example (a conference report read verbatim) rather than the existing generic dense-report example',
    'MC-A-THE-CHANNEL-WRITTEN-VS-SPOKEN-DOESNT-MATTER-AS-LONG-AS-THE-MESSAGE-CONTENT-IS-RIGHT, second fresh example (the manager\'s process fix) forming the ladder\'s third rung',
  ],
)

const RESEARCH_METHODOLOGY_WRITING_ADULT = adultLadder(
  'eng.communication.research-methodology-writing',
  'MC-A-DESCRIBING-A-METHOD-MEANS-JUST-LISTING-THE-STEPS-TAKEN-WITH-NO-JUSTIFICATION',
  'MC-B-A-GOOD-METHODOLOGY-SECTION-SHOULD-PRESENT-THE-METHOD-AS-FLAWLESS-WITH-NO-ACKNOWLEDGED-LIMITATIONS',
  [
    {
      stem: 'A methods section reads: "We interviewed 15 remote team leads. We coded the transcripts using thematic analysis." with no explanation of why 15 interviews, or why thematic analysis specifically, suit this research question. Does this description give a reader everything a methods section needs?',
      correct: "No — this is a bare list of steps with no rationale; a methods section needs to explain why these specific choices (this sample size, this particular analytic method) suit this specific research question, not just report what was done",
      wrong: 'Yes — accurately stating the steps performed is the complete job of a methods section; explaining why those particular choices were made isn\'t necessary',
    },
    {
      stem: 'A methodology section for a study on remote-team communication describes the interview method with no mention that all 15 team leads came from a single company, which could limit how broadly the findings generalize. Does omitting this limitation make the methodology section stronger?',
      correct: "No — omitting a real, relevant limitation doesn't make the method appear more credible to a careful reader; transparently naming the single-company sample as a limitation, while still defending its adequacy for the study's specific purpose, is a sign of rigor, not a weakness",
      wrong: 'Yes — a methodology section is more persuasive when it presents the chosen method as beyond question, since acknowledging any limitation would undermine the study\'s credibility',
    },
    {
      stem: 'Revising the interview methods section to read "We interviewed 15 remote team leads, a sample size suited to this study\'s exploratory aim of identifying recurring communication patterns rather than establishing population-wide frequencies, and used thematic analysis because it is well suited to surfacing patterns across open-ended interview responses" — has this revision improved the methodology section?',
      correct: 'Yes — adding the explicit justification for the sample size and analytic method, tied to the specific research question, is exactly what turns a bare procedural list into a reasoned methods section',
      wrong: "No — since the same 15 interviews and the same analytic method are used in both versions, adding sentences explaining the reasoning behind them doesn't change how complete the methodology section is",
    },
  ],
  [
    'MC-A-DESCRIBING-A-METHOD-MEANS-JUST-LISTING-THE-STEPS-TAKEN-WITH-NO-JUSTIFICATION, fresh adult example (an interview study on remote-team communication) rather than the existing 50-students/chi-square example',
    'MC-B-A-GOOD-METHODOLOGY-SECTION-SHOULD-PRESENT-THE-METHOD-AS-FLAWLESS-WITH-NO-ACKNOWLEDGED-LIMITATIONS, fresh example (a single-company interview sample) rather than the existing generic sample-representativeness example',
    'MC-A-DESCRIBING-A-METHOD-MEANS-JUST-LISTING-THE-STEPS-TAKEN-WITH-NO-JUSTIFICATION, second fresh example (the methods section revised) forming the ladder\'s third rung',
  ],
)

const TECHNICAL_WRITING_ADULT = adultLadder(
  'eng.communication.technical-writing',
  'MC-A-TECHNICAL-WRITING-SHOULD-USE-VARIED-VOCABULARY-TO-AVOID-REPETITION-LIKE-OTHER-WRITING',
  'MC-B-TECHNICAL-WRITING-ONLY-NEEDS-TO-DESCRIBE-WHAT-TO-DO-WHEN-EVERYTHING-GOES-RIGHT',
  [
    {
      stem: 'A software installation guide refers to the same on-screen text-entry element as "the field" in step 2, "the box" in step 4, and "the input" in step 6. Does varying the term across steps make the instructions clearer?',
      correct: 'No — a first-time user has no way of knowing whether "the field," "the box," and "the input" refer to the same element or three different ones; technical writing needs rigid, unwavering consistency for every named part, not the vocabulary variety valued in other writing',
      wrong: 'Yes — using varied terms for the same element across different steps demonstrates a more sophisticated command of vocabulary, which is valuable in any kind of writing including technical instructions',
    },
    {
      stem: 'A router-setup guide describes only the successful configuration sequence, with no mention of what to do if the router doesn\'t appear in the device list — a step where many first-time users get stuck. Is describing only this ideal sequence sufficient for good technical writing?',
      correct: 'No — instructions that only describe the happy path fail exactly the readers who need help most; good technical writing anticipates the specific points where a reader is likely to get stuck and addresses them directly, such as noting what to check if the router doesn\'t appear',
      wrong: 'Yes — as long as the successful sequence of steps is described accurately, technical writing has done its job; anticipating what might go wrong is a separate, optional concern',
    },
    {
      stem: 'Revising the installation guide, a writer changes every instance of "field," "box," and "input" to the single term "the text field," used identically in every step referring to that element. Has this revision improved the instructions?',
      correct: 'Yes — using the exact same term every time removes the ambiguity about whether different words refer to the same element, which is what technical writing requires, unlike the vocabulary variety prized in other writing',
      wrong: "No — since the underlying UI element being described hasn't changed, standardizing the terminology used to refer to it doesn't affect how clear the instructions are",
    },
  ],
  [
    'MC-A-TECHNICAL-WRITING-SHOULD-USE-VARIED-VOCABULARY-TO-AVOID-REPETITION-LIKE-OTHER-WRITING, fresh adult example (a software installation guide) rather than the existing switch/toggle/control example',
    'MC-B-TECHNICAL-WRITING-ONLY-NEEDS-TO-DESCRIBE-WHAT-TO-DO-WHEN-EVERYTHING-GOES-RIGHT, fresh example (a router-setup guide) rather than the existing part-A/slot-B assembly example',
    'MC-A-TECHNICAL-WRITING-SHOULD-USE-VARIED-VOCABULARY-TO-AVOID-REPETITION-LIKE-OTHER-WRITING, second fresh example (the installation guide standardized) forming the ladder\'s third rung',
  ],
)

export const ENGLISH_ADULT_BAND_BATCH_15: SeedProbe[] = [
  ...ACADEMIC_WRITING_ADVANCED_ADULT,
  ...BUSINESS_WRITING_ADULT,
  ...CROSS_CULTURAL_COMMUNICATION_ADULT,
  ...DISCOURSE_MARKERS_ADVANCED_ADULT,
  ...EDITING_FOR_PUBLICATION_ADULT,
  ...MEDIA_LITERACY_ADULT,
  ...NEGOTIATION_LANGUAGE_ADULT,
  ...PRESENTATION_DESIGN_ADULT,
  ...PROFESSIONAL_COMMUNICATION_ADULT,
  ...RESEARCH_METHODOLOGY_WRITING_ADULT,
  ...TECHNICAL_WRITING_ADULT,
]
