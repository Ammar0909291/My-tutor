/**
 * ENGLISH ADULT-BAND PROBE-CONTRACT CAMPAIGN — Batch 9.
 *
 * Continues Batches 1-8 (80 concepts) per the standing instruction to finish
 * all English concepts against the TRUE-gap list `englishAdultBandAudit.ts`
 * computes.
 *
 * 10 concepts (1 reading + 9 writing, all MIDDLE-native, continuing in KG
 * order): eng.reading.evaluating-sources,
 * eng.writing.handwriting-and-formation, eng.writing.spelling-strategies,
 * eng.writing.sentence-writing, eng.writing.paragraph-structure,
 * eng.writing.topic-sentences, eng.writing.supporting-details,
 * eng.writing.transitions-and-cohesion, eng.writing.narrative-writing,
 * eng.writing.descriptive-writing. 30 new ADULT-band closed-choice probes
 * (3/concept), same mcq(FOUNDATIONAL)/misconception_probe(DEVELOPING)/
 * mcq(PROFICIENT) ladder as Batches 1-8, reusing each concept's own two
 * already-registered, already-ACTIVE misconceptions (every registry checked,
 * confirmed exactly 2) via genuinely different adult-context examples
 * (workplace writing, professional correspondence, business reports) than
 * each concept's native-band probes use.
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

const EVALUATING_SOURCES_ADULT = adultLadder(
  'eng.reading.evaluating-sources', 'MC-A-SOURCE-IS-CREDIBLE-IF-IT-LOOKS-PROFESSIONAL-OR-OFFICIAL', 'MC-A-SOURCE-IS-EITHER-COMPLETELY-RELIABLE-OR-COMPLETELY-UNRELIABLE',
  [
    {
      stem: 'A website about a company\'s financial health has a polished, professional-looking design with a corporate logo. Does looking professional alone guarantee the information is credible?',
      correct: 'No — visual polish (a professional-looking design, logo, layout) says nothing about factual accuracy; credibility depends on the author\'s expertise, evidence, and track record, not appearance',
      wrong: 'Yes — if a website or document looks professional or official, its information can be trusted as credible',
    },
    {
      stem: 'A respected industry publication is generally reliable but once published an article later found to contain a factual error. Does one error make this source COMPLETELY unreliable from now on, or can a generally reliable source still occasionally be right and wrong on different points?',
      correct: 'A generally reliable source can still occasionally get something wrong — credibility exists on a spectrum and per-claim, not as an all-or-nothing binary label attached to a whole publication forever',
      wrong: 'One factual error makes a source completely and permanently unreliable; sources are either completely reliable or completely unreliable',
    },
    {
      stem: 'A report has an official-looking government seal and formal formatting. Does looking official alone guarantee its claims are accurate?',
      correct: 'No — an official appearance does not verify content; credibility requires checking evidence, authorship, and corroboration, not just visual formatting',
      wrong: 'Yes — an official-looking seal or format is sufficient proof that the report\'s claims are credible',
    },
  ],
  [
    'MC-A-SOURCE-IS-CREDIBLE-IF-IT-LOOKS-PROFESSIONAL-OR-OFFICIAL, adult workplace framing with a company financial website rather than the existing everyday-sentence examples',
    'MC-A-SOURCE-IS-EITHER-COMPLETELY-RELIABLE-OR-COMPLETELY-UNRELIABLE, re-asked with an industry publication\'s one factual error rather than the existing toy examples',
    'MC-A-SOURCE-IS-CREDIBLE-IF-IT-LOOKS-PROFESSIONAL-OR-OFFICIAL, a second fresh example (an official-looking government report) forming the ladder\'s third rung',
  ],
)

const HANDWRITING_ADULT = adultLadder(
  'eng.writing.handwriting-and-formation', 'MC-ANY-STROKE-ORDER-WORKS', 'MC-SIZE-AND-BASELINE-DONT-MATTER',
  [
    {
      stem: 'When forming a letter by hand for a signed document, does it matter which order the strokes are made in, as long as the finished letter looks correct?',
      correct: 'Yes — consistent, standard stroke order supports speed, legibility, and muscle memory over time, even though a single finished letter might look the same regardless of the order used to draw it',
      wrong: 'No — any stroke order works equally well, since only the finished appearance of the letter matters',
    },
    {
      stem: 'On a handwritten form, do letter size and consistent alignment to the baseline matter for legibility, or is only the shape of each letter important?',
      correct: 'Size and baseline consistency matter — letters that vary wildly in size or float above/below the baseline are harder to read, even if each individual letter shape is technically correct',
      wrong: 'Only the shape of each letter matters; size and baseline alignment have no effect on legibility',
    },
    {
      stem: 'When teaching someone to form a letter by hand for consistent, legible writing, does the order of strokes matter, or is only the final appearance important?',
      correct: 'The stroke order matters — a consistent, standard order builds the muscle memory and speed needed for legible writing over time, not just how the final letter happens to look once',
      wrong: 'Only the final appearance matters; the stroke order used to get there is irrelevant',
    },
  ],
  [
    'MC-ANY-STROKE-ORDER-WORKS, adult workplace framing with a signed document rather than the existing everyday-sentence examples',
    'MC-SIZE-AND-BASELINE-DONT-MATTER, re-asked with a handwritten form rather than the existing toy examples',
    'MC-ANY-STROKE-ORDER-WORKS, a second fresh example (teaching consistent letter formation) forming the ladder\'s third rung',
  ],
)

const SPELLING_ADULT = adultLadder(
  'eng.writing.spelling-strategies', 'MC-SOUNDING-OUT-ALWAYS-GIVES-CORRECT-SPELLING', 'MC-SPELLING-IS-PURE-MEMORIZATION',
  [
    {
      stem: 'In a business email, sounding out the word "necessary" phonetically might produce "nesesary" or "necesary." Does sounding a word out always give you its correct spelling?',
      correct: 'No — English spelling often doesn\'t match pronunciation exactly (irregular spellings, silent letters, multiple spellings for the same sound); sounding out alone can produce a plausible but incorrect spelling',
      wrong: 'Yes — sounding out a word phonetically always produces the correct English spelling',
    },
    {
      stem: 'Is good spelling purely a matter of memorizing each word\'s letters individually, with no useful patterns, rules, or strategies (like syllable structure or word origin) that can help?',
      correct: 'No — while some memorization is needed, spelling strategies (recognizing patterns, syllable breakdown, word families, roots/affixes) genuinely help beyond rote memorization of each word',
      wrong: 'Yes — spelling is pure memorization with no helpful patterns or strategies beyond memorizing each word individually',
    },
    {
      stem: 'In a report, sounding out the word "definitely" phonetically might produce "definately." Does sounding a word out always guarantee the correct spelling?',
      correct: 'No — this is a common example where phonetic sounding-out leads to a plausible but wrong spelling; English spelling doesn\'t always match pronunciation reliably',
      wrong: 'Yes — sounding out any word phonetically will always produce its correct spelling',
    },
  ],
  [
    'MC-SOUNDING-OUT-ALWAYS-GIVES-CORRECT-SPELLING, adult workplace framing with "necessary" in a business email rather than the existing everyday-sentence examples',
    'MC-SPELLING-IS-PURE-MEMORIZATION, re-asked with a syllable-structure/word-origin framing rather than the existing toy examples',
    'MC-SOUNDING-OUT-ALWAYS-GIVES-CORRECT-SPELLING, a second fresh example ("definitely" in a report) forming the ladder\'s third rung',
  ],
)

const SENTENCE_WRITING_ADULT = adultLadder(
  'eng.writing.sentence-writing', 'MC-A-SENTENCE-IS-COMPLETE-AS-LONG-AS-IT-HAS-A-CAPITAL-LETTER-AND-A-PERIOD', 'MC-LONGER-SENTENCES-ARE-ALWAYS-BETTER-WRITING',
  [
    {
      stem: 'A draft report contains the line "Because the budget was cut." (capitalized, ending in a period). Is this a complete sentence just because it starts with a capital letter and ends with a period?',
      correct: 'No — despite the capital letter and period, "Because the budget was cut" is a dependent clause fragment, not a complete sentence; capitalization and punctuation alone don\'t make a sentence complete',
      wrong: 'Yes — as long as a group of words starts with a capital letter and ends with a period, it counts as a complete sentence',
    },
    {
      stem: 'In a formal report, is a long, complex sentence packed with multiple clauses always BETTER writing than a short, clear sentence expressing the same idea?',
      correct: 'No — sentence length alone doesn\'t determine quality; a short, clear sentence is often more effective than an unnecessarily long one, especially in professional writing valuing clarity',
      wrong: 'Yes — longer, more complex sentences are always superior writing compared to shorter sentences',
    },
    {
      stem: 'A memo contains the line "Although the deadline moved." Is this a complete sentence just because it is capitalized and ends with a period?',
      correct: 'No — this is still a dependent clause fragment despite the capital letter and period; proper punctuation marks don\'t make an incomplete thought into a complete sentence',
      wrong: 'Yes — capitalization and ending punctuation are all that is needed to make a sentence complete',
    },
  ],
  [
    'MC-A-SENTENCE-IS-COMPLETE-AS-LONG-AS-IT-HAS-A-CAPITAL-LETTER-AND-A-PERIOD, adult workplace framing with a draft report\'s "Because the budget was cut." rather than the existing everyday-sentence examples',
    'MC-LONGER-SENTENCES-ARE-ALWAYS-BETTER-WRITING, re-asked with a formal-report complexity example rather than the existing toy examples',
    'MC-A-SENTENCE-IS-COMPLETE-AS-LONG-AS-IT-HAS-A-CAPITAL-LETTER-AND-A-PERIOD, a second fresh example (a memo\'s "Although the deadline moved.") forming the ladder\'s third rung',
  ],
)

const PARAGRAPH_STRUCTURE_ADULT = adultLadder(
  'eng.writing.paragraph-structure', 'MC-A-PARAGRAPH-IS-JUST-A-GROUP-OF-SENTENCES-ABOUT-THE-SAME-GENERAL-TOPIC', 'MC-A-TOPIC-SENTENCE-MUST-ALWAYS-BE-THE-FIRST-SENTENCE',
  [
    {
      stem: 'A paragraph contains five sentences all loosely about "the company\'s history" but with no clear main point and no logical order connecting them. Is having sentences about the same general topic enough to make a well-structured paragraph?',
      correct: 'No — a well-structured paragraph needs unity around a specific controlling idea and logical organization, not just sentences that are loosely related to the same broad topic',
      wrong: 'Yes — a paragraph just means any group of sentences discussing the same general topic, regardless of organization',
    },
    {
      stem: 'A well-written paragraph places its topic sentence in the middle, after some context, rather than as the first sentence. Must the topic sentence always be the very first sentence of a paragraph?',
      correct: 'No — while topic sentences are often first, they can also appear in the middle or end of a paragraph, depending on the writer\'s purpose and structure',
      wrong: 'Yes — a topic sentence must always be positioned as the first sentence of a paragraph',
    },
    {
      stem: 'A paragraph contains four sentences all loosely about "customer service" with no unifying claim or logical flow between them. Is sharing a general topic enough to make this a well-structured paragraph?',
      correct: 'No — genuine paragraph unity requires a specific controlling idea that every sentence supports, plus logical organization, not just a shared broad topic',
      wrong: 'Yes — any sentences discussing the same general subject automatically form a well-structured paragraph',
    },
  ],
  [
    'MC-A-PARAGRAPH-IS-JUST-A-GROUP-OF-SENTENCES-ABOUT-THE-SAME-GENERAL-TOPIC, adult workplace framing with "the company\'s history" rather than the existing everyday-sentence examples',
    'MC-A-TOPIC-SENTENCE-MUST-ALWAYS-BE-THE-FIRST-SENTENCE, re-asked with a mid-paragraph topic sentence rather than the existing toy examples',
    'MC-A-PARAGRAPH-IS-JUST-A-GROUP-OF-SENTENCES-ABOUT-THE-SAME-GENERAL-TOPIC, a second fresh example ("customer service" sentences with no unifying claim) forming the ladder\'s third rung',
  ],
)

const TOPIC_SENTENCES_ADULT = adultLadder(
  'eng.writing.topic-sentences', 'MC-A-TOPIC-SENTENCE-JUST-ANNOUNCES-THE-TOPIC-RATHER-THAN-MAKING-A-CLAIM', 'MC-A-TOPIC-SENTENCE-MUST-BE-VERY-GENERAL-AND-VAGUE-TO-COVER-EVERYTHING',
  [
    {
      stem: 'Is "This report will discuss the company\'s sales performance" (merely announcing the topic) as strong a topic sentence as "The company\'s sales performance declined sharply due to three specific market shifts" (making a specific claim)?',
      correct: 'No — a strong topic sentence makes a specific, arguable claim about the topic, not just an announcement that a topic will be discussed; the second version is stronger and more useful',
      wrong: 'Yes — a topic sentence just needs to announce what topic will be discussed; making a specific claim isn\'t necessary',
    },
    {
      stem: 'Should a topic sentence be written very generally and vaguely (e.g., "There are many things to say about remote work") in order to cover every possible point the paragraph might make?',
      correct: 'No — a strong topic sentence should be specific and focused enough to guide the paragraph, not so vague and general that it says almost nothing',
      wrong: 'Yes — a topic sentence should be as general and vague as possible so it can cover everything the paragraph might say',
    },
    {
      stem: 'Is "This section covers our marketing strategy" (announcing the topic) as effective a topic sentence as "Our marketing strategy failed to reach the target demographic" (making a specific claim)?',
      correct: 'No — the second version makes a specific, evaluable claim, which is what a strong topic sentence should do, rather than merely announcing the subject',
      wrong: 'Yes — simply announcing what a section covers is just as effective as making a specific claim about it',
    },
  ],
  [
    'MC-A-TOPIC-SENTENCE-JUST-ANNOUNCES-THE-TOPIC-RATHER-THAN-MAKING-A-CLAIM, adult workplace framing with a sales-performance report rather than the existing everyday-sentence examples',
    'MC-A-TOPIC-SENTENCE-MUST-BE-VERY-GENERAL-AND-VAGUE-TO-COVER-EVERYTHING, re-asked with a "remote work" vague-sentence example rather than the existing toy examples',
    'MC-A-TOPIC-SENTENCE-JUST-ANNOUNCES-THE-TOPIC-RATHER-THAN-MAKING-A-CLAIM, a second fresh example (a marketing-strategy section) forming the ladder\'s third rung',
  ],
)

const SUPPORTING_DETAILS_ADULT = adultLadder(
  'eng.writing.supporting-details', 'MC-ANY-TRUE-STATEMENT-ABOUT-THE-TOPIC-COUNTS-AS-A-SUPPORTING-DETAIL', 'MC-MORE-SUPPORTING-DETAILS-ALWAYS-MAKES-A-PARAGRAPH-STRONGER',
  [
    {
      stem: 'A paragraph argues "Remote work improves employee productivity." A sentence states "The company was founded in 1998" — a TRUE statement about the company, but unrelated to productivity. Does being true about the general topic make this a valid supporting detail?',
      correct: 'No — a supporting detail must directly support the paragraph\'s SPECIFIC claim; a true but irrelevant fact (the founding date) does not support the productivity claim, even though it is factually accurate',
      wrong: 'Yes — any true statement related to the general topic counts as a valid supporting detail, regardless of whether it supports the specific claim',
    },
    {
      stem: 'Does adding MORE supporting details to a paragraph always make it stronger, even if some of the added details are weak, repetitive, or only loosely relevant?',
      correct: 'No — quality matters more than quantity; padding a paragraph with weak or redundant details can dilute the argument rather than strengthen it',
      wrong: 'Yes — a paragraph always becomes stronger simply by adding more supporting details, regardless of their quality or relevance',
    },
    {
      stem: 'A paragraph argues "The new software reduced processing time." A sentence states "The company has offices in five countries" — true about the company, but unrelated to processing time. Does being true make this a valid supporting detail here?',
      correct: 'No — this detail, while accurate, does not support the specific claim about processing time; relevance to the specific claim is what matters, not general truthfulness',
      wrong: 'Yes — since the statement is factually true and about the company, it counts as a valid supporting detail',
    },
  ],
  [
    'MC-ANY-TRUE-STATEMENT-ABOUT-THE-TOPIC-COUNTS-AS-A-SUPPORTING-DETAIL, adult workplace framing with a remote-work-productivity paragraph rather than the existing everyday-sentence examples',
    'MC-MORE-SUPPORTING-DETAILS-ALWAYS-MAKES-A-PARAGRAPH-STRONGER, re-asked with a padding-with-weak-details framing rather than the existing toy examples',
    'MC-ANY-TRUE-STATEMENT-ABOUT-THE-TOPIC-COUNTS-AS-A-SUPPORTING-DETAIL, a second fresh example (a software-processing-time paragraph) forming the ladder\'s third rung',
  ],
)

const TRANSITIONS_ADULT = adultLadder(
  'eng.writing.transitions-and-cohesion', 'MC-ANY-TRANSITION-WORD-CAN-BE-INSERTED-ANYWHERE-TO-IMPROVE-FLOW', 'MC-COHESION-ONLY-HAPPENS-AT-THE-BEGINNING-OF-SENTENCES-WITH-TRANSITION-WORDS',
  [
    {
      stem: 'In a report, would inserting the transition word "however" into a sentence that agrees with the previous point (e.g., "Sales increased. However, this confirms our forecast.") improve the flow, since "however" is a transition word?',
      correct: 'No — "however" signals contrast, and inserting it before a sentence that AGREES with the prior point creates a logical mismatch; not every transition word fits every context, even if it sounds transitional',
      wrong: 'Yes — any transition word can be inserted anywhere in a paragraph and it will always improve the flow',
    },
    {
      stem: 'Can a paragraph achieve cohesion (ideas flowing logically together) through means other than transition words at the start of sentences — such as repeating key terms, using pronouns that clearly refer back, or a logical sequence of ideas?',
      correct: 'Yes — cohesion can be built through multiple techniques (repeated key terms, clear pronoun reference, logical sequencing), not only through transition words placed at the beginning of sentences',
      wrong: 'No — cohesion can only be achieved by placing transition words at the start of sentences; no other technique creates cohesion',
    },
    {
      stem: 'In a memo, would inserting "therefore" into a sentence introducing an unrelated new topic (e.g., "The project succeeded. Therefore, our office is moving next month.") improve the flow, since "therefore" is a transition word?',
      correct: 'No — "therefore" signals a causal/logical consequence, and the second sentence is not actually a consequence of the first; misapplied transition words can confuse readers rather than improve flow',
      wrong: 'Yes — since "therefore" is a transition word, inserting it here would automatically improve the paragraph\'s flow',
    },
  ],
  [
    'MC-ANY-TRANSITION-WORD-CAN-BE-INSERTED-ANYWHERE-TO-IMPROVE-FLOW, adult workplace framing with a sales-report "however" mismatch rather than the existing everyday-sentence examples',
    'MC-COHESION-ONLY-HAPPENS-AT-THE-BEGINNING-OF-SENTENCES-WITH-TRANSITION-WORDS, re-asked with repeated-terms/pronoun-reference techniques rather than the existing toy examples',
    'MC-ANY-TRANSITION-WORD-CAN-BE-INSERTED-ANYWHERE-TO-IMPROVE-FLOW, a second fresh example (a memo\'s misapplied "therefore") forming the ladder\'s third rung',
  ],
)

const NARRATIVE_WRITING_ADULT = adultLadder(
  'eng.writing.narrative-writing', 'MC-A-GOOD-NARRATIVE-JUST-LISTS-EVERYTHING-THAT-HAPPENED-IN-ORDER', 'MC-DIALOGUE-IS-JUST-DECORATION-AND-CAN-BE-SUMMARIZED-INSTEAD',
  [
    {
      stem: 'A workplace case-study narrative lists every single minor action taken during a project in strict chronological order, without highlighting what mattered most. Does listing everything that happened, in order, make a good narrative?',
      correct: 'No — a good narrative selects and emphasizes meaningful moments and their significance, rather than simply cataloguing every event in sequence; strict completeness isn\'t what makes a narrative effective',
      wrong: 'Yes — a good narrative is simply a complete, in-order list of everything that happened',
    },
    {
      stem: 'In a narrative describing a tense negotiation, could the direct dialogue "\'We can\'t go below $50,000,\' she said firmly" be replaced with the summary "She refused to lower the price" with NO loss of meaning or impact?',
      correct: 'No — direct dialogue conveys tone, character, and immediacy that a flat summary loses; dialogue is a substantive narrative tool, not mere decoration that can be freely summarized away',
      wrong: 'Yes — dialogue is just decorative and can always be replaced with a summary sentence with no meaningful loss',
    },
    {
      stem: 'A narrative about a company\'s product launch lists every scheduled meeting and minor task in strict chronological order. Does listing everything in order make this an effective narrative?',
      correct: 'No — an effective narrative selects and emphasizes the significant turning points and their meaning, not merely a complete chronological list of events',
      wrong: 'Yes — listing every event that occurred, in the order it happened, is what makes a narrative good',
    },
  ],
  [
    'MC-A-GOOD-NARRATIVE-JUST-LISTS-EVERYTHING-THAT-HAPPENED-IN-ORDER, adult workplace framing with a project case study rather than the existing everyday-sentence examples',
    'MC-DIALOGUE-IS-JUST-DECORATION-AND-CAN-BE-SUMMARIZED-INSTEAD, re-asked with a negotiation-dialogue example rather than the existing toy examples',
    'MC-A-GOOD-NARRATIVE-JUST-LISTS-EVERYTHING-THAT-HAPPENED-IN-ORDER, a second fresh example (a product-launch narrative) forming the ladder\'s third rung',
  ],
)

const DESCRIPTIVE_WRITING_ADULT = adultLadder(
  'eng.writing.descriptive-writing', 'MC-DESCRIPTIVE-WRITING-ONLY-USES-VISUAL-SIGHT-DETAILS', 'MC-MORE-ADJECTIVES-ALWAYS-MAKES-DESCRIPTION-MORE-VIVID',
  [
    {
      stem: 'A description of a busy factory floor mentions the loud clanging of machinery and the smell of hot metal, alongside what it looks like. Should good descriptive writing use only VISUAL (sight) details, or can it draw on other senses too?',
      correct: 'It can and should draw on multiple senses (sound, smell, touch, taste) alongside sight — descriptive writing is not limited to visual details alone; sensory variety strengthens the description',
      wrong: 'Good descriptive writing should rely only on visual (sight) details; other senses are not part of effective description',
    },
    {
      stem: 'Does piling on many adjectives (e.g., "the huge, enormous, gigantic, massive warehouse") always make a description MORE vivid than using fewer, more precise words?',
      correct: 'No — stacking many similar adjectives can actually weaken writing through redundancy; a few precise, well-chosen words are often more vivid than a long string of adjectives',
      wrong: 'Yes — using more adjectives always makes a description more vivid, regardless of how many are piled on',
    },
    {
      stem: 'A description of a busy restaurant kitchen mentions the sizzling sound of the grill and the smell of garlic, alongside what it looks like. Should good descriptive writing rely on visual details alone?',
      correct: 'No — incorporating sound and smell alongside sight makes the description richer; descriptive writing benefits from engaging multiple senses, not just vision',
      wrong: 'Yes — only visual (sight) details belong in genuinely good descriptive writing',
    },
  ],
  [
    'MC-DESCRIPTIVE-WRITING-ONLY-USES-VISUAL-SIGHT-DETAILS, adult workplace framing with a factory floor description rather than the existing everyday-sentence examples',
    'MC-MORE-ADJECTIVES-ALWAYS-MAKES-DESCRIPTION-MORE-VIVID, re-asked with a "huge, enormous, gigantic, massive" example rather than the existing toy examples',
    'MC-DESCRIPTIVE-WRITING-ONLY-USES-VISUAL-SIGHT-DETAILS, a second fresh example (a restaurant kitchen description) forming the ladder\'s third rung',
  ],
)

export const ENGLISH_ADULT_BAND_BATCH_9: SeedProbe[] = [
  ...EVALUATING_SOURCES_ADULT, ...HANDWRITING_ADULT, ...SPELLING_ADULT, ...SENTENCE_WRITING_ADULT,
  ...PARAGRAPH_STRUCTURE_ADULT, ...TOPIC_SENTENCES_ADULT, ...SUPPORTING_DETAILS_ADULT,
  ...TRANSITIONS_ADULT, ...NARRATIVE_WRITING_ADULT, ...DESCRIPTIVE_WRITING_ADULT,
]
