/**
 * PHASE 5 — FACT-CHECK GATE, deterministic first pass (launch-readiness
 * item 3, 2026-10-03). Shadow by default (FACT_CHECK_MODE: off | shadow |
 * serve); nothing here changes a reply until its precision is measured.
 *
 * Check F1 — the teaching prose states an AUTHORED WRONG ANSWER as fact.
 * Every authored probe for the concept carries its distractors, and a
 * misconception probe's distractor is the misconception written out as a
 * sentence ("Plants stop respiring at night because there is no light"). A
 * prose sentence that carries nearly every content word of such a distractor,
 * and does not negate it or name it as a misconception, is flagged.
 *
 * What this does NOT check: numbers, formulas or definitions the authored
 * assets never state as a wrong option. It finds one class of factual error
 * with a precise reference; it never shows prose is correct.
 *
 * MEASURED (2026-10-03), so it is NOT served:
 * - production shadow: 0 flagged of 78 checked turns;
 * - offline, every authored explanation (known-correct prose) against its
 *   concept's distractors: 131 of 2,200 flagged with all distractors, 25 of
 *   2,156 with misconception-probe distractors and the wider hedge list below.
 *   Hand-read 30 + 25: every one a false positive — the prose DESCRIBES the
 *   misconception to correct it ("a natural but wrong assumption…", "a common
 *   instinct is…"), or the distractor is true on its own. Precision 0%, far
 *   under the 90% serve bar. Kept in shadow to measure, never to change text.
 */

export type FactCheckMode = 'off' | 'shadow' | 'serve'

export function factCheckMode(env: Record<string, string | undefined> = process.env): FactCheckMode {
  const v = (env.FACT_CHECK_MODE ?? '').trim().toLowerCase()
  return v === 'off' || v === 'serve' ? v : 'shadow'
}

const STOP = new Set(('a an the and or but of to in on at by for with from as is are was were be been being it its this that these those there their they them ' +
  'than then so such into onto over under about which what when where who whom how why can could will would should may might must do does did done ' +
  'has have had having not no nor only also very more most less least each every any all some one two').split(' '))
const NEGATION = /\b(not|no|never|none|nothing|cannot|can't|isn't|aren't|wasn't|weren't|doesn't|don't|didn't|won't|wouldn't|neither|nor)\b/gi
// The sentence names the claim as something other than fact.
const HEDGE = /\b(myth|misconception|mistake|mistaken|wrong|wrongly|incorrect(?:ly)?|false|untrue|trap|error|assum\w*|confus\w*|students?|learners?|tempt\w*|instead|rather than|unlike|if [^.]* were|common (?:error|confusion)|(?:many|some) (?:people|learners|students)|(?:people|learners|students) (?:often )?(?:think|believe|assume)|it is tempting|might (?:seem|think)|may (?:seem|think)|seems? like)\b/i

const stem = (w: string) => (w.length > 4 ? w.replace(/(ing|ed|es|s)$/, '') : w)
const tokens = (s: string) => new Set((s.toLowerCase().match(/[\p{L}\p{N}]+/gu) ?? []).filter((w) => w.length >= 3 && !STOP.has(w)).map(stem))
const negations = (s: string) => (s.match(NEGATION) ?? []).length

interface ProbeLike { choices?: unknown }

/** The authored wrong options that read as statements (4+ content words). */
export function falseStatementsFromProbes(probes: ProbeLike[]): string[] {
  const out = new Set<string>()
  for (const p of probes) {
    if (!Array.isArray(p.choices)) continue
    for (const c of p.choices as Array<{ text?: unknown; isCorrect?: unknown }>) {
      if (!c || c.isCorrect === true || typeof c.text !== 'string') continue
      const t = c.text.trim()
      if (tokens(t).size >= 4) out.add(t)
    }
  }
  return [...out]
}

export interface FactFlag { sentence: string; statement: string; share: number }

/** F1. One flag per sentence: the distractor it most fully restates. */
export function checkProseAgainstFalseStatements(prose: string, statements: string[], minShare = 0.8): FactFlag[] {
  if (!prose || statements.length === 0) return []
  const prepared = statements.map((s) => ({ s, t: tokens(s), neg: negations(s) }))
  const flags: FactFlag[] = []
  for (const sentence of prose.match(/[^.!?\n]+[.!?]*/g) ?? []) {
    if (HEDGE.test(sentence)) continue
    const st = tokens(sentence)
    let best: FactFlag | null = null
    for (const d of prepared) {
      let hit = 0
      for (const w of d.t) if (st.has(w)) hit++
      const share = hit / d.t.size
      // Negated relative to the distractor ("do not stop … no light" against
      // "stop … no light") is the correction, not the error.
      if (share >= minShare && negations(sentence) <= d.neg && (!best || share > best.share)) {
        best = { sentence: sentence.trim(), statement: d.s, share: Math.round(share * 100) / 100 }
      }
    }
    if (best) flags.push(best)
  }
  return flags
}

// One query per concept per warm instance (Supabase egress: about 10 KB a
// concept, never per turn). Production rows equal the seed corpus.
const cache = new Map<string, string[]>()

export async function loadFalseStatements(conceptId: string, language = 'en'): Promise<string[]> {
  const key = `${conceptId}:${language}`
  const hit = cache.get(key)
  if (hit) return hit
  const { prisma } = await import('@/lib/db/prisma')
  const rows = await prisma.assetIdentity.findMany({
    // Misconception probes only: their distractors are the misconception as a
    // sentence. An ordinary mcq distractor is wrong only as an answer to ITS
    // stem and is often true on its own ("Table and all data are permanently
    // removed") — measured offline 2026-10-03, see the module header.
    where: { family: 'PROBE', familyKind: 'misconception_probe', conceptId, language, status: 'ACTIVE' },
    select: { probeAsset: { select: { choices: true } } },
    take: 60,
  })
  const statements = falseStatementsFromProbes(rows.map((r) => ({ choices: r.probeAsset?.choices })))
  cache.set(key, statements)
  return statements
}
