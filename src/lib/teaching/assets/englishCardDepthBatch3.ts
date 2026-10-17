/**
 * ENGLISH CARD-DEPTH CAMPAIGN — Batch 3 (eng.communication, 12 concepts, 36 cards).
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
 * slug and abandon the live row's identity. Each communication concept already uses
 *   native band : mcq, misconception_probe, checkpoint, true_false
 *   ADULT       : mcq, misconception_probe
 * so the three new cards take the FREE slots:
 *   native band (HIGH, or MIDDLE for digital-communication) : short_answer, fill_blank      ADULT : checkpoint
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


export const ENGLISH_CARD_DEPTH_BATCH_3: SeedProbe[] = [
  // ─── eng.communication.academic-writing-advanced ─────────────────────────
  card('eng.communication.academic-writing-advanced', 'short_answer', H,
    'A student\'s literature review on school uniforms begins: "Uniforms are good. I will now explain why." Which revision shows more advanced academic writing?',
    '"Although prior studies link uniforms to discipline, this review asks whether they affect attendance."',
    ['"No earlier researcher is worth mentioning, so this review starts from my own view."', 'MC-A-ADVANCED-ACADEMIC-WRITING-MEANS-IGNORING-WHAT-OTHERS-HAVE-ALREADY-SAID'],
    ['"Uniforms are good: desirable, advantageous, beneficial, and also positive and favourable."', 'MC-B-A-LONGER-MORE-COMPLEX-SOUNDING-PIECE-IS-AUTOMATICALLY-MORE-SOPHISTICATED'],
    'situating a claim in prior work vs. padding (WE-1), re-asked with a school-uniform review'),
  card('eng.communication.academic-writing-advanced', 'fill_blank', H,
    'Complete the sentence: advanced academic writing ____.',
    'acknowledges existing work, then adds a new point of its own',
    ['avoids mentioning what others have already said', 'MC-A-ADVANCED-ACADEMIC-WRITING-MEANS-IGNORING-WHAT-OTHERS-HAVE-ALREADY-SAID'],
    ['gets its sophistication from longer, more complex sentences', 'MC-B-A-LONGER-MORE-COMPLEX-SOUNDING-PIECE-IS-AUTOMATICALLY-MORE-SOPHISTICATED'],
    'Replacement text for both misconceptions'),
  card('eng.communication.academic-writing-advanced', 'checkpoint', A,
    'A doctoral student\'s introduction says only, "This thesis proves X." Her supervisor suggests (1) noting the main earlier positions on X and (2) cutting a paragraph that repeats a point in fancier words. How should the two suggestions be judged?',
    'Both are sound: scholarly writing engages earlier work, and length without new content adds nothing',
    ['Wrong on (1): advanced writing should not lean on what others have already said, since it must be wholly original', 'MC-A-ADVANCED-ACADEMIC-WRITING-MEANS-IGNORING-WHAT-OTHERS-HAVE-ALREADY-SAID'],
    ['Wrong on (2): a longer, more complex-sounding text is always more sophisticated', 'MC-B-A-LONGER-MORE-COMPLEX-SOUNDING-PIECE-IS-AUTOMATICALLY-MORE-SOPHISTICATED'],
    'both misconceptions, in a thesis-supervision setting'),

  // ─── eng.communication.business-writing ──────────────────────────────────
  card('eng.communication.business-writing', 'short_answer', H,
    'You need your manager to approve a day of leave. Which email opening is best?',
    '"Could you approve leave on 14 March? The reason and my cover plan are below."',
    ['"Over the past year the team has changed in many ways, and I have been thinking about my own role…"', 'MC-A-BUSINESS-WRITING-SHOULD-BUILD-UP-TO-THE-MAIN-POINT-LIKE-AN-ACADEMIC-ESSAY'],
    ['One dense block holding every detail, because layout does not matter if the facts are there', 'MC-B-A-BUSINESS-DOCUMENT-JUST-NEEDS-TO-CONTAIN-THE-RIGHT-INFORMATION-FORMATTING-DOESNT-MATTER'],
    'direct opening and visual structure (WE-1), re-asked with a leave request'),
  card('eng.communication.business-writing', 'fill_blank', H,
    'Complete the sentence: a good business email ____.',
    'states the request early and uses short paragraphs or a list',
    ['builds slowly towards its request, like an academic essay', 'MC-A-BUSINESS-WRITING-SHOULD-BUILD-UP-TO-THE-MAIN-POINT-LIKE-AN-ACADEMIC-ESSAY'],
    ['can be one dense block, since formatting does not matter', 'MC-B-A-BUSINESS-DOCUMENT-JUST-NEEDS-TO-CONTAIN-THE-RIGHT-INFORMATION-FORMATTING-DOESNT-MATTER'],
    'Replacement text for both misconceptions'),
  card('eng.communication.business-writing', 'checkpoint', A,
    'A manager receives two versions of a status update on three risks. Version A is one dense paragraph that opens with project history. Version B opens, "Three risks need your decision today:" and gives a short numbered list. Which is better, and why?',
    'B: it leads with the point, and its structure makes each risk easy to find',
    ['A: building up from the background to the point is the professional approach', 'MC-A-BUSINESS-WRITING-SHOULD-BUILD-UP-TO-THE-MAIN-POINT-LIKE-AN-ACADEMIC-ESSAY'],
    ['Neither: both hold the same facts, so the formatting makes no difference', 'MC-B-A-BUSINESS-DOCUMENT-JUST-NEEDS-TO-CONTAIN-THE-RIGHT-INFORMATION-FORMATTING-DOESNT-MATTER'],
    'both misconceptions, in a workplace setting'),

  // ─── eng.communication.cross-cultural-communication ──────────────────────
  card('eng.communication.cross-cultural-communication', 'short_answer', H,
    'A student finds that classmates from another culture often say "maybe" when they mean "no". Which response shows good cross-cultural understanding?',
    'Learn that an indirect refusal is a polite convention there, not dishonesty',
    ['Insist that saying "no" directly is the correct way and the "maybe" style is simply wrong', 'MC-A-MY-OWN-CULTURES-COMMUNICATION-NORMS-ARE-THE-UNIVERSAL-DEFAULT-AND-CORRECT-WAY'],
    ['Decide that every person from that culture must always speak this way', 'MC-B-AN-ENTIRE-CULTURE-HAS-ONE-SINGLE-UNIFORM-COMMUNICATION-STYLE-WITH-NO-INTERNAL-VARIATION'],
    'norms are cultural, not universal; individuals vary, re-asked with indirect refusal'),
  card('eng.communication.cross-cultural-communication', 'fill_blank', H,
    'Complete the sentence: a sensible view of cultural communication is that ____.',
    'styles differ across cultures and also vary between individuals within one culture',
    ['one\'s own culture\'s style is the standard against which others are judged', 'MC-A-MY-OWN-CULTURES-COMMUNICATION-NORMS-ARE-THE-UNIVERSAL-DEFAULT-AND-CORRECT-WAY'],
    ['everyone in a culture communicates in exactly the same way', 'MC-B-AN-ENTIRE-CULTURE-HAS-ONE-SINGLE-UNIFORM-COMMUNICATION-STYLE-WITH-NO-INTERNAL-VARIATION'],
    'both misconceptions, stated as the principle'),
  card('eng.communication.cross-cultural-communication', 'checkpoint', A,
    'A manager from a direct-feedback culture calls her new colleagues\' gentle, indirect comments "unclear", and assumes all of them communicate identically. What is the best response?',
    'Treat indirect feedback as a valid style, and check how each individual prefers to communicate',
    ['Ask them to adopt the direct style, since it is the clearest and most professional way to communicate in any workplace', 'MC-A-MY-OWN-CULTURES-COMMUNICATION-NORMS-ARE-THE-UNIVERSAL-DEFAULT-AND-CORRECT-WAY'],
    ['Assume every colleague from that culture shares one style, and adapt to it for all of them', 'MC-B-AN-ENTIRE-CULTURE-HAS-ONE-SINGLE-UNIFORM-COMMUNICATION-STYLE-WITH-NO-INTERNAL-VARIATION'],
    'both misconceptions, in a workplace setting'),

  // ─── eng.communication.digital-communication ─────────────────────────────
  card('eng.communication.digital-communication', 'short_answer', M,
    'You email your teacher, "hey can u gimme till fri for the project lol thx". A friend says it is fine because that style works in your group chat. What is the best judgement?',
    'Not suitable: an email to a teacher needs a more formal register than a chat with friends',
    ['Fine: the same casual style works equally well on every digital platform and for every reader', 'MC-THE-SAME-REGISTER-AND-STYLE-WORKS-ACROSS-ALL-DIGITAL-PLATFORMS'],
    ['Fine: your friendly tone is easy to see in text, so the teacher will read it as friendly', 'MC-TONE-IS-EASY-TO-CONVEY-IN-TEXT-BASED-DIGITAL-COMMUNICATION'],
    'platform-specific register and fragile tone (WE-1), re-asked with a deadline request'),
  card('eng.communication.digital-communication', 'fill_blank', M,
    'Complete the sentence: in a text-only message, tone ____.',
    'is easy to misread, so clear wording helps the reader',
    ['comes across just as clearly as it does when you speak', 'MC-TONE-IS-EASY-TO-CONVEY-IN-TEXT-BASED-DIGITAL-COMMUNICATION'],
    ['should stay the same casual style on every platform', 'MC-THE-SAME-REGISTER-AND-STYLE-WORKS-ACROSS-ALL-DIGITAL-PLATFORMS'],
    'both misconceptions, stated as the principle'),
  card('eng.communication.digital-communication', 'checkpoint', A,
    'A team lead types, "Fine. Do what you like." meaning she trusts the team, then posts the same words in the formal company announcement channel. What is the problem?',
    'Tone is easily misread in text, and a casual phrase may clash with the formal register of that channel',
    ['None: a single register works on every digital platform, formal channels included', 'MC-THE-SAME-REGISTER-AND-STYLE-WORKS-ACROSS-ALL-DIGITAL-PLATFORMS'],
    ['None: her friendly intent is plain to every reader, because tone is just as easy to read in text as in speech', 'MC-TONE-IS-EASY-TO-CONVEY-IN-TEXT-BASED-DIGITAL-COMMUNICATION'],
    'both misconceptions, in a workplace setting'),

  // ─── eng.communication.discourse-markers-advanced ────────────────────────
  card('eng.communication.discourse-markers-advanced', 'short_answer', H,
    '"Demand fell sharply in spring. ____, the shop cut its opening hours." Which marker shows the real relationship between the two sentences?',
    '"As a result", because the second event follows from the first',
    ['"However", because any connector will do, so the choice does not matter', 'MC-A-DISCOURSE-MARKERS-ARE-INTERCHANGEABLE-CONNECTORS-REGARDLESS-OF-THE-ACTUAL-LOGICAL-RELATIONSHIP'],
    ['"Notwithstanding", because the grander-sounding marker is always the better one', 'MC-B-MORE-SOPHISTICATED-SOUNDING-DISCOURSE-MARKERS-ARE-ALWAYS-BETTER-REGARDLESS-OF-NATURAL-FIT'],
    'matching a marker to the logical relationship (WE-1), re-asked with a cause-effect pair'),
  card('eng.communication.discourse-markers-advanced', 'fill_blank', H,
    'Complete the sentence: choose a discourse marker by ____.',
    'the logical relationship between the ideas, in natural-sounding words',
    ['picking any connector, since they all link sentences', 'MC-A-DISCOURSE-MARKERS-ARE-INTERCHANGEABLE-CONNECTORS-REGARDLESS-OF-THE-ACTUAL-LOGICAL-RELATIONSHIP'],
    ['picking the most elaborate-sounding one available', 'MC-B-MORE-SOPHISTICATED-SOUNDING-DISCOURSE-MARKERS-ARE-ALWAYS-BETTER-REGARDLESS-OF-NATURAL-FIT'],
    'Replacement text for both misconceptions'),
  card('eng.communication.discourse-markers-advanced', 'checkpoint', A,
    'Revising a proposal, a writer changes every "also" to "furthermore", every "so" to "accordingly", and "but" to "conversely" in a sentence whose two ideas are not opposites. What is the right assessment?',
    'Match markers to the real relationship; "conversely" wrongly implies a contrast',
    ['Any marker works between any two sentences, so no choice here is wrong', 'MC-A-DISCOURSE-MARKERS-ARE-INTERCHANGEABLE-CONNECTORS-REGARDLESS-OF-THE-ACTUAL-LOGICAL-RELATIONSHIP'],
    ['All the changes are improvements, because more sophisticated-sounding markers are always better', 'MC-B-MORE-SOPHISTICATED-SOUNDING-DISCOURSE-MARKERS-ARE-ALWAYS-BETTER-REGARDLESS-OF-NATURAL-FIT'],
    'both misconceptions, in a revision setting'),

  // ─── eng.communication.editing-for-publication ───────────────────────────
  card('eng.communication.editing-for-publication', 'short_answer', H,
    'A student rereads her story twice to check that it makes sense, then submits it without another check. The editor finds five typos and the wrong font. Which statement is accurate?',
    'Reading for content does not catch surface errors; a separate proofreading pass is needed',
    ['She did proofread it, because a careful read for content also checks spelling and format', 'MC-A-IF-YOUVE-ALREADY-CAREFULLY-READ-THROUGH-A-PIECE-FOR-CONTENT-YOUVE-ALSO-EFFECTIVELY-PROOFREAD-IT'],
    ['The errors do not matter, because strong content outweighs surface problems', 'MC-B-IF-THE-CONTENT-IS-STRONG-ENOUGH-FORMATTING-AND-SURFACE-ERRORS-WONT-REALLY-MATTER-TO-A-READER-OR-EDITOR'],
    'content read vs. proofreading and surface standards, re-asked with a short story'),
  card('eng.communication.editing-for-publication', 'fill_blank', H,
    'Complete the sentence: before submitting, a writer should ____.',
    'do a separate pass for spelling, punctuation and the required format',
    ['rely on a careful content read, which also catches spelling and format errors', 'MC-A-IF-YOUVE-ALREADY-CAREFULLY-READ-THROUGH-A-PIECE-FOR-CONTENT-YOUVE-ALSO-EFFECTIVELY-PROOFREAD-IT'],
    ['skip the format rules if the ideas are strong enough', 'MC-B-IF-THE-CONTENT-IS-STRONG-ENOUGH-FORMATTING-AND-SURFACE-ERRORS-WONT-REALLY-MATTER-TO-A-READER-OR-EDITOR'],
    'Replacement text for both misconceptions'),
  card('eng.communication.editing-for-publication', 'checkpoint', A,
    'An author sends an essay collection with excellent ideas to a press after one read for meaning, ignoring the press\'s style guide. The editor returns it unread. What best explains this?',
    'Surface accuracy and format compliance are part of publication standards, and a content read does not check them',
    ['The editor was wrong: a careful read for content is the same as proofreading', 'MC-A-IF-YOUVE-ALREADY-CAREFULLY-READ-THROUGH-A-PIECE-FOR-CONTENT-YOUVE-ALSO-EFFECTIVELY-PROOFREAD-IT'],
    ['The editor was wrong: ideas this strong make formatting irrelevant to editors', 'MC-B-IF-THE-CONTENT-IS-STRONG-ENOUGH-FORMATTING-AND-SURFACE-ERRORS-WONT-REALLY-MATTER-TO-A-READER-OR-EDITOR'],
    'both misconceptions, in a publishing setting'),

  // ─── eng.communication.media-literacy ────────────────────────────────────
  card('eng.communication.media-literacy', 'short_answer', H,
    'Two sites report the same city-council vote. One headline says "Council Slashes Library Budget"; the other, "Council Balances Books, Trims Library Spending". What is the best conclusion?',
    'Both describe the same vote but frame it with different word choices, so compare the facts',
    ['Only one can be accurate, because news simply shows what happened with no choices involved', 'MC-A-NEWS-AND-MEDIA-COVERAGE-SIMPLY-SHOWS-WHAT-HAPPENED-WITH-NO-CONSTRUCTED-CHOICES-INVOLVED'],
    ['The first is less trustworthy, because strong emotional wording is automatically unreliable', 'MC-B-EMOTIONALLY-ENGAGING-OR-ATTENTION-GRABBING-CONTENT-IS-AUTOMATICALLY-LESS-TRUSTWORTHY-THAN-PLAIN-CONTENT'],
    'framing as a constructed choice, re-asked with a council-vote headline pair'),
  card('eng.communication.media-literacy', 'fill_blank', H,
    'Complete the sentence: a media message\'s trustworthiness depends mainly on ____.',
    'the accuracy and sourcing of its content, not its emotional tone',
    ['how plain and unemotional it sounds, since calm wording is always safer', 'MC-B-EMOTIONALLY-ENGAGING-OR-ATTENTION-GRABBING-CONTENT-IS-AUTOMATICALLY-LESS-TRUSTWORTHY-THAN-PLAIN-CONTENT'],
    ['whether it shows events with no framing choices at all', 'MC-A-NEWS-AND-MEDIA-COVERAGE-SIMPLY-SHOWS-WHAT-HAPPENED-WITH-NO-CONSTRUCTED-CHOICES-INVOLVED'],
    'Replacement text for both misconceptions'),
  card('eng.communication.media-literacy', 'checkpoint', A,
    'A documentary uses a moving personal story and dramatic music to present well-sourced findings on air pollution. One viewer says it must be unreliable because it is emotional; a colleague says it is simply "what happened", with no editing choices. Which assessment is sound?',
    'Neither: the emotional style is a framing choice, and reliability rests on the evidence and sources',
    ['The viewer: emotionally engaging content is automatically less trustworthy', 'MC-B-EMOTIONALLY-ENGAGING-OR-ATTENTION-GRABBING-CONTENT-IS-AUTOMATICALLY-LESS-TRUSTWORTHY-THAN-PLAIN-CONTENT'],
    ['The colleague: media shows events directly, without constructed choices', 'MC-A-NEWS-AND-MEDIA-COVERAGE-SIMPLY-SHOWS-WHAT-HAPPENED-WITH-NO-CONSTRUCTED-CHOICES-INVOLVED'],
    'both misconceptions, with a documentary'),

  // ─── eng.communication.negotiation-language ──────────────────────────────
  card('eng.communication.negotiation-language', 'short_answer', H,
    'In a group project you think the deadline is unrealistic. Which contribution best builds a real agreement?',
    '"I see why you want Monday, but testing needs three days. Could we aim for Wednesday?"',
    ['"Monday is the deadline and I will not discuss it, so the matter is closed and we move on."', 'MC-A-EFFECTIVE-NEGOTIATION-LANGUAGE-MEANS-PUSHING-YOUR-OWN-POSITION-AS-HARD-AS-POSSIBLE'],
    ['Stay quiet and say "fine", so the group reaches agreement quickly', 'MC-B-AVOIDING-DISAGREEMENT-ALTOGETHER-BY-STAYING-SILENT-OR-QUICKLY-AGREEING-IS-THE-SAME-AS-SUCCESSFUL-CONSENSUS-BUILDING'],
    'acknowledging the other side while stating needs, re-asked with a project deadline'),
  card('eng.communication.negotiation-language', 'fill_blank', H,
    'Complete the sentence: effective negotiation language ____.',
    'states your needs and acknowledges the other side\'s, to find a middle ground',
    ['pushes your own position as hard as possible until the other side gives in completely', 'MC-A-EFFECTIVE-NEGOTIATION-LANGUAGE-MEANS-PUSHING-YOUR-OWN-POSITION-AS-HARD-AS-POSSIBLE'],
    ['avoids disagreement by agreeing quickly, which counts as consensus', 'MC-B-AVOIDING-DISAGREEMENT-ALTOGETHER-BY-STAYING-SILENT-OR-QUICKLY-AGREEING-IS-THE-SAME-AS-SUCCESSFUL-CONSENSUS-BUILDING'],
    'Replacement text for both misconceptions'),
  card('eng.communication.negotiation-language', 'checkpoint', A,
    'A buyer and a supplier negotiate delivery dates. The supplier, privately doubting the date, says, "Sure, no problem," to end the discussion. Which assessment is accurate?',
    'It is not real consensus: the doubt is unresolved and likely to resurface as a problem later',
    ['It is successful consensus: quick agreement means the negotiation worked', 'MC-B-AVOIDING-DISAGREEMENT-ALTOGETHER-BY-STAYING-SILENT-OR-QUICKLY-AGREEING-IS-THE-SAME-AS-SUCCESSFUL-CONSENSUS-BUILDING'],
    ['It is the wrong move: the supplier should have pushed their preferred date as hard as possible', 'MC-A-EFFECTIVE-NEGOTIATION-LANGUAGE-MEANS-PUSHING-YOUR-OWN-POSITION-AS-HARD-AS-POSSIBLE'],
    'both misconceptions, in a supplier negotiation'),

  // ─── eng.communication.presentation-design ───────────────────────────────
  card('eng.communication.presentation-design', 'short_answer', H,
    'A slide about the water cycle has a one-line title and a labelled diagram of the cycle, with no paragraph. A classmate says it looks too plain. Which view is correct?',
    'It is effective: the diagram carries the point and the speaker supplies the explanation',
    ['It is weak: a good slide holds the full text of what the speaker will say', 'MC-A-A-GOOD-SLIDE-CONTAINS-THE-FULL-TEXT-OF-WHAT-THE-SPEAKER-WILL-SAY'],
    ['It is weak: every slide needs decorative graphics to look professional', 'MC-B-EVERY-SLIDE-NEEDS-DECORATIVE-VISUAL-ELEMENTS-TO-LOOK-PROFESSIONAL'],
    'slides support the speaker; visuals must have a purpose, re-asked with a water-cycle slide'),
  card('eng.communication.presentation-design', 'fill_blank', H,
    'Complete the sentence: a slide is strongest when ____.',
    'each element on it supports the one point being made',
    ['it holds the complete script the speaker will say', 'MC-A-A-GOOD-SLIDE-CONTAINS-THE-FULL-TEXT-OF-WHAT-THE-SPEAKER-WILL-SAY'],
    ['it is filled with decorative images, whatever they show', 'MC-B-EVERY-SLIDE-NEEDS-DECORATIVE-VISUAL-ELEMENTS-TO-LOOK-PROFESSIONAL'],
    'Replacement text for both misconceptions'),
  card('eng.communication.presentation-design', 'checkpoint', A,
    'Preparing a board slide, an analyst replaces three paragraphs with one chart and a caption, and removes a stock photo of handshakes. A colleague objects to both changes. How should they be judged?',
    'Both are improvements: the slide now supports the speaker and every element has a purpose',
    ['The first is a loss: a good slide holds the full text of the talk, so that nothing is left out', 'MC-A-A-GOOD-SLIDE-CONTAINS-THE-FULL-TEXT-OF-WHAT-THE-SPEAKER-WILL-SAY'],
    ['The second is a loss: slides need decorative visuals to look professional', 'MC-B-EVERY-SLIDE-NEEDS-DECORATIVE-VISUAL-ELEMENTS-TO-LOOK-PROFESSIONAL'],
    'both misconceptions, in a board-presentation setting'),

  // ─── eng.communication.professional-communication ────────────────────────
  card('eng.communication.professional-communication', 'short_answer', H,
    'A shop manager must tell staff that tonight\'s shift now starts an hour earlier. Which channel choice is best?',
    'Tell them in person or by phone now, then follow up in writing',
    ['Send a long email later in the day, since the channel does not matter if the facts are right', 'MC-A-THE-CHANNEL-WRITTEN-VS-SPOKEN-DOESNT-MATTER-AS-LONG-AS-THE-MESSAGE-CONTENT-IS-RIGHT'],
    ['Print a written notice and read it aloud word for word at the next meeting', 'MC-B-A-SPOKEN-PRESENTATION-SHOULD-BE-A-WORD-FOR-WORD-READING-OF-THE-WRITTEN-DOCUMENT'],
    'matching channel to urgency; spoken vs. written delivery, re-asked with a shift change'),
  card('eng.communication.professional-communication', 'fill_blank', H,
    'Complete the sentence: effective professional communication ____.',
    'matches the channel to the urgency and adapts written content for speaking',
    ['treats the channel as irrelevant when the content is right', 'MC-A-THE-CHANNEL-WRITTEN-VS-SPOKEN-DOESNT-MATTER-AS-LONG-AS-THE-MESSAGE-CONTENT-IS-RIGHT'],
    ['presents a written document by reading it aloud word for word', 'MC-B-A-SPOKEN-PRESENTATION-SHOULD-BE-A-WORD-FOR-WORD-READING-OF-THE-WRITTEN-DOCUMENT'],
    'Replacement text for both misconceptions'),
  card('eng.communication.professional-communication', 'checkpoint', A,
    'A researcher is asked to give a ten-minute talk on her written paper. She plans to read the paper aloud, since "the content is the same either way". What is the soundest advice?',
    'Speak from key points: a talk needs a shorter, simpler structure than a written paper',
    ['Read it aloud as planned; a presentation is just the document spoken', 'MC-B-A-SPOKEN-PRESENTATION-SHOULD-BE-A-WORD-FOR-WORD-READING-OF-THE-WRITTEN-DOCUMENT'],
    ['No change is needed: the channel does not matter if the content is right', 'MC-A-THE-CHANNEL-WRITTEN-VS-SPOKEN-DOESNT-MATTER-AS-LONG-AS-THE-MESSAGE-CONTENT-IS-RIGHT'],
    'both misconceptions, in a conference-talk setting'),

  // ─── eng.communication.research-methodology-writing ──────────────────────
  card('eng.communication.research-methodology-writing', 'short_answer', H,
    'A student writes, "We surveyed 30 students." Which revision improves the methods section most?',
    '"We surveyed 30 students, a size suited to a pilot, though too small to generalise from."',
    ['"We surveyed 30 students, then collected the forms, then counted the answers."', 'MC-A-DESCRIBING-A-METHOD-MEANS-JUST-LISTING-THE-STEPS-TAKEN-WITH-NO-JUSTIFICATION'],
    ['"We surveyed 30 students using a flawless design that no reader, reviewer or examiner could possibly question."', 'MC-B-A-GOOD-METHODOLOGY-SECTION-SHOULD-PRESENT-THE-METHOD-AS-FLAWLESS-WITH-NO-ACKNOWLEDGED-LIMITATIONS'],
    'justification plus an honest limitation, re-asked with a 30-student survey'),
  card('eng.communication.research-methodology-writing', 'fill_blank', H,
    'Complete the sentence: a strong methodology section justifies key choices and ____.',
    'names at least one genuine limitation of the method',
    ['keeps to a plain list of the steps taken', 'MC-A-DESCRIBING-A-METHOD-MEANS-JUST-LISTING-THE-STEPS-TAKEN-WITH-NO-JUSTIFICATION'],
    ['presents the method as free of weaknesses', 'MC-B-A-GOOD-METHODOLOGY-SECTION-SHOULD-PRESENT-THE-METHOD-AS-FLAWLESS-WITH-NO-ACKNOWLEDGED-LIMITATIONS'],
    'Replacement text for both misconceptions'),
  card('eng.communication.research-methodology-writing', 'checkpoint', A,
    'A reviewer says a methods section "lists what the authors did but never says why" and "claims the method has no weaknesses". Which revision answers both comments best?',
    'Add a reason for each key choice and one honest limitation of the design',
    ['Add more steps to the list, since describing a method means listing what was done', 'MC-A-DESCRIBING-A-METHOD-MEANS-JUST-LISTING-THE-STEPS-TAKEN-WITH-NO-JUSTIFICATION'],
    ['Strengthen the claim that the method is flawless, so readers trust it', 'MC-B-A-GOOD-METHODOLOGY-SECTION-SHOULD-PRESENT-THE-METHOD-AS-FLAWLESS-WITH-NO-ACKNOWLEDGED-LIMITATIONS'],
    'both misconceptions, in a peer-review setting'),

  // ─── eng.communication.technical-writing ─────────────────────────────────
  card('eng.communication.technical-writing', 'short_answer', H,
    'A manual says "press Start", "press Go" and "press Begin" for the same button, and describes only what happens when the machine starts successfully. A tester reports confusion. Which revision is best?',
    'Use "Start" consistently and add what to do when the machine does not start',
    ['Keep the three names, to avoid repetition, and add what to do when it does not start', 'MC-A-TECHNICAL-WRITING-SHOULD-USE-VARIED-VOCABULARY-TO-AVOID-REPETITION-LIKE-OTHER-WRITING'],
    ['Use "Start" consistently, and describe only the case where the machine starts correctly', 'MC-B-TECHNICAL-WRITING-ONLY-NEEDS-TO-DESCRIBE-WHAT-TO-DO-WHEN-EVERYTHING-GOES-RIGHT'],
    'one term per thing and failure paths; each wrong option keeps exactly one misconception'),
  card('eng.communication.technical-writing', 'fill_blank', H,
    'Complete the sentence: technical instructions should ____.',
    'use one term per thing and say what to do when a step fails',
    ['vary the vocabulary so the text does not feel repetitive', 'MC-A-TECHNICAL-WRITING-SHOULD-USE-VARIED-VOCABULARY-TO-AVOID-REPETITION-LIKE-OTHER-WRITING'],
    ['describe only the steps that work when everything goes well for the user', 'MC-B-TECHNICAL-WRITING-ONLY-NEEDS-TO-DESCRIBE-WHAT-TO-DO-WHEN-EVERYTHING-GOES-RIGHT'],
    'Replacement text for both misconceptions'),
  card('eng.communication.technical-writing', 'checkpoint', A,
    'An installation guide calls one on-screen element "field", "box" and "input" in different steps, and covers only a successful install. Which review comment is most useful?',
    'Choose one name for the element and add a troubleshooting note for failed steps',
    ['Add even more synonyms so the guide reads less repetitively', 'MC-A-TECHNICAL-WRITING-SHOULD-USE-VARIED-VOCABULARY-TO-AVOID-REPETITION-LIKE-OTHER-WRITING'],
    ['No change is needed: instructions only have to cover the path where everything works', 'MC-B-TECHNICAL-WRITING-ONLY-NEEDS-TO-DESCRIBE-WHAT-TO-DO-WHEN-EVERYTHING-GOES-RIGHT'],
    'both misconceptions, in an installation-guide review'),
]
