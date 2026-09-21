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

// ─── bio.neuro.learning-memory-neurobiology ──────────────────────────────────
const LEARNMEM = 'bio.neuro.learning-memory-neurobiology'
const LEARNMEM_SRC = 'educational-brain/concepts/biology/bio.neuro.learning-memory-neurobiology.md'
const LEARNMEM_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: LEARNMEM, subjectSlug: 'biology', familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'Synaptic plasticity is the cellular-level mechanism believed to underlie learning: the ' +
      'STRENGTH of an individual synapse can change based on its own activity history. ' +
      'Long-term potentiation (LTP) is a persistent STRENGTHENING of a specific synapse ' +
      'following strong, repeated activation; long-term depression (LTD) is a persistent ' +
      'WEAKENING following weak or poorly-correlated activation. Crucially, LTP/LTD are ' +
      'SYNAPSE-SPECIFIC changes, not whole-neuron changes — a single neuron can have some ' +
      'synapses strengthened and others weakened at the same time. The Hebbian rule ("cells ' +
      'that fire together, wire together") states that a synapse is strengthened when its ' +
      'presynaptic neuron\'s activity CONSISTENTLY, CAUSALLY contributes to the postsynaptic ' +
      'neuron firing — a rule about one particular connection, not any two coincidentally ' +
      'active cells anywhere in the brain. Memory itself is not one undifferentiated function: ' +
      'the hippocampus is critical for FORMING declarative memory (facts and events that can be ' +
      'consciously recalled), while procedural memory (skills and habits) relies on largely ' +
      'separate systems including the basal ganglia and cerebellum — patients with hippocampal ' +
      'damage can still learn new motor skills despite being unable to form new declarative ' +
      'memories.',
    targetedMisconceptions: [],
    source: LEARNMEM_SRC,
  },
  {
    conceptId: LEARNMEM, subjectSlug: 'biology', familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      'Two mistakes are common. First, students think LTP/LTD make a whole neuron generically ' +
      '"more" or "less" excitable, missing that plasticity is SYNAPSE-SPECIFIC — one synapse on ' +
      'a neuron can undergo LTP while a different synapse on the SAME neuron simultaneously ' +
      'undergoes LTD. Second, students treat the hippocampus as THE memory centre for all memory, ' +
      'missing that declarative memory (hippocampus-dependent) and procedural memory (relying on ' +
      'largely separate systems) are functionally and anatomically distinct — a patient with ' +
      'hippocampal damage learning a new motor skill despite not remembering practising it is ' +
      'evidence for separate systems, not a contradiction.',
    targetedMisconceptions: [`${LEARNMEM}:M1`, `${LEARNMEM}:M2`],
    source: LEARNMEM_SRC,
  },
]
const LEARNMEM_PROBES: SeedProbe[] = [
  {
    conceptId: LEARNMEM, subjectSlug: 'biology', probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'A single neuron receives input from two different presynaptic neurons with very ' +
      'different activity histories. What is the BEST prediction for what happens to the two ' +
      'corresponding synapses?',
    choices: [
      { text: 'The two synapses can change independently — one strengthened (LTP), one weakened (LTD)', isCorrect: true },
      { text: 'Both synapses must change in the same direction, since it is the same neuron', isCorrect: false, misconceptionId: `${LEARNMEM}:M1` },
      { text: 'Neither synapse can change unless the whole neuron becomes more excitable first', isCorrect: false, misconceptionId: `${LEARNMEM}:M1` },
      { text: 'The synapses cannot be affected by activity history at all', isCorrect: false },
    ],
    correctValue: 'The two synapses can change independently — one strengthened (LTP), one weakened (LTD)',
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    targetedMisconceptions: [`${LEARNMEM}:M1`],
    source: LEARNMEM_SRC,
  },
  {
    conceptId: LEARNMEM, subjectSlug: 'biology', probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'A patient with hippocampal damage cannot remember practising a new motor skill, yet ' +
      'performs it well. A student calls this a contradiction. What is the best response?',
    choices: [
      {
        text: 'Not a contradiction — it shows declarative memory (hippocampus-dependent) and ' +
          'procedural memory (largely separate systems) are functionally distinct',
        isCorrect: true,
      },
      {
        text: 'It is a contradiction, since the hippocampus is the memory centre for all memory',
        isCorrect: false,
        misconceptionId: `${LEARNMEM}:M2`,
      },
    ],
    correctValue: 'Not a contradiction — it shows declarative memory (hippocampus-dependent) and ' +
      'procedural memory (largely separate systems) are functionally distinct',
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    targetedMisconceptions: [`${LEARNMEM}:M2`],
    source: LEARNMEM_SRC,
  },
  {
    conceptId: LEARNMEM, subjectSlug: 'biology', probeKind: 'short_answer',
    gradeBand: GradeBand.HIGH,
    stem: 'Under the Hebbian rule, which specific synapse gets strengthened?',
    choices: [
      {
        text: 'The synapse where presynaptic activity consistently and causally contributes to postsynaptic firing',
        isCorrect: true,
      },
      { text: 'Any synapse anywhere in the brain that happens to be active at the same time as any other', isCorrect: false },
      { text: 'Every synapse on a neuron that has recently fired at all', isCorrect: false },
    ],
    correctValue: 'The synapse where presynaptic activity consistently and causally contributes to postsynaptic firing',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [],
    source: LEARNMEM_SRC,
  },
]

// ─── bio.div.echinoderm-deuterostome-diversity ───────────────────────────────
const ECHINODERM = 'bio.div.echinoderm-deuterostome-diversity'
const ECHINODERM_SRC = 'educational-brain/concepts/biology/bio.div.echinoderm-deuterostome-diversity.md'
const ECHINODERM_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: ECHINODERM, subjectSlug: 'biology', familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'Deuterostome development — in which the blastopore (the first opening formed during ' +
      'gastrulation) becomes the ANUS, with the mouth forming separately — is the shared ' +
      'developmental signature that phylogenetically LINKS echinoderms to chordates, despite ' +
      'their dramatically different adult body forms. Phylogenetic relationship is established ' +
      'by shared developmental evidence, not by adult appearance. Echinoderms\' most visible ' +
      'feature, pentaradial (five-part) symmetry, is SECONDARILY DERIVED: echinoderms evolved ' +
      'from a bilaterally symmetric ancestor and independently RE-EVOLVED radial symmetry ' +
      'later — confirmed by echinoderm larvae, which display bilateral symmetry, only becoming ' +
      'radially symmetric through metamorphosis into the adult form. Echinodermata is further ' +
      'defined by the water vascular system (a unique hydraulic network of fluid-filled canals ' +
      'used for locomotion via tube feet, feeding, and gas exchange) and an internal ' +
      'endoskeleton (calcium-carbonate ossicles embedded in the body wall, unlike arthropods\' ' +
      'external exoskeleton).',
    targetedMisconceptions: [],
    source: ECHINODERM_SRC,
  },
  {
    conceptId: ECHINODERM, subjectSlug: 'biology', familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      'Two mistakes are common. First, students assume echinoderms and chordates cannot be ' +
      'closely related because adult sea stars and adult fish look nothing alike, missing that ' +
      'the two groups are grouped as deuterostomes based on shared developmental evidence ' +
      '(blastopore becomes the anus), not adult resemblance. Second, students assume echinoderm ' +
      'radial symmetry is an ancestral, primitive condition like Cnidaria\'s, missing that it is ' +
      'SECONDARILY DERIVED from a bilateral ancestor — directly evidenced by the bilaterally ' +
      'symmetric larval stage that only becomes radial through metamorphosis.',
    targetedMisconceptions: [`${ECHINODERM}:M1`, `${ECHINODERM}:M2`],
    source: ECHINODERM_SRC,
  },
]
const ECHINODERM_PROBES: SeedProbe[] = [
  {
    conceptId: ECHINODERM, subjectSlug: 'biology', probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'A sea star and a fish look nothing alike as adults. Why are they still classified ' +
      'together as deuterostomes?',
    choices: [
      { text: 'They share a specific developmental signature — the blastopore becomes the anus', isCorrect: true },
      { text: 'They are not actually classified together, since their adult forms differ too much', isCorrect: false, misconceptionId: `${ECHINODERM}:M1` },
      { text: 'They share the same adult body symmetry', isCorrect: false, misconceptionId: `${ECHINODERM}:M1` },
      { text: 'They live in the same habitat', isCorrect: false },
    ],
    correctValue: 'They share a specific developmental signature — the blastopore becomes the anus',
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    targetedMisconceptions: [`${ECHINODERM}:M1`],
    source: ECHINODERM_SRC,
  },
  {
    conceptId: ECHINODERM, subjectSlug: 'biology', probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'A student says "echinoderms have radial symmetry, so they must be primitively radial ' +
      'like Cnidaria." What is the best response?',
    choices: [
      {
        text: 'Wrong — echinoderm radial symmetry is secondarily derived from a bilateral ' +
          'ancestor, as shown by the bilaterally symmetric larval stage',
        isCorrect: true,
      },
      {
        text: 'Correct — any radially symmetric animal shares the same ancestral radial origin',
        isCorrect: false,
        misconceptionId: `${ECHINODERM}:M2`,
      },
    ],
    correctValue: 'Wrong — echinoderm radial symmetry is secondarily derived from a bilateral ' +
      'ancestor, as shown by the bilaterally symmetric larval stage',
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    targetedMisconceptions: [`${ECHINODERM}:M2`],
    source: ECHINODERM_SRC,
  },
  {
    conceptId: ECHINODERM, subjectSlug: 'biology', probeKind: 'short_answer',
    gradeBand: GradeBand.HIGH,
    stem: 'What specific structure allows a sea star to extend and retract its tube feet for locomotion?',
    choices: [
      { text: 'The water vascular system', isCorrect: true },
      { text: 'The exoskeleton', isCorrect: false },
      { text: 'The notochord', isCorrect: false },
    ],
    correctValue: 'The water vascular system',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [],
    source: ECHINODERM_SRC,
  },
]

// ─── bio.neuro.audition-vestibular-system ────────────────────────────────────
const AUDITION = 'bio.neuro.audition-vestibular-system'
const AUDITION_SRC = 'educational-brain/concepts/biology/bio.neuro.audition-vestibular-system.md'
const AUDITION_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: AUDITION, subjectSlug: 'biology', familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'The ear has three regions: the outer ear collects sound, the middle ear (malleus, incus, ' +
      'stapes) mechanically amplifies and transmits vibrations, and the inner ear contains the ' +
      'cochlea (hearing) and vestibular apparatus (balance), both relying on the SAME ' +
      'mechanism — hair-cell mechanotransduction, where deflected stereocilia open ' +
      'mechanically-gated ion channels. Within the cochlea, the basilar membrane\'s stiffness ' +
      'and width vary systematically along its length, producing TONOTOPIC CODING: a SPECIFIC ' +
      'LOCATION vibrates maximally for a SPECIFIC frequency (high frequencies near the base, low ' +
      'frequencies near the apex) — a spatial map of PITCH, entirely separate from how ' +
      'LOUDNESS is coded (via firing rate). The vestibular system detects balance and head ' +
      'movement/position, NOT sound, using the same hair-cell mechanism but organised into ' +
      'different structures: the semicircular canals detect ROTATIONAL movement via fluid ' +
      'deflecting hair cells, while the otolith organs (utricle, saccule) detect LINEAR ' +
      'acceleration and static head position via gravity-sensitive otolith crystals.',
    targetedMisconceptions: [],
    source: AUDITION_SRC,
  },
  {
    conceptId: AUDITION, subjectSlug: 'biology', familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      'Two mistakes are common. First, students assume sound frequency is coded the same way as ' +
      'intensity — by firing rate alone — missing that frequency is coded SPATIALLY (tonotopy: ' +
      'which basilar-membrane location is maximally activated), while intensity is coded ' +
      'separately by firing rate. Second, students assume the vestibular system detects sound ' +
      'because it sits right next to the cochlea in the inner ear, missing that it detects head ' +
      'MOVEMENT and POSITION using the same hair-cell mechanism but organised into functionally ' +
      'distinct structures serving a completely different purpose.',
    targetedMisconceptions: [`${AUDITION}:M1`, `${AUDITION}:M2`],
    source: AUDITION_SRC,
  },
]
const AUDITION_PROBES: SeedProbe[] = [
  {
    conceptId: AUDITION, subjectSlug: 'biology', probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'A sound gets LOUDER but stays the SAME pitch. What changes?',
    choices: [
      { text: 'The firing rate at the same basilar-membrane location increases', isCorrect: true },
      { text: 'The location of maximum basilar-membrane activation shifts', isCorrect: false, misconceptionId: `${AUDITION}:M1` },
      { text: 'Both the location and the firing rate change together', isCorrect: false, misconceptionId: `${AUDITION}:M1` },
      { text: 'Nothing measurable changes in the cochlea', isCorrect: false },
    ],
    correctValue: 'The firing rate at the same basilar-membrane location increases',
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    targetedMisconceptions: [`${AUDITION}:M1`],
    source: AUDITION_SRC,
  },
  {
    conceptId: AUDITION, subjectSlug: 'biology', probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'A student says "the vestibular system must detect sound too, since it is right next ' +
      'to the cochlea in the inner ear." What is the best response?',
    choices: [
      {
        text: 'Wrong — the vestibular system detects head movement and position (balance), not ' +
          'sound, despite sharing the same hair-cell mechanism and location',
        isCorrect: true,
      },
      {
        text: 'Correct — anatomical proximity in the inner ear means shared function',
        isCorrect: false,
        misconceptionId: `${AUDITION}:M2`,
      },
    ],
    correctValue: 'Wrong — the vestibular system detects head movement and position (balance), not ' +
      'sound, despite sharing the same hair-cell mechanism and location',
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    targetedMisconceptions: [`${AUDITION}:M2`],
    source: AUDITION_SRC,
  },
  {
    conceptId: AUDITION, subjectSlug: 'biology', probeKind: 'short_answer',
    gradeBand: GradeBand.HIGH,
    stem: 'A person spins in place with their eyes closed and senses the rotation. Which specific ' +
      'structure is responsible?',
    choices: [
      { text: 'The semicircular canals', isCorrect: true },
      { text: 'The cochlea', isCorrect: false },
      { text: 'The otolith organs', isCorrect: false },
    ],
    correctValue: 'The semicircular canals',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [],
    source: AUDITION_SRC,
  },
]

// ─── bio.div.chordate-vertebrate-diversity ───────────────────────────────────
const CHORDATE = 'bio.div.chordate-vertebrate-diversity'
const CHORDATE_SRC = 'educational-brain/concepts/biology/bio.div.chordate-vertebrate-diversity.md'
const CHORDATE_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: CHORDATE, subjectSlug: 'biology', familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'Phylum Chordata is defined by four features: the notochord (a flexible rod-like ' +
      'support structure), the dorsal hollow nerve cord (running along the back, unlike many ' +
      'invertebrates\' ventral cord), pharyngeal slits (used for filter-feeding or respiration ' +
      'in some chordates), and a post-anal tail (extending beyond the anus). Critically, these ' +
      'features are chordate-defining because they appear during EMBRYONIC development — in ' +
      'many vertebrates some are later modified or lost in the adult. The notochord, for ' +
      'example, is present in vertebrate embryos (including human embryos) but is largely ' +
      'REPLACED by the developing vertebral column as the organism matures, so an adult human ' +
      'shows no obvious notochord despite genuinely having one earlier in development. The five ' +
      'vertebrate classes (fish, amphibians, reptiles, birds, mammals) are introduced here as an ' +
      'ORGANISING FRAMEWORK for the detailed diversity concepts that follow, not as the complete ' +
      'picture of vertebrate diversity itself.',
    targetedMisconceptions: [],
    source: CHORDATE_SRC,
  },
  {
    conceptId: CHORDATE, subjectSlug: 'biology', familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      'Two mistakes are common. First, students check for chordate features only in the adult\'s ' +
      'visible anatomy and conclude an adult without a visible notochord cannot be a chordate, ' +
      'missing that the criterion is EMBRYONIC — the notochord was genuinely present in the ' +
      'embryo even though later replaced by the vertebral column. Second, students treat the ' +
      'five-vertebrate-class overview as the complete, detailed picture of vertebrate diversity, ' +
      'missing that each class\'s specific defining features are deliberately deferred to the ' +
      'dedicated concepts this overview unlocks.',
    targetedMisconceptions: [`${CHORDATE}:M1`, `${CHORDATE}:M2`],
    source: CHORDATE_SRC,
  },
]
const CHORDATE_PROBES: SeedProbe[] = [
  {
    conceptId: CHORDATE, subjectSlug: 'biology', probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'An adult vertebrate shows no visible notochord. Can it still be classified as a chordate?',
    choices: [
      { text: 'Yes — the notochord was present during embryonic development, which is the defining criterion', isCorrect: true },
      { text: 'No — chordate classification requires a visible notochord in the adult', isCorrect: false, misconceptionId: `${CHORDATE}:M1` },
      { text: 'No — only fish and amphibians retain chordate status as adults', isCorrect: false, misconceptionId: `${CHORDATE}:M1` },
      { text: 'It cannot be determined without checking its pharyngeal slits', isCorrect: false },
    ],
    correctValue: 'Yes — the notochord was present during embryonic development, which is the defining criterion',
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    targetedMisconceptions: [`${CHORDATE}:M1`],
    source: CHORDATE_SRC,
  },
  {
    conceptId: CHORDATE, subjectSlug: 'biology', probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'A student asks what specifically distinguishes a reptile from an amphibian, after ' +
      'learning the five vertebrate class names. What is the best response?',
    choices: [
      {
        text: 'This overview is an organising framework — the specific distinguishing features ' +
          'are covered in dedicated concepts this one unlocks',
        isCorrect: true,
      },
      {
        text: 'The five class names given here are the complete answer already',
        isCorrect: false,
        misconceptionId: `${CHORDATE}:M2`,
      },
    ],
    correctValue: 'This overview is an organising framework — the specific distinguishing features ' +
      'are covered in dedicated concepts this one unlocks',
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    targetedMisconceptions: [`${CHORDATE}:M2`],
    source: CHORDATE_SRC,
  },
  {
    conceptId: CHORDATE, subjectSlug: 'biology', probeKind: 'short_answer',
    gradeBand: GradeBand.HIGH,
    stem: 'Which chordate feature typically develops into the vertebrate spinal cord and brain?',
    choices: [
      { text: 'The dorsal hollow nerve cord', isCorrect: true },
      { text: 'The notochord', isCorrect: false },
      { text: 'The pharyngeal slits', isCorrect: false },
    ],
    correctValue: 'The dorsal hollow nerve cord',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [],
    source: CHORDATE_SRC,
  },
]

// ─── bio.neuro.cognitive-neuroscience-consciousness ──────────────────────────
const COGNEURO = 'bio.neuro.cognitive-neuroscience-consciousness'
const COGNEURO_SRC = 'educational-brain/concepts/biology/bio.neuro.cognitive-neuroscience-consciousness.md'
const COGNEURO_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: COGNEURO, subjectSlug: 'biology', familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'Attention and executive function are TOP-DOWN cognitive control mechanisms: higher-level ' +
      'goals actively direct which information gets processed further, as opposed to purely ' +
      'BOTTOM-UP, stimulus-driven capture (a sudden loud noise grabbing attention regardless of ' +
      'current goals). The search for neural correlates of consciousness (NCCs) aims to identify ' +
      'brain-activity patterns that reliably CO-OCCUR with a conscious experience — but ' +
      'identifying a correlate is NOT the same as fully EXPLAINING why that activity produces ' +
      'subjective experience; NCC research establishes correlation, not causal/mechanistic ' +
      'explanation. Split-brain studies (corpus callosum surgically severed) show that when ' +
      'information is presented to only one hemisphere, that hemisphere can act on it while the ' +
      'other hemisphere (and verbal report, typically left-hemisphere-dominant) has no access to ' +
      'it — demonstrating that unified conscious experience can be behaviourally DISSOCIATED ' +
      'under specific controlled conditions, not that the patient has two separate ' +
      'consciousnesses at all times.',
    targetedMisconceptions: [],
    source: COGNEURO_SRC,
  },
  {
    conceptId: COGNEURO, subjectSlug: 'biology', familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      'Two mistakes are common. First, students treat finding a neural correlate of a conscious ' +
      'experience as a complete EXPLANATION of that experience, missing that a correlate is a ' +
      'reliable co-occurrence, not a causal/mechanistic account of how brain activity produces ' +
      'subjective experience. Second, students overgeneralize split-brain findings into "two ' +
      'fully separate consciousnesses at all times," missing that the dissociation is ' +
      'demonstrated under SPECIFIC experimental conditions (isolated visual-field presentation) ' +
      '— in ordinary life with both eyes open, both hemispheres receive largely overlapping ' +
      'information, so split-brain patients function coherently day-to-day.',
    targetedMisconceptions: [`${COGNEURO}:M1`, `${COGNEURO}:M2`],
    source: COGNEURO_SRC,
  },
]
const COGNEURO_PROBES: SeedProbe[] = [
  {
    conceptId: COGNEURO, subjectSlug: 'biology', probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'Scientists find a brain-activity pattern that reliably occurs whenever a person sees ' +
      'red. Does this explain WHY seeing red feels like something?',
    choices: [
      { text: 'No — it establishes a correlation, not a causal/mechanistic explanation', isCorrect: true },
      { text: 'Yes — finding the correlate is equivalent to a full explanation', isCorrect: false, misconceptionId: `${COGNEURO}:M1` },
      { text: 'Yes, but only for colors, not other conscious experiences', isCorrect: false, misconceptionId: `${COGNEURO}:M1` },
      { text: 'The question cannot be studied scientifically at all', isCorrect: false },
    ],
    correctValue: 'No — it establishes a correlation, not a causal/mechanistic explanation',
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    targetedMisconceptions: [`${COGNEURO}:M1`],
    source: COGNEURO_SRC,
  },
  {
    conceptId: COGNEURO, subjectSlug: 'biology', probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'A student says "split-brain patients have two fully separate consciousnesses ' +
      'operating independently all the time." What is the best response?',
    choices: [
      {
        text: 'Wrong — the dissociation is shown under specific isolated-visual-field ' +
          'conditions; in ordinary life both hemispheres get overlapping information',
        isCorrect: true,
      },
      {
        text: 'Correct — this is their permanent everyday experience',
        isCorrect: false,
        misconceptionId: `${COGNEURO}:M2`,
      },
    ],
    correctValue: 'Wrong — the dissociation is shown under specific isolated-visual-field ' +
      'conditions; in ordinary life both hemispheres get overlapping information',
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    targetedMisconceptions: [`${COGNEURO}:M2`],
    source: COGNEURO_SRC,
  },
  {
    conceptId: COGNEURO, subjectSlug: 'biology', probeKind: 'short_answer',
    gradeBand: GradeBand.HIGH,
    stem: 'A person is following one voice in a noisy room based on the goal of tracking that ' +
      'conversation. Is this top-down or bottom-up processing?',
    choices: [
      { text: 'Top-down — goal-directed attention selecting what to process', isCorrect: true },
      { text: 'Bottom-up — the loudest voice automatically wins attention', isCorrect: false },
      { text: 'Neither — attention is not involved in this scenario', isCorrect: false },
    ],
    correctValue: 'Top-down — goal-directed attention selecting what to process',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [],
    source: COGNEURO_SRC,
  },
]

