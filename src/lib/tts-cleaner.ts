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

import { speakifyIpaNotation } from '@/lib/text/ipaToSpeech'
import { speakifyMathNotation } from '@/lib/text/latexToSpeech'

// Greek letters → spoken names. Ordered so uppercase entries come first
// (Sigma before sigma) to avoid an uppercase char being caught by a shorter
// lowercase pattern that matches its Unicode numeric neighbour.
// π is listed here for completeness but the standalone `/π/g` rule below
// still takes priority — having it here only matters inside longer words.
const GREEK_LETTERS: [RegExp, string][] = [
  [/Α/g, 'Alpha'], [/α/g, 'alpha'],
  [/Β/g, 'Beta'],  [/β/g, 'beta'],
  [/Γ/g, 'Gamma'], [/γ/g, 'gamma'],
  [/Δ/g, 'Delta'], [/δ/g, 'delta'],
  [/Ε/g, 'Epsilon'],[/ε/g, 'epsilon'],
  [/Ζ/g, 'Zeta'],  [/ζ/g, 'zeta'],
  [/Η/g, 'Eta'],   [/η/g, 'eta'],
  [/Θ/g, 'Theta'], [/θ/g, 'theta'],
  [/Ι/g, 'Iota'],  [/ι/g, 'iota'],
  [/Κ/g, 'Kappa'], [/κ/g, 'kappa'],
  [/Λ/g, 'Lambda'],[/λ/g, 'lambda'],
  [/Μ/g, 'Mu'],    [/μ/g, 'mu'],
  [/Ν/g, 'Nu'],    [/ν/g, 'nu'],
  [/Ξ/g, 'Xi'],    [/ξ/g, 'xi'],
  [/Ο/g, 'Omicron'],[/ο/g, 'omicron'],
  [/Π/g, 'Pi'],    [/π/g, 'pi'],
  [/Ρ/g, 'Rho'],   [/ρ/g, 'rho'],
  [/Σ/g, 'Sigma'], [/σ/g, 'sigma'], [/ς/g, 'sigma'],
  [/Τ/g, 'Tau'],   [/τ/g, 'tau'],
  [/Υ/g, 'Upsilon'],[/υ/g, 'upsilon'],
  [/Φ/g, 'Phi'],   [/φ/g, 'phi'],
  [/Χ/g, 'Chi'],   [/χ/g, 'chi'],
  [/Ψ/g, 'Psi'],   [/ψ/g, 'psi'],
  [/Ω/g, 'Omega'], [/ω/g, 'omega'],
]

