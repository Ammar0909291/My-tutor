/**
 * ENGLISH PROBE-CONTRACT CAMPAIGN — Batch 5.
 *
 * SCOPE: closes out the remaining eng.writing domain (all 11 concepts
 * left below depth 4) + the first 14 eng.literature concepts,
 * alphabetically, from the 25 still below depth 4. All 25 re-measured
 * at closed=2 (mcq x1 + misconception_probe x1) directly from the seed
 * corpus in git before authoring (zero DB access, zero egress — see
 * the inventory script run this session). Every one confirmed to
 * already carry two genuine, distinct, ACTIVE misconception ids on its
 * existing probes — the stop-condition check passed for all 25; none
 * were skipped, none required new Educational Brain authoring.
 *
 * Each concept goes straight from depth 2 to depth 4 — TWO new probes,
 * the same resilience target established across Batches 1-4.
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
 * existing probes: MIDDLE for outlining-and-planning, paragraph-
 * structure, persuasive-writing-basics, sentence-writing, spelling-
 * strategies, supporting-details, the-writing-process, topic-sentences,
 * transitions-and-cohesion, character-development, drama-basics,
 * narrative-elements; HIGH for revising-for-content, thesis-statements,
 * comparative-literature-intro, dramatic-structure, foreshadowing-and-
 * suspense, imagery, irony, literary-criticism-intro, literary-devices-
 * overview, literary-genres-overview, literary-periods-survey,
 * metaphor-and-simile, meter-and-rhyme.
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

export const ENGLISH_PROBE_BATCH_5: SeedProbe[] = [
  // ─── eng.writing.outlining-and-planning (MIDDLE) ───────────────────────
  probe('eng.writing.outlining-and-planning', 'checkpoint', M,
    'A student sketches their essay\'s structure as a simple web/mind-map with connecting lines instead of a formal Roman-numeral outline. Does only the Roman-numeral version "count" as real planning?',
    'No — any format that genuinely organizes ideas logically before drafting satisfies outlining\'s real purpose; the formal format is just one tool among several',
    'Yes — an outline must be a rigid, formal Roman-numeral list',
    'eng.writing.outlining-and-planning:MC-AN-OUTLINE-MUST-BE-A-RIGID-FORMAL-ROMAN-NUMERAL-LIST',
    'MC-AN-OUTLINE-MUST-BE-A-RIGID-FORMAL-ROMAN-NUMERAL-LIST, re-asked with a web/mind-map example rather than the existing bullet-list example'),
  probe('eng.writing.outlining-and-planning', 'true_false', M,
    'Midway through drafting, a writer discovers a stronger opening example than the one planned in the outline. Should the writer force the draft to keep the originally-outlined example anyway?',
    'No — an outline is a flexible planning tool, not an unbreakable contract; discovering a better idea while drafting is a normal reason to revise it',
    'Yes — once an outline is made, it can\'t be changed during drafting',
    'eng.writing.outlining-and-planning:MC-ONCE-AN-OUTLINE-IS-MADE-IT-CANT-BE-CHANGED-DURING-DRAFTING',
    'MC-ONCE-AN-OUTLINE-IS-MADE-IT-CANT-BE-CHANGED-DURING-DRAFTING, re-asked with a stronger-example discovery rather than the existing evidence-reordering example'),

  // ─── eng.writing.paragraph-structure (MIDDLE) ──────────────────────────
  probe('eng.writing.paragraph-structure', 'checkpoint', M,
    'A "paragraph" has sentences about ocean currents, a specific beach, sea turtles, and boat safety. Is this a well-formed paragraph, since all sentences are broadly about the ocean?',
    'No — same general topic isn\'t enough; a paragraph needs ONE controlling idea that every sentence supports',
    'Yes — a paragraph is just a group of sentences about the same general topic',
    'eng.writing.paragraph-structure:MC-A-PARAGRAPH-IS-JUST-A-GROUP-OF-SENTENCES-ABOUT-THE-SAME-GENERAL-TOPIC',
    'MC-A-..., re-asked with an ocean-topic example rather than the existing dog-topic example'),
  probe('eng.writing.paragraph-structure', 'true_false', M,
    'A paragraph describes three problems with a plan, then opens with "The plan has several serious flaws." Is having the controlling idea appear first, rather than last, the only valid arrangement?',
    'No — the controlling idea can appear first, last, or stay implied, as long as it genuinely organizes every sentence; first is common but not the only valid placement',
    'Yes — a topic sentence must always be the first sentence of a paragraph',
    'eng.writing.paragraph-structure:MC-A-TOPIC-SENTENCE-MUST-ALWAYS-BE-THE-FIRST-SENTENCE',
    'MC-A-TOPIC-SENTENCE-MUST-ALWAYS-BE-THE-FIRST-SENTENCE, re-asked with a first-sentence example rather than the existing last-sentence example'),

  // ─── eng.writing.persuasive-writing-basics (MIDDLE) ────────────────────
  probe('eng.writing.persuasive-writing-basics', 'checkpoint', M,
    '"Homework is pointless! It\'s a complete waste of time and everyone knows it!!!" Does stating this with such intensity make it persuasive?',
    'No — persuasive strength comes from actual reasons a reader can weigh, not the volume or intensity of the wording',
    'Yes — stating an opinion forcefully or with strong language makes it persuasive',
    'eng.writing.persuasive-writing-basics:MC-A-STATING-AN-OPINION-FORCEFULLY-OR-WITH-STRONG-LANGUAGE-MAKES-IT-PERSUASIVE',
    'MC-A-..., re-asked with a homework example rather than the existing school-uniforms example'),
  probe('eng.writing.persuasive-writing-basics', 'true_false', M,
    '"The new park should be built because I would enjoy going there." Does this count as a genuine supporting reason?',
    'No — this just restates personal preference; a genuine reason must be something a neutral reader who doesn\'t share the preference could find compelling',
    'Yes — restating a personal preference counts as a reason',
    'eng.writing.persuasive-writing-basics:MC-B-RESTATING-A-PERSONAL-PREFERENCE-COUNTS-AS-A-REASON',
    'MC-B-..., re-asked with a park example rather than the existing uniforms example'),

  // ─── eng.writing.revising-for-content (HIGH) ───────────────────────────
  probe('eng.writing.revising-for-content', 'checkpoint', H,
    'A draft has flawless punctuation and spelling but its central argument contradicts itself halfway through. Does revising this draft mean checking its punctuation and spelling?',
    'No — revising for content means reconsidering the argument\'s logic and consistency; punctuation and spelling belong to the later editing stage',
    'Yes — revising means fixing surface errors like spelling and grammar',
    'eng.writing.revising-for-content:MC-REVISING-MEANS-FIXING-SURFACE-ERRORS-LIKE-SPELLING-AND-GRAMMAR',
    'MC-REVISING-MEANS-FIXING-SURFACE-ERRORS-LIKE-SPELLING-AND-GRAMMAR, re-asked with a self-contradicting argument rather than the existing disorganized-argument example'),
  probe('eng.writing.revising-for-content', 'true_false', H,
    'A short, tightly-written two-paragraph draft fully develops its single claim with strong evidence. Does its short length automatically mean it needs more content added during revision?',
    'No — length alone doesn\'t determine whether content revision is needed; a short draft that is fully developed can be content-complete, just as a long one can still have gaps',
    'Yes — a draft with enough words or paragraphs doesn\'t need content revision',
    'eng.writing.revising-for-content:MC-A-DRAFT-WITH-ENOUGH-WORDS-OR-PARAGRAPHS-DOESNT-NEED-CONTENT-REVISION',
    'MC-A-..., re-asked with a short-but-complete draft rather than the existing long-but-repetitive draft'),

  // ─── eng.writing.sentence-writing (MIDDLE) ─────────────────────────────
  probe('eng.writing.sentence-writing', 'checkpoint', M,
    'Is "Because the storm knocked out the power." a complete sentence, since it starts with a capital letter and ends with a period?',
    'No — it has no independent clause; "because" leaves it dependent, so capitalization and punctuation alone don\'t make it complete',
    'Yes — a capital letter and a period are all that\'s needed to make a sentence complete',
    'eng.writing.sentence-writing:MC-A-SENTENCE-IS-COMPLETE-AS-LONG-AS-IT-HAS-A-CAPITAL-LETTER-AND-A-PERIOD',
    'MC-A-..., re-asked with a "because" fragment rather than the existing "Running through the park" fragment'),
  probe('eng.writing.sentence-writing', 'true_false', M,
    'Is stuffing a sentence with extra clauses and qualifiers always a sign of more advanced, better writing than a short, direct sentence saying the same thing?',
    'No — clarity and precision matter more than length; unnecessary padding usually weakens writing rather than elevating it',
    'Yes — longer sentences always signal more sophisticated, better writing',
    'eng.writing.sentence-writing:MC-LONGER-SENTENCES-ARE-ALWAYS-BETTER-WRITING',
    'MC-LONGER-SENTENCES-ARE-ALWAYS-BETTER-WRITING, re-asked with a clause-stuffing framing rather than the existing generic-padding framing'),

  // ─── eng.writing.spelling-strategies (MIDDLE) ──────────────────────────
  probe('eng.writing.spelling-strategies', 'checkpoint', M,
    'Is the best way to spell "sunset" to memorize each of its 6 letters as an unrelated sequence?',
    'No — "sun" and "set" are both words you already know how to spell; recognizing the compound is far more efficient than pure letter-by-letter memorization',
    'Yes — every word must be memorized letter by letter, since spelling is arbitrary',
    'eng.writing.spelling-strategies:MC-SPELLING-IS-PURE-MEMORIZATION',
    'MC-SPELLING-IS-PURE-MEMORIZATION, re-asked with "sunset" rather than the existing "napkin" example'),
  probe('eng.writing.spelling-strategies', 'true_false', M,
    'If you sound out the /oʊ/ sound in "though" and it could plausibly be spelled "tho," "thoe," or "though," does sounding-out alone tell you which one is correct?',
    'No — sounding out narrows the options, but you need visual memory or word-family knowledge to pick the actual correct spelling',
    'Yes — sounding out a word always gives you the one correct spelling',
    'eng.writing.spelling-strategies:MC-SOUNDING-OUT-ALWAYS-GIVES-CORRECT-SPELLING',
    'MC-SOUNDING-OUT-ALWAYS-GIVES-CORRECT-SPELLING, re-asked with "though" rather than the existing "eight" example'),

  // ─── eng.writing.supporting-details (MIDDLE) ───────────────────────────
  probe('eng.writing.supporting-details', 'checkpoint', M,
    'The topic sentence is "The new coach transformed the team\'s defense." Does the true fact "The team plays its home games on Tuesdays" count as a supporting detail here?',
    'No — it\'s true about the team but doesn\'t support the specific claim about the coach\'s defensive impact; a supporting detail must develop the specific claim',
    'Yes — any true statement about the topic counts as a supporting detail',
    'eng.writing.supporting-details:MC-ANY-TRUE-STATEMENT-ABOUT-THE-TOPIC-COUNTS-AS-A-SUPPORTING-DETAIL',
    'MC-ANY-TRUE-STATEMENT-ABOUT-THE-TOPIC-COUNTS-AS-A-SUPPORTING-DETAIL, re-asked with a coach/defense example rather than the existing dog-breed example'),
  probe('eng.writing.supporting-details', 'true_false', M,
    'Does piling on as many supporting details as possible (say, 8 brief ones) always make a paragraph more convincing than using 3 fully-developed ones?',
    'No — 3 well-chosen, well-developed details are usually more convincing than 8 brief, underdeveloped ones; quality and development matter more than quantity',
    'Yes — more supporting details always makes a paragraph stronger',
    'eng.writing.supporting-details:MC-MORE-SUPPORTING-DETAILS-ALWAYS-MAKES-A-PARAGRAPH-STRONGER',
    'MC-MORE-SUPPORTING-DETAILS-ALWAYS-MAKES-A-PARAGRAPH-STRONGER, re-asked with 8-vs-3 rather than the existing 6-vs-3 comparison'),

  // ─── eng.writing.the-writing-process (MIDDLE) ──────────────────────────
  probe('eng.writing.the-writing-process', 'checkpoint', M,
    'An experienced journalist rewrote a front-page article five separate times before it was approved for print. Does needing this many rewrites mean the journalist lacks skill?',
    'No — even the most skilled writers go through multiple drafts and revision; this is simply how all serious writing gets made, not a sign of inadequate skill',
    'Yes — good writers produce a finished piece in one pass',
    'eng.writing.the-writing-process:MC-GOOD-WRITERS-PRODUCE-A-FINISHED-PIECE-IN-ONE-PASS',
    'MC-GOOD-WRITERS-PRODUCE-A-FINISHED-PIECE-IN-ONE-PASS, re-asked with a journalist/front-page example rather than the existing published-author example'),
  probe('eng.writing.the-writing-process', 'true_false', M,
    'A draft has flawless spelling and grammar but its paragraphs are in a confusing, illogical order. Would fixing the grammar solve this draft\'s real problem?',
    'No — revising and editing are different jobs; a paragraph-order problem needs revision, not editing',
    'Yes — editing and revising are the same thing',
    'eng.writing.the-writing-process:MC-EDITING-AND-REVISING-ARE-THE-SAME-THING',
    'MC-EDITING-AND-REVISING-ARE-THE-SAME-THING, re-asked with a paragraph-order problem rather than the existing organization/clarity framing'),

  // ─── eng.writing.thesis-statements (HIGH) ──────────────────────────────
  probe('eng.writing.thesis-statements', 'checkpoint', H,
    '"In this essay I will discuss the effects of climate change." Is this a strong thesis statement?',
    'No — it only announces the topic exists; it makes no actual claim a reader could agree or disagree with',
    'Yes — stating the essay\'s topic clearly is exactly what a thesis statement needs to do',
    'eng.writing.thesis-statements:MC-A-THESIS-IS-JUST-THE-TOPIC-ANNOUNCEMENT',
    'MC-A-THESIS-IS-JUST-THE-TOPIC-ANNOUNCEMENT, re-asked with a climate-change example rather than the existing American-Revolution example'),
  probe('eng.writing.thesis-statements', 'true_false', H,
    '"Technology is harmful." This is clearly an opinion. Does having an opinion alone make it a well-formed thesis for a standard multi-paragraph essay?',
    'No — it\'s too broad; listing its possible body paragraphs (attention spans, privacy, social isolation, misinformation...) produces an unmanageable, sprawling list no single essay could cover',
    'Yes — a thesis just needs to be an opinion; any arguable statement works regardless of how broad or narrow it is',
    'eng.writing.thesis-statements:MC-B-THESIS-JUST-NEEDS-TO-BE-AN-OPINION',
    'MC-B-THESIS-JUST-NEEDS-TO-BE-AN-OPINION, re-asked with a technology example rather than the existing social-media example'),

  // ─── eng.writing.topic-sentences (MIDDLE) ──────────────────────────────
  probe('eng.writing.topic-sentences', 'checkpoint', M,
    'Does "This paragraph will discuss volunteering" give the reader a specific claim to expect, or just name the subject?',
    'Just names the subject — a real topic sentence must state a specific claim, not merely announce the topic',
    'It\'s a fine topic sentence — a topic sentence just announces the topic rather than making a claim',
    'eng.writing.topic-sentences:MC-A-TOPIC-SENTENCE-JUST-ANNOUNCES-THE-TOPIC-RATHER-THAN-MAKING-A-CLAIM',
    'MC-A-..., re-asked with a volunteering example rather than the existing recycling example'),
  probe('eng.writing.topic-sentences', 'true_false', M,
    'Should a topic sentence be written as broadly as possible so it can technically "apply" to any detail the writer might later add?',
    'No — a specific, focused claim previews the paragraph\'s actual content far better than an overly broad one that could apply to almost anything',
    'Yes — a topic sentence must be very general and vague to cover everything',
    'eng.writing.topic-sentences:MC-A-TOPIC-SENTENCE-MUST-BE-VERY-GENERAL-AND-VAGUE-TO-COVER-EVERYTHING',
    'MC-A-TOPIC-SENTENCE-MUST-BE-VERY-GENERAL-AND-VAGUE-TO-COVER-EVERYTHING, re-asked with a "technically applies" framing rather than the existing "cover every detail" framing'),

  // ─── eng.writing.transitions-and-cohesion (MIDDLE) ─────────────────────
  probe('eng.writing.transitions-and-cohesion', 'checkpoint', M,
    '"She studied all night. However, she passed the test easily." Does "however" correctly signal the relationship between these two sentences?',
    'No — passing after studying is an expected consequence, not a contrast; "as a result" would correctly signal the actual cause-effect relationship',
    'Yes — any transition word can be inserted anywhere to improve flow',
    'eng.writing.transitions-and-cohesion:MC-ANY-TRANSITION-WORD-CAN-BE-INSERTED-ANYWHERE-TO-IMPROVE-FLOW',
    'MC-ANY-TRANSITION-WORD-CAN-BE-INSERTED-ANYWHERE-TO-IMPROVE-FLOW, re-asked with a studied/passed example rather than the existing practiced/won example'),
  probe('eng.writing.transitions-and-cohesion', 'true_false', M,
    '"The bridge collapsed suddenly. Engineers had warned officials for years." has almost no transition words. Does this mean the passage lacks cohesion?',
    'No — cohesion also comes from repeated terms ("bridge"/"engineers"), logical sequencing, and implied contrast; transition words are only one of several cohesive devices',
    'Yes — cohesion only happens at the beginning of sentences with transition words',
    'eng.writing.transitions-and-cohesion:MC-COHESION-ONLY-HAPPENS-AT-THE-BEGINNING-OF-SENTENCES-WITH-TRANSITION-WORDS',
    'MC-COHESION-ONLY-HAPPENS-AT-THE-BEGINNING-OF-SENTENCES-WITH-TRANSITION-WORDS, re-asked with a bridge-collapse example rather than the existing volcano example'),

  // ─── eng.literature.character-development (MIDDLE) ─────────────────────
  probe('eng.literature.character-development', 'checkpoint', M,
    'A character quietly gives up their own seat on a crowded bus to an elderly stranger, with no narrator statement calling them "kind." Does this reveal a character trait?',
    'Yes — kindness is revealed through the character\'s action, even without a direct label; traits are most often shown, not told',
    'No — a trait is only genuine if the author directly states it',
    'eng.literature.character-development:MC-A-CHARACTERS-TRAITS-ARE-DIRECTLY-STATED-BY-THE-AUTHOR',
    'MC-A-..., re-asked with a bus-seat example rather than the existing burning-building example'),
  probe('eng.literature.character-development', 'true_false', M,
    'A character becomes noticeably more honest with their closest friend by the story\'s end, but still lies freely to strangers and coworkers. Does this count as real character growth?',
    'Yes — partial, specific growth in one relationship is genuine character development, not "no growth"',
    'No — a character either changes completely or doesn\'t change at all',
    'eng.literature.character-development:MC-A-CHARACTER-EITHER-CHANGES-COMPLETELY-OR-NOT-AT-ALL',
    'MC-A-CHARACTER-EITHER-CHANGES-COMPLETELY-OR-NOT-AT-ALL, re-asked with an honesty/friend example rather than the existing patience/sibling example'),

  // ─── eng.literature.comparative-literature-intro (HIGH) ────────────────
  probe('eng.literature.comparative-literature-intro', 'checkpoint', H,
    'Two literary traditions with no documented historical contact both feature a trickster figure who outwits stronger opponents. Must this mean one tradition directly influenced the other?',
    'No — with no documented contact, the similarity more likely reflects independent, convergent development around a shared human concern',
    'Yes — any similarity between works from different traditions means one directly influenced the other',
    'eng.literature.comparative-literature-intro:MC-A-ANY-SIMILARITY-BETWEEN-WORKS-FROM-DIFFERENT-TRADITIONS-MEANS-ONE-DIRECTLY-INFLUENCED-THE-OTHER',
    'MC-A-..., re-asked with a trickster-figure example rather than the existing coming-of-age example'),
  probe('eng.literature.comparative-literature-intro', 'true_false', H,
    'Two works from different cultures both explore loss of homeland. Is it accurate to say they "share a theme," full stop, without examining how each culture\'s specific history shapes what that loss means?',
    'No — genuine comparison must hold both the real similarity and the real, culturally-rooted differences in view; stopping at "same theme" flattens meaningful distinctions',
    'Yes — comparing literature across cultures means ignoring or flattening out the real differences between them',
    'eng.literature.comparative-literature-intro:MC-B-COMPARING-LITERATURE-ACROSS-CULTURES-MEANS-IGNORING-OR-FLATTENING-OUT-THE-REAL-DIFFERENCES-BETWEEN-THEM',
    'MC-B-..., re-asked with a loss-of-homeland example rather than the existing family-duty example'),

  // ─── eng.literature.drama-basics (MIDDLE) ───────────────────────────────
  probe('eng.literature.drama-basics', 'checkpoint', M,
    '"Fine." reads very differently with the stage direction "[She slams the door before he can respond.]" added. Is this stage direction just optional decoration, like a descriptive flourish in a story?',
    'No — since drama has no narrator, stage directions are often the only way to convey tone and emotion; this one changes the entire interpretation',
    'Yes — stage directions are skippable extra details, similar to descriptions in prose fiction',
    'eng.literature.drama-basics:MC-STAGE-DIRECTIONS-ARE-JUST-OPTIONAL-EXTRA-DETAILS-LIKE-DESCRIPTIONS-IN-A-STORY',
    'MC-STAGE-DIRECTIONS-ARE-JUST-OPTIONAL-EXTRA-DETAILS-LIKE-DESCRIPTIONS-IN-A-STORY, re-asked with a door-slam stage direction rather than the existing calm-tone stage direction'),
  probe('eng.literature.drama-basics', 'true_false', M,
    'In prose, a narrator can write "He regretted the decision the moment he made it." How would a playwright convey that same private regret in a play?',
    'Through a device unique to drama, like a soliloquy, an aside, a revealing line of dialogue, or a stage direction — since there is no narrator to state it directly',
    'The same way — drama is just a story with the quotation marks removed, so the narrator can state it directly too',
    'eng.literature.drama-basics:MC-A-PLAY-IS-JUST-A-STORY-WRITTEN-WITH-QUOTATION-MARKS-REMOVED',
    'MC-A-PLAY-IS-JUST-A-STORY-WRITTEN-WITH-QUOTATION-MARKS-REMOVED, re-asked with a regret example rather than the existing forgiveness example'),

  // ─── eng.literature.dramatic-structure (HIGH) ───────────────────────────
  probe('eng.literature.dramatic-structure', 'checkpoint', H,
    'Does a scene change within an act serve the same function as a chapter break in a novel?',
    'No — a scene change often shifts location or time within a continuous live performance, a function distinct from an individually-paced chapter break in a novel a reader can pause anywhere',
    'Yes — acts and scenes are just arbitrary divisions like chapters, with no special function',
    'eng.literature.dramatic-structure:MC-A-ACTS-AND-SCENES-ARE-JUST-ARBITRARY-DIVISIONS-LIKE-CHAPTERS-IN-A-NOVEL-WITH-NO-SPECIAL-FUNCTION',
    'MC-A-..., re-asked with a scene-change example rather than the existing act-break example'),
  probe('eng.literature.dramatic-structure', 'true_false', H,
    'Does the opening scene of a play build tension in exactly the same way as its climactic final scene?',
    'No — different scenes serve different structural functions (establishing context, escalating, releasing tension, climax), like varied songs on a concert setlist',
    'Yes — every scene builds tension identically, with no variation in function',
    'eng.literature.dramatic-structure:MC-B-DRAMATIC-TENSION-BUILDS-AND-RESOLVES-IN-EXACTLY-THE-SAME-WAY-ACROSS-EVERY-SCENE-WITH-NO-VARIATION-IN-FUNCTION',
    'MC-B-..., re-asked with an opening-vs-climax framing rather than the existing generic "every scene" framing'),

  // ─── eng.literature.foreshadowing-and-suspense (HIGH) ───────────────────
  probe('eng.literature.foreshadowing-and-suspense', 'checkpoint', H,
    'Is "He had no idea this ordinary Tuesday would change everything" an example of foreshadowing?',
    'No — this is an explicit flash-forward, stating that change is coming directly; genuine foreshadowing is subtle and only makes sense in retrospect',
    'Yes — any early mention of a later event counts as foreshadowing',
    'eng.literature.foreshadowing-and-suspense:MC-A-ANY-EARLY-MENTION-OF-A-LATER-EVENT-COUNTS-AS-FORESHADOWING',
    'MC-A-..., re-asked with an "ordinary Tuesday" flash-forward rather than the existing "last time she saw her hometown" example'),
  probe('eng.literature.foreshadowing-and-suspense', 'true_false', H,
    'The reader knows a character\'s letter was intercepted and never delivered, but the character keeps expecting a reply that will never come. Is this suspense or dramatic irony?',
    'Dramatic irony — the reader knows something the character doesn\'t, the opposite information structure from suspense',
    'Suspense and dramatic irony are the same technique, since both create tension',
    'eng.literature.foreshadowing-and-suspense:MC-B-SUSPENSE-AND-DRAMATIC-IRONY-ARE-THE-SAME-TECHNIQUE-BOTH-CREATE-TENSION-BY-TELLING-THE-READER-SOMETHING',
    'MC-B-..., re-asked with an intercepted-letter example rather than the existing hidden-villain example'),

  // ─── eng.literature.imagery (HIGH) ───────────────────────────────────────
  probe('eng.literature.imagery', 'checkpoint', H,
    '"The cold, wet grass soaked through her thin socks with every step" contains no metaphor or simile. Does it still count as imagery?',
    'Yes — imagery requires vivid sensory appeal, not figurative language; precise literal sensory description is genuine imagery too',
    'No — imagery must be figurative, using metaphor or simile to count',
    'eng.literature.imagery:MC-A-IMAGERY-MUST-BE-FIGURATIVE-USING-METAPHOR-OR-SIMILE-TO-COUNT',
    'MC-A-..., re-asked with a cold-wet-grass example rather than the existing burnt-toast example'),
  probe('eng.literature.imagery', 'true_false', H,
    'You identify a piece of imagery as "appealing to touch." Is naming the sense the complete analytical task?',
    'No — you must also explain the specific mood, atmosphere, or emphasis the sensory detail creates in context; naming the sense is only the first step',
    'Yes — identifying which sense imagery appeals to is the whole analytical task',
    'eng.literature.imagery:MC-B-IDENTIFYING-WHICH-SENSE-IMAGERY-APPEALS-TO-IS-THE-WHOLE-ANALYTICAL-TASK',
    'MC-B-IDENTIFYING-WHICH-SENSE-IMAGERY-APPEALS-TO-IS-THE-WHOLE-ANALYTICAL-TASK, re-asked with "touch" rather than the existing "smell" example'),

  // ─── eng.literature.irony (HIGH) ────────────────────────────────────────
  probe('eng.literature.irony', 'checkpoint', H,
    'A person forgets their umbrella and it rains on the way home. Is this situational irony?',
    'No — it\'s unlucky, but there\'s no meaningful, pointed contrast with anything the situation represents; not every unlucky event is situational irony',
    'Yes — any unexpected or unlucky event is situational irony',
    'eng.literature.irony:MC-A-ANY-UNEXPECTED-OR-UNLUCKY-EVENT-IS-SITUATIONAL-IRONY',
    'MC-A-..., re-asked with a forgotten-umbrella example rather than the existing car-breakdown example'),
  probe('eng.literature.irony', 'true_false', H,
    'Caught in a sudden downpour with no umbrella, a character says gently to herself, "Well, this is just perfect," with a small, resigned smile — no mockery aimed at anyone. Is this exactly the same thing as sarcasm?',
    'No — it\'s verbal irony (saying the opposite of what\'s meant) without mockery; sarcasm is specifically the mocking, often cutting subset of verbal irony',
    'Yes — verbal irony is exactly the same thing as sarcasm',
    'eng.literature.irony:MC-B-VERBAL-IRONY-IS-EXACTLY-THE-SAME-THING-AS-SARCASM',
    'MC-B-..., re-asked with a rain/no-umbrella example rather than the existing marathon-teasing example'),

  // ─── eng.literature.literary-criticism-intro (HIGH) ─────────────────────
  probe('eng.literature.literary-criticism-intro', 'checkpoint', H,
    'A feminist reading and a Marxist reading of the same novel reach different conclusions. Must one of them be the single correct interpretation and the other wrong?',
    'No — each critical approach asks a genuinely different question about the text; different, complementary readings can both be legitimately valid',
    'Yes — there is one single correct interpretation of a text that criticism uncovers',
    'eng.literature.literary-criticism-intro:MC-A-THERE-IS-ONE-SINGLE-CORRECT-INTERPRETATION-OF-A-TEXT-THAT-CRITICISM-UNCOVERS',
    'MC-A-..., re-asked with a feminist/Marxist-reading pair rather than the existing historical/formalist pair'),
  probe('eng.literature.literary-criticism-intro', 'true_false', H,
    'A student writes "I loved this book, it was so exciting" with no reference to any specific textual feature. Does this count as a valid reader-response interpretation?',
    'No — reader-response criticism requires connecting the reaction to a specific textual feature; an ungrounded reaction is just an unsupported opinion',
    'Yes — any personal reaction to a text counts as a valid reader-response interpretation',
    'eng.literature.literary-criticism-intro:MC-B-ANY-PERSONAL-REACTION-TO-A-TEXT-COUNTS-AS-A-VALID-READER-RESPONSE-INTERPRETATION',
    'MC-B-..., re-asked with a positive-but-ungrounded reaction rather than the existing negative-but-ungrounded reaction'),

  // ─── eng.literature.literary-devices-overview (HIGH) ────────────────────
  probe('eng.literature.literary-devices-overview', 'checkpoint', H,
    'Is correctly saying "that\'s personification" about "The wind whispered through the trees" a complete piece of literary analysis?',
    'No — naming the device is only the first step; analysis requires explaining its specific effect and why the author chose it',
    'Yes — identifying and naming a device by name is the goal of literary analysis',
    'eng.literature.literary-devices-overview:MC-IDENTIFYING-A-DEVICE-BY-NAME-IS-THE-GOAL-OF-LITERARY-ANALYSIS',
    'MC-IDENTIFYING-A-DEVICE-BY-NAME-IS-THE-GOAL-OF-LITERARY-ANALYSIS, re-asked with a personification example rather than the existing metaphor example'),
  probe('eng.literature.literary-devices-overview', 'true_false', H,
    'A passage uses foreshadowing (an early, subtle hint the reader only recognizes as significant in hindsight). If the hint were removed and the later event simply happened without warning, would the passage lose only "cleverness," or something more?',
    'Something more — the passage would lose the reader\'s sense of an unfolding, connected pattern (the payoff of noticing the earlier hint), showing the device was doing real interpretive work',
    'Only cleverness — literary devices are decorative extras separate from a passage\'s real meaning',
    'eng.literature.literary-devices-overview:MC-LITERARY-DEVICES-ARE-DECORATIVE-EXTRAS-SEPARATE-FROM-MEANING',
    'MC-LITERARY-DEVICES-ARE-DECORATIVE-EXTRAS-SEPARATE-FROM-MEANING, re-asked with a foreshadowing example rather than the existing irony example'),

  // ─── eng.literature.literary-genres-overview (HIGH) ─────────────────────
  probe('eng.literature.literary-genres-overview', 'checkpoint', H,
    'A graphic novel uses prose-style narration boxes alongside comic-style illustrated panels. Must it be forced into exactly one genre category?',
    'No — hybrid works that blend genre techniques are a normal, legitimate part of literature, not classification failures',
    'Yes — a work must fit cleanly into exactly one genre category',
    'eng.literature.literary-genres-overview:MC-A-WORK-MUST-FIT-CLEANLY-INTO-EXACTLY-ONE-GENRE-CATEGORY',
    'MC-A-..., re-asked with a graphic-novel example rather than the existing prose-poem example'),
  probe('eng.literature.literary-genres-overview', 'true_false', H,
    'A piece of literary journalism uses a deliberate narrative arc, vivid scene-setting, and a distinctive narrative voice to cover a real news event. Does being nonfiction mean it has no genuine literary technique or craft?',
    'No — literary nonfiction deliberately uses many of fiction\'s techniques while remaining grounded in real events; factual grounding, not absence of craft, defines it',
    'Yes — nonfiction is just facts with no literary technique or craft',
    'eng.literature.literary-genres-overview:MC-NONFICTION-IS-JUST-FACTS-WITH-NO-LITERARY-TECHNIQUE-OR-CRAFT',
    'MC-NONFICTION-IS-JUST-FACTS-WITH-NO-LITERARY-TECHNIQUE-OR-CRAFT, re-asked with a literary-journalism example rather than the existing memoir example'),

  // ─── eng.literature.literary-periods-survey (HIGH) ──────────────────────
  probe('eng.literature.literary-periods-survey', 'checkpoint', H,
    'Modernism often breaks from linear narrative and traditional form. Should you learn this as an isolated fact with no connection to the Victorian era that preceded it?',
    'No — Modernism\'s formal experimentation developed partly as a reaction against Victorian convention and certainty; periods form a connected historical conversation',
    'Yes — literary periods are isolated categories with no connection to each other',
    'eng.literature.literary-periods-survey:MC-A-LITERARY-PERIODS-ARE-ISOLATED-CATEGORIES-WITH-NO-CONNECTION-TO-EACH-OTHER',
    'MC-A-..., re-asked with Modernism/Victorian rather than the existing Realism/Romanticism example'),
  probe('eng.literature.literary-periods-survey', 'true_false', H,
    'A work written during the Enlightenment doesn\'t emphasize reason or scientific thinking. Does this mean the period label is wrong?',
    'No — period characteristics describe dominant tendencies, not universal rules; individual works can blend influences or diverge from their era\'s dominant style',
    'Yes — every work from a given period perfectly fits that period\'s defining characteristics',
    'eng.literature.literary-periods-survey:MC-B-EVERY-WORK-FROM-A-GIVEN-PERIOD-PERFECTLY-FITS-THAT-PERIODS-DEFINING-CHARACTERISTICS',
    'MC-B-..., re-asked with an Enlightenment example rather than the existing Romantic-period example'),

  // ─── eng.literature.metaphor-and-simile (HIGH) ──────────────────────────
  probe('eng.literature.metaphor-and-simile', 'checkpoint', H,
    '"Her voice was velvet" (metaphor) and "Her voice was like velvet" (simile) both compare her voice to velvet. Is the ONLY difference between them the presence of the word "like"?',
    'No — the metaphor asserts the comparison boldly and directly as identity, while the simile explicitly signals a comparison; directness itself differs, not just the word',
    'Yes — the only difference between metaphor and simile is the word "like" or "as"',
    'eng.literature.metaphor-and-simile:MC-THE-ONLY-DIFFERENCE-BETWEEN-METAPHOR-AND-SIMILE-IS-THE-WORD-LIKE-OR-AS',
    'MC-THE-ONLY-DIFFERENCE-BETWEEN-METAPHOR-AND-SIMILE-IS-THE-WORD-LIKE-OR-AS, re-asked with a voice/velvet example rather than the existing city/jungle example'),
  probe('eng.literature.metaphor-and-simile', 'true_false', H,
    '"As the sun set, the birds returned to their nests." Is this sentence a simile because it contains the word "as"?',
    'No — "as" here means "while," not a figurative comparison; treating any sentence with "like" or "as" as a simile is a false generalization',
    'Yes — any comparison using "like" or "as" is a simile',
    'eng.literature.metaphor-and-simile:MC-ANY-COMPARISON-USING-LIKE-OR-AS-IS-A-SIMILE',
    'MC-ANY-COMPARISON-USING-LIKE-OR-AS-IS-A-SIMILE, re-asked with "As the sun set..." rather than the existing "As it was raining..." example'),

  // ─── eng.literature.meter-and-rhyme (HIGH) ───────────────────────────────
  probe('eng.literature.meter-and-rhyme', 'checkpoint', H,
    'A poem is written in free verse with no rhyme scheme at all. Must it therefore also have no meter?',
    'No — rhyme and meter vary independently; a poem can lack rhyme while still having a deliberate, patterned rhythm',
    'Yes — a poem with no rhyme must also have no meter',
    'eng.literature.meter-and-rhyme:MC-A-A-POEM-THAT-RHYMES-MUST-ALSO-HAVE-A-REGULAR-CONSISTENT-METER',
    'MC-A-..., re-asked with a no-rhyme/meter example rather than the existing rhymes/must-have-meter framing'),
  probe('eng.literature.meter-and-rhyme', 'true_false', H,
    'A poem maintains a consistent stress pattern throughout, but the final line breaks that pattern sharply to land on the poem\'s key word. Does this one deviation mean the poem has no meter?',
    'No — meter describes the dominant overall pattern; a single deliberate substitution for emphasis within an otherwise consistent pattern doesn\'t erase it',
    'Yes — any deviation from the dominant stress pattern means the poem has no meter',
    'eng.literature.meter-and-rhyme:MC-B-ANY-DEVIATION-FROM-THE-DOMINANT-STRESS-PATTERN-MEANS-THE-POEM-HAS-NO-METER',
    'MC-B-..., re-asked with a final-line-emphasis deviation rather than the existing single-line-substitution example'),

  // ─── eng.literature.narrative-elements (MIDDLE) ─────────────────────────
  probe('eng.literature.narrative-elements', 'checkpoint', M,
    'A story mentions a boy finding a hidden map, recalling that his uncle collects stamps, then using the map to find a buried box. Is "his uncle collects stamps" part of the plot?',
    'No — it is an incidental detail, not causally connected to the central conflict; the plot is the discovery and using the map',
    'Yes — the plot is everything that happens in the story',
    'eng.literature.narrative-elements:MC-PLOT-MEANS-EVERYTHING-THAT-HAPPENS-IN-THE-STORY',
    'MC-PLOT-MEANS-EVERYTHING-THAT-HAPPENS-IN-THE-STORY, re-asked with a hidden-map example rather than the existing old-key example'),
  probe('eng.literature.narrative-elements', 'true_false', M,
    'The same tense reunion is set once in a sunlit, flower-filled garden and once in a cramped, dimly-lit hallway. Is the setting "just background" in both cases?',
    'No — the setting actively shapes the mood and tension differently in each version, doing real narrative work beyond stating where/when',
    'Yes — setting is just a factual label of where and when the story happens',
    'eng.literature.narrative-elements:MC-SETTING-IS-JUST-WHERE-AND-WHEN-A-STORY-HAPPENS-WITH-NO-OTHER-EFFECT',
    'MC-SETTING-IS-JUST-WHERE-AND-WHEN-A-STORY-HAPPENS-WITH-NO-OTHER-EFFECT, re-asked with a garden/hallway example rather than the existing kitchen/building example'),
]
