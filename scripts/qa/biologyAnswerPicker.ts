/**
 * A learner who has read the lesson — as an answer picker for live QA.
 *
 * Recognises the right quiz option by what the lesson TAUGHT, not by exact
 * wording, using only the concept's own canonical sources: its seed probes,
 * its seed explanations, and its Educational Brain entry (Learning Objective,
 * Core Understanding, Mental Models). It never reads an answer key off the
 * wire — the chat route strips `correctIndex` from the client payload.
 *
 * Two tiers:
 *   1. AUTHORED PROBE — the stem is (nearly) a seed probe's stem: pick the
 *      option closest to that probe's canonical correct choice and furthest
 *      from its canonical wrong ones. Fuzzy, so a trimmed or re-punctuated
 *      option still matches.
 *   2. AD-HOC VARIANT — anything the tutor wrote itself: score each option by
 *      idf-weighted word and word-pair overlap with the taught content, minus
 *      overlap with the concept's canonical wrong answers.
 *
 * MEASURED offline over all 597 Biology seed probes, options shuffled:
 * tier 1 picks the keyed answer 99.5% of the time; with the probe itself held
 * out (so tier 2 must answer from the rest of the taught content), 72.9% —
 * against a 35.0% random baseline, which is what the previous harness's
 * "unrecognised probe -> option 0" amounted to. The EB "Misconceptions"
 * section is deliberately NOT used as negative evidence: it states each
 * misconception's correction alongside it, and including it measured 64.0%.
 */
import { existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { BIOLOGY_PROBES, BIOLOGY_EXPLANATIONS } from '../../src/lib/teaching/assets/biologySeedAssets'
import { BIOLOGY_DEPTH_PROBES } from '../../src/lib/teaching/assets/biologyDepthSeedAssets'
import { BIOLOGY_EXTENSION_PROBES, BIOLOGY_EXTENSION_EXPLANATIONS } from '../../src/lib/teaching/assets/biologyExtensionSeedAssets'

export interface CanonicalProbe {
  stem: string
  choices?: { text: string; isCorrect: boolean; misconceptionId?: string }[]
  correctValue?: string
}

export interface CanonicalContent {
  probes: CanonicalProbe[]
  /** Taught prose: seed explanations + the EB entry's teaching sections. */
  taught: string[]
}

export interface Pick {
  index: number
  tier: 'authored' | 'adhoc'
  /** Tier 1: stem similarity. Tier 2: margin over the runner-up option. */
  confidence: number
  matchedStem?: string
}

/** How close a quiz stem must be to a seed stem to be treated as that probe. */
const AUTHORED_STEM_SIMILARITY = 0.45
/** Weight of overlap with canonical wrong answers, relative to taught content. */
const WRONG_ANSWER_PENALTY = 0.6

const STOP = new Set(('a an the of to in on for and or but is are was were be been being it its this that these those ' +
  'with as by at from into than then so such can could would should will may might do does did not no ' +
  'which what who whom whose why how when where their there they them he she his her we you your our i me my ' +
  'about because more most less least very also only just all any each both either neither other some ' +
  'one two three first second has have had if out up down over under same different').split(' '))

function stem(w: string): string {
  if (w.length > 5 && w.endsWith('ies')) return w.slice(0, -3) + 'y'
  if (w.length > 5 && w.endsWith('ing')) return w.slice(0, -3)
  if (w.length > 4 && w.endsWith('ed')) return w.slice(0, -2)
  if (w.length > 4 && w.endsWith('es')) return w.slice(0, -2)
  if (w.length > 3 && w.endsWith('s') && !w.endsWith('ss')) return w.slice(0, -1)
  return w
}

export function tokens(text: string): string[] {
  return text.toLowerCase().normalize('NFKD').replace(/[^a-z0-9\s-]/g, ' ').split(/[\s-]+/)
    .filter((w) => w.length > 1 && !STOP.has(w))
    .map(stem)
}

/** Words plus adjacent word pairs — "cell wall" is evidence "cell" and "wall" are not. */
function grams(t: string[]): string[] {
  return [...t, ...t.slice(1).map((w, i) => `${t[i]}_${w}`)]
}

function jaccard(a: string[], b: string[]): number {
  const A = new Set(a)
  const B = new Set(b)
  if (!A.size || !B.size) return 0
  let inter = 0
  for (const x of A) if (B.has(x)) inter++
  return inter / (A.size + B.size - inter)
}

/** Idf-weighted share of the option's distinct grams found in `ref`. */
function coverage(opt: string[], ref: Set<string>, idf: (g: string) => number): number {
  let hit = 0
  let total = 0
  for (const g of new Set(opt)) {
    const w = idf(g)
    total += w
    if (ref.has(g)) hit += w
  }
  return total ? hit / total : 0
}

export function pickAnswer(question: string, options: string[], content: CanonicalContent): Pick {
  const qTok = tokens(question)

  // Tier 1 — an authored probe.
  let best: { probe: CanonicalProbe; sim: number } | null = null
  for (const probe of content.probes) {
    const sim = jaccard(qTok, tokens(probe.stem))
    if (!best || sim > best.sim) best = { probe, sim }
  }
  if (best && best.sim >= AUTHORED_STEM_SIMILARITY) {
    const correct = best.probe.choices?.find((c) => c.isCorrect)?.text ?? best.probe.correctValue ?? ''
    const cTok = tokens(correct)
    const wrongs = (best.probe.choices ?? []).filter((c) => !c.isCorrect).map((c) => tokens(c.text))
    const scores = options.map((o) => {
      const t = tokens(o)
      return jaccard(t, cTok) - Math.max(0, ...wrongs.map((w) => jaccard(t, w)))
    })
    return { index: scores.indexOf(Math.max(...scores)), tier: 'authored', confidence: best.sim, matchedStem: best.probe.stem }
  }

  // Tier 2 — an ad-hoc variant, scored against what was taught.
  const positive = [...content.taught]
  const negative: string[] = []
  for (const p of content.probes) {
    for (const c of p.choices ?? []) (c.isCorrect ? positive : negative).push(c.text)
    if (p.correctValue) positive.push(p.correctValue)
  }
  const posG = new Set(positive.flatMap((x) => grams(tokens(x))))
  const negG = new Set(negative.flatMap((x) => grams(tokens(x))))
  const optG = options.map((o) => grams(tokens(o)))
  // A gram every option shares cannot tell them apart, so it weighs nothing.
  const df = new Map<string, number>()
  for (const g of optG) for (const w of new Set(g)) df.set(w, (df.get(w) ?? 0) + 1)
  const idf = (w: string) => Math.log(1 + options.length / (df.get(w) ?? 1))
  const scores = optG.map((g) => coverage(g, posG, idf) - WRONG_ANSWER_PENALTY * coverage(g, negG, idf))
  const max = Math.max(...scores)
  const runnerUp = [...scores].sort((a, b) => b - a)[1] ?? 0
  return { index: scores.indexOf(max), tier: 'adhoc', confidence: max - runnerUp }
}

/**
 * An answer to a question asked in prose: the taught sentence that shares the
 * most with the question. Quoting the lesson back is what a learner who read
 * it does; nothing is composed.
 */
export function answerFreeResponse(question: string, content: CanonicalContent): string {
  const q = new Set(grams(tokens(question)))
  const sentences = content.taught.flatMap((t) => t.replace(/\s+/g, ' ').split(/(?<=[.!?])\s+/))
    .filter((s) => s.length > 20 && s.length < 400)
  let best = sentences[0] ?? 'I think I understand the main idea.'
  let bestScore = -1
  for (const s of sentences) {
    const g = grams(tokens(s))
    const score = g.filter((x) => q.has(x)).length / Math.sqrt(g.length || 1)
    if (score > bestScore) { bestScore = score; best = s }
  }
  return best
}

/**
 * A question asked in prose with lettered options ("A. …", "B) …") and no
 * structured MCQ payload. The options are answered like an MCQ.
 */
export function proseOptions(text: string | undefined): { question: string; options: string[] } | null {
  if (!text) return null
  const flat = text.replace(/\*\*/g, '')
  const parts = flat.split(/(?:^|\s)([A-E])[.)]\s+/)
  // parts: [before, 'A', textA, 'B', textB, ...]
  if (parts.length < 5 || parts[1] !== 'A' || parts[3] !== 'B') return null
  const options: string[] = []
  for (let i = 1; i + 1 < parts.length; i += 2) {
    if (parts[i] !== String.fromCharCode(65 + options.length)) break
    options.push(parts[i + 1].replace(/\s+/g, ' ').trim().replace(/[?.]\s*$/, ''))
  }
  return options.length >= 2 ? { question: parts[0].trim(), options } : null
}

function ebSections(conceptId: string, names: RegExp): string {
  const file = join(process.cwd(), 'educational-brain', 'concepts', 'biology', `${conceptId}.md`)
  if (!existsSync(file)) return ''
  const out: string[] = []
  let on = false
  for (const line of readFileSync(file, 'utf8').split('\n')) {
    if (/^## /.test(line)) { on = names.test(line); continue }
    if (on) out.push(line)
  }
  return out.join(' ').replace(/\s+/g, ' ').trim()
}

/** Everything canonical the lesson teaches for one Biology concept. */
export function biologyCanonicalContent(conceptId: string): CanonicalContent {
  const probes = [...BIOLOGY_PROBES, ...BIOLOGY_DEPTH_PROBES, ...BIOLOGY_EXTENSION_PROBES]
    .filter((p) => p.conceptId === conceptId)
  const explanations = [...BIOLOGY_EXPLANATIONS, ...BIOLOGY_EXTENSION_EXPLANATIONS]
    .filter((e) => e.conceptId === conceptId)
    .map((e) => e.content)
  const eb = ebSections(conceptId, /Learning Objective|Core Understanding|Mental Models/)
  if (!probes.length && !explanations.length && !eb) throw new Error(`no canonical content for ${conceptId}`)
  return { probes, taught: [...explanations, eb].filter(Boolean) }
}
