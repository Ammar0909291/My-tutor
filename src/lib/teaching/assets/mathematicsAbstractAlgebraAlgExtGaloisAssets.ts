/**
 * Seventeenth math.abst asset batch — algebraic-extension and
 * galois-theory.
 *
 * Continues serving-asset coverage for math.abst (32/36 -> 34/36).
 * Transcribed from the frozen Educational Brain entries at
 * educational-brain/concepts/mathematics/math.abst.algebraic-extension.md
 * and math.abst.galois-theory.md.
 *
 *   ALGEXT  algebraic-extension — the minimal polynomial needs three
 *           simultaneous conditions (monic, irreducible, least degree),
 *           never just any satisfying polynomial; the degree is read
 *           directly off deg(m_alpha); a defining equation's raw degree
 *           is not automatically the minimal degree.
 *   GALOIS  galois-theory — a Galois automorphism must genuinely preserve
 *           multiplication, never merely a plausible-looking relabeling;
 *           the Fundamental Theorem's correspondence is inclusion-
 *           reversing; unsolvability by radicals is about expressibility,
 *           never existence of roots.
 *
 * Seeded as DRAFT. Promotion stays human.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedExplanation, SeedProbe } from './brainSeedAssets'

const S = 'mathematics'
const eb = (id: string, what: string) =>
  `educational-brain/concepts/mathematics/${id}.md — ${what}`

const ALGEXT = 'math.abst.algebraic-extension'
const GALOIS = 'math.abst.galois-theory'

export const MATHEMATICS_ABSTRACT_ALGEBRA_ALG_EXT_GALOIS_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: ALGEXT, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'The MINIMAL POLYNOMIAL m_α(x) requires THREE conditions AT ONCE: MONIC, IRREDUCIBLE over '
      + 'F, and of LEAST DEGREE among all polynomials α satisfies. Many polynomials can have α as '
      + 'a root — for α=√2, 3x²-6 fails (not monic), (x²-2)(x-1) fails (reducible), leaving only '
      + 'x²-2 as the unique survivor.\n\n'
      + 'The isomorphism F(α)≅F[x]/(m_α(x)) means the degree [F(α):F] is READ OFF deg(m_α) '
      + 'DIRECTLY — no separate basis-verification required once m_α is genuinely found.\n\n'
      + 'A defining equation\'s raw degree is NOT automatically the minimal degree: α=i satisfies '
      + 'the "obvious" x⁴-1=0 (degree 4), but x⁴-1=(x-1)(x+1)(x²+1) is REDUCIBLE — the genuine '
      + 'irreducible factor x²+1 IS m_i(x), giving [Q(i):Q]=2, not 4. Always verify irreducibility '
      + 'before trusting a defining equation\'s degree.',
    targetedMisconceptions: [`${ALGEXT}:MC-1`, `${ALGEXT}:MC-2`, `${ALGEXT}:MC-3`],
    source: eb(ALGEXT, 'Core Understanding — the minimal polynomial needs three simultaneous conditions, the degree is read off directly, a defining equation\'s raw degree is not automatically minimal'),
  },
  {
    conceptId: GALOIS, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'A Galois group element must genuinely PRESERVE the field\'s structure while fixing F — '
      + 'NOT merely relabel generators in a way that looks plausible. For K=Q(√2,√3), the naive '
      + 'swap ρ:√2↔√3 fails multiplicativity: ρ(√2·√2)=ρ(2)=2 but ρ(√2)·ρ(√2)=√3·√3=3≠2 — NOT a '
      + 'valid automorphism, despite the visual symmetry making it look sensible.\n\n'
      + 'THE FUNDAMENTAL THEOREM\'s correspondence is INCLUSION-REVERSING, never preserving: the '
      + 'LARGEST intermediate field (K itself) corresponds to the SMALLEST subgroup ({id}), while '
      + 'the SMALLEST field (F itself) corresponds to the LARGEST subgroup — bigger subfields have '
      + 'FEWER symmetries fixing them, not more.\n\n'
      + 'SOLVABILITY BY RADICALS is about EXPRESSING roots via a formula, never whether they '
      + 'EXIST: every degree-n polynomial has exactly n roots in C unconditionally (Fundamental '
      + 'Theorem of Algebra). For a general quintic, the Galois group is S_5, NOT solvable — no '
      + 'radical formula can exist (Abel-Ruffini), even though the 5 roots exist and can be '
      + 'approximated to any precision.',
    targetedMisconceptions: [`${GALOIS}:MC-1`, `${GALOIS}:MC-2`, `${GALOIS}:MC-3`],
    source: eb(GALOIS, 'Core Understanding — Galois automorphisms must genuinely preserve multiplication, the correspondence is inclusion-reversing, unsolvability is about expressibility not existence'),
  },
]

export const MATHEMATICS_ABSTRACT_ALGEBRA_ALG_EXT_GALOIS_PROBES: SeedProbe[] = [
  // --- math.abst.algebraic-extension --------------------------------------------
  {
    conceptId: ALGEXT, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Does ANY polynomial with α as a root qualify as α\'s minimal polynomial, or must it satisfy additional conditions?',
    choices: [
      { text: 'It must satisfy three simultaneous conditions: monic, irreducible over F, and of least degree — for √2 over Q, only x²-2 survives all three filters', isCorrect: true },
      { text: 'Any polynomial having α as a root automatically qualifies as its minimal polynomial', isCorrect: false, misconceptionId: `${ALGEXT}:MC-1` },
      { text: 'Only monic-ness matters; irreducibility and least degree are optional extras', isCorrect: false, misconceptionId: `${ALGEXT}:MC-1` },
    ],
    targetedMisconceptions: [`${ALGEXT}:MC-1`],
    source: eb(ALGEXT, 'Assessment gate — the minimal polynomial needs three simultaneous conditions, not just any satisfying polynomial'),
  },
  {
    conceptId: ALGEXT, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Once m_α\'s degree is known, must you still separately verify a basis, or does the degree follow directly?',
    choices: [
      { text: 'The degree [F(α):F] follows directly from deg(m_α) via the isomorphism F(α)≅F[x]/(m_α(x)) — no separate basis-verification is required', isCorrect: true },
      { text: 'A basis must always be separately constructed and hand-verified from scratch, regardless of m_α', isCorrect: false, misconceptionId: `${ALGEXT}:MC-2` },
      { text: 'The isomorphism only applies in special cases, so basis verification is usually still needed', isCorrect: false, misconceptionId: `${ALGEXT}:MC-2` },
    ],
    targetedMisconceptions: [`${ALGEXT}:MC-2`],
    source: eb(ALGEXT, 'Misconception register — the degree is read off deg(m_α) directly, no separate basis verification needed'),
  },
  {
    conceptId: ALGEXT, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'If α is first introduced via a degree-4 equation, is [F(α):F] automatically 4?',
    choices: [
      { text: 'No — the defining equation may be reducible; i satisfies degree-4 x⁴-1=0, but this factors, and the genuine minimal polynomial x²+1 gives [Q(i):Q]=2, not 4', isCorrect: true },
      { text: 'Yes — the degree of the first equation α satisfies is always [F(α):F]', isCorrect: false, misconceptionId: `${ALGEXT}:MC-3` },
      { text: 'Yes, since irreducibility never needs to be checked for a defining equation', isCorrect: false, misconceptionId: `${ALGEXT}:MC-3` },
    ],
    targetedMisconceptions: [`${ALGEXT}:MC-3`],
    source: eb(ALGEXT, 'Transfer probe — a defining equation\'s raw degree is not automatically the minimal degree, irreducibility must be verified'),
  },

  // --- math.abst.galois-theory ---------------------------------------------------
  {
    conceptId: GALOIS, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Does any bijective relabeling of an extension\'s generators (like swapping √2 and √3) automatically define a valid element of the Galois group?',
    choices: [
      { text: 'No — the map ρ:√2↔√3 fails multiplicativity (ρ(√2·√2)=2 but ρ(√2)·ρ(√2)=3), so it is NOT a valid automorphism despite looking like a plausible swap', isCorrect: true },
      { text: 'Yes — any bijective relabeling of generators automatically defines a valid Galois group element', isCorrect: false, misconceptionId: `${GALOIS}:MC-1` },
      { text: 'Yes, as long as the relabeling looks visually symmetric', isCorrect: false, misconceptionId: `${GALOIS}:MC-1` },
    ],
    targetedMisconceptions: [`${GALOIS}:MC-1`],
    source: eb(GALOIS, 'Assessment gate — a Galois automorphism must genuinely preserve multiplication, never merely look like a sensible relabeling'),
  },
  {
    conceptId: GALOIS, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Does a larger subgroup of Gal(K/F) correspond to a larger intermediate field?',
    choices: [
      { text: 'No — the correspondence is INCLUSION-REVERSING: the trivial subgroup {id} corresponds to the LARGEST field K, while the full group corresponds to the SMALLEST field F', isCorrect: true },
      { text: 'Yes — bigger subgroups always correspond to bigger intermediate fields', isCorrect: false, misconceptionId: `${GALOIS}:MC-2` },
      { text: 'Yes, since the correspondence preserves size in the same direction as most other correspondences', isCorrect: false, misconceptionId: `${GALOIS}:MC-2` },
    ],
    targetedMisconceptions: [`${GALOIS}:MC-2`],
    source: eb(GALOIS, 'Misconception register — the Fundamental Theorem\'s correspondence is inclusion-reversing, never preserving'),
  },
  {
    conceptId: GALOIS, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Does Abel-Ruffini\'s theorem mean the general quintic\'s roots don\'t actually exist, or can\'t be computed at all?',
    choices: [
      { text: 'No — the 5 roots exist unconditionally (Fundamental Theorem of Algebra) and can be approximated numerically; Abel-Ruffini only says no RADICAL FORMULA can express them, since S_5 is not solvable', isCorrect: true },
      { text: 'Yes — Abel-Ruffini proves the general quintic\'s roots simply do not exist', isCorrect: false, misconceptionId: `${GALOIS}:MC-3` },
      { text: 'Yes, since an unsolvable Galois group means the roots can never be found by any method', isCorrect: false, misconceptionId: `${GALOIS}:MC-3` },
    ],
    targetedMisconceptions: [`${GALOIS}:MC-3`],
    source: eb(GALOIS, 'Transfer probe — unsolvability by radicals is about formula-expressibility, never about whether roots exist'),
  },
]
