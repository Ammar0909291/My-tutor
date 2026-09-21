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
 * Batch 2 (2026-09-21, 3 concepts): `bio.behav.animal-communication` (now
 * ready — its sole prerequisite, batch 1's `bio.behav.innate-behavior-
 * instinct`, is served), `bio.neuro.brain-regional-organization` (the root
 * of the `bio.neuro` domain gap — opens five further concepts), and
 * `bio.div.animal-body-plans-symmetry` (the root of the `bio.div` domain
 * gap — opens `bio.div.invertebrate-diversity-major-phyla`).
 * Batch 3 (2026-09-21, 3 concepts): `bio.neuro.neurotransmitter-systems` and
 * `bio.neuro.sensory-transduction` (both further roots within `bio.neuro`,
 * requiring only `bio.physio.nervous-system` from the original 108; the
 * latter opens `bio.neuro.vision-visual-system` and
 * `bio.neuro.audition-vestibular-system`), and
 * `bio.div.invertebrate-diversity-major-phyla` (now ready — its sole
 * prerequisite, batch 2's `bio.div.animal-body-plans-symmetry`, is served;
 * opens `bio.div.arthropod-diversity` and
 * `bio.div.echinoderm-deuterostome-diversity`).
 * Batch 4 (2026-09-21, 3 concepts): `bio.neuro.neural-circuits-computation`
 * (now ready — both prerequisites, batch 3's `bio.neuro.neurotransmitter-
 * systems` and batch 2's `bio.neuro.brain-regional-organization`, are
 * served; opens `bio.neuro.learning-memory-neurobiology`),
 * `bio.neuro.vision-visual-system` (now ready — its sole prerequisite,
 * batch 3's `bio.neuro.sensory-transduction`, is served), and
 * `bio.div.arthropod-diversity` (now ready — its sole prerequisite,
 * batch 3's `bio.div.invertebrate-diversity-major-phyla`, is served).
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

// ─── bio.behav.animal-communication ─────────────────────────────────────────
const ANIMCOMM = 'bio.behav.animal-communication'
const ANIMCOMM_SRC = 'educational-brain/concepts/biology/bio.behav.animal-communication.md'
const ANIMCOMM_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: ANIMCOMM, subjectSlug: 'biology', familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'Animal communication uses several signal modalities, each with different transmission ' +
      'properties. Visual signals (displays, coloration, posture) transmit rapidly and can be ' +
      'highly detailed, but require a direct line of sight and only work over short distances. ' +
      'Auditory signals (calls, songs) travel farther, around obstacles, and work in the dark ' +
      'or dense vegetation where visual signals fail. Chemical (pheromone) signals persist over ' +
      'time and travel via air or water currents over long distances, but transmit information ' +
      'more slowly and with less precision. A signal\'s evolutionary stability as an honest ' +
      'indicator of quality is explained by the handicap principle: a signal\'s reliability ' +
      'comes specifically FROM its being costly to produce, not despite that cost. A genuinely ' +
      'high-quality individual can afford a substantial signalling cost while remaining in good ' +
      'condition; a lower-quality individual attempting the same costly signal would suffer ' +
      'real detriment — this differential cost-bearing capacity is precisely what keeps the ' +
      'signal honest, since cheating is simply not affordable for a low-quality individual. ' +
      'Communication serves varied functions across territorial (occupancy, deterring ' +
      'intrusion), social (coordinating group behaviour), and mating (communicating quality) ' +
      'contexts.',
    targetedMisconceptions: [],
    source: ANIMCOMM_SRC,
  },
  {
    conceptId: ANIMCOMM, subjectSlug: 'biology', familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      'Two mistakes are common. First, students often think a costly signal (like a peacock\'s ' +
      'tail) persists DESPITE its cost, as an unfortunate side effect — but the handicap ' +
      'principle says the cost IS the mechanism that keeps the signal honest: only a genuinely ' +
      'high-quality individual can afford to pay it without real detriment, so the cost itself ' +
      'prevents low-quality individuals from faking it. Second, students often treat visual, ' +
      'auditory, and chemical signals as interchangeable — but each has distinct transmission ' +
      'properties suited to different needs: visual is fast and detailed but needs a clear line ' +
      'of sight; auditory travels farther and works in darkness; chemical persists and travels ' +
      'far but is slower to interpret. Checking the specific trade-off a species needs explains ' +
      'why one modality is favoured over another.',
    targetedMisconceptions: [`${ANIMCOMM}:M1`, `${ANIMCOMM}:M2`],
    source: ANIMCOMM_SRC,
  },
]
const ANIMCOMM_PROBES: SeedProbe[] = [
  {
    conceptId: ANIMCOMM, subjectSlug: 'biology', probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'Which signal modality is best suited for a nocturnal animal living in dense vegetation?',
    choices: [
      { text: 'Auditory or chemical signals, since they do not require a direct line of sight', isCorrect: true },
      { text: 'Visual signals, since they transmit information the fastest', isCorrect: false, misconceptionId: `${ANIMCOMM}:M2` },
      { text: 'All three modalities work equally well in any habitat', isCorrect: false, misconceptionId: `${ANIMCOMM}:M2` },
      { text: 'None of the modalities would function in this habitat', isCorrect: false },
    ],
    correctValue: 'Auditory or chemical signals, since they do not require a direct line of sight',
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    targetedMisconceptions: [`${ANIMCOMM}:M2`],
    source: ANIMCOMM_SRC,
  },
  {
    conceptId: ANIMCOMM, subjectSlug: 'biology', probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'A student says "a peacock\'s costly tail persists in evolution despite its high cost, ' +
      'as a tolerated inefficiency." What is the best response?',
    choices: [
      {
        text: 'Wrong — the cost itself is what makes the signal honest, since only high-quality ' +
          'males can afford it without real detriment',
        isCorrect: true,
      },
      {
        text: 'Correct — the cost is an unfortunate side effect natural selection has not yet removed',
        isCorrect: false,
        misconceptionId: `${ANIMCOMM}:M1`,
      },
    ],
    correctValue: 'Wrong — the cost itself is what makes the signal honest, since only high-quality ' +
      'males can afford it without real detriment',
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    targetedMisconceptions: [`${ANIMCOMM}:M1`],
    source: ANIMCOMM_SRC,
  },
  {
    conceptId: ANIMCOMM, subjectSlug: 'biology', probeKind: 'short_answer',
    gradeBand: GradeBand.HIGH,
    stem: 'A costly signal suddenly becomes cheap for every individual in a population to ' +
      'produce. What happens to its reliability as an honest indicator of quality?',
    choices: [
      {
        text: 'It loses reliability, since low-quality individuals can now also afford to produce it',
        isCorrect: true,
      },
      { text: 'It stays equally reliable, since the signal itself has not changed', isCorrect: false, misconceptionId: `${ANIMCOMM}:M1` },
      { text: 'It becomes MORE reliable, since more individuals can now display it', isCorrect: false, misconceptionId: `${ANIMCOMM}:M1` },
    ],
    correctValue: 'It loses reliability, since low-quality individuals can now also afford to produce it',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${ANIMCOMM}:M1`],
    source: ANIMCOMM_SRC,
  },
]

