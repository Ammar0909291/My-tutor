/**
 * Batch: riemann-surface, riemann-zeta (math.cx) — 29/31 -> 31/31.
 *
 * FINAL BATCH of the math.cx domain, and of the entire Mathematics subject:
 * these are the last 2 of math.cx's 31 concepts and the last 2 of
 * Mathematics's 908. Closes math.cx to 31/31 and Mathematics to 908/908.
 *
 * Both concepts declare a cross-link whose Blueprint recorded it as
 * "not yet authored at time of writing" but which is now confirmed authored
 * on disk (a reverse-direction discrepancy already documented repeatedly
 * this campaign — the EB content itself is unaffected, only the cross-link
 * authored-status snapshot was stale): riemann-surface to
 * math.top.covering-space, and riemann-zeta to math.nt.riemann-hypothesis.
 * Both cross-link targets are confirmed authored in the seed corpus.
 *
 * Transcribed from their frozen Educational Brain entries at educational-
 * brain/concepts/mathematics/math.cx.{riemann-surface,riemann-zeta}.md.
 *
 * Grade band: GradeBand.UNDERGRADUATE, matching this domain's established
 * convention for research-tier content (both are research tier).
 *
 * Both EB entries register exactly 3 formal misconceptions each (full
 * contract, no retargeting needed).
 *
 * Seeded as DRAFT. Promotion stays human.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedExplanation, SeedProbe } from './brainSeedAssets'

const S = 'mathematics'
const eb = (id: string, what: string) =>
  `educational-brain/concepts/mathematics/${id}.md — ${what}`

const RIEMANN_SURFACE = 'math.cx.riemann-surface'
const RIEMANN_ZETA = 'math.cx.riemann-zeta'

export const MATHEMATICS_CX_RIEMANN_SURFACE_ZETA_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: RIEMANN_SURFACE, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'MULTIVALUEDNESS SIGNALS THE WRONG DOMAIN — NEVER A PATCHABLE QUIRK: continuing log(z) '
      + 'around a loop enclosing 0 returns to the SAME point z=1 with value 2πi instead of 0 — '
      + 'genuinely NOT single-valued on ℂ\\{0}. Believing this misbehavior should be patched with '
      + 'an ad-hoc convention like "always pick the principal branch" is WRONG — it signals that '
      + 'ℂ\\{0} is genuinely the WRONG domain for log(z) to live on as a single-valued function; a '
      + 'Riemann surface is the CORRECT domain, built specifically to make it single-valued.\n\n'
      + 'THE RIEMANN SURFACE IS A GENUINE NEW GEOMETRIC DOMAIN — NEVER MERE NOTATION: stacking '
      + 'infinitely many sheets of ℂ\\{0}, glued along a cut so crossing it counterclockwise moves '
      + 'sheet n to sheet n+1, with log(z)=ln|z|+i(θ+2πn) defined on sheet n: this is an honest, '
      + 'rigorous new space on which log(z) is PROVABLY single-valued — going around the origin '
      + 'once moves you to a genuinely DIFFERENT point (sheet n+1), never back to the same point. '
      + 'Believing the Riemann surface construction is a notational bookkeeping trick for tracking '
      + 'which branch of log(z) you\'re using is WRONG — it is a genuine, rigorous new geometric '
      + 'domain, not a convenience for notation.\n\n'
      + 'BRANCH POINTS PRODUCE GENUINELY FINITE STRUCTURES — NEVER ASSUMING EVERY FUNCTION NEEDS '
      + 'AN INFINITE HELIX: for √z: going around the origin ONCE gives √z·e^(iπ)=−√z (a DIFFERENT '
      + 'value — not yet closed), but going around TWICE gives √z·e^(2πi)=√z (back to the ORIGINAL '
      + 'value) — exactly TWO sheets, genuinely MERGING at z=0 after finitely many loops, a "branch '
      + 'point," fundamentally different from log(z)\'s infinite, never-closing helix. Believing '
      + 'every multivalued function requires the same kind of infinite, never-closing Riemann '
      + 'surface that log(z) does is WRONG — branch points produce genuinely different, '
      + 'finite-sheeted structures that close up after a specific finite number of loops.',
    targetedMisconceptions: [`${RIEMANN_SURFACE}:MC-1`, `${RIEMANN_SURFACE}:MC-2`, `${RIEMANN_SURFACE}:MC-3`],
    source: eb(RIEMANN_SURFACE, 'Core Understanding — multivaluedness signaling the wrong domain never a patchable quirk, the Riemann surface being a genuine new geometric domain never mere notation, and branch points producing genuinely finite structures never assuming every multivalued function needs an infinite helix'),
  },
  {
    conceptId: RIEMANN_ZETA, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'THE POLE AT s=1 IS AN HONEST REPORT OF GENUINE DIVERGENCE — NEVER A MYSTERIOUS INTRODUCED '
      + 'GAP: at s=2, ζ(2)=Σ1/n² = π²/6 — a genuine, FINITE convergent value. At s=1, the SAME '
      + 'defining series becomes Σ1/n, the harmonic series, which DIVERGES — a fact from ordinary '
      + 'series theory. The continuation cannot assign a finite value at s=1 either; it has a '
      + 'SIMPLE POLE there because the ORIGINAL series itself genuinely breaks down at that exact '
      + 'point. Believing the continuation\'s finiteness elsewhere implies the original divergent '
      + 'series at s=1 secretly converges too is WRONG — the pole is an honest report of the '
      + 'series\'s genuine divergence, not a separate coincidence introduced by continuation.\n\n'
      + 'THE EULER PRODUCT IS A GENUINE ANALYTIC BRIDGE — NEVER A COSMETIC REWRITE: truncating to '
      + 'the first two primes: (1−2⁻ˢ)⁻¹(1−3⁻ˢ)⁻¹ = Σ(a,b≥0) (2ᵃ3ᵇ)⁻ˢ generates the term n⁻ˢ for '
      + 'EVERY n=2ᵃ3ᵇ EXACTLY ONCE, since unique factorization guarantees exactly one '
      + 'representation. Extending over ALL primes reconstructs Σn⁻ˢ=ζ(s) EXACTLY, term by term, '
      + 'nothing missing, nothing double-counted. Believing the Euler product is just an alternate '
      + 'way of writing the same sum, with no deeper mathematical content, is WRONG — the identity '
      + 'is a genuine bridge relying specifically on unique factorization, connecting ζ(s)\'s '
      + 'analytic behavior to the distribution of primes.\n\n'
      + 'THE RIEMANN HYPOTHESIS IS OPEN — NEVER A PROVEN THEOREM: the functional equation '
      + 'ξ(s)=ξ(1−s) is a PROVEN theorem, fully established. The Riemann Hypothesis (every '
      + 'nontrivial zero has real part EXACTLY 1/2) has been verified numerically for trillions of '
      + 'zeros but has NO general proof — it remains one of the seven Clay Millennium Prize '
      + 'problems, genuinely OPEN as of today. Believing the Riemann Hypothesis has already been '
      + 'proven, given its overwhelming numerical support, is WRONG — overwhelming numerical '
      + 'evidence is not the same thing as a mathematical proof; it remains an unproven conjecture.',
    targetedMisconceptions: [`${RIEMANN_ZETA}:MC-1`, `${RIEMANN_ZETA}:MC-2`, `${RIEMANN_ZETA}:MC-3`],
    source: eb(RIEMANN_ZETA, 'Core Understanding — the pole at s=1 being an honest report of genuine divergence never a mysterious introduced gap, the Euler product being a genuine analytic bridge never a cosmetic rewrite, and the Riemann Hypothesis being open never a proven theorem'),
  },
]

export const MATHEMATICS_CX_RIEMANN_SURFACE_ZETA_PROBES: SeedProbe[] = [
  {
    conceptId: RIEMANN_SURFACE, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE, difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Continuing log(z) counterclockwise around a loop enclosing 0 returns to the same point z = 1, but with value 2πi instead of the original 0. Is the right fix to adopt an ad-hoc convention like "always use the principal branch"?',
    choices: [
      { text: 'Yes — a principal-branch convention is the correct, complete fix for this misbehavior', isCorrect: false, misconceptionId: `${RIEMANN_SURFACE}:MC-1` },
      { text: 'No — this signals that ℂ\\{0} is genuinely the wrong domain for log(z) to be single-valued on; the correct fix is a genuinely new domain (a Riemann surface) on which log(z) is provably single-valued', isCorrect: true },
      { text: 'No, because log(z) is actually single-valued on ℂ\\{0} already and no fix is needed', isCorrect: false },
      { text: 'Yes, and this convention works for every multivalued function without exception', isCorrect: false },
    ],
    targetedMisconceptions: [`${RIEMANN_SURFACE}:MC-1`],
    source: eb(RIEMANN_SURFACE, 'Demonstration 1 — the log z monodromy-as-domain-problem reframing'),
  },
  {
    conceptId: RIEMANN_SURFACE, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE, difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'The Riemann surface for log(z) is built by stacking infinitely many sheets of ℂ\\{0}, glued so that crossing the cut counterclockwise moves you from sheet n to sheet n+1. Is this construction just a notational bookkeeping trick for tracking which branch you\'re using?',
    choices: [
      { text: 'Yes, it is essentially a labeling scheme, not an actual constructed geometric space', isCorrect: false, misconceptionId: `${RIEMANN_SURFACE}:MC-2` },
      { text: 'No — it is a genuine, rigorous new geometric domain on which log(z) is provably single-valued: going around the origin once moves you to a genuinely different point (a different sheet), never back to the same one', isCorrect: true },
      { text: 'Yes, since sheets are not real points, only labels attached to values of log(z)', isCorrect: false },
      { text: 'No, but only because log(z) itself is not actually defined on any of the sheets', isCorrect: false },
    ],
    targetedMisconceptions: [`${RIEMANN_SURFACE}:MC-2`],
    source: eb(RIEMANN_SURFACE, 'Demonstration 2 — the concrete helical-surface gluing construction'),
  },
  {
    conceptId: RIEMANN_SURFACE, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE, difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'For √z: going around the origin once gives √z·e^(iπ) = −√z (a different value), but going around twice gives √z·e^(2πi) = √z (back to the original value) — the structure closes after exactly 2 loops. Does every multivalued function require an infinite, never-closing Riemann surface like log(z)\'s?',
    choices: [
      { text: 'Yes, every multivalued function\'s Riemann surface must be infinite and never close, just like log(z)\'s', isCorrect: false, misconceptionId: `${RIEMANN_SURFACE}:MC-3` },
      { text: 'No — branch points like the one √z has at z = 0 produce genuinely finite-sheeted structures (here, exactly 2 sheets) that close up after a specific finite number of loops, fundamentally different from log(z)\'s infinite helix', isCorrect: true },
      { text: 'No, because √z does not actually have a Riemann surface at all', isCorrect: false },
      { text: 'Yes, but √z is a special exception that does not actually require any Riemann surface', isCorrect: false },
    ],
    targetedMisconceptions: [`${RIEMANN_SURFACE}:MC-3`],
    source: eb(RIEMANN_SURFACE, 'Demonstration 3 — the square-root two-sheet closing-after-two-loops computation'),
  },
  {
    conceptId: RIEMANN_ZETA, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE, difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'ζ(s) is finite everywhere except at s = 1, where it has a simple pole. Since ζ(2) = π²/6 is a genuine finite value and the continuation is finite almost everywhere, does this mean the original defining series Σ1/n (the harmonic series) secretly converges after all at s = 1?',
    choices: [
      { text: 'Yes, the continuation\'s success elsewhere implies the harmonic series must secretly converge to a very large finite value', isCorrect: false, misconceptionId: `${RIEMANN_ZETA}:MC-1` },
      { text: 'No — the harmonic series genuinely diverges (an ordinary fact from series theory), and the pole at s = 1 is an honest report of that genuine divergence, not a coincidence the continuation introduces', isCorrect: true },
      { text: 'No, because ζ(2) = π²/6 is actually a divergent value in disguise', isCorrect: false },
      { text: 'Yes, and the pole at s = 1 is simply a computational artifact with no connection to the original series', isCorrect: false },
    ],
    targetedMisconceptions: [`${RIEMANN_ZETA}:MC-1`],
    source: eb(RIEMANN_ZETA, 'Demonstration 1 — the zeta(2)-finite-versus-harmonic-series-divergent contrast at s=1'),
  },
  {
    conceptId: RIEMANN_ZETA, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE, difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Truncating the Euler product to the first two primes, (1−2⁻ˢ)⁻¹(1−3⁻ˢ)⁻¹, expands to Σ(2ᵃ3ᵇ)⁻ˢ, generating the term n⁻ˢ for every n = 2ᵃ3ᵇ exactly once (by unique factorization). Is the full Euler product over all primes just an alternate way of writing the same sum, with no deeper content?',
    choices: [
      { text: 'Yes, it is a purely cosmetic rewriting with no additional mathematical content beyond notation', isCorrect: false, misconceptionId: `${RIEMANN_ZETA}:MC-2` },
      { text: 'No — the identity is a genuine analytic bridge relying specifically on unique factorization, connecting ζ(s)\'s analytic behavior directly to the distribution of primes', isCorrect: true },
      { text: 'No, because the Euler product and the original sum are actually different, unrelated functions', isCorrect: false },
      { text: 'Yes, and this rewriting works only for s = 2, not for general s', isCorrect: false },
    ],
    targetedMisconceptions: [`${RIEMANN_ZETA}:MC-2`],
    source: eb(RIEMANN_ZETA, 'Demonstration 2 — the truncated two-prime Euler product reconstruction'),
  },
  {
    conceptId: RIEMANN_ZETA, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE, difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'The Riemann Hypothesis (every nontrivial zero of ζ has real part exactly 1/2) has been numerically verified for trillions of zeros, with no counterexample ever found. Has it therefore been proven?',
    choices: [
      { text: 'Yes — checking trillions of zeros without a counterexample constitutes a proof by exhaustive verification', isCorrect: false, misconceptionId: `${RIEMANN_ZETA}:MC-3` },
      { text: 'No — overwhelming numerical evidence is categorically different from a mathematical proof; the Riemann Hypothesis remains one of the seven Clay Millennium Prize problems, genuinely open, unlike the functional equation ξ(s) = ξ(1−s), which IS a proven theorem', isCorrect: true },
      { text: 'No, because the functional equation ξ(s) = ξ(1−s) is also unproven', isCorrect: false },
      { text: 'Yes, since the Clay Millennium Prize for this problem has already been awarded', isCorrect: false },
    ],
    targetedMisconceptions: [`${RIEMANN_ZETA}:MC-3`],
    source: eb(RIEMANN_ZETA, 'Demonstration 3 — the proven-functional-equation-versus-conjectured-RH contrast'),
  },
]
