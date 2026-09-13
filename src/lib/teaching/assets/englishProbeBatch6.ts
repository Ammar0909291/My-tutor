/**
 * ENGLISH PROBE-CONTRACT CAMPAIGN — Batch 6.
 *
 * SCOPE: closes out the remaining eng.literature domain (all 11
 * concepts left below depth 4) + the entire eng.communication domain
 * (12 concepts, alphabetical) + the first 2 eng.composition concepts
 * (alphabetical), to round the batch to 25. All 25 re-measured at
 * closed=2 (mcq x1 + misconception_probe x1) directly from the seed
 * corpus in git before authoring (zero DB access, zero egress). Every
 * one confirmed to already carry two genuine, distinct, ACTIVE
 * misconception ids on its existing probes — the stop-condition check
 * passed for all 25; none were skipped, none required new Educational
 * Brain authoring.
 *
 * Each concept goes straight from depth 2 to depth 4 — TWO new probes,
 * the same resilience target established across Batches 1-5.
 *
 * Probe A: probeKind 'checkpoint' (depth 3), reuses the concept's FIRST
 *   registered misconception from a fresh worked example.
 * Probe B: probeKind 'true_false' (depth 4), reuses the concept's SECOND
 *   registered misconception from a fresh worked example.
 * Both verified free (no prior 'checkpoint'/'true_false' probe) for all
 * 25 concepts before authoring — dumped every existing probe's stem/
 * misconceptionId for this exact concept list before writing a single
 * new stem, same P-10-safe technique as every prior file in this
 * campaign.
 *
 * No new misconception ids. No Educational Brain authoring. Every
 * gradeBand below is the concept's OWN native band, read off its
 * existing probes: MIDDLE for plot-structure, point-of-view, setting-
 * and-atmosphere (literature) and digital-communication
 * (communication); HIGH for every other concept in this batch.
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

export const ENGLISH_PROBE_BATCH_6: SeedProbe[] = [
  // ─── eng.literature.novel-study (HIGH) ─────────────────────────────────
  probe('eng.literature.novel-study', 'checkpoint', H,
    'A novel includes a lengthy chapter set entirely in a minor character\'s past, unconnected to the main plot until much later. Is this "padding," the way it would be criticized in a compressed short story?',
    'No — a novel\'s greater length legitimately allows extended digressions and delayed-payoff structures; a novel isn\'t just a short story stretched out',
    'Yes — a novel is just a short story stretched out with more words',
    'eng.literature.novel-study:MC-A-A-NOVEL-IS-JUST-A-SHORT-STORY-STRETCHED-OUT-WITH-MORE-WORDS',
    'MC-A-..., re-asked with a minor-character-backstory chapter rather than the existing subplot example'),
  probe('eng.literature.novel-study', 'true_false', H,
    'A middle chapter of a novel suggests "ambition always destroys relationships." Can you finalize this as the novel\'s full theme from this one chapter?',
    'No — a novel\'s theme typically develops and deepens across its extended length; the full picture only emerges by tracking the theme across the whole book',
    'Yes — a novel\'s theme can be fully understood from any single passage or chapter',
    'eng.literature.novel-study:MC-B-A-NOVELS-THEME-CAN-BE-FULLY-UNDERSTOOD-FROM-ANY-SINGLE-PASSAGE-OR-CHAPTER',
    'MC-B-..., re-asked with an ambition/relationships example rather than the existing hard-work/success example'),

  // ─── eng.literature.plot-structure (MIDDLE) ────────────────────────────
  probe('eng.literature.plot-structure', 'checkpoint', M,
    'A mystery has a loud, dramatic courtroom confrontation mid-story, followed by a quiet scene where the detective privately realizes who the real culprit is, which determines how the case resolves. Which scene is the climax?',
    'The quiet realization scene — it is the turning point that decides the central conflict\'s outcome, regardless of the earlier scene being louder',
    'The courtroom confrontation — it is the most dramatic, attention-grabbing moment',
    'eng.literature.plot-structure:MC-THE-CLIMAX-IS-JUST-THE-MOST-EXCITING-OR-ACTION-PACKED-MOMENT',
    'MC-THE-CLIMAX-IS-JUST-THE-MOST-EXCITING-OR-ACTION-PACKED-MOMENT, re-asked with a mystery/courtroom example rather than the existing heist/chase example'),
  probe('eng.literature.plot-structure', 'true_false', M,
    'A quest story spends 80% of its length on rising action, has a brief two-page climax, and a short final scene of resolution. Is this a badly structured plot because the stages aren\'t equal length?',
    'No — plot stages are identified by function, not equal length; uneven proportions like this are the norm in real stories',
    'Yes — every story should divide its length roughly equally among the five stages',
    'eng.literature.plot-structure:MC-EVERY-STORY-FOLLOWS-THE-FIVE-STAGES-IN-EQUAL-PROPORTION',
    'MC-EVERY-STORY-FOLLOWS-THE-FIVE-STAGES-IN-EQUAL-PROPORTION, re-asked with a quest-story example rather than the existing survival-story example'),

  // ─── eng.literature.poetic-forms (HIGH) ─────────────────────────────────
  probe('eng.literature.poetic-forms', 'checkpoint', H,
    'A villanelle repeats two specific lines in a fixed pattern across nineteen lines, building obsessive intensity. Is calling this poem "a villanelle" just a label with no further effect on meaning?',
    'No — the villanelle\'s specific repetition structure actively creates the felt sense of obsession or inescapability; a shapeless version would lose that effect entirely',
    'Yes — a poem\'s form is just a label with no effect on meaning',
    'eng.literature.poetic-forms:MC-A-A-POEMS-FORM-IS-JUST-A-LABEL-WITH-NO-EFFECT-ON-MEANING',
    'MC-A-..., re-asked with a villanelle example rather than the existing sonnet-turn example'),
  probe('eng.literature.poetic-forms', 'true_false', H,
    'A prose poem is written in continuous paragraphs with no line breaks at all. Does that mean it has no form or rules at all, so it isn\'t really crafted?',
    'No — prose poets make deliberate structural choices (sentence rhythm, compression, imagery density) that constitute a real, considered form, even without line breaks',
    'Yes — a poem with no line breaks has no form or rules at all, so it\'s not really crafted',
    'eng.literature.poetic-forms:MC-B-FREE-VERSE-HAS-NO-FORM-OR-RULES-AT-ALL-SO-ITS-NOT-REALLY-CRAFTED',
    'MC-B-..., re-asked with a prose-poem example rather than the existing free-verse example'),

  // ─── eng.literature.poetry-basics (HIGH) ────────────────────────────────
  probe('eng.literature.poetry-basics', 'checkpoint', H,
    'A poem breaks "He waited, and waited, and no one came" across three separate lines, one word per line for "waited." Are these line breaks just random visual chopping?',
    'No — line breaks are a deliberate structural tool controlling emphasis and pacing, stretching out the reader\'s sense of waiting through the isolated repetition',
    'Yes — poetry is just prose written with line breaks in random places',
    'eng.literature.poetry-basics:MC-POETRY-IS-JUST-PROSE-WRITTEN-WITH-LINE-BREAKS-IN-RANDOM-PLACES',
    'MC-POETRY-IS-JUST-PROSE-WRITTEN-WITH-LINE-BREAKS-IN-RANDOM-PLACES, re-asked with a "waited" repetition example rather than the existing "suddenly"/"silence" example'),
  probe('eng.literature.poetry-basics', 'true_false', H,
    'A haiku has no rhyme at all and a fixed syllable count instead of a fixed meter. Does that mean it doesn\'t count as "real" poetry?',
    'No — a haiku still uses poetry\'s core features; rhyme is optional, and structure can take forms other than meter',
    'Yes — all poetry must rhyme and have a strict meter',
    'eng.literature.poetry-basics:MC-ALL-POETRY-MUST-RHYME-AND-HAVE-A-STRICT-METER',
    'MC-ALL-POETRY-MUST-RHYME-AND-HAVE-A-STRICT-METER, re-asked with a haiku example rather than the existing free-verse example'),

  // ─── eng.literature.point-of-view (MIDDLE) ──────────────────────────────
  probe('eng.literature.point-of-view', 'checkpoint', M,
    'A first-person narrator describes winning a debate decisively, but another character\'s brief remark later suggests the debate was actually a close call. Is the narrator\'s account necessarily the complete, objective truth?',
    'No — a first-person narrator\'s account can be incomplete or biased, and a careful reader watches for contradicting details',
    'Yes — a first-person narrator, telling the story in their own words, always tells the complete, unbiased truth',
    'eng.literature.point-of-view:MC-A-A-FIRST-PERSON-NARRATOR-ALWAYS-TELLS-THE-COMPLETE-UNBIASED-TRUTH-ABOUT-EVERYTHING-THAT-HAPPENS',
    'MC-A-..., re-asked with a debate-outcome example rather than the existing argument example'),
  probe('eng.literature.point-of-view', 'true_false', M,
    'Two third-person passages both use "he" and "she." One reveals only the protagonist\'s inner thoughts throughout; the other narrates purely external actions and dialogue with no character\'s thoughts revealed at all. Is the narrator\'s access the same in both?',
    'No — one is third person limited (one character\'s thoughts) and the other is third person objective (no thoughts revealed); the pronoun alone doesn\'t determine this',
    'Yes — both use "he/she," so they are basically the same point of view',
    'eng.literature.point-of-view:MC-B-THIRD-PERSON-OMNISCIENT-AND-THIRD-PERSON-LIMITED-ARE-BASICALLY-THE-SAME-THING-JUST-USING-HE-SHE',
    'MC-B-..., re-asked with a limited-vs-objective pair rather than the existing limited-vs-omniscient pair'),

  // ─── eng.literature.prose-fiction (HIGH) ────────────────────────────────
  probe('eng.literature.prose-fiction', 'checkpoint', H,
    'Is a novella\'s length — shorter than a novel, longer than a short story — a sign it\'s "missing" content a full novel would have?',
    'No — the novella is a genuinely distinct form with its own scope and pacing, not a novel with content removed',
    'Yes — a novella is just a shorter version of a novel, missing the scope a complete story should have',
    'eng.literature.prose-fiction:MC-A-SHORT-STORY-IS-JUST-A-SHORTER-VERSION-OF-A-NOVEL',
    'MC-A-..., re-asked with a novella example rather than the existing short-story example'),
  probe('eng.literature.prose-fiction', 'true_false', H,
    'A story represents a character\'s isolation through a literal, ever-shrinking room they live in. Is this fantastical story "less serious" or "less true" about human experience than a realistic isolation story?',
    'No — it explores the same genuine human truth (isolation) through a different, non-realistic method; realism is one legitimate mode among several',
    'Yes — prose fiction must always be completely realistic to count as good, serious literature',
    'eng.literature.prose-fiction:MC-PROSE-FICTION-MUST-ALWAYS-BE-COMPLETELY-REALISTIC-TO-BE-GOOD',
    'MC-PROSE-FICTION-MUST-ALWAYS-BE-COMPLETELY-REALISTIC-TO-BE-GOOD, re-asked with a shrinking-room/isolation example rather than the existing shrinking-house/grief example'),

  // ─── eng.literature.prose-nonfiction (HIGH) ─────────────────────────────
  probe('eng.literature.prose-nonfiction', 'checkpoint', H,
    'A personal essay is shaped by the writer\'s specific opinions and chosen emphasis on certain events over others. Does being nonfiction mean it should be voiceless and neutral instead?',
    'No — nonfiction describes the subject matter\'s factual basis, not the absence of authorial voice; personal essays genuinely carry perspective and interpretation',
    'Yes — nonfiction means purely objective, neutral fact-reporting with no author voice or interpretation',
    'eng.literature.prose-nonfiction:MC-A-NONFICTION-MEANS-PURELY-OBJECTIVE-NEUTRAL-FACT-REPORTING-WITH-NO-AUTHOR-VOICE-OR-INTERPRETATION',
    'MC-A-..., re-asked with a personal-essay example rather than the existing memoir example'),
  probe('eng.literature.prose-nonfiction', 'true_false', H,
    'Are a travel narrative, a scientific report, a eulogy, and an op-ed basically the same thing, since all four are nonfiction?',
    'No — each serves a distinct purpose (documenting a journey, presenting findings, honoring a life, arguing a position) with distinct conventions',
    'Yes — all nonfiction subgenres are basically the same thing',
    'eng.literature.prose-nonfiction:MC-B-ALL-NONFICTION-SUBGENRES-ESSAY-MEMOIR-BIOGRAPHY-JOURNALISM-ARE-BASICALLY-THE-SAME-THING',
    'MC-B-..., re-asked with a travel-narrative/report/eulogy/op-ed set rather than the existing memoir/biography/journalism/essay set'),

  // ─── eng.literature.setting-and-atmosphere (MIDDLE) ─────────────────────
  probe('eng.literature.setting-and-atmosphere', 'checkpoint', M,
    'Two passages describe the SAME quiet lake — one emphasizes "still black water, fog, a lone crow\'s call," the other "glassy blue water, sunlight, children laughing." Do these create the same emotional feeling in the reader?',
    'No — the same literal setting can create very different atmospheres depending on which specific details the writer emphasizes',
    'Yes — setting is just neutral background information with no emotional effect',
    'eng.literature.setting-and-atmosphere:MC-A-SETTING-IS-JUST-NEUTRAL-BACKGROUND-INFORMATION-WITH-NO-EMOTIONAL-EFFECT',
    'MC-A-..., re-asked with a lake example rather than the existing old-house example'),
  probe('eng.literature.setting-and-atmosphere', 'true_false', M,
    'Is "a city street at night" automatically a dangerous setting, or automatically a lively, exciting one?',
    'Neither — the same setting type can support very different atmospheres depending on the specific descriptive details used',
    'A city street at night is automatically dangerous, since night streets always feel threatening',
    'eng.literature.setting-and-atmosphere:MC-B-A-SPECIFIC-SETTING-CAN-ONLY-EVER-CREATE-ONE-FIXED-ATMOSPHERE',
    'MC-B-..., re-asked with a city-street-at-night example rather than the existing forest example'),

  // ─── eng.literature.short-story-study (HIGH) ────────────────────────────
  probe('eng.literature.short-story-study', 'checkpoint', H,
    'A short story ends mid-conversation, with the outcome of the characters\' decision left entirely to the reader\'s imagination. Does this mean the story is incomplete, like a short novel that ran out of pages?',
    'No — a short story is a compressed form; an unresolved ending is often a deliberate craft choice',
    'Yes — a short story is just a short novel',
    'eng.literature.short-story-study:MC-A-SHORT-STORY-IS-JUST-A-SHORT-NOVEL',
    'MC-A-..., re-asked with a mid-conversation ending rather than the existing ambiguous-moment ending'),
  probe('eng.literature.short-story-study', 'true_false', H,
    'A minor character\'s hat color is mentioned once in a short story, with no repetition or thematic connection anywhere else. Should you treat this as a deep symbol just because the story is compressed?',
    'No — genuine symbolic weight requires evidence (repetition, thematic connection, structural emphasis); a detail mentioned once with no callback is usually just a detail',
    'Yes — every detail in a short story must be a deep symbol',
    'eng.literature.short-story-study:MC-B-EVERY-DETAIL-MUST-BE-A-DEEP-SYMBOL',
    'MC-B-..., re-asked with a hat-color example rather than the existing shirt-color example'),

  // ─── eng.literature.symbolism (HIGH) ─────────────────────────────────────
  probe('eng.literature.symbolism', 'checkpoint', H,
    'A character\'s keys are mentioned four times purely because they use them to enter their apartment, with no thematic weight attached. Is this automatically a symbol just because it\'s repeated?',
    'No — genuine symbolism requires the story to invest the object with meaning beyond its literal function; mere repetition of a practical object is not enough',
    'Yes — any object mentioned repeatedly in a story is automatically a symbol',
    'eng.literature.symbolism:MC-ANY-OBJECT-MENTIONED-REPEATEDLY-IN-A-STORY-IS-AUTOMATICALLY-A-SYMBOL',
    'MC-ANY-OBJECT-MENTIONED-REPEATEDLY-IN-A-STORY-IS-AUTOMATICALLY-A-SYMBOL, re-asked with a keys/apartment example rather than the existing car example'),
  probe('eng.literature.symbolism', 'true_false', H,
    'A story associates white with mourning and grief rather than the conventional "white = purity/innocence." Is the story using the symbol "wrong"?',
    'No — a symbol\'s meaning must be traced within each story\'s own context, which may follow or deliberately subvert the conventional cultural association',
    'Yes — a symbol has one fixed, universal meaning across all stories',
    'eng.literature.symbolism:MC-A-SYMBOL-HAS-ONE-FIXED-UNIVERSAL-MEANING-ACROSS-ALL-STORIES',
    'MC-A-SYMBOL-HAS-ONE-FIXED-UNIVERSAL-MEANING-ACROSS-ALL-STORIES, re-asked with a white/mourning example rather than the existing darkness/comfort example'),

  // ─── eng.literature.theme-and-message (HIGH) ────────────────────────────
  probe('eng.literature.theme-and-message', 'checkpoint', H,
    'Is "the theme is loss" a complete, specific theme statement?',
    'No — "loss" is just the topic; a theme must be a specific insight or claim the story makes about that topic',
    'Yes — naming the general subject area is itself the theme',
    'eng.literature.theme-and-message:MC-THEME-IS-THE-SAME-AS-THE-TOPIC-OR-SUBJECT-OF-THE-STORY',
    'MC-THEME-IS-THE-SAME-AS-THE-TOPIC-OR-SUBJECT-OF-THE-STORY, re-asked with "loss" rather than the existing "family" example'),
  probe('eng.literature.theme-and-message', 'true_false', H,
    'A story could support both "isolation breeds resentment" and "genuine connection requires vulnerability," each backed by different evidence in the story. Can only one of these be "the" theme?',
    'No — both can be legitimate theme statements, since complex stories often support multiple valid interpretations, each grounded in specific evidence',
    'Yes — every story has exactly one single correct theme to find',
    'eng.literature.theme-and-message:MC-A-STORY-CAN-ONLY-HAVE-ONE-CORRECT-THEME',
    'MC-A-STORY-CAN-ONLY-HAVE-ONE-CORRECT-THEME, re-asked with an isolation/connection pair rather than the existing perseverance/help pair'),

  // ─── eng.communication.academic-writing-advanced (HIGH) ────────────────
  probe('eng.communication.academic-writing-advanced', 'checkpoint', H,
    'A paper opens with "This paper demonstrates that Y causes Z" with no mention of any prior scholarly debate on the question. Does advanced academic writing mean ignoring what others have already said on the topic?',
    'No — advanced academic writing briefly situates the claim relative to existing scholarly positions (building on, complicating, or synthesizing them), not writing as if the conversation started with you',
    'Yes — advanced academic writing means ignoring what others have already said and presenting your analysis as the first consideration of the question',
    'eng.communication.academic-writing-advanced:MC-A-ADVANCED-ACADEMIC-WRITING-MEANS-IGNORING-WHAT-OTHERS-HAVE-ALREADY-SAID',
    'MC-A-..., re-asked with a "Y causes Z" example rather than the existing "X is the cause of Y" example'),
  probe('eng.communication.academic-writing-advanced', 'true_false', H,
    'A paragraph rewrites the same single claim four times using progressively more elaborate vocabulary, without adding any new evidence or angle. Does this longer, more elaborate-sounding paragraph count as more sophisticated writing?',
    'No — this is padding; genuine sophistication comes from adding real analytical depth (a new angle, evidence, or nuance), not from inflating existing content with complicated phrasing',
    'Yes — a longer, more complex-sounding piece is automatically more sophisticated regardless of whether it adds new content',
    'eng.communication.academic-writing-advanced:MC-B-A-LONGER-MORE-COMPLEX-SOUNDING-PIECE-IS-AUTOMATICALLY-MORE-SOPHISTICATED',
    'MC-B-..., re-asked with a four-times-restated-claim example rather than the existing three-times example'),

  // ─── eng.communication.business-writing (HIGH) ──────────────────────────
  probe('eng.communication.business-writing', 'checkpoint', H,
    'A memo to a team opens with two paragraphs of project history before finally stating the actual policy change in the third paragraph. Is building up to the point this way, like a narrative essay, effective business writing?',
    'No — a busy business reader needs the main point or decision stated in the first sentence or two, with supporting context following, not buried later',
    'Yes — business writing should build up to the main point like a narrative essay',
    'eng.communication.business-writing:MC-A-BUSINESS-WRITING-SHOULD-BUILD-UP-TO-THE-MAIN-POINT-LIKE-AN-ACADEMIC-ESSAY',
    'MC-A-..., re-asked with a project-history memo rather than the existing manager-email example'),
  probe('eng.communication.business-writing', 'true_false', H,
    'A status update lists four project risks woven into one long, unbroken paragraph, with all the correct information technically present. Does formatting matter as long as the content is accurate?',
    'No — visual formatting (short paragraphs, bullet points) determines whether a busy reader can actually scan and extract the information; dense prose requires careful reading even when accurate',
    'Yes — a business document just needs to contain the right information; formatting doesn\'t matter',
    'eng.communication.business-writing:MC-B-A-BUSINESS-DOCUMENT-JUST-NEEDS-TO-CONTAIN-THE-RIGHT-INFORMATION-FORMATTING-DOESNT-MATTER',
    'MC-B-..., re-asked with a project-risks status update rather than the existing action-items memo example'),

  // ─── eng.communication.cross-cultural-communication (HIGH) ─────────────
  probe('eng.communication.cross-cultural-communication', 'checkpoint', H,
    'One culture values extended small talk before discussing business; another moves directly to the point within the first minute. Is the direct style objectively "more efficient" or "more professional"?',
    'No — both are equally valid conventions for building working relationships in their respective cultures, not one correct default and one deviation',
    'Yes — the direct style is objectively more efficient and professional; other styles waste time',
    'eng.communication.cross-cultural-communication:MC-A-MY-OWN-CULTURES-COMMUNICATION-NORMS-ARE-THE-UNIVERSAL-DEFAULT-AND-CORRECT-WAY',
    'MC-A-..., re-asked with a small-talk/direct-business example rather than the existing feedback-style example'),
  probe('eng.communication.cross-cultural-communication', 'true_false', H,
    'Two colleagues from the same broadly-labeled national culture negotiate quite differently — one prefers written agreements, one prefers verbal handshake deals. Does this mean the whole culture shares one uniform negotiation style?',
    'No — genuine regional, generational, and individual variation exists within any cultural group; broad tendencies are a starting point, not a fixed rule',
    'Yes — if they share the same cultural label they should negotiate in exactly the same style',
    'eng.communication.cross-cultural-communication:MC-B-AN-ENTIRE-CULTURE-HAS-ONE-SINGLE-UNIFORM-COMMUNICATION-STYLE-WITH-NO-INTERNAL-VARIATION',
    'MC-B-..., re-asked with a written-vs-verbal-agreement example rather than the existing direct-vs-indirect example'),

  // ─── eng.communication.digital-communication (MIDDLE) ──────────────────
  probe('eng.communication.digital-communication', 'checkpoint', M,
    '"lol yeah np, will do 😂" is appropriate replying to a close friend\'s group chat. Is it equally appropriate replying to a client in a formal work chat channel?',
    'No — different digital platforms carry different register expectations; the same message can be a mismatch on another platform',
    'Yes — the same register and style works across all digital platforms',
    'eng.communication.digital-communication:MC-THE-SAME-REGISTER-AND-STYLE-WORKS-ACROSS-ALL-DIGITAL-PLATFORMS',
    'MC-THE-SAME-REGISTER-AND-STYLE-WORKS-ACROSS-ALL-DIGITAL-PLATFORMS, re-asked with a group-chat/work-chat contrast rather than the existing texting/email contrast'),
  probe('eng.communication.digital-communication', 'true_false', M,
    'You send a genuinely sincere compliment by text to someone who barely knows you. Will your intended sincere tone be clearly understood the same way it would be if spoken aloud with a warm voice?',
    'No — text strips away vocal tone and facial expression, so intended tone (even sincerity) is genuinely easy to misread as flat or even sarcastic',
    'Yes — tone is easy to convey in text-based digital communication',
    'eng.communication.digital-communication:MC-TONE-IS-EASY-TO-CONVEY-IN-TEXT-BASED-DIGITAL-COMMUNICATION',
    'MC-TONE-IS-EASY-TO-CONVEY-IN-TEXT-BASED-DIGITAL-COMMUNICATION, re-asked with a sincere-compliment example rather than the existing sarcastic-joke example'),

  // ─── eng.communication.discourse-markers-advanced (HIGH) ───────────────
  probe('eng.communication.discourse-markers-advanced', 'checkpoint', H,
    '"The team missed the deadline. However, the client extended it by a week." Does "however" accurately signal the actual relationship between these two ideas?',
    'No — the second idea resolves/mitigates the first rather than contrasting with it, so "however" falsely signals a contrast that isn\'t quite there; "fortunately" would fit better',
    'Yes — "however" is a general transition word and works fine here regardless of the actual relationship',
    'eng.communication.discourse-markers-advanced:MC-A-DISCOURSE-MARKERS-ARE-INTERCHANGEABLE-CONNECTORS-REGARDLESS-OF-THE-ACTUAL-LOGICAL-RELATIONSHIP',
    'MC-A-..., re-asked with a missed-deadline/extension example rather than the existing report/budget example'),
  probe('eng.communication.discourse-markers-advanced', 'true_false', H,
    'A paragraph replaces every simple connector ("because," "then," "also") with an elaborate alternative ("inasmuch as," "subsequently," "moreover") regardless of fit. Does this automatically make the writing better?',
    'No — elaborate markers that don\'t naturally fit the context sound forced and draw attention to themselves instead of clarifying the logical connection',
    'Yes — more sophisticated-sounding discourse markers are always better than simple ones',
    'eng.communication.discourse-markers-advanced:MC-B-MORE-SOPHISTICATED-SOUNDING-DISCOURSE-MARKERS-ARE-ALWAYS-BETTER-REGARDLESS-OF-NATURAL-FIT',
    'MC-B-..., re-asked with a "because/then/also" swap rather than the existing "but/so/also" swap'),

  // ─── eng.communication.editing-for-publication (HIGH) ──────────────────
  probe('eng.communication.editing-for-publication', 'checkpoint', H,
    'A writer reads their manuscript once, focused entirely on whether the plot makes sense, and assumes this also caught all typos and comma errors. Does a careful content-focused read also effectively serve as proofreading?',
    'No — content-focused reading and surface-error-focused reading compete for the same attention; a reader focused on meaning naturally reads past small surface errors without registering them',
    'Yes — if you\'ve already carefully read through a piece for content, you\'ve also effectively proofread it',
    'eng.communication.editing-for-publication:MC-A-IF-YOUVE-ALREADY-CAREFULLY-READ-THROUGH-A-PIECE-FOR-CONTENT-YOUVE-ALSO-EFFECTIVELY-PROOFREAD-IT',
    'MC-A-..., re-asked with a manuscript/plot-focused read rather than the existing essay/logic-focused read'),
  probe('eng.communication.editing-for-publication', 'true_false', H,
    'A submission has genuinely compelling ideas but ignores the publication\'s required word count and citation style. Will strong enough content mean these format issues won\'t really matter to an editor?',
    'No — formatting compliance and surface polish are evaluated as a separate, real quality dimension; a piece can be rejected or poorly received despite excellent content',
    'Yes — if the content is strong enough, formatting and surface errors won\'t really matter to a reader or editor',
    'eng.communication.editing-for-publication:MC-B-IF-THE-CONTENT-IS-STRONG-ENOUGH-FORMATTING-AND-SURFACE-ERRORS-WONT-REALLY-MATTER-TO-A-READER-OR-EDITOR',
    'MC-B-..., re-asked with a word-count/citation-style example rather than the existing formatting-requirements example'),

  // ─── eng.communication.media-literacy (HIGH) ────────────────────────────
  probe('eng.communication.media-literacy', 'checkpoint', H,
    '"Company Cuts Jobs Amid Losses" and "Workers Left Behind as Executives Profit" both describe the same, technically accurate layoff event. Do they create the same impression in a reader who only sees the headline?',
    'No — different framing choices (word choice, emphasis) shape a different impression, even though both are accurate; media coverage always involves constructed choices',
    'Yes — accurate news coverage simply shows what happened, with no constructed choices involved',
    'eng.communication.media-literacy:MC-A-NEWS-AND-MEDIA-COVERAGE-SIMPLY-SHOWS-WHAT-HAPPENED-WITH-NO-CONSTRUCTED-CHOICES-INVOLVED',
    'MC-A-..., re-asked with a layoff-headline example rather than the existing protest-headline example'),
  probe('eng.communication.media-literacy', 'true_false', H,
    'One media piece uses dramatic music and urgent narration but is built on accurate, well-sourced facts. Another has a calm, understated tone but contains fabricated statistics. Which is actually more trustworthy?',
    'The dramatic-but-accurate piece — trustworthiness depends on accuracy and sourcing, not on emotional tone or presentation style',
    'The calm, understated piece — dramatic or urgent content is automatically less trustworthy than a calm tone',
    'eng.communication.media-literacy:MC-B-EMOTIONALLY-ENGAGING-OR-ATTENTION-GRABBING-CONTENT-IS-AUTOMATICALLY-LESS-TRUSTWORTHY-THAN-PLAIN-CONTENT',
    'MC-B-..., re-asked with a dramatic-music/fabricated-statistics pair rather than the existing engaging/dry-toned pair'),

  // ─── eng.communication.negotiation-language (HIGH) ──────────────────────
  probe('eng.communication.negotiation-language', 'checkpoint', H,
    '"This is our final offer, take it or leave it." This opening asserts one position forcefully with no acknowledgment of the other party\'s constraints. Does effective negotiation language mean pushing your own position as hard as possible?',
    'No — effective negotiation language acknowledges the other party\'s actual position before proposing alternatives, aiming at mutually acceptable agreement rather than one-sided winning',
    'Yes — effective negotiation language means pushing your own position as hard as possible',
    'eng.communication.negotiation-language:MC-A-EFFECTIVE-NEGOTIATION-LANGUAGE-MEANS-PUSHING-YOUR-OWN-POSITION-AS-HARD-AS-POSSIBLE',
    'MC-A-..., re-asked with a "final offer" example rather than the existing "no exceptions" deadline example'),
  probe('eng.communication.negotiation-language', 'true_false', H,
    'A team member privately dislikes a plan but nods along in the meeting to avoid conflict, and the plan proceeds unchanged. Is quietly going along with something the same as successful consensus-building?',
    'No — an unresolved, unspoken disagreement is not the same as a genuine, worked-through agreement; real consensus requires actually voicing and addressing the concern constructively',
    'Yes — avoiding disagreement altogether by quietly going along is the same as successful consensus-building',
    'eng.communication.negotiation-language:MC-B-AVOIDING-DISAGREEMENT-ALTOGETHER-BY-STAYING-SILENT-OR-QUICKLY-AGREEING-IS-THE-SAME-AS-SUCCESSFUL-CONSENSUS-BUILDING',
    'MC-B-..., re-asked with a nodding-along-in-a-meeting example rather than the existing staying-silent example'),

  // ─── eng.communication.presentation-design (HIGH) ───────────────────────
  probe('eng.communication.presentation-design', 'checkpoint', H,
    'A slide displays a dense paragraph summarizing everything the speaker plans to explain verbally over the next five minutes. Does a good slide need to contain the full text of what the speaker will say?',
    'No — a slide should reduce content to key words, phrases, or visuals that support the spoken content, not compete with the speaker for the audience\'s attention',
    'Yes — a good slide contains the full text of what the speaker will say',
    'eng.communication.presentation-design:MC-A-A-GOOD-SLIDE-CONTAINS-THE-FULL-TEXT-OF-WHAT-THE-SPEAKER-WILL-SAY',
    'MC-A-..., re-asked with a dense-paragraph slide rather than the existing three-sentences slide'),
  probe('eng.communication.presentation-design', 'true_false', H,
    'A slide includes a generic clip-art icon chosen only because the template suggested it, with no connection to the point being made. Does every slide need visual elements like this to look complete?',
    'No — every visual element should be chosen because it clarifies the specific spoken point, not merely to fill a template slot or look complete; purely decorative visuals should be cut',
    'Yes — every slide needs visual elements like this to look complete',
    'eng.communication.presentation-design:MC-B-EVERY-SLIDE-NEEDS-DECORATIVE-VISUAL-ELEMENTS-TO-LOOK-PROFESSIONAL',
    'MC-B-..., re-asked with a template clip-art example rather than the existing stock-image example'),

  // ─── eng.communication.professional-communication (HIGH) ───────────────
  probe('eng.communication.professional-communication', 'checkpoint', H,
    'A sensitive, urgent personnel matter is raised only through a group chat message the recipient sees among dozens of other unrelated messages. Does channel choice matter as long as the message content itself is accurate?',
    'Yes — channel choice is a functional decision based on urgency, need for a record, and sensitivity; the wrong channel can mean the message doesn\'t achieve its purpose even with accurate content',
    'No — the channel doesn\'t matter as long as the message content is right',
    'eng.communication.professional-communication:MC-A-THE-CHANNEL-WRITTEN-VS-SPOKEN-DOESNT-MATTER-AS-LONG-AS-THE-MESSAGE-CONTENT-IS-RIGHT',
    'MC-A-..., re-asked with a group-chat/personnel-matter example rather than the existing email/deadline example'),
  probe('eng.communication.professional-communication', 'true_false', H,
    'A student presenting research reads their dense written abstract aloud word for word to the audience. Should a spoken presentation be a word-for-word reading of the written document?',
    'No — spoken delivery has different conventions (shorter sentences, verbal signposts, repetition of key points) since a listener can\'t pause or re-read; key points should stay consistent but phrasing must be adapted',
    'Yes — a spoken presentation should be a word-for-word reading of the written document to ensure consistency',
    'eng.communication.professional-communication:MC-B-A-SPOKEN-PRESENTATION-SHOULD-BE-A-WORD-FOR-WORD-READING-OF-THE-WRITTEN-DOCUMENT',
    'MC-B-..., re-asked with a written-abstract example rather than the existing written-report example'),

  // ─── eng.communication.research-methodology-writing (HIGH) ─────────────
  probe('eng.communication.research-methodology-writing', 'checkpoint', H,
    'A methods section reads: "We interviewed 20 participants. We coded responses thematically." with no explanation of why these choices suit the research question. Is this a complete method description?',
    'No — describing a method means explaining WHY specific choices (sample size, coding approach) suit the research question, not just listing the steps taken',
    'Yes — describing a method means just listing the steps taken, with no justification needed',
    'eng.communication.research-methodology-writing:MC-A-DESCRIBING-A-METHOD-MEANS-JUST-LISTING-THE-STEPS-TAKEN-WITH-NO-JUSTIFICATION',
    'MC-A-..., re-asked with an interview/thematic-coding example rather than the existing survey/chi-square example'),
  probe('eng.communication.research-methodology-writing', 'true_false', H,
    'A methodology section describes a small sample size but never acknowledges it as a possible limitation, presenting the study as fully conclusive. Does presenting a method this way make the research seem more credible?',
    'No — transparently acknowledging a real, specific limitation while still defending the method\'s appropriateness signals genuine rigor and is more credible, not less',
    'Yes — a good methodology section should present the method as flawless with no acknowledged limitations',
    'eng.communication.research-methodology-writing:MC-B-A-GOOD-METHODOLOGY-SECTION-SHOULD-PRESENT-THE-METHOD-AS-FLAWLESS-WITH-NO-ACKNOWLEDGED-LIMITATIONS',
    'MC-B-..., re-asked with a small-sample-size example rather than the existing generic no-limitations framing'),

  // ─── eng.communication.technical-writing (HIGH) ─────────────────────────
  probe('eng.communication.technical-writing', 'checkpoint', H,
    'A manual calls the same software element "the panel," then later "the window," then later "the interface" in different sections, to avoid repetitive vocabulary. Is varying vocabulary like this good technical writing?',
    'No — a reader unfamiliar with the software would reasonably think these are three different elements; technical writing requires rigid, unwavering terminology consistency instead',
    'Yes — technical writing should use varied vocabulary to avoid repetition, like other writing',
    'eng.communication.technical-writing:MC-A-TECHNICAL-WRITING-SHOULD-USE-VARIED-VOCABULARY-TO-AVOID-REPETITION-LIKE-OTHER-WRITING',
    'MC-A-..., re-asked with a software-manual example rather than the existing physical-switch example'),
  probe('eng.communication.technical-writing', 'true_false', H,
    'Setup instructions only describe the successful sequence ("connect cable to port A") with no guidance for common mistakes, like connecting it to the wrong port. Is this sufficient for good technical writing?',
    'No — technical writing must anticipate and address at least one likely point of reader confusion or error, not just describe what happens when everything goes right',
    'Yes — technical writing only needs to describe what to do when everything goes right',
    'eng.communication.technical-writing:MC-B-TECHNICAL-WRITING-ONLY-NEEDS-TO-DESCRIBE-WHAT-TO-DO-WHEN-EVERYTHING-GOES-RIGHT',
    'MC-B-..., re-asked with a cable/port example rather than the existing assembly example'),

  // ─── eng.composition.academic-writing-conventions (HIGH) ───────────────
  probe('eng.composition.academic-writing-conventions', 'checkpoint', H,
    'A student writes "Some people think social media helps society, others think it harms it" instead of taking a specific, evidence-based position. Does academic objectivity mean avoiding any clear claim or argument?',
    'No — academic objectivity means having a claim grounded in evidence and expressed with appropriate confidence, not avoiding a position entirely',
    'Yes — academic objectivity means having no opinion or argument at all',
    'eng.composition.academic-writing-conventions:MC-A-ACADEMIC-OBJECTIVITY-MEANS-HAVING-NO-OPINION-OR-ARGUMENT-AT-ALL',
    'MC-A-..., re-asked with a social-media example rather than the existing climate-policy example'),
  probe('eng.composition.academic-writing-conventions', 'true_false', H,
    'A student writes "It seems somewhat possible that X might occur" for a well-established scientific consensus AND for a single unreplicated pilot study AND for pure speculation, using identical uniform hedging for all three. Does this accurately represent their genuinely different evidence strength?',
    'No — hedging language should be calibrated to match each claim\'s actual evidence strength, not applied uniformly regardless of how strong the evidence is',
    'Yes — hedging language means being vague or weak about everything uniformly, regardless of evidence strength',
    'eng.composition.academic-writing-conventions:MC-B-HEDGING-LANGUAGE-MEANS-BEING-VAGUE-OR-WEAK-ABOUT-EVERYTHING',
    'MC-B-..., re-asked with a consensus/pilot-study/speculation set rather than the existing finding/study/theory set'),

  // ─── eng.composition.argumentation-basics (HIGH) ────────────────────────
  probe('eng.composition.argumentation-basics', 'checkpoint', H,
    'An outline for "the city should build a new library" lists four points: readers want it, students want it, families want it, everyone wants it. Does having four points automatically make this a stronger argument than two well-developed, genuinely different points?',
    'No — these four points are really the same underlying idea restated; two or three genuinely distinct, well-developed points almost always beat several overlapping ones',
    'Yes — more reasons is always a stronger argument regardless of whether they overlap',
    'eng.composition.argumentation-basics:MC-A-MORE-REASONS-IS-ALWAYS-A-STRONGER-ARGUMENT',
    'MC-A-..., re-asked with a new-library example rather than the existing later-school-start example'),
  probe('eng.composition.argumentation-basics', 'true_false', H,
    'The same three strong points about a proposal are arranged once with the weakest point first and once with the strongest, most specific point placed first for immediate impact. Does the order change how convincing the argument feels, given identical points?',
    'Yes — placement affects emphasis; the same points in a different order can feel more or less convincing, so organization matters even when the points themselves are good',
    'No — argument organization doesn\'t matter as long as the points themselves are good',
    'eng.composition.argumentation-basics:MC-B-ARGUMENT-ORGANIZATION-DOESNT-MATTER-AS-LONG-AS-THE-POINTS-ARE-GOOD',
    'MC-B-..., re-asked with a weakest-first-vs-strongest-first framing rather than the existing random-vs-strongest-last framing'),
]