// ─── bio.neuro.brain-regional-organization ──────────────────────────────────
const BRAINREG = 'bio.neuro.brain-regional-organization'
const BRAINREG_SRC = 'educational-brain/concepts/biology/bio.neuro.brain-regional-organization.md'
const BRAINREG_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: BRAINREG, subjectSlug: 'biology', familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'The brain can be organised by a broad developmental scheme into three major divisions. ' +
      'The forebrain includes the cerebral cortex, limbic system, and structures for higher ' +
      'cognition, sensory processing, and emotional regulation. The midbrain relays and ' +
      'processes visual/auditory reflexes and some movement coordination. The hindbrain ' +
      '(medulla, pons, cerebellum) governs vital autonomic functions (breathing, heart rate via ' +
      'the medulla) and movement coordination (via the cerebellum). Operating at a DIFFERENT ' +
      'structural scale, the cerebral cortex (part of the forebrain) is itself divided into ' +
      'four lobes: the frontal lobe (planning, decision-making, voluntary movement initiation), ' +
      'the parietal lobe (sensory integration, spatial processing), the temporal lobe (auditory ' +
      'processing, memory, language), and the occipital lobe (visual processing). The lobes are ' +
      'a further subdivision WITHIN the forebrain, not a competing classification. The limbic ' +
      'system (emotion and memory) is not one discrete structure — it is a functionally-defined ' +
      'set of interconnected structures (including the hippocampus and amygdala) spanning ' +
      'multiple brain regions, grouped by their shared functional role. The cerebellum ' +
      'specifically contributes to the fine coordination and timing of movement already ' +
      'initiated elsewhere (not initiation itself, a frontal-lobe function); the brainstem ' +
      'governs vital, largely automatic functions like breathing and heart rate.',
    targetedMisconceptions: [],
    source: BRAINREG_SRC,
  },
  {
    conceptId: BRAINREG, subjectSlug: 'biology', familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      'Two mistakes are common here. First, students often treat the forebrain/midbrain/' +
      'hindbrain scheme and the cortex\'s four lobes as competing classifications of the same ' +
      'structures — but the four lobes are a FURTHER subdivision specifically WITHIN the ' +
      'forebrain, at a finer scale, not a fourth parallel division. The frontal lobe belongs to ' +
      'BOTH schemes at once, at different zoom levels. Second, students often picture the ' +
      'limbic system as one single, compact structure like the cerebellum — but "limbic system" ' +
      'is a FUNCTIONAL grouping of interconnected structures (hippocampus, amygdala, and ' +
      'others) located in different brain regions, grouped because of their shared role in ' +
      'emotion and memory, not because they form one continuous anatomical unit.',
    targetedMisconceptions: [`${BRAINREG}:M1`, `${BRAINREG}:M2`],
    source: BRAINREG_SRC,
  },
]
const BRAINREG_PROBES: SeedProbe[] = [
  {
    conceptId: BRAINREG, subjectSlug: 'biology', probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'Is the frontal lobe part of the forebrain, or a separate division from it?',
    choices: [
      { text: 'Part of the forebrain — the four lobes are a finer subdivision within it', isCorrect: true },
      { text: 'A separate, fourth division alongside forebrain, midbrain, and hindbrain', isCorrect: false, misconceptionId: `${BRAINREG}:M1` },
      { text: 'Part of the hindbrain', isCorrect: false },
      { text: 'Part of the midbrain', isCorrect: false },
    ],
    correctValue: 'Part of the forebrain — the four lobes are a finer subdivision within it',
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    targetedMisconceptions: [`${BRAINREG}:M1`],
    source: BRAINREG_SRC,
  },
  {
    conceptId: BRAINREG, subjectSlug: 'biology', probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'A student says "the limbic system is one single, compact brain structure, just like ' +
      'the cerebellum." What is the best response?',
    choices: [
      {
        text: 'Wrong — the limbic system is a functionally-defined set of interconnected ' +
          'structures spanning multiple brain regions, not one compact structure',
        isCorrect: true,
      },
      {
        text: 'Correct — the limbic system is a single, self-contained anatomical structure',
        isCorrect: false,
        misconceptionId: `${BRAINREG}:M2`,
      },
    ],
    correctValue: 'Wrong — the limbic system is a functionally-defined set of interconnected ' +
      'structures spanning multiple brain regions, not one compact structure',
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    targetedMisconceptions: [`${BRAINREG}:M2`],
    source: BRAINREG_SRC,
  },
  {
    conceptId: BRAINREG, subjectSlug: 'biology', probeKind: 'short_answer',
    gradeBand: GradeBand.HIGH,
    stem: 'A patient has damage limited to the cerebellum but not the frontal lobe. Which is the ' +
      'more likely outcome?',
    choices: [
      {
        text: 'The patient can still initiate voluntary movements but has poor fine coordination and timing',
        isCorrect: true,
      },
      { text: 'The patient can no longer initiate any voluntary movement at all', isCorrect: false },
      { text: 'The patient loses the ability to breathe or regulate heart rate automatically', isCorrect: false },
    ],
    correctValue: 'The patient can still initiate voluntary movements but has poor fine coordination and timing',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [],
    source: BRAINREG_SRC,
  },
]

