// Chemical formulas spoken by name rather than letter-by-letter.
// Sorted by length below so e.g. "H2O2" is matched before "H2O".
const CHEMISTRY_FORMULAS: Record<string, string> = {
  H2O: 'water',
  H2O2: 'hydrogen peroxide',
  CO2: 'carbon dioxide',
  CO: 'carbon monoxide',
  O2: 'oxygen',
  O3: 'ozone',
  H2: 'hydrogen',
  N2: 'nitrogen',
  NaCl: 'sodium chloride',
  NaOH: 'sodium hydroxide',
  NaHCO3: 'sodium bicarbonate',
  HCl: 'hydrochloric acid',
  H2SO4: 'sulfuric acid',
  HNO3: 'nitric acid',
  CaCO3: 'calcium carbonate',
  CaO: 'calcium oxide',
  'Ca(OH)2': 'calcium hydroxide',
  MgCl2: 'magnesium chloride',
  CH4: 'methane',
  NH3: 'ammonia',
  C6H12O6: 'glucose',
  KOH: 'potassium hydroxide',
  AgNO3: 'silver nitrate',
  CuSO4: 'copper sulfate',
  ZnO: 'zinc oxide',
}

// Units expanded to spoken words; sorted by length below so e.g. "km²"
// is matched before "km", and "km" before "m".
const UNITS: Record<string, string> = {
  'km²': 'square kilometer',
  'cm²': 'square centimeter',
  'mm²': 'square millimeter',
  'm²': 'square meter',
  'cm³': 'cubic centimeter',
  'm³': 'cubic meter',
  km: 'kilometer',
  cm: 'centimeter',
  mm: 'millimeter',
  kg: 'kilogram',
  ml: 'milliliter',
  g: 'gram',
  L: 'liter',
  m: 'meter',
}

const SUPERSCRIPT_DIGITS: Record<string, string> = {
  '⁰': '0', '¹': '1', '²': '2', '³': '3', '⁴': '4',
  '⁵': '5', '⁶': '6', '⁷': '7', '⁸': '8', '⁹': '9',
}

const CURRENCY_NAMES: Record<string, string> = {
  '₹': 'rupee',
  $: 'dollar',
  '€': 'euro',
}

