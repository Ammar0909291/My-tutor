/**
 * ENGLISH VISUAL AUDIT — FIXTURE BUILDER.
 *
 * English serves NO static figure: `resolveVisual` returns "no figure" for all 216 English concepts, so every English figure a learner sees is
 * generated at runtime (Tier 2/3), admitted by `parseVisualSpec` / `payloadBlockers`, and cached in production (`visualization_cache`). There is no committed
 * corpus of what was served and this environment has no production-data access, so the served set CANNOT be enumerated here. What can be audited is the
 * ENVELOPE: the renderer that draws those figures, fed
 *   (a) one realistic `process_flow` spec per English concept, built deterministically from that concept's own authored wording (`key_ideas` of
 *       docs/english/teaching-assets/assets.json — long English sentences with quotes, parentheses, dashes, slashes and phonics notation), cut to the
 *       schema limits (title ≤ 60, note ≤ 140, 2–12 steps), and
 *   (b) worst-case envelope specs at the schema maximum (12 steps × 60-character titles × 140-character notes, an unbroken 60-character word, IPA / phonics
 *       glyphs, the minimum 2 steps, an 80-character figure title).
 * These are SYNTHETIC: they test that the English-shaped text a model can legally produce renders legibly, not what a model did produce.
 *
 *   npx tsx scripts/qa/englishVisual/buildFixtures.ts      # writes scripts/qa/englishVisual/fixtures.json
 */
import { readFileSync, writeFileSync } from 'node:fs'
import { parseVisualSpec } from '../../../src/lib/visuals/visualSpec'

interface Step { title: string; note?: string }
export interface Fixture { id: string; kind: 'concept' | 'envelope'; spec: { type: 'process_flow'; title: string; steps: Step[] } }

const cut = (s: string, max: number): string => {
  const t = s.replace(/\s+/g, ' ').trim()
  if (t.length <= max) return t
  const slice = t.slice(0, max - 1)
  const sp = slice.lastIndexOf(' ')
  return (sp > max * 0.5 ? slice.slice(0, sp) : slice).replace(/[,;:\-–—(]+$/, '').trimEnd() + '…'
}

/** One key idea → a step: the clause before the first colon (or the first sentence) is the title, the rest the note. */
export function stepOf(idea: string): Step {
  const colon = idea.indexOf(': ')
  const head = colon > 8 && colon < 90 ? idea.slice(0, colon) : idea.split(/(?<=[.!?])\s/)[0]
  const rest = idea.slice(head.length).replace(/^[:.\s]+/, '')
  return { title: cut(head, 60), ...(rest ? { note: cut(rest, 140) } : {}) }
}

/** English teaching assets cross-reference other concepts by internal id (55 key ideas); a figure must never show an id (`forbiddenTextHits`, audit ST-04), so the fixture shows the concept's name. */
const ID_RE = /\beng\.[a-z0-9_-]+\.[a-z0-9_.-]+\b/g

export function buildFixtures(): Fixture[] {
  const assets = JSON.parse(readFileSync('docs/english/teaching-assets/assets.json', 'utf8')).assets as Array<{ concept_id: string; key_ideas: string[] }>
  const kg = JSON.parse(readFileSync('docs/english/kg/graph.json', 'utf8'))
  const names = new Map<string, string>((Array.isArray(kg) ? kg : (kg.concepts ?? kg.nodes)).map((n: { id: string; name: string }) => [n.id, n.name]))
  const out: Fixture[] = []
  for (const id of names.keys()) {
    const a = assets.find((x) => x.concept_id === id)
    const ideas = (a?.key_ideas ?? []).slice(0, 6).map((t) => t.replace(ID_RE, (m) => names.get(m.replace(/['’]s$/, '')) ?? 'the related concept'))
    out.push({ id, kind: 'concept', spec: { type: 'process_flow', title: cut(names.get(id)!, 80), steps: ideas.map(stepOf) } })
  }
  const word = (n: number, w: string) => Array.from({ length: n }, (_, i) => `${w}${i + 1}`).join(' ')
  const T60 = 'The silent letter pattern in "knight", "wrap" and "gnome" starts'.slice(0, 60)
  const N140 = ('Say it slowly: /ʃ/ as in "ship", /θ/ as in "thin", /ð/ as in "this", /ŋ/ as in "sing", /ə/ the schwa in "about" — then blend the sounds back together fast.').slice(0, 140)
  out.push(
    { id: 'envelope-12-steps-max-text', kind: 'envelope', spec: { type: 'process_flow', title: cut('A twelve-step reading routine for a weak learner: look, say, break, blend, check, repeat', 80), steps: Array.from({ length: 12 }, (_, i) => ({ title: `${i + 1}. ${T60}`.slice(0, 60), note: N140 })) } },
    { id: 'envelope-2-steps-max-text', kind: 'envelope', spec: { type: 'process_flow', title: cut(word(20, 'Title'), 80), steps: [{ title: T60, note: N140 }, { title: cut(word(12, 'Second'), 60), note: cut(word(40, 'note'), 140) }] } },
    { id: 'envelope-unbroken-word', kind: 'envelope', spec: { type: 'process_flow', title: 'Unbroken words', steps: [{ title: 'Pneumonoultramicroscopicsilicovolcanoconiosis_x'.padEnd(60, 'x').slice(0, 60), note: 'Supercalifragilisticexpialidocious'.repeat(4).slice(0, 140) }, { title: 'Next' }] } },
    { id: 'envelope-ipa-glyphs', kind: 'envelope', spec: { type: 'process_flow', title: 'Phonics symbols: ʃ θ ð ŋ ə ɪ ʊ æ ʌ ɔ', steps: [{ title: '/ʃ/ ship  /θ/ thin  /ð/ this  /ŋ/ sing', note: 'IPA: ʃɪp, θɪn, ðɪs, sɪŋ, əˈbaʊt — stress ˈ and length ː marks: siːt, sɪt' }, { title: 'Digraphs: sh ch th ph wh ck ng', note: 'Say /f/ for “ph” in “phone”; the apostrophe’s and the quotation marks “ ” ‘ ’ — and the dash – and — must render' }] } },
    { id: 'envelope-no-notes', kind: 'envelope', spec: { type: 'process_flow', title: cut('Title only steps at the maximum length for a figure title in the schema, 80 chars', 80), steps: Array.from({ length: 12 }, (_, i) => ({ title: `${T60}`.slice(0, 55) + ` ${i + 1}` })) } },
    { id: 'envelope-min', kind: 'envelope', spec: { type: 'process_flow', title: 'Two short steps', steps: [{ title: 'Look' }, { title: 'Say' }] } },
  )
  return out
}

function main(): void {
  const fx = buildFixtures()
  const bad = fx.filter((f) => !parseVisualSpec(f.spec))
  if (bad.length) { console.error('invalid specs:', bad.map((b) => b.id)); process.exit(1) }
  writeFileSync('scripts/qa/englishVisual/fixtures.json', JSON.stringify(fx, null, 1))
  console.log(`${fx.length} fixtures (${fx.filter((f) => f.kind === 'concept').length} concept, ${fx.filter((f) => f.kind === 'envelope').length} envelope); steps min/max ${Math.min(...fx.map((f) => f.spec.steps.length))}/${Math.max(...fx.map((f) => f.spec.steps.length))}`)
}
if (process.argv[1] && process.argv[1].endsWith('buildFixtures.ts')) main()