// ─── bio.div.animal-body-plans-symmetry ─────────────────────────────────────
const BODYPLAN = 'bio.div.animal-body-plans-symmetry'
const BODYPLAN_SRC = 'educational-brain/concepts/biology/bio.div.animal-body-plans-symmetry.md'
const BODYPLAN_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: BODYPLAN, subjectSlug: 'biology', familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'Radial symmetry (body parts arranged around a central axis) and bilateral symmetry (one ' +
      'plane divides the body into mirror-image halves) are organisational strategies with ' +
      'different functional implications, not arbitrary shapes. Radial symmetry suits sessile ' +
      'or slow-moving organisms encountering their environment from any direction equally ' +
      '(many cnidarians). Bilateral symmetry is strongly associated with cephalisation ' +
      '(concentrating sensory organs and a nervous-system control centre at one end, forming a ' +
      'head) and directional movement — a leading end benefits from concentrated sensory ' +
      'detection. Diploblastic organisms develop from two germ layers (ectoderm, endoderm); ' +
      'triploblastic organisms develop from three (adding mesoderm), which enables more complex ' +
      'internal structures (muscles, circulatory systems, body cavities). Among triploblastic ' +
      'animals: acoelomates have no significant body cavity; pseudocoelomates have a cavity ' +
      'only partially lined by mesoderm; coelomates have a true coelom fully lined by mesoderm, ' +
      'giving organs more room to develop and move independently. Protostome versus ' +
      'deuterostome development marks a deep phylogenetic split defined by the fate of the ' +
      'blastopore (the first opening formed in gastrulation): in protostomes it becomes the ' +
      'mouth; in deuterostomes it becomes the anus, with the mouth forming separately.',
    targetedMisconceptions: [],
    source: BODYPLAN_SRC,
  },
  {
    conceptId: BODYPLAN, subjectSlug: 'biology', familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      'Two mistakes are common. First, students treat radial and bilateral symmetry as arbitrary ' +
      'shape labels rather than connecting each to its functional consequence: bilateral ' +
      'symmetry correlates with cephalisation and directional movement; radial symmetry suits ' +
      'organisms with no functional "front." Second, students treat protostome/deuterostome as ' +
      'an arbitrary classification label rather than a specific, observable embryonic event — ' +
      'the fate of the blastopore. Tracing that specific developmental fact (does the first ' +
      'opening become the mouth or the anus?) is what actually determines the classification, ' +
      'not a vague impression.',
    targetedMisconceptions: [`${BODYPLAN}:M1`, `${BODYPLAN}:M2`],
    source: BODYPLAN_SRC,
  },
]
const BODYPLAN_PROBES: SeedProbe[] = [
  {
    conceptId: BODYPLAN, subjectSlug: 'biology', probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'Which body-cavity type describes an animal whose body cavity is completely lined by mesoderm?',
    choices: [
      { text: 'Coelomate', isCorrect: true },
      { text: 'Pseudocoelomate', isCorrect: false },
      { text: 'Acoelomate', isCorrect: false },
      { text: 'Diploblastic', isCorrect: false },
    ],
    correctValue: 'Coelomate',
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    targetedMisconceptions: [],
    source: BODYPLAN_SRC,
  },
  {
    conceptId: BODYPLAN, subjectSlug: 'biology', probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'A student says "protostome and deuterostome are just arbitrary labels — there\'s no ' +
      'specific fact behind the classification." What is the best response?',
    choices: [
      {
        text: 'Wrong — the classification is based on a specific embryonic event: the fate of ' +
          'the blastopore (mouth in protostomes, anus in deuterostomes)',
        isCorrect: true,
      },
      { text: 'Correct — the labels are assigned without a specific defining criterion', isCorrect: false, misconceptionId: `${BODYPLAN}:M2` },
    ],
    correctValue: 'Wrong — the classification is based on a specific embryonic event: the fate of ' +
      'the blastopore (mouth in protostomes, anus in deuterostomes)',
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    targetedMisconceptions: [`${BODYPLAN}:M2`],
    source: BODYPLAN_SRC,
  },
  {
    conceptId: BODYPLAN, subjectSlug: 'biology', probeKind: 'short_answer',
    gradeBand: GradeBand.HIGH,
    stem: 'A sessile marine animal encounters food and threats equally from every direction. ' +
      'Which symmetry type would be functionally favoured, and why?',
    choices: [
      {
        text: 'Radial symmetry — there is no functional advantage to a "front" end when threats ' +
          'and food come from every direction equally',
        isCorrect: true,
      },
      { text: 'Bilateral symmetry — cephalisation always improves survival regardless of lifestyle', isCorrect: false, misconceptionId: `${BODYPLAN}:M1` },
      { text: 'Neither symmetry type has any functional consequence', isCorrect: false, misconceptionId: `${BODYPLAN}:M1` },
    ],
    correctValue: 'Radial symmetry — there is no functional advantage to a "front" end when threats ' +
      'and food come from every direction equally',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${BODYPLAN}:M1`],
    source: BODYPLAN_SRC,
  },
]

// ─── bio.neuro.neurotransmitter-systems ─────────────────────────────────────
const NEUROTRANS = 'bio.neuro.neurotransmitter-systems'
const NEUROTRANS_SRC = 'educational-brain/concepts/biology/bio.neuro.neurotransmitter-systems.md'
const NEUROTRANS_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: NEUROTRANS, subjectSlug: 'biology', familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'Neurotransmitters are chemical messengers released at a synapse. Glutamate and GABA are ' +
      'the principal excitatory/inhibitory pair in the central nervous system: glutamate ' +
      'typically depolarises the postsynaptic neuron (excitatory), while GABA typically ' +
      'hyperpolarises or stabilises it (inhibitory). Dopamine (reward, movement), serotonin ' +
      '(mood, appetite, sleep), acetylcholine (neuromuscular signalling, attention, memory), ' +
      'and norepinephrine (arousal, fight-or-flight) play specialised roles. A critical point: ' +
      'whether a neurotransmitter\'s effect is excitatory or inhibitory is determined ' +
      'SPECIFICALLY by the RECEPTOR it binds on the postsynaptic neuron, not by a fixed ' +
      'property of the molecule itself. Ionotropic receptors are themselves ligand-gated ion ' +
      'channels — binding directly and immediately opens the channel, producing a FAST ' +
      'electrical response. Metabotropic receptors are not ion channels — binding activates a ' +
      'G-protein triggering an intracellular second-messenger cascade, which is SLOWER but can ' +
      'produce more prolonged, widespread effects. Synaptic signalling must be actively ' +
      'terminated — via reuptake (the presynaptic neuron transports the neurotransmitter back ' +
      'into itself) or enzymatic degradation (an enzyme breaks the molecule down) — it does not ' +
      'simply fade away passively.',
    targetedMisconceptions: [],
    source: NEUROTRANS_SRC,
  },
  {
    conceptId: NEUROTRANS, subjectSlug: 'biology', familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      'Two mistakes are common. First, students treat a neurotransmitter like glutamate or GABA ' +
      'as INTRINSICALLY excitatory or inhibitory, as a fixed chemical property — but the effect ' +
      'is determined by which RECEPTOR it binds; glutamate is only "typically" excitatory ' +
      'because of its most common receptor partners, not because excitation is built into the ' +
      'molecule itself. Second, students assume a synaptic signal fades away passively over ' +
      'time, like a scent dissipating — but synapses require an ACTIVE "off switch" (reuptake ' +
      'or enzymatic degradation); without one of these active processes, the neurotransmitter ' +
      'would keep acting on its receptor indefinitely. An SSRI, for example, blocks serotonin ' +
      'reuptake specifically, which PROLONGS serotonin\'s effect rather than leaving it unchanged.',
    targetedMisconceptions: [`${NEUROTRANS}:M1`, `${NEUROTRANS}:M2`],
    source: NEUROTRANS_SRC,
  },
]
const NEUROTRANS_PROBES: SeedProbe[] = [
  {
    conceptId: NEUROTRANS, subjectSlug: 'biology', probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'Which receptor mechanism directly and immediately opens an ion channel upon neurotransmitter binding?',
    choices: [
      { text: 'Ionotropic receptors', isCorrect: true },
      { text: 'Metabotropic receptors', isCorrect: false },
      { text: 'Both mechanisms open channels equally fast', isCorrect: false },
      { text: 'Neither mechanism involves ion channels', isCorrect: false },
    ],
    correctValue: 'Ionotropic receptors',
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    targetedMisconceptions: [],
    source: NEUROTRANS_SRC,
  },
  {
    conceptId: NEUROTRANS, subjectSlug: 'biology', probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'A student says "glutamate is always excitatory — that\'s just a fixed property of the ' +
      'molecule." What is the best response?',
    choices: [
      {
        text: 'Wrong — the excitatory or inhibitory effect depends on which receptor the ' +
          'neurotransmitter binds, not a fixed molecular property',
        isCorrect: true,
      },
      {
        text: 'Correct — every neurotransmitter has one fixed effect regardless of receptor',
        isCorrect: false,
        misconceptionId: `${NEUROTRANS}:M1`,
      },
    ],
    correctValue: 'Wrong — the excitatory or inhibitory effect depends on which receptor the ' +
      'neurotransmitter binds, not a fixed molecular property',
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    targetedMisconceptions: [`${NEUROTRANS}:M1`],
    source: NEUROTRANS_SRC,
  },
  {
    conceptId: NEUROTRANS, subjectSlug: 'biology', probeKind: 'short_answer',
    gradeBand: GradeBand.HIGH,
    stem: 'An SSRI drug specifically blocks serotonin reuptake at the synapse. What effect would ' +
      'you predict on serotonin\'s activity in the synapse?',
    choices: [
      { text: 'Serotonin\'s effect would be prolonged, since normal clearance is blocked', isCorrect: true },
      { text: 'No change, since clearance happens passively regardless of reuptake', isCorrect: false, misconceptionId: `${NEUROTRANS}:M2` },
      { text: 'Serotonin\'s effect would end sooner than normal', isCorrect: false },
    ],
    correctValue: 'Serotonin\'s effect would be prolonged, since normal clearance is blocked',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${NEUROTRANS}:M2`],
    source: NEUROTRANS_SRC,
  },
]