// ─── bio.behav.learning-and-behavior ─────────────────────────────────────────
const LEARNBEH = 'bio.behav.learning-and-behavior'
const LEARNBEH_SRC = 'educational-brain/concepts/biology/bio.behav.learning-and-behavior.md'
const LEARNBEH_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: LEARNBEH, subjectSlug: 'biology', familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'Habituation is the simplest form of learning: a DECREASE in response to a REPEATED, ' +
      'harmless stimulus, with NO association formed between two separate things (non-associative ' +
      'learning). Classical conditioning and operant conditioning are both ASSOCIATIVE but link ' +
      'different things: classical conditioning associates two STIMULI (a previously neutral ' +
      'stimulus comes to trigger a response that another stimulus already naturally triggers, as ' +
      'in Pavlov\'s bell-and-food dogs); operant conditioning associates an organism\'s own ' +
      'BEHAVIOUR with its CONSEQUENCE (a behaviour followed by a favourable outcome becomes MORE ' +
      'likely to recur). Imprinting is a distinctive, TIME-LIMITED form of learning occurring ' +
      'only during a specific developmental CRITICAL PERIOD — the same learning typically cannot ' +
      'be acquired later if that window has passed. Observational (social) learning lets an ' +
      'individual acquire a behaviour by OBSERVING another perform it, without personally bearing ' +
      'the cost of direct trial and error.',
    targetedMisconceptions: [],
    source: LEARNBEH_SRC,
  },
  {
    conceptId: LEARNBEH, subjectSlug: 'biology', familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      'Two mistakes are common. First, students treat classical and operant conditioning as the ' +
      'same kind of learning with different examples, missing that classical conditioning links ' +
      'STIMULUS-to-STIMULUS while operant conditioning links BEHAVIOUR-to-CONSEQUENCE — ' +
      'categorically different associations. Second, students describe imprinting as simply ' +
      '"learning that happens early," missing its DEFINING feature — a specific critical period ' +
      'outside of which the same learning typically cannot be readily acquired, even if the same ' +
      'stimulus is presented later.',
    targetedMisconceptions: [`${LEARNBEH}:M1`, `${LEARNBEH}:M2`],
    source: LEARNBEH_SRC,
  },
]
const LEARNBEH_PROBES: SeedProbe[] = [
  {
    conceptId: LEARNBEH, subjectSlug: 'biology', probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'A rat learns that pressing a lever produces a food reward, so it presses the lever ' +
      'more often. What TYPE of learning is this?',
    choices: [
      { text: 'Operant conditioning — a behaviour is linked to its consequence', isCorrect: true },
      { text: 'Classical conditioning — two stimuli are linked together', isCorrect: false, misconceptionId: `${LEARNBEH}:M1` },
      { text: 'Habituation — the rat is simply getting used to the lever', isCorrect: false },
      { text: 'Imprinting — this must occur within a critical period', isCorrect: false },
    ],
    correctValue: 'Operant conditioning — a behaviour is linked to its consequence',
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    targetedMisconceptions: [`${LEARNBEH}:M1`],
    source: LEARNBEH_SRC,
  },
  {
    conceptId: LEARNBEH, subjectSlug: 'biology', probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'A student says "imprinting is just learning that happens early in life." What is the ' +
      'best response?',
    choices: [
      {
        text: 'Wrong — imprinting\'s defining feature is a critical period; the same learning ' +
          'typically cannot occur normally once that window has passed',
        isCorrect: true,
      },
      {
        text: 'Correct — any early learning counts as imprinting',
        isCorrect: false,
        misconceptionId: `${LEARNBEH}:M2`,
      },
    ],
    correctValue: 'Wrong — imprinting\'s defining feature is a critical period; the same learning ' +
      'typically cannot occur normally once that window has passed',
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    targetedMisconceptions: [`${LEARNBEH}:M2`],
    source: LEARNBEH_SRC,
  },
  {
    conceptId: LEARNBEH, subjectSlug: 'biology', probeKind: 'short_answer',
    gradeBand: GradeBand.HIGH,
    stem: 'A young bird learns a predator alarm call by watching an experienced adult react to a ' +
      'predator, without ever encountering the predator itself. What kind of learning is this?',
    choices: [
      { text: 'Observational (social) learning', isCorrect: true },
      { text: 'Classical conditioning', isCorrect: false },
      { text: 'Habituation', isCorrect: false },
    ],
    correctValue: 'Observational (social) learning',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [],
    source: LEARNBEH_SRC,
  },
]

// ─── bio.behav.animal-cognition ──────────────────────────────────────────────
const ANIMCOG = 'bio.behav.animal-cognition'
const ANIMCOG_SRC = 'educational-brain/concepts/biology/bio.behav.animal-cognition.md'
const ANIMCOG_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: ANIMCOG, subjectSlug: 'biology', familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'Problem-solving and tool use count as evidence of FLEXIBLE, non-instinctive behaviour ' +
      'specifically when they involve a NOVEL solution to a NOVEL problem — a fixed instinct is ' +
      'a stereotyped response to a specific sign stimulus and cannot by itself explain a ' +
      'genuinely new, situationally-appropriate solution. Comparative cognition (studying ' +
      'cognition across species) is governed by Morgan\'s Canon: a behaviour should NOT be ' +
      'explained by a higher, more complex cognitive process if a LOWER, simpler process (e.g. ' +
      'trial-and-error learning) can adequately explain it — this guards against ' +
      'anthropomorphic over-interpretation. Evidence for theory of mind (attributing mental ' +
      'states to others) in non-human animals is GENUINELY CONTESTED because behaviour that ' +
      'looks like understanding another\'s mental state can often be explained more simply — by ' +
      'learned associations with observable cues like gaze direction — without any real mental- ' +
      'state representation.',
    targetedMisconceptions: [],
    source: ANIMCOG_SRC,
  },
  {
    conceptId: ANIMCOG, subjectSlug: 'biology', familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      'Two mistakes are common. First, students treat any successful tool use as automatic ' +
      'evidence of sophisticated cognition, missing that flexible-cognition evidence specifically ' +
      'requires the situation to be genuinely NOVEL to the animal — a well-practiced routine does ' +
      'not distinguish flexible cognition from a refined learned/instinctive behaviour. Second, ' +
      'students accept theory-of-mind-like behaviour as proof the animal understands another\'s ' +
      'mental state, missing that Morgan\'s Canon requires first ruling out simpler explanations ' +
      '(learned association with observable cues) before accepting the mentalistic ' +
      'interpretation.',
    targetedMisconceptions: [`${ANIMCOG}:M1`, `${ANIMCOG}:M2`],
    source: ANIMCOG_SRC,
  },
]
const ANIMCOG_PROBES: SeedProbe[] = [
  {
    conceptId: ANIMCOG, subjectSlug: 'biology', probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'An animal solves a problem it has practiced hundreds of times before. Does this alone ' +
      'demonstrate flexible, non-instinctive cognition?',
    choices: [
      { text: 'No — flexibility requires a genuinely novel situation, not a well-practiced routine', isCorrect: true },
      { text: 'Yes — any successful problem-solving proves sophisticated cognition', isCorrect: false, misconceptionId: `${ANIMCOG}:M1` },
      { text: 'Yes, but only if a tool was involved', isCorrect: false, misconceptionId: `${ANIMCOG}:M1` },
      { text: 'This cannot be evaluated without knowing the animal\'s species', isCorrect: false },
    ],
    correctValue: 'No — flexibility requires a genuinely novel situation, not a well-practiced routine',
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    targetedMisconceptions: [`${ANIMCOG}:M1`],
    source: ANIMCOG_SRC,
  },
  {
    conceptId: ANIMCOG, subjectSlug: 'biology', probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'A dog appears to check whether its owner is watching before taking food off the table. ' +
      'A student says this proves the dog understands what the owner can and cannot see. What is ' +
      'the best response?',
    choices: [
      {
        text: 'Not yet — first rule out a simpler explanation, such as a learned association ' +
          'between the owner\'s gaze/posture and punishment, per Morgan\'s Canon',
        isCorrect: true,
      },
      {
        text: 'Correct — this behaviour is sufficient proof of theory of mind',
        isCorrect: false,
        misconceptionId: `${ANIMCOG}:M2`,
      },
    ],
    correctValue: 'Not yet — first rule out a simpler explanation, such as a learned association ' +
      'between the owner\'s gaze/posture and punishment, per Morgan\'s Canon',
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    targetedMisconceptions: [`${ANIMCOG}:M2`],
    source: ANIMCOG_SRC,
  },
  {
    conceptId: ANIMCOG, subjectSlug: 'biology', probeKind: 'short_answer',
    gradeBand: GradeBand.HIGH,
    stem: 'What principle states that a behaviour should not be explained by a more complex ' +
      'cognitive process if a simpler process can adequately explain it?',
    choices: [
      { text: 'Morgan\'s Canon', isCorrect: true },
      { text: 'The Hebbian rule', isCorrect: false },
      { text: 'Habituation', isCorrect: false },
    ],
    correctValue: 'Morgan\'s Canon',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [],
    source: ANIMCOG_SRC,
  },
]

// ─── bio.neuro.neurodegenerative-disease ─────────────────────────────────────
const NEURODEG = 'bio.neuro.neurodegenerative-disease'
const NEURODEG_SRC = 'educational-brain/concepts/biology/bio.neuro.neurodegenerative-disease.md'
const NEURODEG_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: NEURODEG, subjectSlug: 'biology', familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'Alzheimer\'s disease has two DISTINCT pathological hallmarks: amyloid-beta plaques, ' +
      'EXTRACELLULAR deposits of misfolded amyloid-beta protein accumulating between neurons; ' +
      'and tau neurofibrillary tangles, INTRACELLULAR structures of misfolded, ' +
      'hyperphosphorylated tau protein accumulating within neurons and disrupting internal ' +
      'transport structures — different proteins, different cellular locations. Parkinson\'s ' +
      'disease results from the SELECTIVE, progressive loss of dopaminergic neurons ' +
      'concentrated specifically in the substantia nigra, not generalised brain-wide neuron ' +
      'loss — this selectivity is why Parkinson\'s produces specifically MOTOR symptoms (tremor, ' +
      'rigidity, slowed movement) tied to disrupted dopamine signalling. The deeper shared theme ' +
      'connecting these otherwise distinct diseases is protein misfolding and aggregation: each ' +
      'disease involves a DIFFERENT specific protein (amyloid-beta and tau in Alzheimer\'s, ' +
      'alpha-synuclein in Parkinson\'s) failing to fold correctly and aggregating — a shared ' +
      'mechanism category, not a shared disease identity.',
    targetedMisconceptions: [],
    source: NEURODEG_SRC,
  },
  {
    conceptId: NEURODEG, subjectSlug: 'biology', familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      'Two mistakes are common. First, students conflate amyloid plaques and tau tangles as the ' +
      'same structure, missing that plaques are EXTRACELLULAR (amyloid-beta, between neurons) ' +
      'while tangles are INTRACELLULAR (tau, within neurons) — different proteins in different ' +
      'locations. Second, students assume Parkinson\'s reflects generalised brain-wide neuron ' +
      'loss, missing that it specifically and disproportionately targets dopaminergic neurons in ' +
      'the substantia nigra, which is exactly why the symptoms are specifically motor-related ' +
      'rather than broadly diffuse.',
    targetedMisconceptions: [`${NEURODEG}:M1`, `${NEURODEG}:M2`],
    source: NEURODEG_SRC,
  },
]
const NEURODEG_PROBES: SeedProbe[] = [
  {
    conceptId: NEURODEG, subjectSlug: 'biology', probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'A protein deposit is found accumulating OUTSIDE neurons, in the spaces between them. ' +
      'Which Alzheimer\'s hallmark does this describe?',
    choices: [
      { text: 'Amyloid-beta plaques', isCorrect: true },
      { text: 'Tau neurofibrillary tangles', isCorrect: false, misconceptionId: `${NEURODEG}:M1` },
      { text: 'Both — they are the same structure', isCorrect: false, misconceptionId: `${NEURODEG}:M1` },
      { text: 'Neither — this describes a Parkinson\'s hallmark', isCorrect: false },
    ],
    correctValue: 'Amyloid-beta plaques',
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    targetedMisconceptions: [`${NEURODEG}:M1`],
    source: NEURODEG_SRC,
  },
  {
    conceptId: NEURODEG, subjectSlug: 'biology', probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'A student says "Parkinson\'s disease is just generalised neuron loss across the whole ' +
      'brain." What is the best response?',
    choices: [
      {
        text: 'Wrong — Parkinson\'s selectively kills dopaminergic neurons in the substantia ' +
          'nigra, which is why symptoms are specifically motor-related',
        isCorrect: true,
      },
      {
        text: 'Correct — all neurodegenerative diseases involve uniform brain-wide neuron loss',
        isCorrect: false,
        misconceptionId: `${NEURODEG}:M2`,
      },
    ],
    correctValue: 'Wrong — Parkinson\'s selectively kills dopaminergic neurons in the substantia ' +
      'nigra, which is why symptoms are specifically motor-related',
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    targetedMisconceptions: [`${NEURODEG}:M2`],
    source: NEURODEG_SRC,
  },
  {
    conceptId: NEURODEG, subjectSlug: 'biology', probeKind: 'short_answer',
    gradeBand: GradeBand.HIGH,
    stem: 'What shared mechanistic theme connects Alzheimer\'s and Parkinson\'s disease despite ' +
      'their different specific proteins and affected brain regions?',
    choices: [
      { text: 'Protein misfolding and aggregation', isCorrect: true },
      { text: 'Loss of the same specific neuron type in both diseases', isCorrect: false },
      { text: 'Both diseases are caused by the same single protein', isCorrect: false },
    ],
    correctValue: 'Protein misfolding and aggregation',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [],
    source: NEURODEG_SRC,
  },
]

// ─── bio.div.fish-amphibian-diversity ────────────────────────────────────────
const FISHAMPH = 'bio.div.fish-amphibian-diversity'
const FISHAMPH_SRC = 'educational-brain/concepts/biology/bio.div.fish-amphibian-diversity.md'
const FISHAMPH_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: FISHAMPH, subjectSlug: 'biology', familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'Fish diversity spans three groups distinguished by a specific jaw-and-skeleton checklist: ' +
      'jawless fish (lampreys, hagfish) lack true jaws entirely, the most ancestral living ' +
      'vertebrate condition; cartilaginous fish (sharks, rays) have true jaws with a cartilage ' +
      'skeleton; bony fish have true jaws AND a true bone skeleton. The amphibian water-to-land ' +
      'transition required two specific anatomical prerequisites: limbs (replacing fins) to ' +
      'support body weight against gravity without water\'s buoyancy, and lungs (supplementing ' +
      'gills) to extract oxygen from air. Amphibian metamorphosis is a discrete developmental ' +
      'transformation — a gill-breathing, aquatic larva (tadpole) becomes a lung-breathing, ' +
      'limbed, partly terrestrial adult. Critically, despite these adult land adaptations, ' +
      'amphibians remain fundamentally dependent on water for REPRODUCTION — their eggs lack a ' +
      'protective, desiccation-resistant covering, so the water-to-land transition is PARTIAL, ' +
      'not complete.',
    targetedMisconceptions: [],
    source: FISHAMPH_SRC,
  },
  {
    conceptId: FISHAMPH, subjectSlug: 'biology', familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      'Two mistakes are common. First, students assume amphibians completed a FULL water-to-land ' +
      'transition because adults can live on land, missing that reproduction remains water- ' +
      'dependent (unprotected eggs, often aquatic larvae) — the transition is only partial. ' +
      'Second, students classify fish by habitat or size rather than the specific jaw-presence ' +
      'and skeletal-composition checklist, missing that a shark and a trout are distinguished by ' +
      'cartilage-versus-bone, not by size or "typical fish" appearance.',
    targetedMisconceptions: [`${FISHAMPH}:M1`, `${FISHAMPH}:M2`],
    source: FISHAMPH_SRC,
  },
]
const FISHAMPH_PROBES: SeedProbe[] = [
  {
    conceptId: FISHAMPH, subjectSlug: 'biology', probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'Could a typical amphibian complete its entire life cycle on dry land with no access ' +
      'to water?',
    choices: [
      { text: 'No — its reproductive stage (eggs, often larvae) remains water-dependent', isCorrect: true },
      { text: 'Yes — amphibians have fully transitioned away from water dependence', isCorrect: false, misconceptionId: `${FISHAMPH}:M1` },
      { text: 'Yes, as long as it has lungs', isCorrect: false, misconceptionId: `${FISHAMPH}:M1` },
      { text: 'This cannot be determined without knowing the species', isCorrect: false },
    ],
    correctValue: 'No — its reproductive stage (eggs, often larvae) remains water-dependent',
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    targetedMisconceptions: [`${FISHAMPH}:M1`],
    source: FISHAMPH_SRC,
  },
  {
    conceptId: FISHAMPH, subjectSlug: 'biology', probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'A student classifies an unfamiliar fish as "cartilaginous" simply because it is large ' +
      'and predatory-looking. What is the best response?',
    choices: [
      {
        text: 'Wrong — classification requires checking jaw presence and then skeletal ' +
          'composition (cartilage vs. bone), not size or appearance',
        isCorrect: true,
      },
      {
        text: 'Correct — size and predatory appearance are sufficient to classify any fish',
        isCorrect: false,
        misconceptionId: `${FISHAMPH}:M2`,
      },
    ],
    correctValue: 'Wrong — classification requires checking jaw presence and then skeletal ' +
      'composition (cartilage vs. bone), not size or appearance',
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    targetedMisconceptions: [`${FISHAMPH}:M2`],
    source: FISHAMPH_SRC,
  },
  {
    conceptId: FISHAMPH, subjectSlug: 'biology', probeKind: 'short_answer',
    gradeBand: GradeBand.HIGH,
    stem: 'What specific anatomical feature allows a land vertebrate to extract oxygen directly ' +
      'from air rather than relying on water-dissolved oxygen?',
    choices: [
      { text: 'Lungs', isCorrect: true },
      { text: 'Limbs', isCorrect: false },
      { text: 'A cartilage skeleton', isCorrect: false },
    ],
    correctValue: 'Lungs',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [],
    source: FISHAMPH_SRC,
  },
]

