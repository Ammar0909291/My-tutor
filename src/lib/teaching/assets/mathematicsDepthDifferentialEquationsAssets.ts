/**
 * MATHEMATICS — probe DEPTH, batch 13: math.de (56 (concept, band) pairs, 112 probes).
 *
 * Why depth, and the identity rule every probe here obeys, are stated once in
 * mathematicsDepthArithAssets.ts (batch 1): five gradeable probes per pair so a
 * learner recovers from one or two mistakes on questions they have not seen;
 * every probe extends the pair's existing ladder slot at an unused difficulty
 * rung, so no seeded probe is re-identified.
 *
 * Every solution below was substituted back, e.g. v = y⁻² turns
 * y′ + y = y³ into v′ − 2v = −2, x²y + 3x − y = C solves the exact
 * (2xy + 3) dx + (x² − 1) dy = 0, y = 0 is the singular solution of
 * (y′)² = 4y, sin x · sinh(π − y)/sinh π meets all four edge conditions, the
 * Euler steps for y′ = x + y are 1.5 then 2.5, and y″ + y = 0, y(0) = 0,
 * y(π) = 1 has no solution because sin π = 0.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedProbe } from './brainSeedAssets'

const S = 'mathematics'
const UG = GradeBand.UNDERGRADUATE
const { DEVELOPING: D, ADVANCED: A } = ProbeDifficulty

function q(
  conceptId: string, difficulty: ProbeDifficulty,
  stem: string, correct: string, wrong: string[], what: string,
): SeedProbe {
  return {
    conceptId, subjectSlug: S, probeKind: 'mcq', gradeBand: UG, difficulty, stem,
    choices: [{ text: correct, isCorrect: true }, ...wrong.map((text) => ({ text, isCorrect: false }))],
    correctValue: correct,
    targetedMisconceptions: [],
    source: `educational-brain/concepts/mathematics/${conceptId}.md — probe-depth set 2026-10-02: ${what}`,
  }
}

export const MATHEMATICS_DEPTH_DIFFERENTIAL_EQUATIONS_PROBES: SeedProbe[] = [
  q('math.de.bernoulli', D, 'Which substitution makes y′ + y = y³ linear?', 'v = y⁻²', ['v = y³', 'v = y²', 'v = y⁻³'], 'v = y^(1 − n) with n = 3'),
  q('math.de.bernoulli', A, 'With v = y⁻², what linear equation does y′ + y = y³ become?', 'v′ − 2v = −2', ['v′ + v = 1', 'v′ + 2v = 2', 'v′ − 2v = 1'], 'v′ = −2y⁻³y′ = −2y⁻³(y³ − y)'),

  q('math.de.bessel-equation', D, 'What is J₀(0)?', '1', ['0', '∞', '1/2'], 'the series starts 1 − x²/4 + ⋯'),
  q('math.de.bessel-equation', A, 'What happens to Y₀(x) as x → 0⁺?', 'It tends to −∞', ['It tends to 0', 'It tends to 1', 'It oscillates but stays bounded'], 'the logarithmic singularity, so bounded solutions drop Y₀'),

  q('math.de.bifurcation', D, 'For x′ = r + x², how many equilibria are there when r < 0?', '2', ['0', '1', '3'], 'x = ±√(−r)'),
  q('math.de.bifurcation', A, 'Which bifurcation does x′ = rx − x³ undergo at r = 0?', 'A supercritical pitchfork', ['A saddle-node', 'A transcritical', 'A Hopf'], 'two new stable branches ±√r appear as r passes 0'),

  q('math.de.bvp', D, 'Solve y″ = 0 with y(0) = 1 and y(1) = 3.', 'y = 2x + 1', ['y = 3x + 1', 'y = x + 1', 'y = 3x'], 'a line through both boundary points'),
  q('math.de.bvp', A, 'How many solutions does y″ + y = 0 with y(0) = 0 and y(π) = 1 have?', 'None', ['Exactly one', 'Infinitely many', 'Two'], 'y(0) = 0 forces y = B sin x, and sin π = 0 ≠ 1'),

  q('math.de.chaos', D, 'Which property is a hallmark of chaos?', 'Sensitive dependence on initial conditions', ['Randomness in the equations', 'Solutions that blow up', 'Purely periodic motion'], 'deterministic yet unpredictable'),
  q('math.de.chaos', A, 'The largest Lyapunov exponent is 0.5. Roughly how does an initial error of 10⁻⁶ grow?', 'Like 10⁻⁶ e^(0.5t)', ['Like 10⁻⁶ + 0.5t', 'Like 10⁻⁶ · 0.5ᵗ', 'It stays near 10⁻⁶'], 'exponential separation at rate λ'),

  q('math.de.char-equation', D, 'What is the characteristic equation of y″ − 5y′ + 6y = 0?', 'r² − 5r + 6 = 0', ['r² + 5r + 6 = 0', 'r² − 6r + 5 = 0', 'r − 5 = 0'], 'substitute y = e^(rx)'),
  q('math.de.char-equation', A, 'The characteristic roots are 2 ± 3i. What is the general solution?', 'e^(2x)(C₁ cos 3x + C₂ sin 3x)', ['e^(3x)(C₁ cos 2x + C₂ sin 2x)', 'C₁e^(2x) + C₂e^(3x)', 'e^(2x)(C₁ + C₂x)'], 'real part in the exponent, imaginary part in the oscillation'),

  q('math.de.convolution-theorem', D, 'What is the convolution (1 ∗ 1)(t) = ∫₀ᵗ 1 · 1 dτ?', 't', ['1', 't²/2', '0'], 'the length of [0, t]'),
  q('math.de.convolution-theorem', A, 'Using the convolution theorem, what is L⁻¹{1/(s(s − 1))}?', 'eᵗ − 1', ['eᵗ', '1 − e⁻ᵗ', 'teᵗ'], '1 ∗ eᵗ = ∫₀ᵗ e^τ dτ'),

  q('math.de.eigenfunction-expansion', D, 'In f = Σ cₙ sin(nx) on [0, π], what is cₙ?', '(2/π)∫₀^π f(x) sin(nx) dx', ['(1/π)∫₀^π f(x) sin(nx) dx', '∫₀^π f(x) sin(nx) dx', '(2/π)∫₀^π f(x) cos(nx) dx'], '⟨f, φₙ⟩/⟨φₙ, φₙ⟩ with ⟨φₙ, φₙ⟩ = π/2'),
  q('math.de.eigenfunction-expansion', A, 'Expanding f(x) = sin 3x on [0, π] in the eigenfunctions sin(nx), what are the coefficients?', 'c₃ = 1 and all others are 0', ['All equal 1/3', 'c₃ = 3 and all others are 0', 'c₁ = 1 and all others are 0'], 'orthogonality picks out one mode'),

  q('math.de.euler-method', D, 'For y′ = y, y(0) = 1 and step h = 0.1, what is the first Euler estimate y₁?', '1.1', ['1', '1.105', '0.1'], 'y₀ + h · y₀'),
  q('math.de.euler-method', A, 'For y′ = x + y, y(0) = 1 and h = 0.5, what is the Euler estimate at x = 1?', '2.5', ['2', '3', '2.25'], 'y₁ = 1 + 0.5 · 1 = 1.5, y₂ = 1.5 + 0.5 · 2'),

  q('math.de.exact-ode', D, 'Is (2xy + 3) dx + (x² − 1) dy = 0 exact?', 'Yes, since ∂M/∂y = ∂N/∂x = 2x', ['No, since M and N differ', 'No, since ∂M/∂y is not 0', 'Only for x > 0'], 'compare the cross partials'),
  q('math.de.exact-ode', A, 'What is the solution of (2xy + 3) dx + (x² − 1) dy = 0?', 'x²y + 3x − y = C', ['x²y + 3x = C', '2xy + 3x − y = C', 'x²y − y = C'], 'F_x = 2xy + 3 and F_y = x² − 1'),

  q('math.de.existence-uniqueness', D, 'For y′ = f(x, y), which condition near (x₀, y₀) guarantees a unique local solution?', 'f and ∂f/∂y are continuous', ['f is differentiable in x only', 'f is bounded', 'f is positive'], 'the Picard–Lindelöf hypotheses'),
  q('math.de.existence-uniqueness', A, 'How many solutions does y′ = 3y^(2/3) with y(0) = 0 have?', 'More than one; y = 0 and y = x³ both work', ['Exactly one', 'None', 'Exactly one, y = x³'], '∂f/∂y = 2y^(−1/3) blows up at y = 0'),

  q('math.de.first-order-ode', D, 'What is the general solution of y′ = 2y?', 'y = Ce^(2x)', ['y = e^(2x)', 'y = 2x + C', 'y = Ce^(x²)'], 'separate and integrate; keep the constant'),
  q('math.de.first-order-ode', A, 'Solve y′ = xy with y(0) = 3.', 'y = 3e^(x²/2)', ['y = 3e^(x²)', 'y = e^(x²/2) + 2', 'y = 3eˣ'], 'ln|y| = x²/2 + C'),

  q('math.de.fourier-convergence', D, 'f jumps from 1 to 3 at x₀. What does its Fourier series converge to at x₀?', '2', ['1', '3', 'It diverges there'], 'the average of the one-sided limits'),
  q('math.de.fourier-convergence', A, 'Which condition on a piecewise-smooth periodic f makes its Fourier series converge uniformly?', 'f is continuous, with no jumps, including at the endpoints', ['f is bounded', 'f is even', 'f has finitely many jumps'], 'jumps force the Gibbs overshoot'),

  q('math.de.fourier-series', D, 'For an odd function on [−π, π], which Fourier coefficients vanish?', 'Every aₙ, including a₀', ['Every bₙ', 'Only a₀', 'None of them'], 'odd times cosine is odd'),
  q('math.de.fourier-series', A, 'What is b₁ for f(x) = x on [−π, π]?', '2', ['1', 'π', '0'], 'bₙ = 2(−1)ⁿ⁺¹/n'),

  q('math.de.fourier-sine-cosine', D, 'To expand f on [0, L] in a sine series, which extension of f is used?', 'The odd extension', ['The even extension', 'A periodic copy with no reflection', 'The zero extension'], 'sines are odd'),
  q('math.de.fourier-sine-cosine', A, 'What is the constant term a₀/2 of the cosine series of f(x) = x on [0, π]?', 'π/2', ['π', '0', 'π²/2'], 'a₀ = (2/π)∫₀^π x dx = π; the mean value'),

  q('math.de.fourier-transform', D, 'If f has Fourier transform F(ω), what is the transform of f′ (with the e^(−iωt) convention)?', 'iωF(ω)', ['F′(ω)', 'F(ω)/(iω)', '−F(ω)'], 'integrate by parts'),
  q('math.de.fourier-transform', A, 'Which function has a Fourier transform that is again a Gaussian?', 'e^(−x²)', ['1', 'eˣ', 'sin x'], 'Gaussians are self-similar under the transform'),

  q('math.de.frobenius-method', D, 'For x²y″ + xy′ − y = 0 with y = Σaₙx^(n + r), what is the indicial equation?', 'r² − 1 = 0', ['r² + 1 = 0', 'r(r − 1) = 0', 'r² − r − 1 = 0'], 'r(r − 1) + r − 1'),
  q('math.de.frobenius-method', A, 'The indicial roots are r = 0 and r = 1/2. How many independent Frobenius series solutions are there?', '2', ['1, plus a logarithmic solution', '0', '1'], 'roots that do not differ by an integer each give a series'),

  q('math.de.greens-function', D, 'L has Green\'s function G. How is the solution of Lu = f written?', 'u(x) = ∫G(x, ξ)f(ξ) dξ', ['u(x) = G(x)f(x)', 'u(x) = f(x)/G(x)', 'u(x) = ∫G dξ + f(x)'], 'superpose point responses'),
  q('math.de.greens-function', A, 'For −u″ = δ(x − ξ), how does ∂G/∂x change across x = ξ?', 'It jumps by −1', ['It jumps by +1', 'It is continuous', 'G itself jumps by 1'], 'integrate G″ = −δ across ξ'),

  q('math.de.harmonic-functions', D, 'Which function is harmonic on ℝ²?', 'x² − y²', ['x² + y²', 'xy²', 'eˣ'], 'u_xx + u_yy = 2 − 2'),
  q('math.de.harmonic-functions', A, 'u is harmonic on a disc and equals 5 everywhere on its boundary circle. What is u at the centre?', '5', ['0', '10', 'It cannot be determined'], 'the mean value property'),

  q('math.de.harmonic-oscillator', D, 'For x″ + 9x = 0, what is the angular frequency?', '3', ['9', '1/3', '81'], 'ω₀ = √9'),
  q('math.de.harmonic-oscillator', A, 'For x″ + 2x′ + 5x = 0, what is the damped angular frequency?', '2', ['√5', '1', '4'], 'roots −1 ± 2i'),

  q('math.de.heat-equation', D, 'u_t = u_xx on [0, π] with u = 0 at both ends and u(x, 0) = sin x. What is u(x, t)?', 'e⁻ᵗ sin x', ['e^(−t²) sin x', 'sin x cos t', 'eᵗ sin x'], 'mode n = 1 decays like e^(−n²t)'),
  q('math.de.heat-equation', A, 'For u_t = k u_xx on [0, L] with zero ends, how does the mode sin(3πx/L) decay?', 'Like e^(−9π²kt/L²)', ['Like e^(−3πkt/L)', 'Like e^(−3kt)', 'Like e^(−9kt)'], 'the decay rate is k(nπ/L)²'),

  q('math.de.higher-order-ode', D, 'What is the general solution of y‴ − y′ = 0?', 'C₁ + C₂eˣ + C₃e⁻ˣ', ['C₁eˣ + C₂e⁻ˣ', 'C₁ + C₂x + C₃x²', 'C₁eˣ + C₂xeˣ + C₃x²eˣ'], 'r³ − r = r(r − 1)(r + 1)'),
  q('math.de.higher-order-ode', A, 'The characteristic polynomial is (r − 2)³. Which functions form a basis of solutions?', 'e^(2x), xe^(2x), x²e^(2x)', ['e^(2x) three times', 'e^(2x), e^(4x), e^(6x)', 'e^(2x), e^(−2x), xe^(2x)'], 'a triple root multiplies by 1, x, x²'),

  q('math.de.homogeneous-ode', D, 'Which ODE is homogeneous in the sense dy/dx = F(y/x)?', 'dy/dx = (x² + y²)/(xy)', ['dy/dx = x + y²', 'dy/dx = (x + 1)/y', 'dy/dx = y + x²'], 'numerator and denominator both of degree 2'),
  q('math.de.homogeneous-ode', A, 'With y = vx, what does dy/dx = (x + y)/x become?', 'x dv/dx = 1', ['dv/dx = 1 + v', 'v + dv/dx = 1 + v', 'x dv/dx = v'], 'dy/dx = v + x dv/dx'),

  q('math.de.inverse-laplace', D, 'What is L⁻¹{3/(s − 2)}?', '3e^(2t)', ['e^(3t)', '3e^(−2t)', '2e^(3t)'], 'L{e^(at)} = 1/(s − a)'),
  q('math.de.inverse-laplace', A, 'What is L⁻¹{s/(s² + 9)}?', 'cos 3t', ['sin 3t', '(1/3) sin 3t', 'cos 9t'], 'L{cos bt} = s/(s² + b²)'),

  q('math.de.ivp', D, 'Solve y′ = 4x with y(1) = 5.', 'y = 2x² + 3', ['y = 2x² + 5', 'y = 4x + 1', 'y = 2x² + C'], '2 + C = 5'),
  q('math.de.ivp', A, 'y = C₁eˣ + C₂e⁻ˣ with y(0) = 2 and y′(0) = 0. What are C₁ and C₂?', 'C₁ = 1 and C₂ = 1', ['C₁ = 2 and C₂ = 0', 'C₁ = 0 and C₂ = 2', 'C₁ = 1 and C₂ = −1'], 'C₁ + C₂ = 2 and C₁ − C₂ = 0'),

  q('math.de.laplace-equation', D, 'Which function satisfies u_xx + u_yy = 0?', 'eˣ sin y', ['eˣ cos x', 'x² + y²', 'sin x sin y'], 'eˣ sin y − eˣ sin y = 0'),
  q('math.de.laplace-equation', A, 'On [0, π]², u solves Laplace\'s equation, equals sin x on the edge y = 0 and 0 on the other three edges. What is u?', 'sin x · sinh(π − y)/sinh π', ['sin x · e^(−y)', 'sin x sin y', 'sin x cosh y'], 'sinh vanishes at y = π and the ratio is 1 at y = 0'),

  q('math.de.laplace-ode', D, 'Transforming y′ − 2y = 0 with y(0) = 3, what is Y(s)?', '3/(s − 2)', ['3/s', '1/(s − 2)', '3(s − 2)'], 'sY − 3 − 2Y = 0'),
  q('math.de.laplace-ode', A, 'For y″ + y = 0 with y(0) = 0 and y′(0) = 2, what is Y(s)?', '2/(s² + 1)', ['2s/(s² + 1)', '2/(s² − 1)', '1/(s² + 1)'], 's²Y − 2 + Y = 0'),

  q('math.de.laplace-properties', D, 'L{sin t} = 1/(s² + 1). What is L{e^(3t) sin t}?', '1/((s − 3)² + 1)', ['1/((s + 3)² + 1)', 'e^(3s)/(s² + 1)', '3/(s² + 1)'], 'the first shifting theorem'),
  q('math.de.laplace-properties', A, 'L{f(t)} = F(s). What is L{u(t − 2) f(t − 2)}?', 'e^(−2s)F(s)', ['F(s − 2)', 'e^(2s)F(s)', 'F(s) − 2'], 'the second shifting theorem'),

  q('math.de.laplace-transform', D, 'What is L{t²}?', '2/s³', ['1/s³', '2/s²', 't³/3'], 'L{tⁿ} = n!/sⁿ⁺¹'),
  q('math.de.laplace-transform', A, 'What is L{cos 4t}?', 's/(s² + 16)', ['4/(s² + 16)', 's/(s² − 16)', '1/(s² + 16)'], 'L{cos bt} = s/(s² + b²)'),

  q('math.de.legendre-equation', D, 'What is the Legendre polynomial P₁(x)?', 'x', ['1', 'x²', '(3x² − 1)/2'], 'P₀ = 1, P₁ = x'),
  q('math.de.legendre-equation', A, 'What is the Legendre polynomial P₂(x)?', '(3x² − 1)/2', ['x²', '3x² − 1', '(5x³ − 3x)/2'], 'normalized so P₂(1) = 1'),

  q('math.de.linear-first-order', D, 'What is the integrating factor for y′ + 2y = eˣ?', 'e^(2x)', ['e^(−2x)', '2x', 'eˣ'], 'e^(∫2 dx)'),
  q('math.de.linear-first-order', A, 'Solve y′ + y = 1 with y(0) = 0.', 'y = 1 − e⁻ˣ', ['y = 1 + e⁻ˣ', 'y = e⁻ˣ', 'y = x'], '(eˣy)′ = eˣ'),

  q('math.de.nonlinear-ode', D, 'What are the equilibria of x′ = x(1 − x)?', 'x = 0 and x = 1', ['Only x = 0', 'Only x = 1', 'x = 1/2'], 'set x(1 − x) = 0'),
  q('math.de.nonlinear-ode', A, 'For x′ = x(1 − x), which equilibrium is stable?', 'x = 1', ['x = 0', 'Both', 'Neither'], 'f′(x) = 1 − 2x is −1 at x = 1'),

  q('math.de.ode-linearity', D, 'Which ODE is linear?', 'x²y″ + eˣy′ − y = sin x', ['yy′ = x', 'y″ + sin y = 0', '(y′)² = y'], 'y and its derivatives appear only to the first power, with coefficients in x'),
  q('math.de.ode-linearity', A, 'Which term makes y″ + xy′ + y² = 0 nonlinear?', 'y²', ['xy′', 'y″', 'None; it is linear'], 'a power of y'),

  q('math.de.ode-order', D, 'What is the order of y‴ + (y′)⁵ = x?', '3', ['5', '1', '8'], 'the highest derivative'),
  q('math.de.ode-order', A, 'What are the order and degree of (y″)² + y′ = 0?', 'Order 2, degree 2', ['Order 2, degree 1', 'Order 1, degree 2', 'Order 4, degree 1'], 'highest derivative y″, raised to the power 2'),

  q('math.de.ode', D, 'Is y = e^(3x) a solution of y′ = 3y?', 'Yes, since y′ = 3e^(3x) = 3y', ['No, since y′ = e^(3x)', 'No, a solution must contain a constant C', 'Only at x = 0'], 'substitute and check'),
  q('math.de.ode', A, 'Which function solves y″ + 4y = 0?', 'sin 2x', ['sin 4x', 'e^(2x)', 'cos x'], 'y″ = −4 sin 2x'),

  q('math.de.pde-classification', D, 'Classify u_xx + 4u_xy + 4u_yy = 0.', 'Parabolic', ['Elliptic', 'Hyperbolic', 'It cannot be classified'], 'B² − 4AC = 16 − 16 = 0'),
  q('math.de.pde-classification', A, 'Classify u_xx + y u_yy = 0 in the region y < 0.', 'Hyperbolic', ['Elliptic', 'Parabolic', 'It cannot be classified'], 'B² − 4AC = −4y > 0 there'),

  q('math.de.pde', D, 'What is the order of the PDE u_t = u_xx?', '2', ['1', '3', '0'], 'the highest partial derivative is second order'),
  q('math.de.pde', A, 'Which function solves u_x − u_y = 0?', '(x + y)²', ['(x − y)²', 'x²', 'xy'], 'u_x = u_y = 2(x + y)'),

  q('math.de.phase-plane', D, 'For x′ = y, y′ = −x, what do the trajectories look like?', 'Circles around the origin', ['Spirals into the origin', 'Straight lines through the origin', 'Parabolas'], 'x² + y² is constant'),
  q('math.de.phase-plane', A, 'A linear system has eigenvalues −1 and −3. What kind of equilibrium is the origin?', 'A stable node', ['A saddle', 'An unstable node', 'A centre'], 'both eigenvalues real and negative'),

  q('math.de.poisson-equation', D, 'Which equation is Poisson\'s equation?', '∇²u = f', ['∇²u = 0', 'u_t = ∇²u', 'u_tt = ∇²u'], 'Laplace\'s equation with a source term'),
  q('math.de.poisson-equation', A, 'Solve u″ = 2 on [0, 1] with u(0) = u(1) = 0.', 'u = x² − x', ['u = x²', 'u = x² − 1', 'u = 2x² − 2x'], 'u = x² + bx + c fitted to both ends'),

  q('math.de.resonance', D, 'For x″ + 4x = cos(ωt), which ω causes resonance?', '2', ['4', '16', 'Any ω'], 'the natural frequency √4'),
  q('math.de.resonance', A, 'How does the particular solution of x″ + 4x = cos 2t behave?', 'Its amplitude grows linearly in t', ['It grows exponentially', 'It stays bounded', 'Its amplitude grows like t²'], 'xₚ = (t/4) sin 2t'),

  q('math.de.second-order-homogeneous', D, 'y₁ = eˣ and y₂ = e⁻ˣ solve y″ − y = 0. What is their Wronskian?', '−2', ['0', '2', 'e^(2x)'], 'eˣ(−e⁻ˣ) − eˣe⁻ˣ'),
  q('math.de.second-order-homogeneous', A, 'Solve y″ − y = 0 with y(0) = 0 and y′(0) = 2.', 'y = eˣ − e⁻ˣ', ['y = eˣ + e⁻ˣ', 'y = 2eˣ', 'y = eˣ − 1'], 'C₁ + C₂ = 0 and C₁ − C₂ = 2'),

  q('math.de.second-order-linear', D, 'y₁, y₂ solve L[y] = 0 independently and yₚ solves L[y] = g. What is the general solution of L[y] = g?', 'C₁y₁ + C₂y₂ + yₚ', ['C₁y₁ + C₂y₂', 'yₚ', 'C(y₁ + y₂ + yₚ)'], 'homogeneous family plus one particular solution'),
  q('math.de.second-order-linear', A, 'yₚ = 3 solves y″ + y = 3. What is the general solution?', 'C₁ cos x + C₂ sin x + 3', ['C₁ cos x + C₂ sin x', '3 cos x + 3 sin x', 'C₁eˣ + C₂e⁻ˣ + 3'], 'add the homogeneous solutions'),

  q('math.de.second-order-ode', D, 'What is the general solution of y″ − 4y′ + 4y = 0?', '(C₁ + C₂x)e^(2x)', ['C₁e^(2x) + C₂e^(2x)', 'C₁e^(2x) + C₂e^(−2x)', 'C₁ cos 2x + C₂ sin 2x'], 'double root r = 2'),
  q('math.de.second-order-ode', A, 'What is the general solution of y″ + 2y′ + 2y = 0?', 'e⁻ˣ(C₁ cos x + C₂ sin x)', ['eˣ(C₁ cos x + C₂ sin x)', 'C₁e⁻ˣ + C₂eˣ', 'e⁻ˣ(C₁ + C₂x)'], 'roots −1 ± i'),

  q('math.de.separable', D, 'Separating dy/dx = x/y gives which equation?', 'y dy = x dx', ['dy/y = x dx', 'y dx = x dy', 'dy = (x/y) dx'], 'move every y to one side'),
  q('math.de.separable', A, 'Solve dy/dx = x/y with y(0) = 2, taking y > 0.', 'y = √(x² + 4)', ['y = x + 2', 'y = √(x² + 2)', 'y = x²/2 + 2'], 'y²/2 = x²/2 + 2'),

  q('math.de.separation-of-variables-pde', D, 'Substituting u = X(x)T(t) into u_t = u_xx gives what?', 'T′/T = X″/X, a constant', ['T′ = X″', 'X/T is a constant', 'XT′ = X″T only at t = 0'], 'each side depends on a different variable'),
  q('math.de.separation-of-variables-pde', A, 'X″ + λX = 0 with X(0) = X(π) = 0. What are the eigenvalues?', 'λ = n² for n = 1, 2, 3, …', ['λ = n', 'Every λ > 0', 'λ = nπ'], 'X = sin(√λ x) needs √λ π = nπ'),

  q('math.de.series-solution', D, 'Substituting y = Σaₙxⁿ into y′ = y gives which recurrence?', 'aₙ₊₁ = aₙ/(n + 1)', ['aₙ₊₁ = aₙ', 'aₙ₊₁ = (n + 1)aₙ', 'aₙ₊₁ = aₙ/n'], 'match coefficients of xⁿ'),
  q('math.de.series-solution', A, 'For y″ + y = 0, aₙ₊₂ = −aₙ/((n + 2)(n + 1)). If a₀ = 1 and a₁ = 0, what is a₂?', '−1/2', ['1/2', '−1', '0'], 'n = 0: −1/(2 · 1)'),

  q('math.de.slope-field', D, 'In the slope field of y′ = x − y, what is the slope at (2, 1)?', '1', ['−1', '3', '2'], '2 − 1'),
  q('math.de.slope-field', A, 'In the slope field of y′ = y(2 − y), what happens to the solution with y(0) = 1?', 'It rises toward 2', ['It falls to 0', 'It grows without bound', 'It stays at 1'], 'positive slope between the equilibria 0 and 2'),

  q('math.de.solution-types', D, 'The general solution is y = Cx². What is the particular solution with y(1) = 3?', 'y = 3x²', ['y = 3x', 'y = x² + 2', 'y = 9x²'], 'C = 3'),
  q('math.de.solution-types', A, 'For (y′)² = 4y the general solution is y = (x + C)². Which solution is singular?', 'y = 0', ['y = x²', 'y = (x + 1)²', 'y = 4x'], 'it solves the ODE but is no member of the family'),

  q('math.de.stability-analysis', D, 'Is the equilibrium x = 0 of x′ = −3x stable?', 'Yes, asymptotically stable', ['No, it is unstable', 'It is only neutrally stable', 'x = 0 is not an equilibrium'], 'x = x₀e^(−3t) → 0'),
  q('math.de.stability-analysis', A, 'The Jacobian at an equilibrium has eigenvalues 2 and −5. What type is it?', 'A saddle, which is unstable', ['A stable node', 'An unstable node', 'A centre'], 'eigenvalues of opposite sign'),

  q('math.de.sturm-liouville', D, 'For −(py′)′ + qy = λwy, which integral expresses orthogonality of eigenfunctions yₘ, yₙ?', '∫yₘyₙw dx = 0', ['∫yₘyₙ dx = 0', '∫yₘyₙp dx = 0', '∫yₘyₙq dx = 0'], 'orthogonal with respect to the weight w'),
  q('math.de.sturm-liouville', A, 'For y″ + λy = 0 with y(0) = 0 and y′(π) = 0, what are the eigenfunctions?', 'sin((2n − 1)x/2) for n = 1, 2, 3, …', ['sin(nx)', 'cos(nx)', 'cos((2n − 1)x/2)'], 'cos(√λ π) = 0 forces √λ = n − ½'),

  q('math.de.systems-matrix-method', D, 'A has eigenvalue 3 with eigenvector (1, 2). Which is a solution of x′ = Ax?', 'e^(3t)(1, 2)', ['(1, 2)', 'e^(3t)', '3t(1, 2)'], 'x = e^(λt)v'),
  q('math.de.systems-matrix-method', A, 'A = [[1, 0], [0, −2]] and x(0) = (4, 5). What is x(t)?', '(4eᵗ, 5e^(−2t))', ['(4e^(−2t), 5eᵗ)', '(4 + t, 5 − 2t)', '(eᵗ, e^(−2t))'], 'a diagonal system decouples'),

  q('math.de.systems-ode', D, 'Writing y″ + 3y′ + 2y = 0 with x₁ = y and x₂ = y′, what is x₂′?', '−2x₁ − 3x₂', ['3x₂ + 2x₁', 'x₁', '−3x₁ − 2x₂'], 'x₂′ = y″ = −3y′ − 2y'),
  q('math.de.systems-ode', A, 'Which matrix A gives x′ = Ax for y″ + 3y′ + 2y = 0 with x = (y, y′)?', '[[0, 1], [−2, −3]]', ['[[0, 1], [−3, −2]]', '[[1, 0], [−2, −3]]', '[[0, 1], [2, 3]]'], 'the companion matrix'),

  q('math.de.undetermined-coefficients', D, 'Which trial yₚ suits y″ − y = 3e^(2x)?', 'Ae^(2x)', ['Axe^(2x)', 'A', 'Aeˣ'], 'e^(2x) does not solve the homogeneous equation'),
  q('math.de.undetermined-coefficients', A, 'Which trial yₚ suits y″ − y = eˣ?', 'Axeˣ', ['Aeˣ', 'Ax²eˣ', 'A'], 'eˣ already solves the homogeneous equation, so multiply by x'),

  q('math.de.variation-of-parameters', D, 'For y″ + y = sec x with y₁ = cos x and y₂ = sin x, what is the Wronskian?', '1', ['0', 'cos 2x', 'sec x'], 'cos²x + sin²x'),
  q('math.de.variation-of-parameters', A, 'Variation of parameters uses u₂′ = y₁g/W. For y″ + y = sec x, what is u₂′?', '1', ['tan x', '−tan x', 'sec x'], 'cos x · sec x / 1'),

  q('math.de.wave-equation', D, 'How many initial conditions does u_tt = c²u_xx need?', 'Two: u(x, 0) and u_t(x, 0)', ['One: u(x, 0)', 'Three', 'None'], 'second order in time'),
  q('math.de.wave-equation', A, 'u_tt = 4u_xx on [0, π] with fixed ends. What is the time frequency of the mode sin 3x?', '6', ['3', '9', '36'], 'ω = c · n = 2 · 3'),

  q('math.de.wronskian', D, 'What is W(x, x²)?', 'x²', ['2x', 'x³', '0'], 'x · 2x − 1 · x²'),
  q('math.de.wronskian', A, 'Two solutions of y″ + p(x)y′ + q(x)y = 0 (p, q continuous) have Wronskian 0 at x = 0. What follows?', 'They are linearly dependent', ['They are linearly independent', 'Their Wronskian is 0 only at x = 0', 'Nothing can be concluded'], 'Abel: W is either never or always zero'),
]
