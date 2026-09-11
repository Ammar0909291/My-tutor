/**
 * ENGLISH ADULT-BAND PROBE-CONTRACT CAMPAIGN — Batch 12 (FINAL BATCH).
 *
 * Completes the campaign begun in Batches 1-11 (110 concepts) per the
 * standing instruction to continue "until you finish all English concepts"
 * against the TRUE-gap list `englishAdultBandAudit.ts` computes. After this
 * batch, the TRUE remaining gap (EARLY/ELEMENTARY/MIDDLE/UNDERGRADUATE-native
 * concepts lacking ADULT-band closed-choice probe contract) is 0.
 *
 * 9 concepts (the entirety of the remaining TRUE-gap list, KG order):
 * eng.speaking.public-speaking-basics, eng.speaking.non-verbal-communication,
 * eng.literature.narrative-elements, eng.literature.plot-structure,
 * eng.literature.character-development, eng.literature.setting-and-atmosphere,
 * eng.literature.point-of-view, eng.literature.drama-basics,
 * eng.communication.digital-communication. 27 new ADULT-band closed-choice
 * probes (3/concept), same mcq(FOUNDATIONAL)/misconception_probe(DEVELOPING)/
 * mcq(PROFICIENT) ladder as Batches 1-11, reusing each concept's own two
 * already-registered, already-ACTIVE misconceptions (every registry checked
 * against englishProbeBatch5/6/10.ts + authoredSeedAssets.ts, confirmed
 * exactly 2 per concept) via genuinely different adult-context examples
 * (workplace presentations, professional video calls, business writing,
 * corporate literature/training contexts) than each concept's native-band
 * probes use.
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
    { stem: string; correct: string; wrong: string },
    { stem: string; correct: string; wrong: string },
    { stem: string; correct: string; wrong: string },
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

const PUBLIC_SPEAKING_ADULT = adultLadder(
  'eng.speaking.public-speaking-basics', 'MC-NERVOUSNESS-BEFORE-SPEAKING-MEANS-YOU-WILL-DO-BADLY', 'MC-A-GOOD-SPEAKER-MEMORIZES-EVERY-WORD-AND-RECITES-IT-EXACTLY',
  [
    {
      stem: 'An employee feels their heart racing and hands shaking just before presenting quarterly results to senior leadership. Does feeling nervous right before a presentation mean the presentation itself will go badly?',
      correct: 'No — pre-presentation nervousness is a normal physiological response and does not predict a poor performance; many effective speakers feel nervous and still deliver well',
      wrong: 'Yes — feeling nervous right before speaking is a reliable sign the presentation will go badly',
    },
    {
      stem: 'A presenter memorizes their entire quarterly-results speech word for word and recites it exactly, losing their place and freezing when a slide fails to advance on cue. Does memorizing and reciting every word exactly make someone a good public speaker?',
      correct: 'No — word-for-word memorization is fragile and can cause the speaker to freeze on any deviation; good public speaking relies on knowing the key points and adapting, not exact recitation',
      wrong: 'Yes — memorizing every word and reciting it exactly is what makes someone a good public speaker',
    },
    {
      stem: 'Before addressing the whole company at an all-hands meeting, a manager notices their hands are shaking. Does this shaking mean the talk is doomed to go badly?',
      correct: 'No — physical nervousness before speaking does not determine how the talk will actually go; it is a common, manageable response, not a predictor of failure',
      wrong: 'Yes — visible nervousness right before speaking means the talk will inevitably go badly',
    },
  ],
  [
    'MC-NERVOUSNESS-BEFORE-SPEAKING-MEANS-YOU-WILL-DO-BADLY, adult workplace framing with a quarterly-results presentation rather than the existing everyday-sentence examples',
    'MC-A-GOOD-SPEAKER-MEMORIZES-EVERY-WORD-AND-RECITES-IT-EXACTLY, re-asked with a frozen word-for-word recitation scenario rather than the existing toy examples',
    'MC-NERVOUSNESS-BEFORE-SPEAKING-MEANS-YOU-WILL-DO-BADLY, a second fresh example (an all-hands company meeting) forming the ladder\'s third rung',
  ],
)

const NON_VERBAL_ADULT = adultLadder(
  'eng.speaking.non-verbal-communication', 'MC-A-NON-VERBAL-CUES-LIKE-EYE-CONTACT-AND-GESTURE-MEAN-THE-SAME-THING-IN-EVERY-CULTURE', 'MC-B-NON-VERBAL-COMMUNICATION-IS-JUST-A-MINOR-ADDITION-TO-THE-REAL-MESSAGE-WHICH-IS-THE-SPOKEN-WORDS',
  [
    {
      stem: 'During an international video call, one colleague avoids direct eye contact with the camera while speaking, which a teammate from another culture interprets as disrespect. Does eye contact and gesture mean the same thing in every culture?',
      correct: 'No — the meaning of eye contact, gesture, and other non-verbal cues varies significantly across cultures; the same behavior can signal respect in one culture and something else entirely in another',
      wrong: 'Yes — eye contact and gesture carry the exact same meaning in every culture, so no misinterpretation is possible',
    },
    {
      stem: 'A manager says "Great job on the project" in a flat tone, arms crossed, avoiding eye contact, while the words themselves are entirely positive. Is the non-verbal signal here just a minor addition to the real message carried by the spoken words?',
      correct: 'No — the non-verbal signals (tone, posture, eye contact) can carry as much or more meaning than the words themselves, here suggesting the praise is not sincere; non-verbal communication is not a minor add-on',
      wrong: 'Yes — the spoken words are the real message, and body language is just a minor extra detail on top of it',
    },
    {
      stem: 'In a negotiation, one side\'s representative maintains a firm, direct gaze that is considered assertive in their own culture, but the counterpart from another cultural background reads it as confrontational. Does this cue mean the same thing across cultures?',
      correct: 'No — the same gaze can be read as assertive in one culture and confrontational in another, confirming non-verbal cues are culturally variable, not universal',
      wrong: 'Yes — a direct gaze is universally understood as assertive in every culture, with no room for a different interpretation',
    },
  ],
  [
    'MC-A-NON-VERBAL-CUES-LIKE-EYE-CONTACT-AND-GESTURE-MEAN-THE-SAME-THING-IN-EVERY-CULTURE, adult workplace framing with an international video call rather than the existing everyday-sentence examples',
    'MC-B-NON-VERBAL-COMMUNICATION-IS-JUST-A-MINOR-ADDITION-TO-THE-REAL-MESSAGE-WHICH-IS-THE-SPOKEN-WORDS, re-asked with an insincere-praise workplace scenario rather than the existing toy examples',
    'MC-A-NON-VERBAL-CUES-LIKE-EYE-CONTACT-AND-GESTURE-MEAN-THE-SAME-THING-IN-EVERY-CULTURE, a second fresh example (a cross-cultural negotiation) forming the ladder\'s third rung',
  ],
)

const NARRATIVE_ELEMENTS_ADULT = adultLadder(
  'eng.literature.narrative-elements', 'MC-PLOT-MEANS-EVERYTHING-THAT-HAPPENS-IN-THE-STORY', 'MC-SETTING-IS-JUST-WHERE-AND-WHEN-A-STORY-HAPPENS-WITH-NO-OTHER-EFFECT',
  [
    {
      stem: 'A workplace training story about an employee overcoming a technical failure also mentions in passing that the character usually orders the same coffee every morning. Is that coffee-ordering habit part of the story\'s plot?',
      correct: 'No — an incidental habit unconnected to the technical-failure conflict is not part of the plot; plot is the causally connected chain of events driving the central conflict, not every detail mentioned',
      wrong: 'Yes — the plot includes absolutely everything that happens or is mentioned in the story, including unrelated habits',
    },
    {
      stem: 'A corporate case-study narrative is set once in a bright, open-plan office and once in a cramped, windowless basement archive, for the same tense budget dispute. Is the setting merely a neutral label of where the scene happens, with no other effect on the story?',
      correct: 'No — the two settings create very different moods for the same dispute (openness/exposure versus confinement/pressure), showing setting does real narrative work beyond stating where and when',
      wrong: 'Yes — setting is just a factual label of where and when events happen, with no effect on how the story feels',
    },
    {
      stem: 'A training narrative describes a manager resolving a client complaint, and separately notes that the manager\'s desk has a photo of their dog. Is the detail about the dog photo part of the plot?',
      correct: 'No — a detail unconnected to the causal chain of the complaint-resolution conflict is not part of the plot, even though it is mentioned in the story',
      wrong: 'Yes — anything mentioned anywhere in the story counts as part of the plot',
    },
  ],
  [
    'MC-PLOT-MEANS-EVERYTHING-THAT-HAPPENS-IN-THE-STORY, adult workplace framing with a corporate training narrative rather than the existing everyday-sentence examples',
    'MC-SETTING-IS-JUST-WHERE-AND-WHEN-A-STORY-HAPPENS-WITH-NO-OTHER-EFFECT, re-asked with a contrasting-office-settings scenario rather than the existing toy examples',
    'MC-PLOT-MEANS-EVERYTHING-THAT-HAPPENS-IN-THE-STORY, a second fresh example (a client-complaint case study) forming the ladder\'s third rung',
  ],
)

const PLOT_STRUCTURE_ADULT = adultLadder(
  'eng.literature.plot-structure', 'MC-THE-CLIMAX-IS-JUST-THE-MOST-EXCITING-OR-ACTION-PACKED-MOMENT', 'MC-EVERY-STORY-FOLLOWS-THE-FIVE-STAGES-IN-EQUAL-PROPORTION',
  [
    {
      stem: 'In a case-study narrative about a failing product launch, the quiet moment when the team lead finally decides whether to cancel the launch or push forward carries far more tension than any louder scene in the story, even though nothing "exciting" happens on the surface. Is the climax necessarily the loudest or most action-packed moment?',
      correct: 'No — the climax is the point of highest tension or the turning decision in the conflict, which can be a quiet, decisive moment rather than the most outwardly exciting or action-packed one',
      wrong: 'Yes — the climax is always whichever moment in the story is the loudest or most action-packed',
    },
    {
      stem: 'A business case-study narrative spends most of its length on rising complications and resolves the climax and falling action in just a few sentences. Does a well-structured narrative need to give each of the five stages (exposition, rising action, climax, falling action, resolution) roughly equal length?',
      correct: 'No — the five stages of plot structure do not need equal proportion; a narrative can legitimately spend most of its length on rising action and compress the rest',
      wrong: 'Yes — a properly structured narrative must give each of the five stages roughly the same amount of space',
    },
    {
      stem: 'In a merger negotiation narrative, the turning point is a brief, quiet moment when one executive privately decides to accept the deal — not a dramatic confrontation. Is this quiet moment still the climax?',
      correct: 'Yes — the climax is defined by where the central tension turns or resolves, which can be a quiet decision rather than the most visibly dramatic moment',
      wrong: 'No — only a loud, visibly dramatic confrontation can count as the climax',
    },
  ],
  [
    'MC-THE-CLIMAX-IS-JUST-THE-MOST-EXCITING-OR-ACTION-PACKED-MOMENT, adult workplace framing with a product-launch case study rather than the existing everyday-sentence examples',
    'MC-EVERY-STORY-FOLLOWS-THE-FIVE-STAGES-IN-EQUAL-PROPORTION, re-asked with an unevenly-proportioned business case study rather than the existing toy examples',
    'MC-THE-CLIMAX-IS-JUST-THE-MOST-EXCITING-OR-ACTION-PACKED-MOMENT, a second fresh example (a merger negotiation) forming the ladder\'s third rung',
  ],
)

const CHARACTER_DEV_ADULT = adultLadder(
  'eng.literature.character-development', 'MC-A-CHARACTERS-TRAITS-ARE-DIRECTLY-STATED-BY-THE-AUTHOR', 'MC-A-CHARACTER-EITHER-CHANGES-COMPLETELY-OR-NOT-AT-ALL',
  [
    {
      stem: 'A case-study narrative never says a manager "is patient," but shows her calmly repeating instructions three times to a struggling new hire without raising her voice. Must a character trait be directly stated by the author/narrator to count as revealed?',
      correct: 'No — a trait can be revealed entirely through action and dialogue, without ever being directly stated; this is in fact the more common technique',
      wrong: 'Yes — a character trait only counts as revealed if the author or narrator directly states it in words',
    },
    {
      stem: 'By the end of a workplace narrative, an executive becomes noticeably more willing to accept feedback from their own direct reports, but remains just as dismissive of feedback from outside consultants. Does this partial, situation-specific shift count as genuine character development?',
      correct: 'Yes — a specific, partial change in one relationship or context is genuine character development; growth does not have to be complete and universal to count',
      wrong: 'No — since the executive is still dismissive toward consultants, this does not count as real character development at all',
    },
    {
      stem: 'A training narrative never states that an employee "is meticulous," but shows him triple-checking every figure before sending a report. Is this trait still revealed even without a direct statement?',
      correct: 'Yes — the repeated triple-checking behavior reveals meticulousness through action, without needing a direct authorial statement',
      wrong: 'No — without the narrator explicitly calling him meticulous, the trait has not actually been revealed',
    },
  ],
  [
    'MC-A-CHARACTERS-TRAITS-ARE-DIRECTLY-STATED-BY-THE-AUTHOR, adult workplace framing with a patient-manager case study rather than the existing everyday-sentence examples',
    'MC-A-CHARACTER-EITHER-CHANGES-COMPLETELY-OR-NOT-AT-ALL, re-asked with a partial-feedback-acceptance workplace scenario rather than the existing toy examples',
    'MC-A-CHARACTERS-TRAITS-ARE-DIRECTLY-STATED-BY-THE-AUTHOR, a second fresh example (a meticulous-employee case study) forming the ladder\'s third rung',
  ],
)

const SETTING_ATMOSPHERE_ADULT = adultLadder(
  'eng.literature.setting-and-atmosphere', 'MC-A-SETTING-IS-JUST-NEUTRAL-BACKGROUND-INFORMATION-WITH-NO-EMOTIONAL-EFFECT', 'MC-B-A-SPECIFIC-SETTING-CAN-ONLY-EVER-CREATE-ONE-FIXED-ATMOSPHERE',
  [
    {
      stem: 'A case-study narrative describes an important client meeting taking place in a sleek, sunlit glass conference room on a top floor. Is this setting detail just neutral background information with no emotional effect on the reader?',
      correct: 'No — the sleek, sunlit, top-floor setting actively creates an atmosphere (of confidence, success, elevation) that shapes how the reader experiences the scene, beyond simply stating the location',
      wrong: 'Yes — a setting is purely neutral factual information about location, with no emotional or atmospheric effect',
    },
    {
      stem: 'The same corporate boardroom is used in one narrative for a tense layoff announcement, and in another narrative for a celebratory promotion announcement, with the descriptive details emphasized differently each time. Can the identical physical setting create only one fixed atmosphere, regardless of how it is described?',
      correct: 'No — the same physical setting can be described to evoke very different atmospheres depending on which details are emphasized; a setting does not lock in only one possible mood',
      wrong: 'Yes — once a specific physical setting is established, it can only ever produce the exact same fixed atmosphere every time it appears',
    },
    {
      stem: 'A business narrative places an urgent crisis-response meeting in a cramped, poorly-lit basement server room rather than a normal conference room. Is this setting choice emotionally neutral background information?',
      correct: 'No — the cramped, poorly-lit basement setting actively contributes to a feeling of pressure and urgency, showing setting is not emotionally neutral',
      wrong: 'Yes — where a scene physically takes place has no bearing on the emotional tone the reader experiences',
    },
  ],
  [
    'MC-A-SETTING-IS-JUST-NEUTRAL-BACKGROUND-INFORMATION-WITH-NO-EMOTIONAL-EFFECT, adult workplace framing with a glass conference room rather than the existing everyday-sentence examples',
    'MC-B-A-SPECIFIC-SETTING-CAN-ONLY-EVER-CREATE-ONE-FIXED-ATMOSPHERE, re-asked with the same boardroom used for two different tones rather than the existing toy examples',
    'MC-A-SETTING-IS-JUST-NEUTRAL-BACKGROUND-INFORMATION-WITH-NO-EMOTIONAL-EFFECT, a second fresh example (a crisis-response server room) forming the ladder\'s third rung',
  ],
)

const POINT_OF_VIEW_ADULT = adultLadder(
  'eng.literature.point-of-view', 'MC-A-A-FIRST-PERSON-NARRATOR-ALWAYS-TELLS-THE-COMPLETE-UNBIASED-TRUTH-ABOUT-EVERYTHING-THAT-HAPPENS', 'MC-B-THIRD-PERSON-OMNISCIENT-AND-THIRD-PERSON-LIMITED-ARE-BASICALLY-THE-SAME-THING-JUST-USING-HE-SHE',
  [
    {
      stem: 'A case-study narrative is told entirely in first person by an employee who insists their manager "always" treats them unfairly, though the reader later learns other details that complicate that claim. Does a first-person narrator always tell the complete, unbiased truth about everything that happens?',
      correct: 'No — a first-person narrator only has access to their own perspective and can be incomplete, biased, or mistaken; the account is not automatically the full, unbiased truth',
      wrong: 'Yes — because the narrator is a real participant telling their own story, a first-person account is always the complete, unbiased truth',
    },
    {
      stem: 'One version of a workplace narrative can reveal what every character in the meeting is privately thinking, while another version can only reveal what a single manager privately thinks while other characters remain opaque. Are third-person omniscient and third-person limited basically the same thing, just using "he/she" instead of "I"?',
      correct: 'No — omniscient narration has access to every character\'s inner thoughts, while limited narration is restricted to just one character\'s inner perspective; they differ in scope of access, not just in pronoun',
      wrong: 'Yes — third-person omniscient and third-person limited are essentially identical, differing only in using "he/she" rather than "I"',
    },
    {
      stem: 'A first-person case-study narrator describes a contract dispute entirely from their own side, omitting context the reader later learns from elsewhere. Is this first-person account automatically the complete, unbiased account of what happened?',
      correct: 'No — a first-person account is limited to that narrator\'s own knowledge and perspective and can omit or distort context, so it is not automatically complete or unbiased',
      wrong: 'Yes — since the narrator personally experienced the dispute, their first-person account must be the complete, unbiased truth',
    },
  ],
  [
    'MC-A-A-FIRST-PERSON-NARRATOR-ALWAYS-TELLS-THE-COMPLETE-UNBIASED-TRUTH-ABOUT-EVERYTHING-THAT-HAPPENS, adult workplace framing with a manager-fairness case study rather than the existing everyday-sentence examples',
    'MC-B-THIRD-PERSON-OMNISCIENT-AND-THIRD-PERSON-LIMITED-ARE-BASICALLY-THE-SAME-THING-JUST-USING-HE-SHE, re-asked with a meeting-thoughts-access scenario rather than the existing toy examples',
    'MC-A-A-FIRST-PERSON-NARRATOR-ALWAYS-TELLS-THE-COMPLETE-UNBIASED-TRUTH-ABOUT-EVERYTHING-THAT-HAPPENS, a second fresh example (a one-sided contract-dispute account) forming the ladder\'s third rung',
  ],
)

const DRAMA_BASICS_ADULT = adultLadder(
  'eng.literature.drama-basics', 'MC-STAGE-DIRECTIONS-ARE-JUST-OPTIONAL-EXTRA-DETAILS-LIKE-DESCRIPTIONS-IN-A-STORY', 'MC-A-PLAY-IS-JUST-A-STORY-WRITTEN-WITH-QUOTATION-MARKS-REMOVED',
  [
    {
      stem: 'In a workplace training script performed live for new hires, the line "Understood." reads very differently with the stage direction "[She says this while already walking away, not making eye contact.]" attached. Are stage directions just optional extra detail, similar to descriptions in a prose story?',
      correct: 'No — since a performed script has no narrator to describe tone or intent, stage directions are often the only way to convey meaning beyond the bare dialogue; this one substantially changes the interpretation',
      wrong: 'Yes — stage directions are skippable extra decoration, just like descriptive passages in a prose story',
    },
    {
      stem: 'A workplace training script needs to convey that a character privately doubts a decision they just agreed to out loud. Since a play has no narrator to write "he privately doubted it," is a script therefore basically just a prose story with the quotation marks removed?',
      correct: 'No — because drama has no narrator, private thoughts must be conveyed through devices unique to drama (an aside, a revealing stage direction, a later contradicting line), which is a fundamentally different craft from prose narration, not just prose without quotation marks',
      wrong: 'Yes — a play is essentially a prose story with the quotation marks taken out, since the dialogue could just be narrated instead',
    },
    {
      stem: 'In a performed training scenario, the stage direction "[He hesitates for a long moment before answering.]" appears before a single spoken line. Does this direction meaningfully change how the scene should be understood?',
      correct: 'Yes — the hesitation direction conveys reluctance or uncertainty that the bare spoken line alone does not communicate; it is not merely optional decoration',
      wrong: 'No — stage directions like this are just optional extra flourishes that can be safely ignored, like descriptive detail in a story',
    },
  ],
  [
    'MC-STAGE-DIRECTIONS-ARE-JUST-OPTIONAL-EXTRA-DETAILS-LIKE-DESCRIPTIONS-IN-A-STORY, adult workplace framing with a new-hire training script rather than the existing everyday-sentence examples',
    'MC-A-PLAY-IS-JUST-A-STORY-WRITTEN-WITH-QUOTATION-MARKS-REMOVED, re-asked with a private-doubt training-script scenario rather than the existing toy examples',
    'MC-STAGE-DIRECTIONS-ARE-JUST-OPTIONAL-EXTRA-DETAILS-LIKE-DESCRIPTIONS-IN-A-STORY, a second fresh example (a hesitation stage direction) forming the ladder\'s third rung',
  ],
)

const DIGITAL_COMM_ADULT = adultLadder(
  'eng.communication.digital-communication', 'MC-THE-SAME-REGISTER-AND-STYLE-WORKS-ACROSS-ALL-DIGITAL-PLATFORMS', 'MC-TONE-IS-EASY-TO-CONVEY-IN-TEXT-BASED-DIGITAL-COMMUNICATION',
  [
    {
      stem: 'An employee sends a client a formal email proposal, and then pastes the exact same wording, unedited, into a quick internal team chat message. Does the same register and writing style work equally well across every digital platform (formal email, team chat, etc.)?',
      correct: 'No — different digital platforms have different conventions (a formal email register reads as stiff and out of place in a quick internal chat, and vice versa); register needs to be adapted per platform',
      wrong: 'Yes — the same register and writing style is appropriate and works equally well on every digital platform',
    },
    {
      stem: 'A manager sends the text message "Sure, fine, whatever you think is best." to a direct report, intending it as genuine agreement, but the report reads it as sarcastic and dismissive. Is tone easy to convey reliably in text-based digital communication?',
      correct: 'No — text-based communication strips out vocal tone, facial expression, and pacing, making tone genuinely easy to misread; conveying intended tone in text requires deliberate extra care, not something that happens automatically',
      wrong: 'Yes — tone comes through just as easily and reliably in text-based digital communication as it does in face-to-face speech',
    },
    {
      stem: 'An employee copies a professional, formal email\'s exact phrasing into a casual company-wide chat announcement without adjusting it. Does identical wording and register work equally well on both platforms?',
      correct: 'No — the formal register that suits a client email is likely to read as unnecessarily stiff or distant in a casual internal chat; digital platforms genuinely differ in expected register',
      wrong: 'Yes — since both are digital communication, the exact same register and phrasing is equally appropriate on any platform',
    },
  ],
  [
    'MC-THE-SAME-REGISTER-AND-STYLE-WORKS-ACROSS-ALL-DIGITAL-PLATFORMS, adult workplace framing with an email-to-chat register mismatch rather than the existing everyday-sentence examples',
    'MC-TONE-IS-EASY-TO-CONVEY-IN-TEXT-BASED-DIGITAL-COMMUNICATION, re-asked with a misread-sarcasm workplace text scenario rather than the existing toy examples',
    'MC-THE-SAME-REGISTER-AND-STYLE-WORKS-ACROSS-ALL-DIGITAL-PLATFORMS, a second fresh example (a company-wide chat announcement) forming the ladder\'s third rung',
  ],
)

export const ENGLISH_ADULT_BAND_BATCH_12: SeedProbe[] = [
  ...PUBLIC_SPEAKING_ADULT, ...NON_VERBAL_ADULT, ...NARRATIVE_ELEMENTS_ADULT,
  ...PLOT_STRUCTURE_ADULT, ...CHARACTER_DEV_ADULT, ...SETTING_ATMOSPHERE_ADULT,
  ...POINT_OF_VIEW_ADULT, ...DRAMA_BASICS_ADULT, ...DIGITAL_COMM_ADULT,
]