// ─── bio.neuro.sensory-transduction ──────────────────────────────────────────
const SENSTRANS = 'bio.neuro.sensory-transduction'
const SENSTRANS_SRC = 'educational-brain/concepts/biology/bio.neuro.sensory-transduction.md'
const SENSTRANS_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: SENSTRANS, subjectSlug: 'biology', familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'Sensory transduction is the process by which a receptor cell converts a physical or ' +
      'chemical stimulus into an electrical signal — specifically a GRADED receptor potential ' +
      '(a local voltage change whose SIZE varies continuously with stimulus strength), rather ' +
      'than directly producing an all-or-nothing action potential. Four major receptor ' +
      'categories cover most sensory transduction: photoreceptors (light), mechanoreceptors ' +
      '(pressure, stretch, vibration), chemoreceptors (specific chemicals), and thermoreceptors ' +
      '(temperature) — despite different physical stimuli, all convert their input into a graded ' +
      'membrane-potential change. Sensory adaptation is a genuine, functional REDUCTION in a ' +
      'receptor\'s responsiveness to a CONSTANT stimulus over time — not a malfunction, but a ' +
      'useful feature that prioritises detecting CHANGES over continuously signalling an ' +
      'unchanging background. Stimulus intensity is coded specifically by action-potential ' +
      'FREQUENCY (more spikes per second for a stronger stimulus) — NOT by the size of any ' +
      'individual action potential, since action potentials are fixed-size, all-or-nothing ' +
      'events once triggered.',
    targetedMisconceptions: [],
    source: SENSTRANS_SRC,
  },
  {
    conceptId: SENSTRANS, subjectSlug: 'biology', familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      'Two mistakes are common. First, students think sensory adaptation means the receptor is ' +
      'wearing out or failing under sustained stimulation — but it is a genuinely USEFUL, ' +
      'adaptive feature (like no longer feeling clothing against your skin after putting it on) ' +
      'that shifts sensory priority toward detecting CHANGE rather than restating an unchanging ' +
      'condition. Second, students assume a stronger stimulus produces a LARGER individual ' +
      'action potential — but action potentials are fixed-size, all-or-nothing events; a ' +
      'stronger stimulus instead produces a HIGHER FREQUENCY of firing (more spikes per second), ' +
      'which is how intensity is actually coded.',
    targetedMisconceptions: [`${SENSTRANS}:M2`, `${SENSTRANS}:M1`],
    source: SENSTRANS_SRC,
  },
]
const SENSTRANS_PROBES: SeedProbe[] = [
  {
    conceptId: SENSTRANS, subjectSlug: 'biology', probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'What specifically codes for a stronger sensory stimulus in a sensory neuron?',
    choices: [
      { text: 'A higher frequency of action potentials (more spikes per second)', isCorrect: true },
      { text: 'A larger individual action potential', isCorrect: false, misconceptionId: `${SENSTRANS}:M1` },
      { text: 'A longer-duration single action potential', isCorrect: false, misconceptionId: `${SENSTRANS}:M1` },
      { text: 'A change in the resting membrane potential only', isCorrect: false },
    ],
    correctValue: 'A higher frequency of action potentials (more spikes per second)',
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    targetedMisconceptions: [`${SENSTRANS}:M1`],
    source: SENSTRANS_SRC,
  },
  {
    conceptId: SENSTRANS, subjectSlug: 'biology', probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'A student says "sensory adaptation means the receptor is wearing out or failing under ' +
      'constant stimulation." What is the best response?',
    choices: [
      {
        text: 'Wrong — adaptation is a genuine, useful feature that prioritises detecting ' +
          'changes over restating an unchanging condition, not a malfunction',
        isCorrect: true,
      },
      {
        text: 'Correct — sustained stimulation genuinely damages or exhausts the receptor',
        isCorrect: false,
        misconceptionId: `${SENSTRANS}:M2`,
      },
    ],
    correctValue: 'Wrong — adaptation is a genuine, useful feature that prioritises detecting ' +
      'changes over restating an unchanging condition, not a malfunction',
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    targetedMisconceptions: [`${SENSTRANS}:M2`],
    source: SENSTRANS_SRC,
  },
  {
    conceptId: SENSTRANS, subjectSlug: 'biology', probeKind: 'short_answer',
    gradeBand: GradeBand.HIGH,
    stem: 'A stimulus is converted into a receptor potential whose size varies continuously with ' +
      'stimulus strength. Is this receptor potential itself an action potential?',
    choices: [
      {
        text: 'No — it is a graded signal that must separately reach threshold to trigger actual action potentials',
        isCorrect: true,
      },
      { text: 'Yes — a receptor potential and an action potential are the same thing', isCorrect: false },
      { text: 'No — receptor potentials never lead to action potentials at all', isCorrect: false },
    ],
    correctValue: 'No — it is a graded signal that must separately reach threshold to trigger actual action potentials',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [],
    source: SENSTRANS_SRC,
  },
]

