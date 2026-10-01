/**
 * Batch: real-integral-residues, riemann-mapping, rouche-theorem (math.cx) —
 * 26/31 -> 29/31.
 *
 * Continuing through math.cx's final 11 concepts. Only 2 remain after this
 * batch: riemann-surface and riemann-zeta.
 *
 * Cross-link: real-integral-residues declares math.calc.improper-integrals
 * (confirmed authored — genuine cross-link, the limit-based definition of
 * the real integral this concept's contour technique evaluates).
 * riemann-mapping and rouche-theorem declare no cross-link.
 *
 * Transcribed from their frozen Educational Brain entries at educational-
 * brain/concepts/mathematics/math.cx.{real-integral-residues,
 * riemann-mapping,rouche-theorem}.md.
 *
 * Grade band: GradeBand.UNDERGRADUATE, matching this domain's established
 * convention for expert/research-tier content (real-integral-residues and
 * rouche-theorem are expert tier; riemann-mapping is research tier).
 *
 * All 3 EB entries register exactly 3 formal misconceptions each (full
 * contract, no retargeting needed).
 *
 * Seeded as DRAFT. Promotion stays human.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedExplanation, SeedProbe } from './brainSeedAssets'

const S = 'mathematics'
const eb = (id: string, what: string) =>
  `educational-brain/concepts/mathematics/${id}.md — ${what}`

const REAL_INTEGRAL_RESIDUES = 'math.cx.real-integral-residues'
const RIEMANN_MAPPING = 'math.cx.riemann-mapping'
const ROUCHE_THEOREM = 'math.cx.rouche-theorem'

export const MATHEMATICS_CX_REAL_INTEGRAL_RESIDUES_RIEMANN_MAPPING_ROUCHE_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: REAL_INTEGRAL_RESIDUES, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'CLOSING THE CONTOUR IS THE ESSENTIAL SETUP STEP — NEVER SOMETHING THE RESIDUE THEOREM '
      + 'SKIPS: to evaluate the integral from −∞ to ∞ of 1/(x²+1) dx: extend to f(z)=1/(z²+1) '
      + '(poles at z=±i), close the real segment [−R,R] with the upper semicircular arc C_R. For '
      + 'R>1, this closed contour ENCLOSES z=i but NOT z=−i — setting up exactly the situation the '
      + 'residue theorem applies to. Believing the residue theorem can be applied directly to the '
      + 'OPEN real-axis integral, without first closing it into a genuine closed contour, is WRONG '
      + '— closing the contour with a semicircular arc is the essential setup move making the '
      + 'residue theorem applicable AT ALL.\n\n'
      + 'THE ARC\'S VANISHING MUST BE SEPARATELY JUSTIFIED — NEVER ASSUMED AUTOMATIC: continuing '
      + 'the example: Res(f,i)=1/(2i), so the residue theorem gives the closed contour integral = '
      + '2πi·1/(2i)=π. But this is NOT yet the real integral — bounding the arc: |f(z)|≤1/(R²−1) on '
      + 'C_R, so |integral over C_R of f dz|≤πR/(R²−1)→0 as R→∞. ONLY after this SEPARATE '
      + 'vanishing argument does the real integral from −∞ to ∞ of f dx = π follow. Believing the '
      + 'closed-contour value from the residue theorem automatically equals the real integral '
      + 'wanted, with no further justification needed, is WRONG — the residue theorem hands you the '
      + 'CLOSED contour\'s value; the arc\'s own contribution must be explicitly shown to vanish '
      + 'before equating that to the real integral.\n\n'
      + 'OSCILLATORY INTEGRANDS NEED JORDAN\'S LEMMA — NEVER THE SAME SIMPLE BOUND: for the '
      + 'integral from −∞ to ∞ of cos(x)/(x²+1) dx, using f(z)=e^(iz)/(z²+1): the naive ML-bound '
      + 'from the polynomial case doesn\'t directly transfer, since |e^(iz)|=e^(−y) (for z=x+iy) '
      + 'DECAYS in the upper half-plane rather than staying bounded the way a polynomial\'s '
      + 'magnitude does — a genuinely DIFFERENT, oscillatory-decay behavior that Jordan\'s lemma is '
      + 'specifically designed to exploit. Believing the same simple arc-vanishing bound works for '
      + 'any integrand, including one with an oscillatory factor like e^(iax), is WRONG — '
      + 'oscillatory integrands require Jordan\'s lemma\'s specifically different, tailored '
      + 'estimate; the simpler polynomial-decay bound does not automatically transfer.',
    targetedMisconceptions: [`${REAL_INTEGRAL_RESIDUES}:MC-1`, `${REAL_INTEGRAL_RESIDUES}:MC-2`, `${REAL_INTEGRAL_RESIDUES}:MC-3`],
    source: eb(REAL_INTEGRAL_RESIDUES, 'Core Understanding — closing the contour being the essential setup step never something the residue theorem skips, the arc\'s vanishing needing to be separately justified never assumed automatic, and oscillatory integrands needing Jordan\'s lemma never the same simple bound'),
  },
  {
    conceptId: RIEMANN_MAPPING, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'THE HYPOTHESES ARE GENUINE RESTRICTIONS — NEVER SATISFIED BY EVERY OPEN SUBSET: checking '
      + 'four candidates: the open unit square (simply connected AND proper — theorem APPLIES); the '
      + 'upper half-plane (simply connected AND proper — theorem APPLIES); ℂ itself (NOT proper — '
      + 'theorem does NOT apply); an annulus {1<|z|<2} (NOT simply connected, has a hole — theorem '
      + 'does NOT apply). Believing the Riemann Mapping Theorem applies to EVERY open subset of ℂ '
      + 'is WRONG — both the simply-connected and proper-subset hypotheses are genuine '
      + 'restrictions, and two of the four candidates genuinely fail them.\n\n'
      + 'UNIQUENESS REQUIRES EXACTLY THREE REAL NORMALIZING CONDITIONS — NEVER AUTOMATIC: for '
      + 'Ω=the upper half-plane with SOME biholomorphism f₀(z)=(z−i)/(z+i): composing with ANY of '
      + 'the 3-real-parameter family of disc automorphisms φₐ(w)=e^(iθ)(w−a)/(1−āw) gives infinitely '
      + 'many OTHER valid biholomorphisms. Only after imposing exactly 3 real conditions (fixing '
      + 'z₀=i↦0: 2 real conditions; fixing f′(i)\'s argument positive: 1 more) is the map pinned '
      + 'down UNIQUELY. Believing the biholomorphism guaranteed by the theorem is automatically '
      + 'unique is WRONG — a genuine 3-real-parameter family of valid maps exists prior to '
      + 'normalization; exactly 3 real conditions must be spent to pin down one specific map.\n\n'
      + 'BOTH HYPOTHESES ARE LOAD-BEARING — NEVER MINOR TECHNICAL FINE PRINT: for Ω=ℂ '
      + '(proper-subset hypothesis dropped): any holomorphic f:ℂ→𝔻 is bounded, and Liouville\'s '
      + 'theorem forces any bounded ENTIRE function to be CONSTANT — a constant function can never '
      + 'be a bijection, so NO such biholomorphism can exist. For Ω={1<|z|<2} (simply-connected '
      + 'hypothesis dropped): a loop encircling the inner boundary cannot be continuously shrunk to '
      + 'a point WITHIN the annulus — a genuine topological obstruction 𝔻 does not share. Believing '
      + 'the theorem\'s hypotheses are minor technical fine print rather than genuinely necessary '
      + 'conditions is WRONG — dropping either one makes the conclusion demonstrably FALSE, via a '
      + 'concrete, fully-reasoned counterexample in each case.',
    targetedMisconceptions: [`${RIEMANN_MAPPING}:MC-1`, `${RIEMANN_MAPPING}:MC-2`, `${RIEMANN_MAPPING}:MC-3`],
    source: eb(RIEMANN_MAPPING, 'Core Understanding — the hypotheses being genuine restrictions never satisfied by every open subset, uniqueness requiring exactly three real normalizing conditions never automatic, and both hypotheses being load-bearing never minor technical fine print'),
  },
  {
    conceptId: ROUCHE_THEOREM, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'THE DOMINATION CONDITION HOLDS ONLY ON THE CONTOUR — NEVER REQUIRED INSIDE IT: for '
      + 'f(z)=z⁵+3z³+7, g(z)=z⁵, checked on |z|=2: |f(z)−g(z)|=|3z³+7|≤3·8+7=31<32=|z|⁵=|g(z)| — the '
      + 'inequality is verified ONLY at points on the CURVE |z|=2, never at interior points. By '
      + 'Rouché, f has the SAME zero count as g (5, all at z=0) inside |z|=2. Believing the '
      + 'domination condition must hold for all z INSIDE the contour C (not just on C) is WRONG — '
      + 'the proof uses continuity of the winding number as a function of t∈[0,1] evaluated ON C; '
      + 'the interior geometry never enters.\n\n'
      + 'FTA VIA ROUCHÉ NEEDS R LARGE ENOUGH FOR THE LEADING TERM TO DOMINATE — NEVER ANY RADIUS: '
      + 'for p(z)=aₙzⁿ+⋯+a₀, g(z)=aₙzⁿ: on |z|=R, |p−g|≤|aₙ₋₁|R^(n−1)+⋯+|a₀| while |g|=|aₙ|Rⁿ. For '
      + 'LARGE R, the degree-n growth of |g| eventually outpaces the lower-degree sum — but for a '
      + 'SMALL R (e.g., R=0.01 for p(z)=z⁵+2z³+z−6), the CONSTANT term −6 dominates instead, and the '
      + 'domination check with g=aₙzⁿ FAILS. Believing any choice of circle radius R makes the '
      + 'domination condition hold in the FTA-via-Rouché proof is WRONG — R must be large enough '
      + 'specifically for the leading monomial to dominate every lower-order term; for small R, a '
      + 'different choice of g is needed entirely.\n\n'
      + 'ROUCHÉ GIVES EQUAL ZERO COUNTS — NEVER EQUAL ZERO LOCATIONS: for f(z)=z⁵+3z³+7 and g(z)=z⁵ '
      + 'inside |z|=2: f\'s 5 zeros are spread across the complex plane at genuinely different '
      + 'points, while g\'s 5 zeros are ALL located at z=0 — yet Rouché correctly concludes they '
      + 'have the SAME COUNT (5) inside |z|=2, saying NOTHING about where those zeros actually sit. '
      + 'Believing Rouché\'s theorem concludes f and g have the same zeros (same locations), not '
      + 'just the same number of zeros, is WRONG — it is purely a COUNTING result; the zero '
      + 'locations of f and g can be, and typically are, completely different.',
    targetedMisconceptions: [`${ROUCHE_THEOREM}:MC-1`, `${ROUCHE_THEOREM}:MC-2`, `${ROUCHE_THEOREM}:MC-3`],
    source: eb(ROUCHE_THEOREM, 'Core Understanding — the domination condition holding only on the contour never required inside it, FTA via Rouché needing R large enough for the leading term to dominate never any radius, and Rouché giving equal zero counts never equal zero locations'),
  },
]

export const MATHEMATICS_CX_REAL_INTEGRAL_RESIDUES_RIEMANN_MAPPING_ROUCHE_PROBES: SeedProbe[] = [
  {
    conceptId: REAL_INTEGRAL_RESIDUES, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE, difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'To evaluate the real integral from −∞ to ∞ of 1/(x²+1) dx using residues, can you apply the residue theorem directly to this open real-axis integral?',
    choices: [
      { text: 'Yes, the residue theorem applies directly since 1/(x²+1) already decays to 0 at infinity', isCorrect: false, misconceptionId: `${REAL_INTEGRAL_RESIDUES}:MC-1` },
      { text: 'No — you must first close the contour by extending to f(z) = 1/(z²+1) and adding a semicircular arc C_R, forming a genuine closed contour that encloses z = i, before the residue theorem applies at all', isCorrect: true },
      { text: 'No, because real integrals can never be evaluated using complex-analysis techniques', isCorrect: false },
      { text: 'Yes, as long as you divide the final answer by 2 to account for only using half the plane', isCorrect: false },
    ],
    targetedMisconceptions: [`${REAL_INTEGRAL_RESIDUES}:MC-1`],
    source: eb(REAL_INTEGRAL_RESIDUES, 'Demonstration 1 — the 1/(x^2+1) contour-closing setup and pole identification'),
  },
  {
    conceptId: REAL_INTEGRAL_RESIDUES, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE, difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'The residue theorem gives the closed contour integral of f(z) = 1/(z²+1) over [−R,R] plus the arc C_R as equal to π. Can you immediately conclude the real integral from −∞ to ∞ of 1/(x²+1) dx equals π?',
    choices: [
      { text: 'Yes, the closed-contour value from the residue theorem is automatically the real integral you wanted', isCorrect: false, misconceptionId: `${REAL_INTEGRAL_RESIDUES}:MC-2` },
      { text: 'No — you must separately show the arc\'s contribution vanishes as R → ∞ (here via the ML-bound |f(z)| ≤ 1/(R²−1), giving an arc bound of πR/(R²−1) → 0); only after that separate step does the real integral equal π', isCorrect: true },
      { text: 'No, because the residue theorem only applies to functions with no real poles, which is not guaranteed here', isCorrect: false },
      { text: 'No, the closed-contour value and the real integral are always unrelated quantities', isCorrect: false },
    ],
    targetedMisconceptions: [`${REAL_INTEGRAL_RESIDUES}:MC-2`],
    source: eb(REAL_INTEGRAL_RESIDUES, 'Demonstration 2 — the explicit ML-bound arc-vanishing computation completing the evaluation'),
  },
  {
    conceptId: REAL_INTEGRAL_RESIDUES, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE, difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'For the integral from −∞ to ∞ of cos(x)/(x²+1) dx, you extend to f(z) = e^(iz)/(z²+1) rather than using the same polynomial-decay ML-bound as before. Why is a different estimate (Jordan\'s lemma) needed here?',
    choices: [
      { text: 'The same simple bound works fine here too; Jordan\'s lemma is an optional alternative, not a necessity', isCorrect: false, misconceptionId: `${REAL_INTEGRAL_RESIDUES}:MC-3` },
      { text: 'Because |e^(iz)| = e^(−y) decays in the upper half-plane in a genuinely different way than a polynomial\'s magnitude stays bounded, so Jordan\'s lemma\'s oscillatory-decay estimate is specifically needed, not the polynomial-case ML-bound', isCorrect: true },
      { text: 'Because cos(x)/(x²+1) has no poles at all, so no residue computation is needed in the first place', isCorrect: false },
      { text: 'Because oscillatory integrands can never be evaluated using contour integration', isCorrect: false },
    ],
    targetedMisconceptions: [`${REAL_INTEGRAL_RESIDUES}:MC-3`],
    source: eb(REAL_INTEGRAL_RESIDUES, 'Demonstration 3 — the cos(x)/(x^2+1) Jordan\'s-lemma oscillatory-decay contrast'),
  },
  {
    conceptId: RIEMANN_MAPPING, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE, difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Does the Riemann Mapping Theorem guarantee a biholomorphism to the unit disc for EVERY open subset of ℂ, including ℂ itself and an annulus {1 < |z| < 2}?',
    choices: [
      { text: 'Yes, the theorem applies to any open subset of ℂ without restriction', isCorrect: false, misconceptionId: `${RIEMANN_MAPPING}:MC-1` },
      { text: 'No — the theorem requires the domain to be BOTH simply connected AND a proper subset of ℂ; ℂ itself fails "proper" and the annulus fails "simply connected," so neither qualifies, while the open unit square and the upper half-plane both do', isCorrect: true },
      { text: 'No, the theorem only applies to bounded domains with a smooth boundary', isCorrect: false },
      { text: 'No, the theorem applies only to convex domains', isCorrect: false },
    ],
    targetedMisconceptions: [`${RIEMANN_MAPPING}:MC-1`],
    source: eb(RIEMANN_MAPPING, 'Demonstration 1 — the four-way domain classification (square, half-plane, C, annulus)'),
  },
  {
    conceptId: RIEMANN_MAPPING, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE, difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'The Riemann Mapping Theorem guarantees a biholomorphism from the upper half-plane to the unit disc exists. Once one such map f₀ is found, is it the unique one guaranteed by the theorem?',
    choices: [
      { text: 'Yes, the theorem guarantees a single canonical biholomorphism, and f₀ must be it', isCorrect: false, misconceptionId: `${RIEMANN_MAPPING}:MC-2` },
      { text: 'No — composing f₀ with any of the 3-real-parameter family of disc automorphisms gives infinitely many other valid biholomorphisms; a unique map requires spending exactly 3 real normalizing conditions (e.g., fixing where one point maps to, plus the argument of the derivative there)', isCorrect: true },
      { text: 'No, because the theorem only guarantees existence, never any specific map at all', isCorrect: false },
      { text: 'Yes, but only because the upper half-plane happens to have no other biholomorphisms to the disc', isCorrect: false },
    ],
    targetedMisconceptions: [`${RIEMANN_MAPPING}:MC-2`],
    source: eb(RIEMANN_MAPPING, 'Demonstration 2 — the disc-automorphism-family-to-unique-map normalization computation'),
  },
  {
    conceptId: RIEMANN_MAPPING, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE, difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Are the Riemann Mapping Theorem\'s "simply connected" and "proper subset" hypotheses minor technical fine print, or genuinely necessary conditions?',
    choices: [
      { text: 'They are minor technicalities; the theorem\'s conclusion likely still holds approximately even if one is dropped', isCorrect: false, misconceptionId: `${RIEMANN_MAPPING}:MC-3` },
      { text: 'They are genuinely load-bearing: dropping "proper" (taking Ω = ℂ) makes any such biholomorphism impossible by Liouville\'s theorem, and dropping "simply connected" (taking an annulus) creates a genuine topological obstruction — both concrete counterexamples show the conclusion becomes demonstrably false', isCorrect: true },
      { text: 'Only "simply connected" is load-bearing; "proper subset" can always be dropped safely', isCorrect: false },
      { text: 'Only "proper subset" is load-bearing; "simply connected" can always be dropped safely', isCorrect: false },
    ],
    targetedMisconceptions: [`${RIEMANN_MAPPING}:MC-3`],
    source: eb(RIEMANN_MAPPING, 'Demonstration 3 — the Liouville-based and topological-obstruction counterexamples'),
  },
  {
    conceptId: ROUCHE_THEOREM, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE, difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'To apply Rouché\'s theorem with f(z) = z⁵+3z³+7 and g(z) = z⁵ on the circle |z| = 2, where must the domination condition |f(z) − g(z)| < |g(z)| be verified?',
    choices: [
      { text: 'At every point inside the disc |z| < 2, not just on the boundary circle', isCorrect: false, misconceptionId: `${ROUCHE_THEOREM}:MC-1` },
      { text: 'Only on the boundary curve |z| = 2 itself; the interior geometry never enters the check, since the proof relies on continuity of the winding number evaluated on that curve', isCorrect: true },
      { text: 'Only at the single point where |g(z)| is smallest on the circle', isCorrect: false },
      { text: 'At the origin only, since that is where g(z) = z⁵ vanishes', isCorrect: false },
    ],
    targetedMisconceptions: [`${ROUCHE_THEOREM}:MC-1`],
    source: eb(ROUCHE_THEOREM, 'Demonstration 1 — the z^5+3z^3+7-versus-z^5 boundary-only domination check on |z|=2'),
  },
  {
    conceptId: ROUCHE_THEOREM, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE, difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'In the FTA-via-Rouché proof for p(z) = z⁵ + 2z³ + z − 6 with g(z) = z⁵, does any choice of circle radius R make the domination condition |p − g| < |g| hold on |z| = R?',
    choices: [
      { text: 'Yes, any positive R works since g always has the highest degree', isCorrect: false, misconceptionId: `${ROUCHE_THEOREM}:MC-2` },
      { text: 'No — for a small R (e.g., R = 0.01), the constant term −6 dominates instead and the domination check with g = z⁵ FAILS; R must be large enough for the degree-5 growth of |g| to outpace the lower-degree terms', isCorrect: true },
      { text: 'No, because the domination condition can never hold for a degree-5 polynomial', isCorrect: false },
      { text: 'Yes, but only if g is chosen to be the constant term instead of z⁵', isCorrect: false },
    ],
    targetedMisconceptions: [`${ROUCHE_THEOREM}:MC-2`],
    source: eb(ROUCHE_THEOREM, 'Demonstration 2 — the small-R domination-failure computation for z^5+2z^3+z-6'),
  },
  {
    conceptId: ROUCHE_THEOREM, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE, difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Rouché\'s theorem concludes f(z) = z⁵+3z³+7 and g(z) = z⁵ have the same number of zeros (5) inside |z| = 2, even though g\'s zeros are all concentrated at z = 0 while f\'s zeros are scattered elsewhere. What does this tell you about what Rouché\'s theorem actually proves?',
    choices: [
      { text: 'It proves f and g have the same zeros in the same locations, so f\'s zeros must also all be at z = 0', isCorrect: false, misconceptionId: `${ROUCHE_THEOREM}:MC-3` },
      { text: 'It is purely a counting result: f and g have the same NUMBER of zeros inside the contour, but their zero locations can be, and typically are, completely different', isCorrect: true },
      { text: 'It proves f and g are actually the same function', isCorrect: false },
      { text: 'The conclusion is contradictory, since equal zero counts should imply equal zero locations', isCorrect: false },
    ],
    targetedMisconceptions: [`${ROUCHE_THEOREM}:MC-3`],
    source: eb(ROUCHE_THEOREM, 'Demonstration 3 — the scattered-versus-concentrated zero-location contrast for z^5+3z^3+7 and z^5'),
  },
]
