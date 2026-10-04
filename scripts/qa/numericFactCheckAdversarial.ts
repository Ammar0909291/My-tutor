/**
 * Numeric fact-check — STEP 2 adversarial offline set. Each case is labelled
 * from the DOCUMENTED CONTRACT in src/lib/teaching/factCheckNumeric.ts (flag
 * only when the prose itself proves the number wrong; abstain otherwise), not
 * from what the implementation happens to do. Used by numericFactCheckEval.ts.
 */
export interface AdversarialCase {
  name: string
  category: string
  prose: string
  authored?: string[]
  expectFlag: boolean
  why: string
}

export const ADVERSARIAL_CASES: AdversarialCase[] = [
  // ordinary arithmetic
  { name: 'arith-correct', category: 'arithmetic', prose: 'The total resistance is 4 + 6 + 10 = 20 Ω.', expectFlag: false, why: 'correct sum' },
  { name: 'arith-wrong-sum', category: 'arithmetic', prose: 'The total resistance is 4 + 6 + 10 = 24 Ω.', expectFlag: true, why: '4+6+10 = 20' },
  { name: 'arith-wrong-product', category: 'arithmetic', prose: 'P = VI = 230 × 5 = 1350 W.', expectFlag: true, why: '230×5 = 1150' },
  { name: 'arith-rounded', category: 'arithmetic', prose: 'v = 100 / 7 = 14.3 m/s.', expectFlag: false, why: 'correctly rounded to 3 s.f.' },
  // unit conversion
  { name: 'unit-prefix-ok', category: 'unit conversion', prose: 'I = 12 / 2400 = 5 mA.', expectFlag: false, why: '0.005 A = 5 mA' },
  { name: 'unit-prefix-wrong', category: 'unit conversion', prose: 'I = 12 / 2400 = 50 mA.', expectFlag: true, why: '0.005 A is 5 mA, not 50 mA' },
  { name: 'unit-minutes', category: 'unit conversion', prose: 'The time is 7200 / 2 = 1 h.', expectFlag: false, why: '3600 s = 1 h' },
  { name: 'unit-definition', category: 'unit conversion', prose: '1 kWh = 3.6 × 10⁶ J.', expectFlag: false, why: 'a definition, not arithmetic' },
  // percentages
  { name: 'pct-ok', category: 'percentage', prose: 'Efficiency = 60/80 = 75 %.', expectFlag: false, why: '0.75 = 75 %' },
  { name: 'pct-wrong', category: 'percentage', prose: 'Efficiency = 60/80 = 80 %.', expectFlag: true, why: '60/80 = 75 %' },
  // scientific notation
  { name: 'sci-ok', category: 'scientific notation', prose: 'E = 6.63 × 10⁻³⁴ × 5 × 10¹⁴ = 3.3 × 10⁻¹⁹ J.', expectFlag: false, why: 'product is 3.3e-19' },
  { name: 'sci-wrong-exponent', category: 'scientific notation', prose: 'E = 6.63 × 10⁻³⁴ × 5 × 10¹⁴ = 3.3 × 10⁻²⁰ J.', expectFlag: true, why: 'off by ×10 (not an SI-prefix factor)' },
  { name: 'sci-caret', category: 'scientific notation', prose: 'N = 2 x 10^3 × 3 = 6 x 10^3.', expectFlag: false, why: 'correct' },
  // ratios / times more
  { name: 'ratio-ok', category: 'times more', prose: 'A 60 W bulb uses 3 times more power than a 20 W bulb.', expectFlag: false, why: '60/20 = 3' },
  { name: 'ratio-wrong', category: 'times more', prose: 'A 60 W bulb uses 30 times more power than a 20 W bulb.', expectFlag: true, why: '60/20 = 3, power has no allowed power law' },
  { name: 'ratio-lasers', category: 'times more', prose: 'A 5 mW laser pointer emits 3 × 10¹⁵ photons per second. A 1 W torch emits about 10⁹ times more.', expectFlag: true, why: 'power ratio 200' },
  { name: 'ratio-no-inputs', category: 'times more', prose: 'The Sun is about 300 000 times more massive than the Earth.', expectFlag: false, why: 'only one stated quantity — abstain' },
  // inverse square / power law / pendulum
  { name: 'inv-square-ok', category: 'inverse-square', prose: 'At 3 m instead of 1 m, the intensity is 9 times less.', expectFlag: false, why: '(3/1)² = 9' },
  { name: 'inv-square-wrong', category: 'inverse-square', prose: 'At 3 m instead of 1 m, the intensity is 27 times less.', expectFlag: false, why: '27 = 3³ is an allowed length power under the contract (volume scaling); text alone cannot rule it out — abstain' },
  { name: 'stefan-ok', category: 'power law', prose: 'A body at 600 K radiates 16 times more than at 300 K.', expectFlag: false, why: '2⁴ = 16' },
  { name: 'stefan-wrong', category: 'power law', prose: 'A body at 600 K radiates 100 times more than at 300 K.', expectFlag: true, why: '2⁴ = 16, 2¹ = 2; 100 misses both by > ×2.5' },
  { name: 'pendulum-ok', category: 'pendulum', prose: 'A 9 m pendulum swings 3 times slower than a 1 m pendulum.', expectFlag: false, why: '√9 = 3' },
  { name: 'pendulum-wrong', category: 'pendulum', prose: 'A 0.25 m pendulum swings 40 times faster than a 1 m pendulum.', expectFlag: true, why: 'length ratio 4 → allowed 4, 16, 64, 2, 256; 40 within ×2.5 of 16/64 — see note' },
  // symbolic / variables / roots / trig
  { name: 'symbolic', category: 'symbolic', prose: 'From v² = u² + 2as we get s = (v² − u²)/2a.', expectFlag: false, why: 'no numbers to check' },
  { name: 'variable-adjacent', category: 'variables', prose: 'Solve 3x + 2 = 11, so x = 3.', expectFlag: false, why: 'contains a variable — abstain' },
  { name: 'variable-tail', category: 'variables', prose: 'Then 2 × 9.8 × h = 39.2.', expectFlag: false, why: 'h unknown — abstain' },
  { name: 'sqrt-ok', category: 'square root', prose: 'v = √(2 × 9.8 × 5) = 9.9 m/s.', expectFlag: false, why: '√98 = 9.90' },
  { name: 'sqrt-wrong', category: 'square root', prose: 'v = √(2 × 9.8 × 5) = 98 m/s.', expectFlag: true, why: 'forgot the root: √98 = 9.9' },
  { name: 'trig', category: 'trigonometric', prose: 'F = 50 cos 60° = 25 N.', expectFlag: false, why: 'trig is outside the evaluator — abstain' },
  { name: 'trig-sin-wrong', category: 'trigonometric', prose: 'sin 30° = 0.87.', expectFlag: false, why: 'trig not evaluated by contract — abstain (would be an error, out of scope)' },
  // ambiguous natural language
  { name: 'nl-ordinals', category: 'ambiguous language', prose: 'Step 1 = measure, step 2 = record.', expectFlag: false, why: 'labels, not arithmetic' },
  { name: 'nl-score', category: 'ambiguous language', prose: 'You got 3 out of 4 = well done!', expectFlag: false, why: 'no calculation' },
  { name: 'nl-dates', category: 'ambiguous language', prose: 'Between 1905 and 1915 = ten years of work.', expectFlag: false, why: 'no operator' },
  { name: 'nl-hyphen-range', category: 'ambiguous language', prose: 'Use a 5-10 Ω resistor; R = 5 Ω is fine.', expectFlag: false, why: 'range, not subtraction' },
  // authored values under different conditions
  { name: 'auth-conflict', category: 'authored', prose: 'With 9 V across 3 Ω and 6 Ω in series, the current is 3 A.', authored: ['With 9 V across 3 Ω and 6 Ω in series, the current is 1 A.'], expectFlag: true, why: 'same setup, 1 A authored' },
  { name: 'auth-new-scenario', category: 'new scenario', prose: 'With 18 V across 3 Ω and 6 Ω in series, the current is 2 A.', authored: ['With 9 V across 3 Ω and 6 Ω in series, the current is 1 A.'], expectFlag: false, why: 'different voltage — a new scenario, shares only the resistances' },
  { name: 'auth-different-conditions', category: 'authored', prose: 'At 20 °C and 101 kPa a mole of gas fills 24 L.', authored: ['At 0 °C and 101 kPa a mole of gas fills 22.4 L.'], expectFlag: false, why: 'different temperature; only one shared quantity' },
  { name: 'auth-same-value', category: 'authored', prose: 'Across 3 Ω and 6 Ω in series with 9 V the current is 1 A.', authored: ['With 9 V across 3 Ω and 6 Ω in series, the current is 1 A.'], expectFlag: false, why: 'agrees' },
]
