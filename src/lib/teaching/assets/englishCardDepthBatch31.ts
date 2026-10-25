/**
 * ENGLISH ADULT-BAND CARD-DEPTH — Batch 31 (10 cards, one per (concept, ADULT) pair). Why this exists, what a card is and the P-10 slot rule: see
 * `englishAdultCard.ts`. A new 3-option `fill_blank` card takes each pair from four gradeable probes to five; each wrong answer carries the id of one
 * of the concept's two registered misconceptions (A = first, B = second in `englishAdultMisconceptionIds.ts`). Option lengths are balanced (the correct
 * answer is the uniquely longest option in about a third of the cards, as chance would give), like the earlier card-depth batches.
 */
import type { SeedProbe } from './brainSeedAssets'
import { adultCard } from './englishAdultCard'

export const ENGLISH_CARD_DEPTH_BATCH_31: SeedProbe[] = [
  // literature.comparative-literature-intro
  //   A: MC-A-ANY-SIMILARITY-BETWEEN-WORKS-FROM-DIFFERENT-TRADITIONS-MEANS-ONE-DIRECTLY
  //   B: MC-B-COMPARING-LITERATURE-ACROSS-CULTURES-MEANS-IGNORING-OR-FLATTENING-OUT-THE
  adultCard("eng.literature.comparative-literature-intro",
    "Two poetry traditions with no documented contact both treat the death of a ruler as an occasion for national grief. How should a comparative reader proceed?",
    "Treat the similarity as possibly independent, check for documented contact before claiming influence, and keep real cultural differences in view",
    "Conclude that one tradition must have directly influenced the other, since any similarity between works means influence, whether or not any contact is documented",
    "Say the poems are essentially the same, since comparing across cultures means setting the differences aside",
    "similarity is not influence; comparison keeps differences"),
  // literature.drama-basics
  //   A: MC-A-PLAY-IS-JUST-A-STORY-WRITTEN-WITH-QUOTATION-MARKS-REMOVED
  //   B: MC-STAGE-DIRECTIONS-ARE-JUST-OPTIONAL-EXTRA-DETAILS-LIKE-DESCRIPTIONS-IN-A-STO
  adultCard("eng.literature.drama-basics",
    "A script reads \"ANNA: I am fine.\" with the direction \"[She grips the chair until her knuckles whiten.]\". How should a performer treat the direction?",
    "As essential information: with no narrator, the direction shows how the line is played, here that Anna is not fine",
    "As a story detail with the quotation marks removed, since a play is just a story written without any quotation marks at all",
    "As an optional extra, like a descriptive passage in a story, which can be skipped",
    "stage directions carry what a narrator would; drama is not a story minus quotes"),
  // literature.dramatic-structure
  //   A: MC-A-ACTS-AND-SCENES-ARE-JUST-ARBITRARY-DIVISIONS-LIKE-CHAPTERS-IN-A-NOVEL-WIT
  //   B: MC-B-DRAMATIC-TENSION-BUILDS-AND-RESOLVES-IN-EXACTLY-THE-SAME-WAY-ACROSS-EVERY
  adultCard("eng.literature.dramatic-structure",
    "A director places the interval just after a character discovers a secret letter, and the next scene opens with calm domestic talk. What does a drama student conclude?",
    "The act break is placed deliberately at high tension for a live audience, and scenes differ in function, so the calm scene serves another purpose",
    "Act breaks are arbitrary divisions like chapters in a novel, so the interval could have been placed anywhere",
    "Tension builds and resolves in exactly the same way in every scene, so the calm scene has the same function as the discovery scene before the interval",
    "act breaks are structural; scenes have different functions"),
  // literature.foreshadowing-and-suspense
  //   A: MC-A-ANY-EARLY-MENTION-OF-A-LATER-EVENT-COUNTS-AS-FORESHADOWING
  //   B: MC-B-SUSPENSE-AND-DRAMATIC-IRONY-ARE-THE-SAME-TECHNIQUE-BOTH-CREATE-TENSION-BY
  adultCard("eng.literature.foreshadowing-and-suspense",
    "In chapter 1 a character says, \"I will be at the harbour at noon tomorrow\", and later she is there. Elsewhere, the reader knows a stranger is hiding in a cupboard while a family eats. Which analysis is correct?",
    "The first is a plain early statement, not foreshadowing, which works through subtle hints that gain significance later; the second is dramatic irony, because the reader knows what the characters do not",
    "The first is foreshadowing, because any early mention of a later event counts as foreshadowing",
    "The second is suspense and dramatic irony at once, since the two are the same technique",
    "foreshadowing is a subtle hint; suspense differs from dramatic irony"),
  // literature.imagery
  //   A: MC-A-IMAGERY-MUST-BE-FIGURATIVE-USING-METAPHOR-OR-SIMILE-TO-COUNT
  //   B: MC-B-IDENTIFYING-WHICH-SENSE-IMAGERY-APPEALS-TO-IS-THE-WHOLE-ANALYTICAL-TASK
  adultCard("eng.literature.imagery",
    "A student analyzes \"the kitchen smelled of burnt toast and cold coffee\". Which analysis is best?",
    "It is imagery though literal, appealing to smell; a full analysis also says what mood the details create",
    "It is not imagery, because it uses no metaphor or simile, only plain literal description of what the kitchen smelled like",
    "It is imagery of smell, and naming the sense is the whole analytical task",
    "imagery need not be figurative; analysis goes beyond naming the sense"),
  // literature.irony
  //   A: MC-A-ANY-UNEXPECTED-OR-UNLUCKY-EVENT-IS-SITUATIONAL-IRONY
  //   B: MC-B-VERBAL-IRONY-IS-EXACTLY-THE-SAME-THING-AS-SARCASM
  adultCard("eng.literature.irony",
    "Which analysis is accurate? (1) A woman misses her bus by three seconds and a friend calls it ironic. (2) Warmly sympathizing after her bad morning, the friend says, \"Well, this is going splendidly.\"",
    "Case 1 is bad luck, not situational irony, which needs a pointed contradiction of a reasonable expectation; case 2 is verbal irony meant gently, so verbal irony is not always sarcasm",
    "Case 1 is situational irony, because any unlucky or unexpected event counts",
    "Case 2 is sarcasm, because verbal irony is exactly the same thing as sarcasm",
    "situational irony needs a contradiction; verbal irony is not sarcasm"),
  // literature.literary-criticism-intro
  //   A: MC-A-THERE-IS-ONE-SINGLE-CORRECT-INTERPRETATION-OF-A-TEXT-THAT-CRITICISM-UNCOV
  //   B: MC-B-ANY-PERSONAL-REACTION-TO-A-TEXT-COUNTS-AS-A-VALID-READER-RESPONSE-INTERPR
  adultCard("eng.literature.literary-criticism-intro",
    "Three readers discuss a poem about a river. One analyzes its sound patterns and structure, one reads it against the history of the town it describes, and one says only \"I did not like it.\" Which view is sound?",
    "The first two ask different kinds of questions and can both be valid; the third is a reaction, which becomes a reader-response reading when it is tied to evidence in the text",
    "Only one of the first two can be correct, because criticism uncovers a single correct interpretation",
    "All three are equally valid reader-response interpretations, since any personal reaction counts",
    "criticism asks different questions; reaction needs textual support"),
  // literature.literary-devices-overview
  //   A: MC-IDENTIFYING-A-DEVICE-BY-NAME-IS-THE-GOAL-OF-LITERARY-ANALYSIS
  //   B: MC-LITERARY-DEVICES-ARE-DECORATIVE-EXTRAS-SEPARATE-FROM-MEANING
  adultCard("eng.literature.literary-devices-overview",
    "A student writes about \"the factory coughed smoke into the dawn\": \"This is personification.\" Which comment is best?",
    "It names the device but stops short: the analysis must explain the effect, such as making the factory seem sick or hostile",
    "That is complete, since identifying a device by name is the goal of literary analysis",
    "The device is only a decorative extra, so the line could be \"the factory produced smoke\" without changing the meaning of the sentence at all",
    "naming is the first step; devices shape meaning"),
  // literature.literary-genres-overview
  //   A: MC-A-WORK-MUST-FIT-CLEANLY-INTO-EXACTLY-ONE-GENRE-CATEGORY
  //   B: MC-NONFICTION-IS-JUST-FACTS-WITH-NO-LITERARY-TECHNIQUE-OR-CRAFT
  adultCard("eng.literature.literary-genres-overview",
    "A book-length account of a real expedition uses scene-setting, a deliberate narrative arc and a few lines of verse. How should it be understood?",
    "As a hybrid work: nonfiction that uses narrative and poetic technique, so identifying the blend beats forcing one label",
    "It must be placed in exactly one genre category, and the verse and narrative techniques ignored",
    "As nonfiction it is just facts with no literary technique or craft, so the arc and the scene-setting are accidental features",
    "genres overlap; nonfiction has craft"),
  // literature.literary-periods-survey
  //   A: MC-A-LITERARY-PERIODS-ARE-ISOLATED-CATEGORIES-WITH-NO-CONNECTION-TO-EACH-OTHER
  //   B: MC-B-EVERY-WORK-FROM-A-GIVEN-PERIOD-PERFECTLY-FITS-THAT-PERIODS-DEFINING-CHARA
  adultCard("eng.literature.literary-periods-survey",
    "A novelist writing in the Realist period includes a dreamlike, Romantic-style storm scene. What should a student conclude about literary periods?",
    "Periods are connected, with Realism partly reacting to Romanticism, and works can mix traits, so one scene does not break the period",
    "Realism and Romanticism are isolated categories with no connection, so the scene is simply a mistake",
    "Every work from a period fits that period's defining traits perfectly, so the scene shows the novel does not belong to the period at all",
    "periods form a conversation; works do not fit perfectly"),
]