// ─── bio.div.invertebrate-diversity-major-phyla ─────────────────────────────
const INVERTDIV = 'bio.div.invertebrate-diversity-major-phyla'
const INVERTDIV_SRC = 'educational-brain/concepts/biology/bio.div.invertebrate-diversity-major-phyla.md'
const INVERTDIV_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: INVERTDIV, subjectSlug: 'biology', familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'Each major invertebrate phylum is defined by a specific combination of body-plan ' +
      'features, applying the symmetry/germ-layer/body-cavity criteria already covered. ' +
      'Porifera (sponges) show cellular-grade organisation — their cells show some ' +
      'specialisation but are NOT organised into true tissues, the single most distinguishing ' +
      'feature separating them from every other phylum here. Cnidaria (jellyfish, corals, sea ' +
      'anemones) show radial symmetry and a distinctive stinging cell structure, the nematocyst, ' +
      'used for prey capture and defense. Platyhelminthes (flatworms) are triploblastic and ' +
      'acoelomate — their flattened shape is a functional consequence of having no circulatory ' +
      'system, so nutrients/gases must diffuse across the body. Nematoda (roundworms) are ' +
      'pseudocoelomate. Annelida (segmented worms) show true body segmentation combined with a ' +
      'full coelom. Mollusca (snails, bivalves, cephalopods) shows the widest body-plan diversity ' +
      'of any phylum here, but most molluscs share a common underlying architecture — a muscular ' +
      'foot, a visceral mass, and a mantle — despite dramatically different external appearance.',
    targetedMisconceptions: [],
    source: INVERTDIV_SRC,
  },
  {
    conceptId: INVERTDIV, subjectSlug: 'biology', familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      'Two mistakes are common. First, students memorise phylum names as an unconnected list ' +
      'rather than systematically checking symmetry, germ layers, body cavity type, and the ' +
      'phylum\'s own unique defining feature (nematocysts for Cnidaria, segmentation for ' +
      'Annelida, cellular-grade organisation for Porifera) — this checklist, not memorised ' +
      'examples, is what lets you classify an unfamiliar organism. Second, students assume ' +
      'Mollusca\'s extreme external diversity (a snail versus an octopus) means the phylum has ' +
      'no real unifying feature — but most molluscs share the same underlying foot/visceral-' +
      'mass/mantle architecture beneath the superficially different external forms.',
    targetedMisconceptions: [`${INVERTDIV}:M1`, `${INVERTDIV}:M2`],
    source: INVERTDIV_SRC,
  },
]
const INVERTDIV_PROBES: SeedProbe[] = [
  {
    conceptId: INVERTDIV, subjectSlug: 'biology', probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'Which specific feature distinguishes Porifera (sponges) from every other invertebrate phylum here?',
    choices: [
      { text: 'Cellular-grade organisation — cells are specialised but not organised into true tissues', isCorrect: true },
      { text: 'Radial symmetry and nematocysts', isCorrect: false },
      { text: 'True body segmentation', isCorrect: false },
      { text: 'A pseudocoelom', isCorrect: false },
    ],
    correctValue: 'Cellular-grade organisation — cells are specialised but not organised into true tissues',
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    targetedMisconceptions: [],
    source: INVERTDIV_SRC,
  },
  {
    conceptId: INVERTDIV, subjectSlug: 'biology', probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'A student says "molluscs are too different from each other (snails versus octopuses) ' +
      'to share any real unifying feature." What is the best response?',
    choices: [
      {
        text: 'Wrong — most molluscs share the same underlying foot/visceral-mass/mantle ' +
          'architecture beneath very different external forms',
        isCorrect: true,
      },
      {
        text: 'Correct — Mollusca is classified purely by superficial similarity with no real shared feature',
        isCorrect: false,
        misconceptionId: `${INVERTDIV}:M2`,
      },
    ],
    correctValue: 'Wrong — most molluscs share the same underlying foot/visceral-mass/mantle ' +
      'architecture beneath very different external forms',
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    targetedMisconceptions: [`${INVERTDIV}:M2`],
    source: INVERTDIV_SRC,
  },
  {
    conceptId: INVERTDIV, subjectSlug: 'biology', probeKind: 'short_answer',
    gradeBand: GradeBand.HIGH,
    stem: 'An unfamiliar marine animal shows radial symmetry and has specialised stinging cells ' +
      'used to capture prey. Which phylum does it most likely belong to?',
    choices: [
      { text: 'Cnidaria', isCorrect: true },
      { text: 'Porifera', isCorrect: false },
      { text: 'Platyhelminthes', isCorrect: false },
      { text: 'Annelida', isCorrect: false },
    ],
    correctValue: 'Cnidaria',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${INVERTDIV}:M1`],
    source: INVERTDIV_SRC,
  },
]

// ─── bio.neuro.neural-circuits-computation ──────────────────────────────────
const NEURCIRC = 'bio.neuro.neural-circuits-computation'
const NEURCIRC_SRC = 'educational-brain/concepts/biology/bio.neuro.neural-circuits-computation.md'
const NEURCIRC_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: NEURCIRC, subjectSlug: 'biology', familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'Neural circuits combine excitatory and inhibitory connections into recurring structural ' +
      'motifs that perform specific computations — inhibition is an ACTIVE, shaping element, ' +
      'not merely a brake. In feedforward inhibition, excitatory input activates a target ' +
      'neuron directly AND activates an inhibitory interneuron that also synapses onto that ' +
      'target; because the inhibitory path involves an extra relay, inhibition arrives slightly ' +
      'AFTER excitation, sharpening the TIMING precision of the response. In lateral ' +
      'inhibition, an active neuron inhibits its NEIGHBOURS, sharpening spatial CONTRAST — the ' +
      'mechanism behind sensory edge-enhancement. Neurons can represent information via two ' +
      'strategies: rate coding (information carried in overall FIRING RATE) and temporal ' +
      'coding (information carried in the precise TIMING or pattern of spikes) — two spike ' +
      'trains with identical average rate can carry different information under temporal ' +
      'coding. Central pattern generators (CPGs) produce rhythmic output (like walking) from ' +
      'the circuit\'s OWN internal connectivity, without requiring rhythmic input signals — the ' +
      'rhythm is an emergent property of the circuit, continuing even when isolated from ' +
      'sensory feedback.',
    targetedMisconceptions: [],
    source: NEURCIRC_SRC,
  },
  {
    conceptId: NEURCIRC, subjectSlug: 'biology', familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      'Two mistakes are common. First, students treat inhibition as simply "turning a neuron ' +
      'off," missing that feedforward inhibition sharpens response TIMING and lateral ' +
      'inhibition sharpens spatial CONTRAST — inhibition actively shapes computation rather ' +
      'than just silencing signals. Second, students assume firing rate is the ONLY way ' +
      'neurons represent information — but temporal coding means two spike trains with the ' +
      'SAME average rate can carry DIFFERENT information if their precise timing differs, ' +
      'which rate coding alone would discard.',
    targetedMisconceptions: [`${NEURCIRC}:M1`, `${NEURCIRC}:M2`],
    source: NEURCIRC_SRC,
  },
]
const NEURCIRC_PROBES: SeedProbe[] = [
  {
    conceptId: NEURCIRC, subjectSlug: 'biology', probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'What SPECIFIC computation does lateral inhibition perform?',
    choices: [
      { text: 'It sharpens spatial contrast between an active signal and its neighbours', isCorrect: true },
      { text: 'It simply reduces overall firing everywhere equally', isCorrect: false, misconceptionId: `${NEURCIRC}:M1` },
      { text: 'It sharpens the timing precision of a single response', isCorrect: false },
      { text: 'It has no measurable computational effect', isCorrect: false, misconceptionId: `${NEURCIRC}:M1` },
    ],
    correctValue: 'It sharpens spatial contrast between an active signal and its neighbours',
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    targetedMisconceptions: [`${NEURCIRC}:M1`],
    source: NEURCIRC_SRC,
  },
  {
    conceptId: NEURCIRC, subjectSlug: 'biology', probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'A student says "two spike trains with the exact same average firing rate must carry ' +
      'the same information." What is the best response?',
    choices: [
      {
        text: 'Wrong — under temporal coding, the same average rate with different spike ' +
          'timing patterns can carry different information',
        isCorrect: true,
      },
      {
        text: 'Correct — firing rate alone fully determines the information carried',
        isCorrect: false,
        misconceptionId: `${NEURCIRC}:M2`,
      },
    ],
    correctValue: 'Wrong — under temporal coding, the same average rate with different spike ' +
      'timing patterns can carry different information',
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    targetedMisconceptions: [`${NEURCIRC}:M2`],
    source: NEURCIRC_SRC,
  },
  {
    conceptId: NEURCIRC, subjectSlug: 'biology', probeKind: 'short_answer',
    gradeBand: GradeBand.HIGH,
    stem: 'A central pattern generator circuit controlling walking is surgically isolated from ' +
      'all its normal sensory feedback. What would you predict happens to its rhythmic output?',
    choices: [
      {
        text: 'The rhythmic pattern can continue, since it is an emergent property of the circuit\'s own connectivity',
        isCorrect: true,
      },
      { text: 'The rhythm stops immediately, since it requires continuous sensory feedback to function', isCorrect: false },
      { text: 'The rhythm becomes random and loses all pattern', isCorrect: false },
    ],
    correctValue: 'The rhythmic pattern can continue, since it is an emergent property of the circuit\'s own connectivity',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [],
    source: NEURCIRC_SRC,
  },
]

// ─── bio.neuro.vision-visual-system ──────────────────────────────────────────
const VISION = 'bio.neuro.vision-visual-system'
const VISION_SRC = 'educational-brain/concepts/biology/bio.neuro.vision-visual-system.md'
const VISION_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: VISION, subjectSlug: 'biology', familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'The cornea (fixed, providing most focusing power) and lens (adjustable, fine-tuning ' +
      'focus) together focus light onto the retina, where photoreceptors detect it. Rods are ' +
      'highly sensitive to low light but not colour-sensitive; cones require brighter light but ' +
      'provide colour vision and high acuity. The phototransduction cascade works in a specific, ' +
      'REVERSED way compared to most other sensory receptors: in darkness, photoreceptors are ' +
      'DEPOLARISED and continuously releasing neurotransmitter; when light is absorbed, a ' +
      'cascade CLOSES ion channels, causing HYPERPOLARISATION and DECREASED neurotransmitter ' +
      'release — the presence of the stimulus (light) REDUCES signalling, opposite to most other ' +
      'receptor types. Bipolar cells receive input from photoreceptors, and ganglion cells ' +
      'receive input from bipolar cells, performing further processing (contrast enhancement, ' +
      'spatial integration) before the signal leaves the eye. Ganglion cell axons form the optic ' +
      'nerve, carrying the signal to further brain relay stages and ultimately the visual ' +
      'cortex, where conscious visual perception is actually constructed — "seeing" is a BRAIN ' +
      'function occurring at the end of this pathway, not something completed at the eye itself.',
    targetedMisconceptions: [],
    source: VISION_SRC,
  },
  {
    conceptId: VISION, subjectSlug: 'biology', familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      'Two mistakes are common. First, students assume photoreceptors work like other sensory ' +
      'receptors — stimulus causes depolarisation and increased signalling — but phototransduction ' +
      'is a specific EXCEPTION: light absorption causes hyperpolarisation and DECREASED ' +
      'neurotransmitter release, the opposite pattern. Second, students think "seeing" happens ' +
      'directly at the eye or retina — but the retina only captures and does initial processing; ' +
      'the actual conscious visual experience is constructed later, specifically at the visual ' +
      'cortex, after signals pass through the optic nerve and further relay stages.',
    targetedMisconceptions: [`${VISION}:M1`, `${VISION}:M2`],
    source: VISION_SRC,
  },
]
const VISION_PROBES: SeedProbe[] = [
  {
    conceptId: VISION, subjectSlug: 'biology', probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'What happens to a photoreceptor when light intensity increases?',
    choices: [
      { text: 'It hyperpolarises and releases LESS neurotransmitter', isCorrect: true },
      { text: 'It depolarises and releases MORE neurotransmitter, like most sensory receptors', isCorrect: false, misconceptionId: `${VISION}:M1` },
      { text: 'Its neurotransmitter release stays completely unchanged', isCorrect: false },
      { text: 'It stops functioning entirely', isCorrect: false },
    ],
    correctValue: 'It hyperpolarises and releases LESS neurotransmitter',
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    targetedMisconceptions: [`${VISION}:M1`],
    source: VISION_SRC,
  },
  {
    conceptId: VISION, subjectSlug: 'biology', probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'A student says "seeing happens directly at the retina, once light is detected." What ' +
      'is the best response?',
    choices: [
      {
        text: 'Wrong — the retina only captures and does initial processing; conscious visual ' +
          'perception is constructed later, at the visual cortex',
        isCorrect: true,
      },
      {
        text: 'Correct — the retina alone fully constructs the visual experience before signals leave the eye',
        isCorrect: false,
        misconceptionId: `${VISION}:M2`,
      },
    ],
    correctValue: 'Wrong — the retina only captures and does initial processing; conscious visual ' +
      'perception is constructed later, at the visual cortex',
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    targetedMisconceptions: [`${VISION}:M2`],
    source: VISION_SRC,
  },
  {
    conceptId: VISION, subjectSlug: 'biology', probeKind: 'short_answer',
    gradeBand: GradeBand.HIGH,
    stem: 'Put the visual signal pathway in the correct order, from light detection to conscious perception.',
    choices: [
      { text: 'Photoreceptors → bipolar cells → ganglion cells → optic nerve → visual cortex', isCorrect: true },
      { text: 'Photoreceptors → optic nerve → visual cortex → bipolar cells → ganglion cells', isCorrect: false },
      { text: 'Visual cortex → optic nerve → ganglion cells → bipolar cells → photoreceptors', isCorrect: false },
    ],
    correctValue: 'Photoreceptors → bipolar cells → ganglion cells → optic nerve → visual cortex',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [],
    source: VISION_SRC,
  },
]

// ─── bio.div.arthropod-diversity ─────────────────────────────────────────────
const ARTHROPOD = 'bio.div.arthropod-diversity'
const ARTHROPOD_SRC = 'educational-brain/concepts/biology/bio.div.arthropod-diversity.md'
const ARTHROPOD_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: ARTHROPOD, subjectSlug: 'biology', familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'The chitinous exoskeleton is arthropods\' defining feature, but it creates a specific ' +
      'growth constraint: a rigid exoskeleton cannot expand once formed. Moulting (ecdysis) is ' +
      'the DIRECT solution to this constraint — periodically shedding the old exoskeleton and ' +
      'forming a new, larger one before it hardens, allowing growth in discrete steps. The four ' +
      'major arthropod classes are distinguished by specific anatomical features: Insecta ' +
      '(three body parts, typically three leg pairs), Arachnida (two body parts, four leg ' +
      'pairs), Crustacea (typically two pairs of antennae, a feature the others lack), and ' +
      'Myriapoda (many segments, one or two leg pairs per segment) — classification requires ' +
      'checking these specific features, not habitat or size. Segmentation and jointed ' +
      'appendages provide a modular body plan letting evolution independently specialise ' +
      'individual segments (into mouthparts, wings, walking legs) without redesigning the whole ' +
      'body plan — this modular architecture is the specific mechanism behind arthropods\' ' +
      'unmatched species diversity.',
    targetedMisconceptions: [],
    source: ARTHROPOD_SRC,
  },
  {
    conceptId: ARTHROPOD, subjectSlug: 'biology', familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      'Two mistakes are common. First, students learn the exoskeleton and moulting as two ' +
      'separate facts rather than tracing the causal link: moulting exists SPECIFICALLY ' +
      'because the rigid exoskeleton cannot expand, so periodic shedding is the necessary ' +
      'solution to that exact constraint. Second, students classify arthropods by size or ' +
      'habitat rather than checking the specific anatomical checklist (body-part count, ' +
      'leg-pair count, antennae count) — this checklist, not appearance, determines whether an ' +
      'arthropod is an insect, arachnid, crustacean, or myriapod.',
    targetedMisconceptions: [`${ARTHROPOD}:M1`, `${ARTHROPOD}:M2`],
    source: ARTHROPOD_SRC,
  },
]
const ARTHROPOD_PROBES: SeedProbe[] = [
  {
    conceptId: ARTHROPOD, subjectSlug: 'biology', probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'Why is moulting (ecdysis) necessary for arthropods specifically?',
    choices: [
      { text: 'Because their rigid exoskeleton cannot expand, so growth requires periodically shedding it', isCorrect: true },
      { text: 'It is an unrelated behaviour with no connection to their exoskeleton', isCorrect: false, misconceptionId: `${ARTHROPOD}:M1` },
      { text: 'It only occurs in aquatic arthropods', isCorrect: false },
      { text: 'It replaces the need for a nervous system', isCorrect: false },
    ],
    correctValue: 'Because their rigid exoskeleton cannot expand, so growth requires periodically shedding it',
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    targetedMisconceptions: [`${ARTHROPOD}:M1`],
    source: ARTHROPOD_SRC,
  },
  {
    conceptId: ARTHROPOD, subjectSlug: 'biology', probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'A student classifies an arthropod as an insect purely because it is small and lives on ' +
      'land. What is the best response?',
    choices: [
      {
        text: 'Wrong — classification requires checking specific features like body-part count, ' +
          'leg-pair count, and antennae count, not size or habitat',
        isCorrect: true,
      },
      {
        text: 'Correct — size and habitat are sufficient to classify any arthropod',
        isCorrect: false,
        misconceptionId: `${ARTHROPOD}:M2`,
      },
    ],
    correctValue: 'Wrong — classification requires checking specific features like body-part count, ' +
      'leg-pair count, and antennae count, not size or habitat',
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    targetedMisconceptions: [`${ARTHROPOD}:M2`],
    source: ARTHROPOD_SRC,
  },
  {
    conceptId: ARTHROPOD, subjectSlug: 'biology', probeKind: 'short_answer',
    gradeBand: GradeBand.HIGH,
    stem: 'An arthropod has two body parts and four pairs of legs. Which class does it most likely belong to?',
    choices: [
      { text: 'Arachnida', isCorrect: true },
      { text: 'Insecta', isCorrect: false },
      { text: 'Crustacea', isCorrect: false },
      { text: 'Myriapoda', isCorrect: false },
    ],
    correctValue: 'Arachnida',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${ARTHROPOD}:M2`],
    source: ARTHROPOD_SRC,
  },
]