function escapeRegExp(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function pluralize(value: string, singular: string): string {
  return `${value} ${singular}${parseFloat(value) === 1 ? '' : 's'}`
}

export function cleanTextForTTS(text: string): string {
  let t = text
  // Remove [CODE]...[/CODE] blocks entirely
  t = t.replace(/\[CODE\][\s\S]*?\[\/CODE\]/gi, '')
  // Remove triple backtick code blocks
  t = t.replace(/```[\s\S]*?```/g, '')
  // Remove inline code
  t = t.replace(/`([^`]+)`/g, '$1')
  // Remove emojis
  t = t.replace(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{1F000}-\u{1F02F}\u{1F900}-\u{1F9FF}]/gu, '')
  // Remove special icons
  t = t.replace(/[▶📌💡⚠✅❓🔧🎯💬🧠🎓⏱🔥📚📈⚙🏠📋🐍🇷🇺🇬🇧🇮🇳]/gu, '')
  // Remove markdown bold and italic
  t = t.replace(/\*\*(.*?)\*\*/g, '$1')
  t = t.replace(/\*(.*?)\*/g, '$1')
  // Remove headings
  t = t.replace(/#{1,6}\s+/g, '')
  // Remove bullet points
  t = t.replace(/^[-•·]\s+/gm, '')
  // Remove numbered lists
  t = t.replace(/^\d+\.\s+/gm, '')
  // Remove dividers
  t = t.replace(/---+/g, '.')
  // Remove blockquotes
  t = t.replace(/^>\s+/gm, '')
  // Remove function call notation - say naturally
  t = t.replace(/(\w+)\(\)/g, '$1')

  // Currency: "₹500" / "$1" → "500 rupees" / "1 dollar"
  t = t.replace(/([₹$€])\s?(\d+(?:\.\d+)?)/g, (_, sym: string, num: string) => pluralize(num, CURRENCY_NAMES[sym]))

  // Subscript digits (₀-₉, contiguous codepoints) → plain digits, so
  // chemistry written as "H₂O" normalizes to "H2O" before dictionary lookup.
  t = t.replace(/[₀-₉]/g, (c) => String(c.charCodeAt(0) - 0x2080))

  // Chemistry formulas spoken by name (longest keys first to avoid partial matches)
  for (const formula of Object.keys(CHEMISTRY_FORMULAS).sort((a, b) => b.length - a.length)) {
    t = t.replace(new RegExp(`\\b${escapeRegExp(formula)}\\b`, 'g'), CHEMISTRY_FORMULAS[formula])
  }
  // Fallback for chemistry-like formulas not in the dictionary (e.g. "Fe2O3") —
  // space out digit runs so each symbol/count is read separately.
  t = t.replace(/\b[A-Z][a-zA-Z()]*\d[a-zA-Z\d()]*\b/g, (token) =>
    token.replace(/\d+/g, ' $& ').replace(/\s+/g, ' ').trim())

  // Units: "5m²" → "5 square meters" (must run before superscript handling
  // so the ² isn't read as a separate exponent)
  {
    const keys = Object.keys(UNITS).sort((a, b) => b.length - a.length).map(escapeRegExp).join('|')
    t = t.replace(new RegExp(`(\\d+(?:\\.\\d+)?)\\s?(${keys})(?![a-zA-Z])`, 'g'), (_, num: string, unit: string) => pluralize(num, UNITS[unit]))
  }

  // Superscript exponents: "x²" → "x squared", "x⁴" → "x to the power of 4",
  // "10⁻³" → "10 to the power of minus 3"
  t = t.replace(/([a-zA-Z0-9)\]])(⁻?)([⁰¹²³⁴⁵⁶⁷⁸⁹]+)/g, (_, base: string, neg: string, exp: string) => {
    const digits = exp.split('').map((c: string) => SUPERSCRIPT_DIGITS[c] ?? c).join('')
    if (neg) return `${base} to the power of minus ${digits}`
    if (digits === '2') return `${base} squared`
    if (digits === '3') return `${base} cubed`
    return `${base} to the power of ${digits}`
  })

  // Math and comparison symbols — multi-character forms before single-character ones
  t = t.replace(/−/g, '-') // normalize unicode minus to ascii hyphen
  t = t.replace(/→/g, ' yields ')
  t = t.replace(/<=/g, ' less than or equal to ')
  t = t.replace(/>=/g, ' greater than or equal to ')
  t = t.replace(/≤/g, ' less than or equal to ')
  t = t.replace(/≥/g, ' greater than or equal to ')
  t = t.replace(/≈/g, ' approximately equal to ')
  t = t.replace(/≠/g, ' not equal to ')
  t = t.replace(/×/g, ' times ')
  t = t.replace(/÷/g, ' divided by ')
  t = t.replace(/±/g, ' plus or minus ')
  t = t.replace(/π/g, ' pi ')
  t = t.replace(/√/g, ' square root of ')
  t = t.replace(/∞/g, ' infinity ')
  t = t.replace(/°/g, ' degrees ')
  t = t.replace(/%/g, ' percent ')
  t = t.replace(/</g, ' less than ')
  t = t.replace(/>/g, ' greater than ')
  t = t.replace(/=/g, ' equals ')
  t = t.replace(/\+/g, ' plus ')
  // Subtraction "10 - 3" → "10 minus 3"
  t = t.replace(/(\d)\s-\s(\d)/g, '$1 minus $2')
  // Negative numbers "-5" → "minus 5" — not preceded by a letter/digit, so
  // ranges like "pages 5-10" are left untouched.
  t = t.replace(/(?<![a-zA-Z0-9])-(\d)/g, 'minus $1')

  // Paragraph breaks become sentence pauses, single line breaks become commas
  // (unless the line already ends with terminal punctuation)
  t = t
    .split(/\n{2,}/)
    .map((p) => p.trim().replace(/([.!?:;,])\s*\n+/g, '$1 ').replace(/\n+/g, ', '))
    .filter(Boolean)
    .reduce((acc, p) => (acc === '' ? p : acc + (/[.!?:;,]$/.test(acc) ? ' ' : '. ') + p), '')

  // Collapse whitespace
  t = t.replace(/\s+/g, ' ').trim()
  return t
}
