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

import { stripIpaNotation } from '@/lib/text/ipaSanitizer'

function escapeRegExp(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function pluralize(value: string, singular: string): string {
  return `${value} ${singular}${parseFloat(value) === 1 ? '' : 's'}`
}

export function cleanTextForTTS(text: string): string {
  let t = text
  // IPA/phonetic notation is written for the eye, not the ear — a speech
  // engine either skips it or mispronounces it letter-by-letter regardless
  // of the student's level, so this runs unconditionally (independent of
  // the beginner-only stripping in the chat route, which is about what's
  // shown on screen).
  t = stripIpaNotation(t)
  // Remove [CODE]...[/CODE] blocks entirely
  t = t.replace(/\[CODE\][\s\S]*?\[\/CODE\]/gi, '')
  // Remove triple backtick code blocks
  t = t.replace(/```[\s\S]*?```/g, '')
  // Remove inline code
  t = t.replace(/`([^`]+)`/g, '$1')
  // Remove emojis
  t = t.replace(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{1F000}-\u{1F02F}\u{1F900}-\u{1F9FF}]/gu, '')
  // Remove special icons and other decorative/UI symbols never meant to be
  // spoken (checkmarks, small triangles/arrows used as bullets, stars, and
  // block/geometric markers) — a person reading a doc skips these visually;
  // a speech engine has no such filter unless we strip them first.
  t = t.replace(/[▶▸▹►➤➜➔➢➣✓✔✗✘●○■□▪▫‣★☆✦✧⬆⬇⬅]/gu, '')
  t = t.replace(/[📌💡⚠✅❓🔧🎯💬🧠🎓⏱🔥📚📈⚙🏠📋🐍🇷🇺🇬🇧🇮🇳]/gu, '')
  // Markdown links "[text](url)" → "text" (the URL is never spoken)
  t = t.replace(/\[([^\]]+)\]\((?:[^)]*)\)/g, '$1')
  // Remove markdown bold and italic
  t = t.replace(/\*\*(.*?)\*\*/g, '$1')
  t = t.replace(/\*(.*?)\*/g, '$1')
  // Remove headings
  t = t.replace(/#{1,6}\s+/g, '')
  // Markdown table rows: strip a pure separator row ("|---|---|" / ":--|--:")
  // entirely, then turn remaining pipe-delimited cells into a natural,
  // comma-separated read rather than reading the literal "|" characters.
  t = t.replace(/^\|?[\s:|-]+\|[\s:|-]*$/gm, '')
  t = t.replace(/^\s*\|\s*(.*?)\s*\|\s*$/gm, (_, row: string) =>
    row.split('|').map((cell: string) => cell.trim()).filter(Boolean).join(', '))
  t = t.replace(/\s*\|\s*/g, ', ')
  // Numbered lists → natural spoken ordinals ("1. Foo" → "First, Foo") rather
  // than silently deleting the marker and leaving disconnected fragments.
  const ORDINALS = ['First', 'Second', 'Third', 'Fourth', 'Fifth', 'Sixth', 'Seventh', 'Eighth', 'Ninth', 'Tenth']
  t = t.replace(/^(\d+)\.\s+/gm, (_, n: string) => {
    const i = parseInt(n, 10)
    return `${i >= 1 && i <= ORDINALS.length ? ORDINALS[i - 1] : 'Next'}, `
  })
  // Remove bullet points (after numbered-list handling so "1. " above isn't
  // double-matched by the broader bullet class)
  t = t.replace(/^[-•·‣]\s+/gm, '')
  // Remove dividers
  t = t.replace(/^[-=*_~]{3,}\s*$/gm, '.')
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

  // Decide what "+" means BEFORE formulas/superscripts below turn into
  // words — once "H2O" becomes "water" there is no way to tell an operator
  // "+" apart from a decorative one used as a UI separator ("Welcome + Lesson
  // 3"). A chain of terms joined by "+" ("2 + 3 + 4", "x + y", "H2 + O2")
  // reads as "plus" only when EVERY term in the chain looks mathematical
  // (a bare number, a short variable/coefficient token, a superscripted
  // term, or a chemistry-formula-shaped token); a chain of ordinary
  // capitalized words reads as a natural pause instead.
  // Requires actual whitespace around every "+" in the chain (not just
  // \s*) so a spaceless compound like "C++" (a real subject name in this
  // app's catalog) is left completely alone rather than being torn apart
  // into "C, , " — TTS engines already pronounce "C++" correctly on their
  // own when it's left untouched.
  t = t.replace(/\S+(?:\s+\+\s+\S+)+/g, (chain: string) => {
    const terms = chain.split('+').map((s) => s.trim())
    const isMathTerm = (term: string) =>
      /^\d+(?:\.\d+)?$/.test(term) || // "2", "3.5"
      /^[a-zA-Z]{1,2}$/.test(term) || // bare variable(s): "x", "ab"
      /[⁰¹²³⁴⁵⁶⁷⁸⁹⁻]/.test(term) || // superscripted: "x²"
      (/\d/.test(term) && term.length <= 8) // coefficient/formula: "2x", "H2O"
    const verb = terms.every(isMathTerm) ? ' plus ' : ', '
    return terms.join(verb)
  })

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
  // "leads to" reads naturally for both a chemical equation and a general
  // causal/sequence arrow — a single unconditional rendering rather than
  // guessing chemistry-vs-general context after formulas are already words.
  t = t.replace(/→/g, ' leads to ')
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
  // Any "+" with whitespace on both sides reaching this point (not part of
  // a chain above — e.g. a single stray "+ " with no term on one side) has
  // no reliable math/decorative signal, so fall back to a natural pause
  // rather than risking a literal, oddly-placed "plus". A "+" with NO
  // surrounding whitespace (e.g. inside "C++") is left untouched — TTS
  // engines already pronounce common compounds like that correctly.
  t = t.replace(/\s+\+\s+/g, ', ')
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
