/**
 * ENGLISH CARD-DEPTH CAMPAIGN — Batch 16 (eng.literature part 1, 27 cards).
 *
 * WHY THIS EXISTS (docs/history/learner-experience-backlog-plan-2026-10-16.md §3-§5)
 * Measured 2026-10-16: 1,493 of English's 1,501 authored cards had only TWO options,
 * so a blind guess scored ~50 %. Owner decision 3 (2026-10-07, `turnContract.
 * certifiesMastery`) makes a 2-option card practice-only once a concept holds three
 * authored cards with 3+ options — which no English concept did. Owner decision
 * (2026-10-17, "go ahead"): ADD new 3-option cards (Path A) rather than edit the
 * existing identities, so the create-only bootstrap delivers them with no content sync.
 *
 * WHAT A CARD IS HERE
 * Three options: the correct answer plus one wrong answer for EACH of the concept's
 * two registered misconceptions (ids read off the concept's own existing probes, so
 * none is invented). Every stem is a NEW worked example — none reuses a scenario the
 * concept's existing cards already ask. Facts come only from the concept's blueprint
 * (docs/curriculum/blueprints/<concept>.md — Misconception Register, Worked Examples).
 *
 * SLOTS (the P-10 constraint)
 * A (conceptId, probeKind, gradeBand) slot that already holds a probe must never gain
 * a second one: `buildProbeSlugResolver` would promote the whole slot to a 5-segment
 * slug and abandon the live row's identity. Each literature concept already uses native band : mcq, misconception_probe, checkpoint, true_false and ADULT : mcq, misconception_probe, so the three new cards take the FREE slots native band : short_answer, fill_blank and ADULT : checkpoint (native band is MIDDLE for character-development and drama-basics, HIGH for the rest).
 * Serving never filters by probeKind (`probeToMcq` is the predicate), so the kind is
 * only a slot label.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedProbe } from './brainSeedAssets'

const S = 'english'
const M = GradeBand.MIDDLE
const H = GradeBand.HIGH
const A = GradeBand.ADULT

type Kind = 'short_answer' | 'fill_blank' | 'checkpoint'

function card(
  conceptId: string,
  kind: Kind,
  band: GradeBand,
  stem: string,
  correct: string,
  wrongA: [text: string, misconception: string],
  wrongB: [text: string, misconception: string],
  note: string,
): SeedProbe {
  const id = (m: string) => `${conceptId}:${m}`
  return {
    conceptId, subjectSlug: S, probeKind: kind, gradeBand: band,
    difficulty: kind === 'fill_blank' ? ProbeDifficulty.PROFICIENT : ProbeDifficulty.DEVELOPING,
    stem,
    choices: [
      { text: correct, isCorrect: true },
      { text: wrongA[0], isCorrect: false, misconceptionId: id(wrongA[1]) },
      { text: wrongB[0], isCorrect: false, misconceptionId: id(wrongB[1]) },
    ],
    targetedMisconceptions: [id(wrongA[1]), id(wrongB[1])],
    source: `docs/curriculum/blueprints/${conceptId}.md — Misconception Register; ${note}`,
  }
}


export const ENGLISH_CARD_DEPTH_BATCH_16: SeedProbe[] = [
  // ─── eng.literature.character-development ───────────────────────────────
  card('eng.literature.character-development', 'short_answer', M,
    'A story never calls Maya "generous", but she splits her lunch with a classmate every day. By the end she still avoids strangers, yet now speaks up for her brother. A student says traits must be stated outright, and that since she did not change completely she did not change at all. What is accurate?',
    'Her actions show generosity without a label, and she has grown in one area',
    ['The author must state a trait outright, so Maya\'s generosity cannot be claimed from her actions', 'MC-A-CHARACTERS-TRAITS-ARE-DIRECTLY-STATED-BY-THE-AUTHOR'],
    ['Because she did not change completely, she did not change at all', 'MC-A-CHARACTER-EITHER-CHANGES-COMPLETELY-OR-NOT-AT-ALL'],
    'traits from actions; growth in specific areas, re-asked with Maya sharing her lunch'),
  card('eng.literature.character-development', 'fill_blank', M,
    'Complete the sentence: to understand a character, ____.',
    'read their actions, words and others\' reactions',
    ['wait for the author to state each trait directly in the text', 'MC-A-CHARACTERS-TRAITS-ARE-DIRECTLY-STATED-BY-THE-AUTHOR'],
    ['decide whether they changed completely or not at all', 'MC-A-CHARACTER-EITHER-CHANGES-COMPLETELY-OR-NOT-AT-ALL'],
    'Replacement texts for both misconceptions'),
  card('eng.literature.character-development', 'checkpoint', A,
    'A case study never says an engineer "is humble", but shows him crediting his team in every meeting. By the end he still avoids public speaking, though he now mentors juniors. A reviewer says traits must be stated, and that no complete change means no change. Which assessment is accurate?',
    'His humility shows in his actions, and mentoring is real growth in one area even without total change',
    ['She is right: a trait only exists once the text states it directly', 'MC-A-CHARACTERS-TRAITS-ARE-DIRECTLY-STATED-BY-THE-AUTHOR'],
    ['She is right: without complete transformation, no character change has occurred', 'MC-A-CHARACTER-EITHER-CHANGES-COMPLETELY-OR-NOT-AT-ALL'],
    'both misconceptions, with an engineer case study'),

  // ─── eng.literature.comparative-literature-intro ─────────────────────────
  card('eng.literature.comparative-literature-intro', 'short_answer', H,
    'Two flood myths come from traditions with no recorded contact: one ends with a covenant, the other with a new human order. A student says the similarity proves one influenced the other, and that comparing them means treating them as one story. What is accurate?',
    'Similarity may reflect shared concerns, and comparison must also weigh differences',
    ['The shared flood motif proves one tradition directly influenced the other', 'MC-A-ANY-SIMILARITY-BETWEEN-WORKS-FROM-DIFFERENT-TRADITIONS-MEANS-ONE-DIRECTLY-INFLUENCED-THE-OTHER'],
    ['Comparing cultures means setting aside their differences to show a single story', 'MC-B-COMPARING-LITERATURE-ACROSS-CULTURES-MEANS-IGNORING-OR-FLATTENING-OUT-THE-REAL-DIFFERENCES-BETWEEN-THEM'],
    'similarity is not influence; comparison keeps differences, re-asked with flood myths'),
  card('eng.literature.comparative-literature-intro', 'fill_blank', H,
    'Complete the sentence: a comparative reading ____.',
    'weighs similarities against differences, without assuming influence',
    ['treats any similarity as proof that one tradition influenced the other', 'MC-A-ANY-SIMILARITY-BETWEEN-WORKS-FROM-DIFFERENT-TRADITIONS-MEANS-ONE-DIRECTLY-INFLUENCED-THE-OTHER'],
    ['looks past cultural differences to find the one shared story', 'MC-B-COMPARING-LITERATURE-ACROSS-CULTURES-MEANS-IGNORING-OR-FLATTENING-OUT-THE-REAL-DIFFERENCES-BETWEEN-THEM'],
    'Replacement texts for both misconceptions'),
  card('eng.literature.comparative-literature-intro', 'checkpoint', A,
    'A seminar notes that two ballad traditions on opposite sides of the world both lament a lost king. A participant says one must have borrowed from the other, and that the comparison should drop their differences in form. Which assessment is accurate?',
    'Shared themes can arise independently, and the comparison should also explain how the forms differ',
    ['He is right: the shared theme shows direct borrowing', 'MC-A-ANY-SIMILARITY-BETWEEN-WORKS-FROM-DIFFERENT-TRADITIONS-MEANS-ONE-DIRECTLY-INFLUENCED-THE-OTHER'],
    ['He is right: comparing traditions means leaving out their differences', 'MC-B-COMPARING-LITERATURE-ACROSS-CULTURES-MEANS-IGNORING-OR-FLATTENING-OUT-THE-REAL-DIFFERENCES-BETWEEN-THEM'],
    'both misconceptions, with two ballad traditions'),

  // ─── eng.literature.drama-basics ─────────────────────────────────────────
  card('eng.literature.drama-basics', 'short_answer', M,
    'In a play, a character says "I\'m fine" with the direction "[She stares at the floor, voice shaking]". A student says the direction is optional decoration, and that a play is just a story with the quotation marks removed. What is accurate?',
    'The direction supplies tone, since a play has no narrator to do it',
    ['Stage directions are optional extras, like descriptions in a story', 'MC-STAGE-DIRECTIONS-ARE-JUST-OPTIONAL-EXTRA-DETAILS-LIKE-DESCRIPTIONS-IN-A-STORY'],
    ['A play is just a story written without quotation marks, so it works like prose', 'MC-A-PLAY-IS-JUST-A-STORY-WRITTEN-WITH-QUOTATION-MARKS-REMOVED'],
    'stage directions carry information; no narrator, re-asked with "I\'m fine"'),
  card('eng.literature.drama-basics', 'fill_blank', M,
    'Complete the sentence: because a play has no narrator, ____.',
    'stage directions and dialogue must carry tone and thoughts',
    ['stage directions are optional extras that a reader can skip', 'MC-STAGE-DIRECTIONS-ARE-JUST-OPTIONAL-EXTRA-DETAILS-LIKE-DESCRIPTIONS-IN-A-STORY'],
    ['it is simply a story with the quotation marks removed', 'MC-A-PLAY-IS-JUST-A-STORY-WRITTEN-WITH-QUOTATION-MARKS-REMOVED'],
    'Replacement texts for both misconceptions'),
  card('eng.literature.drama-basics', 'checkpoint', A,
    'In a staged safety drill, the script line "I see." comes with the direction "[He backs away, hands up]". A trainer says the direction can be skipped, and that scripts are just narratives with the quotation marks removed. Which assessment is accurate?',
    'The direction shows fear that the words hide; a script has no narrator, so it must convey this through action',
    ['She is right: stage directions are optional extras', 'MC-STAGE-DIRECTIONS-ARE-JUST-OPTIONAL-EXTRA-DETAILS-LIKE-DESCRIPTIONS-IN-A-STORY'],
    ['She is right: a script is a narrative with the quotation marks removed', 'MC-A-PLAY-IS-JUST-A-STORY-WRITTEN-WITH-QUOTATION-MARKS-REMOVED'],
    'both misconceptions, with a safety drill script'),

  // ─── eng.literature.dramatic-structure ───────────────────────────────────
  card('eng.literature.dramatic-structure', 'short_answer', H,
    'In a tragedy, Act I ends with the hero swearing revenge, and Act V opens with the final duel. A student says act breaks are arbitrary like chapters, and that Act I builds tension exactly as Act V does. What is accurate?',
    'Acts mark shifts in the action, and each scene serves a different dramatic function',
    ['Act breaks are arbitrary divisions with no special function, like chapters', 'MC-A-ACTS-AND-SCENES-ARE-JUST-ARBITRARY-DIVISIONS-LIKE-CHAPTERS-IN-A-NOVEL-WITH-NO-SPECIAL-FUNCTION'],
    ['Every scene builds and resolves tension the same way, so Act I works exactly like Act V', 'MC-B-DRAMATIC-TENSION-BUILDS-AND-RESOLVES-IN-EXACTLY-THE-SAME-WAY-ACROSS-EVERY-SCENE-WITH-NO-VARIATION-IN-FUNCTION'],
    'acts have functions; scenes differ, re-asked with a revenge tragedy'),
  card('eng.literature.dramatic-structure', 'fill_blank', H,
    'Complete the sentence: in a play, acts and scenes ____.',
    'shape the action, each with a distinct function',
    ['are arbitrary divisions with no purpose beyond convenience', 'MC-A-ACTS-AND-SCENES-ARE-JUST-ARBITRARY-DIVISIONS-LIKE-CHAPTERS-IN-A-NOVEL-WITH-NO-SPECIAL-FUNCTION'],
    ['all build tension in exactly the same way', 'MC-B-DRAMATIC-TENSION-BUILDS-AND-RESOLVES-IN-EXACTLY-THE-SAME-WAY-ACROSS-EVERY-SCENE-WITH-NO-VARIATION-IN-FUNCTION'],
    'Replacement texts for both misconceptions'),
  card('eng.literature.dramatic-structure', 'checkpoint', A,
    'A theatre company\'s report says the interval after Act II was placed arbitrarily, as with chapter breaks, and that the opening scene and the final scene build tension identically. Which assessment is accurate?',
    'The break is placed for a dramatic purpose, and an opening scene sets up where a final scene releases',
    ['The report is right: acts divide a play arbitrarily', 'MC-A-ACTS-AND-SCENES-ARE-JUST-ARBITRARY-DIVISIONS-LIKE-CHAPTERS-IN-A-NOVEL-WITH-NO-SPECIAL-FUNCTION'],
    ['The report is right: every scene builds tension the same way', 'MC-B-DRAMATIC-TENSION-BUILDS-AND-RESOLVES-IN-EXACTLY-THE-SAME-WAY-ACROSS-EVERY-SCENE-WITH-NO-VARIATION-IN-FUNCTION'],
    'both misconceptions, with a theatre report'),

  // ─── eng.literature.foreshadowing-and-suspense ───────────────────────────
  card('eng.literature.foreshadowing-and-suspense', 'short_answer', H,
    'A novel\'s first chapter mentions the date of a wedding, and a later chapter has the wedding. Another early scene lingers on a crack in a dam wall that later bursts. A student calls both foreshadowing, and says suspense and dramatic irony are one technique. What is accurate?',
    'Only the crack foreshadows; suspense can arise without the reader knowing more than the characters',
    ['Both are foreshadowing, since any early mention of a later event counts', 'MC-A-ANY-EARLY-MENTION-OF-A-LATER-EVENT-COUNTS-AS-FORESHADOWING'],
    ['Suspense and dramatic irony are the same technique, both telling the reader what a character does not know', 'MC-B-SUSPENSE-AND-DRAMATIC-IRONY-ARE-THE-SAME-TECHNIQUE-BOTH-CREATE-TENSION-BY-TELLING-THE-READER-SOMETHING'],
    'foreshadowing is a purposeful hint; suspense is not dramatic irony, re-asked with a wedding and a dam'),
  card('eng.literature.foreshadowing-and-suspense', 'fill_blank', H,
    'Complete the sentence: foreshadowing is ____.',
    'an early hint that anticipates a later event',
    ['any early mention of an event that happens later in the story', 'MC-A-ANY-EARLY-MENTION-OF-A-LATER-EVENT-COUNTS-AS-FORESHADOWING'],
    ['the same technique as suspense and dramatic irony', 'MC-B-SUSPENSE-AND-DRAMATIC-IRONY-ARE-THE-SAME-TECHNIQUE-BOTH-CREATE-TENSION-BY-TELLING-THE-READER-SOMETHING'],
    'Replacement texts for both misconceptions'),
  card('eng.literature.foreshadowing-and-suspense', 'checkpoint', A,
    'In a thriller, the reader knows a bomb is under the table while the characters chat. A reviewer calls this foreshadowing because the bomb is mentioned before it explodes, and says suspense and dramatic irony are one technique. Which assessment is accurate?',
    'A mention alone is not foreshadowing, and dramatic irony is one source of suspense, not the whole of it',
    ['She is right: any early mention of a later event is foreshadowing', 'MC-A-ANY-EARLY-MENTION-OF-A-LATER-EVENT-COUNTS-AS-FORESHADOWING'],
    ['She is right: suspense and dramatic irony are exactly the same technique', 'MC-B-SUSPENSE-AND-DRAMATIC-IRONY-ARE-THE-SAME-TECHNIQUE-BOTH-CREATE-TENSION-BY-TELLING-THE-READER-SOMETHING'],
    'both misconceptions, with a bomb under a table'),

  // ─── eng.literature.imagery ──────────────────────────────────────────────
  card('eng.literature.imagery', 'short_answer', H,
    'A student says "The bitter tang of lemon stung her tongue" is not imagery because it has no simile or metaphor, and that once she names it as taste imagery the analysis is finished. What is accurate?',
    'It is imagery: a literal sensory detail counts, and the effect should be explained',
    ['It is not imagery, since imagery has to use a metaphor or a simile to count as imagery', 'MC-A-IMAGERY-MUST-BE-FIGURATIVE-USING-METAPHOR-OR-SIMILE-TO-COUNT'],
    ['Naming the sense, taste, completes the analysis', 'MC-B-IDENTIFYING-WHICH-SENSE-IMAGERY-APPEALS-TO-IS-THE-WHOLE-ANALYTICAL-TASK'],
    'literal sensory detail is imagery; name the effect too, re-asked with lemon'),
  card('eng.literature.imagery', 'fill_blank', H,
    'Complete the sentence: imagery is ____.',
    'sensory language, literal or figurative',
    ['figurative language such as metaphor and simile only', 'MC-A-IMAGERY-MUST-BE-FIGURATIVE-USING-METAPHOR-OR-SIMILE-TO-COUNT'],
    ['finished once you name the sense it appeals to', 'MC-B-IDENTIFYING-WHICH-SENSE-IMAGERY-APPEALS-TO-IS-THE-WHOLE-ANALYTICAL-TASK'],
    'Replacement texts for both misconceptions'),
  card('eng.literature.imagery', 'checkpoint', A,
    'A critic dismisses "the room smelled of wet wool and old coffee" as not imagery because it has no figure of speech, and thinks labelling it "smell" is enough. Which assessment is accurate?',
    'It is imagery, and the analysis should add what mood or detail the smells create',
    ['She is right: only figurative language counts as imagery', 'MC-A-IMAGERY-MUST-BE-FIGURATIVE-USING-METAPHOR-OR-SIMILE-TO-COUNT'],
    ['She is right: naming the sense is the whole task', 'MC-B-IDENTIFYING-WHICH-SENSE-IMAGERY-APPEALS-TO-IS-THE-WHOLE-ANALYTICAL-TASK'],
    'both misconceptions, with wet wool and old coffee'),

  // ─── eng.literature.irony ────────────────────────────────────────────────
  card('eng.literature.irony', 'short_answer', H,
    'A student calls a man losing his keys on a busy day "ironic", while a fire station burning down is "just unlucky". A friend says verbal irony is always the same as sarcasm. What is accurate?',
    'The fire station is situational irony; the keys are bad luck, and verbal irony is wider than sarcasm',
    ['The lost keys are ironic, since any unlucky or unexpected event is situational irony, whatever the outcome', 'MC-A-ANY-UNEXPECTED-OR-UNLUCKY-EVENT-IS-SITUATIONAL-IRONY'],
    ['Verbal irony is always exactly the same thing as sarcasm', 'MC-B-VERBAL-IRONY-IS-EXACTLY-THE-SAME-THING-AS-SARCASM'],
    'situational irony needs contradiction of expectation; irony vs sarcasm, re-asked with a fire station'),
  card('eng.literature.irony', 'fill_blank', H,
    'Complete the sentence: situational irony is ____.',
    'an outcome that contradicts expectation',
    ['any unexpected or unlucky event that happens to a person', 'MC-A-ANY-UNEXPECTED-OR-UNLUCKY-EVENT-IS-SITUATIONAL-IRONY'],
    ['another word for sarcasm', 'MC-B-VERBAL-IRONY-IS-EXACTLY-THE-SAME-THING-AS-SARCASM'],
    'Replacement texts for both misconceptions'),
  card('eng.literature.irony', 'checkpoint', A,
    'A fire-safety firm\'s own office burns down, and a manager says warmly, "Well, that went well." A colleague says every unlucky event counts as situational irony, and that the remark is sarcasm, identical to verbal irony. Which assessment is accurate?',
    'Only an outcome that contradicts expectation, like this fire, is situational irony; verbal irony is wider than sarcasm',
    ['He is right: any unlucky event is situational irony', 'MC-A-ANY-UNEXPECTED-OR-UNLUCKY-EVENT-IS-SITUATIONAL-IRONY'],
    ['He is right: verbal irony is exactly the same thing as sarcasm', 'MC-B-VERBAL-IRONY-IS-EXACTLY-THE-SAME-THING-AS-SARCASM'],
    'both misconceptions, with a fire-safety firm'),

  // ─── eng.literature.literary-criticism-intro ─────────────────────────────
  card('eng.literature.literary-criticism-intro', 'short_answer', H,
    'Two critics read the same novel, one through class and one through psychology, and disagree. A student says one must be wrong because a text has a single correct reading, and writes "I felt sad" as her reader-response. What is accurate?',
    'Different approaches illuminate different aspects, and a response must cite the text',
    ['One critic must be wrong, since a text has one correct interpretation', 'MC-A-THERE-IS-ONE-SINGLE-CORRECT-INTERPRETATION-OF-A-TEXT-THAT-CRITICISM-UNCOVERS'],
    ['"I felt sad" is a valid reader-response, since any personal reaction to a text counts', 'MC-B-ANY-PERSONAL-REACTION-TO-A-TEXT-COUNTS-AS-A-VALID-READER-RESPONSE-INTERPRETATION'],
    'multiple valid lenses; reader-response is anchored in the text, re-asked with two critics'),
  card('eng.literature.literary-criticism-intro', 'fill_blank', H,
    'Complete the sentence: critical approaches ____.',
    'offer different lenses, and a reaction must be tied to the text',
    ['compete to uncover the one correct interpretation of the text itself', 'MC-A-THERE-IS-ONE-SINGLE-CORRECT-INTERPRETATION-OF-A-TEXT-THAT-CRITICISM-UNCOVERS'],
    ['accept any personal reaction as a valid interpretation', 'MC-B-ANY-PERSONAL-REACTION-TO-A-TEXT-COUNTS-AS-A-VALID-READER-RESPONSE-INTERPRETATION'],
    'Replacement texts for both misconceptions'),
  card('eng.literature.literary-criticism-intro', 'checkpoint', A,
    'A book-club leader says a postcolonial and a formalist reading of the same poem cannot both be sound, and accepts "This poem made me nostalgic" as a full reader-response. Which assessment is accurate?',
    'Both readings can be sound as different lenses, and a reader-response must show which words prompted the reaction',
    ['He is right: only one reading of a text can be correct', 'MC-A-THERE-IS-ONE-SINGLE-CORRECT-INTERPRETATION-OF-A-TEXT-THAT-CRITICISM-UNCOVERS'],
    ['He is right: any personal reaction is a valid reader-response', 'MC-B-ANY-PERSONAL-REACTION-TO-A-TEXT-COUNTS-AS-A-VALID-READER-RESPONSE-INTERPRETATION'],
    'both misconceptions, with a book club'),

  // ─── eng.literature.literary-devices-overview ────────────────────────────
  card('eng.literature.literary-devices-overview', 'short_answer', H,
    'A student writes "Line 3 contains hyperbole" and says naming it is the goal of analysis. He adds that the hyperbole, "I have told you a million times", is a decorative extra that could be deleted without changing the meaning. What is accurate?',
    'Naming it is only the start; the exaggeration conveys exasperation',
    ['Naming the device is the goal of literary analysis', 'MC-IDENTIFYING-A-DEVICE-BY-NAME-IS-THE-GOAL-OF-LITERARY-ANALYSIS'],
    ['The hyperbole is decorative, and the meaning stays exactly the same without it', 'MC-LITERARY-DEVICES-ARE-DECORATIVE-EXTRAS-SEPARATE-FROM-MEANING'],
    'name the effect; devices carry meaning, re-asked with hyperbole'),
  card('eng.literature.literary-devices-overview', 'fill_blank', H,
    'Complete the sentence: after naming a literary device, ____.',
    'explain what effect it creates in the passage',
    ['the analysis is complete, since naming is the goal', 'MC-IDENTIFYING-A-DEVICE-BY-NAME-IS-THE-GOAL-OF-LITERARY-ANALYSIS'],
    ['treat it as a decorative extra separate from the meaning', 'MC-LITERARY-DEVICES-ARE-DECORATIVE-EXTRAS-SEPARATE-FROM-MEANING'],
    'Replacement texts for both misconceptions'),
  card('eng.literature.literary-devices-overview', 'checkpoint', A,
    'An editor praises an analysis that lists "alliteration, simile, hyperbole" for a speech, and says devices are decorative extras that do not affect meaning. Which assessment is accurate?',
    'A list of names is not analysis; each device should be tied to an effect on the speech\'s meaning',
    ['She is right: naming devices is the goal of analysis', 'MC-IDENTIFYING-A-DEVICE-BY-NAME-IS-THE-GOAL-OF-LITERARY-ANALYSIS'],
    ['She is right: devices are decorative extras separate from meaning', 'MC-LITERARY-DEVICES-ARE-DECORATIVE-EXTRAS-SEPARATE-FROM-MEANING'],
    'both misconceptions, with a speech analysis'),
]
