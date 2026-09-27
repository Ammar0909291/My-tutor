/**
 * Batch: banach-space (math.fnal) — 3/18 -> 4/18.
 *
 * Fresh Phase 0 frontier recompute after completeness was authored: only
 * banach-space (requires completeness, already authored) is ready —
 * still a single-concept-at-a-time chain (banach-space then opens
 * open-mapping-theorem and, via dual-space-functional, the rest of the
 * domain's remaining structure).
 * Transcribed from its frozen Educational Brain entry at educational-
 * brain/concepts/mathematics/math.fnal.banach-space.md.
 *
 * Grade band: GradeBand.UNDERGRADUATE, matching this domain's established
 * baseline.
 *
 * This concept's KG cross-link (math.meas.lp-space) is authored per its
 * own EB entry's Curriculum Feedback (a reverse-direction discrepancy
 * noted there, not itself the chosen probe mode — the EB entry retains
 * its own independence-mode transfer probe, so this concept's detection
 * probes stay self-contained accordingly).
 *
 * This EB entry registers exactly 3 formal misconceptions (full contract,
 * no retargeting needed).
 *
 * Seeded as DRAFT. Promotion stays human.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedExplanation, SeedProbe } from './brainSeedAssets'

const S = 'mathematics'
const eb = (id: string, what: string) =>
  `educational-brain/concepts/mathematics/${id}.md — ${what}`

const BANACH_SPACE = 'math.fnal.banach-space'

export const MATHEMATICS_FNAL_BANACH_SPACE_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: BANACH_SPACE, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      '"BANACH SPACE" ADDS NOTHING BEYOND COMBINING TWO ALREADY-KNOWN CONCEPTS — NEVER A NEW '
      + 'INDEPENDENT IDEA: (R², Euclidean norm) is a normed space and is complete (converging '
      + 'sequences land at their limit within R²). Therefore, BY DEFINITION, (R², Euclidean norm) '
      + 'IS a Banach space — no additional argument beyond citing the two already-established facts '
      + 'is needed. Treating "Banach space" as requiring fresh, independent machinery beyond '
      + 'normed-space-plus-completeness is WRONG — it is simply the name for a normed space once '
      + 'verified to have the completeness property.\n\n'
      + 'NOT EVERY NORMED SPACE IS BANACH — NEVER ASSUME NORMED AUTOMATICALLY IMPLIES BANACH: the '
      + 'space of continuous functions on [0,1] with the L¹ norm IS a genuine normed space, but it '
      + 'is NOT complete (a ramp-function Cauchy sequence converges toward a discontinuous limit '
      + 'outside the space). Therefore this space is NOT a Banach space. Assuming every normed '
      + 'vector space is automatically a Banach space is WRONG — "Banach" is the strictly SMALLER '
      + 'subclass requiring a separately verified completeness property.\n\n'
      + 'COMPLETENESS IS LOAD-BEARING FOR FUNCTIONAL ANALYSIS THEOREMS — NEVER A MINOR TECHNICAL '
      + 'FOOTNOTE: an iterative algorithm generating a Cauchy sequence in a Banach space X '
      + 'concludes IMMEDIATELY, via a fixed-point-style argument, that the sequence converges to '
      + 'some point in X — the desired solution. If X were only normed (not necessarily complete) '
      + '— e.g. continuous functions on [0,1] with the L¹ norm, with a discontinuous natural limit '
      + '— the IDENTICAL Cauchy-sequence argument gives NO guarantee the solution exists within X '
      + 'at all. Treating the "Banach space" hypothesis in a theorem as safely ignorable technical '
      + 'decoration is WRONG — it is the exact requirement making the "the limit exists" step of '
      + 'nearly every major functional-analysis theorem valid.',
    targetedMisconceptions: [`${BANACH_SPACE}:MC-1`, `${BANACH_SPACE}:MC-2`, `${BANACH_SPACE}:MC-3`],
    source: eb(BANACH_SPACE, 'Core Understanding — Banach space adding nothing beyond combining two already-known concepts (normed space plus completeness), not every normed space being Banach, and completeness being load-bearing for functional analysis theorems never a minor technical footnote'),
  },
]

export const MATHEMATICS_FNAL_BANACH_SPACE_PROBES: SeedProbe[] = [
  {
    conceptId: BANACH_SPACE, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Is every normed vector space automatically a Banach space?',
    choices: [
      { text: "No — the space of continuous functions on [0,1] with the L¹ norm IS a genuine normed space, but it is NOT complete (a ramp-function Cauchy sequence converges toward a discontinuous function outside the space), so it is NOT Banach; \"Banach\" requires a separately verified completeness property", isCorrect: true },
      { text: "Yes, every normed vector space is automatically a Banach space, since normed and Banach describe the same thing", isCorrect: false, misconceptionId: `${BANACH_SPACE}:MC-1` },
      { text: "Since normed spaces are far more commonly encountered first, that should mean the completeness property is already guaranteed for any normed space", isCorrect: false, misconceptionId: `${BANACH_SPACE}:MC-1` },
    ],
    targetedMisconceptions: [`${BANACH_SPACE}:MC-1`],
    source: eb(BANACH_SPACE, 'Discovery Question 1 as a detection probe (verbatim) — whether every normed vector space is automatically Banach, an answer of "yes" confirming NORMED-SPACE-ASSUMED-ALWAYS-BANACH'),
  },
  {
    conceptId: BANACH_SPACE, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Is the "Banach space" hypothesis in a theorem just a minor technical formality, safely ignorable in practice?',
    choices: [
      { text: "No — it is the exact requirement making \"the limit exists\" step valid; in a Banach space, a Cauchy sequence from an iterative algorithm is IMMEDIATELY guaranteed to converge to a solution within the space, while in a merely normed (incomplete) space like C([0,1]) with the L¹ norm, that same argument gives NO such guarantee", isCorrect: true },
      { text: "Yes, the \"Banach space\" hypothesis is a minor technical formality that can be safely ignored in practice without affecting the theorem's conclusion", isCorrect: false, misconceptionId: `${BANACH_SPACE}:MC-2` },
      { text: "Since hypotheses in theorem statements are often skimmed without tracing their role in the proof, the Banach-space requirement should be treated the same way", isCorrect: false, misconceptionId: `${BANACH_SPACE}:MC-2` },
    ],
    targetedMisconceptions: [`${BANACH_SPACE}:MC-2`],
    source: eb(BANACH_SPACE, 'Discovery Question 2 as a detection probe (verbatim) — whether the Banach space hypothesis is a safely ignorable formality, an answer of "yes" confirming COMPLETENESS-HYPOTHESIS-TREATED-AS-FOOTNOTE'),
  },
  {
    conceptId: BANACH_SPACE, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Since all norms on Rⁿ agree on completeness, does that mean all norms on any vector space must agree on completeness too?',
    choices: [
      { text: "No — that finite-dimensional norm-equivalence fact does NOT extend to infinite dimensions; the space of continuous functions on [0,1] is complete (Banach) under the sup-norm but NOT complete under the L¹ norm — the SAME vector space with genuinely different completeness verdicts depending on the norm chosen", isCorrect: true },
      { text: "Yes, since all norms agree on completeness in the finite-dimensional case, that same equivalence should extend to any vector space regardless of dimension", isCorrect: false, misconceptionId: `${BANACH_SPACE}:MC-3` },
      { text: "Since the finite-dimensional norm-equivalence theorem is a well-established and memorable fact, it should generalize naturally to infinite-dimensional spaces as well", isCorrect: false, misconceptionId: `${BANACH_SPACE}:MC-3` },
    ],
    targetedMisconceptions: [`${BANACH_SPACE}:MC-3`],
    source: eb(BANACH_SPACE, 'Discovery Question 3 as a detection probe (verbatim) — whether the finite-dimensional norm-equivalence fact extends to any vector space, an answer of "yes" confirming ALL-NORMS-ON-INFINITE-DIMENSIONS-ASSUMED-EQUIVALENT'),
  },
]