// ─── bio.div.reptile-bird-diversity ───────────────────────────────────────────
const REPTBIRD = 'bio.div.reptile-bird-diversity'
const REPTBIRD_SRC = 'educational-brain/concepts/biology/bio.div.reptile-bird-diversity.md'
const REPTBIRD_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: REPTBIRD, subjectSlug: 'biology', familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'The amniotic egg is the specific innovation that solved amphibians\' remaining aquatic- ' +
      'reproduction limitation: internal protective membranes (including the amnion, a ' +
      'fluid-filled internal environment) enclosed within a desiccation-resistant shell let the ' +
      'embryo develop without the egg being laid in water. Reptile diversity spans squamates ' +
      '(lizards, snakes), turtles, and crocodilians, all unified by this innovation. Critically, ' +
      'birds are NOT a separate lineage merely related to dinosaurs — birds are NESTED WITHIN ' +
      'Reptilia, specifically within theropod dinosaurs, meaning birds are technically a ' +
      'surviving dinosaur (and reptile) lineage, a precise phylogenetic claim supported by ' +
      'fossil and molecular evidence. Birds\' skeletal (lightweight, pneumatic bones), ' +
      'respiratory (efficient unidirectional airflow via air sacs), and metabolic (high ' +
      'metabolic rate) adaptations each trace to a specific functional demand of powered ' +
      'flight: reduced mass, efficient oxygen delivery, and sustained energy output.',
    targetedMisconceptions: [],
    source: REPTBIRD_SRC,
  },
  {
    conceptId: REPTBIRD, subjectSlug: 'biology', familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      'Two mistakes are common. First, students treat birds as a separate lineage that merely ' +
      'shares an ancestor with dinosaurs/reptiles, missing the precise nested claim: birds ARE a ' +
      'surviving theropod dinosaur lineage, not just a related "cousin" group. Second, students ' +
      'memorise bird flight adaptations (light bones, efficient airflow, high metabolism) as an ' +
      'unconnected list of facts, missing that each adaptation traces to a specific functional ' +
      'demand of powered flight — reduced mass, efficient oxygen delivery, or sustained energy ' +
      'output.',
    targetedMisconceptions: [`${REPTBIRD}:M1`, `${REPTBIRD}:M2`],
    source: REPTBIRD_SRC,
  },
]
const REPTBIRD_PROBES: SeedProbe[] = [
  {
    conceptId: REPTBIRD, subjectSlug: 'biology', probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'Is it more phylogenetically accurate to say birds are "related to" dinosaurs, or that ' +
      'birds "are" a type of dinosaur?',
    choices: [
      { text: 'Birds ARE a surviving lineage of theropod dinosaurs — a nested relationship', isCorrect: true },
      { text: 'Birds are merely related to dinosaurs, having split from a shared ancestor', isCorrect: false, misconceptionId: `${REPTBIRD}:M1` },
      { text: 'Birds and dinosaurs are unrelated groups that evolved flight independently', isCorrect: false, misconceptionId: `${REPTBIRD}:M1` },
      { text: 'The phylogenetic relationship between birds and dinosaurs is unknown', isCorrect: false },
    ],
    correctValue: 'Birds ARE a surviving lineage of theropod dinosaurs — a nested relationship',
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    targetedMisconceptions: [`${REPTBIRD}:M1`],
    source: REPTBIRD_SRC,
  },
  {
    conceptId: REPTBIRD, subjectSlug: 'biology', probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'A student lists "hollow bones, efficient breathing, high metabolism" as just random ' +
      'facts about birds. What is the best response?',
    choices: [
      {
        text: 'Each adaptation solves a specific flight demand: hollow bones reduce mass, ' +
          'efficient airflow delivers oxygen, high metabolism supplies sustained energy',
        isCorrect: true,
      },
      {
        text: 'Correct — these are simply unconnected facts about birds',
        isCorrect: false,
        misconceptionId: `${REPTBIRD}:M2`,
      },
    ],
    correctValue: 'Each adaptation solves a specific flight demand: hollow bones reduce mass, ' +
      'efficient airflow delivers oxygen, high metabolism supplies sustained energy',
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    targetedMisconceptions: [`${REPTBIRD}:M2`],
    source: REPTBIRD_SRC,
  },
  {
    conceptId: REPTBIRD, subjectSlug: 'biology', probeKind: 'short_answer',
    gradeBand: GradeBand.HIGH,
    stem: 'What specific problem does the amniotic egg solve that amphibian eggs could not?',
    choices: [
      { text: 'It lets the embryo develop without the egg being laid in water', isCorrect: true },
      { text: 'It makes the embryo grow faster', isCorrect: false },
      { text: 'It allows the embryo to breathe underwater indefinitely', isCorrect: false },
    ],
    correctValue: 'It lets the embryo develop without the egg being laid in water',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [],
    source: REPTBIRD_SRC,
  },
]

// ─── bio.div.mammalian-diversity ─────────────────────────────────────────────
const MAMMAL = 'bio.div.mammalian-diversity'
const MAMMAL_SRC = 'educational-brain/concepts/biology/bio.div.mammalian-diversity.md'
const MAMMAL_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: MAMMAL, subjectSlug: 'biology', familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'Mammalia is defined by four features: hair, mammary glands (producing milk), endothermy, ' +
      'and a single lower jawbone paired with three middle-ear bones (malleus, incus, stapes) — ' +
      'some reptilian jaw bones were evolutionarily repurposed into these ear ossicles. ' +
      'Mammalian reproduction shows three genuinely different, currently-viable solutions within ' +
      'the SAME clade, not a primitive-to-advanced ladder: monotremes (platypus, echidna) lay ' +
      'eggs yet still nurse young with milk; marsupials (kangaroos) give birth to live but very ' +
      'immature young that complete development in a pouch; placental mammals give birth after ' +
      'a much longer period of internal development via the placenta. Placental mammals\' ' +
      'subsequent ecological radiation followed a SPECIFIC historical opportunity — ecological ' +
      'niches opening after the mass extinction that eliminated non-avian dinosaurs — a ' +
      'contingent historical pattern, not an inevitable outcome.',
    targetedMisconceptions: [],
    source: MAMMAL_SRC,
  },
  {
    conceptId: MAMMAL, subjectSlug: 'biology', familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      'Two mistakes are common. First, students treat monotreme-marsupial-placental as a linear ' +
      'evolutionary progression from primitive to advanced, missing that all three are currently ' +
      'viable, fully mammalian solutions coexisting within the same clade — a living platypus is ' +
      'not "stuck at an earlier stage." Second, students treat placental mammals\' ecological ' +
      'dominance as inevitable, missing that it reflects a contingent historical opportunity (the ' +
      'post-extinction ecological space opening up), not a predetermined destiny.',
    targetedMisconceptions: [`${MAMMAL}:M1`, `${MAMMAL}:M2`],
    source: MAMMAL_SRC,
  },
]
const MAMMAL_PROBES: SeedProbe[] = [
  {
    conceptId: MAMMAL, subjectSlug: 'biology', probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'Is a living platypus (a monotreme) an "earlier stage" of mammalian evolution still ' +
      'present today?',
    choices: [
      { text: 'No — monotremes are a fully modern, currently-viable lineage using a different reproductive strategy', isCorrect: true },
      { text: 'Yes — monotremes represent a primitive stage that placental mammals evolved past', isCorrect: false, misconceptionId: `${MAMMAL}:M1` },
      { text: 'Yes, since egg-laying is a reptilian trait retained by less-evolved mammals', isCorrect: false, misconceptionId: `${MAMMAL}:M1` },
      { text: 'Monotremes are not actually mammals', isCorrect: false },
    ],
    correctValue: 'No — monotremes are a fully modern, currently-viable lineage using a different reproductive strategy',
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    targetedMisconceptions: [`${MAMMAL}:M1`],
    source: MAMMAL_SRC,
  },
  {
    conceptId: MAMMAL, subjectSlug: 'biology', probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'A student says "placental mammals were always going to become ecologically dominant." ' +
      'What is the best response?',
    choices: [
      {
        text: 'Wrong — their radiation followed the specific, contingent opportunity of ' +
          'post-dinosaur-extinction ecological space opening up',
        isCorrect: true,
      },
      {
        text: 'Correct — placental dominance was a predetermined evolutionary destiny',
        isCorrect: false,
        misconceptionId: `${MAMMAL}:M2`,
      },
    ],
    correctValue: 'Wrong — their radiation followed the specific, contingent opportunity of ' +
      'post-dinosaur-extinction ecological space opening up',
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    targetedMisconceptions: [`${MAMMAL}:M2`],
    source: MAMMAL_SRC,
  },
  {
    conceptId: MAMMAL, subjectSlug: 'biology', probeKind: 'short_answer',
    gradeBand: GradeBand.HIGH,
    stem: 'Beyond hair and endothermy, what specific skeletal feature genuinely defines Mammalia?',
    choices: [
      { text: 'A single lower jawbone paired with three middle-ear bones', isCorrect: true },
      { text: 'A four-chambered heart', isCorrect: false },
      { text: 'An amniotic egg', isCorrect: false },
    ],
    correctValue: 'A single lower jawbone paired with three middle-ear bones',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [],
    source: MAMMAL_SRC,
  },
]

// ─── bio.neuro.sleep-circadian-biology ───────────────────────────────────────
const SLEEP = 'bio.neuro.sleep-circadian-biology'
const SLEEP_SRC = 'educational-brain/concepts/biology/bio.neuro.sleep-circadian-biology.md'
const SLEEP_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: SLEEP, subjectSlug: 'biology', familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'NREM sleep progresses through stages of increasingly slow, reduced brain-wave activity. ' +
      'REM sleep, by contrast, is "paradoxical" — its brain activity resembles WAKEFULNESS ' +
      'despite the person being clearly asleep, and is associated with vivid dreaming and ' +
      'muscle ATONIA (near-total loss of voluntary muscle tone), which specifically prevents the ' +
      'body from physically acting out the dream. Separately, the suprachiasmatic nucleus (SCN) ' +
      'in the hypothalamus is the master circadian pacemaker, receiving light input to entrain ' +
      'the body\'s roughly-24-hour rhythms. At the molecular level, this ~24-hour period is ' +
      'GENERATED internally by a negative-feedback loop: CLOCK and BMAL1 proteins activate PER ' +
      'and CRY gene transcription; accumulated PER/CRY proteins then INHIBIT their own further ' +
      'production; as PER/CRY levels decline, inhibition lifts and a new cycle begins — the time ' +
      'delays in this cycle produce the ~24-hour period, a self-sustaining internal oscillator ' +
      'that external light entrains but does not create.',
    targetedMisconceptions: [],
    source: SLEEP_SRC,
  },
  {
    conceptId: SLEEP, subjectSlug: 'biology', familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      'Two mistakes are common. First, students assume all sleep involves uniformly reduced ' +
      'brain activity, missing that REM sleep specifically shows wake-like brain activity — ' +
      'exactly why it is called paradoxical sleep. Second, students assume the ~24-hour ' +
      'circadian rhythm is created entirely by external light, missing that the CLOCK/BMAL1-PER/ ' +
      'CRY molecular feedback loop generates the rhythm INTERNALLY; an organism in constant ' +
      'darkness would still show a roughly 24-hour rhythm (possibly drifting slightly), since ' +
      'light entrains rather than creates the internal oscillator.',
    targetedMisconceptions: [`${SLEEP}:M1`, `${SLEEP}:M2`],
    source: SLEEP_SRC,
  },
]
const SLEEP_PROBES: SeedProbe[] = [
  {
    conceptId: SLEEP, subjectSlug: 'biology', probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'A brain-activity recording from a person confirmed to be asleep looks similar to ' +
      'wakefulness. What does this most likely indicate?',
    choices: [
      { text: 'REM sleep — its paradoxical, wake-like brain activity is a normal signature', isCorrect: true },
      { text: 'The person must actually be awake', isCorrect: false, misconceptionId: `${SLEEP}:M1` },
      { text: 'Deep NREM sleep, which always shows the most active brain patterns', isCorrect: false, misconceptionId: `${SLEEP}:M1` },
      { text: 'A recording error, since all sleep stages show reduced activity', isCorrect: false },
    ],
    correctValue: 'REM sleep — its paradoxical, wake-like brain activity is a normal signature',
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    targetedMisconceptions: [`${SLEEP}:M1`],
    source: SLEEP_SRC,
  },
  {
    conceptId: SLEEP, subjectSlug: 'biology', probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'An organism is kept in constant darkness for several weeks, with no light cues at ' +
      'all. A student predicts its circadian rhythm will disappear entirely. What is the best ' +
      'response?',
    choices: [
      {
        text: 'Wrong — the molecular clock generates the ~24-hour rhythm internally, so it ' +
          'would persist (though possibly drifting) even without light',
        isCorrect: true,
      },
      {
        text: 'Correct — without external light, there is no internal mechanism to sustain the rhythm',
        isCorrect: false,
        misconceptionId: `${SLEEP}:M2`,
      },
    ],
    correctValue: 'Wrong — the molecular clock generates the ~24-hour rhythm internally, so it ' +
      'would persist (though possibly drifting) even without light',
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    targetedMisconceptions: [`${SLEEP}:M2`],
    source: SLEEP_SRC,
  },
  {
    conceptId: SLEEP, subjectSlug: 'biology', probeKind: 'short_answer',
    gradeBand: GradeBand.HIGH,
    stem: 'What specific functional purpose does muscle atonia serve during REM sleep?',
    choices: [
      { text: 'It prevents the body from physically acting out vivid dream content', isCorrect: true },
      { text: 'It conserves energy during the deepest stage of NREM sleep', isCorrect: false },
      { text: 'It synchronises the suprachiasmatic nucleus to light cues', isCorrect: false },
    ],
    correctValue: 'It prevents the body from physically acting out vivid dream content',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [],
    source: SLEEP_SRC,
  },
]

// ─── bio.physio.blood-physiology-hemostasis ──────────────────────────────────
const HEMOSTASIS = 'bio.physio.blood-physiology-hemostasis'
const HEMOSTASIS_SRC = 'educational-brain/concepts/biology/bio.physio.blood-physiology-hemostasis.md'
const HEMOSTASIS_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: HEMOSTASIS, subjectSlug: 'biology', familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'Haemostasis is a SEQUENCE of three progressively more durable responses to vessel injury, ' +
      'not one simultaneous event. Vascular spasm (fastest, temporary) constricts the injured ' +
      'vessel. Platelet plug formation follows: platelets adhere to exposed collagen and ' +
      'aggregate into a temporary seal. The coagulation cascade comes last and slowest, ' +
      'converting fibrinogen into fibrin threads that REINFORCE (not replace) the platelet plug ' +
      'into a durable clot. Separately, ABO/Rh genetics determine transfusion compatibility ' +
      'through a specific ANTIBODY mechanism: in the ABO system, a person\'s plasma already ' +
      'contains antibodies against whichever ABO antigen(s) their own cells lack (Type A carries ' +
      'anti-B), so incompatible transfusion triggers an immediate attack; in the Rh system, an ' +
      'Rh-negative person has no anti-Rh antibodies until sensitised by a first Rh-positive ' +
      'exposure, with danger arising on subsequent exposure.',
    targetedMisconceptions: [],
    source: HEMOSTASIS_SRC,
  },
  {
    conceptId: HEMOSTASIS, subjectSlug: 'biology', familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      'Two mistakes are common. First, students treat haemostasis\'s three stages as happening ' +
      'simultaneously, or think the coagulation cascade REPLACES the platelet plug, missing the ' +
      'ordered sequence where the fibrin mesh reinforces (not replaces) the existing plug. ' +
      'Second, students describe transfusion incompatibility as a vague "blood mismatch," ' +
      'missing the specific antibody-antigen mechanism — pre-existing (ABO) or newly-sensitised ' +
      '(Rh) recipient antibodies attacking donor red blood cell surface antigens.',
    targetedMisconceptions: [`${HEMOSTASIS}:M1`, `${HEMOSTASIS}:M2`],
    source: HEMOSTASIS_SRC,
  },
]
const HEMOSTASIS_PROBES: SeedProbe[] = [
  {
    conceptId: HEMOSTASIS, subjectSlug: 'biology', probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'Once the coagulation cascade forms a fibrin mesh, what happens to the platelet plug?',
    choices: [
      { text: 'It remains and is reinforced by the fibrin mesh into a stable clot', isCorrect: true },
      { text: 'It is dissolved and completely replaced by the fibrin mesh', isCorrect: false, misconceptionId: `${HEMOSTASIS}:M1` },
      { text: 'It forms before and independently of the other two stages', isCorrect: false, misconceptionId: `${HEMOSTASIS}:M1` },
      { text: 'It has no relationship to the coagulation cascade', isCorrect: false },
    ],
    correctValue: 'It remains and is reinforced by the fibrin mesh into a stable clot',
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    targetedMisconceptions: [`${HEMOSTASIS}:M1`],
    source: HEMOSTASIS_SRC,
  },
  {
    conceptId: HEMOSTASIS, subjectSlug: 'biology', probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'A student describes a Type A patient reacting badly to a Type B transfusion as "the ' +
      'blood types just don\'t match." What is the best response?',
    choices: [
      {
        text: 'More specifically — the Type A patient\'s plasma already contains anti-B ' +
          'antibodies that attack the donor cells\' B antigens',
        isCorrect: true,
      },
      {
        text: 'That description is already fully sufficient and specific',
        isCorrect: false,
        misconceptionId: `${HEMOSTASIS}:M2`,
      },
    ],
    correctValue: 'More specifically — the Type A patient\'s plasma already contains anti-B ' +
      'antibodies that attack the donor cells\' B antigens',
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    targetedMisconceptions: [`${HEMOSTASIS}:M2`],
    source: HEMOSTASIS_SRC,
  },
  {
    conceptId: HEMOSTASIS, subjectSlug: 'biology', probeKind: 'short_answer',
    gradeBand: GradeBand.HIGH,
    stem: 'Which haemostasis stage is the fastest but only a temporary, partial measure?',
    choices: [
      { text: 'Vascular spasm', isCorrect: true },
      { text: 'Platelet plug formation', isCorrect: false },
      { text: 'The coagulation cascade', isCorrect: false },
    ],
    correctValue: 'Vascular spasm',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [],
    source: HEMOSTASIS_SRC,
  },
]

// ─── bio.physio.endocrine-disorders-feedback ─────────────────────────────────
const ENDODISORD = 'bio.physio.endocrine-disorders-feedback'
const ENDODISORD_SRC = 'educational-brain/concepts/biology/bio.physio.endocrine-disorders-feedback.md'
const ENDODISORD_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: ENDODISORD, subjectSlug: 'biology', familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'Most hormone axes use negative feedback, where a hormone\'s downstream effect suppresses ' +
      'further release once an adequate level is reached. Endocrine disorders are failures at a ' +
      'SPECIFIC point in this loop: hyper- or hypo-secretion can arise at the hormone-producing ' +
      'gland itself (primary) or at an upstream regulator controlling that gland (secondary) — ' +
      'locating WHICH link failed matters diagnostically. Oxytocin release during childbirth is ' +
      'a deliberate EXCEPTION using POSITIVE feedback: cervical stretching triggers oxytocin, ' +
      'which intensifies contractions, causing more stretching and more oxytocin — an ' +
      'escalating cycle that naturally ends at delivery, not a malfunctioning negative-feedback ' +
      'system. Separately, a hormone-RECEPTOR mutation is mechanistically distinct from an ' +
      'abnormal hormone LEVEL: in a receptor mutation, hormone levels are NORMAL but the target ' +
      'cell cannot respond, so supplying more hormone would not help.',
    targetedMisconceptions: [],
    source: ENDODISORD_SRC,
  },
  {
    conceptId: ENDODISORD, subjectSlug: 'biology', familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      'Two mistakes are common. First, students interpret oxytocin\'s escalating positive ' +
      'feedback during childbirth as evidence a negative-feedback system has malfunctioned, ' +
      'missing that it is a deliberate, functionally different mechanism suited to labour\'s need ' +
      'for escalation toward a defined endpoint. Second, students conflate a hormone-receptor ' +
      'mutation with an abnormal hormone level, missing that a receptor mutation involves NORMAL ' +
      'hormone levels with a defective response — so more hormone would not fix it, unlike a true ' +
      'deficiency.',
    targetedMisconceptions: [`${ENDODISORD}:M1`, `${ENDODISORD}:M2`],
    source: ENDODISORD_SRC,
  },
]
const ENDODISORD_PROBES: SeedProbe[] = [
  {
    conceptId: ENDODISORD, subjectSlug: 'biology', probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'During childbirth, oxytocin release increases contractions, which triggers even more ' +
      'oxytocin release. What does this escalating pattern indicate?',
    choices: [
      { text: 'A deliberate positive-feedback mechanism suited to labour\'s need for escalation toward delivery', isCorrect: true },
      { text: 'A malfunctioning negative-feedback system', isCorrect: false, misconceptionId: `${ENDODISORD}:M1` },
      { text: 'A dangerous hormonal imbalance requiring immediate correction', isCorrect: false, misconceptionId: `${ENDODISORD}:M1` },
      { text: 'An unrelated, coincidental hormone spike', isCorrect: false },
    ],
    correctValue: 'A deliberate positive-feedback mechanism suited to labour\'s need for escalation toward delivery',
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    targetedMisconceptions: [`${ENDODISORD}:M1`],
    source: ENDODISORD_SRC,
  },
  {
    conceptId: ENDODISORD, subjectSlug: 'biology', probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'A patient has completely normal hormone levels but shows symptoms of hormone ' +
      'deficiency. A student suggests giving more of that hormone will fix it. What is the best ' +
      'response?',
    choices: [
      {
        text: 'Not necessarily — if the receptor is defective, more hormone will not help; ' +
          'levels and receptor function are mechanistically distinct issues',
        isCorrect: true,
      },
      {
        text: 'Correct — any deficiency-like symptom is fixed by supplying more hormone',
        isCorrect: false,
        misconceptionId: `${ENDODISORD}:M2`,
      },
    ],
    correctValue: 'Not necessarily — if the receptor is defective, more hormone will not help; ' +
      'levels and receptor function are mechanistically distinct issues',
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    targetedMisconceptions: [`${ENDODISORD}:M2`],
    source: ENDODISORD_SRC,
  },
  {
    conceptId: ENDODISORD, subjectSlug: 'biology', probeKind: 'short_answer',
    gradeBand: GradeBand.HIGH,
    stem: 'A hormone disorder could result from a problem at the hormone-producing gland itself, ' +
      'or from a problem elsewhere. Where else?',
    choices: [
      { text: 'An upstream regulator controlling that gland', isCorrect: true },
      { text: 'The target cell\'s cytoskeleton', isCorrect: false },
      { text: 'The circulatory system\'s blood volume', isCorrect: false },
    ],
    correctValue: 'An upstream regulator controlling that gland',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [],
    source: ENDODISORD_SRC,
  },
]

