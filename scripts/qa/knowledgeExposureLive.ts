/**
 * Production verification for the authoritative-knowledge delivery fix.
 *
 * The claim under test is narrow and falsifiable: authored knowledge that the
 * OLD path could not carry (anything past the opening hook's 400-char cut, and
 * every misconception the old grammar could not read) now reaches the model.
 *
 * It cannot be checked by asking "is the teaching good". So for each concept
 * this script computes, from the REAL corpus, the slice of Core Understanding
 * that is exposed NOW and was NOT exposed BEFORE, picks distinctive content
 * words that occur ONLY in that slice, and then asks the deployed tutor a
 * learner-shaped question about it. A hit is evidence the text arrived; a miss
 * is reported as a miss, not explained away — the model is free to answer in
 * its own words, so this measures presence, never quality.
 *
 * It never certifies mastery and never writes to the database directly: it
 * registers a throwaway learner through the product's own endpoints and
 * deletes it through the product's own endpoint at the end.
 */
import { createQaAccount, deleteQaAccount } from './liveAccount'
import { BASE } from './liveAccount'
import { createSession, openLesson, say, type TurnPayload } from './liveSession'
import { loadEBConceptContext } from '@/lib/curriculum/blueprintLoader'

const OLD_BUDGET = 400 // the boundary this fix removed

interface Case {
  label: string
  conceptId: string
  subjectSlug: string
  ask: string
}

const CASES: Case[] = [
  { label: 'PHYSICS', conceptId: 'phys.meas.units', subjectSlug: 'physics',
    ask: 'What exactly makes a measurement valid here? Give me the conditions.' },
  { label: 'CHEMISTRY (calibration case)', conceptId: 'chem.bond.resonance', subjectSlug: 'chemistry',
    ask: 'How do I decide which resonance structure is the dominant contributor?' },
  { label: 'ENGLISH', conceptId: 'eng.grammar.verbs', subjectSlug: 'english',
    ask: 'What are the rules I have to follow with verbs? Be specific.' },
  { label: 'PARSED MISCONCEPTION (0 -> 4 by this fix)', conceptId: 'chem.bond.hybridization', subjectSlug: 'chemistry',
    ask: 'What do students usually get wrong about hybridisation?' },
  { label: 'LONG CORE UNDERSTANDING (7,643 authored chars)', conceptId: 'chem.state.liquids', subjectSlug: 'chemistry',
    ask: 'Tell me the properties of liquids and what governs each one.' },
]

/** Resolve a lesson from the product's OWN curriculum API — never guessed. */
async function resolveLesson(cookie: string, subjectSlug: string, conceptId: string) {
  const res = await fetch(`${BASE}/api/curriculum?subject=${subjectSlug}`, { headers: { cookie } })
  if (!res.ok) throw new Error(`/api/curriculum ${subjectSlug} -> HTTP ${res.status}`)
  const body = (await res.json()) as { lessons?: Array<Record<string, unknown>> }
  const lessons = body.lessons ?? []
  const l = lessons.find((x) => x.topicSlug === conceptId)
  if (!l) throw new Error(`${conceptId} not found in ${subjectSlug} curriculum`)
  return {
    lessonTitle: String(l.lessonTitle),
    lessonOrder: Number(l.order),
    topicSlug: conceptId,
    unitTitle: String(l.unitTitle),
    totalLessons: lessons.length,
  }
}

function newlyExposed(conceptId: string): { slice: string; markers: string[]; mcCount: number } {
  const eb = loadEBConceptContext(conceptId)
  const cu = eb.context.coreUnderstanding
  const mcCount = eb.context.ebMisconceptions.length
  if (!cu) return { slice: '', markers: [], mcCount }
  const before = cu.text.slice(0, OLD_BUDGET)
  const slice = cu.text.slice(OLD_BUDGET)
  const inBefore = new Set(before.toLowerCase().match(/[a-z]{5,}/g) ?? [])
  const seen = new Set<string>()
  const markers: string[] = []
  for (const w of slice.toLowerCase().match(/[a-z]{6,}/g) ?? []) {
    if (inBefore.has(w) || seen.has(w)) continue
    seen.add(w)
    markers.push(w)
  }
  return { slice, markers, mcCount }
}

function hits(text: string, markers: string[]): string[] {
  const lower = text.toLowerCase()
  return markers.filter((m) => lower.includes(m))
}

async function main() {
  const acct = await createQaAccount('knowexp')
  console.log(`account ${acct.email}`)
  let anyMastery = false
  try {
    for (const c of CASES) {
      const { markers, mcCount, slice } = newlyExposed(c.conceptId)
      const sessionId = await createSession(acct.cookie, c.subjectSlug)
      const lesson = await resolveLesson(acct.cookie, c.subjectSlug, c.conceptId)
      const turns: TurnPayload[] = []
      turns.push(await openLesson(acct.cookie, sessionId, lesson))
      turns.push(await say(acct.cookie, sessionId, c.ask))
      const all = turns.map((t) => t.text ?? '').join('\n')
      const h = hits(all, markers)
      for (const t of turns) if (t.mastery?.verified) anyMastery = true
      const degraded = /isn't responding right now/i.test(all)
      console.log(`\n=== ${c.label} (${c.conceptId}) ===`)
      console.log(`  parsed misconceptions: ${mcCount}`)
      console.log(`  newly-exposed Core Understanding: ${slice.length} chars, ${markers.length} distinctive markers`)
      console.log(`  markers echoed in the reply: ${h.length} ${h.slice(0, 8).join(', ')}`)
      console.log(`  provider: ${turns.map((t) => t.provider ?? '?').join(' -> ')}${degraded ? '  [DEGRADED — UNMEASURED]' : ''}`)
      console.log(`  reply: ${all.replace(/\s+/g, ' ').slice(0, 600)}`)
    }
  } finally {
    const cleanup = await deleteQaAccount(acct)
    console.log(`\ncleanup deleted=${cleanup.deleted} reloginBlocked=${cleanup.reloginBlocked}`)
    console.log(`mastery certified during this run: ${anyMastery}`)
  }
}

main().catch((e) => { console.error(e); process.exit(1) })
