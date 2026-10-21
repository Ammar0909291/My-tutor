/**
 * ENGLISH ADULT-BAND CARD-DEPTH — Batch 25 (19 cards, one per (concept, ADULT) pair). Why this exists, what a card is and the P-10 slot rule: see
 * `englishAdultCard.ts`. A new 3-option `fill_blank` card takes each pair from four gradeable probes to five; each wrong answer carries the id of one
 * of the concept's two registered misconceptions (A = first, B = second in `englishAdultMisconceptionIds.ts`). Option lengths are balanced (the correct
 * answer is the uniquely longest option in about a third of the cards, as chance would give), like the earlier card-depth batches.
 */
import type { SeedProbe } from './brainSeedAssets'
import { adultCard } from './englishAdultCard'

export const ENGLISH_CARD_DEPTH_BATCH_25: SeedProbe[] = [
  // communication.academic-writing-advanced
  //   A: MC-A-ADVANCED-ACADEMIC-WRITING-MEANS-IGNORING-WHAT-OTHERS-HAVE-ALREADY-SAID
  //   B: MC-B-A-LONGER-MORE-COMPLEX-SOUNDING-PIECE-IS-AUTOMATICALLY-MORE-SOPHISTICATED
  adultCard("eng.communication.academic-writing-advanced",
    "A researcher drafting the introduction to an article on urban beekeeping wants it to read as advanced academic writing. Which opening move best shows that?",
    "Place the claim in the existing scholarly conversation: say what earlier studies have emphasized, then how this article extends, challenges or synthesizes them",
    "Start straight with the new claim and leave earlier studies out, so the contribution is not diluted by other people's positions",
    "Lengthen the introduction with elaborate syntax and restated points, because a longer, more complex introduction is automatically more sophisticated",
    "situating an argument in the conversation, and length is not depth"),
  // communication.business-writing
  //   A: MC-A-BUSINESS-WRITING-SHOULD-BUILD-UP-TO-THE-MAIN-POINT-LIKE-AN-ACADEMIC-ESSAY
  //   B: MC-B-A-BUSINESS-DOCUMENT-JUST-NEEDS-TO-CONTAIN-THE-RIGHT-INFORMATION-FORMATTIN
  adultCard("eng.communication.business-writing",
    "A project manager must ask the finance team to approve an extra budget line by Thursday. Which email opening works best for a busy reader?",
    "Open with the request and the deadline in the first sentence, then give the background after it",
    "Open with two paragraphs on how the project reached this point and build toward the request at the end, the way an essay builds toward its thesis",
    "Put the request anywhere in one dense block of text, since the right information is present and how it is laid out does not matter",
    "main point first, and formatting serves a scanning reader"),
  // communication.cross-cultural-communication
  //   A: MC-A-MY-OWN-CULTURES-COMMUNICATION-NORMS-ARE-THE-UNIVERSAL-DEFAULT-AND-CORRECT
  //   B: MC-B-AN-ENTIRE-CULTURE-HAS-ONE-SINGLE-UNIFORM-COMMUNICATION-STYLE-WITH-NO-INTE
  adultCard("eng.communication.cross-cultural-communication",
    "In an international team, one engineer rarely speaks unless invited by name, while a colleague from the same country interrupts freely. What is the sound way for the manager to respond?",
    "Treat both as individual styles, learn each person's preferences, and avoid judging either against a single standard",
    "Treat the interrupting style as the correct way to take part in a meeting and coach the quieter engineer to match it",
    "Decide that the quiet engineer speaks for everyone from that country, because a whole culture shares one communication style",
    "own norms are not the universal default; no culture is uniform"),
  // communication.digital-communication
  //   A: MC-THE-SAME-REGISTER-AND-STYLE-WORKS-ACROSS-ALL-DIGITAL-PLATFORMS
  //   B: MC-TONE-IS-EASY-TO-CONVEY-IN-TEXT-BASED-DIGITAL-COMMUNICATION
  adultCard("eng.communication.digital-communication",
    "A student emails a professor to ask for a deadline extension on an essay. Which message suits the platform and the relationship?",
    "Dear Professor Lee, I am writing to ask whether I might have a short extension on the essay. Thank you for considering it.",
    "hey prof can i get more time on the essay?? thx",
    "Need an extension on the essay. My respectful tone will come across without any greeting or polite phrasing, so none is needed.",
    "register matches platform and relationship; tone does not carry itself in text"),
  // communication.discourse-markers-advanced
  //   A: MC-A-DISCOURSE-MARKERS-ARE-INTERCHANGEABLE-CONNECTORS-REGARDLESS-OF-THE-ACTUAL
  //   B: MC-B-MORE-SOPHISTICATED-SOUNDING-DISCOURSE-MARKERS-ARE-ALWAYS-BETTER-REGARDLES
  adultCard("eng.communication.discourse-markers-advanced",
    "For the gap in \"The funding ran out. ____ the trial ended early.\", which marker is correct, and why?",
    "\"So\" or \"Therefore\": a result marker, because the early end follows from the funding running out",
    "\"However\": any connector will do, since discourse markers are interchangeable ways of joining two sentences",
    "\"Notwithstanding this\": the more sophisticated-sounding marker is better whether or not the relationship fits",
    "each marker signals a specific relationship; elaborate is not better"),
  // communication.editing-for-publication
  //   A: MC-A-IF-YOUVE-ALREADY-CAREFULLY-READ-THROUGH-A-PIECE-FOR-CONTENT-YOUVE-ALSO-EF
  //   B: MC-B-IF-THE-CONTENT-IS-STRONG-ENOUGH-FORMATTING-AND-SURFACE-ERRORS-WONT-REALLY
  adultCard("eng.communication.editing-for-publication",
    "A poet has revised a collection for meaning until every poem reads as intended, and must now submit it to a press whose guidelines set a manuscript format. What should the poet do next?",
    "Do a separate, dedicated pass for spelling, punctuation and formatting against the press guidelines before submitting",
    "Submit it now; having read every poem closely for meaning, the poet has effectively proofread it too",
    "Submit it in any format, because poems this strong will make an editor overlook formatting and surface slips, however many there are",
    "a content read does not proofread; surface polish is judged separately"),
  // communication.media-literacy
  //   A: MC-A-NEWS-AND-MEDIA-COVERAGE-SIMPLY-SHOWS-WHAT-HAPPENED-WITH-NO-CONSTRUCTED-CH
  //   B: MC-B-EMOTIONALLY-ENGAGING-OR-ATTENTION-GRABBING-CONTENT-IS-AUTOMATICALLY-LESS-
  adultCard("eng.communication.media-literacy",
    "Two news sites cover the same council vote. One headline says \"Council Slashes Library Hours\", the other \"Council Adjusts Library Schedule\". What is the most accurate conclusion?",
    "Each headline reflects production choices of wording and framing; comparing them shows what each emphasizes",
    "Both simply show what happened, so the difference in wording says nothing about the coverage",
    "The more emotional headline must be the less trustworthy one, because attention-grabbing wording is automatically unreliable",
    "coverage is constructed; emotional is not automatically untrustworthy"),
  // communication.negotiation-language
  //   A: MC-A-EFFECTIVE-NEGOTIATION-LANGUAGE-MEANS-PUSHING-YOUR-OWN-POSITION-AS-HARD-AS
  //   B: MC-B-AVOIDING-DISAGREEMENT-ALTOGETHER-BY-STAYING-SILENT-OR-QUICKLY-AGREEING-IS
  adultCard("eng.communication.negotiation-language",
    "Two departments are negotiating who hosts a shared event. One manager says her team can only host in spring because of a staffing limit. What is the best response?",
    "Acknowledge the spring constraint first, then propose an alternative that moves toward a workable middle",
    "Restate your preferred date more forcefully, since effective negotiation means pushing your position as hard as possible",
    "Say \"fine, spring it is\" at once and keep your own concern to yourself, since avoiding disagreement is the same as consensus",
    "acknowledge, then propose; silence is not agreement"),
  // communication.presentation-design
  //   A: MC-A-A-GOOD-SLIDE-CONTAINS-THE-FULL-TEXT-OF-WHAT-THE-SPEAKER-WILL-SAY
  //   B: MC-B-EVERY-SLIDE-NEEDS-DECORATIVE-VISUAL-ELEMENTS-TO-LOOK-PROFESSIONAL
  adultCard("eng.communication.presentation-design",
    "A speaker is building one slide to support a talk on customer growth of 18 percent in 2024. Which slide supports the talk best?",
    "One short phrase, \"Customers +18%\", with a simple chart of the trend",
    "A full paragraph repeating everything the speaker will say, so the audience has the whole text in front of them",
    "The key phrase surrounded by a decorative border and an unrelated stock photo, because every slide needs decoration to look professional",
    "slides support the speech; decoration is not a requirement"),
  // communication.professional-communication
  //   A: MC-A-THE-CHANNEL-WRITTEN-VS-SPOKEN-DOESNT-MATTER-AS-LONG-AS-THE-MESSAGE-CONTEN
  //   B: MC-B-A-SPOKEN-PRESENTATION-SHOULD-BE-A-WORD-FOR-WORD-READING-OF-THE-WRITTEN-DO
  adultCard("eng.communication.professional-communication",
    "A site supervisor must tell a crew right now that an inspection has moved two hours earlier, and also needs a record of the new time. Which approach serves both needs?",
    "Tell the crew directly by phone or in person for the urgent part, then send a short written confirmation as the record",
    "Send only an email, because the channel does not matter as long as the content of the message is right",
    "Read the full written inspection report aloud word for word, so the spoken version matches the document exactly",
    "channel is a functional choice; speaking is not reading the document aloud"),
  // communication.research-methodology-writing
  //   A: MC-A-DESCRIBING-A-METHOD-MEANS-JUST-LISTING-THE-STEPS-TAKEN-WITH-NO-JUSTIFICAT
  //   B: MC-B-A-GOOD-METHODOLOGY-SECTION-SHOULD-PRESENT-THE-METHOD-AS-FLAWLESS-WITH-NO-
  adultCard("eng.communication.research-methodology-writing",
    "A survey study reports its sampling choice. Which methods sentence best meets the standard of a strong methodology section?",
    "We surveyed 120 commuters at two stations, chosen to reach daily riders directly; because both stations serve one city, the results may not generalize to other regions.",
    "We surveyed 120 commuters at two stations and then analyzed their answers, reporting the totals for each question",
    "We surveyed 120 commuters at two stations using a flawless sampling method that has no weaknesses worth mentioning, so no limits need stating",
    "justify each choice and state limitations honestly"),
  // communication.technical-writing
  //   A: MC-A-TECHNICAL-WRITING-SHOULD-USE-VARIED-VOCABULARY-TO-AVOID-REPETITION-LIKE-O
  //   B: MC-B-TECHNICAL-WRITING-ONLY-NEEDS-TO-DESCRIBE-WHAT-TO-DO-WHEN-EVERYTHING-GOES-
  adultCard("eng.communication.technical-writing",
    "A guide for a backup tool names a setting \"Retention Period\" in step 2. How should later steps refer to it, and what should the guide cover?",
    "Use the exact term \"Retention Period\" every time, and also tell the reader what to do if the backup fails",
    "Vary it (\"storage window\", \"keep-time\") to avoid repetition, since varied vocabulary makes technical writing read better",
    "Use the exact term every time but cover only the steps for when everything goes right, since failures need not be described",
    "consistent terms, and anticipate failure points"),
  // composition.academic-writing-conventions
  //   A: MC-A-ACADEMIC-OBJECTIVITY-MEANS-HAVING-NO-OPINION-OR-ARGUMENT-AT-ALL
  //   B: MC-B-HEDGING-LANGUAGE-MEANS-BEING-VAGUE-OR-WEAK-ABOUT-EVERYTHING
  adultCard("eng.composition.academic-writing-conventions",
    "A report rests one claim on a large randomized trial and another on a single small pilot study. Which treatment reflects academic conventions?",
    "State both claims clearly, with firm wording for the trial-backed claim and more cautious wording for the pilot-backed one",
    "State neither as a claim and write only that there are many views on the topic, since objectivity means having no opinion",
    "Hedge both identically with \"might possibly\" and \"could perhaps\", since hedging means being vague or weak about everything",
    "a clear claim with confidence matched to the evidence"),
  // composition.argumentation-basics
  //   A: MC-A-MORE-REASONS-IS-ALWAYS-A-STRONGER-ARGUMENT
  //   B: MC-B-ARGUMENT-ORGANIZATION-DOESNT-MATTER-AS-LONG-AS-THE-POINTS-ARE-GOOD
  adultCard("eng.composition.argumentation-basics",
    "A club proposes buying a shared printer. Draft one lists seven reasons, five of which say \"it will save us money\" in different words, in random order. What is the best revision?",
    "Keep a few genuinely different reasons (cost, convenience, reliability), develop each, and order them so the case builds",
    "Keep all seven, since more reasons always make a stronger argument and the repeats add weight to the case",
    "Keep the points as they are in their random order; the order does not matter as long as the points themselves are good",
    "distinct developed reasons beat many overlapping ones; organization matters"),
  // composition.audience-and-purpose
  //   A: MC-A-PURPOSE-IS-THE-TOPIC
  //   B: MC-B-AUDIENCE-MEANS-WHOEVER-READS-IT
  adultCard("eng.composition.audience-and-purpose",
    "Two writers both write about school uniforms: one wants the school board to adopt them, the other wants parents to understand how the policy works. What does this show?",
    "The topic is shared but the purposes differ, one persuading and one explaining, and each text suits its particular readers",
    "The purposes are the same, because the purpose of each is simply its topic, which is school uniforms in both cases",
    "The two texts can be written identically, because the audience is simply whoever happens to read them, so no one in particular",
    "purpose is what the writing should do, not its topic; audience is specific"),
  // composition.claim-evidence-reasoning
  //   A: MC-A-EVIDENCE-NEXT-TO-A-CLAIM-IS-ENOUGH
  //   B: MC-B-REASONING-MEANS-JUST-RESTATING-THE-CLAIM-AGAIN
  adultCard("eng.composition.claim-evidence-reasoning",
    "A writer claims \"The library should open on Sundays\" and cites that 400 people borrowed books on a Sunday pop-up day. Which sentence supplies real reasoning?",
    "That turnout on a day with no regular service shows demand the library cannot meet now, which Sunday opening would address",
    "None is needed; the figure sits next to the claim, so the reader can supply the connection between them without help",
    "The library should open on Sundays, as already stated, which is the reason why the library should open on Sundays",
    "reasoning is the explicit link from evidence to claim"),
  // composition.comparative-essay-writing
  //   A: MC-A-A-COMPARATIVE-ESSAY-MEANS-FULLY-DESCRIBING-ONE-ITEM-THEN-FULLY-DESCRIBING
  //   B: MC-B-ANY-SUPERFICIAL-SIMILARITY-OR-DIFFERENCE-IS-A-MEANINGFUL-POINT-OF-COMPARI
  adultCard("eng.composition.comparative-essay-writing",
    "Planning an essay comparing two poems about the sea, a student has the shared categories \"attitude to danger\" and \"use of rhythm\". Which plan follows the comparative discipline?",
    "One paragraph per shared category, each discussing both poems and stating the similarity or difference",
    "All paragraphs on the first poem, then all on the second, leaving the comparing to the reader",
    "A full paragraph on the fact that both titles are one word long, because any similarity is worth a paragraph",
    "point structure over block structure; points must be meaningful"),
  // composition.counterargument-and-rebuttal
  //   A: MC-A-COUNTERARGUMENT-MEANS-PICKING-THE-WEAKEST-OPPOSING-VIEW-TO-EASILY-DEFEAT
  //   B: MC-B-REBUTTAL-MEANS-JUST-RESTATING-YOUR-ORIGINAL-POSITION-MORE-FORCEFULLY
  adultCard("eng.composition.counterargument-and-rebuttal",
    "Arguing that a town should add bike lanes, a writer meets the objection that lanes remove parking and hurt shop owners. Which rebuttal does the job?",
    "State the objection fairly, then answer its substance, for example with evidence about shop customers where lanes were added",
    "Answer the claim that \"nobody really wants bike lanes\", an easier opposing view to defeat than the real parking concern",
    "Repeat more forcefully that the town should add bike lanes, without engaging the parking concern at all, since more force wins",
    "strongest fair opposition; rebuttal engages its substance"),
  // composition.editing-for-style
  //   A: MC-A-IF-A-SENTENCE-IS-GRAMMATICALLY-CORRECT-THERE-IS-NOTHING-LEFT-TO-EDIT
  //   B: MC-B-CUTTING-WORDS-ALWAYS-IMPROVES-A-SENTENCE-REGARDLESS-OF-WHAT-IS-CUT
  adultCard("eng.composition.editing-for-style",
    "A grammar checker passes the sentence \"At this point in time, we are currently in a position to begin.\" What is the best editing move?",
    "Cut the padding to \"We can begin now\", which keeps the meaning and removes only words that add nothing",
    "Leave it; the sentence is grammatically correct, so there is nothing left to edit",
    "Cut every word that can go, including the ones that carry meaning, since cutting always improves a sentence",
    "correctness is the floor; cut padding, never content"),
]