// ─── bio.physio.integumentary-system ─────────────────────────────────────────
const SKIN = 'bio.physio.integumentary-system'
const SKIN_SRC = 'educational-brain/concepts/biology/bio.physio.integumentary-system.md'
const SKIN_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: SKIN, subjectSlug: 'biology', familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'Skin has three layers: the epidermis (outer, physical barrier, continuously renewing), ' +
      'the dermis (connective tissue, blood vessels, nerve endings, glands), and the hypodermis ' +
      '(fat and connective tissue for insulation and cushioning). Skin\'s function extends far ' +
      'beyond covering: protection (barrier against pathogens, injury, UV), thermoregulation ' +
      '(vasodilation/constriction, sweating), sensation (dermal mechanoreceptors, ' +
      'thermoreceptors, nociceptors), and vitamin D synthesis (UV-triggered precursor synthesis, ' +
      'further processed by liver and kidneys) — four DISTINCT physiological roles. Wound ' +
      'healing proceeds through four ordered, overlapping stages: haemostasis (immediate), ' +
      'inflammation (immune cells clear debris, causing redness/swelling), proliferation (new ' +
      'tissue, collagen, blood vessels built), and remodelling — the FINAL and LONGEST stage, ' +
      'during which collagen is reorganised and strengthened over weeks to months.',
    targetedMisconceptions: [],
    source: SKIN_SRC,
  },
  {
    conceptId: SKIN, subjectSlug: 'biology', familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      'Two mistakes are common. First, students treat skin\'s function as essentially just ' +
      'covering/protecting, missing that thermoregulation, sensation, and vitamin D synthesis ' +
      'are separate, specific physiological functions. Second, students treat wound healing as a ' +
      'single undifferentiated event, missing the ordered four-stage sequence — and specifically ' +
      'missing that remodelling, the least visually dramatic stage, is actually the LONGEST, ' +
      'during which most of the wound\'s eventual tensile strength develops.',
    targetedMisconceptions: [`${SKIN}:M1`, `${SKIN}:M2`],
    source: SKIN_SRC,
  },
]
const SKIN_PROBES: SeedProbe[] = [
  {
    conceptId: SKIN, subjectSlug: 'biology', probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'A condition impairs ONLY skin\'s vitamin-D-synthesis capacity, leaving its barrier ' +
      'function intact. What specific consequence would you predict?',
    choices: [
      { text: 'Increased risk of vitamin D deficiency', isCorrect: true },
      { text: 'No consequence, since skin\'s only real job is covering the body', isCorrect: false, misconceptionId: `${SKIN}:M1` },
      { text: 'Increased risk of infection from loss of the physical barrier', isCorrect: false, misconceptionId: `${SKIN}:M1` },
      { text: 'Impaired wound healing specifically', isCorrect: false },
    ],
    correctValue: 'Increased risk of vitamin D deficiency',
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    targetedMisconceptions: [`${SKIN}:M1`],
    source: SKIN_SRC,
  },
  {
    conceptId: SKIN, subjectSlug: 'biology', probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'A wound looks visually closed after two weeks. A student says healing is now ' +
      'essentially complete. What is the best response?',
    choices: [
      {
        text: 'Not quite — remodelling, the longest stage, continues for weeks to months after ' +
          'visual closure, still strengthening the tissue',
        isCorrect: true,
      },
      {
        text: 'Correct — visual closure means the healing process has fully finished',
        isCorrect: false,
        misconceptionId: `${SKIN}:M2`,
      },
    ],
    correctValue: 'Not quite — remodelling, the longest stage, continues for weeks to months after ' +
      'visual closure, still strengthening the tissue',
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    targetedMisconceptions: [`${SKIN}:M2`],
    source: SKIN_SRC,
  },
  {
    conceptId: SKIN, subjectSlug: 'biology', probeKind: 'short_answer',
    gradeBand: GradeBand.HIGH,
    stem: 'Which wound-healing stage produces the visible redness, heat, and swelling as immune ' +
      'cells clear debris and pathogens?',
    choices: [
      { text: 'Inflammation', isCorrect: true },
      { text: 'Haemostasis', isCorrect: false },
      { text: 'Remodelling', isCorrect: false },
    ],
    correctValue: 'Inflammation',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [],
    source: SKIN_SRC,
  },
]

// ─── bio.physio.homeostasis-thermoregulation ─────────────────────────────────
const THERMOREG = 'bio.physio.homeostasis-thermoregulation'
const THERMOREG_SRC = 'educational-brain/concepts/biology/bio.physio.homeostasis-thermoregulation.md'
const THERMOREG_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: THERMOREG, subjectSlug: 'biology', familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'Negative feedback is the general control-loop logic behind homeostasis: a deviation from ' +
      'a set point is detected, triggering a response that OPPOSES the deviation, pushing the ' +
      'variable back toward the set point. Thermoregulation is the clearest worked example: the ' +
      'hypothalamus monitors blood temperature against a set point, triggering heat-loss ' +
      'responses (vasodilation AND sweating, together) when temperature rises above it, and ' +
      'heat-generation responses (vasoconstriction AND shivering, together) when it falls below ' +
      'it — each pair is a COORDINATED output of one feedback loop, not independent reflexes. ' +
      'Osmoregulation (already covered via ADH in the excretory system) is a second worked ' +
      'example of the SAME general structure — set point, deviation detector, counteracting ' +
      'response — simply applied to blood osmolarity instead of temperature.',
    targetedMisconceptions: [],
    source: THERMOREG_SRC,
  },
  {
    conceptId: THERMOREG, subjectSlug: 'biology', familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      'Two mistakes are common. First, students interpret "negative feedback" using its ' +
      'everyday sense (bad, critical), missing that "negative" here describes only the ' +
      'response\'s DIRECTION — opposing the deviation — a normal, healthy, constantly-running ' +
      'process, not a sign of malfunction. Second, students treat sweating, shivering, and ' +
      'vasodilation/constriction as independent, disconnected reflexes, missing that ' +
      'vasodilation+sweating (heat loss) and vasoconstriction+shivering (heat generation) are ' +
      'each COORDINATED pairs triggered together by the same hypothalamic signal.',
    targetedMisconceptions: [`${THERMOREG}:M1`, `${THERMOREG}:M2`],
    source: THERMOREG_SRC,
  },
]
const THERMOREG_PROBES: SeedProbe[] = [
  {
    conceptId: THERMOREG, subjectSlug: 'biology', probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'A physiological process is described as using "negative feedback." What does this tell you?',
    choices: [
      { text: 'The response opposes the deviation, restoring the set point — a normal, healthy process', isCorrect: true },
      { text: 'Something is going wrong in the body', isCorrect: false, misconceptionId: `${THERMOREG}:M1` },
      { text: 'The feedback is harmful and should be corrected medically', isCorrect: false, misconceptionId: `${THERMOREG}:M1` },
      { text: 'The process amplifies the original deviation', isCorrect: false },
    ],
    correctValue: 'The response opposes the deviation, restoring the set point — a normal, healthy process',
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    targetedMisconceptions: [`${THERMOREG}:M1`],
    source: THERMOREG_SRC,
  },
  {
    conceptId: THERMOREG, subjectSlug: 'biology', probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'A student observes vasodilation occurring and treats it as an isolated reflex ' +
      'unrelated to anything else happening. What is the best response?',
    choices: [
      {
        text: 'Vasodilation is coordinated with sweating as part of the same heat-loss response ' +
          'triggered by the hypothalamus',
        isCorrect: true,
      },
      {
        text: 'Correct — each thermoregulatory response occurs independently of the others',
        isCorrect: false,
        misconceptionId: `${THERMOREG}:M2`,
      },
    ],
    correctValue: 'Vasodilation is coordinated with sweating as part of the same heat-loss response ' +
      'triggered by the hypothalamus',
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    targetedMisconceptions: [`${THERMOREG}:M2`],
    source: THERMOREG_SRC,
  },
  {
    conceptId: THERMOREG, subjectSlug: 'biology', probeKind: 'short_answer',
    gradeBand: GradeBand.HIGH,
    stem: 'What general structure do thermoregulation and osmoregulation share, despite ' +
      'monitoring different variables?',
    choices: [
      { text: 'A set point, a deviation detector, and a counteracting negative-feedback response', isCorrect: true },
      { text: 'Both are controlled exclusively by the kidneys', isCorrect: false },
      { text: 'Both use positive feedback loops', isCorrect: false },
    ],
    correctValue: 'A set point, a deviation detector, and a counteracting negative-feedback response',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [],
    source: THERMOREG_SRC,
  },
]

// ─── bio.physio.lymphatic-system-detail ──────────────────────────────────────
const LYMPH = 'bio.physio.lymphatic-system-detail'
const LYMPH_SRC = 'educational-brain/concepts/biology/bio.physio.lymphatic-system-detail.md'
const LYMPH_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: LYMPH, subjectSlug: 'biology', familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'The lymphatic system forms a ONE-WAY drainage network, structurally distinct from blood\'s ' +
      'closed loop: fluid that leaks from blood capillaries into tissue is collected as lymph and ' +
      'flows in one direction toward the central venous circulation. Along the way, lymph passes ' +
      'through lymph nodes, which perform two distinct immune functions — filtering pathogens ' +
      'and debris, and hosting antigen presentation to T and B lymphocytes. This gives the ' +
      'lymphatic system a genuine DUAL role: fluid balance (returning leaked fluid to the ' +
      'bloodstream) and immune surveillance — two SEPARATE functions in the same system, ' +
      'demonstrated by the fact that a drainage disruption does not necessarily disrupt immune ' +
      'function. Lymphedema results SPECIFICALLY from impaired LYMPHATIC drainage (e.g., after ' +
      'lymph node removal), mechanistically distinct from swelling caused by general circulatory ' +
      '(blood-vessel) problems.',
    targetedMisconceptions: [],
    source: LYMPH_SRC,
  },
  {
    conceptId: LYMPH, subjectSlug: 'biology', familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      'Two mistakes are common. First, students treat the lymphatic system as having one ' +
      'undifferentiated function (usually just immune defence), missing that fluid balance and ' +
      'immune surveillance are two genuinely SEPARATE functions performed by the same system. ' +
      'Second, students conflate lymphedema with general circulatory swelling, missing that ' +
      'lymphedema specifically results from impaired LYMPHATIC drainage, a mechanistically ' +
      'distinct cause from a blood-vessel problem like venous insufficiency.',
    targetedMisconceptions: [`${LYMPH}:M1`, `${LYMPH}:M2`],
    source: LYMPH_SRC,
  },
]
const LYMPH_PROBES: SeedProbe[] = [
  {
    conceptId: LYMPH, subjectSlug: 'biology', probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'A patient has damaged lymphatic vessels causing localised swelling, but no accompanying ' +
      'immune deficiency. What does this demonstrate?',
    choices: [
      { text: 'The lymphatic system\'s fluid-balance and immune-surveillance roles are separable', isCorrect: true },
      { text: 'The lymphatic system has only one undifferentiated function', isCorrect: false, misconceptionId: `${LYMPH}:M1` },
      { text: 'This scenario is impossible, since both roles must fail together', isCorrect: false, misconceptionId: `${LYMPH}:M1` },
      { text: 'The lymphatic system has no immune function at all', isCorrect: false },
    ],
    correctValue: 'The lymphatic system\'s fluid-balance and immune-surveillance roles are separable',
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    targetedMisconceptions: [`${LYMPH}:M1`],
    source: LYMPH_SRC,
  },
  {
    conceptId: LYMPH, subjectSlug: 'biology', probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'A patient develops swelling after lymph node removal during cancer surgery. A student ' +
      'attributes this to a general circulatory (blood-vessel) problem. What is the best response?',
    choices: [
      {
        text: 'Wrong — this is lymphedema, caused specifically by impaired lymphatic drainage, ' +
          'not a blood-vessel problem',
        isCorrect: true,
      },
      {
        text: 'Correct — lymphedema and circulatory swelling are the same underlying condition',
        isCorrect: false,
        misconceptionId: `${LYMPH}:M2`,
      },
    ],
    correctValue: 'Wrong — this is lymphedema, caused specifically by impaired lymphatic drainage, ' +
      'not a blood-vessel problem',
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    targetedMisconceptions: [`${LYMPH}:M2`],
    source: LYMPH_SRC,
  },
  {
    conceptId: LYMPH, subjectSlug: 'biology', probeKind: 'short_answer',
    gradeBand: GradeBand.HIGH,
    stem: 'In which direction does lymph flow through the lymphatic vessels?',
    choices: [
      { text: 'One-way, from peripheral tissues toward the central venous circulation', isCorrect: true },
      { text: 'In a closed loop, circulating continuously like blood', isCorrect: false },
      { text: 'Bidirectionally, depending on local pressure', isCorrect: false },
    ],
    correctValue: 'One-way, from peripheral tissues toward the central venous circulation',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [],
    source: LYMPH_SRC,
  },
]

// ─── bio.physio.muscle-physiology-energetics ─────────────────────────────────
const MUSCLEPHYS = 'bio.physio.muscle-physiology-energetics'
const MUSCLEPHYS_SRC = 'educational-brain/concepts/biology/bio.physio.muscle-physiology-energetics.md'
const MUSCLEPHYS_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: MUSCLEPHYS, subjectSlug: 'biology', familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'A motor unit is one motor neuron plus all the fibres it innervates. Increasing muscle ' +
      'force does not mean existing motor units fire "harder" — instead, ADDITIONAL motor units ' +
      'are recruited by the size principle: small, fatigue-resistant units first, larger, more ' +
      'powerful (but faster-fatiguing) units only as more force is needed. Slow-twitch ' +
      '(oxidative) fibres are fatigue-resistant, suited to endurance activity; fast-twitch ' +
      '(glycolytic) fibres contract rapidly and forcefully but fatigue quickly, suited to ' +
      'short, intense activity. Muscle contraction draws on three ATP sources that each become ' +
      'DOMINANT over a different timescale, not simultaneously from the start: creatine ' +
      'phosphate (fastest, first few seconds), anaerobic glycolysis (dominant over the next ~30 ' +
      'seconds to 2 minutes), and oxidative phosphorylation (dominant for sustained activity ' +
      'beyond that window, slower to ramp up but far higher total yield).',
    targetedMisconceptions: [],
    source: MUSCLEPHYS_SRC,
  },
  {
    conceptId: MUSCLEPHYS, subjectSlug: 'biology', familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      'Two mistakes are common. First, students assume increasing force means the same motor ' +
      'units simply work harder, missing that graded force comes from RECRUITING additional, ' +
      'progressively larger motor units per the size principle. Second, students assume all ' +
      'three ATP sources (creatine phosphate, anaerobic glycolysis, oxidative phosphorylation) ' +
      'contribute equally from the very start of activity, missing that each becomes dominant ' +
      'over a specific, different, sequential timescale.',
    targetedMisconceptions: [`${MUSCLEPHYS}:M1`, `${MUSCLEPHYS}:M2`],
    source: MUSCLEPHYS_SRC,
  },
]
const MUSCLEPHYS_PROBES: SeedProbe[] = [
  {
    conceptId: MUSCLEPHYS, subjectSlug: 'biology', probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'A person lifts a progressively heavier object. According to the size principle, what ' +
      'happens as more force is needed?',
    choices: [
      { text: 'Additional, progressively larger motor units are recruited', isCorrect: true },
      { text: 'The same motor units already active simply fire more intensely', isCorrect: false, misconceptionId: `${MUSCLEPHYS}:M1` },
      { text: 'Only fast-twitch fibres become active, replacing slow-twitch fibres entirely', isCorrect: false, misconceptionId: `${MUSCLEPHYS}:M1` },
      { text: 'Force output cannot be increased beyond the initially recruited units', isCorrect: false },
    ],
    correctValue: 'Additional, progressively larger motor units are recruited',
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    targetedMisconceptions: [`${MUSCLEPHYS}:M1`],
    source: MUSCLEPHYS_SRC,
  },
  {
    conceptId: MUSCLEPHYS, subjectSlug: 'biology', probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'A student says "creatine phosphate, anaerobic glycolysis, and oxidative ' +
      'phosphorylation all contribute equally from the very first second of a sprint." What is ' +
      'the best response?',
    choices: [
      {
        text: 'Wrong — creatine phosphate dominates the first few seconds, glycolysis dominates ' +
          'next, and oxidative phosphorylation dominates sustained activity',
        isCorrect: true,
      },
      {
        text: 'Correct — all three sources contribute equally throughout any activity',
        isCorrect: false,
        misconceptionId: `${MUSCLEPHYS}:M2`,
      },
    ],
    correctValue: 'Wrong — creatine phosphate dominates the first few seconds, glycolysis dominates ' +
      'next, and oxidative phosphorylation dominates sustained activity',
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    targetedMisconceptions: [`${MUSCLEPHYS}:M2`],
    source: MUSCLEPHYS_SRC,
  },
  {
    conceptId: MUSCLEPHYS, subjectSlug: 'biology', probeKind: 'short_answer',
    gradeBand: GradeBand.HIGH,
    stem: 'A marathon runner\'s muscles rely heavily on which fibre type, and why?',
    choices: [
      { text: 'Slow-twitch (oxidative) fibres, because they are highly fatigue-resistant', isCorrect: true },
      { text: 'Fast-twitch (glycolytic) fibres, because they contract most rapidly', isCorrect: false },
      { text: 'Neither type matters for endurance activity', isCorrect: false },
    ],
    correctValue: 'Slow-twitch (oxidative) fibres, because they are highly fatigue-resistant',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [],
    source: MUSCLEPHYS_SRC,
  },
]