export const BIOLOGY_EXTENSION_EXPLANATIONS: SeedExplanation[] = [
  ...SCIMETH_EXPLANATIONS,
  ...UNITHEMES_EXPLANATIONS,
  ...INNATEBEH_EXPLANATIONS,
  ...ANIMCOMM_EXPLANATIONS,
  ...BRAINREG_EXPLANATIONS,
  ...BODYPLAN_EXPLANATIONS,
  ...NEUROTRANS_EXPLANATIONS,
  ...SENSTRANS_EXPLANATIONS,
  ...INVERTDIV_EXPLANATIONS,
  ...NEURCIRC_EXPLANATIONS,
  ...VISION_EXPLANATIONS,
  ...ARTHROPOD_EXPLANATIONS,
]

export const BIOLOGY_EXTENSION_PROBES: SeedProbe[] = [
  ...SCIMETH_PROBES,
  ...UNITHEMES_PROBES,
  ...INNATEBEH_PROBES,
  ...ANIMCOMM_PROBES,
  ...BRAINREG_PROBES,
  ...BODYPLAN_PROBES,
  ...NEUROTRANS_PROBES,
  ...SENSTRANS_PROBES,
  ...INVERTDIV_PROBES,
  ...NEURCIRC_PROBES,
  ...VISION_PROBES,
  ...ARTHROPOD_PROBES,
]