function escapeRegExp(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

// A stage label in a presentational pipeline ("Intuition", "Guided Practice",
// "Проверка"): a short run of ordinary words in any of the three teaching
// scripts. Digits, operators and formula-shaped tokens all disqualify it,
// which is exactly what keeps a chemical equation ("2H2 + O2 -> 2H2O") and a
// limit ("x -> 0") off the pipeline path and on the spoken-arrow path below.
const PIPELINE_STAGE_RE =
  /^[A-Za-zÀ-ɏЀ-ӿऀ-ॿ][A-Za-zÀ-ɏЀ-ӿऀ-ॿ'’ -]*$/

function isPipelineStage(term: string): boolean {
  return term.length > 0 && term.length <= 32 && PIPELINE_STAGE_RE.test(term)
}

function pluralize(value: string, singular: string): string {
  return `${value} ${singular}${parseFloat(value) === 1 ? '' : 's'}`
}

export function cleanTextForTTS(text: string): string {
  let t = text
  // MATHEMATICAL NOTATION FIRST. LaTeX is the one input class this cleaner had
  // no rule for at all, so "$F = \\eta A \\frac{dv}{dy}$" reached the speech
  // provider with its dollar signs, backslash commands and braces intact.
  // Runs BEFORE everything below because it converts TeX into ordinary text —
  // Greek names, "over", "squared" — which the existing Unicode and symbol
  // rules then handle exactly as they always have. Ordinary prose is returned
  // untouched: every rule in that module is anchored to a TeX construct.
  t = speakifyMathNotation(t)
  // P0 (Lesson Flow sprint, item 6): IPA transcriptions ("/kæt/", connected
  // speech like "/aɪ æm ˈɡoʊɪŋ tə ðə stɔːr/") used to be silently DELETED
  // here via stripIpaNotation() — a phonics lesson teaching a pronunciation
  // produced silence where the sound should have been spoken. Replaced with
  // speakifyIpaNotation(), which converts each /.../ span to an approximate
  // plain-text spelling a general-purpose voice can actually pronounce,
  // instead of removing it. Runs unconditionally (independent of the
  // beginner-only DISPLAY-text stripping in the chat route, which is a
  // separate, deliberate decision about what's shown on screen — this is
  // about what's spoken, and speech should never go silent on real content).
  t = speakifyIpaNotation(t)
  // Remove [CODE]...[/CODE] blocks entirely
  t = t.replace(/\[CODE\][\s\S]*?\[\/CODE\]/gi, '')
  // Remove triple backtick code blocks
  t = t.replace(/```[\s\S]*?```/g, '')
  // Remove inline code
  t = t.replace(/`([^`]+)`/g, '$1')
  // Keycap emoji sequences ("1️⃣", "#️⃣", "*️⃣") are a base character + an
  // optional variation selector (U+FE0F) + the combining enclosing keycap
  // (U+20E3). Neither combining codepoint falls in the emoji ranges stripped
  // below, so without this the base survives and several TTS voices announce
  // the enclosing-keycap codepoint literally as "keycap" ("keycap 1…"). Map a
  // digit keycap to its bare digit (reads naturally as "one", "two", and a
  // line-leading one still flows into the numbered-list ordinal pass below);
  // drop the rare #/* keycaps entirely. (️ = variation selector,
  // ⃣ = combining enclosing keycap.)
  t = t.replace(/([0-9])️?⃣/g, '$1 ')
  t = t.replace(/[#*]️?⃣/g, ' ')
  // Any orphaned variation selector / stray combining keycap left behind.
  t = t.replace(/[️⃣]/g, '')
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
  // "/" is spoken only where it carries meaning. A slash with whitespace on
  // BOTH sides is a UI separator — the lesson opening's own confidence check
  // ("I already know it / I've seen it before / Completely new to me") is the
  // motivating case — and becomes a natural pause. A tight slash between
  // characters is educational ("3/4", "m/s", "km/h", "and/or") and is left
  // exactly as written for the voice to read. Same whitespace-as-signal test
  // the "+" rule below already uses, for the same reason: spacing is the only
  // reliable separator-vs-operator evidence available in plain text.
  t = t.replace(/\s+\/\s+/g, ', ')
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

  // Greek letters — before math-symbol substitution so e.g. "ωt" becomes
  // "omega t" rather than a raw Unicode codepoint that TTS voices render
  // inconsistently (or announce as a character name mid-sentence).
  for (const [re, name] of GREEK_LETTERS) {
    t = t.replace(re, ` ${name} `)
  }

  // Math and comparison symbols — multi-character forms before single-character ones
  // U+2212 MINUS SIGN is unambiguously arithmetic — unlike the ASCII hyphen it
  // is never a word-joiner or a dash — so it is SPOKEN rather than folded into
  // "-" and then dropped by the voice. The first law is written "ΔU = Q − W"
  // with this character; folding it left "Delta U equals Q W", which states a
  // different physical relationship. An ASCII hyphen keeps its old, cautious
  // handling below (digits only).
  t = t.replace(/\s*−\s*/g, ' minus ')
  // Arrows split two ways, because they do two unrelated jobs in this app.
  //
  // A PRESENTATIONAL PIPELINE — the lesson roadmap, "Intuition -> Explanation
  // -> Examples -> Guided Practice -> Mastery Check -> Summary" — is a visual
  // device. A teacher reading it aloud lists the stages; they never say "leads
  // to" five times. The arrows stay on screen and are spoken as the pauses
  // between items in a list, which is the whole "arrows are visual only"
  // requirement. Rendering the connector as punctuation rather than an English
  // word is deliberate: this same cleaner runs for Russian and Hindi lessons,
  // where an injected English "then" would be wrong.
  //
  // An EDUCATIONAL ARROW — "2H2 + O2 -> 2H2O", "x -> 0" — carries the meaning
  // of the statement, so it keeps "leads to". Deleting it would make the
  // spoken form of an equation say something different from the written one,
  // which is the failure this change exists to avoid, not cause.
  //
  // Three or more stages, every one of them a plain word phrase, is the
  // pipeline signature; anything else falls through to "leads to" — i.e. the
  // previous unconditional behaviour is still the default, never the exception.
  t = t.replace(/[^\n→]+(?:\s*→\s*[^\n→]+)+/g, (chain: string) => {
    const terms = chain.split('→').map((s) => s.trim()).filter(Boolean)
    // The first term usually carries the sentence lead-in that introduces the
    // chain ("Today's roadmap: Intuition"). Split it off so the lead-in is
    // still spoken and the stage itself is tested on its own merits.
    const first = terms[0]
    // Only ':' and an em dash introduce a chain in practice. A plain hyphen is
    // deliberately excluded — it lives inside ordinary stage labels
    // ("Multi-part"), where splitting on it would corrupt the label.
    const sepIdx = Math.max(first.lastIndexOf(':'), first.lastIndexOf('—'))
    const leadIn = sepIdx >= 0 ? first.slice(0, sepIdx + 1).trim() : ''
    const stages = sepIdx >= 0 ? [first.slice(sepIdx + 1).trim(), ...terms.slice(1)] : terms

    if (stages.length >= 3 && stages.every(isPipelineStage)) {
      return `${leadIn ? `${leadIn} ` : ''}${stages.join(', ')}`
    }
    return terms.join(' leads to ')
  })
  t = t.replace(/<=/g, ' less than or equal to ')
  t = t.replace(/>=/g, ' greater than or equal to ')
  t = t.replace(/≤/g, ' less than or equal to ')
  t = t.replace(/≥/g, ' greater than or equal to ')
  t = t.replace(/≈/g, ' approximately equal to ')
  t = t.replace(/≠/g, ' not equal to ')
  t = t.replace(/×/g, ' times ')
  t = t.replace(/÷/g, ' divided by ')
  t = t.replace(/±/g, ' plus or minus ')
  // π already handled by GREEK_LETTERS above; the rule below is a harmless no-op
  // but kept for clarity (the text now contains "pi" not "π").
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