// ─── bio.physio.exercise-physiology ──────────────────────────────────────────
const EXERCISE = 'bio.physio.exercise-physiology'
const EXERCISE_SRC = 'educational-brain/concepts/biology/bio.physio.exercise-physiology.md'
const EXERCISE_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: EXERCISE, subjectSlug: 'biology', familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'Exercise triggers responses at two different timescales. Acute responses occur ' +
      'immediately during a single bout of exercise and are largely reversible (heart rate, ' +
      'breathing rate, and blood-flow redistribution to active muscles). Chronic training ' +
      'adaptations, by contrast, are durable structural/functional changes accumulating over ' +
      'weeks to months of repeated training and persist beyond any single session. Training type ' +
      'produces specific, DIFFERENT chronic adaptations: aerobic training chronically increases ' +
      'mitochondrial density and shifts fibre composition somewhat toward oxidative; anaerobic ' +
      '(resistance) training produces hypertrophy and rapid-force capacity with less ' +
      'mitochondrial change. VO2 max is an INTEGRATIVE measure jointly limited by BOTH oxygen ' +
      'delivery (cardiovascular capacity) AND oxygen use (mitochondrial density) — a limitation ' +
      'in either alone constrains it, so genuine improvement typically requires adaptations in ' +
      'both systems together.',
    targetedMisconceptions: [],
    source: EXERCISE_SRC,
  },
  {
    conceptId: EXERCISE, subjectSlug: 'biology', familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      'Two mistakes are common. First, students conflate acute exercise responses with chronic ' +
      'training adaptations, treating chronic adaptations as simply a bigger version of the acute ' +
      'response, missing that acute responses reverse quickly while chronic adaptations persist ' +
      'as durable structural remodelling built over weeks to months. Second, students attribute ' +
      'VO2 max to cardiovascular capacity alone, missing that it is jointly limited by BOTH ' +
      'delivery and use capacity — excellent cardiovascular fitness paired with low ' +
      'mitochondrial density still yields a constrained VO2 max.',
    targetedMisconceptions: [`${EXERCISE}:M1`, `${EXERCISE}:M2`],
    source: EXERCISE_SRC,
  },
]
const EXERCISE_PROBES: SeedProbe[] = [
  {
    conceptId: EXERCISE, subjectSlug: 'biology', probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'A person\'s resting heart rate is measured immediately after a single workout, versus ' +
      'again after three months of consistent training. What distinguishes these two ' +
      'measurements?',
    choices: [
      { text: 'The first reflects an acute, reversible response; the second reflects a durable chronic adaptation', isCorrect: true },
      { text: 'Both reflect the exact same underlying process, just at different intensities', isCorrect: false, misconceptionId: `${EXERCISE}:M1` },
      { text: 'Both are acute responses that will fully reverse within hours', isCorrect: false, misconceptionId: `${EXERCISE}:M1` },
      { text: 'Neither measurement reflects anything meaningful about training', isCorrect: false },
    ],
    correctValue: 'The first reflects an acute, reversible response; the second reflects a durable chronic adaptation',
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    targetedMisconceptions: [`${EXERCISE}:M1`],
    source: EXERCISE_SRC,
  },
  {
    conceptId: EXERCISE, subjectSlug: 'biology', probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'An individual has excellent cardiovascular capacity but very low muscle mitochondrial ' +
      'density. A student predicts their VO2 max will be maximally high. What is the best ' +
      'response?',
    choices: [
      {
        text: 'No — VO2 max is jointly limited by both delivery and use capacity, so low ' +
          'mitochondrial density would constrain it despite good cardiovascular fitness',
        isCorrect: true,
      },
      {
        text: 'Correct — cardiovascular capacity alone determines VO2 max',
        isCorrect: false,
        misconceptionId: `${EXERCISE}:M2`,
      },
    ],
    correctValue: 'No — VO2 max is jointly limited by both delivery and use capacity, so low ' +
      'mitochondrial density would constrain it despite good cardiovascular fitness',
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    targetedMisconceptions: [`${EXERCISE}:M2`],
    source: EXERCISE_SRC,
  },
  {
    conceptId: EXERCISE, subjectSlug: 'biology', probeKind: 'short_answer',
    gradeBand: GradeBand.HIGH,
    stem: 'Which chronic adaptation is specific to anaerobic (resistance) training rather than ' +
      'aerobic training?',
    choices: [
      { text: 'Increased muscle fibre cross-sectional area (hypertrophy)', isCorrect: true },
      { text: 'Increased mitochondrial density', isCorrect: false },
      { text: 'Increased capillary density around muscle fibres', isCorrect: false },
    ],
    correctValue: 'Increased muscle fibre cross-sectional area (hypertrophy)',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [],
    source: EXERCISE_SRC,
  },
]

// ─── bio.physio.comparative-animal-physiology ────────────────────────────────
const COMPPHYS = 'bio.physio.comparative-animal-physiology'
const COMPPHYS_SRC = 'educational-brain/concepts/biology/bio.physio.comparative-animal-physiology.md'
const COMPPHYS_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: COMPPHYS, subjectSlug: 'biology', familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'All four gas-exchange strategies — gills, tracheal systems, book lungs, alveolar lungs — ' +
      'solve the SAME surface-area-to-volume constraint: as body size increases, oxygen-hungry ' +
      'volume grows faster than external surface area, so each strategy increases effective ' +
      'surface area through a different specific structure. Open and closed circulatory systems ' +
      'differ by a specific structural criterion: closed systems keep fluid continuously within ' +
      'vessels; open systems (many insects, molluscs) let hemolymph directly bathe tissues in an ' +
      'open hemocoel before returning to circulation — both are genuinely viable, successful ' +
      'strategies, not a "better vs. worse" ranking. Osmoregulatory strategies differ by habitat ' +
      'because each presents a different specific osmotic challenge: marine animals fight water ' +
      'LOSS (drinking seawater, excreting excess salt), freshwater animals fight water GAIN ' +
      '(dilute urine, retaining salt), and terrestrial animals fight DESICCATION (water-' +
      'conserving adaptations).',
    targetedMisconceptions: [],
    source: COMPPHYS_SRC,
  },
  {
    conceptId: COMPPHYS, subjectSlug: 'biology', familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      'Two mistakes are common. First, students treat open circulatory systems as an inferior, ' +
      '"less evolved" version of closed systems, missing that both are genuinely different, ' +
      'functionally successful strategies used by vast numbers of thriving animal groups. Second, ' +
      'students treat osmoregulation as one generic "manage water balance" strategy applied ' +
      'everywhere, missing that marine, freshwater, and terrestrial habitats present different, ' +
      'often OPPOSITE specific osmotic challenges requiring correspondingly different specific ' +
      'counter-strategies.',
    targetedMisconceptions: [`${COMPPHYS}:M1`, `${COMPPHYS}:M2`],
    source: COMPPHYS_SRC,
  },
]
const COMPPHYS_PROBES: SeedProbe[] = [
  {
    conceptId: COMPPHYS, subjectSlug: 'biology', probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'Is an open circulatory system (used by many insects and molluscs) a failed attempt at ' +
      'a closed system?',
    choices: [
      { text: 'No — it is a genuinely different, functionally successful structural solution', isCorrect: true },
      { text: 'Yes — it is an inferior, less-evolved version of closed circulation', isCorrect: false, misconceptionId: `${COMPPHYS}:M1` },
      { text: 'Yes, since fluid is never contained within any vessels at all', isCorrect: false, misconceptionId: `${COMPPHYS}:M1` },
      { text: 'Open circulatory systems do not actually exist in any living animal', isCorrect: false },
    ],
    correctValue: 'No — it is a genuinely different, functionally successful structural solution',
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    targetedMisconceptions: [`${COMPPHYS}:M1`],
    source: COMPPHYS_SRC,
  },
  {
    conceptId: COMPPHYS, subjectSlug: 'biology', probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'A student says a freshwater fish and a marine fish "both just manage water balance the ' +
      'same generic way." What is the best response?',
    choices: [
      {
        text: 'Wrong — they face opposite osmotic challenges: the freshwater fish fights water ' +
          'gain (dilute urine, retains salt), the marine fish fights water loss (drinks ' +
          'seawater, excretes salt)',
        isCorrect: true,
      },
      {
        text: 'Correct — both fish use the identical osmoregulatory strategy',
        isCorrect: false,
        misconceptionId: `${COMPPHYS}:M2`,
      },
    ],
    correctValue: 'Wrong — they face opposite osmotic challenges: the freshwater fish fights water ' +
      'gain (dilute urine, retains salt), the marine fish fights water loss (drinks ' +
      'seawater, excretes salt)',
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    targetedMisconceptions: [`${COMPPHYS}:M2`],
    source: COMPPHYS_SRC,
  },
  {
    conceptId: COMPPHYS, subjectSlug: 'biology', probeKind: 'short_answer',
    gradeBand: GradeBand.HIGH,
    stem: 'What underlying physical constraint do gills, tracheal systems, book lungs, and ' +
      'alveolar lungs all specifically solve?',
    choices: [
      { text: 'The surface-area-to-volume constraint (volume grows faster than surface area as size increases)', isCorrect: true },
      { text: 'The need to circulate blood in a closed loop', isCorrect: false },
      { text: 'The need to conserve water in a terrestrial environment', isCorrect: false },
    ],
    correctValue: 'The surface-area-to-volume constraint (volume grows faster than surface area as size increases)',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [],
    source: COMPPHYS_SRC,
  },
]

// ─── bio.plant.plant-tissue-systems ──────────────────────────────────────────
const PLANTTISSUE = 'bio.plant.plant-tissue-systems'
const PLANTTISSUE_SRC = 'educational-brain/concepts/biology/bio.plant.plant-tissue-systems.md'
const PLANTTISSUE_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: PLANTTISSUE, subjectSlug: 'biology', familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'Meristematic tissue consists of actively-dividing, undifferentiated cells driving growth ' +
      '(apical meristems at tips for length; lateral meristems along sides for width), while ' +
      'permanent tissue has already differentiated into specialised, generally non-dividing ' +
      'form. Permanent tissue organises into three systems classified by FUNCTIONAL role: dermal ' +
      '(outer covering, protection), ground (bulk of the plant body — photosynthesis, storage, ' +
      'structural support), and vascular (long-distance transport). Within vascular tissue, xylem ' +
      'transports water/minerals in ONE FIXED direction — upward from roots, driven by ' +
      'transpiration pull — while phloem transports photosynthate from a "source" (currently ' +
      'producing/releasing sugar) to a "sink" (currently consuming/storing sugar), meaning its ' +
      'direction is NOT fixed but depends on which structures are currently sources versus sinks.',
    targetedMisconceptions: [],
    source: PLANTTISSUE_SRC,
  },
  {
    conceptId: PLANTTISSUE, subjectSlug: 'biology', familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      'Two mistakes are common. First, students assume phloem transports in the same fixed ' +
      'upward direction as xylem, missing that phloem\'s direction depends on the current ' +
      'source-to-sink relationship and can vary (e.g., a storage root can be a sink while growing, ' +
      'then a source when its reserves are mobilised). Second, students classify tissue systems by ' +
      'anatomical LOCATION alone ("outer layer," "middle," "veins"), missing that the correct ' +
      'classification criterion is FUNCTIONAL role — protection, photosynthesis/storage/support, ' +
      'or transport.',
    targetedMisconceptions: [`${PLANTTISSUE}:M1`, `${PLANTTISSUE}:M2`],
    source: PLANTTISSUE_SRC,
  },
]
const PLANTTISSUE_PROBES: SeedProbe[] = [
  {
    conceptId: PLANTTISSUE, subjectSlug: 'biology', probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'A storage root releases its sugar reserves to support new shoot growth. In which ' +
      'direction does phloem transport flow in this scenario?',
    choices: [
      { text: 'From the root (source) to the growing shoot (sink)', isCorrect: true },
      { text: 'Always upward, from roots to shoot, just like xylem', isCorrect: false, misconceptionId: `${PLANTTISSUE}:M1` },
      { text: 'Phloem cannot transport sugar in this scenario at all', isCorrect: false, misconceptionId: `${PLANTTISSUE}:M1` },
      { text: 'Downward only, regardless of source-sink relationships', isCorrect: false },
    ],
    correctValue: 'From the root (source) to the growing shoot (sink)',
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    targetedMisconceptions: [`${PLANTTISSUE}:M1`],
    source: PLANTTISSUE_SRC,
  },
  {
    conceptId: PLANTTISSUE, subjectSlug: 'biology', probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'A tissue is described only by its function — it stores starch reserves. A student ' +
      'says they cannot classify it without first knowing its location in the plant. What is the ' +
      'best response?',
    choices: [
      {
        text: 'Not needed — storage is a ground-tissue functional role, so this can be ' +
          'classified as ground tissue by function alone',
        isCorrect: true,
      },
      {
        text: 'Correct — tissue systems can only be classified by their anatomical location',
        isCorrect: false,
        misconceptionId: `${PLANTTISSUE}:M2`,
      },
    ],
    correctValue: 'Not needed — storage is a ground-tissue functional role, so this can be ' +
      'classified as ground tissue by function alone',
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    targetedMisconceptions: [`${PLANTTISSUE}:M2`],
    source: PLANTTISSUE_SRC,
  },
  {
    conceptId: PLANTTISSUE, subjectSlug: 'biology', probeKind: 'short_answer',
    gradeBand: GradeBand.HIGH,
    stem: 'What is the key functional difference between meristematic tissue and permanent tissue?',
    choices: [
      { text: 'Meristematic cells retain the capacity to divide; permanent tissue cells have differentiated and generally do not divide', isCorrect: true },
      { text: 'Meristematic tissue is always found underground; permanent tissue is always above ground', isCorrect: false },
      { text: 'Meristematic tissue only transports water; permanent tissue only transports sugar', isCorrect: false },
    ],
    correctValue: 'Meristematic cells retain the capacity to divide; permanent tissue cells have differentiated and generally do not divide',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [],
    source: PLANTTISSUE_SRC,
  },
]

// ─── bio.plant.secondary-growth-anatomy ──────────────────────────────────────
const SECGROWTH = 'bio.plant.secondary-growth-anatomy'
const SECGROWTH_SRC = 'educational-brain/concepts/biology/bio.plant.secondary-growth-anatomy.md'
const SECGROWTH_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: SECGROWTH, subjectSlug: 'biology', familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'Secondary growth (growth in girth) is driven by two SEPARATE lateral meristems producing ' +
      'different tissue. The vascular cambium produces secondary XYLEM inward and secondary ' +
      'PHLOEM outward. The cork cambium, further outward, produces periderm (cork cells) that ' +
      'replaces the epidermis as the stem thickens. Wood is accumulated secondary xylem; bark is ' +
      'a LOCATION-based term (everything outside the vascular cambium), a composite of current ' +
      'secondary phloem plus periderm — not a single uniform material. Annual growth rings record ' +
      'SEASONAL variation in cambial activity rate: favourable conditions (spring) produce larger, ' +
      'thinner-walled xylem cells; less favourable conditions (later in the season) produce ' +
      'smaller, thicker-walled cells — the contrast at the transition creates the visible ring.',
    targetedMisconceptions: [],
    source: SECGROWTH_SRC,
  },
  {
    conceptId: SECGROWTH, subjectSlug: 'biology', familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      'Two mistakes are common. First, students treat bark as a single uniform tissue type, ' +
      'missing that it is defined by LOCATION (everything outside the vascular cambium) and ' +
      'includes multiple genuinely different tissues — current secondary phloem plus periderm. ' +
      'Second, students treat growth rings as an arbitrary, generic age marker, missing the ' +
      'specific mechanism: seasonal variation in cambial activity rate producing a cell-size/ ' +
      'wall-thickness contrast, meaning ring WIDTH itself reflects how favourable a given year\'s ' +
      'growing conditions were.',
    targetedMisconceptions: [`${SECGROWTH}:M1`, `${SECGROWTH}:M2`],
    source: SECGROWTH_SRC,
  },
]
const SECGROWTH_PROBES: SeedProbe[] = [
  {
    conceptId: SECGROWTH, subjectSlug: 'biology', probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'A cross-section shows two distinct tissue layers, both located outside the vascular ' +
      'cambium. Are both considered part of "bark"?',
    choices: [
      { text: 'Yes — bark is defined by location (outside the vascular cambium), not by being one uniform tissue', isCorrect: true },
      { text: 'No — only one of the two layers can be "bark" since bark is a single tissue type', isCorrect: false, misconceptionId: `${SECGROWTH}:M1` },
      { text: 'No — bark refers only to secondary xylem', isCorrect: false, misconceptionId: `${SECGROWTH}:M1` },
      { text: 'This cannot be determined without knowing the tree\'s age', isCorrect: false },
    ],
    correctValue: 'Yes — bark is defined by location (outside the vascular cambium), not by being one uniform tissue',
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    targetedMisconceptions: [`${SECGROWTH}:M1`],
    source: SECGROWTH_SRC,
  },
  {
    conceptId: SECGROWTH, subjectSlug: 'biology', probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'A student says growth rings are "just an arbitrary marker, like tally marks, unrelated ' +
      'to actual growing conditions." What is the best response?',
    choices: [
      {
        text: 'Wrong — ring width reflects the cambium\'s actual activity rate; a dry year would ' +
          'produce a narrower ring than a wet year',
        isCorrect: true,
      },
      {
        text: 'Correct — growth rings are simply arbitrary, generic age markers',
        isCorrect: false,
        misconceptionId: `${SECGROWTH}:M2`,
      },
    ],
    correctValue: 'Wrong — ring width reflects the cambium\'s actual activity rate; a dry year would ' +
      'produce a narrower ring than a wet year',
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    targetedMisconceptions: [`${SECGROWTH}:M2`],
    source: SECGROWTH_SRC,
  },
  {
    conceptId: SECGROWTH, subjectSlug: 'biology', probeKind: 'short_answer',
    gradeBand: GradeBand.HIGH,
    stem: 'Which lateral meristem produces the periderm (cork) that replaces the epidermis as a ' +
      'stem thickens?',
    choices: [
      { text: 'The cork cambium', isCorrect: true },
      { text: 'The vascular cambium', isCorrect: false },
      { text: 'The apical meristem', isCorrect: false },
    ],
    correctValue: 'The cork cambium',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [],
    source: SECGROWTH_SRC,
  },
]

// ─── bio.repro.animal-reproductive-strategies ────────────────────────────────
const REPROSTRAT = 'bio.repro.animal-reproductive-strategies'
const REPROSTRAT_SRC = 'educational-brain/concepts/biology/bio.repro.animal-reproductive-strategies.md'
const REPROSTRAT_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: REPROSTRAT, subjectSlug: 'biology', familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'Oviparity, viviparity, and ovoviviparity require checking TWO criteria independently: ' +
      'WHERE development occurs (internal or external) and WHAT nutrient source is used (egg ' +
      'reserves or direct maternal transfer). Oviparity: external development, egg-based ' +
      'nutrition. Viviparity: internal development, direct maternal nutrient transfer (via ' +
      'placenta). Ovoviviparity is the combination often missed: internal development (like ' +
      'viviparity) but egg-based nutrition (like oviparity) — some sharks and reptiles. Parental ' +
      'investment theory predicts a trade-off following directly from finite resources: more ' +
      'investment per offspring means fewer total offspring, and vice versa. r-selected and ' +
      'K-selected strategies are the two ENDS of a life-history CONTINUUM, not a strict binary — ' +
      'r-selected clusters toward high offspring number and minimal per-offspring investment; ' +
      'K-selected clusters toward low offspring number and substantial investment; most species ' +
      'fall somewhere between.',
    targetedMisconceptions: [],
    source: REPROSTRAT_SRC,
  },
  {
    conceptId: REPROSTRAT, subjectSlug: 'biology', familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      'Two mistakes are common. First, students classify ovoviviparity using only ONE criterion ' +
      '(usually just "internal development," conflating it with viviparity), missing that its ' +
      'defining feature is the specific COMBINATION of internal development with egg-based ' +
      'nutrition. Second, students treat r-selected and K-selected as a strict either/or binary, ' +
      'missing that they describe two ends of a continuum — a species with a moderate mix of ' +
      'traits falls somewhere between the extremes, not forced into one box.',
    targetedMisconceptions: [`${REPROSTRAT}:M1`, `${REPROSTRAT}:M2`],
    source: REPROSTRAT_SRC,
  },
]
const REPROSTRAT_PROBES: SeedProbe[] = [
  {
    conceptId: REPROSTRAT, subjectSlug: 'biology', probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'An organism\'s embryos develop INSIDE the mother but rely primarily on nutrients ' +
      'stored WITHIN the egg, not direct maternal transfer. What reproductive mode is this?',
    choices: [
      { text: 'Ovoviviparity — internal development with egg-based nutrition', isCorrect: true },
      { text: 'Viviparity, since development occurs internally', isCorrect: false, misconceptionId: `${REPROSTRAT}:M1` },
      { text: 'Oviparity, since nutrition comes from the egg', isCorrect: false, misconceptionId: `${REPROSTRAT}:M1` },
      { text: 'This combination cannot occur in any real organism', isCorrect: false },
    ],
    correctValue: 'Ovoviviparity — internal development with egg-based nutrition',
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    targetedMisconceptions: [`${REPROSTRAT}:M1`],
    source: REPROSTRAT_SRC,
  },
  {
    conceptId: REPROSTRAT, subjectSlug: 'biology', probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'A species produces a moderate number of offspring with moderate parental care. A ' +
      'student insists it must be classified as strictly r-selected or strictly K-selected. ' +
      'What is the best response?',
    choices: [
      {
        text: 'Not necessarily — r/K selection is a continuum, so this species may simply fall ' +
          'somewhere between the two extremes',
        isCorrect: true,
      },
      {
        text: 'Correct — every species must be classified as either purely r-selected or purely K-selected',
        isCorrect: false,
        misconceptionId: `${REPROSTRAT}:M2`,
      },
    ],
    correctValue: 'Not necessarily — r/K selection is a continuum, so this species may simply fall ' +
      'somewhere between the two extremes',
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    targetedMisconceptions: [`${REPROSTRAT}:M2`],
    source: REPROSTRAT_SRC,
  },
  {
    conceptId: REPROSTRAT, subjectSlug: 'biology', probeKind: 'short_answer',
    gradeBand: GradeBand.HIGH,
    stem: 'Why does investing more resources per offspring predict fewer total offspring, given ' +
      'parental investment theory?',
    choices: [
      { text: 'Because total reproductive resources are finite and must be divided among fewer, more heavily-invested offspring', isCorrect: true },
      { text: 'Because more-invested offspring are biologically incapable of having siblings', isCorrect: false },
      { text: 'There is no real relationship between investment per offspring and total offspring number', isCorrect: false },
    ],
    correctValue: 'Because total reproductive resources are finite and must be divided among fewer, more heavily-invested offspring',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [],
    source: REPROSTRAT_SRC,
  },
]

