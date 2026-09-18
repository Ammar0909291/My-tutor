/**
 * ENGLISH ADULT-BAND PROBE-CONTRACT CAMPAIGN — Batch 16.
 *
 * ── THE GAP THIS CLOSES ─────────────────────────────────────────────────────
 * Batches 13-15 (2026-09-17/18) closed all `eng.composition.*` and
 * `eng.communication.*` concepts. This batch closes all 18 short
 * `eng.linguistics.*` concepts (the campaign history's prior estimate of
 * "16" was stale — live `contract-audit.ts --subject english --all`
 * regeneration found 18; per this campaign's own standing discipline, never
 * trust a count in a history file, always regenerate): applied-linguistics-
 * intro, bilingualism-and-multilingualism, computational-linguistics-intro,
 * corpus-linguistics-intro, dialectology, discourse-analysis-intro,
 * historical-linguistics-intro, language-acquisition-intro, language-
 * families, morphology-intro, phonology-intro, pragmatics-intro,
 * psycholinguistics-intro, semantics-intro, sociolinguistics-intro, syntax-
 * theory-intro, translation-studies-intro, what-is-linguistics. 3 new
 * ADULT-band closed-choice probes each (54 total), the bare mastery-gate
 * contract (`correctAtCheck >= 1` + `correctAtPractice >= 2` = 3,
 * `assetContract.ts`). This same `--all` regeneration also surfaced 3
 * previously-unknown short `eng.grammar.*` pairs (colons-semicolons-dashes,
 * parallel-structure, sentence-combining) — NOT touched by this batch
 * (different subdomain; flagged for a future bounded batch, per this
 * campaign's one-subdomain-per-batch discipline). Remaining gap after this
 * batch: `eng.literature.*` (16 advanced), `eng.phonetics.*` (12 advanced),
 * `eng.vocab.*` (9 advanced), `eng.writing.*` (9 advanced), the 3
 * `eng.grammar.*` pairs above, `eng.reading.reading-across-genres`,
 * `eng.speaking.debate-skills`/`presentation-skills`, and the 2 EARLY-band
 * phonics pairs excluded per Batch 13's own finding (voice-required),
 * deferred to future batches (see
 * `docs/history/subject-onboarding-and-fix-campaign.md`).
 *
 * Every distractor carries the `misconceptionId` naming it, reusing ONE of
 * each concept's own two ALREADY-REGISTERED, ALREADY-ACTIVE misconceptions
 * (verified against each concept's Blueprint Component 1 — Misconception
 * Register: every one of these 18 concepts holds exactly MC-A and MC-B — no
 * more, no fewer; no new misconception ids invented, no Educational Brain
 * authoring). Structure mirrors `englishAdultBandBatch13.ts`'s `adultLadder`
 * helper exactly: `mcq`(FOUNDATIONAL) + `misconception_probe`(DEVELOPING) +
 * `mcq`(PROFICIENT) per concept, so the ladder-aware slug resolver
 * (`buildProbeSlugResolver`) disambiguates the two `mcq` rungs by difficulty
 * without re-identifying any already-serving row. None of these 18 concepts
 * hold any existing ADULT probe today, so this is a fresh singleton-to-
 * ladder promotion within this batch only — no P-10 collision risk against
 * any pre-existing row.
 *
 * Register: adult/academic framing throughout, matching the age these
 * introductory-linguistics concepts are naturally taught at — never
 * child-directed examples (even where the concept itself is ABOUT child
 * language acquisition, the framing addresses an adult analyzing that
 * data, not a child learner). Every worked example below is deliberately
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

const APPLIED_LINGUISTICS_INTRO_ADULT = adultLadder(
  'eng.linguistics.applied-linguistics-intro',
  'MC-A-ANY-LANGUAGE-TEACHING-METHOD-THAT-FEELS-TRADITIONAL-OR-FAMILIAR-MUST-BE-EFFECTIVE',
  'MC-B-A-STANDARDIZED-LANGUAGE-TEST-THAT-USES-ONE-DIALECT-IS-A-NEUTRAL-FAIR-MEASURE-OF-LANGUAGE-SKILL',
  [
    {
      stem: 'A corporate language-training program has employees translate long lists of isolated business vocabulary word-for-word with no communicative practice, continuing this approach because "it\'s how language training has always been done at this company." Does the method\'s long-standing use mean it\'s effective?',
      correct: "No — a method being familiar or long-standing doesn't mean it aligns with what acquisition research shows about how people actually internalize language; the method should be evaluated against that evidence, not assumed effective because it's traditional",
      wrong: "Yes — a method that has been used for a long time at the company must be effective, since it wouldn't have continued being used otherwise",
    },
    {
      stem: 'A company\'s internal English-proficiency test marks a grammatically legitimate feature of a widely-spoken regional dialect as an "error" on its writing section, even when the underlying communication is clear. Is this test a neutral, purely technical measure of the employee\'s writing skill?',
      correct: 'No — a test that penalizes a systematic, legitimate dialect feature unrelated to actual communicative clarity is partly measuring dialect conformity, not just the writing skill it claims to measure; this makes it unfair to speakers of that dialect',
      wrong: 'Yes — since the test produces a consistent score for every test-taker, it is measuring writing skill neutrally regardless of which dialect a test-taker speaks',
    },
    {
      stem: 'After the corporate training program is redesigned so employees practice the same vocabulary by using it to complete real workplace tasks (drafting an email, taking a phone message) rather than translating isolated lists, is this redesign more likely to align with what acquisition research shows about effective language learning?',
      correct: 'Yes — embedding vocabulary in meaningful, communicative practice matches what research shows about how people internalize language, unlike rote list-translation, regardless of which approach feels more traditional',
      wrong: "No — since both versions cover the same vocabulary list, switching to task-based practice doesn't actually change how effective the training is",
    },
  ],
  [
    'MC-A-ANY-LANGUAGE-TEACHING-METHOD-THAT-FEELS-TRADITIONAL-OR-FAMILIAR-MUST-BE-EFFECTIVE, fresh adult example (a corporate translation-drill program) rather than the existing generic grammar-drill example',
    'MC-B-A-STANDARDIZED-LANGUAGE-TEST-THAT-USES-ONE-DIALECT-IS-A-NEUTRAL-FAIR-MEASURE-OF-LANGUAGE-SKILL, fresh example (a company proficiency test) rather than the existing generic reading-comprehension test example',
    'MC-A-ANY-LANGUAGE-TEACHING-METHOD-THAT-FEELS-TRADITIONAL-OR-FAMILIAR-MUST-BE-EFFECTIVE, second fresh example (the redesigned training program) forming the ladder\'s third rung',
  ],
)

const BILINGUALISM_AND_MULTILINGUALISM_ADULT = adultLadder(
  'eng.linguistics.bilingualism-and-multilingualism',
  'MC-A-A-TRUE-BILINGUAL-MUST-HAVE-EQUAL-NATIVE-LIKE-FLUENCY-IN-BOTH-LANGUAGES-SEPARATELY',
  'MC-B-A-BILINGUAL-CHILD-MIXING-TWO-LANGUAGES-IN-ONE-SENTENCE-IS-CONFUSED-OR-DELAYED',
  [
    {
      stem: 'An adult bilingual employee discusses financial reports fluently in English, the language of their workplace, but discusses cooking and family recipes far more fluently in Spanish, the language of their childhood home. Does this employee\'s different strength in each domain mean they are not truly bilingual?',
      correct: 'No — this domain-specific pattern, where competence naturally distributes across the language actually used for each purpose, is the normal, well-documented shape of real bilingual competence, not a deficiency in either language',
      wrong: 'Yes — a genuinely bilingual person must have identical, native-like fluency in every domain in both languages separately, so this employee\'s uneven strengths mean they are not truly bilingual in either',
    },
    {
      stem: 'At daycare, a bilingual toddler says a sentence that mixes a word from one language into an otherwise different-language sentence. Does this code-mixing mean the toddler is confused or behind in language development?',
      correct: "No — code-mixing during bilingual acquisition is a normal, well-documented developmental pattern that typically resolves as the child's ability to keep the two language systems separate develops with age, not a sign of confusion or delay",
      wrong: "Yes — a child who mixes elements from two languages within one sentence doesn't yet know either language properly, which indicates a developmental delay",
    },
    {
      stem: 'A hiring manager assumes a bilingual candidate who is more comfortable presenting technical material in English than in their heritage language must not be "fully" bilingual. Is this assumption accurate?',
      correct: 'No — different strengths in different domains across two languages is the normal pattern for real-world bilingual competence, reflecting which language the person has actually used for which purposes, not incomplete bilingualism',
      wrong: "Yes — a genuinely bilingual candidate should be equally comfortable presenting technical material in either language, so unevenness here indicates the candidate isn't fully bilingual",
    },
  ],
  [
    'MC-A-A-TRUE-BILINGUAL-MUST-HAVE-EQUAL-NATIVE-LIKE-FLUENCY-IN-BOTH-LANGUAGES-SEPARATELY, fresh adult example (a bilingual employee\'s domain-specific fluency) rather than the existing generic home/school-domain example',
    'MC-B-A-BILINGUAL-CHILD-MIXING-TWO-LANGUAGES-IN-ONE-SENTENCE-IS-CONFUSED-OR-DELAYED, fresh example (a daycare code-mixing instance) rather than the existing generic child-utterance example',
    'MC-A-A-TRUE-BILINGUAL-MUST-HAVE-EQUAL-NATIVE-LIKE-FLUENCY-IN-BOTH-LANGUAGES-SEPARATELY, second fresh example (a hiring manager\'s assumption) forming the ladder\'s third rung',
  ],
)

const COMPUTATIONAL_LINGUISTICS_INTRO_ADULT = adultLadder(
  'eng.linguistics.computational-linguistics-intro',
  'MC-A-A-COMPUTER-PRODUCING-FLUENT-GRAMMATICALLY-CORRECT-LANGUAGE-MUST-UNDERSTAND-THE-MEANING-THE-WAY-A-HUMAN-DOES',
  'MC-B-COMPUTATIONAL-LANGUAGE-SYSTEMS-CAN-HANDLE-EVERY-ASPECT-OF-LANGUAGE-EQUALLY-WELL-WITH-NO-GENUINE-LIMITATIONS',
  [
    {
      stem: 'A customer-service chatbot produces a perfectly fluent, grammatically flawless response that confidently states an incorrect return-policy deadline. Does the fluency of the response mean the system genuinely understood the policy the way a human employee would?',
      correct: 'No — fluent, grammatically correct output can be generated through pattern-matching learned from text, a genuinely different process from human comprehension; the factual error here suggests pattern-matching without verified understanding',
      wrong: 'Yes — since the chatbot\'s sentence is grammatically perfect and reads naturally, it must have genuinely understood the return policy the way a human employee would',
    },
    {
      stem: 'Given the sentence "The package didn\'t fit in the mailbox because it was too small," resolving whether "it" refers to the package or the mailbox requires knowing which one would typically need to fit inside the other. Can this ambiguity be resolved by grammatical pattern alone, with no real-world knowledge?',
      correct: 'No — this is exactly the kind of ambiguity that requires real-world knowledge beyond linguistic pattern; computational systems have genuine, persistent limitations on tasks like this, not uniformly strong performance across every kind of language task',
      wrong: 'Yes — computational language systems handle every kind of language task, including this kind of pronoun ambiguity, equally well using grammatical pattern alone, with no genuine limitations',
    },
    {
      stem: 'A student notices the chatbot\'s fluent, confident-sounding response about the return policy and, instead of trusting it outright, independently checks the actual policy document before relying on the answer. Is this the right response to fluent-but-possibly-wrong AI output?',
      correct: 'Yes — fluency is a measure of pattern-matching skill, a separate question from factual accuracy; verifying claims independently rather than trusting fluency alone is the correct response to this genuine limitation',
      wrong: 'No — since the chatbot\'s response was grammatically flawless and confident-sounding, independently verifying it was an unnecessary extra step',
    },
  ],
  [
    'MC-A-A-COMPUTER-PRODUCING-FLUENT-GRAMMATICALLY-CORRECT-LANGUAGE-MUST-UNDERSTAND-THE-MEANING-THE-WAY-A-HUMAN-DOES, fresh adult example (a chatbot\'s wrong return-policy deadline) rather than the existing generic factual-error example',
    'MC-B-COMPUTATIONAL-LANGUAGE-SYSTEMS-CAN-HANDLE-EVERY-ASPECT-OF-LANGUAGE-EQUALLY-WELL-WITH-NO-GENUINE-LIMITATIONS, fresh example (a package/mailbox pronoun ambiguity) rather than the existing trophy/suitcase example',
    'MC-A-A-COMPUTER-PRODUCING-FLUENT-GRAMMATICALLY-CORRECT-LANGUAGE-MUST-UNDERSTAND-THE-MEANING-THE-WAY-A-HUMAN-DOES, second fresh example (independently verifying the chatbot\'s claim) forming the ladder\'s third rung',
  ],
)

const CORPUS_LINGUISTICS_INTRO_ADULT = adultLadder(
  'eng.linguistics.corpus-linguistics-intro',
  'MC-A-MY-OWN-INTUITION-ABOUT-HOW-LANGUAGE-IS-USUALLY-USED-IS-ALWAYS-AS-RELIABLE-AS-CORPUS-DATA',
  'MC-B-IF-CORPUS-DATA-SHOWS-SOMETHING-IS-RARE-OR-UNUSUAL-IT-MUST-BE-UNGRAMMATICAL',
  [
    {
      stem: 'Asked whether "different from" or "different than" is more common in edited published writing, a writer guesses based on which one "sounds right" to them personally, without checking any data. Is personal intuition about which phrasing is more frequent as reliable as actual large-scale corpus data?',
      correct: "No — individual intuition about frequency is notoriously unreliable compared to large-scale empirical data; a personal sense of what \"sounds right\" is built from limited, biased personal experience, not the full picture corpus data provides",
      wrong: 'Yes — a fluent speaker\'s personal sense of which phrasing sounds more natural is just as reliable a guide to actual usage frequency as systematic corpus data',
    },
    {
      stem: 'Corpus data shows that a particular cleft construction ("It was Monday that the shipment arrived") is grammatically well-formed but appears far less often than the plain alternative ("The shipment arrived Monday"). Does this construction\'s rarity in the corpus mean it must be ungrammatical?',
      correct: 'No — frequency and grammaticality are separate questions; a perfectly grammatical construction can simply be needed less often for a specific emphasis or style without being structurally broken',
      wrong: 'Yes — if a construction occurs rarely in a large corpus, that rarity itself proves the construction is not actually a valid, grammatical sentence of English',
    },
    {
      stem: 'Before finalizing a style guide\'s recommendation, a writer checks corpus frequency data instead of relying on their own sense of which of two near-synonymous phrasings professional writers actually use more. Is checking the data instead of trusting personal intuition the better approach here?',
      correct: 'Yes — for questions about how often something occurs in actual usage, systematic corpus data is more reliable than personal intuition, which is built from a small, unrepresentative sample of one person\'s experience',
      wrong: 'No — since the writer is a fluent, experienced speaker, their own intuition about frequency is already as reliable as checking the data would be',
    },
  ],
  [
    'MC-A-MY-OWN-INTUITION-ABOUT-HOW-LANGUAGE-IS-USUALLY-USED-IS-ALWAYS-AS-RELIABLE-AS-CORPUS-DATA, fresh adult example ("different from" vs. "different than") rather than the existing generic phrasing-comparison example',
    'MC-B-IF-CORPUS-DATA-SHOWS-SOMETHING-IS-RARE-OR-UNUSUAL-IT-MUST-BE-UNGRAMMATICAL, fresh example (a cleft construction) rather than the existing passive-voice example',
    'MC-A-MY-OWN-INTUITION-ABOUT-HOW-LANGUAGE-IS-USUALLY-USED-IS-ALWAYS-AS-RELIABLE-AS-CORPUS-DATA, second fresh example (a style guide checking data before recommending) forming the ladder\'s third rung',
  ],
)

const DIALECTOLOGY_ADULT = adultLadder(
  'eng.linguistics.dialectology',
  'MC-A-DIALECT-BOUNDARIES-ARE-SHARP-LINES-WHERE-EVERYONE-ON-ONE-SIDE-SPEAKS-ONE-WAY-AND-EVERYONE-ON-THE-OTHER-SPEAKS-DIFFERENTLY',
  'MC-B-A-DIALECT-IS-ONE-SINGLE-UNIFIED-THING-EVERYONE-IN-A-REGION-EITHER-HAS-OR-DOESNT-HAVE',
  [
    {
      stem: 'A linguist maps two different features across a region — where people say "soda" versus "pop," and where people pronounce a specific vowel differently — and finds these two feature boundaries fall along different lines, not the same one. Does this contradict picturing dialect regions as separated by a single sharp boundary line?',
      correct: 'Yes — this is exactly what real dialect boundaries look like: each individual feature has its own isogloss, and these lines for different features rarely align into one single, sharp dividing line',
      wrong: 'No — since both features are part of "the regional dialect," their boundary lines should be expected to fall in the same place, so any difference must reflect a mapping error',
    },
    {
      stem: 'Two lifelong residents of the same city are both described as speakers of that city\'s named regional dialect, yet one uses a specific vocabulary item the other never uses, and one has a pronunciation feature the other lacks. Does this mean the dialect label refers to one single, uniform set of features every speaker shares identically?',
      correct: 'No — a named dialect is a bundle of many individual features; real speakers typically share most but rarely all of the bundle, so individual variation between two speakers of "the same dialect" is completely normal',
      wrong: 'Yes — if both speakers are genuinely speakers of the same named dialect, they must share every one of its associated features identically, so any difference means one of them isn\'t really a speaker of it',
    },
    {
      stem: 'A researcher plots a third feature (a grammatical construction) across the same region and finds its boundary falls at yet a third, different location from the vocabulary and pronunciation boundaries already mapped. Is this additional finding consistent with how real dialect boundaries work?',
      correct: 'Yes — expecting each individual linguistic feature to have its own separate, non-aligned isogloss is exactly the reality of dialect boundaries, rather than one sharp line all features share',
      wrong: 'No — three different boundary lines for three different features in the same region would mean the earlier mapping of the region\'s dialect boundary must have been done incorrectly',
    },
  ],
  [
    'MC-A-DIALECT-BOUNDARIES-ARE-SHARP-LINES-WHERE-EVERYONE-ON-ONE-SIDE-SPEAKS-ONE-WAY-AND-EVERYONE-ON-THE-OTHER-SPEAKS-DIFFERENTLY, fresh adult example (soda/pop and vowel isoglosses) rather than the existing generic multi-feature map example',
    'MC-B-A-DIALECT-IS-ONE-SINGLE-UNIFIED-THING-EVERYONE-IN-A-REGION-EITHER-HAS-OR-DOESNT-HAVE, fresh example (two city residents differing on vocabulary and pronunciation) rather than the existing generic two-speakers example',
    'MC-A-DIALECT-BOUNDARIES-ARE-SHARP-LINES-WHERE-EVERYONE-ON-ONE-SIDE-SPEAKS-ONE-WAY-AND-EVERYONE-ON-THE-OTHER-SPEAKS-DIFFERENTLY, second fresh example (a third grammatical-feature isogloss) forming the ladder\'s third rung',
  ],
)

const DISCOURSE_ANALYSIS_INTRO_ADULT = adultLadder(
  'eng.linguistics.discourse-analysis-intro',
  'MC-A-A-TEXT-WITH-LOTS-OF-COHESIVE-DEVICES-LIKE-PRONOUNS-AND-CONJUNCTIONS-IS-AUTOMATICALLY-COHERENT',
  'MC-B-CONVERSATIONAL-TURN-TAKING-JUST-HAPPENS-RANDOMLY-WITH-NO-UNDERLYING-STRUCTURE',
  [
    {
      stem: 'A business memo uses "it," "this," and "therefore" repeatedly throughout, but several of the pronouns could refer to two or three different things mentioned earlier, and one "therefore" connects two points that don\'t actually follow from each other. Does the memo\'s heavy use of these linking devices mean it is coherent?',
      correct: 'No — cohesion (the linking devices themselves) and coherence (whether the text actually makes logical sense) are separate properties; a text dense with pronouns and conjunctions can still fail to cohere logically if the referents are unclear or the connections don\'t hold',
      wrong: 'Yes — a text using many pronouns and conjunctions throughout is, by virtue of having so many linking devices, automatically making logical sense',
    },
    {
      stem: 'In a transcribed customer-service call, one representative consistently begins speaking right after the caller\'s pitch falls and reaches a grammatically complete point, while an interruption at a different, mid-sentence point causes visible friction. Does this pattern suggest turn-taking happens with no underlying structure?',
      correct: 'No — turn-taking follows real, identifiable patterns (falling intonation, grammatically complete points) that speakers systematically use and respond to; the friction at the mid-sentence interruption versus the smooth handoff at the completion point reveals this structure, not random chaos',
      wrong: 'Yes — since interruptions sometimes work smoothly and sometimes cause friction with no obvious reason, conversational turn-taking must happen essentially at random',
    },
    {
      stem: 'Revising an analysis of the business memo, a reader traces each pronoun back to what it\'s actually supposed to refer to and finds two of them could plausibly point to either of two different earlier nouns. Has this revision improved the discourse analysis of the memo?',
      correct: 'Yes — tracing pronoun reference and checking whether logical connectors actually hold is exactly what evaluating coherence (as opposed to just counting cohesive devices) requires',
      wrong: 'No — since the memo still contains the same number of pronouns and conjunctions either way, tracing their specific referents doesn\'t add anything to the analysis',
    },
  ],
  [
    'MC-A-A-TEXT-WITH-LOTS-OF-COHESIVE-DEVICES-LIKE-PRONOUNS-AND-CONJUNCTIONS-IS-AUTOMATICALLY-COHERENT, fresh adult example (a business memo) rather than the existing generic passage example',
    'MC-B-CONVERSATIONAL-TURN-TAKING-JUST-HAPPENS-RANDOMLY-WITH-NO-UNDERLYING-STRUCTURE, fresh example (a customer-service call transcript) rather than the existing generic transcribed-conversation example',
    'MC-A-A-TEXT-WITH-LOTS-OF-COHESIVE-DEVICES-LIKE-PRONOUNS-AND-CONJUNCTIONS-IS-AUTOMATICALLY-COHERENT, second fresh example (tracing the memo\'s pronoun referents) forming the ladder\'s third rung',
  ],
)

const HISTORICAL_LINGUISTICS_INTRO_ADULT = adultLadder(
  'eng.linguistics.historical-linguistics-intro',
  'MC-A-LANGUAGE-CHANGE-IS-RANDOM-DECAY-OR-CORRUPTION-OF-A-PURER-EARLIER-FORM',
  'MC-B-LANGUAGE-CHANGE-HAPPENS-RANDOMLY-WORD-BY-WORD-WITH-NO-SYSTEMATIC-PATTERN',
  [
    {
      stem: 'A columnist writes that today\'s casual texting abbreviations are "corrupting" English away from some earlier, more correct form of the language. Is treating today\'s usage as a corrupted version of an earlier "pure" English an accurate way to understand language change?',
      correct: 'No — every historical stage of English, including whatever earlier stage the columnist has in mind, was itself the product of systematic change from an even earlier ancestor; there is no privileged "pure" starting point to measure decline from',
      wrong: 'Yes — since today\'s casual usage clearly differs from more formal historical English, this difference is accurately described as a corruption or decay of the earlier, more correct form',
    },
    {
      stem: 'A linguist finds the same consonant shifted the same way across dozens of unrelated words that all originally shared a particular sound environment, while words without that original sound were unaffected. Does this pattern look like random, word-by-word change?',
      correct: 'No — this is exactly what a systematic sound-change rule looks like: a consistent pattern applied across many words sharing a specific feature, not scattered, unpredictable, word-by-word chaos',
      wrong: 'Yes — since each individual word\'s pronunciation changed at its own point in history, this pattern still reflects random change happening independently, word by word',
    },
    {
      stem: 'A student revises their view of a slang term that older generations call "improper," recognizing that this generation\'s usage is simply the current, complete stage of an ever-changing system, exactly as formal usage was itself a change from an earlier stage. Does this revised view correctly apply the concept of ongoing language change?',
      correct: 'Yes — recognizing that no historical stage of a language is a privileged, uncorrupted original is exactly what understanding language change as a continuous, non-judgmental process requires',
      wrong: 'No — slang terms are still a case of the language declining from its more correct earlier forms, regardless of how the concept of continuous change is framed elsewhere',
    },
  ],
  [
    'MC-A-LANGUAGE-CHANGE-IS-RANDOM-DECAY-OR-CORRUPTION-OF-A-PURER-EARLIER-FORM, fresh adult example (texting abbreviations) rather than the existing Old English/Modern English example',
    'MC-B-LANGUAGE-CHANGE-HAPPENS-RANDOMLY-WORD-BY-WORD-WITH-NO-SYSTEMATIC-PATTERN, fresh example (a systematic consonant shift) rather than the existing Great Vowel Shift example',
    'MC-A-LANGUAGE-CHANGE-IS-RANDOM-DECAY-OR-CORRUPTION-OF-A-PURER-EARLIER-FORM, second fresh example (a slang term reconsidered) forming the ladder\'s third rung',
  ],
)

const LANGUAGE_ACQUISITION_INTRO_ADULT = adultLadder(
  'eng.linguistics.language-acquisition-intro',
  'MC-A-CHILDREN-LEARN-LANGUAGE-PURELY-BY-IMITATING-WHAT-THEY-HEAR-ADULTS-SAY',
  'MC-B-LEARNING-A-LANGUAGE-LATER-IN-LIFE-IS-JUST-A-WEAKER-OR-WORSE-VERSION-OF-CHILDHOOD-ACQUISITION',
  [
    {
      stem: 'A young child says "I saw two mouses in the yard." Has this child likely heard an adult say "mouses"?',
      correct: 'No adult around the child likely says "mouses," so this form must come from the child actively applying the regular plural rule (add "-s") even to an irregular noun, direct evidence of rule-construction rather than imitation',
      wrong: 'Yes — children only produce words and forms they have directly heard from adults, so the child must have heard an adult use "mouses" at some point',
    },
    {
      stem: 'An adult studying a new language explicitly learns and quickly applies a complex grammar rule using conscious reasoning, while struggling much more than a young child would to sound native in pronunciation. Does this pattern mean the adult is simply worse overall at language learning than a child?',
      correct: 'No — the adult and the child are drawing on genuinely different cognitive resources, producing different strengths (faster explicit grammar learning for the adult, easier native-like pronunciation for the child), not one group being uniformly weaker',
      wrong: 'Yes — since the adult struggles more with pronunciation than a child would, this shows adults are generally worse at language learning than children across the board',
    },
    {
      stem: 'A teacher hears a child say "I falled down" and, instead of assuming the child simply misheard an adult, recognizes this as evidence the child has extracted and is over-applying the regular past-tense rule. Is this the correct way to interpret the error?',
      correct: 'Yes — "falled" is not a form adults produce, so it reveals the child\'s own internal rule system being actively applied, exactly the kind of evidence that shows acquisition isn\'t pure imitation',
      wrong: "No — any error a child produces that isn't correct adult English should be treated as a simple mishearing or incomplete copying of what an adult actually said",
    },
  ],
  [
    'MC-A-CHILDREN-LEARN-LANGUAGE-PURELY-BY-IMITATING-WHAT-THEY-HEAR-ADULTS-SAY, fresh adult example ("mouses") rather than the existing "goed" example',
    'MC-B-LEARNING-A-LANGUAGE-LATER-IN-LIFE-IS-JUST-A-WEAKER-OR-WORSE-VERSION-OF-CHILDHOOD-ACQUISITION, fresh example (an adult\'s explicit grammar learning) rather than the existing generic pronunciation/grammar comparison example',
    'MC-A-CHILDREN-LEARN-LANGUAGE-PURELY-BY-IMITATING-WHAT-THEY-HEAR-ADULTS-SAY, second fresh example ("falled") forming the ladder\'s third rung',
  ],
)

const LANGUAGE_FAMILIES_ADULT = adultLadder(
  'eng.linguistics.language-families',
  'MC-A-ANY-TWO-LANGUAGES-WITH-SIMILAR-SOUNDING-WORDS-MUST-BE-RELATED',
  'MC-B-LANGUAGES-USING-THE-SAME-WRITING-SYSTEM-OR-LOCATED-IN-THE-SAME-REGION-ARE-AUTOMATICALLY-IN-THE-SAME-LANGUAGE-FAMILY',
  [
    {
      stem: 'A student notices that an unrelated pair of languages both happen to have a similar-sounding word for "dog" and concludes the two languages must be genealogically related. Does one similar-sounding word pair prove a genuine family relationship?',
      correct: 'No — a single similar-sounding word can arise from coincidence or borrowing; genuine genealogical relationship requires systematic, regular sound correspondences across many words, established through the comparative method, not one matching pair',
      wrong: 'Yes — when two languages share a similar-sounding word for the same basic concept, that similarity is itself sufficient evidence that the languages are genealogically related',
    },
    {
      stem: 'Two languages that are genealogically unrelated (from entirely different families) both came to be written using the same alphabet, adopted through historical trade contact. Does sharing this writing system mean the two languages belong to the same language family?',
      correct: 'No — writing systems spread through cultural contact, trade, and colonization, entirely independent of genealogical relationships; sharing a script tells us nothing about whether two languages are actually related',
      wrong: 'Yes — two languages that use the same writing system today must belong to the same genealogical language family, since a shared script indicates a shared linguistic origin',
    },
    {
      stem: 'A linguist finds that a specific consonant in Language X consistently corresponds to a different, specific consonant in Language Y across dozens of word pairs with related meanings. Is this systematic correspondence pattern, rather than a single similar word, the right kind of evidence for concluding the two languages are related?',
      correct: 'Yes — a systematic, regular sound correspondence across many words, established through the comparative method, is exactly the kind of evidence needed to establish genuine genealogical relationship, unlike a single coincidentally similar word',
      wrong: 'No — a systematic pattern across many words is no more convincing than a single similar-sounding word pair, since both are just observations about how the languages happen to sound',
    },
  ],
  [
    'MC-A-ANY-TWO-LANGUAGES-WITH-SIMILAR-SOUNDING-WORDS-MUST-BE-RELATED, fresh adult example (a coincidentally similar word for "dog") rather than the existing generic basic-concept example',
    'MC-B-LANGUAGES-USING-THE-SAME-WRITING-SYSTEM-OR-LOCATED-IN-THE-SAME-REGION-ARE-AUTOMATICALLY-IN-THE-SAME-LANGUAGE-FAMILY, fresh example (a shared alphabet via trade contact) rather than the existing generic two-languages example',
    'MC-A-ANY-TWO-LANGUAGES-WITH-SIMILAR-SOUNDING-WORDS-MUST-BE-RELATED, second fresh example (a systematic consonant correspondence) forming the ladder\'s third rung',
  ],
)

const MORPHOLOGY_INTRO_ADULT = adultLadder(
  'eng.linguistics.morphology-intro',
  'MC-A-A-MORPHEME-IS-THE-SAME-THING-AS-A-SYLLABLE',
  'MC-B-ADDING-ANY-ENDING-TO-A-WORD-HAS-THE-SAME-KIND-OF-EFFECT-DERIVATIONAL-AND-INFLECTIONAL-ARE-THE-SAME',
  [
    {
      stem: 'A student is asked to identify the morphemes in "umbrella" and breaks it into its three syllables ("um," "brel," "la"), treating each syllable as a separate morpheme. Is breaking a word into syllables the right way to find its morphemes?',
      correct: 'No — "umbrella" has three syllables but is a single morpheme, since none of "um," "brel," or "la" carries independent meaning; syllable count and morpheme count are measuring genuinely different things',
      wrong: 'Yes — since morphemes are the meaningful building blocks of a word, breaking a word into its syllables is the correct way to identify each morpheme',
    },
    {
      stem: 'A student treats the "-able" in "washable" (turning the verb "wash" into the adjective "washable") and the "-ing" in "walking" (still a verb, just marking the ongoing action) as doing the same kind of job, since both are added endings. Do these two suffixes function the same way?',
      correct: 'No — "-able" is a derivational morpheme that changes the word\'s part of speech (verb to adjective), while "-ing" here is inflectional, marking grammatical information without changing the word\'s category; these are functionally different kinds of morphemes',
      wrong: 'Yes — any suffix added to the end of a word does the same kind of job regardless of whether it changes the word\'s part of speech or just adds grammatical information',
    },
    {
      stem: 'Revising their answer, the student instead identifies the morphemes in "dogs" as "dog" (the animal) and "-s" (the plural marker), correctly noting the word has one syllable but two morphemes. Has this revision correctly applied the meaning-based test for identifying morphemes?',
      correct: 'Yes — checking whether each piece carries its own separable meaning or grammatical function, rather than counting syllables, is exactly the correct test, and it correctly reveals two morphemes in a one-syllable word',
      wrong: 'No — since "dogs" is only one syllable, it should only be counted as one morpheme regardless of whether a smaller piece carries separate meaning',
    },
  ],
  [
    'MC-A-A-MORPHEME-IS-THE-SAME-THING-AS-A-SYLLABLE, fresh adult example ("umbrella") rather than the existing "banana" example',
    'MC-B-ADDING-ANY-ENDING-TO-A-WORD-HAS-THE-SAME-KIND-OF-EFFECT-DERIVATIONAL-AND-INFLECTIONAL-ARE-THE-SAME, fresh example ("washable" vs. "walking") rather than the existing "happiness"/"walked" example',
    'MC-A-A-MORPHEME-IS-THE-SAME-THING-AS-A-SYLLABLE, second fresh example ("dogs") forming the ladder\'s third rung',
  ],
)

const PHONOLOGY_INTRO_ADULT = adultLadder(
  'eng.linguistics.phonology-intro',
  'MC-A-PHONOLOGY-AND-PHONETICS-ARE-THE-SAME-THING',
  'MC-B-IF-TWO-SOUNDS-ARE-PHYSICALLY-DIFFERENT-THEY-MUST-BE-DIFFERENT-PHONEMES-IN-EVERY-LANGUAGE',
  [
    {
      stem: 'Asked "how is the \'k\' sound in \'kit\' physically different from the \'k\' sound in \'skit\'?" a student answers by describing airflow and aspiration. Is this a phonological question or a phonetic one?',
      correct: 'A phonetic question — it asks how the sounds are physically produced, which is a different question from whether English speakers treat the two as meaningfully different sounds (the phonological question)',
      wrong: 'A phonological question — asking about the physical properties of two sounds is the same as asking whether the sound difference is functionally meaningful within English',
    },
    {
      stem: 'A specific vowel-length distinction is physically measurable and real in both Language A and Language B, but only Language B\'s speakers use it to distinguish word meaning — in Language A, the two vowel lengths are heard as "the same sound." Does the physical reality of this difference in Language A mean it must be a distinct, meaningful phoneme there too?',
      correct: 'No — whether a physical sound difference counts as a meaningful phonemic distinction is decided by each language\'s own system, not by the physical difference alone; the same physical distinction can be phonemic in one language and non-meaningful in another',
      wrong: 'Yes — if a sound distinction is physically real and measurable, it must function as a distinct phoneme in every language where that physical difference occurs',
    },
    {
      stem: 'Revising their answer about "kit" and "skit," the student instead asks "does swapping these two k-sounds ever change a word\'s meaning in English?" to determine whether the distinction is phonological. Is this the correct test to apply?',
      correct: 'Yes — testing whether swapping a sound difference changes meaning is exactly the phonological question, separate from the phonetic question of how the sounds are physically produced',
      wrong: 'No — describing the physical airflow difference between the two k-sounds already fully answers whether the distinction is phonologically meaningful in English',
    },
  ],
  [
    'MC-A-PHONOLOGY-AND-PHONETICS-ARE-THE-SAME-THING, fresh adult example ("kit" vs. "skit") rather than the existing "pin" vs. "spin" example',
    'MC-B-IF-TWO-SOUNDS-ARE-PHYSICALLY-DIFFERENT-THEY-MUST-BE-DIFFERENT-PHONEMES-IN-EVERY-LANGUAGE, fresh example (a vowel-length distinction) rather than the existing Thai/Hindi aspirated-p example',
    'MC-A-PHONOLOGY-AND-PHONETICS-ARE-THE-SAME-THING, second fresh example (applying the swapping test to "kit"/"skit") forming the ladder\'s third rung',
  ],
)

const PRAGMATICS_INTRO_ADULT = adultLadder(
  'eng.linguistics.pragmatics-intro',
  'MC-A-WHAT-A-SPEAKER-LITERALLY-SAYS-IS-ALWAYS-EXACTLY-WHAT-THEY-MEAN',
  'MC-B-IMPLICATURE-MEANS-THE-SAME-AS-LITERAL-VAGUENESS-OR-JUST-BEING-UNCLEAR',
  [
    {
      stem: 'At a signing desk, someone asks a stranger "Do you have a pen?" Is the speaker actually just curious whether the stranger physically possesses a pen, or asking to borrow one?',
      correct: 'Asking to borrow one — this is a conventional indirect request; someone who literally answered "Yes, I have one" without offering it would not have satisfied what the speaker actually wanted',
      wrong: 'Just curious about possession — the literal, semantic question about whether the stranger has a pen is exactly and only what the speaker means by asking it',
    },
    {
      stem: 'Asked in an interview "Are you available to start Monday?", a candidate replies "I have a prior commitment through the end of next week." Did the candidate literally say "no," and is confidently inferring "no" from this response the same thing as the response being vague or unclear?',
      correct: 'No, the candidate didn\'t literally say "no" — but almost any listener would confidently and reliably infer it; this reliable inference is the opposite of vagueness, which is exactly what a genuine implicature is',
      wrong: 'Yes — since the candidate didn\'t literally answer the yes/no question, the response is inherently vague, and any inference drawn from it counts as just guessing at unclear communication',
    },
    {
      stem: 'Revising an analysis of the pen-borrowing exchange, a student notes that if the stranger interpreted the question purely literally and just said "yes" without handing over the pen, this would fail to satisfy the asker\'s actual communicative goal. Does this revised analysis correctly identify the gap between literal meaning and speaker intent?',
      correct: 'Yes — identifying that the literal, semantic answer would fail to satisfy what the speaker actually wanted is exactly what recognizing an indirect speech act requires',
      wrong: "No — since the stranger's literal answer would still be factually true, it doesn't matter whether it satisfies the speaker's actual communicative goal",
    },
  ],
  [
    'MC-A-WHAT-A-SPEAKER-LITERALLY-SAYS-IS-ALWAYS-EXACTLY-WHAT-THEY-MEAN, fresh adult example (asking to borrow a pen) rather than the existing "pass the salt" example',
    'MC-B-IMPLICATURE-MEANS-THE-SAME-AS-LITERAL-VAGUENESS-OR-JUST-BEING-UNCLEAR, fresh example (a job-interview availability exchange) rather than the existing party-invitation example',
    'MC-A-WHAT-A-SPEAKER-LITERALLY-SAYS-IS-ALWAYS-EXACTLY-WHAT-THEY-MEAN, second fresh example (analyzing the pen exchange) forming the ladder\'s third rung',
  ],
)

const PSYCHOLINGUISTICS_INTRO_ADULT = adultLadder(
  'eng.linguistics.psycholinguistics-intro',
  'MC-A-INTROSPECTION-SIMPLY-THINKING-ABOUT-HOW-LANGUAGE-FEELS-TO-USE-IS-A-RELIABLE-WAY-TO-STUDY-MENTAL-LANGUAGE-PROCESSES',
  'MC-B-SPEECH-ERRORS-SLIPS-OF-THE-TONGUE-ARE-JUST-RANDOM-NOISE-WITH-NO-SYSTEMATIC-PATTERN',
  [
    {
      stem: 'Recognizing a spoken word subjectively feels instantaneous to a listener, as if the whole word arrives in the mind at once. But reaction-time experiments show listeners begin narrowing down candidate words within milliseconds of hearing just the first sound, before the word is complete. Does introspection alone reveal this incremental process?',
      correct: 'No — introspection suggested the process was instantaneous, which conflicts with what controlled reaction-time experiments actually reveal; psycholinguists rely on experimental evidence precisely because introspection is unreliable about processes happening beneath conscious awareness',
      wrong: 'Yes — since word recognition subjectively feels instant to any listener, this subjective impression accurately reflects how the underlying mental process actually works',
    },
    {
      stem: 'Analyzing a set of documented word-blend errors ("smog" from "smoke" + "fog"), a researcher notices the blended words are consistently drawn from the same semantic category and grammatical class as each other, never randomly combining a noun with an unrelated verb. Does this consistent pattern suggest these blend errors are random noise?',
      correct: 'No — the consistent pattern (same category, same grammatical class) reveals a systematic constraint on how speech is planned; genuine randomness would not produce this level of consistency across many different blend errors',
      wrong: 'Yes — since blend errors involve accidentally combining two words instead of saying either one correctly, they are inherently random mistakes with no systematic pattern to analyze',
    },
    {
      stem: 'Instead of relying on how confident a speaker feels about why they made a specific slip of the tongue, a researcher designs a controlled experiment measuring the actual timing and pattern of many speakers\' errors. Is running the controlled experiment, rather than trusting speakers\' introspective reports, the correct methodological choice?',
      correct: 'Yes — controlled experimental evidence can reveal systematic processes that introspection alone cannot reliably access, which is exactly why psycholinguists favor this method over relying on subjective impressions',
      wrong: 'No — since speakers are the ones producing the errors, their own introspective sense of why they made a specific slip is already the most reliable source of evidence available',
    },
  ],
  [
    'MC-A-INTROSPECTION-SIMPLY-THINKING-ABOUT-HOW-LANGUAGE-FEELS-TO-USE-IS-A-RELIABLE-WAY-TO-STUDY-MENTAL-LANGUAGE-PROCESSES, fresh adult example (word recognition reaction-time experiments) rather than the existing generic reading-comprehension example',
    'MC-B-SPEECH-ERRORS-SLIPS-OF-THE-TONGUE-ARE-JUST-RANDOM-NOISE-WITH-NO-SYSTEMATIC-PATTERN, fresh example ("smog" word-blend errors) rather than the existing "tips of the slung" sound-swap example',
    'MC-A-INTROSPECTION-SIMPLY-THINKING-ABOUT-HOW-LANGUAGE-FEELS-TO-USE-IS-A-RELIABLE-WAY-TO-STUDY-MENTAL-LANGUAGE-PROCESSES, second fresh example (designing a controlled experiment) forming the ladder\'s third rung',
  ],
)

const SEMANTICS_INTRO_ADULT = adultLadder(
  'eng.linguistics.semantics-intro',
  'MC-A-WORD-MEANING-IS-A-SIMPLE-ONE-TO-ONE-LABEL-WITH-NO-INTERNAL-STRUCTURE-OR-RELATIONSHIPS',
  'MC-B-SENTENCE-MEANING-IS-JUST-THE-SUM-OF-INDIVIDUAL-WORD-MEANINGS-IN-ANY-ORDER',
  [
    {
      stem: 'A student is asked whether "salmon" and "fish" mean "the same thing" or have a systematic relationship. Testing "a salmon is always a fish" (true) against "a fish is always a salmon" (false), what does this asymmetric test reveal?',
      correct: 'It reveals a hyponymy relationship — "salmon" is a specific type within the broader category "fish," a systematic, testable relationship, not just two isolated, unrelated labels',
      wrong: 'It reveals nothing systematic — "salmon" and "fish" are simply two separate, unrelated words that happen to sometimes apply to the same animal, with no structured relationship between their meanings',
    },
    {
      stem: 'The sentence "The professor praised the student with the award" can mean either that the professor used the award to praise the student, or that the student who received the award was the one praised. Do these two meanings come from different words being used, or from the same words being structurally grouped differently?',
      correct: "From the same words grouped differently — the individual word meanings haven't changed at all; what changes is how the parts combine structurally, which is exactly why sentence meaning isn't simply a fixed sum of word meanings regardless of grouping",
      wrong: 'From different words being used — since the sentence has two possible meanings, the words themselves must be carrying two different sets of meanings depending on which interpretation is intended',
    },
    {
      stem: 'Testing "an oak is always a tree" (true) against "a tree is always an oak" (false) for a different word pair, a student concludes this same asymmetric pattern applies systematically beyond just the salmon/fish example. Is this generalization correct?',
      correct: 'Yes — the same "X is always a Y, but not vice versa" hyponymy test applies systematically across many word pairs, confirming that word meanings have real, structured, testable relationships rather than being isolated, unstructured labels',
      wrong: "No — the asymmetric test only happens to work for the salmon/fish pair by coincidence, so it shouldn't be expected to reveal a genuine relationship for any other word pair",
    },
  ],
  [
    'MC-A-WORD-MEANING-IS-A-SIMPLE-ONE-TO-ONE-LABEL-WITH-NO-INTERNAL-STRUCTURE-OR-RELATIONSHIPS, fresh adult example ("salmon"/"fish") rather than the existing "robin"/"bird" example',
    'MC-B-SENTENCE-MEANING-IS-JUST-THE-SUM-OF-INDIVIDUAL-WORD-MEANINGS-IN-ANY-ORDER, fresh example ("The professor praised the student with the award") rather than the existing telescope example',
    'MC-A-WORD-MEANING-IS-A-SIMPLE-ONE-TO-ONE-LABEL-WITH-NO-INTERNAL-STRUCTURE-OR-RELATIONSHIPS, second fresh example ("oak"/"tree") forming the ladder\'s third rung',
  ],
)

const SOCIOLINGUISTICS_INTRO_ADULT = adultLadder(
  'eng.linguistics.sociolinguistics-intro',
  'MC-A-LANGUAGE-VARIATION-IS-ONLY-ABOUT-GEOGRAPHIC-REGION-NOT-SOCIAL-FACTORS',
  'MC-B-CODE-SWITCHING-AND-REGISTER-SHIFTING-MEAN-A-SPEAKER-DOESNT-FULLY-KNOW-EITHER-VARIETY',
  [
    {
      stem: 'A researcher documents that within a single office, in the same city, younger employees and older employees systematically use a specific grammatical construction at different rates, even though everyone in the office shares the same regional background. Does this mean geography alone should be able to explain all systematic language variation?',
      correct: 'No — since these speakers share the same region yet still show a systematic difference, this reveals that social factors like age cohort can also drive systematic variation, independent of geography',
      wrong: 'Yes — since all these speakers are from the same region, any observed difference in their language use must actually reflect subtle sub-regional geographic differences within the office rather than a genuinely social factor',
    },
    {
      stem: 'A professional speaks in precise, formal language with clients but switches fluidly to casual, informal language with close colleagues, depending on who they\'re talking to. Does this shifting mean the professional doesn\'t fully know either the formal or the casual register?',
      correct: 'No — fluidly and appropriately shifting between registers based on context requires full competence in both registers plus the additional social skill of choosing the right one for the right audience; it demonstrates more skill, not less',
      wrong: "Yes — a speaker who uses different levels of formality depending on who they're talking to doesn't have solid command of either the formal or the casual way of speaking",
    },
    {
      stem: 'A researcher finds that within the same city, speakers who belong to a particular social-class group use a specific feature at a different rate than another social-class group in the same city, independent of any sub-regional difference. Does this confirm that social factors beyond geography systematically shape language variation?',
      correct: 'Yes — a systematic difference tied to social class within the very same region is exactly the kind of evidence that social factors, not just geography, produce real, patterned variation',
      wrong: 'No — any difference found among speakers technically located in the same city must ultimately trace back to some undetected geographic factor, since geography is the only real source of systematic variation',
    },
  ],
  [
    'MC-A-LANGUAGE-VARIATION-IS-ONLY-ABOUT-GEOGRAPHIC-REGION-NOT-SOCIAL-FACTORS, fresh adult example (an office age-cohort difference) rather than the existing generic same-city social-class example',
    'MC-B-CODE-SWITCHING-AND-REGISTER-SHIFTING-MEAN-A-SPEAKER-DOESNT-FULLY-KNOW-EITHER-VARIETY, fresh example (a professional shifting between client and colleague registers) rather than the existing bilingual-musician example',
    'MC-A-LANGUAGE-VARIATION-IS-ONLY-ABOUT-GEOGRAPHIC-REGION-NOT-SOCIAL-FACTORS, second fresh example (a social-class-based difference confirmed) forming the ladder\'s third rung',
  ],
)

const SYNTAX_THEORY_INTRO_ADULT = adultLadder(
  'eng.linguistics.syntax-theory-intro',
  'MC-A-SYNTAX-IS-JUST-SCHOOL-GRAMMAR-RULES-FOR-WRITING-CORRECTLY',
  'MC-B-A-GRAMMATICALLY-CORRECT-SENTENCE-MUST-ALSO-MAKE-SENSE-SYNTAX-AND-MEANING-ARE-THE-SAME-THING',
  [
    {
      stem: 'A toddler with no formal grammar instruction consistently says "the big red ball" and essentially never produces "ball the red big," even though no one ever explicitly taught the child a rule about adjective order. How does the child "know" not to produce the second version?',
      correct: 'The child has deep, automatic structural knowledge every fluent speaker develops without explicit teaching, the kind of unconscious knowledge linguistic syntax studies — not an explicitly taught, consciously followed style-guide rule',
      wrong: 'The child must have been explicitly taught adjective-order rules at some point, since knowledge like this can only come from direct instruction, the same way school grammar rules are taught',
    },
    {
      stem: 'The sentence "The idea whispered blue triangles" follows standard English word order and subject-verb agreement perfectly, but doesn\'t make logical sense (ideas can\'t whisper, and can\'t whisper triangles). Is this sentence ungrammatical because it\'s nonsensical?',
      correct: 'No — it is grammatically well-formed, following the structural rules of English sentence formation, while being semantically odd; syntax (structure) and semantics (meaning) are related but separate questions, and a sentence can pass the first test while failing the second',
      wrong: 'Yes — a sentence that doesn\'t make logical sense cannot be grammatically correct, since grammatical correctness and making sense are the same underlying property of a sentence',
    },
    {
      stem: 'A linguist studying a young child\'s spontaneous speech notes that the child never produces object-before-subject word order, despite never being taught a rule against it, and treats this as evidence of the child\'s own internalized structural knowledge, not evidence of good "grammar lessons." Is this the correct way to interpret the finding?',
      correct: 'Yes — documenting the automatic, untaught structural patterns every fluent speaker has, including young children, is exactly what linguistic syntax studies, as distinct from prescriptive school-grammar instruction',
      wrong: 'No — any correct word-order pattern a child consistently produces must reflect some grammar instruction the child received, even if no one can identify exactly when or how it was taught',
    },
  ],
  [
    'MC-A-SYNTAX-IS-JUST-SCHOOL-GRAMMAR-RULES-FOR-WRITING-CORRECTLY, fresh adult example (a toddler\'s adjective ordering) rather than the existing generic adjective-order example',
    'MC-B-A-GRAMMATICALLY-CORRECT-SENTENCE-MUST-ALSO-MAKE-SENSE-SYNTAX-AND-MEANING-ARE-THE-SAME-THING, fresh example ("The idea whispered blue triangles") rather than the existing "Colorless green ideas" example',
    'MC-A-SYNTAX-IS-JUST-SCHOOL-GRAMMAR-RULES-FOR-WRITING-CORRECTLY, second fresh example (a linguist analyzing a child\'s word order) forming the ladder\'s third rung',
  ],
)

const TRANSLATION_STUDIES_INTRO_ADULT = adultLadder(
  'eng.linguistics.translation-studies-intro',
  'MC-A-A-GOOD-TRANSLATION-IS-A-MECHANICAL-WORD-FOR-WORD-SUBSTITUTION-FROM-ONE-LANGUAGE-TO-ANOTHER',
  'MC-B-THERE-IS-ALWAYS-EXACTLY-ONE-CORRECT-TRANSLATION-FOR-A-GIVEN-PASSAGE-AND-ALL-OTHERS-ARE-WRONG',
  [
    {
      stem: 'Translating a business idiom word-for-word into English produces an awkward, confusing sentence that doesn\'t convey the original\'s intended meaning, while a meaning-focused rendering using different words captures the intended sense clearly. Which version actually conveys the original meaning more accurately to an English reader?',
      correct: 'The meaning-focused version — good translation requires conveying the same meaning and effect to a target-language reader, even when that requires departing from a literal, word-by-word match',
      wrong: 'The word-for-word version — an accurate translation should always replace each source-language word with its closest target-language equivalent, regardless of how the result reads',
    },
    {
      stem: 'Two published translations of the same proverb make different choices: one preserves the proverb\'s rhythm and wordplay at some cost to exact literal meaning, the other preserves exact literal meaning at some cost to rhythm. Is one of these translations simply wrong and the other right?',
      correct: 'No — both are legitimate responses to a genuine trade-off between competing priorities (rhythm versus literal precision); different translators can make different, equally defensible choices, and there is rarely exactly one correct translation independent of which priority is emphasized',
      wrong: 'Yes — for any given passage there is exactly one correct translation, so one of these two published versions must simply be a mistake',
    },
    {
      stem: 'Revising a mechanical, word-for-word translation of a second business idiom, a translator instead asks what effect the idiom has on a source-language reader and constructs an English rendering aimed at producing that same effect, even using entirely different words. Is this revision the right approach?',
      correct: 'Yes — asking whether a rendering conveys the same meaning and effect to a target-language reader, rather than matching words one-for-one, is exactly what good translation requires',
      wrong: 'No — since the translator abandoned matching the original words directly, this revision has moved further away from what makes a translation accurate',
    },
  ],
  [
    'MC-A-A-GOOD-TRANSLATION-IS-A-MECHANICAL-WORD-FOR-WORD-SUBSTITUTION-FROM-ONE-LANGUAGE-TO-ANOTHER, fresh adult example (a business idiom) rather than the existing generic idiomatic-expression example',
    'MC-B-THERE-IS-ALWAYS-EXACTLY-ONE-CORRECT-TRANSLATION-FOR-A-GIVEN-PASSAGE-AND-ALL-OTHERS-ARE-WRONG, fresh example (a proverb\'s rhythm vs. literal-meaning trade-off) rather than the existing generic poem example',
    'MC-A-A-GOOD-TRANSLATION-IS-A-MECHANICAL-WORD-FOR-WORD-SUBSTITUTION-FROM-ONE-LANGUAGE-TO-ANOTHER, second fresh example (revising a second idiom translation) forming the ladder\'s third rung',
  ],
)

const WHAT_IS_LINGUISTICS_ADULT = adultLadder(
  'eng.linguistics.what-is-linguistics',
  'MC-A-LINGUISTICS-IS-THE-STUDY-OF-CORRECT-GRAMMAR-RULES',
  'MC-B-LINGUISTICS-IS-JUST-ONE-SINGLE-SUBJECT-ABOUT-GRAMMAR',
  [
    {
      stem: 'A linguist studies why a specific bilingual community\'s English consistently uses a particular grammatical construction, documenting the pattern and its systematic use rather than telling community members to change how they speak. Is the linguist\'s research trying to correct the community\'s grammar, or trying to understand and document how their language actually works?',
      correct: 'Trying to understand and document how their language actually works — this is descriptive research, studying and explaining a real, systematic pattern, not prescriptive correction of "incorrect" grammar',
      wrong: 'Trying to correct the community\'s grammar — a linguist studying a "non-standard" grammatical pattern is, at its core, doing the same kind of work as a style guide correcting errors',
    },
    {
      stem: 'A university linguistics course includes units on how infants learn to distinguish speech sounds, how a specific sound has changed across centuries, and how teenagers in one city develop a distinct vocabulary from adults. Are these all just different versions of the same "grammar rules" topic?',
      correct: 'No — these are genuinely distinct subfields (phonetics/acquisition, historical linguistics, sociolinguistics) studying different aspects of language, not one narrow subject about grammar rules',
      wrong: 'Yes — since all of these topics involve language in some way, they are all fundamentally the same subject, just applied to slightly different examples of grammar',
    },
    {
      stem: 'A student, revising their understanding, sorts four research questions — why babies babble certain sounds first, why "ox" and "oxen" form an irregular plural, why a nonsense-but-grammatical sentence is possible, and why one social group\'s vocabulary differs from another\'s — into four different linguistic subfields rather than treating them as one topic. Has this revision correctly captured the discipline\'s actual scope?',
      correct: 'Yes — recognizing that these represent genuinely distinct branches (phonetics/acquisition, morphology, syntax/semantics, sociolinguistics) is exactly what understanding linguistics as a broad scientific discipline, not one narrow subject about grammar, requires',
      wrong: 'No — since all four questions are ultimately about "how language works," sorting them into different subfields adds an unnecessary layer of complexity to what is really one unified topic',
    },
  ],
  [
    'MC-A-LINGUISTICS-IS-THE-STUDY-OF-CORRECT-GRAMMAR-RULES, fresh adult example (a bilingual community\'s grammatical construction) rather than the existing generic regional-dialect example',
    'MC-B-LINGUISTICS-IS-JUST-ONE-SINGLE-SUBJECT-ABOUT-GRAMMAR, fresh example (a university course\'s three units) rather than the existing generic four-questions list',
    'MC-A-LINGUISTICS-IS-THE-STUDY-OF-CORRECT-GRAMMAR-RULES, second fresh example (sorting four research questions into subfields) forming the ladder\'s third rung',
  ],
)

export const ENGLISH_ADULT_BAND_BATCH_16: SeedProbe[] = [
  ...APPLIED_LINGUISTICS_INTRO_ADULT,
  ...BILINGUALISM_AND_MULTILINGUALISM_ADULT,
  ...COMPUTATIONAL_LINGUISTICS_INTRO_ADULT,
  ...CORPUS_LINGUISTICS_INTRO_ADULT,
  ...DIALECTOLOGY_ADULT,
  ...DISCOURSE_ANALYSIS_INTRO_ADULT,
  ...HISTORICAL_LINGUISTICS_INTRO_ADULT,
  ...LANGUAGE_ACQUISITION_INTRO_ADULT,
  ...LANGUAGE_FAMILIES_ADULT,
  ...MORPHOLOGY_INTRO_ADULT,
  ...PHONOLOGY_INTRO_ADULT,
  ...PRAGMATICS_INTRO_ADULT,
  ...PSYCHOLINGUISTICS_INTRO_ADULT,
  ...SEMANTICS_INTRO_ADULT,
  ...SOCIOLINGUISTICS_INTRO_ADULT,
  ...SYNTAX_THEORY_INTRO_ADULT,
  ...TRANSLATION_STUDIES_INTRO_ADULT,
  ...WHAT_IS_LINGUISTICS_ADULT,
]
