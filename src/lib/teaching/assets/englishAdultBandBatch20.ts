/**
 * ENGLISH ADULT-BAND PROBE-CONTRACT CAMPAIGN — Batch 20.
 *
 * ── THE GAP THIS CLOSES ─────────────────────────────────────────────────────
 * Batch 19 closed all `eng.phonetics.*` concepts. This batch closes all 8
 * short `eng.vocab.*` concepts (live count was 8, not the prior estimate of
 * 9 — per this campaign's standing rule, live regeneration always wins):
 * academic-vocabulary, collocations, connotation-denotation, etymology,
 * multiple-meaning-words, register-and-formality, roots-and-origins,
 * semantic-fields. 3 new ADULT-band closed-choice probes each (24 total),
 * the bare mastery-gate contract (`correctAtCheck >= 1` + `correctAtPractice
 * >= 2` = 3, `assetContract.ts`). Remaining gap after this batch:
 * `eng.writing.*` (9 advanced), `eng.reading.reading-across-genres`,
 * `eng.speaking.debate-skills`/`presentation-skills`, and the 2 EARLY-band
 * phonics pairs excluded per Batch 13's own finding (voice-required),
 * deferred to future batches (see
 * `docs/history/subject-onboarding-and-fix-campaign.md`).
 *
 * Every distractor carries the `misconceptionId` naming it, reusing ONE of
 * each concept's own two ALREADY-REGISTERED, ALREADY-ACTIVE misconceptions
 * (verified against each concept's Blueprint Component 1 — Misconception
 * Register: every one of these 8 concepts holds exactly two — no more, no
 * fewer; no new misconception ids invented, no Educational Brain
 * authoring). As with Batches 18-19, several of these Blueprints label
 * their two misconceptions with bare `MC-...` headings rather than the
 * `MC-A-.../MC-B-...` convention (e.g. `collocations`, `connotation-
 * denotation`, `multiple-meaning-words`, `register-and-formality`, `roots-
 * and-origins`) — this file carries each concept's exact heading text
 * verbatim as the misconceptionId regardless. Structure otherwise mirrors
 * `englishAdultBandBatch13.ts`'s `adultLadder` helper exactly:
 * `mcq`(FOUNDATIONAL) + `misconception_probe`(DEVELOPING) +
 * `mcq`(PROFICIENT) per concept, so the ladder-aware slug resolver
 * (`buildProbeSlugResolver`) disambiguates the two `mcq` rungs by
 * difficulty without re-identifying any already-serving row. None of these
 * 8 concepts hold any existing ADULT probe today, so this is a fresh
 * singleton-to-ladder promotion within this batch only — no P-10 collision
 * risk against any pre-existing row.
 *
 * Register: adult/professional framing throughout (a performance review, a
 * Slack message, a workplace text) — never child-directed examples. Every
 * worked example below is deliberately DIFFERENT from the Blueprint's own
 * Conflict Evidence / Discrimination Pairs examples, so a learner who has
 * met the explanation is not simply asked to recall the identical example.
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

const ACADEMIC_VOCABULARY_ADULT = adultLadder(
  'eng.vocab.academic-vocabulary',
  'MC-A-ANY-UNFAMILIAR-OR-COMPLEX-SOUNDING-WORD-IN-AN-ACADEMIC-TEXT-COUNTS-AS-ACADEMIC-VOCABULARY',
  'MC-B-ACADEMIC-WORDS-MEAN-THE-SAME-THING-IN-ACADEMIC-WRITING-AS-THEY-DO-IN-EVERYDAY-CASUAL-SPEECH',
  [
    {
      stem: 'A student reading a chemistry passage lists both "polymer" and "furthermore" as "academic vocabulary" from the text. Would "polymer" plausibly appear in a history essay the way "furthermore" would?',
      correct: 'No — "polymer" is technical jargon belonging specifically to chemistry, while "furthermore" is general academic vocabulary that recurs across essays in any subject; only the second is genuinely "academic vocabulary" in the general sense',
      wrong: "Yes — any unfamiliar or complex-sounding word encountered in an academic text counts as academic vocabulary, regardless of whether it's specific to one field or common across all of them",
    },
    {
      stem: 'A student uses "critical" in an academic essay the same way they\'d use it casually, meaning "harshly judgmental," when discussing a "critical analysis" assignment. Does "critical" mean the same thing in "critical analysis" as it does in everyday casual speech ("don\'t be so critical")?',
      correct: 'No — in academic writing, "critical" typically means careful, evaluative, reasoned analysis (as in "critical thinking"), a more precise sense than the everyday meaning of harsh judgment; academic words often carry a sharper technical sense than their casual meaning suggests',
      wrong: 'Yes — "critical" means exactly the same thing in an academic context as it does in everyday casual speech, so no adjustment in understanding is needed',
    },
    {
      stem: 'Sorting words from an economics article, a student separates "inflation" (which could plausibly appear in a history or politics essay too) from "quantitative easing" (a term specific to economics/finance). Is this the correct way to distinguish general academic vocabulary from technical jargon?',
      correct: 'Yes — checking whether a word would plausibly appear in an essay on a completely different subject is exactly the correct test for distinguishing general academic vocabulary from field-specific technical jargon',
      wrong: "No — since both terms are unfamiliar and appear in a serious academic article, both should be classified the same way as academic vocabulary regardless of whether they're field-specific",
    },
  ],
  [
    'MC-A-ANY-UNFAMILIAR-OR-COMPLEX-SOUNDING-WORD-IN-AN-ACADEMIC-TEXT-COUNTS-AS-ACADEMIC-VOCABULARY, fresh adult example ("polymer" vs. "furthermore") rather than the existing "mitochondria"/"significant" example',
    'MC-B-ACADEMIC-WORDS-MEAN-THE-SAME-THING-IN-ACADEMIC-WRITING-AS-THEY-DO-IN-EVERYDAY-CASUAL-SPEECH, fresh example ("critical") rather than the existing "argument" example',
    'MC-A-ANY-UNFAMILIAR-OR-COMPLEX-SOUNDING-WORD-IN-AN-ACADEMIC-TEXT-COUNTS-AS-ACADEMIC-VOCABULARY, second fresh example ("inflation" vs. "quantitative easing") forming the ladder\'s third rung',
  ],
)

const COLLOCATIONS_ADULT = adultLadder(
  'eng.vocab.collocations',
  'MC-IF-A-SYNONYM-FITS-THE-DEFINITION-IT-FITS-THE-PHRASE',
  'MC-COLLOCATIONS-ARE-JUST-A-FANCY-NAME-FOR-IDIOMS',
  [
    {
      stem: 'A student writes "perform a crime" instead of "commit a crime," reasoning that "perform" and "commit" are close synonyms for "to carry out." Is this substitution correct?',
      correct: 'No — English speakers habitually pair "commit" with "crime," not "perform," even though "perform" is a perfectly good synonym in other contexts; collocations are fixed pairings settled by usage, not something you can derive logically from synonym lists',
      wrong: 'Yes — since "perform" and "commit" share a similar dictionary meaning, either word should work equally well paired with "crime"',
    },
    {
      stem: 'A student treats "heavy traffic" the same way as "hit the road," calling both "weird fixed phrases to memorize." Can the meaning of "heavy traffic" be understood just by understanding "heavy" and "traffic" normally?',
      correct: 'Yes — "heavy traffic" is a collocation with a fully transparent, literal meaning (traffic that is heavy/intense); this is different from "hit the road" (an idiom), whose meaning as "to leave" cannot be derived from the individual words at all',
      wrong: 'No — like "hit the road," "heavy traffic" is a non-literal idiom whose meaning has to be memorized as a whole, unrelated to what "heavy" and "traffic" mean individually',
    },
    {
      stem: 'Checking whether "strong coffee" or "powerful coffee" is the habitual English pairing, a student decides to trust which phrasing they\'ve actually encountered in reading and listening, rather than reasoning from synonym logic. Is this the correct approach?',
      correct: 'Yes — since collocations are fixed pairings settled by actual usage rather than logical synonym-matching, checking which pairing has actually been encountered in real usage is exactly the correct way to determine the right collocation',
      wrong: 'No — since "strong" and "powerful" are close synonyms, either one should be equally acceptable paired with "coffee" without needing to check actual usage patterns',
    },
  ],
  [
    'MC-IF-A-SYNONYM-FITS-THE-DEFINITION-IT-FITS-THE-PHRASE, fresh adult example ("commit"/"perform" a crime) rather than the existing "make"/"do a decision" example',
    'MC-COLLOCATIONS-ARE-JUST-A-FANCY-NAME-FOR-IDIOMS, fresh example ("heavy traffic" vs. "hit the road") rather than the existing "heavy rain" example',
    'MC-IF-A-SYNONYM-FITS-THE-DEFINITION-IT-FITS-THE-PHRASE, second fresh example ("strong"/"powerful" coffee) forming the ladder\'s third rung',
  ],
)

const CONNOTATION_DENOTATION_ADULT = adultLadder(
  'eng.vocab.connotation-denotation',
  'MC-SAME-DENOTATION-MEANS-INTERCHANGEABLE',
  'MC-CONNOTATION-IS-JUST-PERSONAL-OPINION',
  [
    {
      stem: 'A student wants to compliment a colleague\'s determination on a difficult project and describes them as "stubborn," reasoning that "stubborn" and "persistent" share the same denotation (both mean "not giving up"). Would calling the colleague "stubborn" land as a compliment?',
      correct: 'No — "stubborn" and "persistent" share the same literal denotation but carry very different connotations; "stubborn" often connotes unreasonable inflexibility while "persistent" connotes admirable determination, so choosing the wrong word undermines the intended compliment',
      wrong: 'Yes — since "stubborn" and "persistent" denote the same underlying quality, either word works equally well regardless of the intended tone',
    },
    {
      stem: 'A student argues that whether "childish" sounds more critical than "childlike" is purely a matter of personal opinion, different for every listener. If ten different English speakers were asked which word sounds more critical, would their answers likely be scattered randomly, or would most speakers agree?',
      correct: 'Most speakers would likely agree — connotations are largely shared, culturally established associations most speakers of a language recognize similarly, which is exactly what makes connotation a genuine, analyzable, and teachable pattern rather than random individual opinion',
      wrong: 'The answers would likely be scattered randomly — connotation is a purely private, individual reaction to a word with no shared pattern across different speakers',
    },
    {
      stem: 'Revising a performance review, a writer changes "stubborn" to "persistent" when describing an employee\'s determination, after checking that both words share the same denotation but recognizing their different connotations. Is this revision correctly applying the distinction between denotation and connotation?',
      correct: 'Yes — recognizing that two words can share the same literal denotation while carrying different connotations, and choosing the one that fits the intended tone, is exactly the correct application of this distinction',
      wrong: "No — since both words denote the same underlying quality, switching from \"stubborn\" to \"persistent\" doesn't actually change anything meaningful about the review",
    },
  ],
  [
    'MC-SAME-DENOTATION-MEANS-INTERCHANGEABLE, fresh adult example ("stubborn"/"persistent") rather than the existing "cheap"/"frugal" example',
    'MC-CONNOTATION-IS-JUST-PERSONAL-OPINION, fresh example ("childish"/"childlike") rather than the existing "nosy"/"curious" example',
    'MC-SAME-DENOTATION-MEANS-INTERCHANGEABLE, second fresh example (revising the performance review) forming the ladder\'s third rung',
  ],
)

const ETYMOLOGY_ADULT = adultLadder(
  'eng.vocab.etymology',
  'MC-A-WORDS-ORIGINAL-MEANING-IS-ITS-TRUE-OR-CORRECT-MEANING-TODAY',
  'MC-EVERY-WORD-CAME-FROM-A-SINGLE-CLEAR-LANGUAGE-WITH-NO-BORROWING',
  [
    {
      stem: 'A colleague insists that since "silly" originally meant "blessed" or "happy" in Old English, using it today to mean "foolish" is simply incorrect usage. Is the word\'s original historical meaning its true, correct meaning today?',
      correct: 'No — a word\'s history explains where it came from, but language changes constantly; "silly" has drifted enormously from "blessed" to its modern sense of "foolish," and that current, drifted meaning is what the word actually means today, not its etymological origin',
      wrong: 'Yes — a word\'s original etymological meaning is its true, authoritative meaning, so any current usage that differs from the historical origin is technically incorrect',
    },
    {
      stem: 'A student assumes the word "ketchup" must trace back to one single, simple ancestor language. In fact, it traces from a Chinese dialect word for fish sauce, through Malay, before entering English. Does every English word have one simple, direct ancestor language with no borrowing involved?',
      correct: 'No — many English words have a genuinely international journey, sometimes passing through two or three languages before arriving in English, rather than tracing back to one single, direct ancestor',
      wrong: 'Yes — every word in English, including "ketchup," ultimately traces back to one clear, single ancestor language, with no multi-step borrowing involved',
    },
    {
      stem: 'Researching the word "nice," a writer notes its original sense was closer to "foolish" in Old English, but explicitly treats this as an interesting historical fact rather than evidence about what "nice" actually means in conversation today. Is this the correct way to use etymological information?',
      correct: 'Yes — enjoying etymology as the story of a word\'s origin while relying on current usage and dictionaries for what a word actually means today is exactly the correct way to treat etymological information',
      wrong: 'No — since the original meaning is the word\'s true origin, the writer should conclude that using "nice" to mean "foolish" would actually be the more correct, historically grounded usage',
    },
  ],
  [
    'MC-A-WORDS-ORIGINAL-MEANING-IS-ITS-TRUE-OR-CORRECT-MEANING-TODAY, fresh adult example ("silly") rather than the existing "decimate" example',
    'MC-EVERY-WORD-CAME-FROM-A-SINGLE-CLEAR-LANGUAGE-WITH-NO-BORROWING, fresh example ("ketchup") rather than the existing "restaurant"/"khaki" example',
    'MC-A-WORDS-ORIGINAL-MEANING-IS-ITS-TRUE-OR-CORRECT-MEANING-TODAY, second fresh example ("nice") forming the ladder\'s third rung',
  ],
)

const MULTIPLE_MEANING_WORDS_ADULT = adultLadder(
  'eng.vocab.multiple-meaning-words',
  'MC-MULTIPLE-MEANING-WORDS-ARE-JUST-HOMONYMS',
  'MC-DICTIONARY-LISTS-MEANINGS-IN-IMPORTANCE-ORDER',
  [
    {
      stem: 'A student claims "sharp" (as in "a sharp knife") and "sharp" (as in "a sharp mind") are exactly like "fair" (a state fair) and "fair" (treating people fairly) — totally unrelated meanings that just happen to share a word. Is there a conceptual connection between "a sharp knife" and "a sharp mind" the way there\'s no connection between "a state fair" and "being fair"?',
      correct: 'Yes, there is a connection — both senses of "sharp" relate to an underlying idea of keenness or precision, making this polysemy (related meanings), unlike "fair," whose two senses are historically unrelated and only coincidentally share a spelling (homonymy)',
      wrong: 'No connection exists — "sharp" (knife) and "sharp" (mind) are just as unrelated as the two senses of "fair," so both pairs should be classified the same way as coincidental homonyms',
    },
    {
      stem: 'Looking up "table" in a dictionary, a student assumes the first-listed sense (a piece of furniture) must apply in the sentence "Let\'s table this discussion until next week," simply because it\'s listed first. Does the sentence\'s context actually support the furniture meaning?',
      correct: 'No — the context clearly calls for the sense meaning "to postpone," regardless of which sense the dictionary happens to list first; dictionary ordering conventions vary, and context, not listing position, determines which meaning applies',
      wrong: 'Yes — since the furniture meaning is listed first in the dictionary, that must be the meaning intended in this sentence, since dictionaries list meanings in order of importance',
    },
    {
      stem: 'Comparing "head" (the body part) and "head" (the head of a company), a student notes both senses connect to an underlying idea of "the topmost or most important part," making this a genuine case of polysemy rather than coincidental homonymy. Is this correctly identified?',
      correct: 'Yes — recognizing the shared underlying concept connecting the two senses of "head" is exactly the correct test for distinguishing polysemy from purely coincidental homonym pairs',
      wrong: 'No — since "head" as a body part and "head" of a company are used in very different contexts, they must be unrelated homonyms regardless of any conceptual connection',
    },
  ],
  [
    'MC-MULTIPLE-MEANING-WORDS-ARE-JUST-HOMONYMS, fresh adult example ("sharp" knife/mind vs. "fair" state/treatment) rather than the existing "bright"/"bat" example',
    'MC-DICTIONARY-LISTS-MEANINGS-IN-IMPORTANCE-ORDER, fresh example ("table" as postpone) rather than the existing "bank" example',
    'MC-MULTIPLE-MEANING-WORDS-ARE-JUST-HOMONYMS, second fresh example ("head" body part vs. company head) forming the ladder\'s third rung',
  ],
)

const REGISTER_AND_FORMALITY_ADULT = adultLadder(
  'eng.vocab.register-and-formality',
  'MC-FORMAL-ALWAYS-MEANS-BETTER-OR-MORE-CORRECT',
  'MC-INFORMAL-REGISTER-MEANS-BAD-GRAMMAR-OR-SLOPPY-WRITING',
  [
    {
      stem: 'A student texts a close friend "I would be delighted to accompany you to the gathering this evening" instead of "sounds good, see you tonight!" believing more formal phrasing is always more correct English. Would the friend find the highly formal text message normal, or unusually distant?',
      correct: 'Unusually distant — using a hyper-formal register with a close friend doesn\'t sound more correct, it sounds strange or oddly stiff; formality is a tool that should fit the audience and context, not a scale where more formal always means better',
      wrong: 'Normal — since formal English is inherently more correct than casual English, the friend would recognize the highly formal text as simply better-written, more proper communication',
    },
    {
      stem: 'A teammate sends a quick Slack message, "omw, 5 min!" and a colleague "corrects" it to "I am currently en route and anticipate arriving within five minutes," treating the original as a grammar error. Is the casual original message actually a grammar mistake?',
      correct: "No — the casual message follows its own legitimate informal-register conventions (abbreviations, brevity) suited to a quick, fast-paced context; it isn't grammatically wrong, and \"fixing\" it into an overly formal register actually fails the message's real purpose",
      wrong: 'Yes — any deviation from full, formal sentence structure, like "omw, 5 min!", is a grammar mistake that should be corrected toward more proper, formal phrasing',
    },
    {
      stem: 'Reviewing a wedding toast draft and a casual birthday card message, a writer keeps warm, moderately formal language for the toast but casual, playful language for the card, recognizing each register fits its own context. Is matching register to context, rather than maximizing formality everywhere, the correct approach?',
      correct: 'Yes — matching the register to the audience and purpose in each case, rather than treating more formal as always better, is exactly the correct understanding of how register works',
      wrong: 'No — the toast and the card should both use the most formal, elevated language available, since maximizing formality is always the safest, most correct choice in written communication',
    },
  ],
  [
    'MC-FORMAL-ALWAYS-MEANS-BETTER-OR-MORE-CORRECT, fresh adult example (a text to a close friend) rather than the existing pizza-invitation example',
    'MC-INFORMAL-REGISTER-MEANS-BAD-GRAMMAR-OR-SLOPPY-WRITING, fresh example (a Slack message) rather than the existing text-message example',
    'MC-FORMAL-ALWAYS-MEANS-BETTER-OR-MORE-CORRECT, second fresh example (a wedding toast vs. a birthday card) forming the ladder\'s third rung',
  ],
)

const ROOTS_AND_ORIGINS_ADULT = adultLadder(
  'eng.vocab.roots-and-origins',
  'MC-A-ROOT-ALWAYS-KEEPS-THE-EXACT-SAME-MEANING-IN-EVERY-WORD',
  'MC-IF-A-WORD-LOOKS-LIKE-IT-HAS-A-ROOT-IT-MUST-BE-THAT-ROOT',
  [
    {
      stem: 'A colleague insists "dictator" must specifically mean "one who dictates/speaks commands aloud," reflecting the literal root "dict" (to speak), and is confused that modern usage focuses on absolute political power rather than speaking. Does the root\'s literal meaning fix the word\'s exact meaning today?',
      correct: 'No — the root gives a strong starting clue (dictator relates to commanding/speaking authoritatively), but word meanings drift over time; "dictator" has narrowed to mean someone with absolute, often oppressive political power, not strictly "one who speaks," and that drift is normal',
      wrong: 'Yes — since the root "dict" means "to speak," "dictator" must still mean exactly "one who speaks or dictates aloud" today, and any broader political sense is a misuse of the word',
    },
    {
      stem: 'A student sees "cattle" and assumes it must contain the root related to "cat," since the letters visually overlap. Checking further, does the meaning "cat" actually help explain what "cattle" means (farm animals like cows)?',
      correct: 'No — the meaning "cat" has nothing to do with "cattle" (which relates to property/livestock, from a different root entirely); this is a coincidental letter overlap, not a true shared root, since the test is whether the root\'s meaning actually explains the word\'s meaning',
      wrong: 'Yes — since "cattle" visually contains the letters "cat," it must genuinely share a root with "cat," regardless of whether the meanings are actually related',
    },
    {
      stem: 'Researching "manuscript" (root "manu" = hand), a writer confirms the word still literally involves hand-writing in most contexts, while researching "manufacture" (same root), the writer notes the word has drifted to mean "produced," even by machines. Is treating the root as a flexible starting clue, rather than a fixed definition, the correct approach here?',
      correct: 'Yes — using the root as an educated first guess and then checking it against actual usage, recognizing that the same root can stay literal in one word while drifting in another, is exactly the correct approach',
      wrong: 'No — since both words share the same root "manu," they must both still mean something involving literal hand-use today, and any word where that doesn\'t hold true must have been misclassified',
    },
  ],
  [
    'MC-A-ROOT-ALWAYS-KEEPS-THE-EXACT-SAME-MEANING-IN-EVERY-WORD, fresh adult example ("dictator") rather than the existing "manufacture" example',
    'MC-IF-A-WORD-LOOKS-LIKE-IT-HAS-A-ROOT-IT-MUST-BE-THAT-ROOT, fresh example ("cattle"/"cat") rather than the existing "caterpillar" example',
    'MC-A-ROOT-ALWAYS-KEEPS-THE-EXACT-SAME-MEANING-IN-EVERY-WORD, second fresh example ("manuscript" vs. "manufacture") forming the ladder\'s third rung',
  ],
)

const SEMANTIC_FIELDS_ADULT = adultLadder(
  'eng.vocab.semantic-fields',
  'MC-A-A-SEMANTIC-FIELD-IS-JUST-A-LIST-OF-SYNONYMS-FOR-ONE-WORD',
  'MC-B-ANY-WORDS-THAT-OFTEN-APPEAR-TOGETHER-IN-THE-SAME-CONTEXT-BELONG-TO-THE-SAME-SEMANTIC-FIELD',
  [
    {
      stem: 'A student is given the words "promotion," "layoff," "salary," and "resignation" and assumes they must all mean nearly the same thing since they\'re grouped together under "employment." Do "promotion" and "layoff" mean anything close to the same thing?',
      correct: 'No — these words share a broader conceptual domain (employment) without meaning the same thing at all, which is exactly what defines a semantic field; a genuine synonym set, like "raise," "increase," and "bump," would instead consist of words that do mean nearly the same thing',
      wrong: 'Yes — since all four words belong to the same semantic field of "employment," they should be expected to mean roughly the same thing, the way true synonyms do',
    },
    {
      stem: 'A student groups "stethoscope" into the "medical professionals" semantic field because it frequently appears in sentences alongside "doctor" and "nurse." Does "stethoscope" describe the same kind of thing as "doctor" and "nurse" (a type of medical professional)?',
      correct: 'No — "stethoscope" is an object/tool, not a medical professional; frequent co-occurrence with words like "doctor" is a contextual association (collocation), not evidence of belonging to the same conceptual domain as the semantic field of medical professionals',
      wrong: 'Yes — since "stethoscope" often appears in the same sentences as "doctor" and "nurse," it belongs to the same semantic field as those words',
    },
    {
      stem: 'Given the cooking-related words "bake," "boil," "fry," "roast," and "simmer," a student explains that none of these are synonyms of each other, yet all belong to the same semantic field of cooking methods. Is this the correct way to understand what unifies a semantic field?',
      correct: 'Yes — recognizing that words in a semantic field share a broader conceptual domain without needing to mean the same thing as each other is exactly the correct understanding of what defines a semantic field',
      wrong: "No — if \"bake,\" \"boil,\" \"fry,\" \"roast,\" and \"simmer\" aren't synonyms of each other, they shouldn't be grouped into the same semantic field at all, since a semantic field requires shared meaning among its members",
    },
  ],
  [
    'MC-A-A-SEMANTIC-FIELD-IS-JUST-A-LIST-OF-SYNONYMS-FOR-ONE-WORD, fresh adult example (employment words) rather than the existing emotion-words example',
    'MC-B-ANY-WORDS-THAT-OFTEN-APPEAR-TOGETHER-IN-THE-SAME-CONTEXT-BELONG-TO-THE-SAME-SEMANTIC-FIELD, fresh example ("stethoscope"/"doctor") rather than the existing "umbrella"/"rain" example',
    'MC-A-A-SEMANTIC-FIELD-IS-JUST-A-LIST-OF-SYNONYMS-FOR-ONE-WORD, second fresh example (cooking-method words) forming the ladder\'s third rung',
  ],
)

export const ENGLISH_ADULT_BAND_BATCH_20: SeedProbe[] = [
  ...ACADEMIC_VOCABULARY_ADULT,
  ...COLLOCATIONS_ADULT,
  ...CONNOTATION_DENOTATION_ADULT,
  ...ETYMOLOGY_ADULT,
  ...MULTIPLE_MEANING_WORDS_ADULT,
  ...REGISTER_AND_FORMALITY_ADULT,
  ...ROOTS_AND_ORIGINS_ADULT,
  ...SEMANTIC_FIELDS_ADULT,
]