// ─── bio.repro.hormonal-regulation-reproduction-detail ───────────────────────
const HPGAXIS = 'bio.repro.hormonal-regulation-reproduction-detail'
const HPGAXIS_SRC = 'educational-brain/concepts/biology/bio.repro.hormonal-regulation-reproduction-detail.md'
const HPGAXIS_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: HPGAXIS, subjectSlug: 'biology', familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'The hypothalamic-pituitary-gonadal (HPG) axis regulates reproduction: the hypothalamus ' +
      'secretes GnRH, stimulating the pituitary to release LH and FSH, which act on the gonads. ' +
      'Critically, GnRH must be secreted in a PULSATILE pattern (discrete bursts) for the axis to ' +
      'function normally — this pulsatile pattern drives the menstrual cycle\'s hormonal pattern. ' +
      'CONTINUOUS (non-pulsatile) GnRH exposure does NOT sustain normal function — it causes ' +
      'pituitary receptor desensitisation, actually SUPPRESSING LH/FSH release, the OPPOSITE ' +
      'effect from pulsatile stimulation. This directly explains hormonal contraception\'s ' +
      'mechanism: maintaining steady, continuous hormone levels suppresses the normal pulsatile ' +
      'pattern needed to trigger ovulation — the contraceptive prevents ovulation UPSTREAM, it ' +
      'does not mechanically block sperm or fertilisation.',
    targetedMisconceptions: [],
    source: HPGAXIS_SRC,
  },
  {
    conceptId: HPGAXIS, subjectSlug: 'biology', familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      'Two mistakes are common. First, students assume continuous GnRH exposure provides MORE ' +
      'stimulation than pulsatile exposure ("more constant signal = more effect"), missing that ' +
      'continuous exposure actually SUPPRESSES the axis via receptor desensitisation — the ' +
      'opposite of pulsatile stimulation\'s effect. Second, students describe hormonal ' +
      'contraception as directly, mechanically blocking sperm or fertilisation, missing that its ' +
      'actual mechanism suppresses the HPG axis to prevent OVULATION entirely, far upstream of ' +
      'fertilisation.',
    targetedMisconceptions: [`${HPGAXIS}:M1`, `${HPGAXIS}:M2`],
    source: HPGAXIS_SRC,
  },
]
const HPGAXIS_PROBES: SeedProbe[] = [
  {
    conceptId: HPGAXIS, subjectSlug: 'biology', probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'Compared to pulsatile GnRH administration, what effect does CONTINUOUS GnRH exposure ' +
      'have on LH/FSH release?',
    choices: [
      { text: 'It suppresses LH/FSH release via pituitary receptor desensitisation', isCorrect: true },
      { text: 'It stimulates even greater LH/FSH release than pulsatile exposure', isCorrect: false, misconceptionId: `${HPGAXIS}:M1` },
      { text: 'It has exactly the same effect as pulsatile exposure', isCorrect: false, misconceptionId: `${HPGAXIS}:M1` },
      { text: 'It has no effect on the HPG axis at all', isCorrect: false },
    ],
    correctValue: 'It suppresses LH/FSH release via pituitary receptor desensitisation',
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    targetedMisconceptions: [`${HPGAXIS}:M1`],
    source: HPGAXIS_SRC,
  },
  {
    conceptId: HPGAXIS, subjectSlug: 'biology', probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'A student says "hormonal contraceptive pills physically block sperm from reaching an ' +
      'egg." What is the best response?',
    choices: [
      {
        text: 'Wrong — they suppress the HPG axis to prevent ovulation entirely; if there is no ' +
          'egg, fertilisation cannot occur regardless of sperm',
        isCorrect: true,
      },
      {
        text: 'Correct — hormonal contraceptives work by mechanically blocking sperm',
        isCorrect: false,
        misconceptionId: `${HPGAXIS}:M2`,
      },
    ],
    correctValue: 'Wrong — they suppress the HPG axis to prevent ovulation entirely; if there is no ' +
      'egg, fertilisation cannot occur regardless of sperm',
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    targetedMisconceptions: [`${HPGAXIS}:M2`],
    source: HPGAXIS_SRC,
  },
  {
    conceptId: HPGAXIS, subjectSlug: 'biology', probeKind: 'short_answer',
    gradeBand: GradeBand.HIGH,
    stem: 'What hormone does the hypothalamus secrete to initiate the HPG axis cascade?',
    choices: [
      { text: 'GnRH (gonadotropin-releasing hormone)', isCorrect: true },
      { text: 'LH (luteinising hormone)', isCorrect: false },
      { text: 'Oestrogen', isCorrect: false },
    ],
    correctValue: 'GnRH (gonadotropin-releasing hormone)',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [],
    source: HPGAXIS_SRC,
  },
]

// ─── bio.neuro.autonomic-stress-physiology ───────────────────────────────────
const STRESSPHYS = 'bio.neuro.autonomic-stress-physiology'
const STRESSPHYS_SRC = 'educational-brain/concepts/biology/bio.neuro.autonomic-stress-physiology.md'
const STRESSPHYS_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: STRESSPHYS, subjectSlug: 'biology', familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'The body\'s stress response runs through two systems on DIFFERENT timescales. The ' +
      'autonomic nervous system is FAST (seconds): sympathetic dominance triggers fight-or-flight ' +
      '(increased heart rate, blood diverted to muscle), parasympathetic dominance triggers ' +
      'rest-and-digest — these are not an on/off switch but a continuous dynamic balance. The ' +
      'HPA axis is SLOWER (minutes to hours): hypothalamus -> pituitary -> adrenal glands -> ' +
      'cortisol. Cortisol\'s effects (mobilising energy, suppressing non-urgent processes like ' +
      'immunity and digestion, sharpening attention) are ADAPTIVE in the short term. The SAME ' +
      'response becomes damaging under CHRONIC activation — allostatic load — because a system ' +
      'evolved for brief, resolving activation is instead run continuously, with the very ' +
      'mechanisms that make it adaptive acutely (energy mobilisation, reprioritisation) becoming ' +
      'costly when never switched off.',
    targetedMisconceptions: [],
    source: STRESSPHYS_SRC,
  },
  {
    conceptId: STRESSPHYS, subjectSlug: 'biology', familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      'Two mistakes are common. First, students treat cortisol and the stress response as simply ' +
      'harmful, missing that they are ADAPTIVE in the acute, short-term case and only become ' +
      'damaging under chronic, unresolved activation. Second, students conflate the fast neural ' +
      '(autonomic) and slow hormonal (HPA axis) stress pathways into one undifferentiated ' +
      '"stress response," missing their genuinely different mechanisms and timescales — a heart ' +
      'rate spike (seconds) would appear before a cortisol elevation (minutes) after a sudden ' +
      'threat.',
    targetedMisconceptions: [`${STRESSPHYS}:M1`, `${STRESSPHYS}:M2`],
    source: STRESSPHYS_SRC,
  },
]
const STRESSPHYS_PROBES: SeedProbe[] = [
  {
    conceptId: STRESSPHYS, subjectSlug: 'biology', probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'A single brief stressful event triggers a cortisol spike that resolves shortly after. ' +
      'Is this cortisol response harmful?',
    choices: [
      { text: 'No — this brief, resolving activation is adaptive; harm arises specifically from chronic, unresolved activation', isCorrect: true },
      { text: 'Yes — cortisol is inherently toxic to the body', isCorrect: false, misconceptionId: `${STRESSPHYS}:M1` },
      { text: 'Yes, since any cortisol release indicates the stress response has failed', isCorrect: false, misconceptionId: `${STRESSPHYS}:M1` },
      { text: 'This cannot be determined without further information', isCorrect: false },
    ],
    correctValue: 'No — this brief, resolving activation is adaptive; harm arises specifically from chronic, unresolved activation',
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    targetedMisconceptions: [`${STRESSPHYS}:M1`],
    source: STRESSPHYS_SRC,
  },
  {
    conceptId: STRESSPHYS, subjectSlug: 'biology', probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'After a sudden fright, which physiological change would you expect to occur FIRST — a ' +
      'heart rate spike or a rise in blood cortisol?',
    choices: [
      {
        text: 'The heart rate spike — the autonomic (neural) pathway acts in seconds, while the ' +
          'HPA axis (hormonal) pathway takes minutes',
        isCorrect: true,
      },
      {
        text: 'Both occur at exactly the same instant, since they are the same underlying system',
        isCorrect: false,
        misconceptionId: `${STRESSPHYS}:M2`,
      },
    ],
    correctValue: 'The heart rate spike — the autonomic (neural) pathway acts in seconds, while the ' +
      'HPA axis (hormonal) pathway takes minutes',
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    targetedMisconceptions: [`${STRESSPHYS}:M2`],
    source: STRESSPHYS_SRC,
  },
  {
    conceptId: STRESSPHYS, subjectSlug: 'biology', probeKind: 'short_answer',
    gradeBand: GradeBand.HIGH,
    stem: 'What is the term for the cumulative physiological cost of a stress response system ' +
      'that keeps being invoked when it should be resting?',
    choices: [
      { text: 'Allostatic load', isCorrect: true },
      { text: 'Homeostasis', isCorrect: false },
      { text: 'Sympathetic dominance', isCorrect: false },
    ],
    correctValue: 'Allostatic load',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [],
    source: STRESSPHYS_SRC,
  },
]

// ─── bio.plant.seed-germination-dormancy ─────────────────────────────────────
const SEEDGERM = 'bio.plant.seed-germination-dormancy'
const SEEDGERM_SRC = 'educational-brain/concepts/biology/bio.plant.seed-germination-dormancy.md'
const SEEDGERM_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: SEEDGERM, subjectSlug: 'biology', familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'A seed contains a protective seed coat, an embryo, and endosperm/cotyledons storing food ' +
      'reserves. Many seeds do not germinate immediately due to DORMANCY, which comes in two ' +
      'mechanistically different types. Physiological dormancy is an INTERNAL hormonal block ' +
      '(e.g., abscisic acid relative to gibberellin) preventing germination regardless of ' +
      'external conditions until internal changes occur. Physical dormancy is a STRUCTURAL ' +
      'barrier — an impermeable seed coat — preventing germination until physically breached ' +
      '(abrasion, fire, digestive passage), regardless of the embryo\'s own readiness. These are ' +
      'independent mechanisms: a seed with resolved physiological dormancy would still not ' +
      'germinate if physical dormancy remains intact. Dormancy has genuine ADAPTIVE ' +
      'significance — preventing germination at an inappropriate time or place increases ' +
      'seedling survival odds. Environmental triggers (water, temperature, light) then signal ' +
      'suitable conditions once dormancy resolves; germination patterns are hypogeal ' +
      '(cotyledons stay underground) or epigeal (cotyledons lifted above ground).',
    targetedMisconceptions: [],
    source: SEEDGERM_SRC,
  },
  {
    conceptId: SEEDGERM, subjectSlug: 'biology', familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      'Two mistakes are common. First, students treat physiological and physical dormancy as the ' +
      'same phenomenon, missing that they require genuinely DIFFERENT triggers to overcome — ' +
      'internal hormonal change versus physical breach of the seed coat, and each can block ' +
      'germination independently of the other. Second, students interpret a seed\'s failure to ' +
      'germinate under seemingly adequate conditions as a defect or failure, missing dormancy\'s ' +
      'genuine adaptive function: preventing germination at a time or place likely to prove ' +
      'unfavourable soon after, increasing eventual seedling survival.',
    targetedMisconceptions: [`${SEEDGERM}:M1`, `${SEEDGERM}:M2`],
    source: SEEDGERM_SRC,
  },
]
const SEEDGERM_PROBES: SeedProbe[] = [
  {
    conceptId: SEEDGERM, subjectSlug: 'biology', probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'A seed has an intact, impermeable seed coat but is internally hormone-ready to ' +
      'germinate. Will it germinate?',
    choices: [
      { text: 'No — physical dormancy (the intact coat) still blocks germination independently of hormonal readiness', isCorrect: true },
      { text: 'Yes — internal hormonal readiness alone is sufficient for germination', isCorrect: false, misconceptionId: `${SEEDGERM}:M1` },
      { text: 'Yes, since physiological and physical dormancy are the same mechanism', isCorrect: false, misconceptionId: `${SEEDGERM}:M1` },
      { text: 'This scenario is biologically impossible', isCorrect: false },
    ],
    correctValue: 'No — physical dormancy (the intact coat) still blocks germination independently of hormonal readiness',
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    targetedMisconceptions: [`${SEEDGERM}:M1`],
    source: SEEDGERM_SRC,
  },
  {
    conceptId: SEEDGERM, subjectSlug: 'biology', probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'A seed does not germinate immediately after a brief rain in an otherwise dry region. A ' +
      'student calls this a defect in the seed. What is the best response?',
    choices: [
      {
        text: 'Not a defect — remaining dormant until a more reliable trigger is likely to ' +
          'produce a surviving seedling, which is dormancy\'s adaptive function',
        isCorrect: true,
      },
      {
        text: 'Correct — a seed that does not germinate under seemingly adequate conditions is malfunctioning',
        isCorrect: false,
        misconceptionId: `${SEEDGERM}:M2`,
      },
    ],
    correctValue: 'Not a defect — remaining dormant until a more reliable trigger is likely to ' +
      'produce a surviving seedling, which is dormancy\'s adaptive function',
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    targetedMisconceptions: [`${SEEDGERM}:M2`],
    source: SEEDGERM_SRC,
  },
  {
    conceptId: SEEDGERM, subjectSlug: 'biology', probeKind: 'short_answer',
    gradeBand: GradeBand.HIGH,
    stem: 'In which germination pattern do the cotyledons remain below ground as the shoot emerges?',
    choices: [
      { text: 'Hypogeal germination', isCorrect: true },
      { text: 'Epigeal germination', isCorrect: false },
      { text: 'Neither pattern involves the cotyledons at all', isCorrect: false },
    ],
    correctValue: 'Hypogeal germination',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [],
    source: SEEDGERM_SRC,
  },
]

// ─── bio.plant.plant-biotechnology-applications ──────────────────────────────
const PLANTBIOTECH = 'bio.plant.plant-biotechnology-applications'
const PLANTBIOTECH_SRC = 'educational-brain/concepts/biology/bio.plant.plant-biotechnology-applications.md'
const PLANTBIOTECH_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: PLANTBIOTECH, subjectSlug: 'biology', familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'Plant tissue culture and micropropagation specifically exploit TOTIPOTENCY — a single ' +
      'plant somatic cell\'s retained capacity to develop into a complete new organism, unlike ' +
      'most differentiated animal cells. Agrobacterium-mediated transformation is the principal ' +
      'plant genetic engineering method: the soil bacterium Agrobacterium tumefaciens NATURALLY ' +
      'transfers its own T-DNA into plant genomes as part of its infection process; engineers ' +
      'replace the bacterium\'s own tumour-inducing genes with a desired gene, letting the ' +
      'bacterium\'s existing natural machinery deliver it — hijacking an existing mechanism, not ' +
      'inventing one from scratch. Transgenic traits extend beyond pest resistance to herbicide ' +
      'tolerance and biofortification (e.g., Golden Rice\'s beta-carotene). Marker-assisted ' +
      'breeding is a NON-TRANSGENIC alternative: it uses DNA markers to select desirable ' +
      'offspring of CONVENTIONAL cross-breeding, introducing no foreign DNA at all.',
    targetedMisconceptions: [],
    source: PLANTBIOTECH_SRC,
  },
  {
    conceptId: PLANTBIOTECH, subjectSlug: 'biology', familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      'Two mistakes are common. First, students treat Agrobacterium-mediated transformation as an ' +
      'entirely artificial technology, missing that it specifically exploits Agrobacterium\'s own ' +
      'NATURAL T-DNA transfer mechanism, repurposed rather than invented from scratch. Second, ' +
      'students classify marker-assisted breeding as a form of transgenic genetic engineering, ' +
      'missing that it introduces NO foreign DNA — it merely selects among offspring of ' +
      'conventional cross-breeding using genetic markers, a fundamentally different, ' +
      'non-transgenic approach.',
    targetedMisconceptions: [`${PLANTBIOTECH}:M1`, `${PLANTBIOTECH}:M2`],
    source: PLANTBIOTECH_SRC,
  },
]
const PLANTBIOTECH_PROBES: SeedProbe[] = [
  {
    conceptId: PLANTBIOTECH, subjectSlug: 'biology', probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'Was the DNA-transfer process used in Agrobacterium-mediated transformation invented ' +
      'entirely from scratch by genetic engineers?',
    choices: [
      { text: 'No — it exploits Agrobacterium\'s own naturally-evolved T-DNA transfer mechanism', isCorrect: true },
      { text: 'Yes — it is a wholly artificial, human-engineered DNA-delivery technology', isCorrect: false, misconceptionId: `${PLANTBIOTECH}:M1` },
      { text: 'Yes, since bacteria cannot naturally transfer DNA into plant cells', isCorrect: false, misconceptionId: `${PLANTBIOTECH}:M1` },
      { text: 'The mechanism\'s origin is unknown', isCorrect: false },
    ],
    correctValue: 'No — it exploits Agrobacterium\'s own naturally-evolved T-DNA transfer mechanism',
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    targetedMisconceptions: [`${PLANTBIOTECH}:M1`],
    source: PLANTBIOTECH_SRC,
  },
  {
    conceptId: PLANTBIOTECH, subjectSlug: 'biology', probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'A student classifies marker-assisted breeding as a form of transgenic genetic ' +
      'engineering. What is the best response?',
    choices: [
      {
        text: 'Wrong — marker-assisted breeding introduces no foreign DNA; it selects among ' +
          'offspring of conventional cross-breeding using genetic markers',
        isCorrect: true,
      },
      {
        text: 'Correct — marker-assisted breeding directly inserts foreign genes like other ' +
          'transgenic methods',
        isCorrect: false,
        misconceptionId: `${PLANTBIOTECH}:M2`,
      },
    ],
    correctValue: 'Wrong — marker-assisted breeding introduces no foreign DNA; it selects among ' +
      'offspring of conventional cross-breeding using genetic markers',
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    targetedMisconceptions: [`${PLANTBIOTECH}:M2`],
    source: PLANTBIOTECH_SRC,
  },
  {
    conceptId: PLANTBIOTECH, subjectSlug: 'biology', probeKind: 'short_answer',
    gradeBand: GradeBand.HIGH,
    stem: 'What specific cellular property allows plant tissue culture and micropropagation to ' +
      'grow an entire new plant from a single somatic cell?',
    choices: [
      { text: 'Totipotency', isCorrect: true },
      { text: 'Herbicide tolerance', isCorrect: false },
      { text: 'Biofortification', isCorrect: false },
    ],
    correctValue: 'Totipotency',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [],
    source: PLANTBIOTECH_SRC,
  },
]

// ─── bio.plant.phytochrome-photoperiodic-flowering ───────────────────────────
const PHYTOCHROME = 'bio.plant.phytochrome-photoperiodic-flowering'
const PHYTOCHROME_SRC = 'educational-brain/concepts/biology/bio.plant.phytochrome-photoperiodic-flowering.md'
const PHYTOCHROME_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: PHYTOCHROME, subjectSlug: 'biology', familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'Phytochrome exists in two photo-interconvertible forms: Pr (converts to Pfr on red ' +
      'light) and Pfr (converts back to Pr on far-red light, or slowly during darkness). ' +
      'Because Pfr reverts to Pr during darkness, the Pr/Pfr ratio serves as an internal ' +
      'molecular measure of UNINTERRUPTED DARKNESS duration. This underlies the critical-night- ' +
      'length model: plants do NOT directly measure day length despite "short-day"/"long-day" ' +
      'terminology — a "short-day" plant is more precisely a "long-night" plant, flowering when ' +
      'continuous darkness exceeds a threshold. A brief light pulse during a long night resets ' +
      'the Pr/Pfr dynamics and PREVENTS flowering, proving night length (not day length) is ' +
      'measured. The actual flowering signal, florigen (FT protein), is a MOBILE signal ' +
      'produced in the LEAF but transported via vascular tissue to act at the SHOOT APEX — a ' +
      'different location entirely — further modulated by circadian gating.',
    targetedMisconceptions: [],
    source: PHYTOCHROME_SRC,
  },
  {
    conceptId: PHYTOCHROME, subjectSlug: 'biology', familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      'Two mistakes are common. First, students assume plants directly measure DAY length, ' +
      'consistent with "short-day"/"long-day" terminology, missing that plants specifically ' +
      'measure the length of continuous, uninterrupted DARKNESS — a brief light interruption ' +
      'during a long night would prevent flowering in a short-day plant, which day-length ' +
      'measurement alone could not explain. Second, students assume florigen acts in the LEAF ' +
      'where it is produced, missing that it is transported via vascular tissue to act at the ' +
      'SHOOT APEX, a physically different location.',
    targetedMisconceptions: [`${PHYTOCHROME}:M1`, `${PHYTOCHROME}:M2`],
    source: PHYTOCHROME_SRC,
  },
]
const PHYTOCHROME_PROBES: SeedProbe[] = [
  {
    conceptId: PHYTOCHROME, subjectSlug: 'biology', probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'A short-day plant is given a long night, briefly interrupted partway through by a ' +
      'flash of light. What is the most likely outcome?',
    choices: [
      { text: 'Flowering is prevented, since the light pulse resets the Pr/Pfr dynamics and breaks the continuous dark period', isCorrect: true },
      { text: 'Flowering proceeds normally, since total daylight exposure is what matters', isCorrect: false, misconceptionId: `${PHYTOCHROME}:M1` },
      { text: 'Flowering is accelerated, since more light always promotes flowering', isCorrect: false, misconceptionId: `${PHYTOCHROME}:M1` },
      { text: 'The light pulse has no effect on flowering timing at all', isCorrect: false },
    ],
    correctValue: 'Flowering is prevented, since the light pulse resets the Pr/Pfr dynamics and breaks the continuous dark period',
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    targetedMisconceptions: [`${PHYTOCHROME}:M1`],
    source: PHYTOCHROME_SRC,
  },
  {
    conceptId: PHYTOCHROME, subjectSlug: 'biology', probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'A student says florigen must act directly in the leaf, since that is where it is ' +
      'produced. What is the best response?',
    choices: [
      {
        text: 'Wrong — florigen is transported via vascular tissue to act at the shoot apex, a ' +
          'different location entirely',
        isCorrect: true,
      },
      {
        text: 'Correct — florigen exerts its flowering effect right where it is produced',
        isCorrect: false,
        misconceptionId: `${PHYTOCHROME}:M2`,
      },
    ],
    correctValue: 'Wrong — florigen is transported via vascular tissue to act at the shoot apex, a ' +
      'different location entirely',
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    targetedMisconceptions: [`${PHYTOCHROME}:M2`],
    source: PHYTOCHROME_SRC,
  },
  {
    conceptId: PHYTOCHROME, subjectSlug: 'biology', probeKind: 'short_answer',
    gradeBand: GradeBand.HIGH,
    stem: 'Which phytochrome form is generally considered the biologically active form for many ' +
      'phytochrome-mediated responses?',
    choices: [
      { text: 'Pfr', isCorrect: true },
      { text: 'Pr', isCorrect: false },
      { text: 'Neither form is more active than the other', isCorrect: false },
    ],
    correctValue: 'Pfr',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [],
    source: PHYTOCHROME_SRC,
  },
]

