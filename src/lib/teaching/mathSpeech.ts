/**
 * C.18-22 — Educational Math Speech layer.
 *
 * Deterministic system-prompt block that instructs the LLM how to
 * present mathematical notation, equations, SI units, and special
 * symbols in a way that is both readable as text AND pronounceable
 * when read aloud by TTS. Pure module: no DB, no I/O.
 *
 * Owner: route.ts injects the block for STEM subjects (physics,
 * mathematics, chemistry, computer_science, biology).
 */

const STEM_SUBJECTS = new Set([
  'physics', 'mathematics', 'chemistry', 'computer_science', 'biology',
])

export function isStemSubject(subjectSlug: string | null | undefined): boolean {
  if (!subjectSlug) return false
  return STEM_SUBJECTS.has(subjectSlug)
}

/**
 * C.19: SI unit expansion map — deterministic, never LLM-invented.
 * The LLM is instructed to expand these on first use per response.
 */
const SI_EXPANSIONS: Record<string, string> = {
  J: 'joules', N: 'newtons', kg: 'kilograms', m: 'metres',
  s: 'seconds', A: 'amperes', K: 'kelvin', mol: 'moles',
  cd: 'candela', Hz: 'hertz', Pa: 'pascals', W: 'watts',
  V: 'volts', C: 'coulombs', F: 'farads', Ω: 'ohms',
  T: 'tesla', H: 'henrys', lm: 'lumens', lx: 'lux',
  Bq: 'becquerels', Gy: 'grays', Sv: 'sieverts',
  eV: 'electronvolts', L: 'litres', g: 'grams',
}

/**
 * C.21: Greek letter pronunciation guide.
 */
const GREEK_PRONUNCIATIONS: Record<string, string> = {
  α: 'alpha', β: 'beta', γ: 'gamma', δ: 'delta', ε: 'epsilon',
  ζ: 'zeta', η: 'eta', θ: 'theta', ι: 'iota', κ: 'kappa',
  λ: 'lambda', μ: 'mu', ν: 'nu', ξ: 'xi', π: 'pi',
  ρ: 'rho', σ: 'sigma', τ: 'tau', υ: 'upsilon', φ: 'phi',
  χ: 'chi', ψ: 'psi', ω: 'omega',
  Δ: 'delta', Σ: 'sigma', Π: 'pi', Φ: 'phi', Ψ: 'psi', Ω: 'omega',
}

export function buildMathSpeechBlock(): string {
  const siList = Object.entries(SI_EXPANSIONS)
    .map(([k, v]) => `${k} → ${v}`)
    .join(', ')

  return `

MATH SPEECH RULES (follow for ALL mathematical/scientific content):

1. SI UNITS: On first use in each response, expand abbreviated SI units naturally: ${siList}. After the first expansion, the abbreviation alone is fine.

2. EQUATIONS: When presenting an equation, ALWAYS provide BOTH:
   - The rendered form (LaTeX/Unicode for display)
   - A natural spoken form immediately after in parentheses
   Example: F = ma (force equals mass times acceleration)
   Example: E = mc² (energy equals mass times the speed of light squared)

3. FRACTIONS: Read as "X over Y" or "X divided by Y", never just show ½ without the spoken form.
   Example: ½mv² → "one-half m v-squared"

4. POWERS & EXPONENTS: Read naturally — "squared", "cubed", "to the power of N".
   Example: x³ → "x cubed", 10⁶ → "ten to the sixth"

5. NEGATIVES: Say "negative" not "minus" when it's a sign, "minus" when it's subtraction.
   Example: −5 → "negative five", 8 − 3 → "eight minus three"

6. GREEK LETTERS: Pronounce by name on first use, then naturally.
   Example: θ → "theta", Δx → "delta x", Σ → "sigma (the sum)"

7. SUBSCRIPTS & SUPERSCRIPTS: Read position naturally.
   Example: v₀ → "v-nought" or "v-zero" or "initial v"
   Example: xₙ → "x sub n", aᵢⱼ → "a sub i j"

8. NEVER leave a bare symbol, equation, or unit without a spoken interpretation when introducing it for the first time in a lesson. The student may be listening, not reading.`
}
