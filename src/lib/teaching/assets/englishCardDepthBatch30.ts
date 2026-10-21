/**
 * ENGLISH ADULT-BAND CARD-DEPTH — Batch 30 (10 cards, one per (concept, ADULT) pair). Why this exists, what a card is and the P-10 slot rule: see
 * `englishAdultCard.ts`. A new 3-option `fill_blank` card takes each pair from four gradeable probes to five; each wrong answer carries the id of one
 * of the concept's two registered misconceptions (A = first, B = second in `englishAdultMisconceptionIds.ts`). Option lengths are balanced (the correct
 * answer is the uniquely longest option in about a third of the cards, as chance would give), like the earlier card-depth batches.
 */
import type { SeedProbe } from './brainSeedAssets'
import { adultCard } from './englishAdultCard'

export const ENGLISH_CARD_DEPTH_BATCH_30: SeedProbe[] = [
  // linguistics.what-is-linguistics
  //   A: MC-A-LINGUISTICS-IS-THE-STUDY-OF-CORRECT-GRAMMAR-RULES
  //   B: MC-B-LINGUISTICS-IS-JUST-ONE-SINGLE-SUBJECT-ABOUT-GRAMMAR
  adultCard("eng.linguistics.what-is-linguistics",
    "A university lists linguistics research questions: why babies babble certain sounds, why a community uses a particular construction, how word meanings are organized, and how dialects differ. What does the list show about linguistics?",
    "It is a descriptive science of language with many sub-fields, not a set of rules about correct usage and not a single subject about grammar",
    "It is the study of correct grammar rules, so the list is mostly about errors people should avoid",
    "It is one single subject about grammar, so the sounds, meanings and dialects are all just grammar",
    "linguistics is descriptive and has many sub-fields"),
  // listening.active-listening
  //   A: MC-ACTIVE-LISTENING-MEANS-STAYING-SILENT
  //   B: MC-HEARING-EQUALS-LISTENING
  adultCard("eng.listening.active-listening",
    "On a project call, Kofi's ears register every word while he answers email, and Mia stays silent while looking away from the screen. Who is listening actively?",
    "Neither: active listening needs attention to meaning and visible engagement, such as a paraphrase or question",
    "Mia, because active listening means staying completely silent and still while the speaker talks, with no response of any kind",
    "Kofi, because hearing every word is the same as listening",
    "active listening is deliberate engagement; hearing is not listening"),
  // listening.critical-listening
  //   A: MC-A-A-CONFIDENT-FLUENT-SPEAKER-IS-MAKING-A-STRONGER-ARGUMENT
  //   B: MC-B-ANY-EVIDENCE-A-SPEAKER-MENTIONS-PROVES-THEIR-POINT-EQUALLY-WELL
  adultCard("eng.listening.critical-listening",
    "At a hearing, one speaker delivers a smooth, confident case citing \"a friend of mine\", and another hesitates over figures from a large published study. Which is the sound judgment?",
    "Delivery polish is not argument strength, and evidence differs in weight, so the hesitant speaker with the large study may argue better",
    "The confident, fluent speaker must be making the stronger argument",
    "Both are equally convincing, because any evidence a speaker mentions proves the point equally well, whether it is a study or a friend's story",
    "confidence is not strength; evidence quality differs"),
  // listening.distinguishing-sounds-in-speech
  //   A: MC-A-YOU-CAN-ALWAYS-TELL-SIMILAR-SOUNDING-WORDS-APART-JUST-BY-USING-SENTENCE-C
  //   B: MC-B-IF-YOU-CAN-DISTINGUISH-A-MINIMAL-PAIR-IN-CAREFUL-ISOLATED-SPEECH-YOULL-AU
  adultCard("eng.listening.distinguishing-sounds-in-speech",
    "On a fast call a listener hears \"He can come at six\" and cannot tell whether it was \"can\" or \"can't\", though the sentence makes sense either way. What does this show?",
    "Sentence context does not always settle similar sounds, and telling a contrast apart in slow isolated speech does not guarantee telling it apart in fast connected speech, so the listener should check",
    "Context can always settle it, so there is nothing to check",
    "Anyone who can tell \"can\" from \"can't\" in slow isolated speech will automatically tell them apart in fast speech",
    "context is not always enough; isolated skill does not transfer automatically"),
  // listening.following-instructions
  //   A: MC-A-ACTING-IMMEDIATELY-ON-THE-FIRST-INSTRUCTION-HEARD-IS-THE-RIGHT-APPROACH
  //   B: MC-B-INSTRUCTIONS-ARE-ALWAYS-EXECUTED-IN-THE-SAME-ORDER-THEY-ARE-MENTIONED
  adultCard("eng.listening.following-instructions",
    "A supervisor says: \"Send the file to the client, but before that get it approved, and before that update the budget sheet.\" What is the best approach?",
    "Hold the whole instruction first, then act in the real order: update the sheet, get approval, send the file",
    "Begin sending the file the moment you hear the first instruction, and catch the rest as you go",
    "Do the steps in the order they were mentioned: send the file, then get it approved, then update the sheet, exactly as they were spoken",
    "hold the complete instruction; mention order is not always execution order"),
  // listening.listening-comprehension-strategies
  //   A: MC-A-GOOD-LISTENERS-UNDERSTAND-EVERY-WORD-PERFECTLY-THE-FIRST-TIME
  //   B: MC-B-PREDICTING-WHAT-COMES-NEXT-MEANS-GUESSING-RANDOMLY-OR-JUST-ASSUMING-YOURE
  adultCard("eng.listening.listening-comprehension-strategies",
    "In a webinar the presenter says \"Costs fell sharply; on the other hand, ...\" and then uses the word \"attrition\", which the listener does not know. What is the best strategy?",
    "Predict from \"on the other hand\" that a contrasting point is coming, infer \"attrition\" from context, and keep listening",
    "Stop and work out the exact meaning of \"attrition\" first, because good listeners understand every word perfectly on the first pass",
    "Do not predict at all, because predicting means guessing randomly or assuming you are right",
    "infer and continue; prediction is informed by signals"),
  // listening.listening-for-detail
  //   A: MC-IF-YOU-MISS-ONE-DETAIL-THE-WHOLE-LISTENING-TASK-FAILED
  //   B: MC-LISTENING-FOR-DETAIL-MEANS-TRYING-TO-CATCH-EVERY-WORD
  adultCard("eng.listening.listening-for-detail",
    "Before listening to a long travel announcement, a traveller needs only the platform number. What is the best strategy, and what if another detail is missed?",
    "Decide in advance to listen for the platform number, let the rest pass, and accept that missing another detail is not failure",
    "Listen for the platform number but treat missing any other detail as a failure of the whole listening task, however minor it is",
    "Try to catch every word of the announcement, since listening for detail means catching every word",
    "decide what you need; missing a detail is not total failure"),
  // listening.listening-for-gist
  //   A: MC-GIST-LISTENING-IS-A-LOWER-SKILL-THAN-DETAILED-LISTENING
  //   B: MC-MUST-UNDERSTAND-EVERY-WORD-TO-UNDERSTAND-THE-GIST
  adultCard("eng.listening.listening-for-gist",
    "A listener in a noisy station catches only \"storm\", \"tonight\", \"coast\" and \"stay inside\" from a radio report. What is the sound conclusion?",
    "The listener has built a workable gist from key words and context; gist listening is a deliberate strategy, not a lesser one",
    "The gist is a lower-level skill than detailed listening, so this listener has understood very little of the report",
    "The listener cannot know the gist, because understanding the gist requires understanding every word of the report in full",
    "gist is a distinct strategy built on partial input"),
  // listening.note-taking-while-listening
  //   A: MC-A-GOOD-NOTES-MEANS-WRITING-DOWN-AS-MUCH-AS-POSSIBLE-WORD-FOR-WORD
  //   B: MC-B-NOTE-TAKING-IS-JUST-WRITING-DOWN-RANDOM-FACTS-AS-THEY-COME-UP-WITH-NO-STR
  adultCard("eng.listening.note-taking-while-listening",
    "During a talk, a trainer says: \"Three causes of delay: late approvals, unclear specs, and handover gaps.\" Which note-taking approach is best?",
    "Write a short organized note such as \"Delay causes: 1 approvals, 2 specs, 3 handover\", using abbreviations and structure",
    "Write the whole sentence word for word, since good notes mean as much of the speech as possible",
    "Jot down whichever facts come up next in any order, since note-taking is just writing down random facts as they appear, with no plan for organizing them",
    "abbreviated and structured, not verbatim or random"),
  // literature.character-development
  //   A: MC-A-CHARACTER-EITHER-CHANGES-COMPLETELY-OR-NOT-AT-ALL
  //   B: MC-A-CHARACTERS-TRAITS-ARE-DIRECTLY-STATED-BY-THE-AUTHOR
  adultCard("eng.literature.character-development",
    "In a short story, a shy student never gets a narrator's label, but she starts answering questions in class and, at the end, still blushes when praised. How should a reader interpret her?",
    "Her traits are inferred from what she does, and she changes partly and believably: more confident in class, still shy elsewhere",
    "She has either changed completely or not at all, so one blush shows she did not really change",
    "Her traits must be stated directly by the author, so the reader should look for the narrator to label her as shy or as confident",
    "show-don't-tell characterization; change can be partial"),
]