// ─── bio.cell.cytoskeleton-motility ───────────────────────────────────────────
const CYTOMOTILITY = 'bio.cell.cytoskeleton-motility'
const CYTOMOTILITY_SRC = 'educational-brain/concepts/biology/bio.cell.cytoskeleton-motility.md'
const CYTOMOTILITY_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: CYTOMOTILITY, subjectSlug: 'biology', familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'Actin-myosin-based cell crawling uses the SAME proteins as muscle contraction but ' +
      'organises them differently: rather than sarcomere-based synchronised shortening, a ' +
      'crawling cell extends leading-edge protrusions via localised actin polymerisation, forms ' +
      'new adhesions, and uses trailing-edge myosin contraction to pull the cell body forward — a ' +
      'directional process, not uniform contraction. Microtubule motors move cargo in OPPOSITE ' +
      'default directions along the same polar tracks: kinesin generally toward the plus-end, ' +
      'dynein toward the minus-end. The 9+2 axoneme\'s beating arises from dynein motors SLIDING ' +
      'adjacent microtubule doublets past each other; structural cross-links prevent free ' +
      'separation, converting the sliding into BENDING — the microtubules themselves never ' +
      'shorten. Cytoskeletal remodelling is continuously active during division, migration, and ' +
      'shape change.',
    targetedMisconceptions: [],
    source: CYTOMOTILITY_SRC,
  },
  {
    conceptId: CYTOMOTILITY, subjectSlug: 'biology', familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      'Two mistakes are common. First, students assume cell crawling works via the SAME ' +
      'sarcomere-based contraction mechanism as muscle, missing that crawling uses a spatially ' +
      'organised, directional process (leading-edge protrusion, trailing-edge contraction) ' +
      'rather than synchronised whole-structure shortening. Second, students attribute ciliary/ ' +
      'flagellar beating to the microtubules themselves contracting, missing that the mechanism ' +
      'is motor-driven SLIDING between adjacent doublets, converted into bending by structural ' +
      'constraints — the microtubules never change length.',
    targetedMisconceptions: [`${CYTOMOTILITY}:M1`, `${CYTOMOTILITY}:M2`],
    source: CYTOMOTILITY_SRC,
  },
]
const CYTOMOTILITY_PROBES: SeedProbe[] = [
  {
    conceptId: CYTOMOTILITY, subjectSlug: 'biology', probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'A migrating cell and a muscle fibre both use actin and myosin. Do they work through ' +
      'the same mechanism?',
    choices: [
      { text: 'No — crawling uses a directional protrusion-and-contraction process, while muscle uses synchronised sarcomere shortening', isCorrect: true },
      { text: 'Yes — shared proteins mean the underlying mechanism is identical', isCorrect: false, misconceptionId: `${CYTOMOTILITY}:M1` },
      { text: 'Yes, since both processes always shorten the whole cell uniformly', isCorrect: false, misconceptionId: `${CYTOMOTILITY}:M1` },
      { text: 'Neither process actually involves actin or myosin', isCorrect: false },
    ],
    correctValue: 'No — crawling uses a directional protrusion-and-contraction process, while muscle uses synchronised sarcomere shortening',
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    targetedMisconceptions: [`${CYTOMOTILITY}:M1`],
    source: CYTOMOTILITY_SRC,
  },
  {
    conceptId: CYTOMOTILITY, subjectSlug: 'biology', probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'A student says a beating flagellum bends because its microtubules are actively ' +
      'contracting, like a muscle fibre. What is the best response?',
    choices: [
      {
        text: 'Wrong — the bending comes from dynein-driven sliding between adjacent doublets, ' +
          'constrained by cross-links; the microtubules themselves never shorten',
        isCorrect: true,
      },
      {
        text: 'Correct — the microtubules shorten just like a muscle fibre contracting',
        isCorrect: false,
        misconceptionId: `${CYTOMOTILITY}:M2`,
      },
    ],
    correctValue: 'Wrong — the bending comes from dynein-driven sliding between adjacent doublets, ' +
      'constrained by cross-links; the microtubules themselves never shorten',
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    targetedMisconceptions: [`${CYTOMOTILITY}:M2`],
    source: CYTOMOTILITY_SRC,
  },
  {
    conceptId: CYTOMOTILITY, subjectSlug: 'biology', probeKind: 'short_answer',
    gradeBand: GradeBand.HIGH,
    stem: 'Which microtubule motor protein generally moves cargo toward the microtubule\'s ' +
      'minus-end?',
    choices: [
      { text: 'Dynein', isCorrect: true },
      { text: 'Kinesin', isCorrect: false },
      { text: 'Myosin', isCorrect: false },
    ],
    correctValue: 'Dynein',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [],
    source: CYTOMOTILITY_SRC,
  },
]

// ─── bio.cell.membrane-transport-energetics ──────────────────────────────────
const MEMBTRANSPORT = 'bio.cell.membrane-transport-energetics'
const MEMBTRANSPORT_SRC = 'educational-brain/concepts/biology/bio.cell.membrane-transport-energetics.md'
const MEMBTRANSPORT_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: MEMBTRANSPORT, subjectSlug: 'biology', familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'Membrane transport is classified by free energy relative to the electrochemical ' +
      'gradient, not by whether a protein is involved. Passive transport (simple or facilitated ' +
      'diffusion) moves a substance DOWN its gradient — thermodynamically favourable, requiring ' +
      'no direct energy input, even when a specific channel or carrier protein is needed. Active ' +
      'transport moves a substance AGAINST its gradient — thermodynamically unfavourable, ' +
      'requiring energy. Primary active transport (e.g., the sodium-potassium pump) uses ATP ' +
      'DIRECTLY. Secondary active transport uses the free energy already stored in an EXISTING ' +
      'gradient (established earlier by primary active transport) to move a different substance ' +
      'against its own gradient — via symport (same direction) or antiport (opposite ' +
      'directions). This connects directly to the Gibbs free-energy framework from chemistry ' +
      '(cross-linked to `chem.thermo.gibbs`): spontaneous processes release free energy, ' +
      'non-spontaneous ones require it — passive transport is spontaneous, active transport is ' +
      'not.',
    targetedMisconceptions: [],
    source: MEMBTRANSPORT_SRC,
  },
  {
    conceptId: MEMBTRANSPORT, subjectSlug: 'biology', familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      'Two mistakes are common. First, students classify any protein-requiring transport as ' +
      'active, missing that facilitated diffusion requires a channel/carrier protein but is ' +
      'still PASSIVE because the substance still moves down its gradient — the direction- ' +
      'relative-to-gradient test, not protein involvement, determines classification. Second, ' +
      'students treat secondary active transport as energy-free since it does not use ATP ' +
      'directly, missing that its energy traces back to ATP spent by the primary active ' +
      'transport pump that originally established the gradient being borrowed from.',
    targetedMisconceptions: [`${MEMBTRANSPORT}:M1`, `${MEMBTRANSPORT}:M2`],
    source: MEMBTRANSPORT_SRC,
  },
]
const MEMBTRANSPORT_PROBES: SeedProbe[] = [
  {
    conceptId: MEMBTRANSPORT, subjectSlug: 'biology', probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'A GLUT transporter protein moves glucose into a cell where intracellular glucose ' +
      'concentration is already lower than outside. Is this active or passive transport?',
    choices: [
      { text: 'Passive — glucose moves down its concentration gradient, despite requiring a transporter protein', isCorrect: true },
      { text: 'Active — any transport requiring a specific protein is active transport', isCorrect: false, misconceptionId: `${MEMBTRANSPORT}:M1` },
      { text: 'Active, since GLUT transporters always require ATP', isCorrect: false, misconceptionId: `${MEMBTRANSPORT}:M1` },
      { text: 'This cannot be classified without knowing the cell type', isCorrect: false },
    ],
    correctValue: 'Passive — glucose moves down its concentration gradient, despite requiring a transporter protein',
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    targetedMisconceptions: [`${MEMBTRANSPORT}:M1`],
    source: MEMBTRANSPORT_SRC,
  },
  {
    conceptId: MEMBTRANSPORT, subjectSlug: 'biology', probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'A student says the sodium-glucose symporter (secondary active transport) doesn\'t ' +
      'really require energy, since it doesn\'t use ATP directly. What is the best response?',
    choices: [
      {
        text: 'Wrong — it moves glucose against its gradient using energy borrowed from the ' +
          'sodium gradient, which was itself established earlier by an ATP-driven pump',
        isCorrect: true,
      },
      {
        text: 'Correct — since no ATP is used directly, no energy is required at all',
        isCorrect: false,
        misconceptionId: `${MEMBTRANSPORT}:M2`,
      },
    ],
    correctValue: 'Wrong — it moves glucose against its gradient using energy borrowed from the ' +
      'sodium gradient, which was itself established earlier by an ATP-driven pump',
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    targetedMisconceptions: [`${MEMBTRANSPORT}:M2`],
    source: MEMBTRANSPORT_SRC,
  },
  {
    conceptId: MEMBTRANSPORT, subjectSlug: 'biology', probeKind: 'short_answer',
    gradeBand: GradeBand.HIGH,
    stem: 'In antiport, in what directions do the two transported substances move relative to ' +
      'each other?',
    choices: [
      { text: 'Opposite directions across the membrane', isCorrect: true },
      { text: 'The same direction across the membrane', isCorrect: false },
      { text: 'Antiport only transports one substance at a time', isCorrect: false },
    ],
    correctValue: 'Opposite directions across the membrane',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [],
    source: MEMBTRANSPORT_SRC,
  },
]

// ─── bio.cell.anaerobic-respiration-fermentation ─────────────────────────────
const FERMENT = 'bio.cell.anaerobic-respiration-fermentation'
const FERMENT_SRC = 'educational-brain/concepts/biology/bio.cell.anaerobic-respiration-fermentation.md'
const FERMENT_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: FERMENT, subjectSlug: 'biology', familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'When oxygen is limiting, oxidative phosphorylation cannot run, but glycolysis can — ' +
      'producing a net 2 ATP per glucose and converting NAD+ to NADH. Without oxygen to accept ' +
      'electrons at the end of the electron transport chain, NADH cannot be reoxidised, and ' +
      'glycolysis would stall. Fermentation solves EXACTLY this problem: its essential function ' +
      'is REGENERATING NAD+ by transferring electrons to an organic molecule, not generating ' +
      'significant additional ATP. Lactic acid fermentation (muscle, bacteria) reduces pyruvate ' +
      'directly to lactate; alcoholic fermentation (yeast) converts pyruvate to ethanol and CO2 ' +
      '— two different specific end-products solving the SAME NAD+-regeneration problem. This is ' +
      'why aerobic respiration yields ~30-32 ATP per glucose while anaerobic glycolysis-plus- ' +
      'fermentation yields only 2 — the entire oxidative-phosphorylation stage is absent.',
    targetedMisconceptions: [],
    source: FERMENT_SRC,
  },
  {
    conceptId: FERMENT, subjectSlug: 'biology', familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      'Two mistakes are common. First, students assume fermentation\'s purpose is generating ' +
      'additional ATP, missing that its essential function is regenerating NAD+ so glycolysis ' +
      'can continue — fermentation itself contributes little or no extra ATP beyond glycolysis\'s ' +
      'own yield. Second, students treat lactic acid and alcoholic fermentation as unrelated ' +
      'processes because they occur in different organisms with different end-products, missing ' +
      'that both solve the identical underlying NAD+-regeneration problem via different specific ' +
      'chemical routes.',
    targetedMisconceptions: [`${FERMENT}:M1`, `${FERMENT}:M2`],
    source: FERMENT_SRC,
  },
]
const FERMENT_PROBES: SeedProbe[] = [
  {
    conceptId: FERMENT, subjectSlug: 'biology', probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'What is fermentation\'s ESSENTIAL biological function?',
    choices: [
      { text: 'Regenerating NAD+ from NADH so glycolysis can continue running', isCorrect: true },
      { text: 'Generating substantial additional ATP beyond glycolysis', isCorrect: false, misconceptionId: `${FERMENT}:M1` },
      { text: 'Directly producing oxygen for the electron transport chain', isCorrect: false, misconceptionId: `${FERMENT}:M1` },
      { text: 'Breaking down glucose into pyruvate', isCorrect: false },
    ],
    correctValue: 'Regenerating NAD+ from NADH so glycolysis can continue running',
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    targetedMisconceptions: [`${FERMENT}:M1`],
    source: FERMENT_SRC,
  },
  {
    conceptId: FERMENT, subjectSlug: 'biology', probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'A student says lactic acid fermentation and alcoholic fermentation are completely ' +
      'unrelated processes since they occur in different organisms and produce different ' +
      'products. What is the best response?',
    choices: [
      {
        text: 'Wrong — both solve the same underlying problem, regenerating NAD+ from NADH, via ' +
          'different specific chemical routes',
        isCorrect: true,
      },
      {
        text: 'Correct — different end-products mean genuinely unrelated underlying purposes',
        isCorrect: false,
        misconceptionId: `${FERMENT}:M2`,
      },
    ],
    correctValue: 'Wrong — both solve the same underlying problem, regenerating NAD+ from NADH, via ' +
      'different specific chemical routes',
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    targetedMisconceptions: [`${FERMENT}:M2`],
    source: FERMENT_SRC,
  },
  {
    conceptId: FERMENT, subjectSlug: 'biology', probeKind: 'short_answer',
    gradeBand: GradeBand.HIGH,
    stem: 'Which specific pathway step, absent under anaerobic conditions, accounts for most of ' +
      'the ATP-yield gap between aerobic and anaerobic metabolism?',
    choices: [
      { text: 'Oxidative phosphorylation', isCorrect: true },
      { text: 'Glycolysis', isCorrect: false },
      { text: 'Substrate-level phosphorylation', isCorrect: false },
    ],
    correctValue: 'Oxidative phosphorylation',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [],
    source: FERMENT_SRC,
  },
]

// ─── bio.mol.metabolic-regulation-integration ────────────────────────────────
const METABREG = 'bio.mol.metabolic-regulation-integration'
const METABREG_SRC = 'educational-brain/concepts/biology/bio.mol.metabolic-regulation-integration.md'
const METABREG_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: METABREG, subjectSlug: 'biology', familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'Feedback inhibition is a specific form of allosteric regulation: a pathway\'s own END ' +
      'PRODUCT inhibits an EARLY (typically rate-limiting) enzyme in that SAME pathway, ' +
      'automatically slowing production once enough product has accumulated — a precise, ' +
      'self-referential mechanism, not any product inhibiting any enzyme anywhere. Opposing ' +
      'pathways are coordinated hormonally: insulin (fed state) promotes glycolysis and glycogen ' +
      'synthesis while suppressing gluconeogenesis and glycogen breakdown; glucagon (fasted ' +
      'state) does the OPPOSITE. This RECIPROCAL coordination means the body shifts between two ' +
      'distinct, coherent operating modes rather than running both directions simultaneously. ' +
      'Rate-limiting enzymes are effective pharmacological targets because controlling the ' +
      'slowest, pathway-determining step efficiently controls the entire pathway\'s output.',
    targetedMisconceptions: [],
    source: METABREG_SRC,
  },
  {
    conceptId: METABREG, subjectSlug: 'biology', familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      'Two mistakes are common. First, students treat feedback inhibition as any product ' +
      'inhibiting any enzyme generically, missing the specific requirement that the inhibiting ' +
      'molecule must be the pathway\'s OWN end product acting on an EARLY enzyme in that SAME ' +
      'pathway. Second, students assume opposing pathways like glycolysis and gluconeogenesis run ' +
      'simultaneously at similar rates, missing that insulin and glucagon RECIPROCALLY coordinate ' +
      'them so one set dominates while the other is suppressed, depending on fed or fasted state.',
    targetedMisconceptions: [`${METABREG}:M1`, `${METABREG}:M2`],
    source: METABREG_SRC,
  },
]
const METABREG_PROBES: SeedProbe[] = [
  {
    conceptId: METABREG, subjectSlug: 'biology', probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'Pathway X\'s end product inhibits an enzyme belonging to a completely different, ' +
      'unrelated pathway Y. Does this qualify as feedback inhibition?',
    choices: [
      { text: 'No — feedback inhibition specifically requires the end product to inhibit an early enzyme in its OWN pathway', isCorrect: true },
      { text: 'Yes — any product inhibiting any enzyme counts as feedback inhibition', isCorrect: false, misconceptionId: `${METABREG}:M1` },
      { text: 'Yes, as long as the inhibited enzyme is rate-limiting for some pathway', isCorrect: false, misconceptionId: `${METABREG}:M1` },
      { text: 'This cannot be determined without more information', isCorrect: false },
    ],
    correctValue: 'No — feedback inhibition specifically requires the end product to inhibit an early enzyme in its OWN pathway',
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    targetedMisconceptions: [`${METABREG}:M1`],
    source: METABREG_SRC,
  },
  {
    conceptId: METABREG, subjectSlug: 'biology', probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'Shortly after eating a large meal, a student predicts the body runs glycogen synthesis ' +
      'AND glycogen breakdown simultaneously at full speed. What is the best response?',
    choices: [
      {
        text: 'Wrong — insulin release favours glycogen synthesis while suppressing glycogen ' +
          'breakdown; the two do not run simultaneously at full throttle',
        isCorrect: true,
      },
      {
        text: 'Correct — opposing metabolic pathways always run simultaneously at similar rates',
        isCorrect: false,
        misconceptionId: `${METABREG}:M2`,
      },
    ],
    correctValue: 'Wrong — insulin release favours glycogen synthesis while suppressing glycogen ' +
      'breakdown; the two do not run simultaneously at full throttle',
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    targetedMisconceptions: [`${METABREG}:M2`],
    source: METABREG_SRC,
  },
  {
    conceptId: METABREG, subjectSlug: 'biology', probeKind: 'short_answer',
    gradeBand: GradeBand.HIGH,
    stem: 'Why do drugs targeting a pathway\'s rate-limiting enzyme efficiently control that ' +
      'pathway\'s entire output?',
    choices: [
      { text: 'The rate-limiting enzyme is the slowest, pathway-controlling step, so controlling it controls the whole pathway\'s throughput', isCorrect: true },
      { text: 'Rate-limiting enzymes are always located at the very end of a pathway', isCorrect: false },
      { text: 'Targeting any single enzyme in a pathway has an identical effect on overall output', isCorrect: false },
    ],
    correctValue: 'The rate-limiting enzyme is the slowest, pathway-controlling step, so controlling it controls the whole pathway\'s throughput',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [],
    source: METABREG_SRC,
  },
]

