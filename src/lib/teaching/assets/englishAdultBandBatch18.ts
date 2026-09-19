/**
 * ENGLISH ADULT-BAND PROBE-CONTRACT CAMPAIGN — Batch 18.
 *
 * ── THE GAP THIS CLOSES ─────────────────────────────────────────────────────
 * Batch 17 closed the campaign-history-flagged eng.grammar.* gap. This
 * batch closes all 19 short `eng.literature.*` concepts (the prior
 * estimate of "16 advanced" was stale — live `contract-audit.ts --all`
 * regeneration found 19, not 16; per this campaign's standing rule, never
 * trust a count in a history file, always regenerate): comparative-
 * literature-intro, dramatic-structure, foreshadowing-and-suspense,
 * imagery, irony, literary-criticism-intro, literary-devices-overview,
 * literary-genres-overview, literary-periods-survey, metaphor-and-simile,
 * meter-and-rhyme, novel-study, poetic-forms, poetry-basics, prose-fiction,
 * prose-nonfiction, short-story-study, symbolism, theme-and-message. 3 new
 * ADULT-band closed-choice probes each (57 total), the bare mastery-gate
 * contract (`correctAtCheck >= 1` + `correctAtPractice >= 2` = 3,
 * `assetContract.ts`). Remaining gap after this batch: `eng.phonetics.*`
 * (12 advanced), `eng.vocab.*` (9 advanced), `eng.writing.*` (9 advanced),
 * `eng.reading.reading-across-genres`, `eng.speaking.debate-skills`/
 * `presentation-skills`, and the 2 EARLY-band phonics pairs excluded per
 * Batch 13's own finding (voice-required), deferred to future batches (see
 * `docs/history/subject-onboarding-and-fix-campaign.md`).
 *
 * Every distractor carries the `misconceptionId` naming it, reusing ONE of
 * each concept's own two ALREADY-REGISTERED, ALREADY-ACTIVE misconceptions
 * (verified against each concept's Blueprint Component 1 — Misconception
 * Register: every one of these 19 concepts holds exactly two — no more, no
 * fewer; no new misconception ids invented, no Educational Brain
 * authoring). NOTE ON NAMING: unlike most prior batches, several of these
 * Blueprints label their two misconceptions with bare `MC-...` headings
 * rather than the `MC-A-.../MC-B-...` convention (e.g.
 * `literary-devices-overview`, `metaphor-and-simile`, `poetry-basics`,
 * `prose-fiction`, `symbolism`, `theme-and-message`) — the `adultLadder`
 * helper's `mcA`/`mcB` parameters below carry each concept's exact heading
 * text verbatim regardless of which naming convention that Blueprint uses;
 * the parameter names are positional labels only, not an assertion about
 * the source heading's own prefix. Structure otherwise mirrors
 * `englishAdultBandBatch13.ts`'s `adultLadder` helper exactly:
 * `mcq`(FOUNDATIONAL) + `misconception_probe`(DEVELOPING) +
 * `mcq`(PROFICIENT) per concept, so the ladder-aware slug resolver
 * (`buildProbeSlugResolver`) disambiguates the two `mcq` rungs by
 * difficulty without re-identifying any already-serving row. None of these
 * 19 concepts hold any existing ADULT probe today, so this is a fresh
 * singleton-to-ladder promotion within this batch only — no P-10 collision
 * risk against any pre-existing row.
 *
 * Register: adult/academic literary-analysis framing throughout — never
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

const COMPARATIVE_LITERATURE_INTRO_ADULT = adultLadder(
  'eng.literature.comparative-literature-intro',
  'MC-A-ANY-SIMILARITY-BETWEEN-WORKS-FROM-DIFFERENT-TRADITIONS-MEANS-ONE-DIRECTLY-INFLUENCED-THE-OTHER',
  'MC-B-COMPARING-LITERATURE-ACROSS-CULTURES-MEANS-IGNORING-OR-FLATTENING-OUT-THE-REAL-DIFFERENCES-BETWEEN-THEM',
  [
    {
      stem: 'A literature seminar finds that two epic traditions from regions with no documented historical contact both include a hero\'s symbolic descent into an underworld. Does this shared motif prove one tradition directly influenced the other?',
      correct: 'No — with no documented contact between the two traditions, this shared pattern more likely reflects independent, convergent development around a universal human concern (facing mortality), not direct borrowing',
      wrong: 'Yes — any shared narrative pattern between two literary traditions is sufficient proof that one tradition borrowed the motif directly from the other',
    },
    {
      stem: 'A comparative essay states "Novel A and Novel B are both about exile, so they\'re essentially the same story." Does this fully capture a genuine comparison between the two works?',
      correct: "No — this flattens real, culturally-rooted differences; a genuine comparison would also explore how each novel's distinct cultural context shapes what exile actually means and how it's experienced differently in each work",
      wrong: 'Yes — once a shared theme like exile is identified between two works, that shared theme is the complete basis for a genuine comparative analysis',
    },
    {
      stem: 'A different seminar finds two theater traditions, separated by centuries and continents with no documented trade or translation contact, independently developed a similar convention of masked performers representing fixed character types. Is convergent development, rather than direct influence, the more defensible explanation here too?',
      correct: "Yes — absent documented contact, a shared theatrical convention arising independently in two traditions is best explained by convergent development around similar performance needs, not assumed direct influence",
      wrong: "No — any two traditions sharing a similar theatrical convention must have had direct contact, since a coincidence this specific couldn't arise independently",
    },
  ],
  [
    'MC-A-ANY-SIMILARITY-BETWEEN-WORKS-FROM-DIFFERENT-TRADITIONS-MEANS-ONE-DIRECTLY-INFLUENCED-THE-OTHER, fresh adult example (two epic traditions\' underworld-descent motif) rather than the existing generic hero\'s-journey example',
    'MC-B-COMPARING-LITERATURE-ACROSS-CULTURES-MEANS-IGNORING-OR-FLATTENING-OUT-THE-REAL-DIFFERENCES-BETWEEN-THEM, fresh example (two novels sharing "exile") rather than the existing family-duty example',
    'MC-A-ANY-SIMILARITY-BETWEEN-WORKS-FROM-DIFFERENT-TRADITIONS-MEANS-ONE-DIRECTLY-INFLUENCED-THE-OTHER, second fresh example (a masked-performer convention) forming the ladder\'s third rung',
  ],
)

const DRAMATIC_STRUCTURE_ADULT = adultLadder(
  'eng.literature.dramatic-structure',
  'MC-A-ACTS-AND-SCENES-ARE-JUST-ARBITRARY-DIVISIONS-LIKE-CHAPTERS-IN-A-NOVEL-WITH-NO-SPECIAL-FUNCTION',
  'MC-B-DRAMATIC-TENSION-BUILDS-AND-RESOLVES-IN-EXACTLY-THE-SAME-WAY-ACROSS-EVERY-SCENE-WITH-NO-VARIATION-IN-FUNCTION',
  [
    {
      stem: 'A director places a play\'s act break at a moment of maximum unresolved tension, right before the audience\'s intermission. Is this act break functioning the same way a chapter break in a novel does?',
      correct: "No — the act break exploits a real, shared, simultaneous pause experienced by the whole live audience at once, a collective effect a novel's individually-paced chapter break doesn't replicate",
      wrong: 'Yes — act breaks and chapter breaks are both just organizational divisions with no special function tied to how the audience experiences them',
    },
    {
      stem: 'A student analyzes a play\'s opening scene (establishing the setting and relationships, low tension) and its mid-play confrontation scene (delivering a major conflict, high tension) as both simply "building tension" in the same generic way. Is this an accurate description of both scenes\' structural function?',
      correct: 'No — the two scenes serve different specific structural functions (context-establishing versus conflict-escalating); treating every scene as doing the same generic tension-building job misses how a play\'s scenes vary in their specific contribution to the whole',
      wrong: 'Yes — since both scenes are part of the same play building toward its climax, they are functioning identically, just at different points in the same tension-building process',
    },
    {
      stem: 'A streaming series ends an episode mid-cliffhanger, timed so viewers who watch weekly experience a real, collectively-timed wait for the next episode, unlike a viewer bingeing all at once. Does this episode break function more like a play\'s act break or a novel\'s chapter break?',
      correct: "More like a play's act break — when watched on a shared weekly release schedule, the break creates a real, collectively-experienced pause, the same kind of function that distinguishes a live act break from an individually-paced novel chapter break",
      wrong: "More like a novel's chapter break — since it's still just a structural division marking where one segment ends and the next begins, with no special function regardless of the viewing schedule",
    },
  ],
  [
    'MC-A-ACTS-AND-SCENES-ARE-JUST-ARBITRARY-DIVISIONS-LIKE-CHAPTERS-IN-A-NOVEL-WITH-NO-SPECIAL-FUNCTION, fresh adult example (a director\'s act-break placement) rather than the existing generic play/novel comparison',
    'MC-B-DRAMATIC-TENSION-BUILDS-AND-RESOLVES-IN-EXACTLY-THE-SAME-WAY-ACROSS-EVERY-SCENE-WITH-NO-VARIATION-IN-FUNCTION, fresh example (an opening scene vs. a confrontation scene) rather than the existing generic two-scenes example',
    'MC-A-ACTS-AND-SCENES-ARE-JUST-ARBITRARY-DIVISIONS-LIKE-CHAPTERS-IN-A-NOVEL-WITH-NO-SPECIAL-FUNCTION, second fresh example (a streaming series\' episode break) forming the ladder\'s third rung',
  ],
)

const FORESHADOWING_AND_SUSPENSE_ADULT = adultLadder(
  'eng.literature.foreshadowing-and-suspense',
  'MC-A-ANY-EARLY-MENTION-OF-A-LATER-EVENT-COUNTS-AS-FORESHADOWING',
  'MC-B-SUSPENSE-AND-DRAMATIC-IRONY-ARE-THE-SAME-TECHNIQUE-BOTH-CREATE-TENSION-BY-TELLING-THE-READER-SOMETHING',
  [
    {
      stem: 'An early chapter states directly, "She would not return to this office again." Is this explicit statement an example of foreshadowing?',
      correct: 'No — this is a direct, unambiguous flash-forward that spells out the future clearly; genuine foreshadowing works through a subtle detail whose significance only becomes clear in retrospect, not an explicit statement of what will happen',
      wrong: 'Yes — any early statement that tells the reader something about a later event, however explicit, counts as foreshadowing',
    },
    {
      stem: 'In a mystery, neither the reader nor the detective knows who committed the crime until the final chapter. Is this tension the same technique as a scene where the reader has already learned a letter was forged, but the character reading it doesn\'t know that?',
      correct: 'No — the first scenario is suspense (the reader shares the character\'s uncertainty), while the second is dramatic irony (the reader knows something the character doesn\'t); these are opposite information structures, not the same technique',
      wrong: 'Yes — since both scenarios create tension for the reader, suspense and dramatic irony are the same underlying technique just applied to different scenes',
    },
    {
      stem: 'A character repeatedly, without explanation, locks a specific desk drawer before leaving the office each day, a detail given no significance at the time. Much later, the drawer\'s contents become central to the plot. Is this earlier detail foreshadowing?',
      correct: 'Yes — this is a subtle, unexplained detail that only reveals its significance in retrospect once the later event occurs, exactly the retrospective, non-explicit quality that defines genuine foreshadowing',
      wrong: "No — since the detail wasn't explicitly connected to the later plot event when it was first mentioned, it can't count as foreshadowing at all",
    },
  ],
  [
    'MC-A-ANY-EARLY-MENTION-OF-A-LATER-EVENT-COUNTS-AS-FORESHADOWING, fresh adult example ("she would not return to this office again") rather than the existing generic hometown example',
    'MC-B-SUSPENSE-AND-DRAMATIC-IRONY-ARE-THE-SAME-TECHNIQUE-BOTH-CREATE-TENSION-BY-TELLING-THE-READER-SOMETHING, fresh example (a mystery vs. a forged letter) rather than the existing rescue/closet example',
    'MC-A-ANY-EARLY-MENTION-OF-A-LATER-EVENT-COUNTS-AS-FORESHADOWING, second fresh example (a locked desk drawer) forming the ladder\'s third rung',
  ],
)

const IMAGERY_ADULT = adultLadder(
  'eng.literature.imagery',
  'MC-A-IMAGERY-MUST-BE-FIGURATIVE-USING-METAPHOR-OR-SIMILE-TO-COUNT',
  'MC-B-IDENTIFYING-WHICH-SENSE-IMAGERY-APPEALS-TO-IS-THE-WHOLE-ANALYTICAL-TASK',
  [
    {
      stem: 'A passage reads: "The cold, damp concrete pressed against her bare feet." A student says this isn\'t imagery because it contains no metaphor or simile. Is this correct?',
      correct: 'No — this is entirely literal, precise sensory description, and literal sensory description is just as much imagery as a figurative comparison; imagery is defined by sensory vividness, not by requiring figurative language',
      wrong: "Yes — imagery requires a metaphor or simile to create a vivid sensory experience, so purely literal sensory description doesn't count as imagery",
    },
    {
      stem: 'An analysis of "the cold, damp concrete pressed against her bare feet" states only "this is imagery appealing to touch." Has this analysis completed the full analytical task?',
      correct: 'No — naming the sense is only the first step; the analysis still needs to explain the specific effect this touch imagery creates (discomfort, vulnerability, a jarring contrast) in this particular context',
      wrong: 'Yes — correctly identifying which of the five senses a piece of imagery appeals to is the complete analytical task required for literary analysis',
    },
    {
      stem: 'Revising an analysis of "the cold gripped her like a fist," a student notes this passage uses a simile to create imagery, then separately identifies "the cold, damp concrete pressed against her bare feet" as imagery too, despite it containing no figurative language at all. Has the student correctly applied the broader definition of imagery?',
      correct: 'Yes — recognizing that both figurative (simile) and purely literal sensory description count as imagery, as long as both vividly appeal to a sense, is exactly the correct, broader understanding of imagery',
      wrong: 'No — only the simile passage genuinely counts as imagery; the purely literal passage should not have been identified as imagery at all',
    },
  ],
  [
    'MC-A-IMAGERY-MUST-BE-FIGURATIVE-USING-METAPHOR-OR-SIMILE-TO-COUNT, fresh adult example ("cold, damp concrete") rather than the existing burnt-toast example',
    'MC-B-IDENTIFYING-WHICH-SENSE-IMAGERY-APPEALS-TO-IS-THE-WHOLE-ANALYTICAL-TASK, fresh example (the same concrete passage) rather than the existing burnt-toast analysis example',
    'MC-A-IMAGERY-MUST-BE-FIGURATIVE-USING-METAPHOR-OR-SIMILE-TO-COUNT, second fresh example (comparing a simile and a literal passage) forming the ladder\'s third rung',
  ],
)

const IRONY_ADULT = adultLadder(
  'eng.literature.irony',
  'MC-A-ANY-UNEXPECTED-OR-UNLUCKY-EVENT-IS-SITUATIONAL-IRONY',
  'MC-B-VERBAL-IRONY-IS-EXACTLY-THE-SAME-THING-AS-SARCASM',
  [
    {
      stem: 'A student calls a commuter missing their bus by three seconds "ironic," and separately calls a lifeguard who drowns while off duty "ironic." Do both of these scenarios involve the same kind of situational irony?',
      correct: "No — the lifeguard's death involves a meaningful, pointed contrast with what a lifeguard represents (someone who saves others from drowning); missing a bus by seconds is just bad luck, with no such meaningful contrast, so it isn't genuine situational irony",
      wrong: 'Yes — both scenarios are surprising and unlucky, and any surprising, unlucky event qualifies as situational irony regardless of whether it involves a specific, meaningful contrast',
    },
    {
      stem: 'A coworker says "Oh, I just LOVE Mondays," in a warm, joking tone to a friend who\'s also dragging through a Monday, with no intent to mock anyone. Is this verbal irony the same thing as sarcasm?',
      correct: "No — this is verbal irony (saying the opposite of what's literally meant) but it's gentle and affectionate, not mocking; sarcasm is specifically the mocking, often cutting subset of verbal irony, not identical to the broader category",
      wrong: 'Yes — verbal irony and sarcasm are exactly the same technique, so any instance of saying the opposite of what\'s meant is automatically sarcasm',
    },
    {
      stem: 'A student re-evaluates a scenario where a marriage counselor gets divorced, checking specifically what pointed contrast this involves before calling it ironic. Does this scenario involve the same kind of meaningful, pointed contrast the lifeguard example did?',
      correct: "Yes — a marriage counselor's own divorce involves a specific, meaningful contradiction with what their profession represents, exactly the kind of pointed contrast that defines genuine situational irony, unlike ordinary bad luck",
      wrong: "No — since the counselor's divorce is simply an unfortunate personal event, it doesn't involve any meaningful contrast and shouldn't be called ironic at all",
    },
  ],
  [
    'MC-A-ANY-UNEXPECTED-OR-UNLUCKY-EVENT-IS-SITUATIONAL-IRONY, fresh adult example (a missed bus vs. a drowned lifeguard) rather than the existing rainstorm/fire-station example',
    'MC-B-VERBAL-IRONY-IS-EXACTLY-THE-SAME-THING-AS-SARCASM, fresh example ("I just LOVE Mondays") rather than the existing marathon/GREAT-job example',
    'MC-A-ANY-UNEXPECTED-OR-UNLUCKY-EVENT-IS-SITUATIONAL-IRONY, second fresh example (a divorced marriage counselor) forming the ladder\'s third rung',
  ],
)

const LITERARY_CRITICISM_INTRO_ADULT = adultLadder(
  'eng.literature.literary-criticism-intro',
  'MC-A-THERE-IS-ONE-SINGLE-CORRECT-INTERPRETATION-OF-A-TEXT-THAT-CRITICISM-UNCOVERS',
  'MC-B-ANY-PERSONAL-REACTION-TO-A-TEXT-COUNTS-AS-A-VALID-READER-RESPONSE-INTERPRETATION',
  [
    {
      stem: 'A feminist reading of a novel focuses on how the text constructs gender roles, while a formalist reading of the same novel focuses purely on its narrative structure and imagery patterns, with no reference to gender at all. Are these two readings competing to find the one correct interpretation of the novel?',
      correct: "No — these are two different critical lenses asking two genuinely different questions about the same text; both can be legitimately valid at once because they're not actually competing for the same answer",
      wrong: 'Yes — since only one interpretation of a text can be objectively correct, the feminist and formalist readings must be competing, and one of them has to be wrong',
    },
    {
      stem: 'A student writes, "I found this novel\'s ending unsatisfying," with no further explanation. Does this count as a valid reader-response interpretation?',
      correct: 'No — reader-response criticism requires connecting a reaction back to a specific textual feature; an unsupported reaction with no connection to anything in the text is just a preference, not yet a critical interpretation',
      wrong: 'Yes — reader-response criticism is specifically about personal reactions, so any stated personal reaction to a text is automatically a valid reader-response interpretation',
    },
    {
      stem: 'A student revises their reading of a poem to include both a psychoanalytic interpretation (focused on the speaker\'s repressed anxiety) and a historical interpretation (focused on the poem\'s political context), presenting both as legitimate, non-competing insights. Is this the correct way to hold multiple critical readings together?',
      correct: 'Yes — recognizing that different critical approaches ask different questions and can produce simultaneously valid, complementary insights about the same text is exactly the correct understanding of literary criticism\'s pluralism',
      wrong: "No — since a text can only have one true interpretation, presenting two different readings as both legitimate means the student hasn't actually determined which one is correct",
    },
  ],
  [
    'MC-A-THERE-IS-ONE-SINGLE-CORRECT-INTERPRETATION-OF-A-TEXT-THAT-CRITICISM-UNCOVERS, fresh adult example (feminist vs. formalist readings) rather than the existing historical/formalist poem example',
    'MC-B-ANY-PERSONAL-REACTION-TO-A-TEXT-COUNTS-AS-A-VALID-READER-RESPONSE-INTERPRETATION, fresh example ("I found this ending unsatisfying") rather than the existing "I didn\'t like this story" example',
    'MC-A-THERE-IS-ONE-SINGLE-CORRECT-INTERPRETATION-OF-A-TEXT-THAT-CRITICISM-UNCOVERS, second fresh example (psychoanalytic and historical readings combined) forming the ladder\'s third rung',
  ],
)

const LITERARY_DEVICES_OVERVIEW_ADULT = adultLadder(
  'eng.literature.literary-devices-overview',
  'MC-IDENTIFYING-A-DEVICE-BY-NAME-IS-THE-GOAL-OF-LITERARY-ANALYSIS',
  'MC-LITERARY-DEVICES-ARE-DECORATIVE-EXTRAS-SEPARATE-FROM-MEANING',
  [
    {
      stem: 'A student\'s analysis of "the city was a machine, grinding through another day" reads only: "That\'s a metaphor." Does this complete the analytical task?',
      correct: 'No — naming the device is only the first step; the analysis still needs to explain what specific effect the metaphor creates (framing the city as an indifferent, mechanical, exhausting force) and why the author likely chose it',
      wrong: 'Yes — correctly identifying and naming a literary device is the complete goal of literary analysis',
    },
    {
      stem: 'A passage personifies an approaching storm as "stalking the coastline like a predator." A student calls this "just a decorative flourish" and imagines the passage would mean the same thing without it. Is this an accurate way to think about the device?',
      correct: "No — removing the personification would genuinely lose the passage's sense of menace and inevitability; the device isn't decoration sitting on top of the meaning, it's actively constructing the passage's meaning and effect",
      wrong: 'Yes — literary devices like personification are optional stylistic extras that make a passage sound nicer without actually changing what it means',
    },
    {
      stem: 'Revising the city-metaphor analysis to "this metaphor compares the city to a machine, framing its routine as indifferent and mechanical, which makes the exhaustion of city life feel systemic rather than personal," has the student completed the analytical task correctly?',
      correct: 'Yes — explaining the specific effect the device creates, beyond just naming it, is exactly what the second, essential half of literary analysis requires',
      wrong: "No — since the device (metaphor) was already correctly identified in the first version, adding an explanation of its effect doesn't change how complete the analysis is",
    },
  ],
  [
    'MC-IDENTIFYING-A-DEVICE-BY-NAME-IS-THE-GOAL-OF-LITERARY-ANALYSIS, fresh adult example ("the city was a machine") rather than the existing wildfire-anger metaphor example',
    'MC-LITERARY-DEVICES-ARE-DECORATIVE-EXTRAS-SEPARATE-FROM-MEANING, fresh example (a storm personified as a predator) rather than the existing irony/victory example',
    'MC-IDENTIFYING-A-DEVICE-BY-NAME-IS-THE-GOAL-OF-LITERARY-ANALYSIS, second fresh example (revising the city-metaphor analysis) forming the ladder\'s third rung',
  ],
)

const LITERARY_GENRES_OVERVIEW_ADULT = adultLadder(
  'eng.literature.literary-genres-overview',
  'MC-A-WORK-MUST-FIT-CLEANLY-INTO-EXACTLY-ONE-GENRE-CATEGORY',
  'MC-NONFICTION-IS-JUST-FACTS-WITH-NO-LITERARY-TECHNIQUE-OR-CRAFT',
  [
    {
      stem: 'A student encounters a "verse novel" — a book-length narrative written entirely in poetic verse rather than prose — and struggles to force it into exactly one clean genre category. Is treating this work as a legitimate hybrid, blending fiction\'s narrative scope with poetry\'s condensed language, a better approach than an artificial single-category classification?',
      correct: 'Yes — genre boundaries are often blurry, and hybrid works that deliberately blend techniques from multiple genres are a normal, legitimate part of literature, not classification failures requiring an artificial single label',
      wrong: 'No — every literary work must be classifiable into exactly one clean genre category, so the verse novel must ultimately be forced into either "fiction" or "poetry" alone',
    },
    {
      stem: 'A piece of narrative journalism uses vivid scene-setting, a deliberate narrative arc, and figurative language to report on a real event, in contrast to a plain wire-service report stating only the bare facts. Does the narrative journalism piece\'s status as nonfiction mean it lacks genuine literary craft?',
      correct: 'No — literary nonfiction can deliberately employ the same techniques as fiction (scene development, figurative language, structure) while remaining grounded in real events; being nonfiction is about factual grounding, not the absence of craft',
      wrong: 'Yes — since the piece is nonfiction, based on real events, it cannot involve genuine literary technique or craft the way fiction does',
    },
    {
      stem: 'A student encounters a "graphic memoir" (a real, factual life story told through comic-panel illustration and prose) and, instead of forcing it into "nonfiction" or "visual art" alone, identifies it as a legitimate hybrid blending memoir\'s factual reflection with the visual-narrative techniques of comics. Is this the correct approach?',
      correct: 'Yes — identifying which techniques from which forms a work blends, rather than forcing an artificial single-category label, is exactly the correct way to handle a genuinely hybrid work',
      wrong: "No — a work that mixes visual art with prose narrative cannot be considered literature at all, so it doesn't need to be classified into any literary genre",
    },
  ],
  [
    'MC-A-WORK-MUST-FIT-CLEANLY-INTO-EXACTLY-ONE-GENRE-CATEGORY, fresh adult example (a verse novel) rather than the existing prose-poem example',
    'MC-NONFICTION-IS-JUST-FACTS-WITH-NO-LITERARY-TECHNIQUE-OR-CRAFT, fresh example (narrative journalism) rather than the existing memoir-excerpt example',
    'MC-A-WORK-MUST-FIT-CLEANLY-INTO-EXACTLY-ONE-GENRE-CATEGORY, second fresh example (a graphic memoir) forming the ladder\'s third rung',
  ],
)

const LITERARY_PERIODS_SURVEY_ADULT = adultLadder(
  'eng.literature.literary-periods-survey',
  'MC-A-LITERARY-PERIODS-ARE-ISOLATED-CATEGORIES-WITH-NO-CONNECTION-TO-EACH-OTHER',
  'MC-B-EVERY-WORK-FROM-A-GIVEN-PERIOD-PERFECTLY-FITS-THAT-PERIODS-DEFINING-CHARACTERISTICS',
  [
    {
      stem: 'A student learns "Victorian literature values moral certainty and social convention" and "Modernism values fragmented narrative and psychological ambiguity" as two unrelated facts about two separate periods. Could Modernism\'s fragmented, ambiguous style be understood as a deliberate reaction against something Victorian literature was perceived to overdo?',
      correct: "Yes — literary movements typically develop partly in reaction to the movement immediately preceding them; Modernism's embrace of fragmentation and ambiguity can be read as a direct response against Victorian literature's perceived moral certainty and neat resolution",
      wrong: 'No — since Victorian literature and Modernism are officially labeled as two separate periods, there is no meaningful historical or reactive relationship connecting them',
    },
    {
      stem: 'A novel published squarely within the Victorian period\'s timeframe uses techniques usually associated with later Modernist writing (fragmented perspective, psychological ambiguity), diverging from typical Victorian conventions. Does simply being written during the Victorian period guarantee this novel displays every defining characteristic of Victorian literature?',
      correct: "No — period labels describe dominant tendencies during a timeframe, not universal requirements every work must obey; a work can diverge from or anticipate later trends while still being written within a given period's dates",
      wrong: "Yes — any work written during a period's official timeframe must display all of that period's defining characteristics, since the dates alone determine the work's characteristics",
    },
    {
      stem: 'A student maps three literary periods in sequence and writes one sentence for each transition explaining what the new movement seems to be reacting against or building on from the one before it. Is this the correct way to understand how literary periods relate to each other?',
      correct: "Yes — treating periods as a connected historical conversation, where each new movement partly defines itself against or in response to what came before, is exactly the correct way to understand their relationship",
      wrong: "No — since each period has its own separate defining characteristics, writing about how one period reacts against another only introduces confusion between otherwise independent categories",
    },
  ],
  [
    'MC-A-LITERARY-PERIODS-ARE-ISOLATED-CATEGORIES-WITH-NO-CONNECTION-TO-EACH-OTHER, fresh adult example (Victorian and Modernism) rather than the existing Romanticism/Realism example',
    'MC-B-EVERY-WORK-FROM-A-GIVEN-PERIOD-PERFECTLY-FITS-THAT-PERIODS-DEFINING-CHARACTERISTICS, fresh example (a Victorian-era novel anticipating Modernist technique) rather than the existing generic period-work example',
    'MC-A-LITERARY-PERIODS-ARE-ISOLATED-CATEGORIES-WITH-NO-CONNECTION-TO-EACH-OTHER, second fresh example (mapping three periods in sequence) forming the ladder\'s third rung',
  ],
)

const METAPHOR_AND_SIMILE_ADULT = adultLadder(
  'eng.literature.metaphor-and-simile',
  'MC-THE-ONLY-DIFFERENCE-BETWEEN-METAPHOR-AND-SIMILE-IS-THE-WORD-LIKE-OR-AS',
  'MC-ANY-COMPARISON-USING-LIKE-OR-AS-IS-A-SIMILE',
  [
    {
      stem: 'A student notices "The negotiation was a chess game" and "The negotiation was like a chess game" differ only by the word "like," and treats this purely as a spelling rule to spot rather than a meaningful difference. Does the presence or absence of "like" actually change something about how the comparison lands?',
      correct: 'Yes — the metaphor directly and boldly asserts identity ("was a chess game"), while the simile explicitly signals it\'s a comparison, not identity ("was like a chess game"); this difference in directness genuinely changes the rhetorical effect, not just the wording',
      wrong: 'No — the only thing that changes between the two sentences is the presence of the word "like," which is a purely mechanical spelling distinction with no effect on meaning or directness',
    },
    {
      stem: 'A student flags "As the meeting ran long, everyone grew restless" as a simile because it contains the word "as." Is this correctly identified as a simile?',
      correct: 'No — "as" here means "because," not a comparison at all; a simile requires "like" or "as" to function as a figurative comparison between two essentially unlike things, not every ordinary use of those words',
      wrong: 'Yes — any sentence containing the word "as" is a simile, regardless of what job that word is actually doing in the sentence',
    },
    {
      stem: 'Comparing "Her handshake was like her father\'s" (a literal comparison between two actual handshakes) and "He fought like a lion" (a figurative comparison between fighting and an animal\'s behavior), a student notes only the second is a genuine simile, since only it makes a figurative leap between essentially unlike things. Is this distinction correct?',
      correct: 'Yes — checking whether "like" is functioning as a figurative comparison between unlike things, rather than describing genuine, literal similarity between similar things, is exactly the correct test for identifying a true simile',
      wrong: 'No — since both sentences use the word "like" to compare two things, both must equally count as similes regardless of whether the comparison is figurative or literal',
    },
  ],
  [
    'MC-THE-ONLY-DIFFERENCE-BETWEEN-METAPHOR-AND-SIMILE-IS-THE-WORD-LIKE-OR-AS, fresh adult example ("the negotiation was a chess game") rather than the existing "her voice was music" example',
    'MC-ANY-COMPARISON-USING-LIKE-OR-AS-IS-A-SIMILE, fresh example ("as the meeting ran long") rather than the existing raining/"as" example',
    'MC-THE-ONLY-DIFFERENCE-BETWEEN-METAPHOR-AND-SIMILE-IS-THE-WORD-LIKE-OR-AS, second fresh example (handshake vs. lion comparisons) forming the ladder\'s third rung',
  ],
)

const METER_AND_RHYME_ADULT = adultLadder(
  'eng.literature.meter-and-rhyme',
  'MC-A-A-POEM-THAT-RHYMES-MUST-ALSO-HAVE-A-REGULAR-CONSISTENT-METER',
  'MC-B-ANY-DEVIATION-FROM-THE-DOMINANT-STRESS-PATTERN-MEANS-THE-POEM-HAS-NO-METER',
  [
    {
      stem: 'A poem has a clear, consistent ABAB rhyme scheme, but its lines vary noticeably in length and stress pattern from stanza to stanza. Does the poem\'s consistent rhyme scheme mean it must also have a regular, consistent meter?',
      correct: 'No — rhyme (sound repetition at line-ends) and meter (stress pattern within lines) are independent dimensions that can vary separately; a poem can have consistent rhyme without regular meter',
      wrong: 'Yes — a poem with a clear, consistent rhyme scheme must also have a regular, consistent meter, since the two always go together',
    },
    {
      stem: 'A sonnet is written in a consistent stress pattern across nearly every line, except for one line at a dramatic turning point where the stress is deliberately reversed for emphasis. Does this single variation mean the poem has no meter?',
      correct: 'No — occasional, deliberate metrical substitutions are a normal, often intentional part of how meter is used; meter describes the dominant, overall pattern across most of the poem, not an unbroken rule with zero exceptions',
      wrong: "Yes — any single line that deviates from the poem's otherwise dominant stress pattern proves the poem doesn't actually have meter at all",
    },
    {
      stem: 'A poet writes a poem with a genuinely regular, consistent meter throughout but no rhyme scheme at all (blank verse). Does the absence of rhyme here confirm that rhyme and meter are separate, independently varying elements?',
      correct: 'Yes — a poem having regular meter with no rhyme at all is further confirmation that meter and rhyme are independent dimensions of a poem that don\'t determine each other',
      wrong: 'No — a poem cannot have genuine meter without also having a rhyme scheme, so this poem\'s claim to regular meter must be inaccurate if it truly has no rhyme',
    },
  ],
  [
    'MC-A-A-POEM-THAT-RHYMES-MUST-ALSO-HAVE-A-REGULAR-CONSISTENT-METER, fresh adult example (an ABAB poem with irregular meter) rather than the existing AABB example',
    'MC-B-ANY-DEVIATION-FROM-THE-DOMINANT-STRESS-PATTERN-MEANS-THE-POEM-HAS-NO-METER, fresh example (a sonnet\'s single reversed stress) rather than the existing generic stressed/unstressed poem example',
    'MC-A-A-POEM-THAT-RHYMES-MUST-ALSO-HAVE-A-REGULAR-CONSISTENT-METER, second fresh example (blank verse) forming the ladder\'s third rung',
  ],
)

const NOVEL_STUDY_ADULT = adultLadder(
  'eng.literature.novel-study',
  'MC-A-A-NOVEL-IS-JUST-A-SHORT-STORY-STRETCHED-OUT-WITH-MORE-WORDS',
  'MC-B-A-NOVELS-THEME-CAN-BE-FULLY-UNDERSTOOD-FROM-ANY-SINGLE-PASSAGE-OR-CHAPTER',
  [
    {
      stem: 'A reader dismisses a novel\'s subplot about a minor shopkeeper character\'s own personal arc as "padding" since it doesn\'t directly advance the main romantic plot. Is this subplot necessarily padding?',
      correct: "No — this kind of fully developed secondary storyline is a legitimate structural possibility the novel's greater length allows, not padding; a short story wouldn't have room for it, but that doesn't make its presence in a novel a flaw",
      wrong: "Yes — since the subplot doesn't directly serve the main plot's central conflict, it must be unnecessary padding that a properly focused story would have cut",
    },
    {
      stem: 'After reading only the first chapter, a student concludes the novel\'s theme is "ambition always pays off," based on an early scene showing the protagonist\'s ambition succeeding. Does this early chapter give the complete picture of the novel\'s theme?',
      correct: "No — a novel's theme typically develops and deepens across its extended length; the early passage might suggest a simple theme, but the full, more nuanced picture only emerges by tracking how the theme is complicated or qualified by later chapters",
      wrong: "Yes — once a novel's theme is clearly suggested by an early passage, that establishes the complete, final theme regardless of what happens in later chapters",
    },
    {
      stem: 'A reader revises their view of the shopkeeper subplot, asking what it contributes (a thematic contrast to the main couple\'s romance, a fuller picture of the story\'s community) rather than assuming it\'s unnecessary. Is this a form-appropriate way to read the novel\'s structure?',
      correct: 'Yes — asking what a novel-length element contributes, rather than assuming any content not directly advancing the main plot is padding, is exactly the correct, form-appropriate way to read a novel\'s structure',
      wrong: "No — a subplot either advances the main plot or it doesn't belong in the story at all, regardless of what other function it might serve",
    },
  ],
  [
    'MC-A-A-NOVEL-IS-JUST-A-SHORT-STORY-STRETCHED-OUT-WITH-MORE-WORDS, fresh adult example (a shopkeeper subplot) rather than the existing generic secondary-character example',
    'MC-B-A-NOVELS-THEME-CAN-BE-FULLY-UNDERSTOOD-FROM-ANY-SINGLE-PASSAGE-OR-CHAPTER, fresh example ("ambition always pays off") rather than the existing "hard work leads to success" example',
    'MC-A-A-NOVEL-IS-JUST-A-SHORT-STORY-STRETCHED-OUT-WITH-MORE-WORDS, second fresh example (revising the shopkeeper-subplot judgment) forming the ladder\'s third rung',
  ],
)

const POETIC_FORMS_ADULT = adultLadder(
  'eng.literature.poetic-forms',
  'MC-A-A-POEMS-FORM-IS-JUST-A-LABEL-WITH-NO-EFFECT-ON-MEANING',
  'MC-B-FREE-VERSE-HAS-NO-FORM-OR-RULES-AT-ALL-SO-ITS-NOT-REALLY-CRAFTED',
  [
    {
      stem: 'A student identifies a poem as "a villanelle" and stops there, without considering how the form\'s repeating refrain lines might shape the poem\'s meaning. What would the poem lose if its repeating refrains were removed and it were rewritten as a single unstructured paragraph saying the same things?',
      correct: 'The poem would lose the obsessive, circling quality created specifically by the villanelle\'s repeating refrain lines returning again and again — that structural repetition is doing real work, not just naming a category',
      wrong: "Nothing meaningful — since the poem's content would stay the same, removing the villanelle's repeating structure and writing it as an unstructured paragraph wouldn't change anything about its actual meaning",
    },
    {
      stem: 'A student dismisses a free verse poem as "not really crafted" because it has no fixed rhyme or meter. Examining the poem, a specific line break isolates a single word alone on its own line for emphasis. Does the poem\'s lack of a fixed pattern mean this line break wasn\'t a deliberate choice?',
      correct: 'No — even without a pre-set rule, free verse poets make deliberate structural choices like this line break; the specific placement isolating that word for impact is a real, considered craft decision, not evidence of formlessness',
      wrong: "Yes — since free verse has no fixed rule to follow, any line break placement in it is essentially arbitrary and can't reflect genuine deliberate craft",
    },
    {
      stem: 'Revising their analysis of the villanelle, a student explains that the poem\'s returning refrain lines create a sense of obsessive, inescapable repetition that mirrors the speaker\'s own inability to let go of a memory. Has this revision correctly moved beyond treating form as just a label?',
      correct: 'Yes — explaining what the specific form allows the poem to do (here, mirroring obsessive repetition through structural repetition) is exactly the correct follow-up question that moves beyond simply naming the form',
      wrong: "No — since the poem is still correctly identified as a villanelle either way, adding an explanation of what the refrains do doesn't change how complete the analysis is",
    },
  ],
  [
    'MC-A-A-POEMS-FORM-IS-JUST-A-LABEL-WITH-NO-EFFECT-ON-MEANING, fresh adult example (a villanelle\'s refrains) rather than the existing sonnet-turn example',
    'MC-B-FREE-VERSE-HAS-NO-FORM-OR-RULES-AT-ALL-SO-ITS-NOT-REALLY-CRAFTED, fresh example (an isolated single-word line) rather than the existing generic line-break example',
    'MC-A-A-POEMS-FORM-IS-JUST-A-LABEL-WITH-NO-EFFECT-ON-MEANING, second fresh example (revising the villanelle analysis) forming the ladder\'s third rung',
  ],
)

const POETRY_BASICS_ADULT = adultLadder(
  'eng.literature.poetry-basics',
  'MC-POETRY-IS-JUST-PROSE-WRITTEN-WITH-LINE-BREAKS-IN-RANDOM-PLACES',
  'MC-ALL-POETRY-MUST-RHYME-AND-HAVE-A-STRICT-METER',
  [
    {
      stem: 'A poem reads "The train left— / without her." with a deliberate line break isolating "without her" on its own line. Is this line break just random visual chopping of what could equally be written as a continuous prose sentence?',
      correct: 'No — the line break creates a specific pause that isolates "without her" for emphasis, a deliberate structural choice controlling pacing and emphasis that the same words written as continuous prose wouldn\'t have',
      wrong: 'Yes — line breaks in poetry are essentially arbitrary places where the text happens to wrap, with no deliberate meaning behind their specific placement',
    },
    {
      stem: 'A student encounters a well-known free verse poem with no rhyme and no fixed metrical pattern and concludes it "doesn\'t count" as real poetry. Is this the correct standard for judging whether something is poetry?',
      correct: "No — rhyme and strict meter are options poets can choose, not requirements; free verse still uses poetry's core features (condensed, carefully chosen language, deliberate line breaks, heightened imagery), which is what actually makes it poetry",
      wrong: 'Yes — rhyme and a strict, regular meter are required features of genuine poetry, so a poem lacking both cannot really be considered poetry',
    },
    {
      stem: 'Revising an analysis of "The train left— / without her," a student notes that writing the same words as one continuous prose sentence would remove the isolating pause and emphasis the line break currently creates. Has this revision correctly demonstrated the deliberate function of the line break?',
      correct: 'Yes — showing specifically what would be lost (the isolating pause and emphasis) if the line break were removed is exactly the correct way to demonstrate that the break is a deliberate structural tool, not random chopping',
      wrong: "No — since the words themselves are identical whether written as a line-broken poem or a continuous prose sentence, there's no actual difference in effect to demonstrate",
    },
  ],
  [
    'MC-POETRY-IS-JUST-PROSE-WRITTEN-WITH-LINE-BREAKS-IN-RANDOM-PLACES, fresh adult example ("the train left— / without her") rather than the existing bird-flew-away example',
    'MC-ALL-POETRY-MUST-RHYME-AND-HAVE-A-STRICT-METER, fresh example (a generic well-known free verse poem) rather than the existing named-example comparison',
    'MC-POETRY-IS-JUST-PROSE-WRITTEN-WITH-LINE-BREAKS-IN-RANDOM-PLACES, second fresh example (revising the train analysis) forming the ladder\'s third rung',
  ],
)

const PROSE_FICTION_ADULT = adultLadder(
  'eng.literature.prose-fiction',
  'MC-A-SHORT-STORY-IS-JUST-A-SHORTER-VERSION-OF-A-NOVEL',
  'MC-PROSE-FICTION-MUST-ALWAYS-BE-COMPLETELY-REALISTIC-TO-BE-GOOD',
  [
    {
      stem: 'A reader criticizes a short story for having only one central conflict and two characters, wishing it had the scope of a novel. Is the short story "missing" content a "complete" story would have?',
      correct: "No — the short story is built around a different structural principle than a novel: a single unified effect achieved through a tightly-focused conflict and small cast; this focus is the form's actual strength, not a deficiency compared to a novel",
      wrong: 'Yes — a story with only one central conflict and two characters is an incomplete version of what a "real," novel-scale story should contain',
    },
    {
      stem: 'In a story, a character\'s guilt is represented by a shadow that literally won\'t leave them, rather than through realistic psychological description. Is this fantastical story less serious or less true about human experience than a purely realistic story on the same theme?',
      correct: 'No — the fantastical element can illuminate an emotional truth (persistent guilt) just as powerfully as strict realism, sometimes more so, by making an abstract feeling concrete and visible; realism is one legitimate mode among several, not a required standard',
      wrong: 'Yes — only strictly realistic prose fiction can be considered serious literature exploring genuine human truths, so a story using a fantastical device like this is inherently lesser',
    },
    {
      stem: 'A reader instead asks what the short story\'s tight focus on one conflict and two characters allows it to achieve that a broader, novel-scale treatment couldn\'t. Is this the correct way to evaluate the short story\'s scope?',
      correct: "Yes — asking what the compressed form allows the story to do well, rather than treating its scope as missing content, is exactly the correct, form-appropriate way to evaluate a short story",
      wrong: "No — a story's scope should always be evaluated by how much content and how many characters it includes, regardless of what form it's written in",
    },
  ],
  [
    'MC-A-SHORT-STORY-IS-JUST-A-SHORTER-VERSION-OF-A-NOVEL, fresh adult example (one conflict, two characters) rather than the existing generic plot-summary example',
    'MC-PROSE-FICTION-MUST-ALWAYS-BE-COMPLETELY-REALISTIC-TO-BE-GOOD, fresh example (a shadow representing guilt) rather than the existing shrinking-house example',
    'MC-A-SHORT-STORY-IS-JUST-A-SHORTER-VERSION-OF-A-NOVEL, second fresh example (asking what the tight focus achieves) forming the ladder\'s third rung',
  ],
)

const PROSE_NONFICTION_ADULT = adultLadder(
  'eng.literature.prose-nonfiction',
  'MC-A-NONFICTION-MEANS-PURELY-OBJECTIVE-NEUTRAL-FACT-REPORTING-WITH-NO-AUTHOR-VOICE-OR-INTERPRETATION',
  'MC-B-ALL-NONFICTION-SUBGENRES-ESSAY-MEMOIR-BIOGRAPHY-JOURNALISM-ARE-BASICALLY-THE-SAME-THING',
  [
    {
      stem: 'A personal essay about a career change is written with selective emphasis on certain turning points and the author\'s own interpretation of what those moments meant, rather than a neutral list of dates and job titles. Does the essay\'s status as nonfiction mean it should be purely objective with no authorial voice or interpretation?',
      correct: "No — nonfiction describes the subject matter's factual basis, not the absence of a shaping perspective; forms like the personal essay carry real authorial voice, selective emphasis, and interpretation of real events",
      wrong: 'Yes — since the essay is nonfiction and based on real events, it should be purely objective and neutral, with no personal voice or interpretation shaping how those events are presented',
    },
    {
      stem: 'A student expects a biography of a historical figure to read like a first-person memoir, with the same intimate personal reflection. Is this an accurate expectation?',
      correct: 'No — biography and memoir are distinct subgenres with different purposes and conventions; biography is a researched, typically third-person account of someone else\'s life, while memoir is first-person reflection on the author\'s own life',
      wrong: 'Yes — memoir, biography, journalism, and the essay are all fundamentally the same kind of nonfiction writing, so a biography should be expected to read the same way a memoir does',
    },
    {
      stem: 'A reader identifies three specific choices a career-change essay\'s author made — which turning points to include, how to frame the decision, and what interpretation to offer about its meaning — as evidence of deliberate authorial shaping. Is this the correct way to recognize nonfiction\'s authorial voice?',
      correct: 'Yes — identifying the specific choices an author makes about selection, framing, and interpretation is exactly how to recognize that nonfiction, though grounded in real events, still carries genuine authorial voice',
      wrong: "No — since the essay describes real events that actually happened, identifying an author's specific choices about how to present them is irrelevant to whether the piece counts as nonfiction",
    },
  ],
  [
    'MC-A-NONFICTION-MEANS-PURELY-OBJECTIVE-NEUTRAL-FACT-REPORTING-WITH-NO-AUTHOR-VOICE-OR-INTERPRETATION, fresh adult example (a career-change essay) rather than the existing childhood-memoir example',
    'MC-B-ALL-NONFICTION-SUBGENRES-ESSAY-MEMOIR-BIOGRAPHY-JOURNALISM-ARE-BASICALLY-THE-SAME-THING, fresh example (expecting a biography to read like a memoir) rather than the existing four-opening-lines example',
    'MC-A-NONFICTION-MEANS-PURELY-OBJECTIVE-NEUTRAL-FACT-REPORTING-WITH-NO-AUTHOR-VOICE-OR-INTERPRETATION, second fresh example (identifying the essay\'s authorial choices) forming the ladder\'s third rung',
  ],
)

const SHORT_STORY_STUDY_ADULT = adultLadder(
  'eng.literature.short-story-study',
  'MC-A-SHORT-STORY-IS-JUST-A-SHORT-NOVEL',
  'MC-B-EVERY-DETAIL-MUST-BE-A-DEEP-SYMBOL',
  [
    {
      stem: 'A story ends with a character staring at an unopened letter, with no further explanation of what the letter contains or what happens next. A reader complains the story "needed a few more pages" to resolve this. Would extending the story to fully resolve the letter\'s contents likely improve its impact?',
      correct: "No — the story's power often comes from its refusal to over-explain; the ambiguity of the unopened letter is likely the intended effect, and extending it into a full novel-style resolution would probably weaken that effect rather than complete it",
      wrong: "Yes — a short story that ends without fully resolving a central plot element like the letter's contents is necessarily incomplete and would be improved by extending it to explain what happens",
    },
    {
      stem: 'A story mentions a character\'s "red umbrella" once, in passing, with the detail never returned to or connected to the story\'s theme. A student insists this must be a "deep symbol" of something. Is this a well-supported symbolic reading?',
      correct: "No — a detail mentioned once with no repetition, thematic echo, or structural emphasis has no supporting evidence for a symbolic reading; it's more likely just an ordinary descriptive detail, not every detail in a short story is a hidden symbol",
      wrong: 'Yes — since short stories are so compressed, every single detail mentioned, including a one-time mention like the red umbrella, must be carrying deep symbolic significance',
    },
    {
      stem: 'A reader instead asks what effect the unopened letter\'s ambiguity creates — anticipation, unresolved tension, the sense that some questions in life go unanswered — rather than treating the lack of resolution as a flaw. Is this the correct, form-appropriate way to read the story\'s ending?',
      correct: "Yes — asking what the story's compression and ambiguity DO for it, rather than what it's \"missing,\" is exactly the correct way to read a short story's deliberately unresolved ending",
      wrong: "No — a story's ending should always be evaluated by how completely it resolves every plot element, regardless of what form the story is written in",
    },
  ],
  [
    'MC-A-SHORT-STORY-IS-JUST-A-SHORT-NOVEL, fresh adult example (an unopened letter) rather than the existing ambiguous-image example',
    'MC-B-EVERY-DETAIL-MUST-BE-A-DEEP-SYMBOL, fresh example (a "red umbrella" mentioned once) rather than the existing green-scarf example',
    'MC-A-SHORT-STORY-IS-JUST-A-SHORT-NOVEL, second fresh example (asking what the letter\'s ambiguity achieves) forming the ladder\'s third rung',
  ],
)

const SYMBOLISM_ADULT = adultLadder(
  'eng.literature.symbolism',
  'MC-ANY-OBJECT-MENTIONED-REPEATEDLY-IN-A-STORY-IS-AUTOMATICALLY-A-SYMBOL',
  'MC-A-SYMBOL-HAS-ONE-FIXED-UNIVERSAL-MEANING-ACROSS-ALL-STORIES',
  [
    {
      stem: 'A story mentions a character\'s phone repeatedly, simply because the character checks it often throughout their day. Does this repetition alone make the phone a symbol?',
      correct: "No — repetition alone doesn't make something a symbol; a phone mentioned often just because it's practically part of the character's routine is still just a phone, unless the story invests it with meaning beyond its literal function",
      wrong: "Yes — any object that appears multiple times in a story is automatically symbolic, regardless of whether the story connects it to anything beyond its practical role",
    },
    {
      stem: 'A story associates water with danger and loss (a character nearly drowning, a flood destroying a home) rather than the more conventional association of water with life and renewal. Is the story "using the symbol wrong" by departing from water\'s common cultural association?',
      correct: "No — common symbolic associations are cultural defaults, not fixed universal rules every story must follow; a story can establish its own specific meaning for a symbol within its own context, even one that differs from or inverts the conventional association",
      wrong: 'Yes — since water conventionally symbolizes life and renewal, a story that associates it with danger and loss instead is misusing the symbol incorrectly',
    },
    {
      stem: 'A story repeatedly returns to an image of a broken clock, each time when a character avoids confronting a painful memory, consistently tracking the character\'s inability to move forward. Does this pattern, unlike the phone example, provide genuine evidence of symbolic meaning?',
      correct: "Yes — the story consistently connects the broken clock's recurrence to the character's emotional stagnation, investing it with meaning beyond its literal function, which is exactly the evidence required for a genuine symbolic reading",
      wrong: "No — since the clock, like the phone, simply appears more than once in the story, its repeated mention on its own already fully establishes it as symbolic without needing any connection to a larger theme",
    },
  ],
  [
    'MC-ANY-OBJECT-MENTIONED-REPEATEDLY-IN-A-STORY-IS-AUTOMATICALLY-A-SYMBOL, fresh adult example (a repeatedly-checked phone) rather than the existing car example',
    'MC-A-SYMBOL-HAS-ONE-FIXED-UNIVERSAL-MEANING-ACROSS-ALL-STORIES, fresh example (water symbolizing danger, not renewal) rather than the existing darkness example',
    'MC-ANY-OBJECT-MENTIONED-REPEATEDLY-IN-A-STORY-IS-AUTOMATICALLY-A-SYMBOL, second fresh example (a recurring broken clock) forming the ladder\'s third rung',
  ],
)

const THEME_AND_MESSAGE_ADULT = adultLadder(
  'eng.literature.theme-and-message',
  'MC-THEME-IS-THE-SAME-AS-THE-TOPIC-OR-SUBJECT-OF-THE-STORY',
  'MC-A-STORY-CAN-ONLY-HAVE-ONE-CORRECT-THEME',
  [
    {
      stem: 'A student states a novel\'s theme as "the theme is loss." Does this identify the novel\'s theme?',
      correct: 'No — "loss" names a general topic, not a specific insight; a theme is the particular claim the story makes about that topic, such as "grief reshapes relationships rather than simply ending them," derived from the plot and characters',
      wrong: 'Yes — naming the general subject area a story is about, such as "loss," is what it means to state a story\'s theme',
    },
    {
      stem: 'Two students studying the same novel about an ambitious protagonist arrive at different, differently-worded theme statements — one emphasizing "ambition requires sacrifice" and the other emphasizing "ambition without self-awareness leads to isolation" — each supported by different textual evidence. Can only one of these be "the" correct theme?',
      correct: 'No — complex stories often support multiple valid thematic interpretations; what makes a theme statement valid is being genuinely grounded in specific textual evidence, not matching one single predetermined answer',
      wrong: 'Yes — since a story can only have one correct theme, one of these two students must be wrong, even if both theme statements are supported by evidence from the text',
    },
    {
      stem: 'Revising "the theme is loss" into "the novel suggests that grief reshapes a family\'s relationships rather than simply ending them, as shown by how the characters grow closer through shared mourning," has the student correctly moved from topic to theme?',
      correct: 'Yes — stating the theme as a full claim or insight developed from the plot and characters, rather than a one-word topic label, is exactly the correct distinction between a topic and a genuine theme',
      wrong: "No — since both versions are ultimately about the same general subject of loss, rewording \"loss\" into a longer sentence doesn't actually change whether the statement counts as a theme",
    },
  ],
  [
    'MC-THEME-IS-THE-SAME-AS-THE-TOPIC-OR-SUBJECT-OF-THE-STORY, fresh adult example ("the theme is loss") rather than the existing "the theme is family" example',
    'MC-A-STORY-CAN-ONLY-HAVE-ONE-CORRECT-THEME, fresh example (two ambition-themed statements) rather than the existing perseverance/help example',
    'MC-THEME-IS-THE-SAME-AS-THE-TOPIC-OR-SUBJECT-OF-THE-STORY, second fresh example (revising "the theme is loss") forming the ladder\'s third rung',
  ],
)

export const ENGLISH_ADULT_BAND_BATCH_18: SeedProbe[] = [
  ...COMPARATIVE_LITERATURE_INTRO_ADULT,
  ...DRAMATIC_STRUCTURE_ADULT,
  ...FORESHADOWING_AND_SUSPENSE_ADULT,
  ...IMAGERY_ADULT,
  ...IRONY_ADULT,
  ...LITERARY_CRITICISM_INTRO_ADULT,
  ...LITERARY_DEVICES_OVERVIEW_ADULT,
  ...LITERARY_GENRES_OVERVIEW_ADULT,
  ...LITERARY_PERIODS_SURVEY_ADULT,
  ...METAPHOR_AND_SIMILE_ADULT,
  ...METER_AND_RHYME_ADULT,
  ...NOVEL_STUDY_ADULT,
  ...POETIC_FORMS_ADULT,
  ...POETRY_BASICS_ADULT,
  ...PROSE_FICTION_ADULT,
  ...PROSE_NONFICTION_ADULT,
  ...SHORT_STORY_STUDY_ADULT,
  ...SYMBOLISM_ADULT,
  ...THEME_AND_MESSAGE_ADULT,
]
