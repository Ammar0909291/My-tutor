/**
 * ENGLISH ADULT-BAND PROBE-CONTRACT CAMPAIGN — Batch 17.
 *
 * ── THE GAP THIS CLOSES ─────────────────────────────────────────────────────
 * Batch 16's live `contract-audit.ts --subject english --all` regeneration
 * surfaced 3 previously-unrecorded short `eng.grammar.*` pairs — colons-
 * semicolons-dashes, parallel-structure, sentence-combining — no prior
 * campaign entry had ever listed these as short. This batch closes all 3.
 * 3 new ADULT-band closed-choice probes each (9 total), the bare mastery-
 * gate contract (`correctAtCheck >= 1` + `correctAtPractice >= 2` = 3,
 * `assetContract.ts`). Remaining gap after this batch: `eng.literature.*`
 * (16 advanced), `eng.phonetics.*` (12 advanced), `eng.vocab.*` (9
 * advanced), `eng.writing.*` (9 advanced), `eng.reading.reading-across-
 * genres`, `eng.speaking.debate-skills`/`presentation-skills`, and the 2
 * EARLY-band phonics pairs excluded per Batch 13's own finding (voice-
 * required), deferred to future batches (see
 * `docs/history/subject-onboarding-and-fix-campaign.md`).
 *
 * Every distractor carries the `misconceptionId` naming it, reusing ONE of
 * each concept's own two ALREADY-REGISTERED, ALREADY-ACTIVE misconceptions
 * (verified against each concept's Blueprint Component 1 — Misconception
 * Register: all 3 concepts hold exactly MC-A and MC-B — no more, no fewer;
 * no new misconception ids invented, no Educational Brain authoring).
 * Structure mirrors `englishAdultBandBatch13.ts`'s `adultLadder` helper
 * exactly: `mcq`(FOUNDATIONAL) + `misconception_probe`(DEVELOPING) +
 * `mcq`(PROFICIENT) per concept, so the ladder-aware slug resolver
 * (`buildProbeSlugResolver`) disambiguates the two `mcq` rungs by difficulty
 * without re-identifying any already-serving row. None of these 3 concepts
 * hold any existing ADULT probe today, so this is a fresh singleton-to-
 * ladder promotion within this batch only — no P-10 collision risk against
 * any pre-existing row.
 *
 * Register: adult/workplace framing throughout (a report, a review, an
 * incident log) — never child-directed examples. Every worked example
 * below is deliberately DIFFERENT from the Blueprint's own Conflict
 * Evidence / Discrimination Pairs examples, so a learner who has met the
 * explanation is not simply asked to recall the identical example.
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

const COLONS_SEMICOLONS_DASHES_ADULT = adultLadder(
  'eng.grammar.colons-semicolons-dashes',
  'MC-A-A-COLON-CAN-BE-USED-AFTER-ANY-INTRODUCTORY-PHRASE-EVEN-IF-WHAT-COMES-BEFORE-ISNT-A-COMPLETE-SENTENCE',
  'MC-B-SEMICOLONS-AND-COMMAS-DO-THE-SAME-JOB-AND-CAN-BE-USED-INTERCHANGEABLY',
  [
    {
      stem: 'A report reads: "The tools we need are: a hammer, a level, and a drill." Does "the tools we need are" form a complete sentence on its own, making the colon correctly placed?',
      correct: 'No — "the tools we need are" is not a complete independent clause by itself, so the colon is misplaced here; a correct version would be "We need three tools: a hammer, a level, and a drill," where "we need three tools" stands alone as a complete sentence',
      wrong: "Yes — since the phrase clearly introduces a list, that's enough to justify placing a colon after it regardless of whether it forms a complete sentence on its own",
    },
    {
      stem: 'A travel itinerary reads: "Before the trip; pack your passport, charge your phone, and confirm the reservation." Does "before the trip" form a complete independent clause, and is the semicolon correctly used here?',
      correct: 'No — "before the trip" is not an independent clause, so the semicolon is misused; a comma is what belongs after an introductory phrase like this, since semicolons are reserved for joining two genuinely independent clauses',
      wrong: 'Yes — semicolons and commas do the same job of separating parts of a sentence, so a semicolon works just as well as a comma after an introductory phrase',
    },
    {
      stem: 'Revising the tools report to "We need three tools: a hammer, a level, and a drill," a writer confirms "we need three tools" reads as a complete sentence on its own before finalizing the colon placement. Is this the correct check to apply?',
      correct: 'Yes — checking whether everything before the colon forms a complete, standalone sentence is exactly the correct test for valid colon placement',
      wrong: "No — since the revised sentence still introduces the same list of three tools, checking whether the opening words form a complete sentence doesn't actually matter",
    },
  ],
  [
    'MC-A-A-COLON-CAN-BE-USED-AFTER-ANY-INTRODUCTORY-PHRASE-EVEN-IF-WHAT-COMES-BEFORE-ISNT-A-COMPLETE-SENTENCE, fresh adult example (a tools report) rather than the existing "favorite foods" example',
    'MC-B-SEMICOLONS-AND-COMMAS-DO-THE-SAME-JOB-AND-CAN-BE-USED-INTERCHANGEABLY, fresh example (a travel itinerary) rather than the existing "after the movie" example',
    'MC-A-A-COLON-CAN-BE-USED-AFTER-ANY-INTRODUCTORY-PHRASE-EVEN-IF-WHAT-COMES-BEFORE-ISNT-A-COMPLETE-SENTENCE, second fresh example (revising the tools report) forming the ladder\'s third rung',
  ],
)

const PARALLEL_STRUCTURE_ADULT = adultLadder(
  'eng.grammar.parallel-structure',
  'MC-A-PARALLEL-STRUCTURE-ONLY-APPLIES-TO-SIMPLE-LISTS-OF-SINGLE-WORDS',
  'MC-B-FIXING-A-PARALLEL-STRUCTURE-ERROR-JUST-MEANS-MAKING-THE-ITEMS-SOUND-SIMILAR',
  [
    {
      stem: 'A performance review states: "The manager\'s job is training staff, to handle complaints, and scheduling shifts." A reviewer only checks single-word lists for parallel structure and doesn\'t flag this sentence. Does the parallel-structure principle apply here even though the items are phrases, not single words?',
      correct: 'Yes — the same matching-forms principle applies to phrases as to single words; here a gerund ("training"), an infinitive ("to handle"), and another gerund ("scheduling") are mismatched, and the reviewer\'s check missed a genuine phrase-level violation',
      wrong: "No — parallel structure is a rule specifically for simple lists of single words, so a list made of phrases like these doesn't need to follow the same matching-forms principle",
    },
    {
      stem: 'Revising "The workshop will cover writing proposals, presenting data, and how to negotiate contracts," a writer changes it to "The workshop will cover writing proposals, presenting data, and negotiating to close contracts," believing the extra wording makes the three items sound more similar. Does this revision actually fix the parallel structure error?',
      correct: 'No — this only superficially adjusts wording without checking the actual grammatical form; the third item is still not a plain gerund matching "writing" and "presenting," so the structural mismatch remains despite sounding smoother',
      wrong: 'Yes — since all three items now use more similar-sounding phrasing, the sentence has been successfully fixed for parallel structure',
    },
    {
      stem: 'Revising the performance-review sentence to "The manager\'s job is training staff, handling complaints, and scheduling shifts," a writer confirms all three items are now gerunds, matching phrase form. Has this revision correctly applied the parallel-structure principle to a phrase-level list?',
      correct: 'Yes — recognizing that all three phrases must share the same grammatical form (here, all gerunds) is exactly the correct application of parallel structure beyond simple single-word lists',
      wrong: "No — since the sentence describes three different tasks regardless of phrasing, matching the grammatical form of the phrases doesn't actually affect whether the sentence is correct",
    },
  ],
  [
    'MC-A-PARALLEL-STRUCTURE-ONLY-APPLIES-TO-SIMPLE-LISTS-OF-SINGLE-WORDS, fresh adult example (a manager\'s job duties) rather than the existing "swimming, to run, and biking" example',
    'MC-B-FIXING-A-PARALLEL-STRUCTURE-ERROR-JUST-MEANS-MAKING-THE-ITEMS-SOUND-SIMILAR, fresh example (a workshop description) rather than the existing coach/team example',
    'MC-A-PARALLEL-STRUCTURE-ONLY-APPLIES-TO-SIMPLE-LISTS-OF-SINGLE-WORDS, second fresh example (revising the manager\'s job duties) forming the ladder\'s third rung',
  ],
)

const SENTENCE_COMBINING_ADULT = adultLadder(
  'eng.grammar.sentence-combining',
  'MC-A-COMBINING-SENTENCES-JUST-MEANS-ADDING-AND-BETWEEN-THEM',
  'MC-B-A-LONGER-COMBINED-SENTENCE-IS-ALWAYS-BETTER-THAN-SEVERAL-SHORT-ONES',
  [
    {
      stem: 'A report combines "The server crashed. Customers couldn\'t check out." into "The server crashed and customers couldn\'t check out." Does "and" show why customers couldn\'t check out, or does it just list two things that happened?',
      correct: 'It just lists two things that happened — "and" hides the actual cause-effect relationship; a version like "Because the server crashed, customers couldn\'t check out" would make the causal relationship explicit instead of just listing two events side by side',
      wrong: 'It already shows the cause-effect relationship clearly — combining two sentences with "and" is sufficient to convey that one event caused the other',
    },
    {
      stem: 'An incident report includes the sentences "The alarm sounded. Everyone froze. Then chaos." A reviewer combines them into one long sentence: "When the alarm sounded, everyone froze, and then there was chaos." Does combining these short sentences make the report stronger here?',
      correct: "No — the short, punchy sentences were creating deliberate tension and pacing at a dramatic moment in the report; combining them into one long sentence weakens that effect rather than improving it, since combining isn't always an improvement",
      wrong: 'Yes — a longer, combined sentence is always more sophisticated and effective than a series of short ones, so this combination is an improvement regardless of context',
    },
    {
      stem: 'Revising the server-crash report to "Because the server crashed, customers couldn\'t check out," a writer confirms this version explicitly shows the causal relationship the original "and" version had hidden. Is this the correct fix?',
      correct: 'Yes — choosing a subordinating conjunction that shows the actual relationship (here, cause-effect) between the two ideas, rather than defaulting to "and," is exactly what correct sentence combining requires',
      wrong: "No — since both versions combine the same two original sentences into one, switching from \"and\" to \"because\" doesn't actually change whether the combining was done correctly",
    },
  ],
  [
    'MC-A-COMBINING-SENTENCES-JUST-MEANS-ADDING-AND-BETWEEN-THEM, fresh adult example (a server-crash report) rather than the existing rain/went-inside example',
    'MC-B-A-LONGER-COMBINED-SENTENCE-IS-ALWAYS-BETTER-THAN-SEVERAL-SHORT-ONES, fresh example (an incident report\'s alarm sequence) rather than the existing "opened the door" example',
    'MC-A-COMBINING-SENTENCES-JUST-MEANS-ADDING-AND-BETWEEN-THEM, second fresh example (revising the server-crash report) forming the ladder\'s third rung',
  ],
)

export const ENGLISH_ADULT_BAND_BATCH_17: SeedProbe[] = [
  ...COLONS_SEMICOLONS_DASHES_ADULT,
  ...PARALLEL_STRUCTURE_ADULT,
  ...SENTENCE_COMBINING_ADULT,
]
