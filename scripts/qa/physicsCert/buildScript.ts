/**
 * PHYSICS UNIT 1 CERTIFICATION — freeze the scripted student, from authored content only.
 *
 * Unit 1 = every `foundational` physics concept plus the `developing` phys.meas.* /
 * phys.mech.* concepts (23). For each concept the scripted learner's lines are
 * taken from this repo's own sources, never invented, and each carries its source:
 *   misconception  -> Blueprint characteristic phrase, else the EB misconception
 *                     symptom (first-personed: "I think …")
 *   correctTyped   -> a seed probe's isCorrect choice text (verbatim)
 *   wrongTyped     -> the SAME probe's misconception-tagged wrong choice (verbatim)
 *   offTopic       -> the next Unit-1 concept's first seed probe stem (verbatim)
 *
 * Units 2-5 (2026-09-28) cover the other 215 concepts by domain, so every physics concept is in
 * exactly one unit (see UNITS). Each carries the onboarding level a learner studying it would pick.
 *
 * Run: npx tsx scripts/qa/physicsCert/buildScript.ts [--unit N]   (writes unitN.json + prints sha256)
 */
import { createHash } from 'node:crypto'
import { readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { loadBlueprintContent, loadEBConceptContext } from '../../../src/lib/curriculum/blueprintLoader'
import { canonicalContent } from '../biologyAnswerPicker'

interface KgNode { id: string; name: string; difficulty: string }

export const UNIT1_FILE = join(__dirname, 'unit1.json')
export const unitFile = (n: number) => join(__dirname, `unit${n}.json`)

const isUnit1 = (x: KgNode) => x.difficulty === 'foundational'
  || (x.difficulty === 'developing' && /^phys\.(meas|mech)\./.test(x.id))
const domainOf = (x: KgNode) => x.id.split('.')[1]
/** Units 2-5: every concept not in unit 1, by domain. Together the five units cover the KG exactly. */
const UNITS: Record<number, (x: KgNode) => boolean> = {
  1: isUnit1,
  2: (x) => !isUnit1(x) && ['meas', 'mech'].includes(domainOf(x)),
  3: (x) => !isUnit1(x) && ['therm', 'wave', 'opt'].includes(domainOf(x)),
  4: (x) => !isUnit1(x) && ['em', 'particle'].includes(domainOf(x)),
  5: (x) => !isUnit1(x) && ['mod', 'qm', 'rel', 'stat', 'astro'].includes(domainOf(x)),
}

export function allPhysicsConcepts(): KgNode[] {
  const g = JSON.parse(readFileSync('docs/physics/kg/graph.json', 'utf8'))
  return Array.isArray(g) ? g : (g.concepts ?? g.nodes ?? Object.values(g))
}

export function unitConcepts(n: number): KgNode[] {
  const pick = UNITS[n]
  if (!pick) throw new Error(`no unit ${n}`)
  return allPhysicsConcepts().filter(pick)
}

export function unit1Concepts(): KgNode[] { return unitConcepts(1) }

/** The onboarding level a learner studying this concept would pick (onboarding's own enum). */
export function levelFor(difficulty: string): 'beginner' | 'intermediate' | 'advanced' {
  if (difficulty === 'foundational' || difficulty === 'developing') return 'beginner'
  if (difficulty === 'proficient') return 'intermediate'
  return 'advanced'
}

const unquote = (s: string) => s.trim().replace(/^[“"']+|[”"']+$/g, '').trim()

/** The first complete quoted utterance in an authored phrase field, else the field up to its first quote-separator. */
function utterance(field: string): string {
  const q = field.match(/[“"]([^”"]{8,200})[”"]/)
  const t = q ? q[1] : field.split(/[”"]\s*[;,]/)[0]
  return unquote(t).replace(/\s+/g, ' ')
}

function firstPerson(phrase: string): string {
  const p = unquote(phrase).replace(/\s+/g, ' ').replace(/^(?:yes|no)\s*[—–-]\s*/i, '')
  if (/^i\s/i.test(p)) return p
  // A leading single-letter symbol ("N = mg", "T = …") keeps its case.
  const head = /^[A-Za-z](?:\s|=|_|$)/.test(p) ? p : `${p.charAt(0).toLowerCase()}${p.slice(1)}`
  return `I think ${head}`
}

/** A sentence a learner could say: short, declarative, not a teacher's description. */
function usablePhrase(p: string | undefined | null): p is string {
  if (!p) return false
  // Only QUOTED learner speech counts; an unquoted field is the author's
  // description of a behaviour ("lists five or six…"), not something said.
  if (!/[“"][^”"]{8,200}[”"]/.test(p)) return false
  const t = utterance(p)
  const words = t.split(/\s+/).filter((w) => /[a-z]{2,}/i.test(w))
  return t.length >= 12 && t.length <= 220
    && !/^(?:students?|learners?|a learner)\b/i.test(t)
    && !t.includes('?') && !t.includes(';') && !t.includes('__') && !/\bsays\b/i.test(t)
    && words.length >= 5
}

function main() {
  const i = process.argv.indexOf('--unit')
  const unit = i > 0 ? Number(process.argv[i + 1]) : 1
  const concepts = unitConcepts(unit)
  const out: unknown[] = []
  const gaps: string[] = []
  concepts.forEach((c, i) => {
    let misconception: string | null = null
    let misconceptionSource = ''
    const bp = loadBlueprintContent(c.id)
    if (bp.found) {
      const mc = bp.content.misconceptions.find((m) => usablePhrase(m.characteristicPhrase))
      if (mc) { misconception = firstPerson(utterance(mc.characteristicPhrase)); misconceptionSource = `Blueprint ${c.id} ${mc.id} characteristicPhrase` }
    }
    if (!misconception) {
      const eb = loadEBConceptContext(c.id)
      if (eb.found) {
        const mc = eb.context.ebMisconceptions.find((m) => usablePhrase(m.symptom))
        if (mc) { misconception = firstPerson(utterance(mc.symptom!)); misconceptionSource = `EB ${c.id} misconception "${mc.title}" symptom` }
      }
    }

    const content = canonicalContent('physics', c.id)
    const probe = content.probes.find((p) => (p.choices ?? []).some((ch) => !ch.isCorrect && ch.misconceptionId)
      && (p.choices ?? []).some((ch) => ch.isCorrect))
    const correct = probe?.choices?.find((ch) => ch.isCorrect)?.text.trim() ?? null
    const wrong = probe?.choices?.find((ch) => !ch.isCorrect && ch.misconceptionId)?.text.trim() ?? null

    const next = concepts[(i + 1) % concepts.length]
    const offProbe = canonicalContent('physics', next.id).probes.find((p) => p.stem && p.stem.trim().endsWith('?'))
    const offTopic = offProbe ? offProbe.stem.replace(/^[A-Z][A-Z _-]+:\s*/, '').trim() : null

    // Fallback: the concept's own misconception-tagged wrong answer, first-personed.
    if (!misconception && wrong) {
      misconception = firstPerson(wrong)
      misconceptionSource = `seed probe misconception-tagged choice (verbatim, first-personed)`
    }
    if (!misconception) gaps.push(`${c.id}: no usable authored misconception phrase`)
    if (!correct || !wrong) gaps.push(`${c.id}: no seed probe with a misconception-tagged distractor`)
    if (!offTopic) gaps.push(`${c.id}: no off-topic stem from ${next.id}`)

    out.push({
      subject: 'physics', conceptId: c.id, lessonTitleHint: c.name,
      ...(unit === 1 ? {} : { level: levelFor(c.difficulty) }),
      misconception, misconceptionSource,
      correctTyped: correct, wrongTyped: wrong,
      typedSource: probe ? `seed probe "${probe.stem.slice(0, 80)}" (isCorrect choice / misconception-tagged choice, verbatim)` : '',
      offTopic, offTopicSource: offProbe ? `seed probe of ${next.id} (stem, verbatim)` : '',
    })
  })
  const doc = { version: 1, unit: `physics-unit-${unit}`, createdAt: new Date().toISOString().slice(0, 10), concepts: out, gaps }
  const json = JSON.stringify(doc, null, 2) + '\n'
  writeFileSync(unitFile(unit), json)
  console.log(`wrote ${unitFile(unit)}: ${out.length} concepts, ${gaps.length} gaps`)
  for (const g of gaps) console.log('  GAP', g)
  console.log('sha256', createHash('sha256').update(json).digest('hex'))
}

if (require.main === module) main()