// ─── bio.mol.protein-quality-control-autophagy ───────────────────────────────
const PROTEOSTASIS = 'bio.mol.protein-quality-control-autophagy'
const PROTEOSTASIS_SRC = 'educational-brain/concepts/biology/bio.mol.protein-quality-control-autophagy.md'
const PROTEOSTASIS_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: PROTEOSTASIS, subjectSlug: 'biology', familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'Molecular chaperones (including heat-shock proteins) ASSIST protein folding by binding ' +
      'exposed hydrophobic regions on partially-folded proteins, preventing aggregation and ' +
      'giving the protein repeated opportunities to fold correctly on its own — they do NOT ' +
      'directly template or sculpt the final structure, which is determined by the protein\'s own ' +
      'sequence. When ER misfolding exceeds normal capacity, the unfolded protein response ' +
      'reduces protein synthesis, increases chaperone production, and can trigger apoptosis if ' +
      'unresolved. Beyond folding assistance, cells maintain FOUR mechanistically distinct ' +
      'degradation routes: macroautophagy (vesicle engulfment, fuses with lysosome), ' +
      'microautophagy (direct lysosomal membrane engulfment), chaperone-mediated autophagy ' +
      '(selective, motif-based delivery of individual proteins), and the ubiquitin-proteasome ' +
      'system (ubiquitin tagging, degraded by the proteasome — entirely separate from ' +
      'lysosomes). Proteostasis collapse in neurodegenerative disease reflects a failure of the ' +
      'cell\'s OVERALL quality-control CAPACITY, not simply more misfolding events occurring by ' +
      'chance.',
    targetedMisconceptions: [],
    source: PROTEOSTASIS_SRC,
  },
  {
    conceptId: PROTEOSTASIS, subjectSlug: 'biology', familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      'Two mistakes are common. First, students describe molecular chaperones as directly ' +
      'templating or sculpting a protein\'s correct shape, missing that chaperones only ASSIST by ' +
      'preventing aggregation — removing a chaperone increases aggregation risk, but does not ' +
      'necessarily cause complete folding failure, since the protein\'s own sequence still ' +
      'determines its structure. Second, students treat all four degradation routes ' +
      '(macroautophagy, microautophagy, chaperone-mediated autophagy, ubiquitin-proteasome) as ' +
      'one undifferentiated "cellular cleanup" process, missing that each uses genuinely distinct ' +
      'structural machinery.',
    targetedMisconceptions: [`${PROTEOSTASIS}:M1`, `${PROTEOSTASIS}:M2`],
    source: PROTEOSTASIS_SRC,
  },
]
const PROTEOSTASIS_PROBES: SeedProbe[] = [
  {
    conceptId: PROTEOSTASIS, subjectSlug: 'biology', probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'A molecular chaperone is removed from a protein-folding reaction. What is the most ' +
      'likely consequence?',
    choices: [
      { text: 'Increased aggregation/misfolding risk, though the protein may still sometimes fold correctly on its own', isCorrect: true },
      { text: 'Complete, guaranteed folding failure, since the chaperone was templating the structure', isCorrect: false, misconceptionId: `${PROTEOSTASIS}:M1` },
      { text: 'No change at all, since chaperones play no real role in folding', isCorrect: false, misconceptionId: `${PROTEOSTASIS}:M1` },
      { text: 'The protein would fold into a completely different but still functional structure', isCorrect: false },
    ],
    correctValue: 'Increased aggregation/misfolding risk, though the protein may still sometimes fold correctly on its own',
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    targetedMisconceptions: [`${PROTEOSTASIS}:M1`],
    source: PROTEOSTASIS_SRC,
  },
  {
    conceptId: PROTEOSTASIS, subjectSlug: 'biology', probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'A specific, individual misfolded protein bearing a particular recognition motif is ' +
      'delivered directly across the lysosomal membrane without any vesicle forming. A student ' +
      'labels this generically as "autophagy." What is the best response?',
    choices: [
      {
        text: 'More specifically — this describes chaperone-mediated autophagy, a mechanistically ' +
          'distinct route from macroautophagy or microautophagy',
        isCorrect: true,
      },
      {
        text: 'Correct — all degradation routes are interchangeable versions of the same generic autophagy process',
        isCorrect: false,
        misconceptionId: `${PROTEOSTASIS}:M2`,
      },
    ],
    correctValue: 'More specifically — this describes chaperone-mediated autophagy, a mechanistically ' +
      'distinct route from macroautophagy or microautophagy',
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    targetedMisconceptions: [`${PROTEOSTASIS}:M2`],
    source: PROTEOSTASIS_SRC,
  },
  {
    conceptId: PROTEOSTASIS, subjectSlug: 'biology', probeKind: 'short_answer',
    gradeBand: GradeBand.HIGH,
    stem: 'Which degradation system tags proteins with ubiquitin and uses an entirely separate ' +
      'machine (not the lysosome) for degradation?',
    choices: [
      { text: 'The ubiquitin-proteasome system', isCorrect: true },
      { text: 'Macroautophagy', isCorrect: false },
      { text: 'Microautophagy', isCorrect: false },
    ],
    correctValue: 'The ubiquitin-proteasome system',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [],
    source: PROTEOSTASIS_SRC,
  },
]

// ─── bio.cell.cell-junctions-extracellular-matrix ────────────────────────────
const JUNCTIONS = 'bio.cell.cell-junctions-extracellular-matrix'
const JUNCTIONS_SRC = 'educational-brain/concepts/biology/bio.cell.cell-junctions-extracellular-matrix.md'
const JUNCTIONS_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: JUNCTIONS, subjectSlug: 'biology', familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'Three cell junction types each perform a specific, non-interchangeable function. Tight ' +
      'junctions SEAL adjacent cells, blocking substances from leaking between them (e.g., the ' +
      'gut lining). Desmosomes ANCHOR cells mechanically, resisting stress (abundant in skin and ' +
      'heart muscle). Gap junctions COMMUNICATE, forming direct channels for molecules/ions to ' +
      'pass between adjacent cells\' cytoplasm (e.g., synchronised heart muscle contraction). The ' +
      'extracellular matrix (collagen, proteoglycans, fibronectin) surrounds cells, and integrin ' +
      'receptors connect matrix components outside the cell to the cytoskeleton inside — the ECM ' +
      'is an ACTIVE structural AND signalling scaffold, transmitting signals that influence cell ' +
      'survival, proliferation, and differentiation, not passive filler.',
    targetedMisconceptions: [],
    source: JUNCTIONS_SRC,
  },
  {
    conceptId: JUNCTIONS, subjectSlug: 'biology', familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      'Two mistakes are common. First, students treat tight junctions and desmosomes as serving ' +
      'the same "holding cells together" purpose, missing the specific functional distinction: ' +
      'sealing against leakage (tight junctions) versus mechanical anchoring against stress ' +
      '(desmosomes). Second, students treat the ECM as passive structural filler with no ' +
      'signalling role, missing that integrin receptors actively transmit signals into the cell ' +
      'that influence its behaviour — disrupting ECM contact can affect cell survival, not just ' +
      'physical support.',
    targetedMisconceptions: [`${JUNCTIONS}:M1`, `${JUNCTIONS}:M2`],
    source: JUNCTIONS_SRC,
  },
]
const JUNCTIONS_PROBES: SeedProbe[] = [
  {
    conceptId: JUNCTIONS, subjectSlug: 'biology', probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'A tissue like the intestinal lining must prevent substances from leaking between ' +
      'adjacent cells. Which junction type is most directly responsible?',
    choices: [
      { text: 'Tight junctions', isCorrect: true },
      { text: 'Desmosomes, since they also hold cells together', isCorrect: false, misconceptionId: `${JUNCTIONS}:M1` },
      { text: 'Either tight junctions or desmosomes equally well', isCorrect: false, misconceptionId: `${JUNCTIONS}:M1` },
      { text: 'Gap junctions', isCorrect: false },
    ],
    correctValue: 'Tight junctions',
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    targetedMisconceptions: [`${JUNCTIONS}:M1`],
    source: JUNCTIONS_SRC,
  },
  {
    conceptId: JUNCTIONS, subjectSlug: 'biology', probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'A cell\'s contact with the extracellular matrix is experimentally disrupted. A student ' +
      'says this could only affect the cell\'s physical support, nothing else. What is the best ' +
      'response?',
    choices: [
      {
        text: 'Wrong — disrupting integrin-ECM contact can also affect the cell\'s survival, ' +
          'proliferation, or differentiation via lost signalling',
        isCorrect: true,
      },
      {
        text: 'Correct — the ECM is purely structural and has no signalling role',
        isCorrect: false,
        misconceptionId: `${JUNCTIONS}:M2`,
      },
    ],
    correctValue: 'Wrong — disrupting integrin-ECM contact can also affect the cell\'s survival, ' +
      'proliferation, or differentiation via lost signalling',
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    targetedMisconceptions: [`${JUNCTIONS}:M2`],
    source: JUNCTIONS_SRC,
  },
  {
    conceptId: JUNCTIONS, subjectSlug: 'biology', probeKind: 'short_answer',
    gradeBand: GradeBand.HIGH,
    stem: 'Which junction type enables rapid, direct chemical or electrical communication between ' +
      'adjacent cells, such as synchronising heart muscle contraction?',
    choices: [
      { text: 'Gap junctions', isCorrect: true },
      { text: 'Tight junctions', isCorrect: false },
      { text: 'Desmosomes', isCorrect: false },
    ],
    correctValue: 'Gap junctions',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [],
    source: JUNCTIONS_SRC,
  },
]

// ─── bio.mol.alternative-splicing-rna-diversity ──────────────────────────────
const SPLICING = 'bio.mol.alternative-splicing-rna-diversity'
const SPLICING_SRC = 'educational-brain/concepts/biology/bio.mol.alternative-splicing-rna-diversity.md'
const SPLICING_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: SPLICING, subjectSlug: 'biology', familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'Pre-mRNA contains exons (RETAINED, translated into protein) and introns (REMOVED before ' +
      'the mRNA matures) — splicing, performed by the spliceosome (built from snRNPs), cuts out ' +
      'introns and joins exons. Alternative splicing describes several distinct mechanisms by ' +
      'which a single pre-mRNA produces multiple mature mRNAs: exon skipping (an exon excluded ' +
      'in some versions), intron retention (an intron kept in the final sequence), alternative ' +
      '5\'/3\' splice sites (the exact cut boundary shifts), and mutually exclusive exons (only ' +
      'one of two alternative exons is ever included). This directly resolves the "gene-count ' +
      'paradox": the human genome has only ~20,000 protein-coding genes, but alternative ' +
      'splicing lets a single gene generate multiple distinct protein isoforms, producing far ' +
      'more distinct proteins than the raw gene count would suggest.',
    targetedMisconceptions: [],
    source: SPLICING_SRC,
  },
  {
    conceptId: SPLICING, subjectSlug: 'biology', familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      'Two mistakes are common. First, students invert exon/intron fates, assuming introns are ' +
      'retained and exons removed, missing that EXons are EXpressed (retained) while INtrons ' +
      'stay INside and are removed. Second, students assume the gene-count paradox (fewer genes ' +
      'than expected relative to complexity) means gene-counting methods must be flawed, missing ' +
      'that alternative splicing genuinely resolves it: complexity arises from processing ' +
      'sophistication applied to a modest number of genes, not from having more genes.',
    targetedMisconceptions: [`${SPLICING}:M1`, `${SPLICING}:M2`],
    source: SPLICING_SRC,
  },
]
const SPLICING_PROBES: SeedProbe[] = [
  {
    conceptId: SPLICING, subjectSlug: 'biology', probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'On a labelled pre-mRNA diagram, which segments will appear in the final mature mRNA?',
    choices: [
      { text: 'Exons — they are retained; introns are removed', isCorrect: true },
      { text: 'Introns — they are retained; exons are removed', isCorrect: false, misconceptionId: `${SPLICING}:M1` },
      { text: 'Both exons and introns are retained equally', isCorrect: false, misconceptionId: `${SPLICING}:M1` },
      { text: 'Neither segment type is retained', isCorrect: false },
    ],
    correctValue: 'Exons — they are retained; introns are removed',
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    targetedMisconceptions: [`${SPLICING}:M1`],
    source: SPLICING_SRC,
  },
  {
    conceptId: SPLICING, subjectSlug: 'biology', probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'The human genome has only ~20,000 protein-coding genes, yet humans have far more than ' +
      '20,000 distinct proteins. A student concludes the gene-counting method must be wrong. What ' +
      'is the best response?',
    choices: [
      {
        text: 'Wrong — alternative splicing lets a single gene generate multiple distinct protein ' +
          'isoforms, genuinely resolving the apparent paradox',
        isCorrect: true,
      },
      {
        text: 'Correct — the discrepancy can only be explained by a flaw in gene-counting methodology',
        isCorrect: false,
        misconceptionId: `${SPLICING}:M2`,
      },
    ],
    correctValue: 'Wrong — alternative splicing lets a single gene generate multiple distinct protein ' +
      'isoforms, genuinely resolving the apparent paradox',
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    targetedMisconceptions: [`${SPLICING}:M2`],
    source: SPLICING_SRC,
  },
  {
    conceptId: SPLICING, subjectSlug: 'biology', probeKind: 'short_answer',
    gradeBand: GradeBand.HIGH,
    stem: 'In mutually exclusive exon splicing, how many of the two alternative exons are ever ' +
      'included in a single mature mRNA?',
    choices: [
      { text: 'Exactly one', isCorrect: true },
      { text: 'Both', isCorrect: false },
      { text: 'Neither', isCorrect: false },
    ],
    correctValue: 'Exactly one',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [],
    source: SPLICING_SRC,
  },
]

// ─── bio.sys.quantitative-systems-modeling ───────────────────────────────────
const QUANTSYS = 'bio.sys.quantitative-systems-modeling'
const QUANTSYS_SRC = 'educational-brain/concepts/biology/bio.sys.quantitative-systems-modeling.md'
const QUANTSYS_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: QUANTSYS, subjectSlug: 'biology', familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'ODE models of gene/protein concentration dynamics are a QUANTITATIVE extension of the ' +
      'SAME qualitative network-motif relationships already covered (feedback loops, feedforward ' +
      'loops) — not a new, unrelated topic. Where a qualitative description says a motif produces ' +
      '"oscillation," an ODE model writes a precise equation for the rate of change of each ' +
      'concentration, enabling exact numerical predictions. Parameter estimation is the specific ' +
      'process of fitting a model\'s unknown numerical parameters (rate constants, binding ' +
      'affinities) to match experimental time-course data — distinct from the model\'s STRUCTURE, ' +
      'which comes from prior biological knowledge. Sensitivity analysis systematically varies ' +
      'each parameter and measures how much model output changes, identifying WHICH SPECIFIC ' +
      'parameters most strongly determine behaviour (requiring precise measurement) — a ' +
      'prioritisation exercise, not merely listing parameters.',
    targetedMisconceptions: [],
    source: QUANTSYS_SRC,
  },
  {
    conceptId: QUANTSYS, subjectSlug: 'biology', familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      'Two mistakes are common. First, students treat ODE models as an entirely separate, ' +
      'unrelated mathematical topic from the qualitative network-motif descriptions already ' +
      'covered, missing that the equations are the SAME regulatory relationships made precise and ' +
      'quantitative. Second, students treat sensitivity analysis as simply listing all of a ' +
      'model\'s parameters, missing that its actual purpose is identifying WHICH SPECIFIC ' +
      'parameters most strongly determine model behaviour, to prioritise measurement precision.',
    targetedMisconceptions: [`${QUANTSYS}:M1`, `${QUANTSYS}:M2`],
    source: QUANTSYS_SRC,
  },
]
const QUANTSYS_PROBES: SeedProbe[] = [
  {
    conceptId: QUANTSYS, subjectSlug: 'biology', probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'A qualitative description states a network motif produces oscillating behaviour. What ' +
      'does writing an ODE model of this motif add?',
    choices: [
      { text: 'Precise, quantitative predictions (exact concentration values, oscillation period) using the same regulatory relationships', isCorrect: true },
      { text: 'An entirely new set of biological relationships unrelated to the original qualitative description', isCorrect: false, misconceptionId: `${QUANTSYS}:M1` },
      { text: 'Nothing — ODE models and qualitative descriptions are unrelated topics', isCorrect: false, misconceptionId: `${QUANTSYS}:M1` },
      { text: 'A replacement for the biological relationships already described', isCorrect: false },
    ],
    correctValue: 'Precise, quantitative predictions (exact concentration values, oscillation period) using the same regulatory relationships',
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    targetedMisconceptions: [`${QUANTSYS}:M1`],
    source: QUANTSYS_SRC,
  },
  {
    conceptId: QUANTSYS, subjectSlug: 'biology', probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'A student says sensitivity analysis is just listing all the parameters a model ' +
      'contains. What is the best response?',
    choices: [
      {
        text: 'Wrong — sensitivity analysis systematically varies each parameter and measures ' +
          'how much output changes, identifying which parameters matter most',
        isCorrect: true,
      },
      {
        text: 'Correct — sensitivity analysis is equivalent to enumerating a model\'s parameters',
        isCorrect: false,
        misconceptionId: `${QUANTSYS}:M2`,
      },
    ],
    correctValue: 'Wrong — sensitivity analysis systematically varies each parameter and measures ' +
      'how much output changes, identifying which parameters matter most',
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    targetedMisconceptions: [`${QUANTSYS}:M2`],
    source: QUANTSYS_SRC,
  },
  {
    conceptId: QUANTSYS, subjectSlug: 'biology', probeKind: 'short_answer',
    gradeBand: GradeBand.HIGH,
    stem: 'What is parameter estimation specifically the process of doing?',
    choices: [
      { text: 'Fitting a model\'s unknown numerical parameter values to match experimental time-course data', isCorrect: true },
      { text: 'Determining which biological components interact with which others', isCorrect: false },
      { text: 'Listing every parameter a model could theoretically contain', isCorrect: false },
    ],
    correctValue: 'Fitting a model\'s unknown numerical parameter values to match experimental time-course data',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [],
    source: QUANTSYS_SRC,
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
  ...LEARNMEM_EXPLANATIONS,
  ...ECHINODERM_EXPLANATIONS,
  ...AUDITION_EXPLANATIONS,
  ...CHORDATE_EXPLANATIONS,
  ...COGNEURO_EXPLANATIONS,
  ...LEARNBEH_EXPLANATIONS,
  ...ANIMCOG_EXPLANATIONS,
  ...NEURODEG_EXPLANATIONS,
  ...FISHAMPH_EXPLANATIONS,
  ...REPTBIRD_EXPLANATIONS,
  ...MAMMAL_EXPLANATIONS,
  ...SLEEP_EXPLANATIONS,
  ...HEMOSTASIS_EXPLANATIONS,
  ...ENDODISORD_EXPLANATIONS,
  ...SKIN_EXPLANATIONS,
  ...THERMOREG_EXPLANATIONS,
  ...LYMPH_EXPLANATIONS,
  ...MUSCLEPHYS_EXPLANATIONS,
  ...EXERCISE_EXPLANATIONS,
  ...COMPPHYS_EXPLANATIONS,
  ...PLANTTISSUE_EXPLANATIONS,
  ...SECGROWTH_EXPLANATIONS,
  ...REPROSTRAT_EXPLANATIONS,
  ...HPGAXIS_EXPLANATIONS,
  ...STRESSPHYS_EXPLANATIONS,
  ...SEEDGERM_EXPLANATIONS,
  ...PLANTBIOTECH_EXPLANATIONS,
  ...PHYTOCHROME_EXPLANATIONS,
  ...CYTOMOTILITY_EXPLANATIONS,
  ...MEMBTRANSPORT_EXPLANATIONS,
  ...FERMENT_EXPLANATIONS,
  ...METABREG_EXPLANATIONS,
  ...PROTEOSTASIS_EXPLANATIONS,
  ...JUNCTIONS_EXPLANATIONS,
  ...SPLICING_EXPLANATIONS,
  ...QUANTSYS_EXPLANATIONS,
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
  ...LEARNMEM_PROBES,
  ...ECHINODERM_PROBES,
  ...AUDITION_PROBES,
  ...CHORDATE_PROBES,
  ...COGNEURO_PROBES,
  ...LEARNBEH_PROBES,
  ...ANIMCOG_PROBES,
  ...NEURODEG_PROBES,
  ...FISHAMPH_PROBES,
  ...REPTBIRD_PROBES,
  ...MAMMAL_PROBES,
  ...SLEEP_PROBES,
  ...HEMOSTASIS_PROBES,
  ...ENDODISORD_PROBES,
  ...SKIN_PROBES,
  ...THERMOREG_PROBES,
  ...LYMPH_PROBES,
  ...MUSCLEPHYS_PROBES,
  ...EXERCISE_PROBES,
  ...COMPPHYS_PROBES,
  ...PLANTTISSUE_PROBES,
  ...SECGROWTH_PROBES,
  ...REPROSTRAT_PROBES,
  ...HPGAXIS_PROBES,
  ...STRESSPHYS_PROBES,
  ...SEEDGERM_PROBES,
  ...PLANTBIOTECH_PROBES,
  ...PHYTOCHROME_PROBES,
  ...CYTOMOTILITY_PROBES,
  ...MEMBTRANSPORT_PROBES,
  ...FERMENT_PROBES,
  ...METABREG_PROBES,
  ...PROTEOSTASIS_PROBES,
  ...JUNCTIONS_PROBES,
  ...SPLICING_PROBES,
  ...QUANTSYS_PROBES,
]
