/**
 * BIOLOGY 91-CONCEPT KG-EXTENSION SEED CONTENT.
 *
 * WHY THIS FILE EXISTS. `scripts/assets/contract-audit.ts --subject biology`
 * measures 199 KG concepts, 108 with any seed content, 91 with ZERO — the
 * 2026-09-14 KG extension (`bio.behav`, `bio.neuro`, plus new leaf concepts
 * across most other domains) shipped a canonical KG entry and, as of
 * 2026-09-21, a complete Educational Brain entry for every one of the 91, but
 * NO production teaching content: no explanation, no gradeable probe, nothing
 * an `AssetIdentity` row could ever be created from. A learner reaching any
 * of these 91 concepts today receives no served explanation and no gradeable
 * assessment at all. Full audit, exact 91-concept enumeration, and the
 * architecture decision this file implements:
 * `docs/architecture/BIOLOGY_91_EXTENSION_ASSET_INVENTORY.md`.
 *
 * WHY A NEW FILE, NOT AN EXTENSION OF `biologySeedAssets.ts` OR
 * `biologyDepthSeedAssets.ts`. Every concept here opens brand-new
 * `(conceptId, probeKind, gradeBand)` slots from probe #1 — there is no
 * existing singleton row to avoid re-slugging (the exact reason
 * `biologyDepthSeedAssets.ts` had to route its third probe through the
 * unused `short_answer` kind). Following the same one-file-grown-by-batch
 * precedent `biologyDepthSeedAssets.ts` itself set, this file grows batch by
 * batch, each batch documented below, wired into `src/instrumentation.ts`
 * and `scripts/brain/seed-knowledge-assets.ts` exactly where
 * `BIOLOGY_EXPLANATIONS`/`BIOLOGY_PROBES`/`BIOLOGY_DEPTH_PROBES` already are.
 *
 * THE 3-PROBE FLOOR IS MET FROM THE FIRST COMMIT, NOT RETROFITTED. The
 * original 108 concepts shipped with only 2 gradeable probes each
 * (`mcq` + `misconception_probe`), a defect `biologyDepthSeedAssets.ts` had
 * to close later. Every concept authored here ships its full contract
 * (>= 1 explanation, >= 3 gradeable probes spanning genuinely different
 * capabilities — recognition, misconception-repair, and application/transfer
 * — not three redundant recognition items) in the same commit that first
 * seeds it, so this file never repeats that defect.
 *
 * SOURCE OF TRUTH FOR CONTENT. Every explanation and probe below is
 * transcribed from that concept's own completed Educational Brain entry
 * (`educational-brain/concepts/biology/<id>.md`) — its Core Understanding,
 * Misconceptions (M1/M2, each with its own stated Verification-of-death
 * criterion), and Analogies sections. No new biological claim is introduced
 * here that the concept's own EB entry does not already state.
 *
 * AUTHORING ORDER. Strict KG-prerequisite order (never alphabetical), the
 * same discipline the EB campaign itself used — each batch re-derives which
 * of the 91 have every prerequisite already served (either in the original
 * 108 or in an earlier batch of this same file) before selecting the next
 * batch's three concepts.
 *
 * ── BATCH LOG ───────────────────────────────────────────────────────────
 * Batch 1 (2026-09-21, 3 concepts): `bio.found.scientific-method-in-biology`,
 * `bio.found.unifying-themes-in-biology` (closing the `bio.found` domain's
 * entire gap — both concepts' prerequisites were already served by the
 * original 108), and `bio.behav.innate-behavior-instinct` (the root of the
 * `bio.behav` domain gap — its sole prerequisite, `bio.physio.nervous-
 * system`, is one of the original 108).
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedExplanation, SeedProbe } from './brainSeedAssets'

// ─── bio.found.scientific-method-in-biology ─────────────────────────────────
const SCIMETH = 'bio.found.scientific-method-in-biology'
const SCIMETH_SRC = 'educational-brain/concepts/biology/bio.found.scientific-method-in-biology.md'
const SCIMETH_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: SCIMETH, subjectSlug: 'biology', familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'The scientific method tests explanations against evidence rather than accepting or ' +
      'rejecting them by intuition or authority. An observation prompts a hypothesis (a ' +
      'specific, testable proposed explanation), tested via a controlled experiment: it ' +
      'deliberately varies exactly one factor (the independent variable) while holding all ' +
      'other relevant factors constant (control variables), measures the resulting effect ' +
      '(the dependent variable), and compares it against a control group that receives no ' +
      'intervention — isolating whether the independent variable, and not some uncontrolled ' +
      'factor, actually caused the effect. Because chance, small samples, and confounding ' +
      'factors can all produce a misleading result from one experiment, a finding is only ' +
      'provisionally trusted after independent replication (other researchers obtaining the ' +
      'same result) and peer review (independent expert scrutiny before publication) — not ' +
      'accepted at face value from a single study. A hypothesis found FALSE is not a failed ' +
      'experiment — it is a genuine, valuable result that narrows the space of possible ' +
      'explanations exactly as much as a confirmed hypothesis does, which is why hypotheses ' +
      'must be falsifiable (capable, in principle, of being shown wrong by evidence).',
    targetedMisconceptions: [],
    source: SCIMETH_SRC,
  },
  {
    conceptId: SCIMETH, subjectSlug: 'biology', familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      'Two words trip students up here. First, "theory": everyday English uses it for an ' +
      'unproven guess ("just a theory"), but science uses it for the OPPOSITE — a ' +
      'well-substantiated explanatory framework backed by extensive, independently-replicated ' +
      'evidence (cell theory, the theory of evolution). A "hypothesis" is the untested, ' +
      'single proposed explanation; a "theory" has already survived extensive testing. ' +
      'Second, students often treat a disconfirmed hypothesis as a failed experiment, because ' +
      'ordinary schoolwork rewards the "right" answer. But a well-CONTROLLED experiment that ' +
      'rules out a hypothesis is exactly as valuable as one that confirms it — for example, ' +
      'controlled experiments (sealed vs. open containers) that disproved spontaneous ' +
      'generation were genuinely important science, not a failure. Judge an experiment by its ' +
      'design and controls, never by which way the result happened to come out.',
    targetedMisconceptions: [`${SCIMETH}:M1`, `${SCIMETH}:M2`],
    source: SCIMETH_SRC,
  },
]
const SCIMETH_PROBES: SeedProbe[] = [
  {
    conceptId: SCIMETH, subjectSlug: 'biology', probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'A researcher tests whether a fertiliser increases plant growth by giving one group of ' +
      'identical plants the fertiliser and an otherwise-identical group none, keeping light, ' +
      'water, and soil the same for both. What is the independent variable?',
    choices: [
      { text: 'Whether the plant received the fertiliser', isCorrect: true },
      { text: 'The amount of plant growth measured', isCorrect: false, misconceptionId: `${SCIMETH}:M3` },
      { text: 'The amount of light given to each group', isCorrect: false },
      { text: 'The type of soil used', isCorrect: false },
    ],
    correctValue: 'Whether the plant received the fertiliser',
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    targetedMisconceptions: [],
    source: SCIMETH_SRC,
  },
  {
    conceptId: SCIMETH, subjectSlug: 'biology', probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'A student says "the theory of evolution is just a theory, so it is basically an ' +
      'unproven guess." What is the best response?',
    choices: [
      {
        text: 'Wrong — in science, "theory" means a well-substantiated framework backed by ' +
          'extensive evidence, not a guess; "hypothesis" is the word for an untested guess',
        isCorrect: true,
      },
      {
        text: 'Correct — a theory and a hypothesis mean the same level of confidence in science',
        isCorrect: false,
        misconceptionId: `${SCIMETH}:M1`,
      },
    ],
    correctValue: 'Wrong — in science, "theory" means a well-substantiated framework backed by ' +
      'extensive evidence, not a guess; "hypothesis" is the word for an untested guess',
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    targetedMisconceptions: [`${SCIMETH}:M1`],
    source: SCIMETH_SRC,
  },
  {
    conceptId: SCIMETH, subjectSlug: 'biology', probeKind: 'short_answer',
    gradeBand: GradeBand.HIGH,
    stem: 'A well-controlled experiment tests whether a new plant food increases growth. The ' +
      'hypothesis is disconfirmed — the plant food made no measurable difference. A student ' +
      'says the experiment "didn\'t work." What is the correct evaluation?',
    choices: [
      {
        text: 'The experiment worked and produced a valid, useful result — a well-designed ' +
          'test disconfirming a hypothesis is a genuine finding, not a failure',
        isCorrect: true,
      },
      {
        text: 'The experiment failed because the hypothesis turned out to be wrong',
        isCorrect: false,
        misconceptionId: `${SCIMETH}:M2`,
      },
      { text: 'The experiment is meaningless until a confirming result is found', isCorrect: false, misconceptionId: `${SCIMETH}:M2` },
    ],
    correctValue: 'The experiment worked and produced a valid, useful result — a well-designed ' +
      'test disconfirming a hypothesis is a genuine finding, not a failure',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${SCIMETH}:M2`],
    source: SCIMETH_SRC,
  },
]

// ─── bio.found.unifying-themes-in-biology ───────────────────────────────────
const UNITHEMES = 'bio.found.unifying-themes-in-biology'
const UNITHEMES_SRC = 'educational-brain/concepts/biology/bio.found.unifying-themes-in-biology.md'
const UNITHEMES_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: UNITHEMES, subjectSlug: 'biology', familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'Four themes recur across every branch and scale of biology, turning separate facts into ' +
      'one coherent discipline. (1) Structure-function relationship: a biological structure\'s ' +
      'form is shaped by, and explains, its function — from a single enzyme\'s active-site ' +
      'shape to an entire body plan. (2) Evolution as biology\'s central organising theory: ' +
      'every biological fact ultimately traces to descent with modification by natural ' +
      'selection — Dobzhansky\'s dictum, "nothing in biology makes sense except in the light ' +
      'of evolution," is more than a slogan. (3) Homeostasis: organisms actively maintain a ' +
      'relatively stable internal environment despite continuous external change — a dynamic, ' +
      'ongoing regulation process, not a fixed, unchanging state. (4) Energy flow and matter ' +
      'cycling: two DIFFERENT processes link organisms to their environment — energy flows ' +
      'ONE-WAY from the sun through producers to consumers and is ultimately lost as heat, ' +
      'while matter (carbon, nitrogen, and other elements) CYCLES indefinitely, reused again ' +
      'and again. These are not independent trivia — they are a small, recurring set of ' +
      'lenses for recognising the same organising patterns appearing again and again across ' +
      'biology\'s many branches.',
    targetedMisconceptions: [],
    source: UNITHEMES_SRC,
  },
  {
    conceptId: UNITHEMES, subjectSlug: 'biology', familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      'Students often treat the four unifying themes as four more names to memorise, reciting ' +
      'them fluently while being unable to supply a concrete example from material they have ' +
      'already studied. That misses the entire point: these are recurring LENSES to APPLY to ' +
      'new biological facts, not facts to recall in a list. Never assess the four themes in ' +
      'the abstract alone — always pair each theme with a demand for a concrete, already-' +
      'studied example: where did structure explain function in cell biology specifically? ' +
      'Where does energy flow one-way while matter cycles, in an ecosystem you have already ' +
      'studied? A learner who has genuinely internalised the themes can predict, before being ' +
      'taught a brand-new biology topic, which of the four themes will likely apply to it.',
    targetedMisconceptions: [`${UNITHEMES}:M1`],
    source: UNITHEMES_SRC,
  },
]
const UNITHEMES_PROBES: SeedProbe[] = [
  {
    conceptId: UNITHEMES, subjectSlug: 'biology', probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'Which statement correctly distinguishes energy flow from matter cycling in an ecosystem?',
    choices: [
      {
        text: 'Energy flows one-way from the sun through the ecosystem and is eventually lost ' +
          'as heat; matter (like carbon) cycles and is reused repeatedly',
        isCorrect: true,
      },
      { text: 'Both energy and matter cycle indefinitely through the ecosystem', isCorrect: false, misconceptionId: `${UNITHEMES}:M2` },
      { text: 'Both energy and matter flow one-way and are eventually lost from the ecosystem', isCorrect: false, misconceptionId: `${UNITHEMES}:M2` },
      { text: 'Matter flows one-way while energy cycles indefinitely', isCorrect: false, misconceptionId: `${UNITHEMES}:M2` },
    ],
    correctValue: 'Energy flows one-way from the sun through the ecosystem and is eventually lost ' +
      'as heat; matter (like carbon) cycles and is reused repeatedly',
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    targetedMisconceptions: [`${UNITHEMES}:M2`],
    source: UNITHEMES_SRC,
  },
  {
    conceptId: UNITHEMES, subjectSlug: 'biology', probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'A student can recite "structure-function, evolution, homeostasis, energy/matter" ' +
      'perfectly but cannot give a single example from biology they have already studied. Has ' +
      'this student mastered the unifying themes?',
    choices: [
      {
        text: 'No — the themes are lenses to apply to real biological facts, not a list to recite',
        isCorrect: true,
      },
      { text: 'Yes — knowing the four names is what mastery of this concept means', isCorrect: false, misconceptionId: `${UNITHEMES}:M1` },
    ],
    correctValue: 'No — the themes are lenses to apply to real biological facts, not a list to recite',
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    targetedMisconceptions: [`${UNITHEMES}:M1`],
    source: UNITHEMES_SRC,
  },
  {
    conceptId: UNITHEMES, subjectSlug: 'biology', probeKind: 'short_answer',
    gradeBand: GradeBand.HIGH,
    stem: 'A mitochondrion\'s inner membrane is folded into many cristae, dramatically increasing ' +
      'its surface area for energy-producing reactions. Which unifying theme does this best illustrate?',
    choices: [
      { text: 'Structure-function relationship', isCorrect: true },
      { text: 'Evolution as the central organising theory', isCorrect: false },
      { text: 'Homeostasis', isCorrect: false },
      { text: 'Energy flow and matter cycling', isCorrect: false },
    ],
    correctValue: 'Structure-function relationship',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [],
    source: UNITHEMES_SRC,
  },
]

// ─── bio.behav.innate-behavior-instinct ─────────────────────────────────────
const INNATEBEH = 'bio.behav.innate-behavior-instinct'
const INNATEBEH_SRC = 'educational-brain/concepts/biology/bio.behav.innate-behavior-instinct.md'
const INNATEBEH_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: INNATEBEH, subjectSlug: 'biology', familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'Fixed action patterns (FAPs) are stereotyped (performed the same way across individuals ' +
      'of a species) and largely unmodifiable behavioural sequences — once triggered, a FAP ' +
      'typically runs to completion in its characteristic form, largely independent of ongoing ' +
      'feedback. Critically, a FAP is NOT spontaneous: it requires a specific sign stimulus (a ' +
      'specific, often simple environmental cue) to release it — the sequence is performed only ' +
      'when that specific trigger is present. Innate behaviour must be further distinguished ' +
      'from simple reflexes: a reflex is a direct, typically single-muscle-group stimulus-' +
      'response (like the knee-jerk reflex) — simple, immediate, minimal neural processing. A ' +
      'fixed action pattern is substantially more complex, coordinated, and multi-step (like an ' +
      'elaborate courtship display or nest-building sequence) — many more coordinated movements ' +
      'over an extended time, though still triggered by a specific sign stimulus and still ' +
      'largely stereotyped once initiated. Innate behaviour also has a genetic basis: it is a ' +
      'heritable trait shaped by natural selection over evolutionary time, exactly as physical ' +
      'structures are — a FAP that reliably improves survival or reproduction can be favoured ' +
      'by selection and become a stable, species-typical trait.',
    targetedMisconceptions: [],
    source: INNATEBEH_SRC,
  },
  {
    conceptId: INNATEBEH, subjectSlug: 'biology', familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      'Two mistakes are common here. First, students often picture a fixed action pattern as ' +
      'happening spontaneously, out of nowhere — but a FAP always requires a specific sign ' +
      'stimulus to release it; without that trigger present, the behaviour does not occur. ' +
      'Second, students often lump reflexes and fixed action patterns together as "the same ' +
      'kind of automatic behaviour" — but a reflex is a simple, single, direct response (like a ' +
      'knee-jerk), while a fixed action pattern is a much more complex, coordinated, multi-step ' +
      'sequence (like a full courtship display). Both are innate and largely unmodifiable, but ' +
      'they sit at genuinely different levels of behavioural complexity — checking the specific ' +
      'trigger and the specific complexity level distinguishes them correctly.',
    targetedMisconceptions: [`${INNATEBEH}:M1`, `${INNATEBEH}:M2`],
    source: INNATEBEH_SRC,
  },
]
const INNATEBEH_PROBES: SeedProbe[] = [
  {
    conceptId: INNATEBEH, subjectSlug: 'biology', probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'What is the specific role of a "sign stimulus" in a fixed action pattern?',
    choices: [
      { text: 'It is the specific trigger required to release the pre-programmed behavioural sequence', isCorrect: true },
      { text: 'It is the reward the animal receives after completing the behaviour', isCorrect: false },
      { text: 'It is a random event with no specific relationship to the behaviour', isCorrect: false, misconceptionId: `${INNATEBEH}:M1` },
      { text: 'It is a signal the animal must be taught to recognise through experience', isCorrect: false },
    ],
    correctValue: 'It is the specific trigger required to release the pre-programmed behavioural sequence',
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    targetedMisconceptions: [`${INNATEBEH}:M1`],
    source: INNATEBEH_SRC,
  },
  {
    conceptId: INNATEBEH, subjectSlug: 'biology', probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'A student says "a reflex and a fixed action pattern are basically the same thing — ' +
      'both are just automatic innate behaviours." What is the best response?',
    choices: [
      {
        text: 'Wrong — a reflex is a simple, direct, single-response reaction, while a fixed ' +
          'action pattern is a far more complex, coordinated, multi-step sequence',
        isCorrect: true,
      },
      {
        text: 'Correct — reflexes and fixed action patterns work through the identical mechanism',
        isCorrect: false,
        misconceptionId: `${INNATEBEH}:M2`,
      },
    ],
    correctValue: 'Wrong — a reflex is a simple, direct, single-response reaction, while a fixed ' +
      'action pattern is a far more complex, coordinated, multi-step sequence',
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    targetedMisconceptions: [`${INNATEBEH}:M2`],
    source: INNATEBEH_SRC,
  },
  {
    conceptId: INNATEBEH, subjectSlug: 'biology', probeKind: 'short_answer',
    gradeBand: GradeBand.HIGH,
    stem: 'A bird performs an elaborate, multi-step courtship dance only when it sees a specific ' +
      'coloured patch on a potential mate\'s feathers, and the dance then runs through to ' +
      'completion once started. A different bird jerks its leg back the instant it touches ' +
      'something hot. Which is the fixed action pattern, and why?',
    choices: [
      {
        text: 'The courtship dance — it is a complex, multi-step sequence released by a ' +
          'specific sign stimulus (the coloured patch)',
        isCorrect: true,
      },
      { text: 'The leg-jerk reaction — any instant reaction counts as a fixed action pattern', isCorrect: false },
      { text: 'Both are fixed action patterns since both are innate and automatic', isCorrect: false, misconceptionId: `${INNATEBEH}:M2` },
      { text: 'Neither — both are learned behaviours acquired through experience', isCorrect: false },
    ],
    correctValue: 'The courtship dance — it is a complex, multi-step sequence released by a ' +
      'specific sign stimulus (the coloured patch)',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${INNATEBEH}:M2`],
    source: INNATEBEH_SRC,
  },
]

export const BIOLOGY_EXTENSION_EXPLANATIONS: SeedExplanation[] = [
  ...SCIMETH_EXPLANATIONS,
  ...UNITHEMES_EXPLANATIONS,
  ...INNATEBEH_EXPLANATIONS,
]

export const BIOLOGY_EXTENSION_PROBES: SeedProbe[] = [
  ...SCIMETH_PROBES,
  ...UNITHEMES_PROBES,
  ...INNATEBEH_PROBES,
]
