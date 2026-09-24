/**
 * FIGURE FIDELITY — a colour the tutor gives a part of the figure must be a
 * colour the figure actually has.
 *
 * Production, bio.mol.dna-replication, 2026-09-24: the replication-fork scene
 * was on screen and the tutor told the learner the helicase was "the orange
 * block". Every enzyme in that figure is a violet dot; nothing in it is orange.
 * The visual contract already forbids naming a colour that is not on screen —
 * as prose to the model, which did not follow it.
 *
 * WHAT CAN BE CHECKED, AND WHAT CANNOT. A SceneSpec states the colour of every
 * object it draws, so for a scene the set of colours on screen is a fact. A
 * VisualCard or a VisualSpec is coloured by renderer code the payload does not
 * describe, so for those this check does nothing — it never guesses. Shapes
 * ("a little motor") are not checked: the vocabulary of shape is open-ended,
 * and a pattern list against it is the exclusion-list trap.
 *
 * WHAT IT CHANGES. Only a colour word used about the FIGURE (the sentence names
 * the figure, points at it, or the colour sits in a parenthetical after a part
 * of it) and naming a colour family the figure does not contain. The colour
 * phrase is removed and the sentence kept: "the enzyme helicase (the orange
 * block) is unwinding" -> "the enzyme helicase is unwinding". Colour used about
 * the world ("red light", "green plants", "white blood cells") is untouched,
 * because it is not a claim about the picture.
 *
 * Pure.
 */
import type { SceneSpec } from '@/lib/teaching/sceneSpec'

export type ColourFamily =
  | 'red' | 'orange' | 'yellow' | 'green' | 'cyan' | 'blue' | 'purple' | 'pink' | 'grey' | 'white' | 'black' | 'brown'

const WORD_FAMILY: Record<string, ColourFamily> = {
  red: 'red', crimson: 'red', scarlet: 'red',
  orange: 'orange', amber: 'orange',
  yellow: 'yellow', gold: 'yellow', golden: 'yellow',
  green: 'green', lime: 'green',
  cyan: 'cyan', teal: 'cyan', turquoise: 'cyan',
  blue: 'blue', navy: 'blue',
  purple: 'purple', violet: 'purple', indigo: 'purple', lavender: 'purple', lilac: 'purple',
  pink: 'pink', magenta: 'pink',
  grey: 'grey', gray: 'grey', silver: 'grey',
  white: 'white', black: 'black', brown: 'brown',
}
const COLOUR_WORD = Object.keys(WORD_FAMILY).join('|')

/** The colour family of a CSS hex colour; null when it is not a hex we can read. */
export function familyOfHex(hex: string | undefined | null): ColourFamily | null {
  const m = typeof hex === 'string' ? hex.trim().match(/^#([0-9a-f]{3}|[0-9a-f]{6})$/i) : null
  if (!m) return null
  const h = m[1].length === 3 ? m[1].split('').map((c) => c + c).join('') : m[1]
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16) / 255)
  const max = Math.max(r, g, b), min = Math.min(r, g, b)
  const l = (max + min) / 2
  const d = max - min
  const s = d === 0 ? 0 : d / (1 - Math.abs(2 * l - 1))
  if (s < 0.18) return l > 0.85 ? 'white' : l < 0.12 ? 'black' : 'grey'
  let hue = 0
  if (max === r) hue = ((g - b) / d) % 6
  else if (max === g) hue = (b - r) / d + 2
  else hue = (r - g) / d + 4
  hue = (hue * 60 + 360) % 360
  if (hue < 14 || hue >= 345) return l < 0.3 ? 'brown' : 'red'
  if (hue < 42) return l < 0.35 ? 'brown' : 'orange'
  if (hue < 66) return 'yellow'
  if (hue < 165) return 'green'
  if (hue < 195) return 'cyan'
  if (hue < 252) return 'blue'
  if (hue < 300) return 'purple'
  return 'pink'
}

function isMuted(hex: string | undefined): boolean {
  const m = typeof hex === 'string' ? hex.trim().match(/^#([0-9a-f]{6})$/i) : null
  if (!m) return false
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(m[1].slice(i, i + 2), 16) / 255)
  const max = Math.max(r, g, b), min = Math.min(r, g, b)
  const l = (max + min) / 2
  const s = max === min ? 0 : (max - min) / (1 - Math.abs(2 * l - 1))
  return s < 0.35
}

/** Every colour family a scene draws with. Empty when the scene states none. */
export function sceneColourFamilies(scene: SceneSpec | null | undefined): Set<ColourFamily> {
  const out = new Set<ColourFamily>()
  for (const step of scene?.steps ?? []) {
    for (const obj of step.objects ?? []) {
      const f = familyOfHex(obj.color)
      if (f) out.add(f)
      // A muted colour (slate, the reference role) reads as grey to a learner
      // AND as its hue; either word is true of it.
      if (f && isMuted(obj.color)) out.add('grey')
    }
  }
  return out
}

/** The sentence talks about the figure, so a colour in it is a claim about the figure. */
const FIGURE_CONTEXT_RE =
  /\b(diagram|figure|picture|graph|image|screen|drawn|shown|shows|labell?ed|marked|highlighted|coloured|colored|dot|block|box|arrow|line|circle|sphere|node|panel|scene)\b/i

export interface FidelityResult {
  text: string
  changed: boolean
  /** The colour phrases removed, for the log. */
  removed: string[]
}

/**
 * Remove colour claims about the figure that name a colour it does not have.
 * `families` empty means "the figure's colours are unknown" -> no change.
 */
export function enforceFigureColours(text: string, families: ReadonlySet<ColourFamily>): FidelityResult {
  if (typeof text !== 'string' || text.length === 0 || families.size === 0) {
    return { text, changed: false, removed: [] }
  }
  const removed: string[] = []
  const absent = (word: string) => {
    const f = WORD_FAMILY[word.toLowerCase()]
    return f !== undefined && !families.has(f)
  }
  const parenthetical = new RegExp(`\\s*\\((?:the\\s+|a\\s+|an\\s+|in\\s+)?(?:${COLOUR_WORD})(?:[-\\s][a-z]+){0,3}\\)`, 'gi')
  const adjective = new RegExp(`\\b(the|a|an|this|that|its|their)\\s+(${COLOUR_WORD})(?:-coloured|-colored)?\\s+(?=[a-z])`, 'gi')
  const inColour = new RegExp(`\\s+(?:in|coloured|colored)\\s+(${COLOUR_WORD})\\b`, 'gi')

  try {
    const sentences = text.split(/(?<=[.!?])(\s+)/)
    const out = sentences.map((sentence) => {
      if (!FIGURE_CONTEXT_RE.test(sentence)) return sentence
      let s = sentence
      s = s.replace(parenthetical, (m) => {
        const word = m.match(new RegExp(COLOUR_WORD, 'i'))?.[0] ?? ''
        if (!absent(word)) return m
        removed.push(m.trim())
        return ''
      })
      {
        s = s.replace(adjective, (m, det: string, word: string) => {
          if (!absent(word)) return m
          removed.push(m.trim())
          return `${det} `
        })
        s = s.replace(inColour, (m, word: string) => {
          if (!absent(word)) return m
          removed.push(m.trim())
          return ''
        })
      }
      return s
    })
    if (removed.length === 0) return { text, changed: false, removed: [] }
    return { text: out.join(''), changed: true, removed }
  } catch {
    return { text, changed: false, removed: [] }
  }
}
