/**
 * Batch: cofactor-expansion, det-properties, distance (math.linalg).
 *
 * Continuing math.linalg (53/61 -> 56/61). Fresh frontier recompute found
 * all 8 remaining concepts simultaneously ready. Selected cofactor-
 * expansion and det-properties (both require only determinant, closing
 * that convergence outright) plus distance (closes the norm family
 * alongside unit-vector, Batch 119). Transcribed from the frozen
 * Educational Brain entries at educational-brain/concepts/mathematics/
 * math.linalg.{cofactor-expansion,det-properties,distance}.md.
 *
 *   COFACTOR-EXPANSION  Cᵢⱼ=(-1)^(i+j)Mᵢⱼ, checkerboard sign always
 *           re-derived, never eyeballed; det(A) expanded along ANY row or
 *           column gives the IDENTICAL value, a genuine theorem never a
 *           coincidence; the sparsest row/column is chosen for efficiency,
 *           never a fixed default.
 *   DET-PROPERTIES  det(cA)=cⁿdet(A) for an n×n matrix — EVERY row
 *           contributes its own factor of c, never a bare c; scaling ONE
 *           row multiplies by c ONCE, genuinely different from scaling the
 *           WHOLE matrix; a row swap FLIPS the sign, never left unchanged
 *           like row-addition.
 *   DISTANCE  d(u,v)=‖u−v‖ reuses norm directly on the difference vector;
 *           the triangle inequality can be a STRICT inequality or an
 *           EQUALITY, with equality holding exactly when the three points
 *           are collinear with v between u and w — never assumed always
 *           strict. distance.md lists only 2 misconceptions (MC-1, MC-2)
 *           — a 3rd PROFICIENT probe below re-targets MC-2 with a fresh
 *           collinear example, following this campaign's established
 *           2-misconception fallback.
 *
 * Seeded as DRAFT. Promotion stays human.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedExplanation, SeedProbe } from './brainSeedAssets'

const S = 'mathematics'
const eb = (id: string, what: string) =>
  `educational-brain/concepts/mathematics/${id}.md — ${what}`

const COFACTOR_EXPANSION = 'math.linalg.cofactor-expansion'
const DET_PROPERTIES = 'math.linalg.det-properties'
const DISTANCE = 'math.linalg.distance'

export const MATHEMATICS_LINALG_COFACTOR_EXPANSION_DET_PROPERTIES_DISTANCE_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: COFACTOR_EXPANSION, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'A COFACTOR IS A SIGNED MINOR, ALWAYS RE-DERIVED VIA (-1)^(i+j), NEVER EYEBALLED: for an n×n '
      + 'matrix A, the MINOR Mᵢⱼ is the determinant of the (n−1)×(n−1) matrix obtained by deleting '
      + 'row i and column j from A. The COFACTOR Cᵢⱼ=(-1)^(i+j)Mᵢⱼ attaches a sign that alternates '
      + 'in a checkerboard pattern starting with + at position (1,1). For C₂₃: the sign is '
      + '(-1)^(2+3)=(-1)^5=-1, so C₂₃=-M₂₃ — computed explicitly from the formula, never by '
      + 'eyeballing a checkerboard pattern alone, since larger matrices or off-first-row/column '
      + 'starts make visual pattern-matching unreliable.\n\n'
      + 'ANY ROW OR COLUMN GIVES THE IDENTICAL DETERMINANT — A GENUINE THEOREM, NEVER A '
      + 'COINCIDENCE: the cofactor expansion formula det(A)=Σⱼ aᵢⱼCᵢⱼ computes the determinant '
      + 'along any row i, or equivalently any column j. Expanding along ROW 1 versus ROW 3 versus '
      + 'COLUMN 2 of the SAME matrix all produce the EXACT same numerical value, because each is '
      + 'computing the same determinant by a different but mathematically equivalent '
      + 'decomposition — never a lucky agreement between unrelated methods.\n\n'
      + 'ZEROS ARE FREE — EXPAND ALONG THE SPARSEST ROW OR COLUMN, NEVER A FIXED DEFAULT: since '
      + 'every term aᵢⱼCᵢⱼ with aᵢⱼ=0 contributes NOTHING to the sum, choosing to expand along the '
      + 'row or column with the MOST zero entries is a genuine EFFICIENCY strategy — fewer nonzero '
      + 'terms means fewer (n−1)×(n−1) minors to actually compute. This does not change the final '
      + 'answer, only how much arithmetic is needed to reach it; always defaulting to row 1 '
      + 'regardless of its zero count wastes this available efficiency.',
    targetedMisconceptions: [`${COFACTOR_EXPANSION}:MC-1`, `${COFACTOR_EXPANSION}:MC-2`, `${COFACTOR_EXPANSION}:MC-3`],
    source: eb(COFACTOR_EXPANSION, 'Core Understanding — the cofactor as a signed minor via (-1)^(i+j) always explicitly re-derived, the cofactor expansion theorem guaranteeing identical results along any row or column, and choosing the sparsest row or column as a genuine efficiency strategy'),
  },
  {
    conceptId: DET_PROPERTIES, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'det(cA)=cⁿdet(A) — EVERY ROW CONTRIBUTES ITS OWN FACTOR OF c, NEVER A BARE c: for a 3×3 '
      + 'matrix with det(A)=5: scaling the WHOLE matrix by 2 gives det(2A)=2³×5=40 — since scaling '
      + 'the WHOLE matrix by c scales EVERY row by c, and each row-scaling multiplies the '
      + 'determinant by one factor of c, all n rows together contribute cⁿ. Computing det(2A) as '
      + 'the bare 2×5=10 overgeneralizes single-number scalar multiplication, where multiplying by '
      + 'c happens exactly once, to whole-matrix scaling, where it happens once PER ROW.\n\n'
      + 'SCALING ONE ROW MULTIPLIES BY c ONCE — GENUINELY DIFFERENT FROM SCALING THE WHOLE MATRIX: '
      + 'for det(A)=7: scaling ONE row by 3 gives 3×7=21 — just ONE factor of 3, since only that '
      + 'single row was touched. Scaling the WHOLE matrix by 3 instead would give 3ⁿ×7, a '
      + 'genuinely different result. Before applying either rule, the number of rows ACTUALLY '
      + 'scaled by the described operation must be explicitly re-counted — the two scenarios share '
      + 'surface vocabulary ("scaling by c") but are NOT interchangeable.\n\n'
      + 'A ROW SWAP FLIPS THE SIGN — NEVER LEFT UNCHANGED LIKE ROW-ADDITION: for det(A)=7: SWAPPING '
      + 'two rows gives -7 (the sign FLIPS), while ADDING 2× row 1 to row 2 leaves the determinant '
      + 'at EXACTLY 7 (UNCHANGED). Only ONE of the three row operations (adding a multiple of one '
      + 'row to another) has no effect on the determinant; treating a row-swapped matrix as having '
      + 'the SAME determinant as the original — carrying over row-addition’s "no effect" pattern —'
      + 'is wrong, since swap and scale-one-row genuinely change the determinant’s value.',
    targetedMisconceptions: [`${DET_PROPERTIES}:MC-1`, `${DET_PROPERTIES}:MC-2`, `${DET_PROPERTIES}:MC-3`],
    source: eb(DET_PROPERTIES, 'Core Understanding — det(cA)=cⁿdet(A) with every row contributing its own factor of c, single-row scaling by c once versus whole-matrix scaling by cⁿ, and a row swap flipping the sign while row-addition leaves the determinant unchanged'),
  },
  {
    conceptId: DISTANCE, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'THE DISTANCE BETWEEN TWO VECTORS IS d(u,v)=‖u−v‖ — REUSING NORM DIRECTLY ON THE DIFFERENCE: '
      + 'reusing math.linalg.norm directly, applied to their difference. Computing u−v first and '
      + 'then taking its norm is the standard convention: while ‖u−v‖=‖v−u‖ always (the final '
      + 'distance value is unaffected by subtraction order, since ‖−x‖=‖x‖), consistently choosing '
      + 'one order throughout a calculation avoids sign-tracking errors in the INTERMEDIATE '
      + 'difference vector.\n\n'
      + 'DISTANCE SATISFIES THE METRIC AXIOMS: NON-NEGATIVITY (d(u,v)≥0, with equality exactly '
      + 'when u=v), SYMMETRY (d(u,v)=d(v,u)), and the TRIANGLE INEQUALITY (d(u,w)≤d(u,v)+d(v,w) '
      + 'for any third point w) — going directly from u to w is never longer than going through an '
      + 'intermediate point v.\n\n'
      + 'THE TRIANGLE INEQUALITY IS NOT ALWAYS STRICT — EQUALITY HOLDS EXACTLY WHEN THE THREE '
      + 'POINTS ARE COLLINEAR: for u=(0,0), v=(1,0), w=(3,0) (COLLINEAR, with v BETWEEN u and w): '
      + 'd(u,v)=1, d(v,w)=2, d(u,w)=3=1+2 — EQUALITY holds exactly, since going through v adds no '
      + 'extra distance at all when the path is already a straight line. For any three points NOT '
      + 'satisfying this collinear-and-between condition, the inequality is strict — assuming the '
      + 'triangle inequality is ALWAYS a strict less-than, never an equality, overgeneralizes from '
      + 'the more common non-collinear case.',
    targetedMisconceptions: [`${DISTANCE}:MC-1`, `${DISTANCE}:MC-2`],
    source: eb(DISTANCE, 'Core Understanding — distance as the norm of the difference vector with a consistent subtraction-order convention, the metric axioms distance satisfies, and the triangle inequality holding as an equality exactly when the three points are collinear with v between u and w'),
  },
]

export const MATHEMATICS_LINALG_COFACTOR_EXPANSION_DET_PROPERTIES_DISTANCE_PROBES: SeedProbe[] = [
  {
    conceptId: COFACTOR_EXPANSION, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'What sign attaches to the cofactor C₂₃ (row 2, column 3) of a matrix?',
    choices: [
      { text: '-1 — derived explicitly from (-1)^(2+3)=(-1)^5=-1, never read off a checkerboard pattern by eye alone', isCorrect: true },
      { text: '+1 — since row 2 is even, the cofactor at any position in that row is assumed positive by pattern-matching the checkerboard visually', isCorrect: false, misconceptionId: `${COFACTOR_EXPANSION}:MC-1` },
      { text: "It cannot be determined without first computing the full matrix's determinant", isCorrect: false, misconceptionId: `${COFACTOR_EXPANSION}:MC-1` },
    ],
    targetedMisconceptions: [`${COFACTOR_EXPANSION}:MC-1`],
    source: eb(COFACTOR_EXPANSION, 'Demonstration 1 — computing the cofactor C₂₃ of a 3×3 matrix, explicitly deriving the sign (-1)^(2+3)=-1 before computing the minor, directly breaking COFACTOR-SIGN-ALTERNATION-NOT-TRACKED-CORRECTLY'),
  },
  {
    conceptId: COFACTOR_EXPANSION, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'If a 3×3 determinant is expanded along row 1, and then again along column 2, will the two expansions give the same numerical value?',
    choices: [
      { text: 'Yes — the cofactor expansion formula is a genuine THEOREM guaranteeing that any row or column expansion produces the exact same determinant value, never a coincidental agreement', isCorrect: true },
      { text: 'Not necessarily — different expansion choices might produce different numerical values, since they use different rows or columns of the matrix', isCorrect: false, misconceptionId: `${COFACTOR_EXPANSION}:MC-3` },
      { text: "Only if the matrix happens to be symmetric; otherwise different expansion choices can genuinely disagree", isCorrect: false, misconceptionId: `${COFACTOR_EXPANSION}:MC-3` },
    ],
    targetedMisconceptions: [`${COFACTOR_EXPANSION}:MC-3`],
    source: eb(COFACTOR_EXPANSION, 'Demonstration 2 — expanding a specific 3×3 determinant along row 1 and then again along column 2, confirming both give the identical numerical value, directly breaking DIFFERENT-EXPANSION-CHOICES-ASSUMED-TO-GIVE-DIFFERENT-RESULTS'),
  },
  {
    conceptId: COFACTOR_EXPANSION, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'For a 4×4 matrix where row 3 contains three zeros and no other row or column has more than one zero, which row or column should be chosen for cofactor expansion?',
    choices: [
      { text: 'Row 3 — since every term aᵢⱼCᵢⱼ with aᵢⱼ=0 contributes nothing to the sum, expanding along the sparsest row minimizes the number of (n−1)×(n−1) minors that must actually be computed, without changing the final answer', isCorrect: true },
      { text: 'Row 1 — cofactor expansion should always default to the first row regardless of how many zeros other rows or columns contain', isCorrect: false, misconceptionId: `${COFACTOR_EXPANSION}:MC-2` },
      { text: "It doesn't matter which row or column is chosen, since the amount of arithmetic required is the same regardless of how many zeros are present", isCorrect: false, misconceptionId: `${COFACTOR_EXPANSION}:MC-2` },
    ],
    targetedMisconceptions: [`${COFACTOR_EXPANSION}:MC-2`],
    source: eb(COFACTOR_EXPANSION, 'Demonstration 3 — for a matrix with one row containing two zeros, comparing the arithmetic required expanding along that row versus a row with no zeros, directly breaking EXPANSION-ROW-COLUMN-CHOSEN-WITHOUT-EFFICIENCY-CONSIDERATION'),
  },
  {
    conceptId: DET_PROPERTIES, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'For a 3×3 matrix A with det(A)=5, what is det(2A)?',
    choices: [
      { text: '40 — using det(cA)=cⁿdet(A) with n=3: 2³×5=8×5=40, since EVERY one of the 3 rows independently contributes its own factor of 2', isCorrect: true },
      { text: '10 — using det(2A)=2×det(A)=2×5=10, treating the scalar as multiplying the determinant just once', isCorrect: false, misconceptionId: `${DET_PROPERTIES}:MC-1` },
      { text: "It cannot be determined without knowing the individual entries of A", isCorrect: false, misconceptionId: `${DET_PROPERTIES}:MC-1` },
    ],
    targetedMisconceptions: [`${DET_PROPERTIES}:MC-1`],
    source: eb(DET_PROPERTIES, 'Demonstration 1 — for a 3×3 matrix with det(A)=5, computing det(2A)=2³×5=40, contrasted against the incorrect 2×5=10, directly breaking SCALAR-DETERMINANT-PROPERTY-USES-C-INSTEAD-OF-C-TO-THE-N'),
  },
  {
    conceptId: DET_PROPERTIES, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'For a 3×3 matrix A with det(A)=7, if only ONE row is scaled by 3 (not the whole matrix), what is the new determinant?',
    choices: [
      { text: '21 — scaling a SINGLE row by 3 multiplies the determinant by just ONE factor of 3 (3×7=21), genuinely different from scaling the WHOLE matrix by 3, which would give 3³×7', isCorrect: true },
      { text: '189 — since scaling by 3 always uses the whole-matrix rule 3ⁿ×7=27×7=189, regardless of how many rows were actually touched', isCorrect: false, misconceptionId: `${DET_PROPERTIES}:MC-2` },
      { text: "7 — scaling a single row by any nonzero factor never changes the determinant's value", isCorrect: false, misconceptionId: `${DET_PROPERTIES}:MC-2` },
    ],
    targetedMisconceptions: [`${DET_PROPERTIES}:MC-2`],
    source: eb(DET_PROPERTIES, 'Demonstration 2 — for det(A)=7, comparing scaling ONE row by 3 (giving 21) against scaling the WHOLE matrix by 3 (which would instead give 3ⁿ×7), directly breaking SINGLE-ROW-SCALING-CONFUSED-WITH-WHOLE-MATRIX-SCALING'),
  },
  {
    conceptId: DET_PROPERTIES, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'For a matrix A with det(A)=7, if two rows are swapped, what is the new determinant?',
    choices: [
      { text: '-7 — swapping two rows FLIPS the sign of the determinant; only adding a multiple of one row to another leaves the determinant unchanged, not a swap', isCorrect: true },
      { text: '7 — row operations never change the determinant\'s value, including swapping two rows', isCorrect: false, misconceptionId: `${DET_PROPERTIES}:MC-3` },
      { text: "It cannot be determined without knowing which specific two rows were swapped", isCorrect: false, misconceptionId: `${DET_PROPERTIES}:MC-3` },
    ],
    targetedMisconceptions: [`${DET_PROPERTIES}:MC-3`],
    source: eb(DET_PROPERTIES, 'Demonstration 3 — for det(A)=7, verifying a row swap gives -7 while adding 2× row 1 to row 2 leaves the determinant at exactly 7, directly breaking ROW-SWAP-SIGN-CHANGE-FORGOTTEN'),
  },
  {
    conceptId: DISTANCE, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'To find the distance between u=(1,2) and v=(4,6), does it matter whether you compute ‖u−v‖ or ‖v−u‖?',
    choices: [
      { text: 'No — ‖u−v‖=‖v−u‖ always, since ‖−x‖=‖x‖; both give d(u,v)=√((1−4)²+(2−6)²)=5, though picking one order consistently avoids sign errors in intermediate steps', isCorrect: true },
      { text: 'Yes — computing u−v gives a genuinely different final distance value than computing v−u', isCorrect: false, misconceptionId: `${DISTANCE}:MC-1` },
      { text: "Yes, since v−u is undefined when v has larger components than u", isCorrect: false, misconceptionId: `${DISTANCE}:MC-1` },
    ],
    targetedMisconceptions: [`${DISTANCE}:MC-1`],
    source: eb(DISTANCE, 'Demonstration 1 — computing d((1,2),(4,6)) via ‖u−v‖=5, confirming the same result via ‖v−u‖, directly breaking DISTANCE-SUBTRACTION-ORDER-NOT-TRACKED-CONSISTENTLY'),
  },
  {
    conceptId: DISTANCE, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'For the collinear points u=(0,0), v=(1,0), w=(3,0) with v between u and w, is the triangle inequality d(u,w)≤d(u,v)+d(v,w) a strict inequality or an equality?',
    choices: [
      { text: 'An equality — d(u,v)=1, d(v,w)=2, d(u,w)=3=1+2 exactly, since the three points are COLLINEAR with v BETWEEN u and w, so going through v adds no extra distance at all', isCorrect: true },
      { text: 'A strict inequality — the triangle inequality is always strictly less-than, and can never be an equality for any three points', isCorrect: false, misconceptionId: `${DISTANCE}:MC-2` },
      { text: "It cannot be an equality since v is a genuinely different point from both u and w", isCorrect: false, misconceptionId: `${DISTANCE}:MC-2` },
    ],
    targetedMisconceptions: [`${DISTANCE}:MC-2`],
    source: eb(DISTANCE, 'Demonstration 2 — constructing three collinear points and confirming d(u,w)=d(u,v)+d(v,w) exactly, then contrasting with three non-collinear points where the inequality is strict, directly breaking TRIANGLE-INEQUALITY-ASSUMED-ALWAYS-STRICT-EQUALITY'),
  },
  {
    conceptId: DISTANCE, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'For a different collinear triple u=(1,1), v=(3,1), w=(6,1) with v between u and w, what is the relationship between d(u,w) and d(u,v)+d(v,w)?',
    choices: [
      { text: 'd(u,w)=d(u,v)+d(v,w) exactly — d(u,v)=2, d(v,w)=3, d(u,w)=5=2+3; the equality case holds again because these three points are collinear with v between u and w, just like Demonstration 2', isCorrect: true },
      { text: 'd(u,w)<d(u,v)+d(v,w) strictly — since u, v, and w are three distinct points, the triangle inequality can never reach equality for a genuinely different triple', isCorrect: false, misconceptionId: `${DISTANCE}:MC-2` },
      { text: "d(u,w)>d(u,v)+d(v,w) — going directly from u to w is longer than the two-hop path through v", isCorrect: false, misconceptionId: `${DISTANCE}:MC-2` },
    ],
    targetedMisconceptions: [`${DISTANCE}:MC-2`],
    source: eb(DISTANCE, 'Assessment Signals Rung 3 and Tutor Recovery Strategy — a fresh collinear triple (u=(1,1), v=(3,1), w=(6,1)) distinct from Demonstration 2’s example, directly breaking TRIANGLE-INEQUALITY-ASSUMED-ALWAYS-STRICT-EQUALITY a second, independent way since distance.md registers only two misconceptions'),
  },
]
