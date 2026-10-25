/**
 * ENGLISH ADULT-BAND CARD-DEPTH — Batch 38 (10 cards, one per (concept, ADULT) pair). Why this exists, what a card is and the P-10 slot rule: see
 * `englishAdultCard.ts`. A new 3-option `fill_blank` card takes each pair from four gradeable probes to five; each wrong answer carries the id of one
 * of the concept's two registered misconceptions (A = first, B = second in `englishAdultMisconceptionIds.ts`). Option lengths are balanced (the correct
 * answer is the uniquely longest option in about a third of the cards, as chance would give), like the earlier card-depth batches.
 */
import type { SeedProbe } from './brainSeedAssets'
import { adultCard } from './englishAdultCard'

export const ENGLISH_CARD_DEPTH_BATCH_38: SeedProbe[] = [
  // speaking.non-verbal-communication
  //   A: MC-A-NON-VERBAL-CUES-LIKE-EYE-CONTACT-AND-GESTURE-MEAN-THE-SAME-THING-IN-EVERY
  //   B: MC-B-NON-VERBAL-COMMUNICATION-IS-JUST-A-MINOR-ADDITION-TO-THE-REAL-MESSAGE-WHI
  adultCard("eng.speaking.non-verbal-communication",
    "A manager sees a new colleague look down and away while the manager speaks, and concludes the colleague is evasive, adding that body language does not matter next to the words. Which statement is accurate?",
    "Non-verbal cues vary by culture, so looking away may signal respect, not evasiveness, and body language carries real meaning",
    "Looking away means the same thing in every culture, so the colleague is evasive",
    "Body language is a minor addition to the real message, which is only the spoken words, so the colleague's gaze tells the manager nothing",
    "non-verbal meaning is cultural and substantial"),
  // speaking.oral-fluency
  //   A: MC-FLUENCY-MEANS-ZERO-HESITATION
  //   B: MC-FLUENCY-REQUIRES-PERFECT-GRAMMAR
  adultCard("eng.speaking.oral-fluency",
    "A speaker pauses to find a word, says \"um\" twice and makes one small agreement slip, but keeps the talk moving at a natural pace. A listener says the speaker is not fluent. Which statement is accurate?",
    "The speaker is fluent: natural pace and forward momentum are compatible with pauses, fillers, self-corrections and small slips",
    "The speaker is not fluent, because fluency means zero hesitation, and the pause and the two \"um\"s show that she hesitates in her speech",
    "The speaker is not fluent, because fluency requires perfect grammar",
    "oral fluency is natural flow, not perfection"),
  // speaking.presentation-skills
  //   A: MC-A-GOOD-PRESENTATION-COVERS-AS-MUCH-INFORMATION-AS-POSSIBLE
  //   B: MC-VISUAL-AIDS-SHOULD-CONTAIN-EVERYTHING-THE-SPEAKER-WILL-SAY
  adultCard("eng.speaking.presentation-skills",
    "A manager has ten minutes to present a new training program and could talk about twelve topics. She plans to put her full script on the slides. What is the better plan?",
    "Choose the few key points that matter for this audience and time, and put only brief prompts and visuals on the slides",
    "Cover all twelve topics, since a good presentation covers as much information as possible",
    "Put the whole script on the slides, since visual aids should contain everything the speaker will say, word for word, so nothing is forgotten",
    "select key points; slides support the speaker"),
  // speaking.pronunciation-in-conversation
  //   A: MC-NATIVE-LIKE-ACCENT-IS-THE-GOAL
  //   B: MC-PERFECT-INDIVIDUAL-SOUNDS-MORE-IMPORTANT-THAN-STRESS-AND-INTONATION
  adultCard("eng.speaking.pronunciation-in-conversation",
    "A clear speaker with a regional accent places word stress correctly and is understood by everyone, but she spends her practice time trying to sound native-like and perfecting every individual vowel. What advice is sound?",
    "Understanding is the goal: correct word stress and intonation often matter more than perfect individual sounds, and a native-like accent is not required",
    "She should keep working toward a native-like accent, since that is the goal of pronunciation practice",
    "She is right to prioritize perfect individual sounds, since they matter more than stress and intonation",
    "intelligibility over native-likeness; stress and intonation weigh heavily"),
  // speaking.public-speaking-basics
  //   A: MC-A-GOOD-SPEAKER-MEMORIZES-EVERY-WORD-AND-RECITES-IT-EXACTLY
  //   B: MC-NERVOUSNESS-BEFORE-SPEAKING-MEANS-YOU-WILL-DO-BADLY
  adultCard("eng.speaking.public-speaking-basics",
    "Before a talk, a speaker feels a racing heart and plans to memorize every word and recite it exactly. A friend says a nervous speaker will do badly. What is sound advice?",
    "Nervousness is normal and does not predict quality, and a flexible talk from key points usually beats a recited script",
    "Memorize every word and recite it exactly, since that is what a good speaker does and it removes any chance of a slip or a lost place",
    "The friend is right: feeling nervous before speaking means you will do badly",
    "nervousness does not predict performance; recitation is not the goal"),
  // speaking.storytelling-orally
  //   A: MC-A-A-GOOD-ORAL-STORY-INCLUDES-EVERY-DETAIL-IN-EXACT-ORDER
  //   B: MC-B-VOCAL-EXPRESSION-IS-AN-OPTIONAL-EXTRA-SEPARATE-FROM-THE-REAL-CONTENT-OF-T
  adultCard("eng.speaking.storytelling-orally",
    "A nurse tells colleagues about a tense night shift. One version lists every task in order in a steady monotone. Another picks the two turning points, slows down at the crisis and varies tone. Which is the better oral story, and why?",
    "The second: it selects the events that matter and uses the voice to carry them; vocal expression is part of the story",
    "The first, because a good oral story includes every detail in exact order",
    "The first, because vocal expression is an optional extra separate from the content, and the nurse's facts are the same either way",
    "select and emphasize; voice carries meaning"),
  // vocab.academic-vocabulary
  //   A: MC-A-ANY-UNFAMILIAR-OR-COMPLEX-SOUNDING-WORD-IN-AN-ACADEMIC-TEXT-COUNTS-AS-ACA
  //   B: MC-B-ACADEMIC-WORDS-MEAN-THE-SAME-THING-IN-ACADEMIC-WRITING-AS-THEY-DO-IN-EVER
  adultCard("eng.vocab.academic-vocabulary",
    "A student reading a history essay lists \"feudalism\" and \"analyze\" as the same kind of academic vocabulary, and uses \"significant\" to mean \"pretty big\", as in casual speech. Which statement is accurate?",
    "\"Analyze\" is general academic vocabulary because it recurs across subjects, while \"feudalism\" is specific to history; and academic words can carry a more precise meaning than their casual use",
    "Both are academic vocabulary, since any unfamiliar or complex-sounding word in an academic text counts",
    "\"Significant\" means the same in an essay as in casual speech, so \"pretty big\" is exact",
    "cross-subject recurrence; academic meaning can differ from casual"),
  // vocab.collocations
  //   A: MC-COLLOCATIONS-ARE-JUST-A-FANCY-NAME-FOR-IDIOMS
  //   B: MC-IF-A-SYNONYM-FITS-THE-DEFINITION-IT-FITS-THE-PHRASE
  adultCard("eng.vocab.collocations",
    "A student writes \"do a mistake\" because \"do\" and \"make\" both mean \"perform\", and says collocations are just a fancy name for idioms. Which statement is accurate?",
    "English habitually pairs \"make\" with \"mistake\": a collocation is a habitual word partnership, not a logical or synonym-based match, and it differs from an idiom, whose meaning is not the sum of its words",
    "Collocations are just a fancy name for idioms, so \"make a mistake\" is an idiom like \"hit the road\"",
    "\"Do a mistake\" is fine, because if a synonym fits the definition it fits the phrase",
    "collocation is habitual pairing; a synonym can break it"),
  // vocab.compound-words
  //   A: MC-COMPOUND-MEANING-IS-ALWAYS-LITERAL-SUM
  //   B: MC-COMPOUND-WORDS-ARE-ALWAYS-WRITTEN-AS-ONE-WORD
  adultCard("eng.vocab.compound-words",
    "A learner says \"honeymoon\" must mean a moon made of honey, and that \"ice cream\" cannot be a compound because it is written as two words. Which statement is accurate?",
    "Some compounds are not the literal sum of their parts, so \"honeymoon\" has its own meaning; and compounds may be written as one word, hyphenated or as two words, so \"ice cream\" can be a compound",
    "\"Honeymoon\" means a moon made of honey, since a compound's meaning is always the literal sum of its parts",
    "\"Ice cream\" cannot be a compound, since compound words are always written as one word",
    "compound meaning can be opaque; spelling forms vary"),
  // vocab.connotation-denotation
  //   A: MC-CONNOTATION-IS-JUST-PERSONAL-OPINION
  //   B: MC-SAME-DENOTATION-MEANS-INTERCHANGEABLE
  adultCard("eng.vocab.connotation-denotation",
    "In a reference letter, a writer swaps \"thrifty\" for \"stingy\" and \"curious\" for \"nosy\", saying the words have the same dictionary meaning and that how they feel is only personal opinion. Which statement is accurate?",
    "The words may share a denotation but carry different connotations, critical for \"stingy\" and \"nosy\", so they are not interchangeable and the difference is not merely personal opinion",
    "How the words feel is just personal opinion, so connotation does not matter to word choice",
    "The words are interchangeable, because the same denotation means the same effect",
    "connotation is a shared cultural association; same denotation is not interchangeable"),
]
